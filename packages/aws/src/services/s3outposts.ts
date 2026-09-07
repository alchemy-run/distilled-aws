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
  sdkId: "S3Outposts",
  serviceShapeName: "S3Outposts",
});
const auth = T.AwsAuthSigv4({ name: "s3-outposts" });
const ver = T.ServiceVersion("2017-07-25");
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
              `https://s3-outposts-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://s3-outposts-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://s3-outposts.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://s3-outposts.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class OutpostOfflineException
  extends /*@__PURE__*/ S.TaggedError<OutpostOfflineException>()(
    "OutpostOfflineException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type OutpostId = string;
export type SubnetId = string;
export type SecurityGroupId = string;
export type EndpointAccessType = "Private" | "CustomerOwnedIp" | (string & {});
export const EndpointAccessType = /*@__PURE__*/ S.String;

export type CustomerOwnedIpv4Pool = string;
export interface CreateEndpointRequest {
  OutpostId: string;
  SubnetId: string;
  SecurityGroupId: string;
  AccessType?: EndpointAccessType;
  CustomerOwnedIpv4Pool?: string;
}
export const CreateEndpointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OutpostId: S.String,
    SubnetId: S.String,
    SecurityGroupId: S.String,
    AccessType: S.optional(EndpointAccessType),
    CustomerOwnedIpv4Pool: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/S3Outposts/CreateEndpoint" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateEndpointRequest",
}) as any as S.Schema<CreateEndpointRequest>;
export type EndpointArn = string;
export interface CreateEndpointResult {
  EndpointArn?: string;
}
export const CreateEndpointResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EndpointArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateEndpointResult",
}) as any as S.Schema<CreateEndpointResult>;
export type EndpointId = string;
export interface DeleteEndpointRequest {
  EndpointId: string;
  OutpostId: string;
}
export const DeleteEndpointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EndpointId: S.String.pipe(T.HttpQuery("endpointId")),
    OutpostId: S.String.pipe(T.HttpQuery("outpostId")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/S3Outposts/DeleteEndpoint" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteEndpointRequest",
}) as any as S.Schema<DeleteEndpointRequest>;
export interface DeleteEndpointResponse {}
export const DeleteEndpointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteEndpointResponse",
}) as any as S.Schema<DeleteEndpointResponse>;
export type NextToken = string;
export type MaxResults = number;
export interface ListEndpointsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListEndpointsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/S3Outposts/ListEndpoints" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListEndpointsRequest",
}) as any as S.Schema<ListEndpointsRequest>;
export type CidrBlock = string;
export type EndpointStatus =
  | "Pending"
  | "Available"
  | "Deleting"
  | "Create_Failed"
  | "Delete_Failed"
  | (string & {});
export const EndpointStatus = /*@__PURE__*/ S.String;

export type CreationTime = Date;
export type NetworkInterfaceId = string;
export interface NetworkInterface {
  NetworkInterfaceId?: string;
}
export const NetworkInterface = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ NetworkInterfaceId: S.optional(S.String) }),
).annotate({
  identifier: "NetworkInterface",
}) as any as S.Schema<NetworkInterface>;
export type NetworkInterfaces = NetworkInterface[];
export const NetworkInterfaces = /*@__PURE__*/ S.Array(NetworkInterface);
export type VpcId = string;
export type ErrorCode = string;
export type Message = string;
export interface FailedReason {
  ErrorCode?: string;
  Message?: string;
}
export const FailedReason = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ErrorCode: S.optional(S.String), Message: S.optional(S.String) }),
).annotate({ identifier: "FailedReason" }) as any as S.Schema<FailedReason>;
export interface Endpoint {
  EndpointArn?: string;
  OutpostsId?: string;
  CidrBlock?: string;
  Status?: EndpointStatus;
  CreationTime?: Date;
  NetworkInterfaces?: NetworkInterface[];
  VpcId?: string;
  SubnetId?: string;
  SecurityGroupId?: string;
  AccessType?: EndpointAccessType;
  CustomerOwnedIpv4Pool?: string;
  FailedReason?: FailedReason;
}
export const Endpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EndpointArn: S.optional(S.String),
    OutpostsId: S.optional(S.String),
    CidrBlock: S.optional(S.String),
    Status: S.optional(EndpointStatus),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    NetworkInterfaces: S.optional(NetworkInterfaces),
    VpcId: S.optional(S.String),
    SubnetId: S.optional(S.String),
    SecurityGroupId: S.optional(S.String),
    AccessType: S.optional(EndpointAccessType),
    CustomerOwnedIpv4Pool: S.optional(S.String),
    FailedReason: S.optional(FailedReason),
  }),
).annotate({ identifier: "Endpoint" }) as any as S.Schema<Endpoint>;
export type Endpoints = Endpoint[];
export const Endpoints = /*@__PURE__*/ S.Array(Endpoint);
export interface ListEndpointsResult {
  Endpoints?: Endpoint[];
  NextToken?: string;
}
export const ListEndpointsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Endpoints: S.optional(Endpoints),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListEndpointsResult",
}) as any as S.Schema<ListEndpointsResult>;
export interface ListOutpostsWithS3Request {
  NextToken?: string;
  MaxResults?: number;
}
export const ListOutpostsWithS3Request = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/S3Outposts/ListOutpostsWithS3" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListOutpostsWithS3Request",
}) as any as S.Schema<ListOutpostsWithS3Request>;
export type OutpostArn = string;
export type S3OutpostArn = string;
export type AwsAccountId = string;
export type CapacityInBytes = number;
export interface Outpost {
  OutpostArn?: string;
  S3OutpostArn?: string;
  OutpostId?: string;
  OwnerId?: string;
  CapacityInBytes?: number;
}
export const Outpost = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OutpostArn: S.optional(S.String),
    S3OutpostArn: S.optional(S.String),
    OutpostId: S.optional(S.String),
    OwnerId: S.optional(S.String),
    CapacityInBytes: S.optional(S.Number),
  }),
).annotate({ identifier: "Outpost" }) as any as S.Schema<Outpost>;
export type Outposts = Outpost[];
export const Outposts = /*@__PURE__*/ S.Array(Outpost);
export interface ListOutpostsWithS3Result {
  Outposts?: Outpost[];
  NextToken?: string;
}
export const ListOutpostsWithS3Result = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Outposts: S.optional(Outposts), NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListOutpostsWithS3Result",
}) as any as S.Schema<ListOutpostsWithS3Result>;
export interface ListSharedEndpointsRequest {
  NextToken?: string;
  MaxResults?: number;
  OutpostId: string;
}
export const ListSharedEndpointsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    OutpostId: S.String.pipe(T.HttpQuery("outpostId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/S3Outposts/ListSharedEndpoints" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSharedEndpointsRequest",
}) as any as S.Schema<ListSharedEndpointsRequest>;
export interface ListSharedEndpointsResult {
  Endpoints?: Endpoint[];
  NextToken?: string;
}
export const ListSharedEndpointsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Endpoints: S.optional(Endpoints),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSharedEndpointsResult",
}) as any as S.Schema<ListSharedEndpointsResult>;
export type ErrorMessage = string;
export type CreateEndpointError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | OutpostOfflineException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an endpoint and associates it with the specified Outpost.
 *
 * It can take up to 5 minutes for this action to finish.
 *
 * Related actions include:
 *
 * - DeleteEndpoint
 *
 * - ListEndpoints
 */
export const createEndpoint: API.OperationMethod<
  CreateEndpointRequest,
  CreateEndpointResult,
  CreateEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateEndpointRequest,
  output: CreateEndpointResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    OutpostOfflineException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEndpoint",
}));

export type DeleteEndpointError =
  | AccessDeniedException
  | InternalServerException
  | OutpostOfflineException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an endpoint.
 *
 * It can take up to 5 minutes for this action to finish.
 *
 * Related actions include:
 *
 * - CreateEndpoint
 *
 * - ListEndpoints
 */
export const deleteEndpoint: API.OperationMethod<
  DeleteEndpointRequest,
  DeleteEndpointResponse,
  DeleteEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEndpointRequest,
  output: DeleteEndpointResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    OutpostOfflineException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEndpoint",
}));

export type ListEndpointsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists endpoints associated with the specified Outpost.
 *
 * Related actions include:
 *
 * - CreateEndpoint
 *
 * - DeleteEndpoint
 */
export const listEndpoints: API.PaginatedOperationMethod<
  ListEndpointsRequest,
  ListEndpointsResult,
  ListEndpointsError,
  Credentials | HttpClient.HttpClient,
  Endpoint
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEndpointsRequest,
  output: ListEndpointsResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEndpoints",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Endpoints",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListOutpostsWithS3Error =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the Outposts with S3 on Outposts capacity for your Amazon Web Services account.
 * Includes S3 on Outposts that you have access to as the Outposts owner, or as a shared user
 * from Resource Access Manager (RAM).
 */
export const listOutpostsWithS3: API.PaginatedOperationMethod<
  ListOutpostsWithS3Request,
  ListOutpostsWithS3Result,
  ListOutpostsWithS3Error,
  Credentials | HttpClient.HttpClient,
  Outpost
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListOutpostsWithS3Request,
  output: ListOutpostsWithS3Result,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOutpostsWithS3",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Outposts",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSharedEndpointsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all endpoints associated with an Outpost that has been shared by Amazon Web Services Resource Access Manager (RAM).
 *
 * Related actions include:
 *
 * - CreateEndpoint
 *
 * - DeleteEndpoint
 */
export const listSharedEndpoints: API.PaginatedOperationMethod<
  ListSharedEndpointsRequest,
  ListSharedEndpointsResult,
  ListSharedEndpointsError,
  Credentials | HttpClient.HttpClient,
  Endpoint
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSharedEndpointsRequest,
  output: ListSharedEndpointsResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSharedEndpoints",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Endpoints",
    pageSize: "MaxResults",
  } as const,
})) as any;
