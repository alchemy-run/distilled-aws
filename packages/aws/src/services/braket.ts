import * as HttpClient from "effect/unstable/http/HttpClient";
import * as S from "@distilled.cloud/core/schema";
import * as API from "@distilled.cloud/core/api";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc = T.AwsApiService({ sdkId: "Braket", serviceShapeName: "Braket" });
const auth = T.AwsAuthSigv4({ name: "braket" });
const ver = T.ServiceVersion("2019-09-01");
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
              `https://braket-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://braket-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://braket.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://braket.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class DeviceOfflineException
  extends /*@__PURE__*/ S.TaggedError<DeviceOfflineException>()(
    "DeviceOfflineException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(424),
  ) {}
export class DeviceRetiredException
  extends /*@__PURE__*/ S.TaggedError<DeviceRetiredException>()(
    "DeviceRetiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(410),
  ).pipe(C.withBadRequestError) {}
export class InternalServiceException
  extends /*@__PURE__*/ S.TaggedError<InternalServiceException>()(
    "InternalServiceException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
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
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      reason: S.optional(S.String),
      programSetValidationFailures: S.optional(
        S.suspend(() => ProgramSetValidationFailuresList).annotate({
          identifier: "ProgramSetValidationFailuresList",
        }),
      ),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type JobArn = string;
export interface CancelJobRequest {
  jobArn: string;
}
export const CancelJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobArn: S.String.pipe(T.HttpLabel("jobArn")) }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/job/{jobArn}/cancel" }),
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
export type CancellationStatus = string;
export interface CancelJobResponse {
  jobArn: string;
  cancellationStatus: string;
}
export const CancelJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobArn: S.String, cancellationStatus: S.String }),
).annotate({
  identifier: "CancelJobResponse",
}) as any as S.Schema<CancelJobResponse>;
export type QuantumTaskArn = string;
export type String64 = string;
export interface CancelQuantumTaskRequest {
  quantumTaskArn: string;
  clientToken: string;
}
export const CancelQuantumTaskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    quantumTaskArn: S.String.pipe(T.HttpLabel("quantumTaskArn")),
    clientToken: S.String.pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/quantum-task/{quantumTaskArn}/cancel" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelQuantumTaskRequest",
}) as any as S.Schema<CancelQuantumTaskRequest>;
export interface CancelQuantumTaskResponse {
  quantumTaskArn: string;
  cancellationStatus: string;
}
export const CancelQuantumTaskResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ quantumTaskArn: S.String, cancellationStatus: S.String }),
).annotate({
  identifier: "CancelQuantumTaskResponse",
}) as any as S.Schema<CancelQuantumTaskResponse>;
export type S3Path = string;
export type CompressionType = string;
export interface ScriptModeConfig {
  entryPoint: string;
  s3Uri: string;
  compressionType?: string;
}
export const ScriptModeConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    entryPoint: S.String,
    s3Uri: S.String,
    compressionType: S.optional(S.String),
  }),
).annotate({
  identifier: "ScriptModeConfig",
}) as any as S.Schema<ScriptModeConfig>;
export type Uri = string;
export interface ContainerImage {
  uri: string;
}
export const ContainerImage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ uri: S.String }),
).annotate({ identifier: "ContainerImage" }) as any as S.Schema<ContainerImage>;
export interface AlgorithmSpecification {
  scriptModeConfig?: ScriptModeConfig;
  containerImage?: ContainerImage;
}
export const AlgorithmSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    scriptModeConfig: S.optional(ScriptModeConfig),
    containerImage: S.optional(ContainerImage),
  }),
).annotate({
  identifier: "AlgorithmSpecification",
}) as any as S.Schema<AlgorithmSpecification>;
export type String256 = string;
export interface S3DataSource {
  s3Uri: string;
}
export const S3DataSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ s3Uri: S.String }),
).annotate({ identifier: "S3DataSource" }) as any as S.Schema<S3DataSource>;
export interface DataSource {
  s3DataSource: S3DataSource;
}
export const DataSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ s3DataSource: S3DataSource }),
).annotate({ identifier: "DataSource" }) as any as S.Schema<DataSource>;
export interface InputFileConfig {
  channelName: string;
  contentType?: string;
  dataSource: DataSource;
}
export const InputFileConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    channelName: S.String,
    contentType: S.optional(S.String),
    dataSource: DataSource,
  }),
).annotate({
  identifier: "InputFileConfig",
}) as any as S.Schema<InputFileConfig>;
export type InputConfigList = InputFileConfig[];
export const InputConfigList = /*@__PURE__*/ S.Array(InputFileConfig);
export type String2048 = string;
export interface JobOutputDataConfig {
  kmsKeyId?: string;
  s3Path: string;
}
export const JobOutputDataConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ kmsKeyId: S.optional(S.String), s3Path: S.String }),
).annotate({
  identifier: "JobOutputDataConfig",
}) as any as S.Schema<JobOutputDataConfig>;
export type String4096 = string;
export interface JobCheckpointConfig {
  localPath?: string;
  s3Uri: string;
}
export const JobCheckpointConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ localPath: S.optional(S.String), s3Uri: S.String }),
).annotate({
  identifier: "JobCheckpointConfig",
}) as any as S.Schema<JobCheckpointConfig>;
export type RoleArn = string;
export interface JobStoppingCondition {
  maxRuntimeInSeconds?: number;
}
export const JobStoppingCondition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ maxRuntimeInSeconds: S.optional(S.Number) }),
).annotate({
  identifier: "JobStoppingCondition",
}) as any as S.Schema<JobStoppingCondition>;
export type InstanceType = string;
export interface InstanceConfig {
  instanceType: string;
  volumeSizeInGb: number;
  instanceCount?: number;
}
export const InstanceConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instanceType: S.String,
    volumeSizeInGb: S.Number,
    instanceCount: S.optional(S.Number),
  }),
).annotate({ identifier: "InstanceConfig" }) as any as S.Schema<InstanceConfig>;
export type HyperParameters = { [key: string]: string | undefined };
export const HyperParameters = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface DeviceConfig {
  device: string;
}
export const DeviceConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ device: S.String }),
).annotate({ identifier: "DeviceConfig" }) as any as S.Schema<DeviceConfig>;
export type TagsMap = { [key: string]: string | undefined };
export const TagsMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type BraketResourceArn = string;
export type AssociationType = string;
export interface Association {
  arn: string;
  type: string;
}
export const Association = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String, type: S.String }),
).annotate({ identifier: "Association" }) as any as S.Schema<Association>;
export type Associations = Association[];
export const Associations = /*@__PURE__*/ S.Array(Association);
export interface CreateJobRequest {
  clientToken: string;
  algorithmSpecification: AlgorithmSpecification;
  inputDataConfig?: InputFileConfig[];
  outputDataConfig: JobOutputDataConfig;
  checkpointConfig?: JobCheckpointConfig;
  jobName: string;
  roleArn: string;
  stoppingCondition?: JobStoppingCondition;
  instanceConfig: InstanceConfig;
  hyperParameters?: { [key: string]: string | undefined };
  deviceConfig: DeviceConfig;
  tags?: { [key: string]: string | undefined };
  associations?: Association[];
}
export const CreateJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.String.pipe(T.IdempotencyToken()),
    algorithmSpecification: AlgorithmSpecification,
    inputDataConfig: S.optional(InputConfigList),
    outputDataConfig: JobOutputDataConfig,
    checkpointConfig: S.optional(JobCheckpointConfig),
    jobName: S.String,
    roleArn: S.String,
    stoppingCondition: S.optional(JobStoppingCondition),
    instanceConfig: InstanceConfig,
    hyperParameters: S.optional(HyperParameters),
    deviceConfig: DeviceConfig,
    tags: S.optional(TagsMap),
    associations: S.optional(Associations),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/job" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateJobRequest",
}) as any as S.Schema<CreateJobRequest>;
export interface CreateJobResponse {
  jobArn: string;
}
export const CreateJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobArn: S.String }),
).annotate({
  identifier: "CreateJobResponse",
}) as any as S.Schema<CreateJobResponse>;
export type DeviceArn = string;
export type JsonValue = string;
export type JobToken = string;
export type ExperimentalCapabilitiesEnablementType = string;
export type ExperimentalCapabilities = { enabled: string };
export const ExperimentalCapabilities = /*@__PURE__*/ S.Union([
  S.Struct({ enabled: S.String }),
]);
export interface CreateQuantumTaskRequest {
  clientToken: string;
  deviceArn: string;
  deviceParameters?: string;
  shots: number;
  outputS3Bucket: string;
  outputS3KeyPrefix: string;
  action: string;
  tags?: { [key: string]: string | undefined };
  jobToken?: string;
  associations?: Association[];
  experimentalCapabilities?: ExperimentalCapabilities;
}
export const CreateQuantumTaskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.String.pipe(T.IdempotencyToken()),
    deviceArn: S.String,
    deviceParameters: S.optional(S.String),
    shots: S.Number,
    outputS3Bucket: S.String,
    outputS3KeyPrefix: S.String,
    action: S.String,
    tags: S.optional(TagsMap),
    jobToken: S.optional(S.String),
    associations: S.optional(Associations),
    experimentalCapabilities: S.optional(ExperimentalCapabilities),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/quantum-task" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateQuantumTaskRequest",
}) as any as S.Schema<CreateQuantumTaskRequest>;
export interface CreateQuantumTaskResponse {
  quantumTaskArn: string;
}
export const CreateQuantumTaskResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ quantumTaskArn: S.String }),
).annotate({
  identifier: "CreateQuantumTaskResponse",
}) as any as S.Schema<CreateQuantumTaskResponse>;
export interface TimePeriod {
  startAt: Date;
  endAt: Date;
}
export const TimePeriod = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    startAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    endAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({ identifier: "TimePeriod" }) as any as S.Schema<TimePeriod>;
export interface CreateSpendingLimitRequest {
  clientToken: string;
  deviceArn: string;
  spendingLimit: string;
  timePeriod?: TimePeriod;
  tags?: { [key: string]: string | undefined };
}
export const CreateSpendingLimitRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.String.pipe(T.IdempotencyToken()),
    deviceArn: S.String,
    spendingLimit: S.String,
    timePeriod: S.optional(TimePeriod),
    tags: S.optional(TagsMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/spending-limit" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateSpendingLimitRequest",
}) as any as S.Schema<CreateSpendingLimitRequest>;
export type SpendingLimitArn = string;
export interface CreateSpendingLimitResponse {
  spendingLimitArn: string;
}
export const CreateSpendingLimitResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ spendingLimitArn: S.String }),
).annotate({
  identifier: "CreateSpendingLimitResponse",
}) as any as S.Schema<CreateSpendingLimitResponse>;
export interface DeleteSpendingLimitRequest {
  spendingLimitArn: string;
}
export const DeleteSpendingLimitRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spendingLimitArn: S.String.pipe(T.HttpLabel("spendingLimitArn")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/spending-limit/{spendingLimitArn}/delete",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSpendingLimitRequest",
}) as any as S.Schema<DeleteSpendingLimitRequest>;
export interface DeleteSpendingLimitResponse {}
export const DeleteSpendingLimitResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteSpendingLimitResponse",
}) as any as S.Schema<DeleteSpendingLimitResponse>;
export interface GetDeviceRequest {
  deviceArn: string;
}
export const GetDeviceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ deviceArn: S.String.pipe(T.HttpLabel("deviceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/device/{deviceArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDeviceRequest",
}) as any as S.Schema<GetDeviceRequest>;
export type DeviceType = string;
export type DeviceStatus = string;
export type QueueName = string;
export type QueuePriority = string;
export interface DeviceQueueInfo {
  queue: string;
  queueSize: string;
  queuePriority?: string;
}
export const DeviceQueueInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    queue: S.String,
    queueSize: S.String,
    queuePriority: S.optional(S.String),
  }),
).annotate({
  identifier: "DeviceQueueInfo",
}) as any as S.Schema<DeviceQueueInfo>;
export type DeviceQueueInfoList = DeviceQueueInfo[];
export const DeviceQueueInfoList = /*@__PURE__*/ S.Array(DeviceQueueInfo);
export interface GetDeviceResponse {
  deviceArn: string;
  deviceName: string;
  providerName: string;
  deviceType: string;
  deviceStatus: string;
  deviceCapabilities: string;
  deviceQueueInfo?: DeviceQueueInfo[];
}
export const GetDeviceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deviceArn: S.String,
    deviceName: S.String,
    providerName: S.String,
    deviceType: S.String,
    deviceStatus: S.String,
    deviceCapabilities: S.String,
    deviceQueueInfo: S.optional(DeviceQueueInfoList),
  }),
).annotate({
  identifier: "GetDeviceResponse",
}) as any as S.Schema<GetDeviceResponse>;
export type HybridJobAdditionalAttributeName = string;
export type HybridJobAdditionalAttributeNamesList = string[];
export const HybridJobAdditionalAttributeNamesList = /*@__PURE__*/ S.Array(
  S.String,
);
export interface GetJobRequest {
  jobArn: string;
  additionalAttributeNames?: string[];
}
export const GetJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobArn: S.String.pipe(T.HttpLabel("jobArn")),
    additionalAttributeNames: S.optional(
      HybridJobAdditionalAttributeNamesList,
    ).pipe(T.HttpQuery("additionalAttributeNames")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/job/{jobArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetJobRequest" }) as any as S.Schema<GetJobRequest>;
export type JobPrimaryStatus = string;
export type String1024 = string;
export type JobEventType = string;
export interface JobEventDetails {
  eventType?: string;
  timeOfEvent?: Date;
  message?: string;
}
export const JobEventDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    eventType: S.optional(S.String),
    timeOfEvent: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    message: S.optional(S.String),
  }),
).annotate({
  identifier: "JobEventDetails",
}) as any as S.Schema<JobEventDetails>;
export type JobEvents = JobEventDetails[];
export const JobEvents = /*@__PURE__*/ S.Array(JobEventDetails);
export interface HybridJobQueueInfo {
  queue: string;
  position: string;
  message?: string;
}
export const HybridJobQueueInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    queue: S.String,
    position: S.String,
    message: S.optional(S.String),
  }),
).annotate({
  identifier: "HybridJobQueueInfo",
}) as any as S.Schema<HybridJobQueueInfo>;
export interface GetJobResponse {
  status: string;
  jobArn: string;
  roleArn: string;
  failureReason?: string;
  jobName: string;
  hyperParameters?: { [key: string]: string | undefined };
  inputDataConfig?: InputFileConfig[];
  outputDataConfig: JobOutputDataConfig;
  stoppingCondition?: JobStoppingCondition;
  checkpointConfig?: JobCheckpointConfig;
  algorithmSpecification: AlgorithmSpecification;
  instanceConfig: InstanceConfig;
  createdAt: Date;
  startedAt?: Date;
  endedAt?: Date;
  billableDuration?: number;
  deviceConfig?: DeviceConfig;
  events?: JobEventDetails[];
  tags?: { [key: string]: string | undefined };
  queueInfo?: HybridJobQueueInfo;
  associations?: Association[];
}
export const GetJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.String,
    jobArn: S.String,
    roleArn: S.String,
    failureReason: S.optional(S.String),
    jobName: S.String,
    hyperParameters: S.optional(HyperParameters),
    inputDataConfig: S.optional(InputConfigList),
    outputDataConfig: JobOutputDataConfig,
    stoppingCondition: S.optional(JobStoppingCondition),
    checkpointConfig: S.optional(JobCheckpointConfig),
    algorithmSpecification: AlgorithmSpecification,
    instanceConfig: InstanceConfig,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    startedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    endedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    billableDuration: S.optional(S.Number),
    deviceConfig: S.optional(DeviceConfig),
    events: S.optional(JobEvents),
    tags: S.optional(TagsMap),
    queueInfo: S.optional(HybridJobQueueInfo),
    associations: S.optional(Associations),
  }),
).annotate({ identifier: "GetJobResponse" }) as any as S.Schema<GetJobResponse>;
export type QuantumTaskAdditionalAttributeName = string;
export type QuantumTaskAdditionalAttributeNamesList = string[];
export const QuantumTaskAdditionalAttributeNamesList = /*@__PURE__*/ S.Array(
  S.String,
);
export interface GetQuantumTaskRequest {
  quantumTaskArn: string;
  additionalAttributeNames?: string[];
}
export const GetQuantumTaskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    quantumTaskArn: S.String.pipe(T.HttpLabel("quantumTaskArn")),
    additionalAttributeNames: S.optional(
      QuantumTaskAdditionalAttributeNamesList,
    ).pipe(T.HttpQuery("additionalAttributeNames")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/quantum-task/{quantumTaskArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetQuantumTaskRequest",
}) as any as S.Schema<GetQuantumTaskRequest>;
export type QuantumTaskStatus = string;
export interface QuantumTaskQueueInfo {
  queue: string;
  position: string;
  queuePriority?: string;
  message?: string;
}
export const QuantumTaskQueueInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    queue: S.String,
    position: S.String,
    queuePriority: S.optional(S.String),
    message: S.optional(S.String),
  }),
).annotate({
  identifier: "QuantumTaskQueueInfo",
}) as any as S.Schema<QuantumTaskQueueInfo>;
export interface ActionMetadata {
  actionType: string;
  programCount?: number;
  executableCount?: number;
}
export const ActionMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    actionType: S.String,
    programCount: S.optional(S.Number),
    executableCount: S.optional(S.Number),
  }),
).annotate({ identifier: "ActionMetadata" }) as any as S.Schema<ActionMetadata>;
export interface GetQuantumTaskResponse {
  quantumTaskArn: string;
  status: string;
  failureReason?: string;
  deviceArn: string;
  deviceParameters: string;
  shots: number;
  outputS3Bucket: string;
  outputS3Directory: string;
  createdAt: Date;
  endedAt?: Date;
  tags?: { [key: string]: string | undefined };
  jobArn?: string;
  queueInfo?: QuantumTaskQueueInfo;
  associations?: Association[];
  numSuccessfulShots?: number;
  actionMetadata?: ActionMetadata;
  experimentalCapabilities?: ExperimentalCapabilities;
}
export const GetQuantumTaskResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    quantumTaskArn: S.String,
    status: S.String,
    failureReason: S.optional(S.String),
    deviceArn: S.String,
    deviceParameters: S.String,
    shots: S.Number,
    outputS3Bucket: S.String,
    outputS3Directory: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    endedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    tags: S.optional(TagsMap),
    jobArn: S.optional(S.String),
    queueInfo: S.optional(QuantumTaskQueueInfo),
    associations: S.optional(Associations),
    numSuccessfulShots: S.optional(S.Number),
    actionMetadata: S.optional(ActionMetadata),
    experimentalCapabilities: S.optional(ExperimentalCapabilities),
  }),
).annotate({
  identifier: "GetQuantumTaskResponse",
}) as any as S.Schema<GetQuantumTaskResponse>;
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
export type String256List = string[];
export const String256List = /*@__PURE__*/ S.Array(S.String);
export interface SearchDevicesFilter {
  name: string;
  values: string[];
}
export const SearchDevicesFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, values: String256List }),
).annotate({
  identifier: "SearchDevicesFilter",
}) as any as S.Schema<SearchDevicesFilter>;
export type SearchDevicesFilterList = SearchDevicesFilter[];
export const SearchDevicesFilterList =
  /*@__PURE__*/ S.Array(SearchDevicesFilter);
export interface SearchDevicesRequest {
  nextToken?: string;
  maxResults?: number;
  filters: SearchDevicesFilter[];
}
export const SearchDevicesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
    filters: SearchDevicesFilterList,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/devices" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SearchDevicesRequest",
}) as any as S.Schema<SearchDevicesRequest>;
export interface DeviceSummary {
  deviceArn: string;
  deviceName: string;
  providerName: string;
  deviceType: string;
  deviceStatus: string;
}
export const DeviceSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deviceArn: S.String,
    deviceName: S.String,
    providerName: S.String,
    deviceType: S.String,
    deviceStatus: S.String,
  }),
).annotate({ identifier: "DeviceSummary" }) as any as S.Schema<DeviceSummary>;
export type DeviceSummaryList = DeviceSummary[];
export const DeviceSummaryList = /*@__PURE__*/ S.Array(DeviceSummary);
export interface SearchDevicesResponse {
  devices: DeviceSummary[];
  nextToken?: string;
}
export const SearchDevicesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ devices: DeviceSummaryList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "SearchDevicesResponse",
}) as any as S.Schema<SearchDevicesResponse>;
export type SearchJobsFilterOperator = string;
export interface SearchJobsFilter {
  name: string;
  values: string[];
  operator: string;
}
export const SearchJobsFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, values: String256List, operator: S.String }),
).annotate({
  identifier: "SearchJobsFilter",
}) as any as S.Schema<SearchJobsFilter>;
export type SearchJobsFilterList = SearchJobsFilter[];
export const SearchJobsFilterList = /*@__PURE__*/ S.Array(SearchJobsFilter);
export interface SearchJobsRequest {
  nextToken?: string;
  maxResults?: number;
  filters: SearchJobsFilter[];
}
export const SearchJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
    filters: SearchJobsFilterList,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/jobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SearchJobsRequest",
}) as any as S.Schema<SearchJobsRequest>;
export interface JobSummary {
  status: string;
  jobArn: string;
  jobName: string;
  device: string;
  createdAt: Date;
  startedAt?: Date;
  endedAt?: Date;
  tags?: { [key: string]: string | undefined };
}
export const JobSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.String,
    jobArn: S.String,
    jobName: S.String,
    device: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    startedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    endedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    tags: S.optional(TagsMap),
  }),
).annotate({ identifier: "JobSummary" }) as any as S.Schema<JobSummary>;
export type JobSummaryList = JobSummary[];
export const JobSummaryList = /*@__PURE__*/ S.Array(JobSummary);
export interface SearchJobsResponse {
  jobs: JobSummary[];
  nextToken?: string;
}
export const SearchJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobs: JobSummaryList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "SearchJobsResponse",
}) as any as S.Schema<SearchJobsResponse>;
export type SearchQuantumTasksFilterOperator = string;
export interface SearchQuantumTasksFilter {
  name: string;
  values: string[];
  operator: string;
}
export const SearchQuantumTasksFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, values: String256List, operator: S.String }),
).annotate({
  identifier: "SearchQuantumTasksFilter",
}) as any as S.Schema<SearchQuantumTasksFilter>;
export type SearchQuantumTasksFilterList = SearchQuantumTasksFilter[];
export const SearchQuantumTasksFilterList = /*@__PURE__*/ S.Array(
  SearchQuantumTasksFilter,
);
export interface SearchQuantumTasksRequest {
  nextToken?: string;
  maxResults?: number;
  filters: SearchQuantumTasksFilter[];
}
export const SearchQuantumTasksRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
    filters: SearchQuantumTasksFilterList,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/quantum-tasks" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SearchQuantumTasksRequest",
}) as any as S.Schema<SearchQuantumTasksRequest>;
export interface QuantumTaskSummary {
  quantumTaskArn: string;
  status: string;
  deviceArn: string;
  shots: number;
  outputS3Bucket: string;
  outputS3Directory: string;
  createdAt: Date;
  endedAt?: Date;
  tags?: { [key: string]: string | undefined };
}
export const QuantumTaskSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    quantumTaskArn: S.String,
    status: S.String,
    deviceArn: S.String,
    shots: S.Number,
    outputS3Bucket: S.String,
    outputS3Directory: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    endedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    tags: S.optional(TagsMap),
  }),
).annotate({
  identifier: "QuantumTaskSummary",
}) as any as S.Schema<QuantumTaskSummary>;
export type QuantumTaskSummaryList = QuantumTaskSummary[];
export const QuantumTaskSummaryList = /*@__PURE__*/ S.Array(QuantumTaskSummary);
export interface SearchQuantumTasksResponse {
  quantumTasks: QuantumTaskSummary[];
  nextToken?: string;
}
export const SearchQuantumTasksResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    quantumTasks: QuantumTaskSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "SearchQuantumTasksResponse",
}) as any as S.Schema<SearchQuantumTasksResponse>;
export type SearchSpendingLimitsFilterOperator = string;
export interface SearchSpendingLimitsFilter {
  name: string;
  values: string[];
  operator: string;
}
export const SearchSpendingLimitsFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, values: String256List, operator: S.String }),
).annotate({
  identifier: "SearchSpendingLimitsFilter",
}) as any as S.Schema<SearchSpendingLimitsFilter>;
export type SearchSpendingLimitsFilterList = SearchSpendingLimitsFilter[];
export const SearchSpendingLimitsFilterList = /*@__PURE__*/ S.Array(
  SearchSpendingLimitsFilter,
);
export interface SearchSpendingLimitsRequest {
  nextToken?: string;
  maxResults?: number;
  filters?: SearchSpendingLimitsFilter[];
}
export const SearchSpendingLimitsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
    filters: S.optional(SearchSpendingLimitsFilterList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/spending-limits" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SearchSpendingLimitsRequest",
}) as any as S.Schema<SearchSpendingLimitsRequest>;
export interface SpendingLimitSummary {
  spendingLimitArn: string;
  deviceArn: string;
  timePeriod: TimePeriod;
  spendingLimit: string;
  queuedSpend: string;
  totalSpend: string;
  createdAt: Date;
  updatedAt: Date;
  tags?: { [key: string]: string | undefined };
}
export const SpendingLimitSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spendingLimitArn: S.String,
    deviceArn: S.String,
    timePeriod: TimePeriod,
    spendingLimit: S.String,
    queuedSpend: S.String,
    totalSpend: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    tags: S.optional(TagsMap),
  }),
).annotate({
  identifier: "SpendingLimitSummary",
}) as any as S.Schema<SpendingLimitSummary>;
export type SpendingLimitSummaryList = SpendingLimitSummary[];
export const SpendingLimitSummaryList =
  /*@__PURE__*/ S.Array(SpendingLimitSummary);
export interface SearchSpendingLimitsResponse {
  spendingLimits: SpendingLimitSummary[];
  nextToken?: string;
}
export const SearchSpendingLimitsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spendingLimits: SpendingLimitSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "SearchSpendingLimitsResponse",
}) as any as S.Schema<SearchSpendingLimitsResponse>;
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
export interface UpdateSpendingLimitRequest {
  spendingLimitArn: string;
  clientToken: string;
  spendingLimit?: string;
  timePeriod?: TimePeriod;
}
export const UpdateSpendingLimitRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spendingLimitArn: S.String.pipe(T.HttpLabel("spendingLimitArn")),
    clientToken: S.String.pipe(T.IdempotencyToken()),
    spendingLimit: S.optional(S.String),
    timePeriod: S.optional(TimePeriod),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/spending-limit/{spendingLimitArn}/update",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateSpendingLimitRequest",
}) as any as S.Schema<UpdateSpendingLimitRequest>;
export interface UpdateSpendingLimitResponse {}
export const UpdateSpendingLimitResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateSpendingLimitResponse",
}) as any as S.Schema<UpdateSpendingLimitResponse>;
export type ValidationExceptionReason = string;
export type ProgramValidationFailuresList = string[];
export const ProgramValidationFailuresList = /*@__PURE__*/ S.Array(S.String);
export interface ProgramSetValidationFailure {
  programIndex: number;
  inputsIndex?: number;
  errors?: string[];
}
export const ProgramSetValidationFailure = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    programIndex: S.Number,
    inputsIndex: S.optional(S.Number),
    errors: S.optional(ProgramValidationFailuresList),
  }),
).annotate({
  identifier: "ProgramSetValidationFailure",
}) as any as S.Schema<ProgramSetValidationFailure>;
export type ProgramSetValidationFailuresList = ProgramSetValidationFailure[];
export const ProgramSetValidationFailuresList = /*@__PURE__*/ S.Array(
  ProgramSetValidationFailure,
);
export type CancelJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServiceException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels an Amazon Braket hybrid job.
 */
export const cancelJob: API.OperationMethod<
  CancelJobRequest,
  CancelJobResponse,
  CancelJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelJobRequest,
  output: CancelJobResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelJob",
}));

export type CancelQuantumTaskError =
  | AccessDeniedException
  | ConflictException
  | InternalServiceException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels the specified task.
 */
export const cancelQuantumTask: API.OperationMethod<
  CancelQuantumTaskRequest,
  CancelQuantumTaskResponse,
  CancelQuantumTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelQuantumTaskRequest,
  output: CancelQuantumTaskResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelQuantumTask",
}));

export type CreateJobError =
  | AccessDeniedException
  | ConflictException
  | DeviceOfflineException
  | DeviceRetiredException
  | InternalServiceException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Amazon Braket hybrid job.
 */
export const createJob: API.OperationMethod<
  CreateJobRequest,
  CreateJobResponse,
  CreateJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateJobRequest,
  output: CreateJobResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    DeviceOfflineException,
    DeviceRetiredException,
    InternalServiceException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateJob",
}));

export type CreateQuantumTaskError =
  | AccessDeniedException
  | DeviceOfflineException
  | DeviceRetiredException
  | InternalServiceException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a quantum task.
 */
export const createQuantumTask: API.OperationMethod<
  CreateQuantumTaskRequest,
  CreateQuantumTaskResponse,
  CreateQuantumTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateQuantumTaskRequest,
  output: CreateQuantumTaskResponse,
  errors: [
    AccessDeniedException,
    DeviceOfflineException,
    DeviceRetiredException,
    InternalServiceException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateQuantumTask",
}));

export type CreateSpendingLimitError =
  | AccessDeniedException
  | DeviceRetiredException
  | InternalServiceException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a spending limit for a specified quantum device. Spending limits help you control costs by setting maximum amounts that can be spent on quantum computing tasks within a specified time period. Simulators do not support spending limits.
 */
export const createSpendingLimit: API.OperationMethod<
  CreateSpendingLimitRequest,
  CreateSpendingLimitResponse,
  CreateSpendingLimitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSpendingLimitRequest,
  output: CreateSpendingLimitResponse,
  errors: [
    AccessDeniedException,
    DeviceRetiredException,
    InternalServiceException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSpendingLimit",
}));

export type DeleteSpendingLimitError =
  | AccessDeniedException
  | InternalServiceException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an existing spending limit. This operation permanently removes the spending limit and cannot be undone. After deletion, the associated device becomes unrestricted for spending.
 */
export const deleteSpendingLimit: API.OperationMethod<
  DeleteSpendingLimitRequest,
  DeleteSpendingLimitResponse,
  DeleteSpendingLimitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSpendingLimitRequest,
  output: DeleteSpendingLimitResponse,
  errors: [
    AccessDeniedException,
    InternalServiceException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSpendingLimit",
}));

export type GetDeviceError =
  | AccessDeniedException
  | InternalServiceException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the devices available in Amazon Braket.
 *
 * For backwards compatibility with older versions of BraketSchemas, OpenQASM information is omitted from GetDevice API calls. To get this information the user-agent needs to present a recent version of the BraketSchemas (1.8.0 or later). The Braket SDK automatically reports this for you. If you do not see OpenQASM results in the GetDevice response when using a Braket SDK, you may need to set AWS_EXECUTION_ENV environment variable to configure user-agent. See the code examples provided below for how to do this for the AWS CLI, Boto3, and the Go, Java, and JavaScript/TypeScript SDKs.
 */
export const getDevice: API.OperationMethod<
  GetDeviceRequest,
  GetDeviceResponse,
  GetDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDeviceRequest,
  output: GetDeviceResponse,
  errors: [
    AccessDeniedException,
    InternalServiceException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDevice",
}));

export type GetJobError =
  | AccessDeniedException
  | InternalServiceException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the specified Amazon Braket hybrid job.
 */
export const getJob: API.OperationMethod<
  GetJobRequest,
  GetJobResponse,
  GetJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetJobRequest,
  output: GetJobResponse,
  errors: [
    AccessDeniedException,
    InternalServiceException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJob",
}));

export type GetQuantumTaskError =
  | AccessDeniedException
  | InternalServiceException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the specified quantum task.
 */
export const getQuantumTask: API.OperationMethod<
  GetQuantumTaskRequest,
  GetQuantumTaskResponse,
  GetQuantumTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetQuantumTaskRequest,
  output: GetQuantumTaskResponse,
  errors: [
    AccessDeniedException,
    InternalServiceException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQuantumTask",
}));

export type ListTagsForResourceError =
  | InternalServiceException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Shows the tags associated with this resource.
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
    InternalServiceException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type SearchDevicesError =
  | AccessDeniedException
  | InternalServiceException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Searches for devices using the specified filters.
 */
export const searchDevices: API.PaginatedOperationMethod<
  SearchDevicesRequest,
  SearchDevicesResponse,
  SearchDevicesError,
  Credentials | HttpClient.HttpClient,
  DeviceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: SearchDevicesRequest,
  output: SearchDevicesResponse,
  errors: [
    AccessDeniedException,
    InternalServiceException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchDevices",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "devices",
    pageSize: "maxResults",
  } as const,
})) as any;

export type SearchJobsError =
  | AccessDeniedException
  | InternalServiceException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Searches for Amazon Braket hybrid jobs that match the specified filter values.
 */
export const searchJobs: API.PaginatedOperationMethod<
  SearchJobsRequest,
  SearchJobsResponse,
  SearchJobsError,
  Credentials | HttpClient.HttpClient,
  JobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: SearchJobsRequest,
  output: SearchJobsResponse,
  errors: [
    AccessDeniedException,
    InternalServiceException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "jobs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type SearchQuantumTasksError =
  | AccessDeniedException
  | InternalServiceException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Searches for tasks that match the specified filter values.
 */
export const searchQuantumTasks: API.PaginatedOperationMethod<
  SearchQuantumTasksRequest,
  SearchQuantumTasksResponse,
  SearchQuantumTasksError,
  Credentials | HttpClient.HttpClient,
  QuantumTaskSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: SearchQuantumTasksRequest,
  output: SearchQuantumTasksResponse,
  errors: [
    AccessDeniedException,
    InternalServiceException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchQuantumTasks",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "quantumTasks",
    pageSize: "maxResults",
  } as const,
})) as any;

export type SearchSpendingLimitsError =
  | AccessDeniedException
  | InternalServiceException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Searches and lists spending limits based on specified filters. This operation supports pagination and allows filtering by various criteria to find specific spending limits. We recommend using pagination to ensure that the operation returns quickly and successfully.
 */
export const searchSpendingLimits: API.PaginatedOperationMethod<
  SearchSpendingLimitsRequest,
  SearchSpendingLimitsResponse,
  SearchSpendingLimitsError,
  Credentials | HttpClient.HttpClient,
  SpendingLimitSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: SearchSpendingLimitsRequest,
  output: SearchSpendingLimitsResponse,
  errors: [
    AccessDeniedException,
    InternalServiceException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchSpendingLimits",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "spendingLimits",
    pageSize: "maxResults",
  } as const,
})) as any;

export type TagResourceError =
  | InternalServiceException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Add a tag to the specified resource.
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
    InternalServiceException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InternalServiceException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Remove tags from a resource.
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
    InternalServiceException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateSpendingLimitError =
  | AccessDeniedException
  | InternalServiceException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing spending limit. You can modify the spending amount or time period. Changes take effect immediately.
 */
export const updateSpendingLimit: API.OperationMethod<
  UpdateSpendingLimitRequest,
  UpdateSpendingLimitResponse,
  UpdateSpendingLimitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSpendingLimitRequest,
  output: UpdateSpendingLimitResponse,
  errors: [
    AccessDeniedException,
    InternalServiceException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSpendingLimit",
}));
