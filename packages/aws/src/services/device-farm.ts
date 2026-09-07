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
const ns = T.XmlNamespace("http://devicefarm.amazonaws.com/doc/2015-06-23/");
const svc = T.AwsApiService({
  sdkId: "Device Farm",
  serviceShapeName: "DeviceFarm_20150623",
});
const auth = T.AwsAuthSigv4({ name: "devicefarm" });
const ver = T.ServiceVersion("2015-06-23");
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
              `https://devicefarm-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://devicefarm-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://devicefarm.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://devicefarm.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class ArgumentException
  extends /*@__PURE__*/ S.TaggedError<ArgumentException>()(
    "ArgumentException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class CannotDeleteException
  extends /*@__PURE__*/ S.TaggedError<CannotDeleteException>()(
    "CannotDeleteException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class IdempotencyException
  extends /*@__PURE__*/ S.TaggedError<IdempotencyException>()(
    "IdempotencyException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InternalServiceException
  extends /*@__PURE__*/ S.TaggedError<InternalServiceException>()(
    "InternalServiceException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidOperationException
  extends /*@__PURE__*/ S.TaggedError<InvalidOperationException>()(
    "InvalidOperationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class NotEligibleException
  extends /*@__PURE__*/ S.TaggedError<NotEligibleException>()(
    "NotEligibleException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ServiceAccountException
  extends /*@__PURE__*/ S.TaggedError<ServiceAccountException>()(
    "ServiceAccountException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class TagOperationException
  extends /*@__PURE__*/ S.TaggedError<TagOperationException>()(
    "TagOperationException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      resourceName: S.optional(S.String),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TagPolicyException
  extends /*@__PURE__*/ S.TaggedError<TagPolicyException>()(
    "TagPolicyException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      resourceName: S.optional(S.String),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      resourceName: S.optional(S.String),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type AmazonResourceName = string;
export type Name = string;
export type Message = string;
export type DeviceAttribute =
  | "ARN"
  | "PLATFORM"
  | "FORM_FACTOR"
  | "MANUFACTURER"
  | "REMOTE_ACCESS_ENABLED"
  | "REMOTE_DEBUG_ENABLED"
  | "APPIUM_VERSION"
  | "INSTANCE_ARN"
  | "INSTANCE_LABELS"
  | "FLEET_TYPE"
  | "OS_VERSION"
  | "MODEL"
  | "AVAILABILITY"
  | (string & {});
export const DeviceAttribute = S.String;

export type RuleOperator =
  | "EQUALS"
  | "LESS_THAN"
  | "LESS_THAN_OR_EQUALS"
  | "GREATER_THAN"
  | "GREATER_THAN_OR_EQUALS"
  | "IN"
  | "NOT_IN"
  | "CONTAINS"
  | (string & {});
export const RuleOperator = S.String;

export interface Rule {
  attribute?: DeviceAttribute;
  operator?: RuleOperator;
  value?: string;
}
export const Rule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    attribute: S.optional(DeviceAttribute),
    operator: S.optional(RuleOperator),
    value: S.optional(S.String),
  }),
).annotate({ identifier: "Rule" }) as any as S.Schema<Rule>;
export type Rules = Rule[];
export const Rules = /*@__PURE__*/ S.Array(Rule);
export interface CreateDevicePoolRequest {
  projectArn: string;
  name: string;
  description?: string;
  rules: Rule[];
  maxDevices?: number;
}
export const CreateDevicePoolRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    projectArn: S.String,
    name: S.String,
    description: S.optional(S.String),
    rules: Rules,
    maxDevices: S.optional(S.Number),
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
  identifier: "CreateDevicePoolRequest",
}) as any as S.Schema<CreateDevicePoolRequest>;
export type DevicePoolType = "CURATED" | "PRIVATE" | (string & {});
export const DevicePoolType = S.String;

export interface DevicePool {
  arn?: string;
  name?: string;
  description?: string;
  type?: DevicePoolType;
  rules?: Rule[];
  maxDevices?: number;
}
export const DevicePool = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    type: S.optional(DevicePoolType),
    rules: S.optional(Rules),
    maxDevices: S.optional(S.Number),
  }),
).annotate({ identifier: "DevicePool" }) as any as S.Schema<DevicePool>;
export interface CreateDevicePoolResult {
  devicePool?: DevicePool;
}
export const CreateDevicePoolResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ devicePool: S.optional(DevicePool) }).pipe(ns),
).annotate({
  identifier: "CreateDevicePoolResult",
}) as any as S.Schema<CreateDevicePoolResult>;
export type PackageIds = string[];
export const PackageIds = /*@__PURE__*/ S.Array(S.String);
export interface CreateInstanceProfileRequest {
  name: string;
  description?: string;
  packageCleanup?: boolean;
  excludeAppPackagesFromCleanup?: string[];
  rebootAfterUse?: boolean;
}
export const CreateInstanceProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    packageCleanup: S.optional(S.Boolean),
    excludeAppPackagesFromCleanup: S.optional(PackageIds),
    rebootAfterUse: S.optional(S.Boolean),
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
  identifier: "CreateInstanceProfileRequest",
}) as any as S.Schema<CreateInstanceProfileRequest>;
export interface InstanceProfile {
  arn?: string;
  packageCleanup?: boolean;
  excludeAppPackagesFromCleanup?: string[];
  rebootAfterUse?: boolean;
  name?: string;
  description?: string;
}
export const InstanceProfile = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    packageCleanup: S.optional(S.Boolean),
    excludeAppPackagesFromCleanup: S.optional(PackageIds),
    rebootAfterUse: S.optional(S.Boolean),
    name: S.optional(S.String),
    description: S.optional(S.String),
  }),
).annotate({
  identifier: "InstanceProfile",
}) as any as S.Schema<InstanceProfile>;
export interface CreateInstanceProfileResult {
  instanceProfile?: InstanceProfile;
}
export const CreateInstanceProfileResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ instanceProfile: S.optional(InstanceProfile) }).pipe(ns),
).annotate({
  identifier: "CreateInstanceProfileResult",
}) as any as S.Schema<CreateInstanceProfileResult>;
export type NetworkProfileType = "CURATED" | "PRIVATE" | (string & {});
export const NetworkProfileType = S.String;

export type PercentInteger = number;
export interface CreateNetworkProfileRequest {
  projectArn: string;
  name: string;
  description?: string;
  type?: NetworkProfileType;
  uplinkBandwidthBits?: number;
  downlinkBandwidthBits?: number;
  uplinkDelayMs?: number;
  downlinkDelayMs?: number;
  uplinkJitterMs?: number;
  downlinkJitterMs?: number;
  uplinkLossPercent?: number;
  downlinkLossPercent?: number;
}
export const CreateNetworkProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    projectArn: S.String,
    name: S.String,
    description: S.optional(S.String),
    type: S.optional(NetworkProfileType),
    uplinkBandwidthBits: S.optional(S.Number),
    downlinkBandwidthBits: S.optional(S.Number),
    uplinkDelayMs: S.optional(S.Number),
    downlinkDelayMs: S.optional(S.Number),
    uplinkJitterMs: S.optional(S.Number),
    downlinkJitterMs: S.optional(S.Number),
    uplinkLossPercent: S.optional(S.Number),
    downlinkLossPercent: S.optional(S.Number),
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
  identifier: "CreateNetworkProfileRequest",
}) as any as S.Schema<CreateNetworkProfileRequest>;
export interface NetworkProfile {
  arn?: string;
  name?: string;
  description?: string;
  type?: NetworkProfileType;
  uplinkBandwidthBits?: number;
  downlinkBandwidthBits?: number;
  uplinkDelayMs?: number;
  downlinkDelayMs?: number;
  uplinkJitterMs?: number;
  downlinkJitterMs?: number;
  uplinkLossPercent?: number;
  downlinkLossPercent?: number;
}
export const NetworkProfile = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    type: S.optional(NetworkProfileType),
    uplinkBandwidthBits: S.optional(S.Number),
    downlinkBandwidthBits: S.optional(S.Number),
    uplinkDelayMs: S.optional(S.Number),
    downlinkDelayMs: S.optional(S.Number),
    uplinkJitterMs: S.optional(S.Number),
    downlinkJitterMs: S.optional(S.Number),
    uplinkLossPercent: S.optional(S.Number),
    downlinkLossPercent: S.optional(S.Number),
  }),
).annotate({ identifier: "NetworkProfile" }) as any as S.Schema<NetworkProfile>;
export interface CreateNetworkProfileResult {
  networkProfile?: NetworkProfile;
}
export const CreateNetworkProfileResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ networkProfile: S.optional(NetworkProfile) }).pipe(ns),
).annotate({
  identifier: "CreateNetworkProfileResult",
}) as any as S.Schema<CreateNetworkProfileResult>;
export type JobTimeoutMinutes = number;
export type SecurityGroupId = string;
export type VpcSecurityGroupIds = string[];
export const VpcSecurityGroupIds = /*@__PURE__*/ S.Array(S.String);
export type SubnetId = string;
export type VpcSubnetIds = string[];
export const VpcSubnetIds = /*@__PURE__*/ S.Array(S.String);
export type NonEmptyString = string;
export interface VpcConfig {
  securityGroupIds: string[];
  subnetIds: string[];
  vpcId: string;
}
export const VpcConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    securityGroupIds: VpcSecurityGroupIds,
    subnetIds: VpcSubnetIds,
    vpcId: S.String,
  }),
).annotate({ identifier: "VpcConfig" }) as any as S.Schema<VpcConfig>;
export type EnvironmentVariableName = string;
export type EnvironmentVariableValue = string;
export interface EnvironmentVariable {
  name: string;
  value: string;
}
export const EnvironmentVariable = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, value: S.String }),
).annotate({
  identifier: "EnvironmentVariable",
}) as any as S.Schema<EnvironmentVariable>;
export type EnvironmentVariables = EnvironmentVariable[];
export const EnvironmentVariables = /*@__PURE__*/ S.Array(EnvironmentVariable);
export type AmazonRoleResourceName = string;
export interface CreateProjectRequest {
  name: string;
  defaultJobTimeoutMinutes?: number;
  vpcConfig?: VpcConfig;
  environmentVariables?: EnvironmentVariable[];
  executionRoleArn?: string;
}
export const CreateProjectRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    defaultJobTimeoutMinutes: S.optional(S.Number),
    vpcConfig: S.optional(VpcConfig),
    environmentVariables: S.optional(EnvironmentVariables),
    executionRoleArn: S.optional(S.String),
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
  identifier: "CreateProjectRequest",
}) as any as S.Schema<CreateProjectRequest>;
export interface Project {
  arn?: string;
  name?: string;
  defaultJobTimeoutMinutes?: number;
  created?: Date;
  vpcConfig?: VpcConfig;
  environmentVariables?: EnvironmentVariable[];
  executionRoleArn?: string;
}
export const Project = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    name: S.optional(S.String),
    defaultJobTimeoutMinutes: S.optional(S.Number),
    created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    vpcConfig: S.optional(VpcConfig),
    environmentVariables: S.optional(EnvironmentVariables),
    executionRoleArn: S.optional(S.String),
  }),
).annotate({ identifier: "Project" }) as any as S.Schema<Project>;
export interface CreateProjectResult {
  project?: Project;
}
export const CreateProjectResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ project: S.optional(Project) }).pipe(ns),
).annotate({
  identifier: "CreateProjectResult",
}) as any as S.Schema<CreateProjectResult>;
export type AuxiliaryAppArnList = string[];
export const AuxiliaryAppArnList = /*@__PURE__*/ S.Array(S.String);
export type BillingMethod = "METERED" | "UNMETERED" | (string & {});
export const BillingMethod = S.String;

export type AmazonResourceNames = string[];
export const AmazonResourceNames = /*@__PURE__*/ S.Array(S.String);
export type DeviceProxyHost = string;
export type DeviceProxyPort = number;
export interface DeviceProxy {
  host: string;
  port: number;
}
export const DeviceProxy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ host: S.String, port: S.Number }),
).annotate({ identifier: "DeviceProxy" }) as any as S.Schema<DeviceProxy>;
export type RemoteAccessParameterKey = string;
export type RemoteAccessParameterValue = string;
export type RemoteAccessParameters = { [key: string]: string | undefined };
export const RemoteAccessParameters = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateRemoteAccessSessionConfiguration {
  auxiliaryApps?: string[];
  billingMethod?: BillingMethod;
  vpceConfigurationArns?: string[];
  deviceProxy?: DeviceProxy;
  parameters?: { [key: string]: string | undefined };
}
export const CreateRemoteAccessSessionConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      auxiliaryApps: S.optional(AuxiliaryAppArnList),
      billingMethod: S.optional(BillingMethod),
      vpceConfigurationArns: S.optional(AmazonResourceNames),
      deviceProxy: S.optional(DeviceProxy),
      parameters: S.optional(RemoteAccessParameters),
    }),
).annotate({
  identifier: "CreateRemoteAccessSessionConfiguration",
}) as any as S.Schema<CreateRemoteAccessSessionConfiguration>;
export type InteractionMode =
  | "INTERACTIVE"
  | "NO_VIDEO"
  | "VIDEO_ONLY"
  | (string & {});
export const InteractionMode = S.String;

export interface CreateRemoteAccessSessionRequest {
  projectArn: string;
  deviceArn: string;
  appArn?: string;
  instanceArn?: string;
  name?: string;
  configuration?: CreateRemoteAccessSessionConfiguration;
  interactionMode?: InteractionMode;
  skipAppResign?: boolean;
}
export const CreateRemoteAccessSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    projectArn: S.String,
    deviceArn: S.String,
    appArn: S.optional(S.String),
    instanceArn: S.optional(S.String),
    name: S.optional(S.String),
    configuration: S.optional(CreateRemoteAccessSessionConfiguration),
    interactionMode: S.optional(InteractionMode),
    skipAppResign: S.optional(S.Boolean),
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
  identifier: "CreateRemoteAccessSessionRequest",
}) as any as S.Schema<CreateRemoteAccessSessionRequest>;
export type ExecutionStatus =
  | "PENDING"
  | "PENDING_CONCURRENCY"
  | "PENDING_DEVICE"
  | "PROCESSING"
  | "SCHEDULING"
  | "PREPARING"
  | "RUNNING"
  | "COMPLETED"
  | "STOPPING"
  | (string & {});
export const ExecutionStatus = S.String;

export type ExecutionResult =
  | "PENDING"
  | "PASSED"
  | "WARNED"
  | "FAILED"
  | "SKIPPED"
  | "ERRORED"
  | "STOPPED"
  | (string & {});
export const ExecutionResult = S.String;

export type DeviceFormFactor = "PHONE" | "TABLET" | (string & {});
export const DeviceFormFactor = S.String;

export type DevicePlatform = "ANDROID" | "IOS" | (string & {});
export const DevicePlatform = S.String;

export interface CPU {
  frequency?: string;
  architecture?: string;
  clock?: number;
}
export const CPU = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    frequency: S.optional(S.String),
    architecture: S.optional(S.String),
    clock: S.optional(S.Number),
  }),
).annotate({ identifier: "CPU" }) as any as S.Schema<CPU>;
export interface Resolution {
  width?: number;
  height?: number;
}
export const Resolution = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ width: S.optional(S.Number), height: S.optional(S.Number) }),
).annotate({ identifier: "Resolution" }) as any as S.Schema<Resolution>;
export type InstanceLabels = string[];
export const InstanceLabels = /*@__PURE__*/ S.Array(S.String);
export type InstanceStatus =
  | "IN_USE"
  | "PREPARING"
  | "AVAILABLE"
  | "NOT_AVAILABLE"
  | (string & {});
export const InstanceStatus = S.String;

export interface DeviceInstance {
  arn?: string;
  deviceArn?: string;
  labels?: string[];
  status?: InstanceStatus;
  udid?: string;
  instanceProfile?: InstanceProfile;
}
export const DeviceInstance = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    deviceArn: S.optional(S.String),
    labels: S.optional(InstanceLabels),
    status: S.optional(InstanceStatus),
    udid: S.optional(S.String),
    instanceProfile: S.optional(InstanceProfile),
  }),
).annotate({ identifier: "DeviceInstance" }) as any as S.Schema<DeviceInstance>;
export type DeviceInstances = DeviceInstance[];
export const DeviceInstances = /*@__PURE__*/ S.Array(DeviceInstance);
export type DeviceAvailability =
  | "TEMPORARY_NOT_AVAILABLE"
  | "BUSY"
  | "AVAILABLE"
  | "HIGHLY_AVAILABLE"
  | (string & {});
export const DeviceAvailability = S.String;

export interface Device {
  arn?: string;
  name?: string;
  manufacturer?: string;
  model?: string;
  modelId?: string;
  formFactor?: DeviceFormFactor;
  platform?: DevicePlatform;
  os?: string;
  cpu?: CPU;
  resolution?: Resolution;
  heapSize?: number;
  memory?: number;
  image?: string;
  carrier?: string;
  radio?: string;
  remoteAccessEnabled?: boolean;
  remoteDebugEnabled?: boolean;
  fleetType?: string;
  fleetName?: string;
  instances?: DeviceInstance[];
  availability?: DeviceAvailability;
}
export const Device = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    name: S.optional(S.String),
    manufacturer: S.optional(S.String),
    model: S.optional(S.String),
    modelId: S.optional(S.String),
    formFactor: S.optional(DeviceFormFactor),
    platform: S.optional(DevicePlatform),
    os: S.optional(S.String),
    cpu: S.optional(CPU),
    resolution: S.optional(Resolution),
    heapSize: S.optional(S.Number),
    memory: S.optional(S.Number),
    image: S.optional(S.String),
    carrier: S.optional(S.String),
    radio: S.optional(S.String),
    remoteAccessEnabled: S.optional(S.Boolean),
    remoteDebugEnabled: S.optional(S.Boolean),
    fleetType: S.optional(S.String),
    fleetName: S.optional(S.String),
    instances: S.optional(DeviceInstances),
    availability: S.optional(DeviceAvailability),
  }),
).annotate({ identifier: "Device" }) as any as S.Schema<Device>;
export interface DeviceMinutes {
  total?: number;
  metered?: number;
  unmetered?: number;
}
export const DeviceMinutes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    total: S.optional(S.Number),
    metered: S.optional(S.Number),
    unmetered: S.optional(S.Number),
  }),
).annotate({ identifier: "DeviceMinutes" }) as any as S.Schema<DeviceMinutes>;
export type SkipAppResign = boolean;
export type SensitiveURL = string | redacted.Redacted<string>;
export interface RemoteAccessEndpoints {
  remoteDriverEndpoint?: string | redacted.Redacted<string>;
  interactiveEndpoint?: string | redacted.Redacted<string>;
}
export const RemoteAccessEndpoints = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    remoteDriverEndpoint: S.optional(SensitiveString),
    interactiveEndpoint: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "RemoteAccessEndpoints",
}) as any as S.Schema<RemoteAccessEndpoints>;
export interface RemoteAccessSession {
  arn?: string;
  name?: string;
  created?: Date;
  status?: ExecutionStatus;
  result?: ExecutionResult;
  message?: string;
  started?: Date;
  stopped?: Date;
  device?: Device;
  instanceArn?: string;
  billingMethod?: BillingMethod;
  deviceMinutes?: DeviceMinutes;
  endpoint?: string;
  deviceUdid?: string;
  interactionMode?: InteractionMode;
  skipAppResign?: boolean;
  vpcConfig?: VpcConfig;
  deviceProxy?: DeviceProxy;
  appUpload?: string;
  endpoints?: RemoteAccessEndpoints;
}
export const RemoteAccessSession = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    name: S.optional(S.String),
    created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    status: S.optional(ExecutionStatus),
    result: S.optional(ExecutionResult),
    message: S.optional(S.String),
    started: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    stopped: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    device: S.optional(Device),
    instanceArn: S.optional(S.String),
    billingMethod: S.optional(BillingMethod),
    deviceMinutes: S.optional(DeviceMinutes),
    endpoint: S.optional(S.String),
    deviceUdid: S.optional(S.String),
    interactionMode: S.optional(InteractionMode),
    skipAppResign: S.optional(S.Boolean),
    vpcConfig: S.optional(VpcConfig),
    deviceProxy: S.optional(DeviceProxy),
    appUpload: S.optional(S.String),
    endpoints: S.optional(RemoteAccessEndpoints),
  }),
).annotate({
  identifier: "RemoteAccessSession",
}) as any as S.Schema<RemoteAccessSession>;
export interface CreateRemoteAccessSessionResult {
  remoteAccessSession?: RemoteAccessSession;
}
export const CreateRemoteAccessSessionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ remoteAccessSession: S.optional(RemoteAccessSession) }).pipe(ns),
).annotate({
  identifier: "CreateRemoteAccessSessionResult",
}) as any as S.Schema<CreateRemoteAccessSessionResult>;
export type ResourceName = string;
export type ResourceDescription = string;
export type SecurityGroupIds = string[];
export const SecurityGroupIds = /*@__PURE__*/ S.Array(S.String);
export type SubnetIds = string[];
export const SubnetIds = /*@__PURE__*/ S.Array(S.String);
export interface TestGridVpcConfig {
  securityGroupIds: string[];
  subnetIds: string[];
  vpcId: string;
}
export const TestGridVpcConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    securityGroupIds: SecurityGroupIds,
    subnetIds: SubnetIds,
    vpcId: S.String,
  }),
).annotate({
  identifier: "TestGridVpcConfig",
}) as any as S.Schema<TestGridVpcConfig>;
export interface CreateTestGridProjectRequest {
  name: string;
  description?: string;
  vpcConfig?: TestGridVpcConfig;
}
export const CreateTestGridProjectRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    vpcConfig: S.optional(TestGridVpcConfig),
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
  identifier: "CreateTestGridProjectRequest",
}) as any as S.Schema<CreateTestGridProjectRequest>;
export type DeviceFarmArn = string;
export interface TestGridProject {
  arn?: string;
  name?: string;
  description?: string;
  vpcConfig?: TestGridVpcConfig;
  created?: Date;
}
export const TestGridProject = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    vpcConfig: S.optional(TestGridVpcConfig),
    created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "TestGridProject",
}) as any as S.Schema<TestGridProject>;
export interface CreateTestGridProjectResult {
  testGridProject?: TestGridProject;
}
export const CreateTestGridProjectResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ testGridProject: S.optional(TestGridProject) }).pipe(ns),
).annotate({
  identifier: "CreateTestGridProjectResult",
}) as any as S.Schema<CreateTestGridProjectResult>;
export type TestGridUrlExpiresInSecondsInput = number;
export interface CreateTestGridUrlRequest {
  projectArn: string;
  expiresInSeconds: number;
}
export const CreateTestGridUrlRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ projectArn: S.String, expiresInSeconds: S.Number }).pipe(
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
  identifier: "CreateTestGridUrlRequest",
}) as any as S.Schema<CreateTestGridUrlRequest>;
export type SensitiveString = string | redacted.Redacted<string>;
export interface CreateTestGridUrlResult {
  url?: string | redacted.Redacted<string>;
  expires?: Date;
}
export const CreateTestGridUrlResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    url: S.optional(SensitiveString),
    expires: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }).pipe(ns),
).annotate({
  identifier: "CreateTestGridUrlResult",
}) as any as S.Schema<CreateTestGridUrlResult>;
export type UploadType =
  | "ANDROID_APP"
  | "IOS_APP"
  | "WEB_APP"
  | "EXTERNAL_DATA"
  | "APPIUM_JAVA_JUNIT_TEST_PACKAGE"
  | "APPIUM_JAVA_TESTNG_TEST_PACKAGE"
  | "APPIUM_PYTHON_TEST_PACKAGE"
  | "APPIUM_NODE_TEST_PACKAGE"
  | "APPIUM_RUBY_TEST_PACKAGE"
  | "APPIUM_WEB_JAVA_JUNIT_TEST_PACKAGE"
  | "APPIUM_WEB_JAVA_TESTNG_TEST_PACKAGE"
  | "APPIUM_WEB_PYTHON_TEST_PACKAGE"
  | "APPIUM_WEB_NODE_TEST_PACKAGE"
  | "APPIUM_WEB_RUBY_TEST_PACKAGE"
  | "CALABASH_TEST_PACKAGE"
  | "INSTRUMENTATION_TEST_PACKAGE"
  | "UIAUTOMATION_TEST_PACKAGE"
  | "UIAUTOMATOR_TEST_PACKAGE"
  | "XCTEST_TEST_PACKAGE"
  | "XCTEST_UI_TEST_PACKAGE"
  | "APPIUM_JAVA_JUNIT_TEST_SPEC"
  | "APPIUM_JAVA_TESTNG_TEST_SPEC"
  | "APPIUM_PYTHON_TEST_SPEC"
  | "APPIUM_NODE_TEST_SPEC"
  | "APPIUM_RUBY_TEST_SPEC"
  | "APPIUM_WEB_JAVA_JUNIT_TEST_SPEC"
  | "APPIUM_WEB_JAVA_TESTNG_TEST_SPEC"
  | "APPIUM_WEB_PYTHON_TEST_SPEC"
  | "APPIUM_WEB_NODE_TEST_SPEC"
  | "APPIUM_WEB_RUBY_TEST_SPEC"
  | "INSTRUMENTATION_TEST_SPEC"
  | "XCTEST_UI_TEST_SPEC"
  | (string & {});
export const UploadType = S.String;

export type ContentType = string;
export interface CreateUploadRequest {
  projectArn: string;
  name: string;
  type: UploadType;
  contentType?: string;
}
export const CreateUploadRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    projectArn: S.String,
    name: S.String,
    type: UploadType,
    contentType: S.optional(S.String),
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
  identifier: "CreateUploadRequest",
}) as any as S.Schema<CreateUploadRequest>;
export type UploadStatus =
  | "INITIALIZED"
  | "PROCESSING"
  | "SUCCEEDED"
  | "FAILED"
  | (string & {});
export const UploadStatus = S.String;

export type Metadata = string;
export type UploadCategory = "CURATED" | "PRIVATE" | (string & {});
export const UploadCategory = S.String;

export interface Upload {
  arn?: string;
  name?: string;
  created?: Date;
  type?: UploadType;
  status?: UploadStatus;
  url?: string | redacted.Redacted<string>;
  metadata?: string;
  contentType?: string;
  message?: string;
  category?: UploadCategory;
}
export const Upload = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    name: S.optional(S.String),
    created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    type: S.optional(UploadType),
    status: S.optional(UploadStatus),
    url: S.optional(SensitiveString),
    metadata: S.optional(S.String),
    contentType: S.optional(S.String),
    message: S.optional(S.String),
    category: S.optional(UploadCategory),
  }),
).annotate({ identifier: "Upload" }) as any as S.Schema<Upload>;
export interface CreateUploadResult {
  upload?: Upload;
}
export const CreateUploadResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ upload: S.optional(Upload) }).pipe(ns),
).annotate({
  identifier: "CreateUploadResult",
}) as any as S.Schema<CreateUploadResult>;
export type VPCEConfigurationName = string;
export type VPCEServiceName = string;
export type ServiceDnsName = string;
export type VPCEConfigurationDescription = string;
export interface CreateVPCEConfigurationRequest {
  vpceConfigurationName: string;
  vpceServiceName: string;
  serviceDnsName: string;
  vpceConfigurationDescription?: string;
}
export const CreateVPCEConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vpceConfigurationName: S.String,
    vpceServiceName: S.String,
    serviceDnsName: S.String,
    vpceConfigurationDescription: S.optional(S.String),
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
  identifier: "CreateVPCEConfigurationRequest",
}) as any as S.Schema<CreateVPCEConfigurationRequest>;
export interface VPCEConfiguration {
  arn?: string;
  vpceConfigurationName?: string;
  vpceServiceName?: string;
  serviceDnsName?: string;
  vpceConfigurationDescription?: string;
}
export const VPCEConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    vpceConfigurationName: S.optional(S.String),
    vpceServiceName: S.optional(S.String),
    serviceDnsName: S.optional(S.String),
    vpceConfigurationDescription: S.optional(S.String),
  }),
).annotate({
  identifier: "VPCEConfiguration",
}) as any as S.Schema<VPCEConfiguration>;
export interface CreateVPCEConfigurationResult {
  vpceConfiguration?: VPCEConfiguration;
}
export const CreateVPCEConfigurationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ vpceConfiguration: S.optional(VPCEConfiguration) }).pipe(ns),
).annotate({
  identifier: "CreateVPCEConfigurationResult",
}) as any as S.Schema<CreateVPCEConfigurationResult>;
export interface DeleteDevicePoolRequest {
  arn: string;
}
export const DeleteDevicePoolRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
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
  identifier: "DeleteDevicePoolRequest",
}) as any as S.Schema<DeleteDevicePoolRequest>;
export interface DeleteDevicePoolResult {}
export const DeleteDevicePoolResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteDevicePoolResult",
}) as any as S.Schema<DeleteDevicePoolResult>;
export interface DeleteInstanceProfileRequest {
  arn: string;
}
export const DeleteInstanceProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
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
  identifier: "DeleteInstanceProfileRequest",
}) as any as S.Schema<DeleteInstanceProfileRequest>;
export interface DeleteInstanceProfileResult {}
export const DeleteInstanceProfileResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteInstanceProfileResult",
}) as any as S.Schema<DeleteInstanceProfileResult>;
export interface DeleteNetworkProfileRequest {
  arn: string;
}
export const DeleteNetworkProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
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
  identifier: "DeleteNetworkProfileRequest",
}) as any as S.Schema<DeleteNetworkProfileRequest>;
export interface DeleteNetworkProfileResult {}
export const DeleteNetworkProfileResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteNetworkProfileResult",
}) as any as S.Schema<DeleteNetworkProfileResult>;
export interface DeleteProjectRequest {
  arn: string;
}
export const DeleteProjectRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
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
  identifier: "DeleteProjectRequest",
}) as any as S.Schema<DeleteProjectRequest>;
export interface DeleteProjectResult {}
export const DeleteProjectResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteProjectResult",
}) as any as S.Schema<DeleteProjectResult>;
export interface DeleteRemoteAccessSessionRequest {
  arn: string;
}
export const DeleteRemoteAccessSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
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
  identifier: "DeleteRemoteAccessSessionRequest",
}) as any as S.Schema<DeleteRemoteAccessSessionRequest>;
export interface DeleteRemoteAccessSessionResult {}
export const DeleteRemoteAccessSessionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteRemoteAccessSessionResult",
}) as any as S.Schema<DeleteRemoteAccessSessionResult>;
export interface DeleteRunRequest {
  arn: string;
}
export const DeleteRunRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
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
  identifier: "DeleteRunRequest",
}) as any as S.Schema<DeleteRunRequest>;
export interface DeleteRunResult {}
export const DeleteRunResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteRunResult",
}) as any as S.Schema<DeleteRunResult>;
export interface DeleteTestGridProjectRequest {
  projectArn: string;
}
export const DeleteTestGridProjectRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ projectArn: S.String }).pipe(
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
  identifier: "DeleteTestGridProjectRequest",
}) as any as S.Schema<DeleteTestGridProjectRequest>;
export interface DeleteTestGridProjectResult {}
export const DeleteTestGridProjectResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteTestGridProjectResult",
}) as any as S.Schema<DeleteTestGridProjectResult>;
export interface DeleteUploadRequest {
  arn: string;
}
export const DeleteUploadRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
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
  identifier: "DeleteUploadRequest",
}) as any as S.Schema<DeleteUploadRequest>;
export interface DeleteUploadResult {}
export const DeleteUploadResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteUploadResult",
}) as any as S.Schema<DeleteUploadResult>;
export interface DeleteVPCEConfigurationRequest {
  arn: string;
}
export const DeleteVPCEConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
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
  identifier: "DeleteVPCEConfigurationRequest",
}) as any as S.Schema<DeleteVPCEConfigurationRequest>;
export interface DeleteVPCEConfigurationResult {}
export const DeleteVPCEConfigurationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteVPCEConfigurationResult",
}) as any as S.Schema<DeleteVPCEConfigurationResult>;
export interface GetAccountSettingsRequest {}
export const GetAccountSettingsRequest = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "GetAccountSettingsRequest",
}) as any as S.Schema<GetAccountSettingsRequest>;
export type AWSAccountNumber = string;
export type PurchasedDevicesMap = { [key in DevicePlatform]?: number };
export const PurchasedDevicesMap = /*@__PURE__*/ S.Record(
  DevicePlatform,
  S.Number.pipe(S.optional),
);
export interface TrialMinutes {
  total?: number;
  remaining?: number;
}
export const TrialMinutes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ total: S.optional(S.Number), remaining: S.optional(S.Number) }),
).annotate({ identifier: "TrialMinutes" }) as any as S.Schema<TrialMinutes>;
export type MaxSlotMap = { [key: string]: number | undefined };
export const MaxSlotMap = /*@__PURE__*/ S.Record(
  S.String,
  S.Number.pipe(S.optional),
);
export interface AccountSettings {
  awsAccountNumber?: string;
  unmeteredDevices?: { [key: string]: number | undefined };
  unmeteredRemoteAccessDevices?: { [key: string]: number | undefined };
  maxJobTimeoutMinutes?: number;
  trialMinutes?: TrialMinutes;
  maxSlots?: { [key: string]: number | undefined };
  defaultJobTimeoutMinutes?: number;
  skipAppResign?: boolean;
}
export const AccountSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    awsAccountNumber: S.optional(S.String),
    unmeteredDevices: S.optional(PurchasedDevicesMap),
    unmeteredRemoteAccessDevices: S.optional(PurchasedDevicesMap),
    maxJobTimeoutMinutes: S.optional(S.Number),
    trialMinutes: S.optional(TrialMinutes),
    maxSlots: S.optional(MaxSlotMap),
    defaultJobTimeoutMinutes: S.optional(S.Number),
    skipAppResign: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "AccountSettings",
}) as any as S.Schema<AccountSettings>;
export interface GetAccountSettingsResult {
  accountSettings?: AccountSettings;
}
export const GetAccountSettingsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ accountSettings: S.optional(AccountSettings) }).pipe(ns),
).annotate({
  identifier: "GetAccountSettingsResult",
}) as any as S.Schema<GetAccountSettingsResult>;
export interface GetDeviceRequest {
  arn: string;
}
export const GetDeviceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
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
  identifier: "GetDeviceRequest",
}) as any as S.Schema<GetDeviceRequest>;
export interface GetDeviceResult {
  device?: Device;
}
export const GetDeviceResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ device: S.optional(Device) }).pipe(ns),
).annotate({
  identifier: "GetDeviceResult",
}) as any as S.Schema<GetDeviceResult>;
export interface GetDeviceInstanceRequest {
  arn: string;
}
export const GetDeviceInstanceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
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
  identifier: "GetDeviceInstanceRequest",
}) as any as S.Schema<GetDeviceInstanceRequest>;
export interface GetDeviceInstanceResult {
  deviceInstance?: DeviceInstance;
}
export const GetDeviceInstanceResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ deviceInstance: S.optional(DeviceInstance) }).pipe(ns),
).annotate({
  identifier: "GetDeviceInstanceResult",
}) as any as S.Schema<GetDeviceInstanceResult>;
export interface GetDevicePoolRequest {
  arn: string;
}
export const GetDevicePoolRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
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
  identifier: "GetDevicePoolRequest",
}) as any as S.Schema<GetDevicePoolRequest>;
export interface GetDevicePoolResult {
  devicePool?: DevicePool;
}
export const GetDevicePoolResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ devicePool: S.optional(DevicePool) }).pipe(ns),
).annotate({
  identifier: "GetDevicePoolResult",
}) as any as S.Schema<GetDevicePoolResult>;
export type TestType =
  | "BUILTIN_FUZZ"
  | "APPIUM_JAVA_JUNIT"
  | "APPIUM_JAVA_TESTNG"
  | "APPIUM_PYTHON"
  | "APPIUM_NODE"
  | "APPIUM_RUBY"
  | "APPIUM_WEB_JAVA_JUNIT"
  | "APPIUM_WEB_JAVA_TESTNG"
  | "APPIUM_WEB_PYTHON"
  | "APPIUM_WEB_NODE"
  | "APPIUM_WEB_RUBY"
  | "INSTRUMENTATION"
  | "XCTEST"
  | "XCTEST_UI"
  | (string & {});
export const TestType = S.String;

export type Filter = string;
export type TestParameters = { [key: string]: string | undefined };
export const TestParameters = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface ScheduleRunTest {
  type: TestType;
  testPackageArn?: string;
  testSpecArn?: string;
  filter?: string;
  parameters?: { [key: string]: string | undefined };
}
export const ScheduleRunTest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: TestType,
    testPackageArn: S.optional(S.String),
    testSpecArn: S.optional(S.String),
    filter: S.optional(S.String),
    parameters: S.optional(TestParameters),
  }),
).annotate({
  identifier: "ScheduleRunTest",
}) as any as S.Schema<ScheduleRunTest>;
export interface Location {
  latitude: number;
  longitude: number;
}
export const Location = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ latitude: S.Number, longitude: S.Number }),
).annotate({ identifier: "Location" }) as any as S.Schema<Location>;
export type IosPaths = string[];
export const IosPaths = /*@__PURE__*/ S.Array(S.String);
export type AndroidPaths = string[];
export const AndroidPaths = /*@__PURE__*/ S.Array(S.String);
export type DeviceHostPaths = string[];
export const DeviceHostPaths = /*@__PURE__*/ S.Array(S.String);
export interface CustomerArtifactPaths {
  iosPaths?: string[];
  androidPaths?: string[];
  deviceHostPaths?: string[];
}
export const CustomerArtifactPaths = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    iosPaths: S.optional(IosPaths),
    androidPaths: S.optional(AndroidPaths),
    deviceHostPaths: S.optional(DeviceHostPaths),
  }),
).annotate({
  identifier: "CustomerArtifactPaths",
}) as any as S.Schema<CustomerArtifactPaths>;
export interface Radios {
  wifi?: boolean;
  bluetooth?: boolean;
  nfc?: boolean;
  gps?: boolean;
}
export const Radios = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    wifi: S.optional(S.Boolean),
    bluetooth: S.optional(S.Boolean),
    nfc: S.optional(S.Boolean),
    gps: S.optional(S.Boolean),
  }),
).annotate({ identifier: "Radios" }) as any as S.Schema<Radios>;
export type InsightsType = "TEST_REPORT" | (string & {});
export const InsightsType = S.String;

export type InsightsTypes = InsightsType[];
export const InsightsTypes = /*@__PURE__*/ S.Array(InsightsType);
export interface ScheduleRunConfiguration {
  extraDataPackageArn?: string;
  networkProfileArn?: string;
  locale?: string;
  location?: Location;
  vpceConfigurationArns?: string[];
  deviceProxy?: DeviceProxy;
  customerArtifactPaths?: CustomerArtifactPaths;
  radios?: Radios;
  auxiliaryApps?: string[];
  billingMethod?: BillingMethod;
  environmentVariables?: EnvironmentVariable[];
  executionRoleArn?: string;
  insightsTypes?: InsightsType[];
}
export const ScheduleRunConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    extraDataPackageArn: S.optional(S.String),
    networkProfileArn: S.optional(S.String),
    locale: S.optional(S.String),
    location: S.optional(Location),
    vpceConfigurationArns: S.optional(AmazonResourceNames),
    deviceProxy: S.optional(DeviceProxy),
    customerArtifactPaths: S.optional(CustomerArtifactPaths),
    radios: S.optional(Radios),
    auxiliaryApps: S.optional(AmazonResourceNames),
    billingMethod: S.optional(BillingMethod),
    environmentVariables: S.optional(EnvironmentVariables),
    executionRoleArn: S.optional(S.String),
    insightsTypes: S.optional(InsightsTypes),
  }),
).annotate({
  identifier: "ScheduleRunConfiguration",
}) as any as S.Schema<ScheduleRunConfiguration>;
export interface GetDevicePoolCompatibilityRequest {
  devicePoolArn: string;
  appArn?: string;
  testType?: TestType;
  test?: ScheduleRunTest;
  configuration?: ScheduleRunConfiguration;
  projectArn?: string;
}
export const GetDevicePoolCompatibilityRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    devicePoolArn: S.String,
    appArn: S.optional(S.String),
    testType: S.optional(TestType),
    test: S.optional(ScheduleRunTest),
    configuration: S.optional(ScheduleRunConfiguration),
    projectArn: S.optional(S.String),
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
  identifier: "GetDevicePoolCompatibilityRequest",
}) as any as S.Schema<GetDevicePoolCompatibilityRequest>;
export interface IncompatibilityMessage {
  message?: string;
  type?: DeviceAttribute;
}
export const IncompatibilityMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    message: S.optional(S.String),
    type: S.optional(DeviceAttribute),
  }),
).annotate({
  identifier: "IncompatibilityMessage",
}) as any as S.Schema<IncompatibilityMessage>;
export type IncompatibilityMessages = IncompatibilityMessage[];
export const IncompatibilityMessages = /*@__PURE__*/ S.Array(
  IncompatibilityMessage,
);
export interface DevicePoolCompatibilityResult {
  device?: Device;
  compatible?: boolean;
  incompatibilityMessages?: IncompatibilityMessage[];
}
export const DevicePoolCompatibilityResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    device: S.optional(Device),
    compatible: S.optional(S.Boolean),
    incompatibilityMessages: S.optional(IncompatibilityMessages),
  }),
).annotate({
  identifier: "DevicePoolCompatibilityResult",
}) as any as S.Schema<DevicePoolCompatibilityResult>;
export type DevicePoolCompatibilityResults = DevicePoolCompatibilityResult[];
export const DevicePoolCompatibilityResults = /*@__PURE__*/ S.Array(
  DevicePoolCompatibilityResult,
);
export interface GetDevicePoolCompatibilityResult {
  compatibleDevices?: DevicePoolCompatibilityResult[];
  incompatibleDevices?: DevicePoolCompatibilityResult[];
}
export const GetDevicePoolCompatibilityResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    compatibleDevices: S.optional(DevicePoolCompatibilityResults),
    incompatibleDevices: S.optional(DevicePoolCompatibilityResults),
  }).pipe(ns),
).annotate({
  identifier: "GetDevicePoolCompatibilityResult",
}) as any as S.Schema<GetDevicePoolCompatibilityResult>;
export interface GetInstanceProfileRequest {
  arn: string;
}
export const GetInstanceProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
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
  identifier: "GetInstanceProfileRequest",
}) as any as S.Schema<GetInstanceProfileRequest>;
export interface GetInstanceProfileResult {
  instanceProfile?: InstanceProfile;
}
export const GetInstanceProfileResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ instanceProfile: S.optional(InstanceProfile) }).pipe(ns),
).annotate({
  identifier: "GetInstanceProfileResult",
}) as any as S.Schema<GetInstanceProfileResult>;
export interface GetJobRequest {
  arn: string;
}
export const GetJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
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
).annotate({ identifier: "GetJobRequest" }) as any as S.Schema<GetJobRequest>;
export interface Counters {
  total?: number;
  passed?: number;
  failed?: number;
  warned?: number;
  errored?: number;
  stopped?: number;
  skipped?: number;
}
export const Counters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    total: S.optional(S.Number),
    passed: S.optional(S.Number),
    failed: S.optional(S.Number),
    warned: S.optional(S.Number),
    errored: S.optional(S.Number),
    stopped: S.optional(S.Number),
    skipped: S.optional(S.Number),
  }),
).annotate({ identifier: "Counters" }) as any as S.Schema<Counters>;
export type VideoCapture = boolean;
export type ReportStatus =
  | "PENDING"
  | "RUNNING"
  | "COMPLETED"
  | "SKIPPED"
  | "ERRORED"
  | (string & {});
export const ReportStatus = S.String;

export type ReportMessage = string;
export interface TestReportMetrics {
  testsTotal?: number;
  testsPassed?: number;
  testsFailed?: number;
  testsSkipped?: number;
  testsErrored?: number;
  testsOther?: number;
  testsPassedPercentage?: number;
  totalTestExecutionDurationSeconds?: number;
  medianTestExecutionDurationSeconds?: number;
}
export const TestReportMetrics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    testsTotal: S.optional(S.Number),
    testsPassed: S.optional(S.Number),
    testsFailed: S.optional(S.Number),
    testsSkipped: S.optional(S.Number),
    testsErrored: S.optional(S.Number),
    testsOther: S.optional(S.Number),
    testsPassedPercentage: S.optional(S.Number),
    totalTestExecutionDurationSeconds: S.optional(S.Number),
    medianTestExecutionDurationSeconds: S.optional(S.Number),
  }),
).annotate({
  identifier: "TestReportMetrics",
}) as any as S.Schema<TestReportMetrics>;
export interface TestReport {
  message?: string;
  metrics?: TestReportMetrics;
  testDetailsUrl?: string | redacted.Redacted<string>;
}
export const TestReport = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    message: S.optional(S.String),
    metrics: S.optional(TestReportMetrics),
    testDetailsUrl: S.optional(SensitiveString),
  }),
).annotate({ identifier: "TestReport" }) as any as S.Schema<TestReport>;
export interface JobInsights {
  status?: ReportStatus;
  testReport?: TestReport;
}
export const JobInsights = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.optional(ReportStatus),
    testReport: S.optional(TestReport),
  }),
).annotate({ identifier: "JobInsights" }) as any as S.Schema<JobInsights>;
export interface Job {
  arn?: string;
  name?: string;
  type?: TestType;
  created?: Date;
  status?: ExecutionStatus;
  result?: ExecutionResult;
  started?: Date;
  stopped?: Date;
  counters?: Counters;
  message?: string;
  device?: Device;
  instanceArn?: string;
  deviceMinutes?: DeviceMinutes;
  videoEndpoint?: string;
  videoCapture?: boolean;
  insights?: JobInsights;
}
export const Job = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    name: S.optional(S.String),
    type: S.optional(TestType),
    created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    status: S.optional(ExecutionStatus),
    result: S.optional(ExecutionResult),
    started: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    stopped: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    counters: S.optional(Counters),
    message: S.optional(S.String),
    device: S.optional(Device),
    instanceArn: S.optional(S.String),
    deviceMinutes: S.optional(DeviceMinutes),
    videoEndpoint: S.optional(S.String),
    videoCapture: S.optional(S.Boolean),
    insights: S.optional(JobInsights),
  }),
).annotate({ identifier: "Job" }) as any as S.Schema<Job>;
export interface GetJobResult {
  job?: Job;
}
export const GetJobResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ job: S.optional(Job) }).pipe(ns),
).annotate({ identifier: "GetJobResult" }) as any as S.Schema<GetJobResult>;
export interface GetNetworkProfileRequest {
  arn: string;
}
export const GetNetworkProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
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
  identifier: "GetNetworkProfileRequest",
}) as any as S.Schema<GetNetworkProfileRequest>;
export interface GetNetworkProfileResult {
  networkProfile?: NetworkProfile;
}
export const GetNetworkProfileResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ networkProfile: S.optional(NetworkProfile) }).pipe(ns),
).annotate({
  identifier: "GetNetworkProfileResult",
}) as any as S.Schema<GetNetworkProfileResult>;
export type PaginationToken = string;
export interface GetOfferingStatusRequest {
  nextToken?: string;
}
export const GetOfferingStatusRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String) }).pipe(
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
  identifier: "GetOfferingStatusRequest",
}) as any as S.Schema<GetOfferingStatusRequest>;
export type OfferingIdentifier = string;
export type OfferingTransactionType =
  | "PURCHASE"
  | "RENEW"
  | "SYSTEM"
  | (string & {});
export const OfferingTransactionType = S.String;

export type OfferingType = "RECURRING" | (string & {});
export const OfferingType = S.String;

export type CurrencyCode = "USD" | (string & {});
export const CurrencyCode = S.String;

export interface MonetaryAmount {
  amount?: number;
  currencyCode?: CurrencyCode;
}
export const MonetaryAmount = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    amount: S.optional(S.Number),
    currencyCode: S.optional(CurrencyCode),
  }),
).annotate({ identifier: "MonetaryAmount" }) as any as S.Schema<MonetaryAmount>;
export type RecurringChargeFrequency = "MONTHLY" | (string & {});
export const RecurringChargeFrequency = S.String;

export interface RecurringCharge {
  cost?: MonetaryAmount;
  frequency?: RecurringChargeFrequency;
}
export const RecurringCharge = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cost: S.optional(MonetaryAmount),
    frequency: S.optional(RecurringChargeFrequency),
  }),
).annotate({
  identifier: "RecurringCharge",
}) as any as S.Schema<RecurringCharge>;
export type RecurringCharges = RecurringCharge[];
export const RecurringCharges = /*@__PURE__*/ S.Array(RecurringCharge);
export interface Offering {
  id?: string;
  description?: string;
  type?: OfferingType;
  platform?: DevicePlatform;
  recurringCharges?: RecurringCharge[];
}
export const Offering = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    description: S.optional(S.String),
    type: S.optional(OfferingType),
    platform: S.optional(DevicePlatform),
    recurringCharges: S.optional(RecurringCharges),
  }),
).annotate({ identifier: "Offering" }) as any as S.Schema<Offering>;
export interface OfferingStatus {
  type?: OfferingTransactionType;
  offering?: Offering;
  quantity?: number;
  effectiveOn?: Date;
}
export const OfferingStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(OfferingTransactionType),
    offering: S.optional(Offering),
    quantity: S.optional(S.Number),
    effectiveOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "OfferingStatus" }) as any as S.Schema<OfferingStatus>;
export type OfferingStatusMap = { [key: string]: OfferingStatus | undefined };
export const OfferingStatusMap = /*@__PURE__*/ S.Record(
  S.String,
  OfferingStatus.pipe(S.optional),
);
export interface GetOfferingStatusResult {
  current?: { [key: string]: OfferingStatus | undefined };
  nextPeriod?: { [key: string]: OfferingStatus | undefined };
  nextToken?: string;
}
export const GetOfferingStatusResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    current: S.optional(OfferingStatusMap),
    nextPeriod: S.optional(OfferingStatusMap),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetOfferingStatusResult",
}) as any as S.Schema<GetOfferingStatusResult>;
export interface GetProjectRequest {
  arn: string;
}
export const GetProjectRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
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
  identifier: "GetProjectRequest",
}) as any as S.Schema<GetProjectRequest>;
export interface GetProjectResult {
  project?: Project;
}
export const GetProjectResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ project: S.optional(Project) }).pipe(ns),
).annotate({
  identifier: "GetProjectResult",
}) as any as S.Schema<GetProjectResult>;
export interface GetRemoteAccessSessionRequest {
  arn: string;
}
export const GetRemoteAccessSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
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
  identifier: "GetRemoteAccessSessionRequest",
}) as any as S.Schema<GetRemoteAccessSessionRequest>;
export interface GetRemoteAccessSessionResult {
  remoteAccessSession?: RemoteAccessSession;
}
export const GetRemoteAccessSessionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ remoteAccessSession: S.optional(RemoteAccessSession) }).pipe(ns),
).annotate({
  identifier: "GetRemoteAccessSessionResult",
}) as any as S.Schema<GetRemoteAccessSessionResult>;
export interface GetRunRequest {
  arn: string;
}
export const GetRunRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
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
).annotate({ identifier: "GetRunRequest" }) as any as S.Schema<GetRunRequest>;
export type ExecutionResultCode =
  | "PARSING_FAILED"
  | "VPC_ENDPOINT_SETUP_FAILED"
  | (string & {});
export const ExecutionResultCode = S.String;

export type DeviceFilterAttribute =
  | "ARN"
  | "PLATFORM"
  | "OS_VERSION"
  | "MODEL"
  | "AVAILABILITY"
  | "FORM_FACTOR"
  | "MANUFACTURER"
  | "REMOTE_ACCESS_ENABLED"
  | "REMOTE_DEBUG_ENABLED"
  | "INSTANCE_ARN"
  | "INSTANCE_LABELS"
  | "FLEET_TYPE"
  | (string & {});
export const DeviceFilterAttribute = S.String;

export type DeviceFilterValues = string[];
export const DeviceFilterValues = /*@__PURE__*/ S.Array(S.String);
export interface DeviceFilter {
  attribute: DeviceFilterAttribute;
  operator: RuleOperator;
  values: string[];
}
export const DeviceFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    attribute: DeviceFilterAttribute,
    operator: RuleOperator,
    values: DeviceFilterValues,
  }),
).annotate({ identifier: "DeviceFilter" }) as any as S.Schema<DeviceFilter>;
export type DeviceFilters = DeviceFilter[];
export const DeviceFilters = /*@__PURE__*/ S.Array(DeviceFilter);
export interface DeviceSelectionResult {
  filters?: DeviceFilter[];
  matchedDevicesCount?: number;
  maxDevices?: number;
}
export const DeviceSelectionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    filters: S.optional(DeviceFilters),
    matchedDevicesCount: S.optional(S.Number),
    maxDevices: S.optional(S.Number),
  }),
).annotate({
  identifier: "DeviceSelectionResult",
}) as any as S.Schema<DeviceSelectionResult>;
export interface JobReportMetrics {
  jobsTotal?: number;
  jobsPassed?: number;
  jobsFailed?: number;
  jobsSkipped?: number;
  jobsErrored?: number;
  jobsStopped?: number;
  jobsPassedPercentage?: number;
  totalJobExecutionDurationSeconds?: number;
  averageJobExecutionDurationSeconds?: number;
  medianJobExecutionDurationSeconds?: number;
}
export const JobReportMetrics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobsTotal: S.optional(S.Number),
    jobsPassed: S.optional(S.Number),
    jobsFailed: S.optional(S.Number),
    jobsSkipped: S.optional(S.Number),
    jobsErrored: S.optional(S.Number),
    jobsStopped: S.optional(S.Number),
    jobsPassedPercentage: S.optional(S.Number),
    totalJobExecutionDurationSeconds: S.optional(S.Number),
    averageJobExecutionDurationSeconds: S.optional(S.Number),
    medianJobExecutionDurationSeconds: S.optional(S.Number),
  }),
).annotate({
  identifier: "JobReportMetrics",
}) as any as S.Schema<JobReportMetrics>;
export interface JobReport {
  message?: string;
  metrics?: JobReportMetrics;
  jobDetailsUrl?: string | redacted.Redacted<string>;
}
export const JobReport = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    message: S.optional(S.String),
    metrics: S.optional(JobReportMetrics),
    jobDetailsUrl: S.optional(SensitiveString),
  }),
).annotate({ identifier: "JobReport" }) as any as S.Schema<JobReport>;
export interface RunInsights {
  status?: ReportStatus;
  jobReport?: JobReport;
}
export const RunInsights = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.optional(ReportStatus),
    jobReport: S.optional(JobReport),
  }),
).annotate({ identifier: "RunInsights" }) as any as S.Schema<RunInsights>;
export interface Run {
  arn?: string;
  name?: string;
  type?: TestType;
  platform?: DevicePlatform;
  created?: Date;
  status?: ExecutionStatus;
  result?: ExecutionResult;
  started?: Date;
  stopped?: Date;
  counters?: Counters;
  message?: string;
  totalJobs?: number;
  completedJobs?: number;
  billingMethod?: BillingMethod;
  deviceMinutes?: DeviceMinutes;
  networkProfile?: NetworkProfile;
  deviceProxy?: DeviceProxy;
  parsingResultUrl?: string;
  resultCode?: ExecutionResultCode;
  seed?: number;
  appUpload?: string;
  eventCount?: number;
  jobTimeoutMinutes?: number;
  devicePoolArn?: string;
  locale?: string;
  radios?: Radios;
  location?: Location;
  customerArtifactPaths?: CustomerArtifactPaths;
  webUrl?: string;
  skipAppResign?: boolean;
  testSpecArn?: string;
  deviceSelectionResult?: DeviceSelectionResult;
  vpcConfig?: VpcConfig;
  executionRoleArn?: string;
  environmentVariables?: EnvironmentVariable[];
  insightsTypes?: InsightsType[];
  insights?: RunInsights;
}
export const Run = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    name: S.optional(S.String),
    type: S.optional(TestType),
    platform: S.optional(DevicePlatform),
    created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    status: S.optional(ExecutionStatus),
    result: S.optional(ExecutionResult),
    started: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    stopped: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    counters: S.optional(Counters),
    message: S.optional(S.String),
    totalJobs: S.optional(S.Number),
    completedJobs: S.optional(S.Number),
    billingMethod: S.optional(BillingMethod),
    deviceMinutes: S.optional(DeviceMinutes),
    networkProfile: S.optional(NetworkProfile),
    deviceProxy: S.optional(DeviceProxy),
    parsingResultUrl: S.optional(S.String),
    resultCode: S.optional(ExecutionResultCode),
    seed: S.optional(S.Number),
    appUpload: S.optional(S.String),
    eventCount: S.optional(S.Number),
    jobTimeoutMinutes: S.optional(S.Number),
    devicePoolArn: S.optional(S.String),
    locale: S.optional(S.String),
    radios: S.optional(Radios),
    location: S.optional(Location),
    customerArtifactPaths: S.optional(CustomerArtifactPaths),
    webUrl: S.optional(S.String),
    skipAppResign: S.optional(S.Boolean),
    testSpecArn: S.optional(S.String),
    deviceSelectionResult: S.optional(DeviceSelectionResult),
    vpcConfig: S.optional(VpcConfig),
    executionRoleArn: S.optional(S.String),
    environmentVariables: S.optional(EnvironmentVariables),
    insightsTypes: S.optional(InsightsTypes),
    insights: S.optional(RunInsights),
  }),
).annotate({ identifier: "Run" }) as any as S.Schema<Run>;
export interface GetRunResult {
  run?: Run;
}
export const GetRunResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ run: S.optional(Run) }).pipe(ns),
).annotate({ identifier: "GetRunResult" }) as any as S.Schema<GetRunResult>;
export interface GetSuiteRequest {
  arn: string;
}
export const GetSuiteRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
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
  identifier: "GetSuiteRequest",
}) as any as S.Schema<GetSuiteRequest>;
export interface Suite {
  arn?: string;
  name?: string;
  type?: TestType;
  created?: Date;
  status?: ExecutionStatus;
  result?: ExecutionResult;
  started?: Date;
  stopped?: Date;
  counters?: Counters;
  message?: string;
  deviceMinutes?: DeviceMinutes;
}
export const Suite = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    name: S.optional(S.String),
    type: S.optional(TestType),
    created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    status: S.optional(ExecutionStatus),
    result: S.optional(ExecutionResult),
    started: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    stopped: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    counters: S.optional(Counters),
    message: S.optional(S.String),
    deviceMinutes: S.optional(DeviceMinutes),
  }),
).annotate({ identifier: "Suite" }) as any as S.Schema<Suite>;
export interface GetSuiteResult {
  suite?: Suite;
}
export const GetSuiteResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ suite: S.optional(Suite) }).pipe(ns),
).annotate({ identifier: "GetSuiteResult" }) as any as S.Schema<GetSuiteResult>;
export interface GetTestRequest {
  arn: string;
}
export const GetTestRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
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
).annotate({ identifier: "GetTestRequest" }) as any as S.Schema<GetTestRequest>;
export interface Test {
  arn?: string;
  name?: string;
  type?: TestType;
  created?: Date;
  status?: ExecutionStatus;
  result?: ExecutionResult;
  started?: Date;
  stopped?: Date;
  counters?: Counters;
  message?: string;
  deviceMinutes?: DeviceMinutes;
}
export const Test = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    name: S.optional(S.String),
    type: S.optional(TestType),
    created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    status: S.optional(ExecutionStatus),
    result: S.optional(ExecutionResult),
    started: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    stopped: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    counters: S.optional(Counters),
    message: S.optional(S.String),
    deviceMinutes: S.optional(DeviceMinutes),
  }),
).annotate({ identifier: "Test" }) as any as S.Schema<Test>;
export interface GetTestResult {
  test?: Test;
}
export const GetTestResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ test: S.optional(Test) }).pipe(ns),
).annotate({ identifier: "GetTestResult" }) as any as S.Schema<GetTestResult>;
export interface GetTestGridProjectRequest {
  projectArn: string;
}
export const GetTestGridProjectRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ projectArn: S.String }).pipe(
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
  identifier: "GetTestGridProjectRequest",
}) as any as S.Schema<GetTestGridProjectRequest>;
export interface GetTestGridProjectResult {
  testGridProject?: TestGridProject;
}
export const GetTestGridProjectResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ testGridProject: S.optional(TestGridProject) }).pipe(ns),
).annotate({
  identifier: "GetTestGridProjectResult",
}) as any as S.Schema<GetTestGridProjectResult>;
export type ResourceId = string;
export interface GetTestGridSessionRequest {
  projectArn?: string;
  sessionId?: string;
  sessionArn?: string;
}
export const GetTestGridSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    projectArn: S.optional(S.String),
    sessionId: S.optional(S.String),
    sessionArn: S.optional(S.String),
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
  identifier: "GetTestGridSessionRequest",
}) as any as S.Schema<GetTestGridSessionRequest>;
export type TestGridSessionStatus =
  | "ACTIVE"
  | "CLOSED"
  | "ERRORED"
  | (string & {});
export const TestGridSessionStatus = S.String;

export interface TestGridSession {
  arn?: string;
  status?: TestGridSessionStatus;
  created?: Date;
  ended?: Date;
  billingMinutes?: number;
  seleniumProperties?: string;
}
export const TestGridSession = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    status: S.optional(TestGridSessionStatus),
    created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ended: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    billingMinutes: S.optional(S.Number),
    seleniumProperties: S.optional(S.String),
  }),
).annotate({
  identifier: "TestGridSession",
}) as any as S.Schema<TestGridSession>;
export interface GetTestGridSessionResult {
  testGridSession?: TestGridSession;
}
export const GetTestGridSessionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ testGridSession: S.optional(TestGridSession) }).pipe(ns),
).annotate({
  identifier: "GetTestGridSessionResult",
}) as any as S.Schema<GetTestGridSessionResult>;
export interface GetUploadRequest {
  arn: string;
}
export const GetUploadRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
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
  identifier: "GetUploadRequest",
}) as any as S.Schema<GetUploadRequest>;
export interface GetUploadResult {
  upload?: Upload;
}
export const GetUploadResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ upload: S.optional(Upload) }).pipe(ns),
).annotate({
  identifier: "GetUploadResult",
}) as any as S.Schema<GetUploadResult>;
export interface GetVPCEConfigurationRequest {
  arn: string;
}
export const GetVPCEConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
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
  identifier: "GetVPCEConfigurationRequest",
}) as any as S.Schema<GetVPCEConfigurationRequest>;
export interface GetVPCEConfigurationResult {
  vpceConfiguration?: VPCEConfiguration;
}
export const GetVPCEConfigurationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ vpceConfiguration: S.optional(VPCEConfiguration) }).pipe(ns),
).annotate({
  identifier: "GetVPCEConfigurationResult",
}) as any as S.Schema<GetVPCEConfigurationResult>;
export interface InstallToRemoteAccessSessionRequest {
  remoteAccessSessionArn: string;
  appArn: string;
}
export const InstallToRemoteAccessSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ remoteAccessSessionArn: S.String, appArn: S.String }).pipe(
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
  identifier: "InstallToRemoteAccessSessionRequest",
}) as any as S.Schema<InstallToRemoteAccessSessionRequest>;
export interface InstallToRemoteAccessSessionResult {
  appUpload?: Upload;
}
export const InstallToRemoteAccessSessionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ appUpload: S.optional(Upload) }).pipe(ns),
).annotate({
  identifier: "InstallToRemoteAccessSessionResult",
}) as any as S.Schema<InstallToRemoteAccessSessionResult>;
export type ArtifactCategory = "SCREENSHOT" | "FILE" | "LOG" | (string & {});
export const ArtifactCategory = S.String;

export interface ListArtifactsRequest {
  arn: string;
  type: ArtifactCategory;
  nextToken?: string;
}
export const ListArtifactsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    type: ArtifactCategory,
    nextToken: S.optional(S.String),
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
  identifier: "ListArtifactsRequest",
}) as any as S.Schema<ListArtifactsRequest>;
export type ArtifactType =
  | "UNKNOWN"
  | "SCREENSHOT"
  | "DEVICE_LOG"
  | "MESSAGE_LOG"
  | "VIDEO_LOG"
  | "RESULT_LOG"
  | "SERVICE_LOG"
  | "WEBKIT_LOG"
  | "INSTRUMENTATION_OUTPUT"
  | "EXERCISER_MONKEY_OUTPUT"
  | "CALABASH_JSON_OUTPUT"
  | "CALABASH_PRETTY_OUTPUT"
  | "CALABASH_STANDARD_OUTPUT"
  | "CALABASH_JAVA_XML_OUTPUT"
  | "AUTOMATION_OUTPUT"
  | "APPIUM_SERVER_OUTPUT"
  | "APPIUM_JAVA_OUTPUT"
  | "APPIUM_JAVA_XML_OUTPUT"
  | "APPIUM_PYTHON_OUTPUT"
  | "APPIUM_PYTHON_XML_OUTPUT"
  | "EXPLORER_EVENT_LOG"
  | "EXPLORER_SUMMARY_LOG"
  | "APPLICATION_CRASH_REPORT"
  | "XCTEST_LOG"
  | "VIDEO"
  | "CUSTOMER_ARTIFACT"
  | "CUSTOMER_ARTIFACT_LOG"
  | "TESTSPEC_OUTPUT"
  | (string & {});
export const ArtifactType = S.String;

export type URL = string;
export interface Artifact {
  arn?: string;
  name?: string;
  type?: ArtifactType;
  extension?: string;
  url?: string;
}
export const Artifact = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    name: S.optional(S.String),
    type: S.optional(ArtifactType),
    extension: S.optional(S.String),
    url: S.optional(S.String),
  }),
).annotate({ identifier: "Artifact" }) as any as S.Schema<Artifact>;
export type Artifacts = Artifact[];
export const Artifacts = /*@__PURE__*/ S.Array(Artifact);
export interface ListArtifactsResult {
  artifacts?: Artifact[];
  nextToken?: string;
}
export const ListArtifactsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    artifacts: S.optional(Artifacts),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListArtifactsResult",
}) as any as S.Schema<ListArtifactsResult>;
export interface ListDeviceInstancesRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListDeviceInstancesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
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
  identifier: "ListDeviceInstancesRequest",
}) as any as S.Schema<ListDeviceInstancesRequest>;
export interface ListDeviceInstancesResult {
  deviceInstances?: DeviceInstance[];
  nextToken?: string;
}
export const ListDeviceInstancesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deviceInstances: S.optional(DeviceInstances),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListDeviceInstancesResult",
}) as any as S.Schema<ListDeviceInstancesResult>;
export interface ListDevicePoolsRequest {
  arn: string;
  type?: DevicePoolType;
  nextToken?: string;
}
export const ListDevicePoolsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    type: S.optional(DevicePoolType),
    nextToken: S.optional(S.String),
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
  identifier: "ListDevicePoolsRequest",
}) as any as S.Schema<ListDevicePoolsRequest>;
export type DevicePools = DevicePool[];
export const DevicePools = /*@__PURE__*/ S.Array(DevicePool);
export interface ListDevicePoolsResult {
  devicePools?: DevicePool[];
  nextToken?: string;
}
export const ListDevicePoolsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    devicePools: S.optional(DevicePools),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListDevicePoolsResult",
}) as any as S.Schema<ListDevicePoolsResult>;
export interface ListDevicesRequest {
  arn?: string;
  nextToken?: string;
  filters?: DeviceFilter[];
}
export const ListDevicesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    nextToken: S.optional(S.String),
    filters: S.optional(DeviceFilters),
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
  identifier: "ListDevicesRequest",
}) as any as S.Schema<ListDevicesRequest>;
export type Devices = Device[];
export const Devices = /*@__PURE__*/ S.Array(Device);
export interface ListDevicesResult {
  devices?: Device[];
  nextToken?: string;
}
export const ListDevicesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    devices: S.optional(Devices),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListDevicesResult",
}) as any as S.Schema<ListDevicesResult>;
export interface ListInstanceProfilesRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListInstanceProfilesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
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
  identifier: "ListInstanceProfilesRequest",
}) as any as S.Schema<ListInstanceProfilesRequest>;
export type InstanceProfiles = InstanceProfile[];
export const InstanceProfiles = /*@__PURE__*/ S.Array(InstanceProfile);
export interface ListInstanceProfilesResult {
  instanceProfiles?: InstanceProfile[];
  nextToken?: string;
}
export const ListInstanceProfilesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instanceProfiles: S.optional(InstanceProfiles),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListInstanceProfilesResult",
}) as any as S.Schema<ListInstanceProfilesResult>;
export interface ListJobsRequest {
  arn: string;
  nextToken?: string;
}
export const ListJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String, nextToken: S.optional(S.String) }).pipe(
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
  identifier: "ListJobsRequest",
}) as any as S.Schema<ListJobsRequest>;
export type Jobs = Job[];
export const Jobs = /*@__PURE__*/ S.Array(Job);
export interface ListJobsResult {
  jobs?: Job[];
  nextToken?: string;
}
export const ListJobsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobs: S.optional(Jobs), nextToken: S.optional(S.String) }).pipe(
    ns,
  ),
).annotate({ identifier: "ListJobsResult" }) as any as S.Schema<ListJobsResult>;
export interface ListNetworkProfilesRequest {
  arn: string;
  type?: NetworkProfileType;
  nextToken?: string;
}
export const ListNetworkProfilesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    type: S.optional(NetworkProfileType),
    nextToken: S.optional(S.String),
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
  identifier: "ListNetworkProfilesRequest",
}) as any as S.Schema<ListNetworkProfilesRequest>;
export type NetworkProfiles = NetworkProfile[];
export const NetworkProfiles = /*@__PURE__*/ S.Array(NetworkProfile);
export interface ListNetworkProfilesResult {
  networkProfiles?: NetworkProfile[];
  nextToken?: string;
}
export const ListNetworkProfilesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    networkProfiles: S.optional(NetworkProfiles),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListNetworkProfilesResult",
}) as any as S.Schema<ListNetworkProfilesResult>;
export interface ListOfferingPromotionsRequest {
  nextToken?: string;
}
export const ListOfferingPromotionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String) }).pipe(
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
  identifier: "ListOfferingPromotionsRequest",
}) as any as S.Schema<ListOfferingPromotionsRequest>;
export type OfferingPromotionIdentifier = string;
export interface OfferingPromotion {
  id?: string;
  description?: string;
}
export const OfferingPromotion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.optional(S.String), description: S.optional(S.String) }),
).annotate({
  identifier: "OfferingPromotion",
}) as any as S.Schema<OfferingPromotion>;
export type OfferingPromotions = OfferingPromotion[];
export const OfferingPromotions = /*@__PURE__*/ S.Array(OfferingPromotion);
export interface ListOfferingPromotionsResult {
  offeringPromotions?: OfferingPromotion[];
  nextToken?: string;
}
export const ListOfferingPromotionsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    offeringPromotions: S.optional(OfferingPromotions),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListOfferingPromotionsResult",
}) as any as S.Schema<ListOfferingPromotionsResult>;
export interface ListOfferingsRequest {
  nextToken?: string;
}
export const ListOfferingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String) }).pipe(
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
  identifier: "ListOfferingsRequest",
}) as any as S.Schema<ListOfferingsRequest>;
export type Offerings = Offering[];
export const Offerings = /*@__PURE__*/ S.Array(Offering);
export interface ListOfferingsResult {
  offerings?: Offering[];
  nextToken?: string;
}
export const ListOfferingsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    offerings: S.optional(Offerings),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListOfferingsResult",
}) as any as S.Schema<ListOfferingsResult>;
export interface ListOfferingTransactionsRequest {
  nextToken?: string;
}
export const ListOfferingTransactionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String) }).pipe(
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
  identifier: "ListOfferingTransactionsRequest",
}) as any as S.Schema<ListOfferingTransactionsRequest>;
export type TransactionIdentifier = string;
export interface OfferingTransaction {
  offeringStatus?: OfferingStatus;
  transactionId?: string;
  offeringPromotionId?: string;
  createdOn?: Date;
  cost?: MonetaryAmount;
}
export const OfferingTransaction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    offeringStatus: S.optional(OfferingStatus),
    transactionId: S.optional(S.String),
    offeringPromotionId: S.optional(S.String),
    createdOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    cost: S.optional(MonetaryAmount),
  }),
).annotate({
  identifier: "OfferingTransaction",
}) as any as S.Schema<OfferingTransaction>;
export type OfferingTransactions = OfferingTransaction[];
export const OfferingTransactions = /*@__PURE__*/ S.Array(OfferingTransaction);
export interface ListOfferingTransactionsResult {
  offeringTransactions?: OfferingTransaction[];
  nextToken?: string;
}
export const ListOfferingTransactionsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    offeringTransactions: S.optional(OfferingTransactions),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListOfferingTransactionsResult",
}) as any as S.Schema<ListOfferingTransactionsResult>;
export interface ListProjectsRequest {
  arn?: string;
  nextToken?: string;
}
export const ListProjectsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.optional(S.String), nextToken: S.optional(S.String) }).pipe(
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
  identifier: "ListProjectsRequest",
}) as any as S.Schema<ListProjectsRequest>;
export type Projects = Project[];
export const Projects = /*@__PURE__*/ S.Array(Project);
export interface ListProjectsResult {
  projects?: Project[];
  nextToken?: string;
}
export const ListProjectsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    projects: S.optional(Projects),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListProjectsResult",
}) as any as S.Schema<ListProjectsResult>;
export interface ListRemoteAccessSessionsRequest {
  arn: string;
  nextToken?: string;
}
export const ListRemoteAccessSessionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String, nextToken: S.optional(S.String) }).pipe(
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
  identifier: "ListRemoteAccessSessionsRequest",
}) as any as S.Schema<ListRemoteAccessSessionsRequest>;
export type RemoteAccessSessions = RemoteAccessSession[];
export const RemoteAccessSessions = /*@__PURE__*/ S.Array(RemoteAccessSession);
export interface ListRemoteAccessSessionsResult {
  remoteAccessSessions?: RemoteAccessSession[];
  nextToken?: string;
}
export const ListRemoteAccessSessionsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    remoteAccessSessions: S.optional(RemoteAccessSessions),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListRemoteAccessSessionsResult",
}) as any as S.Schema<ListRemoteAccessSessionsResult>;
export interface ListRunsRequest {
  arn: string;
  nextToken?: string;
}
export const ListRunsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String, nextToken: S.optional(S.String) }).pipe(
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
  identifier: "ListRunsRequest",
}) as any as S.Schema<ListRunsRequest>;
export type Runs = Run[];
export const Runs = /*@__PURE__*/ S.Array(Run);
export interface ListRunsResult {
  runs?: Run[];
  nextToken?: string;
}
export const ListRunsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ runs: S.optional(Runs), nextToken: S.optional(S.String) }).pipe(
    ns,
  ),
).annotate({ identifier: "ListRunsResult" }) as any as S.Schema<ListRunsResult>;
export interface ListSamplesRequest {
  arn: string;
  nextToken?: string;
}
export const ListSamplesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String, nextToken: S.optional(S.String) }).pipe(
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
  identifier: "ListSamplesRequest",
}) as any as S.Schema<ListSamplesRequest>;
export type SampleType =
  | "CPU"
  | "MEMORY"
  | "THREADS"
  | "RX_RATE"
  | "TX_RATE"
  | "RX"
  | "TX"
  | "NATIVE_FRAMES"
  | "NATIVE_FPS"
  | "NATIVE_MIN_DRAWTIME"
  | "NATIVE_AVG_DRAWTIME"
  | "NATIVE_MAX_DRAWTIME"
  | "OPENGL_FRAMES"
  | "OPENGL_FPS"
  | "OPENGL_MIN_DRAWTIME"
  | "OPENGL_AVG_DRAWTIME"
  | "OPENGL_MAX_DRAWTIME"
  | (string & {});
export const SampleType = S.String;

export interface Sample {
  arn?: string;
  type?: SampleType;
  url?: string;
}
export const Sample = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    type: S.optional(SampleType),
    url: S.optional(S.String),
  }),
).annotate({ identifier: "Sample" }) as any as S.Schema<Sample>;
export type Samples = Sample[];
export const Samples = /*@__PURE__*/ S.Array(Sample);
export interface ListSamplesResult {
  samples?: Sample[];
  nextToken?: string;
}
export const ListSamplesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    samples: S.optional(Samples),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListSamplesResult",
}) as any as S.Schema<ListSamplesResult>;
export interface ListSuitesRequest {
  arn: string;
  nextToken?: string;
}
export const ListSuitesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String, nextToken: S.optional(S.String) }).pipe(
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
  identifier: "ListSuitesRequest",
}) as any as S.Schema<ListSuitesRequest>;
export type Suites = Suite[];
export const Suites = /*@__PURE__*/ S.Array(Suite);
export interface ListSuitesResult {
  suites?: Suite[];
  nextToken?: string;
}
export const ListSuitesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    suites: S.optional(Suites),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListSuitesResult",
}) as any as S.Schema<ListSuitesResult>;
export interface ListTagsForResourceRequest {
  ResourceARN: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String }).pipe(
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
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.String, Value: S.String }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = /*@__PURE__*/ S.Array(Tag);
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(TagList) }).pipe(ns),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export type MaxPageSize = number;
export interface ListTestGridProjectsRequest {
  maxResult?: number;
  nextToken?: string;
}
export const ListTestGridProjectsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResult: S.optional(S.Number),
    nextToken: S.optional(S.String),
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
  identifier: "ListTestGridProjectsRequest",
}) as any as S.Schema<ListTestGridProjectsRequest>;
export type TestGridProjects = TestGridProject[];
export const TestGridProjects = /*@__PURE__*/ S.Array(TestGridProject);
export interface ListTestGridProjectsResult {
  testGridProjects?: TestGridProject[];
  nextToken?: string;
}
export const ListTestGridProjectsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    testGridProjects: S.optional(TestGridProjects),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListTestGridProjectsResult",
}) as any as S.Schema<ListTestGridProjectsResult>;
export interface ListTestGridSessionActionsRequest {
  sessionArn: string;
  maxResult?: number;
  nextToken?: string;
}
export const ListTestGridSessionActionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionArn: S.String,
    maxResult: S.optional(S.Number),
    nextToken: S.optional(S.String),
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
  identifier: "ListTestGridSessionActionsRequest",
}) as any as S.Schema<ListTestGridSessionActionsRequest>;
export interface TestGridSessionAction {
  action?: string;
  started?: Date;
  duration?: number;
  statusCode?: string;
  requestMethod?: string;
}
export const TestGridSessionAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    action: S.optional(S.String),
    started: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    duration: S.optional(S.Number),
    statusCode: S.optional(S.String),
    requestMethod: S.optional(S.String),
  }),
).annotate({
  identifier: "TestGridSessionAction",
}) as any as S.Schema<TestGridSessionAction>;
export type TestGridSessionActions = TestGridSessionAction[];
export const TestGridSessionActions = /*@__PURE__*/ S.Array(
  TestGridSessionAction,
);
export interface ListTestGridSessionActionsResult {
  actions?: TestGridSessionAction[];
  nextToken?: string;
}
export const ListTestGridSessionActionsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    actions: S.optional(TestGridSessionActions),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListTestGridSessionActionsResult",
}) as any as S.Schema<ListTestGridSessionActionsResult>;
export type TestGridSessionArtifactCategory = "VIDEO" | "LOG" | (string & {});
export const TestGridSessionArtifactCategory = S.String;

export interface ListTestGridSessionArtifactsRequest {
  sessionArn: string;
  type?: TestGridSessionArtifactCategory;
  maxResult?: number;
  nextToken?: string;
}
export const ListTestGridSessionArtifactsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionArn: S.String,
    type: S.optional(TestGridSessionArtifactCategory),
    maxResult: S.optional(S.Number),
    nextToken: S.optional(S.String),
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
  identifier: "ListTestGridSessionArtifactsRequest",
}) as any as S.Schema<ListTestGridSessionArtifactsRequest>;
export type TestGridSessionArtifactType =
  | "UNKNOWN"
  | "VIDEO"
  | "SELENIUM_LOG"
  | (string & {});
export const TestGridSessionArtifactType = S.String;

export interface TestGridSessionArtifact {
  filename?: string;
  type?: TestGridSessionArtifactType;
  url?: string | redacted.Redacted<string>;
}
export const TestGridSessionArtifact = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    filename: S.optional(S.String),
    type: S.optional(TestGridSessionArtifactType),
    url: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "TestGridSessionArtifact",
}) as any as S.Schema<TestGridSessionArtifact>;
export type TestGridSessionArtifacts = TestGridSessionArtifact[];
export const TestGridSessionArtifacts = /*@__PURE__*/ S.Array(
  TestGridSessionArtifact,
);
export interface ListTestGridSessionArtifactsResult {
  artifacts?: TestGridSessionArtifact[];
  nextToken?: string;
}
export const ListTestGridSessionArtifactsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    artifacts: S.optional(TestGridSessionArtifacts),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListTestGridSessionArtifactsResult",
}) as any as S.Schema<ListTestGridSessionArtifactsResult>;
export interface ListTestGridSessionsRequest {
  projectArn: string;
  status?: TestGridSessionStatus;
  creationTimeAfter?: Date;
  creationTimeBefore?: Date;
  endTimeAfter?: Date;
  endTimeBefore?: Date;
  maxResult?: number;
  nextToken?: string;
}
export const ListTestGridSessionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    projectArn: S.String,
    status: S.optional(TestGridSessionStatus),
    creationTimeAfter: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    creationTimeBefore: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    endTimeAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    endTimeBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    maxResult: S.optional(S.Number),
    nextToken: S.optional(S.String),
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
  identifier: "ListTestGridSessionsRequest",
}) as any as S.Schema<ListTestGridSessionsRequest>;
export type TestGridSessions = TestGridSession[];
export const TestGridSessions = /*@__PURE__*/ S.Array(TestGridSession);
export interface ListTestGridSessionsResult {
  testGridSessions?: TestGridSession[];
  nextToken?: string;
}
export const ListTestGridSessionsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    testGridSessions: S.optional(TestGridSessions),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListTestGridSessionsResult",
}) as any as S.Schema<ListTestGridSessionsResult>;
export interface ListTestsRequest {
  arn: string;
  nextToken?: string;
}
export const ListTestsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String, nextToken: S.optional(S.String) }).pipe(
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
  identifier: "ListTestsRequest",
}) as any as S.Schema<ListTestsRequest>;
export type Tests = Test[];
export const Tests = /*@__PURE__*/ S.Array(Test);
export interface ListTestsResult {
  tests?: Test[];
  nextToken?: string;
}
export const ListTestsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tests: S.optional(Tests), nextToken: S.optional(S.String) }).pipe(
    ns,
  ),
).annotate({
  identifier: "ListTestsResult",
}) as any as S.Schema<ListTestsResult>;
export interface ListUniqueProblemsRequest {
  arn: string;
  nextToken?: string;
}
export const ListUniqueProblemsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String, nextToken: S.optional(S.String) }).pipe(
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
  identifier: "ListUniqueProblemsRequest",
}) as any as S.Schema<ListUniqueProblemsRequest>;
export interface ProblemDetail {
  arn?: string;
  name?: string;
}
export const ProblemDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.optional(S.String), name: S.optional(S.String) }),
).annotate({ identifier: "ProblemDetail" }) as any as S.Schema<ProblemDetail>;
export interface Problem {
  run?: ProblemDetail;
  job?: ProblemDetail;
  suite?: ProblemDetail;
  test?: ProblemDetail;
  device?: Device;
  result?: ExecutionResult;
  message?: string;
}
export const Problem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    run: S.optional(ProblemDetail),
    job: S.optional(ProblemDetail),
    suite: S.optional(ProblemDetail),
    test: S.optional(ProblemDetail),
    device: S.optional(Device),
    result: S.optional(ExecutionResult),
    message: S.optional(S.String),
  }),
).annotate({ identifier: "Problem" }) as any as S.Schema<Problem>;
export type Problems = Problem[];
export const Problems = /*@__PURE__*/ S.Array(Problem);
export interface UniqueProblem {
  message?: string;
  problems?: Problem[];
}
export const UniqueProblem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ message: S.optional(S.String), problems: S.optional(Problems) }),
).annotate({ identifier: "UniqueProblem" }) as any as S.Schema<UniqueProblem>;
export type UniqueProblems = UniqueProblem[];
export const UniqueProblems = /*@__PURE__*/ S.Array(UniqueProblem);
export type UniqueProblemsByExecutionResultMap = {
  [key in ExecutionResult]?: UniqueProblem[];
};
export const UniqueProblemsByExecutionResultMap = /*@__PURE__*/ S.Record(
  ExecutionResult,
  UniqueProblems.pipe(S.optional),
);
export interface ListUniqueProblemsResult {
  uniqueProblems?: { [key: string]: UniqueProblem[] | undefined };
  nextToken?: string;
}
export const ListUniqueProblemsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    uniqueProblems: S.optional(UniqueProblemsByExecutionResultMap),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListUniqueProblemsResult",
}) as any as S.Schema<ListUniqueProblemsResult>;
export interface ListUploadsRequest {
  arn: string;
  type?: UploadType;
  nextToken?: string;
}
export const ListUploadsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    type: S.optional(UploadType),
    nextToken: S.optional(S.String),
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
  identifier: "ListUploadsRequest",
}) as any as S.Schema<ListUploadsRequest>;
export type Uploads = Upload[];
export const Uploads = /*@__PURE__*/ S.Array(Upload);
export interface ListUploadsResult {
  uploads?: Upload[];
  nextToken?: string;
}
export const ListUploadsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    uploads: S.optional(Uploads),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListUploadsResult",
}) as any as S.Schema<ListUploadsResult>;
export interface ListVPCEConfigurationsRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListVPCEConfigurationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
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
  identifier: "ListVPCEConfigurationsRequest",
}) as any as S.Schema<ListVPCEConfigurationsRequest>;
export type VPCEConfigurations = VPCEConfiguration[];
export const VPCEConfigurations = /*@__PURE__*/ S.Array(VPCEConfiguration);
export interface ListVPCEConfigurationsResult {
  vpceConfigurations?: VPCEConfiguration[];
  nextToken?: string;
}
export const ListVPCEConfigurationsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vpceConfigurations: S.optional(VPCEConfigurations),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListVPCEConfigurationsResult",
}) as any as S.Schema<ListVPCEConfigurationsResult>;
export interface PurchaseOfferingRequest {
  offeringId: string;
  quantity: number;
  offeringPromotionId?: string;
}
export const PurchaseOfferingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    offeringId: S.String,
    quantity: S.Number,
    offeringPromotionId: S.optional(S.String),
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
  identifier: "PurchaseOfferingRequest",
}) as any as S.Schema<PurchaseOfferingRequest>;
export interface PurchaseOfferingResult {
  offeringTransaction?: OfferingTransaction;
}
export const PurchaseOfferingResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ offeringTransaction: S.optional(OfferingTransaction) }).pipe(ns),
).annotate({
  identifier: "PurchaseOfferingResult",
}) as any as S.Schema<PurchaseOfferingResult>;
export interface RenewOfferingRequest {
  offeringId: string;
  quantity: number;
}
export const RenewOfferingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ offeringId: S.String, quantity: S.Number }).pipe(
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
  identifier: "RenewOfferingRequest",
}) as any as S.Schema<RenewOfferingRequest>;
export interface RenewOfferingResult {
  offeringTransaction?: OfferingTransaction;
}
export const RenewOfferingResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ offeringTransaction: S.optional(OfferingTransaction) }).pipe(ns),
).annotate({
  identifier: "RenewOfferingResult",
}) as any as S.Schema<RenewOfferingResult>;
export interface DeviceSelectionConfiguration {
  filters: DeviceFilter[];
  maxDevices: number;
}
export const DeviceSelectionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ filters: DeviceFilters, maxDevices: S.Number }),
).annotate({
  identifier: "DeviceSelectionConfiguration",
}) as any as S.Schema<DeviceSelectionConfiguration>;
export type AccountsCleanup = boolean;
export type AppPackagesCleanup = boolean;
export interface ExecutionConfiguration {
  jobTimeoutMinutes?: number;
  accountsCleanup?: boolean;
  appPackagesCleanup?: boolean;
  videoCapture?: boolean;
  skipAppResign?: boolean;
}
export const ExecutionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobTimeoutMinutes: S.optional(S.Number),
    accountsCleanup: S.optional(S.Boolean),
    appPackagesCleanup: S.optional(S.Boolean),
    videoCapture: S.optional(S.Boolean),
    skipAppResign: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ExecutionConfiguration",
}) as any as S.Schema<ExecutionConfiguration>;
export interface ScheduleRunRequest {
  projectArn: string;
  appArn?: string;
  devicePoolArn?: string;
  deviceSelectionConfiguration?: DeviceSelectionConfiguration;
  name?: string;
  test: ScheduleRunTest;
  configuration?: ScheduleRunConfiguration;
  executionConfiguration?: ExecutionConfiguration;
}
export const ScheduleRunRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    projectArn: S.String,
    appArn: S.optional(S.String),
    devicePoolArn: S.optional(S.String),
    deviceSelectionConfiguration: S.optional(DeviceSelectionConfiguration),
    name: S.optional(S.String),
    test: ScheduleRunTest,
    configuration: S.optional(ScheduleRunConfiguration),
    executionConfiguration: S.optional(ExecutionConfiguration),
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
  identifier: "ScheduleRunRequest",
}) as any as S.Schema<ScheduleRunRequest>;
export interface ScheduleRunResult {
  run?: Run;
}
export const ScheduleRunResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ run: S.optional(Run) }).pipe(ns),
).annotate({
  identifier: "ScheduleRunResult",
}) as any as S.Schema<ScheduleRunResult>;
export interface StopJobRequest {
  arn: string;
}
export const StopJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
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
).annotate({ identifier: "StopJobRequest" }) as any as S.Schema<StopJobRequest>;
export interface StopJobResult {
  job?: Job;
}
export const StopJobResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ job: S.optional(Job) }).pipe(ns),
).annotate({ identifier: "StopJobResult" }) as any as S.Schema<StopJobResult>;
export interface StopRemoteAccessSessionRequest {
  arn: string;
}
export const StopRemoteAccessSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
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
  identifier: "StopRemoteAccessSessionRequest",
}) as any as S.Schema<StopRemoteAccessSessionRequest>;
export interface StopRemoteAccessSessionResult {
  remoteAccessSession?: RemoteAccessSession;
}
export const StopRemoteAccessSessionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ remoteAccessSession: S.optional(RemoteAccessSession) }).pipe(ns),
).annotate({
  identifier: "StopRemoteAccessSessionResult",
}) as any as S.Schema<StopRemoteAccessSessionResult>;
export interface StopRunRequest {
  arn: string;
}
export const StopRunRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
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
).annotate({ identifier: "StopRunRequest" }) as any as S.Schema<StopRunRequest>;
export interface StopRunResult {
  run?: Run;
}
export const StopRunResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ run: S.optional(Run) }).pipe(ns),
).annotate({ identifier: "StopRunResult" }) as any as S.Schema<StopRunResult>;
export interface TagResourceRequest {
  ResourceARN: string;
  Tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String, Tags: TagList }).pipe(
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
  identifier: "TagResourceRequest",
}) as any as S.Schema<TagResourceRequest>;
export interface TagResourceResponse {}
export const TagResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "TagResourceResponse",
}) as any as S.Schema<TagResourceResponse>;
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  ResourceARN: string;
  TagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String, TagKeys: TagKeyList }).pipe(
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
  identifier: "UntagResourceRequest",
}) as any as S.Schema<UntagResourceRequest>;
export interface UntagResourceResponse {}
export const UntagResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export interface UpdateDeviceInstanceRequest {
  arn: string;
  profileArn?: string;
  labels?: string[];
}
export const UpdateDeviceInstanceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    profileArn: S.optional(S.String),
    labels: S.optional(InstanceLabels),
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
  identifier: "UpdateDeviceInstanceRequest",
}) as any as S.Schema<UpdateDeviceInstanceRequest>;
export interface UpdateDeviceInstanceResult {
  deviceInstance?: DeviceInstance;
}
export const UpdateDeviceInstanceResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ deviceInstance: S.optional(DeviceInstance) }).pipe(ns),
).annotate({
  identifier: "UpdateDeviceInstanceResult",
}) as any as S.Schema<UpdateDeviceInstanceResult>;
export interface UpdateDevicePoolRequest {
  arn: string;
  name?: string;
  description?: string;
  rules?: Rule[];
  maxDevices?: number;
  clearMaxDevices?: boolean;
}
export const UpdateDevicePoolRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    name: S.optional(S.String),
    description: S.optional(S.String),
    rules: S.optional(Rules),
    maxDevices: S.optional(S.Number),
    clearMaxDevices: S.optional(S.Boolean),
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
  identifier: "UpdateDevicePoolRequest",
}) as any as S.Schema<UpdateDevicePoolRequest>;
export interface UpdateDevicePoolResult {
  devicePool?: DevicePool;
}
export const UpdateDevicePoolResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ devicePool: S.optional(DevicePool) }).pipe(ns),
).annotate({
  identifier: "UpdateDevicePoolResult",
}) as any as S.Schema<UpdateDevicePoolResult>;
export interface UpdateInstanceProfileRequest {
  arn: string;
  name?: string;
  description?: string;
  packageCleanup?: boolean;
  excludeAppPackagesFromCleanup?: string[];
  rebootAfterUse?: boolean;
}
export const UpdateInstanceProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    name: S.optional(S.String),
    description: S.optional(S.String),
    packageCleanup: S.optional(S.Boolean),
    excludeAppPackagesFromCleanup: S.optional(PackageIds),
    rebootAfterUse: S.optional(S.Boolean),
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
  identifier: "UpdateInstanceProfileRequest",
}) as any as S.Schema<UpdateInstanceProfileRequest>;
export interface UpdateInstanceProfileResult {
  instanceProfile?: InstanceProfile;
}
export const UpdateInstanceProfileResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ instanceProfile: S.optional(InstanceProfile) }).pipe(ns),
).annotate({
  identifier: "UpdateInstanceProfileResult",
}) as any as S.Schema<UpdateInstanceProfileResult>;
export interface UpdateNetworkProfileRequest {
  arn: string;
  name?: string;
  description?: string;
  type?: NetworkProfileType;
  uplinkBandwidthBits?: number;
  downlinkBandwidthBits?: number;
  uplinkDelayMs?: number;
  downlinkDelayMs?: number;
  uplinkJitterMs?: number;
  downlinkJitterMs?: number;
  uplinkLossPercent?: number;
  downlinkLossPercent?: number;
}
export const UpdateNetworkProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    name: S.optional(S.String),
    description: S.optional(S.String),
    type: S.optional(NetworkProfileType),
    uplinkBandwidthBits: S.optional(S.Number),
    downlinkBandwidthBits: S.optional(S.Number),
    uplinkDelayMs: S.optional(S.Number),
    downlinkDelayMs: S.optional(S.Number),
    uplinkJitterMs: S.optional(S.Number),
    downlinkJitterMs: S.optional(S.Number),
    uplinkLossPercent: S.optional(S.Number),
    downlinkLossPercent: S.optional(S.Number),
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
  identifier: "UpdateNetworkProfileRequest",
}) as any as S.Schema<UpdateNetworkProfileRequest>;
export interface UpdateNetworkProfileResult {
  networkProfile?: NetworkProfile;
}
export const UpdateNetworkProfileResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ networkProfile: S.optional(NetworkProfile) }).pipe(ns),
).annotate({
  identifier: "UpdateNetworkProfileResult",
}) as any as S.Schema<UpdateNetworkProfileResult>;
export interface UpdateProjectRequest {
  arn: string;
  name?: string;
  defaultJobTimeoutMinutes?: number;
  vpcConfig?: VpcConfig;
  environmentVariables?: EnvironmentVariable[];
  executionRoleArn?: string;
}
export const UpdateProjectRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    name: S.optional(S.String),
    defaultJobTimeoutMinutes: S.optional(S.Number),
    vpcConfig: S.optional(VpcConfig),
    environmentVariables: S.optional(EnvironmentVariables),
    executionRoleArn: S.optional(S.String),
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
  identifier: "UpdateProjectRequest",
}) as any as S.Schema<UpdateProjectRequest>;
export interface UpdateProjectResult {
  project?: Project;
}
export const UpdateProjectResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ project: S.optional(Project) }).pipe(ns),
).annotate({
  identifier: "UpdateProjectResult",
}) as any as S.Schema<UpdateProjectResult>;
export interface UpdateTestGridProjectRequest {
  projectArn: string;
  name?: string;
  description?: string;
  vpcConfig?: TestGridVpcConfig;
}
export const UpdateTestGridProjectRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    projectArn: S.String,
    name: S.optional(S.String),
    description: S.optional(S.String),
    vpcConfig: S.optional(TestGridVpcConfig),
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
  identifier: "UpdateTestGridProjectRequest",
}) as any as S.Schema<UpdateTestGridProjectRequest>;
export interface UpdateTestGridProjectResult {
  testGridProject?: TestGridProject;
}
export const UpdateTestGridProjectResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ testGridProject: S.optional(TestGridProject) }).pipe(ns),
).annotate({
  identifier: "UpdateTestGridProjectResult",
}) as any as S.Schema<UpdateTestGridProjectResult>;
export interface UpdateUploadRequest {
  arn: string;
  name?: string;
  contentType?: string;
  editContent?: boolean;
}
export const UpdateUploadRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    name: S.optional(S.String),
    contentType: S.optional(S.String),
    editContent: S.optional(S.Boolean),
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
  identifier: "UpdateUploadRequest",
}) as any as S.Schema<UpdateUploadRequest>;
export interface UpdateUploadResult {
  upload?: Upload;
}
export const UpdateUploadResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ upload: S.optional(Upload) }).pipe(ns),
).annotate({
  identifier: "UpdateUploadResult",
}) as any as S.Schema<UpdateUploadResult>;
export interface UpdateVPCEConfigurationRequest {
  arn: string;
  vpceConfigurationName?: string;
  vpceServiceName?: string;
  serviceDnsName?: string;
  vpceConfigurationDescription?: string;
}
export const UpdateVPCEConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    vpceConfigurationName: S.optional(S.String),
    vpceServiceName: S.optional(S.String),
    serviceDnsName: S.optional(S.String),
    vpceConfigurationDescription: S.optional(S.String),
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
  identifier: "UpdateVPCEConfigurationRequest",
}) as any as S.Schema<UpdateVPCEConfigurationRequest>;
export interface UpdateVPCEConfigurationResult {
  vpceConfiguration?: VPCEConfiguration;
}
export const UpdateVPCEConfigurationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ vpceConfiguration: S.optional(VPCEConfiguration) }).pipe(ns),
).annotate({
  identifier: "UpdateVPCEConfigurationResult",
}) as any as S.Schema<UpdateVPCEConfigurationResult>;
export type ExceptionMessage = string;
export type CreateDevicePoolError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Creates a device pool.
 */
export const createDevicePool: API.OperationMethod<
  CreateDevicePoolRequest,
  CreateDevicePoolResult,
  CreateDevicePoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDevicePoolRequest,
  output: CreateDevicePoolResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDevicePool",
}));

export type CreateInstanceProfileError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Creates a profile that can be applied to one or more private fleet device
 * instances.
 */
export const createInstanceProfile: API.OperationMethod<
  CreateInstanceProfileRequest,
  CreateInstanceProfileResult,
  CreateInstanceProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateInstanceProfileRequest,
  output: CreateInstanceProfileResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateInstanceProfile",
}));

export type CreateNetworkProfileError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Creates a network profile.
 */
export const createNetworkProfile: API.OperationMethod<
  CreateNetworkProfileRequest,
  CreateNetworkProfileResult,
  CreateNetworkProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateNetworkProfileRequest,
  output: CreateNetworkProfileResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateNetworkProfile",
}));

export type CreateProjectError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | TagOperationException
  | CommonErrors;
/**
 * Creates a project.
 */
export const createProject: API.OperationMethod<
  CreateProjectRequest,
  CreateProjectResult,
  CreateProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateProjectRequest,
  output: CreateProjectResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
    TagOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProject",
}));

export type CreateRemoteAccessSessionError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Specifies and starts a remote access session.
 */
export const createRemoteAccessSession: API.OperationMethod<
  CreateRemoteAccessSessionRequest,
  CreateRemoteAccessSessionResult,
  CreateRemoteAccessSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRemoteAccessSessionRequest,
  output: CreateRemoteAccessSessionResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRemoteAccessSession",
}));

export type CreateTestGridProjectError =
  | ArgumentException
  | InternalServiceException
  | LimitExceededException
  | CommonErrors;
/**
 * Creates a Selenium testing project. Projects are used to track TestGridSession
 * instances.
 */
export const createTestGridProject: API.OperationMethod<
  CreateTestGridProjectRequest,
  CreateTestGridProjectResult,
  CreateTestGridProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateTestGridProjectRequest,
  output: CreateTestGridProjectResult,
  errors: [ArgumentException, InternalServiceException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTestGridProject",
}));

export type CreateTestGridUrlError =
  | ArgumentException
  | InternalServiceException
  | NotFoundException
  | CommonErrors;
/**
 * Creates a signed, short-term URL that can be passed to a Selenium `RemoteWebDriver`
 * constructor.
 */
export const createTestGridUrl: API.OperationMethod<
  CreateTestGridUrlRequest,
  CreateTestGridUrlResult,
  CreateTestGridUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateTestGridUrlRequest,
  output: CreateTestGridUrlResult,
  errors: [ArgumentException, InternalServiceException, NotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTestGridUrl",
}));

export type CreateUploadError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Uploads an app or test scripts.
 */
export const createUpload: API.OperationMethod<
  CreateUploadRequest,
  CreateUploadResult,
  CreateUploadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateUploadRequest,
  output: CreateUploadResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUpload",
}));

export type CreateVPCEConfigurationError =
  | ArgumentException
  | LimitExceededException
  | ServiceAccountException
  | CommonErrors;
/**
 * Creates a configuration record in Device Farm for your Amazon Virtual Private Cloud
 * (VPC) endpoint.
 */
export const createVPCEConfiguration: API.OperationMethod<
  CreateVPCEConfigurationRequest,
  CreateVPCEConfigurationResult,
  CreateVPCEConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateVPCEConfigurationRequest,
  output: CreateVPCEConfigurationResult,
  errors: [ArgumentException, LimitExceededException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVPCEConfiguration",
}));

export type DeleteDevicePoolError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Deletes a device pool given the pool ARN. Does not allow deletion of curated pools
 * owned by the system.
 */
export const deleteDevicePool: API.OperationMethod<
  DeleteDevicePoolRequest,
  DeleteDevicePoolResult,
  DeleteDevicePoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDevicePoolRequest,
  output: DeleteDevicePoolResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDevicePool",
}));

export type DeleteInstanceProfileError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Deletes a profile that can be applied to one or more private device instances.
 */
export const deleteInstanceProfile: API.OperationMethod<
  DeleteInstanceProfileRequest,
  DeleteInstanceProfileResult,
  DeleteInstanceProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteInstanceProfileRequest,
  output: DeleteInstanceProfileResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInstanceProfile",
}));

export type DeleteNetworkProfileError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Deletes a network profile.
 */
export const deleteNetworkProfile: API.OperationMethod<
  DeleteNetworkProfileRequest,
  DeleteNetworkProfileResult,
  DeleteNetworkProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteNetworkProfileRequest,
  output: DeleteNetworkProfileResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNetworkProfile",
}));

export type DeleteProjectError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Deletes an AWS Device Farm project, given the project ARN. You cannot delete a project if it has an active run or session.
 *
 * You cannot undo this operation.
 */
export const deleteProject: API.OperationMethod<
  DeleteProjectRequest,
  DeleteProjectResult,
  DeleteProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteProjectRequest,
  output: DeleteProjectResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProject",
}));

export type DeleteRemoteAccessSessionError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Deletes a completed remote access session and its results. You cannot delete a remote access session if it is still active.
 *
 * You cannot undo this operation.
 */
export const deleteRemoteAccessSession: API.OperationMethod<
  DeleteRemoteAccessSessionRequest,
  DeleteRemoteAccessSessionResult,
  DeleteRemoteAccessSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRemoteAccessSessionRequest,
  output: DeleteRemoteAccessSessionResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRemoteAccessSession",
}));

export type DeleteRunError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Deletes the run, given the run ARN. You cannot delete a run if it is still active.
 *
 * You cannot undo this operation.
 */
export const deleteRun: API.OperationMethod<
  DeleteRunRequest,
  DeleteRunResult,
  DeleteRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRunRequest,
  output: DeleteRunResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRun",
}));

export type DeleteTestGridProjectError =
  | ArgumentException
  | CannotDeleteException
  | InternalServiceException
  | NotFoundException
  | CommonErrors;
/**
 * Deletes a Selenium testing project and all content generated under it. You cannot delete a project if it has active sessions.
 *
 * You cannot undo this operation.
 */
export const deleteTestGridProject: API.OperationMethod<
  DeleteTestGridProjectRequest,
  DeleteTestGridProjectResult,
  DeleteTestGridProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTestGridProjectRequest,
  output: DeleteTestGridProjectResult,
  errors: [
    ArgumentException,
    CannotDeleteException,
    InternalServiceException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTestGridProject",
}));

export type DeleteUploadError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Deletes an upload given the upload ARN.
 */
export const deleteUpload: API.OperationMethod<
  DeleteUploadRequest,
  DeleteUploadResult,
  DeleteUploadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteUploadRequest,
  output: DeleteUploadResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUpload",
}));

export type DeleteVPCEConfigurationError =
  | ArgumentException
  | InvalidOperationException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Deletes a configuration for your Amazon Virtual Private Cloud (VPC) endpoint.
 */
export const deleteVPCEConfiguration: API.OperationMethod<
  DeleteVPCEConfigurationRequest,
  DeleteVPCEConfigurationResult,
  DeleteVPCEConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteVPCEConfigurationRequest,
  output: DeleteVPCEConfigurationResult,
  errors: [
    ArgumentException,
    InvalidOperationException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVPCEConfiguration",
}));

export type GetAccountSettingsError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Returns the number of unmetered iOS or unmetered Android devices that have been purchased by the
 * account.
 */
export const getAccountSettings: API.OperationMethod<
  GetAccountSettingsRequest,
  GetAccountSettingsResult,
  GetAccountSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAccountSettingsRequest,
  output: GetAccountSettingsResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountSettings",
}));

export type GetDeviceError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Gets information about a unique device type.
 */
export const getDevice: API.OperationMethod<
  GetDeviceRequest,
  GetDeviceResult,
  GetDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDeviceRequest,
  output: GetDeviceResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDevice",
}));

export type GetDeviceInstanceError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Returns information about a device instance that belongs to a private device fleet.
 */
export const getDeviceInstance: API.OperationMethod<
  GetDeviceInstanceRequest,
  GetDeviceInstanceResult,
  GetDeviceInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDeviceInstanceRequest,
  output: GetDeviceInstanceResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeviceInstance",
}));

export type GetDevicePoolError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Gets information about a device pool.
 */
export const getDevicePool: API.OperationMethod<
  GetDevicePoolRequest,
  GetDevicePoolResult,
  GetDevicePoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDevicePoolRequest,
  output: GetDevicePoolResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDevicePool",
}));

export type GetDevicePoolCompatibilityError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Gets information about compatibility with a device pool.
 */
export const getDevicePoolCompatibility: API.OperationMethod<
  GetDevicePoolCompatibilityRequest,
  GetDevicePoolCompatibilityResult,
  GetDevicePoolCompatibilityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDevicePoolCompatibilityRequest,
  output: GetDevicePoolCompatibilityResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDevicePoolCompatibility",
}));

export type GetInstanceProfileError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Returns information about the specified instance profile.
 */
export const getInstanceProfile: API.OperationMethod<
  GetInstanceProfileRequest,
  GetInstanceProfileResult,
  GetInstanceProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetInstanceProfileRequest,
  output: GetInstanceProfileResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInstanceProfile",
}));

export type GetJobError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Gets information about a job.
 */
export const getJob: API.OperationMethod<
  GetJobRequest,
  GetJobResult,
  GetJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetJobRequest,
  output: GetJobResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJob",
}));

export type GetNetworkProfileError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Returns information about a network profile.
 */
export const getNetworkProfile: API.OperationMethod<
  GetNetworkProfileRequest,
  GetNetworkProfileResult,
  GetNetworkProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetNetworkProfileRequest,
  output: GetNetworkProfileResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNetworkProfile",
}));

export type GetOfferingStatusError =
  | ArgumentException
  | LimitExceededException
  | NotEligibleException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Gets the current status and future status of all offerings purchased by an AWS account. The response
 * indicates how many offerings are currently available and the offerings that will be available in the next
 * period. The API returns a `NotEligible` error if the user is not permitted to invoke the
 * operation. If you must be able to invoke this operation, contact aws-devicefarm-support@amazon.com.
 */
export const getOfferingStatus: API.PaginatedOperationMethod<
  GetOfferingStatusRequest,
  GetOfferingStatusResult,
  GetOfferingStatusError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetOfferingStatusRequest,
  output: GetOfferingStatusResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotEligibleException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOfferingStatus",
  pagination: { inputToken: "nextToken", outputToken: "nextToken" } as const,
})) as any;

export type GetProjectError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Gets information about a project.
 */
export const getProject: API.OperationMethod<
  GetProjectRequest,
  GetProjectResult,
  GetProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetProjectRequest,
  output: GetProjectResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProject",
}));

export type GetRemoteAccessSessionError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Returns a link to a currently running remote access session.
 */
export const getRemoteAccessSession: API.OperationMethod<
  GetRemoteAccessSessionRequest,
  GetRemoteAccessSessionResult,
  GetRemoteAccessSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRemoteAccessSessionRequest,
  output: GetRemoteAccessSessionResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRemoteAccessSession",
}));

export type GetRunError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Gets information about a run.
 */
export const getRun: API.OperationMethod<
  GetRunRequest,
  GetRunResult,
  GetRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRunRequest,
  output: GetRunResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRun",
}));

export type GetSuiteError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Gets information about a suite.
 */
export const getSuite: API.OperationMethod<
  GetSuiteRequest,
  GetSuiteResult,
  GetSuiteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSuiteRequest,
  output: GetSuiteResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSuite",
}));

export type GetTestError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Gets information about a test.
 */
export const getTest: API.OperationMethod<
  GetTestRequest,
  GetTestResult,
  GetTestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTestRequest,
  output: GetTestResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTest",
}));

export type GetTestGridProjectError =
  | ArgumentException
  | InternalServiceException
  | NotFoundException
  | CommonErrors;
/**
 * Retrieves information about a Selenium testing project.
 */
export const getTestGridProject: API.OperationMethod<
  GetTestGridProjectRequest,
  GetTestGridProjectResult,
  GetTestGridProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTestGridProjectRequest,
  output: GetTestGridProjectResult,
  errors: [ArgumentException, InternalServiceException, NotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTestGridProject",
}));

export type GetTestGridSessionError =
  | ArgumentException
  | InternalServiceException
  | NotFoundException
  | CommonErrors;
/**
 * A session is an instance of a browser created through a `RemoteWebDriver` with the URL from
 * CreateTestGridUrlResult. You can use the following to look up sessions:
 *
 * - The session ARN.
 *
 * - The project ARN and a session ID.
 */
export const getTestGridSession: API.OperationMethod<
  GetTestGridSessionRequest,
  GetTestGridSessionResult,
  GetTestGridSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTestGridSessionRequest,
  output: GetTestGridSessionResult,
  errors: [ArgumentException, InternalServiceException, NotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTestGridSession",
}));

export type GetUploadError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Gets information about an upload.
 */
export const getUpload: API.OperationMethod<
  GetUploadRequest,
  GetUploadResult,
  GetUploadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetUploadRequest,
  output: GetUploadResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUpload",
}));

export type GetVPCEConfigurationError =
  | ArgumentException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Returns information about the configuration settings for your Amazon Virtual Private
 * Cloud (VPC) endpoint.
 */
export const getVPCEConfiguration: API.OperationMethod<
  GetVPCEConfigurationRequest,
  GetVPCEConfigurationResult,
  GetVPCEConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetVPCEConfigurationRequest,
  output: GetVPCEConfigurationResult,
  errors: [ArgumentException, NotFoundException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVPCEConfiguration",
}));

export type InstallToRemoteAccessSessionError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Installs an application to the device in a remote access session. For Android
 * applications, the file must be in .apk format. For iOS applications, the file must be in
 * .ipa format.
 */
export const installToRemoteAccessSession: API.OperationMethod<
  InstallToRemoteAccessSessionRequest,
  InstallToRemoteAccessSessionResult,
  InstallToRemoteAccessSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: InstallToRemoteAccessSessionRequest,
  output: InstallToRemoteAccessSessionResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InstallToRemoteAccessSession",
}));

export type ListArtifactsError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Gets information about artifacts.
 */
export const listArtifacts: API.PaginatedOperationMethod<
  ListArtifactsRequest,
  ListArtifactsResult,
  ListArtifactsError,
  Credentials | HttpClient.HttpClient,
  Artifact
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListArtifactsRequest,
  output: ListArtifactsResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListArtifacts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "artifacts",
  } as const,
})) as any;

export type ListDeviceInstancesError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Returns information about the private device instances associated with one or more AWS
 * accounts.
 */
export const listDeviceInstances: API.OperationMethod<
  ListDeviceInstancesRequest,
  ListDeviceInstancesResult,
  ListDeviceInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListDeviceInstancesRequest,
  output: ListDeviceInstancesResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDeviceInstances",
}));

export type ListDevicePoolsError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Gets information about device pools.
 */
export const listDevicePools: API.PaginatedOperationMethod<
  ListDevicePoolsRequest,
  ListDevicePoolsResult,
  ListDevicePoolsError,
  Credentials | HttpClient.HttpClient,
  DevicePool
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDevicePoolsRequest,
  output: ListDevicePoolsResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDevicePools",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "devicePools",
  } as const,
})) as any;

export type ListDevicesError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Gets information about unique device types.
 */
export const listDevices: API.PaginatedOperationMethod<
  ListDevicesRequest,
  ListDevicesResult,
  ListDevicesError,
  Credentials | HttpClient.HttpClient,
  Device
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDevicesRequest,
  output: ListDevicesResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDevices",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "devices",
  } as const,
})) as any;

export type ListInstanceProfilesError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Returns information about all the instance profiles in an AWS account.
 */
export const listInstanceProfiles: API.OperationMethod<
  ListInstanceProfilesRequest,
  ListInstanceProfilesResult,
  ListInstanceProfilesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListInstanceProfilesRequest,
  output: ListInstanceProfilesResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInstanceProfiles",
}));

export type ListJobsError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Gets information about jobs for a given test run.
 */
export const listJobs: API.PaginatedOperationMethod<
  ListJobsRequest,
  ListJobsResult,
  ListJobsError,
  Credentials | HttpClient.HttpClient,
  Job
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListJobsRequest,
  output: ListJobsResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "jobs",
  } as const,
})) as any;

export type ListNetworkProfilesError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Returns the list of available network profiles.
 */
export const listNetworkProfiles: API.OperationMethod<
  ListNetworkProfilesRequest,
  ListNetworkProfilesResult,
  ListNetworkProfilesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListNetworkProfilesRequest,
  output: ListNetworkProfilesResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNetworkProfiles",
}));

export type ListOfferingPromotionsError =
  | ArgumentException
  | LimitExceededException
  | NotEligibleException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Returns a list of offering promotions. Each offering promotion record contains the ID and description
 * of the promotion. The API returns a `NotEligible` error if the caller is not permitted to invoke
 * the operation. Contact aws-devicefarm-support@amazon.com if you must be able to invoke this operation.
 */
export const listOfferingPromotions: API.OperationMethod<
  ListOfferingPromotionsRequest,
  ListOfferingPromotionsResult,
  ListOfferingPromotionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListOfferingPromotionsRequest,
  output: ListOfferingPromotionsResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotEligibleException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOfferingPromotions",
}));

export type ListOfferingsError =
  | ArgumentException
  | LimitExceededException
  | NotEligibleException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Returns a list of products or offerings that the user can manage through the API. Each offering record
 * indicates the recurring price per unit and the frequency for that offering. The API returns a
 * `NotEligible` error if the user is not permitted to invoke the operation. If you must be
 * able to invoke this operation, contact aws-devicefarm-support@amazon.com.
 */
export const listOfferings: API.PaginatedOperationMethod<
  ListOfferingsRequest,
  ListOfferingsResult,
  ListOfferingsError,
  Credentials | HttpClient.HttpClient,
  Offering
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListOfferingsRequest,
  output: ListOfferingsResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotEligibleException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOfferings",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "offerings",
  } as const,
})) as any;

export type ListOfferingTransactionsError =
  | ArgumentException
  | LimitExceededException
  | NotEligibleException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Returns a list of all historical purchases, renewals, and system renewal transactions for an AWS
 * account. The list is paginated and ordered by a descending timestamp (most recent transactions are first).
 * The API returns a `NotEligible` error if the user is not permitted to invoke the operation. If
 * you must be able to invoke this operation, contact aws-devicefarm-support@amazon.com.
 */
export const listOfferingTransactions: API.PaginatedOperationMethod<
  ListOfferingTransactionsRequest,
  ListOfferingTransactionsResult,
  ListOfferingTransactionsError,
  Credentials | HttpClient.HttpClient,
  OfferingTransaction
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListOfferingTransactionsRequest,
  output: ListOfferingTransactionsResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotEligibleException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOfferingTransactions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "offeringTransactions",
  } as const,
})) as any;

export type ListProjectsError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Gets information about projects.
 */
export const listProjects: API.PaginatedOperationMethod<
  ListProjectsRequest,
  ListProjectsResult,
  ListProjectsError,
  Credentials | HttpClient.HttpClient,
  Project
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsRequest,
  output: ListProjectsResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProjects",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "projects",
  } as const,
})) as any;

export type ListRemoteAccessSessionsError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Returns a list of all currently running remote access sessions.
 */
export const listRemoteAccessSessions: API.OperationMethod<
  ListRemoteAccessSessionsRequest,
  ListRemoteAccessSessionsResult,
  ListRemoteAccessSessionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListRemoteAccessSessionsRequest,
  output: ListRemoteAccessSessionsResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRemoteAccessSessions",
}));

export type ListRunsError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Gets information about runs, given an AWS Device Farm project ARN.
 */
export const listRuns: API.PaginatedOperationMethod<
  ListRunsRequest,
  ListRunsResult,
  ListRunsError,
  Credentials | HttpClient.HttpClient,
  Run
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRunsRequest,
  output: ListRunsResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRuns",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "runs",
  } as const,
})) as any;

export type ListSamplesError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Gets information about samples, given an AWS Device Farm job ARN.
 *
 * Device Farm does not support performance data samples during test executions.
 */
export const listSamples: API.PaginatedOperationMethod<
  ListSamplesRequest,
  ListSamplesResult,
  ListSamplesError,
  Credentials | HttpClient.HttpClient,
  Sample
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSamplesRequest,
  output: ListSamplesResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSamples",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "samples",
  } as const,
})) as any;

export type ListSuitesError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Gets information about test suites for a given job.
 */
export const listSuites: API.PaginatedOperationMethod<
  ListSuitesRequest,
  ListSuitesResult,
  ListSuitesError,
  Credentials | HttpClient.HttpClient,
  Suite
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSuitesRequest,
  output: ListSuitesResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSuites",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "suites",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | ArgumentException
  | NotFoundException
  | TagOperationException
  | CommonErrors;
/**
 * List the tags for an AWS Device Farm resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [ArgumentException, NotFoundException, TagOperationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListTestGridProjectsError =
  | ArgumentException
  | InternalServiceException
  | CommonErrors;
/**
 * Gets a list of all Selenium testing projects in your account.
 */
export const listTestGridProjects: API.PaginatedOperationMethod<
  ListTestGridProjectsRequest,
  ListTestGridProjectsResult,
  ListTestGridProjectsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTestGridProjectsRequest,
  output: ListTestGridProjectsResult,
  errors: [ArgumentException, InternalServiceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTestGridProjects",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResult",
  } as const,
})) as any;

export type ListTestGridSessionActionsError =
  | ArgumentException
  | InternalServiceException
  | NotFoundException
  | CommonErrors;
/**
 * Returns a list of the actions taken in a TestGridSession.
 */
export const listTestGridSessionActions: API.PaginatedOperationMethod<
  ListTestGridSessionActionsRequest,
  ListTestGridSessionActionsResult,
  ListTestGridSessionActionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTestGridSessionActionsRequest,
  output: ListTestGridSessionActionsResult,
  errors: [ArgumentException, InternalServiceException, NotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTestGridSessionActions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResult",
  } as const,
})) as any;

export type ListTestGridSessionArtifactsError =
  | ArgumentException
  | InternalServiceException
  | NotFoundException
  | CommonErrors;
/**
 * Retrieves a list of artifacts created during the session.
 */
export const listTestGridSessionArtifacts: API.PaginatedOperationMethod<
  ListTestGridSessionArtifactsRequest,
  ListTestGridSessionArtifactsResult,
  ListTestGridSessionArtifactsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTestGridSessionArtifactsRequest,
  output: ListTestGridSessionArtifactsResult,
  errors: [ArgumentException, InternalServiceException, NotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTestGridSessionArtifacts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResult",
  } as const,
})) as any;

export type ListTestGridSessionsError =
  | ArgumentException
  | InternalServiceException
  | NotFoundException
  | CommonErrors;
/**
 * Retrieves a list of sessions for a TestGridProject.
 */
export const listTestGridSessions: API.PaginatedOperationMethod<
  ListTestGridSessionsRequest,
  ListTestGridSessionsResult,
  ListTestGridSessionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTestGridSessionsRequest,
  output: ListTestGridSessionsResult,
  errors: [ArgumentException, InternalServiceException, NotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTestGridSessions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResult",
  } as const,
})) as any;

export type ListTestsError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Gets information about tests in a given test suite.
 */
export const listTests: API.PaginatedOperationMethod<
  ListTestsRequest,
  ListTestsResult,
  ListTestsError,
  Credentials | HttpClient.HttpClient,
  Test
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTestsRequest,
  output: ListTestsResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTests",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "tests",
  } as const,
})) as any;

export type ListUniqueProblemsError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Gets information about unique problems, such as exceptions or crashes.
 *
 * Unique problems are defined as a single instance of an error across a run, job, or suite. For example,
 * if a call in your application consistently raises an exception (OutOfBoundsException in
 * MyActivity.java:386), `ListUniqueProblems` returns a single entry instead of many
 * individual entries for that exception.
 */
export const listUniqueProblems: API.PaginatedOperationMethod<
  ListUniqueProblemsRequest,
  ListUniqueProblemsResult,
  ListUniqueProblemsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListUniqueProblemsRequest,
  output: ListUniqueProblemsResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUniqueProblems",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "uniqueProblems",
  } as const,
})) as any;

export type ListUploadsError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Gets information about uploads, given an AWS Device Farm project ARN.
 */
export const listUploads: API.PaginatedOperationMethod<
  ListUploadsRequest,
  ListUploadsResult,
  ListUploadsError,
  Credentials | HttpClient.HttpClient,
  Upload
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListUploadsRequest,
  output: ListUploadsResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUploads",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "uploads",
  } as const,
})) as any;

export type ListVPCEConfigurationsError =
  | ArgumentException
  | ServiceAccountException
  | CommonErrors;
/**
 * Returns information about all Amazon Virtual Private Cloud (VPC) endpoint
 * configurations in the AWS account.
 */
export const listVPCEConfigurations: API.OperationMethod<
  ListVPCEConfigurationsRequest,
  ListVPCEConfigurationsResult,
  ListVPCEConfigurationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListVPCEConfigurationsRequest,
  output: ListVPCEConfigurationsResult,
  errors: [ArgumentException, ServiceAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVPCEConfigurations",
}));

export type PurchaseOfferingError =
  | ArgumentException
  | LimitExceededException
  | NotEligibleException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Immediately purchases offerings for an AWS account. Offerings renew with the latest total purchased
 * quantity for an offering, unless the renewal was overridden. The API returns a `NotEligible`
 * error if the user is not permitted to invoke the operation. If you must be able to invoke this operation,
 * contact aws-devicefarm-support@amazon.com.
 */
export const purchaseOffering: API.OperationMethod<
  PurchaseOfferingRequest,
  PurchaseOfferingResult,
  PurchaseOfferingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PurchaseOfferingRequest,
  output: PurchaseOfferingResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotEligibleException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PurchaseOffering",
}));

export type RenewOfferingError =
  | ArgumentException
  | LimitExceededException
  | NotEligibleException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Explicitly sets the quantity of devices to renew for an offering, starting from the
 * `effectiveDate` of the next period. The API returns a `NotEligible` error if the
 * user is not permitted to invoke the operation. If you must be able to invoke this operation, contact aws-devicefarm-support@amazon.com.
 */
export const renewOffering: API.OperationMethod<
  RenewOfferingRequest,
  RenewOfferingResult,
  RenewOfferingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RenewOfferingRequest,
  output: RenewOfferingResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotEligibleException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RenewOffering",
}));

export type ScheduleRunError =
  | ArgumentException
  | IdempotencyException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Schedules a run.
 */
export const scheduleRun: API.OperationMethod<
  ScheduleRunRequest,
  ScheduleRunResult,
  ScheduleRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ScheduleRunRequest,
  output: ScheduleRunResult,
  errors: [
    ArgumentException,
    IdempotencyException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ScheduleRun",
}));

export type StopJobError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Initiates a stop request for the current job. AWS Device Farm immediately stops the job on the device
 * where tests have not started. You are not billed for this device. On the device where tests have started,
 * setup suite and teardown suite tests run to completion on the device. You are billed for setup, teardown,
 * and any tests that were in progress or already completed.
 */
export const stopJob: API.OperationMethod<
  StopJobRequest,
  StopJobResult,
  StopJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopJobRequest,
  output: StopJobResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopJob",
}));

export type StopRemoteAccessSessionError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Ends a specified remote access session.
 */
export const stopRemoteAccessSession: API.OperationMethod<
  StopRemoteAccessSessionRequest,
  StopRemoteAccessSessionResult,
  StopRemoteAccessSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopRemoteAccessSessionRequest,
  output: StopRemoteAccessSessionResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopRemoteAccessSession",
}));

export type StopRunError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Initiates a stop request for the current test run. AWS Device Farm immediately stops the run on devices
 * where tests have not started. You are not billed for these devices. On devices where tests have started
 * executing, setup suite and teardown suite tests run to completion on those devices. You are billed for
 * setup, teardown, and any tests that were in progress or already completed.
 */
export const stopRun: API.OperationMethod<
  StopRunRequest,
  StopRunResult,
  StopRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopRunRequest,
  output: StopRunResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopRun",
}));

export type TagResourceError =
  | ArgumentException
  | NotFoundException
  | TagOperationException
  | TagPolicyException
  | TooManyTagsException
  | CommonErrors;
/**
 * Associates the specified tags to a resource with the specified `resourceArn`. If existing tags
 * on a resource are not specified in the request parameters, they are not changed. When a resource is deleted,
 * the tags associated with that resource are also deleted.
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
    ArgumentException,
    NotFoundException,
    TagOperationException,
    TagPolicyException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | ArgumentException
  | NotFoundException
  | TagOperationException
  | CommonErrors;
/**
 * Deletes the specified tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [ArgumentException, NotFoundException, TagOperationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateDeviceInstanceError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Updates information about a private device instance.
 */
export const updateDeviceInstance: API.OperationMethod<
  UpdateDeviceInstanceRequest,
  UpdateDeviceInstanceResult,
  UpdateDeviceInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDeviceInstanceRequest,
  output: UpdateDeviceInstanceResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDeviceInstance",
}));

export type UpdateDevicePoolError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Modifies the name, description, and rules in a device pool given the attributes and
 * the pool ARN. Rule updates are all-or-nothing, meaning they can only be updated as a
 * whole (or not at all).
 */
export const updateDevicePool: API.OperationMethod<
  UpdateDevicePoolRequest,
  UpdateDevicePoolResult,
  UpdateDevicePoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDevicePoolRequest,
  output: UpdateDevicePoolResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDevicePool",
}));

export type UpdateInstanceProfileError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Updates information about an existing private device instance profile.
 */
export const updateInstanceProfile: API.OperationMethod<
  UpdateInstanceProfileRequest,
  UpdateInstanceProfileResult,
  UpdateInstanceProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateInstanceProfileRequest,
  output: UpdateInstanceProfileResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateInstanceProfile",
}));

export type UpdateNetworkProfileError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Updates the network profile.
 */
export const updateNetworkProfile: API.OperationMethod<
  UpdateNetworkProfileRequest,
  UpdateNetworkProfileResult,
  UpdateNetworkProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateNetworkProfileRequest,
  output: UpdateNetworkProfileResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNetworkProfile",
}));

export type UpdateProjectError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Modifies the specified project name, given the project ARN and a new
 * name.
 */
export const updateProject: API.OperationMethod<
  UpdateProjectRequest,
  UpdateProjectResult,
  UpdateProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateProjectRequest,
  output: UpdateProjectResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProject",
}));

export type UpdateTestGridProjectError =
  | ArgumentException
  | InternalServiceException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Change details of a project.
 */
export const updateTestGridProject: API.OperationMethod<
  UpdateTestGridProjectRequest,
  UpdateTestGridProjectResult,
  UpdateTestGridProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateTestGridProjectRequest,
  output: UpdateTestGridProjectResult,
  errors: [
    ArgumentException,
    InternalServiceException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTestGridProject",
}));

export type UpdateUploadError =
  | ArgumentException
  | LimitExceededException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Updates an uploaded test spec.
 */
export const updateUpload: API.OperationMethod<
  UpdateUploadRequest,
  UpdateUploadResult,
  UpdateUploadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateUploadRequest,
  output: UpdateUploadResult,
  errors: [
    ArgumentException,
    LimitExceededException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUpload",
}));

export type UpdateVPCEConfigurationError =
  | ArgumentException
  | InvalidOperationException
  | NotFoundException
  | ServiceAccountException
  | CommonErrors;
/**
 * Updates information about an Amazon Virtual Private Cloud (VPC) endpoint configuration.
 */
export const updateVPCEConfiguration: API.OperationMethod<
  UpdateVPCEConfigurationRequest,
  UpdateVPCEConfigurationResult,
  UpdateVPCEConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateVPCEConfigurationRequest,
  output: UpdateVPCEConfigurationResult,
  errors: [
    ArgumentException,
    InvalidOperationException,
    NotFoundException,
    ServiceAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateVPCEConfiguration",
}));
