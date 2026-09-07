import * as HttpClient from "effect/unstable/http/HttpClient";
import * as S from "@distilled.cloud/core/schema";
import * as API from "@distilled.cloud/core/api";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const ns = T.XmlNamespace("http://batch.amazonaws.com/doc/2016-08-10/");
const svc = T.AwsApiService({
  sdkId: "Batch",
  serviceShapeName: "AWSBatchV20160810",
});
const auth = T.AwsAuthSigv4({ name: "batch" });
const ver = T.ServiceVersion("2016-08-10");
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
              `https://batch-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (_.getAttr(PartitionResult, "name") === "aws") {
              return e(`https://fips.batch.${Region}.amazonaws.com`);
            }
            if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
              return e(`https://batch.${Region}.amazonaws.com`);
            }
            return e(
              `https://batch-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://batch.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://batch.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class ClientException
  extends /*@__PURE__*/ S.TaggedError<ClientException>()(
    "ClientException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ComputeEnvironmentBeingModified
  extends /*@__PURE__*/ S.TaggedError<ComputeEnvironmentBeingModified>()(
    "ComputeEnvironmentBeingModified",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.SyntheticError({
      from: "ClientException",
      message: { includes: "is being modified" },
    }),
  ).pipe(C.withConflictError, C.withRetryableError) {}
export class ComputeEnvironmentInUse
  extends /*@__PURE__*/ S.TaggedError<ComputeEnvironmentInUse>()(
    "ComputeEnvironmentInUse",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.SyntheticError({
      from: "ClientException",
      message: { includes: "found existing JobQueue relationship" },
    }),
  ).pipe(C.withDependencyViolationError, C.withRetryableError) {}
export class ComputeEnvironmentNotFound
  extends /*@__PURE__*/ S.TaggedError<ComputeEnvironmentNotFound>()(
    "ComputeEnvironmentNotFound",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.SyntheticError({
      from: "ClientException",
      message: { matches: "compute-environment/.* does not exist" },
    }),
  ).pipe(C.withNotFoundError) {}
export class ComputeEnvironmentNotValid
  extends /*@__PURE__*/ S.TaggedError<ComputeEnvironmentNotValid>()(
    "ComputeEnvironmentNotValid",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.SyntheticError({
      from: "ClientException",
      message: { matches: "must be (created and )?valid before attaching" },
    }),
  ).pipe(C.withDependencyViolationError, C.withRetryableError) {}
export class JobQueueAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<JobQueueAlreadyExists>()(
    "JobQueueAlreadyExists",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.SyntheticError({
      from: "ClientException",
      message: { includes: "already exists" },
    }),
  ).pipe(C.withAlreadyExistsError, C.withConflictError) {}
export class JobQueueBeingModified
  extends /*@__PURE__*/ S.TaggedError<JobQueueBeingModified>()(
    "JobQueueBeingModified",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.SyntheticError({
      from: "ClientException",
      message: { includes: "is being modified" },
    }),
  ).pipe(C.withConflictError, C.withRetryableError) {}
export class JobQueueNotFound
  extends /*@__PURE__*/ S.TaggedError<JobQueueNotFound>()(
    "JobQueueNotFound",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.SyntheticError({
      from: "ClientException",
      message: { matches: "job-queue/.* does not exist" },
    }),
  ).pipe(C.withNotFoundError) {}
export class ServerException
  extends /*@__PURE__*/ S.TaggedError<ServerException>()(
    "ServerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export interface CancelJobRequest {
  jobId?: string;
  reason?: string;
}
export const CancelJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobId: S.optional(S.String), reason: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/canceljob" }),
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
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "CancelJobResponse",
}) as any as S.Schema<CancelJobResponse>;
export type CEType = "MANAGED" | "UNMANAGED" | (string & {});
export const CEType = S.String;

export type CEState = "ENABLED" | "DISABLED" | (string & {});
export const CEState = S.String;

export type CRType =
  | "EC2"
  | "SPOT"
  | "FARGATE"
  | "FARGATE_SPOT"
  | "ECS_MANAGED_INSTANCES"
  | (string & {});
export const CRType = S.String;

export type CRAllocationStrategy =
  | "BEST_FIT"
  | "BEST_FIT_PROGRESSIVE"
  | "BEST_FIT_PROGRESSIVE_ORDERED"
  | "SPOT_CAPACITY_OPTIMIZED"
  | "SPOT_PRICE_CAPACITY_OPTIMIZED"
  | "SPOT_CAPACITY_OPTIMIZED_PRIORITIZED"
  | (string & {});
export const CRAllocationStrategy = S.String;

export type StringList = string[];
export const StringList = /*@__PURE__*/ S.Array(S.String);
export type TagsMap = { [key: string]: string | undefined };
export const TagsMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type UserdataType = "EKS_BOOTSTRAP_SH" | "EKS_NODEADM" | (string & {});
export const UserdataType = S.String;

export interface LaunchTemplateSpecificationOverride {
  launchTemplateId?: string;
  launchTemplateName?: string;
  version?: string;
  targetInstanceTypes?: string[];
  userdataType?: UserdataType;
}
export const LaunchTemplateSpecificationOverride = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    launchTemplateId: S.optional(S.String),
    launchTemplateName: S.optional(S.String),
    version: S.optional(S.String),
    targetInstanceTypes: S.optional(StringList),
    userdataType: S.optional(UserdataType),
  }),
).annotate({
  identifier: "LaunchTemplateSpecificationOverride",
}) as any as S.Schema<LaunchTemplateSpecificationOverride>;
export type LaunchTemplateSpecificationOverrideList =
  LaunchTemplateSpecificationOverride[];
export const LaunchTemplateSpecificationOverrideList = /*@__PURE__*/ S.Array(
  LaunchTemplateSpecificationOverride,
);
export interface LaunchTemplateSpecification {
  launchTemplateId?: string;
  launchTemplateName?: string;
  version?: string;
  overrides?: LaunchTemplateSpecificationOverride[];
  userdataType?: UserdataType;
}
export const LaunchTemplateSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    launchTemplateId: S.optional(S.String),
    launchTemplateName: S.optional(S.String),
    version: S.optional(S.String),
    overrides: S.optional(LaunchTemplateSpecificationOverrideList),
    userdataType: S.optional(UserdataType),
  }),
).annotate({
  identifier: "LaunchTemplateSpecification",
}) as any as S.Schema<LaunchTemplateSpecification>;
export type ImageType = string;
export type ImageIdOverride = string;
export type KubernetesVersion = string;
export interface Ec2Configuration {
  imageType?: string;
  imageIdOverride?: string;
  batchImageStatus?: string;
  imageKubernetesVersion?: string;
}
export const Ec2Configuration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    imageType: S.optional(S.String),
    imageIdOverride: S.optional(S.String),
    batchImageStatus: S.optional(S.String),
    imageKubernetesVersion: S.optional(S.String),
  }),
).annotate({
  identifier: "Ec2Configuration",
}) as any as S.Schema<Ec2Configuration>;
export type Ec2ConfigurationList = Ec2Configuration[];
export const Ec2ConfigurationList = /*@__PURE__*/ S.Array(Ec2Configuration);
export interface ComputeScalingPolicy {
  minScaleDownDelayMinutes?: number;
}
export const ComputeScalingPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ minScaleDownDelayMinutes: S.optional(S.Number) }),
).annotate({
  identifier: "ComputeScalingPolicy",
}) as any as S.Schema<ComputeScalingPolicy>;
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
export interface InstanceRequirementsRequest {
  allowedInstanceTypes?: string[];
}
export const InstanceRequirementsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ allowedInstanceTypes: S.optional(StringList) }),
).annotate({
  identifier: "InstanceRequirementsRequest",
}) as any as S.Schema<InstanceRequirementsRequest>;
export interface ManagedInstancesStorageConfiguration {
  storageSizeGiB?: number;
}
export const ManagedInstancesStorageConfiguration = /*@__PURE__*/ S.suspend(
  () => S.Struct({ storageSizeGiB: S.optional(S.Number) }),
).annotate({
  identifier: "ManagedInstancesStorageConfiguration",
}) as any as S.Schema<ManagedInstancesStorageConfiguration>;
export interface CapacityReservationRequest {
  reservationGroupArn?: string;
  reservationPreference?: string;
}
export const CapacityReservationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    reservationGroupArn: S.optional(S.String),
    reservationPreference: S.optional(S.String),
  }),
).annotate({
  identifier: "CapacityReservationRequest",
}) as any as S.Schema<CapacityReservationRequest>;
export interface ManagedInstancesLocalStorageConfiguration {
  useLocalStorage?: boolean;
}
export const ManagedInstancesLocalStorageConfiguration =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ useLocalStorage: S.optional(S.Boolean) }),
  ).annotate({
    identifier: "ManagedInstancesLocalStorageConfiguration",
  }) as any as S.Schema<ManagedInstancesLocalStorageConfiguration>;
export interface InstanceLaunchTemplate {
  ec2InstanceProfileArn?: string;
  networkConfiguration?: ManagedInstancesNetworkConfiguration;
  instanceRequirements?: InstanceRequirementsRequest;
  capacityOptionType?: string;
  storageConfiguration?: ManagedInstancesStorageConfiguration;
  monitoring?: string;
  fipsEnabled?: boolean;
  capacityReservations?: CapacityReservationRequest;
  instanceMetadataTagsPropagation?: boolean;
  localStorageConfiguration?: ManagedInstancesLocalStorageConfiguration;
}
export const InstanceLaunchTemplate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ec2InstanceProfileArn: S.optional(S.String),
    networkConfiguration: S.optional(ManagedInstancesNetworkConfiguration),
    instanceRequirements: S.optional(InstanceRequirementsRequest),
    capacityOptionType: S.optional(S.String),
    storageConfiguration: S.optional(ManagedInstancesStorageConfiguration),
    monitoring: S.optional(S.String),
    fipsEnabled: S.optional(S.Boolean),
    capacityReservations: S.optional(CapacityReservationRequest),
    instanceMetadataTagsPropagation: S.optional(S.Boolean),
    localStorageConfiguration: S.optional(
      ManagedInstancesLocalStorageConfiguration,
    ),
  }),
).annotate({
  identifier: "InstanceLaunchTemplate",
}) as any as S.Schema<InstanceLaunchTemplate>;
export interface InfrastructureOptimization {
  scaleInAfter?: number;
}
export const InfrastructureOptimization = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ scaleInAfter: S.optional(S.Number) }),
).annotate({
  identifier: "InfrastructureOptimization",
}) as any as S.Schema<InfrastructureOptimization>;
export interface ManagedInstancesProvider {
  propagateTags?: string;
  infrastructureRoleArn?: string;
  instanceLaunchTemplate?: InstanceLaunchTemplate;
  infrastructureOptimization?: InfrastructureOptimization;
}
export const ManagedInstancesProvider = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    propagateTags: S.optional(S.String),
    infrastructureRoleArn: S.optional(S.String),
    instanceLaunchTemplate: S.optional(InstanceLaunchTemplate),
    infrastructureOptimization: S.optional(InfrastructureOptimization),
  }),
).annotate({
  identifier: "ManagedInstancesProvider",
}) as any as S.Schema<ManagedInstancesProvider>;
export type TagKey = string;
export type TagValue = string;
export type TagrisTagsMap = { [key: string]: string | undefined };
export const TagrisTagsMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface ComputeResource {
  type?: CRType;
  allocationStrategy?: CRAllocationStrategy;
  minvCpus?: number;
  maxvCpus?: number;
  desiredvCpus?: number;
  instanceTypes?: string[];
  imageId?: string;
  subnets?: string[];
  securityGroupIds?: string[];
  ec2KeyPair?: string;
  instanceRole?: string;
  tags?: { [key: string]: string | undefined };
  placementGroup?: string;
  bidPercentage?: number;
  spotIamFleetRole?: string;
  launchTemplate?: LaunchTemplateSpecification;
  ec2Configuration?: Ec2Configuration[];
  scalingPolicy?: ComputeScalingPolicy;
  managedInstancesProvider?: ManagedInstancesProvider;
  capacityTags?: { [key: string]: string | undefined };
}
export const ComputeResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(CRType),
    allocationStrategy: S.optional(CRAllocationStrategy),
    minvCpus: S.optional(S.Number),
    maxvCpus: S.optional(S.Number),
    desiredvCpus: S.optional(S.Number),
    instanceTypes: S.optional(StringList),
    imageId: S.optional(S.String),
    subnets: S.optional(StringList),
    securityGroupIds: S.optional(StringList),
    ec2KeyPair: S.optional(S.String),
    instanceRole: S.optional(S.String),
    tags: S.optional(TagsMap),
    placementGroup: S.optional(S.String),
    bidPercentage: S.optional(S.Number),
    spotIamFleetRole: S.optional(S.String),
    launchTemplate: S.optional(LaunchTemplateSpecification),
    ec2Configuration: S.optional(Ec2ConfigurationList),
    scalingPolicy: S.optional(ComputeScalingPolicy),
    managedInstancesProvider: S.optional(ManagedInstancesProvider),
    capacityTags: S.optional(TagrisTagsMap),
  }),
).annotate({
  identifier: "ComputeResource",
}) as any as S.Schema<ComputeResource>;
export interface EksConfiguration {
  eksClusterArn?: string;
  kubernetesNamespace?: string;
}
export const EksConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    eksClusterArn: S.optional(S.String),
    kubernetesNamespace: S.optional(S.String),
  }),
).annotate({
  identifier: "EksConfiguration",
}) as any as S.Schema<EksConfiguration>;
export type ContainerInsights =
  | "ENABLED"
  | "ENHANCED"
  | "DISABLED"
  | (string & {});
export const ContainerInsights = S.String;

export interface EcsSettings {
  containerInsights?: ContainerInsights;
}
export const EcsSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ containerInsights: S.optional(ContainerInsights) }),
).annotate({ identifier: "EcsSettings" }) as any as S.Schema<EcsSettings>;
export interface CreateComputeEnvironmentRequest {
  computeEnvironmentName?: string;
  type?: CEType;
  state?: CEState;
  unmanagedvCpus?: number;
  computeResources?: ComputeResource;
  serviceRole?: string;
  tags?: { [key: string]: string | undefined };
  eksConfiguration?: EksConfiguration;
  context?: string;
  ecsSettings?: EcsSettings;
}
export const CreateComputeEnvironmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    computeEnvironmentName: S.optional(S.String),
    type: S.optional(CEType),
    state: S.optional(CEState),
    unmanagedvCpus: S.optional(S.Number),
    computeResources: S.optional(ComputeResource),
    serviceRole: S.optional(S.String),
    tags: S.optional(TagrisTagsMap),
    eksConfiguration: S.optional(EksConfiguration),
    context: S.optional(S.String),
    ecsSettings: S.optional(EcsSettings),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/createcomputeenvironment" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateComputeEnvironmentRequest",
}) as any as S.Schema<CreateComputeEnvironmentRequest>;
export interface CreateComputeEnvironmentResponse {
  computeEnvironmentName?: string;
  computeEnvironmentArn?: string;
}
export const CreateComputeEnvironmentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    computeEnvironmentName: S.optional(S.String),
    computeEnvironmentArn: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "CreateComputeEnvironmentResponse",
}) as any as S.Schema<CreateComputeEnvironmentResponse>;
export interface CreateConsumableResourceRequest {
  consumableResourceName?: string;
  totalQuantity?: number;
  resourceType?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateConsumableResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    consumableResourceName: S.optional(S.String),
    totalQuantity: S.optional(S.Number),
    resourceType: S.optional(S.String),
    tags: S.optional(TagrisTagsMap),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/createconsumableresource" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateConsumableResourceRequest",
}) as any as S.Schema<CreateConsumableResourceRequest>;
export interface CreateConsumableResourceResponse {
  consumableResourceName: string;
  consumableResourceArn: string;
}
export const CreateConsumableResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    consumableResourceName: S.optional(S.String),
    consumableResourceArn: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "CreateConsumableResourceResponse",
}) as any as S.Schema<CreateConsumableResourceResponse>;
export type JQState = "ENABLED" | "DISABLED" | (string & {});
export const JQState = S.String;

export interface ComputeEnvironmentOrder {
  order?: number;
  computeEnvironment?: string;
}
export const ComputeEnvironmentOrder = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    order: S.optional(S.Number),
    computeEnvironment: S.optional(S.String),
  }),
).annotate({
  identifier: "ComputeEnvironmentOrder",
}) as any as S.Schema<ComputeEnvironmentOrder>;
export type ComputeEnvironmentOrders = ComputeEnvironmentOrder[];
export const ComputeEnvironmentOrders = /*@__PURE__*/ S.Array(
  ComputeEnvironmentOrder,
);
export interface ServiceEnvironmentOrder {
  order?: number;
  serviceEnvironment?: string;
}
export const ServiceEnvironmentOrder = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    order: S.optional(S.Number),
    serviceEnvironment: S.optional(S.String),
  }),
).annotate({
  identifier: "ServiceEnvironmentOrder",
}) as any as S.Schema<ServiceEnvironmentOrder>;
export type ServiceEnvironmentOrders = ServiceEnvironmentOrder[];
export const ServiceEnvironmentOrders = /*@__PURE__*/ S.Array(
  ServiceEnvironmentOrder,
);
export type JobQueueType =
  | "EKS"
  | "ECS"
  | "ECS_FARGATE"
  | "SAGEMAKER_TRAINING"
  | "ECS_MANAGED_INSTANCES"
  | (string & {});
export const JobQueueType = S.String;

export type JobStateTimeLimitActionsState = "RUNNABLE" | (string & {});
export const JobStateTimeLimitActionsState = S.String;

export type JobStateTimeLimitActionsAction =
  | "CANCEL"
  | "TERMINATE"
  | (string & {});
export const JobStateTimeLimitActionsAction = S.String;

export interface JobStateTimeLimitAction {
  reason?: string;
  state?: JobStateTimeLimitActionsState;
  maxTimeSeconds?: number;
  action?: JobStateTimeLimitActionsAction;
}
export const JobStateTimeLimitAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    reason: S.optional(S.String),
    state: S.optional(JobStateTimeLimitActionsState),
    maxTimeSeconds: S.optional(S.Number),
    action: S.optional(JobStateTimeLimitActionsAction),
  }),
).annotate({
  identifier: "JobStateTimeLimitAction",
}) as any as S.Schema<JobStateTimeLimitAction>;
export type JobStateTimeLimitActions = JobStateTimeLimitAction[];
export const JobStateTimeLimitActions = /*@__PURE__*/ S.Array(
  JobStateTimeLimitAction,
);
export interface CreateJobQueueRequest {
  jobQueueName?: string;
  state?: JQState;
  schedulingPolicyArn?: string;
  priority?: number;
  computeEnvironmentOrder?: ComputeEnvironmentOrder[];
  serviceEnvironmentOrder?: ServiceEnvironmentOrder[];
  jobQueueType?: JobQueueType;
  tags?: { [key: string]: string | undefined };
  jobStateTimeLimitActions?: JobStateTimeLimitAction[];
}
export const CreateJobQueueRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobQueueName: S.optional(S.String),
    state: S.optional(JQState),
    schedulingPolicyArn: S.optional(S.String),
    priority: S.optional(S.Number),
    computeEnvironmentOrder: S.optional(ComputeEnvironmentOrders),
    serviceEnvironmentOrder: S.optional(ServiceEnvironmentOrders),
    jobQueueType: S.optional(JobQueueType),
    tags: S.optional(TagrisTagsMap),
    jobStateTimeLimitActions: S.optional(JobStateTimeLimitActions),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/createjobqueue" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateJobQueueRequest",
}) as any as S.Schema<CreateJobQueueRequest>;
export interface CreateJobQueueResponse {
  jobQueueName: string;
  jobQueueArn: string;
}
export const CreateJobQueueResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobQueueName: S.optional(S.String),
    jobQueueArn: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "CreateJobQueueResponse",
}) as any as S.Schema<CreateJobQueueResponse>;
export interface QuotaShareCapacityLimit {
  maxCapacity?: number;
  capacityUnit?: string;
}
export const QuotaShareCapacityLimit = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxCapacity: S.optional(S.Number),
    capacityUnit: S.optional(S.String),
  }),
).annotate({
  identifier: "QuotaShareCapacityLimit",
}) as any as S.Schema<QuotaShareCapacityLimit>;
export type QuotaShareCapacityLimits = QuotaShareCapacityLimit[];
export const QuotaShareCapacityLimits = /*@__PURE__*/ S.Array(
  QuotaShareCapacityLimit,
);
export type QuotaShareResourceSharingStrategy =
  | "RESERVE"
  | "LEND"
  | "LEND_AND_BORROW"
  | (string & {});
export const QuotaShareResourceSharingStrategy = S.String;

export interface QuotaShareResourceSharingConfiguration {
  strategy?: QuotaShareResourceSharingStrategy;
  borrowLimit?: number;
}
export const QuotaShareResourceSharingConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      strategy: S.optional(QuotaShareResourceSharingStrategy),
      borrowLimit: S.optional(S.Number),
    }),
).annotate({
  identifier: "QuotaShareResourceSharingConfiguration",
}) as any as S.Schema<QuotaShareResourceSharingConfiguration>;
export type QuotaShareInSharePreemptionState =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export const QuotaShareInSharePreemptionState = S.String;

export interface QuotaSharePreemptionConfiguration {
  inSharePreemption?: QuotaShareInSharePreemptionState;
}
export const QuotaSharePreemptionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ inSharePreemption: S.optional(QuotaShareInSharePreemptionState) }),
).annotate({
  identifier: "QuotaSharePreemptionConfiguration",
}) as any as S.Schema<QuotaSharePreemptionConfiguration>;
export type QuotaShareState = "ENABLED" | "DISABLED" | (string & {});
export const QuotaShareState = S.String;

export interface CreateQuotaShareRequest {
  quotaShareName?: string;
  jobQueue?: string;
  capacityLimits?: QuotaShareCapacityLimit[];
  resourceSharingConfiguration?: QuotaShareResourceSharingConfiguration;
  preemptionConfiguration?: QuotaSharePreemptionConfiguration;
  state?: QuotaShareState;
  tags?: { [key: string]: string | undefined };
}
export const CreateQuotaShareRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    quotaShareName: S.optional(S.String),
    jobQueue: S.optional(S.String),
    capacityLimits: S.optional(QuotaShareCapacityLimits),
    resourceSharingConfiguration: S.optional(
      QuotaShareResourceSharingConfiguration,
    ),
    preemptionConfiguration: S.optional(QuotaSharePreemptionConfiguration),
    state: S.optional(QuotaShareState),
    tags: S.optional(TagrisTagsMap),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/createquotashare" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateQuotaShareRequest",
}) as any as S.Schema<CreateQuotaShareRequest>;
export interface CreateQuotaShareResponse {
  quotaShareName?: string;
  quotaShareArn?: string;
}
export const CreateQuotaShareResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    quotaShareName: S.optional(S.String),
    quotaShareArn: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "CreateQuotaShareResponse",
}) as any as S.Schema<CreateQuotaShareResponse>;
export type QuotaShareIdleResourceAssignmentStrategy = "FIFO" | (string & {});
export const QuotaShareIdleResourceAssignmentStrategy = S.String;

export interface QuotaSharePolicy {
  idleResourceAssignmentStrategy?: QuotaShareIdleResourceAssignmentStrategy;
}
export const QuotaSharePolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    idleResourceAssignmentStrategy: S.optional(
      QuotaShareIdleResourceAssignmentStrategy,
    ),
  }),
).annotate({
  identifier: "QuotaSharePolicy",
}) as any as S.Schema<QuotaSharePolicy>;
export interface ShareAttributes {
  shareIdentifier?: string;
  weightFactor?: number;
}
export const ShareAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    shareIdentifier: S.optional(S.String),
    weightFactor: S.optional(S.Number),
  }),
).annotate({
  identifier: "ShareAttributes",
}) as any as S.Schema<ShareAttributes>;
export type ShareAttributesList = ShareAttributes[];
export const ShareAttributesList = /*@__PURE__*/ S.Array(ShareAttributes);
export interface FairsharePolicy {
  shareDecaySeconds?: number;
  computeReservation?: number;
  shareDistribution?: ShareAttributes[];
}
export const FairsharePolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    shareDecaySeconds: S.optional(S.Number),
    computeReservation: S.optional(S.Number),
    shareDistribution: S.optional(ShareAttributesList),
  }),
).annotate({
  identifier: "FairsharePolicy",
}) as any as S.Schema<FairsharePolicy>;
export interface CreateSchedulingPolicyRequest {
  name?: string;
  quotaSharePolicy?: QuotaSharePolicy;
  fairsharePolicy?: FairsharePolicy;
  tags?: { [key: string]: string | undefined };
}
export const CreateSchedulingPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    quotaSharePolicy: S.optional(QuotaSharePolicy),
    fairsharePolicy: S.optional(FairsharePolicy),
    tags: S.optional(TagrisTagsMap),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/createschedulingpolicy" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateSchedulingPolicyRequest",
}) as any as S.Schema<CreateSchedulingPolicyRequest>;
export interface CreateSchedulingPolicyResponse {
  name: string;
  arn: string;
}
export const CreateSchedulingPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(S.String), arn: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "CreateSchedulingPolicyResponse",
}) as any as S.Schema<CreateSchedulingPolicyResponse>;
export type ServiceEnvironmentType = "SAGEMAKER_TRAINING" | (string & {});
export const ServiceEnvironmentType = S.String;

export type ServiceEnvironmentState = "ENABLED" | "DISABLED" | (string & {});
export const ServiceEnvironmentState = S.String;

export interface CapacityLimit {
  maxCapacity?: number;
  capacityUnit?: string;
}
export const CapacityLimit = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxCapacity: S.optional(S.Number),
    capacityUnit: S.optional(S.String),
  }),
).annotate({ identifier: "CapacityLimit" }) as any as S.Schema<CapacityLimit>;
export type CapacityLimits = CapacityLimit[];
export const CapacityLimits = /*@__PURE__*/ S.Array(CapacityLimit);
export interface CreateServiceEnvironmentRequest {
  serviceEnvironmentName?: string;
  serviceEnvironmentType?: ServiceEnvironmentType;
  state?: ServiceEnvironmentState;
  capacityLimits?: CapacityLimit[];
  tags?: { [key: string]: string | undefined };
}
export const CreateServiceEnvironmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceEnvironmentName: S.optional(S.String),
    serviceEnvironmentType: S.optional(ServiceEnvironmentType),
    state: S.optional(ServiceEnvironmentState),
    capacityLimits: S.optional(CapacityLimits),
    tags: S.optional(TagrisTagsMap),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/createserviceenvironment" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateServiceEnvironmentRequest",
}) as any as S.Schema<CreateServiceEnvironmentRequest>;
export interface CreateServiceEnvironmentResponse {
  serviceEnvironmentName: string;
  serviceEnvironmentArn: string;
}
export const CreateServiceEnvironmentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceEnvironmentName: S.optional(S.String),
    serviceEnvironmentArn: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "CreateServiceEnvironmentResponse",
}) as any as S.Schema<CreateServiceEnvironmentResponse>;
export interface DeleteComputeEnvironmentRequest {
  computeEnvironment?: string;
}
export const DeleteComputeEnvironmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ computeEnvironment: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/deletecomputeenvironment" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteComputeEnvironmentRequest",
}) as any as S.Schema<DeleteComputeEnvironmentRequest>;
export interface DeleteComputeEnvironmentResponse {}
export const DeleteComputeEnvironmentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteComputeEnvironmentResponse",
}) as any as S.Schema<DeleteComputeEnvironmentResponse>;
export interface DeleteConsumableResourceRequest {
  consumableResource?: string;
}
export const DeleteConsumableResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ consumableResource: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/deleteconsumableresource" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteConsumableResourceRequest",
}) as any as S.Schema<DeleteConsumableResourceRequest>;
export interface DeleteConsumableResourceResponse {}
export const DeleteConsumableResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteConsumableResourceResponse",
}) as any as S.Schema<DeleteConsumableResourceResponse>;
export interface DeleteJobQueueRequest {
  jobQueue?: string;
}
export const DeleteJobQueueRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobQueue: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/deletejobqueue" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteJobQueueRequest",
}) as any as S.Schema<DeleteJobQueueRequest>;
export interface DeleteJobQueueResponse {}
export const DeleteJobQueueResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteJobQueueResponse",
}) as any as S.Schema<DeleteJobQueueResponse>;
export interface DeleteQuotaShareRequest {
  quotaShareArn?: string;
}
export const DeleteQuotaShareRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ quotaShareArn: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/deletequotashare" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteQuotaShareRequest",
}) as any as S.Schema<DeleteQuotaShareRequest>;
export interface DeleteQuotaShareResponse {}
export const DeleteQuotaShareResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteQuotaShareResponse",
}) as any as S.Schema<DeleteQuotaShareResponse>;
export interface DeleteSchedulingPolicyRequest {
  arn?: string;
}
export const DeleteSchedulingPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/deleteschedulingpolicy" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSchedulingPolicyRequest",
}) as any as S.Schema<DeleteSchedulingPolicyRequest>;
export interface DeleteSchedulingPolicyResponse {}
export const DeleteSchedulingPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteSchedulingPolicyResponse",
}) as any as S.Schema<DeleteSchedulingPolicyResponse>;
export interface DeleteServiceEnvironmentRequest {
  serviceEnvironment?: string;
}
export const DeleteServiceEnvironmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ serviceEnvironment: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/deleteserviceenvironment" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteServiceEnvironmentRequest",
}) as any as S.Schema<DeleteServiceEnvironmentRequest>;
export interface DeleteServiceEnvironmentResponse {}
export const DeleteServiceEnvironmentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteServiceEnvironmentResponse",
}) as any as S.Schema<DeleteServiceEnvironmentResponse>;
export interface DeregisterJobDefinitionRequest {
  jobDefinition?: string;
}
export const DeregisterJobDefinitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobDefinition: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/deregisterjobdefinition" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeregisterJobDefinitionRequest",
}) as any as S.Schema<DeregisterJobDefinitionRequest>;
export interface DeregisterJobDefinitionResponse {}
export const DeregisterJobDefinitionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeregisterJobDefinitionResponse",
}) as any as S.Schema<DeregisterJobDefinitionResponse>;
export interface DescribeComputeEnvironmentsRequest {
  computeEnvironments?: string[];
  maxResults?: number;
  nextToken?: string;
}
export const DescribeComputeEnvironmentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    computeEnvironments: S.optional(StringList),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/describecomputeenvironments" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeComputeEnvironmentsRequest",
}) as any as S.Schema<DescribeComputeEnvironmentsRequest>;
export type CEStatus =
  | "CREATING"
  | "UPDATING"
  | "DELETING"
  | "DELETED"
  | "VALID"
  | "INVALID"
  | (string & {});
export const CEStatus = S.String;

export type JobExecutionTimeoutMinutes = number;
export interface UpdatePolicy {
  terminateJobsOnUpdate?: boolean;
  jobExecutionTimeoutMinutes?: number;
}
export const UpdatePolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    terminateJobsOnUpdate: S.optional(S.Boolean),
    jobExecutionTimeoutMinutes: S.optional(S.Number),
  }),
).annotate({ identifier: "UpdatePolicy" }) as any as S.Schema<UpdatePolicy>;
export type OrchestrationType = "ECS" | "EKS" | (string & {});
export const OrchestrationType = S.String;

export interface ComputeEnvironmentDetail {
  computeEnvironmentName?: string;
  computeEnvironmentArn?: string;
  unmanagedvCpus?: number;
  ecsClusterArn?: string;
  tags?: { [key: string]: string | undefined };
  type?: CEType;
  state?: CEState;
  status?: CEStatus;
  statusReason?: string;
  computeResources?: ComputeResource;
  serviceRole?: string;
  updatePolicy?: UpdatePolicy;
  eksConfiguration?: EksConfiguration;
  containerOrchestrationType?: OrchestrationType;
  uuid?: string;
  context?: string;
  ecsSettings?: EcsSettings;
}
export const ComputeEnvironmentDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    computeEnvironmentName: S.optional(S.String),
    computeEnvironmentArn: S.optional(S.String),
    unmanagedvCpus: S.optional(S.Number),
    ecsClusterArn: S.optional(S.String),
    tags: S.optional(TagrisTagsMap),
    type: S.optional(CEType),
    state: S.optional(CEState),
    status: S.optional(CEStatus),
    statusReason: S.optional(S.String),
    computeResources: S.optional(ComputeResource),
    serviceRole: S.optional(S.String),
    updatePolicy: S.optional(UpdatePolicy),
    eksConfiguration: S.optional(EksConfiguration),
    containerOrchestrationType: S.optional(OrchestrationType),
    uuid: S.optional(S.String),
    context: S.optional(S.String),
    ecsSettings: S.optional(EcsSettings),
  }),
).annotate({
  identifier: "ComputeEnvironmentDetail",
}) as any as S.Schema<ComputeEnvironmentDetail>;
export type ComputeEnvironmentDetailList = ComputeEnvironmentDetail[];
export const ComputeEnvironmentDetailList = /*@__PURE__*/ S.Array(
  ComputeEnvironmentDetail,
);
export interface DescribeComputeEnvironmentsResponse {
  computeEnvironments?: (ComputeEnvironmentDetail & {
    computeEnvironmentName: string;
    computeEnvironmentArn: string;
    computeResources: ComputeResource & {
      type: CRType;
      maxvCpus: number;
      ec2Configuration: (Ec2Configuration & { imageType: ImageType })[];
      managedInstancesProvider: ManagedInstancesProvider & {
        infrastructureRoleArn: string;
        instanceLaunchTemplate: InstanceLaunchTemplate & {
          ec2InstanceProfileArn: string;
          networkConfiguration: ManagedInstancesNetworkConfiguration & {
            subnets: StringList;
            securityGroups: StringList;
          };
        };
      };
    };
    eksConfiguration: EksConfiguration & {
      eksClusterArn: string;
      kubernetesNamespace: string;
    };
  })[];
  nextToken?: string;
}
export const DescribeComputeEnvironmentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    computeEnvironments: S.optional(ComputeEnvironmentDetailList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeComputeEnvironmentsResponse",
}) as any as S.Schema<DescribeComputeEnvironmentsResponse>;
export interface DescribeConsumableResourceRequest {
  consumableResource?: string;
}
export const DescribeConsumableResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ consumableResource: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/describeconsumableresource" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeConsumableResourceRequest",
}) as any as S.Schema<DescribeConsumableResourceRequest>;
export interface DescribeConsumableResourceResponse {
  consumableResourceName: string;
  consumableResourceArn: string;
  totalQuantity?: number;
  inUseQuantity?: number;
  availableQuantity?: number;
  resourceType?: string;
  createdAt?: number;
  tags?: { [key: string]: string | undefined };
}
export const DescribeConsumableResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    consumableResourceName: S.optional(S.String),
    consumableResourceArn: S.optional(S.String),
    totalQuantity: S.optional(S.Number),
    inUseQuantity: S.optional(S.Number),
    availableQuantity: S.optional(S.Number),
    resourceType: S.optional(S.String),
    createdAt: S.optional(S.Number),
    tags: S.optional(TagrisTagsMap),
  }).pipe(ns),
).annotate({
  identifier: "DescribeConsumableResourceResponse",
}) as any as S.Schema<DescribeConsumableResourceResponse>;
export interface DescribeJobDefinitionsRequest {
  jobDefinitions?: string[];
  maxResults?: number;
  jobDefinitionName?: string;
  status?: string;
  nextToken?: string;
}
export const DescribeJobDefinitionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobDefinitions: S.optional(StringList),
    maxResults: S.optional(S.Number),
    jobDefinitionName: S.optional(S.String),
    status: S.optional(S.String),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/describejobdefinitions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeJobDefinitionsRequest",
}) as any as S.Schema<DescribeJobDefinitionsRequest>;
export type ParametersMap = { [key: string]: string | undefined };
export const ParametersMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type RetryAction = "RETRY" | "EXIT" | (string & {});
export const RetryAction = S.String;

export interface EvaluateOnExit {
  onStatusReason?: string;
  onReason?: string;
  onExitCode?: string;
  action?: RetryAction;
}
export const EvaluateOnExit = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    onStatusReason: S.optional(S.String),
    onReason: S.optional(S.String),
    onExitCode: S.optional(S.String),
    action: S.optional(RetryAction),
  }),
).annotate({ identifier: "EvaluateOnExit" }) as any as S.Schema<EvaluateOnExit>;
export type EvaluateOnExitList = EvaluateOnExit[];
export const EvaluateOnExitList = /*@__PURE__*/ S.Array(EvaluateOnExit);
export interface RetryStrategy {
  attempts?: number;
  evaluateOnExit?: EvaluateOnExit[];
}
export const RetryStrategy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    attempts: S.optional(S.Number),
    evaluateOnExit: S.optional(EvaluateOnExitList),
  }),
).annotate({ identifier: "RetryStrategy" }) as any as S.Schema<RetryStrategy>;
export interface Host {
  sourcePath?: string;
}
export const Host = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sourcePath: S.optional(S.String) }),
).annotate({ identifier: "Host" }) as any as S.Schema<Host>;
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
  fileSystemId?: string;
  rootDirectory?: string;
  transitEncryption?: EFSTransitEncryption;
  transitEncryptionPort?: number;
  authorizationConfig?: EFSAuthorizationConfig;
}
export const EFSVolumeConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fileSystemId: S.optional(S.String),
    rootDirectory: S.optional(S.String),
    transitEncryption: S.optional(EFSTransitEncryption),
    transitEncryptionPort: S.optional(S.Number),
    authorizationConfig: S.optional(EFSAuthorizationConfig),
  }),
).annotate({
  identifier: "EFSVolumeConfiguration",
}) as any as S.Schema<EFSVolumeConfiguration>;
export interface S3FilesVolumeConfiguration {
  fileSystemArn?: string;
  rootDirectory?: string;
  transitEncryptionPort?: number;
  accessPointArn?: string;
}
export const S3FilesVolumeConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fileSystemArn: S.optional(S.String),
    rootDirectory: S.optional(S.String),
    transitEncryptionPort: S.optional(S.Number),
    accessPointArn: S.optional(S.String),
  }),
).annotate({
  identifier: "S3FilesVolumeConfiguration",
}) as any as S.Schema<S3FilesVolumeConfiguration>;
export interface Volume {
  host?: Host;
  name?: string;
  efsVolumeConfiguration?: EFSVolumeConfiguration;
  s3filesVolumeConfiguration?: S3FilesVolumeConfiguration;
}
export const Volume = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    host: S.optional(Host),
    name: S.optional(S.String),
    efsVolumeConfiguration: S.optional(EFSVolumeConfiguration),
    s3filesVolumeConfiguration: S.optional(S3FilesVolumeConfiguration),
  }),
).annotate({ identifier: "Volume" }) as any as S.Schema<Volume>;
export type Volumes = Volume[];
export const Volumes = /*@__PURE__*/ S.Array(Volume);
export interface KeyValuePair {
  name?: string;
  value?: string;
}
export const KeyValuePair = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(S.String), value: S.optional(S.String) }),
).annotate({ identifier: "KeyValuePair" }) as any as S.Schema<KeyValuePair>;
export type EnvironmentVariables = KeyValuePair[];
export const EnvironmentVariables = /*@__PURE__*/ S.Array(KeyValuePair);
export interface MountPoint {
  containerPath?: string;
  readOnly?: boolean;
  sourceVolume?: string;
}
export const MountPoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    containerPath: S.optional(S.String),
    readOnly: S.optional(S.Boolean),
    sourceVolume: S.optional(S.String),
  }),
).annotate({ identifier: "MountPoint" }) as any as S.Schema<MountPoint>;
export type MountPoints = MountPoint[];
export const MountPoints = /*@__PURE__*/ S.Array(MountPoint);
export interface Ulimit {
  hardLimit?: number;
  name?: string;
  softLimit?: number;
}
export const Ulimit = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    hardLimit: S.optional(S.Number),
    name: S.optional(S.String),
    softLimit: S.optional(S.Number),
  }),
).annotate({ identifier: "Ulimit" }) as any as S.Schema<Ulimit>;
export type Ulimits = Ulimit[];
export const Ulimits = /*@__PURE__*/ S.Array(Ulimit);
export type ResourceType = "GPU" | "VCPU" | "MEMORY" | (string & {});
export const ResourceType = S.String;

export interface ResourceRequirement {
  value?: string;
  type?: ResourceType;
}
export const ResourceRequirement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ value: S.optional(S.String), type: S.optional(ResourceType) }),
).annotate({
  identifier: "ResourceRequirement",
}) as any as S.Schema<ResourceRequirement>;
export type ResourceRequirements = ResourceRequirement[];
export const ResourceRequirements = /*@__PURE__*/ S.Array(ResourceRequirement);
export type DeviceCgroupPermission = "READ" | "WRITE" | "MKNOD" | (string & {});
export const DeviceCgroupPermission = S.String;

export type DeviceCgroupPermissions = DeviceCgroupPermission[];
export const DeviceCgroupPermissions = /*@__PURE__*/ S.Array(
  DeviceCgroupPermission,
);
export interface Device {
  hostPath?: string;
  containerPath?: string;
  permissions?: DeviceCgroupPermission[];
}
export const Device = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    hostPath: S.optional(S.String),
    containerPath: S.optional(S.String),
    permissions: S.optional(DeviceCgroupPermissions),
  }),
).annotate({ identifier: "Device" }) as any as S.Schema<Device>;
export type DevicesList = Device[];
export const DevicesList = /*@__PURE__*/ S.Array(Device);
export interface Tmpfs {
  containerPath?: string;
  size?: number;
  mountOptions?: string[];
}
export const Tmpfs = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    containerPath: S.optional(S.String),
    size: S.optional(S.Number),
    mountOptions: S.optional(StringList),
  }),
).annotate({ identifier: "Tmpfs" }) as any as S.Schema<Tmpfs>;
export type TmpfsList = Tmpfs[];
export const TmpfsList = /*@__PURE__*/ S.Array(Tmpfs);
export interface LinuxParameters {
  devices?: Device[];
  initProcessEnabled?: boolean;
  sharedMemorySize?: number;
  tmpfs?: Tmpfs[];
  maxSwap?: number;
  swappiness?: number;
}
export const LinuxParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
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
export interface Secret {
  name?: string;
  valueFrom?: string;
}
export const Secret = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(S.String), valueFrom: S.optional(S.String) }),
).annotate({ identifier: "Secret" }) as any as S.Schema<Secret>;
export type SecretList = Secret[];
export const SecretList = /*@__PURE__*/ S.Array(Secret);
export interface LogConfiguration {
  logDriver?: LogDriver;
  options?: { [key: string]: string | undefined };
  secretOptions?: Secret[];
}
export const LogConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    logDriver: S.optional(LogDriver),
    options: S.optional(LogConfigurationOptionsMap),
    secretOptions: S.optional(SecretList),
  }),
).annotate({
  identifier: "LogConfiguration",
}) as any as S.Schema<LogConfiguration>;
export type AssignPublicIp = "ENABLED" | "DISABLED" | (string & {});
export const AssignPublicIp = S.String;

export interface NetworkConfiguration {
  assignPublicIp?: AssignPublicIp;
}
export const NetworkConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ assignPublicIp: S.optional(AssignPublicIp) }),
).annotate({
  identifier: "NetworkConfiguration",
}) as any as S.Schema<NetworkConfiguration>;
export interface FargatePlatformConfiguration {
  platformVersion?: string;
}
export const FargatePlatformConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ platformVersion: S.optional(S.String) }),
).annotate({
  identifier: "FargatePlatformConfiguration",
}) as any as S.Schema<FargatePlatformConfiguration>;
export interface EphemeralStorage {
  sizeInGiB?: number;
}
export const EphemeralStorage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sizeInGiB: S.optional(S.Number) }),
).annotate({
  identifier: "EphemeralStorage",
}) as any as S.Schema<EphemeralStorage>;
export interface RuntimePlatform {
  operatingSystemFamily?: string;
  cpuArchitecture?: string;
}
export const RuntimePlatform = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    operatingSystemFamily: S.optional(S.String),
    cpuArchitecture: S.optional(S.String),
  }),
).annotate({
  identifier: "RuntimePlatform",
}) as any as S.Schema<RuntimePlatform>;
export interface RepositoryCredentials {
  credentialsParameter?: string;
}
export const RepositoryCredentials = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ credentialsParameter: S.optional(S.String) }),
).annotate({
  identifier: "RepositoryCredentials",
}) as any as S.Schema<RepositoryCredentials>;
export interface ContainerProperties {
  image?: string;
  vcpus?: number;
  memory?: number;
  command?: string[];
  jobRoleArn?: string;
  executionRoleArn?: string;
  volumes?: Volume[];
  environment?: KeyValuePair[];
  mountPoints?: MountPoint[];
  readonlyRootFilesystem?: boolean;
  privileged?: boolean;
  ulimits?: Ulimit[];
  user?: string;
  instanceType?: string;
  resourceRequirements?: ResourceRequirement[];
  linuxParameters?: LinuxParameters;
  logConfiguration?: LogConfiguration;
  secrets?: Secret[];
  networkConfiguration?: NetworkConfiguration;
  fargatePlatformConfiguration?: FargatePlatformConfiguration;
  enableExecuteCommand?: boolean;
  ephemeralStorage?: EphemeralStorage;
  runtimePlatform?: RuntimePlatform;
  repositoryCredentials?: RepositoryCredentials;
}
export const ContainerProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    image: S.optional(S.String),
    vcpus: S.optional(S.Number),
    memory: S.optional(S.Number),
    command: S.optional(StringList),
    jobRoleArn: S.optional(S.String),
    executionRoleArn: S.optional(S.String),
    volumes: S.optional(Volumes),
    environment: S.optional(EnvironmentVariables),
    mountPoints: S.optional(MountPoints),
    readonlyRootFilesystem: S.optional(S.Boolean),
    privileged: S.optional(S.Boolean),
    ulimits: S.optional(Ulimits),
    user: S.optional(S.String),
    instanceType: S.optional(S.String),
    resourceRequirements: S.optional(ResourceRequirements),
    linuxParameters: S.optional(LinuxParameters),
    logConfiguration: S.optional(LogConfiguration),
    secrets: S.optional(SecretList),
    networkConfiguration: S.optional(NetworkConfiguration),
    fargatePlatformConfiguration: S.optional(FargatePlatformConfiguration),
    enableExecuteCommand: S.optional(S.Boolean),
    ephemeralStorage: S.optional(EphemeralStorage),
    runtimePlatform: S.optional(RuntimePlatform),
    repositoryCredentials: S.optional(RepositoryCredentials),
  }),
).annotate({
  identifier: "ContainerProperties",
}) as any as S.Schema<ContainerProperties>;
export interface JobTimeout {
  attemptDurationSeconds?: number;
}
export const JobTimeout = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ attemptDurationSeconds: S.optional(S.Number) }),
).annotate({ identifier: "JobTimeout" }) as any as S.Schema<JobTimeout>;
export interface TaskContainerDependency {
  containerName?: string;
  condition?: string;
}
export const TaskContainerDependency = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    containerName: S.optional(S.String),
    condition: S.optional(S.String),
  }),
).annotate({
  identifier: "TaskContainerDependency",
}) as any as S.Schema<TaskContainerDependency>;
export type TaskContainerDependencyList = TaskContainerDependency[];
export const TaskContainerDependencyList = /*@__PURE__*/ S.Array(
  TaskContainerDependency,
);
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
  type?: FirelensConfigurationType;
  options?: { [key: string]: string | undefined };
}
export const FirelensConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(FirelensConfigurationType),
    options: S.optional(FirelensConfigurationOptionsMap),
  }),
).annotate({
  identifier: "FirelensConfiguration",
}) as any as S.Schema<FirelensConfiguration>;
export interface TaskContainerProperties {
  command?: string[];
  dependsOn?: TaskContainerDependency[];
  environment?: KeyValuePair[];
  essential?: boolean;
  firelensConfiguration?: FirelensConfiguration;
  image?: string;
  linuxParameters?: LinuxParameters;
  logConfiguration?: LogConfiguration;
  mountPoints?: MountPoint[];
  name?: string;
  privileged?: boolean;
  readonlyRootFilesystem?: boolean;
  repositoryCredentials?: RepositoryCredentials;
  resourceRequirements?: ResourceRequirement[];
  secrets?: Secret[];
  ulimits?: Ulimit[];
  user?: string;
  startTimeout?: number;
  stopTimeout?: number;
}
export const TaskContainerProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    command: S.optional(StringList),
    dependsOn: S.optional(TaskContainerDependencyList),
    environment: S.optional(EnvironmentVariables),
    essential: S.optional(S.Boolean),
    firelensConfiguration: S.optional(FirelensConfiguration),
    image: S.optional(S.String),
    linuxParameters: S.optional(LinuxParameters),
    logConfiguration: S.optional(LogConfiguration),
    mountPoints: S.optional(MountPoints),
    name: S.optional(S.String),
    privileged: S.optional(S.Boolean),
    readonlyRootFilesystem: S.optional(S.Boolean),
    repositoryCredentials: S.optional(RepositoryCredentials),
    resourceRequirements: S.optional(ResourceRequirements),
    secrets: S.optional(SecretList),
    ulimits: S.optional(Ulimits),
    user: S.optional(S.String),
    startTimeout: S.optional(S.Number),
    stopTimeout: S.optional(S.Number),
  }),
).annotate({
  identifier: "TaskContainerProperties",
}) as any as S.Schema<TaskContainerProperties>;
export type ListTaskContainerProperties = TaskContainerProperties[];
export const ListTaskContainerProperties = /*@__PURE__*/ S.Array(
  TaskContainerProperties,
);
export interface EcsTaskProperties {
  containers?: TaskContainerProperties[];
  ephemeralStorage?: EphemeralStorage;
  executionRoleArn?: string;
  platformVersion?: string;
  ipcMode?: string;
  taskRoleArn?: string;
  pidMode?: string;
  networkConfiguration?: NetworkConfiguration;
  runtimePlatform?: RuntimePlatform;
  volumes?: Volume[];
  enableExecuteCommand?: boolean;
  networkMode?: string;
}
export const EcsTaskProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    containers: S.optional(ListTaskContainerProperties),
    ephemeralStorage: S.optional(EphemeralStorage),
    executionRoleArn: S.optional(S.String),
    platformVersion: S.optional(S.String),
    ipcMode: S.optional(S.String),
    taskRoleArn: S.optional(S.String),
    pidMode: S.optional(S.String),
    networkConfiguration: S.optional(NetworkConfiguration),
    runtimePlatform: S.optional(RuntimePlatform),
    volumes: S.optional(Volumes),
    enableExecuteCommand: S.optional(S.Boolean),
    networkMode: S.optional(S.String),
  }),
).annotate({
  identifier: "EcsTaskProperties",
}) as any as S.Schema<EcsTaskProperties>;
export type ListEcsTaskProperties = EcsTaskProperties[];
export const ListEcsTaskProperties = /*@__PURE__*/ S.Array(EcsTaskProperties);
export interface EcsProperties {
  taskProperties?: EcsTaskProperties[];
}
export const EcsProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ taskProperties: S.optional(ListEcsTaskProperties) }),
).annotate({ identifier: "EcsProperties" }) as any as S.Schema<EcsProperties>;
export interface ImagePullSecret {
  name?: string;
}
export const ImagePullSecret = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(S.String) }),
).annotate({
  identifier: "ImagePullSecret",
}) as any as S.Schema<ImagePullSecret>;
export type ImagePullSecrets = ImagePullSecret[];
export const ImagePullSecrets = /*@__PURE__*/ S.Array(ImagePullSecret);
export interface EksContainerEnvironmentVariable {
  name?: string;
  value?: string;
}
export const EksContainerEnvironmentVariable = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(S.String), value: S.optional(S.String) }),
).annotate({
  identifier: "EksContainerEnvironmentVariable",
}) as any as S.Schema<EksContainerEnvironmentVariable>;
export type EksContainerEnvironmentVariables =
  EksContainerEnvironmentVariable[];
export const EksContainerEnvironmentVariables = /*@__PURE__*/ S.Array(
  EksContainerEnvironmentVariable,
);
export type Quantity = string;
export type EksLimits = { [key: string]: string | undefined };
export const EksLimits = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type EksRequests = { [key: string]: string | undefined };
export const EksRequests = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface EksContainerResourceRequirements {
  limits?: { [key: string]: string | undefined };
  requests?: { [key: string]: string | undefined };
}
export const EksContainerResourceRequirements = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    limits: S.optional(EksLimits),
    requests: S.optional(EksRequests),
  }),
).annotate({
  identifier: "EksContainerResourceRequirements",
}) as any as S.Schema<EksContainerResourceRequirements>;
export interface EksContainerVolumeMount {
  name?: string;
  mountPath?: string;
  subPath?: string;
  readOnly?: boolean;
}
export const EksContainerVolumeMount = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    mountPath: S.optional(S.String),
    subPath: S.optional(S.String),
    readOnly: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "EksContainerVolumeMount",
}) as any as S.Schema<EksContainerVolumeMount>;
export type EksContainerVolumeMounts = EksContainerVolumeMount[];
export const EksContainerVolumeMounts = /*@__PURE__*/ S.Array(
  EksContainerVolumeMount,
);
export interface EksContainerSecurityContext {
  runAsUser?: number;
  runAsGroup?: number;
  privileged?: boolean;
  allowPrivilegeEscalation?: boolean;
  readOnlyRootFilesystem?: boolean;
  runAsNonRoot?: boolean;
}
export const EksContainerSecurityContext = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    runAsUser: S.optional(S.Number),
    runAsGroup: S.optional(S.Number),
    privileged: S.optional(S.Boolean),
    allowPrivilegeEscalation: S.optional(S.Boolean),
    readOnlyRootFilesystem: S.optional(S.Boolean),
    runAsNonRoot: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "EksContainerSecurityContext",
}) as any as S.Schema<EksContainerSecurityContext>;
export interface EksContainer {
  name?: string;
  image?: string;
  imagePullPolicy?: string;
  command?: string[];
  args?: string[];
  env?: EksContainerEnvironmentVariable[];
  resources?: EksContainerResourceRequirements;
  volumeMounts?: EksContainerVolumeMount[];
  securityContext?: EksContainerSecurityContext;
}
export const EksContainer = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    image: S.optional(S.String),
    imagePullPolicy: S.optional(S.String),
    command: S.optional(StringList),
    args: S.optional(StringList),
    env: S.optional(EksContainerEnvironmentVariables),
    resources: S.optional(EksContainerResourceRequirements),
    volumeMounts: S.optional(EksContainerVolumeMounts),
    securityContext: S.optional(EksContainerSecurityContext),
  }),
).annotate({ identifier: "EksContainer" }) as any as S.Schema<EksContainer>;
export type EksContainers = EksContainer[];
export const EksContainers = /*@__PURE__*/ S.Array(EksContainer);
export interface EksHostPath {
  path?: string;
}
export const EksHostPath = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ path: S.optional(S.String) }),
).annotate({ identifier: "EksHostPath" }) as any as S.Schema<EksHostPath>;
export interface EksEmptyDir {
  medium?: string;
  sizeLimit?: string;
}
export const EksEmptyDir = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ medium: S.optional(S.String), sizeLimit: S.optional(S.String) }),
).annotate({ identifier: "EksEmptyDir" }) as any as S.Schema<EksEmptyDir>;
export interface EksSecret {
  secretName?: string;
  optional?: boolean;
}
export const EksSecret = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    secretName: S.optional(S.String),
    optional: S.optional(S.Boolean),
  }),
).annotate({ identifier: "EksSecret" }) as any as S.Schema<EksSecret>;
export interface EksPersistentVolumeClaim {
  claimName?: string;
  readOnly?: boolean;
}
export const EksPersistentVolumeClaim = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    claimName: S.optional(S.String),
    readOnly: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "EksPersistentVolumeClaim",
}) as any as S.Schema<EksPersistentVolumeClaim>;
export interface EksVolume {
  name?: string;
  hostPath?: EksHostPath;
  emptyDir?: EksEmptyDir;
  secret?: EksSecret;
  persistentVolumeClaim?: EksPersistentVolumeClaim;
}
export const EksVolume = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    hostPath: S.optional(EksHostPath),
    emptyDir: S.optional(EksEmptyDir),
    secret: S.optional(EksSecret),
    persistentVolumeClaim: S.optional(EksPersistentVolumeClaim),
  }),
).annotate({ identifier: "EksVolume" }) as any as S.Schema<EksVolume>;
export type EksVolumes = EksVolume[];
export const EksVolumes = /*@__PURE__*/ S.Array(EksVolume);
export type EksLabelsMap = { [key: string]: string | undefined };
export const EksLabelsMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type EksAnnotationsMap = { [key: string]: string | undefined };
export const EksAnnotationsMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface EksMetadata {
  labels?: { [key: string]: string | undefined };
  annotations?: { [key: string]: string | undefined };
  namespace?: string;
}
export const EksMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    labels: S.optional(EksLabelsMap),
    annotations: S.optional(EksAnnotationsMap),
    namespace: S.optional(S.String),
  }),
).annotate({ identifier: "EksMetadata" }) as any as S.Schema<EksMetadata>;
export interface EksPodProperties {
  serviceAccountName?: string;
  hostNetwork?: boolean;
  dnsPolicy?: string;
  imagePullSecrets?: ImagePullSecret[];
  containers?: EksContainer[];
  initContainers?: EksContainer[];
  volumes?: EksVolume[];
  metadata?: EksMetadata;
  shareProcessNamespace?: boolean;
}
export const EksPodProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceAccountName: S.optional(S.String),
    hostNetwork: S.optional(S.Boolean),
    dnsPolicy: S.optional(S.String),
    imagePullSecrets: S.optional(ImagePullSecrets),
    containers: S.optional(EksContainers),
    initContainers: S.optional(EksContainers),
    volumes: S.optional(EksVolumes),
    metadata: S.optional(EksMetadata),
    shareProcessNamespace: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "EksPodProperties",
}) as any as S.Schema<EksPodProperties>;
export interface EksProperties {
  podProperties?: EksPodProperties;
}
export const EksProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ podProperties: S.optional(EksPodProperties) }),
).annotate({ identifier: "EksProperties" }) as any as S.Schema<EksProperties>;
export interface ConsumableResourceRequirement {
  consumableResource?: string;
  quantity?: number;
}
export const ConsumableResourceRequirement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    consumableResource: S.optional(S.String),
    quantity: S.optional(S.Number),
  }),
).annotate({
  identifier: "ConsumableResourceRequirement",
}) as any as S.Schema<ConsumableResourceRequirement>;
export type ConsumableResourceList = ConsumableResourceRequirement[];
export const ConsumableResourceList = /*@__PURE__*/ S.Array(
  ConsumableResourceRequirement,
);
export interface ConsumableResourceProperties {
  consumableResourceList?: ConsumableResourceRequirement[];
}
export const ConsumableResourceProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ consumableResourceList: S.optional(ConsumableResourceList) }),
).annotate({
  identifier: "ConsumableResourceProperties",
}) as any as S.Schema<ConsumableResourceProperties>;
export interface NodeRangeProperty {
  targetNodes?: string;
  container?: ContainerProperties;
  instanceTypes?: string[];
  ecsProperties?: EcsProperties;
  eksProperties?: EksProperties;
  consumableResourceProperties?: ConsumableResourceProperties;
}
export const NodeRangeProperty = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    targetNodes: S.optional(S.String),
    container: S.optional(ContainerProperties),
    instanceTypes: S.optional(StringList),
    ecsProperties: S.optional(EcsProperties),
    eksProperties: S.optional(EksProperties),
    consumableResourceProperties: S.optional(ConsumableResourceProperties),
  }),
).annotate({
  identifier: "NodeRangeProperty",
}) as any as S.Schema<NodeRangeProperty>;
export type NodeRangeProperties = NodeRangeProperty[];
export const NodeRangeProperties = /*@__PURE__*/ S.Array(NodeRangeProperty);
export interface NodeProperties {
  numNodes?: number;
  mainNode?: number;
  nodeRangeProperties?: NodeRangeProperty[];
}
export const NodeProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    numNodes: S.optional(S.Number),
    mainNode: S.optional(S.Number),
    nodeRangeProperties: S.optional(NodeRangeProperties),
  }),
).annotate({ identifier: "NodeProperties" }) as any as S.Schema<NodeProperties>;
export type PlatformCapability =
  | "EC2"
  | "FARGATE"
  | "MANAGED_INSTANCES"
  | (string & {});
export const PlatformCapability = S.String;

export type PlatformCapabilityList = PlatformCapability[];
export const PlatformCapabilityList = /*@__PURE__*/ S.Array(PlatformCapability);
export interface JobDefinition {
  jobDefinitionName?: string;
  jobDefinitionArn?: string;
  revision?: number;
  status?: string;
  type?: string;
  schedulingPriority?: number;
  parameters?: { [key: string]: string | undefined };
  retryStrategy?: RetryStrategy;
  containerProperties?: ContainerProperties;
  timeout?: JobTimeout;
  nodeProperties?: NodeProperties;
  tags?: { [key: string]: string | undefined };
  propagateTags?: boolean;
  platformCapabilities?: PlatformCapability[];
  ecsProperties?: EcsProperties;
  eksProperties?: EksProperties;
  containerOrchestrationType?: OrchestrationType;
  consumableResourceProperties?: ConsumableResourceProperties;
}
export const JobDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobDefinitionName: S.optional(S.String),
    jobDefinitionArn: S.optional(S.String),
    revision: S.optional(S.Number),
    status: S.optional(S.String),
    type: S.optional(S.String),
    schedulingPriority: S.optional(S.Number),
    parameters: S.optional(ParametersMap),
    retryStrategy: S.optional(RetryStrategy),
    containerProperties: S.optional(ContainerProperties),
    timeout: S.optional(JobTimeout),
    nodeProperties: S.optional(NodeProperties),
    tags: S.optional(TagrisTagsMap),
    propagateTags: S.optional(S.Boolean),
    platformCapabilities: S.optional(PlatformCapabilityList),
    ecsProperties: S.optional(EcsProperties),
    eksProperties: S.optional(EksProperties),
    containerOrchestrationType: S.optional(OrchestrationType),
    consumableResourceProperties: S.optional(ConsumableResourceProperties),
  }),
).annotate({ identifier: "JobDefinition" }) as any as S.Schema<JobDefinition>;
export type JobDefinitionList = JobDefinition[];
export const JobDefinitionList = /*@__PURE__*/ S.Array(JobDefinition);
export interface DescribeJobDefinitionsResponse {
  jobDefinitions?: (JobDefinition & {
    jobDefinitionName: string;
    jobDefinitionArn: string;
    revision: number;
    type: string;
    retryStrategy: RetryStrategy & {
      evaluateOnExit: (EvaluateOnExit & { action: RetryAction })[];
    };
    containerProperties: ContainerProperties & {
      volumes: (Volume & {
        efsVolumeConfiguration: EFSVolumeConfiguration & {
          fileSystemId: string;
        };
        s3filesVolumeConfiguration: S3FilesVolumeConfiguration & {
          fileSystemArn: string;
        };
      })[];
      ulimits: (Ulimit & {
        hardLimit: number;
        name: string;
        softLimit: number;
      })[];
      resourceRequirements: (ResourceRequirement & {
        value: string;
        type: ResourceType;
      })[];
      linuxParameters: LinuxParameters & {
        devices: (Device & { hostPath: string })[];
        tmpfs: (Tmpfs & { containerPath: string; size: number })[];
      };
      logConfiguration: LogConfiguration & {
        logDriver: LogDriver;
        secretOptions: (Secret & { name: string; valueFrom: string })[];
      };
      secrets: (Secret & { name: string; valueFrom: string })[];
      ephemeralStorage: EphemeralStorage & { sizeInGiB: number };
      repositoryCredentials: RepositoryCredentials & {
        credentialsParameter: string;
      };
    };
    nodeProperties: NodeProperties & {
      numNodes: number;
      mainNode: number;
      nodeRangeProperties: (NodeRangeProperty & {
        targetNodes: string;
        container: ContainerProperties & {
          volumes: (Volume & {
            efsVolumeConfiguration: EFSVolumeConfiguration & {
              fileSystemId: string;
            };
            s3filesVolumeConfiguration: S3FilesVolumeConfiguration & {
              fileSystemArn: string;
            };
          })[];
          ulimits: (Ulimit & {
            hardLimit: number;
            name: string;
            softLimit: number;
          })[];
          resourceRequirements: (ResourceRequirement & {
            value: string;
            type: ResourceType;
          })[];
          linuxParameters: LinuxParameters & {
            devices: (Device & { hostPath: string })[];
            tmpfs: (Tmpfs & { containerPath: string; size: number })[];
          };
          logConfiguration: LogConfiguration & {
            logDriver: LogDriver;
            secretOptions: (Secret & { name: string; valueFrom: string })[];
          };
          secrets: (Secret & { name: string; valueFrom: string })[];
          ephemeralStorage: EphemeralStorage & { sizeInGiB: number };
          repositoryCredentials: RepositoryCredentials & {
            credentialsParameter: string;
          };
        };
        ecsProperties: EcsProperties & {
          taskProperties: (EcsTaskProperties & {
            containers: (TaskContainerProperties & {
              image: string;
              firelensConfiguration: FirelensConfiguration & {
                type: FirelensConfigurationType;
              };
              linuxParameters: LinuxParameters & {
                devices: (Device & { hostPath: string })[];
                tmpfs: (Tmpfs & { containerPath: string; size: number })[];
              };
              logConfiguration: LogConfiguration & {
                logDriver: LogDriver;
                secretOptions: (Secret & { name: string; valueFrom: string })[];
              };
              repositoryCredentials: RepositoryCredentials & {
                credentialsParameter: string;
              };
              resourceRequirements: (ResourceRequirement & {
                value: string;
                type: ResourceType;
              })[];
              secrets: (Secret & { name: string; valueFrom: string })[];
              ulimits: (Ulimit & {
                hardLimit: number;
                name: string;
                softLimit: number;
              })[];
            })[];
            ephemeralStorage: EphemeralStorage & { sizeInGiB: number };
            volumes: (Volume & {
              efsVolumeConfiguration: EFSVolumeConfiguration & {
                fileSystemId: string;
              };
              s3filesVolumeConfiguration: S3FilesVolumeConfiguration & {
                fileSystemArn: string;
              };
            })[];
          })[];
        };
        eksProperties: EksProperties & {
          podProperties: EksPodProperties & {
            imagePullSecrets: (ImagePullSecret & { name: string })[];
            containers: (EksContainer & {
              image: string;
              env: (EksContainerEnvironmentVariable & { name: string })[];
            })[];
            initContainers: (EksContainer & {
              image: string;
              env: (EksContainerEnvironmentVariable & { name: string })[];
            })[];
            volumes: (EksVolume & {
              name: string;
              secret: EksSecret & { secretName: string };
              persistentVolumeClaim: EksPersistentVolumeClaim & {
                claimName: string;
              };
            })[];
          };
        };
      })[];
    };
    ecsProperties: EcsProperties & {
      taskProperties: (EcsTaskProperties & {
        containers: (TaskContainerProperties & {
          image: string;
          firelensConfiguration: FirelensConfiguration & {
            type: FirelensConfigurationType;
          };
          linuxParameters: LinuxParameters & {
            devices: (Device & { hostPath: string })[];
            tmpfs: (Tmpfs & { containerPath: string; size: number })[];
          };
          logConfiguration: LogConfiguration & {
            logDriver: LogDriver;
            secretOptions: (Secret & { name: string; valueFrom: string })[];
          };
          repositoryCredentials: RepositoryCredentials & {
            credentialsParameter: string;
          };
          resourceRequirements: (ResourceRequirement & {
            value: string;
            type: ResourceType;
          })[];
          secrets: (Secret & { name: string; valueFrom: string })[];
          ulimits: (Ulimit & {
            hardLimit: number;
            name: string;
            softLimit: number;
          })[];
        })[];
        ephemeralStorage: EphemeralStorage & { sizeInGiB: number };
        volumes: (Volume & {
          efsVolumeConfiguration: EFSVolumeConfiguration & {
            fileSystemId: string;
          };
          s3filesVolumeConfiguration: S3FilesVolumeConfiguration & {
            fileSystemArn: string;
          };
        })[];
      })[];
    };
    eksProperties: EksProperties & {
      podProperties: EksPodProperties & {
        imagePullSecrets: (ImagePullSecret & { name: string })[];
        containers: (EksContainer & {
          image: string;
          env: (EksContainerEnvironmentVariable & { name: string })[];
        })[];
        initContainers: (EksContainer & {
          image: string;
          env: (EksContainerEnvironmentVariable & { name: string })[];
        })[];
        volumes: (EksVolume & {
          name: string;
          secret: EksSecret & { secretName: string };
          persistentVolumeClaim: EksPersistentVolumeClaim & {
            claimName: string;
          };
        })[];
      };
    };
  })[];
  nextToken?: string;
}
export const DescribeJobDefinitionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobDefinitions: S.optional(JobDefinitionList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeJobDefinitionsResponse",
}) as any as S.Schema<DescribeJobDefinitionsResponse>;
export interface DescribeJobQueuesRequest {
  jobQueues?: string[];
  maxResults?: number;
  nextToken?: string;
}
export const DescribeJobQueuesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobQueues: S.optional(StringList),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/describejobqueues" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeJobQueuesRequest",
}) as any as S.Schema<DescribeJobQueuesRequest>;
export type JQStatus =
  | "CREATING"
  | "UPDATING"
  | "DELETING"
  | "DELETED"
  | "VALID"
  | "INVALID"
  | (string & {});
export const JQStatus = S.String;

export interface JobQueueDetail {
  jobQueueName?: string;
  jobQueueArn?: string;
  state?: JQState;
  schedulingPolicyArn?: string;
  status?: JQStatus;
  statusReason?: string;
  priority?: number;
  computeEnvironmentOrder?: ComputeEnvironmentOrder[];
  serviceEnvironmentOrder?: ServiceEnvironmentOrder[];
  jobQueueType?: JobQueueType;
  tags?: { [key: string]: string | undefined };
  jobStateTimeLimitActions?: JobStateTimeLimitAction[];
}
export const JobQueueDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobQueueName: S.optional(S.String),
    jobQueueArn: S.optional(S.String),
    state: S.optional(JQState),
    schedulingPolicyArn: S.optional(S.String),
    status: S.optional(JQStatus),
    statusReason: S.optional(S.String),
    priority: S.optional(S.Number),
    computeEnvironmentOrder: S.optional(ComputeEnvironmentOrders),
    serviceEnvironmentOrder: S.optional(ServiceEnvironmentOrders),
    jobQueueType: S.optional(JobQueueType),
    tags: S.optional(TagrisTagsMap),
    jobStateTimeLimitActions: S.optional(JobStateTimeLimitActions),
  }),
).annotate({ identifier: "JobQueueDetail" }) as any as S.Schema<JobQueueDetail>;
export type JobQueueDetailList = JobQueueDetail[];
export const JobQueueDetailList = /*@__PURE__*/ S.Array(JobQueueDetail);
export interface DescribeJobQueuesResponse {
  jobQueues?: (JobQueueDetail & {
    jobQueueName: string;
    jobQueueArn: string;
    state: JQState;
    priority: number;
    computeEnvironmentOrder: (ComputeEnvironmentOrder & {
      order: number;
      computeEnvironment: string;
    })[];
    serviceEnvironmentOrder: (ServiceEnvironmentOrder & {
      order: number;
      serviceEnvironment: string;
    })[];
    jobStateTimeLimitActions: (JobStateTimeLimitAction & {
      reason: string;
      state: JobStateTimeLimitActionsState;
      maxTimeSeconds: number;
      action: JobStateTimeLimitActionsAction;
    })[];
  })[];
  nextToken?: string;
}
export const DescribeJobQueuesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobQueues: S.optional(JobQueueDetailList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeJobQueuesResponse",
}) as any as S.Schema<DescribeJobQueuesResponse>;
export interface DescribeJobsRequest {
  jobs?: string[];
}
export const DescribeJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobs: S.optional(StringList) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/describejobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeJobsRequest",
}) as any as S.Schema<DescribeJobsRequest>;
export type JobStatus =
  | "SUBMITTED"
  | "PENDING"
  | "RUNNABLE"
  | "STARTING"
  | "RUNNING"
  | "SUCCEEDED"
  | "FAILED"
  | (string & {});
export const JobStatus = S.String;

export interface NetworkInterface {
  attachmentId?: string;
  ipv6Address?: string;
  privateIpv4Address?: string;
}
export const NetworkInterface = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    attachmentId: S.optional(S.String),
    ipv6Address: S.optional(S.String),
    privateIpv4Address: S.optional(S.String),
  }),
).annotate({
  identifier: "NetworkInterface",
}) as any as S.Schema<NetworkInterface>;
export type NetworkInterfaceList = NetworkInterface[];
export const NetworkInterfaceList = /*@__PURE__*/ S.Array(NetworkInterface);
export interface AttemptContainerDetail {
  containerInstanceArn?: string;
  taskArn?: string;
  exitCode?: number;
  reason?: string;
  logStreamName?: string;
  networkInterfaces?: NetworkInterface[];
}
export const AttemptContainerDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    containerInstanceArn: S.optional(S.String),
    taskArn: S.optional(S.String),
    exitCode: S.optional(S.Number),
    reason: S.optional(S.String),
    logStreamName: S.optional(S.String),
    networkInterfaces: S.optional(NetworkInterfaceList),
  }),
).annotate({
  identifier: "AttemptContainerDetail",
}) as any as S.Schema<AttemptContainerDetail>;
export interface AttemptTaskContainerDetails {
  exitCode?: number;
  name?: string;
  reason?: string;
  logStreamName?: string;
  networkInterfaces?: NetworkInterface[];
}
export const AttemptTaskContainerDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    exitCode: S.optional(S.Number),
    name: S.optional(S.String),
    reason: S.optional(S.String),
    logStreamName: S.optional(S.String),
    networkInterfaces: S.optional(NetworkInterfaceList),
  }),
).annotate({
  identifier: "AttemptTaskContainerDetails",
}) as any as S.Schema<AttemptTaskContainerDetails>;
export type ListAttemptTaskContainerDetails = AttemptTaskContainerDetails[];
export const ListAttemptTaskContainerDetails = /*@__PURE__*/ S.Array(
  AttemptTaskContainerDetails,
);
export interface AttemptEcsTaskDetails {
  containerInstanceArn?: string;
  taskArn?: string;
  containers?: AttemptTaskContainerDetails[];
}
export const AttemptEcsTaskDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    containerInstanceArn: S.optional(S.String),
    taskArn: S.optional(S.String),
    containers: S.optional(ListAttemptTaskContainerDetails),
  }),
).annotate({
  identifier: "AttemptEcsTaskDetails",
}) as any as S.Schema<AttemptEcsTaskDetails>;
export type ListAttemptEcsTaskDetails = AttemptEcsTaskDetails[];
export const ListAttemptEcsTaskDetails = /*@__PURE__*/ S.Array(
  AttemptEcsTaskDetails,
);
export interface AttemptDetail {
  container?: AttemptContainerDetail;
  startedAt?: number;
  stoppedAt?: number;
  statusReason?: string;
  taskProperties?: AttemptEcsTaskDetails[];
}
export const AttemptDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    container: S.optional(AttemptContainerDetail),
    startedAt: S.optional(S.Number),
    stoppedAt: S.optional(S.Number),
    statusReason: S.optional(S.String),
    taskProperties: S.optional(ListAttemptEcsTaskDetails),
  }),
).annotate({ identifier: "AttemptDetail" }) as any as S.Schema<AttemptDetail>;
export type AttemptDetails = AttemptDetail[];
export const AttemptDetails = /*@__PURE__*/ S.Array(AttemptDetail);
export type ArrayJobDependency = "N_TO_N" | "SEQUENTIAL" | (string & {});
export const ArrayJobDependency = S.String;

export interface JobDependency {
  jobId?: string;
  type?: ArrayJobDependency;
}
export const JobDependency = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobId: S.optional(S.String),
    type: S.optional(ArrayJobDependency),
  }),
).annotate({ identifier: "JobDependency" }) as any as S.Schema<JobDependency>;
export type JobDependencyList = JobDependency[];
export const JobDependencyList = /*@__PURE__*/ S.Array(JobDependency);
export interface ContainerDetail {
  image?: string;
  vcpus?: number;
  memory?: number;
  command?: string[];
  jobRoleArn?: string;
  executionRoleArn?: string;
  volumes?: Volume[];
  environment?: KeyValuePair[];
  mountPoints?: MountPoint[];
  readonlyRootFilesystem?: boolean;
  ulimits?: Ulimit[];
  privileged?: boolean;
  user?: string;
  exitCode?: number;
  reason?: string;
  containerInstanceArn?: string;
  taskArn?: string;
  logStreamName?: string;
  instanceType?: string;
  networkInterfaces?: NetworkInterface[];
  resourceRequirements?: ResourceRequirement[];
  linuxParameters?: LinuxParameters;
  logConfiguration?: LogConfiguration;
  secrets?: Secret[];
  networkConfiguration?: NetworkConfiguration;
  fargatePlatformConfiguration?: FargatePlatformConfiguration;
  ephemeralStorage?: EphemeralStorage;
  runtimePlatform?: RuntimePlatform;
  repositoryCredentials?: RepositoryCredentials;
  enableExecuteCommand?: boolean;
}
export const ContainerDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    image: S.optional(S.String),
    vcpus: S.optional(S.Number),
    memory: S.optional(S.Number),
    command: S.optional(StringList),
    jobRoleArn: S.optional(S.String),
    executionRoleArn: S.optional(S.String),
    volumes: S.optional(Volumes),
    environment: S.optional(EnvironmentVariables),
    mountPoints: S.optional(MountPoints),
    readonlyRootFilesystem: S.optional(S.Boolean),
    ulimits: S.optional(Ulimits),
    privileged: S.optional(S.Boolean),
    user: S.optional(S.String),
    exitCode: S.optional(S.Number),
    reason: S.optional(S.String),
    containerInstanceArn: S.optional(S.String),
    taskArn: S.optional(S.String),
    logStreamName: S.optional(S.String),
    instanceType: S.optional(S.String),
    networkInterfaces: S.optional(NetworkInterfaceList),
    resourceRequirements: S.optional(ResourceRequirements),
    linuxParameters: S.optional(LinuxParameters),
    logConfiguration: S.optional(LogConfiguration),
    secrets: S.optional(SecretList),
    networkConfiguration: S.optional(NetworkConfiguration),
    fargatePlatformConfiguration: S.optional(FargatePlatformConfiguration),
    ephemeralStorage: S.optional(EphemeralStorage),
    runtimePlatform: S.optional(RuntimePlatform),
    repositoryCredentials: S.optional(RepositoryCredentials),
    enableExecuteCommand: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ContainerDetail",
}) as any as S.Schema<ContainerDetail>;
export interface NodeDetails {
  nodeIndex?: number;
  isMainNode?: boolean;
}
export const NodeDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nodeIndex: S.optional(S.Number),
    isMainNode: S.optional(S.Boolean),
  }),
).annotate({ identifier: "NodeDetails" }) as any as S.Schema<NodeDetails>;
export type ArrayJobStatusSummary = { [key: string]: number | undefined };
export const ArrayJobStatusSummary = /*@__PURE__*/ S.Record(
  S.String,
  S.Number.pipe(S.optional),
);
export interface ArrayPropertiesDetail {
  statusSummary?: { [key: string]: number | undefined };
  statusSummaryLastUpdatedAt?: number;
  size?: number;
  index?: number;
}
export const ArrayPropertiesDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    statusSummary: S.optional(ArrayJobStatusSummary),
    statusSummaryLastUpdatedAt: S.optional(S.Number),
    size: S.optional(S.Number),
    index: S.optional(S.Number),
  }),
).annotate({
  identifier: "ArrayPropertiesDetail",
}) as any as S.Schema<ArrayPropertiesDetail>;
export interface EksContainerDetail {
  name?: string;
  image?: string;
  imagePullPolicy?: string;
  command?: string[];
  args?: string[];
  env?: EksContainerEnvironmentVariable[];
  resources?: EksContainerResourceRequirements;
  exitCode?: number;
  reason?: string;
  volumeMounts?: EksContainerVolumeMount[];
  securityContext?: EksContainerSecurityContext;
}
export const EksContainerDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    image: S.optional(S.String),
    imagePullPolicy: S.optional(S.String),
    command: S.optional(StringList),
    args: S.optional(StringList),
    env: S.optional(EksContainerEnvironmentVariables),
    resources: S.optional(EksContainerResourceRequirements),
    exitCode: S.optional(S.Number),
    reason: S.optional(S.String),
    volumeMounts: S.optional(EksContainerVolumeMounts),
    securityContext: S.optional(EksContainerSecurityContext),
  }),
).annotate({
  identifier: "EksContainerDetail",
}) as any as S.Schema<EksContainerDetail>;
export type EksContainerDetails = EksContainerDetail[];
export const EksContainerDetails = /*@__PURE__*/ S.Array(EksContainerDetail);
export interface EksPodPropertiesDetail {
  serviceAccountName?: string;
  hostNetwork?: boolean;
  dnsPolicy?: string;
  imagePullSecrets?: ImagePullSecret[];
  containers?: EksContainerDetail[];
  initContainers?: EksContainerDetail[];
  volumes?: EksVolume[];
  podName?: string;
  nodeName?: string;
  metadata?: EksMetadata;
  shareProcessNamespace?: boolean;
}
export const EksPodPropertiesDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceAccountName: S.optional(S.String),
    hostNetwork: S.optional(S.Boolean),
    dnsPolicy: S.optional(S.String),
    imagePullSecrets: S.optional(ImagePullSecrets),
    containers: S.optional(EksContainerDetails),
    initContainers: S.optional(EksContainerDetails),
    volumes: S.optional(EksVolumes),
    podName: S.optional(S.String),
    nodeName: S.optional(S.String),
    metadata: S.optional(EksMetadata),
    shareProcessNamespace: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "EksPodPropertiesDetail",
}) as any as S.Schema<EksPodPropertiesDetail>;
export interface EksPropertiesDetail {
  podProperties?: EksPodPropertiesDetail;
}
export const EksPropertiesDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ podProperties: S.optional(EksPodPropertiesDetail) }),
).annotate({
  identifier: "EksPropertiesDetail",
}) as any as S.Schema<EksPropertiesDetail>;
export interface EksAttemptContainerDetail {
  name?: string;
  containerID?: string;
  exitCode?: number;
  reason?: string;
}
export const EksAttemptContainerDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    containerID: S.optional(S.String),
    exitCode: S.optional(S.Number),
    reason: S.optional(S.String),
  }),
).annotate({
  identifier: "EksAttemptContainerDetail",
}) as any as S.Schema<EksAttemptContainerDetail>;
export type EksAttemptContainerDetails = EksAttemptContainerDetail[];
export const EksAttemptContainerDetails = /*@__PURE__*/ S.Array(
  EksAttemptContainerDetail,
);
export interface EksAttemptDetail {
  containers?: EksAttemptContainerDetail[];
  initContainers?: EksAttemptContainerDetail[];
  eksClusterArn?: string;
  podName?: string;
  podNamespace?: string;
  nodeName?: string;
  startedAt?: number;
  stoppedAt?: number;
  statusReason?: string;
}
export const EksAttemptDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    containers: S.optional(EksAttemptContainerDetails),
    initContainers: S.optional(EksAttemptContainerDetails),
    eksClusterArn: S.optional(S.String),
    podName: S.optional(S.String),
    podNamespace: S.optional(S.String),
    nodeName: S.optional(S.String),
    startedAt: S.optional(S.Number),
    stoppedAt: S.optional(S.Number),
    statusReason: S.optional(S.String),
  }),
).annotate({
  identifier: "EksAttemptDetail",
}) as any as S.Schema<EksAttemptDetail>;
export type EksAttemptDetails = EksAttemptDetail[];
export const EksAttemptDetails = /*@__PURE__*/ S.Array(EksAttemptDetail);
export interface TaskContainerDetails {
  command?: string[];
  dependsOn?: TaskContainerDependency[];
  environment?: KeyValuePair[];
  essential?: boolean;
  firelensConfiguration?: FirelensConfiguration;
  image?: string;
  linuxParameters?: LinuxParameters;
  logConfiguration?: LogConfiguration;
  mountPoints?: MountPoint[];
  name?: string;
  privileged?: boolean;
  readonlyRootFilesystem?: boolean;
  repositoryCredentials?: RepositoryCredentials;
  resourceRequirements?: ResourceRequirement[];
  secrets?: Secret[];
  ulimits?: Ulimit[];
  user?: string;
  startTimeout?: number;
  stopTimeout?: number;
  exitCode?: number;
  reason?: string;
  logStreamName?: string;
  networkInterfaces?: NetworkInterface[];
}
export const TaskContainerDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    command: S.optional(StringList),
    dependsOn: S.optional(TaskContainerDependencyList),
    environment: S.optional(EnvironmentVariables),
    essential: S.optional(S.Boolean),
    firelensConfiguration: S.optional(FirelensConfiguration),
    image: S.optional(S.String),
    linuxParameters: S.optional(LinuxParameters),
    logConfiguration: S.optional(LogConfiguration),
    mountPoints: S.optional(MountPoints),
    name: S.optional(S.String),
    privileged: S.optional(S.Boolean),
    readonlyRootFilesystem: S.optional(S.Boolean),
    repositoryCredentials: S.optional(RepositoryCredentials),
    resourceRequirements: S.optional(ResourceRequirements),
    secrets: S.optional(SecretList),
    ulimits: S.optional(Ulimits),
    user: S.optional(S.String),
    startTimeout: S.optional(S.Number),
    stopTimeout: S.optional(S.Number),
    exitCode: S.optional(S.Number),
    reason: S.optional(S.String),
    logStreamName: S.optional(S.String),
    networkInterfaces: S.optional(NetworkInterfaceList),
  }),
).annotate({
  identifier: "TaskContainerDetails",
}) as any as S.Schema<TaskContainerDetails>;
export type ListTaskContainerDetails = TaskContainerDetails[];
export const ListTaskContainerDetails =
  /*@__PURE__*/ S.Array(TaskContainerDetails);
export interface EcsTaskDetails {
  containers?: TaskContainerDetails[];
  containerInstanceArn?: string;
  taskArn?: string;
  ephemeralStorage?: EphemeralStorage;
  executionRoleArn?: string;
  platformVersion?: string;
  ipcMode?: string;
  taskRoleArn?: string;
  pidMode?: string;
  networkConfiguration?: NetworkConfiguration;
  runtimePlatform?: RuntimePlatform;
  volumes?: Volume[];
  enableExecuteCommand?: boolean;
  networkMode?: string;
}
export const EcsTaskDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    containers: S.optional(ListTaskContainerDetails),
    containerInstanceArn: S.optional(S.String),
    taskArn: S.optional(S.String),
    ephemeralStorage: S.optional(EphemeralStorage),
    executionRoleArn: S.optional(S.String),
    platformVersion: S.optional(S.String),
    ipcMode: S.optional(S.String),
    taskRoleArn: S.optional(S.String),
    pidMode: S.optional(S.String),
    networkConfiguration: S.optional(NetworkConfiguration),
    runtimePlatform: S.optional(RuntimePlatform),
    volumes: S.optional(Volumes),
    enableExecuteCommand: S.optional(S.Boolean),
    networkMode: S.optional(S.String),
  }),
).annotate({ identifier: "EcsTaskDetails" }) as any as S.Schema<EcsTaskDetails>;
export type ListEcsTaskDetails = EcsTaskDetails[];
export const ListEcsTaskDetails = /*@__PURE__*/ S.Array(EcsTaskDetails);
export interface EcsPropertiesDetail {
  taskProperties?: EcsTaskDetails[];
}
export const EcsPropertiesDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ taskProperties: S.optional(ListEcsTaskDetails) }),
).annotate({
  identifier: "EcsPropertiesDetail",
}) as any as S.Schema<EcsPropertiesDetail>;
export interface JobDetail {
  jobArn?: string;
  jobName?: string;
  jobId?: string;
  jobQueue?: string;
  status?: JobStatus;
  shareIdentifier?: string;
  schedulingPriority?: number;
  attempts?: AttemptDetail[];
  statusReason?: string;
  createdAt?: number;
  retryStrategy?: RetryStrategy;
  startedAt?: number;
  stoppedAt?: number;
  dependsOn?: JobDependency[];
  jobDefinition?: string;
  parameters?: { [key: string]: string | undefined };
  container?: ContainerDetail;
  nodeDetails?: NodeDetails;
  nodeProperties?: NodeProperties;
  arrayProperties?: ArrayPropertiesDetail;
  timeout?: JobTimeout;
  tags?: { [key: string]: string | undefined };
  propagateTags?: boolean;
  platformCapabilities?: PlatformCapability[];
  eksProperties?: EksPropertiesDetail;
  eksAttempts?: EksAttemptDetail[];
  ecsProperties?: EcsPropertiesDetail;
  isCancelled?: boolean;
  isTerminated?: boolean;
  consumableResourceProperties?: ConsumableResourceProperties;
}
export const JobDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobArn: S.optional(S.String),
    jobName: S.optional(S.String),
    jobId: S.optional(S.String),
    jobQueue: S.optional(S.String),
    status: S.optional(JobStatus),
    shareIdentifier: S.optional(S.String),
    schedulingPriority: S.optional(S.Number),
    attempts: S.optional(AttemptDetails),
    statusReason: S.optional(S.String),
    createdAt: S.optional(S.Number),
    retryStrategy: S.optional(RetryStrategy),
    startedAt: S.optional(S.Number),
    stoppedAt: S.optional(S.Number),
    dependsOn: S.optional(JobDependencyList),
    jobDefinition: S.optional(S.String),
    parameters: S.optional(ParametersMap),
    container: S.optional(ContainerDetail),
    nodeDetails: S.optional(NodeDetails),
    nodeProperties: S.optional(NodeProperties),
    arrayProperties: S.optional(ArrayPropertiesDetail),
    timeout: S.optional(JobTimeout),
    tags: S.optional(TagrisTagsMap),
    propagateTags: S.optional(S.Boolean),
    platformCapabilities: S.optional(PlatformCapabilityList),
    eksProperties: S.optional(EksPropertiesDetail),
    eksAttempts: S.optional(EksAttemptDetails),
    ecsProperties: S.optional(EcsPropertiesDetail),
    isCancelled: S.optional(S.Boolean),
    isTerminated: S.optional(S.Boolean),
    consumableResourceProperties: S.optional(ConsumableResourceProperties),
  }),
).annotate({ identifier: "JobDetail" }) as any as S.Schema<JobDetail>;
export type JobDetailList = JobDetail[];
export const JobDetailList = /*@__PURE__*/ S.Array(JobDetail);
export interface DescribeJobsResponse {
  jobs?: (JobDetail & {
    jobName: string;
    jobId: string;
    jobQueue: string;
    status: JobStatus;
    startedAt: number;
    jobDefinition: string;
    retryStrategy: RetryStrategy & {
      evaluateOnExit: (EvaluateOnExit & { action: RetryAction })[];
    };
    container: ContainerDetail & {
      volumes: (Volume & {
        efsVolumeConfiguration: EFSVolumeConfiguration & {
          fileSystemId: string;
        };
        s3filesVolumeConfiguration: S3FilesVolumeConfiguration & {
          fileSystemArn: string;
        };
      })[];
      ulimits: (Ulimit & {
        hardLimit: number;
        name: string;
        softLimit: number;
      })[];
      resourceRequirements: (ResourceRequirement & {
        value: string;
        type: ResourceType;
      })[];
      linuxParameters: LinuxParameters & {
        devices: (Device & { hostPath: string })[];
        tmpfs: (Tmpfs & { containerPath: string; size: number })[];
      };
      logConfiguration: LogConfiguration & {
        logDriver: LogDriver;
        secretOptions: (Secret & { name: string; valueFrom: string })[];
      };
      secrets: (Secret & { name: string; valueFrom: string })[];
      ephemeralStorage: EphemeralStorage & { sizeInGiB: number };
      repositoryCredentials: RepositoryCredentials & {
        credentialsParameter: string;
      };
    };
    nodeProperties: NodeProperties & {
      numNodes: number;
      mainNode: number;
      nodeRangeProperties: (NodeRangeProperty & {
        targetNodes: string;
        container: ContainerProperties & {
          volumes: (Volume & {
            efsVolumeConfiguration: EFSVolumeConfiguration & {
              fileSystemId: string;
            };
            s3filesVolumeConfiguration: S3FilesVolumeConfiguration & {
              fileSystemArn: string;
            };
          })[];
          ulimits: (Ulimit & {
            hardLimit: number;
            name: string;
            softLimit: number;
          })[];
          resourceRequirements: (ResourceRequirement & {
            value: string;
            type: ResourceType;
          })[];
          linuxParameters: LinuxParameters & {
            devices: (Device & { hostPath: string })[];
            tmpfs: (Tmpfs & { containerPath: string; size: number })[];
          };
          logConfiguration: LogConfiguration & {
            logDriver: LogDriver;
            secretOptions: (Secret & { name: string; valueFrom: string })[];
          };
          secrets: (Secret & { name: string; valueFrom: string })[];
          ephemeralStorage: EphemeralStorage & { sizeInGiB: number };
          repositoryCredentials: RepositoryCredentials & {
            credentialsParameter: string;
          };
        };
        ecsProperties: EcsProperties & {
          taskProperties: (EcsTaskProperties & {
            containers: (TaskContainerProperties & {
              image: string;
              firelensConfiguration: FirelensConfiguration & {
                type: FirelensConfigurationType;
              };
              linuxParameters: LinuxParameters & {
                devices: (Device & { hostPath: string })[];
                tmpfs: (Tmpfs & { containerPath: string; size: number })[];
              };
              logConfiguration: LogConfiguration & {
                logDriver: LogDriver;
                secretOptions: (Secret & { name: string; valueFrom: string })[];
              };
              repositoryCredentials: RepositoryCredentials & {
                credentialsParameter: string;
              };
              resourceRequirements: (ResourceRequirement & {
                value: string;
                type: ResourceType;
              })[];
              secrets: (Secret & { name: string; valueFrom: string })[];
              ulimits: (Ulimit & {
                hardLimit: number;
                name: string;
                softLimit: number;
              })[];
            })[];
            ephemeralStorage: EphemeralStorage & { sizeInGiB: number };
            volumes: (Volume & {
              efsVolumeConfiguration: EFSVolumeConfiguration & {
                fileSystemId: string;
              };
              s3filesVolumeConfiguration: S3FilesVolumeConfiguration & {
                fileSystemArn: string;
              };
            })[];
          })[];
        };
        eksProperties: EksProperties & {
          podProperties: EksPodProperties & {
            imagePullSecrets: (ImagePullSecret & { name: string })[];
            containers: (EksContainer & {
              image: string;
              env: (EksContainerEnvironmentVariable & { name: string })[];
            })[];
            initContainers: (EksContainer & {
              image: string;
              env: (EksContainerEnvironmentVariable & { name: string })[];
            })[];
            volumes: (EksVolume & {
              name: string;
              secret: EksSecret & { secretName: string };
              persistentVolumeClaim: EksPersistentVolumeClaim & {
                claimName: string;
              };
            })[];
          };
        };
      })[];
    };
    eksProperties: EksPropertiesDetail & {
      podProperties: EksPodPropertiesDetail & {
        imagePullSecrets: (ImagePullSecret & { name: string })[];
        containers: (EksContainerDetail & {
          env: (EksContainerEnvironmentVariable & { name: string })[];
        })[];
        initContainers: (EksContainerDetail & {
          env: (EksContainerEnvironmentVariable & { name: string })[];
        })[];
        volumes: (EksVolume & {
          name: string;
          secret: EksSecret & { secretName: string };
          persistentVolumeClaim: EksPersistentVolumeClaim & {
            claimName: string;
          };
        })[];
      };
    };
    ecsProperties: EcsPropertiesDetail & {
      taskProperties: (EcsTaskDetails & {
        containers: (TaskContainerDetails & {
          firelensConfiguration: FirelensConfiguration & {
            type: FirelensConfigurationType;
          };
          linuxParameters: LinuxParameters & {
            devices: (Device & { hostPath: string })[];
            tmpfs: (Tmpfs & { containerPath: string; size: number })[];
          };
          logConfiguration: LogConfiguration & {
            logDriver: LogDriver;
            secretOptions: (Secret & { name: string; valueFrom: string })[];
          };
          repositoryCredentials: RepositoryCredentials & {
            credentialsParameter: string;
          };
          resourceRequirements: (ResourceRequirement & {
            value: string;
            type: ResourceType;
          })[];
          secrets: (Secret & { name: string; valueFrom: string })[];
          ulimits: (Ulimit & {
            hardLimit: number;
            name: string;
            softLimit: number;
          })[];
        })[];
        ephemeralStorage: EphemeralStorage & { sizeInGiB: number };
        volumes: (Volume & {
          efsVolumeConfiguration: EFSVolumeConfiguration & {
            fileSystemId: string;
          };
          s3filesVolumeConfiguration: S3FilesVolumeConfiguration & {
            fileSystemArn: string;
          };
        })[];
      })[];
    };
  })[];
}
export const DescribeJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobs: S.optional(JobDetailList) }).pipe(ns),
).annotate({
  identifier: "DescribeJobsResponse",
}) as any as S.Schema<DescribeJobsResponse>;
export interface DescribeQuotaShareRequest {
  quotaShareArn?: string;
}
export const DescribeQuotaShareRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ quotaShareArn: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/describequotashare" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeQuotaShareRequest",
}) as any as S.Schema<DescribeQuotaShareRequest>;
export type QuotaShareStatus =
  | "CREATING"
  | "VALID"
  | "INVALID"
  | "UPDATING"
  | "DELETING"
  | (string & {});
export const QuotaShareStatus = S.String;

export interface DescribeQuotaShareResponse {
  quotaShareName?: string;
  quotaShareArn?: string;
  jobQueueArn?: string;
  capacityLimits?: (QuotaShareCapacityLimit & {
    maxCapacity: number;
    capacityUnit: string;
  })[];
  resourceSharingConfiguration?: QuotaShareResourceSharingConfiguration & {
    strategy: QuotaShareResourceSharingStrategy;
  };
  preemptionConfiguration?: QuotaSharePreemptionConfiguration & {
    inSharePreemption: QuotaShareInSharePreemptionState;
  };
  state?: QuotaShareState;
  status?: QuotaShareStatus;
  tags?: { [key: string]: string | undefined };
}
export const DescribeQuotaShareResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    quotaShareName: S.optional(S.String),
    quotaShareArn: S.optional(S.String),
    jobQueueArn: S.optional(S.String),
    capacityLimits: S.optional(QuotaShareCapacityLimits),
    resourceSharingConfiguration: S.optional(
      QuotaShareResourceSharingConfiguration,
    ),
    preemptionConfiguration: S.optional(QuotaSharePreemptionConfiguration),
    state: S.optional(QuotaShareState),
    status: S.optional(QuotaShareStatus),
    tags: S.optional(TagrisTagsMap),
  }).pipe(ns),
).annotate({
  identifier: "DescribeQuotaShareResponse",
}) as any as S.Schema<DescribeQuotaShareResponse>;
export interface DescribeSchedulingPoliciesRequest {
  arns?: string[];
}
export const DescribeSchedulingPoliciesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arns: S.optional(StringList) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/describeschedulingpolicies" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeSchedulingPoliciesRequest",
}) as any as S.Schema<DescribeSchedulingPoliciesRequest>;
export interface SchedulingPolicyDetail {
  name?: string;
  arn?: string;
  quotaSharePolicy?: QuotaSharePolicy;
  fairsharePolicy?: FairsharePolicy;
  tags?: { [key: string]: string | undefined };
}
export const SchedulingPolicyDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    arn: S.optional(S.String),
    quotaSharePolicy: S.optional(QuotaSharePolicy),
    fairsharePolicy: S.optional(FairsharePolicy),
    tags: S.optional(TagrisTagsMap),
  }),
).annotate({
  identifier: "SchedulingPolicyDetail",
}) as any as S.Schema<SchedulingPolicyDetail>;
export type SchedulingPolicyDetailList = SchedulingPolicyDetail[];
export const SchedulingPolicyDetailList = /*@__PURE__*/ S.Array(
  SchedulingPolicyDetail,
);
export interface DescribeSchedulingPoliciesResponse {
  schedulingPolicies?: (SchedulingPolicyDetail & {
    name: string;
    arn: string;
    quotaSharePolicy: QuotaSharePolicy & {
      idleResourceAssignmentStrategy: QuotaShareIdleResourceAssignmentStrategy;
    };
    fairsharePolicy: FairsharePolicy & {
      shareDistribution: (ShareAttributes & { shareIdentifier: string })[];
    };
  })[];
}
export const DescribeSchedulingPoliciesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ schedulingPolicies: S.optional(SchedulingPolicyDetailList) }).pipe(
    ns,
  ),
).annotate({
  identifier: "DescribeSchedulingPoliciesResponse",
}) as any as S.Schema<DescribeSchedulingPoliciesResponse>;
export interface DescribeServiceEnvironmentsRequest {
  serviceEnvironments?: string[];
  maxResults?: number;
  nextToken?: string;
}
export const DescribeServiceEnvironmentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceEnvironments: S.optional(StringList),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/describeserviceenvironments" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeServiceEnvironmentsRequest",
}) as any as S.Schema<DescribeServiceEnvironmentsRequest>;
export type ServiceEnvironmentStatus =
  | "CREATING"
  | "UPDATING"
  | "DELETING"
  | "DELETED"
  | "VALID"
  | "INVALID"
  | (string & {});
export const ServiceEnvironmentStatus = S.String;

export interface ServiceEnvironmentDetail {
  serviceEnvironmentName?: string;
  serviceEnvironmentArn?: string;
  serviceEnvironmentType?: ServiceEnvironmentType;
  state?: ServiceEnvironmentState;
  status?: ServiceEnvironmentStatus;
  capacityLimits?: CapacityLimit[];
  tags?: { [key: string]: string | undefined };
}
export const ServiceEnvironmentDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceEnvironmentName: S.optional(S.String),
    serviceEnvironmentArn: S.optional(S.String),
    serviceEnvironmentType: S.optional(ServiceEnvironmentType),
    state: S.optional(ServiceEnvironmentState),
    status: S.optional(ServiceEnvironmentStatus),
    capacityLimits: S.optional(CapacityLimits),
    tags: S.optional(TagrisTagsMap),
  }),
).annotate({
  identifier: "ServiceEnvironmentDetail",
}) as any as S.Schema<ServiceEnvironmentDetail>;
export type ServiceEnvironmentDetailList = ServiceEnvironmentDetail[];
export const ServiceEnvironmentDetailList = /*@__PURE__*/ S.Array(
  ServiceEnvironmentDetail,
);
export interface DescribeServiceEnvironmentsResponse {
  serviceEnvironments?: (ServiceEnvironmentDetail & {
    serviceEnvironmentName: string;
    serviceEnvironmentArn: string;
    serviceEnvironmentType: ServiceEnvironmentType;
    capacityLimits: CapacityLimits;
  })[];
  nextToken?: string;
}
export const DescribeServiceEnvironmentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceEnvironments: S.optional(ServiceEnvironmentDetailList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeServiceEnvironmentsResponse",
}) as any as S.Schema<DescribeServiceEnvironmentsResponse>;
export interface DescribeServiceJobRequest {
  jobId?: string;
}
export const DescribeServiceJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobId: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/describeservicejob" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeServiceJobRequest",
}) as any as S.Schema<DescribeServiceJobRequest>;
export type ServiceResourceIdName = "TrainingJobArn" | (string & {});
export const ServiceResourceIdName = S.String;

export interface ServiceResourceId {
  name?: ServiceResourceIdName;
  value?: string;
}
export const ServiceResourceId = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(ServiceResourceIdName),
    value: S.optional(S.String),
  }),
).annotate({
  identifier: "ServiceResourceId",
}) as any as S.Schema<ServiceResourceId>;
export interface ServiceJobAttemptDetail {
  serviceResourceId?: ServiceResourceId;
  startedAt?: number;
  stoppedAt?: number;
  statusReason?: string;
}
export const ServiceJobAttemptDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceResourceId: S.optional(ServiceResourceId),
    startedAt: S.optional(S.Number),
    stoppedAt: S.optional(S.Number),
    statusReason: S.optional(S.String),
  }),
).annotate({
  identifier: "ServiceJobAttemptDetail",
}) as any as S.Schema<ServiceJobAttemptDetail>;
export type ServiceJobAttemptDetails = ServiceJobAttemptDetail[];
export const ServiceJobAttemptDetails = /*@__PURE__*/ S.Array(
  ServiceJobAttemptDetail,
);
export interface ServiceJobCapacityUsageDetail {
  capacityUnit?: string;
  quantity?: number;
}
export const ServiceJobCapacityUsageDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    capacityUnit: S.optional(S.String),
    quantity: S.optional(S.Number),
  }),
).annotate({
  identifier: "ServiceJobCapacityUsageDetail",
}) as any as S.Schema<ServiceJobCapacityUsageDetail>;
export type ServiceJobCapacityUsageDetailList = ServiceJobCapacityUsageDetail[];
export const ServiceJobCapacityUsageDetailList = /*@__PURE__*/ S.Array(
  ServiceJobCapacityUsageDetail,
);
export interface LatestServiceJobAttempt {
  serviceResourceId?: ServiceResourceId;
}
export const LatestServiceJobAttempt = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ serviceResourceId: S.optional(ServiceResourceId) }),
).annotate({
  identifier: "LatestServiceJobAttempt",
}) as any as S.Schema<LatestServiceJobAttempt>;
export type ServiceJobRetryAction = "RETRY" | "EXIT" | (string & {});
export const ServiceJobRetryAction = S.String;

export interface ServiceJobEvaluateOnExit {
  action?: ServiceJobRetryAction;
  onStatusReason?: string;
}
export const ServiceJobEvaluateOnExit = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    action: S.optional(ServiceJobRetryAction),
    onStatusReason: S.optional(S.String),
  }),
).annotate({
  identifier: "ServiceJobEvaluateOnExit",
}) as any as S.Schema<ServiceJobEvaluateOnExit>;
export type ServiceJobEvaluateOnExitList = ServiceJobEvaluateOnExit[];
export const ServiceJobEvaluateOnExitList = /*@__PURE__*/ S.Array(
  ServiceJobEvaluateOnExit,
);
export interface ServiceJobRetryStrategy {
  attempts?: number;
  evaluateOnExit?: ServiceJobEvaluateOnExit[];
}
export const ServiceJobRetryStrategy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    attempts: S.optional(S.Number),
    evaluateOnExit: S.optional(ServiceJobEvaluateOnExitList),
  }),
).annotate({
  identifier: "ServiceJobRetryStrategy",
}) as any as S.Schema<ServiceJobRetryStrategy>;
export type ServiceJobType = "SAGEMAKER_TRAINING" | (string & {});
export const ServiceJobType = S.String;

export interface ServiceJobPreemptionConfiguration {
  preemptionRetriesBeforeTermination?: number;
}
export const ServiceJobPreemptionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ preemptionRetriesBeforeTermination: S.optional(S.Number) }),
).annotate({
  identifier: "ServiceJobPreemptionConfiguration",
}) as any as S.Schema<ServiceJobPreemptionConfiguration>;
export interface ServiceJobPreemptedAttempt {
  serviceResourceId?: ServiceResourceId;
  startedAt?: number;
  stoppedAt?: number;
  statusReason?: string;
}
export const ServiceJobPreemptedAttempt = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceResourceId: S.optional(ServiceResourceId),
    startedAt: S.optional(S.Number),
    stoppedAt: S.optional(S.Number),
    statusReason: S.optional(S.String),
  }),
).annotate({
  identifier: "ServiceJobPreemptedAttempt",
}) as any as S.Schema<ServiceJobPreemptedAttempt>;
export type ServiceJobRecentPreemptedAttemptList = ServiceJobPreemptedAttempt[];
export const ServiceJobRecentPreemptedAttemptList = /*@__PURE__*/ S.Array(
  ServiceJobPreemptedAttempt,
);
export interface ServiceJobPreemptionSummary {
  preemptedAttemptCount?: number;
  recentPreemptedAttempts?: ServiceJobPreemptedAttempt[];
}
export const ServiceJobPreemptionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    preemptedAttemptCount: S.optional(S.Number),
    recentPreemptedAttempts: S.optional(ServiceJobRecentPreemptedAttemptList),
  }),
).annotate({
  identifier: "ServiceJobPreemptionSummary",
}) as any as S.Schema<ServiceJobPreemptionSummary>;
export type ServiceJobStatus =
  | "SUBMITTED"
  | "PENDING"
  | "RUNNABLE"
  | "SCHEDULED"
  | "STARTING"
  | "RUNNING"
  | "SUCCEEDED"
  | "FAILED"
  | (string & {});
export const ServiceJobStatus = S.String;

export interface ServiceJobTimeout {
  attemptDurationSeconds?: number;
}
export const ServiceJobTimeout = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ attemptDurationSeconds: S.optional(S.Number) }),
).annotate({
  identifier: "ServiceJobTimeout",
}) as any as S.Schema<ServiceJobTimeout>;
export interface DescribeServiceJobResponse {
  attempts?: (ServiceJobAttemptDetail & {
    serviceResourceId: ServiceResourceId & {
      name: ServiceResourceIdName;
      value: string;
    };
  })[];
  capacityUsage?: ServiceJobCapacityUsageDetail[];
  createdAt?: number;
  isTerminated?: boolean;
  jobArn?: string;
  jobId: string;
  jobName: string;
  jobQueue: string;
  latestAttempt?: LatestServiceJobAttempt & {
    serviceResourceId: ServiceResourceId & {
      name: ServiceResourceIdName;
      value: string;
    };
  };
  retryStrategy?: ServiceJobRetryStrategy & { attempts: number };
  scheduledAt?: number;
  schedulingPriority?: number;
  serviceRequestPayload?: string;
  serviceJobType: ServiceJobType;
  shareIdentifier?: string;
  quotaShareName?: string;
  preemptionConfiguration?: ServiceJobPreemptionConfiguration;
  preemptionSummary?: ServiceJobPreemptionSummary & {
    recentPreemptedAttempts: (ServiceJobPreemptedAttempt & {
      serviceResourceId: ServiceResourceId & {
        name: ServiceResourceIdName;
        value: string;
      };
    })[];
  };
  startedAt: number;
  status: ServiceJobStatus;
  statusReason?: string;
  stoppedAt?: number;
  tags?: { [key: string]: string | undefined };
  timeoutConfig?: ServiceJobTimeout;
}
export const DescribeServiceJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    attempts: S.optional(ServiceJobAttemptDetails),
    capacityUsage: S.optional(ServiceJobCapacityUsageDetailList),
    createdAt: S.optional(S.Number),
    isTerminated: S.optional(S.Boolean),
    jobArn: S.optional(S.String),
    jobId: S.optional(S.String),
    jobName: S.optional(S.String),
    jobQueue: S.optional(S.String),
    latestAttempt: S.optional(LatestServiceJobAttempt),
    retryStrategy: S.optional(ServiceJobRetryStrategy),
    scheduledAt: S.optional(S.Number),
    schedulingPriority: S.optional(S.Number),
    serviceRequestPayload: S.optional(S.String),
    serviceJobType: S.optional(ServiceJobType),
    shareIdentifier: S.optional(S.String),
    quotaShareName: S.optional(S.String),
    preemptionConfiguration: S.optional(ServiceJobPreemptionConfiguration),
    preemptionSummary: S.optional(ServiceJobPreemptionSummary),
    startedAt: S.optional(S.Number),
    status: S.optional(ServiceJobStatus),
    statusReason: S.optional(S.String),
    stoppedAt: S.optional(S.Number),
    tags: S.optional(TagrisTagsMap),
    timeoutConfig: S.optional(ServiceJobTimeout),
  }).pipe(ns),
).annotate({
  identifier: "DescribeServiceJobResponse",
}) as any as S.Schema<DescribeServiceJobResponse>;
export interface GetJobQueueSnapshotRequest {
  jobQueue?: string;
}
export const GetJobQueueSnapshotRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobQueue: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/getjobqueuesnapshot" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetJobQueueSnapshotRequest",
}) as any as S.Schema<GetJobQueueSnapshotRequest>;
export interface FrontOfQueueJobSummary {
  jobArn?: string;
  earliestTimeAtPosition?: number;
}
export const FrontOfQueueJobSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobArn: S.optional(S.String),
    earliestTimeAtPosition: S.optional(S.Number),
  }),
).annotate({
  identifier: "FrontOfQueueJobSummary",
}) as any as S.Schema<FrontOfQueueJobSummary>;
export type FrontOfQueueJobSummaryList = FrontOfQueueJobSummary[];
export const FrontOfQueueJobSummaryList = /*@__PURE__*/ S.Array(
  FrontOfQueueJobSummary,
);
export interface FrontOfQueueDetail {
  jobs?: FrontOfQueueJobSummary[];
  lastUpdatedAt?: number;
}
export const FrontOfQueueDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobs: S.optional(FrontOfQueueJobSummaryList),
    lastUpdatedAt: S.optional(S.Number),
  }),
).annotate({
  identifier: "FrontOfQueueDetail",
}) as any as S.Schema<FrontOfQueueDetail>;
export interface FrontOfQuotaShareJobSummary {
  jobArn?: string;
  earliestTimeAtPosition?: number;
}
export const FrontOfQuotaShareJobSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobArn: S.optional(S.String),
    earliestTimeAtPosition: S.optional(S.Number),
  }),
).annotate({
  identifier: "FrontOfQuotaShareJobSummary",
}) as any as S.Schema<FrontOfQuotaShareJobSummary>;
export type FrontOfQuotaShareJobSummaryList = FrontOfQuotaShareJobSummary[];
export const FrontOfQuotaShareJobSummaryList = /*@__PURE__*/ S.Array(
  FrontOfQuotaShareJobSummary,
);
export type FrontOfQuotaSharesJobSummaryMap = {
  [key: string]: FrontOfQuotaShareJobSummary[] | undefined;
};
export const FrontOfQuotaSharesJobSummaryMap = /*@__PURE__*/ S.Record(
  S.String,
  FrontOfQuotaShareJobSummaryList.pipe(S.optional),
);
export interface FrontOfQuotaSharesDetail {
  quotaShares?: { [key: string]: FrontOfQuotaShareJobSummary[] | undefined };
  lastUpdatedAt?: number;
}
export const FrontOfQuotaSharesDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    quotaShares: S.optional(FrontOfQuotaSharesJobSummaryMap),
    lastUpdatedAt: S.optional(S.Number),
  }),
).annotate({
  identifier: "FrontOfQuotaSharesDetail",
}) as any as S.Schema<FrontOfQuotaSharesDetail>;
export interface QueueSnapshotCapacityUsage {
  capacityUnit?: string;
  quantity?: number;
}
export const QueueSnapshotCapacityUsage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    capacityUnit: S.optional(S.String),
    quantity: S.optional(S.Number),
  }),
).annotate({
  identifier: "QueueSnapshotCapacityUsage",
}) as any as S.Schema<QueueSnapshotCapacityUsage>;
export type QueueSnapshotCapacityUsageList = QueueSnapshotCapacityUsage[];
export const QueueSnapshotCapacityUsageList = /*@__PURE__*/ S.Array(
  QueueSnapshotCapacityUsage,
);
export interface FairshareCapacityUsage {
  capacityUnit?: string;
  quantity?: number;
}
export const FairshareCapacityUsage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    capacityUnit: S.optional(S.String),
    quantity: S.optional(S.Number),
  }),
).annotate({
  identifier: "FairshareCapacityUsage",
}) as any as S.Schema<FairshareCapacityUsage>;
export type FairshareCapacityUsageList = FairshareCapacityUsage[];
export const FairshareCapacityUsageList = /*@__PURE__*/ S.Array(
  FairshareCapacityUsage,
);
export interface FairshareCapacityUtilization {
  shareIdentifier?: string;
  capacityUsage?: FairshareCapacityUsage[];
}
export const FairshareCapacityUtilization = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    shareIdentifier: S.optional(S.String),
    capacityUsage: S.optional(FairshareCapacityUsageList),
  }),
).annotate({
  identifier: "FairshareCapacityUtilization",
}) as any as S.Schema<FairshareCapacityUtilization>;
export type FairshareCapacityUtilizationList = FairshareCapacityUtilization[];
export const FairshareCapacityUtilizationList = /*@__PURE__*/ S.Array(
  FairshareCapacityUtilization,
);
export interface FairshareUtilizationDetail {
  activeShareCount?: number;
  topCapacityUtilization?: FairshareCapacityUtilization[];
}
export const FairshareUtilizationDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    activeShareCount: S.optional(S.Number),
    topCapacityUtilization: S.optional(FairshareCapacityUtilizationList),
  }),
).annotate({
  identifier: "FairshareUtilizationDetail",
}) as any as S.Schema<FairshareUtilizationDetail>;
export interface QuotaShareCapacityUsage {
  capacityUnit?: string;
  quantity?: number;
}
export const QuotaShareCapacityUsage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    capacityUnit: S.optional(S.String),
    quantity: S.optional(S.Number),
  }),
).annotate({
  identifier: "QuotaShareCapacityUsage",
}) as any as S.Schema<QuotaShareCapacityUsage>;
export type QuotaShareCapacityUsageList = QuotaShareCapacityUsage[];
export const QuotaShareCapacityUsageList = /*@__PURE__*/ S.Array(
  QuotaShareCapacityUsage,
);
export interface QuotaShareCapacityUtilization {
  quotaShareName?: string;
  capacityUsage?: QuotaShareCapacityUsage[];
}
export const QuotaShareCapacityUtilization = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    quotaShareName: S.optional(S.String),
    capacityUsage: S.optional(QuotaShareCapacityUsageList),
  }),
).annotate({
  identifier: "QuotaShareCapacityUtilization",
}) as any as S.Schema<QuotaShareCapacityUtilization>;
export type QuotaShareCapacityUtilizationList = QuotaShareCapacityUtilization[];
export const QuotaShareCapacityUtilizationList = /*@__PURE__*/ S.Array(
  QuotaShareCapacityUtilization,
);
export interface QuotaShareUtilizationDetail {
  topCapacityUtilization?: QuotaShareCapacityUtilization[];
}
export const QuotaShareUtilizationDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    topCapacityUtilization: S.optional(QuotaShareCapacityUtilizationList),
  }),
).annotate({
  identifier: "QuotaShareUtilizationDetail",
}) as any as S.Schema<QuotaShareUtilizationDetail>;
export interface QueueSnapshotUtilizationDetail {
  totalCapacityUsage?: QueueSnapshotCapacityUsage[];
  fairshareUtilization?: FairshareUtilizationDetail;
  quotaShareUtilization?: QuotaShareUtilizationDetail;
  lastUpdatedAt?: number;
}
export const QueueSnapshotUtilizationDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    totalCapacityUsage: S.optional(QueueSnapshotCapacityUsageList),
    fairshareUtilization: S.optional(FairshareUtilizationDetail),
    quotaShareUtilization: S.optional(QuotaShareUtilizationDetail),
    lastUpdatedAt: S.optional(S.Number),
  }),
).annotate({
  identifier: "QueueSnapshotUtilizationDetail",
}) as any as S.Schema<QueueSnapshotUtilizationDetail>;
export interface GetJobQueueSnapshotResponse {
  frontOfQueue?: FrontOfQueueDetail;
  frontOfQuotaShares?: FrontOfQuotaSharesDetail;
  queueUtilization?: QueueSnapshotUtilizationDetail;
}
export const GetJobQueueSnapshotResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    frontOfQueue: S.optional(FrontOfQueueDetail),
    frontOfQuotaShares: S.optional(FrontOfQuotaSharesDetail),
    queueUtilization: S.optional(QueueSnapshotUtilizationDetail),
  }).pipe(ns),
).annotate({
  identifier: "GetJobQueueSnapshotResponse",
}) as any as S.Schema<GetJobQueueSnapshotResponse>;
export interface KeyValuesPair {
  name?: string;
  values?: string[];
}
export const KeyValuesPair = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(S.String), values: S.optional(StringList) }),
).annotate({ identifier: "KeyValuesPair" }) as any as S.Schema<KeyValuesPair>;
export type ListConsumableResourcesFilterList = KeyValuesPair[];
export const ListConsumableResourcesFilterList =
  /*@__PURE__*/ S.Array(KeyValuesPair);
export interface ListConsumableResourcesRequest {
  filters?: KeyValuesPair[];
  maxResults?: number;
  nextToken?: string;
}
export const ListConsumableResourcesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    filters: S.optional(ListConsumableResourcesFilterList),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/listconsumableresources" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListConsumableResourcesRequest",
}) as any as S.Schema<ListConsumableResourcesRequest>;
export interface ConsumableResourceSummary {
  consumableResourceArn?: string;
  consumableResourceName?: string;
  totalQuantity?: number;
  inUseQuantity?: number;
  resourceType?: string;
}
export const ConsumableResourceSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    consumableResourceArn: S.optional(S.String),
    consumableResourceName: S.optional(S.String),
    totalQuantity: S.optional(S.Number),
    inUseQuantity: S.optional(S.Number),
    resourceType: S.optional(S.String),
  }),
).annotate({
  identifier: "ConsumableResourceSummary",
}) as any as S.Schema<ConsumableResourceSummary>;
export type ConsumableResourceSummaryList = ConsumableResourceSummary[];
export const ConsumableResourceSummaryList = /*@__PURE__*/ S.Array(
  ConsumableResourceSummary,
);
export interface ListConsumableResourcesResponse {
  consumableResources: (ConsumableResourceSummary & {
    consumableResourceArn: string;
    consumableResourceName: string;
  })[];
  nextToken?: string;
}
export const ListConsumableResourcesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    consumableResources: S.optional(ConsumableResourceSummaryList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListConsumableResourcesResponse",
}) as any as S.Schema<ListConsumableResourcesResponse>;
export type ListJobsFilterList = KeyValuesPair[];
export const ListJobsFilterList = /*@__PURE__*/ S.Array(KeyValuesPair);
export interface ListJobsRequest {
  jobQueue?: string;
  arrayJobId?: string;
  multiNodeJobId?: string;
  jobStatus?: JobStatus;
  maxResults?: number;
  nextToken?: string;
  filters?: KeyValuesPair[];
}
export const ListJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobQueue: S.optional(S.String),
    arrayJobId: S.optional(S.String),
    multiNodeJobId: S.optional(S.String),
    jobStatus: S.optional(JobStatus),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    filters: S.optional(ListJobsFilterList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/listjobs" }),
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
export interface JobCapacityUsageSummary {
  capacityUnit?: string;
  quantity?: number;
}
export const JobCapacityUsageSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    capacityUnit: S.optional(S.String),
    quantity: S.optional(S.Number),
  }),
).annotate({
  identifier: "JobCapacityUsageSummary",
}) as any as S.Schema<JobCapacityUsageSummary>;
export type JobCapacityUsageSummaryList = JobCapacityUsageSummary[];
export const JobCapacityUsageSummaryList = /*@__PURE__*/ S.Array(
  JobCapacityUsageSummary,
);
export interface ContainerSummary {
  exitCode?: number;
  reason?: string;
}
export const ContainerSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ exitCode: S.optional(S.Number), reason: S.optional(S.String) }),
).annotate({
  identifier: "ContainerSummary",
}) as any as S.Schema<ContainerSummary>;
export interface ArrayPropertiesSummary {
  size?: number;
  index?: number;
  statusSummary?: { [key: string]: number | undefined };
  statusSummaryLastUpdatedAt?: number;
}
export const ArrayPropertiesSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    size: S.optional(S.Number),
    index: S.optional(S.Number),
    statusSummary: S.optional(ArrayJobStatusSummary),
    statusSummaryLastUpdatedAt: S.optional(S.Number),
  }),
).annotate({
  identifier: "ArrayPropertiesSummary",
}) as any as S.Schema<ArrayPropertiesSummary>;
export interface NodePropertiesSummary {
  isMainNode?: boolean;
  numNodes?: number;
  nodeIndex?: number;
}
export const NodePropertiesSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    isMainNode: S.optional(S.Boolean),
    numNodes: S.optional(S.Number),
    nodeIndex: S.optional(S.Number),
  }),
).annotate({
  identifier: "NodePropertiesSummary",
}) as any as S.Schema<NodePropertiesSummary>;
export interface JobSummary {
  jobArn?: string;
  jobId?: string;
  jobName?: string;
  capacityUsage?: JobCapacityUsageSummary[];
  createdAt?: number;
  scheduledAt?: number;
  shareIdentifier?: string;
  status?: JobStatus;
  statusReason?: string;
  startedAt?: number;
  stoppedAt?: number;
  container?: ContainerSummary;
  arrayProperties?: ArrayPropertiesSummary;
  nodeProperties?: NodePropertiesSummary;
  jobDefinition?: string;
}
export const JobSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobArn: S.optional(S.String),
    jobId: S.optional(S.String),
    jobName: S.optional(S.String),
    capacityUsage: S.optional(JobCapacityUsageSummaryList),
    createdAt: S.optional(S.Number),
    scheduledAt: S.optional(S.Number),
    shareIdentifier: S.optional(S.String),
    status: S.optional(JobStatus),
    statusReason: S.optional(S.String),
    startedAt: S.optional(S.Number),
    stoppedAt: S.optional(S.Number),
    container: S.optional(ContainerSummary),
    arrayProperties: S.optional(ArrayPropertiesSummary),
    nodeProperties: S.optional(NodePropertiesSummary),
    jobDefinition: S.optional(S.String),
  }),
).annotate({ identifier: "JobSummary" }) as any as S.Schema<JobSummary>;
export type JobSummaryList = JobSummary[];
export const JobSummaryList = /*@__PURE__*/ S.Array(JobSummary);
export interface ListJobsResponse {
  jobSummaryList: (JobSummary & { jobId: string; jobName: string })[];
  nextToken?: string;
}
export const ListJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobSummaryList: S.optional(JobSummaryList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListJobsResponse",
}) as any as S.Schema<ListJobsResponse>;
export type ListJobsByConsumableResourceFilterList = KeyValuesPair[];
export const ListJobsByConsumableResourceFilterList =
  /*@__PURE__*/ S.Array(KeyValuesPair);
export interface ListJobsByConsumableResourceRequest {
  consumableResource?: string;
  filters?: KeyValuesPair[];
  maxResults?: number;
  nextToken?: string;
}
export const ListJobsByConsumableResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    consumableResource: S.optional(S.String),
    filters: S.optional(ListJobsByConsumableResourceFilterList),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/listjobsbyconsumableresource" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListJobsByConsumableResourceRequest",
}) as any as S.Schema<ListJobsByConsumableResourceRequest>;
export interface ListJobsByConsumableResourceSummary {
  jobArn?: string;
  jobQueueArn?: string;
  jobName?: string;
  jobDefinitionArn?: string;
  shareIdentifier?: string;
  jobStatus?: string;
  quantity?: number;
  statusReason?: string;
  startedAt?: number;
  createdAt?: number;
  consumableResourceProperties?: ConsumableResourceProperties;
}
export const ListJobsByConsumableResourceSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobArn: S.optional(S.String),
    jobQueueArn: S.optional(S.String),
    jobName: S.optional(S.String),
    jobDefinitionArn: S.optional(S.String),
    shareIdentifier: S.optional(S.String),
    jobStatus: S.optional(S.String),
    quantity: S.optional(S.Number),
    statusReason: S.optional(S.String),
    startedAt: S.optional(S.Number),
    createdAt: S.optional(S.Number),
    consumableResourceProperties: S.optional(ConsumableResourceProperties),
  }),
).annotate({
  identifier: "ListJobsByConsumableResourceSummary",
}) as any as S.Schema<ListJobsByConsumableResourceSummary>;
export type ListJobsByConsumableResourceSummaryList =
  ListJobsByConsumableResourceSummary[];
export const ListJobsByConsumableResourceSummaryList = /*@__PURE__*/ S.Array(
  ListJobsByConsumableResourceSummary,
);
export interface ListJobsByConsumableResourceResponse {
  jobs: (ListJobsByConsumableResourceSummary & {
    jobArn: string;
    jobQueueArn: string;
    jobName: string;
    jobStatus: string;
    quantity: number;
    createdAt: number;
    consumableResourceProperties: ConsumableResourceProperties;
  })[];
  nextToken?: string;
}
export const ListJobsByConsumableResourceResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      jobs: S.optional(ListJobsByConsumableResourceSummaryList),
      nextToken: S.optional(S.String),
    }).pipe(ns),
).annotate({
  identifier: "ListJobsByConsumableResourceResponse",
}) as any as S.Schema<ListJobsByConsumableResourceResponse>;
export interface ListQuotaSharesRequest {
  jobQueue?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListQuotaSharesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobQueue: S.optional(S.String),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/listquotashares" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListQuotaSharesRequest",
}) as any as S.Schema<ListQuotaSharesRequest>;
export interface QuotaShareDetail {
  quotaShareName?: string;
  quotaShareArn?: string;
  jobQueueArn?: string;
  capacityLimits?: QuotaShareCapacityLimit[];
  resourceSharingConfiguration?: QuotaShareResourceSharingConfiguration;
  preemptionConfiguration?: QuotaSharePreemptionConfiguration;
  state?: QuotaShareState;
  status?: QuotaShareStatus;
}
export const QuotaShareDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    quotaShareName: S.optional(S.String),
    quotaShareArn: S.optional(S.String),
    jobQueueArn: S.optional(S.String),
    capacityLimits: S.optional(QuotaShareCapacityLimits),
    resourceSharingConfiguration: S.optional(
      QuotaShareResourceSharingConfiguration,
    ),
    preemptionConfiguration: S.optional(QuotaSharePreemptionConfiguration),
    state: S.optional(QuotaShareState),
    status: S.optional(QuotaShareStatus),
  }),
).annotate({
  identifier: "QuotaShareDetail",
}) as any as S.Schema<QuotaShareDetail>;
export type QuotaShareList = QuotaShareDetail[];
export const QuotaShareList = /*@__PURE__*/ S.Array(QuotaShareDetail);
export interface ListQuotaSharesResponse {
  quotaShares?: (QuotaShareDetail & {
    capacityLimits: (QuotaShareCapacityLimit & {
      maxCapacity: number;
      capacityUnit: string;
    })[];
    resourceSharingConfiguration: QuotaShareResourceSharingConfiguration & {
      strategy: QuotaShareResourceSharingStrategy;
    };
    preemptionConfiguration: QuotaSharePreemptionConfiguration & {
      inSharePreemption: QuotaShareInSharePreemptionState;
    };
  })[];
  nextToken?: string;
}
export const ListQuotaSharesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    quotaShares: S.optional(QuotaShareList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListQuotaSharesResponse",
}) as any as S.Schema<ListQuotaSharesResponse>;
export interface ListSchedulingPoliciesRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListSchedulingPoliciesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/listschedulingpolicies" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSchedulingPoliciesRequest",
}) as any as S.Schema<ListSchedulingPoliciesRequest>;
export interface SchedulingPolicyListingDetail {
  arn?: string;
}
export const SchedulingPolicyListingDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.optional(S.String) }),
).annotate({
  identifier: "SchedulingPolicyListingDetail",
}) as any as S.Schema<SchedulingPolicyListingDetail>;
export type SchedulingPolicyListingDetailList = SchedulingPolicyListingDetail[];
export const SchedulingPolicyListingDetailList = /*@__PURE__*/ S.Array(
  SchedulingPolicyListingDetail,
);
export interface ListSchedulingPoliciesResponse {
  schedulingPolicies?: (SchedulingPolicyListingDetail & { arn: string })[];
  nextToken?: string;
}
export const ListSchedulingPoliciesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    schedulingPolicies: S.optional(SchedulingPolicyListingDetailList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListSchedulingPoliciesResponse",
}) as any as S.Schema<ListSchedulingPoliciesResponse>;
export interface ListServiceJobsRequest {
  jobQueue?: string;
  jobStatus?: ServiceJobStatus;
  maxResults?: number;
  nextToken?: string;
  filters?: KeyValuesPair[];
}
export const ListServiceJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobQueue: S.optional(S.String),
    jobStatus: S.optional(ServiceJobStatus),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    filters: S.optional(ListJobsFilterList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/listservicejobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListServiceJobsRequest",
}) as any as S.Schema<ListServiceJobsRequest>;
export interface ServiceJobCapacityUsageSummary {
  capacityUnit?: string;
  quantity?: number;
}
export const ServiceJobCapacityUsageSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    capacityUnit: S.optional(S.String),
    quantity: S.optional(S.Number),
  }),
).annotate({
  identifier: "ServiceJobCapacityUsageSummary",
}) as any as S.Schema<ServiceJobCapacityUsageSummary>;
export type ServiceJobCapacityUsageSummaryList =
  ServiceJobCapacityUsageSummary[];
export const ServiceJobCapacityUsageSummaryList = /*@__PURE__*/ S.Array(
  ServiceJobCapacityUsageSummary,
);
export interface ServiceJobSummary {
  latestAttempt?: LatestServiceJobAttempt;
  capacityUsage?: ServiceJobCapacityUsageSummary[];
  createdAt?: number;
  jobArn?: string;
  jobId?: string;
  jobName?: string;
  scheduledAt?: number;
  serviceJobType?: ServiceJobType;
  shareIdentifier?: string;
  quotaShareName?: string;
  status?: ServiceJobStatus;
  statusReason?: string;
  startedAt?: number;
  stoppedAt?: number;
}
export const ServiceJobSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    latestAttempt: S.optional(LatestServiceJobAttempt),
    capacityUsage: S.optional(ServiceJobCapacityUsageSummaryList),
    createdAt: S.optional(S.Number),
    jobArn: S.optional(S.String),
    jobId: S.optional(S.String),
    jobName: S.optional(S.String),
    scheduledAt: S.optional(S.Number),
    serviceJobType: S.optional(ServiceJobType),
    shareIdentifier: S.optional(S.String),
    quotaShareName: S.optional(S.String),
    status: S.optional(ServiceJobStatus),
    statusReason: S.optional(S.String),
    startedAt: S.optional(S.Number),
    stoppedAt: S.optional(S.Number),
  }),
).annotate({
  identifier: "ServiceJobSummary",
}) as any as S.Schema<ServiceJobSummary>;
export type ServiceJobSummaryList = ServiceJobSummary[];
export const ServiceJobSummaryList = /*@__PURE__*/ S.Array(ServiceJobSummary);
export interface ListServiceJobsResponse {
  jobSummaryList: (ServiceJobSummary & {
    jobId: string;
    jobName: string;
    serviceJobType: ServiceJobType;
    latestAttempt: LatestServiceJobAttempt & {
      serviceResourceId: ServiceResourceId & {
        name: ServiceResourceIdName;
        value: string;
      };
    };
  })[];
  nextToken?: string;
}
export const ListServiceJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobSummaryList: S.optional(ServiceJobSummaryList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListServiceJobsResponse",
}) as any as S.Schema<ListServiceJobsResponse>;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/v1/tags/{resourceArn}" }),
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
  S.Struct({ tags: S.optional(TagrisTagsMap) }).pipe(ns),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export type JobDefinitionType = "container" | "multinode" | (string & {});
export const JobDefinitionType = S.String;

export interface RegisterJobDefinitionRequest {
  jobDefinitionName?: string;
  type?: JobDefinitionType;
  parameters?: { [key: string]: string | undefined };
  schedulingPriority?: number;
  containerProperties?: ContainerProperties;
  nodeProperties?: NodeProperties;
  retryStrategy?: RetryStrategy;
  propagateTags?: boolean;
  timeout?: JobTimeout;
  tags?: { [key: string]: string | undefined };
  platformCapabilities?: PlatformCapability[];
  eksProperties?: EksProperties;
  ecsProperties?: EcsProperties;
  consumableResourceProperties?: ConsumableResourceProperties;
}
export const RegisterJobDefinitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobDefinitionName: S.optional(S.String),
    type: S.optional(JobDefinitionType),
    parameters: S.optional(ParametersMap),
    schedulingPriority: S.optional(S.Number),
    containerProperties: S.optional(ContainerProperties),
    nodeProperties: S.optional(NodeProperties),
    retryStrategy: S.optional(RetryStrategy),
    propagateTags: S.optional(S.Boolean),
    timeout: S.optional(JobTimeout),
    tags: S.optional(TagrisTagsMap),
    platformCapabilities: S.optional(PlatformCapabilityList),
    eksProperties: S.optional(EksProperties),
    ecsProperties: S.optional(EcsProperties),
    consumableResourceProperties: S.optional(ConsumableResourceProperties),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/registerjobdefinition" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RegisterJobDefinitionRequest",
}) as any as S.Schema<RegisterJobDefinitionRequest>;
export interface RegisterJobDefinitionResponse {
  jobDefinitionName: string;
  jobDefinitionArn: string;
  revision: number;
}
export const RegisterJobDefinitionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobDefinitionName: S.optional(S.String),
    jobDefinitionArn: S.optional(S.String),
    revision: S.optional(S.Number),
  }).pipe(ns),
).annotate({
  identifier: "RegisterJobDefinitionResponse",
}) as any as S.Schema<RegisterJobDefinitionResponse>;
export interface ArrayProperties {
  size?: number;
}
export const ArrayProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ size: S.optional(S.Number) }),
).annotate({
  identifier: "ArrayProperties",
}) as any as S.Schema<ArrayProperties>;
export interface ContainerOverrides {
  vcpus?: number;
  memory?: number;
  command?: string[];
  instanceType?: string;
  environment?: KeyValuePair[];
  resourceRequirements?: ResourceRequirement[];
}
export const ContainerOverrides = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vcpus: S.optional(S.Number),
    memory: S.optional(S.Number),
    command: S.optional(StringList),
    instanceType: S.optional(S.String),
    environment: S.optional(EnvironmentVariables),
    resourceRequirements: S.optional(ResourceRequirements),
  }),
).annotate({
  identifier: "ContainerOverrides",
}) as any as S.Schema<ContainerOverrides>;
export interface TaskContainerOverrides {
  command?: string[];
  environment?: KeyValuePair[];
  name?: string;
  resourceRequirements?: ResourceRequirement[];
}
export const TaskContainerOverrides = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    command: S.optional(StringList),
    environment: S.optional(EnvironmentVariables),
    name: S.optional(S.String),
    resourceRequirements: S.optional(ResourceRequirements),
  }),
).annotate({
  identifier: "TaskContainerOverrides",
}) as any as S.Schema<TaskContainerOverrides>;
export type ListTaskContainerOverrides = TaskContainerOverrides[];
export const ListTaskContainerOverrides = /*@__PURE__*/ S.Array(
  TaskContainerOverrides,
);
export interface TaskPropertiesOverride {
  containers?: TaskContainerOverrides[];
}
export const TaskPropertiesOverride = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ containers: S.optional(ListTaskContainerOverrides) }),
).annotate({
  identifier: "TaskPropertiesOverride",
}) as any as S.Schema<TaskPropertiesOverride>;
export type ListTaskPropertiesOverride = TaskPropertiesOverride[];
export const ListTaskPropertiesOverride = /*@__PURE__*/ S.Array(
  TaskPropertiesOverride,
);
export interface EcsPropertiesOverride {
  taskProperties?: TaskPropertiesOverride[];
}
export const EcsPropertiesOverride = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ taskProperties: S.optional(ListTaskPropertiesOverride) }),
).annotate({
  identifier: "EcsPropertiesOverride",
}) as any as S.Schema<EcsPropertiesOverride>;
export interface EksContainerOverride {
  name?: string;
  image?: string;
  command?: string[];
  args?: string[];
  env?: EksContainerEnvironmentVariable[];
  resources?: EksContainerResourceRequirements;
}
export const EksContainerOverride = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    image: S.optional(S.String),
    command: S.optional(StringList),
    args: S.optional(StringList),
    env: S.optional(EksContainerEnvironmentVariables),
    resources: S.optional(EksContainerResourceRequirements),
  }),
).annotate({
  identifier: "EksContainerOverride",
}) as any as S.Schema<EksContainerOverride>;
export type EksContainerOverrideList = EksContainerOverride[];
export const EksContainerOverrideList =
  /*@__PURE__*/ S.Array(EksContainerOverride);
export interface EksPodPropertiesOverride {
  containers?: EksContainerOverride[];
  initContainers?: EksContainerOverride[];
  metadata?: EksMetadata;
}
export const EksPodPropertiesOverride = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    containers: S.optional(EksContainerOverrideList),
    initContainers: S.optional(EksContainerOverrideList),
    metadata: S.optional(EksMetadata),
  }),
).annotate({
  identifier: "EksPodPropertiesOverride",
}) as any as S.Schema<EksPodPropertiesOverride>;
export interface EksPropertiesOverride {
  podProperties?: EksPodPropertiesOverride;
}
export const EksPropertiesOverride = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ podProperties: S.optional(EksPodPropertiesOverride) }),
).annotate({
  identifier: "EksPropertiesOverride",
}) as any as S.Schema<EksPropertiesOverride>;
export interface NodePropertyOverride {
  targetNodes?: string;
  containerOverrides?: ContainerOverrides;
  ecsPropertiesOverride?: EcsPropertiesOverride;
  instanceTypes?: string[];
  eksPropertiesOverride?: EksPropertiesOverride;
  consumableResourcePropertiesOverride?: ConsumableResourceProperties;
}
export const NodePropertyOverride = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    targetNodes: S.optional(S.String),
    containerOverrides: S.optional(ContainerOverrides),
    ecsPropertiesOverride: S.optional(EcsPropertiesOverride),
    instanceTypes: S.optional(StringList),
    eksPropertiesOverride: S.optional(EksPropertiesOverride),
    consumableResourcePropertiesOverride: S.optional(
      ConsumableResourceProperties,
    ),
  }),
).annotate({
  identifier: "NodePropertyOverride",
}) as any as S.Schema<NodePropertyOverride>;
export type NodePropertyOverrides = NodePropertyOverride[];
export const NodePropertyOverrides =
  /*@__PURE__*/ S.Array(NodePropertyOverride);
export interface NodeOverrides {
  numNodes?: number;
  nodePropertyOverrides?: NodePropertyOverride[];
}
export const NodeOverrides = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    numNodes: S.optional(S.Number),
    nodePropertyOverrides: S.optional(NodePropertyOverrides),
  }),
).annotate({ identifier: "NodeOverrides" }) as any as S.Schema<NodeOverrides>;
export interface SubmitJobRequest {
  jobName?: string;
  jobQueue?: string;
  shareIdentifier?: string;
  schedulingPriorityOverride?: number;
  arrayProperties?: ArrayProperties;
  dependsOn?: JobDependency[];
  jobDefinition?: string;
  parameters?: { [key: string]: string | undefined };
  containerOverrides?: ContainerOverrides;
  nodeOverrides?: NodeOverrides;
  retryStrategy?: RetryStrategy;
  propagateTags?: boolean;
  timeout?: JobTimeout;
  tags?: { [key: string]: string | undefined };
  eksPropertiesOverride?: EksPropertiesOverride;
  ecsPropertiesOverride?: EcsPropertiesOverride;
  consumableResourcePropertiesOverride?: ConsumableResourceProperties;
}
export const SubmitJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobName: S.optional(S.String),
    jobQueue: S.optional(S.String),
    shareIdentifier: S.optional(S.String),
    schedulingPriorityOverride: S.optional(S.Number),
    arrayProperties: S.optional(ArrayProperties),
    dependsOn: S.optional(JobDependencyList),
    jobDefinition: S.optional(S.String),
    parameters: S.optional(ParametersMap),
    containerOverrides: S.optional(ContainerOverrides),
    nodeOverrides: S.optional(NodeOverrides),
    retryStrategy: S.optional(RetryStrategy),
    propagateTags: S.optional(S.Boolean),
    timeout: S.optional(JobTimeout),
    tags: S.optional(TagrisTagsMap),
    eksPropertiesOverride: S.optional(EksPropertiesOverride),
    ecsPropertiesOverride: S.optional(EcsPropertiesOverride),
    consumableResourcePropertiesOverride: S.optional(
      ConsumableResourceProperties,
    ),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/submitjob" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SubmitJobRequest",
}) as any as S.Schema<SubmitJobRequest>;
export interface SubmitJobResponse {
  jobArn?: string;
  jobName: string;
  jobId: string;
}
export const SubmitJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobArn: S.optional(S.String),
    jobName: S.optional(S.String),
    jobId: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "SubmitJobResponse",
}) as any as S.Schema<SubmitJobResponse>;
export type ClientRequestToken = string;
export interface SubmitServiceJobRequest {
  jobName?: string;
  jobQueue?: string;
  retryStrategy?: ServiceJobRetryStrategy;
  schedulingPriority?: number;
  serviceRequestPayload?: string;
  serviceJobType?: ServiceJobType;
  shareIdentifier?: string;
  quotaShareName?: string;
  preemptionConfiguration?: ServiceJobPreemptionConfiguration;
  timeoutConfig?: ServiceJobTimeout;
  tags?: { [key: string]: string | undefined };
  clientToken?: string;
}
export const SubmitServiceJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobName: S.optional(S.String),
    jobQueue: S.optional(S.String),
    retryStrategy: S.optional(ServiceJobRetryStrategy),
    schedulingPriority: S.optional(S.Number),
    serviceRequestPayload: S.optional(S.String),
    serviceJobType: S.optional(ServiceJobType),
    shareIdentifier: S.optional(S.String),
    quotaShareName: S.optional(S.String),
    preemptionConfiguration: S.optional(ServiceJobPreemptionConfiguration),
    timeoutConfig: S.optional(ServiceJobTimeout),
    tags: S.optional(TagrisTagsMap),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/submitservicejob" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SubmitServiceJobRequest",
}) as any as S.Schema<SubmitServiceJobRequest>;
export interface SubmitServiceJobResponse {
  jobArn?: string;
  jobName: string;
  jobId: string;
}
export const SubmitServiceJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobArn: S.optional(S.String),
    jobName: S.optional(S.String),
    jobId: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "SubmitServiceJobResponse",
}) as any as S.Schema<SubmitServiceJobResponse>;
export interface TagResourceRequest {
  resourceArn: string;
  tags?: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tags: S.optional(TagrisTagsMap),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/tags/{resourceArn}" }),
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
export interface TerminateJobRequest {
  jobId?: string;
  reason?: string;
}
export const TerminateJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobId: S.optional(S.String), reason: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/terminatejob" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "TerminateJobRequest",
}) as any as S.Schema<TerminateJobRequest>;
export interface TerminateJobResponse {}
export const TerminateJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "TerminateJobResponse",
}) as any as S.Schema<TerminateJobResponse>;
export interface TerminateServiceJobRequest {
  jobId?: string;
  reason?: string;
}
export const TerminateServiceJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobId: S.optional(S.String), reason: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/terminateservicejob" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "TerminateServiceJobRequest",
}) as any as S.Schema<TerminateServiceJobRequest>;
export interface TerminateServiceJobResponse {}
export const TerminateServiceJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "TerminateServiceJobResponse",
}) as any as S.Schema<TerminateServiceJobResponse>;
export type TagKeysList = string[];
export const TagKeysList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys?: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tagKeys: S.optional(TagKeysList).pipe(T.HttpQuery("tagKeys")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "DELETE", uri: "/v1/tags/{resourceArn}" }),
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
export type CRUpdateAllocationStrategy =
  | "BEST_FIT_PROGRESSIVE"
  | "BEST_FIT_PROGRESSIVE_ORDERED"
  | "SPOT_CAPACITY_OPTIMIZED"
  | "SPOT_PRICE_CAPACITY_OPTIMIZED"
  | "SPOT_CAPACITY_OPTIMIZED_PRIORITIZED"
  | (string & {});
export const CRUpdateAllocationStrategy = S.String;

export interface InstanceLaunchTemplateUpdate {
  ec2InstanceProfileArn?: string;
  networkConfiguration?: ManagedInstancesNetworkConfiguration;
  instanceRequirements?: InstanceRequirementsRequest;
  storageConfiguration?: ManagedInstancesStorageConfiguration;
  monitoring?: string;
  capacityReservations?: CapacityReservationRequest;
  instanceMetadataTagsPropagation?: boolean;
  localStorageConfiguration?: ManagedInstancesLocalStorageConfiguration;
}
export const InstanceLaunchTemplateUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ec2InstanceProfileArn: S.optional(S.String),
    networkConfiguration: S.optional(ManagedInstancesNetworkConfiguration),
    instanceRequirements: S.optional(InstanceRequirementsRequest),
    storageConfiguration: S.optional(ManagedInstancesStorageConfiguration),
    monitoring: S.optional(S.String),
    capacityReservations: S.optional(CapacityReservationRequest),
    instanceMetadataTagsPropagation: S.optional(S.Boolean),
    localStorageConfiguration: S.optional(
      ManagedInstancesLocalStorageConfiguration,
    ),
  }),
).annotate({
  identifier: "InstanceLaunchTemplateUpdate",
}) as any as S.Schema<InstanceLaunchTemplateUpdate>;
export interface UpdateManagedInstancesProviderConfiguration {
  propagateTags?: string;
  infrastructureRoleArn?: string;
  instanceLaunchTemplate?: InstanceLaunchTemplateUpdate;
  infrastructureOptimization?: InfrastructureOptimization;
}
export const UpdateManagedInstancesProviderConfiguration =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      propagateTags: S.optional(S.String),
      infrastructureRoleArn: S.optional(S.String),
      instanceLaunchTemplate: S.optional(InstanceLaunchTemplateUpdate),
      infrastructureOptimization: S.optional(InfrastructureOptimization),
    }),
  ).annotate({
    identifier: "UpdateManagedInstancesProviderConfiguration",
  }) as any as S.Schema<UpdateManagedInstancesProviderConfiguration>;
export interface ComputeResourceUpdate {
  minvCpus?: number;
  maxvCpus?: number;
  desiredvCpus?: number;
  subnets?: string[];
  securityGroupIds?: string[];
  allocationStrategy?: CRUpdateAllocationStrategy;
  instanceTypes?: string[];
  ec2KeyPair?: string;
  instanceRole?: string;
  tags?: { [key: string]: string | undefined };
  placementGroup?: string;
  bidPercentage?: number;
  launchTemplate?: LaunchTemplateSpecification;
  ec2Configuration?: Ec2Configuration[];
  updateToLatestImageVersion?: boolean;
  type?: CRType;
  imageId?: string;
  scalingPolicy?: ComputeScalingPolicy;
  managedInstancesProvider?: UpdateManagedInstancesProviderConfiguration;
  capacityTags?: { [key: string]: string | undefined };
}
export const ComputeResourceUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    minvCpus: S.optional(S.Number),
    maxvCpus: S.optional(S.Number),
    desiredvCpus: S.optional(S.Number),
    subnets: S.optional(StringList),
    securityGroupIds: S.optional(StringList),
    allocationStrategy: S.optional(CRUpdateAllocationStrategy),
    instanceTypes: S.optional(StringList),
    ec2KeyPair: S.optional(S.String),
    instanceRole: S.optional(S.String),
    tags: S.optional(TagsMap),
    placementGroup: S.optional(S.String),
    bidPercentage: S.optional(S.Number),
    launchTemplate: S.optional(LaunchTemplateSpecification),
    ec2Configuration: S.optional(Ec2ConfigurationList),
    updateToLatestImageVersion: S.optional(S.Boolean),
    type: S.optional(CRType),
    imageId: S.optional(S.String),
    scalingPolicy: S.optional(ComputeScalingPolicy),
    managedInstancesProvider: S.optional(
      UpdateManagedInstancesProviderConfiguration,
    ),
    capacityTags: S.optional(TagrisTagsMap),
  }),
).annotate({
  identifier: "ComputeResourceUpdate",
}) as any as S.Schema<ComputeResourceUpdate>;
export interface UpdateComputeEnvironmentRequest {
  computeEnvironment?: string;
  state?: CEState;
  unmanagedvCpus?: number;
  computeResources?: ComputeResourceUpdate;
  serviceRole?: string;
  updatePolicy?: UpdatePolicy;
  context?: string;
  ecsSettings?: EcsSettings;
}
export const UpdateComputeEnvironmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    computeEnvironment: S.optional(S.String),
    state: S.optional(CEState),
    unmanagedvCpus: S.optional(S.Number),
    computeResources: S.optional(ComputeResourceUpdate),
    serviceRole: S.optional(S.String),
    updatePolicy: S.optional(UpdatePolicy),
    context: S.optional(S.String),
    ecsSettings: S.optional(EcsSettings),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/updatecomputeenvironment" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateComputeEnvironmentRequest",
}) as any as S.Schema<UpdateComputeEnvironmentRequest>;
export interface UpdateComputeEnvironmentResponse {
  computeEnvironmentName?: string;
  computeEnvironmentArn?: string;
}
export const UpdateComputeEnvironmentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    computeEnvironmentName: S.optional(S.String),
    computeEnvironmentArn: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "UpdateComputeEnvironmentResponse",
}) as any as S.Schema<UpdateComputeEnvironmentResponse>;
export interface UpdateConsumableResourceRequest {
  consumableResource?: string;
  operation?: string;
  quantity?: number;
  clientToken?: string;
}
export const UpdateConsumableResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    consumableResource: S.optional(S.String),
    operation: S.optional(S.String),
    quantity: S.optional(S.Number),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/updateconsumableresource" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateConsumableResourceRequest",
}) as any as S.Schema<UpdateConsumableResourceRequest>;
export interface UpdateConsumableResourceResponse {
  consumableResourceName: string;
  consumableResourceArn: string;
  totalQuantity?: number;
}
export const UpdateConsumableResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    consumableResourceName: S.optional(S.String),
    consumableResourceArn: S.optional(S.String),
    totalQuantity: S.optional(S.Number),
  }).pipe(ns),
).annotate({
  identifier: "UpdateConsumableResourceResponse",
}) as any as S.Schema<UpdateConsumableResourceResponse>;
export interface UpdateJobQueueRequest {
  jobQueue?: string;
  state?: JQState;
  schedulingPolicyArn?: string;
  priority?: number;
  computeEnvironmentOrder?: ComputeEnvironmentOrder[];
  serviceEnvironmentOrder?: ServiceEnvironmentOrder[];
  jobStateTimeLimitActions?: JobStateTimeLimitAction[];
}
export const UpdateJobQueueRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobQueue: S.optional(S.String),
    state: S.optional(JQState),
    schedulingPolicyArn: S.optional(S.String),
    priority: S.optional(S.Number),
    computeEnvironmentOrder: S.optional(ComputeEnvironmentOrders),
    serviceEnvironmentOrder: S.optional(ServiceEnvironmentOrders),
    jobStateTimeLimitActions: S.optional(JobStateTimeLimitActions),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/updatejobqueue" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateJobQueueRequest",
}) as any as S.Schema<UpdateJobQueueRequest>;
export interface UpdateJobQueueResponse {
  jobQueueName?: string;
  jobQueueArn?: string;
}
export const UpdateJobQueueResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobQueueName: S.optional(S.String),
    jobQueueArn: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "UpdateJobQueueResponse",
}) as any as S.Schema<UpdateJobQueueResponse>;
export interface UpdateQuotaShareRequest {
  quotaShareArn?: string;
  capacityLimits?: QuotaShareCapacityLimit[];
  resourceSharingConfiguration?: QuotaShareResourceSharingConfiguration;
  preemptionConfiguration?: QuotaSharePreemptionConfiguration;
  state?: QuotaShareState;
}
export const UpdateQuotaShareRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    quotaShareArn: S.optional(S.String),
    capacityLimits: S.optional(QuotaShareCapacityLimits),
    resourceSharingConfiguration: S.optional(
      QuotaShareResourceSharingConfiguration,
    ),
    preemptionConfiguration: S.optional(QuotaSharePreemptionConfiguration),
    state: S.optional(QuotaShareState),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/updatequotashare" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateQuotaShareRequest",
}) as any as S.Schema<UpdateQuotaShareRequest>;
export interface UpdateQuotaShareResponse {
  quotaShareName?: string;
  quotaShareArn?: string;
}
export const UpdateQuotaShareResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    quotaShareName: S.optional(S.String),
    quotaShareArn: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "UpdateQuotaShareResponse",
}) as any as S.Schema<UpdateQuotaShareResponse>;
export interface UpdateSchedulingPolicyRequest {
  arn?: string;
  quotaSharePolicy?: QuotaSharePolicy;
  fairsharePolicy?: FairsharePolicy;
}
export const UpdateSchedulingPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    quotaSharePolicy: S.optional(QuotaSharePolicy),
    fairsharePolicy: S.optional(FairsharePolicy),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/updateschedulingpolicy" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateSchedulingPolicyRequest",
}) as any as S.Schema<UpdateSchedulingPolicyRequest>;
export interface UpdateSchedulingPolicyResponse {}
export const UpdateSchedulingPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateSchedulingPolicyResponse",
}) as any as S.Schema<UpdateSchedulingPolicyResponse>;
export interface UpdateServiceEnvironmentRequest {
  serviceEnvironment?: string;
  state?: ServiceEnvironmentState;
  capacityLimits?: CapacityLimit[];
}
export const UpdateServiceEnvironmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceEnvironment: S.optional(S.String),
    state: S.optional(ServiceEnvironmentState),
    capacityLimits: S.optional(CapacityLimits),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/updateserviceenvironment" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateServiceEnvironmentRequest",
}) as any as S.Schema<UpdateServiceEnvironmentRequest>;
export interface UpdateServiceEnvironmentResponse {
  serviceEnvironmentName: string;
  serviceEnvironmentArn: string;
}
export const UpdateServiceEnvironmentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceEnvironmentName: S.optional(S.String),
    serviceEnvironmentArn: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "UpdateServiceEnvironmentResponse",
}) as any as S.Schema<UpdateServiceEnvironmentResponse>;
export interface UpdateServiceJobRequest {
  jobId?: string;
  schedulingPriority?: number;
}
export const UpdateServiceJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobId: S.optional(S.String),
    schedulingPriority: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/updateservicejob" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateServiceJobRequest",
}) as any as S.Schema<UpdateServiceJobRequest>;
export interface UpdateServiceJobResponse {
  jobArn?: string;
  jobName?: string;
  jobId?: string;
}
export const UpdateServiceJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobArn: S.optional(S.String),
    jobName: S.optional(S.String),
    jobId: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "UpdateServiceJobResponse",
}) as any as S.Schema<UpdateServiceJobResponse>;
export type CancelJobError = ClientException | ServerException | CommonErrors;
/**
 * Cancels a job in an Batch job queue. Jobs that are in a `SUBMITTED`, `PENDING`, or `RUNNABLE` state are cancelled and the job status is updated to `FAILED`.
 *
 * A `PENDING` job is canceled after all dependency jobs are completed.
 * Therefore, it may take longer than expected to cancel a job in `PENDING`
 * status.
 *
 * When you try to cancel an array parent job in `PENDING`, Batch attempts to
 * cancel all child jobs. The array parent job is canceled when all child jobs are
 * completed.
 *
 * Jobs that progressed to the `STARTING` or
 * `RUNNING` state aren't canceled. However, the API operation still succeeds, even
 * if no job is canceled. These jobs must be terminated with the TerminateJob
 * operation.
 */
export const cancelJob: API.OperationMethod<
  CancelJobRequest,
  CancelJobResponse,
  CancelJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelJobRequest,
  output: CancelJobResponse,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelJob",
}));

export type CreateComputeEnvironmentError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * Creates an Batch compute environment. You can create `MANAGED` or
 * `UNMANAGED` compute environments. `MANAGED` compute environments can
 * use Amazon EC2 or Fargate resources. `UNMANAGED` compute environments can only use
 * EC2 resources.
 *
 * In a managed compute environment, Batch manages the capacity and instance types of the
 * compute resources within the environment. This is based on the compute resource specification
 * that you define or the launch template that you
 * specify when you create the compute environment. Either, you can choose to use EC2 On-Demand
 * Instances and EC2 Spot Instances. Or, you can use Fargate and Fargate Spot capacity in
 * your managed compute environment. You can optionally set a maximum price so that Spot
 * Instances only launch when the Spot Instance price is less than a specified percentage of the
 * On-Demand price.
 *
 * In an unmanaged compute environment, you can manage your own EC2 compute resources and
 * have flexibility with how you configure your compute resources. For example, you can use
 * custom AMIs. However, you must verify that each of your AMIs meet the Amazon ECS container instance
 * AMI specification. For more information, see container instance AMIs in the
 * *Amazon Elastic Container Service Developer Guide*. After you created your unmanaged compute environment,
 * you can use the DescribeComputeEnvironments operation to find the Amazon ECS
 * cluster that's associated with it. Then, launch your container instances into that Amazon ECS
 * cluster. For more information, see Launching an Amazon ECS container
 * instance in the *Amazon Elastic Container Service Developer Guide*.
 *
 * Batch doesn't automatically upgrade the AMIs in a compute environment after it's
 * created. For more information on how to update a compute environment's AMI, see Updating compute environments in the *Batch User Guide*.
 */
export const createComputeEnvironment: API.OperationMethod<
  CreateComputeEnvironmentRequest,
  CreateComputeEnvironmentResponse,
  CreateComputeEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateComputeEnvironmentRequest,
  output: CreateComputeEnvironmentResponse,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateComputeEnvironment",
}));

export type CreateConsumableResourceError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * Creates an Batch consumable resource.
 */
export const createConsumableResource: API.OperationMethod<
  CreateConsumableResourceRequest,
  CreateConsumableResourceResponse,
  CreateConsumableResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateConsumableResourceRequest,
  output: CreateConsumableResourceResponse,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConsumableResource",
}));

export type CreateJobQueueError =
  | ClientException
  | ServerException
  | ComputeEnvironmentNotValid
  | JobQueueAlreadyExists
  | CommonErrors;
/**
 * Creates an Batch job queue. When you create a job queue, you associate one or more
 * compute environments to the queue and assign an order of preference for the compute
 * environments.
 *
 * You also set a priority to the job queue that determines the order that the Batch
 * scheduler places jobs onto its associated compute environments. For example, if a compute
 * environment is associated with more than one job queue, the job queue with a higher priority
 * is given preference for scheduling jobs to that compute environment.
 */
export const createJobQueue: API.OperationMethod<
  CreateJobQueueRequest,
  CreateJobQueueResponse,
  CreateJobQueueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateJobQueueRequest,
  output: CreateJobQueueResponse,
  errors: [
    ClientException,
    ServerException,
    ComputeEnvironmentNotValid,
    JobQueueAlreadyExists,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateJobQueue",
}));

export type CreateQuotaShareError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * Creates an Batch quota share. Each quota share operates as a virtual queue with a configured compute capacity, resource sharing strategy, and borrow limits.
 */
export const createQuotaShare: API.OperationMethod<
  CreateQuotaShareRequest,
  CreateQuotaShareResponse,
  CreateQuotaShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateQuotaShareRequest,
  output: CreateQuotaShareResponse,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateQuotaShare",
}));

export type CreateSchedulingPolicyError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * Creates an Batch scheduling policy.
 */
export const createSchedulingPolicy: API.OperationMethod<
  CreateSchedulingPolicyRequest,
  CreateSchedulingPolicyResponse,
  CreateSchedulingPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSchedulingPolicyRequest,
  output: CreateSchedulingPolicyResponse,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSchedulingPolicy",
}));

export type CreateServiceEnvironmentError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * Creates a service environment for running service jobs. Service environments define capacity limits for specific service types such as SageMaker Training jobs.
 */
export const createServiceEnvironment: API.OperationMethod<
  CreateServiceEnvironmentRequest,
  CreateServiceEnvironmentResponse,
  CreateServiceEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateServiceEnvironmentRequest,
  output: CreateServiceEnvironmentResponse,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateServiceEnvironment",
}));

export type DeleteComputeEnvironmentError =
  | ClientException
  | ServerException
  | ComputeEnvironmentNotFound
  | ComputeEnvironmentInUse
  | ComputeEnvironmentBeingModified
  | CommonErrors;
/**
 * Deletes an Batch compute environment.
 *
 * Before you can delete a compute environment, you must set its state to
 * `DISABLED` with the UpdateComputeEnvironment API operation and
 * disassociate it from any job queues with the UpdateJobQueue API operation.
 * Compute environments that use Fargate resources must terminate all active jobs on that
 * compute environment before deleting the compute environment. If this isn't done, the compute
 * environment enters an invalid state.
 */
export const deleteComputeEnvironment: API.OperationMethod<
  DeleteComputeEnvironmentRequest,
  DeleteComputeEnvironmentResponse,
  DeleteComputeEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteComputeEnvironmentRequest,
  output: DeleteComputeEnvironmentResponse,
  errors: [
    ClientException,
    ServerException,
    ComputeEnvironmentNotFound,
    ComputeEnvironmentInUse,
    ComputeEnvironmentBeingModified,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteComputeEnvironment",
}));

export type DeleteConsumableResourceError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * Deletes the specified consumable resource.
 */
export const deleteConsumableResource: API.OperationMethod<
  DeleteConsumableResourceRequest,
  DeleteConsumableResourceResponse,
  DeleteConsumableResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteConsumableResourceRequest,
  output: DeleteConsumableResourceResponse,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConsumableResource",
}));

export type DeleteJobQueueError =
  | ClientException
  | ServerException
  | JobQueueNotFound
  | JobQueueBeingModified
  | CommonErrors;
/**
 * Deletes the specified job queue. You must first disable submissions for a queue with the
 * UpdateJobQueue operation. All jobs in the queue are eventually terminated
 * when you delete a job queue.
 *
 * It's not necessary to disassociate compute environments from a queue before submitting a
 * `DeleteJobQueue` request.
 */
export const deleteJobQueue: API.OperationMethod<
  DeleteJobQueueRequest,
  DeleteJobQueueResponse,
  DeleteJobQueueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteJobQueueRequest,
  output: DeleteJobQueueResponse,
  errors: [
    ClientException,
    ServerException,
    JobQueueNotFound,
    JobQueueBeingModified,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteJobQueue",
}));

export type DeleteQuotaShareError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * Deletes the specified quota share. You must first disable submissions for the share by
 * updating the state to `DISABLED` using the UpdateQuotaShare operation.
 * All jobs in the share are eventually terminated when you delete a quota share.
 */
export const deleteQuotaShare: API.OperationMethod<
  DeleteQuotaShareRequest,
  DeleteQuotaShareResponse,
  DeleteQuotaShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteQuotaShareRequest,
  output: DeleteQuotaShareResponse,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteQuotaShare",
}));

export type DeleteSchedulingPolicyError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * Deletes the specified scheduling policy.
 *
 * You can't delete a scheduling policy that's used in any job queues.
 */
export const deleteSchedulingPolicy: API.OperationMethod<
  DeleteSchedulingPolicyRequest,
  DeleteSchedulingPolicyResponse,
  DeleteSchedulingPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSchedulingPolicyRequest,
  output: DeleteSchedulingPolicyResponse,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSchedulingPolicy",
}));

export type DeleteServiceEnvironmentError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * Deletes a Service environment. Before you can delete a service environment, you must first set its state to `DISABLED` with the `UpdateServiceEnvironment` API operation and disassociate it from any job queues with the `UpdateJobQueue` API operation.
 */
export const deleteServiceEnvironment: API.OperationMethod<
  DeleteServiceEnvironmentRequest,
  DeleteServiceEnvironmentResponse,
  DeleteServiceEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteServiceEnvironmentRequest,
  output: DeleteServiceEnvironmentResponse,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteServiceEnvironment",
}));

export type DeregisterJobDefinitionError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * Deregisters an Batch job definition. Job definitions are permanently deleted after 180
 * days.
 */
export const deregisterJobDefinition: API.OperationMethod<
  DeregisterJobDefinitionRequest,
  DeregisterJobDefinitionResponse,
  DeregisterJobDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeregisterJobDefinitionRequest,
  output: DeregisterJobDefinitionResponse,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterJobDefinition",
}));

export type DescribeComputeEnvironmentsError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * Describes one or more of your compute environments.
 *
 * If you're using an unmanaged compute environment, you can use the
 * `DescribeComputeEnvironment` operation to determine the
 * `ecsClusterArn` that you launch your Amazon ECS container instances into.
 */
export const describeComputeEnvironments: API.PaginatedOperationMethod<
  DescribeComputeEnvironmentsRequest,
  DescribeComputeEnvironmentsResponse,
  DescribeComputeEnvironmentsError,
  Credentials | HttpClient.HttpClient,
  ComputeEnvironmentDetail
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeComputeEnvironmentsRequest,
  output: DescribeComputeEnvironmentsResponse,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeComputeEnvironments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "computeEnvironments",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeConsumableResourceError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * Returns a description of the specified consumable resource.
 */
export const describeConsumableResource: API.OperationMethod<
  DescribeConsumableResourceRequest,
  DescribeConsumableResourceResponse,
  DescribeConsumableResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeConsumableResourceRequest,
  output: DescribeConsumableResourceResponse,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConsumableResource",
}));

export type DescribeJobDefinitionsError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * Describes a list of job definitions. You can specify a `status` (such as
 * `ACTIVE`) to only return job definitions that match that status.
 */
export const describeJobDefinitions: API.PaginatedOperationMethod<
  DescribeJobDefinitionsRequest,
  DescribeJobDefinitionsResponse,
  DescribeJobDefinitionsError,
  Credentials | HttpClient.HttpClient,
  JobDefinition
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeJobDefinitionsRequest,
  output: DescribeJobDefinitionsResponse,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeJobDefinitions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "jobDefinitions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeJobQueuesError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * Describes one or more of your job queues.
 */
export const describeJobQueues: API.PaginatedOperationMethod<
  DescribeJobQueuesRequest,
  DescribeJobQueuesResponse,
  DescribeJobQueuesError,
  Credentials | HttpClient.HttpClient,
  JobQueueDetail
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeJobQueuesRequest,
  output: DescribeJobQueuesResponse,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeJobQueues",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "jobQueues",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeJobsError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * Describes a list of Batch jobs.
 */
export const describeJobs: API.OperationMethod<
  DescribeJobsRequest,
  DescribeJobsResponse,
  DescribeJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeJobsRequest,
  output: DescribeJobsResponse,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeJobs",
}));

export type DescribeQuotaShareError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * Returns a description of the specified quota share.
 */
export const describeQuotaShare: API.OperationMethod<
  DescribeQuotaShareRequest,
  DescribeQuotaShareResponse,
  DescribeQuotaShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeQuotaShareRequest,
  output: DescribeQuotaShareResponse,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeQuotaShare",
}));

export type DescribeSchedulingPoliciesError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * Describes one or more of your scheduling policies.
 */
export const describeSchedulingPolicies: API.OperationMethod<
  DescribeSchedulingPoliciesRequest,
  DescribeSchedulingPoliciesResponse,
  DescribeSchedulingPoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeSchedulingPoliciesRequest,
  output: DescribeSchedulingPoliciesResponse,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSchedulingPolicies",
}));

export type DescribeServiceEnvironmentsError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * Describes one or more of your service environments.
 */
export const describeServiceEnvironments: API.PaginatedOperationMethod<
  DescribeServiceEnvironmentsRequest,
  DescribeServiceEnvironmentsResponse,
  DescribeServiceEnvironmentsError,
  Credentials | HttpClient.HttpClient,
  ServiceEnvironmentDetail
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeServiceEnvironmentsRequest,
  output: DescribeServiceEnvironmentsResponse,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeServiceEnvironments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "serviceEnvironments",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeServiceJobError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * The details of a service job.
 */
export const describeServiceJob: API.OperationMethod<
  DescribeServiceJobRequest,
  DescribeServiceJobResponse,
  DescribeServiceJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeServiceJobRequest,
  output: DescribeServiceJobResponse,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeServiceJob",
}));

export type GetJobQueueSnapshotError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * Provides a snapshot of job queue state, including ordering of `RUNNABLE` jobs, as well as capacity utilization for already dispatched jobs.
 * The first 100 `RUNNABLE` jobs in the job queue are listed in order of dispatch. For job queues with an attached
 * quota-share policy, the first `RUNNABLE` job in each quota share is also listed. Capacity utilization for the job queue is provided, as well as
 * break downs by share for job queues with attached fair-share or quota-share scheduling policies.
 */
export const getJobQueueSnapshot: API.OperationMethod<
  GetJobQueueSnapshotRequest,
  GetJobQueueSnapshotResponse,
  GetJobQueueSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetJobQueueSnapshotRequest,
  output: GetJobQueueSnapshotResponse,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJobQueueSnapshot",
}));

export type ListConsumableResourcesError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * Returns a list of Batch consumable resources.
 */
export const listConsumableResources: API.PaginatedOperationMethod<
  ListConsumableResourcesRequest,
  ListConsumableResourcesResponse,
  ListConsumableResourcesError,
  Credentials | HttpClient.HttpClient,
  ConsumableResourceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListConsumableResourcesRequest,
  output: ListConsumableResourcesResponse,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConsumableResources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "consumableResources",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListJobsError = ClientException | ServerException | CommonErrors;
/**
 * Returns a list of Batch jobs.
 *
 * You must specify only one of the following items:
 *
 * - A job queue ID to return a list of jobs in that job queue
 *
 * - A multi-node parallel job ID to return a list of nodes for that job
 *
 * - An array job ID to return a list of the children for that job
 */
export const listJobs: API.PaginatedOperationMethod<
  ListJobsRequest,
  ListJobsResponse,
  ListJobsError,
  Credentials | HttpClient.HttpClient,
  JobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListJobsRequest,
  output: ListJobsResponse,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "jobSummaryList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListJobsByConsumableResourceError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * Returns a list of Batch jobs that require a specific consumable resource.
 */
export const listJobsByConsumableResource: API.PaginatedOperationMethod<
  ListJobsByConsumableResourceRequest,
  ListJobsByConsumableResourceResponse,
  ListJobsByConsumableResourceError,
  Credentials | HttpClient.HttpClient,
  ListJobsByConsumableResourceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListJobsByConsumableResourceRequest,
  output: ListJobsByConsumableResourceResponse,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListJobsByConsumableResource",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "jobs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListQuotaSharesError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * Returns a list of Batch quota shares associated with a job queue.
 */
export const listQuotaShares: API.PaginatedOperationMethod<
  ListQuotaSharesRequest,
  ListQuotaSharesResponse,
  ListQuotaSharesError,
  Credentials | HttpClient.HttpClient,
  QuotaShareDetail
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListQuotaSharesRequest,
  output: ListQuotaSharesResponse,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListQuotaShares",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "quotaShares",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSchedulingPoliciesError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * Returns a list of Batch scheduling policies.
 */
export const listSchedulingPolicies: API.PaginatedOperationMethod<
  ListSchedulingPoliciesRequest,
  ListSchedulingPoliciesResponse,
  ListSchedulingPoliciesError,
  Credentials | HttpClient.HttpClient,
  SchedulingPolicyListingDetail
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSchedulingPoliciesRequest,
  output: ListSchedulingPoliciesResponse,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSchedulingPolicies",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "schedulingPolicies",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListServiceJobsError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * Returns a list of service jobs for a specified job queue.
 */
export const listServiceJobs: API.PaginatedOperationMethod<
  ListServiceJobsRequest,
  ListServiceJobsResponse,
  ListServiceJobsError,
  Credentials | HttpClient.HttpClient,
  ServiceJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListServiceJobsRequest,
  output: ListServiceJobsResponse,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServiceJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "jobSummaryList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * Lists the tags for an Batch resource. Batch resources that support tags are compute environments, jobs, job definitions, job queues,
 * and scheduling policies. ARNs for child jobs of array and multi-node parallel (MNP) jobs aren't supported.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type RegisterJobDefinitionError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * Registers an Batch job definition.
 */
export const registerJobDefinition: API.OperationMethod<
  RegisterJobDefinitionRequest,
  RegisterJobDefinitionResponse,
  RegisterJobDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterJobDefinitionRequest,
  output: RegisterJobDefinitionResponse,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterJobDefinition",
}));

export type SubmitJobError = ClientException | ServerException | CommonErrors;
/**
 * Submits an Batch job from a job definition. Parameters that are specified during SubmitJob override parameters defined in the job definition. vCPU and memory
 * requirements that are specified in the `resourceRequirements` objects in the job
 * definition are the exception. They can't be overridden this way using the `memory`
 * and `vcpus` parameters. Rather, you must specify updates to job definition
 * parameters in a `resourceRequirements` object that's included in the
 * `containerOverrides` parameter.
 *
 * Job queues with a scheduling policy are limited to 500 active share identifiers at
 * a time.
 *
 * Jobs that run on Fargate resources can't be guaranteed to run for more than 14 days.
 * This is because, after 14 days, Fargate resources might become unavailable and job might be
 * terminated.
 */
export const submitJob: API.OperationMethod<
  SubmitJobRequest,
  SubmitJobResponse,
  SubmitJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SubmitJobRequest,
  output: SubmitJobResponse,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SubmitJob",
}));

export type SubmitServiceJobError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * Submits a service job to a specified job queue to run on SageMaker AI. A service job is a unit of work that you submit to Batch for execution on SageMaker AI.
 */
export const submitServiceJob: API.OperationMethod<
  SubmitServiceJobRequest,
  SubmitServiceJobResponse,
  SubmitServiceJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SubmitServiceJobRequest,
  output: SubmitServiceJobResponse,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SubmitServiceJob",
}));

export type TagResourceError = ClientException | ServerException | CommonErrors;
/**
 * Associates the specified tags to a resource with the specified `resourceArn`.
 * If existing tags on a resource aren't specified in the request parameters, they aren't
 * changed. When a resource is deleted, the tags that are associated with that resource are
 * deleted as well. Batch resources that support tags are compute environments, jobs, job definitions, job queues,
 * and scheduling policies. ARNs for child jobs of array and multi-node parallel (MNP) jobs aren't supported.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type TerminateJobError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * Terminates a job in a job queue. Jobs that are in the `STARTING` or
 * `RUNNING` state are terminated, which causes them to transition to
 * `FAILED`. Jobs that have not progressed to the `STARTING` state are
 * cancelled.
 */
export const terminateJob: API.OperationMethod<
  TerminateJobRequest,
  TerminateJobResponse,
  TerminateJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TerminateJobRequest,
  output: TerminateJobResponse,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TerminateJob",
}));

export type TerminateServiceJobError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * Terminates a service job in a job queue.
 */
export const terminateServiceJob: API.OperationMethod<
  TerminateServiceJobRequest,
  TerminateServiceJobResponse,
  TerminateServiceJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TerminateServiceJobRequest,
  output: TerminateServiceJobResponse,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TerminateServiceJob",
}));

export type UntagResourceError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * Deletes specified tags from an Batch resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateComputeEnvironmentError =
  | ClientException
  | ServerException
  | ComputeEnvironmentNotFound
  | ComputeEnvironmentBeingModified
  | CommonErrors;
/**
 * Updates an Batch compute environment.
 */
export const updateComputeEnvironment: API.OperationMethod<
  UpdateComputeEnvironmentRequest,
  UpdateComputeEnvironmentResponse,
  UpdateComputeEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateComputeEnvironmentRequest,
  output: UpdateComputeEnvironmentResponse,
  errors: [
    ClientException,
    ServerException,
    ComputeEnvironmentNotFound,
    ComputeEnvironmentBeingModified,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateComputeEnvironment",
}));

export type UpdateConsumableResourceError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * Updates a consumable resource.
 */
export const updateConsumableResource: API.OperationMethod<
  UpdateConsumableResourceRequest,
  UpdateConsumableResourceResponse,
  UpdateConsumableResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateConsumableResourceRequest,
  output: UpdateConsumableResourceResponse,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConsumableResource",
}));

export type UpdateJobQueueError =
  | ClientException
  | ServerException
  | JobQueueNotFound
  | JobQueueBeingModified
  | CommonErrors;
/**
 * Updates a job queue.
 */
export const updateJobQueue: API.OperationMethod<
  UpdateJobQueueRequest,
  UpdateJobQueueResponse,
  UpdateJobQueueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateJobQueueRequest,
  output: UpdateJobQueueResponse,
  errors: [
    ClientException,
    ServerException,
    JobQueueNotFound,
    JobQueueBeingModified,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateJobQueue",
}));

export type UpdateQuotaShareError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * Updates a quota share.
 */
export const updateQuotaShare: API.OperationMethod<
  UpdateQuotaShareRequest,
  UpdateQuotaShareResponse,
  UpdateQuotaShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateQuotaShareRequest,
  output: UpdateQuotaShareResponse,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateQuotaShare",
}));

export type UpdateSchedulingPolicyError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * Updates a scheduling policy.
 */
export const updateSchedulingPolicy: API.OperationMethod<
  UpdateSchedulingPolicyRequest,
  UpdateSchedulingPolicyResponse,
  UpdateSchedulingPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSchedulingPolicyRequest,
  output: UpdateSchedulingPolicyResponse,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSchedulingPolicy",
}));

export type UpdateServiceEnvironmentError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * Updates a service environment. You can update the state of a service environment from `ENABLED` to `DISABLED` to prevent new service jobs from being placed in the service environment.
 */
export const updateServiceEnvironment: API.OperationMethod<
  UpdateServiceEnvironmentRequest,
  UpdateServiceEnvironmentResponse,
  UpdateServiceEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateServiceEnvironmentRequest,
  output: UpdateServiceEnvironmentResponse,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateServiceEnvironment",
}));

export type UpdateServiceJobError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * Updates the priority of a specified service job in an Batch job queue.
 */
export const updateServiceJob: API.OperationMethod<
  UpdateServiceJobRequest,
  UpdateServiceJobResponse,
  UpdateServiceJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateServiceJobRequest,
  output: UpdateServiceJobResponse,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateServiceJob",
}));
