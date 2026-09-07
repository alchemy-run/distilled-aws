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
  sdkId: "EMR Serverless",
  serviceShapeName: "AwsToledoWebService",
});
const auth = T.AwsAuthSigv4({ name: "emr-serverless" });
const ver = T.ServiceVersion("2021-07-13");
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
              `https://emr-serverless-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://emr-serverless-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://emr-serverless.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://emr-serverless.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
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
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type ApplicationId = string;
export type JobRunId = string;
export type ShutdownGracePeriodInSeconds = number;
export interface CancelJobRunRequest {
  applicationId: string;
  jobRunId: string;
  shutdownGracePeriodInSeconds?: number;
}
export const CancelJobRunRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    jobRunId: S.String.pipe(T.HttpLabel("jobRunId")),
    shutdownGracePeriodInSeconds: S.optional(S.Number).pipe(
      T.HttpQuery("shutdownGracePeriodInSeconds"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/applications/{applicationId}/jobruns/{jobRunId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelJobRunRequest",
}) as any as S.Schema<CancelJobRunRequest>;
export interface CancelJobRunResponse {
  applicationId: string;
  jobRunId: string;
}
export const CancelJobRunResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ applicationId: S.String, jobRunId: S.String }),
).annotate({
  identifier: "CancelJobRunResponse",
}) as any as S.Schema<CancelJobRunResponse>;
export type ApplicationName = string;
export type ReleaseLabel = string;
export type EngineType = string;
export type ClientToken = string;
export type WorkerTypeString = string;
export type WorkerCounts = number;
export type CpuSize = string;
export type MemorySize = string;
export type DiskSize = string;
export type DiskType = string;
export interface WorkerResourceConfig {
  cpu: string;
  memory: string;
  disk?: string;
  diskType?: string;
}
export const WorkerResourceConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cpu: S.String,
    memory: S.String,
    disk: S.optional(S.String),
    diskType: S.optional(S.String),
  }),
).annotate({
  identifier: "WorkerResourceConfig",
}) as any as S.Schema<WorkerResourceConfig>;
export interface InitialCapacityConfig {
  workerCount: number;
  workerConfiguration?: WorkerResourceConfig;
}
export const InitialCapacityConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workerCount: S.Number,
    workerConfiguration: S.optional(WorkerResourceConfig),
  }),
).annotate({
  identifier: "InitialCapacityConfig",
}) as any as S.Schema<InitialCapacityConfig>;
export type InitialCapacityConfigMap = {
  [key: string]: InitialCapacityConfig | undefined;
};
export const InitialCapacityConfigMap = /*@__PURE__*/ S.Record(
  S.String,
  InitialCapacityConfig.pipe(S.optional),
);
export interface MaximumAllowedResources {
  cpu: string;
  memory: string;
  disk?: string;
}
export const MaximumAllowedResources = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ cpu: S.String, memory: S.String, disk: S.optional(S.String) }),
).annotate({
  identifier: "MaximumAllowedResources",
}) as any as S.Schema<MaximumAllowedResources>;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface AutoStartConfig {
  enabled?: boolean;
}
export const AutoStartConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ enabled: S.optional(S.Boolean) }),
).annotate({
  identifier: "AutoStartConfig",
}) as any as S.Schema<AutoStartConfig>;
export interface AutoStopConfig {
  enabled?: boolean;
  idleTimeoutMinutes?: number;
}
export const AutoStopConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    enabled: S.optional(S.Boolean),
    idleTimeoutMinutes: S.optional(S.Number),
  }),
).annotate({ identifier: "AutoStopConfig" }) as any as S.Schema<AutoStopConfig>;
export type SubnetString = string;
export type SubnetIds = string[];
export const SubnetIds = /*@__PURE__*/ S.Array(S.String);
export type SecurityGroupString = string;
export type SecurityGroupIds = string[];
export const SecurityGroupIds = /*@__PURE__*/ S.Array(S.String);
export interface NetworkConfiguration {
  subnetIds?: string[];
  securityGroupIds?: string[];
}
export const NetworkConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    subnetIds: S.optional(SubnetIds),
    securityGroupIds: S.optional(SecurityGroupIds),
  }),
).annotate({
  identifier: "NetworkConfiguration",
}) as any as S.Schema<NetworkConfiguration>;
export type Architecture = string;
export type ImageUri = string;
export interface ImageConfigurationInput {
  imageUri?: string;
  applicationLevelDigestResolution?: boolean;
}
export const ImageConfigurationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    imageUri: S.optional(S.String),
    applicationLevelDigestResolution: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ImageConfigurationInput",
}) as any as S.Schema<ImageConfigurationInput>;
export interface WorkerTypeSpecificationInput {
  imageConfiguration?: ImageConfigurationInput;
}
export const WorkerTypeSpecificationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ imageConfiguration: S.optional(ImageConfigurationInput) }),
).annotate({
  identifier: "WorkerTypeSpecificationInput",
}) as any as S.Schema<WorkerTypeSpecificationInput>;
export type WorkerTypeSpecificationInputMap = {
  [key: string]: WorkerTypeSpecificationInput | undefined;
};
export const WorkerTypeSpecificationInputMap = /*@__PURE__*/ S.Record(
  S.String,
  WorkerTypeSpecificationInput.pipe(S.optional),
);
export type String1024 = string;
export type ConfigurationPropertyKey = string;
export type ConfigurationPropertyValue = string;
export type SensitivePropertiesMap = { [key: string]: string | undefined };
export const SensitivePropertiesMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface Configuration {
  classification: string;
  properties?: { [key: string]: string | undefined };
  configurations?: Configuration[];
}
export const Configuration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    classification: S.String,
    properties: S.optional(SensitivePropertiesMap),
    configurations: S.optional(
      S.suspend(() => ConfigurationList).annotate({
        identifier: "ConfigurationList",
      }),
    ),
  }),
).annotate({ identifier: "Configuration" }) as any as S.Schema<Configuration>;
export type ConfigurationList = Configuration[];
export const ConfigurationList = /*@__PURE__*/ S.Array(
  S.suspend((): S.Schema<Configuration> => Configuration).annotate({
    identifier: "Configuration",
  }),
) as any as S.Schema<ConfigurationList>;
export type UriString = string;
export type EncryptionKeyArn = string;
export interface S3MonitoringConfiguration {
  logUri?: string;
  encryptionKeyArn?: string;
}
export const S3MonitoringConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    logUri: S.optional(S.String),
    encryptionKeyArn: S.optional(S.String),
  }),
).annotate({
  identifier: "S3MonitoringConfiguration",
}) as any as S.Schema<S3MonitoringConfiguration>;
export interface ManagedPersistenceMonitoringConfiguration {
  enabled?: boolean;
  encryptionKeyArn?: string;
}
export const ManagedPersistenceMonitoringConfiguration =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      enabled: S.optional(S.Boolean),
      encryptionKeyArn: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ManagedPersistenceMonitoringConfiguration",
  }) as any as S.Schema<ManagedPersistenceMonitoringConfiguration>;
export type LogGroupName = string;
export type LogStreamNamePrefix = string;
export type LogTypeString = string;
export type LogTypeList = string[];
export const LogTypeList = /*@__PURE__*/ S.Array(S.String);
export type LogTypeMap = { [key: string]: string[] | undefined };
export const LogTypeMap = /*@__PURE__*/ S.Record(
  S.String,
  LogTypeList.pipe(S.optional),
);
export interface CloudWatchLoggingConfiguration {
  enabled: boolean;
  logGroupName?: string;
  logStreamNamePrefix?: string;
  encryptionKeyArn?: string;
  logTypes?: { [key: string]: string[] | undefined };
}
export const CloudWatchLoggingConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    enabled: S.Boolean,
    logGroupName: S.optional(S.String),
    logStreamNamePrefix: S.optional(S.String),
    encryptionKeyArn: S.optional(S.String),
    logTypes: S.optional(LogTypeMap),
  }),
).annotate({
  identifier: "CloudWatchLoggingConfiguration",
}) as any as S.Schema<CloudWatchLoggingConfiguration>;
export type PrometheusUrlString = string;
export interface PrometheusMonitoringConfiguration {
  remoteWriteUrl?: string;
}
export const PrometheusMonitoringConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ remoteWriteUrl: S.optional(S.String) }),
).annotate({
  identifier: "PrometheusMonitoringConfiguration",
}) as any as S.Schema<PrometheusMonitoringConfiguration>;
export interface MonitoringConfiguration {
  s3MonitoringConfiguration?: S3MonitoringConfiguration;
  managedPersistenceMonitoringConfiguration?: ManagedPersistenceMonitoringConfiguration;
  cloudWatchLoggingConfiguration?: CloudWatchLoggingConfiguration;
  prometheusMonitoringConfiguration?: PrometheusMonitoringConfiguration;
}
export const MonitoringConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    s3MonitoringConfiguration: S.optional(S3MonitoringConfiguration),
    managedPersistenceMonitoringConfiguration: S.optional(
      ManagedPersistenceMonitoringConfiguration,
    ),
    cloudWatchLoggingConfiguration: S.optional(CloudWatchLoggingConfiguration),
    prometheusMonitoringConfiguration: S.optional(
      PrometheusMonitoringConfiguration,
    ),
  }),
).annotate({
  identifier: "MonitoringConfiguration",
}) as any as S.Schema<MonitoringConfiguration>;
export type EncryptionContextKey = string;
export type EncryptionContextValue = string;
export type EncryptionContext = { [key: string]: string | undefined };
export const EncryptionContext = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface DiskEncryptionConfiguration {
  encryptionContext?: { [key: string]: string | undefined };
  encryptionKeyArn?: string;
}
export const DiskEncryptionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    encryptionContext: S.optional(EncryptionContext),
    encryptionKeyArn: S.optional(S.String),
  }),
).annotate({
  identifier: "DiskEncryptionConfiguration",
}) as any as S.Schema<DiskEncryptionConfiguration>;
export interface InteractiveConfiguration {
  studioEnabled?: boolean;
  livyEndpointEnabled?: boolean;
  sessionEnabled?: boolean;
}
export const InteractiveConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    studioEnabled: S.optional(S.Boolean),
    livyEndpointEnabled: S.optional(S.Boolean),
    sessionEnabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "InteractiveConfiguration",
}) as any as S.Schema<InteractiveConfiguration>;
export interface SchedulerConfiguration {
  queueTimeoutMinutes?: number;
  maxConcurrentRuns?: number;
}
export const SchedulerConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    queueTimeoutMinutes: S.optional(S.Number),
    maxConcurrentRuns: S.optional(S.Number),
  }),
).annotate({
  identifier: "SchedulerConfiguration",
}) as any as S.Schema<SchedulerConfiguration>;
export type IdentityCenterInstanceArn = string;
export interface IdentityCenterConfigurationInput {
  identityCenterInstanceArn?: string;
  userBackgroundSessionsEnabled?: boolean;
}
export const IdentityCenterConfigurationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    identityCenterInstanceArn: S.optional(S.String),
    userBackgroundSessionsEnabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "IdentityCenterConfigurationInput",
}) as any as S.Schema<IdentityCenterConfigurationInput>;
export interface JobLevelCostAllocationConfiguration {
  enabled?: boolean;
}
export const JobLevelCostAllocationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ enabled: S.optional(S.Boolean) }),
).annotate({
  identifier: "JobLevelCostAllocationConfiguration",
}) as any as S.Schema<JobLevelCostAllocationConfiguration>;
export interface CreateApplicationRequest {
  name?: string;
  releaseLabel: string;
  type: string;
  clientToken: string;
  initialCapacity?: { [key: string]: InitialCapacityConfig | undefined };
  maximumCapacity?: MaximumAllowedResources;
  tags?: { [key: string]: string | undefined };
  autoStartConfiguration?: AutoStartConfig;
  autoStopConfiguration?: AutoStopConfig;
  networkConfiguration?: NetworkConfiguration;
  architecture?: string;
  imageConfiguration?: ImageConfigurationInput;
  workerTypeSpecifications?: {
    [key: string]: WorkerTypeSpecificationInput | undefined;
  };
  runtimeConfiguration?: Configuration[];
  monitoringConfiguration?: MonitoringConfiguration;
  diskEncryptionConfiguration?: DiskEncryptionConfiguration;
  interactiveConfiguration?: InteractiveConfiguration;
  schedulerConfiguration?: SchedulerConfiguration;
  identityCenterConfiguration?: IdentityCenterConfigurationInput;
  jobLevelCostAllocationConfiguration?: JobLevelCostAllocationConfiguration;
}
export const CreateApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    releaseLabel: S.String,
    type: S.String,
    clientToken: S.String.pipe(T.IdempotencyToken()),
    initialCapacity: S.optional(InitialCapacityConfigMap),
    maximumCapacity: S.optional(MaximumAllowedResources),
    tags: S.optional(TagMap),
    autoStartConfiguration: S.optional(AutoStartConfig),
    autoStopConfiguration: S.optional(AutoStopConfig),
    networkConfiguration: S.optional(NetworkConfiguration),
    architecture: S.optional(S.String),
    imageConfiguration: S.optional(ImageConfigurationInput),
    workerTypeSpecifications: S.optional(WorkerTypeSpecificationInputMap),
    runtimeConfiguration: S.optional(ConfigurationList),
    monitoringConfiguration: S.optional(MonitoringConfiguration),
    diskEncryptionConfiguration: S.optional(DiskEncryptionConfiguration),
    interactiveConfiguration: S.optional(InteractiveConfiguration),
    schedulerConfiguration: S.optional(SchedulerConfiguration),
    identityCenterConfiguration: S.optional(IdentityCenterConfigurationInput),
    jobLevelCostAllocationConfiguration: S.optional(
      JobLevelCostAllocationConfiguration,
    ),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/applications" }),
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
export type ApplicationArn = string;
export interface CreateApplicationResponse {
  applicationId: string;
  name?: string;
  arn: string;
}
export const CreateApplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String,
    name: S.optional(S.String),
    arn: S.String,
  }),
).annotate({
  identifier: "CreateApplicationResponse",
}) as any as S.Schema<CreateApplicationResponse>;
export interface DeleteApplicationRequest {
  applicationId: string;
}
export const DeleteApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ applicationId: S.String.pipe(T.HttpLabel("applicationId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/applications/{applicationId}" }),
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
export interface GetApplicationRequest {
  applicationId: string;
}
export const GetApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ applicationId: S.String.pipe(T.HttpLabel("applicationId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/applications/{applicationId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetApplicationRequest",
}) as any as S.Schema<GetApplicationRequest>;
export type ApplicationState = string;
export type String256 = string;
export type ImageDigest = string;
export interface ImageConfiguration {
  imageUri: string;
  resolvedImageDigest?: string;
  applicationLevelDigestResolution?: boolean;
}
export const ImageConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    imageUri: S.String,
    resolvedImageDigest: S.optional(S.String),
    applicationLevelDigestResolution: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ImageConfiguration",
}) as any as S.Schema<ImageConfiguration>;
export interface WorkerTypeSpecification {
  imageConfiguration?: ImageConfiguration;
}
export const WorkerTypeSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ imageConfiguration: S.optional(ImageConfiguration) }),
).annotate({
  identifier: "WorkerTypeSpecification",
}) as any as S.Schema<WorkerTypeSpecification>;
export type WorkerTypeSpecificationMap = {
  [key: string]: WorkerTypeSpecification | undefined;
};
export const WorkerTypeSpecificationMap = /*@__PURE__*/ S.Record(
  S.String,
  WorkerTypeSpecification.pipe(S.optional),
);
export type IdentityCenterApplicationArn = string;
export interface IdentityCenterConfiguration {
  identityCenterInstanceArn?: string;
  identityCenterApplicationArn?: string;
  userBackgroundSessionsEnabled?: boolean;
}
export const IdentityCenterConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    identityCenterInstanceArn: S.optional(S.String),
    identityCenterApplicationArn: S.optional(S.String),
    userBackgroundSessionsEnabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "IdentityCenterConfiguration",
}) as any as S.Schema<IdentityCenterConfiguration>;
export interface Application {
  applicationId: string;
  name?: string;
  arn: string;
  releaseLabel: string;
  type: string;
  state: string;
  stateDetails?: string;
  initialCapacity?: { [key: string]: InitialCapacityConfig | undefined };
  maximumCapacity?: MaximumAllowedResources;
  createdAt: Date;
  updatedAt: Date;
  tags?: { [key: string]: string | undefined };
  autoStartConfiguration?: AutoStartConfig;
  autoStopConfiguration?: AutoStopConfig;
  networkConfiguration?: NetworkConfiguration;
  architecture?: string;
  imageConfiguration?: ImageConfiguration;
  workerTypeSpecifications?: {
    [key: string]: WorkerTypeSpecification | undefined;
  };
  runtimeConfiguration?: Configuration[];
  monitoringConfiguration?: MonitoringConfiguration;
  diskEncryptionConfiguration?: DiskEncryptionConfiguration;
  interactiveConfiguration?: InteractiveConfiguration;
  schedulerConfiguration?: SchedulerConfiguration;
  identityCenterConfiguration?: IdentityCenterConfiguration;
  jobLevelCostAllocationConfiguration?: JobLevelCostAllocationConfiguration;
}
export const Application = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String,
    name: S.optional(S.String),
    arn: S.String,
    releaseLabel: S.String,
    type: S.String,
    state: S.String,
    stateDetails: S.optional(S.String),
    initialCapacity: S.optional(InitialCapacityConfigMap),
    maximumCapacity: S.optional(MaximumAllowedResources),
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    tags: S.optional(TagMap),
    autoStartConfiguration: S.optional(AutoStartConfig),
    autoStopConfiguration: S.optional(AutoStopConfig),
    networkConfiguration: S.optional(NetworkConfiguration),
    architecture: S.optional(S.String),
    imageConfiguration: S.optional(ImageConfiguration),
    workerTypeSpecifications: S.optional(WorkerTypeSpecificationMap),
    runtimeConfiguration: S.optional(ConfigurationList),
    monitoringConfiguration: S.optional(MonitoringConfiguration),
    diskEncryptionConfiguration: S.optional(DiskEncryptionConfiguration),
    interactiveConfiguration: S.optional(InteractiveConfiguration),
    schedulerConfiguration: S.optional(SchedulerConfiguration),
    identityCenterConfiguration: S.optional(IdentityCenterConfiguration),
    jobLevelCostAllocationConfiguration: S.optional(
      JobLevelCostAllocationConfiguration,
    ),
  }),
).annotate({ identifier: "Application" }) as any as S.Schema<Application>;
export interface GetApplicationResponse {
  application: Application;
}
export const GetApplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ application: Application }),
).annotate({
  identifier: "GetApplicationResponse",
}) as any as S.Schema<GetApplicationResponse>;
export type AttemptNumber = number;
export interface GetDashboardForJobRunRequest {
  applicationId: string;
  jobRunId: string;
  attempt?: number;
  accessSystemProfileLogs?: boolean;
}
export const GetDashboardForJobRunRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    jobRunId: S.String.pipe(T.HttpLabel("jobRunId")),
    attempt: S.optional(S.Number).pipe(T.HttpQuery("attempt")),
    accessSystemProfileLogs: S.optional(S.Boolean).pipe(
      T.HttpQuery("accessSystemProfileLogs"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{applicationId}/jobruns/{jobRunId}/dashboard",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDashboardForJobRunRequest",
}) as any as S.Schema<GetDashboardForJobRunRequest>;
export type Url = string;
export interface GetDashboardForJobRunResponse {
  url?: string;
}
export const GetDashboardForJobRunResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ url: S.optional(S.String) }),
).annotate({
  identifier: "GetDashboardForJobRunResponse",
}) as any as S.Schema<GetDashboardForJobRunResponse>;
export interface GetJobRunRequest {
  applicationId: string;
  jobRunId: string;
  attempt?: number;
}
export const GetJobRunRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    jobRunId: S.String.pipe(T.HttpLabel("jobRunId")),
    attempt: S.optional(S.Number).pipe(T.HttpQuery("attempt")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{applicationId}/jobruns/{jobRunId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetJobRunRequest",
}) as any as S.Schema<GetJobRunRequest>;
export type JobArn = string;
export type RequestIdentityUserArn = string;
export type IAMRoleArn = string;
export type PolicyDocument = string;
export type Arn = string;
export type PolicyArnList = string[];
export const PolicyArnList = /*@__PURE__*/ S.Array(S.String);
export interface JobRunExecutionIamPolicy {
  policy?: string;
  policyArns?: string[];
}
export const JobRunExecutionIamPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policy: S.optional(S.String),
    policyArns: S.optional(PolicyArnList),
  }),
).annotate({
  identifier: "JobRunExecutionIamPolicy",
}) as any as S.Schema<JobRunExecutionIamPolicy>;
export type JobRunState = string;
export interface ConfigurationOverrides {
  applicationConfiguration?: Configuration[];
  monitoringConfiguration?: MonitoringConfiguration;
  diskEncryptionConfiguration?: DiskEncryptionConfiguration;
}
export const ConfigurationOverrides = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationConfiguration: S.optional(ConfigurationList),
    monitoringConfiguration: S.optional(MonitoringConfiguration),
    diskEncryptionConfiguration: S.optional(DiskEncryptionConfiguration),
  }),
).annotate({
  identifier: "ConfigurationOverrides",
}) as any as S.Schema<ConfigurationOverrides>;
export type EntryPointPath = string | redacted.Redacted<string>;
export type EntryPointArgument = string | redacted.Redacted<string>;
export type EntryPointArguments = (string | redacted.Redacted<string>)[];
export const EntryPointArguments = /*@__PURE__*/ S.Array(SensitiveString);
export type SparkSubmitParameters = string | redacted.Redacted<string>;
export interface SparkSubmit {
  entryPoint: string | redacted.Redacted<string>;
  entryPointArguments?: (string | redacted.Redacted<string>)[];
  sparkSubmitParameters?: string | redacted.Redacted<string>;
}
export const SparkSubmit = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    entryPoint: SensitiveString,
    entryPointArguments: S.optional(EntryPointArguments),
    sparkSubmitParameters: S.optional(SensitiveString),
  }),
).annotate({ identifier: "SparkSubmit" }) as any as S.Schema<SparkSubmit>;
export type Query = string | redacted.Redacted<string>;
export type InitScriptPath = string | redacted.Redacted<string>;
export type HiveCliParameters = string | redacted.Redacted<string>;
export interface Hive {
  query: string | redacted.Redacted<string>;
  initQueryFile?: string | redacted.Redacted<string>;
  parameters?: string | redacted.Redacted<string>;
}
export const Hive = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    query: SensitiveString,
    initQueryFile: S.optional(SensitiveString),
    parameters: S.optional(SensitiveString),
  }),
).annotate({ identifier: "Hive" }) as any as S.Schema<Hive>;
export type JobDriver =
  | { sparkSubmit: SparkSubmit; hive?: never }
  | { sparkSubmit?: never; hive: Hive };
export const JobDriver = /*@__PURE__*/ S.Union([
  S.Struct({ sparkSubmit: SparkSubmit }),
  S.Struct({ hive: Hive }),
]);
export interface TotalResourceUtilization {
  vCPUHour?: number;
  memoryGBHour?: number;
  storageGBHour?: number;
}
export const TotalResourceUtilization = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vCPUHour: S.optional(S.Number),
    memoryGBHour: S.optional(S.Number),
    storageGBHour: S.optional(S.Number),
  }),
).annotate({
  identifier: "TotalResourceUtilization",
}) as any as S.Schema<TotalResourceUtilization>;
export type Duration = number;
export interface ResourceUtilization {
  vCPUHour?: number;
  memoryGBHour?: number;
  storageGBHour?: number;
}
export const ResourceUtilization = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vCPUHour: S.optional(S.Number),
    memoryGBHour: S.optional(S.Number),
    storageGBHour: S.optional(S.Number),
  }),
).annotate({
  identifier: "ResourceUtilization",
}) as any as S.Schema<ResourceUtilization>;
export type JobRunMode = string;
export interface RetryPolicy {
  maxAttempts?: number;
  maxFailedAttemptsPerHour?: number;
}
export const RetryPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxAttempts: S.optional(S.Number),
    maxFailedAttemptsPerHour: S.optional(S.Number),
  }),
).annotate({ identifier: "RetryPolicy" }) as any as S.Schema<RetryPolicy>;
export interface JobRun {
  applicationId: string;
  jobRunId: string;
  name?: string;
  arn: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  executionRole: string;
  executionIamPolicy?: JobRunExecutionIamPolicy;
  state: string;
  stateDetails: string;
  releaseLabel: string;
  configurationOverrides?: ConfigurationOverrides;
  jobDriver: JobDriver;
  tags?: { [key: string]: string | undefined };
  totalResourceUtilization?: TotalResourceUtilization;
  networkConfiguration?: NetworkConfiguration;
  totalExecutionDurationSeconds?: number;
  executionTimeoutMinutes?: number;
  billedResourceUtilization?: ResourceUtilization;
  mode?: string;
  retryPolicy?: RetryPolicy;
  attempt?: number;
  attemptCreatedAt?: Date;
  attemptUpdatedAt?: Date;
  startedAt?: Date;
  endedAt?: Date;
  queuedDurationMilliseconds?: number;
  imageConfiguration?: ImageConfiguration;
  workerTypeSpecifications?: {
    [key: string]: WorkerTypeSpecification | undefined;
  };
}
export const JobRun = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String,
    jobRunId: S.String,
    name: S.optional(S.String),
    arn: S.String,
    createdBy: S.String,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    executionRole: S.String,
    executionIamPolicy: S.optional(JobRunExecutionIamPolicy),
    state: S.String,
    stateDetails: S.String,
    releaseLabel: S.String,
    configurationOverrides: S.optional(ConfigurationOverrides),
    jobDriver: JobDriver,
    tags: S.optional(TagMap),
    totalResourceUtilization: S.optional(TotalResourceUtilization),
    networkConfiguration: S.optional(NetworkConfiguration),
    totalExecutionDurationSeconds: S.optional(S.Number),
    executionTimeoutMinutes: S.optional(S.Number),
    billedResourceUtilization: S.optional(ResourceUtilization),
    mode: S.optional(S.String),
    retryPolicy: S.optional(RetryPolicy),
    attempt: S.optional(S.Number),
    attemptCreatedAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    attemptUpdatedAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    startedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    endedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    queuedDurationMilliseconds: S.optional(S.Number),
    imageConfiguration: S.optional(ImageConfiguration),
    workerTypeSpecifications: S.optional(WorkerTypeSpecificationMap),
  }),
).annotate({ identifier: "JobRun" }) as any as S.Schema<JobRun>;
export interface GetJobRunResponse {
  jobRun: JobRun;
}
export const GetJobRunResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobRun: JobRun }),
).annotate({
  identifier: "GetJobRunResponse",
}) as any as S.Schema<GetJobRunResponse>;
export type ResourceId = string;
export type ResourceType = string;
export interface GetResourceDashboardRequest {
  applicationId: string;
  resourceId: string;
  resourceType: string;
}
export const GetResourceDashboardRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    resourceId: S.String.pipe(T.HttpQuery("resourceId")),
    resourceType: S.String.pipe(T.HttpQuery("resourceType")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/applications/{applicationId}/dashboard" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetResourceDashboardRequest",
}) as any as S.Schema<GetResourceDashboardRequest>;
export interface GetResourceDashboardResponse {
  url?: string;
}
export const GetResourceDashboardResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ url: S.optional(S.String) }),
).annotate({
  identifier: "GetResourceDashboardResponse",
}) as any as S.Schema<GetResourceDashboardResponse>;
export type SessionId = string;
export interface GetSessionRequest {
  applicationId: string;
  sessionId: string;
}
export const GetSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    sessionId: S.String.pipe(T.HttpLabel("sessionId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{applicationId}/sessions/{sessionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSessionRequest",
}) as any as S.Schema<GetSessionRequest>;
export type SessionArn = string;
export type SessionState = string;
export interface SessionConfigurationOverrides {
  runtimeConfiguration?: Configuration[];
}
export const SessionConfigurationOverrides = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ runtimeConfiguration: S.optional(ConfigurationList) }),
).annotate({
  identifier: "SessionConfigurationOverrides",
}) as any as S.Schema<SessionConfigurationOverrides>;
export interface Session {
  applicationId: string;
  sessionId: string;
  arn: string;
  name?: string;
  state: string;
  stateDetails: string;
  releaseLabel: string;
  executionRoleArn: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  startedAt?: Date;
  endedAt?: Date;
  idleSince?: Date;
  configurationOverrides?: SessionConfigurationOverrides;
  networkConfiguration?: NetworkConfiguration;
  idleTimeoutMinutes?: number;
  tags?: { [key: string]: string | undefined };
  totalResourceUtilization?: TotalResourceUtilization;
  billedResourceUtilization?: ResourceUtilization;
  totalExecutionDurationSeconds?: number;
}
export const Session = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String,
    sessionId: S.String,
    arn: S.String,
    name: S.optional(S.String),
    state: S.String,
    stateDetails: S.String,
    releaseLabel: S.String,
    executionRoleArn: S.String,
    createdBy: S.String,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    startedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    endedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    idleSince: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    configurationOverrides: S.optional(SessionConfigurationOverrides),
    networkConfiguration: S.optional(NetworkConfiguration),
    idleTimeoutMinutes: S.optional(S.Number),
    tags: S.optional(TagMap),
    totalResourceUtilization: S.optional(TotalResourceUtilization),
    billedResourceUtilization: S.optional(ResourceUtilization),
    totalExecutionDurationSeconds: S.optional(S.Number),
  }),
).annotate({ identifier: "Session" }) as any as S.Schema<Session>;
export interface GetSessionResponse {
  session: Session;
}
export const GetSessionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ session: Session }),
).annotate({
  identifier: "GetSessionResponse",
}) as any as S.Schema<GetSessionResponse>;
export interface GetSessionEndpointRequest {
  applicationId: string;
  sessionId: string;
}
export const GetSessionEndpointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    sessionId: S.String.pipe(T.HttpLabel("sessionId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{applicationId}/sessions/{sessionId}/endpoint",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSessionEndpointRequest",
}) as any as S.Schema<GetSessionEndpointRequest>;
export type EndpointUrl = string;
export type SessionAuthToken = string | redacted.Redacted<string>;
export interface GetSessionEndpointResponse {
  applicationId: string;
  sessionId: string;
  endpoint: string;
  authToken: string | redacted.Redacted<string>;
  authTokenExpiresAt: Date;
}
export const GetSessionEndpointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String,
    sessionId: S.String,
    endpoint: S.String,
    authToken: SensitiveString,
    authTokenExpiresAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "GetSessionEndpointResponse",
}) as any as S.Schema<GetSessionEndpointResponse>;
export type NextToken = string;
export type ApplicationStateSet = string[];
export const ApplicationStateSet = /*@__PURE__*/ S.Array(S.String);
export interface ListApplicationsRequest {
  nextToken?: string;
  maxResults?: number;
  states?: string[];
}
export const ListApplicationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    states: S.optional(ApplicationStateSet).pipe(T.HttpQuery("states")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/applications" }),
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
export interface ApplicationSummary {
  id: string;
  name?: string;
  arn: string;
  releaseLabel: string;
  type: string;
  state: string;
  stateDetails?: string;
  createdAt: Date;
  updatedAt: Date;
  architecture?: string;
}
export const ApplicationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    name: S.optional(S.String),
    arn: S.String,
    releaseLabel: S.String,
    type: S.String,
    state: S.String,
    stateDetails: S.optional(S.String),
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    architecture: S.optional(S.String),
  }),
).annotate({
  identifier: "ApplicationSummary",
}) as any as S.Schema<ApplicationSummary>;
export type ApplicationList = ApplicationSummary[];
export const ApplicationList = /*@__PURE__*/ S.Array(ApplicationSummary);
export interface ListApplicationsResponse {
  applications: ApplicationSummary[];
  nextToken?: string;
}
export const ListApplicationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ applications: ApplicationList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListApplicationsResponse",
}) as any as S.Schema<ListApplicationsResponse>;
export interface ListJobRunAttemptsRequest {
  applicationId: string;
  jobRunId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListJobRunAttemptsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    jobRunId: S.String.pipe(T.HttpLabel("jobRunId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{applicationId}/jobruns/{jobRunId}/attempts",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListJobRunAttemptsRequest",
}) as any as S.Schema<ListJobRunAttemptsRequest>;
export type JobRunType = string;
export interface JobRunAttemptSummary {
  applicationId: string;
  id: string;
  name?: string;
  mode?: string;
  arn: string;
  createdBy: string;
  jobCreatedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  executionRole: string;
  state: string;
  stateDetails: string;
  releaseLabel: string;
  type?: string;
  attempt?: number;
}
export const JobRunAttemptSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String,
    id: S.String,
    name: S.optional(S.String),
    mode: S.optional(S.String),
    arn: S.String,
    createdBy: S.String,
    jobCreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    executionRole: S.String,
    state: S.String,
    stateDetails: S.String,
    releaseLabel: S.String,
    type: S.optional(S.String),
    attempt: S.optional(S.Number),
  }),
).annotate({
  identifier: "JobRunAttemptSummary",
}) as any as S.Schema<JobRunAttemptSummary>;
export type JobRunAttempts = JobRunAttemptSummary[];
export const JobRunAttempts = /*@__PURE__*/ S.Array(JobRunAttemptSummary);
export interface ListJobRunAttemptsResponse {
  jobRunAttempts: JobRunAttemptSummary[];
  nextToken?: string;
}
export const ListJobRunAttemptsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobRunAttempts: JobRunAttempts, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListJobRunAttemptsResponse",
}) as any as S.Schema<ListJobRunAttemptsResponse>;
export type JobRunStateSet = string[];
export const JobRunStateSet = /*@__PURE__*/ S.Array(S.String);
export interface ListJobRunsRequest {
  applicationId: string;
  nextToken?: string;
  maxResults?: number;
  createdAtAfter?: Date;
  createdAtBefore?: Date;
  states?: string[];
  mode?: string;
}
export const ListJobRunsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    createdAtAfter: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ).pipe(T.HttpQuery("createdAtAfter")),
    createdAtBefore: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ).pipe(T.HttpQuery("createdAtBefore")),
    states: S.optional(JobRunStateSet).pipe(T.HttpQuery("states")),
    mode: S.optional(S.String).pipe(T.HttpQuery("mode")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/applications/{applicationId}/jobruns" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListJobRunsRequest",
}) as any as S.Schema<ListJobRunsRequest>;
export interface JobRunSummary {
  applicationId: string;
  id: string;
  name?: string;
  mode?: string;
  arn: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  executionRole: string;
  state: string;
  stateDetails: string;
  releaseLabel: string;
  type?: string;
  attempt?: number;
  attemptCreatedAt?: Date;
  attemptUpdatedAt?: Date;
}
export const JobRunSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String,
    id: S.String,
    name: S.optional(S.String),
    mode: S.optional(S.String),
    arn: S.String,
    createdBy: S.String,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    executionRole: S.String,
    state: S.String,
    stateDetails: S.String,
    releaseLabel: S.String,
    type: S.optional(S.String),
    attempt: S.optional(S.Number),
    attemptCreatedAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    attemptUpdatedAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "JobRunSummary" }) as any as S.Schema<JobRunSummary>;
export type JobRuns = JobRunSummary[];
export const JobRuns = /*@__PURE__*/ S.Array(JobRunSummary);
export interface ListJobRunsResponse {
  jobRuns: JobRunSummary[];
  nextToken?: string;
}
export const ListJobRunsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobRuns: JobRuns, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListJobRunsResponse",
}) as any as S.Schema<ListJobRunsResponse>;
export type SessionStateSet = string[];
export const SessionStateSet = /*@__PURE__*/ S.Array(S.String);
export interface ListSessionsRequest {
  applicationId: string;
  nextToken?: string;
  maxResults?: number;
  states?: string[];
  createdAtAfter?: Date;
  createdAtBefore?: Date;
}
export const ListSessionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    states: S.optional(SessionStateSet).pipe(T.HttpQuery("states")),
    createdAtAfter: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ).pipe(T.HttpQuery("createdAtAfter")),
    createdAtBefore: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ).pipe(T.HttpQuery("createdAtBefore")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/applications/{applicationId}/sessions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSessionsRequest",
}) as any as S.Schema<ListSessionsRequest>;
export interface SessionSummary {
  applicationId: string;
  sessionId: string;
  arn: string;
  name?: string;
  state: string;
  stateDetails: string;
  releaseLabel: string;
  executionRoleArn: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}
export const SessionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String,
    sessionId: S.String,
    arn: S.String,
    name: S.optional(S.String),
    state: S.String,
    stateDetails: S.String,
    releaseLabel: S.String,
    executionRoleArn: S.String,
    createdBy: S.String,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({ identifier: "SessionSummary" }) as any as S.Schema<SessionSummary>;
export type Sessions = SessionSummary[];
export const Sessions = /*@__PURE__*/ S.Array(SessionSummary);
export interface ListSessionsResponse {
  sessions: SessionSummary[];
  nextToken?: string;
}
export const ListSessionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sessions: Sessions, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListSessionsResponse",
}) as any as S.Schema<ListSessionsResponse>;
export type ResourceArn = string;
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
  S.Struct({ tags: S.optional(TagMap) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface StartApplicationRequest {
  applicationId: string;
}
export const StartApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ applicationId: S.String.pipe(T.HttpLabel("applicationId")) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/applications/{applicationId}/start" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartApplicationRequest",
}) as any as S.Schema<StartApplicationRequest>;
export interface StartApplicationResponse {}
export const StartApplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StartApplicationResponse",
}) as any as S.Schema<StartApplicationResponse>;
export interface StartJobRunRequest {
  applicationId: string;
  clientToken: string;
  executionRoleArn: string;
  executionIamPolicy?: JobRunExecutionIamPolicy;
  jobDriver?: JobDriver;
  configurationOverrides?: ConfigurationOverrides;
  tags?: { [key: string]: string | undefined };
  executionTimeoutMinutes?: number;
  name?: string;
  mode?: string;
  retryPolicy?: RetryPolicy;
}
export const StartJobRunRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    clientToken: S.String.pipe(T.IdempotencyToken()),
    executionRoleArn: S.String,
    executionIamPolicy: S.optional(JobRunExecutionIamPolicy),
    jobDriver: S.optional(JobDriver),
    configurationOverrides: S.optional(ConfigurationOverrides),
    tags: S.optional(TagMap),
    executionTimeoutMinutes: S.optional(S.Number),
    name: S.optional(S.String),
    mode: S.optional(S.String),
    retryPolicy: S.optional(RetryPolicy),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/applications/{applicationId}/jobruns" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartJobRunRequest",
}) as any as S.Schema<StartJobRunRequest>;
export interface StartJobRunResponse {
  applicationId: string;
  jobRunId: string;
  arn: string;
}
export const StartJobRunResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ applicationId: S.String, jobRunId: S.String, arn: S.String }),
).annotate({
  identifier: "StartJobRunResponse",
}) as any as S.Schema<StartJobRunResponse>;
export interface StartSessionRequest {
  applicationId: string;
  clientToken: string;
  executionRoleArn: string;
  configurationOverrides?: SessionConfigurationOverrides;
  tags?: { [key: string]: string | undefined };
  idleTimeoutMinutes?: number;
  name?: string;
}
export const StartSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    clientToken: S.String.pipe(T.IdempotencyToken()),
    executionRoleArn: S.String,
    configurationOverrides: S.optional(SessionConfigurationOverrides),
    tags: S.optional(TagMap),
    idleTimeoutMinutes: S.optional(S.Number),
    name: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/applications/{applicationId}/sessions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartSessionRequest",
}) as any as S.Schema<StartSessionRequest>;
export interface StartSessionResponse {
  applicationId: string;
  sessionId: string;
  arn: string;
}
export const StartSessionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ applicationId: S.String, sessionId: S.String, arn: S.String }),
).annotate({
  identifier: "StartSessionResponse",
}) as any as S.Schema<StartSessionResponse>;
export interface StopApplicationRequest {
  applicationId: string;
}
export const StopApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ applicationId: S.String.pipe(T.HttpLabel("applicationId")) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/applications/{applicationId}/stop" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopApplicationRequest",
}) as any as S.Schema<StopApplicationRequest>;
export interface StopApplicationResponse {}
export const StopApplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StopApplicationResponse",
}) as any as S.Schema<StopApplicationResponse>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tags: TagMap,
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
export interface TerminateSessionRequest {
  applicationId: string;
  sessionId: string;
}
export const TerminateSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    sessionId: S.String.pipe(T.HttpLabel("sessionId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/applications/{applicationId}/sessions/{sessionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "TerminateSessionRequest",
}) as any as S.Schema<TerminateSessionRequest>;
export interface TerminateSessionResponse {
  applicationId: string;
  sessionId: string;
}
export const TerminateSessionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ applicationId: S.String, sessionId: S.String }),
).annotate({
  identifier: "TerminateSessionResponse",
}) as any as S.Schema<TerminateSessionResponse>;
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tagKeys: TagKeyList.pipe(T.HttpQuery("tagKeys")),
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
  applicationId: string;
  clientToken: string;
  initialCapacity?: { [key: string]: InitialCapacityConfig | undefined };
  maximumCapacity?: MaximumAllowedResources;
  autoStartConfiguration?: AutoStartConfig;
  autoStopConfiguration?: AutoStopConfig;
  networkConfiguration?: NetworkConfiguration;
  architecture?: string;
  imageConfiguration?: ImageConfigurationInput;
  workerTypeSpecifications?: {
    [key: string]: WorkerTypeSpecificationInput | undefined;
  };
  interactiveConfiguration?: InteractiveConfiguration;
  releaseLabel?: string;
  runtimeConfiguration?: Configuration[];
  monitoringConfiguration?: MonitoringConfiguration;
  diskEncryptionConfiguration?: DiskEncryptionConfiguration;
  schedulerConfiguration?: SchedulerConfiguration;
  identityCenterConfiguration?: IdentityCenterConfigurationInput;
  jobLevelCostAllocationConfiguration?: JobLevelCostAllocationConfiguration;
}
export const UpdateApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    clientToken: S.String.pipe(T.IdempotencyToken()),
    initialCapacity: S.optional(InitialCapacityConfigMap),
    maximumCapacity: S.optional(MaximumAllowedResources),
    autoStartConfiguration: S.optional(AutoStartConfig),
    autoStopConfiguration: S.optional(AutoStopConfig),
    networkConfiguration: S.optional(NetworkConfiguration),
    architecture: S.optional(S.String),
    imageConfiguration: S.optional(ImageConfigurationInput),
    workerTypeSpecifications: S.optional(WorkerTypeSpecificationInputMap),
    interactiveConfiguration: S.optional(InteractiveConfiguration),
    releaseLabel: S.optional(S.String),
    runtimeConfiguration: S.optional(ConfigurationList),
    monitoringConfiguration: S.optional(MonitoringConfiguration),
    diskEncryptionConfiguration: S.optional(DiskEncryptionConfiguration),
    schedulerConfiguration: S.optional(SchedulerConfiguration),
    identityCenterConfiguration: S.optional(IdentityCenterConfigurationInput),
    jobLevelCostAllocationConfiguration: S.optional(
      JobLevelCostAllocationConfiguration,
    ),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/applications/{applicationId}" }),
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
export interface UpdateApplicationResponse {
  application: Application;
}
export const UpdateApplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ application: Application }),
).annotate({
  identifier: "UpdateApplicationResponse",
}) as any as S.Schema<UpdateApplicationResponse>;
export type CancelJobRunError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Cancels a job run.
 */
export const cancelJobRun: API.OperationMethod<
  CancelJobRunRequest,
  CancelJobRunResponse,
  CancelJobRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelJobRunRequest,
  output: CancelJobRunResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelJobRun",
}));

export type CreateApplicationError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates an application.
 */
export const createApplication: API.OperationMethod<
  CreateApplicationRequest,
  CreateApplicationResponse,
  CreateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateApplicationRequest,
  output: CreateApplicationResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApplication",
}));

export type DeleteApplicationError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an application. An application has to be in a stopped or created state in order to be deleted.
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
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplication",
}));

export type GetApplicationError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Displays detailed information about a specified application.
 */
export const getApplication: API.OperationMethod<
  GetApplicationRequest,
  GetApplicationResponse,
  GetApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetApplicationRequest,
  output: GetApplicationResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApplication",
}));

export type GetDashboardForJobRunError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates and returns a URL that you can use to access the application UIs for a job run.
 *
 * For jobs in a running state, the application UI is a live user interface such as the Spark or Tez web UI. For completed jobs, the application UI is a persistent application user interface such as the Spark History Server or persistent Tez UI.
 *
 * The URL is valid for one hour after you generate it. To access the application UI after that hour elapses, you must invoke the API again to generate a new URL.
 */
export const getDashboardForJobRun: API.OperationMethod<
  GetDashboardForJobRunRequest,
  GetDashboardForJobRunResponse,
  GetDashboardForJobRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDashboardForJobRunRequest,
  output: GetDashboardForJobRunResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDashboardForJobRun",
}));

export type GetJobRunError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Displays detailed information about a job run.
 */
export const getJobRun: API.OperationMethod<
  GetJobRunRequest,
  GetJobRunResponse,
  GetJobRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetJobRunRequest,
  output: GetJobRunResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJobRun",
}));

export type GetResourceDashboardError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns a URL that you can use to access the application UIs for a specified resource, such as a session.
 *
 * For resources in a running state, the application UI is a live user interface such as the Spark web UI. For terminated resources, the application UI is a persistent application user interface such as the Spark History Server.
 *
 * The URL is valid for one hour after you generate it. To access the application UI after that hour elapses, you must invoke the API again to generate a new URL.
 */
export const getResourceDashboard: API.OperationMethod<
  GetResourceDashboardRequest,
  GetResourceDashboardResponse,
  GetResourceDashboardError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetResourceDashboardRequest,
  output: GetResourceDashboardResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourceDashboard",
}));

export type GetSessionError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Displays detailed information about a session.
 */
export const getSession: API.OperationMethod<
  GetSessionRequest,
  GetSessionResponse,
  GetSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSessionRequest,
  output: GetSessionResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSession",
}));

export type GetSessionEndpointError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns the session endpoint URL and a time-limited authentication token for the specified session. Use the endpoint and token to connect a client to the session. Call this operation again when the authentication token expires to obtain a new token.
 */
export const getSessionEndpoint: API.OperationMethod<
  GetSessionEndpointRequest,
  GetSessionEndpointResponse,
  GetSessionEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSessionEndpointRequest,
  output: GetSessionEndpointResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSessionEndpoint",
}));

export type ListApplicationsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Lists applications based on a set of parameters.
 */
export const listApplications: API.PaginatedOperationMethod<
  ListApplicationsRequest,
  ListApplicationsResponse,
  ListApplicationsError,
  Credentials | HttpClient.HttpClient,
  ApplicationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListApplicationsRequest,
  output: ListApplicationsResponse,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplications",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "applications",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListJobRunAttemptsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists all attempt of a job run.
 */
export const listJobRunAttempts: API.PaginatedOperationMethod<
  ListJobRunAttemptsRequest,
  ListJobRunAttemptsResponse,
  ListJobRunAttemptsError,
  Credentials | HttpClient.HttpClient,
  JobRunAttemptSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListJobRunAttemptsRequest,
  output: ListJobRunAttemptsResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListJobRunAttempts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "jobRunAttempts",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListJobRunsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Lists job runs based on a set of parameters.
 */
export const listJobRuns: API.PaginatedOperationMethod<
  ListJobRunsRequest,
  ListJobRunsResponse,
  ListJobRunsError,
  Credentials | HttpClient.HttpClient,
  JobRunSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListJobRunsRequest,
  output: ListJobRunsResponse,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListJobRuns",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "jobRuns",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSessionsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists sessions for the specified application. You can filter sessions by state and creation time.
 */
export const listSessions: API.PaginatedOperationMethod<
  ListSessionsRequest,
  ListSessionsResponse,
  ListSessionsError,
  Credentials | HttpClient.HttpClient,
  SessionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSessionsRequest,
  output: ListSessionsResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSessions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "sessions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the tags assigned to the resources.
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
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type StartApplicationError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Starts a specified application and initializes initial capacity if configured.
 */
export const startApplication: API.OperationMethod<
  StartApplicationRequest,
  StartApplicationResponse,
  StartApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartApplicationRequest,
  output: StartApplicationResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartApplication",
}));

export type StartJobRunError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Starts a job run.
 */
export const startJobRun: API.OperationMethod<
  StartJobRunRequest,
  StartJobRunResponse,
  StartJobRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartJobRunRequest,
  output: StartJobRunResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartJobRun",
}));

export type StartSessionError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates and starts a new session on the specified application. The application must be in the `STARTED` state or have `AutoStart` enabled, and have interactive sessions enabled. This operation is supported for EMR release 7.13.0 and later.
 */
export const startSession: API.OperationMethod<
  StartSessionRequest,
  StartSessionResponse,
  StartSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartSessionRequest,
  output: StartSessionResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSession",
}));

export type StopApplicationError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Stops a specified application and releases initial capacity if configured. All scheduled and running jobs must be completed or cancelled before stopping an application.
 */
export const stopApplication: API.OperationMethod<
  StopApplicationRequest,
  StopApplicationResponse,
  StopApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopApplicationRequest,
  output: StopApplicationResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopApplication",
}));

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Assigns tags to resources. A tag is a label that you assign to an Amazon Web Services resource. Each tag consists of a key and an optional value, both of which you define. Tags enable you to categorize your Amazon Web Services resources by attributes such as purpose, owner, or environment. When you have many resources of the same type, you can quickly identify a specific resource based on the tags you've assigned to it.
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
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type TerminateSessionError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Terminates the specified session. After you terminate a session, it enters the `TERMINATING` state and then the `TERMINATED` state. You can still access the Spark History Server for a terminated session through the `GetResourceDashboard` operation.
 */
export const terminateSession: API.OperationMethod<
  TerminateSessionRequest,
  TerminateSessionResponse,
  TerminateSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TerminateSessionRequest,
  output: TerminateSessionResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TerminateSession",
}));

export type UntagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes tags from resources.
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
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateApplicationError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates a specified application. An application has to be in a stopped or created state in order to be updated.
 */
export const updateApplication: API.OperationMethod<
  UpdateApplicationRequest,
  UpdateApplicationResponse,
  UpdateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateApplicationRequest,
  output: UpdateApplicationResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApplication",
}));
