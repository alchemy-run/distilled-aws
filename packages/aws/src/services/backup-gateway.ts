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
  sdkId: "Backup Gateway",
  serviceShapeName: "BackupOnPremises_v20210101",
});
const auth = T.AwsAuthSigv4({ name: "backup-gateway" });
const ver = T.ServiceVersion("2021-01-01");
const proto = T.AwsProtocolsAwsJson1_0();
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
              `https://backup-gateway-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://backup-gateway-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://backup-gateway.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://backup-gateway.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
      ErrorCode: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      ErrorCode: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      ErrorCode: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export type GatewayArn = string;
export type ServerArn = string;
export interface AssociateGatewayToServerInput {
  GatewayArn: string;
  ServerArn: string;
}
export const AssociateGatewayToServerInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GatewayArn: S.String, ServerArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "AssociateGatewayToServerInput",
}) as any as S.Schema<AssociateGatewayToServerInput>;
export interface AssociateGatewayToServerOutput {
  GatewayArn?: string;
}
export const AssociateGatewayToServerOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GatewayArn: S.optional(S.String) }),
).annotate({
  identifier: "AssociateGatewayToServerOutput",
}) as any as S.Schema<AssociateGatewayToServerOutput>;
export type ActivationKey = string;
export type Name = string;
export type GatewayType = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.String, Value: S.String }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type Tags = Tag[];
export const Tags = /*@__PURE__*/ S.Array(Tag);
export interface CreateGatewayInput {
  ActivationKey: string;
  GatewayDisplayName: string;
  GatewayType: string;
  Tags?: Tag[];
}
export const CreateGatewayInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActivationKey: S.String,
    GatewayDisplayName: S.String,
    GatewayType: S.String,
    Tags: S.optional(Tags),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateGatewayInput",
}) as any as S.Schema<CreateGatewayInput>;
export interface CreateGatewayOutput {
  GatewayArn?: string;
}
export const CreateGatewayOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GatewayArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateGatewayOutput",
}) as any as S.Schema<CreateGatewayOutput>;
export interface DeleteGatewayInput {
  GatewayArn: string;
}
export const DeleteGatewayInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GatewayArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteGatewayInput",
}) as any as S.Schema<DeleteGatewayInput>;
export interface DeleteGatewayOutput {
  GatewayArn?: string;
}
export const DeleteGatewayOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GatewayArn: S.optional(S.String) }),
).annotate({
  identifier: "DeleteGatewayOutput",
}) as any as S.Schema<DeleteGatewayOutput>;
export interface DeleteHypervisorInput {
  HypervisorArn: string;
}
export const DeleteHypervisorInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ HypervisorArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteHypervisorInput",
}) as any as S.Schema<DeleteHypervisorInput>;
export interface DeleteHypervisorOutput {
  HypervisorArn?: string;
}
export const DeleteHypervisorOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ HypervisorArn: S.optional(S.String) }),
).annotate({
  identifier: "DeleteHypervisorOutput",
}) as any as S.Schema<DeleteHypervisorOutput>;
export interface DisassociateGatewayFromServerInput {
  GatewayArn: string;
}
export const DisassociateGatewayFromServerInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GatewayArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DisassociateGatewayFromServerInput",
}) as any as S.Schema<DisassociateGatewayFromServerInput>;
export interface DisassociateGatewayFromServerOutput {
  GatewayArn?: string;
}
export const DisassociateGatewayFromServerOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GatewayArn: S.optional(S.String) }),
).annotate({
  identifier: "DisassociateGatewayFromServerOutput",
}) as any as S.Schema<DisassociateGatewayFromServerOutput>;
export interface GetBandwidthRateLimitScheduleInput {
  GatewayArn: string;
}
export const GetBandwidthRateLimitScheduleInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GatewayArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetBandwidthRateLimitScheduleInput",
}) as any as S.Schema<GetBandwidthRateLimitScheduleInput>;
export type AverageUploadRateLimit = number;
export type HourOfDay = number;
export type MinuteOfHour = number;
export type DayOfWeek = number;
export type DaysOfWeek = number[];
export const DaysOfWeek = /*@__PURE__*/ S.Array(S.Number);
export interface BandwidthRateLimitInterval {
  AverageUploadRateLimitInBitsPerSec?: number;
  StartHourOfDay: number;
  EndHourOfDay: number;
  StartMinuteOfHour: number;
  EndMinuteOfHour: number;
  DaysOfWeek: number[];
}
export const BandwidthRateLimitInterval = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AverageUploadRateLimitInBitsPerSec: S.optional(S.Number),
    StartHourOfDay: S.Number,
    EndHourOfDay: S.Number,
    StartMinuteOfHour: S.Number,
    EndMinuteOfHour: S.Number,
    DaysOfWeek: DaysOfWeek,
  }),
).annotate({
  identifier: "BandwidthRateLimitInterval",
}) as any as S.Schema<BandwidthRateLimitInterval>;
export type BandwidthRateLimitIntervals = BandwidthRateLimitInterval[];
export const BandwidthRateLimitIntervals = /*@__PURE__*/ S.Array(
  BandwidthRateLimitInterval,
);
export interface GetBandwidthRateLimitScheduleOutput {
  GatewayArn?: string;
  BandwidthRateLimitIntervals?: BandwidthRateLimitInterval[];
}
export const GetBandwidthRateLimitScheduleOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GatewayArn: S.optional(S.String),
    BandwidthRateLimitIntervals: S.optional(BandwidthRateLimitIntervals),
  }),
).annotate({
  identifier: "GetBandwidthRateLimitScheduleOutput",
}) as any as S.Schema<GetBandwidthRateLimitScheduleOutput>;
export interface GetGatewayInput {
  GatewayArn: string;
}
export const GetGatewayInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GatewayArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetGatewayInput",
}) as any as S.Schema<GetGatewayInput>;
export type HypervisorId = string;
export type DayOfMonth = number;
export interface MaintenanceStartTime {
  DayOfMonth?: number;
  DayOfWeek?: number;
  HourOfDay: number;
  MinuteOfHour: number;
}
export const MaintenanceStartTime = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DayOfMonth: S.optional(S.Number),
    DayOfWeek: S.optional(S.Number),
    HourOfDay: S.Number,
    MinuteOfHour: S.Number,
  }),
).annotate({
  identifier: "MaintenanceStartTime",
}) as any as S.Schema<MaintenanceStartTime>;
export type VpcEndpoint = string;
export interface GatewayDetails {
  GatewayArn?: string;
  GatewayDisplayName?: string;
  GatewayType?: string;
  HypervisorId?: string;
  LastSeenTime?: Date;
  MaintenanceStartTime?: MaintenanceStartTime;
  NextUpdateAvailabilityTime?: Date;
  VpcEndpoint?: string;
  DeprecationDate?: Date;
  SoftwareVersion?: string;
}
export const GatewayDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GatewayArn: S.optional(S.String),
    GatewayDisplayName: S.optional(S.String),
    GatewayType: S.optional(S.String),
    HypervisorId: S.optional(S.String),
    LastSeenTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    MaintenanceStartTime: S.optional(MaintenanceStartTime),
    NextUpdateAvailabilityTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    VpcEndpoint: S.optional(S.String),
    DeprecationDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    SoftwareVersion: S.optional(S.String),
  }),
).annotate({ identifier: "GatewayDetails" }) as any as S.Schema<GatewayDetails>;
export interface GetGatewayOutput {
  Gateway?: GatewayDetails;
}
export const GetGatewayOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Gateway: S.optional(GatewayDetails) }),
).annotate({
  identifier: "GetGatewayOutput",
}) as any as S.Schema<GetGatewayOutput>;
export interface GetHypervisorInput {
  HypervisorArn: string;
}
export const GetHypervisorInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ HypervisorArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetHypervisorInput",
}) as any as S.Schema<GetHypervisorInput>;
export type Host = string;
export type KmsKeyArn = string;
export type LogGroupArn = string;
export type HypervisorState = string;
export type SyncMetadataStatus = string;
export interface HypervisorDetails {
  Host?: string;
  HypervisorArn?: string;
  KmsKeyArn?: string;
  Name?: string;
  LogGroupArn?: string;
  State?: string;
  LastSuccessfulMetadataSyncTime?: Date;
  LatestMetadataSyncStatusMessage?: string;
  LatestMetadataSyncStatus?: string;
}
export const HypervisorDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Host: S.optional(S.String),
    HypervisorArn: S.optional(S.String),
    KmsKeyArn: S.optional(S.String),
    Name: S.optional(S.String),
    LogGroupArn: S.optional(S.String),
    State: S.optional(S.String),
    LastSuccessfulMetadataSyncTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LatestMetadataSyncStatusMessage: S.optional(S.String),
    LatestMetadataSyncStatus: S.optional(S.String),
  }),
).annotate({
  identifier: "HypervisorDetails",
}) as any as S.Schema<HypervisorDetails>;
export interface GetHypervisorOutput {
  Hypervisor?: HypervisorDetails;
}
export const GetHypervisorOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Hypervisor: S.optional(HypervisorDetails) }),
).annotate({
  identifier: "GetHypervisorOutput",
}) as any as S.Schema<GetHypervisorOutput>;
export interface GetHypervisorPropertyMappingsInput {
  HypervisorArn: string;
}
export const GetHypervisorPropertyMappingsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ HypervisorArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetHypervisorPropertyMappingsInput",
}) as any as S.Schema<GetHypervisorPropertyMappingsInput>;
export type VmwareCategory = string;
export type VmwareTagName = string;
export interface VmwareToAwsTagMapping {
  VmwareCategory: string;
  VmwareTagName: string;
  AwsTagKey: string;
  AwsTagValue: string;
}
export const VmwareToAwsTagMapping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VmwareCategory: S.String,
    VmwareTagName: S.String,
    AwsTagKey: S.String,
    AwsTagValue: S.String,
  }),
).annotate({
  identifier: "VmwareToAwsTagMapping",
}) as any as S.Schema<VmwareToAwsTagMapping>;
export type VmwareToAwsTagMappings = VmwareToAwsTagMapping[];
export const VmwareToAwsTagMappings = /*@__PURE__*/ S.Array(
  VmwareToAwsTagMapping,
);
export type IamRoleArn = string;
export interface GetHypervisorPropertyMappingsOutput {
  HypervisorArn?: string;
  VmwareToAwsTagMappings?: VmwareToAwsTagMapping[];
  IamRoleArn?: string;
}
export const GetHypervisorPropertyMappingsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HypervisorArn: S.optional(S.String),
    VmwareToAwsTagMappings: S.optional(VmwareToAwsTagMappings),
    IamRoleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "GetHypervisorPropertyMappingsOutput",
}) as any as S.Schema<GetHypervisorPropertyMappingsOutput>;
export type ResourceArn = string;
export interface GetVirtualMachineInput {
  ResourceArn: string;
}
export const GetVirtualMachineInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetVirtualMachineInput",
}) as any as S.Schema<GetVirtualMachineInput>;
export type Path = string;
export interface VmwareTag {
  VmwareCategory?: string;
  VmwareTagName?: string;
  VmwareTagDescription?: string;
}
export const VmwareTag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VmwareCategory: S.optional(S.String),
    VmwareTagName: S.optional(S.String),
    VmwareTagDescription: S.optional(S.String),
  }),
).annotate({ identifier: "VmwareTag" }) as any as S.Schema<VmwareTag>;
export type VmwareTags = VmwareTag[];
export const VmwareTags = /*@__PURE__*/ S.Array(VmwareTag);
export interface VirtualMachineDetails {
  HostName?: string;
  HypervisorId?: string;
  Name?: string;
  Path?: string;
  ResourceArn?: string;
  LastBackupDate?: Date;
  VmwareTags?: VmwareTag[];
}
export const VirtualMachineDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HostName: S.optional(S.String),
    HypervisorId: S.optional(S.String),
    Name: S.optional(S.String),
    Path: S.optional(S.String),
    ResourceArn: S.optional(S.String),
    LastBackupDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    VmwareTags: S.optional(VmwareTags),
  }),
).annotate({
  identifier: "VirtualMachineDetails",
}) as any as S.Schema<VirtualMachineDetails>;
export interface GetVirtualMachineOutput {
  VirtualMachine?: VirtualMachineDetails;
}
export const GetVirtualMachineOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ VirtualMachine: S.optional(VirtualMachineDetails) }),
).annotate({
  identifier: "GetVirtualMachineOutput",
}) as any as S.Schema<GetVirtualMachineOutput>;
export type Username = string | redacted.Redacted<string>;
export type Password = string | redacted.Redacted<string>;
export interface ImportHypervisorConfigurationInput {
  Name: string;
  Host: string;
  Username?: string | redacted.Redacted<string>;
  Password?: string | redacted.Redacted<string>;
  KmsKeyArn?: string;
  Tags?: Tag[];
}
export const ImportHypervisorConfigurationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Host: S.String,
    Username: S.optional(SensitiveString),
    Password: S.optional(SensitiveString),
    KmsKeyArn: S.optional(S.String),
    Tags: S.optional(Tags),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ImportHypervisorConfigurationInput",
}) as any as S.Schema<ImportHypervisorConfigurationInput>;
export interface ImportHypervisorConfigurationOutput {
  HypervisorArn?: string;
}
export const ImportHypervisorConfigurationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ HypervisorArn: S.optional(S.String) }),
).annotate({
  identifier: "ImportHypervisorConfigurationOutput",
}) as any as S.Schema<ImportHypervisorConfigurationOutput>;
export type MaxResults = number;
export type NextToken = string;
export interface ListGatewaysInput {
  MaxResults?: number;
  NextToken?: string;
}
export const ListGatewaysInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListGatewaysInput",
}) as any as S.Schema<ListGatewaysInput>;
export interface Gateway {
  GatewayArn?: string;
  GatewayDisplayName?: string;
  GatewayType?: string;
  HypervisorId?: string;
  LastSeenTime?: Date;
}
export const Gateway = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GatewayArn: S.optional(S.String),
    GatewayDisplayName: S.optional(S.String),
    GatewayType: S.optional(S.String),
    HypervisorId: S.optional(S.String),
    LastSeenTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "Gateway" }) as any as S.Schema<Gateway>;
export type Gateways = Gateway[];
export const Gateways = /*@__PURE__*/ S.Array(Gateway);
export interface ListGatewaysOutput {
  Gateways?: Gateway[];
  NextToken?: string;
}
export const ListGatewaysOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Gateways: S.optional(Gateways), NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListGatewaysOutput",
}) as any as S.Schema<ListGatewaysOutput>;
export interface ListHypervisorsInput {
  MaxResults?: number;
  NextToken?: string;
}
export const ListHypervisorsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListHypervisorsInput",
}) as any as S.Schema<ListHypervisorsInput>;
export interface Hypervisor {
  Host?: string;
  HypervisorArn?: string;
  KmsKeyArn?: string;
  Name?: string;
  State?: string;
}
export const Hypervisor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Host: S.optional(S.String),
    HypervisorArn: S.optional(S.String),
    KmsKeyArn: S.optional(S.String),
    Name: S.optional(S.String),
    State: S.optional(S.String),
  }),
).annotate({ identifier: "Hypervisor" }) as any as S.Schema<Hypervisor>;
export type Hypervisors = Hypervisor[];
export const Hypervisors = /*@__PURE__*/ S.Array(Hypervisor);
export interface ListHypervisorsOutput {
  Hypervisors?: Hypervisor[];
  NextToken?: string;
}
export const ListHypervisorsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Hypervisors: S.optional(Hypervisors),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListHypervisorsOutput",
}) as any as S.Schema<ListHypervisorsOutput>;
export interface ListTagsForResourceInput {
  ResourceArn: string;
}
export const ListTagsForResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTagsForResourceInput",
}) as any as S.Schema<ListTagsForResourceInput>;
export interface ListTagsForResourceOutput {
  ResourceArn?: string;
  Tags?: Tag[];
}
export const ListTagsForResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.optional(S.String), Tags: S.optional(Tags) }),
).annotate({
  identifier: "ListTagsForResourceOutput",
}) as any as S.Schema<ListTagsForResourceOutput>;
export interface ListVirtualMachinesInput {
  HypervisorArn?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListVirtualMachinesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HypervisorArn: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListVirtualMachinesInput",
}) as any as S.Schema<ListVirtualMachinesInput>;
export interface VirtualMachine {
  HostName?: string;
  HypervisorId?: string;
  Name?: string;
  Path?: string;
  ResourceArn?: string;
  LastBackupDate?: Date;
}
export const VirtualMachine = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HostName: S.optional(S.String),
    HypervisorId: S.optional(S.String),
    Name: S.optional(S.String),
    Path: S.optional(S.String),
    ResourceArn: S.optional(S.String),
    LastBackupDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "VirtualMachine" }) as any as S.Schema<VirtualMachine>;
export type VirtualMachines = VirtualMachine[];
export const VirtualMachines = /*@__PURE__*/ S.Array(VirtualMachine);
export interface ListVirtualMachinesOutput {
  VirtualMachines?: VirtualMachine[];
  NextToken?: string;
}
export const ListVirtualMachinesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VirtualMachines: S.optional(VirtualMachines),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListVirtualMachinesOutput",
}) as any as S.Schema<ListVirtualMachinesOutput>;
export interface PutBandwidthRateLimitScheduleInput {
  GatewayArn: string;
  BandwidthRateLimitIntervals: BandwidthRateLimitInterval[];
}
export const PutBandwidthRateLimitScheduleInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GatewayArn: S.String,
    BandwidthRateLimitIntervals: BandwidthRateLimitIntervals,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "PutBandwidthRateLimitScheduleInput",
}) as any as S.Schema<PutBandwidthRateLimitScheduleInput>;
export interface PutBandwidthRateLimitScheduleOutput {
  GatewayArn?: string;
}
export const PutBandwidthRateLimitScheduleOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GatewayArn: S.optional(S.String) }),
).annotate({
  identifier: "PutBandwidthRateLimitScheduleOutput",
}) as any as S.Schema<PutBandwidthRateLimitScheduleOutput>;
export interface PutHypervisorPropertyMappingsInput {
  HypervisorArn: string;
  VmwareToAwsTagMappings: VmwareToAwsTagMapping[];
  IamRoleArn: string;
}
export const PutHypervisorPropertyMappingsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HypervisorArn: S.String,
    VmwareToAwsTagMappings: VmwareToAwsTagMappings,
    IamRoleArn: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "PutHypervisorPropertyMappingsInput",
}) as any as S.Schema<PutHypervisorPropertyMappingsInput>;
export interface PutHypervisorPropertyMappingsOutput {
  HypervisorArn?: string;
}
export const PutHypervisorPropertyMappingsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ HypervisorArn: S.optional(S.String) }),
).annotate({
  identifier: "PutHypervisorPropertyMappingsOutput",
}) as any as S.Schema<PutHypervisorPropertyMappingsOutput>;
export interface PutMaintenanceStartTimeInput {
  GatewayArn: string;
  HourOfDay: number;
  MinuteOfHour: number;
  DayOfWeek?: number;
  DayOfMonth?: number;
}
export const PutMaintenanceStartTimeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GatewayArn: S.String,
    HourOfDay: S.Number,
    MinuteOfHour: S.Number,
    DayOfWeek: S.optional(S.Number),
    DayOfMonth: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "PutMaintenanceStartTimeInput",
}) as any as S.Schema<PutMaintenanceStartTimeInput>;
export interface PutMaintenanceStartTimeOutput {
  GatewayArn?: string;
}
export const PutMaintenanceStartTimeOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GatewayArn: S.optional(S.String) }),
).annotate({
  identifier: "PutMaintenanceStartTimeOutput",
}) as any as S.Schema<PutMaintenanceStartTimeOutput>;
export interface StartVirtualMachinesMetadataSyncInput {
  HypervisorArn: string;
}
export const StartVirtualMachinesMetadataSyncInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ HypervisorArn: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "StartVirtualMachinesMetadataSyncInput",
}) as any as S.Schema<StartVirtualMachinesMetadataSyncInput>;
export interface StartVirtualMachinesMetadataSyncOutput {
  HypervisorArn?: string;
}
export const StartVirtualMachinesMetadataSyncOutput = /*@__PURE__*/ S.suspend(
  () => S.Struct({ HypervisorArn: S.optional(S.String) }),
).annotate({
  identifier: "StartVirtualMachinesMetadataSyncOutput",
}) as any as S.Schema<StartVirtualMachinesMetadataSyncOutput>;
export interface TagResourceInput {
  ResourceARN: string;
  Tags: Tag[];
}
export const TagResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String, Tags: Tags }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "TagResourceInput",
}) as any as S.Schema<TagResourceInput>;
export interface TagResourceOutput {
  ResourceARN?: string;
}
export const TagResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.optional(S.String) }),
).annotate({
  identifier: "TagResourceOutput",
}) as any as S.Schema<TagResourceOutput>;
export interface TestHypervisorConfigurationInput {
  GatewayArn: string;
  Host: string;
  Username?: string | redacted.Redacted<string>;
  Password?: string | redacted.Redacted<string>;
}
export const TestHypervisorConfigurationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GatewayArn: S.String,
    Host: S.String,
    Username: S.optional(SensitiveString),
    Password: S.optional(SensitiveString),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "TestHypervisorConfigurationInput",
}) as any as S.Schema<TestHypervisorConfigurationInput>;
export interface TestHypervisorConfigurationOutput {}
export const TestHypervisorConfigurationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "TestHypervisorConfigurationOutput",
}) as any as S.Schema<TestHypervisorConfigurationOutput>;
export type TagKeys = string[];
export const TagKeys = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceInput {
  ResourceARN: string;
  TagKeys: string[];
}
export const UntagResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String, TagKeys: TagKeys }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UntagResourceInput",
}) as any as S.Schema<UntagResourceInput>;
export interface UntagResourceOutput {
  ResourceARN?: string;
}
export const UntagResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.optional(S.String) }),
).annotate({
  identifier: "UntagResourceOutput",
}) as any as S.Schema<UntagResourceOutput>;
export interface UpdateGatewayInformationInput {
  GatewayArn: string;
  GatewayDisplayName?: string;
}
export const UpdateGatewayInformationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GatewayArn: S.String,
    GatewayDisplayName: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateGatewayInformationInput",
}) as any as S.Schema<UpdateGatewayInformationInput>;
export interface UpdateGatewayInformationOutput {
  GatewayArn?: string;
}
export const UpdateGatewayInformationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GatewayArn: S.optional(S.String) }),
).annotate({
  identifier: "UpdateGatewayInformationOutput",
}) as any as S.Schema<UpdateGatewayInformationOutput>;
export interface UpdateGatewaySoftwareNowInput {
  GatewayArn: string;
}
export const UpdateGatewaySoftwareNowInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GatewayArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateGatewaySoftwareNowInput",
}) as any as S.Schema<UpdateGatewaySoftwareNowInput>;
export interface UpdateGatewaySoftwareNowOutput {
  GatewayArn?: string;
}
export const UpdateGatewaySoftwareNowOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GatewayArn: S.optional(S.String) }),
).annotate({
  identifier: "UpdateGatewaySoftwareNowOutput",
}) as any as S.Schema<UpdateGatewaySoftwareNowOutput>;
export interface UpdateHypervisorInput {
  HypervisorArn: string;
  Host?: string;
  Username?: string | redacted.Redacted<string>;
  Password?: string | redacted.Redacted<string>;
  Name?: string;
  LogGroupArn?: string;
}
export const UpdateHypervisorInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HypervisorArn: S.String,
    Host: S.optional(S.String),
    Username: S.optional(SensitiveString),
    Password: S.optional(SensitiveString),
    Name: S.optional(S.String),
    LogGroupArn: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateHypervisorInput",
}) as any as S.Schema<UpdateHypervisorInput>;
export interface UpdateHypervisorOutput {
  HypervisorArn?: string;
}
export const UpdateHypervisorOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ HypervisorArn: S.optional(S.String) }),
).annotate({
  identifier: "UpdateHypervisorOutput",
}) as any as S.Schema<UpdateHypervisorOutput>;
export type AssociateGatewayToServerError = ConflictException | CommonErrors;
/**
 * Associates a backup gateway with your server. After you complete the association process,
 * you can back up and restore your VMs through the gateway.
 */
export const associateGatewayToServer: API.OperationMethod<
  AssociateGatewayToServerInput,
  AssociateGatewayToServerOutput,
  AssociateGatewayToServerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateGatewayToServerInput,
  output: AssociateGatewayToServerOutput,
  errors: [ConflictException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateGatewayToServer",
}));

export type CreateGatewayError = CommonErrors;
/**
 * Creates a backup gateway. After you create a gateway, you can associate it with a server
 * using the `AssociateGatewayToServer` operation.
 */
export const createGateway: API.OperationMethod<
  CreateGatewayInput,
  CreateGatewayOutput,
  CreateGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateGatewayInput,
  output: CreateGatewayOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGateway",
}));

export type DeleteGatewayError = ResourceNotFoundException | CommonErrors;
/**
 * Deletes a backup gateway.
 */
export const deleteGateway: API.OperationMethod<
  DeleteGatewayInput,
  DeleteGatewayOutput,
  DeleteGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteGatewayInput,
  output: DeleteGatewayOutput,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGateway",
}));

export type DeleteHypervisorError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a hypervisor.
 */
export const deleteHypervisor: API.OperationMethod<
  DeleteHypervisorInput,
  DeleteHypervisorOutput,
  DeleteHypervisorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteHypervisorInput,
  output: DeleteHypervisorOutput,
  errors: [AccessDeniedException, ConflictException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteHypervisor",
}));

export type DisassociateGatewayFromServerError =
  | ConflictException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disassociates a backup gateway from the specified server. After the disassociation process
 * finishes, the gateway can no longer access the virtual machines on the server.
 */
export const disassociateGatewayFromServer: API.OperationMethod<
  DisassociateGatewayFromServerInput,
  DisassociateGatewayFromServerOutput,
  DisassociateGatewayFromServerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateGatewayFromServerInput,
  output: DisassociateGatewayFromServerOutput,
  errors: [ConflictException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateGatewayFromServer",
}));

export type GetBandwidthRateLimitScheduleError =
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves the bandwidth rate limit schedule for a specified gateway.
 * By default, gateways do not have bandwidth rate limit schedules, which means
 * no bandwidth rate limiting is in effect. Use this to get a gateway's
 * bandwidth rate limit schedule.
 */
export const getBandwidthRateLimitSchedule: API.OperationMethod<
  GetBandwidthRateLimitScheduleInput,
  GetBandwidthRateLimitScheduleOutput,
  GetBandwidthRateLimitScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetBandwidthRateLimitScheduleInput,
  output: GetBandwidthRateLimitScheduleOutput,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBandwidthRateLimitSchedule",
}));

export type GetGatewayError = ResourceNotFoundException | CommonErrors;
/**
 * By providing the ARN (Amazon Resource Name), this
 * API returns the gateway.
 */
export const getGateway: API.OperationMethod<
  GetGatewayInput,
  GetGatewayOutput,
  GetGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetGatewayInput,
  output: GetGatewayOutput,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGateway",
}));

export type GetHypervisorError = ResourceNotFoundException | CommonErrors;
/**
 * This action requests information about the specified hypervisor to which the gateway will connect.
 * A hypervisor is hardware, software, or firmware that creates and manages virtual machines,
 * and allocates resources to them.
 */
export const getHypervisor: API.OperationMethod<
  GetHypervisorInput,
  GetHypervisorOutput,
  GetHypervisorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetHypervisorInput,
  output: GetHypervisorOutput,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetHypervisor",
}));

export type GetHypervisorPropertyMappingsError =
  | ResourceNotFoundException
  | CommonErrors;
/**
 * This action retrieves the property mappings for the specified hypervisor.
 * A hypervisor property mapping displays the relationship of entity properties
 * available from the hypervisor to the properties available in Amazon Web Services.
 */
export const getHypervisorPropertyMappings: API.OperationMethod<
  GetHypervisorPropertyMappingsInput,
  GetHypervisorPropertyMappingsOutput,
  GetHypervisorPropertyMappingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetHypervisorPropertyMappingsInput,
  output: GetHypervisorPropertyMappingsOutput,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetHypervisorPropertyMappings",
}));

export type GetVirtualMachineError = ResourceNotFoundException | CommonErrors;
/**
 * By providing the ARN (Amazon Resource Name), this API returns the virtual machine.
 */
export const getVirtualMachine: API.OperationMethod<
  GetVirtualMachineInput,
  GetVirtualMachineOutput,
  GetVirtualMachineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetVirtualMachineInput,
  output: GetVirtualMachineOutput,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVirtualMachine",
}));

export type ImportHypervisorConfigurationError =
  | AccessDeniedException
  | ConflictException
  | CommonErrors;
/**
 * Connect to a hypervisor by importing its configuration.
 */
export const importHypervisorConfiguration: API.OperationMethod<
  ImportHypervisorConfigurationInput,
  ImportHypervisorConfigurationOutput,
  ImportHypervisorConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ImportHypervisorConfigurationInput,
  output: ImportHypervisorConfigurationOutput,
  errors: [AccessDeniedException, ConflictException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportHypervisorConfiguration",
}));

export type ListGatewaysError = CommonErrors;
/**
 * Lists backup gateways owned by an Amazon Web Services account in an Amazon Web Services Region. The returned list is ordered by gateway Amazon Resource Name (ARN).
 */
export const listGateways: API.PaginatedOperationMethod<
  ListGatewaysInput,
  ListGatewaysOutput,
  ListGatewaysError,
  Credentials | HttpClient.HttpClient,
  Gateway
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListGatewaysInput,
  output: ListGatewaysOutput,
  errors: [],
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

export type ListHypervisorsError = CommonErrors;
/**
 * Lists your hypervisors.
 */
export const listHypervisors: API.PaginatedOperationMethod<
  ListHypervisorsInput,
  ListHypervisorsOutput,
  ListHypervisorsError,
  Credentials | HttpClient.HttpClient,
  Hypervisor
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListHypervisorsInput,
  output: ListHypervisorsOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListHypervisors",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Hypervisors",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError = ResourceNotFoundException | CommonErrors;
/**
 * Lists the tags applied to the resource identified by its Amazon Resource Name
 * (ARN).
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceInput,
  output: ListTagsForResourceOutput,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListVirtualMachinesError = CommonErrors;
/**
 * Lists your virtual machines.
 */
export const listVirtualMachines: API.PaginatedOperationMethod<
  ListVirtualMachinesInput,
  ListVirtualMachinesOutput,
  ListVirtualMachinesError,
  Credentials | HttpClient.HttpClient,
  VirtualMachine
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListVirtualMachinesInput,
  output: ListVirtualMachinesOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVirtualMachines",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "VirtualMachines",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type PutBandwidthRateLimitScheduleError =
  | ResourceNotFoundException
  | CommonErrors;
/**
 * This action sets the bandwidth rate limit schedule for a specified gateway.
 * By default, gateways do not have a bandwidth rate limit schedule, which means
 * no bandwidth rate limiting is in effect. Use this to initiate a
 * gateway's bandwidth rate limit schedule.
 */
export const putBandwidthRateLimitSchedule: API.OperationMethod<
  PutBandwidthRateLimitScheduleInput,
  PutBandwidthRateLimitScheduleOutput,
  PutBandwidthRateLimitScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutBandwidthRateLimitScheduleInput,
  output: PutBandwidthRateLimitScheduleOutput,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutBandwidthRateLimitSchedule",
}));

export type PutHypervisorPropertyMappingsError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * This action sets the property mappings for the specified hypervisor.
 * A hypervisor property mapping displays the relationship of entity properties
 * available from the hypervisor to the properties available in Amazon Web Services.
 */
export const putHypervisorPropertyMappings: API.OperationMethod<
  PutHypervisorPropertyMappingsInput,
  PutHypervisorPropertyMappingsOutput,
  PutHypervisorPropertyMappingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutHypervisorPropertyMappingsInput,
  output: PutHypervisorPropertyMappingsOutput,
  errors: [AccessDeniedException, ConflictException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutHypervisorPropertyMappings",
}));

export type PutMaintenanceStartTimeError =
  | ConflictException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Set the maintenance start time for a gateway.
 */
export const putMaintenanceStartTime: API.OperationMethod<
  PutMaintenanceStartTimeInput,
  PutMaintenanceStartTimeOutput,
  PutMaintenanceStartTimeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutMaintenanceStartTimeInput,
  output: PutMaintenanceStartTimeOutput,
  errors: [ConflictException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutMaintenanceStartTime",
}));

export type StartVirtualMachinesMetadataSyncError =
  | AccessDeniedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * This action sends a request to sync metadata across the specified virtual machines.
 */
export const startVirtualMachinesMetadataSync: API.OperationMethod<
  StartVirtualMachinesMetadataSyncInput,
  StartVirtualMachinesMetadataSyncOutput,
  StartVirtualMachinesMetadataSyncError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartVirtualMachinesMetadataSyncInput,
  output: StartVirtualMachinesMetadataSyncOutput,
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartVirtualMachinesMetadataSync",
}));

export type TagResourceError = ResourceNotFoundException | CommonErrors;
/**
 * Tag the resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceOutput,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceInput,
  output: TagResourceOutput,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type TestHypervisorConfigurationError =
  | ConflictException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Tests your hypervisor configuration to validate that backup gateway can connect with the
 * hypervisor and its resources.
 */
export const testHypervisorConfiguration: API.OperationMethod<
  TestHypervisorConfigurationInput,
  TestHypervisorConfigurationOutput,
  TestHypervisorConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TestHypervisorConfigurationInput,
  output: TestHypervisorConfigurationOutput,
  errors: [ConflictException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestHypervisorConfiguration",
}));

export type UntagResourceError = ResourceNotFoundException | CommonErrors;
/**
 * Removes tags from the resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceInput,
  output: UntagResourceOutput,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateGatewayInformationError =
  | ConflictException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates a gateway's name. Specify which gateway to update using the Amazon Resource Name
 * (ARN) of the gateway in your request.
 */
export const updateGatewayInformation: API.OperationMethod<
  UpdateGatewayInformationInput,
  UpdateGatewayInformationOutput,
  UpdateGatewayInformationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateGatewayInformationInput,
  output: UpdateGatewayInformationOutput,
  errors: [ConflictException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGatewayInformation",
}));

export type UpdateGatewaySoftwareNowError =
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates the gateway virtual machine (VM) software.
 * The request immediately triggers the software update.
 *
 * When you make this request, you get a `200 OK`
 * success response immediately. However, it might take some
 * time for the update to complete.
 */
export const updateGatewaySoftwareNow: API.OperationMethod<
  UpdateGatewaySoftwareNowInput,
  UpdateGatewaySoftwareNowOutput,
  UpdateGatewaySoftwareNowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateGatewaySoftwareNowInput,
  output: UpdateGatewaySoftwareNowOutput,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGatewaySoftwareNow",
}));

export type UpdateHypervisorError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates a hypervisor metadata, including its host, username, and password. Specify which
 * hypervisor to update using the Amazon Resource Name (ARN) of the hypervisor in your
 * request.
 */
export const updateHypervisor: API.OperationMethod<
  UpdateHypervisorInput,
  UpdateHypervisorOutput,
  UpdateHypervisorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateHypervisorInput,
  output: UpdateHypervisorOutput,
  errors: [AccessDeniedException, ConflictException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateHypervisor",
}));
