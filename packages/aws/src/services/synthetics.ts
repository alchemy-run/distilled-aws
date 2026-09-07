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
  sdkId: "synthetics",
  serviceShapeName: "Synthetics",
});
const auth = T.AwsAuthSigv4({ name: "synthetics" });
const ver = T.ServiceVersion("2017-10-11");
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
              `https://synthetics-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://synthetics-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://synthetics.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://synthetics.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalFailureException
  extends /*@__PURE__*/ S.TaggedError<InternalFailureException>()(
    "InternalFailureException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class RequestEntityTooLargeException
  extends /*@__PURE__*/ S.TaggedError<RequestEntityTooLargeException>()(
    "RequestEntityTooLargeException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(413),
  ).pipe(C.withBadRequestError) {}
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
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type GroupIdentifier = string;
export type CanaryArn = string;
export interface AssociateResourceRequest {
  GroupIdentifier: string;
  ResourceArn: string;
}
export const AssociateResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupIdentifier: S.String.pipe(T.HttpLabel("GroupIdentifier")),
    ResourceArn: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/group/{GroupIdentifier}/associate" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateResourceRequest",
}) as any as S.Schema<AssociateResourceRequest>;
export interface AssociateResourceResponse {}
export const AssociateResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AssociateResourceResponse",
}) as any as S.Schema<AssociateResourceResponse>;
export type CanaryName = string;
export type CodeHandler = string;
export type BlueprintType = string;
export type BlueprintTypes = string[];
export const BlueprintTypes = /*@__PURE__*/ S.Array(S.String);
export type DependencyType = "LambdaLayer" | (string & {});
export const DependencyType = /*@__PURE__*/ S.String;

export interface Dependency {
  Type?: DependencyType;
  Reference: string;
}
export const Dependency = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Type: S.optional(DependencyType), Reference: S.String }),
).annotate({ identifier: "Dependency" }) as any as S.Schema<Dependency>;
export type Dependencies = Dependency[];
export const Dependencies = /*@__PURE__*/ S.Array(Dependency);
export interface CanaryCodeInput {
  S3Bucket?: string;
  S3Key?: string;
  S3Version?: string;
  ZipFile?: Uint8Array;
  Handler?: string;
  BlueprintTypes?: string[];
  Dependencies?: Dependency[];
}
export const CanaryCodeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    S3Bucket: S.optional(S.String),
    S3Key: S.optional(S.String),
    S3Version: S.optional(S.String),
    ZipFile: S.optional(T.Blob),
    Handler: S.optional(S.String),
    BlueprintTypes: S.optional(BlueprintTypes),
    Dependencies: S.optional(Dependencies),
  }),
).annotate({
  identifier: "CanaryCodeInput",
}) as any as S.Schema<CanaryCodeInput>;
export type RoleArn = string;
export type MaxOneYearInSeconds = number;
export type MaxRetries = number;
export interface RetryConfigInput {
  MaxRetries: number;
}
export const RetryConfigInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MaxRetries: S.Number }),
).annotate({
  identifier: "RetryConfigInput",
}) as any as S.Schema<RetryConfigInput>;
export interface CanaryScheduleInput {
  Expression: string;
  DurationInSeconds?: number;
  RetryConfig?: RetryConfigInput;
}
export const CanaryScheduleInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Expression: S.String,
    DurationInSeconds: S.optional(S.Number),
    RetryConfig: S.optional(RetryConfigInput),
  }),
).annotate({
  identifier: "CanaryScheduleInput",
}) as any as S.Schema<CanaryScheduleInput>;
export type MaxFifteenMinutesInSeconds = number;
export type MaxSize3008 = number;
export type EnvironmentVariableName = string;
export type EnvironmentVariableValue = string;
export type EnvironmentVariablesMap = { [key: string]: string | undefined };
export const EnvironmentVariablesMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type EphemeralStorageSize = number;
export interface CanaryRunConfigInput {
  TimeoutInSeconds?: number;
  MemoryInMB?: number;
  ActiveTracing?: boolean;
  EnvironmentVariables?: { [key: string]: string | undefined };
  EphemeralStorage?: number;
}
export const CanaryRunConfigInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TimeoutInSeconds: S.optional(S.Number),
    MemoryInMB: S.optional(S.Number),
    ActiveTracing: S.optional(S.Boolean),
    EnvironmentVariables: S.optional(EnvironmentVariablesMap),
    EphemeralStorage: S.optional(S.Number),
  }),
).annotate({
  identifier: "CanaryRunConfigInput",
}) as any as S.Schema<CanaryRunConfigInput>;
export type MaxSize1024 = number;
export type SubnetId = string;
export type SubnetIds = string[];
export const SubnetIds = /*@__PURE__*/ S.Array(S.String);
export type SecurityGroupId = string;
export type SecurityGroupIds = string[];
export const SecurityGroupIds = /*@__PURE__*/ S.Array(S.String);
export interface VpcConfigInput {
  SubnetIds?: string[];
  SecurityGroupIds?: string[];
  Ipv6AllowedForDualStack?: boolean;
}
export const VpcConfigInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SubnetIds: S.optional(SubnetIds),
    SecurityGroupIds: S.optional(SecurityGroupIds),
    Ipv6AllowedForDualStack: S.optional(S.Boolean),
  }),
).annotate({ identifier: "VpcConfigInput" }) as any as S.Schema<VpcConfigInput>;
export type ResourceToTag = "lambda-function" | (string & {});
export const ResourceToTag = /*@__PURE__*/ S.String;

export type ResourceList = ResourceToTag[];
export const ResourceList = /*@__PURE__*/ S.Array(ResourceToTag);
export type ProvisionedResourceCleanupSetting =
  | "AUTOMATIC"
  | "OFF"
  | (string & {});
export const ProvisionedResourceCleanupSetting = /*@__PURE__*/ S.String;

export type BrowserType = "CHROME" | "FIREFOX" | (string & {});
export const BrowserType = /*@__PURE__*/ S.String;

export interface BrowserConfig {
  BrowserType?: BrowserType;
}
export const BrowserConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BrowserType: S.optional(BrowserType) }),
).annotate({ identifier: "BrowserConfig" }) as any as S.Schema<BrowserConfig>;
export type BrowserConfigs = BrowserConfig[];
export const BrowserConfigs = /*@__PURE__*/ S.Array(BrowserConfig);
export type Location = string;
export interface AddReplicaLocationInput {
  Location: string;
  VpcConfig?: VpcConfigInput;
}
export const AddReplicaLocationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Location: S.String, VpcConfig: S.optional(VpcConfigInput) }),
).annotate({
  identifier: "AddReplicaLocationInput",
}) as any as S.Schema<AddReplicaLocationInput>;
export type AddReplicaLocations = AddReplicaLocationInput[];
export const AddReplicaLocations = /*@__PURE__*/ S.Array(
  AddReplicaLocationInput,
);
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type EncryptionMode = "SSE_S3" | "SSE_KMS" | (string & {});
export const EncryptionMode = /*@__PURE__*/ S.String;

export type KmsKeyArn = string;
export interface S3EncryptionConfig {
  EncryptionMode?: EncryptionMode;
  KmsKeyArn?: string;
}
export const S3EncryptionConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EncryptionMode: S.optional(EncryptionMode),
    KmsKeyArn: S.optional(S.String),
  }),
).annotate({
  identifier: "S3EncryptionConfig",
}) as any as S.Schema<S3EncryptionConfig>;
export interface ArtifactConfigInput {
  S3Encryption?: S3EncryptionConfig;
}
export const ArtifactConfigInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ S3Encryption: S.optional(S3EncryptionConfig) }),
).annotate({
  identifier: "ArtifactConfigInput",
}) as any as S.Schema<ArtifactConfigInput>;
export interface CreateCanaryRequest {
  Name: string;
  Code: CanaryCodeInput;
  ArtifactS3Location: string;
  ExecutionRoleArn: string;
  Schedule: CanaryScheduleInput;
  RunConfig?: CanaryRunConfigInput;
  SuccessRetentionPeriodInDays?: number;
  FailureRetentionPeriodInDays?: number;
  RuntimeVersion: string;
  VpcConfig?: VpcConfigInput;
  ResourcesToReplicateTags?: ResourceToTag[];
  ProvisionedResourceCleanup?: ProvisionedResourceCleanupSetting;
  BrowserConfigs?: BrowserConfig[];
  AddReplicaLocations?: AddReplicaLocationInput[];
  Tags?: { [key: string]: string | undefined };
  ArtifactConfig?: ArtifactConfigInput;
}
export const CreateCanaryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Code: CanaryCodeInput,
    ArtifactS3Location: S.String,
    ExecutionRoleArn: S.String,
    Schedule: CanaryScheduleInput,
    RunConfig: S.optional(CanaryRunConfigInput),
    SuccessRetentionPeriodInDays: S.optional(S.Number),
    FailureRetentionPeriodInDays: S.optional(S.Number),
    RuntimeVersion: S.String,
    VpcConfig: S.optional(VpcConfigInput),
    ResourcesToReplicateTags: S.optional(ResourceList),
    ProvisionedResourceCleanup: S.optional(ProvisionedResourceCleanupSetting),
    BrowserConfigs: S.optional(BrowserConfigs),
    AddReplicaLocations: S.optional(AddReplicaLocations),
    Tags: S.optional(TagMap),
    ArtifactConfig: S.optional(ArtifactConfigInput),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/canary" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateCanaryRequest",
}) as any as S.Schema<CreateCanaryRequest>;
export type UUID = string;
export interface CanaryCodeOutput {
  SourceLocationArn?: string;
  Handler?: string;
  BlueprintTypes?: string[];
  Dependencies?: Dependency[];
}
export const CanaryCodeOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceLocationArn: S.optional(S.String),
    Handler: S.optional(S.String),
    BlueprintTypes: S.optional(BlueprintTypes),
    Dependencies: S.optional(Dependencies),
  }),
).annotate({
  identifier: "CanaryCodeOutput",
}) as any as S.Schema<CanaryCodeOutput>;
export interface RetryConfigOutput {
  MaxRetries?: number;
}
export const RetryConfigOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MaxRetries: S.optional(S.Number) }),
).annotate({
  identifier: "RetryConfigOutput",
}) as any as S.Schema<RetryConfigOutput>;
export interface CanaryScheduleOutput {
  Expression?: string;
  DurationInSeconds?: number;
  RetryConfig?: RetryConfigOutput;
}
export const CanaryScheduleOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Expression: S.optional(S.String),
    DurationInSeconds: S.optional(S.Number),
    RetryConfig: S.optional(RetryConfigOutput),
  }),
).annotate({
  identifier: "CanaryScheduleOutput",
}) as any as S.Schema<CanaryScheduleOutput>;
export interface CanaryRunConfigOutput {
  TimeoutInSeconds?: number;
  MemoryInMB?: number;
  ActiveTracing?: boolean;
  EphemeralStorage?: number;
}
export const CanaryRunConfigOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TimeoutInSeconds: S.optional(S.Number),
    MemoryInMB: S.optional(S.Number),
    ActiveTracing: S.optional(S.Boolean),
    EphemeralStorage: S.optional(S.Number),
  }),
).annotate({
  identifier: "CanaryRunConfigOutput",
}) as any as S.Schema<CanaryRunConfigOutput>;
export type CanaryState =
  | "CREATING"
  | "READY"
  | "STARTING"
  | "RUNNING"
  | "UPDATING"
  | "STOPPING"
  | "STOPPED"
  | "ERROR"
  | "DELETING"
  | (string & {});
export const CanaryState = /*@__PURE__*/ S.String;

export type CanaryStateReasonCode =
  | "INVALID_PERMISSIONS"
  | "CREATE_PENDING"
  | "CREATE_IN_PROGRESS"
  | "CREATE_FAILED"
  | "UPDATE_PENDING"
  | "UPDATE_IN_PROGRESS"
  | "UPDATE_COMPLETE"
  | "ROLLBACK_COMPLETE"
  | "ROLLBACK_FAILED"
  | "DELETE_IN_PROGRESS"
  | "DELETE_FAILED"
  | "SYNC_DELETE_IN_PROGRESS"
  | (string & {});
export const CanaryStateReasonCode = /*@__PURE__*/ S.String;

export interface CanaryStatus {
  State?: CanaryState;
  StateReason?: string;
  StateReasonCode?: CanaryStateReasonCode;
}
export const CanaryStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    State: S.optional(CanaryState),
    StateReason: S.optional(S.String),
    StateReasonCode: S.optional(CanaryStateReasonCode),
  }),
).annotate({ identifier: "CanaryStatus" }) as any as S.Schema<CanaryStatus>;
export interface CanaryTimeline {
  Created?: Date;
  LastModified?: Date;
  LastStarted?: Date;
  LastStopped?: Date;
}
export const CanaryTimeline = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModified: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastStarted: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastStopped: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "CanaryTimeline" }) as any as S.Schema<CanaryTimeline>;
export type FunctionArn = string;
export type VpcId = string;
export interface VpcConfigOutput {
  VpcId?: string;
  SubnetIds?: string[];
  SecurityGroupIds?: string[];
  Ipv6AllowedForDualStack?: boolean;
}
export const VpcConfigOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VpcId: S.optional(S.String),
    SubnetIds: S.optional(SubnetIds),
    SecurityGroupIds: S.optional(SecurityGroupIds),
    Ipv6AllowedForDualStack: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "VpcConfigOutput",
}) as any as S.Schema<VpcConfigOutput>;
export type BaseScreenshotConfigIgnoreCoordinate = string;
export type BaseScreenshotIgnoreCoordinates = string[];
export const BaseScreenshotIgnoreCoordinates = /*@__PURE__*/ S.Array(S.String);
export interface BaseScreenshot {
  ScreenshotName: string;
  IgnoreCoordinates?: string[];
}
export const BaseScreenshot = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ScreenshotName: S.String,
    IgnoreCoordinates: S.optional(BaseScreenshotIgnoreCoordinates),
  }),
).annotate({ identifier: "BaseScreenshot" }) as any as S.Schema<BaseScreenshot>;
export type BaseScreenshots = BaseScreenshot[];
export const BaseScreenshots = /*@__PURE__*/ S.Array(BaseScreenshot);
export interface VisualReferenceOutput {
  BaseScreenshots?: BaseScreenshot[];
  BaseCanaryRunId?: string;
  BrowserType?: BrowserType;
}
export const VisualReferenceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BaseScreenshots: S.optional(BaseScreenshots),
    BaseCanaryRunId: S.optional(S.String),
    BrowserType: S.optional(BrowserType),
  }),
).annotate({
  identifier: "VisualReferenceOutput",
}) as any as S.Schema<VisualReferenceOutput>;
export interface EngineConfig {
  EngineArn?: string;
  BrowserType?: BrowserType;
}
export const EngineConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EngineArn: S.optional(S.String),
    BrowserType: S.optional(BrowserType),
  }),
).annotate({ identifier: "EngineConfig" }) as any as S.Schema<EngineConfig>;
export type EngineConfigs = EngineConfig[];
export const EngineConfigs = /*@__PURE__*/ S.Array(EngineConfig);
export type VisualReferencesOutput = VisualReferenceOutput[];
export const VisualReferencesOutput = /*@__PURE__*/ S.Array(
  VisualReferenceOutput,
);
export type LocationType = "Primary" | "Replica" | (string & {});
export const LocationType = /*@__PURE__*/ S.String;

export type ReplicationState =
  | "InProgress"
  | "InSync"
  | "Inconsistent"
  | (string & {});
export const ReplicationState = /*@__PURE__*/ S.String;

export interface ReplicationStatus {
  State?: ReplicationState;
  StateReason?: string;
  StateReasonCode?: string;
}
export const ReplicationStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    State: S.optional(ReplicationState),
    StateReason: S.optional(S.String),
    StateReasonCode: S.optional(S.String),
  }),
).annotate({
  identifier: "ReplicationStatus",
}) as any as S.Schema<ReplicationStatus>;
export interface Replica {
  Location?: string;
  ReplicationStatus?: ReplicationStatus;
  CanaryState?: CanaryState;
  LastModified?: Date;
  VpcConfig?: VpcConfigOutput;
}
export const Replica = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Location: S.optional(S.String),
    ReplicationStatus: S.optional(ReplicationStatus),
    CanaryState: S.optional(CanaryState),
    LastModified: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    VpcConfig: S.optional(VpcConfigOutput),
  }),
).annotate({ identifier: "Replica" }) as any as S.Schema<Replica>;
export type Replicas = Replica[];
export const Replicas = /*@__PURE__*/ S.Array(Replica);
export interface MultiLocationConfig {
  LocationType?: LocationType;
  PrimaryLocation?: string;
  Replicas?: Replica[];
  ReplicationState?: ReplicationState;
}
export const MultiLocationConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LocationType: S.optional(LocationType),
    PrimaryLocation: S.optional(S.String),
    Replicas: S.optional(Replicas),
    ReplicationState: S.optional(ReplicationState),
  }),
).annotate({
  identifier: "MultiLocationConfig",
}) as any as S.Schema<MultiLocationConfig>;
export interface ArtifactConfigOutput {
  S3Encryption?: S3EncryptionConfig;
}
export const ArtifactConfigOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ S3Encryption: S.optional(S3EncryptionConfig) }),
).annotate({
  identifier: "ArtifactConfigOutput",
}) as any as S.Schema<ArtifactConfigOutput>;
export interface DryRunConfigOutput {
  DryRunId?: string;
  LastDryRunExecutionStatus?: string;
}
export const DryRunConfigOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DryRunId: S.optional(S.String),
    LastDryRunExecutionStatus: S.optional(S.String),
  }),
).annotate({
  identifier: "DryRunConfigOutput",
}) as any as S.Schema<DryRunConfigOutput>;
export interface Canary {
  Id?: string;
  Name?: string;
  Code?: CanaryCodeOutput;
  ExecutionRoleArn?: string;
  Schedule?: CanaryScheduleOutput;
  RunConfig?: CanaryRunConfigOutput;
  SuccessRetentionPeriodInDays?: number;
  FailureRetentionPeriodInDays?: number;
  Status?: CanaryStatus;
  Timeline?: CanaryTimeline;
  ArtifactS3Location?: string;
  EngineArn?: string;
  RuntimeVersion?: string;
  VpcConfig?: VpcConfigOutput;
  VisualReference?: VisualReferenceOutput;
  ProvisionedResourceCleanup?: ProvisionedResourceCleanupSetting;
  BrowserConfigs?: BrowserConfig[];
  EngineConfigs?: EngineConfig[];
  VisualReferences?: VisualReferenceOutput[];
  MultiLocationConfig?: MultiLocationConfig;
  Tags?: { [key: string]: string | undefined };
  ArtifactConfig?: ArtifactConfigOutput;
  DryRunConfig?: DryRunConfigOutput;
}
export const Canary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Code: S.optional(CanaryCodeOutput),
    ExecutionRoleArn: S.optional(S.String),
    Schedule: S.optional(CanaryScheduleOutput),
    RunConfig: S.optional(CanaryRunConfigOutput),
    SuccessRetentionPeriodInDays: S.optional(S.Number),
    FailureRetentionPeriodInDays: S.optional(S.Number),
    Status: S.optional(CanaryStatus),
    Timeline: S.optional(CanaryTimeline),
    ArtifactS3Location: S.optional(S.String),
    EngineArn: S.optional(S.String),
    RuntimeVersion: S.optional(S.String),
    VpcConfig: S.optional(VpcConfigOutput),
    VisualReference: S.optional(VisualReferenceOutput),
    ProvisionedResourceCleanup: S.optional(ProvisionedResourceCleanupSetting),
    BrowserConfigs: S.optional(BrowserConfigs),
    EngineConfigs: S.optional(EngineConfigs),
    VisualReferences: S.optional(VisualReferencesOutput),
    MultiLocationConfig: S.optional(MultiLocationConfig),
    Tags: S.optional(TagMap),
    ArtifactConfig: S.optional(ArtifactConfigOutput),
    DryRunConfig: S.optional(DryRunConfigOutput),
  }),
).annotate({ identifier: "Canary" }) as any as S.Schema<Canary>;
export interface CreateCanaryResponse {
  Canary?: Canary;
}
export const CreateCanaryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Canary: S.optional(Canary) }),
).annotate({
  identifier: "CreateCanaryResponse",
}) as any as S.Schema<CreateCanaryResponse>;
export type GroupName = string;
export interface CreateGroupRequest {
  Name: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Tags: S.optional(TagMap) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/group" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateGroupRequest",
}) as any as S.Schema<CreateGroupRequest>;
export type GroupArn = string;
export interface Group {
  Id?: string;
  Name?: string;
  Arn?: string;
  Tags?: { [key: string]: string | undefined };
  CreatedTime?: Date;
  LastModifiedTime?: Date;
}
export const Group = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Arn: S.optional(S.String),
    Tags: S.optional(TagMap),
    CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "Group" }) as any as S.Schema<Group>;
export interface CreateGroupResponse {
  Group?: Group;
}
export const CreateGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Group: S.optional(Group) }),
).annotate({
  identifier: "CreateGroupResponse",
}) as any as S.Schema<CreateGroupResponse>;
export interface DeleteCanaryRequest {
  Name: string;
  DeleteLambda?: boolean;
}
export const DeleteCanaryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String.pipe(T.HttpLabel("Name")),
    DeleteLambda: S.optional(S.Boolean).pipe(T.HttpQuery("deleteLambda")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/canary/{Name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteCanaryRequest",
}) as any as S.Schema<DeleteCanaryRequest>;
export interface DeleteCanaryResponse {}
export const DeleteCanaryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteCanaryResponse",
}) as any as S.Schema<DeleteCanaryResponse>;
export interface DeleteGroupRequest {
  GroupIdentifier: string;
}
export const DeleteGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupIdentifier: S.String.pipe(T.HttpLabel("GroupIdentifier")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/group/{GroupIdentifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteGroupRequest",
}) as any as S.Schema<DeleteGroupRequest>;
export interface DeleteGroupResponse {}
export const DeleteGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteGroupResponse",
}) as any as S.Schema<DeleteGroupResponse>;
export type Token = string;
export type MaxCanaryResults = number;
export type DescribeCanariesNameFilter = string[];
export const DescribeCanariesNameFilter = /*@__PURE__*/ S.Array(S.String);
export interface DescribeCanariesRequest {
  NextToken?: string;
  MaxResults?: number;
  Names?: string[];
}
export const DescribeCanariesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    Names: S.optional(DescribeCanariesNameFilter),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/canaries" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeCanariesRequest",
}) as any as S.Schema<DescribeCanariesRequest>;
export type Canaries = Canary[];
export const Canaries = /*@__PURE__*/ S.Array(Canary);
export interface DescribeCanariesResponse {
  Canaries?: Canary[];
  NextToken?: string;
}
export const DescribeCanariesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Canaries: S.optional(Canaries), NextToken: S.optional(S.String) }),
).annotate({
  identifier: "DescribeCanariesResponse",
}) as any as S.Schema<DescribeCanariesResponse>;
export type MaxSize100 = number;
export type DescribeCanariesLastRunNameFilter = string[];
export const DescribeCanariesLastRunNameFilter = /*@__PURE__*/ S.Array(
  S.String,
);
export interface DescribeCanariesLastRunRequest {
  NextToken?: string;
  MaxResults?: number;
  Names?: string[];
  BrowserType?: BrowserType;
}
export const DescribeCanariesLastRunRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    Names: S.optional(DescribeCanariesLastRunNameFilter),
    BrowserType: S.optional(BrowserType),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/canaries/last-run" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeCanariesLastRunRequest",
}) as any as S.Schema<DescribeCanariesLastRunRequest>;
export type RetryAttempt = number;
export type CanaryRunState = "RUNNING" | "PASSED" | "FAILED" | (string & {});
export const CanaryRunState = /*@__PURE__*/ S.String;

export type CanaryRunStateReasonCode =
  | "CANARY_FAILURE"
  | "EXECUTION_FAILURE"
  | (string & {});
export const CanaryRunStateReasonCode = /*@__PURE__*/ S.String;

export type CanaryRunTestResult =
  | "PASSED"
  | "FAILED"
  | "UNKNOWN"
  | (string & {});
export const CanaryRunTestResult = /*@__PURE__*/ S.String;

export interface CanaryRunStatus {
  State?: CanaryRunState;
  StateReason?: string;
  StateReasonCode?: CanaryRunStateReasonCode;
  TestResult?: CanaryRunTestResult;
}
export const CanaryRunStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    State: S.optional(CanaryRunState),
    StateReason: S.optional(S.String),
    StateReasonCode: S.optional(CanaryRunStateReasonCode),
    TestResult: S.optional(CanaryRunTestResult),
  }),
).annotate({
  identifier: "CanaryRunStatus",
}) as any as S.Schema<CanaryRunStatus>;
export interface CanaryRunTimeline {
  Started?: Date;
  Completed?: Date;
  MetricTimestampForRunAndRetries?: Date;
}
export const CanaryRunTimeline = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Started: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Completed: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    MetricTimestampForRunAndRetries: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "CanaryRunTimeline",
}) as any as S.Schema<CanaryRunTimeline>;
export interface CanaryDryRunConfigOutput {
  DryRunId?: string;
}
export const CanaryDryRunConfigOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DryRunId: S.optional(S.String) }),
).annotate({
  identifier: "CanaryDryRunConfigOutput",
}) as any as S.Schema<CanaryDryRunConfigOutput>;
export interface CanaryRun {
  Id?: string;
  ScheduledRunId?: string;
  RetryAttempt?: number;
  Name?: string;
  Status?: CanaryRunStatus;
  Timeline?: CanaryRunTimeline;
  ArtifactS3Location?: string;
  DryRunConfig?: CanaryDryRunConfigOutput;
  BrowserType?: BrowserType;
  Location?: string;
}
export const CanaryRun = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    ScheduledRunId: S.optional(S.String),
    RetryAttempt: S.optional(S.Number),
    Name: S.optional(S.String),
    Status: S.optional(CanaryRunStatus),
    Timeline: S.optional(CanaryRunTimeline),
    ArtifactS3Location: S.optional(S.String),
    DryRunConfig: S.optional(CanaryDryRunConfigOutput),
    BrowserType: S.optional(BrowserType),
    Location: S.optional(S.String),
  }),
).annotate({ identifier: "CanaryRun" }) as any as S.Schema<CanaryRun>;
export interface CanaryLastRun {
  CanaryName?: string;
  LastRun?: CanaryRun;
}
export const CanaryLastRun = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CanaryName: S.optional(S.String),
    LastRun: S.optional(CanaryRun),
  }),
).annotate({ identifier: "CanaryLastRun" }) as any as S.Schema<CanaryLastRun>;
export type CanariesLastRun = CanaryLastRun[];
export const CanariesLastRun = /*@__PURE__*/ S.Array(CanaryLastRun);
export interface DescribeCanariesLastRunResponse {
  CanariesLastRun?: CanaryLastRun[];
  NextToken?: string;
}
export const DescribeCanariesLastRunResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CanariesLastRun: S.optional(CanariesLastRun),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeCanariesLastRunResponse",
}) as any as S.Schema<DescribeCanariesLastRunResponse>;
export interface DescribeRuntimeVersionsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const DescribeRuntimeVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/runtime-versions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeRuntimeVersionsRequest",
}) as any as S.Schema<DescribeRuntimeVersionsRequest>;
export interface RuntimeVersion {
  VersionName?: string;
  Description?: string;
  ReleaseDate?: Date;
  DeprecationDate?: Date;
}
export const RuntimeVersion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VersionName: S.optional(S.String),
    Description: S.optional(S.String),
    ReleaseDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DeprecationDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "RuntimeVersion" }) as any as S.Schema<RuntimeVersion>;
export type RuntimeVersionList = RuntimeVersion[];
export const RuntimeVersionList = /*@__PURE__*/ S.Array(RuntimeVersion);
export interface DescribeRuntimeVersionsResponse {
  RuntimeVersions?: RuntimeVersion[];
  NextToken?: string;
}
export const DescribeRuntimeVersionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuntimeVersions: S.optional(RuntimeVersionList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeRuntimeVersionsResponse",
}) as any as S.Schema<DescribeRuntimeVersionsResponse>;
export interface DisassociateResourceRequest {
  GroupIdentifier: string;
  ResourceArn: string;
}
export const DisassociateResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupIdentifier: S.String.pipe(T.HttpLabel("GroupIdentifier")),
    ResourceArn: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/group/{GroupIdentifier}/disassociate" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateResourceRequest",
}) as any as S.Schema<DisassociateResourceRequest>;
export interface DisassociateResourceResponse {}
export const DisassociateResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisassociateResourceResponse",
}) as any as S.Schema<DisassociateResourceResponse>;
export interface GetCanaryRequest {
  Name: string;
  DryRunId?: string;
}
export const GetCanaryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String.pipe(T.HttpLabel("Name")),
    DryRunId: S.optional(S.String).pipe(T.HttpQuery("dryRunId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/canary/{Name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCanaryRequest",
}) as any as S.Schema<GetCanaryRequest>;
export interface GetCanaryResponse {
  Canary?: Canary;
}
export const GetCanaryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Canary: S.optional(Canary) }),
).annotate({
  identifier: "GetCanaryResponse",
}) as any as S.Schema<GetCanaryResponse>;
export type RunType = "CANARY_RUN" | "DRY_RUN" | (string & {});
export const RunType = /*@__PURE__*/ S.String;

export interface GetCanaryRunsRequest {
  Name: string;
  NextToken?: string;
  MaxResults?: number;
  DryRunId?: string;
  RunType?: RunType;
}
export const GetCanaryRunsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String.pipe(T.HttpLabel("Name")),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    DryRunId: S.optional(S.String),
    RunType: S.optional(RunType),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/canary/{Name}/runs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCanaryRunsRequest",
}) as any as S.Schema<GetCanaryRunsRequest>;
export type CanaryRuns = CanaryRun[];
export const CanaryRuns = /*@__PURE__*/ S.Array(CanaryRun);
export interface GetCanaryRunsResponse {
  CanaryRuns?: CanaryRun[];
  NextToken?: string;
}
export const GetCanaryRunsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CanaryRuns: S.optional(CanaryRuns),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetCanaryRunsResponse",
}) as any as S.Schema<GetCanaryRunsResponse>;
export interface GetGroupRequest {
  GroupIdentifier: string;
}
export const GetGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupIdentifier: S.String.pipe(T.HttpLabel("GroupIdentifier")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/group/{GroupIdentifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetGroupRequest",
}) as any as S.Schema<GetGroupRequest>;
export interface GetGroupResponse {
  Group?: Group;
}
export const GetGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Group: S.optional(Group) }),
).annotate({
  identifier: "GetGroupResponse",
}) as any as S.Schema<GetGroupResponse>;
export type PaginationToken = string;
export type MaxGroupResults = number;
export interface ListAssociatedGroupsRequest {
  NextToken?: string;
  MaxResults?: number;
  ResourceArn: string;
}
export const ListAssociatedGroupsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/resource/{ResourceArn}/groups" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAssociatedGroupsRequest",
}) as any as S.Schema<ListAssociatedGroupsRequest>;
export interface GroupSummary {
  Id?: string;
  Name?: string;
  Arn?: string;
}
export const GroupSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Arn: S.optional(S.String),
  }),
).annotate({ identifier: "GroupSummary" }) as any as S.Schema<GroupSummary>;
export type GroupSummaryList = GroupSummary[];
export const GroupSummaryList = /*@__PURE__*/ S.Array(GroupSummary);
export interface ListAssociatedGroupsResponse {
  Groups?: GroupSummary[];
  NextToken?: string;
}
export const ListAssociatedGroupsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Groups: S.optional(GroupSummaryList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAssociatedGroupsResponse",
}) as any as S.Schema<ListAssociatedGroupsResponse>;
export interface ListGroupResourcesRequest {
  NextToken?: string;
  MaxResults?: number;
  GroupIdentifier: string;
}
export const ListGroupResourcesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    GroupIdentifier: S.String.pipe(T.HttpLabel("GroupIdentifier")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/group/{GroupIdentifier}/resources" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListGroupResourcesRequest",
}) as any as S.Schema<ListGroupResourcesRequest>;
export type StringList = string[];
export const StringList = /*@__PURE__*/ S.Array(S.String);
export interface ListGroupResourcesResponse {
  Resources?: string[];
  NextToken?: string;
}
export const ListGroupResourcesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Resources: S.optional(StringList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListGroupResourcesResponse",
}) as any as S.Schema<ListGroupResourcesResponse>;
export interface ListGroupsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListGroupsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/groups" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListGroupsRequest",
}) as any as S.Schema<ListGroupsRequest>;
export interface ListGroupsResponse {
  Groups?: GroupSummary[];
  NextToken?: string;
}
export const ListGroupsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Groups: S.optional(GroupSummaryList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListGroupsResponse",
}) as any as S.Schema<ListGroupsResponse>;
export type ResourceArn = string;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/tags/{ResourceArn}" }),
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
  Tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(TagMap) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface StartCanaryRequest {
  Name: string;
}
export const StartCanaryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/canary/{Name}/start" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartCanaryRequest",
}) as any as S.Schema<StartCanaryRequest>;
export interface StartCanaryResponse {}
export const StartCanaryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StartCanaryResponse",
}) as any as S.Schema<StartCanaryResponse>;
export interface VisualReferenceInput {
  BaseScreenshots?: BaseScreenshot[];
  BaseCanaryRunId: string;
  BrowserType?: BrowserType;
}
export const VisualReferenceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BaseScreenshots: S.optional(BaseScreenshots),
    BaseCanaryRunId: S.String,
    BrowserType: S.optional(BrowserType),
  }),
).annotate({
  identifier: "VisualReferenceInput",
}) as any as S.Schema<VisualReferenceInput>;
export type VisualReferences = VisualReferenceInput[];
export const VisualReferences = /*@__PURE__*/ S.Array(VisualReferenceInput);
export interface StartCanaryDryRunRequest {
  Name: string;
  Code?: CanaryCodeInput;
  RuntimeVersion?: string;
  RunConfig?: CanaryRunConfigInput;
  VpcConfig?: VpcConfigInput;
  ExecutionRoleArn?: string;
  SuccessRetentionPeriodInDays?: number;
  FailureRetentionPeriodInDays?: number;
  VisualReference?: VisualReferenceInput;
  ArtifactS3Location?: string;
  ArtifactConfig?: ArtifactConfigInput;
  ProvisionedResourceCleanup?: ProvisionedResourceCleanupSetting;
  BrowserConfigs?: BrowserConfig[];
  VisualReferences?: VisualReferenceInput[];
}
export const StartCanaryDryRunRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String.pipe(T.HttpLabel("Name")),
    Code: S.optional(CanaryCodeInput),
    RuntimeVersion: S.optional(S.String),
    RunConfig: S.optional(CanaryRunConfigInput),
    VpcConfig: S.optional(VpcConfigInput),
    ExecutionRoleArn: S.optional(S.String),
    SuccessRetentionPeriodInDays: S.optional(S.Number),
    FailureRetentionPeriodInDays: S.optional(S.Number),
    VisualReference: S.optional(VisualReferenceInput),
    ArtifactS3Location: S.optional(S.String),
    ArtifactConfig: S.optional(ArtifactConfigInput),
    ProvisionedResourceCleanup: S.optional(ProvisionedResourceCleanupSetting),
    BrowserConfigs: S.optional(BrowserConfigs),
    VisualReferences: S.optional(VisualReferences),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/canary/{Name}/dry-run/start" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartCanaryDryRunRequest",
}) as any as S.Schema<StartCanaryDryRunRequest>;
export interface StartCanaryDryRunResponse {
  DryRunConfig?: DryRunConfigOutput;
}
export const StartCanaryDryRunResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DryRunConfig: S.optional(DryRunConfigOutput) }),
).annotate({
  identifier: "StartCanaryDryRunResponse",
}) as any as S.Schema<StartCanaryDryRunResponse>;
export interface StopCanaryRequest {
  Name: string;
}
export const StopCanaryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/canary/{Name}/stop" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopCanaryRequest",
}) as any as S.Schema<StopCanaryRequest>;
export interface StopCanaryResponse {}
export const StopCanaryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StopCanaryResponse",
}) as any as S.Schema<StopCanaryResponse>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    Tags: TagMap,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/tags/{ResourceArn}" }),
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
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    TagKeys: TagKeyList.pipe(T.HttpQuery("tagKeys")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/tags/{ResourceArn}" }),
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
export type RemoveReplicaLocations = string[];
export const RemoveReplicaLocations = /*@__PURE__*/ S.Array(S.String);
export interface UpdateCanaryRequest {
  Name: string;
  Code?: CanaryCodeInput;
  ExecutionRoleArn?: string;
  RuntimeVersion?: string;
  Schedule?: CanaryScheduleInput;
  RunConfig?: CanaryRunConfigInput;
  SuccessRetentionPeriodInDays?: number;
  FailureRetentionPeriodInDays?: number;
  VpcConfig?: VpcConfigInput;
  VisualReference?: VisualReferenceInput;
  ArtifactS3Location?: string;
  ArtifactConfig?: ArtifactConfigInput;
  ProvisionedResourceCleanup?: ProvisionedResourceCleanupSetting;
  DryRunId?: string;
  VisualReferences?: VisualReferenceInput[];
  BrowserConfigs?: BrowserConfig[];
  AddReplicaLocations?: AddReplicaLocationInput[];
  RemoveReplicaLocations?: string[];
}
export const UpdateCanaryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String.pipe(T.HttpLabel("Name")),
    Code: S.optional(CanaryCodeInput),
    ExecutionRoleArn: S.optional(S.String),
    RuntimeVersion: S.optional(S.String),
    Schedule: S.optional(CanaryScheduleInput),
    RunConfig: S.optional(CanaryRunConfigInput),
    SuccessRetentionPeriodInDays: S.optional(S.Number),
    FailureRetentionPeriodInDays: S.optional(S.Number),
    VpcConfig: S.optional(VpcConfigInput),
    VisualReference: S.optional(VisualReferenceInput),
    ArtifactS3Location: S.optional(S.String),
    ArtifactConfig: S.optional(ArtifactConfigInput),
    ProvisionedResourceCleanup: S.optional(ProvisionedResourceCleanupSetting),
    DryRunId: S.optional(S.String),
    VisualReferences: S.optional(VisualReferences),
    BrowserConfigs: S.optional(BrowserConfigs),
    AddReplicaLocations: S.optional(AddReplicaLocations),
    RemoveReplicaLocations: S.optional(RemoveReplicaLocations),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/canary/{Name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateCanaryRequest",
}) as any as S.Schema<UpdateCanaryRequest>;
export interface UpdateCanaryResponse {}
export const UpdateCanaryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateCanaryResponse",
}) as any as S.Schema<UpdateCanaryResponse>;
export type ErrorMessage = string;
export type AssociateResourceError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Associates a canary with a group. Using groups can help you with
 * managing and automating your canaries, and you can also view aggregated run results and statistics
 * for all canaries in a group.
 *
 * You must run this operation in the Region where the canary exists.
 */
export const associateResource: API.OperationMethod<
  AssociateResourceRequest,
  AssociateResourceResponse,
  AssociateResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateResourceRequest,
  output: AssociateResourceResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateResource",
}));

export type CreateCanaryError =
  | InternalServerException
  | RequestEntityTooLargeException
  | ValidationException
  | CommonErrors;
/**
 * Creates a canary. Canaries are scripts that monitor your endpoints and APIs from the
 * outside-in. Canaries help you check the availability and latency of your web services and
 * troubleshoot anomalies by investigating load time data, screenshots of the UI, logs, and
 * metrics. You can set up a canary to run continuously or just once.
 *
 * Do not use `CreateCanary` to modify an existing canary. Use UpdateCanary instead.
 *
 * To create canaries, you must have the `CloudWatchSyntheticsFullAccess` policy.
 * If you are creating a new IAM role for the canary, you also need the
 * `iam:CreateRole`, `iam:CreatePolicy` and
 * `iam:AttachRolePolicy` permissions. For more information, see Necessary
 * Roles and Permissions.
 *
 * Do not include secrets or proprietary information in your canary names. The canary name
 * makes up part of the Amazon Resource Name (ARN) for the canary, and the ARN is included in
 * outbound calls over the internet. For more information, see Security
 * Considerations for Synthetics Canaries.
 */
export const createCanary: API.OperationMethod<
  CreateCanaryRequest,
  CreateCanaryResponse,
  CreateCanaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCanaryRequest,
  output: CreateCanaryResponse,
  errors: [
    InternalServerException,
    RequestEntityTooLargeException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCanary",
}));

export type CreateGroupError =
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a group which you can use to associate canaries with each other, including cross-Region
 * canaries. Using groups can help you with
 * managing and automating your canaries, and you can also view aggregated run results and statistics
 * for all canaries in a group.
 *
 * Groups are global resources. When you create a group, it is replicated across Amazon Web Services Regions, and
 * you can view it and add canaries to it from any Region.
 * Although the group ARN format reflects the Region name where it was created, a group is not constrained to any Region.
 * This means that you can put canaries from multiple Regions into the same group, and then use
 * that group to view and manage all of those canaries in a single view.
 *
 * Groups are supported in all Regions except the Regions that are disabled by default. For more information
 * about these Regions, see Enabling a Region.
 *
 * Each group can contain as many as 10 canaries. You can have as many as 20 groups in your account. Any single canary
 * can be a member of up to 10 groups.
 */
export const createGroup: API.OperationMethod<
  CreateGroupRequest,
  CreateGroupResponse,
  CreateGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateGroupRequest,
  output: CreateGroupResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGroup",
}));

export type DeleteCanaryError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Permanently deletes the specified canary.
 *
 * If the canary's `ProvisionedResourceCleanup` field is set to `AUTOMATIC`
 * or you specify `DeleteLambda` in this operation as `true`, CloudWatch Synthetics also deletes
 * the Lambda functions and layers that are used by the canary.
 *
 * Other resources used and created by the canary are not automatically deleted.
 * After you delete a canary, you
 * should also delete the following:
 *
 * - The CloudWatch alarms created for this canary. These alarms have a name of
 * Synthetics-Alarm-*first-198-characters-of-canary-name*-*canaryId*-*alarm number*
 *
 * - Amazon S3 objects and buckets, such as the canary's artifact location.
 *
 * - IAM roles created for the canary. If they were created in the console, these roles
 * have the name
 * role/service-role/CloudWatchSyntheticsRole-*First-21-Characters-of-CanaryName*
 *
 * - CloudWatch Logs log groups created for the canary. These logs groups have the name
 * /aws/lambda/cwsyn-*First-21-Characters-of-CanaryName*
 *
 * Before you delete a canary, you might want to use `GetCanary` to display
 * the information about this canary. Make
 * note of the information returned by this operation so that you can delete these resources
 * after you delete the canary.
 */
export const deleteCanary: API.OperationMethod<
  DeleteCanaryRequest,
  DeleteCanaryResponse,
  DeleteCanaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCanaryRequest,
  output: DeleteCanaryResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCanary",
}));

export type DeleteGroupError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a group. The group doesn't need to be empty to be deleted. If there are canaries in the group,
 * they are not deleted when you delete the group.
 *
 * Groups are a global resource that appear in all Regions, but the request to delete a group
 * must be made from its home Region. You can find the home Region of a group within its ARN.
 */
export const deleteGroup: API.OperationMethod<
  DeleteGroupRequest,
  DeleteGroupResponse,
  DeleteGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteGroupRequest,
  output: DeleteGroupResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGroup",
}));

export type DescribeCanariesError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * This operation returns a list of the canaries in your account, along with full details
 * about each canary.
 *
 * This operation supports resource-level authorization using an IAM policy and
 * the `Names` parameter. If you specify the `Names` parameter, the operation is successful only if you have authorization to view
 * all the canaries that you specify in your request. If you do not have permission to view any of
 * the canaries, the request fails with a 403 response.
 *
 * You are required to use the `Names` parameter if you are logged on to a user or role that has an
 * IAM policy that restricts which canaries that you are allowed to view. For more information,
 * see
 * Limiting a user to viewing specific canaries.
 */
export const describeCanaries: API.PaginatedOperationMethod<
  DescribeCanariesRequest,
  DescribeCanariesResponse,
  DescribeCanariesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeCanariesRequest,
  output: DescribeCanariesResponse,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCanaries",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeCanariesLastRunError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Use this operation to see information from the most recent run of each canary that you have created.
 *
 * This operation supports resource-level authorization using an IAM policy and
 * the `Names` parameter. If you specify the `Names` parameter, the operation is successful only if you have authorization to view
 * all the canaries that you specify in your request. If you do not have permission to view any of
 * the canaries, the request fails with a 403 response.
 *
 * You are required to use the `Names` parameter if you are logged on to a user or role that has an
 * IAM policy that restricts which canaries that you are allowed to view. For more information,
 * see
 * Limiting a user to viewing specific canaries.
 */
export const describeCanariesLastRun: API.PaginatedOperationMethod<
  DescribeCanariesLastRunRequest,
  DescribeCanariesLastRunResponse,
  DescribeCanariesLastRunError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeCanariesLastRunRequest,
  output: DescribeCanariesLastRunResponse,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCanariesLastRun",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeRuntimeVersionsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of Synthetics canary runtime versions. For more information,
 * see
 * Canary Runtime Versions.
 */
export const describeRuntimeVersions: API.PaginatedOperationMethod<
  DescribeRuntimeVersionsRequest,
  DescribeRuntimeVersionsResponse,
  DescribeRuntimeVersionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeRuntimeVersionsRequest,
  output: DescribeRuntimeVersionsResponse,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRuntimeVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DisassociateResourceError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes a canary from a group. You must run this operation in the Region where the canary exists.
 */
export const disassociateResource: API.OperationMethod<
  DisassociateResourceRequest,
  DisassociateResourceResponse,
  DisassociateResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateResourceRequest,
  output: DisassociateResourceResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateResource",
}));

export type GetCanaryError =
  | InternalServerException
  | ValidationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves complete information about one canary. You must specify
 * the name of the canary that you want. To get a list of canaries
 * and their names, use DescribeCanaries.
 */
export const getCanary: API.OperationMethod<
  GetCanaryRequest,
  GetCanaryResponse,
  GetCanaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCanaryRequest,
  output: GetCanaryResponse,
  errors: [
    InternalServerException,
    ValidationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCanary",
}));

export type GetCanaryRunsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of runs for a specified canary.
 */
export const getCanaryRuns: API.PaginatedOperationMethod<
  GetCanaryRunsRequest,
  GetCanaryRunsResponse,
  GetCanaryRunsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetCanaryRunsRequest,
  output: GetCanaryRunsResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCanaryRuns",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetGroupError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about one group. Groups are a global resource, so you can use this operation from
 * any Region.
 */
export const getGroup: API.OperationMethod<
  GetGroupRequest,
  GetGroupResponse,
  GetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetGroupRequest,
  output: GetGroupResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGroup",
}));

export type ListAssociatedGroupsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of the groups that the specified canary is associated with. The canary
 * that you specify must be in the current Region.
 */
export const listAssociatedGroups: API.PaginatedOperationMethod<
  ListAssociatedGroupsRequest,
  ListAssociatedGroupsResponse,
  ListAssociatedGroupsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAssociatedGroupsRequest,
  output: ListAssociatedGroupsResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssociatedGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListGroupResourcesError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * This operation returns a list of the ARNs of the canaries that are associated with the specified group.
 */
export const listGroupResources: API.PaginatedOperationMethod<
  ListGroupResourcesRequest,
  ListGroupResourcesResponse,
  ListGroupResourcesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListGroupResourcesRequest,
  output: ListGroupResourcesResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGroupResources",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListGroupsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of all groups in the account, displaying their names, unique IDs, and ARNs. The groups
 * from all Regions are returned.
 */
export const listGroups: API.PaginatedOperationMethod<
  ListGroupsRequest,
  ListGroupsResponse,
  ListGroupsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListGroupsRequest,
  output: ListGroupsResponse,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Displays the tags associated with a canary or group.
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
    BadRequestException,
    ConflictException,
    InternalFailureException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type StartCanaryError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Use this operation to run a canary that has already been created.
 * The frequency of the canary runs is determined by the value of the canary's `Schedule`. To see a canary's schedule,
 * use GetCanary.
 */
export const startCanary: API.OperationMethod<
  StartCanaryRequest,
  StartCanaryResponse,
  StartCanaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartCanaryRequest,
  output: StartCanaryResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartCanary",
}));

export type StartCanaryDryRunError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Use this operation to start a dry run for a canary that has already been created
 */
export const startCanaryDryRun: API.OperationMethod<
  StartCanaryDryRunRequest,
  StartCanaryDryRunResponse,
  StartCanaryDryRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartCanaryDryRunRequest,
  output: StartCanaryDryRunResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartCanaryDryRun",
}));

export type StopCanaryError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Stops the canary to prevent all future runs. If the canary is currently running,the
 * run that is in progress completes on its own, publishes metrics, and uploads artifacts, but
 * it is not recorded in Synthetics as a completed run.
 *
 * You can use `StartCanary` to start it running again
 * with the canary’s current schedule at any point in the future.
 */
export const stopCanary: API.OperationMethod<
  StopCanaryRequest,
  StopCanaryResponse,
  StopCanaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopCanaryRequest,
  output: StopCanaryResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopCanary",
}));

export type TagResourceError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Assigns one or more tags (key-value pairs) to the specified canary or group.
 *
 * Tags can help you organize and categorize your
 * resources. You can also use them to scope user permissions, by granting a user permission to access or change only resources with
 * certain tag values.
 *
 * Tags don't have any semantic meaning to Amazon Web Services and are interpreted strictly as strings of characters.
 *
 * You can use the `TagResource` action with a resource that already has tags. If you specify a new
 * tag key for the resource,
 * this tag is appended to the list of tags associated
 * with the resource. If you specify a tag key that is already associated with the resource, the new tag
 * value that you specify replaces
 * the previous value for that tag.
 *
 * You can associate as many as 50 tags with a canary or group.
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
    BadRequestException,
    ConflictException,
    InternalFailureException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes one or more tags from the specified resource.
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
    BadRequestException,
    ConflictException,
    InternalFailureException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateCanaryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestEntityTooLargeException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of a canary that has already been created.
 *
 * For multibrowser canaries, you can add or remove browsers by updating the browserConfig list in the update call. For example:
 *
 * - To add Firefox to a canary that currently uses Chrome, specify browserConfigs as [CHROME, FIREFOX]
 *
 * - To remove Firefox and keep only Chrome, specify browserConfigs as [CHROME]
 *
 * You can't use this operation to update the tags of an existing canary. To change the tags of an existing canary, use
 * TagResource.
 *
 * When you use the `dryRunId` field when updating a canary, the only other field you can provide is the `Schedule`. Adding any other field will thrown an exception.
 */
export const updateCanary: API.OperationMethod<
  UpdateCanaryRequest,
  UpdateCanaryResponse,
  UpdateCanaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCanaryRequest,
  output: UpdateCanaryResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestEntityTooLargeException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCanary",
}));
