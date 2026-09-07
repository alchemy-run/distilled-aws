import * as HttpClient from "effect/unstable/http/HttpClient";
import * as redacted from "effect/Redacted";
import * as S from "@distilled.cloud/core/schema";
import * as API from "@distilled.cloud/core/api";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { SensitiveString } from "../sensitive.ts";
const svc = T.AwsApiService({
  sdkId: "Interconnect",
  serviceShapeName: "Interconnect",
});
const auth = T.AwsAuthSigv4({ name: "interconnect" });
const ver = T.ServiceVersion("2022-07-26");
const proto = T.AwsProtocolsAwsJson1_0();
const rules = T.EndpointResolver((p, _) => {
  const { UseFIPS = false, Endpoint, Region } = p;
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
    return e(Endpoint);
  }
  if (Region != null) {
    {
      const PartitionResult = _.partition(Region);
      if (PartitionResult != null && PartitionResult !== false) {
        if (UseFIPS === true) {
          return e(
            `https://interconnect-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        return e(
          `https://interconnect.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export type DirectConnectGatewayAttachPoint = string;
export type AmazonResourceName = string;
export type AttachPoint =
  | { directConnectGateway: string; arn?: never }
  | { directConnectGateway?: never; arn: string };
export const AttachPoint = /*@__PURE__*/ S.Union([
  S.Struct({ directConnectGateway: S.String }),
  S.Struct({ arn: S.String }),
]);
export type ActivationKey = string | redacted.Redacted<string>;
export type ConnectionDescription = string;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface AcceptConnectionProposalRequest {
  attachPoint: AttachPoint;
  activationKey: string | redacted.Redacted<string>;
  description?: string;
  tags?: { [key: string]: string | undefined };
  clientToken?: string;
}
export const AcceptConnectionProposalRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    attachPoint: AttachPoint,
    activationKey: SensitiveString,
    description: S.optional(S.String),
    tags: S.optional(TagMap),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "AcceptConnectionProposalRequest",
}) as any as S.Schema<AcceptConnectionProposalRequest>;
export type ConnectionId = string;
export type ConnectionBandwidth = string;
export type EnvironmentId = string;
export type CloudServiceProvider = string;
export type LastMileProvider = string;
export type Provider =
  | { cloudServiceProvider: string; lastMileProvider?: never }
  | { cloudServiceProvider?: never; lastMileProvider: string };
export const Provider = /*@__PURE__*/ S.Union([
  S.Struct({ cloudServiceProvider: S.String }),
  S.Struct({ lastMileProvider: S.String }),
]);
export type Location = string;
export type ProductType = string;
export type ConnectionState =
  | "available"
  | "requested"
  | "pending"
  | "down"
  | "deleting"
  | "deleted"
  | "failed"
  | "updating"
  | (string & {});
export const ConnectionState = S.String;

export type ConnectionSharedId = string;
export type BillingTier = number;
export type OwnerAccountId = string;
export interface Connection {
  id: string;
  arn: string;
  description: string;
  bandwidth: string;
  attachPoint: AttachPoint;
  environmentId: string;
  provider: Provider;
  location: string;
  type: string;
  state: ConnectionState;
  sharedId: string;
  billingTier?: number;
  ownerAccount: string;
  activationKey: string | redacted.Redacted<string>;
  tags?: { [key: string]: string | undefined };
}
export const Connection = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    description: S.String,
    bandwidth: S.String,
    attachPoint: AttachPoint,
    environmentId: S.String,
    provider: Provider,
    location: S.String,
    type: S.String,
    state: ConnectionState,
    sharedId: S.String,
    billingTier: S.optional(S.Number),
    ownerAccount: S.String,
    activationKey: SensitiveString,
    tags: S.optional(TagMap),
  }),
).annotate({ identifier: "Connection" }) as any as S.Schema<Connection>;
export interface AcceptConnectionProposalResponse {
  connection?: Connection;
}
export const AcceptConnectionProposalResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ connection: S.optional(Connection) }),
).annotate({
  identifier: "AcceptConnectionProposalResponse",
}) as any as S.Schema<AcceptConnectionProposalResponse>;
export type RemoteOwnerAccount = string;
export type RemoteAccountIdentifier = { identifier: string };
export const RemoteAccountIdentifier = /*@__PURE__*/ S.Union([
  S.Struct({ identifier: S.String }),
]);
export interface CreateConnectionRequest {
  description?: string;
  bandwidth: string;
  attachPoint: AttachPoint;
  environmentId: string;
  remoteAccount?: RemoteAccountIdentifier;
  tags?: { [key: string]: string | undefined };
  clientToken?: string;
}
export const CreateConnectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    description: S.optional(S.String),
    bandwidth: S.String,
    attachPoint: AttachPoint,
    environmentId: S.String,
    remoteAccount: S.optional(RemoteAccountIdentifier),
    tags: S.optional(TagMap),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateConnectionRequest",
}) as any as S.Schema<CreateConnectionRequest>;
export interface CreateConnectionResponse {
  connection?: Connection;
}
export const CreateConnectionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ connection: S.optional(Connection) }),
).annotate({
  identifier: "CreateConnectionResponse",
}) as any as S.Schema<CreateConnectionResponse>;
export interface DeleteConnectionRequest {
  identifier: string;
  clientToken?: string;
}
export const DeleteConnectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    identifier: S.String,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteConnectionRequest",
}) as any as S.Schema<DeleteConnectionRequest>;
export interface DeleteConnectionResponse {
  connection: Connection;
}
export const DeleteConnectionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ connection: Connection }),
).annotate({
  identifier: "DeleteConnectionResponse",
}) as any as S.Schema<DeleteConnectionResponse>;
export interface DescribeConnectionProposalRequest {
  activationKey: string | redacted.Redacted<string>;
}
export const DescribeConnectionProposalRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ activationKey: SensitiveString }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeConnectionProposalRequest",
}) as any as S.Schema<DescribeConnectionProposalRequest>;
export interface DescribeConnectionProposalResponse {
  bandwidth: string;
  environmentId: string;
  provider: Provider;
  location: string;
}
export const DescribeConnectionProposalResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bandwidth: S.String,
    environmentId: S.String,
    provider: Provider,
    location: S.String,
  }),
).annotate({
  identifier: "DescribeConnectionProposalResponse",
}) as any as S.Schema<DescribeConnectionProposalResponse>;
export interface GetConnectionRequest {
  identifier: string;
}
export const GetConnectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ identifier: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetConnectionRequest",
}) as any as S.Schema<GetConnectionRequest>;
export interface GetConnectionResponse {
  connection?: Connection;
}
export const GetConnectionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ connection: S.optional(Connection) }),
).annotate({
  identifier: "GetConnectionResponse",
}) as any as S.Schema<GetConnectionResponse>;
export interface GetEnvironmentRequest {
  id: string;
}
export const GetEnvironmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetEnvironmentRequest",
}) as any as S.Schema<GetEnvironmentRequest>;
export type EnvironmentState =
  | "available"
  | "limited"
  | "unavailable"
  | (string & {});
export const EnvironmentState = S.String;

export type BandwidthList = string[];
export const BandwidthList = /*@__PURE__*/ S.Array(S.String);
export interface Bandwidths {
  available?: string[];
  supported?: string[];
}
export const Bandwidths = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    available: S.optional(BandwidthList),
    supported: S.optional(BandwidthList),
  }),
).annotate({ identifier: "Bandwidths" }) as any as S.Schema<Bandwidths>;
export type RemoteAccountIdentifierType = "account" | "email" | (string & {});
export const RemoteAccountIdentifierType = S.String;

export interface Environment {
  provider: Provider;
  location: string;
  environmentId: string;
  state: EnvironmentState;
  bandwidths: Bandwidths;
  type: string;
  activationPageUrl?: string;
  remoteIdentifierType?: RemoteAccountIdentifierType;
}
export const Environment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    provider: Provider,
    location: S.String,
    environmentId: S.String,
    state: EnvironmentState,
    bandwidths: Bandwidths,
    type: S.String,
    activationPageUrl: S.optional(S.String),
    remoteIdentifierType: S.optional(RemoteAccountIdentifierType),
  }),
).annotate({ identifier: "Environment" }) as any as S.Schema<Environment>;
export interface GetEnvironmentResponse {
  environment: Environment;
}
export const GetEnvironmentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ environment: Environment }),
).annotate({
  identifier: "GetEnvironmentResponse",
}) as any as S.Schema<GetEnvironmentResponse>;
export type MaxResults = number;
export type NextToken = string;
export interface ListAttachPointsRequest {
  environmentId: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListAttachPointsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    environmentId: S.String,
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListAttachPointsRequest",
}) as any as S.Schema<ListAttachPointsRequest>;
export type AttachPointType = "DirectConnectGateway" | (string & {});
export const AttachPointType = S.String;

export interface AttachPointDescriptor {
  type: AttachPointType;
  identifier: string;
  name: string;
}
export const AttachPointDescriptor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ type: AttachPointType, identifier: S.String, name: S.String }),
).annotate({
  identifier: "AttachPointDescriptor",
}) as any as S.Schema<AttachPointDescriptor>;
export type AttachPointDescriptorList = AttachPointDescriptor[];
export const AttachPointDescriptorList = /*@__PURE__*/ S.Array(
  AttachPointDescriptor,
);
export interface ListAttachPointsResponse {
  attachPoints: AttachPointDescriptor[];
  nextToken?: string;
}
export const ListAttachPointsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    attachPoints: AttachPointDescriptorList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAttachPointsResponse",
}) as any as S.Schema<ListAttachPointsResponse>;
export interface ListConnectionsRequest {
  maxResults?: number;
  nextToken?: string;
  state?: ConnectionState;
  environmentId?: string;
  provider?: Provider;
  attachPoint?: AttachPoint;
}
export const ListConnectionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    state: S.optional(ConnectionState),
    environmentId: S.optional(S.String),
    provider: S.optional(Provider),
    attachPoint: S.optional(AttachPoint),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListConnectionsRequest",
}) as any as S.Schema<ListConnectionsRequest>;
export interface ConnectionSummary {
  id: string;
  arn: string;
  description: string;
  bandwidth: string;
  attachPoint: AttachPoint;
  environmentId: string;
  provider: Provider;
  location: string;
  type: string;
  state: ConnectionState;
  sharedId: string;
  billingTier?: number;
}
export const ConnectionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    description: S.String,
    bandwidth: S.String,
    attachPoint: AttachPoint,
    environmentId: S.String,
    provider: Provider,
    location: S.String,
    type: S.String,
    state: ConnectionState,
    sharedId: S.String,
    billingTier: S.optional(S.Number),
  }),
).annotate({
  identifier: "ConnectionSummary",
}) as any as S.Schema<ConnectionSummary>;
export type ConnectionSummariesList = ConnectionSummary[];
export const ConnectionSummariesList = /*@__PURE__*/ S.Array(ConnectionSummary);
export interface ListConnectionsResponse {
  connections?: ConnectionSummary[];
  nextToken?: string;
}
export const ListConnectionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    connections: S.optional(ConnectionSummariesList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListConnectionsResponse",
}) as any as S.Schema<ListConnectionsResponse>;
export interface ListEnvironmentsRequest {
  maxResults?: number;
  nextToken?: string;
  provider?: Provider;
  location?: string;
}
export const ListEnvironmentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    provider: S.optional(Provider),
    location: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListEnvironmentsRequest",
}) as any as S.Schema<ListEnvironmentsRequest>;
export type EnvironmentList = Environment[];
export const EnvironmentList = /*@__PURE__*/ S.Array(Environment);
export interface ListEnvironmentsResponse {
  environments: Environment[];
  nextToken?: string;
}
export const ListEnvironmentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ environments: EnvironmentList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListEnvironmentsResponse",
}) as any as S.Schema<ListEnvironmentsResponse>;
export interface ListTagsForResourceRequest {
  arn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
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
export interface TagResourceRequest {
  arn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String, tags: TagMap }).pipe(
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
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  arn: string;
  tagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String, tagKeys: TagKeyList }).pipe(
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
export interface UpdateConnectionRequest {
  identifier: string;
  description?: string;
  bandwidth?: string;
  clientToken?: string;
}
export const UpdateConnectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    identifier: S.String,
    description: S.optional(S.String),
    bandwidth: S.optional(S.String),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateConnectionRequest",
}) as any as S.Schema<UpdateConnectionRequest>;
export interface UpdateConnectionResponse {
  connection?: Connection;
}
export const UpdateConnectionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ connection: S.optional(Connection) }),
).annotate({
  identifier: "UpdateConnectionResponse",
}) as any as S.Schema<UpdateConnectionResponse>;
export type AcceptConnectionProposalError = CommonErrors;
/**
 * Accepts a connection proposal which was generated at a supported partner's portal.
 *
 * The proposal contains the Environment and bandwidth that were chosen on the partner's portal and cannot be modified.
 *
 * Upon accepting the proposal a connection will be made between the AWS network as accessed via the selected Attach Point and the network previously selected network on the partner's portal.
 */
export const acceptConnectionProposal: API.OperationMethod<
  AcceptConnectionProposalRequest,
  AcceptConnectionProposalResponse,
  AcceptConnectionProposalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AcceptConnectionProposalRequest,
  output: AcceptConnectionProposalResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptConnectionProposal",
}));

export type CreateConnectionError = CommonErrors;
/**
 * Initiates the process to create a Connection across the specified Environment.
 *
 * The Environment dictates the specified partner and location to which the other end of the connection should attach. You can see a list of the available Environments by calling ListEnvironments
 *
 * The Attach Point specifies where within the AWS Network your connection will logically connect.
 *
 * After a successful call to this method, the resulting Connection will return an Activation Key which will need to be brought to the specific partner's portal to confirm the Connection on both sides. (See Environment$activationPageUrl for a direct link to the partner portal).
 */
export const createConnection: API.OperationMethod<
  CreateConnectionRequest,
  CreateConnectionResponse,
  CreateConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateConnectionRequest,
  output: CreateConnectionResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConnection",
}));

export type DeleteConnectionError = CommonErrors;
/**
 * Deletes an existing Connection with the supplied identifier.
 *
 * This operation will also inform the remote partner of your intention to delete your connection. Note, the partner may still require you to delete to fully clean up resources, but the network connectivity provided by the Connection will cease to exist.
 */
export const deleteConnection: API.OperationMethod<
  DeleteConnectionRequest,
  DeleteConnectionResponse,
  DeleteConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteConnectionRequest,
  output: DeleteConnectionResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnection",
}));

export type DescribeConnectionProposalError = CommonErrors;
/**
 * Describes the details of a connection proposal generated at a partner's portal.
 */
export const describeConnectionProposal: API.OperationMethod<
  DescribeConnectionProposalRequest,
  DescribeConnectionProposalResponse,
  DescribeConnectionProposalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeConnectionProposalRequest,
  output: DescribeConnectionProposalResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConnectionProposal",
}));

export type GetConnectionError = CommonErrors;
/**
 * Describes the current state of a Connection resource as specified by the identifier.
 */
export const getConnection: API.OperationMethod<
  GetConnectionRequest,
  GetConnectionResponse,
  GetConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetConnectionRequest,
  output: GetConnectionResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnection",
}));

export type GetEnvironmentError = CommonErrors;
/**
 * Describes a specific Environment
 */
export const getEnvironment: API.OperationMethod<
  GetEnvironmentRequest,
  GetEnvironmentResponse,
  GetEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEnvironmentRequest,
  output: GetEnvironmentResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEnvironment",
}));

export type ListAttachPointsError = CommonErrors;
/**
 * Lists all Attach Points the caller has access to that are valid for the specified Environment.
 */
export const listAttachPoints: API.PaginatedOperationMethod<
  ListAttachPointsRequest,
  ListAttachPointsResponse,
  ListAttachPointsError,
  Credentials | HttpClient.HttpClient,
  AttachPointDescriptor
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAttachPointsRequest,
  output: ListAttachPointsResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAttachPoints",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "attachPoints",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListConnectionsError = CommonErrors;
/**
 * Lists all connection objects to which the caller has access.
 *
 * Allows for optional filtering by the following properties:
 *
 * - `state`
 *
 * - `environmentId`
 *
 * - `provider`
 *
 * - `attach point`
 *
 * Only Connection objects matching all filters will be returned.
 */
export const listConnections: API.PaginatedOperationMethod<
  ListConnectionsRequest,
  ListConnectionsResponse,
  ListConnectionsError,
  Credentials | HttpClient.HttpClient,
  ConnectionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListConnectionsRequest,
  output: ListConnectionsResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConnections",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "connections",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEnvironmentsError = CommonErrors;
/**
 * Lists all of the environments that can produce connections that will land in the called AWS region.
 */
export const listEnvironments: API.PaginatedOperationMethod<
  ListEnvironmentsRequest,
  ListEnvironmentsResponse,
  ListEnvironmentsError,
  Credentials | HttpClient.HttpClient,
  Environment
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEnvironmentsRequest,
  output: ListEnvironmentsResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnvironments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "environments",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError = CommonErrors;
/**
 * List all current tags on the specified resource. Currently this supports Connection resources.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type TagResourceError = CommonErrors;
/**
 * Add new tags to the specified resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError = CommonErrors;
/**
 * Removes tags from the specified resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateConnectionError = CommonErrors;
/**
 * Modifies an existing connection. Currently we support modifications to the connection's description and/or bandwidth.
 */
export const updateConnection: API.OperationMethod<
  UpdateConnectionRequest,
  UpdateConnectionResponse,
  UpdateConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateConnectionRequest,
  output: UpdateConnectionResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConnection",
}));
