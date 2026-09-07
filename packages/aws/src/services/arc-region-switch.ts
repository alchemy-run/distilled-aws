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
  sdkId: "ARC Region switch",
  serviceShapeName: "ArcRegionSwitch",
});
const auth = T.AwsAuthSigv4({ name: "arc-region-switch" });
const ver = T.ServiceVersion("2022-07-26");
const proto = T.AwsProtocolsAwsJson1_0();
const rules = T.EndpointResolver((p, _) => {
  const { UseFIPS = false, Endpoint, Region, UseControlPlaneEndpoint } = p;
  const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
    type: "endpoint" as const,
    endpoint: { url: u as string, properties: p, headers: h },
  });
  const err = (m: unknown): T.EndpointResolverResult => ({
    type: "error" as const,
    message: m as string,
  });
  const _p0 = (_0: unknown) => ({
    authSchemes: [
      {
        name: "sigv4",
        signingName: "arc-region-switch",
        signingRegion: `${_.getAttr(_0, "implicitGlobalRegion")}`,
      },
    ],
  });
  {
    const PartitionResult = _.partition(Region);
    if (
      UseControlPlaneEndpoint != null &&
      UseControlPlaneEndpoint === true &&
      Region != null &&
      !(UseFIPS === true) &&
      !(Endpoint != null) &&
      PartitionResult != null &&
      PartitionResult !== false &&
      _.getAttr(PartitionResult, "name") === "aws-cn"
    ) {
      return e(
        `https://arc-region-switch-control-plane.cn-north-1.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
        {
          authSchemes: [
            {
              name: "sigv4",
              signingName: "arc-region-switch",
              signingRegion: "cn-north-1",
            },
          ],
        },
        {},
      );
    }
  }
  {
    const PartitionResult = _.partition(Region);
    if (
      !(Endpoint != null) &&
      UseControlPlaneEndpoint != null &&
      UseControlPlaneEndpoint === true &&
      Region != null &&
      UseFIPS === true &&
      PartitionResult != null &&
      PartitionResult !== false
    ) {
      if (_.getAttr(PartitionResult, "name") === "aws-cn") {
        return err(
          "Invalid Configuration: FIPS is not supported in this partition",
        );
      }
      return e(
        `https://arc-region-switch-control-plane-fips.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
        _p0(PartitionResult),
        {},
      );
    }
  }
  {
    const PartitionResult = _.partition(Region);
    if (
      UseControlPlaneEndpoint != null &&
      UseControlPlaneEndpoint === true &&
      Region != null &&
      !(UseFIPS === true) &&
      !(Endpoint != null) &&
      PartitionResult != null &&
      PartitionResult !== false
    ) {
      return e(
        `https://arc-region-switch-control-plane.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
        _p0(PartitionResult),
        {},
      );
    }
  }
  if (Endpoint != null) {
    if (UseFIPS === true) {
      return err(
        "Invalid Configuration: FIPS and custom endpoint are not supported",
      );
    }
    return e(Endpoint);
  }
  if (Region != null) {
    {
      const PartitionResult = _.partition(Region);
      if (PartitionResult != null && PartitionResult !== false) {
        if (UseFIPS === true) {
          return e(
            `https://arc-region-switch-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        return e(
          `https://arc-region-switch.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
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
export class IllegalArgumentException
  extends /*@__PURE__*/ S.TaggedError<IllegalArgumentException>()(
    "IllegalArgumentException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class IllegalStateException
  extends /*@__PURE__*/ S.TaggedError<IllegalStateException>()(
    "IllegalStateException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export type PlanArn = string;
export type ExecutionId = string;
export type StepName = string;
export type Approval = "approve" | "decline" | (string & {});
export const Approval = /*@__PURE__*/ S.String;

export type ExecutionComment = string;
export interface ApprovePlanExecutionStepRequest {
  planArn: string;
  executionId: string;
  stepName: string;
  approval: Approval;
  comment?: string;
}
export const ApprovePlanExecutionStepRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    planArn: S.String,
    executionId: S.String,
    stepName: S.String,
    approval: Approval,
    comment: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ApprovePlanExecutionStepRequest",
}) as any as S.Schema<ApprovePlanExecutionStepRequest>;
export interface ApprovePlanExecutionStepResponse {}
export const ApprovePlanExecutionStepResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "ApprovePlanExecutionStepResponse",
}) as any as S.Schema<ApprovePlanExecutionStepResponse>;
export interface CancelPlanExecutionRequest {
  planArn: string;
  executionId: string;
  comment?: string;
}
export const CancelPlanExecutionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    planArn: S.String,
    executionId: S.String,
    comment: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CancelPlanExecutionRequest",
}) as any as S.Schema<CancelPlanExecutionRequest>;
export interface CancelPlanExecutionResponse {}
export const CancelPlanExecutionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CancelPlanExecutionResponse",
}) as any as S.Schema<CancelPlanExecutionResponse>;
export type IamRoleArn = string;
export type LambdaArn = string;
export interface Lambdas {
  crossAccountRole?: string;
  externalId?: string;
  arn?: string;
}
export const Lambdas = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    crossAccountRole: S.optional(S.String),
    externalId: S.optional(S.String),
    arn: S.optional(S.String),
  }),
).annotate({ identifier: "Lambdas" }) as any as S.Schema<Lambdas>;
export type LambdaList = Lambdas[];
export const LambdaList = /*@__PURE__*/ S.Array(Lambdas);
export type RegionToRunIn =
  | "activatingRegion"
  | "deactivatingRegion"
  | "activeRegion"
  | "inactiveRegion"
  | (string & {});
export const RegionToRunIn = /*@__PURE__*/ S.String;

export type LambdaUngracefulBehavior = "skip" | (string & {});
export const LambdaUngracefulBehavior = /*@__PURE__*/ S.String;

export interface LambdaUngraceful {
  behavior?: LambdaUngracefulBehavior;
}
export const LambdaUngraceful = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ behavior: S.optional(LambdaUngracefulBehavior) }),
).annotate({
  identifier: "LambdaUngraceful",
}) as any as S.Schema<LambdaUngraceful>;
export interface CustomActionLambdaConfiguration {
  timeoutMinutes?: number;
  lambdas: Lambdas[];
  retryIntervalMinutes: number;
  regionToRun: RegionToRunIn;
  ungraceful?: LambdaUngraceful;
}
export const CustomActionLambdaConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    timeoutMinutes: S.optional(S.Number),
    lambdas: LambdaList,
    retryIntervalMinutes: S.Number,
    regionToRun: RegionToRunIn,
    ungraceful: S.optional(LambdaUngraceful),
  }),
).annotate({
  identifier: "CustomActionLambdaConfiguration",
}) as any as S.Schema<CustomActionLambdaConfiguration>;
export type AsgArn = string;
export interface Asg {
  crossAccountRole?: string;
  externalId?: string;
  arn?: string;
}
export const Asg = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    crossAccountRole: S.optional(S.String),
    externalId: S.optional(S.String),
    arn: S.optional(S.String),
  }),
).annotate({ identifier: "Asg" }) as any as S.Schema<Asg>;
export type AsgList = Asg[];
export const AsgList = /*@__PURE__*/ S.Array(Asg);
export interface Ec2Ungraceful {
  minimumSuccessPercentage: number;
}
export const Ec2Ungraceful = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ minimumSuccessPercentage: S.Number }),
).annotate({ identifier: "Ec2Ungraceful" }) as any as S.Schema<Ec2Ungraceful>;
export type Ec2AsgCapacityMonitoringApproach =
  | "sampledMaxInLast24Hours"
  | "autoscalingMaxInLast24Hours"
  | (string & {});
export const Ec2AsgCapacityMonitoringApproach = /*@__PURE__*/ S.String;

export interface Ec2AsgCapacityIncreaseConfiguration {
  timeoutMinutes?: number;
  asgs: Asg[];
  ungraceful?: Ec2Ungraceful;
  targetPercent?: number;
  capacityMonitoringApproach?: Ec2AsgCapacityMonitoringApproach;
}
export const Ec2AsgCapacityIncreaseConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    timeoutMinutes: S.optional(S.Number),
    asgs: AsgList,
    ungraceful: S.optional(Ec2Ungraceful),
    targetPercent: S.optional(S.Number),
    capacityMonitoringApproach: S.optional(Ec2AsgCapacityMonitoringApproach),
  }),
).annotate({
  identifier: "Ec2AsgCapacityIncreaseConfiguration",
}) as any as S.Schema<Ec2AsgCapacityIncreaseConfiguration>;
export type RoleArn = string;
export interface ExecutionApprovalConfiguration {
  timeoutMinutes?: number;
  approvalRole: string;
}
export const ExecutionApprovalConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ timeoutMinutes: S.optional(S.Number), approvalRole: S.String }),
).annotate({
  identifier: "ExecutionApprovalConfiguration",
}) as any as S.Schema<ExecutionApprovalConfiguration>;
export type RoutingControlArn = string;
export type RoutingControlStateChange = "On" | "Off" | (string & {});
export const RoutingControlStateChange = /*@__PURE__*/ S.String;

export interface ArcRoutingControlState {
  routingControlArn: string;
  state: RoutingControlStateChange;
}
export const ArcRoutingControlState = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ routingControlArn: S.String, state: RoutingControlStateChange }),
).annotate({
  identifier: "ArcRoutingControlState",
}) as any as S.Schema<ArcRoutingControlState>;
export type ArcRoutingControlStates = ArcRoutingControlState[];
export const ArcRoutingControlStates = /*@__PURE__*/ S.Array(
  ArcRoutingControlState,
);
export type RegionAndRoutingControls = {
  [key: string]: ArcRoutingControlState[] | undefined;
};
export const RegionAndRoutingControls = /*@__PURE__*/ S.Record(
  S.String,
  ArcRoutingControlStates.pipe(S.optional),
);
export interface ArcRoutingControlConfiguration {
  timeoutMinutes?: number;
  crossAccountRole?: string;
  externalId?: string;
  regionAndRoutingControls: {
    [key: string]: ArcRoutingControlState[] | undefined;
  };
}
export const ArcRoutingControlConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    timeoutMinutes: S.optional(S.Number),
    crossAccountRole: S.optional(S.String),
    externalId: S.optional(S.String),
    regionAndRoutingControls: RegionAndRoutingControls,
  }),
).annotate({
  identifier: "ArcRoutingControlConfiguration",
}) as any as S.Schema<ArcRoutingControlConfiguration>;
export type GlobalAuroraDefaultBehavior =
  | "switchoverOnly"
  | "failover"
  | (string & {});
export const GlobalAuroraDefaultBehavior = /*@__PURE__*/ S.String;

export type GlobalAuroraUngracefulBehavior = "failover" | (string & {});
export const GlobalAuroraUngracefulBehavior = /*@__PURE__*/ S.String;

export interface GlobalAuroraUngraceful {
  ungraceful?: GlobalAuroraUngracefulBehavior;
}
export const GlobalAuroraUngraceful = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ungraceful: S.optional(GlobalAuroraUngracefulBehavior) }),
).annotate({
  identifier: "GlobalAuroraUngraceful",
}) as any as S.Schema<GlobalAuroraUngraceful>;
export type GlobalClusterIdentifier = string;
export type AuroraClusterArn = string;
export type AuroraClusterArns = string[];
export const AuroraClusterArns = /*@__PURE__*/ S.Array(S.String);
export interface GlobalAuroraConfiguration {
  timeoutMinutes?: number;
  crossAccountRole?: string;
  externalId?: string;
  behavior: GlobalAuroraDefaultBehavior;
  ungraceful?: GlobalAuroraUngraceful;
  globalClusterIdentifier: string;
  databaseClusterArns: string[];
}
export const GlobalAuroraConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    timeoutMinutes: S.optional(S.Number),
    crossAccountRole: S.optional(S.String),
    externalId: S.optional(S.String),
    behavior: GlobalAuroraDefaultBehavior,
    ungraceful: S.optional(GlobalAuroraUngraceful),
    globalClusterIdentifier: S.String,
    databaseClusterArns: AuroraClusterArns,
  }),
).annotate({
  identifier: "GlobalAuroraConfiguration",
}) as any as S.Schema<GlobalAuroraConfiguration>;
export interface ParallelExecutionBlockConfiguration {
  steps: Step[];
}
export const ParallelExecutionBlockConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ steps: S.suspend(() => Steps).annotate({ identifier: "Steps" }) }),
).annotate({
  identifier: "ParallelExecutionBlockConfiguration",
}) as any as S.Schema<ParallelExecutionBlockConfiguration>;
export interface RegionSwitchPlanConfiguration {
  crossAccountRole?: string;
  externalId?: string;
  arn: string;
}
export const RegionSwitchPlanConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    crossAccountRole: S.optional(S.String),
    externalId: S.optional(S.String),
    arn: S.String,
  }),
).annotate({
  identifier: "RegionSwitchPlanConfiguration",
}) as any as S.Schema<RegionSwitchPlanConfiguration>;
export type EcsClusterArn = string;
export type EcsServiceArn = string;
export interface Service {
  crossAccountRole?: string;
  externalId?: string;
  clusterArn?: string;
  serviceArn?: string;
}
export const Service = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    crossAccountRole: S.optional(S.String),
    externalId: S.optional(S.String),
    clusterArn: S.optional(S.String),
    serviceArn: S.optional(S.String),
  }),
).annotate({ identifier: "Service" }) as any as S.Schema<Service>;
export type ServiceList = Service[];
export const ServiceList = /*@__PURE__*/ S.Array(Service);
export interface EcsUngraceful {
  minimumSuccessPercentage: number;
}
export const EcsUngraceful = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ minimumSuccessPercentage: S.Number }),
).annotate({ identifier: "EcsUngraceful" }) as any as S.Schema<EcsUngraceful>;
export type EcsCapacityMonitoringApproach =
  | "sampledMaxInLast24Hours"
  | "containerInsightsMaxInLast24Hours"
  | (string & {});
export const EcsCapacityMonitoringApproach = /*@__PURE__*/ S.String;

export interface EcsCapacityIncreaseConfiguration {
  timeoutMinutes?: number;
  services: Service[];
  ungraceful?: EcsUngraceful;
  targetPercent?: number;
  capacityMonitoringApproach?: EcsCapacityMonitoringApproach;
}
export const EcsCapacityIncreaseConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    timeoutMinutes: S.optional(S.Number),
    services: ServiceList,
    ungraceful: S.optional(EcsUngraceful),
    targetPercent: S.optional(S.Number),
    capacityMonitoringApproach: S.optional(EcsCapacityMonitoringApproach),
  }),
).annotate({
  identifier: "EcsCapacityIncreaseConfiguration",
}) as any as S.Schema<EcsCapacityIncreaseConfiguration>;
export interface KubernetesResourceType {
  apiVersion: string;
  kind: string;
}
export const KubernetesResourceType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ apiVersion: S.String, kind: S.String }),
).annotate({
  identifier: "KubernetesResourceType",
}) as any as S.Schema<KubernetesResourceType>;
export type Region = string;
export type KubernetesNamespace = string;
export interface KubernetesScalingResource {
  namespace: string;
  name: string;
  hpaName?: string;
}
export const KubernetesScalingResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    namespace: S.String,
    name: S.String,
    hpaName: S.optional(S.String),
  }),
).annotate({
  identifier: "KubernetesScalingResource",
}) as any as S.Schema<KubernetesScalingResource>;
export type RegionalScalingResource = {
  [key: string]: KubernetesScalingResource | undefined;
};
export const RegionalScalingResource = /*@__PURE__*/ S.Record(
  S.String,
  KubernetesScalingResource.pipe(S.optional),
);
export type KubernetesScalingApplication = {
  [key: string]:
    | { [key: string]: KubernetesScalingResource | undefined }
    | undefined;
};
export const KubernetesScalingApplication = /*@__PURE__*/ S.Record(
  S.String,
  RegionalScalingResource.pipe(S.optional),
);
export type KubernetesScalingApps = {
  [key: string]:
    | { [key: string]: KubernetesScalingResource | undefined }
    | undefined;
}[];
export const KubernetesScalingApps = /*@__PURE__*/ S.Array(
  KubernetesScalingApplication,
);
export type EksClusterArn = string;
export interface EksCluster {
  crossAccountRole?: string;
  externalId?: string;
  clusterArn: string;
}
export const EksCluster = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    crossAccountRole: S.optional(S.String),
    externalId: S.optional(S.String),
    clusterArn: S.String,
  }),
).annotate({ identifier: "EksCluster" }) as any as S.Schema<EksCluster>;
export type EksClusters = EksCluster[];
export const EksClusters = /*@__PURE__*/ S.Array(EksCluster);
export interface EksResourceScalingUngraceful {
  minimumSuccessPercentage: number;
}
export const EksResourceScalingUngraceful = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ minimumSuccessPercentage: S.Number }),
).annotate({
  identifier: "EksResourceScalingUngraceful",
}) as any as S.Schema<EksResourceScalingUngraceful>;
export type EksCapacityMonitoringApproach =
  | "sampledMaxInLast24Hours"
  | (string & {});
export const EksCapacityMonitoringApproach = /*@__PURE__*/ S.String;

export interface EksResourceScalingConfiguration {
  timeoutMinutes?: number;
  kubernetesResourceType: KubernetesResourceType;
  scalingResources?: {
    [key: string]:
      | { [key: string]: KubernetesScalingResource | undefined }
      | undefined;
  }[];
  eksClusters?: EksCluster[];
  ungraceful?: EksResourceScalingUngraceful;
  targetPercent?: number;
  capacityMonitoringApproach?: EksCapacityMonitoringApproach;
}
export const EksResourceScalingConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    timeoutMinutes: S.optional(S.Number),
    kubernetesResourceType: KubernetesResourceType,
    scalingResources: S.optional(KubernetesScalingApps),
    eksClusters: S.optional(EksClusters),
    ungraceful: S.optional(EksResourceScalingUngraceful),
    targetPercent: S.optional(S.Number),
    capacityMonitoringApproach: S.optional(EksCapacityMonitoringApproach),
  }),
).annotate({
  identifier: "EksResourceScalingConfiguration",
}) as any as S.Schema<EksResourceScalingConfiguration>;
export type Route53HostedZoneId = string;
export type Route53RecordName = string;
export type Route53ResourceRecordSetIdentifier = string;
export interface Route53ResourceRecordSet {
  recordSetIdentifier?: string;
  region?: string;
}
export const Route53ResourceRecordSet = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    recordSetIdentifier: S.optional(S.String),
    region: S.optional(S.String),
  }),
).annotate({
  identifier: "Route53ResourceRecordSet",
}) as any as S.Schema<Route53ResourceRecordSet>;
export type Route53ResourceRecordSetList = Route53ResourceRecordSet[];
export const Route53ResourceRecordSetList = /*@__PURE__*/ S.Array(
  Route53ResourceRecordSet,
);
export interface Route53HealthCheckConfiguration {
  timeoutMinutes?: number;
  crossAccountRole?: string;
  externalId?: string;
  hostedZoneId: string;
  recordName: string;
  recordSets?: Route53ResourceRecordSet[];
}
export const Route53HealthCheckConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    timeoutMinutes: S.optional(S.Number),
    crossAccountRole: S.optional(S.String),
    externalId: S.optional(S.String),
    hostedZoneId: S.String,
    recordName: S.String,
    recordSets: S.optional(Route53ResourceRecordSetList),
  }),
).annotate({
  identifier: "Route53HealthCheckConfiguration",
}) as any as S.Schema<Route53HealthCheckConfiguration>;
export type DocumentDbDefaultBehavior =
  | "switchoverOnly"
  | "failover"
  | (string & {});
export const DocumentDbDefaultBehavior = /*@__PURE__*/ S.String;

export type DocumentDbUngracefulBehavior = "failover" | (string & {});
export const DocumentDbUngracefulBehavior = /*@__PURE__*/ S.String;

export interface DocumentDbUngraceful {
  ungraceful?: DocumentDbUngracefulBehavior;
}
export const DocumentDbUngraceful = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ungraceful: S.optional(DocumentDbUngracefulBehavior) }),
).annotate({
  identifier: "DocumentDbUngraceful",
}) as any as S.Schema<DocumentDbUngraceful>;
export type DocumentDbGlobalClusterIdentifier = string;
export type DocumentDbClusterArn = string;
export type DocumentDbClusterArns = string[];
export const DocumentDbClusterArns = /*@__PURE__*/ S.Array(S.String);
export interface DocumentDbConfiguration {
  timeoutMinutes?: number;
  crossAccountRole?: string;
  externalId?: string;
  behavior: DocumentDbDefaultBehavior;
  ungraceful?: DocumentDbUngraceful;
  globalClusterIdentifier: string;
  databaseClusterArns: string[];
}
export const DocumentDbConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    timeoutMinutes: S.optional(S.Number),
    crossAccountRole: S.optional(S.String),
    externalId: S.optional(S.String),
    behavior: DocumentDbDefaultBehavior,
    ungraceful: S.optional(DocumentDbUngraceful),
    globalClusterIdentifier: S.String,
    databaseClusterArns: DocumentDbClusterArns,
  }),
).annotate({
  identifier: "DocumentDbConfiguration",
}) as any as S.Schema<DocumentDbConfiguration>;
export type RdsDbInstanceArn = string;
export type RdsDbInstanceArnMap = { [key: string]: string | undefined };
export const RdsDbInstanceArnMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface RdsPromoteReadReplicaConfiguration {
  timeoutMinutes?: number;
  crossAccountRole?: string;
  externalId?: string;
  dbInstanceArnMap: { [key: string]: string | undefined };
}
export const RdsPromoteReadReplicaConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    timeoutMinutes: S.optional(S.Number),
    crossAccountRole: S.optional(S.String),
    externalId: S.optional(S.String),
    dbInstanceArnMap: RdsDbInstanceArnMap,
  }),
).annotate({
  identifier: "RdsPromoteReadReplicaConfiguration",
}) as any as S.Schema<RdsPromoteReadReplicaConfiguration>;
export interface RdsCreateCrossRegionReplicaConfiguration {
  timeoutMinutes?: number;
  crossAccountRole?: string;
  externalId?: string;
  dbInstanceArnMap: { [key: string]: string | undefined };
}
export const RdsCreateCrossRegionReplicaConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      timeoutMinutes: S.optional(S.Number),
      crossAccountRole: S.optional(S.String),
      externalId: S.optional(S.String),
      dbInstanceArnMap: RdsDbInstanceArnMap,
    }),
).annotate({
  identifier: "RdsCreateCrossRegionReplicaConfiguration",
}) as any as S.Schema<RdsCreateCrossRegionReplicaConfiguration>;
export type EventSourceMappingAction = "enable" | "disable" | (string & {});
export const EventSourceMappingAction = /*@__PURE__*/ S.String;

export type EventSourceMappingArn = string;
export interface EventSourceMapping {
  crossAccountRole?: string;
  externalId?: string;
  arn: string;
}
export const EventSourceMapping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    crossAccountRole: S.optional(S.String),
    externalId: S.optional(S.String),
    arn: S.String,
  }),
).annotate({
  identifier: "EventSourceMapping",
}) as any as S.Schema<EventSourceMapping>;
export type RegionEventSourceMappingMap = {
  [key: string]: EventSourceMapping | undefined;
};
export const RegionEventSourceMappingMap = /*@__PURE__*/ S.Record(
  S.String,
  EventSourceMapping.pipe(S.optional),
);
export type LambdaEventSourceMappingUngracefulBehavior = "skip" | (string & {});
export const LambdaEventSourceMappingUngracefulBehavior =
  /*@__PURE__*/ S.String;

export interface LambdaEventSourceMappingUngraceful {
  behavior?: LambdaEventSourceMappingUngracefulBehavior;
}
export const LambdaEventSourceMappingUngraceful = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    behavior: S.optional(LambdaEventSourceMappingUngracefulBehavior),
  }),
).annotate({
  identifier: "LambdaEventSourceMappingUngraceful",
}) as any as S.Schema<LambdaEventSourceMappingUngraceful>;
export interface LambdaEventSourceMappingConfiguration {
  timeoutMinutes?: number;
  action: EventSourceMappingAction;
  regionEventSourceMappings: { [key: string]: EventSourceMapping | undefined };
  ungraceful?: LambdaEventSourceMappingUngraceful;
}
export const LambdaEventSourceMappingConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      timeoutMinutes: S.optional(S.Number),
      action: EventSourceMappingAction,
      regionEventSourceMappings: RegionEventSourceMappingMap,
      ungraceful: S.optional(LambdaEventSourceMappingUngraceful),
    }),
).annotate({
  identifier: "LambdaEventSourceMappingConfiguration",
}) as any as S.Schema<LambdaEventSourceMappingConfiguration>;
export type RegionAuroraClusterMap = { [key: string]: string | undefined };
export const RegionAuroraClusterMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface AuroraServerlessScalingConfiguration {
  timeoutMinutes?: number;
  crossAccountRole?: string;
  externalId?: string;
  globalClusterIdentifier: string;
  regionDatabaseClusterArns: { [key: string]: string | undefined };
  targetPercent?: number;
}
export const AuroraServerlessScalingConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      timeoutMinutes: S.optional(S.Number),
      crossAccountRole: S.optional(S.String),
      externalId: S.optional(S.String),
      globalClusterIdentifier: S.String,
      regionDatabaseClusterArns: RegionAuroraClusterMap,
      targetPercent: S.optional(S.Number),
    }),
).annotate({
  identifier: "AuroraServerlessScalingConfiguration",
}) as any as S.Schema<AuroraServerlessScalingConfiguration>;
export type AuroraInstanceArn = string;
export type RegionAuroraInstanceArnMap = { [key: string]: string | undefined };
export const RegionAuroraInstanceArnMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface AuroraProvisionedScalingConfiguration {
  timeoutMinutes?: number;
  crossAccountRole?: string;
  externalId?: string;
  globalClusterIdentifier: string;
  regionDatabaseClusterArns: { [key: string]: string | undefined };
  instanceArns: { [key: string]: string | undefined };
}
export const AuroraProvisionedScalingConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      timeoutMinutes: S.optional(S.Number),
      crossAccountRole: S.optional(S.String),
      externalId: S.optional(S.String),
      globalClusterIdentifier: S.String,
      regionDatabaseClusterArns: RegionAuroraClusterMap,
      instanceArns: RegionAuroraInstanceArnMap,
    }),
).annotate({
  identifier: "AuroraProvisionedScalingConfiguration",
}) as any as S.Schema<AuroraProvisionedScalingConfiguration>;
export type NeptuneDefaultBehavior =
  | "switchoverOnly"
  | "failover"
  | (string & {});
export const NeptuneDefaultBehavior = /*@__PURE__*/ S.String;

export type NeptuneUngracefulBehavior = "failover" | (string & {});
export const NeptuneUngracefulBehavior = /*@__PURE__*/ S.String;

export interface NeptuneUngraceful {
  ungraceful?: NeptuneUngracefulBehavior;
}
export const NeptuneUngraceful = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ungraceful: S.optional(NeptuneUngracefulBehavior) }),
).annotate({
  identifier: "NeptuneUngraceful",
}) as any as S.Schema<NeptuneUngraceful>;
export type NeptuneGlobalClusterIdentifier = string;
export type NeptuneClusterArn = string;
export type RegionNeptuneClusterArnMap = { [key: string]: string | undefined };
export const RegionNeptuneClusterArnMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface NeptuneGlobalDatabaseConfiguration {
  timeoutMinutes?: number;
  crossAccountRole?: string;
  externalId?: string;
  behavior: NeptuneDefaultBehavior;
  ungraceful?: NeptuneUngraceful;
  globalClusterIdentifier: string;
  regionDatabaseClusterArns: { [key: string]: string | undefined };
}
export const NeptuneGlobalDatabaseConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    timeoutMinutes: S.optional(S.Number),
    crossAccountRole: S.optional(S.String),
    externalId: S.optional(S.String),
    behavior: NeptuneDefaultBehavior,
    ungraceful: S.optional(NeptuneUngraceful),
    globalClusterIdentifier: S.String,
    regionDatabaseClusterArns: RegionNeptuneClusterArnMap,
  }),
).annotate({
  identifier: "NeptuneGlobalDatabaseConfiguration",
}) as any as S.Schema<NeptuneGlobalDatabaseConfiguration>;
export type ExecutionBlockConfiguration =
  | {
      customActionLambdaConfig: CustomActionLambdaConfiguration;
      ec2AsgCapacityIncreaseConfig?: never;
      executionApprovalConfig?: never;
      arcRoutingControlConfig?: never;
      globalAuroraConfig?: never;
      parallelConfig?: never;
      regionSwitchPlanConfig?: never;
      ecsCapacityIncreaseConfig?: never;
      eksResourceScalingConfig?: never;
      route53HealthCheckConfig?: never;
      documentDbConfig?: never;
      rdsPromoteReadReplicaConfig?: never;
      rdsCreateCrossRegionReadReplicaConfig?: never;
      lambdaEventSourceMappingConfig?: never;
      auroraServerlessScalingConfig?: never;
      auroraProvisionedScalingConfig?: never;
      neptuneGlobalDatabaseConfig?: never;
    }
  | {
      customActionLambdaConfig?: never;
      ec2AsgCapacityIncreaseConfig: Ec2AsgCapacityIncreaseConfiguration;
      executionApprovalConfig?: never;
      arcRoutingControlConfig?: never;
      globalAuroraConfig?: never;
      parallelConfig?: never;
      regionSwitchPlanConfig?: never;
      ecsCapacityIncreaseConfig?: never;
      eksResourceScalingConfig?: never;
      route53HealthCheckConfig?: never;
      documentDbConfig?: never;
      rdsPromoteReadReplicaConfig?: never;
      rdsCreateCrossRegionReadReplicaConfig?: never;
      lambdaEventSourceMappingConfig?: never;
      auroraServerlessScalingConfig?: never;
      auroraProvisionedScalingConfig?: never;
      neptuneGlobalDatabaseConfig?: never;
    }
  | {
      customActionLambdaConfig?: never;
      ec2AsgCapacityIncreaseConfig?: never;
      executionApprovalConfig: ExecutionApprovalConfiguration;
      arcRoutingControlConfig?: never;
      globalAuroraConfig?: never;
      parallelConfig?: never;
      regionSwitchPlanConfig?: never;
      ecsCapacityIncreaseConfig?: never;
      eksResourceScalingConfig?: never;
      route53HealthCheckConfig?: never;
      documentDbConfig?: never;
      rdsPromoteReadReplicaConfig?: never;
      rdsCreateCrossRegionReadReplicaConfig?: never;
      lambdaEventSourceMappingConfig?: never;
      auroraServerlessScalingConfig?: never;
      auroraProvisionedScalingConfig?: never;
      neptuneGlobalDatabaseConfig?: never;
    }
  | {
      customActionLambdaConfig?: never;
      ec2AsgCapacityIncreaseConfig?: never;
      executionApprovalConfig?: never;
      arcRoutingControlConfig: ArcRoutingControlConfiguration;
      globalAuroraConfig?: never;
      parallelConfig?: never;
      regionSwitchPlanConfig?: never;
      ecsCapacityIncreaseConfig?: never;
      eksResourceScalingConfig?: never;
      route53HealthCheckConfig?: never;
      documentDbConfig?: never;
      rdsPromoteReadReplicaConfig?: never;
      rdsCreateCrossRegionReadReplicaConfig?: never;
      lambdaEventSourceMappingConfig?: never;
      auroraServerlessScalingConfig?: never;
      auroraProvisionedScalingConfig?: never;
      neptuneGlobalDatabaseConfig?: never;
    }
  | {
      customActionLambdaConfig?: never;
      ec2AsgCapacityIncreaseConfig?: never;
      executionApprovalConfig?: never;
      arcRoutingControlConfig?: never;
      globalAuroraConfig: GlobalAuroraConfiguration;
      parallelConfig?: never;
      regionSwitchPlanConfig?: never;
      ecsCapacityIncreaseConfig?: never;
      eksResourceScalingConfig?: never;
      route53HealthCheckConfig?: never;
      documentDbConfig?: never;
      rdsPromoteReadReplicaConfig?: never;
      rdsCreateCrossRegionReadReplicaConfig?: never;
      lambdaEventSourceMappingConfig?: never;
      auroraServerlessScalingConfig?: never;
      auroraProvisionedScalingConfig?: never;
      neptuneGlobalDatabaseConfig?: never;
    }
  | {
      customActionLambdaConfig?: never;
      ec2AsgCapacityIncreaseConfig?: never;
      executionApprovalConfig?: never;
      arcRoutingControlConfig?: never;
      globalAuroraConfig?: never;
      parallelConfig: ParallelExecutionBlockConfiguration;
      regionSwitchPlanConfig?: never;
      ecsCapacityIncreaseConfig?: never;
      eksResourceScalingConfig?: never;
      route53HealthCheckConfig?: never;
      documentDbConfig?: never;
      rdsPromoteReadReplicaConfig?: never;
      rdsCreateCrossRegionReadReplicaConfig?: never;
      lambdaEventSourceMappingConfig?: never;
      auroraServerlessScalingConfig?: never;
      auroraProvisionedScalingConfig?: never;
      neptuneGlobalDatabaseConfig?: never;
    }
  | {
      customActionLambdaConfig?: never;
      ec2AsgCapacityIncreaseConfig?: never;
      executionApprovalConfig?: never;
      arcRoutingControlConfig?: never;
      globalAuroraConfig?: never;
      parallelConfig?: never;
      regionSwitchPlanConfig: RegionSwitchPlanConfiguration;
      ecsCapacityIncreaseConfig?: never;
      eksResourceScalingConfig?: never;
      route53HealthCheckConfig?: never;
      documentDbConfig?: never;
      rdsPromoteReadReplicaConfig?: never;
      rdsCreateCrossRegionReadReplicaConfig?: never;
      lambdaEventSourceMappingConfig?: never;
      auroraServerlessScalingConfig?: never;
      auroraProvisionedScalingConfig?: never;
      neptuneGlobalDatabaseConfig?: never;
    }
  | {
      customActionLambdaConfig?: never;
      ec2AsgCapacityIncreaseConfig?: never;
      executionApprovalConfig?: never;
      arcRoutingControlConfig?: never;
      globalAuroraConfig?: never;
      parallelConfig?: never;
      regionSwitchPlanConfig?: never;
      ecsCapacityIncreaseConfig: EcsCapacityIncreaseConfiguration;
      eksResourceScalingConfig?: never;
      route53HealthCheckConfig?: never;
      documentDbConfig?: never;
      rdsPromoteReadReplicaConfig?: never;
      rdsCreateCrossRegionReadReplicaConfig?: never;
      lambdaEventSourceMappingConfig?: never;
      auroraServerlessScalingConfig?: never;
      auroraProvisionedScalingConfig?: never;
      neptuneGlobalDatabaseConfig?: never;
    }
  | {
      customActionLambdaConfig?: never;
      ec2AsgCapacityIncreaseConfig?: never;
      executionApprovalConfig?: never;
      arcRoutingControlConfig?: never;
      globalAuroraConfig?: never;
      parallelConfig?: never;
      regionSwitchPlanConfig?: never;
      ecsCapacityIncreaseConfig?: never;
      eksResourceScalingConfig: EksResourceScalingConfiguration;
      route53HealthCheckConfig?: never;
      documentDbConfig?: never;
      rdsPromoteReadReplicaConfig?: never;
      rdsCreateCrossRegionReadReplicaConfig?: never;
      lambdaEventSourceMappingConfig?: never;
      auroraServerlessScalingConfig?: never;
      auroraProvisionedScalingConfig?: never;
      neptuneGlobalDatabaseConfig?: never;
    }
  | {
      customActionLambdaConfig?: never;
      ec2AsgCapacityIncreaseConfig?: never;
      executionApprovalConfig?: never;
      arcRoutingControlConfig?: never;
      globalAuroraConfig?: never;
      parallelConfig?: never;
      regionSwitchPlanConfig?: never;
      ecsCapacityIncreaseConfig?: never;
      eksResourceScalingConfig?: never;
      route53HealthCheckConfig: Route53HealthCheckConfiguration;
      documentDbConfig?: never;
      rdsPromoteReadReplicaConfig?: never;
      rdsCreateCrossRegionReadReplicaConfig?: never;
      lambdaEventSourceMappingConfig?: never;
      auroraServerlessScalingConfig?: never;
      auroraProvisionedScalingConfig?: never;
      neptuneGlobalDatabaseConfig?: never;
    }
  | {
      customActionLambdaConfig?: never;
      ec2AsgCapacityIncreaseConfig?: never;
      executionApprovalConfig?: never;
      arcRoutingControlConfig?: never;
      globalAuroraConfig?: never;
      parallelConfig?: never;
      regionSwitchPlanConfig?: never;
      ecsCapacityIncreaseConfig?: never;
      eksResourceScalingConfig?: never;
      route53HealthCheckConfig?: never;
      documentDbConfig: DocumentDbConfiguration;
      rdsPromoteReadReplicaConfig?: never;
      rdsCreateCrossRegionReadReplicaConfig?: never;
      lambdaEventSourceMappingConfig?: never;
      auroraServerlessScalingConfig?: never;
      auroraProvisionedScalingConfig?: never;
      neptuneGlobalDatabaseConfig?: never;
    }
  | {
      customActionLambdaConfig?: never;
      ec2AsgCapacityIncreaseConfig?: never;
      executionApprovalConfig?: never;
      arcRoutingControlConfig?: never;
      globalAuroraConfig?: never;
      parallelConfig?: never;
      regionSwitchPlanConfig?: never;
      ecsCapacityIncreaseConfig?: never;
      eksResourceScalingConfig?: never;
      route53HealthCheckConfig?: never;
      documentDbConfig?: never;
      rdsPromoteReadReplicaConfig: RdsPromoteReadReplicaConfiguration;
      rdsCreateCrossRegionReadReplicaConfig?: never;
      lambdaEventSourceMappingConfig?: never;
      auroraServerlessScalingConfig?: never;
      auroraProvisionedScalingConfig?: never;
      neptuneGlobalDatabaseConfig?: never;
    }
  | {
      customActionLambdaConfig?: never;
      ec2AsgCapacityIncreaseConfig?: never;
      executionApprovalConfig?: never;
      arcRoutingControlConfig?: never;
      globalAuroraConfig?: never;
      parallelConfig?: never;
      regionSwitchPlanConfig?: never;
      ecsCapacityIncreaseConfig?: never;
      eksResourceScalingConfig?: never;
      route53HealthCheckConfig?: never;
      documentDbConfig?: never;
      rdsPromoteReadReplicaConfig?: never;
      rdsCreateCrossRegionReadReplicaConfig: RdsCreateCrossRegionReplicaConfiguration;
      lambdaEventSourceMappingConfig?: never;
      auroraServerlessScalingConfig?: never;
      auroraProvisionedScalingConfig?: never;
      neptuneGlobalDatabaseConfig?: never;
    }
  | {
      customActionLambdaConfig?: never;
      ec2AsgCapacityIncreaseConfig?: never;
      executionApprovalConfig?: never;
      arcRoutingControlConfig?: never;
      globalAuroraConfig?: never;
      parallelConfig?: never;
      regionSwitchPlanConfig?: never;
      ecsCapacityIncreaseConfig?: never;
      eksResourceScalingConfig?: never;
      route53HealthCheckConfig?: never;
      documentDbConfig?: never;
      rdsPromoteReadReplicaConfig?: never;
      rdsCreateCrossRegionReadReplicaConfig?: never;
      lambdaEventSourceMappingConfig: LambdaEventSourceMappingConfiguration;
      auroraServerlessScalingConfig?: never;
      auroraProvisionedScalingConfig?: never;
      neptuneGlobalDatabaseConfig?: never;
    }
  | {
      customActionLambdaConfig?: never;
      ec2AsgCapacityIncreaseConfig?: never;
      executionApprovalConfig?: never;
      arcRoutingControlConfig?: never;
      globalAuroraConfig?: never;
      parallelConfig?: never;
      regionSwitchPlanConfig?: never;
      ecsCapacityIncreaseConfig?: never;
      eksResourceScalingConfig?: never;
      route53HealthCheckConfig?: never;
      documentDbConfig?: never;
      rdsPromoteReadReplicaConfig?: never;
      rdsCreateCrossRegionReadReplicaConfig?: never;
      lambdaEventSourceMappingConfig?: never;
      auroraServerlessScalingConfig: AuroraServerlessScalingConfiguration;
      auroraProvisionedScalingConfig?: never;
      neptuneGlobalDatabaseConfig?: never;
    }
  | {
      customActionLambdaConfig?: never;
      ec2AsgCapacityIncreaseConfig?: never;
      executionApprovalConfig?: never;
      arcRoutingControlConfig?: never;
      globalAuroraConfig?: never;
      parallelConfig?: never;
      regionSwitchPlanConfig?: never;
      ecsCapacityIncreaseConfig?: never;
      eksResourceScalingConfig?: never;
      route53HealthCheckConfig?: never;
      documentDbConfig?: never;
      rdsPromoteReadReplicaConfig?: never;
      rdsCreateCrossRegionReadReplicaConfig?: never;
      lambdaEventSourceMappingConfig?: never;
      auroraServerlessScalingConfig?: never;
      auroraProvisionedScalingConfig: AuroraProvisionedScalingConfiguration;
      neptuneGlobalDatabaseConfig?: never;
    }
  | {
      customActionLambdaConfig?: never;
      ec2AsgCapacityIncreaseConfig?: never;
      executionApprovalConfig?: never;
      arcRoutingControlConfig?: never;
      globalAuroraConfig?: never;
      parallelConfig?: never;
      regionSwitchPlanConfig?: never;
      ecsCapacityIncreaseConfig?: never;
      eksResourceScalingConfig?: never;
      route53HealthCheckConfig?: never;
      documentDbConfig?: never;
      rdsPromoteReadReplicaConfig?: never;
      rdsCreateCrossRegionReadReplicaConfig?: never;
      lambdaEventSourceMappingConfig?: never;
      auroraServerlessScalingConfig?: never;
      auroraProvisionedScalingConfig?: never;
      neptuneGlobalDatabaseConfig: NeptuneGlobalDatabaseConfiguration;
    };
export const ExecutionBlockConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ customActionLambdaConfig: CustomActionLambdaConfiguration }),
  S.Struct({
    ec2AsgCapacityIncreaseConfig: Ec2AsgCapacityIncreaseConfiguration,
  }),
  S.Struct({ executionApprovalConfig: ExecutionApprovalConfiguration }),
  S.Struct({ arcRoutingControlConfig: ArcRoutingControlConfiguration }),
  S.Struct({ globalAuroraConfig: GlobalAuroraConfiguration }),
  S.Struct({
    parallelConfig: S.suspend(
      (): S.Schema<ParallelExecutionBlockConfiguration> =>
        ParallelExecutionBlockConfiguration,
    ).annotate({ identifier: "ParallelExecutionBlockConfiguration" }),
  }),
  S.Struct({ regionSwitchPlanConfig: RegionSwitchPlanConfiguration }),
  S.Struct({ ecsCapacityIncreaseConfig: EcsCapacityIncreaseConfiguration }),
  S.Struct({ eksResourceScalingConfig: EksResourceScalingConfiguration }),
  S.Struct({ route53HealthCheckConfig: Route53HealthCheckConfiguration }),
  S.Struct({ documentDbConfig: DocumentDbConfiguration }),
  S.Struct({ rdsPromoteReadReplicaConfig: RdsPromoteReadReplicaConfiguration }),
  S.Struct({
    rdsCreateCrossRegionReadReplicaConfig:
      RdsCreateCrossRegionReplicaConfiguration,
  }),
  S.Struct({
    lambdaEventSourceMappingConfig: LambdaEventSourceMappingConfiguration,
  }),
  S.Struct({
    auroraServerlessScalingConfig: AuroraServerlessScalingConfiguration,
  }),
  S.Struct({
    auroraProvisionedScalingConfig: AuroraProvisionedScalingConfiguration,
  }),
  S.Struct({ neptuneGlobalDatabaseConfig: NeptuneGlobalDatabaseConfiguration }),
]) as any as S.Schema<ExecutionBlockConfiguration>;
export type ExecutionBlockType =
  | "CustomActionLambda"
  | "ManualApproval"
  | "AuroraGlobalDatabase"
  | "EC2AutoScaling"
  | "ARCRoutingControl"
  | "ARCRegionSwitchPlan"
  | "Parallel"
  | "ECSServiceScaling"
  | "EKSResourceScaling"
  | "Route53HealthCheck"
  | "DocumentDb"
  | "RdsPromoteReadReplica"
  | "RdsCreateCrossRegionReplica"
  | "LambdaEventSourceMapping"
  | "AuroraServerlessScaling"
  | "AuroraProvisionedScaling"
  | "NeptuneGlobalDatabase"
  | (string & {});
export const ExecutionBlockType = /*@__PURE__*/ S.String;

export interface Step {
  name: string;
  description?: string;
  executionBlockConfiguration: ExecutionBlockConfiguration;
  executionBlockType: ExecutionBlockType;
}
export const Step = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    executionBlockConfiguration: S.suspend(
      () => ExecutionBlockConfiguration,
    ).annotate({ identifier: "ExecutionBlockConfiguration" }),
    executionBlockType: ExecutionBlockType,
  }),
).annotate({ identifier: "Step" }) as any as S.Schema<Step>;
export type Steps = Step[];
export const Steps = /*@__PURE__*/ S.Array(
  S.suspend((): S.Schema<Step> => Step).annotate({ identifier: "Step" }),
) as any as S.Schema<Steps>;
export type WorkflowTargetAction =
  | "activate"
  | "deactivate"
  | "postRecovery"
  | (string & {});
export const WorkflowTargetAction = /*@__PURE__*/ S.String;

export interface Workflow {
  steps?: Step[];
  workflowTargetAction: WorkflowTargetAction;
  workflowTargetRegion?: string;
  workflowDescription?: string;
}
export const Workflow = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    steps: S.optional(Steps),
    workflowTargetAction: WorkflowTargetAction,
    workflowTargetRegion: S.optional(S.String),
    workflowDescription: S.optional(S.String),
  }),
).annotate({ identifier: "Workflow" }) as any as S.Schema<Workflow>;
export type WorkflowList = Workflow[];
export const WorkflowList = /*@__PURE__*/ S.Array(Workflow);
export type AlarmType = "applicationHealth" | "trigger" | (string & {});
export const AlarmType = /*@__PURE__*/ S.String;

export interface AssociatedAlarm {
  crossAccountRole?: string;
  externalId?: string;
  resourceIdentifier: string;
  alarmType: AlarmType;
}
export const AssociatedAlarm = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    crossAccountRole: S.optional(S.String),
    externalId: S.optional(S.String),
    resourceIdentifier: S.String,
    alarmType: AlarmType,
  }),
).annotate({
  identifier: "AssociatedAlarm",
}) as any as S.Schema<AssociatedAlarm>;
export type AssociatedAlarmMap = { [key: string]: AssociatedAlarm | undefined };
export const AssociatedAlarmMap = /*@__PURE__*/ S.Record(
  S.String,
  AssociatedAlarm.pipe(S.optional),
);
export type AlarmCondition = "red" | "green" | (string & {});
export const AlarmCondition = /*@__PURE__*/ S.String;

export interface TriggerCondition {
  associatedAlarmName: string;
  condition: AlarmCondition;
}
export const TriggerCondition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ associatedAlarmName: S.String, condition: AlarmCondition }),
).annotate({
  identifier: "TriggerCondition",
}) as any as S.Schema<TriggerCondition>;
export type TriggerConditionList = TriggerCondition[];
export const TriggerConditionList = /*@__PURE__*/ S.Array(TriggerCondition);
export interface Trigger {
  description?: string;
  targetRegion: string;
  action: WorkflowTargetAction;
  conditions: TriggerCondition[];
  minDelayMinutesBetweenExecutions: number;
}
export const Trigger = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    description: S.optional(S.String),
    targetRegion: S.String,
    action: WorkflowTargetAction,
    conditions: TriggerConditionList,
    minDelayMinutesBetweenExecutions: S.Number,
  }),
).annotate({ identifier: "Trigger" }) as any as S.Schema<Trigger>;
export type TriggerList = Trigger[];
export const TriggerList = /*@__PURE__*/ S.Array(Trigger);
export type AccountId = string;
export interface S3ReportOutputConfiguration {
  bucketPath?: string;
  bucketOwner?: string;
}
export const S3ReportOutputConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bucketPath: S.optional(S.String),
    bucketOwner: S.optional(S.String),
  }),
).annotate({
  identifier: "S3ReportOutputConfiguration",
}) as any as S.Schema<S3ReportOutputConfiguration>;
export type ReportOutputConfiguration = {
  s3Configuration: S3ReportOutputConfiguration;
};
export const ReportOutputConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ s3Configuration: S3ReportOutputConfiguration }),
]);
export type ReportOutputList = ReportOutputConfiguration[];
export const ReportOutputList = /*@__PURE__*/ S.Array(
  ReportOutputConfiguration,
);
export interface ReportConfiguration {
  reportOutput?: ReportOutputConfiguration[];
}
export const ReportConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ reportOutput: S.optional(ReportOutputList) }),
).annotate({
  identifier: "ReportConfiguration",
}) as any as S.Schema<ReportConfiguration>;
export type PlanName = string;
export type RegionList = string[];
export const RegionList = /*@__PURE__*/ S.Array(S.String);
export type RecoveryApproach = "activeActive" | "activePassive" | (string & {});
export const RecoveryApproach = /*@__PURE__*/ S.String;

export type TagKey = string;
export type TagValue = string;
export type Tags = { [key: string]: string | undefined };
export const Tags = /*@__PURE__*/ S.Record(S.String, S.String.pipe(S.optional));
export interface CreatePlanRequest {
  description?: string;
  workflows: Workflow[];
  executionRole: string;
  recoveryTimeObjectiveMinutes?: number;
  associatedAlarms?: { [key: string]: AssociatedAlarm | undefined };
  triggers?: Trigger[];
  reportConfiguration?: ReportConfiguration;
  name: string;
  regions: string[];
  recoveryApproach: RecoveryApproach;
  primaryRegion?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreatePlanRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    description: S.optional(S.String),
    workflows: WorkflowList,
    executionRole: S.String,
    recoveryTimeObjectiveMinutes: S.optional(S.Number),
    associatedAlarms: S.optional(AssociatedAlarmMap),
    triggers: S.optional(TriggerList),
    reportConfiguration: S.optional(ReportConfiguration),
    name: S.String,
    regions: RegionList,
    recoveryApproach: RecoveryApproach,
    primaryRegion: S.optional(S.String),
    tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ UseControlPlaneEndpoint: { value: true } }),
    ),
  ),
).annotate({
  identifier: "CreatePlanRequest",
}) as any as S.Schema<CreatePlanRequest>;
export interface Plan {
  arn: string;
  description?: string;
  workflows: Workflow[];
  executionRole: string;
  recoveryTimeObjectiveMinutes?: number;
  associatedAlarms?: { [key: string]: AssociatedAlarm | undefined };
  triggers?: Trigger[];
  reportConfiguration?: ReportConfiguration;
  name: string;
  regions: string[];
  recoveryApproach: RecoveryApproach;
  primaryRegion?: string;
  owner: string;
  version?: string;
  updatedAt?: Date;
}
export const Plan = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    description: S.optional(S.String),
    workflows: WorkflowList,
    executionRole: S.String,
    recoveryTimeObjectiveMinutes: S.optional(S.Number),
    associatedAlarms: S.optional(AssociatedAlarmMap),
    triggers: S.optional(TriggerList),
    reportConfiguration: S.optional(ReportConfiguration),
    name: S.String,
    regions: RegionList,
    recoveryApproach: RecoveryApproach,
    primaryRegion: S.optional(S.String),
    owner: S.String,
    version: S.optional(S.String),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "Plan" }) as any as S.Schema<Plan>;
export interface CreatePlanResponse {
  plan?: Plan;
}
export const CreatePlanResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ plan: S.optional(Plan) }),
).annotate({
  identifier: "CreatePlanResponse",
}) as any as S.Schema<CreatePlanResponse>;
export interface DeletePlanRequest {
  arn: string;
}
export const DeletePlanRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ UseControlPlaneEndpoint: { value: true } }),
    ),
  ),
).annotate({
  identifier: "DeletePlanRequest",
}) as any as S.Schema<DeletePlanRequest>;
export interface DeletePlanResponse {}
export const DeletePlanResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeletePlanResponse",
}) as any as S.Schema<DeletePlanResponse>;
export interface GetPlanRequest {
  arn: string;
}
export const GetPlanRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ UseControlPlaneEndpoint: { value: true } }),
    ),
  ),
).annotate({ identifier: "GetPlanRequest" }) as any as S.Schema<GetPlanRequest>;
export interface GetPlanResponse {
  plan?: Plan;
}
export const GetPlanResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ plan: S.optional(Plan) }),
).annotate({
  identifier: "GetPlanResponse",
}) as any as S.Schema<GetPlanResponse>;
export type MaxResults = number;
export type NextToken = string;
export interface GetPlanEvaluationStatusRequest {
  planArn: string;
  maxResults?: number;
  nextToken?: string;
}
export const GetPlanEvaluationStatusRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    planArn: S.String,
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetPlanEvaluationStatusRequest",
}) as any as S.Schema<GetPlanEvaluationStatusRequest>;
export type EvaluationStatus =
  | "passed"
  | "actionRequired"
  | "pendingEvaluation"
  | "unknown"
  | (string & {});
export const EvaluationStatus = /*@__PURE__*/ S.String;

export type ExecutionAction =
  | "activate"
  | "deactivate"
  | "postRecovery"
  | (string & {});
export const ExecutionAction = /*@__PURE__*/ S.String;

export interface MinimalWorkflow {
  action?: ExecutionAction;
  name?: string;
}
export const MinimalWorkflow = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ action: S.optional(ExecutionAction), name: S.optional(S.String) }),
).annotate({
  identifier: "MinimalWorkflow",
}) as any as S.Schema<MinimalWorkflow>;
export type ResourceArn = string;
export type ResourceWarningStatus = "active" | "resolved" | (string & {});
export const ResourceWarningStatus = /*@__PURE__*/ S.String;

export interface ResourceWarning {
  workflow?: MinimalWorkflow;
  version: string;
  stepName?: string;
  resourceArn?: string;
  warningStatus: ResourceWarningStatus;
  warningUpdatedTime: Date;
  warningMessage: string;
}
export const ResourceWarning = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workflow: S.optional(MinimalWorkflow),
    version: S.String,
    stepName: S.optional(S.String),
    resourceArn: S.optional(S.String),
    warningStatus: ResourceWarningStatus,
    warningUpdatedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    warningMessage: S.String,
  }),
).annotate({
  identifier: "ResourceWarning",
}) as any as S.Schema<ResourceWarning>;
export type PlanWarnings = ResourceWarning[];
export const PlanWarnings = /*@__PURE__*/ S.Array(ResourceWarning);
export interface GetPlanEvaluationStatusResponse {
  planArn: string;
  lastEvaluationTime?: Date;
  lastEvaluatedVersion?: string;
  region?: string;
  evaluationState?: EvaluationStatus;
  warnings?: ResourceWarning[];
  nextToken?: string;
}
export const GetPlanEvaluationStatusResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    planArn: S.String,
    lastEvaluationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastEvaluatedVersion: S.optional(S.String),
    region: S.optional(S.String),
    evaluationState: S.optional(EvaluationStatus),
    warnings: S.optional(PlanWarnings),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetPlanEvaluationStatusResponse",
}) as any as S.Schema<GetPlanEvaluationStatusResponse>;
export type GetPlanExecutionStepStatesMaxResults = number;
export interface GetPlanExecutionRequest {
  planArn: string;
  executionId: string;
  maxResults?: number;
  nextToken?: string;
}
export const GetPlanExecutionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    planArn: S.String,
    executionId: S.String,
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetPlanExecutionRequest",
}) as any as S.Schema<GetPlanExecutionRequest>;
export type ExecutionMode = "graceful" | "ungraceful" | (string & {});
export const ExecutionMode = /*@__PURE__*/ S.String;

export type ExecutionState =
  | "inProgress"
  | "pausedByFailedStep"
  | "pausedByOperator"
  | "completed"
  | "completedWithExceptions"
  | "canceled"
  | "planExecutionTimedOut"
  | "pendingManualApproval"
  | "failed"
  | "pending"
  | "completedMonitoringApplicationHealth"
  | (string & {});
export const ExecutionState = /*@__PURE__*/ S.String;

export type StepStatus =
  | "notStarted"
  | "running"
  | "failed"
  | "completed"
  | "canceled"
  | "skipped"
  | "pendingApproval"
  | (string & {});
export const StepStatus = /*@__PURE__*/ S.String;

export interface StepState {
  name?: string;
  status?: StepStatus;
  startTime?: Date;
  endTime?: Date;
  stepMode?: ExecutionMode;
}
export const StepState = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    status: S.optional(StepStatus),
    startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    stepMode: S.optional(ExecutionMode),
  }),
).annotate({ identifier: "StepState" }) as any as S.Schema<StepState>;
export type StepStates = StepState[];
export const StepStates = /*@__PURE__*/ S.Array(StepState);
export type Duration = string;
export interface S3ReportOutput {
  s3ObjectKey?: string;
}
export const S3ReportOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ s3ObjectKey: S.optional(S.String) }),
).annotate({ identifier: "S3ReportOutput" }) as any as S.Schema<S3ReportOutput>;
export type FailedReportErrorCode =
  | "insufficientPermissions"
  | "invalidResource"
  | "configurationError"
  | (string & {});
export const FailedReportErrorCode = /*@__PURE__*/ S.String;

export interface FailedReportOutput {
  errorCode?: FailedReportErrorCode;
  errorMessage?: string;
}
export const FailedReportOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    errorCode: S.optional(FailedReportErrorCode),
    errorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "FailedReportOutput",
}) as any as S.Schema<FailedReportOutput>;
export type ReportOutput =
  | { s3ReportOutput: S3ReportOutput; failedReportOutput?: never }
  | { s3ReportOutput?: never; failedReportOutput: FailedReportOutput };
export const ReportOutput = /*@__PURE__*/ S.Union([
  S.Struct({ s3ReportOutput: S3ReportOutput }),
  S.Struct({ failedReportOutput: FailedReportOutput }),
]);
export interface GeneratedReport {
  reportGenerationTime?: Date;
  reportOutput?: ReportOutput;
}
export const GeneratedReport = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    reportGenerationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    reportOutput: S.optional(ReportOutput),
  }),
).annotate({
  identifier: "GeneratedReport",
}) as any as S.Schema<GeneratedReport>;
export type GeneratedReportDetails = GeneratedReport[];
export const GeneratedReportDetails = /*@__PURE__*/ S.Array(GeneratedReport);
export interface GetPlanExecutionResponse {
  planArn: string;
  executionId: string;
  version?: string;
  updatedAt?: Date;
  comment?: string;
  startTime: Date;
  endTime?: Date;
  mode: ExecutionMode;
  executionState: ExecutionState;
  executionAction: ExecutionAction;
  executionRegion: string;
  recoveryExecutionId?: string;
  stepStates?: StepState[];
  plan?: Plan;
  actualRecoveryTime?: string;
  generatedReportDetails?: GeneratedReport[];
  nextToken?: string;
}
export const GetPlanExecutionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    planArn: S.String,
    executionId: S.String,
    version: S.optional(S.String),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    comment: S.optional(S.String),
    startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    mode: ExecutionMode,
    executionState: ExecutionState,
    executionAction: ExecutionAction,
    executionRegion: S.String,
    recoveryExecutionId: S.optional(S.String),
    stepStates: S.optional(StepStates),
    plan: S.optional(Plan),
    actualRecoveryTime: S.optional(S.String),
    generatedReportDetails: S.optional(GeneratedReportDetails),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetPlanExecutionResponse",
}) as any as S.Schema<GetPlanExecutionResponse>;
export interface GetPlanInRegionRequest {
  arn: string;
}
export const GetPlanInRegionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetPlanInRegionRequest",
}) as any as S.Schema<GetPlanInRegionRequest>;
export interface GetPlanInRegionResponse {
  plan?: Plan;
}
export const GetPlanInRegionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ plan: S.optional(Plan) }),
).annotate({
  identifier: "GetPlanInRegionResponse",
}) as any as S.Schema<GetPlanInRegionResponse>;
export type ListExecutionEventsMaxResults = number;
export interface ListPlanExecutionEventsRequest {
  planArn: string;
  executionId: string;
  maxResults?: number;
  nextToken?: string;
  name?: string;
}
export const ListPlanExecutionEventsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    planArn: S.String,
    executionId: S.String,
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    name: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListPlanExecutionEventsRequest",
}) as any as S.Schema<ListPlanExecutionEventsRequest>;
export type ExecutionEventType =
  | "unknown"
  | "executionPending"
  | "executionStarted"
  | "executionSucceeded"
  | "executionFailed"
  | "executionPausing"
  | "executionPaused"
  | "executionCanceling"
  | "executionCanceled"
  | "executionPendingApproval"
  | "executionBehaviorChangedToUngraceful"
  | "executionBehaviorChangedToGraceful"
  | "executionPendingChildPlanManualApproval"
  | "executionSuccessMonitoringApplicationHealth"
  | "stepStarted"
  | "stepUpdate"
  | "stepSucceeded"
  | "stepFailed"
  | "stepSkipped"
  | "stepPausedByError"
  | "stepPausedByOperator"
  | "stepCanceled"
  | "stepPendingApproval"
  | "stepExecutionBehaviorChangedToUngraceful"
  | "stepPendingApplicationHealthMonitor"
  | "planEvaluationWarning"
  | (string & {});
export const ExecutionEventType = /*@__PURE__*/ S.String;

export type Resources = string[];
export const Resources = /*@__PURE__*/ S.Array(S.String);
export interface ExecutionEvent {
  timestamp?: Date;
  type?: ExecutionEventType;
  stepName?: string;
  executionBlockType?: ExecutionBlockType;
  resources?: string[];
  error?: string;
  description?: string;
  eventId: string;
  previousEventId?: string;
}
export const ExecutionEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    type: S.optional(ExecutionEventType),
    stepName: S.optional(S.String),
    executionBlockType: S.optional(ExecutionBlockType),
    resources: S.optional(Resources),
    error: S.optional(S.String),
    description: S.optional(S.String),
    eventId: S.String,
    previousEventId: S.optional(S.String),
  }),
).annotate({ identifier: "ExecutionEvent" }) as any as S.Schema<ExecutionEvent>;
export type ExecutionEventList = ExecutionEvent[];
export const ExecutionEventList = /*@__PURE__*/ S.Array(ExecutionEvent);
export interface ListPlanExecutionEventsResponse {
  items?: ExecutionEvent[];
  nextToken?: string;
}
export const ListPlanExecutionEventsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(ExecutionEventList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPlanExecutionEventsResponse",
}) as any as S.Schema<ListPlanExecutionEventsResponse>;
export type ListExecutionsMaxResults = number;
export interface ListPlanExecutionsRequest {
  planArn: string;
  maxResults?: number;
  nextToken?: string;
  state?: ExecutionState;
}
export const ListPlanExecutionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    planArn: S.String,
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    state: S.optional(ExecutionState),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListPlanExecutionsRequest",
}) as any as S.Schema<ListPlanExecutionsRequest>;
export interface AbbreviatedExecution {
  planArn: string;
  executionId: string;
  version?: string;
  updatedAt?: Date;
  comment?: string;
  startTime: Date;
  endTime?: Date;
  mode: ExecutionMode;
  executionState: ExecutionState;
  executionAction: ExecutionAction;
  executionRegion: string;
  recoveryExecutionId?: string;
  actualRecoveryTime?: string;
}
export const AbbreviatedExecution = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    planArn: S.String,
    executionId: S.String,
    version: S.optional(S.String),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    comment: S.optional(S.String),
    startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    mode: ExecutionMode,
    executionState: ExecutionState,
    executionAction: ExecutionAction,
    executionRegion: S.String,
    recoveryExecutionId: S.optional(S.String),
    actualRecoveryTime: S.optional(S.String),
  }),
).annotate({
  identifier: "AbbreviatedExecution",
}) as any as S.Schema<AbbreviatedExecution>;
export type AbbreviatedExecutionsList = AbbreviatedExecution[];
export const AbbreviatedExecutionsList =
  /*@__PURE__*/ S.Array(AbbreviatedExecution);
export interface ListPlanExecutionsResponse {
  items?: AbbreviatedExecution[];
  nextToken?: string;
}
export const ListPlanExecutionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(AbbreviatedExecutionsList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPlanExecutionsResponse",
}) as any as S.Schema<ListPlanExecutionsResponse>;
export interface ListPlansRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListPlansRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ UseControlPlaneEndpoint: { value: true } }),
    ),
  ),
).annotate({
  identifier: "ListPlansRequest",
}) as any as S.Schema<ListPlansRequest>;
export interface AbbreviatedPlan {
  arn: string;
  owner: string;
  name: string;
  regions: string[];
  recoveryApproach: RecoveryApproach;
  primaryRegion?: string;
  version?: string;
  updatedAt?: Date;
  description?: string;
  executionRole?: string;
  activePlanExecution?: string;
  recoveryTimeObjectiveMinutes?: number;
}
export const AbbreviatedPlan = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    owner: S.String,
    name: S.String,
    regions: RegionList,
    recoveryApproach: RecoveryApproach,
    primaryRegion: S.optional(S.String),
    version: S.optional(S.String),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    description: S.optional(S.String),
    executionRole: S.optional(S.String),
    activePlanExecution: S.optional(S.String),
    recoveryTimeObjectiveMinutes: S.optional(S.Number),
  }),
).annotate({
  identifier: "AbbreviatedPlan",
}) as any as S.Schema<AbbreviatedPlan>;
export type PlanList = AbbreviatedPlan[];
export const PlanList = /*@__PURE__*/ S.Array(AbbreviatedPlan);
export interface ListPlansResponse {
  plans?: AbbreviatedPlan[];
  nextToken?: string;
}
export const ListPlansResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ plans: S.optional(PlanList), nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListPlansResponse",
}) as any as S.Schema<ListPlansResponse>;
export interface ListPlansInRegionRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListPlansInRegionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListPlansInRegionRequest",
}) as any as S.Schema<ListPlansInRegionRequest>;
export interface ListPlansInRegionResponse {
  plans?: AbbreviatedPlan[];
  nextToken?: string;
}
export const ListPlansInRegionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ plans: S.optional(PlanList), nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListPlansInRegionResponse",
}) as any as S.Schema<ListPlansInRegionResponse>;
export interface ListRoute53HealthChecksRequest {
  arn: string;
  hostedZoneId?: string;
  recordName?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListRoute53HealthChecksRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    hostedZoneId: S.optional(S.String),
    recordName: S.optional(S.String),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ UseControlPlaneEndpoint: { value: true } }),
    ),
  ),
).annotate({
  identifier: "ListRoute53HealthChecksRequest",
}) as any as S.Schema<ListRoute53HealthChecksRequest>;
export type Route53HealthCheckId = string;
export type Route53HealthCheckStatus =
  | "healthy"
  | "unhealthy"
  | "unknown"
  | (string & {});
export const Route53HealthCheckStatus = /*@__PURE__*/ S.String;

export interface Route53HealthCheck {
  hostedZoneId: string;
  recordName: string;
  healthCheckId?: string;
  status?: Route53HealthCheckStatus;
  region: string;
}
export const Route53HealthCheck = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    hostedZoneId: S.String,
    recordName: S.String,
    healthCheckId: S.optional(S.String),
    status: S.optional(Route53HealthCheckStatus),
    region: S.String,
  }),
).annotate({
  identifier: "Route53HealthCheck",
}) as any as S.Schema<Route53HealthCheck>;
export type Route53HealthCheckList = Route53HealthCheck[];
export const Route53HealthCheckList = /*@__PURE__*/ S.Array(Route53HealthCheck);
export interface ListRoute53HealthChecksResponse {
  healthChecks?: Route53HealthCheck[];
  nextToken?: string;
}
export const ListRoute53HealthChecksResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    healthChecks: S.optional(Route53HealthCheckList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListRoute53HealthChecksResponse",
}) as any as S.Schema<ListRoute53HealthChecksResponse>;
export interface ListRoute53HealthChecksInRegionRequest {
  arn: string;
  hostedZoneId?: string;
  recordName?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListRoute53HealthChecksInRegionRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      arn: S.String,
      hostedZoneId: S.optional(S.String),
      recordName: S.optional(S.String),
      maxResults: S.optional(S.Number),
      nextToken: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "ListRoute53HealthChecksInRegionRequest",
}) as any as S.Schema<ListRoute53HealthChecksInRegionRequest>;
export interface ListRoute53HealthChecksInRegionResponse {
  healthChecks?: Route53HealthCheck[];
  nextToken?: string;
}
export const ListRoute53HealthChecksInRegionResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      healthChecks: S.optional(Route53HealthCheckList),
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListRoute53HealthChecksInRegionResponse",
}) as any as S.Schema<ListRoute53HealthChecksInRegionResponse>;
export interface ListTagsForResourceRequest {
  arn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ UseControlPlaneEndpoint: { value: true } }),
    ),
  ),
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface ListTagsForResourceResponse {
  resourceTags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceTags: S.optional(Tags) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export type RecoveryExecutionId = string;
export interface StartPlanExecutionRequest {
  planArn: string;
  targetRegion: string;
  action: ExecutionAction;
  mode?: ExecutionMode;
  comment?: string;
  latestVersion?: string;
  recoveryExecutionId?: string;
}
export const StartPlanExecutionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    planArn: S.String,
    targetRegion: S.String,
    action: ExecutionAction,
    mode: S.optional(ExecutionMode),
    comment: S.optional(S.String),
    latestVersion: S.optional(S.String),
    recoveryExecutionId: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartPlanExecutionRequest",
}) as any as S.Schema<StartPlanExecutionRequest>;
export interface StartPlanExecutionResponse {
  executionId?: string;
  plan?: string;
  planVersion?: string;
  activateRegion?: string;
  deactivateRegion?: string;
}
export const StartPlanExecutionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    executionId: S.optional(S.String),
    plan: S.optional(S.String),
    planVersion: S.optional(S.String),
    activateRegion: S.optional(S.String),
    deactivateRegion: S.optional(S.String),
  }),
).annotate({
  identifier: "StartPlanExecutionResponse",
}) as any as S.Schema<StartPlanExecutionResponse>;
export interface TagResourceRequest {
  arn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String, tags: Tags }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ UseControlPlaneEndpoint: { value: true } }),
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
  arn: string;
  resourceTagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String, resourceTagKeys: TagKeys }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ UseControlPlaneEndpoint: { value: true } }),
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
export interface UpdatePlanRequest {
  arn: string;
  description?: string;
  workflows: Workflow[];
  executionRole: string;
  recoveryTimeObjectiveMinutes?: number;
  associatedAlarms?: { [key: string]: AssociatedAlarm | undefined };
  triggers?: Trigger[];
  reportConfiguration?: ReportConfiguration;
}
export const UpdatePlanRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    description: S.optional(S.String),
    workflows: WorkflowList,
    executionRole: S.String,
    recoveryTimeObjectiveMinutes: S.optional(S.Number),
    associatedAlarms: S.optional(AssociatedAlarmMap),
    triggers: S.optional(TriggerList),
    reportConfiguration: S.optional(ReportConfiguration),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ UseControlPlaneEndpoint: { value: true } }),
    ),
  ),
).annotate({
  identifier: "UpdatePlanRequest",
}) as any as S.Schema<UpdatePlanRequest>;
export interface UpdatePlanResponse {
  plan?: Plan;
}
export const UpdatePlanResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ plan: S.optional(Plan) }),
).annotate({
  identifier: "UpdatePlanResponse",
}) as any as S.Schema<UpdatePlanResponse>;
export type UpdatePlanExecutionAction =
  | "switchToGraceful"
  | "switchToUngraceful"
  | "pause"
  | "resume"
  | (string & {});
export const UpdatePlanExecutionAction = /*@__PURE__*/ S.String;

export interface UpdatePlanExecutionRequest {
  planArn: string;
  executionId: string;
  action: UpdatePlanExecutionAction;
  comment?: string;
}
export const UpdatePlanExecutionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    planArn: S.String,
    executionId: S.String,
    action: UpdatePlanExecutionAction,
    comment: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdatePlanExecutionRequest",
}) as any as S.Schema<UpdatePlanExecutionRequest>;
export interface UpdatePlanExecutionResponse {}
export const UpdatePlanExecutionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdatePlanExecutionResponse",
}) as any as S.Schema<UpdatePlanExecutionResponse>;
export type UpdatePlanExecutionStepAction =
  | "switchToUngraceful"
  | "skip"
  | (string & {});
export const UpdatePlanExecutionStepAction = /*@__PURE__*/ S.String;

export interface UpdatePlanExecutionStepRequest {
  planArn: string;
  executionId: string;
  comment: string;
  stepName: string;
  actionToTake: UpdatePlanExecutionStepAction;
}
export const UpdatePlanExecutionStepRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    planArn: S.String,
    executionId: S.String,
    comment: S.String,
    stepName: S.String,
    actionToTake: UpdatePlanExecutionStepAction,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdatePlanExecutionStepRequest",
}) as any as S.Schema<UpdatePlanExecutionStepRequest>;
export interface UpdatePlanExecutionStepResponse {}
export const UpdatePlanExecutionStepResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdatePlanExecutionStepResponse",
}) as any as S.Schema<UpdatePlanExecutionStepResponse>;
export type ApprovePlanExecutionStepError =
  | AccessDeniedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Approves a step in a plan execution that requires manual approval. When you create a plan, you can include approval steps that require manual intervention before the execution can proceed. This operation allows you to provide that approval.
 *
 * You must specify the plan ARN, execution ID, step name, and approval status. You can also provide an optional comment explaining the approval decision.
 */
export const approvePlanExecutionStep: API.OperationMethod<
  ApprovePlanExecutionStepRequest,
  ApprovePlanExecutionStepResponse,
  ApprovePlanExecutionStepError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ApprovePlanExecutionStepRequest,
  output: ApprovePlanExecutionStepResponse,
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ApprovePlanExecutionStep",
}));

export type CancelPlanExecutionError =
  | AccessDeniedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Cancels an in-progress plan execution. This operation stops the execution of the plan and prevents any further steps from being processed.
 *
 * You must specify the plan ARN and execution ID. You can also provide an optional comment explaining why the execution was canceled.
 */
export const cancelPlanExecution: API.OperationMethod<
  CancelPlanExecutionRequest,
  CancelPlanExecutionResponse,
  CancelPlanExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelPlanExecutionRequest,
  output: CancelPlanExecutionResponse,
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelPlanExecution",
}));

export type CreatePlanError = CommonErrors;
/**
 * Creates a new Region switch plan. A plan defines the steps required to shift traffic from one Amazon Web Services Region to another.
 *
 * You must specify a name for the plan, the primary Region, and at least one additional Region. You can also provide a description, execution role, recovery time objective, associated alarms, triggers, and workflows that define the steps to execute during a Region switch.
 */
export const createPlan: API.OperationMethod<
  CreatePlanRequest,
  CreatePlanResponse,
  CreatePlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePlanRequest,
  output: CreatePlanResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePlan",
}));

export type DeletePlanError =
  | IllegalStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a Region switch plan. You must specify the ARN of the plan to delete.
 *
 * You cannot delete a plan that has an active execution in progress.
 */
export const deletePlan: API.OperationMethod<
  DeletePlanRequest,
  DeletePlanResponse,
  DeletePlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePlanRequest,
  output: DeletePlanResponse,
  errors: [IllegalStateException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePlan",
}));

export type GetPlanError = ResourceNotFoundException | CommonErrors;
/**
 * Retrieves detailed information about a Region switch plan. You must specify the ARN of the plan.
 */
export const getPlan: API.OperationMethod<
  GetPlanRequest,
  GetPlanResponse,
  GetPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPlanRequest,
  output: GetPlanResponse,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPlan",
}));

export type GetPlanEvaluationStatusError =
  | AccessDeniedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves the evaluation status of a Region switch plan. The evaluation status provides information about the last time the plan was evaluated and any warnings or issues detected.
 */
export const getPlanEvaluationStatus: API.PaginatedOperationMethod<
  GetPlanEvaluationStatusRequest,
  GetPlanEvaluationStatusResponse,
  GetPlanEvaluationStatusError,
  Credentials | HttpClient.HttpClient,
  ResourceWarning
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetPlanEvaluationStatusRequest,
  output: GetPlanEvaluationStatusResponse,
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPlanEvaluationStatus",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "warnings",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetPlanExecutionError =
  | AccessDeniedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific plan execution. You must specify the plan ARN and execution ID.
 */
export const getPlanExecution: API.PaginatedOperationMethod<
  GetPlanExecutionRequest,
  GetPlanExecutionResponse,
  GetPlanExecutionError,
  Credentials | HttpClient.HttpClient,
  StepState
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetPlanExecutionRequest,
  output: GetPlanExecutionResponse,
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPlanExecution",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "stepStates",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetPlanInRegionError =
  | AccessDeniedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves information about a Region switch plan in a specific Amazon Web Services Region. This operation is useful for getting Region-specific information about a plan.
 */
export const getPlanInRegion: API.OperationMethod<
  GetPlanInRegionRequest,
  GetPlanInRegionResponse,
  GetPlanInRegionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPlanInRegionRequest,
  output: GetPlanInRegionResponse,
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPlanInRegion",
}));

export type ListPlanExecutionEventsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the events that occurred during a plan execution. These events provide a detailed timeline of the execution process.
 */
export const listPlanExecutionEvents: API.PaginatedOperationMethod<
  ListPlanExecutionEventsRequest,
  ListPlanExecutionEventsResponse,
  ListPlanExecutionEventsError,
  Credentials | HttpClient.HttpClient,
  ExecutionEvent
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPlanExecutionEventsRequest,
  output: ListPlanExecutionEventsResponse,
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPlanExecutionEvents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPlanExecutionsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the executions of a Region switch plan. This operation returns information about both current and historical executions.
 */
export const listPlanExecutions: API.PaginatedOperationMethod<
  ListPlanExecutionsRequest,
  ListPlanExecutionsResponse,
  ListPlanExecutionsError,
  Credentials | HttpClient.HttpClient,
  AbbreviatedExecution
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPlanExecutionsRequest,
  output: ListPlanExecutionsResponse,
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPlanExecutions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPlansError = CommonErrors;
/**
 * Lists all Region switch plans in your Amazon Web Services account.
 */
export const listPlans: API.PaginatedOperationMethod<
  ListPlansRequest,
  ListPlansResponse,
  ListPlansError,
  Credentials | HttpClient.HttpClient,
  AbbreviatedPlan
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPlansRequest,
  output: ListPlansResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPlans",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "plans",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPlansInRegionError = AccessDeniedException | CommonErrors;
/**
 * Lists all Region switch plans in your Amazon Web Services account that are available in the current Amazon Web Services Region.
 */
export const listPlansInRegion: API.PaginatedOperationMethod<
  ListPlansInRegionRequest,
  ListPlansInRegionResponse,
  ListPlansInRegionError,
  Credentials | HttpClient.HttpClient,
  AbbreviatedPlan
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPlansInRegionRequest,
  output: ListPlansInRegionResponse,
  errors: [AccessDeniedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPlansInRegion",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "plans",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRoute53HealthChecksError =
  | AccessDeniedException
  | IllegalArgumentException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * List the Amazon Route 53 health checks.
 */
export const listRoute53HealthChecks: API.PaginatedOperationMethod<
  ListRoute53HealthChecksRequest,
  ListRoute53HealthChecksResponse,
  ListRoute53HealthChecksError,
  Credentials | HttpClient.HttpClient,
  Route53HealthCheck
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRoute53HealthChecksRequest,
  output: ListRoute53HealthChecksResponse,
  errors: [
    AccessDeniedException,
    IllegalArgumentException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRoute53HealthChecks",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "healthChecks",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRoute53HealthChecksInRegionError =
  | AccessDeniedException
  | IllegalArgumentException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * List the Amazon Route 53 health checks in a specific Amazon Web Services Region.
 */
export const listRoute53HealthChecksInRegion: API.PaginatedOperationMethod<
  ListRoute53HealthChecksInRegionRequest,
  ListRoute53HealthChecksInRegionResponse,
  ListRoute53HealthChecksInRegionError,
  Credentials | HttpClient.HttpClient,
  Route53HealthCheck
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRoute53HealthChecksInRegionRequest,
  output: ListRoute53HealthChecksInRegionResponse,
  errors: [
    AccessDeniedException,
    IllegalArgumentException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRoute53HealthChecksInRegion",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "healthChecks",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the tags attached to a Region switch resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type StartPlanExecutionError =
  | AccessDeniedException
  | IllegalArgumentException
  | IllegalStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Starts the execution of a Region switch plan. You can execute a plan in either `graceful` or `ungraceful` mode.
 *
 * Specifing `ungraceful` mode either changes the behavior of the execution blocks in a workflow or skips specific execution blocks.
 */
export const startPlanExecution: API.OperationMethod<
  StartPlanExecutionRequest,
  StartPlanExecutionResponse,
  StartPlanExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartPlanExecutionRequest,
  output: StartPlanExecutionResponse,
  errors: [
    AccessDeniedException,
    IllegalArgumentException,
    IllegalStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartPlanExecution",
}));

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Adds or updates tags for a Region switch resource. You can assign metadata to your resources in the form of tags, which are key-value pairs.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Removes tags from a Region switch resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdatePlanError = ResourceNotFoundException | CommonErrors;
/**
 * Updates an existing Region switch plan. You can modify the plan's description, workflows, execution role, recovery time objective, associated alarms, and triggers.
 */
export const updatePlan: API.OperationMethod<
  UpdatePlanRequest,
  UpdatePlanResponse,
  UpdatePlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePlanRequest,
  output: UpdatePlanResponse,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePlan",
}));

export type UpdatePlanExecutionError =
  | AccessDeniedException
  | IllegalStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates an in-progress plan execution. This operation allows you to modify certain aspects of the execution, such as adding a comment or changing the action.
 */
export const updatePlanExecution: API.OperationMethod<
  UpdatePlanExecutionRequest,
  UpdatePlanExecutionResponse,
  UpdatePlanExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePlanExecutionRequest,
  output: UpdatePlanExecutionResponse,
  errors: [
    AccessDeniedException,
    IllegalStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePlanExecution",
}));

export type UpdatePlanExecutionStepError =
  | AccessDeniedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates a specific step in an in-progress plan execution. This operation allows you to modify the step's comment or action.
 */
export const updatePlanExecutionStep: API.OperationMethod<
  UpdatePlanExecutionStepRequest,
  UpdatePlanExecutionStepResponse,
  UpdatePlanExecutionStepError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePlanExecutionStepRequest,
  output: UpdatePlanExecutionStepResponse,
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePlanExecutionStep",
}));
