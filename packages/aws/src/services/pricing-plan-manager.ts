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
  sdkId: "Pricing Plan Manager",
  serviceShapeName: "AWSPricingPlanManager",
});
const auth = T.AwsAuthSigv4({ name: "pricingplanmanager" });
const ver = T.ServiceVersion("2025-08-05");
const proto = T.AwsProtocolsRestJson1();
const rules = T.EndpointResolver((p, _) => {
  const { Endpoint, _Region } = p;
  const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
    type: "endpoint" as const,
    endpoint: { url: u as string, properties: p, headers: h },
  });
  const err = (m: unknown): T.EndpointResolverResult => ({
    type: "error" as const,
    message: m as string,
  });
  const _p0 = () => ({
    authSchemes: [
      {
        name: "sigv4",
        signingName: "pricingplanmanager",
        signingRegion: "us-east-1",
      },
    ],
  });
  if (Endpoint != null) {
    return e(`${Endpoint}`, _p0(), {});
  }
  return e("https://pricingplanmanager.us-east-1.api.aws", _p0(), {});
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
    { message: S.String.pipe(T.ErrorMessage()), resourceId: S.String },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.String.pipe(T.ErrorMessage()), resourceId: S.String },
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
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.optional(S.String),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type SubscriptionArn = string;
export type IdempotencyToken = string;
export interface ApprovePaidSubscriptionInput {
  arn: string;
  ifMatch: string;
  clientToken?: string;
}
export const ApprovePaidSubscriptionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    ifMatch: S.String.pipe(T.HttpHeader("If-Match")),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/ApprovePaidSubscription" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ApprovePaidSubscriptionInput",
}) as any as S.Schema<ApprovePaidSubscriptionInput>;
export type ScheduledChangeType = "DOWNGRADE" | "CANCELLATION" | (string & {});
export const ScheduledChangeType = S.String;

export interface ScheduledChange {
  changeType: ScheduledChangeType;
  effectiveDate?: Date;
  planTier?: string;
  usageLevel?: string;
}
export const ScheduledChange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    changeType: ScheduledChangeType,
    effectiveDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    planTier: S.optional(S.String),
    usageLevel: S.optional(S.String),
  }),
).annotate({
  identifier: "ScheduledChange",
}) as any as S.Schema<ScheduledChange>;
export type Status =
  | "PENDING_APPROVAL"
  | "ACTIVE"
  | "SYNC_IN_PROGRESS"
  | "FAILED"
  | (string & {});
export const Status = S.String;

export type ResourceArns = string[];
export const ResourceArns = /*@__PURE__*/ S.Array(S.String);
export interface Subscription {
  arn: string;
  planFamily: string;
  planTier: string;
  usageLevel?: string;
  scheduledChange?: ScheduledChange;
  status: Status;
  statusReason?: string;
  resourceArns: string[];
  createdAt: Date;
  updatedAt: Date;
}
export const Subscription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    planFamily: S.String,
    planTier: S.String,
    usageLevel: S.optional(S.String),
    scheduledChange: S.optional(ScheduledChange),
    status: Status,
    statusReason: S.optional(S.String),
    resourceArns: ResourceArns,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({ identifier: "Subscription" }) as any as S.Schema<Subscription>;
export interface ApprovePaidSubscriptionOutput {
  subscription: Subscription;
  eTag: string;
}
export const ApprovePaidSubscriptionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    subscription: Subscription.pipe(T.HttpPayload()).annotate({
      identifier: "Subscription",
    }),
    eTag: S.String.pipe(T.HttpHeader("ETag")),
  }),
).annotate({
  identifier: "ApprovePaidSubscriptionOutput",
}) as any as S.Schema<ApprovePaidSubscriptionOutput>;
export interface AssociateResourcesToSubscriptionInput {
  arn: string;
  resourceArns: string[];
  ifMatch: string;
  clientToken?: string;
}
export const AssociateResourcesToSubscriptionInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      arn: S.String,
      resourceArns: ResourceArns,
      ifMatch: S.String.pipe(T.HttpHeader("If-Match")),
      clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/v1/AssociateResourcesToSubscription" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "AssociateResourcesToSubscriptionInput",
}) as any as S.Schema<AssociateResourcesToSubscriptionInput>;
export interface AssociateResourcesToSubscriptionOutput {
  subscription: Subscription;
  eTag: string;
}
export const AssociateResourcesToSubscriptionOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      subscription: Subscription.pipe(T.HttpPayload()).annotate({
        identifier: "Subscription",
      }),
      eTag: S.String.pipe(T.HttpHeader("ETag")),
    }),
).annotate({
  identifier: "AssociateResourcesToSubscriptionOutput",
}) as any as S.Schema<AssociateResourcesToSubscriptionOutput>;
export interface CancelSubscriptionInput {
  arn: string;
  ifMatch: string;
  clientToken?: string;
}
export const CancelSubscriptionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    ifMatch: S.String.pipe(T.HttpHeader("If-Match")),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/CancelSubscription" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelSubscriptionInput",
}) as any as S.Schema<CancelSubscriptionInput>;
export interface CancelSubscriptionOutput {
  subscription: Subscription;
  eTag: string;
}
export const CancelSubscriptionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    subscription: Subscription.pipe(T.HttpPayload()).annotate({
      identifier: "Subscription",
    }),
    eTag: S.String.pipe(T.HttpHeader("ETag")),
  }),
).annotate({
  identifier: "CancelSubscriptionOutput",
}) as any as S.Schema<CancelSubscriptionOutput>;
export interface CancelSubscriptionChangeInput {
  arn: string;
  ifMatch: string;
  clientToken?: string;
}
export const CancelSubscriptionChangeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    ifMatch: S.String.pipe(T.HttpHeader("If-Match")),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/CancelSubscriptionChange" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelSubscriptionChangeInput",
}) as any as S.Schema<CancelSubscriptionChangeInput>;
export interface CancelSubscriptionChangeOutput {
  subscription: Subscription;
  eTag: string;
}
export const CancelSubscriptionChangeOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    subscription: Subscription.pipe(T.HttpPayload()).annotate({
      identifier: "Subscription",
    }),
    eTag: S.String.pipe(T.HttpHeader("ETag")),
  }),
).annotate({
  identifier: "CancelSubscriptionChangeOutput",
}) as any as S.Schema<CancelSubscriptionChangeOutput>;
export type ApprovalMode = "MANUAL" | "IMMEDIATE" | (string & {});
export const ApprovalMode = S.String;

export interface CreateSubscriptionInput {
  planFamily: string;
  planTier: string;
  usageLevel?: string;
  resourceArns: string[];
  approvalMode?: ApprovalMode;
  clientToken?: string;
}
export const CreateSubscriptionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    planFamily: S.String,
    planTier: S.String,
    usageLevel: S.optional(S.String),
    resourceArns: ResourceArns,
    approvalMode: S.optional(ApprovalMode),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/CreateSubscription" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateSubscriptionInput",
}) as any as S.Schema<CreateSubscriptionInput>;
export interface CreateSubscriptionOutput {
  subscription: Subscription;
  eTag: string;
}
export const CreateSubscriptionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    subscription: Subscription.pipe(T.HttpPayload()).annotate({
      identifier: "Subscription",
    }),
    eTag: S.String.pipe(T.HttpHeader("ETag")),
  }),
).annotate({
  identifier: "CreateSubscriptionOutput",
}) as any as S.Schema<CreateSubscriptionOutput>;
export interface DisassociateResourcesFromSubscriptionInput {
  arn: string;
  resourceArns: string[];
  ifMatch: string;
  clientToken?: string;
}
export const DisassociateResourcesFromSubscriptionInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      arn: S.String,
      resourceArns: ResourceArns,
      ifMatch: S.String.pipe(T.HttpHeader("If-Match")),
      clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/v1/DisassociateResourcesFromSubscription",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DisassociateResourcesFromSubscriptionInput",
  }) as any as S.Schema<DisassociateResourcesFromSubscriptionInput>;
export interface DisassociateResourcesFromSubscriptionOutput {
  subscription: Subscription;
  eTag: string;
}
export const DisassociateResourcesFromSubscriptionOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      subscription: Subscription.pipe(T.HttpPayload()).annotate({
        identifier: "Subscription",
      }),
      eTag: S.String.pipe(T.HttpHeader("ETag")),
    }),
  ).annotate({
    identifier: "DisassociateResourcesFromSubscriptionOutput",
  }) as any as S.Schema<DisassociateResourcesFromSubscriptionOutput>;
export interface GetSubscriptionInput {
  arn: string;
}
export const GetSubscriptionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/GetSubscription" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSubscriptionInput",
}) as any as S.Schema<GetSubscriptionInput>;
export interface GetSubscriptionOutput {
  subscription: Subscription;
  eTag: string;
}
export const GetSubscriptionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    subscription: Subscription.pipe(T.HttpPayload()).annotate({
      identifier: "Subscription",
    }),
    eTag: S.String.pipe(T.HttpHeader("ETag")),
  }),
).annotate({
  identifier: "GetSubscriptionOutput",
}) as any as S.Schema<GetSubscriptionOutput>;
export interface ListSubscriptionsInput {
  nextToken?: string;
}
export const ListSubscriptionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/ListSubscriptions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSubscriptionsInput",
}) as any as S.Schema<ListSubscriptionsInput>;
export interface SubscriptionSummary {
  arn: string;
  planFamily: string;
  planTier: string;
  usageLevel?: string;
  scheduledChange?: ScheduledChange;
  status: Status;
  statusReason?: string;
  resourceArns: string[];
  createdAt: Date;
  updatedAt: Date;
  eTag: string;
}
export const SubscriptionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    planFamily: S.String,
    planTier: S.String,
    usageLevel: S.optional(S.String),
    scheduledChange: S.optional(ScheduledChange),
    status: Status,
    statusReason: S.optional(S.String),
    resourceArns: ResourceArns,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    eTag: S.String,
  }),
).annotate({
  identifier: "SubscriptionSummary",
}) as any as S.Schema<SubscriptionSummary>;
export type SubscriptionSummaryList = SubscriptionSummary[];
export const SubscriptionSummaryList =
  /*@__PURE__*/ S.Array(SubscriptionSummary);
export interface ListSubscriptionsOutput {
  subscriptionSummaries: SubscriptionSummary[];
  nextToken?: string;
}
export const ListSubscriptionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    subscriptionSummaries: SubscriptionSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSubscriptionsOutput",
}) as any as S.Schema<ListSubscriptionsOutput>;
export interface UpdateSubscriptionInput {
  arn: string;
  planTier: string;
  usageLevel?: string;
  ifMatch: string;
  clientToken?: string;
}
export const UpdateSubscriptionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    planTier: S.String,
    usageLevel: S.optional(S.String),
    ifMatch: S.String.pipe(T.HttpHeader("If-Match")),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/UpdateSubscription" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateSubscriptionInput",
}) as any as S.Schema<UpdateSubscriptionInput>;
export interface UpdateSubscriptionOutput {
  subscription: Subscription;
  eTag: string;
}
export const UpdateSubscriptionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    subscription: Subscription.pipe(T.HttpPayload()).annotate({
      identifier: "Subscription",
    }),
    eTag: S.String.pipe(T.HttpHeader("ETag")),
  }),
).annotate({
  identifier: "UpdateSubscriptionOutput",
}) as any as S.Schema<UpdateSubscriptionOutput>;
export type ApprovePaidSubscriptionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Approves a subscription that is in `PENDING_APPROVAL` status, activating it and starting billing.
 *
 * This operation requires the current `ETag` value for concurrency control. Retrieve it from a previous `GetSubscription` or `ListSubscriptions` response.
 */
export const approvePaidSubscription: API.OperationMethod<
  ApprovePaidSubscriptionInput,
  ApprovePaidSubscriptionOutput,
  ApprovePaidSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ApprovePaidSubscriptionInput,
  output: ApprovePaidSubscriptionOutput,
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
  operationName: "ApprovePaidSubscription",
}));

export type AssociateResourcesToSubscriptionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds one or more resources to an existing subscription. The subscription must be in an active state that is not pending other changes.
 *
 * For subscriptions in the CloudFront plan family, the associated resources must include exactly one Amazon CloudFront distribution and one WAF web ACL. You can also include other supported resources, such as Amazon Route 53 hosted zones, and CloudFront KeyValueStores.
 */
export const associateResourcesToSubscription: API.OperationMethod<
  AssociateResourcesToSubscriptionInput,
  AssociateResourcesToSubscriptionOutput,
  AssociateResourcesToSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateResourcesToSubscriptionInput,
  output: AssociateResourcesToSubscriptionOutput,
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
  operationName: "AssociateResourcesToSubscription",
}));

export type CancelSubscriptionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels a flat-rate pricing subscription.
 *
 * For active subscriptions, the cancellation is scheduled to take effect at the end of the current billing period. The subscription remains active until that date. To revert a pending cancellation, use `CancelSubscriptionChange`.
 *
 * For subscriptions in `PENDING_APPROVAL` status, the subscription is deleted immediately without scheduling.
 */
export const cancelSubscription: API.OperationMethod<
  CancelSubscriptionInput,
  CancelSubscriptionOutput,
  CancelSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelSubscriptionInput,
  output: CancelSubscriptionOutput,
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
  operationName: "CancelSubscription",
}));

export type CancelSubscriptionChangeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels a pending scheduled change on a subscription, such as a pending downgrade or cancellation. The subscription returns to its state before the change was scheduled.
 *
 * You cannot cancel a scheduled change close to its effective date. If the change is within the processing window, this operation returns an error.
 */
export const cancelSubscriptionChange: API.OperationMethod<
  CancelSubscriptionChangeInput,
  CancelSubscriptionChangeOutput,
  CancelSubscriptionChangeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelSubscriptionChangeInput,
  output: CancelSubscriptionChangeOutput,
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
  operationName: "CancelSubscriptionChange",
}));

export type CreateSubscriptionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a flat-rate pricing subscription for the specified resources.
 *
 * When `approvalMode` is set to `MANUAL`, paid-tier subscriptions are created in `PENDING_APPROVAL` status and require a separate `ApprovePaidSubscription` call before billing starts. Free-tier subscriptions are always activated immediately regardless of approval mode.
 *
 * When `approvalMode` is set to `IMMEDIATE` or is not specified, the subscription is activated immediately.
 */
export const createSubscription: API.OperationMethod<
  CreateSubscriptionInput,
  CreateSubscriptionOutput,
  CreateSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSubscriptionInput,
  output: CreateSubscriptionOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSubscription",
}));

export type DisassociateResourcesFromSubscriptionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes one or more resources from an existing subscription.
 *
 * For subscriptions in the CloudFront plan family, the associated resources must always include exactly one Amazon CloudFront distribution and exactly one WAF web ACL. You cannot remove these required resources.
 */
export const disassociateResourcesFromSubscription: API.OperationMethod<
  DisassociateResourcesFromSubscriptionInput,
  DisassociateResourcesFromSubscriptionOutput,
  DisassociateResourcesFromSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateResourcesFromSubscriptionInput,
  output: DisassociateResourcesFromSubscriptionOutput,
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
  operationName: "DisassociateResourcesFromSubscription",
}));

export type GetSubscriptionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the details of a flat-rate pricing subscription, including its current status, associated resources, and any pending scheduled changes.
 */
export const getSubscription: API.OperationMethod<
  GetSubscriptionInput,
  GetSubscriptionOutput,
  GetSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSubscriptionInput,
  output: GetSubscriptionOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSubscription",
}));

export type ListSubscriptionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a summary of all flat-rate pricing subscriptions in the calling account.
 */
export const listSubscriptions: API.PaginatedOperationMethod<
  ListSubscriptionsInput,
  ListSubscriptionsOutput,
  ListSubscriptionsError,
  Credentials | HttpClient.HttpClient,
  SubscriptionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSubscriptionsInput,
  output: ListSubscriptionsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSubscriptions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "subscriptionSummaries",
  } as const,
})) as any;

export type UpdateSubscriptionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Changes the plan tier of an existing subscription.
 *
 * Upgrades take effect immediately. Downgrades are scheduled and the current tier remains unchanged until the end of the billing cycle (calendar month). You cannot update a subscription while a scheduled change is pending. To make a new change, first cancel the pending change using `CancelSubscriptionChange`.
 *
 * This operation replaces the plan tier value. If you omit the optional `usageLevel` field, it is reset to the default.
 */
export const updateSubscription: API.OperationMethod<
  UpdateSubscriptionInput,
  UpdateSubscriptionOutput,
  UpdateSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSubscriptionInput,
  output: UpdateSubscriptionOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSubscription",
}));
