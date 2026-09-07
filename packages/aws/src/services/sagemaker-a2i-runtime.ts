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
  sdkId: "SageMaker A2I Runtime",
  serviceShapeName: "AmazonSageMakerA2IRuntime",
});
const auth = T.AwsAuthSigv4({ name: "sagemaker" });
const ver = T.ServiceVersion("2019-11-07");
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
              `https://a2i-runtime.sagemaker-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://a2i-runtime.sagemaker-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://a2i-runtime.sagemaker.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://a2i-runtime.sagemaker.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type HumanLoopName = string;
export interface DeleteHumanLoopRequest {
  HumanLoopName: string;
}
export const DeleteHumanLoopRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ HumanLoopName: S.String.pipe(T.HttpLabel("HumanLoopName")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/human-loops/{HumanLoopName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteHumanLoopRequest",
}) as any as S.Schema<DeleteHumanLoopRequest>;
export interface DeleteHumanLoopResponse {}
export const DeleteHumanLoopResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteHumanLoopResponse",
}) as any as S.Schema<DeleteHumanLoopResponse>;
export interface DescribeHumanLoopRequest {
  HumanLoopName: string;
}
export const DescribeHumanLoopRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ HumanLoopName: S.String.pipe(T.HttpLabel("HumanLoopName")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/human-loops/{HumanLoopName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeHumanLoopRequest",
}) as any as S.Schema<DescribeHumanLoopRequest>;
export type HumanLoopStatus =
  | "InProgress"
  | "Failed"
  | "Completed"
  | "Stopped"
  | "Stopping"
  | (string & {});
export const HumanLoopStatus = /*@__PURE__*/ S.String;

export type HumanLoopArn = string;
export type FlowDefinitionArn = string;
export interface HumanLoopOutput {
  OutputS3Uri?: string;
}
export const HumanLoopOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OutputS3Uri: S.optional(S.String) }),
).annotate({
  identifier: "HumanLoopOutput",
}) as any as S.Schema<HumanLoopOutput>;
export interface DescribeHumanLoopResponse {
  CreationTime: Date;
  FailureReason?: string;
  FailureCode?: string;
  HumanLoopStatus: HumanLoopStatus;
  HumanLoopName: string;
  HumanLoopArn: string;
  FlowDefinitionArn: string;
  HumanLoopOutput?: HumanLoopOutput & { OutputS3Uri: string };
}
export const DescribeHumanLoopResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    FailureReason: S.optional(S.String),
    FailureCode: S.optional(S.String),
    HumanLoopStatus: S.optional(HumanLoopStatus),
    HumanLoopName: S.optional(S.String),
    HumanLoopArn: S.optional(S.String),
    FlowDefinitionArn: S.optional(S.String),
    HumanLoopOutput: S.optional(HumanLoopOutput),
  }),
).annotate({
  identifier: "DescribeHumanLoopResponse",
}) as any as S.Schema<DescribeHumanLoopResponse>;
export type SortOrder = "Ascending" | "Descending" | (string & {});
export const SortOrder = /*@__PURE__*/ S.String;

export type NextToken = string;
export type MaxResults = number;
export interface ListHumanLoopsRequest {
  CreationTimeAfter?: Date;
  CreationTimeBefore?: Date;
  FlowDefinitionArn?: string;
  SortOrder?: SortOrder;
  NextToken?: string;
  MaxResults?: number;
}
export const ListHumanLoopsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreationTimeAfter: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ).pipe(T.HttpQuery("CreationTimeAfter")),
    CreationTimeBefore: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ).pipe(T.HttpQuery("CreationTimeBefore")),
    FlowDefinitionArn: S.optional(S.String).pipe(
      T.HttpQuery("FlowDefinitionArn"),
    ),
    SortOrder: S.optional(SortOrder).pipe(T.HttpQuery("SortOrder")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/human-loops" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListHumanLoopsRequest",
}) as any as S.Schema<ListHumanLoopsRequest>;
export type FailureReason = string;
export interface HumanLoopSummary {
  HumanLoopName?: string;
  HumanLoopStatus?: HumanLoopStatus;
  CreationTime?: Date;
  FailureReason?: string;
  FlowDefinitionArn?: string;
}
export const HumanLoopSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HumanLoopName: S.optional(S.String),
    HumanLoopStatus: S.optional(HumanLoopStatus),
    CreationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    FailureReason: S.optional(S.String),
    FlowDefinitionArn: S.optional(S.String),
  }),
).annotate({
  identifier: "HumanLoopSummary",
}) as any as S.Schema<HumanLoopSummary>;
export type HumanLoopSummaries = HumanLoopSummary[];
export const HumanLoopSummaries = /*@__PURE__*/ S.Array(HumanLoopSummary);
export interface ListHumanLoopsResponse {
  HumanLoopSummaries: HumanLoopSummary[];
  NextToken?: string;
}
export const ListHumanLoopsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HumanLoopSummaries: S.optional(HumanLoopSummaries),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListHumanLoopsResponse",
}) as any as S.Schema<ListHumanLoopsResponse>;
export type InputContent = string;
export interface HumanLoopInput {
  InputContent?: string;
}
export const HumanLoopInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InputContent: S.optional(S.String) }),
).annotate({ identifier: "HumanLoopInput" }) as any as S.Schema<HumanLoopInput>;
export type ContentClassifier =
  | "FreeOfPersonallyIdentifiableInformation"
  | "FreeOfAdultContent"
  | (string & {});
export const ContentClassifier = /*@__PURE__*/ S.String;

export type ContentClassifiers = ContentClassifier[];
export const ContentClassifiers = /*@__PURE__*/ S.Array(ContentClassifier);
export interface HumanLoopDataAttributes {
  ContentClassifiers?: ContentClassifier[];
}
export const HumanLoopDataAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ContentClassifiers: S.optional(ContentClassifiers) }),
).annotate({
  identifier: "HumanLoopDataAttributes",
}) as any as S.Schema<HumanLoopDataAttributes>;
export interface StartHumanLoopRequest {
  HumanLoopName?: string;
  FlowDefinitionArn?: string;
  HumanLoopInput?: HumanLoopInput;
  DataAttributes?: HumanLoopDataAttributes;
}
export const StartHumanLoopRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HumanLoopName: S.optional(S.String),
    FlowDefinitionArn: S.optional(S.String),
    HumanLoopInput: S.optional(HumanLoopInput),
    DataAttributes: S.optional(HumanLoopDataAttributes),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/human-loops" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartHumanLoopRequest",
}) as any as S.Schema<StartHumanLoopRequest>;
export interface StartHumanLoopResponse {
  HumanLoopArn?: string;
}
export const StartHumanLoopResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ HumanLoopArn: S.optional(S.String) }),
).annotate({
  identifier: "StartHumanLoopResponse",
}) as any as S.Schema<StartHumanLoopResponse>;
export interface StopHumanLoopRequest {
  HumanLoopName?: string;
}
export const StopHumanLoopRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ HumanLoopName: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/human-loops/stop" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopHumanLoopRequest",
}) as any as S.Schema<StopHumanLoopRequest>;
export interface StopHumanLoopResponse {}
export const StopHumanLoopResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StopHumanLoopResponse",
}) as any as S.Schema<StopHumanLoopResponse>;
export type DeleteHumanLoopError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified human loop for a flow definition.
 *
 * If the human loop was deleted, this operation will return a
 * `ResourceNotFoundException`.
 */
export const deleteHumanLoop: API.OperationMethod<
  DeleteHumanLoopRequest,
  DeleteHumanLoopResponse,
  DeleteHumanLoopError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteHumanLoopRequest,
  output: DeleteHumanLoopResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteHumanLoop",
}));

export type DescribeHumanLoopError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the specified human loop. If the human loop was deleted, this
 * operation will return a `ResourceNotFoundException` error.
 */
export const describeHumanLoop: API.OperationMethod<
  DescribeHumanLoopRequest,
  DescribeHumanLoopResponse,
  DescribeHumanLoopError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeHumanLoopRequest,
  output: DescribeHumanLoopResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeHumanLoop",
}));

export type ListHumanLoopsError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about human loops, given the specified parameters. If a human loop was deleted, it will not be included.
 */
export const listHumanLoops: API.PaginatedOperationMethod<
  ListHumanLoopsRequest,
  ListHumanLoopsResponse,
  ListHumanLoopsError,
  Credentials | HttpClient.HttpClient,
  HumanLoopSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListHumanLoopsRequest,
  output: ListHumanLoopsResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListHumanLoops",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "HumanLoopSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type StartHumanLoopError =
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a human loop, provided that at least one activation condition is met.
 */
export const startHumanLoop: API.OperationMethod<
  StartHumanLoopRequest,
  StartHumanLoopResponse,
  StartHumanLoopError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartHumanLoopRequest,
  output: StartHumanLoopResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartHumanLoop",
}));

export type StopHumanLoopError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops the specified human loop.
 */
export const stopHumanLoop: API.OperationMethod<
  StopHumanLoopRequest,
  StopHumanLoopResponse,
  StopHumanLoopError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopHumanLoopRequest,
  output: StopHumanLoopResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopHumanLoop",
}));
