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
  sdkId: "GroundStation",
  serviceShapeName: "GroundStation",
});
const auth = T.AwsAuthSigv4({ name: "groundstation" });
const ver = T.ServiceVersion("2019-05-23");
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
              `https://groundstation-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://groundstation-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://groundstation.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://groundstation.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class DependencyException
  extends /*@__PURE__*/ S.TaggedError<DependencyException>()(
    "DependencyException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      parameterName: S.optional(S.String),
    },
    T.HttpError(531),
  ).pipe(C.withServerError) {}
export class InvalidParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterException>()(
    "InvalidParameterException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      parameterName: S.optional(S.String),
    },
    T.HttpError(431),
  ) {}
export class ResourceInUseException
  extends /*@__PURE__*/ S.TaggedError<ResourceInUseException>()(
    "ResourceInUseException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ResourceLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ResourceLimitExceededException>()(
    "ResourceLimitExceededException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      parameterName: S.optional(S.String),
    },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(434),
  ) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      parameterName: S.optional(S.String),
    },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export type Uuid = string;
export interface CancelContactRequest {
  contactId: string;
}
export const CancelContactRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ contactId: S.String.pipe(T.HttpLabel("contactId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/contact/{contactId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelContactRequest",
}) as any as S.Schema<CancelContactRequest>;
export type VersionId = number;
export interface ContactIdResponse {
  contactId?: string;
  versionId?: number;
}
export const ContactIdResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    contactId: S.optional(S.String),
    versionId: S.optional(S.Number),
  }),
).annotate({
  identifier: "ContactIdResponse",
}) as any as S.Schema<ContactIdResponse>;
export type SafeName = string;
export type FrequencyUnits = "GHz" | "MHz" | "kHz" | (string & {});
export const FrequencyUnits = S.String;

export interface Frequency {
  value: number;
  units: FrequencyUnits;
}
export const Frequency = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ value: S.Number, units: FrequencyUnits }),
).annotate({ identifier: "Frequency" }) as any as S.Schema<Frequency>;
export type BandwidthUnits = "GHz" | "MHz" | "kHz" | (string & {});
export const BandwidthUnits = S.String;

export interface FrequencyBandwidth {
  value: number;
  units: BandwidthUnits;
}
export const FrequencyBandwidth = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ value: S.Number, units: BandwidthUnits }),
).annotate({
  identifier: "FrequencyBandwidth",
}) as any as S.Schema<FrequencyBandwidth>;
export type Polarization = "RIGHT_HAND" | "LEFT_HAND" | "NONE" | (string & {});
export const Polarization = S.String;

export interface SpectrumConfig {
  centerFrequency: Frequency;
  bandwidth: FrequencyBandwidth;
  polarization?: Polarization;
}
export const SpectrumConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    centerFrequency: Frequency,
    bandwidth: FrequencyBandwidth,
    polarization: S.optional(Polarization),
  }),
).annotate({ identifier: "SpectrumConfig" }) as any as S.Schema<SpectrumConfig>;
export interface AntennaDownlinkConfig {
  spectrumConfig: SpectrumConfig;
}
export const AntennaDownlinkConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ spectrumConfig: SpectrumConfig }),
).annotate({
  identifier: "AntennaDownlinkConfig",
}) as any as S.Schema<AntennaDownlinkConfig>;
export type Criticality = "REQUIRED" | "PREFERRED" | "REMOVED" | (string & {});
export const Criticality = S.String;

export interface TrackingConfig {
  autotrack: Criticality;
}
export const TrackingConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ autotrack: Criticality }),
).annotate({ identifier: "TrackingConfig" }) as any as S.Schema<TrackingConfig>;
export interface DataflowEndpointConfig {
  dataflowEndpointName: string;
  dataflowEndpointRegion?: string;
}
export const DataflowEndpointConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dataflowEndpointName: S.String,
    dataflowEndpointRegion: S.optional(S.String),
  }),
).annotate({
  identifier: "DataflowEndpointConfig",
}) as any as S.Schema<DataflowEndpointConfig>;
export type JsonString = string;
export interface DemodulationConfig {
  unvalidatedJSON: string;
}
export const DemodulationConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ unvalidatedJSON: S.String }),
).annotate({
  identifier: "DemodulationConfig",
}) as any as S.Schema<DemodulationConfig>;
export interface DecodeConfig {
  unvalidatedJSON: string;
}
export const DecodeConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ unvalidatedJSON: S.String }),
).annotate({ identifier: "DecodeConfig" }) as any as S.Schema<DecodeConfig>;
export interface AntennaDownlinkDemodDecodeConfig {
  spectrumConfig: SpectrumConfig;
  demodulationConfig: DemodulationConfig;
  decodeConfig: DecodeConfig;
}
export const AntennaDownlinkDemodDecodeConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spectrumConfig: SpectrumConfig,
    demodulationConfig: DemodulationConfig,
    decodeConfig: DecodeConfig,
  }),
).annotate({
  identifier: "AntennaDownlinkDemodDecodeConfig",
}) as any as S.Schema<AntennaDownlinkDemodDecodeConfig>;
export interface UplinkSpectrumConfig {
  centerFrequency: Frequency;
  polarization?: Polarization;
}
export const UplinkSpectrumConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    centerFrequency: Frequency,
    polarization: S.optional(Polarization),
  }),
).annotate({
  identifier: "UplinkSpectrumConfig",
}) as any as S.Schema<UplinkSpectrumConfig>;
export type EirpUnits = "dBW" | (string & {});
export const EirpUnits = S.String;

export interface Eirp {
  value: number;
  units: EirpUnits;
}
export const Eirp = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ value: S.Number, units: EirpUnits }),
).annotate({ identifier: "Eirp" }) as any as S.Schema<Eirp>;
export interface AntennaUplinkConfig {
  transmitDisabled?: boolean;
  spectrumConfig: UplinkSpectrumConfig;
  targetEirp: Eirp;
}
export const AntennaUplinkConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    transmitDisabled: S.optional(S.Boolean),
    spectrumConfig: UplinkSpectrumConfig,
    targetEirp: Eirp,
  }),
).annotate({
  identifier: "AntennaUplinkConfig",
}) as any as S.Schema<AntennaUplinkConfig>;
export type ConfigArn = string;
export interface UplinkEchoConfig {
  enabled: boolean;
  antennaUplinkConfigArn: string;
}
export const UplinkEchoConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ enabled: S.Boolean, antennaUplinkConfigArn: S.String }),
).annotate({
  identifier: "UplinkEchoConfig",
}) as any as S.Schema<UplinkEchoConfig>;
export type BucketArn = string;
export type RoleArn = string;
export type S3KeyPrefix = string;
export interface S3RecordingConfig {
  bucketArn: string;
  roleArn: string;
  prefix?: string;
}
export const S3RecordingConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bucketArn: S.String,
    roleArn: S.String,
    prefix: S.optional(S.String),
  }),
).annotate({
  identifier: "S3RecordingConfig",
}) as any as S.Schema<S3RecordingConfig>;
export type TelemetrySinkType = "KINESIS_DATA_STREAM" | (string & {});
export const TelemetrySinkType = S.String;

export type KinesisDataStreamArn = string;
export interface KinesisDataStreamData {
  kinesisRoleArn: string;
  kinesisDataStreamArn: string;
}
export const KinesisDataStreamData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ kinesisRoleArn: S.String, kinesisDataStreamArn: S.String }),
).annotate({
  identifier: "KinesisDataStreamData",
}) as any as S.Schema<KinesisDataStreamData>;
export type TelemetrySinkData = {
  kinesisDataStreamData: KinesisDataStreamData;
};
export const TelemetrySinkData = /*@__PURE__*/ S.Union([
  S.Struct({ kinesisDataStreamData: KinesisDataStreamData }),
]);
export interface TelemetrySinkConfig {
  telemetrySinkType: TelemetrySinkType;
  telemetrySinkData: TelemetrySinkData;
}
export const TelemetrySinkConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    telemetrySinkType: TelemetrySinkType,
    telemetrySinkData: TelemetrySinkData,
  }),
).annotate({
  identifier: "TelemetrySinkConfig",
}) as any as S.Schema<TelemetrySinkConfig>;
export type ConfigTypeData =
  | {
      antennaDownlinkConfig: AntennaDownlinkConfig;
      trackingConfig?: never;
      dataflowEndpointConfig?: never;
      antennaDownlinkDemodDecodeConfig?: never;
      antennaUplinkConfig?: never;
      uplinkEchoConfig?: never;
      s3RecordingConfig?: never;
      telemetrySinkConfig?: never;
    }
  | {
      antennaDownlinkConfig?: never;
      trackingConfig: TrackingConfig;
      dataflowEndpointConfig?: never;
      antennaDownlinkDemodDecodeConfig?: never;
      antennaUplinkConfig?: never;
      uplinkEchoConfig?: never;
      s3RecordingConfig?: never;
      telemetrySinkConfig?: never;
    }
  | {
      antennaDownlinkConfig?: never;
      trackingConfig?: never;
      dataflowEndpointConfig: DataflowEndpointConfig;
      antennaDownlinkDemodDecodeConfig?: never;
      antennaUplinkConfig?: never;
      uplinkEchoConfig?: never;
      s3RecordingConfig?: never;
      telemetrySinkConfig?: never;
    }
  | {
      antennaDownlinkConfig?: never;
      trackingConfig?: never;
      dataflowEndpointConfig?: never;
      antennaDownlinkDemodDecodeConfig: AntennaDownlinkDemodDecodeConfig;
      antennaUplinkConfig?: never;
      uplinkEchoConfig?: never;
      s3RecordingConfig?: never;
      telemetrySinkConfig?: never;
    }
  | {
      antennaDownlinkConfig?: never;
      trackingConfig?: never;
      dataflowEndpointConfig?: never;
      antennaDownlinkDemodDecodeConfig?: never;
      antennaUplinkConfig: AntennaUplinkConfig;
      uplinkEchoConfig?: never;
      s3RecordingConfig?: never;
      telemetrySinkConfig?: never;
    }
  | {
      antennaDownlinkConfig?: never;
      trackingConfig?: never;
      dataflowEndpointConfig?: never;
      antennaDownlinkDemodDecodeConfig?: never;
      antennaUplinkConfig?: never;
      uplinkEchoConfig: UplinkEchoConfig;
      s3RecordingConfig?: never;
      telemetrySinkConfig?: never;
    }
  | {
      antennaDownlinkConfig?: never;
      trackingConfig?: never;
      dataflowEndpointConfig?: never;
      antennaDownlinkDemodDecodeConfig?: never;
      antennaUplinkConfig?: never;
      uplinkEchoConfig?: never;
      s3RecordingConfig: S3RecordingConfig;
      telemetrySinkConfig?: never;
    }
  | {
      antennaDownlinkConfig?: never;
      trackingConfig?: never;
      dataflowEndpointConfig?: never;
      antennaDownlinkDemodDecodeConfig?: never;
      antennaUplinkConfig?: never;
      uplinkEchoConfig?: never;
      s3RecordingConfig?: never;
      telemetrySinkConfig: TelemetrySinkConfig;
    };
export const ConfigTypeData = /*@__PURE__*/ S.Union([
  S.Struct({ antennaDownlinkConfig: AntennaDownlinkConfig }),
  S.Struct({ trackingConfig: TrackingConfig }),
  S.Struct({ dataflowEndpointConfig: DataflowEndpointConfig }),
  S.Struct({
    antennaDownlinkDemodDecodeConfig: AntennaDownlinkDemodDecodeConfig,
  }),
  S.Struct({ antennaUplinkConfig: AntennaUplinkConfig }),
  S.Struct({ uplinkEchoConfig: UplinkEchoConfig }),
  S.Struct({ s3RecordingConfig: S3RecordingConfig }),
  S.Struct({ telemetrySinkConfig: TelemetrySinkConfig }),
]);
export type TagsMap = { [key: string]: string | undefined };
export const TagsMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateConfigRequest {
  name: string;
  configData: ConfigTypeData;
  tags?: { [key: string]: string | undefined };
}
export const CreateConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    configData: ConfigTypeData,
    tags: S.optional(TagsMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/config" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateConfigRequest",
}) as any as S.Schema<CreateConfigRequest>;
export type ConfigCapabilityType =
  | "antenna-downlink"
  | "antenna-downlink-demod-decode"
  | "tracking"
  | "dataflow-endpoint"
  | "antenna-uplink"
  | "uplink-echo"
  | "s3-recording"
  | "telemetry-sink"
  | (string & {});
export const ConfigCapabilityType = S.String;

export interface ConfigIdResponse {
  configId?: string;
  configType?: ConfigCapabilityType;
  configArn?: string;
}
export const ConfigIdResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configId: S.optional(S.String),
    configType: S.optional(ConfigCapabilityType),
    configArn: S.optional(S.String),
  }),
).annotate({
  identifier: "ConfigIdResponse",
}) as any as S.Schema<ConfigIdResponse>;
export type SubnetList = string[];
export const SubnetList = /*@__PURE__*/ S.Array(S.String);
export type SecurityGroupIdList = string[];
export const SecurityGroupIdList = /*@__PURE__*/ S.Array(S.String);
export interface SecurityDetails {
  subnetIds: string[];
  securityGroupIds: string[];
  roleArn: string;
}
export const SecurityDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    subnetIds: SubnetList,
    securityGroupIds: SecurityGroupIdList,
    roleArn: S.String,
  }),
).annotate({
  identifier: "SecurityDetails",
}) as any as S.Schema<SecurityDetails>;
export interface SocketAddress {
  name: string;
  port: number;
}
export const SocketAddress = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, port: S.Number }),
).annotate({ identifier: "SocketAddress" }) as any as S.Schema<SocketAddress>;
export type EndpointStatus =
  | "created"
  | "creating"
  | "deleted"
  | "deleting"
  | "failed"
  | (string & {});
export const EndpointStatus = S.String;

export interface DataflowEndpoint {
  name?: string;
  address?: SocketAddress;
  status?: EndpointStatus;
  mtu?: number;
}
export const DataflowEndpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    address: S.optional(SocketAddress),
    status: S.optional(EndpointStatus),
    mtu: S.optional(S.Number),
  }),
).annotate({
  identifier: "DataflowEndpoint",
}) as any as S.Schema<DataflowEndpoint>;
export interface ConnectionDetails {
  socketAddress: SocketAddress;
  mtu?: number;
}
export const ConnectionDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ socketAddress: SocketAddress, mtu: S.optional(S.Number) }),
).annotate({
  identifier: "ConnectionDetails",
}) as any as S.Schema<ConnectionDetails>;
export type IpV4Address = string;
export interface IntegerRange {
  minimum: number;
  maximum: number;
}
export const IntegerRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ minimum: S.Number, maximum: S.Number }),
).annotate({ identifier: "IntegerRange" }) as any as S.Schema<IntegerRange>;
export interface RangedSocketAddress {
  name: string;
  portRange: IntegerRange;
}
export const RangedSocketAddress = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, portRange: IntegerRange }),
).annotate({
  identifier: "RangedSocketAddress",
}) as any as S.Schema<RangedSocketAddress>;
export interface RangedConnectionDetails {
  socketAddress: RangedSocketAddress;
  mtu?: number;
}
export const RangedConnectionDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ socketAddress: RangedSocketAddress, mtu: S.optional(S.Number) }),
).annotate({
  identifier: "RangedConnectionDetails",
}) as any as S.Schema<RangedConnectionDetails>;
export type AgentStatus =
  | "SUCCESS"
  | "FAILED"
  | "ACTIVE"
  | "INACTIVE"
  | (string & {});
export const AgentStatus = S.String;

export type AuditResults = "HEALTHY" | "UNHEALTHY" | (string & {});
export const AuditResults = S.String;

export interface AwsGroundStationAgentEndpoint {
  name: string;
  egressAddress: ConnectionDetails;
  ingressAddress: RangedConnectionDetails;
  agentStatus?: AgentStatus;
  auditResults?: AuditResults;
}
export const AwsGroundStationAgentEndpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    egressAddress: ConnectionDetails,
    ingressAddress: RangedConnectionDetails,
    agentStatus: S.optional(AgentStatus),
    auditResults: S.optional(AuditResults),
  }),
).annotate({
  identifier: "AwsGroundStationAgentEndpoint",
}) as any as S.Schema<AwsGroundStationAgentEndpoint>;
export interface UplinkConnectionDetails {
  ingressAddressAndPort: ConnectionDetails;
  agentIpAndPortAddress: RangedConnectionDetails;
}
export const UplinkConnectionDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ingressAddressAndPort: ConnectionDetails,
    agentIpAndPortAddress: RangedConnectionDetails,
  }),
).annotate({
  identifier: "UplinkConnectionDetails",
}) as any as S.Schema<UplinkConnectionDetails>;
export type UplinkDataflowDetails = {
  agentConnectionDetails: UplinkConnectionDetails;
};
export const UplinkDataflowDetails = /*@__PURE__*/ S.Union([
  S.Struct({ agentConnectionDetails: UplinkConnectionDetails }),
]);
export interface UplinkAwsGroundStationAgentEndpointDetails {
  name: string;
  dataflowDetails: UplinkDataflowDetails;
  agentStatus?: AgentStatus;
  auditResults?: AuditResults;
}
export const UplinkAwsGroundStationAgentEndpointDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      name: S.String,
      dataflowDetails: UplinkDataflowDetails,
      agentStatus: S.optional(AgentStatus),
      auditResults: S.optional(AuditResults),
    }),
  ).annotate({
    identifier: "UplinkAwsGroundStationAgentEndpointDetails",
  }) as any as S.Schema<UplinkAwsGroundStationAgentEndpointDetails>;
export interface DownlinkConnectionDetails {
  agentIpAndPortAddress: RangedConnectionDetails;
  egressAddressAndPort: ConnectionDetails;
}
export const DownlinkConnectionDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agentIpAndPortAddress: RangedConnectionDetails,
    egressAddressAndPort: ConnectionDetails,
  }),
).annotate({
  identifier: "DownlinkConnectionDetails",
}) as any as S.Schema<DownlinkConnectionDetails>;
export type DownlinkDataflowDetails = {
  agentConnectionDetails: DownlinkConnectionDetails;
};
export const DownlinkDataflowDetails = /*@__PURE__*/ S.Union([
  S.Struct({ agentConnectionDetails: DownlinkConnectionDetails }),
]);
export interface DownlinkAwsGroundStationAgentEndpointDetails {
  name: string;
  dataflowDetails: DownlinkDataflowDetails;
  agentStatus?: AgentStatus;
  auditResults?: AuditResults;
}
export const DownlinkAwsGroundStationAgentEndpointDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      name: S.String,
      dataflowDetails: DownlinkDataflowDetails,
      agentStatus: S.optional(AgentStatus),
      auditResults: S.optional(AuditResults),
    }),
  ).annotate({
    identifier: "DownlinkAwsGroundStationAgentEndpointDetails",
  }) as any as S.Schema<DownlinkAwsGroundStationAgentEndpointDetails>;
export type CapabilityHealth = "HEALTHY" | "UNHEALTHY" | (string & {});
export const CapabilityHealth = S.String;

export type CapabilityHealthReason =
  | "NO_REGISTERED_AGENT"
  | "INVALID_IP_OWNERSHIP"
  | "NOT_AUTHORIZED_TO_CREATE_SLR"
  | "UNVERIFIED_IP_OWNERSHIP"
  | "INITIALIZING_DATAPLANE"
  | "DATAPLANE_FAILURE"
  | "HEALTHY"
  | (string & {});
export const CapabilityHealthReason = S.String;

export type CapabilityHealthReasonList = CapabilityHealthReason[];
export const CapabilityHealthReasonList = /*@__PURE__*/ S.Array(
  CapabilityHealthReason,
);
export interface EndpointDetails {
  securityDetails?: SecurityDetails;
  endpoint?: DataflowEndpoint;
  awsGroundStationAgentEndpoint?: AwsGroundStationAgentEndpoint;
  uplinkAwsGroundStationAgentEndpoint?: UplinkAwsGroundStationAgentEndpointDetails;
  downlinkAwsGroundStationAgentEndpoint?: DownlinkAwsGroundStationAgentEndpointDetails;
  healthStatus?: CapabilityHealth;
  healthReasons?: CapabilityHealthReason[];
}
export const EndpointDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    securityDetails: S.optional(SecurityDetails),
    endpoint: S.optional(DataflowEndpoint),
    awsGroundStationAgentEndpoint: S.optional(AwsGroundStationAgentEndpoint),
    uplinkAwsGroundStationAgentEndpoint: S.optional(
      UplinkAwsGroundStationAgentEndpointDetails,
    ),
    downlinkAwsGroundStationAgentEndpoint: S.optional(
      DownlinkAwsGroundStationAgentEndpointDetails,
    ),
    healthStatus: S.optional(CapabilityHealth),
    healthReasons: S.optional(CapabilityHealthReasonList),
  }),
).annotate({
  identifier: "EndpointDetails",
}) as any as S.Schema<EndpointDetails>;
export type EndpointDetailsList = EndpointDetails[];
export const EndpointDetailsList = /*@__PURE__*/ S.Array(EndpointDetails);
export type DataflowEndpointGroupDurationInSeconds = number;
export interface CreateDataflowEndpointGroupRequest {
  endpointDetails: EndpointDetails[];
  tags?: { [key: string]: string | undefined };
  contactPrePassDurationSeconds?: number;
  contactPostPassDurationSeconds?: number;
}
export const CreateDataflowEndpointGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    endpointDetails: EndpointDetailsList,
    tags: S.optional(TagsMap),
    contactPrePassDurationSeconds: S.optional(S.Number),
    contactPostPassDurationSeconds: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/dataflowEndpointGroup" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDataflowEndpointGroupRequest",
}) as any as S.Schema<CreateDataflowEndpointGroupRequest>;
export interface DataflowEndpointGroupIdResponse {
  dataflowEndpointGroupId?: string;
}
export const DataflowEndpointGroupIdResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ dataflowEndpointGroupId: S.optional(S.String) }),
).annotate({
  identifier: "DataflowEndpointGroupIdResponse",
}) as any as S.Schema<DataflowEndpointGroupIdResponse>;
export interface UplinkAwsGroundStationAgentEndpoint {
  name: string;
  dataflowDetails: UplinkDataflowDetails;
}
export const UplinkAwsGroundStationAgentEndpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, dataflowDetails: UplinkDataflowDetails }),
).annotate({
  identifier: "UplinkAwsGroundStationAgentEndpoint",
}) as any as S.Schema<UplinkAwsGroundStationAgentEndpoint>;
export interface DownlinkAwsGroundStationAgentEndpoint {
  name: string;
  dataflowDetails: DownlinkDataflowDetails;
}
export const DownlinkAwsGroundStationAgentEndpoint = /*@__PURE__*/ S.suspend(
  () => S.Struct({ name: S.String, dataflowDetails: DownlinkDataflowDetails }),
).annotate({
  identifier: "DownlinkAwsGroundStationAgentEndpoint",
}) as any as S.Schema<DownlinkAwsGroundStationAgentEndpoint>;
export type CreateEndpointDetails =
  | {
      uplinkAwsGroundStationAgentEndpoint: UplinkAwsGroundStationAgentEndpoint;
      downlinkAwsGroundStationAgentEndpoint?: never;
    }
  | {
      uplinkAwsGroundStationAgentEndpoint?: never;
      downlinkAwsGroundStationAgentEndpoint: DownlinkAwsGroundStationAgentEndpoint;
    };
export const CreateEndpointDetails = /*@__PURE__*/ S.Union([
  S.Struct({
    uplinkAwsGroundStationAgentEndpoint: UplinkAwsGroundStationAgentEndpoint,
  }),
  S.Struct({
    downlinkAwsGroundStationAgentEndpoint:
      DownlinkAwsGroundStationAgentEndpoint,
  }),
]);
export type CreateEndpointDetailsList = CreateEndpointDetails[];
export const CreateEndpointDetailsList = /*@__PURE__*/ S.Array(
  CreateEndpointDetails,
);
export interface CreateDataflowEndpointGroupV2Request {
  endpoints: CreateEndpointDetails[];
  contactPrePassDurationSeconds?: number;
  contactPostPassDurationSeconds?: number;
  tags?: { [key: string]: string | undefined };
}
export const CreateDataflowEndpointGroupV2Request = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      endpoints: CreateEndpointDetailsList,
      contactPrePassDurationSeconds: S.optional(S.Number),
      contactPostPassDurationSeconds: S.optional(S.Number),
      tags: S.optional(TagsMap),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/dataflowEndpointGroupV2" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateDataflowEndpointGroupV2Request",
}) as any as S.Schema<CreateDataflowEndpointGroupV2Request>;
export interface CreateDataflowEndpointGroupV2Response {
  dataflowEndpointGroupId?: string;
}
export const CreateDataflowEndpointGroupV2Response = /*@__PURE__*/ S.suspend(
  () => S.Struct({ dataflowEndpointGroupId: S.optional(S.String) }),
).annotate({
  identifier: "CreateDataflowEndpointGroupV2Response",
}) as any as S.Schema<CreateDataflowEndpointGroupV2Response>;
export type CustomerEphemerisPriority = number;
export type KeyArn = string;
export type S3BucketName = string;
export type S3ObjectKey = string;
export type S3VersionId = string;
export interface S3Object {
  bucket?: string;
  key?: string;
  version?: string;
}
export const S3Object = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bucket: S.optional(S.String),
    key: S.optional(S.String),
    version: S.optional(S.String),
  }),
).annotate({ identifier: "S3Object" }) as any as S.Schema<S3Object>;
export type TleLineOne = string;
export type TleLineTwo = string;
export interface TimeRange {
  startTime: Date;
  endTime: Date;
}
export const TimeRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    endTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({ identifier: "TimeRange" }) as any as S.Schema<TimeRange>;
export interface TLEData {
  tleLine1: string;
  tleLine2: string;
  validTimeRange: TimeRange;
}
export const TLEData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    tleLine1: S.String,
    tleLine2: S.String,
    validTimeRange: TimeRange,
  }),
).annotate({ identifier: "TLEData" }) as any as S.Schema<TLEData>;
export type TLEDataList = TLEData[];
export const TLEDataList = /*@__PURE__*/ S.Array(TLEData);
export interface TLEEphemeris {
  s3Object?: S3Object;
  tleData?: TLEData[];
}
export const TLEEphemeris = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    s3Object: S.optional(S3Object),
    tleData: S.optional(TLEDataList),
  }),
).annotate({ identifier: "TLEEphemeris" }) as any as S.Schema<TLEEphemeris>;
export type UnboundedString = string;
export interface OEMEphemeris {
  s3Object?: S3Object;
  oemData?: string;
}
export const OEMEphemeris = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ s3Object: S.optional(S3Object), oemData: S.optional(S.String) }),
).annotate({ identifier: "OEMEphemeris" }) as any as S.Schema<OEMEphemeris>;
export type GroundStationName = string;
export type AngleUnits = "DEGREE_ANGLE" | "RADIAN" | (string & {});
export const AngleUnits = S.String;

export interface ISO8601TimeRange {
  startTime: Date;
  endTime: Date;
}
export const ISO8601TimeRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    startTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    endTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "ISO8601TimeRange",
}) as any as S.Schema<ISO8601TimeRange>;
export interface TimeAzEl {
  dt: number;
  az: number;
  el: number;
}
export const TimeAzEl = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ dt: S.Number, az: S.Number, el: S.Number }),
).annotate({ identifier: "TimeAzEl" }) as any as S.Schema<TimeAzEl>;
export type TimeAzElList = TimeAzEl[];
export const TimeAzElList = /*@__PURE__*/ S.Array(TimeAzEl);
export interface AzElSegment {
  referenceEpoch: Date;
  validTimeRange: ISO8601TimeRange;
  azElList: TimeAzEl[];
}
export const AzElSegment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    referenceEpoch: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    validTimeRange: ISO8601TimeRange,
    azElList: TimeAzElList,
  }),
).annotate({ identifier: "AzElSegment" }) as any as S.Schema<AzElSegment>;
export type AzElSegmentList = AzElSegment[];
export const AzElSegmentList = /*@__PURE__*/ S.Array(AzElSegment);
export interface AzElSegments {
  angleUnit: AngleUnits;
  azElSegmentList: AzElSegment[];
}
export const AzElSegments = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ angleUnit: AngleUnits, azElSegmentList: AzElSegmentList }),
).annotate({ identifier: "AzElSegments" }) as any as S.Schema<AzElSegments>;
export type AzElSegmentsData =
  | { s3Object: S3Object; azElData?: never }
  | { s3Object?: never; azElData: AzElSegments };
export const AzElSegmentsData = /*@__PURE__*/ S.Union([
  S.Struct({ s3Object: S3Object }),
  S.Struct({ azElData: AzElSegments }),
]);
export interface AzElEphemeris {
  groundStation: string;
  data: AzElSegmentsData;
}
export const AzElEphemeris = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ groundStation: S.String, data: AzElSegmentsData }),
).annotate({ identifier: "AzElEphemeris" }) as any as S.Schema<AzElEphemeris>;
export type EphemerisData =
  | { tle: TLEEphemeris; oem?: never; azEl?: never }
  | { tle?: never; oem: OEMEphemeris; azEl?: never }
  | { tle?: never; oem?: never; azEl: AzElEphemeris };
export const EphemerisData = /*@__PURE__*/ S.Union([
  S.Struct({ tle: TLEEphemeris }),
  S.Struct({ oem: OEMEphemeris }),
  S.Struct({ azEl: AzElEphemeris }),
]);
export interface CreateEphemerisRequest {
  satelliteId?: string;
  enabled?: boolean;
  priority?: number;
  expirationTime?: Date;
  name: string;
  kmsKeyArn?: string;
  ephemeris?: EphemerisData;
  tags?: { [key: string]: string | undefined };
}
export const CreateEphemerisRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    satelliteId: S.optional(S.String),
    enabled: S.optional(S.Boolean),
    priority: S.optional(S.Number),
    expirationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    name: S.String,
    kmsKeyArn: S.optional(S.String),
    ephemeris: S.optional(EphemerisData),
    tags: S.optional(TagsMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ephemeris" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateEphemerisRequest",
}) as any as S.Schema<CreateEphemerisRequest>;
export interface EphemerisIdResponse {
  ephemerisId?: string;
}
export const EphemerisIdResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ephemerisId: S.optional(S.String) }),
).annotate({
  identifier: "EphemerisIdResponse",
}) as any as S.Schema<EphemerisIdResponse>;
export type DurationInSeconds = number;
export type PositiveDurationInSeconds = number;
export type DataflowEdge = string[];
export const DataflowEdge = /*@__PURE__*/ S.Array(S.String);
export type DataflowEdgeList = string[][];
export const DataflowEdgeList = /*@__PURE__*/ S.Array(DataflowEdge);
export type KeyAliasArn = string;
export type KeyAliasName = string;
export type KmsKey =
  | { kmsKeyArn: string; kmsAliasArn?: never; kmsAliasName?: never }
  | { kmsKeyArn?: never; kmsAliasArn: string; kmsAliasName?: never }
  | { kmsKeyArn?: never; kmsAliasArn?: never; kmsAliasName: string };
export const KmsKey = /*@__PURE__*/ S.Union([
  S.Struct({ kmsKeyArn: S.String }),
  S.Struct({ kmsAliasArn: S.String }),
  S.Struct({ kmsAliasName: S.String }),
]);
export interface CreateMissionProfileRequest {
  name: string;
  contactPrePassDurationSeconds?: number;
  contactPostPassDurationSeconds?: number;
  minimumViableContactDurationSeconds: number;
  dataflowEdges: string[][];
  trackingConfigArn: string;
  telemetrySinkConfigArn?: string;
  tags?: { [key: string]: string | undefined };
  streamsKmsKey?: KmsKey;
  streamsKmsRole?: string;
}
export const CreateMissionProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    contactPrePassDurationSeconds: S.optional(S.Number),
    contactPostPassDurationSeconds: S.optional(S.Number),
    minimumViableContactDurationSeconds: S.Number,
    dataflowEdges: DataflowEdgeList,
    trackingConfigArn: S.String,
    telemetrySinkConfigArn: S.optional(S.String),
    tags: S.optional(TagsMap),
    streamsKmsKey: S.optional(KmsKey),
    streamsKmsRole: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/missionprofile" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateMissionProfileRequest",
}) as any as S.Schema<CreateMissionProfileRequest>;
export interface MissionProfileIdResponse {
  missionProfileId?: string;
}
export const MissionProfileIdResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ missionProfileId: S.optional(S.String) }),
).annotate({
  identifier: "MissionProfileIdResponse",
}) as any as S.Schema<MissionProfileIdResponse>;
export interface DeleteConfigRequest {
  configId: string;
  configType: ConfigCapabilityType;
}
export const DeleteConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configId: S.String.pipe(T.HttpLabel("configId")),
    configType: ConfigCapabilityType.pipe(T.HttpLabel("configType")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/config/{configType}/{configId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteConfigRequest",
}) as any as S.Schema<DeleteConfigRequest>;
export interface DeleteDataflowEndpointGroupRequest {
  dataflowEndpointGroupId: string;
}
export const DeleteDataflowEndpointGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dataflowEndpointGroupId: S.String.pipe(
      T.HttpLabel("dataflowEndpointGroupId"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/dataflowEndpointGroup/{dataflowEndpointGroupId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDataflowEndpointGroupRequest",
}) as any as S.Schema<DeleteDataflowEndpointGroupRequest>;
export interface DeleteEphemerisRequest {
  ephemerisId: string;
}
export const DeleteEphemerisRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ephemerisId: S.String.pipe(T.HttpLabel("ephemerisId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/ephemeris/{ephemerisId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteEphemerisRequest",
}) as any as S.Schema<DeleteEphemerisRequest>;
export interface DeleteMissionProfileRequest {
  missionProfileId: string;
}
export const DeleteMissionProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    missionProfileId: S.String.pipe(T.HttpLabel("missionProfileId")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/missionprofile/{missionProfileId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteMissionProfileRequest",
}) as any as S.Schema<DeleteMissionProfileRequest>;
export interface DescribeContactRequest {
  contactId: string;
}
export const DescribeContactRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ contactId: S.String.pipe(T.HttpLabel("contactId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/contact/{contactId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeContactRequest",
}) as any as S.Schema<DescribeContactRequest>;
export type MissionProfileArn = string;
export type SatelliteArn = string;
export type ContactStatus =
  | "SCHEDULING"
  | "FAILED_TO_SCHEDULE"
  | "SCHEDULED"
  | "CANCELLED"
  | "AWS_CANCELLED"
  | "PREPASS"
  | "PASS"
  | "POSTPASS"
  | "COMPLETED"
  | "FAILED"
  | "AVAILABLE"
  | "CANCELLING"
  | "AWS_FAILED"
  | (string & {});
export const ContactStatus = S.String;

export interface Elevation {
  value: number;
  unit: AngleUnits;
}
export const Elevation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ value: S.Number, unit: AngleUnits }),
).annotate({ identifier: "Elevation" }) as any as S.Schema<Elevation>;
export interface AntennaDemodDecodeDetails {
  outputNode?: string;
}
export const AntennaDemodDecodeDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ outputNode: S.optional(S.String) }),
).annotate({
  identifier: "AntennaDemodDecodeDetails",
}) as any as S.Schema<AntennaDemodDecodeDetails>;
export interface S3RecordingDetails {
  bucketArn?: string;
  keyTemplate?: string;
}
export const S3RecordingDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bucketArn: S.optional(S.String),
    keyTemplate: S.optional(S.String),
  }),
).annotate({
  identifier: "S3RecordingDetails",
}) as any as S.Schema<S3RecordingDetails>;
export type ConfigDetails =
  | {
      endpointDetails: EndpointDetails;
      antennaDemodDecodeDetails?: never;
      s3RecordingDetails?: never;
    }
  | {
      endpointDetails?: never;
      antennaDemodDecodeDetails: AntennaDemodDecodeDetails;
      s3RecordingDetails?: never;
    }
  | {
      endpointDetails?: never;
      antennaDemodDecodeDetails?: never;
      s3RecordingDetails: S3RecordingDetails;
    };
export const ConfigDetails = /*@__PURE__*/ S.Union([
  S.Struct({ endpointDetails: EndpointDetails }),
  S.Struct({ antennaDemodDecodeDetails: AntennaDemodDecodeDetails }),
  S.Struct({ s3RecordingDetails: S3RecordingDetails }),
]);
export interface Source {
  configType?: ConfigCapabilityType;
  configId?: string;
  configDetails?: ConfigDetails;
  dataflowSourceRegion?: string;
}
export const Source = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configType: S.optional(ConfigCapabilityType),
    configId: S.optional(S.String),
    configDetails: S.optional(ConfigDetails),
    dataflowSourceRegion: S.optional(S.String),
  }),
).annotate({ identifier: "Source" }) as any as S.Schema<Source>;
export interface Destination {
  configType?: ConfigCapabilityType;
  configId?: string;
  configDetails?: ConfigDetails;
  dataflowDestinationRegion?: string;
}
export const Destination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configType: S.optional(ConfigCapabilityType),
    configId: S.optional(S.String),
    configDetails: S.optional(ConfigDetails),
    dataflowDestinationRegion: S.optional(S.String),
  }),
).annotate({ identifier: "Destination" }) as any as S.Schema<Destination>;
export interface DataflowDetail {
  source?: Source;
  destination?: Destination;
  errorMessage?: string;
}
export const DataflowDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    source: S.optional(Source),
    destination: S.optional(Destination),
    errorMessage: S.optional(S.String),
  }),
).annotate({ identifier: "DataflowDetail" }) as any as S.Schema<DataflowDetail>;
export type DataflowList = DataflowDetail[];
export const DataflowList = /*@__PURE__*/ S.Array(DataflowDetail);
export interface AzElProgramTrackSettings {
  ephemerisId: string;
}
export const AzElProgramTrackSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ephemerisId: S.String }),
).annotate({
  identifier: "AzElProgramTrackSettings",
}) as any as S.Schema<AzElProgramTrackSettings>;
export interface OemProgramTrackSettings {
  ephemerisId: string;
}
export const OemProgramTrackSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ephemerisId: S.String }),
).annotate({
  identifier: "OemProgramTrackSettings",
}) as any as S.Schema<OemProgramTrackSettings>;
export interface TleProgramTrackSettings {
  ephemerisId: string;
}
export const TleProgramTrackSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ephemerisId: S.String }),
).annotate({
  identifier: "TleProgramTrackSettings",
}) as any as S.Schema<TleProgramTrackSettings>;
export type ProgramTrackSettings =
  | { azEl: AzElProgramTrackSettings; oem?: never; tle?: never }
  | { azEl?: never; oem: OemProgramTrackSettings; tle?: never }
  | { azEl?: never; oem?: never; tle: TleProgramTrackSettings };
export const ProgramTrackSettings = /*@__PURE__*/ S.Union([
  S.Struct({ azEl: AzElProgramTrackSettings }),
  S.Struct({ oem: OemProgramTrackSettings }),
  S.Struct({ tle: TleProgramTrackSettings }),
]);
export interface TrackingOverrides {
  programTrackSettings?: ProgramTrackSettings;
}
export const TrackingOverrides = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ programTrackSettings: S.optional(ProgramTrackSettings) }),
).annotate({
  identifier: "TrackingOverrides",
}) as any as S.Schema<TrackingOverrides>;
export type EphemerisType =
  | "TLE"
  | "OEM"
  | "AZ_EL"
  | "SERVICE_MANAGED"
  | (string & {});
export const EphemerisType = S.String;

export interface EphemerisResponseData {
  ephemerisId?: string;
  ephemerisType: EphemerisType;
}
export const EphemerisResponseData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ephemerisId: S.optional(S.String), ephemerisType: EphemerisType }),
).annotate({
  identifier: "EphemerisResponseData",
}) as any as S.Schema<EphemerisResponseData>;
export type VersionStatus =
  | "UPDATING"
  | "ACTIVE"
  | "SUPERSEDED"
  | "FAILED_TO_UPDATE"
  | (string & {});
export const VersionStatus = S.String;

export type VersionFailureReasonCode =
  | "INTERNAL_ERROR"
  | "INVALID_SATELLITE_ARN"
  | "INVALID_UPDATE_CONTACT_REQUEST"
  | "EPHEMERIS_NOT_FOUND"
  | "EPHEMERIS_TIME_RANGE_INVALID"
  | "EPHEMERIS_NOT_ENABLED"
  | "SATELLITE_DOES_NOT_MATCH_EPHEMERIS"
  | "NOT_ONBOARDED_TO_AZEL_EPHEMERIS"
  | "AZEL_EPHEMERIS_NOT_FOUND"
  | "AZEL_EPHEMERIS_WRONG_GROUND_STATION"
  | "AZEL_EPHEMERIS_INVALID_STATUS"
  | "AZEL_EPHEMERIS_TIME_RANGE_INVALID"
  | (string & {});
export const VersionFailureReasonCode = S.String;

export type VersionFailureReasonCodes = VersionFailureReasonCode[];
export const VersionFailureReasonCodes = /*@__PURE__*/ S.Array(
  VersionFailureReasonCode,
);
export interface ContactVersion {
  versionId?: number;
  created?: Date;
  activated?: Date;
  superseded?: Date;
  lastUpdated?: Date;
  status?: VersionStatus;
  failureCodes?: VersionFailureReasonCode[];
  failureMessage?: string;
}
export const ContactVersion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    versionId: S.optional(S.Number),
    created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    activated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    superseded: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastUpdated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    status: S.optional(VersionStatus),
    failureCodes: S.optional(VersionFailureReasonCodes),
    failureMessage: S.optional(S.String),
  }),
).annotate({ identifier: "ContactVersion" }) as any as S.Schema<ContactVersion>;
export interface DescribeContactResponse {
  contactId?: string;
  missionProfileArn?: string;
  satelliteArn?: string;
  startTime?: Date;
  endTime?: Date;
  prePassStartTime?: Date;
  postPassEndTime?: Date;
  groundStation?: string;
  contactStatus?: ContactStatus;
  errorMessage?: string;
  maximumElevation?: Elevation;
  tags?: { [key: string]: string | undefined };
  region?: string;
  dataflowList?: DataflowDetail[];
  visibilityStartTime?: Date;
  visibilityEndTime?: Date;
  trackingOverrides?: TrackingOverrides;
  ephemeris?: EphemerisResponseData;
  version?: ContactVersion;
}
export const DescribeContactResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    contactId: S.optional(S.String),
    missionProfileArn: S.optional(S.String),
    satelliteArn: S.optional(S.String),
    startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    prePassStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    postPassEndTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    groundStation: S.optional(S.String),
    contactStatus: S.optional(ContactStatus),
    errorMessage: S.optional(S.String),
    maximumElevation: S.optional(Elevation),
    tags: S.optional(TagsMap),
    region: S.optional(S.String),
    dataflowList: S.optional(DataflowList),
    visibilityStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    visibilityEndTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    trackingOverrides: S.optional(TrackingOverrides),
    ephemeris: S.optional(EphemerisResponseData),
    version: S.optional(ContactVersion),
  }),
).annotate({
  identifier: "DescribeContactResponse",
}) as any as S.Schema<DescribeContactResponse>;
export interface DescribeContactVersionRequest {
  contactId: string;
  versionId: number;
}
export const DescribeContactVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    contactId: S.String.pipe(T.HttpLabel("contactId")),
    versionId: S.Number.pipe(T.HttpLabel("versionId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/contact/{contactId}/versions/{versionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeContactVersionRequest",
}) as any as S.Schema<DescribeContactVersionRequest>;
export interface DescribeContactVersionResponse {
  contactId?: string;
  missionProfileArn?: string;
  satelliteArn?: string;
  startTime?: Date;
  endTime?: Date;
  prePassStartTime?: Date;
  postPassEndTime?: Date;
  groundStation?: string;
  contactStatus?: ContactStatus;
  errorMessage?: string;
  maximumElevation?: Elevation;
  tags?: { [key: string]: string | undefined };
  region?: string;
  dataflowList?: DataflowDetail[];
  visibilityStartTime?: Date;
  visibilityEndTime?: Date;
  trackingOverrides?: TrackingOverrides;
  ephemeris?: EphemerisResponseData;
  version?: ContactVersion;
}
export const DescribeContactVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    contactId: S.optional(S.String),
    missionProfileArn: S.optional(S.String),
    satelliteArn: S.optional(S.String),
    startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    prePassStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    postPassEndTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    groundStation: S.optional(S.String),
    contactStatus: S.optional(ContactStatus),
    errorMessage: S.optional(S.String),
    maximumElevation: S.optional(Elevation),
    tags: S.optional(TagsMap),
    region: S.optional(S.String),
    dataflowList: S.optional(DataflowList),
    visibilityStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    visibilityEndTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    trackingOverrides: S.optional(TrackingOverrides),
    ephemeris: S.optional(EphemerisResponseData),
    version: S.optional(ContactVersion),
  }),
).annotate({
  identifier: "DescribeContactVersionResponse",
}) as any as S.Schema<DescribeContactVersionResponse>;
export interface DescribeEphemerisRequest {
  ephemerisId: string;
}
export const DescribeEphemerisRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ephemerisId: S.String.pipe(T.HttpLabel("ephemerisId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/ephemeris/{ephemerisId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeEphemerisRequest",
}) as any as S.Schema<DescribeEphemerisRequest>;
export type EphemerisStatus =
  | "VALIDATING"
  | "INVALID"
  | "ERROR"
  | "ENABLED"
  | "DISABLED"
  | "EXPIRED"
  | (string & {});
export const EphemerisStatus = S.String;

export type EphemerisPriority = number;
export interface EphemerisDescription {
  sourceS3Object?: S3Object;
  ephemerisData?: string;
}
export const EphemerisDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceS3Object: S.optional(S3Object),
    ephemerisData: S.optional(S.String),
  }),
).annotate({
  identifier: "EphemerisDescription",
}) as any as S.Schema<EphemerisDescription>;
export type EphemerisTypeDescription =
  | { tle: EphemerisDescription; oem?: never; azEl?: never }
  | { tle?: never; oem: EphemerisDescription; azEl?: never }
  | { tle?: never; oem?: never; azEl: EphemerisDescription };
export const EphemerisTypeDescription = /*@__PURE__*/ S.Union([
  S.Struct({ tle: EphemerisDescription }),
  S.Struct({ oem: EphemerisDescription }),
  S.Struct({ azEl: EphemerisDescription }),
]);
export type EphemerisInvalidReason =
  | "METADATA_INVALID"
  | "TIME_RANGE_INVALID"
  | "TRAJECTORY_INVALID"
  | "KMS_KEY_INVALID"
  | "VALIDATION_ERROR"
  | (string & {});
export const EphemerisInvalidReason = S.String;

export type EphemerisErrorCode =
  | "INTERNAL_ERROR"
  | "MISMATCHED_SATCAT_ID"
  | "OEM_VERSION_UNSUPPORTED"
  | "ORIGINATOR_MISSING"
  | "CREATION_DATE_MISSING"
  | "OBJECT_NAME_MISSING"
  | "OBJECT_ID_MISSING"
  | "REF_FRAME_UNSUPPORTED"
  | "REF_FRAME_EPOCH_UNSUPPORTED"
  | "TIME_SYSTEM_UNSUPPORTED"
  | "CENTER_BODY_UNSUPPORTED"
  | "INTERPOLATION_MISSING"
  | "INTERPOLATION_DEGREE_INVALID"
  | "AZ_EL_SEGMENT_LIST_MISSING"
  | "INSUFFICIENT_TIME_AZ_EL"
  | "START_TIME_IN_FUTURE"
  | "END_TIME_IN_PAST"
  | "EXPIRATION_TIME_TOO_EARLY"
  | "START_TIME_METADATA_TOO_EARLY"
  | "STOP_TIME_METADATA_TOO_LATE"
  | "AZ_EL_SEGMENT_END_TIME_BEFORE_START_TIME"
  | "AZ_EL_SEGMENT_TIMES_OVERLAP"
  | "AZ_EL_SEGMENTS_OUT_OF_ORDER"
  | "TIME_AZ_EL_ITEMS_OUT_OF_ORDER"
  | "MEAN_MOTION_INVALID"
  | "TIME_AZ_EL_AZ_RADIAN_RANGE_INVALID"
  | "TIME_AZ_EL_EL_RADIAN_RANGE_INVALID"
  | "TIME_AZ_EL_AZ_DEGREE_RANGE_INVALID"
  | "TIME_AZ_EL_EL_DEGREE_RANGE_INVALID"
  | "TIME_AZ_EL_ANGLE_UNITS_INVALID"
  | "INSUFFICIENT_KMS_PERMISSIONS"
  | "FILE_FORMAT_INVALID"
  | "AZ_EL_SEGMENT_REFERENCE_EPOCH_INVALID"
  | "AZ_EL_SEGMENT_START_TIME_INVALID"
  | "AZ_EL_SEGMENT_END_TIME_INVALID"
  | "AZ_EL_SEGMENT_VALID_TIME_RANGE_INVALID"
  | "AZ_EL_SEGMENT_END_TIME_TOO_LATE"
  | "AZ_EL_TOTAL_DURATION_EXCEEDED"
  | (string & {});
export const EphemerisErrorCode = S.String;

export type ErrorString = string;
export interface EphemerisErrorReason {
  errorCode: EphemerisErrorCode;
  errorMessage: string;
}
export const EphemerisErrorReason = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ errorCode: EphemerisErrorCode, errorMessage: S.String }),
).annotate({
  identifier: "EphemerisErrorReason",
}) as any as S.Schema<EphemerisErrorReason>;
export type EphemerisErrorReasonList = EphemerisErrorReason[];
export const EphemerisErrorReasonList =
  /*@__PURE__*/ S.Array(EphemerisErrorReason);
export interface DescribeEphemerisResponse {
  ephemerisId?: string;
  satelliteId?: string;
  status?: EphemerisStatus;
  priority?: number;
  creationTime?: Date;
  enabled?: boolean;
  name?: string;
  tags?: { [key: string]: string | undefined };
  suppliedData?: EphemerisTypeDescription;
  invalidReason?: EphemerisInvalidReason;
  errorReasons?: EphemerisErrorReason[];
}
export const DescribeEphemerisResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ephemerisId: S.optional(S.String),
    satelliteId: S.optional(S.String),
    status: S.optional(EphemerisStatus),
    priority: S.optional(S.Number),
    creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    enabled: S.optional(S.Boolean),
    name: S.optional(S.String),
    tags: S.optional(TagsMap),
    suppliedData: S.optional(EphemerisTypeDescription),
    invalidReason: S.optional(EphemerisInvalidReason),
    errorReasons: S.optional(EphemerisErrorReasonList),
  }),
).annotate({
  identifier: "DescribeEphemerisResponse",
}) as any as S.Schema<DescribeEphemerisResponse>;
export interface GetAgentConfigurationRequest {
  agentId: string;
}
export const GetAgentConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ agentId: S.String.pipe(T.HttpLabel("agentId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/agent/{agentId}/configuration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAgentConfigurationRequest",
}) as any as S.Schema<GetAgentConfigurationRequest>;
export interface GetAgentConfigurationResponse {
  agentId?: string;
  taskingDocument?: string;
}
export const GetAgentConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agentId: S.optional(S.String),
    taskingDocument: S.optional(S.String),
  }),
).annotate({
  identifier: "GetAgentConfigurationResponse",
}) as any as S.Schema<GetAgentConfigurationResponse>;
export interface GetAgentTaskResponseUrlRequest {
  agentId: string;
  taskId: string;
}
export const GetAgentTaskResponseUrlRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agentId: S.String.pipe(T.HttpLabel("agentId")),
    taskId: S.String.pipe(T.HttpLabel("taskId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/agentResponseUrl/{agentId}/{taskId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAgentTaskResponseUrlRequest",
}) as any as S.Schema<GetAgentTaskResponseUrlRequest>;
export interface GetAgentTaskResponseUrlResponse {
  agentId: string;
  taskId: string;
  presignedLogUrl: string;
}
export const GetAgentTaskResponseUrlResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ agentId: S.String, taskId: S.String, presignedLogUrl: S.String }),
).annotate({
  identifier: "GetAgentTaskResponseUrlResponse",
}) as any as S.Schema<GetAgentTaskResponseUrlResponse>;
export interface GetConfigRequest {
  configId: string;
  configType: ConfigCapabilityType;
}
export const GetConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configId: S.String.pipe(T.HttpLabel("configId")),
    configType: ConfigCapabilityType.pipe(T.HttpLabel("configType")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/config/{configType}/{configId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetConfigRequest",
}) as any as S.Schema<GetConfigRequest>;
export interface GetConfigResponse {
  configId: string;
  configArn: string;
  name: string;
  configType?: ConfigCapabilityType;
  configData: ConfigTypeData;
  tags?: { [key: string]: string | undefined };
}
export const GetConfigResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configId: S.String,
    configArn: S.String,
    name: S.String,
    configType: S.optional(ConfigCapabilityType),
    configData: ConfigTypeData,
    tags: S.optional(TagsMap),
  }),
).annotate({
  identifier: "GetConfigResponse",
}) as any as S.Schema<GetConfigResponse>;
export interface GetDataflowEndpointGroupRequest {
  dataflowEndpointGroupId: string;
}
export const GetDataflowEndpointGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dataflowEndpointGroupId: S.String.pipe(
      T.HttpLabel("dataflowEndpointGroupId"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/dataflowEndpointGroup/{dataflowEndpointGroupId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDataflowEndpointGroupRequest",
}) as any as S.Schema<GetDataflowEndpointGroupRequest>;
export type DataflowEndpointGroupArn = string;
export interface GetDataflowEndpointGroupResponse {
  dataflowEndpointGroupId?: string;
  dataflowEndpointGroupArn?: string;
  endpointsDetails?: EndpointDetails[];
  tags?: { [key: string]: string | undefined };
  contactPrePassDurationSeconds?: number;
  contactPostPassDurationSeconds?: number;
}
export const GetDataflowEndpointGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dataflowEndpointGroupId: S.optional(S.String),
    dataflowEndpointGroupArn: S.optional(S.String),
    endpointsDetails: S.optional(EndpointDetailsList),
    tags: S.optional(TagsMap),
    contactPrePassDurationSeconds: S.optional(S.Number),
    contactPostPassDurationSeconds: S.optional(S.Number),
  }),
).annotate({
  identifier: "GetDataflowEndpointGroupResponse",
}) as any as S.Schema<GetDataflowEndpointGroupResponse>;
export type Month = number;
export type Year = number;
export interface GetMinuteUsageRequest {
  month: number;
  year: number;
}
export const GetMinuteUsageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ month: S.Number, year: S.Number }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/minute-usage" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMinuteUsageRequest",
}) as any as S.Schema<GetMinuteUsageRequest>;
export interface GetMinuteUsageResponse {
  isReservedMinutesCustomer?: boolean;
  totalReservedMinuteAllocation?: number;
  upcomingMinutesScheduled?: number;
  totalScheduledMinutes?: number;
  estimatedMinutesRemaining?: number;
}
export const GetMinuteUsageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    isReservedMinutesCustomer: S.optional(S.Boolean),
    totalReservedMinuteAllocation: S.optional(S.Number),
    upcomingMinutesScheduled: S.optional(S.Number),
    totalScheduledMinutes: S.optional(S.Number),
    estimatedMinutesRemaining: S.optional(S.Number),
  }),
).annotate({
  identifier: "GetMinuteUsageResponse",
}) as any as S.Schema<GetMinuteUsageResponse>;
export interface GetMissionProfileRequest {
  missionProfileId: string;
}
export const GetMissionProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    missionProfileId: S.String.pipe(T.HttpLabel("missionProfileId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/missionprofile/{missionProfileId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMissionProfileRequest",
}) as any as S.Schema<GetMissionProfileRequest>;
export type AWSRegion = string;
export interface GetMissionProfileResponse {
  missionProfileId?: string;
  missionProfileArn?: string;
  name?: string;
  region?: string;
  contactPrePassDurationSeconds?: number;
  contactPostPassDurationSeconds?: number;
  minimumViableContactDurationSeconds?: number;
  dataflowEdges?: string[][];
  trackingConfigArn?: string;
  telemetrySinkConfigArn?: string;
  tags?: { [key: string]: string | undefined };
  streamsKmsKey?: KmsKey;
  streamsKmsRole?: string;
}
export const GetMissionProfileResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    missionProfileId: S.optional(S.String),
    missionProfileArn: S.optional(S.String),
    name: S.optional(S.String),
    region: S.optional(S.String),
    contactPrePassDurationSeconds: S.optional(S.Number),
    contactPostPassDurationSeconds: S.optional(S.Number),
    minimumViableContactDurationSeconds: S.optional(S.Number),
    dataflowEdges: S.optional(DataflowEdgeList),
    trackingConfigArn: S.optional(S.String),
    telemetrySinkConfigArn: S.optional(S.String),
    tags: S.optional(TagsMap),
    streamsKmsKey: S.optional(KmsKey),
    streamsKmsRole: S.optional(S.String),
  }),
).annotate({
  identifier: "GetMissionProfileResponse",
}) as any as S.Schema<GetMissionProfileResponse>;
export interface GetSatelliteRequest {
  satelliteId: string;
}
export const GetSatelliteRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ satelliteId: S.String.pipe(T.HttpLabel("satelliteId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/satellite/{satelliteId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSatelliteRequest",
}) as any as S.Schema<GetSatelliteRequest>;
export type NoradSatelliteID = number;
export type GroundStationIdList = string[];
export const GroundStationIdList = /*@__PURE__*/ S.Array(S.String);
export type EphemerisSource =
  | "CUSTOMER_PROVIDED"
  | "SPACE_TRACK"
  | (string & {});
export const EphemerisSource = S.String;

export interface EphemerisMetaData {
  source: EphemerisSource;
  ephemerisId?: string;
  epoch?: Date;
  name?: string;
}
export const EphemerisMetaData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    source: EphemerisSource,
    ephemerisId: S.optional(S.String),
    epoch: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    name: S.optional(S.String),
  }),
).annotate({
  identifier: "EphemerisMetaData",
}) as any as S.Schema<EphemerisMetaData>;
export interface GetSatelliteResponse {
  satelliteId?: string;
  satelliteArn?: string;
  noradSatelliteID?: number;
  groundStations?: string[];
  currentEphemeris?: EphemerisMetaData;
}
export const GetSatelliteResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    satelliteId: S.optional(S.String),
    satelliteArn: S.optional(S.String),
    noradSatelliteID: S.optional(S.Number),
    groundStations: S.optional(GroundStationIdList),
    currentEphemeris: S.optional(EphemerisMetaData),
  }),
).annotate({
  identifier: "GetSatelliteResponse",
}) as any as S.Schema<GetSatelliteResponse>;
export type PaginationMaxResults = number;
export type PaginationToken = string;
export interface ListAntennasRequest {
  groundStationId: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListAntennasRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    groundStationId: S.String.pipe(T.HttpLabel("groundStationId")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/groundstation/{groundStationId}/antenna",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAntennasRequest",
}) as any as S.Schema<ListAntennasRequest>;
export type AntennaName = string;
export interface AntennaListItem {
  groundStationName: string;
  antennaName: string;
  region: string;
}
export const AntennaListItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    groundStationName: S.String,
    antennaName: S.String,
    region: S.String,
  }),
).annotate({
  identifier: "AntennaListItem",
}) as any as S.Schema<AntennaListItem>;
export type AntennaList = AntennaListItem[];
export const AntennaList = /*@__PURE__*/ S.Array(AntennaListItem);
export interface ListAntennasResponse {
  antennaList: AntennaListItem[];
  nextToken?: string;
}
export const ListAntennasResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ antennaList: AntennaList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListAntennasResponse",
}) as any as S.Schema<ListAntennasResponse>;
export interface ListConfigsRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListConfigsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/config" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListConfigsRequest",
}) as any as S.Schema<ListConfigsRequest>;
export interface ConfigListItem {
  configId?: string;
  configType?: ConfigCapabilityType;
  configArn?: string;
  name?: string;
}
export const ConfigListItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configId: S.optional(S.String),
    configType: S.optional(ConfigCapabilityType),
    configArn: S.optional(S.String),
    name: S.optional(S.String),
  }),
).annotate({ identifier: "ConfigListItem" }) as any as S.Schema<ConfigListItem>;
export type ConfigList = ConfigListItem[];
export const ConfigList = /*@__PURE__*/ S.Array(ConfigListItem);
export interface ListConfigsResponse {
  nextToken?: string;
  configList?: ConfigListItem[];
}
export const ListConfigsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    configList: S.optional(ConfigList),
  }),
).annotate({
  identifier: "ListConfigsResponse",
}) as any as S.Schema<ListConfigsResponse>;
export type StatusList = ContactStatus[];
export const StatusList = /*@__PURE__*/ S.Array(ContactStatus);
export interface AzElEphemerisFilter {
  id: string;
}
export const AzElEphemerisFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String }),
).annotate({
  identifier: "AzElEphemerisFilter",
}) as any as S.Schema<AzElEphemerisFilter>;
export type EphemerisFilter = { azEl: AzElEphemerisFilter };
export const EphemerisFilter = /*@__PURE__*/ S.Union([
  S.Struct({ azEl: AzElEphemerisFilter }),
]);
export interface ListContactsRequest {
  maxResults?: number;
  nextToken?: string;
  statusList: ContactStatus[];
  startTime: Date;
  endTime: Date;
  groundStation?: string;
  satelliteArn?: string;
  missionProfileArn?: string;
  ephemeris?: EphemerisFilter;
}
export const ListContactsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    statusList: StatusList,
    startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    endTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    groundStation: S.optional(S.String),
    satelliteArn: S.optional(S.String),
    missionProfileArn: S.optional(S.String),
    ephemeris: S.optional(EphemerisFilter),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/contacts" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListContactsRequest",
}) as any as S.Schema<ListContactsRequest>;
export interface ContactData {
  contactId?: string;
  missionProfileArn?: string;
  satelliteArn?: string;
  startTime?: Date;
  endTime?: Date;
  prePassStartTime?: Date;
  postPassEndTime?: Date;
  groundStation?: string;
  contactStatus?: ContactStatus;
  errorMessage?: string;
  maximumElevation?: Elevation;
  region?: string;
  tags?: { [key: string]: string | undefined };
  visibilityStartTime?: Date;
  visibilityEndTime?: Date;
  ephemeris?: EphemerisResponseData;
  version?: ContactVersion;
}
export const ContactData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    contactId: S.optional(S.String),
    missionProfileArn: S.optional(S.String),
    satelliteArn: S.optional(S.String),
    startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    prePassStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    postPassEndTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    groundStation: S.optional(S.String),
    contactStatus: S.optional(ContactStatus),
    errorMessage: S.optional(S.String),
    maximumElevation: S.optional(Elevation),
    region: S.optional(S.String),
    tags: S.optional(TagsMap),
    visibilityStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    visibilityEndTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ephemeris: S.optional(EphemerisResponseData),
    version: S.optional(ContactVersion),
  }),
).annotate({ identifier: "ContactData" }) as any as S.Schema<ContactData>;
export type ContactList = ContactData[];
export const ContactList = /*@__PURE__*/ S.Array(ContactData);
export interface ListContactsResponse {
  nextToken?: string;
  contactList?: ContactData[];
}
export const ListContactsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    contactList: S.optional(ContactList),
  }),
).annotate({
  identifier: "ListContactsResponse",
}) as any as S.Schema<ListContactsResponse>;
export interface ListContactVersionsRequest {
  contactId: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListContactVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    contactId: S.String.pipe(T.HttpLabel("contactId")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/contact/{contactId}/versions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListContactVersionsRequest",
}) as any as S.Schema<ListContactVersionsRequest>;
export type ContactVersionsList = ContactVersion[];
export const ContactVersionsList = /*@__PURE__*/ S.Array(ContactVersion);
export interface ListContactVersionsResponse {
  nextToken?: string;
  contactVersionsList?: ContactVersion[];
}
export const ListContactVersionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    contactVersionsList: S.optional(ContactVersionsList),
  }),
).annotate({
  identifier: "ListContactVersionsResponse",
}) as any as S.Schema<ListContactVersionsResponse>;
export interface ListDataflowEndpointGroupsRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListDataflowEndpointGroupsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/dataflowEndpointGroup" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDataflowEndpointGroupsRequest",
}) as any as S.Schema<ListDataflowEndpointGroupsRequest>;
export interface DataflowEndpointListItem {
  dataflowEndpointGroupId?: string;
  dataflowEndpointGroupArn?: string;
}
export const DataflowEndpointListItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dataflowEndpointGroupId: S.optional(S.String),
    dataflowEndpointGroupArn: S.optional(S.String),
  }),
).annotate({
  identifier: "DataflowEndpointListItem",
}) as any as S.Schema<DataflowEndpointListItem>;
export type DataflowEndpointGroupList = DataflowEndpointListItem[];
export const DataflowEndpointGroupList = /*@__PURE__*/ S.Array(
  DataflowEndpointListItem,
);
export interface ListDataflowEndpointGroupsResponse {
  nextToken?: string;
  dataflowEndpointGroupList?: DataflowEndpointListItem[];
}
export const ListDataflowEndpointGroupsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    dataflowEndpointGroupList: S.optional(DataflowEndpointGroupList),
  }),
).annotate({
  identifier: "ListDataflowEndpointGroupsResponse",
}) as any as S.Schema<ListDataflowEndpointGroupsResponse>;
export type EphemerisStatusList = EphemerisStatus[];
export const EphemerisStatusList = /*@__PURE__*/ S.Array(EphemerisStatus);
export interface ListEphemeridesRequest {
  satelliteId?: string;
  ephemerisType?: EphemerisType;
  startTime: Date;
  endTime: Date;
  statusList?: EphemerisStatus[];
  maxResults?: number;
  nextToken?: string;
}
export const ListEphemeridesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    satelliteId: S.optional(S.String),
    ephemerisType: S.optional(EphemerisType),
    startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    endTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    statusList: S.optional(EphemerisStatusList),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ephemerides" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListEphemeridesRequest",
}) as any as S.Schema<ListEphemeridesRequest>;
export interface EphemerisItem {
  ephemerisId?: string;
  ephemerisType?: EphemerisType;
  status?: EphemerisStatus;
  priority?: number;
  enabled?: boolean;
  creationTime?: Date;
  name?: string;
  sourceS3Object?: S3Object;
}
export const EphemerisItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ephemerisId: S.optional(S.String),
    ephemerisType: S.optional(EphemerisType),
    status: S.optional(EphemerisStatus),
    priority: S.optional(S.Number),
    enabled: S.optional(S.Boolean),
    creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    name: S.optional(S.String),
    sourceS3Object: S.optional(S3Object),
  }),
).annotate({ identifier: "EphemerisItem" }) as any as S.Schema<EphemerisItem>;
export type EphemeridesList = EphemerisItem[];
export const EphemeridesList = /*@__PURE__*/ S.Array(EphemerisItem);
export interface ListEphemeridesResponse {
  nextToken?: string;
  ephemerides?: EphemerisItem[];
}
export const ListEphemeridesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    ephemerides: S.optional(EphemeridesList),
  }),
).annotate({
  identifier: "ListEphemeridesResponse",
}) as any as S.Schema<ListEphemeridesResponse>;
export type ReservationType = "MAINTENANCE" | "CONTACT" | (string & {});
export const ReservationType = S.String;

export type ReservationTypeFilterList = ReservationType[];
export const ReservationTypeFilterList = /*@__PURE__*/ S.Array(ReservationType);
export interface ListGroundStationReservationsRequest {
  groundStationId: string;
  startTime: Date;
  endTime: Date;
  reservationTypes?: ReservationType[];
  maxResults?: number;
  nextToken?: string;
}
export const ListGroundStationReservationsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      groundStationId: S.String.pipe(T.HttpLabel("groundStationId")),
      startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
        T.HttpQuery("startTime"),
      ),
      endTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
        T.HttpQuery("endTime"),
      ),
      reservationTypes: S.optional(ReservationTypeFilterList).pipe(
        T.HttpQuery("reservationTypes"),
      ),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/groundstation/{groundStationId}/reservation",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListGroundStationReservationsRequest",
}) as any as S.Schema<ListGroundStationReservationsRequest>;
export type MaintenanceType = "PLANNED" | "UNPLANNED" | (string & {});
export const MaintenanceType = S.String;

export interface MaintenanceReservationDetails {
  maintenanceType: MaintenanceType;
}
export const MaintenanceReservationDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ maintenanceType: MaintenanceType }),
).annotate({
  identifier: "MaintenanceReservationDetails",
}) as any as S.Schema<MaintenanceReservationDetails>;
export interface ContactReservationDetails {
  contactId?: string;
}
export const ContactReservationDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ contactId: S.optional(S.String) }),
).annotate({
  identifier: "ContactReservationDetails",
}) as any as S.Schema<ContactReservationDetails>;
export type ReservationDetails =
  | { maintenance: MaintenanceReservationDetails; contact?: never }
  | { maintenance?: never; contact: ContactReservationDetails };
export const ReservationDetails = /*@__PURE__*/ S.Union([
  S.Struct({ maintenance: MaintenanceReservationDetails }),
  S.Struct({ contact: ContactReservationDetails }),
]);
export interface GroundStationReservationListItem {
  reservationType: ReservationType;
  groundStationId: string;
  antennaName: string;
  startTime: Date;
  endTime: Date;
  reservationDetails: ReservationDetails;
}
export const GroundStationReservationListItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    reservationType: ReservationType,
    groundStationId: S.String,
    antennaName: S.String,
    startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    endTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    reservationDetails: ReservationDetails,
  }),
).annotate({
  identifier: "GroundStationReservationListItem",
}) as any as S.Schema<GroundStationReservationListItem>;
export type GroundStationReservationList = GroundStationReservationListItem[];
export const GroundStationReservationList = /*@__PURE__*/ S.Array(
  GroundStationReservationListItem,
);
export interface ListGroundStationReservationsResponse {
  reservationList: GroundStationReservationListItem[];
  nextToken?: string;
}
export const ListGroundStationReservationsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      reservationList: GroundStationReservationList,
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListGroundStationReservationsResponse",
}) as any as S.Schema<ListGroundStationReservationsResponse>;
export interface ListGroundStationsRequest {
  satelliteId?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListGroundStationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    satelliteId: S.optional(S.String).pipe(T.HttpQuery("satelliteId")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/groundstation" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListGroundStationsRequest",
}) as any as S.Schema<ListGroundStationsRequest>;
export interface GroundStationData {
  groundStationId?: string;
  groundStationName?: string;
  region?: string;
}
export const GroundStationData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    groundStationId: S.optional(S.String),
    groundStationName: S.optional(S.String),
    region: S.optional(S.String),
  }),
).annotate({
  identifier: "GroundStationData",
}) as any as S.Schema<GroundStationData>;
export type GroundStationList = GroundStationData[];
export const GroundStationList = /*@__PURE__*/ S.Array(GroundStationData);
export interface ListGroundStationsResponse {
  nextToken?: string;
  groundStationList?: GroundStationData[];
}
export const ListGroundStationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    groundStationList: S.optional(GroundStationList),
  }),
).annotate({
  identifier: "ListGroundStationsResponse",
}) as any as S.Schema<ListGroundStationsResponse>;
export interface ListMissionProfilesRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListMissionProfilesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/missionprofile" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListMissionProfilesRequest",
}) as any as S.Schema<ListMissionProfilesRequest>;
export interface MissionProfileListItem {
  missionProfileId?: string;
  missionProfileArn?: string;
  region?: string;
  name?: string;
}
export const MissionProfileListItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    missionProfileId: S.optional(S.String),
    missionProfileArn: S.optional(S.String),
    region: S.optional(S.String),
    name: S.optional(S.String),
  }),
).annotate({
  identifier: "MissionProfileListItem",
}) as any as S.Schema<MissionProfileListItem>;
export type MissionProfileList = MissionProfileListItem[];
export const MissionProfileList = /*@__PURE__*/ S.Array(MissionProfileListItem);
export interface ListMissionProfilesResponse {
  nextToken?: string;
  missionProfileList?: MissionProfileListItem[];
}
export const ListMissionProfilesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    missionProfileList: S.optional(MissionProfileList),
  }),
).annotate({
  identifier: "ListMissionProfilesResponse",
}) as any as S.Schema<ListMissionProfilesResponse>;
export interface ListSatellitesRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListSatellitesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/satellite" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSatellitesRequest",
}) as any as S.Schema<ListSatellitesRequest>;
export interface SatelliteListItem {
  satelliteId?: string;
  satelliteArn?: string;
  noradSatelliteID?: number;
  groundStations?: string[];
  currentEphemeris?: EphemerisMetaData;
}
export const SatelliteListItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    satelliteId: S.optional(S.String),
    satelliteArn: S.optional(S.String),
    noradSatelliteID: S.optional(S.Number),
    groundStations: S.optional(GroundStationIdList),
    currentEphemeris: S.optional(EphemerisMetaData),
  }),
).annotate({
  identifier: "SatelliteListItem",
}) as any as S.Schema<SatelliteListItem>;
export type SatelliteList = SatelliteListItem[];
export const SatelliteList = /*@__PURE__*/ S.Array(SatelliteListItem);
export interface ListSatellitesResponse {
  nextToken?: string;
  satellites?: SatelliteListItem[];
}
export const ListSatellitesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    satellites: S.optional(SatelliteList),
  }),
).annotate({
  identifier: "ListSatellitesResponse",
}) as any as S.Schema<ListSatellitesResponse>;
export type AnyArn = string;
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
  tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: S.optional(TagsMap) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export type IpAddressList = string[];
export const IpAddressList = /*@__PURE__*/ S.Array(S.String);
export type CapabilityArn = string;
export type CapabilityArnList = string[];
export const CapabilityArnList = /*@__PURE__*/ S.Array(S.String);
export interface DiscoveryData {
  publicIpAddresses: string[];
  privateIpAddresses: string[];
  capabilityArns: string[];
}
export const DiscoveryData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    publicIpAddresses: IpAddressList,
    privateIpAddresses: IpAddressList,
    capabilityArns: CapabilityArnList,
  }),
).annotate({ identifier: "DiscoveryData" }) as any as S.Schema<DiscoveryData>;
export type VersionString = string;
export type InstanceId = string;
export type InstanceType = string;
export type AgentCpuCoresList = number[];
export const AgentCpuCoresList = /*@__PURE__*/ S.Array(S.Number);
export type ComponentTypeString = string;
export type VersionStringList = string[];
export const VersionStringList = /*@__PURE__*/ S.Array(S.String);
export interface ComponentVersion {
  componentType: string;
  versions: string[];
}
export const ComponentVersion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ componentType: S.String, versions: VersionStringList }),
).annotate({
  identifier: "ComponentVersion",
}) as any as S.Schema<ComponentVersion>;
export type ComponentVersionList = ComponentVersion[];
export const ComponentVersionList = /*@__PURE__*/ S.Array(ComponentVersion);
export interface AgentDetails {
  agentVersion: string;
  instanceId: string;
  instanceType: string;
  reservedCpuCores?: number[];
  agentCpuCores?: number[];
  componentVersions: ComponentVersion[];
}
export const AgentDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agentVersion: S.String,
    instanceId: S.String,
    instanceType: S.String,
    reservedCpuCores: S.optional(AgentCpuCoresList),
    agentCpuCores: S.optional(AgentCpuCoresList),
    componentVersions: ComponentVersionList,
  }),
).annotate({ identifier: "AgentDetails" }) as any as S.Schema<AgentDetails>;
export interface RegisterAgentRequest {
  discoveryData: DiscoveryData;
  agentDetails: AgentDetails;
  tags?: { [key: string]: string | undefined };
}
export const RegisterAgentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    discoveryData: DiscoveryData,
    agentDetails: AgentDetails,
    tags: S.optional(TagsMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/agent" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RegisterAgentRequest",
}) as any as S.Schema<RegisterAgentRequest>;
export interface RegisterAgentResponse {
  agentId?: string;
}
export const RegisterAgentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ agentId: S.optional(S.String) }),
).annotate({
  identifier: "RegisterAgentResponse",
}) as any as S.Schema<RegisterAgentResponse>;
export interface ReserveContactRequest {
  missionProfileArn: string;
  satelliteArn?: string;
  startTime: Date;
  endTime: Date;
  groundStation: string;
  tags?: { [key: string]: string | undefined };
  trackingOverrides?: TrackingOverrides;
}
export const ReserveContactRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    missionProfileArn: S.String,
    satelliteArn: S.optional(S.String),
    startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    endTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    groundStation: S.String,
    tags: S.optional(TagsMap),
    trackingOverrides: S.optional(TrackingOverrides),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/contact" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ReserveContactRequest",
}) as any as S.Schema<ReserveContactRequest>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tags: TagsMap,
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
export type TagKeys = string[];
export const TagKeys = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tagKeys: TagKeys.pipe(T.HttpQuery("tagKeys")),
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
export type SignatureMap = { [key: string]: boolean | undefined };
export const SignatureMap = /*@__PURE__*/ S.Record(
  S.String,
  S.Boolean.pipe(S.optional),
);
export interface AggregateStatus {
  status: AgentStatus;
  signatureMap?: { [key: string]: boolean | undefined };
}
export const AggregateStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: AgentStatus, signatureMap: S.optional(SignatureMap) }),
).annotate({
  identifier: "AggregateStatus",
}) as any as S.Schema<AggregateStatus>;
export interface ComponentStatusData {
  componentType: string;
  capabilityArn: string;
  status: AgentStatus;
  bytesSent?: number;
  bytesReceived?: number;
  packetsDropped?: number;
  dataflowId: string;
}
export const ComponentStatusData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    componentType: S.String,
    capabilityArn: S.String,
    status: AgentStatus,
    bytesSent: S.optional(S.Number),
    bytesReceived: S.optional(S.Number),
    packetsDropped: S.optional(S.Number),
    dataflowId: S.String,
  }),
).annotate({
  identifier: "ComponentStatusData",
}) as any as S.Schema<ComponentStatusData>;
export type ComponentStatusList = ComponentStatusData[];
export const ComponentStatusList = /*@__PURE__*/ S.Array(ComponentStatusData);
export interface UpdateAgentStatusRequest {
  agentId: string;
  taskId: string;
  aggregateStatus: AggregateStatus;
  componentStatuses: ComponentStatusData[];
}
export const UpdateAgentStatusRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agentId: S.String.pipe(T.HttpLabel("agentId")),
    taskId: S.String,
    aggregateStatus: AggregateStatus,
    componentStatuses: ComponentStatusList,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/agent/{agentId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAgentStatusRequest",
}) as any as S.Schema<UpdateAgentStatusRequest>;
export interface UpdateAgentStatusResponse {
  agentId: string;
}
export const UpdateAgentStatusResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ agentId: S.String }),
).annotate({
  identifier: "UpdateAgentStatusResponse",
}) as any as S.Schema<UpdateAgentStatusResponse>;
export interface UpdateConfigRequest {
  configId: string;
  name: string;
  configType: ConfigCapabilityType;
  configData: ConfigTypeData;
}
export const UpdateConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configId: S.String.pipe(T.HttpLabel("configId")),
    name: S.String,
    configType: ConfigCapabilityType.pipe(T.HttpLabel("configType")),
    configData: ConfigTypeData,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/config/{configType}/{configId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateConfigRequest",
}) as any as S.Schema<UpdateConfigRequest>;
export type ClientToken = string;
export interface UpdateContactRequest {
  contactId: string;
  clientToken?: string;
  trackingOverrides?: TrackingOverrides;
  satelliteArn?: string;
}
export const UpdateContactRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    contactId: S.String.pipe(T.HttpLabel("contactId")),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    trackingOverrides: S.optional(TrackingOverrides),
    satelliteArn: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/contact/{contactId}/versions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateContactRequest",
}) as any as S.Schema<UpdateContactRequest>;
export interface UpdateContactResponse {
  contactId?: string;
  versionId?: number;
}
export const UpdateContactResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    contactId: S.optional(S.String),
    versionId: S.optional(S.Number),
  }),
).annotate({
  identifier: "UpdateContactResponse",
}) as any as S.Schema<UpdateContactResponse>;
export interface UpdateEphemerisRequest {
  ephemerisId: string;
  enabled: boolean;
  name?: string;
  priority?: number;
}
export const UpdateEphemerisRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ephemerisId: S.String.pipe(T.HttpLabel("ephemerisId")),
    enabled: S.Boolean,
    name: S.optional(S.String),
    priority: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/ephemeris/{ephemerisId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateEphemerisRequest",
}) as any as S.Schema<UpdateEphemerisRequest>;
export interface UpdateMissionProfileRequest {
  missionProfileId: string;
  name?: string;
  contactPrePassDurationSeconds?: number;
  contactPostPassDurationSeconds?: number;
  minimumViableContactDurationSeconds?: number;
  dataflowEdges?: string[][];
  trackingConfigArn?: string;
  telemetrySinkConfigArn?: string;
  streamsKmsKey?: KmsKey;
  streamsKmsRole?: string;
}
export const UpdateMissionProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    missionProfileId: S.String.pipe(T.HttpLabel("missionProfileId")),
    name: S.optional(S.String),
    contactPrePassDurationSeconds: S.optional(S.Number),
    contactPostPassDurationSeconds: S.optional(S.Number),
    minimumViableContactDurationSeconds: S.optional(S.Number),
    dataflowEdges: S.optional(DataflowEdgeList),
    trackingConfigArn: S.optional(S.String),
    telemetrySinkConfigArn: S.optional(S.String),
    streamsKmsKey: S.optional(KmsKey),
    streamsKmsRole: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/missionprofile/{missionProfileId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateMissionProfileRequest",
}) as any as S.Schema<UpdateMissionProfileRequest>;
export type CancelContactError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Cancels or stops a contact with a specified contact ID based on its position in the contact lifecycle.
 *
 * For contacts that:
 *
 * - Have yet to start, the contact will be cancelled.
 *
 * - Have started but have yet to finish, the contact will be stopped.
 */
export const cancelContact: API.OperationMethod<
  CancelContactRequest,
  ContactIdResponse,
  CancelContactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelContactRequest,
  output: ContactIdResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelContact",
}));

export type CreateConfigError =
  | DependencyException
  | InvalidParameterException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a `Config` with the specified `configData` parameters.
 *
 * Only one type of `configData` can be specified.
 */
export const createConfig: API.OperationMethod<
  CreateConfigRequest,
  ConfigIdResponse,
  CreateConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateConfigRequest,
  output: ConfigIdResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConfig",
}));

export type CreateDataflowEndpointGroupError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a `DataflowEndpoint` group containing the specified list of ` DataflowEndpoint` objects.
 *
 * The `name` field in each endpoint is used in your mission profile ` DataflowEndpointConfig` to specify which endpoints to use during a contact.
 *
 * When a contact uses multiple `DataflowEndpointConfig` objects, each ` Config` must match a `DataflowEndpoint` in the same group.
 */
export const createDataflowEndpointGroup: API.OperationMethod<
  CreateDataflowEndpointGroupRequest,
  DataflowEndpointGroupIdResponse,
  CreateDataflowEndpointGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDataflowEndpointGroupRequest,
  output: DataflowEndpointGroupIdResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataflowEndpointGroup",
}));

export type CreateDataflowEndpointGroupV2Error =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Creates a `DataflowEndpoint` group containing the specified list of Ground Station Agent based endpoints.
 *
 * The `name` field in each endpoint is used in your mission profile ` DataflowEndpointConfig` to specify which endpoints to use during a contact.
 *
 * When a contact uses multiple `DataflowEndpointConfig` objects, each ` Config` must match a `DataflowEndpoint` in the same group.
 */
export const createDataflowEndpointGroupV2: API.OperationMethod<
  CreateDataflowEndpointGroupV2Request,
  CreateDataflowEndpointGroupV2Response,
  CreateDataflowEndpointGroupV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDataflowEndpointGroupV2Request,
  output: CreateDataflowEndpointGroupV2Response,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataflowEndpointGroupV2",
}));

export type CreateEphemerisError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Create an ephemeris with your specified EphemerisData.
 */
export const createEphemeris: API.OperationMethod<
  CreateEphemerisRequest,
  EphemerisIdResponse,
  CreateEphemerisError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateEphemerisRequest,
  output: EphemerisIdResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEphemeris",
}));

export type CreateMissionProfileError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a mission profile.
 *
 * `dataflowEdges` is a list of lists of strings. Each lower level list of strings has two elements: a *from* ARN and a *to* ARN.
 */
export const createMissionProfile: API.OperationMethod<
  CreateMissionProfileRequest,
  MissionProfileIdResponse,
  CreateMissionProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateMissionProfileRequest,
  output: MissionProfileIdResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMissionProfile",
}));

export type DeleteConfigError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a `Config`.
 */
export const deleteConfig: API.OperationMethod<
  DeleteConfigRequest,
  ConfigIdResponse,
  DeleteConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteConfigRequest,
  output: ConfigIdResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfig",
}));

export type DeleteDataflowEndpointGroupError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a dataflow endpoint group.
 */
export const deleteDataflowEndpointGroup: API.OperationMethod<
  DeleteDataflowEndpointGroupRequest,
  DataflowEndpointGroupIdResponse,
  DeleteDataflowEndpointGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDataflowEndpointGroupRequest,
  output: DataflowEndpointGroupIdResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataflowEndpointGroup",
}));

export type DeleteEphemerisError =
  | DependencyException
  | InvalidParameterException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Delete an ephemeris.
 */
export const deleteEphemeris: API.OperationMethod<
  DeleteEphemerisRequest,
  EphemerisIdResponse,
  DeleteEphemerisError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEphemerisRequest,
  output: EphemerisIdResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEphemeris",
}));

export type DeleteMissionProfileError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a mission profile.
 */
export const deleteMissionProfile: API.OperationMethod<
  DeleteMissionProfileRequest,
  MissionProfileIdResponse,
  DeleteMissionProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteMissionProfileRequest,
  output: MissionProfileIdResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMissionProfile",
}));

export type DescribeContactError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes an existing contact.
 */
export const describeContact: API.OperationMethod<
  DescribeContactRequest,
  DescribeContactResponse,
  DescribeContactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeContactRequest,
  output: DescribeContactResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeContact",
}));

export type DescribeContactVersionError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes a specific version of a contact.
 */
export const describeContactVersion: API.OperationMethod<
  DescribeContactVersionRequest,
  DescribeContactVersionResponse,
  DescribeContactVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeContactVersionRequest,
  output: DescribeContactVersionResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeContactVersion",
}));

export type DescribeEphemerisError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieve information about an existing ephemeris.
 */
export const describeEphemeris: API.OperationMethod<
  DescribeEphemerisRequest,
  DescribeEphemerisResponse,
  DescribeEphemerisError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeEphemerisRequest,
  output: DescribeEphemerisResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEphemeris",
}));

export type GetAgentConfigurationError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * For use by AWS Ground Station Agent and shouldn't be called directly.
 *
 * Gets the latest configuration information for a registered agent.
 */
export const getAgentConfiguration: API.OperationMethod<
  GetAgentConfigurationRequest,
  GetAgentConfigurationResponse,
  GetAgentConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAgentConfigurationRequest,
  output: GetAgentConfigurationResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAgentConfiguration",
}));

export type GetAgentTaskResponseUrlError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * For use by AWS Ground Station Agent and shouldn't be called directly.
 *
 * Gets a presigned URL for uploading agent task response logs.
 */
export const getAgentTaskResponseUrl: API.OperationMethod<
  GetAgentTaskResponseUrlRequest,
  GetAgentTaskResponseUrlResponse,
  GetAgentTaskResponseUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAgentTaskResponseUrlRequest,
  output: GetAgentTaskResponseUrlResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAgentTaskResponseUrl",
}));

export type GetConfigError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns `Config` information.
 *
 * Only one `Config` response can be returned.
 */
export const getConfig: API.OperationMethod<
  GetConfigRequest,
  GetConfigResponse,
  GetConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetConfigRequest,
  output: GetConfigResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfig",
}));

export type GetDataflowEndpointGroupError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns the dataflow endpoint group.
 */
export const getDataflowEndpointGroup: API.OperationMethod<
  GetDataflowEndpointGroupRequest,
  GetDataflowEndpointGroupResponse,
  GetDataflowEndpointGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDataflowEndpointGroupRequest,
  output: GetDataflowEndpointGroupResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataflowEndpointGroup",
}));

export type GetMinuteUsageError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns the number of reserved minutes used by account.
 */
export const getMinuteUsage: API.OperationMethod<
  GetMinuteUsageRequest,
  GetMinuteUsageResponse,
  GetMinuteUsageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMinuteUsageRequest,
  output: GetMinuteUsageResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMinuteUsage",
}));

export type GetMissionProfileError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a mission profile.
 */
export const getMissionProfile: API.OperationMethod<
  GetMissionProfileRequest,
  GetMissionProfileResponse,
  GetMissionProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMissionProfileRequest,
  output: GetMissionProfileResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMissionProfile",
}));

export type GetSatelliteError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a satellite.
 */
export const getSatellite: API.OperationMethod<
  GetSatelliteRequest,
  GetSatelliteResponse,
  GetSatelliteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSatelliteRequest,
  output: GetSatelliteResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSatellite",
}));

export type ListAntennasError =
  | DependencyException
  | InvalidParameterException
  | CommonErrors;
/**
 * Returns a list of antennas at a specified ground station.
 */
export const listAntennas: API.PaginatedOperationMethod<
  ListAntennasRequest,
  ListAntennasResponse,
  ListAntennasError,
  Credentials | HttpClient.HttpClient,
  AntennaListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAntennasRequest,
  output: ListAntennasResponse,
  errors: [DependencyException, InvalidParameterException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAntennas",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "antennaList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListConfigsError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a list of `Config` objects.
 */
export const listConfigs: API.PaginatedOperationMethod<
  ListConfigsRequest,
  ListConfigsResponse,
  ListConfigsError,
  Credentials | HttpClient.HttpClient,
  ConfigListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListConfigsRequest,
  output: ListConfigsResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConfigs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "configList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListContactsError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a list of contacts.
 *
 * If `statusList` contains AVAILABLE, the request must include ` groundStation`, `missionprofileArn`, and `satelliteArn`.
 */
export const listContacts: API.PaginatedOperationMethod<
  ListContactsRequest,
  ListContactsResponse,
  ListContactsError,
  Credentials | HttpClient.HttpClient,
  ContactData
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListContactsRequest,
  output: ListContactsResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListContacts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "contactList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListContactVersionsError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a list of versions for a specified contact.
 */
export const listContactVersions: API.PaginatedOperationMethod<
  ListContactVersionsRequest,
  ListContactVersionsResponse,
  ListContactVersionsError,
  Credentials | HttpClient.HttpClient,
  ContactVersion
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListContactVersionsRequest,
  output: ListContactVersionsResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListContactVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "contactVersionsList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDataflowEndpointGroupsError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a list of `DataflowEndpoint` groups.
 */
export const listDataflowEndpointGroups: API.PaginatedOperationMethod<
  ListDataflowEndpointGroupsRequest,
  ListDataflowEndpointGroupsResponse,
  ListDataflowEndpointGroupsError,
  Credentials | HttpClient.HttpClient,
  DataflowEndpointListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDataflowEndpointGroupsRequest,
  output: ListDataflowEndpointGroupsResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataflowEndpointGroups",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "dataflowEndpointGroupList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEphemeridesError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * List your existing ephemerides.
 */
export const listEphemerides: API.PaginatedOperationMethod<
  ListEphemeridesRequest,
  ListEphemeridesResponse,
  ListEphemeridesError,
  Credentials | HttpClient.HttpClient,
  EphemerisItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEphemeridesRequest,
  output: ListEphemeridesResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEphemerides",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "ephemerides",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListGroundStationReservationsError =
  | DependencyException
  | InvalidParameterException
  | CommonErrors;
/**
 * Returns a list of reservations for a specified ground station.
 */
export const listGroundStationReservations: API.PaginatedOperationMethod<
  ListGroundStationReservationsRequest,
  ListGroundStationReservationsResponse,
  ListGroundStationReservationsError,
  Credentials | HttpClient.HttpClient,
  GroundStationReservationListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListGroundStationReservationsRequest,
  output: ListGroundStationReservationsResponse,
  errors: [DependencyException, InvalidParameterException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGroundStationReservations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "reservationList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListGroundStationsError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a list of ground stations.
 */
export const listGroundStations: API.PaginatedOperationMethod<
  ListGroundStationsRequest,
  ListGroundStationsResponse,
  ListGroundStationsError,
  Credentials | HttpClient.HttpClient,
  GroundStationData
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListGroundStationsRequest,
  output: ListGroundStationsResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGroundStations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "groundStationList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMissionProfilesError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a list of mission profiles.
 */
export const listMissionProfiles: API.PaginatedOperationMethod<
  ListMissionProfilesRequest,
  ListMissionProfilesResponse,
  ListMissionProfilesError,
  Credentials | HttpClient.HttpClient,
  MissionProfileListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMissionProfilesRequest,
  output: ListMissionProfilesResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMissionProfiles",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "missionProfileList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSatellitesError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a list of satellites.
 */
export const listSatellites: API.PaginatedOperationMethod<
  ListSatellitesRequest,
  ListSatellitesResponse,
  ListSatellitesError,
  Credentials | HttpClient.HttpClient,
  SatelliteListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSatellitesRequest,
  output: ListSatellitesResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSatellites",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "satellites",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a list of tags for a specified resource.
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
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type RegisterAgentError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * For use by AWS Ground Station Agent and shouldn't be called directly.
 *
 * Registers a new agent with AWS Ground Station.
 */
export const registerAgent: API.OperationMethod<
  RegisterAgentRequest,
  RegisterAgentResponse,
  RegisterAgentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterAgentRequest,
  output: RegisterAgentResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterAgent",
}));

export type ReserveContactError =
  | DependencyException
  | InvalidParameterException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Reserves a contact using specified parameters.
 */
export const reserveContact: API.OperationMethod<
  ReserveContactRequest,
  ContactIdResponse,
  ReserveContactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ReserveContactRequest,
  output: ContactIdResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ReserveContact",
}));

export type TagResourceError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Assigns a tag to a resource.
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
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deassigns a resource tag.
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
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateAgentStatusError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * For use by AWS Ground Station Agent and shouldn't be called directly.
 *
 * Update the status of the agent.
 */
export const updateAgentStatus: API.OperationMethod<
  UpdateAgentStatusRequest,
  UpdateAgentStatusResponse,
  UpdateAgentStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAgentStatusRequest,
  output: UpdateAgentStatusResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAgentStatus",
}));

export type UpdateConfigError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates the `Config` used when scheduling contacts.
 *
 * Updating a `Config` will not update the execution parameters for existing future contacts scheduled with this `Config`.
 */
export const updateConfig: API.OperationMethod<
  UpdateConfigRequest,
  ConfigIdResponse,
  UpdateConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateConfigRequest,
  output: ConfigIdResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConfig",
}));

export type UpdateContactError =
  | DependencyException
  | InvalidParameterException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates a specific contact.
 */
export const updateContact: API.OperationMethod<
  UpdateContactRequest,
  UpdateContactResponse,
  UpdateContactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateContactRequest,
  output: UpdateContactResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateContact",
}));

export type UpdateEphemerisError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Update an existing ephemeris.
 */
export const updateEphemeris: API.OperationMethod<
  UpdateEphemerisRequest,
  EphemerisIdResponse,
  UpdateEphemerisError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateEphemerisRequest,
  output: EphemerisIdResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEphemeris",
}));

export type UpdateMissionProfileError =
  | DependencyException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates a mission profile.
 *
 * Updating a mission profile will not update the execution parameters for existing future contacts.
 */
export const updateMissionProfile: API.OperationMethod<
  UpdateMissionProfileRequest,
  MissionProfileIdResponse,
  UpdateMissionProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateMissionProfileRequest,
  output: MissionProfileIdResponse,
  errors: [
    DependencyException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMissionProfile",
}));
