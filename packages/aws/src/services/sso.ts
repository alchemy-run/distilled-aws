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
  sdkId: "SSO",
  serviceShapeName: "SWBPortalService",
});
const auth = T.AwsAuthSigv4({ name: "awsssoportal" });
const ver = T.ServiceVersion("2019-06-10");
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
              `https://portal.sso-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
              return e(`https://portal.sso.${Region}.amazonaws.com`);
            }
            return e(
              `https://portal.sso-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://portal.sso.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://portal.sso.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class InvalidRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidRequestException>()(
    "InvalidRequestException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class UnauthorizedException
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedException>()(
    "UnauthorizedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(401),
  ).pipe(C.withAuthError) {}
export type RoleNameType = string;
export type AccountIdType = string;
export type AccessTokenType = string | redacted.Redacted<string>;
export interface GetRoleCredentialsRequest {
  roleName: string;
  accountId: string;
  accessToken: string | redacted.Redacted<string>;
}
export const GetRoleCredentialsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    roleName: S.String.pipe(T.HttpQuery("role_name")),
    accountId: S.String.pipe(T.HttpQuery("account_id")),
    accessToken: SensitiveString.pipe(T.HttpHeader("x-amz-sso_bearer_token")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/federation/credentials" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRoleCredentialsRequest",
}) as any as S.Schema<GetRoleCredentialsRequest>;
export type AccessKeyType = string;
export type SecretAccessKeyType = string | redacted.Redacted<string>;
export type SessionTokenType = string | redacted.Redacted<string>;
export type ExpirationTimestampType = number;
export interface RoleCredentials {
  accessKeyId?: string;
  secretAccessKey?: string | redacted.Redacted<string>;
  sessionToken?: string | redacted.Redacted<string>;
  expiration?: number;
}
export const RoleCredentials = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accessKeyId: S.optional(S.String),
    secretAccessKey: S.optional(SensitiveString),
    sessionToken: S.optional(SensitiveString),
    expiration: S.optional(S.Number),
  }),
).annotate({
  identifier: "RoleCredentials",
}) as any as S.Schema<RoleCredentials>;
export interface GetRoleCredentialsResponse {
  roleCredentials?: RoleCredentials;
}
export const GetRoleCredentialsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ roleCredentials: S.optional(RoleCredentials) }),
).annotate({
  identifier: "GetRoleCredentialsResponse",
}) as any as S.Schema<GetRoleCredentialsResponse>;
export type NextTokenType = string;
export type MaxResultType = number;
export interface ListAccountRolesRequest {
  nextToken?: string;
  maxResults?: number;
  accessToken: string | redacted.Redacted<string>;
  accountId: string;
}
export const ListAccountRolesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("next_token")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("max_result")),
    accessToken: SensitiveString.pipe(T.HttpHeader("x-amz-sso_bearer_token")),
    accountId: S.String.pipe(T.HttpQuery("account_id")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/assignment/roles" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAccountRolesRequest",
}) as any as S.Schema<ListAccountRolesRequest>;
export interface RoleInfo {
  roleName?: string;
  accountId?: string;
}
export const RoleInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ roleName: S.optional(S.String), accountId: S.optional(S.String) }),
).annotate({ identifier: "RoleInfo" }) as any as S.Schema<RoleInfo>;
export type RoleListType = RoleInfo[];
export const RoleListType = /*@__PURE__*/ S.Array(RoleInfo);
export interface ListAccountRolesResponse {
  nextToken?: string;
  roleList?: RoleInfo[];
}
export const ListAccountRolesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    roleList: S.optional(RoleListType),
  }),
).annotate({
  identifier: "ListAccountRolesResponse",
}) as any as S.Schema<ListAccountRolesResponse>;
export interface ListAccountsRequest {
  nextToken?: string;
  maxResults?: number;
  accessToken: string | redacted.Redacted<string>;
}
export const ListAccountsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("next_token")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("max_result")),
    accessToken: SensitiveString.pipe(T.HttpHeader("x-amz-sso_bearer_token")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/assignment/accounts" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAccountsRequest",
}) as any as S.Schema<ListAccountsRequest>;
export type AccountNameType = string;
export type EmailAddressType = string;
export interface AccountInfo {
  accountId?: string;
  accountName?: string;
  emailAddress?: string;
}
export const AccountInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountId: S.optional(S.String),
    accountName: S.optional(S.String),
    emailAddress: S.optional(S.String),
  }),
).annotate({ identifier: "AccountInfo" }) as any as S.Schema<AccountInfo>;
export type AccountListType = AccountInfo[];
export const AccountListType = /*@__PURE__*/ S.Array(AccountInfo);
export interface ListAccountsResponse {
  nextToken?: string;
  accountList?: AccountInfo[];
}
export const ListAccountsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    accountList: S.optional(AccountListType),
  }),
).annotate({
  identifier: "ListAccountsResponse",
}) as any as S.Schema<ListAccountsResponse>;
export interface LogoutRequest {
  accessToken: string | redacted.Redacted<string>;
}
export const LogoutRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accessToken: SensitiveString.pipe(T.HttpHeader("x-amz-sso_bearer_token")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/logout" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "LogoutRequest" }) as any as S.Schema<LogoutRequest>;
export interface LogoutResponse {}
export const LogoutResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({ identifier: "LogoutResponse" }) as any as S.Schema<LogoutResponse>;
export type ErrorDescription = string;
export type GetRoleCredentialsError =
  | InvalidRequestException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns the STS short-term credentials for a given role name that is assigned to the
 * user.
 */
export const getRoleCredentials: API.OperationMethod<
  GetRoleCredentialsRequest,
  GetRoleCredentialsResponse,
  GetRoleCredentialsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRoleCredentialsRequest,
  output: GetRoleCredentialsResponse,
  errors: [
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRoleCredentials",
}));

export type ListAccountRolesError =
  | InvalidRequestException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists all roles that are assigned to the user for a given AWS account.
 */
export const listAccountRoles: API.PaginatedOperationMethod<
  ListAccountRolesRequest,
  ListAccountRolesResponse,
  ListAccountRolesError,
  Credentials | HttpClient.HttpClient,
  RoleInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAccountRolesRequest,
  output: ListAccountRolesResponse,
  errors: [
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccountRoles",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "roleList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAccountsError =
  | InvalidRequestException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists all AWS accounts assigned to the user. These AWS accounts are assigned by the
 * administrator of the account. For more information, see Assign User Access in the *IAM Identity Center User Guide*. This operation
 * returns a paginated response.
 */
export const listAccounts: API.PaginatedOperationMethod<
  ListAccountsRequest,
  ListAccountsResponse,
  ListAccountsError,
  Credentials | HttpClient.HttpClient,
  AccountInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAccountsRequest,
  output: ListAccountsResponse,
  errors: [
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccounts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "accountList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type LogoutError =
  | InvalidRequestException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Removes the locally stored SSO tokens from the client-side cache and sends an API call to
 * the IAM Identity Center service to invalidate the corresponding server-side IAM Identity Center sign in
 * session.
 *
 * If a user uses IAM Identity Center to access the AWS CLI, the user’s IAM Identity Center sign in session is
 * used to obtain an IAM session, as specified in the corresponding IAM Identity Center permission set.
 * More specifically, IAM Identity Center assumes an IAM role in the target account on behalf of the user,
 * and the corresponding temporary AWS credentials are returned to the client.
 *
 * After user logout, any existing IAM role sessions that were created by using IAM Identity Center
 * permission sets continue based on the duration configured in the permission set.
 * For more information, see User
 * authentications in the IAM Identity Center User
 * Guide.
 */
export const logout: API.OperationMethod<
  LogoutRequest,
  LogoutResponse,
  LogoutError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: LogoutRequest,
  output: LogoutResponse,
  errors: [
    InvalidRequestException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Logout",
}));
