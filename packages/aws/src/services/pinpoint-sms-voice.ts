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
  sdkId: "Pinpoint SMS Voice",
  serviceShapeName: "PinpointSMSVoice",
});
const auth = T.AwsAuthSigv4({ name: "sms-voice" });
const ver = T.ServiceVersion("2018-09-05");
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
              `https://sms-voice.pinpoint-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://sms-voice.pinpoint-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://sms-voice.pinpoint.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://sms-voice.pinpoint.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class AlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<AlreadyExistsException>()(
    "AlreadyExistsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError, C.withAlreadyExistsError) {}
export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InternalServiceErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalServiceErrorException>()(
    "InternalServiceErrorException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(412),
  ) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export type WordCharactersWithDelimiters = string;
export interface CreateConfigurationSetRequest {
  ConfigurationSetName?: string;
}
export const CreateConfigurationSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ConfigurationSetName: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/sms-voice/configuration-sets" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateConfigurationSetRequest",
}) as any as S.Schema<CreateConfigurationSetRequest>;
export interface CreateConfigurationSetResponse {}
export const CreateConfigurationSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CreateConfigurationSetResponse",
}) as any as S.Schema<CreateConfigurationSetResponse>;
export interface CloudWatchLogsDestination {
  IamRoleArn?: string;
  LogGroupArn?: string;
}
export const CloudWatchLogsDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IamRoleArn: S.optional(S.String),
    LogGroupArn: S.optional(S.String),
  }),
).annotate({
  identifier: "CloudWatchLogsDestination",
}) as any as S.Schema<CloudWatchLogsDestination>;
export interface KinesisFirehoseDestination {
  DeliveryStreamArn?: string;
  IamRoleArn?: string;
}
export const KinesisFirehoseDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeliveryStreamArn: S.optional(S.String),
    IamRoleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "KinesisFirehoseDestination",
}) as any as S.Schema<KinesisFirehoseDestination>;
export type EventType =
  | "INITIATED_CALL"
  | "RINGING"
  | "ANSWERED"
  | "COMPLETED_CALL"
  | "BUSY"
  | "FAILED"
  | "NO_ANSWER"
  | (string & {});
export const EventType = S.String;

export type EventTypes = EventType[];
export const EventTypes = /*@__PURE__*/ S.Array(EventType);
export interface SnsDestination {
  TopicArn?: string;
}
export const SnsDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TopicArn: S.optional(S.String) }),
).annotate({ identifier: "SnsDestination" }) as any as S.Schema<SnsDestination>;
export interface EventDestinationDefinition {
  CloudWatchLogsDestination?: CloudWatchLogsDestination;
  Enabled?: boolean;
  KinesisFirehoseDestination?: KinesisFirehoseDestination;
  MatchingEventTypes?: EventType[];
  SnsDestination?: SnsDestination;
}
export const EventDestinationDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CloudWatchLogsDestination: S.optional(CloudWatchLogsDestination),
    Enabled: S.optional(S.Boolean),
    KinesisFirehoseDestination: S.optional(KinesisFirehoseDestination),
    MatchingEventTypes: S.optional(EventTypes),
    SnsDestination: S.optional(SnsDestination),
  }),
).annotate({
  identifier: "EventDestinationDefinition",
}) as any as S.Schema<EventDestinationDefinition>;
export type NonEmptyString = string;
export interface CreateConfigurationSetEventDestinationRequest {
  ConfigurationSetName: string;
  EventDestination?: EventDestinationDefinition;
  EventDestinationName?: string;
}
export const CreateConfigurationSetEventDestinationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ConfigurationSetName: S.String.pipe(T.HttpLabel("ConfigurationSetName")),
      EventDestination: S.optional(EventDestinationDefinition),
      EventDestinationName: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/v1/sms-voice/configuration-sets/{ConfigurationSetName}/event-destinations",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "CreateConfigurationSetEventDestinationRequest",
  }) as any as S.Schema<CreateConfigurationSetEventDestinationRequest>;
export interface CreateConfigurationSetEventDestinationResponse {}
export const CreateConfigurationSetEventDestinationResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "CreateConfigurationSetEventDestinationResponse",
  }) as any as S.Schema<CreateConfigurationSetEventDestinationResponse>;
export interface DeleteConfigurationSetRequest {
  ConfigurationSetName: string;
}
export const DeleteConfigurationSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationSetName: S.String.pipe(T.HttpLabel("ConfigurationSetName")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v1/sms-voice/configuration-sets/{ConfigurationSetName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteConfigurationSetRequest",
}) as any as S.Schema<DeleteConfigurationSetRequest>;
export interface DeleteConfigurationSetResponse {}
export const DeleteConfigurationSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteConfigurationSetResponse",
}) as any as S.Schema<DeleteConfigurationSetResponse>;
export interface DeleteConfigurationSetEventDestinationRequest {
  ConfigurationSetName: string;
  EventDestinationName: string;
}
export const DeleteConfigurationSetEventDestinationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ConfigurationSetName: S.String.pipe(T.HttpLabel("ConfigurationSetName")),
      EventDestinationName: S.String.pipe(T.HttpLabel("EventDestinationName")),
    }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/v1/sms-voice/configuration-sets/{ConfigurationSetName}/event-destinations/{EventDestinationName}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DeleteConfigurationSetEventDestinationRequest",
  }) as any as S.Schema<DeleteConfigurationSetEventDestinationRequest>;
export interface DeleteConfigurationSetEventDestinationResponse {}
export const DeleteConfigurationSetEventDestinationResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "DeleteConfigurationSetEventDestinationResponse",
  }) as any as S.Schema<DeleteConfigurationSetEventDestinationResponse>;
export interface GetConfigurationSetEventDestinationsRequest {
  ConfigurationSetName: string;
}
export const GetConfigurationSetEventDestinationsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ConfigurationSetName: S.String.pipe(T.HttpLabel("ConfigurationSetName")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/v1/sms-voice/configuration-sets/{ConfigurationSetName}/event-destinations",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "GetConfigurationSetEventDestinationsRequest",
  }) as any as S.Schema<GetConfigurationSetEventDestinationsRequest>;
export interface EventDestination {
  CloudWatchLogsDestination?: CloudWatchLogsDestination;
  Enabled?: boolean;
  KinesisFirehoseDestination?: KinesisFirehoseDestination;
  MatchingEventTypes?: EventType[];
  Name?: string;
  SnsDestination?: SnsDestination;
}
export const EventDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CloudWatchLogsDestination: S.optional(CloudWatchLogsDestination),
    Enabled: S.optional(S.Boolean),
    KinesisFirehoseDestination: S.optional(KinesisFirehoseDestination),
    MatchingEventTypes: S.optional(EventTypes),
    Name: S.optional(S.String),
    SnsDestination: S.optional(SnsDestination),
  }),
).annotate({
  identifier: "EventDestination",
}) as any as S.Schema<EventDestination>;
export type EventDestinations = EventDestination[];
export const EventDestinations = /*@__PURE__*/ S.Array(EventDestination);
export interface GetConfigurationSetEventDestinationsResponse {
  EventDestinations?: EventDestination[];
}
export const GetConfigurationSetEventDestinationsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ EventDestinations: S.optional(EventDestinations) }),
  ).annotate({
    identifier: "GetConfigurationSetEventDestinationsResponse",
  }) as any as S.Schema<GetConfigurationSetEventDestinationsResponse>;
export interface ListConfigurationSetsRequest {
  NextToken?: string;
  PageSize?: string;
}
export const ListConfigurationSetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    PageSize: S.optional(S.String).pipe(T.HttpQuery("PageSize")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/sms-voice/configuration-sets" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListConfigurationSetsRequest",
}) as any as S.Schema<ListConfigurationSetsRequest>;
export type ConfigurationSets = string[];
export const ConfigurationSets = /*@__PURE__*/ S.Array(S.String);
export type NextTokenString = string;
export interface ListConfigurationSetsResponse {
  ConfigurationSets?: string[];
  NextToken?: string;
}
export const ListConfigurationSetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationSets: S.optional(ConfigurationSets),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListConfigurationSetsResponse",
}) as any as S.Schema<ListConfigurationSetsResponse>;
export interface CallInstructionsMessageType {
  Text?: string;
}
export const CallInstructionsMessageType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Text: S.optional(S.String) }),
).annotate({
  identifier: "CallInstructionsMessageType",
}) as any as S.Schema<CallInstructionsMessageType>;
export interface PlainTextMessageType {
  LanguageCode?: string;
  Text?: string;
  VoiceId?: string;
}
export const PlainTextMessageType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LanguageCode: S.optional(S.String),
    Text: S.optional(S.String),
    VoiceId: S.optional(S.String),
  }),
).annotate({
  identifier: "PlainTextMessageType",
}) as any as S.Schema<PlainTextMessageType>;
export interface SSMLMessageType {
  LanguageCode?: string;
  Text?: string;
  VoiceId?: string;
}
export const SSMLMessageType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LanguageCode: S.optional(S.String),
    Text: S.optional(S.String),
    VoiceId: S.optional(S.String),
  }),
).annotate({
  identifier: "SSMLMessageType",
}) as any as S.Schema<SSMLMessageType>;
export interface VoiceMessageContent {
  CallInstructionsMessage?: CallInstructionsMessageType;
  PlainTextMessage?: PlainTextMessageType;
  SSMLMessage?: SSMLMessageType;
}
export const VoiceMessageContent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CallInstructionsMessage: S.optional(CallInstructionsMessageType),
    PlainTextMessage: S.optional(PlainTextMessageType),
    SSMLMessage: S.optional(SSMLMessageType),
  }),
).annotate({
  identifier: "VoiceMessageContent",
}) as any as S.Schema<VoiceMessageContent>;
export interface SendVoiceMessageRequest {
  CallerId?: string;
  ConfigurationSetName?: string;
  Content?: VoiceMessageContent;
  DestinationPhoneNumber?: string;
  OriginationPhoneNumber?: string;
}
export const SendVoiceMessageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CallerId: S.optional(S.String),
    ConfigurationSetName: S.optional(S.String),
    Content: S.optional(VoiceMessageContent),
    DestinationPhoneNumber: S.optional(S.String),
    OriginationPhoneNumber: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/sms-voice/voice/message" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SendVoiceMessageRequest",
}) as any as S.Schema<SendVoiceMessageRequest>;
export interface SendVoiceMessageResponse {
  MessageId?: string;
}
export const SendVoiceMessageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MessageId: S.optional(S.String) }),
).annotate({
  identifier: "SendVoiceMessageResponse",
}) as any as S.Schema<SendVoiceMessageResponse>;
export interface UpdateConfigurationSetEventDestinationRequest {
  ConfigurationSetName: string;
  EventDestination?: EventDestinationDefinition;
  EventDestinationName: string;
}
export const UpdateConfigurationSetEventDestinationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ConfigurationSetName: S.String.pipe(T.HttpLabel("ConfigurationSetName")),
      EventDestination: S.optional(EventDestinationDefinition),
      EventDestinationName: S.String.pipe(T.HttpLabel("EventDestinationName")),
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v1/sms-voice/configuration-sets/{ConfigurationSetName}/event-destinations/{EventDestinationName}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "UpdateConfigurationSetEventDestinationRequest",
  }) as any as S.Schema<UpdateConfigurationSetEventDestinationRequest>;
export interface UpdateConfigurationSetEventDestinationResponse {}
export const UpdateConfigurationSetEventDestinationResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "UpdateConfigurationSetEventDestinationResponse",
  }) as any as S.Schema<UpdateConfigurationSetEventDestinationResponse>;
export type CreateConfigurationSetError =
  | AlreadyExistsException
  | BadRequestException
  | InternalServiceErrorException
  | LimitExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Create a new configuration set. After you create the configuration set, you can add one or more event destinations to it.
 */
export const createConfigurationSet: API.OperationMethod<
  CreateConfigurationSetRequest,
  CreateConfigurationSetResponse,
  CreateConfigurationSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateConfigurationSetRequest,
  output: CreateConfigurationSetResponse,
  errors: [
    AlreadyExistsException,
    BadRequestException,
    InternalServiceErrorException,
    LimitExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConfigurationSet",
}));

export type CreateConfigurationSetEventDestinationError =
  | AlreadyExistsException
  | BadRequestException
  | InternalServiceErrorException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Create a new event destination in a configuration set.
 */
export const createConfigurationSetEventDestination: API.OperationMethod<
  CreateConfigurationSetEventDestinationRequest,
  CreateConfigurationSetEventDestinationResponse,
  CreateConfigurationSetEventDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateConfigurationSetEventDestinationRequest,
  output: CreateConfigurationSetEventDestinationResponse,
  errors: [
    AlreadyExistsException,
    BadRequestException,
    InternalServiceErrorException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConfigurationSetEventDestination",
}));

export type DeleteConfigurationSetError =
  | BadRequestException
  | InternalServiceErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an existing configuration set.
 */
export const deleteConfigurationSet: API.OperationMethod<
  DeleteConfigurationSetRequest,
  DeleteConfigurationSetResponse,
  DeleteConfigurationSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteConfigurationSetRequest,
  output: DeleteConfigurationSetResponse,
  errors: [
    BadRequestException,
    InternalServiceErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfigurationSet",
}));

export type DeleteConfigurationSetEventDestinationError =
  | BadRequestException
  | InternalServiceErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an event destination in a configuration set.
 */
export const deleteConfigurationSetEventDestination: API.OperationMethod<
  DeleteConfigurationSetEventDestinationRequest,
  DeleteConfigurationSetEventDestinationResponse,
  DeleteConfigurationSetEventDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteConfigurationSetEventDestinationRequest,
  output: DeleteConfigurationSetEventDestinationResponse,
  errors: [
    BadRequestException,
    InternalServiceErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfigurationSetEventDestination",
}));

export type GetConfigurationSetEventDestinationsError =
  | BadRequestException
  | InternalServiceErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Obtain information about an event destination, including the types of events it reports, the Amazon Resource Name (ARN) of the destination, and the name of the event destination.
 */
export const getConfigurationSetEventDestinations: API.OperationMethod<
  GetConfigurationSetEventDestinationsRequest,
  GetConfigurationSetEventDestinationsResponse,
  GetConfigurationSetEventDestinationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetConfigurationSetEventDestinationsRequest,
  output: GetConfigurationSetEventDestinationsResponse,
  errors: [
    BadRequestException,
    InternalServiceErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfigurationSetEventDestinations",
}));

export type ListConfigurationSetsError =
  | BadRequestException
  | InternalServiceErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * List all of the configuration sets associated with your Amazon Pinpoint account in the current region.
 */
export const listConfigurationSets: API.OperationMethod<
  ListConfigurationSetsRequest,
  ListConfigurationSetsResponse,
  ListConfigurationSetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListConfigurationSetsRequest,
  output: ListConfigurationSetsResponse,
  errors: [
    BadRequestException,
    InternalServiceErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConfigurationSets",
}));

export type SendVoiceMessageError =
  | BadRequestException
  | InternalServiceErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Create a new voice message and send it to a recipient's phone number.
 */
export const sendVoiceMessage: API.OperationMethod<
  SendVoiceMessageRequest,
  SendVoiceMessageResponse,
  SendVoiceMessageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SendVoiceMessageRequest,
  output: SendVoiceMessageResponse,
  errors: [
    BadRequestException,
    InternalServiceErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendVoiceMessage",
}));

export type UpdateConfigurationSetEventDestinationError =
  | BadRequestException
  | InternalServiceErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Update an event destination in a configuration set. An event destination is a location that you publish information about your voice calls to. For example, you can log an event to an Amazon CloudWatch destination when a call fails.
 */
export const updateConfigurationSetEventDestination: API.OperationMethod<
  UpdateConfigurationSetEventDestinationRequest,
  UpdateConfigurationSetEventDestinationResponse,
  UpdateConfigurationSetEventDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateConfigurationSetEventDestinationRequest,
  output: UpdateConfigurationSetEventDestinationResponse,
  errors: [
    BadRequestException,
    InternalServiceErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConfigurationSetEventDestination",
}));
