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
  sdkId: "Snow Device Management",
  serviceShapeName: "SnowDeviceManagement",
});
const auth = T.AwsAuthSigv4({ name: "snow-device-management" });
const ver = T.ServiceVersion("2021-08-04");
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
              `https://snow-device-management-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://snow-device-management-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://snow-device-management.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://snow-device-management.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
    T.all(T.HttpError(500), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
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
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(T.HttpError(429), T.Retryable({ throttling: true })),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type TaskId = string;
export interface CancelTaskInput {
  taskId: string;
}
export const CancelTaskInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ taskId: S.String.pipe(T.HttpLabel("taskId")) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/task/{taskId}/cancel" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelTaskInput",
}) as any as S.Schema<CancelTaskInput>;
export interface CancelTaskOutput {
  taskId?: string;
}
export const CancelTaskOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ taskId: S.optional(S.String) }),
).annotate({
  identifier: "CancelTaskOutput",
}) as any as S.Schema<CancelTaskOutput>;
export type TargetList = string[];
export const TargetList = /*@__PURE__*/ S.Array(S.String);
export interface Unlock {}
export const Unlock = /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
  identifier: "Unlock",
}) as any as S.Schema<Unlock>;
export interface Reboot {}
export const Reboot = /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
  identifier: "Reboot",
}) as any as S.Schema<Reboot>;
export type Command =
  | { unlock: Unlock; reboot?: never }
  | { unlock?: never; reboot: Reboot };
export const Command = /*@__PURE__*/ S.Union([
  S.Struct({ unlock: Unlock }),
  S.Struct({ reboot: Reboot }),
]);
export type TaskDescriptionString = string;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type IdempotencyToken = string;
export interface CreateTaskInput {
  targets: string[];
  command: Command;
  description?: string;
  tags?: { [key: string]: string | undefined };
  clientToken?: string;
}
export const CreateTaskInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    targets: TargetList,
    command: Command,
    description: S.optional(S.String),
    tags: S.optional(TagMap),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/task" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateTaskInput",
}) as any as S.Schema<CreateTaskInput>;
export interface CreateTaskOutput {
  taskId?: string;
  taskArn?: string;
}
export const CreateTaskOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ taskId: S.optional(S.String), taskArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateTaskOutput",
}) as any as S.Schema<CreateTaskOutput>;
export type ManagedDeviceId = string;
export interface DescribeDeviceInput {
  managedDeviceId: string;
}
export const DescribeDeviceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    managedDeviceId: S.String.pipe(T.HttpLabel("managedDeviceId")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/managed-device/{managedDeviceId}/describe",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeDeviceInput",
}) as any as S.Schema<DescribeDeviceInput>;
export type UnlockState = string;
export type PhysicalConnectorType = string;
export type IpAddressAssignment = string;
export interface PhysicalNetworkInterface {
  physicalNetworkInterfaceId?: string;
  physicalConnectorType?: string;
  ipAddressAssignment?: string;
  ipAddress?: string;
  netmask?: string;
  defaultGateway?: string;
  macAddress?: string;
}
export const PhysicalNetworkInterface = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    physicalNetworkInterfaceId: S.optional(S.String),
    physicalConnectorType: S.optional(S.String),
    ipAddressAssignment: S.optional(S.String),
    ipAddress: S.optional(S.String),
    netmask: S.optional(S.String),
    defaultGateway: S.optional(S.String),
    macAddress: S.optional(S.String),
  }),
).annotate({
  identifier: "PhysicalNetworkInterface",
}) as any as S.Schema<PhysicalNetworkInterface>;
export type PhysicalNetworkInterfaceList = PhysicalNetworkInterface[];
export const PhysicalNetworkInterfaceList = /*@__PURE__*/ S.Array(
  PhysicalNetworkInterface,
);
export interface Capacity {
  name?: string;
  unit?: string;
  total?: number;
  used?: number;
  available?: number;
}
export const Capacity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    unit: S.optional(S.String),
    total: S.optional(S.Number),
    used: S.optional(S.Number),
    available: S.optional(S.Number),
  }),
).annotate({ identifier: "Capacity" }) as any as S.Schema<Capacity>;
export type CapacityList = Capacity[];
export const CapacityList = /*@__PURE__*/ S.Array(Capacity);
export interface SoftwareInformation {
  installedVersion?: string;
  installingVersion?: string;
  installState?: string;
}
export const SoftwareInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    installedVersion: S.optional(S.String),
    installingVersion: S.optional(S.String),
    installState: S.optional(S.String),
  }),
).annotate({
  identifier: "SoftwareInformation",
}) as any as S.Schema<SoftwareInformation>;
export interface DescribeDeviceOutput {
  lastReachedOutAt?: Date;
  lastUpdatedAt?: Date;
  tags?: { [key: string]: string | undefined };
  managedDeviceId?: string;
  managedDeviceArn?: string;
  deviceType?: string;
  associatedWithJob?: string;
  deviceState?: string;
  physicalNetworkInterfaces?: PhysicalNetworkInterface[];
  deviceCapacities?: Capacity[];
  software?: SoftwareInformation;
}
export const DescribeDeviceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    lastReachedOutAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    tags: S.optional(TagMap),
    managedDeviceId: S.optional(S.String),
    managedDeviceArn: S.optional(S.String),
    deviceType: S.optional(S.String),
    associatedWithJob: S.optional(S.String),
    deviceState: S.optional(S.String),
    physicalNetworkInterfaces: S.optional(PhysicalNetworkInterfaceList),
    deviceCapacities: S.optional(CapacityList),
    software: S.optional(SoftwareInformation),
  }),
).annotate({
  identifier: "DescribeDeviceOutput",
}) as any as S.Schema<DescribeDeviceOutput>;
export type InstanceIdsList = string[];
export const InstanceIdsList = /*@__PURE__*/ S.Array(S.String);
export interface DescribeDeviceEc2Input {
  managedDeviceId: string;
  instanceIds: string[];
}
export const DescribeDeviceEc2Input = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    managedDeviceId: S.String.pipe(T.HttpLabel("managedDeviceId")),
    instanceIds: InstanceIdsList,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/managed-device/{managedDeviceId}/resources/ec2/describe",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeDeviceEc2Input",
}) as any as S.Schema<DescribeDeviceEc2Input>;
export type InstanceStateName = string;
export interface InstanceState {
  code?: number;
  name?: string;
}
export const InstanceState = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ code: S.optional(S.Number), name: S.optional(S.String) }),
).annotate({ identifier: "InstanceState" }) as any as S.Schema<InstanceState>;
export type AttachmentStatus = string;
export interface EbsInstanceBlockDevice {
  attachTime?: Date;
  deleteOnTermination?: boolean;
  status?: string;
  volumeId?: string;
}
export const EbsInstanceBlockDevice = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    attachTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    deleteOnTermination: S.optional(S.Boolean),
    status: S.optional(S.String),
    volumeId: S.optional(S.String),
  }),
).annotate({
  identifier: "EbsInstanceBlockDevice",
}) as any as S.Schema<EbsInstanceBlockDevice>;
export interface InstanceBlockDeviceMapping {
  deviceName?: string;
  ebs?: EbsInstanceBlockDevice;
}
export const InstanceBlockDeviceMapping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deviceName: S.optional(S.String),
    ebs: S.optional(EbsInstanceBlockDevice),
  }),
).annotate({
  identifier: "InstanceBlockDeviceMapping",
}) as any as S.Schema<InstanceBlockDeviceMapping>;
export type InstanceBlockDeviceMappingList = InstanceBlockDeviceMapping[];
export const InstanceBlockDeviceMappingList = /*@__PURE__*/ S.Array(
  InstanceBlockDeviceMapping,
);
export interface SecurityGroupIdentifier {
  groupId?: string;
  groupName?: string;
}
export const SecurityGroupIdentifier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ groupId: S.optional(S.String), groupName: S.optional(S.String) }),
).annotate({
  identifier: "SecurityGroupIdentifier",
}) as any as S.Schema<SecurityGroupIdentifier>;
export type SecurityGroupIdentifierList = SecurityGroupIdentifier[];
export const SecurityGroupIdentifierList = /*@__PURE__*/ S.Array(
  SecurityGroupIdentifier,
);
export interface CpuOptions {
  coreCount?: number;
  threadsPerCore?: number;
}
export const CpuOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    coreCount: S.optional(S.Number),
    threadsPerCore: S.optional(S.Number),
  }),
).annotate({ identifier: "CpuOptions" }) as any as S.Schema<CpuOptions>;
export interface Instance {
  imageId?: string;
  amiLaunchIndex?: number;
  instanceId?: string;
  state?: InstanceState;
  instanceType?: string;
  privateIpAddress?: string;
  publicIpAddress?: string;
  createdAt?: Date;
  updatedAt?: Date;
  blockDeviceMappings?: InstanceBlockDeviceMapping[];
  securityGroups?: SecurityGroupIdentifier[];
  cpuOptions?: CpuOptions;
  rootDeviceName?: string;
}
export const Instance = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    imageId: S.optional(S.String),
    amiLaunchIndex: S.optional(S.Number),
    instanceId: S.optional(S.String),
    state: S.optional(InstanceState),
    instanceType: S.optional(S.String),
    privateIpAddress: S.optional(S.String),
    publicIpAddress: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    blockDeviceMappings: S.optional(InstanceBlockDeviceMappingList),
    securityGroups: S.optional(SecurityGroupIdentifierList),
    cpuOptions: S.optional(CpuOptions),
    rootDeviceName: S.optional(S.String),
  }),
).annotate({ identifier: "Instance" }) as any as S.Schema<Instance>;
export interface InstanceSummary {
  instance?: Instance;
  lastUpdatedAt?: Date;
}
export const InstanceSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instance: S.optional(Instance),
    lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "InstanceSummary",
}) as any as S.Schema<InstanceSummary>;
export type InstanceSummaryList = InstanceSummary[];
export const InstanceSummaryList = /*@__PURE__*/ S.Array(InstanceSummary);
export interface DescribeDeviceEc2Output {
  instances?: InstanceSummary[];
}
export const DescribeDeviceEc2Output = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ instances: S.optional(InstanceSummaryList) }),
).annotate({
  identifier: "DescribeDeviceEc2Output",
}) as any as S.Schema<DescribeDeviceEc2Output>;
export interface DescribeExecutionInput {
  taskId: string;
  managedDeviceId: string;
}
export const DescribeExecutionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taskId: S.String.pipe(T.HttpLabel("taskId")),
    managedDeviceId: S.String.pipe(T.HttpLabel("managedDeviceId")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/task/{taskId}/execution/{managedDeviceId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeExecutionInput",
}) as any as S.Schema<DescribeExecutionInput>;
export type ExecutionId = string;
export type ExecutionState = string;
export interface DescribeExecutionOutput {
  taskId?: string;
  executionId?: string;
  managedDeviceId?: string;
  state?: string;
  startedAt?: Date;
  lastUpdatedAt?: Date;
}
export const DescribeExecutionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taskId: S.optional(S.String),
    executionId: S.optional(S.String),
    managedDeviceId: S.optional(S.String),
    state: S.optional(S.String),
    startedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "DescribeExecutionOutput",
}) as any as S.Schema<DescribeExecutionOutput>;
export interface DescribeTaskInput {
  taskId: string;
}
export const DescribeTaskInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ taskId: S.String.pipe(T.HttpLabel("taskId")) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/task/{taskId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeTaskInput",
}) as any as S.Schema<DescribeTaskInput>;
export type TaskState = string;
export interface DescribeTaskOutput {
  taskId?: string;
  taskArn?: string;
  targets?: string[];
  state?: string;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  completedAt?: Date;
  description?: string;
  tags?: { [key: string]: string | undefined };
}
export const DescribeTaskOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taskId: S.optional(S.String),
    taskArn: S.optional(S.String),
    targets: S.optional(TargetList),
    state: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    completedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    description: S.optional(S.String),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "DescribeTaskOutput",
}) as any as S.Schema<DescribeTaskOutput>;
export type MaxResults = number;
export type NextToken = string;
export interface ListDeviceResourcesInput {
  managedDeviceId: string;
  type?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListDeviceResourcesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    managedDeviceId: S.String.pipe(T.HttpLabel("managedDeviceId")),
    type: S.optional(S.String).pipe(T.HttpQuery("type")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/managed-device/{managedDeviceId}/resources",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDeviceResourcesInput",
}) as any as S.Schema<ListDeviceResourcesInput>;
export interface ResourceSummary {
  resourceType: string;
  arn?: string;
  id?: string;
}
export const ResourceSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceType: S.String,
    arn: S.optional(S.String),
    id: S.optional(S.String),
  }),
).annotate({
  identifier: "ResourceSummary",
}) as any as S.Schema<ResourceSummary>;
export type ResourceSummaryList = ResourceSummary[];
export const ResourceSummaryList = /*@__PURE__*/ S.Array(ResourceSummary);
export interface ListDeviceResourcesOutput {
  resources?: ResourceSummary[];
  nextToken?: string;
}
export const ListDeviceResourcesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resources: S.optional(ResourceSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDeviceResourcesOutput",
}) as any as S.Schema<ListDeviceResourcesOutput>;
export type JobId = string;
export interface ListDevicesInput {
  jobId?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListDevicesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobId: S.optional(S.String).pipe(T.HttpQuery("jobId")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/managed-devices" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDevicesInput",
}) as any as S.Schema<ListDevicesInput>;
export interface DeviceSummary {
  managedDeviceId?: string;
  managedDeviceArn?: string;
  associatedWithJob?: string;
  tags?: { [key: string]: string | undefined };
}
export const DeviceSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    managedDeviceId: S.optional(S.String),
    managedDeviceArn: S.optional(S.String),
    associatedWithJob: S.optional(S.String),
    tags: S.optional(TagMap),
  }),
).annotate({ identifier: "DeviceSummary" }) as any as S.Schema<DeviceSummary>;
export type DeviceSummaryList = DeviceSummary[];
export const DeviceSummaryList = /*@__PURE__*/ S.Array(DeviceSummary);
export interface ListDevicesOutput {
  devices?: DeviceSummary[];
  nextToken?: string;
}
export const ListDevicesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    devices: S.optional(DeviceSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDevicesOutput",
}) as any as S.Schema<ListDevicesOutput>;
export interface ListExecutionsInput {
  taskId: string;
  state?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListExecutionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taskId: S.String.pipe(T.HttpQuery("taskId")),
    state: S.optional(S.String).pipe(T.HttpQuery("state")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/executions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListExecutionsInput",
}) as any as S.Schema<ListExecutionsInput>;
export interface ExecutionSummary {
  taskId?: string;
  executionId?: string;
  managedDeviceId?: string;
  state?: string;
}
export const ExecutionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taskId: S.optional(S.String),
    executionId: S.optional(S.String),
    managedDeviceId: S.optional(S.String),
    state: S.optional(S.String),
  }),
).annotate({
  identifier: "ExecutionSummary",
}) as any as S.Schema<ExecutionSummary>;
export type ExecutionSummaryList = ExecutionSummary[];
export const ExecutionSummaryList = /*@__PURE__*/ S.Array(ExecutionSummary);
export interface ListExecutionsOutput {
  executions?: ExecutionSummary[];
  nextToken?: string;
}
export const ListExecutionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    executions: S.optional(ExecutionSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListExecutionsOutput",
}) as any as S.Schema<ListExecutionsOutput>;
export interface ListTagsForResourceInput {
  resourceArn: string;
}
export const ListTagsForResourceInput = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "ListTagsForResourceInput",
}) as any as S.Schema<ListTagsForResourceInput>;
export interface ListTagsForResourceOutput {
  tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: S.optional(TagMap) }),
).annotate({
  identifier: "ListTagsForResourceOutput",
}) as any as S.Schema<ListTagsForResourceOutput>;
export interface ListTasksInput {
  state?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListTasksInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    state: S.optional(S.String).pipe(T.HttpQuery("state")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/tasks" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "ListTasksInput" }) as any as S.Schema<ListTasksInput>;
export interface TaskSummary {
  taskId: string;
  taskArn?: string;
  state?: string;
  tags?: { [key: string]: string | undefined };
}
export const TaskSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taskId: S.String,
    taskArn: S.optional(S.String),
    state: S.optional(S.String),
    tags: S.optional(TagMap),
  }),
).annotate({ identifier: "TaskSummary" }) as any as S.Schema<TaskSummary>;
export type TaskSummaryList = TaskSummary[];
export const TaskSummaryList = /*@__PURE__*/ S.Array(TaskSummary);
export interface ListTasksOutput {
  tasks?: TaskSummary[];
  nextToken?: string;
}
export const ListTasksOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    tasks: S.optional(TaskSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListTasksOutput",
}) as any as S.Schema<ListTasksOutput>;
export interface TagResourceInput {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceInput = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "TagResourceInput",
}) as any as S.Schema<TagResourceInput>;
export interface TagResourceResponse {}
export const TagResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "TagResourceResponse",
}) as any as S.Schema<TagResourceResponse>;
export type TagKeys = string[];
export const TagKeys = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceInput {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceInput = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "UntagResourceInput",
}) as any as S.Schema<UntagResourceInput>;
export interface UntagResourceResponse {}
export const UntagResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export type CancelTaskError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sends a cancel request for a specified task. You can cancel a task only if it's still in a
 * `QUEUED` state. Tasks that are already running can't be cancelled.
 *
 * A task might still run if it's processed from the queue before the
 * `CancelTask` operation changes the task's state.
 */
export const cancelTask: API.OperationMethod<
  CancelTaskInput,
  CancelTaskOutput,
  CancelTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelTaskInput,
  output: CancelTaskOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelTask",
}));

export type CreateTaskError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Instructs one or more devices to start a task, such as unlocking or rebooting.
 */
export const createTask: API.OperationMethod<
  CreateTaskInput,
  CreateTaskOutput,
  CreateTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateTaskInput,
  output: CreateTaskOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTask",
}));

export type DescribeDeviceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Checks device-specific information, such as the device type, software version, IP
 * addresses, and lock status.
 */
export const describeDevice: API.OperationMethod<
  DescribeDeviceInput,
  DescribeDeviceOutput,
  DescribeDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeDeviceInput,
  output: DescribeDeviceOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDevice",
}));

export type DescribeDeviceEc2InstancesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Checks the current state of the Amazon EC2 instances. The output is similar to
 * `describeDevice`, but the results are sourced from the device cache in the
 * Amazon Web Services Cloud and include a subset of the available fields.
 */
export const describeDeviceEc2Instances: API.OperationMethod<
  DescribeDeviceEc2Input,
  DescribeDeviceEc2Output,
  DescribeDeviceEc2InstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeDeviceEc2Input,
  output: DescribeDeviceEc2Output,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDeviceEc2Instances",
}));

export type DescribeExecutionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Checks the status of a remote task running on one or more target devices.
 */
export const describeExecution: API.OperationMethod<
  DescribeExecutionInput,
  DescribeExecutionOutput,
  DescribeExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeExecutionInput,
  output: DescribeExecutionOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeExecution",
}));

export type DescribeTaskError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Checks the metadata for a given task on a device.
 */
export const describeTask: API.OperationMethod<
  DescribeTaskInput,
  DescribeTaskOutput,
  DescribeTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeTaskInput,
  output: DescribeTaskOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTask",
}));

export type ListDeviceResourcesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of the Amazon Web Services resources available for a device. Currently, Amazon EC2 instances are the only supported resource type.
 */
export const listDeviceResources: API.PaginatedOperationMethod<
  ListDeviceResourcesInput,
  ListDeviceResourcesOutput,
  ListDeviceResourcesError,
  Credentials | HttpClient.HttpClient,
  ResourceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDeviceResourcesInput,
  output: ListDeviceResourcesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDeviceResources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "resources",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDevicesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of all devices on your Amazon Web Services account that have Amazon Web Services Snow Device Management
 * enabled in the Amazon Web Services Region where the command is run.
 */
export const listDevices: API.PaginatedOperationMethod<
  ListDevicesInput,
  ListDevicesOutput,
  ListDevicesError,
  Credentials | HttpClient.HttpClient,
  DeviceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDevicesInput,
  output: ListDevicesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDevices",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "devices",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListExecutionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the status of tasks for one or more target devices.
 */
export const listExecutions: API.PaginatedOperationMethod<
  ListExecutionsInput,
  ListExecutionsOutput,
  ListExecutionsError,
  Credentials | HttpClient.HttpClient,
  ExecutionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListExecutionsInput,
  output: ListExecutionsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExecutions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "executions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of tags for a managed device or task.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceInput,
  output: ListTagsForResourceOutput,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListTasksError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of tasks that can be filtered by state.
 */
export const listTasks: API.PaginatedOperationMethod<
  ListTasksInput,
  ListTasksOutput,
  ListTasksError,
  Credentials | HttpClient.HttpClient,
  TaskSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTasksInput,
  output: ListTasksOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTasks",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "tasks",
    pageSize: "maxResults",
  } as const,
})) as any;

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Adds or replaces tags on a device or task.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceInput,
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

export type UntagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes a tag from a device or task.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceInput,
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
