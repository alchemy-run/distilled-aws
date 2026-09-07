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
const ns = T.XmlNamespace("http://ecs.amazonaws.com/doc/2014-11-13/");
const svc = T.AwsApiService({
  sdkId: "ECS",
  serviceShapeName: "AmazonEC2ContainerServiceV20141113",
});
const auth = T.AwsAuthSigv4({ name: "ecs" });
const ver = T.ServiceVersion("2014-11-13");
const proto = T.AwsProtocolsAwsJson1_1();
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
              `https://ecs-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://ecs-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://ecs.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://ecs.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class AttributeLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<AttributeLimitExceededException>()(
    "AttributeLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withQuotaError) {}
export class BlockedException
  extends /*@__PURE__*/ S.TaggedError<BlockedException>()("BlockedException", {
    message: S.optional(S.String).pipe(T.ErrorMessage()),
  }).pipe(C.withBadRequestError) {}
export class ClientException
  extends /*@__PURE__*/ S.TaggedError<ClientException>()("ClientException", {
    message: S.optional(S.String).pipe(T.ErrorMessage()),
  }).pipe(C.withBadRequestError) {}
export class ClusterContainsCapacityProviderException
  extends /*@__PURE__*/ S.TaggedError<ClusterContainsCapacityProviderException>()(
    "ClusterContainsCapacityProviderException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withDependencyViolationError) {}
export class ClusterContainsContainerInstancesException
  extends /*@__PURE__*/ S.TaggedError<ClusterContainsContainerInstancesException>()(
    "ClusterContainsContainerInstancesException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withDependencyViolationError) {}
export class ClusterContainsServicesException
  extends /*@__PURE__*/ S.TaggedError<ClusterContainsServicesException>()(
    "ClusterContainsServicesException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withDependencyViolationError) {}
export class ClusterContainsTasksException
  extends /*@__PURE__*/ S.TaggedError<ClusterContainsTasksException>()(
    "ClusterContainsTasksException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withDependencyViolationError) {}
export class ClusterNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ClusterNotFoundException>()(
    "ClusterNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withNotFoundError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      resourceIds: S.optional(
        S.suspend(() => ResourceIds).annotate({ identifier: "ResourceIds" }),
      ),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
  ).pipe(C.withConflictError) {}
export class DaemonNotActiveException
  extends /*@__PURE__*/ S.TaggedError<DaemonNotActiveException>()(
    "DaemonNotActiveException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withConflictError) {}
export class DaemonNotFoundException
  extends /*@__PURE__*/ S.TaggedError<DaemonNotFoundException>()(
    "DaemonNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withNotFoundError) {}
export class InvalidParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterException>()(
    "InvalidParameterException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withBadRequestError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withQuotaError) {}
export class MissingVersionException
  extends /*@__PURE__*/ S.TaggedError<MissingVersionException>()(
    "MissingVersionException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withBadRequestError) {}
export class NamespaceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<NamespaceNotFoundException>()(
    "NamespaceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withNotFoundError) {}
export class NoUpdateAvailableException
  extends /*@__PURE__*/ S.TaggedError<NoUpdateAvailableException>()(
    "NoUpdateAvailableException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class PlatformTaskDefinitionIncompatibilityException
  extends /*@__PURE__*/ S.TaggedError<PlatformTaskDefinitionIncompatibilityException>()(
    "PlatformTaskDefinitionIncompatibilityException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withBadRequestError) {}
export class PlatformUnknownException
  extends /*@__PURE__*/ S.TaggedError<PlatformUnknownException>()(
    "PlatformUnknownException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withBadRequestError) {}
export class ResourceInUseException
  extends /*@__PURE__*/ S.TaggedError<ResourceInUseException>()(
    "ResourceInUseException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withConflictError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withNotFoundError) {}
export class ServerException
  extends /*@__PURE__*/ S.TaggedError<ServerException>()("ServerException", {
    message: S.optional(S.String).pipe(T.ErrorMessage()),
  }).pipe(C.withServerError, C.withRetryableError) {}
export class ServiceDeploymentNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ServiceDeploymentNotFoundException>()(
    "ServiceDeploymentNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withNotFoundError) {}
export class ServiceNotActiveException
  extends /*@__PURE__*/ S.TaggedError<ServiceNotActiveException>()(
    "ServiceNotActiveException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withConflictError) {}
export class ServiceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ServiceNotFoundException>()(
    "ServiceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withNotFoundError) {}
export class TargetNotConnectedException
  extends /*@__PURE__*/ S.TaggedError<TargetNotConnectedException>()(
    "TargetNotConnectedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withConflictError) {}
export class TargetNotFoundException
  extends /*@__PURE__*/ S.TaggedError<TargetNotFoundException>()(
    "TargetNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withNotFoundError) {}
export class TaskSetNotFoundException
  extends /*@__PURE__*/ S.TaggedError<TaskSetNotFoundException>()(
    "TaskSetNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withNotFoundError) {}
export class UnsupportedFeatureException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedFeatureException>()(
    "UnsupportedFeatureException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withBadRequestError) {}
export class UpdateInProgressException
  extends /*@__PURE__*/ S.TaggedError<UpdateInProgressException>()(
    "UpdateInProgressException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withConflictError, C.withRetryableError) {}
export type DeploymentLifecycleHookAction =
  | "ROLLBACK"
  | "CONTINUE"
  | (string & {});
export const DeploymentLifecycleHookAction = S.String;

export interface ContinueServiceDeploymentRequest {
  serviceDeploymentArn: string;
  hookId: string;
  action?: DeploymentLifecycleHookAction;
}
export const ContinueServiceDeploymentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceDeploymentArn: S.String,
    hookId: S.String,
    action: S.optional(DeploymentLifecycleHookAction),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ContinueServiceDeploymentRequest",
}) as any as S.Schema<ContinueServiceDeploymentRequest>;
export interface ContinueServiceDeploymentResponse {
  serviceDeploymentArn?: string;
}
export const ContinueServiceDeploymentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ serviceDeploymentArn: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "ContinueServiceDeploymentResponse",
}) as any as S.Schema<ContinueServiceDeploymentResponse>;
export type ManagedScalingStatus = "ENABLED" | "DISABLED" | (string & {});
export const ManagedScalingStatus = S.String;

export type ManagedScalingTargetCapacity = number;
export type ManagedScalingStepSize = number;
export type ManagedScalingInstanceWarmupPeriod = number;
export interface ManagedScaling {
  status?: ManagedScalingStatus;
  targetCapacity?: number;
  minimumScalingStepSize?: number;
  maximumScalingStepSize?: number;
  instanceWarmupPeriod?: number;
}
export const ManagedScaling = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.optional(ManagedScalingStatus),
    targetCapacity: S.optional(S.Number),
    minimumScalingStepSize: S.optional(S.Number),
    maximumScalingStepSize: S.optional(S.Number),
    instanceWarmupPeriod: S.optional(S.Number),
  }),
).annotate({ identifier: "ManagedScaling" }) as any as S.Schema<ManagedScaling>;
export type ManagedTerminationProtection =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export const ManagedTerminationProtection = S.String;

export type ManagedDraining = "ENABLED" | "DISABLED" | (string & {});
export const ManagedDraining = S.String;

export interface AutoScalingGroupProvider {
  autoScalingGroupArn: string;
  managedScaling?: ManagedScaling;
  managedTerminationProtection?: ManagedTerminationProtection;
  managedDraining?: ManagedDraining;
}
export const AutoScalingGroupProvider = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    autoScalingGroupArn: S.String,
    managedScaling: S.optional(ManagedScaling),
    managedTerminationProtection: S.optional(ManagedTerminationProtection),
    managedDraining: S.optional(ManagedDraining),
  }),
).annotate({
  identifier: "AutoScalingGroupProvider",
}) as any as S.Schema<AutoScalingGroupProvider>;
export type StringList = string[];
export const StringList = /*@__PURE__*/ S.Array(S.String);
export interface ManagedInstancesNetworkConfiguration {
  subnets?: string[];
  securityGroups?: string[];
}
export const ManagedInstancesNetworkConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      subnets: S.optional(StringList),
      securityGroups: S.optional(StringList),
    }),
).annotate({
  identifier: "ManagedInstancesNetworkConfiguration",
}) as any as S.Schema<ManagedInstancesNetworkConfiguration>;
export type TaskVolumeStorageGiB = number;
export interface ManagedInstancesStorageConfiguration {
  storageSizeGiB?: number;
}
export const ManagedInstancesStorageConfiguration = /*@__PURE__*/ S.suspend(
  () => S.Struct({ storageSizeGiB: S.optional(S.Number) }),
).annotate({
  identifier: "ManagedInstancesStorageConfiguration",
}) as any as S.Schema<ManagedInstancesStorageConfiguration>;
export interface ManagedInstancesLocalStorageConfiguration {
  useLocalStorage?: boolean;
}
export const ManagedInstancesLocalStorageConfiguration =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ useLocalStorage: S.optional(S.Boolean) }),
  ).annotate({
    identifier: "ManagedInstancesLocalStorageConfiguration",
  }) as any as S.Schema<ManagedInstancesLocalStorageConfiguration>;
export type ManagedInstancesMonitoringOptions =
  | "BASIC"
  | "DETAILED"
  | (string & {});
export const ManagedInstancesMonitoringOptions = S.String;

export type CapacityOptionType =
  | "ON_DEMAND"
  | "SPOT"
  | "RESERVED"
  | (string & {});
export const CapacityOptionType = S.String;

export type BoxedBoolean = boolean;
export type BoxedInteger = number;
export interface VCpuCountRangeRequest {
  min: number;
  max?: number;
}
export const VCpuCountRangeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ min: S.Number, max: S.optional(S.Number) }),
).annotate({
  identifier: "VCpuCountRangeRequest",
}) as any as S.Schema<VCpuCountRangeRequest>;
export interface MemoryMiBRequest {
  min: number;
  max?: number;
}
export const MemoryMiBRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ min: S.Number, max: S.optional(S.Number) }),
).annotate({
  identifier: "MemoryMiBRequest",
}) as any as S.Schema<MemoryMiBRequest>;
export type CpuManufacturer =
  | "intel"
  | "amd"
  | "amazon-web-services"
  | (string & {});
export const CpuManufacturer = S.String;

export type CpuManufacturerSet = CpuManufacturer[];
export const CpuManufacturerSet = /*@__PURE__*/ S.Array(
  CpuManufacturer.pipe(T.XmlName("item")),
);
export type BoxedDouble = number;
export interface MemoryGiBPerVCpuRequest {
  min?: number;
  max?: number;
}
export const MemoryGiBPerVCpuRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ min: S.optional(S.Number), max: S.optional(S.Number) }),
).annotate({
  identifier: "MemoryGiBPerVCpuRequest",
}) as any as S.Schema<MemoryGiBPerVCpuRequest>;
export type ExcludedInstanceType = string;
export type ExcludedInstanceTypeSet = string[];
export const ExcludedInstanceTypeSet = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("item")),
);
export type InstanceGeneration = "current" | "previous" | (string & {});
export const InstanceGeneration = S.String;

export type InstanceGenerationSet = InstanceGeneration[];
export const InstanceGenerationSet = /*@__PURE__*/ S.Array(
  InstanceGeneration.pipe(T.XmlName("item")),
);
export type BareMetal = "included" | "required" | "excluded" | (string & {});
export const BareMetal = S.String;

export type BurstablePerformance =
  | "included"
  | "required"
  | "excluded"
  | (string & {});
export const BurstablePerformance = S.String;

export interface NetworkInterfaceCountRequest {
  min?: number;
  max?: number;
}
export const NetworkInterfaceCountRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ min: S.optional(S.Number), max: S.optional(S.Number) }),
).annotate({
  identifier: "NetworkInterfaceCountRequest",
}) as any as S.Schema<NetworkInterfaceCountRequest>;
export type LocalStorage = "included" | "required" | "excluded" | (string & {});
export const LocalStorage = S.String;

export type LocalStorageType = "hdd" | "ssd" | (string & {});
export const LocalStorageType = S.String;

export type LocalStorageTypeSet = LocalStorageType[];
export const LocalStorageTypeSet = /*@__PURE__*/ S.Array(
  LocalStorageType.pipe(T.XmlName("item")),
);
export interface TotalLocalStorageGBRequest {
  min?: number;
  max?: number;
}
export const TotalLocalStorageGBRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ min: S.optional(S.Number), max: S.optional(S.Number) }),
).annotate({
  identifier: "TotalLocalStorageGBRequest",
}) as any as S.Schema<TotalLocalStorageGBRequest>;
export interface BaselineEbsBandwidthMbpsRequest {
  min?: number;
  max?: number;
}
export const BaselineEbsBandwidthMbpsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ min: S.optional(S.Number), max: S.optional(S.Number) }),
).annotate({
  identifier: "BaselineEbsBandwidthMbpsRequest",
}) as any as S.Schema<BaselineEbsBandwidthMbpsRequest>;
export type AcceleratorType = "gpu" | "fpga" | "inference" | (string & {});
export const AcceleratorType = S.String;

export type AcceleratorTypeSet = AcceleratorType[];
export const AcceleratorTypeSet = /*@__PURE__*/ S.Array(
  AcceleratorType.pipe(T.XmlName("item")),
);
export interface AcceleratorCountRequest {
  min?: number;
  max?: number;
}
export const AcceleratorCountRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ min: S.optional(S.Number), max: S.optional(S.Number) }),
).annotate({
  identifier: "AcceleratorCountRequest",
}) as any as S.Schema<AcceleratorCountRequest>;
export type AcceleratorManufacturer =
  | "amazon-web-services"
  | "amd"
  | "nvidia"
  | "xilinx"
  | "habana"
  | (string & {});
export const AcceleratorManufacturer = S.String;

export type AcceleratorManufacturerSet = AcceleratorManufacturer[];
export const AcceleratorManufacturerSet = /*@__PURE__*/ S.Array(
  AcceleratorManufacturer.pipe(T.XmlName("item")),
);
export type AcceleratorName =
  | "a100"
  | "inferentia"
  | "k520"
  | "k80"
  | "m60"
  | "radeon-pro-v520"
  | "t4"
  | "vu9p"
  | "v100"
  | "a10g"
  | "h100"
  | "t4g"
  | (string & {});
export const AcceleratorName = S.String;

export type AcceleratorNameSet = AcceleratorName[];
export const AcceleratorNameSet = /*@__PURE__*/ S.Array(
  AcceleratorName.pipe(T.XmlName("item")),
);
export interface AcceleratorTotalMemoryMiBRequest {
  min?: number;
  max?: number;
}
export const AcceleratorTotalMemoryMiBRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ min: S.optional(S.Number), max: S.optional(S.Number) }),
).annotate({
  identifier: "AcceleratorTotalMemoryMiBRequest",
}) as any as S.Schema<AcceleratorTotalMemoryMiBRequest>;
export interface NetworkBandwidthGbpsRequest {
  min?: number;
  max?: number;
}
export const NetworkBandwidthGbpsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ min: S.optional(S.Number), max: S.optional(S.Number) }),
).annotate({
  identifier: "NetworkBandwidthGbpsRequest",
}) as any as S.Schema<NetworkBandwidthGbpsRequest>;
export type AllowedInstanceType = string;
export type AllowedInstanceTypeSet = string[];
export const AllowedInstanceTypeSet = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("item")),
);
export interface InstanceRequirementsRequest {
  vCpuCount: VCpuCountRangeRequest;
  memoryMiB: MemoryMiBRequest;
  cpuManufacturers?: CpuManufacturer[];
  memoryGiBPerVCpu?: MemoryGiBPerVCpuRequest;
  excludedInstanceTypes?: string[];
  instanceGenerations?: InstanceGeneration[];
  spotMaxPricePercentageOverLowestPrice?: number;
  onDemandMaxPricePercentageOverLowestPrice?: number;
  bareMetal?: BareMetal;
  burstablePerformance?: BurstablePerformance;
  requireHibernateSupport?: boolean;
  networkInterfaceCount?: NetworkInterfaceCountRequest;
  localStorage?: LocalStorage;
  localStorageTypes?: LocalStorageType[];
  totalLocalStorageGB?: TotalLocalStorageGBRequest;
  baselineEbsBandwidthMbps?: BaselineEbsBandwidthMbpsRequest;
  acceleratorTypes?: AcceleratorType[];
  acceleratorCount?: AcceleratorCountRequest;
  acceleratorManufacturers?: AcceleratorManufacturer[];
  acceleratorNames?: AcceleratorName[];
  acceleratorTotalMemoryMiB?: AcceleratorTotalMemoryMiBRequest;
  networkBandwidthGbps?: NetworkBandwidthGbpsRequest;
  allowedInstanceTypes?: string[];
  maxSpotPriceAsPercentageOfOptimalOnDemandPrice?: number;
}
export const InstanceRequirementsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vCpuCount: VCpuCountRangeRequest,
    memoryMiB: MemoryMiBRequest,
    cpuManufacturers: S.optional(CpuManufacturerSet).pipe(
      T.XmlName("CpuManufacturer"),
    ),
    memoryGiBPerVCpu: S.optional(MemoryGiBPerVCpuRequest),
    excludedInstanceTypes: S.optional(ExcludedInstanceTypeSet).pipe(
      T.XmlName("ExcludedInstanceType"),
    ),
    instanceGenerations: S.optional(InstanceGenerationSet).pipe(
      T.XmlName("InstanceGeneration"),
    ),
    spotMaxPricePercentageOverLowestPrice: S.optional(S.Number),
    onDemandMaxPricePercentageOverLowestPrice: S.optional(S.Number),
    bareMetal: S.optional(BareMetal),
    burstablePerformance: S.optional(BurstablePerformance),
    requireHibernateSupport: S.optional(S.Boolean),
    networkInterfaceCount: S.optional(NetworkInterfaceCountRequest),
    localStorage: S.optional(LocalStorage),
    localStorageTypes: S.optional(LocalStorageTypeSet).pipe(
      T.XmlName("LocalStorageType"),
    ),
    totalLocalStorageGB: S.optional(TotalLocalStorageGBRequest),
    baselineEbsBandwidthMbps: S.optional(BaselineEbsBandwidthMbpsRequest),
    acceleratorTypes: S.optional(AcceleratorTypeSet).pipe(
      T.XmlName("AcceleratorType"),
    ),
    acceleratorCount: S.optional(AcceleratorCountRequest),
    acceleratorManufacturers: S.optional(AcceleratorManufacturerSet).pipe(
      T.XmlName("AcceleratorManufacturer"),
    ),
    acceleratorNames: S.optional(AcceleratorNameSet).pipe(
      T.XmlName("AcceleratorName"),
    ),
    acceleratorTotalMemoryMiB: S.optional(AcceleratorTotalMemoryMiBRequest),
    networkBandwidthGbps: S.optional(NetworkBandwidthGbpsRequest),
    allowedInstanceTypes: S.optional(AllowedInstanceTypeSet).pipe(
      T.XmlName("AllowedInstanceType"),
    ),
    maxSpotPriceAsPercentageOfOptimalOnDemandPrice: S.optional(S.Number),
  }),
).annotate({
  identifier: "InstanceRequirementsRequest",
}) as any as S.Schema<InstanceRequirementsRequest>;
export type CapacityReservationPreference =
  | "RESERVATIONS_ONLY"
  | "RESERVATIONS_FIRST"
  | "RESERVATIONS_EXCLUDED"
  | (string & {});
export const CapacityReservationPreference = S.String;

export interface CapacityReservationRequest {
  reservationGroupArn?: string;
  reservationPreference?: CapacityReservationPreference;
}
export const CapacityReservationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    reservationGroupArn: S.optional(S.String),
    reservationPreference: S.optional(CapacityReservationPreference),
  }),
).annotate({
  identifier: "CapacityReservationRequest",
}) as any as S.Schema<CapacityReservationRequest>;
export interface InstanceLaunchTemplate {
  ec2InstanceProfileArn: string;
  networkConfiguration: ManagedInstancesNetworkConfiguration;
  storageConfiguration?: ManagedInstancesStorageConfiguration;
  localStorageConfiguration?: ManagedInstancesLocalStorageConfiguration;
  monitoring?: ManagedInstancesMonitoringOptions;
  capacityOptionType?: CapacityOptionType;
  instanceMetadataTagsPropagation?: boolean;
  instanceRequirements?: InstanceRequirementsRequest;
  fipsEnabled?: boolean;
  capacityReservations?: CapacityReservationRequest;
}
export const InstanceLaunchTemplate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ec2InstanceProfileArn: S.String,
    networkConfiguration: ManagedInstancesNetworkConfiguration,
    storageConfiguration: S.optional(ManagedInstancesStorageConfiguration),
    localStorageConfiguration: S.optional(
      ManagedInstancesLocalStorageConfiguration,
    ),
    monitoring: S.optional(ManagedInstancesMonitoringOptions),
    capacityOptionType: S.optional(CapacityOptionType),
    instanceMetadataTagsPropagation: S.optional(S.Boolean),
    instanceRequirements: S.optional(InstanceRequirementsRequest),
    fipsEnabled: S.optional(S.Boolean),
    capacityReservations: S.optional(CapacityReservationRequest),
  }),
).annotate({
  identifier: "InstanceLaunchTemplate",
}) as any as S.Schema<InstanceLaunchTemplate>;
export type PropagateMITags = "CAPACITY_PROVIDER" | "NONE" | (string & {});
export const PropagateMITags = S.String;

export interface InfrastructureOptimization {
  scaleInAfter?: number;
}
export const InfrastructureOptimization = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ scaleInAfter: S.optional(S.Number) }),
).annotate({
  identifier: "InfrastructureOptimization",
}) as any as S.Schema<InfrastructureOptimization>;
export type AutoRepairActionsStatus = "ENABLED" | "DISABLED" | (string & {});
export const AutoRepairActionsStatus = S.String;

export interface AutoRepairConfiguration {
  actionsStatus?: AutoRepairActionsStatus;
}
export const AutoRepairConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ actionsStatus: S.optional(AutoRepairActionsStatus) }),
).annotate({
  identifier: "AutoRepairConfiguration",
}) as any as S.Schema<AutoRepairConfiguration>;
export interface CreateManagedInstancesProviderConfiguration {
  infrastructureRoleArn: string;
  instanceLaunchTemplate: InstanceLaunchTemplate;
  propagateTags?: PropagateMITags;
  infrastructureOptimization?: InfrastructureOptimization;
  autoRepairConfiguration?: AutoRepairConfiguration;
}
export const CreateManagedInstancesProviderConfiguration =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      infrastructureRoleArn: S.String,
      instanceLaunchTemplate: InstanceLaunchTemplate,
      propagateTags: S.optional(PropagateMITags),
      infrastructureOptimization: S.optional(InfrastructureOptimization),
      autoRepairConfiguration: S.optional(AutoRepairConfiguration),
    }),
  ).annotate({
    identifier: "CreateManagedInstancesProviderConfiguration",
  }) as any as S.Schema<CreateManagedInstancesProviderConfiguration>;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  key?: string;
  value?: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.optional(S.String), value: S.optional(S.String) }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type Tags = Tag[];
export const Tags = /*@__PURE__*/ S.Array(Tag);
export interface CreateCapacityProviderRequest {
  name: string;
  cluster?: string;
  autoScalingGroupProvider?: AutoScalingGroupProvider;
  managedInstancesProvider?: CreateManagedInstancesProviderConfiguration;
  tags?: Tag[];
}
export const CreateCapacityProviderRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    cluster: S.optional(S.String),
    autoScalingGroupProvider: S.optional(AutoScalingGroupProvider),
    managedInstancesProvider: S.optional(
      CreateManagedInstancesProviderConfiguration,
    ),
    tags: S.optional(Tags),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateCapacityProviderRequest",
}) as any as S.Schema<CreateCapacityProviderRequest>;
export type CapacityProviderStatus =
  | "PROVISIONING"
  | "ACTIVE"
  | "DEPROVISIONING"
  | "INACTIVE"
  | (string & {});
export const CapacityProviderStatus = S.String;

export interface ManagedInstancesProvider {
  infrastructureRoleArn?: string;
  instanceLaunchTemplate?: InstanceLaunchTemplate;
  propagateTags?: PropagateMITags;
  infrastructureOptimization?: InfrastructureOptimization;
  autoRepairConfiguration?: AutoRepairConfiguration;
}
export const ManagedInstancesProvider = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    infrastructureRoleArn: S.optional(S.String),
    instanceLaunchTemplate: S.optional(InstanceLaunchTemplate),
    propagateTags: S.optional(PropagateMITags),
    infrastructureOptimization: S.optional(InfrastructureOptimization),
    autoRepairConfiguration: S.optional(AutoRepairConfiguration),
  }),
).annotate({
  identifier: "ManagedInstancesProvider",
}) as any as S.Schema<ManagedInstancesProvider>;
export type CapacityProviderUpdateStatus =
  | "CREATE_IN_PROGRESS"
  | "CREATE_COMPLETE"
  | "CREATE_FAILED"
  | "DELETE_IN_PROGRESS"
  | "DELETE_COMPLETE"
  | "DELETE_FAILED"
  | "UPDATE_IN_PROGRESS"
  | "UPDATE_COMPLETE"
  | "UPDATE_FAILED"
  | (string & {});
export const CapacityProviderUpdateStatus = S.String;

export type CapacityProviderType =
  | "EC2_AUTOSCALING"
  | "MANAGED_INSTANCES"
  | "FARGATE"
  | "FARGATE_SPOT"
  | (string & {});
export const CapacityProviderType = S.String;

export interface CapacityProvider {
  capacityProviderArn?: string;
  name?: string;
  cluster?: string;
  status?: CapacityProviderStatus;
  autoScalingGroupProvider?: AutoScalingGroupProvider;
  managedInstancesProvider?: ManagedInstancesProvider;
  updateStatus?: CapacityProviderUpdateStatus;
  updateStatusReason?: string;
  tags?: Tag[];
  type?: CapacityProviderType;
}
export const CapacityProvider = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    capacityProviderArn: S.optional(S.String),
    name: S.optional(S.String),
    cluster: S.optional(S.String),
    status: S.optional(CapacityProviderStatus),
    autoScalingGroupProvider: S.optional(AutoScalingGroupProvider),
    managedInstancesProvider: S.optional(ManagedInstancesProvider),
    updateStatus: S.optional(CapacityProviderUpdateStatus),
    updateStatusReason: S.optional(S.String),
    tags: S.optional(Tags),
    type: S.optional(CapacityProviderType),
  }),
).annotate({
  identifier: "CapacityProvider",
}) as any as S.Schema<CapacityProvider>;
export interface CreateCapacityProviderResponse {
  capacityProvider?: CapacityProvider;
}
export const CreateCapacityProviderResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ capacityProvider: S.optional(CapacityProvider) }).pipe(ns),
).annotate({
  identifier: "CreateCapacityProviderResponse",
}) as any as S.Schema<CreateCapacityProviderResponse>;
export type ClusterSettingName = "containerInsights" | (string & {});
export const ClusterSettingName = S.String;

export interface ClusterSetting {
  name?: ClusterSettingName;
  value?: string;
}
export const ClusterSetting = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(ClusterSettingName),
    value: S.optional(S.String),
  }),
).annotate({ identifier: "ClusterSetting" }) as any as S.Schema<ClusterSetting>;
export type ClusterSettings = ClusterSetting[];
export const ClusterSettings = /*@__PURE__*/ S.Array(ClusterSetting);
export type ExecuteCommandLogging =
  | "NONE"
  | "DEFAULT"
  | "OVERRIDE"
  | (string & {});
export const ExecuteCommandLogging = S.String;

export interface ExecuteCommandLogConfiguration {
  cloudWatchLogGroupName?: string;
  cloudWatchEncryptionEnabled?: boolean;
  s3BucketName?: string;
  s3EncryptionEnabled?: boolean;
  s3KeyPrefix?: string;
}
export const ExecuteCommandLogConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cloudWatchLogGroupName: S.optional(S.String),
    cloudWatchEncryptionEnabled: S.optional(S.Boolean),
    s3BucketName: S.optional(S.String),
    s3EncryptionEnabled: S.optional(S.Boolean),
    s3KeyPrefix: S.optional(S.String),
  }),
).annotate({
  identifier: "ExecuteCommandLogConfiguration",
}) as any as S.Schema<ExecuteCommandLogConfiguration>;
export interface ExecuteCommandConfiguration {
  kmsKeyId?: string;
  logging?: ExecuteCommandLogging;
  logConfiguration?: ExecuteCommandLogConfiguration;
}
export const ExecuteCommandConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    kmsKeyId: S.optional(S.String),
    logging: S.optional(ExecuteCommandLogging),
    logConfiguration: S.optional(ExecuteCommandLogConfiguration),
  }),
).annotate({
  identifier: "ExecuteCommandConfiguration",
}) as any as S.Schema<ExecuteCommandConfiguration>;
export interface ManagedStorageConfiguration {
  kmsKeyId?: string;
  fargateEphemeralStorageKmsKeyId?: string;
}
export const ManagedStorageConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    kmsKeyId: S.optional(S.String),
    fargateEphemeralStorageKmsKeyId: S.optional(S.String),
  }),
).annotate({
  identifier: "ManagedStorageConfiguration",
}) as any as S.Schema<ManagedStorageConfiguration>;
export interface ClusterConfiguration {
  executeCommandConfiguration?: ExecuteCommandConfiguration;
  managedStorageConfiguration?: ManagedStorageConfiguration;
}
export const ClusterConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    executeCommandConfiguration: S.optional(ExecuteCommandConfiguration),
    managedStorageConfiguration: S.optional(ManagedStorageConfiguration),
  }),
).annotate({
  identifier: "ClusterConfiguration",
}) as any as S.Schema<ClusterConfiguration>;
export type CapacityProviderStrategyItemWeight = number;
export type CapacityProviderStrategyItemBase = number;
export interface CapacityProviderStrategyItem {
  capacityProvider: string;
  weight?: number;
  base?: number;
}
export const CapacityProviderStrategyItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    capacityProvider: S.String,
    weight: S.optional(S.Number),
    base: S.optional(S.Number),
  }),
).annotate({
  identifier: "CapacityProviderStrategyItem",
}) as any as S.Schema<CapacityProviderStrategyItem>;
export type CapacityProviderStrategy = CapacityProviderStrategyItem[];
export const CapacityProviderStrategy = /*@__PURE__*/ S.Array(
  CapacityProviderStrategyItem,
);
export interface ClusterServiceConnectDefaultsRequest {
  namespace: string;
}
export const ClusterServiceConnectDefaultsRequest = /*@__PURE__*/ S.suspend(
  () => S.Struct({ namespace: S.String }),
).annotate({
  identifier: "ClusterServiceConnectDefaultsRequest",
}) as any as S.Schema<ClusterServiceConnectDefaultsRequest>;
export interface CreateClusterRequest {
  clusterName?: string;
  tags?: Tag[];
  settings?: ClusterSetting[];
  configuration?: ClusterConfiguration;
  capacityProviders?: string[];
  defaultCapacityProviderStrategy?: CapacityProviderStrategyItem[];
  serviceConnectDefaults?: ClusterServiceConnectDefaultsRequest;
}
export const CreateClusterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterName: S.optional(S.String),
    tags: S.optional(Tags),
    settings: S.optional(ClusterSettings),
    configuration: S.optional(ClusterConfiguration),
    capacityProviders: S.optional(StringList),
    defaultCapacityProviderStrategy: S.optional(CapacityProviderStrategy),
    serviceConnectDefaults: S.optional(ClusterServiceConnectDefaultsRequest),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
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
export interface KeyValuePair {
  name?: string;
  value?: string;
}
export const KeyValuePair = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(S.String), value: S.optional(S.String) }),
).annotate({ identifier: "KeyValuePair" }) as any as S.Schema<KeyValuePair>;
export type Statistics = KeyValuePair[];
export const Statistics = /*@__PURE__*/ S.Array(KeyValuePair);
export type AttachmentDetails = KeyValuePair[];
export const AttachmentDetails = /*@__PURE__*/ S.Array(KeyValuePair);
export interface Attachment {
  id?: string;
  type?: string;
  status?: string;
  details?: KeyValuePair[];
}
export const Attachment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    type: S.optional(S.String),
    status: S.optional(S.String),
    details: S.optional(AttachmentDetails),
  }),
).annotate({ identifier: "Attachment" }) as any as S.Schema<Attachment>;
export type Attachments = Attachment[];
export const Attachments = /*@__PURE__*/ S.Array(Attachment);
export interface ClusterServiceConnectDefaults {
  namespace?: string;
}
export const ClusterServiceConnectDefaults = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ namespace: S.optional(S.String) }),
).annotate({
  identifier: "ClusterServiceConnectDefaults",
}) as any as S.Schema<ClusterServiceConnectDefaults>;
export interface Cluster {
  clusterArn?: string;
  clusterName?: string;
  configuration?: ClusterConfiguration;
  status?: string;
  registeredContainerInstancesCount?: number;
  runningTasksCount?: number;
  pendingTasksCount?: number;
  activeServicesCount?: number;
  statistics?: KeyValuePair[];
  tags?: Tag[];
  settings?: ClusterSetting[];
  capacityProviders?: string[];
  defaultCapacityProviderStrategy?: CapacityProviderStrategyItem[];
  attachments?: Attachment[];
  attachmentsStatus?: string;
  serviceConnectDefaults?: ClusterServiceConnectDefaults;
}
export const Cluster = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterArn: S.optional(S.String),
    clusterName: S.optional(S.String),
    configuration: S.optional(ClusterConfiguration),
    status: S.optional(S.String),
    registeredContainerInstancesCount: S.optional(S.Number),
    runningTasksCount: S.optional(S.Number),
    pendingTasksCount: S.optional(S.Number),
    activeServicesCount: S.optional(S.Number),
    statistics: S.optional(Statistics),
    tags: S.optional(Tags),
    settings: S.optional(ClusterSettings),
    capacityProviders: S.optional(StringList),
    defaultCapacityProviderStrategy: S.optional(CapacityProviderStrategy),
    attachments: S.optional(Attachments),
    attachmentsStatus: S.optional(S.String),
    serviceConnectDefaults: S.optional(ClusterServiceConnectDefaults),
  }),
).annotate({ identifier: "Cluster" }) as any as S.Schema<Cluster>;
export interface CreateClusterResponse {
  cluster?: Cluster;
}
export const CreateClusterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ cluster: S.optional(Cluster) }).pipe(ns),
).annotate({
  identifier: "CreateClusterResponse",
}) as any as S.Schema<CreateClusterResponse>;
export type DaemonDrainPercent = number;
export interface DaemonAlarmConfiguration {
  alarmNames?: string[];
  enable?: boolean;
}
export const DaemonAlarmConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    alarmNames: S.optional(StringList),
    enable: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "DaemonAlarmConfiguration",
}) as any as S.Schema<DaemonAlarmConfiguration>;
export interface DaemonDeploymentConfiguration {
  drainPercent?: number;
  alarms?: DaemonAlarmConfiguration;
  bakeTimeInMinutes?: number;
}
export const DaemonDeploymentConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    drainPercent: S.optional(S.Number),
    alarms: S.optional(DaemonAlarmConfiguration),
    bakeTimeInMinutes: S.optional(S.Number),
  }),
).annotate({
  identifier: "DaemonDeploymentConfiguration",
}) as any as S.Schema<DaemonDeploymentConfiguration>;
export type DaemonPropagateTags = "DAEMON" | "NONE" | (string & {});
export const DaemonPropagateTags = S.String;

export interface CreateDaemonRequest {
  daemonName: string;
  clusterArn?: string;
  daemonTaskDefinitionArn: string;
  capacityProviderArns: string[];
  deploymentConfiguration?: DaemonDeploymentConfiguration;
  tags?: Tag[];
  propagateTags?: DaemonPropagateTags;
  enableECSManagedTags?: boolean;
  enableExecuteCommand?: boolean;
  clientToken?: string;
}
export const CreateDaemonRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    daemonName: S.String,
    clusterArn: S.optional(S.String),
    daemonTaskDefinitionArn: S.String,
    capacityProviderArns: StringList,
    deploymentConfiguration: S.optional(DaemonDeploymentConfiguration),
    tags: S.optional(Tags),
    propagateTags: S.optional(DaemonPropagateTags),
    enableECSManagedTags: S.optional(S.Boolean),
    enableExecuteCommand: S.optional(S.Boolean),
    clientToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDaemonRequest",
}) as any as S.Schema<CreateDaemonRequest>;
export type DaemonStatus = "ACTIVE" | "DELETE_IN_PROGRESS" | (string & {});
export const DaemonStatus = S.String;

export interface CreateDaemonResponse {
  daemonArn?: string;
  status?: DaemonStatus;
  createdAt?: Date;
  deploymentArn?: string;
}
export const CreateDaemonResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    daemonArn: S.optional(S.String),
    status: S.optional(DaemonStatus),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    deploymentArn: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "CreateDaemonResponse",
}) as any as S.Schema<CreateDaemonResponse>;
export interface ExpressGatewayServiceAwsLogsConfiguration {
  logGroup: string;
  logStreamPrefix: string;
}
export const ExpressGatewayServiceAwsLogsConfiguration =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ logGroup: S.String, logStreamPrefix: S.String }),
  ).annotate({
    identifier: "ExpressGatewayServiceAwsLogsConfiguration",
  }) as any as S.Schema<ExpressGatewayServiceAwsLogsConfiguration>;
export interface ExpressGatewayRepositoryCredentials {
  credentialsParameter?: string;
}
export const ExpressGatewayRepositoryCredentials = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ credentialsParameter: S.optional(S.String) }),
).annotate({
  identifier: "ExpressGatewayRepositoryCredentials",
}) as any as S.Schema<ExpressGatewayRepositoryCredentials>;
export type EnvironmentVariables = KeyValuePair[];
export const EnvironmentVariables = /*@__PURE__*/ S.Array(KeyValuePair);
export interface Secret {
  name: string;
  valueFrom: string;
}
export const Secret = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, valueFrom: S.String }),
).annotate({ identifier: "Secret" }) as any as S.Schema<Secret>;
export type SecretList = Secret[];
export const SecretList = /*@__PURE__*/ S.Array(Secret);
export interface ExpressGatewayContainer {
  image: string;
  containerPort?: number;
  awsLogsConfiguration?: ExpressGatewayServiceAwsLogsConfiguration;
  repositoryCredentials?: ExpressGatewayRepositoryCredentials;
  command?: string[];
  environment?: KeyValuePair[];
  secrets?: Secret[];
}
export const ExpressGatewayContainer = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    image: S.String,
    containerPort: S.optional(S.Number),
    awsLogsConfiguration: S.optional(ExpressGatewayServiceAwsLogsConfiguration),
    repositoryCredentials: S.optional(ExpressGatewayRepositoryCredentials),
    command: S.optional(StringList),
    environment: S.optional(EnvironmentVariables),
    secrets: S.optional(SecretList),
  }),
).annotate({
  identifier: "ExpressGatewayContainer",
}) as any as S.Schema<ExpressGatewayContainer>;
export interface ExpressGatewayServiceNetworkConfiguration {
  securityGroups?: string[];
  subnets?: string[];
}
export const ExpressGatewayServiceNetworkConfiguration =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      securityGroups: S.optional(StringList),
      subnets: S.optional(StringList),
    }),
  ).annotate({
    identifier: "ExpressGatewayServiceNetworkConfiguration",
  }) as any as S.Schema<ExpressGatewayServiceNetworkConfiguration>;
export type ExpressGatewayServiceScalingMetric =
  | "AVERAGE_CPU"
  | "AVERAGE_MEMORY"
  | "REQUEST_COUNT_PER_TARGET"
  | (string & {});
export const ExpressGatewayServiceScalingMetric = S.String;

export interface ExpressGatewayScalingTarget {
  minTaskCount?: number;
  maxTaskCount?: number;
  autoScalingMetric?: ExpressGatewayServiceScalingMetric;
  autoScalingTargetValue?: number;
}
export const ExpressGatewayScalingTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    minTaskCount: S.optional(S.Number),
    maxTaskCount: S.optional(S.Number),
    autoScalingMetric: S.optional(ExpressGatewayServiceScalingMetric),
    autoScalingTargetValue: S.optional(S.Number),
  }),
).annotate({
  identifier: "ExpressGatewayScalingTarget",
}) as any as S.Schema<ExpressGatewayScalingTarget>;
export interface CreateExpressGatewayServiceRequest {
  executionRoleArn?: string;
  infrastructureRoleArn: string;
  serviceName?: string;
  cluster?: string;
  healthCheckPath?: string;
  primaryContainer?: ExpressGatewayContainer;
  taskRoleArn?: string;
  networkConfiguration?: ExpressGatewayServiceNetworkConfiguration;
  cpu?: string;
  memory?: string;
  scalingTarget?: ExpressGatewayScalingTarget;
  tags?: Tag[];
  taskDefinitionArn?: string;
}
export const CreateExpressGatewayServiceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    executionRoleArn: S.optional(S.String),
    infrastructureRoleArn: S.String,
    serviceName: S.optional(S.String),
    cluster: S.optional(S.String),
    healthCheckPath: S.optional(S.String),
    primaryContainer: S.optional(ExpressGatewayContainer),
    taskRoleArn: S.optional(S.String),
    networkConfiguration: S.optional(ExpressGatewayServiceNetworkConfiguration),
    cpu: S.optional(S.String),
    memory: S.optional(S.String),
    scalingTarget: S.optional(ExpressGatewayScalingTarget),
    tags: S.optional(Tags),
    taskDefinitionArn: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateExpressGatewayServiceRequest",
}) as any as S.Schema<CreateExpressGatewayServiceRequest>;
export type ExpressGatewayServiceStatusCode =
  | "ACTIVE"
  | "DRAINING"
  | "INACTIVE"
  | (string & {});
export const ExpressGatewayServiceStatusCode = S.String;

export interface ExpressGatewayServiceStatus {
  statusCode?: ExpressGatewayServiceStatusCode;
  statusReason?: string;
}
export const ExpressGatewayServiceStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    statusCode: S.optional(ExpressGatewayServiceStatusCode),
    statusReason: S.optional(S.String),
  }),
).annotate({
  identifier: "ExpressGatewayServiceStatus",
}) as any as S.Schema<ExpressGatewayServiceStatus>;
export type AccessType = "PUBLIC" | "PRIVATE" | (string & {});
export const AccessType = S.String;

export interface IngressPathSummary {
  accessType: AccessType;
  endpoint: string;
}
export const IngressPathSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ accessType: AccessType, endpoint: S.String }),
).annotate({
  identifier: "IngressPathSummary",
}) as any as S.Schema<IngressPathSummary>;
export type IngressPathSummaries = IngressPathSummary[];
export const IngressPathSummaries = /*@__PURE__*/ S.Array(IngressPathSummary);
export interface ExpressGatewayServiceConfiguration {
  serviceRevisionArn?: string;
  executionRoleArn?: string;
  taskRoleArn?: string;
  taskDefinitionArn?: string;
  cpu?: string;
  memory?: string;
  networkConfiguration?: ExpressGatewayServiceNetworkConfiguration;
  healthCheckPath?: string;
  primaryContainer?: ExpressGatewayContainer;
  scalingTarget?: ExpressGatewayScalingTarget;
  ingressPaths?: IngressPathSummary[];
  createdAt?: Date;
}
export const ExpressGatewayServiceConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceRevisionArn: S.optional(S.String),
    executionRoleArn: S.optional(S.String),
    taskRoleArn: S.optional(S.String),
    taskDefinitionArn: S.optional(S.String),
    cpu: S.optional(S.String),
    memory: S.optional(S.String),
    networkConfiguration: S.optional(ExpressGatewayServiceNetworkConfiguration),
    healthCheckPath: S.optional(S.String),
    primaryContainer: S.optional(ExpressGatewayContainer),
    scalingTarget: S.optional(ExpressGatewayScalingTarget),
    ingressPaths: S.optional(IngressPathSummaries),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "ExpressGatewayServiceConfiguration",
}) as any as S.Schema<ExpressGatewayServiceConfiguration>;
export type ExpressGatewayServiceConfigurations =
  ExpressGatewayServiceConfiguration[];
export const ExpressGatewayServiceConfigurations = /*@__PURE__*/ S.Array(
  ExpressGatewayServiceConfiguration,
);
export interface ECSExpressGatewayService {
  cluster?: string;
  serviceName?: string;
  serviceArn?: string;
  infrastructureRoleArn?: string;
  status?: ExpressGatewayServiceStatus;
  currentDeployment?: string;
  activeConfigurations?: ExpressGatewayServiceConfiguration[];
  tags?: Tag[];
  createdAt?: Date;
  updatedAt?: Date;
}
export const ECSExpressGatewayService = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cluster: S.optional(S.String),
    serviceName: S.optional(S.String),
    serviceArn: S.optional(S.String),
    infrastructureRoleArn: S.optional(S.String),
    status: S.optional(ExpressGatewayServiceStatus),
    currentDeployment: S.optional(S.String),
    activeConfigurations: S.optional(ExpressGatewayServiceConfigurations),
    tags: S.optional(Tags),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "ECSExpressGatewayService",
}) as any as S.Schema<ECSExpressGatewayService>;
export interface CreateExpressGatewayServiceResponse {
  service?: ECSExpressGatewayService;
}
export const CreateExpressGatewayServiceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ service: S.optional(ECSExpressGatewayService) }).pipe(ns),
).annotate({
  identifier: "CreateExpressGatewayServiceResponse",
}) as any as S.Schema<CreateExpressGatewayServiceResponse>;
export type AvailabilityZoneRebalancing =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export const AvailabilityZoneRebalancing = S.String;

export interface AdvancedConfiguration {
  alternateTargetGroupArn?: string;
  productionListenerRule?: string;
  testListenerRule?: string;
  roleArn?: string;
}
export const AdvancedConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    alternateTargetGroupArn: S.optional(S.String),
    productionListenerRule: S.optional(S.String),
    testListenerRule: S.optional(S.String),
    roleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "AdvancedConfiguration",
}) as any as S.Schema<AdvancedConfiguration>;
export interface LoadBalancer {
  targetGroupArn?: string;
  loadBalancerName?: string;
  containerName?: string;
  containerPort?: number;
  advancedConfiguration?: AdvancedConfiguration;
}
export const LoadBalancer = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    targetGroupArn: S.optional(S.String),
    loadBalancerName: S.optional(S.String),
    containerName: S.optional(S.String),
    containerPort: S.optional(S.Number),
    advancedConfiguration: S.optional(AdvancedConfiguration),
  }),
).annotate({ identifier: "LoadBalancer" }) as any as S.Schema<LoadBalancer>;
export type LoadBalancers = LoadBalancer[];
export const LoadBalancers = /*@__PURE__*/ S.Array(LoadBalancer);
export interface ServiceRegistry {
  registryArn?: string;
  port?: number;
  containerName?: string;
  containerPort?: number;
}
export const ServiceRegistry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    registryArn: S.optional(S.String),
    port: S.optional(S.Number),
    containerName: S.optional(S.String),
    containerPort: S.optional(S.Number),
  }),
).annotate({
  identifier: "ServiceRegistry",
}) as any as S.Schema<ServiceRegistry>;
export type ServiceRegistries = ServiceRegistry[];
export const ServiceRegistries = /*@__PURE__*/ S.Array(ServiceRegistry);
export type LaunchType =
  | "EC2"
  | "FARGATE"
  | "EXTERNAL"
  | "MANAGED_INSTANCES"
  | (string & {});
export const LaunchType = S.String;

export type ThresholdType =
  | "COUNT"
  | "BOUNDED_PERCENT"
  | "UNBOUNDED_PERCENT"
  | (string & {});
export const ThresholdType = S.String;

export interface ThresholdConfiguration {
  type: ThresholdType;
  value: number;
}
export const ThresholdConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ type: ThresholdType, value: S.Number }),
).annotate({
  identifier: "ThresholdConfiguration",
}) as any as S.Schema<ThresholdConfiguration>;
export interface DeploymentCircuitBreaker {
  enable: boolean;
  rollback: boolean;
  resetOnHealthyTask?: boolean;
  thresholdConfiguration?: ThresholdConfiguration;
}
export const DeploymentCircuitBreaker = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    enable: S.Boolean,
    rollback: S.Boolean,
    resetOnHealthyTask: S.optional(S.Boolean),
    thresholdConfiguration: S.optional(ThresholdConfiguration),
  }),
).annotate({
  identifier: "DeploymentCircuitBreaker",
}) as any as S.Schema<DeploymentCircuitBreaker>;
export interface DeploymentAlarms {
  alarmNames: string[];
  rollback: boolean;
  enable: boolean;
}
export const DeploymentAlarms = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ alarmNames: StringList, rollback: S.Boolean, enable: S.Boolean }),
).annotate({
  identifier: "DeploymentAlarms",
}) as any as S.Schema<DeploymentAlarms>;
export type DeploymentStrategy =
  | "ROLLING"
  | "BLUE_GREEN"
  | "LINEAR"
  | "CANARY"
  | (string & {});
export const DeploymentStrategy = S.String;

export type DeploymentLifecycleHookTargetType =
  | "AWS_LAMBDA"
  | "PAUSE"
  | (string & {});
export const DeploymentLifecycleHookTargetType = S.String;

export type IAMRoleArn = string;
export type DeploymentLifecycleHookStage =
  | "RECONCILE_SERVICE"
  | "PRE_SCALE_UP"
  | "POST_SCALE_UP"
  | "TEST_TRAFFIC_SHIFT"
  | "POST_TEST_TRAFFIC_SHIFT"
  | "PRE_PRODUCTION_TRAFFIC_SHIFT"
  | "PRODUCTION_TRAFFIC_SHIFT"
  | "POST_PRODUCTION_TRAFFIC_SHIFT"
  | (string & {});
export const DeploymentLifecycleHookStage = S.String;

export type DeploymentLifecycleHookStageList = DeploymentLifecycleHookStage[];
export const DeploymentLifecycleHookStageList = /*@__PURE__*/ S.Array(
  DeploymentLifecycleHookStage,
);
export type HookDetails = unknown;
export type DeploymentLifecycleHookDuration = number;
export interface DeploymentLifecycleHookTimeoutConfiguration {
  timeoutInMinutes?: number;
  action?: DeploymentLifecycleHookAction;
}
export const DeploymentLifecycleHookTimeoutConfiguration =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      timeoutInMinutes: S.optional(S.Number),
      action: S.optional(DeploymentLifecycleHookAction),
    }),
  ).annotate({
    identifier: "DeploymentLifecycleHookTimeoutConfiguration",
  }) as any as S.Schema<DeploymentLifecycleHookTimeoutConfiguration>;
export interface DeploymentLifecycleHook {
  targetType?: DeploymentLifecycleHookTargetType;
  hookTargetArn?: string;
  roleArn?: string;
  lifecycleStages?: DeploymentLifecycleHookStage[];
  hookDetails?: any;
  timeoutConfiguration?: DeploymentLifecycleHookTimeoutConfiguration;
}
export const DeploymentLifecycleHook = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    targetType: S.optional(DeploymentLifecycleHookTargetType),
    hookTargetArn: S.optional(S.String),
    roleArn: S.optional(S.String),
    lifecycleStages: S.optional(DeploymentLifecycleHookStageList),
    hookDetails: S.optional(S.Any),
    timeoutConfiguration: S.optional(
      DeploymentLifecycleHookTimeoutConfiguration,
    ),
  }),
).annotate({
  identifier: "DeploymentLifecycleHook",
}) as any as S.Schema<DeploymentLifecycleHook>;
export type DeploymentLifecycleHookList = DeploymentLifecycleHook[];
export const DeploymentLifecycleHookList = /*@__PURE__*/ S.Array(
  DeploymentLifecycleHook,
);
export interface LinearConfiguration {
  stepPercent?: number;
  stepBakeTimeInMinutes?: number;
}
export const LinearConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    stepPercent: S.optional(S.Number),
    stepBakeTimeInMinutes: S.optional(S.Number),
  }),
).annotate({
  identifier: "LinearConfiguration",
}) as any as S.Schema<LinearConfiguration>;
export interface CanaryConfiguration {
  canaryPercent?: number;
  canaryBakeTimeInMinutes?: number;
}
export const CanaryConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    canaryPercent: S.optional(S.Number),
    canaryBakeTimeInMinutes: S.optional(S.Number),
  }),
).annotate({
  identifier: "CanaryConfiguration",
}) as any as S.Schema<CanaryConfiguration>;
export type HealthyPercentInteger = number;
export type ServiceRevisionCleanup = "BLOCKING" | "DEFERRED" | (string & {});
export const ServiceRevisionCleanup = S.String;

export interface DeploymentEarlySuccessCriteria {
  enable: boolean;
  healthyPercent?: number;
  sourceServiceRevisionCleanup?: ServiceRevisionCleanup;
}
export const DeploymentEarlySuccessCriteria = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    enable: S.Boolean,
    healthyPercent: S.optional(S.Number),
    sourceServiceRevisionCleanup: S.optional(ServiceRevisionCleanup),
  }),
).annotate({
  identifier: "DeploymentEarlySuccessCriteria",
}) as any as S.Schema<DeploymentEarlySuccessCriteria>;
export interface DeploymentConfiguration {
  deploymentCircuitBreaker?: DeploymentCircuitBreaker;
  maximumPercent?: number;
  minimumHealthyPercent?: number;
  alarms?: DeploymentAlarms;
  strategy?: DeploymentStrategy;
  bakeTimeInMinutes?: number;
  lifecycleHooks?: DeploymentLifecycleHook[];
  linearConfiguration?: LinearConfiguration;
  canaryConfiguration?: CanaryConfiguration;
  earlySuccessCriteria?: DeploymentEarlySuccessCriteria;
}
export const DeploymentConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deploymentCircuitBreaker: S.optional(DeploymentCircuitBreaker),
    maximumPercent: S.optional(S.Number),
    minimumHealthyPercent: S.optional(S.Number),
    alarms: S.optional(DeploymentAlarms),
    strategy: S.optional(DeploymentStrategy),
    bakeTimeInMinutes: S.optional(S.Number),
    lifecycleHooks: S.optional(DeploymentLifecycleHookList),
    linearConfiguration: S.optional(LinearConfiguration),
    canaryConfiguration: S.optional(CanaryConfiguration),
    earlySuccessCriteria: S.optional(DeploymentEarlySuccessCriteria),
  }),
).annotate({
  identifier: "DeploymentConfiguration",
}) as any as S.Schema<DeploymentConfiguration>;
export type PlacementConstraintType =
  | "distinctInstance"
  | "memberOf"
  | (string & {});
export const PlacementConstraintType = S.String;

export interface PlacementConstraint {
  type?: PlacementConstraintType;
  expression?: string;
}
export const PlacementConstraint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(PlacementConstraintType),
    expression: S.optional(S.String),
  }),
).annotate({
  identifier: "PlacementConstraint",
}) as any as S.Schema<PlacementConstraint>;
export type PlacementConstraints = PlacementConstraint[];
export const PlacementConstraints = /*@__PURE__*/ S.Array(PlacementConstraint);
export type PlacementStrategyType =
  | "random"
  | "spread"
  | "binpack"
  | (string & {});
export const PlacementStrategyType = S.String;

export interface PlacementStrategy {
  type?: PlacementStrategyType;
  field?: string;
}
export const PlacementStrategy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(PlacementStrategyType),
    field: S.optional(S.String),
  }),
).annotate({
  identifier: "PlacementStrategy",
}) as any as S.Schema<PlacementStrategy>;
export type PlacementStrategies = PlacementStrategy[];
export const PlacementStrategies = /*@__PURE__*/ S.Array(PlacementStrategy);
export type AssignPublicIp = "ENABLED" | "DISABLED" | (string & {});
export const AssignPublicIp = S.String;

export interface AwsVpcConfiguration {
  subnets: string[];
  securityGroups?: string[];
  assignPublicIp?: AssignPublicIp;
}
export const AwsVpcConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    subnets: StringList,
    securityGroups: S.optional(StringList),
    assignPublicIp: S.optional(AssignPublicIp),
  }),
).annotate({
  identifier: "AwsVpcConfiguration",
}) as any as S.Schema<AwsVpcConfiguration>;
export interface NetworkConfiguration {
  awsvpcConfiguration?: AwsVpcConfiguration;
}
export const NetworkConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ awsvpcConfiguration: S.optional(AwsVpcConfiguration) }),
).annotate({
  identifier: "NetworkConfiguration",
}) as any as S.Schema<NetworkConfiguration>;
export type SchedulingStrategy = "REPLICA" | "DAEMON" | (string & {});
export const SchedulingStrategy = S.String;

export type DeploymentControllerType =
  | "ECS"
  | "CODE_DEPLOY"
  | "EXTERNAL"
  | (string & {});
export const DeploymentControllerType = S.String;

export interface DeploymentController {
  type: DeploymentControllerType;
}
export const DeploymentController = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ type: DeploymentControllerType }),
).annotate({
  identifier: "DeploymentController",
}) as any as S.Schema<DeploymentController>;
export type PropagateTags =
  | "TASK_DEFINITION"
  | "SERVICE"
  | "NONE"
  | (string & {});
export const PropagateTags = S.String;

export type PortNumber = number;
export interface ServiceConnectTestTrafficHeaderMatchRules {
  exact: string;
}
export const ServiceConnectTestTrafficHeaderMatchRules =
  /*@__PURE__*/ S.suspend(() => S.Struct({ exact: S.String })).annotate({
    identifier: "ServiceConnectTestTrafficHeaderMatchRules",
  }) as any as S.Schema<ServiceConnectTestTrafficHeaderMatchRules>;
export interface ServiceConnectTestTrafficHeaderRules {
  name: string;
  value?: ServiceConnectTestTrafficHeaderMatchRules;
}
export const ServiceConnectTestTrafficHeaderRules = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      name: S.String,
      value: S.optional(ServiceConnectTestTrafficHeaderMatchRules),
    }),
).annotate({
  identifier: "ServiceConnectTestTrafficHeaderRules",
}) as any as S.Schema<ServiceConnectTestTrafficHeaderRules>;
export interface ServiceConnectTestTrafficRules {
  header: ServiceConnectTestTrafficHeaderRules;
}
export const ServiceConnectTestTrafficRules = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ header: ServiceConnectTestTrafficHeaderRules }),
).annotate({
  identifier: "ServiceConnectTestTrafficRules",
}) as any as S.Schema<ServiceConnectTestTrafficRules>;
export interface ServiceConnectClientAlias {
  port: number;
  dnsName?: string;
  testTrafficRules?: ServiceConnectTestTrafficRules;
}
export const ServiceConnectClientAlias = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    port: S.Number,
    dnsName: S.optional(S.String),
    testTrafficRules: S.optional(ServiceConnectTestTrafficRules),
  }),
).annotate({
  identifier: "ServiceConnectClientAlias",
}) as any as S.Schema<ServiceConnectClientAlias>;
export type ServiceConnectClientAliasList = ServiceConnectClientAlias[];
export const ServiceConnectClientAliasList = /*@__PURE__*/ S.Array(
  ServiceConnectClientAlias,
);
export type Duration = number;
export interface TimeoutConfiguration {
  idleTimeoutSeconds?: number;
  perRequestTimeoutSeconds?: number;
}
export const TimeoutConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    idleTimeoutSeconds: S.optional(S.Number),
    perRequestTimeoutSeconds: S.optional(S.Number),
  }),
).annotate({
  identifier: "TimeoutConfiguration",
}) as any as S.Schema<TimeoutConfiguration>;
export interface ServiceConnectTlsCertificateAuthority {
  awsPcaAuthorityArn?: string;
}
export const ServiceConnectTlsCertificateAuthority = /*@__PURE__*/ S.suspend(
  () => S.Struct({ awsPcaAuthorityArn: S.optional(S.String) }),
).annotate({
  identifier: "ServiceConnectTlsCertificateAuthority",
}) as any as S.Schema<ServiceConnectTlsCertificateAuthority>;
export interface ServiceConnectTlsConfiguration {
  issuerCertificateAuthority: ServiceConnectTlsCertificateAuthority;
  kmsKey?: string;
  roleArn?: string;
}
export const ServiceConnectTlsConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    issuerCertificateAuthority: ServiceConnectTlsCertificateAuthority,
    kmsKey: S.optional(S.String),
    roleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "ServiceConnectTlsConfiguration",
}) as any as S.Schema<ServiceConnectTlsConfiguration>;
export interface ServiceConnectService {
  portName: string;
  discoveryName?: string;
  clientAliases?: ServiceConnectClientAlias[];
  ingressPortOverride?: number;
  timeout?: TimeoutConfiguration;
  tls?: ServiceConnectTlsConfiguration;
}
export const ServiceConnectService = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    portName: S.String,
    discoveryName: S.optional(S.String),
    clientAliases: S.optional(ServiceConnectClientAliasList),
    ingressPortOverride: S.optional(S.Number),
    timeout: S.optional(TimeoutConfiguration),
    tls: S.optional(ServiceConnectTlsConfiguration),
  }),
).annotate({
  identifier: "ServiceConnectService",
}) as any as S.Schema<ServiceConnectService>;
export type ServiceConnectServiceList = ServiceConnectService[];
export const ServiceConnectServiceList = /*@__PURE__*/ S.Array(
  ServiceConnectService,
);
export type LogDriver =
  | "json-file"
  | "syslog"
  | "journald"
  | "gelf"
  | "fluentd"
  | "awslogs"
  | "splunk"
  | "awsfirelens"
  | (string & {});
export const LogDriver = S.String;

export type LogConfigurationOptionsMap = { [key: string]: string | undefined };
export const LogConfigurationOptionsMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface LogConfiguration {
  logDriver: LogDriver;
  options?: { [key: string]: string | undefined };
  secretOptions?: Secret[];
}
export const LogConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    logDriver: LogDriver,
    options: S.optional(LogConfigurationOptionsMap),
    secretOptions: S.optional(SecretList),
  }),
).annotate({
  identifier: "LogConfiguration",
}) as any as S.Schema<LogConfiguration>;
export type ServiceConnectAccessLoggingFormat = "TEXT" | "JSON" | (string & {});
export const ServiceConnectAccessLoggingFormat = S.String;

export type ServiceConnectIncludeQueryParameters =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export const ServiceConnectIncludeQueryParameters = S.String;

export interface ServiceConnectAccessLogConfiguration {
  format: ServiceConnectAccessLoggingFormat;
  includeQueryParameters?: ServiceConnectIncludeQueryParameters;
}
export const ServiceConnectAccessLogConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      format: ServiceConnectAccessLoggingFormat,
      includeQueryParameters: S.optional(ServiceConnectIncludeQueryParameters),
    }),
).annotate({
  identifier: "ServiceConnectAccessLogConfiguration",
}) as any as S.Schema<ServiceConnectAccessLogConfiguration>;
export interface ServiceConnectConfiguration {
  enabled: boolean;
  namespace?: string;
  services?: ServiceConnectService[];
  logConfiguration?: LogConfiguration;
  accessLogConfiguration?: ServiceConnectAccessLogConfiguration;
}
export const ServiceConnectConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    enabled: S.Boolean,
    namespace: S.optional(S.String),
    services: S.optional(ServiceConnectServiceList),
    logConfiguration: S.optional(LogConfiguration),
    accessLogConfiguration: S.optional(ServiceConnectAccessLogConfiguration),
  }),
).annotate({
  identifier: "ServiceConnectConfiguration",
}) as any as S.Schema<ServiceConnectConfiguration>;
export type ECSVolumeName = string;
export type EBSKMSKeyId = string;
export type EBSVolumeType = string;
export type EBSSnapshotId = string;
export type EBSResourceType = "volume" | (string & {});
export const EBSResourceType = S.String;

export interface EBSTagSpecification {
  resourceType: EBSResourceType;
  tags?: Tag[];
  propagateTags?: PropagateTags;
}
export const EBSTagSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceType: EBSResourceType,
    tags: S.optional(Tags),
    propagateTags: S.optional(PropagateTags),
  }),
).annotate({
  identifier: "EBSTagSpecification",
}) as any as S.Schema<EBSTagSpecification>;
export type EBSTagSpecifications = EBSTagSpecification[];
export const EBSTagSpecifications = /*@__PURE__*/ S.Array(EBSTagSpecification);
export type TaskFilesystemType =
  | "ext3"
  | "ext4"
  | "xfs"
  | "ntfs"
  | (string & {});
export const TaskFilesystemType = S.String;

export interface ServiceManagedEBSVolumeConfiguration {
  encrypted?: boolean;
  kmsKeyId?: string;
  volumeType?: string;
  sizeInGiB?: number;
  snapshotId?: string;
  volumeInitializationRate?: number;
  iops?: number;
  throughput?: number;
  tagSpecifications?: EBSTagSpecification[];
  roleArn: string;
  filesystemType?: TaskFilesystemType;
}
export const ServiceManagedEBSVolumeConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      encrypted: S.optional(S.Boolean),
      kmsKeyId: S.optional(S.String),
      volumeType: S.optional(S.String),
      sizeInGiB: S.optional(S.Number),
      snapshotId: S.optional(S.String),
      volumeInitializationRate: S.optional(S.Number),
      iops: S.optional(S.Number),
      throughput: S.optional(S.Number),
      tagSpecifications: S.optional(EBSTagSpecifications),
      roleArn: S.String,
      filesystemType: S.optional(TaskFilesystemType),
    }),
).annotate({
  identifier: "ServiceManagedEBSVolumeConfiguration",
}) as any as S.Schema<ServiceManagedEBSVolumeConfiguration>;
export interface ServiceVolumeConfiguration {
  name: string;
  managedEBSVolume?: ServiceManagedEBSVolumeConfiguration;
}
export const ServiceVolumeConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    managedEBSVolume: S.optional(ServiceManagedEBSVolumeConfiguration),
  }),
).annotate({
  identifier: "ServiceVolumeConfiguration",
}) as any as S.Schema<ServiceVolumeConfiguration>;
export type ServiceVolumeConfigurations = ServiceVolumeConfiguration[];
export const ServiceVolumeConfigurations = /*@__PURE__*/ S.Array(
  ServiceVolumeConfiguration,
);
export interface VpcLatticeConfiguration {
  roleArn: string;
  targetGroupArn: string;
  portName: string;
}
export const VpcLatticeConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ roleArn: S.String, targetGroupArn: S.String, portName: S.String }),
).annotate({
  identifier: "VpcLatticeConfiguration",
}) as any as S.Schema<VpcLatticeConfiguration>;
export type VpcLatticeConfigurations = VpcLatticeConfiguration[];
export const VpcLatticeConfigurations = /*@__PURE__*/ S.Array(
  VpcLatticeConfiguration,
);
export type MetricName = string;
export type MetricNamesList = string[];
export const MetricNamesList = /*@__PURE__*/ S.Array(S.String);
export type MetricResolutionSeconds = number;
export interface MetricConfiguration {
  metricNames: string[];
  resolutionSeconds: number;
}
export const MetricConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ metricNames: MetricNamesList, resolutionSeconds: S.Number }),
).annotate({
  identifier: "MetricConfiguration",
}) as any as S.Schema<MetricConfiguration>;
export type MetricConfigurationList = MetricConfiguration[];
export const MetricConfigurationList =
  /*@__PURE__*/ S.Array(MetricConfiguration);
export interface MonitoringConfiguration {
  metricConfigurations?: MetricConfiguration[];
}
export const MonitoringConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ metricConfigurations: S.optional(MetricConfigurationList) }),
).annotate({
  identifier: "MonitoringConfiguration",
}) as any as S.Schema<MonitoringConfiguration>;
export interface CreateServiceRequest {
  cluster?: string;
  serviceName: string;
  taskDefinition?: string;
  availabilityZoneRebalancing?: AvailabilityZoneRebalancing;
  loadBalancers?: LoadBalancer[];
  serviceRegistries?: ServiceRegistry[];
  desiredCount?: number;
  clientToken?: string;
  launchType?: LaunchType;
  capacityProviderStrategy?: CapacityProviderStrategyItem[];
  platformVersion?: string;
  role?: string;
  deploymentConfiguration?: DeploymentConfiguration;
  placementConstraints?: PlacementConstraint[];
  placementStrategy?: PlacementStrategy[];
  networkConfiguration?: NetworkConfiguration;
  healthCheckGracePeriodSeconds?: number;
  schedulingStrategy?: SchedulingStrategy;
  deploymentController?: DeploymentController;
  tags?: Tag[];
  enableECSManagedTags?: boolean;
  propagateTags?: PropagateTags;
  enableExecuteCommand?: boolean;
  serviceConnectConfiguration?: ServiceConnectConfiguration;
  volumeConfigurations?: ServiceVolumeConfiguration[];
  vpcLatticeConfigurations?: VpcLatticeConfiguration[];
  monitoring?: MonitoringConfiguration;
}
export const CreateServiceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cluster: S.optional(S.String),
    serviceName: S.String,
    taskDefinition: S.optional(S.String),
    availabilityZoneRebalancing: S.optional(AvailabilityZoneRebalancing),
    loadBalancers: S.optional(LoadBalancers),
    serviceRegistries: S.optional(ServiceRegistries),
    desiredCount: S.optional(S.Number),
    clientToken: S.optional(S.String),
    launchType: S.optional(LaunchType),
    capacityProviderStrategy: S.optional(CapacityProviderStrategy),
    platformVersion: S.optional(S.String),
    role: S.optional(S.String),
    deploymentConfiguration: S.optional(DeploymentConfiguration),
    placementConstraints: S.optional(PlacementConstraints),
    placementStrategy: S.optional(PlacementStrategies),
    networkConfiguration: S.optional(NetworkConfiguration),
    healthCheckGracePeriodSeconds: S.optional(S.Number),
    schedulingStrategy: S.optional(SchedulingStrategy),
    deploymentController: S.optional(DeploymentController),
    tags: S.optional(Tags),
    enableECSManagedTags: S.optional(S.Boolean),
    propagateTags: S.optional(PropagateTags),
    enableExecuteCommand: S.optional(S.Boolean),
    serviceConnectConfiguration: S.optional(ServiceConnectConfiguration),
    volumeConfigurations: S.optional(ServiceVolumeConfigurations),
    vpcLatticeConfigurations: S.optional(VpcLatticeConfigurations),
    monitoring: S.optional(MonitoringConfiguration),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateServiceRequest",
}) as any as S.Schema<CreateServiceRequest>;
export type ScaleUnit = "PERCENT" | (string & {});
export const ScaleUnit = S.String;

export interface Scale {
  value?: number;
  unit?: ScaleUnit;
}
export const Scale = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ value: S.optional(S.Number), unit: S.optional(ScaleUnit) }),
).annotate({ identifier: "Scale" }) as any as S.Schema<Scale>;
export type StabilityStatus = "STEADY_STATE" | "STABILIZING" | (string & {});
export const StabilityStatus = S.String;

export interface DeploymentEphemeralStorage {
  kmsKeyId?: string;
}
export const DeploymentEphemeralStorage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ kmsKeyId: S.optional(S.String) }),
).annotate({
  identifier: "DeploymentEphemeralStorage",
}) as any as S.Schema<DeploymentEphemeralStorage>;
export interface TaskSet {
  id?: string;
  taskSetArn?: string;
  serviceArn?: string;
  clusterArn?: string;
  startedBy?: string;
  externalId?: string;
  status?: string;
  taskDefinition?: string;
  computedDesiredCount?: number;
  pendingCount?: number;
  runningCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
  launchType?: LaunchType;
  capacityProviderStrategy?: CapacityProviderStrategyItem[];
  platformVersion?: string;
  platformFamily?: string;
  networkConfiguration?: NetworkConfiguration;
  loadBalancers?: LoadBalancer[];
  serviceRegistries?: ServiceRegistry[];
  scale?: Scale;
  stabilityStatus?: StabilityStatus;
  stabilityStatusAt?: Date;
  tags?: Tag[];
  fargateEphemeralStorage?: DeploymentEphemeralStorage;
}
export const TaskSet = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    taskSetArn: S.optional(S.String),
    serviceArn: S.optional(S.String),
    clusterArn: S.optional(S.String),
    startedBy: S.optional(S.String),
    externalId: S.optional(S.String),
    status: S.optional(S.String),
    taskDefinition: S.optional(S.String),
    computedDesiredCount: S.optional(S.Number),
    pendingCount: S.optional(S.Number),
    runningCount: S.optional(S.Number),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    launchType: S.optional(LaunchType),
    capacityProviderStrategy: S.optional(CapacityProviderStrategy),
    platformVersion: S.optional(S.String),
    platformFamily: S.optional(S.String),
    networkConfiguration: S.optional(NetworkConfiguration),
    loadBalancers: S.optional(LoadBalancers),
    serviceRegistries: S.optional(ServiceRegistries),
    scale: S.optional(Scale),
    stabilityStatus: S.optional(StabilityStatus),
    stabilityStatusAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    tags: S.optional(Tags),
    fargateEphemeralStorage: S.optional(DeploymentEphemeralStorage),
  }),
).annotate({ identifier: "TaskSet" }) as any as S.Schema<TaskSet>;
export type TaskSets = TaskSet[];
export const TaskSets = /*@__PURE__*/ S.Array(TaskSet);
export type DeploymentRolloutState =
  | "COMPLETED"
  | "FAILED"
  | "IN_PROGRESS"
  | (string & {});
export const DeploymentRolloutState = S.String;

export interface ServiceConnectServiceResource {
  discoveryName?: string;
  discoveryArn?: string;
}
export const ServiceConnectServiceResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    discoveryName: S.optional(S.String),
    discoveryArn: S.optional(S.String),
  }),
).annotate({
  identifier: "ServiceConnectServiceResource",
}) as any as S.Schema<ServiceConnectServiceResource>;
export type ServiceConnectServiceResourceList = ServiceConnectServiceResource[];
export const ServiceConnectServiceResourceList = /*@__PURE__*/ S.Array(
  ServiceConnectServiceResource,
);
export interface Deployment {
  id?: string;
  status?: string;
  taskDefinition?: string;
  desiredCount?: number;
  pendingCount?: number;
  runningCount?: number;
  failedTasks?: number;
  createdAt?: Date;
  updatedAt?: Date;
  capacityProviderStrategy?: CapacityProviderStrategyItem[];
  launchType?: LaunchType;
  platformVersion?: string;
  platformFamily?: string;
  networkConfiguration?: NetworkConfiguration;
  rolloutState?: DeploymentRolloutState;
  rolloutStateReason?: string;
  serviceConnectConfiguration?: ServiceConnectConfiguration;
  serviceConnectResources?: ServiceConnectServiceResource[];
  volumeConfigurations?: ServiceVolumeConfiguration[];
  fargateEphemeralStorage?: DeploymentEphemeralStorage;
  vpcLatticeConfigurations?: VpcLatticeConfiguration[];
}
export const Deployment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    status: S.optional(S.String),
    taskDefinition: S.optional(S.String),
    desiredCount: S.optional(S.Number),
    pendingCount: S.optional(S.Number),
    runningCount: S.optional(S.Number),
    failedTasks: S.optional(S.Number),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    capacityProviderStrategy: S.optional(CapacityProviderStrategy),
    launchType: S.optional(LaunchType),
    platformVersion: S.optional(S.String),
    platformFamily: S.optional(S.String),
    networkConfiguration: S.optional(NetworkConfiguration),
    rolloutState: S.optional(DeploymentRolloutState),
    rolloutStateReason: S.optional(S.String),
    serviceConnectConfiguration: S.optional(ServiceConnectConfiguration),
    serviceConnectResources: S.optional(ServiceConnectServiceResourceList),
    volumeConfigurations: S.optional(ServiceVolumeConfigurations),
    fargateEphemeralStorage: S.optional(DeploymentEphemeralStorage),
    vpcLatticeConfigurations: S.optional(VpcLatticeConfigurations),
  }),
).annotate({ identifier: "Deployment" }) as any as S.Schema<Deployment>;
export type Deployments = Deployment[];
export const Deployments = /*@__PURE__*/ S.Array(Deployment);
export interface ServiceEvent {
  id?: string;
  createdAt?: Date;
  message?: string;
}
export const ServiceEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    message: S.optional(S.String),
  }),
).annotate({ identifier: "ServiceEvent" }) as any as S.Schema<ServiceEvent>;
export type ServiceEvents = ServiceEvent[];
export const ServiceEvents = /*@__PURE__*/ S.Array(ServiceEvent);
export interface ServiceCurrentRevisionSummary {
  arn?: string;
  requestedTaskCount?: number;
  runningTaskCount?: number;
  pendingTaskCount?: number;
}
export const ServiceCurrentRevisionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    requestedTaskCount: S.optional(S.Number),
    runningTaskCount: S.optional(S.Number),
    pendingTaskCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "ServiceCurrentRevisionSummary",
}) as any as S.Schema<ServiceCurrentRevisionSummary>;
export type ServiceCurrentRevisionSummaryList = ServiceCurrentRevisionSummary[];
export const ServiceCurrentRevisionSummaryList = /*@__PURE__*/ S.Array(
  ServiceCurrentRevisionSummary,
);
export type ResourceManagementType = "CUSTOMER" | "ECS" | (string & {});
export const ResourceManagementType = S.String;

export interface Service {
  serviceArn?: string;
  serviceName?: string;
  clusterArn?: string;
  loadBalancers?: LoadBalancer[];
  serviceRegistries?: ServiceRegistry[];
  status?: string;
  desiredCount?: number;
  runningCount?: number;
  pendingCount?: number;
  launchType?: LaunchType;
  capacityProviderStrategy?: CapacityProviderStrategyItem[];
  platformVersion?: string;
  platformFamily?: string;
  taskDefinition?: string;
  deploymentConfiguration?: DeploymentConfiguration;
  taskSets?: TaskSet[];
  deployments?: Deployment[];
  roleArn?: string;
  events?: ServiceEvent[];
  createdAt?: Date;
  currentServiceDeployment?: string;
  currentServiceRevisions?: ServiceCurrentRevisionSummary[];
  placementConstraints?: PlacementConstraint[];
  placementStrategy?: PlacementStrategy[];
  networkConfiguration?: NetworkConfiguration;
  healthCheckGracePeriodSeconds?: number;
  schedulingStrategy?: SchedulingStrategy;
  deploymentController?: DeploymentController;
  tags?: Tag[];
  createdBy?: string;
  enableECSManagedTags?: boolean;
  propagateTags?: PropagateTags;
  enableExecuteCommand?: boolean;
  availabilityZoneRebalancing?: AvailabilityZoneRebalancing;
  resourceManagementType?: ResourceManagementType;
}
export const Service = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceArn: S.optional(S.String),
    serviceName: S.optional(S.String),
    clusterArn: S.optional(S.String),
    loadBalancers: S.optional(LoadBalancers),
    serviceRegistries: S.optional(ServiceRegistries),
    status: S.optional(S.String),
    desiredCount: S.optional(S.Number),
    runningCount: S.optional(S.Number),
    pendingCount: S.optional(S.Number),
    launchType: S.optional(LaunchType),
    capacityProviderStrategy: S.optional(CapacityProviderStrategy),
    platformVersion: S.optional(S.String),
    platformFamily: S.optional(S.String),
    taskDefinition: S.optional(S.String),
    deploymentConfiguration: S.optional(DeploymentConfiguration),
    taskSets: S.optional(TaskSets),
    deployments: S.optional(Deployments),
    roleArn: S.optional(S.String),
    events: S.optional(ServiceEvents),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    currentServiceDeployment: S.optional(S.String),
    currentServiceRevisions: S.optional(ServiceCurrentRevisionSummaryList),
    placementConstraints: S.optional(PlacementConstraints),
    placementStrategy: S.optional(PlacementStrategies),
    networkConfiguration: S.optional(NetworkConfiguration),
    healthCheckGracePeriodSeconds: S.optional(S.Number),
    schedulingStrategy: S.optional(SchedulingStrategy),
    deploymentController: S.optional(DeploymentController),
    tags: S.optional(Tags),
    createdBy: S.optional(S.String),
    enableECSManagedTags: S.optional(S.Boolean),
    propagateTags: S.optional(PropagateTags),
    enableExecuteCommand: S.optional(S.Boolean),
    availabilityZoneRebalancing: S.optional(AvailabilityZoneRebalancing),
    resourceManagementType: S.optional(ResourceManagementType),
  }),
).annotate({ identifier: "Service" }) as any as S.Schema<Service>;
export interface CreateServiceResponse {
  service?: Service;
}
export const CreateServiceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ service: S.optional(Service) }).pipe(ns),
).annotate({
  identifier: "CreateServiceResponse",
}) as any as S.Schema<CreateServiceResponse>;
export interface CreateTaskSetRequest {
  service: string;
  cluster: string;
  externalId?: string;
  taskDefinition: string;
  networkConfiguration?: NetworkConfiguration;
  loadBalancers?: LoadBalancer[];
  serviceRegistries?: ServiceRegistry[];
  launchType?: LaunchType;
  capacityProviderStrategy?: CapacityProviderStrategyItem[];
  platformVersion?: string;
  scale?: Scale;
  clientToken?: string;
  tags?: Tag[];
}
export const CreateTaskSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    service: S.String,
    cluster: S.String,
    externalId: S.optional(S.String),
    taskDefinition: S.String,
    networkConfiguration: S.optional(NetworkConfiguration),
    loadBalancers: S.optional(LoadBalancers),
    serviceRegistries: S.optional(ServiceRegistries),
    launchType: S.optional(LaunchType),
    capacityProviderStrategy: S.optional(CapacityProviderStrategy),
    platformVersion: S.optional(S.String),
    scale: S.optional(Scale),
    clientToken: S.optional(S.String),
    tags: S.optional(Tags),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateTaskSetRequest",
}) as any as S.Schema<CreateTaskSetRequest>;
export interface CreateTaskSetResponse {
  taskSet?: TaskSet;
}
export const CreateTaskSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ taskSet: S.optional(TaskSet) }).pipe(ns),
).annotate({
  identifier: "CreateTaskSetResponse",
}) as any as S.Schema<CreateTaskSetResponse>;
export type SettingName =
  | "serviceLongArnFormat"
  | "taskLongArnFormat"
  | "containerInstanceLongArnFormat"
  | "awsvpcTrunking"
  | "containerInsights"
  | "fargateFIPSMode"
  | "tagResourceAuthorization"
  | "fargateTaskRetirementWaitPeriod"
  | "guardDutyActivate"
  | "defaultLogDriverMode"
  | "fargateEventWindows"
  | (string & {});
export const SettingName = S.String;

export interface DeleteAccountSettingRequest {
  name: SettingName;
  principalArn?: string;
}
export const DeleteAccountSettingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: SettingName, principalArn: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAccountSettingRequest",
}) as any as S.Schema<DeleteAccountSettingRequest>;
export type SettingType = "user" | "aws_managed" | (string & {});
export const SettingType = S.String;

export interface Setting {
  name?: SettingName;
  value?: string;
  principalArn?: string;
  type?: SettingType;
}
export const Setting = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(SettingName),
    value: S.optional(S.String),
    principalArn: S.optional(S.String),
    type: S.optional(SettingType),
  }),
).annotate({ identifier: "Setting" }) as any as S.Schema<Setting>;
export interface DeleteAccountSettingResponse {
  setting?: Setting;
}
export const DeleteAccountSettingResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ setting: S.optional(Setting) }).pipe(ns),
).annotate({
  identifier: "DeleteAccountSettingResponse",
}) as any as S.Schema<DeleteAccountSettingResponse>;
export type TargetType = "container-instance" | (string & {});
export const TargetType = S.String;

export interface Attribute {
  name: string;
  value?: string;
  targetType?: TargetType;
  targetId?: string;
}
export const Attribute = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    value: S.optional(S.String),
    targetType: S.optional(TargetType),
    targetId: S.optional(S.String),
  }),
).annotate({ identifier: "Attribute" }) as any as S.Schema<Attribute>;
export type Attributes = Attribute[];
export const Attributes = /*@__PURE__*/ S.Array(Attribute);
export interface DeleteAttributesRequest {
  cluster?: string;
  attributes: Attribute[];
}
export const DeleteAttributesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ cluster: S.optional(S.String), attributes: Attributes }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAttributesRequest",
}) as any as S.Schema<DeleteAttributesRequest>;
export interface DeleteAttributesResponse {
  attributes?: Attribute[];
}
export const DeleteAttributesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ attributes: S.optional(Attributes) }).pipe(ns),
).annotate({
  identifier: "DeleteAttributesResponse",
}) as any as S.Schema<DeleteAttributesResponse>;
export interface DeleteCapacityProviderRequest {
  capacityProvider: string;
  cluster?: string;
}
export const DeleteCapacityProviderRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ capacityProvider: S.String, cluster: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteCapacityProviderRequest",
}) as any as S.Schema<DeleteCapacityProviderRequest>;
export interface DeleteCapacityProviderResponse {
  capacityProvider?: CapacityProvider;
}
export const DeleteCapacityProviderResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ capacityProvider: S.optional(CapacityProvider) }).pipe(ns),
).annotate({
  identifier: "DeleteCapacityProviderResponse",
}) as any as S.Schema<DeleteCapacityProviderResponse>;
export interface DeleteClusterRequest {
  cluster: string;
}
export const DeleteClusterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ cluster: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
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
  cluster?: Cluster;
}
export const DeleteClusterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ cluster: S.optional(Cluster) }).pipe(ns),
).annotate({
  identifier: "DeleteClusterResponse",
}) as any as S.Schema<DeleteClusterResponse>;
export interface DeleteDaemonRequest {
  daemonArn: string;
}
export const DeleteDaemonRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ daemonArn: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDaemonRequest",
}) as any as S.Schema<DeleteDaemonRequest>;
export interface DeleteDaemonResponse {
  daemonArn?: string;
  status?: DaemonStatus;
  createdAt?: Date;
  updatedAt?: Date;
  deploymentArn?: string;
}
export const DeleteDaemonResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    daemonArn: S.optional(S.String),
    status: S.optional(DaemonStatus),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    deploymentArn: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DeleteDaemonResponse",
}) as any as S.Schema<DeleteDaemonResponse>;
export interface DeleteDaemonTaskDefinitionRequest {
  daemonTaskDefinition: string;
}
export const DeleteDaemonTaskDefinitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ daemonTaskDefinition: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDaemonTaskDefinitionRequest",
}) as any as S.Schema<DeleteDaemonTaskDefinitionRequest>;
export interface DeleteDaemonTaskDefinitionResponse {
  daemonTaskDefinitionArn?: string;
}
export const DeleteDaemonTaskDefinitionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ daemonTaskDefinitionArn: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "DeleteDaemonTaskDefinitionResponse",
}) as any as S.Schema<DeleteDaemonTaskDefinitionResponse>;
export interface DeleteExpressGatewayServiceRequest {
  serviceArn: string;
}
export const DeleteExpressGatewayServiceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ serviceArn: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteExpressGatewayServiceRequest",
}) as any as S.Schema<DeleteExpressGatewayServiceRequest>;
export interface DeleteExpressGatewayServiceResponse {
  service?: ECSExpressGatewayService;
}
export const DeleteExpressGatewayServiceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ service: S.optional(ECSExpressGatewayService) }).pipe(ns),
).annotate({
  identifier: "DeleteExpressGatewayServiceResponse",
}) as any as S.Schema<DeleteExpressGatewayServiceResponse>;
export interface DeleteServiceRequest {
  cluster?: string;
  service: string;
  force?: boolean;
}
export const DeleteServiceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cluster: S.optional(S.String),
    service: S.String,
    force: S.optional(S.Boolean),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteServiceRequest",
}) as any as S.Schema<DeleteServiceRequest>;
export interface DeleteServiceResponse {
  service?: Service;
}
export const DeleteServiceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ service: S.optional(Service) }).pipe(ns),
).annotate({
  identifier: "DeleteServiceResponse",
}) as any as S.Schema<DeleteServiceResponse>;
export interface DeleteTaskDefinitionsRequest {
  taskDefinitions: string[];
}
export const DeleteTaskDefinitionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ taskDefinitions: StringList }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteTaskDefinitionsRequest",
}) as any as S.Schema<DeleteTaskDefinitionsRequest>;
export interface RepositoryCredentials {
  credentialsParameter: string;
}
export const RepositoryCredentials = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ credentialsParameter: S.String }),
).annotate({
  identifier: "RepositoryCredentials",
}) as any as S.Schema<RepositoryCredentials>;
export type TransportProtocol = "tcp" | "udp" | (string & {});
export const TransportProtocol = S.String;

export type ApplicationProtocol = "http" | "http2" | "grpc" | (string & {});
export const ApplicationProtocol = S.String;

export interface PortMapping {
  containerPort?: number;
  hostPort?: number;
  protocol?: TransportProtocol;
  name?: string;
  appProtocol?: ApplicationProtocol;
  containerPortRange?: string;
}
export const PortMapping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    containerPort: S.optional(S.Number),
    hostPort: S.optional(S.Number),
    protocol: S.optional(TransportProtocol),
    name: S.optional(S.String),
    appProtocol: S.optional(ApplicationProtocol),
    containerPortRange: S.optional(S.String),
  }),
).annotate({ identifier: "PortMapping" }) as any as S.Schema<PortMapping>;
export type PortMappingList = PortMapping[];
export const PortMappingList = /*@__PURE__*/ S.Array(PortMapping);
export type IntegerList = number[];
export const IntegerList = /*@__PURE__*/ S.Array(S.Number);
export interface ContainerRestartPolicy {
  enabled: boolean;
  ignoredExitCodes?: number[];
  restartAttemptPeriod?: number;
}
export const ContainerRestartPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    enabled: S.Boolean,
    ignoredExitCodes: S.optional(IntegerList),
    restartAttemptPeriod: S.optional(S.Number),
  }),
).annotate({
  identifier: "ContainerRestartPolicy",
}) as any as S.Schema<ContainerRestartPolicy>;
export type EnvironmentFileType = "s3" | (string & {});
export const EnvironmentFileType = S.String;

export interface EnvironmentFile {
  value: string;
  type: EnvironmentFileType;
}
export const EnvironmentFile = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ value: S.String, type: EnvironmentFileType }),
).annotate({
  identifier: "EnvironmentFile",
}) as any as S.Schema<EnvironmentFile>;
export type EnvironmentFiles = EnvironmentFile[];
export const EnvironmentFiles = /*@__PURE__*/ S.Array(EnvironmentFile);
export interface MountPoint {
  sourceVolume?: string;
  containerPath?: string;
  readOnly?: boolean;
}
export const MountPoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceVolume: S.optional(S.String),
    containerPath: S.optional(S.String),
    readOnly: S.optional(S.Boolean),
  }),
).annotate({ identifier: "MountPoint" }) as any as S.Schema<MountPoint>;
export type MountPointList = MountPoint[];
export const MountPointList = /*@__PURE__*/ S.Array(MountPoint);
export interface VolumeFrom {
  sourceContainer?: string;
  readOnly?: boolean;
}
export const VolumeFrom = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceContainer: S.optional(S.String),
    readOnly: S.optional(S.Boolean),
  }),
).annotate({ identifier: "VolumeFrom" }) as any as S.Schema<VolumeFrom>;
export type VolumeFromList = VolumeFrom[];
export const VolumeFromList = /*@__PURE__*/ S.Array(VolumeFrom);
export interface KernelCapabilities {
  add?: string[];
  drop?: string[];
}
export const KernelCapabilities = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ add: S.optional(StringList), drop: S.optional(StringList) }),
).annotate({
  identifier: "KernelCapabilities",
}) as any as S.Schema<KernelCapabilities>;
export type DeviceCgroupPermission = "read" | "write" | "mknod" | (string & {});
export const DeviceCgroupPermission = S.String;

export type DeviceCgroupPermissions = DeviceCgroupPermission[];
export const DeviceCgroupPermissions = /*@__PURE__*/ S.Array(
  DeviceCgroupPermission,
);
export interface Device {
  hostPath: string;
  containerPath?: string;
  permissions?: DeviceCgroupPermission[];
}
export const Device = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    hostPath: S.String,
    containerPath: S.optional(S.String),
    permissions: S.optional(DeviceCgroupPermissions),
  }),
).annotate({ identifier: "Device" }) as any as S.Schema<Device>;
export type DevicesList = Device[];
export const DevicesList = /*@__PURE__*/ S.Array(Device);
export interface Tmpfs {
  containerPath: string;
  size: number;
  mountOptions?: string[];
}
export const Tmpfs = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    containerPath: S.String,
    size: S.Number,
    mountOptions: S.optional(StringList),
  }),
).annotate({ identifier: "Tmpfs" }) as any as S.Schema<Tmpfs>;
export type TmpfsList = Tmpfs[];
export const TmpfsList = /*@__PURE__*/ S.Array(Tmpfs);
export interface LinuxParameters {
  capabilities?: KernelCapabilities;
  devices?: Device[];
  initProcessEnabled?: boolean;
  sharedMemorySize?: number;
  tmpfs?: Tmpfs[];
  maxSwap?: number;
  swappiness?: number;
}
export const LinuxParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    capabilities: S.optional(KernelCapabilities),
    devices: S.optional(DevicesList),
    initProcessEnabled: S.optional(S.Boolean),
    sharedMemorySize: S.optional(S.Number),
    tmpfs: S.optional(TmpfsList),
    maxSwap: S.optional(S.Number),
    swappiness: S.optional(S.Number),
  }),
).annotate({
  identifier: "LinuxParameters",
}) as any as S.Schema<LinuxParameters>;
export type ContainerCondition =
  | "START"
  | "COMPLETE"
  | "SUCCESS"
  | "HEALTHY"
  | (string & {});
export const ContainerCondition = S.String;

export interface ContainerDependency {
  containerName: string;
  condition: ContainerCondition;
}
export const ContainerDependency = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ containerName: S.String, condition: ContainerCondition }),
).annotate({
  identifier: "ContainerDependency",
}) as any as S.Schema<ContainerDependency>;
export type ContainerDependencies = ContainerDependency[];
export const ContainerDependencies = /*@__PURE__*/ S.Array(ContainerDependency);
export type VersionConsistency = "enabled" | "disabled" | (string & {});
export const VersionConsistency = S.String;

export interface HostEntry {
  hostname: string;
  ipAddress: string;
}
export const HostEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ hostname: S.String, ipAddress: S.String }),
).annotate({ identifier: "HostEntry" }) as any as S.Schema<HostEntry>;
export type HostEntryList = HostEntry[];
export const HostEntryList = /*@__PURE__*/ S.Array(HostEntry);
export type DockerLabelsMap = { [key: string]: string | undefined };
export const DockerLabelsMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type UlimitName =
  | "core"
  | "cpu"
  | "data"
  | "fsize"
  | "locks"
  | "memlock"
  | "msgqueue"
  | "nice"
  | "nofile"
  | "nproc"
  | "rss"
  | "rtprio"
  | "rttime"
  | "sigpending"
  | "stack"
  | (string & {});
export const UlimitName = S.String;

export interface Ulimit {
  name: UlimitName;
  softLimit: number;
  hardLimit: number;
}
export const Ulimit = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: UlimitName, softLimit: S.Number, hardLimit: S.Number }),
).annotate({ identifier: "Ulimit" }) as any as S.Schema<Ulimit>;
export type UlimitList = Ulimit[];
export const UlimitList = /*@__PURE__*/ S.Array(Ulimit);
export interface HealthCheck {
  command: string[];
  interval?: number;
  timeout?: number;
  retries?: number;
  startPeriod?: number;
}
export const HealthCheck = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    command: StringList,
    interval: S.optional(S.Number),
    timeout: S.optional(S.Number),
    retries: S.optional(S.Number),
    startPeriod: S.optional(S.Number),
  }),
).annotate({ identifier: "HealthCheck" }) as any as S.Schema<HealthCheck>;
export interface SystemControl {
  namespace?: string;
  value?: string;
}
export const SystemControl = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ namespace: S.optional(S.String), value: S.optional(S.String) }),
).annotate({ identifier: "SystemControl" }) as any as S.Schema<SystemControl>;
export type SystemControls = SystemControl[];
export const SystemControls = /*@__PURE__*/ S.Array(SystemControl);
export type ResourceType =
  | "GPU"
  | "InferenceAccelerator"
  | "NeuronDevice"
  | (string & {});
export const ResourceType = S.String;

export interface ResourceRequirement {
  value: string;
  type: ResourceType;
}
export const ResourceRequirement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ value: S.String, type: ResourceType }),
).annotate({
  identifier: "ResourceRequirement",
}) as any as S.Schema<ResourceRequirement>;
export type ResourceRequirements = ResourceRequirement[];
export const ResourceRequirements = /*@__PURE__*/ S.Array(ResourceRequirement);
export type FirelensConfigurationType = "fluentd" | "fluentbit" | (string & {});
export const FirelensConfigurationType = S.String;

export type FirelensConfigurationOptionsMap = {
  [key: string]: string | undefined;
};
export const FirelensConfigurationOptionsMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface FirelensConfiguration {
  type: FirelensConfigurationType;
  options?: { [key: string]: string | undefined };
}
export const FirelensConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: FirelensConfigurationType,
    options: S.optional(FirelensConfigurationOptionsMap),
  }),
).annotate({
  identifier: "FirelensConfiguration",
}) as any as S.Schema<FirelensConfiguration>;
export interface ContainerDefinition {
  name?: string;
  image?: string;
  repositoryCredentials?: RepositoryCredentials;
  cpu?: number;
  memory?: number;
  memoryReservation?: number;
  links?: string[];
  portMappings?: PortMapping[];
  essential?: boolean;
  restartPolicy?: ContainerRestartPolicy;
  entryPoint?: string[];
  command?: string[];
  environment?: KeyValuePair[];
  environmentFiles?: EnvironmentFile[];
  mountPoints?: MountPoint[];
  volumesFrom?: VolumeFrom[];
  linuxParameters?: LinuxParameters;
  secrets?: Secret[];
  dependsOn?: ContainerDependency[];
  startTimeout?: number;
  stopTimeout?: number;
  versionConsistency?: VersionConsistency;
  hostname?: string;
  user?: string;
  workingDirectory?: string;
  disableNetworking?: boolean;
  privileged?: boolean;
  readonlyRootFilesystem?: boolean;
  dnsServers?: string[];
  dnsSearchDomains?: string[];
  extraHosts?: HostEntry[];
  dockerSecurityOptions?: string[];
  interactive?: boolean;
  pseudoTerminal?: boolean;
  dockerLabels?: { [key: string]: string | undefined };
  ulimits?: Ulimit[];
  logConfiguration?: LogConfiguration;
  healthCheck?: HealthCheck;
  systemControls?: SystemControl[];
  resourceRequirements?: ResourceRequirement[];
  firelensConfiguration?: FirelensConfiguration;
  credentialSpecs?: string[];
}
export const ContainerDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    image: S.optional(S.String),
    repositoryCredentials: S.optional(RepositoryCredentials),
    cpu: S.optional(S.Number),
    memory: S.optional(S.Number),
    memoryReservation: S.optional(S.Number),
    links: S.optional(StringList),
    portMappings: S.optional(PortMappingList),
    essential: S.optional(S.Boolean),
    restartPolicy: S.optional(ContainerRestartPolicy),
    entryPoint: S.optional(StringList),
    command: S.optional(StringList),
    environment: S.optional(EnvironmentVariables),
    environmentFiles: S.optional(EnvironmentFiles),
    mountPoints: S.optional(MountPointList),
    volumesFrom: S.optional(VolumeFromList),
    linuxParameters: S.optional(LinuxParameters),
    secrets: S.optional(SecretList),
    dependsOn: S.optional(ContainerDependencies),
    startTimeout: S.optional(S.Number),
    stopTimeout: S.optional(S.Number),
    versionConsistency: S.optional(VersionConsistency),
    hostname: S.optional(S.String),
    user: S.optional(S.String),
    workingDirectory: S.optional(S.String),
    disableNetworking: S.optional(S.Boolean),
    privileged: S.optional(S.Boolean),
    readonlyRootFilesystem: S.optional(S.Boolean),
    dnsServers: S.optional(StringList),
    dnsSearchDomains: S.optional(StringList),
    extraHosts: S.optional(HostEntryList),
    dockerSecurityOptions: S.optional(StringList),
    interactive: S.optional(S.Boolean),
    pseudoTerminal: S.optional(S.Boolean),
    dockerLabels: S.optional(DockerLabelsMap),
    ulimits: S.optional(UlimitList),
    logConfiguration: S.optional(LogConfiguration),
    healthCheck: S.optional(HealthCheck),
    systemControls: S.optional(SystemControls),
    resourceRequirements: S.optional(ResourceRequirements),
    firelensConfiguration: S.optional(FirelensConfiguration),
    credentialSpecs: S.optional(StringList),
  }),
).annotate({
  identifier: "ContainerDefinition",
}) as any as S.Schema<ContainerDefinition>;
export type ContainerDefinitions = ContainerDefinition[];
export const ContainerDefinitions = /*@__PURE__*/ S.Array(ContainerDefinition);
export type NetworkMode = "bridge" | "host" | "awsvpc" | "none" | (string & {});
export const NetworkMode = S.String;

export interface HostVolumeProperties {
  sourcePath?: string;
}
export const HostVolumeProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sourcePath: S.optional(S.String) }),
).annotate({
  identifier: "HostVolumeProperties",
}) as any as S.Schema<HostVolumeProperties>;
export type Scope = "task" | "shared" | (string & {});
export const Scope = S.String;

export type StringMap = { [key: string]: string | undefined };
export const StringMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface DockerVolumeConfiguration {
  scope?: Scope;
  autoprovision?: boolean;
  driver?: string;
  driverOpts?: { [key: string]: string | undefined };
  labels?: { [key: string]: string | undefined };
}
export const DockerVolumeConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    scope: S.optional(Scope),
    autoprovision: S.optional(S.Boolean),
    driver: S.optional(S.String),
    driverOpts: S.optional(StringMap),
    labels: S.optional(StringMap),
  }),
).annotate({
  identifier: "DockerVolumeConfiguration",
}) as any as S.Schema<DockerVolumeConfiguration>;
export type EFSTransitEncryption = "ENABLED" | "DISABLED" | (string & {});
export const EFSTransitEncryption = S.String;

export type EFSAuthorizationConfigIAM = "ENABLED" | "DISABLED" | (string & {});
export const EFSAuthorizationConfigIAM = S.String;

export interface EFSAuthorizationConfig {
  accessPointId?: string;
  iam?: EFSAuthorizationConfigIAM;
}
export const EFSAuthorizationConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accessPointId: S.optional(S.String),
    iam: S.optional(EFSAuthorizationConfigIAM),
  }),
).annotate({
  identifier: "EFSAuthorizationConfig",
}) as any as S.Schema<EFSAuthorizationConfig>;
export interface EFSVolumeConfiguration {
  fileSystemId: string;
  rootDirectory?: string;
  transitEncryption?: EFSTransitEncryption;
  transitEncryptionPort?: number;
  authorizationConfig?: EFSAuthorizationConfig;
}
export const EFSVolumeConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fileSystemId: S.String,
    rootDirectory: S.optional(S.String),
    transitEncryption: S.optional(EFSTransitEncryption),
    transitEncryptionPort: S.optional(S.Number),
    authorizationConfig: S.optional(EFSAuthorizationConfig),
  }),
).annotate({
  identifier: "EFSVolumeConfiguration",
}) as any as S.Schema<EFSVolumeConfiguration>;
export interface S3FilesVolumeConfiguration {
  fileSystemArn: string;
  rootDirectory?: string;
  transitEncryptionPort?: number;
  accessPointArn?: string;
}
export const S3FilesVolumeConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fileSystemArn: S.String,
    rootDirectory: S.optional(S.String),
    transitEncryptionPort: S.optional(S.Number),
    accessPointArn: S.optional(S.String),
  }),
).annotate({
  identifier: "S3FilesVolumeConfiguration",
}) as any as S.Schema<S3FilesVolumeConfiguration>;
export interface FSxWindowsFileServerAuthorizationConfig {
  credentialsParameter: string;
  domain: string;
}
export const FSxWindowsFileServerAuthorizationConfig = /*@__PURE__*/ S.suspend(
  () => S.Struct({ credentialsParameter: S.String, domain: S.String }),
).annotate({
  identifier: "FSxWindowsFileServerAuthorizationConfig",
}) as any as S.Schema<FSxWindowsFileServerAuthorizationConfig>;
export interface FSxWindowsFileServerVolumeConfiguration {
  fileSystemId: string;
  rootDirectory: string;
  authorizationConfig: FSxWindowsFileServerAuthorizationConfig;
}
export const FSxWindowsFileServerVolumeConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      fileSystemId: S.String,
      rootDirectory: S.String,
      authorizationConfig: FSxWindowsFileServerAuthorizationConfig,
    }),
).annotate({
  identifier: "FSxWindowsFileServerVolumeConfiguration",
}) as any as S.Schema<FSxWindowsFileServerVolumeConfiguration>;
export interface Volume {
  name?: string;
  host?: HostVolumeProperties;
  dockerVolumeConfiguration?: DockerVolumeConfiguration;
  efsVolumeConfiguration?: EFSVolumeConfiguration;
  s3filesVolumeConfiguration?: S3FilesVolumeConfiguration;
  fsxWindowsFileServerVolumeConfiguration?: FSxWindowsFileServerVolumeConfiguration;
  configuredAtLaunch?: boolean;
}
export const Volume = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    host: S.optional(HostVolumeProperties),
    dockerVolumeConfiguration: S.optional(DockerVolumeConfiguration),
    efsVolumeConfiguration: S.optional(EFSVolumeConfiguration),
    s3filesVolumeConfiguration: S.optional(S3FilesVolumeConfiguration),
    fsxWindowsFileServerVolumeConfiguration: S.optional(
      FSxWindowsFileServerVolumeConfiguration,
    ),
    configuredAtLaunch: S.optional(S.Boolean),
  }),
).annotate({ identifier: "Volume" }) as any as S.Schema<Volume>;
export type VolumeList = Volume[];
export const VolumeList = /*@__PURE__*/ S.Array(Volume);
export type TaskDefinitionStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "DELETE_IN_PROGRESS"
  | (string & {});
export const TaskDefinitionStatus = S.String;

export type RequiresAttributes = Attribute[];
export const RequiresAttributes = /*@__PURE__*/ S.Array(Attribute);
export type TaskDefinitionPlacementConstraintType = "memberOf" | (string & {});
export const TaskDefinitionPlacementConstraintType = S.String;

export interface TaskDefinitionPlacementConstraint {
  type?: TaskDefinitionPlacementConstraintType;
  expression?: string;
}
export const TaskDefinitionPlacementConstraint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(TaskDefinitionPlacementConstraintType),
    expression: S.optional(S.String),
  }),
).annotate({
  identifier: "TaskDefinitionPlacementConstraint",
}) as any as S.Schema<TaskDefinitionPlacementConstraint>;
export type TaskDefinitionPlacementConstraints =
  TaskDefinitionPlacementConstraint[];
export const TaskDefinitionPlacementConstraints = /*@__PURE__*/ S.Array(
  TaskDefinitionPlacementConstraint,
);
export type Compatibility =
  | "EC2"
  | "FARGATE"
  | "EXTERNAL"
  | "MANAGED_INSTANCES"
  | (string & {});
export const Compatibility = S.String;

export type CompatibilityList = Compatibility[];
export const CompatibilityList = /*@__PURE__*/ S.Array(Compatibility);
export type CPUArchitecture = "X86_64" | "ARM64" | (string & {});
export const CPUArchitecture = S.String;

export type OSFamily =
  | "WINDOWS_SERVER_2019_FULL"
  | "WINDOWS_SERVER_2019_CORE"
  | "WINDOWS_SERVER_2016_FULL"
  | "WINDOWS_SERVER_2004_CORE"
  | "WINDOWS_SERVER_2022_CORE"
  | "WINDOWS_SERVER_2022_FULL"
  | "WINDOWS_SERVER_2025_CORE"
  | "WINDOWS_SERVER_2025_FULL"
  | "WINDOWS_SERVER_20H2_CORE"
  | "LINUX"
  | (string & {});
export const OSFamily = S.String;

export interface RuntimePlatform {
  cpuArchitecture?: CPUArchitecture;
  operatingSystemFamily?: OSFamily;
}
export const RuntimePlatform = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cpuArchitecture: S.optional(CPUArchitecture),
    operatingSystemFamily: S.optional(OSFamily),
  }),
).annotate({
  identifier: "RuntimePlatform",
}) as any as S.Schema<RuntimePlatform>;
export interface InferenceAccelerator {
  deviceName: string;
  deviceType: string;
}
export const InferenceAccelerator = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ deviceName: S.String, deviceType: S.String }),
).annotate({
  identifier: "InferenceAccelerator",
}) as any as S.Schema<InferenceAccelerator>;
export type InferenceAccelerators = InferenceAccelerator[];
export const InferenceAccelerators =
  /*@__PURE__*/ S.Array(InferenceAccelerator);
export type PidMode = "host" | "task" | (string & {});
export const PidMode = S.String;

export type IpcMode = "host" | "task" | "none" | (string & {});
export const IpcMode = S.String;

export type ProxyConfigurationType = "APPMESH" | (string & {});
export const ProxyConfigurationType = S.String;

export type ProxyConfigurationProperties = KeyValuePair[];
export const ProxyConfigurationProperties = /*@__PURE__*/ S.Array(KeyValuePair);
export interface ProxyConfiguration {
  type?: ProxyConfigurationType;
  containerName: string;
  properties?: KeyValuePair[];
}
export const ProxyConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(ProxyConfigurationType),
    containerName: S.String,
    properties: S.optional(ProxyConfigurationProperties),
  }),
).annotate({
  identifier: "ProxyConfiguration",
}) as any as S.Schema<ProxyConfiguration>;
export interface EphemeralStorage {
  sizeInGiB: number;
}
export const EphemeralStorage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sizeInGiB: S.Number }),
).annotate({
  identifier: "EphemeralStorage",
}) as any as S.Schema<EphemeralStorage>;
export interface TaskDefinition {
  taskDefinitionArn?: string;
  containerDefinitions?: ContainerDefinition[];
  family?: string;
  taskRoleArn?: string;
  executionRoleArn?: string;
  networkMode?: NetworkMode;
  revision?: number;
  volumes?: Volume[];
  status?: TaskDefinitionStatus;
  requiresAttributes?: Attribute[];
  placementConstraints?: TaskDefinitionPlacementConstraint[];
  compatibilities?: Compatibility[];
  runtimePlatform?: RuntimePlatform;
  requiresCompatibilities?: Compatibility[];
  cpu?: string;
  memory?: string;
  inferenceAccelerators?: InferenceAccelerator[];
  pidMode?: PidMode;
  ipcMode?: IpcMode;
  proxyConfiguration?: ProxyConfiguration;
  registeredAt?: Date;
  deregisteredAt?: Date;
  deleteRequestedAt?: Date;
  registeredBy?: string;
  ephemeralStorage?: EphemeralStorage;
  enableFaultInjection?: boolean;
}
export const TaskDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taskDefinitionArn: S.optional(S.String),
    containerDefinitions: S.optional(ContainerDefinitions),
    family: S.optional(S.String),
    taskRoleArn: S.optional(S.String),
    executionRoleArn: S.optional(S.String),
    networkMode: S.optional(NetworkMode),
    revision: S.optional(S.Number),
    volumes: S.optional(VolumeList),
    status: S.optional(TaskDefinitionStatus),
    requiresAttributes: S.optional(RequiresAttributes),
    placementConstraints: S.optional(TaskDefinitionPlacementConstraints),
    compatibilities: S.optional(CompatibilityList),
    runtimePlatform: S.optional(RuntimePlatform),
    requiresCompatibilities: S.optional(CompatibilityList),
    cpu: S.optional(S.String),
    memory: S.optional(S.String),
    inferenceAccelerators: S.optional(InferenceAccelerators),
    pidMode: S.optional(PidMode),
    ipcMode: S.optional(IpcMode),
    proxyConfiguration: S.optional(ProxyConfiguration),
    registeredAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    deregisteredAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    deleteRequestedAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    registeredBy: S.optional(S.String),
    ephemeralStorage: S.optional(EphemeralStorage),
    enableFaultInjection: S.optional(S.Boolean),
  }),
).annotate({ identifier: "TaskDefinition" }) as any as S.Schema<TaskDefinition>;
export type TaskDefinitionList = TaskDefinition[];
export const TaskDefinitionList = /*@__PURE__*/ S.Array(TaskDefinition);
export interface Failure {
  arn?: string;
  reason?: string;
  detail?: string;
}
export const Failure = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    reason: S.optional(S.String),
    detail: S.optional(S.String),
  }),
).annotate({ identifier: "Failure" }) as any as S.Schema<Failure>;
export type Failures = Failure[];
export const Failures = /*@__PURE__*/ S.Array(Failure);
export interface DeleteTaskDefinitionsResponse {
  taskDefinitions?: TaskDefinition[];
  failures?: Failure[];
}
export const DeleteTaskDefinitionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taskDefinitions: S.optional(TaskDefinitionList),
    failures: S.optional(Failures),
  }).pipe(ns),
).annotate({
  identifier: "DeleteTaskDefinitionsResponse",
}) as any as S.Schema<DeleteTaskDefinitionsResponse>;
export interface DeleteTaskSetRequest {
  cluster: string;
  service: string;
  taskSet: string;
  force?: boolean;
}
export const DeleteTaskSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cluster: S.String,
    service: S.String,
    taskSet: S.String,
    force: S.optional(S.Boolean),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteTaskSetRequest",
}) as any as S.Schema<DeleteTaskSetRequest>;
export interface DeleteTaskSetResponse {
  taskSet?: TaskSet;
}
export const DeleteTaskSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ taskSet: S.optional(TaskSet) }).pipe(ns),
).annotate({
  identifier: "DeleteTaskSetResponse",
}) as any as S.Schema<DeleteTaskSetResponse>;
export interface DeregisterContainerInstanceRequest {
  cluster?: string;
  containerInstance: string;
  force?: boolean;
}
export const DeregisterContainerInstanceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cluster: S.optional(S.String),
    containerInstance: S.String,
    force: S.optional(S.Boolean),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeregisterContainerInstanceRequest",
}) as any as S.Schema<DeregisterContainerInstanceRequest>;
export interface VersionInfo {
  agentVersion?: string;
  agentHash?: string;
  dockerVersion?: string;
}
export const VersionInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agentVersion: S.optional(S.String),
    agentHash: S.optional(S.String),
    dockerVersion: S.optional(S.String),
  }),
).annotate({ identifier: "VersionInfo" }) as any as S.Schema<VersionInfo>;
export interface Resource {
  name?: string;
  type?: string;
  doubleValue?: number;
  longValue?: number;
  integerValue?: number;
  stringSetValue?: string[];
}
export const Resource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    type: S.optional(S.String),
    doubleValue: S.optional(S.Number),
    longValue: S.optional(S.Number),
    integerValue: S.optional(S.Number),
    stringSetValue: S.optional(StringList),
  }),
).annotate({ identifier: "Resource" }) as any as S.Schema<Resource>;
export type Resources = Resource[];
export const Resources = /*@__PURE__*/ S.Array(Resource);
export type AgentUpdateStatus =
  | "PENDING"
  | "STAGING"
  | "STAGED"
  | "UPDATING"
  | "UPDATED"
  | "FAILED"
  | (string & {});
export const AgentUpdateStatus = S.String;

export type InstanceHealthCheckState =
  | "OK"
  | "IMPAIRED"
  | "INSUFFICIENT_DATA"
  | "INITIALIZING"
  | (string & {});
export const InstanceHealthCheckState = S.String;

export type InstanceHealthCheckType =
  | "CONTAINER_RUNTIME"
  | "ACCELERATED_COMPUTE"
  | "DAEMON"
  | "AGENT_CONNECTIVITY"
  | (string & {});
export const InstanceHealthCheckType = S.String;

export interface InstanceHealthCheckResult {
  type?: InstanceHealthCheckType;
  status?: InstanceHealthCheckState;
  statusReason?: string;
  lastUpdated?: Date;
  lastStatusChange?: Date;
}
export const InstanceHealthCheckResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(InstanceHealthCheckType),
    status: S.optional(InstanceHealthCheckState),
    statusReason: S.optional(S.String),
    lastUpdated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastStatusChange: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "InstanceHealthCheckResult",
}) as any as S.Schema<InstanceHealthCheckResult>;
export type InstanceHealthCheckResultList = InstanceHealthCheckResult[];
export const InstanceHealthCheckResultList = /*@__PURE__*/ S.Array(
  InstanceHealthCheckResult,
);
export interface ContainerInstanceHealthStatus {
  overallStatus?: InstanceHealthCheckState;
  details?: InstanceHealthCheckResult[];
}
export const ContainerInstanceHealthStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    overallStatus: S.optional(InstanceHealthCheckState),
    details: S.optional(InstanceHealthCheckResultList),
  }),
).annotate({
  identifier: "ContainerInstanceHealthStatus",
}) as any as S.Schema<ContainerInstanceHealthStatus>;
export interface ContainerInstance {
  containerInstanceArn?: string;
  ec2InstanceId?: string;
  capacityProviderName?: string;
  version?: number;
  versionInfo?: VersionInfo;
  remainingResources?: Resource[];
  registeredResources?: Resource[];
  status?: string;
  statusReason?: string;
  agentConnected?: boolean;
  runningTasksCount?: number;
  pendingTasksCount?: number;
  agentUpdateStatus?: AgentUpdateStatus;
  attributes?: Attribute[];
  registeredAt?: Date;
  attachments?: Attachment[];
  tags?: Tag[];
  healthStatus?: ContainerInstanceHealthStatus;
}
export const ContainerInstance = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    containerInstanceArn: S.optional(S.String),
    ec2InstanceId: S.optional(S.String),
    capacityProviderName: S.optional(S.String),
    version: S.optional(S.Number),
    versionInfo: S.optional(VersionInfo),
    remainingResources: S.optional(Resources),
    registeredResources: S.optional(Resources),
    status: S.optional(S.String),
    statusReason: S.optional(S.String),
    agentConnected: S.optional(S.Boolean),
    runningTasksCount: S.optional(S.Number),
    pendingTasksCount: S.optional(S.Number),
    agentUpdateStatus: S.optional(AgentUpdateStatus),
    attributes: S.optional(Attributes),
    registeredAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    attachments: S.optional(Attachments),
    tags: S.optional(Tags),
    healthStatus: S.optional(ContainerInstanceHealthStatus),
  }),
).annotate({
  identifier: "ContainerInstance",
}) as any as S.Schema<ContainerInstance>;
export interface DeregisterContainerInstanceResponse {
  containerInstance?: ContainerInstance;
}
export const DeregisterContainerInstanceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ containerInstance: S.optional(ContainerInstance) }).pipe(ns),
).annotate({
  identifier: "DeregisterContainerInstanceResponse",
}) as any as S.Schema<DeregisterContainerInstanceResponse>;
export interface DeregisterTaskDefinitionRequest {
  taskDefinition: string;
}
export const DeregisterTaskDefinitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ taskDefinition: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeregisterTaskDefinitionRequest",
}) as any as S.Schema<DeregisterTaskDefinitionRequest>;
export interface DeregisterTaskDefinitionResponse {
  taskDefinition?: TaskDefinition;
}
export const DeregisterTaskDefinitionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ taskDefinition: S.optional(TaskDefinition) }).pipe(ns),
).annotate({
  identifier: "DeregisterTaskDefinitionResponse",
}) as any as S.Schema<DeregisterTaskDefinitionResponse>;
export type CapacityProviderField = "TAGS" | (string & {});
export const CapacityProviderField = S.String;

export type CapacityProviderFieldList = CapacityProviderField[];
export const CapacityProviderFieldList = /*@__PURE__*/ S.Array(
  CapacityProviderField,
);
export interface DescribeCapacityProvidersRequest {
  capacityProviders?: string[];
  cluster?: string;
  include?: CapacityProviderField[];
  maxResults?: number;
  nextToken?: string;
}
export const DescribeCapacityProvidersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    capacityProviders: S.optional(StringList),
    cluster: S.optional(S.String),
    include: S.optional(CapacityProviderFieldList),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeCapacityProvidersRequest",
}) as any as S.Schema<DescribeCapacityProvidersRequest>;
export type CapacityProviders = CapacityProvider[];
export const CapacityProviders = /*@__PURE__*/ S.Array(CapacityProvider);
export interface DescribeCapacityProvidersResponse {
  capacityProviders?: CapacityProvider[];
  failures?: Failure[];
  nextToken?: string;
}
export const DescribeCapacityProvidersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    capacityProviders: S.optional(CapacityProviders),
    failures: S.optional(Failures),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeCapacityProvidersResponse",
}) as any as S.Schema<DescribeCapacityProvidersResponse>;
export type ClusterField =
  | "ATTACHMENTS"
  | "CONFIGURATIONS"
  | "SETTINGS"
  | "STATISTICS"
  | "TAGS"
  | (string & {});
export const ClusterField = S.String;

export type ClusterFieldList = ClusterField[];
export const ClusterFieldList = /*@__PURE__*/ S.Array(ClusterField);
export interface DescribeClustersRequest {
  clusters?: string[];
  include?: ClusterField[];
}
export const DescribeClustersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusters: S.optional(StringList),
    include: S.optional(ClusterFieldList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeClustersRequest",
}) as any as S.Schema<DescribeClustersRequest>;
export type Clusters = Cluster[];
export const Clusters = /*@__PURE__*/ S.Array(Cluster);
export interface DescribeClustersResponse {
  clusters?: Cluster[];
  failures?: Failure[];
}
export const DescribeClustersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusters: S.optional(Clusters),
    failures: S.optional(Failures),
  }).pipe(ns),
).annotate({
  identifier: "DescribeClustersResponse",
}) as any as S.Schema<DescribeClustersResponse>;
export type ContainerInstanceField =
  | "TAGS"
  | "CONTAINER_INSTANCE_HEALTH"
  | (string & {});
export const ContainerInstanceField = S.String;

export type ContainerInstanceFieldList = ContainerInstanceField[];
export const ContainerInstanceFieldList = /*@__PURE__*/ S.Array(
  ContainerInstanceField,
);
export interface DescribeContainerInstancesRequest {
  cluster?: string;
  containerInstances: string[];
  include?: ContainerInstanceField[];
}
export const DescribeContainerInstancesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cluster: S.optional(S.String),
    containerInstances: StringList,
    include: S.optional(ContainerInstanceFieldList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeContainerInstancesRequest",
}) as any as S.Schema<DescribeContainerInstancesRequest>;
export type ContainerInstances = ContainerInstance[];
export const ContainerInstances = /*@__PURE__*/ S.Array(ContainerInstance);
export interface DescribeContainerInstancesResponse {
  containerInstances?: ContainerInstance[];
  failures?: Failure[];
}
export const DescribeContainerInstancesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    containerInstances: S.optional(ContainerInstances),
    failures: S.optional(Failures),
  }).pipe(ns),
).annotate({
  identifier: "DescribeContainerInstancesResponse",
}) as any as S.Schema<DescribeContainerInstancesResponse>;
export interface DescribeDaemonRequest {
  daemonArn: string;
}
export const DescribeDaemonRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ daemonArn: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeDaemonRequest",
}) as any as S.Schema<DescribeDaemonRequest>;
export interface DaemonCapacityProvider {
  arn?: string;
  runningCount?: number;
}
export const DaemonCapacityProvider = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.optional(S.String), runningCount: S.optional(S.Number) }),
).annotate({
  identifier: "DaemonCapacityProvider",
}) as any as S.Schema<DaemonCapacityProvider>;
export type DaemonCapacityProviderList = DaemonCapacityProvider[];
export const DaemonCapacityProviderList = /*@__PURE__*/ S.Array(
  DaemonCapacityProvider,
);
export interface DaemonRevisionDetail {
  arn?: string;
  capacityProviders?: DaemonCapacityProvider[];
  totalRunningCount?: number;
}
export const DaemonRevisionDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    capacityProviders: S.optional(DaemonCapacityProviderList),
    totalRunningCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "DaemonRevisionDetail",
}) as any as S.Schema<DaemonRevisionDetail>;
export type DaemonRevisionDetailList = DaemonRevisionDetail[];
export const DaemonRevisionDetailList =
  /*@__PURE__*/ S.Array(DaemonRevisionDetail);
export interface DaemonDetail {
  daemonArn?: string;
  clusterArn?: string;
  status?: DaemonStatus;
  currentRevisions?: DaemonRevisionDetail[];
  deploymentArn?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export const DaemonDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    daemonArn: S.optional(S.String),
    clusterArn: S.optional(S.String),
    status: S.optional(DaemonStatus),
    currentRevisions: S.optional(DaemonRevisionDetailList),
    deploymentArn: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "DaemonDetail" }) as any as S.Schema<DaemonDetail>;
export interface DescribeDaemonResponse {
  daemon?: DaemonDetail;
}
export const DescribeDaemonResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ daemon: S.optional(DaemonDetail) }).pipe(ns),
).annotate({
  identifier: "DescribeDaemonResponse",
}) as any as S.Schema<DescribeDaemonResponse>;
export interface DescribeDaemonDeploymentsRequest {
  daemonDeploymentArns: string[];
}
export const DescribeDaemonDeploymentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ daemonDeploymentArns: StringList }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeDaemonDeploymentsRequest",
}) as any as S.Schema<DescribeDaemonDeploymentsRequest>;
export type DaemonDeploymentStatus =
  | "PENDING"
  | "SUCCESSFUL"
  | "STOPPED"
  | "STOP_REQUESTED"
  | "IN_PROGRESS"
  | "ROLLBACK_IN_PROGRESS"
  | "ROLLBACK_SUCCESSFUL"
  | "ROLLBACK_FAILED"
  | (string & {});
export const DaemonDeploymentStatus = S.String;

export interface DaemonDeploymentCapacityProvider {
  arn?: string;
  runningInstanceCount?: number;
  drainingInstanceCount?: number;
}
export const DaemonDeploymentCapacityProvider = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    runningInstanceCount: S.optional(S.Number),
    drainingInstanceCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "DaemonDeploymentCapacityProvider",
}) as any as S.Schema<DaemonDeploymentCapacityProvider>;
export type DaemonDeploymentCapacityProviderList =
  DaemonDeploymentCapacityProvider[];
export const DaemonDeploymentCapacityProviderList = /*@__PURE__*/ S.Array(
  DaemonDeploymentCapacityProvider,
);
export interface DaemonDeploymentRevisionDetail {
  arn?: string;
  capacityProviders?: DaemonDeploymentCapacityProvider[];
  totalRunningInstanceCount?: number;
  totalDrainingInstanceCount?: number;
}
export const DaemonDeploymentRevisionDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    capacityProviders: S.optional(DaemonDeploymentCapacityProviderList),
    totalRunningInstanceCount: S.optional(S.Number),
    totalDrainingInstanceCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "DaemonDeploymentRevisionDetail",
}) as any as S.Schema<DaemonDeploymentRevisionDetail>;
export type DaemonDeploymentRevisionDetailList =
  DaemonDeploymentRevisionDetail[];
export const DaemonDeploymentRevisionDetailList = /*@__PURE__*/ S.Array(
  DaemonDeploymentRevisionDetail,
);
export type DaemonDeploymentRollbackMonitorsStatus =
  | "TRIGGERED"
  | "MONITORING"
  | "MONITORING_COMPLETE"
  | "DISABLED"
  | (string & {});
export const DaemonDeploymentRollbackMonitorsStatus = S.String;

export interface DaemonCircuitBreaker {
  failureCount?: number;
  status?: DaemonDeploymentRollbackMonitorsStatus;
  threshold?: number;
}
export const DaemonCircuitBreaker = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    failureCount: S.optional(S.Number),
    status: S.optional(DaemonDeploymentRollbackMonitorsStatus),
    threshold: S.optional(S.Number),
  }),
).annotate({
  identifier: "DaemonCircuitBreaker",
}) as any as S.Schema<DaemonCircuitBreaker>;
export interface DaemonDeploymentAlarms {
  status?: DaemonDeploymentRollbackMonitorsStatus;
  alarmNames?: string[];
  triggeredAlarmNames?: string[];
}
export const DaemonDeploymentAlarms = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.optional(DaemonDeploymentRollbackMonitorsStatus),
    alarmNames: S.optional(StringList),
    triggeredAlarmNames: S.optional(StringList),
  }),
).annotate({
  identifier: "DaemonDeploymentAlarms",
}) as any as S.Schema<DaemonDeploymentAlarms>;
export interface DaemonRollback {
  reason?: string;
  startedAt?: Date;
  rollbackTargetDaemonRevisionArn?: string;
  rollbackCapacityProviders?: string[];
}
export const DaemonRollback = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    reason: S.optional(S.String),
    startedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    rollbackTargetDaemonRevisionArn: S.optional(S.String),
    rollbackCapacityProviders: S.optional(StringList),
  }),
).annotate({ identifier: "DaemonRollback" }) as any as S.Schema<DaemonRollback>;
export interface DaemonDeployment {
  daemonDeploymentArn?: string;
  clusterArn?: string;
  status?: DaemonDeploymentStatus;
  statusReason?: string;
  targetDaemonRevision?: DaemonDeploymentRevisionDetail;
  sourceDaemonRevisions?: DaemonDeploymentRevisionDetail[];
  circuitBreaker?: DaemonCircuitBreaker;
  alarms?: DaemonDeploymentAlarms;
  rollback?: DaemonRollback;
  deploymentConfiguration?: DaemonDeploymentConfiguration;
  createdAt?: Date;
  startedAt?: Date;
  stoppedAt?: Date;
  finishedAt?: Date;
}
export const DaemonDeployment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    daemonDeploymentArn: S.optional(S.String),
    clusterArn: S.optional(S.String),
    status: S.optional(DaemonDeploymentStatus),
    statusReason: S.optional(S.String),
    targetDaemonRevision: S.optional(DaemonDeploymentRevisionDetail),
    sourceDaemonRevisions: S.optional(DaemonDeploymentRevisionDetailList),
    circuitBreaker: S.optional(DaemonCircuitBreaker),
    alarms: S.optional(DaemonDeploymentAlarms),
    rollback: S.optional(DaemonRollback),
    deploymentConfiguration: S.optional(DaemonDeploymentConfiguration),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    startedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    stoppedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    finishedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "DaemonDeployment",
}) as any as S.Schema<DaemonDeployment>;
export type DaemonDeploymentList = DaemonDeployment[];
export const DaemonDeploymentList = /*@__PURE__*/ S.Array(DaemonDeployment);
export interface DescribeDaemonDeploymentsResponse {
  failures?: Failure[];
  daemonDeployments?: DaemonDeployment[];
}
export const DescribeDaemonDeploymentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    failures: S.optional(Failures),
    daemonDeployments: S.optional(DaemonDeploymentList),
  }).pipe(ns),
).annotate({
  identifier: "DescribeDaemonDeploymentsResponse",
}) as any as S.Schema<DescribeDaemonDeploymentsResponse>;
export interface DescribeDaemonRevisionsRequest {
  daemonRevisionArns: string[];
}
export const DescribeDaemonRevisionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ daemonRevisionArns: StringList }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeDaemonRevisionsRequest",
}) as any as S.Schema<DescribeDaemonRevisionsRequest>;
export interface DaemonContainerImage {
  containerName?: string;
  imageDigest?: string;
  image?: string;
}
export const DaemonContainerImage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    containerName: S.optional(S.String),
    imageDigest: S.optional(S.String),
    image: S.optional(S.String),
  }),
).annotate({
  identifier: "DaemonContainerImage",
}) as any as S.Schema<DaemonContainerImage>;
export type DaemonContainerImages = DaemonContainerImage[];
export const DaemonContainerImages =
  /*@__PURE__*/ S.Array(DaemonContainerImage);
export interface DaemonRevision {
  daemonRevisionArn?: string;
  clusterArn?: string;
  daemonArn?: string;
  daemonTaskDefinitionArn?: string;
  createdAt?: Date;
  containerImages?: DaemonContainerImage[];
  propagateTags?: DaemonPropagateTags;
  enableECSManagedTags?: boolean;
  enableExecuteCommand?: boolean;
}
export const DaemonRevision = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    daemonRevisionArn: S.optional(S.String),
    clusterArn: S.optional(S.String),
    daemonArn: S.optional(S.String),
    daemonTaskDefinitionArn: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    containerImages: S.optional(DaemonContainerImages),
    propagateTags: S.optional(DaemonPropagateTags),
    enableECSManagedTags: S.optional(S.Boolean),
    enableExecuteCommand: S.optional(S.Boolean),
  }),
).annotate({ identifier: "DaemonRevision" }) as any as S.Schema<DaemonRevision>;
export type DaemonRevisions = DaemonRevision[];
export const DaemonRevisions = /*@__PURE__*/ S.Array(DaemonRevision);
export interface DescribeDaemonRevisionsResponse {
  daemonRevisions?: DaemonRevision[];
  failures?: Failure[];
}
export const DescribeDaemonRevisionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    daemonRevisions: S.optional(DaemonRevisions),
    failures: S.optional(Failures),
  }).pipe(ns),
).annotate({
  identifier: "DescribeDaemonRevisionsResponse",
}) as any as S.Schema<DescribeDaemonRevisionsResponse>;
export interface DescribeDaemonTaskDefinitionRequest {
  daemonTaskDefinition: string;
}
export const DescribeDaemonTaskDefinitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ daemonTaskDefinition: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeDaemonTaskDefinitionRequest",
}) as any as S.Schema<DescribeDaemonTaskDefinitionRequest>;
export interface DaemonLinuxParameters {
  capabilities?: KernelCapabilities;
  devices?: Device[];
  initProcessEnabled?: boolean;
  tmpfs?: Tmpfs[];
}
export const DaemonLinuxParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    capabilities: S.optional(KernelCapabilities),
    devices: S.optional(DevicesList),
    initProcessEnabled: S.optional(S.Boolean),
    tmpfs: S.optional(TmpfsList),
  }),
).annotate({
  identifier: "DaemonLinuxParameters",
}) as any as S.Schema<DaemonLinuxParameters>;
export interface DaemonContainerDefinition {
  name?: string;
  image: string;
  memory?: number;
  memoryReservation?: number;
  repositoryCredentials?: RepositoryCredentials;
  healthCheck?: HealthCheck;
  cpu?: number;
  essential?: boolean;
  entryPoint?: string[];
  command?: string[];
  workingDirectory?: string;
  environmentFiles?: EnvironmentFile[];
  environment?: KeyValuePair[];
  secrets?: Secret[];
  readonlyRootFilesystem?: boolean;
  mountPoints?: MountPoint[];
  logConfiguration?: LogConfiguration;
  firelensConfiguration?: FirelensConfiguration;
  privileged?: boolean;
  user?: string;
  ulimits?: Ulimit[];
  linuxParameters?: DaemonLinuxParameters;
  dependsOn?: ContainerDependency[];
  startTimeout?: number;
  stopTimeout?: number;
  systemControls?: SystemControl[];
  interactive?: boolean;
  pseudoTerminal?: boolean;
  restartPolicy?: ContainerRestartPolicy;
}
export const DaemonContainerDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    image: S.String,
    memory: S.optional(S.Number),
    memoryReservation: S.optional(S.Number),
    repositoryCredentials: S.optional(RepositoryCredentials),
    healthCheck: S.optional(HealthCheck),
    cpu: S.optional(S.Number),
    essential: S.optional(S.Boolean),
    entryPoint: S.optional(StringList),
    command: S.optional(StringList),
    workingDirectory: S.optional(S.String),
    environmentFiles: S.optional(EnvironmentFiles),
    environment: S.optional(EnvironmentVariables),
    secrets: S.optional(SecretList),
    readonlyRootFilesystem: S.optional(S.Boolean),
    mountPoints: S.optional(MountPointList),
    logConfiguration: S.optional(LogConfiguration),
    firelensConfiguration: S.optional(FirelensConfiguration),
    privileged: S.optional(S.Boolean),
    user: S.optional(S.String),
    ulimits: S.optional(UlimitList),
    linuxParameters: S.optional(DaemonLinuxParameters),
    dependsOn: S.optional(ContainerDependencies),
    startTimeout: S.optional(S.Number),
    stopTimeout: S.optional(S.Number),
    systemControls: S.optional(SystemControls),
    interactive: S.optional(S.Boolean),
    pseudoTerminal: S.optional(S.Boolean),
    restartPolicy: S.optional(ContainerRestartPolicy),
  }),
).annotate({
  identifier: "DaemonContainerDefinition",
}) as any as S.Schema<DaemonContainerDefinition>;
export type DaemonContainerDefinitionList = DaemonContainerDefinition[];
export const DaemonContainerDefinitionList = /*@__PURE__*/ S.Array(
  DaemonContainerDefinition,
);
export interface DaemonVolume {
  name?: string;
  host?: HostVolumeProperties;
}
export const DaemonVolume = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    host: S.optional(HostVolumeProperties),
  }),
).annotate({ identifier: "DaemonVolume" }) as any as S.Schema<DaemonVolume>;
export type DaemonVolumeList = DaemonVolume[];
export const DaemonVolumeList = /*@__PURE__*/ S.Array(DaemonVolume);
export type DaemonTaskDefinitionStatus =
  | "ACTIVE"
  | "DELETE_IN_PROGRESS"
  | "DELETED"
  | (string & {});
export const DaemonTaskDefinitionStatus = S.String;

export type DaemonPidMode = "none" | "shared" | (string & {});
export const DaemonPidMode = S.String;

export type DaemonIpcMode = "none" | "shared" | (string & {});
export const DaemonIpcMode = S.String;

export interface DaemonTaskDefinition {
  daemonTaskDefinitionArn?: string;
  family?: string;
  revision?: number;
  taskRoleArn?: string;
  executionRoleArn?: string;
  containerDefinitions?: DaemonContainerDefinition[];
  volumes?: DaemonVolume[];
  cpu?: string;
  memory?: string;
  status?: DaemonTaskDefinitionStatus;
  registeredAt?: Date;
  deleteRequestedAt?: Date;
  registeredBy?: string;
  pidMode?: DaemonPidMode;
  ipcMode?: DaemonIpcMode;
}
export const DaemonTaskDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    daemonTaskDefinitionArn: S.optional(S.String),
    family: S.optional(S.String),
    revision: S.optional(S.Number),
    taskRoleArn: S.optional(S.String),
    executionRoleArn: S.optional(S.String),
    containerDefinitions: S.optional(DaemonContainerDefinitionList),
    volumes: S.optional(DaemonVolumeList),
    cpu: S.optional(S.String),
    memory: S.optional(S.String),
    status: S.optional(DaemonTaskDefinitionStatus),
    registeredAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    deleteRequestedAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    registeredBy: S.optional(S.String),
    pidMode: S.optional(DaemonPidMode),
    ipcMode: S.optional(DaemonIpcMode),
  }),
).annotate({
  identifier: "DaemonTaskDefinition",
}) as any as S.Schema<DaemonTaskDefinition>;
export interface DescribeDaemonTaskDefinitionResponse {
  daemonTaskDefinition?: DaemonTaskDefinition;
}
export const DescribeDaemonTaskDefinitionResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ daemonTaskDefinition: S.optional(DaemonTaskDefinition) }).pipe(
      ns,
    ),
).annotate({
  identifier: "DescribeDaemonTaskDefinitionResponse",
}) as any as S.Schema<DescribeDaemonTaskDefinitionResponse>;
export type ExpressGatewayServiceInclude = "TAGS" | (string & {});
export const ExpressGatewayServiceInclude = S.String;

export type ExpressGatewayServiceIncludeList = ExpressGatewayServiceInclude[];
export const ExpressGatewayServiceIncludeList = /*@__PURE__*/ S.Array(
  ExpressGatewayServiceInclude,
);
export interface DescribeExpressGatewayServiceRequest {
  serviceArn: string;
  include?: ExpressGatewayServiceInclude[];
}
export const DescribeExpressGatewayServiceRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      serviceArn: S.String,
      include: S.optional(ExpressGatewayServiceIncludeList),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeExpressGatewayServiceRequest",
}) as any as S.Schema<DescribeExpressGatewayServiceRequest>;
export interface DescribeExpressGatewayServiceResponse {
  service?: ECSExpressGatewayService;
}
export const DescribeExpressGatewayServiceResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ service: S.optional(ECSExpressGatewayService) }).pipe(ns),
).annotate({
  identifier: "DescribeExpressGatewayServiceResponse",
}) as any as S.Schema<DescribeExpressGatewayServiceResponse>;
export interface DescribeServiceDeploymentsRequest {
  serviceDeploymentArns: string[];
}
export const DescribeServiceDeploymentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ serviceDeploymentArns: StringList }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeServiceDeploymentsRequest",
}) as any as S.Schema<DescribeServiceDeploymentsRequest>;
export interface ServiceRevisionSummary {
  arn?: string;
  requestedTaskCount?: number;
  runningTaskCount?: number;
  pendingTaskCount?: number;
  requestedTestTrafficWeight?: number;
  requestedProductionTrafficWeight?: number;
}
export const ServiceRevisionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    requestedTaskCount: S.optional(S.Number),
    runningTaskCount: S.optional(S.Number),
    pendingTaskCount: S.optional(S.Number),
    requestedTestTrafficWeight: S.optional(S.Number),
    requestedProductionTrafficWeight: S.optional(S.Number),
  }),
).annotate({
  identifier: "ServiceRevisionSummary",
}) as any as S.Schema<ServiceRevisionSummary>;
export type ServiceRevisionsSummaryList = ServiceRevisionSummary[];
export const ServiceRevisionsSummaryList = /*@__PURE__*/ S.Array(
  ServiceRevisionSummary,
);
export type ServiceDeploymentStatus =
  | "PENDING"
  | "SUCCESSFUL"
  | "STOPPED"
  | "STOP_REQUESTED"
  | "IN_PROGRESS"
  | "ROLLBACK_REQUESTED"
  | "ROLLBACK_IN_PROGRESS"
  | "ROLLBACK_SUCCESSFUL"
  | "ROLLBACK_FAILED"
  | (string & {});
export const ServiceDeploymentStatus = S.String;

export type ServiceDeploymentLifecycleStage =
  | "RECONCILE_SERVICE"
  | "PRE_SCALE_UP"
  | "SCALE_UP"
  | "POST_SCALE_UP"
  | "TEST_TRAFFIC_SHIFT"
  | "POST_TEST_TRAFFIC_SHIFT"
  | "PRODUCTION_TRAFFIC_SHIFT"
  | "POST_PRODUCTION_TRAFFIC_SHIFT"
  | "BAKE_TIME"
  | "CLEAN_UP"
  | (string & {});
export const ServiceDeploymentLifecycleStage = S.String;

export type DeploymentLifecycleHookStatus =
  | "AWAITING_ACTION"
  | "IN_PROGRESS"
  | "SUCCEEDED"
  | "FAILED"
  | "TIMED_OUT"
  | (string & {});
export const DeploymentLifecycleHookStatus = S.String;

export interface DeploymentLifecycleHookDetail {
  hookId?: string;
  targetType?: DeploymentLifecycleHookTargetType;
  targetArn?: string;
  status?: DeploymentLifecycleHookStatus;
  expiresAt?: Date;
  timeoutAction?: DeploymentLifecycleHookAction;
}
export const DeploymentLifecycleHookDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    hookId: S.optional(S.String),
    targetType: S.optional(DeploymentLifecycleHookTargetType),
    targetArn: S.optional(S.String),
    status: S.optional(DeploymentLifecycleHookStatus),
    expiresAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    timeoutAction: S.optional(DeploymentLifecycleHookAction),
  }),
).annotate({
  identifier: "DeploymentLifecycleHookDetail",
}) as any as S.Schema<DeploymentLifecycleHookDetail>;
export type DeploymentLifecycleHookDetailList = DeploymentLifecycleHookDetail[];
export const DeploymentLifecycleHookDetailList = /*@__PURE__*/ S.Array(
  DeploymentLifecycleHookDetail,
);
export interface Rollback {
  reason?: string;
  startedAt?: Date;
  serviceRevisionArn?: string;
}
export const Rollback = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    reason: S.optional(S.String),
    startedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    serviceRevisionArn: S.optional(S.String),
  }),
).annotate({ identifier: "Rollback" }) as any as S.Schema<Rollback>;
export type ServiceDeploymentRollbackMonitorsStatus =
  | "TRIGGERED"
  | "MONITORING"
  | "MONITORING_COMPLETE"
  | "DISABLED"
  | (string & {});
export const ServiceDeploymentRollbackMonitorsStatus = S.String;

export interface ServiceDeploymentCircuitBreaker {
  status?: ServiceDeploymentRollbackMonitorsStatus;
  failureCount?: number;
  threshold?: number;
}
export const ServiceDeploymentCircuitBreaker = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.optional(ServiceDeploymentRollbackMonitorsStatus),
    failureCount: S.optional(S.Number),
    threshold: S.optional(S.Number),
  }),
).annotate({
  identifier: "ServiceDeploymentCircuitBreaker",
}) as any as S.Schema<ServiceDeploymentCircuitBreaker>;
export interface ServiceDeploymentAlarms {
  status?: ServiceDeploymentRollbackMonitorsStatus;
  alarmNames?: string[];
  triggeredAlarmNames?: string[];
}
export const ServiceDeploymentAlarms = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.optional(ServiceDeploymentRollbackMonitorsStatus),
    alarmNames: S.optional(StringList),
    triggeredAlarmNames: S.optional(StringList),
  }),
).annotate({
  identifier: "ServiceDeploymentAlarms",
}) as any as S.Schema<ServiceDeploymentAlarms>;
export interface ServiceDeployment {
  serviceDeploymentArn?: string;
  serviceArn?: string;
  clusterArn?: string;
  createdAt?: Date;
  startedAt?: Date;
  finishedAt?: Date;
  stoppedAt?: Date;
  updatedAt?: Date;
  sourceServiceRevisions?: ServiceRevisionSummary[];
  targetServiceRevision?: ServiceRevisionSummary;
  status?: ServiceDeploymentStatus;
  statusReason?: string;
  lifecycleStage?: ServiceDeploymentLifecycleStage;
  lifecycleHookDetails?: DeploymentLifecycleHookDetail[];
  deploymentConfiguration?: DeploymentConfiguration;
  rollback?: Rollback;
  deploymentCircuitBreaker?: ServiceDeploymentCircuitBreaker;
  alarms?: ServiceDeploymentAlarms;
}
export const ServiceDeployment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceDeploymentArn: S.optional(S.String),
    serviceArn: S.optional(S.String),
    clusterArn: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    startedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    finishedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    stoppedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    sourceServiceRevisions: S.optional(ServiceRevisionsSummaryList),
    targetServiceRevision: S.optional(ServiceRevisionSummary),
    status: S.optional(ServiceDeploymentStatus),
    statusReason: S.optional(S.String),
    lifecycleStage: S.optional(ServiceDeploymentLifecycleStage),
    lifecycleHookDetails: S.optional(DeploymentLifecycleHookDetailList),
    deploymentConfiguration: S.optional(DeploymentConfiguration),
    rollback: S.optional(Rollback),
    deploymentCircuitBreaker: S.optional(ServiceDeploymentCircuitBreaker),
    alarms: S.optional(ServiceDeploymentAlarms),
  }),
).annotate({
  identifier: "ServiceDeployment",
}) as any as S.Schema<ServiceDeployment>;
export type ServiceDeployments = ServiceDeployment[];
export const ServiceDeployments = /*@__PURE__*/ S.Array(ServiceDeployment);
export interface DescribeServiceDeploymentsResponse {
  serviceDeployments?: ServiceDeployment[];
  failures?: Failure[];
}
export const DescribeServiceDeploymentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceDeployments: S.optional(ServiceDeployments),
    failures: S.optional(Failures),
  }).pipe(ns),
).annotate({
  identifier: "DescribeServiceDeploymentsResponse",
}) as any as S.Schema<DescribeServiceDeploymentsResponse>;
export interface DescribeServiceRevisionsRequest {
  serviceRevisionArns: string[];
}
export const DescribeServiceRevisionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ serviceRevisionArns: StringList }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeServiceRevisionsRequest",
}) as any as S.Schema<DescribeServiceRevisionsRequest>;
export interface ContainerImage {
  containerName?: string;
  imageDigest?: string;
  image?: string;
}
export const ContainerImage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    containerName: S.optional(S.String),
    imageDigest: S.optional(S.String),
    image: S.optional(S.String),
  }),
).annotate({ identifier: "ContainerImage" }) as any as S.Schema<ContainerImage>;
export type ContainerImages = ContainerImage[];
export const ContainerImages = /*@__PURE__*/ S.Array(ContainerImage);
export interface ServiceRevisionLoadBalancer {
  targetGroupArn?: string;
  productionListenerRule?: string;
}
export const ServiceRevisionLoadBalancer = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    targetGroupArn: S.optional(S.String),
    productionListenerRule: S.optional(S.String),
  }),
).annotate({
  identifier: "ServiceRevisionLoadBalancer",
}) as any as S.Schema<ServiceRevisionLoadBalancer>;
export type ServiceRevisionLoadBalancers = ServiceRevisionLoadBalancer[];
export const ServiceRevisionLoadBalancers = /*@__PURE__*/ S.Array(
  ServiceRevisionLoadBalancer,
);
export interface ResolvedConfiguration {
  loadBalancers?: ServiceRevisionLoadBalancer[];
}
export const ResolvedConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ loadBalancers: S.optional(ServiceRevisionLoadBalancers) }),
).annotate({
  identifier: "ResolvedConfiguration",
}) as any as S.Schema<ResolvedConfiguration>;
export type ManagedResourceStatus =
  | "PROVISIONING"
  | "ACTIVE"
  | "DEPROVISIONING"
  | "DELETED"
  | "FAILED"
  | (string & {});
export const ManagedResourceStatus = S.String;

export interface ManagedLoadBalancer {
  arn?: string;
  status: ManagedResourceStatus;
  statusReason?: string;
  updatedAt: Date;
  scheme: string;
  subnetIds?: string[];
  securityGroupIds?: string[];
}
export const ManagedLoadBalancer = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    status: ManagedResourceStatus,
    statusReason: S.optional(S.String),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    scheme: S.String,
    subnetIds: S.optional(StringList),
    securityGroupIds: S.optional(StringList),
  }),
).annotate({
  identifier: "ManagedLoadBalancer",
}) as any as S.Schema<ManagedLoadBalancer>;
export interface ManagedSecurityGroup {
  arn?: string;
  status: ManagedResourceStatus;
  statusReason?: string;
  updatedAt: Date;
}
export const ManagedSecurityGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    status: ManagedResourceStatus,
    statusReason: S.optional(S.String),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "ManagedSecurityGroup",
}) as any as S.Schema<ManagedSecurityGroup>;
export type ManagedSecurityGroups = ManagedSecurityGroup[];
export const ManagedSecurityGroups =
  /*@__PURE__*/ S.Array(ManagedSecurityGroup);
export interface ManagedCertificate {
  arn?: string;
  status: ManagedResourceStatus;
  statusReason?: string;
  updatedAt: Date;
  domainName: string;
}
export const ManagedCertificate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    status: ManagedResourceStatus,
    statusReason: S.optional(S.String),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    domainName: S.String,
  }),
).annotate({
  identifier: "ManagedCertificate",
}) as any as S.Schema<ManagedCertificate>;
export interface ManagedListener {
  arn?: string;
  status: ManagedResourceStatus;
  statusReason?: string;
  updatedAt: Date;
}
export const ManagedListener = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    status: ManagedResourceStatus,
    statusReason: S.optional(S.String),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "ManagedListener",
}) as any as S.Schema<ManagedListener>;
export interface ManagedListenerRule {
  arn?: string;
  status: ManagedResourceStatus;
  statusReason?: string;
  updatedAt: Date;
}
export const ManagedListenerRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    status: ManagedResourceStatus,
    statusReason: S.optional(S.String),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "ManagedListenerRule",
}) as any as S.Schema<ManagedListenerRule>;
export interface ManagedTargetGroup {
  arn?: string;
  status: ManagedResourceStatus;
  statusReason?: string;
  updatedAt: Date;
  healthCheckPath: string;
  healthCheckPort: number;
  port: number;
}
export const ManagedTargetGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    status: ManagedResourceStatus,
    statusReason: S.optional(S.String),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    healthCheckPath: S.String,
    healthCheckPort: S.Number,
    port: S.Number,
  }),
).annotate({
  identifier: "ManagedTargetGroup",
}) as any as S.Schema<ManagedTargetGroup>;
export type ManagedTargetGroups = ManagedTargetGroup[];
export const ManagedTargetGroups = /*@__PURE__*/ S.Array(ManagedTargetGroup);
export interface ManagedIngressPath {
  accessType: AccessType;
  endpoint: string;
  loadBalancer?: ManagedLoadBalancer;
  loadBalancerSecurityGroups?: ManagedSecurityGroup[];
  certificate?: ManagedCertificate;
  listener?: ManagedListener;
  rule?: ManagedListenerRule;
  targetGroups?: ManagedTargetGroup[];
}
export const ManagedIngressPath = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accessType: AccessType,
    endpoint: S.String,
    loadBalancer: S.optional(ManagedLoadBalancer),
    loadBalancerSecurityGroups: S.optional(ManagedSecurityGroups),
    certificate: S.optional(ManagedCertificate),
    listener: S.optional(ManagedListener),
    rule: S.optional(ManagedListenerRule),
    targetGroups: S.optional(ManagedTargetGroups),
  }),
).annotate({
  identifier: "ManagedIngressPath",
}) as any as S.Schema<ManagedIngressPath>;
export type ManagedIngressPaths = ManagedIngressPath[];
export const ManagedIngressPaths = /*@__PURE__*/ S.Array(ManagedIngressPath);
export interface ManagedScalableTarget {
  arn?: string;
  status: ManagedResourceStatus;
  statusReason?: string;
  updatedAt: Date;
  minCapacity: number;
  maxCapacity: number;
}
export const ManagedScalableTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    status: ManagedResourceStatus,
    statusReason: S.optional(S.String),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    minCapacity: S.Number,
    maxCapacity: S.Number,
  }),
).annotate({
  identifier: "ManagedScalableTarget",
}) as any as S.Schema<ManagedScalableTarget>;
export interface ManagedApplicationAutoScalingPolicy {
  arn?: string;
  status: ManagedResourceStatus;
  statusReason?: string;
  updatedAt: Date;
  policyType: string;
  targetValue: number;
  metric: string;
}
export const ManagedApplicationAutoScalingPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    status: ManagedResourceStatus,
    statusReason: S.optional(S.String),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    policyType: S.String,
    targetValue: S.Number,
    metric: S.String,
  }),
).annotate({
  identifier: "ManagedApplicationAutoScalingPolicy",
}) as any as S.Schema<ManagedApplicationAutoScalingPolicy>;
export type ManagedApplicationAutoScalingPolicies =
  ManagedApplicationAutoScalingPolicy[];
export const ManagedApplicationAutoScalingPolicies = /*@__PURE__*/ S.Array(
  ManagedApplicationAutoScalingPolicy,
);
export interface ManagedAutoScaling {
  scalableTarget?: ManagedScalableTarget;
  applicationAutoScalingPolicies?: ManagedApplicationAutoScalingPolicy[];
}
export const ManagedAutoScaling = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    scalableTarget: S.optional(ManagedScalableTarget),
    applicationAutoScalingPolicies: S.optional(
      ManagedApplicationAutoScalingPolicies,
    ),
  }),
).annotate({
  identifier: "ManagedAutoScaling",
}) as any as S.Schema<ManagedAutoScaling>;
export interface ManagedMetricAlarm {
  arn?: string;
  status: ManagedResourceStatus;
  statusReason?: string;
  updatedAt: Date;
}
export const ManagedMetricAlarm = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    status: ManagedResourceStatus,
    statusReason: S.optional(S.String),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "ManagedMetricAlarm",
}) as any as S.Schema<ManagedMetricAlarm>;
export type ManagedMetricAlarms = ManagedMetricAlarm[];
export const ManagedMetricAlarms = /*@__PURE__*/ S.Array(ManagedMetricAlarm);
export interface ManagedLogGroup {
  arn?: string;
  status: ManagedResourceStatus;
  statusReason?: string;
  updatedAt: Date;
  logGroupName: string;
}
export const ManagedLogGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    status: ManagedResourceStatus,
    statusReason: S.optional(S.String),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    logGroupName: S.String,
  }),
).annotate({
  identifier: "ManagedLogGroup",
}) as any as S.Schema<ManagedLogGroup>;
export type ManagedLogGroups = ManagedLogGroup[];
export const ManagedLogGroups = /*@__PURE__*/ S.Array(ManagedLogGroup);
export interface ECSManagedResources {
  ingressPaths?: ManagedIngressPath[];
  autoScaling?: ManagedAutoScaling;
  metricAlarms?: ManagedMetricAlarm[];
  serviceSecurityGroups?: ManagedSecurityGroup[];
  logGroups?: ManagedLogGroup[];
}
export const ECSManagedResources = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ingressPaths: S.optional(ManagedIngressPaths),
    autoScaling: S.optional(ManagedAutoScaling),
    metricAlarms: S.optional(ManagedMetricAlarms),
    serviceSecurityGroups: S.optional(ManagedSecurityGroups),
    logGroups: S.optional(ManagedLogGroups),
  }),
).annotate({
  identifier: "ECSManagedResources",
}) as any as S.Schema<ECSManagedResources>;
export interface RuntimePlatformOverride {
  cpuArchitecture?: string;
}
export const RuntimePlatformOverride = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ cpuArchitecture: S.optional(S.String) }),
).annotate({
  identifier: "RuntimePlatformOverride",
}) as any as S.Schema<RuntimePlatformOverride>;
export interface ServiceRevisionOverrides {
  runtimePlatform?: RuntimePlatformOverride;
}
export const ServiceRevisionOverrides = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ runtimePlatform: S.optional(RuntimePlatformOverride) }),
).annotate({
  identifier: "ServiceRevisionOverrides",
}) as any as S.Schema<ServiceRevisionOverrides>;
export interface ServiceRevision {
  serviceRevisionArn?: string;
  serviceArn?: string;
  clusterArn?: string;
  taskDefinition?: string;
  capacityProviderStrategy?: CapacityProviderStrategyItem[];
  launchType?: LaunchType;
  platformVersion?: string;
  platformFamily?: string;
  loadBalancers?: LoadBalancer[];
  serviceRegistries?: ServiceRegistry[];
  networkConfiguration?: NetworkConfiguration;
  containerImages?: ContainerImage[];
  guardDutyEnabled?: boolean;
  serviceConnectConfiguration?: ServiceConnectConfiguration;
  volumeConfigurations?: ServiceVolumeConfiguration[];
  fargateEphemeralStorage?: DeploymentEphemeralStorage;
  createdAt?: Date;
  vpcLatticeConfigurations?: VpcLatticeConfiguration[];
  resolvedConfiguration?: ResolvedConfiguration;
  ecsManagedResources?: ECSManagedResources;
  overrides?: ServiceRevisionOverrides;
  monitoring?: MonitoringConfiguration;
}
export const ServiceRevision = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceRevisionArn: S.optional(S.String),
    serviceArn: S.optional(S.String),
    clusterArn: S.optional(S.String),
    taskDefinition: S.optional(S.String),
    capacityProviderStrategy: S.optional(CapacityProviderStrategy),
    launchType: S.optional(LaunchType),
    platformVersion: S.optional(S.String),
    platformFamily: S.optional(S.String),
    loadBalancers: S.optional(LoadBalancers),
    serviceRegistries: S.optional(ServiceRegistries),
    networkConfiguration: S.optional(NetworkConfiguration),
    containerImages: S.optional(ContainerImages),
    guardDutyEnabled: S.optional(S.Boolean),
    serviceConnectConfiguration: S.optional(ServiceConnectConfiguration),
    volumeConfigurations: S.optional(ServiceVolumeConfigurations),
    fargateEphemeralStorage: S.optional(DeploymentEphemeralStorage),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    vpcLatticeConfigurations: S.optional(VpcLatticeConfigurations),
    resolvedConfiguration: S.optional(ResolvedConfiguration),
    ecsManagedResources: S.optional(ECSManagedResources),
    overrides: S.optional(ServiceRevisionOverrides),
    monitoring: S.optional(MonitoringConfiguration),
  }),
).annotate({
  identifier: "ServiceRevision",
}) as any as S.Schema<ServiceRevision>;
export type ServiceRevisions = ServiceRevision[];
export const ServiceRevisions = /*@__PURE__*/ S.Array(ServiceRevision);
export interface DescribeServiceRevisionsResponse {
  serviceRevisions?: ServiceRevision[];
  failures?: Failure[];
}
export const DescribeServiceRevisionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceRevisions: S.optional(ServiceRevisions),
    failures: S.optional(Failures),
  }).pipe(ns),
).annotate({
  identifier: "DescribeServiceRevisionsResponse",
}) as any as S.Schema<DescribeServiceRevisionsResponse>;
export type ServiceField = "TAGS" | (string & {});
export const ServiceField = S.String;

export type ServiceFieldList = ServiceField[];
export const ServiceFieldList = /*@__PURE__*/ S.Array(ServiceField);
export interface DescribeServicesRequest {
  cluster?: string;
  services: string[];
  include?: ServiceField[];
}
export const DescribeServicesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cluster: S.optional(S.String),
    services: StringList,
    include: S.optional(ServiceFieldList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeServicesRequest",
}) as any as S.Schema<DescribeServicesRequest>;
export type Services = Service[];
export const Services = /*@__PURE__*/ S.Array(Service);
export interface DescribeServicesResponse {
  services?: Service[];
  failures?: Failure[];
}
export const DescribeServicesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    services: S.optional(Services),
    failures: S.optional(Failures),
  }).pipe(ns),
).annotate({
  identifier: "DescribeServicesResponse",
}) as any as S.Schema<DescribeServicesResponse>;
export type TaskDefinitionField = "TAGS" | (string & {});
export const TaskDefinitionField = S.String;

export type TaskDefinitionFieldList = TaskDefinitionField[];
export const TaskDefinitionFieldList =
  /*@__PURE__*/ S.Array(TaskDefinitionField);
export interface DescribeTaskDefinitionRequest {
  taskDefinition: string;
  include?: TaskDefinitionField[];
}
export const DescribeTaskDefinitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taskDefinition: S.String,
    include: S.optional(TaskDefinitionFieldList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeTaskDefinitionRequest",
}) as any as S.Schema<DescribeTaskDefinitionRequest>;
export interface DescribeTaskDefinitionResponse {
  taskDefinition?: TaskDefinition;
  tags?: Tag[];
}
export const DescribeTaskDefinitionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taskDefinition: S.optional(TaskDefinition),
    tags: S.optional(Tags),
  }).pipe(ns),
).annotate({
  identifier: "DescribeTaskDefinitionResponse",
}) as any as S.Schema<DescribeTaskDefinitionResponse>;
export type TaskField = "TAGS" | (string & {});
export const TaskField = S.String;

export type TaskFieldList = TaskField[];
export const TaskFieldList = /*@__PURE__*/ S.Array(TaskField);
export interface DescribeTasksRequest {
  cluster?: string;
  tasks: string[];
  include?: TaskField[];
}
export const DescribeTasksRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cluster: S.optional(S.String),
    tasks: StringList,
    include: S.optional(TaskFieldList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeTasksRequest",
}) as any as S.Schema<DescribeTasksRequest>;
export type Connectivity = "CONNECTED" | "DISCONNECTED" | (string & {});
export const Connectivity = S.String;

export interface NetworkBinding {
  bindIP?: string;
  containerPort?: number;
  hostPort?: number;
  protocol?: TransportProtocol;
  containerPortRange?: string;
  hostPortRange?: string;
}
export const NetworkBinding = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bindIP: S.optional(S.String),
    containerPort: S.optional(S.Number),
    hostPort: S.optional(S.Number),
    protocol: S.optional(TransportProtocol),
    containerPortRange: S.optional(S.String),
    hostPortRange: S.optional(S.String),
  }),
).annotate({ identifier: "NetworkBinding" }) as any as S.Schema<NetworkBinding>;
export type NetworkBindings = NetworkBinding[];
export const NetworkBindings = /*@__PURE__*/ S.Array(NetworkBinding);
export interface NetworkInterface {
  attachmentId?: string;
  privateIpv4Address?: string;
  ipv6Address?: string;
}
export const NetworkInterface = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    attachmentId: S.optional(S.String),
    privateIpv4Address: S.optional(S.String),
    ipv6Address: S.optional(S.String),
  }),
).annotate({
  identifier: "NetworkInterface",
}) as any as S.Schema<NetworkInterface>;
export type NetworkInterfaces = NetworkInterface[];
export const NetworkInterfaces = /*@__PURE__*/ S.Array(NetworkInterface);
export type HealthStatus = "HEALTHY" | "UNHEALTHY" | "UNKNOWN" | (string & {});
export const HealthStatus = S.String;

export type ManagedAgentName = "ExecuteCommandAgent" | (string & {});
export const ManagedAgentName = S.String;

export interface ManagedAgent {
  lastStartedAt?: Date;
  name?: ManagedAgentName;
  reason?: string;
  lastStatus?: string;
}
export const ManagedAgent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    lastStartedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    name: S.optional(ManagedAgentName),
    reason: S.optional(S.String),
    lastStatus: S.optional(S.String),
  }),
).annotate({ identifier: "ManagedAgent" }) as any as S.Schema<ManagedAgent>;
export type ManagedAgents = ManagedAgent[];
export const ManagedAgents = /*@__PURE__*/ S.Array(ManagedAgent);
export type GpuIds = string[];
export const GpuIds = /*@__PURE__*/ S.Array(S.String);
export type NeuronDeviceIds = string[];
export const NeuronDeviceIds = /*@__PURE__*/ S.Array(S.String);
export interface Container {
  containerArn?: string;
  taskArn?: string;
  name?: string;
  image?: string;
  imageDigest?: string;
  runtimeId?: string;
  lastStatus?: string;
  exitCode?: number;
  reason?: string;
  networkBindings?: NetworkBinding[];
  networkInterfaces?: NetworkInterface[];
  healthStatus?: HealthStatus;
  managedAgents?: ManagedAgent[];
  cpu?: string;
  memory?: string;
  memoryReservation?: string;
  gpuIds?: string[];
  neuronDeviceIds?: string[];
}
export const Container = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    containerArn: S.optional(S.String),
    taskArn: S.optional(S.String),
    name: S.optional(S.String),
    image: S.optional(S.String),
    imageDigest: S.optional(S.String),
    runtimeId: S.optional(S.String),
    lastStatus: S.optional(S.String),
    exitCode: S.optional(S.Number),
    reason: S.optional(S.String),
    networkBindings: S.optional(NetworkBindings),
    networkInterfaces: S.optional(NetworkInterfaces),
    healthStatus: S.optional(HealthStatus),
    managedAgents: S.optional(ManagedAgents),
    cpu: S.optional(S.String),
    memory: S.optional(S.String),
    memoryReservation: S.optional(S.String),
    gpuIds: S.optional(GpuIds),
    neuronDeviceIds: S.optional(NeuronDeviceIds),
  }),
).annotate({ identifier: "Container" }) as any as S.Schema<Container>;
export type Containers = Container[];
export const Containers = /*@__PURE__*/ S.Array(Container);
export interface ContainerOverride {
  name?: string;
  command?: string[];
  environment?: KeyValuePair[];
  environmentFiles?: EnvironmentFile[];
  cpu?: number;
  memory?: number;
  memoryReservation?: number;
  resourceRequirements?: ResourceRequirement[];
}
export const ContainerOverride = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    command: S.optional(StringList),
    environment: S.optional(EnvironmentVariables),
    environmentFiles: S.optional(EnvironmentFiles),
    cpu: S.optional(S.Number),
    memory: S.optional(S.Number),
    memoryReservation: S.optional(S.Number),
    resourceRequirements: S.optional(ResourceRequirements),
  }),
).annotate({
  identifier: "ContainerOverride",
}) as any as S.Schema<ContainerOverride>;
export type ContainerOverrides = ContainerOverride[];
export const ContainerOverrides = /*@__PURE__*/ S.Array(ContainerOverride);
export interface InferenceAcceleratorOverride {
  deviceName?: string;
  deviceType?: string;
}
export const InferenceAcceleratorOverride = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deviceName: S.optional(S.String),
    deviceType: S.optional(S.String),
  }),
).annotate({
  identifier: "InferenceAcceleratorOverride",
}) as any as S.Schema<InferenceAcceleratorOverride>;
export type InferenceAcceleratorOverrides = InferenceAcceleratorOverride[];
export const InferenceAcceleratorOverrides = /*@__PURE__*/ S.Array(
  InferenceAcceleratorOverride,
);
export interface TaskOverride {
  containerOverrides?: ContainerOverride[];
  cpu?: string;
  inferenceAcceleratorOverrides?: InferenceAcceleratorOverride[];
  executionRoleArn?: string;
  memory?: string;
  taskRoleArn?: string;
  ephemeralStorage?: EphemeralStorage;
}
export const TaskOverride = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    containerOverrides: S.optional(ContainerOverrides),
    cpu: S.optional(S.String),
    inferenceAcceleratorOverrides: S.optional(InferenceAcceleratorOverrides),
    executionRoleArn: S.optional(S.String),
    memory: S.optional(S.String),
    taskRoleArn: S.optional(S.String),
    ephemeralStorage: S.optional(EphemeralStorage),
  }),
).annotate({ identifier: "TaskOverride" }) as any as S.Schema<TaskOverride>;
export type TaskStopCode =
  | "TaskFailedToStart"
  | "EssentialContainerExited"
  | "UserInitiated"
  | "ServiceSchedulerInitiated"
  | "SpotInterruption"
  | "TerminationNotice"
  | "InfrastructureHealth"
  | (string & {});
export const TaskStopCode = S.String;

export interface TaskEphemeralStorage {
  sizeInGiB?: number;
  kmsKeyId?: string;
}
export const TaskEphemeralStorage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sizeInGiB: S.optional(S.Number), kmsKeyId: S.optional(S.String) }),
).annotate({
  identifier: "TaskEphemeralStorage",
}) as any as S.Schema<TaskEphemeralStorage>;
export interface Task {
  attachments?: Attachment[];
  attributes?: Attribute[];
  availabilityZone?: string;
  capacityProviderName?: string;
  clusterArn?: string;
  connectivity?: Connectivity;
  connectivityAt?: Date;
  containerInstanceArn?: string;
  containers?: Container[];
  cpu?: string;
  createdAt?: Date;
  desiredStatus?: string;
  enableExecuteCommand?: boolean;
  executionStoppedAt?: Date;
  group?: string;
  healthStatus?: HealthStatus;
  inferenceAccelerators?: InferenceAccelerator[];
  lastStatus?: string;
  launchType?: LaunchType;
  memory?: string;
  overrides?: TaskOverride;
  platformVersion?: string;
  platformFamily?: string;
  pullStartedAt?: Date;
  pullStoppedAt?: Date;
  startedAt?: Date;
  startedBy?: string;
  stopCode?: TaskStopCode;
  stoppedAt?: Date;
  stoppedReason?: string;
  stoppingAt?: Date;
  tags?: Tag[];
  taskArn?: string;
  taskDefinitionArn?: string;
  version?: number;
  ephemeralStorage?: EphemeralStorage;
  fargateEphemeralStorage?: TaskEphemeralStorage;
}
export const Task = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    attachments: S.optional(Attachments),
    attributes: S.optional(Attributes),
    availabilityZone: S.optional(S.String),
    capacityProviderName: S.optional(S.String),
    clusterArn: S.optional(S.String),
    connectivity: S.optional(Connectivity),
    connectivityAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    containerInstanceArn: S.optional(S.String),
    containers: S.optional(Containers),
    cpu: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    desiredStatus: S.optional(S.String),
    enableExecuteCommand: S.optional(S.Boolean),
    executionStoppedAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    group: S.optional(S.String),
    healthStatus: S.optional(HealthStatus),
    inferenceAccelerators: S.optional(InferenceAccelerators),
    lastStatus: S.optional(S.String),
    launchType: S.optional(LaunchType),
    memory: S.optional(S.String),
    overrides: S.optional(TaskOverride),
    platformVersion: S.optional(S.String),
    platformFamily: S.optional(S.String),
    pullStartedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    pullStoppedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    startedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    startedBy: S.optional(S.String),
    stopCode: S.optional(TaskStopCode),
    stoppedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    stoppedReason: S.optional(S.String),
    stoppingAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    tags: S.optional(Tags),
    taskArn: S.optional(S.String),
    taskDefinitionArn: S.optional(S.String),
    version: S.optional(S.Number),
    ephemeralStorage: S.optional(EphemeralStorage),
    fargateEphemeralStorage: S.optional(TaskEphemeralStorage),
  }),
).annotate({ identifier: "Task" }) as any as S.Schema<Task>;
export type Tasks = Task[];
export const Tasks = /*@__PURE__*/ S.Array(Task);
export interface DescribeTasksResponse {
  tasks?: Task[];
  failures?: Failure[];
}
export const DescribeTasksResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tasks: S.optional(Tasks), failures: S.optional(Failures) }).pipe(
    ns,
  ),
).annotate({
  identifier: "DescribeTasksResponse",
}) as any as S.Schema<DescribeTasksResponse>;
export type TaskSetField = "TAGS" | (string & {});
export const TaskSetField = S.String;

export type TaskSetFieldList = TaskSetField[];
export const TaskSetFieldList = /*@__PURE__*/ S.Array(TaskSetField);
export interface DescribeTaskSetsRequest {
  cluster: string;
  service: string;
  taskSets?: string[];
  include?: TaskSetField[];
}
export const DescribeTaskSetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cluster: S.String,
    service: S.String,
    taskSets: S.optional(StringList),
    include: S.optional(TaskSetFieldList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeTaskSetsRequest",
}) as any as S.Schema<DescribeTaskSetsRequest>;
export interface DescribeTaskSetsResponse {
  taskSets?: TaskSet[];
  failures?: Failure[];
}
export const DescribeTaskSetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taskSets: S.optional(TaskSets),
    failures: S.optional(Failures),
  }).pipe(ns),
).annotate({
  identifier: "DescribeTaskSetsResponse",
}) as any as S.Schema<DescribeTaskSetsResponse>;
export interface DiscoverPollEndpointRequest {
  containerInstance?: string;
  cluster?: string;
}
export const DiscoverPollEndpointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    containerInstance: S.optional(S.String),
    cluster: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DiscoverPollEndpointRequest",
}) as any as S.Schema<DiscoverPollEndpointRequest>;
export interface DiscoverPollEndpointResponse {
  endpoint?: string;
  telemetryEndpoint?: string;
  serviceConnectEndpoint?: string;
}
export const DiscoverPollEndpointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    endpoint: S.optional(S.String),
    telemetryEndpoint: S.optional(S.String),
    serviceConnectEndpoint: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DiscoverPollEndpointResponse",
}) as any as S.Schema<DiscoverPollEndpointResponse>;
export interface ExecuteCommandRequest {
  cluster?: string;
  container?: string;
  command: string;
  interactive: boolean;
  task: string;
}
export const ExecuteCommandRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cluster: S.optional(S.String),
    container: S.optional(S.String),
    command: S.String,
    interactive: S.Boolean,
    task: S.String,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ExecuteCommandRequest",
}) as any as S.Schema<ExecuteCommandRequest>;
export type SensitiveString = string | redacted.Redacted<string>;
export interface Session {
  sessionId?: string;
  streamUrl?: string;
  tokenValue?: string | redacted.Redacted<string>;
}
export const Session = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionId: S.optional(S.String),
    streamUrl: S.optional(S.String),
    tokenValue: S.optional(SensitiveString),
  }),
).annotate({ identifier: "Session" }) as any as S.Schema<Session>;
export interface ExecuteCommandResponse {
  clusterArn?: string;
  containerArn?: string;
  containerName?: string;
  interactive?: boolean;
  session?: Session;
  taskArn?: string;
}
export const ExecuteCommandResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterArn: S.optional(S.String),
    containerArn: S.optional(S.String),
    containerName: S.optional(S.String),
    interactive: S.optional(S.Boolean),
    session: S.optional(Session),
    taskArn: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ExecuteCommandResponse",
}) as any as S.Schema<ExecuteCommandResponse>;
export interface GetTaskProtectionRequest {
  cluster: string;
  tasks?: string[];
}
export const GetTaskProtectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ cluster: S.String, tasks: S.optional(StringList) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetTaskProtectionRequest",
}) as any as S.Schema<GetTaskProtectionRequest>;
export interface ProtectedTask {
  taskArn?: string;
  protectionEnabled?: boolean;
  expirationDate?: Date;
}
export const ProtectedTask = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taskArn: S.optional(S.String),
    protectionEnabled: S.optional(S.Boolean),
    expirationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "ProtectedTask" }) as any as S.Schema<ProtectedTask>;
export type ProtectedTasks = ProtectedTask[];
export const ProtectedTasks = /*@__PURE__*/ S.Array(ProtectedTask);
export interface GetTaskProtectionResponse {
  protectedTasks?: ProtectedTask[];
  failures?: Failure[];
}
export const GetTaskProtectionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    protectedTasks: S.optional(ProtectedTasks),
    failures: S.optional(Failures),
  }).pipe(ns),
).annotate({
  identifier: "GetTaskProtectionResponse",
}) as any as S.Schema<GetTaskProtectionResponse>;
export interface ListAccountSettingsRequest {
  name?: SettingName;
  value?: string;
  principalArn?: string;
  effectiveSettings?: boolean;
  nextToken?: string;
  maxResults?: number;
}
export const ListAccountSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(SettingName),
    value: S.optional(S.String),
    principalArn: S.optional(S.String),
    effectiveSettings: S.optional(S.Boolean),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAccountSettingsRequest",
}) as any as S.Schema<ListAccountSettingsRequest>;
export type Settings = Setting[];
export const Settings = /*@__PURE__*/ S.Array(Setting);
export interface ListAccountSettingsResponse {
  settings?: Setting[];
  nextToken?: string;
}
export const ListAccountSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    settings: S.optional(Settings),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListAccountSettingsResponse",
}) as any as S.Schema<ListAccountSettingsResponse>;
export interface ListAttributesRequest {
  cluster?: string;
  targetType: TargetType;
  attributeName?: string;
  attributeValue?: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListAttributesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cluster: S.optional(S.String),
    targetType: TargetType,
    attributeName: S.optional(S.String),
    attributeValue: S.optional(S.String),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAttributesRequest",
}) as any as S.Schema<ListAttributesRequest>;
export interface ListAttributesResponse {
  attributes?: Attribute[];
  nextToken?: string;
}
export const ListAttributesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    attributes: S.optional(Attributes),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListAttributesResponse",
}) as any as S.Schema<ListAttributesResponse>;
export interface ListClustersRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListClustersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
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
export interface ListClustersResponse {
  clusterArns?: string[];
  nextToken?: string;
}
export const ListClustersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterArns: S.optional(StringList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListClustersResponse",
}) as any as S.Schema<ListClustersResponse>;
export type ContainerInstanceStatus =
  | "ACTIVE"
  | "DRAINING"
  | "REGISTERING"
  | "DEREGISTERING"
  | "REGISTRATION_FAILED"
  | (string & {});
export const ContainerInstanceStatus = S.String;

export interface ListContainerInstancesRequest {
  cluster?: string;
  filter?: string;
  nextToken?: string;
  maxResults?: number;
  status?: ContainerInstanceStatus;
}
export const ListContainerInstancesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cluster: S.optional(S.String),
    filter: S.optional(S.String),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
    status: S.optional(ContainerInstanceStatus),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListContainerInstancesRequest",
}) as any as S.Schema<ListContainerInstancesRequest>;
export interface ListContainerInstancesResponse {
  containerInstanceArns?: string[];
  nextToken?: string;
}
export const ListContainerInstancesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    containerInstanceArns: S.optional(StringList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListContainerInstancesResponse",
}) as any as S.Schema<ListContainerInstancesResponse>;
export type DaemonDeploymentStatusList = DaemonDeploymentStatus[];
export const DaemonDeploymentStatusList = /*@__PURE__*/ S.Array(
  DaemonDeploymentStatus,
);
export interface CreatedAt {
  before?: Date;
  after?: Date;
}
export const CreatedAt = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    before: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    after: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "CreatedAt" }) as any as S.Schema<CreatedAt>;
export interface ListDaemonDeploymentsRequest {
  daemonArn: string;
  status?: DaemonDeploymentStatus[];
  createdAt?: CreatedAt;
  maxResults?: number;
  nextToken?: string;
}
export const ListDaemonDeploymentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    daemonArn: S.String,
    status: S.optional(DaemonDeploymentStatusList),
    createdAt: S.optional(CreatedAt),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDaemonDeploymentsRequest",
}) as any as S.Schema<ListDaemonDeploymentsRequest>;
export interface DaemonDeploymentSummary {
  daemonDeploymentArn?: string;
  daemonArn?: string;
  clusterArn?: string;
  status?: DaemonDeploymentStatus;
  statusReason?: string;
  targetDaemonRevisionArn?: string;
  createdAt?: Date;
  startedAt?: Date;
  stoppedAt?: Date;
  finishedAt?: Date;
}
export const DaemonDeploymentSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    daemonDeploymentArn: S.optional(S.String),
    daemonArn: S.optional(S.String),
    clusterArn: S.optional(S.String),
    status: S.optional(DaemonDeploymentStatus),
    statusReason: S.optional(S.String),
    targetDaemonRevisionArn: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    startedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    stoppedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    finishedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "DaemonDeploymentSummary",
}) as any as S.Schema<DaemonDeploymentSummary>;
export type DaemonDeploymentSummaryList = DaemonDeploymentSummary[];
export const DaemonDeploymentSummaryList = /*@__PURE__*/ S.Array(
  DaemonDeploymentSummary,
);
export interface ListDaemonDeploymentsResponse {
  nextToken?: string;
  daemonDeployments?: DaemonDeploymentSummary[];
}
export const ListDaemonDeploymentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    daemonDeployments: S.optional(DaemonDeploymentSummaryList),
  }).pipe(ns),
).annotate({
  identifier: "ListDaemonDeploymentsResponse",
}) as any as S.Schema<ListDaemonDeploymentsResponse>;
export interface ListDaemonsRequest {
  clusterArn?: string;
  capacityProviderArns?: string[];
  maxResults?: number;
  nextToken?: string;
}
export const ListDaemonsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterArn: S.optional(S.String),
    capacityProviderArns: S.optional(StringList),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDaemonsRequest",
}) as any as S.Schema<ListDaemonsRequest>;
export interface DaemonSummary {
  daemonArn?: string;
  status?: DaemonStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
export const DaemonSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    daemonArn: S.optional(S.String),
    status: S.optional(DaemonStatus),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "DaemonSummary" }) as any as S.Schema<DaemonSummary>;
export type DaemonSummariesList = DaemonSummary[];
export const DaemonSummariesList = /*@__PURE__*/ S.Array(DaemonSummary);
export interface ListDaemonsResponse {
  daemonSummariesList?: DaemonSummary[];
  nextToken?: string;
}
export const ListDaemonsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    daemonSummariesList: S.optional(DaemonSummariesList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListDaemonsResponse",
}) as any as S.Schema<ListDaemonsResponse>;
export type DaemonTaskDefinitionRevisionFilter =
  | "LAST_REGISTERED"
  | (string & {});
export const DaemonTaskDefinitionRevisionFilter = S.String;

export type DaemonTaskDefinitionStatusFilter =
  | "ACTIVE"
  | "DELETE_IN_PROGRESS"
  | "ALL"
  | (string & {});
export const DaemonTaskDefinitionStatusFilter = S.String;

export type SortOrder = "ASC" | "DESC" | (string & {});
export const SortOrder = S.String;

export interface ListDaemonTaskDefinitionsRequest {
  familyPrefix?: string;
  family?: string;
  revision?: DaemonTaskDefinitionRevisionFilter;
  status?: DaemonTaskDefinitionStatusFilter;
  sort?: SortOrder;
  nextToken?: string;
  maxResults?: number;
}
export const ListDaemonTaskDefinitionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    familyPrefix: S.optional(S.String),
    family: S.optional(S.String),
    revision: S.optional(DaemonTaskDefinitionRevisionFilter),
    status: S.optional(DaemonTaskDefinitionStatusFilter),
    sort: S.optional(SortOrder),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDaemonTaskDefinitionsRequest",
}) as any as S.Schema<ListDaemonTaskDefinitionsRequest>;
export interface DaemonTaskDefinitionSummary {
  arn?: string;
  registeredAt?: Date;
  registeredBy?: string;
  deleteRequestedAt?: Date;
  status?: DaemonTaskDefinitionStatus;
}
export const DaemonTaskDefinitionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    registeredAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    registeredBy: S.optional(S.String),
    deleteRequestedAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    status: S.optional(DaemonTaskDefinitionStatus),
  }),
).annotate({
  identifier: "DaemonTaskDefinitionSummary",
}) as any as S.Schema<DaemonTaskDefinitionSummary>;
export type DaemonTaskDefinitionSummaries = DaemonTaskDefinitionSummary[];
export const DaemonTaskDefinitionSummaries = /*@__PURE__*/ S.Array(
  DaemonTaskDefinitionSummary,
);
export interface ListDaemonTaskDefinitionsResponse {
  daemonTaskDefinitions?: DaemonTaskDefinitionSummary[];
  nextToken?: string;
}
export const ListDaemonTaskDefinitionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    daemonTaskDefinitions: S.optional(DaemonTaskDefinitionSummaries),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListDaemonTaskDefinitionsResponse",
}) as any as S.Schema<ListDaemonTaskDefinitionsResponse>;
export type ServiceDeploymentStatusList = ServiceDeploymentStatus[];
export const ServiceDeploymentStatusList = /*@__PURE__*/ S.Array(
  ServiceDeploymentStatus,
);
export interface ListServiceDeploymentsRequest {
  service: string;
  cluster?: string;
  status?: ServiceDeploymentStatus[];
  createdAt?: CreatedAt;
  nextToken?: string;
  maxResults?: number;
}
export const ListServiceDeploymentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    service: S.String,
    cluster: S.optional(S.String),
    status: S.optional(ServiceDeploymentStatusList),
    createdAt: S.optional(CreatedAt),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListServiceDeploymentsRequest",
}) as any as S.Schema<ListServiceDeploymentsRequest>;
export interface ServiceDeploymentBrief {
  serviceDeploymentArn?: string;
  serviceArn?: string;
  clusterArn?: string;
  startedAt?: Date;
  createdAt?: Date;
  finishedAt?: Date;
  targetServiceRevisionArn?: string;
  status?: ServiceDeploymentStatus;
  statusReason?: string;
}
export const ServiceDeploymentBrief = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceDeploymentArn: S.optional(S.String),
    serviceArn: S.optional(S.String),
    clusterArn: S.optional(S.String),
    startedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    finishedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    targetServiceRevisionArn: S.optional(S.String),
    status: S.optional(ServiceDeploymentStatus),
    statusReason: S.optional(S.String),
  }),
).annotate({
  identifier: "ServiceDeploymentBrief",
}) as any as S.Schema<ServiceDeploymentBrief>;
export type ServiceDeploymentsBrief = ServiceDeploymentBrief[];
export const ServiceDeploymentsBrief = /*@__PURE__*/ S.Array(
  ServiceDeploymentBrief,
);
export interface ListServiceDeploymentsResponse {
  serviceDeployments?: ServiceDeploymentBrief[];
  nextToken?: string;
}
export const ListServiceDeploymentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceDeployments: S.optional(ServiceDeploymentsBrief),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListServiceDeploymentsResponse",
}) as any as S.Schema<ListServiceDeploymentsResponse>;
export interface ListServicesRequest {
  cluster?: string;
  nextToken?: string;
  maxResults?: number;
  launchType?: LaunchType;
  schedulingStrategy?: SchedulingStrategy;
  resourceManagementType?: ResourceManagementType;
}
export const ListServicesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cluster: S.optional(S.String),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
    launchType: S.optional(LaunchType),
    schedulingStrategy: S.optional(SchedulingStrategy),
    resourceManagementType: S.optional(ResourceManagementType),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListServicesRequest",
}) as any as S.Schema<ListServicesRequest>;
export interface ListServicesResponse {
  serviceArns?: string[];
  nextToken?: string;
}
export const ListServicesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceArns: S.optional(StringList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListServicesResponse",
}) as any as S.Schema<ListServicesResponse>;
export interface ListServicesByNamespaceRequest {
  namespace: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListServicesByNamespaceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    namespace: S.String,
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListServicesByNamespaceRequest",
}) as any as S.Schema<ListServicesByNamespaceRequest>;
export interface ListServicesByNamespaceResponse {
  serviceArns?: string[];
  nextToken?: string;
}
export const ListServicesByNamespaceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceArns: S.optional(StringList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListServicesByNamespaceResponse",
}) as any as S.Schema<ListServicesByNamespaceResponse>;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
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
  tags?: Tag[];
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: S.optional(Tags) }).pipe(ns),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export type TaskDefinitionFamilyStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "ALL"
  | (string & {});
export const TaskDefinitionFamilyStatus = S.String;

export interface ListTaskDefinitionFamiliesRequest {
  familyPrefix?: string;
  status?: TaskDefinitionFamilyStatus;
  nextToken?: string;
  maxResults?: number;
}
export const ListTaskDefinitionFamiliesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    familyPrefix: S.optional(S.String),
    status: S.optional(TaskDefinitionFamilyStatus),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTaskDefinitionFamiliesRequest",
}) as any as S.Schema<ListTaskDefinitionFamiliesRequest>;
export interface ListTaskDefinitionFamiliesResponse {
  families?: string[];
  nextToken?: string;
}
export const ListTaskDefinitionFamiliesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    families: S.optional(StringList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListTaskDefinitionFamiliesResponse",
}) as any as S.Schema<ListTaskDefinitionFamiliesResponse>;
export interface ListTaskDefinitionsRequest {
  familyPrefix?: string;
  status?: TaskDefinitionStatus;
  sort?: SortOrder;
  nextToken?: string;
  maxResults?: number;
}
export const ListTaskDefinitionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    familyPrefix: S.optional(S.String),
    status: S.optional(TaskDefinitionStatus),
    sort: S.optional(SortOrder),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTaskDefinitionsRequest",
}) as any as S.Schema<ListTaskDefinitionsRequest>;
export interface ListTaskDefinitionsResponse {
  taskDefinitionArns?: string[];
  nextToken?: string;
}
export const ListTaskDefinitionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taskDefinitionArns: S.optional(StringList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListTaskDefinitionsResponse",
}) as any as S.Schema<ListTaskDefinitionsResponse>;
export type DesiredStatus = "RUNNING" | "PENDING" | "STOPPED" | (string & {});
export const DesiredStatus = S.String;

export interface ListTasksRequest {
  cluster?: string;
  containerInstance?: string;
  family?: string;
  nextToken?: string;
  maxResults?: number;
  startedBy?: string;
  serviceName?: string;
  desiredStatus?: DesiredStatus;
  launchType?: LaunchType;
  daemonName?: string;
}
export const ListTasksRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cluster: S.optional(S.String),
    containerInstance: S.optional(S.String),
    family: S.optional(S.String),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
    startedBy: S.optional(S.String),
    serviceName: S.optional(S.String),
    desiredStatus: S.optional(DesiredStatus),
    launchType: S.optional(LaunchType),
    daemonName: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTasksRequest",
}) as any as S.Schema<ListTasksRequest>;
export interface ListTasksResponse {
  taskArns?: string[];
  nextToken?: string;
}
export const ListTasksResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taskArns: S.optional(StringList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListTasksResponse",
}) as any as S.Schema<ListTasksResponse>;
export interface PutAccountSettingRequest {
  name: SettingName;
  value: string;
  principalArn?: string;
}
export const PutAccountSettingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: SettingName,
    value: S.String,
    principalArn: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutAccountSettingRequest",
}) as any as S.Schema<PutAccountSettingRequest>;
export interface PutAccountSettingResponse {
  setting?: Setting;
}
export const PutAccountSettingResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ setting: S.optional(Setting) }).pipe(ns),
).annotate({
  identifier: "PutAccountSettingResponse",
}) as any as S.Schema<PutAccountSettingResponse>;
export interface PutAccountSettingDefaultRequest {
  name: SettingName;
  value: string;
}
export const PutAccountSettingDefaultRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: SettingName, value: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutAccountSettingDefaultRequest",
}) as any as S.Schema<PutAccountSettingDefaultRequest>;
export interface PutAccountSettingDefaultResponse {
  setting?: Setting;
}
export const PutAccountSettingDefaultResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ setting: S.optional(Setting) }).pipe(ns),
).annotate({
  identifier: "PutAccountSettingDefaultResponse",
}) as any as S.Schema<PutAccountSettingDefaultResponse>;
export interface PutAttributesRequest {
  cluster?: string;
  attributes: Attribute[];
}
export const PutAttributesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ cluster: S.optional(S.String), attributes: Attributes }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutAttributesRequest",
}) as any as S.Schema<PutAttributesRequest>;
export interface PutAttributesResponse {
  attributes?: Attribute[];
}
export const PutAttributesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ attributes: S.optional(Attributes) }).pipe(ns),
).annotate({
  identifier: "PutAttributesResponse",
}) as any as S.Schema<PutAttributesResponse>;
export interface PutClusterCapacityProvidersRequest {
  cluster: string;
  capacityProviders: string[];
  defaultCapacityProviderStrategy: CapacityProviderStrategyItem[];
}
export const PutClusterCapacityProvidersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cluster: S.String,
    capacityProviders: StringList,
    defaultCapacityProviderStrategy: CapacityProviderStrategy,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutClusterCapacityProvidersRequest",
}) as any as S.Schema<PutClusterCapacityProvidersRequest>;
export interface PutClusterCapacityProvidersResponse {
  cluster?: Cluster;
}
export const PutClusterCapacityProvidersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ cluster: S.optional(Cluster) }).pipe(ns),
).annotate({
  identifier: "PutClusterCapacityProvidersResponse",
}) as any as S.Schema<PutClusterCapacityProvidersResponse>;
export type PlatformDeviceType = "GPU" | "NEURON_DEVICE" | (string & {});
export const PlatformDeviceType = S.String;

export interface PlatformDevice {
  id: string;
  type: PlatformDeviceType;
}
export const PlatformDevice = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String, type: PlatformDeviceType }),
).annotate({ identifier: "PlatformDevice" }) as any as S.Schema<PlatformDevice>;
export type PlatformDevices = PlatformDevice[];
export const PlatformDevices = /*@__PURE__*/ S.Array(PlatformDevice);
export interface RegisterContainerInstanceRequest {
  cluster?: string;
  instanceIdentityDocument?: string;
  instanceIdentityDocumentSignature?: string;
  totalResources?: Resource[];
  versionInfo?: VersionInfo;
  containerInstanceArn?: string;
  attributes?: Attribute[];
  platformDevices?: PlatformDevice[];
  tags?: Tag[];
}
export const RegisterContainerInstanceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cluster: S.optional(S.String),
    instanceIdentityDocument: S.optional(S.String),
    instanceIdentityDocumentSignature: S.optional(S.String),
    totalResources: S.optional(Resources),
    versionInfo: S.optional(VersionInfo),
    containerInstanceArn: S.optional(S.String),
    attributes: S.optional(Attributes),
    platformDevices: S.optional(PlatformDevices),
    tags: S.optional(Tags),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RegisterContainerInstanceRequest",
}) as any as S.Schema<RegisterContainerInstanceRequest>;
export interface RegisterContainerInstanceResponse {
  containerInstance?: ContainerInstance;
}
export const RegisterContainerInstanceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ containerInstance: S.optional(ContainerInstance) }).pipe(ns),
).annotate({
  identifier: "RegisterContainerInstanceResponse",
}) as any as S.Schema<RegisterContainerInstanceResponse>;
export interface RegisterDaemonTaskDefinitionRequest {
  family: string;
  taskRoleArn?: string;
  executionRoleArn?: string;
  containerDefinitions: DaemonContainerDefinition[];
  cpu?: string;
  memory?: string;
  volumes?: DaemonVolume[];
  tags?: Tag[];
  pidMode?: DaemonPidMode;
  ipcMode?: DaemonIpcMode;
}
export const RegisterDaemonTaskDefinitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    family: S.String,
    taskRoleArn: S.optional(S.String),
    executionRoleArn: S.optional(S.String),
    containerDefinitions: DaemonContainerDefinitionList,
    cpu: S.optional(S.String),
    memory: S.optional(S.String),
    volumes: S.optional(DaemonVolumeList),
    tags: S.optional(Tags),
    pidMode: S.optional(DaemonPidMode),
    ipcMode: S.optional(DaemonIpcMode),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RegisterDaemonTaskDefinitionRequest",
}) as any as S.Schema<RegisterDaemonTaskDefinitionRequest>;
export interface RegisterDaemonTaskDefinitionResponse {
  daemonTaskDefinitionArn?: string;
}
export const RegisterDaemonTaskDefinitionResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ daemonTaskDefinitionArn: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "RegisterDaemonTaskDefinitionResponse",
}) as any as S.Schema<RegisterDaemonTaskDefinitionResponse>;
export interface RegisterTaskDefinitionRequest {
  family: string;
  taskRoleArn?: string;
  executionRoleArn?: string;
  networkMode?: NetworkMode;
  containerDefinitions: ContainerDefinition[];
  volumes?: Volume[];
  placementConstraints?: TaskDefinitionPlacementConstraint[];
  requiresCompatibilities?: Compatibility[];
  cpu?: string;
  memory?: string;
  tags?: Tag[];
  pidMode?: PidMode;
  ipcMode?: IpcMode;
  proxyConfiguration?: ProxyConfiguration;
  inferenceAccelerators?: InferenceAccelerator[];
  ephemeralStorage?: EphemeralStorage;
  runtimePlatform?: RuntimePlatform;
  enableFaultInjection?: boolean;
}
export const RegisterTaskDefinitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    family: S.String,
    taskRoleArn: S.optional(S.String),
    executionRoleArn: S.optional(S.String),
    networkMode: S.optional(NetworkMode),
    containerDefinitions: ContainerDefinitions,
    volumes: S.optional(VolumeList),
    placementConstraints: S.optional(TaskDefinitionPlacementConstraints),
    requiresCompatibilities: S.optional(CompatibilityList),
    cpu: S.optional(S.String),
    memory: S.optional(S.String),
    tags: S.optional(Tags),
    pidMode: S.optional(PidMode),
    ipcMode: S.optional(IpcMode),
    proxyConfiguration: S.optional(ProxyConfiguration),
    inferenceAccelerators: S.optional(InferenceAccelerators),
    ephemeralStorage: S.optional(EphemeralStorage),
    runtimePlatform: S.optional(RuntimePlatform),
    enableFaultInjection: S.optional(S.Boolean),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RegisterTaskDefinitionRequest",
}) as any as S.Schema<RegisterTaskDefinitionRequest>;
export interface RegisterTaskDefinitionResponse {
  taskDefinition?: TaskDefinition;
  tags?: Tag[];
}
export const RegisterTaskDefinitionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taskDefinition: S.optional(TaskDefinition),
    tags: S.optional(Tags),
  }).pipe(ns),
).annotate({
  identifier: "RegisterTaskDefinitionResponse",
}) as any as S.Schema<RegisterTaskDefinitionResponse>;
export interface TaskManagedEBSVolumeTerminationPolicy {
  deleteOnTermination: boolean;
}
export const TaskManagedEBSVolumeTerminationPolicy = /*@__PURE__*/ S.suspend(
  () => S.Struct({ deleteOnTermination: S.Boolean }),
).annotate({
  identifier: "TaskManagedEBSVolumeTerminationPolicy",
}) as any as S.Schema<TaskManagedEBSVolumeTerminationPolicy>;
export interface TaskManagedEBSVolumeConfiguration {
  encrypted?: boolean;
  kmsKeyId?: string;
  volumeType?: string;
  sizeInGiB?: number;
  snapshotId?: string;
  volumeInitializationRate?: number;
  iops?: number;
  throughput?: number;
  tagSpecifications?: EBSTagSpecification[];
  roleArn: string;
  terminationPolicy?: TaskManagedEBSVolumeTerminationPolicy;
  filesystemType?: TaskFilesystemType;
}
export const TaskManagedEBSVolumeConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    encrypted: S.optional(S.Boolean),
    kmsKeyId: S.optional(S.String),
    volumeType: S.optional(S.String),
    sizeInGiB: S.optional(S.Number),
    snapshotId: S.optional(S.String),
    volumeInitializationRate: S.optional(S.Number),
    iops: S.optional(S.Number),
    throughput: S.optional(S.Number),
    tagSpecifications: S.optional(EBSTagSpecifications),
    roleArn: S.String,
    terminationPolicy: S.optional(TaskManagedEBSVolumeTerminationPolicy),
    filesystemType: S.optional(TaskFilesystemType),
  }),
).annotate({
  identifier: "TaskManagedEBSVolumeConfiguration",
}) as any as S.Schema<TaskManagedEBSVolumeConfiguration>;
export interface TaskVolumeConfiguration {
  name: string;
  managedEBSVolume?: TaskManagedEBSVolumeConfiguration;
}
export const TaskVolumeConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    managedEBSVolume: S.optional(TaskManagedEBSVolumeConfiguration),
  }),
).annotate({
  identifier: "TaskVolumeConfiguration",
}) as any as S.Schema<TaskVolumeConfiguration>;
export type TaskVolumeConfigurations = TaskVolumeConfiguration[];
export const TaskVolumeConfigurations = /*@__PURE__*/ S.Array(
  TaskVolumeConfiguration,
);
export interface RunTaskRequest {
  capacityProviderStrategy?: CapacityProviderStrategyItem[];
  cluster?: string;
  count?: number;
  enableECSManagedTags?: boolean;
  enableExecuteCommand?: boolean;
  group?: string;
  launchType?: LaunchType;
  networkConfiguration?: NetworkConfiguration;
  overrides?: TaskOverride;
  placementConstraints?: PlacementConstraint[];
  placementStrategy?: PlacementStrategy[];
  platformVersion?: string;
  propagateTags?: PropagateTags;
  referenceId?: string;
  startedBy?: string;
  tags?: Tag[];
  taskDefinition: string;
  clientToken?: string;
  volumeConfigurations?: TaskVolumeConfiguration[];
}
export const RunTaskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    capacityProviderStrategy: S.optional(CapacityProviderStrategy),
    cluster: S.optional(S.String),
    count: S.optional(S.Number),
    enableECSManagedTags: S.optional(S.Boolean),
    enableExecuteCommand: S.optional(S.Boolean),
    group: S.optional(S.String),
    launchType: S.optional(LaunchType),
    networkConfiguration: S.optional(NetworkConfiguration),
    overrides: S.optional(TaskOverride),
    placementConstraints: S.optional(PlacementConstraints),
    placementStrategy: S.optional(PlacementStrategies),
    platformVersion: S.optional(S.String),
    propagateTags: S.optional(PropagateTags),
    referenceId: S.optional(S.String),
    startedBy: S.optional(S.String),
    tags: S.optional(Tags),
    taskDefinition: S.String,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    volumeConfigurations: S.optional(TaskVolumeConfigurations),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "RunTaskRequest" }) as any as S.Schema<RunTaskRequest>;
export interface RunTaskResponse {
  tasks?: Task[];
  failures?: Failure[];
}
export const RunTaskResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tasks: S.optional(Tasks), failures: S.optional(Failures) }).pipe(
    ns,
  ),
).annotate({
  identifier: "RunTaskResponse",
}) as any as S.Schema<RunTaskResponse>;
export interface StartTaskRequest {
  cluster?: string;
  containerInstances: string[];
  enableECSManagedTags?: boolean;
  enableExecuteCommand?: boolean;
  group?: string;
  networkConfiguration?: NetworkConfiguration;
  overrides?: TaskOverride;
  propagateTags?: PropagateTags;
  referenceId?: string;
  startedBy?: string;
  tags?: Tag[];
  taskDefinition: string;
  volumeConfigurations?: TaskVolumeConfiguration[];
}
export const StartTaskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cluster: S.optional(S.String),
    containerInstances: StringList,
    enableECSManagedTags: S.optional(S.Boolean),
    enableExecuteCommand: S.optional(S.Boolean),
    group: S.optional(S.String),
    networkConfiguration: S.optional(NetworkConfiguration),
    overrides: S.optional(TaskOverride),
    propagateTags: S.optional(PropagateTags),
    referenceId: S.optional(S.String),
    startedBy: S.optional(S.String),
    tags: S.optional(Tags),
    taskDefinition: S.String,
    volumeConfigurations: S.optional(TaskVolumeConfigurations),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartTaskRequest",
}) as any as S.Schema<StartTaskRequest>;
export interface StartTaskResponse {
  tasks?: Task[];
  failures?: Failure[];
}
export const StartTaskResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tasks: S.optional(Tasks), failures: S.optional(Failures) }).pipe(
    ns,
  ),
).annotate({
  identifier: "StartTaskResponse",
}) as any as S.Schema<StartTaskResponse>;
export type StopServiceDeploymentStopType =
  | "ABORT"
  | "ROLLBACK"
  | (string & {});
export const StopServiceDeploymentStopType = S.String;

export interface StopServiceDeploymentRequest {
  serviceDeploymentArn: string;
  stopType?: StopServiceDeploymentStopType;
}
export const StopServiceDeploymentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceDeploymentArn: S.String,
    stopType: S.optional(StopServiceDeploymentStopType),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopServiceDeploymentRequest",
}) as any as S.Schema<StopServiceDeploymentRequest>;
export interface StopServiceDeploymentResponse {
  serviceDeploymentArn?: string;
}
export const StopServiceDeploymentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ serviceDeploymentArn: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "StopServiceDeploymentResponse",
}) as any as S.Schema<StopServiceDeploymentResponse>;
export interface StopTaskRequest {
  cluster?: string;
  task: string;
  reason?: string;
}
export const StopTaskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cluster: S.optional(S.String),
    task: S.String,
    reason: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopTaskRequest",
}) as any as S.Schema<StopTaskRequest>;
export interface StopTaskResponse {
  task?: Task;
}
export const StopTaskResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ task: S.optional(Task) }).pipe(ns),
).annotate({
  identifier: "StopTaskResponse",
}) as any as S.Schema<StopTaskResponse>;
export interface AttachmentStateChange {
  attachmentArn: string;
  status: string;
}
export const AttachmentStateChange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ attachmentArn: S.String, status: S.String }),
).annotate({
  identifier: "AttachmentStateChange",
}) as any as S.Schema<AttachmentStateChange>;
export type AttachmentStateChanges = AttachmentStateChange[];
export const AttachmentStateChanges = /*@__PURE__*/ S.Array(
  AttachmentStateChange,
);
export interface SubmitAttachmentStateChangesRequest {
  cluster?: string;
  attachments: AttachmentStateChange[];
}
export const SubmitAttachmentStateChangesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cluster: S.optional(S.String),
    attachments: AttachmentStateChanges,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SubmitAttachmentStateChangesRequest",
}) as any as S.Schema<SubmitAttachmentStateChangesRequest>;
export interface SubmitAttachmentStateChangesResponse {
  acknowledgment?: string;
}
export const SubmitAttachmentStateChangesResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ acknowledgment: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "SubmitAttachmentStateChangesResponse",
}) as any as S.Schema<SubmitAttachmentStateChangesResponse>;
export interface SubmitContainerStateChangeRequest {
  cluster?: string;
  task?: string;
  containerName?: string;
  runtimeId?: string;
  status?: string;
  exitCode?: number;
  reason?: string;
  networkBindings?: NetworkBinding[];
}
export const SubmitContainerStateChangeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cluster: S.optional(S.String),
    task: S.optional(S.String),
    containerName: S.optional(S.String),
    runtimeId: S.optional(S.String),
    status: S.optional(S.String),
    exitCode: S.optional(S.Number),
    reason: S.optional(S.String),
    networkBindings: S.optional(NetworkBindings),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SubmitContainerStateChangeRequest",
}) as any as S.Schema<SubmitContainerStateChangeRequest>;
export interface SubmitContainerStateChangeResponse {
  acknowledgment?: string;
}
export const SubmitContainerStateChangeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ acknowledgment: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "SubmitContainerStateChangeResponse",
}) as any as S.Schema<SubmitContainerStateChangeResponse>;
export interface ContainerStateChange {
  containerName?: string;
  imageDigest?: string;
  runtimeId?: string;
  exitCode?: number;
  networkBindings?: NetworkBinding[];
  reason?: string;
  status?: string;
}
export const ContainerStateChange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    containerName: S.optional(S.String),
    imageDigest: S.optional(S.String),
    runtimeId: S.optional(S.String),
    exitCode: S.optional(S.Number),
    networkBindings: S.optional(NetworkBindings),
    reason: S.optional(S.String),
    status: S.optional(S.String),
  }),
).annotate({
  identifier: "ContainerStateChange",
}) as any as S.Schema<ContainerStateChange>;
export type ContainerStateChanges = ContainerStateChange[];
export const ContainerStateChanges =
  /*@__PURE__*/ S.Array(ContainerStateChange);
export interface ManagedAgentStateChange {
  containerName: string;
  managedAgentName: ManagedAgentName;
  status: string;
  reason?: string;
}
export const ManagedAgentStateChange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    containerName: S.String,
    managedAgentName: ManagedAgentName,
    status: S.String,
    reason: S.optional(S.String),
  }),
).annotate({
  identifier: "ManagedAgentStateChange",
}) as any as S.Schema<ManagedAgentStateChange>;
export type ManagedAgentStateChanges = ManagedAgentStateChange[];
export const ManagedAgentStateChanges = /*@__PURE__*/ S.Array(
  ManagedAgentStateChange,
);
export interface SubmitTaskStateChangeRequest {
  cluster?: string;
  task?: string;
  status?: string;
  reason?: string;
  containers?: ContainerStateChange[];
  attachments?: AttachmentStateChange[];
  managedAgents?: ManagedAgentStateChange[];
  pullStartedAt?: Date;
  pullStoppedAt?: Date;
  executionStoppedAt?: Date;
}
export const SubmitTaskStateChangeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cluster: S.optional(S.String),
    task: S.optional(S.String),
    status: S.optional(S.String),
    reason: S.optional(S.String),
    containers: S.optional(ContainerStateChanges),
    attachments: S.optional(AttachmentStateChanges),
    managedAgents: S.optional(ManagedAgentStateChanges),
    pullStartedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    pullStoppedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    executionStoppedAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SubmitTaskStateChangeRequest",
}) as any as S.Schema<SubmitTaskStateChangeRequest>;
export interface SubmitTaskStateChangeResponse {
  acknowledgment?: string;
}
export const SubmitTaskStateChangeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ acknowledgment: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "SubmitTaskStateChangeResponse",
}) as any as S.Schema<SubmitTaskStateChangeResponse>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String, tags: Tags }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
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
  S.Struct({}).pipe(ns),
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
  S.Struct({ resourceArn: S.String, tagKeys: TagKeys }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
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
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export interface AutoScalingGroupProviderUpdate {
  managedScaling?: ManagedScaling;
  managedTerminationProtection?: ManagedTerminationProtection;
  managedDraining?: ManagedDraining;
}
export const AutoScalingGroupProviderUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    managedScaling: S.optional(ManagedScaling),
    managedTerminationProtection: S.optional(ManagedTerminationProtection),
    managedDraining: S.optional(ManagedDraining),
  }),
).annotate({
  identifier: "AutoScalingGroupProviderUpdate",
}) as any as S.Schema<AutoScalingGroupProviderUpdate>;
export interface InstanceLaunchTemplateUpdate {
  ec2InstanceProfileArn?: string;
  networkConfiguration?: ManagedInstancesNetworkConfiguration;
  storageConfiguration?: ManagedInstancesStorageConfiguration;
  instanceMetadataTagsPropagation?: boolean;
  localStorageConfiguration?: ManagedInstancesLocalStorageConfiguration;
  monitoring?: ManagedInstancesMonitoringOptions;
  instanceRequirements?: InstanceRequirementsRequest;
  capacityReservations?: CapacityReservationRequest;
}
export const InstanceLaunchTemplateUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ec2InstanceProfileArn: S.optional(S.String),
    networkConfiguration: S.optional(ManagedInstancesNetworkConfiguration),
    storageConfiguration: S.optional(ManagedInstancesStorageConfiguration),
    instanceMetadataTagsPropagation: S.optional(S.Boolean),
    localStorageConfiguration: S.optional(
      ManagedInstancesLocalStorageConfiguration,
    ),
    monitoring: S.optional(ManagedInstancesMonitoringOptions),
    instanceRequirements: S.optional(InstanceRequirementsRequest),
    capacityReservations: S.optional(CapacityReservationRequest),
  }),
).annotate({
  identifier: "InstanceLaunchTemplateUpdate",
}) as any as S.Schema<InstanceLaunchTemplateUpdate>;
export interface UpdateManagedInstancesProviderConfiguration {
  infrastructureRoleArn: string;
  instanceLaunchTemplate: InstanceLaunchTemplateUpdate;
  propagateTags?: PropagateMITags;
  infrastructureOptimization?: InfrastructureOptimization;
  autoRepairConfiguration?: AutoRepairConfiguration;
}
export const UpdateManagedInstancesProviderConfiguration =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      infrastructureRoleArn: S.String,
      instanceLaunchTemplate: InstanceLaunchTemplateUpdate,
      propagateTags: S.optional(PropagateMITags),
      infrastructureOptimization: S.optional(InfrastructureOptimization),
      autoRepairConfiguration: S.optional(AutoRepairConfiguration),
    }),
  ).annotate({
    identifier: "UpdateManagedInstancesProviderConfiguration",
  }) as any as S.Schema<UpdateManagedInstancesProviderConfiguration>;
export interface UpdateCapacityProviderRequest {
  name: string;
  cluster?: string;
  autoScalingGroupProvider?: AutoScalingGroupProviderUpdate;
  managedInstancesProvider?: UpdateManagedInstancesProviderConfiguration;
}
export const UpdateCapacityProviderRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    cluster: S.optional(S.String),
    autoScalingGroupProvider: S.optional(AutoScalingGroupProviderUpdate),
    managedInstancesProvider: S.optional(
      UpdateManagedInstancesProviderConfiguration,
    ),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateCapacityProviderRequest",
}) as any as S.Schema<UpdateCapacityProviderRequest>;
export interface UpdateCapacityProviderResponse {
  capacityProvider?: CapacityProvider;
}
export const UpdateCapacityProviderResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ capacityProvider: S.optional(CapacityProvider) }).pipe(ns),
).annotate({
  identifier: "UpdateCapacityProviderResponse",
}) as any as S.Schema<UpdateCapacityProviderResponse>;
export interface UpdateClusterRequest {
  cluster: string;
  settings?: ClusterSetting[];
  configuration?: ClusterConfiguration;
  serviceConnectDefaults?: ClusterServiceConnectDefaultsRequest;
}
export const UpdateClusterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cluster: S.String,
    settings: S.optional(ClusterSettings),
    configuration: S.optional(ClusterConfiguration),
    serviceConnectDefaults: S.optional(ClusterServiceConnectDefaultsRequest),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
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
  cluster?: Cluster;
}
export const UpdateClusterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ cluster: S.optional(Cluster) }).pipe(ns),
).annotate({
  identifier: "UpdateClusterResponse",
}) as any as S.Schema<UpdateClusterResponse>;
export interface UpdateClusterSettingsRequest {
  cluster: string;
  settings: ClusterSetting[];
}
export const UpdateClusterSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ cluster: S.String, settings: ClusterSettings }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateClusterSettingsRequest",
}) as any as S.Schema<UpdateClusterSettingsRequest>;
export interface UpdateClusterSettingsResponse {
  cluster?: Cluster;
}
export const UpdateClusterSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ cluster: S.optional(Cluster) }).pipe(ns),
).annotate({
  identifier: "UpdateClusterSettingsResponse",
}) as any as S.Schema<UpdateClusterSettingsResponse>;
export interface UpdateContainerAgentRequest {
  cluster?: string;
  containerInstance: string;
}
export const UpdateContainerAgentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ cluster: S.optional(S.String), containerInstance: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateContainerAgentRequest",
}) as any as S.Schema<UpdateContainerAgentRequest>;
export interface UpdateContainerAgentResponse {
  containerInstance?: ContainerInstance;
}
export const UpdateContainerAgentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ containerInstance: S.optional(ContainerInstance) }).pipe(ns),
).annotate({
  identifier: "UpdateContainerAgentResponse",
}) as any as S.Schema<UpdateContainerAgentResponse>;
export interface UpdateContainerInstancesStateRequest {
  cluster?: string;
  containerInstances: string[];
  status: ContainerInstanceStatus;
}
export const UpdateContainerInstancesStateRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      cluster: S.optional(S.String),
      containerInstances: StringList,
      status: ContainerInstanceStatus,
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateContainerInstancesStateRequest",
}) as any as S.Schema<UpdateContainerInstancesStateRequest>;
export interface UpdateContainerInstancesStateResponse {
  containerInstances?: ContainerInstance[];
  failures?: Failure[];
}
export const UpdateContainerInstancesStateResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      containerInstances: S.optional(ContainerInstances),
      failures: S.optional(Failures),
    }).pipe(ns),
).annotate({
  identifier: "UpdateContainerInstancesStateResponse",
}) as any as S.Schema<UpdateContainerInstancesStateResponse>;
export interface UpdateDaemonRequest {
  daemonArn: string;
  daemonTaskDefinitionArn: string;
  capacityProviderArns: string[];
  deploymentConfiguration?: DaemonDeploymentConfiguration;
  propagateTags?: DaemonPropagateTags;
  enableECSManagedTags?: boolean;
  enableExecuteCommand?: boolean;
}
export const UpdateDaemonRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    daemonArn: S.String,
    daemonTaskDefinitionArn: S.String,
    capacityProviderArns: StringList,
    deploymentConfiguration: S.optional(DaemonDeploymentConfiguration),
    propagateTags: S.optional(DaemonPropagateTags),
    enableECSManagedTags: S.optional(S.Boolean),
    enableExecuteCommand: S.optional(S.Boolean),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDaemonRequest",
}) as any as S.Schema<UpdateDaemonRequest>;
export interface UpdateDaemonResponse {
  daemonArn?: string;
  status?: DaemonStatus;
  createdAt?: Date;
  updatedAt?: Date;
  deploymentArn?: string;
}
export const UpdateDaemonResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    daemonArn: S.optional(S.String),
    status: S.optional(DaemonStatus),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    deploymentArn: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "UpdateDaemonResponse",
}) as any as S.Schema<UpdateDaemonResponse>;
export interface UpdateExpressGatewayServiceRequest {
  serviceArn: string;
  executionRoleArn?: string;
  healthCheckPath?: string;
  primaryContainer?: ExpressGatewayContainer;
  taskRoleArn?: string;
  networkConfiguration?: ExpressGatewayServiceNetworkConfiguration;
  cpu?: string;
  memory?: string;
  scalingTarget?: ExpressGatewayScalingTarget;
  taskDefinitionArn?: string;
}
export const UpdateExpressGatewayServiceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceArn: S.String,
    executionRoleArn: S.optional(S.String),
    healthCheckPath: S.optional(S.String),
    primaryContainer: S.optional(ExpressGatewayContainer),
    taskRoleArn: S.optional(S.String),
    networkConfiguration: S.optional(ExpressGatewayServiceNetworkConfiguration),
    cpu: S.optional(S.String),
    memory: S.optional(S.String),
    scalingTarget: S.optional(ExpressGatewayScalingTarget),
    taskDefinitionArn: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateExpressGatewayServiceRequest",
}) as any as S.Schema<UpdateExpressGatewayServiceRequest>;
export interface UpdatedExpressGatewayService {
  serviceArn?: string;
  cluster?: string;
  serviceName?: string;
  status?: ExpressGatewayServiceStatus;
  targetConfiguration?: ExpressGatewayServiceConfiguration;
  createdAt?: Date;
  updatedAt?: Date;
}
export const UpdatedExpressGatewayService = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceArn: S.optional(S.String),
    cluster: S.optional(S.String),
    serviceName: S.optional(S.String),
    status: S.optional(ExpressGatewayServiceStatus),
    targetConfiguration: S.optional(ExpressGatewayServiceConfiguration),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "UpdatedExpressGatewayService",
}) as any as S.Schema<UpdatedExpressGatewayService>;
export interface UpdateExpressGatewayServiceResponse {
  service?: UpdatedExpressGatewayService;
}
export const UpdateExpressGatewayServiceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ service: S.optional(UpdatedExpressGatewayService) }).pipe(ns),
).annotate({
  identifier: "UpdateExpressGatewayServiceResponse",
}) as any as S.Schema<UpdateExpressGatewayServiceResponse>;
export interface UpdateServiceRequest {
  cluster?: string;
  service: string;
  desiredCount?: number;
  taskDefinition?: string;
  capacityProviderStrategy?: CapacityProviderStrategyItem[];
  deploymentConfiguration?: DeploymentConfiguration;
  availabilityZoneRebalancing?: AvailabilityZoneRebalancing;
  networkConfiguration?: NetworkConfiguration;
  placementConstraints?: PlacementConstraint[];
  placementStrategy?: PlacementStrategy[];
  platformVersion?: string;
  forceNewDeployment?: boolean;
  healthCheckGracePeriodSeconds?: number;
  deploymentController?: DeploymentController;
  enableExecuteCommand?: boolean;
  enableECSManagedTags?: boolean;
  loadBalancers?: LoadBalancer[];
  propagateTags?: PropagateTags;
  serviceRegistries?: ServiceRegistry[];
  serviceConnectConfiguration?: ServiceConnectConfiguration;
  volumeConfigurations?: ServiceVolumeConfiguration[];
  vpcLatticeConfigurations?: VpcLatticeConfiguration[];
  monitoring?: MonitoringConfiguration;
}
export const UpdateServiceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cluster: S.optional(S.String),
    service: S.String,
    desiredCount: S.optional(S.Number),
    taskDefinition: S.optional(S.String),
    capacityProviderStrategy: S.optional(CapacityProviderStrategy),
    deploymentConfiguration: S.optional(DeploymentConfiguration),
    availabilityZoneRebalancing: S.optional(AvailabilityZoneRebalancing),
    networkConfiguration: S.optional(NetworkConfiguration),
    placementConstraints: S.optional(PlacementConstraints),
    placementStrategy: S.optional(PlacementStrategies),
    platformVersion: S.optional(S.String),
    forceNewDeployment: S.optional(S.Boolean),
    healthCheckGracePeriodSeconds: S.optional(S.Number),
    deploymentController: S.optional(DeploymentController),
    enableExecuteCommand: S.optional(S.Boolean),
    enableECSManagedTags: S.optional(S.Boolean),
    loadBalancers: S.optional(LoadBalancers),
    propagateTags: S.optional(PropagateTags),
    serviceRegistries: S.optional(ServiceRegistries),
    serviceConnectConfiguration: S.optional(ServiceConnectConfiguration),
    volumeConfigurations: S.optional(ServiceVolumeConfigurations),
    vpcLatticeConfigurations: S.optional(VpcLatticeConfigurations),
    monitoring: S.optional(MonitoringConfiguration),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateServiceRequest",
}) as any as S.Schema<UpdateServiceRequest>;
export interface UpdateServiceResponse {
  service?: Service;
}
export const UpdateServiceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ service: S.optional(Service) }).pipe(ns),
).annotate({
  identifier: "UpdateServiceResponse",
}) as any as S.Schema<UpdateServiceResponse>;
export interface UpdateServicePrimaryTaskSetRequest {
  cluster: string;
  service: string;
  primaryTaskSet: string;
}
export const UpdateServicePrimaryTaskSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cluster: S.String,
    service: S.String,
    primaryTaskSet: S.String,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateServicePrimaryTaskSetRequest",
}) as any as S.Schema<UpdateServicePrimaryTaskSetRequest>;
export interface UpdateServicePrimaryTaskSetResponse {
  taskSet?: TaskSet;
}
export const UpdateServicePrimaryTaskSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ taskSet: S.optional(TaskSet) }).pipe(ns),
).annotate({
  identifier: "UpdateServicePrimaryTaskSetResponse",
}) as any as S.Schema<UpdateServicePrimaryTaskSetResponse>;
export interface UpdateTaskProtectionRequest {
  cluster: string;
  tasks: string[];
  protectionEnabled: boolean;
  expiresInMinutes?: number;
}
export const UpdateTaskProtectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cluster: S.String,
    tasks: StringList,
    protectionEnabled: S.Boolean,
    expiresInMinutes: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateTaskProtectionRequest",
}) as any as S.Schema<UpdateTaskProtectionRequest>;
export interface UpdateTaskProtectionResponse {
  protectedTasks?: ProtectedTask[];
  failures?: Failure[];
}
export const UpdateTaskProtectionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    protectedTasks: S.optional(ProtectedTasks),
    failures: S.optional(Failures),
  }).pipe(ns),
).annotate({
  identifier: "UpdateTaskProtectionResponse",
}) as any as S.Schema<UpdateTaskProtectionResponse>;
export interface UpdateTaskSetRequest {
  cluster: string;
  service: string;
  taskSet: string;
  scale: Scale;
}
export const UpdateTaskSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cluster: S.String,
    service: S.String,
    taskSet: S.String,
    scale: Scale,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateTaskSetRequest",
}) as any as S.Schema<UpdateTaskSetRequest>;
export interface UpdateTaskSetResponse {
  taskSet?: TaskSet;
}
export const UpdateTaskSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ taskSet: S.optional(TaskSet) }).pipe(ns),
).annotate({
  identifier: "UpdateTaskSetResponse",
}) as any as S.Schema<UpdateTaskSetResponse>;
export type ResourceIds = string[];
export const ResourceIds = /*@__PURE__*/ S.Array(S.String);
export type ContinueServiceDeploymentError =
  | AccessDeniedException
  | ClientException
  | InvalidParameterException
  | ServerException
  | ServiceDeploymentNotFoundException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Continues or rolls back an Amazon ECS service deployment that is paused at a lifecycle hook.
 *
 * When a service deployment reaches a lifecycle stage that has a `PAUSE` hook configured, the deployment pauses and waits for an explicit action. Use this API to either continue the deployment to the next stage or roll back to the previous service revision.
 *
 * To find the `hookId` of the paused hook, call DescribeServiceDeployments and inspect the `lifecycleHookDetails` field.
 *
 * For more information, see Continuing Amazon ECS service deployments in the *Amazon Elastic Container Service Developer Guide*.
 */
export const continueServiceDeployment: API.OperationMethod<
  ContinueServiceDeploymentRequest,
  ContinueServiceDeploymentResponse,
  ContinueServiceDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ContinueServiceDeploymentRequest,
  output: ContinueServiceDeploymentResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    InvalidParameterException,
    ServerException,
    ServiceDeploymentNotFoundException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ContinueServiceDeployment",
}));

export type CreateCapacityProviderError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | LimitExceededException
  | ServerException
  | UnsupportedFeatureException
  | UpdateInProgressException
  | CommonErrors;
/**
 * Creates a capacity provider. Capacity providers are associated with a cluster and are used in capacity provider strategies to facilitate cluster auto scaling. You can create capacity providers for Amazon ECS Managed Instances and EC2 instances. Fargate has the predefined `FARGATE` and `FARGATE_SPOT` capacity providers.
 */
export const createCapacityProvider: API.OperationMethod<
  CreateCapacityProviderRequest,
  CreateCapacityProviderResponse,
  CreateCapacityProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCapacityProviderRequest,
  output: CreateCapacityProviderResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    LimitExceededException,
    ServerException,
    UnsupportedFeatureException,
    UpdateInProgressException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCapacityProvider",
}));

export type CreateClusterError =
  | AccessDeniedException
  | ClientException
  | InvalidParameterException
  | NamespaceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Creates a new Amazon ECS cluster. By default, your account receives a `default` cluster when you launch your first container instance. However, you can create your own cluster with a unique name.
 *
 * When you call the CreateCluster API operation, Amazon ECS attempts to create the Amazon ECS service-linked role for your account. This is so that it can manage required resources in other Amazon Web Services services on your behalf. However, if the user that makes the call doesn't have permissions to create the service-linked role, it isn't created. For more information, see Using service-linked roles for Amazon ECS in the *Amazon Elastic Container Service Developer Guide*.
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
    AccessDeniedException,
    ClientException,
    InvalidParameterException,
    NamespaceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCluster",
}));

export type CreateDaemonError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | PlatformUnknownException
  | ServerException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Creates a new daemon in the specified cluster and capacity providers. A daemon deploys cross-cutting software agents such as security monitoring, telemetry, and logging independently across your Amazon ECS infrastructure.
 *
 * Amazon ECS deploys exactly one daemon task on each container instance of the specified capacity providers. When a container instance registers with the cluster, Amazon ECS automatically starts daemon tasks. Amazon ECS starts a daemon task before scheduling other tasks.
 *
 * Daemons are essential for instance health - if a daemon task stops, Amazon ECS automatically drains and replaces that container instance.
 *
 * ECS Managed Daemons is only supported for Amazon ECS Managed Instances Capacity Providers.
 */
export const createDaemon: API.OperationMethod<
  CreateDaemonRequest,
  CreateDaemonResponse,
  CreateDaemonError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDaemonRequest,
  output: CreateDaemonResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    PlatformUnknownException,
    ServerException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDaemon",
}));

export type CreateExpressGatewayServiceError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | PlatformTaskDefinitionIncompatibilityException
  | PlatformUnknownException
  | ServerException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Creates an Express service that simplifies deploying containerized web applications on Amazon ECS with managed Amazon Web Services infrastructure. This operation provisions and configures Application Load Balancers, target groups, security groups, and auto-scaling policies automatically.
 *
 * Specify a primary container configuration with your application image and basic settings. Amazon ECS creates the necessary Amazon Web Services resources for traffic distribution, health monitoring, network access control, and capacity management.
 *
 * Provide an execution role for task operations and an infrastructure role for managing Amazon Web Services resources on your behalf.
 */
export const createExpressGatewayService: API.OperationMethod<
  CreateExpressGatewayServiceRequest,
  CreateExpressGatewayServiceResponse,
  CreateExpressGatewayServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateExpressGatewayServiceRequest,
  output: CreateExpressGatewayServiceResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    PlatformTaskDefinitionIncompatibilityException,
    PlatformUnknownException,
    ServerException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateExpressGatewayService",
}));

export type CreateServiceError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | NamespaceNotFoundException
  | PlatformTaskDefinitionIncompatibilityException
  | PlatformUnknownException
  | ServerException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Runs and maintains your desired number of tasks from a specified task definition. If the number of tasks running in a service drops below the `desiredCount`, Amazon ECS runs another copy of the task in the specified cluster. To update an existing service, use UpdateService.
 *
 * On March 21, 2024, a change was made to resolve the task definition revision before authorization. When a task definition revision is not specified, authorization will occur using the latest revision of a task definition.
 *
 * Amazon Elastic Inference (EI) is no longer available to customers.
 *
 * In addition to maintaining the desired count of tasks in your service, you can optionally run your service behind one or more load balancers. The load balancers distribute traffic across the tasks that are associated with the service. For more information, see Service load balancing in the *Amazon Elastic Container Service Developer Guide*.
 *
 * You can attach Amazon EBS volumes to Amazon ECS tasks by configuring the volume when creating or updating a service. `volumeConfigurations` is only supported for REPLICA service and not DAEMON service. For more information, see Amazon EBS volumes in the *Amazon Elastic Container Service Developer Guide*.
 *
 * Tasks for services that don't use a load balancer are considered healthy if they're in the `RUNNING` state. Tasks for services that use a load balancer are considered healthy if they're in the `RUNNING` state and are reported as healthy by the load balancer.
 *
 * There are two service scheduler strategies available:
 *
 * - `REPLICA` - The replica scheduling strategy places and maintains your desired number of tasks across your cluster. By default, the service scheduler spreads tasks across Availability Zones. You can use task placement strategies and constraints to customize task placement decisions. For more information, see Service scheduler concepts in the *Amazon Elastic Container Service Developer Guide*.
 *
 * - `DAEMON` - The daemon scheduling strategy deploys exactly one task on each active container instance that meets all of the task placement constraints that you specify in your cluster. The service scheduler also evaluates the task placement constraints for running tasks. It also stops tasks that don't meet the placement constraints. When using this strategy, you don't need to specify a desired number of tasks, a task placement strategy, or use Service Auto Scaling policies. For more information, see Amazon ECS services in the *Amazon Elastic Container Service Developer Guide*.
 *
 * The deployment controller is the mechanism that determines how tasks are deployed for your service. The valid options are:
 *
 * - ECS
 *
 * When you create a service which uses the `ECS` deployment controller, you can choose between the following deployment strategies (which you can set in the “`strategy`” field in “`deploymentConfiguration`”): :
 *
 * - `ROLLING`: When you create a service which uses the *rolling update* (`ROLLING`) deployment strategy, the Amazon ECS service scheduler replaces the currently running tasks with new tasks. The number of tasks that Amazon ECS adds or removes from the service during a rolling update is controlled by the service deployment configuration. For more information, see Deploy Amazon ECS services by replacing tasks in the *Amazon Elastic Container Service Developer Guide*.
 *
 * Rolling update deployments are best suited for the following scenarios:
 *
 * - Gradual service updates: You need to update your service incrementally without taking the entire service offline at once.
 *
 * - Limited resource requirements: You want to avoid the additional resource costs of running two complete environments simultaneously (as required by blue/green deployments).
 *
 * - Acceptable deployment time: Your application can tolerate a longer deployment process, as rolling updates replace tasks one by one.
 *
 * - No need for instant roll back: Your service can tolerate a rollback process that takes minutes rather than seconds.
 *
 * - Simple deployment process: You prefer a straightforward deployment approach without the complexity of managing multiple environments, target groups, and listeners.
 *
 * - No load balancer requirement: Your service doesn't use or require a load balancer, Application Load Balancer, Network Load Balancer, or Service Connect (which are required for blue/green deployments).
 *
 * - Stateful applications: Your application maintains state that makes it difficult to run two parallel environments.
 *
 * - Cost sensitivity: You want to minimize deployment costs by not running duplicate environments during deployment.
 *
 * Rolling updates are the default deployment strategy for services and provide a balance between deployment safety and resource efficiency for many common application scenarios.
 *
 * - `BLUE_GREEN`: A *blue/green* deployment strategy (`BLUE_GREEN`) is a release methodology that reduces downtime and risk by running two identical production environments called blue and green. With Amazon ECS blue/green deployments, you can validate new service revisions before directing production traffic to them. This approach provides a safer way to deploy changes with the ability to quickly roll back if needed. For more information, see Amazon ECS blue/green deployments in the *Amazon Elastic Container Service Developer Guide*.
 *
 * Amazon ECS blue/green deployments are best suited for the following scenarios:
 *
 * - Service validation: When you need to validate new service revisions before directing production traffic to them
 *
 * - Zero downtime: When your service requires zero-downtime deployments
 *
 * - Instant roll back: When you need the ability to quickly roll back if issues are detected
 *
 * - Load balancer requirement: When your service uses Application Load Balancer, Network Load Balancer, or Service Connect
 *
 * - `LINEAR`: A *linear* deployment strategy (`LINEAR`) gradually shifts traffic from the current production environment to a new environment in equal percentage increments. With Amazon ECS linear deployments, you can control the pace of traffic shifting and validate new service revisions with increasing amounts of production traffic.
 *
 * Linear deployments are best suited for the following scenarios:
 *
 * - Gradual validation: When you want to gradually validate your new service version with increasing traffic
 *
 * - Performance monitoring: When you need time to monitor metrics and performance during the deployment
 *
 * - Risk minimization: When you want to minimize risk by exposing the new version to production traffic incrementally
 *
 * - Load balancer requirement: When your service uses Application Load Balancer or Service Connect
 *
 * - `CANARY`: A *canary* deployment strategy (`CANARY`) shifts a small percentage of traffic to the new service revision first, then shifts the remaining traffic all at once after a specified time period. This allows you to test the new version with a subset of users before full deployment.
 *
 * Canary deployments are best suited for the following scenarios:
 *
 * - Feature testing: When you want to test new features with a small subset of users before full rollout
 *
 * - Production validation: When you need to validate performance and functionality with real production traffic
 *
 * - Blast radius control: When you want to minimize blast radius if issues are discovered in the new version
 *
 * - Load balancer requirement: When your service uses Application Load Balancer or Service Connect
 *
 * - External
 *
 * Use a third-party deployment controller.
 *
 * - Blue/green deployment (powered by CodeDeploy)
 *
 * CodeDeploy installs an updated version of the application as a new replacement task set and reroutes production traffic from the original application task set to the replacement task set. The original task set is terminated after a successful deployment. Use this deployment controller to verify a new deployment of a service before sending production traffic to it.
 *
 * When creating a service that uses the `EXTERNAL` deployment controller, you can specify only parameters that aren't controlled at the task set level. The only required parameter is the service name. You control your services using the CreateTaskSet. For more information, see Amazon ECS deployment types in the *Amazon Elastic Container Service Developer Guide*.
 *
 * When the service scheduler launches new tasks, it determines task placement. For information about task placement and task placement strategies, see Amazon ECS task placement in the *Amazon Elastic Container Service Developer Guide*
 */
export const createService: API.OperationMethod<
  CreateServiceRequest,
  CreateServiceResponse,
  CreateServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateServiceRequest,
  output: CreateServiceResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    NamespaceNotFoundException,
    PlatformTaskDefinitionIncompatibilityException,
    PlatformUnknownException,
    ServerException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateService",
}));

export type CreateTaskSetError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | LimitExceededException
  | NamespaceNotFoundException
  | PlatformTaskDefinitionIncompatibilityException
  | PlatformUnknownException
  | ServerException
  | ServiceNotActiveException
  | ServiceNotFoundException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Create a task set in the specified cluster and service. This is used when a service uses the `EXTERNAL` deployment controller type. For more information, see Amazon ECS deployment types in the *Amazon Elastic Container Service Developer Guide*.
 *
 * On March 21, 2024, a change was made to resolve the task definition revision before authorization. When a task definition revision is not specified, authorization will occur using the latest revision of a task definition.
 *
 * For information about the maximum number of task sets and other quotas, see Amazon ECS service quotas in the *Amazon Elastic Container Service Developer Guide*.
 */
export const createTaskSet: API.OperationMethod<
  CreateTaskSetRequest,
  CreateTaskSetResponse,
  CreateTaskSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateTaskSetRequest,
  output: CreateTaskSetResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    LimitExceededException,
    NamespaceNotFoundException,
    PlatformTaskDefinitionIncompatibilityException,
    PlatformUnknownException,
    ServerException,
    ServiceNotActiveException,
    ServiceNotFoundException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTaskSet",
}));

export type DeleteAccountSettingError =
  | AccessDeniedException
  | ClientException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * Disables an account setting for a specified user, role, or the root user for an account.
 */
export const deleteAccountSetting: API.OperationMethod<
  DeleteAccountSettingRequest,
  DeleteAccountSettingResponse,
  DeleteAccountSettingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAccountSettingRequest,
  output: DeleteAccountSettingResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccountSetting",
}));

export type DeleteAttributesError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | TargetNotFoundException
  | CommonErrors;
/**
 * Deletes one or more custom attributes from an Amazon ECS resource.
 */
export const deleteAttributes: API.OperationMethod<
  DeleteAttributesRequest,
  DeleteAttributesResponse,
  DeleteAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAttributesRequest,
  output: DeleteAttributesResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
    TargetNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAttributes",
}));

export type DeleteCapacityProviderError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | UnsupportedFeatureException
  | UpdateInProgressException
  | CommonErrors;
/**
 * Deletes the specified capacity provider.
 *
 * The `FARGATE` and `FARGATE_SPOT` capacity providers are reserved and can't be deleted. You can disassociate them from a cluster using either PutClusterCapacityProviders or by deleting the cluster.
 *
 * Prior to a capacity provider being deleted, the capacity provider must be removed from the capacity provider strategy from all services. The UpdateService API can be used to remove a capacity provider from a service's capacity provider strategy. When updating a service, the `forceNewDeployment` option can be used to ensure that any tasks using the Amazon EC2 instance capacity provided by the capacity provider are transitioned to use the capacity from the remaining capacity providers. Only capacity providers that aren't associated with a cluster can be deleted. To remove a capacity provider from a cluster, you can either use PutClusterCapacityProviders or delete the cluster.
 */
export const deleteCapacityProvider: API.OperationMethod<
  DeleteCapacityProviderRequest,
  DeleteCapacityProviderResponse,
  DeleteCapacityProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCapacityProviderRequest,
  output: DeleteCapacityProviderResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
    UnsupportedFeatureException,
    UpdateInProgressException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCapacityProvider",
}));

export type DeleteClusterError =
  | AccessDeniedException
  | ClientException
  | ClusterContainsCapacityProviderException
  | ClusterContainsContainerInstancesException
  | ClusterContainsServicesException
  | ClusterContainsTasksException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | UpdateInProgressException
  | CommonErrors;
/**
 * Deletes the specified cluster. The cluster transitions to the `INACTIVE` state. Clusters with an `INACTIVE` status might remain discoverable in your account for a period of time. However, this behavior is subject to change in the future. We don't recommend that you rely on `INACTIVE` clusters persisting.
 *
 * You must deregister all container instances from this cluster before you may delete it. You can list the container instances in a cluster with ListContainerInstances and deregister them with DeregisterContainerInstance.
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
    AccessDeniedException,
    ClientException,
    ClusterContainsCapacityProviderException,
    ClusterContainsContainerInstancesException,
    ClusterContainsServicesException,
    ClusterContainsTasksException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
    UpdateInProgressException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCluster",
}));

export type DeleteDaemonError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | DaemonNotActiveException
  | DaemonNotFoundException
  | InvalidParameterException
  | ServerException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Deletes the specified daemon. The daemon must be in an `ACTIVE` state to be deleted. Deleting a daemon stops all running daemon tasks on the associated container instances. Amazon ECS drains existing container instances and provisions new instances without the deleted daemon. Amazon ECS automatically launches replacement tasks for your Amazon ECS services.
 *
 * ECS Managed Daemons is only supported for Amazon ECS Managed Instances Capacity Providers.
 */
export const deleteDaemon: API.OperationMethod<
  DeleteDaemonRequest,
  DeleteDaemonResponse,
  DeleteDaemonError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDaemonRequest,
  output: DeleteDaemonResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    DaemonNotActiveException,
    DaemonNotFoundException,
    InvalidParameterException,
    ServerException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDaemon",
}));

export type DeleteDaemonTaskDefinitionError =
  | AccessDeniedException
  | ClientException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * Deletes the specified daemon task definition. After a daemon task definition is deleted, no new daemons can be created using this definition. Existing daemons that reference the deleted daemon task definition continue to run.
 *
 * A daemon task definition must be in an `ACTIVE` state to be deleted.
 */
export const deleteDaemonTaskDefinition: API.OperationMethod<
  DeleteDaemonTaskDefinitionRequest,
  DeleteDaemonTaskDefinitionResponse,
  DeleteDaemonTaskDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDaemonTaskDefinitionRequest,
  output: DeleteDaemonTaskDefinitionResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDaemonTaskDefinition",
}));

export type DeleteExpressGatewayServiceError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | ServiceNotActiveException
  | ServiceNotFoundException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Deletes an Express service and removes all associated Amazon Web Services resources. This operation stops service tasks, removes the Application Load Balancer, target groups, security groups, auto-scaling policies, and other managed infrastructure components.
 *
 * The service enters a `DRAINING` state where existing tasks complete current requests without starting new tasks. After all tasks stop, the service and infrastructure are permanently removed.
 *
 * This operation cannot be reversed. Back up important data and verify the service is no longer needed before deletion.
 */
export const deleteExpressGatewayService: API.OperationMethod<
  DeleteExpressGatewayServiceRequest,
  DeleteExpressGatewayServiceResponse,
  DeleteExpressGatewayServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteExpressGatewayServiceRequest,
  output: DeleteExpressGatewayServiceResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
    ServiceNotActiveException,
    ServiceNotFoundException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteExpressGatewayService",
}));

export type DeleteServiceError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | ServiceNotFoundException
  | CommonErrors;
/**
 * Deletes a specified service within a cluster. You can delete a service if you have no running tasks in it and the desired task count is zero. If the service is actively maintaining tasks, you can't delete it, and you must update the service to a desired task count of zero. For more information, see UpdateService.
 *
 * When you delete a service, if there are still running tasks that require cleanup, the service status moves from `ACTIVE` to `DRAINING`, and the service is no longer visible in the console or in the ListServices API operation. After all tasks have transitioned to either `STOPPING` or `STOPPED` status, the service status moves from `DRAINING` to `INACTIVE`. Services in the `DRAINING` or `INACTIVE` status can still be viewed with the DescribeServices API operation. However, in the future, `INACTIVE` services may be cleaned up and purged from Amazon ECS record keeping, and DescribeServices calls on those services return a `ServiceNotFoundException` error.
 *
 * If you attempt to create a new service with the same name as an existing service in either `ACTIVE` or `DRAINING` status, you receive an error.
 */
export const deleteService: API.OperationMethod<
  DeleteServiceRequest,
  DeleteServiceResponse,
  DeleteServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteServiceRequest,
  output: DeleteServiceResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
    ServiceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteService",
}));

export type DeleteTaskDefinitionsError =
  | AccessDeniedException
  | ClientException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * Deletes one or more task definitions.
 *
 * You must deregister a task definition revision before you delete it. For more information, see DeregisterTaskDefinition.
 *
 * When you delete a task definition revision, it is immediately transitions from the `INACTIVE` to `DELETE_IN_PROGRESS`. Existing tasks and services that reference a `DELETE_IN_PROGRESS` task definition revision continue to run without disruption. Existing services that reference a `DELETE_IN_PROGRESS` task definition revision can still scale up or down by modifying the service's desired count.
 *
 * You can't use a `DELETE_IN_PROGRESS` task definition revision to run new tasks or create new services. You also can't update an existing service to reference a `DELETE_IN_PROGRESS` task definition revision.
 *
 * A task definition revision will stay in `DELETE_IN_PROGRESS` status until all the associated tasks and services have been terminated.
 *
 * When you delete all `INACTIVE` task definition revisions, the task definition name is not displayed in the console and not returned in the API. If a task definition revisions are in the `DELETE_IN_PROGRESS` state, the task definition name is displayed in the console and returned in the API. The task definition name is retained by Amazon ECS and the revision is incremented the next time you create a task definition with that name.
 */
export const deleteTaskDefinitions: API.OperationMethod<
  DeleteTaskDefinitionsRequest,
  DeleteTaskDefinitionsResponse,
  DeleteTaskDefinitionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTaskDefinitionsRequest,
  output: DeleteTaskDefinitionsResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTaskDefinitions",
}));

export type DeleteTaskSetError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | LimitExceededException
  | ServerException
  | ServiceNotActiveException
  | ServiceNotFoundException
  | TaskSetNotFoundException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Deletes a specified task set within a service. This is used when a service uses the `EXTERNAL` deployment controller type. For more information, see Amazon ECS deployment types in the *Amazon Elastic Container Service Developer Guide*.
 */
export const deleteTaskSet: API.OperationMethod<
  DeleteTaskSetRequest,
  DeleteTaskSetResponse,
  DeleteTaskSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTaskSetRequest,
  output: DeleteTaskSetResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    LimitExceededException,
    ServerException,
    ServiceNotActiveException,
    ServiceNotFoundException,
    TaskSetNotFoundException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTaskSet",
}));

export type DeregisterContainerInstanceError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * Deregisters an Amazon ECS container instance from the specified cluster. This instance is no longer available to run tasks.
 *
 * If you intend to use the container instance for some other purpose after deregistration, we recommend that you stop all of the tasks running on the container instance before deregistration. That prevents any orphaned tasks from consuming resources.
 *
 * Deregistering a container instance removes the instance from a cluster, but it doesn't terminate the EC2 instance. If you are finished using the instance, be sure to terminate it in the Amazon EC2 console to stop billing.
 *
 * If you terminate a running container instance, Amazon ECS automatically deregisters the instance from your cluster (stopped container instances or instances with disconnected agents aren't automatically deregistered when terminated).
 */
export const deregisterContainerInstance: API.OperationMethod<
  DeregisterContainerInstanceRequest,
  DeregisterContainerInstanceResponse,
  DeregisterContainerInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeregisterContainerInstanceRequest,
  output: DeregisterContainerInstanceResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterContainerInstance",
}));

export type DeregisterTaskDefinitionError =
  | AccessDeniedException
  | ClientException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * Deregisters the specified task definition by family and revision. Upon deregistration, the task definition is marked as `INACTIVE`. Existing tasks and services that reference an `INACTIVE` task definition continue to run without disruption. Existing services that reference an `INACTIVE` task definition can still scale up or down by modifying the service's desired count. If you want to delete a task definition revision, you must first deregister the task definition revision.
 *
 * You can't use an `INACTIVE` task definition to run new tasks or create new services, and you can't update an existing service to reference an `INACTIVE` task definition. However, there may be up to a 10-minute window following deregistration where these restrictions have not yet taken effect.
 *
 * At this time, `INACTIVE` task definitions remain discoverable in your account indefinitely. However, this behavior is subject to change in the future. We don't recommend that you rely on `INACTIVE` task definitions persisting beyond the lifecycle of any associated tasks and services.
 *
 * You must deregister a task definition revision before you delete it. For more information, see DeleteTaskDefinitions.
 */
export const deregisterTaskDefinition: API.OperationMethod<
  DeregisterTaskDefinitionRequest,
  DeregisterTaskDefinitionResponse,
  DeregisterTaskDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeregisterTaskDefinitionRequest,
  output: DeregisterTaskDefinitionResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterTaskDefinition",
}));

export type DescribeCapacityProvidersError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Describes one or more of your capacity providers.
 */
export const describeCapacityProviders: API.OperationMethod<
  DescribeCapacityProvidersRequest,
  DescribeCapacityProvidersResponse,
  DescribeCapacityProvidersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeCapacityProvidersRequest,
  output: DescribeCapacityProvidersResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCapacityProviders",
}));

export type DescribeClustersError =
  | AccessDeniedException
  | ClientException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * Describes one or more of your clusters.
 *
 * For CLI examples, see describe-clusters.rst on GitHub.
 */
export const describeClusters: API.OperationMethod<
  DescribeClustersRequest,
  DescribeClustersResponse,
  DescribeClustersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeClustersRequest,
  output: DescribeClustersResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeClusters",
}));

export type DescribeContainerInstancesError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * Describes one or more container instances. Returns metadata about each container instance requested.
 */
export const describeContainerInstances: API.OperationMethod<
  DescribeContainerInstancesRequest,
  DescribeContainerInstancesResponse,
  DescribeContainerInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeContainerInstancesRequest,
  output: DescribeContainerInstancesResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeContainerInstances",
}));

export type DescribeDaemonError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | DaemonNotFoundException
  | InvalidParameterException
  | ServerException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Describes the specified daemon.
 */
export const describeDaemon: API.OperationMethod<
  DescribeDaemonRequest,
  DescribeDaemonResponse,
  DescribeDaemonError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeDaemonRequest,
  output: DescribeDaemonResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    DaemonNotFoundException,
    InvalidParameterException,
    ServerException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDaemon",
}));

export type DescribeDaemonDeploymentsError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Describes one or more of your daemon deployments.
 *
 * A daemon deployment orchestrates the progressive rollout of daemon task updates across container instances managed by the daemon's capacity providers. Each deployment includes circuit breaker and alarm-based rollback capabilities.
 */
export const describeDaemonDeployments: API.OperationMethod<
  DescribeDaemonDeploymentsRequest,
  DescribeDaemonDeploymentsResponse,
  DescribeDaemonDeploymentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeDaemonDeploymentsRequest,
  output: DescribeDaemonDeploymentsResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDaemonDeployments",
}));

export type DescribeDaemonRevisionsError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Describes one or more of your daemon revisions.
 *
 * A daemon revision is a snapshot of a daemon's configuration at the time a deployment was initiated. It captures the daemon task definition, container images, tag propagation, and execute command settings. Daemon revisions are immutable.
 */
export const describeDaemonRevisions: API.OperationMethod<
  DescribeDaemonRevisionsRequest,
  DescribeDaemonRevisionsResponse,
  DescribeDaemonRevisionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeDaemonRevisionsRequest,
  output: DescribeDaemonRevisionsResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDaemonRevisions",
}));

export type DescribeDaemonTaskDefinitionError =
  | AccessDeniedException
  | ClientException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * Describes a daemon task definition. You can specify a `family` and `revision` to find information about a specific daemon task definition, or you can simply specify the family to find the latest `ACTIVE` revision in that family.
 */
export const describeDaemonTaskDefinition: API.OperationMethod<
  DescribeDaemonTaskDefinitionRequest,
  DescribeDaemonTaskDefinitionResponse,
  DescribeDaemonTaskDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeDaemonTaskDefinitionRequest,
  output: DescribeDaemonTaskDefinitionResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDaemonTaskDefinition",
}));

export type DescribeExpressGatewayServiceError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ResourceNotFoundException
  | ServerException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Retrieves detailed information about an Express service, including current status, configuration, managed infrastructure, and service revisions.
 *
 * Returns comprehensive service details, active service revisions, ingress paths with endpoints, and managed Amazon Web Services resource status including load balancers and auto-scaling policies.
 *
 * Use the `include` parameter to retrieve additional information such as resource tags.
 */
export const describeExpressGatewayService: API.OperationMethod<
  DescribeExpressGatewayServiceRequest,
  DescribeExpressGatewayServiceResponse,
  DescribeExpressGatewayServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeExpressGatewayServiceRequest,
  output: DescribeExpressGatewayServiceResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ResourceNotFoundException,
    ServerException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeExpressGatewayService",
}));

export type DescribeServiceDeploymentsError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | ServiceNotFoundException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Describes one or more of your service deployments.
 *
 * A service deployment happens when you release a software update for the service. For more information, see View service history using Amazon ECS service deployments.
 */
export const describeServiceDeployments: API.OperationMethod<
  DescribeServiceDeploymentsRequest,
  DescribeServiceDeploymentsResponse,
  DescribeServiceDeploymentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeServiceDeploymentsRequest,
  output: DescribeServiceDeploymentsResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
    ServiceNotFoundException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeServiceDeployments",
}));

export type DescribeServiceRevisionsError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | ServiceNotFoundException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Describes one or more service revisions.
 *
 * A service revision is a version of the service that includes the values for the Amazon ECS resources (for example, task definition) and the environment resources (for example, load balancers, subnets, and security groups). For more information, see Amazon ECS service revisions.
 *
 * You can't describe a service revision that was created before October 25, 2024.
 */
export const describeServiceRevisions: API.OperationMethod<
  DescribeServiceRevisionsRequest,
  DescribeServiceRevisionsResponse,
  DescribeServiceRevisionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeServiceRevisionsRequest,
  output: DescribeServiceRevisionsResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
    ServiceNotFoundException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeServiceRevisions",
}));

export type DescribeServicesError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * Describes the specified services running in your cluster.
 */
export const describeServices: API.OperationMethod<
  DescribeServicesRequest,
  DescribeServicesResponse,
  DescribeServicesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeServicesRequest,
  output: DescribeServicesResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeServices",
}));

export type DescribeTaskDefinitionError =
  | AccessDeniedException
  | ClientException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * Describes a task definition. You can specify a `family` and `revision` to find information about a specific task definition, or you can simply specify the family to find the latest `ACTIVE` revision in that family.
 *
 * You can only describe `INACTIVE` task definitions while an active task or service references them.
 */
export const describeTaskDefinition: API.OperationMethod<
  DescribeTaskDefinitionRequest,
  DescribeTaskDefinitionResponse,
  DescribeTaskDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeTaskDefinitionRequest,
  output: DescribeTaskDefinitionResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTaskDefinition",
}));

export type DescribeTasksError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * Describes a specified task or tasks.
 *
 * Currently, stopped tasks appear in the returned results for at least one hour.
 *
 * If you have tasks with tags, and then delete the cluster, the tagged tasks are returned in the response. If you create a new cluster with the same name as the deleted cluster, the tagged tasks are not included in the response.
 */
export const describeTasks: API.OperationMethod<
  DescribeTasksRequest,
  DescribeTasksResponse,
  DescribeTasksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeTasksRequest,
  output: DescribeTasksResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTasks",
}));

export type DescribeTaskSetsError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | ServiceNotActiveException
  | ServiceNotFoundException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Describes the task sets in the specified cluster and service. This is used when a service uses the `EXTERNAL` deployment controller type. For more information, see Amazon ECS Deployment Types in the *Amazon Elastic Container Service Developer Guide*.
 */
export const describeTaskSets: API.OperationMethod<
  DescribeTaskSetsRequest,
  DescribeTaskSetsResponse,
  DescribeTaskSetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeTaskSetsRequest,
  output: DescribeTaskSetsResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
    ServiceNotActiveException,
    ServiceNotFoundException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTaskSets",
}));

export type DiscoverPollEndpointError =
  | AccessDeniedException
  | ClientException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * This action is only used by the Amazon ECS agent, and it is not intended for use outside of the agent.
 *
 * Returns an endpoint for the Amazon ECS agent to poll for updates.
 */
export const discoverPollEndpoint: API.OperationMethod<
  DiscoverPollEndpointRequest,
  DiscoverPollEndpointResponse,
  DiscoverPollEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DiscoverPollEndpointRequest,
  output: DiscoverPollEndpointResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DiscoverPollEndpoint",
}));

export type ExecuteCommandError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | TargetNotConnectedException
  | CommonErrors;
/**
 * Runs a command remotely on a container within a task.
 *
 * If you use a condition key in your IAM policy to refine the conditions for the policy statement, for example limit the actions to a specific cluster, you receive an `AccessDeniedException` when there is a mismatch between the condition key value and the corresponding parameter value.
 *
 * For information about required permissions and considerations, see Using Amazon ECS Exec for debugging in the *Amazon ECS Developer Guide*.
 */
export const executeCommand: API.OperationMethod<
  ExecuteCommandRequest,
  ExecuteCommandResponse,
  ExecuteCommandError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ExecuteCommandRequest,
  output: ExecuteCommandResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
    TargetNotConnectedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExecuteCommand",
}));

export type GetTaskProtectionError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ResourceNotFoundException
  | ServerException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Retrieves the protection status of tasks in an Amazon ECS service.
 */
export const getTaskProtection: API.OperationMethod<
  GetTaskProtectionRequest,
  GetTaskProtectionResponse,
  GetTaskProtectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTaskProtectionRequest,
  output: GetTaskProtectionResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ResourceNotFoundException,
    ServerException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTaskProtection",
}));

export type ListAccountSettingsError =
  | AccessDeniedException
  | ClientException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * Lists the account settings for a specified principal.
 */
export const listAccountSettings: API.PaginatedOperationMethod<
  ListAccountSettingsRequest,
  ListAccountSettingsResponse,
  ListAccountSettingsError,
  Credentials | HttpClient.HttpClient,
  Setting
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAccountSettingsRequest,
  output: ListAccountSettingsResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccountSettings",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "settings",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAttributesError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * Lists the attributes for Amazon ECS resources within a specified target type and cluster. When you specify a target type and cluster, `ListAttributes` returns a list of attribute objects, one for each attribute on each resource. You can filter the list of results to a single attribute name to only return results that have that name. You can also filter the results by attribute name and value. You can do this, for example, to see which container instances in a cluster are running a Linux AMI (`ecs.os-type=linux`).
 */
export const listAttributes: API.PaginatedOperationMethod<
  ListAttributesRequest,
  ListAttributesResponse,
  ListAttributesError,
  Credentials | HttpClient.HttpClient,
  Attribute
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAttributesRequest,
  output: ListAttributesResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAttributes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "attributes",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListClustersError =
  | AccessDeniedException
  | ClientException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * Returns a list of existing clusters.
 */
export const listClusters: API.PaginatedOperationMethod<
  ListClustersRequest,
  ListClustersResponse,
  ListClustersError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListClustersRequest,
  output: ListClustersResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListClusters",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "clusterArns",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListContainerInstancesError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * Returns a list of container instances in a specified cluster. You can filter the results of a `ListContainerInstances` operation with cluster query language statements inside the `filter` parameter. For more information, see Cluster Query Language in the *Amazon Elastic Container Service Developer Guide*.
 */
export const listContainerInstances: API.PaginatedOperationMethod<
  ListContainerInstancesRequest,
  ListContainerInstancesResponse,
  ListContainerInstancesError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListContainerInstancesRequest,
  output: ListContainerInstancesResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListContainerInstances",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "containerInstanceArns",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDaemonDeploymentsError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Returns a list of daemon deployments for a specified daemon. You can filter the results by status or creation time.
 */
export const listDaemonDeployments: API.OperationMethod<
  ListDaemonDeploymentsRequest,
  ListDaemonDeploymentsResponse,
  ListDaemonDeploymentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListDaemonDeploymentsRequest,
  output: ListDaemonDeploymentsResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDaemonDeployments",
}));

export type ListDaemonsError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Returns a list of daemons. You can filter the results by cluster or capacity provider.
 */
export const listDaemons: API.OperationMethod<
  ListDaemonsRequest,
  ListDaemonsResponse,
  ListDaemonsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListDaemonsRequest,
  output: ListDaemonsResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDaemons",
}));

export type ListDaemonTaskDefinitionsError =
  | AccessDeniedException
  | ClientException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * Returns a list of daemon task definitions that are registered to your account. You can filter the results by family name, status, or both to find daemon task definitions that match your criteria.
 */
export const listDaemonTaskDefinitions: API.OperationMethod<
  ListDaemonTaskDefinitionsRequest,
  ListDaemonTaskDefinitionsResponse,
  ListDaemonTaskDefinitionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListDaemonTaskDefinitionsRequest,
  output: ListDaemonTaskDefinitionsResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDaemonTaskDefinitions",
}));

export type ListServiceDeploymentsError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | ServiceNotFoundException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * This operation lists all the service deployments that meet the specified filter criteria.
 *
 * A service deployment happens when you release a software update for the service. You route traffic from the running service revisions to the new service revison and control the number of running tasks.
 *
 * This API returns the values that you use for the request parameters in DescribeServiceRevisions.
 */
export const listServiceDeployments: API.OperationMethod<
  ListServiceDeploymentsRequest,
  ListServiceDeploymentsResponse,
  ListServiceDeploymentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListServiceDeploymentsRequest,
  output: ListServiceDeploymentsResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
    ServiceNotFoundException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServiceDeployments",
}));

export type ListServicesError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * Returns a list of services. You can filter the results by cluster, launch type, and scheduling strategy.
 */
export const listServices: API.PaginatedOperationMethod<
  ListServicesRequest,
  ListServicesResponse,
  ListServicesError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListServicesRequest,
  output: ListServicesResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServices",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "serviceArns",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListServicesByNamespaceError =
  | AccessDeniedException
  | ClientException
  | InvalidParameterException
  | NamespaceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * This operation lists all of the services that are associated with a Cloud Map namespace. This list might include services in different clusters. In contrast, `ListServices` can only list services in one cluster at a time. If you need to filter the list of services in a single cluster by various parameters, use `ListServices`. For more information, see Service Connect in the *Amazon Elastic Container Service Developer Guide*.
 */
export const listServicesByNamespace: API.PaginatedOperationMethod<
  ListServicesByNamespaceRequest,
  ListServicesByNamespaceResponse,
  ListServicesByNamespaceError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListServicesByNamespaceRequest,
  output: ListServicesByNamespaceResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    InvalidParameterException,
    NamespaceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServicesByNamespace",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "serviceArns",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * List the tags for an Amazon ECS resource.
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
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListTaskDefinitionFamiliesError =
  | AccessDeniedException
  | ClientException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * Returns a list of task definition families that are registered to your account. This list includes task definition families that no longer have any `ACTIVE` task definition revisions.
 *
 * You can filter out task definition families that don't contain any `ACTIVE` task definition revisions by setting the `status` parameter to `ACTIVE`. You can also filter the results with the `familyPrefix` parameter.
 */
export const listTaskDefinitionFamilies: API.PaginatedOperationMethod<
  ListTaskDefinitionFamiliesRequest,
  ListTaskDefinitionFamiliesResponse,
  ListTaskDefinitionFamiliesError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTaskDefinitionFamiliesRequest,
  output: ListTaskDefinitionFamiliesResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTaskDefinitionFamilies",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "families",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTaskDefinitionsError =
  | AccessDeniedException
  | ClientException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * Returns a list of task definitions that are registered to your account. You can filter the results by family name with the `familyPrefix` parameter or by status with the `status` parameter.
 */
export const listTaskDefinitions: API.PaginatedOperationMethod<
  ListTaskDefinitionsRequest,
  ListTaskDefinitionsResponse,
  ListTaskDefinitionsError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTaskDefinitionsRequest,
  output: ListTaskDefinitionsResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTaskDefinitions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "taskDefinitionArns",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTasksError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | ServiceNotFoundException
  | CommonErrors;
/**
 * Returns a list of tasks. You can filter the results by cluster, task definition family, container instance, launch type, what IAM principal started the task, or by the desired status of the task.
 *
 * Recently stopped tasks might appear in the returned results.
 */
export const listTasks: API.PaginatedOperationMethod<
  ListTasksRequest,
  ListTasksResponse,
  ListTasksError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTasksRequest,
  output: ListTasksResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
    ServiceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTasks",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "taskArns",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PutAccountSettingError =
  | AccessDeniedException
  | ClientException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * Modifies an account setting. Account settings are set on a per-Region basis.
 *
 * If you change the root user account setting, the default settings are reset for users and roles that do not have specified individual account settings. For more information, see Account Settings in the *Amazon Elastic Container Service Developer Guide*.
 */
export const putAccountSetting: API.OperationMethod<
  PutAccountSettingRequest,
  PutAccountSettingResponse,
  PutAccountSettingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutAccountSettingRequest,
  output: PutAccountSettingResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccountSetting",
}));

export type PutAccountSettingDefaultError =
  | AccessDeniedException
  | ClientException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * Modifies an account setting for all users on an account for whom no individual account setting has been specified. Account settings are set on a per-Region basis.
 */
export const putAccountSettingDefault: API.OperationMethod<
  PutAccountSettingDefaultRequest,
  PutAccountSettingDefaultResponse,
  PutAccountSettingDefaultError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutAccountSettingDefaultRequest,
  output: PutAccountSettingDefaultResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccountSettingDefault",
}));

export type PutAttributesError =
  | AccessDeniedException
  | AttributeLimitExceededException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | TargetNotFoundException
  | CommonErrors;
/**
 * Create or update an attribute on an Amazon ECS resource. If the attribute doesn't exist, it's created. If the attribute exists, its value is replaced with the specified value. To delete an attribute, use DeleteAttributes. For more information, see Attributes in the *Amazon Elastic Container Service Developer Guide*.
 */
export const putAttributes: API.OperationMethod<
  PutAttributesRequest,
  PutAttributesResponse,
  PutAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutAttributesRequest,
  output: PutAttributesResponse,
  errors: [
    AccessDeniedException,
    AttributeLimitExceededException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
    TargetNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAttributes",
}));

export type PutClusterCapacityProvidersError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ResourceInUseException
  | ServerException
  | UpdateInProgressException
  | CommonErrors;
/**
 * Modifies the available capacity providers and the default capacity provider strategy for a cluster.
 *
 * You must specify both the available capacity providers and a default capacity provider strategy for the cluster. If the specified cluster has existing capacity providers associated with it, you must specify all existing capacity providers in addition to any new ones you want to add. Any existing capacity providers that are associated with a cluster that are omitted from a PutClusterCapacityProviders API call will be disassociated with the cluster. You can only disassociate an existing capacity provider from a cluster if it's not being used by any existing tasks.
 *
 * When creating a service or running a task on a cluster, if no capacity provider or launch type is specified, then the cluster's default capacity provider strategy is used. We recommend that you define a default capacity provider strategy for your cluster. However, you must specify an empty array (`[]`) to bypass defining a default strategy.
 *
 * Amazon ECS Managed Instances doesn't support this, because when you create a capacity provider with Amazon ECS Managed Instances, it becomes available only within the specified cluster.
 */
export const putClusterCapacityProviders: API.OperationMethod<
  PutClusterCapacityProvidersRequest,
  PutClusterCapacityProvidersResponse,
  PutClusterCapacityProvidersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutClusterCapacityProvidersRequest,
  output: PutClusterCapacityProvidersResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ResourceInUseException,
    ServerException,
    UpdateInProgressException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutClusterCapacityProviders",
}));

export type RegisterContainerInstanceError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * This action is only used by the Amazon ECS agent, and it is not intended for use outside of the agent.
 *
 * Registers an EC2 instance into the specified cluster. This instance becomes available to place containers on.
 */
export const registerContainerInstance: API.OperationMethod<
  RegisterContainerInstanceRequest,
  RegisterContainerInstanceResponse,
  RegisterContainerInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterContainerInstanceRequest,
  output: RegisterContainerInstanceResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterContainerInstance",
}));

export type RegisterDaemonTaskDefinitionError =
  | AccessDeniedException
  | ClientException
  | InvalidParameterException
  | LimitExceededException
  | ServerException
  | CommonErrors;
/**
 * Registers a new daemon task definition from the supplied `family` and `containerDefinitions`. Optionally, you can add data volumes to your containers with the `volumes` parameter. For more information, see Daemon task definitions in the *Amazon Elastic Container Service Developer Guide*.
 *
 * A daemon task definition is a template that describes the containers that form a daemon. Daemons deploy cross-cutting software agents such as security monitoring, telemetry, and logging across your Amazon ECS infrastructure.
 *
 * Each time you call `RegisterDaemonTaskDefinition`, a new revision of the daemon task definition is created. You can't modify a revision after you register it.
 */
export const registerDaemonTaskDefinition: API.OperationMethod<
  RegisterDaemonTaskDefinitionRequest,
  RegisterDaemonTaskDefinitionResponse,
  RegisterDaemonTaskDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterDaemonTaskDefinitionRequest,
  output: RegisterDaemonTaskDefinitionResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    InvalidParameterException,
    LimitExceededException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterDaemonTaskDefinition",
}));

export type RegisterTaskDefinitionError =
  | AccessDeniedException
  | ClientException
  | InvalidParameterException
  | LimitExceededException
  | ServerException
  | CommonErrors;
/**
 * Registers a new task definition from the supplied `family` and `containerDefinitions`. Optionally, you can add data volumes to your containers with the `volumes` parameter. For more information about task definition parameters and defaults, see Amazon ECS Task Definitions in the *Amazon Elastic Container Service Developer Guide*.
 *
 * You can specify a role for your task with the `taskRoleArn` parameter. When you specify a role for a task, its containers can then use the latest versions of the CLI or SDKs to make API requests to the Amazon Web Services services that are specified in the policy that's associated with the role. For more information, see IAM Roles for Tasks in the *Amazon Elastic Container Service Developer Guide*.
 *
 * You can specify a Docker networking mode for the containers in your task definition with the `networkMode` parameter. If you specify the `awsvpc` network mode, the task is allocated an elastic network interface, and you must specify a NetworkConfiguration when you create a service or run a task with the task definition. For more information, see Task Networking in the *Amazon Elastic Container Service Developer Guide*.
 */
export const registerTaskDefinition: API.OperationMethod<
  RegisterTaskDefinitionRequest,
  RegisterTaskDefinitionResponse,
  RegisterTaskDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterTaskDefinitionRequest,
  output: RegisterTaskDefinitionResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    InvalidParameterException,
    LimitExceededException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterTaskDefinition",
}));

export type RunTaskError =
  | AccessDeniedException
  | BlockedException
  | ClientException
  | ClusterNotFoundException
  | ConflictException
  | InvalidParameterException
  | PlatformTaskDefinitionIncompatibilityException
  | PlatformUnknownException
  | ServerException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Starts a new task using the specified task definition.
 *
 * On March 21, 2024, a change was made to resolve the task definition revision before authorization. When a task definition revision is not specified, authorization will occur using the latest revision of a task definition.
 *
 * Amazon Elastic Inference (EI) is no longer available to customers.
 *
 * You can allow Amazon ECS to place tasks for you, or you can customize how Amazon ECS places tasks using placement constraints and placement strategies. For more information, see Scheduling Tasks in the *Amazon Elastic Container Service Developer Guide*.
 *
 * Alternatively, you can use `StartTask` to use your own scheduler or place tasks manually on specific container instances.
 *
 * You can attach Amazon EBS volumes to Amazon ECS tasks by configuring the volume when creating or updating a service. For more information, see Amazon EBS volumes in the *Amazon Elastic Container Service Developer Guide*.
 *
 * The Amazon ECS API follows an eventual consistency model. This is because of the distributed nature of the system supporting the API. This means that the result of an API command you run that affects your Amazon ECS resources might not be immediately visible to all subsequent commands you run. Keep this in mind when you carry out an API command that immediately follows a previous API command.
 *
 * To manage eventual consistency, you can do the following:
 *
 * - Confirm the state of the resource before you run a command to modify it. Run the DescribeTasks command using an exponential backoff algorithm to ensure that you allow enough time for the previous command to propagate through the system. To do this, run the DescribeTasks command repeatedly, starting with a couple of seconds of wait time and increasing gradually up to five minutes of wait time.
 *
 * - Add wait time between subsequent commands, even if the DescribeTasks command returns an accurate response. Apply an exponential backoff algorithm starting with a couple of seconds of wait time, and increase gradually up to about five minutes of wait time.
 *
 * If you get a `ConflictException` error, the `RunTask` request could not be processed due to conflicts. The provided `clientToken` is already in use with a different `RunTask` request. The `resourceIds` are the existing task ARNs which are already associated with the `clientToken`.
 *
 * To fix this issue:
 *
 * - Run `RunTask` with a unique `clientToken`.
 *
 * - Run `RunTask` with the `clientToken` and the original set of parameters
 *
 * If you get a `ClientException`error, the `RunTask` could not be processed because you use managed scaling and there is a capacity error because the quota of tasks in the `PROVISIONING` per cluster has been reached. For information about the service quotas, see Amazon ECS service quotas.
 */
export const runTask: API.OperationMethod<
  RunTaskRequest,
  RunTaskResponse,
  RunTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RunTaskRequest,
  output: RunTaskResponse,
  errors: [
    AccessDeniedException,
    BlockedException,
    ClientException,
    ClusterNotFoundException,
    ConflictException,
    InvalidParameterException,
    PlatformTaskDefinitionIncompatibilityException,
    PlatformUnknownException,
    ServerException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RunTask",
}));

export type StartTaskError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | NamespaceNotFoundException
  | ServerException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Starts a new task from the specified task definition on the specified container instance or instances.
 *
 * On March 21, 2024, a change was made to resolve the task definition revision before authorization. When a task definition revision is not specified, authorization will occur using the latest revision of a task definition.
 *
 * Amazon Elastic Inference (EI) is no longer available to customers.
 *
 * Alternatively, you can use`RunTask` to place tasks for you. For more information, see Scheduling Tasks in the *Amazon Elastic Container Service Developer Guide*.
 *
 * You can attach Amazon EBS volumes to Amazon ECS tasks by configuring the volume when creating or updating a service. For more information, see Amazon EBS volumes in the *Amazon Elastic Container Service Developer Guide*.
 */
export const startTask: API.OperationMethod<
  StartTaskRequest,
  StartTaskResponse,
  StartTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartTaskRequest,
  output: StartTaskResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    NamespaceNotFoundException,
    ServerException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartTask",
}));

export type StopServiceDeploymentError =
  | AccessDeniedException
  | ClientException
  | ConflictException
  | InvalidParameterException
  | ServerException
  | ServiceDeploymentNotFoundException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Stops an ongoing service deployment.
 *
 * The following stop types are avaiable:
 *
 * - ROLLBACK - This option rolls back the service deployment to the previous service revision.
 *
 * You can use this option even if you didn't configure the service deployment for the rollback option.
 *
 * For more information, see Stopping Amazon ECS service deployments in the *Amazon Elastic Container Service Developer Guide*.
 */
export const stopServiceDeployment: API.OperationMethod<
  StopServiceDeploymentRequest,
  StopServiceDeploymentResponse,
  StopServiceDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopServiceDeploymentRequest,
  output: StopServiceDeploymentResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    ConflictException,
    InvalidParameterException,
    ServerException,
    ServiceDeploymentNotFoundException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopServiceDeployment",
}));

export type StopTaskError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * Stops a running task. Any tags associated with the task will be deleted.
 *
 * When you call `StopTask` on a task, the equivalent of `docker stop` is issued to the containers running in the task. This results in a stop signal value and a default 30-second timeout, after which the `SIGKILL` value is sent and the containers are forcibly stopped. This signal can be defined in your container image with the `STOPSIGNAL` instruction and will default to `SIGTERM`. If the container handles the `SIGTERM` value gracefully and exits within 30 seconds from receiving it, no `SIGKILL` value is sent.
 *
 * For Windows containers, POSIX signals do not work and runtime stops the container by sending a `CTRL_SHUTDOWN_EVENT`. For more information, see Unable to react to graceful shutdown of (Windows) container #25982 on GitHub.
 *
 * The default 30-second timeout can be configured on the Amazon ECS container agent with the `ECS_CONTAINER_STOP_TIMEOUT` variable. For more information, see Amazon ECS Container Agent Configuration in the *Amazon Elastic Container Service Developer Guide*.
 */
export const stopTask: API.OperationMethod<
  StopTaskRequest,
  StopTaskResponse,
  StopTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopTaskRequest,
  output: StopTaskResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopTask",
}));

export type SubmitAttachmentStateChangesError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * This action is only used by the Amazon ECS agent, and it is not intended for use outside of the agent.
 *
 * Sent to acknowledge that an attachment changed states.
 */
export const submitAttachmentStateChanges: API.OperationMethod<
  SubmitAttachmentStateChangesRequest,
  SubmitAttachmentStateChangesResponse,
  SubmitAttachmentStateChangesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SubmitAttachmentStateChangesRequest,
  output: SubmitAttachmentStateChangesResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SubmitAttachmentStateChanges",
}));

export type SubmitContainerStateChangeError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * This action is only used by the Amazon ECS agent, and it is not intended for use outside of the agent.
 *
 * Sent to acknowledge that a container changed states.
 */
export const submitContainerStateChange: API.OperationMethod<
  SubmitContainerStateChangeRequest,
  SubmitContainerStateChangeResponse,
  SubmitContainerStateChangeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SubmitContainerStateChangeRequest,
  output: SubmitContainerStateChangeResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SubmitContainerStateChange",
}));

export type SubmitTaskStateChangeError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * This action is only used by the Amazon ECS agent, and it is not intended for use outside of the agent.
 *
 * Sent to acknowledge that a task changed states.
 */
export const submitTaskStateChange: API.OperationMethod<
  SubmitTaskStateChangeRequest,
  SubmitTaskStateChangeResponse,
  SubmitTaskStateChangeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SubmitTaskStateChangeRequest,
  output: SubmitTaskStateChangeResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SubmitTaskStateChange",
}));

export type TagResourceError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | LimitExceededException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Associates the specified tags to a resource with the specified `resourceArn`. If existing tags on a resource aren't specified in the request parameters, they aren't changed. When a resource is deleted, the tags that are associated with that resource are deleted as well.
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
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    LimitExceededException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Deletes specified tags from a resource.
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
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateCapacityProviderError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Modifies the parameters for a capacity provider.
 *
 * These changes only apply to new Amazon ECS Managed Instances, or EC2 instances, not existing ones.
 */
export const updateCapacityProvider: API.OperationMethod<
  UpdateCapacityProviderRequest,
  UpdateCapacityProviderResponse,
  UpdateCapacityProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCapacityProviderRequest,
  output: UpdateCapacityProviderResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCapacityProvider",
}));

export type UpdateClusterError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | NamespaceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Updates the cluster.
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
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    NamespaceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCluster",
}));

export type UpdateClusterSettingsError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | UpdateInProgressException
  | CommonErrors;
/**
 * Modifies the settings to use for a cluster.
 */
export const updateClusterSettings: API.OperationMethod<
  UpdateClusterSettingsRequest,
  UpdateClusterSettingsResponse,
  UpdateClusterSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateClusterSettingsRequest,
  output: UpdateClusterSettingsResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
    UpdateInProgressException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateClusterSettings",
}));

export type UpdateContainerAgentError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | MissingVersionException
  | NoUpdateAvailableException
  | ServerException
  | UpdateInProgressException
  | CommonErrors;
/**
 * Updates the Amazon ECS container agent on a specified container instance. Updating the Amazon ECS container agent doesn't interrupt running tasks or services on the container instance. The process for updating the agent differs depending on whether your container instance was launched with the Amazon ECS-optimized AMI or another operating system.
 *
 * The `UpdateContainerAgent` API isn't supported for container instances using the Amazon ECS-optimized Amazon Linux 2 (arm64) AMI. To update the container agent, you can update the `ecs-init` package. This updates the agent. For more information, see Updating the Amazon ECS container agent in the *Amazon Elastic Container Service Developer Guide*.
 *
 * Agent updates with the `UpdateContainerAgent` API operation do not apply to Windows container instances. We recommend that you launch new container instances to update the agent version in your Windows clusters.
 *
 * The `UpdateContainerAgent` API requires an Amazon ECS-optimized AMI or Amazon Linux AMI with the `ecs-init` service installed and running. For help updating the Amazon ECS container agent on other operating systems, see Manually updating the Amazon ECS container agent in the *Amazon Elastic Container Service Developer Guide*.
 */
export const updateContainerAgent: API.OperationMethod<
  UpdateContainerAgentRequest,
  UpdateContainerAgentResponse,
  UpdateContainerAgentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateContainerAgentRequest,
  output: UpdateContainerAgentResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    MissingVersionException,
    NoUpdateAvailableException,
    ServerException,
    UpdateInProgressException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateContainerAgent",
}));

export type UpdateContainerInstancesStateError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * Modifies the status of an Amazon ECS container instance.
 *
 * Once a container instance has reached an `ACTIVE` state, you can change the status of a container instance to `DRAINING` to manually remove an instance from a cluster, for example to perform system updates, update the Docker daemon, or scale down the cluster size.
 *
 * A container instance can't be changed to `DRAINING` until it has reached an `ACTIVE` status. If the instance is in any other status, an error will be received.
 *
 * When you set a container instance to `DRAINING`, Amazon ECS prevents new tasks from being scheduled for placement on the container instance and replacement service tasks are started on other container instances in the cluster if the resources are available. Service tasks on the container instance that are in the `PENDING` state are stopped immediately.
 *
 * Service tasks on the container instance that are in the `RUNNING` state are stopped and replaced according to the service's deployment configuration parameters, `minimumHealthyPercent` and `maximumPercent`. You can change the deployment configuration of your service using UpdateService.
 *
 * - If `minimumHealthyPercent` is below 100%, the scheduler can ignore `desiredCount` temporarily during task replacement. For example, `desiredCount` is four tasks, a minimum of 50% allows the scheduler to stop two existing tasks before starting two new tasks. If the minimum is 100%, the service scheduler can't remove existing tasks until the replacement tasks are considered healthy. Tasks for services that do not use a load balancer are considered healthy if they're in the `RUNNING` state. Tasks for services that use a load balancer are considered healthy if they're in the `RUNNING` state and are reported as healthy by the load balancer.
 *
 * - The `maximumPercent` parameter represents an upper limit on the number of running tasks during task replacement. You can use this to define the replacement batch size. For example, if `desiredCount` is four tasks, a maximum of 200% starts four new tasks before stopping the four tasks to be drained, provided that the cluster resources required to do this are available. If the maximum is 100%, then replacement tasks can't start until the draining tasks have stopped.
 *
 * Any `PENDING` or `RUNNING` tasks that do not belong to a service aren't affected. You must wait for them to finish or stop them manually.
 *
 * A container instance has completed draining when it has no more `RUNNING` tasks. You can verify this using ListTasks.
 *
 * When a container instance has been drained, you can set a container instance to `ACTIVE` status and once it has reached that status the Amazon ECS scheduler can begin scheduling tasks on the instance again.
 */
export const updateContainerInstancesState: API.OperationMethod<
  UpdateContainerInstancesStateRequest,
  UpdateContainerInstancesStateResponse,
  UpdateContainerInstancesStateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateContainerInstancesStateRequest,
  output: UpdateContainerInstancesStateResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateContainerInstancesState",
}));

export type UpdateDaemonError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | DaemonNotActiveException
  | DaemonNotFoundException
  | InvalidParameterException
  | PlatformUnknownException
  | ServerException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Updates the specified daemon. When you update a daemon, a new deployment is triggered that progressively rolls out the changes to the container instances associated with the daemon's capacity providers. For more information, see Daemon deployments in the *Amazon Elastic Container Service Developer Guide*.
 *
 * Amazon ECS drains existing container instances and provisions new instances with the updated daemon. Amazon ECS automatically launches replacement tasks for your services.
 *
 * Updating a daemon triggers a rolling deployment that drains and replaces container instances. Plan updates during maintenance windows to minimize impact on running services.
 *
 * ECS Managed Daemons is only supported for Amazon ECS Managed Instances Capacity Providers.
 */
export const updateDaemon: API.OperationMethod<
  UpdateDaemonRequest,
  UpdateDaemonResponse,
  UpdateDaemonError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDaemonRequest,
  output: UpdateDaemonResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    DaemonNotActiveException,
    DaemonNotFoundException,
    InvalidParameterException,
    PlatformUnknownException,
    ServerException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDaemon",
}));

export type UpdateExpressGatewayServiceError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | ServiceNotActiveException
  | ServiceNotFoundException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Updates an existing Express service configuration. Modifies container settings, resource allocation, auto-scaling configuration, and other service parameters without recreating the service.
 *
 * Amazon ECS creates a new service revision with updated configuration and performs a rolling deployment to replace existing tasks. The service remains available during updates, ensuring zero-downtime deployments.
 *
 * Some parameters like the infrastructure role cannot be modified after service creation and require creating a new service.
 */
export const updateExpressGatewayService: API.OperationMethod<
  UpdateExpressGatewayServiceRequest,
  UpdateExpressGatewayServiceResponse,
  UpdateExpressGatewayServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateExpressGatewayServiceRequest,
  output: UpdateExpressGatewayServiceResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
    ServiceNotActiveException,
    ServiceNotFoundException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateExpressGatewayService",
}));

export type UpdateServiceError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | NamespaceNotFoundException
  | PlatformTaskDefinitionIncompatibilityException
  | PlatformUnknownException
  | ServerException
  | ServiceNotActiveException
  | ServiceNotFoundException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Modifies the parameters of a service.
 *
 * On March 21, 2024, a change was made to resolve the task definition revision before authorization. When a task definition revision is not specified, authorization will occur using the latest revision of a task definition.
 *
 * For services using the rolling update (`ECS`) you can update the desired count, deployment configuration, network configuration, load balancers, service registries, enable ECS managed tags option, propagate tags option, task placement constraints and strategies, and task definition. When you update any of these parameters, Amazon ECS starts new tasks with the new configuration.
 *
 * You can attach Amazon EBS volumes to Amazon ECS tasks by configuring the volume when starting or running a task, or when creating or updating a service. For more information, see Amazon EBS volumes in the *Amazon Elastic Container Service Developer Guide*. You can update your volume configurations and trigger a new deployment. `volumeConfigurations` is only supported for REPLICA service and not DAEMON service. If you leave `volumeConfigurations` `null`, it doesn't trigger a new deployment. For more information on volumes, see Amazon EBS volumes in the *Amazon Elastic Container Service Developer Guide*.
 *
 * For services using the blue/green (`CODE_DEPLOY`) deployment controller, only the desired count, deployment configuration, health check grace period, task placement constraints and strategies, enable ECS managed tags option, and propagate tags can be updated using this API. If the network configuration, platform version, task definition, or load balancer need to be updated, create a new CodeDeploy deployment. For more information, see CreateDeployment in the *CodeDeploy API Reference*.
 *
 * For services using an external deployment controller, you can update only the desired count, task placement constraints and strategies, health check grace period, enable ECS managed tags option, and propagate tags option, using this API. If the launch type, load balancer, network configuration, platform version, or task definition need to be updated, create a new task set For more information, see CreateTaskSet.
 *
 * You can add to or subtract from the number of instantiations of a task definition in a service by specifying the cluster that the service is running in and a new `desiredCount` parameter.
 *
 * You can attach Amazon EBS volumes to Amazon ECS tasks by configuring the volume when starting or running a task, or when creating or updating a service. For more information, see Amazon EBS volumes in the *Amazon Elastic Container Service Developer Guide*.
 *
 * If you have updated the container image of your application, you can create a new task definition with that image and deploy it to your service. The service scheduler uses the minimum healthy percent and maximum percent parameters (in the service's deployment configuration) to determine the deployment strategy.
 *
 * If your updated Docker image uses the same tag as what is in the existing task definition for your service (for example, `my_image:latest`), you don't need to create a new revision of your task definition. You can update the service using the `forceNewDeployment` option. The new tasks launched by the deployment pull the current image/tag combination from your repository when they start.
 *
 * You can also update the deployment configuration of a service. When a deployment is triggered by updating the task definition of a service, the service scheduler uses the deployment configuration parameters, `minimumHealthyPercent` and `maximumPercent`, to determine the deployment strategy.
 *
 * - If `minimumHealthyPercent` is below 100%, the scheduler can ignore `desiredCount` temporarily during a deployment. For example, if `desiredCount` is four tasks, a minimum of 50% allows the scheduler to stop two existing tasks before starting two new tasks. Tasks for services that don't use a load balancer are considered healthy if they're in the `RUNNING` state. Tasks for services that use a load balancer are considered healthy if they're in the `RUNNING` state and are reported as healthy by the load balancer.
 *
 * - The `maximumPercent` parameter represents an upper limit on the number of running tasks during a deployment. You can use it to define the deployment batch size. For example, if `desiredCount` is four tasks, a maximum of 200% starts four new tasks before stopping the four older tasks (provided that the cluster resources required to do this are available).
 *
 * When UpdateService stops a task during a deployment, the equivalent of `docker stop` is issued to the containers running in the task. This results in a `SIGTERM` and a 30-second timeout. After this, `SIGKILL` is sent and the containers are forcibly stopped. If the container handles the `SIGTERM` gracefully and exits within 30 seconds from receiving it, no `SIGKILL` is sent.
 *
 * When the service scheduler launches new tasks, it determines task placement in your cluster with the following logic.
 *
 * - Determine which of the container instances in your cluster can support your service's task definition. For example, they have the required CPU, memory, ports, and container instance attributes.
 *
 * - By default, the service scheduler attempts to balance tasks across Availability Zones in this manner even though you can choose a different placement strategy.
 *
 * - Sort the valid container instances by the fewest number of running tasks for this service in the same Availability Zone as the instance. For example, if zone A has one running service task and zones B and C each have zero, valid container instances in either zone B or C are considered optimal for placement.
 *
 * - Place the new service task on a valid container instance in an optimal Availability Zone (based on the previous steps), favoring container instances with the fewest number of running tasks for this service.
 *
 * When the service scheduler stops running tasks, it attempts to maintain balance across the Availability Zones in your cluster using the following logic:
 *
 * - Sort the container instances by the largest number of running tasks for this service in the same Availability Zone as the instance. For example, if zone A has one running service task and zones B and C each have two, container instances in either zone B or C are considered optimal for termination.
 *
 * - Stop the task on a container instance in an optimal Availability Zone (based on the previous steps), favoring container instances with the largest number of running tasks for this service.
 */
export const updateService: API.OperationMethod<
  UpdateServiceRequest,
  UpdateServiceResponse,
  UpdateServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateServiceRequest,
  output: UpdateServiceResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    NamespaceNotFoundException,
    PlatformTaskDefinitionIncompatibilityException,
    PlatformUnknownException,
    ServerException,
    ServiceNotActiveException,
    ServiceNotFoundException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateService",
}));

export type UpdateServicePrimaryTaskSetError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | ServiceNotActiveException
  | ServiceNotFoundException
  | TaskSetNotFoundException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Modifies which task set in a service is the primary task set. Any parameters that are updated on the primary task set in a service will transition to the service. This is used when a service uses the `EXTERNAL` deployment controller type. For more information, see Amazon ECS Deployment Types in the *Amazon Elastic Container Service Developer Guide*.
 */
export const updateServicePrimaryTaskSet: API.OperationMethod<
  UpdateServicePrimaryTaskSetRequest,
  UpdateServicePrimaryTaskSetResponse,
  UpdateServicePrimaryTaskSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateServicePrimaryTaskSetRequest,
  output: UpdateServicePrimaryTaskSetResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
    ServiceNotActiveException,
    ServiceNotFoundException,
    TaskSetNotFoundException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateServicePrimaryTaskSet",
}));

export type UpdateTaskProtectionError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ResourceNotFoundException
  | ServerException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Updates the protection status of a task. You can set `protectionEnabled` to `true` to protect your task from termination during scale-in events from Service Autoscaling or deployments.
 *
 * Task-protection, by default, expires after 2 hours at which point Amazon ECS clears the `protectionEnabled` property making the task eligible for termination by a subsequent scale-in event.
 *
 * You can specify a custom expiration period for task protection from 1 minute to up to 2,880 minutes (48 hours). To specify the custom expiration period, set the `expiresInMinutes` property. The `expiresInMinutes` property is always reset when you invoke this operation for a task that already has `protectionEnabled` set to `true`. You can keep extending the protection expiration period of a task by invoking this operation repeatedly.
 *
 * To learn more about Amazon ECS task protection, see Task scale-in protection in the * Amazon Elastic Container Service Developer Guide* .
 *
 * This operation is only supported for tasks belonging to an Amazon ECS service. Invoking this operation for a standalone task will result in an `TASK_NOT_VALID` failure. For more information, see API failure reasons.
 *
 * If you prefer to set task protection from within the container, we recommend using the Task scale-in protection endpoint.
 */
export const updateTaskProtection: API.OperationMethod<
  UpdateTaskProtectionRequest,
  UpdateTaskProtectionResponse,
  UpdateTaskProtectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateTaskProtectionRequest,
  output: UpdateTaskProtectionResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ResourceNotFoundException,
    ServerException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTaskProtection",
}));

export type UpdateTaskSetError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | LimitExceededException
  | ServerException
  | ServiceNotActiveException
  | ServiceNotFoundException
  | TaskSetNotFoundException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Modifies a task set. This is used when a service uses the `EXTERNAL` deployment controller type. For more information, see Amazon ECS Deployment Types in the *Amazon Elastic Container Service Developer Guide*.
 */
export const updateTaskSet: API.OperationMethod<
  UpdateTaskSetRequest,
  UpdateTaskSetResponse,
  UpdateTaskSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateTaskSetRequest,
  output: UpdateTaskSetResponse,
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    LimitExceededException,
    ServerException,
    ServiceNotActiveException,
    ServiceNotFoundException,
    TaskSetNotFoundException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTaskSet",
}));
