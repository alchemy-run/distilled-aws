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
  sdkId: "CloudControl",
  serviceShapeName: "CloudApiService",
});
const auth = T.AwsAuthSigv4({ name: "cloudcontrolapi" });
const ver = T.ServiceVersion("2021-09-30");
const proto = T.AwsProtocolsAwsJson1_0();
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
              `https://cloudcontrolapi-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://cloudcontrolapi-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://cloudcontrolapi.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://cloudcontrolapi.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
    T.all(
      T.AwsQueryError({
        code: "AlreadyExistsException",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class ClientTokenConflictException
  extends /*@__PURE__*/ S.TaggedError<ClientTokenConflictException>()(
    "ClientTokenConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ClientTokenConflictException",
        httpResponseCode: 409,
      }),
      T.HttpError(409),
    ),
  ).pipe(C.withConflictError) {}
export class ConcurrentModificationException
  extends /*@__PURE__*/ S.TaggedError<ConcurrentModificationException>()(
    "ConcurrentModificationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ConcurrentModificationException",
        httpResponseCode: 500,
      }),
      T.HttpError(500),
    ),
  ).pipe(C.withServerError) {}
export class ConcurrentOperationException
  extends /*@__PURE__*/ S.TaggedError<ConcurrentOperationException>()(
    "ConcurrentOperationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ConcurrentOperationException",
        httpResponseCode: 409,
      }),
      T.HttpError(409),
    ),
  ).pipe(C.withConflictError) {}
export class GeneralServiceException
  extends /*@__PURE__*/ S.TaggedError<GeneralServiceException>()(
    "GeneralServiceException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "GeneralServiceException",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class HandlerFailureException
  extends /*@__PURE__*/ S.TaggedError<HandlerFailureException>()(
    "HandlerFailureException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "HandlerFailureException",
        httpResponseCode: 502,
      }),
      T.HttpError(502),
    ),
  ).pipe(C.withServerError) {}
export class HandlerInternalFailureException
  extends /*@__PURE__*/ S.TaggedError<HandlerInternalFailureException>()(
    "HandlerInternalFailureException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "HandlerInternalFailureException",
        httpResponseCode: 502,
      }),
      T.HttpError(502),
    ),
  ).pipe(C.withServerError) {}
export class InvalidCredentialsException
  extends /*@__PURE__*/ S.TaggedError<InvalidCredentialsException>()(
    "InvalidCredentialsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidCredentialsException",
        httpResponseCode: 401,
      }),
      T.HttpError(401),
    ),
  ).pipe(C.withAuthError) {}
export class InvalidRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidRequestException>()(
    "InvalidRequestException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidRequestException",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class NetworkFailureException
  extends /*@__PURE__*/ S.TaggedError<NetworkFailureException>()(
    "NetworkFailureException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "NetworkFailureException",
        httpResponseCode: 502,
      }),
      T.HttpError(502),
    ),
  ).pipe(C.withServerError) {}
export class NotStabilizedException
  extends /*@__PURE__*/ S.TaggedError<NotStabilizedException>()(
    "NotStabilizedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "NotStabilizedException",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class NotUpdatableException
  extends /*@__PURE__*/ S.TaggedError<NotUpdatableException>()(
    "NotUpdatableException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "NotUpdatableException", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class PrivateTypeException
  extends /*@__PURE__*/ S.TaggedError<PrivateTypeException>()(
    "PrivateTypeException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "PrivateTypeException", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class RequestTokenNotFoundException
  extends /*@__PURE__*/ S.TaggedError<RequestTokenNotFoundException>()(
    "RequestTokenNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "RequestTokenNotFoundException",
        httpResponseCode: 404,
      }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ResourceConflictException
  extends /*@__PURE__*/ S.TaggedError<ResourceConflictException>()(
    "ResourceConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ResourceConflictException",
        httpResponseCode: 409,
      }),
      T.HttpError(409),
    ),
  ).pipe(C.withConflictError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ResourceNotFoundException",
        httpResponseCode: 404,
      }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ServiceInternalErrorException
  extends /*@__PURE__*/ S.TaggedError<ServiceInternalErrorException>()(
    "ServiceInternalErrorException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ServiceInternalErrorException",
        httpResponseCode: 502,
      }),
      T.HttpError(502),
    ),
  ).pipe(C.withServerError) {}
export class ServiceLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceLimitExceededException>()(
    "ServiceLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ServiceLimitExceededException",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "ThrottlingException", httpResponseCode: 429 }),
      T.HttpError(429),
    ),
  ).pipe(C.withThrottlingError) {}
export class TypeNotFoundException
  extends /*@__PURE__*/ S.TaggedError<TypeNotFoundException>()(
    "TypeNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "TypeNotFoundException", httpResponseCode: 404 }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class UnsupportedActionException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedActionException>()(
    "UnsupportedActionException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "UnsupportedActionException",
        httpResponseCode: 405,
      }),
      T.HttpError(405),
    ),
  ).pipe(C.withBadRequestError) {}
export type RequestToken = string;
export interface CancelResourceRequestInput {
  RequestToken: string;
}
export const CancelResourceRequestInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RequestToken: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CancelResourceRequestInput",
}) as any as S.Schema<CancelResourceRequestInput>;
export type TypeName = string;
export type Identifier = string;
export type Operation = string;
export type OperationStatus = string;
export type Properties = string | redacted.Redacted<string>;
export type StatusMessage = string;
export type HandlerErrorCode = string;
export interface ProgressEvent {
  TypeName?: string;
  Identifier?: string;
  RequestToken?: string;
  HooksRequestToken?: string;
  Operation?: string;
  OperationStatus?: string;
  EventTime?: Date;
  ResourceModel?: string | redacted.Redacted<string>;
  StatusMessage?: string;
  ErrorCode?: string;
  RetryAfter?: Date;
}
export const ProgressEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TypeName: S.optional(S.String),
    Identifier: S.optional(S.String),
    RequestToken: S.optional(S.String),
    HooksRequestToken: S.optional(S.String),
    Operation: S.optional(S.String),
    OperationStatus: S.optional(S.String),
    EventTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ResourceModel: S.optional(SensitiveString),
    StatusMessage: S.optional(S.String),
    ErrorCode: S.optional(S.String),
    RetryAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "ProgressEvent" }) as any as S.Schema<ProgressEvent>;
export interface CancelResourceRequestOutput {
  ProgressEvent?: ProgressEvent;
}
export const CancelResourceRequestOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ProgressEvent: S.optional(ProgressEvent) }),
).annotate({
  identifier: "CancelResourceRequestOutput",
}) as any as S.Schema<CancelResourceRequestOutput>;
export type TypeVersionId = string;
export type RoleArn = string;
export type ClientToken = string;
export interface CreateResourceInput {
  TypeName: string;
  TypeVersionId?: string;
  RoleArn?: string;
  ClientToken?: string;
  DesiredState: string | redacted.Redacted<string>;
}
export const CreateResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TypeName: S.String,
    TypeVersionId: S.optional(S.String),
    RoleArn: S.optional(S.String),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    DesiredState: SensitiveString,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateResourceInput",
}) as any as S.Schema<CreateResourceInput>;
export interface CreateResourceOutput {
  ProgressEvent?: ProgressEvent;
}
export const CreateResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ProgressEvent: S.optional(ProgressEvent) }),
).annotate({
  identifier: "CreateResourceOutput",
}) as any as S.Schema<CreateResourceOutput>;
export interface DeleteResourceInput {
  TypeName: string;
  TypeVersionId?: string;
  RoleArn?: string;
  ClientToken?: string;
  Identifier: string;
}
export const DeleteResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TypeName: S.String,
    TypeVersionId: S.optional(S.String),
    RoleArn: S.optional(S.String),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    Identifier: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteResourceInput",
}) as any as S.Schema<DeleteResourceInput>;
export interface DeleteResourceOutput {
  ProgressEvent?: ProgressEvent;
}
export const DeleteResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ProgressEvent: S.optional(ProgressEvent) }),
).annotate({
  identifier: "DeleteResourceOutput",
}) as any as S.Schema<DeleteResourceOutput>;
export interface GetResourceInput {
  TypeName: string;
  TypeVersionId?: string;
  RoleArn?: string;
  Identifier: string;
}
export const GetResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TypeName: S.String,
    TypeVersionId: S.optional(S.String),
    RoleArn: S.optional(S.String),
    Identifier: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetResourceInput",
}) as any as S.Schema<GetResourceInput>;
export interface ResourceDescription {
  Identifier?: string;
  Properties?: string | redacted.Redacted<string>;
}
export const ResourceDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Identifier: S.optional(S.String),
    Properties: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "ResourceDescription",
}) as any as S.Schema<ResourceDescription>;
export interface GetResourceOutput {
  TypeName?: string;
  ResourceDescription?: ResourceDescription;
}
export const GetResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TypeName: S.optional(S.String),
    ResourceDescription: S.optional(ResourceDescription),
  }),
).annotate({
  identifier: "GetResourceOutput",
}) as any as S.Schema<GetResourceOutput>;
export interface GetResourceRequestStatusInput {
  RequestToken: string;
}
export const GetResourceRequestStatusInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RequestToken: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetResourceRequestStatusInput",
}) as any as S.Schema<GetResourceRequestStatusInput>;
export type HookTypeArn = string;
export type HookInvocationPoint = string;
export type HookStatus = string;
export type HookFailureMode = string;
export interface HookProgressEvent {
  HookTypeName?: string;
  HookTypeVersionId?: string;
  HookTypeArn?: string;
  InvocationPoint?: string;
  HookStatus?: string;
  HookEventTime?: Date;
  HookStatusMessage?: string;
  FailureMode?: string;
}
export const HookProgressEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HookTypeName: S.optional(S.String),
    HookTypeVersionId: S.optional(S.String),
    HookTypeArn: S.optional(S.String),
    InvocationPoint: S.optional(S.String),
    HookStatus: S.optional(S.String),
    HookEventTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    HookStatusMessage: S.optional(S.String),
    FailureMode: S.optional(S.String),
  }),
).annotate({
  identifier: "HookProgressEvent",
}) as any as S.Schema<HookProgressEvent>;
export type HooksProgressEvent = HookProgressEvent[];
export const HooksProgressEvent = /*@__PURE__*/ S.Array(HookProgressEvent);
export interface GetResourceRequestStatusOutput {
  ProgressEvent?: ProgressEvent;
  HooksProgressEvent?: HookProgressEvent[];
}
export const GetResourceRequestStatusOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProgressEvent: S.optional(ProgressEvent),
    HooksProgressEvent: S.optional(HooksProgressEvent),
  }),
).annotate({
  identifier: "GetResourceRequestStatusOutput",
}) as any as S.Schema<GetResourceRequestStatusOutput>;
export type MaxResults = number;
export type NextToken = string;
export type Operations = string[];
export const Operations = /*@__PURE__*/ S.Array(S.String);
export type OperationStatuses = string[];
export const OperationStatuses = /*@__PURE__*/ S.Array(S.String);
export interface ResourceRequestStatusFilter {
  Operations?: string[];
  OperationStatuses?: string[];
}
export const ResourceRequestStatusFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Operations: S.optional(Operations),
    OperationStatuses: S.optional(OperationStatuses),
  }),
).annotate({
  identifier: "ResourceRequestStatusFilter",
}) as any as S.Schema<ResourceRequestStatusFilter>;
export interface ListResourceRequestsInput {
  MaxResults?: number;
  NextToken?: string;
  ResourceRequestStatusFilter?: ResourceRequestStatusFilter;
}
export const ListResourceRequestsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    ResourceRequestStatusFilter: S.optional(ResourceRequestStatusFilter),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListResourceRequestsInput",
}) as any as S.Schema<ListResourceRequestsInput>;
export type ResourceRequestStatusSummaries = ProgressEvent[];
export const ResourceRequestStatusSummaries =
  /*@__PURE__*/ S.Array(ProgressEvent);
export interface ListResourceRequestsOutput {
  ResourceRequestStatusSummaries?: ProgressEvent[];
  NextToken?: string;
}
export const ListResourceRequestsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceRequestStatusSummaries: S.optional(ResourceRequestStatusSummaries),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListResourceRequestsOutput",
}) as any as S.Schema<ListResourceRequestsOutput>;
export type HandlerNextToken = string;
export interface ListResourcesInput {
  TypeName: string;
  TypeVersionId?: string;
  RoleArn?: string;
  NextToken?: string;
  MaxResults?: number;
  ResourceModel?: string | redacted.Redacted<string>;
}
export const ListResourcesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TypeName: S.String,
    TypeVersionId: S.optional(S.String),
    RoleArn: S.optional(S.String),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    ResourceModel: S.optional(SensitiveString),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListResourcesInput",
}) as any as S.Schema<ListResourcesInput>;
export type ResourceDescriptions = ResourceDescription[];
export const ResourceDescriptions = /*@__PURE__*/ S.Array(ResourceDescription);
export interface ListResourcesOutput {
  TypeName?: string;
  ResourceDescriptions?: ResourceDescription[];
  NextToken?: string;
}
export const ListResourcesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TypeName: S.optional(S.String),
    ResourceDescriptions: S.optional(ResourceDescriptions),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListResourcesOutput",
}) as any as S.Schema<ListResourcesOutput>;
export type PatchDocument = string | redacted.Redacted<string>;
export interface UpdateResourceInput {
  TypeName: string;
  TypeVersionId?: string;
  RoleArn?: string;
  ClientToken?: string;
  Identifier: string;
  PatchDocument: string | redacted.Redacted<string>;
}
export const UpdateResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TypeName: S.String,
    TypeVersionId: S.optional(S.String),
    RoleArn: S.optional(S.String),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    Identifier: S.String,
    PatchDocument: SensitiveString,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateResourceInput",
}) as any as S.Schema<UpdateResourceInput>;
export interface UpdateResourceOutput {
  ProgressEvent?: ProgressEvent;
}
export const UpdateResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ProgressEvent: S.optional(ProgressEvent) }),
).annotate({
  identifier: "UpdateResourceOutput",
}) as any as S.Schema<UpdateResourceOutput>;
export type ErrorMessage = string;
export type CancelResourceRequestError =
  | ConcurrentModificationException
  | RequestTokenNotFoundException
  | CommonErrors;
/**
 * Cancels the specified resource operation request. For more information, see Canceling resource operation requests in the
 * *Amazon Web Services Cloud Control API User Guide*.
 *
 * Only resource operations requests with a status of `PENDING` or
 * `IN_PROGRESS` can be canceled.
 */
export const cancelResourceRequest: API.OperationMethod<
  CancelResourceRequestInput,
  CancelResourceRequestOutput,
  CancelResourceRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelResourceRequestInput,
  output: CancelResourceRequestOutput,
  errors: [ConcurrentModificationException, RequestTokenNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelResourceRequest",
}));

export type CreateResourceError =
  | AlreadyExistsException
  | ClientTokenConflictException
  | ConcurrentOperationException
  | GeneralServiceException
  | HandlerFailureException
  | HandlerInternalFailureException
  | InvalidCredentialsException
  | InvalidRequestException
  | NetworkFailureException
  | NotStabilizedException
  | NotUpdatableException
  | PrivateTypeException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceInternalErrorException
  | ServiceLimitExceededException
  | ThrottlingException
  | TypeNotFoundException
  | UnsupportedActionException
  | CommonErrors;
/**
 * Creates the specified resource. For more information, see Creating a
 * resource in the *Amazon Web Services Cloud Control API User Guide*.
 *
 * After you have initiated a resource creation request, you can monitor the progress of your
 * request by calling GetResourceRequestStatus using the `RequestToken` of the
 * `ProgressEvent` type returned by `CreateResource`.
 */
export const createResource: API.OperationMethod<
  CreateResourceInput,
  CreateResourceOutput,
  CreateResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateResourceInput,
  output: CreateResourceOutput,
  errors: [
    AlreadyExistsException,
    ClientTokenConflictException,
    ConcurrentOperationException,
    GeneralServiceException,
    HandlerFailureException,
    HandlerInternalFailureException,
    InvalidCredentialsException,
    InvalidRequestException,
    NetworkFailureException,
    NotStabilizedException,
    NotUpdatableException,
    PrivateTypeException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceInternalErrorException,
    ServiceLimitExceededException,
    ThrottlingException,
    TypeNotFoundException,
    UnsupportedActionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateResource",
}));

export type DeleteResourceError =
  | AlreadyExistsException
  | ClientTokenConflictException
  | ConcurrentOperationException
  | GeneralServiceException
  | HandlerFailureException
  | HandlerInternalFailureException
  | InvalidCredentialsException
  | InvalidRequestException
  | NetworkFailureException
  | NotStabilizedException
  | NotUpdatableException
  | PrivateTypeException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceInternalErrorException
  | ServiceLimitExceededException
  | ThrottlingException
  | TypeNotFoundException
  | UnsupportedActionException
  | CommonErrors;
/**
 * Deletes the specified resource. For details, see Deleting a
 * resource in the *Amazon Web Services Cloud Control API User Guide*.
 *
 * After you have initiated a resource deletion request, you can monitor the progress of your
 * request by calling GetResourceRequestStatus using the `RequestToken` of the
 * `ProgressEvent` returned by `DeleteResource`.
 */
export const deleteResource: API.OperationMethod<
  DeleteResourceInput,
  DeleteResourceOutput,
  DeleteResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteResourceInput,
  output: DeleteResourceOutput,
  errors: [
    AlreadyExistsException,
    ClientTokenConflictException,
    ConcurrentOperationException,
    GeneralServiceException,
    HandlerFailureException,
    HandlerInternalFailureException,
    InvalidCredentialsException,
    InvalidRequestException,
    NetworkFailureException,
    NotStabilizedException,
    NotUpdatableException,
    PrivateTypeException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceInternalErrorException,
    ServiceLimitExceededException,
    ThrottlingException,
    TypeNotFoundException,
    UnsupportedActionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResource",
}));

export type GetResourceError =
  | AlreadyExistsException
  | GeneralServiceException
  | HandlerFailureException
  | HandlerInternalFailureException
  | InvalidCredentialsException
  | InvalidRequestException
  | NetworkFailureException
  | NotStabilizedException
  | NotUpdatableException
  | PrivateTypeException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceInternalErrorException
  | ServiceLimitExceededException
  | ThrottlingException
  | TypeNotFoundException
  | UnsupportedActionException
  | CommonErrors;
/**
 * Returns information about the current state of the specified resource. For details, see
 * Reading a resource's current state.
 *
 * You can use this action to return information about an existing resource in your account
 * and Amazon Web Services Region, whether those resources were provisioned using Cloud Control API.
 */
export const getResource: API.OperationMethod<
  GetResourceInput,
  GetResourceOutput,
  GetResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetResourceInput,
  output: GetResourceOutput,
  errors: [
    AlreadyExistsException,
    GeneralServiceException,
    HandlerFailureException,
    HandlerInternalFailureException,
    InvalidCredentialsException,
    InvalidRequestException,
    NetworkFailureException,
    NotStabilizedException,
    NotUpdatableException,
    PrivateTypeException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceInternalErrorException,
    ServiceLimitExceededException,
    ThrottlingException,
    TypeNotFoundException,
    UnsupportedActionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResource",
}));

export type GetResourceRequestStatusError =
  | RequestTokenNotFoundException
  | CommonErrors;
/**
 * Returns the current status of a resource operation request. For more information, see
 * Tracking the progress of resource operation requests in the
 * *Amazon Web Services Cloud Control API User Guide*.
 */
export const getResourceRequestStatus: API.OperationMethod<
  GetResourceRequestStatusInput,
  GetResourceRequestStatusOutput,
  GetResourceRequestStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetResourceRequestStatusInput,
  output: GetResourceRequestStatusOutput,
  errors: [RequestTokenNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourceRequestStatus",
}));

export type ListResourceRequestsError = CommonErrors;
/**
 * Returns existing resource operation requests. This includes requests of all status types.
 * For more information, see Listing active resource operation requests in the
 * *Amazon Web Services Cloud Control API User Guide*.
 *
 * Resource operation requests expire after 7 days.
 */
export const listResourceRequests: API.PaginatedOperationMethod<
  ListResourceRequestsInput,
  ListResourceRequestsOutput,
  ListResourceRequestsError,
  Credentials | HttpClient.HttpClient,
  ProgressEvent
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListResourceRequestsInput,
  output: ListResourceRequestsOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceRequests",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ResourceRequestStatusSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListResourcesError =
  | AlreadyExistsException
  | GeneralServiceException
  | HandlerFailureException
  | HandlerInternalFailureException
  | InvalidCredentialsException
  | InvalidRequestException
  | NetworkFailureException
  | NotStabilizedException
  | NotUpdatableException
  | PrivateTypeException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceInternalErrorException
  | ServiceLimitExceededException
  | ThrottlingException
  | TypeNotFoundException
  | UnsupportedActionException
  | CommonErrors;
/**
 * Returns information about the specified resources. For more information, see Discovering resources in the *Amazon Web Services Cloud Control API User Guide*.
 *
 * You can use this action to return information about existing resources in your account and
 * Amazon Web Services Region, whether those resources were provisioned using Cloud Control API.
 */
export const listResources: API.PaginatedOperationMethod<
  ListResourcesInput,
  ListResourcesOutput,
  ListResourcesError,
  Credentials | HttpClient.HttpClient,
  ResourceDescription
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListResourcesInput,
  output: ListResourcesOutput,
  errors: [
    AlreadyExistsException,
    GeneralServiceException,
    HandlerFailureException,
    HandlerInternalFailureException,
    InvalidCredentialsException,
    InvalidRequestException,
    NetworkFailureException,
    NotStabilizedException,
    NotUpdatableException,
    PrivateTypeException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceInternalErrorException,
    ServiceLimitExceededException,
    ThrottlingException,
    TypeNotFoundException,
    UnsupportedActionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResources",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ResourceDescriptions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type UpdateResourceError =
  | AlreadyExistsException
  | ClientTokenConflictException
  | ConcurrentOperationException
  | GeneralServiceException
  | HandlerFailureException
  | HandlerInternalFailureException
  | InvalidCredentialsException
  | InvalidRequestException
  | NetworkFailureException
  | NotStabilizedException
  | NotUpdatableException
  | PrivateTypeException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceInternalErrorException
  | ServiceLimitExceededException
  | ThrottlingException
  | TypeNotFoundException
  | UnsupportedActionException
  | CommonErrors;
/**
 * Updates the specified property values in the resource.
 *
 * You specify your resource property updates as a list of patch operations contained in a
 * JSON patch document that adheres to the
 * RFC 6902 - JavaScript Object
 * Notation (JSON) Patch
 * standard.
 *
 * For details on how Cloud Control API performs resource update operations, see Updating a resource in the *Amazon Web Services Cloud Control API User Guide*.
 *
 * After you have initiated a resource update request, you can monitor the progress of your
 * request by calling GetResourceRequestStatus using the `RequestToken` of the
 * `ProgressEvent` returned by `UpdateResource`.
 *
 * For more information about the properties of a specific resource, refer to the related
 * topic for the resource in the Resource and property types reference in the *CloudFormation Users Guide*.
 */
export const updateResource: API.OperationMethod<
  UpdateResourceInput,
  UpdateResourceOutput,
  UpdateResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateResourceInput,
  output: UpdateResourceOutput,
  errors: [
    AlreadyExistsException,
    ClientTokenConflictException,
    ConcurrentOperationException,
    GeneralServiceException,
    HandlerFailureException,
    HandlerInternalFailureException,
    InvalidCredentialsException,
    InvalidRequestException,
    NetworkFailureException,
    NotStabilizedException,
    NotUpdatableException,
    PrivateTypeException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceInternalErrorException,
    ServiceLimitExceededException,
    ThrottlingException,
    TypeNotFoundException,
    UnsupportedActionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateResource",
}));
