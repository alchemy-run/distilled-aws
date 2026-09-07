import * as HttpClient from "effect/unstable/http/HttpClient";
import * as S from "@distilled.cloud/core/schema";
import * as API from "@distilled.cloud/core/api";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const ns = T.XmlNamespace("http://dax.amazonaws.com/doc/2017-04-19/");
const svc = T.AwsApiService({ sdkId: "DAX", serviceShapeName: "AmazonDAXV3" });
const auth = T.AwsAuthSigv4({ name: "dax" });
const ver = T.ServiceVersion("2017-04-19");
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
              `https://dax-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://dax-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://dax.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://dax.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class ClusterAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<ClusterAlreadyExistsFault>()(
    "ClusterAlreadyExistsFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "ClusterAlreadyExists", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class ClusterNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<ClusterNotFoundFault>()(
    "ClusterNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "ClusterNotFound", httpResponseCode: 404 }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ClusterQuotaForCustomerExceededFault
  extends /*@__PURE__*/ S.TaggedError<ClusterQuotaForCustomerExceededFault>()(
    "ClusterQuotaForCustomerExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ClusterQuotaForCustomerExceeded",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InsufficientClusterCapacityFault
  extends /*@__PURE__*/ S.TaggedError<InsufficientClusterCapacityFault>()(
    "InsufficientClusterCapacityFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InsufficientClusterCapacity",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidARNFault
  extends /*@__PURE__*/ S.TaggedError<InvalidARNFault>()(
    "InvalidARNFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidARN", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidClusterStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidClusterStateFault>()(
    "InvalidClusterStateFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidClusterState", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterCombinationException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterCombinationException>()(
    "InvalidParameterCombinationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidParameterCombination",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterGroupStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterGroupStateFault>()(
    "InvalidParameterGroupStateFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidParameterGroupState",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterValueException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterValueException>()(
    "InvalidParameterValueException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidParameterValue", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidSubnet
  extends /*@__PURE__*/ S.TaggedError<InvalidSubnet>()(
    "InvalidSubnet",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidSubnet", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidVPCNetworkStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidVPCNetworkStateFault>()(
    "InvalidVPCNetworkStateFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidVPCNetworkStateFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class NodeNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<NodeNotFoundFault>()(
    "NodeNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "NodeNotFound", httpResponseCode: 404 }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class NodeQuotaForClusterExceededFault
  extends /*@__PURE__*/ S.TaggedError<NodeQuotaForClusterExceededFault>()(
    "NodeQuotaForClusterExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "NodeQuotaForClusterExceeded",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class NodeQuotaForCustomerExceededFault
  extends /*@__PURE__*/ S.TaggedError<NodeQuotaForCustomerExceededFault>()(
    "NodeQuotaForCustomerExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "NodeQuotaForCustomerExceeded",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ParameterGroupAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<ParameterGroupAlreadyExistsFault>()(
    "ParameterGroupAlreadyExistsFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ParameterGroupAlreadyExists",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class ParameterGroupNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<ParameterGroupNotFoundFault>()(
    "ParameterGroupNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ParameterGroupNotFound",
        httpResponseCode: 404,
      }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ParameterGroupQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<ParameterGroupQuotaExceededFault>()(
    "ParameterGroupQuotaExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ParameterGroupQuotaExceeded",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ServiceLinkedRoleNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<ServiceLinkedRoleNotFoundFault>()(
    "ServiceLinkedRoleNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ServiceLinkedRoleNotFoundFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "ServiceQuotaExceeded", httpResponseCode: 402 }),
      T.HttpError(402),
    ),
  ).pipe(C.withQuotaError) {}
export class SubnetGroupAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<SubnetGroupAlreadyExistsFault>()(
    "SubnetGroupAlreadyExistsFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "SubnetGroupAlreadyExists",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class SubnetGroupInUseFault
  extends /*@__PURE__*/ S.TaggedError<SubnetGroupInUseFault>()(
    "SubnetGroupInUseFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "SubnetGroupInUse", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class SubnetGroupNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<SubnetGroupNotFoundFault>()(
    "SubnetGroupNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "SubnetGroupNotFoundFault",
        httpResponseCode: 404,
      }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class SubnetGroupQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<SubnetGroupQuotaExceededFault>()(
    "SubnetGroupQuotaExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "SubnetGroupQuotaExceeded",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class SubnetInUse
  extends /*@__PURE__*/ S.TaggedError<SubnetInUse>()(
    "SubnetInUse",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "SubnetInUse", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withDependencyViolationError) {}
export class SubnetNotAllowedFault
  extends /*@__PURE__*/ S.TaggedError<SubnetNotAllowedFault>()(
    "SubnetNotAllowedFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "SubnetNotAllowedFault", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class SubnetQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<SubnetQuotaExceededFault>()(
    "SubnetQuotaExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "SubnetQuotaExceededFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class TagNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<TagNotFoundFault>()(
    "TagNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "TagNotFound", httpResponseCode: 404 }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class TagQuotaPerResourceExceeded
  extends /*@__PURE__*/ S.TaggedError<TagQuotaPerResourceExceeded>()(
    "TagQuotaPerResourceExceeded",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "TagQuotaPerResourceExceeded",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export type AvailabilityZoneList = string[];
export const AvailabilityZoneList = /*@__PURE__*/ S.Array(S.String);
export type SecurityGroupIdentifierList = string[];
export const SecurityGroupIdentifierList = /*@__PURE__*/ S.Array(S.String);
export interface Tag {
  Key?: string;
  Value?: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = /*@__PURE__*/ S.Array(Tag);
export type SSEEnabled = boolean;
export interface SSESpecification {
  Enabled: boolean;
}
export const SSESpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Enabled: S.Boolean }),
).annotate({
  identifier: "SSESpecification",
}) as any as S.Schema<SSESpecification>;
export type ClusterEndpointEncryptionType = "NONE" | "TLS" | (string & {});
export const ClusterEndpointEncryptionType = S.String;

export type NetworkType = "ipv4" | "ipv6" | "dual_stack" | (string & {});
export const NetworkType = S.String;

export interface CreateClusterRequest {
  ClusterName: string;
  NodeType: string;
  Description?: string;
  ReplicationFactor: number;
  AvailabilityZones?: string[];
  SubnetGroupName?: string;
  SecurityGroupIds?: string[];
  PreferredMaintenanceWindow?: string;
  NotificationTopicArn?: string;
  IamRoleArn: string;
  ParameterGroupName?: string;
  Tags?: Tag[];
  SSESpecification?: SSESpecification;
  ClusterEndpointEncryptionType?: ClusterEndpointEncryptionType;
  NetworkType?: NetworkType;
}
export const CreateClusterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterName: S.String,
    NodeType: S.String,
    Description: S.optional(S.String),
    ReplicationFactor: S.Number,
    AvailabilityZones: S.optional(AvailabilityZoneList),
    SubnetGroupName: S.optional(S.String),
    SecurityGroupIds: S.optional(SecurityGroupIdentifierList),
    PreferredMaintenanceWindow: S.optional(S.String),
    NotificationTopicArn: S.optional(S.String),
    IamRoleArn: S.String,
    ParameterGroupName: S.optional(S.String),
    Tags: S.optional(TagList),
    SSESpecification: S.optional(SSESpecification),
    ClusterEndpointEncryptionType: S.optional(ClusterEndpointEncryptionType),
    NetworkType: S.optional(NetworkType),
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
  identifier: "CreateClusterRequest",
}) as any as S.Schema<CreateClusterRequest>;
export interface Endpoint {
  Address?: string;
  Port?: number;
  URL?: string;
}
export const Endpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Address: S.optional(S.String),
    Port: S.optional(S.Number),
    URL: S.optional(S.String),
  }),
).annotate({ identifier: "Endpoint" }) as any as S.Schema<Endpoint>;
export type NodeIdentifierList = string[];
export const NodeIdentifierList = /*@__PURE__*/ S.Array(S.String);
export interface Node {
  NodeId?: string;
  Endpoint?: Endpoint;
  NodeCreateTime?: Date;
  AvailabilityZone?: string;
  NodeStatus?: string;
  ParameterGroupStatus?: string;
}
export const Node = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NodeId: S.optional(S.String),
    Endpoint: S.optional(Endpoint),
    NodeCreateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    AvailabilityZone: S.optional(S.String),
    NodeStatus: S.optional(S.String),
    ParameterGroupStatus: S.optional(S.String),
  }),
).annotate({ identifier: "Node" }) as any as S.Schema<Node>;
export type NodeList = Node[];
export const NodeList = /*@__PURE__*/ S.Array(Node);
export interface NotificationConfiguration {
  TopicArn?: string;
  TopicStatus?: string;
}
export const NotificationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TopicArn: S.optional(S.String),
    TopicStatus: S.optional(S.String),
  }),
).annotate({
  identifier: "NotificationConfiguration",
}) as any as S.Schema<NotificationConfiguration>;
export interface SecurityGroupMembership {
  SecurityGroupIdentifier?: string;
  Status?: string;
}
export const SecurityGroupMembership = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SecurityGroupIdentifier: S.optional(S.String),
    Status: S.optional(S.String),
  }),
).annotate({
  identifier: "SecurityGroupMembership",
}) as any as S.Schema<SecurityGroupMembership>;
export type SecurityGroupMembershipList = SecurityGroupMembership[];
export const SecurityGroupMembershipList = /*@__PURE__*/ S.Array(
  SecurityGroupMembership,
);
export interface ParameterGroupStatus {
  ParameterGroupName?: string;
  ParameterApplyStatus?: string;
  NodeIdsToReboot?: string[];
}
export const ParameterGroupStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ParameterGroupName: S.optional(S.String),
    ParameterApplyStatus: S.optional(S.String),
    NodeIdsToReboot: S.optional(NodeIdentifierList),
  }),
).annotate({
  identifier: "ParameterGroupStatus",
}) as any as S.Schema<ParameterGroupStatus>;
export type SSEStatus =
  | "ENABLING"
  | "ENABLED"
  | "DISABLING"
  | "DISABLED"
  | (string & {});
export const SSEStatus = S.String;

export interface SSEDescription {
  Status?: SSEStatus;
}
export const SSEDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Status: S.optional(SSEStatus) }),
).annotate({ identifier: "SSEDescription" }) as any as S.Schema<SSEDescription>;
export interface Cluster {
  ClusterName?: string;
  Description?: string;
  ClusterArn?: string;
  TotalNodes?: number;
  ActiveNodes?: number;
  NodeType?: string;
  Status?: string;
  ClusterDiscoveryEndpoint?: Endpoint;
  NodeIdsToRemove?: string[];
  Nodes?: Node[];
  PreferredMaintenanceWindow?: string;
  NotificationConfiguration?: NotificationConfiguration;
  SubnetGroup?: string;
  SecurityGroups?: SecurityGroupMembership[];
  IamRoleArn?: string;
  ParameterGroup?: ParameterGroupStatus;
  SSEDescription?: SSEDescription;
  ClusterEndpointEncryptionType?: ClusterEndpointEncryptionType;
  NetworkType?: NetworkType;
}
export const Cluster = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterName: S.optional(S.String),
    Description: S.optional(S.String),
    ClusterArn: S.optional(S.String),
    TotalNodes: S.optional(S.Number),
    ActiveNodes: S.optional(S.Number),
    NodeType: S.optional(S.String),
    Status: S.optional(S.String),
    ClusterDiscoveryEndpoint: S.optional(Endpoint),
    NodeIdsToRemove: S.optional(NodeIdentifierList),
    Nodes: S.optional(NodeList),
    PreferredMaintenanceWindow: S.optional(S.String),
    NotificationConfiguration: S.optional(NotificationConfiguration),
    SubnetGroup: S.optional(S.String),
    SecurityGroups: S.optional(SecurityGroupMembershipList),
    IamRoleArn: S.optional(S.String),
    ParameterGroup: S.optional(ParameterGroupStatus),
    SSEDescription: S.optional(SSEDescription),
    ClusterEndpointEncryptionType: S.optional(ClusterEndpointEncryptionType),
    NetworkType: S.optional(NetworkType),
  }),
).annotate({ identifier: "Cluster" }) as any as S.Schema<Cluster>;
export interface CreateClusterResponse {
  Cluster?: Cluster;
}
export const CreateClusterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Cluster: S.optional(Cluster) }).pipe(ns),
).annotate({
  identifier: "CreateClusterResponse",
}) as any as S.Schema<CreateClusterResponse>;
export interface CreateParameterGroupRequest {
  ParameterGroupName: string;
  Description?: string;
}
export const CreateParameterGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ParameterGroupName: S.String,
    Description: S.optional(S.String),
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
  identifier: "CreateParameterGroupRequest",
}) as any as S.Schema<CreateParameterGroupRequest>;
export interface ParameterGroup {
  ParameterGroupName?: string;
  Description?: string;
}
export const ParameterGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ParameterGroupName: S.optional(S.String),
    Description: S.optional(S.String),
  }),
).annotate({ identifier: "ParameterGroup" }) as any as S.Schema<ParameterGroup>;
export interface CreateParameterGroupResponse {
  ParameterGroup?: ParameterGroup;
}
export const CreateParameterGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ParameterGroup: S.optional(ParameterGroup) }).pipe(ns),
).annotate({
  identifier: "CreateParameterGroupResponse",
}) as any as S.Schema<CreateParameterGroupResponse>;
export type SubnetIdentifierList = string[];
export const SubnetIdentifierList = /*@__PURE__*/ S.Array(S.String);
export interface CreateSubnetGroupRequest {
  SubnetGroupName: string;
  Description?: string;
  SubnetIds: string[];
}
export const CreateSubnetGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SubnetGroupName: S.String,
    Description: S.optional(S.String),
    SubnetIds: SubnetIdentifierList,
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
  identifier: "CreateSubnetGroupRequest",
}) as any as S.Schema<CreateSubnetGroupRequest>;
export type NetworkTypeList = NetworkType[];
export const NetworkTypeList = /*@__PURE__*/ S.Array(NetworkType);
export interface Subnet {
  SubnetIdentifier?: string;
  SubnetAvailabilityZone?: string;
  SupportedNetworkTypes?: NetworkType[];
}
export const Subnet = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SubnetIdentifier: S.optional(S.String),
    SubnetAvailabilityZone: S.optional(S.String),
    SupportedNetworkTypes: S.optional(NetworkTypeList),
  }),
).annotate({ identifier: "Subnet" }) as any as S.Schema<Subnet>;
export type SubnetList = Subnet[];
export const SubnetList = /*@__PURE__*/ S.Array(Subnet);
export interface SubnetGroup {
  SubnetGroupName?: string;
  Description?: string;
  VpcId?: string;
  Subnets?: Subnet[];
  SupportedNetworkTypes?: NetworkType[];
}
export const SubnetGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SubnetGroupName: S.optional(S.String),
    Description: S.optional(S.String),
    VpcId: S.optional(S.String),
    Subnets: S.optional(SubnetList),
    SupportedNetworkTypes: S.optional(NetworkTypeList),
  }),
).annotate({ identifier: "SubnetGroup" }) as any as S.Schema<SubnetGroup>;
export interface CreateSubnetGroupResponse {
  SubnetGroup?: SubnetGroup;
}
export const CreateSubnetGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SubnetGroup: S.optional(SubnetGroup) }).pipe(ns),
).annotate({
  identifier: "CreateSubnetGroupResponse",
}) as any as S.Schema<CreateSubnetGroupResponse>;
export interface DecreaseReplicationFactorRequest {
  ClusterName: string;
  NewReplicationFactor: number;
  AvailabilityZones?: string[];
  NodeIdsToRemove?: string[];
}
export const DecreaseReplicationFactorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterName: S.String,
    NewReplicationFactor: S.Number,
    AvailabilityZones: S.optional(AvailabilityZoneList),
    NodeIdsToRemove: S.optional(NodeIdentifierList),
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
  identifier: "DecreaseReplicationFactorRequest",
}) as any as S.Schema<DecreaseReplicationFactorRequest>;
export interface DecreaseReplicationFactorResponse {
  Cluster?: Cluster;
}
export const DecreaseReplicationFactorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Cluster: S.optional(Cluster) }).pipe(ns),
).annotate({
  identifier: "DecreaseReplicationFactorResponse",
}) as any as S.Schema<DecreaseReplicationFactorResponse>;
export interface DeleteClusterRequest {
  ClusterName: string;
}
export const DeleteClusterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ClusterName: S.String }).pipe(
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
  identifier: "DeleteClusterRequest",
}) as any as S.Schema<DeleteClusterRequest>;
export interface DeleteClusterResponse {
  Cluster?: Cluster;
}
export const DeleteClusterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Cluster: S.optional(Cluster) }).pipe(ns),
).annotate({
  identifier: "DeleteClusterResponse",
}) as any as S.Schema<DeleteClusterResponse>;
export interface DeleteParameterGroupRequest {
  ParameterGroupName: string;
}
export const DeleteParameterGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ParameterGroupName: S.String }).pipe(
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
  identifier: "DeleteParameterGroupRequest",
}) as any as S.Schema<DeleteParameterGroupRequest>;
export interface DeleteParameterGroupResponse {
  DeletionMessage?: string;
}
export const DeleteParameterGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DeletionMessage: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "DeleteParameterGroupResponse",
}) as any as S.Schema<DeleteParameterGroupResponse>;
export interface DeleteSubnetGroupRequest {
  SubnetGroupName: string;
}
export const DeleteSubnetGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SubnetGroupName: S.String }).pipe(
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
  identifier: "DeleteSubnetGroupRequest",
}) as any as S.Schema<DeleteSubnetGroupRequest>;
export interface DeleteSubnetGroupResponse {
  DeletionMessage?: string;
}
export const DeleteSubnetGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DeletionMessage: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "DeleteSubnetGroupResponse",
}) as any as S.Schema<DeleteSubnetGroupResponse>;
export type ClusterNameList = string[];
export const ClusterNameList = /*@__PURE__*/ S.Array(S.String);
export interface DescribeClustersRequest {
  ClusterNames?: string[];
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeClustersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterNames: S.optional(ClusterNameList),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
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
  identifier: "DescribeClustersRequest",
}) as any as S.Schema<DescribeClustersRequest>;
export type ClusterList = Cluster[];
export const ClusterList = /*@__PURE__*/ S.Array(Cluster);
export interface DescribeClustersResponse {
  NextToken?: string;
  Clusters?: Cluster[];
}
export const DescribeClustersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    Clusters: S.optional(ClusterList),
  }).pipe(ns),
).annotate({
  identifier: "DescribeClustersResponse",
}) as any as S.Schema<DescribeClustersResponse>;
export interface DescribeDefaultParametersRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeDefaultParametersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
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
  identifier: "DescribeDefaultParametersRequest",
}) as any as S.Schema<DescribeDefaultParametersRequest>;
export type ParameterType = "DEFAULT" | "NODE_TYPE_SPECIFIC" | (string & {});
export const ParameterType = S.String;

export interface NodeTypeSpecificValue {
  NodeType?: string;
  Value?: string;
}
export const NodeTypeSpecificValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ NodeType: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({
  identifier: "NodeTypeSpecificValue",
}) as any as S.Schema<NodeTypeSpecificValue>;
export type NodeTypeSpecificValueList = NodeTypeSpecificValue[];
export const NodeTypeSpecificValueList = /*@__PURE__*/ S.Array(
  NodeTypeSpecificValue,
);
export type IsModifiable = "TRUE" | "FALSE" | "CONDITIONAL" | (string & {});
export const IsModifiable = S.String;

export type ChangeType = "IMMEDIATE" | "REQUIRES_REBOOT" | (string & {});
export const ChangeType = S.String;

export interface Parameter {
  ParameterName?: string;
  ParameterType?: ParameterType;
  ParameterValue?: string;
  NodeTypeSpecificValues?: NodeTypeSpecificValue[];
  Description?: string;
  Source?: string;
  DataType?: string;
  AllowedValues?: string;
  IsModifiable?: IsModifiable;
  ChangeType?: ChangeType;
}
export const Parameter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ParameterName: S.optional(S.String),
    ParameterType: S.optional(ParameterType),
    ParameterValue: S.optional(S.String),
    NodeTypeSpecificValues: S.optional(NodeTypeSpecificValueList),
    Description: S.optional(S.String),
    Source: S.optional(S.String),
    DataType: S.optional(S.String),
    AllowedValues: S.optional(S.String),
    IsModifiable: S.optional(IsModifiable),
    ChangeType: S.optional(ChangeType),
  }),
).annotate({ identifier: "Parameter" }) as any as S.Schema<Parameter>;
export type ParameterList = Parameter[];
export const ParameterList = /*@__PURE__*/ S.Array(Parameter);
export interface DescribeDefaultParametersResponse {
  NextToken?: string;
  Parameters?: Parameter[];
}
export const DescribeDefaultParametersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    Parameters: S.optional(ParameterList),
  }).pipe(ns),
).annotate({
  identifier: "DescribeDefaultParametersResponse",
}) as any as S.Schema<DescribeDefaultParametersResponse>;
export type SourceType =
  | "CLUSTER"
  | "PARAMETER_GROUP"
  | "SUBNET_GROUP"
  | (string & {});
export const SourceType = S.String;

export interface DescribeEventsRequest {
  SourceName?: string;
  SourceType?: SourceType;
  StartTime?: Date;
  EndTime?: Date;
  Duration?: number;
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeEventsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceName: S.optional(S.String),
    SourceType: S.optional(SourceType),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Duration: S.optional(S.Number),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
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
  identifier: "DescribeEventsRequest",
}) as any as S.Schema<DescribeEventsRequest>;
export interface Event {
  SourceName?: string;
  SourceType?: SourceType;
  Message?: string;
  Date?: Date;
}
export const Event = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceName: S.optional(S.String),
    SourceType: S.optional(SourceType),
    Message: S.optional(S.String),
    Date: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "Event" }) as any as S.Schema<Event>;
export type EventList = Event[];
export const EventList = /*@__PURE__*/ S.Array(Event);
export interface DescribeEventsResponse {
  NextToken?: string;
  Events?: Event[];
}
export const DescribeEventsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    Events: S.optional(EventList),
  }).pipe(ns),
).annotate({
  identifier: "DescribeEventsResponse",
}) as any as S.Schema<DescribeEventsResponse>;
export type ParameterGroupNameList = string[];
export const ParameterGroupNameList = /*@__PURE__*/ S.Array(S.String);
export interface DescribeParameterGroupsRequest {
  ParameterGroupNames?: string[];
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeParameterGroupsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ParameterGroupNames: S.optional(ParameterGroupNameList),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
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
  identifier: "DescribeParameterGroupsRequest",
}) as any as S.Schema<DescribeParameterGroupsRequest>;
export type ParameterGroupList = ParameterGroup[];
export const ParameterGroupList = /*@__PURE__*/ S.Array(ParameterGroup);
export interface DescribeParameterGroupsResponse {
  NextToken?: string;
  ParameterGroups?: ParameterGroup[];
}
export const DescribeParameterGroupsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    ParameterGroups: S.optional(ParameterGroupList),
  }).pipe(ns),
).annotate({
  identifier: "DescribeParameterGroupsResponse",
}) as any as S.Schema<DescribeParameterGroupsResponse>;
export interface DescribeParametersRequest {
  ParameterGroupName: string;
  Source?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeParametersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ParameterGroupName: S.String,
    Source: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
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
  identifier: "DescribeParametersRequest",
}) as any as S.Schema<DescribeParametersRequest>;
export interface DescribeParametersResponse {
  NextToken?: string;
  Parameters?: Parameter[];
}
export const DescribeParametersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    Parameters: S.optional(ParameterList),
  }).pipe(ns),
).annotate({
  identifier: "DescribeParametersResponse",
}) as any as S.Schema<DescribeParametersResponse>;
export type SubnetGroupNameList = string[];
export const SubnetGroupNameList = /*@__PURE__*/ S.Array(S.String);
export interface DescribeSubnetGroupsRequest {
  SubnetGroupNames?: string[];
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeSubnetGroupsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SubnetGroupNames: S.optional(SubnetGroupNameList),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
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
  identifier: "DescribeSubnetGroupsRequest",
}) as any as S.Schema<DescribeSubnetGroupsRequest>;
export type SubnetGroupList = SubnetGroup[];
export const SubnetGroupList = /*@__PURE__*/ S.Array(SubnetGroup);
export interface DescribeSubnetGroupsResponse {
  NextToken?: string;
  SubnetGroups?: SubnetGroup[];
}
export const DescribeSubnetGroupsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    SubnetGroups: S.optional(SubnetGroupList),
  }).pipe(ns),
).annotate({
  identifier: "DescribeSubnetGroupsResponse",
}) as any as S.Schema<DescribeSubnetGroupsResponse>;
export interface IncreaseReplicationFactorRequest {
  ClusterName: string;
  NewReplicationFactor: number;
  AvailabilityZones?: string[];
}
export const IncreaseReplicationFactorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterName: S.String,
    NewReplicationFactor: S.Number,
    AvailabilityZones: S.optional(AvailabilityZoneList),
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
  identifier: "IncreaseReplicationFactorRequest",
}) as any as S.Schema<IncreaseReplicationFactorRequest>;
export interface IncreaseReplicationFactorResponse {
  Cluster?: Cluster;
}
export const IncreaseReplicationFactorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Cluster: S.optional(Cluster) }).pipe(ns),
).annotate({
  identifier: "IncreaseReplicationFactorResponse",
}) as any as S.Schema<IncreaseReplicationFactorResponse>;
export interface ListTagsRequest {
  ResourceName: string;
  NextToken?: string;
}
export const ListTagsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceName: S.String, NextToken: S.optional(S.String) }).pipe(
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
  identifier: "ListTagsRequest",
}) as any as S.Schema<ListTagsRequest>;
export interface ListTagsResponse {
  Tags?: Tag[];
  NextToken?: string;
}
export const ListTagsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(TagList), NextToken: S.optional(S.String) }).pipe(
    ns,
  ),
).annotate({
  identifier: "ListTagsResponse",
}) as any as S.Schema<ListTagsResponse>;
export interface RebootNodeRequest {
  ClusterName: string;
  NodeId: string;
}
export const RebootNodeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ClusterName: S.String, NodeId: S.String }).pipe(
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
  identifier: "RebootNodeRequest",
}) as any as S.Schema<RebootNodeRequest>;
export interface RebootNodeResponse {
  Cluster?: Cluster;
}
export const RebootNodeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Cluster: S.optional(Cluster) }).pipe(ns),
).annotate({
  identifier: "RebootNodeResponse",
}) as any as S.Schema<RebootNodeResponse>;
export interface TagResourceRequest {
  ResourceName: string;
  Tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceName: S.String, Tags: TagList }).pipe(
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
export interface TagResourceResponse {
  Tags?: Tag[];
}
export const TagResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(TagList) }).pipe(ns),
).annotate({
  identifier: "TagResourceResponse",
}) as any as S.Schema<TagResourceResponse>;
export type KeyList = string[];
export const KeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  ResourceName: string;
  TagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceName: S.String, TagKeys: KeyList }).pipe(
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
export interface UntagResourceResponse {
  Tags?: Tag[];
}
export const UntagResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(TagList) }).pipe(ns),
).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export interface UpdateClusterRequest {
  ClusterName: string;
  Description?: string;
  PreferredMaintenanceWindow?: string;
  NotificationTopicArn?: string;
  NotificationTopicStatus?: string;
  ParameterGroupName?: string;
  SecurityGroupIds?: string[];
}
export const UpdateClusterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterName: S.String,
    Description: S.optional(S.String),
    PreferredMaintenanceWindow: S.optional(S.String),
    NotificationTopicArn: S.optional(S.String),
    NotificationTopicStatus: S.optional(S.String),
    ParameterGroupName: S.optional(S.String),
    SecurityGroupIds: S.optional(SecurityGroupIdentifierList),
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
  identifier: "UpdateClusterRequest",
}) as any as S.Schema<UpdateClusterRequest>;
export interface UpdateClusterResponse {
  Cluster?: Cluster;
}
export const UpdateClusterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Cluster: S.optional(Cluster) }).pipe(ns),
).annotate({
  identifier: "UpdateClusterResponse",
}) as any as S.Schema<UpdateClusterResponse>;
export interface ParameterNameValue {
  ParameterName?: string;
  ParameterValue?: string;
}
export const ParameterNameValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ParameterName: S.optional(S.String),
    ParameterValue: S.optional(S.String),
  }),
).annotate({
  identifier: "ParameterNameValue",
}) as any as S.Schema<ParameterNameValue>;
export type ParameterNameValueList = ParameterNameValue[];
export const ParameterNameValueList = /*@__PURE__*/ S.Array(ParameterNameValue);
export interface UpdateParameterGroupRequest {
  ParameterGroupName: string;
  ParameterNameValues: ParameterNameValue[];
}
export const UpdateParameterGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ParameterGroupName: S.String,
    ParameterNameValues: ParameterNameValueList,
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
  identifier: "UpdateParameterGroupRequest",
}) as any as S.Schema<UpdateParameterGroupRequest>;
export interface UpdateParameterGroupResponse {
  ParameterGroup?: ParameterGroup;
}
export const UpdateParameterGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ParameterGroup: S.optional(ParameterGroup) }).pipe(ns),
).annotate({
  identifier: "UpdateParameterGroupResponse",
}) as any as S.Schema<UpdateParameterGroupResponse>;
export interface UpdateSubnetGroupRequest {
  SubnetGroupName: string;
  Description?: string;
  SubnetIds?: string[];
}
export const UpdateSubnetGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SubnetGroupName: S.String,
    Description: S.optional(S.String),
    SubnetIds: S.optional(SubnetIdentifierList),
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
  identifier: "UpdateSubnetGroupRequest",
}) as any as S.Schema<UpdateSubnetGroupRequest>;
export interface UpdateSubnetGroupResponse {
  SubnetGroup?: SubnetGroup;
}
export const UpdateSubnetGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SubnetGroup: S.optional(SubnetGroup) }).pipe(ns),
).annotate({
  identifier: "UpdateSubnetGroupResponse",
}) as any as S.Schema<UpdateSubnetGroupResponse>;
export type ExceptionMessage = string;
export type AwsQueryErrorMessage = string;
export type CreateClusterError =
  | ClusterAlreadyExistsFault
  | ClusterQuotaForCustomerExceededFault
  | InsufficientClusterCapacityFault
  | InvalidClusterStateFault
  | InvalidParameterCombinationException
  | InvalidParameterGroupStateFault
  | InvalidParameterValueException
  | InvalidVPCNetworkStateFault
  | NodeQuotaForClusterExceededFault
  | NodeQuotaForCustomerExceededFault
  | ParameterGroupNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | ServiceQuotaExceededException
  | SubnetGroupNotFoundFault
  | TagQuotaPerResourceExceeded
  | CommonErrors;
/**
 * Creates a DAX cluster. All nodes in the cluster run the same DAX caching software.
 */
export const createCluster: API.OperationMethod<
  CreateClusterRequest,
  CreateClusterResponse,
  CreateClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateClusterRequest,
  output: CreateClusterResponse,
  errors: [
    ClusterAlreadyExistsFault,
    ClusterQuotaForCustomerExceededFault,
    InsufficientClusterCapacityFault,
    InvalidClusterStateFault,
    InvalidParameterCombinationException,
    InvalidParameterGroupStateFault,
    InvalidParameterValueException,
    InvalidVPCNetworkStateFault,
    NodeQuotaForClusterExceededFault,
    NodeQuotaForCustomerExceededFault,
    ParameterGroupNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
    ServiceQuotaExceededException,
    SubnetGroupNotFoundFault,
    TagQuotaPerResourceExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCluster",
}));

export type CreateParameterGroupError =
  | InvalidParameterCombinationException
  | InvalidParameterGroupStateFault
  | InvalidParameterValueException
  | ParameterGroupAlreadyExistsFault
  | ParameterGroupQuotaExceededFault
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Creates a new parameter group. A parameter group is a collection of parameters that
 * you apply to all of the nodes in a DAX cluster.
 */
export const createParameterGroup: API.OperationMethod<
  CreateParameterGroupRequest,
  CreateParameterGroupResponse,
  CreateParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateParameterGroupRequest,
  output: CreateParameterGroupResponse,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterGroupStateFault,
    InvalidParameterValueException,
    ParameterGroupAlreadyExistsFault,
    ParameterGroupQuotaExceededFault,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateParameterGroup",
}));

export type CreateSubnetGroupError =
  | InvalidSubnet
  | ServiceLinkedRoleNotFoundFault
  | SubnetGroupAlreadyExistsFault
  | SubnetGroupQuotaExceededFault
  | SubnetNotAllowedFault
  | SubnetQuotaExceededFault
  | CommonErrors;
/**
 * Creates a new subnet group.
 */
export const createSubnetGroup: API.OperationMethod<
  CreateSubnetGroupRequest,
  CreateSubnetGroupResponse,
  CreateSubnetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSubnetGroupRequest,
  output: CreateSubnetGroupResponse,
  errors: [
    InvalidSubnet,
    ServiceLinkedRoleNotFoundFault,
    SubnetGroupAlreadyExistsFault,
    SubnetGroupQuotaExceededFault,
    SubnetNotAllowedFault,
    SubnetQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSubnetGroup",
}));

export type DecreaseReplicationFactorError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | NodeNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Removes one or more nodes from a DAX cluster.
 *
 * You cannot use `DecreaseReplicationFactor` to remove the last node
 * in a DAX cluster. If you need to do this, use
 * `DeleteCluster` instead.
 */
export const decreaseReplicationFactor: API.OperationMethod<
  DecreaseReplicationFactorRequest,
  DecreaseReplicationFactorResponse,
  DecreaseReplicationFactorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DecreaseReplicationFactorRequest,
  output: DecreaseReplicationFactorResponse,
  errors: [
    ClusterNotFoundFault,
    InvalidClusterStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    NodeNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DecreaseReplicationFactor",
}));

export type DeleteClusterError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Deletes a previously provisioned DAX cluster.
 * *DeleteCluster* deletes all associated nodes, node endpoints and
 * the DAX cluster itself. When you receive a successful response from this
 * action, DAX immediately begins deleting the cluster; you cannot cancel or
 * revert this action.
 */
export const deleteCluster: API.OperationMethod<
  DeleteClusterRequest,
  DeleteClusterResponse,
  DeleteClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteClusterRequest,
  output: DeleteClusterResponse,
  errors: [
    ClusterNotFoundFault,
    InvalidClusterStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCluster",
}));

export type DeleteParameterGroupError =
  | InvalidParameterCombinationException
  | InvalidParameterGroupStateFault
  | InvalidParameterValueException
  | ParameterGroupNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Deletes the specified parameter group. You cannot delete a parameter group if it is
 * associated with any DAX clusters.
 */
export const deleteParameterGroup: API.OperationMethod<
  DeleteParameterGroupRequest,
  DeleteParameterGroupResponse,
  DeleteParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteParameterGroupRequest,
  output: DeleteParameterGroupResponse,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterGroupStateFault,
    InvalidParameterValueException,
    ParameterGroupNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteParameterGroup",
}));

export type DeleteSubnetGroupError =
  | ServiceLinkedRoleNotFoundFault
  | SubnetGroupInUseFault
  | SubnetGroupNotFoundFault
  | CommonErrors;
/**
 * Deletes a subnet group.
 *
 * You cannot delete a subnet group if it is associated with any DAX
 * clusters.
 */
export const deleteSubnetGroup: API.OperationMethod<
  DeleteSubnetGroupRequest,
  DeleteSubnetGroupResponse,
  DeleteSubnetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSubnetGroupRequest,
  output: DeleteSubnetGroupResponse,
  errors: [
    ServiceLinkedRoleNotFoundFault,
    SubnetGroupInUseFault,
    SubnetGroupNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSubnetGroup",
}));

export type DescribeClustersError =
  | ClusterNotFoundFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Returns information about all provisioned DAX clusters if no cluster identifier is
 * specified, or about a specific DAX cluster if a cluster identifier is
 * supplied.
 *
 * If the cluster is in the CREATING state, only cluster level information will be
 * displayed until all of the nodes are successfully provisioned.
 *
 * If the cluster is in the DELETING state, only cluster level information will be
 * displayed.
 *
 * If nodes are currently being added to the DAX cluster, node endpoint information
 * and creation time for the additional nodes will not be displayed until they are
 * completely provisioned. When the DAX cluster state is
 * *available*, the cluster is ready for use.
 *
 * If nodes are currently being removed from the DAX cluster, no
 * endpoint information for the removed nodes is displayed.
 */
export const describeClusters: API.OperationMethod<
  DescribeClustersRequest,
  DescribeClustersResponse,
  DescribeClustersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeClustersRequest,
  output: DescribeClustersResponse,
  errors: [
    ClusterNotFoundFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeClusters",
}));

export type DescribeDefaultParametersError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Returns the default system parameter information for the DAX caching
 * software.
 */
export const describeDefaultParameters: API.OperationMethod<
  DescribeDefaultParametersRequest,
  DescribeDefaultParametersResponse,
  DescribeDefaultParametersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeDefaultParametersRequest,
  output: DescribeDefaultParametersResponse,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDefaultParameters",
}));

export type DescribeEventsError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Returns events related to DAX clusters and parameter groups. You can
 * obtain events specific to a particular DAX cluster or parameter group by
 * providing the name as a parameter.
 *
 * By default, only the events occurring within the last 24 hours are returned;
 * however, you can retrieve up to 14 days' worth of events if necessary.
 */
export const describeEvents: API.OperationMethod<
  DescribeEventsRequest,
  DescribeEventsResponse,
  DescribeEventsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeEventsRequest,
  output: DescribeEventsResponse,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEvents",
}));

export type DescribeParameterGroupsError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ParameterGroupNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Returns a list of parameter group descriptions. If a parameter group name is
 * specified, the list will contain only the descriptions for that group.
 */
export const describeParameterGroups: API.OperationMethod<
  DescribeParameterGroupsRequest,
  DescribeParameterGroupsResponse,
  DescribeParameterGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeParameterGroupsRequest,
  output: DescribeParameterGroupsResponse,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ParameterGroupNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeParameterGroups",
}));

export type DescribeParametersError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ParameterGroupNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Returns the detailed parameter list for a particular parameter group.
 */
export const describeParameters: API.OperationMethod<
  DescribeParametersRequest,
  DescribeParametersResponse,
  DescribeParametersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeParametersRequest,
  output: DescribeParametersResponse,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ParameterGroupNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeParameters",
}));

export type DescribeSubnetGroupsError =
  | ServiceLinkedRoleNotFoundFault
  | SubnetGroupNotFoundFault
  | CommonErrors;
/**
 * Returns a list of subnet group descriptions. If a subnet group name is specified,
 * the list will contain only the description of that group.
 */
export const describeSubnetGroups: API.OperationMethod<
  DescribeSubnetGroupsRequest,
  DescribeSubnetGroupsResponse,
  DescribeSubnetGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeSubnetGroupsRequest,
  output: DescribeSubnetGroupsResponse,
  errors: [ServiceLinkedRoleNotFoundFault, SubnetGroupNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSubnetGroups",
}));

export type IncreaseReplicationFactorError =
  | ClusterNotFoundFault
  | InsufficientClusterCapacityFault
  | InvalidClusterStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | InvalidVPCNetworkStateFault
  | NodeQuotaForClusterExceededFault
  | NodeQuotaForCustomerExceededFault
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Adds one or more nodes to a DAX cluster.
 */
export const increaseReplicationFactor: API.OperationMethod<
  IncreaseReplicationFactorRequest,
  IncreaseReplicationFactorResponse,
  IncreaseReplicationFactorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: IncreaseReplicationFactorRequest,
  output: IncreaseReplicationFactorResponse,
  errors: [
    ClusterNotFoundFault,
    InsufficientClusterCapacityFault,
    InvalidClusterStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    InvalidVPCNetworkStateFault,
    NodeQuotaForClusterExceededFault,
    NodeQuotaForCustomerExceededFault,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "IncreaseReplicationFactor",
}));

export type ListTagsError =
  | ClusterNotFoundFault
  | InvalidARNFault
  | InvalidClusterStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * List all of the tags for a DAX cluster. You can call
 * `ListTags` up to 10 times per second, per account.
 */
export const listTags: API.OperationMethod<
  ListTagsRequest,
  ListTagsResponse,
  ListTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsRequest,
  output: ListTagsResponse,
  errors: [
    ClusterNotFoundFault,
    InvalidARNFault,
    InvalidClusterStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTags",
}));

export type RebootNodeError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | NodeNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Reboots a single node of a DAX cluster. The reboot action takes
 * place as soon as possible. During the reboot, the node status is set to
 * REBOOTING.
 *
 * `RebootNode` restarts the DAX engine process and does not remove the
 * contents of the cache.
 */
export const rebootNode: API.OperationMethod<
  RebootNodeRequest,
  RebootNodeResponse,
  RebootNodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RebootNodeRequest,
  output: RebootNodeResponse,
  errors: [
    ClusterNotFoundFault,
    InvalidClusterStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    NodeNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RebootNode",
}));

export type TagResourceError =
  | ClusterNotFoundFault
  | InvalidARNFault
  | InvalidClusterStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ServiceLinkedRoleNotFoundFault
  | TagQuotaPerResourceExceeded
  | CommonErrors;
/**
 * Associates a set of tags with a DAX resource.
 * You can call `TagResource` up to
 * 5 times per second, per account.
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
    ClusterNotFoundFault,
    InvalidARNFault,
    InvalidClusterStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ServiceLinkedRoleNotFoundFault,
    TagQuotaPerResourceExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | ClusterNotFoundFault
  | InvalidARNFault
  | InvalidClusterStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ServiceLinkedRoleNotFoundFault
  | TagNotFoundFault
  | CommonErrors;
/**
 * Removes the association of tags from a DAX resource. You can call
 * `UntagResource` up to 5 times per second, per account.
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
    ClusterNotFoundFault,
    InvalidARNFault,
    InvalidClusterStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ServiceLinkedRoleNotFoundFault,
    TagNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateClusterError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | InvalidParameterCombinationException
  | InvalidParameterGroupStateFault
  | InvalidParameterValueException
  | ParameterGroupNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Modifies the settings for a DAX cluster. You can use this action to
 * change one or more cluster configuration parameters by specifying the parameters and the
 * new values.
 */
export const updateCluster: API.OperationMethod<
  UpdateClusterRequest,
  UpdateClusterResponse,
  UpdateClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateClusterRequest,
  output: UpdateClusterResponse,
  errors: [
    ClusterNotFoundFault,
    InvalidClusterStateFault,
    InvalidParameterCombinationException,
    InvalidParameterGroupStateFault,
    InvalidParameterValueException,
    ParameterGroupNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCluster",
}));

export type UpdateParameterGroupError =
  | InvalidParameterCombinationException
  | InvalidParameterGroupStateFault
  | InvalidParameterValueException
  | ParameterGroupNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Modifies the parameters of a parameter group. You can modify up to 20 parameters in
 * a single request by submitting a list parameter name and value pairs.
 */
export const updateParameterGroup: API.OperationMethod<
  UpdateParameterGroupRequest,
  UpdateParameterGroupResponse,
  UpdateParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateParameterGroupRequest,
  output: UpdateParameterGroupResponse,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterGroupStateFault,
    InvalidParameterValueException,
    ParameterGroupNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateParameterGroup",
}));

export type UpdateSubnetGroupError =
  | InvalidSubnet
  | ServiceLinkedRoleNotFoundFault
  | SubnetGroupNotFoundFault
  | SubnetInUse
  | SubnetNotAllowedFault
  | SubnetQuotaExceededFault
  | CommonErrors;
/**
 * Modifies an existing subnet group.
 */
export const updateSubnetGroup: API.OperationMethod<
  UpdateSubnetGroupRequest,
  UpdateSubnetGroupResponse,
  UpdateSubnetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSubnetGroupRequest,
  output: UpdateSubnetGroupResponse,
  errors: [
    InvalidSubnet,
    ServiceLinkedRoleNotFoundFault,
    SubnetGroupNotFoundFault,
    SubnetInUse,
    SubnetNotAllowedFault,
    SubnetQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSubnetGroup",
}));
