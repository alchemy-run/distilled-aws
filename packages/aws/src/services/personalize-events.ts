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
  sdkId: "Personalize Events",
  serviceShapeName: "AmazonPersonalizeEvents",
});
const auth = T.AwsAuthSigv4({ name: "personalize" });
const ver = T.ServiceVersion("2018-03-22");
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
              `https://personalize-events-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://personalize-events-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://personalize-events.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://personalize-events.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class InvalidInputException
  extends /*@__PURE__*/ S.TaggedError<InvalidInputException>()(
    "InvalidInputException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceInUseException
  extends /*@__PURE__*/ S.TaggedError<ResourceInUseException>()(
    "ResourceInUseException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export type StringType = string;
export type ActionId = string | redacted.Redacted<string>;
export type UserId = string | redacted.Redacted<string>;
export type RecommendationId = string;
export type ActionImpression = (string | redacted.Redacted<string>)[];
export const ActionImpression = /*@__PURE__*/ S.Array(SensitiveString);
export type SynthesizedJsonActionInteractionProperties =
  | string
  | redacted.Redacted<string>;
export interface ActionInteraction {
  actionId: string | redacted.Redacted<string>;
  userId?: string | redacted.Redacted<string>;
  sessionId: string;
  timestamp: Date;
  eventType: string;
  eventId?: string;
  recommendationId?: string;
  impression?: (string | redacted.Redacted<string>)[];
  properties?: string | redacted.Redacted<string>;
}
export const ActionInteraction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    actionId: SensitiveString,
    userId: S.optional(SensitiveString),
    sessionId: S.String,
    timestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    eventType: S.String,
    eventId: S.optional(S.String),
    recommendationId: S.optional(S.String),
    impression: S.optional(ActionImpression),
    properties: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "ActionInteraction",
}) as any as S.Schema<ActionInteraction>;
export type ActionInteractionsList = ActionInteraction[];
export const ActionInteractionsList = /*@__PURE__*/ S.Array(ActionInteraction);
export interface PutActionInteractionsRequest {
  trackingId: string;
  actionInteractions: ActionInteraction[];
}
export const PutActionInteractionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    trackingId: S.String,
    actionInteractions: ActionInteractionsList,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/action-interactions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutActionInteractionsRequest",
}) as any as S.Schema<PutActionInteractionsRequest>;
export interface PutActionInteractionsResponse {}
export const PutActionInteractionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutActionInteractionsResponse",
}) as any as S.Schema<PutActionInteractionsResponse>;
export type Arn = string;
export type SynthesizedJsonActionProperties =
  | string
  | redacted.Redacted<string>;
export interface Action {
  actionId: string;
  properties?: string | redacted.Redacted<string>;
}
export const Action = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ actionId: S.String, properties: S.optional(SensitiveString) }),
).annotate({ identifier: "Action" }) as any as S.Schema<Action>;
export type ActionList = Action[];
export const ActionList = /*@__PURE__*/ S.Array(Action);
export interface PutActionsRequest {
  datasetArn: string;
  actions: Action[];
}
export const PutActionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ datasetArn: S.String, actions: ActionList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/actions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutActionsRequest",
}) as any as S.Schema<PutActionsRequest>;
export interface PutActionsResponse {}
export const PutActionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutActionsResponse",
}) as any as S.Schema<PutActionsResponse>;
export type FloatType = number;
export type ItemId = string | redacted.Redacted<string>;
export type SynthesizedJsonEventPropertiesJSON =
  | string
  | redacted.Redacted<string>;
export type Impression = (string | redacted.Redacted<string>)[];
export const Impression = /*@__PURE__*/ S.Array(SensitiveString);
export type EventAttributionSource = string;
export interface MetricAttribution {
  eventAttributionSource: string;
}
export const MetricAttribution = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ eventAttributionSource: S.String }),
).annotate({
  identifier: "MetricAttribution",
}) as any as S.Schema<MetricAttribution>;
export interface Event {
  eventId?: string;
  eventType: string;
  eventValue?: number;
  itemId?: string | redacted.Redacted<string>;
  properties?: string | redacted.Redacted<string>;
  sentAt: Date;
  recommendationId?: string;
  impression?: (string | redacted.Redacted<string>)[];
  metricAttribution?: MetricAttribution;
}
export const Event = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    eventId: S.optional(S.String),
    eventType: S.String,
    eventValue: S.optional(S.Number),
    itemId: S.optional(SensitiveString),
    properties: S.optional(SensitiveString),
    sentAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    recommendationId: S.optional(S.String),
    impression: S.optional(Impression),
    metricAttribution: S.optional(MetricAttribution),
  }),
).annotate({ identifier: "Event" }) as any as S.Schema<Event>;
export type EventList = Event[];
export const EventList = /*@__PURE__*/ S.Array(Event);
export interface PutEventsRequest {
  trackingId: string;
  userId?: string | redacted.Redacted<string>;
  sessionId: string;
  eventList: Event[];
}
export const PutEventsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    trackingId: S.String,
    userId: S.optional(SensitiveString),
    sessionId: S.String,
    eventList: EventList,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/events" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutEventsRequest",
}) as any as S.Schema<PutEventsRequest>;
export interface PutEventsResponse {}
export const PutEventsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutEventsResponse",
}) as any as S.Schema<PutEventsResponse>;
export type SynthesizedJsonItemProperties = string | redacted.Redacted<string>;
export interface Item {
  itemId: string;
  properties?: string | redacted.Redacted<string>;
}
export const Item = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ itemId: S.String, properties: S.optional(SensitiveString) }),
).annotate({ identifier: "Item" }) as any as S.Schema<Item>;
export type ItemList = Item[];
export const ItemList = /*@__PURE__*/ S.Array(Item);
export interface PutItemsRequest {
  datasetArn: string;
  items: Item[];
}
export const PutItemsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ datasetArn: S.String, items: ItemList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/items" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutItemsRequest",
}) as any as S.Schema<PutItemsRequest>;
export interface PutItemsResponse {}
export const PutItemsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutItemsResponse",
}) as any as S.Schema<PutItemsResponse>;
export type SynthesizedJsonUserProperties = string | redacted.Redacted<string>;
export interface User {
  userId: string;
  properties?: string | redacted.Redacted<string>;
}
export const User = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ userId: S.String, properties: S.optional(SensitiveString) }),
).annotate({ identifier: "User" }) as any as S.Schema<User>;
export type UserList = User[];
export const UserList = /*@__PURE__*/ S.Array(User);
export interface PutUsersRequest {
  datasetArn: string;
  users: User[];
}
export const PutUsersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ datasetArn: S.String, users: UserList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/users" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutUsersRequest",
}) as any as S.Schema<PutUsersRequest>;
export interface PutUsersResponse {}
export const PutUsersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutUsersResponse",
}) as any as S.Schema<PutUsersResponse>;
export type ErrorMessage = string;
export type PutActionInteractionsError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Records action interaction event data. An *action interaction* event is an interaction between a user and an *action*.
 * For example, a user taking an action, such a enrolling in a membership program or downloading your app.
 *
 * For more information about recording action interactions, see Recording action interaction events.
 * For more information about actions in an Actions dataset, see Actions dataset.
 */
export const putActionInteractions: API.OperationMethod<
  PutActionInteractionsRequest,
  PutActionInteractionsResponse,
  PutActionInteractionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutActionInteractionsRequest,
  output: PutActionInteractionsResponse,
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutActionInteractions",
}));

export type PutActionsError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Adds one or more actions to an Actions dataset. For more information see
 * Importing actions individually.
 */
export const putActions: API.OperationMethod<
  PutActionsRequest,
  PutActionsResponse,
  PutActionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutActionsRequest,
  output: PutActionsResponse,
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutActions",
}));

export type PutEventsError = InvalidInputException | CommonErrors;
/**
 * Records item interaction event data. For more information see
 * Recording item interaction events.
 */
export const putEvents: API.OperationMethod<
  PutEventsRequest,
  PutEventsResponse,
  PutEventsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutEventsRequest,
  output: PutEventsResponse,
  errors: [InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutEvents",
}));

export type PutItemsError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Adds one or more items to an Items dataset. For more information see
 * Importing items individually.
 */
export const putItems: API.OperationMethod<
  PutItemsRequest,
  PutItemsResponse,
  PutItemsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutItemsRequest,
  output: PutItemsResponse,
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutItems",
}));

export type PutUsersError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Adds one or more users to a Users dataset. For more information see
 * Importing users individually.
 */
export const putUsers: API.OperationMethod<
  PutUsersRequest,
  PutUsersResponse,
  PutUsersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutUsersRequest,
  output: PutUsersResponse,
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutUsers",
}));
