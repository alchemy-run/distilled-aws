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
  sdkId: "SagemakerJobRuntime",
  serviceShapeName: "AgenticRFTRuntimeService",
});
const auth = T.AwsAuthSigv4({ name: "sagemaker" });
const ver = T.ServiceVersion("2026-02-01");
const proto = T.AwsProtocolsRestJson1();
const rules = T.EndpointResolver((p, _) => {
  const { UseFIPS = false, Endpoint, Region } = p;
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
    return e(Endpoint);
  }
  if (Region != null) {
    {
      const PartitionResult = _.partition(Region);
      if (PartitionResult != null && PartitionResult !== false) {
        if (_.getAttr(PartitionResult, "name") === "aws" && UseFIPS === false) {
          return e(
            `https://job-runtime.sagemaker.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-cn" &&
          UseFIPS === false
        ) {
          return e(
            `https://job-runtime.sagemaker.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
          UseFIPS === false
        ) {
          return e(
            `https://job-runtime.sagemaker.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        if (UseFIPS === true) {
          return e(
            `https://job-runtime.sagemaker-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        return e(
          `https://job-runtime.sagemaker.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
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
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServiceError
  extends /*@__PURE__*/ S.TaggedError<InternalServiceError>()(
    "InternalServiceError",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(T.HttpError(500), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(T.HttpError(429), T.Retryable()),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type JobArn = string;
export type TrajectoryId = string;
export type CompletionStatus = "ready" | "failed" | (string & {});
export const CompletionStatus = /*@__PURE__*/ S.String;

export interface CompleteRolloutRequest {
  JobArn: string;
  TrajectoryId: string;
  Status?: CompletionStatus;
  ClientToken?: string;
}
export const CompleteRolloutRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobArn: S.String.pipe(T.HttpHeader("X-Amzn-SageMaker-Job-Arn")),
    TrajectoryId: S.String,
    Status: S.optional(CompletionStatus),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/complete-rollout" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CompleteRolloutRequest",
}) as any as S.Schema<CompleteRolloutRequest>;
export interface CompleteRolloutResponse {}
export const CompleteRolloutResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CompleteRolloutResponse",
}) as any as S.Schema<CompleteRolloutResponse>;
export interface SampleRequest {
  JobArn: string;
  TrajectoryId: string;
  Body: T.StreamingInputBody;
}
export const SampleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobArn: S.String.pipe(T.HttpHeader("X-Amzn-SageMaker-Job-Arn")),
    TrajectoryId: S.String.pipe(T.HttpHeader("X-Amzn-SageMaker-Trajectory-Id")),
    Body: T.StreamingInput.pipe(T.HttpPayload()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/sample" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "SampleRequest" }) as any as S.Schema<SampleRequest>;
export interface SampleResponse {
  ContentType?: string;
  Body: T.StreamingOutputBody;
}
export const SampleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
    Body: T.StreamingOutput.pipe(T.HttpPayload()),
  }),
).annotate({ identifier: "SampleResponse" }) as any as S.Schema<SampleResponse>;
export interface SampleWithResponseStreamRequest {
  JobArn: string;
  TrajectoryId: string;
  Body: T.StreamingInputBody;
}
export const SampleWithResponseStreamRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobArn: S.String.pipe(T.HttpHeader("X-Amzn-SageMaker-Job-Arn")),
    TrajectoryId: S.String.pipe(T.HttpHeader("X-Amzn-SageMaker-Trajectory-Id")),
    Body: T.StreamingInput.pipe(T.HttpPayload()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/sample-with-response-stream" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SampleWithResponseStreamRequest",
}) as any as S.Schema<SampleWithResponseStreamRequest>;
export interface SampleWithResponseStreamResponse {
  ContentType?: string;
  Body: T.StreamingOutputBody;
}
export const SampleWithResponseStreamResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
    Body: T.StreamingOutput.pipe(T.HttpPayload()),
  }),
).annotate({
  identifier: "SampleWithResponseStreamResponse",
}) as any as S.Schema<SampleWithResponseStreamResponse>;
export type DoubleList = number[];
export const DoubleList = /*@__PURE__*/ S.Array(S.Number);
export interface UpdateRewardRequest {
  JobArn: string;
  TrajectoryId: string;
  Rewards: number[];
  ClientToken?: string;
}
export const UpdateRewardRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobArn: S.String.pipe(T.HttpHeader("X-Amzn-SageMaker-Job-Arn")),
    TrajectoryId: S.String,
    Rewards: DoubleList,
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/update-reward" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateRewardRequest",
}) as any as S.Schema<UpdateRewardRequest>;
export interface UpdateRewardResponse {}
export const UpdateRewardResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateRewardResponse",
}) as any as S.Schema<UpdateRewardResponse>;
export type FailureReason = string;
export type CompleteRolloutError =
  | AccessDeniedException
  | ConflictException
  | InternalServiceError
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Marks a rollout as complete, indicating that no further turns will be appended
 * to the trajectory. After calling this operation, the trajectory is sealed and
 * eligible for reward submission via the UpdateReward operation.
 */
export const completeRollout: API.OperationMethod<
  CompleteRolloutRequest,
  CompleteRolloutResponse,
  CompleteRolloutError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CompleteRolloutRequest,
  output: CompleteRolloutResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceError,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CompleteRollout",
}));

export type SampleError =
  | AccessDeniedException
  | InternalServiceError
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sends an inference request to the model during a job execution. The request
 * and response bodies are forwarded to and from the model without modification.
 * Each turn (prompt and response) is captured for later use.
 */
export const sample: API.OperationMethod<
  SampleRequest,
  SampleResponse,
  SampleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SampleRequest,
  output: SampleResponse,
  errors: [
    AccessDeniedException,
    InternalServiceError,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Sample",
}));

export type SampleWithResponseStreamError =
  | AccessDeniedException
  | InternalServiceError
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sends a streaming inference request to the model during a job execution.
 * Returns the response as a stream of payload chunks. Each turn is captured
 * for later use.
 */
export const sampleWithResponseStream: API.OperationMethod<
  SampleWithResponseStreamRequest,
  SampleWithResponseStreamResponse,
  SampleWithResponseStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SampleWithResponseStreamRequest,
  output: SampleWithResponseStreamResponse,
  errors: [
    AccessDeniedException,
    InternalServiceError,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SampleWithResponseStream",
}));

export type UpdateRewardError =
  | AccessDeniedException
  | ConflictException
  | InternalServiceError
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the reward values for a trajectory and transitions it to
 * reward-received status, signaling that it is eligible for processing. Call this
 * operation after CompleteRollout to provide the computed reward scores.
 */
export const updateReward: API.OperationMethod<
  UpdateRewardRequest,
  UpdateRewardResponse,
  UpdateRewardError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRewardRequest,
  output: UpdateRewardResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceError,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateReward",
}));
