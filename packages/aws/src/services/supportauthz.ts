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
  sdkId: "SupportAuthZ",
  serviceShapeName: "SupportAuthZ",
});
const auth = T.AwsAuthSigv4({ name: "supportauthz" });
const ver = T.ServiceVersion("2026-06-30");
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
        if (UseFIPS === true) {
          return e(
            `https://supportauthz-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        return e(
          `https://supportauthz.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
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
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
    },
    T.all(T.HttpError(500), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
      serviceCode: S.String,
      quotaCode: S.String,
    },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
    },
    T.all(T.HttpError(429), T.Retryable({ throttling: true })),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      fieldList: S.optional(
        S.suspend(() => ValidationExceptionFieldList).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
  ) {}
export type Action = string;
export type Actions = string[];
export const Actions = /*@__PURE__*/ S.Array(S.String);
export type ActionSet =
  | { allActions: Record<string, never>; actions?: never }
  | { allActions?: never; actions: string[] };
export const ActionSet = /*@__PURE__*/ S.Union([
  S.Struct({ allActions: S.Struct({}) }),
  S.Struct({ actions: Actions }),
]);
export type Resource = string;
export type Resources = string[];
export const Resources = /*@__PURE__*/ S.Array(S.String);
export type ResourceSet =
  | { allResourcesInRegion: Record<string, never>; resources?: never }
  | { allResourcesInRegion?: never; resources: string[] };
export const ResourceSet = /*@__PURE__*/ S.Union([
  S.Struct({ allResourcesInRegion: S.Struct({}) }),
  S.Struct({ resources: Resources }),
]);
export type Condition =
  | { allowAfter: Date; allowBefore?: never }
  | { allowAfter?: never; allowBefore: Date };
export const Condition = /*@__PURE__*/ S.Union([
  S.Struct({ allowAfter: S.Date.pipe(T.TimestampFormat("epoch-seconds")) }),
  S.Struct({ allowBefore: S.Date.pipe(T.TimestampFormat("epoch-seconds")) }),
]);
export type Conditions = Condition[];
export const Conditions = /*@__PURE__*/ S.Array(Condition);
export interface Permit {
  actions: ActionSet;
  resources: ResourceSet;
  conditions?: Condition[];
}
export const Permit = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    actions: ActionSet,
    resources: ResourceSet,
    conditions: S.optional(Conditions),
  }),
).annotate({ identifier: "Permit" }) as any as S.Schema<Permit>;
export type Name = string;
export type Description = string;
export type KmsKeyArn = string;
export type SigningKeyInfo = { kmsKey: string };
export const SigningKeyInfo = /*@__PURE__*/ S.Union([
  S.Struct({ kmsKey: S.String }),
]);
export type SupportCaseDisplayId = string;
export type ClientToken = string;
export type TagKey = string;
export type TagValue = string;
export type Tags = { [key: string]: string | undefined };
export const Tags = /*@__PURE__*/ S.Record(S.String, S.String.pipe(S.optional));
export interface CreateSupportPermitInput {
  permit: Permit;
  name: string;
  description?: string;
  signingKeyInfo: SigningKeyInfo;
  supportCaseDisplayId?: string;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateSupportPermitInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    permit: Permit,
    name: S.String,
    description: S.optional(S.String),
    signingKeyInfo: SigningKeyInfo,
    supportCaseDisplayId: S.optional(S.String),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/support-permits" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateSupportPermitInput",
}) as any as S.Schema<CreateSupportPermitInput>;
export type Arn = string;
export type SupportPermitStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "DELETING"
  | (string & {});
export const SupportPermitStatus = S.String;

export interface CreateSupportPermitOutput {
  name: string;
  arn: string;
  description?: string;
  permit: Permit;
  status: SupportPermitStatus;
  signingKeyInfo: SigningKeyInfo;
  createdAt: Date;
  supportCaseDisplayId?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateSupportPermitOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    arn: S.String,
    description: S.optional(S.String),
    permit: Permit,
    status: SupportPermitStatus,
    signingKeyInfo: SigningKeyInfo,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    supportCaseDisplayId: S.optional(S.String),
    tags: S.optional(Tags),
  }),
).annotate({
  identifier: "CreateSupportPermitOutput",
}) as any as S.Schema<CreateSupportPermitOutput>;
export interface DeleteSupportPermitInput {
  supportPermitIdentifier: string;
}
export const DeleteSupportPermitInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    supportPermitIdentifier: S.String.pipe(
      T.HttpLabel("supportPermitIdentifier"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/support-permits/{supportPermitIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSupportPermitInput",
}) as any as S.Schema<DeleteSupportPermitInput>;
export interface DeleteSupportPermitOutput {
  name: string;
  arn: string;
  description?: string;
  permit: Permit;
  status: SupportPermitStatus;
  signingKeyInfo: SigningKeyInfo;
  createdAt: Date;
  supportCaseDisplayId?: string;
}
export const DeleteSupportPermitOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    arn: S.String,
    description: S.optional(S.String),
    permit: Permit,
    status: SupportPermitStatus,
    signingKeyInfo: SigningKeyInfo,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    supportCaseDisplayId: S.optional(S.String),
  }),
).annotate({
  identifier: "DeleteSupportPermitOutput",
}) as any as S.Schema<DeleteSupportPermitOutput>;
export interface GetActionInput {
  action: string;
}
export const GetActionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ action: S.String.pipe(T.HttpLabel("action")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/actions/{action}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetActionInput" }) as any as S.Schema<GetActionInput>;
export type Service = string;
export type ActionDescription = string;
export interface GetActionOutput {
  action: string;
  service: string;
  description: string;
}
export const GetActionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ action: S.String, service: S.String, description: S.String }),
).annotate({
  identifier: "GetActionOutput",
}) as any as S.Schema<GetActionOutput>;
export type SupportPermitIdentifier = string;
export interface GetSupportPermitInput {
  supportPermitIdentifier: string;
}
export const GetSupportPermitInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    supportPermitIdentifier: S.String.pipe(
      T.HttpLabel("supportPermitIdentifier"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/support-permits/{supportPermitIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSupportPermitInput",
}) as any as S.Schema<GetSupportPermitInput>;
export interface GetSupportPermitOutput {
  name: string;
  arn: string;
  description?: string;
  permit: Permit;
  status: SupportPermitStatus;
  signingKeyInfo: SigningKeyInfo;
  createdAt: Date;
  supportCaseDisplayId?: string;
  tags?: { [key: string]: string | undefined };
}
export const GetSupportPermitOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    arn: S.String,
    description: S.optional(S.String),
    permit: Permit,
    status: SupportPermitStatus,
    signingKeyInfo: SigningKeyInfo,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    supportCaseDisplayId: S.optional(S.String),
    tags: S.optional(Tags),
  }),
).annotate({
  identifier: "GetSupportPermitOutput",
}) as any as S.Schema<GetSupportPermitOutput>;
export type NextToken = string;
export type MaxResults = number;
export interface ListActionsInput {
  nextToken?: string;
  maxResults?: number;
  service: string;
}
export const ListActionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    service: S.String.pipe(T.HttpQuery("service")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/actions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListActionsInput",
}) as any as S.Schema<ListActionsInput>;
export interface ActionSummary {
  action: string;
  service: string;
  description: string;
}
export const ActionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ action: S.String, service: S.String, description: S.String }),
).annotate({ identifier: "ActionSummary" }) as any as S.Schema<ActionSummary>;
export type ActionSummaries = ActionSummary[];
export const ActionSummaries = /*@__PURE__*/ S.Array(ActionSummary);
export interface ListActionsOutput {
  actionSummaries: ActionSummary[];
  nextToken?: string;
}
export const ListActionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    actionSummaries: ActionSummaries,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListActionsOutput",
}) as any as S.Schema<ListActionsOutput>;
export interface ListSupportPermitRequestsInput {
  nextToken?: string;
  maxResults?: number;
  supportCaseDisplayId?: string;
}
export const ListSupportPermitRequestsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    supportCaseDisplayId: S.optional(S.String).pipe(
      T.HttpQuery("supportCaseDisplayId"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/support-permit-requests" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSupportPermitRequestsInput",
}) as any as S.Schema<ListSupportPermitRequestsInput>;
export type RequestArn = string;
export type SupportPermitRequestStatus =
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | "CANCELLED"
  | (string & {});
export const SupportPermitRequestStatus = S.String;

export interface SupportPermitRequest {
  requestArn: string;
  permit: Permit;
  supportCaseDisplayId: string;
  status: SupportPermitRequestStatus;
  createdAt: Date;
  updatedAt: Date;
}
export const SupportPermitRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    requestArn: S.String,
    permit: Permit,
    supportCaseDisplayId: S.String,
    status: SupportPermitRequestStatus,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "SupportPermitRequest",
}) as any as S.Schema<SupportPermitRequest>;
export type SupportPermitRequests = SupportPermitRequest[];
export const SupportPermitRequests =
  /*@__PURE__*/ S.Array(SupportPermitRequest);
export interface ListSupportPermitRequestsOutput {
  supportPermitRequests: SupportPermitRequest[];
  nextToken?: string;
}
export const ListSupportPermitRequestsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    supportPermitRequests: SupportPermitRequests,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSupportPermitRequestsOutput",
}) as any as S.Schema<ListSupportPermitRequestsOutput>;
export type SupportPermitStatuses = SupportPermitStatus[];
export const SupportPermitStatuses = /*@__PURE__*/ S.Array(SupportPermitStatus);
export interface ListSupportPermitsInput {
  nextToken?: string;
  maxResults?: number;
  supportPermitStatuses?: SupportPermitStatus[];
}
export const ListSupportPermitsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    supportPermitStatuses: S.optional(SupportPermitStatuses).pipe(
      T.HttpQuery("supportPermitStatuses"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/support-permits" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSupportPermitsInput",
}) as any as S.Schema<ListSupportPermitsInput>;
export interface SupportPermitSummary {
  name: string;
  arn: string;
  permit: Permit;
  status: SupportPermitStatus;
  signingKeyInfo: SigningKeyInfo;
  createdAt: Date;
  supportCaseDisplayId?: string;
}
export const SupportPermitSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    arn: S.String,
    permit: Permit,
    status: SupportPermitStatus,
    signingKeyInfo: SigningKeyInfo,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    supportCaseDisplayId: S.optional(S.String),
  }),
).annotate({
  identifier: "SupportPermitSummary",
}) as any as S.Schema<SupportPermitSummary>;
export type SupportPermitSummaries = SupportPermitSummary[];
export const SupportPermitSummaries =
  /*@__PURE__*/ S.Array(SupportPermitSummary);
export interface ListSupportPermitsOutput {
  supportPermits: SupportPermitSummary[];
  nextToken?: string;
}
export const ListSupportPermitsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    supportPermits: SupportPermitSummaries,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSupportPermitsOutput",
}) as any as S.Schema<ListSupportPermitsOutput>;
export interface ListTagsForResourceInput {
  resourceArn: string;
}
export const ListTagsForResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/tags/{resourceArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTagsForResourceInput",
}) as any as S.Schema<ListTagsForResourceInput>;
export interface ListTagsForResourceOutput {
  tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: S.optional(Tags) }),
).annotate({
  identifier: "ListTagsForResourceOutput",
}) as any as S.Schema<ListTagsForResourceOutput>;
export interface RejectSupportPermitRequestInput {
  requestArn: string;
}
export const RejectSupportPermitRequestInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ requestArn: S.String.pipe(T.HttpLabel("requestArn")) }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/support-permit-requests/{requestArn}/reject",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RejectSupportPermitRequestInput",
}) as any as S.Schema<RejectSupportPermitRequestInput>;
export interface RejectSupportPermitRequestOutput {
  requestArn: string;
}
export const RejectSupportPermitRequestOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ requestArn: S.String }),
).annotate({
  identifier: "RejectSupportPermitRequestOutput",
}) as any as S.Schema<RejectSupportPermitRequestOutput>;
export interface TagResourceInput {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tags: Tags,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/tags/{resourceArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "TagResourceInput",
}) as any as S.Schema<TagResourceInput>;
export interface TagResourceOutput {}
export const TagResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "TagResourceOutput",
}) as any as S.Schema<TagResourceOutput>;
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceInput {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tagKeys: TagKeyList.pipe(T.HttpQuery("tagKeys")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/tags/{resourceArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UntagResourceInput",
}) as any as S.Schema<UntagResourceInput>;
export interface UntagResourceOutput {}
export const UntagResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UntagResourceOutput",
}) as any as S.Schema<UntagResourceOutput>;
export interface ValidationExceptionField {
  path: string;
  message: string;
}
export const ValidationExceptionField = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ path: S.String, message: S.String }),
).annotate({
  identifier: "ValidationExceptionField",
}) as any as S.Schema<ValidationExceptionField>;
export type ValidationExceptionFieldList = ValidationExceptionField[];
export const ValidationExceptionFieldList = /*@__PURE__*/ S.Array(
  ValidationExceptionField,
);
export type CreateSupportPermitError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a support permit that authorizes an AWS support operator to perform specified actions on specified resources. The permit is cryptographically signed using a customer-managed AWS KMS key (ECC_NIST_P384, SIGN_VERIFY) to ensure non-repudiation.
 */
export const createSupportPermit: API.OperationMethod<
  CreateSupportPermitInput,
  CreateSupportPermitOutput,
  CreateSupportPermitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSupportPermitInput,
  output: CreateSupportPermitOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSupportPermit",
}));

export type DeleteSupportPermitError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a support permit, revoking the authorization previously granted to the AWS support operator.
 */
export const deleteSupportPermit: API.OperationMethod<
  DeleteSupportPermitInput,
  DeleteSupportPermitOutput,
  DeleteSupportPermitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSupportPermitInput,
  output: DeleteSupportPermitOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSupportPermit",
}));

export type GetActionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the description of a specific support action.
 */
export const getAction: API.OperationMethod<
  GetActionInput,
  GetActionOutput,
  GetActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetActionInput,
  output: GetActionOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAction",
}));

export type GetSupportPermitError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of a support permit by its ARN or name.
 */
export const getSupportPermit: API.OperationMethod<
  GetSupportPermitInput,
  GetSupportPermitOutput,
  GetSupportPermitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSupportPermitInput,
  output: GetSupportPermitOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSupportPermit",
}));

export type ListActionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists available support actions for a specified AWS service. Use pagination to ensure that the operation returns quickly and successfully.
 */
export const listActions: API.PaginatedOperationMethod<
  ListActionsInput,
  ListActionsOutput,
  ListActionsError,
  Credentials | HttpClient.HttpClient,
  ActionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListActionsInput,
  output: ListActionsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListActions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "actionSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSupportPermitRequestsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists permit requests from AWS support operators. Use pagination to ensure that the operation returns quickly and successfully.
 */
export const listSupportPermitRequests: API.PaginatedOperationMethod<
  ListSupportPermitRequestsInput,
  ListSupportPermitRequestsOutput,
  ListSupportPermitRequestsError,
  Credentials | HttpClient.HttpClient,
  SupportPermitRequest
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSupportPermitRequestsInput,
  output: ListSupportPermitRequestsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSupportPermitRequests",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "supportPermitRequests",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSupportPermitsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all support permits in the caller's account. Use pagination to ensure that the operation returns quickly and successfully.
 */
export const listSupportPermits: API.PaginatedOperationMethod<
  ListSupportPermitsInput,
  ListSupportPermitsOutput,
  ListSupportPermitsError,
  Credentials | HttpClient.HttpClient,
  SupportPermitSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSupportPermitsInput,
  output: ListSupportPermitsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSupportPermits",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "supportPermits",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the tags associated with a support permit resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceInput,
  output: ListTagsForResourceOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type RejectSupportPermitRequestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Rejects a permit request from an AWS support operator. The operator cannot proceed with the requested action.
 */
export const rejectSupportPermitRequest: API.OperationMethod<
  RejectSupportPermitRequestInput,
  RejectSupportPermitRequestOutput,
  RejectSupportPermitRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RejectSupportPermitRequestInput,
  output: RejectSupportPermitRequestOutput,
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
  operationName: "RejectSupportPermitRequest",
}));

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds or overwrites one or more tags for a support permit resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceOutput,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceInput,
  output: TagResourceOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes one or more tags from a support permit resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceInput,
  output: UntagResourceOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));
