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
  sdkId: "Route53 Recovery Cluster",
  serviceShapeName: "ToggleCustomerAPI",
});
const auth = T.AwsAuthSigv4({ name: "route53-recovery-cluster" });
const ver = T.ServiceVersion("2019-12-02");
const proto = T.AwsProtocolsAwsJson1_0();
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
              `https://route53-recovery-cluster-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://route53-recovery-cluster-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://route53-recovery-cluster.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://route53-recovery-cluster.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class EndpointTemporarilyUnavailableException
  extends /*@__PURE__*/ S.TaggedError<EndpointTemporarilyUnavailableException>()(
    "EndpointTemporarilyUnavailableException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(503),
  ).pipe(C.withServerError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
    },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceLimitExceededException>()(
    "ServiceLimitExceededException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.optional(S.String),
      resourceType: S.optional(S.String),
      limitCode: S.String,
      serviceCode: S.String,
    },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
    },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      reason: S.optional(
        S.suspend(() => ValidationExceptionReason).annotate({
          identifier: "ValidationExceptionReason",
        }),
      ),
      fields: S.optional(
        S.suspend(() => ValidationExceptionFieldList).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type Arn = string;
export interface GetRoutingControlStateRequest {
  RoutingControlArn: string;
}
export const GetRoutingControlStateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RoutingControlArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetRoutingControlStateRequest",
}) as any as S.Schema<GetRoutingControlStateRequest>;
export type RoutingControlState = "On" | "Off" | (string & {});
export const RoutingControlState = /*@__PURE__*/ S.String;

export type RoutingControlName = string;
export interface GetRoutingControlStateResponse {
  RoutingControlArn: string;
  RoutingControlState: RoutingControlState;
  RoutingControlName?: string;
}
export const GetRoutingControlStateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RoutingControlArn: S.String,
    RoutingControlState: RoutingControlState,
    RoutingControlName: S.optional(S.String),
  }),
).annotate({
  identifier: "GetRoutingControlStateResponse",
}) as any as S.Schema<GetRoutingControlStateResponse>;
export type PageToken = string;
export type MaxResults = number;
export interface ListRoutingControlsRequest {
  ControlPanelArn?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListRoutingControlsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ControlPanelArn: S.optional(S.String),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListRoutingControlsRequest",
}) as any as S.Schema<ListRoutingControlsRequest>;
export type ControlPanelName = string;
export type Owner = string;
export interface RoutingControl {
  ControlPanelArn?: string;
  ControlPanelName?: string;
  RoutingControlArn?: string;
  RoutingControlName?: string;
  RoutingControlState?: RoutingControlState;
  Owner?: string;
}
export const RoutingControl = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ControlPanelArn: S.optional(S.String),
    ControlPanelName: S.optional(S.String),
    RoutingControlArn: S.optional(S.String),
    RoutingControlName: S.optional(S.String),
    RoutingControlState: S.optional(RoutingControlState),
    Owner: S.optional(S.String),
  }),
).annotate({ identifier: "RoutingControl" }) as any as S.Schema<RoutingControl>;
export type RoutingControls = RoutingControl[];
export const RoutingControls = /*@__PURE__*/ S.Array(RoutingControl);
export interface ListRoutingControlsResponse {
  RoutingControls: RoutingControl[];
  NextToken?: string;
}
export const ListRoutingControlsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RoutingControls: RoutingControls,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListRoutingControlsResponse",
}) as any as S.Schema<ListRoutingControlsResponse>;
export type Arns = string[];
export const Arns = /*@__PURE__*/ S.Array(S.String);
export interface UpdateRoutingControlStateRequest {
  RoutingControlArn: string;
  RoutingControlState: RoutingControlState;
  SafetyRulesToOverride?: string[];
}
export const UpdateRoutingControlStateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RoutingControlArn: S.String,
    RoutingControlState: RoutingControlState,
    SafetyRulesToOverride: S.optional(Arns),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateRoutingControlStateRequest",
}) as any as S.Schema<UpdateRoutingControlStateRequest>;
export interface UpdateRoutingControlStateResponse {}
export const UpdateRoutingControlStateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateRoutingControlStateResponse",
}) as any as S.Schema<UpdateRoutingControlStateResponse>;
export interface UpdateRoutingControlStateEntry {
  RoutingControlArn: string;
  RoutingControlState: RoutingControlState;
}
export const UpdateRoutingControlStateEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RoutingControlArn: S.String,
    RoutingControlState: RoutingControlState,
  }),
).annotate({
  identifier: "UpdateRoutingControlStateEntry",
}) as any as S.Schema<UpdateRoutingControlStateEntry>;
export type UpdateRoutingControlStateEntries = UpdateRoutingControlStateEntry[];
export const UpdateRoutingControlStateEntries = /*@__PURE__*/ S.Array(
  UpdateRoutingControlStateEntry,
);
export interface UpdateRoutingControlStatesRequest {
  UpdateRoutingControlStateEntries: UpdateRoutingControlStateEntry[];
  SafetyRulesToOverride?: string[];
}
export const UpdateRoutingControlStatesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UpdateRoutingControlStateEntries: UpdateRoutingControlStateEntries,
    SafetyRulesToOverride: S.optional(Arns),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateRoutingControlStatesRequest",
}) as any as S.Schema<UpdateRoutingControlStatesRequest>;
export interface UpdateRoutingControlStatesResponse {}
export const UpdateRoutingControlStatesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateRoutingControlStatesResponse",
}) as any as S.Schema<UpdateRoutingControlStatesResponse>;
export type RetryAfterSeconds = number;
export type ValidationExceptionReason =
  | "unknownOperation"
  | "cannotParse"
  | "fieldValidationFailed"
  | "other"
  | (string & {});
export const ValidationExceptionReason = /*@__PURE__*/ S.String;

export interface ValidationExceptionField {
  name: string;
  message: string;
}
export const ValidationExceptionField = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, message: S.String }),
).annotate({
  identifier: "ValidationExceptionField",
}) as any as S.Schema<ValidationExceptionField>;
export type ValidationExceptionFieldList = ValidationExceptionField[];
export const ValidationExceptionFieldList = /*@__PURE__*/ S.Array(
  ValidationExceptionField,
);
export type GetRoutingControlStateError =
  | AccessDeniedException
  | EndpointTemporarilyUnavailableException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get the state for a routing control. A routing control is a simple on/off switch that you
 * can use to route traffic to cells. When a routing control state is set to ON, traffic flows to a cell. When
 * the state is set to OFF, traffic does not flow.
 *
 * Before you can create a routing control, you must first create a cluster, and then host the control
 * in a control panel on the cluster. For more information, see
 * Create routing control structures in the Amazon Route 53 Application Recovery Controller Developer Guide.
 * You access one of the endpoints for the cluster to get or update the routing control state to
 * redirect traffic for your application.
 *
 * You must specify Regional endpoints when you work with API cluster operations
 * to get or update routing control states in Route 53 ARC.
 *
 * To see a code example for getting a routing control state, including accessing Regional cluster endpoints
 * in sequence, see API examples
 * in the Amazon Route 53 Application Recovery Controller Developer Guide.
 *
 * Learn more about working with routing controls in the following topics in the
 * Amazon Route 53 Application Recovery Controller Developer Guide:
 *
 * -
 * Viewing and updating routing control states
 *
 * - Working with
 * routing controls in Route 53 ARC
 */
export const getRoutingControlState: API.OperationMethod<
  GetRoutingControlStateRequest,
  GetRoutingControlStateResponse,
  GetRoutingControlStateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRoutingControlStateRequest,
  output: GetRoutingControlStateResponse,
  errors: [
    AccessDeniedException,
    EndpointTemporarilyUnavailableException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRoutingControlState",
}));

export type ListRoutingControlsError =
  | AccessDeniedException
  | EndpointTemporarilyUnavailableException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List routing control names and Amazon Resource Names (ARNs), as well as the routing control
 * state for each routing control, along with the control panel name and control panel ARN for the routing controls.
 * If you specify a control panel ARN, this call lists the routing controls in the control panel. Otherwise, it lists
 * all the routing controls in the cluster.
 *
 * A routing control is a simple on/off switch in Route 53 ARC that you
 * can use to route traffic to cells. When a routing control state is set to ON, traffic flows to a cell. When
 * the state is set to OFF, traffic does not flow.
 *
 * Before you can create a routing control, you must first create a cluster, and then host the control
 * in a control panel on the cluster. For more information, see
 * Create routing control structures in the Amazon Route 53 Application Recovery Controller Developer Guide.
 * You access one of the endpoints for the cluster to get or update the routing control state to
 * redirect traffic for your application.
 *
 * You must specify Regional endpoints when you work with API cluster operations
 * to use this API operation to list routing controls in Route 53 ARC.
 *
 * Learn more about working with routing controls in the following topics in the
 * Amazon Route 53 Application Recovery Controller Developer Guide:
 *
 * -
 * Viewing and updating routing control states
 *
 * - Working with
 * routing controls in Route 53 ARC
 */
export const listRoutingControls: API.PaginatedOperationMethod<
  ListRoutingControlsRequest,
  ListRoutingControlsResponse,
  ListRoutingControlsError,
  Credentials | HttpClient.HttpClient,
  RoutingControl
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRoutingControlsRequest,
  output: ListRoutingControlsResponse,
  errors: [
    AccessDeniedException,
    EndpointTemporarilyUnavailableException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRoutingControls",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RoutingControls",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type UpdateRoutingControlStateError =
  | AccessDeniedException
  | ConflictException
  | EndpointTemporarilyUnavailableException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Set the state of the routing control to reroute traffic. You can set the value to ON or
 * OFF. When the state is ON, traffic flows to a cell. When the state is OFF, traffic does not
 * flow.
 *
 * With Route 53 ARC, you can add safety rules for routing controls, which are safeguards for routing
 * control state updates that help prevent unexpected outcomes, like fail open traffic routing. However,
 * there are scenarios when you might want to bypass the routing control safeguards that are enforced with
 * safety rules that you've configured. For example, you might want to fail over quickly for disaster recovery,
 * and one or more safety rules might be unexpectedly preventing you from updating a routing control state to
 * reroute traffic. In a "break glass" scenario like this, you can override one or more safety rules to change
 * a routing control state and fail over your application.
 *
 * The `SafetyRulesToOverride` property enables you override one or more safety rules and
 * update routing control states. For more information, see
 *
 * Override safety rules to reroute traffic in the Amazon Route 53 Application Recovery Controller Developer Guide.
 *
 * You must specify Regional endpoints when you work with API cluster operations
 * to get or update routing control states in Route 53 ARC.
 *
 * To see a code example for getting a routing control state, including accessing Regional cluster endpoints
 * in sequence, see API examples
 * in the Amazon Route 53 Application Recovery Controller Developer Guide.
 *
 * -
 * Viewing and updating routing control states
 *
 * - Working with routing controls overall
 */
export const updateRoutingControlState: API.OperationMethod<
  UpdateRoutingControlStateRequest,
  UpdateRoutingControlStateResponse,
  UpdateRoutingControlStateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRoutingControlStateRequest,
  output: UpdateRoutingControlStateResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    EndpointTemporarilyUnavailableException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRoutingControlState",
}));

export type UpdateRoutingControlStatesError =
  | AccessDeniedException
  | ConflictException
  | EndpointTemporarilyUnavailableException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceLimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Set multiple routing control states. You can set the value for each state to be ON or OFF.
 * When the state is ON, traffic flows to a cell. When it's OFF, traffic does not
 * flow.
 *
 * With Route 53 ARC, you can add safety rules for routing controls, which are safeguards for routing
 * control state updates that help prevent unexpected outcomes, like fail open traffic routing. However,
 * there are scenarios when you might want to bypass the routing control safeguards that are enforced with
 * safety rules that you've configured. For example, you might want to fail over quickly for disaster recovery,
 * and one or more safety rules might be unexpectedly preventing you from updating a routing control state to
 * reroute traffic. In a "break glass" scenario like this, you can override one or more safety rules to change
 * a routing control state and fail over your application.
 *
 * The `SafetyRulesToOverride` property enables you override one or more safety rules and
 * update routing control states. For more information, see
 *
 * Override safety rules to reroute traffic in the Amazon Route 53 Application Recovery Controller Developer Guide.
 *
 * You must specify Regional endpoints when you work with API cluster operations
 * to get or update routing control states in Route 53 ARC.
 *
 * To see a code example for getting a routing control state, including accessing Regional cluster endpoints
 * in sequence, see API examples
 * in the Amazon Route 53 Application Recovery Controller Developer Guide.
 *
 * -
 * Viewing and updating routing control states
 *
 * - Working with routing controls overall
 */
export const updateRoutingControlStates: API.OperationMethod<
  UpdateRoutingControlStatesRequest,
  UpdateRoutingControlStatesResponse,
  UpdateRoutingControlStatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRoutingControlStatesRequest,
  output: UpdateRoutingControlStatesResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    EndpointTemporarilyUnavailableException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceLimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRoutingControlStates",
}));
