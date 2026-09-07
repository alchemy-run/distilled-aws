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
import { SensitiveString, SensitiveBlob } from "../sensitive.ts";
const svc = T.AwsApiService({
  sdkId: "SageMaker Runtime",
  serviceShapeName: "AmazonSageMakerRuntime",
});
const auth = T.AwsAuthSigv4({ name: "sagemaker" });
const ver = T.ServiceVersion("2017-05-13");
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
              `https://runtime.sagemaker-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (_.getAttr(PartitionResult, "name") === "aws") {
              return e(
                `https://runtime-fips.sagemaker.${Region}.amazonaws.com`,
              );
            }
            if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
              return e(`https://runtime.sagemaker.${Region}.amazonaws.com`);
            }
            return e(
              `https://runtime.sagemaker-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://runtime.sagemaker.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://runtime.sagemaker.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class InternalDependencyException
  extends /*@__PURE__*/ S.TaggedError<InternalDependencyException>()(
    "InternalDependencyException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(530),
  ).pipe(C.withServerError) {}
export class InternalFailure
  extends /*@__PURE__*/ S.TaggedError<InternalFailure>()(
    "InternalFailure",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InternalStreamFailure
  extends /*@__PURE__*/ S.TaggedError<InternalStreamFailure>()(
    "InternalStreamFailure",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ModelError
  extends /*@__PURE__*/ S.TaggedError<ModelError>()(
    "ModelError",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      OriginalStatusCode: S.optional(S.Number),
      OriginalMessage: S.optional(S.String),
      LogStreamArn: S.optional(S.String),
    },
    T.HttpError(424),
  ) {}
export class ModelNotReadyException
  extends /*@__PURE__*/ S.TaggedError<ModelNotReadyException>()(
    "ModelNotReadyException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ModelNotReadyException",
        httpResponseCode: 429,
      }),
      T.HttpError(429),
    ),
  ).pipe(C.withThrottlingError) {}
export class ModelStreamError
  extends /*@__PURE__*/ S.TaggedError<ModelStreamError>()("ModelStreamError", {
    message: S.optional(S.String).pipe(T.ErrorMessage()),
    ErrorCode: S.optional(S.String),
  }) {}
export class ServiceUnavailable
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailable>()(
    "ServiceUnavailable",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(503),
  ).pipe(C.withServerError) {}
export class ValidationError
  extends /*@__PURE__*/ S.TaggedError<ValidationError>()(
    "ValidationError",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type EndpointName = string;
export type Header = string;
export type CustomAttributesHeader = string | redacted.Redacted<string>;
export type TargetModelHeader = string;
export type TargetVariantHeader = string;
export type TargetContainerHostnameHeader = string;
export type InferenceId = string;
export type EnableExplanationsHeader = string;
export type InferenceComponentHeader = string;
export type SessionIdOrNewSessionConstantHeader = string;
export interface InvokeEndpointInput {
  EndpointName: string;
  Body?: T.StreamingInputBody;
  ContentType?: string;
  Accept?: string;
  CustomAttributes?: string | redacted.Redacted<string>;
  TargetModel?: string;
  TargetVariant?: string;
  TargetContainerHostname?: string;
  InferenceId?: string;
  EnableExplanations?: string;
  InferenceComponentName?: string;
  SessionId?: string;
}
export const InvokeEndpointInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EndpointName: S.String.pipe(T.HttpLabel("EndpointName")),
    Body: S.optional(T.StreamingInput).pipe(T.HttpPayload()),
    ContentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
    Accept: S.optional(S.String).pipe(T.HttpHeader("Accept")),
    CustomAttributes: S.optional(SensitiveString).pipe(
      T.HttpHeader("X-Amzn-SageMaker-Custom-Attributes"),
    ),
    TargetModel: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-SageMaker-Target-Model"),
    ),
    TargetVariant: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-SageMaker-Target-Variant"),
    ),
    TargetContainerHostname: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-SageMaker-Target-Container-Hostname"),
    ),
    InferenceId: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-SageMaker-Inference-Id"),
    ),
    EnableExplanations: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-SageMaker-Enable-Explanations"),
    ),
    InferenceComponentName: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-SageMaker-Inference-Component"),
    ),
    SessionId: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-SageMaker-Session-Id"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/endpoints/{EndpointName}/invocations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "InvokeEndpointInput",
}) as any as S.Schema<InvokeEndpointInput>;
export type NewSessionResponseHeader = string;
export type SessionIdHeader = string;
export interface InvokeEndpointOutput {
  Body: T.StreamingOutputBody;
  ContentType?: string;
  InvokedProductionVariant?: string;
  CustomAttributes?: string | redacted.Redacted<string>;
  NewSessionId?: string;
  ClosedSessionId?: string;
}
export const InvokeEndpointOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Body: S.optional(T.StreamingOutput).pipe(T.HttpPayload()),
    ContentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
    InvokedProductionVariant: S.optional(S.String).pipe(
      T.HttpHeader("x-Amzn-Invoked-Production-Variant"),
    ),
    CustomAttributes: S.optional(SensitiveString).pipe(
      T.HttpHeader("X-Amzn-SageMaker-Custom-Attributes"),
    ),
    NewSessionId: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-SageMaker-New-Session-Id"),
    ),
    ClosedSessionId: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-SageMaker-Closed-Session-Id"),
    ),
  }),
).annotate({
  identifier: "InvokeEndpointOutput",
}) as any as S.Schema<InvokeEndpointOutput>;
export type InputLocationHeader = string;
export type S3OutputPathExtensionHeader = string;
export type FilenameHeader = string;
export type RequestTTLSecondsHeader = number;
export type InvocationTimeoutSecondsHeader = number;
export interface InvokeEndpointAsyncInput {
  EndpointName: string;
  ContentType?: string;
  Accept?: string;
  CustomAttributes?: string | redacted.Redacted<string>;
  InferenceId?: string;
  InputLocation?: string;
  S3OutputPathExtension?: string;
  Filename?: string;
  RequestTTLSeconds?: number;
  InvocationTimeoutSeconds?: number;
  Body?: T.StreamingInputBody;
}
export const InvokeEndpointAsyncInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EndpointName: S.String.pipe(T.HttpLabel("EndpointName")),
    ContentType: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-SageMaker-Content-Type"),
    ),
    Accept: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-SageMaker-Accept")),
    CustomAttributes: S.optional(SensitiveString).pipe(
      T.HttpHeader("X-Amzn-SageMaker-Custom-Attributes"),
    ),
    InferenceId: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-SageMaker-Inference-Id"),
    ),
    InputLocation: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-SageMaker-InputLocation"),
    ),
    S3OutputPathExtension: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-SageMaker-S3OutputPathExtension"),
    ),
    Filename: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-SageMaker-Filename"),
    ),
    RequestTTLSeconds: S.optional(S.Number).pipe(
      T.HttpHeader("X-Amzn-SageMaker-RequestTTLSeconds"),
    ),
    InvocationTimeoutSeconds: S.optional(S.Number).pipe(
      T.HttpHeader("X-Amzn-SageMaker-InvocationTimeoutSeconds"),
    ),
    Body: S.optional(T.StreamingInput).pipe(T.HttpPayload()),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/endpoints/{EndpointName}/async-invocations",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "InvokeEndpointAsyncInput",
}) as any as S.Schema<InvokeEndpointAsyncInput>;
export interface InvokeEndpointAsyncOutput {
  InferenceId?: string;
  OutputLocation?: string;
  FailureLocation?: string;
}
export const InvokeEndpointAsyncOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InferenceId: S.optional(S.String),
    OutputLocation: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-SageMaker-OutputLocation"),
    ),
    FailureLocation: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-SageMaker-FailureLocation"),
    ),
  }),
).annotate({
  identifier: "InvokeEndpointAsyncOutput",
}) as any as S.Schema<InvokeEndpointAsyncOutput>;
export interface InvokeEndpointWithResponseStreamInput {
  EndpointName: string;
  Body?: T.StreamingInputBody;
  ContentType?: string;
  Accept?: string;
  CustomAttributes?: string | redacted.Redacted<string>;
  TargetVariant?: string;
  TargetContainerHostname?: string;
  InferenceId?: string;
  InferenceComponentName?: string;
  SessionId?: string;
}
export const InvokeEndpointWithResponseStreamInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      EndpointName: S.String.pipe(T.HttpLabel("EndpointName")),
      Body: S.optional(T.StreamingInput).pipe(T.HttpPayload()),
      ContentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
      Accept: S.optional(S.String).pipe(
        T.HttpHeader("X-Amzn-SageMaker-Accept"),
      ),
      CustomAttributes: S.optional(SensitiveString).pipe(
        T.HttpHeader("X-Amzn-SageMaker-Custom-Attributes"),
      ),
      TargetVariant: S.optional(S.String).pipe(
        T.HttpHeader("X-Amzn-SageMaker-Target-Variant"),
      ),
      TargetContainerHostname: S.optional(S.String).pipe(
        T.HttpHeader("X-Amzn-SageMaker-Target-Container-Hostname"),
      ),
      InferenceId: S.optional(S.String).pipe(
        T.HttpHeader("X-Amzn-SageMaker-Inference-Id"),
      ),
      InferenceComponentName: S.optional(S.String).pipe(
        T.HttpHeader("X-Amzn-SageMaker-Inference-Component"),
      ),
      SessionId: S.optional(S.String).pipe(
        T.HttpHeader("X-Amzn-SageMaker-Session-Id"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/endpoints/{EndpointName}/invocations-response-stream",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "InvokeEndpointWithResponseStreamInput",
}) as any as S.Schema<InvokeEndpointWithResponseStreamInput>;
export type PartBlob = Uint8Array | redacted.Redacted<Uint8Array>;
export interface PayloadPart {
  Bytes?: Uint8Array | redacted.Redacted<Uint8Array>;
}
export const PayloadPart = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Bytes: S.optional(SensitiveBlob).pipe(T.EventPayload()) }),
).annotate({ identifier: "PayloadPart" }) as any as S.Schema<PayloadPart>;
export type Message = string;
export type ErrorCode = string;
export type ResponseStream =
  | {
      PayloadPart: PayloadPart;
      ModelStreamError?: never;
      InternalStreamFailure?: never;
    }
  | {
      PayloadPart?: never;
      ModelStreamError: ModelStreamError;
      InternalStreamFailure?: never;
    }
  | {
      PayloadPart?: never;
      ModelStreamError?: never;
      InternalStreamFailure: InternalStreamFailure;
    };
export const ResponseStream = /*@__PURE__*/ T.EventStream(
  S.Union([
    S.Struct({ PayloadPart: PayloadPart }),
    S.Struct({
      ModelStreamError: S.suspend(() => ModelStreamError).annotate({
        identifier: "ModelStreamError",
      }),
    }),
    S.Struct({
      InternalStreamFailure: S.suspend(() => InternalStreamFailure).annotate({
        identifier: "InternalStreamFailure",
      }),
    }),
  ]),
) as any as S.Schema<stream.Stream<ResponseStream, Error, never>>;
export interface InvokeEndpointWithResponseStreamOutput {
  Body: stream.Stream<ResponseStream, Error, never>;
  ContentType?: string;
  InvokedProductionVariant?: string;
  CustomAttributes?: string | redacted.Redacted<string>;
}
export const InvokeEndpointWithResponseStreamOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Body: ResponseStream.pipe(T.HttpPayload()),
      ContentType: S.optional(S.String).pipe(
        T.HttpHeader("X-Amzn-SageMaker-Content-Type"),
      ),
      InvokedProductionVariant: S.optional(S.String).pipe(
        T.HttpHeader("x-Amzn-Invoked-Production-Variant"),
      ),
      CustomAttributes: S.optional(SensitiveString).pipe(
        T.HttpHeader("X-Amzn-SageMaker-Custom-Attributes"),
      ),
    }),
).annotate({
  identifier: "InvokeEndpointWithResponseStreamOutput",
}) as any as S.Schema<InvokeEndpointWithResponseStreamOutput>;
export type StatusCode = number;
export type LogStreamArn = string;
export type InvokeEndpointError =
  | InternalDependencyException
  | InternalFailure
  | ModelError
  | ModelNotReadyException
  | ServiceUnavailable
  | ValidationError
  | CommonErrors;
/**
 * After you deploy a model into production using Amazon SageMaker AI hosting services,
 * your client applications use this API to get inferences from the model hosted at the
 * specified endpoint.
 *
 * For an overview of Amazon SageMaker AI, see How It Works.
 *
 * Amazon SageMaker AI strips all POST headers except those supported by the API. Amazon SageMaker AI might add
 * additional headers. You should not rely on the behavior of headers outside those
 * enumerated in the request syntax.
 *
 * Calls to `InvokeEndpoint` are authenticated by using Amazon Web Services
 * Signature Version 4. For information, see Authenticating
 * Requests (Amazon Web Services Signature Version 4) in the *Amazon S3 API Reference*.
 *
 * A customer's model containers must respond to requests within 60 seconds. The model
 * itself can have a maximum processing time of 60 seconds before responding to
 * invocations. If your model is going to take 50-60 seconds of processing time, the SDK
 * socket timeout should be set to be 70 seconds.
 *
 * Endpoints are scoped to an individual account, and are not public. The URL does
 * not contain the account ID, but Amazon SageMaker AI determines the account ID from
 * the authentication token that is supplied by the caller.
 */
export const invokeEndpoint: API.OperationMethod<
  InvokeEndpointInput,
  InvokeEndpointOutput,
  InvokeEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: InvokeEndpointInput,
  output: InvokeEndpointOutput,
  errors: [
    InternalDependencyException,
    InternalFailure,
    ModelError,
    ModelNotReadyException,
    ServiceUnavailable,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InvokeEndpoint",
}));

export type InvokeEndpointAsyncError =
  | InternalFailure
  | ServiceUnavailable
  | ValidationError
  | CommonErrors;
/**
 * After you deploy a model into production using Amazon SageMaker AI hosting services,
 * your client applications use this API to get inferences from the model hosted at the
 * specified endpoint in an asynchronous manner.
 *
 * Inference requests sent to this API are enqueued for asynchronous processing. The
 * processing of the inference request may or may not complete before you receive a
 * response from this API. The response from this API will not contain the result of the
 * inference request but contain information about where you can locate it.
 *
 * Amazon SageMaker AI strips all POST headers except those supported by the API. Amazon SageMaker AI might add
 * additional headers. You should not rely on the behavior of headers outside those
 * enumerated in the request syntax.
 *
 * Calls to `InvokeEndpointAsync` are authenticated by using Amazon Web Services Signature Version 4. For information, see Authenticating
 * Requests (Amazon Web Services Signature Version 4) in the *Amazon S3 API Reference*.
 */
export const invokeEndpointAsync: API.OperationMethod<
  InvokeEndpointAsyncInput,
  InvokeEndpointAsyncOutput,
  InvokeEndpointAsyncError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: InvokeEndpointAsyncInput,
  output: InvokeEndpointAsyncOutput,
  errors: [InternalFailure, ServiceUnavailable, ValidationError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InvokeEndpointAsync",
}));

export type InvokeEndpointWithResponseStreamError =
  | InternalFailure
  | InternalStreamFailure
  | ModelError
  | ModelStreamError
  | ServiceUnavailable
  | ValidationError
  | CommonErrors;
/**
 * Invokes a model at the specified endpoint to return the inference response as a
 * stream. The inference stream provides the response payload incrementally as a series of
 * parts. Before you can get an inference stream, you must have access to a model that's
 * deployed using Amazon SageMaker AI hosting services, and the container for that model
 * must support inference streaming.
 *
 * For more information that can help you use this API, see the following sections in the
 * *Amazon SageMaker AI Developer Guide*:
 *
 * - For information about how to add streaming support to a model, see How Containers Serve Requests.
 *
 * - For information about how to process the streaming response, see Invoke real-time endpoints.
 *
 * Before you can use this operation, your IAM permissions must allow the
 * `sagemaker:InvokeEndpoint` action. For more information about Amazon SageMaker AI actions for IAM policies, see Actions, resources, and condition keys for Amazon SageMaker AI in the IAM Service Authorization
 * Reference.
 *
 * Amazon SageMaker AI strips all POST headers except those supported by the API. Amazon SageMaker AI might add
 * additional headers. You should not rely on the behavior of headers outside those
 * enumerated in the request syntax.
 *
 * Calls to `InvokeEndpointWithResponseStream` are authenticated by using
 * Amazon Web Services Signature Version 4. For information, see Authenticating Requests (Amazon Web Services Signature Version 4) in the
 * *Amazon S3 API Reference*.
 */
export const invokeEndpointWithResponseStream: API.OperationMethod<
  InvokeEndpointWithResponseStreamInput,
  InvokeEndpointWithResponseStreamOutput,
  InvokeEndpointWithResponseStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: InvokeEndpointWithResponseStreamInput,
  output: InvokeEndpointWithResponseStreamOutput,
  errors: [
    InternalFailure,
    InternalStreamFailure,
    ModelError,
    ModelStreamError,
    ServiceUnavailable,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InvokeEndpointWithResponseStream",
}));
