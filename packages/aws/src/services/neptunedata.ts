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
  sdkId: "neptunedata",
  serviceShapeName: "AmazonNeptuneDataplane",
});
const auth = T.AwsAuthSigv4({ name: "neptune-db" });
const ver = T.ServiceVersion("2023-08-01");
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
              `https://neptune-db-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://neptune-db-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://neptune-db.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://neptune-db.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class BulkLoadIdNotFoundException
  extends /*@__PURE__*/ S.TaggedError<BulkLoadIdNotFoundException>()(
    "BulkLoadIdNotFoundException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.all(T.HttpError(404), T.Retryable()),
  ).pipe(C.withBadRequestError, C.withRetryableError) {}
export class CancelledByUserException
  extends /*@__PURE__*/ S.TaggedError<CancelledByUserException>()(
    "CancelledByUserException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ClientTimeoutException
  extends /*@__PURE__*/ S.TaggedError<ClientTimeoutException>()(
    "ClientTimeoutException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.all(T.HttpError(408), T.Retryable()),
  ).pipe(C.withTimeoutError, C.withRetryableError) {}
export class ConcurrentModificationException
  extends /*@__PURE__*/ S.TaggedError<ConcurrentModificationException>()(
    "ConcurrentModificationException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.all(T.HttpError(500), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ConstraintViolationException
  extends /*@__PURE__*/ S.TaggedError<ConstraintViolationException>()(
    "ConstraintViolationException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.all(T.HttpError(400), T.Retryable()),
  ).pipe(C.withBadRequestError, C.withRetryableError) {}
export class ExpiredStreamException
  extends /*@__PURE__*/ S.TaggedError<ExpiredStreamException>()(
    "ExpiredStreamException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class FailureByQueryException
  extends /*@__PURE__*/ S.TaggedError<FailureByQueryException>()(
    "FailureByQueryException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.all(T.HttpError(500), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class IllegalArgumentException
  extends /*@__PURE__*/ S.TaggedError<IllegalArgumentException>()(
    "IllegalArgumentException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InternalFailureException
  extends /*@__PURE__*/ S.TaggedError<InternalFailureException>()(
    "InternalFailureException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidArgumentException
  extends /*@__PURE__*/ S.TaggedError<InvalidArgumentException>()(
    "InvalidArgumentException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidNumericDataException
  extends /*@__PURE__*/ S.TaggedError<InvalidNumericDataException>()(
    "InvalidNumericDataException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterException>()(
    "InvalidParameterException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class LoadUrlAccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<LoadUrlAccessDeniedException>()(
    "LoadUrlAccessDeniedException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError, C.withAuthError) {}
export class MalformedQueryException
  extends /*@__PURE__*/ S.TaggedError<MalformedQueryException>()(
    "MalformedQueryException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class MemoryLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<MemoryLimitExceededException>()(
    "MemoryLimitExceededException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.all(T.HttpError(500), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class MethodNotAllowedException
  extends /*@__PURE__*/ S.TaggedError<MethodNotAllowedException>()(
    "MethodNotAllowedException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(405),
  ).pipe(C.withBadRequestError) {}
export class MissingParameterException
  extends /*@__PURE__*/ S.TaggedError<MissingParameterException>()(
    "MissingParameterException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class MLResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<MLResourceNotFoundException>()(
    "MLResourceNotFoundException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ParsingException
  extends /*@__PURE__*/ S.TaggedError<ParsingException>()(
    "ParsingException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class PreconditionsFailedException
  extends /*@__PURE__*/ S.TaggedError<PreconditionsFailedException>()(
    "PreconditionsFailedException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class QueryLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<QueryLimitExceededException>()(
    "QueryLimitExceededException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.all(T.HttpError(500), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class QueryLimitException
  extends /*@__PURE__*/ S.TaggedError<QueryLimitException>()(
    "QueryLimitException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class QueryTooLargeException
  extends /*@__PURE__*/ S.TaggedError<QueryTooLargeException>()(
    "QueryTooLargeException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ReadOnlyViolationException
  extends /*@__PURE__*/ S.TaggedError<ReadOnlyViolationException>()(
    "ReadOnlyViolationException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class S3Exception
  extends /*@__PURE__*/ S.TaggedError<S3Exception>()(
    "S3Exception",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.all(T.HttpError(400), T.Retryable()),
  ).pipe(C.withBadRequestError, C.withRetryableError) {}
export class ServerShutdownException
  extends /*@__PURE__*/ S.TaggedError<ServerShutdownException>()(
    "ServerShutdownException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class StatisticsNotAvailableException
  extends /*@__PURE__*/ S.TaggedError<StatisticsNotAvailableException>()(
    "StatisticsNotAvailableException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class StreamRecordsNotFoundException
  extends /*@__PURE__*/ S.TaggedError<StreamRecordsNotFoundException>()(
    "StreamRecordsNotFoundException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.all(T.HttpError(500), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class TimeLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<TimeLimitExceededException>()(
    "TimeLimitExceededException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.all(T.HttpError(500), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.all(T.HttpError(429), T.Retryable()),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class UnsupportedOperationException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedOperationException>()(
    "UnsupportedOperationException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export interface CancelGremlinQueryInput {
  queryId: string;
}
export const CancelGremlinQueryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ queryId: S.String.pipe(T.HttpLabel("queryId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/gremlin/status/{queryId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelGremlinQueryInput",
}) as any as S.Schema<CancelGremlinQueryInput>;
export interface CancelGremlinQueryOutput {
  status?: string;
}
export const CancelGremlinQueryOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: S.optional(S.String) }),
).annotate({
  identifier: "CancelGremlinQueryOutput",
}) as any as S.Schema<CancelGremlinQueryOutput>;
export interface CancelLoaderJobInput {
  loadId: string;
}
export const CancelLoaderJobInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ loadId: S.String.pipe(T.HttpLabel("loadId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/loader/{loadId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelLoaderJobInput",
}) as any as S.Schema<CancelLoaderJobInput>;
export interface CancelLoaderJobOutput {
  status?: string;
}
export const CancelLoaderJobOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: S.optional(S.String) }),
).annotate({
  identifier: "CancelLoaderJobOutput",
}) as any as S.Schema<CancelLoaderJobOutput>;
export interface CancelMLDataProcessingJobInput {
  id: string;
  neptuneIamRoleArn?: string;
  clean?: boolean;
}
export const CancelMLDataProcessingJobInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    neptuneIamRoleArn: S.optional(S.String).pipe(
      T.HttpQuery("neptuneIamRoleArn"),
    ),
    clean: S.optional(S.Boolean).pipe(T.HttpQuery("clean")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/ml/dataprocessing/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelMLDataProcessingJobInput",
}) as any as S.Schema<CancelMLDataProcessingJobInput>;
export interface CancelMLDataProcessingJobOutput {
  status?: string;
}
export const CancelMLDataProcessingJobOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: S.optional(S.String) }),
).annotate({
  identifier: "CancelMLDataProcessingJobOutput",
}) as any as S.Schema<CancelMLDataProcessingJobOutput>;
export interface CancelMLModelTrainingJobInput {
  id: string;
  neptuneIamRoleArn?: string;
  clean?: boolean;
}
export const CancelMLModelTrainingJobInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    neptuneIamRoleArn: S.optional(S.String).pipe(
      T.HttpQuery("neptuneIamRoleArn"),
    ),
    clean: S.optional(S.Boolean).pipe(T.HttpQuery("clean")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/ml/modeltraining/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelMLModelTrainingJobInput",
}) as any as S.Schema<CancelMLModelTrainingJobInput>;
export interface CancelMLModelTrainingJobOutput {
  status?: string;
}
export const CancelMLModelTrainingJobOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: S.optional(S.String) }),
).annotate({
  identifier: "CancelMLModelTrainingJobOutput",
}) as any as S.Schema<CancelMLModelTrainingJobOutput>;
export interface CancelMLModelTransformJobInput {
  id: string;
  neptuneIamRoleArn?: string;
  clean?: boolean;
}
export const CancelMLModelTransformJobInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    neptuneIamRoleArn: S.optional(S.String).pipe(
      T.HttpQuery("neptuneIamRoleArn"),
    ),
    clean: S.optional(S.Boolean).pipe(T.HttpQuery("clean")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/ml/modeltransform/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelMLModelTransformJobInput",
}) as any as S.Schema<CancelMLModelTransformJobInput>;
export interface CancelMLModelTransformJobOutput {
  status?: string;
}
export const CancelMLModelTransformJobOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: S.optional(S.String) }),
).annotate({
  identifier: "CancelMLModelTransformJobOutput",
}) as any as S.Schema<CancelMLModelTransformJobOutput>;
export interface CancelOpenCypherQueryInput {
  queryId: string;
  silent?: boolean;
}
export const CancelOpenCypherQueryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    queryId: S.String.pipe(T.HttpLabel("queryId")),
    silent: S.optional(S.Boolean).pipe(T.HttpQuery("silent")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/opencypher/status/{queryId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelOpenCypherQueryInput",
}) as any as S.Schema<CancelOpenCypherQueryInput>;
export interface CancelOpenCypherQueryOutput {
  status?: string;
  payload?: boolean;
}
export const CancelOpenCypherQueryOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: S.optional(S.String), payload: S.optional(S.Boolean) }),
).annotate({
  identifier: "CancelOpenCypherQueryOutput",
}) as any as S.Schema<CancelOpenCypherQueryOutput>;
export interface CreateMLEndpointInput {
  id?: string;
  mlModelTrainingJobId?: string;
  mlModelTransformJobId?: string;
  update?: boolean;
  neptuneIamRoleArn?: string;
  modelName?: string;
  instanceType?: string;
  instanceCount?: number;
  volumeEncryptionKMSKey?: string;
}
export const CreateMLEndpointInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    mlModelTrainingJobId: S.optional(S.String),
    mlModelTransformJobId: S.optional(S.String),
    update: S.optional(S.Boolean),
    neptuneIamRoleArn: S.optional(S.String),
    modelName: S.optional(S.String),
    instanceType: S.optional(S.String),
    instanceCount: S.optional(S.Number),
    volumeEncryptionKMSKey: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ml/endpoints" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateMLEndpointInput",
}) as any as S.Schema<CreateMLEndpointInput>;
export interface CreateMLEndpointOutput {
  id?: string;
  arn?: string;
  creationTimeInMillis?: number;
}
export const CreateMLEndpointOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    arn: S.optional(S.String),
    creationTimeInMillis: S.optional(S.Number),
  }),
).annotate({
  identifier: "CreateMLEndpointOutput",
}) as any as S.Schema<CreateMLEndpointOutput>;
export interface DeleteMLEndpointInput {
  id: string;
  neptuneIamRoleArn?: string;
  clean?: boolean;
}
export const DeleteMLEndpointInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    neptuneIamRoleArn: S.optional(S.String).pipe(
      T.HttpQuery("neptuneIamRoleArn"),
    ),
    clean: S.optional(S.Boolean).pipe(T.HttpQuery("clean")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/ml/endpoints/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteMLEndpointInput",
}) as any as S.Schema<DeleteMLEndpointInput>;
export interface DeleteMLEndpointOutput {
  status?: string;
}
export const DeleteMLEndpointOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: S.optional(S.String) }),
).annotate({
  identifier: "DeleteMLEndpointOutput",
}) as any as S.Schema<DeleteMLEndpointOutput>;
export interface DeletePropertygraphStatisticsRequest {}
export const DeletePropertygraphStatisticsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({}).pipe(
      T.all(
        T.Http({ method: "DELETE", uri: "/propertygraph/statistics" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeletePropertygraphStatisticsRequest",
}) as any as S.Schema<DeletePropertygraphStatisticsRequest>;
export interface DeleteStatisticsValueMap {
  active?: boolean;
  statisticsId?: string;
}
export const DeleteStatisticsValueMap = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    active: S.optional(S.Boolean),
    statisticsId: S.optional(S.String),
  }),
).annotate({
  identifier: "DeleteStatisticsValueMap",
}) as any as S.Schema<DeleteStatisticsValueMap>;
export interface DeletePropertygraphStatisticsOutput {
  statusCode?: number;
  status?: string;
  payload?: DeleteStatisticsValueMap;
}
export const DeletePropertygraphStatisticsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    statusCode: S.optional(S.Number).pipe(T.HttpResponseCode()),
    status: S.optional(S.String),
    payload: S.optional(DeleteStatisticsValueMap),
  }),
).annotate({
  identifier: "DeletePropertygraphStatisticsOutput",
}) as any as S.Schema<DeletePropertygraphStatisticsOutput>;
export interface DeleteSparqlStatisticsRequest {}
export const DeleteSparqlStatisticsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/sparql/statistics" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSparqlStatisticsRequest",
}) as any as S.Schema<DeleteSparqlStatisticsRequest>;
export interface DeleteSparqlStatisticsOutput {
  statusCode?: number;
  status?: string;
  payload?: DeleteStatisticsValueMap;
}
export const DeleteSparqlStatisticsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    statusCode: S.optional(S.Number).pipe(T.HttpResponseCode()),
    status: S.optional(S.String),
    payload: S.optional(DeleteStatisticsValueMap),
  }),
).annotate({
  identifier: "DeleteSparqlStatisticsOutput",
}) as any as S.Schema<DeleteSparqlStatisticsOutput>;
export type Action =
  | "initiateDatabaseReset"
  | "performDatabaseReset"
  | (string & {});
export const Action = S.String;

export interface ExecuteFastResetInput {
  action: Action;
  token?: string;
}
export const ExecuteFastResetInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ action: Action, token: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/system" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ExecuteFastResetInput",
}) as any as S.Schema<ExecuteFastResetInput>;
export interface FastResetToken {
  token?: string;
}
export const FastResetToken = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ token: S.optional(S.String) }),
).annotate({ identifier: "FastResetToken" }) as any as S.Schema<FastResetToken>;
export interface ExecuteFastResetOutput {
  status: string;
  payload?: FastResetToken;
}
export const ExecuteFastResetOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: S.String, payload: S.optional(FastResetToken) }),
).annotate({
  identifier: "ExecuteFastResetOutput",
}) as any as S.Schema<ExecuteFastResetOutput>;
export interface ExecuteGremlinExplainQueryInput {
  gremlinQuery: string;
}
export const ExecuteGremlinExplainQueryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ gremlinQuery: S.String })
    .pipe(S.encodeKeys({ gremlinQuery: "gremlin" }))
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/gremlin/explain" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ExecuteGremlinExplainQueryInput",
}) as any as S.Schema<ExecuteGremlinExplainQueryInput>;
export interface ExecuteGremlinExplainQueryOutput {
  output?: T.StreamingOutputBody;
}
export const ExecuteGremlinExplainQueryOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ output: S.optional(T.StreamingOutput).pipe(T.HttpPayload()) }),
).annotate({
  identifier: "ExecuteGremlinExplainQueryOutput",
}) as any as S.Schema<ExecuteGremlinExplainQueryOutput>;
export interface ExecuteGremlinProfileQueryInput {
  gremlinQuery: string;
  results?: boolean;
  chop?: number;
  serializer?: string;
  indexOps?: boolean;
}
export const ExecuteGremlinProfileQueryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gremlinQuery: S.String,
    results: S.optional(S.Boolean),
    chop: S.optional(S.Number),
    serializer: S.optional(S.String),
    indexOps: S.optional(S.Boolean),
  })
    .pipe(
      S.encodeKeys({
        gremlinQuery: "gremlin",
        results: "profile.results",
        chop: "profile.chop",
        serializer: "profile.serializer",
        indexOps: "profile.indexOps",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/gremlin/profile" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ExecuteGremlinProfileQueryInput",
}) as any as S.Schema<ExecuteGremlinProfileQueryInput>;
export interface ExecuteGremlinProfileQueryOutput {
  output?: T.StreamingOutputBody;
}
export const ExecuteGremlinProfileQueryOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ output: S.optional(T.StreamingOutput).pipe(T.HttpPayload()) }),
).annotate({
  identifier: "ExecuteGremlinProfileQueryOutput",
}) as any as S.Schema<ExecuteGremlinProfileQueryOutput>;
export interface ExecuteGremlinQueryInput {
  gremlinQuery: string;
  serializer?: string;
}
export const ExecuteGremlinQueryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gremlinQuery: S.String,
    serializer: S.optional(S.String).pipe(T.HttpHeader("accept")),
  })
    .pipe(S.encodeKeys({ gremlinQuery: "gremlin" }))
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/gremlin" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ExecuteGremlinQueryInput",
}) as any as S.Schema<ExecuteGremlinQueryInput>;
export interface GremlinQueryStatusAttributes {
  message?: string;
  code?: number;
  attributes?: any;
}
export const GremlinQueryStatusAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    message: S.optional(S.String),
    code: S.optional(S.Number),
    attributes: S.optional(S.Any),
  }),
).annotate({
  identifier: "GremlinQueryStatusAttributes",
}) as any as S.Schema<GremlinQueryStatusAttributes>;
export interface ExecuteGremlinQueryOutput {
  requestId?: string;
  status?: GremlinQueryStatusAttributes;
  result?: any;
  meta?: any;
}
export const ExecuteGremlinQueryOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    requestId: S.optional(S.String),
    status: S.optional(GremlinQueryStatusAttributes),
    result: S.optional(S.Any),
    meta: S.optional(S.Any),
  }),
).annotate({
  identifier: "ExecuteGremlinQueryOutput",
}) as any as S.Schema<ExecuteGremlinQueryOutput>;
export type OpenCypherExplainMode =
  | "static"
  | "dynamic"
  | "details"
  | (string & {});
export const OpenCypherExplainMode = S.String;

export interface ExecuteOpenCypherExplainQueryInput {
  openCypherQuery: string;
  parameters?: string;
  explainMode: OpenCypherExplainMode;
}
export const ExecuteOpenCypherExplainQueryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    openCypherQuery: S.String,
    parameters: S.optional(S.String),
    explainMode: OpenCypherExplainMode,
  })
    .pipe(S.encodeKeys({ openCypherQuery: "query", explainMode: "explain" }))
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/opencypher/explain" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ExecuteOpenCypherExplainQueryInput",
}) as any as S.Schema<ExecuteOpenCypherExplainQueryInput>;
export interface ExecuteOpenCypherExplainQueryOutput {
  results: Uint8Array;
}
export const ExecuteOpenCypherExplainQueryOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ results: T.Blob.pipe(T.HttpPayload()) }),
).annotate({
  identifier: "ExecuteOpenCypherExplainQueryOutput",
}) as any as S.Schema<ExecuteOpenCypherExplainQueryOutput>;
export interface ExecuteOpenCypherQueryInput {
  openCypherQuery: string;
  parameters?: string;
}
export const ExecuteOpenCypherQueryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ openCypherQuery: S.String, parameters: S.optional(S.String) })
    .pipe(S.encodeKeys({ openCypherQuery: "query" }))
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/opencypher" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ExecuteOpenCypherQueryInput",
}) as any as S.Schema<ExecuteOpenCypherQueryInput>;
export interface ExecuteOpenCypherQueryOutput {
  results: any;
}
export const ExecuteOpenCypherQueryOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ results: S.Any }),
).annotate({
  identifier: "ExecuteOpenCypherQueryOutput",
}) as any as S.Schema<ExecuteOpenCypherQueryOutput>;
export interface GetEngineStatusRequest {}
export const GetEngineStatusRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/status" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetEngineStatusRequest",
}) as any as S.Schema<GetEngineStatusRequest>;
export interface QueryLanguageVersion {
  version: string;
}
export const QueryLanguageVersion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ version: S.String }),
).annotate({
  identifier: "QueryLanguageVersion",
}) as any as S.Schema<QueryLanguageVersion>;
export type StringValuedMap = { [key: string]: string | undefined };
export const StringValuedMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type DocumentValuedMap = { [key: string]: any | undefined };
export const DocumentValuedMap = /*@__PURE__*/ S.Record(
  S.String,
  S.Any.pipe(S.optional),
);
export interface GetEngineStatusOutput {
  status?: string;
  startTime?: string;
  dbEngineVersion?: string;
  role?: string;
  dfeQueryEngine?: string;
  gremlin?: QueryLanguageVersion;
  sparql?: QueryLanguageVersion;
  opencypher?: QueryLanguageVersion;
  labMode?: { [key: string]: string | undefined };
  rollingBackTrxCount?: number;
  rollingBackTrxEarliestStartTime?: string;
  features?: { [key: string]: any | undefined };
  settings?: { [key: string]: string | undefined };
}
export const GetEngineStatusOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.optional(S.String),
    startTime: S.optional(S.String),
    dbEngineVersion: S.optional(S.String),
    role: S.optional(S.String),
    dfeQueryEngine: S.optional(S.String),
    gremlin: S.optional(QueryLanguageVersion),
    sparql: S.optional(QueryLanguageVersion),
    opencypher: S.optional(QueryLanguageVersion),
    labMode: S.optional(StringValuedMap),
    rollingBackTrxCount: S.optional(S.Number),
    rollingBackTrxEarliestStartTime: S.optional(S.String),
    features: S.optional(DocumentValuedMap),
    settings: S.optional(StringValuedMap),
  }),
).annotate({
  identifier: "GetEngineStatusOutput",
}) as any as S.Schema<GetEngineStatusOutput>;
export interface GetGremlinQueryStatusInput {
  queryId: string;
}
export const GetGremlinQueryStatusInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ queryId: S.String.pipe(T.HttpLabel("queryId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/gremlin/status/{queryId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetGremlinQueryStatusInput",
}) as any as S.Schema<GetGremlinQueryStatusInput>;
export interface QueryEvalStats {
  waited?: number;
  elapsed?: number;
  cancelled?: boolean;
  subqueries?: any;
}
export const QueryEvalStats = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    waited: S.optional(S.Number),
    elapsed: S.optional(S.Number),
    cancelled: S.optional(S.Boolean),
    subqueries: S.optional(S.Any),
  }),
).annotate({ identifier: "QueryEvalStats" }) as any as S.Schema<QueryEvalStats>;
export interface GetGremlinQueryStatusOutput {
  queryId?: string;
  queryString?: string;
  queryEvalStats?: QueryEvalStats;
}
export const GetGremlinQueryStatusOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    queryId: S.optional(S.String),
    queryString: S.optional(S.String),
    queryEvalStats: S.optional(QueryEvalStats),
  }),
).annotate({
  identifier: "GetGremlinQueryStatusOutput",
}) as any as S.Schema<GetGremlinQueryStatusOutput>;
export type PositiveInteger = number;
export interface GetLoaderJobStatusInput {
  loadId: string;
  details?: boolean;
  errors?: boolean;
  page?: number;
  errorsPerPage?: number;
}
export const GetLoaderJobStatusInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    loadId: S.String.pipe(T.HttpLabel("loadId")),
    details: S.optional(S.Boolean).pipe(T.HttpQuery("details")),
    errors: S.optional(S.Boolean).pipe(T.HttpQuery("errors")),
    page: S.optional(S.Number).pipe(T.HttpQuery("page")),
    errorsPerPage: S.optional(S.Number).pipe(T.HttpQuery("errorsPerPage")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/loader/{loadId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetLoaderJobStatusInput",
}) as any as S.Schema<GetLoaderJobStatusInput>;
export interface GetLoaderJobStatusOutput {
  status: string;
  payload: any;
}
export const GetLoaderJobStatusOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: S.String, payload: S.Any }),
).annotate({
  identifier: "GetLoaderJobStatusOutput",
}) as any as S.Schema<GetLoaderJobStatusOutput>;
export interface GetMLDataProcessingJobInput {
  id: string;
  neptuneIamRoleArn?: string;
}
export const GetMLDataProcessingJobInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    neptuneIamRoleArn: S.optional(S.String).pipe(
      T.HttpQuery("neptuneIamRoleArn"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/ml/dataprocessing/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMLDataProcessingJobInput",
}) as any as S.Schema<GetMLDataProcessingJobInput>;
export interface MlResourceDefinition {
  name?: string;
  arn?: string;
  status?: string;
  outputLocation?: string;
  failureReason?: string;
  cloudwatchLogUrl?: string;
}
export const MlResourceDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    arn: S.optional(S.String),
    status: S.optional(S.String),
    outputLocation: S.optional(S.String),
    failureReason: S.optional(S.String),
    cloudwatchLogUrl: S.optional(S.String),
  }),
).annotate({
  identifier: "MlResourceDefinition",
}) as any as S.Schema<MlResourceDefinition>;
export interface GetMLDataProcessingJobOutput {
  status?: string;
  id?: string;
  processingJob?: MlResourceDefinition;
}
export const GetMLDataProcessingJobOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.optional(S.String),
    id: S.optional(S.String),
    processingJob: S.optional(MlResourceDefinition),
  }),
).annotate({
  identifier: "GetMLDataProcessingJobOutput",
}) as any as S.Schema<GetMLDataProcessingJobOutput>;
export interface GetMLEndpointInput {
  id: string;
  neptuneIamRoleArn?: string;
}
export const GetMLEndpointInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    neptuneIamRoleArn: S.optional(S.String).pipe(
      T.HttpQuery("neptuneIamRoleArn"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/ml/endpoints/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMLEndpointInput",
}) as any as S.Schema<GetMLEndpointInput>;
export interface MlConfigDefinition {
  name?: string;
  arn?: string;
}
export const MlConfigDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(S.String), arn: S.optional(S.String) }),
).annotate({
  identifier: "MlConfigDefinition",
}) as any as S.Schema<MlConfigDefinition>;
export interface GetMLEndpointOutput {
  status?: string;
  id?: string;
  endpoint?: MlResourceDefinition;
  endpointConfig?: MlConfigDefinition;
}
export const GetMLEndpointOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.optional(S.String),
    id: S.optional(S.String),
    endpoint: S.optional(MlResourceDefinition),
    endpointConfig: S.optional(MlConfigDefinition),
  }),
).annotate({
  identifier: "GetMLEndpointOutput",
}) as any as S.Schema<GetMLEndpointOutput>;
export interface GetMLModelTrainingJobInput {
  id: string;
  neptuneIamRoleArn?: string;
}
export const GetMLModelTrainingJobInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    neptuneIamRoleArn: S.optional(S.String).pipe(
      T.HttpQuery("neptuneIamRoleArn"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/ml/modeltraining/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMLModelTrainingJobInput",
}) as any as S.Schema<GetMLModelTrainingJobInput>;
export type MlModels = MlConfigDefinition[];
export const MlModels = /*@__PURE__*/ S.Array(MlConfigDefinition);
export interface GetMLModelTrainingJobOutput {
  status?: string;
  id?: string;
  processingJob?: MlResourceDefinition;
  hpoJob?: MlResourceDefinition;
  modelTransformJob?: MlResourceDefinition;
  mlModels?: MlConfigDefinition[];
}
export const GetMLModelTrainingJobOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.optional(S.String),
    id: S.optional(S.String),
    processingJob: S.optional(MlResourceDefinition),
    hpoJob: S.optional(MlResourceDefinition),
    modelTransformJob: S.optional(MlResourceDefinition),
    mlModels: S.optional(MlModels),
  }),
).annotate({
  identifier: "GetMLModelTrainingJobOutput",
}) as any as S.Schema<GetMLModelTrainingJobOutput>;
export interface GetMLModelTransformJobInput {
  id: string;
  neptuneIamRoleArn?: string;
}
export const GetMLModelTransformJobInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    neptuneIamRoleArn: S.optional(S.String).pipe(
      T.HttpQuery("neptuneIamRoleArn"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/ml/modeltransform/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMLModelTransformJobInput",
}) as any as S.Schema<GetMLModelTransformJobInput>;
export type Models = MlConfigDefinition[];
export const Models = /*@__PURE__*/ S.Array(MlConfigDefinition);
export interface GetMLModelTransformJobOutput {
  status?: string;
  id?: string;
  baseProcessingJob?: MlResourceDefinition;
  remoteModelTransformJob?: MlResourceDefinition;
  models?: MlConfigDefinition[];
}
export const GetMLModelTransformJobOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.optional(S.String),
    id: S.optional(S.String),
    baseProcessingJob: S.optional(MlResourceDefinition),
    remoteModelTransformJob: S.optional(MlResourceDefinition),
    models: S.optional(Models),
  }),
).annotate({
  identifier: "GetMLModelTransformJobOutput",
}) as any as S.Schema<GetMLModelTransformJobOutput>;
export interface GetOpenCypherQueryStatusInput {
  queryId: string;
}
export const GetOpenCypherQueryStatusInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ queryId: S.String.pipe(T.HttpLabel("queryId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/opencypher/status/{queryId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetOpenCypherQueryStatusInput",
}) as any as S.Schema<GetOpenCypherQueryStatusInput>;
export interface GetOpenCypherQueryStatusOutput {
  queryId?: string;
  queryString?: string;
  queryEvalStats?: QueryEvalStats;
}
export const GetOpenCypherQueryStatusOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    queryId: S.optional(S.String),
    queryString: S.optional(S.String),
    queryEvalStats: S.optional(QueryEvalStats),
  }),
).annotate({
  identifier: "GetOpenCypherQueryStatusOutput",
}) as any as S.Schema<GetOpenCypherQueryStatusOutput>;
export interface GetPropertygraphStatisticsRequest {}
export const GetPropertygraphStatisticsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/propertygraph/statistics" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPropertygraphStatisticsRequest",
}) as any as S.Schema<GetPropertygraphStatisticsRequest>;
export interface StatisticsSummary {
  signatureCount?: number;
  instanceCount?: number;
  predicateCount?: number;
}
export const StatisticsSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    signatureCount: S.optional(S.Number),
    instanceCount: S.optional(S.Number),
    predicateCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "StatisticsSummary",
}) as any as S.Schema<StatisticsSummary>;
export interface Statistics {
  autoCompute?: boolean;
  active?: boolean;
  statisticsId?: string;
  date?: Date;
  note?: string;
  signatureInfo?: StatisticsSummary;
}
export const Statistics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    autoCompute: S.optional(S.Boolean),
    active: S.optional(S.Boolean),
    statisticsId: S.optional(S.String),
    date: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    note: S.optional(S.String),
    signatureInfo: S.optional(StatisticsSummary),
  }),
).annotate({ identifier: "Statistics" }) as any as S.Schema<Statistics>;
export interface GetPropertygraphStatisticsOutput {
  status: string;
  payload: Statistics;
}
export const GetPropertygraphStatisticsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: S.String, payload: Statistics }),
).annotate({
  identifier: "GetPropertygraphStatisticsOutput",
}) as any as S.Schema<GetPropertygraphStatisticsOutput>;
export type IteratorType =
  | "AT_SEQUENCE_NUMBER"
  | "AFTER_SEQUENCE_NUMBER"
  | "TRIM_HORIZON"
  | "LATEST"
  | (string & {});
export const IteratorType = S.String;

export type Encoding = "gzip" | (string & {});
export const Encoding = S.String;

export interface GetPropertygraphStreamInput {
  limit?: number;
  iteratorType?: IteratorType;
  commitNum?: number;
  opNum?: number;
  encoding?: Encoding;
}
export const GetPropertygraphStreamInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
    iteratorType: S.optional(IteratorType).pipe(T.HttpQuery("iteratorType")),
    commitNum: S.optional(S.Number).pipe(T.HttpQuery("commitNum")),
    opNum: S.optional(S.Number).pipe(T.HttpQuery("opNum")),
    encoding: S.optional(Encoding).pipe(T.HttpHeader("Accept-Encoding")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/propertygraph/stream" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPropertygraphStreamInput",
}) as any as S.Schema<GetPropertygraphStreamInput>;
export interface PropertygraphData {
  id: string;
  type: string;
  key: string;
  value: any;
  from?: string;
  to?: string;
}
export const PropertygraphData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    type: S.String,
    key: S.String,
    value: S.Any,
    from: S.optional(S.String),
    to: S.optional(S.String),
  }),
).annotate({
  identifier: "PropertygraphData",
}) as any as S.Schema<PropertygraphData>;
export interface PropertygraphRecord {
  commitTimestampInMillis: number;
  eventId: { [key: string]: string | undefined };
  data: PropertygraphData;
  op: string;
  isLastOp?: boolean;
}
export const PropertygraphRecord = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    commitTimestampInMillis: S.Number,
    eventId: StringValuedMap,
    data: PropertygraphData,
    op: S.String,
    isLastOp: S.optional(S.Boolean),
  }).pipe(S.encodeKeys({ commitTimestampInMillis: "commitTimestamp" })),
).annotate({
  identifier: "PropertygraphRecord",
}) as any as S.Schema<PropertygraphRecord>;
export type PropertygraphRecordsList = PropertygraphRecord[];
export const PropertygraphRecordsList =
  /*@__PURE__*/ S.Array(PropertygraphRecord);
export interface GetPropertygraphStreamOutput {
  lastEventId: { [key: string]: string | undefined };
  lastTrxTimestampInMillis: number;
  format: string;
  records: PropertygraphRecord[];
  totalRecords: number;
}
export const GetPropertygraphStreamOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    lastEventId: StringValuedMap,
    lastTrxTimestampInMillis: S.Number,
    format: S.String,
    records: PropertygraphRecordsList,
    totalRecords: S.Number,
  }).pipe(S.encodeKeys({ lastTrxTimestampInMillis: "lastTrxTimestamp" })),
).annotate({
  identifier: "GetPropertygraphStreamOutput",
}) as any as S.Schema<GetPropertygraphStreamOutput>;
export type GraphSummaryType = "basic" | "detailed" | (string & {});
export const GraphSummaryType = S.String;

export interface GetPropertygraphSummaryInput {
  mode?: GraphSummaryType;
}
export const GetPropertygraphSummaryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    mode: S.optional(GraphSummaryType).pipe(T.HttpQuery("mode")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/propertygraph/statistics/summary" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPropertygraphSummaryInput",
}) as any as S.Schema<GetPropertygraphSummaryInput>;
export type NodeLabels = string[];
export const NodeLabels = /*@__PURE__*/ S.Array(S.String);
export type EdgeLabels = string[];
export const EdgeLabels = /*@__PURE__*/ S.Array(S.String);
export type LongValuedMap = { [key: string]: number | undefined };
export const LongValuedMap = /*@__PURE__*/ S.Record(
  S.String,
  S.Number.pipe(S.optional),
);
export type LongValuedMapList = { [key: string]: number | undefined }[];
export const LongValuedMapList = /*@__PURE__*/ S.Array(LongValuedMap);
export type NodeProperties = string[];
export const NodeProperties = /*@__PURE__*/ S.Array(S.String);
export type OutgoingEdgeLabels = string[];
export const OutgoingEdgeLabels = /*@__PURE__*/ S.Array(S.String);
export interface NodeStructure {
  count?: number;
  nodeProperties?: string[];
  distinctOutgoingEdgeLabels?: string[];
}
export const NodeStructure = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    count: S.optional(S.Number),
    nodeProperties: S.optional(NodeProperties),
    distinctOutgoingEdgeLabels: S.optional(OutgoingEdgeLabels),
  }),
).annotate({ identifier: "NodeStructure" }) as any as S.Schema<NodeStructure>;
export type NodeStructures = NodeStructure[];
export const NodeStructures = /*@__PURE__*/ S.Array(NodeStructure);
export type EdgeProperties = string[];
export const EdgeProperties = /*@__PURE__*/ S.Array(S.String);
export interface EdgeStructure {
  count?: number;
  edgeProperties?: string[];
}
export const EdgeStructure = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    count: S.optional(S.Number),
    edgeProperties: S.optional(EdgeProperties),
  }),
).annotate({ identifier: "EdgeStructure" }) as any as S.Schema<EdgeStructure>;
export type EdgeStructures = EdgeStructure[];
export const EdgeStructures = /*@__PURE__*/ S.Array(EdgeStructure);
export interface PropertygraphSummary {
  numNodes?: number;
  numEdges?: number;
  numNodeLabels?: number;
  numEdgeLabels?: number;
  nodeLabels?: string[];
  edgeLabels?: string[];
  numNodeProperties?: number;
  numEdgeProperties?: number;
  nodeProperties?: { [key: string]: number | undefined }[];
  edgeProperties?: { [key: string]: number | undefined }[];
  totalNodePropertyValues?: number;
  totalEdgePropertyValues?: number;
  nodeStructures?: NodeStructure[];
  edgeStructures?: EdgeStructure[];
}
export const PropertygraphSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    numNodes: S.optional(S.Number),
    numEdges: S.optional(S.Number),
    numNodeLabels: S.optional(S.Number),
    numEdgeLabels: S.optional(S.Number),
    nodeLabels: S.optional(NodeLabels),
    edgeLabels: S.optional(EdgeLabels),
    numNodeProperties: S.optional(S.Number),
    numEdgeProperties: S.optional(S.Number),
    nodeProperties: S.optional(LongValuedMapList),
    edgeProperties: S.optional(LongValuedMapList),
    totalNodePropertyValues: S.optional(S.Number),
    totalEdgePropertyValues: S.optional(S.Number),
    nodeStructures: S.optional(NodeStructures),
    edgeStructures: S.optional(EdgeStructures),
  }),
).annotate({
  identifier: "PropertygraphSummary",
}) as any as S.Schema<PropertygraphSummary>;
export interface PropertygraphSummaryValueMap {
  version?: string;
  lastStatisticsComputationTime?: Date;
  graphSummary?: PropertygraphSummary;
}
export const PropertygraphSummaryValueMap = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    version: S.optional(S.String),
    lastStatisticsComputationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    graphSummary: S.optional(PropertygraphSummary),
  }),
).annotate({
  identifier: "PropertygraphSummaryValueMap",
}) as any as S.Schema<PropertygraphSummaryValueMap>;
export interface GetPropertygraphSummaryOutput {
  statusCode?: number;
  payload?: PropertygraphSummaryValueMap;
}
export const GetPropertygraphSummaryOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    statusCode: S.optional(S.Number).pipe(T.HttpResponseCode()),
    payload: S.optional(PropertygraphSummaryValueMap),
  }),
).annotate({
  identifier: "GetPropertygraphSummaryOutput",
}) as any as S.Schema<GetPropertygraphSummaryOutput>;
export interface GetRDFGraphSummaryInput {
  mode?: GraphSummaryType;
}
export const GetRDFGraphSummaryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    mode: S.optional(GraphSummaryType).pipe(T.HttpQuery("mode")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/rdf/statistics/summary" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRDFGraphSummaryInput",
}) as any as S.Schema<GetRDFGraphSummaryInput>;
export type Classes = string[];
export const Classes = /*@__PURE__*/ S.Array(S.String);
export type Predicates = string[];
export const Predicates = /*@__PURE__*/ S.Array(S.String);
export interface SubjectStructure {
  count?: number;
  predicates?: string[];
}
export const SubjectStructure = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ count: S.optional(S.Number), predicates: S.optional(Predicates) }),
).annotate({
  identifier: "SubjectStructure",
}) as any as S.Schema<SubjectStructure>;
export type SubjectStructures = SubjectStructure[];
export const SubjectStructures = /*@__PURE__*/ S.Array(SubjectStructure);
export interface RDFGraphSummary {
  numDistinctSubjects?: number;
  numDistinctPredicates?: number;
  numQuads?: number;
  numClasses?: number;
  classes?: string[];
  predicates?: { [key: string]: number | undefined }[];
  subjectStructures?: SubjectStructure[];
}
export const RDFGraphSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    numDistinctSubjects: S.optional(S.Number),
    numDistinctPredicates: S.optional(S.Number),
    numQuads: S.optional(S.Number),
    numClasses: S.optional(S.Number),
    classes: S.optional(Classes),
    predicates: S.optional(LongValuedMapList),
    subjectStructures: S.optional(SubjectStructures),
  }),
).annotate({
  identifier: "RDFGraphSummary",
}) as any as S.Schema<RDFGraphSummary>;
export interface RDFGraphSummaryValueMap {
  version?: string;
  lastStatisticsComputationTime?: Date;
  graphSummary?: RDFGraphSummary;
}
export const RDFGraphSummaryValueMap = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    version: S.optional(S.String),
    lastStatisticsComputationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    graphSummary: S.optional(RDFGraphSummary),
  }),
).annotate({
  identifier: "RDFGraphSummaryValueMap",
}) as any as S.Schema<RDFGraphSummaryValueMap>;
export interface GetRDFGraphSummaryOutput {
  statusCode?: number;
  payload?: RDFGraphSummaryValueMap;
}
export const GetRDFGraphSummaryOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    statusCode: S.optional(S.Number).pipe(T.HttpResponseCode()),
    payload: S.optional(RDFGraphSummaryValueMap),
  }),
).annotate({
  identifier: "GetRDFGraphSummaryOutput",
}) as any as S.Schema<GetRDFGraphSummaryOutput>;
export interface GetSparqlStatisticsRequest {}
export const GetSparqlStatisticsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/sparql/statistics" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSparqlStatisticsRequest",
}) as any as S.Schema<GetSparqlStatisticsRequest>;
export interface GetSparqlStatisticsOutput {
  status: string;
  payload: Statistics;
}
export const GetSparqlStatisticsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: S.String, payload: Statistics }),
).annotate({
  identifier: "GetSparqlStatisticsOutput",
}) as any as S.Schema<GetSparqlStatisticsOutput>;
export interface GetSparqlStreamInput {
  limit?: number;
  iteratorType?: IteratorType;
  commitNum?: number;
  opNum?: number;
  encoding?: Encoding;
}
export const GetSparqlStreamInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
    iteratorType: S.optional(IteratorType).pipe(T.HttpQuery("iteratorType")),
    commitNum: S.optional(S.Number).pipe(T.HttpQuery("commitNum")),
    opNum: S.optional(S.Number).pipe(T.HttpQuery("opNum")),
    encoding: S.optional(Encoding).pipe(T.HttpHeader("Accept-Encoding")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/sparql/stream" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSparqlStreamInput",
}) as any as S.Schema<GetSparqlStreamInput>;
export interface SparqlData {
  stmt: string;
}
export const SparqlData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ stmt: S.String }),
).annotate({ identifier: "SparqlData" }) as any as S.Schema<SparqlData>;
export interface SparqlRecord {
  commitTimestampInMillis: number;
  eventId: { [key: string]: string | undefined };
  data: SparqlData;
  op: string;
  isLastOp?: boolean;
}
export const SparqlRecord = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    commitTimestampInMillis: S.Number,
    eventId: StringValuedMap,
    data: SparqlData,
    op: S.String,
    isLastOp: S.optional(S.Boolean),
  }).pipe(S.encodeKeys({ commitTimestampInMillis: "commitTimestamp" })),
).annotate({ identifier: "SparqlRecord" }) as any as S.Schema<SparqlRecord>;
export type SparqlRecordsList = SparqlRecord[];
export const SparqlRecordsList = /*@__PURE__*/ S.Array(SparqlRecord);
export interface GetSparqlStreamOutput {
  lastEventId: { [key: string]: string | undefined };
  lastTrxTimestampInMillis: number;
  format: string;
  records: SparqlRecord[];
  totalRecords: number;
}
export const GetSparqlStreamOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    lastEventId: StringValuedMap,
    lastTrxTimestampInMillis: S.Number,
    format: S.String,
    records: SparqlRecordsList,
    totalRecords: S.Number,
  }).pipe(S.encodeKeys({ lastTrxTimestampInMillis: "lastTrxTimestamp" })),
).annotate({
  identifier: "GetSparqlStreamOutput",
}) as any as S.Schema<GetSparqlStreamOutput>;
export interface ListGremlinQueriesInput {
  includeWaiting?: boolean;
}
export const ListGremlinQueriesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    includeWaiting: S.optional(S.Boolean).pipe(T.HttpQuery("includeWaiting")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/gremlin/status" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListGremlinQueriesInput",
}) as any as S.Schema<ListGremlinQueriesInput>;
export interface GremlinQueryStatus {
  queryId?: string;
  queryString?: string;
  queryEvalStats?: QueryEvalStats;
}
export const GremlinQueryStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    queryId: S.optional(S.String),
    queryString: S.optional(S.String),
    queryEvalStats: S.optional(QueryEvalStats),
  }),
).annotate({
  identifier: "GremlinQueryStatus",
}) as any as S.Schema<GremlinQueryStatus>;
export type GremlinQueries = GremlinQueryStatus[];
export const GremlinQueries = /*@__PURE__*/ S.Array(GremlinQueryStatus);
export interface ListGremlinQueriesOutput {
  acceptedQueryCount?: number;
  runningQueryCount?: number;
  queries?: GremlinQueryStatus[];
}
export const ListGremlinQueriesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    acceptedQueryCount: S.optional(S.Number),
    runningQueryCount: S.optional(S.Number),
    queries: S.optional(GremlinQueries),
  }),
).annotate({
  identifier: "ListGremlinQueriesOutput",
}) as any as S.Schema<ListGremlinQueriesOutput>;
export interface ListLoaderJobsInput {
  limit?: number;
  includeQueuedLoads?: boolean;
}
export const ListLoaderJobsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
    includeQueuedLoads: S.optional(S.Boolean).pipe(
      T.HttpQuery("includeQueuedLoads"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/loader" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListLoaderJobsInput",
}) as any as S.Schema<ListLoaderJobsInput>;
export type StringList = string[];
export const StringList = /*@__PURE__*/ S.Array(S.String);
export interface LoaderIdResult {
  loadIds?: string[];
}
export const LoaderIdResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ loadIds: S.optional(StringList) }),
).annotate({ identifier: "LoaderIdResult" }) as any as S.Schema<LoaderIdResult>;
export interface ListLoaderJobsOutput {
  status: string;
  payload: LoaderIdResult;
}
export const ListLoaderJobsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: S.String, payload: LoaderIdResult }),
).annotate({
  identifier: "ListLoaderJobsOutput",
}) as any as S.Schema<ListLoaderJobsOutput>;
export interface ListMLDataProcessingJobsInput {
  maxItems?: number;
  neptuneIamRoleArn?: string;
}
export const ListMLDataProcessingJobsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxItems: S.optional(S.Number).pipe(T.HttpQuery("maxItems")),
    neptuneIamRoleArn: S.optional(S.String).pipe(
      T.HttpQuery("neptuneIamRoleArn"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/ml/dataprocessing" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListMLDataProcessingJobsInput",
}) as any as S.Schema<ListMLDataProcessingJobsInput>;
export interface ListMLDataProcessingJobsOutput {
  ids?: string[];
}
export const ListMLDataProcessingJobsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ids: S.optional(StringList) }),
).annotate({
  identifier: "ListMLDataProcessingJobsOutput",
}) as any as S.Schema<ListMLDataProcessingJobsOutput>;
export interface ListMLEndpointsInput {
  maxItems?: number;
  neptuneIamRoleArn?: string;
}
export const ListMLEndpointsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxItems: S.optional(S.Number).pipe(T.HttpQuery("maxItems")),
    neptuneIamRoleArn: S.optional(S.String).pipe(
      T.HttpQuery("neptuneIamRoleArn"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/ml/endpoints" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListMLEndpointsInput",
}) as any as S.Schema<ListMLEndpointsInput>;
export interface ListMLEndpointsOutput {
  ids?: string[];
}
export const ListMLEndpointsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ids: S.optional(StringList) }),
).annotate({
  identifier: "ListMLEndpointsOutput",
}) as any as S.Schema<ListMLEndpointsOutput>;
export interface ListMLModelTrainingJobsInput {
  maxItems?: number;
  neptuneIamRoleArn?: string;
}
export const ListMLModelTrainingJobsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxItems: S.optional(S.Number).pipe(T.HttpQuery("maxItems")),
    neptuneIamRoleArn: S.optional(S.String).pipe(
      T.HttpQuery("neptuneIamRoleArn"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/ml/modeltraining" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListMLModelTrainingJobsInput",
}) as any as S.Schema<ListMLModelTrainingJobsInput>;
export interface ListMLModelTrainingJobsOutput {
  ids?: string[];
}
export const ListMLModelTrainingJobsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ids: S.optional(StringList) }),
).annotate({
  identifier: "ListMLModelTrainingJobsOutput",
}) as any as S.Schema<ListMLModelTrainingJobsOutput>;
export interface ListMLModelTransformJobsInput {
  maxItems?: number;
  neptuneIamRoleArn?: string;
}
export const ListMLModelTransformJobsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxItems: S.optional(S.Number).pipe(T.HttpQuery("maxItems")),
    neptuneIamRoleArn: S.optional(S.String).pipe(
      T.HttpQuery("neptuneIamRoleArn"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/ml/modeltransform" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListMLModelTransformJobsInput",
}) as any as S.Schema<ListMLModelTransformJobsInput>;
export interface ListMLModelTransformJobsOutput {
  ids?: string[];
}
export const ListMLModelTransformJobsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ids: S.optional(StringList) }),
).annotate({
  identifier: "ListMLModelTransformJobsOutput",
}) as any as S.Schema<ListMLModelTransformJobsOutput>;
export interface ListOpenCypherQueriesInput {
  includeWaiting?: boolean;
}
export const ListOpenCypherQueriesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    includeWaiting: S.optional(S.Boolean).pipe(T.HttpQuery("includeWaiting")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/opencypher/status" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListOpenCypherQueriesInput",
}) as any as S.Schema<ListOpenCypherQueriesInput>;
export type OpenCypherQueries = GremlinQueryStatus[];
export const OpenCypherQueries = /*@__PURE__*/ S.Array(GremlinQueryStatus);
export interface ListOpenCypherQueriesOutput {
  acceptedQueryCount?: number;
  runningQueryCount?: number;
  queries?: GremlinQueryStatus[];
}
export const ListOpenCypherQueriesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    acceptedQueryCount: S.optional(S.Number),
    runningQueryCount: S.optional(S.Number),
    queries: S.optional(OpenCypherQueries),
  }),
).annotate({
  identifier: "ListOpenCypherQueriesOutput",
}) as any as S.Schema<ListOpenCypherQueriesOutput>;
export type StatisticsAutoGenerationMode =
  | "disableAutoCompute"
  | "enableAutoCompute"
  | "refresh"
  | (string & {});
export const StatisticsAutoGenerationMode = S.String;

export interface ManagePropertygraphStatisticsInput {
  mode?: StatisticsAutoGenerationMode;
}
export const ManagePropertygraphStatisticsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ mode: S.optional(StatisticsAutoGenerationMode) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/propertygraph/statistics" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ManagePropertygraphStatisticsInput",
}) as any as S.Schema<ManagePropertygraphStatisticsInput>;
export interface RefreshStatisticsIdMap {
  statisticsId?: string;
}
export const RefreshStatisticsIdMap = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ statisticsId: S.optional(S.String) }),
).annotate({
  identifier: "RefreshStatisticsIdMap",
}) as any as S.Schema<RefreshStatisticsIdMap>;
export interface ManagePropertygraphStatisticsOutput {
  status: string;
  payload?: RefreshStatisticsIdMap;
}
export const ManagePropertygraphStatisticsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: S.String, payload: S.optional(RefreshStatisticsIdMap) }),
).annotate({
  identifier: "ManagePropertygraphStatisticsOutput",
}) as any as S.Schema<ManagePropertygraphStatisticsOutput>;
export interface ManageSparqlStatisticsInput {
  mode?: StatisticsAutoGenerationMode;
}
export const ManageSparqlStatisticsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ mode: S.optional(StatisticsAutoGenerationMode) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/sparql/statistics" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ManageSparqlStatisticsInput",
}) as any as S.Schema<ManageSparqlStatisticsInput>;
export interface ManageSparqlStatisticsOutput {
  status: string;
  payload?: RefreshStatisticsIdMap;
}
export const ManageSparqlStatisticsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: S.String, payload: S.optional(RefreshStatisticsIdMap) }),
).annotate({
  identifier: "ManageSparqlStatisticsOutput",
}) as any as S.Schema<ManageSparqlStatisticsOutput>;
export type Format =
  | "csv"
  | "opencypher"
  | "ntriples"
  | "nquads"
  | "rdfxml"
  | "turtle"
  | (string & {});
export const Format = S.String;

export type S3BucketRegion =
  | "us-east-1"
  | "us-east-2"
  | "us-west-1"
  | "us-west-2"
  | "ca-central-1"
  | "sa-east-1"
  | "eu-north-1"
  | "eu-west-1"
  | "eu-west-2"
  | "eu-west-3"
  | "eu-central-1"
  | "me-south-1"
  | "af-south-1"
  | "ap-east-1"
  | "ap-northeast-1"
  | "ap-northeast-2"
  | "ap-southeast-1"
  | "ap-southeast-2"
  | "ap-south-1"
  | "cn-north-1"
  | "cn-northwest-1"
  | "us-gov-west-1"
  | "us-gov-east-1"
  | "ca-west-1"
  | "eu-south-2"
  | "il-central-1"
  | "me-central-1"
  | "ap-northeast-3"
  | "ap-southeast-3"
  | "ap-southeast-4"
  | "ap-southeast-5"
  | "ap-southeast-7"
  | "mx-central-1"
  | "ap-east-2"
  | "ap-south-2"
  | "eu-central-2"
  | (string & {});
export const S3BucketRegion = S.String;

export type Mode = "RESUME" | "NEW" | "AUTO" | (string & {});
export const Mode = S.String;

export type Parallelism =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "OVERSUBSCRIBE"
  | (string & {});
export const Parallelism = S.String;

export interface StartLoaderJobInput {
  source: string;
  format: Format;
  s3BucketRegion: S3BucketRegion;
  iamRoleArn: string;
  mode?: Mode;
  failOnError?: boolean;
  parallelism?: Parallelism;
  parserConfiguration?: { [key: string]: string | undefined };
  updateSingleCardinalityProperties?: boolean;
  queueRequest?: boolean;
  dependencies?: string[];
  userProvidedEdgeIds?: boolean;
  edgeOnlyLoad?: boolean;
}
export const StartLoaderJobInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    source: S.String,
    format: Format,
    s3BucketRegion: S3BucketRegion,
    iamRoleArn: S.String,
    mode: S.optional(Mode),
    failOnError: S.optional(S.Boolean),
    parallelism: S.optional(Parallelism),
    parserConfiguration: S.optional(StringValuedMap),
    updateSingleCardinalityProperties: S.optional(S.Boolean),
    queueRequest: S.optional(S.Boolean),
    dependencies: S.optional(StringList),
    userProvidedEdgeIds: S.optional(S.Boolean),
    edgeOnlyLoad: S.optional(S.Boolean),
  })
    .pipe(S.encodeKeys({ s3BucketRegion: "region" }))
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/loader" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "StartLoaderJobInput",
}) as any as S.Schema<StartLoaderJobInput>;
export interface StartLoaderJobOutput {
  status: string;
  payload: { [key: string]: string | undefined };
}
export const StartLoaderJobOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: S.String, payload: StringValuedMap }),
).annotate({
  identifier: "StartLoaderJobOutput",
}) as any as S.Schema<StartLoaderJobOutput>;
export interface StartMLDataProcessingJobInput {
  id?: string;
  previousDataProcessingJobId?: string;
  inputDataS3Location: string;
  processedDataS3Location: string;
  sagemakerIamRoleArn?: string;
  neptuneIamRoleArn?: string;
  processingInstanceType?: string;
  processingInstanceVolumeSizeInGB?: number;
  processingTimeOutInSeconds?: number;
  modelType?: string;
  configFileName?: string;
  subnets?: string[];
  securityGroupIds?: string[];
  volumeEncryptionKMSKey?: string;
  s3OutputEncryptionKMSKey?: string;
}
export const StartMLDataProcessingJobInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    previousDataProcessingJobId: S.optional(S.String),
    inputDataS3Location: S.String,
    processedDataS3Location: S.String,
    sagemakerIamRoleArn: S.optional(S.String),
    neptuneIamRoleArn: S.optional(S.String),
    processingInstanceType: S.optional(S.String),
    processingInstanceVolumeSizeInGB: S.optional(S.Number),
    processingTimeOutInSeconds: S.optional(S.Number),
    modelType: S.optional(S.String),
    configFileName: S.optional(S.String),
    subnets: S.optional(StringList),
    securityGroupIds: S.optional(StringList),
    volumeEncryptionKMSKey: S.optional(S.String),
    s3OutputEncryptionKMSKey: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ml/dataprocessing" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartMLDataProcessingJobInput",
}) as any as S.Schema<StartMLDataProcessingJobInput>;
export interface StartMLDataProcessingJobOutput {
  id?: string;
  arn?: string;
  creationTimeInMillis?: number;
}
export const StartMLDataProcessingJobOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    arn: S.optional(S.String),
    creationTimeInMillis: S.optional(S.Number),
  }),
).annotate({
  identifier: "StartMLDataProcessingJobOutput",
}) as any as S.Schema<StartMLDataProcessingJobOutput>;
export interface CustomModelTrainingParameters {
  sourceS3DirectoryPath: string;
  trainingEntryPointScript?: string;
  transformEntryPointScript?: string;
}
export const CustomModelTrainingParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceS3DirectoryPath: S.String,
    trainingEntryPointScript: S.optional(S.String),
    transformEntryPointScript: S.optional(S.String),
  }),
).annotate({
  identifier: "CustomModelTrainingParameters",
}) as any as S.Schema<CustomModelTrainingParameters>;
export interface StartMLModelTrainingJobInput {
  id?: string;
  previousModelTrainingJobId?: string;
  dataProcessingJobId: string;
  trainModelS3Location: string;
  sagemakerIamRoleArn?: string;
  neptuneIamRoleArn?: string;
  baseProcessingInstanceType?: string;
  trainingInstanceType?: string;
  trainingInstanceVolumeSizeInGB?: number;
  trainingTimeOutInSeconds?: number;
  maxHPONumberOfTrainingJobs?: number;
  maxHPOParallelTrainingJobs?: number;
  subnets?: string[];
  securityGroupIds?: string[];
  volumeEncryptionKMSKey?: string;
  s3OutputEncryptionKMSKey?: string;
  enableManagedSpotTraining?: boolean;
  customModelTrainingParameters?: CustomModelTrainingParameters;
}
export const StartMLModelTrainingJobInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    previousModelTrainingJobId: S.optional(S.String),
    dataProcessingJobId: S.String,
    trainModelS3Location: S.String,
    sagemakerIamRoleArn: S.optional(S.String),
    neptuneIamRoleArn: S.optional(S.String),
    baseProcessingInstanceType: S.optional(S.String),
    trainingInstanceType: S.optional(S.String),
    trainingInstanceVolumeSizeInGB: S.optional(S.Number),
    trainingTimeOutInSeconds: S.optional(S.Number),
    maxHPONumberOfTrainingJobs: S.optional(S.Number),
    maxHPOParallelTrainingJobs: S.optional(S.Number),
    subnets: S.optional(StringList),
    securityGroupIds: S.optional(StringList),
    volumeEncryptionKMSKey: S.optional(S.String),
    s3OutputEncryptionKMSKey: S.optional(S.String),
    enableManagedSpotTraining: S.optional(S.Boolean),
    customModelTrainingParameters: S.optional(CustomModelTrainingParameters),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ml/modeltraining" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartMLModelTrainingJobInput",
}) as any as S.Schema<StartMLModelTrainingJobInput>;
export interface StartMLModelTrainingJobOutput {
  id?: string;
  arn?: string;
  creationTimeInMillis?: number;
}
export const StartMLModelTrainingJobOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    arn: S.optional(S.String),
    creationTimeInMillis: S.optional(S.Number),
  }),
).annotate({
  identifier: "StartMLModelTrainingJobOutput",
}) as any as S.Schema<StartMLModelTrainingJobOutput>;
export interface CustomModelTransformParameters {
  sourceS3DirectoryPath: string;
  transformEntryPointScript?: string;
}
export const CustomModelTransformParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceS3DirectoryPath: S.String,
    transformEntryPointScript: S.optional(S.String),
  }),
).annotate({
  identifier: "CustomModelTransformParameters",
}) as any as S.Schema<CustomModelTransformParameters>;
export interface StartMLModelTransformJobInput {
  id?: string;
  dataProcessingJobId?: string;
  mlModelTrainingJobId?: string;
  trainingJobName?: string;
  modelTransformOutputS3Location: string;
  sagemakerIamRoleArn?: string;
  neptuneIamRoleArn?: string;
  customModelTransformParameters?: CustomModelTransformParameters;
  baseProcessingInstanceType?: string;
  baseProcessingInstanceVolumeSizeInGB?: number;
  subnets?: string[];
  securityGroupIds?: string[];
  volumeEncryptionKMSKey?: string;
  s3OutputEncryptionKMSKey?: string;
}
export const StartMLModelTransformJobInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    dataProcessingJobId: S.optional(S.String),
    mlModelTrainingJobId: S.optional(S.String),
    trainingJobName: S.optional(S.String),
    modelTransformOutputS3Location: S.String,
    sagemakerIamRoleArn: S.optional(S.String),
    neptuneIamRoleArn: S.optional(S.String),
    customModelTransformParameters: S.optional(CustomModelTransformParameters),
    baseProcessingInstanceType: S.optional(S.String),
    baseProcessingInstanceVolumeSizeInGB: S.optional(S.Number),
    subnets: S.optional(StringList),
    securityGroupIds: S.optional(StringList),
    volumeEncryptionKMSKey: S.optional(S.String),
    s3OutputEncryptionKMSKey: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ml/modeltransform" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartMLModelTransformJobInput",
}) as any as S.Schema<StartMLModelTransformJobInput>;
export interface StartMLModelTransformJobOutput {
  id?: string;
  arn?: string;
  creationTimeInMillis?: number;
}
export const StartMLModelTransformJobOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    arn: S.optional(S.String),
    creationTimeInMillis: S.optional(S.Number),
  }),
).annotate({
  identifier: "StartMLModelTransformJobOutput",
}) as any as S.Schema<StartMLModelTransformJobOutput>;
export type CancelGremlinQueryError =
  | BadRequestException
  | ClientTimeoutException
  | ConcurrentModificationException
  | ConstraintViolationException
  | FailureByQueryException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MissingParameterException
  | ParsingException
  | PreconditionsFailedException
  | TimeLimitExceededException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Cancels a Gremlin query. See Gremlin query cancellation for more information.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:CancelQuery IAM action in that cluster.
 */
export const cancelGremlinQuery: API.OperationMethod<
  CancelGremlinQueryInput,
  CancelGremlinQueryOutput,
  CancelGremlinQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelGremlinQueryInput,
  output: CancelGremlinQueryOutput,
  errors: [
    BadRequestException,
    ClientTimeoutException,
    ConcurrentModificationException,
    ConstraintViolationException,
    FailureByQueryException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MissingParameterException,
    ParsingException,
    PreconditionsFailedException,
    TimeLimitExceededException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelGremlinQuery",
}));

export type CancelLoaderJobError =
  | BadRequestException
  | BulkLoadIdNotFoundException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InternalFailureException
  | InvalidArgumentException
  | InvalidParameterException
  | LoadUrlAccessDeniedException
  | MissingParameterException
  | PreconditionsFailedException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Cancels a specified load job. This is an HTTP `DELETE` request. See Neptune Loader Get-Status API for more information.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:CancelLoaderJob IAM action in that cluster..
 */
export const cancelLoaderJob: API.OperationMethod<
  CancelLoaderJobInput,
  CancelLoaderJobOutput,
  CancelLoaderJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelLoaderJobInput,
  output: CancelLoaderJobOutput,
  errors: [
    BadRequestException,
    BulkLoadIdNotFoundException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InternalFailureException,
    InvalidArgumentException,
    InvalidParameterException,
    LoadUrlAccessDeniedException,
    MissingParameterException,
    PreconditionsFailedException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelLoaderJob",
}));

export type CancelMLDataProcessingJobError =
  | BadRequestException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MissingParameterException
  | MLResourceNotFoundException
  | PreconditionsFailedException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Cancels a Neptune ML data processing job. See The `dataprocessing` command.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:CancelMLDataProcessingJob IAM action in that cluster.
 */
export const cancelMLDataProcessingJob: API.OperationMethod<
  CancelMLDataProcessingJobInput,
  CancelMLDataProcessingJobOutput,
  CancelMLDataProcessingJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelMLDataProcessingJobInput,
  output: CancelMLDataProcessingJobOutput,
  errors: [
    BadRequestException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MissingParameterException,
    MLResourceNotFoundException,
    PreconditionsFailedException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelMLDataProcessingJob",
}));

export type CancelMLModelTrainingJobError =
  | BadRequestException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MissingParameterException
  | MLResourceNotFoundException
  | PreconditionsFailedException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Cancels a Neptune ML model training job. See Model training using the `modeltraining` command.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:CancelMLModelTrainingJob IAM action in that cluster.
 */
export const cancelMLModelTrainingJob: API.OperationMethod<
  CancelMLModelTrainingJobInput,
  CancelMLModelTrainingJobOutput,
  CancelMLModelTrainingJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelMLModelTrainingJobInput,
  output: CancelMLModelTrainingJobOutput,
  errors: [
    BadRequestException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MissingParameterException,
    MLResourceNotFoundException,
    PreconditionsFailedException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelMLModelTrainingJob",
}));

export type CancelMLModelTransformJobError =
  | BadRequestException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MissingParameterException
  | MLResourceNotFoundException
  | PreconditionsFailedException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Cancels a specified model transform job. See Use a trained model to generate new model artifacts.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:CancelMLModelTransformJob IAM action in that cluster.
 */
export const cancelMLModelTransformJob: API.OperationMethod<
  CancelMLModelTransformJobInput,
  CancelMLModelTransformJobOutput,
  CancelMLModelTransformJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelMLModelTransformJobInput,
  output: CancelMLModelTransformJobOutput,
  errors: [
    BadRequestException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MissingParameterException,
    MLResourceNotFoundException,
    PreconditionsFailedException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelMLModelTransformJob",
}));

export type CancelOpenCypherQueryError =
  | BadRequestException
  | ClientTimeoutException
  | ConcurrentModificationException
  | ConstraintViolationException
  | FailureByQueryException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidNumericDataException
  | InvalidParameterException
  | MissingParameterException
  | ParsingException
  | PreconditionsFailedException
  | TimeLimitExceededException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Cancels a specified openCypher query. See Neptune openCypher status endpoint for more information.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:CancelQuery IAM action in that cluster.
 */
export const cancelOpenCypherQuery: API.OperationMethod<
  CancelOpenCypherQueryInput,
  CancelOpenCypherQueryOutput,
  CancelOpenCypherQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelOpenCypherQueryInput,
  output: CancelOpenCypherQueryOutput,
  errors: [
    BadRequestException,
    ClientTimeoutException,
    ConcurrentModificationException,
    ConstraintViolationException,
    FailureByQueryException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidNumericDataException,
    InvalidParameterException,
    MissingParameterException,
    ParsingException,
    PreconditionsFailedException,
    TimeLimitExceededException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelOpenCypherQuery",
}));

export type CreateMLEndpointError =
  | BadRequestException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MissingParameterException
  | MLResourceNotFoundException
  | PreconditionsFailedException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Creates a new Neptune ML inference endpoint that lets you query one specific model that the model-training process constructed. See Managing inference endpoints using the endpoints command.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:CreateMLEndpoint IAM action in that cluster.
 */
export const createMLEndpoint: API.OperationMethod<
  CreateMLEndpointInput,
  CreateMLEndpointOutput,
  CreateMLEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateMLEndpointInput,
  output: CreateMLEndpointOutput,
  errors: [
    BadRequestException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MissingParameterException,
    MLResourceNotFoundException,
    PreconditionsFailedException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMLEndpoint",
}));

export type DeleteMLEndpointError =
  | BadRequestException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MissingParameterException
  | MLResourceNotFoundException
  | PreconditionsFailedException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Cancels the creation of a Neptune ML inference endpoint. See Managing inference endpoints using the endpoints command.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:DeleteMLEndpoint IAM action in that cluster.
 */
export const deleteMLEndpoint: API.OperationMethod<
  DeleteMLEndpointInput,
  DeleteMLEndpointOutput,
  DeleteMLEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteMLEndpointInput,
  output: DeleteMLEndpointOutput,
  errors: [
    BadRequestException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MissingParameterException,
    MLResourceNotFoundException,
    PreconditionsFailedException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMLEndpoint",
}));

export type DeletePropertygraphStatisticsError =
  | AccessDeniedException
  | BadRequestException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MissingParameterException
  | PreconditionsFailedException
  | ReadOnlyViolationException
  | StatisticsNotAvailableException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Deletes statistics for Gremlin and openCypher (property graph) data.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:DeleteStatistics IAM action in that cluster.
 */
export const deletePropertygraphStatistics: API.OperationMethod<
  DeletePropertygraphStatisticsRequest,
  DeletePropertygraphStatisticsOutput,
  DeletePropertygraphStatisticsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePropertygraphStatisticsRequest,
  output: DeletePropertygraphStatisticsOutput,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MissingParameterException,
    PreconditionsFailedException,
    ReadOnlyViolationException,
    StatisticsNotAvailableException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePropertygraphStatistics",
}));

export type DeleteSparqlStatisticsError =
  | AccessDeniedException
  | BadRequestException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MissingParameterException
  | PreconditionsFailedException
  | ReadOnlyViolationException
  | StatisticsNotAvailableException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Deletes SPARQL statistics
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:DeleteStatistics IAM action in that cluster.
 */
export const deleteSparqlStatistics: API.OperationMethod<
  DeleteSparqlStatisticsRequest,
  DeleteSparqlStatisticsOutput,
  DeleteSparqlStatisticsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSparqlStatisticsRequest,
  output: DeleteSparqlStatisticsOutput,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MissingParameterException,
    PreconditionsFailedException,
    ReadOnlyViolationException,
    StatisticsNotAvailableException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSparqlStatistics",
}));

export type ExecuteFastResetError =
  | AccessDeniedException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MethodNotAllowedException
  | MissingParameterException
  | PreconditionsFailedException
  | ReadOnlyViolationException
  | ServerShutdownException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * The fast reset REST API lets you reset a Neptune graph quicky and easily, removing all of its data.
 *
 * Neptune fast reset is a two-step process. First you call `ExecuteFastReset` with `action` set to `initiateDatabaseReset`. This returns a UUID token which you then include when calling `ExecuteFastReset` again with `action` set to `performDatabaseReset`. See Empty an Amazon Neptune DB cluster using the fast reset API.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:ResetDatabase IAM action in that cluster.
 */
export const executeFastReset: API.OperationMethod<
  ExecuteFastResetInput,
  ExecuteFastResetOutput,
  ExecuteFastResetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ExecuteFastResetInput,
  output: ExecuteFastResetOutput,
  errors: [
    AccessDeniedException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MethodNotAllowedException,
    MissingParameterException,
    PreconditionsFailedException,
    ReadOnlyViolationException,
    ServerShutdownException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExecuteFastReset",
}));

export type ExecuteGremlinExplainQueryError =
  | BadRequestException
  | CancelledByUserException
  | ClientTimeoutException
  | ConcurrentModificationException
  | ConstraintViolationException
  | FailureByQueryException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MalformedQueryException
  | MemoryLimitExceededException
  | MissingParameterException
  | ParsingException
  | PreconditionsFailedException
  | QueryLimitExceededException
  | QueryLimitException
  | QueryTooLargeException
  | TimeLimitExceededException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Executes a Gremlin Explain query.
 *
 * Amazon Neptune has added a Gremlin feature named `explain` that provides is a self-service tool for understanding the execution approach being taken by the Neptune engine for the query. You invoke it by adding an `explain` parameter to an HTTP call that submits a Gremlin query.
 *
 * The explain feature provides information about the logical structure of query execution plans. You can use this information to identify potential evaluation and execution bottlenecks and to tune your query, as explained in Tuning Gremlin queries. You can also use query hints to improve query execution plans.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows one of the following IAM actions in that cluster, depending on the query:
 *
 * - neptune-db:ReadDataViaQuery
 *
 * - neptune-db:WriteDataViaQuery
 *
 * - neptune-db:DeleteDataViaQuery
 *
 * Note that the neptune-db:QueryLanguage:Gremlin IAM condition key can be used in the policy document to restrict the use of Gremlin queries (see Condition keys available in Neptune IAM data-access policy statements).
 */
export const executeGremlinExplainQuery: API.OperationMethod<
  ExecuteGremlinExplainQueryInput,
  ExecuteGremlinExplainQueryOutput,
  ExecuteGremlinExplainQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ExecuteGremlinExplainQueryInput,
  output: ExecuteGremlinExplainQueryOutput,
  errors: [
    BadRequestException,
    CancelledByUserException,
    ClientTimeoutException,
    ConcurrentModificationException,
    ConstraintViolationException,
    FailureByQueryException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MalformedQueryException,
    MemoryLimitExceededException,
    MissingParameterException,
    ParsingException,
    PreconditionsFailedException,
    QueryLimitExceededException,
    QueryLimitException,
    QueryTooLargeException,
    TimeLimitExceededException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExecuteGremlinExplainQuery",
}));

export type ExecuteGremlinProfileQueryError =
  | BadRequestException
  | CancelledByUserException
  | ClientTimeoutException
  | ConcurrentModificationException
  | ConstraintViolationException
  | FailureByQueryException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MalformedQueryException
  | MemoryLimitExceededException
  | MissingParameterException
  | ParsingException
  | PreconditionsFailedException
  | QueryLimitExceededException
  | QueryLimitException
  | QueryTooLargeException
  | TimeLimitExceededException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Executes a Gremlin Profile query, which runs a specified traversal, collects various metrics about the run, and produces a profile report as output. See Gremlin profile API in Neptune for details.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:ReadDataViaQuery IAM action in that cluster.
 *
 * Note that the neptune-db:QueryLanguage:Gremlin IAM condition key can be used in the policy document to restrict the use of Gremlin queries (see Condition keys available in Neptune IAM data-access policy statements).
 */
export const executeGremlinProfileQuery: API.OperationMethod<
  ExecuteGremlinProfileQueryInput,
  ExecuteGremlinProfileQueryOutput,
  ExecuteGremlinProfileQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ExecuteGremlinProfileQueryInput,
  output: ExecuteGremlinProfileQueryOutput,
  errors: [
    BadRequestException,
    CancelledByUserException,
    ClientTimeoutException,
    ConcurrentModificationException,
    ConstraintViolationException,
    FailureByQueryException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MalformedQueryException,
    MemoryLimitExceededException,
    MissingParameterException,
    ParsingException,
    PreconditionsFailedException,
    QueryLimitExceededException,
    QueryLimitException,
    QueryTooLargeException,
    TimeLimitExceededException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExecuteGremlinProfileQuery",
}));

export type ExecuteGremlinQueryError =
  | BadRequestException
  | CancelledByUserException
  | ClientTimeoutException
  | ConcurrentModificationException
  | ConstraintViolationException
  | FailureByQueryException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MalformedQueryException
  | MemoryLimitExceededException
  | MissingParameterException
  | ParsingException
  | PreconditionsFailedException
  | QueryLimitExceededException
  | QueryLimitException
  | QueryTooLargeException
  | TimeLimitExceededException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * This commands executes a Gremlin query. Amazon Neptune is compatible with Apache TinkerPop3 and Gremlin, so you can use the Gremlin traversal language to query the graph, as described under The Graph in the Apache TinkerPop3 documentation. More details can also be found in Accessing a Neptune graph with Gremlin.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that enables one of the following IAM actions in that cluster, depending on the query:
 *
 * - neptune-db:ReadDataViaQuery
 *
 * - neptune-db:WriteDataViaQuery
 *
 * - neptune-db:DeleteDataViaQuery
 *
 * Note that the neptune-db:QueryLanguage:Gremlin IAM condition key can be used in the policy document to restrict the use of Gremlin queries (see Condition keys available in Neptune IAM data-access policy statements).
 */
export const executeGremlinQuery: API.OperationMethod<
  ExecuteGremlinQueryInput,
  ExecuteGremlinQueryOutput,
  ExecuteGremlinQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ExecuteGremlinQueryInput,
  output: ExecuteGremlinQueryOutput,
  errors: [
    BadRequestException,
    CancelledByUserException,
    ClientTimeoutException,
    ConcurrentModificationException,
    ConstraintViolationException,
    FailureByQueryException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MalformedQueryException,
    MemoryLimitExceededException,
    MissingParameterException,
    ParsingException,
    PreconditionsFailedException,
    QueryLimitExceededException,
    QueryLimitException,
    QueryTooLargeException,
    TimeLimitExceededException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExecuteGremlinQuery",
}));

export type ExecuteOpenCypherExplainQueryError =
  | BadRequestException
  | CancelledByUserException
  | ClientTimeoutException
  | ConcurrentModificationException
  | ConstraintViolationException
  | FailureByQueryException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidNumericDataException
  | InvalidParameterException
  | MalformedQueryException
  | MemoryLimitExceededException
  | MissingParameterException
  | ParsingException
  | PreconditionsFailedException
  | QueryLimitExceededException
  | QueryLimitException
  | QueryTooLargeException
  | TimeLimitExceededException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Executes an openCypher `explain` request. See The openCypher explain feature for more information.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:ReadDataViaQuery IAM action in that cluster.
 *
 * Note that the neptune-db:QueryLanguage:OpenCypher IAM condition key can be used in the policy document to restrict the use of openCypher queries (see Condition keys available in Neptune IAM data-access policy statements).
 */
export const executeOpenCypherExplainQuery: API.OperationMethod<
  ExecuteOpenCypherExplainQueryInput,
  ExecuteOpenCypherExplainQueryOutput,
  ExecuteOpenCypherExplainQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ExecuteOpenCypherExplainQueryInput,
  output: ExecuteOpenCypherExplainQueryOutput,
  errors: [
    BadRequestException,
    CancelledByUserException,
    ClientTimeoutException,
    ConcurrentModificationException,
    ConstraintViolationException,
    FailureByQueryException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidNumericDataException,
    InvalidParameterException,
    MalformedQueryException,
    MemoryLimitExceededException,
    MissingParameterException,
    ParsingException,
    PreconditionsFailedException,
    QueryLimitExceededException,
    QueryLimitException,
    QueryTooLargeException,
    TimeLimitExceededException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExecuteOpenCypherExplainQuery",
}));

export type ExecuteOpenCypherQueryError =
  | BadRequestException
  | CancelledByUserException
  | ClientTimeoutException
  | ConcurrentModificationException
  | ConstraintViolationException
  | FailureByQueryException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidNumericDataException
  | InvalidParameterException
  | MalformedQueryException
  | MemoryLimitExceededException
  | MissingParameterException
  | ParsingException
  | PreconditionsFailedException
  | QueryLimitExceededException
  | QueryLimitException
  | QueryTooLargeException
  | TimeLimitExceededException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Executes an openCypher query. See Accessing the Neptune Graph with openCypher for more information.
 *
 * Neptune supports building graph applications using openCypher, which is currently one of the most popular query languages among developers working with graph databases. Developers, business analysts, and data scientists like openCypher's declarative, SQL-inspired syntax because it provides a familiar structure in which to querying property graphs.
 *
 * The openCypher language was originally developed by Neo4j, then open-sourced in 2015 and contributed to the openCypher project under an Apache 2 open-source license.
 *
 * Note that when invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows one of the following IAM actions in that cluster, depending on the query:
 *
 * - neptune-db:ReadDataViaQuery
 *
 * - neptune-db:WriteDataViaQuery
 *
 * - neptune-db:DeleteDataViaQuery
 *
 * Note also that the neptune-db:QueryLanguage:OpenCypher IAM condition key can be used in the policy document to restrict the use of openCypher queries (see Condition keys available in Neptune IAM data-access policy statements).
 */
export const executeOpenCypherQuery: API.OperationMethod<
  ExecuteOpenCypherQueryInput,
  ExecuteOpenCypherQueryOutput,
  ExecuteOpenCypherQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ExecuteOpenCypherQueryInput,
  output: ExecuteOpenCypherQueryOutput,
  errors: [
    BadRequestException,
    CancelledByUserException,
    ClientTimeoutException,
    ConcurrentModificationException,
    ConstraintViolationException,
    FailureByQueryException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidNumericDataException,
    InvalidParameterException,
    MalformedQueryException,
    MemoryLimitExceededException,
    MissingParameterException,
    ParsingException,
    PreconditionsFailedException,
    QueryLimitExceededException,
    QueryLimitException,
    QueryTooLargeException,
    TimeLimitExceededException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExecuteOpenCypherQuery",
}));

export type GetEngineStatusError =
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InternalFailureException
  | InvalidArgumentException
  | PreconditionsFailedException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Retrieves the status of the graph database on the host.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:GetEngineStatus IAM action in that cluster.
 */
export const getEngineStatus: API.OperationMethod<
  GetEngineStatusRequest,
  GetEngineStatusOutput,
  GetEngineStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEngineStatusRequest,
  output: GetEngineStatusOutput,
  errors: [
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InternalFailureException,
    InvalidArgumentException,
    PreconditionsFailedException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEngineStatus",
}));

export type GetGremlinQueryStatusError =
  | AccessDeniedException
  | BadRequestException
  | ClientTimeoutException
  | ConcurrentModificationException
  | ConstraintViolationException
  | FailureByQueryException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MissingParameterException
  | ParsingException
  | PreconditionsFailedException
  | ReadOnlyViolationException
  | TimeLimitExceededException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Gets the status of a specified Gremlin query.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:GetQueryStatus IAM action in that cluster.
 *
 * Note that the neptune-db:QueryLanguage:Gremlin IAM condition key can be used in the policy document to restrict the use of Gremlin queries (see Condition keys available in Neptune IAM data-access policy statements).
 */
export const getGremlinQueryStatus: API.OperationMethod<
  GetGremlinQueryStatusInput,
  GetGremlinQueryStatusOutput,
  GetGremlinQueryStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetGremlinQueryStatusInput,
  output: GetGremlinQueryStatusOutput,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ClientTimeoutException,
    ConcurrentModificationException,
    ConstraintViolationException,
    FailureByQueryException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MissingParameterException,
    ParsingException,
    PreconditionsFailedException,
    ReadOnlyViolationException,
    TimeLimitExceededException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGremlinQueryStatus",
}));

export type GetLoaderJobStatusError =
  | BadRequestException
  | BulkLoadIdNotFoundException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InternalFailureException
  | InvalidArgumentException
  | InvalidParameterException
  | LoadUrlAccessDeniedException
  | MissingParameterException
  | PreconditionsFailedException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Gets status information about a specified load job. Neptune keeps track of the most recent 1,024 bulk load jobs, and stores the last 10,000 error details per job.
 *
 * See Neptune Loader Get-Status API for more information.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:GetLoaderJobStatus IAM action in that cluster..
 */
export const getLoaderJobStatus: API.OperationMethod<
  GetLoaderJobStatusInput,
  GetLoaderJobStatusOutput,
  GetLoaderJobStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetLoaderJobStatusInput,
  output: GetLoaderJobStatusOutput,
  errors: [
    BadRequestException,
    BulkLoadIdNotFoundException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InternalFailureException,
    InvalidArgumentException,
    InvalidParameterException,
    LoadUrlAccessDeniedException,
    MissingParameterException,
    PreconditionsFailedException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLoaderJobStatus",
}));

export type GetMLDataProcessingJobError =
  | BadRequestException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MissingParameterException
  | MLResourceNotFoundException
  | PreconditionsFailedException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Retrieves information about a specified data processing job. See The `dataprocessing` command.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:neptune-db:GetMLDataProcessingJobStatus IAM action in that cluster.
 */
export const getMLDataProcessingJob: API.OperationMethod<
  GetMLDataProcessingJobInput,
  GetMLDataProcessingJobOutput,
  GetMLDataProcessingJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMLDataProcessingJobInput,
  output: GetMLDataProcessingJobOutput,
  errors: [
    BadRequestException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MissingParameterException,
    MLResourceNotFoundException,
    PreconditionsFailedException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMLDataProcessingJob",
}));

export type GetMLEndpointError =
  | BadRequestException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MissingParameterException
  | MLResourceNotFoundException
  | PreconditionsFailedException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Retrieves details about an inference endpoint. See Managing inference endpoints using the endpoints command.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:GetMLEndpointStatus IAM action in that cluster.
 */
export const getMLEndpoint: API.OperationMethod<
  GetMLEndpointInput,
  GetMLEndpointOutput,
  GetMLEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMLEndpointInput,
  output: GetMLEndpointOutput,
  errors: [
    BadRequestException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MissingParameterException,
    MLResourceNotFoundException,
    PreconditionsFailedException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMLEndpoint",
}));

export type GetMLModelTrainingJobError =
  | BadRequestException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MissingParameterException
  | MLResourceNotFoundException
  | PreconditionsFailedException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Retrieves information about a Neptune ML model training job. See Model training using the `modeltraining` command.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:GetMLModelTrainingJobStatus IAM action in that cluster.
 */
export const getMLModelTrainingJob: API.OperationMethod<
  GetMLModelTrainingJobInput,
  GetMLModelTrainingJobOutput,
  GetMLModelTrainingJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMLModelTrainingJobInput,
  output: GetMLModelTrainingJobOutput,
  errors: [
    BadRequestException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MissingParameterException,
    MLResourceNotFoundException,
    PreconditionsFailedException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMLModelTrainingJob",
}));

export type GetMLModelTransformJobError =
  | BadRequestException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MissingParameterException
  | MLResourceNotFoundException
  | PreconditionsFailedException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Gets information about a specified model transform job. See Use a trained model to generate new model artifacts.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:GetMLModelTransformJobStatus IAM action in that cluster.
 */
export const getMLModelTransformJob: API.OperationMethod<
  GetMLModelTransformJobInput,
  GetMLModelTransformJobOutput,
  GetMLModelTransformJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMLModelTransformJobInput,
  output: GetMLModelTransformJobOutput,
  errors: [
    BadRequestException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MissingParameterException,
    MLResourceNotFoundException,
    PreconditionsFailedException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMLModelTransformJob",
}));

export type GetOpenCypherQueryStatusError =
  | AccessDeniedException
  | BadRequestException
  | ClientTimeoutException
  | ConcurrentModificationException
  | ConstraintViolationException
  | FailureByQueryException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidNumericDataException
  | InvalidParameterException
  | MissingParameterException
  | ParsingException
  | PreconditionsFailedException
  | ReadOnlyViolationException
  | TimeLimitExceededException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Retrieves the status of a specified openCypher query.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:GetQueryStatus IAM action in that cluster.
 *
 * Note that the neptune-db:QueryLanguage:OpenCypher IAM condition key can be used in the policy document to restrict the use of openCypher queries (see Condition keys available in Neptune IAM data-access policy statements).
 */
export const getOpenCypherQueryStatus: API.OperationMethod<
  GetOpenCypherQueryStatusInput,
  GetOpenCypherQueryStatusOutput,
  GetOpenCypherQueryStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetOpenCypherQueryStatusInput,
  output: GetOpenCypherQueryStatusOutput,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ClientTimeoutException,
    ConcurrentModificationException,
    ConstraintViolationException,
    FailureByQueryException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidNumericDataException,
    InvalidParameterException,
    MissingParameterException,
    ParsingException,
    PreconditionsFailedException,
    ReadOnlyViolationException,
    TimeLimitExceededException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOpenCypherQueryStatus",
}));

export type GetPropertygraphStatisticsError =
  | AccessDeniedException
  | BadRequestException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MissingParameterException
  | PreconditionsFailedException
  | ReadOnlyViolationException
  | StatisticsNotAvailableException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Gets property graph statistics (Gremlin and openCypher).
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:GetStatisticsStatus IAM action in that cluster.
 */
export const getPropertygraphStatistics: API.OperationMethod<
  GetPropertygraphStatisticsRequest,
  GetPropertygraphStatisticsOutput,
  GetPropertygraphStatisticsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPropertygraphStatisticsRequest,
  output: GetPropertygraphStatisticsOutput,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MissingParameterException,
    PreconditionsFailedException,
    ReadOnlyViolationException,
    StatisticsNotAvailableException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPropertygraphStatistics",
}));

export type GetPropertygraphStreamError =
  | ClientTimeoutException
  | ConstraintViolationException
  | ExpiredStreamException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MemoryLimitExceededException
  | PreconditionsFailedException
  | StreamRecordsNotFoundException
  | ThrottlingException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Gets a stream for a property graph.
 *
 * With the Neptune Streams feature, you can generate a complete sequence of change-log entries that record every change made to your graph data as it happens. `GetPropertygraphStream` lets you collect these change-log entries for a property graph.
 *
 * The Neptune streams feature needs to be enabled on your Neptune DBcluster. To enable streams, set the neptune_streams DB cluster parameter to `1`.
 *
 * See Capturing graph changes in real time using Neptune streams.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:GetStreamRecords IAM action in that cluster.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that enables one of the following IAM actions, depending on the query:
 *
 * Note that you can restrict property-graph queries using the following IAM context keys:
 *
 * - neptune-db:QueryLanguage:Gremlin
 *
 * - neptune-db:QueryLanguage:OpenCypher
 *
 * See Condition keys available in Neptune IAM data-access policy statements).
 */
export const getPropertygraphStream: API.OperationMethod<
  GetPropertygraphStreamInput,
  GetPropertygraphStreamOutput,
  GetPropertygraphStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPropertygraphStreamInput,
  output: GetPropertygraphStreamOutput,
  errors: [
    ClientTimeoutException,
    ConstraintViolationException,
    ExpiredStreamException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MemoryLimitExceededException,
    PreconditionsFailedException,
    StreamRecordsNotFoundException,
    ThrottlingException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPropertygraphStream",
}));

export type GetPropertygraphSummaryError =
  | AccessDeniedException
  | BadRequestException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MissingParameterException
  | PreconditionsFailedException
  | ReadOnlyViolationException
  | StatisticsNotAvailableException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Gets a graph summary for a property graph.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:GetGraphSummary IAM action in that cluster.
 */
export const getPropertygraphSummary: API.OperationMethod<
  GetPropertygraphSummaryInput,
  GetPropertygraphSummaryOutput,
  GetPropertygraphSummaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPropertygraphSummaryInput,
  output: GetPropertygraphSummaryOutput,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MissingParameterException,
    PreconditionsFailedException,
    ReadOnlyViolationException,
    StatisticsNotAvailableException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPropertygraphSummary",
}));

export type GetRDFGraphSummaryError =
  | AccessDeniedException
  | BadRequestException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MissingParameterException
  | PreconditionsFailedException
  | ReadOnlyViolationException
  | StatisticsNotAvailableException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Gets a graph summary for an RDF graph.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:GetGraphSummary IAM action in that cluster.
 */
export const getRDFGraphSummary: API.OperationMethod<
  GetRDFGraphSummaryInput,
  GetRDFGraphSummaryOutput,
  GetRDFGraphSummaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRDFGraphSummaryInput,
  output: GetRDFGraphSummaryOutput,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MissingParameterException,
    PreconditionsFailedException,
    ReadOnlyViolationException,
    StatisticsNotAvailableException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRDFGraphSummary",
}));

export type GetSparqlStatisticsError =
  | AccessDeniedException
  | BadRequestException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MissingParameterException
  | PreconditionsFailedException
  | ReadOnlyViolationException
  | StatisticsNotAvailableException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Gets RDF statistics (SPARQL).
 */
export const getSparqlStatistics: API.OperationMethod<
  GetSparqlStatisticsRequest,
  GetSparqlStatisticsOutput,
  GetSparqlStatisticsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSparqlStatisticsRequest,
  output: GetSparqlStatisticsOutput,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MissingParameterException,
    PreconditionsFailedException,
    ReadOnlyViolationException,
    StatisticsNotAvailableException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSparqlStatistics",
}));

export type GetSparqlStreamError =
  | ClientTimeoutException
  | ConstraintViolationException
  | ExpiredStreamException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MemoryLimitExceededException
  | PreconditionsFailedException
  | StreamRecordsNotFoundException
  | ThrottlingException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Gets a stream for an RDF graph.
 *
 * With the Neptune Streams feature, you can generate a complete sequence of change-log entries that record every change made to your graph data as it happens. `GetSparqlStream` lets you collect these change-log entries for an RDF graph.
 *
 * The Neptune streams feature needs to be enabled on your Neptune DBcluster. To enable streams, set the neptune_streams DB cluster parameter to `1`.
 *
 * See Capturing graph changes in real time using Neptune streams.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:GetStreamRecords IAM action in that cluster.
 *
 * Note that the neptune-db:QueryLanguage:Sparql IAM condition key can be used in the policy document to restrict the use of SPARQL queries (see Condition keys available in Neptune IAM data-access policy statements).
 */
export const getSparqlStream: API.OperationMethod<
  GetSparqlStreamInput,
  GetSparqlStreamOutput,
  GetSparqlStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSparqlStreamInput,
  output: GetSparqlStreamOutput,
  errors: [
    ClientTimeoutException,
    ConstraintViolationException,
    ExpiredStreamException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MemoryLimitExceededException,
    PreconditionsFailedException,
    StreamRecordsNotFoundException,
    ThrottlingException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSparqlStream",
}));

export type ListGremlinQueriesError =
  | AccessDeniedException
  | BadRequestException
  | ClientTimeoutException
  | ConcurrentModificationException
  | ConstraintViolationException
  | FailureByQueryException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MissingParameterException
  | ParsingException
  | PreconditionsFailedException
  | ReadOnlyViolationException
  | TimeLimitExceededException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Lists active Gremlin queries. See Gremlin query status API for details about the output.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:GetQueryStatus IAM action in that cluster.
 *
 * Note that the neptune-db:QueryLanguage:Gremlin IAM condition key can be used in the policy document to restrict the use of Gremlin queries (see Condition keys available in Neptune IAM data-access policy statements).
 */
export const listGremlinQueries: API.OperationMethod<
  ListGremlinQueriesInput,
  ListGremlinQueriesOutput,
  ListGremlinQueriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListGremlinQueriesInput,
  output: ListGremlinQueriesOutput,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ClientTimeoutException,
    ConcurrentModificationException,
    ConstraintViolationException,
    FailureByQueryException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MissingParameterException,
    ParsingException,
    PreconditionsFailedException,
    ReadOnlyViolationException,
    TimeLimitExceededException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGremlinQueries",
}));

export type ListLoaderJobsError =
  | BadRequestException
  | BulkLoadIdNotFoundException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InternalFailureException
  | InvalidArgumentException
  | InvalidParameterException
  | LoadUrlAccessDeniedException
  | PreconditionsFailedException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Retrieves a list of the `loadIds` for all active loader jobs.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:ListLoaderJobs IAM action in that cluster..
 */
export const listLoaderJobs: API.OperationMethod<
  ListLoaderJobsInput,
  ListLoaderJobsOutput,
  ListLoaderJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListLoaderJobsInput,
  output: ListLoaderJobsOutput,
  errors: [
    BadRequestException,
    BulkLoadIdNotFoundException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InternalFailureException,
    InvalidArgumentException,
    InvalidParameterException,
    LoadUrlAccessDeniedException,
    PreconditionsFailedException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLoaderJobs",
}));

export type ListMLDataProcessingJobsError =
  | BadRequestException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MissingParameterException
  | MLResourceNotFoundException
  | PreconditionsFailedException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Returns a list of Neptune ML data processing jobs. See Listing active data-processing jobs using the Neptune ML dataprocessing command.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:ListMLDataProcessingJobs IAM action in that cluster.
 */
export const listMLDataProcessingJobs: API.OperationMethod<
  ListMLDataProcessingJobsInput,
  ListMLDataProcessingJobsOutput,
  ListMLDataProcessingJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListMLDataProcessingJobsInput,
  output: ListMLDataProcessingJobsOutput,
  errors: [
    BadRequestException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MissingParameterException,
    MLResourceNotFoundException,
    PreconditionsFailedException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMLDataProcessingJobs",
}));

export type ListMLEndpointsError =
  | BadRequestException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MissingParameterException
  | MLResourceNotFoundException
  | PreconditionsFailedException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Lists existing inference endpoints. See Managing inference endpoints using the endpoints command.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:ListMLEndpoints IAM action in that cluster.
 */
export const listMLEndpoints: API.OperationMethod<
  ListMLEndpointsInput,
  ListMLEndpointsOutput,
  ListMLEndpointsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListMLEndpointsInput,
  output: ListMLEndpointsOutput,
  errors: [
    BadRequestException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MissingParameterException,
    MLResourceNotFoundException,
    PreconditionsFailedException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMLEndpoints",
}));

export type ListMLModelTrainingJobsError =
  | BadRequestException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MissingParameterException
  | MLResourceNotFoundException
  | PreconditionsFailedException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Lists Neptune ML model-training jobs. See Model training using the `modeltraining` command.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:neptune-db:ListMLModelTrainingJobs IAM action in that cluster.
 */
export const listMLModelTrainingJobs: API.OperationMethod<
  ListMLModelTrainingJobsInput,
  ListMLModelTrainingJobsOutput,
  ListMLModelTrainingJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListMLModelTrainingJobsInput,
  output: ListMLModelTrainingJobsOutput,
  errors: [
    BadRequestException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MissingParameterException,
    MLResourceNotFoundException,
    PreconditionsFailedException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMLModelTrainingJobs",
}));

export type ListMLModelTransformJobsError =
  | BadRequestException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MissingParameterException
  | MLResourceNotFoundException
  | PreconditionsFailedException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Returns a list of model transform job IDs. See Use a trained model to generate new model artifacts.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:ListMLModelTransformJobs IAM action in that cluster.
 */
export const listMLModelTransformJobs: API.OperationMethod<
  ListMLModelTransformJobsInput,
  ListMLModelTransformJobsOutput,
  ListMLModelTransformJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListMLModelTransformJobsInput,
  output: ListMLModelTransformJobsOutput,
  errors: [
    BadRequestException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MissingParameterException,
    MLResourceNotFoundException,
    PreconditionsFailedException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMLModelTransformJobs",
}));

export type ListOpenCypherQueriesError =
  | AccessDeniedException
  | BadRequestException
  | ClientTimeoutException
  | ConcurrentModificationException
  | ConstraintViolationException
  | FailureByQueryException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidNumericDataException
  | InvalidParameterException
  | MissingParameterException
  | ParsingException
  | PreconditionsFailedException
  | ReadOnlyViolationException
  | TimeLimitExceededException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Lists active openCypher queries. See Neptune openCypher status endpoint for more information.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:GetQueryStatus IAM action in that cluster.
 *
 * Note that the neptune-db:QueryLanguage:OpenCypher IAM condition key can be used in the policy document to restrict the use of openCypher queries (see Condition keys available in Neptune IAM data-access policy statements).
 */
export const listOpenCypherQueries: API.OperationMethod<
  ListOpenCypherQueriesInput,
  ListOpenCypherQueriesOutput,
  ListOpenCypherQueriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListOpenCypherQueriesInput,
  output: ListOpenCypherQueriesOutput,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ClientTimeoutException,
    ConcurrentModificationException,
    ConstraintViolationException,
    FailureByQueryException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidNumericDataException,
    InvalidParameterException,
    MissingParameterException,
    ParsingException,
    PreconditionsFailedException,
    ReadOnlyViolationException,
    TimeLimitExceededException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOpenCypherQueries",
}));

export type ManagePropertygraphStatisticsError =
  | AccessDeniedException
  | BadRequestException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MissingParameterException
  | PreconditionsFailedException
  | ReadOnlyViolationException
  | StatisticsNotAvailableException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Manages the generation and use of property graph statistics.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:ManageStatistics IAM action in that cluster.
 */
export const managePropertygraphStatistics: API.OperationMethod<
  ManagePropertygraphStatisticsInput,
  ManagePropertygraphStatisticsOutput,
  ManagePropertygraphStatisticsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ManagePropertygraphStatisticsInput,
  output: ManagePropertygraphStatisticsOutput,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MissingParameterException,
    PreconditionsFailedException,
    ReadOnlyViolationException,
    StatisticsNotAvailableException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ManagePropertygraphStatistics",
}));

export type ManageSparqlStatisticsError =
  | AccessDeniedException
  | BadRequestException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MissingParameterException
  | PreconditionsFailedException
  | ReadOnlyViolationException
  | StatisticsNotAvailableException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Manages the generation and use of RDF graph statistics.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:ManageStatistics IAM action in that cluster.
 */
export const manageSparqlStatistics: API.OperationMethod<
  ManageSparqlStatisticsInput,
  ManageSparqlStatisticsOutput,
  ManageSparqlStatisticsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ManageSparqlStatisticsInput,
  output: ManageSparqlStatisticsOutput,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MissingParameterException,
    PreconditionsFailedException,
    ReadOnlyViolationException,
    StatisticsNotAvailableException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ManageSparqlStatistics",
}));

export type StartLoaderJobError =
  | BadRequestException
  | BulkLoadIdNotFoundException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InternalFailureException
  | InvalidArgumentException
  | InvalidParameterException
  | LoadUrlAccessDeniedException
  | MissingParameterException
  | PreconditionsFailedException
  | S3Exception
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Starts a Neptune bulk loader job to load data from an Amazon S3 bucket into a Neptune DB instance. See Using the Amazon Neptune Bulk Loader to Ingest Data.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:StartLoaderJob IAM action in that cluster.
 */
export const startLoaderJob: API.OperationMethod<
  StartLoaderJobInput,
  StartLoaderJobOutput,
  StartLoaderJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartLoaderJobInput,
  output: StartLoaderJobOutput,
  errors: [
    BadRequestException,
    BulkLoadIdNotFoundException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InternalFailureException,
    InvalidArgumentException,
    InvalidParameterException,
    LoadUrlAccessDeniedException,
    MissingParameterException,
    PreconditionsFailedException,
    S3Exception,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartLoaderJob",
}));

export type StartMLDataProcessingJobError =
  | BadRequestException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MissingParameterException
  | MLResourceNotFoundException
  | PreconditionsFailedException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Creates a new Neptune ML data processing job for processing the graph data exported from Neptune for training. See The `dataprocessing` command.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:StartMLModelDataProcessingJob IAM action in that cluster.
 */
export const startMLDataProcessingJob: API.OperationMethod<
  StartMLDataProcessingJobInput,
  StartMLDataProcessingJobOutput,
  StartMLDataProcessingJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartMLDataProcessingJobInput,
  output: StartMLDataProcessingJobOutput,
  errors: [
    BadRequestException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MissingParameterException,
    MLResourceNotFoundException,
    PreconditionsFailedException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMLDataProcessingJob",
}));

export type StartMLModelTrainingJobError =
  | BadRequestException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MissingParameterException
  | MLResourceNotFoundException
  | PreconditionsFailedException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Creates a new Neptune ML model training job. See Model training using the `modeltraining` command.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:StartMLModelTrainingJob IAM action in that cluster.
 */
export const startMLModelTrainingJob: API.OperationMethod<
  StartMLModelTrainingJobInput,
  StartMLModelTrainingJobOutput,
  StartMLModelTrainingJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartMLModelTrainingJobInput,
  output: StartMLModelTrainingJobOutput,
  errors: [
    BadRequestException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MissingParameterException,
    MLResourceNotFoundException,
    PreconditionsFailedException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMLModelTrainingJob",
}));

export type StartMLModelTransformJobError =
  | BadRequestException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MissingParameterException
  | MLResourceNotFoundException
  | PreconditionsFailedException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Creates a new model transform job. See Use a trained model to generate new model artifacts.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:StartMLModelTransformJob IAM action in that cluster.
 */
export const startMLModelTransformJob: API.OperationMethod<
  StartMLModelTransformJobInput,
  StartMLModelTransformJobOutput,
  StartMLModelTransformJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartMLModelTransformJobInput,
  output: StartMLModelTransformJobOutput,
  errors: [
    BadRequestException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MissingParameterException,
    MLResourceNotFoundException,
    PreconditionsFailedException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMLModelTransformJob",
}));
