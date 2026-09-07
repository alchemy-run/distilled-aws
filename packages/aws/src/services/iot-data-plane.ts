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
  sdkId: "IoT Data Plane",
  serviceShapeName: "IotMoonrakerService",
});
const auth = T.AwsAuthSigv4({ name: "iotdata" });
const ver = T.ServiceVersion("2015-05-28");
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
              `https://data-ats.iot-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (Region === "ca-central-1") {
              return e("https://data.iot-fips.ca-central-1.amazonaws.com");
            }
            if (Region === "us-east-1") {
              return e("https://data.iot-fips.us-east-1.amazonaws.com");
            }
            if (Region === "us-east-2") {
              return e("https://data.iot-fips.us-east-2.amazonaws.com");
            }
            if (Region === "us-west-1") {
              return e("https://data.iot-fips.us-west-1.amazonaws.com");
            }
            if (Region === "us-west-2") {
              return e("https://data.iot-fips.us-west-2.amazonaws.com");
            }
            if (Region === "us-gov-east-1") {
              return e("https://data.iot-fips.us-gov-east-1.amazonaws.com");
            }
            if (Region === "us-gov-west-1") {
              return e("https://data.iot-fips.us-gov-west-1.amazonaws.com");
            }
            return e(
              `https://data-ats.iot-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://data-ats.iot.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        if (Region === "cn-north-1") {
          return e("https://data.ats.iot.cn-north-1.amazonaws.com.cn");
        }
        if ("aws" === _.getAttr(PartitionResult, "name")) {
          return e(`https://data-ats.iot.${Region}.amazonaws.com`);
        }
        if ("aws-cn" === _.getAttr(PartitionResult, "name")) {
          return e(`https://data-ats.iot.${Region}.amazonaws.com.cn`);
        }
        if ("aws-us-gov" === _.getAttr(PartitionResult, "name")) {
          return e(`https://data-ats.iot.${Region}.amazonaws.com`);
        }
        return e(
          `https://data-ats.iot.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ForbiddenException
  extends /*@__PURE__*/ S.TaggedError<ForbiddenException>()(
    "ForbiddenException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class GatewayTimeoutException
  extends /*@__PURE__*/ S.TaggedError<GatewayTimeoutException>()(
    "GatewayTimeoutException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(504),
  ).pipe(C.withTimeoutError) {}
export class InternalFailureException
  extends /*@__PURE__*/ S.TaggedError<InternalFailureException>()(
    "InternalFailureException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidRequestException>()(
    "InvalidRequestException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class MethodNotAllowedException
  extends /*@__PURE__*/ S.TaggedError<MethodNotAllowedException>()(
    "MethodNotAllowedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(405),
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
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(503),
  ).pipe(C.withServerError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class UnauthorizedException
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedException>()(
    "UnauthorizedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(401),
  ).pipe(C.withAuthError) {}
export class UnsupportedDocumentEncodingException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedDocumentEncodingException>()(
    "UnsupportedDocumentEncodingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(415),
  ).pipe(C.withBadRequestError) {}
export type ClientId = string;
export type CleanSession = boolean;
export type PreventWillMessage = boolean;
export interface DeleteConnectionRequest {
  clientId: string;
  cleanSession?: boolean;
  preventWillMessage?: boolean;
}
export const DeleteConnectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientId: S.String.pipe(T.HttpLabel("clientId")),
    cleanSession: S.optional(S.Boolean).pipe(T.HttpQuery("cleanSession")),
    preventWillMessage: S.optional(S.Boolean).pipe(
      T.HttpQuery("preventWillMessage"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/connections/{clientId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteConnectionRequest",
}) as any as S.Schema<DeleteConnectionRequest>;
export interface DeleteConnectionResponse {}
export const DeleteConnectionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteConnectionResponse",
}) as any as S.Schema<DeleteConnectionResponse>;
export type ThingName = string;
export type ShadowName = string;
export interface DeleteThingShadowRequest {
  thingName: string;
  shadowName?: string;
}
export const DeleteThingShadowRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingName: S.String.pipe(T.HttpLabel("thingName")),
    shadowName: S.optional(S.String).pipe(T.HttpQuery("name")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/things/{thingName}/shadow" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteThingShadowRequest",
}) as any as S.Schema<DeleteThingShadowRequest>;
export interface DeleteThingShadowResponse {
  payload: T.StreamingOutputBody;
}
export const DeleteThingShadowResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ payload: T.StreamingOutput.pipe(T.HttpPayload()) }),
).annotate({
  identifier: "DeleteThingShadowResponse",
}) as any as S.Schema<DeleteThingShadowResponse>;
export type IncludeSocketInformation = boolean;
export interface GetConnectionRequest {
  clientId: string;
  includeSocketInformation?: boolean;
}
export const GetConnectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientId: S.String.pipe(T.HttpLabel("clientId")),
    includeSocketInformation: S.optional(S.Boolean).pipe(
      T.HttpQuery("includeSocketInformation"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/connections/{clientId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetConnectionRequest",
}) as any as S.Schema<GetConnectionRequest>;
export type Connected = boolean;
export type SourceIp = string;
export type SourcePort = number;
export type TargetIp = string;
export type TargetPort = number;
export type KeepAliveDuration = number;
export type DisconnectReason = string;
export type SessionExpiry = number;
export type VpcEndpointId = string;
export interface GetConnectionResponse {
  connected?: boolean;
  thingName?: string;
  cleanSession?: boolean;
  sourceIp?: string;
  sourcePort?: number;
  targetIp?: string;
  targetPort?: number;
  keepAliveDuration?: number;
  connectedSince?: number;
  disconnectedSince?: number;
  disconnectReason?: string;
  sessionExpiry?: number;
  clientId?: string;
  vpcEndpointId?: string;
}
export const GetConnectionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    connected: S.optional(S.Boolean),
    thingName: S.optional(S.String),
    cleanSession: S.optional(S.Boolean),
    sourceIp: S.optional(S.String),
    sourcePort: S.optional(S.Number),
    targetIp: S.optional(S.String),
    targetPort: S.optional(S.Number),
    keepAliveDuration: S.optional(S.Number),
    connectedSince: S.optional(S.Number),
    disconnectedSince: S.optional(S.Number),
    disconnectReason: S.optional(S.String),
    sessionExpiry: S.optional(S.Number),
    clientId: S.optional(S.String),
    vpcEndpointId: S.optional(S.String),
  }),
).annotate({
  identifier: "GetConnectionResponse",
}) as any as S.Schema<GetConnectionResponse>;
export type Topic = string;
export interface GetRetainedMessageRequest {
  topic: string;
}
export const GetRetainedMessageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ topic: S.String.pipe(T.HttpLabel("topic")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/retainedMessage/{topic}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRetainedMessageRequest",
}) as any as S.Schema<GetRetainedMessageRequest>;
export type Payload = Uint8Array;
export type Qos = number;
export type UserPropertiesBlob = Uint8Array;
export interface GetRetainedMessageResponse {
  topic?: string;
  payload?: Uint8Array;
  qos?: number;
  lastModifiedTime?: number;
  userProperties?: Uint8Array;
}
export const GetRetainedMessageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    topic: S.optional(S.String),
    payload: S.optional(T.Blob),
    qos: S.optional(S.Number),
    lastModifiedTime: S.optional(S.Number),
    userProperties: S.optional(T.Blob),
  }),
).annotate({
  identifier: "GetRetainedMessageResponse",
}) as any as S.Schema<GetRetainedMessageResponse>;
export interface GetThingShadowRequest {
  thingName: string;
  shadowName?: string;
}
export const GetThingShadowRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingName: S.String.pipe(T.HttpLabel("thingName")),
    shadowName: S.optional(S.String).pipe(T.HttpQuery("name")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/things/{thingName}/shadow" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetThingShadowRequest",
}) as any as S.Schema<GetThingShadowRequest>;
export interface GetThingShadowResponse {
  payload?: T.StreamingOutputBody;
}
export const GetThingShadowResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ payload: S.optional(T.StreamingOutput).pipe(T.HttpPayload()) }),
).annotate({
  identifier: "GetThingShadowResponse",
}) as any as S.Schema<GetThingShadowResponse>;
export type NextToken = string;
export type PageSize = number;
export interface ListNamedShadowsForThingRequest {
  thingName: string;
  nextToken?: string;
  pageSize?: number;
}
export const ListNamedShadowsForThingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingName: S.String.pipe(T.HttpLabel("thingName")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    pageSize: S.optional(S.Number).pipe(T.HttpQuery("pageSize")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/api/things/shadow/ListNamedShadowsForThing/{thingName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListNamedShadowsForThingRequest",
}) as any as S.Schema<ListNamedShadowsForThingRequest>;
export type NamedShadowList = string[];
export const NamedShadowList = /*@__PURE__*/ S.Array(S.String);
export interface ListNamedShadowsForThingResponse {
  results?: string[];
  nextToken?: string;
  timestamp?: number;
}
export const ListNamedShadowsForThingResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    results: S.optional(NamedShadowList),
    nextToken: S.optional(S.String),
    timestamp: S.optional(S.Number),
  }),
).annotate({
  identifier: "ListNamedShadowsForThingResponse",
}) as any as S.Schema<ListNamedShadowsForThingResponse>;
export type MaxResults = number;
export interface ListRetainedMessagesRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListRetainedMessagesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/retainedMessage" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListRetainedMessagesRequest",
}) as any as S.Schema<ListRetainedMessagesRequest>;
export type PayloadSize = number;
export interface RetainedMessageSummary {
  topic?: string;
  payloadSize?: number;
  qos?: number;
  lastModifiedTime?: number;
}
export const RetainedMessageSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    topic: S.optional(S.String),
    payloadSize: S.optional(S.Number),
    qos: S.optional(S.Number),
    lastModifiedTime: S.optional(S.Number),
  }),
).annotate({
  identifier: "RetainedMessageSummary",
}) as any as S.Schema<RetainedMessageSummary>;
export type RetainedMessageList = RetainedMessageSummary[];
export const RetainedMessageList = /*@__PURE__*/ S.Array(
  RetainedMessageSummary,
);
export interface ListRetainedMessagesResponse {
  retainedTopics?: RetainedMessageSummary[];
  nextToken?: string;
}
export const ListRetainedMessagesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    retainedTopics: S.optional(RetainedMessageList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListRetainedMessagesResponse",
}) as any as S.Schema<ListRetainedMessagesResponse>;
export interface ListSubscriptionsRequest {
  clientId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListSubscriptionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientId: S.String.pipe(T.HttpLabel("clientId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/connections/{clientId}/subscriptions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSubscriptionsRequest",
}) as any as S.Schema<ListSubscriptionsRequest>;
export type TopicFilter = string;
export interface SubscriptionSummary {
  topicFilter: string;
  qos: number;
}
export const SubscriptionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ topicFilter: S.String, qos: S.Number }),
).annotate({
  identifier: "SubscriptionSummary",
}) as any as S.Schema<SubscriptionSummary>;
export type SubscriptionList = SubscriptionSummary[];
export const SubscriptionList = /*@__PURE__*/ S.Array(SubscriptionSummary);
export interface ListSubscriptionsResponse {
  subscriptions?: SubscriptionSummary[];
  nextToken?: string;
}
export const ListSubscriptionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    subscriptions: S.optional(SubscriptionList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSubscriptionsResponse",
}) as any as S.Schema<ListSubscriptionsResponse>;
export type Retain = boolean;
export type SynthesizedJsonUserProperties = string;
export type PayloadFormatIndicator =
  | "UNSPECIFIED_BYTES"
  | "UTF8_DATA"
  | (string & {});
export const PayloadFormatIndicator = S.String;

export type ContentType = string;
export type ResponseTopic = string;
export type CorrelationData = string;
export type MessageExpiry = number;
export interface PublishRequest {
  topic: string;
  qos?: number;
  retain?: boolean;
  payload?: T.StreamingInputBody;
  userProperties?: string;
  payloadFormatIndicator?: PayloadFormatIndicator;
  contentType?: string;
  responseTopic?: string;
  correlationData?: string;
  messageExpiry?: number;
}
export const PublishRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    topic: S.String.pipe(T.HttpLabel("topic")),
    qos: S.optional(S.Number).pipe(T.HttpQuery("qos")),
    retain: S.optional(S.Boolean).pipe(T.HttpQuery("retain")),
    payload: S.optional(T.StreamingInput).pipe(T.HttpPayload()),
    userProperties: S.optional(S.String).pipe(
      T.HttpHeader("x-amz-mqtt5-user-properties"),
    ),
    payloadFormatIndicator: S.optional(PayloadFormatIndicator).pipe(
      T.HttpHeader("x-amz-mqtt5-payload-format-indicator"),
    ),
    contentType: S.optional(S.String).pipe(T.HttpQuery("contentType")),
    responseTopic: S.optional(S.String).pipe(T.HttpQuery("responseTopic")),
    correlationData: S.optional(S.String).pipe(
      T.HttpHeader("x-amz-mqtt5-correlation-data"),
    ),
    messageExpiry: S.optional(S.Number).pipe(T.HttpQuery("messageExpiry")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/topics/{topic}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "PublishRequest" }) as any as S.Schema<PublishRequest>;
export interface PublishResponse {}
export const PublishResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PublishResponse",
}) as any as S.Schema<PublishResponse>;
export type Confirmation = boolean;
export type TimeoutInSeconds = number;
export interface SendDirectMessageRequest {
  clientId: string;
  topic: string;
  contentType?: string;
  responseTopic?: string;
  confirmation?: boolean;
  timeout?: number;
  payload?: T.StreamingInputBody;
  userProperties?: string;
  payloadFormatIndicator?: PayloadFormatIndicator;
  correlationData?: string;
}
export const SendDirectMessageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientId: S.String.pipe(T.HttpLabel("clientId")),
    topic: S.String.pipe(T.HttpQuery("topic")),
    contentType: S.optional(S.String).pipe(T.HttpQuery("contentType")),
    responseTopic: S.optional(S.String).pipe(T.HttpQuery("responseTopic")),
    confirmation: S.optional(S.Boolean).pipe(T.HttpQuery("confirmation")),
    timeout: S.optional(S.Number).pipe(T.HttpQuery("timeout")),
    payload: S.optional(T.StreamingInput).pipe(T.HttpPayload()),
    userProperties: S.optional(S.String).pipe(
      T.HttpHeader("x-amz-mqtt5-user-properties"),
    ),
    payloadFormatIndicator: S.optional(PayloadFormatIndicator).pipe(
      T.HttpHeader("x-amz-mqtt5-payload-format-indicator"),
    ),
    correlationData: S.optional(S.String).pipe(
      T.HttpHeader("x-amz-mqtt5-correlation-data"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/connections/{clientId}/messages" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SendDirectMessageRequest",
}) as any as S.Schema<SendDirectMessageRequest>;
export type ResponseMessage = string;
export type TraceId = string;
export interface SendDirectMessageResponse {
  message?: string;
  traceId?: string;
}
export const SendDirectMessageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ message: S.optional(S.String), traceId: S.optional(S.String) }),
).annotate({
  identifier: "SendDirectMessageResponse",
}) as any as S.Schema<SendDirectMessageResponse>;
export interface UpdateThingShadowRequest {
  thingName: string;
  shadowName?: string;
  payload: T.StreamingInputBody;
}
export const UpdateThingShadowRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingName: S.String.pipe(T.HttpLabel("thingName")),
    shadowName: S.optional(S.String).pipe(T.HttpQuery("name")),
    payload: T.StreamingInput.pipe(T.HttpPayload()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/things/{thingName}/shadow" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateThingShadowRequest",
}) as any as S.Schema<UpdateThingShadowRequest>;
export interface UpdateThingShadowResponse {
  payload?: T.StreamingOutputBody;
}
export const UpdateThingShadowResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ payload: S.optional(T.StreamingOutput).pipe(T.HttpPayload()) }),
).annotate({
  identifier: "UpdateThingShadowResponse",
}) as any as S.Schema<UpdateThingShadowResponse>;
export type ErrorMessage = string;
export type DeleteConnectionError =
  | ForbiddenException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Disconnects a connected MQTT client from Amazon Web Services IoT Core. When you disconnect a client, Amazon Web Services IoT Core closes the client's network connection and optionally cleans the session state.
 *
 * Requires permission to access the DeleteConnection action.
 */
export const deleteConnection: API.OperationMethod<
  DeleteConnectionRequest,
  DeleteConnectionResponse,
  DeleteConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteConnectionRequest,
  output: DeleteConnectionResponse,
  errors: [
    ForbiddenException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnection",
}));

export type DeleteThingShadowError =
  | InternalFailureException
  | InvalidRequestException
  | MethodNotAllowedException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | UnsupportedDocumentEncodingException
  | ForbiddenException
  | CommonErrors;
/**
 * Deletes the shadow for the specified thing.
 *
 * Requires permission to access the DeleteThingShadow action.
 *
 * For more information, see DeleteThingShadow in the IoT Developer Guide.
 */
export const deleteThingShadow: API.OperationMethod<
  DeleteThingShadowRequest,
  DeleteThingShadowResponse,
  DeleteThingShadowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteThingShadowRequest,
  output: DeleteThingShadowResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    MethodNotAllowedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    UnsupportedDocumentEncodingException,
    ForbiddenException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteThingShadow",
}));

export type GetConnectionError =
  | ForbiddenException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves connection information for the specified MQTT client.
 *
 * Requires permission to access the GetConnection action.
 */
export const getConnection: API.OperationMethod<
  GetConnectionRequest,
  GetConnectionResponse,
  GetConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetConnectionRequest,
  output: GetConnectionResponse,
  errors: [
    ForbiddenException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnection",
}));

export type GetRetainedMessageError =
  | InternalFailureException
  | InvalidRequestException
  | MethodNotAllowedException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ForbiddenException
  | CommonErrors;
/**
 * Gets the details of a single retained message for the specified topic.
 *
 * This action returns the message payload of the retained message, which can
 * incur messaging costs. To list only the topic names of the retained messages, call
 * ListRetainedMessages.
 *
 * Requires permission to access the GetRetainedMessage action.
 *
 * For more information about messaging costs, see Amazon Web Services IoT Core
 * pricing - Messaging.
 */
export const getRetainedMessage: API.OperationMethod<
  GetRetainedMessageRequest,
  GetRetainedMessageResponse,
  GetRetainedMessageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRetainedMessageRequest,
  output: GetRetainedMessageResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    MethodNotAllowedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ForbiddenException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRetainedMessage",
}));

export type GetThingShadowError =
  | InternalFailureException
  | InvalidRequestException
  | MethodNotAllowedException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | UnsupportedDocumentEncodingException
  | ForbiddenException
  | CommonErrors;
/**
 * Gets the shadow for the specified thing.
 *
 * Requires permission to access the GetThingShadow action.
 *
 * For more information, see GetThingShadow in the
 * IoT Developer Guide.
 */
export const getThingShadow: API.OperationMethod<
  GetThingShadowRequest,
  GetThingShadowResponse,
  GetThingShadowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetThingShadowRequest,
  output: GetThingShadowResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    MethodNotAllowedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    UnsupportedDocumentEncodingException,
    ForbiddenException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetThingShadow",
}));

export type ListNamedShadowsForThingError =
  | InternalFailureException
  | InvalidRequestException
  | MethodNotAllowedException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ForbiddenException
  | CommonErrors;
/**
 * Lists the shadows for the specified thing.
 *
 * Requires permission to access the ListNamedShadowsForThing action.
 */
export const listNamedShadowsForThing: API.OperationMethod<
  ListNamedShadowsForThingRequest,
  ListNamedShadowsForThingResponse,
  ListNamedShadowsForThingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListNamedShadowsForThingRequest,
  output: ListNamedShadowsForThingResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    MethodNotAllowedException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ForbiddenException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNamedShadowsForThing",
}));

export type ListRetainedMessagesError =
  | InternalFailureException
  | InvalidRequestException
  | MethodNotAllowedException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ForbiddenException
  | CommonErrors;
/**
 * Lists summary information about the retained messages stored for the account.
 *
 * This action returns only the topic names of the retained messages. It doesn't
 * return any message payloads. Although this action doesn't return a message payload,
 * it can still incur messaging costs.
 *
 * To get the message payload of a retained message, call
 * GetRetainedMessage
 * with the topic name of the retained message.
 *
 * Requires permission to access the ListRetainedMessages action.
 *
 * For more information about messaging costs, see Amazon Web Services IoT Core
 * pricing - Messaging.
 */
export const listRetainedMessages: API.PaginatedOperationMethod<
  ListRetainedMessagesRequest,
  ListRetainedMessagesResponse,
  ListRetainedMessagesError,
  Credentials | HttpClient.HttpClient,
  RetainedMessageSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRetainedMessagesRequest,
  output: ListRetainedMessagesResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    MethodNotAllowedException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ForbiddenException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRetainedMessages",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "retainedTopics",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSubscriptionsError =
  | ForbiddenException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a list of all subscriptions for MQTT clients with active sessions, including offline clients with persistent sessions.
 *
 * Requires permission to access the ListSubscriptions action.
 */
export const listSubscriptions: API.PaginatedOperationMethod<
  ListSubscriptionsRequest,
  ListSubscriptionsResponse,
  ListSubscriptionsError,
  Credentials | HttpClient.HttpClient,
  SubscriptionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSubscriptionsRequest,
  output: ListSubscriptionsResponse,
  errors: [
    ForbiddenException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSubscriptions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "subscriptions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PublishError =
  | InternalFailureException
  | InvalidRequestException
  | MethodNotAllowedException
  | ThrottlingException
  | UnauthorizedException
  | ForbiddenException
  | CommonErrors;
/**
 * Publishes an MQTT message.
 *
 * Requires permission to access the Publish action.
 *
 * For more information about MQTT messages, see
 * MQTT Protocol in the
 * IoT Developer Guide.
 *
 * For more information about messaging costs, see Amazon Web Services IoT Core
 * pricing - Messaging.
 */
export const publish: API.OperationMethod<
  PublishRequest,
  PublishResponse,
  PublishError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PublishRequest,
  output: PublishResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    MethodNotAllowedException,
    ThrottlingException,
    UnauthorizedException,
    ForbiddenException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Publish",
}));

export type SendDirectMessageError =
  | ForbiddenException
  | GatewayTimeoutException
  | InternalFailureException
  | InvalidRequestException
  | RequestEntityTooLargeException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Sends an MQTT message directly to a specific client identified by its client ID.
 *
 * `SendDirectMessage` targets a single client ID. The receiving client does not
 * need to subscribe to the topic, but the receiver's policy must allow `iot:Receive` on the specified topic.
 *
 * Requires permission to access the SendDirectMessage action.
 *
 * For more information about messaging costs, see Amazon Web Services IoT Core
 * pricing.
 */
export const sendDirectMessage: API.OperationMethod<
  SendDirectMessageRequest,
  SendDirectMessageResponse,
  SendDirectMessageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SendDirectMessageRequest,
  output: SendDirectMessageResponse,
  errors: [
    ForbiddenException,
    GatewayTimeoutException,
    InternalFailureException,
    InvalidRequestException,
    RequestEntityTooLargeException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendDirectMessage",
}));

export type UpdateThingShadowError =
  | ConflictException
  | InternalFailureException
  | InvalidRequestException
  | MethodNotAllowedException
  | RequestEntityTooLargeException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | UnsupportedDocumentEncodingException
  | ForbiddenException
  | CommonErrors;
/**
 * Updates the shadow for the specified thing.
 *
 * Requires permission to access the UpdateThingShadow action.
 *
 * For more information, see UpdateThingShadow in the
 * IoT Developer Guide.
 */
export const updateThingShadow: API.OperationMethod<
  UpdateThingShadowRequest,
  UpdateThingShadowResponse,
  UpdateThingShadowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateThingShadowRequest,
  output: UpdateThingShadowResponse,
  errors: [
    ConflictException,
    InternalFailureException,
    InvalidRequestException,
    MethodNotAllowedException,
    RequestEntityTooLargeException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    UnsupportedDocumentEncodingException,
    ForbiddenException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateThingShadow",
}));
