import * as HttpClient from "effect/unstable/http/HttpClient";
import * as redacted from "effect/Redacted";
import * as S from "@distilled.cloud/core/schema";
import * as stream from "effect/Stream";
import * as API from "@distilled.cloud/core/api";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { SensitiveString } from "../sensitive.ts";
const svc = T.AwsApiService({
  sdkId: "Lex Runtime V2",
  serviceShapeName: "AWSDeepSenseRunTimeServiceApi2_0",
});
const auth = T.AwsAuthSigv4({ name: "lex" });
const ver = T.ServiceVersion("2020-08-07");
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
              `https://runtime-v2-lex-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://runtime-v2-lex-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://runtime-v2-lex.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://runtime-v2-lex.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class BadGatewayException
  extends /*@__PURE__*/ S.TaggedError<BadGatewayException>()(
    "BadGatewayException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(502),
  ).pipe(C.withServerError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class DependencyFailedException
  extends /*@__PURE__*/ S.TaggedError<DependencyFailedException>()(
    "DependencyFailedException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(424),
  ) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type BotIdentifier = string;
export type BotAliasIdentifier = string;
export type LocaleId = string;
export type SessionId = string;
export interface DeleteSessionRequest {
  botId: string;
  botAliasId: string;
  localeId: string;
  sessionId: string;
}
export const DeleteSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.String.pipe(T.HttpLabel("botId")),
    botAliasId: S.String.pipe(T.HttpLabel("botAliasId")),
    localeId: S.String.pipe(T.HttpLabel("localeId")),
    sessionId: S.String.pipe(T.HttpLabel("sessionId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/bots/{botId}/botAliases/{botAliasId}/botLocales/{localeId}/sessions/{sessionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSessionRequest",
}) as any as S.Schema<DeleteSessionRequest>;
export interface DeleteSessionResponse {
  botId?: string;
  botAliasId?: string;
  localeId?: string;
  sessionId?: string;
}
export const DeleteSessionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.optional(S.String),
    botAliasId: S.optional(S.String),
    localeId: S.optional(S.String),
    sessionId: S.optional(S.String),
  }),
).annotate({
  identifier: "DeleteSessionResponse",
}) as any as S.Schema<DeleteSessionResponse>;
export interface GetSessionRequest {
  botId: string;
  botAliasId: string;
  localeId: string;
  sessionId: string;
}
export const GetSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.String.pipe(T.HttpLabel("botId")),
    botAliasId: S.String.pipe(T.HttpLabel("botAliasId")),
    localeId: S.String.pipe(T.HttpLabel("localeId")),
    sessionId: S.String.pipe(T.HttpLabel("sessionId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/bots/{botId}/botAliases/{botAliasId}/botLocales/{localeId}/sessions/{sessionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSessionRequest",
}) as any as S.Schema<GetSessionRequest>;
export type NonEmptyString = string;
export type Text = string | redacted.Redacted<string>;
export type MessageContentType =
  | "CustomPayload"
  | "ImageResponseCard"
  | "PlainText"
  | "SSML"
  | (string & {});
export const MessageContentType = S.String;

export type AttachmentTitle = string;
export type AttachmentUrl = string;
export type ButtonText = string;
export type ButtonValue = string;
export interface Button {
  text: string;
  value: string;
}
export const Button = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ text: S.String, value: S.String }),
).annotate({ identifier: "Button" }) as any as S.Schema<Button>;
export type ButtonsList = Button[];
export const ButtonsList = /*@__PURE__*/ S.Array(Button);
export interface ImageResponseCard {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  buttons?: Button[];
}
export const ImageResponseCard = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    title: S.String,
    subtitle: S.optional(S.String),
    imageUrl: S.optional(S.String),
    buttons: S.optional(ButtonsList),
  }),
).annotate({
  identifier: "ImageResponseCard",
}) as any as S.Schema<ImageResponseCard>;
export interface Message {
  content?: string | redacted.Redacted<string>;
  contentType: MessageContentType;
  imageResponseCard?: ImageResponseCard;
}
export const Message = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    content: S.optional(SensitiveString),
    contentType: MessageContentType,
    imageResponseCard: S.optional(ImageResponseCard),
  }),
).annotate({ identifier: "Message" }) as any as S.Schema<Message>;
export type Messages = Message[];
export const Messages = /*@__PURE__*/ S.Array(Message);
export interface ConfidenceScore {
  score?: number;
}
export const ConfidenceScore = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ score: S.optional(S.Number) }),
).annotate({
  identifier: "ConfidenceScore",
}) as any as S.Schema<ConfidenceScore>;
export type SentimentType =
  | "MIXED"
  | "NEGATIVE"
  | "NEUTRAL"
  | "POSITIVE"
  | (string & {});
export const SentimentType = S.String;

export interface SentimentScore {
  positive?: number;
  negative?: number;
  neutral?: number;
  mixed?: number;
}
export const SentimentScore = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    positive: S.optional(S.Number),
    negative: S.optional(S.Number),
    neutral: S.optional(S.Number),
    mixed: S.optional(S.Number),
  }),
).annotate({ identifier: "SentimentScore" }) as any as S.Schema<SentimentScore>;
export interface SentimentResponse {
  sentiment?: SentimentType;
  sentimentScore?: SentimentScore;
}
export const SentimentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sentiment: S.optional(SentimentType),
    sentimentScore: S.optional(SentimentScore),
  }),
).annotate({
  identifier: "SentimentResponse",
}) as any as S.Schema<SentimentResponse>;
export type StringList = string[];
export const StringList = /*@__PURE__*/ S.Array(S.String);
export interface Value {
  originalValue?: string;
  interpretedValue: string;
  resolvedValues?: string[];
}
export const Value = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    originalValue: S.optional(S.String),
    interpretedValue: S.String,
    resolvedValues: S.optional(StringList),
  }),
).annotate({ identifier: "Value" }) as any as S.Schema<Value>;
export type Shape = "Scalar" | "List" | "Composite" | (string & {});
export const Shape = S.String;

export type Values = Slot[];
export const Values = /*@__PURE__*/ S.Array(
  S.suspend((): S.Schema<Slot> => Slot).annotate({ identifier: "Slot" }),
) as any as S.Schema<Values>;
export interface Slot {
  value?: Value;
  shape?: Shape;
  values?: Slot[];
  subSlots?: { [key: string]: Slot | undefined };
}
export const Slot = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    value: S.optional(Value),
    shape: S.optional(Shape),
    values: S.optional(
      S.suspend(() => Values).annotate({ identifier: "Values" }),
    ),
    subSlots: S.optional(
      S.suspend(() => Slots).annotate({ identifier: "Slots" }),
    ),
  }),
).annotate({ identifier: "Slot" }) as any as S.Schema<Slot>;
export type Slots = { [key: string]: Slot | undefined };
export const Slots = /*@__PURE__*/ S.Record(
  S.String,
  S.suspend((): S.Schema<Slot> => Slot)
    .annotate({ identifier: "Slot" })
    .pipe(S.optional),
) as any as S.Schema<Slots>;
export type IntentState =
  | "Failed"
  | "Fulfilled"
  | "InProgress"
  | "ReadyForFulfillment"
  | "Waiting"
  | "FulfillmentInProgress"
  | (string & {});
export const IntentState = S.String;

export type ConfirmationState = "Confirmed" | "Denied" | "None" | (string & {});
export const ConfirmationState = S.String;

export interface Intent {
  name: string;
  slots?: { [key: string]: Slot | undefined };
  state?: IntentState;
  confirmationState?: ConfirmationState;
}
export const Intent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    slots: S.optional(Slots),
    state: S.optional(IntentState),
    confirmationState: S.optional(ConfirmationState),
  }),
).annotate({ identifier: "Intent" }) as any as S.Schema<Intent>;
export type InterpretationSource = "Bedrock" | "Lex" | (string & {});
export const InterpretationSource = S.String;

export interface Interpretation {
  nluConfidence?: ConfidenceScore;
  sentimentResponse?: SentimentResponse;
  intent?: Intent;
  interpretationSource?: InterpretationSource;
}
export const Interpretation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nluConfidence: S.optional(ConfidenceScore),
    sentimentResponse: S.optional(SentimentResponse),
    intent: S.optional(Intent),
    interpretationSource: S.optional(InterpretationSource),
  }),
).annotate({ identifier: "Interpretation" }) as any as S.Schema<Interpretation>;
export type Interpretations = Interpretation[];
export const Interpretations = /*@__PURE__*/ S.Array(Interpretation);
export type DialogActionType =
  | "Close"
  | "ConfirmIntent"
  | "Delegate"
  | "ElicitIntent"
  | "ElicitSlot"
  | "None"
  | (string & {});
export const DialogActionType = S.String;

export type StyleType =
  | "Default"
  | "SpellByLetter"
  | "SpellByWord"
  | (string & {});
export const StyleType = S.String;

export interface ElicitSubSlot {
  name: string;
  subSlotToElicit?: ElicitSubSlot;
}
export const ElicitSubSlot = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    subSlotToElicit: S.optional(
      S.suspend((): S.Schema<ElicitSubSlot> => ElicitSubSlot).annotate({
        identifier: "ElicitSubSlot",
      }),
    ),
  }),
).annotate({ identifier: "ElicitSubSlot" }) as any as S.Schema<ElicitSubSlot>;
export interface DialogAction {
  type: DialogActionType;
  slotToElicit?: string;
  slotElicitationStyle?: StyleType;
  subSlotToElicit?: ElicitSubSlot;
}
export const DialogAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: DialogActionType,
    slotToElicit: S.optional(S.String),
    slotElicitationStyle: S.optional(StyleType),
    subSlotToElicit: S.optional(ElicitSubSlot),
  }),
).annotate({ identifier: "DialogAction" }) as any as S.Schema<DialogAction>;
export type ActiveContextName = string;
export type ActiveContextTimeToLiveInSeconds = number;
export type ActiveContextTurnsToLive = number;
export interface ActiveContextTimeToLive {
  timeToLiveInSeconds: number;
  turnsToLive: number;
}
export const ActiveContextTimeToLive = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ timeToLiveInSeconds: S.Number, turnsToLive: S.Number }),
).annotate({
  identifier: "ActiveContextTimeToLive",
}) as any as S.Schema<ActiveContextTimeToLive>;
export type ParameterName = string;
export type ActiveContextParametersMap = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export const ActiveContextParametersMap = /*@__PURE__*/ S.Record(
  S.String,
  SensitiveString.pipe(S.optional),
);
export interface ActiveContext {
  name: string;
  timeToLive: ActiveContextTimeToLive;
  contextAttributes: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
}
export const ActiveContext = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    timeToLive: ActiveContextTimeToLive,
    contextAttributes: ActiveContextParametersMap,
  }),
).annotate({ identifier: "ActiveContext" }) as any as S.Schema<ActiveContext>;
export type ActiveContextsList = ActiveContext[];
export const ActiveContextsList = /*@__PURE__*/ S.Array(ActiveContext);
export type StringMap = { [key: string]: string | undefined };
export const StringMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type Name = string;
export type RuntimeHintPhrase = string;
export interface RuntimeHintValue {
  phrase: string;
}
export const RuntimeHintValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ phrase: S.String }),
).annotate({
  identifier: "RuntimeHintValue",
}) as any as S.Schema<RuntimeHintValue>;
export type RuntimeHintValuesList = RuntimeHintValue[];
export const RuntimeHintValuesList = /*@__PURE__*/ S.Array(RuntimeHintValue);
export interface RuntimeHintDetails {
  runtimeHintValues?: RuntimeHintValue[];
  subSlotHints?: { [key: string]: RuntimeHintDetails | undefined };
}
export const RuntimeHintDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    runtimeHintValues: S.optional(RuntimeHintValuesList),
    subSlotHints: S.optional(
      S.suspend(() => SlotHintsSlotMap).annotate({
        identifier: "SlotHintsSlotMap",
      }),
    ),
  }),
).annotate({
  identifier: "RuntimeHintDetails",
}) as any as S.Schema<RuntimeHintDetails>;
export type SlotHintsSlotMap = {
  [key: string]: RuntimeHintDetails | undefined;
};
export const SlotHintsSlotMap = /*@__PURE__*/ S.Record(
  S.String,
  S.suspend((): S.Schema<RuntimeHintDetails> => RuntimeHintDetails)
    .annotate({ identifier: "RuntimeHintDetails" })
    .pipe(S.optional),
) as any as S.Schema<SlotHintsSlotMap>;
export type SlotHintsIntentMap = {
  [key: string]: { [key: string]: RuntimeHintDetails | undefined } | undefined;
};
export const SlotHintsIntentMap = /*@__PURE__*/ S.Record(
  S.String,
  S.suspend(() => SlotHintsSlotMap)
    .annotate({ identifier: "SlotHintsSlotMap" })
    .pipe(S.optional),
);
export interface RuntimeHints {
  slotHints?: {
    [key: string]:
      | { [key: string]: RuntimeHintDetails | undefined }
      | undefined;
  };
}
export const RuntimeHints = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ slotHints: S.optional(SlotHintsIntentMap) }),
).annotate({ identifier: "RuntimeHints" }) as any as S.Schema<RuntimeHints>;
export interface SessionState {
  dialogAction?: DialogAction;
  intent?: Intent;
  activeContexts?: ActiveContext[];
  sessionAttributes?: { [key: string]: string | undefined };
  originatingRequestId?: string;
  runtimeHints?: RuntimeHints;
}
export const SessionState = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dialogAction: S.optional(DialogAction),
    intent: S.optional(Intent),
    activeContexts: S.optional(ActiveContextsList),
    sessionAttributes: S.optional(StringMap),
    originatingRequestId: S.optional(S.String),
    runtimeHints: S.optional(RuntimeHints),
  }),
).annotate({ identifier: "SessionState" }) as any as S.Schema<SessionState>;
export interface GetSessionResponse {
  sessionId?: string;
  messages?: Message[];
  interpretations?: Interpretation[];
  sessionState?: SessionState;
}
export const GetSessionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionId: S.optional(S.String),
    messages: S.optional(Messages),
    interpretations: S.optional(Interpretations),
    sessionState: S.optional(SessionState),
  }),
).annotate({
  identifier: "GetSessionResponse",
}) as any as S.Schema<GetSessionResponse>;
export interface PutSessionRequest {
  botId: string;
  botAliasId: string;
  localeId: string;
  sessionId: string;
  messages?: Message[];
  sessionState: SessionState;
  requestAttributes?: { [key: string]: string | undefined };
  responseContentType?: string;
}
export const PutSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.String.pipe(T.HttpLabel("botId")),
    botAliasId: S.String.pipe(T.HttpLabel("botAliasId")),
    localeId: S.String.pipe(T.HttpLabel("localeId")),
    sessionId: S.String.pipe(T.HttpLabel("sessionId")),
    messages: S.optional(Messages),
    sessionState: SessionState,
    requestAttributes: S.optional(StringMap),
    responseContentType: S.optional(S.String).pipe(
      T.HttpHeader("ResponseContentType"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/bots/{botId}/botAliases/{botAliasId}/botLocales/{localeId}/sessions/{sessionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutSessionRequest",
}) as any as S.Schema<PutSessionRequest>;
export interface PutSessionResponse {
  contentType?: string;
  messages?: string;
  sessionState?: string;
  requestAttributes?: string;
  sessionId?: string;
  audioStream?: T.StreamingOutputBody;
}
export const PutSessionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    contentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
    messages: S.optional(S.String).pipe(T.HttpHeader("x-amz-lex-messages")),
    sessionState: S.optional(S.String).pipe(
      T.HttpHeader("x-amz-lex-session-state"),
    ),
    requestAttributes: S.optional(S.String).pipe(
      T.HttpHeader("x-amz-lex-request-attributes"),
    ),
    sessionId: S.optional(S.String).pipe(T.HttpHeader("x-amz-lex-session-id")),
    audioStream: S.optional(T.StreamingOutput).pipe(T.HttpPayload()),
  }),
).annotate({
  identifier: "PutSessionResponse",
}) as any as S.Schema<PutSessionResponse>;
export interface RecognizeTextRequest {
  botId: string;
  botAliasId: string;
  localeId: string;
  sessionId: string;
  text: string | redacted.Redacted<string>;
  sessionState?: SessionState;
  requestAttributes?: { [key: string]: string | undefined };
}
export const RecognizeTextRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.String.pipe(T.HttpLabel("botId")),
    botAliasId: S.String.pipe(T.HttpLabel("botAliasId")),
    localeId: S.String.pipe(T.HttpLabel("localeId")),
    sessionId: S.String.pipe(T.HttpLabel("sessionId")),
    text: SensitiveString,
    sessionState: S.optional(SessionState),
    requestAttributes: S.optional(StringMap),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/bots/{botId}/botAliases/{botAliasId}/botLocales/{localeId}/sessions/{sessionId}/text",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RecognizeTextRequest",
}) as any as S.Schema<RecognizeTextRequest>;
export interface RecognizedBotMember {
  botId: string;
  botName?: string;
}
export const RecognizedBotMember = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ botId: S.String, botName: S.optional(S.String) }),
).annotate({
  identifier: "RecognizedBotMember",
}) as any as S.Schema<RecognizedBotMember>;
export interface RecognizeTextResponse {
  messages?: Message[];
  sessionState?: SessionState;
  interpretations?: Interpretation[];
  requestAttributes?: { [key: string]: string | undefined };
  sessionId?: string;
  recognizedBotMember?: RecognizedBotMember;
}
export const RecognizeTextResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    messages: S.optional(Messages),
    sessionState: S.optional(SessionState),
    interpretations: S.optional(Interpretations),
    requestAttributes: S.optional(StringMap),
    sessionId: S.optional(S.String),
    recognizedBotMember: S.optional(RecognizedBotMember),
  }),
).annotate({
  identifier: "RecognizeTextResponse",
}) as any as S.Schema<RecognizeTextResponse>;
export type SensitiveNonEmptyString = string | redacted.Redacted<string>;
export interface RecognizeUtteranceRequest {
  botId: string;
  botAliasId: string;
  localeId: string;
  sessionId: string;
  sessionState?: string | redacted.Redacted<string>;
  requestAttributes?: string | redacted.Redacted<string>;
  requestContentType: string;
  responseContentType?: string;
  inputStream?: T.StreamingInputBody;
}
export const RecognizeUtteranceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.String.pipe(T.HttpLabel("botId")),
    botAliasId: S.String.pipe(T.HttpLabel("botAliasId")),
    localeId: S.String.pipe(T.HttpLabel("localeId")),
    sessionId: S.String.pipe(T.HttpLabel("sessionId")),
    sessionState: S.optional(SensitiveString).pipe(
      T.HttpHeader("x-amz-lex-session-state"),
    ),
    requestAttributes: S.optional(SensitiveString).pipe(
      T.HttpHeader("x-amz-lex-request-attributes"),
    ),
    requestContentType: S.String.pipe(T.HttpHeader("Content-Type")),
    responseContentType: S.optional(S.String).pipe(
      T.HttpHeader("Response-Content-Type"),
    ),
    inputStream: S.optional(T.StreamingInput).pipe(T.HttpPayload()),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/bots/{botId}/botAliases/{botAliasId}/botLocales/{localeId}/sessions/{sessionId}/utterance",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RecognizeUtteranceRequest",
}) as any as S.Schema<RecognizeUtteranceRequest>;
export interface RecognizeUtteranceResponse {
  inputMode?: string;
  contentType?: string;
  messages?: string;
  interpretations?: string;
  sessionState?: string;
  requestAttributes?: string;
  sessionId?: string;
  inputTranscript?: string;
  audioStream?: T.StreamingOutputBody;
  recognizedBotMember?: string;
}
export const RecognizeUtteranceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    inputMode: S.optional(S.String).pipe(T.HttpHeader("x-amz-lex-input-mode")),
    contentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
    messages: S.optional(S.String).pipe(T.HttpHeader("x-amz-lex-messages")),
    interpretations: S.optional(S.String).pipe(
      T.HttpHeader("x-amz-lex-interpretations"),
    ),
    sessionState: S.optional(S.String).pipe(
      T.HttpHeader("x-amz-lex-session-state"),
    ),
    requestAttributes: S.optional(S.String).pipe(
      T.HttpHeader("x-amz-lex-request-attributes"),
    ),
    sessionId: S.optional(S.String).pipe(T.HttpHeader("x-amz-lex-session-id")),
    inputTranscript: S.optional(S.String).pipe(
      T.HttpHeader("x-amz-lex-input-transcript"),
    ),
    audioStream: S.optional(T.StreamingOutput).pipe(T.HttpPayload()),
    recognizedBotMember: S.optional(S.String).pipe(
      T.HttpHeader("x-amz-lex-recognized-bot-member"),
    ),
  }),
).annotate({
  identifier: "RecognizeUtteranceResponse",
}) as any as S.Schema<RecognizeUtteranceResponse>;
export type ConversationMode = "AUDIO" | "TEXT" | (string & {});
export const ConversationMode = S.String;

export type EventId = string;
export type EpochMillis = number;
export interface ConfigurationEvent {
  requestAttributes?: { [key: string]: string | undefined };
  responseContentType: string;
  sessionState?: SessionState;
  welcomeMessages?: Message[];
  disablePlayback?: boolean;
  eventId?: string;
  clientTimestampMillis?: number;
}
export const ConfigurationEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    requestAttributes: S.optional(StringMap),
    responseContentType: S.String,
    sessionState: S.optional(SessionState),
    welcomeMessages: S.optional(Messages),
    disablePlayback: S.optional(S.Boolean),
    eventId: S.optional(S.String),
    clientTimestampMillis: S.optional(S.Number),
  }),
).annotate({
  identifier: "ConfigurationEvent",
}) as any as S.Schema<ConfigurationEvent>;
export type AudioChunk = Uint8Array;
export interface AudioInputEvent {
  audioChunk?: Uint8Array;
  contentType: string;
  eventId?: string;
  clientTimestampMillis?: number;
}
export const AudioInputEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    audioChunk: S.optional(T.Blob),
    contentType: S.String,
    eventId: S.optional(S.String),
    clientTimestampMillis: S.optional(S.Number),
  }),
).annotate({
  identifier: "AudioInputEvent",
}) as any as S.Schema<AudioInputEvent>;
export type DTMFRegex = string | redacted.Redacted<string>;
export interface DTMFInputEvent {
  inputCharacter: string | redacted.Redacted<string>;
  eventId?: string;
  clientTimestampMillis?: number;
}
export const DTMFInputEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    inputCharacter: SensitiveString,
    eventId: S.optional(S.String),
    clientTimestampMillis: S.optional(S.Number),
  }),
).annotate({ identifier: "DTMFInputEvent" }) as any as S.Schema<DTMFInputEvent>;
export interface TextInputEvent {
  text: string | redacted.Redacted<string>;
  eventId?: string;
  clientTimestampMillis?: number;
}
export const TextInputEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    text: SensitiveString,
    eventId: S.optional(S.String),
    clientTimestampMillis: S.optional(S.Number),
  }),
).annotate({ identifier: "TextInputEvent" }) as any as S.Schema<TextInputEvent>;
export interface PlaybackCompletionEvent {
  eventId?: string;
  clientTimestampMillis?: number;
}
export const PlaybackCompletionEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    eventId: S.optional(S.String),
    clientTimestampMillis: S.optional(S.Number),
  }),
).annotate({
  identifier: "PlaybackCompletionEvent",
}) as any as S.Schema<PlaybackCompletionEvent>;
export interface DisconnectionEvent {
  eventId?: string;
  clientTimestampMillis?: number;
}
export const DisconnectionEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    eventId: S.optional(S.String),
    clientTimestampMillis: S.optional(S.Number),
  }),
).annotate({
  identifier: "DisconnectionEvent",
}) as any as S.Schema<DisconnectionEvent>;
export type StartConversationRequestEventStream =
  | {
      ConfigurationEvent: ConfigurationEvent;
      AudioInputEvent?: never;
      DTMFInputEvent?: never;
      TextInputEvent?: never;
      PlaybackCompletionEvent?: never;
      DisconnectionEvent?: never;
    }
  | {
      ConfigurationEvent?: never;
      AudioInputEvent: AudioInputEvent;
      DTMFInputEvent?: never;
      TextInputEvent?: never;
      PlaybackCompletionEvent?: never;
      DisconnectionEvent?: never;
    }
  | {
      ConfigurationEvent?: never;
      AudioInputEvent?: never;
      DTMFInputEvent: DTMFInputEvent;
      TextInputEvent?: never;
      PlaybackCompletionEvent?: never;
      DisconnectionEvent?: never;
    }
  | {
      ConfigurationEvent?: never;
      AudioInputEvent?: never;
      DTMFInputEvent?: never;
      TextInputEvent: TextInputEvent;
      PlaybackCompletionEvent?: never;
      DisconnectionEvent?: never;
    }
  | {
      ConfigurationEvent?: never;
      AudioInputEvent?: never;
      DTMFInputEvent?: never;
      TextInputEvent?: never;
      PlaybackCompletionEvent: PlaybackCompletionEvent;
      DisconnectionEvent?: never;
    }
  | {
      ConfigurationEvent?: never;
      AudioInputEvent?: never;
      DTMFInputEvent?: never;
      TextInputEvent?: never;
      PlaybackCompletionEvent?: never;
      DisconnectionEvent: DisconnectionEvent;
    };
export const StartConversationRequestEventStream =
  /*@__PURE__*/ T.InputEventStream(
    S.Union([
      S.Struct({ ConfigurationEvent: ConfigurationEvent }),
      S.Struct({ AudioInputEvent: AudioInputEvent }),
      S.Struct({ DTMFInputEvent: DTMFInputEvent }),
      S.Struct({ TextInputEvent: TextInputEvent }),
      S.Struct({ PlaybackCompletionEvent: PlaybackCompletionEvent }),
      S.Struct({ DisconnectionEvent: DisconnectionEvent }),
    ]),
  ) as any as S.Schema<
    stream.Stream<StartConversationRequestEventStream, Error, never>
  >;
export interface StartConversationRequest {
  botId: string;
  botAliasId: string;
  localeId: string;
  sessionId: string;
  conversationMode?: ConversationMode;
  requestEventStream: stream.Stream<
    StartConversationRequestEventStream,
    Error,
    never
  >;
}
export const StartConversationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.String.pipe(T.HttpLabel("botId")),
    botAliasId: S.String.pipe(T.HttpLabel("botAliasId")),
    localeId: S.String.pipe(T.HttpLabel("localeId")),
    sessionId: S.String.pipe(T.HttpLabel("sessionId")),
    conversationMode: S.optional(ConversationMode).pipe(
      T.HttpHeader("x-amz-lex-conversation-mode"),
    ),
    requestEventStream: StartConversationRequestEventStream.pipe(
      T.HttpPayload(),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/bots/{botId}/botAliases/{botAliasId}/botLocales/{localeId}/sessions/{sessionId}/conversation",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartConversationRequest",
}) as any as S.Schema<StartConversationRequest>;
export type PlaybackInterruptionReason =
  | "DTMF_START_DETECTED"
  | "TEXT_DETECTED"
  | "VOICE_START_DETECTED"
  | (string & {});
export const PlaybackInterruptionReason = S.String;

export interface PlaybackInterruptionEvent {
  eventReason?: PlaybackInterruptionReason;
  causedByEventId?: string;
  eventId?: string;
}
export const PlaybackInterruptionEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    eventReason: S.optional(PlaybackInterruptionReason),
    causedByEventId: S.optional(S.String),
    eventId: S.optional(S.String),
  }),
).annotate({
  identifier: "PlaybackInterruptionEvent",
}) as any as S.Schema<PlaybackInterruptionEvent>;
export interface TranscriptEvent {
  transcript?: string;
  eventId?: string;
}
export const TranscriptEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ transcript: S.optional(S.String), eventId: S.optional(S.String) }),
).annotate({
  identifier: "TranscriptEvent",
}) as any as S.Schema<TranscriptEvent>;
export type InputMode = "Text" | "Speech" | "DTMF" | (string & {});
export const InputMode = S.String;

export interface IntentResultEvent {
  inputMode?: InputMode;
  interpretations?: Interpretation[];
  sessionState?: SessionState;
  requestAttributes?: { [key: string]: string | undefined };
  sessionId?: string;
  eventId?: string;
  recognizedBotMember?: RecognizedBotMember;
}
export const IntentResultEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    inputMode: S.optional(InputMode),
    interpretations: S.optional(Interpretations),
    sessionState: S.optional(SessionState),
    requestAttributes: S.optional(StringMap),
    sessionId: S.optional(S.String),
    eventId: S.optional(S.String),
    recognizedBotMember: S.optional(RecognizedBotMember),
  }),
).annotate({
  identifier: "IntentResultEvent",
}) as any as S.Schema<IntentResultEvent>;
export interface TextResponseEvent {
  messages?: Message[];
  eventId?: string;
}
export const TextResponseEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ messages: S.optional(Messages), eventId: S.optional(S.String) }),
).annotate({
  identifier: "TextResponseEvent",
}) as any as S.Schema<TextResponseEvent>;
export interface AudioResponseEvent {
  audioChunk?: Uint8Array;
  contentType?: string;
  eventId?: string;
}
export const AudioResponseEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    audioChunk: S.optional(T.Blob),
    contentType: S.optional(S.String),
    eventId: S.optional(S.String),
  }),
).annotate({
  identifier: "AudioResponseEvent",
}) as any as S.Schema<AudioResponseEvent>;
export interface HeartbeatEvent {
  eventId?: string;
}
export const HeartbeatEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ eventId: S.optional(S.String) }),
).annotate({ identifier: "HeartbeatEvent" }) as any as S.Schema<HeartbeatEvent>;
export type StartConversationResponseEventStream =
  | {
      PlaybackInterruptionEvent: PlaybackInterruptionEvent;
      TranscriptEvent?: never;
      IntentResultEvent?: never;
      TextResponseEvent?: never;
      AudioResponseEvent?: never;
      HeartbeatEvent?: never;
      AccessDeniedException?: never;
      ResourceNotFoundException?: never;
      ValidationException?: never;
      ThrottlingException?: never;
      InternalServerException?: never;
      ConflictException?: never;
      DependencyFailedException?: never;
      BadGatewayException?: never;
    }
  | {
      PlaybackInterruptionEvent?: never;
      TranscriptEvent: TranscriptEvent;
      IntentResultEvent?: never;
      TextResponseEvent?: never;
      AudioResponseEvent?: never;
      HeartbeatEvent?: never;
      AccessDeniedException?: never;
      ResourceNotFoundException?: never;
      ValidationException?: never;
      ThrottlingException?: never;
      InternalServerException?: never;
      ConflictException?: never;
      DependencyFailedException?: never;
      BadGatewayException?: never;
    }
  | {
      PlaybackInterruptionEvent?: never;
      TranscriptEvent?: never;
      IntentResultEvent: IntentResultEvent;
      TextResponseEvent?: never;
      AudioResponseEvent?: never;
      HeartbeatEvent?: never;
      AccessDeniedException?: never;
      ResourceNotFoundException?: never;
      ValidationException?: never;
      ThrottlingException?: never;
      InternalServerException?: never;
      ConflictException?: never;
      DependencyFailedException?: never;
      BadGatewayException?: never;
    }
  | {
      PlaybackInterruptionEvent?: never;
      TranscriptEvent?: never;
      IntentResultEvent?: never;
      TextResponseEvent: TextResponseEvent;
      AudioResponseEvent?: never;
      HeartbeatEvent?: never;
      AccessDeniedException?: never;
      ResourceNotFoundException?: never;
      ValidationException?: never;
      ThrottlingException?: never;
      InternalServerException?: never;
      ConflictException?: never;
      DependencyFailedException?: never;
      BadGatewayException?: never;
    }
  | {
      PlaybackInterruptionEvent?: never;
      TranscriptEvent?: never;
      IntentResultEvent?: never;
      TextResponseEvent?: never;
      AudioResponseEvent: AudioResponseEvent;
      HeartbeatEvent?: never;
      AccessDeniedException?: never;
      ResourceNotFoundException?: never;
      ValidationException?: never;
      ThrottlingException?: never;
      InternalServerException?: never;
      ConflictException?: never;
      DependencyFailedException?: never;
      BadGatewayException?: never;
    }
  | {
      PlaybackInterruptionEvent?: never;
      TranscriptEvent?: never;
      IntentResultEvent?: never;
      TextResponseEvent?: never;
      AudioResponseEvent?: never;
      HeartbeatEvent: HeartbeatEvent;
      AccessDeniedException?: never;
      ResourceNotFoundException?: never;
      ValidationException?: never;
      ThrottlingException?: never;
      InternalServerException?: never;
      ConflictException?: never;
      DependencyFailedException?: never;
      BadGatewayException?: never;
    }
  | {
      PlaybackInterruptionEvent?: never;
      TranscriptEvent?: never;
      IntentResultEvent?: never;
      TextResponseEvent?: never;
      AudioResponseEvent?: never;
      HeartbeatEvent?: never;
      AccessDeniedException: AccessDeniedException;
      ResourceNotFoundException?: never;
      ValidationException?: never;
      ThrottlingException?: never;
      InternalServerException?: never;
      ConflictException?: never;
      DependencyFailedException?: never;
      BadGatewayException?: never;
    }
  | {
      PlaybackInterruptionEvent?: never;
      TranscriptEvent?: never;
      IntentResultEvent?: never;
      TextResponseEvent?: never;
      AudioResponseEvent?: never;
      HeartbeatEvent?: never;
      AccessDeniedException?: never;
      ResourceNotFoundException: ResourceNotFoundException;
      ValidationException?: never;
      ThrottlingException?: never;
      InternalServerException?: never;
      ConflictException?: never;
      DependencyFailedException?: never;
      BadGatewayException?: never;
    }
  | {
      PlaybackInterruptionEvent?: never;
      TranscriptEvent?: never;
      IntentResultEvent?: never;
      TextResponseEvent?: never;
      AudioResponseEvent?: never;
      HeartbeatEvent?: never;
      AccessDeniedException?: never;
      ResourceNotFoundException?: never;
      ValidationException: ValidationException;
      ThrottlingException?: never;
      InternalServerException?: never;
      ConflictException?: never;
      DependencyFailedException?: never;
      BadGatewayException?: never;
    }
  | {
      PlaybackInterruptionEvent?: never;
      TranscriptEvent?: never;
      IntentResultEvent?: never;
      TextResponseEvent?: never;
      AudioResponseEvent?: never;
      HeartbeatEvent?: never;
      AccessDeniedException?: never;
      ResourceNotFoundException?: never;
      ValidationException?: never;
      ThrottlingException: ThrottlingException;
      InternalServerException?: never;
      ConflictException?: never;
      DependencyFailedException?: never;
      BadGatewayException?: never;
    }
  | {
      PlaybackInterruptionEvent?: never;
      TranscriptEvent?: never;
      IntentResultEvent?: never;
      TextResponseEvent?: never;
      AudioResponseEvent?: never;
      HeartbeatEvent?: never;
      AccessDeniedException?: never;
      ResourceNotFoundException?: never;
      ValidationException?: never;
      ThrottlingException?: never;
      InternalServerException: InternalServerException;
      ConflictException?: never;
      DependencyFailedException?: never;
      BadGatewayException?: never;
    }
  | {
      PlaybackInterruptionEvent?: never;
      TranscriptEvent?: never;
      IntentResultEvent?: never;
      TextResponseEvent?: never;
      AudioResponseEvent?: never;
      HeartbeatEvent?: never;
      AccessDeniedException?: never;
      ResourceNotFoundException?: never;
      ValidationException?: never;
      ThrottlingException?: never;
      InternalServerException?: never;
      ConflictException: ConflictException;
      DependencyFailedException?: never;
      BadGatewayException?: never;
    }
  | {
      PlaybackInterruptionEvent?: never;
      TranscriptEvent?: never;
      IntentResultEvent?: never;
      TextResponseEvent?: never;
      AudioResponseEvent?: never;
      HeartbeatEvent?: never;
      AccessDeniedException?: never;
      ResourceNotFoundException?: never;
      ValidationException?: never;
      ThrottlingException?: never;
      InternalServerException?: never;
      ConflictException?: never;
      DependencyFailedException: DependencyFailedException;
      BadGatewayException?: never;
    }
  | {
      PlaybackInterruptionEvent?: never;
      TranscriptEvent?: never;
      IntentResultEvent?: never;
      TextResponseEvent?: never;
      AudioResponseEvent?: never;
      HeartbeatEvent?: never;
      AccessDeniedException?: never;
      ResourceNotFoundException?: never;
      ValidationException?: never;
      ThrottlingException?: never;
      InternalServerException?: never;
      ConflictException?: never;
      DependencyFailedException?: never;
      BadGatewayException: BadGatewayException;
    };
export const StartConversationResponseEventStream = /*@__PURE__*/ T.EventStream(
  S.Union([
    S.Struct({ PlaybackInterruptionEvent: PlaybackInterruptionEvent }),
    S.Struct({ TranscriptEvent: TranscriptEvent }),
    S.Struct({ IntentResultEvent: IntentResultEvent }),
    S.Struct({ TextResponseEvent: TextResponseEvent }),
    S.Struct({ AudioResponseEvent: AudioResponseEvent }),
    S.Struct({ HeartbeatEvent: HeartbeatEvent }),
    S.Struct({
      AccessDeniedException: S.suspend(() => AccessDeniedException).annotate({
        identifier: "AccessDeniedException",
      }),
    }),
    S.Struct({
      ResourceNotFoundException: S.suspend(
        () => ResourceNotFoundException,
      ).annotate({ identifier: "ResourceNotFoundException" }),
    }),
    S.Struct({
      ValidationException: S.suspend(() => ValidationException).annotate({
        identifier: "ValidationException",
      }),
    }),
    S.Struct({
      ThrottlingException: S.suspend(() => ThrottlingException).annotate({
        identifier: "ThrottlingException",
      }),
    }),
    S.Struct({
      InternalServerException: S.suspend(
        () => InternalServerException,
      ).annotate({ identifier: "InternalServerException" }),
    }),
    S.Struct({
      ConflictException: S.suspend(() => ConflictException).annotate({
        identifier: "ConflictException",
      }),
    }),
    S.Struct({
      DependencyFailedException: S.suspend(
        () => DependencyFailedException,
      ).annotate({ identifier: "DependencyFailedException" }),
    }),
    S.Struct({
      BadGatewayException: S.suspend(() => BadGatewayException).annotate({
        identifier: "BadGatewayException",
      }),
    }),
  ]),
) as any as S.Schema<
  stream.Stream<StartConversationResponseEventStream, Error, never>
>;
export interface StartConversationResponse {
  responseEventStream?: stream.Stream<
    StartConversationResponseEventStream,
    Error,
    never
  >;
}
export const StartConversationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    responseEventStream: S.optional(StartConversationResponseEventStream).pipe(
      T.HttpPayload(),
    ),
  }),
).annotate({
  identifier: "StartConversationResponse",
}) as any as S.Schema<StartConversationResponse>;
export type DeleteSessionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes session information for a specified bot, alias, and user ID.
 *
 * You can use this operation to restart a conversation with a bot.
 * When you remove a session, the entire history of the session is removed
 * so that you can start again.
 *
 * You don't need to delete a session. Sessions have a time limit and
 * will expire. Set the session time limit when you create the bot. The
 * default is 5 minutes, but you can specify anything between 1 minute and
 * 24 hours.
 *
 * If you specify a bot or alias ID that doesn't exist, you receive a
 * `BadRequestException.`
 *
 * If the locale doesn't exist in the bot, or if the locale hasn't been
 * enables for the alias, you receive a
 * `BadRequestException`.
 */
export const deleteSession: API.OperationMethod<
  DeleteSessionRequest,
  DeleteSessionResponse,
  DeleteSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSessionRequest,
  output: DeleteSessionResponse,
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
  operationName: "DeleteSession",
}));

export type GetSessionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns session information for a specified bot, alias, and
 * user.
 *
 * For example, you can use this operation to retrieve session
 * information for a user that has left a long-running session in
 * use.
 *
 * If the bot, alias, or session identifier doesn't exist, Amazon Lex V2
 * returns a `BadRequestException`. If the locale doesn't exist
 * or is not enabled for the alias, you receive a
 * `BadRequestException`.
 */
export const getSession: API.OperationMethod<
  GetSessionRequest,
  GetSessionResponse,
  GetSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSessionRequest,
  output: GetSessionResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSession",
}));

export type PutSessionError =
  | AccessDeniedException
  | BadGatewayException
  | ConflictException
  | DependencyFailedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new session or modifies an existing session with an Amazon Lex V2
 * bot. Use this operation to enable your application to set the state of
 * the bot.
 */
export const putSession: API.OperationMethod<
  PutSessionRequest,
  PutSessionResponse,
  PutSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutSessionRequest,
  output: PutSessionResponse,
  errors: [
    AccessDeniedException,
    BadGatewayException,
    ConflictException,
    DependencyFailedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutSession",
}));

export type RecognizeTextError =
  | AccessDeniedException
  | BadGatewayException
  | ConflictException
  | DependencyFailedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sends user input to Amazon Lex V2. Client applications use this API to send
 * requests to Amazon Lex V2 at runtime. Amazon Lex V2 then interprets the user input
 * using the machine learning model that it build for the bot.
 *
 * In response, Amazon Lex V2 returns the next message to convey to the user
 * and an optional response card to display.
 *
 * If the optional post-fulfillment response is specified, the messages
 * are returned as follows. For more information, see PostFulfillmentStatusSpecification.
 *
 * - **Success message** - Returned if
 * the Lambda function completes successfully and the intent state is
 * fulfilled or ready fulfillment if the message is present.
 *
 * - **Failed message** - The failed
 * message is returned if the Lambda function throws an exception or
 * if the Lambda function returns a failed intent state without a
 * message.
 *
 * - **Timeout message** - If you
 * don't configure a timeout message and a timeout, and the Lambda
 * function doesn't return within 30 seconds, the timeout message is
 * returned. If you configure a timeout, the timeout message is
 * returned when the period times out.
 *
 * For more information, see Completion message.
 */
export const recognizeText: API.OperationMethod<
  RecognizeTextRequest,
  RecognizeTextResponse,
  RecognizeTextError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RecognizeTextRequest,
  output: RecognizeTextResponse,
  errors: [
    AccessDeniedException,
    BadGatewayException,
    ConflictException,
    DependencyFailedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RecognizeText",
}));

export type RecognizeUtteranceError =
  | AccessDeniedException
  | BadGatewayException
  | ConflictException
  | DependencyFailedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sends user input to Amazon Lex V2. You can send text or speech. Clients use
 * this API to send text and audio requests to Amazon Lex V2 at runtime. Amazon Lex V2
 * interprets the user input using the machine learning model built for
 * the bot.
 *
 * The following request fields must be compressed with gzip and then
 * base64 encoded before you send them to Amazon Lex V2.
 *
 * - requestAttributes
 *
 * - sessionState
 *
 * The following response fields are compressed using gzip and then
 * base64 encoded by Amazon Lex V2. Before you can use these fields, you must
 * decode and decompress them.
 *
 * - inputTranscript
 *
 * - interpretations
 *
 * - messages
 *
 * - requestAttributes
 *
 * - sessionState
 *
 * The example contains a Java application that compresses and encodes
 * a Java object to send to Amazon Lex V2, and a second that decodes and
 * decompresses a response from Amazon Lex V2.
 *
 * If the optional post-fulfillment response is specified, the messages
 * are returned as follows. For more information, see PostFulfillmentStatusSpecification.
 *
 * - **Success message** - Returned if
 * the Lambda function completes successfully and the intent state is
 * fulfilled or ready fulfillment if the message is present.
 *
 * - **Failed message** - The failed
 * message is returned if the Lambda function throws an exception or
 * if the Lambda function returns a failed intent state without a
 * message.
 *
 * - **Timeout message** - If you
 * don't configure a timeout message and a timeout, and the Lambda
 * function doesn't return within 30 seconds, the timeout message is
 * returned. If you configure a timeout, the timeout message is
 * returned when the period times out.
 *
 * For more information, see Completion message.
 */
export const recognizeUtterance: API.OperationMethod<
  RecognizeUtteranceRequest,
  RecognizeUtteranceResponse,
  RecognizeUtteranceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RecognizeUtteranceRequest,
  output: RecognizeUtteranceResponse,
  errors: [
    AccessDeniedException,
    BadGatewayException,
    ConflictException,
    DependencyFailedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RecognizeUtterance",
}));

export type StartConversationError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts an HTTP/2 bidirectional event stream that enables you to send
 * audio, text, or DTMF input in real time. After your application starts
 * a conversation, users send input to Amazon Lex V2 as a stream of events. Amazon Lex V2
 * processes the incoming events and responds with streaming text or audio
 * events.
 *
 * Audio input must be in the following format: audio/lpcm
 * sample-rate=8000 sample-size-bits=16 channel-count=1;
 * is-big-endian=false.
 *
 * If the optional post-fulfillment response is specified, the messages
 * are returned as follows. For more information, see PostFulfillmentStatusSpecification.
 *
 * - **Success message** - Returned if
 * the Lambda function completes successfully and the intent state is
 * fulfilled or ready fulfillment if the message is present.
 *
 * - **Failed message** - The failed
 * message is returned if the Lambda function throws an exception or
 * if the Lambda function returns a failed intent state without a
 * message.
 *
 * - **Timeout message** - If you
 * don't configure a timeout message and a timeout, and the Lambda
 * function doesn't return within 30 seconds, the timeout message is
 * returned. If you configure a timeout, the timeout message is
 * returned when the period times out.
 *
 * For more information, see Completion message.
 *
 * If the optional update message is configured, it is played at the
 * specified frequency while the Lambda function is running and the update
 * message state is active. If the fulfillment update message is not
 * active, the Lambda function runs with a 30 second timeout.
 *
 * For more information, see Update message
 *
 * The `StartConversation` operation is supported only in
 * the following SDKs:
 *
 * - AWS SDK for C++
 *
 * - AWS SDK for Java V2
 *
 * - AWS SDK for Ruby V3
 */
export const startConversation: API.OperationMethod<
  StartConversationRequest,
  StartConversationResponse,
  StartConversationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartConversationRequest,
  output: StartConversationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartConversation",
}));
