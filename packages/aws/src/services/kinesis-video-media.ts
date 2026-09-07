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
  sdkId: "Kinesis Video Media",
  serviceShapeName: "AWSAcuityInletService",
});
const auth = T.AwsAuthSigv4({ name: "kinesisvideo" });
const ver = T.ServiceVersion("2017-09-30");
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
              `https://kinesisvideo-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://kinesisvideo-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://kinesisvideo.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://kinesisvideo.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class ClientLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ClientLimitExceededException>()(
    "ClientLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ConnectionLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ConnectionLimitExceededException>()(
    "ConnectionLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidArgumentException
  extends /*@__PURE__*/ S.TaggedError<InvalidArgumentException>()(
    "InvalidArgumentException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidEndpointException
  extends /*@__PURE__*/ S.TaggedError<InvalidEndpointException>()(
    "InvalidEndpointException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class NotAuthorizedException
  extends /*@__PURE__*/ S.TaggedError<NotAuthorizedException>()(
    "NotAuthorizedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(401),
  ).pipe(C.withAuthError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export type StreamName = string;
export type ResourceARN = string;
export type StartSelectorType =
  | "FRAGMENT_NUMBER"
  | "SERVER_TIMESTAMP"
  | "PRODUCER_TIMESTAMP"
  | "NOW"
  | "EARLIEST"
  | "CONTINUATION_TOKEN"
  | (string & {});
export const StartSelectorType = /*@__PURE__*/ S.String;

export type FragmentNumberString = string;
export type ContinuationToken = string;
export interface StartSelector {
  StartSelectorType: StartSelectorType;
  AfterFragmentNumber?: string;
  StartTimestamp?: Date;
  ContinuationToken?: string;
}
export const StartSelector = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartSelectorType: StartSelectorType,
    AfterFragmentNumber: S.optional(S.String),
    StartTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ContinuationToken: S.optional(S.String),
  }),
).annotate({ identifier: "StartSelector" }) as any as S.Schema<StartSelector>;
export interface GetMediaInput {
  StreamName?: string;
  StreamARN?: string;
  StartSelector: StartSelector;
}
export const GetMediaInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StreamName: S.optional(S.String),
    StreamARN: S.optional(S.String),
    StartSelector: StartSelector,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/getMedia" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetMediaInput" }) as any as S.Schema<GetMediaInput>;
export type ContentType = string;
export interface GetMediaOutput {
  ContentType?: string;
  Payload?: T.StreamingOutputBody;
}
export const GetMediaOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
    Payload: S.optional(T.StreamingOutput).pipe(T.HttpPayload()),
  }),
).annotate({ identifier: "GetMediaOutput" }) as any as S.Schema<GetMediaOutput>;
export type ErrorMessage = string;
export type GetMediaError =
  | ClientLimitExceededException
  | ConnectionLimitExceededException
  | InvalidArgumentException
  | InvalidEndpointException
  | NotAuthorizedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Use this API to retrieve media content from a Kinesis video stream. In the request,
 * you identify the stream name or stream Amazon Resource Name (ARN), and the starting chunk.
 * Kinesis Video Streams then returns a stream of chunks in order by fragment number.
 *
 * You must first call the `GetDataEndpoint` API to get an endpoint. Then
 * send the `GetMedia` requests to this endpoint using the --endpoint-url parameter.
 *
 * When you put media data (fragments) on a stream, Kinesis Video Streams stores each
 * incoming fragment and related metadata in what is called a "chunk." For more information, see
 * PutMedia. The `GetMedia` API returns a stream of these chunks starting
 * from the chunk that you specify in the request.
 *
 * The following limits apply when using the `GetMedia` API:
 *
 * - A client can call `GetMedia` up to five times per second per stream.
 *
 * - Kinesis Video Streams sends media data at a rate of up to 25 megabytes per second
 * (or 200 megabits per second) during a `GetMedia` session.
 *
 * If an error is thrown after invoking a Kinesis Video Streams media API, in addition to
 * the HTTP status code and the response body, it includes the following pieces of information:
 *
 * - `x-amz-ErrorType` HTTP header – contains a more specific error type in
 * addition to what the HTTP status code provides.
 *
 * - `x-amz-RequestId` HTTP header – if you want to report an issue to AWS,
 * the support team can better diagnose the problem if given the Request Id.
 *
 * Both the HTTP status code and the ErrorType header can be utilized to make programmatic
 * decisions about whether errors are retry-able and under what conditions, as well as provide
 * information on what actions the client programmer might need to take in order to
 * successfully try again.
 *
 * For more information, see the **Errors** section at the
 * bottom of this topic, as well as Common Errors.
 */
export const getMedia: API.OperationMethod<
  GetMediaInput,
  GetMediaOutput,
  GetMediaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMediaInput,
  output: GetMediaOutput,
  errors: [
    ClientLimitExceededException,
    ConnectionLimitExceededException,
    InvalidArgumentException,
    InvalidEndpointException,
    NotAuthorizedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMedia",
}));
