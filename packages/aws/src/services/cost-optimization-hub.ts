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
  sdkId: "Cost Optimization Hub",
  serviceShapeName: "CostOptimizationHubService",
});
const auth = T.AwsAuthSigv4({ name: "cost-optimization-hub" });
const ver = T.ServiceVersion("2022-07-26");
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
              `https://cost-optimization-hub-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://cost-optimization-hub-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://cost-optimization-hub.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://cost-optimization-hub.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.String.pipe(T.ErrorMessage()), resourceId: S.String },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      reason: S.optional(
        S.suspend(() => ValidationExceptionReason).annotate({
          identifier: "ValidationExceptionReason",
        }),
      ),
      fields: S.optional(
        S.suspend(() => ValidationExceptionDetails).annotate({
          identifier: "ValidationExceptionDetails",
        }),
      ),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export interface GetPreferencesRequest {}
export const GetPreferencesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetPreferencesRequest",
}) as any as S.Schema<GetPreferencesRequest>;
export type SavingsEstimationMode =
  | "BeforeDiscounts"
  | "AfterDiscounts"
  | (string & {});
export const SavingsEstimationMode = S.String;

export type MemberAccountDiscountVisibility = "All" | "None" | (string & {});
export const MemberAccountDiscountVisibility = S.String;

export type Term = "OneYear" | "ThreeYears" | (string & {});
export const Term = S.String;

export type PaymentOption =
  | "AllUpfront"
  | "PartialUpfront"
  | "NoUpfront"
  | (string & {});
export const PaymentOption = S.String;

export interface PreferredCommitment {
  term?: Term;
  paymentOption?: PaymentOption;
}
export const PreferredCommitment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    term: S.optional(Term),
    paymentOption: S.optional(PaymentOption),
  }),
).annotate({
  identifier: "PreferredCommitment",
}) as any as S.Schema<PreferredCommitment>;
export interface GetPreferencesResponse {
  savingsEstimationMode?: SavingsEstimationMode;
  memberAccountDiscountVisibility?: MemberAccountDiscountVisibility;
  preferredCommitment?: PreferredCommitment;
}
export const GetPreferencesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    savingsEstimationMode: S.optional(SavingsEstimationMode),
    memberAccountDiscountVisibility: S.optional(
      MemberAccountDiscountVisibility,
    ),
    preferredCommitment: S.optional(PreferredCommitment),
  }),
).annotate({
  identifier: "GetPreferencesResponse",
}) as any as S.Schema<GetPreferencesResponse>;
export interface GetRecommendationRequest {
  recommendationId: string;
}
export const GetRecommendationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ recommendationId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetRecommendationRequest",
}) as any as S.Schema<GetRecommendationRequest>;
export type ResourceType =
  | "Ec2Instance"
  | "LambdaFunction"
  | "EbsVolume"
  | "EcsService"
  | "Ec2AutoScalingGroup"
  | "Ec2InstanceSavingsPlans"
  | "ComputeSavingsPlans"
  | "SageMakerSavingsPlans"
  | "Ec2ReservedInstances"
  | "RdsReservedInstances"
  | "OpenSearchReservedInstances"
  | "RedshiftReservedInstances"
  | "ElastiCacheReservedInstances"
  | "RdsDbInstanceStorage"
  | "RdsDbInstance"
  | "AuroraDbClusterStorage"
  | "DynamoDbReservedCapacity"
  | "MemoryDbReservedInstances"
  | "NatGateway"
  | "DynamoDBTable"
  | "ElastiCacheCluster"
  | "MemoryDBCluster"
  | "DocumentDBCluster"
  | "WorkSpaces"
  | "SageMakerEndpoint"
  | (string & {});
export const ResourceType = S.String;

export type Source = "ComputeOptimizer" | "CostExplorer" | (string & {});
export const Source = S.String;

export type Datetime = Date;
export type ImplementationEffort =
  | "VeryLow"
  | "Low"
  | "Medium"
  | "High"
  | "VeryHigh"
  | (string & {});
export const ImplementationEffort = S.String;

export type ActionType =
  | "Rightsize"
  | "Stop"
  | "Upgrade"
  | "PurchaseSavingsPlans"
  | "PurchaseReservedInstances"
  | "MigrateToGraviton"
  | "Delete"
  | "ScaleIn"
  | (string & {});
export const ActionType = S.String;

export interface ComputeConfiguration {
  vCpu?: number;
  memorySizeInMB?: number;
  architecture?: string;
  platform?: string;
}
export const ComputeConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vCpu: S.optional(S.Number),
    memorySizeInMB: S.optional(S.Number),
    architecture: S.optional(S.String),
    platform: S.optional(S.String),
  }),
).annotate({
  identifier: "ComputeConfiguration",
}) as any as S.Schema<ComputeConfiguration>;
export interface LambdaFunctionConfiguration {
  compute?: ComputeConfiguration;
}
export const LambdaFunctionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ compute: S.optional(ComputeConfiguration) }),
).annotate({
  identifier: "LambdaFunctionConfiguration",
}) as any as S.Schema<LambdaFunctionConfiguration>;
export interface Usage {
  usageType?: string;
  usageAmount?: number;
  operation?: string;
  productCode?: string;
  unit?: string;
}
export const Usage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    usageType: S.optional(S.String),
    usageAmount: S.optional(S.Number),
    operation: S.optional(S.String),
    productCode: S.optional(S.String),
    unit: S.optional(S.String),
  }),
).annotate({ identifier: "Usage" }) as any as S.Schema<Usage>;
export type UsageList = Usage[];
export const UsageList = /*@__PURE__*/ S.Array(Usage);
export interface EstimatedDiscounts {
  savingsPlansDiscount?: number;
  reservedInstancesDiscount?: number;
  otherDiscount?: number;
}
export const EstimatedDiscounts = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    savingsPlansDiscount: S.optional(S.Number),
    reservedInstancesDiscount: S.optional(S.Number),
    otherDiscount: S.optional(S.Number),
  }),
).annotate({
  identifier: "EstimatedDiscounts",
}) as any as S.Schema<EstimatedDiscounts>;
export interface ResourcePricing {
  estimatedCostBeforeDiscounts?: number;
  estimatedNetUnusedAmortizedCommitments?: number;
  estimatedDiscounts?: EstimatedDiscounts;
  estimatedCostAfterDiscounts?: number;
}
export const ResourcePricing = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    estimatedCostBeforeDiscounts: S.optional(S.Number),
    estimatedNetUnusedAmortizedCommitments: S.optional(S.Number),
    estimatedDiscounts: S.optional(EstimatedDiscounts),
    estimatedCostAfterDiscounts: S.optional(S.Number),
  }),
).annotate({
  identifier: "ResourcePricing",
}) as any as S.Schema<ResourcePricing>;
export interface ResourceCostCalculation {
  usages?: Usage[];
  pricing?: ResourcePricing;
}
export const ResourceCostCalculation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    usages: S.optional(UsageList),
    pricing: S.optional(ResourcePricing),
  }),
).annotate({
  identifier: "ResourceCostCalculation",
}) as any as S.Schema<ResourceCostCalculation>;
export interface LambdaFunction {
  configuration?: LambdaFunctionConfiguration;
  costCalculation?: ResourceCostCalculation;
}
export const LambdaFunction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configuration: S.optional(LambdaFunctionConfiguration),
    costCalculation: S.optional(ResourceCostCalculation),
  }),
).annotate({ identifier: "LambdaFunction" }) as any as S.Schema<LambdaFunction>;
export interface EcsServiceConfiguration {
  compute?: ComputeConfiguration;
}
export const EcsServiceConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ compute: S.optional(ComputeConfiguration) }),
).annotate({
  identifier: "EcsServiceConfiguration",
}) as any as S.Schema<EcsServiceConfiguration>;
export interface EcsService {
  configuration?: EcsServiceConfiguration;
  costCalculation?: ResourceCostCalculation;
}
export const EcsService = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configuration: S.optional(EcsServiceConfiguration),
    costCalculation: S.optional(ResourceCostCalculation),
  }),
).annotate({ identifier: "EcsService" }) as any as S.Schema<EcsService>;
export interface InstanceConfiguration {
  type?: string;
}
export const InstanceConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ type: S.optional(S.String) }),
).annotate({
  identifier: "InstanceConfiguration",
}) as any as S.Schema<InstanceConfiguration>;
export interface Ec2InstanceConfiguration {
  instance?: InstanceConfiguration;
}
export const Ec2InstanceConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ instance: S.optional(InstanceConfiguration) }),
).annotate({
  identifier: "Ec2InstanceConfiguration",
}) as any as S.Schema<Ec2InstanceConfiguration>;
export interface Ec2Instance {
  configuration?: Ec2InstanceConfiguration;
  costCalculation?: ResourceCostCalculation;
}
export const Ec2Instance = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configuration: S.optional(Ec2InstanceConfiguration),
    costCalculation: S.optional(ResourceCostCalculation),
  }),
).annotate({ identifier: "Ec2Instance" }) as any as S.Schema<Ec2Instance>;
export interface StorageConfiguration {
  type?: string;
  sizeInGb?: number;
}
export const StorageConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ type: S.optional(S.String), sizeInGb: S.optional(S.Number) }),
).annotate({
  identifier: "StorageConfiguration",
}) as any as S.Schema<StorageConfiguration>;
export interface BlockStoragePerformanceConfiguration {
  iops?: number;
  throughput?: number;
}
export const BlockStoragePerformanceConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ iops: S.optional(S.Number), throughput: S.optional(S.Number) }),
).annotate({
  identifier: "BlockStoragePerformanceConfiguration",
}) as any as S.Schema<BlockStoragePerformanceConfiguration>;
export interface EbsVolumeConfiguration {
  storage?: StorageConfiguration;
  performance?: BlockStoragePerformanceConfiguration;
  attachmentState?: string;
}
export const EbsVolumeConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    storage: S.optional(StorageConfiguration),
    performance: S.optional(BlockStoragePerformanceConfiguration),
    attachmentState: S.optional(S.String),
  }),
).annotate({
  identifier: "EbsVolumeConfiguration",
}) as any as S.Schema<EbsVolumeConfiguration>;
export interface EbsVolume {
  configuration?: EbsVolumeConfiguration;
  costCalculation?: ResourceCostCalculation;
}
export const EbsVolume = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configuration: S.optional(EbsVolumeConfiguration),
    costCalculation: S.optional(ResourceCostCalculation),
  }),
).annotate({ identifier: "EbsVolume" }) as any as S.Schema<EbsVolume>;
export interface MixedInstanceConfiguration {
  type?: string;
}
export const MixedInstanceConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ type: S.optional(S.String) }),
).annotate({
  identifier: "MixedInstanceConfiguration",
}) as any as S.Schema<MixedInstanceConfiguration>;
export type MixedInstanceConfigurationList = MixedInstanceConfiguration[];
export const MixedInstanceConfigurationList = /*@__PURE__*/ S.Array(
  MixedInstanceConfiguration,
);
export type Ec2AutoScalingGroupType =
  | "SingleInstanceType"
  | "MixedInstanceTypes"
  | (string & {});
export const Ec2AutoScalingGroupType = S.String;

export type AllocationStrategy = "Prioritized" | "LowestPrice" | (string & {});
export const AllocationStrategy = S.String;

export interface Ec2AutoScalingGroupConfiguration {
  instance?: InstanceConfiguration;
  mixedInstances?: MixedInstanceConfiguration[];
  type?: Ec2AutoScalingGroupType;
  allocationStrategy?: AllocationStrategy;
}
export const Ec2AutoScalingGroupConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instance: S.optional(InstanceConfiguration),
    mixedInstances: S.optional(MixedInstanceConfigurationList),
    type: S.optional(Ec2AutoScalingGroupType),
    allocationStrategy: S.optional(AllocationStrategy),
  }),
).annotate({
  identifier: "Ec2AutoScalingGroupConfiguration",
}) as any as S.Schema<Ec2AutoScalingGroupConfiguration>;
export interface Ec2AutoScalingGroup {
  configuration?: Ec2AutoScalingGroupConfiguration;
  costCalculation?: ResourceCostCalculation;
}
export const Ec2AutoScalingGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configuration: S.optional(Ec2AutoScalingGroupConfiguration),
    costCalculation: S.optional(ResourceCostCalculation),
  }),
).annotate({
  identifier: "Ec2AutoScalingGroup",
}) as any as S.Schema<Ec2AutoScalingGroup>;
export interface Ec2ReservedInstancesConfiguration {
  accountScope?: string;
  service?: string;
  term?: string;
  paymentOption?: string;
  reservedInstancesRegion?: string;
  upfrontCost?: string;
  monthlyRecurringCost?: string;
  normalizedUnitsToPurchase?: string;
  numberOfInstancesToPurchase?: string;
  offeringClass?: string;
  instanceFamily?: string;
  instanceType?: string;
  currentGeneration?: string;
  platform?: string;
  tenancy?: string;
  sizeFlexEligible?: boolean;
}
export const Ec2ReservedInstancesConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountScope: S.optional(S.String),
    service: S.optional(S.String),
    term: S.optional(S.String),
    paymentOption: S.optional(S.String),
    reservedInstancesRegion: S.optional(S.String),
    upfrontCost: S.optional(S.String),
    monthlyRecurringCost: S.optional(S.String),
    normalizedUnitsToPurchase: S.optional(S.String),
    numberOfInstancesToPurchase: S.optional(S.String),
    offeringClass: S.optional(S.String),
    instanceFamily: S.optional(S.String),
    instanceType: S.optional(S.String),
    currentGeneration: S.optional(S.String),
    platform: S.optional(S.String),
    tenancy: S.optional(S.String),
    sizeFlexEligible: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "Ec2ReservedInstancesConfiguration",
}) as any as S.Schema<Ec2ReservedInstancesConfiguration>;
export interface ReservedInstancesPricing {
  estimatedOnDemandCost?: number;
  monthlyReservationEligibleCost?: number;
  savingsPercentage?: number;
  estimatedMonthlyAmortizedReservationCost?: number;
}
export const ReservedInstancesPricing = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    estimatedOnDemandCost: S.optional(S.Number),
    monthlyReservationEligibleCost: S.optional(S.Number),
    savingsPercentage: S.optional(S.Number),
    estimatedMonthlyAmortizedReservationCost: S.optional(S.Number),
  }),
).annotate({
  identifier: "ReservedInstancesPricing",
}) as any as S.Schema<ReservedInstancesPricing>;
export interface ReservedInstancesCostCalculation {
  pricing?: ReservedInstancesPricing;
}
export const ReservedInstancesCostCalculation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ pricing: S.optional(ReservedInstancesPricing) }),
).annotate({
  identifier: "ReservedInstancesCostCalculation",
}) as any as S.Schema<ReservedInstancesCostCalculation>;
export interface Ec2ReservedInstances {
  configuration?: Ec2ReservedInstancesConfiguration;
  costCalculation?: ReservedInstancesCostCalculation;
}
export const Ec2ReservedInstances = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configuration: S.optional(Ec2ReservedInstancesConfiguration),
    costCalculation: S.optional(ReservedInstancesCostCalculation),
  }),
).annotate({
  identifier: "Ec2ReservedInstances",
}) as any as S.Schema<Ec2ReservedInstances>;
export interface RdsReservedInstancesConfiguration {
  accountScope?: string;
  service?: string;
  term?: string;
  paymentOption?: string;
  reservedInstancesRegion?: string;
  upfrontCost?: string;
  monthlyRecurringCost?: string;
  normalizedUnitsToPurchase?: string;
  numberOfInstancesToPurchase?: string;
  instanceFamily?: string;
  instanceType?: string;
  sizeFlexEligible?: boolean;
  currentGeneration?: string;
  licenseModel?: string;
  databaseEdition?: string;
  databaseEngine?: string;
  deploymentOption?: string;
}
export const RdsReservedInstancesConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountScope: S.optional(S.String),
    service: S.optional(S.String),
    term: S.optional(S.String),
    paymentOption: S.optional(S.String),
    reservedInstancesRegion: S.optional(S.String),
    upfrontCost: S.optional(S.String),
    monthlyRecurringCost: S.optional(S.String),
    normalizedUnitsToPurchase: S.optional(S.String),
    numberOfInstancesToPurchase: S.optional(S.String),
    instanceFamily: S.optional(S.String),
    instanceType: S.optional(S.String),
    sizeFlexEligible: S.optional(S.Boolean),
    currentGeneration: S.optional(S.String),
    licenseModel: S.optional(S.String),
    databaseEdition: S.optional(S.String),
    databaseEngine: S.optional(S.String),
    deploymentOption: S.optional(S.String),
  }),
).annotate({
  identifier: "RdsReservedInstancesConfiguration",
}) as any as S.Schema<RdsReservedInstancesConfiguration>;
export interface RdsReservedInstances {
  configuration?: RdsReservedInstancesConfiguration;
  costCalculation?: ReservedInstancesCostCalculation;
}
export const RdsReservedInstances = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configuration: S.optional(RdsReservedInstancesConfiguration),
    costCalculation: S.optional(ReservedInstancesCostCalculation),
  }),
).annotate({
  identifier: "RdsReservedInstances",
}) as any as S.Schema<RdsReservedInstances>;
export interface ElastiCacheReservedInstancesConfiguration {
  accountScope?: string;
  service?: string;
  term?: string;
  paymentOption?: string;
  reservedInstancesRegion?: string;
  upfrontCost?: string;
  monthlyRecurringCost?: string;
  normalizedUnitsToPurchase?: string;
  numberOfInstancesToPurchase?: string;
  instanceFamily?: string;
  instanceType?: string;
  currentGeneration?: string;
  sizeFlexEligible?: boolean;
}
export const ElastiCacheReservedInstancesConfiguration =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      accountScope: S.optional(S.String),
      service: S.optional(S.String),
      term: S.optional(S.String),
      paymentOption: S.optional(S.String),
      reservedInstancesRegion: S.optional(S.String),
      upfrontCost: S.optional(S.String),
      monthlyRecurringCost: S.optional(S.String),
      normalizedUnitsToPurchase: S.optional(S.String),
      numberOfInstancesToPurchase: S.optional(S.String),
      instanceFamily: S.optional(S.String),
      instanceType: S.optional(S.String),
      currentGeneration: S.optional(S.String),
      sizeFlexEligible: S.optional(S.Boolean),
    }),
  ).annotate({
    identifier: "ElastiCacheReservedInstancesConfiguration",
  }) as any as S.Schema<ElastiCacheReservedInstancesConfiguration>;
export interface ElastiCacheReservedInstances {
  configuration?: ElastiCacheReservedInstancesConfiguration;
  costCalculation?: ReservedInstancesCostCalculation;
}
export const ElastiCacheReservedInstances = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configuration: S.optional(ElastiCacheReservedInstancesConfiguration),
    costCalculation: S.optional(ReservedInstancesCostCalculation),
  }),
).annotate({
  identifier: "ElastiCacheReservedInstances",
}) as any as S.Schema<ElastiCacheReservedInstances>;
export interface OpenSearchReservedInstancesConfiguration {
  accountScope?: string;
  service?: string;
  term?: string;
  paymentOption?: string;
  reservedInstancesRegion?: string;
  upfrontCost?: string;
  monthlyRecurringCost?: string;
  normalizedUnitsToPurchase?: string;
  numberOfInstancesToPurchase?: string;
  instanceType?: string;
  currentGeneration?: string;
  sizeFlexEligible?: boolean;
}
export const OpenSearchReservedInstancesConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      accountScope: S.optional(S.String),
      service: S.optional(S.String),
      term: S.optional(S.String),
      paymentOption: S.optional(S.String),
      reservedInstancesRegion: S.optional(S.String),
      upfrontCost: S.optional(S.String),
      monthlyRecurringCost: S.optional(S.String),
      normalizedUnitsToPurchase: S.optional(S.String),
      numberOfInstancesToPurchase: S.optional(S.String),
      instanceType: S.optional(S.String),
      currentGeneration: S.optional(S.String),
      sizeFlexEligible: S.optional(S.Boolean),
    }),
).annotate({
  identifier: "OpenSearchReservedInstancesConfiguration",
}) as any as S.Schema<OpenSearchReservedInstancesConfiguration>;
export interface OpenSearchReservedInstances {
  configuration?: OpenSearchReservedInstancesConfiguration;
  costCalculation?: ReservedInstancesCostCalculation;
}
export const OpenSearchReservedInstances = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configuration: S.optional(OpenSearchReservedInstancesConfiguration),
    costCalculation: S.optional(ReservedInstancesCostCalculation),
  }),
).annotate({
  identifier: "OpenSearchReservedInstances",
}) as any as S.Schema<OpenSearchReservedInstances>;
export interface RedshiftReservedInstancesConfiguration {
  accountScope?: string;
  service?: string;
  term?: string;
  paymentOption?: string;
  reservedInstancesRegion?: string;
  upfrontCost?: string;
  monthlyRecurringCost?: string;
  normalizedUnitsToPurchase?: string;
  numberOfInstancesToPurchase?: string;
  instanceFamily?: string;
  instanceType?: string;
  sizeFlexEligible?: boolean;
  currentGeneration?: string;
}
export const RedshiftReservedInstancesConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      accountScope: S.optional(S.String),
      service: S.optional(S.String),
      term: S.optional(S.String),
      paymentOption: S.optional(S.String),
      reservedInstancesRegion: S.optional(S.String),
      upfrontCost: S.optional(S.String),
      monthlyRecurringCost: S.optional(S.String),
      normalizedUnitsToPurchase: S.optional(S.String),
      numberOfInstancesToPurchase: S.optional(S.String),
      instanceFamily: S.optional(S.String),
      instanceType: S.optional(S.String),
      sizeFlexEligible: S.optional(S.Boolean),
      currentGeneration: S.optional(S.String),
    }),
).annotate({
  identifier: "RedshiftReservedInstancesConfiguration",
}) as any as S.Schema<RedshiftReservedInstancesConfiguration>;
export interface RedshiftReservedInstances {
  configuration?: RedshiftReservedInstancesConfiguration;
  costCalculation?: ReservedInstancesCostCalculation;
}
export const RedshiftReservedInstances = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configuration: S.optional(RedshiftReservedInstancesConfiguration),
    costCalculation: S.optional(ReservedInstancesCostCalculation),
  }),
).annotate({
  identifier: "RedshiftReservedInstances",
}) as any as S.Schema<RedshiftReservedInstances>;
export interface Ec2InstanceSavingsPlansConfiguration {
  accountScope?: string;
  term?: string;
  paymentOption?: string;
  hourlyCommitment?: string;
  instanceFamily?: string;
  savingsPlansRegion?: string;
}
export const Ec2InstanceSavingsPlansConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      accountScope: S.optional(S.String),
      term: S.optional(S.String),
      paymentOption: S.optional(S.String),
      hourlyCommitment: S.optional(S.String),
      instanceFamily: S.optional(S.String),
      savingsPlansRegion: S.optional(S.String),
    }),
).annotate({
  identifier: "Ec2InstanceSavingsPlansConfiguration",
}) as any as S.Schema<Ec2InstanceSavingsPlansConfiguration>;
export interface SavingsPlansPricing {
  monthlySavingsPlansEligibleCost?: number;
  estimatedMonthlyCommitment?: number;
  savingsPercentage?: number;
  estimatedOnDemandCost?: number;
}
export const SavingsPlansPricing = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    monthlySavingsPlansEligibleCost: S.optional(S.Number),
    estimatedMonthlyCommitment: S.optional(S.Number),
    savingsPercentage: S.optional(S.Number),
    estimatedOnDemandCost: S.optional(S.Number),
  }),
).annotate({
  identifier: "SavingsPlansPricing",
}) as any as S.Schema<SavingsPlansPricing>;
export interface SavingsPlansCostCalculation {
  pricing?: SavingsPlansPricing;
}
export const SavingsPlansCostCalculation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ pricing: S.optional(SavingsPlansPricing) }),
).annotate({
  identifier: "SavingsPlansCostCalculation",
}) as any as S.Schema<SavingsPlansCostCalculation>;
export interface Ec2InstanceSavingsPlans {
  configuration?: Ec2InstanceSavingsPlansConfiguration;
  costCalculation?: SavingsPlansCostCalculation;
}
export const Ec2InstanceSavingsPlans = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configuration: S.optional(Ec2InstanceSavingsPlansConfiguration),
    costCalculation: S.optional(SavingsPlansCostCalculation),
  }),
).annotate({
  identifier: "Ec2InstanceSavingsPlans",
}) as any as S.Schema<Ec2InstanceSavingsPlans>;
export interface ComputeSavingsPlansConfiguration {
  accountScope?: string;
  term?: string;
  paymentOption?: string;
  hourlyCommitment?: string;
}
export const ComputeSavingsPlansConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountScope: S.optional(S.String),
    term: S.optional(S.String),
    paymentOption: S.optional(S.String),
    hourlyCommitment: S.optional(S.String),
  }),
).annotate({
  identifier: "ComputeSavingsPlansConfiguration",
}) as any as S.Schema<ComputeSavingsPlansConfiguration>;
export interface ComputeSavingsPlans {
  configuration?: ComputeSavingsPlansConfiguration;
  costCalculation?: SavingsPlansCostCalculation;
}
export const ComputeSavingsPlans = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configuration: S.optional(ComputeSavingsPlansConfiguration),
    costCalculation: S.optional(SavingsPlansCostCalculation),
  }),
).annotate({
  identifier: "ComputeSavingsPlans",
}) as any as S.Schema<ComputeSavingsPlans>;
export interface SageMakerSavingsPlansConfiguration {
  accountScope?: string;
  term?: string;
  paymentOption?: string;
  hourlyCommitment?: string;
}
export const SageMakerSavingsPlansConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountScope: S.optional(S.String),
    term: S.optional(S.String),
    paymentOption: S.optional(S.String),
    hourlyCommitment: S.optional(S.String),
  }),
).annotate({
  identifier: "SageMakerSavingsPlansConfiguration",
}) as any as S.Schema<SageMakerSavingsPlansConfiguration>;
export interface SageMakerSavingsPlans {
  configuration?: SageMakerSavingsPlansConfiguration;
  costCalculation?: SavingsPlansCostCalculation;
}
export const SageMakerSavingsPlans = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configuration: S.optional(SageMakerSavingsPlansConfiguration),
    costCalculation: S.optional(SavingsPlansCostCalculation),
  }),
).annotate({
  identifier: "SageMakerSavingsPlans",
}) as any as S.Schema<SageMakerSavingsPlans>;
export interface DbInstanceConfiguration {
  dbInstanceClass?: string;
}
export const DbInstanceConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ dbInstanceClass: S.optional(S.String) }),
).annotate({
  identifier: "DbInstanceConfiguration",
}) as any as S.Schema<DbInstanceConfiguration>;
export interface RdsDbInstanceConfiguration {
  instance?: DbInstanceConfiguration;
}
export const RdsDbInstanceConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ instance: S.optional(DbInstanceConfiguration) }),
).annotate({
  identifier: "RdsDbInstanceConfiguration",
}) as any as S.Schema<RdsDbInstanceConfiguration>;
export interface RdsDbInstance {
  configuration?: RdsDbInstanceConfiguration;
  costCalculation?: ResourceCostCalculation;
}
export const RdsDbInstance = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configuration: S.optional(RdsDbInstanceConfiguration),
    costCalculation: S.optional(ResourceCostCalculation),
  }),
).annotate({ identifier: "RdsDbInstance" }) as any as S.Schema<RdsDbInstance>;
export interface RdsDbInstanceStorageConfiguration {
  storageType?: string;
  allocatedStorageInGb?: number;
  iops?: number;
  storageThroughput?: number;
}
export const RdsDbInstanceStorageConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    storageType: S.optional(S.String),
    allocatedStorageInGb: S.optional(S.Number),
    iops: S.optional(S.Number),
    storageThroughput: S.optional(S.Number),
  }),
).annotate({
  identifier: "RdsDbInstanceStorageConfiguration",
}) as any as S.Schema<RdsDbInstanceStorageConfiguration>;
export interface RdsDbInstanceStorage {
  configuration?: RdsDbInstanceStorageConfiguration;
  costCalculation?: ResourceCostCalculation;
}
export const RdsDbInstanceStorage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configuration: S.optional(RdsDbInstanceStorageConfiguration),
    costCalculation: S.optional(ResourceCostCalculation),
  }),
).annotate({
  identifier: "RdsDbInstanceStorage",
}) as any as S.Schema<RdsDbInstanceStorage>;
export interface AuroraDbClusterStorageConfiguration {
  storageType?: string;
}
export const AuroraDbClusterStorageConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ storageType: S.optional(S.String) }),
).annotate({
  identifier: "AuroraDbClusterStorageConfiguration",
}) as any as S.Schema<AuroraDbClusterStorageConfiguration>;
export interface AuroraDbClusterStorage {
  configuration?: AuroraDbClusterStorageConfiguration;
  costCalculation?: ResourceCostCalculation;
}
export const AuroraDbClusterStorage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configuration: S.optional(AuroraDbClusterStorageConfiguration),
    costCalculation: S.optional(ResourceCostCalculation),
  }),
).annotate({
  identifier: "AuroraDbClusterStorage",
}) as any as S.Schema<AuroraDbClusterStorage>;
export interface DynamoDbReservedCapacityConfiguration {
  accountScope?: string;
  service?: string;
  term?: string;
  paymentOption?: string;
  reservedInstancesRegion?: string;
  upfrontCost?: string;
  monthlyRecurringCost?: string;
  numberOfCapacityUnitsToPurchase?: string;
  capacityUnits?: string;
}
export const DynamoDbReservedCapacityConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      accountScope: S.optional(S.String),
      service: S.optional(S.String),
      term: S.optional(S.String),
      paymentOption: S.optional(S.String),
      reservedInstancesRegion: S.optional(S.String),
      upfrontCost: S.optional(S.String),
      monthlyRecurringCost: S.optional(S.String),
      numberOfCapacityUnitsToPurchase: S.optional(S.String),
      capacityUnits: S.optional(S.String),
    }),
).annotate({
  identifier: "DynamoDbReservedCapacityConfiguration",
}) as any as S.Schema<DynamoDbReservedCapacityConfiguration>;
export interface DynamoDbReservedCapacity {
  configuration?: DynamoDbReservedCapacityConfiguration;
  costCalculation?: ReservedInstancesCostCalculation;
}
export const DynamoDbReservedCapacity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configuration: S.optional(DynamoDbReservedCapacityConfiguration),
    costCalculation: S.optional(ReservedInstancesCostCalculation),
  }),
).annotate({
  identifier: "DynamoDbReservedCapacity",
}) as any as S.Schema<DynamoDbReservedCapacity>;
export interface MemoryDbReservedInstancesConfiguration {
  accountScope?: string;
  service?: string;
  term?: string;
  paymentOption?: string;
  reservedInstancesRegion?: string;
  upfrontCost?: string;
  monthlyRecurringCost?: string;
  normalizedUnitsToPurchase?: string;
  numberOfInstancesToPurchase?: string;
  instanceType?: string;
  instanceFamily?: string;
  sizeFlexEligible?: boolean;
  currentGeneration?: string;
}
export const MemoryDbReservedInstancesConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      accountScope: S.optional(S.String),
      service: S.optional(S.String),
      term: S.optional(S.String),
      paymentOption: S.optional(S.String),
      reservedInstancesRegion: S.optional(S.String),
      upfrontCost: S.optional(S.String),
      monthlyRecurringCost: S.optional(S.String),
      normalizedUnitsToPurchase: S.optional(S.String),
      numberOfInstancesToPurchase: S.optional(S.String),
      instanceType: S.optional(S.String),
      instanceFamily: S.optional(S.String),
      sizeFlexEligible: S.optional(S.Boolean),
      currentGeneration: S.optional(S.String),
    }),
).annotate({
  identifier: "MemoryDbReservedInstancesConfiguration",
}) as any as S.Schema<MemoryDbReservedInstancesConfiguration>;
export interface MemoryDbReservedInstances {
  configuration?: MemoryDbReservedInstancesConfiguration;
  costCalculation?: ReservedInstancesCostCalculation;
}
export const MemoryDbReservedInstances = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configuration: S.optional(MemoryDbReservedInstancesConfiguration),
    costCalculation: S.optional(ReservedInstancesCostCalculation),
  }),
).annotate({
  identifier: "MemoryDbReservedInstances",
}) as any as S.Schema<MemoryDbReservedInstances>;
export interface NatGatewayConfiguration {
  activeConnectionCount?: number;
  packetsInFromSource?: number;
  packetsInFromDestination?: number;
}
export const NatGatewayConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    activeConnectionCount: S.optional(S.Number),
    packetsInFromSource: S.optional(S.Number),
    packetsInFromDestination: S.optional(S.Number),
  }),
).annotate({
  identifier: "NatGatewayConfiguration",
}) as any as S.Schema<NatGatewayConfiguration>;
export interface NatGateway {
  configuration?: NatGatewayConfiguration;
  costCalculation?: ResourceCostCalculation;
}
export const NatGateway = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configuration: S.optional(NatGatewayConfiguration),
    costCalculation: S.optional(ResourceCostCalculation),
  }),
).annotate({ identifier: "NatGateway" }) as any as S.Schema<NatGateway>;
export interface DynamoDbTable {
  costCalculation?: ResourceCostCalculation;
}
export const DynamoDbTable = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ costCalculation: S.optional(ResourceCostCalculation) }),
).annotate({ identifier: "DynamoDbTable" }) as any as S.Schema<DynamoDbTable>;
export interface ElastiCacheCluster {
  costCalculation?: ResourceCostCalculation;
}
export const ElastiCacheCluster = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ costCalculation: S.optional(ResourceCostCalculation) }),
).annotate({
  identifier: "ElastiCacheCluster",
}) as any as S.Schema<ElastiCacheCluster>;
export interface MemoryDbCluster {
  costCalculation?: ResourceCostCalculation;
}
export const MemoryDbCluster = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ costCalculation: S.optional(ResourceCostCalculation) }),
).annotate({
  identifier: "MemoryDbCluster",
}) as any as S.Schema<MemoryDbCluster>;
export interface DocumentDbCluster {
  costCalculation?: ResourceCostCalculation;
}
export const DocumentDbCluster = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ costCalculation: S.optional(ResourceCostCalculation) }),
).annotate({
  identifier: "DocumentDbCluster",
}) as any as S.Schema<DocumentDbCluster>;
export interface WorkSpaces {
  costCalculation?: ResourceCostCalculation;
}
export const WorkSpaces = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ costCalculation: S.optional(ResourceCostCalculation) }),
).annotate({ identifier: "WorkSpaces" }) as any as S.Schema<WorkSpaces>;
export interface SageMakerEndpoint {
  costCalculation?: ResourceCostCalculation;
}
export const SageMakerEndpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ costCalculation: S.optional(ResourceCostCalculation) }),
).annotate({
  identifier: "SageMakerEndpoint",
}) as any as S.Schema<SageMakerEndpoint>;
export type ResourceDetails =
  | {
      lambdaFunction: LambdaFunction;
      ecsService?: never;
      ec2Instance?: never;
      ebsVolume?: never;
      ec2AutoScalingGroup?: never;
      ec2ReservedInstances?: never;
      rdsReservedInstances?: never;
      elastiCacheReservedInstances?: never;
      openSearchReservedInstances?: never;
      redshiftReservedInstances?: never;
      ec2InstanceSavingsPlans?: never;
      computeSavingsPlans?: never;
      sageMakerSavingsPlans?: never;
      rdsDbInstance?: never;
      rdsDbInstanceStorage?: never;
      auroraDbClusterStorage?: never;
      dynamoDbReservedCapacity?: never;
      memoryDbReservedInstances?: never;
      natGateway?: never;
      dynamoDbTable?: never;
      elastiCacheCluster?: never;
      memoryDbCluster?: never;
      documentDbCluster?: never;
      workSpaces?: never;
      sageMakerEndpoint?: never;
    }
  | {
      lambdaFunction?: never;
      ecsService: EcsService;
      ec2Instance?: never;
      ebsVolume?: never;
      ec2AutoScalingGroup?: never;
      ec2ReservedInstances?: never;
      rdsReservedInstances?: never;
      elastiCacheReservedInstances?: never;
      openSearchReservedInstances?: never;
      redshiftReservedInstances?: never;
      ec2InstanceSavingsPlans?: never;
      computeSavingsPlans?: never;
      sageMakerSavingsPlans?: never;
      rdsDbInstance?: never;
      rdsDbInstanceStorage?: never;
      auroraDbClusterStorage?: never;
      dynamoDbReservedCapacity?: never;
      memoryDbReservedInstances?: never;
      natGateway?: never;
      dynamoDbTable?: never;
      elastiCacheCluster?: never;
      memoryDbCluster?: never;
      documentDbCluster?: never;
      workSpaces?: never;
      sageMakerEndpoint?: never;
    }
  | {
      lambdaFunction?: never;
      ecsService?: never;
      ec2Instance: Ec2Instance;
      ebsVolume?: never;
      ec2AutoScalingGroup?: never;
      ec2ReservedInstances?: never;
      rdsReservedInstances?: never;
      elastiCacheReservedInstances?: never;
      openSearchReservedInstances?: never;
      redshiftReservedInstances?: never;
      ec2InstanceSavingsPlans?: never;
      computeSavingsPlans?: never;
      sageMakerSavingsPlans?: never;
      rdsDbInstance?: never;
      rdsDbInstanceStorage?: never;
      auroraDbClusterStorage?: never;
      dynamoDbReservedCapacity?: never;
      memoryDbReservedInstances?: never;
      natGateway?: never;
      dynamoDbTable?: never;
      elastiCacheCluster?: never;
      memoryDbCluster?: never;
      documentDbCluster?: never;
      workSpaces?: never;
      sageMakerEndpoint?: never;
    }
  | {
      lambdaFunction?: never;
      ecsService?: never;
      ec2Instance?: never;
      ebsVolume: EbsVolume;
      ec2AutoScalingGroup?: never;
      ec2ReservedInstances?: never;
      rdsReservedInstances?: never;
      elastiCacheReservedInstances?: never;
      openSearchReservedInstances?: never;
      redshiftReservedInstances?: never;
      ec2InstanceSavingsPlans?: never;
      computeSavingsPlans?: never;
      sageMakerSavingsPlans?: never;
      rdsDbInstance?: never;
      rdsDbInstanceStorage?: never;
      auroraDbClusterStorage?: never;
      dynamoDbReservedCapacity?: never;
      memoryDbReservedInstances?: never;
      natGateway?: never;
      dynamoDbTable?: never;
      elastiCacheCluster?: never;
      memoryDbCluster?: never;
      documentDbCluster?: never;
      workSpaces?: never;
      sageMakerEndpoint?: never;
    }
  | {
      lambdaFunction?: never;
      ecsService?: never;
      ec2Instance?: never;
      ebsVolume?: never;
      ec2AutoScalingGroup: Ec2AutoScalingGroup;
      ec2ReservedInstances?: never;
      rdsReservedInstances?: never;
      elastiCacheReservedInstances?: never;
      openSearchReservedInstances?: never;
      redshiftReservedInstances?: never;
      ec2InstanceSavingsPlans?: never;
      computeSavingsPlans?: never;
      sageMakerSavingsPlans?: never;
      rdsDbInstance?: never;
      rdsDbInstanceStorage?: never;
      auroraDbClusterStorage?: never;
      dynamoDbReservedCapacity?: never;
      memoryDbReservedInstances?: never;
      natGateway?: never;
      dynamoDbTable?: never;
      elastiCacheCluster?: never;
      memoryDbCluster?: never;
      documentDbCluster?: never;
      workSpaces?: never;
      sageMakerEndpoint?: never;
    }
  | {
      lambdaFunction?: never;
      ecsService?: never;
      ec2Instance?: never;
      ebsVolume?: never;
      ec2AutoScalingGroup?: never;
      ec2ReservedInstances: Ec2ReservedInstances;
      rdsReservedInstances?: never;
      elastiCacheReservedInstances?: never;
      openSearchReservedInstances?: never;
      redshiftReservedInstances?: never;
      ec2InstanceSavingsPlans?: never;
      computeSavingsPlans?: never;
      sageMakerSavingsPlans?: never;
      rdsDbInstance?: never;
      rdsDbInstanceStorage?: never;
      auroraDbClusterStorage?: never;
      dynamoDbReservedCapacity?: never;
      memoryDbReservedInstances?: never;
      natGateway?: never;
      dynamoDbTable?: never;
      elastiCacheCluster?: never;
      memoryDbCluster?: never;
      documentDbCluster?: never;
      workSpaces?: never;
      sageMakerEndpoint?: never;
    }
  | {
      lambdaFunction?: never;
      ecsService?: never;
      ec2Instance?: never;
      ebsVolume?: never;
      ec2AutoScalingGroup?: never;
      ec2ReservedInstances?: never;
      rdsReservedInstances: RdsReservedInstances;
      elastiCacheReservedInstances?: never;
      openSearchReservedInstances?: never;
      redshiftReservedInstances?: never;
      ec2InstanceSavingsPlans?: never;
      computeSavingsPlans?: never;
      sageMakerSavingsPlans?: never;
      rdsDbInstance?: never;
      rdsDbInstanceStorage?: never;
      auroraDbClusterStorage?: never;
      dynamoDbReservedCapacity?: never;
      memoryDbReservedInstances?: never;
      natGateway?: never;
      dynamoDbTable?: never;
      elastiCacheCluster?: never;
      memoryDbCluster?: never;
      documentDbCluster?: never;
      workSpaces?: never;
      sageMakerEndpoint?: never;
    }
  | {
      lambdaFunction?: never;
      ecsService?: never;
      ec2Instance?: never;
      ebsVolume?: never;
      ec2AutoScalingGroup?: never;
      ec2ReservedInstances?: never;
      rdsReservedInstances?: never;
      elastiCacheReservedInstances: ElastiCacheReservedInstances;
      openSearchReservedInstances?: never;
      redshiftReservedInstances?: never;
      ec2InstanceSavingsPlans?: never;
      computeSavingsPlans?: never;
      sageMakerSavingsPlans?: never;
      rdsDbInstance?: never;
      rdsDbInstanceStorage?: never;
      auroraDbClusterStorage?: never;
      dynamoDbReservedCapacity?: never;
      memoryDbReservedInstances?: never;
      natGateway?: never;
      dynamoDbTable?: never;
      elastiCacheCluster?: never;
      memoryDbCluster?: never;
      documentDbCluster?: never;
      workSpaces?: never;
      sageMakerEndpoint?: never;
    }
  | {
      lambdaFunction?: never;
      ecsService?: never;
      ec2Instance?: never;
      ebsVolume?: never;
      ec2AutoScalingGroup?: never;
      ec2ReservedInstances?: never;
      rdsReservedInstances?: never;
      elastiCacheReservedInstances?: never;
      openSearchReservedInstances: OpenSearchReservedInstances;
      redshiftReservedInstances?: never;
      ec2InstanceSavingsPlans?: never;
      computeSavingsPlans?: never;
      sageMakerSavingsPlans?: never;
      rdsDbInstance?: never;
      rdsDbInstanceStorage?: never;
      auroraDbClusterStorage?: never;
      dynamoDbReservedCapacity?: never;
      memoryDbReservedInstances?: never;
      natGateway?: never;
      dynamoDbTable?: never;
      elastiCacheCluster?: never;
      memoryDbCluster?: never;
      documentDbCluster?: never;
      workSpaces?: never;
      sageMakerEndpoint?: never;
    }
  | {
      lambdaFunction?: never;
      ecsService?: never;
      ec2Instance?: never;
      ebsVolume?: never;
      ec2AutoScalingGroup?: never;
      ec2ReservedInstances?: never;
      rdsReservedInstances?: never;
      elastiCacheReservedInstances?: never;
      openSearchReservedInstances?: never;
      redshiftReservedInstances: RedshiftReservedInstances;
      ec2InstanceSavingsPlans?: never;
      computeSavingsPlans?: never;
      sageMakerSavingsPlans?: never;
      rdsDbInstance?: never;
      rdsDbInstanceStorage?: never;
      auroraDbClusterStorage?: never;
      dynamoDbReservedCapacity?: never;
      memoryDbReservedInstances?: never;
      natGateway?: never;
      dynamoDbTable?: never;
      elastiCacheCluster?: never;
      memoryDbCluster?: never;
      documentDbCluster?: never;
      workSpaces?: never;
      sageMakerEndpoint?: never;
    }
  | {
      lambdaFunction?: never;
      ecsService?: never;
      ec2Instance?: never;
      ebsVolume?: never;
      ec2AutoScalingGroup?: never;
      ec2ReservedInstances?: never;
      rdsReservedInstances?: never;
      elastiCacheReservedInstances?: never;
      openSearchReservedInstances?: never;
      redshiftReservedInstances?: never;
      ec2InstanceSavingsPlans: Ec2InstanceSavingsPlans;
      computeSavingsPlans?: never;
      sageMakerSavingsPlans?: never;
      rdsDbInstance?: never;
      rdsDbInstanceStorage?: never;
      auroraDbClusterStorage?: never;
      dynamoDbReservedCapacity?: never;
      memoryDbReservedInstances?: never;
      natGateway?: never;
      dynamoDbTable?: never;
      elastiCacheCluster?: never;
      memoryDbCluster?: never;
      documentDbCluster?: never;
      workSpaces?: never;
      sageMakerEndpoint?: never;
    }
  | {
      lambdaFunction?: never;
      ecsService?: never;
      ec2Instance?: never;
      ebsVolume?: never;
      ec2AutoScalingGroup?: never;
      ec2ReservedInstances?: never;
      rdsReservedInstances?: never;
      elastiCacheReservedInstances?: never;
      openSearchReservedInstances?: never;
      redshiftReservedInstances?: never;
      ec2InstanceSavingsPlans?: never;
      computeSavingsPlans: ComputeSavingsPlans;
      sageMakerSavingsPlans?: never;
      rdsDbInstance?: never;
      rdsDbInstanceStorage?: never;
      auroraDbClusterStorage?: never;
      dynamoDbReservedCapacity?: never;
      memoryDbReservedInstances?: never;
      natGateway?: never;
      dynamoDbTable?: never;
      elastiCacheCluster?: never;
      memoryDbCluster?: never;
      documentDbCluster?: never;
      workSpaces?: never;
      sageMakerEndpoint?: never;
    }
  | {
      lambdaFunction?: never;
      ecsService?: never;
      ec2Instance?: never;
      ebsVolume?: never;
      ec2AutoScalingGroup?: never;
      ec2ReservedInstances?: never;
      rdsReservedInstances?: never;
      elastiCacheReservedInstances?: never;
      openSearchReservedInstances?: never;
      redshiftReservedInstances?: never;
      ec2InstanceSavingsPlans?: never;
      computeSavingsPlans?: never;
      sageMakerSavingsPlans: SageMakerSavingsPlans;
      rdsDbInstance?: never;
      rdsDbInstanceStorage?: never;
      auroraDbClusterStorage?: never;
      dynamoDbReservedCapacity?: never;
      memoryDbReservedInstances?: never;
      natGateway?: never;
      dynamoDbTable?: never;
      elastiCacheCluster?: never;
      memoryDbCluster?: never;
      documentDbCluster?: never;
      workSpaces?: never;
      sageMakerEndpoint?: never;
    }
  | {
      lambdaFunction?: never;
      ecsService?: never;
      ec2Instance?: never;
      ebsVolume?: never;
      ec2AutoScalingGroup?: never;
      ec2ReservedInstances?: never;
      rdsReservedInstances?: never;
      elastiCacheReservedInstances?: never;
      openSearchReservedInstances?: never;
      redshiftReservedInstances?: never;
      ec2InstanceSavingsPlans?: never;
      computeSavingsPlans?: never;
      sageMakerSavingsPlans?: never;
      rdsDbInstance: RdsDbInstance;
      rdsDbInstanceStorage?: never;
      auroraDbClusterStorage?: never;
      dynamoDbReservedCapacity?: never;
      memoryDbReservedInstances?: never;
      natGateway?: never;
      dynamoDbTable?: never;
      elastiCacheCluster?: never;
      memoryDbCluster?: never;
      documentDbCluster?: never;
      workSpaces?: never;
      sageMakerEndpoint?: never;
    }
  | {
      lambdaFunction?: never;
      ecsService?: never;
      ec2Instance?: never;
      ebsVolume?: never;
      ec2AutoScalingGroup?: never;
      ec2ReservedInstances?: never;
      rdsReservedInstances?: never;
      elastiCacheReservedInstances?: never;
      openSearchReservedInstances?: never;
      redshiftReservedInstances?: never;
      ec2InstanceSavingsPlans?: never;
      computeSavingsPlans?: never;
      sageMakerSavingsPlans?: never;
      rdsDbInstance?: never;
      rdsDbInstanceStorage: RdsDbInstanceStorage;
      auroraDbClusterStorage?: never;
      dynamoDbReservedCapacity?: never;
      memoryDbReservedInstances?: never;
      natGateway?: never;
      dynamoDbTable?: never;
      elastiCacheCluster?: never;
      memoryDbCluster?: never;
      documentDbCluster?: never;
      workSpaces?: never;
      sageMakerEndpoint?: never;
    }
  | {
      lambdaFunction?: never;
      ecsService?: never;
      ec2Instance?: never;
      ebsVolume?: never;
      ec2AutoScalingGroup?: never;
      ec2ReservedInstances?: never;
      rdsReservedInstances?: never;
      elastiCacheReservedInstances?: never;
      openSearchReservedInstances?: never;
      redshiftReservedInstances?: never;
      ec2InstanceSavingsPlans?: never;
      computeSavingsPlans?: never;
      sageMakerSavingsPlans?: never;
      rdsDbInstance?: never;
      rdsDbInstanceStorage?: never;
      auroraDbClusterStorage: AuroraDbClusterStorage;
      dynamoDbReservedCapacity?: never;
      memoryDbReservedInstances?: never;
      natGateway?: never;
      dynamoDbTable?: never;
      elastiCacheCluster?: never;
      memoryDbCluster?: never;
      documentDbCluster?: never;
      workSpaces?: never;
      sageMakerEndpoint?: never;
    }
  | {
      lambdaFunction?: never;
      ecsService?: never;
      ec2Instance?: never;
      ebsVolume?: never;
      ec2AutoScalingGroup?: never;
      ec2ReservedInstances?: never;
      rdsReservedInstances?: never;
      elastiCacheReservedInstances?: never;
      openSearchReservedInstances?: never;
      redshiftReservedInstances?: never;
      ec2InstanceSavingsPlans?: never;
      computeSavingsPlans?: never;
      sageMakerSavingsPlans?: never;
      rdsDbInstance?: never;
      rdsDbInstanceStorage?: never;
      auroraDbClusterStorage?: never;
      dynamoDbReservedCapacity: DynamoDbReservedCapacity;
      memoryDbReservedInstances?: never;
      natGateway?: never;
      dynamoDbTable?: never;
      elastiCacheCluster?: never;
      memoryDbCluster?: never;
      documentDbCluster?: never;
      workSpaces?: never;
      sageMakerEndpoint?: never;
    }
  | {
      lambdaFunction?: never;
      ecsService?: never;
      ec2Instance?: never;
      ebsVolume?: never;
      ec2AutoScalingGroup?: never;
      ec2ReservedInstances?: never;
      rdsReservedInstances?: never;
      elastiCacheReservedInstances?: never;
      openSearchReservedInstances?: never;
      redshiftReservedInstances?: never;
      ec2InstanceSavingsPlans?: never;
      computeSavingsPlans?: never;
      sageMakerSavingsPlans?: never;
      rdsDbInstance?: never;
      rdsDbInstanceStorage?: never;
      auroraDbClusterStorage?: never;
      dynamoDbReservedCapacity?: never;
      memoryDbReservedInstances: MemoryDbReservedInstances;
      natGateway?: never;
      dynamoDbTable?: never;
      elastiCacheCluster?: never;
      memoryDbCluster?: never;
      documentDbCluster?: never;
      workSpaces?: never;
      sageMakerEndpoint?: never;
    }
  | {
      lambdaFunction?: never;
      ecsService?: never;
      ec2Instance?: never;
      ebsVolume?: never;
      ec2AutoScalingGroup?: never;
      ec2ReservedInstances?: never;
      rdsReservedInstances?: never;
      elastiCacheReservedInstances?: never;
      openSearchReservedInstances?: never;
      redshiftReservedInstances?: never;
      ec2InstanceSavingsPlans?: never;
      computeSavingsPlans?: never;
      sageMakerSavingsPlans?: never;
      rdsDbInstance?: never;
      rdsDbInstanceStorage?: never;
      auroraDbClusterStorage?: never;
      dynamoDbReservedCapacity?: never;
      memoryDbReservedInstances?: never;
      natGateway: NatGateway;
      dynamoDbTable?: never;
      elastiCacheCluster?: never;
      memoryDbCluster?: never;
      documentDbCluster?: never;
      workSpaces?: never;
      sageMakerEndpoint?: never;
    }
  | {
      lambdaFunction?: never;
      ecsService?: never;
      ec2Instance?: never;
      ebsVolume?: never;
      ec2AutoScalingGroup?: never;
      ec2ReservedInstances?: never;
      rdsReservedInstances?: never;
      elastiCacheReservedInstances?: never;
      openSearchReservedInstances?: never;
      redshiftReservedInstances?: never;
      ec2InstanceSavingsPlans?: never;
      computeSavingsPlans?: never;
      sageMakerSavingsPlans?: never;
      rdsDbInstance?: never;
      rdsDbInstanceStorage?: never;
      auroraDbClusterStorage?: never;
      dynamoDbReservedCapacity?: never;
      memoryDbReservedInstances?: never;
      natGateway?: never;
      dynamoDbTable: DynamoDbTable;
      elastiCacheCluster?: never;
      memoryDbCluster?: never;
      documentDbCluster?: never;
      workSpaces?: never;
      sageMakerEndpoint?: never;
    }
  | {
      lambdaFunction?: never;
      ecsService?: never;
      ec2Instance?: never;
      ebsVolume?: never;
      ec2AutoScalingGroup?: never;
      ec2ReservedInstances?: never;
      rdsReservedInstances?: never;
      elastiCacheReservedInstances?: never;
      openSearchReservedInstances?: never;
      redshiftReservedInstances?: never;
      ec2InstanceSavingsPlans?: never;
      computeSavingsPlans?: never;
      sageMakerSavingsPlans?: never;
      rdsDbInstance?: never;
      rdsDbInstanceStorage?: never;
      auroraDbClusterStorage?: never;
      dynamoDbReservedCapacity?: never;
      memoryDbReservedInstances?: never;
      natGateway?: never;
      dynamoDbTable?: never;
      elastiCacheCluster: ElastiCacheCluster;
      memoryDbCluster?: never;
      documentDbCluster?: never;
      workSpaces?: never;
      sageMakerEndpoint?: never;
    }
  | {
      lambdaFunction?: never;
      ecsService?: never;
      ec2Instance?: never;
      ebsVolume?: never;
      ec2AutoScalingGroup?: never;
      ec2ReservedInstances?: never;
      rdsReservedInstances?: never;
      elastiCacheReservedInstances?: never;
      openSearchReservedInstances?: never;
      redshiftReservedInstances?: never;
      ec2InstanceSavingsPlans?: never;
      computeSavingsPlans?: never;
      sageMakerSavingsPlans?: never;
      rdsDbInstance?: never;
      rdsDbInstanceStorage?: never;
      auroraDbClusterStorage?: never;
      dynamoDbReservedCapacity?: never;
      memoryDbReservedInstances?: never;
      natGateway?: never;
      dynamoDbTable?: never;
      elastiCacheCluster?: never;
      memoryDbCluster: MemoryDbCluster;
      documentDbCluster?: never;
      workSpaces?: never;
      sageMakerEndpoint?: never;
    }
  | {
      lambdaFunction?: never;
      ecsService?: never;
      ec2Instance?: never;
      ebsVolume?: never;
      ec2AutoScalingGroup?: never;
      ec2ReservedInstances?: never;
      rdsReservedInstances?: never;
      elastiCacheReservedInstances?: never;
      openSearchReservedInstances?: never;
      redshiftReservedInstances?: never;
      ec2InstanceSavingsPlans?: never;
      computeSavingsPlans?: never;
      sageMakerSavingsPlans?: never;
      rdsDbInstance?: never;
      rdsDbInstanceStorage?: never;
      auroraDbClusterStorage?: never;
      dynamoDbReservedCapacity?: never;
      memoryDbReservedInstances?: never;
      natGateway?: never;
      dynamoDbTable?: never;
      elastiCacheCluster?: never;
      memoryDbCluster?: never;
      documentDbCluster: DocumentDbCluster;
      workSpaces?: never;
      sageMakerEndpoint?: never;
    }
  | {
      lambdaFunction?: never;
      ecsService?: never;
      ec2Instance?: never;
      ebsVolume?: never;
      ec2AutoScalingGroup?: never;
      ec2ReservedInstances?: never;
      rdsReservedInstances?: never;
      elastiCacheReservedInstances?: never;
      openSearchReservedInstances?: never;
      redshiftReservedInstances?: never;
      ec2InstanceSavingsPlans?: never;
      computeSavingsPlans?: never;
      sageMakerSavingsPlans?: never;
      rdsDbInstance?: never;
      rdsDbInstanceStorage?: never;
      auroraDbClusterStorage?: never;
      dynamoDbReservedCapacity?: never;
      memoryDbReservedInstances?: never;
      natGateway?: never;
      dynamoDbTable?: never;
      elastiCacheCluster?: never;
      memoryDbCluster?: never;
      documentDbCluster?: never;
      workSpaces: WorkSpaces;
      sageMakerEndpoint?: never;
    }
  | {
      lambdaFunction?: never;
      ecsService?: never;
      ec2Instance?: never;
      ebsVolume?: never;
      ec2AutoScalingGroup?: never;
      ec2ReservedInstances?: never;
      rdsReservedInstances?: never;
      elastiCacheReservedInstances?: never;
      openSearchReservedInstances?: never;
      redshiftReservedInstances?: never;
      ec2InstanceSavingsPlans?: never;
      computeSavingsPlans?: never;
      sageMakerSavingsPlans?: never;
      rdsDbInstance?: never;
      rdsDbInstanceStorage?: never;
      auroraDbClusterStorage?: never;
      dynamoDbReservedCapacity?: never;
      memoryDbReservedInstances?: never;
      natGateway?: never;
      dynamoDbTable?: never;
      elastiCacheCluster?: never;
      memoryDbCluster?: never;
      documentDbCluster?: never;
      workSpaces?: never;
      sageMakerEndpoint: SageMakerEndpoint;
    };
export const ResourceDetails = /*@__PURE__*/ S.Union([
  S.Struct({ lambdaFunction: LambdaFunction }),
  S.Struct({ ecsService: EcsService }),
  S.Struct({ ec2Instance: Ec2Instance }),
  S.Struct({ ebsVolume: EbsVolume }),
  S.Struct({ ec2AutoScalingGroup: Ec2AutoScalingGroup }),
  S.Struct({ ec2ReservedInstances: Ec2ReservedInstances }),
  S.Struct({ rdsReservedInstances: RdsReservedInstances }),
  S.Struct({ elastiCacheReservedInstances: ElastiCacheReservedInstances }),
  S.Struct({ openSearchReservedInstances: OpenSearchReservedInstances }),
  S.Struct({ redshiftReservedInstances: RedshiftReservedInstances }),
  S.Struct({ ec2InstanceSavingsPlans: Ec2InstanceSavingsPlans }),
  S.Struct({ computeSavingsPlans: ComputeSavingsPlans }),
  S.Struct({ sageMakerSavingsPlans: SageMakerSavingsPlans }),
  S.Struct({ rdsDbInstance: RdsDbInstance }),
  S.Struct({ rdsDbInstanceStorage: RdsDbInstanceStorage }),
  S.Struct({ auroraDbClusterStorage: AuroraDbClusterStorage }),
  S.Struct({ dynamoDbReservedCapacity: DynamoDbReservedCapacity }),
  S.Struct({ memoryDbReservedInstances: MemoryDbReservedInstances }),
  S.Struct({ natGateway: NatGateway }),
  S.Struct({ dynamoDbTable: DynamoDbTable }),
  S.Struct({ elastiCacheCluster: ElastiCacheCluster }),
  S.Struct({ memoryDbCluster: MemoryDbCluster }),
  S.Struct({ documentDbCluster: DocumentDbCluster }),
  S.Struct({ workSpaces: WorkSpaces }),
  S.Struct({ sageMakerEndpoint: SageMakerEndpoint }),
]);
export interface Tag {
  key?: string;
  value?: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.optional(S.String), value: S.optional(S.String) }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = /*@__PURE__*/ S.Array(Tag);
export interface GetRecommendationResponse {
  recommendationId?: string;
  resourceId?: string;
  resourceArn?: string;
  accountId?: string;
  currencyCode?: string;
  recommendationLookbackPeriodInDays?: number;
  costCalculationLookbackPeriodInDays?: number;
  estimatedSavingsPercentage?: number;
  estimatedSavingsOverCostCalculationLookbackPeriod?: number;
  currentResourceType?: ResourceType;
  recommendedResourceType?: ResourceType;
  region?: string;
  source?: Source;
  lastRefreshTimestamp?: Date;
  estimatedMonthlySavings?: number;
  estimatedMonthlyCost?: number;
  implementationEffort?: ImplementationEffort;
  restartNeeded?: boolean;
  actionType?: ActionType;
  rollbackPossible?: boolean;
  currentResourceDetails?: ResourceDetails;
  recommendedResourceDetails?: ResourceDetails;
  tags?: Tag[];
}
export const GetRecommendationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    recommendationId: S.optional(S.String),
    resourceId: S.optional(S.String),
    resourceArn: S.optional(S.String),
    accountId: S.optional(S.String),
    currencyCode: S.optional(S.String),
    recommendationLookbackPeriodInDays: S.optional(S.Number),
    costCalculationLookbackPeriodInDays: S.optional(S.Number),
    estimatedSavingsPercentage: S.optional(S.Number),
    estimatedSavingsOverCostCalculationLookbackPeriod: S.optional(S.Number),
    currentResourceType: S.optional(ResourceType),
    recommendedResourceType: S.optional(ResourceType),
    region: S.optional(S.String),
    source: S.optional(Source),
    lastRefreshTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    estimatedMonthlySavings: S.optional(S.Number),
    estimatedMonthlyCost: S.optional(S.Number),
    implementationEffort: S.optional(ImplementationEffort),
    restartNeeded: S.optional(S.Boolean),
    actionType: S.optional(ActionType),
    rollbackPossible: S.optional(S.Boolean),
    currentResourceDetails: S.optional(ResourceDetails),
    recommendedResourceDetails: S.optional(ResourceDetails),
    tags: S.optional(TagList),
  }),
).annotate({
  identifier: "GetRecommendationResponse",
}) as any as S.Schema<GetRecommendationResponse>;
export type GranularityType = "Daily" | "Monthly" | (string & {});
export const GranularityType = S.String;

export interface TimePeriod {
  start: string;
  end: string;
}
export const TimePeriod = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ start: S.String, end: S.String }),
).annotate({ identifier: "TimePeriod" }) as any as S.Schema<TimePeriod>;
export type MaxResults = number;
export type Order = "Asc" | "Desc" | (string & {});
export const Order = S.String;

export interface OrderBy {
  dimension?: string;
  order?: Order;
}
export const OrderBy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ dimension: S.optional(S.String), order: S.optional(Order) }),
).annotate({ identifier: "OrderBy" }) as any as S.Schema<OrderBy>;
export interface ListEfficiencyMetricsRequest {
  groupBy?: string;
  granularity: GranularityType;
  timePeriod: TimePeriod;
  maxResults?: number;
  orderBy?: OrderBy;
  nextToken?: string;
}
export const ListEfficiencyMetricsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    groupBy: S.optional(S.String),
    granularity: GranularityType,
    timePeriod: TimePeriod,
    maxResults: S.optional(S.Number),
    orderBy: S.optional(OrderBy),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListEfficiencyMetricsRequest",
}) as any as S.Schema<ListEfficiencyMetricsRequest>;
export interface MetricsByTime {
  score?: number;
  savings?: number;
  spend?: number;
  timestamp?: string;
}
export const MetricsByTime = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    score: S.optional(S.Number),
    savings: S.optional(S.Number),
    spend: S.optional(S.Number),
    timestamp: S.optional(S.String),
  }),
).annotate({ identifier: "MetricsByTime" }) as any as S.Schema<MetricsByTime>;
export type MetricsByTimeList = MetricsByTime[];
export const MetricsByTimeList = /*@__PURE__*/ S.Array(MetricsByTime);
export interface EfficiencyMetricsByGroup {
  metricsByTime?: MetricsByTime[];
  group?: string;
  message?: string;
}
export const EfficiencyMetricsByGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    metricsByTime: S.optional(MetricsByTimeList),
    group: S.optional(S.String),
    message: S.optional(S.String),
  }),
).annotate({
  identifier: "EfficiencyMetricsByGroup",
}) as any as S.Schema<EfficiencyMetricsByGroup>;
export type EfficiencyMetricsByGroupList = EfficiencyMetricsByGroup[];
export const EfficiencyMetricsByGroupList = /*@__PURE__*/ S.Array(
  EfficiencyMetricsByGroup,
);
export interface ListEfficiencyMetricsResponse {
  efficiencyMetricsByGroup?: EfficiencyMetricsByGroup[];
  nextToken?: string;
}
export const ListEfficiencyMetricsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    efficiencyMetricsByGroup: S.optional(EfficiencyMetricsByGroupList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListEfficiencyMetricsResponse",
}) as any as S.Schema<ListEfficiencyMetricsResponse>;
export type AccountId = string;
export interface ListEnrollmentStatusesRequest {
  includeOrganizationInfo?: boolean;
  accountId?: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListEnrollmentStatusesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    includeOrganizationInfo: S.optional(S.Boolean),
    accountId: S.optional(S.String),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListEnrollmentStatusesRequest",
}) as any as S.Schema<ListEnrollmentStatusesRequest>;
export type EnrollmentStatus = "Active" | "Inactive" | (string & {});
export const EnrollmentStatus = S.String;

export interface AccountEnrollmentStatus {
  accountId?: string;
  status?: EnrollmentStatus;
  lastUpdatedTimestamp?: Date;
  createdTimestamp?: Date;
}
export const AccountEnrollmentStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountId: S.optional(S.String),
    status: S.optional(EnrollmentStatus),
    lastUpdatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    createdTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "AccountEnrollmentStatus",
}) as any as S.Schema<AccountEnrollmentStatus>;
export type AccountEnrollmentStatuses = AccountEnrollmentStatus[];
export const AccountEnrollmentStatuses = /*@__PURE__*/ S.Array(
  AccountEnrollmentStatus,
);
export interface ListEnrollmentStatusesResponse {
  items?: AccountEnrollmentStatus[];
  includeMemberAccounts?: boolean;
  nextToken?: string;
}
export const ListEnrollmentStatusesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(AccountEnrollmentStatuses),
    includeMemberAccounts: S.optional(S.Boolean),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListEnrollmentStatusesResponse",
}) as any as S.Schema<ListEnrollmentStatusesResponse>;
export type ImplementationEffortList = ImplementationEffort[];
export const ImplementationEffortList =
  /*@__PURE__*/ S.Array(ImplementationEffort);
export type AccountIdList = string[];
export const AccountIdList = /*@__PURE__*/ S.Array(S.String);
export type RegionList = string[];
export const RegionList = /*@__PURE__*/ S.Array(S.String);
export type ResourceTypeList = ResourceType[];
export const ResourceTypeList = /*@__PURE__*/ S.Array(ResourceType);
export type ActionTypeList = ActionType[];
export const ActionTypeList = /*@__PURE__*/ S.Array(ActionType);
export type ResourceIdList = string[];
export const ResourceIdList = /*@__PURE__*/ S.Array(S.String);
export type ResourceArnList = string[];
export const ResourceArnList = /*@__PURE__*/ S.Array(S.String);
export type RecommendationIdList = string[];
export const RecommendationIdList = /*@__PURE__*/ S.Array(S.String);
export interface Filter {
  restartNeeded?: boolean;
  rollbackPossible?: boolean;
  implementationEfforts?: ImplementationEffort[];
  accountIds?: string[];
  regions?: string[];
  resourceTypes?: ResourceType[];
  actionTypes?: ActionType[];
  tags?: Tag[];
  resourceIds?: string[];
  resourceArns?: string[];
  recommendationIds?: string[];
}
export const Filter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restartNeeded: S.optional(S.Boolean),
    rollbackPossible: S.optional(S.Boolean),
    implementationEfforts: S.optional(ImplementationEffortList),
    accountIds: S.optional(AccountIdList),
    regions: S.optional(RegionList),
    resourceTypes: S.optional(ResourceTypeList),
    actionTypes: S.optional(ActionTypeList),
    tags: S.optional(TagList),
    resourceIds: S.optional(ResourceIdList),
    resourceArns: S.optional(ResourceArnList),
    recommendationIds: S.optional(RecommendationIdList),
  }),
).annotate({ identifier: "Filter" }) as any as S.Schema<Filter>;
export interface ListRecommendationsRequest {
  filter?: Filter;
  orderBy?: OrderBy;
  includeAllRecommendations?: boolean;
  maxResults?: number;
  nextToken?: string;
}
export const ListRecommendationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    filter: S.optional(Filter),
    orderBy: S.optional(OrderBy),
    includeAllRecommendations: S.optional(S.Boolean),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListRecommendationsRequest",
}) as any as S.Schema<ListRecommendationsRequest>;
export interface Recommendation {
  recommendationId?: string;
  accountId?: string;
  region?: string;
  resourceId?: string;
  resourceArn?: string;
  currentResourceType?: string;
  recommendedResourceType?: string;
  estimatedMonthlySavings?: number;
  estimatedSavingsPercentage?: number;
  estimatedMonthlyCost?: number;
  currencyCode?: string;
  implementationEffort?: string;
  restartNeeded?: boolean;
  actionType?: string;
  rollbackPossible?: boolean;
  currentResourceSummary?: string;
  recommendedResourceSummary?: string;
  lastRefreshTimestamp?: Date;
  recommendationLookbackPeriodInDays?: number;
  source?: Source;
  tags?: Tag[];
}
export const Recommendation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    recommendationId: S.optional(S.String),
    accountId: S.optional(S.String),
    region: S.optional(S.String),
    resourceId: S.optional(S.String),
    resourceArn: S.optional(S.String),
    currentResourceType: S.optional(S.String),
    recommendedResourceType: S.optional(S.String),
    estimatedMonthlySavings: S.optional(S.Number),
    estimatedSavingsPercentage: S.optional(S.Number),
    estimatedMonthlyCost: S.optional(S.Number),
    currencyCode: S.optional(S.String),
    implementationEffort: S.optional(S.String),
    restartNeeded: S.optional(S.Boolean),
    actionType: S.optional(S.String),
    rollbackPossible: S.optional(S.Boolean),
    currentResourceSummary: S.optional(S.String),
    recommendedResourceSummary: S.optional(S.String),
    lastRefreshTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    recommendationLookbackPeriodInDays: S.optional(S.Number),
    source: S.optional(Source),
    tags: S.optional(TagList),
  }),
).annotate({ identifier: "Recommendation" }) as any as S.Schema<Recommendation>;
export type RecommendationList = Recommendation[];
export const RecommendationList = /*@__PURE__*/ S.Array(Recommendation);
export interface ListRecommendationsResponse {
  items?: Recommendation[];
  nextToken?: string;
}
export const ListRecommendationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(RecommendationList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListRecommendationsResponse",
}) as any as S.Schema<ListRecommendationsResponse>;
export type SummaryMetrics = "SavingsPercentage" | (string & {});
export const SummaryMetrics = S.String;

export type SummaryMetricsList = SummaryMetrics[];
export const SummaryMetricsList = /*@__PURE__*/ S.Array(SummaryMetrics);
export interface ListRecommendationSummariesRequest {
  filter?: Filter;
  groupBy: string;
  maxResults?: number;
  metrics?: SummaryMetrics[];
  nextToken?: string;
}
export const ListRecommendationSummariesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    filter: S.optional(Filter),
    groupBy: S.String,
    maxResults: S.optional(S.Number),
    metrics: S.optional(SummaryMetricsList),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListRecommendationSummariesRequest",
}) as any as S.Schema<ListRecommendationSummariesRequest>;
export interface RecommendationSummary {
  group?: string;
  estimatedMonthlySavings?: number;
  recommendationCount?: number;
}
export const RecommendationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    group: S.optional(S.String),
    estimatedMonthlySavings: S.optional(S.Number),
    recommendationCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "RecommendationSummary",
}) as any as S.Schema<RecommendationSummary>;
export type RecommendationSummariesList = RecommendationSummary[];
export const RecommendationSummariesList = /*@__PURE__*/ S.Array(
  RecommendationSummary,
);
export interface SummaryMetricsResult {
  savingsPercentage?: string;
}
export const SummaryMetricsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ savingsPercentage: S.optional(S.String) }),
).annotate({
  identifier: "SummaryMetricsResult",
}) as any as S.Schema<SummaryMetricsResult>;
export interface ListRecommendationSummariesResponse {
  estimatedTotalDedupedSavings?: number;
  items?: RecommendationSummary[];
  groupBy?: string;
  currencyCode?: string;
  metrics?: SummaryMetricsResult;
  nextToken?: string;
}
export const ListRecommendationSummariesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    estimatedTotalDedupedSavings: S.optional(S.Number),
    items: S.optional(RecommendationSummariesList),
    groupBy: S.optional(S.String),
    currencyCode: S.optional(S.String),
    metrics: S.optional(SummaryMetricsResult),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListRecommendationSummariesResponse",
}) as any as S.Schema<ListRecommendationSummariesResponse>;
export interface UpdateEnrollmentStatusRequest {
  status: EnrollmentStatus;
  includeMemberAccounts?: boolean;
}
export const UpdateEnrollmentStatusRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: EnrollmentStatus,
    includeMemberAccounts: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateEnrollmentStatusRequest",
}) as any as S.Schema<UpdateEnrollmentStatusRequest>;
export interface UpdateEnrollmentStatusResponse {
  status?: string;
}
export const UpdateEnrollmentStatusResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: S.optional(S.String) }),
).annotate({
  identifier: "UpdateEnrollmentStatusResponse",
}) as any as S.Schema<UpdateEnrollmentStatusResponse>;
export interface UpdatePreferencesRequest {
  savingsEstimationMode?: SavingsEstimationMode;
  memberAccountDiscountVisibility?: MemberAccountDiscountVisibility;
  preferredCommitment?: PreferredCommitment;
}
export const UpdatePreferencesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    savingsEstimationMode: S.optional(SavingsEstimationMode),
    memberAccountDiscountVisibility: S.optional(
      MemberAccountDiscountVisibility,
    ),
    preferredCommitment: S.optional(PreferredCommitment),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdatePreferencesRequest",
}) as any as S.Schema<UpdatePreferencesRequest>;
export interface UpdatePreferencesResponse {
  savingsEstimationMode?: SavingsEstimationMode;
  memberAccountDiscountVisibility?: MemberAccountDiscountVisibility;
  preferredCommitment?: PreferredCommitment;
}
export const UpdatePreferencesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    savingsEstimationMode: S.optional(SavingsEstimationMode),
    memberAccountDiscountVisibility: S.optional(
      MemberAccountDiscountVisibility,
    ),
    preferredCommitment: S.optional(PreferredCommitment),
  }),
).annotate({
  identifier: "UpdatePreferencesResponse",
}) as any as S.Schema<UpdatePreferencesResponse>;
export type ValidationExceptionReason =
  | "FieldValidationFailed"
  | "Other"
  | (string & {});
export const ValidationExceptionReason = S.String;

export interface ValidationExceptionDetail {
  fieldName: string;
  message: string;
}
export const ValidationExceptionDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ fieldName: S.String, message: S.String }),
).annotate({
  identifier: "ValidationExceptionDetail",
}) as any as S.Schema<ValidationExceptionDetail>;
export type ValidationExceptionDetails = ValidationExceptionDetail[];
export const ValidationExceptionDetails = /*@__PURE__*/ S.Array(
  ValidationExceptionDetail,
);
export type GetPreferencesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a set of preferences for an account in order to add account-specific preferences into the service. These preferences impact how the savings associated with recommendations are presented—estimated savings after discounts or estimated savings before discounts, for example.
 */
export const getPreferences: API.OperationMethod<
  GetPreferencesRequest,
  GetPreferencesResponse,
  GetPreferencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPreferencesRequest,
  output: GetPreferencesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPreferences",
}));

export type GetRecommendationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns both the current and recommended resource configuration and the estimated cost impact for a recommendation.
 *
 * The `recommendationId` is only valid for up to a maximum of 24 hours as recommendations are refreshed daily. To retrieve the `recommendationId`, use the `ListRecommendations` API.
 */
export const getRecommendation: API.OperationMethod<
  GetRecommendationRequest,
  GetRecommendationResponse,
  GetRecommendationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRecommendationRequest,
  output: GetRecommendationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRecommendation",
}));

export type ListEfficiencyMetricsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns cost efficiency metrics aggregated over time and optionally grouped by a specified dimension. The metrics provide insights into your cost optimization progress by tracking estimated savings, spending, and measures how effectively you're optimizing your Cloud resources.
 *
 * The operation supports both daily and monthly time granularities and allows grouping results by account ID, Amazon Web Services Region. Results are returned as time-series data, enabling you to analyze trends in your cost optimization performance over the specified time period.
 */
export const listEfficiencyMetrics: API.PaginatedOperationMethod<
  ListEfficiencyMetricsRequest,
  ListEfficiencyMetricsResponse,
  ListEfficiencyMetricsError,
  Credentials | HttpClient.HttpClient,
  EfficiencyMetricsByGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEfficiencyMetricsRequest,
  output: ListEfficiencyMetricsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEfficiencyMetrics",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "efficiencyMetricsByGroup",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEnrollmentStatusesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the enrollment status for an account. It can also return the list of accounts that are enrolled under the organization.
 */
export const listEnrollmentStatuses: API.PaginatedOperationMethod<
  ListEnrollmentStatusesRequest,
  ListEnrollmentStatusesResponse,
  ListEnrollmentStatusesError,
  Credentials | HttpClient.HttpClient,
  AccountEnrollmentStatus
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEnrollmentStatusesRequest,
  output: ListEnrollmentStatusesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnrollmentStatuses",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRecommendationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of recommendations.
 */
export const listRecommendations: API.PaginatedOperationMethod<
  ListRecommendationsRequest,
  ListRecommendationsResponse,
  ListRecommendationsError,
  Credentials | HttpClient.HttpClient,
  Recommendation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRecommendationsRequest,
  output: ListRecommendationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecommendations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRecommendationSummariesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a concise representation of savings estimates for resources. Also returns de-duped savings across different types of recommendations.
 *
 * The following filters are not supported for this API: `recommendationIds`, `resourceArns`, and `resourceIds`.
 */
export const listRecommendationSummaries: API.PaginatedOperationMethod<
  ListRecommendationSummariesRequest,
  ListRecommendationSummariesResponse,
  ListRecommendationSummariesError,
  Credentials | HttpClient.HttpClient,
  RecommendationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRecommendationSummariesRequest,
  output: ListRecommendationSummariesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecommendationSummaries",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type UpdateEnrollmentStatusError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the enrollment (opt in and opt out) status of an account to the Cost Optimization Hub service.
 *
 * If the account is a management account of an organization, this action can also be used to enroll member accounts of the organization.
 *
 * You must have the appropriate permissions to opt in to Cost Optimization Hub and to view its recommendations. When you opt in, Cost Optimization Hub automatically creates a service-linked role in your account to access its data.
 */
export const updateEnrollmentStatus: API.OperationMethod<
  UpdateEnrollmentStatusRequest,
  UpdateEnrollmentStatusResponse,
  UpdateEnrollmentStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateEnrollmentStatusRequest,
  output: UpdateEnrollmentStatusResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEnrollmentStatus",
}));

export type UpdatePreferencesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a set of preferences for an account in order to add account-specific preferences into the service. These preferences impact how the savings associated with recommendations are presented.
 */
export const updatePreferences: API.OperationMethod<
  UpdatePreferencesRequest,
  UpdatePreferencesResponse,
  UpdatePreferencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePreferencesRequest,
  output: UpdatePreferencesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePreferences",
}));
