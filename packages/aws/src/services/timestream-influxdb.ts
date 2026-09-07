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
  sdkId: "Timestream InfluxDB",
  serviceShapeName: "AmazonTimestreamInfluxDB",
});
const auth = T.AwsAuthSigv4({ name: "timestream-influxdb" });
const ver = T.ServiceVersion("2023-01-27");
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
              `https://timestream-influxdb-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://timestream-influxdb-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://timestream-influxdb.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://timestream-influxdb.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(T.HttpError(500), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
    },
    T.all(T.HttpError(429), T.Retryable()),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      reason: S.suspend(() => ValidationExceptionReason).annotate({
        identifier: "ValidationExceptionReason",
      }),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type DbBackupName = string;
export type DbResourceId = string;
export type RetentionDays = number;
export type TagKey = string;
export type TagValue = string;
export type RequestTagMap = { [key: string]: string | undefined };
export const RequestTagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateDbBackupInput {
  name: string;
  dbResourceId: string;
  retentionDays?: number;
  tags?: { [key: string]: string | undefined };
}
export const CreateDbBackupInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    dbResourceId: S.String,
    retentionDays: S.optional(S.Number),
    tags: S.optional(RequestTagMap),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateDbBackupInput",
}) as any as S.Schema<CreateDbBackupInput>;
export type DbBackupId = string;
export type Arn = string;
export type DbBackupStatus =
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED"
  | "DELETING"
  | "DELETED"
  | (string & {});
export const DbBackupStatus = S.String;

export type DbBackupType =
  | "HOURLY"
  | "DAILY"
  | "WEEKLY"
  | "MONTHLY"
  | "CUSTOM_SCHEDULE"
  | "ON_DEMAND"
  | "CONTINUOUS"
  | (string & {});
export const DbBackupType = S.String;

export type EngineType =
  | "INFLUXDB_V2"
  | "INFLUXDB_V3_CORE"
  | "INFLUXDB_V3_ENTERPRISE"
  | (string & {});
export const EngineType = S.String;

export type ResourceDeploymentType =
  | "SINGLE_AZ"
  | "WITH_MULTIAZ_STANDBY"
  | "MULTI_NODE_READ_REPLICAS"
  | (string & {});
export const ResourceDeploymentType = S.String;

export type KmsKeyId = string;
export interface ClusterConfiguration {
  ingestQueryInstances?: number;
  queryOnlyInstances?: number;
  dedicatedCompactor?: boolean;
}
export const ClusterConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ingestQueryInstances: S.optional(S.Number),
    queryOnlyInstances: S.optional(S.Number),
    dedicatedCompactor: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ClusterConfiguration",
}) as any as S.Schema<ClusterConfiguration>;
export type DbParameterGroupId = string;
export type DbInstanceType =
  | "db.influx.medium"
  | "db.influx.large"
  | "db.influx.xlarge"
  | "db.influx.2xlarge"
  | "db.influx.4xlarge"
  | "db.influx.8xlarge"
  | "db.influx.12xlarge"
  | "db.influx.16xlarge"
  | "db.influx.24xlarge"
  | (string & {});
export const DbInstanceType = S.String;

export interface S3Configuration {
  bucketName: string;
  enabled: boolean;
}
export const S3Configuration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ bucketName: S.String, enabled: S.Boolean }),
).annotate({
  identifier: "S3Configuration",
}) as any as S.Schema<S3Configuration>;
export interface LogDeliveryConfiguration {
  s3Configuration: S3Configuration;
}
export const LogDeliveryConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ s3Configuration: S3Configuration }),
).annotate({
  identifier: "LogDeliveryConfiguration",
}) as any as S.Schema<LogDeliveryConfiguration>;
export type FailoverMode = "AUTOMATIC" | "NO_FAILOVER" | (string & {});
export const FailoverMode = S.String;

export type DbStorageType =
  | "InfluxIOIncludedT1"
  | "InfluxIOIncludedT2"
  | "InfluxIOIncludedT3"
  | (string & {});
export const DbStorageType = S.String;

export type AllocatedStorage = number;
export type VpcSubnetId = string;
export type VpcSubnetIdList = string[];
export const VpcSubnetIdList = /*@__PURE__*/ S.Array(S.String);
export type VpcSecurityGroupId = string;
export type VpcSecurityGroupIdList = string[];
export const VpcSecurityGroupIdList = /*@__PURE__*/ S.Array(S.String);
export type NetworkType = "IPV4" | "DUAL" | (string & {});
export const NetworkType = S.String;

export type IanaTimezone = string;
export type MaintenanceWindow = string;
export interface MaintenanceSchedule {
  timezone: string;
  preferredMaintenanceWindow: string;
}
export const MaintenanceSchedule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ timezone: S.String, preferredMaintenanceWindow: S.String }),
).annotate({
  identifier: "MaintenanceSchedule",
}) as any as S.Schema<MaintenanceSchedule>;
export interface CreateDbBackupOutput {
  id: string;
  name?: string;
  arn: string;
  status?: DbBackupStatus;
  createdAt?: Date;
  expiresAfter?: string;
  dbResourceId?: string;
  type?: DbBackupType;
  engineType?: EngineType;
  deploymentType?: ResourceDeploymentType;
  kmsKeyId?: string;
  clusterConfiguration?: ClusterConfiguration;
  dbParameterGroupId?: string;
  dbInstanceType?: DbInstanceType;
  logDeliveryConfiguration?: LogDeliveryConfiguration;
  failoverMode?: FailoverMode;
  dbStorageType?: DbStorageType;
  allocatedStorage?: number;
  vpcSubnetIds?: string[];
  vpcSecurityGroupIds?: string[];
  publiclyAccessible?: boolean;
  port?: number;
  networkType?: NetworkType;
  influxAuthParametersSecretArn?: string;
  maintenanceSchedule?: MaintenanceSchedule;
}
export const CreateDbBackupOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    name: S.optional(S.String),
    arn: S.String,
    status: S.optional(DbBackupStatus),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    expiresAfter: S.optional(S.String),
    dbResourceId: S.optional(S.String),
    type: S.optional(DbBackupType),
    engineType: S.optional(EngineType),
    deploymentType: S.optional(ResourceDeploymentType),
    kmsKeyId: S.optional(S.String),
    clusterConfiguration: S.optional(ClusterConfiguration),
    dbParameterGroupId: S.optional(S.String),
    dbInstanceType: S.optional(DbInstanceType),
    logDeliveryConfiguration: S.optional(LogDeliveryConfiguration),
    failoverMode: S.optional(FailoverMode),
    dbStorageType: S.optional(DbStorageType),
    allocatedStorage: S.optional(S.Number),
    vpcSubnetIds: S.optional(VpcSubnetIdList),
    vpcSecurityGroupIds: S.optional(VpcSecurityGroupIdList),
    publiclyAccessible: S.optional(S.Boolean),
    port: S.optional(S.Number),
    networkType: S.optional(NetworkType),
    influxAuthParametersSecretArn: S.optional(S.String),
    maintenanceSchedule: S.optional(MaintenanceSchedule),
  }),
).annotate({
  identifier: "CreateDbBackupOutput",
}) as any as S.Schema<CreateDbBackupOutput>;
export type DbClusterName = string;
export type Username = string | redacted.Redacted<string>;
export type Password = string | redacted.Redacted<string>;
export type Organization = string;
export type Bucket = string;
export type Port = number;
export type DbParameterGroupIdentifier = string;
export type ClusterDeploymentType = "MULTI_NODE_READ_REPLICAS" | (string & {});
export const ClusterDeploymentType = S.String;

export type AutomatedDbBackupType =
  | "HOURLY"
  | "DAILY"
  | "WEEKLY"
  | "MONTHLY"
  | "CUSTOM_SCHEDULE"
  | "CONTINUOUS"
  | (string & {});
export const AutomatedDbBackupType = S.String;

export type AutomatedBackupRetentionDays = number;
export type AwsCronSchedule = string;
export interface DbBackupConfiguration {
  type: AutomatedDbBackupType;
  retentionDays: number;
  enabled: boolean;
  customSchedule?: string;
}
export const DbBackupConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: AutomatedDbBackupType,
    retentionDays: S.Number,
    enabled: S.Boolean,
    customSchedule: S.optional(S.String),
  }),
).annotate({
  identifier: "DbBackupConfiguration",
}) as any as S.Schema<DbBackupConfiguration>;
export type DbBackupConfigurationInputList = DbBackupConfiguration[];
export const DbBackupConfigurationInputList = /*@__PURE__*/ S.Array(
  DbBackupConfiguration,
);
export interface CreateDbClusterInput {
  name: string;
  username?: string | redacted.Redacted<string>;
  password?: string | redacted.Redacted<string>;
  organization?: string;
  bucket?: string;
  port?: number;
  dbParameterGroupIdentifier?: string;
  dbInstanceType: DbInstanceType;
  dbStorageType?: DbStorageType;
  allocatedStorage?: number;
  networkType?: NetworkType;
  publiclyAccessible?: boolean;
  vpcSubnetIds: string[];
  vpcSecurityGroupIds: string[];
  deploymentType?: ClusterDeploymentType;
  failoverMode?: FailoverMode;
  logDeliveryConfiguration?: LogDeliveryConfiguration;
  maintenanceSchedule?: MaintenanceSchedule;
  dbBackupConfigurations?: DbBackupConfiguration[];
  kmsKeyId?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateDbClusterInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    username: S.optional(SensitiveString),
    password: S.optional(SensitiveString),
    organization: S.optional(S.String),
    bucket: S.optional(S.String),
    port: S.optional(S.Number),
    dbParameterGroupIdentifier: S.optional(S.String),
    dbInstanceType: DbInstanceType,
    dbStorageType: S.optional(DbStorageType),
    allocatedStorage: S.optional(S.Number),
    networkType: S.optional(NetworkType),
    publiclyAccessible: S.optional(S.Boolean),
    vpcSubnetIds: VpcSubnetIdList,
    vpcSecurityGroupIds: VpcSecurityGroupIdList,
    deploymentType: S.optional(ClusterDeploymentType),
    failoverMode: S.optional(FailoverMode),
    logDeliveryConfiguration: S.optional(LogDeliveryConfiguration),
    maintenanceSchedule: S.optional(MaintenanceSchedule),
    dbBackupConfigurations: S.optional(DbBackupConfigurationInputList),
    kmsKeyId: S.optional(S.String),
    tags: S.optional(RequestTagMap),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateDbClusterInput",
}) as any as S.Schema<CreateDbClusterInput>;
export type DbClusterId = string;
export type ClusterStatus =
  | "CREATING"
  | "UPDATING"
  | "DELETING"
  | "AVAILABLE"
  | "FAILED"
  | "DELETED"
  | "MAINTENANCE"
  | "UPDATING_INSTANCE_TYPE"
  | "REBOOTING"
  | "REBOOT_FAILED"
  | "PARTIALLY_AVAILABLE"
  | "RESTORING"
  | "RESTORE_FAILED"
  | (string & {});
export const ClusterStatus = S.String;

export interface CreateDbClusterOutput {
  dbClusterId?: string;
  dbClusterStatus?: ClusterStatus;
}
export const CreateDbClusterOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dbClusterId: S.optional(S.String),
    dbClusterStatus: S.optional(ClusterStatus),
  }),
).annotate({
  identifier: "CreateDbClusterOutput",
}) as any as S.Schema<CreateDbClusterOutput>;
export type DbInstanceName = string;
export type DeploymentType =
  | "SINGLE_AZ"
  | "WITH_MULTIAZ_STANDBY"
  | (string & {});
export const DeploymentType = S.String;

export interface CreateDbInstanceInput {
  name: string;
  username?: string | redacted.Redacted<string>;
  password: string | redacted.Redacted<string>;
  organization?: string;
  bucket?: string;
  dbInstanceType: DbInstanceType;
  vpcSubnetIds: string[];
  vpcSecurityGroupIds: string[];
  publiclyAccessible?: boolean;
  dbStorageType?: DbStorageType;
  allocatedStorage: number;
  dbParameterGroupIdentifier?: string;
  deploymentType?: DeploymentType;
  logDeliveryConfiguration?: LogDeliveryConfiguration;
  maintenanceSchedule?: MaintenanceSchedule;
  tags?: { [key: string]: string | undefined };
  port?: number;
  networkType?: NetworkType;
  dbBackupConfigurations?: DbBackupConfiguration[];
  kmsKeyId?: string;
}
export const CreateDbInstanceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    username: S.optional(SensitiveString),
    password: SensitiveString,
    organization: S.optional(S.String),
    bucket: S.optional(S.String),
    dbInstanceType: DbInstanceType,
    vpcSubnetIds: VpcSubnetIdList,
    vpcSecurityGroupIds: VpcSecurityGroupIdList,
    publiclyAccessible: S.optional(S.Boolean),
    dbStorageType: S.optional(DbStorageType),
    allocatedStorage: S.Number,
    dbParameterGroupIdentifier: S.optional(S.String),
    deploymentType: S.optional(DeploymentType),
    logDeliveryConfiguration: S.optional(LogDeliveryConfiguration),
    maintenanceSchedule: S.optional(MaintenanceSchedule),
    tags: S.optional(RequestTagMap),
    port: S.optional(S.Number),
    networkType: S.optional(NetworkType),
    dbBackupConfigurations: S.optional(DbBackupConfigurationInputList),
    kmsKeyId: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateDbInstanceInput",
}) as any as S.Schema<CreateDbInstanceInput>;
export type DbInstanceId = string;
export type Status =
  | "CREATING"
  | "AVAILABLE"
  | "DELETING"
  | "MODIFYING"
  | "UPDATING"
  | "DELETED"
  | "FAILED"
  | "UPDATING_DEPLOYMENT_TYPE"
  | "UPDATING_INSTANCE_TYPE"
  | "MAINTENANCE"
  | "REBOOTING"
  | "REBOOT_FAILED"
  | "RESTORING"
  | "RESTORE_FAILED"
  | (string & {});
export const Status = S.String;

export type InstanceMode =
  | "PRIMARY"
  | "STANDBY"
  | "REPLICA"
  | "INGEST"
  | "QUERY"
  | "COMPACT"
  | "PROCESS"
  | (string & {});
export const InstanceMode = S.String;

export type InstanceModeList = InstanceMode[];
export const InstanceModeList = /*@__PURE__*/ S.Array(InstanceMode);
export interface DbBackupConfigurationOutput {
  type: AutomatedDbBackupType;
  retentionDays: number;
  enabled: boolean;
  customSchedule?: string;
  nextAutomatedBackupTime?: Date;
}
export const DbBackupConfigurationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: AutomatedDbBackupType,
    retentionDays: S.Number,
    enabled: S.Boolean,
    customSchedule: S.optional(S.String),
    nextAutomatedBackupTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "DbBackupConfigurationOutput",
}) as any as S.Schema<DbBackupConfigurationOutput>;
export type DbBackupConfigurationOutputList = DbBackupConfigurationOutput[];
export const DbBackupConfigurationOutputList = /*@__PURE__*/ S.Array(
  DbBackupConfigurationOutput,
);
export interface CreateDbInstanceOutput {
  id: string;
  name: string;
  arn: string;
  status?: Status;
  endpoint?: string;
  port?: number;
  networkType?: NetworkType;
  dbInstanceType?: DbInstanceType;
  dbStorageType?: DbStorageType;
  allocatedStorage?: number;
  deploymentType?: DeploymentType;
  vpcSubnetIds: string[];
  publiclyAccessible?: boolean;
  vpcSecurityGroupIds?: string[];
  dbParameterGroupIdentifier?: string;
  availabilityZone?: string;
  secondaryAvailabilityZone?: string;
  logDeliveryConfiguration?: LogDeliveryConfiguration;
  influxAuthParametersSecretArn?: string;
  dbClusterId?: string;
  instanceMode?: InstanceMode;
  instanceModes?: InstanceMode[];
  maintenanceSchedule?: MaintenanceSchedule;
  lastMaintenanceTime?: Date;
  nextMaintenanceTime?: Date;
  dbBackupConfigurations?: DbBackupConfigurationOutput[];
  kmsKeyId?: string;
}
export const CreateDbInstanceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    name: S.String,
    arn: S.String,
    status: S.optional(Status),
    endpoint: S.optional(S.String),
    port: S.optional(S.Number),
    networkType: S.optional(NetworkType),
    dbInstanceType: S.optional(DbInstanceType),
    dbStorageType: S.optional(DbStorageType),
    allocatedStorage: S.optional(S.Number),
    deploymentType: S.optional(DeploymentType),
    vpcSubnetIds: VpcSubnetIdList,
    publiclyAccessible: S.optional(S.Boolean),
    vpcSecurityGroupIds: S.optional(VpcSecurityGroupIdList),
    dbParameterGroupIdentifier: S.optional(S.String),
    availabilityZone: S.optional(S.String),
    secondaryAvailabilityZone: S.optional(S.String),
    logDeliveryConfiguration: S.optional(LogDeliveryConfiguration),
    influxAuthParametersSecretArn: S.optional(S.String),
    dbClusterId: S.optional(S.String),
    instanceMode: S.optional(InstanceMode),
    instanceModes: S.optional(InstanceModeList),
    maintenanceSchedule: S.optional(MaintenanceSchedule),
    lastMaintenanceTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    nextMaintenanceTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    dbBackupConfigurations: S.optional(DbBackupConfigurationOutputList),
    kmsKeyId: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateDbInstanceOutput",
}) as any as S.Schema<CreateDbInstanceOutput>;
export type DbParameterGroupName = string;
export type LogLevel = "debug" | "info" | "error" | (string & {});
export const LogLevel = S.String;

export type TracingType = "log" | "jaeger" | "disabled" | (string & {});
export const TracingType = S.String;

export type DurationType =
  | "hours"
  | "minutes"
  | "seconds"
  | "milliseconds"
  | "days"
  | (string & {});
export const DurationType = S.String;

export interface Duration {
  durationType: DurationType;
  value: number;
}
export const Duration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ durationType: DurationType, value: S.Number }),
).annotate({ identifier: "Duration" }) as any as S.Schema<Duration>;
export interface InfluxDBv2Parameters {
  fluxLogEnabled?: boolean;
  logLevel?: LogLevel;
  noTasks?: boolean;
  queryConcurrency?: number;
  queryQueueSize?: number;
  tracingType?: TracingType;
  metricsDisabled?: boolean;
  httpIdleTimeout?: Duration;
  httpReadHeaderTimeout?: Duration;
  httpReadTimeout?: Duration;
  httpWriteTimeout?: Duration;
  influxqlMaxSelectBuckets?: number;
  influxqlMaxSelectPoint?: number;
  influxqlMaxSelectSeries?: number;
  pprofDisabled?: boolean;
  queryInitialMemoryBytes?: number;
  queryMaxMemoryBytes?: number;
  queryMemoryBytes?: number;
  sessionLength?: number;
  sessionRenewDisabled?: boolean;
  storageCacheMaxMemorySize?: number;
  storageCacheSnapshotMemorySize?: number;
  storageCacheSnapshotWriteColdDuration?: Duration;
  storageCompactFullWriteColdDuration?: Duration;
  storageCompactThroughputBurst?: number;
  storageMaxConcurrentCompactions?: number;
  storageMaxIndexLogFileSize?: number;
  storageNoValidateFieldSize?: boolean;
  storageRetentionCheckInterval?: Duration;
  storageSeriesFileMaxConcurrentSnapshotCompactions?: number;
  storageSeriesIdSetCacheSize?: number;
  storageWalMaxConcurrentWrites?: number;
  storageWalMaxWriteDelay?: Duration;
  uiDisabled?: boolean;
}
export const InfluxDBv2Parameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fluxLogEnabled: S.optional(S.Boolean),
    logLevel: S.optional(LogLevel),
    noTasks: S.optional(S.Boolean),
    queryConcurrency: S.optional(S.Number),
    queryQueueSize: S.optional(S.Number),
    tracingType: S.optional(TracingType),
    metricsDisabled: S.optional(S.Boolean),
    httpIdleTimeout: S.optional(Duration),
    httpReadHeaderTimeout: S.optional(Duration),
    httpReadTimeout: S.optional(Duration),
    httpWriteTimeout: S.optional(Duration),
    influxqlMaxSelectBuckets: S.optional(S.Number),
    influxqlMaxSelectPoint: S.optional(S.Number),
    influxqlMaxSelectSeries: S.optional(S.Number),
    pprofDisabled: S.optional(S.Boolean),
    queryInitialMemoryBytes: S.optional(S.Number),
    queryMaxMemoryBytes: S.optional(S.Number),
    queryMemoryBytes: S.optional(S.Number),
    sessionLength: S.optional(S.Number),
    sessionRenewDisabled: S.optional(S.Boolean),
    storageCacheMaxMemorySize: S.optional(S.Number),
    storageCacheSnapshotMemorySize: S.optional(S.Number),
    storageCacheSnapshotWriteColdDuration: S.optional(Duration),
    storageCompactFullWriteColdDuration: S.optional(Duration),
    storageCompactThroughputBurst: S.optional(S.Number),
    storageMaxConcurrentCompactions: S.optional(S.Number),
    storageMaxIndexLogFileSize: S.optional(S.Number),
    storageNoValidateFieldSize: S.optional(S.Boolean),
    storageRetentionCheckInterval: S.optional(Duration),
    storageSeriesFileMaxConcurrentSnapshotCompactions: S.optional(S.Number),
    storageSeriesIdSetCacheSize: S.optional(S.Number),
    storageWalMaxConcurrentWrites: S.optional(S.Number),
    storageWalMaxWriteDelay: S.optional(Duration),
    uiDisabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "InfluxDBv2Parameters",
}) as any as S.Schema<InfluxDBv2Parameters>;
export type LogFormats = "full" | (string & {});
export const LogFormats = S.String;

export type DataFusionRuntimeType =
  | "multi-thread"
  | "multi-thread-alt"
  | (string & {});
export const DataFusionRuntimeType = S.String;

export type PercentOrAbsoluteLong =
  | { percent: string; absolute?: never }
  | { percent?: never; absolute: number };
export const PercentOrAbsoluteLong = /*@__PURE__*/ S.Union([
  S.Struct({ percent: S.String }),
  S.Struct({ absolute: S.Number }),
]);
export type PluginRepositorySecretArn = string;
export interface InfluxDBv3CoreParameters {
  queryFileLimit?: number;
  queryLogSize?: number;
  logFilter?: string;
  logFormat?: LogFormats;
  dataFusionNumThreads?: number;
  dataFusionRuntimeType?: DataFusionRuntimeType;
  dataFusionRuntimeDisableLifoSlot?: boolean;
  dataFusionRuntimeEventInterval?: number;
  dataFusionRuntimeGlobalQueueInterval?: number;
  dataFusionRuntimeMaxBlockingThreads?: number;
  dataFusionRuntimeMaxIoEventsPerTick?: number;
  dataFusionRuntimeThreadKeepAlive?: Duration;
  dataFusionRuntimeThreadPriority?: number;
  dataFusionMaxParquetFanout?: number;
  dataFusionUseCachedParquetLoader?: boolean;
  dataFusionConfig?: string;
  maxHttpRequestSize?: number;
  forceSnapshotMemThreshold?: PercentOrAbsoluteLong;
  walSnapshotSize?: number;
  walMaxWriteBufferSize?: number;
  snapshottedWalFilesToKeep?: number;
  preemptiveCacheAge?: Duration;
  parquetMemCachePrunePercentage?: number;
  parquetMemCachePruneInterval?: Duration;
  disableParquetMemCache?: boolean;
  parquetMemCacheQueryPathDuration?: Duration;
  lastCacheEvictionInterval?: Duration;
  distinctCacheEvictionInterval?: Duration;
  gen1Duration?: Duration;
  execMemPoolBytes?: PercentOrAbsoluteLong;
  parquetMemCacheSize?: PercentOrAbsoluteLong;
  walReplayFailOnError?: boolean;
  walReplayConcurrencyLimit?: number;
  tableIndexCacheMaxEntries?: number;
  tableIndexCacheConcurrencyLimit?: number;
  gen1LookbackDuration?: Duration;
  retentionCheckInterval?: Duration;
  deleteGracePeriod?: Duration;
  hardDeleteDefaultDuration?: Duration;
  pluginRepositoryUrl?: string;
  pluginRepositorySecretArn?: string;
}
export const InfluxDBv3CoreParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    queryFileLimit: S.optional(S.Number),
    queryLogSize: S.optional(S.Number),
    logFilter: S.optional(S.String),
    logFormat: S.optional(LogFormats),
    dataFusionNumThreads: S.optional(S.Number),
    dataFusionRuntimeType: S.optional(DataFusionRuntimeType),
    dataFusionRuntimeDisableLifoSlot: S.optional(S.Boolean),
    dataFusionRuntimeEventInterval: S.optional(S.Number),
    dataFusionRuntimeGlobalQueueInterval: S.optional(S.Number),
    dataFusionRuntimeMaxBlockingThreads: S.optional(S.Number),
    dataFusionRuntimeMaxIoEventsPerTick: S.optional(S.Number),
    dataFusionRuntimeThreadKeepAlive: S.optional(Duration),
    dataFusionRuntimeThreadPriority: S.optional(S.Number),
    dataFusionMaxParquetFanout: S.optional(S.Number),
    dataFusionUseCachedParquetLoader: S.optional(S.Boolean),
    dataFusionConfig: S.optional(S.String),
    maxHttpRequestSize: S.optional(S.Number),
    forceSnapshotMemThreshold: S.optional(PercentOrAbsoluteLong),
    walSnapshotSize: S.optional(S.Number),
    walMaxWriteBufferSize: S.optional(S.Number),
    snapshottedWalFilesToKeep: S.optional(S.Number),
    preemptiveCacheAge: S.optional(Duration),
    parquetMemCachePrunePercentage: S.optional(S.Number),
    parquetMemCachePruneInterval: S.optional(Duration),
    disableParquetMemCache: S.optional(S.Boolean),
    parquetMemCacheQueryPathDuration: S.optional(Duration),
    lastCacheEvictionInterval: S.optional(Duration),
    distinctCacheEvictionInterval: S.optional(Duration),
    gen1Duration: S.optional(Duration),
    execMemPoolBytes: S.optional(PercentOrAbsoluteLong),
    parquetMemCacheSize: S.optional(PercentOrAbsoluteLong),
    walReplayFailOnError: S.optional(S.Boolean),
    walReplayConcurrencyLimit: S.optional(S.Number),
    tableIndexCacheMaxEntries: S.optional(S.Number),
    tableIndexCacheConcurrencyLimit: S.optional(S.Number),
    gen1LookbackDuration: S.optional(Duration),
    retentionCheckInterval: S.optional(Duration),
    deleteGracePeriod: S.optional(Duration),
    hardDeleteDefaultDuration: S.optional(Duration),
    pluginRepositoryUrl: S.optional(S.String),
    pluginRepositorySecretArn: S.optional(S.String),
  }),
).annotate({
  identifier: "InfluxDBv3CoreParameters",
}) as any as S.Schema<InfluxDBv3CoreParameters>;
export interface InfluxDBv3EnterpriseParameters {
  queryFileLimit?: number;
  queryLogSize?: number;
  logFilter?: string;
  logFormat?: LogFormats;
  dataFusionNumThreads?: number;
  dataFusionRuntimeType?: DataFusionRuntimeType;
  dataFusionRuntimeDisableLifoSlot?: boolean;
  dataFusionRuntimeEventInterval?: number;
  dataFusionRuntimeGlobalQueueInterval?: number;
  dataFusionRuntimeMaxBlockingThreads?: number;
  dataFusionRuntimeMaxIoEventsPerTick?: number;
  dataFusionRuntimeThreadKeepAlive?: Duration;
  dataFusionRuntimeThreadPriority?: number;
  dataFusionMaxParquetFanout?: number;
  dataFusionUseCachedParquetLoader?: boolean;
  dataFusionConfig?: string;
  maxHttpRequestSize?: number;
  forceSnapshotMemThreshold?: PercentOrAbsoluteLong;
  walSnapshotSize?: number;
  walMaxWriteBufferSize?: number;
  snapshottedWalFilesToKeep?: number;
  preemptiveCacheAge?: Duration;
  parquetMemCachePrunePercentage?: number;
  parquetMemCachePruneInterval?: Duration;
  disableParquetMemCache?: boolean;
  parquetMemCacheQueryPathDuration?: Duration;
  lastCacheEvictionInterval?: Duration;
  distinctCacheEvictionInterval?: Duration;
  gen1Duration?: Duration;
  execMemPoolBytes?: PercentOrAbsoluteLong;
  parquetMemCacheSize?: PercentOrAbsoluteLong;
  walReplayFailOnError?: boolean;
  walReplayConcurrencyLimit?: number;
  tableIndexCacheMaxEntries?: number;
  tableIndexCacheConcurrencyLimit?: number;
  gen1LookbackDuration?: Duration;
  retentionCheckInterval?: Duration;
  deleteGracePeriod?: Duration;
  hardDeleteDefaultDuration?: Duration;
  pluginRepositoryUrl?: string;
  pluginRepositorySecretArn?: string;
  ingestQueryInstances: number;
  queryOnlyInstances: number;
  dedicatedCompactor: boolean;
  compactionRowLimit?: number;
  compactionMaxNumFilesPerPlan?: number;
  compactionGen2Duration?: Duration;
  compactionMultipliers?: string;
  compactionCleanupWait?: Duration;
  compactionCheckInterval?: Duration;
  lastValueCacheDisableFromHistory?: boolean;
  distinctValueCacheDisableFromHistory?: boolean;
  replicationInterval?: Duration;
  catalogSyncInterval?: Duration;
}
export const InfluxDBv3EnterpriseParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    queryFileLimit: S.optional(S.Number),
    queryLogSize: S.optional(S.Number),
    logFilter: S.optional(S.String),
    logFormat: S.optional(LogFormats),
    dataFusionNumThreads: S.optional(S.Number),
    dataFusionRuntimeType: S.optional(DataFusionRuntimeType),
    dataFusionRuntimeDisableLifoSlot: S.optional(S.Boolean),
    dataFusionRuntimeEventInterval: S.optional(S.Number),
    dataFusionRuntimeGlobalQueueInterval: S.optional(S.Number),
    dataFusionRuntimeMaxBlockingThreads: S.optional(S.Number),
    dataFusionRuntimeMaxIoEventsPerTick: S.optional(S.Number),
    dataFusionRuntimeThreadKeepAlive: S.optional(Duration),
    dataFusionRuntimeThreadPriority: S.optional(S.Number),
    dataFusionMaxParquetFanout: S.optional(S.Number),
    dataFusionUseCachedParquetLoader: S.optional(S.Boolean),
    dataFusionConfig: S.optional(S.String),
    maxHttpRequestSize: S.optional(S.Number),
    forceSnapshotMemThreshold: S.optional(PercentOrAbsoluteLong),
    walSnapshotSize: S.optional(S.Number),
    walMaxWriteBufferSize: S.optional(S.Number),
    snapshottedWalFilesToKeep: S.optional(S.Number),
    preemptiveCacheAge: S.optional(Duration),
    parquetMemCachePrunePercentage: S.optional(S.Number),
    parquetMemCachePruneInterval: S.optional(Duration),
    disableParquetMemCache: S.optional(S.Boolean),
    parquetMemCacheQueryPathDuration: S.optional(Duration),
    lastCacheEvictionInterval: S.optional(Duration),
    distinctCacheEvictionInterval: S.optional(Duration),
    gen1Duration: S.optional(Duration),
    execMemPoolBytes: S.optional(PercentOrAbsoluteLong),
    parquetMemCacheSize: S.optional(PercentOrAbsoluteLong),
    walReplayFailOnError: S.optional(S.Boolean),
    walReplayConcurrencyLimit: S.optional(S.Number),
    tableIndexCacheMaxEntries: S.optional(S.Number),
    tableIndexCacheConcurrencyLimit: S.optional(S.Number),
    gen1LookbackDuration: S.optional(Duration),
    retentionCheckInterval: S.optional(Duration),
    deleteGracePeriod: S.optional(Duration),
    hardDeleteDefaultDuration: S.optional(Duration),
    pluginRepositoryUrl: S.optional(S.String),
    pluginRepositorySecretArn: S.optional(S.String),
    ingestQueryInstances: S.Number,
    queryOnlyInstances: S.Number,
    dedicatedCompactor: S.Boolean,
    compactionRowLimit: S.optional(S.Number),
    compactionMaxNumFilesPerPlan: S.optional(S.Number),
    compactionGen2Duration: S.optional(Duration),
    compactionMultipliers: S.optional(S.String),
    compactionCleanupWait: S.optional(Duration),
    compactionCheckInterval: S.optional(Duration),
    lastValueCacheDisableFromHistory: S.optional(S.Boolean),
    distinctValueCacheDisableFromHistory: S.optional(S.Boolean),
    replicationInterval: S.optional(Duration),
    catalogSyncInterval: S.optional(Duration),
  }),
).annotate({
  identifier: "InfluxDBv3EnterpriseParameters",
}) as any as S.Schema<InfluxDBv3EnterpriseParameters>;
export type Parameters =
  | {
      InfluxDBv2: InfluxDBv2Parameters;
      InfluxDBv3Core?: never;
      InfluxDBv3Enterprise?: never;
    }
  | {
      InfluxDBv2?: never;
      InfluxDBv3Core: InfluxDBv3CoreParameters;
      InfluxDBv3Enterprise?: never;
    }
  | {
      InfluxDBv2?: never;
      InfluxDBv3Core?: never;
      InfluxDBv3Enterprise: InfluxDBv3EnterpriseParameters;
    };
export const Parameters = /*@__PURE__*/ S.Union([
  S.Struct({ InfluxDBv2: InfluxDBv2Parameters }),
  S.Struct({ InfluxDBv3Core: InfluxDBv3CoreParameters }),
  S.Struct({ InfluxDBv3Enterprise: InfluxDBv3EnterpriseParameters }),
]);
export interface CreateDbParameterGroupInput {
  name: string;
  description?: string;
  parameters?: Parameters;
  tags?: { [key: string]: string | undefined };
}
export const CreateDbParameterGroupInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    parameters: S.optional(Parameters),
    tags: S.optional(RequestTagMap),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateDbParameterGroupInput",
}) as any as S.Schema<CreateDbParameterGroupInput>;
export interface CreateDbParameterGroupOutput {
  id: string;
  name: string;
  arn: string;
  description?: string;
  parameters?: Parameters;
}
export const CreateDbParameterGroupOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    name: S.String,
    arn: S.String,
    description: S.optional(S.String),
    parameters: S.optional(Parameters),
  }),
).annotate({
  identifier: "CreateDbParameterGroupOutput",
}) as any as S.Schema<CreateDbParameterGroupOutput>;
export interface DeleteDbBackupInput {
  identifier: string;
}
export const DeleteDbBackupInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ identifier: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteDbBackupInput",
}) as any as S.Schema<DeleteDbBackupInput>;
export interface DeleteDbBackupOutput {
  id: string;
  name?: string;
  arn: string;
  status?: DbBackupStatus;
  createdAt?: Date;
  expiresAfter?: string;
  dbResourceId?: string;
  type?: DbBackupType;
  engineType?: EngineType;
  deploymentType?: ResourceDeploymentType;
  kmsKeyId?: string;
  clusterConfiguration?: ClusterConfiguration;
  dbParameterGroupId?: string;
  dbInstanceType?: DbInstanceType;
  logDeliveryConfiguration?: LogDeliveryConfiguration;
  failoverMode?: FailoverMode;
  dbStorageType?: DbStorageType;
  allocatedStorage?: number;
  vpcSubnetIds?: string[];
  vpcSecurityGroupIds?: string[];
  publiclyAccessible?: boolean;
  port?: number;
  networkType?: NetworkType;
  influxAuthParametersSecretArn?: string;
  maintenanceSchedule?: MaintenanceSchedule;
}
export const DeleteDbBackupOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    name: S.optional(S.String),
    arn: S.String,
    status: S.optional(DbBackupStatus),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    expiresAfter: S.optional(S.String),
    dbResourceId: S.optional(S.String),
    type: S.optional(DbBackupType),
    engineType: S.optional(EngineType),
    deploymentType: S.optional(ResourceDeploymentType),
    kmsKeyId: S.optional(S.String),
    clusterConfiguration: S.optional(ClusterConfiguration),
    dbParameterGroupId: S.optional(S.String),
    dbInstanceType: S.optional(DbInstanceType),
    logDeliveryConfiguration: S.optional(LogDeliveryConfiguration),
    failoverMode: S.optional(FailoverMode),
    dbStorageType: S.optional(DbStorageType),
    allocatedStorage: S.optional(S.Number),
    vpcSubnetIds: S.optional(VpcSubnetIdList),
    vpcSecurityGroupIds: S.optional(VpcSecurityGroupIdList),
    publiclyAccessible: S.optional(S.Boolean),
    port: S.optional(S.Number),
    networkType: S.optional(NetworkType),
    influxAuthParametersSecretArn: S.optional(S.String),
    maintenanceSchedule: S.optional(MaintenanceSchedule),
  }),
).annotate({
  identifier: "DeleteDbBackupOutput",
}) as any as S.Schema<DeleteDbBackupOutput>;
export interface DeleteDbClusterInput {
  dbClusterId: string;
  retainAutomatedBackups?: boolean;
}
export const DeleteDbClusterInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dbClusterId: S.String,
    retainAutomatedBackups: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteDbClusterInput",
}) as any as S.Schema<DeleteDbClusterInput>;
export interface DeleteDbClusterOutput {
  dbClusterStatus?: ClusterStatus;
}
export const DeleteDbClusterOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ dbClusterStatus: S.optional(ClusterStatus) }),
).annotate({
  identifier: "DeleteDbClusterOutput",
}) as any as S.Schema<DeleteDbClusterOutput>;
export type DbInstanceIdentifier = string;
export interface DeleteDbInstanceInput {
  identifier: string;
  retainAutomatedBackups?: boolean;
}
export const DeleteDbInstanceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    identifier: S.String,
    retainAutomatedBackups: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteDbInstanceInput",
}) as any as S.Schema<DeleteDbInstanceInput>;
export interface DeleteDbInstanceOutput {
  id: string;
  name: string;
  arn: string;
  status?: Status;
  endpoint?: string;
  port?: number;
  networkType?: NetworkType;
  dbInstanceType?: DbInstanceType;
  dbStorageType?: DbStorageType;
  allocatedStorage?: number;
  deploymentType?: DeploymentType;
  vpcSubnetIds: string[];
  publiclyAccessible?: boolean;
  vpcSecurityGroupIds?: string[];
  dbParameterGroupIdentifier?: string;
  availabilityZone?: string;
  secondaryAvailabilityZone?: string;
  logDeliveryConfiguration?: LogDeliveryConfiguration;
  influxAuthParametersSecretArn?: string;
  dbClusterId?: string;
  instanceMode?: InstanceMode;
  instanceModes?: InstanceMode[];
  maintenanceSchedule?: MaintenanceSchedule;
  lastMaintenanceTime?: Date;
  nextMaintenanceTime?: Date;
  dbBackupConfigurations?: DbBackupConfigurationOutput[];
  kmsKeyId?: string;
}
export const DeleteDbInstanceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    name: S.String,
    arn: S.String,
    status: S.optional(Status),
    endpoint: S.optional(S.String),
    port: S.optional(S.Number),
    networkType: S.optional(NetworkType),
    dbInstanceType: S.optional(DbInstanceType),
    dbStorageType: S.optional(DbStorageType),
    allocatedStorage: S.optional(S.Number),
    deploymentType: S.optional(DeploymentType),
    vpcSubnetIds: VpcSubnetIdList,
    publiclyAccessible: S.optional(S.Boolean),
    vpcSecurityGroupIds: S.optional(VpcSecurityGroupIdList),
    dbParameterGroupIdentifier: S.optional(S.String),
    availabilityZone: S.optional(S.String),
    secondaryAvailabilityZone: S.optional(S.String),
    logDeliveryConfiguration: S.optional(LogDeliveryConfiguration),
    influxAuthParametersSecretArn: S.optional(S.String),
    dbClusterId: S.optional(S.String),
    instanceMode: S.optional(InstanceMode),
    instanceModes: S.optional(InstanceModeList),
    maintenanceSchedule: S.optional(MaintenanceSchedule),
    lastMaintenanceTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    nextMaintenanceTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    dbBackupConfigurations: S.optional(DbBackupConfigurationOutputList),
    kmsKeyId: S.optional(S.String),
  }),
).annotate({
  identifier: "DeleteDbInstanceOutput",
}) as any as S.Schema<DeleteDbInstanceOutput>;
export interface GetDbBackupInput {
  identifier: string;
}
export const GetDbBackupInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ identifier: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetDbBackupInput",
}) as any as S.Schema<GetDbBackupInput>;
export interface GetDbBackupOutput {
  id: string;
  name?: string;
  arn: string;
  status?: DbBackupStatus;
  createdAt?: Date;
  expiresAfter?: string;
  dbResourceId?: string;
  type?: DbBackupType;
  engineType?: EngineType;
  deploymentType?: ResourceDeploymentType;
  kmsKeyId?: string;
  clusterConfiguration?: ClusterConfiguration;
  dbParameterGroupId?: string;
  dbInstanceType?: DbInstanceType;
  logDeliveryConfiguration?: LogDeliveryConfiguration;
  failoverMode?: FailoverMode;
  dbStorageType?: DbStorageType;
  allocatedStorage?: number;
  vpcSubnetIds?: string[];
  vpcSecurityGroupIds?: string[];
  publiclyAccessible?: boolean;
  port?: number;
  networkType?: NetworkType;
  influxAuthParametersSecretArn?: string;
  maintenanceSchedule?: MaintenanceSchedule;
}
export const GetDbBackupOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    name: S.optional(S.String),
    arn: S.String,
    status: S.optional(DbBackupStatus),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    expiresAfter: S.optional(S.String),
    dbResourceId: S.optional(S.String),
    type: S.optional(DbBackupType),
    engineType: S.optional(EngineType),
    deploymentType: S.optional(ResourceDeploymentType),
    kmsKeyId: S.optional(S.String),
    clusterConfiguration: S.optional(ClusterConfiguration),
    dbParameterGroupId: S.optional(S.String),
    dbInstanceType: S.optional(DbInstanceType),
    logDeliveryConfiguration: S.optional(LogDeliveryConfiguration),
    failoverMode: S.optional(FailoverMode),
    dbStorageType: S.optional(DbStorageType),
    allocatedStorage: S.optional(S.Number),
    vpcSubnetIds: S.optional(VpcSubnetIdList),
    vpcSecurityGroupIds: S.optional(VpcSecurityGroupIdList),
    publiclyAccessible: S.optional(S.Boolean),
    port: S.optional(S.Number),
    networkType: S.optional(NetworkType),
    influxAuthParametersSecretArn: S.optional(S.String),
    maintenanceSchedule: S.optional(MaintenanceSchedule),
  }),
).annotate({
  identifier: "GetDbBackupOutput",
}) as any as S.Schema<GetDbBackupOutput>;
export interface GetDbClusterInput {
  dbClusterId: string;
}
export const GetDbClusterInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ dbClusterId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetDbClusterInput",
}) as any as S.Schema<GetDbClusterInput>;
export interface GetDbClusterOutput {
  id: string;
  name: string;
  arn: string;
  status?: ClusterStatus;
  endpoint?: string;
  readerEndpoint?: string;
  port?: number;
  deploymentType?: ClusterDeploymentType;
  dbInstanceType?: DbInstanceType;
  networkType?: NetworkType;
  dbStorageType?: DbStorageType;
  allocatedStorage?: number;
  engineType?: EngineType;
  publiclyAccessible?: boolean;
  dbParameterGroupIdentifier?: string;
  effectiveDbParameterGroupIdentifier?: string;
  logDeliveryConfiguration?: LogDeliveryConfiguration;
  maintenanceSchedule?: MaintenanceSchedule;
  lastMaintenanceTime?: Date;
  nextMaintenanceTime?: Date;
  influxAuthParametersSecretArn?: string;
  vpcSubnetIds?: string[];
  vpcSecurityGroupIds?: string[];
  failoverMode?: FailoverMode;
  clusterConfiguration?: ClusterConfiguration;
  dbBackupConfigurations?: DbBackupConfigurationOutput[];
  kmsKeyId?: string;
}
export const GetDbClusterOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    name: S.String,
    arn: S.String,
    status: S.optional(ClusterStatus),
    endpoint: S.optional(S.String),
    readerEndpoint: S.optional(S.String),
    port: S.optional(S.Number),
    deploymentType: S.optional(ClusterDeploymentType),
    dbInstanceType: S.optional(DbInstanceType),
    networkType: S.optional(NetworkType),
    dbStorageType: S.optional(DbStorageType),
    allocatedStorage: S.optional(S.Number),
    engineType: S.optional(EngineType),
    publiclyAccessible: S.optional(S.Boolean),
    dbParameterGroupIdentifier: S.optional(S.String),
    effectiveDbParameterGroupIdentifier: S.optional(S.String),
    logDeliveryConfiguration: S.optional(LogDeliveryConfiguration),
    maintenanceSchedule: S.optional(MaintenanceSchedule),
    lastMaintenanceTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    nextMaintenanceTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    influxAuthParametersSecretArn: S.optional(S.String),
    vpcSubnetIds: S.optional(VpcSubnetIdList),
    vpcSecurityGroupIds: S.optional(VpcSecurityGroupIdList),
    failoverMode: S.optional(FailoverMode),
    clusterConfiguration: S.optional(ClusterConfiguration),
    dbBackupConfigurations: S.optional(DbBackupConfigurationOutputList),
    kmsKeyId: S.optional(S.String),
  }),
).annotate({
  identifier: "GetDbClusterOutput",
}) as any as S.Schema<GetDbClusterOutput>;
export interface GetDbInstanceInput {
  identifier: string;
}
export const GetDbInstanceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ identifier: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetDbInstanceInput",
}) as any as S.Schema<GetDbInstanceInput>;
export interface GetDbInstanceOutput {
  id: string;
  name: string;
  arn: string;
  status?: Status;
  endpoint?: string;
  port?: number;
  networkType?: NetworkType;
  dbInstanceType?: DbInstanceType;
  dbStorageType?: DbStorageType;
  allocatedStorage?: number;
  deploymentType?: DeploymentType;
  vpcSubnetIds: string[];
  publiclyAccessible?: boolean;
  vpcSecurityGroupIds?: string[];
  dbParameterGroupIdentifier?: string;
  availabilityZone?: string;
  secondaryAvailabilityZone?: string;
  logDeliveryConfiguration?: LogDeliveryConfiguration;
  influxAuthParametersSecretArn?: string;
  dbClusterId?: string;
  instanceMode?: InstanceMode;
  instanceModes?: InstanceMode[];
  maintenanceSchedule?: MaintenanceSchedule;
  lastMaintenanceTime?: Date;
  nextMaintenanceTime?: Date;
  dbBackupConfigurations?: DbBackupConfigurationOutput[];
  kmsKeyId?: string;
}
export const GetDbInstanceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    name: S.String,
    arn: S.String,
    status: S.optional(Status),
    endpoint: S.optional(S.String),
    port: S.optional(S.Number),
    networkType: S.optional(NetworkType),
    dbInstanceType: S.optional(DbInstanceType),
    dbStorageType: S.optional(DbStorageType),
    allocatedStorage: S.optional(S.Number),
    deploymentType: S.optional(DeploymentType),
    vpcSubnetIds: VpcSubnetIdList,
    publiclyAccessible: S.optional(S.Boolean),
    vpcSecurityGroupIds: S.optional(VpcSecurityGroupIdList),
    dbParameterGroupIdentifier: S.optional(S.String),
    availabilityZone: S.optional(S.String),
    secondaryAvailabilityZone: S.optional(S.String),
    logDeliveryConfiguration: S.optional(LogDeliveryConfiguration),
    influxAuthParametersSecretArn: S.optional(S.String),
    dbClusterId: S.optional(S.String),
    instanceMode: S.optional(InstanceMode),
    instanceModes: S.optional(InstanceModeList),
    maintenanceSchedule: S.optional(MaintenanceSchedule),
    lastMaintenanceTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    nextMaintenanceTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    dbBackupConfigurations: S.optional(DbBackupConfigurationOutputList),
    kmsKeyId: S.optional(S.String),
  }),
).annotate({
  identifier: "GetDbInstanceOutput",
}) as any as S.Schema<GetDbInstanceOutput>;
export interface GetDbParameterGroupInput {
  identifier: string;
}
export const GetDbParameterGroupInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ identifier: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetDbParameterGroupInput",
}) as any as S.Schema<GetDbParameterGroupInput>;
export interface GetDbParameterGroupOutput {
  id: string;
  name: string;
  arn: string;
  description?: string;
  parameters?: Parameters;
}
export const GetDbParameterGroupOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    name: S.String,
    arn: S.String,
    description: S.optional(S.String),
    parameters: S.optional(Parameters),
  }),
).annotate({
  identifier: "GetDbParameterGroupOutput",
}) as any as S.Schema<GetDbParameterGroupOutput>;
export type NextToken = string;
export type MaxResults = number;
export interface ListDbBackupsInput {
  dbResourceId?: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListDbBackupsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dbResourceId: S.optional(S.String),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListDbBackupsInput",
}) as any as S.Schema<ListDbBackupsInput>;
export interface DbBackupSummary {
  id: string;
  name?: string;
  arn: string;
  status?: DbBackupStatus;
  createdAt?: Date;
  expiresAfter?: string;
  dbResourceId?: string;
  type?: DbBackupType;
  engineType?: EngineType;
  deploymentType?: ResourceDeploymentType;
  kmsKeyId?: string;
}
export const DbBackupSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    name: S.optional(S.String),
    arn: S.String,
    status: S.optional(DbBackupStatus),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    expiresAfter: S.optional(S.String),
    dbResourceId: S.optional(S.String),
    type: S.optional(DbBackupType),
    engineType: S.optional(EngineType),
    deploymentType: S.optional(ResourceDeploymentType),
    kmsKeyId: S.optional(S.String),
  }),
).annotate({
  identifier: "DbBackupSummary",
}) as any as S.Schema<DbBackupSummary>;
export type DbBackupSummaryList = DbBackupSummary[];
export const DbBackupSummaryList = /*@__PURE__*/ S.Array(DbBackupSummary);
export interface ListDbBackupsOutput {
  items: DbBackupSummary[];
  nextToken?: string;
}
export const ListDbBackupsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ items: DbBackupSummaryList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListDbBackupsOutput",
}) as any as S.Schema<ListDbBackupsOutput>;
export interface ListDbClustersInput {
  nextToken?: string;
  maxResults?: number;
}
export const ListDbClustersInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListDbClustersInput",
}) as any as S.Schema<ListDbClustersInput>;
export interface DbClusterSummary {
  id: string;
  name: string;
  arn: string;
  status?: ClusterStatus;
  endpoint?: string;
  readerEndpoint?: string;
  port?: number;
  deploymentType?: ClusterDeploymentType;
  dbInstanceType?: DbInstanceType;
  networkType?: NetworkType;
  dbStorageType?: DbStorageType;
  allocatedStorage?: number;
  engineType?: EngineType;
}
export const DbClusterSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    name: S.String,
    arn: S.String,
    status: S.optional(ClusterStatus),
    endpoint: S.optional(S.String),
    readerEndpoint: S.optional(S.String),
    port: S.optional(S.Number),
    deploymentType: S.optional(ClusterDeploymentType),
    dbInstanceType: S.optional(DbInstanceType),
    networkType: S.optional(NetworkType),
    dbStorageType: S.optional(DbStorageType),
    allocatedStorage: S.optional(S.Number),
    engineType: S.optional(EngineType),
  }),
).annotate({
  identifier: "DbClusterSummary",
}) as any as S.Schema<DbClusterSummary>;
export type DbClusterSummaryList = DbClusterSummary[];
export const DbClusterSummaryList = /*@__PURE__*/ S.Array(DbClusterSummary);
export interface ListDbClustersOutput {
  items: DbClusterSummary[];
  nextToken?: string;
}
export const ListDbClustersOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ items: DbClusterSummaryList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListDbClustersOutput",
}) as any as S.Schema<ListDbClustersOutput>;
export interface ListDbInstancesInput {
  nextToken?: string;
  maxResults?: number;
}
export const ListDbInstancesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListDbInstancesInput",
}) as any as S.Schema<ListDbInstancesInput>;
export interface DbInstanceSummary {
  id: string;
  name: string;
  arn: string;
  status?: Status;
  endpoint?: string;
  port?: number;
  networkType?: NetworkType;
  dbInstanceType?: DbInstanceType;
  dbStorageType?: DbStorageType;
  allocatedStorage?: number;
  deploymentType?: DeploymentType;
}
export const DbInstanceSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    name: S.String,
    arn: S.String,
    status: S.optional(Status),
    endpoint: S.optional(S.String),
    port: S.optional(S.Number),
    networkType: S.optional(NetworkType),
    dbInstanceType: S.optional(DbInstanceType),
    dbStorageType: S.optional(DbStorageType),
    allocatedStorage: S.optional(S.Number),
    deploymentType: S.optional(DeploymentType),
  }),
).annotate({
  identifier: "DbInstanceSummary",
}) as any as S.Schema<DbInstanceSummary>;
export type DbInstanceSummaryList = DbInstanceSummary[];
export const DbInstanceSummaryList = /*@__PURE__*/ S.Array(DbInstanceSummary);
export interface ListDbInstancesOutput {
  items: DbInstanceSummary[];
  nextToken?: string;
}
export const ListDbInstancesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ items: DbInstanceSummaryList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListDbInstancesOutput",
}) as any as S.Schema<ListDbInstancesOutput>;
export interface ListDbInstancesForClusterInput {
  dbClusterId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListDbInstancesForClusterInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dbClusterId: S.String,
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListDbInstancesForClusterInput",
}) as any as S.Schema<ListDbInstancesForClusterInput>;
export interface DbInstanceForClusterSummary {
  id: string;
  name: string;
  arn: string;
  status?: Status;
  endpoint?: string;
  port?: number;
  networkType?: NetworkType;
  dbInstanceType?: DbInstanceType;
  dbStorageType?: DbStorageType;
  allocatedStorage?: number;
  deploymentType?: DeploymentType;
  instanceMode?: InstanceMode;
  instanceModes?: InstanceMode[];
}
export const DbInstanceForClusterSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    name: S.String,
    arn: S.String,
    status: S.optional(Status),
    endpoint: S.optional(S.String),
    port: S.optional(S.Number),
    networkType: S.optional(NetworkType),
    dbInstanceType: S.optional(DbInstanceType),
    dbStorageType: S.optional(DbStorageType),
    allocatedStorage: S.optional(S.Number),
    deploymentType: S.optional(DeploymentType),
    instanceMode: S.optional(InstanceMode),
    instanceModes: S.optional(InstanceModeList),
  }),
).annotate({
  identifier: "DbInstanceForClusterSummary",
}) as any as S.Schema<DbInstanceForClusterSummary>;
export type DbInstanceForClusterSummaryList = DbInstanceForClusterSummary[];
export const DbInstanceForClusterSummaryList = /*@__PURE__*/ S.Array(
  DbInstanceForClusterSummary,
);
export interface ListDbInstancesForClusterOutput {
  items: DbInstanceForClusterSummary[];
  nextToken?: string;
}
export const ListDbInstancesForClusterOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: DbInstanceForClusterSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDbInstancesForClusterOutput",
}) as any as S.Schema<ListDbInstancesForClusterOutput>;
export interface ListDbParameterGroupsInput {
  nextToken?: string;
  maxResults?: number;
}
export const ListDbParameterGroupsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListDbParameterGroupsInput",
}) as any as S.Schema<ListDbParameterGroupsInput>;
export interface DbParameterGroupSummary {
  id: string;
  name: string;
  arn: string;
  description?: string;
}
export const DbParameterGroupSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    name: S.String,
    arn: S.String,
    description: S.optional(S.String),
  }),
).annotate({
  identifier: "DbParameterGroupSummary",
}) as any as S.Schema<DbParameterGroupSummary>;
export type DbParameterGroupSummaryList = DbParameterGroupSummary[];
export const DbParameterGroupSummaryList = /*@__PURE__*/ S.Array(
  DbParameterGroupSummary,
);
export interface ListDbParameterGroupsOutput {
  items: DbParameterGroupSummary[];
  nextToken?: string;
}
export const ListDbParameterGroupsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: DbParameterGroupSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDbParameterGroupsOutput",
}) as any as S.Schema<ListDbParameterGroupsOutput>;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export type ResponseTagMap = { [key: string]: string | undefined };
export const ResponseTagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: S.optional(ResponseTagMap) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export type DbInstanceIdList = string[];
export const DbInstanceIdList = /*@__PURE__*/ S.Array(S.String);
export interface RebootDbClusterInput {
  dbClusterId: string;
  instanceIds?: string[];
}
export const RebootDbClusterInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dbClusterId: S.String,
    instanceIds: S.optional(DbInstanceIdList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "RebootDbClusterInput",
}) as any as S.Schema<RebootDbClusterInput>;
export interface RebootDbClusterOutput {
  dbClusterStatus?: ClusterStatus;
}
export const RebootDbClusterOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ dbClusterStatus: S.optional(ClusterStatus) }),
).annotate({
  identifier: "RebootDbClusterOutput",
}) as any as S.Schema<RebootDbClusterOutput>;
export interface RebootDbInstanceInput {
  identifier: string;
}
export const RebootDbInstanceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ identifier: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "RebootDbInstanceInput",
}) as any as S.Schema<RebootDbInstanceInput>;
export interface RebootDbInstanceOutput {
  id: string;
  name: string;
  arn: string;
  status?: Status;
  endpoint?: string;
  port?: number;
  networkType?: NetworkType;
  dbInstanceType?: DbInstanceType;
  dbStorageType?: DbStorageType;
  allocatedStorage?: number;
  deploymentType?: DeploymentType;
  vpcSubnetIds: string[];
  publiclyAccessible?: boolean;
  vpcSecurityGroupIds?: string[];
  dbParameterGroupIdentifier?: string;
  availabilityZone?: string;
  secondaryAvailabilityZone?: string;
  logDeliveryConfiguration?: LogDeliveryConfiguration;
  influxAuthParametersSecretArn?: string;
  dbClusterId?: string;
  instanceMode?: InstanceMode;
  instanceModes?: InstanceMode[];
  maintenanceSchedule?: MaintenanceSchedule;
  lastMaintenanceTime?: Date;
  nextMaintenanceTime?: Date;
  dbBackupConfigurations?: DbBackupConfigurationOutput[];
  kmsKeyId?: string;
}
export const RebootDbInstanceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    name: S.String,
    arn: S.String,
    status: S.optional(Status),
    endpoint: S.optional(S.String),
    port: S.optional(S.Number),
    networkType: S.optional(NetworkType),
    dbInstanceType: S.optional(DbInstanceType),
    dbStorageType: S.optional(DbStorageType),
    allocatedStorage: S.optional(S.Number),
    deploymentType: S.optional(DeploymentType),
    vpcSubnetIds: VpcSubnetIdList,
    publiclyAccessible: S.optional(S.Boolean),
    vpcSecurityGroupIds: S.optional(VpcSecurityGroupIdList),
    dbParameterGroupIdentifier: S.optional(S.String),
    availabilityZone: S.optional(S.String),
    secondaryAvailabilityZone: S.optional(S.String),
    logDeliveryConfiguration: S.optional(LogDeliveryConfiguration),
    influxAuthParametersSecretArn: S.optional(S.String),
    dbClusterId: S.optional(S.String),
    instanceMode: S.optional(InstanceMode),
    instanceModes: S.optional(InstanceModeList),
    maintenanceSchedule: S.optional(MaintenanceSchedule),
    lastMaintenanceTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    nextMaintenanceTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    dbBackupConfigurations: S.optional(DbBackupConfigurationOutputList),
    kmsKeyId: S.optional(S.String),
  }),
).annotate({
  identifier: "RebootDbInstanceOutput",
}) as any as S.Schema<RebootDbInstanceOutput>;
export type DbResourceName = string;
export type RestoreMode = "NEW_RESOURCE" | "REPLACE_EXISTING" | (string & {});
export const RestoreMode = S.String;

export interface RestoreFromDbBackupInput {
  name: string;
  dbBackupId: string;
  restoreToTime?: Date;
  restoreMode?: RestoreMode;
  vpcSubnetIds?: string[];
  vpcSecurityGroupIds?: string[];
  publiclyAccessible?: boolean;
  logDeliveryConfiguration?: LogDeliveryConfiguration;
  maintenanceSchedule?: MaintenanceSchedule;
  tags?: { [key: string]: string | undefined };
  port?: number;
  networkType?: NetworkType;
  deploymentType?: ResourceDeploymentType;
  dbBackupConfigurations?: DbBackupConfiguration[];
  kmsKeyId?: string;
}
export const RestoreFromDbBackupInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    dbBackupId: S.String,
    restoreToTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    restoreMode: S.optional(RestoreMode),
    vpcSubnetIds: S.optional(VpcSubnetIdList),
    vpcSecurityGroupIds: S.optional(VpcSecurityGroupIdList),
    publiclyAccessible: S.optional(S.Boolean),
    logDeliveryConfiguration: S.optional(LogDeliveryConfiguration),
    maintenanceSchedule: S.optional(MaintenanceSchedule),
    tags: S.optional(RequestTagMap),
    port: S.optional(S.Number),
    networkType: S.optional(NetworkType),
    deploymentType: S.optional(ResourceDeploymentType),
    dbBackupConfigurations: S.optional(DbBackupConfigurationInputList),
    kmsKeyId: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "RestoreFromDbBackupInput",
}) as any as S.Schema<RestoreFromDbBackupInput>;
export type RestoreStatus = "RESTORING" | (string & {});
export const RestoreStatus = S.String;

export type ResourceType = "DB_INSTANCE" | "DB_CLUSTER" | (string & {});
export const ResourceType = S.String;

export interface RestoreFromDbBackupOutput {
  restoredDbResourceId?: string;
  restoreStatus?: RestoreStatus;
  resourceType?: ResourceType;
  engineType?: EngineType;
  deploymentType?: ResourceDeploymentType;
}
export const RestoreFromDbBackupOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    restoredDbResourceId: S.optional(S.String),
    restoreStatus: S.optional(RestoreStatus),
    resourceType: S.optional(ResourceType),
    engineType: S.optional(EngineType),
    deploymentType: S.optional(ResourceDeploymentType),
  }),
).annotate({
  identifier: "RestoreFromDbBackupOutput",
}) as any as S.Schema<RestoreFromDbBackupOutput>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String, tags: RequestTagMap }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
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
    tagKeys: TagKeys,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
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
export interface UpdateDbClusterInput {
  dbClusterId: string;
  logDeliveryConfiguration?: LogDeliveryConfiguration;
  dbParameterGroupIdentifier?: string;
  port?: number;
  dbInstanceType?: DbInstanceType;
  failoverMode?: FailoverMode;
  maintenanceSchedule?: MaintenanceSchedule;
  dbBackupConfigurations?: DbBackupConfiguration[];
}
export const UpdateDbClusterInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dbClusterId: S.String,
    logDeliveryConfiguration: S.optional(LogDeliveryConfiguration),
    dbParameterGroupIdentifier: S.optional(S.String),
    port: S.optional(S.Number),
    dbInstanceType: S.optional(DbInstanceType),
    failoverMode: S.optional(FailoverMode),
    maintenanceSchedule: S.optional(MaintenanceSchedule),
    dbBackupConfigurations: S.optional(DbBackupConfigurationInputList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateDbClusterInput",
}) as any as S.Schema<UpdateDbClusterInput>;
export interface UpdateDbClusterOutput {
  dbClusterStatus?: ClusterStatus;
}
export const UpdateDbClusterOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ dbClusterStatus: S.optional(ClusterStatus) }),
).annotate({
  identifier: "UpdateDbClusterOutput",
}) as any as S.Schema<UpdateDbClusterOutput>;
export interface UpdateDbInstanceInput {
  identifier: string;
  logDeliveryConfiguration?: LogDeliveryConfiguration;
  dbParameterGroupIdentifier?: string;
  port?: number;
  dbInstanceType?: DbInstanceType;
  deploymentType?: DeploymentType;
  dbStorageType?: DbStorageType;
  allocatedStorage?: number;
  maintenanceSchedule?: MaintenanceSchedule;
  dbBackupConfigurations?: DbBackupConfiguration[];
}
export const UpdateDbInstanceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    identifier: S.String,
    logDeliveryConfiguration: S.optional(LogDeliveryConfiguration),
    dbParameterGroupIdentifier: S.optional(S.String),
    port: S.optional(S.Number),
    dbInstanceType: S.optional(DbInstanceType),
    deploymentType: S.optional(DeploymentType),
    dbStorageType: S.optional(DbStorageType),
    allocatedStorage: S.optional(S.Number),
    maintenanceSchedule: S.optional(MaintenanceSchedule),
    dbBackupConfigurations: S.optional(DbBackupConfigurationInputList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateDbInstanceInput",
}) as any as S.Schema<UpdateDbInstanceInput>;
export interface UpdateDbInstanceOutput {
  id: string;
  name: string;
  arn: string;
  status?: Status;
  endpoint?: string;
  port?: number;
  networkType?: NetworkType;
  dbInstanceType?: DbInstanceType;
  dbStorageType?: DbStorageType;
  allocatedStorage?: number;
  deploymentType?: DeploymentType;
  vpcSubnetIds: string[];
  publiclyAccessible?: boolean;
  vpcSecurityGroupIds?: string[];
  dbParameterGroupIdentifier?: string;
  availabilityZone?: string;
  secondaryAvailabilityZone?: string;
  logDeliveryConfiguration?: LogDeliveryConfiguration;
  influxAuthParametersSecretArn?: string;
  dbClusterId?: string;
  instanceMode?: InstanceMode;
  instanceModes?: InstanceMode[];
  maintenanceSchedule?: MaintenanceSchedule;
  lastMaintenanceTime?: Date;
  nextMaintenanceTime?: Date;
  dbBackupConfigurations?: DbBackupConfigurationOutput[];
  kmsKeyId?: string;
}
export const UpdateDbInstanceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    name: S.String,
    arn: S.String,
    status: S.optional(Status),
    endpoint: S.optional(S.String),
    port: S.optional(S.Number),
    networkType: S.optional(NetworkType),
    dbInstanceType: S.optional(DbInstanceType),
    dbStorageType: S.optional(DbStorageType),
    allocatedStorage: S.optional(S.Number),
    deploymentType: S.optional(DeploymentType),
    vpcSubnetIds: VpcSubnetIdList,
    publiclyAccessible: S.optional(S.Boolean),
    vpcSecurityGroupIds: S.optional(VpcSecurityGroupIdList),
    dbParameterGroupIdentifier: S.optional(S.String),
    availabilityZone: S.optional(S.String),
    secondaryAvailabilityZone: S.optional(S.String),
    logDeliveryConfiguration: S.optional(LogDeliveryConfiguration),
    influxAuthParametersSecretArn: S.optional(S.String),
    dbClusterId: S.optional(S.String),
    instanceMode: S.optional(InstanceMode),
    instanceModes: S.optional(InstanceModeList),
    maintenanceSchedule: S.optional(MaintenanceSchedule),
    lastMaintenanceTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    nextMaintenanceTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    dbBackupConfigurations: S.optional(DbBackupConfigurationOutputList),
    kmsKeyId: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateDbInstanceOutput",
}) as any as S.Schema<UpdateDbInstanceOutput>;
export type ValidationExceptionReason =
  | "FIELD_VALIDATION_FAILED"
  | "OTHER"
  | (string & {});
export const ValidationExceptionReason = S.String;

export type CreateDbBackupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new on-demand backup of a Timestream for InfluxDB resource.
 */
export const createDbBackup: API.OperationMethod<
  CreateDbBackupInput,
  CreateDbBackupOutput,
  CreateDbBackupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDbBackupInput,
  output: CreateDbBackupOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDbBackup",
}));

export type CreateDbClusterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new Timestream for InfluxDB cluster.
 */
export const createDbCluster: API.OperationMethod<
  CreateDbClusterInput,
  CreateDbClusterOutput,
  CreateDbClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDbClusterInput,
  output: CreateDbClusterOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDbCluster",
}));

export type CreateDbInstanceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new Timestream for InfluxDB DB instance.
 */
export const createDbInstance: API.OperationMethod<
  CreateDbInstanceInput,
  CreateDbInstanceOutput,
  CreateDbInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDbInstanceInput,
  output: CreateDbInstanceOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDbInstance",
}));

export type CreateDbParameterGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new Timestream for InfluxDB DB parameter group to associate with DB instances.
 */
export const createDbParameterGroup: API.OperationMethod<
  CreateDbParameterGroupInput,
  CreateDbParameterGroupOutput,
  CreateDbParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDbParameterGroupInput,
  output: CreateDbParameterGroupOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDbParameterGroup",
}));

export type DeleteDbBackupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a Timestream for InfluxDB backup.
 */
export const deleteDbBackup: API.OperationMethod<
  DeleteDbBackupInput,
  DeleteDbBackupOutput,
  DeleteDbBackupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDbBackupInput,
  output: DeleteDbBackupOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDbBackup",
}));

export type DeleteDbClusterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a Timestream for InfluxDB cluster.
 */
export const deleteDbCluster: API.OperationMethod<
  DeleteDbClusterInput,
  DeleteDbClusterOutput,
  DeleteDbClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDbClusterInput,
  output: DeleteDbClusterOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDbCluster",
}));

export type DeleteDbInstanceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a Timestream for InfluxDB DB instance.
 */
export const deleteDbInstance: API.OperationMethod<
  DeleteDbInstanceInput,
  DeleteDbInstanceOutput,
  DeleteDbInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDbInstanceInput,
  output: DeleteDbInstanceOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDbInstance",
}));

export type GetDbBackupError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a specific Timestream for InfluxDB backup.
 */
export const getDbBackup: API.OperationMethod<
  GetDbBackupInput,
  GetDbBackupOutput,
  GetDbBackupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDbBackupInput,
  output: GetDbBackupOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDbBackup",
}));

export type GetDbClusterError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a Timestream for InfluxDB cluster.
 */
export const getDbCluster: API.OperationMethod<
  GetDbClusterInput,
  GetDbClusterOutput,
  GetDbClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDbClusterInput,
  output: GetDbClusterOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDbCluster",
}));

export type GetDbInstanceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a Timestream for InfluxDB DB instance.
 */
export const getDbInstance: API.OperationMethod<
  GetDbInstanceInput,
  GetDbInstanceOutput,
  GetDbInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDbInstanceInput,
  output: GetDbInstanceOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDbInstance",
}));

export type GetDbParameterGroupError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a Timestream for InfluxDB DB parameter group.
 */
export const getDbParameterGroup: API.OperationMethod<
  GetDbParameterGroupInput,
  GetDbParameterGroupOutput,
  GetDbParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDbParameterGroupInput,
  output: GetDbParameterGroupOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDbParameterGroup",
}));

export type ListDbBackupsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of Timestream for InfluxDB backups.
 */
export const listDbBackups: API.PaginatedOperationMethod<
  ListDbBackupsInput,
  ListDbBackupsOutput,
  ListDbBackupsError,
  Credentials | HttpClient.HttpClient,
  DbBackupSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDbBackupsInput,
  output: ListDbBackupsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDbBackups",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDbClustersError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of Timestream for InfluxDB DB clusters.
 */
export const listDbClusters: API.PaginatedOperationMethod<
  ListDbClustersInput,
  ListDbClustersOutput,
  ListDbClustersError,
  Credentials | HttpClient.HttpClient,
  DbClusterSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDbClustersInput,
  output: ListDbClustersOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDbClusters",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDbInstancesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of Timestream for InfluxDB DB instances.
 */
export const listDbInstances: API.PaginatedOperationMethod<
  ListDbInstancesInput,
  ListDbInstancesOutput,
  ListDbInstancesError,
  Credentials | HttpClient.HttpClient,
  DbInstanceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDbInstancesInput,
  output: ListDbInstancesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDbInstances",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDbInstancesForClusterError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of Timestream for InfluxDB clusters.
 */
export const listDbInstancesForCluster: API.PaginatedOperationMethod<
  ListDbInstancesForClusterInput,
  ListDbInstancesForClusterOutput,
  ListDbInstancesForClusterError,
  Credentials | HttpClient.HttpClient,
  DbInstanceForClusterSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDbInstancesForClusterInput,
  output: ListDbInstancesForClusterOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDbInstancesForCluster",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDbParameterGroupsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of Timestream for InfluxDB DB parameter groups.
 */
export const listDbParameterGroups: API.PaginatedOperationMethod<
  ListDbParameterGroupsInput,
  ListDbParameterGroupsOutput,
  ListDbParameterGroupsError,
  Credentials | HttpClient.HttpClient,
  DbParameterGroupSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDbParameterGroupsInput,
  output: ListDbParameterGroupsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDbParameterGroups",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError = ResourceNotFoundException | CommonErrors;
/**
 * A list of tags applied to the resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type RebootDbClusterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Reboots a Timestream for InfluxDB cluster.
 */
export const rebootDbCluster: API.OperationMethod<
  RebootDbClusterInput,
  RebootDbClusterOutput,
  RebootDbClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RebootDbClusterInput,
  output: RebootDbClusterOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RebootDbCluster",
}));

export type RebootDbInstanceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Reboots a Timestream for InfluxDB instance.
 */
export const rebootDbInstance: API.OperationMethod<
  RebootDbInstanceInput,
  RebootDbInstanceOutput,
  RebootDbInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RebootDbInstanceInput,
  output: RebootDbInstanceOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RebootDbInstance",
}));

export type RestoreFromDbBackupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Restores a Timestream for InfluxDB resource from a backup. By default, a new resource is created. You can optionally restore to the same resource using the REPLACE_EXISTING restore mode.
 */
export const restoreFromDbBackup: API.OperationMethod<
  RestoreFromDbBackupInput,
  RestoreFromDbBackupOutput,
  RestoreFromDbBackupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RestoreFromDbBackupInput,
  output: RestoreFromDbBackupOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreFromDbBackup",
}));

export type TagResourceError =
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Tags are composed of a Key/Value pairs. You can use tags to categorize and track your Timestream for InfluxDB resources.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [ResourceNotFoundException, ServiceQuotaExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError = ResourceNotFoundException | CommonErrors;
/**
 * Removes the tag from the specified resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateDbClusterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a Timestream for InfluxDB cluster.
 */
export const updateDbCluster: API.OperationMethod<
  UpdateDbClusterInput,
  UpdateDbClusterOutput,
  UpdateDbClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDbClusterInput,
  output: UpdateDbClusterOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDbCluster",
}));

export type UpdateDbInstanceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a Timestream for InfluxDB DB instance.
 */
export const updateDbInstance: API.OperationMethod<
  UpdateDbInstanceInput,
  UpdateDbInstanceOutput,
  UpdateDbInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDbInstanceInput,
  output: UpdateDbInstanceOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDbInstance",
}));
