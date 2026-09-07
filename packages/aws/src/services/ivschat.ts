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
const svc = T.AwsApiService({
  sdkId: "ivschat",
  serviceShapeName: "AmazonInteractiveVideoServiceChat",
});
const auth = T.AwsAuthSigv4({ name: "ivschat" });
const ver = T.ServiceVersion("2020-07-14");
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
              `https://ivschat-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://ivschat-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://ivschat.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://ivschat.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class PendingVerification
  extends /*@__PURE__*/ S.TaggedError<PendingVerification>()(
    "PendingVerification",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
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
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
      limit: S.Number,
    },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
      limit: S.Number,
    },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      reason: S.optional(S.String),
      fieldList: S.optional(
        S.suspend(() => ValidationExceptionFieldList).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type RoomIdentifier = string;
export type UserID = string | redacted.Redacted<string>;
export type ChatTokenCapability = string;
export type ChatTokenCapabilities = string[];
export const ChatTokenCapabilities = /*@__PURE__*/ S.Array(S.String);
export type SessionDurationInMinutes = number;
export type ChatTokenAttributes = { [key: string]: string | undefined };
export const ChatTokenAttributes = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateChatTokenRequest {
  roomIdentifier: string;
  userId: string | redacted.Redacted<string>;
  capabilities?: string[];
  sessionDurationInMinutes?: number;
  attributes?: { [key: string]: string | undefined };
}
export const CreateChatTokenRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    roomIdentifier: S.String,
    userId: SensitiveString,
    capabilities: S.optional(ChatTokenCapabilities),
    sessionDurationInMinutes: S.optional(S.Number),
    attributes: S.optional(ChatTokenAttributes),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CreateChatToken" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateChatTokenRequest",
}) as any as S.Schema<CreateChatTokenRequest>;
export type ChatToken = string | redacted.Redacted<string>;
export interface CreateChatTokenResponse {
  token?: string | redacted.Redacted<string>;
  tokenExpirationTime?: Date;
  sessionExpirationTime?: Date;
}
export const CreateChatTokenResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    token: S.optional(SensitiveString),
    tokenExpirationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    sessionExpirationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "CreateChatTokenResponse",
}) as any as S.Schema<CreateChatTokenResponse>;
export type LoggingConfigurationName = string;
export type BucketName = string;
export interface S3DestinationConfiguration {
  bucketName: string;
}
export const S3DestinationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ bucketName: S.String }),
).annotate({
  identifier: "S3DestinationConfiguration",
}) as any as S.Schema<S3DestinationConfiguration>;
export type LogGroupName = string;
export interface CloudWatchLogsDestinationConfiguration {
  logGroupName: string;
}
export const CloudWatchLogsDestinationConfiguration = /*@__PURE__*/ S.suspend(
  () => S.Struct({ logGroupName: S.String }),
).annotate({
  identifier: "CloudWatchLogsDestinationConfiguration",
}) as any as S.Schema<CloudWatchLogsDestinationConfiguration>;
export type DeliveryStreamName = string;
export interface FirehoseDestinationConfiguration {
  deliveryStreamName: string;
}
export const FirehoseDestinationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ deliveryStreamName: S.String }),
).annotate({
  identifier: "FirehoseDestinationConfiguration",
}) as any as S.Schema<FirehoseDestinationConfiguration>;
export type DestinationConfiguration =
  | { s3: S3DestinationConfiguration; cloudWatchLogs?: never; firehose?: never }
  | {
      s3?: never;
      cloudWatchLogs: CloudWatchLogsDestinationConfiguration;
      firehose?: never;
    }
  | {
      s3?: never;
      cloudWatchLogs?: never;
      firehose: FirehoseDestinationConfiguration;
    };
export const DestinationConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ s3: S3DestinationConfiguration }),
  S.Struct({ cloudWatchLogs: CloudWatchLogsDestinationConfiguration }),
  S.Struct({ firehose: FirehoseDestinationConfiguration }),
]);
export type TagKey = string;
export type TagValue = string;
export type Tags = { [key: string]: string | undefined };
export const Tags = /*@__PURE__*/ S.Record(S.String, S.String.pipe(S.optional));
export interface CreateLoggingConfigurationRequest {
  name?: string;
  destinationConfiguration: DestinationConfiguration;
  tags?: { [key: string]: string | undefined };
}
export const CreateLoggingConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    destinationConfiguration: DestinationConfiguration,
    tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CreateLoggingConfiguration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateLoggingConfigurationRequest",
}) as any as S.Schema<CreateLoggingConfigurationRequest>;
export type LoggingConfigurationArn = string;
export type LoggingConfigurationID = string;
export type CreateLoggingConfigurationState = string;
export interface CreateLoggingConfigurationResponse {
  arn?: string;
  id?: string;
  createTime?: Date;
  updateTime?: Date;
  name?: string;
  destinationConfiguration?: DestinationConfiguration;
  state?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateLoggingConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    id: S.optional(S.String),
    createTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    name: S.optional(S.String),
    destinationConfiguration: S.optional(DestinationConfiguration),
    state: S.optional(S.String),
    tags: S.optional(Tags),
  }),
).annotate({
  identifier: "CreateLoggingConfigurationResponse",
}) as any as S.Schema<CreateLoggingConfigurationResponse>;
export type RoomName = string;
export type RoomMaxMessageRatePerSecond = number;
export type RoomMaxMessageLength = number;
export type LambdaArn = string;
export type FallbackResult = string;
export interface MessageReviewHandler {
  uri?: string;
  fallbackResult?: string;
}
export const MessageReviewHandler = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ uri: S.optional(S.String), fallbackResult: S.optional(S.String) }),
).annotate({
  identifier: "MessageReviewHandler",
}) as any as S.Schema<MessageReviewHandler>;
export type LoggingConfigurationIdentifier = string;
export type LoggingConfigurationIdentifierList = string[];
export const LoggingConfigurationIdentifierList = /*@__PURE__*/ S.Array(
  S.String,
);
export interface CreateRoomRequest {
  name?: string;
  maximumMessageRatePerSecond?: number;
  maximumMessageLength?: number;
  messageReviewHandler?: MessageReviewHandler;
  tags?: { [key: string]: string | undefined };
  loggingConfigurationIdentifiers?: string[];
}
export const CreateRoomRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    maximumMessageRatePerSecond: S.optional(S.Number),
    maximumMessageLength: S.optional(S.Number),
    messageReviewHandler: S.optional(MessageReviewHandler),
    tags: S.optional(Tags),
    loggingConfigurationIdentifiers: S.optional(
      LoggingConfigurationIdentifierList,
    ),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CreateRoom" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateRoomRequest",
}) as any as S.Schema<CreateRoomRequest>;
export type RoomArn = string;
export type RoomID = string;
export interface CreateRoomResponse {
  arn?: string;
  id?: string;
  name?: string;
  createTime?: Date;
  updateTime?: Date;
  maximumMessageRatePerSecond?: number;
  maximumMessageLength?: number;
  messageReviewHandler?: MessageReviewHandler;
  tags?: { [key: string]: string | undefined };
  loggingConfigurationIdentifiers?: string[];
}
export const CreateRoomResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    id: S.optional(S.String),
    name: S.optional(S.String),
    createTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    maximumMessageRatePerSecond: S.optional(S.Number),
    maximumMessageLength: S.optional(S.Number),
    messageReviewHandler: S.optional(MessageReviewHandler),
    tags: S.optional(Tags),
    loggingConfigurationIdentifiers: S.optional(
      LoggingConfigurationIdentifierList,
    ),
  }),
).annotate({
  identifier: "CreateRoomResponse",
}) as any as S.Schema<CreateRoomResponse>;
export interface DeleteLoggingConfigurationRequest {
  identifier: string;
}
export const DeleteLoggingConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ identifier: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeleteLoggingConfiguration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteLoggingConfigurationRequest",
}) as any as S.Schema<DeleteLoggingConfigurationRequest>;
export interface DeleteLoggingConfigurationResponse {}
export const DeleteLoggingConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteLoggingConfigurationResponse",
}) as any as S.Schema<DeleteLoggingConfigurationResponse>;
export type MessageID = string;
export type Reason = string;
export interface DeleteMessageRequest {
  roomIdentifier: string;
  id: string;
  reason?: string;
}
export const DeleteMessageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    roomIdentifier: S.String,
    id: S.String,
    reason: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeleteMessage" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteMessageRequest",
}) as any as S.Schema<DeleteMessageRequest>;
export type ID = string;
export interface DeleteMessageResponse {
  id?: string;
}
export const DeleteMessageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.optional(S.String) }),
).annotate({
  identifier: "DeleteMessageResponse",
}) as any as S.Schema<DeleteMessageResponse>;
export interface DeleteRoomRequest {
  identifier: string;
}
export const DeleteRoomRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ identifier: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeleteRoom" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteRoomRequest",
}) as any as S.Schema<DeleteRoomRequest>;
export interface DeleteRoomResponse {}
export const DeleteRoomResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteRoomResponse",
}) as any as S.Schema<DeleteRoomResponse>;
export interface DisconnectUserRequest {
  roomIdentifier: string;
  userId: string | redacted.Redacted<string>;
  reason?: string;
}
export const DisconnectUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    roomIdentifier: S.String,
    userId: SensitiveString,
    reason: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DisconnectUser" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisconnectUserRequest",
}) as any as S.Schema<DisconnectUserRequest>;
export interface DisconnectUserResponse {}
export const DisconnectUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisconnectUserResponse",
}) as any as S.Schema<DisconnectUserResponse>;
export interface GetLoggingConfigurationRequest {
  identifier: string;
}
export const GetLoggingConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ identifier: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetLoggingConfiguration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetLoggingConfigurationRequest",
}) as any as S.Schema<GetLoggingConfigurationRequest>;
export type LoggingConfigurationState = string;
export interface GetLoggingConfigurationResponse {
  arn?: string;
  id?: string;
  createTime?: Date;
  updateTime?: Date;
  name?: string;
  destinationConfiguration?: DestinationConfiguration;
  state?: string;
  tags?: { [key: string]: string | undefined };
}
export const GetLoggingConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    id: S.optional(S.String),
    createTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    name: S.optional(S.String),
    destinationConfiguration: S.optional(DestinationConfiguration),
    state: S.optional(S.String),
    tags: S.optional(Tags),
  }),
).annotate({
  identifier: "GetLoggingConfigurationResponse",
}) as any as S.Schema<GetLoggingConfigurationResponse>;
export interface GetRoomRequest {
  identifier: string;
}
export const GetRoomRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ identifier: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetRoom" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetRoomRequest" }) as any as S.Schema<GetRoomRequest>;
export interface GetRoomResponse {
  arn?: string;
  id?: string;
  name?: string;
  createTime?: Date;
  updateTime?: Date;
  maximumMessageRatePerSecond?: number;
  maximumMessageLength?: number;
  messageReviewHandler?: MessageReviewHandler;
  tags?: { [key: string]: string | undefined };
  loggingConfigurationIdentifiers?: string[];
}
export const GetRoomResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    id: S.optional(S.String),
    name: S.optional(S.String),
    createTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    maximumMessageRatePerSecond: S.optional(S.Number),
    maximumMessageLength: S.optional(S.Number),
    messageReviewHandler: S.optional(MessageReviewHandler),
    tags: S.optional(Tags),
    loggingConfigurationIdentifiers: S.optional(
      LoggingConfigurationIdentifierList,
    ),
  }),
).annotate({
  identifier: "GetRoomResponse",
}) as any as S.Schema<GetRoomResponse>;
export type PaginationToken = string;
export type MaxLoggingConfigurationResults = number;
export interface ListLoggingConfigurationsRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListLoggingConfigurationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListLoggingConfigurations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListLoggingConfigurationsRequest",
}) as any as S.Schema<ListLoggingConfigurationsRequest>;
export interface LoggingConfigurationSummary {
  arn?: string;
  id?: string;
  createTime?: Date;
  updateTime?: Date;
  name?: string;
  destinationConfiguration?: DestinationConfiguration;
  state?: string;
  tags?: { [key: string]: string | undefined };
}
export const LoggingConfigurationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    id: S.optional(S.String),
    createTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    name: S.optional(S.String),
    destinationConfiguration: S.optional(DestinationConfiguration),
    state: S.optional(S.String),
    tags: S.optional(Tags),
  }),
).annotate({
  identifier: "LoggingConfigurationSummary",
}) as any as S.Schema<LoggingConfigurationSummary>;
export type LoggingConfigurationList = LoggingConfigurationSummary[];
export const LoggingConfigurationList = /*@__PURE__*/ S.Array(
  LoggingConfigurationSummary,
);
export interface ListLoggingConfigurationsResponse {
  loggingConfigurations: LoggingConfigurationSummary[];
  nextToken?: string;
}
export const ListLoggingConfigurationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    loggingConfigurations: LoggingConfigurationList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListLoggingConfigurationsResponse",
}) as any as S.Schema<ListLoggingConfigurationsResponse>;
export type MaxRoomResults = number;
export interface ListRoomsRequest {
  name?: string;
  nextToken?: string;
  maxResults?: number;
  messageReviewHandlerUri?: string;
  loggingConfigurationIdentifier?: string;
}
export const ListRoomsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
    messageReviewHandlerUri: S.optional(S.String),
    loggingConfigurationIdentifier: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListRooms" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListRoomsRequest",
}) as any as S.Schema<ListRoomsRequest>;
export interface RoomSummary {
  arn?: string;
  id?: string;
  name?: string;
  messageReviewHandler?: MessageReviewHandler;
  createTime?: Date;
  updateTime?: Date;
  tags?: { [key: string]: string | undefined };
  loggingConfigurationIdentifiers?: string[];
}
export const RoomSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    id: S.optional(S.String),
    name: S.optional(S.String),
    messageReviewHandler: S.optional(MessageReviewHandler),
    createTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    tags: S.optional(Tags),
    loggingConfigurationIdentifiers: S.optional(
      LoggingConfigurationIdentifierList,
    ),
  }),
).annotate({ identifier: "RoomSummary" }) as any as S.Schema<RoomSummary>;
export type RoomList = RoomSummary[];
export const RoomList = /*@__PURE__*/ S.Array(RoomSummary);
export interface ListRoomsResponse {
  rooms: RoomSummary[];
  nextToken?: string;
}
export const ListRoomsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ rooms: RoomList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListRoomsResponse",
}) as any as S.Schema<ListRoomsResponse>;
export type ResourceArn = string;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface ListTagsForResourceResponse {
  tags: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: Tags }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export type EventName = string;
export type EventAttributes = { [key: string]: string | undefined };
export const EventAttributes = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface SendEventRequest {
  roomIdentifier: string;
  eventName: string;
  attributes?: { [key: string]: string | undefined };
}
export const SendEventRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    roomIdentifier: S.String,
    eventName: S.String,
    attributes: S.optional(EventAttributes),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/SendEvent" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SendEventRequest",
}) as any as S.Schema<SendEventRequest>;
export interface SendEventResponse {
  id?: string;
}
export const SendEventResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.optional(S.String) }),
).annotate({
  identifier: "SendEventResponse",
}) as any as S.Schema<SendEventResponse>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tags: Tags,
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
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "UntagResourceRequest",
}) as any as S.Schema<UntagResourceRequest>;
export interface UntagResourceResponse {}
export const UntagResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export interface UpdateLoggingConfigurationRequest {
  identifier: string;
  name?: string;
  destinationConfiguration?: DestinationConfiguration;
}
export const UpdateLoggingConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    identifier: S.String,
    name: S.optional(S.String),
    destinationConfiguration: S.optional(DestinationConfiguration),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/UpdateLoggingConfiguration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateLoggingConfigurationRequest",
}) as any as S.Schema<UpdateLoggingConfigurationRequest>;
export type UpdateLoggingConfigurationState = string;
export interface UpdateLoggingConfigurationResponse {
  arn?: string;
  id?: string;
  createTime?: Date;
  updateTime?: Date;
  name?: string;
  destinationConfiguration?: DestinationConfiguration;
  state?: string;
  tags?: { [key: string]: string | undefined };
}
export const UpdateLoggingConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    id: S.optional(S.String),
    createTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    name: S.optional(S.String),
    destinationConfiguration: S.optional(DestinationConfiguration),
    state: S.optional(S.String),
    tags: S.optional(Tags),
  }),
).annotate({
  identifier: "UpdateLoggingConfigurationResponse",
}) as any as S.Schema<UpdateLoggingConfigurationResponse>;
export interface UpdateRoomRequest {
  identifier: string;
  name?: string;
  maximumMessageRatePerSecond?: number;
  maximumMessageLength?: number;
  messageReviewHandler?: MessageReviewHandler;
  loggingConfigurationIdentifiers?: string[];
}
export const UpdateRoomRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    identifier: S.String,
    name: S.optional(S.String),
    maximumMessageRatePerSecond: S.optional(S.Number),
    maximumMessageLength: S.optional(S.Number),
    messageReviewHandler: S.optional(MessageReviewHandler),
    loggingConfigurationIdentifiers: S.optional(
      LoggingConfigurationIdentifierList,
    ),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/UpdateRoom" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateRoomRequest",
}) as any as S.Schema<UpdateRoomRequest>;
export interface UpdateRoomResponse {
  arn?: string;
  id?: string;
  name?: string;
  createTime?: Date;
  updateTime?: Date;
  maximumMessageRatePerSecond?: number;
  maximumMessageLength?: number;
  messageReviewHandler?: MessageReviewHandler;
  tags?: { [key: string]: string | undefined };
  loggingConfigurationIdentifiers?: string[];
}
export const UpdateRoomResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    id: S.optional(S.String),
    name: S.optional(S.String),
    createTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    maximumMessageRatePerSecond: S.optional(S.Number),
    maximumMessageLength: S.optional(S.Number),
    messageReviewHandler: S.optional(MessageReviewHandler),
    tags: S.optional(Tags),
    loggingConfigurationIdentifiers: S.optional(
      LoggingConfigurationIdentifierList,
    ),
  }),
).annotate({
  identifier: "UpdateRoomResponse",
}) as any as S.Schema<UpdateRoomResponse>;
export type ErrorMessage = string;
export type ResourceId = string;
export type ResourceType = string;
export type ValidationExceptionReason = string;
export type FieldName = string;
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
export type Limit = number;
export type CreateChatTokenError =
  | AccessDeniedException
  | PendingVerification
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates an encrypted token that is used by a chat participant to establish an individual
 * WebSocket chat connection to a room. When the token is used to connect to chat, the
 * connection is valid for the session duration specified in the request. The token becomes
 * invalid at the token-expiration timestamp included in the response.
 *
 * Use the `capabilities` field to permit an end user to send messages or
 * moderate a room.
 *
 * The `attributes` field securely attaches structured data to the chat session; the data is
 * included within each message sent by the end user and received by other participants in the
 * room. Common use cases for attributes include passing end-user profile data like an icon,
 * display name, colors, badges, and other display features.
 *
 * Encryption keys are owned by Amazon IVS Chat and never used directly by your
 * application.
 */
export const createChatToken: API.OperationMethod<
  CreateChatTokenRequest,
  CreateChatTokenResponse,
  CreateChatTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateChatTokenRequest,
  output: CreateChatTokenResponse,
  errors: [
    AccessDeniedException,
    PendingVerification,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateChatToken",
}));

export type CreateLoggingConfigurationError =
  | AccessDeniedException
  | ConflictException
  | PendingVerification
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a logging configuration that allows clients to store and record sent
 * messages.
 */
export const createLoggingConfiguration: API.OperationMethod<
  CreateLoggingConfigurationRequest,
  CreateLoggingConfigurationResponse,
  CreateLoggingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateLoggingConfigurationRequest,
  output: CreateLoggingConfigurationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    PendingVerification,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLoggingConfiguration",
}));

export type CreateRoomError =
  | AccessDeniedException
  | ConflictException
  | PendingVerification
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a room that allows clients to connect and pass messages.
 */
export const createRoom: API.OperationMethod<
  CreateRoomRequest,
  CreateRoomResponse,
  CreateRoomError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRoomRequest,
  output: CreateRoomResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    PendingVerification,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRoom",
}));

export type DeleteLoggingConfigurationError =
  | AccessDeniedException
  | ConflictException
  | PendingVerification
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes the specified logging configuration.
 */
export const deleteLoggingConfiguration: API.OperationMethod<
  DeleteLoggingConfigurationRequest,
  DeleteLoggingConfigurationResponse,
  DeleteLoggingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteLoggingConfigurationRequest,
  output: DeleteLoggingConfigurationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    PendingVerification,
    ResourceNotFoundException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLoggingConfiguration",
}));

export type DeleteMessageError =
  | AccessDeniedException
  | PendingVerification
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sends an event to a specific room which directs clients to delete a specific message;
 * that is, unrender it from view and delete it from the client’s chat history. This event’s
 * `EventName` is `aws:DELETE_MESSAGE`. This replicates the
 * DeleteMessage WebSocket operation in the Amazon IVS Chat Messaging API.
 */
export const deleteMessage: API.OperationMethod<
  DeleteMessageRequest,
  DeleteMessageResponse,
  DeleteMessageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteMessageRequest,
  output: DeleteMessageResponse,
  errors: [
    AccessDeniedException,
    PendingVerification,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMessage",
}));

export type DeleteRoomError =
  | AccessDeniedException
  | PendingVerification
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes the specified room.
 */
export const deleteRoom: API.OperationMethod<
  DeleteRoomRequest,
  DeleteRoomResponse,
  DeleteRoomError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRoomRequest,
  output: DeleteRoomResponse,
  errors: [
    AccessDeniedException,
    PendingVerification,
    ResourceNotFoundException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRoom",
}));

export type DisconnectUserError =
  | AccessDeniedException
  | PendingVerification
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disconnects all connections using a specified user ID from a room. This replicates the
 *
 * DisconnectUser WebSocket operation in the Amazon IVS Chat Messaging API.
 */
export const disconnectUser: API.OperationMethod<
  DisconnectUserRequest,
  DisconnectUserResponse,
  DisconnectUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisconnectUserRequest,
  output: DisconnectUserResponse,
  errors: [
    AccessDeniedException,
    PendingVerification,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisconnectUser",
}));

export type GetLoggingConfigurationError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets the specified logging configuration.
 */
export const getLoggingConfiguration: API.OperationMethod<
  GetLoggingConfigurationRequest,
  GetLoggingConfigurationResponse,
  GetLoggingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetLoggingConfigurationRequest,
  output: GetLoggingConfigurationResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLoggingConfiguration",
}));

export type GetRoomError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets the specified room.
 */
export const getRoom: API.OperationMethod<
  GetRoomRequest,
  GetRoomResponse,
  GetRoomError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRoomRequest,
  output: GetRoomResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRoom",
}));

export type ListLoggingConfigurationsError =
  | AccessDeniedException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets summary information about all your logging configurations in the AWS region where
 * the API request is processed.
 */
export const listLoggingConfigurations: API.PaginatedOperationMethod<
  ListLoggingConfigurationsRequest,
  ListLoggingConfigurationsResponse,
  ListLoggingConfigurationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListLoggingConfigurationsRequest,
  output: ListLoggingConfigurationsResponse,
  errors: [AccessDeniedException, ValidationException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLoggingConfigurations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRoomsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets summary information about all your rooms in the AWS region where the API request is
 * processed. Results are sorted in descending order of `updateTime`.
 */
export const listRooms: API.PaginatedOperationMethod<
  ListRoomsRequest,
  ListRoomsResponse,
  ListRoomsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRoomsRequest,
  output: ListRoomsResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRooms",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets information about AWS tags for the specified ARN.
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
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type SendEventError =
  | AccessDeniedException
  | PendingVerification
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sends an event to a room. Use this within your application’s business logic to send
 * events to clients of a room; e.g., to notify clients to change the way the chat UI is
 * rendered.
 */
export const sendEvent: API.OperationMethod<
  SendEventRequest,
  SendEventResponse,
  SendEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SendEventRequest,
  output: SendEventResponse,
  errors: [
    AccessDeniedException,
    PendingVerification,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendEvent",
}));

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Adds or updates tags for the AWS resource with the specified ARN.
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
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Removes tags from the resource with the specified ARN.
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
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateLoggingConfigurationError =
  | AccessDeniedException
  | ConflictException
  | PendingVerification
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a specified logging configuration.
 */
export const updateLoggingConfiguration: API.OperationMethod<
  UpdateLoggingConfigurationRequest,
  UpdateLoggingConfigurationResponse,
  UpdateLoggingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateLoggingConfigurationRequest,
  output: UpdateLoggingConfigurationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    PendingVerification,
    ResourceNotFoundException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLoggingConfiguration",
}));

export type UpdateRoomError =
  | AccessDeniedException
  | PendingVerification
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a room’s configuration.
 */
export const updateRoom: API.OperationMethod<
  UpdateRoomRequest,
  UpdateRoomResponse,
  UpdateRoomError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRoomRequest,
  output: UpdateRoomResponse,
  errors: [
    AccessDeniedException,
    PendingVerification,
    ResourceNotFoundException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRoom",
}));
