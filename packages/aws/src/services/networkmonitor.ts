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
  sdkId: "NetworkMonitor",
  serviceShapeName: "NetworkMonitor",
});
const auth = T.AwsAuthSigv4({ name: "networkmonitor" });
const ver = T.ServiceVersion("2023-08-01");
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
              `https://networkmonitor-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://networkmonitor-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://networkmonitor.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://networkmonitor.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(T.HttpError(500), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
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
    T.all(T.HttpError(429), T.Retryable({ throttling: true })),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type ResourceName = string;
export type Arn = string;
export type Destination = string;
export type Port = number;
export type Protocol = "TCP" | "ICMP" | (string & {});
export const Protocol = S.String;

export type PacketSize = number;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateMonitorProbeInput {
  sourceArn: string;
  destination: string;
  destinationPort?: number;
  protocol: Protocol;
  packetSize?: number;
  probeTags?: { [key: string]: string | undefined };
}
export const CreateMonitorProbeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceArn: S.String,
    destination: S.String,
    destinationPort: S.optional(S.Number),
    protocol: Protocol,
    packetSize: S.optional(S.Number),
    probeTags: S.optional(TagMap),
  }),
).annotate({
  identifier: "CreateMonitorProbeInput",
}) as any as S.Schema<CreateMonitorProbeInput>;
export type CreateMonitorProbeInputList = CreateMonitorProbeInput[];
export const CreateMonitorProbeInputList = /*@__PURE__*/ S.Array(
  CreateMonitorProbeInput,
);
export type AggregationPeriod = number;
export interface CreateMonitorInput {
  monitorName: string;
  probes?: CreateMonitorProbeInput[];
  aggregationPeriod?: number;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateMonitorInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    monitorName: S.String,
    probes: S.optional(CreateMonitorProbeInputList),
    aggregationPeriod: S.optional(S.Number),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/monitors" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateMonitorInput",
}) as any as S.Schema<CreateMonitorInput>;
export type MonitorArn = string;
export type MonitorState =
  | "PENDING"
  | "ACTIVE"
  | "INACTIVE"
  | "ERROR"
  | "DELETING"
  | (string & {});
export const MonitorState = S.String;

export interface CreateMonitorOutput {
  monitorArn: string;
  monitorName: string;
  state: MonitorState;
  aggregationPeriod?: number;
  tags?: { [key: string]: string | undefined };
}
export const CreateMonitorOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    monitorArn: S.String,
    monitorName: S.String,
    state: MonitorState,
    aggregationPeriod: S.optional(S.Number),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "CreateMonitorOutput",
}) as any as S.Schema<CreateMonitorOutput>;
export interface ProbeInput {
  sourceArn: string;
  destination: string;
  destinationPort?: number;
  protocol: Protocol;
  packetSize?: number;
  tags?: { [key: string]: string | undefined };
}
export const ProbeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceArn: S.String,
    destination: S.String,
    destinationPort: S.optional(S.Number),
    protocol: Protocol,
    packetSize: S.optional(S.Number),
    tags: S.optional(TagMap),
  }),
).annotate({ identifier: "ProbeInput" }) as any as S.Schema<ProbeInput>;
export interface CreateProbeInput {
  monitorName: string;
  probe: ProbeInput;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateProbeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    monitorName: S.String.pipe(T.HttpLabel("monitorName")),
    probe: ProbeInput,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/monitors/{monitorName}/probes" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateProbeInput",
}) as any as S.Schema<CreateProbeInput>;
export type ProbeId = string;
export type AddressFamily = "IPV4" | "IPV6" | (string & {});
export const AddressFamily = S.String;

export type VpcId = string;
export type ProbeState =
  | "PENDING"
  | "ACTIVE"
  | "INACTIVE"
  | "ERROR"
  | "DELETING"
  | "DELETED"
  | (string & {});
export const ProbeState = S.String;

export type Iso8601Timestamp = Date;
export interface CreateProbeOutput {
  probeId?: string;
  probeArn?: string;
  sourceArn: string;
  destination: string;
  destinationPort?: number;
  protocol: Protocol;
  packetSize?: number;
  addressFamily?: AddressFamily;
  vpcId?: string;
  state?: ProbeState;
  createdAt?: Date;
  modifiedAt?: Date;
  tags?: { [key: string]: string | undefined };
}
export const CreateProbeOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    probeId: S.optional(S.String),
    probeArn: S.optional(S.String),
    sourceArn: S.String,
    destination: S.String,
    destinationPort: S.optional(S.Number),
    protocol: Protocol,
    packetSize: S.optional(S.Number),
    addressFamily: S.optional(AddressFamily),
    vpcId: S.optional(S.String),
    state: S.optional(ProbeState),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    modifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "CreateProbeOutput",
}) as any as S.Schema<CreateProbeOutput>;
export interface DeleteMonitorInput {
  monitorName: string;
}
export const DeleteMonitorInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ monitorName: S.String.pipe(T.HttpLabel("monitorName")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/monitors/{monitorName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteMonitorInput",
}) as any as S.Schema<DeleteMonitorInput>;
export interface DeleteMonitorOutput {}
export const DeleteMonitorOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteMonitorOutput",
}) as any as S.Schema<DeleteMonitorOutput>;
export interface DeleteProbeInput {
  monitorName: string;
  probeId: string;
}
export const DeleteProbeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    monitorName: S.String.pipe(T.HttpLabel("monitorName")),
    probeId: S.String.pipe(T.HttpLabel("probeId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/monitors/{monitorName}/probes/{probeId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteProbeInput",
}) as any as S.Schema<DeleteProbeInput>;
export interface DeleteProbeOutput {}
export const DeleteProbeOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteProbeOutput",
}) as any as S.Schema<DeleteProbeOutput>;
export interface GetMonitorInput {
  monitorName: string;
}
export const GetMonitorInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ monitorName: S.String.pipe(T.HttpLabel("monitorName")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/monitors/{monitorName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMonitorInput",
}) as any as S.Schema<GetMonitorInput>;
export interface Probe {
  probeId?: string;
  probeArn?: string;
  sourceArn: string;
  destination: string;
  destinationPort?: number;
  protocol: Protocol;
  packetSize?: number;
  addressFamily?: AddressFamily;
  vpcId?: string;
  state?: ProbeState;
  createdAt?: Date;
  modifiedAt?: Date;
  tags?: { [key: string]: string | undefined };
}
export const Probe = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    probeId: S.optional(S.String),
    probeArn: S.optional(S.String),
    sourceArn: S.String,
    destination: S.String,
    destinationPort: S.optional(S.Number),
    protocol: Protocol,
    packetSize: S.optional(S.Number),
    addressFamily: S.optional(AddressFamily),
    vpcId: S.optional(S.String),
    state: S.optional(ProbeState),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    modifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    tags: S.optional(TagMap),
  }),
).annotate({ identifier: "Probe" }) as any as S.Schema<Probe>;
export type ProbeList = Probe[];
export const ProbeList = /*@__PURE__*/ S.Array(Probe);
export interface GetMonitorOutput {
  monitorArn: string;
  monitorName: string;
  state: MonitorState;
  aggregationPeriod: number;
  tags?: { [key: string]: string | undefined };
  probes?: Probe[];
  createdAt: Date;
  modifiedAt: Date;
}
export const GetMonitorOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    monitorArn: S.String,
    monitorName: S.String,
    state: MonitorState,
    aggregationPeriod: S.Number,
    tags: S.optional(TagMap),
    probes: S.optional(ProbeList),
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    modifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "GetMonitorOutput",
}) as any as S.Schema<GetMonitorOutput>;
export interface GetProbeInput {
  monitorName: string;
  probeId: string;
}
export const GetProbeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    monitorName: S.String.pipe(T.HttpLabel("monitorName")),
    probeId: S.String.pipe(T.HttpLabel("probeId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/monitors/{monitorName}/probes/{probeId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetProbeInput" }) as any as S.Schema<GetProbeInput>;
export interface GetProbeOutput {
  probeId?: string;
  probeArn?: string;
  sourceArn: string;
  destination: string;
  destinationPort?: number;
  protocol: Protocol;
  packetSize?: number;
  addressFamily?: AddressFamily;
  vpcId?: string;
  state?: ProbeState;
  createdAt?: Date;
  modifiedAt?: Date;
  tags?: { [key: string]: string | undefined };
}
export const GetProbeOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    probeId: S.optional(S.String),
    probeArn: S.optional(S.String),
    sourceArn: S.String,
    destination: S.String,
    destinationPort: S.optional(S.Number),
    protocol: Protocol,
    packetSize: S.optional(S.Number),
    addressFamily: S.optional(AddressFamily),
    vpcId: S.optional(S.String),
    state: S.optional(ProbeState),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    modifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    tags: S.optional(TagMap),
  }),
).annotate({ identifier: "GetProbeOutput" }) as any as S.Schema<GetProbeOutput>;
export type PaginationToken = string;
export type MaxResults = number;
export interface ListMonitorsInput {
  nextToken?: string;
  maxResults?: number;
  state?: string;
}
export const ListMonitorsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    state: S.optional(S.String).pipe(T.HttpQuery("state")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/monitors" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListMonitorsInput",
}) as any as S.Schema<ListMonitorsInput>;
export interface MonitorSummary {
  monitorArn: string;
  monitorName: string;
  state: MonitorState;
  aggregationPeriod?: number;
  tags?: { [key: string]: string | undefined };
}
export const MonitorSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    monitorArn: S.String,
    monitorName: S.String,
    state: MonitorState,
    aggregationPeriod: S.optional(S.Number),
    tags: S.optional(TagMap),
  }),
).annotate({ identifier: "MonitorSummary" }) as any as S.Schema<MonitorSummary>;
export type MonitorList = MonitorSummary[];
export const MonitorList = /*@__PURE__*/ S.Array(MonitorSummary);
export interface ListMonitorsOutput {
  monitors: MonitorSummary[];
  nextToken?: string;
}
export const ListMonitorsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ monitors: MonitorList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListMonitorsOutput",
}) as any as S.Schema<ListMonitorsOutput>;
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
export interface TagResourceOutput {}
export const TagResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "TagResourceOutput",
}) as any as S.Schema<TagResourceOutput>;
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceInput {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceInput = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "UntagResourceInput",
}) as any as S.Schema<UntagResourceInput>;
export interface UntagResourceOutput {}
export const UntagResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UntagResourceOutput",
}) as any as S.Schema<UntagResourceOutput>;
export interface UpdateMonitorInput {
  monitorName: string;
  aggregationPeriod: number;
}
export const UpdateMonitorInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    monitorName: S.String.pipe(T.HttpLabel("monitorName")),
    aggregationPeriod: S.Number,
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/monitors/{monitorName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateMonitorInput",
}) as any as S.Schema<UpdateMonitorInput>;
export interface UpdateMonitorOutput {
  monitorArn: string;
  monitorName: string;
  state: MonitorState;
  aggregationPeriod?: number;
  tags?: { [key: string]: string | undefined };
}
export const UpdateMonitorOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    monitorArn: S.String,
    monitorName: S.String,
    state: MonitorState,
    aggregationPeriod: S.optional(S.Number),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "UpdateMonitorOutput",
}) as any as S.Schema<UpdateMonitorOutput>;
export interface UpdateProbeInput {
  monitorName: string;
  probeId: string;
  state?: ProbeState;
  destination?: string;
  destinationPort?: number;
  protocol?: Protocol;
  packetSize?: number;
}
export const UpdateProbeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    monitorName: S.String.pipe(T.HttpLabel("monitorName")),
    probeId: S.String.pipe(T.HttpLabel("probeId")),
    state: S.optional(ProbeState),
    destination: S.optional(S.String),
    destinationPort: S.optional(S.Number),
    protocol: S.optional(Protocol),
    packetSize: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/monitors/{monitorName}/probes/{probeId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateProbeInput",
}) as any as S.Schema<UpdateProbeInput>;
export interface UpdateProbeOutput {
  probeId?: string;
  probeArn?: string;
  sourceArn: string;
  destination: string;
  destinationPort?: number;
  protocol: Protocol;
  packetSize?: number;
  addressFamily?: AddressFamily;
  vpcId?: string;
  state?: ProbeState;
  createdAt?: Date;
  modifiedAt?: Date;
  tags?: { [key: string]: string | undefined };
}
export const UpdateProbeOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    probeId: S.optional(S.String),
    probeArn: S.optional(S.String),
    sourceArn: S.String,
    destination: S.String,
    destinationPort: S.optional(S.Number),
    protocol: Protocol,
    packetSize: S.optional(S.Number),
    addressFamily: S.optional(AddressFamily),
    vpcId: S.optional(S.String),
    state: S.optional(ProbeState),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    modifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "UpdateProbeOutput",
}) as any as S.Schema<UpdateProbeOutput>;
export type CreateMonitorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a monitor between a source subnet and destination IP address. Within a monitor you'll create one or more probes that monitor network traffic between your source Amazon Web Services VPC subnets and your destination IP addresses. Each probe then aggregates and sends metrics to Amazon CloudWatch.
 *
 * You can also create a monitor with probes using this command. For each probe, you
 * define the following:
 *
 * - `source`—The subnet IDs where the probes will be created.
 *
 * - `destination`— The target destination IP address for the
 * probe.
 *
 * - `destinationPort`—Required only if the protocol is
 * `TCP`.
 *
 * - `protocol`—The communication protocol between the source and
 * destination. This will be either `TCP` or `ICMP`.
 *
 * - `packetSize`—The size of the packets. This must be a number between
 * `56` and `8500`.
 *
 * - (Optional) `tags` —Key-value pairs created and assigned to the
 * probe.
 */
export const createMonitor: API.OperationMethod<
  CreateMonitorInput,
  CreateMonitorOutput,
  CreateMonitorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateMonitorInput,
  output: CreateMonitorOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMonitor",
}));

export type CreateProbeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a probe within a monitor. Once you create a probe, and it begins monitoring your
 * network traffic, you'll incur billing charges for that probe. This action requires the
 * `monitorName` parameter. Run `ListMonitors` to get a list of
 * monitor names. Note the name of the `monitorName` you want to create the
 * probe for.
 */
export const createProbe: API.OperationMethod<
  CreateProbeInput,
  CreateProbeOutput,
  CreateProbeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateProbeInput,
  output: CreateProbeOutput,
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
  operationName: "CreateProbe",
}));

export type DeleteMonitorError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a specified monitor.
 *
 * This action requires the `monitorName` parameter. Run
 * `ListMonitors` to get a list of monitor names.
 */
export const deleteMonitor: API.OperationMethod<
  DeleteMonitorInput,
  DeleteMonitorOutput,
  DeleteMonitorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteMonitorInput,
  output: DeleteMonitorOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMonitor",
}));

export type DeleteProbeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified probe. Once a probe is deleted you'll no longer incur any billing
 * fees for that probe.
 *
 * This action requires both the `monitorName` and `probeId`
 * parameters. Run `ListMonitors` to get a list of monitor names. Run
 * `GetMonitor` to get a list of probes and probe IDs. You can only delete a
 * single probe at a time using this action.
 */
export const deleteProbe: API.OperationMethod<
  DeleteProbeInput,
  DeleteProbeOutput,
  DeleteProbeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteProbeInput,
  output: DeleteProbeOutput,
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
  operationName: "DeleteProbe",
}));

export type GetMonitorError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns details about a specific monitor.
 *
 * This action requires the `monitorName` parameter. Run
 * `ListMonitors` to get a list of monitor names.
 */
export const getMonitor: API.OperationMethod<
  GetMonitorInput,
  GetMonitorOutput,
  GetMonitorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMonitorInput,
  output: GetMonitorOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMonitor",
}));

export type GetProbeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the details about a probe. This action requires both the
 * `monitorName` and `probeId` parameters. Run
 * `ListMonitors` to get a list of monitor names. Run
 * `GetMonitor` to get a list of probes and probe IDs.
 */
export const getProbe: API.OperationMethod<
  GetProbeInput,
  GetProbeOutput,
  GetProbeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetProbeInput,
  output: GetProbeOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProbe",
}));

export type ListMonitorsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of all of your monitors.
 */
export const listMonitors: API.PaginatedOperationMethod<
  ListMonitorsInput,
  ListMonitorsOutput,
  ListMonitorsError,
  Credentials | HttpClient.HttpClient,
  MonitorSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMonitorsInput,
  output: ListMonitorsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMonitors",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "monitors",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the tags assigned to this resource.
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
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type TagResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds key-value pairs to a monitor or probe.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceOutput,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceInput,
  output: TagResourceOutput,
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
  operationName: "TagResource",
}));

export type UntagResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes a key-value pair from a monitor or probe.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceInput,
  output: UntagResourceOutput,
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
  operationName: "UntagResource",
}));

export type UpdateMonitorError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the `aggregationPeriod` for a monitor. Monitors support an
 * `aggregationPeriod` of either `30` or `60` seconds.
 * This action requires the `monitorName` and `probeId` parameter.
 * Run `ListMonitors` to get a list of monitor names.
 */
export const updateMonitor: API.OperationMethod<
  UpdateMonitorInput,
  UpdateMonitorOutput,
  UpdateMonitorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateMonitorInput,
  output: UpdateMonitorOutput,
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
  operationName: "UpdateMonitor",
}));

export type UpdateProbeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a monitor probe. This action requires both the `monitorName` and `probeId` parameters. Run `ListMonitors` to get a list of monitor names. Run `GetMonitor` to get a list of probes and probe IDs.
 *
 * You can update the following para create a monitor with probes using this command. For
 * each probe, you define the following:
 *
 * - `state`—The state of the probe.
 *
 * - `destination`— The target destination IP address for the
 * probe.
 *
 * - `destinationPort`—Required only if the protocol is
 * `TCP`.
 *
 * - `protocol`—The communication protocol between the source and
 * destination. This will be either `TCP` or `ICMP`.
 *
 * - `packetSize`—The size of the packets. This must be a number between
 * `56` and `8500`.
 *
 * - (Optional) `tags` —Key-value pairs created and assigned to the
 * probe.
 */
export const updateProbe: API.OperationMethod<
  UpdateProbeInput,
  UpdateProbeOutput,
  UpdateProbeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateProbeInput,
  output: UpdateProbeOutput,
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
  operationName: "UpdateProbe",
}));
