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
  sdkId: "drs",
  serviceShapeName: "ElasticDisasterRecoveryService",
});
const auth = T.AwsAuthSigv4({ name: "drs" });
const ver = T.ServiceVersion("2020-02-26");
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
              `https://drs-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://drs-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://drs.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://drs.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      code: S.optional(S.String),
    },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      code: S.optional(S.String),
      resourceId: S.optional(S.String),
      resourceType: S.optional(S.String),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
    },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      code: S.optional(S.String),
      resourceId: S.optional(S.String),
      resourceType: S.optional(S.String),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      code: S.optional(S.String),
      resourceId: S.optional(S.String),
      resourceType: S.optional(S.String),
      serviceCode: S.optional(S.String),
      quotaCode: S.optional(S.String),
    },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      serviceCode: S.optional(S.String),
      quotaCode: S.optional(S.String),
      retryAfterSeconds: S.optional(S.String).pipe(T.HttpHeader("Retry-After")),
    },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class UninitializedAccountException
  extends /*@__PURE__*/ S.TaggedError<UninitializedAccountException>()(
    "UninitializedAccountException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      code: S.optional(S.String),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      code: S.optional(S.String),
      reason: S.optional(S.String),
      fieldList: S.optional(
        S.suspend(() => ValidationExceptionFieldList).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type SourceNetworkID = string;
export type CfnStackName = string | redacted.Redacted<string>;
export interface AssociateSourceNetworkStackRequest {
  sourceNetworkID: string;
  cfnStackName: string | redacted.Redacted<string>;
}
export const AssociateSourceNetworkStackRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sourceNetworkID: S.String, cfnStackName: SensitiveString }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/AssociateSourceNetworkStack" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateSourceNetworkStackRequest",
}) as any as S.Schema<AssociateSourceNetworkStackRequest>;
export type JobID = string;
export type ARN = string;
export type JobType = string;
export type InitiatedBy = string;
export type ISO8601DatetimeString = string;
export type JobStatus = string;
export type SourceServerID = string;
export type RecoveryInstanceID = string;
export type LaunchStatus = string;
export type LaunchActionId = string;
export type SsmDocumentName = string;
export type LaunchActionType = string;
export type LaunchActionName = string;
export type LaunchActionOrder = number;
export type LaunchActionVersion = string;
export type LaunchActionParameterName = string;
export type LaunchActionParameterValue = string;
export type LaunchActionParameterType = string;
export interface LaunchActionParameter {
  value?: string;
  type?: string;
}
export const LaunchActionParameter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ value: S.optional(S.String), type: S.optional(S.String) }),
).annotate({
  identifier: "LaunchActionParameter",
}) as any as S.Schema<LaunchActionParameter>;
export type LaunchActionParameters = {
  [key: string]: LaunchActionParameter | undefined;
};
export const LaunchActionParameters = /*@__PURE__*/ S.Record(
  S.String,
  LaunchActionParameter.pipe(S.optional),
);
export type LaunchActionDescription = string;
export type LaunchActionCategory = string;
export interface LaunchAction {
  actionId?: string;
  actionCode?: string;
  type?: string;
  name?: string;
  active?: boolean;
  order?: number;
  actionVersion?: string;
  optional?: boolean;
  parameters?: { [key: string]: LaunchActionParameter | undefined };
  description?: string;
  category?: string;
}
export const LaunchAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    actionId: S.optional(S.String),
    actionCode: S.optional(S.String),
    type: S.optional(S.String),
    name: S.optional(S.String),
    active: S.optional(S.Boolean),
    order: S.optional(S.Number),
    actionVersion: S.optional(S.String),
    optional: S.optional(S.Boolean),
    parameters: S.optional(LaunchActionParameters),
    description: S.optional(S.String),
    category: S.optional(S.String),
  }),
).annotate({ identifier: "LaunchAction" }) as any as S.Schema<LaunchAction>;
export type LaunchActionRunId = string;
export type LaunchActionRunStatus = string;
export type FailureReason = string;
export interface LaunchActionRun {
  action?: LaunchAction;
  runId?: string;
  status?: string;
  failureReason?: string;
}
export const LaunchActionRun = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    action: S.optional(LaunchAction),
    runId: S.optional(S.String),
    status: S.optional(S.String),
    failureReason: S.optional(S.String),
  }),
).annotate({
  identifier: "LaunchActionRun",
}) as any as S.Schema<LaunchActionRun>;
export type LaunchActionRuns = LaunchActionRun[];
export const LaunchActionRuns = /*@__PURE__*/ S.Array(LaunchActionRun);
export interface LaunchActionsStatus {
  ssmAgentDiscoveryDatetime?: string;
  runs?: LaunchActionRun[];
}
export const LaunchActionsStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ssmAgentDiscoveryDatetime: S.optional(S.String),
    runs: S.optional(LaunchActionRuns),
  }),
).annotate({
  identifier: "LaunchActionsStatus",
}) as any as S.Schema<LaunchActionsStatus>;
export interface ParticipatingServer {
  sourceServerID?: string;
  recoveryInstanceID?: string;
  launchStatus?: string;
  launchActionsStatus?: LaunchActionsStatus;
}
export const ParticipatingServer = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceServerID: S.optional(S.String),
    recoveryInstanceID: S.optional(S.String),
    launchStatus: S.optional(S.String),
    launchActionsStatus: S.optional(LaunchActionsStatus),
  }),
).annotate({
  identifier: "ParticipatingServer",
}) as any as S.Schema<ParticipatingServer>;
export type ParticipatingServers = ParticipatingServer[];
export const ParticipatingServers = /*@__PURE__*/ S.Array(ParticipatingServer);
export type TagKey = string;
export type TagValue = string;
export type TagsMap = { [key: string]: string | undefined };
export const TagsMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type ParticipatingResourceID = { sourceNetworkID: string };
export const ParticipatingResourceID = /*@__PURE__*/ S.Union([
  S.Struct({ sourceNetworkID: S.String }),
]);
export interface ParticipatingResource {
  participatingResourceID?: ParticipatingResourceID;
  launchStatus?: string;
}
export const ParticipatingResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    participatingResourceID: S.optional(ParticipatingResourceID),
    launchStatus: S.optional(S.String),
  }),
).annotate({
  identifier: "ParticipatingResource",
}) as any as S.Schema<ParticipatingResource>;
export type ParticipatingResources = ParticipatingResource[];
export const ParticipatingResources = /*@__PURE__*/ S.Array(
  ParticipatingResource,
);
export interface Job {
  jobID: string;
  arn?: string;
  type?: string;
  initiatedBy?: string;
  creationDateTime?: string;
  endDateTime?: string;
  status?: string;
  participatingServers?: ParticipatingServer[];
  tags?: { [key: string]: string | undefined };
  participatingResources?: ParticipatingResource[];
}
export const Job = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobID: S.String,
    arn: S.optional(S.String),
    type: S.optional(S.String),
    initiatedBy: S.optional(S.String),
    creationDateTime: S.optional(S.String),
    endDateTime: S.optional(S.String),
    status: S.optional(S.String),
    participatingServers: S.optional(ParticipatingServers),
    tags: S.optional(TagsMap),
    participatingResources: S.optional(ParticipatingResources),
  }),
).annotate({ identifier: "Job" }) as any as S.Schema<Job>;
export interface AssociateSourceNetworkStackResponse {
  job?: Job;
}
export const AssociateSourceNetworkStackResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ job: S.optional(Job) }),
).annotate({
  identifier: "AssociateSourceNetworkStackResponse",
}) as any as S.Schema<AssociateSourceNetworkStackResponse>;
export type SourceServerARN = string;
export interface CreateExtendedSourceServerRequest {
  sourceServerArn: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateExtendedSourceServerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sourceServerArn: S.String, tags: S.optional(TagsMap) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CreateExtendedSourceServer" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateExtendedSourceServerRequest",
}) as any as S.Schema<CreateExtendedSourceServerRequest>;
export type LastLaunchResult = string;
export type ISO8601DurationString = string;
export type BoundedString = string;
export type PositiveInteger = number;
export type VolumeStatus = string;
export interface DataReplicationInfoReplicatedDisk {
  deviceName?: string;
  totalStorageBytes?: number;
  replicatedStorageBytes?: number;
  rescannedStorageBytes?: number;
  backloggedStorageBytes?: number;
  volumeStatus?: string;
}
export const DataReplicationInfoReplicatedDisk = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deviceName: S.optional(S.String),
    totalStorageBytes: S.optional(S.Number),
    replicatedStorageBytes: S.optional(S.Number),
    rescannedStorageBytes: S.optional(S.Number),
    backloggedStorageBytes: S.optional(S.Number),
    volumeStatus: S.optional(S.String),
  }),
).annotate({
  identifier: "DataReplicationInfoReplicatedDisk",
}) as any as S.Schema<DataReplicationInfoReplicatedDisk>;
export type DataReplicationInfoReplicatedDisks =
  DataReplicationInfoReplicatedDisk[];
export const DataReplicationInfoReplicatedDisks = /*@__PURE__*/ S.Array(
  DataReplicationInfoReplicatedDisk,
);
export type DataReplicationState = string;
export type DataReplicationInitiationStepName = string;
export type DataReplicationInitiationStepStatus = string;
export interface DataReplicationInitiationStep {
  name?: string;
  status?: string;
}
export const DataReplicationInitiationStep = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(S.String), status: S.optional(S.String) }),
).annotate({
  identifier: "DataReplicationInitiationStep",
}) as any as S.Schema<DataReplicationInitiationStep>;
export type DataReplicationInitiationSteps = DataReplicationInitiationStep[];
export const DataReplicationInitiationSteps = /*@__PURE__*/ S.Array(
  DataReplicationInitiationStep,
);
export interface DataReplicationInitiation {
  startDateTime?: string;
  nextAttemptDateTime?: string;
  steps?: DataReplicationInitiationStep[];
}
export const DataReplicationInitiation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    startDateTime: S.optional(S.String),
    nextAttemptDateTime: S.optional(S.String),
    steps: S.optional(DataReplicationInitiationSteps),
  }),
).annotate({
  identifier: "DataReplicationInitiation",
}) as any as S.Schema<DataReplicationInitiation>;
export type DataReplicationErrorString = string;
export type LargeBoundedString = string;
export interface DataReplicationError {
  error?: string;
  rawError?: string;
}
export const DataReplicationError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ error: S.optional(S.String), rawError: S.optional(S.String) }),
).annotate({
  identifier: "DataReplicationError",
}) as any as S.Schema<DataReplicationError>;
export type AwsAvailabilityZone = string;
export type OutpostARN = string;
export interface DataReplicationInfo {
  lagDuration?: string;
  etaDateTime?: string;
  replicatedDisks?: DataReplicationInfoReplicatedDisk[];
  dataReplicationState?: string;
  dataReplicationInitiation?: DataReplicationInitiation;
  dataReplicationError?: DataReplicationError;
  stagingAvailabilityZone?: string;
  stagingOutpostArn?: string;
}
export const DataReplicationInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    lagDuration: S.optional(S.String),
    etaDateTime: S.optional(S.String),
    replicatedDisks: S.optional(DataReplicationInfoReplicatedDisks),
    dataReplicationState: S.optional(S.String),
    dataReplicationInitiation: S.optional(DataReplicationInitiation),
    dataReplicationError: S.optional(DataReplicationError),
    stagingAvailabilityZone: S.optional(S.String),
    stagingOutpostArn: S.optional(S.String),
  }),
).annotate({
  identifier: "DataReplicationInfo",
}) as any as S.Schema<DataReplicationInfo>;
export type LastLaunchType = string;
export interface LifeCycleLastLaunchInitiated {
  apiCallDateTime?: string;
  jobID?: string;
  type?: string;
}
export const LifeCycleLastLaunchInitiated = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    apiCallDateTime: S.optional(S.String),
    jobID: S.optional(S.String),
    type: S.optional(S.String),
  }),
).annotate({
  identifier: "LifeCycleLastLaunchInitiated",
}) as any as S.Schema<LifeCycleLastLaunchInitiated>;
export interface LifeCycleLastLaunch {
  initiated?: LifeCycleLastLaunchInitiated;
  status?: string;
}
export const LifeCycleLastLaunch = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    initiated: S.optional(LifeCycleLastLaunchInitiated),
    status: S.optional(S.String),
  }),
).annotate({
  identifier: "LifeCycleLastLaunch",
}) as any as S.Schema<LifeCycleLastLaunch>;
export interface LifeCycle {
  addedToServiceDateTime?: string;
  firstByteDateTime?: string;
  elapsedReplicationDuration?: string;
  lastSeenByServiceDateTime?: string;
  lastLaunch?: LifeCycleLastLaunch;
}
export const LifeCycle = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    addedToServiceDateTime: S.optional(S.String),
    firstByteDateTime: S.optional(S.String),
    elapsedReplicationDuration: S.optional(S.String),
    lastSeenByServiceDateTime: S.optional(S.String),
    lastLaunch: S.optional(LifeCycleLastLaunch),
  }),
).annotate({ identifier: "LifeCycle" }) as any as S.Schema<LifeCycle>;
export type EC2InstanceType = string;
export type EC2InstanceID = string;
export interface IdentificationHints {
  fqdn?: string;
  hostname?: string;
  vmWareUuid?: string;
  awsInstanceID?: string;
}
export const IdentificationHints = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fqdn: S.optional(S.String),
    hostname: S.optional(S.String),
    vmWareUuid: S.optional(S.String),
    awsInstanceID: S.optional(S.String),
  }),
).annotate({
  identifier: "IdentificationHints",
}) as any as S.Schema<IdentificationHints>;
export type IPsList = string[];
export const IPsList = /*@__PURE__*/ S.Array(S.String);
export interface NetworkInterface {
  macAddress?: string;
  ips?: string[];
  isPrimary?: boolean;
}
export const NetworkInterface = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    macAddress: S.optional(S.String),
    ips: S.optional(IPsList),
    isPrimary: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "NetworkInterface",
}) as any as S.Schema<NetworkInterface>;
export type NetworkInterfaces = NetworkInterface[];
export const NetworkInterfaces = /*@__PURE__*/ S.Array(NetworkInterface);
export interface Disk {
  deviceName?: string;
  bytes?: number;
}
export const Disk = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ deviceName: S.optional(S.String), bytes: S.optional(S.Number) }),
).annotate({ identifier: "Disk" }) as any as S.Schema<Disk>;
export type Disks = Disk[];
export const Disks = /*@__PURE__*/ S.Array(Disk);
export interface CPU {
  cores?: number;
  modelName?: string;
}
export const CPU = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ cores: S.optional(S.Number), modelName: S.optional(S.String) }),
).annotate({ identifier: "CPU" }) as any as S.Schema<CPU>;
export type Cpus = CPU[];
export const Cpus = /*@__PURE__*/ S.Array(CPU);
export interface OS {
  fullString?: string;
}
export const OS = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ fullString: S.optional(S.String) }),
).annotate({ identifier: "OS" }) as any as S.Schema<OS>;
export interface SourceProperties {
  lastUpdatedDateTime?: string;
  recommendedInstanceType?: string;
  identificationHints?: IdentificationHints;
  networkInterfaces?: NetworkInterface[];
  disks?: Disk[];
  cpus?: CPU[];
  ramBytes?: number;
  os?: OS;
  supportsNitroInstances?: boolean;
}
export const SourceProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    lastUpdatedDateTime: S.optional(S.String),
    recommendedInstanceType: S.optional(S.String),
    identificationHints: S.optional(IdentificationHints),
    networkInterfaces: S.optional(NetworkInterfaces),
    disks: S.optional(Disks),
    cpus: S.optional(Cpus),
    ramBytes: S.optional(S.Number),
    os: S.optional(OS),
    supportsNitroInstances: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "SourceProperties",
}) as any as S.Schema<SourceProperties>;
export type ExtensionStatus = string;
export type AccountID = string;
export interface StagingArea {
  status?: string;
  stagingAccountID?: string;
  stagingSourceServerArn?: string;
  errorMessage?: string;
}
export const StagingArea = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.optional(S.String),
    stagingAccountID: S.optional(S.String),
    stagingSourceServerArn: S.optional(S.String),
    errorMessage: S.optional(S.String),
  }),
).annotate({ identifier: "StagingArea" }) as any as S.Schema<StagingArea>;
export type AwsRegion = string;
export interface SourceCloudProperties {
  originAccountID?: string;
  originRegion?: string;
  originAvailabilityZone?: string;
  sourceOutpostArn?: string;
}
export const SourceCloudProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    originAccountID: S.optional(S.String),
    originRegion: S.optional(S.String),
    originAvailabilityZone: S.optional(S.String),
    sourceOutpostArn: S.optional(S.String),
  }),
).annotate({
  identifier: "SourceCloudProperties",
}) as any as S.Schema<SourceCloudProperties>;
export type ReplicationDirection = string;
export type AgentVersion = string;
export interface SourceServer {
  sourceServerID?: string;
  arn?: string;
  tags?: { [key: string]: string | undefined };
  recoveryInstanceId?: string;
  lastLaunchResult?: string;
  dataReplicationInfo?: DataReplicationInfo;
  lifeCycle?: LifeCycle;
  sourceProperties?: SourceProperties;
  stagingArea?: StagingArea;
  sourceCloudProperties?: SourceCloudProperties;
  replicationDirection?: string;
  reversedDirectionSourceServerArn?: string;
  sourceNetworkID?: string;
  agentVersion?: string;
}
export const SourceServer = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceServerID: S.optional(S.String),
    arn: S.optional(S.String),
    tags: S.optional(TagsMap),
    recoveryInstanceId: S.optional(S.String),
    lastLaunchResult: S.optional(S.String),
    dataReplicationInfo: S.optional(DataReplicationInfo),
    lifeCycle: S.optional(LifeCycle),
    sourceProperties: S.optional(SourceProperties),
    stagingArea: S.optional(StagingArea),
    sourceCloudProperties: S.optional(SourceCloudProperties),
    replicationDirection: S.optional(S.String),
    reversedDirectionSourceServerArn: S.optional(S.String),
    sourceNetworkID: S.optional(S.String),
    agentVersion: S.optional(S.String),
  }),
).annotate({ identifier: "SourceServer" }) as any as S.Schema<SourceServer>;
export interface CreateExtendedSourceServerResponse {
  sourceServer?: SourceServer;
}
export const CreateExtendedSourceServerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sourceServer: S.optional(SourceServer) }),
).annotate({
  identifier: "CreateExtendedSourceServerResponse",
}) as any as S.Schema<CreateExtendedSourceServerResponse>;
export type LaunchDisposition = string;
export type TargetInstanceTypeRightSizingMethod = string;
export interface Licensing {
  osByol?: boolean;
}
export const Licensing = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ osByol: S.optional(S.Boolean) }),
).annotate({ identifier: "Licensing" }) as any as S.Schema<Licensing>;
export interface CreateLaunchConfigurationTemplateRequest {
  tags?: { [key: string]: string | undefined };
  launchDisposition?: string;
  targetInstanceTypeRightSizingMethod?: string;
  copyPrivateIp?: boolean;
  copyTags?: boolean;
  licensing?: Licensing;
  exportBucketArn?: string;
  postLaunchEnabled?: boolean;
  launchIntoSourceInstance?: boolean;
}
export const CreateLaunchConfigurationTemplateRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      tags: S.optional(TagsMap),
      launchDisposition: S.optional(S.String),
      targetInstanceTypeRightSizingMethod: S.optional(S.String),
      copyPrivateIp: S.optional(S.Boolean),
      copyTags: S.optional(S.Boolean),
      licensing: S.optional(Licensing),
      exportBucketArn: S.optional(S.String),
      postLaunchEnabled: S.optional(S.Boolean),
      launchIntoSourceInstance: S.optional(S.Boolean),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/CreateLaunchConfigurationTemplate" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateLaunchConfigurationTemplateRequest",
}) as any as S.Schema<CreateLaunchConfigurationTemplateRequest>;
export type LaunchConfigurationTemplateID = string;
export interface LaunchConfigurationTemplate {
  launchConfigurationTemplateID?: string;
  arn?: string;
  tags?: { [key: string]: string | undefined };
  launchDisposition?: string;
  targetInstanceTypeRightSizingMethod?: string;
  copyPrivateIp?: boolean;
  copyTags?: boolean;
  licensing?: Licensing;
  exportBucketArn?: string;
  postLaunchEnabled?: boolean;
  launchIntoSourceInstance?: boolean;
}
export const LaunchConfigurationTemplate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    launchConfigurationTemplateID: S.optional(S.String),
    arn: S.optional(S.String),
    tags: S.optional(TagsMap),
    launchDisposition: S.optional(S.String),
    targetInstanceTypeRightSizingMethod: S.optional(S.String),
    copyPrivateIp: S.optional(S.Boolean),
    copyTags: S.optional(S.Boolean),
    licensing: S.optional(Licensing),
    exportBucketArn: S.optional(S.String),
    postLaunchEnabled: S.optional(S.Boolean),
    launchIntoSourceInstance: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "LaunchConfigurationTemplate",
}) as any as S.Schema<LaunchConfigurationTemplate>;
export interface CreateLaunchConfigurationTemplateResponse {
  launchConfigurationTemplate?: LaunchConfigurationTemplate;
}
export const CreateLaunchConfigurationTemplateResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      launchConfigurationTemplate: S.optional(LaunchConfigurationTemplate),
    }),
  ).annotate({
    identifier: "CreateLaunchConfigurationTemplateResponse",
  }) as any as S.Schema<CreateLaunchConfigurationTemplateResponse>;
export type SubnetID = string;
export type SecurityGroupID = string;
export type ReplicationServersSecurityGroupsIDs = string[];
export const ReplicationServersSecurityGroupsIDs = /*@__PURE__*/ S.Array(
  S.String,
);
export type ReplicationConfigurationDefaultLargeStagingDiskType = string;
export type ReplicationConfigurationEbsEncryption = string;
export type ReplicationConfigurationDataPlaneRouting = string;
export type PITPolicyRuleUnits = string;
export type StrictlyPositiveInteger = number;
export interface PITPolicyRule {
  ruleID?: number;
  units: string;
  interval: number;
  retentionDuration: number;
  enabled?: boolean;
}
export const PITPolicyRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ruleID: S.optional(S.Number),
    units: S.String,
    interval: S.Number,
    retentionDuration: S.Number,
    enabled: S.optional(S.Boolean),
  }),
).annotate({ identifier: "PITPolicyRule" }) as any as S.Schema<PITPolicyRule>;
export type PITPolicy = PITPolicyRule[];
export const PITPolicy = /*@__PURE__*/ S.Array(PITPolicyRule);
export type InternetProtocol = string;
export interface CreateReplicationConfigurationTemplateRequest {
  stagingAreaSubnetId: string;
  associateDefaultSecurityGroup?: boolean;
  replicationServersSecurityGroupsIDs: string[];
  replicationServerInstanceType?: string;
  useDedicatedReplicationServer?: boolean;
  defaultLargeStagingDiskType?: string;
  ebsEncryption: string;
  ebsEncryptionKeyArn?: string;
  bandwidthThrottling: number;
  dataPlaneRouting?: string;
  createPublicIP?: boolean;
  stagingAreaTags: { [key: string]: string | undefined };
  pitPolicy: PITPolicyRule[];
  tags?: { [key: string]: string | undefined };
  autoReplicateNewDisks?: boolean;
  internetProtocol?: string;
}
export const CreateReplicationConfigurationTemplateRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      stagingAreaSubnetId: S.String,
      associateDefaultSecurityGroup: S.optional(S.Boolean),
      replicationServersSecurityGroupsIDs: ReplicationServersSecurityGroupsIDs,
      replicationServerInstanceType: S.optional(S.String),
      useDedicatedReplicationServer: S.optional(S.Boolean),
      defaultLargeStagingDiskType: S.optional(S.String),
      ebsEncryption: S.String,
      ebsEncryptionKeyArn: S.optional(S.String),
      bandwidthThrottling: S.Number,
      dataPlaneRouting: S.optional(S.String),
      createPublicIP: S.optional(S.Boolean),
      stagingAreaTags: TagsMap,
      pitPolicy: PITPolicy,
      tags: S.optional(TagsMap),
      autoReplicateNewDisks: S.optional(S.Boolean),
      internetProtocol: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/CreateReplicationConfigurationTemplate",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "CreateReplicationConfigurationTemplateRequest",
  }) as any as S.Schema<CreateReplicationConfigurationTemplateRequest>;
export type ReplicationConfigurationTemplateID = string;
export interface ReplicationConfigurationTemplate {
  replicationConfigurationTemplateID: string;
  arn?: string;
  stagingAreaSubnetId?: string;
  associateDefaultSecurityGroup?: boolean;
  replicationServersSecurityGroupsIDs?: string[];
  replicationServerInstanceType?: string;
  useDedicatedReplicationServer?: boolean;
  defaultLargeStagingDiskType?: string;
  ebsEncryption?: string;
  ebsEncryptionKeyArn?: string;
  bandwidthThrottling?: number;
  dataPlaneRouting?: string;
  createPublicIP?: boolean;
  stagingAreaTags?: { [key: string]: string | undefined };
  tags?: { [key: string]: string | undefined };
  pitPolicy?: PITPolicyRule[];
  autoReplicateNewDisks?: boolean;
  internetProtocol?: string;
}
export const ReplicationConfigurationTemplate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    replicationConfigurationTemplateID: S.String,
    arn: S.optional(S.String),
    stagingAreaSubnetId: S.optional(S.String),
    associateDefaultSecurityGroup: S.optional(S.Boolean),
    replicationServersSecurityGroupsIDs: S.optional(
      ReplicationServersSecurityGroupsIDs,
    ),
    replicationServerInstanceType: S.optional(S.String),
    useDedicatedReplicationServer: S.optional(S.Boolean),
    defaultLargeStagingDiskType: S.optional(S.String),
    ebsEncryption: S.optional(S.String),
    ebsEncryptionKeyArn: S.optional(S.String),
    bandwidthThrottling: S.optional(S.Number),
    dataPlaneRouting: S.optional(S.String),
    createPublicIP: S.optional(S.Boolean),
    stagingAreaTags: S.optional(TagsMap),
    tags: S.optional(TagsMap),
    pitPolicy: S.optional(PITPolicy),
    autoReplicateNewDisks: S.optional(S.Boolean),
    internetProtocol: S.optional(S.String),
  }),
).annotate({
  identifier: "ReplicationConfigurationTemplate",
}) as any as S.Schema<ReplicationConfigurationTemplate>;
export type VpcID = string;
export interface CreateSourceNetworkRequest {
  vpcID: string;
  originAccountID: string;
  originRegion: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateSourceNetworkRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vpcID: S.String,
    originAccountID: S.String,
    originRegion: S.String,
    tags: S.optional(TagsMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CreateSourceNetwork" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateSourceNetworkRequest",
}) as any as S.Schema<CreateSourceNetworkRequest>;
export interface CreateSourceNetworkResponse {
  sourceNetworkID?: string;
}
export const CreateSourceNetworkResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sourceNetworkID: S.optional(S.String) }),
).annotate({
  identifier: "CreateSourceNetworkResponse",
}) as any as S.Schema<CreateSourceNetworkResponse>;
export interface DeleteJobRequest {
  jobID: string;
}
export const DeleteJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobID: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeleteJob" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteJobRequest",
}) as any as S.Schema<DeleteJobRequest>;
export interface DeleteJobResponse {}
export const DeleteJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteJobResponse",
}) as any as S.Schema<DeleteJobResponse>;
export type LaunchActionResourceId = string;
export interface DeleteLaunchActionRequest {
  resourceId: string;
  actionId: string;
}
export const DeleteLaunchActionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceId: S.String, actionId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeleteLaunchAction" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteLaunchActionRequest",
}) as any as S.Schema<DeleteLaunchActionRequest>;
export interface DeleteLaunchActionResponse {}
export const DeleteLaunchActionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteLaunchActionResponse",
}) as any as S.Schema<DeleteLaunchActionResponse>;
export interface DeleteLaunchConfigurationTemplateRequest {
  launchConfigurationTemplateID: string;
}
export const DeleteLaunchConfigurationTemplateRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ launchConfigurationTemplateID: S.String }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/DeleteLaunchConfigurationTemplate" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteLaunchConfigurationTemplateRequest",
}) as any as S.Schema<DeleteLaunchConfigurationTemplateRequest>;
export interface DeleteLaunchConfigurationTemplateResponse {}
export const DeleteLaunchConfigurationTemplateResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "DeleteLaunchConfigurationTemplateResponse",
  }) as any as S.Schema<DeleteLaunchConfigurationTemplateResponse>;
export interface DeleteRecoveryInstanceRequest {
  recoveryInstanceID: string;
}
export const DeleteRecoveryInstanceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ recoveryInstanceID: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeleteRecoveryInstance" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteRecoveryInstanceRequest",
}) as any as S.Schema<DeleteRecoveryInstanceRequest>;
export interface DeleteRecoveryInstanceResponse {}
export const DeleteRecoveryInstanceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteRecoveryInstanceResponse",
}) as any as S.Schema<DeleteRecoveryInstanceResponse>;
export interface DeleteReplicationConfigurationTemplateRequest {
  replicationConfigurationTemplateID: string;
}
export const DeleteReplicationConfigurationTemplateRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ replicationConfigurationTemplateID: S.String }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/DeleteReplicationConfigurationTemplate",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DeleteReplicationConfigurationTemplateRequest",
  }) as any as S.Schema<DeleteReplicationConfigurationTemplateRequest>;
export interface DeleteReplicationConfigurationTemplateResponse {}
export const DeleteReplicationConfigurationTemplateResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "DeleteReplicationConfigurationTemplateResponse",
  }) as any as S.Schema<DeleteReplicationConfigurationTemplateResponse>;
export interface DeleteSourceNetworkRequest {
  sourceNetworkID: string;
}
export const DeleteSourceNetworkRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sourceNetworkID: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeleteSourceNetwork" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSourceNetworkRequest",
}) as any as S.Schema<DeleteSourceNetworkRequest>;
export interface DeleteSourceNetworkResponse {}
export const DeleteSourceNetworkResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteSourceNetworkResponse",
}) as any as S.Schema<DeleteSourceNetworkResponse>;
export interface DeleteSourceServerRequest {
  sourceServerID: string;
}
export const DeleteSourceServerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sourceServerID: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeleteSourceServer" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSourceServerRequest",
}) as any as S.Schema<DeleteSourceServerRequest>;
export interface DeleteSourceServerResponse {}
export const DeleteSourceServerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteSourceServerResponse",
}) as any as S.Schema<DeleteSourceServerResponse>;
export type PaginationToken = string;
export interface DescribeJobLogItemsRequest {
  jobID: string;
  maxResults?: number;
  nextToken?: string;
}
export const DescribeJobLogItemsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobID: S.String,
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DescribeJobLogItems" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeJobLogItemsRequest",
}) as any as S.Schema<DescribeJobLogItemsRequest>;
export type JobLogEvent = string;
export type EbsSnapshot = string;
export type ConversionMap = { [key: string]: string | undefined };
export const ConversionMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type VolumeToConversionMap = {
  [key: string]: { [key: string]: string | undefined } | undefined;
};
export const VolumeToConversionMap = /*@__PURE__*/ S.Record(
  S.String,
  ConversionMap.pipe(S.optional),
);
export type VolumeToSizeMap = { [key: string]: number | undefined };
export const VolumeToSizeMap = /*@__PURE__*/ S.Record(
  S.String,
  S.Number.pipe(S.optional),
);
export type ProductCodeId = string;
export type ProductCodeMode = string;
export interface ProductCode {
  productCodeId?: string;
  productCodeMode?: string;
}
export const ProductCode = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    productCodeId: S.optional(S.String),
    productCodeMode: S.optional(S.String),
  }),
).annotate({ identifier: "ProductCode" }) as any as S.Schema<ProductCode>;
export type ProductCodes = ProductCode[];
export const ProductCodes = /*@__PURE__*/ S.Array(ProductCode);
export type VolumeToProductCodes = { [key: string]: ProductCode[] | undefined };
export const VolumeToProductCodes = /*@__PURE__*/ S.Record(
  S.String,
  ProductCodes.pipe(S.optional),
);
export interface ConversionProperties {
  volumeToConversionMap?: {
    [key: string]: { [key: string]: string | undefined } | undefined;
  };
  rootVolumeName?: string;
  forceUefi?: boolean;
  dataTimestamp?: string;
  volumeToVolumeSize?: { [key: string]: number | undefined };
  volumeToProductCodes?: { [key: string]: ProductCode[] | undefined };
}
export const ConversionProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    volumeToConversionMap: S.optional(VolumeToConversionMap),
    rootVolumeName: S.optional(S.String),
    forceUefi: S.optional(S.Boolean),
    dataTimestamp: S.optional(S.String),
    volumeToVolumeSize: S.optional(VolumeToSizeMap),
    volumeToProductCodes: S.optional(VolumeToProductCodes),
  }),
).annotate({
  identifier: "ConversionProperties",
}) as any as S.Schema<ConversionProperties>;
export interface SourceNetworkData {
  sourceNetworkID?: string;
  sourceVpc?: string;
  targetVpc?: string;
  stackName?: string;
}
export const SourceNetworkData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceNetworkID: S.optional(S.String),
    sourceVpc: S.optional(S.String),
    targetVpc: S.optional(S.String),
    stackName: S.optional(S.String),
  }),
).annotate({
  identifier: "SourceNetworkData",
}) as any as S.Schema<SourceNetworkData>;
export type EventResourceData = { sourceNetworkData: SourceNetworkData };
export const EventResourceData = /*@__PURE__*/ S.Union([
  S.Struct({ sourceNetworkData: SourceNetworkData }),
]);
export type JobEventAttemptCount = number;
export interface JobLogEventData {
  sourceServerID?: string;
  conversionServerID?: string;
  targetInstanceID?: string;
  rawError?: string;
  conversionProperties?: ConversionProperties;
  eventResourceData?: EventResourceData;
  attemptCount?: number;
  maxAttemptsCount?: number;
}
export const JobLogEventData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceServerID: S.optional(S.String),
    conversionServerID: S.optional(S.String),
    targetInstanceID: S.optional(S.String),
    rawError: S.optional(S.String),
    conversionProperties: S.optional(ConversionProperties),
    eventResourceData: S.optional(EventResourceData),
    attemptCount: S.optional(S.Number),
    maxAttemptsCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "JobLogEventData",
}) as any as S.Schema<JobLogEventData>;
export interface JobLog {
  logDateTime?: string;
  event?: string;
  eventData?: JobLogEventData;
}
export const JobLog = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    logDateTime: S.optional(S.String),
    event: S.optional(S.String),
    eventData: S.optional(JobLogEventData),
  }),
).annotate({ identifier: "JobLog" }) as any as S.Schema<JobLog>;
export type JobLogs = JobLog[];
export const JobLogs = /*@__PURE__*/ S.Array(JobLog);
export interface DescribeJobLogItemsResponse {
  items?: JobLog[];
  nextToken?: string;
}
export const DescribeJobLogItemsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ items: S.optional(JobLogs), nextToken: S.optional(S.String) }),
).annotate({
  identifier: "DescribeJobLogItemsResponse",
}) as any as S.Schema<DescribeJobLogItemsResponse>;
export type DescribeJobsRequestFiltersJobIDs = string[];
export const DescribeJobsRequestFiltersJobIDs = /*@__PURE__*/ S.Array(S.String);
export interface DescribeJobsRequestFilters {
  jobIDs?: string[];
  fromDate?: string;
  toDate?: string;
}
export const DescribeJobsRequestFilters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobIDs: S.optional(DescribeJobsRequestFiltersJobIDs),
    fromDate: S.optional(S.String),
    toDate: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeJobsRequestFilters",
}) as any as S.Schema<DescribeJobsRequestFilters>;
export interface DescribeJobsRequest {
  filters?: DescribeJobsRequestFilters;
  maxResults?: number;
  nextToken?: string;
}
export const DescribeJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    filters: S.optional(DescribeJobsRequestFilters),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DescribeJobs" }),
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
export type JobsList = Job[];
export const JobsList = /*@__PURE__*/ S.Array(Job);
export interface DescribeJobsResponse {
  items?: Job[];
  nextToken?: string;
}
export const DescribeJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ items: S.optional(JobsList), nextToken: S.optional(S.String) }),
).annotate({
  identifier: "DescribeJobsResponse",
}) as any as S.Schema<DescribeJobsResponse>;
export type LaunchConfigurationTemplateIDs = string[];
export const LaunchConfigurationTemplateIDs = /*@__PURE__*/ S.Array(S.String);
export type MaxResultsType = number;
export interface DescribeLaunchConfigurationTemplatesRequest {
  launchConfigurationTemplateIDs?: string[];
  maxResults?: number;
  nextToken?: string;
}
export const DescribeLaunchConfigurationTemplatesRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      launchConfigurationTemplateIDs: S.optional(
        LaunchConfigurationTemplateIDs,
      ),
      maxResults: S.optional(S.Number),
      nextToken: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/DescribeLaunchConfigurationTemplates",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DescribeLaunchConfigurationTemplatesRequest",
  }) as any as S.Schema<DescribeLaunchConfigurationTemplatesRequest>;
export type LaunchConfigurationTemplates = LaunchConfigurationTemplate[];
export const LaunchConfigurationTemplates = /*@__PURE__*/ S.Array(
  LaunchConfigurationTemplate,
);
export interface DescribeLaunchConfigurationTemplatesResponse {
  items?: LaunchConfigurationTemplate[];
  nextToken?: string;
}
export const DescribeLaunchConfigurationTemplatesResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      items: S.optional(LaunchConfigurationTemplates),
      nextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "DescribeLaunchConfigurationTemplatesResponse",
  }) as any as S.Schema<DescribeLaunchConfigurationTemplatesResponse>;
export type RecoveryInstanceIDs = string[];
export const RecoveryInstanceIDs = /*@__PURE__*/ S.Array(S.String);
export type SourceServerIDs = string[];
export const SourceServerIDs = /*@__PURE__*/ S.Array(S.String);
export interface DescribeRecoveryInstancesRequestFilters {
  recoveryInstanceIDs?: string[];
  sourceServerIDs?: string[];
}
export const DescribeRecoveryInstancesRequestFilters = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      recoveryInstanceIDs: S.optional(RecoveryInstanceIDs),
      sourceServerIDs: S.optional(SourceServerIDs),
    }),
).annotate({
  identifier: "DescribeRecoveryInstancesRequestFilters",
}) as any as S.Schema<DescribeRecoveryInstancesRequestFilters>;
export interface DescribeRecoveryInstancesRequest {
  filters?: DescribeRecoveryInstancesRequestFilters;
  maxResults?: number;
  nextToken?: string;
}
export const DescribeRecoveryInstancesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    filters: S.optional(DescribeRecoveryInstancesRequestFilters),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DescribeRecoveryInstances" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeRecoveryInstancesRequest",
}) as any as S.Schema<DescribeRecoveryInstancesRequest>;
export type EC2InstanceState = string;
export type FailbackState = string;
export type FailbackLaunchType = string;
export interface RecoveryInstanceFailback {
  failbackClientID?: string;
  failbackJobID?: string;
  failbackInitiationTime?: string;
  state?: string;
  agentLastSeenByServiceDateTime?: string;
  failbackClientLastSeenByServiceDateTime?: string;
  failbackToOriginalServer?: boolean;
  firstByteDateTime?: string;
  elapsedReplicationDuration?: string;
  failbackLaunchType?: string;
}
export const RecoveryInstanceFailback = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    failbackClientID: S.optional(S.String),
    failbackJobID: S.optional(S.String),
    failbackInitiationTime: S.optional(S.String),
    state: S.optional(S.String),
    agentLastSeenByServiceDateTime: S.optional(S.String),
    failbackClientLastSeenByServiceDateTime: S.optional(S.String),
    failbackToOriginalServer: S.optional(S.Boolean),
    firstByteDateTime: S.optional(S.String),
    elapsedReplicationDuration: S.optional(S.String),
    failbackLaunchType: S.optional(S.String),
  }),
).annotate({
  identifier: "RecoveryInstanceFailback",
}) as any as S.Schema<RecoveryInstanceFailback>;
export interface RecoveryInstanceDataReplicationInfoReplicatedDisk {
  deviceName?: string;
  totalStorageBytes?: number;
  replicatedStorageBytes?: number;
  rescannedStorageBytes?: number;
  backloggedStorageBytes?: number;
}
export const RecoveryInstanceDataReplicationInfoReplicatedDisk =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      deviceName: S.optional(S.String),
      totalStorageBytes: S.optional(S.Number),
      replicatedStorageBytes: S.optional(S.Number),
      rescannedStorageBytes: S.optional(S.Number),
      backloggedStorageBytes: S.optional(S.Number),
    }),
  ).annotate({
    identifier: "RecoveryInstanceDataReplicationInfoReplicatedDisk",
  }) as any as S.Schema<RecoveryInstanceDataReplicationInfoReplicatedDisk>;
export type RecoveryInstanceDataReplicationInfoReplicatedDisks =
  RecoveryInstanceDataReplicationInfoReplicatedDisk[];
export const RecoveryInstanceDataReplicationInfoReplicatedDisks =
  /*@__PURE__*/ S.Array(RecoveryInstanceDataReplicationInfoReplicatedDisk);
export type RecoveryInstanceDataReplicationState = string;
export type RecoveryInstanceDataReplicationInitiationStepName = string;
export type RecoveryInstanceDataReplicationInitiationStepStatus = string;
export interface RecoveryInstanceDataReplicationInitiationStep {
  name?: string;
  status?: string;
}
export const RecoveryInstanceDataReplicationInitiationStep =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ name: S.optional(S.String), status: S.optional(S.String) }),
  ).annotate({
    identifier: "RecoveryInstanceDataReplicationInitiationStep",
  }) as any as S.Schema<RecoveryInstanceDataReplicationInitiationStep>;
export type RecoveryInstanceDataReplicationInitiationSteps =
  RecoveryInstanceDataReplicationInitiationStep[];
export const RecoveryInstanceDataReplicationInitiationSteps =
  /*@__PURE__*/ S.Array(RecoveryInstanceDataReplicationInitiationStep);
export interface RecoveryInstanceDataReplicationInitiation {
  startDateTime?: string;
  steps?: RecoveryInstanceDataReplicationInitiationStep[];
}
export const RecoveryInstanceDataReplicationInitiation =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      startDateTime: S.optional(S.String),
      steps: S.optional(RecoveryInstanceDataReplicationInitiationSteps),
    }),
  ).annotate({
    identifier: "RecoveryInstanceDataReplicationInitiation",
  }) as any as S.Schema<RecoveryInstanceDataReplicationInitiation>;
export type FailbackReplicationError = string;
export interface RecoveryInstanceDataReplicationError {
  error?: string;
  rawError?: string;
}
export const RecoveryInstanceDataReplicationError = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ error: S.optional(S.String), rawError: S.optional(S.String) }),
).annotate({
  identifier: "RecoveryInstanceDataReplicationError",
}) as any as S.Schema<RecoveryInstanceDataReplicationError>;
export interface RecoveryInstanceDataReplicationInfo {
  lagDuration?: string;
  etaDateTime?: string;
  replicatedDisks?: RecoveryInstanceDataReplicationInfoReplicatedDisk[];
  dataReplicationState?: string;
  dataReplicationInitiation?: RecoveryInstanceDataReplicationInitiation;
  dataReplicationError?: RecoveryInstanceDataReplicationError;
  stagingAvailabilityZone?: string;
  stagingOutpostArn?: string;
}
export const RecoveryInstanceDataReplicationInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    lagDuration: S.optional(S.String),
    etaDateTime: S.optional(S.String),
    replicatedDisks: S.optional(
      RecoveryInstanceDataReplicationInfoReplicatedDisks,
    ),
    dataReplicationState: S.optional(S.String),
    dataReplicationInitiation: S.optional(
      RecoveryInstanceDataReplicationInitiation,
    ),
    dataReplicationError: S.optional(RecoveryInstanceDataReplicationError),
    stagingAvailabilityZone: S.optional(S.String),
    stagingOutpostArn: S.optional(S.String),
  }),
).annotate({
  identifier: "RecoveryInstanceDataReplicationInfo",
}) as any as S.Schema<RecoveryInstanceDataReplicationInfo>;
export type EbsVolumeID = string;
export interface RecoveryInstanceDisk {
  internalDeviceName?: string;
  bytes?: number;
  ebsVolumeID?: string;
}
export const RecoveryInstanceDisk = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    internalDeviceName: S.optional(S.String),
    bytes: S.optional(S.Number),
    ebsVolumeID: S.optional(S.String),
  }),
).annotate({
  identifier: "RecoveryInstanceDisk",
}) as any as S.Schema<RecoveryInstanceDisk>;
export type RecoveryInstanceDisks = RecoveryInstanceDisk[];
export const RecoveryInstanceDisks =
  /*@__PURE__*/ S.Array(RecoveryInstanceDisk);
export interface RecoveryInstanceProperties {
  lastUpdatedDateTime?: string;
  identificationHints?: IdentificationHints;
  networkInterfaces?: NetworkInterface[];
  disks?: RecoveryInstanceDisk[];
  cpus?: CPU[];
  ramBytes?: number;
  os?: OS;
}
export const RecoveryInstanceProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    lastUpdatedDateTime: S.optional(S.String),
    identificationHints: S.optional(IdentificationHints),
    networkInterfaces: S.optional(NetworkInterfaces),
    disks: S.optional(RecoveryInstanceDisks),
    cpus: S.optional(Cpus),
    ramBytes: S.optional(S.Number),
    os: S.optional(OS),
  }),
).annotate({
  identifier: "RecoveryInstanceProperties",
}) as any as S.Schema<RecoveryInstanceProperties>;
export type OriginEnvironment = string;
export interface RecoveryInstance {
  ec2InstanceID?: string;
  ec2InstanceState?: string;
  jobID?: string;
  recoveryInstanceID?: string;
  sourceServerID?: string;
  arn?: string;
  tags?: { [key: string]: string | undefined };
  failback?: RecoveryInstanceFailback;
  dataReplicationInfo?: RecoveryInstanceDataReplicationInfo;
  recoveryInstanceProperties?: RecoveryInstanceProperties;
  pointInTimeSnapshotDateTime?: string;
  isDrill?: boolean;
  originEnvironment?: string;
  originAvailabilityZone?: string;
  agentVersion?: string;
  sourceOutpostArn?: string;
}
export const RecoveryInstance = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ec2InstanceID: S.optional(S.String),
    ec2InstanceState: S.optional(S.String),
    jobID: S.optional(S.String),
    recoveryInstanceID: S.optional(S.String),
    sourceServerID: S.optional(S.String),
    arn: S.optional(S.String),
    tags: S.optional(TagsMap),
    failback: S.optional(RecoveryInstanceFailback),
    dataReplicationInfo: S.optional(RecoveryInstanceDataReplicationInfo),
    recoveryInstanceProperties: S.optional(RecoveryInstanceProperties),
    pointInTimeSnapshotDateTime: S.optional(S.String),
    isDrill: S.optional(S.Boolean),
    originEnvironment: S.optional(S.String),
    originAvailabilityZone: S.optional(S.String),
    agentVersion: S.optional(S.String),
    sourceOutpostArn: S.optional(S.String),
  }),
).annotate({
  identifier: "RecoveryInstance",
}) as any as S.Schema<RecoveryInstance>;
export type DescribeRecoveryInstancesItems = RecoveryInstance[];
export const DescribeRecoveryInstancesItems =
  /*@__PURE__*/ S.Array(RecoveryInstance);
export interface DescribeRecoveryInstancesResponse {
  nextToken?: string;
  items?: RecoveryInstance[];
}
export const DescribeRecoveryInstancesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    items: S.optional(DescribeRecoveryInstancesItems),
  }),
).annotate({
  identifier: "DescribeRecoveryInstancesResponse",
}) as any as S.Schema<DescribeRecoveryInstancesResponse>;
export interface DescribeRecoverySnapshotsRequestFilters {
  fromDateTime?: string;
  toDateTime?: string;
}
export const DescribeRecoverySnapshotsRequestFilters = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      fromDateTime: S.optional(S.String),
      toDateTime: S.optional(S.String),
    }),
).annotate({
  identifier: "DescribeRecoverySnapshotsRequestFilters",
}) as any as S.Schema<DescribeRecoverySnapshotsRequestFilters>;
export type RecoverySnapshotsOrder = string;
export interface DescribeRecoverySnapshotsRequest {
  sourceServerID: string;
  filters?: DescribeRecoverySnapshotsRequestFilters;
  order?: string;
  maxResults?: number;
  nextToken?: string;
}
export const DescribeRecoverySnapshotsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceServerID: S.String,
    filters: S.optional(DescribeRecoverySnapshotsRequestFilters),
    order: S.optional(S.String),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DescribeRecoverySnapshots" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeRecoverySnapshotsRequest",
}) as any as S.Schema<DescribeRecoverySnapshotsRequest>;
export type RecoverySnapshotID = string;
export type EbsSnapshotsList = string[];
export const EbsSnapshotsList = /*@__PURE__*/ S.Array(S.String);
export interface RecoverySnapshot {
  snapshotID: string;
  sourceServerID: string;
  expectedTimestamp: string;
  timestamp?: string;
  ebsSnapshots?: string[];
}
export const RecoverySnapshot = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    snapshotID: S.String,
    sourceServerID: S.String,
    expectedTimestamp: S.String,
    timestamp: S.optional(S.String),
    ebsSnapshots: S.optional(EbsSnapshotsList),
  }),
).annotate({
  identifier: "RecoverySnapshot",
}) as any as S.Schema<RecoverySnapshot>;
export type RecoverySnapshotsList = RecoverySnapshot[];
export const RecoverySnapshotsList = /*@__PURE__*/ S.Array(RecoverySnapshot);
export interface DescribeRecoverySnapshotsResponse {
  items?: RecoverySnapshot[];
  nextToken?: string;
}
export const DescribeRecoverySnapshotsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(RecoverySnapshotsList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeRecoverySnapshotsResponse",
}) as any as S.Schema<DescribeRecoverySnapshotsResponse>;
export type ReplicationConfigurationTemplateIDs = string[];
export const ReplicationConfigurationTemplateIDs = /*@__PURE__*/ S.Array(
  S.String,
);
export interface DescribeReplicationConfigurationTemplatesRequest {
  replicationConfigurationTemplateIDs?: string[];
  maxResults?: number;
  nextToken?: string;
}
export const DescribeReplicationConfigurationTemplatesRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      replicationConfigurationTemplateIDs: S.optional(
        ReplicationConfigurationTemplateIDs,
      ),
      maxResults: S.optional(S.Number),
      nextToken: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/DescribeReplicationConfigurationTemplates",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DescribeReplicationConfigurationTemplatesRequest",
  }) as any as S.Schema<DescribeReplicationConfigurationTemplatesRequest>;
export type ReplicationConfigurationTemplates =
  ReplicationConfigurationTemplate[];
export const ReplicationConfigurationTemplates = /*@__PURE__*/ S.Array(
  ReplicationConfigurationTemplate,
);
export interface DescribeReplicationConfigurationTemplatesResponse {
  items?: ReplicationConfigurationTemplate[];
  nextToken?: string;
}
export const DescribeReplicationConfigurationTemplatesResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      items: S.optional(ReplicationConfigurationTemplates),
      nextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "DescribeReplicationConfigurationTemplatesResponse",
  }) as any as S.Schema<DescribeReplicationConfigurationTemplatesResponse>;
export type DescribeSourceNetworksRequestFiltersIDs = string[];
export const DescribeSourceNetworksRequestFiltersIDs = /*@__PURE__*/ S.Array(
  S.String,
);
export interface DescribeSourceNetworksRequestFilters {
  sourceNetworkIDs?: string[];
  originAccountID?: string;
  originRegion?: string;
}
export const DescribeSourceNetworksRequestFilters = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      sourceNetworkIDs: S.optional(DescribeSourceNetworksRequestFiltersIDs),
      originAccountID: S.optional(S.String),
      originRegion: S.optional(S.String),
    }),
).annotate({
  identifier: "DescribeSourceNetworksRequestFilters",
}) as any as S.Schema<DescribeSourceNetworksRequestFilters>;
export interface DescribeSourceNetworksRequest {
  filters?: DescribeSourceNetworksRequestFilters;
  maxResults?: number;
  nextToken?: string;
}
export const DescribeSourceNetworksRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    filters: S.optional(DescribeSourceNetworksRequestFilters),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DescribeSourceNetworks" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeSourceNetworksRequest",
}) as any as S.Schema<DescribeSourceNetworksRequest>;
export type ReplicationStatus = string;
export type SensitiveBoundedString = string | redacted.Redacted<string>;
export type RecoveryResult = string;
export interface RecoveryLifeCycle {
  apiCallDateTime?: Date;
  jobID?: string;
  lastRecoveryResult?: string;
}
export const RecoveryLifeCycle = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    apiCallDateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    jobID: S.optional(S.String),
    lastRecoveryResult: S.optional(S.String),
  }),
).annotate({
  identifier: "RecoveryLifeCycle",
}) as any as S.Schema<RecoveryLifeCycle>;
export interface SourceNetwork {
  sourceNetworkID?: string;
  sourceVpcID?: string;
  arn?: string;
  tags?: { [key: string]: string | undefined };
  replicationStatus?: string;
  replicationStatusDetails?: string | redacted.Redacted<string>;
  cfnStackName?: string | redacted.Redacted<string>;
  sourceRegion?: string;
  sourceAccountID?: string;
  lastRecovery?: RecoveryLifeCycle;
  launchedVpcID?: string;
}
export const SourceNetwork = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceNetworkID: S.optional(S.String),
    sourceVpcID: S.optional(S.String),
    arn: S.optional(S.String),
    tags: S.optional(TagsMap),
    replicationStatus: S.optional(S.String),
    replicationStatusDetails: S.optional(SensitiveString),
    cfnStackName: S.optional(SensitiveString),
    sourceRegion: S.optional(S.String),
    sourceAccountID: S.optional(S.String),
    lastRecovery: S.optional(RecoveryLifeCycle),
    launchedVpcID: S.optional(S.String),
  }),
).annotate({ identifier: "SourceNetwork" }) as any as S.Schema<SourceNetwork>;
export type SourceNetworksList = SourceNetwork[];
export const SourceNetworksList = /*@__PURE__*/ S.Array(SourceNetwork);
export interface DescribeSourceNetworksResponse {
  items?: SourceNetwork[];
  nextToken?: string;
}
export const DescribeSourceNetworksResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(SourceNetworksList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeSourceNetworksResponse",
}) as any as S.Schema<DescribeSourceNetworksResponse>;
export type DescribeSourceServersRequestFiltersIDs = string[];
export const DescribeSourceServersRequestFiltersIDs = /*@__PURE__*/ S.Array(
  S.String,
);
export type AccountIDs = string[];
export const AccountIDs = /*@__PURE__*/ S.Array(S.String);
export interface DescribeSourceServersRequestFilters {
  sourceServerIDs?: string[];
  hardwareId?: string;
  stagingAccountIDs?: string[];
}
export const DescribeSourceServersRequestFilters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceServerIDs: S.optional(DescribeSourceServersRequestFiltersIDs),
    hardwareId: S.optional(S.String),
    stagingAccountIDs: S.optional(AccountIDs),
  }),
).annotate({
  identifier: "DescribeSourceServersRequestFilters",
}) as any as S.Schema<DescribeSourceServersRequestFilters>;
export interface DescribeSourceServersRequest {
  filters?: DescribeSourceServersRequestFilters;
  maxResults?: number;
  nextToken?: string;
}
export const DescribeSourceServersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    filters: S.optional(DescribeSourceServersRequestFilters),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DescribeSourceServers" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeSourceServersRequest",
}) as any as S.Schema<DescribeSourceServersRequest>;
export type SourceServersList = SourceServer[];
export const SourceServersList = /*@__PURE__*/ S.Array(SourceServer);
export interface DescribeSourceServersResponse {
  items?: SourceServer[];
  nextToken?: string;
}
export const DescribeSourceServersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(SourceServersList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeSourceServersResponse",
}) as any as S.Schema<DescribeSourceServersResponse>;
export interface DisconnectRecoveryInstanceRequest {
  recoveryInstanceID: string;
}
export const DisconnectRecoveryInstanceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ recoveryInstanceID: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DisconnectRecoveryInstance" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisconnectRecoveryInstanceRequest",
}) as any as S.Schema<DisconnectRecoveryInstanceRequest>;
export interface DisconnectRecoveryInstanceResponse {}
export const DisconnectRecoveryInstanceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisconnectRecoveryInstanceResponse",
}) as any as S.Schema<DisconnectRecoveryInstanceResponse>;
export interface DisconnectSourceServerRequest {
  sourceServerID: string;
}
export const DisconnectSourceServerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sourceServerID: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DisconnectSourceServer" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisconnectSourceServerRequest",
}) as any as S.Schema<DisconnectSourceServerRequest>;
export interface ExportSourceNetworkCfnTemplateRequest {
  sourceNetworkID: string;
}
export const ExportSourceNetworkCfnTemplateRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ sourceNetworkID: S.String }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/ExportSourceNetworkCfnTemplate" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ExportSourceNetworkCfnTemplateRequest",
}) as any as S.Schema<ExportSourceNetworkCfnTemplateRequest>;
export interface ExportSourceNetworkCfnTemplateResponse {
  s3DestinationUrl?: string;
}
export const ExportSourceNetworkCfnTemplateResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ s3DestinationUrl: S.optional(S.String) }),
).annotate({
  identifier: "ExportSourceNetworkCfnTemplateResponse",
}) as any as S.Schema<ExportSourceNetworkCfnTemplateResponse>;
export interface GetFailbackReplicationConfigurationRequest {
  recoveryInstanceID: string;
}
export const GetFailbackReplicationConfigurationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ recoveryInstanceID: S.String }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/GetFailbackReplicationConfiguration" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "GetFailbackReplicationConfigurationRequest",
  }) as any as S.Schema<GetFailbackReplicationConfigurationRequest>;
export interface GetFailbackReplicationConfigurationResponse {
  recoveryInstanceID: string;
  name?: string;
  bandwidthThrottling?: number;
  usePrivateIP?: boolean;
  internetProtocol?: string;
}
export const GetFailbackReplicationConfigurationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      recoveryInstanceID: S.String,
      name: S.optional(S.String),
      bandwidthThrottling: S.optional(S.Number),
      usePrivateIP: S.optional(S.Boolean),
      internetProtocol: S.optional(S.String),
    }),
  ).annotate({
    identifier: "GetFailbackReplicationConfigurationResponse",
  }) as any as S.Schema<GetFailbackReplicationConfigurationResponse>;
export interface GetLaunchConfigurationRequest {
  sourceServerID: string;
}
export const GetLaunchConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sourceServerID: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetLaunchConfiguration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetLaunchConfigurationRequest",
}) as any as S.Schema<GetLaunchConfigurationRequest>;
export type SmallBoundedString = string;
export interface LaunchIntoInstanceProperties {
  launchIntoEC2InstanceID?: string;
}
export const LaunchIntoInstanceProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ launchIntoEC2InstanceID: S.optional(S.String) }),
).annotate({
  identifier: "LaunchIntoInstanceProperties",
}) as any as S.Schema<LaunchIntoInstanceProperties>;
export interface LaunchConfiguration {
  sourceServerID?: string;
  name?: string;
  ec2LaunchTemplateID?: string;
  launchDisposition?: string;
  targetInstanceTypeRightSizingMethod?: string;
  copyPrivateIp?: boolean;
  copyTags?: boolean;
  licensing?: Licensing;
  postLaunchEnabled?: boolean;
  launchIntoInstanceProperties?: LaunchIntoInstanceProperties;
}
export const LaunchConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceServerID: S.optional(S.String),
    name: S.optional(S.String),
    ec2LaunchTemplateID: S.optional(S.String),
    launchDisposition: S.optional(S.String),
    targetInstanceTypeRightSizingMethod: S.optional(S.String),
    copyPrivateIp: S.optional(S.Boolean),
    copyTags: S.optional(S.Boolean),
    licensing: S.optional(Licensing),
    postLaunchEnabled: S.optional(S.Boolean),
    launchIntoInstanceProperties: S.optional(LaunchIntoInstanceProperties),
  }),
).annotate({
  identifier: "LaunchConfiguration",
}) as any as S.Schema<LaunchConfiguration>;
export interface GetReplicationConfigurationRequest {
  sourceServerID: string;
}
export const GetReplicationConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sourceServerID: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetReplicationConfiguration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetReplicationConfigurationRequest",
}) as any as S.Schema<GetReplicationConfigurationRequest>;
export type ReplicationConfigurationReplicatedDiskStagingDiskType = string;
export interface ReplicationConfigurationReplicatedDisk {
  deviceName?: string;
  isBootDisk?: boolean;
  stagingDiskType?: string;
  iops?: number;
  throughput?: number;
  optimizedStagingDiskType?: string;
}
export const ReplicationConfigurationReplicatedDisk = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      deviceName: S.optional(S.String),
      isBootDisk: S.optional(S.Boolean),
      stagingDiskType: S.optional(S.String),
      iops: S.optional(S.Number),
      throughput: S.optional(S.Number),
      optimizedStagingDiskType: S.optional(S.String),
    }),
).annotate({
  identifier: "ReplicationConfigurationReplicatedDisk",
}) as any as S.Schema<ReplicationConfigurationReplicatedDisk>;
export type ReplicationConfigurationReplicatedDisks =
  ReplicationConfigurationReplicatedDisk[];
export const ReplicationConfigurationReplicatedDisks = /*@__PURE__*/ S.Array(
  ReplicationConfigurationReplicatedDisk,
);
export interface ReplicationConfiguration {
  sourceServerID?: string;
  name?: string;
  stagingAreaSubnetId?: string;
  associateDefaultSecurityGroup?: boolean;
  replicationServersSecurityGroupsIDs?: string[];
  replicationServerInstanceType?: string;
  useDedicatedReplicationServer?: boolean;
  defaultLargeStagingDiskType?: string;
  replicatedDisks?: ReplicationConfigurationReplicatedDisk[];
  ebsEncryption?: string;
  ebsEncryptionKeyArn?: string;
  bandwidthThrottling?: number;
  dataPlaneRouting?: string;
  createPublicIP?: boolean;
  stagingAreaTags?: { [key: string]: string | undefined };
  pitPolicy?: PITPolicyRule[];
  autoReplicateNewDisks?: boolean;
  internetProtocol?: string;
}
export const ReplicationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceServerID: S.optional(S.String),
    name: S.optional(S.String),
    stagingAreaSubnetId: S.optional(S.String),
    associateDefaultSecurityGroup: S.optional(S.Boolean),
    replicationServersSecurityGroupsIDs: S.optional(
      ReplicationServersSecurityGroupsIDs,
    ),
    replicationServerInstanceType: S.optional(S.String),
    useDedicatedReplicationServer: S.optional(S.Boolean),
    defaultLargeStagingDiskType: S.optional(S.String),
    replicatedDisks: S.optional(ReplicationConfigurationReplicatedDisks),
    ebsEncryption: S.optional(S.String),
    ebsEncryptionKeyArn: S.optional(S.String),
    bandwidthThrottling: S.optional(S.Number),
    dataPlaneRouting: S.optional(S.String),
    createPublicIP: S.optional(S.Boolean),
    stagingAreaTags: S.optional(TagsMap),
    pitPolicy: S.optional(PITPolicy),
    autoReplicateNewDisks: S.optional(S.Boolean),
    internetProtocol: S.optional(S.String),
  }),
).annotate({
  identifier: "ReplicationConfiguration",
}) as any as S.Schema<ReplicationConfiguration>;
export interface InitializeServiceRequest {}
export const InitializeServiceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/InitializeService" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "InitializeServiceRequest",
}) as any as S.Schema<InitializeServiceRequest>;
export interface InitializeServiceResponse {}
export const InitializeServiceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "InitializeServiceResponse",
}) as any as S.Schema<InitializeServiceResponse>;
export type MaxResultsReplicatingSourceServers = number;
export interface ListExtensibleSourceServersRequest {
  stagingAccountID: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListExtensibleSourceServersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    stagingAccountID: S.String,
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListExtensibleSourceServers" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListExtensibleSourceServersRequest",
}) as any as S.Schema<ListExtensibleSourceServersRequest>;
export interface StagingSourceServer {
  hostname?: string;
  arn?: string;
  tags?: { [key: string]: string | undefined };
}
export const StagingSourceServer = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    hostname: S.optional(S.String),
    arn: S.optional(S.String),
    tags: S.optional(TagsMap),
  }),
).annotate({
  identifier: "StagingSourceServer",
}) as any as S.Schema<StagingSourceServer>;
export type StagingSourceServersList = StagingSourceServer[];
export const StagingSourceServersList =
  /*@__PURE__*/ S.Array(StagingSourceServer);
export interface ListExtensibleSourceServersResponse {
  items?: StagingSourceServer[];
  nextToken?: string;
}
export const ListExtensibleSourceServersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(StagingSourceServersList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListExtensibleSourceServersResponse",
}) as any as S.Schema<ListExtensibleSourceServersResponse>;
export type LaunchActionIds = string[];
export const LaunchActionIds = /*@__PURE__*/ S.Array(S.String);
export interface LaunchActionsRequestFilters {
  actionIds?: string[];
}
export const LaunchActionsRequestFilters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ actionIds: S.optional(LaunchActionIds) }),
).annotate({
  identifier: "LaunchActionsRequestFilters",
}) as any as S.Schema<LaunchActionsRequestFilters>;
export interface ListLaunchActionsRequest {
  resourceId: string;
  filters?: LaunchActionsRequestFilters;
  maxResults?: number;
  nextToken?: string;
}
export const ListLaunchActionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceId: S.String,
    filters: S.optional(LaunchActionsRequestFilters),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListLaunchActions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListLaunchActionsRequest",
}) as any as S.Schema<ListLaunchActionsRequest>;
export type LaunchActions = LaunchAction[];
export const LaunchActions = /*@__PURE__*/ S.Array(LaunchAction);
export interface ListLaunchActionsResponse {
  items?: LaunchAction[];
  nextToken?: string;
}
export const ListLaunchActionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(LaunchActions),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListLaunchActionsResponse",
}) as any as S.Schema<ListLaunchActionsResponse>;
export interface ListStagingAccountsRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListStagingAccountsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/ListStagingAccounts" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListStagingAccountsRequest",
}) as any as S.Schema<ListStagingAccountsRequest>;
export interface Account {
  accountID?: string;
}
export const Account = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ accountID: S.optional(S.String) }),
).annotate({ identifier: "Account" }) as any as S.Schema<Account>;
export type Accounts = Account[];
export const Accounts = /*@__PURE__*/ S.Array(Account);
export interface ListStagingAccountsResponse {
  accounts?: Account[];
  nextToken?: string;
}
export const ListStagingAccountsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ accounts: S.optional(Accounts), nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListStagingAccountsResponse",
}) as any as S.Schema<ListStagingAccountsResponse>;
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
export interface PutLaunchActionRequest {
  resourceId: string;
  actionCode: string;
  order: number;
  actionId: string;
  optional: boolean;
  active: boolean;
  name: string;
  actionVersion: string;
  category: string;
  parameters?: { [key: string]: LaunchActionParameter | undefined };
  description: string;
}
export const PutLaunchActionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceId: S.String,
    actionCode: S.String,
    order: S.Number,
    actionId: S.String,
    optional: S.Boolean,
    active: S.Boolean,
    name: S.String,
    actionVersion: S.String,
    category: S.String,
    parameters: S.optional(LaunchActionParameters),
    description: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/PutLaunchAction" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutLaunchActionRequest",
}) as any as S.Schema<PutLaunchActionRequest>;
export interface PutLaunchActionResponse {
  resourceId?: string;
  actionId?: string;
  actionCode?: string;
  type?: string;
  name?: string;
  active?: boolean;
  order?: number;
  actionVersion?: string;
  optional?: boolean;
  parameters?: { [key: string]: LaunchActionParameter | undefined };
  description?: string;
  category?: string;
}
export const PutLaunchActionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceId: S.optional(S.String),
    actionId: S.optional(S.String),
    actionCode: S.optional(S.String),
    type: S.optional(S.String),
    name: S.optional(S.String),
    active: S.optional(S.Boolean),
    order: S.optional(S.Number),
    actionVersion: S.optional(S.String),
    optional: S.optional(S.Boolean),
    parameters: S.optional(LaunchActionParameters),
    description: S.optional(S.String),
    category: S.optional(S.String),
  }),
).annotate({
  identifier: "PutLaunchActionResponse",
}) as any as S.Schema<PutLaunchActionResponse>;
export interface RetryDataReplicationRequest {
  sourceServerID: string;
}
export const RetryDataReplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sourceServerID: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/RetryDataReplication" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RetryDataReplicationRequest",
}) as any as S.Schema<RetryDataReplicationRequest>;
export interface ReverseReplicationRequest {
  recoveryInstanceID: string;
}
export const ReverseReplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ recoveryInstanceID: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ReverseReplication" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ReverseReplicationRequest",
}) as any as S.Schema<ReverseReplicationRequest>;
export interface ReverseReplicationResponse {
  reversedDirectionSourceServerArn?: string;
}
export const ReverseReplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ reversedDirectionSourceServerArn: S.optional(S.String) }),
).annotate({
  identifier: "ReverseReplicationResponse",
}) as any as S.Schema<ReverseReplicationResponse>;
export type StartFailbackRequestRecoveryInstanceIDs = string[];
export const StartFailbackRequestRecoveryInstanceIDs = /*@__PURE__*/ S.Array(
  S.String,
);
export interface StartFailbackLaunchRequest {
  recoveryInstanceIDs: string[];
  tags?: { [key: string]: string | undefined };
}
export const StartFailbackLaunchRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    recoveryInstanceIDs: StartFailbackRequestRecoveryInstanceIDs,
    tags: S.optional(TagsMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/StartFailbackLaunch" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartFailbackLaunchRequest",
}) as any as S.Schema<StartFailbackLaunchRequest>;
export interface StartFailbackLaunchResponse {
  job?: Job;
}
export const StartFailbackLaunchResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ job: S.optional(Job) }),
).annotate({
  identifier: "StartFailbackLaunchResponse",
}) as any as S.Schema<StartFailbackLaunchResponse>;
export interface StartRecoveryRequestSourceServer {
  sourceServerID: string;
  recoverySnapshotID?: string;
}
export const StartRecoveryRequestSourceServer = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceServerID: S.String,
    recoverySnapshotID: S.optional(S.String),
  }),
).annotate({
  identifier: "StartRecoveryRequestSourceServer",
}) as any as S.Schema<StartRecoveryRequestSourceServer>;
export type StartRecoveryRequestSourceServers =
  StartRecoveryRequestSourceServer[];
export const StartRecoveryRequestSourceServers = /*@__PURE__*/ S.Array(
  StartRecoveryRequestSourceServer,
);
export interface StartRecoveryRequest {
  sourceServers: StartRecoveryRequestSourceServer[];
  isDrill?: boolean;
  tags?: { [key: string]: string | undefined };
}
export const StartRecoveryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceServers: StartRecoveryRequestSourceServers,
    isDrill: S.optional(S.Boolean),
    tags: S.optional(TagsMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/StartRecovery" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartRecoveryRequest",
}) as any as S.Schema<StartRecoveryRequest>;
export interface StartRecoveryResponse {
  job?: Job;
}
export const StartRecoveryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ job: S.optional(Job) }),
).annotate({
  identifier: "StartRecoveryResponse",
}) as any as S.Schema<StartRecoveryResponse>;
export interface StartReplicationRequest {
  sourceServerID: string;
}
export const StartReplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sourceServerID: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/StartReplication" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartReplicationRequest",
}) as any as S.Schema<StartReplicationRequest>;
export interface StartReplicationResponse {
  sourceServer?: SourceServer;
}
export const StartReplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sourceServer: S.optional(SourceServer) }),
).annotate({
  identifier: "StartReplicationResponse",
}) as any as S.Schema<StartReplicationResponse>;
export interface StartSourceNetworkRecoveryRequestNetworkEntry {
  sourceNetworkID: string;
  cfnStackName?: string | redacted.Redacted<string>;
}
export const StartSourceNetworkRecoveryRequestNetworkEntry =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      sourceNetworkID: S.String,
      cfnStackName: S.optional(SensitiveString),
    }),
  ).annotate({
    identifier: "StartSourceNetworkRecoveryRequestNetworkEntry",
  }) as any as S.Schema<StartSourceNetworkRecoveryRequestNetworkEntry>;
export type StartSourceNetworkRecoveryRequestNetworkEntries =
  StartSourceNetworkRecoveryRequestNetworkEntry[];
export const StartSourceNetworkRecoveryRequestNetworkEntries =
  /*@__PURE__*/ S.Array(StartSourceNetworkRecoveryRequestNetworkEntry);
export interface StartSourceNetworkRecoveryRequest {
  sourceNetworks: StartSourceNetworkRecoveryRequestNetworkEntry[];
  deployAsNew?: boolean;
  tags?: { [key: string]: string | undefined };
}
export const StartSourceNetworkRecoveryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceNetworks: StartSourceNetworkRecoveryRequestNetworkEntries,
    deployAsNew: S.optional(S.Boolean),
    tags: S.optional(TagsMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/StartSourceNetworkRecovery" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartSourceNetworkRecoveryRequest",
}) as any as S.Schema<StartSourceNetworkRecoveryRequest>;
export interface StartSourceNetworkRecoveryResponse {
  job?: Job;
}
export const StartSourceNetworkRecoveryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ job: S.optional(Job) }),
).annotate({
  identifier: "StartSourceNetworkRecoveryResponse",
}) as any as S.Schema<StartSourceNetworkRecoveryResponse>;
export interface StartSourceNetworkReplicationRequest {
  sourceNetworkID: string;
}
export const StartSourceNetworkReplicationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ sourceNetworkID: S.String }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/StartSourceNetworkReplication" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "StartSourceNetworkReplicationRequest",
}) as any as S.Schema<StartSourceNetworkReplicationRequest>;
export interface StartSourceNetworkReplicationResponse {
  sourceNetwork?: SourceNetwork;
}
export const StartSourceNetworkReplicationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ sourceNetwork: S.optional(SourceNetwork) }),
).annotate({
  identifier: "StartSourceNetworkReplicationResponse",
}) as any as S.Schema<StartSourceNetworkReplicationResponse>;
export interface StopFailbackRequest {
  recoveryInstanceID: string;
}
export const StopFailbackRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ recoveryInstanceID: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/StopFailback" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopFailbackRequest",
}) as any as S.Schema<StopFailbackRequest>;
export interface StopFailbackResponse {}
export const StopFailbackResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StopFailbackResponse",
}) as any as S.Schema<StopFailbackResponse>;
export interface StopReplicationRequest {
  sourceServerID: string;
}
export const StopReplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sourceServerID: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/StopReplication" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopReplicationRequest",
}) as any as S.Schema<StopReplicationRequest>;
export interface StopReplicationResponse {
  sourceServer?: SourceServer;
}
export const StopReplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sourceServer: S.optional(SourceServer) }),
).annotate({
  identifier: "StopReplicationResponse",
}) as any as S.Schema<StopReplicationResponse>;
export interface StopSourceNetworkReplicationRequest {
  sourceNetworkID: string;
}
export const StopSourceNetworkReplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sourceNetworkID: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/StopSourceNetworkReplication" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopSourceNetworkReplicationRequest",
}) as any as S.Schema<StopSourceNetworkReplicationRequest>;
export interface StopSourceNetworkReplicationResponse {
  sourceNetwork?: SourceNetwork;
}
export const StopSourceNetworkReplicationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ sourceNetwork: S.optional(SourceNetwork) }),
).annotate({
  identifier: "StopSourceNetworkReplicationResponse",
}) as any as S.Schema<StopSourceNetworkReplicationResponse>;
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
export type RecoveryInstancesForTerminationRequest = string[];
export const RecoveryInstancesForTerminationRequest = /*@__PURE__*/ S.Array(
  S.String,
);
export interface TerminateRecoveryInstancesRequest {
  recoveryInstanceIDs: string[];
}
export const TerminateRecoveryInstancesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    recoveryInstanceIDs: RecoveryInstancesForTerminationRequest,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/TerminateRecoveryInstances" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "TerminateRecoveryInstancesRequest",
}) as any as S.Schema<TerminateRecoveryInstancesRequest>;
export interface TerminateRecoveryInstancesResponse {
  job?: Job;
}
export const TerminateRecoveryInstancesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ job: S.optional(Job) }),
).annotate({
  identifier: "TerminateRecoveryInstancesResponse",
}) as any as S.Schema<TerminateRecoveryInstancesResponse>;
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
export interface UpdateFailbackReplicationConfigurationRequest {
  recoveryInstanceID: string;
  name?: string;
  bandwidthThrottling?: number;
  usePrivateIP?: boolean;
  internetProtocol?: string;
}
export const UpdateFailbackReplicationConfigurationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      recoveryInstanceID: S.String,
      name: S.optional(S.String),
      bandwidthThrottling: S.optional(S.Number),
      usePrivateIP: S.optional(S.Boolean),
      internetProtocol: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/UpdateFailbackReplicationConfiguration",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "UpdateFailbackReplicationConfigurationRequest",
  }) as any as S.Schema<UpdateFailbackReplicationConfigurationRequest>;
export interface UpdateFailbackReplicationConfigurationResponse {}
export const UpdateFailbackReplicationConfigurationResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "UpdateFailbackReplicationConfigurationResponse",
  }) as any as S.Schema<UpdateFailbackReplicationConfigurationResponse>;
export interface UpdateLaunchConfigurationRequest {
  sourceServerID: string;
  name?: string;
  launchDisposition?: string;
  targetInstanceTypeRightSizingMethod?: string;
  copyPrivateIp?: boolean;
  copyTags?: boolean;
  licensing?: Licensing;
  postLaunchEnabled?: boolean;
  launchIntoInstanceProperties?: LaunchIntoInstanceProperties;
}
export const UpdateLaunchConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceServerID: S.String,
    name: S.optional(S.String),
    launchDisposition: S.optional(S.String),
    targetInstanceTypeRightSizingMethod: S.optional(S.String),
    copyPrivateIp: S.optional(S.Boolean),
    copyTags: S.optional(S.Boolean),
    licensing: S.optional(Licensing),
    postLaunchEnabled: S.optional(S.Boolean),
    launchIntoInstanceProperties: S.optional(LaunchIntoInstanceProperties),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/UpdateLaunchConfiguration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateLaunchConfigurationRequest",
}) as any as S.Schema<UpdateLaunchConfigurationRequest>;
export interface UpdateLaunchConfigurationTemplateRequest {
  launchConfigurationTemplateID: string;
  launchDisposition?: string;
  targetInstanceTypeRightSizingMethod?: string;
  copyPrivateIp?: boolean;
  copyTags?: boolean;
  licensing?: Licensing;
  exportBucketArn?: string;
  postLaunchEnabled?: boolean;
  launchIntoSourceInstance?: boolean;
}
export const UpdateLaunchConfigurationTemplateRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      launchConfigurationTemplateID: S.String,
      launchDisposition: S.optional(S.String),
      targetInstanceTypeRightSizingMethod: S.optional(S.String),
      copyPrivateIp: S.optional(S.Boolean),
      copyTags: S.optional(S.Boolean),
      licensing: S.optional(Licensing),
      exportBucketArn: S.optional(S.String),
      postLaunchEnabled: S.optional(S.Boolean),
      launchIntoSourceInstance: S.optional(S.Boolean),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/UpdateLaunchConfigurationTemplate" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateLaunchConfigurationTemplateRequest",
}) as any as S.Schema<UpdateLaunchConfigurationTemplateRequest>;
export interface UpdateLaunchConfigurationTemplateResponse {
  launchConfigurationTemplate?: LaunchConfigurationTemplate;
}
export const UpdateLaunchConfigurationTemplateResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      launchConfigurationTemplate: S.optional(LaunchConfigurationTemplate),
    }),
  ).annotate({
    identifier: "UpdateLaunchConfigurationTemplateResponse",
  }) as any as S.Schema<UpdateLaunchConfigurationTemplateResponse>;
export interface UpdateReplicationConfigurationRequest {
  sourceServerID: string;
  name?: string;
  stagingAreaSubnetId?: string;
  associateDefaultSecurityGroup?: boolean;
  replicationServersSecurityGroupsIDs?: string[];
  replicationServerInstanceType?: string;
  useDedicatedReplicationServer?: boolean;
  defaultLargeStagingDiskType?: string;
  replicatedDisks?: ReplicationConfigurationReplicatedDisk[];
  ebsEncryption?: string;
  ebsEncryptionKeyArn?: string;
  bandwidthThrottling?: number;
  dataPlaneRouting?: string;
  createPublicIP?: boolean;
  stagingAreaTags?: { [key: string]: string | undefined };
  pitPolicy?: PITPolicyRule[];
  autoReplicateNewDisks?: boolean;
  internetProtocol?: string;
}
export const UpdateReplicationConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      sourceServerID: S.String,
      name: S.optional(S.String),
      stagingAreaSubnetId: S.optional(S.String),
      associateDefaultSecurityGroup: S.optional(S.Boolean),
      replicationServersSecurityGroupsIDs: S.optional(
        ReplicationServersSecurityGroupsIDs,
      ),
      replicationServerInstanceType: S.optional(S.String),
      useDedicatedReplicationServer: S.optional(S.Boolean),
      defaultLargeStagingDiskType: S.optional(S.String),
      replicatedDisks: S.optional(ReplicationConfigurationReplicatedDisks),
      ebsEncryption: S.optional(S.String),
      ebsEncryptionKeyArn: S.optional(S.String),
      bandwidthThrottling: S.optional(S.Number),
      dataPlaneRouting: S.optional(S.String),
      createPublicIP: S.optional(S.Boolean),
      stagingAreaTags: S.optional(TagsMap),
      pitPolicy: S.optional(PITPolicy),
      autoReplicateNewDisks: S.optional(S.Boolean),
      internetProtocol: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/UpdateReplicationConfiguration" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateReplicationConfigurationRequest",
}) as any as S.Schema<UpdateReplicationConfigurationRequest>;
export interface UpdateReplicationConfigurationTemplateRequest {
  replicationConfigurationTemplateID: string;
  arn?: string;
  stagingAreaSubnetId?: string;
  associateDefaultSecurityGroup?: boolean;
  replicationServersSecurityGroupsIDs?: string[];
  replicationServerInstanceType?: string;
  useDedicatedReplicationServer?: boolean;
  defaultLargeStagingDiskType?: string;
  ebsEncryption?: string;
  ebsEncryptionKeyArn?: string;
  bandwidthThrottling?: number;
  dataPlaneRouting?: string;
  createPublicIP?: boolean;
  stagingAreaTags?: { [key: string]: string | undefined };
  pitPolicy?: PITPolicyRule[];
  autoReplicateNewDisks?: boolean;
  internetProtocol?: string;
}
export const UpdateReplicationConfigurationTemplateRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      replicationConfigurationTemplateID: S.String,
      arn: S.optional(S.String),
      stagingAreaSubnetId: S.optional(S.String),
      associateDefaultSecurityGroup: S.optional(S.Boolean),
      replicationServersSecurityGroupsIDs: S.optional(
        ReplicationServersSecurityGroupsIDs,
      ),
      replicationServerInstanceType: S.optional(S.String),
      useDedicatedReplicationServer: S.optional(S.Boolean),
      defaultLargeStagingDiskType: S.optional(S.String),
      ebsEncryption: S.optional(S.String),
      ebsEncryptionKeyArn: S.optional(S.String),
      bandwidthThrottling: S.optional(S.Number),
      dataPlaneRouting: S.optional(S.String),
      createPublicIP: S.optional(S.Boolean),
      stagingAreaTags: S.optional(TagsMap),
      pitPolicy: S.optional(PITPolicy),
      autoReplicateNewDisks: S.optional(S.Boolean),
      internetProtocol: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/UpdateReplicationConfigurationTemplate",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "UpdateReplicationConfigurationTemplateRequest",
  }) as any as S.Schema<UpdateReplicationConfigurationTemplateRequest>;
export type ValidationExceptionReason = string;
export interface ValidationExceptionField {
  name?: string;
  message?: string;
}
export const ValidationExceptionField = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(S.String), message: S.optional(S.String) }),
).annotate({
  identifier: "ValidationExceptionField",
}) as any as S.Schema<ValidationExceptionField>;
export type ValidationExceptionFieldList = ValidationExceptionField[];
export const ValidationExceptionFieldList = /*@__PURE__*/ S.Array(
  ValidationExceptionField,
);
export type AssociateSourceNetworkStackError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Associate a Source Network to an existing CloudFormation Stack and modify launch templates to use this network. Can be used for reverting to previously deployed CloudFormation stacks.
 */
export const associateSourceNetworkStack: API.OperationMethod<
  AssociateSourceNetworkStackRequest,
  AssociateSourceNetworkStackResponse,
  AssociateSourceNetworkStackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateSourceNetworkStackRequest,
  output: AssociateSourceNetworkStackResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateSourceNetworkStack",
}));

export type CreateExtendedSourceServerError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Create an extended source server in the target Account based on the source server in staging account.
 */
export const createExtendedSourceServer: API.OperationMethod<
  CreateExtendedSourceServerRequest,
  CreateExtendedSourceServerResponse,
  CreateExtendedSourceServerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateExtendedSourceServerRequest,
  output: CreateExtendedSourceServerResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateExtendedSourceServer",
}));

export type CreateLaunchConfigurationTemplateError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new Launch Configuration Template.
 */
export const createLaunchConfigurationTemplate: API.OperationMethod<
  CreateLaunchConfigurationTemplateRequest,
  CreateLaunchConfigurationTemplateResponse,
  CreateLaunchConfigurationTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateLaunchConfigurationTemplateRequest,
  output: CreateLaunchConfigurationTemplateResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLaunchConfigurationTemplate",
}));

export type CreateReplicationConfigurationTemplateError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new ReplicationConfigurationTemplate.
 */
export const createReplicationConfigurationTemplate: API.OperationMethod<
  CreateReplicationConfigurationTemplateRequest,
  ReplicationConfigurationTemplate,
  CreateReplicationConfigurationTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateReplicationConfigurationTemplateRequest,
  output: ReplicationConfigurationTemplate,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateReplicationConfigurationTemplate",
}));

export type CreateSourceNetworkError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Create a new Source Network resource for a provided VPC ID.
 */
export const createSourceNetwork: API.OperationMethod<
  CreateSourceNetworkRequest,
  CreateSourceNetworkResponse,
  CreateSourceNetworkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSourceNetworkRequest,
  output: CreateSourceNetworkResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSourceNetwork",
}));

export type DeleteJobError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Deletes a single Job by ID.
 */
export const deleteJob: API.OperationMethod<
  DeleteJobRequest,
  DeleteJobResponse,
  DeleteJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteJobRequest,
  output: DeleteJobResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteJob",
}));

export type DeleteLaunchActionError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a resource launch action.
 */
export const deleteLaunchAction: API.OperationMethod<
  DeleteLaunchActionRequest,
  DeleteLaunchActionResponse,
  DeleteLaunchActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteLaunchActionRequest,
  output: DeleteLaunchActionResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLaunchAction",
}));

export type DeleteLaunchConfigurationTemplateError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Deletes a single Launch Configuration Template by ID.
 */
export const deleteLaunchConfigurationTemplate: API.OperationMethod<
  DeleteLaunchConfigurationTemplateRequest,
  DeleteLaunchConfigurationTemplateResponse,
  DeleteLaunchConfigurationTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteLaunchConfigurationTemplateRequest,
  output: DeleteLaunchConfigurationTemplateResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLaunchConfigurationTemplate",
}));

export type DeleteRecoveryInstanceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Deletes a single Recovery Instance by ID. This deletes the Recovery Instance resource from Elastic Disaster Recovery. The Recovery Instance must be disconnected first in order to delete it.
 */
export const deleteRecoveryInstance: API.OperationMethod<
  DeleteRecoveryInstanceRequest,
  DeleteRecoveryInstanceResponse,
  DeleteRecoveryInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRecoveryInstanceRequest,
  output: DeleteRecoveryInstanceResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRecoveryInstance",
}));

export type DeleteReplicationConfigurationTemplateError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Deletes a single Replication Configuration Template by ID
 */
export const deleteReplicationConfigurationTemplate: API.OperationMethod<
  DeleteReplicationConfigurationTemplateRequest,
  DeleteReplicationConfigurationTemplateResponse,
  DeleteReplicationConfigurationTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteReplicationConfigurationTemplateRequest,
  output: DeleteReplicationConfigurationTemplateResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteReplicationConfigurationTemplate",
}));

export type DeleteSourceNetworkError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Delete Source Network resource.
 */
export const deleteSourceNetwork: API.OperationMethod<
  DeleteSourceNetworkRequest,
  DeleteSourceNetworkResponse,
  DeleteSourceNetworkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSourceNetworkRequest,
  output: DeleteSourceNetworkResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSourceNetwork",
}));

export type DeleteSourceServerError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Deletes a single Source Server by ID. The Source Server must be disconnected first.
 */
export const deleteSourceServer: API.OperationMethod<
  DeleteSourceServerRequest,
  DeleteSourceServerResponse,
  DeleteSourceServerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSourceServerRequest,
  output: DeleteSourceServerResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSourceServer",
}));

export type DescribeJobLogItemsError =
  | InternalServerException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a detailed Job log with pagination.
 */
export const describeJobLogItems: API.PaginatedOperationMethod<
  DescribeJobLogItemsRequest,
  DescribeJobLogItemsResponse,
  DescribeJobLogItemsError,
  Credentials | HttpClient.HttpClient,
  JobLog
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeJobLogItemsRequest,
  output: DescribeJobLogItemsResponse,
  errors: [
    InternalServerException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeJobLogItems",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeJobsError =
  | InternalServerException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of Jobs. Use the JobsID and fromDate and toDate filters to limit which jobs are returned. The response is sorted by creationDataTime - latest date first. Jobs are created by the StartRecovery, TerminateRecoveryInstances and StartFailbackLaunch APIs. Jobs are also created by DiagnosticLaunch and TerminateDiagnosticInstances, which are APIs available only to *Support* and only used in response to relevant support tickets.
 */
export const describeJobs: API.PaginatedOperationMethod<
  DescribeJobsRequest,
  DescribeJobsResponse,
  DescribeJobsError,
  Credentials | HttpClient.HttpClient,
  Job
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeJobsRequest,
  output: DescribeJobsResponse,
  errors: [
    InternalServerException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeLaunchConfigurationTemplatesError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Lists all Launch Configuration Templates, filtered by Launch Configuration Template IDs
 */
export const describeLaunchConfigurationTemplates: API.PaginatedOperationMethod<
  DescribeLaunchConfigurationTemplatesRequest,
  DescribeLaunchConfigurationTemplatesResponse,
  DescribeLaunchConfigurationTemplatesError,
  Credentials | HttpClient.HttpClient,
  LaunchConfigurationTemplate
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeLaunchConfigurationTemplatesRequest,
  output: DescribeLaunchConfigurationTemplatesResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLaunchConfigurationTemplates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeRecoveryInstancesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Lists all Recovery Instances or multiple Recovery Instances by ID.
 */
export const describeRecoveryInstances: API.PaginatedOperationMethod<
  DescribeRecoveryInstancesRequest,
  DescribeRecoveryInstancesResponse,
  DescribeRecoveryInstancesError,
  Credentials | HttpClient.HttpClient,
  RecoveryInstance
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeRecoveryInstancesRequest,
  output: DescribeRecoveryInstancesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRecoveryInstances",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeRecoverySnapshotsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Lists all Recovery Snapshots for a single Source Server.
 */
export const describeRecoverySnapshots: API.PaginatedOperationMethod<
  DescribeRecoverySnapshotsRequest,
  DescribeRecoverySnapshotsResponse,
  DescribeRecoverySnapshotsError,
  Credentials | HttpClient.HttpClient,
  RecoverySnapshot
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeRecoverySnapshotsRequest,
  output: DescribeRecoverySnapshotsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRecoverySnapshots",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeReplicationConfigurationTemplatesError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Lists all ReplicationConfigurationTemplates, filtered by Source Server IDs.
 */
export const describeReplicationConfigurationTemplates: API.PaginatedOperationMethod<
  DescribeReplicationConfigurationTemplatesRequest,
  DescribeReplicationConfigurationTemplatesResponse,
  DescribeReplicationConfigurationTemplatesError,
  Credentials | HttpClient.HttpClient,
  ReplicationConfigurationTemplate
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeReplicationConfigurationTemplatesRequest,
  output: DescribeReplicationConfigurationTemplatesResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReplicationConfigurationTemplates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeSourceNetworksError =
  | InternalServerException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Lists all Source Networks or multiple Source Networks filtered by ID.
 */
export const describeSourceNetworks: API.PaginatedOperationMethod<
  DescribeSourceNetworksRequest,
  DescribeSourceNetworksResponse,
  DescribeSourceNetworksError,
  Credentials | HttpClient.HttpClient,
  SourceNetwork
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeSourceNetworksRequest,
  output: DescribeSourceNetworksResponse,
  errors: [
    InternalServerException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSourceNetworks",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeSourceServersError =
  | InternalServerException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Lists all Source Servers or multiple Source Servers filtered by ID.
 */
export const describeSourceServers: API.PaginatedOperationMethod<
  DescribeSourceServersRequest,
  DescribeSourceServersResponse,
  DescribeSourceServersError,
  Credentials | HttpClient.HttpClient,
  SourceServer
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeSourceServersRequest,
  output: DescribeSourceServersResponse,
  errors: [
    InternalServerException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSourceServers",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DisconnectRecoveryInstanceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Disconnect a Recovery Instance from Elastic Disaster Recovery. Data replication is stopped immediately. All AWS resources created by Elastic Disaster Recovery for enabling the replication of the Recovery Instance will be terminated / deleted within 90 minutes. If the agent on the Recovery Instance has not been prevented from communicating with the Elastic Disaster Recovery service, then it will receive a command to uninstall itself (within approximately 10 minutes). The following properties of the Recovery Instance will be changed immediately: dataReplicationInfo.dataReplicationState will be set to DISCONNECTED; The totalStorageBytes property for each of dataReplicationInfo.replicatedDisks will be set to zero; dataReplicationInfo.lagDuration and dataReplicationInfo.lagDuration will be nullified.
 */
export const disconnectRecoveryInstance: API.OperationMethod<
  DisconnectRecoveryInstanceRequest,
  DisconnectRecoveryInstanceResponse,
  DisconnectRecoveryInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisconnectRecoveryInstanceRequest,
  output: DisconnectRecoveryInstanceResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisconnectRecoveryInstance",
}));

export type DisconnectSourceServerError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Disconnects a specific Source Server from Elastic Disaster Recovery. Data replication is stopped immediately. All AWS resources created by Elastic Disaster Recovery for enabling the replication of the Source Server will be terminated / deleted within 90 minutes. You cannot disconnect a Source Server if it has a Recovery Instance. If the agent on the Source Server has not been prevented from communicating with the Elastic Disaster Recovery service, then it will receive a command to uninstall itself (within approximately 10 minutes). The following properties of the SourceServer will be changed immediately: dataReplicationInfo.dataReplicationState will be set to DISCONNECTED; The totalStorageBytes property for each of dataReplicationInfo.replicatedDisks will be set to zero; dataReplicationInfo.lagDuration and dataReplicationInfo.lagDuration will be nullified.
 */
export const disconnectSourceServer: API.OperationMethod<
  DisconnectSourceServerRequest,
  SourceServer,
  DisconnectSourceServerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisconnectSourceServerRequest,
  output: SourceServer,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisconnectSourceServer",
}));

export type ExportSourceNetworkCfnTemplateError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Export the Source Network CloudFormation template to an S3 bucket.
 */
export const exportSourceNetworkCfnTemplate: API.OperationMethod<
  ExportSourceNetworkCfnTemplateRequest,
  ExportSourceNetworkCfnTemplateResponse,
  ExportSourceNetworkCfnTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ExportSourceNetworkCfnTemplateRequest,
  output: ExportSourceNetworkCfnTemplateResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExportSourceNetworkCfnTemplate",
}));

export type GetFailbackReplicationConfigurationError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Lists all Failback ReplicationConfigurations, filtered by Recovery Instance ID.
 */
export const getFailbackReplicationConfiguration: API.OperationMethod<
  GetFailbackReplicationConfigurationRequest,
  GetFailbackReplicationConfigurationResponse,
  GetFailbackReplicationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetFailbackReplicationConfigurationRequest,
  output: GetFailbackReplicationConfigurationResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFailbackReplicationConfiguration",
}));

export type GetLaunchConfigurationError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Gets a LaunchConfiguration, filtered by Source Server IDs.
 */
export const getLaunchConfiguration: API.OperationMethod<
  GetLaunchConfigurationRequest,
  LaunchConfiguration,
  GetLaunchConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetLaunchConfigurationRequest,
  output: LaunchConfiguration,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLaunchConfiguration",
}));

export type GetReplicationConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Gets a ReplicationConfiguration, filtered by Source Server ID.
 */
export const getReplicationConfiguration: API.OperationMethod<
  GetReplicationConfigurationRequest,
  ReplicationConfiguration,
  GetReplicationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetReplicationConfigurationRequest,
  output: ReplicationConfiguration,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReplicationConfiguration",
}));

export type InitializeServiceError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Initialize Elastic Disaster Recovery.
 */
export const initializeService: API.OperationMethod<
  InitializeServiceRequest,
  InitializeServiceResponse,
  InitializeServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: InitializeServiceRequest,
  output: InitializeServiceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InitializeService",
}));

export type ListExtensibleSourceServersError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of source servers on a staging account that are extensible, which means that: a. The source server is not already extended into this Account. b. The source server on the Account we’re reading from is not an extension of another source server.
 */
export const listExtensibleSourceServers: API.PaginatedOperationMethod<
  ListExtensibleSourceServersRequest,
  ListExtensibleSourceServersResponse,
  ListExtensibleSourceServersError,
  Credentials | HttpClient.HttpClient,
  StagingSourceServer
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListExtensibleSourceServersRequest,
  output: ListExtensibleSourceServersResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExtensibleSourceServers",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListLaunchActionsError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Lists resource launch actions.
 */
export const listLaunchActions: API.PaginatedOperationMethod<
  ListLaunchActionsRequest,
  ListLaunchActionsResponse,
  ListLaunchActionsError,
  Credentials | HttpClient.HttpClient,
  LaunchAction
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListLaunchActionsRequest,
  output: ListLaunchActionsResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLaunchActions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListStagingAccountsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Returns an array of staging accounts for existing extended source servers.
 */
export const listStagingAccounts: API.PaginatedOperationMethod<
  ListStagingAccountsRequest,
  ListStagingAccountsResponse,
  ListStagingAccountsError,
  Credentials | HttpClient.HttpClient,
  Account
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListStagingAccountsRequest,
  output: ListStagingAccountsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStagingAccounts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "accounts",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List all tags for your Elastic Disaster Recovery resources.
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
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type PutLaunchActionError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Puts a resource launch action.
 */
export const putLaunchAction: API.OperationMethod<
  PutLaunchActionRequest,
  PutLaunchActionResponse,
  PutLaunchActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutLaunchActionRequest,
  output: PutLaunchActionResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutLaunchAction",
}));

export type RetryDataReplicationError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * WARNING: RetryDataReplication is deprecated. Causes the data replication initiation sequence to begin immediately upon next Handshake for the specified Source Server ID, regardless of when the previous initiation started. This command will work only if the Source Server is stalled or is in a DISCONNECTED or STOPPED state.
 */
export const retryDataReplication: API.OperationMethod<
  RetryDataReplicationRequest,
  SourceServer,
  RetryDataReplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RetryDataReplicationRequest,
  output: SourceServer,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RetryDataReplication",
}));

export type ReverseReplicationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Start replication to origin / target region - applies only to protected instances that originated in EC2. For recovery instances on target region - starts replication back to origin region. For failback instances on origin region - starts replication to target region to re-protect them.
 */
export const reverseReplication: API.OperationMethod<
  ReverseReplicationRequest,
  ReverseReplicationResponse,
  ReverseReplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ReverseReplicationRequest,
  output: ReverseReplicationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ReverseReplication",
}));

export type StartFailbackLaunchError =
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Initiates a Job for launching the machine that is being failed back to from the specified Recovery Instance. This will run conversion on the failback client and will reboot your machine, thus completing the failback process.
 */
export const startFailbackLaunch: API.OperationMethod<
  StartFailbackLaunchRequest,
  StartFailbackLaunchResponse,
  StartFailbackLaunchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartFailbackLaunchRequest,
  output: StartFailbackLaunchResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartFailbackLaunch",
}));

export type StartRecoveryError =
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Launches Recovery Instances for the specified Source Servers. For each Source Server you may choose a point in time snapshot to launch from, or use an on demand snapshot.
 */
export const startRecovery: API.OperationMethod<
  StartRecoveryRequest,
  StartRecoveryResponse,
  StartRecoveryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartRecoveryRequest,
  output: StartRecoveryResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartRecovery",
}));

export type StartReplicationError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Starts replication for a stopped Source Server. This action would make the Source Server protected again and restart billing for it.
 */
export const startReplication: API.OperationMethod<
  StartReplicationRequest,
  StartReplicationResponse,
  StartReplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartReplicationRequest,
  output: StartReplicationResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartReplication",
}));

export type StartSourceNetworkRecoveryError =
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Deploy VPC for the specified Source Network and modify launch templates to use this network. The VPC will be deployed using a dedicated CloudFormation stack.
 */
export const startSourceNetworkRecovery: API.OperationMethod<
  StartSourceNetworkRecoveryRequest,
  StartSourceNetworkRecoveryResponse,
  StartSourceNetworkRecoveryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartSourceNetworkRecoveryRequest,
  output: StartSourceNetworkRecoveryResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSourceNetworkRecovery",
}));

export type StartSourceNetworkReplicationError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Starts replication for a Source Network. This action would make the Source Network protected.
 */
export const startSourceNetworkReplication: API.OperationMethod<
  StartSourceNetworkReplicationRequest,
  StartSourceNetworkReplicationResponse,
  StartSourceNetworkReplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartSourceNetworkReplicationRequest,
  output: StartSourceNetworkReplicationResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSourceNetworkReplication",
}));

export type StopFailbackError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Stops the failback process for a specified Recovery Instance. This changes the Failback State of the Recovery Instance back to FAILBACK_NOT_STARTED.
 */
export const stopFailback: API.OperationMethod<
  StopFailbackRequest,
  StopFailbackResponse,
  StopFailbackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopFailbackRequest,
  output: StopFailbackResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopFailback",
}));

export type StopReplicationError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Stops replication for a Source Server. This action would make the Source Server unprotected, delete its existing snapshots and stop billing for it.
 */
export const stopReplication: API.OperationMethod<
  StopReplicationRequest,
  StopReplicationResponse,
  StopReplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopReplicationRequest,
  output: StopReplicationResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopReplication",
}));

export type StopSourceNetworkReplicationError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Stops replication for a Source Network. This action would make the Source Network unprotected.
 */
export const stopSourceNetworkReplication: API.OperationMethod<
  StopSourceNetworkReplicationRequest,
  StopSourceNetworkReplicationResponse,
  StopSourceNetworkReplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopSourceNetworkReplicationRequest,
  output: StopSourceNetworkReplicationResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopSourceNetworkReplication",
}));

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds or overwrites only the specified tags for the specified Elastic Disaster Recovery resource or resources. When you specify an existing tag key, the value is overwritten with the new value. Each resource can have a maximum of 50 tags. Each tag consists of a key and optional value.
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
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type TerminateRecoveryInstancesError =
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Initiates a Job for terminating the EC2 resources associated with the specified Recovery Instances, and then will delete the Recovery Instances from the Elastic Disaster Recovery service.
 */
export const terminateRecoveryInstances: API.OperationMethod<
  TerminateRecoveryInstancesRequest,
  TerminateRecoveryInstancesResponse,
  TerminateRecoveryInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TerminateRecoveryInstancesRequest,
  output: TerminateRecoveryInstancesResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TerminateRecoveryInstances",
}));

export type UntagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified set of tags from the specified set of Elastic Disaster Recovery resources.
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
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateFailbackReplicationConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Allows you to update the failback replication configuration of a Recovery Instance by ID.
 */
export const updateFailbackReplicationConfiguration: API.OperationMethod<
  UpdateFailbackReplicationConfigurationRequest,
  UpdateFailbackReplicationConfigurationResponse,
  UpdateFailbackReplicationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateFailbackReplicationConfigurationRequest,
  output: UpdateFailbackReplicationConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFailbackReplicationConfiguration",
}));

export type UpdateLaunchConfigurationError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Updates a LaunchConfiguration by Source Server ID.
 */
export const updateLaunchConfiguration: API.OperationMethod<
  UpdateLaunchConfigurationRequest,
  LaunchConfiguration,
  UpdateLaunchConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateLaunchConfigurationRequest,
  output: LaunchConfiguration,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLaunchConfiguration",
}));

export type UpdateLaunchConfigurationTemplateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing Launch Configuration Template by ID.
 */
export const updateLaunchConfigurationTemplate: API.OperationMethod<
  UpdateLaunchConfigurationTemplateRequest,
  UpdateLaunchConfigurationTemplateResponse,
  UpdateLaunchConfigurationTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateLaunchConfigurationTemplateRequest,
  output: UpdateLaunchConfigurationTemplateResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLaunchConfigurationTemplate",
}));

export type UpdateReplicationConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Allows you to update a ReplicationConfiguration by Source Server ID.
 */
export const updateReplicationConfiguration: API.OperationMethod<
  UpdateReplicationConfigurationRequest,
  ReplicationConfiguration,
  UpdateReplicationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateReplicationConfigurationRequest,
  output: ReplicationConfiguration,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateReplicationConfiguration",
}));

export type UpdateReplicationConfigurationTemplateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Updates a ReplicationConfigurationTemplate by ID.
 */
export const updateReplicationConfigurationTemplate: API.OperationMethod<
  UpdateReplicationConfigurationTemplateRequest,
  ReplicationConfigurationTemplate,
  UpdateReplicationConfigurationTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateReplicationConfigurationTemplateRequest,
  output: ReplicationConfigurationTemplate,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateReplicationConfigurationTemplate",
}));
