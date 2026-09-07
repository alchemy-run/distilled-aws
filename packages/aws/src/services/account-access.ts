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
  sdkId: "Account Access",
  serviceShapeName: "AWSAccountAccess",
});
const auth = T.AwsAuthSigv4({ name: "account-access" });
const ver = T.ServiceVersion("2018-05-10");
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
            `https://account-access-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        return e(
          `https://account-access.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class AlreadyCreatedException
  extends /*@__PURE__*/ S.TaggedError<AlreadyCreatedException>()(
    "AlreadyCreatedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
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
export type IdentityCenterInstanceArn = string;
export interface IdentityCenter {
  instanceArn: string;
}
export const IdentityCenter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ instanceArn: S.String }),
).annotate({ identifier: "IdentityCenter" }) as any as S.Schema<IdentityCenter>;
export type IdentitySource = { identityCenter: IdentityCenter };
export const IdentitySource = /*@__PURE__*/ S.Union([
  S.Struct({ identityCenter: IdentityCenter }),
]);
export type TagsMap = { [key: string]: string | undefined };
export const TagsMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateApplicationRequest {
  identitySource: IdentitySource;
  tags?: { [key: string]: string | undefined };
}
export const CreateApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ identitySource: IdentitySource, tags: S.optional(TagsMap) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/applications" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateApplicationRequest",
}) as any as S.Schema<CreateApplicationRequest>;
export type ApplicationArn = string;
export interface CreateApplicationResponse {
  applicationArn: string;
}
export const CreateApplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ applicationArn: S.String }),
).annotate({
  identifier: "CreateApplicationResponse",
}) as any as S.Schema<CreateApplicationResponse>;
export type UserId = string;
export type GroupId = string;
export type IdentityCenterPrincipal =
  | { userId: string; groupId?: never }
  | { userId?: never; groupId: string };
export const IdentityCenterPrincipal = /*@__PURE__*/ S.Union([
  S.Struct({ userId: S.String }),
  S.Struct({ groupId: S.String }),
]);
export type Principal = { identityCenter: IdentityCenterPrincipal };
export const Principal = /*@__PURE__*/ S.Union([
  S.Struct({ identityCenter: IdentityCenterPrincipal }),
]);
export type RoleArn = string;
export interface PrincipalRoleEntitlement {
  principal: Principal;
  roleArn: string;
}
export const PrincipalRoleEntitlement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ principal: Principal, roleArn: S.String }),
).annotate({
  identifier: "PrincipalRoleEntitlement",
}) as any as S.Schema<PrincipalRoleEntitlement>;
export type Entitlement = { principalRole: PrincipalRoleEntitlement };
export const Entitlement = /*@__PURE__*/ S.Union([
  S.Struct({ principalRole: PrincipalRoleEntitlement }),
]);
export interface CreateEntitlementRequest {
  applicationArn: string;
  entitlement: Entitlement;
}
export const CreateEntitlementRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ applicationArn: S.String, entitlement: Entitlement }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/entitlements" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateEntitlementRequest",
}) as any as S.Schema<CreateEntitlementRequest>;
export interface CreateEntitlementResponse {
  entitlementId: string;
}
export const CreateEntitlementResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ entitlementId: S.String }),
).annotate({
  identifier: "CreateEntitlementResponse",
}) as any as S.Schema<CreateEntitlementResponse>;
export interface DeleteApplicationRequest {
  applicationArn: string;
}
export const DeleteApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationArn: S.String.pipe(T.HttpLabel("applicationArn")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/applications/{applicationArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteApplicationRequest",
}) as any as S.Schema<DeleteApplicationRequest>;
export interface DeleteApplicationResponse {}
export const DeleteApplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteApplicationResponse",
}) as any as S.Schema<DeleteApplicationResponse>;
export interface DeleteEntitlementRequest {
  applicationArn: string;
  entitlementId: string;
}
export const DeleteEntitlementRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationArn: S.String.pipe(T.HttpQuery("applicationArn")),
    entitlementId: S.String.pipe(T.HttpLabel("entitlementId")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/entitlements/{entitlementId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteEntitlementRequest",
}) as any as S.Schema<DeleteEntitlementRequest>;
export interface DeleteEntitlementResponse {}
export const DeleteEntitlementResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteEntitlementResponse",
}) as any as S.Schema<DeleteEntitlementResponse>;
export interface GetApplicationRequest {
  applicationArn: string;
}
export const GetApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationArn: S.String.pipe(T.HttpLabel("applicationArn")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/applications/{applicationArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetApplicationRequest",
}) as any as S.Schema<GetApplicationRequest>;
export type IdentityCenterApplicationArn = string;
export interface IdentityCenterDetails {
  instanceArn: string;
  applicationArn?: string;
}
export const IdentityCenterDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ instanceArn: S.String, applicationArn: S.optional(S.String) }),
).annotate({
  identifier: "IdentityCenterDetails",
}) as any as S.Schema<IdentityCenterDetails>;
export type IdentitySourceDetails = { identityCenter: IdentityCenterDetails };
export const IdentitySourceDetails = /*@__PURE__*/ S.Union([
  S.Struct({ identityCenter: IdentityCenterDetails }),
]);
export type Status =
  | "CREATE_IN_PROGRESS"
  | "ACTIVE"
  | "DELETE_IN_PROGRESS"
  | "CREATE_FAILED"
  | "DELETE_FAILED"
  | (string & {});
export const Status = S.String;

export type ErrorCode =
  | "AUTHORIZATION_ERROR"
  | "RESOURCE_NOT_FOUND_ERROR"
  | "SERVICE_QUOTA_EXCEEDED_ERROR"
  | "INTERNAL_SERVICE_ERROR"
  | (string & {});
export const ErrorCode = S.String;

export interface ErrorDetails {
  code: ErrorCode;
  message: string;
}
export const ErrorDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ code: ErrorCode, message: S.String }),
).annotate({ identifier: "ErrorDetails" }) as any as S.Schema<ErrorDetails>;
export interface GetApplicationResponse {
  identitySource: IdentitySourceDetails;
  status: Status;
  tenantId?: string;
  createdAt: Date;
  updatedAt: Date;
  tags?: { [key: string]: string | undefined };
  error?: ErrorDetails;
}
export const GetApplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    identitySource: IdentitySourceDetails,
    status: Status,
    tenantId: S.optional(S.String),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    tags: S.optional(TagsMap),
    error: S.optional(ErrorDetails),
  }),
).annotate({
  identifier: "GetApplicationResponse",
}) as any as S.Schema<GetApplicationResponse>;
export interface GetEntitlementRequest {
  applicationArn: string;
  entitlementId: string;
}
export const GetEntitlementRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationArn: S.String.pipe(T.HttpQuery("applicationArn")),
    entitlementId: S.String.pipe(T.HttpLabel("entitlementId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/entitlements/{entitlementId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetEntitlementRequest",
}) as any as S.Schema<GetEntitlementRequest>;
export type Account = string;
export interface PrincipalRoleEntitlementDetails {
  principal: Principal;
  roleArn: string;
  account: string;
  accountName?: string;
}
export const PrincipalRoleEntitlementDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    principal: Principal,
    roleArn: S.String,
    account: S.String,
    accountName: S.optional(S.String),
  }),
).annotate({
  identifier: "PrincipalRoleEntitlementDetails",
}) as any as S.Schema<PrincipalRoleEntitlementDetails>;
export type EntitlementDetails = {
  principalRole: PrincipalRoleEntitlementDetails;
};
export const EntitlementDetails = /*@__PURE__*/ S.Union([
  S.Struct({ principalRole: PrincipalRoleEntitlementDetails }),
]);
export interface GetEntitlementResponse {
  applicationArn: string;
  entitlementId: string;
  entitlement: EntitlementDetails;
  createdAt: Date;
}
export const GetEntitlementResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationArn: S.String,
    entitlementId: S.String,
    entitlement: EntitlementDetails,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "GetEntitlementResponse",
}) as any as S.Schema<GetEntitlementResponse>;
export interface ListApplicationsRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListApplicationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/applications-list" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListApplicationsRequest",
}) as any as S.Schema<ListApplicationsRequest>;
export interface ApplicationSummary {
  applicationArn: string;
  tenantId?: string;
  createdAt: Date;
  updatedAt: Date;
}
export const ApplicationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationArn: S.String,
    tenantId: S.optional(S.String),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "ApplicationSummary",
}) as any as S.Schema<ApplicationSummary>;
export type ApplicationList = ApplicationSummary[];
export const ApplicationList = /*@__PURE__*/ S.Array(ApplicationSummary);
export interface ListApplicationsResponse {
  applications: ApplicationSummary[];
  nextToken?: string;
}
export const ListApplicationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ applications: ApplicationList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListApplicationsResponse",
}) as any as S.Schema<ListApplicationsResponse>;
export type IdentityCenterPrincipalFilter =
  | { userId: string; groupId?: never }
  | { userId?: never; groupId: string };
export const IdentityCenterPrincipalFilter = /*@__PURE__*/ S.Union([
  S.Struct({ userId: S.String }),
  S.Struct({ groupId: S.String }),
]);
export type PrincipalFilter = { identityCenter: IdentityCenterPrincipalFilter };
export const PrincipalFilter = /*@__PURE__*/ S.Union([
  S.Struct({ identityCenter: IdentityCenterPrincipalFilter }),
]);
export interface PrincipalRoleEntitlementFilter {
  principal?: PrincipalFilter;
  roleArn?: string;
  account?: string;
}
export const PrincipalRoleEntitlementFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    principal: S.optional(PrincipalFilter),
    roleArn: S.optional(S.String),
    account: S.optional(S.String),
  }),
).annotate({
  identifier: "PrincipalRoleEntitlementFilter",
}) as any as S.Schema<PrincipalRoleEntitlementFilter>;
export interface EntitlementFilter {
  principalRole?: PrincipalRoleEntitlementFilter;
}
export const EntitlementFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ principalRole: S.optional(PrincipalRoleEntitlementFilter) }),
).annotate({
  identifier: "EntitlementFilter",
}) as any as S.Schema<EntitlementFilter>;
export interface ListEntitlementsRequest {
  applicationArn: string;
  filter: EntitlementFilter;
  nextToken?: string;
  maxResults?: number;
}
export const ListEntitlementsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationArn: S.String,
    filter: EntitlementFilter,
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/entitlements-list" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListEntitlementsRequest",
}) as any as S.Schema<ListEntitlementsRequest>;
export interface PrincipalRoleEntitlementSummary {
  principal: Principal;
  roleArn: string;
  account: string;
  accountName?: string;
}
export const PrincipalRoleEntitlementSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    principal: Principal,
    roleArn: S.String,
    account: S.String,
    accountName: S.optional(S.String),
  }),
).annotate({
  identifier: "PrincipalRoleEntitlementSummary",
}) as any as S.Schema<PrincipalRoleEntitlementSummary>;
export type EntitlementSummary = {
  principalRole: PrincipalRoleEntitlementSummary;
};
export const EntitlementSummary = /*@__PURE__*/ S.Union([
  S.Struct({ principalRole: PrincipalRoleEntitlementSummary }),
]);
export interface EntitlementsListMember {
  entitlementId: string;
  entitlement: EntitlementSummary;
  createdAt: Date;
}
export const EntitlementsListMember = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    entitlementId: S.String,
    entitlement: EntitlementSummary,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "EntitlementsListMember",
}) as any as S.Schema<EntitlementsListMember>;
export type EntitlementsList = EntitlementsListMember[];
export const EntitlementsList = /*@__PURE__*/ S.Array(EntitlementsListMember);
export interface ListEntitlementsResponse {
  entitlements: EntitlementsListMember[];
  nextToken?: string;
}
export const ListEntitlementsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ entitlements: EntitlementsList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListEntitlementsResponse",
}) as any as S.Schema<ListEntitlementsResponse>;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: S.optional(TagsMap) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tags: TagsMap,
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
  identifier: "TagResourceRequest",
}) as any as S.Schema<TagResourceRequest>;
export interface TagResourceResponse {}
export const TagResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "TagResourceResponse",
}) as any as S.Schema<TagResourceResponse>;
export type TagKeys = string[];
export const TagKeys = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tagKeys: TagKeys.pipe(T.HttpQuery("tagKeys")),
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
  identifier: "UntagResourceRequest",
}) as any as S.Schema<UntagResourceRequest>;
export interface UntagResourceResponse {}
export const UntagResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export type CreateApplicationError =
  | AccessDeniedException
  | AlreadyCreatedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an account access manager instance and its Amazon Web Services account access application in the associated IAM Identity Center instance. This operation is idempotent; calling it multiple times with the same parameters returns the existing application.
 */
export const createApplication: API.OperationMethod<
  CreateApplicationRequest,
  CreateApplicationResponse,
  CreateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateApplicationRequest,
  output: CreateApplicationResponse,
  errors: [
    AccessDeniedException,
    AlreadyCreatedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApplication",
}));

export type CreateEntitlementError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an entitlement (assignment) in account access manager. An entitlement (assignment) grants a principal (IAM Identity Center user or group) permission to assume a specified IAM role in an Amazon Web Services account. This operation is idempotent.
 */
export const createEntitlement: API.OperationMethod<
  CreateEntitlementRequest,
  CreateEntitlementResponse,
  CreateEntitlementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateEntitlementRequest,
  output: CreateEntitlementResponse,
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
  operationName: "CreateEntitlement",
}));

export type DeleteApplicationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an account access manager application. This operation is idempotent; deleting an application that has already been deleted does not return an error.
 */
export const deleteApplication: API.OperationMethod<
  DeleteApplicationRequest,
  DeleteApplicationResponse,
  DeleteApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteApplicationRequest,
  output: DeleteApplicationResponse,
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
  operationName: "DeleteApplication",
}));

export type DeleteEntitlementError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an entitlement from an account access manager application. This operation is idempotent; deleting an entitlement that has already been deleted does not return an error.
 */
export const deleteEntitlement: API.OperationMethod<
  DeleteEntitlementRequest,
  DeleteEntitlementResponse,
  DeleteEntitlementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEntitlementRequest,
  output: DeleteEntitlementResponse,
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
  operationName: "DeleteEntitlement",
}));

export type GetApplicationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details about an account access manager application, including its status, identity source, and tags.
 */
export const getApplication: API.OperationMethod<
  GetApplicationRequest,
  GetApplicationResponse,
  GetApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetApplicationRequest,
  output: GetApplicationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApplication",
}));

export type GetEntitlementError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details about a specific entitlement for an account access manager application, including the principal, IAM role, and target account.
 */
export const getEntitlement: API.OperationMethod<
  GetEntitlementRequest,
  GetEntitlementResponse,
  GetEntitlementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEntitlementRequest,
  output: GetEntitlementResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEntitlement",
}));

export type ListApplicationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the account access manager applications in your account. Use pagination to ensure that the operation returns quickly and successfully.
 */
export const listApplications: API.PaginatedOperationMethod<
  ListApplicationsRequest,
  ListApplicationsResponse,
  ListApplicationsError,
  Credentials | HttpClient.HttpClient,
  ApplicationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListApplicationsRequest,
  output: ListApplicationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplications",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "applications",
  } as const,
})) as any;

export type ListEntitlementsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the entitlements for a specified account access manager application. You can filter results by principal, IAM role, or account. Use pagination to ensure that the operation returns quickly and successfully.
 */
export const listEntitlements: API.PaginatedOperationMethod<
  ListEntitlementsRequest,
  ListEntitlementsResponse,
  ListEntitlementsError,
  Credentials | HttpClient.HttpClient,
  EntitlementsListMember
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEntitlementsRequest,
  output: ListEntitlementsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEntitlements",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "entitlements",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the tags associated with an account access manager resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds tags to an account access manager resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [
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
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes tags from an account access manager resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));
