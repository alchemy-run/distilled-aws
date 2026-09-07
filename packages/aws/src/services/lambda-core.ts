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
  sdkId: "Lambda Core",
  serviceShapeName: "LambdaCoreApiService",
});
const auth = T.AwsAuthSigv4({ name: "lambda" });
const ver = T.ServiceVersion("2026-04-30");
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
              `https://lambda-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://lambda-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://lambda.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://lambda.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class InvalidParameterValueException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterValueException>()(
    "InvalidParameterValueException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class NetworkConnectorLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<NetworkConnectorLimitExceededException>()(
    "NetworkConnectorLimitExceededException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceConflictException
  extends /*@__PURE__*/ S.TaggedError<ResourceConflictException>()(
    "ResourceConflictException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceException
  extends /*@__PURE__*/ S.TaggedError<ServiceException>()(
    "ServiceException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    {
      retryAfterSeconds: S.optional(S.String).pipe(T.HttpHeader("Retry-After")),
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Reason: S.optional(
        S.suspend(() => ThrottleReason).annotate({
          identifier: "ThrottleReason",
        }),
      ),
    },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export type NetworkConnectorName = string;
export type NetworkConnectorSubnetId = string;
export type NetworkConnectorSubnetIds = string[];
export const NetworkConnectorSubnetIds = /*@__PURE__*/ S.Array(S.String);
export type NetworkConnectorSecurityGroupId = string;
export type NetworkConnectorSecurityGroupIds = string[];
export const NetworkConnectorSecurityGroupIds = /*@__PURE__*/ S.Array(S.String);
export type NetworkProtocol = "IPv4" | "DualStack" | (string & {});
export const NetworkProtocol = /*@__PURE__*/ S.String;

export type ComputeResourceType = "MicroVm" | (string & {});
export const ComputeResourceType = /*@__PURE__*/ S.String;

export type AssociatedComputeResourceTypesList = ComputeResourceType[];
export const AssociatedComputeResourceTypesList =
  /*@__PURE__*/ S.Array(ComputeResourceType);
export interface NetworkConnectorVpcEgressConfiguration {
  SubnetIds?: string[];
  SecurityGroupIds?: string[];
  NetworkProtocol?: NetworkProtocol;
  AssociatedComputeResourceTypes?: ComputeResourceType[];
}
export const NetworkConnectorVpcEgressConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      SubnetIds: S.optional(NetworkConnectorSubnetIds),
      SecurityGroupIds: S.optional(NetworkConnectorSecurityGroupIds),
      NetworkProtocol: S.optional(NetworkProtocol),
      AssociatedComputeResourceTypes: S.optional(
        AssociatedComputeResourceTypesList,
      ),
    }),
).annotate({
  identifier: "NetworkConnectorVpcEgressConfiguration",
}) as any as S.Schema<NetworkConnectorVpcEgressConfiguration>;
export type NetworkConnectorConfiguration = {
  VpcEgressConfiguration: NetworkConnectorVpcEgressConfiguration;
};
export const NetworkConnectorConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ VpcEgressConfiguration: NetworkConnectorVpcEgressConfiguration }),
]);
export type NetworkConnectorRoleArn = string;
export type ClientTokenString = string;
export type NetworkConnectorTagKey = string;
export type NetworkConnectorTagValue = string;
export type NetworkConnectorTags = { [key: string]: string | undefined };
export const NetworkConnectorTags = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateNetworkConnectorRequest {
  Name: string;
  Configuration: NetworkConnectorConfiguration;
  OperatorRole?: string;
  ClientToken?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateNetworkConnectorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Configuration: NetworkConnectorConfiguration,
    OperatorRole: S.optional(S.String),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    Tags: S.optional(NetworkConnectorTags),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/2026-04-04/network-connectors" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateNetworkConnectorRequest",
}) as any as S.Schema<CreateNetworkConnectorRequest>;
export type NetworkConnectorArn = string;
export type NetworkConnectorId = string;
export type NetworkConnectorState =
  | "PENDING"
  | "ACTIVE"
  | "INACTIVE"
  | "FAILED"
  | "DELETING"
  | "DELETE_FAILED"
  | (string & {});
export const NetworkConnectorState = /*@__PURE__*/ S.String;

export interface CreateNetworkConnectorResponse {
  Arn: string;
  Name: string;
  Id: string;
  Configuration?: NetworkConnectorConfiguration;
  OperatorRole?: string;
  State?: NetworkConnectorState;
}
export const CreateNetworkConnectorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    Name: S.String,
    Id: S.String,
    Configuration: S.optional(NetworkConnectorConfiguration),
    OperatorRole: S.optional(S.String),
    State: S.optional(NetworkConnectorState),
  }),
).annotate({
  identifier: "CreateNetworkConnectorResponse",
}) as any as S.Schema<CreateNetworkConnectorResponse>;
export type NetworkConnectorIdentifier = string;
export interface DeleteNetworkConnectorRequest {
  Identifier: string;
}
export const DeleteNetworkConnectorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/2026-04-04/network-connectors/{Identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteNetworkConnectorRequest",
}) as any as S.Schema<DeleteNetworkConnectorRequest>;
export interface DeleteNetworkConnectorResponse {
  Arn: string;
  Name: string;
  Id: string;
  Configuration?: NetworkConnectorConfiguration;
  OperatorRole?: string;
  State?: NetworkConnectorState;
}
export const DeleteNetworkConnectorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    Name: S.String,
    Id: S.String,
    Configuration: S.optional(NetworkConnectorConfiguration),
    OperatorRole: S.optional(S.String),
    State: S.optional(NetworkConnectorState),
  }),
).annotate({
  identifier: "DeleteNetworkConnectorResponse",
}) as any as S.Schema<DeleteNetworkConnectorResponse>;
export interface GetNetworkConnectorRequest {
  Identifier: string;
}
export const GetNetworkConnectorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2026-04-04/network-connectors/{Identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetNetworkConnectorRequest",
}) as any as S.Schema<GetNetworkConnectorRequest>;
export type NetworkConnectorVersion = number;
export type NetworkConnectorStateReasonCode =
  | "DisallowedByVpcEncryptionControl"
  | "Ec2RequestLimitExceeded"
  | "InsufficientRolePermissions"
  | "InternalError"
  | "InvalidSecurityGroup"
  | "InvalidSubnet"
  | "SubnetOutOfIPAddresses"
  | (string & {});
export const NetworkConnectorStateReasonCode = /*@__PURE__*/ S.String;

export type NetworkConnectorLastUpdateStatus =
  | "Successful"
  | "Failed"
  | "InProgress"
  | (string & {});
export const NetworkConnectorLastUpdateStatus = /*@__PURE__*/ S.String;

export type NetworkConnectorLastUpdateStatusReason = string;
export type NetworkConnectorLastUpdateStatusReasonCode =
  | "DisallowedByVpcEncryptionControl"
  | "Ec2RequestLimitExceeded"
  | "InsufficientRolePermissions"
  | "InternalError"
  | "InvalidSecurityGroup"
  | "InvalidSubnet"
  | "SubnetOutOfIPAddresses"
  | (string & {});
export const NetworkConnectorLastUpdateStatusReasonCode =
  /*@__PURE__*/ S.String;

export type CoreTimestamp = Date;
export interface GetNetworkConnectorResponse {
  Arn: string;
  Name: string;
  Id: string;
  Version?: number;
  Configuration?: NetworkConnectorConfiguration;
  OperatorRole?: string;
  State?: NetworkConnectorState;
  StateReason?: string;
  StateReasonCode?: NetworkConnectorStateReasonCode;
  LastUpdateStatus?: NetworkConnectorLastUpdateStatus;
  LastUpdateStatusReason?: string;
  LastUpdateStatusReasonCode?: NetworkConnectorLastUpdateStatusReasonCode;
  LastModified?: Date;
}
export const GetNetworkConnectorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    Name: S.String,
    Id: S.String,
    Version: S.optional(S.Number),
    Configuration: S.optional(NetworkConnectorConfiguration),
    OperatorRole: S.optional(S.String),
    State: S.optional(NetworkConnectorState),
    StateReason: S.optional(S.String),
    StateReasonCode: S.optional(NetworkConnectorStateReasonCode),
    LastUpdateStatus: S.optional(NetworkConnectorLastUpdateStatus),
    LastUpdateStatusReason: S.optional(S.String),
    LastUpdateStatusReasonCode: S.optional(
      NetworkConnectorLastUpdateStatusReasonCode,
    ),
    LastModified: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "GetNetworkConnectorResponse",
}) as any as S.Schema<GetNetworkConnectorResponse>;
export type MaxHundredListItems = number;
export interface ListNetworkConnectorsRequest {
  State?: NetworkConnectorState;
  Marker?: string;
  MaxItems?: number;
}
export const ListNetworkConnectorsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    State: S.optional(NetworkConnectorState).pipe(T.HttpQuery("State")),
    Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
    MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/2026-04-04/network-connectors" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListNetworkConnectorsRequest",
}) as any as S.Schema<ListNetworkConnectorsRequest>;
export type NetworkConnectorType = "VPC_EGRESS" | (string & {});
export const NetworkConnectorType = /*@__PURE__*/ S.String;

export interface NetworkConnectorSummary {
  Arn: string;
  Name: string;
  Id: string;
  Type: NetworkConnectorType;
  State?: NetworkConnectorState;
  LastModified?: Date;
}
export const NetworkConnectorSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    Name: S.String,
    Id: S.String,
    Type: NetworkConnectorType,
    State: S.optional(NetworkConnectorState),
    LastModified: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "NetworkConnectorSummary",
}) as any as S.Schema<NetworkConnectorSummary>;
export type NetworkConnectorsList = NetworkConnectorSummary[];
export const NetworkConnectorsList = /*@__PURE__*/ S.Array(
  NetworkConnectorSummary,
);
export interface ListNetworkConnectorsResponse {
  NetworkConnectors: NetworkConnectorSummary[];
  NextMarker?: string;
}
export const ListNetworkConnectorsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NetworkConnectors: NetworkConnectorsList,
    NextMarker: S.optional(S.String),
  }),
).annotate({
  identifier: "ListNetworkConnectorsResponse",
}) as any as S.Schema<ListNetworkConnectorsResponse>;
export interface UpdateNetworkConnectorRequest {
  Identifier: string;
  Configuration?: NetworkConnectorConfiguration;
  OperatorRole?: string;
  ClientToken?: string;
}
export const UpdateNetworkConnectorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Identifier: S.String.pipe(T.HttpLabel("Identifier")),
    Configuration: S.optional(NetworkConnectorConfiguration),
    OperatorRole: S.optional(S.String),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/2026-04-04/network-connectors/{Identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateNetworkConnectorRequest",
}) as any as S.Schema<UpdateNetworkConnectorRequest>;
export interface UpdateNetworkConnectorResponse {
  Arn: string;
  Name: string;
  Id: string;
  OperatorRole?: string;
  Configuration?: NetworkConnectorConfiguration;
  State?: NetworkConnectorState;
  LastUpdateStatus?: NetworkConnectorLastUpdateStatus;
  LastUpdateStatusReason?: string;
  LastModified?: Date;
}
export const UpdateNetworkConnectorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    Name: S.String,
    Id: S.String,
    OperatorRole: S.optional(S.String),
    Configuration: S.optional(NetworkConnectorConfiguration),
    State: S.optional(NetworkConnectorState),
    LastUpdateStatus: S.optional(NetworkConnectorLastUpdateStatus),
    LastUpdateStatusReason: S.optional(S.String),
    LastModified: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "UpdateNetworkConnectorResponse",
}) as any as S.Schema<UpdateNetworkConnectorResponse>;
export type ThrottleReason =
  | "ConcurrentInvocationLimitExceeded"
  | "FunctionInvocationRateLimitExceeded"
  | "ReservedFunctionConcurrentInvocationLimitExceeded"
  | "ReservedFunctionInvocationRateLimitExceeded"
  | "CallerRateLimitExceeded"
  | "ConcurrentSnapshotCreateLimitExceeded"
  | (string & {});
export const ThrottleReason = /*@__PURE__*/ S.String;

export type CreateNetworkConnectorError =
  | InvalidParameterValueException
  | NetworkConnectorLimitExceededException
  | ResourceConflictException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a network connector that enables Lambda compute resources to route outbound traffic through your Amazon VPC. The network connector provisions elastic network interfaces (ENIs) in the subnets you specify, providing a managed network path to private resources such as databases, caches, and internal APIs.
 *
 * This operation is asynchronous. The network connector starts in `PENDING` state while ENIs are provisioned in your VPC (provisioning typically takes up to 10 minutes). Use `GetNetworkConnector` to poll the connector state until it reaches `ACTIVE`. Once active, you can attach the connector to Lambda MicroVMs at run time using the `egressNetworkConnectors` parameter on `RunMicroVm`.
 *
 * This operation is idempotent when you provide a `ClientToken` — if you retry a request that completed successfully using the same client token, the operation returns the existing connector without creating a duplicate.
 */
export const createNetworkConnector: API.OperationMethod<
  CreateNetworkConnectorRequest,
  CreateNetworkConnectorResponse,
  CreateNetworkConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateNetworkConnectorRequest,
  output: CreateNetworkConnectorResponse,
  errors: [
    InvalidParameterValueException,
    NetworkConnectorLimitExceededException,
    ResourceConflictException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateNetworkConnector",
}));

export type DeleteNetworkConnectorError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Initiates deletion of a network connector. The connector transitions to `DELETING` state while elastic network interfaces are cleaned up asynchronously. After deletion completes, subsequent calls to `GetNetworkConnector` return `ResourceNotFoundException`.
 *
 * This operation is idempotent — calling delete on a connector that is already deleting or has been deleted succeeds without error. You can delete connectors in `ACTIVE` or `FAILED` states. Before deleting a connector, ensure that no Lambda MicroVMs are using it, as they will lose VPC egress connectivity immediately.
 */
export const deleteNetworkConnector: API.OperationMethod<
  DeleteNetworkConnectorRequest,
  DeleteNetworkConnectorResponse,
  DeleteNetworkConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteNetworkConnectorRequest,
  output: DeleteNetworkConnectorResponse,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNetworkConnector",
}));

export type GetNetworkConnectorError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the current configuration, state, and metadata of a network connector. The `Identifier` parameter accepts the connector ID, name, or full ARN. Use this operation to poll connector state after creation or update, or to inspect the current VPC configuration and any failure reasons.
 *
 * The response includes the full connector configuration, current state, and — if the connector has been updated — the `LastUpdateStatus` and `LastUpdateStatusReasonCode` fields that indicate whether the most recent update succeeded or failed.
 */
export const getNetworkConnector: API.OperationMethod<
  GetNetworkConnectorRequest,
  GetNetworkConnectorResponse,
  GetNetworkConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetNetworkConnectorRequest,
  output: GetNetworkConnectorResponse,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNetworkConnector",
}));

export type ListNetworkConnectorsError =
  | InvalidParameterValueException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a paginated list of network connectors in your account for the current Region. You can optionally filter results by connector state. Use the `Marker` parameter from a previous response to retrieve the next page of results.
 *
 * Each item in the response includes the connector ARN, name, ID, type, current state, and last modified timestamp. To retrieve full configuration details for a specific connector, use `GetNetworkConnector`.
 */
export const listNetworkConnectors: API.PaginatedOperationMethod<
  ListNetworkConnectorsRequest,
  ListNetworkConnectorsResponse,
  ListNetworkConnectorsError,
  Credentials | HttpClient.HttpClient,
  NetworkConnectorSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListNetworkConnectorsRequest,
  output: ListNetworkConnectorsResponse,
  errors: [
    InvalidParameterValueException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNetworkConnectors",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "NetworkConnectors",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type UpdateNetworkConnectorError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the VPC configuration or operator role of an existing network connector. You can modify the subnet IDs, security group IDs, network protocol, or operator role. The connector must be in `ACTIVE` state to accept updates.
 *
 * This operation is asynchronous. The connector remains in `ACTIVE` state during the update — existing workloads that reference this connector are not disrupted. Use `GetNetworkConnector` to monitor the `LastUpdateStatus` field, which transitions through `InProgress` to `Successful` or `Failed`. If the update fails, the `LastUpdateStatusReasonCode` field provides a specific error code for troubleshooting. This operation is idempotent when you provide a `ClientToken`.
 */
export const updateNetworkConnector: API.OperationMethod<
  UpdateNetworkConnectorRequest,
  UpdateNetworkConnectorResponse,
  UpdateNetworkConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateNetworkConnectorRequest,
  output: UpdateNetworkConnectorResponse,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNetworkConnector",
}));
