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
  sdkId: "MediaConnect",
  serviceShapeName: "MediaConnect",
});
const auth = T.AwsAuthSigv4({ name: "mediaconnect" });
const ver = T.ServiceVersion("2018-11-14");
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
              `https://mediaconnect-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://mediaconnect-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://mediaconnect.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://mediaconnect.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class AddFlowOutputs420Exception
  extends /*@__PURE__*/ S.TaggedError<AddFlowOutputs420Exception>()(
    "AddFlowOutputs420Exception",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(420),
  ) {}
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
    T.all(T.HttpError(409), T.Retryable()),
  ).pipe(C.withConflictError, C.withRetryableError) {}
export class CreateBridge420Exception
  extends /*@__PURE__*/ S.TaggedError<CreateBridge420Exception>()(
    "CreateBridge420Exception",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(420),
  ) {}
export class CreateFlow420Exception
  extends /*@__PURE__*/ S.TaggedError<CreateFlow420Exception>()(
    "CreateFlow420Exception",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(420),
  ) {}
export class CreateGateway420Exception
  extends /*@__PURE__*/ S.TaggedError<CreateGateway420Exception>()(
    "CreateGateway420Exception",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(420),
  ) {}
export class ForbiddenException
  extends /*@__PURE__*/ S.TaggedError<ForbiddenException>()(
    "ForbiddenException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class GrantFlowEntitlements420Exception
  extends /*@__PURE__*/ S.TaggedError<GrantFlowEntitlements420Exception>()(
    "GrantFlowEntitlements420Exception",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(420),
  ) {}
export class InternalServerErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalServerErrorException>()(
    "InternalServerErrorException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(T.HttpError(500), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class RouterInputServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<RouterInputServiceQuotaExceededException>()(
    "RouterInputServiceQuotaExceededException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(420),
  ) {}
export class RouterNetworkInterfaceServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<RouterNetworkInterfaceServiceQuotaExceededException>()(
    "RouterNetworkInterfaceServiceQuotaExceededException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(420),
  ) {}
export class RouterOutputServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<RouterOutputServiceQuotaExceededException>()(
    "RouterOutputServiceQuotaExceededException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(420),
  ) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(T.HttpError(503), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(T.HttpError(429), T.Retryable()),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export type BridgeArn = string;
export type Protocol =
  | "zixi-push"
  | "rtp-fec"
  | "rtp"
  | "zixi-pull"
  | "rist"
  | "st2110-jpegxs"
  | "cdi"
  | "srt-listener"
  | "srt-caller"
  | "fujitsu-qos"
  | "udp"
  | "ndi-speed-hq"
  | (string & {});
export const Protocol = /*@__PURE__*/ S.String;

export interface AddBridgeNetworkOutputRequest {
  IpAddress?: string;
  Name?: string;
  NetworkName?: string;
  Port?: number;
  Protocol?: Protocol;
  Ttl?: number;
}
export const AddBridgeNetworkOutputRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IpAddress: S.optional(S.String),
    Name: S.optional(S.String),
    NetworkName: S.optional(S.String),
    Port: S.optional(S.Number),
    Protocol: S.optional(Protocol),
    Ttl: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      IpAddress: "ipAddress",
      Name: "name",
      NetworkName: "networkName",
      Port: "port",
      Protocol: "protocol",
      Ttl: "ttl",
    }),
  ),
).annotate({
  identifier: "AddBridgeNetworkOutputRequest",
}) as any as S.Schema<AddBridgeNetworkOutputRequest>;
export interface AddBridgeOutputRequest {
  NetworkOutput?: AddBridgeNetworkOutputRequest;
}
export const AddBridgeOutputRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ NetworkOutput: S.optional(AddBridgeNetworkOutputRequest) }).pipe(
    S.encodeKeys({ NetworkOutput: "networkOutput" }),
  ),
).annotate({
  identifier: "AddBridgeOutputRequest",
}) as any as S.Schema<AddBridgeOutputRequest>;
export type __listOfAddBridgeOutputRequest = AddBridgeOutputRequest[];
export const __listOfAddBridgeOutputRequest = /*@__PURE__*/ S.Array(
  AddBridgeOutputRequest,
);
export interface AddBridgeOutputsRequest {
  BridgeArn: string;
  Outputs?: AddBridgeOutputRequest[];
}
export const AddBridgeOutputsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BridgeArn: S.String.pipe(T.HttpLabel("BridgeArn")),
    Outputs: S.optional(__listOfAddBridgeOutputRequest),
  })
    .pipe(S.encodeKeys({ Outputs: "outputs" }))
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/v1/bridges/{BridgeArn}/outputs" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "AddBridgeOutputsRequest",
}) as any as S.Schema<AddBridgeOutputsRequest>;
export interface BridgeFlowOutput {
  FlowArn?: string;
  FlowSourceArn?: string;
  Name?: string;
}
export const BridgeFlowOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FlowArn: S.optional(S.String),
    FlowSourceArn: S.optional(S.String),
    Name: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      FlowArn: "flowArn",
      FlowSourceArn: "flowSourceArn",
      Name: "name",
    }),
  ),
).annotate({
  identifier: "BridgeFlowOutput",
}) as any as S.Schema<BridgeFlowOutput>;
export interface BridgeNetworkOutput {
  IpAddress?: string;
  Name?: string;
  NetworkName?: string;
  Port?: number;
  Protocol?: Protocol;
  Ttl?: number;
}
export const BridgeNetworkOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IpAddress: S.optional(S.String),
    Name: S.optional(S.String),
    NetworkName: S.optional(S.String),
    Port: S.optional(S.Number),
    Protocol: S.optional(Protocol),
    Ttl: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      IpAddress: "ipAddress",
      Name: "name",
      NetworkName: "networkName",
      Port: "port",
      Protocol: "protocol",
      Ttl: "ttl",
    }),
  ),
).annotate({
  identifier: "BridgeNetworkOutput",
}) as any as S.Schema<BridgeNetworkOutput>;
export interface BridgeOutput {
  FlowOutput?: BridgeFlowOutput;
  NetworkOutput?: BridgeNetworkOutput;
}
export const BridgeOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FlowOutput: S.optional(BridgeFlowOutput),
    NetworkOutput: S.optional(BridgeNetworkOutput),
  }).pipe(
    S.encodeKeys({ FlowOutput: "flowOutput", NetworkOutput: "networkOutput" }),
  ),
).annotate({ identifier: "BridgeOutput" }) as any as S.Schema<BridgeOutput>;
export type __listOfBridgeOutput = BridgeOutput[];
export const __listOfBridgeOutput = /*@__PURE__*/ S.Array(BridgeOutput);
export interface AddBridgeOutputsResponse {
  BridgeArn?: string;
  Outputs?: (BridgeOutput & {
    FlowOutput: BridgeFlowOutput & {
      FlowArn: string;
      FlowSourceArn: string;
      Name: string;
    };
    NetworkOutput: BridgeNetworkOutput & {
      IpAddress: string;
      Name: string;
      NetworkName: string;
      Port: number;
      Protocol: Protocol;
      Ttl: number;
    };
  })[];
}
export const AddBridgeOutputsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BridgeArn: S.optional(S.String),
    Outputs: S.optional(__listOfBridgeOutput),
  }).pipe(S.encodeKeys({ BridgeArn: "bridgeArn", Outputs: "outputs" })),
).annotate({
  identifier: "AddBridgeOutputsResponse",
}) as any as S.Schema<AddBridgeOutputsResponse>;
export interface VpcInterfaceAttachment {
  VpcInterfaceName?: string;
}
export const VpcInterfaceAttachment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ VpcInterfaceName: S.optional(S.String) }).pipe(
    S.encodeKeys({ VpcInterfaceName: "vpcInterfaceName" }),
  ),
).annotate({
  identifier: "VpcInterfaceAttachment",
}) as any as S.Schema<VpcInterfaceAttachment>;
export interface AddBridgeFlowSourceRequest {
  FlowArn?: string;
  FlowVpcInterfaceAttachment?: VpcInterfaceAttachment;
  Name?: string;
}
export const AddBridgeFlowSourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FlowArn: S.optional(S.String),
    FlowVpcInterfaceAttachment: S.optional(VpcInterfaceAttachment),
    Name: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      FlowArn: "flowArn",
      FlowVpcInterfaceAttachment: "flowVpcInterfaceAttachment",
      Name: "name",
    }),
  ),
).annotate({
  identifier: "AddBridgeFlowSourceRequest",
}) as any as S.Schema<AddBridgeFlowSourceRequest>;
export interface MulticastSourceSettings {
  MulticastSourceIp?: string;
}
export const MulticastSourceSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MulticastSourceIp: S.optional(S.String) }).pipe(
    S.encodeKeys({ MulticastSourceIp: "multicastSourceIp" }),
  ),
).annotate({
  identifier: "MulticastSourceSettings",
}) as any as S.Schema<MulticastSourceSettings>;
export interface AddBridgeNetworkSourceRequest {
  MulticastIp?: string;
  MulticastSourceSettings?: MulticastSourceSettings;
  Name?: string;
  NetworkName?: string;
  Port?: number;
  Protocol?: Protocol;
}
export const AddBridgeNetworkSourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MulticastIp: S.optional(S.String),
    MulticastSourceSettings: S.optional(MulticastSourceSettings),
    Name: S.optional(S.String),
    NetworkName: S.optional(S.String),
    Port: S.optional(S.Number),
    Protocol: S.optional(Protocol),
  }).pipe(
    S.encodeKeys({
      MulticastIp: "multicastIp",
      MulticastSourceSettings: "multicastSourceSettings",
      Name: "name",
      NetworkName: "networkName",
      Port: "port",
      Protocol: "protocol",
    }),
  ),
).annotate({
  identifier: "AddBridgeNetworkSourceRequest",
}) as any as S.Schema<AddBridgeNetworkSourceRequest>;
export interface AddBridgeSourceRequest {
  FlowSource?: AddBridgeFlowSourceRequest;
  NetworkSource?: AddBridgeNetworkSourceRequest;
}
export const AddBridgeSourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FlowSource: S.optional(AddBridgeFlowSourceRequest),
    NetworkSource: S.optional(AddBridgeNetworkSourceRequest),
  }).pipe(
    S.encodeKeys({ FlowSource: "flowSource", NetworkSource: "networkSource" }),
  ),
).annotate({
  identifier: "AddBridgeSourceRequest",
}) as any as S.Schema<AddBridgeSourceRequest>;
export type __listOfAddBridgeSourceRequest = AddBridgeSourceRequest[];
export const __listOfAddBridgeSourceRequest = /*@__PURE__*/ S.Array(
  AddBridgeSourceRequest,
);
export interface AddBridgeSourcesRequest {
  BridgeArn: string;
  Sources?: AddBridgeSourceRequest[];
}
export const AddBridgeSourcesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BridgeArn: S.String.pipe(T.HttpLabel("BridgeArn")),
    Sources: S.optional(__listOfAddBridgeSourceRequest),
  })
    .pipe(S.encodeKeys({ Sources: "sources" }))
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/v1/bridges/{BridgeArn}/sources" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "AddBridgeSourcesRequest",
}) as any as S.Schema<AddBridgeSourcesRequest>;
export interface BridgeFlowSource {
  FlowArn?: string;
  FlowVpcInterfaceAttachment?: VpcInterfaceAttachment;
  Name?: string;
  OutputArn?: string;
}
export const BridgeFlowSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FlowArn: S.optional(S.String),
    FlowVpcInterfaceAttachment: S.optional(VpcInterfaceAttachment),
    Name: S.optional(S.String),
    OutputArn: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      FlowArn: "flowArn",
      FlowVpcInterfaceAttachment: "flowVpcInterfaceAttachment",
      Name: "name",
      OutputArn: "outputArn",
    }),
  ),
).annotate({
  identifier: "BridgeFlowSource",
}) as any as S.Schema<BridgeFlowSource>;
export interface BridgeNetworkSource {
  MulticastIp?: string;
  MulticastSourceSettings?: MulticastSourceSettings;
  Name?: string;
  NetworkName?: string;
  Port?: number;
  Protocol?: Protocol;
}
export const BridgeNetworkSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MulticastIp: S.optional(S.String),
    MulticastSourceSettings: S.optional(MulticastSourceSettings),
    Name: S.optional(S.String),
    NetworkName: S.optional(S.String),
    Port: S.optional(S.Number),
    Protocol: S.optional(Protocol),
  }).pipe(
    S.encodeKeys({
      MulticastIp: "multicastIp",
      MulticastSourceSettings: "multicastSourceSettings",
      Name: "name",
      NetworkName: "networkName",
      Port: "port",
      Protocol: "protocol",
    }),
  ),
).annotate({
  identifier: "BridgeNetworkSource",
}) as any as S.Schema<BridgeNetworkSource>;
export interface BridgeSource {
  FlowSource?: BridgeFlowSource;
  NetworkSource?: BridgeNetworkSource;
}
export const BridgeSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FlowSource: S.optional(BridgeFlowSource),
    NetworkSource: S.optional(BridgeNetworkSource),
  }).pipe(
    S.encodeKeys({ FlowSource: "flowSource", NetworkSource: "networkSource" }),
  ),
).annotate({ identifier: "BridgeSource" }) as any as S.Schema<BridgeSource>;
export type __listOfBridgeSource = BridgeSource[];
export const __listOfBridgeSource = /*@__PURE__*/ S.Array(BridgeSource);
export interface AddBridgeSourcesResponse {
  BridgeArn?: string;
  Sources?: (BridgeSource & {
    FlowSource: BridgeFlowSource & { FlowArn: string; Name: string };
    NetworkSource: BridgeNetworkSource & {
      MulticastIp: string;
      Name: string;
      NetworkName: string;
      Port: number;
      Protocol: Protocol;
    };
  })[];
}
export const AddBridgeSourcesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BridgeArn: S.optional(S.String),
    Sources: S.optional(__listOfBridgeSource),
  }).pipe(S.encodeKeys({ BridgeArn: "bridgeArn", Sources: "sources" })),
).annotate({
  identifier: "AddBridgeSourcesResponse",
}) as any as S.Schema<AddBridgeSourcesResponse>;
export type FlowArn = string;
export type Colorimetry =
  | "BT601"
  | "BT709"
  | "BT2020"
  | "BT2100"
  | "ST2065-1"
  | "ST2065-3"
  | "XYZ"
  | (string & {});
export const Colorimetry = /*@__PURE__*/ S.String;

export type Range = "NARROW" | "FULL" | "FULLPROTECT" | (string & {});
export const Range = /*@__PURE__*/ S.String;

export type ScanMode =
  | "progressive"
  | "interlace"
  | "progressive-segmented-frame"
  | (string & {});
export const ScanMode = /*@__PURE__*/ S.String;

export type Tcs =
  | "SDR"
  | "PQ"
  | "HLG"
  | "LINEAR"
  | "BT2100LINPQ"
  | "BT2100LINHLG"
  | "ST2065-1"
  | "ST428-1"
  | "DENSITY"
  | (string & {});
export const Tcs = /*@__PURE__*/ S.String;

export interface FmtpRequest {
  ChannelOrder?: string;
  Colorimetry?: Colorimetry;
  ExactFramerate?: string;
  Par?: string;
  Range?: Range;
  ScanMode?: ScanMode;
  Tcs?: Tcs;
}
export const FmtpRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelOrder: S.optional(S.String),
    Colorimetry: S.optional(Colorimetry),
    ExactFramerate: S.optional(S.String),
    Par: S.optional(S.String),
    Range: S.optional(Range),
    ScanMode: S.optional(ScanMode),
    Tcs: S.optional(Tcs),
  }).pipe(
    S.encodeKeys({
      ChannelOrder: "channelOrder",
      Colorimetry: "colorimetry",
      ExactFramerate: "exactFramerate",
      Par: "par",
      Range: "range",
      ScanMode: "scanMode",
      Tcs: "tcs",
    }),
  ),
).annotate({ identifier: "FmtpRequest" }) as any as S.Schema<FmtpRequest>;
export interface MediaStreamAttributesRequest {
  Fmtp?: FmtpRequest;
  Lang?: string;
}
export const MediaStreamAttributesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Fmtp: S.optional(FmtpRequest), Lang: S.optional(S.String) }).pipe(
    S.encodeKeys({ Fmtp: "fmtp", Lang: "lang" }),
  ),
).annotate({
  identifier: "MediaStreamAttributesRequest",
}) as any as S.Schema<MediaStreamAttributesRequest>;
export type MediaStreamType =
  | "video"
  | "audio"
  | "ancillary-data"
  | (string & {});
export const MediaStreamType = /*@__PURE__*/ S.String;

export type __mapOfString = { [key: string]: string | undefined };
export const __mapOfString = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface AddMediaStreamRequest {
  Attributes?: MediaStreamAttributesRequest;
  ClockRate?: number;
  Description?: string;
  MediaStreamId?: number;
  MediaStreamName?: string;
  MediaStreamType?: MediaStreamType;
  VideoFormat?: string;
  MediaStreamTags?: { [key: string]: string | undefined };
}
export const AddMediaStreamRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Attributes: S.optional(MediaStreamAttributesRequest),
    ClockRate: S.optional(S.Number),
    Description: S.optional(S.String),
    MediaStreamId: S.optional(S.Number),
    MediaStreamName: S.optional(S.String),
    MediaStreamType: S.optional(MediaStreamType),
    VideoFormat: S.optional(S.String),
    MediaStreamTags: S.optional(__mapOfString),
  }).pipe(
    S.encodeKeys({
      Attributes: "attributes",
      ClockRate: "clockRate",
      Description: "description",
      MediaStreamId: "mediaStreamId",
      MediaStreamName: "mediaStreamName",
      MediaStreamType: "mediaStreamType",
      VideoFormat: "videoFormat",
      MediaStreamTags: "mediaStreamTags",
    }),
  ),
).annotate({
  identifier: "AddMediaStreamRequest",
}) as any as S.Schema<AddMediaStreamRequest>;
export type __listOfAddMediaStreamRequest = AddMediaStreamRequest[];
export const __listOfAddMediaStreamRequest = /*@__PURE__*/ S.Array(
  AddMediaStreamRequest,
);
export interface AddFlowMediaStreamsRequest {
  FlowArn: string;
  MediaStreams?: AddMediaStreamRequest[];
}
export const AddFlowMediaStreamsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FlowArn: S.String.pipe(T.HttpLabel("FlowArn")),
    MediaStreams: S.optional(__listOfAddMediaStreamRequest),
  })
    .pipe(S.encodeKeys({ MediaStreams: "mediaStreams" }))
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/v1/flows/{FlowArn}/mediaStreams" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "AddFlowMediaStreamsRequest",
}) as any as S.Schema<AddFlowMediaStreamsRequest>;
export interface Fmtp {
  ChannelOrder?: string;
  Colorimetry?: Colorimetry;
  ExactFramerate?: string;
  Par?: string;
  Range?: Range;
  ScanMode?: ScanMode;
  Tcs?: Tcs;
}
export const Fmtp = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelOrder: S.optional(S.String),
    Colorimetry: S.optional(Colorimetry),
    ExactFramerate: S.optional(S.String),
    Par: S.optional(S.String),
    Range: S.optional(Range),
    ScanMode: S.optional(ScanMode),
    Tcs: S.optional(Tcs),
  }).pipe(
    S.encodeKeys({
      ChannelOrder: "channelOrder",
      Colorimetry: "colorimetry",
      ExactFramerate: "exactFramerate",
      Par: "par",
      Range: "range",
      ScanMode: "scanMode",
      Tcs: "tcs",
    }),
  ),
).annotate({ identifier: "Fmtp" }) as any as S.Schema<Fmtp>;
export interface MediaStreamAttributes {
  Fmtp?: Fmtp;
  Lang?: string;
}
export const MediaStreamAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Fmtp: S.optional(Fmtp), Lang: S.optional(S.String) }).pipe(
    S.encodeKeys({ Fmtp: "fmtp", Lang: "lang" }),
  ),
).annotate({
  identifier: "MediaStreamAttributes",
}) as any as S.Schema<MediaStreamAttributes>;
export interface MediaStream {
  Attributes?: MediaStreamAttributes;
  ClockRate?: number;
  Description?: string;
  Fmt?: number;
  MediaStreamId?: number;
  MediaStreamName?: string;
  MediaStreamType?: MediaStreamType;
  VideoFormat?: string;
}
export const MediaStream = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Attributes: S.optional(MediaStreamAttributes),
    ClockRate: S.optional(S.Number),
    Description: S.optional(S.String),
    Fmt: S.optional(S.Number),
    MediaStreamId: S.optional(S.Number),
    MediaStreamName: S.optional(S.String),
    MediaStreamType: S.optional(MediaStreamType),
    VideoFormat: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      Attributes: "attributes",
      ClockRate: "clockRate",
      Description: "description",
      Fmt: "fmt",
      MediaStreamId: "mediaStreamId",
      MediaStreamName: "mediaStreamName",
      MediaStreamType: "mediaStreamType",
      VideoFormat: "videoFormat",
    }),
  ),
).annotate({ identifier: "MediaStream" }) as any as S.Schema<MediaStream>;
export type __listOfMediaStream = MediaStream[];
export const __listOfMediaStream = /*@__PURE__*/ S.Array(MediaStream);
export interface AddFlowMediaStreamsResponse {
  FlowArn?: string;
  MediaStreams?: (MediaStream & {
    Fmt: number;
    MediaStreamId: number;
    MediaStreamName: string;
    MediaStreamType: MediaStreamType;
    Attributes: MediaStreamAttributes & { Fmtp: Fmtp };
  })[];
}
export const AddFlowMediaStreamsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FlowArn: S.optional(S.String),
    MediaStreams: S.optional(__listOfMediaStream),
  }).pipe(S.encodeKeys({ FlowArn: "flowArn", MediaStreams: "mediaStreams" })),
).annotate({
  identifier: "AddFlowMediaStreamsResponse",
}) as any as S.Schema<AddFlowMediaStreamsResponse>;
export type __listOfString = string[];
export const __listOfString = /*@__PURE__*/ S.Array(S.String);
export type Algorithm = "aes128" | "aes192" | "aes256" | (string & {});
export const Algorithm = /*@__PURE__*/ S.String;

export type KeyType = "speke" | "static-key" | "srt-password" | (string & {});
export const KeyType = /*@__PURE__*/ S.String;

export interface Encryption {
  Algorithm?: Algorithm;
  ConstantInitializationVector?: string;
  DeviceId?: string;
  KeyType?: KeyType;
  Region?: string;
  ResourceId?: string;
  RoleArn?: string;
  SecretArn?: string;
  Url?: string;
}
export const Encryption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Algorithm: S.optional(Algorithm),
    ConstantInitializationVector: S.optional(S.String),
    DeviceId: S.optional(S.String),
    KeyType: S.optional(KeyType),
    Region: S.optional(S.String),
    ResourceId: S.optional(S.String),
    RoleArn: S.optional(S.String),
    SecretArn: S.optional(S.String),
    Url: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      Algorithm: "algorithm",
      ConstantInitializationVector: "constantInitializationVector",
      DeviceId: "deviceId",
      KeyType: "keyType",
      Region: "region",
      ResourceId: "resourceId",
      RoleArn: "roleArn",
      SecretArn: "secretArn",
      Url: "url",
    }),
  ),
).annotate({ identifier: "Encryption" }) as any as S.Schema<Encryption>;
export interface InterfaceRequest {
  Name?: string;
}
export const InterfaceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }).pipe(S.encodeKeys({ Name: "name" })),
).annotate({
  identifier: "InterfaceRequest",
}) as any as S.Schema<InterfaceRequest>;
export interface DestinationConfigurationRequest {
  DestinationIp?: string;
  DestinationPort?: number;
  Interface?: InterfaceRequest;
}
export const DestinationConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DestinationIp: S.optional(S.String),
    DestinationPort: S.optional(S.Number),
    Interface: S.optional(InterfaceRequest),
  }).pipe(
    S.encodeKeys({
      DestinationIp: "destinationIp",
      DestinationPort: "destinationPort",
      Interface: "interface",
    }),
  ),
).annotate({
  identifier: "DestinationConfigurationRequest",
}) as any as S.Schema<DestinationConfigurationRequest>;
export type __listOfDestinationConfigurationRequest =
  DestinationConfigurationRequest[];
export const __listOfDestinationConfigurationRequest = /*@__PURE__*/ S.Array(
  DestinationConfigurationRequest,
);
export type EncodingName = "jxsv" | "raw" | "smpte291" | "pcm" | (string & {});
export const EncodingName = /*@__PURE__*/ S.String;

export type EncoderProfile = "main" | "high" | (string & {});
export const EncoderProfile = /*@__PURE__*/ S.String;

export interface EncodingParametersRequest {
  CompressionFactor?: number;
  EncoderProfile?: EncoderProfile;
}
export const EncodingParametersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CompressionFactor: S.optional(S.Number),
    EncoderProfile: S.optional(EncoderProfile),
  }).pipe(
    S.encodeKeys({
      CompressionFactor: "compressionFactor",
      EncoderProfile: "encoderProfile",
    }),
  ),
).annotate({
  identifier: "EncodingParametersRequest",
}) as any as S.Schema<EncodingParametersRequest>;
export interface MediaStreamOutputConfigurationRequest {
  DestinationConfigurations?: DestinationConfigurationRequest[];
  EncodingName?: EncodingName;
  EncodingParameters?: EncodingParametersRequest;
  MediaStreamName?: string;
}
export const MediaStreamOutputConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      DestinationConfigurations: S.optional(
        __listOfDestinationConfigurationRequest,
      ),
      EncodingName: S.optional(EncodingName),
      EncodingParameters: S.optional(EncodingParametersRequest),
      MediaStreamName: S.optional(S.String),
    }).pipe(
      S.encodeKeys({
        DestinationConfigurations: "destinationConfigurations",
        EncodingName: "encodingName",
        EncodingParameters: "encodingParameters",
        MediaStreamName: "mediaStreamName",
      }),
    ),
).annotate({
  identifier: "MediaStreamOutputConfigurationRequest",
}) as any as S.Schema<MediaStreamOutputConfigurationRequest>;
export type __listOfMediaStreamOutputConfigurationRequest =
  MediaStreamOutputConfigurationRequest[];
export const __listOfMediaStreamOutputConfigurationRequest =
  /*@__PURE__*/ S.Array(MediaStreamOutputConfigurationRequest);
export type OutputStatus = "ENABLED" | "DISABLED" | (string & {});
export const OutputStatus = /*@__PURE__*/ S.String;

export type State = "ENABLED" | "DISABLED" | (string & {});
export const State = /*@__PURE__*/ S.String;

export type FlowTransitEncryptionKeyType =
  | "SECRETS_MANAGER"
  | "AUTOMATIC"
  | (string & {});
export const FlowTransitEncryptionKeyType = /*@__PURE__*/ S.String;

export type SecretArn = string;
export type RoleArn = string;
export interface SecretsManagerEncryptionKeyConfiguration {
  SecretArn: string;
  RoleArn: string;
}
export const SecretsManagerEncryptionKeyConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ SecretArn: S.String, RoleArn: S.String }).pipe(
      S.encodeKeys({ SecretArn: "secretArn", RoleArn: "roleArn" }),
    ),
).annotate({
  identifier: "SecretsManagerEncryptionKeyConfiguration",
}) as any as S.Schema<SecretsManagerEncryptionKeyConfiguration>;
export interface AutomaticEncryptionKeyConfiguration {}
export const AutomaticEncryptionKeyConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AutomaticEncryptionKeyConfiguration",
}) as any as S.Schema<AutomaticEncryptionKeyConfiguration>;
export type FlowTransitEncryptionKeyConfiguration =
  | {
      SecretsManager: SecretsManagerEncryptionKeyConfiguration;
      Automatic?: never;
    }
  | { SecretsManager?: never; Automatic: AutomaticEncryptionKeyConfiguration };
export const FlowTransitEncryptionKeyConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ SecretsManager: SecretsManagerEncryptionKeyConfiguration }),
  S.Struct({ Automatic: AutomaticEncryptionKeyConfiguration }),
]);
export interface FlowTransitEncryption {
  EncryptionKeyType?: FlowTransitEncryptionKeyType;
  EncryptionKeyConfiguration: FlowTransitEncryptionKeyConfiguration;
}
export const FlowTransitEncryption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EncryptionKeyType: S.optional(FlowTransitEncryptionKeyType),
    EncryptionKeyConfiguration: FlowTransitEncryptionKeyConfiguration,
  }).pipe(
    S.encodeKeys({
      EncryptionKeyType: "encryptionKeyType",
      EncryptionKeyConfiguration: "encryptionKeyConfiguration",
    }),
  ),
).annotate({
  identifier: "FlowTransitEncryption",
}) as any as S.Schema<FlowTransitEncryption>;
export type NdiOutputTimecodeSource =
  | "EMBEDDED_TIMECODE"
  | "UTC_SYSTEM_TIME"
  | (string & {});
export const NdiOutputTimecodeSource = /*@__PURE__*/ S.String;

export interface AddOutputRequest {
  CidrAllowList?: string[];
  Description?: string;
  Destination?: string;
  Encryption?: Encryption;
  MaxLatency?: number;
  MediaStreamOutputConfigurations?: MediaStreamOutputConfigurationRequest[];
  MinLatency?: number;
  Name?: string;
  Port?: number;
  Protocol?: Protocol;
  RemoteId?: string;
  SenderControlPort?: number;
  SmoothingLatency?: number;
  StreamId?: string;
  VpcInterfaceAttachment?: VpcInterfaceAttachment;
  OutputStatus?: OutputStatus;
  NdiSpeedHqQuality?: number;
  NdiProgramName?: string;
  OutputTags?: { [key: string]: string | undefined };
  RouterIntegrationState?: State;
  RouterIntegrationTransitEncryption?: FlowTransitEncryption;
  NdiOutputTimecodeSource?: NdiOutputTimecodeSource;
}
export const AddOutputRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CidrAllowList: S.optional(__listOfString),
    Description: S.optional(S.String),
    Destination: S.optional(S.String),
    Encryption: S.optional(Encryption),
    MaxLatency: S.optional(S.Number),
    MediaStreamOutputConfigurations: S.optional(
      __listOfMediaStreamOutputConfigurationRequest,
    ),
    MinLatency: S.optional(S.Number),
    Name: S.optional(S.String),
    Port: S.optional(S.Number),
    Protocol: S.optional(Protocol),
    RemoteId: S.optional(S.String),
    SenderControlPort: S.optional(S.Number),
    SmoothingLatency: S.optional(S.Number),
    StreamId: S.optional(S.String),
    VpcInterfaceAttachment: S.optional(VpcInterfaceAttachment),
    OutputStatus: S.optional(OutputStatus),
    NdiSpeedHqQuality: S.optional(S.Number),
    NdiProgramName: S.optional(S.String),
    OutputTags: S.optional(__mapOfString),
    RouterIntegrationState: S.optional(State),
    RouterIntegrationTransitEncryption: S.optional(FlowTransitEncryption),
    NdiOutputTimecodeSource: S.optional(NdiOutputTimecodeSource),
  }).pipe(
    S.encodeKeys({
      CidrAllowList: "cidrAllowList",
      Description: "description",
      Destination: "destination",
      Encryption: "encryption",
      MaxLatency: "maxLatency",
      MediaStreamOutputConfigurations: "mediaStreamOutputConfigurations",
      MinLatency: "minLatency",
      Name: "name",
      Port: "port",
      Protocol: "protocol",
      RemoteId: "remoteId",
      SenderControlPort: "senderControlPort",
      SmoothingLatency: "smoothingLatency",
      StreamId: "streamId",
      VpcInterfaceAttachment: "vpcInterfaceAttachment",
      OutputStatus: "outputStatus",
      NdiSpeedHqQuality: "ndiSpeedHqQuality",
      NdiProgramName: "ndiProgramName",
      OutputTags: "outputTags",
      RouterIntegrationState: "routerIntegrationState",
      RouterIntegrationTransitEncryption: "routerIntegrationTransitEncryption",
      NdiOutputTimecodeSource: "ndiOutputTimecodeSource",
    }),
  ),
).annotate({
  identifier: "AddOutputRequest",
}) as any as S.Schema<AddOutputRequest>;
export type __listOfAddOutputRequest = AddOutputRequest[];
export const __listOfAddOutputRequest = /*@__PURE__*/ S.Array(AddOutputRequest);
export interface AddFlowOutputsRequest {
  FlowArn: string;
  Outputs?: AddOutputRequest[];
}
export const AddFlowOutputsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FlowArn: S.String.pipe(T.HttpLabel("FlowArn")),
    Outputs: S.optional(__listOfAddOutputRequest),
  })
    .pipe(S.encodeKeys({ Outputs: "outputs" }))
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/v1/flows/{FlowArn}/outputs" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "AddFlowOutputsRequest",
}) as any as S.Schema<AddFlowOutputsRequest>;
export interface Interface {
  Name?: string;
}
export const Interface = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }).pipe(S.encodeKeys({ Name: "name" })),
).annotate({ identifier: "Interface" }) as any as S.Schema<Interface>;
export interface DestinationConfiguration {
  DestinationIp?: string;
  DestinationPort?: number;
  Interface?: Interface;
  OutboundIp?: string;
}
export const DestinationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DestinationIp: S.optional(S.String),
    DestinationPort: S.optional(S.Number),
    Interface: S.optional(Interface),
    OutboundIp: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      DestinationIp: "destinationIp",
      DestinationPort: "destinationPort",
      Interface: "interface",
      OutboundIp: "outboundIp",
    }),
  ),
).annotate({
  identifier: "DestinationConfiguration",
}) as any as S.Schema<DestinationConfiguration>;
export type __listOfDestinationConfiguration = DestinationConfiguration[];
export const __listOfDestinationConfiguration = /*@__PURE__*/ S.Array(
  DestinationConfiguration,
);
export interface EncodingParameters {
  CompressionFactor?: number;
  EncoderProfile?: EncoderProfile;
}
export const EncodingParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CompressionFactor: S.optional(S.Number),
    EncoderProfile: S.optional(EncoderProfile),
  }).pipe(
    S.encodeKeys({
      CompressionFactor: "compressionFactor",
      EncoderProfile: "encoderProfile",
    }),
  ),
).annotate({
  identifier: "EncodingParameters",
}) as any as S.Schema<EncodingParameters>;
export interface MediaStreamOutputConfiguration {
  DestinationConfigurations?: DestinationConfiguration[];
  EncodingName?: EncodingName;
  EncodingParameters?: EncodingParameters;
  MediaStreamName?: string;
}
export const MediaStreamOutputConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DestinationConfigurations: S.optional(__listOfDestinationConfiguration),
    EncodingName: S.optional(EncodingName),
    EncodingParameters: S.optional(EncodingParameters),
    MediaStreamName: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      DestinationConfigurations: "destinationConfigurations",
      EncodingName: "encodingName",
      EncodingParameters: "encodingParameters",
      MediaStreamName: "mediaStreamName",
    }),
  ),
).annotate({
  identifier: "MediaStreamOutputConfiguration",
}) as any as S.Schema<MediaStreamOutputConfiguration>;
export type __listOfMediaStreamOutputConfiguration =
  MediaStreamOutputConfiguration[];
export const __listOfMediaStreamOutputConfiguration = /*@__PURE__*/ S.Array(
  MediaStreamOutputConfiguration,
);
export interface NdiSourceSettings {
  SourceName?: string;
}
export const NdiSourceSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SourceName: S.optional(S.String) }).pipe(
    S.encodeKeys({ SourceName: "sourceName" }),
  ),
).annotate({
  identifier: "NdiSourceSettings",
}) as any as S.Schema<NdiSourceSettings>;
export interface Transport {
  CidrAllowList?: string[];
  MaxBitrate?: number;
  MaxLatency?: number;
  MaxSyncBuffer?: number;
  MinLatency?: number;
  Protocol?: Protocol;
  RemoteId?: string;
  SenderControlPort?: number;
  SenderIpAddress?: string;
  SmoothingLatency?: number;
  SourceListenerAddress?: string;
  SourceListenerPort?: number;
  StreamId?: string;
  NdiSpeedHqQuality?: number;
  NdiProgramName?: string;
  NdiSourceSettings?: NdiSourceSettings;
  NdiOutputTimecodeSource?: NdiOutputTimecodeSource;
}
export const Transport = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CidrAllowList: S.optional(__listOfString),
    MaxBitrate: S.optional(S.Number),
    MaxLatency: S.optional(S.Number),
    MaxSyncBuffer: S.optional(S.Number),
    MinLatency: S.optional(S.Number),
    Protocol: S.optional(Protocol),
    RemoteId: S.optional(S.String),
    SenderControlPort: S.optional(S.Number),
    SenderIpAddress: S.optional(S.String),
    SmoothingLatency: S.optional(S.Number),
    SourceListenerAddress: S.optional(S.String),
    SourceListenerPort: S.optional(S.Number),
    StreamId: S.optional(S.String),
    NdiSpeedHqQuality: S.optional(S.Number),
    NdiProgramName: S.optional(S.String),
    NdiSourceSettings: S.optional(NdiSourceSettings),
    NdiOutputTimecodeSource: S.optional(NdiOutputTimecodeSource),
  }).pipe(
    S.encodeKeys({
      CidrAllowList: "cidrAllowList",
      MaxBitrate: "maxBitrate",
      MaxLatency: "maxLatency",
      MaxSyncBuffer: "maxSyncBuffer",
      MinLatency: "minLatency",
      Protocol: "protocol",
      RemoteId: "remoteId",
      SenderControlPort: "senderControlPort",
      SenderIpAddress: "senderIpAddress",
      SmoothingLatency: "smoothingLatency",
      SourceListenerAddress: "sourceListenerAddress",
      SourceListenerPort: "sourceListenerPort",
      StreamId: "streamId",
      NdiSpeedHqQuality: "ndiSpeedHqQuality",
      NdiProgramName: "ndiProgramName",
      NdiSourceSettings: "ndiSourceSettings",
      NdiOutputTimecodeSource: "ndiOutputTimecodeSource",
    }),
  ),
).annotate({ identifier: "Transport" }) as any as S.Schema<Transport>;
export type __listOfInteger = number[];
export const __listOfInteger = /*@__PURE__*/ S.Array(S.Number);
export interface Output {
  DataTransferSubscriberFeePercent?: number;
  Description?: string;
  Destination?: string;
  Encryption?: Encryption;
  EntitlementArn?: string;
  ListenerAddress?: string;
  MediaLiveInputArn?: string;
  MediaStreamOutputConfigurations?: MediaStreamOutputConfiguration[];
  Name?: string;
  OutputArn?: string;
  Port?: number;
  Transport?: Transport;
  VpcInterfaceAttachment?: VpcInterfaceAttachment;
  BridgeArn?: string;
  BridgePorts?: number[];
  OutputStatus?: OutputStatus;
  PeerIpAddress?: string;
  RouterIntegrationState?: State;
  RouterIntegrationTransitEncryption?: FlowTransitEncryption;
  ConnectedRouterInputArn?: string;
}
export const Output = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataTransferSubscriberFeePercent: S.optional(S.Number),
    Description: S.optional(S.String),
    Destination: S.optional(S.String),
    Encryption: S.optional(Encryption),
    EntitlementArn: S.optional(S.String),
    ListenerAddress: S.optional(S.String),
    MediaLiveInputArn: S.optional(S.String),
    MediaStreamOutputConfigurations: S.optional(
      __listOfMediaStreamOutputConfiguration,
    ),
    Name: S.optional(S.String),
    OutputArn: S.optional(S.String),
    Port: S.optional(S.Number),
    Transport: S.optional(Transport),
    VpcInterfaceAttachment: S.optional(VpcInterfaceAttachment),
    BridgeArn: S.optional(S.String),
    BridgePorts: S.optional(__listOfInteger),
    OutputStatus: S.optional(OutputStatus),
    PeerIpAddress: S.optional(S.String),
    RouterIntegrationState: S.optional(State),
    RouterIntegrationTransitEncryption: S.optional(FlowTransitEncryption),
    ConnectedRouterInputArn: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      DataTransferSubscriberFeePercent: "dataTransferSubscriberFeePercent",
      Description: "description",
      Destination: "destination",
      Encryption: "encryption",
      EntitlementArn: "entitlementArn",
      ListenerAddress: "listenerAddress",
      MediaLiveInputArn: "mediaLiveInputArn",
      MediaStreamOutputConfigurations: "mediaStreamOutputConfigurations",
      Name: "name",
      OutputArn: "outputArn",
      Port: "port",
      Transport: "transport",
      VpcInterfaceAttachment: "vpcInterfaceAttachment",
      BridgeArn: "bridgeArn",
      BridgePorts: "bridgePorts",
      OutputStatus: "outputStatus",
      PeerIpAddress: "peerIpAddress",
      RouterIntegrationState: "routerIntegrationState",
      RouterIntegrationTransitEncryption: "routerIntegrationTransitEncryption",
      ConnectedRouterInputArn: "connectedRouterInputArn",
    }),
  ),
).annotate({ identifier: "Output" }) as any as S.Schema<Output>;
export type __listOfOutput = Output[];
export const __listOfOutput = /*@__PURE__*/ S.Array(Output);
export interface AddFlowOutputsResponse {
  FlowArn?: string;
  Outputs?: (Output & {
    Name: string;
    OutputArn: string;
    Encryption: Encryption & { RoleArn: string };
    MediaStreamOutputConfigurations: (MediaStreamOutputConfiguration & {
      EncodingName: EncodingName;
      MediaStreamName: string;
      DestinationConfigurations: (DestinationConfiguration & {
        DestinationIp: string;
        DestinationPort: number;
        Interface: Interface & { Name: string };
        OutboundIp: string;
      })[];
      EncodingParameters: EncodingParameters & {
        CompressionFactor: number;
        EncoderProfile: EncoderProfile;
      };
    })[];
    Transport: Transport & { Protocol: Protocol };
  })[];
}
export const AddFlowOutputsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FlowArn: S.optional(S.String),
    Outputs: S.optional(__listOfOutput),
  }).pipe(S.encodeKeys({ FlowArn: "flowArn", Outputs: "outputs" })),
).annotate({
  identifier: "AddFlowOutputsResponse",
}) as any as S.Schema<AddFlowOutputsResponse>;
export interface InputConfigurationRequest {
  InputPort?: number;
  Interface?: InterfaceRequest;
}
export const InputConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InputPort: S.optional(S.Number),
    Interface: S.optional(InterfaceRequest),
  }).pipe(S.encodeKeys({ InputPort: "inputPort", Interface: "interface" })),
).annotate({
  identifier: "InputConfigurationRequest",
}) as any as S.Schema<InputConfigurationRequest>;
export type __listOfInputConfigurationRequest = InputConfigurationRequest[];
export const __listOfInputConfigurationRequest = /*@__PURE__*/ S.Array(
  InputConfigurationRequest,
);
export interface MediaStreamSourceConfigurationRequest {
  EncodingName?: EncodingName;
  InputConfigurations?: InputConfigurationRequest[];
  MediaStreamName?: string;
}
export const MediaStreamSourceConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      EncodingName: S.optional(EncodingName),
      InputConfigurations: S.optional(__listOfInputConfigurationRequest),
      MediaStreamName: S.optional(S.String),
    }).pipe(
      S.encodeKeys({
        EncodingName: "encodingName",
        InputConfigurations: "inputConfigurations",
        MediaStreamName: "mediaStreamName",
      }),
    ),
).annotate({
  identifier: "MediaStreamSourceConfigurationRequest",
}) as any as S.Schema<MediaStreamSourceConfigurationRequest>;
export type __listOfMediaStreamSourceConfigurationRequest =
  MediaStreamSourceConfigurationRequest[];
export const __listOfMediaStreamSourceConfigurationRequest =
  /*@__PURE__*/ S.Array(MediaStreamSourceConfigurationRequest);
export interface SetGatewayBridgeSourceRequest {
  BridgeArn?: string;
  VpcInterfaceAttachment?: VpcInterfaceAttachment;
}
export const SetGatewayBridgeSourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BridgeArn: S.optional(S.String),
    VpcInterfaceAttachment: S.optional(VpcInterfaceAttachment),
  }).pipe(
    S.encodeKeys({
      BridgeArn: "bridgeArn",
      VpcInterfaceAttachment: "vpcInterfaceAttachment",
    }),
  ),
).annotate({
  identifier: "SetGatewayBridgeSourceRequest",
}) as any as S.Schema<SetGatewayBridgeSourceRequest>;
export interface SetSourceRequest {
  Decryption?: Encryption;
  Description?: string;
  EntitlementArn?: string;
  IngestPort?: number;
  MaxBitrate?: number;
  MaxLatency?: number;
  MaxSyncBuffer?: number;
  MediaStreamSourceConfigurations?: MediaStreamSourceConfigurationRequest[];
  MinLatency?: number;
  Name?: string;
  Protocol?: Protocol;
  SenderControlPort?: number;
  SenderIpAddress?: string;
  SourceListenerAddress?: string;
  SourceListenerPort?: number;
  StreamId?: string;
  VpcInterfaceName?: string;
  WhitelistCidr?: string;
  GatewayBridgeSource?: SetGatewayBridgeSourceRequest;
  NdiSourceSettings?: NdiSourceSettings;
  SourceTags?: { [key: string]: string | undefined };
  RouterIntegrationState?: State;
  RouterIntegrationTransitDecryption?: FlowTransitEncryption;
}
export const SetSourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Decryption: S.optional(Encryption),
    Description: S.optional(S.String),
    EntitlementArn: S.optional(S.String),
    IngestPort: S.optional(S.Number),
    MaxBitrate: S.optional(S.Number),
    MaxLatency: S.optional(S.Number),
    MaxSyncBuffer: S.optional(S.Number),
    MediaStreamSourceConfigurations: S.optional(
      __listOfMediaStreamSourceConfigurationRequest,
    ),
    MinLatency: S.optional(S.Number),
    Name: S.optional(S.String),
    Protocol: S.optional(Protocol),
    SenderControlPort: S.optional(S.Number),
    SenderIpAddress: S.optional(S.String),
    SourceListenerAddress: S.optional(S.String),
    SourceListenerPort: S.optional(S.Number),
    StreamId: S.optional(S.String),
    VpcInterfaceName: S.optional(S.String),
    WhitelistCidr: S.optional(S.String),
    GatewayBridgeSource: S.optional(SetGatewayBridgeSourceRequest),
    NdiSourceSettings: S.optional(NdiSourceSettings),
    SourceTags: S.optional(__mapOfString),
    RouterIntegrationState: S.optional(State),
    RouterIntegrationTransitDecryption: S.optional(FlowTransitEncryption),
  }).pipe(
    S.encodeKeys({
      Decryption: "decryption",
      Description: "description",
      EntitlementArn: "entitlementArn",
      IngestPort: "ingestPort",
      MaxBitrate: "maxBitrate",
      MaxLatency: "maxLatency",
      MaxSyncBuffer: "maxSyncBuffer",
      MediaStreamSourceConfigurations: "mediaStreamSourceConfigurations",
      MinLatency: "minLatency",
      Name: "name",
      Protocol: "protocol",
      SenderControlPort: "senderControlPort",
      SenderIpAddress: "senderIpAddress",
      SourceListenerAddress: "sourceListenerAddress",
      SourceListenerPort: "sourceListenerPort",
      StreamId: "streamId",
      VpcInterfaceName: "vpcInterfaceName",
      WhitelistCidr: "whitelistCidr",
      GatewayBridgeSource: "gatewayBridgeSource",
      NdiSourceSettings: "ndiSourceSettings",
      SourceTags: "sourceTags",
      RouterIntegrationState: "routerIntegrationState",
      RouterIntegrationTransitDecryption: "routerIntegrationTransitDecryption",
    }),
  ),
).annotate({
  identifier: "SetSourceRequest",
}) as any as S.Schema<SetSourceRequest>;
export type __listOfSetSourceRequest = SetSourceRequest[];
export const __listOfSetSourceRequest = /*@__PURE__*/ S.Array(SetSourceRequest);
export interface AddFlowSourcesRequest {
  FlowArn: string;
  Sources?: SetSourceRequest[];
}
export const AddFlowSourcesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FlowArn: S.String.pipe(T.HttpLabel("FlowArn")),
    Sources: S.optional(__listOfSetSourceRequest),
  })
    .pipe(S.encodeKeys({ Sources: "sources" }))
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/v1/flows/{FlowArn}/source" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "AddFlowSourcesRequest",
}) as any as S.Schema<AddFlowSourcesRequest>;
export interface InputConfiguration {
  InputIp?: string;
  InputPort?: number;
  Interface?: Interface;
}
export const InputConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InputIp: S.optional(S.String),
    InputPort: S.optional(S.Number),
    Interface: S.optional(Interface),
  }).pipe(
    S.encodeKeys({
      InputIp: "inputIp",
      InputPort: "inputPort",
      Interface: "interface",
    }),
  ),
).annotate({
  identifier: "InputConfiguration",
}) as any as S.Schema<InputConfiguration>;
export type __listOfInputConfiguration = InputConfiguration[];
export const __listOfInputConfiguration =
  /*@__PURE__*/ S.Array(InputConfiguration);
export interface MediaStreamSourceConfiguration {
  EncodingName?: EncodingName;
  InputConfigurations?: InputConfiguration[];
  MediaStreamName?: string;
}
export const MediaStreamSourceConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EncodingName: S.optional(EncodingName),
    InputConfigurations: S.optional(__listOfInputConfiguration),
    MediaStreamName: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      EncodingName: "encodingName",
      InputConfigurations: "inputConfigurations",
      MediaStreamName: "mediaStreamName",
    }),
  ),
).annotate({
  identifier: "MediaStreamSourceConfiguration",
}) as any as S.Schema<MediaStreamSourceConfiguration>;
export type __listOfMediaStreamSourceConfiguration =
  MediaStreamSourceConfiguration[];
export const __listOfMediaStreamSourceConfiguration = /*@__PURE__*/ S.Array(
  MediaStreamSourceConfiguration,
);
export interface GatewayBridgeSource {
  BridgeArn?: string;
  VpcInterfaceAttachment?: VpcInterfaceAttachment;
}
export const GatewayBridgeSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BridgeArn: S.optional(S.String),
    VpcInterfaceAttachment: S.optional(VpcInterfaceAttachment),
  }).pipe(
    S.encodeKeys({
      BridgeArn: "bridgeArn",
      VpcInterfaceAttachment: "vpcInterfaceAttachment",
    }),
  ),
).annotate({
  identifier: "GatewayBridgeSource",
}) as any as S.Schema<GatewayBridgeSource>;
export interface Source {
  DataTransferSubscriberFeePercent?: number;
  Decryption?: Encryption;
  Description?: string;
  EntitlementArn?: string;
  IngestIp?: string;
  IngestPort?: number;
  MediaStreamSourceConfigurations?: MediaStreamSourceConfiguration[];
  Name?: string;
  SenderControlPort?: number;
  SenderIpAddress?: string;
  SourceArn?: string;
  Transport?: Transport;
  VpcInterfaceName?: string;
  WhitelistCidr?: string;
  GatewayBridgeSource?: GatewayBridgeSource;
  PeerIpAddress?: string;
  RouterIntegrationState?: State;
  RouterIntegrationTransitDecryption?: FlowTransitEncryption;
  ConnectedRouterOutputArn?: string;
}
export const Source = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataTransferSubscriberFeePercent: S.optional(S.Number),
    Decryption: S.optional(Encryption),
    Description: S.optional(S.String),
    EntitlementArn: S.optional(S.String),
    IngestIp: S.optional(S.String),
    IngestPort: S.optional(S.Number),
    MediaStreamSourceConfigurations: S.optional(
      __listOfMediaStreamSourceConfiguration,
    ),
    Name: S.optional(S.String),
    SenderControlPort: S.optional(S.Number),
    SenderIpAddress: S.optional(S.String),
    SourceArn: S.optional(S.String),
    Transport: S.optional(Transport),
    VpcInterfaceName: S.optional(S.String),
    WhitelistCidr: S.optional(S.String),
    GatewayBridgeSource: S.optional(GatewayBridgeSource),
    PeerIpAddress: S.optional(S.String),
    RouterIntegrationState: S.optional(State),
    RouterIntegrationTransitDecryption: S.optional(FlowTransitEncryption),
    ConnectedRouterOutputArn: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      DataTransferSubscriberFeePercent: "dataTransferSubscriberFeePercent",
      Decryption: "decryption",
      Description: "description",
      EntitlementArn: "entitlementArn",
      IngestIp: "ingestIp",
      IngestPort: "ingestPort",
      MediaStreamSourceConfigurations: "mediaStreamSourceConfigurations",
      Name: "name",
      SenderControlPort: "senderControlPort",
      SenderIpAddress: "senderIpAddress",
      SourceArn: "sourceArn",
      Transport: "transport",
      VpcInterfaceName: "vpcInterfaceName",
      WhitelistCidr: "whitelistCidr",
      GatewayBridgeSource: "gatewayBridgeSource",
      PeerIpAddress: "peerIpAddress",
      RouterIntegrationState: "routerIntegrationState",
      RouterIntegrationTransitDecryption: "routerIntegrationTransitDecryption",
      ConnectedRouterOutputArn: "connectedRouterOutputArn",
    }),
  ),
).annotate({ identifier: "Source" }) as any as S.Schema<Source>;
export type __listOfSource = Source[];
export const __listOfSource = /*@__PURE__*/ S.Array(Source);
export interface AddFlowSourcesResponse {
  FlowArn?: string;
  Sources?: (Source & {
    Name: string;
    SourceArn: string;
    Decryption: Encryption & { RoleArn: string };
    MediaStreamSourceConfigurations: (MediaStreamSourceConfiguration & {
      EncodingName: EncodingName;
      MediaStreamName: string;
      InputConfigurations: (InputConfiguration & {
        InputIp: string;
        InputPort: number;
        Interface: Interface & { Name: string };
      })[];
    })[];
    Transport: Transport & { Protocol: Protocol };
    GatewayBridgeSource: GatewayBridgeSource & { BridgeArn: string };
  })[];
}
export const AddFlowSourcesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FlowArn: S.optional(S.String),
    Sources: S.optional(__listOfSource),
  }).pipe(S.encodeKeys({ FlowArn: "flowArn", Sources: "sources" })),
).annotate({
  identifier: "AddFlowSourcesResponse",
}) as any as S.Schema<AddFlowSourcesResponse>;
export type NetworkInterfaceType = "ena" | "efa" | (string & {});
export const NetworkInterfaceType = /*@__PURE__*/ S.String;

export interface VpcInterfaceRequest {
  Name?: string;
  NetworkInterfaceType?: NetworkInterfaceType;
  RoleArn?: string;
  SecurityGroupIds?: string[];
  SubnetId?: string;
  VpcInterfaceTags?: { [key: string]: string | undefined };
}
export const VpcInterfaceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    NetworkInterfaceType: S.optional(NetworkInterfaceType),
    RoleArn: S.optional(S.String),
    SecurityGroupIds: S.optional(__listOfString),
    SubnetId: S.optional(S.String),
    VpcInterfaceTags: S.optional(__mapOfString),
  }).pipe(
    S.encodeKeys({
      Name: "name",
      NetworkInterfaceType: "networkInterfaceType",
      RoleArn: "roleArn",
      SecurityGroupIds: "securityGroupIds",
      SubnetId: "subnetId",
      VpcInterfaceTags: "vpcInterfaceTags",
    }),
  ),
).annotate({
  identifier: "VpcInterfaceRequest",
}) as any as S.Schema<VpcInterfaceRequest>;
export type __listOfVpcInterfaceRequest = VpcInterfaceRequest[];
export const __listOfVpcInterfaceRequest =
  /*@__PURE__*/ S.Array(VpcInterfaceRequest);
export interface AddFlowVpcInterfacesRequest {
  FlowArn: string;
  VpcInterfaces?: VpcInterfaceRequest[];
}
export const AddFlowVpcInterfacesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FlowArn: S.String.pipe(T.HttpLabel("FlowArn")),
    VpcInterfaces: S.optional(__listOfVpcInterfaceRequest),
  })
    .pipe(S.encodeKeys({ VpcInterfaces: "vpcInterfaces" }))
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/v1/flows/{FlowArn}/vpcInterfaces" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "AddFlowVpcInterfacesRequest",
}) as any as S.Schema<AddFlowVpcInterfacesRequest>;
export interface VpcInterface {
  Name?: string;
  NetworkInterfaceIds?: string[];
  NetworkInterfaceType?: NetworkInterfaceType;
  RoleArn?: string;
  SecurityGroupIds?: string[];
  SubnetId?: string;
}
export const VpcInterface = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    NetworkInterfaceIds: S.optional(__listOfString),
    NetworkInterfaceType: S.optional(NetworkInterfaceType),
    RoleArn: S.optional(S.String),
    SecurityGroupIds: S.optional(__listOfString),
    SubnetId: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      Name: "name",
      NetworkInterfaceIds: "networkInterfaceIds",
      NetworkInterfaceType: "networkInterfaceType",
      RoleArn: "roleArn",
      SecurityGroupIds: "securityGroupIds",
      SubnetId: "subnetId",
    }),
  ),
).annotate({ identifier: "VpcInterface" }) as any as S.Schema<VpcInterface>;
export type __listOfVpcInterface = VpcInterface[];
export const __listOfVpcInterface = /*@__PURE__*/ S.Array(VpcInterface);
export interface AddFlowVpcInterfacesResponse {
  FlowArn?: string;
  VpcInterfaces?: (VpcInterface & {
    Name: string;
    NetworkInterfaceIds: __listOfString;
    NetworkInterfaceType: NetworkInterfaceType;
    RoleArn: string;
    SecurityGroupIds: __listOfString;
    SubnetId: string;
  })[];
}
export const AddFlowVpcInterfacesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FlowArn: S.optional(S.String),
    VpcInterfaces: S.optional(__listOfVpcInterface),
  }).pipe(S.encodeKeys({ FlowArn: "flowArn", VpcInterfaces: "vpcInterfaces" })),
).annotate({
  identifier: "AddFlowVpcInterfacesResponse",
}) as any as S.Schema<AddFlowVpcInterfacesResponse>;
export type RouterInputArn = string;
export type RouterInputArnList = string[];
export const RouterInputArnList = /*@__PURE__*/ S.Array(S.String);
export interface BatchGetRouterInputRequest {
  Arns: string[];
}
export const BatchGetRouterInputRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arns: RouterInputArnList.pipe(T.HttpQuery("arns")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/routerInputs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetRouterInputRequest",
}) as any as S.Schema<BatchGetRouterInputRequest>;
export type RouterInputState =
  | "CREATING"
  | "STANDBY"
  | "STARTING"
  | "ACTIVE"
  | "STOPPING"
  | "DELETING"
  | "UPDATING"
  | "ERROR"
  | "RECOVERING"
  | "MIGRATING"
  | (string & {});
export const RouterInputState = /*@__PURE__*/ S.String;

export type RouterInputType =
  | "STANDARD"
  | "FAILOVER"
  | "MERGE"
  | "MEDIACONNECT_FLOW"
  | "MEDIALIVE_CHANNEL"
  | (string & {});
export const RouterInputType = /*@__PURE__*/ S.String;

export type RouterNetworkInterfaceArn = string;
export interface RistRouterInputConfiguration {
  Port: number;
  RecoveryLatencyMilliseconds: number;
}
export const RistRouterInputConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Port: S.Number, RecoveryLatencyMilliseconds: S.Number }).pipe(
    S.encodeKeys({
      Port: "port",
      RecoveryLatencyMilliseconds: "recoveryLatencyMilliseconds",
    }),
  ),
).annotate({
  identifier: "RistRouterInputConfiguration",
}) as any as S.Schema<RistRouterInputConfiguration>;
export interface SrtDecryptionConfiguration {
  EncryptionKey: SecretsManagerEncryptionKeyConfiguration;
}
export const SrtDecryptionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EncryptionKey: SecretsManagerEncryptionKeyConfiguration }).pipe(
    S.encodeKeys({ EncryptionKey: "encryptionKey" }),
  ),
).annotate({
  identifier: "SrtDecryptionConfiguration",
}) as any as S.Schema<SrtDecryptionConfiguration>;
export interface SrtListenerRouterInputConfiguration {
  Port: number;
  MinimumLatencyMilliseconds: number;
  DecryptionConfiguration?: SrtDecryptionConfiguration;
}
export const SrtListenerRouterInputConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Port: S.Number,
    MinimumLatencyMilliseconds: S.Number,
    DecryptionConfiguration: S.optional(SrtDecryptionConfiguration),
  }).pipe(
    S.encodeKeys({
      Port: "port",
      MinimumLatencyMilliseconds: "minimumLatencyMilliseconds",
      DecryptionConfiguration: "decryptionConfiguration",
    }),
  ),
).annotate({
  identifier: "SrtListenerRouterInputConfiguration",
}) as any as S.Schema<SrtListenerRouterInputConfiguration>;
export interface SrtCallerRouterInputConfiguration {
  SourceAddress: string;
  SourcePort: number;
  MinimumLatencyMilliseconds: number;
  StreamId?: string;
  DecryptionConfiguration?: SrtDecryptionConfiguration;
}
export const SrtCallerRouterInputConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceAddress: S.String,
    SourcePort: S.Number,
    MinimumLatencyMilliseconds: S.Number,
    StreamId: S.optional(S.String),
    DecryptionConfiguration: S.optional(SrtDecryptionConfiguration),
  }).pipe(
    S.encodeKeys({
      SourceAddress: "sourceAddress",
      SourcePort: "sourcePort",
      MinimumLatencyMilliseconds: "minimumLatencyMilliseconds",
      StreamId: "streamId",
      DecryptionConfiguration: "decryptionConfiguration",
    }),
  ),
).annotate({
  identifier: "SrtCallerRouterInputConfiguration",
}) as any as S.Schema<SrtCallerRouterInputConfiguration>;
export type ForwardErrorCorrectionState =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export const ForwardErrorCorrectionState = /*@__PURE__*/ S.String;

export interface RtpRouterInputConfiguration {
  Port: number;
  ForwardErrorCorrection?: ForwardErrorCorrectionState;
}
export const RtpRouterInputConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Port: S.Number,
    ForwardErrorCorrection: S.optional(ForwardErrorCorrectionState),
  }).pipe(
    S.encodeKeys({
      Port: "port",
      ForwardErrorCorrection: "forwardErrorCorrection",
    }),
  ),
).annotate({
  identifier: "RtpRouterInputConfiguration",
}) as any as S.Schema<RtpRouterInputConfiguration>;
export type RouterInputProtocolConfiguration =
  | {
      Rist: RistRouterInputConfiguration;
      SrtListener?: never;
      SrtCaller?: never;
      Rtp?: never;
    }
  | {
      Rist?: never;
      SrtListener: SrtListenerRouterInputConfiguration;
      SrtCaller?: never;
      Rtp?: never;
    }
  | {
      Rist?: never;
      SrtListener?: never;
      SrtCaller: SrtCallerRouterInputConfiguration;
      Rtp?: never;
    }
  | {
      Rist?: never;
      SrtListener?: never;
      SrtCaller?: never;
      Rtp: RtpRouterInputConfiguration;
    };
export const RouterInputProtocolConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ Rist: RistRouterInputConfiguration }),
  S.Struct({ SrtListener: SrtListenerRouterInputConfiguration }),
  S.Struct({ SrtCaller: SrtCallerRouterInputConfiguration }),
  S.Struct({ Rtp: RtpRouterInputConfiguration }),
]);
export type RouterInputProtocol =
  | "RTP"
  | "RIST"
  | "SRT_CALLER"
  | "SRT_LISTENER"
  | (string & {});
export const RouterInputProtocol = /*@__PURE__*/ S.String;

export interface StandardRouterInputConfiguration {
  NetworkInterfaceArn: string;
  ProtocolConfiguration: RouterInputProtocolConfiguration;
  Protocol?: RouterInputProtocol;
}
export const StandardRouterInputConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NetworkInterfaceArn: S.String,
    ProtocolConfiguration: RouterInputProtocolConfiguration,
    Protocol: S.optional(RouterInputProtocol),
  }).pipe(
    S.encodeKeys({
      NetworkInterfaceArn: "networkInterfaceArn",
      ProtocolConfiguration: "protocolConfiguration",
      Protocol: "protocol",
    }),
  ),
).annotate({
  identifier: "StandardRouterInputConfiguration",
}) as any as S.Schema<StandardRouterInputConfiguration>;
export type MediaLiveChannelArn = string;
export type MediaLiveChannelPipelineId =
  | "PIPELINE_0"
  | "PIPELINE_1"
  | (string & {});
export const MediaLiveChannelPipelineId = /*@__PURE__*/ S.String;

export type MediaLiveTransitEncryptionKeyType =
  | "SECRETS_MANAGER"
  | "AUTOMATIC"
  | (string & {});
export const MediaLiveTransitEncryptionKeyType = /*@__PURE__*/ S.String;

export type MediaLiveTransitEncryptionKeyConfiguration =
  | {
      SecretsManager: SecretsManagerEncryptionKeyConfiguration;
      Automatic?: never;
    }
  | { SecretsManager?: never; Automatic: AutomaticEncryptionKeyConfiguration };
export const MediaLiveTransitEncryptionKeyConfiguration = /*@__PURE__*/ S.Union(
  [
    S.Struct({ SecretsManager: SecretsManagerEncryptionKeyConfiguration }),
    S.Struct({ Automatic: AutomaticEncryptionKeyConfiguration }),
  ],
);
export interface MediaLiveTransitEncryption {
  EncryptionKeyType?: MediaLiveTransitEncryptionKeyType;
  EncryptionKeyConfiguration: MediaLiveTransitEncryptionKeyConfiguration;
}
export const MediaLiveTransitEncryption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EncryptionKeyType: S.optional(MediaLiveTransitEncryptionKeyType),
    EncryptionKeyConfiguration: MediaLiveTransitEncryptionKeyConfiguration,
  }).pipe(
    S.encodeKeys({
      EncryptionKeyType: "encryptionKeyType",
      EncryptionKeyConfiguration: "encryptionKeyConfiguration",
    }),
  ),
).annotate({
  identifier: "MediaLiveTransitEncryption",
}) as any as S.Schema<MediaLiveTransitEncryption>;
export interface MediaLiveChannelRouterInputConfiguration {
  MediaLiveChannelArn?: string;
  MediaLivePipelineId?: MediaLiveChannelPipelineId;
  MediaLiveChannelOutputName?: string;
  SourceTransitDecryption: MediaLiveTransitEncryption;
}
export const MediaLiveChannelRouterInputConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      MediaLiveChannelArn: S.optional(S.String),
      MediaLivePipelineId: S.optional(MediaLiveChannelPipelineId),
      MediaLiveChannelOutputName: S.optional(S.String),
      SourceTransitDecryption: MediaLiveTransitEncryption,
    }).pipe(
      S.encodeKeys({
        MediaLiveChannelArn: "mediaLiveChannelArn",
        MediaLivePipelineId: "mediaLivePipelineId",
        MediaLiveChannelOutputName: "mediaLiveChannelOutputName",
        SourceTransitDecryption: "sourceTransitDecryption",
      }),
    ),
).annotate({
  identifier: "MediaLiveChannelRouterInputConfiguration",
}) as any as S.Schema<MediaLiveChannelRouterInputConfiguration>;
export type FailoverRouterInputProtocolConfiguration =
  | {
      Rist: RistRouterInputConfiguration;
      SrtListener?: never;
      SrtCaller?: never;
      Rtp?: never;
    }
  | {
      Rist?: never;
      SrtListener: SrtListenerRouterInputConfiguration;
      SrtCaller?: never;
      Rtp?: never;
    }
  | {
      Rist?: never;
      SrtListener?: never;
      SrtCaller: SrtCallerRouterInputConfiguration;
      Rtp?: never;
    }
  | {
      Rist?: never;
      SrtListener?: never;
      SrtCaller?: never;
      Rtp: RtpRouterInputConfiguration;
    };
export const FailoverRouterInputProtocolConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ Rist: RistRouterInputConfiguration }),
  S.Struct({ SrtListener: SrtListenerRouterInputConfiguration }),
  S.Struct({ SrtCaller: SrtCallerRouterInputConfiguration }),
  S.Struct({ Rtp: RtpRouterInputConfiguration }),
]);
export type FailoverRouterInputProtocolConfigurationList =
  FailoverRouterInputProtocolConfiguration[];
export const FailoverRouterInputProtocolConfigurationList =
  /*@__PURE__*/ S.Array(FailoverRouterInputProtocolConfiguration);
export type FailoverInputSourcePriorityMode =
  | "NO_PRIORITY"
  | "PRIMARY_SECONDARY"
  | (string & {});
export const FailoverInputSourcePriorityMode = /*@__PURE__*/ S.String;

export interface FailoverRouterInputConfiguration {
  NetworkInterfaceArn: string;
  ProtocolConfigurations: FailoverRouterInputProtocolConfiguration[];
  SourcePriorityMode: FailoverInputSourcePriorityMode;
  PrimarySourceIndex?: number;
}
export const FailoverRouterInputConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NetworkInterfaceArn: S.String,
    ProtocolConfigurations: FailoverRouterInputProtocolConfigurationList,
    SourcePriorityMode: FailoverInputSourcePriorityMode,
    PrimarySourceIndex: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      NetworkInterfaceArn: "networkInterfaceArn",
      ProtocolConfigurations: "protocolConfigurations",
      SourcePriorityMode: "sourcePriorityMode",
      PrimarySourceIndex: "primarySourceIndex",
    }),
  ),
).annotate({
  identifier: "FailoverRouterInputConfiguration",
}) as any as S.Schema<FailoverRouterInputConfiguration>;
export type FlowOutputArn = string;
export interface MediaConnectFlowRouterInputConfiguration {
  FlowArn?: string;
  FlowOutputArn?: string;
  SourceTransitDecryption: FlowTransitEncryption;
}
export const MediaConnectFlowRouterInputConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      FlowArn: S.optional(S.String),
      FlowOutputArn: S.optional(S.String),
      SourceTransitDecryption: FlowTransitEncryption,
    }).pipe(
      S.encodeKeys({
        FlowArn: "flowArn",
        FlowOutputArn: "flowOutputArn",
        SourceTransitDecryption: "sourceTransitDecryption",
      }),
    ),
).annotate({
  identifier: "MediaConnectFlowRouterInputConfiguration",
}) as any as S.Schema<MediaConnectFlowRouterInputConfiguration>;
export type MergeRouterInputProtocolConfiguration =
  | { Rtp: RtpRouterInputConfiguration; Rist?: never }
  | { Rtp?: never; Rist: RistRouterInputConfiguration };
export const MergeRouterInputProtocolConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ Rtp: RtpRouterInputConfiguration }),
  S.Struct({ Rist: RistRouterInputConfiguration }),
]);
export type MergeRouterInputProtocolConfigurationList =
  MergeRouterInputProtocolConfiguration[];
export const MergeRouterInputProtocolConfigurationList = /*@__PURE__*/ S.Array(
  MergeRouterInputProtocolConfiguration,
);
export interface MergeRouterInputConfiguration {
  NetworkInterfaceArn: string;
  ProtocolConfigurations: MergeRouterInputProtocolConfiguration[];
  MergeRecoveryWindowMilliseconds: number;
}
export const MergeRouterInputConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NetworkInterfaceArn: S.String,
    ProtocolConfigurations: MergeRouterInputProtocolConfigurationList,
    MergeRecoveryWindowMilliseconds: S.Number,
  }).pipe(
    S.encodeKeys({
      NetworkInterfaceArn: "networkInterfaceArn",
      ProtocolConfigurations: "protocolConfigurations",
      MergeRecoveryWindowMilliseconds: "mergeRecoveryWindowMilliseconds",
    }),
  ),
).annotate({
  identifier: "MergeRouterInputConfiguration",
}) as any as S.Schema<MergeRouterInputConfiguration>;
export type RouterInputConfiguration =
  | {
      Standard: StandardRouterInputConfiguration;
      MediaLiveChannel?: never;
      Failover?: never;
      MediaConnectFlow?: never;
      Merge?: never;
    }
  | {
      Standard?: never;
      MediaLiveChannel: MediaLiveChannelRouterInputConfiguration;
      Failover?: never;
      MediaConnectFlow?: never;
      Merge?: never;
    }
  | {
      Standard?: never;
      MediaLiveChannel?: never;
      Failover: FailoverRouterInputConfiguration;
      MediaConnectFlow?: never;
      Merge?: never;
    }
  | {
      Standard?: never;
      MediaLiveChannel?: never;
      Failover?: never;
      MediaConnectFlow: MediaConnectFlowRouterInputConfiguration;
      Merge?: never;
    }
  | {
      Standard?: never;
      MediaLiveChannel?: never;
      Failover?: never;
      MediaConnectFlow?: never;
      Merge: MergeRouterInputConfiguration;
    };
export const RouterInputConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ Standard: StandardRouterInputConfiguration }),
  S.Struct({ MediaLiveChannel: MediaLiveChannelRouterInputConfiguration }),
  S.Struct({ Failover: FailoverRouterInputConfiguration }),
  S.Struct({ MediaConnectFlow: MediaConnectFlowRouterInputConfiguration }),
  S.Struct({ Merge: MergeRouterInputConfiguration }),
]);
export type RouterInputTier =
  | "INPUT_100"
  | "INPUT_50"
  | "INPUT_20"
  | (string & {});
export const RouterInputTier = /*@__PURE__*/ S.String;

export type RoutingScope = "REGIONAL" | "GLOBAL" | (string & {});
export const RoutingScope = /*@__PURE__*/ S.String;

export interface RouterInputMessage {
  Code: string;
  Message: string;
}
export const RouterInputMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Code: S.String, Message: S.String }).pipe(
    S.encodeKeys({ Code: "code", Message: "message" }),
  ),
).annotate({
  identifier: "RouterInputMessage",
}) as any as S.Schema<RouterInputMessage>;
export type RouterInputMessages = RouterInputMessage[];
export const RouterInputMessages = /*@__PURE__*/ S.Array(RouterInputMessage);
export type RouterInputTransitEncryptionKeyType =
  | "SECRETS_MANAGER"
  | "AUTOMATIC"
  | (string & {});
export const RouterInputTransitEncryptionKeyType = /*@__PURE__*/ S.String;

export type RouterInputTransitEncryptionKeyConfiguration =
  | {
      SecretsManager: SecretsManagerEncryptionKeyConfiguration;
      Automatic?: never;
    }
  | { SecretsManager?: never; Automatic: AutomaticEncryptionKeyConfiguration };
export const RouterInputTransitEncryptionKeyConfiguration =
  /*@__PURE__*/ S.Union([
    S.Struct({ SecretsManager: SecretsManagerEncryptionKeyConfiguration }),
    S.Struct({ Automatic: AutomaticEncryptionKeyConfiguration }),
  ]);
export interface RouterInputTransitEncryption {
  EncryptionKeyType?: RouterInputTransitEncryptionKeyType;
  EncryptionKeyConfiguration: RouterInputTransitEncryptionKeyConfiguration;
}
export const RouterInputTransitEncryption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EncryptionKeyType: S.optional(RouterInputTransitEncryptionKeyType),
    EncryptionKeyConfiguration: RouterInputTransitEncryptionKeyConfiguration,
  }).pipe(
    S.encodeKeys({
      EncryptionKeyType: "encryptionKeyType",
      EncryptionKeyConfiguration: "encryptionKeyConfiguration",
    }),
  ),
).annotate({
  identifier: "RouterInputTransitEncryption",
}) as any as S.Schema<RouterInputTransitEncryption>;
export interface StandardRouterInputStreamDetails {
  SourceIpAddress?: string;
}
export const StandardRouterInputStreamDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SourceIpAddress: S.optional(S.String) }).pipe(
    S.encodeKeys({ SourceIpAddress: "sourceIpAddress" }),
  ),
).annotate({
  identifier: "StandardRouterInputStreamDetails",
}) as any as S.Schema<StandardRouterInputStreamDetails>;
export interface MediaLiveChannelRouterInputStreamDetails {}
export const MediaLiveChannelRouterInputStreamDetails = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "MediaLiveChannelRouterInputStreamDetails",
}) as any as S.Schema<MediaLiveChannelRouterInputStreamDetails>;
export interface FailoverRouterInputIndexedStreamDetails {
  SourceIndex: number;
  SourceIpAddress?: string;
}
export const FailoverRouterInputIndexedStreamDetails = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      SourceIndex: S.Number,
      SourceIpAddress: S.optional(S.String),
    }).pipe(
      S.encodeKeys({
        SourceIndex: "sourceIndex",
        SourceIpAddress: "sourceIpAddress",
      }),
    ),
).annotate({
  identifier: "FailoverRouterInputIndexedStreamDetails",
}) as any as S.Schema<FailoverRouterInputIndexedStreamDetails>;
export interface FailoverRouterInputStreamDetails {
  SourceIndexZeroStreamDetails: FailoverRouterInputIndexedStreamDetails;
  SourceIndexOneStreamDetails: FailoverRouterInputIndexedStreamDetails;
}
export const FailoverRouterInputStreamDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceIndexZeroStreamDetails: FailoverRouterInputIndexedStreamDetails,
    SourceIndexOneStreamDetails: FailoverRouterInputIndexedStreamDetails,
  }).pipe(
    S.encodeKeys({
      SourceIndexZeroStreamDetails: "sourceIndexZeroStreamDetails",
      SourceIndexOneStreamDetails: "sourceIndexOneStreamDetails",
    }),
  ),
).annotate({
  identifier: "FailoverRouterInputStreamDetails",
}) as any as S.Schema<FailoverRouterInputStreamDetails>;
export interface MediaConnectFlowRouterInputStreamDetails {}
export const MediaConnectFlowRouterInputStreamDetails = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "MediaConnectFlowRouterInputStreamDetails",
}) as any as S.Schema<MediaConnectFlowRouterInputStreamDetails>;
export interface MergeRouterInputIndexedStreamDetails {
  SourceIndex: number;
  SourceIpAddress?: string;
}
export const MergeRouterInputIndexedStreamDetails = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      SourceIndex: S.Number,
      SourceIpAddress: S.optional(S.String),
    }).pipe(
      S.encodeKeys({
        SourceIndex: "sourceIndex",
        SourceIpAddress: "sourceIpAddress",
      }),
    ),
).annotate({
  identifier: "MergeRouterInputIndexedStreamDetails",
}) as any as S.Schema<MergeRouterInputIndexedStreamDetails>;
export interface MergeRouterInputStreamDetails {
  SourceIndexZeroStreamDetails: MergeRouterInputIndexedStreamDetails;
  SourceIndexOneStreamDetails: MergeRouterInputIndexedStreamDetails;
}
export const MergeRouterInputStreamDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceIndexZeroStreamDetails: MergeRouterInputIndexedStreamDetails,
    SourceIndexOneStreamDetails: MergeRouterInputIndexedStreamDetails,
  }).pipe(
    S.encodeKeys({
      SourceIndexZeroStreamDetails: "sourceIndexZeroStreamDetails",
      SourceIndexOneStreamDetails: "sourceIndexOneStreamDetails",
    }),
  ),
).annotate({
  identifier: "MergeRouterInputStreamDetails",
}) as any as S.Schema<MergeRouterInputStreamDetails>;
export type RouterInputStreamDetails =
  | {
      Standard: StandardRouterInputStreamDetails;
      MediaLiveChannel?: never;
      Failover?: never;
      MediaConnectFlow?: never;
      Merge?: never;
    }
  | {
      Standard?: never;
      MediaLiveChannel: MediaLiveChannelRouterInputStreamDetails;
      Failover?: never;
      MediaConnectFlow?: never;
      Merge?: never;
    }
  | {
      Standard?: never;
      MediaLiveChannel?: never;
      Failover: FailoverRouterInputStreamDetails;
      MediaConnectFlow?: never;
      Merge?: never;
    }
  | {
      Standard?: never;
      MediaLiveChannel?: never;
      Failover?: never;
      MediaConnectFlow: MediaConnectFlowRouterInputStreamDetails;
      Merge?: never;
    }
  | {
      Standard?: never;
      MediaLiveChannel?: never;
      Failover?: never;
      MediaConnectFlow?: never;
      Merge: MergeRouterInputStreamDetails;
    };
export const RouterInputStreamDetails = /*@__PURE__*/ S.Union([
  S.Struct({ Standard: StandardRouterInputStreamDetails }),
  S.Struct({ MediaLiveChannel: MediaLiveChannelRouterInputStreamDetails }),
  S.Struct({ Failover: FailoverRouterInputStreamDetails }),
  S.Struct({ MediaConnectFlow: MediaConnectFlowRouterInputStreamDetails }),
  S.Struct({ Merge: MergeRouterInputStreamDetails }),
]);
export type MaintenanceType = "PREFERRED_DAY_TIME" | "DEFAULT" | (string & {});
export const MaintenanceType = /*@__PURE__*/ S.String;

export type Day =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY"
  | (string & {});
export const Day = /*@__PURE__*/ S.String;

export interface PreferredDayTimeMaintenanceConfiguration {
  Day: Day;
  Time: string;
}
export const PreferredDayTimeMaintenanceConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ Day: Day, Time: S.String }).pipe(
      S.encodeKeys({ Day: "day", Time: "time" }),
    ),
).annotate({
  identifier: "PreferredDayTimeMaintenanceConfiguration",
}) as any as S.Schema<PreferredDayTimeMaintenanceConfiguration>;
export interface DefaultMaintenanceConfiguration {}
export const DefaultMaintenanceConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DefaultMaintenanceConfiguration",
}) as any as S.Schema<DefaultMaintenanceConfiguration>;
export type MaintenanceConfiguration =
  | {
      PreferredDayTime: PreferredDayTimeMaintenanceConfiguration;
      Default?: never;
    }
  | { PreferredDayTime?: never; Default: DefaultMaintenanceConfiguration };
export const MaintenanceConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ PreferredDayTime: PreferredDayTimeMaintenanceConfiguration }),
  S.Struct({ Default: DefaultMaintenanceConfiguration }),
]);
export type MaintenanceScheduleType = "WINDOW" | (string & {});
export const MaintenanceScheduleType = /*@__PURE__*/ S.String;

export interface WindowMaintenanceSchedule {
  Start: Date;
  End: Date;
  ScheduledTime: Date;
}
export const WindowMaintenanceSchedule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Start: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    End: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ScheduledTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }).pipe(
    S.encodeKeys({
      Start: "start",
      End: "end",
      ScheduledTime: "scheduledTime",
    }),
  ),
).annotate({
  identifier: "WindowMaintenanceSchedule",
}) as any as S.Schema<WindowMaintenanceSchedule>;
export type MaintenanceSchedule = { Window: WindowMaintenanceSchedule };
export const MaintenanceSchedule = /*@__PURE__*/ S.Union([
  S.Struct({ Window: WindowMaintenanceSchedule }),
]);
export type RouterContentQualityAnalysisType = "CONTENT_LEVEL" | (string & {});
export const RouterContentQualityAnalysisType = /*@__PURE__*/ S.String;

export type ContentQualityAnalysisState =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export const ContentQualityAnalysisState = /*@__PURE__*/ S.String;

export type RouterCqaThresholdSeconds = number;
export interface BlackFramesConfiguration {
  State: ContentQualityAnalysisState;
  ThresholdSeconds: number;
}
export const BlackFramesConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    State: ContentQualityAnalysisState,
    ThresholdSeconds: S.Number,
  }).pipe(
    S.encodeKeys({ State: "state", ThresholdSeconds: "thresholdSeconds" }),
  ),
).annotate({
  identifier: "BlackFramesConfiguration",
}) as any as S.Schema<BlackFramesConfiguration>;
export interface FrozenFramesConfiguration {
  State: ContentQualityAnalysisState;
  ThresholdSeconds: number;
}
export const FrozenFramesConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    State: ContentQualityAnalysisState,
    ThresholdSeconds: S.Number,
  }).pipe(
    S.encodeKeys({ State: "state", ThresholdSeconds: "thresholdSeconds" }),
  ),
).annotate({
  identifier: "FrozenFramesConfiguration",
}) as any as S.Schema<FrozenFramesConfiguration>;
export interface SilentAudioConfiguration {
  State: ContentQualityAnalysisState;
  ThresholdSeconds: number;
}
export const SilentAudioConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    State: ContentQualityAnalysisState,
    ThresholdSeconds: S.Number,
  }).pipe(
    S.encodeKeys({ State: "state", ThresholdSeconds: "thresholdSeconds" }),
  ),
).annotate({
  identifier: "SilentAudioConfiguration",
}) as any as S.Schema<SilentAudioConfiguration>;
export interface ContentQualityAnalysisFeatureConfiguration {
  BlackFrames?: BlackFramesConfiguration;
  FrozenFrames?: FrozenFramesConfiguration;
  SilentAudio?: SilentAudioConfiguration;
}
export const ContentQualityAnalysisFeatureConfiguration =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      BlackFrames: S.optional(BlackFramesConfiguration),
      FrozenFrames: S.optional(FrozenFramesConfiguration),
      SilentAudio: S.optional(SilentAudioConfiguration),
    }).pipe(
      S.encodeKeys({
        BlackFrames: "blackFrames",
        FrozenFrames: "frozenFrames",
        SilentAudio: "silentAudio",
      }),
    ),
  ).annotate({
    identifier: "ContentQualityAnalysisFeatureConfiguration",
  }) as any as S.Schema<ContentQualityAnalysisFeatureConfiguration>;
export type RouterContentQualityAnalysisConfiguration = {
  ContentLevel: ContentQualityAnalysisFeatureConfiguration;
};
export const RouterContentQualityAnalysisConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ ContentLevel: ContentQualityAnalysisFeatureConfiguration }),
]);
export interface RouterInput {
  Name: string;
  Arn: string;
  Id: string;
  State: RouterInputState;
  InputType: RouterInputType;
  Configuration: RouterInputConfiguration;
  RoutedOutputs: number;
  MaximumRoutedOutputs?: number;
  RegionName: string;
  AvailabilityZone: string;
  MaximumBitrate: number;
  Tier: RouterInputTier;
  RoutingScope: RoutingScope;
  CreatedAt: Date;
  UpdatedAt: Date;
  Messages: RouterInputMessage[];
  TransitEncryption: RouterInputTransitEncryption;
  Tags: { [key: string]: string | undefined };
  StreamDetails: RouterInputStreamDetails;
  IpAddress?: string;
  MaintenanceType: MaintenanceType;
  MaintenanceConfiguration: MaintenanceConfiguration;
  MaintenanceScheduleType?: MaintenanceScheduleType;
  MaintenanceSchedule?: MaintenanceSchedule;
  ContentQualityAnalysisType?: RouterContentQualityAnalysisType;
  ContentQualityAnalysisConfiguration?: RouterContentQualityAnalysisConfiguration;
}
export const RouterInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Arn: S.String,
    Id: S.String,
    State: RouterInputState,
    InputType: RouterInputType,
    Configuration: RouterInputConfiguration,
    RoutedOutputs: S.Number,
    MaximumRoutedOutputs: S.optional(S.Number),
    RegionName: S.String,
    AvailabilityZone: S.String,
    MaximumBitrate: S.Number,
    Tier: RouterInputTier,
    RoutingScope: RoutingScope,
    CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    Messages: RouterInputMessages,
    TransitEncryption: RouterInputTransitEncryption,
    Tags: __mapOfString,
    StreamDetails: RouterInputStreamDetails,
    IpAddress: S.optional(S.String),
    MaintenanceType: MaintenanceType,
    MaintenanceConfiguration: MaintenanceConfiguration,
    MaintenanceScheduleType: S.optional(MaintenanceScheduleType),
    MaintenanceSchedule: S.optional(MaintenanceSchedule),
    ContentQualityAnalysisType: S.optional(RouterContentQualityAnalysisType),
    ContentQualityAnalysisConfiguration: S.optional(
      RouterContentQualityAnalysisConfiguration,
    ),
  }).pipe(
    S.encodeKeys({
      Name: "name",
      Arn: "arn",
      Id: "id",
      State: "state",
      InputType: "inputType",
      Configuration: "configuration",
      RoutedOutputs: "routedOutputs",
      MaximumRoutedOutputs: "maximumRoutedOutputs",
      RegionName: "regionName",
      AvailabilityZone: "availabilityZone",
      MaximumBitrate: "maximumBitrate",
      Tier: "tier",
      RoutingScope: "routingScope",
      CreatedAt: "createdAt",
      UpdatedAt: "updatedAt",
      Messages: "messages",
      TransitEncryption: "transitEncryption",
      Tags: "tags",
      StreamDetails: "streamDetails",
      IpAddress: "ipAddress",
      MaintenanceType: "maintenanceType",
      MaintenanceConfiguration: "maintenanceConfiguration",
      MaintenanceScheduleType: "maintenanceScheduleType",
      MaintenanceSchedule: "maintenanceSchedule",
      ContentQualityAnalysisType: "contentQualityAnalysisType",
      ContentQualityAnalysisConfiguration:
        "contentQualityAnalysisConfiguration",
    }),
  ),
).annotate({ identifier: "RouterInput" }) as any as S.Schema<RouterInput>;
export type RouterInputList = RouterInput[];
export const RouterInputList = /*@__PURE__*/ S.Array(RouterInput);
export interface BatchGetRouterInputError_ {
  Arn: string;
  Code: string;
  Message: string;
}
export const BatchGetRouterInputError_ = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String, Code: S.String, Message: S.String }).pipe(
    S.encodeKeys({ Arn: "arn", Code: "code", Message: "message" }),
  ),
).annotate({
  identifier: "BatchGetRouterInputError",
}) as any as S.Schema<BatchGetRouterInputError_>;
export type BatchGetRouterInputErrorList = BatchGetRouterInputError_[];
export const BatchGetRouterInputErrorList = /*@__PURE__*/ S.Array(
  BatchGetRouterInputError_,
);
export interface BatchGetRouterInputResponse {
  RouterInputs: (RouterInput & {
    ContentQualityAnalysisType: RouterContentQualityAnalysisType;
    ContentQualityAnalysisConfiguration: RouterContentQualityAnalysisConfiguration;
  })[];
  Errors: BatchGetRouterInputError_[];
}
export const BatchGetRouterInputResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RouterInputs: RouterInputList,
    Errors: BatchGetRouterInputErrorList,
  }).pipe(S.encodeKeys({ RouterInputs: "routerInputs", Errors: "errors" })),
).annotate({
  identifier: "BatchGetRouterInputResponse",
}) as any as S.Schema<BatchGetRouterInputResponse>;
export type RouterNetworkInterfaceArnList = string[];
export const RouterNetworkInterfaceArnList = /*@__PURE__*/ S.Array(S.String);
export interface BatchGetRouterNetworkInterfaceRequest {
  Arns: string[];
}
export const BatchGetRouterNetworkInterfaceRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Arns: RouterNetworkInterfaceArnList.pipe(T.HttpQuery("arns")),
    }).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/v1/routerNetworkInterfaces" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "BatchGetRouterNetworkInterfaceRequest",
}) as any as S.Schema<BatchGetRouterNetworkInterfaceRequest>;
export type RouterNetworkInterfaceState =
  | "CREATING"
  | "ACTIVE"
  | "UPDATING"
  | "DELETING"
  | "ERROR"
  | "RECOVERING"
  | (string & {});
export const RouterNetworkInterfaceState = /*@__PURE__*/ S.String;

export type RouterNetworkInterfaceType = "PUBLIC" | "VPC" | (string & {});
export const RouterNetworkInterfaceType = /*@__PURE__*/ S.String;

export interface PublicRouterNetworkInterfaceRule {
  Cidr: string;
}
export const PublicRouterNetworkInterfaceRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Cidr: S.String }).pipe(S.encodeKeys({ Cidr: "cidr" })),
).annotate({
  identifier: "PublicRouterNetworkInterfaceRule",
}) as any as S.Schema<PublicRouterNetworkInterfaceRule>;
export type NetworkInterfaceRuleList = PublicRouterNetworkInterfaceRule[];
export const NetworkInterfaceRuleList = /*@__PURE__*/ S.Array(
  PublicRouterNetworkInterfaceRule,
);
export interface PublicRouterNetworkInterfaceConfiguration {
  AllowRules: PublicRouterNetworkInterfaceRule[];
}
export const PublicRouterNetworkInterfaceConfiguration =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ AllowRules: NetworkInterfaceRuleList }).pipe(
      S.encodeKeys({ AllowRules: "allowRules" }),
    ),
  ).annotate({
    identifier: "PublicRouterNetworkInterfaceConfiguration",
  }) as any as S.Schema<PublicRouterNetworkInterfaceConfiguration>;
export type SecurityGroupIdList = string[];
export const SecurityGroupIdList = /*@__PURE__*/ S.Array(S.String);
export interface VpcRouterNetworkInterfaceConfiguration {
  SecurityGroupIds: string[];
  SubnetId: string;
}
export const VpcRouterNetworkInterfaceConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      SecurityGroupIds: SecurityGroupIdList,
      SubnetId: S.String,
    }).pipe(
      S.encodeKeys({
        SecurityGroupIds: "securityGroupIds",
        SubnetId: "subnetId",
      }),
    ),
).annotate({
  identifier: "VpcRouterNetworkInterfaceConfiguration",
}) as any as S.Schema<VpcRouterNetworkInterfaceConfiguration>;
export type RouterNetworkInterfaceConfiguration =
  | { Public: PublicRouterNetworkInterfaceConfiguration; Vpc?: never }
  | { Public?: never; Vpc: VpcRouterNetworkInterfaceConfiguration };
export const RouterNetworkInterfaceConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ Public: PublicRouterNetworkInterfaceConfiguration }),
  S.Struct({ Vpc: VpcRouterNetworkInterfaceConfiguration }),
]);
export interface RouterNetworkInterface {
  Name: string;
  Arn: string;
  Id: string;
  State: RouterNetworkInterfaceState;
  NetworkInterfaceType: RouterNetworkInterfaceType;
  Configuration: RouterNetworkInterfaceConfiguration;
  AssociatedOutputCount: number;
  AssociatedInputCount: number;
  RegionName: string;
  CreatedAt: Date;
  UpdatedAt: Date;
  Tags: { [key: string]: string | undefined };
}
export const RouterNetworkInterface = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Arn: S.String,
    Id: S.String,
    State: RouterNetworkInterfaceState,
    NetworkInterfaceType: RouterNetworkInterfaceType,
    Configuration: RouterNetworkInterfaceConfiguration,
    AssociatedOutputCount: S.Number,
    AssociatedInputCount: S.Number,
    RegionName: S.String,
    CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    Tags: __mapOfString,
  }).pipe(
    S.encodeKeys({
      Name: "name",
      Arn: "arn",
      Id: "id",
      State: "state",
      NetworkInterfaceType: "networkInterfaceType",
      Configuration: "configuration",
      AssociatedOutputCount: "associatedOutputCount",
      AssociatedInputCount: "associatedInputCount",
      RegionName: "regionName",
      CreatedAt: "createdAt",
      UpdatedAt: "updatedAt",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "RouterNetworkInterface",
}) as any as S.Schema<RouterNetworkInterface>;
export type RouterNetworkInterfaceList = RouterNetworkInterface[];
export const RouterNetworkInterfaceList = /*@__PURE__*/ S.Array(
  RouterNetworkInterface,
);
export interface BatchGetRouterNetworkInterfaceError_ {
  Arn: string;
  Code: string;
  Message: string;
}
export const BatchGetRouterNetworkInterfaceError_ = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ Arn: S.String, Code: S.String, Message: S.String }).pipe(
      S.encodeKeys({ Arn: "arn", Code: "code", Message: "message" }),
    ),
).annotate({
  identifier: "BatchGetRouterNetworkInterfaceError",
}) as any as S.Schema<BatchGetRouterNetworkInterfaceError_>;
export type BatchGetRouterNetworkInterfaceErrorList =
  BatchGetRouterNetworkInterfaceError_[];
export const BatchGetRouterNetworkInterfaceErrorList = /*@__PURE__*/ S.Array(
  BatchGetRouterNetworkInterfaceError_,
);
export interface BatchGetRouterNetworkInterfaceResponse {
  RouterNetworkInterfaces: RouterNetworkInterface[];
  Errors: BatchGetRouterNetworkInterfaceError_[];
}
export const BatchGetRouterNetworkInterfaceResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      RouterNetworkInterfaces: RouterNetworkInterfaceList,
      Errors: BatchGetRouterNetworkInterfaceErrorList,
    }).pipe(
      S.encodeKeys({
        RouterNetworkInterfaces: "routerNetworkInterfaces",
        Errors: "errors",
      }),
    ),
).annotate({
  identifier: "BatchGetRouterNetworkInterfaceResponse",
}) as any as S.Schema<BatchGetRouterNetworkInterfaceResponse>;
export type RouterOutputArn = string;
export type RouterOutputArnList = string[];
export const RouterOutputArnList = /*@__PURE__*/ S.Array(S.String);
export interface BatchGetRouterOutputRequest {
  Arns: string[];
}
export const BatchGetRouterOutputRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arns: RouterOutputArnList.pipe(T.HttpQuery("arns")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/routerOutputs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetRouterOutputRequest",
}) as any as S.Schema<BatchGetRouterOutputRequest>;
export type RouterOutputState =
  | "CREATING"
  | "STANDBY"
  | "STARTING"
  | "ACTIVE"
  | "STOPPING"
  | "DELETING"
  | "UPDATING"
  | "ERROR"
  | "RECOVERING"
  | "MIGRATING"
  | (string & {});
export const RouterOutputState = /*@__PURE__*/ S.String;

export type RouterOutputType =
  | "STANDARD"
  | "MEDIACONNECT_FLOW"
  | "MEDIALIVE_INPUT"
  | (string & {});
export const RouterOutputType = /*@__PURE__*/ S.String;

export interface RistRouterOutputConfiguration {
  DestinationAddress: string;
  DestinationPort: number;
}
export const RistRouterOutputConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DestinationAddress: S.String, DestinationPort: S.Number }).pipe(
    S.encodeKeys({
      DestinationAddress: "destinationAddress",
      DestinationPort: "destinationPort",
    }),
  ),
).annotate({
  identifier: "RistRouterOutputConfiguration",
}) as any as S.Schema<RistRouterOutputConfiguration>;
export interface SrtEncryptionConfiguration {
  EncryptionKey: SecretsManagerEncryptionKeyConfiguration;
}
export const SrtEncryptionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EncryptionKey: SecretsManagerEncryptionKeyConfiguration }).pipe(
    S.encodeKeys({ EncryptionKey: "encryptionKey" }),
  ),
).annotate({
  identifier: "SrtEncryptionConfiguration",
}) as any as S.Schema<SrtEncryptionConfiguration>;
export interface SrtListenerRouterOutputConfiguration {
  Port: number;
  MinimumLatencyMilliseconds: number;
  EncryptionConfiguration?: SrtEncryptionConfiguration;
}
export const SrtListenerRouterOutputConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Port: S.Number,
      MinimumLatencyMilliseconds: S.Number,
      EncryptionConfiguration: S.optional(SrtEncryptionConfiguration),
    }).pipe(
      S.encodeKeys({
        Port: "port",
        MinimumLatencyMilliseconds: "minimumLatencyMilliseconds",
        EncryptionConfiguration: "encryptionConfiguration",
      }),
    ),
).annotate({
  identifier: "SrtListenerRouterOutputConfiguration",
}) as any as S.Schema<SrtListenerRouterOutputConfiguration>;
export interface SrtCallerRouterOutputConfiguration {
  DestinationAddress: string;
  DestinationPort: number;
  MinimumLatencyMilliseconds: number;
  StreamId?: string;
  EncryptionConfiguration?: SrtEncryptionConfiguration;
}
export const SrtCallerRouterOutputConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DestinationAddress: S.String,
    DestinationPort: S.Number,
    MinimumLatencyMilliseconds: S.Number,
    StreamId: S.optional(S.String),
    EncryptionConfiguration: S.optional(SrtEncryptionConfiguration),
  }).pipe(
    S.encodeKeys({
      DestinationAddress: "destinationAddress",
      DestinationPort: "destinationPort",
      MinimumLatencyMilliseconds: "minimumLatencyMilliseconds",
      StreamId: "streamId",
      EncryptionConfiguration: "encryptionConfiguration",
    }),
  ),
).annotate({
  identifier: "SrtCallerRouterOutputConfiguration",
}) as any as S.Schema<SrtCallerRouterOutputConfiguration>;
export interface RtpRouterOutputConfiguration {
  DestinationAddress: string;
  DestinationPort: number;
  ForwardErrorCorrection?: ForwardErrorCorrectionState;
}
export const RtpRouterOutputConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DestinationAddress: S.String,
    DestinationPort: S.Number,
    ForwardErrorCorrection: S.optional(ForwardErrorCorrectionState),
  }).pipe(
    S.encodeKeys({
      DestinationAddress: "destinationAddress",
      DestinationPort: "destinationPort",
      ForwardErrorCorrection: "forwardErrorCorrection",
    }),
  ),
).annotate({
  identifier: "RtpRouterOutputConfiguration",
}) as any as S.Schema<RtpRouterOutputConfiguration>;
export type RouterOutputProtocolConfiguration =
  | {
      Rist: RistRouterOutputConfiguration;
      SrtListener?: never;
      SrtCaller?: never;
      Rtp?: never;
    }
  | {
      Rist?: never;
      SrtListener: SrtListenerRouterOutputConfiguration;
      SrtCaller?: never;
      Rtp?: never;
    }
  | {
      Rist?: never;
      SrtListener?: never;
      SrtCaller: SrtCallerRouterOutputConfiguration;
      Rtp?: never;
    }
  | {
      Rist?: never;
      SrtListener?: never;
      SrtCaller?: never;
      Rtp: RtpRouterOutputConfiguration;
    };
export const RouterOutputProtocolConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ Rist: RistRouterOutputConfiguration }),
  S.Struct({ SrtListener: SrtListenerRouterOutputConfiguration }),
  S.Struct({ SrtCaller: SrtCallerRouterOutputConfiguration }),
  S.Struct({ Rtp: RtpRouterOutputConfiguration }),
]);
export type RouterOutputProtocol =
  | "RTP"
  | "RIST"
  | "SRT_CALLER"
  | "SRT_LISTENER"
  | (string & {});
export const RouterOutputProtocol = /*@__PURE__*/ S.String;

export interface StandardRouterOutputConfiguration {
  NetworkInterfaceArn: string;
  ProtocolConfiguration: RouterOutputProtocolConfiguration;
  Protocol?: RouterOutputProtocol;
}
export const StandardRouterOutputConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NetworkInterfaceArn: S.String,
    ProtocolConfiguration: RouterOutputProtocolConfiguration,
    Protocol: S.optional(RouterOutputProtocol),
  }).pipe(
    S.encodeKeys({
      NetworkInterfaceArn: "networkInterfaceArn",
      ProtocolConfiguration: "protocolConfiguration",
      Protocol: "protocol",
    }),
  ),
).annotate({
  identifier: "StandardRouterOutputConfiguration",
}) as any as S.Schema<StandardRouterOutputConfiguration>;
export type FlowSourceArn = string;
export interface MediaConnectFlowRouterOutputConfiguration {
  FlowArn?: string;
  FlowSourceArn?: string;
  DestinationTransitEncryption: FlowTransitEncryption;
}
export const MediaConnectFlowRouterOutputConfiguration =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      FlowArn: S.optional(S.String),
      FlowSourceArn: S.optional(S.String),
      DestinationTransitEncryption: FlowTransitEncryption,
    }).pipe(
      S.encodeKeys({
        FlowArn: "flowArn",
        FlowSourceArn: "flowSourceArn",
        DestinationTransitEncryption: "destinationTransitEncryption",
      }),
    ),
  ).annotate({
    identifier: "MediaConnectFlowRouterOutputConfiguration",
  }) as any as S.Schema<MediaConnectFlowRouterOutputConfiguration>;
export type MediaLiveInputArn = string;
export type MediaLiveInputPipelineId =
  | "PIPELINE_0"
  | "PIPELINE_1"
  | (string & {});
export const MediaLiveInputPipelineId = /*@__PURE__*/ S.String;

export interface MediaLiveInputRouterOutputConfiguration {
  MediaLiveInputArn?: string;
  MediaLivePipelineId?: MediaLiveInputPipelineId;
  DestinationTransitEncryption: MediaLiveTransitEncryption;
}
export const MediaLiveInputRouterOutputConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      MediaLiveInputArn: S.optional(S.String),
      MediaLivePipelineId: S.optional(MediaLiveInputPipelineId),
      DestinationTransitEncryption: MediaLiveTransitEncryption,
    }).pipe(
      S.encodeKeys({
        MediaLiveInputArn: "mediaLiveInputArn",
        MediaLivePipelineId: "mediaLivePipelineId",
        DestinationTransitEncryption: "destinationTransitEncryption",
      }),
    ),
).annotate({
  identifier: "MediaLiveInputRouterOutputConfiguration",
}) as any as S.Schema<MediaLiveInputRouterOutputConfiguration>;
export type RouterOutputConfiguration =
  | {
      Standard: StandardRouterOutputConfiguration;
      MediaConnectFlow?: never;
      MediaLiveInput?: never;
    }
  | {
      Standard?: never;
      MediaConnectFlow: MediaConnectFlowRouterOutputConfiguration;
      MediaLiveInput?: never;
    }
  | {
      Standard?: never;
      MediaConnectFlow?: never;
      MediaLiveInput: MediaLiveInputRouterOutputConfiguration;
    };
export const RouterOutputConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ Standard: StandardRouterOutputConfiguration }),
  S.Struct({ MediaConnectFlow: MediaConnectFlowRouterOutputConfiguration }),
  S.Struct({ MediaLiveInput: MediaLiveInputRouterOutputConfiguration }),
]);
export type RouterOutputRoutedState =
  | "ROUTED"
  | "ROUTING"
  | "UNROUTED"
  | (string & {});
export const RouterOutputRoutedState = /*@__PURE__*/ S.String;

export type RouterOutputTier =
  | "OUTPUT_100"
  | "OUTPUT_50"
  | "OUTPUT_20"
  | (string & {});
export const RouterOutputTier = /*@__PURE__*/ S.String;

export interface RouterOutputMessage {
  Code: string;
  Message: string;
}
export const RouterOutputMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Code: S.String, Message: S.String }).pipe(
    S.encodeKeys({ Code: "code", Message: "message" }),
  ),
).annotate({
  identifier: "RouterOutputMessage",
}) as any as S.Schema<RouterOutputMessage>;
export type RouterOutputMessages = RouterOutputMessage[];
export const RouterOutputMessages = /*@__PURE__*/ S.Array(RouterOutputMessage);
export interface StandardRouterOutputStreamDetails {
  DestinationIpAddress?: string;
}
export const StandardRouterOutputStreamDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DestinationIpAddress: S.optional(S.String) }).pipe(
    S.encodeKeys({ DestinationIpAddress: "destinationIpAddress" }),
  ),
).annotate({
  identifier: "StandardRouterOutputStreamDetails",
}) as any as S.Schema<StandardRouterOutputStreamDetails>;
export interface MediaConnectFlowRouterOutputStreamDetails {}
export const MediaConnectFlowRouterOutputStreamDetails =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "MediaConnectFlowRouterOutputStreamDetails",
  }) as any as S.Schema<MediaConnectFlowRouterOutputStreamDetails>;
export interface MediaLiveInputRouterOutputStreamDetails {}
export const MediaLiveInputRouterOutputStreamDetails = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "MediaLiveInputRouterOutputStreamDetails",
}) as any as S.Schema<MediaLiveInputRouterOutputStreamDetails>;
export type RouterOutputStreamDetails =
  | {
      Standard: StandardRouterOutputStreamDetails;
      MediaConnectFlow?: never;
      MediaLiveInput?: never;
    }
  | {
      Standard?: never;
      MediaConnectFlow: MediaConnectFlowRouterOutputStreamDetails;
      MediaLiveInput?: never;
    }
  | {
      Standard?: never;
      MediaConnectFlow?: never;
      MediaLiveInput: MediaLiveInputRouterOutputStreamDetails;
    };
export const RouterOutputStreamDetails = /*@__PURE__*/ S.Union([
  S.Struct({ Standard: StandardRouterOutputStreamDetails }),
  S.Struct({ MediaConnectFlow: MediaConnectFlowRouterOutputStreamDetails }),
  S.Struct({ MediaLiveInput: MediaLiveInputRouterOutputStreamDetails }),
]);
export interface RouterOutput {
  Name: string;
  Arn: string;
  Id: string;
  State: RouterOutputState;
  OutputType: RouterOutputType;
  Configuration: RouterOutputConfiguration;
  RoutedState: RouterOutputRoutedState;
  RegionName: string;
  AvailabilityZone: string;
  MaximumBitrate: number;
  RoutingScope: RoutingScope;
  Tier: RouterOutputTier;
  CreatedAt: Date;
  UpdatedAt: Date;
  Messages: RouterOutputMessage[];
  Tags: { [key: string]: string | undefined };
  StreamDetails: RouterOutputStreamDetails;
  IpAddress?: string;
  RoutedInputArn?: string;
  MaintenanceType: MaintenanceType;
  MaintenanceConfiguration: MaintenanceConfiguration;
  MaintenanceScheduleType?: MaintenanceScheduleType;
  MaintenanceSchedule?: MaintenanceSchedule;
}
export const RouterOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Arn: S.String,
    Id: S.String,
    State: RouterOutputState,
    OutputType: RouterOutputType,
    Configuration: RouterOutputConfiguration,
    RoutedState: RouterOutputRoutedState,
    RegionName: S.String,
    AvailabilityZone: S.String,
    MaximumBitrate: S.Number,
    RoutingScope: RoutingScope,
    Tier: RouterOutputTier,
    CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    Messages: RouterOutputMessages,
    Tags: __mapOfString,
    StreamDetails: RouterOutputStreamDetails,
    IpAddress: S.optional(S.String),
    RoutedInputArn: S.optional(S.String),
    MaintenanceType: MaintenanceType,
    MaintenanceConfiguration: MaintenanceConfiguration,
    MaintenanceScheduleType: S.optional(MaintenanceScheduleType),
    MaintenanceSchedule: S.optional(MaintenanceSchedule),
  }).pipe(
    S.encodeKeys({
      Name: "name",
      Arn: "arn",
      Id: "id",
      State: "state",
      OutputType: "outputType",
      Configuration: "configuration",
      RoutedState: "routedState",
      RegionName: "regionName",
      AvailabilityZone: "availabilityZone",
      MaximumBitrate: "maximumBitrate",
      RoutingScope: "routingScope",
      Tier: "tier",
      CreatedAt: "createdAt",
      UpdatedAt: "updatedAt",
      Messages: "messages",
      Tags: "tags",
      StreamDetails: "streamDetails",
      IpAddress: "ipAddress",
      RoutedInputArn: "routedInputArn",
      MaintenanceType: "maintenanceType",
      MaintenanceConfiguration: "maintenanceConfiguration",
      MaintenanceScheduleType: "maintenanceScheduleType",
      MaintenanceSchedule: "maintenanceSchedule",
    }),
  ),
).annotate({ identifier: "RouterOutput" }) as any as S.Schema<RouterOutput>;
export type RouterOutputList = RouterOutput[];
export const RouterOutputList = /*@__PURE__*/ S.Array(RouterOutput);
export interface BatchGetRouterOutputError_ {
  Arn: string;
  Code: string;
  Message: string;
}
export const BatchGetRouterOutputError_ = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String, Code: S.String, Message: S.String }).pipe(
    S.encodeKeys({ Arn: "arn", Code: "code", Message: "message" }),
  ),
).annotate({
  identifier: "BatchGetRouterOutputError",
}) as any as S.Schema<BatchGetRouterOutputError_>;
export type BatchGetRouterOutputErrorList = BatchGetRouterOutputError_[];
export const BatchGetRouterOutputErrorList = /*@__PURE__*/ S.Array(
  BatchGetRouterOutputError_,
);
export interface BatchGetRouterOutputResponse {
  RouterOutputs: RouterOutput[];
  Errors: BatchGetRouterOutputError_[];
}
export const BatchGetRouterOutputResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RouterOutputs: RouterOutputList,
    Errors: BatchGetRouterOutputErrorList,
  }).pipe(S.encodeKeys({ RouterOutputs: "routerOutputs", Errors: "errors" })),
).annotate({
  identifier: "BatchGetRouterOutputResponse",
}) as any as S.Schema<BatchGetRouterOutputResponse>;
export interface AddEgressGatewayBridgeRequest {
  MaxBitrate?: number;
}
export const AddEgressGatewayBridgeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MaxBitrate: S.optional(S.Number) }).pipe(
    S.encodeKeys({ MaxBitrate: "maxBitrate" }),
  ),
).annotate({
  identifier: "AddEgressGatewayBridgeRequest",
}) as any as S.Schema<AddEgressGatewayBridgeRequest>;
export interface AddIngressGatewayBridgeRequest {
  MaxBitrate?: number;
  MaxOutputs?: number;
}
export const AddIngressGatewayBridgeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxBitrate: S.optional(S.Number),
    MaxOutputs: S.optional(S.Number),
  }).pipe(S.encodeKeys({ MaxBitrate: "maxBitrate", MaxOutputs: "maxOutputs" })),
).annotate({
  identifier: "AddIngressGatewayBridgeRequest",
}) as any as S.Schema<AddIngressGatewayBridgeRequest>;
export type FailoverMode = "MERGE" | "FAILOVER" | (string & {});
export const FailoverMode = /*@__PURE__*/ S.String;

export interface SourcePriority {
  PrimarySource?: string;
}
export const SourcePriority = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PrimarySource: S.optional(S.String) }).pipe(
    S.encodeKeys({ PrimarySource: "primarySource" }),
  ),
).annotate({ identifier: "SourcePriority" }) as any as S.Schema<SourcePriority>;
export interface FailoverConfig {
  FailoverMode?: FailoverMode;
  RecoveryWindow?: number;
  SourcePriority?: SourcePriority;
  State?: State;
}
export const FailoverConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FailoverMode: S.optional(FailoverMode),
    RecoveryWindow: S.optional(S.Number),
    SourcePriority: S.optional(SourcePriority),
    State: S.optional(State),
  }).pipe(
    S.encodeKeys({
      FailoverMode: "failoverMode",
      RecoveryWindow: "recoveryWindow",
      SourcePriority: "sourcePriority",
      State: "state",
    }),
  ),
).annotate({ identifier: "FailoverConfig" }) as any as S.Schema<FailoverConfig>;
export interface CreateBridgeRequest {
  EgressGatewayBridge?: AddEgressGatewayBridgeRequest;
  IngressGatewayBridge?: AddIngressGatewayBridgeRequest;
  Name?: string;
  Outputs?: AddBridgeOutputRequest[];
  PlacementArn?: string;
  SourceFailoverConfig?: FailoverConfig;
  Sources?: AddBridgeSourceRequest[];
}
export const CreateBridgeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EgressGatewayBridge: S.optional(AddEgressGatewayBridgeRequest),
    IngressGatewayBridge: S.optional(AddIngressGatewayBridgeRequest),
    Name: S.optional(S.String),
    Outputs: S.optional(__listOfAddBridgeOutputRequest),
    PlacementArn: S.optional(S.String),
    SourceFailoverConfig: S.optional(FailoverConfig),
    Sources: S.optional(__listOfAddBridgeSourceRequest),
  })
    .pipe(
      S.encodeKeys({
        EgressGatewayBridge: "egressGatewayBridge",
        IngressGatewayBridge: "ingressGatewayBridge",
        Name: "name",
        Outputs: "outputs",
        PlacementArn: "placementArn",
        SourceFailoverConfig: "sourceFailoverConfig",
        Sources: "sources",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/v1/bridges" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateBridgeRequest",
}) as any as S.Schema<CreateBridgeRequest>;
export interface MessageDetail {
  Code?: string;
  Message?: string;
  ResourceName?: string;
}
export const MessageDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Code: S.optional(S.String),
    Message: S.optional(S.String),
    ResourceName: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      Code: "code",
      Message: "message",
      ResourceName: "resourceName",
    }),
  ),
).annotate({ identifier: "MessageDetail" }) as any as S.Schema<MessageDetail>;
export type __listOfMessageDetail = MessageDetail[];
export const __listOfMessageDetail = /*@__PURE__*/ S.Array(MessageDetail);
export type BridgeState =
  | "CREATING"
  | "STANDBY"
  | "STARTING"
  | "DEPLOYING"
  | "ACTIVE"
  | "STOPPING"
  | "DELETING"
  | "DELETED"
  | "START_FAILED"
  | "START_PENDING"
  | "STOP_FAILED"
  | "UPDATING"
  | (string & {});
export const BridgeState = /*@__PURE__*/ S.String;

export interface EgressGatewayBridge {
  InstanceId?: string;
  MaxBitrate?: number;
}
export const EgressGatewayBridge = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstanceId: S.optional(S.String),
    MaxBitrate: S.optional(S.Number),
  }).pipe(S.encodeKeys({ InstanceId: "instanceId", MaxBitrate: "maxBitrate" })),
).annotate({
  identifier: "EgressGatewayBridge",
}) as any as S.Schema<EgressGatewayBridge>;
export interface IngressGatewayBridge {
  InstanceId?: string;
  MaxBitrate?: number;
  MaxOutputs?: number;
}
export const IngressGatewayBridge = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstanceId: S.optional(S.String),
    MaxBitrate: S.optional(S.Number),
    MaxOutputs: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      InstanceId: "instanceId",
      MaxBitrate: "maxBitrate",
      MaxOutputs: "maxOutputs",
    }),
  ),
).annotate({
  identifier: "IngressGatewayBridge",
}) as any as S.Schema<IngressGatewayBridge>;
export interface Bridge {
  BridgeArn?: string;
  BridgeMessages?: MessageDetail[];
  BridgeState?: BridgeState;
  EgressGatewayBridge?: EgressGatewayBridge;
  IngressGatewayBridge?: IngressGatewayBridge;
  Name?: string;
  Outputs?: BridgeOutput[];
  PlacementArn?: string;
  SourceFailoverConfig?: FailoverConfig;
  Sources?: BridgeSource[];
}
export const Bridge = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BridgeArn: S.optional(S.String),
    BridgeMessages: S.optional(__listOfMessageDetail),
    BridgeState: S.optional(BridgeState),
    EgressGatewayBridge: S.optional(EgressGatewayBridge),
    IngressGatewayBridge: S.optional(IngressGatewayBridge),
    Name: S.optional(S.String),
    Outputs: S.optional(__listOfBridgeOutput),
    PlacementArn: S.optional(S.String),
    SourceFailoverConfig: S.optional(FailoverConfig),
    Sources: S.optional(__listOfBridgeSource),
  }).pipe(
    S.encodeKeys({
      BridgeArn: "bridgeArn",
      BridgeMessages: "bridgeMessages",
      BridgeState: "bridgeState",
      EgressGatewayBridge: "egressGatewayBridge",
      IngressGatewayBridge: "ingressGatewayBridge",
      Name: "name",
      Outputs: "outputs",
      PlacementArn: "placementArn",
      SourceFailoverConfig: "sourceFailoverConfig",
      Sources: "sources",
    }),
  ),
).annotate({ identifier: "Bridge" }) as any as S.Schema<Bridge>;
export interface CreateBridgeResponse {
  Bridge?: Bridge & {
    BridgeArn: string;
    BridgeState: BridgeState;
    Name: string;
    PlacementArn: string;
    BridgeMessages: (MessageDetail & { Code: string; Message: string })[];
    EgressGatewayBridge: EgressGatewayBridge & { MaxBitrate: number };
    IngressGatewayBridge: IngressGatewayBridge & {
      MaxBitrate: number;
      MaxOutputs: number;
    };
    Outputs: (BridgeOutput & {
      FlowOutput: BridgeFlowOutput & {
        FlowArn: string;
        FlowSourceArn: string;
        Name: string;
      };
      NetworkOutput: BridgeNetworkOutput & {
        IpAddress: string;
        Name: string;
        NetworkName: string;
        Port: number;
        Protocol: Protocol;
        Ttl: number;
      };
    })[];
    Sources: (BridgeSource & {
      FlowSource: BridgeFlowSource & { FlowArn: string; Name: string };
      NetworkSource: BridgeNetworkSource & {
        MulticastIp: string;
        Name: string;
        NetworkName: string;
        Port: number;
        Protocol: Protocol;
      };
    })[];
  };
}
export const CreateBridgeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Bridge: S.optional(Bridge) }).pipe(
    S.encodeKeys({ Bridge: "bridge" }),
  ),
).annotate({
  identifier: "CreateBridgeResponse",
}) as any as S.Schema<CreateBridgeResponse>;
export type EntitlementStatus = "ENABLED" | "DISABLED" | (string & {});
export const EntitlementStatus = /*@__PURE__*/ S.String;

export interface GrantEntitlementRequest {
  DataTransferSubscriberFeePercent?: number;
  Description?: string;
  Encryption?: Encryption;
  EntitlementStatus?: EntitlementStatus;
  Name?: string;
  Subscribers?: string[];
  EntitlementTags?: { [key: string]: string | undefined };
}
export const GrantEntitlementRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataTransferSubscriberFeePercent: S.optional(S.Number),
    Description: S.optional(S.String),
    Encryption: S.optional(Encryption),
    EntitlementStatus: S.optional(EntitlementStatus),
    Name: S.optional(S.String),
    Subscribers: S.optional(__listOfString),
    EntitlementTags: S.optional(__mapOfString),
  }).pipe(
    S.encodeKeys({
      DataTransferSubscriberFeePercent: "dataTransferSubscriberFeePercent",
      Description: "description",
      Encryption: "encryption",
      EntitlementStatus: "entitlementStatus",
      Name: "name",
      Subscribers: "subscribers",
      EntitlementTags: "entitlementTags",
    }),
  ),
).annotate({
  identifier: "GrantEntitlementRequest",
}) as any as S.Schema<GrantEntitlementRequest>;
export type __listOfGrantEntitlementRequest = GrantEntitlementRequest[];
export const __listOfGrantEntitlementRequest = /*@__PURE__*/ S.Array(
  GrantEntitlementRequest,
);
export type MaintenanceDay =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday"
  | (string & {});
export const MaintenanceDay = /*@__PURE__*/ S.String;

export interface AddMaintenance {
  MaintenanceDay?: MaintenanceDay;
  MaintenanceStartHour?: string;
}
export const AddMaintenance = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaintenanceDay: S.optional(MaintenanceDay),
    MaintenanceStartHour: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      MaintenanceDay: "maintenanceDay",
      MaintenanceStartHour: "maintenanceStartHour",
    }),
  ),
).annotate({ identifier: "AddMaintenance" }) as any as S.Schema<AddMaintenance>;
export type ThumbnailState = "ENABLED" | "DISABLED" | (string & {});
export const ThumbnailState = /*@__PURE__*/ S.String;

export interface SilentAudio {
  State?: State;
  ThresholdSeconds?: number;
}
export const SilentAudio = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    State: S.optional(State),
    ThresholdSeconds: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({ State: "state", ThresholdSeconds: "thresholdSeconds" }),
  ),
).annotate({ identifier: "SilentAudio" }) as any as S.Schema<SilentAudio>;
export interface AudioMonitoringSetting {
  SilentAudio?: SilentAudio;
}
export const AudioMonitoringSetting = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SilentAudio: S.optional(SilentAudio) }).pipe(
    S.encodeKeys({ SilentAudio: "silentAudio" }),
  ),
).annotate({
  identifier: "AudioMonitoringSetting",
}) as any as S.Schema<AudioMonitoringSetting>;
export type __listOfAudioMonitoringSetting = AudioMonitoringSetting[];
export const __listOfAudioMonitoringSetting = /*@__PURE__*/ S.Array(
  AudioMonitoringSetting,
);
export interface BlackFrames {
  State?: State;
  ThresholdSeconds?: number;
}
export const BlackFrames = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    State: S.optional(State),
    ThresholdSeconds: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({ State: "state", ThresholdSeconds: "thresholdSeconds" }),
  ),
).annotate({ identifier: "BlackFrames" }) as any as S.Schema<BlackFrames>;
export interface FrozenFrames {
  State?: State;
  ThresholdSeconds?: number;
}
export const FrozenFrames = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    State: S.optional(State),
    ThresholdSeconds: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({ State: "state", ThresholdSeconds: "thresholdSeconds" }),
  ),
).annotate({ identifier: "FrozenFrames" }) as any as S.Schema<FrozenFrames>;
export interface VideoMonitoringSetting {
  BlackFrames?: BlackFrames;
  FrozenFrames?: FrozenFrames;
}
export const VideoMonitoringSetting = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BlackFrames: S.optional(BlackFrames),
    FrozenFrames: S.optional(FrozenFrames),
  }).pipe(
    S.encodeKeys({ BlackFrames: "blackFrames", FrozenFrames: "frozenFrames" }),
  ),
).annotate({
  identifier: "VideoMonitoringSetting",
}) as any as S.Schema<VideoMonitoringSetting>;
export type __listOfVideoMonitoringSetting = VideoMonitoringSetting[];
export const __listOfVideoMonitoringSetting = /*@__PURE__*/ S.Array(
  VideoMonitoringSetting,
);
export interface MonitoringConfig {
  ThumbnailState?: ThumbnailState;
  AudioMonitoringSettings?: AudioMonitoringSetting[];
  ContentQualityAnalysisState?: ContentQualityAnalysisState;
  VideoMonitoringSettings?: VideoMonitoringSetting[];
}
export const MonitoringConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ThumbnailState: S.optional(ThumbnailState),
    AudioMonitoringSettings: S.optional(__listOfAudioMonitoringSetting),
    ContentQualityAnalysisState: S.optional(ContentQualityAnalysisState),
    VideoMonitoringSettings: S.optional(__listOfVideoMonitoringSetting),
  }).pipe(
    S.encodeKeys({
      ThumbnailState: "thumbnailState",
      AudioMonitoringSettings: "audioMonitoringSettings",
      ContentQualityAnalysisState: "contentQualityAnalysisState",
      VideoMonitoringSettings: "videoMonitoringSettings",
    }),
  ),
).annotate({
  identifier: "MonitoringConfig",
}) as any as S.Schema<MonitoringConfig>;
export type FlowSize = "MEDIUM" | "LARGE" | "LARGE_4X" | (string & {});
export const FlowSize = /*@__PURE__*/ S.String;

export type NdiState = "ENABLED" | "DISABLED" | (string & {});
export const NdiState = /*@__PURE__*/ S.String;

export interface NdiDiscoveryServerConfig {
  DiscoveryServerAddress?: string;
  DiscoveryServerPort?: number;
  VpcInterfaceAdapter?: string;
}
export const NdiDiscoveryServerConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DiscoveryServerAddress: S.optional(S.String),
    DiscoveryServerPort: S.optional(S.Number),
    VpcInterfaceAdapter: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      DiscoveryServerAddress: "discoveryServerAddress",
      DiscoveryServerPort: "discoveryServerPort",
      VpcInterfaceAdapter: "vpcInterfaceAdapter",
    }),
  ),
).annotate({
  identifier: "NdiDiscoveryServerConfig",
}) as any as S.Schema<NdiDiscoveryServerConfig>;
export type __listOfNdiDiscoveryServerConfig = NdiDiscoveryServerConfig[];
export const __listOfNdiDiscoveryServerConfig = /*@__PURE__*/ S.Array(
  NdiDiscoveryServerConfig,
);
export interface NdiConfig {
  NdiState?: NdiState;
  MachineName?: string;
  NdiDiscoveryServers?: NdiDiscoveryServerConfig[];
}
export const NdiConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NdiState: S.optional(NdiState),
    MachineName: S.optional(S.String),
    NdiDiscoveryServers: S.optional(__listOfNdiDiscoveryServerConfig),
  }).pipe(
    S.encodeKeys({
      NdiState: "ndiState",
      MachineName: "machineName",
      NdiDiscoveryServers: "ndiDiscoveryServers",
    }),
  ),
).annotate({ identifier: "NdiConfig" }) as any as S.Schema<NdiConfig>;
export type EncodingProfile =
  | "DISTRIBUTION_H264_DEFAULT"
  | "CONTRIBUTION_H264_DEFAULT"
  | (string & {});
export const EncodingProfile = /*@__PURE__*/ S.String;

export interface EncodingConfig {
  EncodingProfile?: EncodingProfile;
  VideoMaxBitrate?: number;
}
export const EncodingConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EncodingProfile: S.optional(EncodingProfile),
    VideoMaxBitrate: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      EncodingProfile: "encodingProfile",
      VideoMaxBitrate: "videoMaxBitrate",
    }),
  ),
).annotate({ identifier: "EncodingConfig" }) as any as S.Schema<EncodingConfig>;
export interface CreateFlowRequest {
  AvailabilityZone?: string;
  Entitlements?: GrantEntitlementRequest[];
  MediaStreams?: AddMediaStreamRequest[];
  Name?: string;
  Outputs?: AddOutputRequest[];
  Source?: SetSourceRequest;
  SourceFailoverConfig?: FailoverConfig;
  Sources?: SetSourceRequest[];
  VpcInterfaces?: VpcInterfaceRequest[];
  Maintenance?: AddMaintenance;
  SourceMonitoringConfig?: MonitoringConfig;
  FlowSize?: FlowSize;
  NdiConfig?: NdiConfig;
  EncodingConfig?: EncodingConfig;
  FlowTags?: { [key: string]: string | undefined };
}
export const CreateFlowRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AvailabilityZone: S.optional(S.String),
    Entitlements: S.optional(__listOfGrantEntitlementRequest),
    MediaStreams: S.optional(__listOfAddMediaStreamRequest),
    Name: S.optional(S.String),
    Outputs: S.optional(__listOfAddOutputRequest),
    Source: S.optional(SetSourceRequest),
    SourceFailoverConfig: S.optional(FailoverConfig),
    Sources: S.optional(__listOfSetSourceRequest),
    VpcInterfaces: S.optional(__listOfVpcInterfaceRequest),
    Maintenance: S.optional(AddMaintenance),
    SourceMonitoringConfig: S.optional(MonitoringConfig),
    FlowSize: S.optional(FlowSize),
    NdiConfig: S.optional(NdiConfig),
    EncodingConfig: S.optional(EncodingConfig),
    FlowTags: S.optional(__mapOfString),
  })
    .pipe(
      S.encodeKeys({
        AvailabilityZone: "availabilityZone",
        Entitlements: "entitlements",
        MediaStreams: "mediaStreams",
        Name: "name",
        Outputs: "outputs",
        Source: "source",
        SourceFailoverConfig: "sourceFailoverConfig",
        Sources: "sources",
        VpcInterfaces: "vpcInterfaces",
        Maintenance: "maintenance",
        SourceMonitoringConfig: "sourceMonitoringConfig",
        FlowSize: "flowSize",
        NdiConfig: "ndiConfig",
        EncodingConfig: "encodingConfig",
        FlowTags: "flowTags",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/v1/flows" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateFlowRequest",
}) as any as S.Schema<CreateFlowRequest>;
export interface Entitlement {
  DataTransferSubscriberFeePercent?: number;
  Description?: string;
  Encryption?: Encryption;
  EntitlementArn?: string;
  EntitlementStatus?: EntitlementStatus;
  Name?: string;
  Subscribers?: string[];
}
export const Entitlement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataTransferSubscriberFeePercent: S.optional(S.Number),
    Description: S.optional(S.String),
    Encryption: S.optional(Encryption),
    EntitlementArn: S.optional(S.String),
    EntitlementStatus: S.optional(EntitlementStatus),
    Name: S.optional(S.String),
    Subscribers: S.optional(__listOfString),
  }).pipe(
    S.encodeKeys({
      DataTransferSubscriberFeePercent: "dataTransferSubscriberFeePercent",
      Description: "description",
      Encryption: "encryption",
      EntitlementArn: "entitlementArn",
      EntitlementStatus: "entitlementStatus",
      Name: "name",
      Subscribers: "subscribers",
    }),
  ),
).annotate({ identifier: "Entitlement" }) as any as S.Schema<Entitlement>;
export type __listOfEntitlement = Entitlement[];
export const __listOfEntitlement = /*@__PURE__*/ S.Array(Entitlement);
export type Status =
  | "STANDBY"
  | "ACTIVE"
  | "UPDATING"
  | "DELETING"
  | "STARTING"
  | "STOPPING"
  | "ERROR"
  | (string & {});
export const Status = /*@__PURE__*/ S.String;

export interface Maintenance {
  MaintenanceDay?: MaintenanceDay;
  MaintenanceDeadline?: string;
  MaintenanceScheduledDate?: string;
  MaintenanceStartHour?: string;
}
export const Maintenance = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaintenanceDay: S.optional(MaintenanceDay),
    MaintenanceDeadline: S.optional(S.String),
    MaintenanceScheduledDate: S.optional(S.String),
    MaintenanceStartHour: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      MaintenanceDay: "maintenanceDay",
      MaintenanceDeadline: "maintenanceDeadline",
      MaintenanceScheduledDate: "maintenanceScheduledDate",
      MaintenanceStartHour: "maintenanceStartHour",
    }),
  ),
).annotate({ identifier: "Maintenance" }) as any as S.Schema<Maintenance>;
export interface Flow {
  AvailabilityZone?: string;
  Description?: string;
  EgressIp?: string;
  Entitlements?: Entitlement[];
  FlowArn?: string;
  MediaStreams?: MediaStream[];
  Name?: string;
  Outputs?: Output[];
  Source?: Source;
  SourceFailoverConfig?: FailoverConfig;
  Sources?: Source[];
  Status?: Status;
  VpcInterfaces?: VpcInterface[];
  Maintenance?: Maintenance;
  SourceMonitoringConfig?: MonitoringConfig;
  FlowSize?: FlowSize;
  NdiConfig?: NdiConfig;
  EncodingConfig?: EncodingConfig;
}
export const Flow = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AvailabilityZone: S.optional(S.String),
    Description: S.optional(S.String),
    EgressIp: S.optional(S.String),
    Entitlements: S.optional(__listOfEntitlement),
    FlowArn: S.optional(S.String),
    MediaStreams: S.optional(__listOfMediaStream),
    Name: S.optional(S.String),
    Outputs: S.optional(__listOfOutput),
    Source: S.optional(Source),
    SourceFailoverConfig: S.optional(FailoverConfig),
    Sources: S.optional(__listOfSource),
    Status: S.optional(Status),
    VpcInterfaces: S.optional(__listOfVpcInterface),
    Maintenance: S.optional(Maintenance),
    SourceMonitoringConfig: S.optional(MonitoringConfig),
    FlowSize: S.optional(FlowSize),
    NdiConfig: S.optional(NdiConfig),
    EncodingConfig: S.optional(EncodingConfig),
  }).pipe(
    S.encodeKeys({
      AvailabilityZone: "availabilityZone",
      Description: "description",
      EgressIp: "egressIp",
      Entitlements: "entitlements",
      FlowArn: "flowArn",
      MediaStreams: "mediaStreams",
      Name: "name",
      Outputs: "outputs",
      Source: "source",
      SourceFailoverConfig: "sourceFailoverConfig",
      Sources: "sources",
      Status: "status",
      VpcInterfaces: "vpcInterfaces",
      Maintenance: "maintenance",
      SourceMonitoringConfig: "sourceMonitoringConfig",
      FlowSize: "flowSize",
      NdiConfig: "ndiConfig",
      EncodingConfig: "encodingConfig",
    }),
  ),
).annotate({ identifier: "Flow" }) as any as S.Schema<Flow>;
export interface CreateFlowResponse {
  Flow?: Flow & {
    AvailabilityZone: string;
    Entitlements: (Entitlement & {
      EntitlementArn: string;
      Name: string;
      Subscribers: __listOfString;
      Encryption: Encryption & { RoleArn: string };
    })[];
    FlowArn: string;
    Name: string;
    Outputs: (Output & {
      Name: string;
      OutputArn: string;
      Encryption: Encryption & { RoleArn: string };
      MediaStreamOutputConfigurations: (MediaStreamOutputConfiguration & {
        EncodingName: EncodingName;
        MediaStreamName: string;
        DestinationConfigurations: (DestinationConfiguration & {
          DestinationIp: string;
          DestinationPort: number;
          Interface: Interface & { Name: string };
          OutboundIp: string;
        })[];
        EncodingParameters: EncodingParameters & {
          CompressionFactor: number;
          EncoderProfile: EncoderProfile;
        };
      })[];
      Transport: Transport & { Protocol: Protocol };
    })[];
    Source: Source & {
      Name: string;
      SourceArn: string;
      Decryption: Encryption & { RoleArn: string };
      MediaStreamSourceConfigurations: (MediaStreamSourceConfiguration & {
        EncodingName: EncodingName;
        MediaStreamName: string;
        InputConfigurations: (InputConfiguration & {
          InputIp: string;
          InputPort: number;
          Interface: Interface & { Name: string };
        })[];
      })[];
      Transport: Transport & { Protocol: Protocol };
      GatewayBridgeSource: GatewayBridgeSource & { BridgeArn: string };
    };
    Status: Status;
    MediaStreams: (MediaStream & {
      Fmt: number;
      MediaStreamId: number;
      MediaStreamName: string;
      MediaStreamType: MediaStreamType;
      Attributes: MediaStreamAttributes & { Fmtp: Fmtp };
    })[];
    Sources: (Source & {
      Name: string;
      SourceArn: string;
      Decryption: Encryption & { RoleArn: string };
      MediaStreamSourceConfigurations: (MediaStreamSourceConfiguration & {
        EncodingName: EncodingName;
        MediaStreamName: string;
        InputConfigurations: (InputConfiguration & {
          InputIp: string;
          InputPort: number;
          Interface: Interface & { Name: string };
        })[];
      })[];
      Transport: Transport & { Protocol: Protocol };
      GatewayBridgeSource: GatewayBridgeSource & { BridgeArn: string };
    })[];
    VpcInterfaces: (VpcInterface & {
      Name: string;
      NetworkInterfaceIds: __listOfString;
      NetworkInterfaceType: NetworkInterfaceType;
      RoleArn: string;
      SecurityGroupIds: __listOfString;
      SubnetId: string;
    })[];
    NdiConfig: NdiConfig & {
      NdiDiscoveryServers: (NdiDiscoveryServerConfig & {
        DiscoveryServerAddress: string;
        VpcInterfaceAdapter: string;
      })[];
    };
  };
}
export const CreateFlowResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Flow: S.optional(Flow) }).pipe(S.encodeKeys({ Flow: "flow" })),
).annotate({
  identifier: "CreateFlowResponse",
}) as any as S.Schema<CreateFlowResponse>;
export interface GatewayNetwork {
  CidrBlock?: string;
  Name?: string;
}
export const GatewayNetwork = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CidrBlock: S.optional(S.String),
    Name: S.optional(S.String),
  }).pipe(S.encodeKeys({ CidrBlock: "cidrBlock", Name: "name" })),
).annotate({ identifier: "GatewayNetwork" }) as any as S.Schema<GatewayNetwork>;
export type __listOfGatewayNetwork = GatewayNetwork[];
export const __listOfGatewayNetwork = /*@__PURE__*/ S.Array(GatewayNetwork);
export interface CreateGatewayRequest {
  EgressCidrBlocks?: string[];
  Name?: string;
  Networks?: GatewayNetwork[];
}
export const CreateGatewayRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EgressCidrBlocks: S.optional(__listOfString),
    Name: S.optional(S.String),
    Networks: S.optional(__listOfGatewayNetwork),
  })
    .pipe(
      S.encodeKeys({
        EgressCidrBlocks: "egressCidrBlocks",
        Name: "name",
        Networks: "networks",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/v1/gateways" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateGatewayRequest",
}) as any as S.Schema<CreateGatewayRequest>;
export type GatewayState =
  | "CREATING"
  | "ACTIVE"
  | "UPDATING"
  | "ERROR"
  | "DELETING"
  | "DELETED"
  | (string & {});
export const GatewayState = /*@__PURE__*/ S.String;

export interface Gateway {
  EgressCidrBlocks?: string[];
  GatewayArn?: string;
  GatewayMessages?: MessageDetail[];
  GatewayState?: GatewayState;
  Name?: string;
  Networks?: GatewayNetwork[];
}
export const Gateway = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EgressCidrBlocks: S.optional(__listOfString),
    GatewayArn: S.optional(S.String),
    GatewayMessages: S.optional(__listOfMessageDetail),
    GatewayState: S.optional(GatewayState),
    Name: S.optional(S.String),
    Networks: S.optional(__listOfGatewayNetwork),
  }).pipe(
    S.encodeKeys({
      EgressCidrBlocks: "egressCidrBlocks",
      GatewayArn: "gatewayArn",
      GatewayMessages: "gatewayMessages",
      GatewayState: "gatewayState",
      Name: "name",
      Networks: "networks",
    }),
  ),
).annotate({ identifier: "Gateway" }) as any as S.Schema<Gateway>;
export interface CreateGatewayResponse {
  Gateway?: Gateway & {
    EgressCidrBlocks: __listOfString;
    GatewayArn: string;
    Name: string;
    Networks: (GatewayNetwork & { CidrBlock: string; Name: string })[];
    GatewayMessages: (MessageDetail & { Code: string; Message: string })[];
  };
}
export const CreateGatewayResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Gateway: S.optional(Gateway) }).pipe(
    S.encodeKeys({ Gateway: "gateway" }),
  ),
).annotate({
  identifier: "CreateGatewayResponse",
}) as any as S.Schema<CreateGatewayResponse>;
export type ClientToken = string;
export interface CreateRouterInputRequest {
  Name: string;
  Configuration: RouterInputConfiguration;
  MaximumBitrate: number;
  RoutingScope: RoutingScope;
  Tier: RouterInputTier;
  RegionName?: string;
  AvailabilityZone?: string;
  TransitEncryption?: RouterInputTransitEncryption;
  MaintenanceConfiguration?: MaintenanceConfiguration;
  Tags?: { [key: string]: string | undefined };
  ClientToken?: string;
  ContentQualityAnalysisConfiguration?: RouterContentQualityAnalysisConfiguration;
}
export const CreateRouterInputRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Configuration: RouterInputConfiguration,
    MaximumBitrate: S.Number,
    RoutingScope: RoutingScope,
    Tier: RouterInputTier,
    RegionName: S.optional(S.String),
    AvailabilityZone: S.optional(S.String),
    TransitEncryption: S.optional(RouterInputTransitEncryption),
    MaintenanceConfiguration: S.optional(MaintenanceConfiguration),
    Tags: S.optional(__mapOfString),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    ContentQualityAnalysisConfiguration: S.optional(
      RouterContentQualityAnalysisConfiguration,
    ),
  })
    .pipe(
      S.encodeKeys({
        Name: "name",
        Configuration: "configuration",
        MaximumBitrate: "maximumBitrate",
        RoutingScope: "routingScope",
        Tier: "tier",
        RegionName: "regionName",
        AvailabilityZone: "availabilityZone",
        TransitEncryption: "transitEncryption",
        MaintenanceConfiguration: "maintenanceConfiguration",
        Tags: "tags",
        ClientToken: "clientToken",
        ContentQualityAnalysisConfiguration:
          "contentQualityAnalysisConfiguration",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/v1/routerInput" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateRouterInputRequest",
}) as any as S.Schema<CreateRouterInputRequest>;
export interface CreateRouterInputResponse {
  RouterInput: RouterInput & {
    ContentQualityAnalysisType: RouterContentQualityAnalysisType;
    ContentQualityAnalysisConfiguration: RouterContentQualityAnalysisConfiguration;
  };
}
export const CreateRouterInputResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RouterInput: RouterInput }).pipe(
    S.encodeKeys({ RouterInput: "routerInput" }),
  ),
).annotate({
  identifier: "CreateRouterInputResponse",
}) as any as S.Schema<CreateRouterInputResponse>;
export interface CreateRouterNetworkInterfaceRequest {
  Name: string;
  Configuration: RouterNetworkInterfaceConfiguration;
  RegionName?: string;
  Tags?: { [key: string]: string | undefined };
  ClientToken?: string;
}
export const CreateRouterNetworkInterfaceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Configuration: RouterNetworkInterfaceConfiguration,
    RegionName: S.optional(S.String),
    Tags: S.optional(__mapOfString),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  })
    .pipe(
      S.encodeKeys({
        Name: "name",
        Configuration: "configuration",
        RegionName: "regionName",
        Tags: "tags",
        ClientToken: "clientToken",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/v1/routerNetworkInterface" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateRouterNetworkInterfaceRequest",
}) as any as S.Schema<CreateRouterNetworkInterfaceRequest>;
export interface CreateRouterNetworkInterfaceResponse {
  RouterNetworkInterface: RouterNetworkInterface;
}
export const CreateRouterNetworkInterfaceResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ RouterNetworkInterface: RouterNetworkInterface }).pipe(
      S.encodeKeys({ RouterNetworkInterface: "routerNetworkInterface" }),
    ),
).annotate({
  identifier: "CreateRouterNetworkInterfaceResponse",
}) as any as S.Schema<CreateRouterNetworkInterfaceResponse>;
export interface CreateRouterOutputRequest {
  Name: string;
  Configuration: RouterOutputConfiguration;
  MaximumBitrate: number;
  RoutingScope: RoutingScope;
  Tier: RouterOutputTier;
  RegionName?: string;
  AvailabilityZone?: string;
  MaintenanceConfiguration?: MaintenanceConfiguration;
  Tags?: { [key: string]: string | undefined };
  ClientToken?: string;
}
export const CreateRouterOutputRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Configuration: RouterOutputConfiguration,
    MaximumBitrate: S.Number,
    RoutingScope: RoutingScope,
    Tier: RouterOutputTier,
    RegionName: S.optional(S.String),
    AvailabilityZone: S.optional(S.String),
    MaintenanceConfiguration: S.optional(MaintenanceConfiguration),
    Tags: S.optional(__mapOfString),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  })
    .pipe(
      S.encodeKeys({
        Name: "name",
        Configuration: "configuration",
        MaximumBitrate: "maximumBitrate",
        RoutingScope: "routingScope",
        Tier: "tier",
        RegionName: "regionName",
        AvailabilityZone: "availabilityZone",
        MaintenanceConfiguration: "maintenanceConfiguration",
        Tags: "tags",
        ClientToken: "clientToken",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/v1/routerOutput" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateRouterOutputRequest",
}) as any as S.Schema<CreateRouterOutputRequest>;
export interface CreateRouterOutputResponse {
  RouterOutput: RouterOutput;
}
export const CreateRouterOutputResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RouterOutput: RouterOutput }).pipe(
    S.encodeKeys({ RouterOutput: "routerOutput" }),
  ),
).annotate({
  identifier: "CreateRouterOutputResponse",
}) as any as S.Schema<CreateRouterOutputResponse>;
export interface DeleteBridgeRequest {
  BridgeArn: string;
}
export const DeleteBridgeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BridgeArn: S.String.pipe(T.HttpLabel("BridgeArn")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v1/bridges/{BridgeArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteBridgeRequest",
}) as any as S.Schema<DeleteBridgeRequest>;
export interface DeleteBridgeResponse {
  BridgeArn?: string;
}
export const DeleteBridgeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BridgeArn: S.optional(S.String) }).pipe(
    S.encodeKeys({ BridgeArn: "bridgeArn" }),
  ),
).annotate({
  identifier: "DeleteBridgeResponse",
}) as any as S.Schema<DeleteBridgeResponse>;
export interface DeleteFlowRequest {
  FlowArn: string;
}
export const DeleteFlowRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FlowArn: S.String.pipe(T.HttpLabel("FlowArn")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v1/flows/{FlowArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteFlowRequest",
}) as any as S.Schema<DeleteFlowRequest>;
export interface DeleteFlowResponse {
  FlowArn?: string;
  Status?: Status;
}
export const DeleteFlowResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FlowArn: S.optional(S.String), Status: S.optional(Status) }).pipe(
    S.encodeKeys({ FlowArn: "flowArn", Status: "status" }),
  ),
).annotate({
  identifier: "DeleteFlowResponse",
}) as any as S.Schema<DeleteFlowResponse>;
export type GatewayArn = string;
export interface DeleteGatewayRequest {
  GatewayArn: string;
}
export const DeleteGatewayRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GatewayArn: S.String.pipe(T.HttpLabel("GatewayArn")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v1/gateways/{GatewayArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteGatewayRequest",
}) as any as S.Schema<DeleteGatewayRequest>;
export interface DeleteGatewayResponse {
  GatewayArn?: string;
}
export const DeleteGatewayResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GatewayArn: S.optional(S.String) }).pipe(
    S.encodeKeys({ GatewayArn: "gatewayArn" }),
  ),
).annotate({
  identifier: "DeleteGatewayResponse",
}) as any as S.Schema<DeleteGatewayResponse>;
export interface DeleteRouterInputRequest {
  Arn: string;
}
export const DeleteRouterInputRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v1/routerInput/{Arn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteRouterInputRequest",
}) as any as S.Schema<DeleteRouterInputRequest>;
export interface DeleteRouterInputResponse {
  Arn: string;
  Name: string;
  State: RouterInputState;
}
export const DeleteRouterInputResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String, Name: S.String, State: RouterInputState }).pipe(
    S.encodeKeys({ Arn: "arn", Name: "name", State: "state" }),
  ),
).annotate({
  identifier: "DeleteRouterInputResponse",
}) as any as S.Schema<DeleteRouterInputResponse>;
export interface DeleteRouterNetworkInterfaceRequest {
  Arn: string;
}
export const DeleteRouterNetworkInterfaceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v1/routerNetworkInterface/{Arn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteRouterNetworkInterfaceRequest",
}) as any as S.Schema<DeleteRouterNetworkInterfaceRequest>;
export interface DeleteRouterNetworkInterfaceResponse {
  Arn: string;
  Name: string;
  State: RouterNetworkInterfaceState;
}
export const DeleteRouterNetworkInterfaceResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Arn: S.String,
      Name: S.String,
      State: RouterNetworkInterfaceState,
    }).pipe(S.encodeKeys({ Arn: "arn", Name: "name", State: "state" })),
).annotate({
  identifier: "DeleteRouterNetworkInterfaceResponse",
}) as any as S.Schema<DeleteRouterNetworkInterfaceResponse>;
export interface DeleteRouterOutputRequest {
  Arn: string;
}
export const DeleteRouterOutputRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v1/routerOutput/{Arn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteRouterOutputRequest",
}) as any as S.Schema<DeleteRouterOutputRequest>;
export interface DeleteRouterOutputResponse {
  Arn: string;
  Name: string;
  State: RouterOutputState;
}
export const DeleteRouterOutputResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String, Name: S.String, State: RouterOutputState }).pipe(
    S.encodeKeys({ Arn: "arn", Name: "name", State: "state" }),
  ),
).annotate({
  identifier: "DeleteRouterOutputResponse",
}) as any as S.Schema<DeleteRouterOutputResponse>;
export type GatewayInstanceArn = string;
export interface DeregisterGatewayInstanceRequest {
  Force?: boolean;
  GatewayInstanceArn: string;
}
export const DeregisterGatewayInstanceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Force: S.optional(S.Boolean).pipe(T.HttpQuery("force")),
    GatewayInstanceArn: S.String.pipe(T.HttpLabel("GatewayInstanceArn")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v1/gateway-instances/{GatewayInstanceArn}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeregisterGatewayInstanceRequest",
}) as any as S.Schema<DeregisterGatewayInstanceRequest>;
export type InstanceState =
  | "REGISTERING"
  | "ACTIVE"
  | "DEREGISTERING"
  | "DEREGISTERED"
  | "REGISTRATION_ERROR"
  | "DEREGISTRATION_ERROR"
  | (string & {});
export const InstanceState = /*@__PURE__*/ S.String;

export interface DeregisterGatewayInstanceResponse {
  GatewayInstanceArn?: string;
  InstanceState?: InstanceState;
}
export const DeregisterGatewayInstanceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GatewayInstanceArn: S.optional(S.String),
    InstanceState: S.optional(InstanceState),
  }).pipe(
    S.encodeKeys({
      GatewayInstanceArn: "gatewayInstanceArn",
      InstanceState: "instanceState",
    }),
  ),
).annotate({
  identifier: "DeregisterGatewayInstanceResponse",
}) as any as S.Schema<DeregisterGatewayInstanceResponse>;
export interface DescribeBridgeRequest {
  BridgeArn: string;
}
export const DescribeBridgeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BridgeArn: S.String.pipe(T.HttpLabel("BridgeArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/bridges/{BridgeArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeBridgeRequest",
}) as any as S.Schema<DescribeBridgeRequest>;
export interface DescribeBridgeResponse {
  Bridge?: Bridge & {
    BridgeArn: string;
    BridgeState: BridgeState;
    Name: string;
    PlacementArn: string;
    BridgeMessages: (MessageDetail & { Code: string; Message: string })[];
    EgressGatewayBridge: EgressGatewayBridge & { MaxBitrate: number };
    IngressGatewayBridge: IngressGatewayBridge & {
      MaxBitrate: number;
      MaxOutputs: number;
    };
    Outputs: (BridgeOutput & {
      FlowOutput: BridgeFlowOutput & {
        FlowArn: string;
        FlowSourceArn: string;
        Name: string;
      };
      NetworkOutput: BridgeNetworkOutput & {
        IpAddress: string;
        Name: string;
        NetworkName: string;
        Port: number;
        Protocol: Protocol;
        Ttl: number;
      };
    })[];
    Sources: (BridgeSource & {
      FlowSource: BridgeFlowSource & { FlowArn: string; Name: string };
      NetworkSource: BridgeNetworkSource & {
        MulticastIp: string;
        Name: string;
        NetworkName: string;
        Port: number;
        Protocol: Protocol;
      };
    })[];
  };
}
export const DescribeBridgeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Bridge: S.optional(Bridge) }).pipe(
    S.encodeKeys({ Bridge: "bridge" }),
  ),
).annotate({
  identifier: "DescribeBridgeResponse",
}) as any as S.Schema<DescribeBridgeResponse>;
export interface DescribeFlowRequest {
  FlowArn: string;
}
export const DescribeFlowRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FlowArn: S.String.pipe(T.HttpLabel("FlowArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/flows/{FlowArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeFlowRequest",
}) as any as S.Schema<DescribeFlowRequest>;
export interface Messages {
  Errors?: string[];
}
export const Messages = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Errors: S.optional(__listOfString) }).pipe(
    S.encodeKeys({ Errors: "errors" }),
  ),
).annotate({ identifier: "Messages" }) as any as S.Schema<Messages>;
export interface DescribeFlowResponse {
  Flow?: Flow & {
    AvailabilityZone: string;
    Entitlements: (Entitlement & {
      EntitlementArn: string;
      Name: string;
      Subscribers: __listOfString;
      Encryption: Encryption & { RoleArn: string };
    })[];
    FlowArn: string;
    Name: string;
    Outputs: (Output & {
      Name: string;
      OutputArn: string;
      Encryption: Encryption & { RoleArn: string };
      MediaStreamOutputConfigurations: (MediaStreamOutputConfiguration & {
        EncodingName: EncodingName;
        MediaStreamName: string;
        DestinationConfigurations: (DestinationConfiguration & {
          DestinationIp: string;
          DestinationPort: number;
          Interface: Interface & { Name: string };
          OutboundIp: string;
        })[];
        EncodingParameters: EncodingParameters & {
          CompressionFactor: number;
          EncoderProfile: EncoderProfile;
        };
      })[];
      Transport: Transport & { Protocol: Protocol };
    })[];
    Source: Source & {
      Name: string;
      SourceArn: string;
      Decryption: Encryption & { RoleArn: string };
      MediaStreamSourceConfigurations: (MediaStreamSourceConfiguration & {
        EncodingName: EncodingName;
        MediaStreamName: string;
        InputConfigurations: (InputConfiguration & {
          InputIp: string;
          InputPort: number;
          Interface: Interface & { Name: string };
        })[];
      })[];
      Transport: Transport & { Protocol: Protocol };
      GatewayBridgeSource: GatewayBridgeSource & { BridgeArn: string };
    };
    Status: Status;
    MediaStreams: (MediaStream & {
      Fmt: number;
      MediaStreamId: number;
      MediaStreamName: string;
      MediaStreamType: MediaStreamType;
      Attributes: MediaStreamAttributes & { Fmtp: Fmtp };
    })[];
    Sources: (Source & {
      Name: string;
      SourceArn: string;
      Decryption: Encryption & { RoleArn: string };
      MediaStreamSourceConfigurations: (MediaStreamSourceConfiguration & {
        EncodingName: EncodingName;
        MediaStreamName: string;
        InputConfigurations: (InputConfiguration & {
          InputIp: string;
          InputPort: number;
          Interface: Interface & { Name: string };
        })[];
      })[];
      Transport: Transport & { Protocol: Protocol };
      GatewayBridgeSource: GatewayBridgeSource & { BridgeArn: string };
    })[];
    VpcInterfaces: (VpcInterface & {
      Name: string;
      NetworkInterfaceIds: __listOfString;
      NetworkInterfaceType: NetworkInterfaceType;
      RoleArn: string;
      SecurityGroupIds: __listOfString;
      SubnetId: string;
    })[];
    NdiConfig: NdiConfig & {
      NdiDiscoveryServers: (NdiDiscoveryServerConfig & {
        DiscoveryServerAddress: string;
        VpcInterfaceAdapter: string;
      })[];
    };
  };
  Messages?: Messages & { Errors: __listOfString };
}
export const DescribeFlowResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Flow: S.optional(Flow), Messages: S.optional(Messages) }).pipe(
    S.encodeKeys({ Flow: "flow", Messages: "messages" }),
  ),
).annotate({
  identifier: "DescribeFlowResponse",
}) as any as S.Schema<DescribeFlowResponse>;
export interface DescribeFlowSourceMetadataRequest {
  FlowArn: string;
}
export const DescribeFlowSourceMetadataRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FlowArn: S.String.pipe(T.HttpLabel("FlowArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/flows/{FlowArn}/source-metadata" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeFlowSourceMetadataRequest",
}) as any as S.Schema<DescribeFlowSourceMetadataRequest>;
export interface FrameResolution {
  FrameHeight?: number;
  FrameWidth?: number;
}
export const FrameResolution = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FrameHeight: S.optional(S.Number),
    FrameWidth: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({ FrameHeight: "frameHeight", FrameWidth: "frameWidth" }),
  ),
).annotate({
  identifier: "FrameResolution",
}) as any as S.Schema<FrameResolution>;
export interface TransportStream {
  Channels?: number;
  Codec?: string;
  FrameRate?: string;
  FrameResolution?: FrameResolution;
  Pid?: number;
  SampleRate?: number;
  SampleSize?: number;
  StreamType?: string;
}
export const TransportStream = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Channels: S.optional(S.Number),
    Codec: S.optional(S.String),
    FrameRate: S.optional(S.String),
    FrameResolution: S.optional(FrameResolution),
    Pid: S.optional(S.Number),
    SampleRate: S.optional(S.Number),
    SampleSize: S.optional(S.Number),
    StreamType: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      Channels: "channels",
      Codec: "codec",
      FrameRate: "frameRate",
      FrameResolution: "frameResolution",
      Pid: "pid",
      SampleRate: "sampleRate",
      SampleSize: "sampleSize",
      StreamType: "streamType",
    }),
  ),
).annotate({
  identifier: "TransportStream",
}) as any as S.Schema<TransportStream>;
export type __listOfTransportStream = TransportStream[];
export const __listOfTransportStream = /*@__PURE__*/ S.Array(TransportStream);
export interface TransportStreamProgram {
  PcrPid?: number;
  ProgramName?: string;
  ProgramNumber?: number;
  ProgramPid?: number;
  Streams?: TransportStream[];
}
export const TransportStreamProgram = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PcrPid: S.optional(S.Number),
    ProgramName: S.optional(S.String),
    ProgramNumber: S.optional(S.Number),
    ProgramPid: S.optional(S.Number),
    Streams: S.optional(__listOfTransportStream),
  }).pipe(
    S.encodeKeys({
      PcrPid: "pcrPid",
      ProgramName: "programName",
      ProgramNumber: "programNumber",
      ProgramPid: "programPid",
      Streams: "streams",
    }),
  ),
).annotate({
  identifier: "TransportStreamProgram",
}) as any as S.Schema<TransportStreamProgram>;
export type __listOfTransportStreamProgram = TransportStreamProgram[];
export const __listOfTransportStreamProgram = /*@__PURE__*/ S.Array(
  TransportStreamProgram,
);
export interface TransportMediaInfo {
  Programs?: TransportStreamProgram[];
}
export const TransportMediaInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Programs: S.optional(__listOfTransportStreamProgram) }).pipe(
    S.encodeKeys({ Programs: "programs" }),
  ),
).annotate({
  identifier: "TransportMediaInfo",
}) as any as S.Schema<TransportMediaInfo>;
export interface NdiSourceInfo {
  SourceName?: string;
}
export const NdiSourceInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SourceName: S.optional(S.String) }).pipe(
    S.encodeKeys({ SourceName: "sourceName" }),
  ),
).annotate({ identifier: "NdiSourceInfo" }) as any as S.Schema<NdiSourceInfo>;
export type __listOfNdiSourceInfo = NdiSourceInfo[];
export const __listOfNdiSourceInfo = /*@__PURE__*/ S.Array(NdiSourceInfo);
export interface NdiMediaStreamInfo {
  StreamType?: string;
  Codec?: string;
  StreamId?: number;
  ScanMode?: ScanMode;
  FrameResolution?: FrameResolution;
  FrameRate?: string;
  Channels?: number;
  SampleRate?: number;
}
export const NdiMediaStreamInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StreamType: S.optional(S.String),
    Codec: S.optional(S.String),
    StreamId: S.optional(S.Number),
    ScanMode: S.optional(ScanMode),
    FrameResolution: S.optional(FrameResolution),
    FrameRate: S.optional(S.String),
    Channels: S.optional(S.Number),
    SampleRate: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      StreamType: "streamType",
      Codec: "codec",
      StreamId: "streamId",
      ScanMode: "scanMode",
      FrameResolution: "frameResolution",
      FrameRate: "frameRate",
      Channels: "channels",
      SampleRate: "sampleRate",
    }),
  ),
).annotate({
  identifier: "NdiMediaStreamInfo",
}) as any as S.Schema<NdiMediaStreamInfo>;
export type __listOfNdiMediaStreamInfo = NdiMediaStreamInfo[];
export const __listOfNdiMediaStreamInfo =
  /*@__PURE__*/ S.Array(NdiMediaStreamInfo);
export interface NdiMediaInfo {
  Streams?: NdiMediaStreamInfo[];
}
export const NdiMediaInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Streams: S.optional(__listOfNdiMediaStreamInfo) }).pipe(
    S.encodeKeys({ Streams: "streams" }),
  ),
).annotate({ identifier: "NdiMediaInfo" }) as any as S.Schema<NdiMediaInfo>;
export interface NdiSourceMetadataInfo {
  ActiveSource?: NdiSourceInfo;
  DiscoveredSources?: NdiSourceInfo[];
  MediaInfo?: NdiMediaInfo;
  Messages?: MessageDetail[];
}
export const NdiSourceMetadataInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActiveSource: S.optional(NdiSourceInfo),
    DiscoveredSources: S.optional(__listOfNdiSourceInfo),
    MediaInfo: S.optional(NdiMediaInfo),
    Messages: S.optional(__listOfMessageDetail),
  }).pipe(
    S.encodeKeys({
      ActiveSource: "activeSource",
      DiscoveredSources: "discoveredSources",
      MediaInfo: "mediaInfo",
      Messages: "messages",
    }),
  ),
).annotate({
  identifier: "NdiSourceMetadataInfo",
}) as any as S.Schema<NdiSourceMetadataInfo>;
export interface DescribeFlowSourceMetadataResponse {
  FlowArn?: string;
  Messages?: (MessageDetail & { Code: string; Message: string })[];
  Timestamp?: Date;
  TransportMediaInfo?: TransportMediaInfo & {
    Programs: (TransportStreamProgram & {
      PcrPid: number;
      ProgramNumber: number;
      ProgramPid: number;
      Streams: (TransportStream & {
        Pid: number;
        StreamType: string;
        FrameResolution: FrameResolution & {
          FrameHeight: number;
          FrameWidth: number;
        };
      })[];
    })[];
  };
  NdiInfo?: NdiSourceMetadataInfo & {
    DiscoveredSources: (NdiSourceInfo & { SourceName: string })[];
    MediaInfo: NdiMediaInfo & {
      Streams: (NdiMediaStreamInfo & {
        StreamType: string;
        Codec: string;
        StreamId: number;
        FrameResolution: FrameResolution & {
          FrameHeight: number;
          FrameWidth: number;
        };
      })[];
    };
    Messages: (MessageDetail & { Code: string; Message: string })[];
    ActiveSource: NdiSourceInfo & { SourceName: string };
  };
}
export const DescribeFlowSourceMetadataResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FlowArn: S.optional(S.String),
    Messages: S.optional(__listOfMessageDetail),
    Timestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    TransportMediaInfo: S.optional(TransportMediaInfo),
    NdiInfo: S.optional(NdiSourceMetadataInfo),
  }).pipe(
    S.encodeKeys({
      FlowArn: "flowArn",
      Messages: "messages",
      Timestamp: "timestamp",
      TransportMediaInfo: "transportMediaInfo",
      NdiInfo: "ndiInfo",
    }),
  ),
).annotate({
  identifier: "DescribeFlowSourceMetadataResponse",
}) as any as S.Schema<DescribeFlowSourceMetadataResponse>;
export interface DescribeFlowSourceThumbnailRequest {
  FlowArn: string;
}
export const DescribeFlowSourceThumbnailRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FlowArn: S.String.pipe(T.HttpLabel("FlowArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/flows/{FlowArn}/source-thumbnail" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeFlowSourceThumbnailRequest",
}) as any as S.Schema<DescribeFlowSourceThumbnailRequest>;
export interface ThumbnailDetails {
  FlowArn?: string;
  Thumbnail?: string;
  ThumbnailMessages?: MessageDetail[];
  Timecode?: string;
  Timestamp?: Date;
}
export const ThumbnailDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FlowArn: S.optional(S.String),
    Thumbnail: S.optional(S.String),
    ThumbnailMessages: S.optional(__listOfMessageDetail),
    Timecode: S.optional(S.String),
    Timestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }).pipe(
    S.encodeKeys({
      FlowArn: "flowArn",
      Thumbnail: "thumbnail",
      ThumbnailMessages: "thumbnailMessages",
      Timecode: "timecode",
      Timestamp: "timestamp",
    }),
  ),
).annotate({
  identifier: "ThumbnailDetails",
}) as any as S.Schema<ThumbnailDetails>;
export interface DescribeFlowSourceThumbnailResponse {
  ThumbnailDetails?: ThumbnailDetails & {
    FlowArn: string;
    ThumbnailMessages: (MessageDetail & { Code: string; Message: string })[];
  };
}
export const DescribeFlowSourceThumbnailResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ThumbnailDetails: S.optional(ThumbnailDetails) }).pipe(
    S.encodeKeys({ ThumbnailDetails: "thumbnailDetails" }),
  ),
).annotate({
  identifier: "DescribeFlowSourceThumbnailResponse",
}) as any as S.Schema<DescribeFlowSourceThumbnailResponse>;
export interface DescribeGatewayRequest {
  GatewayArn: string;
}
export const DescribeGatewayRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GatewayArn: S.String.pipe(T.HttpLabel("GatewayArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/gateways/{GatewayArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeGatewayRequest",
}) as any as S.Schema<DescribeGatewayRequest>;
export interface DescribeGatewayResponse {
  Gateway?: Gateway & {
    EgressCidrBlocks: __listOfString;
    GatewayArn: string;
    Name: string;
    Networks: (GatewayNetwork & { CidrBlock: string; Name: string })[];
    GatewayMessages: (MessageDetail & { Code: string; Message: string })[];
  };
}
export const DescribeGatewayResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Gateway: S.optional(Gateway) }).pipe(
    S.encodeKeys({ Gateway: "gateway" }),
  ),
).annotate({
  identifier: "DescribeGatewayResponse",
}) as any as S.Schema<DescribeGatewayResponse>;
export interface DescribeGatewayInstanceRequest {
  GatewayInstanceArn: string;
}
export const DescribeGatewayInstanceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GatewayInstanceArn: S.String.pipe(T.HttpLabel("GatewayInstanceArn")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v1/gateway-instances/{GatewayInstanceArn}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeGatewayInstanceRequest",
}) as any as S.Schema<DescribeGatewayInstanceRequest>;
export type BridgePlacement = "AVAILABLE" | "LOCKED" | (string & {});
export const BridgePlacement = /*@__PURE__*/ S.String;

export type ConnectionStatus = "CONNECTED" | "DISCONNECTED" | (string & {});
export const ConnectionStatus = /*@__PURE__*/ S.String;

export interface GatewayInstance {
  BridgePlacement?: BridgePlacement;
  ConnectionStatus?: ConnectionStatus;
  GatewayArn?: string;
  GatewayInstanceArn?: string;
  InstanceId?: string;
  InstanceMessages?: MessageDetail[];
  InstanceState?: InstanceState;
  RunningBridgeCount?: number;
}
export const GatewayInstance = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BridgePlacement: S.optional(BridgePlacement),
    ConnectionStatus: S.optional(ConnectionStatus),
    GatewayArn: S.optional(S.String),
    GatewayInstanceArn: S.optional(S.String),
    InstanceId: S.optional(S.String),
    InstanceMessages: S.optional(__listOfMessageDetail),
    InstanceState: S.optional(InstanceState),
    RunningBridgeCount: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      BridgePlacement: "bridgePlacement",
      ConnectionStatus: "connectionStatus",
      GatewayArn: "gatewayArn",
      GatewayInstanceArn: "gatewayInstanceArn",
      InstanceId: "instanceId",
      InstanceMessages: "instanceMessages",
      InstanceState: "instanceState",
      RunningBridgeCount: "runningBridgeCount",
    }),
  ),
).annotate({
  identifier: "GatewayInstance",
}) as any as S.Schema<GatewayInstance>;
export interface DescribeGatewayInstanceResponse {
  GatewayInstance?: GatewayInstance & {
    BridgePlacement: BridgePlacement;
    ConnectionStatus: ConnectionStatus;
    GatewayArn: string;
    GatewayInstanceArn: string;
    InstanceId: string;
    InstanceState: InstanceState;
    RunningBridgeCount: number;
    InstanceMessages: (MessageDetail & { Code: string; Message: string })[];
  };
}
export const DescribeGatewayInstanceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GatewayInstance: S.optional(GatewayInstance) }).pipe(
    S.encodeKeys({ GatewayInstance: "gatewayInstance" }),
  ),
).annotate({
  identifier: "DescribeGatewayInstanceResponse",
}) as any as S.Schema<DescribeGatewayInstanceResponse>;
export type OfferingArn = string;
export interface DescribeOfferingRequest {
  OfferingArn: string;
}
export const DescribeOfferingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OfferingArn: S.String.pipe(T.HttpLabel("OfferingArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/offerings/{OfferingArn}" }),
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
export type DurationUnits = "MONTHS" | (string & {});
export const DurationUnits = /*@__PURE__*/ S.String;

export type PriceUnits = "HOURLY" | (string & {});
export const PriceUnits = /*@__PURE__*/ S.String;

export type ResourceType = "Mbps_Outbound_Bandwidth" | (string & {});
export const ResourceType = /*@__PURE__*/ S.String;

export interface ResourceSpecification {
  ReservedBitrate?: number;
  ResourceType?: ResourceType;
}
export const ResourceSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReservedBitrate: S.optional(S.Number),
    ResourceType: S.optional(ResourceType),
  }).pipe(
    S.encodeKeys({
      ReservedBitrate: "reservedBitrate",
      ResourceType: "resourceType",
    }),
  ),
).annotate({
  identifier: "ResourceSpecification",
}) as any as S.Schema<ResourceSpecification>;
export interface Offering {
  CurrencyCode?: string;
  Duration?: number;
  DurationUnits?: DurationUnits;
  OfferingArn?: string;
  OfferingDescription?: string;
  PricePerUnit?: string;
  PriceUnits?: PriceUnits;
  ResourceSpecification?: ResourceSpecification;
}
export const Offering = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CurrencyCode: S.optional(S.String),
    Duration: S.optional(S.Number),
    DurationUnits: S.optional(DurationUnits),
    OfferingArn: S.optional(S.String),
    OfferingDescription: S.optional(S.String),
    PricePerUnit: S.optional(S.String),
    PriceUnits: S.optional(PriceUnits),
    ResourceSpecification: S.optional(ResourceSpecification),
  }).pipe(
    S.encodeKeys({
      CurrencyCode: "currencyCode",
      Duration: "duration",
      DurationUnits: "durationUnits",
      OfferingArn: "offeringArn",
      OfferingDescription: "offeringDescription",
      PricePerUnit: "pricePerUnit",
      PriceUnits: "priceUnits",
      ResourceSpecification: "resourceSpecification",
    }),
  ),
).annotate({ identifier: "Offering" }) as any as S.Schema<Offering>;
export interface DescribeOfferingResponse {
  Offering?: Offering & {
    CurrencyCode: string;
    Duration: number;
    DurationUnits: DurationUnits;
    OfferingArn: string;
    OfferingDescription: string;
    PricePerUnit: string;
    PriceUnits: PriceUnits;
    ResourceSpecification: ResourceSpecification & {
      ResourceType: ResourceType;
    };
  };
}
export const DescribeOfferingResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Offering: S.optional(Offering) }).pipe(
    S.encodeKeys({ Offering: "offering" }),
  ),
).annotate({
  identifier: "DescribeOfferingResponse",
}) as any as S.Schema<DescribeOfferingResponse>;
export type ReservationArn = string;
export interface DescribeReservationRequest {
  ReservationArn: string;
}
export const DescribeReservationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReservationArn: S.String.pipe(T.HttpLabel("ReservationArn")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/reservations/{ReservationArn}" }),
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
export type ReservationState =
  | "ACTIVE"
  | "EXPIRED"
  | "PROCESSING"
  | "CANCELED"
  | (string & {});
export const ReservationState = /*@__PURE__*/ S.String;

export interface Reservation {
  CurrencyCode?: string;
  Duration?: number;
  DurationUnits?: DurationUnits;
  End?: string;
  OfferingArn?: string;
  OfferingDescription?: string;
  PricePerUnit?: string;
  PriceUnits?: PriceUnits;
  ReservationArn?: string;
  ReservationName?: string;
  ReservationState?: ReservationState;
  ResourceSpecification?: ResourceSpecification;
  Start?: string;
}
export const Reservation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CurrencyCode: S.optional(S.String),
    Duration: S.optional(S.Number),
    DurationUnits: S.optional(DurationUnits),
    End: S.optional(S.String),
    OfferingArn: S.optional(S.String),
    OfferingDescription: S.optional(S.String),
    PricePerUnit: S.optional(S.String),
    PriceUnits: S.optional(PriceUnits),
    ReservationArn: S.optional(S.String),
    ReservationName: S.optional(S.String),
    ReservationState: S.optional(ReservationState),
    ResourceSpecification: S.optional(ResourceSpecification),
    Start: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      CurrencyCode: "currencyCode",
      Duration: "duration",
      DurationUnits: "durationUnits",
      End: "end",
      OfferingArn: "offeringArn",
      OfferingDescription: "offeringDescription",
      PricePerUnit: "pricePerUnit",
      PriceUnits: "priceUnits",
      ReservationArn: "reservationArn",
      ReservationName: "reservationName",
      ReservationState: "reservationState",
      ResourceSpecification: "resourceSpecification",
      Start: "start",
    }),
  ),
).annotate({ identifier: "Reservation" }) as any as S.Schema<Reservation>;
export interface DescribeReservationResponse {
  Reservation?: Reservation & {
    CurrencyCode: string;
    Duration: number;
    DurationUnits: DurationUnits;
    End: string;
    OfferingArn: string;
    OfferingDescription: string;
    PricePerUnit: string;
    PriceUnits: PriceUnits;
    ReservationArn: string;
    ReservationName: string;
    ReservationState: ReservationState;
    ResourceSpecification: ResourceSpecification & {
      ResourceType: ResourceType;
    };
    Start: string;
  };
}
export const DescribeReservationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Reservation: S.optional(Reservation) }).pipe(
    S.encodeKeys({ Reservation: "reservation" }),
  ),
).annotate({
  identifier: "DescribeReservationResponse",
}) as any as S.Schema<DescribeReservationResponse>;
export interface GetRouterInputRequest {
  Arn: string;
}
export const GetRouterInputRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/routerInput/{Arn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRouterInputRequest",
}) as any as S.Schema<GetRouterInputRequest>;
export interface GetRouterInputResponse {
  RouterInput: RouterInput & {
    ContentQualityAnalysisType: RouterContentQualityAnalysisType;
    ContentQualityAnalysisConfiguration: RouterContentQualityAnalysisConfiguration;
  };
}
export const GetRouterInputResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RouterInput: RouterInput }).pipe(
    S.encodeKeys({ RouterInput: "routerInput" }),
  ),
).annotate({
  identifier: "GetRouterInputResponse",
}) as any as S.Schema<GetRouterInputResponse>;
export interface GetRouterInputSourceMetadataRequest {
  Arn: string;
}
export const GetRouterInputSourceMetadataRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/routerInput/{Arn}/source-metadata" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRouterInputSourceMetadataRequest",
}) as any as S.Schema<GetRouterInputSourceMetadataRequest>;
export type RouterInputMetadata = {
  TransportStreamMediaInfo: TransportMediaInfo;
};
export const RouterInputMetadata = /*@__PURE__*/ S.Union([
  S.Struct({ TransportStreamMediaInfo: TransportMediaInfo }),
]);
export interface RouterInputSourceMetadataDetails {
  SourceMetadataMessages: RouterInputMessage[];
  Timestamp: Date;
  RouterInputMetadata?: RouterInputMetadata;
}
export const RouterInputSourceMetadataDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceMetadataMessages: RouterInputMessages,
    Timestamp: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    RouterInputMetadata: S.optional(RouterInputMetadata),
  }).pipe(
    S.encodeKeys({
      SourceMetadataMessages: "sourceMetadataMessages",
      Timestamp: "timestamp",
      RouterInputMetadata: "routerInputMetadata",
    }),
  ),
).annotate({
  identifier: "RouterInputSourceMetadataDetails",
}) as any as S.Schema<RouterInputSourceMetadataDetails>;
export interface GetRouterInputSourceMetadataResponse {
  Arn: string;
  Name: string;
  SourceMetadataDetails: RouterInputSourceMetadataDetails;
}
export const GetRouterInputSourceMetadataResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Arn: S.String,
      Name: S.String,
      SourceMetadataDetails: RouterInputSourceMetadataDetails,
    }).pipe(
      S.encodeKeys({
        Arn: "arn",
        Name: "name",
        SourceMetadataDetails: "sourceMetadataDetails",
      }),
    ),
).annotate({
  identifier: "GetRouterInputSourceMetadataResponse",
}) as any as S.Schema<GetRouterInputSourceMetadataResponse>;
export interface GetRouterInputThumbnailRequest {
  Arn: string;
}
export const GetRouterInputThumbnailRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/routerInput/{Arn}/thumbnail" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRouterInputThumbnailRequest",
}) as any as S.Schema<GetRouterInputThumbnailRequest>;
export interface RouterInputThumbnailDetails {
  ThumbnailMessages: RouterInputMessage[];
  Thumbnail?: Uint8Array;
  Timecode?: string;
  Timestamp?: Date;
}
export const RouterInputThumbnailDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ThumbnailMessages: RouterInputMessages,
    Thumbnail: S.optional(T.Blob),
    Timecode: S.optional(S.String),
    Timestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }).pipe(
    S.encodeKeys({
      ThumbnailMessages: "thumbnailMessages",
      Thumbnail: "thumbnail",
      Timecode: "timecode",
      Timestamp: "timestamp",
    }),
  ),
).annotate({
  identifier: "RouterInputThumbnailDetails",
}) as any as S.Schema<RouterInputThumbnailDetails>;
export interface GetRouterInputThumbnailResponse {
  Arn: string;
  Name: string;
  ThumbnailDetails: RouterInputThumbnailDetails;
}
export const GetRouterInputThumbnailResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    Name: S.String,
    ThumbnailDetails: RouterInputThumbnailDetails,
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      Name: "name",
      ThumbnailDetails: "thumbnailDetails",
    }),
  ),
).annotate({
  identifier: "GetRouterInputThumbnailResponse",
}) as any as S.Schema<GetRouterInputThumbnailResponse>;
export interface GetRouterNetworkInterfaceRequest {
  Arn: string;
}
export const GetRouterNetworkInterfaceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/routerNetworkInterface/{Arn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRouterNetworkInterfaceRequest",
}) as any as S.Schema<GetRouterNetworkInterfaceRequest>;
export interface GetRouterNetworkInterfaceResponse {
  RouterNetworkInterface: RouterNetworkInterface;
}
export const GetRouterNetworkInterfaceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RouterNetworkInterface: RouterNetworkInterface }).pipe(
    S.encodeKeys({ RouterNetworkInterface: "routerNetworkInterface" }),
  ),
).annotate({
  identifier: "GetRouterNetworkInterfaceResponse",
}) as any as S.Schema<GetRouterNetworkInterfaceResponse>;
export interface GetRouterOutputRequest {
  Arn: string;
}
export const GetRouterOutputRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/routerOutput/{Arn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRouterOutputRequest",
}) as any as S.Schema<GetRouterOutputRequest>;
export interface GetRouterOutputResponse {
  RouterOutput: RouterOutput;
}
export const GetRouterOutputResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RouterOutput: RouterOutput }).pipe(
    S.encodeKeys({ RouterOutput: "routerOutput" }),
  ),
).annotate({
  identifier: "GetRouterOutputResponse",
}) as any as S.Schema<GetRouterOutputResponse>;
export interface GrantFlowEntitlementsRequest {
  Entitlements?: GrantEntitlementRequest[];
  FlowArn: string;
}
export const GrantFlowEntitlementsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Entitlements: S.optional(__listOfGrantEntitlementRequest),
    FlowArn: S.String.pipe(T.HttpLabel("FlowArn")),
  })
    .pipe(S.encodeKeys({ Entitlements: "entitlements" }))
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/v1/flows/{FlowArn}/entitlements" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GrantFlowEntitlementsRequest",
}) as any as S.Schema<GrantFlowEntitlementsRequest>;
export interface GrantFlowEntitlementsResponse {
  Entitlements?: (Entitlement & {
    EntitlementArn: string;
    Name: string;
    Subscribers: __listOfString;
    Encryption: Encryption & { RoleArn: string };
  })[];
  FlowArn?: string;
}
export const GrantFlowEntitlementsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Entitlements: S.optional(__listOfEntitlement),
    FlowArn: S.optional(S.String),
  }).pipe(S.encodeKeys({ Entitlements: "entitlements", FlowArn: "flowArn" })),
).annotate({
  identifier: "GrantFlowEntitlementsResponse",
}) as any as S.Schema<GrantFlowEntitlementsResponse>;
export type MaxResults = number;
export interface ListBridgesRequest {
  FilterArn?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListBridgesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FilterArn: S.optional(S.String).pipe(T.HttpQuery("filterArn")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/bridges" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListBridgesRequest",
}) as any as S.Schema<ListBridgesRequest>;
export interface ListedBridge {
  BridgeArn?: string;
  BridgeState?: BridgeState;
  BridgeType?: string;
  Name?: string;
  PlacementArn?: string;
}
export const ListedBridge = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BridgeArn: S.optional(S.String),
    BridgeState: S.optional(BridgeState),
    BridgeType: S.optional(S.String),
    Name: S.optional(S.String),
    PlacementArn: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      BridgeArn: "bridgeArn",
      BridgeState: "bridgeState",
      BridgeType: "bridgeType",
      Name: "name",
      PlacementArn: "placementArn",
    }),
  ),
).annotate({ identifier: "ListedBridge" }) as any as S.Schema<ListedBridge>;
export type __listOfListedBridge = ListedBridge[];
export const __listOfListedBridge = /*@__PURE__*/ S.Array(ListedBridge);
export interface ListBridgesResponse {
  Bridges?: (ListedBridge & {
    BridgeArn: string;
    BridgeState: BridgeState;
    BridgeType: string;
    Name: string;
    PlacementArn: string;
  })[];
  NextToken?: string;
}
export const ListBridgesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Bridges: S.optional(__listOfListedBridge),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Bridges: "bridges", NextToken: "nextToken" })),
).annotate({
  identifier: "ListBridgesResponse",
}) as any as S.Schema<ListBridgesResponse>;
export interface ListEntitlementsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListEntitlementsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/entitlements" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListEntitlementsRequest",
}) as any as S.Schema<ListEntitlementsRequest>;
export interface ListedEntitlement {
  DataTransferSubscriberFeePercent?: number;
  EntitlementArn?: string;
  EntitlementName?: string;
}
export const ListedEntitlement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataTransferSubscriberFeePercent: S.optional(S.Number),
    EntitlementArn: S.optional(S.String),
    EntitlementName: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      DataTransferSubscriberFeePercent: "dataTransferSubscriberFeePercent",
      EntitlementArn: "entitlementArn",
      EntitlementName: "entitlementName",
    }),
  ),
).annotate({
  identifier: "ListedEntitlement",
}) as any as S.Schema<ListedEntitlement>;
export type __listOfListedEntitlement = ListedEntitlement[];
export const __listOfListedEntitlement =
  /*@__PURE__*/ S.Array(ListedEntitlement);
export interface ListEntitlementsResponse {
  Entitlements?: (ListedEntitlement & {
    EntitlementArn: string;
    EntitlementName: string;
  })[];
  NextToken?: string;
}
export const ListEntitlementsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Entitlements: S.optional(__listOfListedEntitlement),
    NextToken: S.optional(S.String),
  }).pipe(
    S.encodeKeys({ Entitlements: "entitlements", NextToken: "nextToken" }),
  ),
).annotate({
  identifier: "ListEntitlementsResponse",
}) as any as S.Schema<ListEntitlementsResponse>;
export interface ListFlowsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListFlowsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/flows" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListFlowsRequest",
}) as any as S.Schema<ListFlowsRequest>;
export type SourceType = "OWNED" | "ENTITLED" | (string & {});
export const SourceType = /*@__PURE__*/ S.String;

export interface ListedFlow {
  AvailabilityZone?: string;
  Description?: string;
  FlowArn?: string;
  Name?: string;
  SourceType?: SourceType;
  Status?: Status;
  Maintenance?: Maintenance;
}
export const ListedFlow = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AvailabilityZone: S.optional(S.String),
    Description: S.optional(S.String),
    FlowArn: S.optional(S.String),
    Name: S.optional(S.String),
    SourceType: S.optional(SourceType),
    Status: S.optional(Status),
    Maintenance: S.optional(Maintenance),
  }).pipe(
    S.encodeKeys({
      AvailabilityZone: "availabilityZone",
      Description: "description",
      FlowArn: "flowArn",
      Name: "name",
      SourceType: "sourceType",
      Status: "status",
      Maintenance: "maintenance",
    }),
  ),
).annotate({ identifier: "ListedFlow" }) as any as S.Schema<ListedFlow>;
export type __listOfListedFlow = ListedFlow[];
export const __listOfListedFlow = /*@__PURE__*/ S.Array(ListedFlow);
export interface ListFlowsResponse {
  Flows?: (ListedFlow & {
    AvailabilityZone: string;
    Description: string;
    FlowArn: string;
    Name: string;
    SourceType: SourceType;
    Status: Status;
  })[];
  NextToken?: string;
}
export const ListFlowsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Flows: S.optional(__listOfListedFlow),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Flows: "flows", NextToken: "nextToken" })),
).annotate({
  identifier: "ListFlowsResponse",
}) as any as S.Schema<ListFlowsResponse>;
export interface ListGatewayInstancesRequest {
  FilterArn?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListGatewayInstancesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FilterArn: S.optional(S.String).pipe(T.HttpQuery("filterArn")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/gateway-instances" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListGatewayInstancesRequest",
}) as any as S.Schema<ListGatewayInstancesRequest>;
export interface ListedGatewayInstance {
  GatewayArn?: string;
  GatewayInstanceArn?: string;
  InstanceId?: string;
  InstanceState?: InstanceState;
}
export const ListedGatewayInstance = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GatewayArn: S.optional(S.String),
    GatewayInstanceArn: S.optional(S.String),
    InstanceId: S.optional(S.String),
    InstanceState: S.optional(InstanceState),
  }).pipe(
    S.encodeKeys({
      GatewayArn: "gatewayArn",
      GatewayInstanceArn: "gatewayInstanceArn",
      InstanceId: "instanceId",
      InstanceState: "instanceState",
    }),
  ),
).annotate({
  identifier: "ListedGatewayInstance",
}) as any as S.Schema<ListedGatewayInstance>;
export type __listOfListedGatewayInstance = ListedGatewayInstance[];
export const __listOfListedGatewayInstance = /*@__PURE__*/ S.Array(
  ListedGatewayInstance,
);
export interface ListGatewayInstancesResponse {
  Instances?: (ListedGatewayInstance & {
    GatewayArn: string;
    GatewayInstanceArn: string;
    InstanceId: string;
  })[];
  NextToken?: string;
}
export const ListGatewayInstancesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Instances: S.optional(__listOfListedGatewayInstance),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Instances: "instances", NextToken: "nextToken" })),
).annotate({
  identifier: "ListGatewayInstancesResponse",
}) as any as S.Schema<ListGatewayInstancesResponse>;
export interface ListGatewaysRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListGatewaysRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/gateways" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListGatewaysRequest",
}) as any as S.Schema<ListGatewaysRequest>;
export interface ListedGateway {
  GatewayArn?: string;
  GatewayState?: GatewayState;
  Name?: string;
}
export const ListedGateway = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GatewayArn: S.optional(S.String),
    GatewayState: S.optional(GatewayState),
    Name: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      GatewayArn: "gatewayArn",
      GatewayState: "gatewayState",
      Name: "name",
    }),
  ),
).annotate({ identifier: "ListedGateway" }) as any as S.Schema<ListedGateway>;
export type __listOfListedGateway = ListedGateway[];
export const __listOfListedGateway = /*@__PURE__*/ S.Array(ListedGateway);
export interface ListGatewaysResponse {
  Gateways?: (ListedGateway & {
    GatewayArn: string;
    GatewayState: GatewayState;
    Name: string;
  })[];
  NextToken?: string;
}
export const ListGatewaysResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Gateways: S.optional(__listOfListedGateway),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Gateways: "gateways", NextToken: "nextToken" })),
).annotate({
  identifier: "ListGatewaysResponse",
}) as any as S.Schema<ListGatewaysResponse>;
export interface ListOfferingsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListOfferingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/offerings" }),
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
export type __listOfOffering = Offering[];
export const __listOfOffering = /*@__PURE__*/ S.Array(Offering);
export interface ListOfferingsResponse {
  NextToken?: string;
  Offerings?: (Offering & {
    CurrencyCode: string;
    Duration: number;
    DurationUnits: DurationUnits;
    OfferingArn: string;
    OfferingDescription: string;
    PricePerUnit: string;
    PriceUnits: PriceUnits;
    ResourceSpecification: ResourceSpecification & {
      ResourceType: ResourceType;
    };
  })[];
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
  MaxResults?: number;
  NextToken?: string;
}
export const ListReservationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/reservations" }),
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
export type __listOfReservation = Reservation[];
export const __listOfReservation = /*@__PURE__*/ S.Array(Reservation);
export interface ListReservationsResponse {
  NextToken?: string;
  Reservations?: (Reservation & {
    CurrencyCode: string;
    Duration: number;
    DurationUnits: DurationUnits;
    End: string;
    OfferingArn: string;
    OfferingDescription: string;
    PricePerUnit: string;
    PriceUnits: PriceUnits;
    ReservationArn: string;
    ReservationName: string;
    ReservationState: ReservationState;
    ResourceSpecification: ResourceSpecification & {
      ResourceType: ResourceType;
    };
    Start: string;
  })[];
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
export type StringList = string[];
export const StringList = /*@__PURE__*/ S.Array(S.String);
export type RoutingScopeList = RoutingScope[];
export const RoutingScopeList = /*@__PURE__*/ S.Array(RoutingScope);
export type RouterInputTypeList = RouterInputType[];
export const RouterInputTypeList = /*@__PURE__*/ S.Array(RouterInputType);
export type RouterInputFilter =
  | {
      NameContains: string[];
      RegionNames?: never;
      NetworkInterfaceArns?: never;
      RoutingScopes?: never;
      InputTypes?: never;
    }
  | {
      NameContains?: never;
      RegionNames: string[];
      NetworkInterfaceArns?: never;
      RoutingScopes?: never;
      InputTypes?: never;
    }
  | {
      NameContains?: never;
      RegionNames?: never;
      NetworkInterfaceArns: string[];
      RoutingScopes?: never;
      InputTypes?: never;
    }
  | {
      NameContains?: never;
      RegionNames?: never;
      NetworkInterfaceArns?: never;
      RoutingScopes: RoutingScope[];
      InputTypes?: never;
    }
  | {
      NameContains?: never;
      RegionNames?: never;
      NetworkInterfaceArns?: never;
      RoutingScopes?: never;
      InputTypes: RouterInputType[];
    };
export const RouterInputFilter = /*@__PURE__*/ S.Union([
  S.Struct({ NameContains: StringList }),
  S.Struct({ RegionNames: StringList }),
  S.Struct({ NetworkInterfaceArns: RouterNetworkInterfaceArnList }),
  S.Struct({ RoutingScopes: RoutingScopeList }),
  S.Struct({ InputTypes: RouterInputTypeList }),
]);
export type RouterInputFilterList = RouterInputFilter[];
export const RouterInputFilterList = /*@__PURE__*/ S.Array(RouterInputFilter);
export interface ListRouterInputsRequest {
  MaxResults?: number;
  NextToken?: string;
  Filters?: RouterInputFilter[];
}
export const ListRouterInputsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    Filters: S.optional(RouterInputFilterList),
  })
    .pipe(S.encodeKeys({ Filters: "filters" }))
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/v1/routerInputs" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListRouterInputsRequest",
}) as any as S.Schema<ListRouterInputsRequest>;
export interface ListedRouterInput {
  Name: string;
  Arn: string;
  Id: string;
  InputType: RouterInputType;
  State: RouterInputState;
  RoutedOutputs: number;
  RegionName: string;
  AvailabilityZone: string;
  MaximumBitrate: number;
  RoutingScope: RoutingScope;
  CreatedAt: Date;
  UpdatedAt: Date;
  MessageCount: number;
  NetworkInterfaceArn?: string;
  MaintenanceScheduleType?: MaintenanceScheduleType;
  MaintenanceSchedule?: MaintenanceSchedule;
}
export const ListedRouterInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Arn: S.String,
    Id: S.String,
    InputType: RouterInputType,
    State: RouterInputState,
    RoutedOutputs: S.Number,
    RegionName: S.String,
    AvailabilityZone: S.String,
    MaximumBitrate: S.Number,
    RoutingScope: RoutingScope,
    CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    MessageCount: S.Number,
    NetworkInterfaceArn: S.optional(S.String),
    MaintenanceScheduleType: S.optional(MaintenanceScheduleType),
    MaintenanceSchedule: S.optional(MaintenanceSchedule),
  }).pipe(
    S.encodeKeys({
      Name: "name",
      Arn: "arn",
      Id: "id",
      InputType: "inputType",
      State: "state",
      RoutedOutputs: "routedOutputs",
      RegionName: "regionName",
      AvailabilityZone: "availabilityZone",
      MaximumBitrate: "maximumBitrate",
      RoutingScope: "routingScope",
      CreatedAt: "createdAt",
      UpdatedAt: "updatedAt",
      MessageCount: "messageCount",
      NetworkInterfaceArn: "networkInterfaceArn",
      MaintenanceScheduleType: "maintenanceScheduleType",
      MaintenanceSchedule: "maintenanceSchedule",
    }),
  ),
).annotate({
  identifier: "ListedRouterInput",
}) as any as S.Schema<ListedRouterInput>;
export type ListedRouterInputList = ListedRouterInput[];
export const ListedRouterInputList = /*@__PURE__*/ S.Array(ListedRouterInput);
export interface ListRouterInputsResponse {
  RouterInputs: ListedRouterInput[];
  NextToken?: string;
}
export const ListRouterInputsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RouterInputs: ListedRouterInputList,
    NextToken: S.optional(S.String),
  }).pipe(
    S.encodeKeys({ RouterInputs: "routerInputs", NextToken: "nextToken" }),
  ),
).annotate({
  identifier: "ListRouterInputsResponse",
}) as any as S.Schema<ListRouterInputsResponse>;
export type RouterNetworkInterfaceTypeList = RouterNetworkInterfaceType[];
export const RouterNetworkInterfaceTypeList = /*@__PURE__*/ S.Array(
  RouterNetworkInterfaceType,
);
export type RouterNetworkInterfaceFilter =
  | {
      RegionNames: string[];
      NetworkInterfaceTypes?: never;
      NameContains?: never;
    }
  | {
      RegionNames?: never;
      NetworkInterfaceTypes: RouterNetworkInterfaceType[];
      NameContains?: never;
    }
  | {
      RegionNames?: never;
      NetworkInterfaceTypes?: never;
      NameContains: string[];
    };
export const RouterNetworkInterfaceFilter = /*@__PURE__*/ S.Union([
  S.Struct({ RegionNames: StringList }),
  S.Struct({ NetworkInterfaceTypes: RouterNetworkInterfaceTypeList }),
  S.Struct({ NameContains: StringList }),
]);
export type RouterNetworkInterfaceFilterList = RouterNetworkInterfaceFilter[];
export const RouterNetworkInterfaceFilterList = /*@__PURE__*/ S.Array(
  RouterNetworkInterfaceFilter,
);
export interface ListRouterNetworkInterfacesRequest {
  MaxResults?: number;
  NextToken?: string;
  Filters?: RouterNetworkInterfaceFilter[];
}
export const ListRouterNetworkInterfacesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    Filters: S.optional(RouterNetworkInterfaceFilterList),
  })
    .pipe(S.encodeKeys({ Filters: "filters" }))
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/v1/routerNetworkInterfaces" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListRouterNetworkInterfacesRequest",
}) as any as S.Schema<ListRouterNetworkInterfacesRequest>;
export interface ListedRouterNetworkInterface {
  Name: string;
  Arn: string;
  Id: string;
  NetworkInterfaceType: RouterNetworkInterfaceType;
  AssociatedOutputCount: number;
  AssociatedInputCount: number;
  State: RouterNetworkInterfaceState;
  RegionName: string;
  CreatedAt: Date;
  UpdatedAt: Date;
}
export const ListedRouterNetworkInterface = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Arn: S.String,
    Id: S.String,
    NetworkInterfaceType: RouterNetworkInterfaceType,
    AssociatedOutputCount: S.Number,
    AssociatedInputCount: S.Number,
    State: RouterNetworkInterfaceState,
    RegionName: S.String,
    CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }).pipe(
    S.encodeKeys({
      Name: "name",
      Arn: "arn",
      Id: "id",
      NetworkInterfaceType: "networkInterfaceType",
      AssociatedOutputCount: "associatedOutputCount",
      AssociatedInputCount: "associatedInputCount",
      State: "state",
      RegionName: "regionName",
      CreatedAt: "createdAt",
      UpdatedAt: "updatedAt",
    }),
  ),
).annotate({
  identifier: "ListedRouterNetworkInterface",
}) as any as S.Schema<ListedRouterNetworkInterface>;
export type ListedRouterNetworkInterfaceList = ListedRouterNetworkInterface[];
export const ListedRouterNetworkInterfaceList = /*@__PURE__*/ S.Array(
  ListedRouterNetworkInterface,
);
export interface ListRouterNetworkInterfacesResponse {
  RouterNetworkInterfaces: ListedRouterNetworkInterface[];
  NextToken?: string;
}
export const ListRouterNetworkInterfacesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RouterNetworkInterfaces: ListedRouterNetworkInterfaceList,
    NextToken: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      RouterNetworkInterfaces: "routerNetworkInterfaces",
      NextToken: "nextToken",
    }),
  ),
).annotate({
  identifier: "ListRouterNetworkInterfacesResponse",
}) as any as S.Schema<ListRouterNetworkInterfacesResponse>;
export type RouterOutputTypeList = RouterOutputType[];
export const RouterOutputTypeList = /*@__PURE__*/ S.Array(RouterOutputType);
export type RouterOutputFilter =
  | {
      RegionNames: string[];
      NetworkInterfaceArns?: never;
      RoutingScopes?: never;
      OutputTypes?: never;
      RoutedInputArns?: never;
      NameContains?: never;
    }
  | {
      RegionNames?: never;
      NetworkInterfaceArns: string[];
      RoutingScopes?: never;
      OutputTypes?: never;
      RoutedInputArns?: never;
      NameContains?: never;
    }
  | {
      RegionNames?: never;
      NetworkInterfaceArns?: never;
      RoutingScopes: RoutingScope[];
      OutputTypes?: never;
      RoutedInputArns?: never;
      NameContains?: never;
    }
  | {
      RegionNames?: never;
      NetworkInterfaceArns?: never;
      RoutingScopes?: never;
      OutputTypes: RouterOutputType[];
      RoutedInputArns?: never;
      NameContains?: never;
    }
  | {
      RegionNames?: never;
      NetworkInterfaceArns?: never;
      RoutingScopes?: never;
      OutputTypes?: never;
      RoutedInputArns: string[];
      NameContains?: never;
    }
  | {
      RegionNames?: never;
      NetworkInterfaceArns?: never;
      RoutingScopes?: never;
      OutputTypes?: never;
      RoutedInputArns?: never;
      NameContains: string[];
    };
export const RouterOutputFilter = /*@__PURE__*/ S.Union([
  S.Struct({ RegionNames: StringList }),
  S.Struct({ NetworkInterfaceArns: RouterNetworkInterfaceArnList }),
  S.Struct({ RoutingScopes: RoutingScopeList }),
  S.Struct({ OutputTypes: RouterOutputTypeList }),
  S.Struct({ RoutedInputArns: RouterInputArnList }),
  S.Struct({ NameContains: StringList }),
]);
export type RouterOutputFilterList = RouterOutputFilter[];
export const RouterOutputFilterList = /*@__PURE__*/ S.Array(RouterOutputFilter);
export interface ListRouterOutputsRequest {
  MaxResults?: number;
  NextToken?: string;
  Filters?: RouterOutputFilter[];
}
export const ListRouterOutputsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    Filters: S.optional(RouterOutputFilterList),
  })
    .pipe(S.encodeKeys({ Filters: "filters" }))
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/v1/routerOutputs" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListRouterOutputsRequest",
}) as any as S.Schema<ListRouterOutputsRequest>;
export interface ListedRouterOutput {
  Name: string;
  Arn: string;
  Id: string;
  OutputType: RouterOutputType;
  State: RouterOutputState;
  RoutedState: RouterOutputRoutedState;
  RegionName: string;
  AvailabilityZone: string;
  MaximumBitrate: number;
  RoutingScope: RoutingScope;
  CreatedAt: Date;
  UpdatedAt: Date;
  MessageCount: number;
  RoutedInputArn?: string;
  NetworkInterfaceArn?: string;
  MaintenanceScheduleType?: MaintenanceScheduleType;
  MaintenanceSchedule?: MaintenanceSchedule;
}
export const ListedRouterOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Arn: S.String,
    Id: S.String,
    OutputType: RouterOutputType,
    State: RouterOutputState,
    RoutedState: RouterOutputRoutedState,
    RegionName: S.String,
    AvailabilityZone: S.String,
    MaximumBitrate: S.Number,
    RoutingScope: RoutingScope,
    CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    MessageCount: S.Number,
    RoutedInputArn: S.optional(S.String),
    NetworkInterfaceArn: S.optional(S.String),
    MaintenanceScheduleType: S.optional(MaintenanceScheduleType),
    MaintenanceSchedule: S.optional(MaintenanceSchedule),
  }).pipe(
    S.encodeKeys({
      Name: "name",
      Arn: "arn",
      Id: "id",
      OutputType: "outputType",
      State: "state",
      RoutedState: "routedState",
      RegionName: "regionName",
      AvailabilityZone: "availabilityZone",
      MaximumBitrate: "maximumBitrate",
      RoutingScope: "routingScope",
      CreatedAt: "createdAt",
      UpdatedAt: "updatedAt",
      MessageCount: "messageCount",
      RoutedInputArn: "routedInputArn",
      NetworkInterfaceArn: "networkInterfaceArn",
      MaintenanceScheduleType: "maintenanceScheduleType",
      MaintenanceSchedule: "maintenanceSchedule",
    }),
  ),
).annotate({
  identifier: "ListedRouterOutput",
}) as any as S.Schema<ListedRouterOutput>;
export type ListedRouterOutputList = ListedRouterOutput[];
export const ListedRouterOutputList = /*@__PURE__*/ S.Array(ListedRouterOutput);
export interface ListRouterOutputsResponse {
  RouterOutputs: ListedRouterOutput[];
  NextToken?: string;
}
export const ListRouterOutputsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RouterOutputs: ListedRouterOutputList,
    NextToken: S.optional(S.String),
  }).pipe(
    S.encodeKeys({ RouterOutputs: "routerOutputs", NextToken: "nextToken" }),
  ),
).annotate({
  identifier: "ListRouterOutputsResponse",
}) as any as S.Schema<ListRouterOutputsResponse>;
export interface ListTagsForGlobalResourceRequest {
  ResourceArn: string;
}
export const ListTagsForGlobalResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/tags/global/{ResourceArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTagsForGlobalResourceRequest",
}) as any as S.Schema<ListTagsForGlobalResourceRequest>;
export interface ListTagsForGlobalResourceResponse {
  Tags?: { [key: string]: string | undefined };
}
export const ListTagsForGlobalResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(__mapOfString) }).pipe(
    S.encodeKeys({ Tags: "tags" }),
  ),
).annotate({
  identifier: "ListTagsForGlobalResourceResponse",
}) as any as S.Schema<ListTagsForGlobalResourceResponse>;
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
  S.Struct({ Tags: S.optional(__mapOfString) }).pipe(
    S.encodeKeys({ Tags: "tags" }),
  ),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface PurchaseOfferingRequest {
  OfferingArn: string;
  ReservationName?: string;
  Start?: string;
}
export const PurchaseOfferingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OfferingArn: S.String.pipe(T.HttpLabel("OfferingArn")),
    ReservationName: S.optional(S.String),
    Start: S.optional(S.String),
  })
    .pipe(S.encodeKeys({ ReservationName: "reservationName", Start: "start" }))
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/v1/offerings/{OfferingArn}" }),
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
  Reservation?: Reservation & {
    CurrencyCode: string;
    Duration: number;
    DurationUnits: DurationUnits;
    End: string;
    OfferingArn: string;
    OfferingDescription: string;
    PricePerUnit: string;
    PriceUnits: PriceUnits;
    ReservationArn: string;
    ReservationName: string;
    ReservationState: ReservationState;
    ResourceSpecification: ResourceSpecification & {
      ResourceType: ResourceType;
    };
    Start: string;
  };
}
export const PurchaseOfferingResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Reservation: S.optional(Reservation) }).pipe(
    S.encodeKeys({ Reservation: "reservation" }),
  ),
).annotate({
  identifier: "PurchaseOfferingResponse",
}) as any as S.Schema<PurchaseOfferingResponse>;
export interface RemoveBridgeOutputRequest {
  BridgeArn: string;
  OutputName: string;
}
export const RemoveBridgeOutputRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BridgeArn: S.String.pipe(T.HttpLabel("BridgeArn")),
    OutputName: S.String.pipe(T.HttpLabel("OutputName")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v1/bridges/{BridgeArn}/outputs/{OutputName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RemoveBridgeOutputRequest",
}) as any as S.Schema<RemoveBridgeOutputRequest>;
export interface RemoveBridgeOutputResponse {
  BridgeArn?: string;
  OutputName?: string;
}
export const RemoveBridgeOutputResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BridgeArn: S.optional(S.String),
    OutputName: S.optional(S.String),
  }).pipe(S.encodeKeys({ BridgeArn: "bridgeArn", OutputName: "outputName" })),
).annotate({
  identifier: "RemoveBridgeOutputResponse",
}) as any as S.Schema<RemoveBridgeOutputResponse>;
export interface RemoveBridgeSourceRequest {
  BridgeArn: string;
  SourceName: string;
}
export const RemoveBridgeSourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BridgeArn: S.String.pipe(T.HttpLabel("BridgeArn")),
    SourceName: S.String.pipe(T.HttpLabel("SourceName")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v1/bridges/{BridgeArn}/sources/{SourceName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RemoveBridgeSourceRequest",
}) as any as S.Schema<RemoveBridgeSourceRequest>;
export interface RemoveBridgeSourceResponse {
  BridgeArn?: string;
  SourceName?: string;
}
export const RemoveBridgeSourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BridgeArn: S.optional(S.String),
    SourceName: S.optional(S.String),
  }).pipe(S.encodeKeys({ BridgeArn: "bridgeArn", SourceName: "sourceName" })),
).annotate({
  identifier: "RemoveBridgeSourceResponse",
}) as any as S.Schema<RemoveBridgeSourceResponse>;
export interface RemoveFlowMediaStreamRequest {
  FlowArn: string;
  MediaStreamName: string;
}
export const RemoveFlowMediaStreamRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FlowArn: S.String.pipe(T.HttpLabel("FlowArn")),
    MediaStreamName: S.String.pipe(T.HttpLabel("MediaStreamName")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v1/flows/{FlowArn}/mediaStreams/{MediaStreamName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RemoveFlowMediaStreamRequest",
}) as any as S.Schema<RemoveFlowMediaStreamRequest>;
export interface RemoveFlowMediaStreamResponse {
  FlowArn?: string;
  MediaStreamName?: string;
}
export const RemoveFlowMediaStreamResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FlowArn: S.optional(S.String),
    MediaStreamName: S.optional(S.String),
  }).pipe(
    S.encodeKeys({ FlowArn: "flowArn", MediaStreamName: "mediaStreamName" }),
  ),
).annotate({
  identifier: "RemoveFlowMediaStreamResponse",
}) as any as S.Schema<RemoveFlowMediaStreamResponse>;
export interface RemoveFlowOutputRequest {
  FlowArn: string;
  OutputArn: string;
}
export const RemoveFlowOutputRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FlowArn: S.String.pipe(T.HttpLabel("FlowArn")),
    OutputArn: S.String.pipe(T.HttpLabel("OutputArn")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v1/flows/{FlowArn}/outputs/{OutputArn}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RemoveFlowOutputRequest",
}) as any as S.Schema<RemoveFlowOutputRequest>;
export interface RemoveFlowOutputResponse {
  FlowArn?: string;
  OutputArn?: string;
}
export const RemoveFlowOutputResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FlowArn: S.optional(S.String),
    OutputArn: S.optional(S.String),
  }).pipe(S.encodeKeys({ FlowArn: "flowArn", OutputArn: "outputArn" })),
).annotate({
  identifier: "RemoveFlowOutputResponse",
}) as any as S.Schema<RemoveFlowOutputResponse>;
export interface RemoveFlowSourceRequest {
  FlowArn: string;
  SourceArn: string;
}
export const RemoveFlowSourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FlowArn: S.String.pipe(T.HttpLabel("FlowArn")),
    SourceArn: S.String.pipe(T.HttpLabel("SourceArn")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v1/flows/{FlowArn}/source/{SourceArn}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RemoveFlowSourceRequest",
}) as any as S.Schema<RemoveFlowSourceRequest>;
export interface RemoveFlowSourceResponse {
  FlowArn?: string;
  SourceArn?: string;
}
export const RemoveFlowSourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FlowArn: S.optional(S.String),
    SourceArn: S.optional(S.String),
  }).pipe(S.encodeKeys({ FlowArn: "flowArn", SourceArn: "sourceArn" })),
).annotate({
  identifier: "RemoveFlowSourceResponse",
}) as any as S.Schema<RemoveFlowSourceResponse>;
export interface RemoveFlowVpcInterfaceRequest {
  FlowArn: string;
  VpcInterfaceName: string;
}
export const RemoveFlowVpcInterfaceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FlowArn: S.String.pipe(T.HttpLabel("FlowArn")),
    VpcInterfaceName: S.String.pipe(T.HttpLabel("VpcInterfaceName")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v1/flows/{FlowArn}/vpcInterfaces/{VpcInterfaceName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RemoveFlowVpcInterfaceRequest",
}) as any as S.Schema<RemoveFlowVpcInterfaceRequest>;
export interface RemoveFlowVpcInterfaceResponse {
  FlowArn?: string;
  NonDeletedNetworkInterfaceIds?: string[];
  VpcInterfaceName?: string;
}
export const RemoveFlowVpcInterfaceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FlowArn: S.optional(S.String),
    NonDeletedNetworkInterfaceIds: S.optional(__listOfString),
    VpcInterfaceName: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      FlowArn: "flowArn",
      NonDeletedNetworkInterfaceIds: "nonDeletedNetworkInterfaceIds",
      VpcInterfaceName: "vpcInterfaceName",
    }),
  ),
).annotate({
  identifier: "RemoveFlowVpcInterfaceResponse",
}) as any as S.Schema<RemoveFlowVpcInterfaceResponse>;
export interface RestartRouterInputRequest {
  Arn: string;
}
export const RestartRouterInputRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/routerInput/restart/{Arn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RestartRouterInputRequest",
}) as any as S.Schema<RestartRouterInputRequest>;
export interface RestartRouterInputResponse {
  Arn: string;
  Name: string;
  State: RouterInputState;
}
export const RestartRouterInputResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String, Name: S.String, State: RouterInputState }).pipe(
    S.encodeKeys({ Arn: "arn", Name: "name", State: "state" }),
  ),
).annotate({
  identifier: "RestartRouterInputResponse",
}) as any as S.Schema<RestartRouterInputResponse>;
export interface RestartRouterOutputRequest {
  Arn: string;
}
export const RestartRouterOutputRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/routerOutput/restart/{Arn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RestartRouterOutputRequest",
}) as any as S.Schema<RestartRouterOutputRequest>;
export interface RestartRouterOutputResponse {
  Arn: string;
  Name: string;
  State: RouterOutputState;
}
export const RestartRouterOutputResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String, Name: S.String, State: RouterOutputState }).pipe(
    S.encodeKeys({ Arn: "arn", Name: "name", State: "state" }),
  ),
).annotate({
  identifier: "RestartRouterOutputResponse",
}) as any as S.Schema<RestartRouterOutputResponse>;
export interface RevokeFlowEntitlementRequest {
  EntitlementArn: string;
  FlowArn: string;
}
export const RevokeFlowEntitlementRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EntitlementArn: S.String.pipe(T.HttpLabel("EntitlementArn")),
    FlowArn: S.String.pipe(T.HttpLabel("FlowArn")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v1/flows/{FlowArn}/entitlements/{EntitlementArn}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RevokeFlowEntitlementRequest",
}) as any as S.Schema<RevokeFlowEntitlementRequest>;
export interface RevokeFlowEntitlementResponse {
  EntitlementArn?: string;
  FlowArn?: string;
}
export const RevokeFlowEntitlementResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EntitlementArn: S.optional(S.String),
    FlowArn: S.optional(S.String),
  }).pipe(
    S.encodeKeys({ EntitlementArn: "entitlementArn", FlowArn: "flowArn" }),
  ),
).annotate({
  identifier: "RevokeFlowEntitlementResponse",
}) as any as S.Schema<RevokeFlowEntitlementResponse>;
export interface StartFlowRequest {
  FlowArn: string;
}
export const StartFlowRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FlowArn: S.String.pipe(T.HttpLabel("FlowArn")) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/flows/start/{FlowArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartFlowRequest",
}) as any as S.Schema<StartFlowRequest>;
export interface StartFlowResponse {
  FlowArn?: string;
  Status?: Status;
}
export const StartFlowResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FlowArn: S.optional(S.String), Status: S.optional(Status) }).pipe(
    S.encodeKeys({ FlowArn: "flowArn", Status: "status" }),
  ),
).annotate({
  identifier: "StartFlowResponse",
}) as any as S.Schema<StartFlowResponse>;
export interface StartRouterInputRequest {
  Arn: string;
}
export const StartRouterInputRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/routerInput/start/{Arn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartRouterInputRequest",
}) as any as S.Schema<StartRouterInputRequest>;
export interface StartRouterInputResponse {
  Arn: string;
  Name: string;
  State: RouterInputState;
  MaintenanceScheduleType: MaintenanceScheduleType;
  MaintenanceSchedule: MaintenanceSchedule;
}
export const StartRouterInputResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    Name: S.String,
    State: RouterInputState,
    MaintenanceScheduleType: MaintenanceScheduleType,
    MaintenanceSchedule: MaintenanceSchedule,
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      Name: "name",
      State: "state",
      MaintenanceScheduleType: "maintenanceScheduleType",
      MaintenanceSchedule: "maintenanceSchedule",
    }),
  ),
).annotate({
  identifier: "StartRouterInputResponse",
}) as any as S.Schema<StartRouterInputResponse>;
export interface StartRouterOutputRequest {
  Arn: string;
}
export const StartRouterOutputRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/routerOutput/start/{Arn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartRouterOutputRequest",
}) as any as S.Schema<StartRouterOutputRequest>;
export interface StartRouterOutputResponse {
  Arn: string;
  Name: string;
  State: RouterOutputState;
  MaintenanceScheduleType: MaintenanceScheduleType;
  MaintenanceSchedule: MaintenanceSchedule;
}
export const StartRouterOutputResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    Name: S.String,
    State: RouterOutputState,
    MaintenanceScheduleType: MaintenanceScheduleType,
    MaintenanceSchedule: MaintenanceSchedule,
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      Name: "name",
      State: "state",
      MaintenanceScheduleType: "maintenanceScheduleType",
      MaintenanceSchedule: "maintenanceSchedule",
    }),
  ),
).annotate({
  identifier: "StartRouterOutputResponse",
}) as any as S.Schema<StartRouterOutputResponse>;
export interface StopFlowRequest {
  FlowArn: string;
}
export const StopFlowRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FlowArn: S.String.pipe(T.HttpLabel("FlowArn")) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/flows/stop/{FlowArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopFlowRequest",
}) as any as S.Schema<StopFlowRequest>;
export interface StopFlowResponse {
  FlowArn?: string;
  Status?: Status;
}
export const StopFlowResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FlowArn: S.optional(S.String), Status: S.optional(Status) }).pipe(
    S.encodeKeys({ FlowArn: "flowArn", Status: "status" }),
  ),
).annotate({
  identifier: "StopFlowResponse",
}) as any as S.Schema<StopFlowResponse>;
export interface StopRouterInputRequest {
  Arn: string;
}
export const StopRouterInputRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/routerInput/stop/{Arn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopRouterInputRequest",
}) as any as S.Schema<StopRouterInputRequest>;
export interface StopRouterInputResponse {
  Arn: string;
  Name: string;
  State: RouterInputState;
}
export const StopRouterInputResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String, Name: S.String, State: RouterInputState }).pipe(
    S.encodeKeys({ Arn: "arn", Name: "name", State: "state" }),
  ),
).annotate({
  identifier: "StopRouterInputResponse",
}) as any as S.Schema<StopRouterInputResponse>;
export interface StopRouterOutputRequest {
  Arn: string;
}
export const StopRouterOutputRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/routerOutput/stop/{Arn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopRouterOutputRequest",
}) as any as S.Schema<StopRouterOutputRequest>;
export interface StopRouterOutputResponse {
  Arn: string;
  Name: string;
  State: RouterOutputState;
}
export const StopRouterOutputResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String, Name: S.String, State: RouterOutputState }).pipe(
    S.encodeKeys({ Arn: "arn", Name: "name", State: "state" }),
  ),
).annotate({
  identifier: "StopRouterOutputResponse",
}) as any as S.Schema<StopRouterOutputResponse>;
export interface TagGlobalResourceRequest {
  ResourceArn: string;
  Tags?: { [key: string]: string | undefined };
}
export const TagGlobalResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    Tags: S.optional(__mapOfString),
  })
    .pipe(S.encodeKeys({ Tags: "tags" }))
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/tags/global/{ResourceArn}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "TagGlobalResourceRequest",
}) as any as S.Schema<TagGlobalResourceRequest>;
export interface TagGlobalResourceResponse {}
export const TagGlobalResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "TagGlobalResourceResponse",
}) as any as S.Schema<TagGlobalResourceResponse>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags?: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    Tags: S.optional(__mapOfString),
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
export interface TakeRouterInputRequest {
  RouterOutputArn: string;
  RouterInputArn?: string;
}
export const TakeRouterInputRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RouterOutputArn: S.String.pipe(T.HttpLabel("RouterOutputArn")),
    RouterInputArn: S.optional(S.String),
  })
    .pipe(S.encodeKeys({ RouterInputArn: "routerInputArn" }))
    .pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v1/routerOutput/takeRouterInput/{RouterOutputArn}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "TakeRouterInputRequest",
}) as any as S.Schema<TakeRouterInputRequest>;
export interface TakeRouterInputResponse {
  RoutedState: RouterOutputRoutedState;
  RouterOutputArn: string;
  RouterOutputName: string;
  RouterInputArn?: string;
  RouterInputName?: string;
}
export const TakeRouterInputResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RoutedState: RouterOutputRoutedState,
    RouterOutputArn: S.String,
    RouterOutputName: S.String,
    RouterInputArn: S.optional(S.String),
    RouterInputName: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      RoutedState: "routedState",
      RouterOutputArn: "routerOutputArn",
      RouterOutputName: "routerOutputName",
      RouterInputArn: "routerInputArn",
      RouterInputName: "routerInputName",
    }),
  ),
).annotate({
  identifier: "TakeRouterInputResponse",
}) as any as S.Schema<TakeRouterInputResponse>;
export interface UntagGlobalResourceRequest {
  ResourceArn: string;
  TagKeys?: string[];
}
export const UntagGlobalResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    TagKeys: S.optional(__listOfString).pipe(T.HttpQuery("tagKeys")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/tags/global/{ResourceArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UntagGlobalResourceRequest",
}) as any as S.Schema<UntagGlobalResourceRequest>;
export interface UntagGlobalResourceResponse {}
export const UntagGlobalResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UntagGlobalResourceResponse",
}) as any as S.Schema<UntagGlobalResourceResponse>;
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys?: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    TagKeys: S.optional(__listOfString).pipe(T.HttpQuery("tagKeys")),
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
export interface UpdateEgressGatewayBridgeRequest {
  MaxBitrate?: number;
}
export const UpdateEgressGatewayBridgeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MaxBitrate: S.optional(S.Number) }).pipe(
    S.encodeKeys({ MaxBitrate: "maxBitrate" }),
  ),
).annotate({
  identifier: "UpdateEgressGatewayBridgeRequest",
}) as any as S.Schema<UpdateEgressGatewayBridgeRequest>;
export interface UpdateIngressGatewayBridgeRequest {
  MaxBitrate?: number;
  MaxOutputs?: number;
}
export const UpdateIngressGatewayBridgeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxBitrate: S.optional(S.Number),
    MaxOutputs: S.optional(S.Number),
  }).pipe(S.encodeKeys({ MaxBitrate: "maxBitrate", MaxOutputs: "maxOutputs" })),
).annotate({
  identifier: "UpdateIngressGatewayBridgeRequest",
}) as any as S.Schema<UpdateIngressGatewayBridgeRequest>;
export interface UpdateFailoverConfig {
  FailoverMode?: FailoverMode;
  RecoveryWindow?: number;
  SourcePriority?: SourcePriority;
  State?: State;
}
export const UpdateFailoverConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FailoverMode: S.optional(FailoverMode),
    RecoveryWindow: S.optional(S.Number),
    SourcePriority: S.optional(SourcePriority),
    State: S.optional(State),
  }).pipe(
    S.encodeKeys({
      FailoverMode: "failoverMode",
      RecoveryWindow: "recoveryWindow",
      SourcePriority: "sourcePriority",
      State: "state",
    }),
  ),
).annotate({
  identifier: "UpdateFailoverConfig",
}) as any as S.Schema<UpdateFailoverConfig>;
export interface UpdateBridgeRequest {
  BridgeArn: string;
  EgressGatewayBridge?: UpdateEgressGatewayBridgeRequest;
  IngressGatewayBridge?: UpdateIngressGatewayBridgeRequest;
  SourceFailoverConfig?: UpdateFailoverConfig;
}
export const UpdateBridgeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BridgeArn: S.String.pipe(T.HttpLabel("BridgeArn")),
    EgressGatewayBridge: S.optional(UpdateEgressGatewayBridgeRequest),
    IngressGatewayBridge: S.optional(UpdateIngressGatewayBridgeRequest),
    SourceFailoverConfig: S.optional(UpdateFailoverConfig),
  })
    .pipe(
      S.encodeKeys({
        EgressGatewayBridge: "egressGatewayBridge",
        IngressGatewayBridge: "ingressGatewayBridge",
        SourceFailoverConfig: "sourceFailoverConfig",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/v1/bridges/{BridgeArn}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateBridgeRequest",
}) as any as S.Schema<UpdateBridgeRequest>;
export interface UpdateBridgeResponse {
  Bridge?: Bridge & {
    BridgeArn: string;
    BridgeState: BridgeState;
    Name: string;
    PlacementArn: string;
    BridgeMessages: (MessageDetail & { Code: string; Message: string })[];
    EgressGatewayBridge: EgressGatewayBridge & { MaxBitrate: number };
    IngressGatewayBridge: IngressGatewayBridge & {
      MaxBitrate: number;
      MaxOutputs: number;
    };
    Outputs: (BridgeOutput & {
      FlowOutput: BridgeFlowOutput & {
        FlowArn: string;
        FlowSourceArn: string;
        Name: string;
      };
      NetworkOutput: BridgeNetworkOutput & {
        IpAddress: string;
        Name: string;
        NetworkName: string;
        Port: number;
        Protocol: Protocol;
        Ttl: number;
      };
    })[];
    Sources: (BridgeSource & {
      FlowSource: BridgeFlowSource & { FlowArn: string; Name: string };
      NetworkSource: BridgeNetworkSource & {
        MulticastIp: string;
        Name: string;
        NetworkName: string;
        Port: number;
        Protocol: Protocol;
      };
    })[];
  };
}
export const UpdateBridgeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Bridge: S.optional(Bridge) }).pipe(
    S.encodeKeys({ Bridge: "bridge" }),
  ),
).annotate({
  identifier: "UpdateBridgeResponse",
}) as any as S.Schema<UpdateBridgeResponse>;
export interface UpdateBridgeNetworkOutputRequest {
  IpAddress?: string;
  NetworkName?: string;
  Port?: number;
  Protocol?: Protocol;
  Ttl?: number;
}
export const UpdateBridgeNetworkOutputRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IpAddress: S.optional(S.String),
    NetworkName: S.optional(S.String),
    Port: S.optional(S.Number),
    Protocol: S.optional(Protocol),
    Ttl: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      IpAddress: "ipAddress",
      NetworkName: "networkName",
      Port: "port",
      Protocol: "protocol",
      Ttl: "ttl",
    }),
  ),
).annotate({
  identifier: "UpdateBridgeNetworkOutputRequest",
}) as any as S.Schema<UpdateBridgeNetworkOutputRequest>;
export interface UpdateBridgeOutputRequest {
  BridgeArn: string;
  NetworkOutput?: UpdateBridgeNetworkOutputRequest;
  OutputName: string;
}
export const UpdateBridgeOutputRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BridgeArn: S.String.pipe(T.HttpLabel("BridgeArn")),
    NetworkOutput: S.optional(UpdateBridgeNetworkOutputRequest),
    OutputName: S.String.pipe(T.HttpLabel("OutputName")),
  })
    .pipe(S.encodeKeys({ NetworkOutput: "networkOutput" }))
    .pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v1/bridges/{BridgeArn}/outputs/{OutputName}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateBridgeOutputRequest",
}) as any as S.Schema<UpdateBridgeOutputRequest>;
export interface UpdateBridgeOutputResponse {
  BridgeArn?: string;
  Output?: BridgeOutput & {
    FlowOutput: BridgeFlowOutput & {
      FlowArn: string;
      FlowSourceArn: string;
      Name: string;
    };
    NetworkOutput: BridgeNetworkOutput & {
      IpAddress: string;
      Name: string;
      NetworkName: string;
      Port: number;
      Protocol: Protocol;
      Ttl: number;
    };
  };
}
export const UpdateBridgeOutputResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BridgeArn: S.optional(S.String),
    Output: S.optional(BridgeOutput),
  }).pipe(S.encodeKeys({ BridgeArn: "bridgeArn", Output: "output" })),
).annotate({
  identifier: "UpdateBridgeOutputResponse",
}) as any as S.Schema<UpdateBridgeOutputResponse>;
export interface UpdateBridgeFlowSourceRequest {
  FlowArn?: string;
  FlowVpcInterfaceAttachment?: VpcInterfaceAttachment;
}
export const UpdateBridgeFlowSourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FlowArn: S.optional(S.String),
    FlowVpcInterfaceAttachment: S.optional(VpcInterfaceAttachment),
  }).pipe(
    S.encodeKeys({
      FlowArn: "flowArn",
      FlowVpcInterfaceAttachment: "flowVpcInterfaceAttachment",
    }),
  ),
).annotate({
  identifier: "UpdateBridgeFlowSourceRequest",
}) as any as S.Schema<UpdateBridgeFlowSourceRequest>;
export interface UpdateBridgeNetworkSourceRequest {
  MulticastIp?: string;
  MulticastSourceSettings?: MulticastSourceSettings;
  NetworkName?: string;
  Port?: number;
  Protocol?: Protocol;
}
export const UpdateBridgeNetworkSourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MulticastIp: S.optional(S.String),
    MulticastSourceSettings: S.optional(MulticastSourceSettings),
    NetworkName: S.optional(S.String),
    Port: S.optional(S.Number),
    Protocol: S.optional(Protocol),
  }).pipe(
    S.encodeKeys({
      MulticastIp: "multicastIp",
      MulticastSourceSettings: "multicastSourceSettings",
      NetworkName: "networkName",
      Port: "port",
      Protocol: "protocol",
    }),
  ),
).annotate({
  identifier: "UpdateBridgeNetworkSourceRequest",
}) as any as S.Schema<UpdateBridgeNetworkSourceRequest>;
export interface UpdateBridgeSourceRequest {
  BridgeArn: string;
  FlowSource?: UpdateBridgeFlowSourceRequest;
  NetworkSource?: UpdateBridgeNetworkSourceRequest;
  SourceName: string;
}
export const UpdateBridgeSourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BridgeArn: S.String.pipe(T.HttpLabel("BridgeArn")),
    FlowSource: S.optional(UpdateBridgeFlowSourceRequest),
    NetworkSource: S.optional(UpdateBridgeNetworkSourceRequest),
    SourceName: S.String.pipe(T.HttpLabel("SourceName")),
  })
    .pipe(
      S.encodeKeys({
        FlowSource: "flowSource",
        NetworkSource: "networkSource",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v1/bridges/{BridgeArn}/sources/{SourceName}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateBridgeSourceRequest",
}) as any as S.Schema<UpdateBridgeSourceRequest>;
export interface UpdateBridgeSourceResponse {
  BridgeArn?: string;
  Source?: BridgeSource & {
    FlowSource: BridgeFlowSource & { FlowArn: string; Name: string };
    NetworkSource: BridgeNetworkSource & {
      MulticastIp: string;
      Name: string;
      NetworkName: string;
      Port: number;
      Protocol: Protocol;
    };
  };
}
export const UpdateBridgeSourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BridgeArn: S.optional(S.String),
    Source: S.optional(BridgeSource),
  }).pipe(S.encodeKeys({ BridgeArn: "bridgeArn", Source: "source" })),
).annotate({
  identifier: "UpdateBridgeSourceResponse",
}) as any as S.Schema<UpdateBridgeSourceResponse>;
export type DesiredState = "ACTIVE" | "STANDBY" | "DELETED" | (string & {});
export const DesiredState = /*@__PURE__*/ S.String;

export interface UpdateBridgeStateRequest {
  BridgeArn: string;
  DesiredState?: DesiredState;
}
export const UpdateBridgeStateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BridgeArn: S.String.pipe(T.HttpLabel("BridgeArn")),
    DesiredState: S.optional(DesiredState),
  })
    .pipe(S.encodeKeys({ DesiredState: "desiredState" }))
    .pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/v1/bridges/{BridgeArn}/state" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateBridgeStateRequest",
}) as any as S.Schema<UpdateBridgeStateRequest>;
export interface UpdateBridgeStateResponse {
  BridgeArn?: string;
  DesiredState?: DesiredState;
}
export const UpdateBridgeStateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BridgeArn: S.optional(S.String),
    DesiredState: S.optional(DesiredState),
  }).pipe(
    S.encodeKeys({ BridgeArn: "bridgeArn", DesiredState: "desiredState" }),
  ),
).annotate({
  identifier: "UpdateBridgeStateResponse",
}) as any as S.Schema<UpdateBridgeStateResponse>;
export interface UpdateMaintenance {
  MaintenanceDay?: MaintenanceDay;
  MaintenanceScheduledDate?: string;
  MaintenanceStartHour?: string;
}
export const UpdateMaintenance = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaintenanceDay: S.optional(MaintenanceDay),
    MaintenanceScheduledDate: S.optional(S.String),
    MaintenanceStartHour: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      MaintenanceDay: "maintenanceDay",
      MaintenanceScheduledDate: "maintenanceScheduledDate",
      MaintenanceStartHour: "maintenanceStartHour",
    }),
  ),
).annotate({
  identifier: "UpdateMaintenance",
}) as any as S.Schema<UpdateMaintenance>;
export interface UpdateFlowRequest {
  FlowArn: string;
  SourceFailoverConfig?: UpdateFailoverConfig;
  Maintenance?: UpdateMaintenance;
  SourceMonitoringConfig?: MonitoringConfig;
  NdiConfig?: NdiConfig;
  FlowSize?: FlowSize;
  EncodingConfig?: EncodingConfig;
}
export const UpdateFlowRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FlowArn: S.String.pipe(T.HttpLabel("FlowArn")),
    SourceFailoverConfig: S.optional(UpdateFailoverConfig),
    Maintenance: S.optional(UpdateMaintenance),
    SourceMonitoringConfig: S.optional(MonitoringConfig),
    NdiConfig: S.optional(NdiConfig),
    FlowSize: S.optional(FlowSize),
    EncodingConfig: S.optional(EncodingConfig),
  })
    .pipe(
      S.encodeKeys({
        SourceFailoverConfig: "sourceFailoverConfig",
        Maintenance: "maintenance",
        SourceMonitoringConfig: "sourceMonitoringConfig",
        NdiConfig: "ndiConfig",
        FlowSize: "flowSize",
        EncodingConfig: "encodingConfig",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/v1/flows/{FlowArn}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateFlowRequest",
}) as any as S.Schema<UpdateFlowRequest>;
export interface UpdateFlowResponse {
  Flow?: Flow & {
    AvailabilityZone: string;
    Entitlements: (Entitlement & {
      EntitlementArn: string;
      Name: string;
      Subscribers: __listOfString;
      Encryption: Encryption & { RoleArn: string };
    })[];
    FlowArn: string;
    Name: string;
    Outputs: (Output & {
      Name: string;
      OutputArn: string;
      Encryption: Encryption & { RoleArn: string };
      MediaStreamOutputConfigurations: (MediaStreamOutputConfiguration & {
        EncodingName: EncodingName;
        MediaStreamName: string;
        DestinationConfigurations: (DestinationConfiguration & {
          DestinationIp: string;
          DestinationPort: number;
          Interface: Interface & { Name: string };
          OutboundIp: string;
        })[];
        EncodingParameters: EncodingParameters & {
          CompressionFactor: number;
          EncoderProfile: EncoderProfile;
        };
      })[];
      Transport: Transport & { Protocol: Protocol };
    })[];
    Source: Source & {
      Name: string;
      SourceArn: string;
      Decryption: Encryption & { RoleArn: string };
      MediaStreamSourceConfigurations: (MediaStreamSourceConfiguration & {
        EncodingName: EncodingName;
        MediaStreamName: string;
        InputConfigurations: (InputConfiguration & {
          InputIp: string;
          InputPort: number;
          Interface: Interface & { Name: string };
        })[];
      })[];
      Transport: Transport & { Protocol: Protocol };
      GatewayBridgeSource: GatewayBridgeSource & { BridgeArn: string };
    };
    Status: Status;
    MediaStreams: (MediaStream & {
      Fmt: number;
      MediaStreamId: number;
      MediaStreamName: string;
      MediaStreamType: MediaStreamType;
      Attributes: MediaStreamAttributes & { Fmtp: Fmtp };
    })[];
    Sources: (Source & {
      Name: string;
      SourceArn: string;
      Decryption: Encryption & { RoleArn: string };
      MediaStreamSourceConfigurations: (MediaStreamSourceConfiguration & {
        EncodingName: EncodingName;
        MediaStreamName: string;
        InputConfigurations: (InputConfiguration & {
          InputIp: string;
          InputPort: number;
          Interface: Interface & { Name: string };
        })[];
      })[];
      Transport: Transport & { Protocol: Protocol };
      GatewayBridgeSource: GatewayBridgeSource & { BridgeArn: string };
    })[];
    VpcInterfaces: (VpcInterface & {
      Name: string;
      NetworkInterfaceIds: __listOfString;
      NetworkInterfaceType: NetworkInterfaceType;
      RoleArn: string;
      SecurityGroupIds: __listOfString;
      SubnetId: string;
    })[];
    NdiConfig: NdiConfig & {
      NdiDiscoveryServers: (NdiDiscoveryServerConfig & {
        DiscoveryServerAddress: string;
        VpcInterfaceAdapter: string;
      })[];
    };
  };
}
export const UpdateFlowResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Flow: S.optional(Flow) }).pipe(S.encodeKeys({ Flow: "flow" })),
).annotate({
  identifier: "UpdateFlowResponse",
}) as any as S.Schema<UpdateFlowResponse>;
export interface UpdateEncryption {
  Algorithm?: Algorithm;
  ConstantInitializationVector?: string;
  DeviceId?: string;
  KeyType?: KeyType;
  Region?: string;
  ResourceId?: string;
  RoleArn?: string;
  SecretArn?: string;
  Url?: string;
}
export const UpdateEncryption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Algorithm: S.optional(Algorithm),
    ConstantInitializationVector: S.optional(S.String),
    DeviceId: S.optional(S.String),
    KeyType: S.optional(KeyType),
    Region: S.optional(S.String),
    ResourceId: S.optional(S.String),
    RoleArn: S.optional(S.String),
    SecretArn: S.optional(S.String),
    Url: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      Algorithm: "algorithm",
      ConstantInitializationVector: "constantInitializationVector",
      DeviceId: "deviceId",
      KeyType: "keyType",
      Region: "region",
      ResourceId: "resourceId",
      RoleArn: "roleArn",
      SecretArn: "secretArn",
      Url: "url",
    }),
  ),
).annotate({
  identifier: "UpdateEncryption",
}) as any as S.Schema<UpdateEncryption>;
export interface UpdateFlowEntitlementRequest {
  Description?: string;
  Encryption?: UpdateEncryption;
  EntitlementArn: string;
  EntitlementStatus?: EntitlementStatus;
  FlowArn: string;
  Subscribers?: string[];
}
export const UpdateFlowEntitlementRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    Encryption: S.optional(UpdateEncryption),
    EntitlementArn: S.String.pipe(T.HttpLabel("EntitlementArn")),
    EntitlementStatus: S.optional(EntitlementStatus),
    FlowArn: S.String.pipe(T.HttpLabel("FlowArn")),
    Subscribers: S.optional(__listOfString),
  })
    .pipe(
      S.encodeKeys({
        Description: "description",
        Encryption: "encryption",
        EntitlementStatus: "entitlementStatus",
        Subscribers: "subscribers",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v1/flows/{FlowArn}/entitlements/{EntitlementArn}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateFlowEntitlementRequest",
}) as any as S.Schema<UpdateFlowEntitlementRequest>;
export interface UpdateFlowEntitlementResponse {
  Entitlement?: Entitlement & {
    EntitlementArn: string;
    Name: string;
    Subscribers: __listOfString;
    Encryption: Encryption & { RoleArn: string };
  };
  FlowArn?: string;
}
export const UpdateFlowEntitlementResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Entitlement: S.optional(Entitlement),
    FlowArn: S.optional(S.String),
  }).pipe(S.encodeKeys({ Entitlement: "entitlement", FlowArn: "flowArn" })),
).annotate({
  identifier: "UpdateFlowEntitlementResponse",
}) as any as S.Schema<UpdateFlowEntitlementResponse>;
export interface UpdateFlowMediaStreamRequest {
  Attributes?: MediaStreamAttributesRequest;
  ClockRate?: number;
  Description?: string;
  FlowArn: string;
  MediaStreamName: string;
  MediaStreamType?: MediaStreamType;
  VideoFormat?: string;
}
export const UpdateFlowMediaStreamRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Attributes: S.optional(MediaStreamAttributesRequest),
    ClockRate: S.optional(S.Number),
    Description: S.optional(S.String),
    FlowArn: S.String.pipe(T.HttpLabel("FlowArn")),
    MediaStreamName: S.String.pipe(T.HttpLabel("MediaStreamName")),
    MediaStreamType: S.optional(MediaStreamType),
    VideoFormat: S.optional(S.String),
  })
    .pipe(
      S.encodeKeys({
        Attributes: "attributes",
        ClockRate: "clockRate",
        Description: "description",
        MediaStreamType: "mediaStreamType",
        VideoFormat: "videoFormat",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v1/flows/{FlowArn}/mediaStreams/{MediaStreamName}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateFlowMediaStreamRequest",
}) as any as S.Schema<UpdateFlowMediaStreamRequest>;
export interface UpdateFlowMediaStreamResponse {
  FlowArn?: string;
  MediaStream?: MediaStream & {
    Fmt: number;
    MediaStreamId: number;
    MediaStreamName: string;
    MediaStreamType: MediaStreamType;
    Attributes: MediaStreamAttributes & { Fmtp: Fmtp };
  };
}
export const UpdateFlowMediaStreamResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FlowArn: S.optional(S.String),
    MediaStream: S.optional(MediaStream),
  }).pipe(S.encodeKeys({ FlowArn: "flowArn", MediaStream: "mediaStream" })),
).annotate({
  identifier: "UpdateFlowMediaStreamResponse",
}) as any as S.Schema<UpdateFlowMediaStreamResponse>;
export interface UpdateFlowOutputRequest {
  CidrAllowList?: string[];
  Description?: string;
  Destination?: string;
  Encryption?: UpdateEncryption;
  FlowArn: string;
  MaxLatency?: number;
  MediaStreamOutputConfigurations?: MediaStreamOutputConfigurationRequest[];
  MinLatency?: number;
  OutputArn: string;
  Port?: number;
  Protocol?: Protocol;
  RemoteId?: string;
  SenderControlPort?: number;
  SenderIpAddress?: string;
  SmoothingLatency?: number;
  StreamId?: string;
  VpcInterfaceAttachment?: VpcInterfaceAttachment;
  OutputStatus?: OutputStatus;
  NdiProgramName?: string;
  NdiSpeedHqQuality?: number;
  RouterIntegrationState?: State;
  RouterIntegrationTransitEncryption?: FlowTransitEncryption;
  NdiOutputTimecodeSource?: NdiOutputTimecodeSource;
}
export const UpdateFlowOutputRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CidrAllowList: S.optional(__listOfString),
    Description: S.optional(S.String),
    Destination: S.optional(S.String),
    Encryption: S.optional(UpdateEncryption),
    FlowArn: S.String.pipe(T.HttpLabel("FlowArn")),
    MaxLatency: S.optional(S.Number),
    MediaStreamOutputConfigurations: S.optional(
      __listOfMediaStreamOutputConfigurationRequest,
    ),
    MinLatency: S.optional(S.Number),
    OutputArn: S.String.pipe(T.HttpLabel("OutputArn")),
    Port: S.optional(S.Number),
    Protocol: S.optional(Protocol),
    RemoteId: S.optional(S.String),
    SenderControlPort: S.optional(S.Number),
    SenderIpAddress: S.optional(S.String),
    SmoothingLatency: S.optional(S.Number),
    StreamId: S.optional(S.String),
    VpcInterfaceAttachment: S.optional(VpcInterfaceAttachment),
    OutputStatus: S.optional(OutputStatus),
    NdiProgramName: S.optional(S.String),
    NdiSpeedHqQuality: S.optional(S.Number),
    RouterIntegrationState: S.optional(State),
    RouterIntegrationTransitEncryption: S.optional(FlowTransitEncryption),
    NdiOutputTimecodeSource: S.optional(NdiOutputTimecodeSource),
  })
    .pipe(
      S.encodeKeys({
        CidrAllowList: "cidrAllowList",
        Description: "description",
        Destination: "destination",
        Encryption: "encryption",
        MaxLatency: "maxLatency",
        MediaStreamOutputConfigurations: "mediaStreamOutputConfigurations",
        MinLatency: "minLatency",
        Port: "port",
        Protocol: "protocol",
        RemoteId: "remoteId",
        SenderControlPort: "senderControlPort",
        SenderIpAddress: "senderIpAddress",
        SmoothingLatency: "smoothingLatency",
        StreamId: "streamId",
        VpcInterfaceAttachment: "vpcInterfaceAttachment",
        OutputStatus: "outputStatus",
        NdiProgramName: "ndiProgramName",
        NdiSpeedHqQuality: "ndiSpeedHqQuality",
        RouterIntegrationState: "routerIntegrationState",
        RouterIntegrationTransitEncryption:
          "routerIntegrationTransitEncryption",
        NdiOutputTimecodeSource: "ndiOutputTimecodeSource",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v1/flows/{FlowArn}/outputs/{OutputArn}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateFlowOutputRequest",
}) as any as S.Schema<UpdateFlowOutputRequest>;
export interface UpdateFlowOutputResponse {
  FlowArn?: string;
  Output?: Output & {
    Name: string;
    OutputArn: string;
    Encryption: Encryption & { RoleArn: string };
    MediaStreamOutputConfigurations: (MediaStreamOutputConfiguration & {
      EncodingName: EncodingName;
      MediaStreamName: string;
      DestinationConfigurations: (DestinationConfiguration & {
        DestinationIp: string;
        DestinationPort: number;
        Interface: Interface & { Name: string };
        OutboundIp: string;
      })[];
      EncodingParameters: EncodingParameters & {
        CompressionFactor: number;
        EncoderProfile: EncoderProfile;
      };
    })[];
    Transport: Transport & { Protocol: Protocol };
  };
}
export const UpdateFlowOutputResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FlowArn: S.optional(S.String), Output: S.optional(Output) }).pipe(
    S.encodeKeys({ FlowArn: "flowArn", Output: "output" }),
  ),
).annotate({
  identifier: "UpdateFlowOutputResponse",
}) as any as S.Schema<UpdateFlowOutputResponse>;
export interface UpdateGatewayBridgeSourceRequest {
  BridgeArn?: string;
  VpcInterfaceAttachment?: VpcInterfaceAttachment;
}
export const UpdateGatewayBridgeSourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BridgeArn: S.optional(S.String),
    VpcInterfaceAttachment: S.optional(VpcInterfaceAttachment),
  }).pipe(
    S.encodeKeys({
      BridgeArn: "bridgeArn",
      VpcInterfaceAttachment: "vpcInterfaceAttachment",
    }),
  ),
).annotate({
  identifier: "UpdateGatewayBridgeSourceRequest",
}) as any as S.Schema<UpdateGatewayBridgeSourceRequest>;
export interface UpdateFlowSourceRequest {
  Decryption?: UpdateEncryption;
  Description?: string;
  EntitlementArn?: string;
  FlowArn: string;
  IngestPort?: number;
  MaxBitrate?: number;
  MaxLatency?: number;
  MaxSyncBuffer?: number;
  MediaStreamSourceConfigurations?: MediaStreamSourceConfigurationRequest[];
  MinLatency?: number;
  Protocol?: Protocol;
  SenderControlPort?: number;
  SenderIpAddress?: string;
  SourceArn: string;
  SourceListenerAddress?: string;
  SourceListenerPort?: number;
  StreamId?: string;
  VpcInterfaceName?: string;
  WhitelistCidr?: string;
  GatewayBridgeSource?: UpdateGatewayBridgeSourceRequest;
  NdiSourceSettings?: NdiSourceSettings;
  RouterIntegrationState?: State;
  RouterIntegrationTransitDecryption?: FlowTransitEncryption;
}
export const UpdateFlowSourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Decryption: S.optional(UpdateEncryption),
    Description: S.optional(S.String),
    EntitlementArn: S.optional(S.String),
    FlowArn: S.String.pipe(T.HttpLabel("FlowArn")),
    IngestPort: S.optional(S.Number),
    MaxBitrate: S.optional(S.Number),
    MaxLatency: S.optional(S.Number),
    MaxSyncBuffer: S.optional(S.Number),
    MediaStreamSourceConfigurations: S.optional(
      __listOfMediaStreamSourceConfigurationRequest,
    ),
    MinLatency: S.optional(S.Number),
    Protocol: S.optional(Protocol),
    SenderControlPort: S.optional(S.Number),
    SenderIpAddress: S.optional(S.String),
    SourceArn: S.String.pipe(T.HttpLabel("SourceArn")),
    SourceListenerAddress: S.optional(S.String),
    SourceListenerPort: S.optional(S.Number),
    StreamId: S.optional(S.String),
    VpcInterfaceName: S.optional(S.String),
    WhitelistCidr: S.optional(S.String),
    GatewayBridgeSource: S.optional(UpdateGatewayBridgeSourceRequest),
    NdiSourceSettings: S.optional(NdiSourceSettings),
    RouterIntegrationState: S.optional(State),
    RouterIntegrationTransitDecryption: S.optional(FlowTransitEncryption),
  })
    .pipe(
      S.encodeKeys({
        Decryption: "decryption",
        Description: "description",
        EntitlementArn: "entitlementArn",
        IngestPort: "ingestPort",
        MaxBitrate: "maxBitrate",
        MaxLatency: "maxLatency",
        MaxSyncBuffer: "maxSyncBuffer",
        MediaStreamSourceConfigurations: "mediaStreamSourceConfigurations",
        MinLatency: "minLatency",
        Protocol: "protocol",
        SenderControlPort: "senderControlPort",
        SenderIpAddress: "senderIpAddress",
        SourceListenerAddress: "sourceListenerAddress",
        SourceListenerPort: "sourceListenerPort",
        StreamId: "streamId",
        VpcInterfaceName: "vpcInterfaceName",
        WhitelistCidr: "whitelistCidr",
        GatewayBridgeSource: "gatewayBridgeSource",
        NdiSourceSettings: "ndiSourceSettings",
        RouterIntegrationState: "routerIntegrationState",
        RouterIntegrationTransitDecryption:
          "routerIntegrationTransitDecryption",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v1/flows/{FlowArn}/source/{SourceArn}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateFlowSourceRequest",
}) as any as S.Schema<UpdateFlowSourceRequest>;
export interface UpdateFlowSourceResponse {
  FlowArn?: string;
  Source?: Source & {
    Name: string;
    SourceArn: string;
    Decryption: Encryption & { RoleArn: string };
    MediaStreamSourceConfigurations: (MediaStreamSourceConfiguration & {
      EncodingName: EncodingName;
      MediaStreamName: string;
      InputConfigurations: (InputConfiguration & {
        InputIp: string;
        InputPort: number;
        Interface: Interface & { Name: string };
      })[];
    })[];
    Transport: Transport & { Protocol: Protocol };
    GatewayBridgeSource: GatewayBridgeSource & { BridgeArn: string };
  };
}
export const UpdateFlowSourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FlowArn: S.optional(S.String), Source: S.optional(Source) }).pipe(
    S.encodeKeys({ FlowArn: "flowArn", Source: "source" }),
  ),
).annotate({
  identifier: "UpdateFlowSourceResponse",
}) as any as S.Schema<UpdateFlowSourceResponse>;
export interface UpdateGatewayInstanceRequest {
  BridgePlacement?: BridgePlacement;
  GatewayInstanceArn: string;
}
export const UpdateGatewayInstanceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BridgePlacement: S.optional(BridgePlacement),
    GatewayInstanceArn: S.String.pipe(T.HttpLabel("GatewayInstanceArn")),
  })
    .pipe(S.encodeKeys({ BridgePlacement: "bridgePlacement" }))
    .pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v1/gateway-instances/{GatewayInstanceArn}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateGatewayInstanceRequest",
}) as any as S.Schema<UpdateGatewayInstanceRequest>;
export interface UpdateGatewayInstanceResponse {
  BridgePlacement?: BridgePlacement;
  GatewayInstanceArn?: string;
}
export const UpdateGatewayInstanceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BridgePlacement: S.optional(BridgePlacement),
    GatewayInstanceArn: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      BridgePlacement: "bridgePlacement",
      GatewayInstanceArn: "gatewayInstanceArn",
    }),
  ),
).annotate({
  identifier: "UpdateGatewayInstanceResponse",
}) as any as S.Schema<UpdateGatewayInstanceResponse>;
export interface UpdateRouterInputRequest {
  Arn: string;
  Name?: string;
  Configuration?: RouterInputConfiguration;
  MaximumBitrate?: number;
  RoutingScope?: RoutingScope;
  Tier?: RouterInputTier;
  TransitEncryption?: RouterInputTransitEncryption;
  MaintenanceConfiguration?: MaintenanceConfiguration;
  ContentQualityAnalysisConfiguration?: RouterContentQualityAnalysisConfiguration;
}
export const UpdateRouterInputRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String.pipe(T.HttpLabel("Arn")),
    Name: S.optional(S.String),
    Configuration: S.optional(RouterInputConfiguration),
    MaximumBitrate: S.optional(S.Number),
    RoutingScope: S.optional(RoutingScope),
    Tier: S.optional(RouterInputTier),
    TransitEncryption: S.optional(RouterInputTransitEncryption),
    MaintenanceConfiguration: S.optional(MaintenanceConfiguration),
    ContentQualityAnalysisConfiguration: S.optional(
      RouterContentQualityAnalysisConfiguration,
    ),
  })
    .pipe(
      S.encodeKeys({
        Name: "name",
        Configuration: "configuration",
        MaximumBitrate: "maximumBitrate",
        RoutingScope: "routingScope",
        Tier: "tier",
        TransitEncryption: "transitEncryption",
        MaintenanceConfiguration: "maintenanceConfiguration",
        ContentQualityAnalysisConfiguration:
          "contentQualityAnalysisConfiguration",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/v1/routerInput/{Arn}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateRouterInputRequest",
}) as any as S.Schema<UpdateRouterInputRequest>;
export interface UpdateRouterInputResponse {
  RouterInput: RouterInput & {
    ContentQualityAnalysisType: RouterContentQualityAnalysisType;
    ContentQualityAnalysisConfiguration: RouterContentQualityAnalysisConfiguration;
  };
}
export const UpdateRouterInputResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RouterInput: RouterInput }).pipe(
    S.encodeKeys({ RouterInput: "routerInput" }),
  ),
).annotate({
  identifier: "UpdateRouterInputResponse",
}) as any as S.Schema<UpdateRouterInputResponse>;
export interface UpdateRouterNetworkInterfaceRequest {
  Arn: string;
  Name?: string;
  Configuration?: RouterNetworkInterfaceConfiguration;
}
export const UpdateRouterNetworkInterfaceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String.pipe(T.HttpLabel("Arn")),
    Name: S.optional(S.String),
    Configuration: S.optional(RouterNetworkInterfaceConfiguration),
  })
    .pipe(S.encodeKeys({ Name: "name", Configuration: "configuration" }))
    .pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/v1/routerNetworkInterface/{Arn}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateRouterNetworkInterfaceRequest",
}) as any as S.Schema<UpdateRouterNetworkInterfaceRequest>;
export interface UpdateRouterNetworkInterfaceResponse {
  RouterNetworkInterface: RouterNetworkInterface;
}
export const UpdateRouterNetworkInterfaceResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ RouterNetworkInterface: RouterNetworkInterface }).pipe(
      S.encodeKeys({ RouterNetworkInterface: "routerNetworkInterface" }),
    ),
).annotate({
  identifier: "UpdateRouterNetworkInterfaceResponse",
}) as any as S.Schema<UpdateRouterNetworkInterfaceResponse>;
export interface UpdateRouterOutputRequest {
  Arn: string;
  Name?: string;
  Configuration?: RouterOutputConfiguration;
  MaximumBitrate?: number;
  RoutingScope?: RoutingScope;
  Tier?: RouterOutputTier;
  MaintenanceConfiguration?: MaintenanceConfiguration;
}
export const UpdateRouterOutputRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String.pipe(T.HttpLabel("Arn")),
    Name: S.optional(S.String),
    Configuration: S.optional(RouterOutputConfiguration),
    MaximumBitrate: S.optional(S.Number),
    RoutingScope: S.optional(RoutingScope),
    Tier: S.optional(RouterOutputTier),
    MaintenanceConfiguration: S.optional(MaintenanceConfiguration),
  })
    .pipe(
      S.encodeKeys({
        Name: "name",
        Configuration: "configuration",
        MaximumBitrate: "maximumBitrate",
        RoutingScope: "routingScope",
        Tier: "tier",
        MaintenanceConfiguration: "maintenanceConfiguration",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/v1/routerOutput/{Arn}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateRouterOutputRequest",
}) as any as S.Schema<UpdateRouterOutputRequest>;
export interface UpdateRouterOutputResponse {
  RouterOutput: RouterOutput;
}
export const UpdateRouterOutputResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RouterOutput: RouterOutput }).pipe(
    S.encodeKeys({ RouterOutput: "routerOutput" }),
  ),
).annotate({
  identifier: "UpdateRouterOutputResponse",
}) as any as S.Schema<UpdateRouterOutputResponse>;
export type AddBridgeOutputsError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Adds outputs to an existing bridge.
 */
export const addBridgeOutputs: API.OperationMethod<
  AddBridgeOutputsRequest,
  AddBridgeOutputsResponse,
  AddBridgeOutputsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AddBridgeOutputsRequest,
  output: AddBridgeOutputsResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddBridgeOutputs",
}));

export type AddBridgeSourcesError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Adds sources to an existing bridge.
 */
export const addBridgeSources: API.OperationMethod<
  AddBridgeSourcesRequest,
  AddBridgeSourcesResponse,
  AddBridgeSourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AddBridgeSourcesRequest,
  output: AddBridgeSourcesResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddBridgeSources",
}));

export type AddFlowMediaStreamsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Adds media streams to an existing flow. After you add a media stream to a flow, you can associate it with a source and/or an output that uses the ST 2110 JPEG XS or CDI protocol.
 */
export const addFlowMediaStreams: API.OperationMethod<
  AddFlowMediaStreamsRequest,
  AddFlowMediaStreamsResponse,
  AddFlowMediaStreamsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AddFlowMediaStreamsRequest,
  output: AddFlowMediaStreamsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddFlowMediaStreams",
}));

export type AddFlowOutputsError =
  | AddFlowOutputs420Exception
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Adds outputs to an existing flow. You can create up to 50 outputs per flow.
 */
export const addFlowOutputs: API.OperationMethod<
  AddFlowOutputsRequest,
  AddFlowOutputsResponse,
  AddFlowOutputsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AddFlowOutputsRequest,
  output: AddFlowOutputsResponse,
  errors: [
    AddFlowOutputs420Exception,
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddFlowOutputs",
}));

export type AddFlowSourcesError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Adds sources to a flow.
 */
export const addFlowSources: API.OperationMethod<
  AddFlowSourcesRequest,
  AddFlowSourcesResponse,
  AddFlowSourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AddFlowSourcesRequest,
  output: AddFlowSourcesResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddFlowSources",
}));

export type AddFlowVpcInterfacesError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Adds VPC interfaces to a flow.
 */
export const addFlowVpcInterfaces: API.OperationMethod<
  AddFlowVpcInterfacesRequest,
  AddFlowVpcInterfacesResponse,
  AddFlowVpcInterfacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AddFlowVpcInterfacesRequest,
  output: AddFlowVpcInterfacesResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddFlowVpcInterfaces",
}));

export type BatchGetRouterInputError =
  | BadRequestException
  | ConflictException
  | InternalServerErrorException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about multiple router inputs in AWS Elemental MediaConnect.
 */
export const batchGetRouterInput: API.OperationMethod<
  BatchGetRouterInputRequest,
  BatchGetRouterInputResponse,
  BatchGetRouterInputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetRouterInputRequest,
  output: BatchGetRouterInputResponse,
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetRouterInput",
}));

export type BatchGetRouterNetworkInterfaceError =
  | BadRequestException
  | ConflictException
  | InternalServerErrorException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about multiple router network interfaces in AWS Elemental MediaConnect.
 */
export const batchGetRouterNetworkInterface: API.OperationMethod<
  BatchGetRouterNetworkInterfaceRequest,
  BatchGetRouterNetworkInterfaceResponse,
  BatchGetRouterNetworkInterfaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetRouterNetworkInterfaceRequest,
  output: BatchGetRouterNetworkInterfaceResponse,
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetRouterNetworkInterface",
}));

export type BatchGetRouterOutputError =
  | BadRequestException
  | ConflictException
  | InternalServerErrorException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about multiple router outputs in AWS Elemental MediaConnect.
 */
export const batchGetRouterOutput: API.OperationMethod<
  BatchGetRouterOutputRequest,
  BatchGetRouterOutputResponse,
  BatchGetRouterOutputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetRouterOutputRequest,
  output: BatchGetRouterOutputResponse,
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetRouterOutput",
}));

export type CreateBridgeError =
  | BadRequestException
  | ConflictException
  | CreateBridge420Exception
  | ForbiddenException
  | InternalServerErrorException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new bridge. The request must include one source.
 */
export const createBridge: API.OperationMethod<
  CreateBridgeRequest,
  CreateBridgeResponse,
  CreateBridgeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateBridgeRequest,
  output: CreateBridgeResponse,
  errors: [
    BadRequestException,
    ConflictException,
    CreateBridge420Exception,
    ForbiddenException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBridge",
}));

export type CreateFlowError =
  | BadRequestException
  | CreateFlow420Exception
  | ForbiddenException
  | InternalServerErrorException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new flow. The request must include one source. The request optionally can include outputs (up to 50) and entitlements (up to 50).
 */
export const createFlow: API.OperationMethod<
  CreateFlowRequest,
  CreateFlowResponse,
  CreateFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateFlowRequest,
  output: CreateFlowResponse,
  errors: [
    BadRequestException,
    CreateFlow420Exception,
    ForbiddenException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFlow",
}));

export type CreateGatewayError =
  | BadRequestException
  | ConflictException
  | CreateGateway420Exception
  | ForbiddenException
  | InternalServerErrorException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new gateway. The request must include at least one network (up to four).
 */
export const createGateway: API.OperationMethod<
  CreateGatewayRequest,
  CreateGatewayResponse,
  CreateGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateGatewayRequest,
  output: CreateGatewayResponse,
  errors: [
    BadRequestException,
    ConflictException,
    CreateGateway420Exception,
    ForbiddenException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGateway",
}));

export type CreateRouterInputError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | RouterInputServiceQuotaExceededException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new router input in AWS Elemental MediaConnect.
 */
export const createRouterInput: API.OperationMethod<
  CreateRouterInputRequest,
  CreateRouterInputResponse,
  CreateRouterInputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRouterInputRequest,
  output: CreateRouterInputResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    RouterInputServiceQuotaExceededException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRouterInput",
}));

export type CreateRouterNetworkInterfaceError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | RouterNetworkInterfaceServiceQuotaExceededException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new router network interface in AWS Elemental MediaConnect.
 */
export const createRouterNetworkInterface: API.OperationMethod<
  CreateRouterNetworkInterfaceRequest,
  CreateRouterNetworkInterfaceResponse,
  CreateRouterNetworkInterfaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRouterNetworkInterfaceRequest,
  output: CreateRouterNetworkInterfaceResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    RouterNetworkInterfaceServiceQuotaExceededException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRouterNetworkInterface",
}));

export type CreateRouterOutputError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | RouterOutputServiceQuotaExceededException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new router output in AWS Elemental MediaConnect.
 */
export const createRouterOutput: API.OperationMethod<
  CreateRouterOutputRequest,
  CreateRouterOutputResponse,
  CreateRouterOutputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRouterOutputRequest,
  output: CreateRouterOutputResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    RouterOutputServiceQuotaExceededException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRouterOutput",
}));

export type DeleteBridgeError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a bridge. Before you can delete a bridge, you must stop the bridge.
 */
export const deleteBridge: API.OperationMethod<
  DeleteBridgeRequest,
  DeleteBridgeResponse,
  DeleteBridgeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteBridgeRequest,
  output: DeleteBridgeResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBridge",
}));

export type DeleteFlowError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a flow. Before you can delete a flow, you must stop the flow.
 */
export const deleteFlow: API.OperationMethod<
  DeleteFlowRequest,
  DeleteFlowResponse,
  DeleteFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteFlowRequest,
  output: DeleteFlowResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFlow",
}));

export type DeleteGatewayError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a gateway. Before you can delete a gateway, you must deregister its instances and delete its bridges.
 */
export const deleteGateway: API.OperationMethod<
  DeleteGatewayRequest,
  DeleteGatewayResponse,
  DeleteGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteGatewayRequest,
  output: DeleteGatewayResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGateway",
}));

export type DeleteRouterInputError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a router input from AWS Elemental MediaConnect.
 */
export const deleteRouterInput: API.OperationMethod<
  DeleteRouterInputRequest,
  DeleteRouterInputResponse,
  DeleteRouterInputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRouterInputRequest,
  output: DeleteRouterInputResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRouterInput",
}));

export type DeleteRouterNetworkInterfaceError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a router network interface from AWS Elemental MediaConnect.
 */
export const deleteRouterNetworkInterface: API.OperationMethod<
  DeleteRouterNetworkInterfaceRequest,
  DeleteRouterNetworkInterfaceResponse,
  DeleteRouterNetworkInterfaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRouterNetworkInterfaceRequest,
  output: DeleteRouterNetworkInterfaceResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRouterNetworkInterface",
}));

export type DeleteRouterOutputError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a router output from AWS Elemental MediaConnect.
 */
export const deleteRouterOutput: API.OperationMethod<
  DeleteRouterOutputRequest,
  DeleteRouterOutputResponse,
  DeleteRouterOutputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRouterOutputRequest,
  output: DeleteRouterOutputResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRouterOutput",
}));

export type DeregisterGatewayInstanceError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deregisters an instance. Before you deregister an instance, all bridges running on the instance must be stopped. If you want to deregister an instance without stopping the bridges, you must use the --force option.
 */
export const deregisterGatewayInstance: API.OperationMethod<
  DeregisterGatewayInstanceRequest,
  DeregisterGatewayInstanceResponse,
  DeregisterGatewayInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeregisterGatewayInstanceRequest,
  output: DeregisterGatewayInstanceResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterGatewayInstance",
}));

export type DescribeBridgeError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Displays the details of a bridge.
 */
export const describeBridge: API.OperationMethod<
  DescribeBridgeRequest,
  DescribeBridgeResponse,
  DescribeBridgeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeBridgeRequest,
  output: DescribeBridgeResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBridge",
}));

export type DescribeFlowError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Displays the details of a flow. The response includes the flow Amazon Resource Name (ARN), name, and Availability Zone, as well as details about the source, outputs, and entitlements.
 */
export const describeFlow: API.OperationMethod<
  DescribeFlowRequest,
  DescribeFlowResponse,
  DescribeFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeFlowRequest,
  output: DescribeFlowResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFlow",
}));

export type DescribeFlowSourceMetadataError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * The `DescribeFlowSourceMetadata` API is used to view information about the flow's source transport stream and programs. This API displays status messages about the flow's source as well as details about the program's video, audio, and other data.
 */
export const describeFlowSourceMetadata: API.OperationMethod<
  DescribeFlowSourceMetadataRequest,
  DescribeFlowSourceMetadataResponse,
  DescribeFlowSourceMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeFlowSourceMetadataRequest,
  output: DescribeFlowSourceMetadataResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFlowSourceMetadata",
}));

export type DescribeFlowSourceThumbnailError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Describes the thumbnail for the flow source.
 */
export const describeFlowSourceThumbnail: API.OperationMethod<
  DescribeFlowSourceThumbnailRequest,
  DescribeFlowSourceThumbnailResponse,
  DescribeFlowSourceThumbnailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeFlowSourceThumbnailRequest,
  output: DescribeFlowSourceThumbnailResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFlowSourceThumbnail",
}));

export type DescribeGatewayError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Displays the details of a gateway. The response includes the gateway Amazon Resource Name (ARN), name, and CIDR blocks, as well as details about the networks.
 */
export const describeGateway: API.OperationMethod<
  DescribeGatewayRequest,
  DescribeGatewayResponse,
  DescribeGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeGatewayRequest,
  output: DescribeGatewayResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGateway",
}));

export type DescribeGatewayInstanceError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Displays the details of an instance.
 */
export const describeGatewayInstance: API.OperationMethod<
  DescribeGatewayInstanceRequest,
  DescribeGatewayInstanceResponse,
  DescribeGatewayInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeGatewayInstanceRequest,
  output: DescribeGatewayInstanceResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGatewayInstance",
}));

export type DescribeOfferingError =
  | BadRequestException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Displays the details of an offering. The response includes the offering description, duration, outbound bandwidth, price, and Amazon Resource Name (ARN).
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
    BadRequestException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeOffering",
}));

export type DescribeReservationError =
  | BadRequestException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Displays the details of a reservation. The response includes the reservation name, state, start date and time, and the details of the offering that make up the rest of the reservation (such as price, duration, and outbound bandwidth).
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
    BadRequestException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReservation",
}));

export type GetRouterInputError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about a specific router input in AWS Elemental MediaConnect.
 */
export const getRouterInput: API.OperationMethod<
  GetRouterInputRequest,
  GetRouterInputResponse,
  GetRouterInputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRouterInputRequest,
  output: GetRouterInputResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRouterInput",
}));

export type GetRouterInputSourceMetadataError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves detailed metadata information about a specific router input source, including stream details and connection state.
 */
export const getRouterInputSourceMetadata: API.OperationMethod<
  GetRouterInputSourceMetadataRequest,
  GetRouterInputSourceMetadataResponse,
  GetRouterInputSourceMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRouterInputSourceMetadataRequest,
  output: GetRouterInputSourceMetadataResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRouterInputSourceMetadata",
}));

export type GetRouterInputThumbnailError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the thumbnail for a router input in AWS Elemental MediaConnect.
 */
export const getRouterInputThumbnail: API.OperationMethod<
  GetRouterInputThumbnailRequest,
  GetRouterInputThumbnailResponse,
  GetRouterInputThumbnailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRouterInputThumbnailRequest,
  output: GetRouterInputThumbnailResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRouterInputThumbnail",
}));

export type GetRouterNetworkInterfaceError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about a specific router network interface in AWS Elemental MediaConnect.
 */
export const getRouterNetworkInterface: API.OperationMethod<
  GetRouterNetworkInterfaceRequest,
  GetRouterNetworkInterfaceResponse,
  GetRouterNetworkInterfaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRouterNetworkInterfaceRequest,
  output: GetRouterNetworkInterfaceResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRouterNetworkInterface",
}));

export type GetRouterOutputError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about a specific router output in AWS Elemental MediaConnect.
 */
export const getRouterOutput: API.OperationMethod<
  GetRouterOutputRequest,
  GetRouterOutputResponse,
  GetRouterOutputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRouterOutputRequest,
  output: GetRouterOutputResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRouterOutput",
}));

export type GrantFlowEntitlementsError =
  | BadRequestException
  | ForbiddenException
  | GrantFlowEntitlements420Exception
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Grants entitlements to an existing flow.
 */
export const grantFlowEntitlements: API.OperationMethod<
  GrantFlowEntitlementsRequest,
  GrantFlowEntitlementsResponse,
  GrantFlowEntitlementsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GrantFlowEntitlementsRequest,
  output: GrantFlowEntitlementsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    GrantFlowEntitlements420Exception,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GrantFlowEntitlements",
}));

export type ListBridgesError =
  | BadRequestException
  | ConflictException
  | InternalServerErrorException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Displays a list of bridges that are associated with this account and an optionally specified Amazon Resource Name (ARN). This request returns a paginated result.
 */
export const listBridges: API.PaginatedOperationMethod<
  ListBridgesRequest,
  ListBridgesResponse,
  ListBridgesError,
  Credentials | HttpClient.HttpClient,
  ListedBridge
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListBridgesRequest,
  output: ListBridgesResponse,
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBridges",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Bridges",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListEntitlementsError =
  | BadRequestException
  | InternalServerErrorException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Displays a list of all entitlements that have been granted to this account. This request returns 20 results per page.
 */
export const listEntitlements: API.PaginatedOperationMethod<
  ListEntitlementsRequest,
  ListEntitlementsResponse,
  ListEntitlementsError,
  Credentials | HttpClient.HttpClient,
  ListedEntitlement
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEntitlementsRequest,
  output: ListEntitlementsResponse,
  errors: [
    BadRequestException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEntitlements",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Entitlements",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListFlowsError =
  | BadRequestException
  | InternalServerErrorException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Displays a list of flows that are associated with this account. This request returns a paginated result.
 */
export const listFlows: API.PaginatedOperationMethod<
  ListFlowsRequest,
  ListFlowsResponse,
  ListFlowsError,
  Credentials | HttpClient.HttpClient,
  ListedFlow
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListFlowsRequest,
  output: ListFlowsResponse,
  errors: [
    BadRequestException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFlows",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Flows",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListGatewayInstancesError =
  | BadRequestException
  | ConflictException
  | InternalServerErrorException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Displays a list of instances associated with the Amazon Web Services account. This request returns a paginated result. You can use the filterArn property to display only the instances associated with the selected Gateway Amazon Resource Name (ARN).
 */
export const listGatewayInstances: API.PaginatedOperationMethod<
  ListGatewayInstancesRequest,
  ListGatewayInstancesResponse,
  ListGatewayInstancesError,
  Credentials | HttpClient.HttpClient,
  ListedGatewayInstance
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListGatewayInstancesRequest,
  output: ListGatewayInstancesResponse,
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGatewayInstances",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Instances",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListGatewaysError =
  | BadRequestException
  | ConflictException
  | InternalServerErrorException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Displays a list of gateways that are associated with this account. This request returns a paginated result.
 */
export const listGateways: API.PaginatedOperationMethod<
  ListGatewaysRequest,
  ListGatewaysResponse,
  ListGatewaysError,
  Credentials | HttpClient.HttpClient,
  ListedGateway
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListGatewaysRequest,
  output: ListGatewaysResponse,
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGateways",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Gateways",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListOfferingsError =
  | BadRequestException
  | InternalServerErrorException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Displays a list of all offerings that are available to this account in the current Amazon Web Services Region. If you have an active reservation (which means you've purchased an offering that has already started and hasn't expired yet), your account isn't eligible for other offerings.
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
    BadRequestException,
    InternalServerErrorException,
    ServiceUnavailableException,
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
  | BadRequestException
  | InternalServerErrorException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Displays a list of all reservations that have been purchased by this account in the current Amazon Web Services Region. This list includes all reservations in all states (such as active and expired).
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
    BadRequestException,
    InternalServerErrorException,
    ServiceUnavailableException,
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

export type ListRouterInputsError =
  | BadRequestException
  | ConflictException
  | InternalServerErrorException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves a list of router inputs in AWS Elemental MediaConnect.
 */
export const listRouterInputs: API.PaginatedOperationMethod<
  ListRouterInputsRequest,
  ListRouterInputsResponse,
  ListRouterInputsError,
  Credentials | HttpClient.HttpClient,
  ListedRouterInput
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRouterInputsRequest,
  output: ListRouterInputsResponse,
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRouterInputs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RouterInputs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRouterNetworkInterfacesError =
  | BadRequestException
  | ConflictException
  | InternalServerErrorException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves a list of router network interfaces in AWS Elemental MediaConnect.
 */
export const listRouterNetworkInterfaces: API.PaginatedOperationMethod<
  ListRouterNetworkInterfacesRequest,
  ListRouterNetworkInterfacesResponse,
  ListRouterNetworkInterfacesError,
  Credentials | HttpClient.HttpClient,
  ListedRouterNetworkInterface
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRouterNetworkInterfacesRequest,
  output: ListRouterNetworkInterfacesResponse,
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRouterNetworkInterfaces",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RouterNetworkInterfaces",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRouterOutputsError =
  | BadRequestException
  | ConflictException
  | InternalServerErrorException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves a list of router outputs in AWS Elemental MediaConnect.
 */
export const listRouterOutputs: API.PaginatedOperationMethod<
  ListRouterOutputsRequest,
  ListRouterOutputsResponse,
  ListRouterOutputsError,
  Credentials | HttpClient.HttpClient,
  ListedRouterOutput
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRouterOutputsRequest,
  output: ListRouterOutputsResponse,
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRouterOutputs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RouterOutputs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForGlobalResourceError =
  | BadRequestException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Lists the tags associated with a global resource in AWS Elemental MediaConnect. The API supports the following global resources: router inputs, router outputs and router network interfaces.
 */
export const listTagsForGlobalResource: API.OperationMethod<
  ListTagsForGlobalResourceRequest,
  ListTagsForGlobalResourceResponse,
  ListTagsForGlobalResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForGlobalResourceRequest,
  output: ListTagsForGlobalResourceResponse,
  errors: [
    BadRequestException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForGlobalResource",
}));

export type ListTagsForResourceError =
  | BadRequestException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * List all tags on a MediaConnect resource in the current region.
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
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type PurchaseOfferingError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Submits a request to purchase an offering. If you already have an active reservation, you can't purchase another offering.
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
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PurchaseOffering",
}));

export type RemoveBridgeOutputError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes an output from a bridge.
 */
export const removeBridgeOutput: API.OperationMethod<
  RemoveBridgeOutputRequest,
  RemoveBridgeOutputResponse,
  RemoveBridgeOutputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RemoveBridgeOutputRequest,
  output: RemoveBridgeOutputResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveBridgeOutput",
}));

export type RemoveBridgeSourceError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes a source from a bridge.
 */
export const removeBridgeSource: API.OperationMethod<
  RemoveBridgeSourceRequest,
  RemoveBridgeSourceResponse,
  RemoveBridgeSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RemoveBridgeSourceRequest,
  output: RemoveBridgeSourceResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveBridgeSource",
}));

export type RemoveFlowMediaStreamError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes a media stream from a flow. This action is only available if the media stream is not associated with a source or output.
 */
export const removeFlowMediaStream: API.OperationMethod<
  RemoveFlowMediaStreamRequest,
  RemoveFlowMediaStreamResponse,
  RemoveFlowMediaStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RemoveFlowMediaStreamRequest,
  output: RemoveFlowMediaStreamResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveFlowMediaStream",
}));

export type RemoveFlowOutputError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes an output from an existing flow. This request can be made only on an output that does not have an entitlement associated with it. If the output has an entitlement, you must revoke the entitlement instead. When an entitlement is revoked from a flow, the service automatically removes the associated output.
 */
export const removeFlowOutput: API.OperationMethod<
  RemoveFlowOutputRequest,
  RemoveFlowOutputResponse,
  RemoveFlowOutputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RemoveFlowOutputRequest,
  output: RemoveFlowOutputResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveFlowOutput",
}));

export type RemoveFlowSourceError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes a source from an existing flow. This request can be made only if there is more than one source on the flow.
 */
export const removeFlowSource: API.OperationMethod<
  RemoveFlowSourceRequest,
  RemoveFlowSourceResponse,
  RemoveFlowSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RemoveFlowSourceRequest,
  output: RemoveFlowSourceResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveFlowSource",
}));

export type RemoveFlowVpcInterfaceError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes a VPC Interface from an existing flow. This request can be made only on a VPC interface that does not have a Source or Output associated with it. If the VPC interface is referenced by a Source or Output, you must first delete or update the Source or Output to no longer reference the VPC interface.
 */
export const removeFlowVpcInterface: API.OperationMethod<
  RemoveFlowVpcInterfaceRequest,
  RemoveFlowVpcInterfaceResponse,
  RemoveFlowVpcInterfaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RemoveFlowVpcInterfaceRequest,
  output: RemoveFlowVpcInterfaceResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveFlowVpcInterface",
}));

export type RestartRouterInputError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Restarts a router input. This operation can be used to recover from errors or refresh the input state.
 */
export const restartRouterInput: API.OperationMethod<
  RestartRouterInputRequest,
  RestartRouterInputResponse,
  RestartRouterInputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RestartRouterInputRequest,
  output: RestartRouterInputResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestartRouterInput",
}));

export type RestartRouterOutputError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Restarts a router output. This operation can be used to recover from errors or refresh the output state.
 */
export const restartRouterOutput: API.OperationMethod<
  RestartRouterOutputRequest,
  RestartRouterOutputResponse,
  RestartRouterOutputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RestartRouterOutputRequest,
  output: RestartRouterOutputResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestartRouterOutput",
}));

export type RevokeFlowEntitlementError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Revokes an entitlement from a flow. Once an entitlement is revoked, the content becomes unavailable to the subscriber and the associated output is removed.
 */
export const revokeFlowEntitlement: API.OperationMethod<
  RevokeFlowEntitlementRequest,
  RevokeFlowEntitlementResponse,
  RevokeFlowEntitlementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RevokeFlowEntitlementRequest,
  output: RevokeFlowEntitlementResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RevokeFlowEntitlement",
}));

export type StartFlowError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Starts a flow.
 */
export const startFlow: API.OperationMethod<
  StartFlowRequest,
  StartFlowResponse,
  StartFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartFlowRequest,
  output: StartFlowResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartFlow",
}));

export type StartRouterInputError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Starts a router input in AWS Elemental MediaConnect.
 */
export const startRouterInput: API.OperationMethod<
  StartRouterInputRequest,
  StartRouterInputResponse,
  StartRouterInputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartRouterInputRequest,
  output: StartRouterInputResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartRouterInput",
}));

export type StartRouterOutputError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Starts a router output in AWS Elemental MediaConnect.
 */
export const startRouterOutput: API.OperationMethod<
  StartRouterOutputRequest,
  StartRouterOutputResponse,
  StartRouterOutputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartRouterOutputRequest,
  output: StartRouterOutputResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartRouterOutput",
}));

export type StopFlowError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Stops a flow.
 */
export const stopFlow: API.OperationMethod<
  StopFlowRequest,
  StopFlowResponse,
  StopFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopFlowRequest,
  output: StopFlowResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopFlow",
}));

export type StopRouterInputError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Stops a router input in AWS Elemental MediaConnect.
 */
export const stopRouterInput: API.OperationMethod<
  StopRouterInputRequest,
  StopRouterInputResponse,
  StopRouterInputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopRouterInputRequest,
  output: StopRouterInputResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopRouterInput",
}));

export type StopRouterOutputError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Stops a router output in AWS Elemental MediaConnect.
 */
export const stopRouterOutput: API.OperationMethod<
  StopRouterOutputRequest,
  StopRouterOutputResponse,
  StopRouterOutputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopRouterOutputRequest,
  output: StopRouterOutputResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopRouterOutput",
}));

export type TagGlobalResourceError =
  | BadRequestException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Adds tags to a global resource in AWS Elemental MediaConnect. The API supports the following global resources: router inputs, router outputs and router network interfaces.
 */
export const tagGlobalResource: API.OperationMethod<
  TagGlobalResourceRequest,
  TagGlobalResourceResponse,
  TagGlobalResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagGlobalResourceRequest,
  output: TagGlobalResourceResponse,
  errors: [
    BadRequestException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagGlobalResource",
}));

export type TagResourceError =
  | BadRequestException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Associates the specified tags to a resource with the specified `resourceArn` in the current region. If existing tags on a resource are not specified in the request parameters, they are not changed. When a resource is deleted, the tags associated with that resource are deleted as well.
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
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type TakeRouterInputError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Associates a router input with a router output in AWS Elemental MediaConnect.
 */
export const takeRouterInput: API.OperationMethod<
  TakeRouterInputRequest,
  TakeRouterInputResponse,
  TakeRouterInputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TakeRouterInputRequest,
  output: TakeRouterInputResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TakeRouterInput",
}));

export type UntagGlobalResourceError =
  | BadRequestException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Removes tags from a global resource in AWS Elemental MediaConnect. The API supports the following global resources: router inputs, router outputs and router network interfaces.
 */
export const untagGlobalResource: API.OperationMethod<
  UntagGlobalResourceRequest,
  UntagGlobalResourceResponse,
  UntagGlobalResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagGlobalResourceRequest,
  output: UntagGlobalResourceResponse,
  errors: [
    BadRequestException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagGlobalResource",
}));

export type UntagResourceError =
  | BadRequestException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Deletes specified tags from a resource in the current region.
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
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateBridgeError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the bridge.
 */
export const updateBridge: API.OperationMethod<
  UpdateBridgeRequest,
  UpdateBridgeResponse,
  UpdateBridgeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateBridgeRequest,
  output: UpdateBridgeResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBridge",
}));

export type UpdateBridgeOutputError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an existing bridge output.
 */
export const updateBridgeOutput: API.OperationMethod<
  UpdateBridgeOutputRequest,
  UpdateBridgeOutputResponse,
  UpdateBridgeOutputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateBridgeOutputRequest,
  output: UpdateBridgeOutputResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBridgeOutput",
}));

export type UpdateBridgeSourceError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an existing bridge source.
 */
export const updateBridgeSource: API.OperationMethod<
  UpdateBridgeSourceRequest,
  UpdateBridgeSourceResponse,
  UpdateBridgeSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateBridgeSourceRequest,
  output: UpdateBridgeSourceResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBridgeSource",
}));

export type UpdateBridgeStateError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the bridge state.
 */
export const updateBridgeState: API.OperationMethod<
  UpdateBridgeStateRequest,
  UpdateBridgeStateResponse,
  UpdateBridgeStateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateBridgeStateRequest,
  output: UpdateBridgeStateResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBridgeState",
}));

export type UpdateFlowError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an existing flow.
 *
 * Because `UpdateFlowSources` and `UpdateFlow` are separate operations, you can't change both the source type AND the flow size in a single request.
 *
 * - If you have a `MEDIUM` flow and you want to change the flow source to NDI®:
 *
 * - First, use the `UpdateFlow` operation to upgrade the flow size to `LARGE`.
 *
 * - After that, you can then use the `UpdateFlowSource` operation to configure the NDI source.
 *
 * - If you're switching from an NDI source to a transport stream (TS) source and want to downgrade the flow size:
 *
 * - First, use the `UpdateFlowSource` operation to change the flow source type.
 *
 * - After that, you can then use the `UpdateFlow` operation to downgrade the flow size to `MEDIUM`.
 */
export const updateFlow: API.OperationMethod<
  UpdateFlowRequest,
  UpdateFlowResponse,
  UpdateFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateFlowRequest,
  output: UpdateFlowResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFlow",
}));

export type UpdateFlowEntitlementError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an entitlement. You can change an entitlement's description, subscribers, and encryption. If you change the subscribers, the service will remove the outputs that are are used by the subscribers that are removed.
 */
export const updateFlowEntitlement: API.OperationMethod<
  UpdateFlowEntitlementRequest,
  UpdateFlowEntitlementResponse,
  UpdateFlowEntitlementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateFlowEntitlementRequest,
  output: UpdateFlowEntitlementResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFlowEntitlement",
}));

export type UpdateFlowMediaStreamError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an existing media stream.
 */
export const updateFlowMediaStream: API.OperationMethod<
  UpdateFlowMediaStreamRequest,
  UpdateFlowMediaStreamResponse,
  UpdateFlowMediaStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateFlowMediaStreamRequest,
  output: UpdateFlowMediaStreamResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFlowMediaStream",
}));

export type UpdateFlowOutputError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an existing flow output.
 */
export const updateFlowOutput: API.OperationMethod<
  UpdateFlowOutputRequest,
  UpdateFlowOutputResponse,
  UpdateFlowOutputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateFlowOutputRequest,
  output: UpdateFlowOutputResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFlowOutput",
}));

export type UpdateFlowSourceError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the source of a flow.
 *
 * Because `UpdateFlowSources` and `UpdateFlow` are separate operations, you can't change both the source type AND the flow size in a single request.
 *
 * - If you have a `MEDIUM` flow and you want to change the flow source to NDI®:
 *
 * - First, use the `UpdateFlow` operation to upgrade the flow size to `LARGE`.
 *
 * - After that, you can then use the `UpdateFlowSource` operation to configure the NDI source.
 *
 * - If you're switching from an NDI source to a transport stream (TS) source and want to downgrade the flow size:
 *
 * - First, use the `UpdateFlowSource` operation to change the flow source type.
 *
 * - After that, you can then use the `UpdateFlow` operation to downgrade the flow size to `MEDIUM`.
 */
export const updateFlowSource: API.OperationMethod<
  UpdateFlowSourceRequest,
  UpdateFlowSourceResponse,
  UpdateFlowSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateFlowSourceRequest,
  output: UpdateFlowSourceResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFlowSource",
}));

export type UpdateGatewayInstanceError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an existing gateway instance.
 */
export const updateGatewayInstance: API.OperationMethod<
  UpdateGatewayInstanceRequest,
  UpdateGatewayInstanceResponse,
  UpdateGatewayInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateGatewayInstanceRequest,
  output: UpdateGatewayInstanceResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGatewayInstance",
}));

export type UpdateRouterInputError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the configuration of an existing router input in AWS Elemental MediaConnect.
 */
export const updateRouterInput: API.OperationMethod<
  UpdateRouterInputRequest,
  UpdateRouterInputResponse,
  UpdateRouterInputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRouterInputRequest,
  output: UpdateRouterInputResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRouterInput",
}));

export type UpdateRouterNetworkInterfaceError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the configuration of an existing router network interface in AWS Elemental MediaConnect.
 */
export const updateRouterNetworkInterface: API.OperationMethod<
  UpdateRouterNetworkInterfaceRequest,
  UpdateRouterNetworkInterfaceResponse,
  UpdateRouterNetworkInterfaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRouterNetworkInterfaceRequest,
  output: UpdateRouterNetworkInterfaceResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRouterNetworkInterface",
}));

export type UpdateRouterOutputError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the configuration of an existing router output in AWS Elemental MediaConnect.
 */
export const updateRouterOutput: API.OperationMethod<
  UpdateRouterOutputRequest,
  UpdateRouterOutputResponse,
  UpdateRouterOutputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRouterOutputRequest,
  output: UpdateRouterOutputResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRouterOutput",
}));
