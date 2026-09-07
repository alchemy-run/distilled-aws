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
  sdkId: "WorkMailMessageFlow",
  serviceShapeName: "GiraffeMessageInTransitService",
});
const auth = T.AwsAuthSigv4({ name: "workmailmessageflow" });
const ver = T.ServiceVersion("2019-05-01");
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
              `https://workmailmessageflow-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://workmailmessageflow-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://workmailmessageflow.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://workmailmessageflow.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class InvalidContentLocation
  extends /*@__PURE__*/ S.TaggedError<InvalidContentLocation>()(
    "InvalidContentLocation",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class MessageFrozen
  extends /*@__PURE__*/ S.TaggedError<MessageFrozen>()("MessageFrozen", {
    message: S.optional(S.String).pipe(T.ErrorMessage()),
  }) {}
export class MessageRejected
  extends /*@__PURE__*/ S.TaggedError<MessageRejected>()("MessageRejected", {
    message: S.optional(S.String).pipe(T.ErrorMessage()),
  }) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export type MessageIdType = string;
export interface GetRawMessageContentRequest {
  messageId: string;
}
export const GetRawMessageContentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ messageId: S.String.pipe(T.HttpLabel("messageId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/messages/{messageId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRawMessageContentRequest",
}) as any as S.Schema<GetRawMessageContentRequest>;
export interface GetRawMessageContentResponse {
  messageContent: T.StreamingOutputBody;
}
export const GetRawMessageContentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ messageContent: T.StreamingOutput.pipe(T.HttpPayload()) }),
).annotate({
  identifier: "GetRawMessageContentResponse",
}) as any as S.Schema<GetRawMessageContentResponse>;
export type S3BucketIdType = string;
export type S3KeyIdType = string;
export type S3VersionType = string;
export interface S3Reference {
  bucket: string;
  key: string;
  objectVersion?: string;
}
export const S3Reference = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bucket: S.String,
    key: S.String,
    objectVersion: S.optional(S.String),
  }),
).annotate({ identifier: "S3Reference" }) as any as S.Schema<S3Reference>;
export interface RawMessageContent {
  s3Reference: S3Reference;
}
export const RawMessageContent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ s3Reference: S3Reference }),
).annotate({
  identifier: "RawMessageContent",
}) as any as S.Schema<RawMessageContent>;
export interface PutRawMessageContentRequest {
  messageId: string;
  content: RawMessageContent;
}
export const PutRawMessageContentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    messageId: S.String.pipe(T.HttpLabel("messageId")),
    content: RawMessageContent,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/messages/{messageId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutRawMessageContentRequest",
}) as any as S.Schema<PutRawMessageContentRequest>;
export interface PutRawMessageContentResponse {}
export const PutRawMessageContentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutRawMessageContentResponse",
}) as any as S.Schema<PutRawMessageContentResponse>;
export type ErrorMessage = string;
export type GetRawMessageContentError =
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves the raw content of an in-transit email message, in MIME format.
 */
export const getRawMessageContent: API.OperationMethod<
  GetRawMessageContentRequest,
  GetRawMessageContentResponse,
  GetRawMessageContentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRawMessageContentRequest,
  output: GetRawMessageContentResponse,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRawMessageContent",
}));

export type PutRawMessageContentError =
  | InvalidContentLocation
  | MessageFrozen
  | MessageRejected
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates the raw content of an in-transit email message, in MIME format.
 *
 * This example describes how to update in-transit email message. For more information and examples for using this API, see
 *
 * Updating message content with AWS Lambda.
 *
 * Updates to an in-transit message only appear when you call `PutRawMessageContent` from an AWS Lambda function
 * configured with a synchronous
 * Run Lambda rule. If you call `PutRawMessageContent` on a delivered or sent message, the message remains unchanged,
 * even though GetRawMessageContent returns an updated
 * message.
 */
export const putRawMessageContent: API.OperationMethod<
  PutRawMessageContentRequest,
  PutRawMessageContentResponse,
  PutRawMessageContentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutRawMessageContentRequest,
  output: PutRawMessageContentResponse,
  errors: [
    InvalidContentLocation,
    MessageFrozen,
    MessageRejected,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutRawMessageContent",
}));
