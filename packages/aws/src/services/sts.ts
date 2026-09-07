import * as HttpClient from "effect/unstable/http/HttpClient";
import * as redacted from "effect/Redacted";
import * as S from "@distilled.cloud/core/schema";
import * as API from "@distilled.cloud/core/api";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials as Creds } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { SensitiveString } from "../sensitive.ts";
const ns = T.XmlNamespace("https://sts.amazonaws.com/doc/2011-06-15/");
const svc = T.AwsApiService({
  sdkId: "STS",
  serviceShapeName: "AWSSecurityTokenServiceV20110615",
});
const auth = T.AwsAuthSigv4({ name: "sts" });
const ver = T.ServiceVersion("2011-06-15");
const proto = T.AwsProtocolsAwsQuery();
const rules = T.EndpointResolver((p, _) => {
  const {
    Region,
    UseDualStack = false,
    UseFIPS = false,
    Endpoint,
    UseGlobalEndpoint = false,
  } = p;
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
      { name: "sigv4", signingName: "sts", signingRegion: "us-east-1" },
    ],
  });
  {
    const PartitionResult = _.partition(Region);
    if (
      UseGlobalEndpoint === true &&
      !(Endpoint != null) &&
      Region != null &&
      PartitionResult != null &&
      PartitionResult !== false &&
      UseFIPS === false &&
      UseDualStack === false
    ) {
      if (Region === "ap-northeast-1") {
        return e("https://sts.amazonaws.com", _p0(), {});
      }
      if (Region === "ap-south-1") {
        return e("https://sts.amazonaws.com", _p0(), {});
      }
      if (Region === "ap-southeast-1") {
        return e("https://sts.amazonaws.com", _p0(), {});
      }
      if (Region === "ap-southeast-2") {
        return e("https://sts.amazonaws.com", _p0(), {});
      }
      if (Region === "aws-global") {
        return e("https://sts.amazonaws.com", _p0(), {});
      }
      if (Region === "ca-central-1") {
        return e("https://sts.amazonaws.com", _p0(), {});
      }
      if (Region === "eu-central-1") {
        return e("https://sts.amazonaws.com", _p0(), {});
      }
      if (Region === "eu-north-1") {
        return e("https://sts.amazonaws.com", _p0(), {});
      }
      if (Region === "eu-west-1") {
        return e("https://sts.amazonaws.com", _p0(), {});
      }
      if (Region === "eu-west-2") {
        return e("https://sts.amazonaws.com", _p0(), {});
      }
      if (Region === "eu-west-3") {
        return e("https://sts.amazonaws.com", _p0(), {});
      }
      if (Region === "sa-east-1") {
        return e("https://sts.amazonaws.com", _p0(), {});
      }
      if (Region === "us-east-1") {
        return e("https://sts.amazonaws.com", _p0(), {});
      }
      if (Region === "us-east-2") {
        return e("https://sts.amazonaws.com", _p0(), {});
      }
      if (Region === "us-west-1") {
        return e("https://sts.amazonaws.com", _p0(), {});
      }
      if (Region === "us-west-2") {
        return e("https://sts.amazonaws.com", _p0(), {});
      }
      return e(
        `https://sts.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        {
          authSchemes: [
            { name: "sigv4", signingName: "sts", signingRegion: `${Region}` },
          ],
        },
        {},
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
        if (UseFIPS === true && UseDualStack === true) {
          if (
            true === _.getAttr(PartitionResult, "supportsFIPS") &&
            true === _.getAttr(PartitionResult, "supportsDualStack")
          ) {
            return e(
              `https://sts-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
              return e(`https://sts.${Region}.amazonaws.com`);
            }
            return e(
              `https://sts-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://sts.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        if (Region === "aws-global") {
          return e("https://sts.amazonaws.com", _p0(), {});
        }
        return e(
          `https://sts.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class ExpiredTokenException
  extends /*@__PURE__*/ S.TaggedError<ExpiredTokenException>()(
    "ExpiredTokenException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "ExpiredTokenException", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ExpiredTradeInTokenException
  extends /*@__PURE__*/ S.TaggedError<ExpiredTradeInTokenException>()(
    "ExpiredTradeInTokenException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ExpiredTradeInTokenException",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class IDPCommunicationErrorException
  extends /*@__PURE__*/ S.TaggedError<IDPCommunicationErrorException>()(
    "IDPCommunicationErrorException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "IDPCommunicationError", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class IDPRejectedClaimException
  extends /*@__PURE__*/ S.TaggedError<IDPRejectedClaimException>()(
    "IDPRejectedClaimException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "IDPRejectedClaim", httpResponseCode: 403 }),
      T.HttpError(403),
    ),
  ).pipe(C.withAuthError) {}
export class InvalidAuthorizationMessageException
  extends /*@__PURE__*/ S.TaggedError<InvalidAuthorizationMessageException>()(
    "InvalidAuthorizationMessageException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidAuthorizationMessageException",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidIdentityTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidIdentityTokenException>()(
    "InvalidIdentityTokenException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidIdentityToken", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class JWTPayloadSizeExceededException
  extends /*@__PURE__*/ S.TaggedError<JWTPayloadSizeExceededException>()(
    "JWTPayloadSizeExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "JWTPayloadSizeExceededException",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class MalformedPolicyDocumentException
  extends /*@__PURE__*/ S.TaggedError<MalformedPolicyDocumentException>()(
    "MalformedPolicyDocumentException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "MalformedPolicyDocument",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class OutboundWebIdentityFederationDisabledException
  extends /*@__PURE__*/ S.TaggedError<OutboundWebIdentityFederationDisabledException>()(
    "OutboundWebIdentityFederationDisabledException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "OutboundWebIdentityFederationDisabledException",
        httpResponseCode: 403,
      }),
      T.HttpError(403),
    ),
  ).pipe(C.withAuthError) {}
export class PackedPolicyTooLargeException
  extends /*@__PURE__*/ S.TaggedError<PackedPolicyTooLargeException>()(
    "PackedPolicyTooLargeException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "PackedPolicyTooLarge", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class RegionDisabledException
  extends /*@__PURE__*/ S.TaggedError<RegionDisabledException>()(
    "RegionDisabledException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "RegionDisabledException",
        httpResponseCode: 403,
      }),
      T.HttpError(403),
    ),
  ).pipe(C.withAuthError) {}
export class SessionDurationEscalationException
  extends /*@__PURE__*/ S.TaggedError<SessionDurationEscalationException>()(
    "SessionDurationEscalationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "SessionDurationEscalationException",
        httpResponseCode: 403,
      }),
      T.HttpError(403),
    ),
  ).pipe(C.withAuthError) {}
export type ArnType = string;
export type RoleSessionNameType = string;
export interface PolicyDescriptorType {
  arn?: string;
}
export const PolicyDescriptorType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.optional(S.String) }),
).annotate({
  identifier: "PolicyDescriptorType",
}) as any as S.Schema<PolicyDescriptorType>;
export type PolicyDescriptorListType = PolicyDescriptorType[];
export const PolicyDescriptorListType =
  /*@__PURE__*/ S.Array(PolicyDescriptorType);
export type UnrestrictedSessionPolicyDocumentType = string;
export type RoleDurationSecondsType = number;
export type TagKeyType = string;
export type TagValueType = string;
export interface Tag {
  Key: string;
  Value: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.String, Value: S.String }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagListType = Tag[];
export const TagListType = /*@__PURE__*/ S.Array(Tag);
export type TagKeyListType = string[];
export const TagKeyListType = /*@__PURE__*/ S.Array(S.String);
export type ExternalIdType = string;
export type SerialNumberType = string;
export type TokenCodeType = string;
export type SourceIdentityType = string;
export type ContextAssertionType = string;
export interface ProvidedContext {
  ProviderArn?: string;
  ContextAssertion?: string;
}
export const ProvidedContext = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProviderArn: S.optional(S.String),
    ContextAssertion: S.optional(S.String),
  }),
).annotate({
  identifier: "ProvidedContext",
}) as any as S.Schema<ProvidedContext>;
export type ProvidedContextsListType = ProvidedContext[];
export const ProvidedContextsListType = /*@__PURE__*/ S.Array(ProvidedContext);
export interface AssumeRoleRequest {
  RoleArn: string;
  RoleSessionName: string;
  PolicyArns?: PolicyDescriptorType[];
  Policy?: string;
  DurationSeconds?: number;
  Tags?: Tag[];
  TransitiveTagKeys?: string[];
  ExternalId?: string;
  SerialNumber?: string;
  TokenCode?: string;
  SourceIdentity?: string;
  ProvidedContexts?: ProvidedContext[];
}
export const AssumeRoleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RoleArn: S.String,
    RoleSessionName: S.String,
    PolicyArns: S.optional(PolicyDescriptorListType),
    Policy: S.optional(S.String),
    DurationSeconds: S.optional(S.Number),
    Tags: S.optional(TagListType),
    TransitiveTagKeys: S.optional(TagKeyListType),
    ExternalId: S.optional(S.String),
    SerialNumber: S.optional(S.String),
    TokenCode: S.optional(S.String),
    SourceIdentity: S.optional(S.String),
    ProvidedContexts: S.optional(ProvidedContextsListType),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssumeRoleRequest",
}) as any as S.Schema<AssumeRoleRequest>;
export type AccessKeyIdType = string;
export type AccessKeySecretType = string | redacted.Redacted<string>;
export type TokenType = string;
export interface Credentials {
  AccessKeyId: string;
  SecretAccessKey: string | redacted.Redacted<string>;
  SessionToken: string;
  Expiration: Date;
}
export const Credentials = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccessKeyId: S.String,
    SecretAccessKey: SensitiveString,
    SessionToken: S.String,
    Expiration: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({ identifier: "Credentials" }) as any as S.Schema<Credentials>;
export type AssumedRoleIdType = string;
export interface AssumedRoleUser {
  AssumedRoleId: string;
  Arn: string;
}
export const AssumedRoleUser = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AssumedRoleId: S.String, Arn: S.String }),
).annotate({
  identifier: "AssumedRoleUser",
}) as any as S.Schema<AssumedRoleUser>;
export type NonNegativeIntegerType = number;
export interface AssumeRoleResponse {
  Credentials?: Credentials;
  AssumedRoleUser?: AssumedRoleUser;
  PackedPolicySize?: number;
  SourceIdentity?: string;
}
export const AssumeRoleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Credentials: S.optional(Credentials),
    AssumedRoleUser: S.optional(AssumedRoleUser),
    PackedPolicySize: S.optional(S.Number),
    SourceIdentity: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "AssumeRoleResponse",
}) as any as S.Schema<AssumeRoleResponse>;
export type SAMLAssertionType = string | redacted.Redacted<string>;
export type SessionPolicyDocumentType = string;
export interface AssumeRoleWithSAMLRequest {
  RoleArn: string;
  PrincipalArn: string;
  SAMLAssertion: string | redacted.Redacted<string>;
  PolicyArns?: PolicyDescriptorType[];
  Policy?: string;
  DurationSeconds?: number;
}
export const AssumeRoleWithSAMLRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RoleArn: S.String,
    PrincipalArn: S.String,
    SAMLAssertion: SensitiveString,
    PolicyArns: S.optional(PolicyDescriptorListType),
    Policy: S.optional(S.String),
    DurationSeconds: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssumeRoleWithSAMLRequest",
}) as any as S.Schema<AssumeRoleWithSAMLRequest>;
export type Subject = string;
export type SubjectType = string;
export type Issuer = string;
export type Audience = string;
export type NameQualifier = string;
export interface AssumeRoleWithSAMLResponse {
  Credentials?: Credentials;
  AssumedRoleUser?: AssumedRoleUser;
  PackedPolicySize?: number;
  Subject?: string;
  SubjectType?: string;
  Issuer?: string;
  Audience?: string;
  NameQualifier?: string;
  SourceIdentity?: string;
}
export const AssumeRoleWithSAMLResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Credentials: S.optional(Credentials),
    AssumedRoleUser: S.optional(AssumedRoleUser),
    PackedPolicySize: S.optional(S.Number),
    Subject: S.optional(S.String),
    SubjectType: S.optional(S.String),
    Issuer: S.optional(S.String),
    Audience: S.optional(S.String),
    NameQualifier: S.optional(S.String),
    SourceIdentity: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "AssumeRoleWithSAMLResponse",
}) as any as S.Schema<AssumeRoleWithSAMLResponse>;
export type ClientTokenType = string | redacted.Redacted<string>;
export type UrlType = string;
export interface AssumeRoleWithWebIdentityRequest {
  RoleArn: string;
  RoleSessionName: string;
  WebIdentityToken: string | redacted.Redacted<string>;
  ProviderId?: string;
  PolicyArns?: PolicyDescriptorType[];
  Policy?: string;
  DurationSeconds?: number;
}
export const AssumeRoleWithWebIdentityRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RoleArn: S.String,
    RoleSessionName: S.String,
    WebIdentityToken: SensitiveString,
    ProviderId: S.optional(S.String),
    PolicyArns: S.optional(PolicyDescriptorListType),
    Policy: S.optional(S.String),
    DurationSeconds: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssumeRoleWithWebIdentityRequest",
}) as any as S.Schema<AssumeRoleWithWebIdentityRequest>;
export type WebIdentitySubjectType = string;
export interface AssumeRoleWithWebIdentityResponse {
  Credentials?: Credentials;
  SubjectFromWebIdentityToken?: string;
  AssumedRoleUser?: AssumedRoleUser;
  PackedPolicySize?: number;
  Provider?: string;
  Audience?: string;
  SourceIdentity?: string;
}
export const AssumeRoleWithWebIdentityResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Credentials: S.optional(Credentials),
    SubjectFromWebIdentityToken: S.optional(S.String),
    AssumedRoleUser: S.optional(AssumedRoleUser),
    PackedPolicySize: S.optional(S.Number),
    Provider: S.optional(S.String),
    Audience: S.optional(S.String),
    SourceIdentity: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "AssumeRoleWithWebIdentityResponse",
}) as any as S.Schema<AssumeRoleWithWebIdentityResponse>;
export type TargetPrincipalType = string;
export type RootDurationSecondsType = number;
export interface AssumeRootRequest {
  TargetPrincipal: string;
  TaskPolicyArn: PolicyDescriptorType;
  DurationSeconds?: number;
}
export const AssumeRootRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TargetPrincipal: S.String,
    TaskPolicyArn: PolicyDescriptorType,
    DurationSeconds: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssumeRootRequest",
}) as any as S.Schema<AssumeRootRequest>;
export interface AssumeRootResponse {
  Credentials?: Credentials;
  SourceIdentity?: string;
}
export const AssumeRootResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Credentials: S.optional(Credentials),
    SourceIdentity: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "AssumeRootResponse",
}) as any as S.Schema<AssumeRootResponse>;
export type EncodedMessageType = string;
export interface DecodeAuthorizationMessageRequest {
  EncodedMessage: string;
}
export const DecodeAuthorizationMessageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EncodedMessage: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DecodeAuthorizationMessageRequest",
}) as any as S.Schema<DecodeAuthorizationMessageRequest>;
export type DecodedMessageType = string;
export interface DecodeAuthorizationMessageResponse {
  DecodedMessage?: string;
}
export const DecodeAuthorizationMessageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DecodedMessage: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "DecodeAuthorizationMessageResponse",
}) as any as S.Schema<DecodeAuthorizationMessageResponse>;
export interface GetAccessKeyInfoRequest {
  AccessKeyId: string;
}
export const GetAccessKeyInfoRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccessKeyId: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAccessKeyInfoRequest",
}) as any as S.Schema<GetAccessKeyInfoRequest>;
export type AccountType = string;
export interface GetAccessKeyInfoResponse {
  Account?: string;
}
export const GetAccessKeyInfoResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Account: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "GetAccessKeyInfoResponse",
}) as any as S.Schema<GetAccessKeyInfoResponse>;
export interface GetCallerIdentityRequest {}
export const GetCallerIdentityRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCallerIdentityRequest",
}) as any as S.Schema<GetCallerIdentityRequest>;
export type UserIdType = string;
export interface GetCallerIdentityResponse {
  UserId?: string;
  Account?: string;
  Arn?: string;
}
export const GetCallerIdentityResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserId: S.optional(S.String),
    Account: S.optional(S.String),
    Arn: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetCallerIdentityResponse",
}) as any as S.Schema<GetCallerIdentityResponse>;
export type TradeInTokenType = string | redacted.Redacted<string>;
export interface GetDelegatedAccessTokenRequest {
  TradeInToken: string | redacted.Redacted<string>;
}
export const GetDelegatedAccessTokenRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TradeInToken: SensitiveString }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDelegatedAccessTokenRequest",
}) as any as S.Schema<GetDelegatedAccessTokenRequest>;
export interface GetDelegatedAccessTokenResponse {
  Credentials?: Credentials;
  PackedPolicySize?: number;
  AssumedPrincipal?: string;
}
export const GetDelegatedAccessTokenResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Credentials: S.optional(Credentials),
    PackedPolicySize: S.optional(S.Number),
    AssumedPrincipal: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetDelegatedAccessTokenResponse",
}) as any as S.Schema<GetDelegatedAccessTokenResponse>;
export type UserNameType = string;
export type DurationSecondsType = number;
export interface GetFederationTokenRequest {
  Name: string;
  Policy?: string;
  PolicyArns?: PolicyDescriptorType[];
  DurationSeconds?: number;
  Tags?: Tag[];
}
export const GetFederationTokenRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Policy: S.optional(S.String),
    PolicyArns: S.optional(PolicyDescriptorListType),
    DurationSeconds: S.optional(S.Number),
    Tags: S.optional(TagListType),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetFederationTokenRequest",
}) as any as S.Schema<GetFederationTokenRequest>;
export type FederatedIdType = string;
export interface FederatedUser {
  FederatedUserId: string;
  Arn: string;
}
export const FederatedUser = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FederatedUserId: S.String, Arn: S.String }),
).annotate({ identifier: "FederatedUser" }) as any as S.Schema<FederatedUser>;
export interface GetFederationTokenResponse {
  Credentials?: Credentials;
  FederatedUser?: FederatedUser;
  PackedPolicySize?: number;
}
export const GetFederationTokenResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Credentials: S.optional(Credentials),
    FederatedUser: S.optional(FederatedUser),
    PackedPolicySize: S.optional(S.Number),
  }).pipe(ns),
).annotate({
  identifier: "GetFederationTokenResponse",
}) as any as S.Schema<GetFederationTokenResponse>;
export interface GetSessionTokenRequest {
  DurationSeconds?: number;
  SerialNumber?: string;
  TokenCode?: string;
}
export const GetSessionTokenRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DurationSeconds: S.optional(S.Number),
    SerialNumber: S.optional(S.String),
    TokenCode: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSessionTokenRequest",
}) as any as S.Schema<GetSessionTokenRequest>;
export interface GetSessionTokenResponse {
  Credentials?: Credentials;
}
export const GetSessionTokenResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Credentials: S.optional(Credentials) }).pipe(ns),
).annotate({
  identifier: "GetSessionTokenResponse",
}) as any as S.Schema<GetSessionTokenResponse>;
export type WebIdentityTokenAudienceStringType = string;
export type WebIdentityTokenAudienceListType = string[];
export const WebIdentityTokenAudienceListType = /*@__PURE__*/ S.Array(S.String);
export type WebIdentityTokenDurationSecondsType = number;
export type JwtAlgorithmType = string;
export interface GetWebIdentityTokenRequest {
  Audience: string[];
  DurationSeconds?: number;
  SigningAlgorithm: string;
  Tags?: Tag[];
}
export const GetWebIdentityTokenRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Audience: WebIdentityTokenAudienceListType,
    DurationSeconds: S.optional(S.Number),
    SigningAlgorithm: S.String,
    Tags: S.optional(TagListType),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetWebIdentityTokenRequest",
}) as any as S.Schema<GetWebIdentityTokenRequest>;
export type WebIdentityTokenType = string | redacted.Redacted<string>;
export interface GetWebIdentityTokenResponse {
  WebIdentityToken?: string | redacted.Redacted<string>;
  Expiration?: Date;
}
export const GetWebIdentityTokenResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WebIdentityToken: S.optional(SensitiveString),
    Expiration: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }).pipe(ns),
).annotate({
  identifier: "GetWebIdentityTokenResponse",
}) as any as S.Schema<GetWebIdentityTokenResponse>;
export type ExpiredIdentityTokenMessage = string;
export type MalformedPolicyDocumentMessage = string;
export type PackedPolicyTooLargeMessage = string;
export type RegionDisabledMessage = string;
export type IdpRejectedClaimMessage = string;
export type InvalidIdentityTokenMessage = string;
export type IdpCommunicationErrorMessage = string;
export type InvalidAuthorizationMessage = string;
export type ExpiredTradeInTokenExceptionMessage = string;
export type JWTPayloadSizeExceededException2 = string;
export type OutboundWebIdentityFederationDisabledException2 = string;
export type SessionDurationEscalationException2 = string;
export type AssumeRoleError =
  | ExpiredTokenException
  | MalformedPolicyDocumentException
  | PackedPolicyTooLargeException
  | RegionDisabledException
  | CommonErrors;
/**
 * Returns a set of temporary security credentials that you can use to access Amazon Web Services
 * resources. These temporary credentials consist of an access key ID, a secret access key,
 * and a security token. Typically, you use `AssumeRole` within your account or for
 * cross-account access. For a comparison of `AssumeRole` with other API operations
 * that produce temporary credentials, see Requesting Temporary Security
 * Credentials and Compare STS
 * credentials in the *IAM User Guide*.
 *
 * **Permissions**
 *
 * The temporary security credentials created by `AssumeRole` can be used to
 * make API calls to any Amazon Web Services service with the following exception: You cannot call the
 * Amazon Web Services STS `GetFederationToken` or `GetSessionToken` API
 * operations.
 *
 * (Optional) You can pass inline or managed session policies to this operation. You can
 * pass a single JSON policy document to use as an inline session policy. You can also specify
 * up to 10 managed policy Amazon Resource Names (ARNs) to use as managed session policies.
 * The plaintext that you use for both inline and managed session policies can't exceed 2,048
 * characters. Passing policies to this operation returns new
 * temporary credentials. The resulting session's permissions are the intersection of the
 * role's identity-based policy and the session policies. You can use the role's temporary
 * credentials in subsequent Amazon Web Services API calls to access resources in the account that owns
 * the role. You cannot use session policies to grant more permissions than those allowed
 * by the identity-based policy of the role that is being assumed. For more information, see
 * Session
 * Policies in the *IAM User Guide*.
 *
 * When you create a role, you create two policies: a role trust policy that specifies
 * *who* can assume the role, and a permissions policy that specifies
 * *what* can be done with the role. You specify the trusted principal
 * that is allowed to assume the role in the role trust policy.
 *
 * To assume a role from a different account, your Amazon Web Services account must be trusted by the
 * role. The trust relationship is defined in the role's trust policy when the role is
 * created. That trust policy states which accounts are allowed to delegate that access to
 * users in the account.
 *
 * A user who wants to access a role in a different account must also have permissions that
 * are delegated from the account administrator. The administrator must attach a policy that
 * allows the user to call `AssumeRole` for the ARN of the role in the other
 * account.
 *
 * To allow a user to assume a role in the same account, you can do either of the
 * following:
 *
 * - Attach a policy to the user that allows the user to call `AssumeRole`
 * (as long as the role's trust policy trusts the account).
 *
 * - Add the user as a principal directly in the role's trust policy.
 *
 * You can do either because the role’s trust policy acts as an IAM resource-based
 * policy. When a resource-based policy grants access to a principal in the same account, no
 * additional identity-based policy is required. For more information about trust policies and
 * resource-based policies, see IAM Policies in the
 * *IAM User Guide*.
 *
 * **Tags**
 *
 * (Optional) You can pass tag key-value pairs to your session. These tags are called
 * session tags. For more information about session tags, see Passing Session Tags in STS in the
 * *IAM User Guide*.
 *
 * An administrator must grant you the permissions necessary to pass session tags. The
 * administrator can also create granular permissions to allow you to pass only specific
 * session tags. For more information, see Tutorial: Using Tags
 * for Attribute-Based Access Control in the
 * *IAM User Guide*.
 *
 * You can set the session tags as transitive. Transitive tags persist during role
 * chaining. For more information, see Chaining Roles
 * with Session Tags in the *IAM User Guide*.
 *
 * **Using MFA with AssumeRole**
 *
 * (Optional) You can include multi-factor authentication (MFA) information when you call
 * `AssumeRole`. This is useful for cross-account scenarios to ensure that the
 * user that assumes the role has been authenticated with an Amazon Web Services MFA device. In that
 * scenario, the trust policy of the role being assumed includes a condition that tests for
 * MFA authentication. If the caller does not include valid MFA information, the request to
 * assume the role is denied. The condition in a trust policy that tests for MFA
 * authentication might look like the following example.
 *
 * `"Condition": {"Bool": {"aws:MultiFactorAuthPresent": true}}`
 *
 * For more information, see Configuring MFA-Protected API Access
 * in the *IAM User Guide* guide.
 *
 * To use MFA with `AssumeRole`, you pass values for the
 * `SerialNumber` and `TokenCode` parameters. The
 * `SerialNumber` value identifies the user's hardware or virtual MFA device.
 * The `TokenCode` is the time-based one-time password (TOTP) that the MFA device
 * produces.
 */
export const assumeRole: API.OperationMethod<
  AssumeRoleRequest,
  AssumeRoleResponse,
  AssumeRoleError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssumeRoleRequest,
  output: AssumeRoleResponse,
  errors: [
    ExpiredTokenException,
    MalformedPolicyDocumentException,
    PackedPolicyTooLargeException,
    RegionDisabledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssumeRole",
}));

export type AssumeRoleWithSAMLError =
  | ExpiredTokenException
  | IDPRejectedClaimException
  | InvalidIdentityTokenException
  | MalformedPolicyDocumentException
  | PackedPolicyTooLargeException
  | RegionDisabledException
  | CommonErrors;
/**
 * Returns a set of temporary security credentials for users who have been authenticated
 * via a SAML authentication response. This operation provides a mechanism for tying an
 * enterprise identity store or directory to role-based Amazon Web Services access without user-specific
 * credentials or configuration. For a comparison of `AssumeRoleWithSAML` with the
 * other API operations that produce temporary credentials, see Requesting Temporary Security
 * Credentials and Compare STS
 * credentials in the *IAM User Guide*.
 *
 * The temporary security credentials returned by this operation consist of an access key
 * ID, a secret access key, and a security token. Applications can use these temporary
 * security credentials to sign calls to Amazon Web Services services.
 *
 * AssumeRoleWithSAML will not work on IAM Identity Center managed roles. These roles' names start
 * with `AWSReservedSSO_`.
 *
 * **Session Duration**
 *
 * By default, the temporary security credentials created by
 * `AssumeRoleWithSAML` last for one hour. However, you can use the optional
 * `DurationSeconds` parameter to specify the duration of your session. Your
 * role session lasts for the duration that you specify, or until the time specified in the
 * SAML authentication response's `SessionNotOnOrAfter` value, whichever is
 * shorter. You can provide a `DurationSeconds` value from 900 seconds (15 minutes)
 * up to the maximum session duration setting for the role. This setting can have a value from
 * 1 hour to 12 hours. To learn how to view the maximum value for your role, see View the
 * Maximum Session Duration Setting for a Role in the
 * *IAM User Guide*. The maximum session duration limit applies when
 * you use the `AssumeRole*` API operations or the `assume-role*` CLI
 * commands. However the limit does not apply when you use those operations to create a
 * console URL. For more information, see Using IAM Roles in the
 * *IAM User Guide*.
 *
 * Role chaining limits your CLI or Amazon Web Services API role
 * session to a maximum of one hour. When you use the `AssumeRole` API operation
 * to assume a role, you can specify the duration of your role session with the
 * `DurationSeconds` parameter. You can specify a parameter value of up to
 * 43200 seconds (12 hours), depending on the maximum session duration setting for your
 * role. However, if you assume a role using role chaining and provide a
 * `DurationSeconds` parameter value greater than one hour, the operation
 * fails.
 *
 * **Permissions**
 *
 * The temporary security credentials created by `AssumeRoleWithSAML` can be
 * used to make API calls to any Amazon Web Services service with the following exception: you cannot call
 * the STS `GetFederationToken` or `GetSessionToken` API
 * operations.
 *
 * (Optional) You can pass inline or managed session policies to
 * this operation. You can pass a single JSON policy document to use as an inline session
 * policy. You can also specify up to 10 managed policy Amazon Resource Names (ARNs) to use as
 * managed session policies. The plaintext that you use for both inline and managed session
 * policies can't exceed 2,048 characters. Passing policies to this operation returns new
 * temporary credentials. The resulting session's permissions are the intersection of the
 * role's identity-based policy and the session policies. You can use the role's temporary
 * credentials in subsequent Amazon Web Services API calls to access resources in the account that owns
 * the role. You cannot use session policies to grant more permissions than those allowed
 * by the identity-based policy of the role that is being assumed. For more information, see
 * Session
 * Policies in the *IAM User Guide*.
 *
 * Calling `AssumeRoleWithSAML` does not require the use of Amazon Web Services security
 * credentials. The identity of the caller is validated by using keys in the metadata document
 * that is uploaded for the SAML provider entity for your identity provider.
 *
 * Calling `AssumeRoleWithSAML` can result in an entry in your CloudTrail logs.
 * The entry includes the value in the `NameID` element of the SAML assertion.
 * We recommend that you use a `NameIDType` that is not associated with any
 * personally identifiable information (PII). For example, you could instead use the
 * persistent identifier
 * (`urn:oasis:names:tc:SAML:2.0:nameid-format:persistent`).
 *
 * **Tags**
 *
 * (Optional) You can configure your IdP to pass attributes into your SAML assertion as
 * session tags. Each session tag consists of a key name and an associated value. For more
 * information about session tags, see Passing Session Tags in STS in the
 * *IAM User Guide*.
 *
 * You can pass up to 50 session tags. The plaintext session tag keys can’t exceed 128
 * characters and the values can’t exceed 256 characters. For these and additional limits, see
 * IAM
 * and STS Character Limits in the *IAM User Guide*.
 *
 * An Amazon Web Services conversion compresses the passed inline session policy, managed policy ARNs,
 * and session tags into a packed binary format that has a separate limit. Your request can
 * fail for this limit even if your plaintext meets the other requirements. The
 * `PackedPolicySize` response element indicates by percentage how close the
 * policies and tags for your request are to the upper size limit.
 *
 * You can pass a session tag with the same key as a tag that is attached to the role. When
 * you do, session tags override the role's tags with the same key.
 *
 * An administrator must grant you the permissions necessary to pass session tags. The
 * administrator can also create granular permissions to allow you to pass only specific
 * session tags. For more information, see Tutorial: Using Tags
 * for Attribute-Based Access Control in the
 * *IAM User Guide*.
 *
 * You can set the session tags as transitive. Transitive tags persist during role
 * chaining. For more information, see Chaining Roles
 * with Session Tags in the *IAM User Guide*.
 *
 * **SAML Configuration**
 *
 * Before your application can call `AssumeRoleWithSAML`, you must configure
 * your SAML identity provider (IdP) to issue the claims required by Amazon Web Services. Additionally, you
 * must use Identity and Access Management (IAM) to create a SAML provider entity in your Amazon Web Services account that
 * represents your identity provider. You must also create an IAM role that specifies this
 * SAML provider in its trust policy.
 *
 * For more information, see the following resources:
 *
 * - About
 * SAML 2.0-based Federation in the *IAM User Guide*.
 *
 * - Creating SAML Identity Providers in the
 * *IAM User Guide*.
 *
 * - Configuring
 * a Relying Party and Claims in the *IAM User Guide*.
 *
 * - Creating a Role for SAML 2.0 Federation in the
 * *IAM User Guide*.
 */
export const assumeRoleWithSAML: API.OperationMethod<
  AssumeRoleWithSAMLRequest,
  AssumeRoleWithSAMLResponse,
  AssumeRoleWithSAMLError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssumeRoleWithSAMLRequest,
  output: AssumeRoleWithSAMLResponse,
  errors: [
    ExpiredTokenException,
    IDPRejectedClaimException,
    InvalidIdentityTokenException,
    MalformedPolicyDocumentException,
    PackedPolicyTooLargeException,
    RegionDisabledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssumeRoleWithSAML",
}));

export type AssumeRoleWithWebIdentityError =
  | ExpiredTokenException
  | IDPCommunicationErrorException
  | IDPRejectedClaimException
  | InvalidIdentityTokenException
  | MalformedPolicyDocumentException
  | PackedPolicyTooLargeException
  | RegionDisabledException
  | CommonErrors;
/**
 * Returns a set of temporary security credentials for users who have been authenticated in
 * a mobile or web application with a web identity provider. Example providers include the
 * OAuth 2.0 providers Login with Amazon and Facebook, or any OpenID Connect-compatible
 * identity provider such as Google or Amazon Cognito federated identities.
 *
 * For mobile applications, we recommend that you use Amazon Cognito. You can use Amazon Cognito with the
 * Amazon Web Services SDK for iOS Developer Guide and the Amazon Web Services SDK for Android Developer Guide to uniquely
 * identify a user. You can also supply the user with a consistent identity throughout the
 * lifetime of an application.
 *
 * To learn more about Amazon Cognito, see Amazon Cognito identity
 * pools in *Amazon Cognito Developer Guide*.
 *
 * Calling `AssumeRoleWithWebIdentity` does not require the use of Amazon Web Services
 * security credentials. Therefore, you can distribute an application (for example, on mobile
 * devices) that requests temporary security credentials without including long-term Amazon Web Services
 * credentials in the application. You also don't need to deploy server-based proxy services
 * that use long-term Amazon Web Services credentials. Instead, the identity of the caller is validated by
 * using a token from the web identity provider. For a comparison of
 * `AssumeRoleWithWebIdentity` with the other API operations that produce
 * temporary credentials, see Requesting Temporary Security
 * Credentials and Compare STS
 * credentials in the *IAM User Guide*.
 *
 * The temporary security credentials returned by this API consist of an access key ID, a
 * secret access key, and a security token. Applications can use these temporary security
 * credentials to sign calls to Amazon Web Services service API operations.
 *
 * **Session Duration**
 *
 * By default, the temporary security credentials created by
 * `AssumeRoleWithWebIdentity` last for one hour. However, you can use the
 * optional `DurationSeconds` parameter to specify the duration of your session.
 * You can provide a value from 900 seconds (15 minutes) up to the maximum session duration
 * setting for the role. This setting can have a value from 1 hour to 12 hours. To learn how
 * to view the maximum value for your role, see Update the maximum session duration for a role in the
 * *IAM User Guide*. The maximum session duration limit applies when
 * you use the `AssumeRole*` API operations or the `assume-role*` CLI
 * commands. However the limit does not apply when you use those operations to create a
 * console URL. For more information, see Using IAM Roles in the
 * *IAM User Guide*.
 *
 * **Permissions**
 *
 * The temporary security credentials created by `AssumeRoleWithWebIdentity` can
 * be used to make API calls to any Amazon Web Services service with the following exception: you cannot
 * call the STS `GetFederationToken` or `GetSessionToken` API
 * operations.
 *
 * (Optional) You can pass inline or managed session policies to
 * this operation. You can pass a single JSON policy document to use as an inline session
 * policy. You can also specify up to 10 managed policy Amazon Resource Names (ARNs) to use as
 * managed session policies. The plaintext that you use for both inline and managed session
 * policies can't exceed 2,048 characters. Passing policies to this operation returns new
 * temporary credentials. The resulting session's permissions are the intersection of the
 * role's identity-based policy and the session policies. You can use the role's temporary
 * credentials in subsequent Amazon Web Services API calls to access resources in the account that owns
 * the role. You cannot use session policies to grant more permissions than those allowed
 * by the identity-based policy of the role that is being assumed. For more information, see
 * Session
 * Policies in the *IAM User Guide*.
 *
 * **Tags**
 *
 * (Optional) You can configure your IdP to pass attributes into your web identity token as
 * session tags. Each session tag consists of a key name and an associated value. For more
 * information about session tags, see Passing
 * session tags using AssumeRoleWithWebIdentity in the
 * *IAM User Guide*.
 *
 * You can pass up to 50 session tags. The plaintext session tag keys can’t exceed 128
 * characters and the values can’t exceed 256 characters. For these and additional limits, see
 * IAM
 * and STS Character Limits in the *IAM User Guide*.
 *
 * An Amazon Web Services conversion compresses the passed inline session policy, managed policy ARNs,
 * and session tags into a packed binary format that has a separate limit. Your request can
 * fail for this limit even if your plaintext meets the other requirements. The
 * `PackedPolicySize` response element indicates by percentage how close the
 * policies and tags for your request are to the upper size limit.
 *
 * You can pass a session tag with the same key as a tag that is attached to the role. When
 * you do, the session tag overrides the role tag with the same key.
 *
 * An administrator must grant you the permissions necessary to pass session tags. The
 * administrator can also create granular permissions to allow you to pass only specific
 * session tags. For more information, see Tutorial: Using Tags
 * for Attribute-Based Access Control in the
 * *IAM User Guide*.
 *
 * You can set the session tags as transitive. Transitive tags persist during role
 * chaining. For more information, see Chaining Roles
 * with Session Tags in the *IAM User Guide*.
 *
 * **Identities**
 *
 * Before your application can call `AssumeRoleWithWebIdentity`, you must have
 * an identity token from a supported identity provider and create a role that the application
 * can assume. The role that your application assumes must trust the identity provider that is
 * associated with the identity token. In other words, the identity provider must be specified
 * in the role's trust policy.
 *
 * Calling `AssumeRoleWithWebIdentity` can result in an entry in your
 * CloudTrail logs. The entry includes the Subject of
 * the provided web identity token. We recommend that you avoid using any personally
 * identifiable information (PII) in this field. For example, you could instead use a GUID
 * or a pairwise identifier, as suggested
 * in the OIDC specification.
 *
 * For more information about how to use OIDC federation and the
 * `AssumeRoleWithWebIdentity` API, see the following resources:
 *
 * - Using Web Identity Federation API Operations for Mobile Apps and Federation Through a Web-based Identity Provider.
 *
 * - Amazon Web Services SDK for iOS Developer Guide and Amazon Web Services SDK for Android Developer Guide. These toolkits
 * contain sample apps that show how to invoke the identity providers. The toolkits then
 * show how to use the information from these providers to get and use temporary
 * security credentials.
 */
export const assumeRoleWithWebIdentity: API.OperationMethod<
  AssumeRoleWithWebIdentityRequest,
  AssumeRoleWithWebIdentityResponse,
  AssumeRoleWithWebIdentityError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssumeRoleWithWebIdentityRequest,
  output: AssumeRoleWithWebIdentityResponse,
  errors: [
    ExpiredTokenException,
    IDPCommunicationErrorException,
    IDPRejectedClaimException,
    InvalidIdentityTokenException,
    MalformedPolicyDocumentException,
    PackedPolicyTooLargeException,
    RegionDisabledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssumeRoleWithWebIdentity",
}));

export type AssumeRootError =
  | ExpiredTokenException
  | RegionDisabledException
  | CommonErrors;
/**
 * Returns a set of short term credentials you can use to perform privileged tasks on a
 * member account in your organization. You must use credentials from an Organizations management
 * account or a delegated administrator account for IAM to call `AssumeRoot`. You
 * cannot use root user credentials to make this call.
 *
 * Before you can launch a privileged session, you must have centralized root access in
 * your organization. For steps to enable this feature, see Centralize root access for
 * member accounts in the *IAM User Guide*.
 *
 * The STS global endpoint is not supported for AssumeRoot. You must send this request
 * to a Regional STS endpoint. For more information, see Endpoints.
 *
 * You can track AssumeRoot in CloudTrail logs to determine what actions were performed in a
 * session. For more information, see Track privileged tasks
 * in CloudTrail in the *IAM User Guide*.
 *
 * When granting access to privileged tasks you should only grant the necessary permissions
 * required to perform that task. For more information, see Security best practices in
 * IAM. In addition, you can use service control
 * policies (SCPs) to manage and limit permissions in your organization. See General examples in the Organizations User
 * Guide for more information on SCPs.
 */
export const assumeRoot: API.OperationMethod<
  AssumeRootRequest,
  AssumeRootResponse,
  AssumeRootError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssumeRootRequest,
  output: AssumeRootResponse,
  errors: [ExpiredTokenException, RegionDisabledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssumeRoot",
}));

export type DecodeAuthorizationMessageError =
  | InvalidAuthorizationMessageException
  | CommonErrors;
/**
 * Decodes additional information about the authorization status of a request from an
 * encoded message returned in response to an Amazon Web Services request.
 *
 * For example, if a user is not authorized to perform an operation that he or she has
 * requested, the request returns a `Client.UnauthorizedOperation` response (an
 * HTTP 403 response). Some Amazon Web Services operations additionally return an encoded message that can
 * provide details about this authorization failure.
 *
 * Only certain Amazon Web Services operations return an encoded authorization message. The
 * documentation for an individual operation indicates whether that operation returns an
 * encoded message in addition to returning an HTTP code.
 *
 * The message is encoded because the details of the authorization status can contain
 * privileged information that the user who requested the operation should not see. To decode
 * an authorization status message, a user must be granted permissions through an IAM policy to
 * request the `DecodeAuthorizationMessage`
 * (`sts:DecodeAuthorizationMessage`) action.
 *
 * The decoded message includes the following type of information:
 *
 * - Whether the request was denied due to an explicit deny or due to the absence of an
 * explicit allow. For more information, see Determining Whether a Request is Allowed or Denied in the
 * *IAM User Guide*.
 *
 * - The principal who made the request.
 *
 * - The requested action.
 *
 * - The requested resource.
 *
 * - The values of condition keys in the context of the user's request.
 */
export const decodeAuthorizationMessage: API.OperationMethod<
  DecodeAuthorizationMessageRequest,
  DecodeAuthorizationMessageResponse,
  DecodeAuthorizationMessageError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DecodeAuthorizationMessageRequest,
  output: DecodeAuthorizationMessageResponse,
  errors: [InvalidAuthorizationMessageException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DecodeAuthorizationMessage",
}));

export type GetAccessKeyInfoError = CommonErrors;
/**
 * Returns the account identifier for the specified access key ID.
 *
 * Access keys consist of two parts: an access key ID (for example,
 * `AKIAIOSFODNN7EXAMPLE`) and a secret access key (for example,
 * `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY`). For more information about
 * access keys, see Managing Access Keys for IAM
 * Users in the *IAM User Guide*.
 *
 * When you pass an access key ID to this operation, it returns the ID of the Amazon Web Services account
 * to which the keys belong. Access key IDs beginning with `AKIA` are long-term
 * credentials for an IAM user or the Amazon Web Services account root user. Access key IDs
 * beginning with `ASIA` are temporary credentials that are created using STS
 * operations. If the account in the response belongs to you, you can sign in as the root user and review your root user access keys. Then, you can pull a credentials
 * report to learn which IAM user owns the keys. To learn who
 * requested the temporary credentials for an `ASIA` access key, view the STS
 * events in your CloudTrail logs in the *IAM User Guide*.
 *
 * This operation does not indicate the state of the access key. The key might be active,
 * inactive, or deleted. Active keys might not have permissions to perform an operation.
 * Providing a deleted access key might return an error that the key doesn't exist.
 */
export const getAccessKeyInfo: API.OperationMethod<
  GetAccessKeyInfoRequest,
  GetAccessKeyInfoResponse,
  GetAccessKeyInfoError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAccessKeyInfoRequest,
  output: GetAccessKeyInfoResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessKeyInfo",
}));

export type GetCallerIdentityError = CommonErrors;
/**
 * Returns details about the IAM user or role whose credentials are used to
 * call the operation.
 *
 * No permissions are required to perform this operation. If an administrator attaches a
 * policy to your identity that explicitly denies access to the
 * `sts:GetCallerIdentity` action, you can still perform this operation.
 * Permissions are not required because the same information is returned when access is
 * denied. To view an example response, see I Am Not Authorized to Perform: iam:DeleteVirtualMFADevice in the
 * *IAM User Guide*.
 */
export const getCallerIdentity: API.OperationMethod<
  GetCallerIdentityRequest,
  GetCallerIdentityResponse,
  GetCallerIdentityError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCallerIdentityRequest,
  output: GetCallerIdentityResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCallerIdentity",
}));

export type GetDelegatedAccessTokenError =
  | ExpiredTradeInTokenException
  | PackedPolicyTooLargeException
  | RegionDisabledException
  | CommonErrors;
/**
 * Exchanges a trade-in token for temporary Amazon Web Services credentials with the permissions
 * associated with the assumed principal. This operation allows you to obtain credentials for
 * a specific principal based on a trade-in token, enabling delegation of access to Amazon Web Services
 * resources.
 */
export const getDelegatedAccessToken: API.OperationMethod<
  GetDelegatedAccessTokenRequest,
  GetDelegatedAccessTokenResponse,
  GetDelegatedAccessTokenError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDelegatedAccessTokenRequest,
  output: GetDelegatedAccessTokenResponse,
  errors: [
    ExpiredTradeInTokenException,
    PackedPolicyTooLargeException,
    RegionDisabledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDelegatedAccessToken",
}));

export type GetFederationTokenError =
  | MalformedPolicyDocumentException
  | PackedPolicyTooLargeException
  | RegionDisabledException
  | CommonErrors;
/**
 * Returns a set of temporary security credentials (consisting of an access key ID, a
 * secret access key, and a security token) for a user. A typical use is in a proxy
 * application that gets temporary security credentials on behalf of distributed applications
 * inside a corporate network.
 *
 * You must call the `GetFederationToken` operation using the long-term security
 * credentials of an IAM user. As a result, this call is appropriate in
 * contexts where those credentials can be safeguarded, usually in a server-based application.
 * For a comparison of `GetFederationToken` with the other API operations that
 * produce temporary credentials, see Requesting Temporary Security
 * Credentials and Compare STS
 * credentials in the *IAM User Guide*.
 *
 * Although it is possible to call `GetFederationToken` using the security
 * credentials of an Amazon Web Services account root user rather than an IAM user that you
 * create for the purpose of a proxy application, we do not recommend it. For more
 * information, see Safeguard your root user credentials and don't use them for everyday tasks in the
 * *IAM User Guide*.
 *
 * You can create a mobile-based or browser-based app that can authenticate users using
 * a web identity provider like Login with Amazon, Facebook, Google, or an OpenID
 * Connect-compatible identity provider. In this case, we recommend that you use Amazon Cognito or
 * `AssumeRoleWithWebIdentity`. For more information, see Federation Through a Web-based Identity Provider in the
 * *IAM User Guide*.
 *
 * **Session duration**
 *
 * The temporary credentials are valid for the specified duration, from 900 seconds (15
 * minutes) up to a maximum of 129,600 seconds (36 hours). The default session duration is
 * 43,200 seconds (12 hours). Temporary credentials obtained by using the root user
 * credentials have a maximum duration of 3,600 seconds (1 hour).
 *
 * **Permissions**
 *
 * You can use the temporary credentials created by `GetFederationToken` in any
 * Amazon Web Services service with the following exceptions:
 *
 * - You cannot call any IAM operations using the CLI or the Amazon Web Services API. This
 * limitation does not apply to console sessions.
 *
 * - You cannot call any STS operations except `GetCallerIdentity`.
 *
 * You can use temporary credentials for single sign-on (SSO) to the console.
 *
 * You must pass an inline or managed session policy to
 * this operation. You can pass a single JSON policy document to use as an inline session
 * policy. You can also specify up to 10 managed policy Amazon Resource Names (ARNs) to use as
 * managed session policies. The plaintext that you use for both inline and managed session
 * policies can't exceed 2,048 characters.
 *
 * Though the session policy parameters are optional, if you do not pass a policy, then the
 * resulting federated user session has no permissions. When you pass session policies, the
 * session permissions are the intersection of the IAM user policies and the
 * session policies that you pass. This gives you a way to further restrict the permissions
 * for a federated user. You cannot use session policies to grant more permissions than those
 * that are defined in the permissions policy of the IAM user. For more
 * information, see Session Policies in
 * the *IAM User Guide*. For information about using
 * `GetFederationToken` to create temporary security credentials, see GetFederationToken—Federation Through a Custom Identity Broker.
 *
 * You can use the credentials to access a resource that has a resource-based policy. If
 * that policy specifically references the federated user session in the
 * `Principal` element of the policy, the session has the permissions allowed by
 * the policy. These permissions are granted in addition to the permissions granted by the
 * session policies.
 *
 * **Tags**
 *
 * (Optional) You can pass tag key-value pairs to your session. These are called session
 * tags. For more information about session tags, see Passing Session Tags in STS in the
 * *IAM User Guide*.
 *
 * You can create a mobile-based or browser-based app that can authenticate users using
 * a web identity provider like Login with Amazon, Facebook, Google, or an OpenID
 * Connect-compatible identity provider. In this case, we recommend that you use Amazon Cognito or
 * `AssumeRoleWithWebIdentity`. For more information, see Federation Through a Web-based Identity Provider in the
 * *IAM User Guide*.
 *
 * An administrator must grant you the permissions necessary to pass session tags. The
 * administrator can also create granular permissions to allow you to pass only specific
 * session tags. For more information, see Tutorial: Using Tags
 * for Attribute-Based Access Control in the
 * *IAM User Guide*.
 *
 * Tag key–value pairs are not case sensitive, but case is preserved. This means that you
 * cannot have separate `Department` and `department` tag keys. Assume
 * that the user that you are federating has the
 * `Department`=`Marketing` tag and you pass the
 * `department`=`engineering` session tag. `Department`
 * and `department` are not saved as separate tags, and the session tag passed in
 * the request takes precedence over the user tag.
 */
export const getFederationToken: API.OperationMethod<
  GetFederationTokenRequest,
  GetFederationTokenResponse,
  GetFederationTokenError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetFederationTokenRequest,
  output: GetFederationTokenResponse,
  errors: [
    MalformedPolicyDocumentException,
    PackedPolicyTooLargeException,
    RegionDisabledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFederationToken",
}));

export type GetSessionTokenError = RegionDisabledException | CommonErrors;
/**
 * Returns a set of temporary credentials for an Amazon Web Services account or IAM user.
 * The credentials consist of an access key ID, a secret access key, and a security token.
 * Typically, you use `GetSessionToken` if you want to use MFA to protect
 * programmatic calls to specific Amazon Web Services API operations like Amazon EC2
 * `StopInstances`.
 *
 * MFA-enabled IAM users must call `GetSessionToken` and submit
 * an MFA code that is associated with their MFA device. Using the temporary security
 * credentials that the call returns, IAM users can then make programmatic
 * calls to API operations that require MFA authentication. An incorrect MFA code causes the
 * API to return an access denied error. For a comparison of `GetSessionToken` with
 * the other API operations that produce temporary credentials, see Requesting
 * Temporary Security Credentials and Compare STS
 * credentials in the *IAM User Guide*.
 *
 * No permissions are required for users to perform this operation. The purpose of the
 * `sts:GetSessionToken` operation is to authenticate the user using MFA. You
 * cannot use policies to control authentication operations. For more information, see
 * Permissions for GetSessionToken in the
 * *IAM User Guide*.
 *
 * **Session Duration**
 *
 * The `GetSessionToken` operation must be called by using the long-term Amazon Web Services
 * security credentials of an IAM user. Credentials that are created by IAM users are valid for the duration that you specify. This duration can range
 * from 900 seconds (15 minutes) up to a maximum of 129,600 seconds (36 hours), with a default
 * of 43,200 seconds (12 hours). Credentials based on account credentials can range from 900
 * seconds (15 minutes) up to 3,600 seconds (1 hour), with a default of 1 hour.
 *
 * **Permissions**
 *
 * The temporary security credentials created by `GetSessionToken` can be used
 * to make API calls to any Amazon Web Services service with the following exceptions:
 *
 * - You cannot call any IAM API operations unless MFA authentication information is
 * included in the request.
 *
 * - You cannot call any STS API *except*
 * `AssumeRole` or `GetCallerIdentity`.
 *
 * The credentials that `GetSessionToken` returns are based on permissions
 * associated with the IAM user whose credentials were used to call the
 * operation. The temporary credentials have the same permissions as the IAM user.
 *
 * Although it is possible to call `GetSessionToken` using the security
 * credentials of an Amazon Web Services account root user rather than an IAM user, we do
 * not recommend it. If `GetSessionToken` is called using root user
 * credentials, the temporary credentials have root user permissions. For more
 * information, see Safeguard your root user credentials and don't use them for everyday tasks in the
 * *IAM User Guide*
 *
 * For more information about using `GetSessionToken` to create temporary
 * credentials, see Temporary
 * Credentials for Users in Untrusted Environments in the
 * *IAM User Guide*.
 */
export const getSessionToken: API.OperationMethod<
  GetSessionTokenRequest,
  GetSessionTokenResponse,
  GetSessionTokenError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSessionTokenRequest,
  output: GetSessionTokenResponse,
  errors: [RegionDisabledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSessionToken",
}));

export type GetWebIdentityTokenError =
  | JWTPayloadSizeExceededException
  | OutboundWebIdentityFederationDisabledException
  | SessionDurationEscalationException
  | CommonErrors;
/**
 * Returns a signed JSON Web Token (JWT) that represents the calling Amazon Web Services identity.
 * The returned JWT can be used to authenticate with external services that support OIDC discovery.
 * The token is signed by Amazon Web Services STS and can be publicly verified using the verification keys published at the issuer's JWKS endpoint.
 */
export const getWebIdentityToken: API.OperationMethod<
  GetWebIdentityTokenRequest,
  GetWebIdentityTokenResponse,
  GetWebIdentityTokenError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetWebIdentityTokenRequest,
  output: GetWebIdentityTokenResponse,
  errors: [
    JWTPayloadSizeExceededException,
    OutboundWebIdentityFederationDisabledException,
    SessionDurationEscalationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWebIdentityToken",
}));
