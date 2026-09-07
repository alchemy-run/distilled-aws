import * as HttpClient from "effect/unstable/http/HttpClient";
import * as redacted from "effect/Redacted";
import * as S from "@distilled.cloud/core/schema";
import * as API from "@distilled.cloud/core/api";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials as Creds } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { SensitiveString } from "../sensitive.ts";
const ns = T.XmlNamespace(
  "http://elasticmapreduce.amazonaws.com/doc/2009-03-31",
);
const svc = T.AwsApiService({
  sdkId: "EMR",
  serviceShapeName: "ElasticMapReduce",
});
const auth = T.AwsAuthSigv4({ name: "elasticmapreduce" });
const ver = T.ServiceVersion("2009-03-31");
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
              `https://elasticmapreduce-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
              return e(`https://elasticmapreduce.${Region}.amazonaws.com`);
            }
            return e(
              `https://elasticmapreduce-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://elasticmapreduce.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://elasticmapreduce.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class ClusterNotFound
  extends /*@__PURE__*/ S.TaggedError<ClusterNotFound>()(
    "ClusterNotFound",
    {
      ErrorCode: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.SyntheticError({
      from: "InvalidRequestException",
      message: { matches: "^Cluster id .* is not valid" },
    }),
  ).pipe(C.withNotFoundError) {}
export class InternalServerError
  extends /*@__PURE__*/ S.TaggedError<InternalServerError>()(
    "InternalServerError",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InternalFailure", httpResponseCode: 500 }),
      T.HttpError(500),
    ),
  ).pipe(C.withServerError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidRequestException>()(
    "InvalidRequestException",
    {
      ErrorCode: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
  ) {}
export class JobFlowNotFound
  extends /*@__PURE__*/ S.TaggedError<JobFlowNotFound>()(
    "JobFlowNotFound",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.SyntheticError({
      from: "ValidationException",
      message: { includes: "Specified job flow ID not valid" },
    }),
  ).pipe(C.withNotFoundError) {}
export class SecurityConfigurationAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<SecurityConfigurationAlreadyExists>()(
    "SecurityConfigurationAlreadyExists",
    {
      ErrorCode: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.SyntheticError({
      from: "InvalidRequestException",
      message: {
        matches: "^SecurityConfiguration with name .* already exists",
      },
    }),
  ).pipe(C.withAlreadyExistsError, C.withConflictError) {}
export class SecurityConfigurationNotFound
  extends /*@__PURE__*/ S.TaggedError<SecurityConfigurationNotFound>()(
    "SecurityConfigurationNotFound",
    {
      ErrorCode: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.SyntheticError({
      from: "InvalidRequestException",
      message: {
        matches: "^Security configuration with name .* does not exist",
      },
    }),
  ).pipe(C.withNotFoundError) {}
export class StudioNotFound
  extends /*@__PURE__*/ S.TaggedError<StudioNotFound>()(
    "StudioNotFound",
    {
      ErrorCode: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.SyntheticError({
      from: "InvalidRequestException",
      message: { includes: "Studio does not exist" },
    }),
  ).pipe(C.withNotFoundError) {}
export class StudioServiceRoleMissingS3Access
  extends /*@__PURE__*/ S.TaggedError<StudioServiceRoleMissingS3Access>()(
    "StudioServiceRoleMissingS3Access",
    {
      ErrorCode: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.SyntheticError({
      from: "InvalidRequestException",
      message: {
        includes: "does not have permission to access the 'S3 Location'",
      },
    }),
  ).pipe(C.withRetryableError) {}
export class StudioServiceRoleNotAssumable
  extends /*@__PURE__*/ S.TaggedError<StudioServiceRoleNotAssumable>()(
    "StudioServiceRoleNotAssumable",
    {
      ErrorCode: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.SyntheticError({
      from: "InvalidRequestException",
      message: { includes: "does not have permissions to assume role" },
    }),
  ).pipe(C.withRetryableError) {}
export type XmlStringMaxLen256 = string;
export type InstanceFleetType = "MASTER" | "CORE" | "TASK" | (string & {});
export const InstanceFleetType = S.String;

export type WholeNumber = number;
export type InstanceType = string;
export type NonNegativeDouble = number;
export type ThroughputVal = number;
export interface VolumeSpecification {
  VolumeType?: string;
  Iops?: number;
  SizeInGB?: number;
  Throughput?: number;
}
export const VolumeSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VolumeType: S.optional(S.String),
    Iops: S.optional(S.Number),
    SizeInGB: S.optional(S.Number),
    Throughput: S.optional(S.Number),
  }),
).annotate({
  identifier: "VolumeSpecification",
}) as any as S.Schema<VolumeSpecification>;
export interface EbsBlockDeviceConfig {
  VolumeSpecification?: VolumeSpecification;
  VolumesPerInstance?: number;
}
export const EbsBlockDeviceConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VolumeSpecification: S.optional(VolumeSpecification),
    VolumesPerInstance: S.optional(S.Number),
  }),
).annotate({
  identifier: "EbsBlockDeviceConfig",
}) as any as S.Schema<EbsBlockDeviceConfig>;
export type EbsBlockDeviceConfigList = EbsBlockDeviceConfig[];
export const EbsBlockDeviceConfigList =
  /*@__PURE__*/ S.Array(EbsBlockDeviceConfig);
export interface EbsConfiguration {
  EbsBlockDeviceConfigs?: EbsBlockDeviceConfig[];
  EbsOptimized?: boolean;
}
export const EbsConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EbsBlockDeviceConfigs: S.optional(EbsBlockDeviceConfigList),
    EbsOptimized: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "EbsConfiguration",
}) as any as S.Schema<EbsConfiguration>;
export type StringMap = { [key: string]: string | undefined };
export const StringMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface Configuration {
  Classification?: string;
  Configurations?: Configuration[];
  Properties?: { [key: string]: string | undefined };
}
export const Configuration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Classification: S.optional(S.String),
    Configurations: S.optional(
      S.suspend(() => ConfigurationList).annotate({
        identifier: "ConfigurationList",
      }),
    ),
    Properties: S.optional(StringMap),
  }),
).annotate({ identifier: "Configuration" }) as any as S.Schema<Configuration>;
export type ConfigurationList = Configuration[];
export const ConfigurationList = /*@__PURE__*/ S.Array(
  S.suspend((): S.Schema<Configuration> => Configuration).annotate({
    identifier: "Configuration",
  }),
) as any as S.Schema<ConfigurationList>;
export interface InstanceTypeConfig {
  InstanceType?: string;
  WeightedCapacity?: number;
  BidPrice?: string;
  BidPriceAsPercentageOfOnDemandPrice?: number;
  EbsConfiguration?: EbsConfiguration;
  Configurations?: Configuration[];
  CustomAmiId?: string;
  Priority?: number;
}
export const InstanceTypeConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstanceType: S.optional(S.String),
    WeightedCapacity: S.optional(S.Number),
    BidPrice: S.optional(S.String),
    BidPriceAsPercentageOfOnDemandPrice: S.optional(S.Number),
    EbsConfiguration: S.optional(EbsConfiguration),
    Configurations: S.optional(ConfigurationList),
    CustomAmiId: S.optional(S.String),
    Priority: S.optional(S.Number),
  }),
).annotate({
  identifier: "InstanceTypeConfig",
}) as any as S.Schema<InstanceTypeConfig>;
export type InstanceTypeConfigList = InstanceTypeConfig[];
export const InstanceTypeConfigList = /*@__PURE__*/ S.Array(InstanceTypeConfig);
export type SpotProvisioningTimeoutAction =
  | "SWITCH_TO_ON_DEMAND"
  | "TERMINATE_CLUSTER"
  | (string & {});
export const SpotProvisioningTimeoutAction = S.String;

export type SpotProvisioningAllocationStrategy =
  | "capacity-optimized"
  | "price-capacity-optimized"
  | "lowest-price"
  | "diversified"
  | "capacity-optimized-prioritized"
  | (string & {});
export const SpotProvisioningAllocationStrategy = S.String;

export interface SpotProvisioningSpecification {
  TimeoutDurationMinutes?: number;
  TimeoutAction?: SpotProvisioningTimeoutAction;
  BlockDurationMinutes?: number;
  AllocationStrategy?: SpotProvisioningAllocationStrategy;
}
export const SpotProvisioningSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TimeoutDurationMinutes: S.optional(S.Number),
    TimeoutAction: S.optional(SpotProvisioningTimeoutAction),
    BlockDurationMinutes: S.optional(S.Number),
    AllocationStrategy: S.optional(SpotProvisioningAllocationStrategy),
  }),
).annotate({
  identifier: "SpotProvisioningSpecification",
}) as any as S.Schema<SpotProvisioningSpecification>;
export type OnDemandProvisioningAllocationStrategy =
  | "lowest-price"
  | "prioritized"
  | (string & {});
export const OnDemandProvisioningAllocationStrategy = S.String;

export type OnDemandCapacityReservationUsageStrategy =
  | "use-capacity-reservations-first"
  | (string & {});
export const OnDemandCapacityReservationUsageStrategy = S.String;

export type OnDemandCapacityReservationPreference =
  | "open"
  | "none"
  | (string & {});
export const OnDemandCapacityReservationPreference = S.String;

export interface OnDemandCapacityReservationOptions {
  UsageStrategy?: OnDemandCapacityReservationUsageStrategy;
  CapacityReservationPreference?: OnDemandCapacityReservationPreference;
  CapacityReservationResourceGroupArn?: string;
}
export const OnDemandCapacityReservationOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UsageStrategy: S.optional(OnDemandCapacityReservationUsageStrategy),
    CapacityReservationPreference: S.optional(
      OnDemandCapacityReservationPreference,
    ),
    CapacityReservationResourceGroupArn: S.optional(S.String),
  }),
).annotate({
  identifier: "OnDemandCapacityReservationOptions",
}) as any as S.Schema<OnDemandCapacityReservationOptions>;
export interface OnDemandProvisioningSpecification {
  AllocationStrategy?: OnDemandProvisioningAllocationStrategy;
  CapacityReservationOptions?: OnDemandCapacityReservationOptions;
}
export const OnDemandProvisioningSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AllocationStrategy: S.optional(OnDemandProvisioningAllocationStrategy),
    CapacityReservationOptions: S.optional(OnDemandCapacityReservationOptions),
  }),
).annotate({
  identifier: "OnDemandProvisioningSpecification",
}) as any as S.Schema<OnDemandProvisioningSpecification>;
export interface InstanceFleetProvisioningSpecifications {
  SpotSpecification?: SpotProvisioningSpecification;
  OnDemandSpecification?: OnDemandProvisioningSpecification;
}
export const InstanceFleetProvisioningSpecifications = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      SpotSpecification: S.optional(SpotProvisioningSpecification),
      OnDemandSpecification: S.optional(OnDemandProvisioningSpecification),
    }),
).annotate({
  identifier: "InstanceFleetProvisioningSpecifications",
}) as any as S.Schema<InstanceFleetProvisioningSpecifications>;
export interface SpotResizingSpecification {
  TimeoutDurationMinutes?: number;
  AllocationStrategy?: SpotProvisioningAllocationStrategy;
}
export const SpotResizingSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TimeoutDurationMinutes: S.optional(S.Number),
    AllocationStrategy: S.optional(SpotProvisioningAllocationStrategy),
  }),
).annotate({
  identifier: "SpotResizingSpecification",
}) as any as S.Schema<SpotResizingSpecification>;
export interface OnDemandResizingSpecification {
  TimeoutDurationMinutes?: number;
  AllocationStrategy?: OnDemandProvisioningAllocationStrategy;
  CapacityReservationOptions?: OnDemandCapacityReservationOptions;
}
export const OnDemandResizingSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TimeoutDurationMinutes: S.optional(S.Number),
    AllocationStrategy: S.optional(OnDemandProvisioningAllocationStrategy),
    CapacityReservationOptions: S.optional(OnDemandCapacityReservationOptions),
  }),
).annotate({
  identifier: "OnDemandResizingSpecification",
}) as any as S.Schema<OnDemandResizingSpecification>;
export interface InstanceFleetResizingSpecifications {
  SpotResizeSpecification?: SpotResizingSpecification;
  OnDemandResizeSpecification?: OnDemandResizingSpecification;
}
export const InstanceFleetResizingSpecifications = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SpotResizeSpecification: S.optional(SpotResizingSpecification),
    OnDemandResizeSpecification: S.optional(OnDemandResizingSpecification),
  }),
).annotate({
  identifier: "InstanceFleetResizingSpecifications",
}) as any as S.Schema<InstanceFleetResizingSpecifications>;
export interface InstanceFleetConfig {
  Name?: string;
  InstanceFleetType?: InstanceFleetType;
  TargetOnDemandCapacity?: number;
  TargetSpotCapacity?: number;
  InstanceTypeConfigs?: InstanceTypeConfig[];
  LaunchSpecifications?: InstanceFleetProvisioningSpecifications;
  ResizeSpecifications?: InstanceFleetResizingSpecifications;
  Context?: string;
}
export const InstanceFleetConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    InstanceFleetType: S.optional(InstanceFleetType),
    TargetOnDemandCapacity: S.optional(S.Number),
    TargetSpotCapacity: S.optional(S.Number),
    InstanceTypeConfigs: S.optional(InstanceTypeConfigList),
    LaunchSpecifications: S.optional(InstanceFleetProvisioningSpecifications),
    ResizeSpecifications: S.optional(InstanceFleetResizingSpecifications),
    Context: S.optional(S.String),
  }),
).annotate({
  identifier: "InstanceFleetConfig",
}) as any as S.Schema<InstanceFleetConfig>;
export interface AddInstanceFleetInput {
  ClusterId?: string;
  InstanceFleet?: InstanceFleetConfig;
}
export const AddInstanceFleetInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterId: S.optional(S.String),
    InstanceFleet: S.optional(InstanceFleetConfig),
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
  identifier: "AddInstanceFleetInput",
}) as any as S.Schema<AddInstanceFleetInput>;
export type InstanceFleetId = string;
export type ArnType = string;
export interface AddInstanceFleetOutput {
  ClusterId?: string;
  InstanceFleetId?: string;
  ClusterArn?: string;
}
export const AddInstanceFleetOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterId: S.optional(S.String),
    InstanceFleetId: S.optional(S.String),
    ClusterArn: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "AddInstanceFleetOutput",
}) as any as S.Schema<AddInstanceFleetOutput>;
export type MarketType = "ON_DEMAND" | "SPOT" | (string & {});
export const MarketType = S.String;

export type InstanceRoleType = "MASTER" | "CORE" | "TASK" | (string & {});
export const InstanceRoleType = S.String;

export interface ScalingConstraints {
  MinCapacity?: number;
  MaxCapacity?: number;
}
export const ScalingConstraints = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MinCapacity: S.optional(S.Number),
    MaxCapacity: S.optional(S.Number),
  }),
).annotate({
  identifier: "ScalingConstraints",
}) as any as S.Schema<ScalingConstraints>;
export type AdjustmentType =
  | "CHANGE_IN_CAPACITY"
  | "PERCENT_CHANGE_IN_CAPACITY"
  | "EXACT_CAPACITY"
  | (string & {});
export const AdjustmentType = S.String;

export interface SimpleScalingPolicyConfiguration {
  AdjustmentType?: AdjustmentType;
  ScalingAdjustment?: number;
  CoolDown?: number;
}
export const SimpleScalingPolicyConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AdjustmentType: S.optional(AdjustmentType),
    ScalingAdjustment: S.optional(S.Number),
    CoolDown: S.optional(S.Number),
  }),
).annotate({
  identifier: "SimpleScalingPolicyConfiguration",
}) as any as S.Schema<SimpleScalingPolicyConfiguration>;
export interface ScalingAction {
  Market?: MarketType;
  SimpleScalingPolicyConfiguration?: SimpleScalingPolicyConfiguration;
}
export const ScalingAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Market: S.optional(MarketType),
    SimpleScalingPolicyConfiguration: S.optional(
      SimpleScalingPolicyConfiguration,
    ),
  }),
).annotate({ identifier: "ScalingAction" }) as any as S.Schema<ScalingAction>;
export type ComparisonOperator =
  | "GREATER_THAN_OR_EQUAL"
  | "GREATER_THAN"
  | "LESS_THAN"
  | "LESS_THAN_OR_EQUAL"
  | (string & {});
export const ComparisonOperator = S.String;

export type Statistic =
  | "SAMPLE_COUNT"
  | "AVERAGE"
  | "SUM"
  | "MINIMUM"
  | "MAXIMUM"
  | (string & {});
export const Statistic = S.String;

export type Unit =
  | "NONE"
  | "SECONDS"
  | "MICRO_SECONDS"
  | "MILLI_SECONDS"
  | "BYTES"
  | "KILO_BYTES"
  | "MEGA_BYTES"
  | "GIGA_BYTES"
  | "TERA_BYTES"
  | "BITS"
  | "KILO_BITS"
  | "MEGA_BITS"
  | "GIGA_BITS"
  | "TERA_BITS"
  | "PERCENT"
  | "COUNT"
  | "BYTES_PER_SECOND"
  | "KILO_BYTES_PER_SECOND"
  | "MEGA_BYTES_PER_SECOND"
  | "GIGA_BYTES_PER_SECOND"
  | "TERA_BYTES_PER_SECOND"
  | "BITS_PER_SECOND"
  | "KILO_BITS_PER_SECOND"
  | "MEGA_BITS_PER_SECOND"
  | "GIGA_BITS_PER_SECOND"
  | "TERA_BITS_PER_SECOND"
  | "COUNT_PER_SECOND"
  | (string & {});
export const Unit = S.String;

export interface MetricDimension {
  Key?: string;
  Value?: string;
}
export const MetricDimension = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({
  identifier: "MetricDimension",
}) as any as S.Schema<MetricDimension>;
export type MetricDimensionList = MetricDimension[];
export const MetricDimensionList = /*@__PURE__*/ S.Array(MetricDimension);
export interface CloudWatchAlarmDefinition {
  ComparisonOperator?: ComparisonOperator;
  EvaluationPeriods?: number;
  MetricName?: string;
  Namespace?: string;
  Period?: number;
  Statistic?: Statistic;
  Threshold?: number;
  Unit?: Unit;
  Dimensions?: MetricDimension[];
}
export const CloudWatchAlarmDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ComparisonOperator: S.optional(ComparisonOperator),
    EvaluationPeriods: S.optional(S.Number),
    MetricName: S.optional(S.String),
    Namespace: S.optional(S.String),
    Period: S.optional(S.Number),
    Statistic: S.optional(Statistic),
    Threshold: S.optional(S.Number),
    Unit: S.optional(Unit),
    Dimensions: S.optional(MetricDimensionList),
  }),
).annotate({
  identifier: "CloudWatchAlarmDefinition",
}) as any as S.Schema<CloudWatchAlarmDefinition>;
export interface ScalingTrigger {
  CloudWatchAlarmDefinition?: CloudWatchAlarmDefinition;
}
export const ScalingTrigger = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CloudWatchAlarmDefinition: S.optional(CloudWatchAlarmDefinition),
  }),
).annotate({ identifier: "ScalingTrigger" }) as any as S.Schema<ScalingTrigger>;
export interface ScalingRule {
  Name?: string;
  Description?: string;
  Action?: ScalingAction;
  Trigger?: ScalingTrigger;
}
export const ScalingRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    Action: S.optional(ScalingAction),
    Trigger: S.optional(ScalingTrigger),
  }),
).annotate({ identifier: "ScalingRule" }) as any as S.Schema<ScalingRule>;
export type ScalingRuleList = ScalingRule[];
export const ScalingRuleList = /*@__PURE__*/ S.Array(ScalingRule);
export interface AutoScalingPolicy {
  Constraints?: ScalingConstraints;
  Rules?: ScalingRule[];
}
export const AutoScalingPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Constraints: S.optional(ScalingConstraints),
    Rules: S.optional(ScalingRuleList),
  }),
).annotate({
  identifier: "AutoScalingPolicy",
}) as any as S.Schema<AutoScalingPolicy>;
export interface InstanceGroupConfig {
  Name?: string;
  Market?: MarketType;
  InstanceRole?: InstanceRoleType;
  BidPrice?: string;
  InstanceType?: string;
  InstanceCount?: number;
  Configurations?: Configuration[];
  EbsConfiguration?: EbsConfiguration;
  AutoScalingPolicy?: AutoScalingPolicy;
  CustomAmiId?: string;
}
export const InstanceGroupConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Market: S.optional(MarketType),
    InstanceRole: S.optional(InstanceRoleType),
    BidPrice: S.optional(S.String),
    InstanceType: S.optional(S.String),
    InstanceCount: S.optional(S.Number),
    Configurations: S.optional(ConfigurationList),
    EbsConfiguration: S.optional(EbsConfiguration),
    AutoScalingPolicy: S.optional(AutoScalingPolicy),
    CustomAmiId: S.optional(S.String),
  }),
).annotate({
  identifier: "InstanceGroupConfig",
}) as any as S.Schema<InstanceGroupConfig>;
export type InstanceGroupConfigList = InstanceGroupConfig[];
export const InstanceGroupConfigList =
  /*@__PURE__*/ S.Array(InstanceGroupConfig);
export interface AddInstanceGroupsInput {
  InstanceGroups?: InstanceGroupConfig[];
  JobFlowId?: string;
}
export const AddInstanceGroupsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstanceGroups: S.optional(InstanceGroupConfigList),
    JobFlowId: S.optional(S.String),
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
  identifier: "AddInstanceGroupsInput",
}) as any as S.Schema<AddInstanceGroupsInput>;
export type InstanceGroupIdsList = string[];
export const InstanceGroupIdsList = /*@__PURE__*/ S.Array(S.String);
export interface AddInstanceGroupsOutput {
  JobFlowId?: string;
  InstanceGroupIds?: string[];
  ClusterArn?: string;
}
export const AddInstanceGroupsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobFlowId: S.optional(S.String),
    InstanceGroupIds: S.optional(InstanceGroupIdsList),
    ClusterArn: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "AddInstanceGroupsOutput",
}) as any as S.Schema<AddInstanceGroupsOutput>;
export type ActionOnFailure =
  | "TERMINATE_JOB_FLOW"
  | "TERMINATE_CLUSTER"
  | "CANCEL_AND_WAIT"
  | "CONTINUE"
  | (string & {});
export const ActionOnFailure = S.String;

export type XmlString = string;
export interface KeyValue {
  Key?: string;
  Value?: string;
}
export const KeyValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({ identifier: "KeyValue" }) as any as S.Schema<KeyValue>;
export type KeyValueList = KeyValue[];
export const KeyValueList = /*@__PURE__*/ S.Array(KeyValue);
export type XmlStringList = string[];
export const XmlStringList = /*@__PURE__*/ S.Array(S.String);
export interface HadoopJarStepConfig {
  Properties?: KeyValue[];
  Jar?: string;
  MainClass?: string;
  Args?: string[];
}
export const HadoopJarStepConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Properties: S.optional(KeyValueList),
    Jar: S.optional(S.String),
    MainClass: S.optional(S.String),
    Args: S.optional(XmlStringList),
  }),
).annotate({
  identifier: "HadoopJarStepConfig",
}) as any as S.Schema<HadoopJarStepConfig>;
export interface S3MonitoringConfiguration {
  LogUri?: string;
  EncryptionKeyArn?: string;
}
export const S3MonitoringConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LogUri: S.optional(S.String),
    EncryptionKeyArn: S.optional(S.String),
  }),
).annotate({
  identifier: "S3MonitoringConfiguration",
}) as any as S.Schema<S3MonitoringConfiguration>;
export interface StepMonitoringConfiguration {
  S3MonitoringConfiguration?: S3MonitoringConfiguration;
}
export const StepMonitoringConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    S3MonitoringConfiguration: S.optional(S3MonitoringConfiguration),
  }),
).annotate({
  identifier: "StepMonitoringConfiguration",
}) as any as S.Schema<StepMonitoringConfiguration>;
export interface StepConfig {
  Name?: string;
  ActionOnFailure?: ActionOnFailure;
  HadoopJarStep?: HadoopJarStepConfig;
  StepMonitoringConfiguration?: StepMonitoringConfiguration;
}
export const StepConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    ActionOnFailure: S.optional(ActionOnFailure),
    HadoopJarStep: S.optional(HadoopJarStepConfig),
    StepMonitoringConfiguration: S.optional(StepMonitoringConfiguration),
  }),
).annotate({ identifier: "StepConfig" }) as any as S.Schema<StepConfig>;
export type StepConfigList = StepConfig[];
export const StepConfigList = /*@__PURE__*/ S.Array(StepConfig);
export interface AddJobFlowStepsInput {
  JobFlowId?: string;
  Steps?: StepConfig[];
  ExecutionRoleArn?: string;
}
export const AddJobFlowStepsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobFlowId: S.optional(S.String),
    Steps: S.optional(StepConfigList),
    ExecutionRoleArn: S.optional(S.String),
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
  identifier: "AddJobFlowStepsInput",
}) as any as S.Schema<AddJobFlowStepsInput>;
export type StepIdsList = string[];
export const StepIdsList = /*@__PURE__*/ S.Array(S.String);
export interface AddJobFlowStepsOutput {
  StepIds?: string[];
}
export const AddJobFlowStepsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ StepIds: S.optional(StepIdsList) }).pipe(ns),
).annotate({
  identifier: "AddJobFlowStepsOutput",
}) as any as S.Schema<AddJobFlowStepsOutput>;
export type ResourceId = string;
export interface Tag {
  Key?: string;
  Value?: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = /*@__PURE__*/ S.Array(Tag);
export type ClusterId = string;
export interface AddTagsInput {
  ResourceId?: string;
  Tags?: Tag[];
  ClusterId?: string;
}
export const AddTagsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceId: S.optional(S.String),
    Tags: S.optional(TagList),
    ClusterId: S.optional(S.String),
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
).annotate({ identifier: "AddTagsInput" }) as any as S.Schema<AddTagsInput>;
export interface AddTagsOutput {}
export const AddTagsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({ identifier: "AddTagsOutput" }) as any as S.Schema<AddTagsOutput>;
export type StepCancellationOption =
  | "SEND_INTERRUPT"
  | "TERMINATE_PROCESS"
  | (string & {});
export const StepCancellationOption = S.String;

export interface CancelStepsInput {
  ClusterId?: string;
  StepIds?: string[];
  StepCancellationOption?: StepCancellationOption;
}
export const CancelStepsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterId: S.optional(S.String),
    StepIds: S.optional(StepIdsList),
    StepCancellationOption: S.optional(StepCancellationOption),
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
  identifier: "CancelStepsInput",
}) as any as S.Schema<CancelStepsInput>;
export type StepId = string;
export type CancelStepsRequestStatus = "SUBMITTED" | "FAILED" | (string & {});
export const CancelStepsRequestStatus = S.String;

export interface CancelStepsInfo {
  StepId?: string;
  Status?: CancelStepsRequestStatus;
  Reason?: string;
}
export const CancelStepsInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StepId: S.optional(S.String),
    Status: S.optional(CancelStepsRequestStatus),
    Reason: S.optional(S.String),
  }),
).annotate({
  identifier: "CancelStepsInfo",
}) as any as S.Schema<CancelStepsInfo>;
export type CancelStepsInfoList = CancelStepsInfo[];
export const CancelStepsInfoList = /*@__PURE__*/ S.Array(CancelStepsInfo);
export interface CancelStepsOutput {
  CancelStepsInfoList?: CancelStepsInfo[];
}
export const CancelStepsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CancelStepsInfoList: S.optional(CancelStepsInfoList) }).pipe(ns),
).annotate({
  identifier: "CancelStepsOutput",
}) as any as S.Schema<CancelStepsOutput>;
export interface EMRContainersConfig {
  JobRunId?: string;
}
export const EMRContainersConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobRunId: S.optional(S.String) }),
).annotate({
  identifier: "EMRContainersConfig",
}) as any as S.Schema<EMRContainersConfig>;
export type ProfilerType = "SHS" | "TEZUI" | "YTS" | (string & {});
export const ProfilerType = S.String;

export interface CreatePersistentAppUIInput {
  TargetResourceArn?: string;
  EMRContainersConfig?: EMRContainersConfig;
  Tags?: Tag[];
  XReferer?: string;
  ProfilerType?: ProfilerType;
}
export const CreatePersistentAppUIInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TargetResourceArn: S.optional(S.String),
    EMRContainersConfig: S.optional(EMRContainersConfig),
    Tags: S.optional(TagList),
    XReferer: S.optional(S.String),
    ProfilerType: S.optional(ProfilerType),
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
  identifier: "CreatePersistentAppUIInput",
}) as any as S.Schema<CreatePersistentAppUIInput>;
export interface CreatePersistentAppUIOutput {
  PersistentAppUIId?: string;
  RuntimeRoleEnabledCluster?: boolean;
}
export const CreatePersistentAppUIOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PersistentAppUIId: S.optional(S.String),
    RuntimeRoleEnabledCluster: S.optional(S.Boolean),
  }).pipe(ns),
).annotate({
  identifier: "CreatePersistentAppUIOutput",
}) as any as S.Schema<CreatePersistentAppUIOutput>;
export interface CreateSecurityConfigurationInput {
  Name?: string;
  SecurityConfiguration?: string;
}
export const CreateSecurityConfigurationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    SecurityConfiguration: S.optional(S.String),
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
  identifier: "CreateSecurityConfigurationInput",
}) as any as S.Schema<CreateSecurityConfigurationInput>;
export interface CreateSecurityConfigurationOutput {
  Name: string;
  CreationDateTime: Date;
}
export const CreateSecurityConfigurationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    CreationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }).pipe(ns),
).annotate({
  identifier: "CreateSecurityConfigurationOutput",
}) as any as S.Schema<CreateSecurityConfigurationOutput>;
export type AuthMode = "SSO" | "IAM" | (string & {});
export const AuthMode = S.String;

export type SubnetIdList = string[];
export const SubnetIdList = /*@__PURE__*/ S.Array(S.String);
export type IdcUserAssignment = "REQUIRED" | "OPTIONAL" | (string & {});
export const IdcUserAssignment = S.String;

export interface CreateStudioInput {
  Name?: string;
  Description?: string;
  AuthMode?: AuthMode;
  VpcId?: string;
  SubnetIds?: string[];
  ServiceRole?: string;
  UserRole?: string;
  WorkspaceSecurityGroupId?: string;
  EngineSecurityGroupId?: string;
  DefaultS3Location?: string;
  IdpAuthUrl?: string;
  IdpRelayStateParameterName?: string;
  Tags?: Tag[];
  TrustedIdentityPropagationEnabled?: boolean;
  IdcUserAssignment?: IdcUserAssignment;
  IdcInstanceArn?: string;
  EncryptionKeyArn?: string;
}
export const CreateStudioInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    AuthMode: S.optional(AuthMode),
    VpcId: S.optional(S.String),
    SubnetIds: S.optional(SubnetIdList),
    ServiceRole: S.optional(S.String),
    UserRole: S.optional(S.String),
    WorkspaceSecurityGroupId: S.optional(S.String),
    EngineSecurityGroupId: S.optional(S.String),
    DefaultS3Location: S.optional(S.String),
    IdpAuthUrl: S.optional(S.String),
    IdpRelayStateParameterName: S.optional(S.String),
    Tags: S.optional(TagList),
    TrustedIdentityPropagationEnabled: S.optional(S.Boolean),
    IdcUserAssignment: S.optional(IdcUserAssignment),
    IdcInstanceArn: S.optional(S.String),
    EncryptionKeyArn: S.optional(S.String),
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
  identifier: "CreateStudioInput",
}) as any as S.Schema<CreateStudioInput>;
export interface CreateStudioOutput {
  StudioId?: string;
  Url?: string;
}
export const CreateStudioOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ StudioId: S.optional(S.String), Url: S.optional(S.String) }).pipe(
    ns,
  ),
).annotate({
  identifier: "CreateStudioOutput",
}) as any as S.Schema<CreateStudioOutput>;
export type IdentityType = "USER" | "GROUP" | (string & {});
export const IdentityType = S.String;

export interface CreateStudioSessionMappingInput {
  StudioId?: string;
  IdentityId?: string;
  IdentityName?: string;
  IdentityType?: IdentityType;
  SessionPolicyArn?: string;
}
export const CreateStudioSessionMappingInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StudioId: S.optional(S.String),
    IdentityId: S.optional(S.String),
    IdentityName: S.optional(S.String),
    IdentityType: S.optional(IdentityType),
    SessionPolicyArn: S.optional(S.String),
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
  identifier: "CreateStudioSessionMappingInput",
}) as any as S.Schema<CreateStudioSessionMappingInput>;
export interface CreateStudioSessionMappingResponse {}
export const CreateStudioSessionMappingResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "CreateStudioSessionMappingResponse",
}) as any as S.Schema<CreateStudioSessionMappingResponse>;
export interface DeleteSecurityConfigurationInput {
  Name?: string;
}
export const DeleteSecurityConfigurationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }).pipe(
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
  identifier: "DeleteSecurityConfigurationInput",
}) as any as S.Schema<DeleteSecurityConfigurationInput>;
export interface DeleteSecurityConfigurationOutput {}
export const DeleteSecurityConfigurationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteSecurityConfigurationOutput",
}) as any as S.Schema<DeleteSecurityConfigurationOutput>;
export interface DeleteStudioInput {
  StudioId?: string;
}
export const DeleteStudioInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ StudioId: S.optional(S.String) }).pipe(
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
  identifier: "DeleteStudioInput",
}) as any as S.Schema<DeleteStudioInput>;
export interface DeleteStudioResponse {}
export const DeleteStudioResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteStudioResponse",
}) as any as S.Schema<DeleteStudioResponse>;
export interface DeleteStudioSessionMappingInput {
  StudioId?: string;
  IdentityId?: string;
  IdentityName?: string;
  IdentityType?: IdentityType;
}
export const DeleteStudioSessionMappingInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StudioId: S.optional(S.String),
    IdentityId: S.optional(S.String),
    IdentityName: S.optional(S.String),
    IdentityType: S.optional(IdentityType),
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
  identifier: "DeleteStudioSessionMappingInput",
}) as any as S.Schema<DeleteStudioSessionMappingInput>;
export interface DeleteStudioSessionMappingResponse {}
export const DeleteStudioSessionMappingResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteStudioSessionMappingResponse",
}) as any as S.Schema<DeleteStudioSessionMappingResponse>;
export interface DescribeClusterInput {
  ClusterId?: string;
}
export const DescribeClusterInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ClusterId: S.optional(S.String) }).pipe(
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
  identifier: "DescribeClusterInput",
}) as any as S.Schema<DescribeClusterInput>;
export type ClusterState =
  | "STARTING"
  | "BOOTSTRAPPING"
  | "RUNNING"
  | "WAITING"
  | "TERMINATING"
  | "TERMINATED"
  | "TERMINATED_WITH_ERRORS"
  | (string & {});
export const ClusterState = S.String;

export type ClusterStateChangeReasonCode =
  | "INTERNAL_ERROR"
  | "VALIDATION_ERROR"
  | "INSTANCE_FAILURE"
  | "INSTANCE_FLEET_TIMEOUT"
  | "BOOTSTRAP_FAILURE"
  | "USER_REQUEST"
  | "STEP_FAILURE"
  | "ALL_STEPS_COMPLETED"
  | (string & {});
export const ClusterStateChangeReasonCode = S.String;

export interface ClusterStateChangeReason {
  Code?: ClusterStateChangeReasonCode;
  Message?: string;
}
export const ClusterStateChangeReason = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Code: S.optional(ClusterStateChangeReasonCode),
    Message: S.optional(S.String),
  }),
).annotate({
  identifier: "ClusterStateChangeReason",
}) as any as S.Schema<ClusterStateChangeReason>;
export interface ClusterTimeline {
  CreationDateTime?: Date;
  ReadyDateTime?: Date;
  EndDateTime?: Date;
}
export const ClusterTimeline = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ReadyDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "ClusterTimeline",
}) as any as S.Schema<ClusterTimeline>;
export type ErrorData = { [key: string]: string | undefined }[];
export const ErrorData = /*@__PURE__*/ S.Array(StringMap);
export interface ErrorDetail {
  ErrorCode?: string;
  ErrorData?: { [key: string]: string | undefined }[];
  ErrorMessage?: string;
}
export const ErrorDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ErrorCode: S.optional(S.String),
    ErrorData: S.optional(ErrorData),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({ identifier: "ErrorDetail" }) as any as S.Schema<ErrorDetail>;
export type ErrorDetailList = ErrorDetail[];
export const ErrorDetailList = /*@__PURE__*/ S.Array(ErrorDetail);
export interface ClusterStatus {
  State?: ClusterState;
  StateChangeReason?: ClusterStateChangeReason;
  Timeline?: ClusterTimeline;
  ErrorDetails?: ErrorDetail[];
}
export const ClusterStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    State: S.optional(ClusterState),
    StateChangeReason: S.optional(ClusterStateChangeReason),
    Timeline: S.optional(ClusterTimeline),
    ErrorDetails: S.optional(ErrorDetailList),
  }),
).annotate({ identifier: "ClusterStatus" }) as any as S.Schema<ClusterStatus>;
export type XmlStringMaxLen256List = string[];
export const XmlStringMaxLen256List = /*@__PURE__*/ S.Array(S.String);
export type StringList = string[];
export const StringList = /*@__PURE__*/ S.Array(S.String);
export interface Ec2InstanceAttributes {
  Ec2KeyName?: string;
  Ec2SubnetId?: string;
  RequestedEc2SubnetIds?: string[];
  Ec2AvailabilityZone?: string;
  RequestedEc2AvailabilityZones?: string[];
  IamInstanceProfile?: string;
  EmrManagedMasterSecurityGroup?: string;
  EmrManagedSlaveSecurityGroup?: string;
  ServiceAccessSecurityGroup?: string;
  AdditionalMasterSecurityGroups?: string[];
  AdditionalSlaveSecurityGroups?: string[];
}
export const Ec2InstanceAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Ec2KeyName: S.optional(S.String),
    Ec2SubnetId: S.optional(S.String),
    RequestedEc2SubnetIds: S.optional(XmlStringMaxLen256List),
    Ec2AvailabilityZone: S.optional(S.String),
    RequestedEc2AvailabilityZones: S.optional(XmlStringMaxLen256List),
    IamInstanceProfile: S.optional(S.String),
    EmrManagedMasterSecurityGroup: S.optional(S.String),
    EmrManagedSlaveSecurityGroup: S.optional(S.String),
    ServiceAccessSecurityGroup: S.optional(S.String),
    AdditionalMasterSecurityGroups: S.optional(StringList),
    AdditionalSlaveSecurityGroups: S.optional(StringList),
  }),
).annotate({
  identifier: "Ec2InstanceAttributes",
}) as any as S.Schema<Ec2InstanceAttributes>;
export type InstanceCollectionType =
  | "INSTANCE_FLEET"
  | "INSTANCE_GROUP"
  | (string & {});
export const InstanceCollectionType = S.String;

export interface Application {
  Name?: string;
  Version?: string;
  Args?: string[];
  AdditionalInfo?: { [key: string]: string | undefined };
}
export const Application = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Version: S.optional(S.String),
    Args: S.optional(StringList),
    AdditionalInfo: S.optional(StringMap),
  }),
).annotate({ identifier: "Application" }) as any as S.Schema<Application>;
export type ApplicationList = Application[];
export const ApplicationList = /*@__PURE__*/ S.Array(Application);
export type ScaleDownBehavior =
  | "TERMINATE_AT_INSTANCE_HOUR"
  | "TERMINATE_AT_TASK_COMPLETION"
  | (string & {});
export const ScaleDownBehavior = S.String;

export type RepoUpgradeOnBoot = "SECURITY" | "NONE" | (string & {});
export const RepoUpgradeOnBoot = S.String;

export interface KerberosAttributes {
  Realm?: string;
  KdcAdminPassword?: string | redacted.Redacted<string>;
  CrossRealmTrustPrincipalPassword?: string | redacted.Redacted<string>;
  ADDomainJoinUser?: string;
  ADDomainJoinPassword?: string | redacted.Redacted<string>;
}
export const KerberosAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Realm: S.optional(S.String),
    KdcAdminPassword: S.optional(SensitiveString),
    CrossRealmTrustPrincipalPassword: S.optional(SensitiveString),
    ADDomainJoinUser: S.optional(S.String),
    ADDomainJoinPassword: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "KerberosAttributes",
}) as any as S.Schema<KerberosAttributes>;
export type OptionalArnType = string;
export type PlacementGroupStrategy =
  | "SPREAD"
  | "PARTITION"
  | "CLUSTER"
  | "NONE"
  | (string & {});
export const PlacementGroupStrategy = S.String;

export interface PlacementGroupConfig {
  InstanceRole?: InstanceRoleType;
  PlacementStrategy?: PlacementGroupStrategy;
}
export const PlacementGroupConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstanceRole: S.optional(InstanceRoleType),
    PlacementStrategy: S.optional(PlacementGroupStrategy),
  }),
).annotate({
  identifier: "PlacementGroupConfig",
}) as any as S.Schema<PlacementGroupConfig>;
export type PlacementGroupConfigList = PlacementGroupConfig[];
export const PlacementGroupConfigList =
  /*@__PURE__*/ S.Array(PlacementGroupConfig);
export type LogTypesMap = { [key: string]: string[] | undefined };
export const LogTypesMap = /*@__PURE__*/ S.Record(
  S.String,
  XmlStringList.pipe(S.optional),
);
export interface CloudWatchLogConfiguration {
  Enabled?: boolean;
  LogGroupName?: string;
  LogStreamNamePrefix?: string;
  EncryptionKeyArn?: string;
  LogTypes?: { [key: string]: string[] | undefined };
}
export const CloudWatchLogConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Enabled: S.optional(S.Boolean),
    LogGroupName: S.optional(S.String),
    LogStreamNamePrefix: S.optional(S.String),
    EncryptionKeyArn: S.optional(S.String),
    LogTypes: S.optional(LogTypesMap),
  }),
).annotate({
  identifier: "CloudWatchLogConfiguration",
}) as any as S.Schema<CloudWatchLogConfiguration>;
export type LogType =
  | "system-logs"
  | "application-logs"
  | "persistent-ui-logs"
  | (string & {});
export const LogType = S.String;

export type LogUploadPolicyValue =
  | "emr-managed"
  | "on-customer-s3only"
  | "disabled"
  | (string & {});
export const LogUploadPolicyValue = S.String;

export type LogTypeMap = { [key in LogType]?: LogUploadPolicyValue };
export const LogTypeMap = /*@__PURE__*/ S.Record(
  LogType,
  LogUploadPolicyValue.pipe(S.optional),
);
export interface S3LoggingConfiguration {
  LogTypeUploadPolicy?: { [key: string]: LogUploadPolicyValue | undefined };
}
export const S3LoggingConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LogTypeUploadPolicy: S.optional(LogTypeMap) }),
).annotate({
  identifier: "S3LoggingConfiguration",
}) as any as S.Schema<S3LoggingConfiguration>;
export interface MonitoringConfiguration {
  CloudWatchLogConfiguration?: CloudWatchLogConfiguration;
  S3LoggingConfiguration?: S3LoggingConfiguration;
}
export const MonitoringConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CloudWatchLogConfiguration: S.optional(CloudWatchLogConfiguration),
    S3LoggingConfiguration: S.optional(S3LoggingConfiguration),
  }),
).annotate({
  identifier: "MonitoringConfiguration",
}) as any as S.Schema<MonitoringConfiguration>;
export interface Cluster {
  Id?: string;
  Name?: string;
  Status?: ClusterStatus;
  Ec2InstanceAttributes?: Ec2InstanceAttributes;
  InstanceCollectionType?: InstanceCollectionType;
  LogUri?: string;
  LogEncryptionKmsKeyId?: string;
  RequestedAmiVersion?: string;
  RunningAmiVersion?: string;
  ReleaseLabel?: string;
  AutoTerminate?: boolean;
  TerminationProtected?: boolean;
  UnhealthyNodeReplacement?: boolean;
  VisibleToAllUsers?: boolean;
  Applications?: Application[];
  Tags?: Tag[];
  ServiceRole?: string;
  NormalizedInstanceHours?: number;
  MasterPublicDnsName?: string;
  Configurations?: Configuration[];
  SecurityConfiguration?: string;
  AutoScalingRole?: string;
  ScaleDownBehavior?: ScaleDownBehavior;
  CustomAmiId?: string;
  EbsRootVolumeSize?: number;
  RepoUpgradeOnBoot?: RepoUpgradeOnBoot;
  KerberosAttributes?: KerberosAttributes;
  ClusterArn?: string;
  OutpostArn?: string;
  StepConcurrencyLevel?: number;
  PlacementGroups?: PlacementGroupConfig[];
  OSReleaseLabel?: string;
  EbsRootVolumeIops?: number;
  EbsRootVolumeThroughput?: number;
  ExtendedSupport?: boolean;
  MonitoringConfiguration?: MonitoringConfiguration;
  SessionEnabled?: boolean;
}
export const Cluster = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Status: S.optional(ClusterStatus),
    Ec2InstanceAttributes: S.optional(Ec2InstanceAttributes),
    InstanceCollectionType: S.optional(InstanceCollectionType),
    LogUri: S.optional(S.String),
    LogEncryptionKmsKeyId: S.optional(S.String),
    RequestedAmiVersion: S.optional(S.String),
    RunningAmiVersion: S.optional(S.String),
    ReleaseLabel: S.optional(S.String),
    AutoTerminate: S.optional(S.Boolean),
    TerminationProtected: S.optional(S.Boolean),
    UnhealthyNodeReplacement: S.optional(S.Boolean),
    VisibleToAllUsers: S.optional(S.Boolean),
    Applications: S.optional(ApplicationList),
    Tags: S.optional(TagList),
    ServiceRole: S.optional(S.String),
    NormalizedInstanceHours: S.optional(S.Number),
    MasterPublicDnsName: S.optional(S.String),
    Configurations: S.optional(ConfigurationList),
    SecurityConfiguration: S.optional(S.String),
    AutoScalingRole: S.optional(S.String),
    ScaleDownBehavior: S.optional(ScaleDownBehavior),
    CustomAmiId: S.optional(S.String),
    EbsRootVolumeSize: S.optional(S.Number),
    RepoUpgradeOnBoot: S.optional(RepoUpgradeOnBoot),
    KerberosAttributes: S.optional(KerberosAttributes),
    ClusterArn: S.optional(S.String),
    OutpostArn: S.optional(S.String),
    StepConcurrencyLevel: S.optional(S.Number),
    PlacementGroups: S.optional(PlacementGroupConfigList),
    OSReleaseLabel: S.optional(S.String),
    EbsRootVolumeIops: S.optional(S.Number),
    EbsRootVolumeThroughput: S.optional(S.Number),
    ExtendedSupport: S.optional(S.Boolean),
    MonitoringConfiguration: S.optional(MonitoringConfiguration),
    SessionEnabled: S.optional(S.Boolean),
  }),
).annotate({ identifier: "Cluster" }) as any as S.Schema<Cluster>;
export interface DescribeClusterOutput {
  Cluster?: Cluster & {
    KerberosAttributes: KerberosAttributes & {
      Realm: XmlStringMaxLen256;
      KdcAdminPassword: XmlStringMaxLen256;
    };
    PlacementGroups: (PlacementGroupConfig & {
      InstanceRole: InstanceRoleType;
    })[];
    MonitoringConfiguration: MonitoringConfiguration & {
      CloudWatchLogConfiguration: CloudWatchLogConfiguration & {
        Enabled: boolean;
      };
    };
  };
}
export const DescribeClusterOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Cluster: S.optional(Cluster) }).pipe(ns),
).annotate({
  identifier: "DescribeClusterOutput",
}) as any as S.Schema<DescribeClusterOutput>;
export type JobFlowExecutionState =
  | "STARTING"
  | "BOOTSTRAPPING"
  | "RUNNING"
  | "WAITING"
  | "SHUTTING_DOWN"
  | "TERMINATED"
  | "COMPLETED"
  | "FAILED"
  | (string & {});
export const JobFlowExecutionState = S.String;

export type JobFlowExecutionStateList = JobFlowExecutionState[];
export const JobFlowExecutionStateList = /*@__PURE__*/ S.Array(
  JobFlowExecutionState,
);
export interface DescribeJobFlowsInput {
  CreatedAfter?: Date;
  CreatedBefore?: Date;
  JobFlowIds?: string[];
  JobFlowStates?: JobFlowExecutionState[];
}
export const DescribeJobFlowsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreatedAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CreatedBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    JobFlowIds: S.optional(XmlStringList),
    JobFlowStates: S.optional(JobFlowExecutionStateList),
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
  identifier: "DescribeJobFlowsInput",
}) as any as S.Schema<DescribeJobFlowsInput>;
export interface JobFlowExecutionStatusDetail {
  State?: JobFlowExecutionState;
  CreationDateTime?: Date;
  StartDateTime?: Date;
  ReadyDateTime?: Date;
  EndDateTime?: Date;
  LastStateChangeReason?: string;
}
export const JobFlowExecutionStatusDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    State: S.optional(JobFlowExecutionState),
    CreationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    StartDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ReadyDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastStateChangeReason: S.optional(S.String),
  }),
).annotate({
  identifier: "JobFlowExecutionStatusDetail",
}) as any as S.Schema<JobFlowExecutionStatusDetail>;
export type InstanceGroupState =
  | "PROVISIONING"
  | "BOOTSTRAPPING"
  | "RUNNING"
  | "RECONFIGURING"
  | "RESIZING"
  | "SUSPENDED"
  | "TERMINATING"
  | "TERMINATED"
  | "ARRESTED"
  | "SHUTTING_DOWN"
  | "ENDED"
  | (string & {});
export const InstanceGroupState = S.String;

export interface InstanceGroupDetail {
  InstanceGroupId?: string;
  Name?: string;
  Market?: MarketType;
  InstanceRole?: InstanceRoleType;
  BidPrice?: string;
  InstanceType?: string;
  InstanceRequestCount?: number;
  InstanceRunningCount?: number;
  State?: InstanceGroupState;
  LastStateChangeReason?: string;
  CreationDateTime?: Date;
  StartDateTime?: Date;
  ReadyDateTime?: Date;
  EndDateTime?: Date;
  CustomAmiId?: string;
}
export const InstanceGroupDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstanceGroupId: S.optional(S.String),
    Name: S.optional(S.String),
    Market: S.optional(MarketType),
    InstanceRole: S.optional(InstanceRoleType),
    BidPrice: S.optional(S.String),
    InstanceType: S.optional(S.String),
    InstanceRequestCount: S.optional(S.Number),
    InstanceRunningCount: S.optional(S.Number),
    State: S.optional(InstanceGroupState),
    LastStateChangeReason: S.optional(S.String),
    CreationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    StartDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ReadyDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CustomAmiId: S.optional(S.String),
  }),
).annotate({
  identifier: "InstanceGroupDetail",
}) as any as S.Schema<InstanceGroupDetail>;
export type InstanceGroupDetailList = InstanceGroupDetail[];
export const InstanceGroupDetailList =
  /*@__PURE__*/ S.Array(InstanceGroupDetail);
export interface PlacementType {
  AvailabilityZone?: string;
  AvailabilityZones?: string[];
}
export const PlacementType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AvailabilityZone: S.optional(S.String),
    AvailabilityZones: S.optional(XmlStringMaxLen256List),
  }),
).annotate({ identifier: "PlacementType" }) as any as S.Schema<PlacementType>;
export interface JobFlowInstancesDetail {
  MasterInstanceType?: string;
  MasterPublicDnsName?: string;
  MasterInstanceId?: string;
  SlaveInstanceType?: string;
  InstanceCount?: number;
  InstanceGroups?: InstanceGroupDetail[];
  NormalizedInstanceHours?: number;
  Ec2KeyName?: string;
  Ec2SubnetId?: string;
  Placement?: PlacementType;
  KeepJobFlowAliveWhenNoSteps?: boolean;
  TerminationProtected?: boolean;
  UnhealthyNodeReplacement?: boolean;
  HadoopVersion?: string;
}
export const JobFlowInstancesDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MasterInstanceType: S.optional(S.String),
    MasterPublicDnsName: S.optional(S.String),
    MasterInstanceId: S.optional(S.String),
    SlaveInstanceType: S.optional(S.String),
    InstanceCount: S.optional(S.Number),
    InstanceGroups: S.optional(InstanceGroupDetailList),
    NormalizedInstanceHours: S.optional(S.Number),
    Ec2KeyName: S.optional(S.String),
    Ec2SubnetId: S.optional(S.String),
    Placement: S.optional(PlacementType),
    KeepJobFlowAliveWhenNoSteps: S.optional(S.Boolean),
    TerminationProtected: S.optional(S.Boolean),
    UnhealthyNodeReplacement: S.optional(S.Boolean),
    HadoopVersion: S.optional(S.String),
  }),
).annotate({
  identifier: "JobFlowInstancesDetail",
}) as any as S.Schema<JobFlowInstancesDetail>;
export type StepExecutionState =
  | "PENDING"
  | "RUNNING"
  | "CONTINUE"
  | "COMPLETED"
  | "CANCELLED"
  | "FAILED"
  | "INTERRUPTED"
  | (string & {});
export const StepExecutionState = S.String;

export interface StepExecutionStatusDetail {
  State?: StepExecutionState;
  CreationDateTime?: Date;
  StartDateTime?: Date;
  EndDateTime?: Date;
  LastStateChangeReason?: string;
}
export const StepExecutionStatusDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    State: S.optional(StepExecutionState),
    CreationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    StartDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastStateChangeReason: S.optional(S.String),
  }),
).annotate({
  identifier: "StepExecutionStatusDetail",
}) as any as S.Schema<StepExecutionStatusDetail>;
export interface StepDetail {
  StepConfig?: StepConfig;
  ExecutionStatusDetail?: StepExecutionStatusDetail;
}
export const StepDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StepConfig: S.optional(StepConfig),
    ExecutionStatusDetail: S.optional(StepExecutionStatusDetail),
  }),
).annotate({ identifier: "StepDetail" }) as any as S.Schema<StepDetail>;
export type StepDetailList = StepDetail[];
export const StepDetailList = /*@__PURE__*/ S.Array(StepDetail);
export interface ScriptBootstrapActionConfig {
  Path?: string;
  Args?: string[];
}
export const ScriptBootstrapActionConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Path: S.optional(S.String), Args: S.optional(XmlStringList) }),
).annotate({
  identifier: "ScriptBootstrapActionConfig",
}) as any as S.Schema<ScriptBootstrapActionConfig>;
export interface BootstrapActionConfig {
  Name?: string;
  ScriptBootstrapAction?: ScriptBootstrapActionConfig;
}
export const BootstrapActionConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    ScriptBootstrapAction: S.optional(ScriptBootstrapActionConfig),
  }),
).annotate({
  identifier: "BootstrapActionConfig",
}) as any as S.Schema<BootstrapActionConfig>;
export interface BootstrapActionDetail {
  BootstrapActionConfig?: BootstrapActionConfig;
}
export const BootstrapActionDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BootstrapActionConfig: S.optional(BootstrapActionConfig) }),
).annotate({
  identifier: "BootstrapActionDetail",
}) as any as S.Schema<BootstrapActionDetail>;
export type BootstrapActionDetailList = BootstrapActionDetail[];
export const BootstrapActionDetailList = /*@__PURE__*/ S.Array(
  BootstrapActionDetail,
);
export type SupportedProductsList = string[];
export const SupportedProductsList = /*@__PURE__*/ S.Array(S.String);
export interface JobFlowDetail {
  JobFlowId?: string;
  Name?: string;
  LogUri?: string;
  LogEncryptionKmsKeyId?: string;
  AmiVersion?: string;
  ExecutionStatusDetail?: JobFlowExecutionStatusDetail;
  Instances?: JobFlowInstancesDetail;
  Steps?: StepDetail[];
  BootstrapActions?: BootstrapActionDetail[];
  SupportedProducts?: string[];
  VisibleToAllUsers?: boolean;
  JobFlowRole?: string;
  ServiceRole?: string;
  AutoScalingRole?: string;
  ScaleDownBehavior?: ScaleDownBehavior;
}
export const JobFlowDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobFlowId: S.optional(S.String),
    Name: S.optional(S.String),
    LogUri: S.optional(S.String),
    LogEncryptionKmsKeyId: S.optional(S.String),
    AmiVersion: S.optional(S.String),
    ExecutionStatusDetail: S.optional(JobFlowExecutionStatusDetail),
    Instances: S.optional(JobFlowInstancesDetail),
    Steps: S.optional(StepDetailList),
    BootstrapActions: S.optional(BootstrapActionDetailList),
    SupportedProducts: S.optional(SupportedProductsList),
    VisibleToAllUsers: S.optional(S.Boolean),
    JobFlowRole: S.optional(S.String),
    ServiceRole: S.optional(S.String),
    AutoScalingRole: S.optional(S.String),
    ScaleDownBehavior: S.optional(ScaleDownBehavior),
  }),
).annotate({ identifier: "JobFlowDetail" }) as any as S.Schema<JobFlowDetail>;
export type JobFlowDetailList = JobFlowDetail[];
export const JobFlowDetailList = /*@__PURE__*/ S.Array(JobFlowDetail);
export interface DescribeJobFlowsOutput {
  JobFlows?: (JobFlowDetail & {
    JobFlowId: XmlStringMaxLen256;
    Name: XmlStringMaxLen256;
    ExecutionStatusDetail: JobFlowExecutionStatusDetail & {
      State: JobFlowExecutionState;
      CreationDateTime: Date;
    };
    Instances: JobFlowInstancesDetail & {
      MasterInstanceType: InstanceType;
      SlaveInstanceType: InstanceType;
      InstanceCount: number;
      InstanceGroups: (InstanceGroupDetail & {
        Market: MarketType;
        InstanceRole: InstanceRoleType;
        InstanceType: InstanceType;
        InstanceRequestCount: number;
        InstanceRunningCount: number;
        State: InstanceGroupState;
        CreationDateTime: Date;
      })[];
    };
    Steps: (StepDetail & {
      StepConfig: StepConfig & {
        Name: XmlStringMaxLen256;
        HadoopJarStep: HadoopJarStepConfig & { Jar: XmlString };
      };
      ExecutionStatusDetail: StepExecutionStatusDetail & {
        State: StepExecutionState;
        CreationDateTime: Date;
      };
    })[];
    BootstrapActions: (BootstrapActionDetail & {
      BootstrapActionConfig: BootstrapActionConfig & {
        Name: XmlStringMaxLen256;
        ScriptBootstrapAction: ScriptBootstrapActionConfig & {
          Path: XmlString;
        };
      };
    })[];
  })[];
}
export const DescribeJobFlowsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobFlows: S.optional(JobFlowDetailList) }).pipe(ns),
).annotate({
  identifier: "DescribeJobFlowsOutput",
}) as any as S.Schema<DescribeJobFlowsOutput>;
export interface DescribeNotebookExecutionInput {
  NotebookExecutionId?: string;
}
export const DescribeNotebookExecutionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ NotebookExecutionId: S.optional(S.String) }).pipe(
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
  identifier: "DescribeNotebookExecutionInput",
}) as any as S.Schema<DescribeNotebookExecutionInput>;
export type ExecutionEngineType = "EMR" | (string & {});
export const ExecutionEngineType = S.String;

export type IAMRoleArn = string;
export interface ExecutionEngineConfig {
  Id?: string;
  Type?: ExecutionEngineType;
  MasterInstanceSecurityGroupId?: string;
  ExecutionRoleArn?: string;
}
export const ExecutionEngineConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Type: S.optional(ExecutionEngineType),
    MasterInstanceSecurityGroupId: S.optional(S.String),
    ExecutionRoleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "ExecutionEngineConfig",
}) as any as S.Schema<ExecutionEngineConfig>;
export type NotebookExecutionStatus =
  | "START_PENDING"
  | "STARTING"
  | "RUNNING"
  | "FINISHING"
  | "FINISHED"
  | "FAILING"
  | "FAILED"
  | "STOP_PENDING"
  | "STOPPING"
  | "STOPPED"
  | (string & {});
export const NotebookExecutionStatus = S.String;

export type UriString = string;
export interface NotebookS3LocationForOutput {
  Bucket?: string;
  Key?: string;
}
export const NotebookS3LocationForOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Bucket: S.optional(S.String), Key: S.optional(S.String) }),
).annotate({
  identifier: "NotebookS3LocationForOutput",
}) as any as S.Schema<NotebookS3LocationForOutput>;
export interface OutputNotebookS3LocationForOutput {
  Bucket?: string;
  Key?: string;
}
export const OutputNotebookS3LocationForOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Bucket: S.optional(S.String), Key: S.optional(S.String) }),
).annotate({
  identifier: "OutputNotebookS3LocationForOutput",
}) as any as S.Schema<OutputNotebookS3LocationForOutput>;
export type OutputNotebookFormat = "HTML" | (string & {});
export const OutputNotebookFormat = S.String;

export type EnvironmentVariablesMap = { [key: string]: string | undefined };
export const EnvironmentVariablesMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface NotebookExecution {
  NotebookExecutionId?: string;
  EditorId?: string;
  ExecutionEngine?: ExecutionEngineConfig;
  NotebookExecutionName?: string;
  NotebookParams?: string;
  Status?: NotebookExecutionStatus;
  StartTime?: Date;
  EndTime?: Date;
  Arn?: string;
  OutputNotebookURI?: string;
  LastStateChangeReason?: string;
  NotebookInstanceSecurityGroupId?: string;
  Tags?: Tag[];
  NotebookS3Location?: NotebookS3LocationForOutput;
  OutputNotebookS3Location?: OutputNotebookS3LocationForOutput;
  OutputNotebookFormat?: OutputNotebookFormat;
  EnvironmentVariables?: { [key: string]: string | undefined };
}
export const NotebookExecution = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NotebookExecutionId: S.optional(S.String),
    EditorId: S.optional(S.String),
    ExecutionEngine: S.optional(ExecutionEngineConfig),
    NotebookExecutionName: S.optional(S.String),
    NotebookParams: S.optional(S.String),
    Status: S.optional(NotebookExecutionStatus),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Arn: S.optional(S.String),
    OutputNotebookURI: S.optional(S.String),
    LastStateChangeReason: S.optional(S.String),
    NotebookInstanceSecurityGroupId: S.optional(S.String),
    Tags: S.optional(TagList),
    NotebookS3Location: S.optional(NotebookS3LocationForOutput),
    OutputNotebookS3Location: S.optional(OutputNotebookS3LocationForOutput),
    OutputNotebookFormat: S.optional(OutputNotebookFormat),
    EnvironmentVariables: S.optional(EnvironmentVariablesMap),
  }),
).annotate({
  identifier: "NotebookExecution",
}) as any as S.Schema<NotebookExecution>;
export interface DescribeNotebookExecutionOutput {
  NotebookExecution?: NotebookExecution & {
    ExecutionEngine: ExecutionEngineConfig & { Id: XmlStringMaxLen256 };
  };
}
export const DescribeNotebookExecutionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ NotebookExecution: S.optional(NotebookExecution) }).pipe(ns),
).annotate({
  identifier: "DescribeNotebookExecutionOutput",
}) as any as S.Schema<DescribeNotebookExecutionOutput>;
export interface DescribePersistentAppUIInput {
  PersistentAppUIId?: string;
}
export const DescribePersistentAppUIInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PersistentAppUIId: S.optional(S.String) }).pipe(
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
  identifier: "DescribePersistentAppUIInput",
}) as any as S.Schema<DescribePersistentAppUIInput>;
export type PersistentAppUIType = "SHS" | "TEZ" | "YTS" | (string & {});
export const PersistentAppUIType = S.String;

export type PersistentAppUITypeList = PersistentAppUIType[];
export const PersistentAppUITypeList =
  /*@__PURE__*/ S.Array(PersistentAppUIType);
export interface PersistentAppUI {
  PersistentAppUIId?: string;
  PersistentAppUITypeList?: PersistentAppUIType[];
  PersistentAppUIStatus?: string;
  AuthorId?: string;
  CreationTime?: Date;
  LastModifiedTime?: Date;
  LastStateChangeReason?: string;
  Tags?: Tag[];
}
export const PersistentAppUI = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PersistentAppUIId: S.optional(S.String),
    PersistentAppUITypeList: S.optional(PersistentAppUITypeList),
    PersistentAppUIStatus: S.optional(S.String),
    AuthorId: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LastStateChangeReason: S.optional(S.String),
    Tags: S.optional(TagList),
  }),
).annotate({
  identifier: "PersistentAppUI",
}) as any as S.Schema<PersistentAppUI>;
export interface DescribePersistentAppUIOutput {
  PersistentAppUI?: PersistentAppUI;
}
export const DescribePersistentAppUIOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PersistentAppUI: S.optional(PersistentAppUI) }).pipe(ns),
).annotate({
  identifier: "DescribePersistentAppUIOutput",
}) as any as S.Schema<DescribePersistentAppUIOutput>;
export type MaxResultsNumber = number;
export interface DescribeReleaseLabelInput {
  ReleaseLabel?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const DescribeReleaseLabelInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReleaseLabel: S.optional(S.String),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
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
  identifier: "DescribeReleaseLabelInput",
}) as any as S.Schema<DescribeReleaseLabelInput>;
export interface SimplifiedApplication {
  Name?: string;
  Version?: string;
}
export const SimplifiedApplication = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), Version: S.optional(S.String) }),
).annotate({
  identifier: "SimplifiedApplication",
}) as any as S.Schema<SimplifiedApplication>;
export type SimplifiedApplicationList = SimplifiedApplication[];
export const SimplifiedApplicationList = /*@__PURE__*/ S.Array(
  SimplifiedApplication,
);
export interface OSRelease {
  Label?: string;
}
export const OSRelease = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Label: S.optional(S.String) }),
).annotate({ identifier: "OSRelease" }) as any as S.Schema<OSRelease>;
export type OSReleaseList = OSRelease[];
export const OSReleaseList = /*@__PURE__*/ S.Array(OSRelease);
export interface DescribeReleaseLabelOutput {
  ReleaseLabel?: string;
  Applications?: SimplifiedApplication[];
  NextToken?: string;
  AvailableOSReleases?: OSRelease[];
}
export const DescribeReleaseLabelOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReleaseLabel: S.optional(S.String),
    Applications: S.optional(SimplifiedApplicationList),
    NextToken: S.optional(S.String),
    AvailableOSReleases: S.optional(OSReleaseList),
  }).pipe(ns),
).annotate({
  identifier: "DescribeReleaseLabelOutput",
}) as any as S.Schema<DescribeReleaseLabelOutput>;
export interface DescribeSecurityConfigurationInput {
  Name?: string;
}
export const DescribeSecurityConfigurationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }).pipe(
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
  identifier: "DescribeSecurityConfigurationInput",
}) as any as S.Schema<DescribeSecurityConfigurationInput>;
export interface DescribeSecurityConfigurationOutput {
  Name?: string;
  SecurityConfiguration?: string;
  CreationDateTime?: Date;
}
export const DescribeSecurityConfigurationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    SecurityConfiguration: S.optional(S.String),
    CreationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }).pipe(ns),
).annotate({
  identifier: "DescribeSecurityConfigurationOutput",
}) as any as S.Schema<DescribeSecurityConfigurationOutput>;
export interface DescribeStepInput {
  ClusterId?: string;
  StepId?: string;
}
export const DescribeStepInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterId: S.optional(S.String),
    StepId: S.optional(S.String),
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
  identifier: "DescribeStepInput",
}) as any as S.Schema<DescribeStepInput>;
export interface HadoopStepConfig {
  Jar?: string;
  Properties?: { [key: string]: string | undefined };
  MainClass?: string;
  Args?: string[];
}
export const HadoopStepConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Jar: S.optional(S.String),
    Properties: S.optional(StringMap),
    MainClass: S.optional(S.String),
    Args: S.optional(StringList),
  }),
).annotate({
  identifier: "HadoopStepConfig",
}) as any as S.Schema<HadoopStepConfig>;
export type StepState =
  | "PENDING"
  | "CANCEL_PENDING"
  | "RUNNING"
  | "COMPLETED"
  | "CANCELLED"
  | "FAILED"
  | "INTERRUPTED"
  | (string & {});
export const StepState = S.String;

export type StepStateChangeReasonCode = "NONE" | (string & {});
export const StepStateChangeReasonCode = S.String;

export interface StepStateChangeReason {
  Code?: StepStateChangeReasonCode;
  Message?: string;
}
export const StepStateChangeReason = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Code: S.optional(StepStateChangeReasonCode),
    Message: S.optional(S.String),
  }),
).annotate({
  identifier: "StepStateChangeReason",
}) as any as S.Schema<StepStateChangeReason>;
export interface FailureDetails {
  Reason?: string;
  Message?: string;
  LogFile?: string;
}
export const FailureDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Reason: S.optional(S.String),
    Message: S.optional(S.String),
    LogFile: S.optional(S.String),
  }),
).annotate({ identifier: "FailureDetails" }) as any as S.Schema<FailureDetails>;
export interface StepTimeline {
  CreationDateTime?: Date;
  StartDateTime?: Date;
  EndDateTime?: Date;
}
export const StepTimeline = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    StartDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "StepTimeline" }) as any as S.Schema<StepTimeline>;
export interface StepStatus {
  State?: StepState;
  StateChangeReason?: StepStateChangeReason;
  FailureDetails?: FailureDetails;
  Timeline?: StepTimeline;
}
export const StepStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    State: S.optional(StepState),
    StateChangeReason: S.optional(StepStateChangeReason),
    FailureDetails: S.optional(FailureDetails),
    Timeline: S.optional(StepTimeline),
  }),
).annotate({ identifier: "StepStatus" }) as any as S.Schema<StepStatus>;
export interface Step {
  Id?: string;
  Name?: string;
  Config?: HadoopStepConfig;
  ActionOnFailure?: ActionOnFailure;
  Status?: StepStatus;
  ExecutionRoleArn?: string;
  LogUri?: string;
  EncryptionKeyArn?: string;
}
export const Step = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Config: S.optional(HadoopStepConfig),
    ActionOnFailure: S.optional(ActionOnFailure),
    Status: S.optional(StepStatus),
    ExecutionRoleArn: S.optional(S.String),
    LogUri: S.optional(S.String),
    EncryptionKeyArn: S.optional(S.String),
  }),
).annotate({ identifier: "Step" }) as any as S.Schema<Step>;
export interface DescribeStepOutput {
  Step?: Step;
}
export const DescribeStepOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Step: S.optional(Step) }).pipe(ns),
).annotate({
  identifier: "DescribeStepOutput",
}) as any as S.Schema<DescribeStepOutput>;
export interface DescribeStudioInput {
  StudioId?: string;
}
export const DescribeStudioInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ StudioId: S.optional(S.String) }).pipe(
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
  identifier: "DescribeStudioInput",
}) as any as S.Schema<DescribeStudioInput>;
export interface Studio {
  StudioId?: string;
  StudioArn?: string;
  Name?: string;
  Description?: string;
  AuthMode?: AuthMode;
  VpcId?: string;
  SubnetIds?: string[];
  ServiceRole?: string;
  UserRole?: string;
  WorkspaceSecurityGroupId?: string;
  EngineSecurityGroupId?: string;
  Url?: string;
  CreationTime?: Date;
  DefaultS3Location?: string;
  IdpAuthUrl?: string;
  IdpRelayStateParameterName?: string;
  Tags?: Tag[];
  IdcInstanceArn?: string;
  TrustedIdentityPropagationEnabled?: boolean;
  IdcUserAssignment?: IdcUserAssignment;
  EncryptionKeyArn?: string;
}
export const Studio = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StudioId: S.optional(S.String),
    StudioArn: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    AuthMode: S.optional(AuthMode),
    VpcId: S.optional(S.String),
    SubnetIds: S.optional(SubnetIdList),
    ServiceRole: S.optional(S.String),
    UserRole: S.optional(S.String),
    WorkspaceSecurityGroupId: S.optional(S.String),
    EngineSecurityGroupId: S.optional(S.String),
    Url: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DefaultS3Location: S.optional(S.String),
    IdpAuthUrl: S.optional(S.String),
    IdpRelayStateParameterName: S.optional(S.String),
    Tags: S.optional(TagList),
    IdcInstanceArn: S.optional(S.String),
    TrustedIdentityPropagationEnabled: S.optional(S.Boolean),
    IdcUserAssignment: S.optional(IdcUserAssignment),
    EncryptionKeyArn: S.optional(S.String),
  }),
).annotate({ identifier: "Studio" }) as any as S.Schema<Studio>;
export interface DescribeStudioOutput {
  Studio?: Studio;
}
export const DescribeStudioOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Studio: S.optional(Studio) }).pipe(ns),
).annotate({
  identifier: "DescribeStudioOutput",
}) as any as S.Schema<DescribeStudioOutput>;
export interface GetAutoTerminationPolicyInput {
  ClusterId?: string;
}
export const GetAutoTerminationPolicyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ClusterId: S.optional(S.String) }).pipe(
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
  identifier: "GetAutoTerminationPolicyInput",
}) as any as S.Schema<GetAutoTerminationPolicyInput>;
export interface AutoTerminationPolicy {
  IdleTimeout?: number;
}
export const AutoTerminationPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IdleTimeout: S.optional(S.Number) }),
).annotate({
  identifier: "AutoTerminationPolicy",
}) as any as S.Schema<AutoTerminationPolicy>;
export interface GetAutoTerminationPolicyOutput {
  AutoTerminationPolicy?: AutoTerminationPolicy;
}
export const GetAutoTerminationPolicyOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AutoTerminationPolicy: S.optional(AutoTerminationPolicy) }).pipe(
    ns,
  ),
).annotate({
  identifier: "GetAutoTerminationPolicyOutput",
}) as any as S.Schema<GetAutoTerminationPolicyOutput>;
export interface GetBlockPublicAccessConfigurationInput {}
export const GetBlockPublicAccessConfigurationInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({}).pipe(
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
  identifier: "GetBlockPublicAccessConfigurationInput",
}) as any as S.Schema<GetBlockPublicAccessConfigurationInput>;
export type Port = number;
export interface PortRange {
  MinRange?: number;
  MaxRange?: number;
}
export const PortRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MinRange: S.optional(S.Number), MaxRange: S.optional(S.Number) }),
).annotate({ identifier: "PortRange" }) as any as S.Schema<PortRange>;
export type PortRanges = PortRange[];
export const PortRanges = /*@__PURE__*/ S.Array(PortRange);
export interface BlockPublicAccessConfiguration {
  BlockPublicSecurityGroupRules?: boolean;
  PermittedPublicSecurityGroupRuleRanges?: PortRange[];
  Classification?: string;
  Configurations?: Configuration[];
  Properties?: { [key: string]: string | undefined };
}
export const BlockPublicAccessConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BlockPublicSecurityGroupRules: S.optional(S.Boolean),
    PermittedPublicSecurityGroupRuleRanges: S.optional(PortRanges),
    Classification: S.optional(S.String),
    Configurations: S.optional(ConfigurationList),
    Properties: S.optional(StringMap),
  }),
).annotate({
  identifier: "BlockPublicAccessConfiguration",
}) as any as S.Schema<BlockPublicAccessConfiguration>;
export interface BlockPublicAccessConfigurationMetadata {
  CreationDateTime?: Date;
  CreatedByArn?: string;
}
export const BlockPublicAccessConfigurationMetadata = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      CreationDateTime: S.optional(
        S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      ),
      CreatedByArn: S.optional(S.String),
    }),
).annotate({
  identifier: "BlockPublicAccessConfigurationMetadata",
}) as any as S.Schema<BlockPublicAccessConfigurationMetadata>;
export interface GetBlockPublicAccessConfigurationOutput {
  BlockPublicAccessConfiguration: BlockPublicAccessConfiguration & {
    BlockPublicSecurityGroupRules: boolean;
    PermittedPublicSecurityGroupRuleRanges: (PortRange & { MinRange: Port })[];
  };
  BlockPublicAccessConfigurationMetadata: BlockPublicAccessConfigurationMetadata & {
    CreationDateTime: Date;
    CreatedByArn: ArnType;
  };
}
export const GetBlockPublicAccessConfigurationOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      BlockPublicAccessConfiguration: S.optional(
        BlockPublicAccessConfiguration,
      ),
      BlockPublicAccessConfigurationMetadata: S.optional(
        BlockPublicAccessConfigurationMetadata,
      ),
    }).pipe(ns),
).annotate({
  identifier: "GetBlockPublicAccessConfigurationOutput",
}) as any as S.Schema<GetBlockPublicAccessConfigurationOutput>;
export interface GetClusterSessionCredentialsInput {
  ClusterId?: string;
  ExecutionRoleArn?: string;
}
export const GetClusterSessionCredentialsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterId: S.optional(S.String),
    ExecutionRoleArn: S.optional(S.String),
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
  identifier: "GetClusterSessionCredentialsInput",
}) as any as S.Schema<GetClusterSessionCredentialsInput>;
export interface UsernamePassword {
  Username?: string;
  Password?: string | redacted.Redacted<string>;
}
export const UsernamePassword = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Username: S.optional(S.String),
    Password: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "UsernamePassword",
}) as any as S.Schema<UsernamePassword>;
export type Credentials = { UsernamePassword: UsernamePassword };
export const Credentials = /*@__PURE__*/ S.Union([
  S.Struct({ UsernamePassword: UsernamePassword }),
]);
export interface GetClusterSessionCredentialsOutput {
  Credentials?: Credentials;
  ExpiresAt?: Date;
}
export const GetClusterSessionCredentialsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Credentials: S.optional(Credentials),
    ExpiresAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }).pipe(ns),
).annotate({
  identifier: "GetClusterSessionCredentialsOutput",
}) as any as S.Schema<GetClusterSessionCredentialsOutput>;
export interface GetManagedScalingPolicyInput {
  ClusterId?: string;
}
export const GetManagedScalingPolicyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ClusterId: S.optional(S.String) }).pipe(
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
  identifier: "GetManagedScalingPolicyInput",
}) as any as S.Schema<GetManagedScalingPolicyInput>;
export type ComputeLimitsUnitType =
  | "InstanceFleetUnits"
  | "Instances"
  | "VCPU"
  | (string & {});
export const ComputeLimitsUnitType = S.String;

export interface ComputeLimits {
  UnitType?: ComputeLimitsUnitType;
  MinimumCapacityUnits?: number;
  MaximumCapacityUnits?: number;
  MaximumOnDemandCapacityUnits?: number;
  MaximumCoreCapacityUnits?: number;
}
export const ComputeLimits = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UnitType: S.optional(ComputeLimitsUnitType),
    MinimumCapacityUnits: S.optional(S.Number),
    MaximumCapacityUnits: S.optional(S.Number),
    MaximumOnDemandCapacityUnits: S.optional(S.Number),
    MaximumCoreCapacityUnits: S.optional(S.Number),
  }),
).annotate({ identifier: "ComputeLimits" }) as any as S.Schema<ComputeLimits>;
export type UtilizationPerformanceIndexInteger = number;
export type ScalingStrategy = "DEFAULT" | "ADVANCED" | (string & {});
export const ScalingStrategy = S.String;

export interface ManagedScalingPolicy {
  ComputeLimits?: ComputeLimits;
  UtilizationPerformanceIndex?: number;
  ScalingStrategy?: ScalingStrategy;
}
export const ManagedScalingPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ComputeLimits: S.optional(ComputeLimits),
    UtilizationPerformanceIndex: S.optional(S.Number),
    ScalingStrategy: S.optional(ScalingStrategy),
  }),
).annotate({
  identifier: "ManagedScalingPolicy",
}) as any as S.Schema<ManagedScalingPolicy>;
export interface GetManagedScalingPolicyOutput {
  ManagedScalingPolicy?: ManagedScalingPolicy & {
    ComputeLimits: ComputeLimits & {
      UnitType: ComputeLimitsUnitType;
      MinimumCapacityUnits: number;
      MaximumCapacityUnits: number;
    };
  };
}
export const GetManagedScalingPolicyOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ManagedScalingPolicy: S.optional(ManagedScalingPolicy) }).pipe(ns),
).annotate({
  identifier: "GetManagedScalingPolicyOutput",
}) as any as S.Schema<GetManagedScalingPolicyOutput>;
export type OnClusterAppUIType =
  | "SparkHistoryServer"
  | "YarnTimelineService"
  | "TezUI"
  | "ApplicationMaster"
  | "JobHistoryServer"
  | "ResourceManager"
  | (string & {});
export const OnClusterAppUIType = S.String;

export interface GetOnClusterAppUIPresignedURLInput {
  ClusterId?: string;
  OnClusterAppUIType?: OnClusterAppUIType;
  ApplicationId?: string;
  DryRun?: boolean;
  ExecutionRoleArn?: string;
}
export const GetOnClusterAppUIPresignedURLInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterId: S.optional(S.String),
    OnClusterAppUIType: S.optional(OnClusterAppUIType),
    ApplicationId: S.optional(S.String),
    DryRun: S.optional(S.Boolean),
    ExecutionRoleArn: S.optional(S.String),
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
  identifier: "GetOnClusterAppUIPresignedURLInput",
}) as any as S.Schema<GetOnClusterAppUIPresignedURLInput>;
export interface GetOnClusterAppUIPresignedURLOutput {
  PresignedURLReady?: boolean;
  PresignedURL?: string;
}
export const GetOnClusterAppUIPresignedURLOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PresignedURLReady: S.optional(S.Boolean),
    PresignedURL: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetOnClusterAppUIPresignedURLOutput",
}) as any as S.Schema<GetOnClusterAppUIPresignedURLOutput>;
export interface GetPersistentAppUIPresignedURLInput {
  PersistentAppUIId?: string;
  PersistentAppUIType?: PersistentAppUIType;
  ApplicationId?: string;
  AuthProxyCall?: boolean;
  ExecutionRoleArn?: string;
}
export const GetPersistentAppUIPresignedURLInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PersistentAppUIId: S.optional(S.String),
    PersistentAppUIType: S.optional(PersistentAppUIType),
    ApplicationId: S.optional(S.String),
    AuthProxyCall: S.optional(S.Boolean),
    ExecutionRoleArn: S.optional(S.String),
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
  identifier: "GetPersistentAppUIPresignedURLInput",
}) as any as S.Schema<GetPersistentAppUIPresignedURLInput>;
export interface GetPersistentAppUIPresignedURLOutput {
  PresignedURLReady?: boolean;
  PresignedURL?: string;
}
export const GetPersistentAppUIPresignedURLOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      PresignedURLReady: S.optional(S.Boolean),
      PresignedURL: S.optional(S.String),
    }).pipe(ns),
).annotate({
  identifier: "GetPersistentAppUIPresignedURLOutput",
}) as any as S.Schema<GetPersistentAppUIPresignedURLOutput>;
export type SessionId = string;
export interface GetSessionInput {
  ClusterId?: string;
  SessionId?: string;
}
export const GetSessionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterId: S.optional(S.String),
    SessionId: S.optional(S.String),
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
  identifier: "GetSessionInput",
}) as any as S.Schema<GetSessionInput>;
export type SessionState =
  | "SUBMITTED"
  | "STARTING"
  | "STARTED"
  | "IDLE"
  | "BUSY"
  | "TERMINATING"
  | "TERMINATED"
  | "FAILED"
  | (string & {});
export const SessionState = S.String;

export interface SessionCloudWatchLoggingConfiguration {
  Enabled?: boolean;
  LogGroup?: string;
  LogStreamNamePrefix?: string;
  EncryptionKeyArn?: string;
  LogTypes?: { [key: string]: string[] | undefined };
}
export const SessionCloudWatchLoggingConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Enabled: S.optional(S.Boolean),
      LogGroup: S.optional(S.String),
      LogStreamNamePrefix: S.optional(S.String),
      EncryptionKeyArn: S.optional(S.String),
      LogTypes: S.optional(LogTypesMap),
    }),
).annotate({
  identifier: "SessionCloudWatchLoggingConfiguration",
}) as any as S.Schema<SessionCloudWatchLoggingConfiguration>;
export interface SessionManagedLoggingConfiguration {
  Enabled?: boolean;
  EncryptionKeyArn?: string;
}
export const SessionManagedLoggingConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Enabled: S.optional(S.Boolean),
    EncryptionKeyArn: S.optional(S.String),
  }),
).annotate({
  identifier: "SessionManagedLoggingConfiguration",
}) as any as S.Schema<SessionManagedLoggingConfiguration>;
export interface SessionS3LoggingConfiguration {
  Enabled?: boolean;
  LogUri?: string;
  EncryptionKeyArn?: string;
  LogTypes?: { [key: string]: string[] | undefined };
}
export const SessionS3LoggingConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Enabled: S.optional(S.Boolean),
    LogUri: S.optional(S.String),
    EncryptionKeyArn: S.optional(S.String),
    LogTypes: S.optional(LogTypesMap),
  }),
).annotate({
  identifier: "SessionS3LoggingConfiguration",
}) as any as S.Schema<SessionS3LoggingConfiguration>;
export interface SessionMonitoringConfiguration {
  CloudWatchLoggingConfiguration?: SessionCloudWatchLoggingConfiguration;
  ManagedLoggingConfiguration?: SessionManagedLoggingConfiguration;
  S3LoggingConfiguration?: SessionS3LoggingConfiguration;
}
export const SessionMonitoringConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CloudWatchLoggingConfiguration: S.optional(
      SessionCloudWatchLoggingConfiguration,
    ),
    ManagedLoggingConfiguration: S.optional(SessionManagedLoggingConfiguration),
    S3LoggingConfiguration: S.optional(SessionS3LoggingConfiguration),
  }),
).annotate({
  identifier: "SessionMonitoringConfiguration",
}) as any as S.Schema<SessionMonitoringConfiguration>;
export interface Session {
  Id?: string;
  ClusterId?: string;
  Name?: string;
  Arn?: string;
  State?: SessionState;
  StateChangeReason?: string;
  ReleaseLabel?: string;
  ExecutionRoleArn?: string;
  AccountId?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  StartedAt?: Date;
  EndedAt?: Date;
  IdleSince?: Date;
  EngineConfigurations?: Configuration[];
  MonitoringConfiguration?: SessionMonitoringConfiguration;
  SessionIdleTimeoutInMinutes?: number;
  ServerUrl?: string;
  Tags?: Tag[];
}
export const Session = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    ClusterId: S.optional(S.String),
    Name: S.optional(S.String),
    Arn: S.optional(S.String),
    State: S.optional(SessionState),
    StateChangeReason: S.optional(S.String),
    ReleaseLabel: S.optional(S.String),
    ExecutionRoleArn: S.optional(S.String),
    AccountId: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    StartedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    IdleSince: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EngineConfigurations: S.optional(ConfigurationList),
    MonitoringConfiguration: S.optional(SessionMonitoringConfiguration),
    SessionIdleTimeoutInMinutes: S.optional(S.Number),
    ServerUrl: S.optional(S.String),
    Tags: S.optional(TagList),
  }),
).annotate({ identifier: "Session" }) as any as S.Schema<Session>;
export interface GetSessionOutput {
  Session: Session & {
    Id: SessionId;
    ClusterId: ClusterId;
    Arn: ArnType;
    State: SessionState;
  };
}
export const GetSessionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Session: S.optional(Session) }).pipe(ns),
).annotate({
  identifier: "GetSessionOutput",
}) as any as S.Schema<GetSessionOutput>;
export interface GetSessionEndpointInput {
  ClusterId?: string;
  SessionId?: string;
}
export const GetSessionEndpointInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterId: S.optional(S.String),
    SessionId: S.optional(S.String),
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
  identifier: "GetSessionEndpointInput",
}) as any as S.Schema<GetSessionEndpointInput>;
export type SensitiveString = string | redacted.Redacted<string>;
export interface GetSessionEndpointOutput {
  Endpoint: string;
  AuthToken?: string | redacted.Redacted<string>;
  AuthTokenExpirationTime?: Date;
  Credentials?: Credentials;
}
export const GetSessionEndpointOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Endpoint: S.optional(S.String),
    AuthToken: S.optional(SensitiveString),
    AuthTokenExpirationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Credentials: S.optional(Credentials),
  }).pipe(ns),
).annotate({
  identifier: "GetSessionEndpointOutput",
}) as any as S.Schema<GetSessionEndpointOutput>;
export interface GetStudioSessionMappingInput {
  StudioId?: string;
  IdentityId?: string;
  IdentityName?: string;
  IdentityType?: IdentityType;
}
export const GetStudioSessionMappingInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StudioId: S.optional(S.String),
    IdentityId: S.optional(S.String),
    IdentityName: S.optional(S.String),
    IdentityType: S.optional(IdentityType),
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
  identifier: "GetStudioSessionMappingInput",
}) as any as S.Schema<GetStudioSessionMappingInput>;
export interface SessionMappingDetail {
  StudioId?: string;
  IdentityId?: string;
  IdentityName?: string;
  IdentityType?: IdentityType;
  SessionPolicyArn?: string;
  CreationTime?: Date;
  LastModifiedTime?: Date;
}
export const SessionMappingDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StudioId: S.optional(S.String),
    IdentityId: S.optional(S.String),
    IdentityName: S.optional(S.String),
    IdentityType: S.optional(IdentityType),
    SessionPolicyArn: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "SessionMappingDetail",
}) as any as S.Schema<SessionMappingDetail>;
export interface GetStudioSessionMappingOutput {
  SessionMapping?: SessionMappingDetail;
}
export const GetStudioSessionMappingOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SessionMapping: S.optional(SessionMappingDetail) }).pipe(ns),
).annotate({
  identifier: "GetStudioSessionMappingOutput",
}) as any as S.Schema<GetStudioSessionMappingOutput>;
export type Marker = string;
export interface ListBootstrapActionsInput {
  ClusterId?: string;
  Marker?: string;
}
export const ListBootstrapActionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterId: S.optional(S.String),
    Marker: S.optional(S.String),
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
  identifier: "ListBootstrapActionsInput",
}) as any as S.Schema<ListBootstrapActionsInput>;
export interface Command {
  Name?: string;
  ScriptPath?: string;
  Args?: string[];
}
export const Command = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    ScriptPath: S.optional(S.String),
    Args: S.optional(StringList),
  }),
).annotate({ identifier: "Command" }) as any as S.Schema<Command>;
export type CommandList = Command[];
export const CommandList = /*@__PURE__*/ S.Array(Command);
export interface ListBootstrapActionsOutput {
  BootstrapActions?: Command[];
  Marker?: string;
}
export const ListBootstrapActionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BootstrapActions: S.optional(CommandList),
    Marker: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListBootstrapActionsOutput",
}) as any as S.Schema<ListBootstrapActionsOutput>;
export type ClusterStateList = ClusterState[];
export const ClusterStateList = /*@__PURE__*/ S.Array(ClusterState);
export interface ListClustersInput {
  CreatedAfter?: Date;
  CreatedBefore?: Date;
  ClusterStates?: ClusterState[];
  Marker?: string;
}
export const ListClustersInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreatedAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CreatedBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ClusterStates: S.optional(ClusterStateList),
    Marker: S.optional(S.String),
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
  identifier: "ListClustersInput",
}) as any as S.Schema<ListClustersInput>;
export interface ClusterSummary {
  Id?: string;
  Name?: string;
  Status?: ClusterStatus;
  NormalizedInstanceHours?: number;
  ClusterArn?: string;
  OutpostArn?: string;
}
export const ClusterSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Status: S.optional(ClusterStatus),
    NormalizedInstanceHours: S.optional(S.Number),
    ClusterArn: S.optional(S.String),
    OutpostArn: S.optional(S.String),
  }),
).annotate({ identifier: "ClusterSummary" }) as any as S.Schema<ClusterSummary>;
export type ClusterSummaryList = ClusterSummary[];
export const ClusterSummaryList = /*@__PURE__*/ S.Array(ClusterSummary);
export interface ListClustersOutput {
  Clusters?: ClusterSummary[];
  Marker?: string;
}
export const ListClustersOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Clusters: S.optional(ClusterSummaryList),
    Marker: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListClustersOutput",
}) as any as S.Schema<ListClustersOutput>;
export interface ListInstanceFleetsInput {
  ClusterId?: string;
  Marker?: string;
}
export const ListInstanceFleetsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterId: S.optional(S.String),
    Marker: S.optional(S.String),
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
  identifier: "ListInstanceFleetsInput",
}) as any as S.Schema<ListInstanceFleetsInput>;
export type InstanceFleetState =
  | "PROVISIONING"
  | "BOOTSTRAPPING"
  | "RUNNING"
  | "RESIZING"
  | "RECONFIGURING"
  | "SUSPENDED"
  | "TERMINATING"
  | "TERMINATED"
  | (string & {});
export const InstanceFleetState = S.String;

export type InstanceFleetStateChangeReasonCode =
  | "INTERNAL_ERROR"
  | "VALIDATION_ERROR"
  | "INSTANCE_FAILURE"
  | "CLUSTER_TERMINATED"
  | (string & {});
export const InstanceFleetStateChangeReasonCode = S.String;

export interface InstanceFleetStateChangeReason {
  Code?: InstanceFleetStateChangeReasonCode;
  Message?: string;
}
export const InstanceFleetStateChangeReason = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Code: S.optional(InstanceFleetStateChangeReasonCode),
    Message: S.optional(S.String),
  }),
).annotate({
  identifier: "InstanceFleetStateChangeReason",
}) as any as S.Schema<InstanceFleetStateChangeReason>;
export interface InstanceFleetTimeline {
  CreationDateTime?: Date;
  ReadyDateTime?: Date;
  EndDateTime?: Date;
}
export const InstanceFleetTimeline = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ReadyDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "InstanceFleetTimeline",
}) as any as S.Schema<InstanceFleetTimeline>;
export interface InstanceFleetStatus {
  State?: InstanceFleetState;
  StateChangeReason?: InstanceFleetStateChangeReason;
  Timeline?: InstanceFleetTimeline;
}
export const InstanceFleetStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    State: S.optional(InstanceFleetState),
    StateChangeReason: S.optional(InstanceFleetStateChangeReason),
    Timeline: S.optional(InstanceFleetTimeline),
  }),
).annotate({
  identifier: "InstanceFleetStatus",
}) as any as S.Schema<InstanceFleetStatus>;
export interface EbsBlockDevice {
  VolumeSpecification?: VolumeSpecification;
  Device?: string;
}
export const EbsBlockDevice = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VolumeSpecification: S.optional(VolumeSpecification),
    Device: S.optional(S.String),
  }),
).annotate({ identifier: "EbsBlockDevice" }) as any as S.Schema<EbsBlockDevice>;
export type EbsBlockDeviceList = EbsBlockDevice[];
export const EbsBlockDeviceList = /*@__PURE__*/ S.Array(EbsBlockDevice);
export interface InstanceTypeSpecification {
  InstanceType?: string;
  WeightedCapacity?: number;
  BidPrice?: string;
  BidPriceAsPercentageOfOnDemandPrice?: number;
  Configurations?: Configuration[];
  EbsBlockDevices?: EbsBlockDevice[];
  EbsOptimized?: boolean;
  CustomAmiId?: string;
  Priority?: number;
}
export const InstanceTypeSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstanceType: S.optional(S.String),
    WeightedCapacity: S.optional(S.Number),
    BidPrice: S.optional(S.String),
    BidPriceAsPercentageOfOnDemandPrice: S.optional(S.Number),
    Configurations: S.optional(ConfigurationList),
    EbsBlockDevices: S.optional(EbsBlockDeviceList),
    EbsOptimized: S.optional(S.Boolean),
    CustomAmiId: S.optional(S.String),
    Priority: S.optional(S.Number),
  }),
).annotate({
  identifier: "InstanceTypeSpecification",
}) as any as S.Schema<InstanceTypeSpecification>;
export type InstanceTypeSpecificationList = InstanceTypeSpecification[];
export const InstanceTypeSpecificationList = /*@__PURE__*/ S.Array(
  InstanceTypeSpecification,
);
export interface InstanceFleet {
  Id?: string;
  Name?: string;
  Status?: InstanceFleetStatus;
  InstanceFleetType?: InstanceFleetType;
  TargetOnDemandCapacity?: number;
  TargetSpotCapacity?: number;
  ProvisionedOnDemandCapacity?: number;
  ProvisionedSpotCapacity?: number;
  InstanceTypeSpecifications?: InstanceTypeSpecification[];
  LaunchSpecifications?: InstanceFleetProvisioningSpecifications;
  ResizeSpecifications?: InstanceFleetResizingSpecifications;
  Context?: string;
}
export const InstanceFleet = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Status: S.optional(InstanceFleetStatus),
    InstanceFleetType: S.optional(InstanceFleetType),
    TargetOnDemandCapacity: S.optional(S.Number),
    TargetSpotCapacity: S.optional(S.Number),
    ProvisionedOnDemandCapacity: S.optional(S.Number),
    ProvisionedSpotCapacity: S.optional(S.Number),
    InstanceTypeSpecifications: S.optional(InstanceTypeSpecificationList),
    LaunchSpecifications: S.optional(InstanceFleetProvisioningSpecifications),
    ResizeSpecifications: S.optional(InstanceFleetResizingSpecifications),
    Context: S.optional(S.String),
  }),
).annotate({ identifier: "InstanceFleet" }) as any as S.Schema<InstanceFleet>;
export type InstanceFleetList = InstanceFleet[];
export const InstanceFleetList = /*@__PURE__*/ S.Array(InstanceFleet);
export interface ListInstanceFleetsOutput {
  InstanceFleets?: (InstanceFleet & {
    InstanceTypeSpecifications: (InstanceTypeSpecification & {
      EbsBlockDevices: (EbsBlockDevice & {
        VolumeSpecification: VolumeSpecification & {
          VolumeType: string;
          SizeInGB: number;
        };
      })[];
    })[];
    LaunchSpecifications: InstanceFleetProvisioningSpecifications & {
      SpotSpecification: SpotProvisioningSpecification & {
        TimeoutDurationMinutes: WholeNumber;
        TimeoutAction: SpotProvisioningTimeoutAction;
      };
      OnDemandSpecification: OnDemandProvisioningSpecification & {
        AllocationStrategy: OnDemandProvisioningAllocationStrategy;
      };
    };
  })[];
  Marker?: string;
}
export const ListInstanceFleetsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstanceFleets: S.optional(InstanceFleetList),
    Marker: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListInstanceFleetsOutput",
}) as any as S.Schema<ListInstanceFleetsOutput>;
export interface ListInstanceGroupsInput {
  ClusterId?: string;
  Marker?: string;
}
export const ListInstanceGroupsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterId: S.optional(S.String),
    Marker: S.optional(S.String),
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
  identifier: "ListInstanceGroupsInput",
}) as any as S.Schema<ListInstanceGroupsInput>;
export type InstanceGroupId = string;
export type InstanceGroupType = "MASTER" | "CORE" | "TASK" | (string & {});
export const InstanceGroupType = S.String;

export type InstanceGroupStateChangeReasonCode =
  | "INTERNAL_ERROR"
  | "VALIDATION_ERROR"
  | "INSTANCE_FAILURE"
  | "CLUSTER_TERMINATED"
  | (string & {});
export const InstanceGroupStateChangeReasonCode = S.String;

export interface InstanceGroupStateChangeReason {
  Code?: InstanceGroupStateChangeReasonCode;
  Message?: string;
}
export const InstanceGroupStateChangeReason = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Code: S.optional(InstanceGroupStateChangeReasonCode),
    Message: S.optional(S.String),
  }),
).annotate({
  identifier: "InstanceGroupStateChangeReason",
}) as any as S.Schema<InstanceGroupStateChangeReason>;
export interface InstanceGroupTimeline {
  CreationDateTime?: Date;
  ReadyDateTime?: Date;
  EndDateTime?: Date;
}
export const InstanceGroupTimeline = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ReadyDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "InstanceGroupTimeline",
}) as any as S.Schema<InstanceGroupTimeline>;
export interface InstanceGroupStatus {
  State?: InstanceGroupState;
  StateChangeReason?: InstanceGroupStateChangeReason;
  Timeline?: InstanceGroupTimeline;
}
export const InstanceGroupStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    State: S.optional(InstanceGroupState),
    StateChangeReason: S.optional(InstanceGroupStateChangeReason),
    Timeline: S.optional(InstanceGroupTimeline),
  }),
).annotate({
  identifier: "InstanceGroupStatus",
}) as any as S.Schema<InstanceGroupStatus>;
export type InstanceId = string;
export type EC2InstanceIdsList = string[];
export const EC2InstanceIdsList = /*@__PURE__*/ S.Array(S.String);
export interface InstanceResizePolicy {
  InstancesToTerminate?: string[];
  InstancesToProtect?: string[];
  InstanceTerminationTimeout?: number;
}
export const InstanceResizePolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstancesToTerminate: S.optional(EC2InstanceIdsList),
    InstancesToProtect: S.optional(EC2InstanceIdsList),
    InstanceTerminationTimeout: S.optional(S.Number),
  }),
).annotate({
  identifier: "InstanceResizePolicy",
}) as any as S.Schema<InstanceResizePolicy>;
export interface ShrinkPolicy {
  DecommissionTimeout?: number;
  InstanceResizePolicy?: InstanceResizePolicy;
}
export const ShrinkPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DecommissionTimeout: S.optional(S.Number),
    InstanceResizePolicy: S.optional(InstanceResizePolicy),
  }),
).annotate({ identifier: "ShrinkPolicy" }) as any as S.Schema<ShrinkPolicy>;
export type AutoScalingPolicyState =
  | "PENDING"
  | "ATTACHING"
  | "ATTACHED"
  | "DETACHING"
  | "DETACHED"
  | "FAILED"
  | (string & {});
export const AutoScalingPolicyState = S.String;

export type AutoScalingPolicyStateChangeReasonCode =
  | "USER_REQUEST"
  | "PROVISION_FAILURE"
  | "CLEANUP_FAILURE"
  | (string & {});
export const AutoScalingPolicyStateChangeReasonCode = S.String;

export interface AutoScalingPolicyStateChangeReason {
  Code?: AutoScalingPolicyStateChangeReasonCode;
  Message?: string;
}
export const AutoScalingPolicyStateChangeReason = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Code: S.optional(AutoScalingPolicyStateChangeReasonCode),
    Message: S.optional(S.String),
  }),
).annotate({
  identifier: "AutoScalingPolicyStateChangeReason",
}) as any as S.Schema<AutoScalingPolicyStateChangeReason>;
export interface AutoScalingPolicyStatus {
  State?: AutoScalingPolicyState;
  StateChangeReason?: AutoScalingPolicyStateChangeReason;
}
export const AutoScalingPolicyStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    State: S.optional(AutoScalingPolicyState),
    StateChangeReason: S.optional(AutoScalingPolicyStateChangeReason),
  }),
).annotate({
  identifier: "AutoScalingPolicyStatus",
}) as any as S.Schema<AutoScalingPolicyStatus>;
export interface AutoScalingPolicyDescription {
  Status?: AutoScalingPolicyStatus;
  Constraints?: ScalingConstraints;
  Rules?: ScalingRule[];
}
export const AutoScalingPolicyDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(AutoScalingPolicyStatus),
    Constraints: S.optional(ScalingConstraints),
    Rules: S.optional(ScalingRuleList),
  }),
).annotate({
  identifier: "AutoScalingPolicyDescription",
}) as any as S.Schema<AutoScalingPolicyDescription>;
export interface InstanceGroup {
  Id?: string;
  Name?: string;
  Market?: MarketType;
  InstanceGroupType?: InstanceGroupType;
  BidPrice?: string;
  InstanceType?: string;
  RequestedInstanceCount?: number;
  RunningInstanceCount?: number;
  Status?: InstanceGroupStatus;
  Configurations?: Configuration[];
  ConfigurationsVersion?: number;
  LastSuccessfullyAppliedConfigurations?: Configuration[];
  LastSuccessfullyAppliedConfigurationsVersion?: number;
  EbsBlockDevices?: EbsBlockDevice[];
  EbsOptimized?: boolean;
  ShrinkPolicy?: ShrinkPolicy;
  AutoScalingPolicy?: AutoScalingPolicyDescription;
  CustomAmiId?: string;
}
export const InstanceGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Market: S.optional(MarketType),
    InstanceGroupType: S.optional(InstanceGroupType),
    BidPrice: S.optional(S.String),
    InstanceType: S.optional(S.String),
    RequestedInstanceCount: S.optional(S.Number),
    RunningInstanceCount: S.optional(S.Number),
    Status: S.optional(InstanceGroupStatus),
    Configurations: S.optional(ConfigurationList),
    ConfigurationsVersion: S.optional(S.Number),
    LastSuccessfullyAppliedConfigurations: S.optional(ConfigurationList),
    LastSuccessfullyAppliedConfigurationsVersion: S.optional(S.Number),
    EbsBlockDevices: S.optional(EbsBlockDeviceList),
    EbsOptimized: S.optional(S.Boolean),
    ShrinkPolicy: S.optional(ShrinkPolicy),
    AutoScalingPolicy: S.optional(AutoScalingPolicyDescription),
    CustomAmiId: S.optional(S.String),
  }),
).annotate({ identifier: "InstanceGroup" }) as any as S.Schema<InstanceGroup>;
export type InstanceGroupList = InstanceGroup[];
export const InstanceGroupList = /*@__PURE__*/ S.Array(InstanceGroup);
export interface ListInstanceGroupsOutput {
  InstanceGroups?: (InstanceGroup & {
    EbsBlockDevices: (EbsBlockDevice & {
      VolumeSpecification: VolumeSpecification & {
        VolumeType: string;
        SizeInGB: number;
      };
    })[];
    AutoScalingPolicy: AutoScalingPolicyDescription & {
      Constraints: ScalingConstraints & {
        MinCapacity: number;
        MaxCapacity: number;
      };
      Rules: (ScalingRule & {
        Name: string;
        Action: ScalingAction & {
          SimpleScalingPolicyConfiguration: SimpleScalingPolicyConfiguration & {
            ScalingAdjustment: number;
          };
        };
        Trigger: ScalingTrigger & {
          CloudWatchAlarmDefinition: CloudWatchAlarmDefinition & {
            ComparisonOperator: ComparisonOperator;
            MetricName: string;
            Period: number;
            Threshold: NonNegativeDouble;
          };
        };
      })[];
    };
  })[];
  Marker?: string;
}
export const ListInstanceGroupsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstanceGroups: S.optional(InstanceGroupList),
    Marker: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListInstanceGroupsOutput",
}) as any as S.Schema<ListInstanceGroupsOutput>;
export type InstanceGroupTypeList = InstanceGroupType[];
export const InstanceGroupTypeList = /*@__PURE__*/ S.Array(InstanceGroupType);
export type InstanceState =
  | "AWAITING_FULFILLMENT"
  | "PROVISIONING"
  | "BOOTSTRAPPING"
  | "RUNNING"
  | "TERMINATED"
  | (string & {});
export const InstanceState = S.String;

export type InstanceStateList = InstanceState[];
export const InstanceStateList = /*@__PURE__*/ S.Array(InstanceState);
export interface ListInstancesInput {
  ClusterId?: string;
  InstanceGroupId?: string;
  InstanceGroupTypes?: InstanceGroupType[];
  InstanceFleetId?: string;
  InstanceFleetType?: InstanceFleetType;
  InstanceStates?: InstanceState[];
  Marker?: string;
}
export const ListInstancesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterId: S.optional(S.String),
    InstanceGroupId: S.optional(S.String),
    InstanceGroupTypes: S.optional(InstanceGroupTypeList),
    InstanceFleetId: S.optional(S.String),
    InstanceFleetType: S.optional(InstanceFleetType),
    InstanceStates: S.optional(InstanceStateList),
    Marker: S.optional(S.String),
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
  identifier: "ListInstancesInput",
}) as any as S.Schema<ListInstancesInput>;
export type InstanceStateChangeReasonCode =
  | "INTERNAL_ERROR"
  | "VALIDATION_ERROR"
  | "INSTANCE_FAILURE"
  | "BOOTSTRAP_FAILURE"
  | "CLUSTER_TERMINATED"
  | (string & {});
export const InstanceStateChangeReasonCode = S.String;

export interface InstanceStateChangeReason {
  Code?: InstanceStateChangeReasonCode;
  Message?: string;
}
export const InstanceStateChangeReason = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Code: S.optional(InstanceStateChangeReasonCode),
    Message: S.optional(S.String),
  }),
).annotate({
  identifier: "InstanceStateChangeReason",
}) as any as S.Schema<InstanceStateChangeReason>;
export interface InstanceTimeline {
  CreationDateTime?: Date;
  ReadyDateTime?: Date;
  EndDateTime?: Date;
}
export const InstanceTimeline = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ReadyDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "InstanceTimeline",
}) as any as S.Schema<InstanceTimeline>;
export interface InstanceStatus {
  State?: InstanceState;
  StateChangeReason?: InstanceStateChangeReason;
  Timeline?: InstanceTimeline;
}
export const InstanceStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    State: S.optional(InstanceState),
    StateChangeReason: S.optional(InstanceStateChangeReason),
    Timeline: S.optional(InstanceTimeline),
  }),
).annotate({ identifier: "InstanceStatus" }) as any as S.Schema<InstanceStatus>;
export interface EbsVolume {
  Device?: string;
  VolumeId?: string;
}
export const EbsVolume = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Device: S.optional(S.String), VolumeId: S.optional(S.String) }),
).annotate({ identifier: "EbsVolume" }) as any as S.Schema<EbsVolume>;
export type EbsVolumeList = EbsVolume[];
export const EbsVolumeList = /*@__PURE__*/ S.Array(EbsVolume);
export interface Instance {
  Id?: string;
  Ec2InstanceId?: string;
  PublicDnsName?: string;
  PublicIpAddress?: string;
  PrivateDnsName?: string;
  PrivateIpAddress?: string;
  Status?: InstanceStatus;
  InstanceGroupId?: string;
  InstanceFleetId?: string;
  Market?: MarketType;
  InstanceType?: string;
  EbsVolumes?: EbsVolume[];
}
export const Instance = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Ec2InstanceId: S.optional(S.String),
    PublicDnsName: S.optional(S.String),
    PublicIpAddress: S.optional(S.String),
    PrivateDnsName: S.optional(S.String),
    PrivateIpAddress: S.optional(S.String),
    Status: S.optional(InstanceStatus),
    InstanceGroupId: S.optional(S.String),
    InstanceFleetId: S.optional(S.String),
    Market: S.optional(MarketType),
    InstanceType: S.optional(S.String),
    EbsVolumes: S.optional(EbsVolumeList),
  }),
).annotate({ identifier: "Instance" }) as any as S.Schema<Instance>;
export type InstanceList = Instance[];
export const InstanceList = /*@__PURE__*/ S.Array(Instance);
export interface ListInstancesOutput {
  Instances?: Instance[];
  Marker?: string;
}
export const ListInstancesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Instances: S.optional(InstanceList),
    Marker: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListInstancesOutput",
}) as any as S.Schema<ListInstancesOutput>;
export interface ListNotebookExecutionsInput {
  EditorId?: string;
  Status?: NotebookExecutionStatus;
  From?: Date;
  To?: Date;
  Marker?: string;
  ExecutionEngineId?: string;
}
export const ListNotebookExecutionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EditorId: S.optional(S.String),
    Status: S.optional(NotebookExecutionStatus),
    From: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    To: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Marker: S.optional(S.String),
    ExecutionEngineId: S.optional(S.String),
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
  identifier: "ListNotebookExecutionsInput",
}) as any as S.Schema<ListNotebookExecutionsInput>;
export interface NotebookExecutionSummary {
  NotebookExecutionId?: string;
  EditorId?: string;
  NotebookExecutionName?: string;
  Status?: NotebookExecutionStatus;
  StartTime?: Date;
  EndTime?: Date;
  NotebookS3Location?: NotebookS3LocationForOutput;
  ExecutionEngineId?: string;
}
export const NotebookExecutionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NotebookExecutionId: S.optional(S.String),
    EditorId: S.optional(S.String),
    NotebookExecutionName: S.optional(S.String),
    Status: S.optional(NotebookExecutionStatus),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    NotebookS3Location: S.optional(NotebookS3LocationForOutput),
    ExecutionEngineId: S.optional(S.String),
  }),
).annotate({
  identifier: "NotebookExecutionSummary",
}) as any as S.Schema<NotebookExecutionSummary>;
export type NotebookExecutionSummaryList = NotebookExecutionSummary[];
export const NotebookExecutionSummaryList = /*@__PURE__*/ S.Array(
  NotebookExecutionSummary,
);
export interface ListNotebookExecutionsOutput {
  NotebookExecutions?: NotebookExecutionSummary[];
  Marker?: string;
}
export const ListNotebookExecutionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NotebookExecutions: S.optional(NotebookExecutionSummaryList),
    Marker: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListNotebookExecutionsOutput",
}) as any as S.Schema<ListNotebookExecutionsOutput>;
export interface ReleaseLabelFilter {
  Prefix?: string;
  Application?: string;
}
export const ReleaseLabelFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Prefix: S.optional(S.String), Application: S.optional(S.String) }),
).annotate({
  identifier: "ReleaseLabelFilter",
}) as any as S.Schema<ReleaseLabelFilter>;
export interface ListReleaseLabelsInput {
  Filters?: ReleaseLabelFilter;
  NextToken?: string;
  MaxResults?: number;
}
export const ListReleaseLabelsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filters: S.optional(ReleaseLabelFilter),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
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
  identifier: "ListReleaseLabelsInput",
}) as any as S.Schema<ListReleaseLabelsInput>;
export interface ListReleaseLabelsOutput {
  ReleaseLabels?: string[];
  NextToken?: string;
}
export const ListReleaseLabelsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReleaseLabels: S.optional(StringList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListReleaseLabelsOutput",
}) as any as S.Schema<ListReleaseLabelsOutput>;
export interface ListSecurityConfigurationsInput {
  Marker?: string;
}
export const ListSecurityConfigurationsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Marker: S.optional(S.String) }).pipe(
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
  identifier: "ListSecurityConfigurationsInput",
}) as any as S.Schema<ListSecurityConfigurationsInput>;
export interface SecurityConfigurationSummary {
  Name?: string;
  CreationDateTime?: Date;
}
export const SecurityConfigurationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    CreationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "SecurityConfigurationSummary",
}) as any as S.Schema<SecurityConfigurationSummary>;
export type SecurityConfigurationList = SecurityConfigurationSummary[];
export const SecurityConfigurationList = /*@__PURE__*/ S.Array(
  SecurityConfigurationSummary,
);
export interface ListSecurityConfigurationsOutput {
  SecurityConfigurations?: SecurityConfigurationSummary[];
  Marker?: string;
}
export const ListSecurityConfigurationsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SecurityConfigurations: S.optional(SecurityConfigurationList),
    Marker: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListSecurityConfigurationsOutput",
}) as any as S.Schema<ListSecurityConfigurationsOutput>;
export type SessionStateList = SessionState[];
export const SessionStateList = /*@__PURE__*/ S.Array(SessionState);
export interface ListSessionsInput {
  ClusterId?: string;
  SessionStates?: SessionState[];
  NextToken?: string;
  MaxResults?: number;
}
export const ListSessionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterId: S.optional(S.String),
    SessionStates: S.optional(SessionStateList),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
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
  identifier: "ListSessionsInput",
}) as any as S.Schema<ListSessionsInput>;
export type SessionList = Session[];
export const SessionList = /*@__PURE__*/ S.Array(Session);
export interface ListSessionsOutput {
  Sessions?: (Session & {
    Id: SessionId;
    ClusterId: ClusterId;
    Arn: ArnType;
    State: SessionState;
  })[];
  NextToken?: string;
}
export const ListSessionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Sessions: S.optional(SessionList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListSessionsOutput",
}) as any as S.Schema<ListSessionsOutput>;
export type StepStateList = StepState[];
export const StepStateList = /*@__PURE__*/ S.Array(StepState);
export interface ListStepsInput {
  ClusterId?: string;
  StepStates?: StepState[];
  StepIds?: string[];
  Marker?: string;
}
export const ListStepsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterId: S.optional(S.String),
    StepStates: S.optional(StepStateList),
    StepIds: S.optional(XmlStringList),
    Marker: S.optional(S.String),
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
).annotate({ identifier: "ListStepsInput" }) as any as S.Schema<ListStepsInput>;
export interface StepSummary {
  Id?: string;
  Name?: string;
  Config?: HadoopStepConfig;
  ActionOnFailure?: ActionOnFailure;
  Status?: StepStatus;
  LogUri?: string;
  EncryptionKeyArn?: string;
}
export const StepSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Config: S.optional(HadoopStepConfig),
    ActionOnFailure: S.optional(ActionOnFailure),
    Status: S.optional(StepStatus),
    LogUri: S.optional(S.String),
    EncryptionKeyArn: S.optional(S.String),
  }),
).annotate({ identifier: "StepSummary" }) as any as S.Schema<StepSummary>;
export type StepSummaryList = StepSummary[];
export const StepSummaryList = /*@__PURE__*/ S.Array(StepSummary);
export interface ListStepsOutput {
  Steps?: StepSummary[];
  Marker?: string;
}
export const ListStepsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Steps: S.optional(StepSummaryList),
    Marker: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListStepsOutput",
}) as any as S.Schema<ListStepsOutput>;
export interface ListStudiosInput {
  Marker?: string;
}
export const ListStudiosInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Marker: S.optional(S.String) }).pipe(
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
  identifier: "ListStudiosInput",
}) as any as S.Schema<ListStudiosInput>;
export interface StudioSummary {
  StudioId?: string;
  Name?: string;
  VpcId?: string;
  Description?: string;
  Url?: string;
  AuthMode?: AuthMode;
  CreationTime?: Date;
}
export const StudioSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StudioId: S.optional(S.String),
    Name: S.optional(S.String),
    VpcId: S.optional(S.String),
    Description: S.optional(S.String),
    Url: S.optional(S.String),
    AuthMode: S.optional(AuthMode),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "StudioSummary" }) as any as S.Schema<StudioSummary>;
export type StudioSummaryList = StudioSummary[];
export const StudioSummaryList = /*@__PURE__*/ S.Array(StudioSummary);
export interface ListStudiosOutput {
  Studios?: StudioSummary[];
  Marker?: string;
}
export const ListStudiosOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Studios: S.optional(StudioSummaryList),
    Marker: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListStudiosOutput",
}) as any as S.Schema<ListStudiosOutput>;
export interface ListStudioSessionMappingsInput {
  StudioId?: string;
  IdentityType?: IdentityType;
  Marker?: string;
}
export const ListStudioSessionMappingsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StudioId: S.optional(S.String),
    IdentityType: S.optional(IdentityType),
    Marker: S.optional(S.String),
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
  identifier: "ListStudioSessionMappingsInput",
}) as any as S.Schema<ListStudioSessionMappingsInput>;
export interface SessionMappingSummary {
  StudioId?: string;
  IdentityId?: string;
  IdentityName?: string;
  IdentityType?: IdentityType;
  SessionPolicyArn?: string;
  CreationTime?: Date;
}
export const SessionMappingSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StudioId: S.optional(S.String),
    IdentityId: S.optional(S.String),
    IdentityName: S.optional(S.String),
    IdentityType: S.optional(IdentityType),
    SessionPolicyArn: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "SessionMappingSummary",
}) as any as S.Schema<SessionMappingSummary>;
export type SessionMappingSummaryList = SessionMappingSummary[];
export const SessionMappingSummaryList = /*@__PURE__*/ S.Array(
  SessionMappingSummary,
);
export interface ListStudioSessionMappingsOutput {
  SessionMappings?: SessionMappingSummary[];
  Marker?: string;
}
export const ListStudioSessionMappingsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SessionMappings: S.optional(SessionMappingSummaryList),
    Marker: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListStudioSessionMappingsOutput",
}) as any as S.Schema<ListStudioSessionMappingsOutput>;
export interface ListSupportedInstanceTypesInput {
  ReleaseLabel?: string;
  Marker?: string;
}
export const ListSupportedInstanceTypesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReleaseLabel: S.optional(S.String),
    Marker: S.optional(S.String),
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
  identifier: "ListSupportedInstanceTypesInput",
}) as any as S.Schema<ListSupportedInstanceTypesInput>;
export interface SupportedInstanceType {
  Type?: string;
  MemoryGB?: number;
  StorageGB?: number;
  VCPU?: number;
  Is64BitsOnly?: boolean;
  InstanceFamilyId?: string;
  EbsOptimizedAvailable?: boolean;
  EbsOptimizedByDefault?: boolean;
  NumberOfDisks?: number;
  EbsStorageOnly?: boolean;
  Architecture?: string;
}
export const SupportedInstanceType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(S.String),
    MemoryGB: S.optional(S.Number),
    StorageGB: S.optional(S.Number),
    VCPU: S.optional(S.Number),
    Is64BitsOnly: S.optional(S.Boolean),
    InstanceFamilyId: S.optional(S.String),
    EbsOptimizedAvailable: S.optional(S.Boolean),
    EbsOptimizedByDefault: S.optional(S.Boolean),
    NumberOfDisks: S.optional(S.Number),
    EbsStorageOnly: S.optional(S.Boolean),
    Architecture: S.optional(S.String),
  }),
).annotate({
  identifier: "SupportedInstanceType",
}) as any as S.Schema<SupportedInstanceType>;
export type SupportedInstanceTypesList = SupportedInstanceType[];
export const SupportedInstanceTypesList = /*@__PURE__*/ S.Array(
  SupportedInstanceType,
);
export interface ListSupportedInstanceTypesOutput {
  SupportedInstanceTypes?: SupportedInstanceType[];
  Marker?: string;
}
export const ListSupportedInstanceTypesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SupportedInstanceTypes: S.optional(SupportedInstanceTypesList),
    Marker: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListSupportedInstanceTypesOutput",
}) as any as S.Schema<ListSupportedInstanceTypesOutput>;
export interface ModifyClusterInput {
  ClusterId?: string;
  StepConcurrencyLevel?: number;
  ExtendedSupport?: boolean;
}
export const ModifyClusterInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterId: S.optional(S.String),
    StepConcurrencyLevel: S.optional(S.Number),
    ExtendedSupport: S.optional(S.Boolean),
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
  identifier: "ModifyClusterInput",
}) as any as S.Schema<ModifyClusterInput>;
export interface ModifyClusterOutput {
  StepConcurrencyLevel?: number;
  ExtendedSupport?: boolean;
}
export const ModifyClusterOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StepConcurrencyLevel: S.optional(S.Number),
    ExtendedSupport: S.optional(S.Boolean),
  }).pipe(ns),
).annotate({
  identifier: "ModifyClusterOutput",
}) as any as S.Schema<ModifyClusterOutput>;
export interface InstanceFleetModifyConfig {
  InstanceFleetId?: string;
  TargetOnDemandCapacity?: number;
  TargetSpotCapacity?: number;
  ResizeSpecifications?: InstanceFleetResizingSpecifications;
  InstanceTypeConfigs?: InstanceTypeConfig[];
  Context?: string;
}
export const InstanceFleetModifyConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstanceFleetId: S.optional(S.String),
    TargetOnDemandCapacity: S.optional(S.Number),
    TargetSpotCapacity: S.optional(S.Number),
    ResizeSpecifications: S.optional(InstanceFleetResizingSpecifications),
    InstanceTypeConfigs: S.optional(InstanceTypeConfigList),
    Context: S.optional(S.String),
  }),
).annotate({
  identifier: "InstanceFleetModifyConfig",
}) as any as S.Schema<InstanceFleetModifyConfig>;
export interface ModifyInstanceFleetInput {
  ClusterId?: string;
  InstanceFleet?: InstanceFleetModifyConfig;
}
export const ModifyInstanceFleetInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterId: S.optional(S.String),
    InstanceFleet: S.optional(InstanceFleetModifyConfig),
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
  identifier: "ModifyInstanceFleetInput",
}) as any as S.Schema<ModifyInstanceFleetInput>;
export interface ModifyInstanceFleetResponse {}
export const ModifyInstanceFleetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "ModifyInstanceFleetResponse",
}) as any as S.Schema<ModifyInstanceFleetResponse>;
export type EC2InstanceIdsToTerminateList = string[];
export const EC2InstanceIdsToTerminateList = /*@__PURE__*/ S.Array(S.String);
export type ReconfigurationType = "OVERWRITE" | "MERGE" | (string & {});
export const ReconfigurationType = S.String;

export interface InstanceGroupModifyConfig {
  InstanceGroupId?: string;
  InstanceCount?: number;
  EC2InstanceIdsToTerminate?: string[];
  ShrinkPolicy?: ShrinkPolicy;
  ReconfigurationType?: ReconfigurationType;
  Configurations?: Configuration[];
}
export const InstanceGroupModifyConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstanceGroupId: S.optional(S.String),
    InstanceCount: S.optional(S.Number),
    EC2InstanceIdsToTerminate: S.optional(EC2InstanceIdsToTerminateList),
    ShrinkPolicy: S.optional(ShrinkPolicy),
    ReconfigurationType: S.optional(ReconfigurationType),
    Configurations: S.optional(ConfigurationList),
  }),
).annotate({
  identifier: "InstanceGroupModifyConfig",
}) as any as S.Schema<InstanceGroupModifyConfig>;
export type InstanceGroupModifyConfigList = InstanceGroupModifyConfig[];
export const InstanceGroupModifyConfigList = /*@__PURE__*/ S.Array(
  InstanceGroupModifyConfig,
);
export interface ModifyInstanceGroupsInput {
  ClusterId?: string;
  InstanceGroups?: InstanceGroupModifyConfig[];
}
export const ModifyInstanceGroupsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterId: S.optional(S.String),
    InstanceGroups: S.optional(InstanceGroupModifyConfigList),
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
  identifier: "ModifyInstanceGroupsInput",
}) as any as S.Schema<ModifyInstanceGroupsInput>;
export interface ModifyInstanceGroupsResponse {}
export const ModifyInstanceGroupsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "ModifyInstanceGroupsResponse",
}) as any as S.Schema<ModifyInstanceGroupsResponse>;
export interface PutAutoScalingPolicyInput {
  ClusterId?: string;
  InstanceGroupId?: string;
  AutoScalingPolicy?: AutoScalingPolicy;
}
export const PutAutoScalingPolicyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterId: S.optional(S.String),
    InstanceGroupId: S.optional(S.String),
    AutoScalingPolicy: S.optional(AutoScalingPolicy),
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
  identifier: "PutAutoScalingPolicyInput",
}) as any as S.Schema<PutAutoScalingPolicyInput>;
export interface PutAutoScalingPolicyOutput {
  ClusterId?: string;
  InstanceGroupId?: string;
  AutoScalingPolicy?: AutoScalingPolicyDescription & {
    Constraints: ScalingConstraints & {
      MinCapacity: number;
      MaxCapacity: number;
    };
    Rules: (ScalingRule & {
      Name: string;
      Action: ScalingAction & {
        SimpleScalingPolicyConfiguration: SimpleScalingPolicyConfiguration & {
          ScalingAdjustment: number;
        };
      };
      Trigger: ScalingTrigger & {
        CloudWatchAlarmDefinition: CloudWatchAlarmDefinition & {
          ComparisonOperator: ComparisonOperator;
          MetricName: string;
          Period: number;
          Threshold: NonNegativeDouble;
        };
      };
    })[];
  };
  ClusterArn?: string;
}
export const PutAutoScalingPolicyOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterId: S.optional(S.String),
    InstanceGroupId: S.optional(S.String),
    AutoScalingPolicy: S.optional(AutoScalingPolicyDescription),
    ClusterArn: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "PutAutoScalingPolicyOutput",
}) as any as S.Schema<PutAutoScalingPolicyOutput>;
export interface PutAutoTerminationPolicyInput {
  ClusterId?: string;
  AutoTerminationPolicy?: AutoTerminationPolicy;
}
export const PutAutoTerminationPolicyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterId: S.optional(S.String),
    AutoTerminationPolicy: S.optional(AutoTerminationPolicy),
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
  identifier: "PutAutoTerminationPolicyInput",
}) as any as S.Schema<PutAutoTerminationPolicyInput>;
export interface PutAutoTerminationPolicyOutput {}
export const PutAutoTerminationPolicyOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "PutAutoTerminationPolicyOutput",
}) as any as S.Schema<PutAutoTerminationPolicyOutput>;
export interface PutBlockPublicAccessConfigurationInput {
  BlockPublicAccessConfiguration?: BlockPublicAccessConfiguration;
}
export const PutBlockPublicAccessConfigurationInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      BlockPublicAccessConfiguration: S.optional(
        BlockPublicAccessConfiguration,
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
  identifier: "PutBlockPublicAccessConfigurationInput",
}) as any as S.Schema<PutBlockPublicAccessConfigurationInput>;
export interface PutBlockPublicAccessConfigurationOutput {}
export const PutBlockPublicAccessConfigurationOutput = /*@__PURE__*/ S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "PutBlockPublicAccessConfigurationOutput",
}) as any as S.Schema<PutBlockPublicAccessConfigurationOutput>;
export interface PutManagedScalingPolicyInput {
  ClusterId?: string;
  ManagedScalingPolicy?: ManagedScalingPolicy;
}
export const PutManagedScalingPolicyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterId: S.optional(S.String),
    ManagedScalingPolicy: S.optional(ManagedScalingPolicy),
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
  identifier: "PutManagedScalingPolicyInput",
}) as any as S.Schema<PutManagedScalingPolicyInput>;
export interface PutManagedScalingPolicyOutput {}
export const PutManagedScalingPolicyOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "PutManagedScalingPolicyOutput",
}) as any as S.Schema<PutManagedScalingPolicyOutput>;
export interface RemoveAutoScalingPolicyInput {
  ClusterId?: string;
  InstanceGroupId?: string;
}
export const RemoveAutoScalingPolicyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterId: S.optional(S.String),
    InstanceGroupId: S.optional(S.String),
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
  identifier: "RemoveAutoScalingPolicyInput",
}) as any as S.Schema<RemoveAutoScalingPolicyInput>;
export interface RemoveAutoScalingPolicyOutput {}
export const RemoveAutoScalingPolicyOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "RemoveAutoScalingPolicyOutput",
}) as any as S.Schema<RemoveAutoScalingPolicyOutput>;
export interface RemoveAutoTerminationPolicyInput {
  ClusterId?: string;
}
export const RemoveAutoTerminationPolicyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ClusterId: S.optional(S.String) }).pipe(
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
  identifier: "RemoveAutoTerminationPolicyInput",
}) as any as S.Schema<RemoveAutoTerminationPolicyInput>;
export interface RemoveAutoTerminationPolicyOutput {}
export const RemoveAutoTerminationPolicyOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "RemoveAutoTerminationPolicyOutput",
}) as any as S.Schema<RemoveAutoTerminationPolicyOutput>;
export interface RemoveManagedScalingPolicyInput {
  ClusterId?: string;
}
export const RemoveManagedScalingPolicyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ClusterId: S.optional(S.String) }).pipe(
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
  identifier: "RemoveManagedScalingPolicyInput",
}) as any as S.Schema<RemoveManagedScalingPolicyInput>;
export interface RemoveManagedScalingPolicyOutput {}
export const RemoveManagedScalingPolicyOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "RemoveManagedScalingPolicyOutput",
}) as any as S.Schema<RemoveManagedScalingPolicyOutput>;
export interface RemoveTagsInput {
  ResourceId?: string;
  TagKeys?: string[];
  ClusterId?: string;
}
export const RemoveTagsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceId: S.optional(S.String),
    TagKeys: S.optional(StringList),
    ClusterId: S.optional(S.String),
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
  identifier: "RemoveTagsInput",
}) as any as S.Schema<RemoveTagsInput>;
export interface RemoveTagsOutput {}
export const RemoveTagsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "RemoveTagsOutput",
}) as any as S.Schema<RemoveTagsOutput>;
export type InstanceFleetConfigList = InstanceFleetConfig[];
export const InstanceFleetConfigList =
  /*@__PURE__*/ S.Array(InstanceFleetConfig);
export type SecurityGroupsList = string[];
export const SecurityGroupsList = /*@__PURE__*/ S.Array(S.String);
export interface JobFlowInstancesConfig {
  MasterInstanceType?: string;
  SlaveInstanceType?: string;
  InstanceCount?: number;
  InstanceGroups?: InstanceGroupConfig[];
  InstanceFleets?: InstanceFleetConfig[];
  Ec2KeyName?: string;
  Placement?: PlacementType;
  KeepJobFlowAliveWhenNoSteps?: boolean;
  TerminationProtected?: boolean;
  UnhealthyNodeReplacement?: boolean;
  HadoopVersion?: string;
  Ec2SubnetId?: string;
  Ec2SubnetIds?: string[];
  EmrManagedMasterSecurityGroup?: string;
  EmrManagedSlaveSecurityGroup?: string;
  ServiceAccessSecurityGroup?: string;
  AdditionalMasterSecurityGroups?: string[];
  AdditionalSlaveSecurityGroups?: string[];
}
export const JobFlowInstancesConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MasterInstanceType: S.optional(S.String),
    SlaveInstanceType: S.optional(S.String),
    InstanceCount: S.optional(S.Number),
    InstanceGroups: S.optional(InstanceGroupConfigList),
    InstanceFleets: S.optional(InstanceFleetConfigList),
    Ec2KeyName: S.optional(S.String),
    Placement: S.optional(PlacementType),
    KeepJobFlowAliveWhenNoSteps: S.optional(S.Boolean),
    TerminationProtected: S.optional(S.Boolean),
    UnhealthyNodeReplacement: S.optional(S.Boolean),
    HadoopVersion: S.optional(S.String),
    Ec2SubnetId: S.optional(S.String),
    Ec2SubnetIds: S.optional(XmlStringMaxLen256List),
    EmrManagedMasterSecurityGroup: S.optional(S.String),
    EmrManagedSlaveSecurityGroup: S.optional(S.String),
    ServiceAccessSecurityGroup: S.optional(S.String),
    AdditionalMasterSecurityGroups: S.optional(SecurityGroupsList),
    AdditionalSlaveSecurityGroups: S.optional(SecurityGroupsList),
  }),
).annotate({
  identifier: "JobFlowInstancesConfig",
}) as any as S.Schema<JobFlowInstancesConfig>;
export type BootstrapActionConfigList = BootstrapActionConfig[];
export const BootstrapActionConfigList = /*@__PURE__*/ S.Array(
  BootstrapActionConfig,
);
export interface SupportedProductConfig {
  Name?: string;
  Args?: string[];
}
export const SupportedProductConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), Args: S.optional(XmlStringList) }),
).annotate({
  identifier: "SupportedProductConfig",
}) as any as S.Schema<SupportedProductConfig>;
export type NewSupportedProductsList = SupportedProductConfig[];
export const NewSupportedProductsList = /*@__PURE__*/ S.Array(
  SupportedProductConfig,
);
export interface RunJobFlowInput {
  Name?: string;
  LogUri?: string;
  LogEncryptionKmsKeyId?: string;
  AdditionalInfo?: string;
  AmiVersion?: string;
  ReleaseLabel?: string;
  Instances?: JobFlowInstancesConfig;
  Steps?: StepConfig[];
  StepExecutionRoleArn?: string;
  BootstrapActions?: BootstrapActionConfig[];
  SupportedProducts?: string[];
  NewSupportedProducts?: SupportedProductConfig[];
  Applications?: Application[];
  Configurations?: Configuration[];
  VisibleToAllUsers?: boolean;
  JobFlowRole?: string;
  ServiceRole?: string;
  Tags?: Tag[];
  SecurityConfiguration?: string;
  AutoScalingRole?: string;
  ScaleDownBehavior?: ScaleDownBehavior;
  CustomAmiId?: string;
  EbsRootVolumeSize?: number;
  RepoUpgradeOnBoot?: RepoUpgradeOnBoot;
  KerberosAttributes?: KerberosAttributes;
  StepConcurrencyLevel?: number;
  ManagedScalingPolicy?: ManagedScalingPolicy;
  PlacementGroupConfigs?: PlacementGroupConfig[];
  AutoTerminationPolicy?: AutoTerminationPolicy;
  OSReleaseLabel?: string;
  EbsRootVolumeIops?: number;
  EbsRootVolumeThroughput?: number;
  ExtendedSupport?: boolean;
  MonitoringConfiguration?: MonitoringConfiguration;
  SessionEnabled?: boolean;
}
export const RunJobFlowInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    LogUri: S.optional(S.String),
    LogEncryptionKmsKeyId: S.optional(S.String),
    AdditionalInfo: S.optional(S.String),
    AmiVersion: S.optional(S.String),
    ReleaseLabel: S.optional(S.String),
    Instances: S.optional(JobFlowInstancesConfig),
    Steps: S.optional(StepConfigList),
    StepExecutionRoleArn: S.optional(S.String),
    BootstrapActions: S.optional(BootstrapActionConfigList),
    SupportedProducts: S.optional(SupportedProductsList),
    NewSupportedProducts: S.optional(NewSupportedProductsList),
    Applications: S.optional(ApplicationList),
    Configurations: S.optional(ConfigurationList),
    VisibleToAllUsers: S.optional(S.Boolean),
    JobFlowRole: S.optional(S.String),
    ServiceRole: S.optional(S.String),
    Tags: S.optional(TagList),
    SecurityConfiguration: S.optional(S.String),
    AutoScalingRole: S.optional(S.String),
    ScaleDownBehavior: S.optional(ScaleDownBehavior),
    CustomAmiId: S.optional(S.String),
    EbsRootVolumeSize: S.optional(S.Number),
    RepoUpgradeOnBoot: S.optional(RepoUpgradeOnBoot),
    KerberosAttributes: S.optional(KerberosAttributes),
    StepConcurrencyLevel: S.optional(S.Number),
    ManagedScalingPolicy: S.optional(ManagedScalingPolicy),
    PlacementGroupConfigs: S.optional(PlacementGroupConfigList),
    AutoTerminationPolicy: S.optional(AutoTerminationPolicy),
    OSReleaseLabel: S.optional(S.String),
    EbsRootVolumeIops: S.optional(S.Number),
    EbsRootVolumeThroughput: S.optional(S.Number),
    ExtendedSupport: S.optional(S.Boolean),
    MonitoringConfiguration: S.optional(MonitoringConfiguration),
    SessionEnabled: S.optional(S.Boolean),
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
  identifier: "RunJobFlowInput",
}) as any as S.Schema<RunJobFlowInput>;
export interface RunJobFlowOutput {
  JobFlowId?: string;
  ClusterArn?: string;
}
export const RunJobFlowOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobFlowId: S.optional(S.String),
    ClusterArn: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "RunJobFlowOutput",
}) as any as S.Schema<RunJobFlowOutput>;
export interface SetKeepJobFlowAliveWhenNoStepsInput {
  JobFlowIds?: string[];
  KeepJobFlowAliveWhenNoSteps?: boolean;
}
export const SetKeepJobFlowAliveWhenNoStepsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobFlowIds: S.optional(XmlStringList),
    KeepJobFlowAliveWhenNoSteps: S.optional(S.Boolean),
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
  identifier: "SetKeepJobFlowAliveWhenNoStepsInput",
}) as any as S.Schema<SetKeepJobFlowAliveWhenNoStepsInput>;
export interface SetKeepJobFlowAliveWhenNoStepsResponse {}
export const SetKeepJobFlowAliveWhenNoStepsResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "SetKeepJobFlowAliveWhenNoStepsResponse",
}) as any as S.Schema<SetKeepJobFlowAliveWhenNoStepsResponse>;
export interface SetTerminationProtectionInput {
  JobFlowIds?: string[];
  TerminationProtected?: boolean;
}
export const SetTerminationProtectionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobFlowIds: S.optional(XmlStringList),
    TerminationProtected: S.optional(S.Boolean),
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
  identifier: "SetTerminationProtectionInput",
}) as any as S.Schema<SetTerminationProtectionInput>;
export interface SetTerminationProtectionResponse {}
export const SetTerminationProtectionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "SetTerminationProtectionResponse",
}) as any as S.Schema<SetTerminationProtectionResponse>;
export interface SetUnhealthyNodeReplacementInput {
  JobFlowIds?: string[];
  UnhealthyNodeReplacement?: boolean;
}
export const SetUnhealthyNodeReplacementInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobFlowIds: S.optional(XmlStringList),
    UnhealthyNodeReplacement: S.optional(S.Boolean),
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
  identifier: "SetUnhealthyNodeReplacementInput",
}) as any as S.Schema<SetUnhealthyNodeReplacementInput>;
export interface SetUnhealthyNodeReplacementResponse {}
export const SetUnhealthyNodeReplacementResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "SetUnhealthyNodeReplacementResponse",
}) as any as S.Schema<SetUnhealthyNodeReplacementResponse>;
export interface SetVisibleToAllUsersInput {
  JobFlowIds?: string[];
  VisibleToAllUsers?: boolean;
}
export const SetVisibleToAllUsersInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobFlowIds: S.optional(XmlStringList),
    VisibleToAllUsers: S.optional(S.Boolean),
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
  identifier: "SetVisibleToAllUsersInput",
}) as any as S.Schema<SetVisibleToAllUsersInput>;
export interface SetVisibleToAllUsersResponse {}
export const SetVisibleToAllUsersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "SetVisibleToAllUsersResponse",
}) as any as S.Schema<SetVisibleToAllUsersResponse>;
export interface NotebookS3LocationFromInput {
  Bucket?: string;
  Key?: string;
}
export const NotebookS3LocationFromInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Bucket: S.optional(S.String), Key: S.optional(S.String) }),
).annotate({
  identifier: "NotebookS3LocationFromInput",
}) as any as S.Schema<NotebookS3LocationFromInput>;
export interface OutputNotebookS3LocationFromInput {
  Bucket?: string;
  Key?: string;
}
export const OutputNotebookS3LocationFromInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Bucket: S.optional(S.String), Key: S.optional(S.String) }),
).annotate({
  identifier: "OutputNotebookS3LocationFromInput",
}) as any as S.Schema<OutputNotebookS3LocationFromInput>;
export interface StartNotebookExecutionInput {
  EditorId?: string;
  RelativePath?: string;
  NotebookExecutionName?: string;
  NotebookParams?: string;
  ExecutionEngine?: ExecutionEngineConfig;
  ServiceRole?: string;
  NotebookInstanceSecurityGroupId?: string;
  Tags?: Tag[];
  NotebookS3Location?: NotebookS3LocationFromInput;
  OutputNotebookS3Location?: OutputNotebookS3LocationFromInput;
  OutputNotebookFormat?: OutputNotebookFormat;
  EnvironmentVariables?: { [key: string]: string | undefined };
}
export const StartNotebookExecutionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EditorId: S.optional(S.String),
    RelativePath: S.optional(S.String),
    NotebookExecutionName: S.optional(S.String),
    NotebookParams: S.optional(S.String),
    ExecutionEngine: S.optional(ExecutionEngineConfig),
    ServiceRole: S.optional(S.String),
    NotebookInstanceSecurityGroupId: S.optional(S.String),
    Tags: S.optional(TagList),
    NotebookS3Location: S.optional(NotebookS3LocationFromInput),
    OutputNotebookS3Location: S.optional(OutputNotebookS3LocationFromInput),
    OutputNotebookFormat: S.optional(OutputNotebookFormat),
    EnvironmentVariables: S.optional(EnvironmentVariablesMap),
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
  identifier: "StartNotebookExecutionInput",
}) as any as S.Schema<StartNotebookExecutionInput>;
export interface StartNotebookExecutionOutput {
  NotebookExecutionId?: string;
}
export const StartNotebookExecutionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ NotebookExecutionId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "StartNotebookExecutionOutput",
}) as any as S.Schema<StartNotebookExecutionOutput>;
export type ClientRequestToken = string;
export interface StartSessionInput {
  Name?: string;
  ClusterId?: string;
  ExecutionRoleArn?: string;
  EngineConfigurations?: Configuration[];
  MonitoringConfiguration?: SessionMonitoringConfiguration;
  SessionIdleTimeoutInMinutes?: number;
  ClientRequestToken?: string;
  Tags?: Tag[];
}
export const StartSessionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    ClusterId: S.optional(S.String),
    ExecutionRoleArn: S.optional(S.String),
    EngineConfigurations: S.optional(ConfigurationList),
    MonitoringConfiguration: S.optional(SessionMonitoringConfiguration),
    SessionIdleTimeoutInMinutes: S.optional(S.Number),
    ClientRequestToken: S.optional(S.String),
    Tags: S.optional(TagList),
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
  identifier: "StartSessionInput",
}) as any as S.Schema<StartSessionInput>;
export interface StartSessionOutput {
  Id: string;
  ClusterId?: string;
  Arn?: string;
  AccountId?: string;
  State?: SessionState;
}
export const StartSessionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    ClusterId: S.optional(S.String),
    Arn: S.optional(S.String),
    AccountId: S.optional(S.String),
    State: S.optional(SessionState),
  }).pipe(ns),
).annotate({
  identifier: "StartSessionOutput",
}) as any as S.Schema<StartSessionOutput>;
export interface StopNotebookExecutionInput {
  NotebookExecutionId?: string;
}
export const StopNotebookExecutionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ NotebookExecutionId: S.optional(S.String) }).pipe(
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
  identifier: "StopNotebookExecutionInput",
}) as any as S.Schema<StopNotebookExecutionInput>;
export interface StopNotebookExecutionResponse {}
export const StopNotebookExecutionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "StopNotebookExecutionResponse",
}) as any as S.Schema<StopNotebookExecutionResponse>;
export interface TerminateJobFlowsInput {
  JobFlowIds?: string[];
}
export const TerminateJobFlowsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobFlowIds: S.optional(XmlStringList) }).pipe(
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
  identifier: "TerminateJobFlowsInput",
}) as any as S.Schema<TerminateJobFlowsInput>;
export interface TerminateJobFlowsResponse {}
export const TerminateJobFlowsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "TerminateJobFlowsResponse",
}) as any as S.Schema<TerminateJobFlowsResponse>;
export interface TerminateSessionInput {
  ClusterId?: string;
  SessionId?: string;
}
export const TerminateSessionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterId: S.optional(S.String),
    SessionId: S.optional(S.String),
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
  identifier: "TerminateSessionInput",
}) as any as S.Schema<TerminateSessionInput>;
export interface TerminateSessionOutput {
  ClusterId: string;
  SessionId: string;
  State: SessionState;
}
export const TerminateSessionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterId: S.optional(S.String),
    SessionId: S.optional(S.String),
    State: S.optional(SessionState),
  }).pipe(ns),
).annotate({
  identifier: "TerminateSessionOutput",
}) as any as S.Schema<TerminateSessionOutput>;
export interface UpdateStudioInput {
  StudioId?: string;
  Name?: string;
  Description?: string;
  SubnetIds?: string[];
  DefaultS3Location?: string;
  EncryptionKeyArn?: string;
}
export const UpdateStudioInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StudioId: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    SubnetIds: S.optional(SubnetIdList),
    DefaultS3Location: S.optional(S.String),
    EncryptionKeyArn: S.optional(S.String),
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
  identifier: "UpdateStudioInput",
}) as any as S.Schema<UpdateStudioInput>;
export interface UpdateStudioResponse {}
export const UpdateStudioResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateStudioResponse",
}) as any as S.Schema<UpdateStudioResponse>;
export interface UpdateStudioSessionMappingInput {
  StudioId?: string;
  IdentityId?: string;
  IdentityName?: string;
  IdentityType?: IdentityType;
  SessionPolicyArn?: string;
}
export const UpdateStudioSessionMappingInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StudioId: S.optional(S.String),
    IdentityId: S.optional(S.String),
    IdentityName: S.optional(S.String),
    IdentityType: S.optional(IdentityType),
    SessionPolicyArn: S.optional(S.String),
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
  identifier: "UpdateStudioSessionMappingInput",
}) as any as S.Schema<UpdateStudioSessionMappingInput>;
export interface UpdateStudioSessionMappingResponse {}
export const UpdateStudioSessionMappingResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateStudioSessionMappingResponse",
}) as any as S.Schema<UpdateStudioSessionMappingResponse>;
export type ErrorMessage = string;
export type ErrorCode = string;
export type AddInstanceFleetError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Adds an instance fleet to a running cluster.
 *
 * The instance fleet configuration is available only in Amazon EMR releases
 * 4.8.0 and later, excluding 5.0.x.
 */
export const addInstanceFleet: API.OperationMethod<
  AddInstanceFleetInput,
  AddInstanceFleetOutput,
  AddInstanceFleetError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AddInstanceFleetInput,
  output: AddInstanceFleetOutput,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddInstanceFleet",
}));

export type AddInstanceGroupsError = InternalServerError | CommonErrors;
/**
 * Adds one or more instance groups to a running cluster.
 */
export const addInstanceGroups: API.OperationMethod<
  AddInstanceGroupsInput,
  AddInstanceGroupsOutput,
  AddInstanceGroupsError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AddInstanceGroupsInput,
  output: AddInstanceGroupsOutput,
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddInstanceGroups",
}));

export type AddJobFlowStepsError = InternalServerError | CommonErrors;
/**
 * AddJobFlowSteps adds new steps to a running cluster. A maximum of 256 steps are allowed
 * in each job flow.
 *
 * If your cluster is long-running (such as a Hive data warehouse) or complex, you may
 * require more than 256 steps to process your data. You can bypass the 256-step limitation in
 * various ways, including using SSH to connect to the master node and submitting queries
 * directly to the software running on the master node, such as Hive and Hadoop.
 *
 * A step specifies the location of a JAR file stored either on the master node of the
 * cluster or in Amazon S3. Each step is performed by the main function of the main
 * class of the JAR file. The main class can be specified either in the manifest of the JAR or
 * by using the MainFunction parameter of the step.
 *
 * Amazon EMR executes each step in the order listed. For a step to be considered
 * complete, the main function must exit with a zero exit code and all Hadoop jobs started
 * while the step was running must have completed and run successfully.
 *
 * You can only add steps to a cluster that is in one of the following states: STARTING,
 * BOOTSTRAPPING, RUNNING, or WAITING.
 *
 * The string values passed into `HadoopJarStep` object cannot exceed a total
 * of 10240 characters.
 */
export const addJobFlowSteps: API.OperationMethod<
  AddJobFlowStepsInput,
  AddJobFlowStepsOutput,
  AddJobFlowStepsError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AddJobFlowStepsInput,
  output: AddJobFlowStepsOutput,
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddJobFlowSteps",
}));

export type AddTagsError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Adds tags to an Amazon EMR resource, such as a cluster or an Amazon EMR
 * Studio. Tags make it easier to associate resources in various ways, such as grouping
 * clusters to track your Amazon EMR resource allocation costs. For more information,
 * see Tag
 * Clusters.
 */
export const addTags: API.OperationMethod<
  AddTagsInput,
  AddTagsOutput,
  AddTagsError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AddTagsInput,
  output: AddTagsOutput,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddTags",
}));

export type CancelStepsError =
  | InternalServerError
  | InvalidRequestException
  | CommonErrors;
/**
 * Cancels a pending step or steps in a running cluster. Available only in Amazon EMR versions 4.8.0 and later, excluding version 5.0.0. A maximum of 256 steps are allowed in
 * each CancelSteps request. CancelSteps is idempotent but asynchronous; it does not guarantee
 * that a step will be canceled, even if the request is successfully submitted. When you use
 * Amazon EMR releases 5.28.0 and later, you can cancel steps that are in a
 * `PENDING` or `RUNNING` state. In earlier versions of Amazon EMR, you can only cancel steps that are in a `PENDING` state.
 */
export const cancelSteps: API.OperationMethod<
  CancelStepsInput,
  CancelStepsOutput,
  CancelStepsError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelStepsInput,
  output: CancelStepsOutput,
  errors: [InternalServerError, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelSteps",
}));

export type CreatePersistentAppUIError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Creates a persistent application user interface.
 */
export const createPersistentAppUI: API.OperationMethod<
  CreatePersistentAppUIInput,
  CreatePersistentAppUIOutput,
  CreatePersistentAppUIError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePersistentAppUIInput,
  output: CreatePersistentAppUIOutput,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePersistentAppUI",
}));

export type CreateSecurityConfigurationError =
  | InternalServerException
  | InvalidRequestException
  | SecurityConfigurationAlreadyExists
  | CommonErrors;
/**
 * Creates a security configuration, which is stored in the service and can be specified
 * when a cluster is created.
 */
export const createSecurityConfiguration: API.OperationMethod<
  CreateSecurityConfigurationInput,
  CreateSecurityConfigurationOutput,
  CreateSecurityConfigurationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSecurityConfigurationInput,
  output: CreateSecurityConfigurationOutput,
  errors: [
    InternalServerException,
    InvalidRequestException,
    SecurityConfigurationAlreadyExists,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSecurityConfiguration",
}));

export type CreateStudioError =
  | InternalServerException
  | InvalidRequestException
  | StudioServiceRoleNotAssumable
  | StudioServiceRoleMissingS3Access
  | CommonErrors;
/**
 * Creates a new Amazon EMR Studio.
 */
export const createStudio: API.OperationMethod<
  CreateStudioInput,
  CreateStudioOutput,
  CreateStudioError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateStudioInput,
  output: CreateStudioOutput,
  errors: [
    InternalServerException,
    InvalidRequestException,
    StudioServiceRoleNotAssumable,
    StudioServiceRoleMissingS3Access,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStudio",
}));

export type CreateStudioSessionMappingError =
  | InternalServerError
  | InvalidRequestException
  | CommonErrors;
/**
 * Maps a user or group to the Amazon EMR Studio specified by
 * `StudioId`, and applies a session policy to refine Studio permissions for that
 * user or group. Use `CreateStudioSessionMapping` to assign users to a Studio when
 * you use IAM Identity Center authentication. For instructions on how to assign users to a
 * Studio when you use IAM authentication, see Assign a user or group to your EMR Studio.
 */
export const createStudioSessionMapping: API.OperationMethod<
  CreateStudioSessionMappingInput,
  CreateStudioSessionMappingResponse,
  CreateStudioSessionMappingError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateStudioSessionMappingInput,
  output: CreateStudioSessionMappingResponse,
  errors: [InternalServerError, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStudioSessionMapping",
}));

export type DeleteSecurityConfigurationError =
  | InternalServerException
  | InvalidRequestException
  | SecurityConfigurationNotFound
  | CommonErrors;
/**
 * Deletes a security configuration.
 */
export const deleteSecurityConfiguration: API.OperationMethod<
  DeleteSecurityConfigurationInput,
  DeleteSecurityConfigurationOutput,
  DeleteSecurityConfigurationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSecurityConfigurationInput,
  output: DeleteSecurityConfigurationOutput,
  errors: [
    InternalServerException,
    InvalidRequestException,
    SecurityConfigurationNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSecurityConfiguration",
}));

export type DeleteStudioError =
  | InternalServerException
  | InvalidRequestException
  | StudioNotFound
  | CommonErrors;
/**
 * Removes an Amazon EMR Studio from the Studio metadata store.
 */
export const deleteStudio: API.OperationMethod<
  DeleteStudioInput,
  DeleteStudioResponse,
  DeleteStudioError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteStudioInput,
  output: DeleteStudioResponse,
  errors: [InternalServerException, InvalidRequestException, StudioNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStudio",
}));

export type DeleteStudioSessionMappingError =
  | InternalServerError
  | InvalidRequestException
  | CommonErrors;
/**
 * Removes a user or group from an Amazon EMR Studio.
 */
export const deleteStudioSessionMapping: API.OperationMethod<
  DeleteStudioSessionMappingInput,
  DeleteStudioSessionMappingResponse,
  DeleteStudioSessionMappingError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteStudioSessionMappingInput,
  output: DeleteStudioSessionMappingResponse,
  errors: [InternalServerError, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStudioSessionMapping",
}));

export type DescribeClusterError =
  | InternalServerException
  | InvalidRequestException
  | ClusterNotFound
  | CommonErrors;
/**
 * Provides cluster-level details including status, hardware and software configuration,
 * VPC settings, and so on.
 */
export const describeCluster: API.OperationMethod<
  DescribeClusterInput,
  DescribeClusterOutput,
  DescribeClusterError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeClusterInput,
  output: DescribeClusterOutput,
  errors: [InternalServerException, InvalidRequestException, ClusterNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCluster",
}));

export type DescribeJobFlowsError = InternalServerError | CommonErrors;
/**
 * This API is no longer supported and will eventually be removed. We recommend you use
 * ListClusters, DescribeCluster, ListSteps, ListInstanceGroups and ListBootstrapActions instead.
 *
 * DescribeJobFlows returns a list of job flows that match all of the supplied parameters.
 * The parameters can include a list of job flow IDs, job flow states, and restrictions on job
 * flow creation date and time.
 *
 * Regardless of supplied parameters, only job flows created within the last two months are
 * returned.
 *
 * If no parameters are supplied, then job flows matching either of the following criteria
 * are returned:
 *
 * - Job flows created and completed in the last two weeks
 *
 * - Job flows created within the last two months that are in one of the following
 * states: `RUNNING`, `WAITING`, `SHUTTING_DOWN`,
 * `STARTING`
 *
 * Amazon EMR can return a maximum of 512 job flow descriptions.
 */
export const describeJobFlows: API.OperationMethod<
  DescribeJobFlowsInput,
  DescribeJobFlowsOutput,
  DescribeJobFlowsError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeJobFlowsInput,
  output: DescribeJobFlowsOutput,
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeJobFlows",
}));

export type DescribeNotebookExecutionError =
  | InternalServerError
  | InvalidRequestException
  | CommonErrors;
/**
 * Provides details of a notebook execution.
 */
export const describeNotebookExecution: API.OperationMethod<
  DescribeNotebookExecutionInput,
  DescribeNotebookExecutionOutput,
  DescribeNotebookExecutionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeNotebookExecutionInput,
  output: DescribeNotebookExecutionOutput,
  errors: [InternalServerError, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeNotebookExecution",
}));

export type DescribePersistentAppUIError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Describes a persistent application user interface.
 */
export const describePersistentAppUI: API.OperationMethod<
  DescribePersistentAppUIInput,
  DescribePersistentAppUIOutput,
  DescribePersistentAppUIError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribePersistentAppUIInput,
  output: DescribePersistentAppUIOutput,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePersistentAppUI",
}));

export type DescribeReleaseLabelError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Provides Amazon EMR release label details, such as the releases available the
 * Region where the API request is run, and the available applications for a specific Amazon EMR release label. Can also list Amazon EMR releases that support a
 * specified version of Spark.
 */
export const describeReleaseLabel: API.OperationMethod<
  DescribeReleaseLabelInput,
  DescribeReleaseLabelOutput,
  DescribeReleaseLabelError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeReleaseLabelInput,
  output: DescribeReleaseLabelOutput,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReleaseLabel",
}));

export type DescribeSecurityConfigurationError =
  | InternalServerException
  | InvalidRequestException
  | SecurityConfigurationNotFound
  | CommonErrors;
/**
 * Provides the details of a security configuration by returning the configuration
 * JSON.
 */
export const describeSecurityConfiguration: API.OperationMethod<
  DescribeSecurityConfigurationInput,
  DescribeSecurityConfigurationOutput,
  DescribeSecurityConfigurationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeSecurityConfigurationInput,
  output: DescribeSecurityConfigurationOutput,
  errors: [
    InternalServerException,
    InvalidRequestException,
    SecurityConfigurationNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSecurityConfiguration",
}));

export type DescribeStepError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Provides more detail about the cluster step.
 */
export const describeStep: API.OperationMethod<
  DescribeStepInput,
  DescribeStepOutput,
  DescribeStepError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeStepInput,
  output: DescribeStepOutput,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStep",
}));

export type DescribeStudioError =
  | InternalServerException
  | InvalidRequestException
  | StudioNotFound
  | CommonErrors;
/**
 * Returns details for the specified Amazon EMR Studio including ID, Name, VPC,
 * Studio access URL, and so on.
 */
export const describeStudio: API.OperationMethod<
  DescribeStudioInput,
  DescribeStudioOutput,
  DescribeStudioError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeStudioInput,
  output: DescribeStudioOutput,
  errors: [InternalServerException, InvalidRequestException, StudioNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStudio",
}));

export type GetAutoTerminationPolicyError = CommonErrors;
/**
 * Returns the auto-termination policy for an Amazon EMR cluster.
 */
export const getAutoTerminationPolicy: API.OperationMethod<
  GetAutoTerminationPolicyInput,
  GetAutoTerminationPolicyOutput,
  GetAutoTerminationPolicyError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAutoTerminationPolicyInput,
  output: GetAutoTerminationPolicyOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAutoTerminationPolicy",
}));

export type GetBlockPublicAccessConfigurationError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Returns the Amazon EMR block public access configuration for your Amazon Web Services account in the current Region. For more information see Configure Block
 * Public Access for Amazon EMR in the Amazon EMR
 * Management Guide.
 */
export const getBlockPublicAccessConfiguration: API.OperationMethod<
  GetBlockPublicAccessConfigurationInput,
  GetBlockPublicAccessConfigurationOutput,
  GetBlockPublicAccessConfigurationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetBlockPublicAccessConfigurationInput,
  output: GetBlockPublicAccessConfigurationOutput,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBlockPublicAccessConfiguration",
}));

export type GetClusterSessionCredentialsError =
  | InternalServerError
  | InvalidRequestException
  | CommonErrors;
/**
 * Provides temporary, HTTP basic credentials that are associated with a given runtime
 * IAM role and used by a cluster with fine-grained access control
 * activated. You can use these credentials to connect to cluster endpoints that support
 * username and password authentication.
 */
export const getClusterSessionCredentials: API.OperationMethod<
  GetClusterSessionCredentialsInput,
  GetClusterSessionCredentialsOutput,
  GetClusterSessionCredentialsError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetClusterSessionCredentialsInput,
  output: GetClusterSessionCredentialsOutput,
  errors: [InternalServerError, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetClusterSessionCredentials",
}));

export type GetManagedScalingPolicyError = CommonErrors;
/**
 * Fetches the attached managed scaling policy for an Amazon EMR cluster.
 */
export const getManagedScalingPolicy: API.OperationMethod<
  GetManagedScalingPolicyInput,
  GetManagedScalingPolicyOutput,
  GetManagedScalingPolicyError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetManagedScalingPolicyInput,
  output: GetManagedScalingPolicyOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetManagedScalingPolicy",
}));

export type GetOnClusterAppUIPresignedURLError =
  | InternalServerError
  | InvalidRequestException
  | CommonErrors;
/**
 * The presigned URL properties for the cluster's application user interface.
 */
export const getOnClusterAppUIPresignedURL: API.OperationMethod<
  GetOnClusterAppUIPresignedURLInput,
  GetOnClusterAppUIPresignedURLOutput,
  GetOnClusterAppUIPresignedURLError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetOnClusterAppUIPresignedURLInput,
  output: GetOnClusterAppUIPresignedURLOutput,
  errors: [InternalServerError, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOnClusterAppUIPresignedURL",
}));

export type GetPersistentAppUIPresignedURLError =
  | InternalServerError
  | InvalidRequestException
  | CommonErrors;
/**
 * The presigned URL properties for the cluster's application user interface.
 */
export const getPersistentAppUIPresignedURL: API.OperationMethod<
  GetPersistentAppUIPresignedURLInput,
  GetPersistentAppUIPresignedURLOutput,
  GetPersistentAppUIPresignedURLError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPersistentAppUIPresignedURLInput,
  output: GetPersistentAppUIPresignedURLOutput,
  errors: [InternalServerError, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPersistentAppUIPresignedURL",
}));

export type GetSessionError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Returns detailed information about a session.
 */
export const getSession: API.OperationMethod<
  GetSessionInput,
  GetSessionOutput,
  GetSessionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSessionInput,
  output: GetSessionOutput,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSession",
}));

export type GetSessionEndpointError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Returns the Spark Connect endpoint URL and a time-limited authentication token for the specified session. Use the endpoint and token to connect a PySpark client to the session. Call this operation again when the token expires to obtain a new one.
 */
export const getSessionEndpoint: API.OperationMethod<
  GetSessionEndpointInput,
  GetSessionEndpointOutput,
  GetSessionEndpointError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSessionEndpointInput,
  output: GetSessionEndpointOutput,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSessionEndpoint",
}));

export type GetStudioSessionMappingError =
  | InternalServerError
  | InvalidRequestException
  | CommonErrors;
/**
 * Fetches mapping details for the specified Amazon EMR Studio and identity (user
 * or group).
 */
export const getStudioSessionMapping: API.OperationMethod<
  GetStudioSessionMappingInput,
  GetStudioSessionMappingOutput,
  GetStudioSessionMappingError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetStudioSessionMappingInput,
  output: GetStudioSessionMappingOutput,
  errors: [InternalServerError, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStudioSessionMapping",
}));

export type ListBootstrapActionsError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Provides information about the bootstrap actions associated with a cluster.
 */
export const listBootstrapActions: API.PaginatedOperationMethod<
  ListBootstrapActionsInput,
  ListBootstrapActionsOutput,
  ListBootstrapActionsError,
  Creds | HttpClient.HttpClient,
  Command
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListBootstrapActionsInput,
  output: ListBootstrapActionsOutput,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBootstrapActions",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "BootstrapActions",
  } as const,
})) as any;

export type ListClustersError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Provides the status of all clusters visible to this Amazon Web Services account. Allows
 * you to filter the list of clusters based on certain criteria; for example, filtering by
 * cluster creation date and time or by status. This call returns a maximum of 50 clusters in
 * unsorted order per call, but returns a marker to track the paging of the cluster list
 * across multiple ListClusters calls.
 */
export const listClusters: API.PaginatedOperationMethod<
  ListClustersInput,
  ListClustersOutput,
  ListClustersError,
  Creds | HttpClient.HttpClient,
  ClusterSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListClustersInput,
  output: ListClustersOutput,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListClusters",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Clusters",
  } as const,
})) as any;

export type ListInstanceFleetsError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Lists all available details about the instance fleets in a cluster.
 *
 * The instance fleet configuration is available only in Amazon EMR releases
 * 4.8.0 and later, excluding 5.0.x versions.
 */
export const listInstanceFleets: API.PaginatedOperationMethod<
  ListInstanceFleetsInput,
  ListInstanceFleetsOutput,
  ListInstanceFleetsError,
  Creds | HttpClient.HttpClient,
  InstanceFleet
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListInstanceFleetsInput,
  output: ListInstanceFleetsOutput,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInstanceFleets",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "InstanceFleets",
  } as const,
})) as any;

export type ListInstanceGroupsError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Provides all available details about the instance groups in a cluster.
 */
export const listInstanceGroups: API.PaginatedOperationMethod<
  ListInstanceGroupsInput,
  ListInstanceGroupsOutput,
  ListInstanceGroupsError,
  Creds | HttpClient.HttpClient,
  InstanceGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListInstanceGroupsInput,
  output: ListInstanceGroupsOutput,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInstanceGroups",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "InstanceGroups",
  } as const,
})) as any;

export type ListInstancesError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Provides information for all active Amazon EC2 instances and Amazon EC2
 * instances terminated in the last 30 days, up to a maximum of 2,000. Amazon EC2
 * instances in any of the following states are considered active: AWAITING_FULFILLMENT,
 * PROVISIONING, BOOTSTRAPPING, RUNNING.
 */
export const listInstances: API.PaginatedOperationMethod<
  ListInstancesInput,
  ListInstancesOutput,
  ListInstancesError,
  Creds | HttpClient.HttpClient,
  Instance
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListInstancesInput,
  output: ListInstancesOutput,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInstances",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Instances",
  } as const,
})) as any;

export type ListNotebookExecutionsError =
  | InternalServerError
  | InvalidRequestException
  | CommonErrors;
/**
 * Provides summaries of all notebook executions. You can filter the list based on multiple
 * criteria such as status, time range, and editor id. Returns a maximum of 50 notebook
 * executions and a marker to track the paging of a longer notebook execution list across
 * multiple `ListNotebookExecutions` calls.
 */
export const listNotebookExecutions: API.PaginatedOperationMethod<
  ListNotebookExecutionsInput,
  ListNotebookExecutionsOutput,
  ListNotebookExecutionsError,
  Creds | HttpClient.HttpClient,
  NotebookExecutionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListNotebookExecutionsInput,
  output: ListNotebookExecutionsOutput,
  errors: [InternalServerError, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNotebookExecutions",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "NotebookExecutions",
  } as const,
})) as any;

export type ListReleaseLabelsError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Retrieves release labels of Amazon EMR services in the Region where the API is
 * called.
 */
export const listReleaseLabels: API.PaginatedOperationMethod<
  ListReleaseLabelsInput,
  ListReleaseLabelsOutput,
  ListReleaseLabelsError,
  Creds | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListReleaseLabelsInput,
  output: ListReleaseLabelsOutput,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReleaseLabels",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSecurityConfigurationsError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Lists all the security configurations visible to this account, providing their creation
 * dates and times, and their names. This call returns a maximum of 50 clusters per call, but
 * returns a marker to track the paging of the cluster list across multiple
 * ListSecurityConfigurations calls.
 */
export const listSecurityConfigurations: API.PaginatedOperationMethod<
  ListSecurityConfigurationsInput,
  ListSecurityConfigurationsOutput,
  ListSecurityConfigurationsError,
  Creds | HttpClient.HttpClient,
  SecurityConfigurationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSecurityConfigurationsInput,
  output: ListSecurityConfigurationsOutput,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSecurityConfigurations",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "SecurityConfigurations",
  } as const,
})) as any;

export type ListSessionsError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Lists the sessions on a cluster. You can filter the results by session state. Newer sessions are returned first.
 */
export const listSessions: API.PaginatedOperationMethod<
  ListSessionsInput,
  ListSessionsOutput,
  ListSessionsError,
  Creds | HttpClient.HttpClient,
  Session
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSessionsInput,
  output: ListSessionsOutput,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSessions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Sessions",
  } as const,
})) as any;

export type ListStepsError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Provides a list of steps for the cluster in reverse order unless you specify
 * `stepIds` with the request or filter by `StepStates`. You can
 * specify a maximum of 10 `stepIDs`. The CLI automatically
 * paginates results to return a list greater than 50 steps. To return more than 50 steps
 * using the CLI, specify a `Marker`, which is a pagination token
 * that indicates the next set of steps to retrieve.
 */
export const listSteps: API.PaginatedOperationMethod<
  ListStepsInput,
  ListStepsOutput,
  ListStepsError,
  Creds | HttpClient.HttpClient,
  StepSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListStepsInput,
  output: ListStepsOutput,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSteps",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Steps",
  } as const,
})) as any;

export type ListStudiosError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Returns a list of all Amazon EMR Studios associated with the Amazon Web Services account. The list includes details such as ID, Studio Access URL, and
 * creation time for each Studio.
 */
export const listStudios: API.PaginatedOperationMethod<
  ListStudiosInput,
  ListStudiosOutput,
  ListStudiosError,
  Creds | HttpClient.HttpClient,
  StudioSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListStudiosInput,
  output: ListStudiosOutput,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStudios",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Studios",
  } as const,
})) as any;

export type ListStudioSessionMappingsError =
  | InternalServerError
  | InvalidRequestException
  | CommonErrors;
/**
 * Returns a list of all user or group session mappings for the Amazon EMR Studio
 * specified by `StudioId`.
 */
export const listStudioSessionMappings: API.PaginatedOperationMethod<
  ListStudioSessionMappingsInput,
  ListStudioSessionMappingsOutput,
  ListStudioSessionMappingsError,
  Creds | HttpClient.HttpClient,
  SessionMappingSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListStudioSessionMappingsInput,
  output: ListStudioSessionMappingsOutput,
  errors: [InternalServerError, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStudioSessionMappings",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "SessionMappings",
  } as const,
})) as any;

export type ListSupportedInstanceTypesError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * A list of the instance types that Amazon EMR supports. You can filter the
 * list by Amazon Web Services Region and Amazon EMR release.
 */
export const listSupportedInstanceTypes: API.PaginatedOperationMethod<
  ListSupportedInstanceTypesInput,
  ListSupportedInstanceTypesOutput,
  ListSupportedInstanceTypesError,
  Creds | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSupportedInstanceTypesInput,
  output: ListSupportedInstanceTypesOutput,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSupportedInstanceTypes",
  pagination: { inputToken: "Marker", outputToken: "Marker" } as const,
})) as any;

export type ModifyClusterError =
  | InternalServerError
  | InvalidRequestException
  | CommonErrors;
/**
 * Modifies the number of steps that can be executed concurrently for the cluster specified
 * using ClusterID.
 */
export const modifyCluster: API.OperationMethod<
  ModifyClusterInput,
  ModifyClusterOutput,
  ModifyClusterError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyClusterInput,
  output: ModifyClusterOutput,
  errors: [InternalServerError, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyCluster",
}));

export type ModifyInstanceFleetError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Modifies the target On-Demand and target Spot capacities for the instance fleet with the
 * specified InstanceFleetID within the cluster specified using ClusterID. The call either
 * succeeds or fails atomically.
 *
 * The instance fleet configuration is available only in Amazon EMR releases
 * 4.8.0 and later, excluding 5.0.x versions.
 */
export const modifyInstanceFleet: API.OperationMethod<
  ModifyInstanceFleetInput,
  ModifyInstanceFleetResponse,
  ModifyInstanceFleetError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyInstanceFleetInput,
  output: ModifyInstanceFleetResponse,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyInstanceFleet",
}));

export type ModifyInstanceGroupsError = InternalServerError | CommonErrors;
/**
 * ModifyInstanceGroups modifies the number of nodes and configuration settings of an
 * instance group. The input parameters include the new target instance count for the group
 * and the instance group ID. The call will either succeed or fail atomically.
 */
export const modifyInstanceGroups: API.OperationMethod<
  ModifyInstanceGroupsInput,
  ModifyInstanceGroupsResponse,
  ModifyInstanceGroupsError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyInstanceGroupsInput,
  output: ModifyInstanceGroupsResponse,
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyInstanceGroups",
}));

export type PutAutoScalingPolicyError = CommonErrors;
/**
 * Creates or updates an automatic scaling policy for a core instance group or task
 * instance group in an Amazon EMR cluster. The automatic scaling policy defines how
 * an instance group dynamically adds and terminates Amazon EC2 instances in response
 * to the value of a CloudWatch metric.
 */
export const putAutoScalingPolicy: API.OperationMethod<
  PutAutoScalingPolicyInput,
  PutAutoScalingPolicyOutput,
  PutAutoScalingPolicyError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutAutoScalingPolicyInput,
  output: PutAutoScalingPolicyOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAutoScalingPolicy",
}));

export type PutAutoTerminationPolicyError = CommonErrors;
/**
 * Auto-termination is supported in Amazon EMR releases 5.30.0 and 6.1.0 and
 * later. For more information, see Using an
 * auto-termination policy.
 *
 * Creates or updates an auto-termination policy for an Amazon EMR cluster. An
 * auto-termination policy defines the amount of idle time in seconds after which a cluster
 * automatically terminates. For alternative cluster termination options, see Control
 * cluster termination.
 */
export const putAutoTerminationPolicy: API.OperationMethod<
  PutAutoTerminationPolicyInput,
  PutAutoTerminationPolicyOutput,
  PutAutoTerminationPolicyError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutAutoTerminationPolicyInput,
  output: PutAutoTerminationPolicyOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAutoTerminationPolicy",
}));

export type PutBlockPublicAccessConfigurationError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Creates or updates an Amazon EMR block public access configuration for your
 * Amazon Web Services account in the current Region. For more information see Configure Block
 * Public Access for Amazon EMR in the Amazon EMR
 * Management Guide.
 */
export const putBlockPublicAccessConfiguration: API.OperationMethod<
  PutBlockPublicAccessConfigurationInput,
  PutBlockPublicAccessConfigurationOutput,
  PutBlockPublicAccessConfigurationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutBlockPublicAccessConfigurationInput,
  output: PutBlockPublicAccessConfigurationOutput,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutBlockPublicAccessConfiguration",
}));

export type PutManagedScalingPolicyError = CommonErrors;
/**
 * Creates or updates a managed scaling policy for an Amazon EMR cluster. The
 * managed scaling policy defines the limits for resources, such as Amazon EC2
 * instances that can be added or terminated from a cluster. The policy only applies to the
 * core and task nodes. The master node cannot be scaled after initial configuration.
 */
export const putManagedScalingPolicy: API.OperationMethod<
  PutManagedScalingPolicyInput,
  PutManagedScalingPolicyOutput,
  PutManagedScalingPolicyError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutManagedScalingPolicyInput,
  output: PutManagedScalingPolicyOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutManagedScalingPolicy",
}));

export type RemoveAutoScalingPolicyError = CommonErrors;
/**
 * Removes an automatic scaling policy from a specified instance group within an Amazon EMR cluster.
 */
export const removeAutoScalingPolicy: API.OperationMethod<
  RemoveAutoScalingPolicyInput,
  RemoveAutoScalingPolicyOutput,
  RemoveAutoScalingPolicyError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RemoveAutoScalingPolicyInput,
  output: RemoveAutoScalingPolicyOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveAutoScalingPolicy",
}));

export type RemoveAutoTerminationPolicyError = CommonErrors;
/**
 * Removes an auto-termination policy from an Amazon EMR cluster.
 */
export const removeAutoTerminationPolicy: API.OperationMethod<
  RemoveAutoTerminationPolicyInput,
  RemoveAutoTerminationPolicyOutput,
  RemoveAutoTerminationPolicyError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RemoveAutoTerminationPolicyInput,
  output: RemoveAutoTerminationPolicyOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveAutoTerminationPolicy",
}));

export type RemoveManagedScalingPolicyError = CommonErrors;
/**
 * Removes a managed scaling policy from a specified Amazon EMR cluster.
 */
export const removeManagedScalingPolicy: API.OperationMethod<
  RemoveManagedScalingPolicyInput,
  RemoveManagedScalingPolicyOutput,
  RemoveManagedScalingPolicyError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RemoveManagedScalingPolicyInput,
  output: RemoveManagedScalingPolicyOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveManagedScalingPolicy",
}));

export type RemoveTagsError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Removes tags from an Amazon EMR resource, such as a cluster or Amazon EMR Studio. Tags make it easier to associate resources in various ways, such as grouping
 * clusters to track your Amazon EMR resource allocation costs. For more information,
 * see Tag
 * Clusters.
 *
 * The following example removes the stack tag with value Prod from a cluster:
 */
export const removeTags: API.OperationMethod<
  RemoveTagsInput,
  RemoveTagsOutput,
  RemoveTagsError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RemoveTagsInput,
  output: RemoveTagsOutput,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveTags",
}));

export type RunJobFlowError = InternalServerError | CommonErrors;
/**
 * RunJobFlow creates and starts running a new cluster (job flow). The cluster runs the
 * steps specified. After the steps complete, the cluster stops and the HDFS partition is
 * lost. To prevent loss of data, configure the last step of the job flow to store results in
 * Amazon S3. If the JobFlowInstancesConfig
 * `KeepJobFlowAliveWhenNoSteps` parameter is set to `TRUE`, the cluster
 * transitions to the WAITING state rather than shutting down after the steps have completed.
 *
 * For additional protection, you can set the JobFlowInstancesConfig
 * `TerminationProtected` parameter to `TRUE` to lock the cluster and
 * prevent it from being terminated by API call, user intervention, or in the event of a job
 * flow error.
 *
 * A maximum of 256 steps are allowed in each job flow.
 *
 * If your cluster is long-running (such as a Hive data warehouse) or complex, you may
 * require more than 256 steps to process your data. You can bypass the 256-step limitation in
 * various ways, including using the SSH shell to connect to the master node and submitting
 * queries directly to the software running on the master node, such as Hive and
 * Hadoop.
 *
 * For long-running clusters, we recommend that you periodically store your results.
 *
 * The instance fleets configuration is available only in Amazon EMR releases
 * 4.8.0 and later, excluding 5.0.x versions. The RunJobFlow request can contain
 * InstanceFleets parameters or InstanceGroups parameters, but not both.
 */
export const runJobFlow: API.OperationMethod<
  RunJobFlowInput,
  RunJobFlowOutput,
  RunJobFlowError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RunJobFlowInput,
  output: RunJobFlowOutput,
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RunJobFlow",
}));

export type SetKeepJobFlowAliveWhenNoStepsError =
  | InternalServerError
  | CommonErrors;
/**
 * You can use the `SetKeepJobFlowAliveWhenNoSteps` to configure a cluster (job flow) to terminate after the step execution, i.e., all your
 * steps are executed. If you want a transient cluster that shuts down after the last of the current executing steps are completed,
 * you can configure `SetKeepJobFlowAliveWhenNoSteps` to false. If you want a long running cluster, configure `SetKeepJobFlowAliveWhenNoSteps` to true.
 *
 * For more information, see Managing Cluster Termination in the *Amazon EMR Management Guide*.
 */
export const setKeepJobFlowAliveWhenNoSteps: API.OperationMethod<
  SetKeepJobFlowAliveWhenNoStepsInput,
  SetKeepJobFlowAliveWhenNoStepsResponse,
  SetKeepJobFlowAliveWhenNoStepsError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SetKeepJobFlowAliveWhenNoStepsInput,
  output: SetKeepJobFlowAliveWhenNoStepsResponse,
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetKeepJobFlowAliveWhenNoSteps",
}));

export type SetTerminationProtectionError =
  | InternalServerError
  | JobFlowNotFound
  | CommonErrors;
/**
 * SetTerminationProtection locks a cluster (job flow) so the Amazon EC2 instances
 * in the cluster cannot be terminated by user intervention, an API call, or in the event of a
 * job-flow error. The cluster still terminates upon successful completion of the job flow.
 * Calling `SetTerminationProtection` on a cluster is similar to calling the
 * Amazon EC2
 * `DisableAPITermination` API on all Amazon EC2 instances in a
 * cluster.
 *
 * `SetTerminationProtection` is used to prevent accidental termination of a
 * cluster and to ensure that in the event of an error, the instances persist so that you can
 * recover any data stored in their ephemeral instance storage.
 *
 * To terminate a cluster that has been locked by setting
 * `SetTerminationProtection` to `true`, you must first unlock the
 * job flow by a subsequent call to `SetTerminationProtection` in which you set the
 * value to `false`.
 *
 * For more information, see Managing Cluster
 * Termination in the *Amazon EMR Management Guide*.
 */
export const setTerminationProtection: API.OperationMethod<
  SetTerminationProtectionInput,
  SetTerminationProtectionResponse,
  SetTerminationProtectionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SetTerminationProtectionInput,
  output: SetTerminationProtectionResponse,
  errors: [InternalServerError, JobFlowNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetTerminationProtection",
}));

export type SetUnhealthyNodeReplacementError =
  | InternalServerError
  | CommonErrors;
/**
 * Specify whether to enable unhealthy node replacement, which lets Amazon EMR gracefully
 * replace core nodes on a cluster if any nodes become unhealthy. For example, a node becomes
 * unhealthy if disk usage is above 90%. If unhealthy node replacement is on and `TerminationProtected` are off,
 * Amazon EMR immediately terminates the unhealthy core nodes. To use unhealthy node replacement
 * and retain unhealthy core nodes, use to turn on
 * termination protection. In such cases, Amazon EMR adds
 * the unhealthy nodes to a denylist, reducing job interruptions and failures.
 *
 * If unhealthy node replacement is on, Amazon EMR
 * notifies YARN and other applications on the cluster to stop scheduling tasks
 * with these nodes, moves the data, and then terminates the nodes.
 *
 * For more information, see graceful
 * node replacement in the *Amazon EMR Management Guide*.
 */
export const setUnhealthyNodeReplacement: API.OperationMethod<
  SetUnhealthyNodeReplacementInput,
  SetUnhealthyNodeReplacementResponse,
  SetUnhealthyNodeReplacementError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SetUnhealthyNodeReplacementInput,
  output: SetUnhealthyNodeReplacementResponse,
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetUnhealthyNodeReplacement",
}));

export type SetVisibleToAllUsersError = InternalServerError | CommonErrors;
/**
 * The SetVisibleToAllUsers parameter is no longer supported. Your cluster may be
 * visible to all users in your account. To restrict cluster access using an IAM policy, see Identity and Access
 * Management for Amazon EMR.
 *
 * Sets the Cluster$VisibleToAllUsers value for an Amazon EMR
 * cluster. When `true`, IAM principals in the Amazon Web Services account can perform Amazon EMR cluster actions that their IAM policies allow. When `false`, only the IAM
 * principal that created the cluster and the Amazon Web Services account root user can perform
 * Amazon EMR actions on the cluster, regardless of IAM permissions
 * policies attached to other IAM principals.
 *
 * This action works on running clusters. When you create a cluster, use the RunJobFlowInput$VisibleToAllUsers parameter.
 *
 * For more information, see Understanding the Amazon EMR Cluster VisibleToAllUsers Setting in the
 * *Amazon EMR Management Guide*.
 */
export const setVisibleToAllUsers: API.OperationMethod<
  SetVisibleToAllUsersInput,
  SetVisibleToAllUsersResponse,
  SetVisibleToAllUsersError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SetVisibleToAllUsersInput,
  output: SetVisibleToAllUsersResponse,
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetVisibleToAllUsers",
}));

export type StartNotebookExecutionError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Starts a notebook execution.
 */
export const startNotebookExecution: API.OperationMethod<
  StartNotebookExecutionInput,
  StartNotebookExecutionOutput,
  StartNotebookExecutionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartNotebookExecutionInput,
  output: StartNotebookExecutionOutput,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartNotebookExecution",
}));

export type StartSessionError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Creates and starts a new Spark Connect session on the specified cluster. The cluster must be in the `RUNNING` or `WAITING` state and have sessions enabled. This operation is supported in Amazon EMR Spark 8.0.0 and later.
 */
export const startSession: API.OperationMethod<
  StartSessionInput,
  StartSessionOutput,
  StartSessionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartSessionInput,
  output: StartSessionOutput,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSession",
}));

export type StopNotebookExecutionError =
  | InternalServerError
  | InvalidRequestException
  | CommonErrors;
/**
 * Stops a notebook execution.
 */
export const stopNotebookExecution: API.OperationMethod<
  StopNotebookExecutionInput,
  StopNotebookExecutionResponse,
  StopNotebookExecutionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopNotebookExecutionInput,
  output: StopNotebookExecutionResponse,
  errors: [InternalServerError, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopNotebookExecution",
}));

export type TerminateJobFlowsError =
  | InternalServerError
  | JobFlowNotFound
  | CommonErrors;
/**
 * TerminateJobFlows shuts a list of clusters (job flows) down. When a job flow is shut
 * down, any step not yet completed is canceled and the Amazon EC2 instances on which
 * the cluster is running are stopped. Any log files not already saved are uploaded to Amazon S3 if a LogUri was specified when the cluster was created.
 *
 * The maximum number of clusters allowed is 10. The call to `TerminateJobFlows`
 * is asynchronous. Depending on the configuration of the cluster, it may take up to 1-5
 * minutes for the cluster to completely terminate and release allocated resources, such as
 * Amazon EC2 instances.
 */
export const terminateJobFlows: API.OperationMethod<
  TerminateJobFlowsInput,
  TerminateJobFlowsResponse,
  TerminateJobFlowsError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TerminateJobFlowsInput,
  output: TerminateJobFlowsResponse,
  errors: [InternalServerError, JobFlowNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TerminateJobFlows",
}));

export type TerminateSessionError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Terminates an active session. After you call this operation, the session enters the `TERMINATING` state and then transitions to `TERMINATED`.
 */
export const terminateSession: API.OperationMethod<
  TerminateSessionInput,
  TerminateSessionOutput,
  TerminateSessionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TerminateSessionInput,
  output: TerminateSessionOutput,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TerminateSession",
}));

export type UpdateStudioError =
  | InternalServerException
  | InvalidRequestException
  | StudioNotFound
  | CommonErrors;
/**
 * Updates an Amazon EMR Studio configuration, including attributes such as name,
 * description, and subnets.
 */
export const updateStudio: API.OperationMethod<
  UpdateStudioInput,
  UpdateStudioResponse,
  UpdateStudioError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateStudioInput,
  output: UpdateStudioResponse,
  errors: [InternalServerException, InvalidRequestException, StudioNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateStudio",
}));

export type UpdateStudioSessionMappingError =
  | InternalServerError
  | InvalidRequestException
  | CommonErrors;
/**
 * Updates the session policy attached to the user or group for the specified Amazon EMR Studio.
 */
export const updateStudioSessionMapping: API.OperationMethod<
  UpdateStudioSessionMappingInput,
  UpdateStudioSessionMappingResponse,
  UpdateStudioSessionMappingError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateStudioSessionMappingInput,
  output: UpdateStudioSessionMappingResponse,
  errors: [InternalServerError, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateStudioSessionMapping",
}));
