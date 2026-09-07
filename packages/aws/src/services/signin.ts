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
const svc = T.AwsApiService({ sdkId: "Signin", serviceShapeName: "Signin" });
const auth = T.AwsAuthSigv4({ name: "signin" });
const ver = T.ServiceVersion("2023-01-01");
const proto = T.AwsProtocolsRestJson1();
const rules = T.EndpointResolver((p, _) => {
  const {
    UseDualStack = false,
    UseFIPS = false,
    Endpoint,
    Region,
    IsControlPlane,
  } = p;
  const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
    type: "endpoint" as const,
    endpoint: { url: u as string, properties: p, headers: h },
  });
  const err = (m: unknown): T.EndpointResolverResult => ({
    type: "error" as const,
    message: m as string,
  });
  const _p0 = (_0: unknown) => ({
    authSchemes: [
      { name: "sigv4", signingName: "signin", signingRegion: `${_0}` },
    ],
  });
  {
    const PartitionResult = _.partition(Region);
    if (
      IsControlPlane != null &&
      IsControlPlane === true &&
      Region != null &&
      PartitionResult != null &&
      PartitionResult !== false
    ) {
      if (_.getAttr(PartitionResult, "name") === "aws") {
        return e(`https://signin.${Region}.api.aws`, _p0(Region), {});
      }
      if (_.getAttr(PartitionResult, "name") === "aws-cn") {
        return e(
          `https://signin.${Region}.api.amazonwebservices.com.cn`,
          _p0(Region),
          {},
        );
      }
      return e(
        `https://signin.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
        _p0(Region),
        {},
      );
    }
  }
  {
    const PartitionResult = _.partition(Region);
    if (
      Region != null &&
      !(Endpoint != null) &&
      UseFIPS === false &&
      UseDualStack === false &&
      PartitionResult != null &&
      PartitionResult !== false &&
      _.getAttr(PartitionResult, "name") === "aws"
    ) {
      return e(`https://${Region}.signin.aws.amazon.com`);
    }
  }
  {
    const PartitionResult = _.partition(Region);
    if (
      Region != null &&
      !(Endpoint != null) &&
      UseFIPS === false &&
      UseDualStack === false &&
      PartitionResult != null &&
      PartitionResult !== false &&
      _.getAttr(PartitionResult, "name") === "aws-cn"
    ) {
      return e(`https://${Region}.signin.amazonaws.cn`);
    }
  }
  {
    const PartitionResult = _.partition(Region);
    if (
      Region != null &&
      !(Endpoint != null) &&
      UseFIPS === false &&
      UseDualStack === false &&
      PartitionResult != null &&
      PartitionResult !== false &&
      _.getAttr(PartitionResult, "name") === "aws-us-gov"
    ) {
      return e(`https://${Region}.signin.amazonaws-us-gov.com`);
    }
  }
  {
    const PartitionResult = _.partition(Region);
    if (
      Region != null &&
      !(Endpoint != null) &&
      UseFIPS === false &&
      UseDualStack === false &&
      PartitionResult != null &&
      PartitionResult !== false &&
      _.getAttr(PartitionResult, "name") === "aws-iso"
    ) {
      return e(`https://${Region}.signin.c2shome.ic.gov`);
    }
  }
  {
    const PartitionResult = _.partition(Region);
    if (
      Region != null &&
      !(Endpoint != null) &&
      UseFIPS === false &&
      UseDualStack === false &&
      PartitionResult != null &&
      PartitionResult !== false &&
      _.getAttr(PartitionResult, "name") === "aws-iso-b"
    ) {
      return e(`https://${Region}.signin.sc2shome.sgov.gov`);
    }
  }
  {
    const PartitionResult = _.partition(Region);
    if (
      Region != null &&
      !(Endpoint != null) &&
      UseFIPS === false &&
      UseDualStack === false &&
      PartitionResult != null &&
      PartitionResult !== false &&
      _.getAttr(PartitionResult, "name") === "aws-iso-f"
    ) {
      return e(`https://${Region}.signin.csphome.hci.ic.gov`);
    }
  }
  {
    const PartitionResult = _.partition(Region);
    if (
      Region != null &&
      !(Endpoint != null) &&
      UseFIPS === false &&
      UseDualStack === false &&
      PartitionResult != null &&
      PartitionResult !== false &&
      _.getAttr(PartitionResult, "name") === "aws-iso-e"
    ) {
      return e(`https://${Region}.signin.csphome.adc-e.uk`);
    }
  }
  {
    const PartitionResult = _.partition(Region);
    if (
      Region != null &&
      !(Endpoint != null) &&
      UseFIPS === false &&
      UseDualStack === false &&
      PartitionResult != null &&
      PartitionResult !== false &&
      _.getAttr(PartitionResult, "name") === "aws-eusc"
    ) {
      return e(`https://${Region}.signin.amazonaws-eusc.eu`);
    }
  }
  if (
    Region != null &&
    !(Endpoint != null) &&
    UseFIPS === true &&
    UseDualStack === false &&
    Region === "us-gov-west-1"
  ) {
    return e("https://signin-fips.amazonaws-us-gov.com");
  }
  {
    const PartitionResult = _.partition(Region);
    if (
      Region != null &&
      !(Endpoint != null) &&
      UseFIPS === true &&
      UseDualStack === false &&
      PartitionResult != null &&
      PartitionResult !== false &&
      _.getAttr(PartitionResult, "name") === "aws-us-gov"
    ) {
      return e(`https://${Region}.signin-fips.amazonaws-us-gov.com`);
    }
  }
  {
    const PartitionResult = _.partition(Region);
    if (
      Region != null &&
      !(Endpoint != null) &&
      UseFIPS === false &&
      UseDualStack === false &&
      PartitionResult != null &&
      PartitionResult !== false
    ) {
      return e(
        `https://${Region}.signin.${_.getAttr(PartitionResult, "dnsSuffix")}`,
      );
    }
  }
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
        if (
          _.getAttr(PartitionResult, "name") === "aws" &&
          UseFIPS === false &&
          UseDualStack === false
        ) {
          return e(`https://${Region}.signin.aws.amazon.com`);
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-cn" &&
          UseFIPS === false &&
          UseDualStack === false
        ) {
          return e(`https://${Region}.signin.amazonaws.cn`);
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
          UseFIPS === false &&
          UseDualStack === false
        ) {
          return e(`https://${Region}.signin.amazonaws-us-gov.com`);
        }
        if (UseFIPS === true && UseDualStack === true) {
          if (
            true === _.getAttr(PartitionResult, "supportsFIPS") &&
            true === _.getAttr(PartitionResult, "supportsDualStack")
          ) {
            return e(
              `https://signin-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true && UseDualStack === false) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://signin-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseFIPS === false && UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://signin.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://signin.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
      error: S.suspend(() => OAuth2ErrorCode).annotate({
        identifier: "OAuth2ErrorCode",
      }),
      message: S.String.pipe(T.ErrorMessage()),
    },
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      error: S.suspend(() => OAuth2ErrorCode).annotate({
        identifier: "OAuth2ErrorCode",
      }),
      message: S.String.pipe(T.ErrorMessage()),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      error: S.suspend(() => OAuth2ErrorCode).annotate({
        identifier: "OAuth2ErrorCode",
      }),
      message: S.String.pipe(T.ErrorMessage()),
    },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      error: S.suspend(() => OAuth2ErrorCode).annotate({
        identifier: "OAuth2ErrorCode",
      }),
      message: S.String.pipe(T.ErrorMessage()),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      error: S.suspend(() => OAuth2ErrorCode).annotate({
        identifier: "OAuth2ErrorCode",
      }),
      message: S.String.pipe(T.ErrorMessage()),
    },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class TooManyRequestsError
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsError>()(
    "TooManyRequestsError",
    {
      error: S.suspend(() => OAuth2ErrorCode).annotate({
        identifier: "OAuth2ErrorCode",
      }),
      message: S.String.pipe(T.ErrorMessage()),
    },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      error: S.suspend(() => OAuth2ErrorCode).annotate({
        identifier: "OAuth2ErrorCode",
      }),
      message: S.String.pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type ClientId = string;
export type GrantType = string;
export type AuthorizationCode = string;
export type RedirectUri = string;
export type CodeVerifier = string;
export type RefreshToken = string | redacted.Redacted<string>;
export interface CreateOAuth2TokenRequestBody {
  clientId: string;
  grantType: string;
  code?: string;
  redirectUri?: string;
  codeVerifier?: string;
  refreshToken?: string | redacted.Redacted<string>;
}
export const CreateOAuth2TokenRequestBody = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientId: S.String,
    grantType: S.String,
    code: S.optional(S.String),
    redirectUri: S.optional(S.String),
    codeVerifier: S.optional(S.String),
    refreshToken: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "CreateOAuth2TokenRequestBody",
}) as any as S.Schema<CreateOAuth2TokenRequestBody>;
export interface CreateOAuth2TokenRequest {
  tokenInput: CreateOAuth2TokenRequestBody;
}
export const CreateOAuth2TokenRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    tokenInput: CreateOAuth2TokenRequestBody.pipe(T.HttpPayload()).annotate({
      identifier: "CreateOAuth2TokenRequestBody",
    }),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/token" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ IsControlPlane: { value: false } }),
    ),
  ),
).annotate({
  identifier: "CreateOAuth2TokenRequest",
}) as any as S.Schema<CreateOAuth2TokenRequest>;
export interface AccessToken {
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken: string;
}
export const AccessToken = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accessKeyId: S.String,
    secretAccessKey: S.String,
    sessionToken: S.String,
  }),
).annotate({ identifier: "AccessToken" }) as any as S.Schema<AccessToken>;
export type TokenType = string;
export type ExpiresIn = number;
export type IdToken = string;
export interface CreateOAuth2TokenResponseBody {
  accessToken: AccessToken;
  tokenType: string;
  expiresIn: number;
  refreshToken: string | redacted.Redacted<string>;
  idToken?: string;
}
export const CreateOAuth2TokenResponseBody = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accessToken: AccessToken,
    tokenType: S.String,
    expiresIn: S.Number,
    refreshToken: SensitiveString,
    idToken: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateOAuth2TokenResponseBody",
}) as any as S.Schema<CreateOAuth2TokenResponseBody>;
export interface CreateOAuth2TokenResponse {
  tokenOutput: CreateOAuth2TokenResponseBody;
}
export const CreateOAuth2TokenResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    tokenOutput: CreateOAuth2TokenResponseBody.pipe(T.HttpPayload()).annotate({
      identifier: "CreateOAuth2TokenResponseBody",
    }),
  }),
).annotate({
  identifier: "CreateOAuth2TokenResponse",
}) as any as S.Schema<CreateOAuth2TokenResponse>;
export type TargetId = string;
export interface DeleteConsoleAuthorizationConfigurationInput {
  targetId?: string;
}
export const DeleteConsoleAuthorizationConfigurationInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ targetId: S.optional(S.String) }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/delete-console-authorization-configuration",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
        T.StaticContextParams({ IsControlPlane: { value: true } }),
      ),
    ),
  ).annotate({
    identifier: "DeleteConsoleAuthorizationConfigurationInput",
  }) as any as S.Schema<DeleteConsoleAuthorizationConfigurationInput>;
export interface DeleteConsoleAuthorizationConfigurationOutput {
  targetId: string;
  scope: string;
  consoleAuthorizationEnabled: boolean;
}
export const DeleteConsoleAuthorizationConfigurationOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      targetId: S.String,
      scope: S.String,
      consoleAuthorizationEnabled: S.Boolean,
    }),
  ).annotate({
    identifier: "DeleteConsoleAuthorizationConfigurationOutput",
  }) as any as S.Schema<DeleteConsoleAuthorizationConfigurationOutput>;
export type StatementId = string;
export type ClientToken = string;
export interface DeleteResourcePermissionStatementInput {
  statementId: string;
  clientToken?: string;
}
export const DeleteResourcePermissionStatementInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      statementId: S.String,
      clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/delete-resource-permission-statement",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
        T.StaticContextParams({ IsControlPlane: { value: true } }),
      ),
    ),
).annotate({
  identifier: "DeleteResourcePermissionStatementInput",
}) as any as S.Schema<DeleteResourcePermissionStatementInput>;
export interface DeleteResourcePermissionStatementOutput {}
export const DeleteResourcePermissionStatementOutput = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeleteResourcePermissionStatementOutput",
}) as any as S.Schema<DeleteResourcePermissionStatementOutput>;
export interface GetConsoleAuthorizationConfigurationInput {
  targetId?: string;
}
export const GetConsoleAuthorizationConfigurationInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ targetId: S.optional(S.String) }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/get-console-authorization-configuration",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
        T.StaticContextParams({ IsControlPlane: { value: true } }),
      ),
    ),
  ).annotate({
    identifier: "GetConsoleAuthorizationConfigurationInput",
  }) as any as S.Schema<GetConsoleAuthorizationConfigurationInput>;
export interface GetConsoleAuthorizationConfigurationOutput {
  targetId: string;
  scope: string;
  consoleAuthorizationEnabled: boolean;
}
export const GetConsoleAuthorizationConfigurationOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      targetId: S.String,
      scope: S.String,
      consoleAuthorizationEnabled: S.Boolean,
    }),
  ).annotate({
    identifier: "GetConsoleAuthorizationConfigurationOutput",
  }) as any as S.Schema<GetConsoleAuthorizationConfigurationOutput>;
export interface GetResourcePolicyInput {}
export const GetResourcePolicyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/get-resource-policy" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ IsControlPlane: { value: true } }),
    ),
  ),
).annotate({
  identifier: "GetResourcePolicyInput",
}) as any as S.Schema<GetResourcePolicyInput>;
export type Principal = { [key: string]: string | undefined };
export const Principal = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type PolicyActions = string[];
export const PolicyActions = /*@__PURE__*/ S.Array(S.String);
export type ConditionType = string;
export type ConditionValues = string[];
export const ConditionValues = /*@__PURE__*/ S.Array(S.String);
export type Condition = { [key: string]: string[] | undefined };
export const Condition = /*@__PURE__*/ S.Record(
  S.String,
  ConditionValues.pipe(S.optional),
);
export type ConditionBlock = {
  [key: string]: { [key: string]: string[] | undefined } | undefined;
};
export const ConditionBlock = /*@__PURE__*/ S.Record(
  S.String,
  Condition.pipe(S.optional),
);
export interface PolicyStatement {
  effect?: string;
  principal?: { [key: string]: string | undefined };
  action?: string[];
  resource?: string;
  condition?: {
    [key: string]: { [key: string]: string[] | undefined } | undefined;
  };
}
export const PolicyStatement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    effect: S.optional(S.String),
    principal: S.optional(Principal),
    action: S.optional(PolicyActions),
    resource: S.optional(S.String),
    condition: S.optional(ConditionBlock),
  }).pipe(
    S.encodeKeys({
      effect: "Effect",
      principal: "Principal",
      action: "Action",
      resource: "Resource",
      condition: "Condition",
    }),
  ),
).annotate({
  identifier: "PolicyStatement",
}) as any as S.Schema<PolicyStatement>;
export type PolicyStatements = PolicyStatement[];
export const PolicyStatements = /*@__PURE__*/ S.Array(PolicyStatement);
export interface SigninResourceBasedPolicy {
  version?: string;
  statement?: PolicyStatement[];
}
export const SigninResourceBasedPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    version: S.optional(S.String),
    statement: S.optional(PolicyStatements),
  }).pipe(S.encodeKeys({ version: "Version", statement: "Statement" })),
).annotate({
  identifier: "SigninResourceBasedPolicy",
}) as any as S.Schema<SigninResourceBasedPolicy>;
export interface GetResourcePolicyOutput {
  signinResourceBasedPolicy: SigninResourceBasedPolicy;
}
export const GetResourcePolicyOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ signinResourceBasedPolicy: SigninResourceBasedPolicy }),
).annotate({
  identifier: "GetResourcePolicyOutput",
}) as any as S.Schema<GetResourcePolicyOutput>;
export type ConsolePermissionMaxResults = number;
export type NextToken = string;
export interface ListResourcePermissionStatementsInput {
  maxResults?: number;
  nextToken?: string;
}
export const ListResourcePermissionStatementsInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      maxResults: S.optional(S.Number),
      nextToken: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/list-resource-permission-statements" }),
        svc,
        auth,
        proto,
        ver,
        rules,
        T.StaticContextParams({ IsControlPlane: { value: true } }),
      ),
    ),
).annotate({
  identifier: "ListResourcePermissionStatementsInput",
}) as any as S.Schema<ListResourcePermissionStatementsInput>;
export interface PermissionStatementSummary {
  sid: string;
  condition?: {
    [key: string]: { [key: string]: string[] | undefined } | undefined;
  };
}
export const PermissionStatementSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sid: S.String, condition: S.optional(ConditionBlock) }),
).annotate({
  identifier: "PermissionStatementSummary",
}) as any as S.Schema<PermissionStatementSummary>;
export type PermissionStatementSummaries = PermissionStatementSummary[];
export const PermissionStatementSummaries = /*@__PURE__*/ S.Array(
  PermissionStatementSummary,
);
export interface ListResourcePermissionStatementsOutput {
  permissionStatements: PermissionStatementSummary[];
  nextToken?: string;
}
export const ListResourcePermissionStatementsOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      permissionStatements: PermissionStatementSummaries,
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListResourcePermissionStatementsOutput",
}) as any as S.Schema<ListResourcePermissionStatementsOutput>;
export interface PutConsoleAuthorizationConfigurationInput {
  targetId?: string;
}
export const PutConsoleAuthorizationConfigurationInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ targetId: S.optional(S.String) }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/put-console-authorization-configuration",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
        T.StaticContextParams({ IsControlPlane: { value: true } }),
      ),
    ),
  ).annotate({
    identifier: "PutConsoleAuthorizationConfigurationInput",
  }) as any as S.Schema<PutConsoleAuthorizationConfigurationInput>;
export interface PutConsoleAuthorizationConfigurationOutput {
  targetId: string;
  scope: string;
  consoleAuthorizationEnabled: boolean;
}
export const PutConsoleAuthorizationConfigurationOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      targetId: S.String,
      scope: S.String,
      consoleAuthorizationEnabled: S.Boolean,
    }),
  ).annotate({
    identifier: "PutConsoleAuthorizationConfigurationOutput",
  }) as any as S.Schema<PutConsoleAuthorizationConfigurationOutput>;
export type SourceVpc = string;
export type SourceVpce = string;
export type VpcSourceIp = string;
export type SourceIp = string;
export type RequestedRegion = string;
export type ExcludedPrincipal = string;
export interface PutResourcePermissionStatementInput {
  sourceVpc?: string;
  signinSourceVpce?: string;
  consoleSourceVpce?: string;
  vpcSourceIp?: string;
  sourceIp?: string;
  requestedRegion?: string;
  excludedPrincipal?: string;
  clientToken?: string;
}
export const PutResourcePermissionStatementInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceVpc: S.optional(S.String),
    signinSourceVpce: S.optional(S.String),
    consoleSourceVpce: S.optional(S.String),
    vpcSourceIp: S.optional(S.String),
    sourceIp: S.optional(S.String),
    requestedRegion: S.optional(S.String),
    excludedPrincipal: S.optional(S.String),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/put-resource-permission-statement" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ IsControlPlane: { value: true } }),
    ),
  ),
).annotate({
  identifier: "PutResourcePermissionStatementInput",
}) as any as S.Schema<PutResourcePermissionStatementInput>;
export interface PutResourcePermissionStatementOutput {
  statementId: string;
}
export const PutResourcePermissionStatementOutput = /*@__PURE__*/ S.suspend(
  () => S.Struct({ statementId: S.String }),
).annotate({
  identifier: "PutResourcePermissionStatementOutput",
}) as any as S.Schema<PutResourcePermissionStatementOutput>;
export type OAuth2ErrorCode =
  | "TOKEN_EXPIRED"
  | "USER_CREDENTIALS_CHANGED"
  | "INSUFFICIENT_PERMISSIONS"
  | "AUTHCODE_EXPIRED"
  | "server_error"
  | "INVALID_REQUEST"
  | "RESOURCE_NOT_FOUND"
  | "CONFLICT"
  | "SERVICE_QUOTA_EXCEEDED"
  | (string & {});
export const OAuth2ErrorCode = /*@__PURE__*/ S.String;

export type CreateOAuth2TokenError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsError
  | ValidationException
  | CommonErrors;
/**
 * CreateOAuth2Token API
 *
 * Path: /v1/token
 * Request Method: POST
 * Content-Type: application/json or application/x-www-form-urlencoded
 *
 * This API implements OAuth 2.0 flows for AWS Sign-In CLI clients, supporting both:
 * 1. Authorization code redemption (grant_type=authorization_code) - NOT idempotent
 * 2. Token refresh (grant_type=refresh_token) - Idempotent within token validity window
 *
 * The operation behavior is determined by the grant_type parameter in the request body:
 *
 * **Authorization Code Flow (NOT Idempotent):**
 * - JSON or form-encoded body with client_id, grant_type=authorization_code, code, redirect_uri, code_verifier
 * - Returns access_token, token_type, expires_in, refresh_token, and id_token
 * - Each authorization code can only be used ONCE for security (prevents replay attacks)
 *
 * **Token Refresh Flow (Idempotent):**
 * - JSON or form-encoded body with client_id, grant_type=refresh_token, refresh_token
 * - Returns access_token, token_type, expires_in, and refresh_token (no id_token)
 * - Multiple calls with same refresh_token return consistent results within validity window
 *
 * Authentication and authorization:
 * - Confidential clients: sigv4 signing required with signin:ExchangeToken permissions
 * - CLI clients (public): authn/authz skipped based on client_id & grant_type
 *
 * Note: This operation cannot be marked as @idempotent because it handles both idempotent
 * (token refresh) and non-idempotent (auth code redemption) flows in a single endpoint.
 */
export const createOAuth2Token: API.OperationMethod<
  CreateOAuth2TokenRequest,
  CreateOAuth2TokenResponse,
  CreateOAuth2TokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateOAuth2TokenRequest,
  output: CreateOAuth2TokenResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsError,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateOAuth2Token",
}));

export type DeleteConsoleAuthorizationConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsError
  | ValidationException
  | CommonErrors;
/**
 * Delete console authorization configuration with automatic scope detection
 */
export const deleteConsoleAuthorizationConfiguration: API.OperationMethod<
  DeleteConsoleAuthorizationConfigurationInput,
  DeleteConsoleAuthorizationConfigurationOutput,
  DeleteConsoleAuthorizationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteConsoleAuthorizationConfigurationInput,
  output: DeleteConsoleAuthorizationConfigurationOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsError,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConsoleAuthorizationConfiguration",
}));

export type DeleteResourcePermissionStatementError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsError
  | ValidationException
  | CommonErrors;
/**
 * Remove a permission statement from the account's SignIn resource-based policy
 */
export const deleteResourcePermissionStatement: API.OperationMethod<
  DeleteResourcePermissionStatementInput,
  DeleteResourcePermissionStatementOutput,
  DeleteResourcePermissionStatementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteResourcePermissionStatementInput,
  output: DeleteResourcePermissionStatementOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsError,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePermissionStatement",
}));

export type GetConsoleAuthorizationConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsError
  | ValidationException
  | CommonErrors;
/**
 * Get console authorization configuration with automatic scope detection
 */
export const getConsoleAuthorizationConfiguration: API.OperationMethod<
  GetConsoleAuthorizationConfigurationInput,
  GetConsoleAuthorizationConfigurationOutput,
  GetConsoleAuthorizationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetConsoleAuthorizationConfigurationInput,
  output: GetConsoleAuthorizationConfigurationOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsError,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConsoleAuthorizationConfiguration",
}));

export type GetResourcePolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsError
  | CommonErrors;
/**
 * Retrieve the account's consolidated SignIn resource-based policy
 */
export const getResourcePolicy: API.OperationMethod<
  GetResourcePolicyInput,
  GetResourcePolicyOutput,
  GetResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetResourcePolicyInput,
  output: GetResourcePolicyOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicy",
}));

export type ListResourcePermissionStatementsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsError
  | ValidationException
  | CommonErrors;
/**
 * Retrieve all permission statements in the account's SignIn resource-based policy
 */
export const listResourcePermissionStatements: API.PaginatedOperationMethod<
  ListResourcePermissionStatementsInput,
  ListResourcePermissionStatementsOutput,
  ListResourcePermissionStatementsError,
  Credentials | HttpClient.HttpClient,
  PermissionStatementSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListResourcePermissionStatementsInput,
  output: ListResourcePermissionStatementsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsError,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourcePermissionStatements",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "permissionStatements",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PutConsoleAuthorizationConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsError
  | ValidationException
  | CommonErrors;
/**
 * Enable console authorization configuration with automatic scope detection
 */
export const putConsoleAuthorizationConfiguration: API.OperationMethod<
  PutConsoleAuthorizationConfigurationInput,
  PutConsoleAuthorizationConfigurationOutput,
  PutConsoleAuthorizationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutConsoleAuthorizationConfigurationInput,
  output: PutConsoleAuthorizationConfigurationOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsError,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutConsoleAuthorizationConfiguration",
}));

export type PutResourcePermissionStatementError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | TooManyRequestsError
  | ValidationException
  | CommonErrors;
/**
 * Create a permission statement in the account's SignIn resource-based policy
 */
export const putResourcePermissionStatement: API.OperationMethod<
  PutResourcePermissionStatementInput,
  PutResourcePermissionStatementOutput,
  PutResourcePermissionStatementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutResourcePermissionStatementInput,
  output: PutResourcePermissionStatementOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    TooManyRequestsError,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourcePermissionStatement",
}));
