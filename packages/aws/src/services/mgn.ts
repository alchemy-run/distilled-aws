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
  sdkId: "mgn",
  serviceShapeName: "ApplicationMigrationService",
});
const auth = T.AwsAuthSigv4({ name: "mgn" });
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
              `https://mgn-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://mgn-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://mgn.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://mgn.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
      errors: S.optional(
        S.suspend(() => ConflictExceptionErrors).annotate({
          identifier: "ConflictExceptionErrors",
        }),
      ),
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
      quotaValue: S.optional(S.Number),
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
export type ApplicationID = string;
export type AccountID = string;
export interface ArchiveApplicationRequest {
  applicationID: string;
  accountID?: string;
}
export const ArchiveApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ applicationID: S.String, accountID: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ArchiveApplication" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ArchiveApplicationRequest",
}) as any as S.Schema<ArchiveApplicationRequest>;
export type ARN = string;
export type ApplicationName = string;
export type ApplicationDescription = string;
export type ISO8601DatetimeString = string;
export type ApplicationHealthStatus = string;
export type ApplicationProgressStatus = string;
export type PositiveInteger = number;
export interface ApplicationAggregatedStatus {
  lastUpdateDateTime?: string;
  healthStatus?: string;
  progressStatus?: string;
  totalSourceServers?: number;
}
export const ApplicationAggregatedStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    lastUpdateDateTime: S.optional(S.String),
    healthStatus: S.optional(S.String),
    progressStatus: S.optional(S.String),
    totalSourceServers: S.optional(S.Number),
  }),
).annotate({
  identifier: "ApplicationAggregatedStatus",
}) as any as S.Schema<ApplicationAggregatedStatus>;
export type TagKey = string;
export type TagValue = string;
export type TagsMap = { [key: string]: string | undefined };
export const TagsMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type WaveID = string;
export interface Application {
  applicationID?: string;
  arn?: string;
  name?: string;
  description?: string;
  isArchived?: boolean;
  applicationAggregatedStatus?: ApplicationAggregatedStatus;
  creationDateTime?: string;
  lastModifiedDateTime?: string;
  tags?: { [key: string]: string | undefined };
  waveID?: string;
}
export const Application = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationID: S.optional(S.String),
    arn: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    isArchived: S.optional(S.Boolean),
    applicationAggregatedStatus: S.optional(ApplicationAggregatedStatus),
    creationDateTime: S.optional(S.String),
    lastModifiedDateTime: S.optional(S.String),
    tags: S.optional(TagsMap),
    waveID: S.optional(S.String),
  }),
).annotate({ identifier: "Application" }) as any as S.Schema<Application>;
export interface ArchiveWaveRequest {
  waveID: string;
  accountID?: string;
}
export const ArchiveWaveRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ waveID: S.String, accountID: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ArchiveWave" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ArchiveWaveRequest",
}) as any as S.Schema<ArchiveWaveRequest>;
export type WaveName = string;
export type WaveDescription = string;
export type WaveHealthStatus = string;
export type WaveProgressStatus = string;
export interface WaveAggregatedStatus {
  lastUpdateDateTime?: string;
  replicationStartedDateTime?: string;
  healthStatus?: string;
  progressStatus?: string;
  totalApplications?: number;
}
export const WaveAggregatedStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    lastUpdateDateTime: S.optional(S.String),
    replicationStartedDateTime: S.optional(S.String),
    healthStatus: S.optional(S.String),
    progressStatus: S.optional(S.String),
    totalApplications: S.optional(S.Number),
  }),
).annotate({
  identifier: "WaveAggregatedStatus",
}) as any as S.Schema<WaveAggregatedStatus>;
export interface Wave {
  waveID?: string;
  arn?: string;
  name?: string;
  description?: string;
  isArchived?: boolean;
  waveAggregatedStatus?: WaveAggregatedStatus;
  creationDateTime?: string;
  lastModifiedDateTime?: string;
  tags?: { [key: string]: string | undefined };
}
export const Wave = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    waveID: S.optional(S.String),
    arn: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    isArchived: S.optional(S.Boolean),
    waveAggregatedStatus: S.optional(WaveAggregatedStatus),
    creationDateTime: S.optional(S.String),
    lastModifiedDateTime: S.optional(S.String),
    tags: S.optional(TagsMap),
  }),
).annotate({ identifier: "Wave" }) as any as S.Schema<Wave>;
export type ApplicationIDs = string[];
export const ApplicationIDs = /*@__PURE__*/ S.Array(S.String);
export interface AssociateApplicationsRequest {
  waveID: string;
  applicationIDs: string[];
  accountID?: string;
}
export const AssociateApplicationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    waveID: S.String,
    applicationIDs: ApplicationIDs,
    accountID: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/AssociateApplications" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateApplicationsRequest",
}) as any as S.Schema<AssociateApplicationsRequest>;
export interface AssociateApplicationsResponse {}
export const AssociateApplicationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AssociateApplicationsResponse",
}) as any as S.Schema<AssociateApplicationsResponse>;
export type SourceServerID = string;
export type AssociateSourceServersRequestSourceServerIDs = string[];
export const AssociateSourceServersRequestSourceServerIDs =
  /*@__PURE__*/ S.Array(S.String);
export interface AssociateSourceServersRequest {
  applicationID: string;
  sourceServerIDs: string[];
  accountID?: string;
}
export const AssociateSourceServersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationID: S.String,
    sourceServerIDs: AssociateSourceServersRequestSourceServerIDs,
    accountID: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/AssociateSourceServers" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateSourceServersRequest",
}) as any as S.Schema<AssociateSourceServersRequest>;
export interface AssociateSourceServersResponse {}
export const AssociateSourceServersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AssociateSourceServersResponse",
}) as any as S.Schema<AssociateSourceServersResponse>;
export type ChangeServerLifeCycleStateSourceServerLifecycleState = string;
export interface ChangeServerLifeCycleStateSourceServerLifecycle {
  state: string;
}
export const ChangeServerLifeCycleStateSourceServerLifecycle =
  /*@__PURE__*/ S.suspend(() => S.Struct({ state: S.String })).annotate({
    identifier: "ChangeServerLifeCycleStateSourceServerLifecycle",
  }) as any as S.Schema<ChangeServerLifeCycleStateSourceServerLifecycle>;
export interface ChangeServerLifeCycleStateRequest {
  sourceServerID: string;
  lifeCycle: ChangeServerLifeCycleStateSourceServerLifecycle;
  accountID?: string;
}
export const ChangeServerLifeCycleStateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceServerID: S.String,
    lifeCycle: ChangeServerLifeCycleStateSourceServerLifecycle,
    accountID: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ChangeServerLifeCycleState" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ChangeServerLifeCycleStateRequest",
}) as any as S.Schema<ChangeServerLifeCycleStateRequest>;
export type EC2InstanceID = string;
export type JobID = string;
export type FirstBoot = string;
export type LastKnownCheckType = string;
export type BoundedString = string;
export type LastKnownCheckStatus = string;
export interface LastKnownCheck {
  type?: string;
  name?: string;
  status?: string;
  error?: string;
  checkedAt?: Date;
}
export const LastKnownCheck = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(S.String),
    name: S.optional(S.String),
    status: S.optional(S.String),
    error: S.optional(S.String),
    checkedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "LastKnownCheck" }) as any as S.Schema<LastKnownCheck>;
export type LastKnownChecksList = LastKnownCheck[];
export const LastKnownChecksList = /*@__PURE__*/ S.Array(LastKnownCheck);
export interface LaunchedInstance {
  ec2InstanceID?: string;
  jobID?: string;
  firstBoot?: string;
  lastKnownChecks?: LastKnownCheck[];
  lastKnownFsxChecksStatus?: string;
}
export const LaunchedInstance = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ec2InstanceID: S.optional(S.String),
    jobID: S.optional(S.String),
    firstBoot: S.optional(S.String),
    lastKnownChecks: S.optional(LastKnownChecksList),
    lastKnownFsxChecksStatus: S.optional(S.String),
  }),
).annotate({
  identifier: "LaunchedInstance",
}) as any as S.Schema<LaunchedInstance>;
export type ISO8601DurationString = string;
export interface DataReplicationInfoReplicatedDisk {
  deviceName?: string;
  totalStorageBytes?: number;
  replicatedStorageBytes?: number;
  rescannedStorageBytes?: number;
  backloggedStorageBytes?: number;
}
export const DataReplicationInfoReplicatedDisk = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deviceName: S.optional(S.String),
    totalStorageBytes: S.optional(S.Number),
    replicatedStorageBytes: S.optional(S.Number),
    rescannedStorageBytes: S.optional(S.Number),
    backloggedStorageBytes: S.optional(S.Number),
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
export type ReplicatorID = string;
export interface DataReplicationInfo {
  lagDuration?: string;
  etaDateTime?: string;
  replicatedDisks?: DataReplicationInfoReplicatedDisk[];
  dataReplicationState?: string;
  dataReplicationInitiation?: DataReplicationInitiation;
  dataReplicationError?: DataReplicationError;
  lastSnapshotDateTime?: string;
  replicatorId?: string;
}
export const DataReplicationInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    lagDuration: S.optional(S.String),
    etaDateTime: S.optional(S.String),
    replicatedDisks: S.optional(DataReplicationInfoReplicatedDisks),
    dataReplicationState: S.optional(S.String),
    dataReplicationInitiation: S.optional(DataReplicationInitiation),
    dataReplicationError: S.optional(DataReplicationError),
    lastSnapshotDateTime: S.optional(S.String),
    replicatorId: S.optional(S.String),
  }),
).annotate({
  identifier: "DataReplicationInfo",
}) as any as S.Schema<DataReplicationInfo>;
export interface LifeCycleLastTestInitiated {
  apiCallDateTime?: string;
  jobID?: string;
}
export const LifeCycleLastTestInitiated = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    apiCallDateTime: S.optional(S.String),
    jobID: S.optional(S.String),
  }),
).annotate({
  identifier: "LifeCycleLastTestInitiated",
}) as any as S.Schema<LifeCycleLastTestInitiated>;
export interface LifeCycleLastTestReverted {
  apiCallDateTime?: string;
}
export const LifeCycleLastTestReverted = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ apiCallDateTime: S.optional(S.String) }),
).annotate({
  identifier: "LifeCycleLastTestReverted",
}) as any as S.Schema<LifeCycleLastTestReverted>;
export interface LifeCycleLastTestFinalized {
  apiCallDateTime?: string;
}
export const LifeCycleLastTestFinalized = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ apiCallDateTime: S.optional(S.String) }),
).annotate({
  identifier: "LifeCycleLastTestFinalized",
}) as any as S.Schema<LifeCycleLastTestFinalized>;
export interface LifeCycleLastTest {
  initiated?: LifeCycleLastTestInitiated;
  reverted?: LifeCycleLastTestReverted;
  finalized?: LifeCycleLastTestFinalized;
}
export const LifeCycleLastTest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    initiated: S.optional(LifeCycleLastTestInitiated),
    reverted: S.optional(LifeCycleLastTestReverted),
    finalized: S.optional(LifeCycleLastTestFinalized),
  }),
).annotate({
  identifier: "LifeCycleLastTest",
}) as any as S.Schema<LifeCycleLastTest>;
export interface LifeCycleLastCutoverInitiated {
  apiCallDateTime?: string;
  jobID?: string;
}
export const LifeCycleLastCutoverInitiated = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    apiCallDateTime: S.optional(S.String),
    jobID: S.optional(S.String),
  }),
).annotate({
  identifier: "LifeCycleLastCutoverInitiated",
}) as any as S.Schema<LifeCycleLastCutoverInitiated>;
export interface LifeCycleLastCutoverReverted {
  apiCallDateTime?: string;
}
export const LifeCycleLastCutoverReverted = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ apiCallDateTime: S.optional(S.String) }),
).annotate({
  identifier: "LifeCycleLastCutoverReverted",
}) as any as S.Schema<LifeCycleLastCutoverReverted>;
export interface LifeCycleLastCutoverFinalized {
  apiCallDateTime?: string;
}
export const LifeCycleLastCutoverFinalized = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ apiCallDateTime: S.optional(S.String) }),
).annotate({
  identifier: "LifeCycleLastCutoverFinalized",
}) as any as S.Schema<LifeCycleLastCutoverFinalized>;
export interface LifeCycleLastCutover {
  initiated?: LifeCycleLastCutoverInitiated;
  reverted?: LifeCycleLastCutoverReverted;
  finalized?: LifeCycleLastCutoverFinalized;
}
export const LifeCycleLastCutover = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    initiated: S.optional(LifeCycleLastCutoverInitiated),
    reverted: S.optional(LifeCycleLastCutoverReverted),
    finalized: S.optional(LifeCycleLastCutoverFinalized),
  }),
).annotate({
  identifier: "LifeCycleLastCutover",
}) as any as S.Schema<LifeCycleLastCutover>;
export type LifeCycleState = string;
export interface LifeCycle {
  addedToServiceDateTime?: string;
  firstByteDateTime?: string;
  elapsedReplicationDuration?: string;
  lastSeenByServiceDateTime?: string;
  lastTest?: LifeCycleLastTest;
  lastCutover?: LifeCycleLastCutover;
  state?: string;
}
export const LifeCycle = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    addedToServiceDateTime: S.optional(S.String),
    firstByteDateTime: S.optional(S.String),
    elapsedReplicationDuration: S.optional(S.String),
    lastSeenByServiceDateTime: S.optional(S.String),
    lastTest: S.optional(LifeCycleLastTest),
    lastCutover: S.optional(LifeCycleLastCutover),
    state: S.optional(S.String),
  }),
).annotate({ identifier: "LifeCycle" }) as any as S.Schema<LifeCycle>;
export type EC2InstanceType = string;
export interface IdentificationHints {
  fqdn?: string;
  hostname?: string;
  vmWareUuid?: string;
  awsInstanceID?: string;
  vmPath?: string;
}
export const IdentificationHints = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fqdn: S.optional(S.String),
    hostname: S.optional(S.String),
    vmWareUuid: S.optional(S.String),
    awsInstanceID: S.optional(S.String),
    vmPath: S.optional(S.String),
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
  }),
).annotate({
  identifier: "SourceProperties",
}) as any as S.Schema<SourceProperties>;
export type ReplicationType = string;
export type VcenterClientID = string;
export type UserProvidedId = string;
export type SecretArn = string;
export type ConnectorArn = string;
export interface SourceServerConnectorAction {
  credentialsSecretArn?: string;
  connectorArn?: string;
}
export const SourceServerConnectorAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    credentialsSecretArn: S.optional(S.String),
    connectorArn: S.optional(S.String),
  }),
).annotate({
  identifier: "SourceServerConnectorAction",
}) as any as S.Schema<SourceServerConnectorAction>;
export interface SourceServer {
  sourceServerID?: string;
  arn?: string;
  isArchived?: boolean;
  tags?: { [key: string]: string | undefined };
  launchedInstance?: LaunchedInstance;
  dataReplicationInfo?: DataReplicationInfo;
  lifeCycle?: LifeCycle;
  sourceProperties?: SourceProperties;
  replicationType?: string;
  vcenterClientID?: string;
  applicationID?: string;
  userProvidedID?: string;
  fqdnForActionFramework?: string;
  connectorAction?: SourceServerConnectorAction;
}
export const SourceServer = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceServerID: S.optional(S.String),
    arn: S.optional(S.String),
    isArchived: S.optional(S.Boolean),
    tags: S.optional(TagsMap),
    launchedInstance: S.optional(LaunchedInstance),
    dataReplicationInfo: S.optional(DataReplicationInfo),
    lifeCycle: S.optional(LifeCycle),
    sourceProperties: S.optional(SourceProperties),
    replicationType: S.optional(S.String),
    vcenterClientID: S.optional(S.String),
    applicationID: S.optional(S.String),
    userProvidedID: S.optional(S.String),
    fqdnForActionFramework: S.optional(S.String),
    connectorAction: S.optional(SourceServerConnectorAction),
  }),
).annotate({ identifier: "SourceServer" }) as any as S.Schema<SourceServer>;
export interface CreateApplicationRequest {
  name: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
  accountID?: string;
}
export const CreateApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    tags: S.optional(TagsMap),
    accountID: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CreateApplication" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateApplicationRequest",
}) as any as S.Schema<CreateApplicationRequest>;
export type ConnectorName = string;
export type SsmInstanceID = string;
export type S3BucketName = string;
export type CloudWatchLogGroupName = string;
export interface ConnectorSsmCommandConfig {
  s3OutputEnabled: boolean;
  outputS3BucketName?: string;
  cloudWatchOutputEnabled: boolean;
  cloudWatchLogGroupName?: string;
}
export const ConnectorSsmCommandConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    s3OutputEnabled: S.Boolean,
    outputS3BucketName: S.optional(S.String),
    cloudWatchOutputEnabled: S.Boolean,
    cloudWatchLogGroupName: S.optional(S.String),
  }),
).annotate({
  identifier: "ConnectorSsmCommandConfig",
}) as any as S.Schema<ConnectorSsmCommandConfig>;
export interface CreateConnectorRequest {
  name: string;
  ssmInstanceID: string;
  tags?: { [key: string]: string | undefined };
  ssmCommandConfig?: ConnectorSsmCommandConfig;
}
export const CreateConnectorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    ssmInstanceID: S.String,
    tags: S.optional(TagsMap),
    ssmCommandConfig: S.optional(ConnectorSsmCommandConfig),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CreateConnector" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateConnectorRequest",
}) as any as S.Schema<CreateConnectorRequest>;
export type ConnectorID = string;
export interface Connector {
  connectorID?: string;
  name?: string;
  ssmInstanceID?: string;
  arn?: string;
  tags?: { [key: string]: string | undefined };
  ssmCommandConfig?: ConnectorSsmCommandConfig;
}
export const Connector = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    connectorID: S.optional(S.String),
    name: S.optional(S.String),
    ssmInstanceID: S.optional(S.String),
    arn: S.optional(S.String),
    tags: S.optional(TagsMap),
    ssmCommandConfig: S.optional(ConnectorSsmCommandConfig),
  }),
).annotate({ identifier: "Connector" }) as any as S.Schema<Connector>;
export type PostLaunchActionsDeploymentType = string;
export type S3LogBucketName = string;
export type SsmDocumentName = string;
export type StrictlyPositiveInteger = number;
export type SsmDocumentParameterName = string;
export type SsmParameterStoreParameterType = string;
export type SsmParameterStoreParameterName = string;
export interface SsmParameterStoreParameter {
  parameterType: string;
  parameterName: string;
}
export const SsmParameterStoreParameter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ parameterType: S.String, parameterName: S.String }),
).annotate({
  identifier: "SsmParameterStoreParameter",
}) as any as S.Schema<SsmParameterStoreParameter>;
export type SsmParameterStoreParameters = SsmParameterStoreParameter[];
export const SsmParameterStoreParameters = /*@__PURE__*/ S.Array(
  SsmParameterStoreParameter,
);
export type SsmDocumentParameters = {
  [key: string]: SsmParameterStoreParameter[] | undefined;
};
export const SsmDocumentParameters = /*@__PURE__*/ S.Record(
  S.String,
  SsmParameterStoreParameters.pipe(S.optional),
);
export type JmesPathString = string;
export type SsmExternalParameter = { dynamicPath: string };
export const SsmExternalParameter = /*@__PURE__*/ S.Union([
  S.Struct({ dynamicPath: S.String }),
]);
export type SsmDocumentExternalParameters = {
  [key: string]: SsmExternalParameter | undefined;
};
export const SsmDocumentExternalParameters = /*@__PURE__*/ S.Record(
  S.String,
  SsmExternalParameter.pipe(S.optional),
);
export interface SsmDocument {
  actionName: string;
  ssmDocumentName: string;
  timeoutSeconds?: number;
  mustSucceedForCutover?: boolean;
  parameters?: { [key: string]: SsmParameterStoreParameter[] | undefined };
  externalParameters?: { [key: string]: SsmExternalParameter | undefined };
}
export const SsmDocument = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    actionName: S.String,
    ssmDocumentName: S.String,
    timeoutSeconds: S.optional(S.Number),
    mustSucceedForCutover: S.optional(S.Boolean),
    parameters: S.optional(SsmDocumentParameters),
    externalParameters: S.optional(SsmDocumentExternalParameters),
  }),
).annotate({ identifier: "SsmDocument" }) as any as S.Schema<SsmDocument>;
export type SsmDocuments = SsmDocument[];
export const SsmDocuments = /*@__PURE__*/ S.Array(SsmDocument);
export interface PostLaunchActions {
  deployment?: string;
  s3LogBucket?: string;
  s3OutputKeyPrefix?: string;
  cloudWatchLogGroupName?: string;
  ssmDocuments?: SsmDocument[];
}
export const PostLaunchActions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deployment: S.optional(S.String),
    s3LogBucket: S.optional(S.String),
    s3OutputKeyPrefix: S.optional(S.String),
    cloudWatchLogGroupName: S.optional(S.String),
    ssmDocuments: S.optional(SsmDocuments),
  }),
).annotate({
  identifier: "PostLaunchActions",
}) as any as S.Schema<PostLaunchActions>;
export type LaunchDisposition = string;
export type TargetInstanceTypeRightSizingMethod = string;
export interface Licensing {
  osByol?: boolean;
}
export const Licensing = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ osByol: S.optional(S.Boolean) }),
).annotate({ identifier: "Licensing" }) as any as S.Schema<Licensing>;
export type BootMode = string;
export type VolumeType = string;
export type Iops = number;
export type Throughput = number;
export interface LaunchTemplateDiskConf {
  volumeType?: string;
  iops?: number;
  throughput?: number;
}
export const LaunchTemplateDiskConf = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    volumeType: S.optional(S.String),
    iops: S.optional(S.Number),
    throughput: S.optional(S.Number),
  }),
).annotate({
  identifier: "LaunchTemplateDiskConf",
}) as any as S.Schema<LaunchTemplateDiskConf>;
export type KmsKeyArn = string;
export interface CreateLaunchConfigurationTemplateRequest {
  postLaunchActions?: PostLaunchActions;
  enableMapAutoTagging?: boolean;
  mapAutoTaggingMpeID?: string;
  tags?: { [key: string]: string | undefined };
  launchDisposition?: string;
  targetInstanceTypeRightSizingMethod?: string;
  copyPrivateIp?: boolean;
  associatePublicIpAddress?: boolean;
  copyTags?: boolean;
  licensing?: Licensing;
  bootMode?: string;
  smallVolumeMaxSize?: number;
  smallVolumeConf?: LaunchTemplateDiskConf;
  largeVolumeConf?: LaunchTemplateDiskConf;
  enableParametersEncryption?: boolean;
  parametersEncryptionKey?: string;
}
export const CreateLaunchConfigurationTemplateRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      postLaunchActions: S.optional(PostLaunchActions),
      enableMapAutoTagging: S.optional(S.Boolean),
      mapAutoTaggingMpeID: S.optional(S.String),
      tags: S.optional(TagsMap),
      launchDisposition: S.optional(S.String),
      targetInstanceTypeRightSizingMethod: S.optional(S.String),
      copyPrivateIp: S.optional(S.Boolean),
      associatePublicIpAddress: S.optional(S.Boolean),
      copyTags: S.optional(S.Boolean),
      licensing: S.optional(Licensing),
      bootMode: S.optional(S.String),
      smallVolumeMaxSize: S.optional(S.Number),
      smallVolumeConf: S.optional(LaunchTemplateDiskConf),
      largeVolumeConf: S.optional(LaunchTemplateDiskConf),
      enableParametersEncryption: S.optional(S.Boolean),
      parametersEncryptionKey: S.optional(S.String),
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
export type EC2LaunchConfigurationTemplateID = string;
export interface LaunchConfigurationTemplate {
  launchConfigurationTemplateID: string;
  arn?: string;
  postLaunchActions?: PostLaunchActions;
  enableMapAutoTagging?: boolean;
  mapAutoTaggingMpeID?: string;
  tags?: { [key: string]: string | undefined };
  ec2LaunchTemplateID?: string;
  launchDisposition?: string;
  targetInstanceTypeRightSizingMethod?: string;
  copyPrivateIp?: boolean;
  associatePublicIpAddress?: boolean;
  copyTags?: boolean;
  licensing?: Licensing;
  bootMode?: string;
  smallVolumeMaxSize?: number;
  smallVolumeConf?: LaunchTemplateDiskConf;
  largeVolumeConf?: LaunchTemplateDiskConf;
  enableParametersEncryption?: boolean;
  parametersEncryptionKey?: string;
}
export const LaunchConfigurationTemplate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    launchConfigurationTemplateID: S.String,
    arn: S.optional(S.String),
    postLaunchActions: S.optional(PostLaunchActions),
    enableMapAutoTagging: S.optional(S.Boolean),
    mapAutoTaggingMpeID: S.optional(S.String),
    tags: S.optional(TagsMap),
    ec2LaunchTemplateID: S.optional(S.String),
    launchDisposition: S.optional(S.String),
    targetInstanceTypeRightSizingMethod: S.optional(S.String),
    copyPrivateIp: S.optional(S.Boolean),
    associatePublicIpAddress: S.optional(S.Boolean),
    copyTags: S.optional(S.Boolean),
    licensing: S.optional(Licensing),
    bootMode: S.optional(S.String),
    smallVolumeMaxSize: S.optional(S.Number),
    smallVolumeConf: S.optional(LaunchTemplateDiskConf),
    largeVolumeConf: S.optional(LaunchTemplateDiskConf),
    enableParametersEncryption: S.optional(S.Boolean),
    parametersEncryptionKey: S.optional(S.String),
  }),
).annotate({
  identifier: "LaunchConfigurationTemplate",
}) as any as S.Schema<LaunchConfigurationTemplate>;
export type NetworkMigrationDefinitionName = string;
export type NetworkMigrationDefinitionDescription = string;
export type SourceEnvironment = string;
export type S3KeyName = string;
export interface SourceS3Configuration {
  s3Bucket: string;
  s3BucketOwner: string;
  s3Key: string;
}
export const SourceS3Configuration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ s3Bucket: S.String, s3BucketOwner: S.String, s3Key: S.String }),
).annotate({
  identifier: "SourceS3Configuration",
}) as any as S.Schema<SourceS3Configuration>;
export interface SourceConfiguration {
  sourceEnvironment: string;
  sourceS3Configuration: SourceS3Configuration;
}
export const SourceConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceEnvironment: S.String,
    sourceS3Configuration: SourceS3Configuration,
  }),
).annotate({
  identifier: "SourceConfiguration",
}) as any as S.Schema<SourceConfiguration>;
export type SourceConfigurationList = SourceConfiguration[];
export const SourceConfigurationList =
  /*@__PURE__*/ S.Array(SourceConfiguration);
export interface TargetS3Configuration {
  s3Bucket: string;
  s3BucketOwner: string;
}
export const TargetS3Configuration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ s3Bucket: S.String, s3BucketOwner: S.String }),
).annotate({
  identifier: "TargetS3Configuration",
}) as any as S.Schema<TargetS3Configuration>;
export type TargetNetworkTopology = string;
export type Cidr = string;
export interface TargetNetwork {
  topology: string;
  inboundCidr?: string;
  outboundCidr?: string;
  inspectionCidr?: string;
}
export const TargetNetwork = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    topology: S.String,
    inboundCidr: S.optional(S.String),
    outboundCidr: S.optional(S.String),
    inspectionCidr: S.optional(S.String),
  }),
).annotate({ identifier: "TargetNetwork" }) as any as S.Schema<TargetNetwork>;
export type TargetDeployment = string;
export type ScopeTagKey = string;
export type ScopeTagValue = string;
export type ScopeTagsMap = { [key: string]: string | undefined };
export const ScopeTagsMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateNetworkMigrationDefinitionRequest {
  name: string;
  description?: string;
  sourceConfigurations?: SourceConfiguration[];
  targetS3Configuration: TargetS3Configuration;
  targetNetwork: TargetNetwork;
  targetDeployment?: string;
  tags?: { [key: string]: string | undefined };
  scopeTags?: { [key: string]: string | undefined };
}
export const CreateNetworkMigrationDefinitionRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      name: S.String,
      description: S.optional(S.String),
      sourceConfigurations: S.optional(SourceConfigurationList),
      targetS3Configuration: TargetS3Configuration,
      targetNetwork: TargetNetwork,
      targetDeployment: S.optional(S.String),
      tags: S.optional(TagsMap),
      scopeTags: S.optional(ScopeTagsMap),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/network-migration/CreateNetworkMigrationDefinition",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateNetworkMigrationDefinitionRequest",
}) as any as S.Schema<CreateNetworkMigrationDefinitionRequest>;
export type NetworkMigrationDefinitionID = string;
export interface NetworkMigrationDefinition {
  arn?: string;
  networkMigrationDefinitionID?: string;
  name?: string;
  description?: string;
  sourceConfigurations?: SourceConfiguration[];
  targetS3Configuration?: TargetS3Configuration;
  targetNetwork?: TargetNetwork;
  targetDeployment?: string;
  createdAt?: Date;
  updatedAt?: Date;
  tags?: { [key: string]: string | undefined };
  scopeTags?: { [key: string]: string | undefined };
}
export const NetworkMigrationDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    networkMigrationDefinitionID: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    sourceConfigurations: S.optional(SourceConfigurationList),
    targetS3Configuration: S.optional(TargetS3Configuration),
    targetNetwork: S.optional(TargetNetwork),
    targetDeployment: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    tags: S.optional(TagsMap),
    scopeTags: S.optional(ScopeTagsMap),
  }),
).annotate({
  identifier: "NetworkMigrationDefinition",
}) as any as S.Schema<NetworkMigrationDefinition>;
export type SubnetID = string;
export type SecurityGroupID = string;
export type ReplicationServersSecurityGroupsIDs = string[];
export const ReplicationServersSecurityGroupsIDs = /*@__PURE__*/ S.Array(
  S.String,
);
export type ReplicationConfigurationDefaultLargeStagingDiskType = string;
export type ReplicationConfigurationEbsEncryption = string;
export type BandwidthThrottling = number;
export type ReplicationConfigurationDataPlaneRouting = string;
export type InternetProtocol = string;
export type StorageType = string;
export type StorageVirtualMachineId = string;
export interface FsxOntapConfiguration {
  storageVirtualMachineId: string;
  credentialsSecretArn: string;
}
export const FsxOntapConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    storageVirtualMachineId: S.String,
    credentialsSecretArn: S.String,
  }),
).annotate({
  identifier: "FsxOntapConfiguration",
}) as any as S.Schema<FsxOntapConfiguration>;
export interface StorageConfiguration {
  storageType: string;
  fsxOntapConfiguration?: FsxOntapConfiguration;
}
export const StorageConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    storageType: S.String,
    fsxOntapConfiguration: S.optional(FsxOntapConfiguration),
  }),
).annotate({
  identifier: "StorageConfiguration",
}) as any as S.Schema<StorageConfiguration>;
export interface CreateReplicationConfigurationTemplateRequest {
  stagingAreaSubnetId: string;
  associateDefaultSecurityGroup: boolean;
  replicationServersSecurityGroupsIDs: string[];
  replicationServerInstanceType: string;
  useDedicatedReplicationServer: boolean;
  defaultLargeStagingDiskType: string;
  ebsEncryption: string;
  ebsEncryptionKeyArn?: string;
  bandwidthThrottling: number;
  dataPlaneRouting: string;
  createPublicIP: boolean;
  stagingAreaTags: { [key: string]: string | undefined };
  useFipsEndpoint?: boolean;
  tags?: { [key: string]: string | undefined };
  internetProtocol?: string;
  storeSnapshotOnLocalZone?: boolean;
  storageConfiguration?: StorageConfiguration;
}
export const CreateReplicationConfigurationTemplateRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      stagingAreaSubnetId: S.String,
      associateDefaultSecurityGroup: S.Boolean,
      replicationServersSecurityGroupsIDs: ReplicationServersSecurityGroupsIDs,
      replicationServerInstanceType: S.String,
      useDedicatedReplicationServer: S.Boolean,
      defaultLargeStagingDiskType: S.String,
      ebsEncryption: S.String,
      ebsEncryptionKeyArn: S.optional(S.String),
      bandwidthThrottling: S.Number,
      dataPlaneRouting: S.String,
      createPublicIP: S.Boolean,
      stagingAreaTags: TagsMap,
      useFipsEndpoint: S.optional(S.Boolean),
      tags: S.optional(TagsMap),
      internetProtocol: S.optional(S.String),
      storeSnapshotOnLocalZone: S.optional(S.Boolean),
      storageConfiguration: S.optional(StorageConfiguration),
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
  useFipsEndpoint?: boolean;
  tags?: { [key: string]: string | undefined };
  internetProtocol?: string;
  storeSnapshotOnLocalZone?: boolean;
  storageConfiguration?: StorageConfiguration;
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
    useFipsEndpoint: S.optional(S.Boolean),
    tags: S.optional(TagsMap),
    internetProtocol: S.optional(S.String),
    storeSnapshotOnLocalZone: S.optional(S.Boolean),
    storageConfiguration: S.optional(StorageConfiguration),
  }),
).annotate({
  identifier: "ReplicationConfigurationTemplate",
}) as any as S.Schema<ReplicationConfigurationTemplate>;
export interface CreateWaveRequest {
  name: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
  accountID?: string;
}
export const CreateWaveRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    tags: S.optional(TagsMap),
    accountID: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CreateWave" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateWaveRequest",
}) as any as S.Schema<CreateWaveRequest>;
export interface DeleteApplicationRequest {
  applicationID: string;
  accountID?: string;
}
export const DeleteApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ applicationID: S.String, accountID: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeleteApplication" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteApplicationRequest",
}) as any as S.Schema<DeleteApplicationRequest>;
export interface DeleteApplicationResponse {}
export const DeleteApplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteApplicationResponse",
}) as any as S.Schema<DeleteApplicationResponse>;
export interface DeleteConnectorRequest {
  connectorID: string;
}
export const DeleteConnectorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ connectorID: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeleteConnector" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteConnectorRequest",
}) as any as S.Schema<DeleteConnectorRequest>;
export interface DeleteConnectorResponse {}
export const DeleteConnectorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteConnectorResponse",
}) as any as S.Schema<DeleteConnectorResponse>;
export interface DeleteJobRequest {
  jobID: string;
  accountID?: string;
}
export const DeleteJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobID: S.String, accountID: S.optional(S.String) }).pipe(
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
export interface DeleteNetworkMigrationDefinitionRequest {
  networkMigrationDefinitionID: string;
}
export const DeleteNetworkMigrationDefinitionRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ networkMigrationDefinitionID: S.String }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/network-migration/DeleteNetworkMigrationDefinition",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteNetworkMigrationDefinitionRequest",
}) as any as S.Schema<DeleteNetworkMigrationDefinitionRequest>;
export interface DeleteNetworkMigrationDefinitionResponse {}
export const DeleteNetworkMigrationDefinitionResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeleteNetworkMigrationDefinitionResponse",
}) as any as S.Schema<DeleteNetworkMigrationDefinitionResponse>;
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
export interface DeleteSourceServerRequest {
  sourceServerID: string;
  accountID?: string;
}
export const DeleteSourceServerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sourceServerID: S.String, accountID: S.optional(S.String) }).pipe(
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
export interface DeleteVcenterClientRequest {
  vcenterClientID: string;
}
export const DeleteVcenterClientRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ vcenterClientID: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeleteVcenterClient" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteVcenterClientRequest",
}) as any as S.Schema<DeleteVcenterClientRequest>;
export interface DeleteVcenterClientResponse {}
export const DeleteVcenterClientResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteVcenterClientResponse",
}) as any as S.Schema<DeleteVcenterClientResponse>;
export interface DeleteWaveRequest {
  waveID: string;
  accountID?: string;
}
export const DeleteWaveRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ waveID: S.String, accountID: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeleteWave" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteWaveRequest",
}) as any as S.Schema<DeleteWaveRequest>;
export interface DeleteWaveResponse {}
export const DeleteWaveResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteWaveResponse",
}) as any as S.Schema<DeleteWaveResponse>;
export type MaxResultsType = number;
export type PaginationToken = string;
export interface DescribeJobLogItemsRequest {
  jobID: string;
  maxResults?: number;
  nextToken?: string;
  accountID?: string;
}
export const DescribeJobLogItemsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobID: S.String,
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    accountID: S.optional(S.String),
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
export interface JobLogEventData {
  sourceServerID?: string;
  conversionServerID?: string;
  targetInstanceID?: string;
  rawError?: string;
  attemptCount?: number;
  maxAttemptsCount?: number;
}
export const JobLogEventData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceServerID: S.optional(S.String),
    conversionServerID: S.optional(S.String),
    targetInstanceID: S.optional(S.String),
    rawError: S.optional(S.String),
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
  accountID?: string;
}
export const DescribeJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    filters: S.optional(DescribeJobsRequestFilters),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    accountID: S.optional(S.String),
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
export type JobType = string;
export type InitiatedBy = string;
export type JobStatus = string;
export type LaunchStatus = string;
export type SsmDocumentType = string;
export type PostLaunchActionExecutionStatus = string;
export interface JobPostLaunchActionsLaunchStatus {
  ssmDocument?: SsmDocument;
  ssmDocumentType?: string;
  executionID?: string;
  executionStatus?: string;
  failureReason?: string;
}
export const JobPostLaunchActionsLaunchStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ssmDocument: S.optional(SsmDocument),
    ssmDocumentType: S.optional(S.String),
    executionID: S.optional(S.String),
    executionStatus: S.optional(S.String),
    failureReason: S.optional(S.String),
  }),
).annotate({
  identifier: "JobPostLaunchActionsLaunchStatus",
}) as any as S.Schema<JobPostLaunchActionsLaunchStatus>;
export type PostLaunchActionsLaunchStatusList =
  JobPostLaunchActionsLaunchStatus[];
export const PostLaunchActionsLaunchStatusList = /*@__PURE__*/ S.Array(
  JobPostLaunchActionsLaunchStatus,
);
export interface PostLaunchActionsStatus {
  ssmAgentDiscoveryDatetime?: string;
  postLaunchActionsLaunchStatusList?: JobPostLaunchActionsLaunchStatus[];
}
export const PostLaunchActionsStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ssmAgentDiscoveryDatetime: S.optional(S.String),
    postLaunchActionsLaunchStatusList: S.optional(
      PostLaunchActionsLaunchStatusList,
    ),
  }),
).annotate({
  identifier: "PostLaunchActionsStatus",
}) as any as S.Schema<PostLaunchActionsStatus>;
export interface ParticipatingServer {
  sourceServerID: string;
  launchStatus?: string;
  launchedEc2InstanceID?: string;
  postLaunchActionsStatus?: PostLaunchActionsStatus;
}
export const ParticipatingServer = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceServerID: S.String,
    launchStatus: S.optional(S.String),
    launchedEc2InstanceID: S.optional(S.String),
    postLaunchActionsStatus: S.optional(PostLaunchActionsStatus),
  }),
).annotate({
  identifier: "ParticipatingServer",
}) as any as S.Schema<ParticipatingServer>;
export type ParticipatingServers = ParticipatingServer[];
export const ParticipatingServers = /*@__PURE__*/ S.Array(ParticipatingServer);
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
  }),
).annotate({ identifier: "Job" }) as any as S.Schema<Job>;
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
export type DescribeSourceServersRequestFiltersIDs = string[];
export const DescribeSourceServersRequestFiltersIDs = /*@__PURE__*/ S.Array(
  S.String,
);
export type ReplicationTypes = string[];
export const ReplicationTypes = /*@__PURE__*/ S.Array(S.String);
export type LifeCycleStates = string[];
export const LifeCycleStates = /*@__PURE__*/ S.Array(S.String);
export type DescribeSourceServersRequestApplicationIDs = string[];
export const DescribeSourceServersRequestApplicationIDs = /*@__PURE__*/ S.Array(
  S.String,
);
export interface DescribeSourceServersRequestFilters {
  sourceServerIDs?: string[];
  isArchived?: boolean;
  replicationTypes?: string[];
  lifeCycleStates?: string[];
  applicationIDs?: string[];
}
export const DescribeSourceServersRequestFilters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceServerIDs: S.optional(DescribeSourceServersRequestFiltersIDs),
    isArchived: S.optional(S.Boolean),
    replicationTypes: S.optional(ReplicationTypes),
    lifeCycleStates: S.optional(LifeCycleStates),
    applicationIDs: S.optional(DescribeSourceServersRequestApplicationIDs),
  }),
).annotate({
  identifier: "DescribeSourceServersRequestFilters",
}) as any as S.Schema<DescribeSourceServersRequestFilters>;
export interface DescribeSourceServersRequest {
  filters?: DescribeSourceServersRequestFilters;
  maxResults?: number;
  nextToken?: string;
  accountID?: string;
}
export const DescribeSourceServersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    filters: S.optional(DescribeSourceServersRequestFilters),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    accountID: S.optional(S.String),
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
export interface DescribeVcenterClientsRequest {
  maxResults?: number;
  nextToken?: string;
}
export const DescribeVcenterClientsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/DescribeVcenterClients" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeVcenterClientsRequest",
}) as any as S.Schema<DescribeVcenterClientsRequest>;
export interface VcenterClient {
  vcenterClientID?: string;
  arn?: string;
  hostname?: string;
  vcenterUUID?: string;
  datacenterName?: string;
  lastSeenDatetime?: string;
  sourceServerTags?: { [key: string]: string | undefined };
  tags?: { [key: string]: string | undefined };
}
export const VcenterClient = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vcenterClientID: S.optional(S.String),
    arn: S.optional(S.String),
    hostname: S.optional(S.String),
    vcenterUUID: S.optional(S.String),
    datacenterName: S.optional(S.String),
    lastSeenDatetime: S.optional(S.String),
    sourceServerTags: S.optional(TagsMap),
    tags: S.optional(TagsMap),
  }),
).annotate({ identifier: "VcenterClient" }) as any as S.Schema<VcenterClient>;
export type VcenterClientList = VcenterClient[];
export const VcenterClientList = /*@__PURE__*/ S.Array(VcenterClient);
export interface DescribeVcenterClientsResponse {
  items?: VcenterClient[];
  nextToken?: string;
}
export const DescribeVcenterClientsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(VcenterClientList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeVcenterClientsResponse",
}) as any as S.Schema<DescribeVcenterClientsResponse>;
export interface DisassociateApplicationsRequest {
  waveID: string;
  applicationIDs: string[];
  accountID?: string;
}
export const DisassociateApplicationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    waveID: S.String,
    applicationIDs: ApplicationIDs,
    accountID: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DisassociateApplications" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateApplicationsRequest",
}) as any as S.Schema<DisassociateApplicationsRequest>;
export interface DisassociateApplicationsResponse {}
export const DisassociateApplicationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisassociateApplicationsResponse",
}) as any as S.Schema<DisassociateApplicationsResponse>;
export type DisassociateSourceServersRequestSourceServerIDs = string[];
export const DisassociateSourceServersRequestSourceServerIDs =
  /*@__PURE__*/ S.Array(S.String);
export interface DisassociateSourceServersRequest {
  applicationID: string;
  sourceServerIDs: string[];
  accountID?: string;
}
export const DisassociateSourceServersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationID: S.String,
    sourceServerIDs: DisassociateSourceServersRequestSourceServerIDs,
    accountID: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DisassociateSourceServers" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateSourceServersRequest",
}) as any as S.Schema<DisassociateSourceServersRequest>;
export interface DisassociateSourceServersResponse {}
export const DisassociateSourceServersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisassociateSourceServersResponse",
}) as any as S.Schema<DisassociateSourceServersResponse>;
export interface DisconnectFromServiceRequest {
  sourceServerID: string;
  accountID?: string;
}
export const DisconnectFromServiceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sourceServerID: S.String, accountID: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DisconnectFromService" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisconnectFromServiceRequest",
}) as any as S.Schema<DisconnectFromServiceRequest>;
export interface FinalizeCutoverRequest {
  sourceServerID: string;
  accountID?: string;
}
export const FinalizeCutoverRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sourceServerID: S.String, accountID: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/FinalizeCutover" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "FinalizeCutoverRequest",
}) as any as S.Schema<FinalizeCutoverRequest>;
export interface GetLaunchConfigurationRequest {
  sourceServerID: string;
  accountID?: string;
}
export const GetLaunchConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sourceServerID: S.String, accountID: S.optional(S.String) }).pipe(
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
export interface LaunchConfiguration {
  sourceServerID?: string;
  name?: string;
  ec2LaunchTemplateID?: string;
  launchDisposition?: string;
  targetInstanceTypeRightSizingMethod?: string;
  copyPrivateIp?: boolean;
  copyTags?: boolean;
  licensing?: Licensing;
  bootMode?: string;
  postLaunchActions?: PostLaunchActions;
  enableMapAutoTagging?: boolean;
  mapAutoTaggingMpeID?: string;
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
    bootMode: S.optional(S.String),
    postLaunchActions: S.optional(PostLaunchActions),
    enableMapAutoTagging: S.optional(S.Boolean),
    mapAutoTaggingMpeID: S.optional(S.String),
  }),
).annotate({
  identifier: "LaunchConfiguration",
}) as any as S.Schema<LaunchConfiguration>;
export interface GetNetworkMigrationDefinitionRequest {
  networkMigrationDefinitionID: string;
}
export const GetNetworkMigrationDefinitionRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ networkMigrationDefinitionID: S.String }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/network-migration/GetNetworkMigrationDefinition",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetNetworkMigrationDefinitionRequest",
}) as any as S.Schema<GetNetworkMigrationDefinitionRequest>;
export type NetworkMigrationExecutionID = string;
export type SegmentID = string;
export type ConstructID = string;
export interface GetNetworkMigrationMapperSegmentConstructRequest {
  networkMigrationDefinitionID: string;
  networkMigrationExecutionID: string;
  segmentID: string;
  constructID: string;
}
export const GetNetworkMigrationMapperSegmentConstructRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      networkMigrationDefinitionID: S.String,
      networkMigrationExecutionID: S.String,
      segmentID: S.String,
      constructID: S.String,
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/network-migration/GetNetworkMigrationMapperSegmentConstruct",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "GetNetworkMigrationMapperSegmentConstructRequest",
  }) as any as S.Schema<GetNetworkMigrationMapperSegmentConstructRequest>;
export type NetworkMigrationMapperSegmentConstructType = string;
export type SegmentConstructName = string;
export type SegmentConstructDescription = string;
export type LogicalID = string;
export type ConstructPropertyKey = string;
export type MarshalledResourceDefinition = string;
export type ConstructProperties = { [key: string]: string | undefined };
export const ConstructProperties = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface NetworkMigrationMapperSegmentConstruct {
  constructID?: string;
  constructType?: string;
  name?: string;
  description?: string;
  logicalID?: string;
  excluded?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  properties?: { [key: string]: string | undefined };
}
export const NetworkMigrationMapperSegmentConstruct = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      constructID: S.optional(S.String),
      constructType: S.optional(S.String),
      name: S.optional(S.String),
      description: S.optional(S.String),
      logicalID: S.optional(S.String),
      excluded: S.optional(S.Boolean),
      createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      properties: S.optional(ConstructProperties),
    }),
).annotate({
  identifier: "NetworkMigrationMapperSegmentConstruct",
}) as any as S.Schema<NetworkMigrationMapperSegmentConstruct>;
export interface GetNetworkMigrationMapperSegmentConstructResponse {
  construct?: NetworkMigrationMapperSegmentConstruct;
}
export const GetNetworkMigrationMapperSegmentConstructResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ construct: S.optional(NetworkMigrationMapperSegmentConstruct) }),
  ).annotate({
    identifier: "GetNetworkMigrationMapperSegmentConstructResponse",
  }) as any as S.Schema<GetNetworkMigrationMapperSegmentConstructResponse>;
export interface GetReplicationConfigurationRequest {
  sourceServerID: string;
  accountID?: string;
}
export const GetReplicationConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sourceServerID: S.String, accountID: S.optional(S.String) }).pipe(
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
}
export const ReplicationConfigurationReplicatedDisk = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      deviceName: S.optional(S.String),
      isBootDisk: S.optional(S.Boolean),
      stagingDiskType: S.optional(S.String),
      iops: S.optional(S.Number),
      throughput: S.optional(S.Number),
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
  useFipsEndpoint?: boolean;
  internetProtocol?: string;
  storeSnapshotOnLocalZone?: boolean;
  storageConfiguration?: StorageConfiguration;
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
    useFipsEndpoint: S.optional(S.Boolean),
    internetProtocol: S.optional(S.String),
    storeSnapshotOnLocalZone: S.optional(S.Boolean),
    storageConfiguration: S.optional(StorageConfiguration),
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
export type ApplicationIDsFilter = string[];
export const ApplicationIDsFilter = /*@__PURE__*/ S.Array(S.String);
export type WaveIDsFilter = string[];
export const WaveIDsFilter = /*@__PURE__*/ S.Array(S.String);
export interface ListApplicationsRequestFilters {
  applicationIDs?: string[];
  isArchived?: boolean;
  waveIDs?: string[];
}
export const ListApplicationsRequestFilters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationIDs: S.optional(ApplicationIDsFilter),
    isArchived: S.optional(S.Boolean),
    waveIDs: S.optional(WaveIDsFilter),
  }),
).annotate({
  identifier: "ListApplicationsRequestFilters",
}) as any as S.Schema<ListApplicationsRequestFilters>;
export interface ListApplicationsRequest {
  filters?: ListApplicationsRequestFilters;
  maxResults?: number;
  nextToken?: string;
  accountID?: string;
}
export const ListApplicationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    filters: S.optional(ListApplicationsRequestFilters),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    accountID: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListApplications" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListApplicationsRequest",
}) as any as S.Schema<ListApplicationsRequest>;
export type ApplicationsList = Application[];
export const ApplicationsList = /*@__PURE__*/ S.Array(Application);
export interface ListApplicationsResponse {
  items?: Application[];
  nextToken?: string;
}
export const ListApplicationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(ApplicationsList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListApplicationsResponse",
}) as any as S.Schema<ListApplicationsResponse>;
export type ConnectorIDsFilter = string[];
export const ConnectorIDsFilter = /*@__PURE__*/ S.Array(S.String);
export interface ListConnectorsRequestFilters {
  connectorIDs?: string[];
}
export const ListConnectorsRequestFilters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ connectorIDs: S.optional(ConnectorIDsFilter) }),
).annotate({
  identifier: "ListConnectorsRequestFilters",
}) as any as S.Schema<ListConnectorsRequestFilters>;
export interface ListConnectorsRequest {
  filters?: ListConnectorsRequestFilters;
  maxResults?: number;
  nextToken?: string;
}
export const ListConnectorsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    filters: S.optional(ListConnectorsRequestFilters),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListConnectors" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListConnectorsRequest",
}) as any as S.Schema<ListConnectorsRequest>;
export type ConnectorsList = Connector[];
export const ConnectorsList = /*@__PURE__*/ S.Array(Connector);
export interface ListConnectorsResponse {
  items?: Connector[];
  nextToken?: string;
}
export const ListConnectorsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(ConnectorsList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListConnectorsResponse",
}) as any as S.Schema<ListConnectorsResponse>;
export type ExportID = string;
export interface ListExportErrorsRequest {
  exportID: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListExportErrorsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    exportID: S.String,
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListExportErrors" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListExportErrorsRequest",
}) as any as S.Schema<ListExportErrorsRequest>;
export interface ExportErrorData {
  rawError?: string;
}
export const ExportErrorData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ rawError: S.optional(S.String) }),
).annotate({
  identifier: "ExportErrorData",
}) as any as S.Schema<ExportErrorData>;
export interface ExportTaskError {
  errorDateTime?: string;
  errorData?: ExportErrorData;
}
export const ExportTaskError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    errorDateTime: S.optional(S.String),
    errorData: S.optional(ExportErrorData),
  }),
).annotate({
  identifier: "ExportTaskError",
}) as any as S.Schema<ExportTaskError>;
export type ExportErrors = ExportTaskError[];
export const ExportErrors = /*@__PURE__*/ S.Array(ExportTaskError);
export interface ListExportErrorsResponse {
  items?: ExportTaskError[];
  nextToken?: string;
}
export const ListExportErrorsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(ExportErrors),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListExportErrorsResponse",
}) as any as S.Schema<ListExportErrorsResponse>;
export type ListExportsRequestFiltersExportIDs = string[];
export const ListExportsRequestFiltersExportIDs = /*@__PURE__*/ S.Array(
  S.String,
);
export interface ListExportsRequestFilters {
  exportIDs?: string[];
}
export const ListExportsRequestFilters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ exportIDs: S.optional(ListExportsRequestFiltersExportIDs) }),
).annotate({
  identifier: "ListExportsRequestFilters",
}) as any as S.Schema<ListExportsRequestFilters>;
export interface ListExportsRequest {
  filters?: ListExportsRequestFilters;
  maxResults?: number;
  nextToken?: string;
}
export const ListExportsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    filters: S.optional(ListExportsRequestFilters),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListExports" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListExportsRequest",
}) as any as S.Schema<ListExportsRequest>;
export type S3Key = string;
export type ExportStatus = string;
export interface ExportTaskSummary {
  serversCount?: number;
  applicationsCount?: number;
  wavesCount?: number;
}
export const ExportTaskSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serversCount: S.optional(S.Number),
    applicationsCount: S.optional(S.Number),
    wavesCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "ExportTaskSummary",
}) as any as S.Schema<ExportTaskSummary>;
export interface ExportTask {
  exportID?: string;
  arn?: string;
  s3Bucket?: string;
  s3Key?: string;
  s3BucketOwner?: string;
  creationDateTime?: string;
  endDateTime?: string;
  status?: string;
  progressPercentage?: number;
  summary?: ExportTaskSummary;
  tags?: { [key: string]: string | undefined };
}
export const ExportTask = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    exportID: S.optional(S.String),
    arn: S.optional(S.String),
    s3Bucket: S.optional(S.String),
    s3Key: S.optional(S.String),
    s3BucketOwner: S.optional(S.String),
    creationDateTime: S.optional(S.String),
    endDateTime: S.optional(S.String),
    status: S.optional(S.String),
    progressPercentage: S.optional(S.Number),
    summary: S.optional(ExportTaskSummary),
    tags: S.optional(TagsMap),
  }),
).annotate({ identifier: "ExportTask" }) as any as S.Schema<ExportTask>;
export type ExportsList = ExportTask[];
export const ExportsList = /*@__PURE__*/ S.Array(ExportTask);
export interface ListExportsResponse {
  items?: ExportTask[];
  nextToken?: string;
}
export const ListExportsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ items: S.optional(ExportsList), nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListExportsResponse",
}) as any as S.Schema<ListExportsResponse>;
export type ImportID = string;
export interface ListImportErrorsRequest {
  importID: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListImportErrorsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    importID: S.String,
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListImportErrors" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListImportErrorsRequest",
}) as any as S.Schema<ListImportErrorsRequest>;
export type ImportErrorType = string;
export interface ImportErrorData {
  sourceServerID?: string;
  applicationID?: string;
  waveID?: string;
  ec2LaunchTemplateID?: string;
  rowNumber?: number;
  rawError?: string;
  accountID?: string;
}
export const ImportErrorData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceServerID: S.optional(S.String),
    applicationID: S.optional(S.String),
    waveID: S.optional(S.String),
    ec2LaunchTemplateID: S.optional(S.String),
    rowNumber: S.optional(S.Number),
    rawError: S.optional(S.String),
    accountID: S.optional(S.String),
  }),
).annotate({
  identifier: "ImportErrorData",
}) as any as S.Schema<ImportErrorData>;
export interface ImportTaskError {
  errorDateTime?: string;
  errorType?: string;
  errorData?: ImportErrorData;
}
export const ImportTaskError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    errorDateTime: S.optional(S.String),
    errorType: S.optional(S.String),
    errorData: S.optional(ImportErrorData),
  }),
).annotate({
  identifier: "ImportTaskError",
}) as any as S.Schema<ImportTaskError>;
export type ImportErrors = ImportTaskError[];
export const ImportErrors = /*@__PURE__*/ S.Array(ImportTaskError);
export interface ListImportErrorsResponse {
  items?: ImportTaskError[];
  nextToken?: string;
}
export const ListImportErrorsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(ImportErrors),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListImportErrorsResponse",
}) as any as S.Schema<ListImportErrorsResponse>;
export type ImportFileEnrichmentJobID = string;
export type ImportFileEnrichmentsIDsFilter = string[];
export const ImportFileEnrichmentsIDsFilter = /*@__PURE__*/ S.Array(S.String);
export interface ListImportFileEnrichmentsFilters {
  jobIDs?: string[];
}
export const ListImportFileEnrichmentsFilters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobIDs: S.optional(ImportFileEnrichmentsIDsFilter) }),
).annotate({
  identifier: "ListImportFileEnrichmentsFilters",
}) as any as S.Schema<ListImportFileEnrichmentsFilters>;
export interface ListImportFileEnrichmentsRequest {
  filters?: ListImportFileEnrichmentsFilters;
  maxResults?: number;
  nextToken?: string;
}
export const ListImportFileEnrichmentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    filters: S.optional(ListImportFileEnrichmentsFilters),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/network-migration/ListImportFileEnrichments",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListImportFileEnrichmentsRequest",
}) as any as S.Schema<ListImportFileEnrichmentsRequest>;
export type ImportFileEnrichmentStatus = string;
export type EncryptionAlgorithm = string;
export type Hash = string;
export interface Checksum {
  encryptionAlgorithm?: string;
  hash?: string;
}
export const Checksum = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    encryptionAlgorithm: S.optional(S.String),
    hash: S.optional(S.String),
  }),
).annotate({ identifier: "Checksum" }) as any as S.Schema<Checksum>;
export interface EnrichmentTargetS3Configuration {
  s3Bucket: string;
  s3BucketOwner: string;
  s3Key: string;
}
export const EnrichmentTargetS3Configuration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ s3Bucket: S.String, s3BucketOwner: S.String, s3Key: S.String }),
).annotate({
  identifier: "EnrichmentTargetS3Configuration",
}) as any as S.Schema<EnrichmentTargetS3Configuration>;
export interface ImportFileEnrichment {
  jobID?: string;
  createdAt?: Date;
  endedAt?: Date;
  status?: string;
  statusDetails?: string;
  checksum?: Checksum;
  s3BucketTarget?: EnrichmentTargetS3Configuration;
}
export const ImportFileEnrichment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobID: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    endedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    status: S.optional(S.String),
    statusDetails: S.optional(S.String),
    checksum: S.optional(Checksum),
    s3BucketTarget: S.optional(EnrichmentTargetS3Configuration),
  }),
).annotate({
  identifier: "ImportFileEnrichment",
}) as any as S.Schema<ImportFileEnrichment>;
export type ImportFileEnrichmentsList = ImportFileEnrichment[];
export const ImportFileEnrichmentsList =
  /*@__PURE__*/ S.Array(ImportFileEnrichment);
export interface ListImportFileEnrichmentsResponse {
  items?: ImportFileEnrichment[];
  nextToken?: string;
}
export const ListImportFileEnrichmentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(ImportFileEnrichmentsList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListImportFileEnrichmentsResponse",
}) as any as S.Schema<ListImportFileEnrichmentsResponse>;
export type ImportIDsFilter = string[];
export const ImportIDsFilter = /*@__PURE__*/ S.Array(S.String);
export interface ListImportsRequestFilters {
  importIDs?: string[];
}
export const ListImportsRequestFilters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ importIDs: S.optional(ImportIDsFilter) }),
).annotate({
  identifier: "ListImportsRequestFilters",
}) as any as S.Schema<ListImportsRequestFilters>;
export interface ListImportsRequest {
  filters?: ListImportsRequestFilters;
  maxResults?: number;
  nextToken?: string;
}
export const ListImportsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    filters: S.optional(ListImportsRequestFilters),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListImports" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListImportsRequest",
}) as any as S.Schema<ListImportsRequest>;
export interface S3BucketSource {
  s3Bucket: string;
  s3Key: string;
  s3BucketOwner?: string;
}
export const S3BucketSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    s3Bucket: S.String,
    s3Key: S.String,
    s3BucketOwner: S.optional(S.String),
  }),
).annotate({ identifier: "S3BucketSource" }) as any as S.Schema<S3BucketSource>;
export type ImportStatus = string;
export interface ImportTaskSummaryWaves {
  createdCount?: number;
  modifiedCount?: number;
}
export const ImportTaskSummaryWaves = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    createdCount: S.optional(S.Number),
    modifiedCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "ImportTaskSummaryWaves",
}) as any as S.Schema<ImportTaskSummaryWaves>;
export interface ImportTaskSummaryApplications {
  createdCount?: number;
  modifiedCount?: number;
}
export const ImportTaskSummaryApplications = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    createdCount: S.optional(S.Number),
    modifiedCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "ImportTaskSummaryApplications",
}) as any as S.Schema<ImportTaskSummaryApplications>;
export interface ImportTaskSummaryServers {
  createdCount?: number;
  modifiedCount?: number;
}
export const ImportTaskSummaryServers = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    createdCount: S.optional(S.Number),
    modifiedCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "ImportTaskSummaryServers",
}) as any as S.Schema<ImportTaskSummaryServers>;
export interface ImportTaskSummary {
  waves?: ImportTaskSummaryWaves;
  applications?: ImportTaskSummaryApplications;
  servers?: ImportTaskSummaryServers;
}
export const ImportTaskSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    waves: S.optional(ImportTaskSummaryWaves),
    applications: S.optional(ImportTaskSummaryApplications),
    servers: S.optional(ImportTaskSummaryServers),
  }),
).annotate({
  identifier: "ImportTaskSummary",
}) as any as S.Schema<ImportTaskSummary>;
export interface ImportTask {
  importID?: string;
  arn?: string;
  s3BucketSource?: S3BucketSource;
  creationDateTime?: string;
  endDateTime?: string;
  status?: string;
  progressPercentage?: number;
  summary?: ImportTaskSummary;
  tags?: { [key: string]: string | undefined };
}
export const ImportTask = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    importID: S.optional(S.String),
    arn: S.optional(S.String),
    s3BucketSource: S.optional(S3BucketSource),
    creationDateTime: S.optional(S.String),
    endDateTime: S.optional(S.String),
    status: S.optional(S.String),
    progressPercentage: S.optional(S.Number),
    summary: S.optional(ImportTaskSummary),
    tags: S.optional(TagsMap),
  }),
).annotate({ identifier: "ImportTask" }) as any as S.Schema<ImportTask>;
export type ImportList = ImportTask[];
export const ImportList = /*@__PURE__*/ S.Array(ImportTask);
export interface ListImportsResponse {
  items?: ImportTask[];
  nextToken?: string;
}
export const ListImportsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ items: S.optional(ImportList), nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListImportsResponse",
}) as any as S.Schema<ListImportsResponse>;
export interface ListManagedAccountsRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListManagedAccountsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListManagedAccounts" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListManagedAccountsRequest",
}) as any as S.Schema<ListManagedAccountsRequest>;
export interface ManagedAccount {
  accountId?: string;
}
export const ManagedAccount = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ accountId: S.optional(S.String) }),
).annotate({ identifier: "ManagedAccount" }) as any as S.Schema<ManagedAccount>;
export type ManagedAccounts = ManagedAccount[];
export const ManagedAccounts = /*@__PURE__*/ S.Array(ManagedAccount);
export interface ListManagedAccountsResponse {
  items: ManagedAccount[];
  nextToken?: string;
}
export const ListManagedAccountsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ items: ManagedAccounts, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListManagedAccountsResponse",
}) as any as S.Schema<ListManagedAccountsResponse>;
export type NetworkMigrationJobID = string;
export type ListNetworkMigrationAnalysesIDsFilter = string[];
export const ListNetworkMigrationAnalysesIDsFilter = /*@__PURE__*/ S.Array(
  S.String,
);
export interface ListNetworkMigrationAnalysesFilters {
  jobIDs?: string[];
}
export const ListNetworkMigrationAnalysesFilters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobIDs: S.optional(ListNetworkMigrationAnalysesIDsFilter) }),
).annotate({
  identifier: "ListNetworkMigrationAnalysesFilters",
}) as any as S.Schema<ListNetworkMigrationAnalysesFilters>;
export interface ListNetworkMigrationAnalysesRequest {
  networkMigrationExecutionID: string;
  networkMigrationDefinitionID: string;
  filters?: ListNetworkMigrationAnalysesFilters;
  maxResults?: number;
  nextToken?: string;
}
export const ListNetworkMigrationAnalysesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    networkMigrationExecutionID: S.String,
    networkMigrationDefinitionID: S.String,
    filters: S.optional(ListNetworkMigrationAnalysesFilters),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/network-migration/ListNetworkMigrationAnalyses",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListNetworkMigrationAnalysesRequest",
}) as any as S.Schema<ListNetworkMigrationAnalysesRequest>;
export type NetworkMigrationJobStatus = string;
export interface NetworkMigrationAnalysisJobDetails {
  jobID?: string;
  networkMigrationExecutionID?: string;
  networkMigrationDefinitionID?: string;
  createdAt?: Date;
  endedAt?: Date;
  status?: string;
  statusDetails?: string;
}
export const NetworkMigrationAnalysisJobDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobID: S.optional(S.String),
    networkMigrationExecutionID: S.optional(S.String),
    networkMigrationDefinitionID: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    endedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    status: S.optional(S.String),
    statusDetails: S.optional(S.String),
  }),
).annotate({
  identifier: "NetworkMigrationAnalysisJobDetails",
}) as any as S.Schema<NetworkMigrationAnalysisJobDetails>;
export type NetworkMigrationAnalysesList = NetworkMigrationAnalysisJobDetails[];
export const NetworkMigrationAnalysesList = /*@__PURE__*/ S.Array(
  NetworkMigrationAnalysisJobDetails,
);
export interface ListNetworkMigrationAnalysesResponse {
  items?: NetworkMigrationAnalysisJobDetails[];
  nextToken?: string;
}
export const ListNetworkMigrationAnalysesResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      items: S.optional(NetworkMigrationAnalysesList),
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListNetworkMigrationAnalysesResponse",
}) as any as S.Schema<ListNetworkMigrationAnalysesResponse>;
export type VpcID = string;
export type VpcIDsFilter = string[];
export const VpcIDsFilter = /*@__PURE__*/ S.Array(S.String);
export interface ListNetworkMigrationAnalysisResultsFilters {
  vpcIDs?: string[];
}
export const ListNetworkMigrationAnalysisResultsFilters =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ vpcIDs: S.optional(VpcIDsFilter) }),
  ).annotate({
    identifier: "ListNetworkMigrationAnalysisResultsFilters",
  }) as any as S.Schema<ListNetworkMigrationAnalysisResultsFilters>;
export interface ListNetworkMigrationAnalysisResultsRequest {
  networkMigrationExecutionID: string;
  networkMigrationDefinitionID: string;
  filters?: ListNetworkMigrationAnalysisResultsFilters;
  maxResults?: number;
  nextToken?: string;
}
export const ListNetworkMigrationAnalysisResultsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      networkMigrationExecutionID: S.String,
      networkMigrationDefinitionID: S.String,
      filters: S.optional(ListNetworkMigrationAnalysisResultsFilters),
      maxResults: S.optional(S.Number),
      nextToken: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/network-migration/ListNetworkMigrationAnalysisResults",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListNetworkMigrationAnalysisResultsRequest",
  }) as any as S.Schema<ListNetworkMigrationAnalysisResultsRequest>;
export type AnalyzerType = string;
export interface NetworkMigrationAnalysisResultSource {
  vpcID?: string;
  subnetID?: string;
}
export const NetworkMigrationAnalysisResultSource = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ vpcID: S.optional(S.String), subnetID: S.optional(S.String) }),
).annotate({
  identifier: "NetworkMigrationAnalysisResultSource",
}) as any as S.Schema<NetworkMigrationAnalysisResultSource>;
export interface NetworkMigrationAnalysisResultTarget {
  vpcID?: string;
  subnetID?: string;
}
export const NetworkMigrationAnalysisResultTarget = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ vpcID: S.optional(S.String), subnetID: S.optional(S.String) }),
).annotate({
  identifier: "NetworkMigrationAnalysisResultTarget",
}) as any as S.Schema<NetworkMigrationAnalysisResultTarget>;
export type NetworkMigrationAnalysisResultStatus = string;
export interface NetworkMigrationAnalysisResult {
  jobID?: string;
  networkMigrationExecutionID?: string;
  networkMigrationDefinitionID?: string;
  analyzerType?: string;
  source?: NetworkMigrationAnalysisResultSource;
  target?: NetworkMigrationAnalysisResultTarget;
  status?: string;
  analysisResult?: string;
}
export const NetworkMigrationAnalysisResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobID: S.optional(S.String),
    networkMigrationExecutionID: S.optional(S.String),
    networkMigrationDefinitionID: S.optional(S.String),
    analyzerType: S.optional(S.String),
    source: S.optional(NetworkMigrationAnalysisResultSource),
    target: S.optional(NetworkMigrationAnalysisResultTarget),
    status: S.optional(S.String),
    analysisResult: S.optional(S.String),
  }),
).annotate({
  identifier: "NetworkMigrationAnalysisResult",
}) as any as S.Schema<NetworkMigrationAnalysisResult>;
export type NetworkMigrationAnalysisResultsList =
  NetworkMigrationAnalysisResult[];
export const NetworkMigrationAnalysisResultsList = /*@__PURE__*/ S.Array(
  NetworkMigrationAnalysisResult,
);
export interface ListNetworkMigrationAnalysisResultsResponse {
  items?: NetworkMigrationAnalysisResult[];
  nextToken?: string;
}
export const ListNetworkMigrationAnalysisResultsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      items: S.optional(NetworkMigrationAnalysisResultsList),
      nextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListNetworkMigrationAnalysisResultsResponse",
  }) as any as S.Schema<ListNetworkMigrationAnalysisResultsResponse>;
export type ListNetworkMigrationCodeGenerationsIDsFilter = string[];
export const ListNetworkMigrationCodeGenerationsIDsFilter =
  /*@__PURE__*/ S.Array(S.String);
export interface ListNetworkMigrationCodeGenerationsFilters {
  jobIDs?: string[];
}
export const ListNetworkMigrationCodeGenerationsFilters =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      jobIDs: S.optional(ListNetworkMigrationCodeGenerationsIDsFilter),
    }),
  ).annotate({
    identifier: "ListNetworkMigrationCodeGenerationsFilters",
  }) as any as S.Schema<ListNetworkMigrationCodeGenerationsFilters>;
export interface ListNetworkMigrationCodeGenerationsRequest {
  networkMigrationExecutionID: string;
  networkMigrationDefinitionID: string;
  filters?: ListNetworkMigrationCodeGenerationsFilters;
  maxResults?: number;
  nextToken?: string;
}
export const ListNetworkMigrationCodeGenerationsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      networkMigrationExecutionID: S.String,
      networkMigrationDefinitionID: S.String,
      filters: S.optional(ListNetworkMigrationCodeGenerationsFilters),
      maxResults: S.optional(S.Number),
      nextToken: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/network-migration/ListNetworkMigrationCodeGenerations",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListNetworkMigrationCodeGenerationsRequest",
  }) as any as S.Schema<ListNetworkMigrationCodeGenerationsRequest>;
export type CodeGenerationOutputFormatType = string;
export type CodeGenerationOutputFormatStatus = string;
export interface CodeGenerationOutputFormatStatusDetails {
  status?: string;
  statusDetailList?: string;
}
export const CodeGenerationOutputFormatStatusDetails = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      status: S.optional(S.String),
      statusDetailList: S.optional(S.String),
    }),
).annotate({
  identifier: "CodeGenerationOutputFormatStatusDetails",
}) as any as S.Schema<CodeGenerationOutputFormatStatusDetails>;
export type CodeGenerationOutputFormatStatusDetailsMap = {
  [key: string]: CodeGenerationOutputFormatStatusDetails | undefined;
};
export const CodeGenerationOutputFormatStatusDetailsMap =
  /*@__PURE__*/ S.Record(
    S.String,
    CodeGenerationOutputFormatStatusDetails.pipe(S.optional),
  );
export interface NetworkMigrationCodeGenerationJobDetails {
  jobID?: string;
  networkMigrationExecutionID?: string;
  networkMigrationDefinitionID?: string;
  createdAt?: Date;
  endedAt?: Date;
  status?: string;
  statusDetails?: string;
  codeGenerationOutputFormatStatusDetailsMap?: {
    [key: string]: CodeGenerationOutputFormatStatusDetails | undefined;
  };
}
export const NetworkMigrationCodeGenerationJobDetails = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      jobID: S.optional(S.String),
      networkMigrationExecutionID: S.optional(S.String),
      networkMigrationDefinitionID: S.optional(S.String),
      createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      endedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      status: S.optional(S.String),
      statusDetails: S.optional(S.String),
      codeGenerationOutputFormatStatusDetailsMap: S.optional(
        CodeGenerationOutputFormatStatusDetailsMap,
      ),
    }),
).annotate({
  identifier: "NetworkMigrationCodeGenerationJobDetails",
}) as any as S.Schema<NetworkMigrationCodeGenerationJobDetails>;
export type NetworkMigrationCodeGenerationsList =
  NetworkMigrationCodeGenerationJobDetails[];
export const NetworkMigrationCodeGenerationsList = /*@__PURE__*/ S.Array(
  NetworkMigrationCodeGenerationJobDetails,
);
export interface ListNetworkMigrationCodeGenerationsResponse {
  items?: NetworkMigrationCodeGenerationJobDetails[];
  nextToken?: string;
}
export const ListNetworkMigrationCodeGenerationsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      items: S.optional(NetworkMigrationCodeGenerationsList),
      nextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListNetworkMigrationCodeGenerationsResponse",
  }) as any as S.Schema<ListNetworkMigrationCodeGenerationsResponse>;
export type ListNetworkMigrationCodeGenerationSegmentsIDsFilter = string[];
export const ListNetworkMigrationCodeGenerationSegmentsIDsFilter =
  /*@__PURE__*/ S.Array(S.String);
export interface ListNetworkMigrationCodeGenerationSegmentsFilters {
  segmentIDs?: string[];
}
export const ListNetworkMigrationCodeGenerationSegmentsFilters =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      segmentIDs: S.optional(
        ListNetworkMigrationCodeGenerationSegmentsIDsFilter,
      ),
    }),
  ).annotate({
    identifier: "ListNetworkMigrationCodeGenerationSegmentsFilters",
  }) as any as S.Schema<ListNetworkMigrationCodeGenerationSegmentsFilters>;
export interface ListNetworkMigrationCodeGenerationSegmentsRequest {
  networkMigrationExecutionID: string;
  networkMigrationDefinitionID: string;
  filters?: ListNetworkMigrationCodeGenerationSegmentsFilters;
  maxResults?: number;
  nextToken?: string;
}
export const ListNetworkMigrationCodeGenerationSegmentsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      networkMigrationExecutionID: S.String,
      networkMigrationDefinitionID: S.String,
      filters: S.optional(ListNetworkMigrationCodeGenerationSegmentsFilters),
      maxResults: S.optional(S.Number),
      nextToken: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/network-migration/ListNetworkMigrationCodeGenerationSegments",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListNetworkMigrationCodeGenerationSegmentsRequest",
  }) as any as S.Schema<ListNetworkMigrationCodeGenerationSegmentsRequest>;
export type NetworkMigrationCodeGenerationSegmentType = string;
export type NetworkMigrationCodeGenerationArtifactID = string;
export type NetworkMigrationCodeGenerationArtifactType = string;
export type NetworkMigrationCodeGenerationArtifactSubType = string;
export interface S3Configuration {
  s3Bucket?: string;
  s3BucketOwner?: string;
  s3Key?: string;
}
export const S3Configuration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    s3Bucket: S.optional(S.String),
    s3BucketOwner: S.optional(S.String),
    s3Key: S.optional(S.String),
  }),
).annotate({
  identifier: "S3Configuration",
}) as any as S.Schema<S3Configuration>;
export interface NetworkMigrationCodeGenerationArtifact {
  artifactID?: string;
  artifactType?: string;
  artifactSubType?: string;
  logicalID?: string;
  outputS3Configuration?: S3Configuration;
  checksum?: Checksum;
  createdAt?: Date;
}
export const NetworkMigrationCodeGenerationArtifact = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      artifactID: S.optional(S.String),
      artifactType: S.optional(S.String),
      artifactSubType: S.optional(S.String),
      logicalID: S.optional(S.String),
      outputS3Configuration: S.optional(S3Configuration),
      checksum: S.optional(Checksum),
      createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    }),
).annotate({
  identifier: "NetworkMigrationCodeGenerationArtifact",
}) as any as S.Schema<NetworkMigrationCodeGenerationArtifact>;
export type NetworkMigrationCodeGenerationArtifacts =
  NetworkMigrationCodeGenerationArtifact[];
export const NetworkMigrationCodeGenerationArtifacts = /*@__PURE__*/ S.Array(
  NetworkMigrationCodeGenerationArtifact,
);
export type ReferencedSegmentsList = string[];
export const ReferencedSegmentsList = /*@__PURE__*/ S.Array(S.String);
export interface NetworkMigrationCodeGenerationSegment {
  jobID?: string;
  networkMigrationExecutionID?: string;
  networkMigrationDefinitionID?: string;
  segmentID?: string;
  segmentType?: string;
  logicalID?: string;
  mapperSegmentID?: string;
  artifacts?: NetworkMigrationCodeGenerationArtifact[];
  referencedSegments?: string[];
  createdAt?: Date;
}
export const NetworkMigrationCodeGenerationSegment = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      jobID: S.optional(S.String),
      networkMigrationExecutionID: S.optional(S.String),
      networkMigrationDefinitionID: S.optional(S.String),
      segmentID: S.optional(S.String),
      segmentType: S.optional(S.String),
      logicalID: S.optional(S.String),
      mapperSegmentID: S.optional(S.String),
      artifacts: S.optional(NetworkMigrationCodeGenerationArtifacts),
      referencedSegments: S.optional(ReferencedSegmentsList),
      createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    }),
).annotate({
  identifier: "NetworkMigrationCodeGenerationSegment",
}) as any as S.Schema<NetworkMigrationCodeGenerationSegment>;
export type NetworkMigrationCodeGenerationSegmentsList =
  NetworkMigrationCodeGenerationSegment[];
export const NetworkMigrationCodeGenerationSegmentsList = /*@__PURE__*/ S.Array(
  NetworkMigrationCodeGenerationSegment,
);
export interface ListNetworkMigrationCodeGenerationSegmentsResponse {
  items?: NetworkMigrationCodeGenerationSegment[];
  nextToken?: string;
}
export const ListNetworkMigrationCodeGenerationSegmentsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      items: S.optional(NetworkMigrationCodeGenerationSegmentsList),
      nextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListNetworkMigrationCodeGenerationSegmentsResponse",
  }) as any as S.Schema<ListNetworkMigrationCodeGenerationSegmentsResponse>;
export type NetworkMigrationDefintionsIDsFilter = string[];
export const NetworkMigrationDefintionsIDsFilter = /*@__PURE__*/ S.Array(
  S.String,
);
export interface ListNetworkMigrationDefinitionsRequestFilters {
  networkMigrationDefinitionIDs?: string[];
}
export const ListNetworkMigrationDefinitionsRequestFilters =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      networkMigrationDefinitionIDs: S.optional(
        NetworkMigrationDefintionsIDsFilter,
      ),
    }),
  ).annotate({
    identifier: "ListNetworkMigrationDefinitionsRequestFilters",
  }) as any as S.Schema<ListNetworkMigrationDefinitionsRequestFilters>;
export interface ListNetworkMigrationDefinitionsRequest {
  filters?: ListNetworkMigrationDefinitionsRequestFilters;
  nextToken?: string;
  maxResults?: number;
}
export const ListNetworkMigrationDefinitionsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      filters: S.optional(ListNetworkMigrationDefinitionsRequestFilters),
      nextToken: S.optional(S.String),
      maxResults: S.optional(S.Number),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/network-migration/ListNetworkMigrationDefinitions",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListNetworkMigrationDefinitionsRequest",
}) as any as S.Schema<ListNetworkMigrationDefinitionsRequest>;
export interface NetworkMigrationDefinitionSummary {
  networkMigrationDefinitionID?: string;
  name?: string;
  sourceEnvironment?: string;
  arn?: string;
  tags?: { [key: string]: string | undefined };
  scopeTags?: { [key: string]: string | undefined };
}
export const NetworkMigrationDefinitionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    networkMigrationDefinitionID: S.optional(S.String),
    name: S.optional(S.String),
    sourceEnvironment: S.optional(S.String),
    arn: S.optional(S.String),
    tags: S.optional(TagsMap),
    scopeTags: S.optional(ScopeTagsMap),
  }),
).annotate({
  identifier: "NetworkMigrationDefinitionSummary",
}) as any as S.Schema<NetworkMigrationDefinitionSummary>;
export type NetworkMigrationDefinitionSummariesList =
  NetworkMigrationDefinitionSummary[];
export const NetworkMigrationDefinitionSummariesList = /*@__PURE__*/ S.Array(
  NetworkMigrationDefinitionSummary,
);
export interface ListNetworkMigrationDefinitionsResponse {
  items?: NetworkMigrationDefinitionSummary[];
  nextToken?: string;
}
export const ListNetworkMigrationDefinitionsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      items: S.optional(NetworkMigrationDefinitionSummariesList),
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListNetworkMigrationDefinitionsResponse",
}) as any as S.Schema<ListNetworkMigrationDefinitionsResponse>;
export interface ListNetworkMigrationDeployedStacksRequest {
  networkMigrationExecutionID: string;
  networkMigrationDefinitionID: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListNetworkMigrationDeployedStacksRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      networkMigrationExecutionID: S.String,
      networkMigrationDefinitionID: S.String,
      maxResults: S.optional(S.Number),
      nextToken: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/network-migration/ListNetworkMigrationDeployedStacks",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListNetworkMigrationDeployedStacksRequest",
  }) as any as S.Schema<ListNetworkMigrationDeployedStacksRequest>;
export type NetworkMigrationDeployedStackStatus = string;
export type PhysicalID = string;
export type NetworkMigrationFailedResourceStatus = string;
export interface NetworkMigrationFailedResourceDetails {
  logicalID?: string;
  status?: string;
  statusReason?: string;
}
export const NetworkMigrationFailedResourceDetails = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      logicalID: S.optional(S.String),
      status: S.optional(S.String),
      statusReason: S.optional(S.String),
    }),
).annotate({
  identifier: "NetworkMigrationFailedResourceDetails",
}) as any as S.Schema<NetworkMigrationFailedResourceDetails>;
export type NetworkMigrationFailedResourcesList =
  NetworkMigrationFailedResourceDetails[];
export const NetworkMigrationFailedResourcesList = /*@__PURE__*/ S.Array(
  NetworkMigrationFailedResourceDetails,
);
export interface NetworkMigrationDeployedStackDetails {
  status?: string;
  stackPhysicalID?: string;
  stackLogicalID?: string;
  segmentID?: string;
  targetAccount?: string;
  failedResources?: NetworkMigrationFailedResourceDetails[];
}
export const NetworkMigrationDeployedStackDetails = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      status: S.optional(S.String),
      stackPhysicalID: S.optional(S.String),
      stackLogicalID: S.optional(S.String),
      segmentID: S.optional(S.String),
      targetAccount: S.optional(S.String),
      failedResources: S.optional(NetworkMigrationFailedResourcesList),
    }),
).annotate({
  identifier: "NetworkMigrationDeployedStackDetails",
}) as any as S.Schema<NetworkMigrationDeployedStackDetails>;
export type NetworkMigrationDeployedStacksList =
  NetworkMigrationDeployedStackDetails[];
export const NetworkMigrationDeployedStacksList = /*@__PURE__*/ S.Array(
  NetworkMigrationDeployedStackDetails,
);
export interface ListNetworkMigrationDeployedStacksResponse {
  items?: NetworkMigrationDeployedStackDetails[];
  nextToken?: string;
}
export const ListNetworkMigrationDeployedStacksResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      items: S.optional(NetworkMigrationDeployedStacksList),
      nextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListNetworkMigrationDeployedStacksResponse",
  }) as any as S.Schema<ListNetworkMigrationDeployedStacksResponse>;
export type ListNetworkMigrationDeployerJobIDsFilters = string[];
export const ListNetworkMigrationDeployerJobIDsFilters = /*@__PURE__*/ S.Array(
  S.String,
);
export interface ListNetworkMigrationDeployerJobFilters {
  jobIDs?: string[];
}
export const ListNetworkMigrationDeployerJobFilters = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ jobIDs: S.optional(ListNetworkMigrationDeployerJobIDsFilters) }),
).annotate({
  identifier: "ListNetworkMigrationDeployerJobFilters",
}) as any as S.Schema<ListNetworkMigrationDeployerJobFilters>;
export interface ListNetworkMigrationDeploymentsRequest {
  networkMigrationExecutionID: string;
  networkMigrationDefinitionID: string;
  filters?: ListNetworkMigrationDeployerJobFilters;
  maxResults?: number;
  nextToken?: string;
}
export const ListNetworkMigrationDeploymentsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      networkMigrationExecutionID: S.String,
      networkMigrationDefinitionID: S.String,
      filters: S.optional(ListNetworkMigrationDeployerJobFilters),
      maxResults: S.optional(S.Number),
      nextToken: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/network-migration/ListNetworkMigrationDeployments",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListNetworkMigrationDeploymentsRequest",
}) as any as S.Schema<ListNetworkMigrationDeploymentsRequest>;
export interface NetworkMigrationDeployerJobDetails {
  jobID?: string;
  networkMigrationExecutionID?: string;
  networkMigrationDefinitionID?: string;
  createdAt?: Date;
  endedAt?: Date;
  status?: string;
  statusDetails?: string;
}
export const NetworkMigrationDeployerJobDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobID: S.optional(S.String),
    networkMigrationExecutionID: S.optional(S.String),
    networkMigrationDefinitionID: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    endedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    status: S.optional(S.String),
    statusDetails: S.optional(S.String),
  }),
).annotate({
  identifier: "NetworkMigrationDeployerJobDetails",
}) as any as S.Schema<NetworkMigrationDeployerJobDetails>;
export type NetworkMigrationDeployerJobList =
  NetworkMigrationDeployerJobDetails[];
export const NetworkMigrationDeployerJobList = /*@__PURE__*/ S.Array(
  NetworkMigrationDeployerJobDetails,
);
export interface ListNetworkMigrationDeployerJobResponse {
  items?: NetworkMigrationDeployerJobDetails[];
  nextToken?: string;
}
export const ListNetworkMigrationDeployerJobResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      items: S.optional(NetworkMigrationDeployerJobList),
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListNetworkMigrationDeployerJobResponse",
}) as any as S.Schema<ListNetworkMigrationDeployerJobResponse>;
export type NetworkMigrationExecutionIDsFilter = string[];
export const NetworkMigrationExecutionIDsFilter = /*@__PURE__*/ S.Array(
  S.String,
);
export type ExecutionStatus = string;
export type NetworkMigrationExecutionStatusesFilter = string[];
export const NetworkMigrationExecutionStatusesFilter = /*@__PURE__*/ S.Array(
  S.String,
);
export interface ListNetworkMigrationExecutionRequestFilters {
  networkMigrationExecutionIDs?: string[];
  networkMigrationExecutionStatuses?: string[];
}
export const ListNetworkMigrationExecutionRequestFilters =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      networkMigrationExecutionIDs: S.optional(
        NetworkMigrationExecutionIDsFilter,
      ),
      networkMigrationExecutionStatuses: S.optional(
        NetworkMigrationExecutionStatusesFilter,
      ),
    }),
  ).annotate({
    identifier: "ListNetworkMigrationExecutionRequestFilters",
  }) as any as S.Schema<ListNetworkMigrationExecutionRequestFilters>;
export interface ListNetworkMigrationExecutionsRequest {
  networkMigrationDefinitionID: string;
  filters?: ListNetworkMigrationExecutionRequestFilters;
  nextToken?: string;
  maxResults?: number;
}
export const ListNetworkMigrationExecutionsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      networkMigrationDefinitionID: S.String,
      filters: S.optional(ListNetworkMigrationExecutionRequestFilters),
      nextToken: S.optional(S.String),
      maxResults: S.optional(S.Number),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/network-migration/ListNetworkMigrationExecutions",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListNetworkMigrationExecutionsRequest",
}) as any as S.Schema<ListNetworkMigrationExecutionsRequest>;
export type ExecutionStage = string;
export type ExecutionStageActivity = string;
export interface NetworkMigrationExecution {
  networkMigrationDefinitionID?: string;
  networkMigrationExecutionID?: string;
  status?: string;
  stage?: string;
  activity?: string;
  createdAt?: Date;
  updatedAt?: Date;
  tags?: { [key: string]: string | undefined };
}
export const NetworkMigrationExecution = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    networkMigrationDefinitionID: S.optional(S.String),
    networkMigrationExecutionID: S.optional(S.String),
    status: S.optional(S.String),
    stage: S.optional(S.String),
    activity: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    tags: S.optional(TagsMap),
  }),
).annotate({
  identifier: "NetworkMigrationExecution",
}) as any as S.Schema<NetworkMigrationExecution>;
export type NetworkMigrationExecutionsList = NetworkMigrationExecution[];
export const NetworkMigrationExecutionsList = /*@__PURE__*/ S.Array(
  NetworkMigrationExecution,
);
export interface ListNetworkMigrationExecutionsResponse {
  items?: NetworkMigrationExecution[];
  nextToken?: string;
}
export const ListNetworkMigrationExecutionsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      items: S.optional(NetworkMigrationExecutionsList),
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListNetworkMigrationExecutionsResponse",
}) as any as S.Schema<ListNetworkMigrationExecutionsResponse>;
export type ListNetworkMigrationMapperSegmentConstructsIDsFilter = string[];
export const ListNetworkMigrationMapperSegmentConstructsIDsFilter =
  /*@__PURE__*/ S.Array(S.String);
export type ListNetworkMigrationMapperSegmentConstructTypesFilter = string[];
export const ListNetworkMigrationMapperSegmentConstructTypesFilter =
  /*@__PURE__*/ S.Array(S.String);
export interface ListNetworkMigrationMapperSegmentConstructsFilters {
  constructIDs?: string[];
  constructTypes?: string[];
}
export const ListNetworkMigrationMapperSegmentConstructsFilters =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      constructIDs: S.optional(
        ListNetworkMigrationMapperSegmentConstructsIDsFilter,
      ),
      constructTypes: S.optional(
        ListNetworkMigrationMapperSegmentConstructTypesFilter,
      ),
    }),
  ).annotate({
    identifier: "ListNetworkMigrationMapperSegmentConstructsFilters",
  }) as any as S.Schema<ListNetworkMigrationMapperSegmentConstructsFilters>;
export interface ListNetworkMigrationMapperSegmentConstructsRequest {
  networkMigrationExecutionID: string;
  networkMigrationDefinitionID: string;
  segmentID: string;
  filters?: ListNetworkMigrationMapperSegmentConstructsFilters;
  maxResults?: number;
  nextToken?: string;
}
export const ListNetworkMigrationMapperSegmentConstructsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      networkMigrationExecutionID: S.String,
      networkMigrationDefinitionID: S.String,
      segmentID: S.String,
      filters: S.optional(ListNetworkMigrationMapperSegmentConstructsFilters),
      maxResults: S.optional(S.Number),
      nextToken: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/network-migration/ListNetworkMigrationMapperSegmentConstructs",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListNetworkMigrationMapperSegmentConstructsRequest",
  }) as any as S.Schema<ListNetworkMigrationMapperSegmentConstructsRequest>;
export type NetworkMigrationMapperSegmentConstructs =
  NetworkMigrationMapperSegmentConstruct[];
export const NetworkMigrationMapperSegmentConstructs = /*@__PURE__*/ S.Array(
  NetworkMigrationMapperSegmentConstruct,
);
export interface ListNetworkMigrationMapperSegmentConstructsResponse {
  items?: NetworkMigrationMapperSegmentConstruct[];
  nextToken?: string;
}
export const ListNetworkMigrationMapperSegmentConstructsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      items: S.optional(NetworkMigrationMapperSegmentConstructs),
      nextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListNetworkMigrationMapperSegmentConstructsResponse",
  }) as any as S.Schema<ListNetworkMigrationMapperSegmentConstructsResponse>;
export type ListNetworkMigrationMapperSegmentsIDsFilter = string[];
export const ListNetworkMigrationMapperSegmentsIDsFilter =
  /*@__PURE__*/ S.Array(S.String);
export interface ListNetworkMigrationMapperSegmentsFilters {
  segmentIDs?: string[];
}
export const ListNetworkMigrationMapperSegmentsFilters =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      segmentIDs: S.optional(ListNetworkMigrationMapperSegmentsIDsFilter),
    }),
  ).annotate({
    identifier: "ListNetworkMigrationMapperSegmentsFilters",
  }) as any as S.Schema<ListNetworkMigrationMapperSegmentsFilters>;
export interface ListNetworkMigrationMapperSegmentsRequest {
  networkMigrationExecutionID: string;
  networkMigrationDefinitionID: string;
  filters?: ListNetworkMigrationMapperSegmentsFilters;
  maxResults?: number;
  nextToken?: string;
}
export const ListNetworkMigrationMapperSegmentsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      networkMigrationExecutionID: S.String,
      networkMigrationDefinitionID: S.String,
      filters: S.optional(ListNetworkMigrationMapperSegmentsFilters),
      maxResults: S.optional(S.Number),
      nextToken: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/network-migration/ListNetworkMigrationMapperSegments",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListNetworkMigrationMapperSegmentsRequest",
  }) as any as S.Schema<ListNetworkMigrationMapperSegmentsRequest>;
export type NetworkMigrationMapperSegmentType = string;
export type SegmentName = string;
export type SegmentDescription = string;
export interface NetworkMigrationMapperSegment {
  jobID?: string;
  networkMigrationExecutionID?: string;
  networkMigrationDefinitionID?: string;
  segmentID?: string;
  segmentType?: string;
  name?: string;
  description?: string;
  logicalID?: string;
  checksum?: Checksum;
  outputS3Configuration?: S3Configuration;
  createdAt?: Date;
  updatedAt?: Date;
  scopeTags?: { [key: string]: string | undefined };
  targetAccount?: string;
  referencedSegments?: string[];
}
export const NetworkMigrationMapperSegment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobID: S.optional(S.String),
    networkMigrationExecutionID: S.optional(S.String),
    networkMigrationDefinitionID: S.optional(S.String),
    segmentID: S.optional(S.String),
    segmentType: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    logicalID: S.optional(S.String),
    checksum: S.optional(Checksum),
    outputS3Configuration: S.optional(S3Configuration),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    scopeTags: S.optional(ScopeTagsMap),
    targetAccount: S.optional(S.String),
    referencedSegments: S.optional(ReferencedSegmentsList),
  }),
).annotate({
  identifier: "NetworkMigrationMapperSegment",
}) as any as S.Schema<NetworkMigrationMapperSegment>;
export type NetworkMigrationMapperSegmentsList =
  NetworkMigrationMapperSegment[];
export const NetworkMigrationMapperSegmentsList = /*@__PURE__*/ S.Array(
  NetworkMigrationMapperSegment,
);
export interface ListNetworkMigrationMapperSegmentsResponse {
  items?: NetworkMigrationMapperSegment[];
  nextToken?: string;
}
export const ListNetworkMigrationMapperSegmentsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      items: S.optional(NetworkMigrationMapperSegmentsList),
      nextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListNetworkMigrationMapperSegmentsResponse",
  }) as any as S.Schema<ListNetworkMigrationMapperSegmentsResponse>;
export type ListNetworkMigrationMappingsIDsFilter = string[];
export const ListNetworkMigrationMappingsIDsFilter = /*@__PURE__*/ S.Array(
  S.String,
);
export interface ListNetworkMigrationMappingsFilters {
  jobIDs?: string[];
}
export const ListNetworkMigrationMappingsFilters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobIDs: S.optional(ListNetworkMigrationMappingsIDsFilter) }),
).annotate({
  identifier: "ListNetworkMigrationMappingsFilters",
}) as any as S.Schema<ListNetworkMigrationMappingsFilters>;
export interface ListNetworkMigrationMappingsRequest {
  networkMigrationExecutionID: string;
  networkMigrationDefinitionID: string;
  filters?: ListNetworkMigrationMappingsFilters;
  maxResults?: number;
  nextToken?: string;
}
export const ListNetworkMigrationMappingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    networkMigrationExecutionID: S.String,
    networkMigrationDefinitionID: S.String,
    filters: S.optional(ListNetworkMigrationMappingsFilters),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/network-migration/ListNetworkMigrationMappings",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListNetworkMigrationMappingsRequest",
}) as any as S.Schema<ListNetworkMigrationMappingsRequest>;
export interface NetworkMigrationMappingJobDetails {
  jobID?: string;
  networkMigrationExecutionID?: string;
  networkMigrationDefinitionID?: string;
  createdAt?: Date;
  endedAt?: Date;
  status?: string;
  statusDetails?: string;
}
export const NetworkMigrationMappingJobDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobID: S.optional(S.String),
    networkMigrationExecutionID: S.optional(S.String),
    networkMigrationDefinitionID: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    endedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    status: S.optional(S.String),
    statusDetails: S.optional(S.String),
  }),
).annotate({
  identifier: "NetworkMigrationMappingJobDetails",
}) as any as S.Schema<NetworkMigrationMappingJobDetails>;
export type NetworkMigrationMappingsList = NetworkMigrationMappingJobDetails[];
export const NetworkMigrationMappingsList = /*@__PURE__*/ S.Array(
  NetworkMigrationMappingJobDetails,
);
export interface ListNetworkMigrationMappingsResponse {
  items?: NetworkMigrationMappingJobDetails[];
  nextToken?: string;
}
export const ListNetworkMigrationMappingsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      items: S.optional(NetworkMigrationMappingsList),
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListNetworkMigrationMappingsResponse",
}) as any as S.Schema<ListNetworkMigrationMappingsResponse>;
export type ListNetworkMigrationMappingUpdatesIDsFilter = string[];
export const ListNetworkMigrationMappingUpdatesIDsFilter =
  /*@__PURE__*/ S.Array(S.String);
export interface ListNetworkMigrationMappingUpdatesFilters {
  jobIDs?: string[];
}
export const ListNetworkMigrationMappingUpdatesFilters =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      jobIDs: S.optional(ListNetworkMigrationMappingUpdatesIDsFilter),
    }),
  ).annotate({
    identifier: "ListNetworkMigrationMappingUpdatesFilters",
  }) as any as S.Schema<ListNetworkMigrationMappingUpdatesFilters>;
export interface ListNetworkMigrationMappingUpdatesRequest {
  networkMigrationExecutionID: string;
  networkMigrationDefinitionID: string;
  filters?: ListNetworkMigrationMappingUpdatesFilters;
  maxResults?: number;
  nextToken?: string;
}
export const ListNetworkMigrationMappingUpdatesRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      networkMigrationExecutionID: S.String,
      networkMigrationDefinitionID: S.String,
      filters: S.optional(ListNetworkMigrationMappingUpdatesFilters),
      maxResults: S.optional(S.Number),
      nextToken: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/network-migration/ListNetworkMigrationMappingUpdates",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListNetworkMigrationMappingUpdatesRequest",
  }) as any as S.Schema<ListNetworkMigrationMappingUpdatesRequest>;
export interface NetworkMigrationMappingUpdateJobDetails {
  jobID?: string;
  networkMigrationExecutionID?: string;
  networkMigrationDefinitionID?: string;
  createdAt?: Date;
  endedAt?: Date;
  status?: string;
  statusDetails?: string;
}
export const NetworkMigrationMappingUpdateJobDetails = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      jobID: S.optional(S.String),
      networkMigrationExecutionID: S.optional(S.String),
      networkMigrationDefinitionID: S.optional(S.String),
      createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      endedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      status: S.optional(S.String),
      statusDetails: S.optional(S.String),
    }),
).annotate({
  identifier: "NetworkMigrationMappingUpdateJobDetails",
}) as any as S.Schema<NetworkMigrationMappingUpdateJobDetails>;
export type NetworkMigrationMappingUpdatesList =
  NetworkMigrationMappingUpdateJobDetails[];
export const NetworkMigrationMappingUpdatesList = /*@__PURE__*/ S.Array(
  NetworkMigrationMappingUpdateJobDetails,
);
export interface ListNetworkMigrationMappingUpdatesResponse {
  items?: NetworkMigrationMappingUpdateJobDetails[];
  nextToken?: string;
}
export const ListNetworkMigrationMappingUpdatesResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      items: S.optional(NetworkMigrationMappingUpdatesList),
      nextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListNetworkMigrationMappingUpdatesResponse",
  }) as any as S.Schema<ListNetworkMigrationMappingUpdatesResponse>;
export type ActionID = string;
export type ActionIDs = string[];
export const ActionIDs = /*@__PURE__*/ S.Array(S.String);
export interface SourceServerActionsRequestFilters {
  actionIDs?: string[];
}
export const SourceServerActionsRequestFilters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ actionIDs: S.optional(ActionIDs) }),
).annotate({
  identifier: "SourceServerActionsRequestFilters",
}) as any as S.Schema<SourceServerActionsRequestFilters>;
export interface ListSourceServerActionsRequest {
  sourceServerID: string;
  filters?: SourceServerActionsRequestFilters;
  maxResults?: number;
  nextToken?: string;
  accountID?: string;
}
export const ListSourceServerActionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceServerID: S.String,
    filters: S.optional(SourceServerActionsRequestFilters),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    accountID: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListSourceServerActions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSourceServerActionsRequest",
}) as any as S.Schema<ListSourceServerActionsRequest>;
export type ActionName = string;
export type OrderType = number;
export type DocumentVersion = string;
export type ActionDescription = string;
export type ActionCategory = string;
export interface SourceServerActionDocument {
  actionID?: string;
  actionName?: string;
  documentIdentifier?: string;
  order?: number;
  documentVersion?: string;
  active?: boolean;
  timeoutSeconds?: number;
  mustSucceedForCutover?: boolean;
  parameters?: { [key: string]: SsmParameterStoreParameter[] | undefined };
  externalParameters?: { [key: string]: SsmExternalParameter | undefined };
  description?: string;
  category?: string;
}
export const SourceServerActionDocument = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    actionID: S.optional(S.String),
    actionName: S.optional(S.String),
    documentIdentifier: S.optional(S.String),
    order: S.optional(S.Number),
    documentVersion: S.optional(S.String),
    active: S.optional(S.Boolean),
    timeoutSeconds: S.optional(S.Number),
    mustSucceedForCutover: S.optional(S.Boolean),
    parameters: S.optional(SsmDocumentParameters),
    externalParameters: S.optional(SsmDocumentExternalParameters),
    description: S.optional(S.String),
    category: S.optional(S.String),
  }),
).annotate({
  identifier: "SourceServerActionDocument",
}) as any as S.Schema<SourceServerActionDocument>;
export type SourceServerActionDocuments = SourceServerActionDocument[];
export const SourceServerActionDocuments = /*@__PURE__*/ S.Array(
  SourceServerActionDocument,
);
export interface ListSourceServerActionsResponse {
  items?: SourceServerActionDocument[];
  nextToken?: string;
}
export const ListSourceServerActionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(SourceServerActionDocuments),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSourceServerActionsResponse",
}) as any as S.Schema<ListSourceServerActionsResponse>;
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
export interface TemplateActionsRequestFilters {
  actionIDs?: string[];
}
export const TemplateActionsRequestFilters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ actionIDs: S.optional(ActionIDs) }),
).annotate({
  identifier: "TemplateActionsRequestFilters",
}) as any as S.Schema<TemplateActionsRequestFilters>;
export interface ListTemplateActionsRequest {
  launchConfigurationTemplateID: string;
  filters?: TemplateActionsRequestFilters;
  maxResults?: number;
  nextToken?: string;
}
export const ListTemplateActionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    launchConfigurationTemplateID: S.String,
    filters: S.optional(TemplateActionsRequestFilters),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListTemplateActions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTemplateActionsRequest",
}) as any as S.Schema<ListTemplateActionsRequest>;
export type OperatingSystemString = string;
export interface TemplateActionDocument {
  actionID?: string;
  actionName?: string;
  documentIdentifier?: string;
  order?: number;
  documentVersion?: string;
  active?: boolean;
  timeoutSeconds?: number;
  mustSucceedForCutover?: boolean;
  parameters?: { [key: string]: SsmParameterStoreParameter[] | undefined };
  operatingSystem?: string;
  externalParameters?: { [key: string]: SsmExternalParameter | undefined };
  description?: string;
  category?: string;
}
export const TemplateActionDocument = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    actionID: S.optional(S.String),
    actionName: S.optional(S.String),
    documentIdentifier: S.optional(S.String),
    order: S.optional(S.Number),
    documentVersion: S.optional(S.String),
    active: S.optional(S.Boolean),
    timeoutSeconds: S.optional(S.Number),
    mustSucceedForCutover: S.optional(S.Boolean),
    parameters: S.optional(SsmDocumentParameters),
    operatingSystem: S.optional(S.String),
    externalParameters: S.optional(SsmDocumentExternalParameters),
    description: S.optional(S.String),
    category: S.optional(S.String),
  }),
).annotate({
  identifier: "TemplateActionDocument",
}) as any as S.Schema<TemplateActionDocument>;
export type TemplateActionDocuments = TemplateActionDocument[];
export const TemplateActionDocuments = /*@__PURE__*/ S.Array(
  TemplateActionDocument,
);
export interface ListTemplateActionsResponse {
  items?: TemplateActionDocument[];
  nextToken?: string;
}
export const ListTemplateActionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(TemplateActionDocuments),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListTemplateActionsResponse",
}) as any as S.Schema<ListTemplateActionsResponse>;
export interface ListWavesRequestFilters {
  waveIDs?: string[];
  isArchived?: boolean;
}
export const ListWavesRequestFilters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    waveIDs: S.optional(WaveIDsFilter),
    isArchived: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ListWavesRequestFilters",
}) as any as S.Schema<ListWavesRequestFilters>;
export interface ListWavesRequest {
  filters?: ListWavesRequestFilters;
  maxResults?: number;
  nextToken?: string;
  accountID?: string;
}
export const ListWavesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    filters: S.optional(ListWavesRequestFilters),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    accountID: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListWaves" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListWavesRequest",
}) as any as S.Schema<ListWavesRequest>;
export type WavesList = Wave[];
export const WavesList = /*@__PURE__*/ S.Array(Wave);
export interface ListWavesResponse {
  items?: Wave[];
  nextToken?: string;
}
export const ListWavesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ items: S.optional(WavesList), nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListWavesResponse",
}) as any as S.Schema<ListWavesResponse>;
export interface MarkAsArchivedRequest {
  sourceServerID: string;
  accountID?: string;
}
export const MarkAsArchivedRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sourceServerID: S.String, accountID: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/MarkAsArchived" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "MarkAsArchivedRequest",
}) as any as S.Schema<MarkAsArchivedRequest>;
export interface PauseReplicationRequest {
  sourceServerID: string;
  accountID?: string;
}
export const PauseReplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sourceServerID: S.String, accountID: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/PauseReplication" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PauseReplicationRequest",
}) as any as S.Schema<PauseReplicationRequest>;
export interface PutSourceServerActionRequest {
  sourceServerID: string;
  actionName: string;
  documentIdentifier: string;
  order: number;
  actionID: string;
  documentVersion?: string;
  active?: boolean;
  timeoutSeconds?: number;
  mustSucceedForCutover?: boolean;
  parameters?: { [key: string]: SsmParameterStoreParameter[] | undefined };
  externalParameters?: { [key: string]: SsmExternalParameter | undefined };
  description?: string;
  category?: string;
  accountID?: string;
}
export const PutSourceServerActionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceServerID: S.String,
    actionName: S.String,
    documentIdentifier: S.String,
    order: S.Number,
    actionID: S.String,
    documentVersion: S.optional(S.String),
    active: S.optional(S.Boolean),
    timeoutSeconds: S.optional(S.Number),
    mustSucceedForCutover: S.optional(S.Boolean),
    parameters: S.optional(SsmDocumentParameters),
    externalParameters: S.optional(SsmDocumentExternalParameters),
    description: S.optional(S.String),
    category: S.optional(S.String),
    accountID: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/PutSourceServerAction" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutSourceServerActionRequest",
}) as any as S.Schema<PutSourceServerActionRequest>;
export interface PutTemplateActionRequest {
  launchConfigurationTemplateID: string;
  actionName: string;
  documentIdentifier: string;
  order: number;
  actionID: string;
  documentVersion?: string;
  active?: boolean;
  timeoutSeconds?: number;
  mustSucceedForCutover?: boolean;
  parameters?: { [key: string]: SsmParameterStoreParameter[] | undefined };
  operatingSystem?: string;
  externalParameters?: { [key: string]: SsmExternalParameter | undefined };
  description?: string;
  category?: string;
}
export const PutTemplateActionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    launchConfigurationTemplateID: S.String,
    actionName: S.String,
    documentIdentifier: S.String,
    order: S.Number,
    actionID: S.String,
    documentVersion: S.optional(S.String),
    active: S.optional(S.Boolean),
    timeoutSeconds: S.optional(S.Number),
    mustSucceedForCutover: S.optional(S.Boolean),
    parameters: S.optional(SsmDocumentParameters),
    operatingSystem: S.optional(S.String),
    externalParameters: S.optional(SsmDocumentExternalParameters),
    description: S.optional(S.String),
    category: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/PutTemplateAction" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutTemplateActionRequest",
}) as any as S.Schema<PutTemplateActionRequest>;
export interface RemoveSourceServerActionRequest {
  sourceServerID: string;
  actionID: string;
  accountID?: string;
}
export const RemoveSourceServerActionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceServerID: S.String,
    actionID: S.String,
    accountID: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/RemoveSourceServerAction" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RemoveSourceServerActionRequest",
}) as any as S.Schema<RemoveSourceServerActionRequest>;
export interface RemoveSourceServerActionResponse {}
export const RemoveSourceServerActionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "RemoveSourceServerActionResponse",
}) as any as S.Schema<RemoveSourceServerActionResponse>;
export interface RemoveTemplateActionRequest {
  launchConfigurationTemplateID: string;
  actionID: string;
}
export const RemoveTemplateActionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    launchConfigurationTemplateID: S.String,
    actionID: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/RemoveTemplateAction" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RemoveTemplateActionRequest",
}) as any as S.Schema<RemoveTemplateActionRequest>;
export interface RemoveTemplateActionResponse {}
export const RemoveTemplateActionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "RemoveTemplateActionResponse",
}) as any as S.Schema<RemoveTemplateActionResponse>;
export interface ResumeReplicationRequest {
  sourceServerID: string;
  accountID?: string;
}
export const ResumeReplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sourceServerID: S.String, accountID: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ResumeReplication" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ResumeReplicationRequest",
}) as any as S.Schema<ResumeReplicationRequest>;
export interface RetryDataReplicationRequest {
  sourceServerID: string;
  accountID?: string;
}
export const RetryDataReplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sourceServerID: S.String, accountID: S.optional(S.String) }).pipe(
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
export type StartCutoverRequestSourceServerIDs = string[];
export const StartCutoverRequestSourceServerIDs = /*@__PURE__*/ S.Array(
  S.String,
);
export interface StartCutoverRequest {
  sourceServerIDs: string[];
  tags?: { [key: string]: string | undefined };
  accountID?: string;
}
export const StartCutoverRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceServerIDs: StartCutoverRequestSourceServerIDs,
    tags: S.optional(TagsMap),
    accountID: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/StartCutover" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartCutoverRequest",
}) as any as S.Schema<StartCutoverRequest>;
export interface StartCutoverResponse {
  job?: Job;
}
export const StartCutoverResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ job: S.optional(Job) }),
).annotate({
  identifier: "StartCutoverResponse",
}) as any as S.Schema<StartCutoverResponse>;
export interface StartExportRequest {
  s3Bucket: string;
  s3Key: string;
  s3BucketOwner?: string;
  tags?: { [key: string]: string | undefined };
}
export const StartExportRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    s3Bucket: S.String,
    s3Key: S.String,
    s3BucketOwner: S.optional(S.String),
    tags: S.optional(TagsMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/StartExport" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartExportRequest",
}) as any as S.Schema<StartExportRequest>;
export interface StartExportResponse {
  exportTask?: ExportTask;
}
export const StartExportResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ exportTask: S.optional(ExportTask) }),
).annotate({
  identifier: "StartExportResponse",
}) as any as S.Schema<StartExportResponse>;
export type ClientIdempotencyToken = string;
export interface StartImportRequest {
  clientToken?: string;
  s3BucketSource: S3BucketSource;
  tags?: { [key: string]: string | undefined };
}
export const StartImportRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    s3BucketSource: S3BucketSource,
    tags: S.optional(TagsMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/StartImport" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartImportRequest",
}) as any as S.Schema<StartImportRequest>;
export interface StartImportResponse {
  importTask?: ImportTask;
}
export const StartImportResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ importTask: S.optional(ImportTask) }),
).annotate({
  identifier: "StartImportResponse",
}) as any as S.Schema<StartImportResponse>;
export interface EnrichmentSourceS3Configuration {
  s3Bucket: string;
  s3BucketOwner: string;
  s3Key: string;
}
export const EnrichmentSourceS3Configuration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ s3Bucket: S.String, s3BucketOwner: S.String, s3Key: S.String }),
).annotate({
  identifier: "EnrichmentSourceS3Configuration",
}) as any as S.Schema<EnrichmentSourceS3Configuration>;
export type IpAssignmentStrategy = string;
export interface StartImportFileEnrichmentRequest {
  clientToken?: string;
  s3BucketSource: EnrichmentSourceS3Configuration;
  s3BucketTarget: EnrichmentTargetS3Configuration;
  ipAssignmentStrategy?: string;
}
export const StartImportFileEnrichmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    s3BucketSource: EnrichmentSourceS3Configuration,
    s3BucketTarget: EnrichmentTargetS3Configuration,
    ipAssignmentStrategy: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/network-migration/StartImportFileEnrichment",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartImportFileEnrichmentRequest",
}) as any as S.Schema<StartImportFileEnrichmentRequest>;
export interface StartImportFileEnrichmentResponse {
  jobID?: string;
}
export const StartImportFileEnrichmentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobID: S.optional(S.String) }),
).annotate({
  identifier: "StartImportFileEnrichmentResponse",
}) as any as S.Schema<StartImportFileEnrichmentResponse>;
export interface StartNetworkMigrationAnalysisRequest {
  networkMigrationExecutionID: string;
  networkMigrationDefinitionID: string;
}
export const StartNetworkMigrationAnalysisRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      networkMigrationExecutionID: S.String,
      networkMigrationDefinitionID: S.String,
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/network-migration/StartNetworkMigrationAnalysis",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "StartNetworkMigrationAnalysisRequest",
}) as any as S.Schema<StartNetworkMigrationAnalysisRequest>;
export interface StartNetworkMigrationAnalysisResponse {
  jobID?: string;
}
export const StartNetworkMigrationAnalysisResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ jobID: S.optional(S.String) }),
).annotate({
  identifier: "StartNetworkMigrationAnalysisResponse",
}) as any as S.Schema<StartNetworkMigrationAnalysisResponse>;
export type CodeGenerationOutputFormatTypes = string[];
export const CodeGenerationOutputFormatTypes = /*@__PURE__*/ S.Array(S.String);
export interface StartNetworkMigrationCodeGenerationRequest {
  networkMigrationExecutionID: string;
  networkMigrationDefinitionID: string;
  codeGenerationOutputFormatTypes?: string[];
}
export const StartNetworkMigrationCodeGenerationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      networkMigrationExecutionID: S.String,
      networkMigrationDefinitionID: S.String,
      codeGenerationOutputFormatTypes: S.optional(
        CodeGenerationOutputFormatTypes,
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/network-migration/StartNetworkMigrationCodeGeneration",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "StartNetworkMigrationCodeGenerationRequest",
  }) as any as S.Schema<StartNetworkMigrationCodeGenerationRequest>;
export interface StartNetworkMigrationCodeGenerationResponse {
  jobID?: string;
}
export const StartNetworkMigrationCodeGenerationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ jobID: S.optional(S.String) }),
  ).annotate({
    identifier: "StartNetworkMigrationCodeGenerationResponse",
  }) as any as S.Schema<StartNetworkMigrationCodeGenerationResponse>;
export interface StartNetworkMigrationDeploymentRequest {
  networkMigrationExecutionID: string;
  networkMigrationDefinitionID: string;
}
export const StartNetworkMigrationDeploymentRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      networkMigrationExecutionID: S.String,
      networkMigrationDefinitionID: S.String,
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/network-migration/StartNetworkMigrationDeployment",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "StartNetworkMigrationDeploymentRequest",
}) as any as S.Schema<StartNetworkMigrationDeploymentRequest>;
export interface StartNetworkMigrationDeployerJobResponse {
  jobID?: string;
}
export const StartNetworkMigrationDeployerJobResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ jobID: S.optional(S.String) }),
).annotate({
  identifier: "StartNetworkMigrationDeployerJobResponse",
}) as any as S.Schema<StartNetworkMigrationDeployerJobResponse>;
export type SecurityGroupMappingStrategy = string;
export interface StartNetworkMigrationMappingRequest {
  networkMigrationExecutionID: string;
  networkMigrationDefinitionID: string;
  securityGroupMappingStrategy?: string;
}
export const StartNetworkMigrationMappingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    networkMigrationExecutionID: S.String,
    networkMigrationDefinitionID: S.String,
    securityGroupMappingStrategy: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/network-migration/StartNetworkMigrationMapping",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartNetworkMigrationMappingRequest",
}) as any as S.Schema<StartNetworkMigrationMappingRequest>;
export interface StartNetworkMigrationMappingResponse {
  jobID?: string;
}
export const StartNetworkMigrationMappingResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ jobID: S.optional(S.String) }),
).annotate({
  identifier: "StartNetworkMigrationMappingResponse",
}) as any as S.Schema<StartNetworkMigrationMappingResponse>;
export interface MergeConstruct {
  segmentID?: string;
  constructID?: string;
}
export const MergeConstruct = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    segmentID: S.optional(S.String),
    constructID: S.optional(S.String),
  }),
).annotate({ identifier: "MergeConstruct" }) as any as S.Schema<MergeConstruct>;
export type MergeConstructs = MergeConstruct[];
export const MergeConstructs = /*@__PURE__*/ S.Array(MergeConstruct);
export interface MergeOperation {
  mergeConstructs?: MergeConstruct[];
}
export const MergeOperation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ mergeConstructs: S.optional(MergeConstructs) }),
).annotate({ identifier: "MergeOperation" }) as any as S.Schema<MergeOperation>;
export type CidrBlock = string;
export interface SplitConstruct {
  cidrBlock?: string;
}
export const SplitConstruct = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ cidrBlock: S.optional(S.String) }),
).annotate({ identifier: "SplitConstruct" }) as any as S.Schema<SplitConstruct>;
export type SplitConstructs = SplitConstruct[];
export const SplitConstructs = /*@__PURE__*/ S.Array(SplitConstruct);
export interface SplitOperation {
  splitConstructs?: SplitConstruct[];
}
export const SplitOperation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ splitConstructs: S.optional(SplitConstructs) }),
).annotate({ identifier: "SplitOperation" }) as any as S.Schema<SplitOperation>;
export interface DeleteOperation {}
export const DeleteOperation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteOperation",
}) as any as S.Schema<DeleteOperation>;
export interface UpdateOperation {
  name?: string;
  excluded?: boolean;
  properties?: { [key: string]: string | undefined };
}
export const UpdateOperation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    excluded: S.optional(S.Boolean),
    properties: S.optional(ConstructProperties),
  }),
).annotate({
  identifier: "UpdateOperation",
}) as any as S.Schema<UpdateOperation>;
export type OperationUnion =
  | { merge: MergeOperation; split?: never; delete?: never; update?: never }
  | { merge?: never; split: SplitOperation; delete?: never; update?: never }
  | { merge?: never; split?: never; delete: DeleteOperation; update?: never }
  | { merge?: never; split?: never; delete?: never; update: UpdateOperation };
export const OperationUnion = /*@__PURE__*/ S.Union([
  S.Struct({ merge: MergeOperation }),
  S.Struct({ split: SplitOperation }),
  S.Struct({ delete: DeleteOperation }),
  S.Struct({ update: UpdateOperation }),
]);
export interface StartNetworkMigrationMappingUpdateConstruct {
  segmentID: string;
  constructID: string;
  constructType: string;
  operation?: OperationUnion;
}
export const StartNetworkMigrationMappingUpdateConstruct =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      segmentID: S.String,
      constructID: S.String,
      constructType: S.String,
      operation: S.optional(OperationUnion),
    }),
  ).annotate({
    identifier: "StartNetworkMigrationMappingUpdateConstruct",
  }) as any as S.Schema<StartNetworkMigrationMappingUpdateConstruct>;
export type StartNetworkMigrationMappingUpdateConstructs =
  StartNetworkMigrationMappingUpdateConstruct[];
export const StartNetworkMigrationMappingUpdateConstructs =
  /*@__PURE__*/ S.Array(StartNetworkMigrationMappingUpdateConstruct);
export interface StartNetworkMigrationMappingUpdateSegment {
  segmentID: string;
  targetAccount?: string;
  scopeTags?: { [key: string]: string | undefined };
}
export const StartNetworkMigrationMappingUpdateSegment =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      segmentID: S.String,
      targetAccount: S.optional(S.String),
      scopeTags: S.optional(ScopeTagsMap),
    }),
  ).annotate({
    identifier: "StartNetworkMigrationMappingUpdateSegment",
  }) as any as S.Schema<StartNetworkMigrationMappingUpdateSegment>;
export type StartNetworkMigrationMappingUpdateSegments =
  StartNetworkMigrationMappingUpdateSegment[];
export const StartNetworkMigrationMappingUpdateSegments = /*@__PURE__*/ S.Array(
  StartNetworkMigrationMappingUpdateSegment,
);
export interface StartNetworkMigrationMappingUpdateRequest {
  networkMigrationExecutionID: string;
  networkMigrationDefinitionID: string;
  constructs?: StartNetworkMigrationMappingUpdateConstruct[];
  segments?: StartNetworkMigrationMappingUpdateSegment[];
}
export const StartNetworkMigrationMappingUpdateRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      networkMigrationExecutionID: S.String,
      networkMigrationDefinitionID: S.String,
      constructs: S.optional(StartNetworkMigrationMappingUpdateConstructs),
      segments: S.optional(StartNetworkMigrationMappingUpdateSegments),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/network-migration/StartNetworkMigrationMappingUpdate",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "StartNetworkMigrationMappingUpdateRequest",
  }) as any as S.Schema<StartNetworkMigrationMappingUpdateRequest>;
export interface StartNetworkMigrationMappingUpdateResponse {
  jobID?: string;
}
export const StartNetworkMigrationMappingUpdateResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ jobID: S.optional(S.String) }),
  ).annotate({
    identifier: "StartNetworkMigrationMappingUpdateResponse",
  }) as any as S.Schema<StartNetworkMigrationMappingUpdateResponse>;
export interface StartReplicationRequest {
  sourceServerID: string;
  accountID?: string;
}
export const StartReplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sourceServerID: S.String, accountID: S.optional(S.String) }).pipe(
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
export type StartTestRequestSourceServerIDs = string[];
export const StartTestRequestSourceServerIDs = /*@__PURE__*/ S.Array(S.String);
export interface StartTestRequest {
  sourceServerIDs: string[];
  tags?: { [key: string]: string | undefined };
  accountID?: string;
}
export const StartTestRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceServerIDs: StartTestRequestSourceServerIDs,
    tags: S.optional(TagsMap),
    accountID: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/StartTest" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartTestRequest",
}) as any as S.Schema<StartTestRequest>;
export interface StartTestResponse {
  job?: Job;
}
export const StartTestResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ job: S.optional(Job) }),
).annotate({
  identifier: "StartTestResponse",
}) as any as S.Schema<StartTestResponse>;
export interface StopReplicationRequest {
  sourceServerID: string;
  accountID?: string;
}
export const StopReplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sourceServerID: S.String, accountID: S.optional(S.String) }).pipe(
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
export type TerminateTargetInstancesRequestSourceServerIDs = string[];
export const TerminateTargetInstancesRequestSourceServerIDs =
  /*@__PURE__*/ S.Array(S.String);
export interface TerminateTargetInstancesRequest {
  sourceServerIDs: string[];
  tags?: { [key: string]: string | undefined };
  accountID?: string;
}
export const TerminateTargetInstancesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceServerIDs: TerminateTargetInstancesRequestSourceServerIDs,
    tags: S.optional(TagsMap),
    accountID: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/TerminateTargetInstances" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "TerminateTargetInstancesRequest",
}) as any as S.Schema<TerminateTargetInstancesRequest>;
export interface TerminateTargetInstancesResponse {
  job?: Job;
}
export const TerminateTargetInstancesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ job: S.optional(Job) }),
).annotate({
  identifier: "TerminateTargetInstancesResponse",
}) as any as S.Schema<TerminateTargetInstancesResponse>;
export interface UnarchiveApplicationRequest {
  applicationID: string;
  accountID?: string;
}
export const UnarchiveApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ applicationID: S.String, accountID: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/UnarchiveApplication" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UnarchiveApplicationRequest",
}) as any as S.Schema<UnarchiveApplicationRequest>;
export interface UnarchiveWaveRequest {
  waveID: string;
  accountID?: string;
}
export const UnarchiveWaveRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ waveID: S.String, accountID: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/UnarchiveWave" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UnarchiveWaveRequest",
}) as any as S.Schema<UnarchiveWaveRequest>;
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
export interface UpdateApplicationRequest {
  applicationID: string;
  name?: string;
  description?: string;
  accountID?: string;
}
export const UpdateApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationID: S.String,
    name: S.optional(S.String),
    description: S.optional(S.String),
    accountID: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/UpdateApplication" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateApplicationRequest",
}) as any as S.Schema<UpdateApplicationRequest>;
export interface UpdateConnectorRequest {
  connectorID: string;
  name?: string;
  ssmCommandConfig?: ConnectorSsmCommandConfig;
}
export const UpdateConnectorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    connectorID: S.String,
    name: S.optional(S.String),
    ssmCommandConfig: S.optional(ConnectorSsmCommandConfig),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/UpdateConnector" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateConnectorRequest",
}) as any as S.Schema<UpdateConnectorRequest>;
export interface UpdateLaunchConfigurationRequest {
  sourceServerID: string;
  name?: string;
  launchDisposition?: string;
  targetInstanceTypeRightSizingMethod?: string;
  copyPrivateIp?: boolean;
  copyTags?: boolean;
  licensing?: Licensing;
  bootMode?: string;
  postLaunchActions?: PostLaunchActions;
  enableMapAutoTagging?: boolean;
  mapAutoTaggingMpeID?: string;
  accountID?: string;
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
    bootMode: S.optional(S.String),
    postLaunchActions: S.optional(PostLaunchActions),
    enableMapAutoTagging: S.optional(S.Boolean),
    mapAutoTaggingMpeID: S.optional(S.String),
    accountID: S.optional(S.String),
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
  postLaunchActions?: PostLaunchActions;
  enableMapAutoTagging?: boolean;
  mapAutoTaggingMpeID?: string;
  launchDisposition?: string;
  targetInstanceTypeRightSizingMethod?: string;
  copyPrivateIp?: boolean;
  associatePublicIpAddress?: boolean;
  copyTags?: boolean;
  licensing?: Licensing;
  bootMode?: string;
  smallVolumeMaxSize?: number;
  smallVolumeConf?: LaunchTemplateDiskConf;
  largeVolumeConf?: LaunchTemplateDiskConf;
  enableParametersEncryption?: boolean;
  parametersEncryptionKey?: string;
}
export const UpdateLaunchConfigurationTemplateRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      launchConfigurationTemplateID: S.String,
      postLaunchActions: S.optional(PostLaunchActions),
      enableMapAutoTagging: S.optional(S.Boolean),
      mapAutoTaggingMpeID: S.optional(S.String),
      launchDisposition: S.optional(S.String),
      targetInstanceTypeRightSizingMethod: S.optional(S.String),
      copyPrivateIp: S.optional(S.Boolean),
      associatePublicIpAddress: S.optional(S.Boolean),
      copyTags: S.optional(S.Boolean),
      licensing: S.optional(Licensing),
      bootMode: S.optional(S.String),
      smallVolumeMaxSize: S.optional(S.Number),
      smallVolumeConf: S.optional(LaunchTemplateDiskConf),
      largeVolumeConf: S.optional(LaunchTemplateDiskConf),
      enableParametersEncryption: S.optional(S.Boolean),
      parametersEncryptionKey: S.optional(S.String),
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
export interface TargetS3ConfigurationUpdate {
  s3Bucket?: string;
  s3BucketOwner?: string;
}
export const TargetS3ConfigurationUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    s3Bucket: S.optional(S.String),
    s3BucketOwner: S.optional(S.String),
  }),
).annotate({
  identifier: "TargetS3ConfigurationUpdate",
}) as any as S.Schema<TargetS3ConfigurationUpdate>;
export interface TargetNetworkUpdate {
  topology?: string;
  inboundCidr?: string;
  outboundCidr?: string;
  inspectionCidr?: string;
}
export const TargetNetworkUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    topology: S.optional(S.String),
    inboundCidr: S.optional(S.String),
    outboundCidr: S.optional(S.String),
    inspectionCidr: S.optional(S.String),
  }),
).annotate({
  identifier: "TargetNetworkUpdate",
}) as any as S.Schema<TargetNetworkUpdate>;
export interface UpdateNetworkMigrationDefinitionRequest {
  networkMigrationDefinitionID: string;
  name?: string;
  description?: string;
  sourceConfigurations?: SourceConfiguration[];
  targetS3Configuration?: TargetS3ConfigurationUpdate;
  targetNetwork?: TargetNetworkUpdate;
  targetDeployment?: string;
  scopeTags?: { [key: string]: string | undefined };
}
export const UpdateNetworkMigrationDefinitionRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      networkMigrationDefinitionID: S.String,
      name: S.optional(S.String),
      description: S.optional(S.String),
      sourceConfigurations: S.optional(SourceConfigurationList),
      targetS3Configuration: S.optional(TargetS3ConfigurationUpdate),
      targetNetwork: S.optional(TargetNetworkUpdate),
      targetDeployment: S.optional(S.String),
      scopeTags: S.optional(ScopeTagsMap),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/network-migration/UpdateNetworkMigrationDefinition",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateNetworkMigrationDefinitionRequest",
}) as any as S.Schema<UpdateNetworkMigrationDefinitionRequest>;
export interface UpdateNetworkMigrationMapperSegmentRequest {
  networkMigrationDefinitionID: string;
  networkMigrationExecutionID: string;
  segmentID: string;
  scopeTags?: { [key: string]: string | undefined };
}
export const UpdateNetworkMigrationMapperSegmentRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      networkMigrationDefinitionID: S.String,
      networkMigrationExecutionID: S.String,
      segmentID: S.String,
      scopeTags: S.optional(ScopeTagsMap),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/network-migration/UpdateNetworkMigrationMapperSegment",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "UpdateNetworkMigrationMapperSegmentRequest",
  }) as any as S.Schema<UpdateNetworkMigrationMapperSegmentRequest>;
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
  useFipsEndpoint?: boolean;
  accountID?: string;
  internetProtocol?: string;
  storeSnapshotOnLocalZone?: boolean;
  storageConfiguration?: StorageConfiguration;
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
      useFipsEndpoint: S.optional(S.Boolean),
      accountID: S.optional(S.String),
      internetProtocol: S.optional(S.String),
      storeSnapshotOnLocalZone: S.optional(S.Boolean),
      storageConfiguration: S.optional(StorageConfiguration),
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
  useFipsEndpoint?: boolean;
  internetProtocol?: string;
  storeSnapshotOnLocalZone?: boolean;
  storageConfiguration?: StorageConfiguration;
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
      useFipsEndpoint: S.optional(S.Boolean),
      internetProtocol: S.optional(S.String),
      storeSnapshotOnLocalZone: S.optional(S.Boolean),
      storageConfiguration: S.optional(StorageConfiguration),
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
export type FqdnForActionFramework = string;
export interface UpdateSourceServerRequest {
  accountID?: string;
  sourceServerID: string;
  connectorAction?: SourceServerConnectorAction;
  userProvidedID?: string;
  fqdnForActionFramework?: string;
  platform?: string;
}
export const UpdateSourceServerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountID: S.optional(S.String),
    sourceServerID: S.String,
    connectorAction: S.optional(SourceServerConnectorAction),
    userProvidedID: S.optional(S.String),
    fqdnForActionFramework: S.optional(S.String),
    platform: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/UpdateSourceServer" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateSourceServerRequest",
}) as any as S.Schema<UpdateSourceServerRequest>;
export interface UpdateSourceServerReplicationTypeRequest {
  sourceServerID: string;
  replicationType: string;
  accountID?: string;
}
export const UpdateSourceServerReplicationTypeRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      sourceServerID: S.String,
      replicationType: S.String,
      accountID: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/UpdateSourceServerReplicationType" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateSourceServerReplicationTypeRequest",
}) as any as S.Schema<UpdateSourceServerReplicationTypeRequest>;
export interface UpdateWaveRequest {
  waveID: string;
  name?: string;
  description?: string;
  accountID?: string;
}
export const UpdateWaveRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    waveID: S.String,
    name: S.optional(S.String),
    description: S.optional(S.String),
    accountID: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/UpdateWave" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateWaveRequest",
}) as any as S.Schema<UpdateWaveRequest>;
export interface ErrorDetails {
  message?: string;
  code?: string;
  resourceId?: string;
  resourceType?: string;
}
export const ErrorDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    message: S.optional(S.String),
    code: S.optional(S.String),
    resourceId: S.optional(S.String),
    resourceType: S.optional(S.String),
  }),
).annotate({ identifier: "ErrorDetails" }) as any as S.Schema<ErrorDetails>;
export type ConflictExceptionErrors = ErrorDetails[];
export const ConflictExceptionErrors = /*@__PURE__*/ S.Array(ErrorDetails);
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
export type ArchiveApplicationError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Archive application.
 */
export const archiveApplication: API.OperationMethod<
  ArchiveApplicationRequest,
  Application,
  ArchiveApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ArchiveApplicationRequest,
  output: Application,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ArchiveApplication",
}));

export type ArchiveWaveError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Archive wave.
 */
export const archiveWave: API.OperationMethod<
  ArchiveWaveRequest,
  Wave,
  ArchiveWaveError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ArchiveWaveRequest,
  output: Wave,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ArchiveWave",
}));

export type AssociateApplicationsError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Associate applications to wave.
 */
export const associateApplications: API.OperationMethod<
  AssociateApplicationsRequest,
  AssociateApplicationsResponse,
  AssociateApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateApplicationsRequest,
  output: AssociateApplicationsResponse,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateApplications",
}));

export type AssociateSourceServersError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Associate source servers to application.
 */
export const associateSourceServers: API.OperationMethod<
  AssociateSourceServersRequest,
  AssociateSourceServersResponse,
  AssociateSourceServersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateSourceServersRequest,
  output: AssociateSourceServersResponse,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateSourceServers",
}));

export type ChangeServerLifeCycleStateError =
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Allows the user to set the SourceServer.LifeCycle.state property for specific Source Server IDs to one of the following: READY_FOR_TEST or READY_FOR_CUTOVER. This command only works if the Source Server is already launchable (dataReplicationInfo.lagDuration is not null.)
 */
export const changeServerLifeCycleState: API.OperationMethod<
  ChangeServerLifeCycleStateRequest,
  SourceServer,
  ChangeServerLifeCycleStateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ChangeServerLifeCycleStateRequest,
  output: SourceServer,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ChangeServerLifeCycleState",
}));

export type CreateApplicationError =
  | ConflictException
  | ServiceQuotaExceededException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Create application.
 */
export const createApplication: API.OperationMethod<
  CreateApplicationRequest,
  Application,
  CreateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateApplicationRequest,
  output: Application,
  errors: [
    ConflictException,
    ServiceQuotaExceededException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApplication",
}));

export type CreateConnectorError =
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Create Connector.
 */
export const createConnector: API.OperationMethod<
  CreateConnectorRequest,
  Connector,
  CreateConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateConnectorRequest,
  output: Connector,
  errors: [UninitializedAccountException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConnector",
}));

export type CreateLaunchConfigurationTemplateError =
  | AccessDeniedException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new Launch Configuration Template.
 */
export const createLaunchConfigurationTemplate: API.OperationMethod<
  CreateLaunchConfigurationTemplateRequest,
  LaunchConfigurationTemplate,
  CreateLaunchConfigurationTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateLaunchConfigurationTemplateRequest,
  output: LaunchConfigurationTemplate,
  errors: [
    AccessDeniedException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLaunchConfigurationTemplate",
}));

export type CreateNetworkMigrationDefinitionError =
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new network migration definition that specifies the source and target network configuration for a migration.
 */
export const createNetworkMigrationDefinition: API.OperationMethod<
  CreateNetworkMigrationDefinitionRequest,
  NetworkMigrationDefinition,
  CreateNetworkMigrationDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateNetworkMigrationDefinitionRequest,
  output: NetworkMigrationDefinition,
  errors: [ServiceQuotaExceededException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateNetworkMigrationDefinition",
}));

export type CreateReplicationConfigurationTemplateError =
  | AccessDeniedException
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
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateReplicationConfigurationTemplate",
}));

export type CreateWaveError =
  | ConflictException
  | ServiceQuotaExceededException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Create wave.
 */
export const createWave: API.OperationMethod<
  CreateWaveRequest,
  Wave,
  CreateWaveError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateWaveRequest,
  output: Wave,
  errors: [
    ConflictException,
    ServiceQuotaExceededException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWave",
}));

export type DeleteApplicationError =
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Delete application.
 */
export const deleteApplication: API.OperationMethod<
  DeleteApplicationRequest,
  DeleteApplicationResponse,
  DeleteApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteApplicationRequest,
  output: DeleteApplicationResponse,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplication",
}));

export type DeleteConnectorError =
  | ResourceNotFoundException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Delete Connector.
 */
export const deleteConnector: API.OperationMethod<
  DeleteConnectorRequest,
  DeleteConnectorResponse,
  DeleteConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteConnectorRequest,
  output: DeleteConnectorResponse,
  errors: [
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnector",
}));

export type DeleteJobError =
  | ConflictException
  | ResourceNotFoundException
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
    ResourceNotFoundException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteJob",
}));

export type DeleteLaunchConfigurationTemplateError =
  | ConflictException
  | ResourceNotFoundException
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
    ResourceNotFoundException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLaunchConfigurationTemplate",
}));

export type DeleteNetworkMigrationDefinitionError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a network migration definition. This operation removes the migration definition and all associated metadata.
 */
export const deleteNetworkMigrationDefinition: API.OperationMethod<
  DeleteNetworkMigrationDefinitionRequest,
  DeleteNetworkMigrationDefinitionResponse,
  DeleteNetworkMigrationDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteNetworkMigrationDefinitionRequest,
  output: DeleteNetworkMigrationDefinitionResponse,
  errors: [AccessDeniedException, ConflictException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNetworkMigrationDefinition",
}));

export type DeleteReplicationConfigurationTemplateError =
  | ConflictException
  | ResourceNotFoundException
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
    ResourceNotFoundException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteReplicationConfigurationTemplate",
}));

export type DeleteSourceServerError =
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Deletes a single source server by ID.
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
    ResourceNotFoundException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSourceServer",
}));

export type DeleteVcenterClientError =
  | ResourceNotFoundException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a given vCenter client by ID.
 */
export const deleteVcenterClient: API.OperationMethod<
  DeleteVcenterClientRequest,
  DeleteVcenterClientResponse,
  DeleteVcenterClientError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteVcenterClientRequest,
  output: DeleteVcenterClientResponse,
  errors: [
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVcenterClient",
}));

export type DeleteWaveError =
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Delete wave.
 */
export const deleteWave: API.OperationMethod<
  DeleteWaveRequest,
  DeleteWaveResponse,
  DeleteWaveError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteWaveRequest,
  output: DeleteWaveResponse,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWave",
}));

export type DescribeJobLogItemsError =
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed job log items with paging.
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
  errors: [UninitializedAccountException, ValidationException],
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
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of Jobs. Use the JobsID and fromDate and toData filters to limit which jobs are returned. The response is sorted by creationDataTime - latest date first. Jobs are normally created by the StartTest, StartCutover, and TerminateTargetInstances APIs. Jobs are also created by DiagnosticLaunch and TerminateDiagnosticInstances, which are APIs available only to *Support* and only used in response to relevant support tickets.
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
  errors: [UninitializedAccountException, ValidationException],
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
  | ResourceNotFoundException
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
    ResourceNotFoundException,
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

export type DescribeReplicationConfigurationTemplatesError =
  | ResourceNotFoundException
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
    ResourceNotFoundException,
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

export type DescribeSourceServersError =
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves all SourceServers or multiple SourceServers by ID.
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
  errors: [UninitializedAccountException, ValidationException],
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

export type DescribeVcenterClientsError =
  | ResourceNotFoundException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of the installed vCenter clients.
 */
export const describeVcenterClients: API.PaginatedOperationMethod<
  DescribeVcenterClientsRequest,
  DescribeVcenterClientsResponse,
  DescribeVcenterClientsError,
  Credentials | HttpClient.HttpClient,
  VcenterClient
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeVcenterClientsRequest,
  output: DescribeVcenterClientsResponse,
  errors: [
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeVcenterClients",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DisassociateApplicationsError =
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Disassociate applications from wave.
 */
export const disassociateApplications: API.OperationMethod<
  DisassociateApplicationsRequest,
  DisassociateApplicationsResponse,
  DisassociateApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateApplicationsRequest,
  output: DisassociateApplicationsResponse,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateApplications",
}));

export type DisassociateSourceServersError =
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Disassociate source servers from application.
 */
export const disassociateSourceServers: API.OperationMethod<
  DisassociateSourceServersRequest,
  DisassociateSourceServersResponse,
  DisassociateSourceServersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateSourceServersRequest,
  output: DisassociateSourceServersResponse,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateSourceServers",
}));

export type DisconnectFromServiceError =
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Disconnects specific Source Servers from Application Migration Service. Data replication is stopped immediately. All AWS resources created by Application Migration Service for enabling the replication of these source servers will be terminated / deleted within 90 minutes. Launched Test or Cutover instances will NOT be terminated. If the agent on the source server has not been prevented from communicating with the Application Migration Service service, then it will receive a command to uninstall itself (within approximately 10 minutes). The following properties of the SourceServer will be changed immediately: dataReplicationInfo.dataReplicationState will be set to DISCONNECTED; The totalStorageBytes property for each of dataReplicationInfo.replicatedDisks will be set to zero; dataReplicationInfo.lagDuration and dataReplicationInfo.lagDuration will be nullified.
 */
export const disconnectFromService: API.OperationMethod<
  DisconnectFromServiceRequest,
  SourceServer,
  DisconnectFromServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisconnectFromServiceRequest,
  output: SourceServer,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisconnectFromService",
}));

export type FinalizeCutoverError =
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Finalizes the cutover immediately for specific Source Servers. All AWS resources created by Application Migration Service for enabling the replication of these source servers will be terminated / deleted within 90 minutes. Launched Test or Cutover instances will NOT be terminated. The AWS Replication Agent will receive a command to uninstall itself (within 10 minutes). The following properties of the SourceServer will be changed immediately: dataReplicationInfo.dataReplicationState will be changed to DISCONNECTED; The SourceServer.lifeCycle.state will be changed to CUTOVER; The totalStorageBytes property fo each of dataReplicationInfo.replicatedDisks will be set to zero; dataReplicationInfo.lagDuration and dataReplicationInfo.lagDuration will be nullified.
 */
export const finalizeCutover: API.OperationMethod<
  FinalizeCutoverRequest,
  SourceServer,
  FinalizeCutoverError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: FinalizeCutoverRequest,
  output: SourceServer,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "FinalizeCutover",
}));

export type GetLaunchConfigurationError =
  | ResourceNotFoundException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Lists all LaunchConfigurations available, filtered by Source Server IDs.
 */
export const getLaunchConfiguration: API.OperationMethod<
  GetLaunchConfigurationRequest,
  LaunchConfiguration,
  GetLaunchConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetLaunchConfigurationRequest,
  output: LaunchConfiguration,
  errors: [ResourceNotFoundException, UninitializedAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLaunchConfiguration",
}));

export type GetNetworkMigrationDefinitionError =
  | AccessDeniedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves the details of a network migration definition including source and target configurations.
 */
export const getNetworkMigrationDefinition: API.OperationMethod<
  GetNetworkMigrationDefinitionRequest,
  NetworkMigrationDefinition,
  GetNetworkMigrationDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetNetworkMigrationDefinitionRequest,
  output: NetworkMigrationDefinition,
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNetworkMigrationDefinition",
}));

export type GetNetworkMigrationMapperSegmentConstructError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific construct within a mapper segment, including its properties and configuration data.
 */
export const getNetworkMigrationMapperSegmentConstruct: API.OperationMethod<
  GetNetworkMigrationMapperSegmentConstructRequest,
  GetNetworkMigrationMapperSegmentConstructResponse,
  GetNetworkMigrationMapperSegmentConstructError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetNetworkMigrationMapperSegmentConstructRequest,
  output: GetNetworkMigrationMapperSegmentConstructResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNetworkMigrationMapperSegmentConstruct",
}));

export type GetReplicationConfigurationError =
  | ResourceNotFoundException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Lists all ReplicationConfigurations, filtered by Source Server ID.
 */
export const getReplicationConfiguration: API.OperationMethod<
  GetReplicationConfigurationRequest,
  ReplicationConfiguration,
  GetReplicationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetReplicationConfigurationRequest,
  output: ReplicationConfiguration,
  errors: [ResourceNotFoundException, UninitializedAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReplicationConfiguration",
}));

export type InitializeServiceError =
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Initialize Application Migration Service.
 */
export const initializeService: API.OperationMethod<
  InitializeServiceRequest,
  InitializeServiceResponse,
  InitializeServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: InitializeServiceRequest,
  output: InitializeServiceResponse,
  errors: [AccessDeniedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InitializeService",
}));

export type ListApplicationsError =
  | UninitializedAccountException
  | CommonErrors;
/**
 * Retrieves all applications or multiple applications by ID.
 */
export const listApplications: API.PaginatedOperationMethod<
  ListApplicationsRequest,
  ListApplicationsResponse,
  ListApplicationsError,
  Credentials | HttpClient.HttpClient,
  Application
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListApplicationsRequest,
  output: ListApplicationsResponse,
  errors: [UninitializedAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplications",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListConnectorsError =
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * List Connectors.
 */
export const listConnectors: API.PaginatedOperationMethod<
  ListConnectorsRequest,
  ListConnectorsResponse,
  ListConnectorsError,
  Credentials | HttpClient.HttpClient,
  Connector
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListConnectorsRequest,
  output: ListConnectorsResponse,
  errors: [UninitializedAccountException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConnectors",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListExportErrorsError =
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * List export errors.
 */
export const listExportErrors: API.PaginatedOperationMethod<
  ListExportErrorsRequest,
  ListExportErrorsResponse,
  ListExportErrorsError,
  Credentials | HttpClient.HttpClient,
  ExportTaskError
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListExportErrorsRequest,
  output: ListExportErrorsResponse,
  errors: [UninitializedAccountException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExportErrors",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListExportsError = UninitializedAccountException | CommonErrors;
/**
 * List exports.
 */
export const listExports: API.PaginatedOperationMethod<
  ListExportsRequest,
  ListExportsResponse,
  ListExportsError,
  Credentials | HttpClient.HttpClient,
  ExportTask
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListExportsRequest,
  output: ListExportsResponse,
  errors: [UninitializedAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExports",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListImportErrorsError =
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * List import errors.
 */
export const listImportErrors: API.PaginatedOperationMethod<
  ListImportErrorsRequest,
  ListImportErrorsResponse,
  ListImportErrorsError,
  Credentials | HttpClient.HttpClient,
  ImportTaskError
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListImportErrorsRequest,
  output: ListImportErrorsResponse,
  errors: [UninitializedAccountException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListImportErrors",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListImportFileEnrichmentsError = ValidationException | CommonErrors;
/**
 * Lists import file enrichment jobs with optional filtering by job IDs.
 */
export const listImportFileEnrichments: API.PaginatedOperationMethod<
  ListImportFileEnrichmentsRequest,
  ListImportFileEnrichmentsResponse,
  ListImportFileEnrichmentsError,
  Credentials | HttpClient.HttpClient,
  ImportFileEnrichment
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListImportFileEnrichmentsRequest,
  output: ListImportFileEnrichmentsResponse,
  errors: [ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListImportFileEnrichments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListImportsError =
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * List imports.
 */
export const listImports: API.PaginatedOperationMethod<
  ListImportsRequest,
  ListImportsResponse,
  ListImportsError,
  Credentials | HttpClient.HttpClient,
  ImportTask
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListImportsRequest,
  output: ListImportsResponse,
  errors: [UninitializedAccountException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListImports",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListManagedAccountsError =
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * List Managed Accounts.
 */
export const listManagedAccounts: API.PaginatedOperationMethod<
  ListManagedAccountsRequest,
  ListManagedAccountsResponse,
  ListManagedAccountsError,
  Credentials | HttpClient.HttpClient,
  ManagedAccount
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListManagedAccountsRequest,
  output: ListManagedAccountsResponse,
  errors: [UninitializedAccountException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListManagedAccounts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListNetworkMigrationAnalysesError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists network migration analysis jobs for a specified execution. Returns information about analysis job status and results.
 */
export const listNetworkMigrationAnalyses: API.PaginatedOperationMethod<
  ListNetworkMigrationAnalysesRequest,
  ListNetworkMigrationAnalysesResponse,
  ListNetworkMigrationAnalysesError,
  Credentials | HttpClient.HttpClient,
  NetworkMigrationAnalysisJobDetails
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListNetworkMigrationAnalysesRequest,
  output: ListNetworkMigrationAnalysesResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNetworkMigrationAnalyses",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListNetworkMigrationAnalysisResultsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the results of network migration analyses, showing connectivity and compatibility findings for migrated resources.
 */
export const listNetworkMigrationAnalysisResults: API.PaginatedOperationMethod<
  ListNetworkMigrationAnalysisResultsRequest,
  ListNetworkMigrationAnalysisResultsResponse,
  ListNetworkMigrationAnalysisResultsError,
  Credentials | HttpClient.HttpClient,
  NetworkMigrationAnalysisResult
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListNetworkMigrationAnalysisResultsRequest,
  output: ListNetworkMigrationAnalysisResultsResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNetworkMigrationAnalysisResults",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListNetworkMigrationCodeGenerationsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists network migration code generation jobs, which convert network mappings into infrastructure-as-code templates.
 */
export const listNetworkMigrationCodeGenerations: API.PaginatedOperationMethod<
  ListNetworkMigrationCodeGenerationsRequest,
  ListNetworkMigrationCodeGenerationsResponse,
  ListNetworkMigrationCodeGenerationsError,
  Credentials | HttpClient.HttpClient,
  NetworkMigrationCodeGenerationJobDetails
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListNetworkMigrationCodeGenerationsRequest,
  output: ListNetworkMigrationCodeGenerationsResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNetworkMigrationCodeGenerations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListNetworkMigrationCodeGenerationSegmentsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists code generation segments, which represent individual infrastructure components generated as code templates.
 */
export const listNetworkMigrationCodeGenerationSegments: API.PaginatedOperationMethod<
  ListNetworkMigrationCodeGenerationSegmentsRequest,
  ListNetworkMigrationCodeGenerationSegmentsResponse,
  ListNetworkMigrationCodeGenerationSegmentsError,
  Credentials | HttpClient.HttpClient,
  NetworkMigrationCodeGenerationSegment
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListNetworkMigrationCodeGenerationSegmentsRequest,
  output: ListNetworkMigrationCodeGenerationSegmentsResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNetworkMigrationCodeGenerationSegments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListNetworkMigrationDefinitionsError =
  | AccessDeniedException
  | CommonErrors;
/**
 * Lists all network migration definitions in the account, with optional filtering.
 */
export const listNetworkMigrationDefinitions: API.PaginatedOperationMethod<
  ListNetworkMigrationDefinitionsRequest,
  ListNetworkMigrationDefinitionsResponse,
  ListNetworkMigrationDefinitionsError,
  Credentials | HttpClient.HttpClient,
  NetworkMigrationDefinitionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListNetworkMigrationDefinitionsRequest,
  output: ListNetworkMigrationDefinitionsResponse,
  errors: [AccessDeniedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNetworkMigrationDefinitions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListNetworkMigrationDeployedStacksError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists CloudFormation stacks that have been deployed as part of the network migration.
 */
export const listNetworkMigrationDeployedStacks: API.PaginatedOperationMethod<
  ListNetworkMigrationDeployedStacksRequest,
  ListNetworkMigrationDeployedStacksResponse,
  ListNetworkMigrationDeployedStacksError,
  Credentials | HttpClient.HttpClient,
  NetworkMigrationDeployedStackDetails
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListNetworkMigrationDeployedStacksRequest,
  output: ListNetworkMigrationDeployedStacksResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNetworkMigrationDeployedStacks",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListNetworkMigrationDeploymentsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists network migration deployment jobs and their current status.
 */
export const listNetworkMigrationDeployments: API.PaginatedOperationMethod<
  ListNetworkMigrationDeploymentsRequest,
  ListNetworkMigrationDeployerJobResponse,
  ListNetworkMigrationDeploymentsError,
  Credentials | HttpClient.HttpClient,
  NetworkMigrationDeployerJobDetails
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListNetworkMigrationDeploymentsRequest,
  output: ListNetworkMigrationDeployerJobResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNetworkMigrationDeployments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListNetworkMigrationExecutionsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists network migration execution instances for a given definition, showing the status and progress of each execution.
 */
export const listNetworkMigrationExecutions: API.PaginatedOperationMethod<
  ListNetworkMigrationExecutionsRequest,
  ListNetworkMigrationExecutionsResponse,
  ListNetworkMigrationExecutionsError,
  Credentials | HttpClient.HttpClient,
  NetworkMigrationExecution
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListNetworkMigrationExecutionsRequest,
  output: ListNetworkMigrationExecutionsResponse,
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNetworkMigrationExecutions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListNetworkMigrationMapperSegmentConstructsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists constructs within a mapper segment, representing individual infrastructure components like VPCs, subnets, or security groups.
 */
export const listNetworkMigrationMapperSegmentConstructs: API.PaginatedOperationMethod<
  ListNetworkMigrationMapperSegmentConstructsRequest,
  ListNetworkMigrationMapperSegmentConstructsResponse,
  ListNetworkMigrationMapperSegmentConstructsError,
  Credentials | HttpClient.HttpClient,
  NetworkMigrationMapperSegmentConstruct
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListNetworkMigrationMapperSegmentConstructsRequest,
  output: ListNetworkMigrationMapperSegmentConstructsResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNetworkMigrationMapperSegmentConstructs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListNetworkMigrationMapperSegmentsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists mapper segments, which represent logical groupings of network resources to be migrated together.
 */
export const listNetworkMigrationMapperSegments: API.PaginatedOperationMethod<
  ListNetworkMigrationMapperSegmentsRequest,
  ListNetworkMigrationMapperSegmentsResponse,
  ListNetworkMigrationMapperSegmentsError,
  Credentials | HttpClient.HttpClient,
  NetworkMigrationMapperSegment
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListNetworkMigrationMapperSegmentsRequest,
  output: ListNetworkMigrationMapperSegmentsResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNetworkMigrationMapperSegments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListNetworkMigrationMappingsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists network migration mapping jobs, which analyze and create relationships between source and target network resources.
 */
export const listNetworkMigrationMappings: API.PaginatedOperationMethod<
  ListNetworkMigrationMappingsRequest,
  ListNetworkMigrationMappingsResponse,
  ListNetworkMigrationMappingsError,
  Credentials | HttpClient.HttpClient,
  NetworkMigrationMappingJobDetails
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListNetworkMigrationMappingsRequest,
  output: ListNetworkMigrationMappingsResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNetworkMigrationMappings",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListNetworkMigrationMappingUpdatesError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists mapping update jobs, which apply customer modifications to the generated network mappings.
 */
export const listNetworkMigrationMappingUpdates: API.PaginatedOperationMethod<
  ListNetworkMigrationMappingUpdatesRequest,
  ListNetworkMigrationMappingUpdatesResponse,
  ListNetworkMigrationMappingUpdatesError,
  Credentials | HttpClient.HttpClient,
  NetworkMigrationMappingUpdateJobDetails
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListNetworkMigrationMappingUpdatesRequest,
  output: ListNetworkMigrationMappingUpdatesResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNetworkMigrationMappingUpdates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSourceServerActionsError =
  | ResourceNotFoundException
  | UninitializedAccountException
  | CommonErrors;
/**
 * List source server post migration custom actions.
 */
export const listSourceServerActions: API.PaginatedOperationMethod<
  ListSourceServerActionsRequest,
  ListSourceServerActionsResponse,
  ListSourceServerActionsError,
  Credentials | HttpClient.HttpClient,
  SourceServerActionDocument
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSourceServerActionsRequest,
  output: ListSourceServerActionsResponse,
  errors: [ResourceNotFoundException, UninitializedAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSourceServerActions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
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
 * List all tags for your Application Migration Service resources.
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

export type ListTemplateActionsError =
  | ResourceNotFoundException
  | UninitializedAccountException
  | CommonErrors;
/**
 * List template post migration custom actions.
 */
export const listTemplateActions: API.PaginatedOperationMethod<
  ListTemplateActionsRequest,
  ListTemplateActionsResponse,
  ListTemplateActionsError,
  Credentials | HttpClient.HttpClient,
  TemplateActionDocument
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTemplateActionsRequest,
  output: ListTemplateActionsResponse,
  errors: [ResourceNotFoundException, UninitializedAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTemplateActions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListWavesError = UninitializedAccountException | CommonErrors;
/**
 * Retrieves all waves or multiple waves by ID.
 */
export const listWaves: API.PaginatedOperationMethod<
  ListWavesRequest,
  ListWavesResponse,
  ListWavesError,
  Credentials | HttpClient.HttpClient,
  Wave
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListWavesRequest,
  output: ListWavesResponse,
  errors: [UninitializedAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWaves",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type MarkAsArchivedError =
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Archives specific Source Servers by setting the SourceServer.isArchived property to true for specified SourceServers by ID. This command only works for SourceServers with a lifecycle. state which equals DISCONNECTED or CUTOVER.
 */
export const markAsArchived: API.OperationMethod<
  MarkAsArchivedRequest,
  SourceServer,
  MarkAsArchivedError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: MarkAsArchivedRequest,
  output: SourceServer,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "MarkAsArchived",
}));

export type PauseReplicationError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Pause Replication.
 */
export const pauseReplication: API.OperationMethod<
  PauseReplicationRequest,
  SourceServer,
  PauseReplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PauseReplicationRequest,
  output: SourceServer,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PauseReplication",
}));

export type PutSourceServerActionError =
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Put source server post migration custom action.
 */
export const putSourceServerAction: API.OperationMethod<
  PutSourceServerActionRequest,
  SourceServerActionDocument,
  PutSourceServerActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutSourceServerActionRequest,
  output: SourceServerActionDocument,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutSourceServerAction",
}));

export type PutTemplateActionError =
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Put template post migration custom action.
 */
export const putTemplateAction: API.OperationMethod<
  PutTemplateActionRequest,
  TemplateActionDocument,
  PutTemplateActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutTemplateActionRequest,
  output: TemplateActionDocument,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutTemplateAction",
}));

export type RemoveSourceServerActionError =
  | ResourceNotFoundException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Remove source server post migration custom action.
 */
export const removeSourceServerAction: API.OperationMethod<
  RemoveSourceServerActionRequest,
  RemoveSourceServerActionResponse,
  RemoveSourceServerActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RemoveSourceServerActionRequest,
  output: RemoveSourceServerActionResponse,
  errors: [
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveSourceServerAction",
}));

export type RemoveTemplateActionError =
  | ResourceNotFoundException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Remove template post migration custom action.
 */
export const removeTemplateAction: API.OperationMethod<
  RemoveTemplateActionRequest,
  RemoveTemplateActionResponse,
  RemoveTemplateActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RemoveTemplateActionRequest,
  output: RemoveTemplateActionResponse,
  errors: [
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveTemplateAction",
}));

export type ResumeReplicationError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Resume Replication.
 */
export const resumeReplication: API.OperationMethod<
  ResumeReplicationRequest,
  SourceServer,
  ResumeReplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ResumeReplicationRequest,
  output: SourceServer,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResumeReplication",
}));

export type RetryDataReplicationError =
  | ResourceNotFoundException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Causes the data replication initiation sequence to begin immediately upon next Handshake for specified SourceServer IDs, regardless of when the previous initiation started. This command will not work if the SourceServer is not stalled or is in a DISCONNECTED or STOPPED state.
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
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RetryDataReplication",
}));

export type StartCutoverError =
  | ConflictException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Launches a Cutover Instance for specific Source Servers. This command starts a LAUNCH job whose initiatedBy property is StartCutover and changes the SourceServer.lifeCycle.state property to CUTTING_OVER.
 */
export const startCutover: API.OperationMethod<
  StartCutoverRequest,
  StartCutoverResponse,
  StartCutoverError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartCutoverRequest,
  output: StartCutoverResponse,
  errors: [
    ConflictException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartCutover",
}));

export type StartExportError =
  | ServiceQuotaExceededException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Start export.
 */
export const startExport: API.OperationMethod<
  StartExportRequest,
  StartExportResponse,
  StartExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartExportRequest,
  output: StartExportResponse,
  errors: [
    ServiceQuotaExceededException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartExport",
}));

export type StartImportError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Start import.
 */
export const startImport: API.OperationMethod<
  StartImportRequest,
  StartImportResponse,
  StartImportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartImportRequest,
  output: StartImportResponse,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartImport",
}));

export type StartImportFileEnrichmentError =
  | AccessDeniedException
  | ConflictException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts an import file enrichment job to process and enrich network migration import files with additional metadata and IP assignment strategies.
 */
export const startImportFileEnrichment: API.OperationMethod<
  StartImportFileEnrichmentRequest,
  StartImportFileEnrichmentResponse,
  StartImportFileEnrichmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartImportFileEnrichmentRequest,
  output: StartImportFileEnrichmentResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartImportFileEnrichment",
}));

export type StartNetworkMigrationAnalysisError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a network migration analysis job to evaluate connectivity and compatibility of the migration mappings.
 */
export const startNetworkMigrationAnalysis: API.OperationMethod<
  StartNetworkMigrationAnalysisRequest,
  StartNetworkMigrationAnalysisResponse,
  StartNetworkMigrationAnalysisError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartNetworkMigrationAnalysisRequest,
  output: StartNetworkMigrationAnalysisResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartNetworkMigrationAnalysis",
}));

export type StartNetworkMigrationCodeGenerationError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a code generation job to convert network migration mappings into infrastructure-as-code templates.
 */
export const startNetworkMigrationCodeGeneration: API.OperationMethod<
  StartNetworkMigrationCodeGenerationRequest,
  StartNetworkMigrationCodeGenerationResponse,
  StartNetworkMigrationCodeGenerationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartNetworkMigrationCodeGenerationRequest,
  output: StartNetworkMigrationCodeGenerationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartNetworkMigrationCodeGeneration",
}));

export type StartNetworkMigrationDeploymentError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a deployment job to create the target network infrastructure based on the generated code templates.
 */
export const startNetworkMigrationDeployment: API.OperationMethod<
  StartNetworkMigrationDeploymentRequest,
  StartNetworkMigrationDeployerJobResponse,
  StartNetworkMigrationDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartNetworkMigrationDeploymentRequest,
  output: StartNetworkMigrationDeployerJobResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartNetworkMigrationDeployment",
}));

export type StartNetworkMigrationMappingError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts the network migration mapping process for a given network migration execution.
 */
export const startNetworkMigrationMapping: API.OperationMethod<
  StartNetworkMigrationMappingRequest,
  StartNetworkMigrationMappingResponse,
  StartNetworkMigrationMappingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartNetworkMigrationMappingRequest,
  output: StartNetworkMigrationMappingResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartNetworkMigrationMapping",
}));

export type StartNetworkMigrationMappingUpdateError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a job to apply customer modifications to network migration mappings, such as changing properties.
 */
export const startNetworkMigrationMappingUpdate: API.OperationMethod<
  StartNetworkMigrationMappingUpdateRequest,
  StartNetworkMigrationMappingUpdateResponse,
  StartNetworkMigrationMappingUpdateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartNetworkMigrationMappingUpdateRequest,
  output: StartNetworkMigrationMappingUpdateResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartNetworkMigrationMappingUpdate",
}));

export type StartReplicationError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Start replication for source server irrespective of its replication type.
 */
export const startReplication: API.OperationMethod<
  StartReplicationRequest,
  SourceServer,
  StartReplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartReplicationRequest,
  output: SourceServer,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartReplication",
}));

export type StartTestError =
  | ConflictException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Launches a Test Instance for specific Source Servers. This command starts a LAUNCH job whose initiatedBy property is StartTest and changes the SourceServer.lifeCycle.state property to TESTING.
 */
export const startTest: API.OperationMethod<
  StartTestRequest,
  StartTestResponse,
  StartTestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartTestRequest,
  output: StartTestResponse,
  errors: [
    ConflictException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartTest",
}));

export type StopReplicationError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Stop Replication.
 */
export const stopReplication: API.OperationMethod<
  StopReplicationRequest,
  SourceServer,
  StopReplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopReplicationRequest,
  output: SourceServer,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopReplication",
}));

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds or overwrites only the specified tags for the specified Application Migration Service resource or resources. When you specify an existing tag key, the value is overwritten with the new value. Each resource can have a maximum of 50 tags. Each tag consists of a key and optional value.
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

export type TerminateTargetInstancesError =
  | ConflictException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Starts a job that terminates specific launched EC2 Test and Cutover instances. This command will not work for any Source Server with a lifecycle.state of TESTING, CUTTING_OVER, or CUTOVER.
 */
export const terminateTargetInstances: API.OperationMethod<
  TerminateTargetInstancesRequest,
  TerminateTargetInstancesResponse,
  TerminateTargetInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TerminateTargetInstancesRequest,
  output: TerminateTargetInstancesResponse,
  errors: [
    ConflictException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TerminateTargetInstances",
}));

export type UnarchiveApplicationError =
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Unarchive application.
 */
export const unarchiveApplication: API.OperationMethod<
  UnarchiveApplicationRequest,
  Application,
  UnarchiveApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UnarchiveApplicationRequest,
  output: Application,
  errors: [
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UnarchiveApplication",
}));

export type UnarchiveWaveError =
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Unarchive wave.
 */
export const unarchiveWave: API.OperationMethod<
  UnarchiveWaveRequest,
  Wave,
  UnarchiveWaveError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UnarchiveWaveRequest,
  output: Wave,
  errors: [
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UnarchiveWave",
}));

export type UntagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified set of tags from the specified set of Application Migration Service resources.
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

export type UpdateApplicationError =
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Update application.
 */
export const updateApplication: API.OperationMethod<
  UpdateApplicationRequest,
  Application,
  UpdateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateApplicationRequest,
  output: Application,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApplication",
}));

export type UpdateConnectorError =
  | ResourceNotFoundException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Update Connector.
 */
export const updateConnector: API.OperationMethod<
  UpdateConnectorRequest,
  Connector,
  UpdateConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateConnectorRequest,
  output: Connector,
  errors: [
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConnector",
}));

export type UpdateLaunchConfigurationError =
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Updates multiple LaunchConfigurations by Source Server ID.
 *
 * bootMode valid values are `LEGACY_BIOS | UEFI`
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
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLaunchConfiguration",
}));

export type UpdateLaunchConfigurationTemplateError =
  | AccessDeniedException
  | ResourceNotFoundException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing Launch Configuration Template by ID.
 */
export const updateLaunchConfigurationTemplate: API.OperationMethod<
  UpdateLaunchConfigurationTemplateRequest,
  LaunchConfigurationTemplate,
  UpdateLaunchConfigurationTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateLaunchConfigurationTemplateRequest,
  output: LaunchConfigurationTemplate,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLaunchConfigurationTemplate",
}));

export type UpdateNetworkMigrationDefinitionError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing network migration definition with new source or target configurations.
 */
export const updateNetworkMigrationDefinition: API.OperationMethod<
  UpdateNetworkMigrationDefinitionRequest,
  NetworkMigrationDefinition,
  UpdateNetworkMigrationDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateNetworkMigrationDefinitionRequest,
  output: NetworkMigrationDefinition,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNetworkMigrationDefinition",
}));

export type UpdateNetworkMigrationMapperSegmentError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates a mapper segment's configuration, such as changing its scope tags.
 */
export const updateNetworkMigrationMapperSegment: API.OperationMethod<
  UpdateNetworkMigrationMapperSegmentRequest,
  NetworkMigrationMapperSegment,
  UpdateNetworkMigrationMapperSegmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateNetworkMigrationMapperSegmentRequest,
  output: NetworkMigrationMapperSegment,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNetworkMigrationMapperSegment",
}));

export type UpdateReplicationConfigurationError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Allows you to update multiple ReplicationConfigurations by Source Server ID.
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
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateReplicationConfiguration",
}));

export type UpdateReplicationConfigurationTemplateError =
  | AccessDeniedException
  | ResourceNotFoundException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Updates multiple ReplicationConfigurationTemplates by ID.
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
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateReplicationConfigurationTemplate",
}));

export type UpdateSourceServerError =
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Update Source Server.
 */
export const updateSourceServer: API.OperationMethod<
  UpdateSourceServerRequest,
  SourceServer,
  UpdateSourceServerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSourceServerRequest,
  output: SourceServer,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSourceServer",
}));

export type UpdateSourceServerReplicationTypeError =
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Allows you to change between the AGENT_BASED replication type and the SNAPSHOT_SHIPPING replication type.
 *
 * SNAPSHOT_SHIPPING should be used for agentless replication.
 */
export const updateSourceServerReplicationType: API.OperationMethod<
  UpdateSourceServerReplicationTypeRequest,
  SourceServer,
  UpdateSourceServerReplicationTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSourceServerReplicationTypeRequest,
  output: SourceServer,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSourceServerReplicationType",
}));

export type UpdateWaveError =
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Update wave.
 */
export const updateWave: API.OperationMethod<
  UpdateWaveRequest,
  Wave,
  UpdateWaveError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateWaveRequest,
  output: Wave,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWave",
}));
