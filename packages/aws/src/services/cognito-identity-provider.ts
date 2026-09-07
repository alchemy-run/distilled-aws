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
const ns = T.XmlNamespace("http://cognito-idp.amazonaws.com/doc/2016-04-18/");
const svc = T.AwsApiService({
  sdkId: "Cognito Identity Provider",
  serviceShapeName: "AWSCognitoIdentityProviderService",
});
const auth = T.AwsAuthSigv4({ name: "cognito-idp" });
const ver = T.ServiceVersion("2016-04-18");
const proto = T.AwsProtocolsAwsJson1_1();
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
            if (Region === "us-east-1") {
              return e("https://cognito-idp-fips.us-east-1.amazonaws.com");
            }
            if (Region === "us-east-2") {
              return e("https://cognito-idp-fips.us-east-2.amazonaws.com");
            }
            if (Region === "us-west-1") {
              return e("https://cognito-idp-fips.us-west-1.amazonaws.com");
            }
            if (Region === "us-west-2") {
              return e("https://cognito-idp-fips.us-west-2.amazonaws.com");
            }
            return e(
              `https://cognito-idp-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://cognito-idp-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            if ("aws" === _.getAttr(PartitionResult, "name")) {
              return e(`https://cognito-idp.${Region}.amazonaws.com`);
            }
            return e(
              `https://cognito-idp.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://cognito-idp.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class AliasExistsException
  extends /*@__PURE__*/ S.TaggedError<AliasExistsException>()(
    "AliasExistsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class CodeDeliveryFailureException
  extends /*@__PURE__*/ S.TaggedError<CodeDeliveryFailureException>()(
    "CodeDeliveryFailureException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class CodeMismatchException
  extends /*@__PURE__*/ S.TaggedError<CodeMismatchException>()(
    "CodeMismatchException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ConcurrentModificationException
  extends /*@__PURE__*/ S.TaggedError<ConcurrentModificationException>()(
    "ConcurrentModificationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class DeviceKeyExistsException
  extends /*@__PURE__*/ S.TaggedError<DeviceKeyExistsException>()(
    "DeviceKeyExistsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class DuplicateProviderException
  extends /*@__PURE__*/ S.TaggedError<DuplicateProviderException>()(
    "DuplicateProviderException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class EnableSoftwareTokenMFAException
  extends /*@__PURE__*/ S.TaggedError<EnableSoftwareTokenMFAException>()(
    "EnableSoftwareTokenMFAException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ExpiredCodeException
  extends /*@__PURE__*/ S.TaggedError<ExpiredCodeException>()(
    "ExpiredCodeException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class FeatureUnavailableInTierException
  extends /*@__PURE__*/ S.TaggedError<FeatureUnavailableInTierException>()(
    "FeatureUnavailableInTierException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ForbiddenException
  extends /*@__PURE__*/ S.TaggedError<ForbiddenException>()(
    "ForbiddenException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class GroupExistsException
  extends /*@__PURE__*/ S.TaggedError<GroupExistsException>()(
    "GroupExistsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InternalErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalErrorException>()(
    "InternalErrorException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withServerError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidEmailRoleAccessPolicyException
  extends /*@__PURE__*/ S.TaggedError<InvalidEmailRoleAccessPolicyException>()(
    "InvalidEmailRoleAccessPolicyException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidLambdaResponseException
  extends /*@__PURE__*/ S.TaggedError<InvalidLambdaResponseException>()(
    "InvalidLambdaResponseException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidOAuthFlowException
  extends /*@__PURE__*/ S.TaggedError<InvalidOAuthFlowException>()(
    "InvalidOAuthFlowException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterException>()(
    "InvalidParameterException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      reasonCode: S.optional(S.String),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidPasswordException
  extends /*@__PURE__*/ S.TaggedError<InvalidPasswordException>()(
    "InvalidPasswordException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidSmsRoleAccessPolicyException
  extends /*@__PURE__*/ S.TaggedError<InvalidSmsRoleAccessPolicyException>()(
    "InvalidSmsRoleAccessPolicyException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidSmsRoleTrustRelationshipException
  extends /*@__PURE__*/ S.TaggedError<InvalidSmsRoleTrustRelationshipException>()(
    "InvalidSmsRoleTrustRelationshipException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidUserPoolConfigurationException
  extends /*@__PURE__*/ S.TaggedError<InvalidUserPoolConfigurationException>()(
    "InvalidUserPoolConfigurationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ManagedLoginBrandingExistsException
  extends /*@__PURE__*/ S.TaggedError<ManagedLoginBrandingExistsException>()(
    "ManagedLoginBrandingExistsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class MFAMethodNotFoundException
  extends /*@__PURE__*/ S.TaggedError<MFAMethodNotFoundException>()(
    "MFAMethodNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class NotAuthorizedException
  extends /*@__PURE__*/ S.TaggedError<NotAuthorizedException>()(
    "NotAuthorizedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class OperationNotEnabledException
  extends /*@__PURE__*/ S.TaggedError<OperationNotEnabledException>()(
    "OperationNotEnabledException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class PasswordHistoryPolicyViolationException
  extends /*@__PURE__*/ S.TaggedError<PasswordHistoryPolicyViolationException>()(
    "PasswordHistoryPolicyViolationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class PasswordResetRequiredException
  extends /*@__PURE__*/ S.TaggedError<PasswordResetRequiredException>()(
    "PasswordResetRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class PreconditionNotMetException
  extends /*@__PURE__*/ S.TaggedError<PreconditionNotMetException>()(
    "PreconditionNotMetException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class RefreshTokenReuseException
  extends /*@__PURE__*/ S.TaggedError<RefreshTokenReuseException>()(
    "RefreshTokenReuseException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ScopeDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<ScopeDoesNotExistException>()(
    "ScopeDoesNotExistException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class SoftwareTokenMFANotFoundException
  extends /*@__PURE__*/ S.TaggedError<SoftwareTokenMFANotFoundException>()(
    "SoftwareTokenMFANotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TermsExistsException
  extends /*@__PURE__*/ S.TaggedError<TermsExistsException>()(
    "TermsExistsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TierChangeNotAllowedException
  extends /*@__PURE__*/ S.TaggedError<TierChangeNotAllowedException>()(
    "TierChangeNotAllowedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class TooManyFailedAttemptsException
  extends /*@__PURE__*/ S.TaggedError<TooManyFailedAttemptsException>()(
    "TooManyFailedAttemptsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
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
export class UnexpectedLambdaException
  extends /*@__PURE__*/ S.TaggedError<UnexpectedLambdaException>()(
    "UnexpectedLambdaException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class UnsupportedIdentityProviderException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedIdentityProviderException>()(
    "UnsupportedIdentityProviderException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class UnsupportedOperationException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedOperationException>()(
    "UnsupportedOperationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class UnsupportedTokenTypeException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedTokenTypeException>()(
    "UnsupportedTokenTypeException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class UnsupportedUserStateException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedUserStateException>()(
    "UnsupportedUserStateException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class UserImportInProgressException
  extends /*@__PURE__*/ S.TaggedError<UserImportInProgressException>()(
    "UserImportInProgressException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class UserLambdaValidationException
  extends /*@__PURE__*/ S.TaggedError<UserLambdaValidationException>()(
    "UserLambdaValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class UsernameExistsException
  extends /*@__PURE__*/ S.TaggedError<UsernameExistsException>()(
    "UsernameExistsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class UserNotConfirmedException
  extends /*@__PURE__*/ S.TaggedError<UserNotConfirmedException>()(
    "UserNotConfirmedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class UserNotFoundException
  extends /*@__PURE__*/ S.TaggedError<UserNotFoundException>()(
    "UserNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class UserPoolAddOnNotEnabledException
  extends /*@__PURE__*/ S.TaggedError<UserPoolAddOnNotEnabledException>()(
    "UserPoolAddOnNotEnabledException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class UserPoolTaggingException
  extends /*@__PURE__*/ S.TaggedError<UserPoolTaggingException>()(
    "UserPoolTaggingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class WebAuthnChallengeNotFoundException
  extends /*@__PURE__*/ S.TaggedError<WebAuthnChallengeNotFoundException>()(
    "WebAuthnChallengeNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class WebAuthnClientMismatchException
  extends /*@__PURE__*/ S.TaggedError<WebAuthnClientMismatchException>()(
    "WebAuthnClientMismatchException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class WebAuthnConfigurationMissingException
  extends /*@__PURE__*/ S.TaggedError<WebAuthnConfigurationMissingException>()(
    "WebAuthnConfigurationMissingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class WebAuthnCredentialNotSupportedException
  extends /*@__PURE__*/ S.TaggedError<WebAuthnCredentialNotSupportedException>()(
    "WebAuthnCredentialNotSupportedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class WebAuthnNotEnabledException
  extends /*@__PURE__*/ S.TaggedError<WebAuthnNotEnabledException>()(
    "WebAuthnNotEnabledException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class WebAuthnOriginNotAllowedException
  extends /*@__PURE__*/ S.TaggedError<WebAuthnOriginNotAllowedException>()(
    "WebAuthnOriginNotAllowedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class WebAuthnRelyingPartyMismatchException
  extends /*@__PURE__*/ S.TaggedError<WebAuthnRelyingPartyMismatchException>()(
    "WebAuthnRelyingPartyMismatchException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type UserPoolIdType = string;
export type CustomAttributeNameType = string;
export type AttributeDataType =
  | "String"
  | "Number"
  | "DateTime"
  | "Boolean"
  | (string & {});
export const AttributeDataType = /*@__PURE__*/ S.String;

export type StringType = string;
export interface NumberAttributeConstraintsType {
  MinValue?: string;
  MaxValue?: string;
}
export const NumberAttributeConstraintsType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MinValue: S.optional(S.String), MaxValue: S.optional(S.String) }),
).annotate({
  identifier: "NumberAttributeConstraintsType",
}) as any as S.Schema<NumberAttributeConstraintsType>;
export interface StringAttributeConstraintsType {
  MinLength?: string;
  MaxLength?: string;
}
export const StringAttributeConstraintsType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MinLength: S.optional(S.String),
    MaxLength: S.optional(S.String),
  }),
).annotate({
  identifier: "StringAttributeConstraintsType",
}) as any as S.Schema<StringAttributeConstraintsType>;
export interface SchemaAttributeType {
  Name?: string;
  AttributeDataType?: AttributeDataType;
  DeveloperOnlyAttribute?: boolean;
  Mutable?: boolean;
  Required?: boolean;
  NumberAttributeConstraints?: NumberAttributeConstraintsType;
  StringAttributeConstraints?: StringAttributeConstraintsType;
}
export const SchemaAttributeType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    AttributeDataType: S.optional(AttributeDataType),
    DeveloperOnlyAttribute: S.optional(S.Boolean),
    Mutable: S.optional(S.Boolean),
    Required: S.optional(S.Boolean),
    NumberAttributeConstraints: S.optional(NumberAttributeConstraintsType),
    StringAttributeConstraints: S.optional(StringAttributeConstraintsType),
  }),
).annotate({
  identifier: "SchemaAttributeType",
}) as any as S.Schema<SchemaAttributeType>;
export type CustomAttributesListType = SchemaAttributeType[];
export const CustomAttributesListType =
  /*@__PURE__*/ S.Array(SchemaAttributeType);
export interface AddCustomAttributesRequest {
  UserPoolId: string;
  CustomAttributes: SchemaAttributeType[];
}
export const AddCustomAttributesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.String,
    CustomAttributes: CustomAttributesListType,
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
  identifier: "AddCustomAttributesRequest",
}) as any as S.Schema<AddCustomAttributesRequest>;
export interface AddCustomAttributesResponse {}
export const AddCustomAttributesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "AddCustomAttributesResponse",
}) as any as S.Schema<AddCustomAttributesResponse>;
export type ClientIdType = string | redacted.Redacted<string>;
export type ClientSecretType = string | redacted.Redacted<string>;
export interface AddUserPoolClientSecretRequest {
  UserPoolId: string;
  ClientId: string | redacted.Redacted<string>;
  ClientSecret?: string | redacted.Redacted<string>;
}
export const AddUserPoolClientSecretRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.String,
    ClientId: SensitiveString,
    ClientSecret: S.optional(SensitiveString),
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
  identifier: "AddUserPoolClientSecretRequest",
}) as any as S.Schema<AddUserPoolClientSecretRequest>;
export type ClientSecretIdType = string;
export interface ClientSecretDescriptorType {
  ClientSecretId?: string;
  ClientSecretValue?: string | redacted.Redacted<string>;
  ClientSecretCreateDate?: Date;
}
export const ClientSecretDescriptorType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientSecretId: S.optional(S.String),
    ClientSecretValue: S.optional(SensitiveString),
    ClientSecretCreateDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "ClientSecretDescriptorType",
}) as any as S.Schema<ClientSecretDescriptorType>;
export interface AddUserPoolClientSecretResponse {
  ClientSecretDescriptor?: ClientSecretDescriptorType;
}
export const AddUserPoolClientSecretResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientSecretDescriptor: S.optional(ClientSecretDescriptorType),
  }).pipe(ns),
).annotate({
  identifier: "AddUserPoolClientSecretResponse",
}) as any as S.Schema<AddUserPoolClientSecretResponse>;
export type UsernameType = string | redacted.Redacted<string>;
export type GroupNameType = string;
export interface AdminAddUserToGroupRequest {
  UserPoolId: string;
  Username: string | redacted.Redacted<string>;
  GroupName: string;
}
export const AdminAddUserToGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.String,
    Username: SensitiveString,
    GroupName: S.String,
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
  identifier: "AdminAddUserToGroupRequest",
}) as any as S.Schema<AdminAddUserToGroupRequest>;
export interface AdminAddUserToGroupResponse {}
export const AdminAddUserToGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "AdminAddUserToGroupResponse",
}) as any as S.Schema<AdminAddUserToGroupResponse>;
export type ClientMetadataType = { [key: string]: string | undefined };
export const ClientMetadataType = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface AdminConfirmSignUpRequest {
  UserPoolId: string;
  Username: string | redacted.Redacted<string>;
  ClientMetadata?: { [key: string]: string | undefined };
}
export const AdminConfirmSignUpRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.String,
    Username: SensitiveString,
    ClientMetadata: S.optional(ClientMetadataType),
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
  identifier: "AdminConfirmSignUpRequest",
}) as any as S.Schema<AdminConfirmSignUpRequest>;
export interface AdminConfirmSignUpResponse {}
export const AdminConfirmSignUpResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "AdminConfirmSignUpResponse",
}) as any as S.Schema<AdminConfirmSignUpResponse>;
export type AttributeNameType = string;
export type AttributeValueType = string | redacted.Redacted<string>;
export interface AttributeType {
  Name: string;
  Value?: string | redacted.Redacted<string>;
}
export const AttributeType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Value: S.optional(SensitiveString) }),
).annotate({ identifier: "AttributeType" }) as any as S.Schema<AttributeType>;
export type AttributeListType = AttributeType[];
export const AttributeListType = /*@__PURE__*/ S.Array(AttributeType);
export type PasswordType = string | redacted.Redacted<string>;
export type ForceAliasCreation = boolean;
export type MessageActionType = "RESEND" | "SUPPRESS" | (string & {});
export const MessageActionType = /*@__PURE__*/ S.String;

export type DeliveryMediumType = "SMS" | "EMAIL" | (string & {});
export const DeliveryMediumType = /*@__PURE__*/ S.String;

export type DeliveryMediumListType = DeliveryMediumType[];
export const DeliveryMediumListType = /*@__PURE__*/ S.Array(DeliveryMediumType);
export interface AdminCreateUserRequest {
  UserPoolId: string;
  Username: string | redacted.Redacted<string>;
  UserAttributes?: AttributeType[];
  ValidationData?: AttributeType[];
  TemporaryPassword?: string | redacted.Redacted<string>;
  ForceAliasCreation?: boolean;
  MessageAction?: MessageActionType;
  DesiredDeliveryMediums?: DeliveryMediumType[];
  ClientMetadata?: { [key: string]: string | undefined };
}
export const AdminCreateUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.String,
    Username: SensitiveString,
    UserAttributes: S.optional(AttributeListType),
    ValidationData: S.optional(AttributeListType),
    TemporaryPassword: S.optional(SensitiveString),
    ForceAliasCreation: S.optional(S.Boolean),
    MessageAction: S.optional(MessageActionType),
    DesiredDeliveryMediums: S.optional(DeliveryMediumListType),
    ClientMetadata: S.optional(ClientMetadataType),
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
  identifier: "AdminCreateUserRequest",
}) as any as S.Schema<AdminCreateUserRequest>;
export type UserStatusType =
  | "UNCONFIRMED"
  | "CONFIRMED"
  | "ARCHIVED"
  | "COMPROMISED"
  | "UNKNOWN"
  | "RESET_REQUIRED"
  | "FORCE_CHANGE_PASSWORD"
  | "EXTERNAL_PROVIDER"
  | (string & {});
export const UserStatusType = /*@__PURE__*/ S.String;

export interface MFAOptionType {
  DeliveryMedium?: DeliveryMediumType;
  AttributeName?: string;
}
export const MFAOptionType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeliveryMedium: S.optional(DeliveryMediumType),
    AttributeName: S.optional(S.String),
  }),
).annotate({ identifier: "MFAOptionType" }) as any as S.Schema<MFAOptionType>;
export type MFAOptionListType = MFAOptionType[];
export const MFAOptionListType = /*@__PURE__*/ S.Array(MFAOptionType);
export interface UserType {
  Username?: string | redacted.Redacted<string>;
  Attributes?: AttributeType[];
  UserCreateDate?: Date;
  UserLastModifiedDate?: Date;
  Enabled?: boolean;
  UserStatus?: UserStatusType;
  MFAOptions?: MFAOptionType[];
}
export const UserType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Username: S.optional(SensitiveString),
    Attributes: S.optional(AttributeListType),
    UserCreateDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UserLastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Enabled: S.optional(S.Boolean),
    UserStatus: S.optional(UserStatusType),
    MFAOptions: S.optional(MFAOptionListType),
  }),
).annotate({ identifier: "UserType" }) as any as S.Schema<UserType>;
export interface AdminCreateUserResponse {
  User?: UserType;
}
export const AdminCreateUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ User: S.optional(UserType) }).pipe(ns),
).annotate({
  identifier: "AdminCreateUserResponse",
}) as any as S.Schema<AdminCreateUserResponse>;
export interface AdminDeleteUserRequest {
  UserPoolId: string;
  Username: string | redacted.Redacted<string>;
}
export const AdminDeleteUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UserPoolId: S.String, Username: SensitiveString }).pipe(
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
  identifier: "AdminDeleteUserRequest",
}) as any as S.Schema<AdminDeleteUserRequest>;
export interface AdminDeleteUserResponse {}
export const AdminDeleteUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "AdminDeleteUserResponse",
}) as any as S.Schema<AdminDeleteUserResponse>;
export type AttributeNameListType = string[];
export const AttributeNameListType = /*@__PURE__*/ S.Array(S.String);
export interface AdminDeleteUserAttributesRequest {
  UserPoolId: string;
  Username: string | redacted.Redacted<string>;
  UserAttributeNames: string[];
}
export const AdminDeleteUserAttributesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.String,
    Username: SensitiveString,
    UserAttributeNames: AttributeNameListType,
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
  identifier: "AdminDeleteUserAttributesRequest",
}) as any as S.Schema<AdminDeleteUserAttributesRequest>;
export interface AdminDeleteUserAttributesResponse {}
export const AdminDeleteUserAttributesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "AdminDeleteUserAttributesResponse",
}) as any as S.Schema<AdminDeleteUserAttributesResponse>;
export type ProviderNameType = string;
export interface ProviderUserIdentifierType {
  ProviderName?: string;
  ProviderAttributeName?: string;
  ProviderAttributeValue?: string;
}
export const ProviderUserIdentifierType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProviderName: S.optional(S.String),
    ProviderAttributeName: S.optional(S.String),
    ProviderAttributeValue: S.optional(S.String),
  }),
).annotate({
  identifier: "ProviderUserIdentifierType",
}) as any as S.Schema<ProviderUserIdentifierType>;
export interface AdminDisableProviderForUserRequest {
  UserPoolId: string;
  User: ProviderUserIdentifierType;
}
export const AdminDisableProviderForUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UserPoolId: S.String, User: ProviderUserIdentifierType }).pipe(
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
  identifier: "AdminDisableProviderForUserRequest",
}) as any as S.Schema<AdminDisableProviderForUserRequest>;
export interface AdminDisableProviderForUserResponse {}
export const AdminDisableProviderForUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "AdminDisableProviderForUserResponse",
}) as any as S.Schema<AdminDisableProviderForUserResponse>;
export interface AdminDisableUserRequest {
  UserPoolId: string;
  Username: string | redacted.Redacted<string>;
}
export const AdminDisableUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UserPoolId: S.String, Username: SensitiveString }).pipe(
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
  identifier: "AdminDisableUserRequest",
}) as any as S.Schema<AdminDisableUserRequest>;
export interface AdminDisableUserResponse {}
export const AdminDisableUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "AdminDisableUserResponse",
}) as any as S.Schema<AdminDisableUserResponse>;
export interface AdminEnableUserRequest {
  UserPoolId: string;
  Username: string | redacted.Redacted<string>;
}
export const AdminEnableUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UserPoolId: S.String, Username: SensitiveString }).pipe(
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
  identifier: "AdminEnableUserRequest",
}) as any as S.Schema<AdminEnableUserRequest>;
export interface AdminEnableUserResponse {}
export const AdminEnableUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "AdminEnableUserResponse",
}) as any as S.Schema<AdminEnableUserResponse>;
export type DeviceKeyType = string;
export interface AdminForgetDeviceRequest {
  UserPoolId: string;
  Username: string | redacted.Redacted<string>;
  DeviceKey: string;
}
export const AdminForgetDeviceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.String,
    Username: SensitiveString,
    DeviceKey: S.String,
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
  identifier: "AdminForgetDeviceRequest",
}) as any as S.Schema<AdminForgetDeviceRequest>;
export interface AdminForgetDeviceResponse {}
export const AdminForgetDeviceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "AdminForgetDeviceResponse",
}) as any as S.Schema<AdminForgetDeviceResponse>;
export interface AdminGetDeviceRequest {
  DeviceKey: string;
  UserPoolId: string;
  Username: string | redacted.Redacted<string>;
}
export const AdminGetDeviceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeviceKey: S.String,
    UserPoolId: S.String,
    Username: SensitiveString,
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
  identifier: "AdminGetDeviceRequest",
}) as any as S.Schema<AdminGetDeviceRequest>;
export interface DeviceType {
  DeviceKey?: string;
  DeviceAttributes?: AttributeType[];
  DeviceCreateDate?: Date;
  DeviceLastModifiedDate?: Date;
  DeviceLastAuthenticatedDate?: Date;
}
export const DeviceType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeviceKey: S.optional(S.String),
    DeviceAttributes: S.optional(AttributeListType),
    DeviceCreateDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    DeviceLastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    DeviceLastAuthenticatedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "DeviceType" }) as any as S.Schema<DeviceType>;
export interface AdminGetDeviceResponse {
  Device: DeviceType;
}
export const AdminGetDeviceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Device: DeviceType }).pipe(ns),
).annotate({
  identifier: "AdminGetDeviceResponse",
}) as any as S.Schema<AdminGetDeviceResponse>;
export interface AdminGetUserRequest {
  UserPoolId: string;
  Username: string | redacted.Redacted<string>;
}
export const AdminGetUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UserPoolId: S.String, Username: SensitiveString }).pipe(
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
  identifier: "AdminGetUserRequest",
}) as any as S.Schema<AdminGetUserRequest>;
export type UserMFASettingListType = string[];
export const UserMFASettingListType = /*@__PURE__*/ S.Array(S.String);
export interface AdminGetUserResponse {
  Username: string | redacted.Redacted<string>;
  UserAttributes?: AttributeType[];
  UserCreateDate?: Date;
  UserLastModifiedDate?: Date;
  Enabled?: boolean;
  UserStatus?: UserStatusType;
  MFAOptions?: MFAOptionType[];
  PreferredMfaSetting?: string;
  UserMFASettingList?: string[];
}
export const AdminGetUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Username: SensitiveString,
    UserAttributes: S.optional(AttributeListType),
    UserCreateDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UserLastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Enabled: S.optional(S.Boolean),
    UserStatus: S.optional(UserStatusType),
    MFAOptions: S.optional(MFAOptionListType),
    PreferredMfaSetting: S.optional(S.String),
    UserMFASettingList: S.optional(UserMFASettingListType),
  }).pipe(ns),
).annotate({
  identifier: "AdminGetUserResponse",
}) as any as S.Schema<AdminGetUserResponse>;
export type AuthFlowType =
  | "USER_SRP_AUTH"
  | "REFRESH_TOKEN_AUTH"
  | "REFRESH_TOKEN"
  | "CUSTOM_AUTH"
  | "ADMIN_NO_SRP_AUTH"
  | "USER_PASSWORD_AUTH"
  | "ADMIN_USER_PASSWORD_AUTH"
  | "USER_AUTH"
  | (string & {});
export const AuthFlowType = /*@__PURE__*/ S.String;

export type AuthParametersType = { [key: string]: string | undefined };
export const AuthParametersType = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface AnalyticsMetadataType {
  AnalyticsEndpointId?: string;
}
export const AnalyticsMetadataType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AnalyticsEndpointId: S.optional(S.String) }),
).annotate({
  identifier: "AnalyticsMetadataType",
}) as any as S.Schema<AnalyticsMetadataType>;
export interface HttpHeader {
  headerName?: string;
  headerValue?: string;
}
export const HttpHeader = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    headerName: S.optional(S.String),
    headerValue: S.optional(S.String),
  }),
).annotate({ identifier: "HttpHeader" }) as any as S.Schema<HttpHeader>;
export type HttpHeaderList = HttpHeader[];
export const HttpHeaderList = /*@__PURE__*/ S.Array(HttpHeader);
export interface ContextDataType {
  IpAddress: string;
  ServerName: string;
  ServerPath: string;
  HttpHeaders: HttpHeader[];
  EncodedData?: string;
}
export const ContextDataType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IpAddress: S.String,
    ServerName: S.String,
    ServerPath: S.String,
    HttpHeaders: HttpHeaderList,
    EncodedData: S.optional(S.String),
  }),
).annotate({
  identifier: "ContextDataType",
}) as any as S.Schema<ContextDataType>;
export type SessionType = string | redacted.Redacted<string>;
export interface AdminInitiateAuthRequest {
  UserPoolId: string;
  ClientId: string | redacted.Redacted<string>;
  AuthFlow: AuthFlowType;
  AuthParameters?: { [key: string]: string | undefined };
  ClientMetadata?: { [key: string]: string | undefined };
  AnalyticsMetadata?: AnalyticsMetadataType;
  ContextData?: ContextDataType;
  Session?: string | redacted.Redacted<string>;
}
export const AdminInitiateAuthRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.String,
    ClientId: SensitiveString,
    AuthFlow: AuthFlowType,
    AuthParameters: S.optional(AuthParametersType),
    ClientMetadata: S.optional(ClientMetadataType),
    AnalyticsMetadata: S.optional(AnalyticsMetadataType),
    ContextData: S.optional(ContextDataType),
    Session: S.optional(SensitiveString),
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
  identifier: "AdminInitiateAuthRequest",
}) as any as S.Schema<AdminInitiateAuthRequest>;
export type ChallengeNameType =
  | "SMS_MFA"
  | "EMAIL_OTP"
  | "SOFTWARE_TOKEN_MFA"
  | "SELECT_MFA_TYPE"
  | "MFA_SETUP"
  | "PASSWORD_VERIFIER"
  | "CUSTOM_CHALLENGE"
  | "SELECT_CHALLENGE"
  | "DEVICE_SRP_AUTH"
  | "DEVICE_PASSWORD_VERIFIER"
  | "ADMIN_NO_SRP_AUTH"
  | "NEW_PASSWORD_REQUIRED"
  | "SMS_OTP"
  | "PASSWORD"
  | "WEB_AUTHN"
  | "PASSWORD_SRP"
  | (string & {});
export const ChallengeNameType = /*@__PURE__*/ S.String;

export type ChallengeParametersType = { [key: string]: string | undefined };
export const ChallengeParametersType = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type TokenModelType = string | redacted.Redacted<string>;
export type IntegerType = number;
export interface NewDeviceMetadataType {
  DeviceKey?: string;
  DeviceGroupKey?: string;
}
export const NewDeviceMetadataType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeviceKey: S.optional(S.String),
    DeviceGroupKey: S.optional(S.String),
  }),
).annotate({
  identifier: "NewDeviceMetadataType",
}) as any as S.Schema<NewDeviceMetadataType>;
export interface AuthenticationResultType {
  AccessToken?: string | redacted.Redacted<string>;
  ExpiresIn?: number;
  TokenType?: string;
  RefreshToken?: string | redacted.Redacted<string>;
  IdToken?: string | redacted.Redacted<string>;
  NewDeviceMetadata?: NewDeviceMetadataType;
}
export const AuthenticationResultType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccessToken: S.optional(SensitiveString),
    ExpiresIn: S.optional(S.Number),
    TokenType: S.optional(S.String),
    RefreshToken: S.optional(SensitiveString),
    IdToken: S.optional(SensitiveString),
    NewDeviceMetadata: S.optional(NewDeviceMetadataType),
  }),
).annotate({
  identifier: "AuthenticationResultType",
}) as any as S.Schema<AuthenticationResultType>;
export type AvailableChallengeListType = ChallengeNameType[];
export const AvailableChallengeListType =
  /*@__PURE__*/ S.Array(ChallengeNameType);
export interface AdminInitiateAuthResponse {
  ChallengeName?: ChallengeNameType;
  Session?: string | redacted.Redacted<string>;
  ChallengeParameters?: { [key: string]: string | undefined };
  AuthenticationResult?: AuthenticationResultType;
  AvailableChallenges?: ChallengeNameType[];
}
export const AdminInitiateAuthResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChallengeName: S.optional(ChallengeNameType),
    Session: S.optional(SensitiveString),
    ChallengeParameters: S.optional(ChallengeParametersType),
    AuthenticationResult: S.optional(AuthenticationResultType),
    AvailableChallenges: S.optional(AvailableChallengeListType),
  }).pipe(ns),
).annotate({
  identifier: "AdminInitiateAuthResponse",
}) as any as S.Schema<AdminInitiateAuthResponse>;
export interface AdminLinkProviderForUserRequest {
  UserPoolId: string;
  DestinationUser: ProviderUserIdentifierType;
  SourceUser: ProviderUserIdentifierType;
}
export const AdminLinkProviderForUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.String,
    DestinationUser: ProviderUserIdentifierType,
    SourceUser: ProviderUserIdentifierType,
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
  identifier: "AdminLinkProviderForUserRequest",
}) as any as S.Schema<AdminLinkProviderForUserRequest>;
export interface AdminLinkProviderForUserResponse {}
export const AdminLinkProviderForUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "AdminLinkProviderForUserResponse",
}) as any as S.Schema<AdminLinkProviderForUserResponse>;
export type QueryLimitType = number;
export type SearchPaginationTokenType = string;
export interface AdminListDevicesRequest {
  UserPoolId: string;
  Username: string | redacted.Redacted<string>;
  Limit?: number;
  PaginationToken?: string;
}
export const AdminListDevicesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.String,
    Username: SensitiveString,
    Limit: S.optional(S.Number),
    PaginationToken: S.optional(S.String),
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
  identifier: "AdminListDevicesRequest",
}) as any as S.Schema<AdminListDevicesRequest>;
export type DeviceListType = DeviceType[];
export const DeviceListType = /*@__PURE__*/ S.Array(DeviceType);
export interface AdminListDevicesResponse {
  Devices?: DeviceType[];
  PaginationToken?: string;
}
export const AdminListDevicesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Devices: S.optional(DeviceListType),
    PaginationToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "AdminListDevicesResponse",
}) as any as S.Schema<AdminListDevicesResponse>;
export type PaginationKey = string;
export interface AdminListGroupsForUserRequest {
  Username: string | redacted.Redacted<string>;
  UserPoolId: string;
  Limit?: number;
  NextToken?: string;
}
export const AdminListGroupsForUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Username: SensitiveString,
    UserPoolId: S.String,
    Limit: S.optional(S.Number),
    NextToken: S.optional(S.String),
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
  identifier: "AdminListGroupsForUserRequest",
}) as any as S.Schema<AdminListGroupsForUserRequest>;
export type DescriptionType = string;
export type ArnType = string;
export type PrecedenceType = number;
export interface GroupType {
  GroupName?: string;
  UserPoolId?: string;
  Description?: string;
  RoleArn?: string;
  Precedence?: number;
  LastModifiedDate?: Date;
  CreationDate?: Date;
}
export const GroupType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupName: S.optional(S.String),
    UserPoolId: S.optional(S.String),
    Description: S.optional(S.String),
    RoleArn: S.optional(S.String),
    Precedence: S.optional(S.Number),
    LastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "GroupType" }) as any as S.Schema<GroupType>;
export type GroupListType = GroupType[];
export const GroupListType = /*@__PURE__*/ S.Array(GroupType);
export interface AdminListGroupsForUserResponse {
  Groups?: GroupType[];
  NextToken?: string;
}
export const AdminListGroupsForUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Groups: S.optional(GroupListType),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "AdminListGroupsForUserResponse",
}) as any as S.Schema<AdminListGroupsForUserResponse>;
export interface AdminListUserAuthEventsRequest {
  UserPoolId: string;
  Username: string | redacted.Redacted<string>;
  MaxResults?: number;
  NextToken?: string;
}
export const AdminListUserAuthEventsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.String,
    Username: SensitiveString,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
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
  identifier: "AdminListUserAuthEventsRequest",
}) as any as S.Schema<AdminListUserAuthEventsRequest>;
export type EventType =
  | "SignIn"
  | "SignUp"
  | "ForgotPassword"
  | "PasswordChange"
  | "ResendCode"
  | (string & {});
export const EventType = /*@__PURE__*/ S.String;

export type EventResponseType = "Pass" | "Fail" | "InProgress" | (string & {});
export const EventResponseType = /*@__PURE__*/ S.String;

export type RiskDecisionType =
  | "NoRisk"
  | "AccountTakeover"
  | "Block"
  | (string & {});
export const RiskDecisionType = /*@__PURE__*/ S.String;

export type RiskLevelType = "Low" | "Medium" | "High" | (string & {});
export const RiskLevelType = /*@__PURE__*/ S.String;

export type WrappedBooleanType = boolean;
export interface EventRiskType {
  RiskDecision?: RiskDecisionType;
  RiskLevel?: RiskLevelType;
  CompromisedCredentialsDetected?: boolean;
}
export const EventRiskType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RiskDecision: S.optional(RiskDecisionType),
    RiskLevel: S.optional(RiskLevelType),
    CompromisedCredentialsDetected: S.optional(S.Boolean),
  }),
).annotate({ identifier: "EventRiskType" }) as any as S.Schema<EventRiskType>;
export type ChallengeName = "Password" | "Mfa" | (string & {});
export const ChallengeName = /*@__PURE__*/ S.String;

export type ChallengeResponse = "Success" | "Failure" | (string & {});
export const ChallengeResponse = /*@__PURE__*/ S.String;

export interface ChallengeResponseType {
  ChallengeName?: ChallengeName;
  ChallengeResponse?: ChallengeResponse;
}
export const ChallengeResponseType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChallengeName: S.optional(ChallengeName),
    ChallengeResponse: S.optional(ChallengeResponse),
  }),
).annotate({
  identifier: "ChallengeResponseType",
}) as any as S.Schema<ChallengeResponseType>;
export type ChallengeResponseListType = ChallengeResponseType[];
export const ChallengeResponseListType = /*@__PURE__*/ S.Array(
  ChallengeResponseType,
);
export interface EventContextDataType {
  IpAddress?: string;
  DeviceName?: string;
  Timezone?: string;
  City?: string;
  Country?: string;
}
export const EventContextDataType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IpAddress: S.optional(S.String),
    DeviceName: S.optional(S.String),
    Timezone: S.optional(S.String),
    City: S.optional(S.String),
    Country: S.optional(S.String),
  }),
).annotate({
  identifier: "EventContextDataType",
}) as any as S.Schema<EventContextDataType>;
export type FeedbackValueType = "Valid" | "Invalid" | (string & {});
export const FeedbackValueType = /*@__PURE__*/ S.String;

export interface EventFeedbackType {
  FeedbackValue: FeedbackValueType;
  Provider: string;
  FeedbackDate?: Date;
}
export const EventFeedbackType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FeedbackValue: FeedbackValueType,
    Provider: S.String,
    FeedbackDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "EventFeedbackType",
}) as any as S.Schema<EventFeedbackType>;
export interface AuthEventType {
  EventId?: string;
  EventType?: EventType;
  CreationDate?: Date;
  EventResponse?: EventResponseType;
  EventRisk?: EventRiskType;
  ChallengeResponses?: ChallengeResponseType[];
  EventContextData?: EventContextDataType;
  EventFeedback?: EventFeedbackType;
}
export const AuthEventType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EventId: S.optional(S.String),
    EventType: S.optional(EventType),
    CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EventResponse: S.optional(EventResponseType),
    EventRisk: S.optional(EventRiskType),
    ChallengeResponses: S.optional(ChallengeResponseListType),
    EventContextData: S.optional(EventContextDataType),
    EventFeedback: S.optional(EventFeedbackType),
  }),
).annotate({ identifier: "AuthEventType" }) as any as S.Schema<AuthEventType>;
export type AuthEventsType = AuthEventType[];
export const AuthEventsType = /*@__PURE__*/ S.Array(AuthEventType);
export interface AdminListUserAuthEventsResponse {
  AuthEvents?: AuthEventType[];
  NextToken?: string;
}
export const AdminListUserAuthEventsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthEvents: S.optional(AuthEventsType),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "AdminListUserAuthEventsResponse",
}) as any as S.Schema<AdminListUserAuthEventsResponse>;
export interface AdminRemoveUserFromGroupRequest {
  UserPoolId: string;
  Username: string | redacted.Redacted<string>;
  GroupName: string;
}
export const AdminRemoveUserFromGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.String,
    Username: SensitiveString,
    GroupName: S.String,
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
  identifier: "AdminRemoveUserFromGroupRequest",
}) as any as S.Schema<AdminRemoveUserFromGroupRequest>;
export interface AdminRemoveUserFromGroupResponse {}
export const AdminRemoveUserFromGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "AdminRemoveUserFromGroupResponse",
}) as any as S.Schema<AdminRemoveUserFromGroupResponse>;
export interface AdminResetUserPasswordRequest {
  UserPoolId: string;
  Username: string | redacted.Redacted<string>;
  ClientMetadata?: { [key: string]: string | undefined };
}
export const AdminResetUserPasswordRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.String,
    Username: SensitiveString,
    ClientMetadata: S.optional(ClientMetadataType),
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
  identifier: "AdminResetUserPasswordRequest",
}) as any as S.Schema<AdminResetUserPasswordRequest>;
export interface AdminResetUserPasswordResponse {}
export const AdminResetUserPasswordResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "AdminResetUserPasswordResponse",
}) as any as S.Schema<AdminResetUserPasswordResponse>;
export type ChallengeResponsesType = { [key: string]: string | undefined };
export const ChallengeResponsesType = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface AdminRespondToAuthChallengeRequest {
  UserPoolId: string;
  ClientId: string | redacted.Redacted<string>;
  ChallengeName: ChallengeNameType;
  ChallengeResponses?: { [key: string]: string | undefined };
  Session?: string | redacted.Redacted<string>;
  AnalyticsMetadata?: AnalyticsMetadataType;
  ContextData?: ContextDataType;
  ClientMetadata?: { [key: string]: string | undefined };
}
export const AdminRespondToAuthChallengeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.String,
    ClientId: SensitiveString,
    ChallengeName: ChallengeNameType,
    ChallengeResponses: S.optional(ChallengeResponsesType),
    Session: S.optional(SensitiveString),
    AnalyticsMetadata: S.optional(AnalyticsMetadataType),
    ContextData: S.optional(ContextDataType),
    ClientMetadata: S.optional(ClientMetadataType),
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
  identifier: "AdminRespondToAuthChallengeRequest",
}) as any as S.Schema<AdminRespondToAuthChallengeRequest>;
export interface AdminRespondToAuthChallengeResponse {
  ChallengeName?: ChallengeNameType;
  Session?: string | redacted.Redacted<string>;
  ChallengeParameters?: { [key: string]: string | undefined };
  AuthenticationResult?: AuthenticationResultType;
}
export const AdminRespondToAuthChallengeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChallengeName: S.optional(ChallengeNameType),
    Session: S.optional(SensitiveString),
    ChallengeParameters: S.optional(ChallengeParametersType),
    AuthenticationResult: S.optional(AuthenticationResultType),
  }).pipe(ns),
).annotate({
  identifier: "AdminRespondToAuthChallengeResponse",
}) as any as S.Schema<AdminRespondToAuthChallengeResponse>;
export interface SMSMfaSettingsType {
  Enabled?: boolean;
  PreferredMfa?: boolean;
}
export const SMSMfaSettingsType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Enabled: S.optional(S.Boolean),
    PreferredMfa: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "SMSMfaSettingsType",
}) as any as S.Schema<SMSMfaSettingsType>;
export interface SoftwareTokenMfaSettingsType {
  Enabled?: boolean;
  PreferredMfa?: boolean;
}
export const SoftwareTokenMfaSettingsType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Enabled: S.optional(S.Boolean),
    PreferredMfa: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "SoftwareTokenMfaSettingsType",
}) as any as S.Schema<SoftwareTokenMfaSettingsType>;
export interface EmailMfaSettingsType {
  Enabled?: boolean;
  PreferredMfa?: boolean;
}
export const EmailMfaSettingsType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Enabled: S.optional(S.Boolean),
    PreferredMfa: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "EmailMfaSettingsType",
}) as any as S.Schema<EmailMfaSettingsType>;
export interface WebAuthnMfaSettingsType {
  Enabled?: boolean;
}
export const WebAuthnMfaSettingsType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Enabled: S.optional(S.Boolean) }),
).annotate({
  identifier: "WebAuthnMfaSettingsType",
}) as any as S.Schema<WebAuthnMfaSettingsType>;
export interface AdminSetUserMFAPreferenceRequest {
  SMSMfaSettings?: SMSMfaSettingsType;
  SoftwareTokenMfaSettings?: SoftwareTokenMfaSettingsType;
  EmailMfaSettings?: EmailMfaSettingsType;
  WebAuthnMfaSettings?: WebAuthnMfaSettingsType;
  Username: string | redacted.Redacted<string>;
  UserPoolId: string;
}
export const AdminSetUserMFAPreferenceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SMSMfaSettings: S.optional(SMSMfaSettingsType),
    SoftwareTokenMfaSettings: S.optional(SoftwareTokenMfaSettingsType),
    EmailMfaSettings: S.optional(EmailMfaSettingsType),
    WebAuthnMfaSettings: S.optional(WebAuthnMfaSettingsType),
    Username: SensitiveString,
    UserPoolId: S.String,
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
  identifier: "AdminSetUserMFAPreferenceRequest",
}) as any as S.Schema<AdminSetUserMFAPreferenceRequest>;
export interface AdminSetUserMFAPreferenceResponse {}
export const AdminSetUserMFAPreferenceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "AdminSetUserMFAPreferenceResponse",
}) as any as S.Schema<AdminSetUserMFAPreferenceResponse>;
export interface AdminSetUserPasswordRequest {
  UserPoolId: string;
  Username: string | redacted.Redacted<string>;
  Password: string | redacted.Redacted<string>;
  Permanent?: boolean;
}
export const AdminSetUserPasswordRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.String,
    Username: SensitiveString,
    Password: SensitiveString,
    Permanent: S.optional(S.Boolean),
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
  identifier: "AdminSetUserPasswordRequest",
}) as any as S.Schema<AdminSetUserPasswordRequest>;
export interface AdminSetUserPasswordResponse {}
export const AdminSetUserPasswordResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "AdminSetUserPasswordResponse",
}) as any as S.Schema<AdminSetUserPasswordResponse>;
export interface AdminSetUserSettingsRequest {
  UserPoolId: string;
  Username: string | redacted.Redacted<string>;
  MFAOptions: MFAOptionType[];
}
export const AdminSetUserSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.String,
    Username: SensitiveString,
    MFAOptions: MFAOptionListType,
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
  identifier: "AdminSetUserSettingsRequest",
}) as any as S.Schema<AdminSetUserSettingsRequest>;
export interface AdminSetUserSettingsResponse {}
export const AdminSetUserSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "AdminSetUserSettingsResponse",
}) as any as S.Schema<AdminSetUserSettingsResponse>;
export type EventIdType = string;
export interface AdminUpdateAuthEventFeedbackRequest {
  UserPoolId: string;
  Username: string | redacted.Redacted<string>;
  EventId: string;
  FeedbackValue: FeedbackValueType;
}
export const AdminUpdateAuthEventFeedbackRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.String,
    Username: SensitiveString,
    EventId: S.String,
    FeedbackValue: FeedbackValueType,
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
  identifier: "AdminUpdateAuthEventFeedbackRequest",
}) as any as S.Schema<AdminUpdateAuthEventFeedbackRequest>;
export interface AdminUpdateAuthEventFeedbackResponse {}
export const AdminUpdateAuthEventFeedbackResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "AdminUpdateAuthEventFeedbackResponse",
}) as any as S.Schema<AdminUpdateAuthEventFeedbackResponse>;
export type DeviceRememberedStatusType =
  | "remembered"
  | "not_remembered"
  | (string & {});
export const DeviceRememberedStatusType = /*@__PURE__*/ S.String;

export interface AdminUpdateDeviceStatusRequest {
  UserPoolId: string;
  Username: string | redacted.Redacted<string>;
  DeviceKey: string;
  DeviceRememberedStatus?: DeviceRememberedStatusType;
}
export const AdminUpdateDeviceStatusRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.String,
    Username: SensitiveString,
    DeviceKey: S.String,
    DeviceRememberedStatus: S.optional(DeviceRememberedStatusType),
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
  identifier: "AdminUpdateDeviceStatusRequest",
}) as any as S.Schema<AdminUpdateDeviceStatusRequest>;
export interface AdminUpdateDeviceStatusResponse {}
export const AdminUpdateDeviceStatusResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "AdminUpdateDeviceStatusResponse",
}) as any as S.Schema<AdminUpdateDeviceStatusResponse>;
export interface AdminUpdateUserAttributesRequest {
  UserPoolId: string;
  Username: string | redacted.Redacted<string>;
  UserAttributes: AttributeType[];
  ClientMetadata?: { [key: string]: string | undefined };
}
export const AdminUpdateUserAttributesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.String,
    Username: SensitiveString,
    UserAttributes: AttributeListType,
    ClientMetadata: S.optional(ClientMetadataType),
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
  identifier: "AdminUpdateUserAttributesRequest",
}) as any as S.Schema<AdminUpdateUserAttributesRequest>;
export interface AdminUpdateUserAttributesResponse {}
export const AdminUpdateUserAttributesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "AdminUpdateUserAttributesResponse",
}) as any as S.Schema<AdminUpdateUserAttributesResponse>;
export interface AdminUserGlobalSignOutRequest {
  UserPoolId: string;
  Username: string | redacted.Redacted<string>;
}
export const AdminUserGlobalSignOutRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UserPoolId: S.String, Username: SensitiveString }).pipe(
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
  identifier: "AdminUserGlobalSignOutRequest",
}) as any as S.Schema<AdminUserGlobalSignOutRequest>;
export interface AdminUserGlobalSignOutResponse {}
export const AdminUserGlobalSignOutResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "AdminUserGlobalSignOutResponse",
}) as any as S.Schema<AdminUserGlobalSignOutResponse>;
export interface AssociateSoftwareTokenRequest {
  AccessToken?: string | redacted.Redacted<string>;
  Session?: string | redacted.Redacted<string>;
}
export const AssociateSoftwareTokenRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccessToken: S.optional(SensitiveString),
    Session: S.optional(SensitiveString),
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
  identifier: "AssociateSoftwareTokenRequest",
}) as any as S.Schema<AssociateSoftwareTokenRequest>;
export type SecretCodeType = string | redacted.Redacted<string>;
export interface AssociateSoftwareTokenResponse {
  SecretCode?: string | redacted.Redacted<string>;
  Session?: string | redacted.Redacted<string>;
}
export const AssociateSoftwareTokenResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SecretCode: S.optional(SensitiveString),
    Session: S.optional(SensitiveString),
  }).pipe(ns),
).annotate({
  identifier: "AssociateSoftwareTokenResponse",
}) as any as S.Schema<AssociateSoftwareTokenResponse>;
export interface ChangePasswordRequest {
  PreviousPassword?: string | redacted.Redacted<string>;
  ProposedPassword: string | redacted.Redacted<string>;
  AccessToken: string | redacted.Redacted<string>;
}
export const ChangePasswordRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PreviousPassword: S.optional(SensitiveString),
    ProposedPassword: SensitiveString,
    AccessToken: SensitiveString,
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
  identifier: "ChangePasswordRequest",
}) as any as S.Schema<ChangePasswordRequest>;
export interface ChangePasswordResponse {}
export const ChangePasswordResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "ChangePasswordResponse",
}) as any as S.Schema<ChangePasswordResponse>;
export type Document = unknown;
export interface CompleteWebAuthnRegistrationRequest {
  AccessToken: string | redacted.Redacted<string>;
  Credential: any;
}
export const CompleteWebAuthnRegistrationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccessToken: SensitiveString, Credential: S.Any }).pipe(
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
  identifier: "CompleteWebAuthnRegistrationRequest",
}) as any as S.Schema<CompleteWebAuthnRegistrationRequest>;
export interface CompleteWebAuthnRegistrationResponse {}
export const CompleteWebAuthnRegistrationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "CompleteWebAuthnRegistrationResponse",
}) as any as S.Schema<CompleteWebAuthnRegistrationResponse>;
export interface DeviceSecretVerifierConfigType {
  PasswordVerifier?: string;
  Salt?: string;
}
export const DeviceSecretVerifierConfigType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PasswordVerifier: S.optional(S.String),
    Salt: S.optional(S.String),
  }),
).annotate({
  identifier: "DeviceSecretVerifierConfigType",
}) as any as S.Schema<DeviceSecretVerifierConfigType>;
export type DeviceNameType = string;
export interface ConfirmDeviceRequest {
  AccessToken: string | redacted.Redacted<string>;
  DeviceKey: string;
  DeviceSecretVerifierConfig?: DeviceSecretVerifierConfigType;
  DeviceName?: string;
}
export const ConfirmDeviceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccessToken: SensitiveString,
    DeviceKey: S.String,
    DeviceSecretVerifierConfig: S.optional(DeviceSecretVerifierConfigType),
    DeviceName: S.optional(S.String),
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
  identifier: "ConfirmDeviceRequest",
}) as any as S.Schema<ConfirmDeviceRequest>;
export interface ConfirmDeviceResponse {
  UserConfirmationNecessary?: boolean;
}
export const ConfirmDeviceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UserConfirmationNecessary: S.optional(S.Boolean) }).pipe(ns),
).annotate({
  identifier: "ConfirmDeviceResponse",
}) as any as S.Schema<ConfirmDeviceResponse>;
export type SecretHashType = string | redacted.Redacted<string>;
export type ConfirmationCodeType = string;
export interface UserContextDataType {
  IpAddress?: string;
  EncodedData?: string;
}
export const UserContextDataType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IpAddress: S.optional(S.String),
    EncodedData: S.optional(S.String),
  }),
).annotate({
  identifier: "UserContextDataType",
}) as any as S.Schema<UserContextDataType>;
export interface ConfirmForgotPasswordRequest {
  ClientId: string | redacted.Redacted<string>;
  SecretHash?: string | redacted.Redacted<string>;
  Username: string | redacted.Redacted<string>;
  ConfirmationCode: string;
  Password: string | redacted.Redacted<string>;
  AnalyticsMetadata?: AnalyticsMetadataType;
  UserContextData?: UserContextDataType;
  ClientMetadata?: { [key: string]: string | undefined };
}
export const ConfirmForgotPasswordRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientId: SensitiveString,
    SecretHash: S.optional(SensitiveString),
    Username: SensitiveString,
    ConfirmationCode: S.String,
    Password: SensitiveString,
    AnalyticsMetadata: S.optional(AnalyticsMetadataType),
    UserContextData: S.optional(UserContextDataType),
    ClientMetadata: S.optional(ClientMetadataType),
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
  identifier: "ConfirmForgotPasswordRequest",
}) as any as S.Schema<ConfirmForgotPasswordRequest>;
export interface ConfirmForgotPasswordResponse {}
export const ConfirmForgotPasswordResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "ConfirmForgotPasswordResponse",
}) as any as S.Schema<ConfirmForgotPasswordResponse>;
export interface ConfirmSignUpRequest {
  ClientId: string | redacted.Redacted<string>;
  SecretHash?: string | redacted.Redacted<string>;
  Username: string | redacted.Redacted<string>;
  ConfirmationCode: string;
  ForceAliasCreation?: boolean;
  AnalyticsMetadata?: AnalyticsMetadataType;
  UserContextData?: UserContextDataType;
  ClientMetadata?: { [key: string]: string | undefined };
  Session?: string | redacted.Redacted<string>;
}
export const ConfirmSignUpRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientId: SensitiveString,
    SecretHash: S.optional(SensitiveString),
    Username: SensitiveString,
    ConfirmationCode: S.String,
    ForceAliasCreation: S.optional(S.Boolean),
    AnalyticsMetadata: S.optional(AnalyticsMetadataType),
    UserContextData: S.optional(UserContextDataType),
    ClientMetadata: S.optional(ClientMetadataType),
    Session: S.optional(SensitiveString),
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
  identifier: "ConfirmSignUpRequest",
}) as any as S.Schema<ConfirmSignUpRequest>;
export interface ConfirmSignUpResponse {
  Session?: string | redacted.Redacted<string>;
}
export const ConfirmSignUpResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Session: S.optional(SensitiveString) }).pipe(ns),
).annotate({
  identifier: "ConfirmSignUpResponse",
}) as any as S.Schema<ConfirmSignUpResponse>;
export interface CreateGroupRequest {
  GroupName: string;
  UserPoolId: string;
  Description?: string;
  RoleArn?: string;
  Precedence?: number;
}
export const CreateGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupName: S.String,
    UserPoolId: S.String,
    Description: S.optional(S.String),
    RoleArn: S.optional(S.String),
    Precedence: S.optional(S.Number),
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
  identifier: "CreateGroupRequest",
}) as any as S.Schema<CreateGroupRequest>;
export interface CreateGroupResponse {
  Group?: GroupType;
}
export const CreateGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Group: S.optional(GroupType) }).pipe(ns),
).annotate({
  identifier: "CreateGroupResponse",
}) as any as S.Schema<CreateGroupResponse>;
export type ProviderNameTypeV2 = string;
export type IdentityProviderTypeType =
  | "SAML"
  | "Facebook"
  | "Google"
  | "LoginWithAmazon"
  | "SignInWithApple"
  | "OIDC"
  | (string & {});
export const IdentityProviderTypeType = /*@__PURE__*/ S.String;

export type ProviderDetailsType = { [key: string]: string | undefined };
export const ProviderDetailsType = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type AttributeMappingKeyType = string;
export type AttributeMappingType = { [key: string]: string | undefined };
export const AttributeMappingType = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type IdpIdentifierType = string;
export type IdpIdentifiersListType = string[];
export const IdpIdentifiersListType = /*@__PURE__*/ S.Array(S.String);
export interface CreateIdentityProviderRequest {
  UserPoolId: string;
  ProviderName: string;
  ProviderType: IdentityProviderTypeType;
  ProviderDetails: { [key: string]: string | undefined };
  AttributeMapping?: { [key: string]: string | undefined };
  IdpIdentifiers?: string[];
}
export const CreateIdentityProviderRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.String,
    ProviderName: S.String,
    ProviderType: IdentityProviderTypeType,
    ProviderDetails: ProviderDetailsType,
    AttributeMapping: S.optional(AttributeMappingType),
    IdpIdentifiers: S.optional(IdpIdentifiersListType),
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
  identifier: "CreateIdentityProviderRequest",
}) as any as S.Schema<CreateIdentityProviderRequest>;
export interface IdentityProviderType {
  UserPoolId?: string;
  ProviderName?: string;
  ProviderType?: IdentityProviderTypeType;
  ProviderDetails?: { [key: string]: string | undefined };
  AttributeMapping?: { [key: string]: string | undefined };
  IdpIdentifiers?: string[];
  LastModifiedDate?: Date;
  CreationDate?: Date;
}
export const IdentityProviderType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.optional(S.String),
    ProviderName: S.optional(S.String),
    ProviderType: S.optional(IdentityProviderTypeType),
    ProviderDetails: S.optional(ProviderDetailsType),
    AttributeMapping: S.optional(AttributeMappingType),
    IdpIdentifiers: S.optional(IdpIdentifiersListType),
    LastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "IdentityProviderType",
}) as any as S.Schema<IdentityProviderType>;
export interface CreateIdentityProviderResponse {
  IdentityProvider: IdentityProviderType;
}
export const CreateIdentityProviderResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IdentityProvider: IdentityProviderType }).pipe(ns),
).annotate({
  identifier: "CreateIdentityProviderResponse",
}) as any as S.Schema<CreateIdentityProviderResponse>;
export type AssetCategoryType =
  | "FAVICON_ICO"
  | "FAVICON_SVG"
  | "EMAIL_GRAPHIC"
  | "SMS_GRAPHIC"
  | "AUTH_APP_GRAPHIC"
  | "PASSWORD_GRAPHIC"
  | "PASSKEY_GRAPHIC"
  | "PAGE_HEADER_LOGO"
  | "PAGE_HEADER_BACKGROUND"
  | "PAGE_FOOTER_LOGO"
  | "PAGE_FOOTER_BACKGROUND"
  | "PAGE_BACKGROUND"
  | "FORM_BACKGROUND"
  | "FORM_LOGO"
  | "IDP_BUTTON_ICON"
  | (string & {});
export const AssetCategoryType = /*@__PURE__*/ S.String;

export type ColorSchemeModeType = "LIGHT" | "DARK" | "DYNAMIC" | (string & {});
export const ColorSchemeModeType = /*@__PURE__*/ S.String;

export type AssetExtensionType =
  | "ICO"
  | "JPEG"
  | "PNG"
  | "SVG"
  | "WEBP"
  | (string & {});
export const AssetExtensionType = /*@__PURE__*/ S.String;

export type AssetBytesType = Uint8Array;
export type ResourceIdType = string;
export interface AssetType {
  Category: AssetCategoryType;
  ColorMode: ColorSchemeModeType;
  Extension: AssetExtensionType;
  Bytes?: Uint8Array;
  ResourceId?: string;
}
export const AssetType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Category: AssetCategoryType,
    ColorMode: ColorSchemeModeType,
    Extension: AssetExtensionType,
    Bytes: S.optional(T.Blob),
    ResourceId: S.optional(S.String),
  }),
).annotate({ identifier: "AssetType" }) as any as S.Schema<AssetType>;
export type AssetListType = AssetType[];
export const AssetListType = /*@__PURE__*/ S.Array(AssetType);
export interface CreateManagedLoginBrandingRequest {
  UserPoolId: string;
  ClientId: string | redacted.Redacted<string>;
  UseCognitoProvidedValues?: boolean;
  Settings?: any;
  Assets?: AssetType[];
}
export const CreateManagedLoginBrandingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.String,
    ClientId: SensitiveString,
    UseCognitoProvidedValues: S.optional(S.Boolean),
    Settings: S.optional(S.Any),
    Assets: S.optional(AssetListType),
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
  identifier: "CreateManagedLoginBrandingRequest",
}) as any as S.Schema<CreateManagedLoginBrandingRequest>;
export type ManagedLoginBrandingIdType = string;
export interface ManagedLoginBrandingType {
  ManagedLoginBrandingId?: string;
  UserPoolId?: string;
  UseCognitoProvidedValues?: boolean;
  Settings?: any;
  Assets?: AssetType[];
  CreationDate?: Date;
  LastModifiedDate?: Date;
}
export const ManagedLoginBrandingType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ManagedLoginBrandingId: S.optional(S.String),
    UserPoolId: S.optional(S.String),
    UseCognitoProvidedValues: S.optional(S.Boolean),
    Settings: S.optional(S.Any),
    Assets: S.optional(AssetListType),
    CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "ManagedLoginBrandingType",
}) as any as S.Schema<ManagedLoginBrandingType>;
export interface CreateManagedLoginBrandingResponse {
  ManagedLoginBranding?: ManagedLoginBrandingType;
}
export const CreateManagedLoginBrandingResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ManagedLoginBranding: S.optional(ManagedLoginBrandingType) }).pipe(
    ns,
  ),
).annotate({
  identifier: "CreateManagedLoginBrandingResponse",
}) as any as S.Schema<CreateManagedLoginBrandingResponse>;
export type ResourceServerIdentifierType = string;
export type ResourceServerNameType = string;
export type ResourceServerScopeNameType = string;
export type ResourceServerScopeDescriptionType = string;
export interface ResourceServerScopeType {
  ScopeName: string;
  ScopeDescription: string;
}
export const ResourceServerScopeType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ScopeName: S.String, ScopeDescription: S.String }),
).annotate({
  identifier: "ResourceServerScopeType",
}) as any as S.Schema<ResourceServerScopeType>;
export type ResourceServerScopeListType = ResourceServerScopeType[];
export const ResourceServerScopeListType = /*@__PURE__*/ S.Array(
  ResourceServerScopeType,
);
export interface CreateResourceServerRequest {
  UserPoolId: string;
  Identifier: string;
  Name: string;
  Scopes?: ResourceServerScopeType[];
}
export const CreateResourceServerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.String,
    Identifier: S.String,
    Name: S.String,
    Scopes: S.optional(ResourceServerScopeListType),
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
  identifier: "CreateResourceServerRequest",
}) as any as S.Schema<CreateResourceServerRequest>;
export interface ResourceServerType {
  UserPoolId?: string;
  Identifier?: string;
  Name?: string;
  Scopes?: ResourceServerScopeType[];
}
export const ResourceServerType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.optional(S.String),
    Identifier: S.optional(S.String),
    Name: S.optional(S.String),
    Scopes: S.optional(ResourceServerScopeListType),
  }),
).annotate({
  identifier: "ResourceServerType",
}) as any as S.Schema<ResourceServerType>;
export interface CreateResourceServerResponse {
  ResourceServer: ResourceServerType;
}
export const CreateResourceServerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceServer: ResourceServerType }).pipe(ns),
).annotate({
  identifier: "CreateResourceServerResponse",
}) as any as S.Schema<CreateResourceServerResponse>;
export type TermsNameType = string;
export type TermsSourceType = "LINK" | (string & {});
export const TermsSourceType = /*@__PURE__*/ S.String;

export type TermsEnforcementType = "NONE" | (string & {});
export const TermsEnforcementType = /*@__PURE__*/ S.String;

export type LanguageIdType = string;
export type LinkUrlType = string;
export type LinksType = { [key: string]: string | undefined };
export const LinksType = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateTermsRequest {
  UserPoolId: string;
  ClientId: string | redacted.Redacted<string>;
  TermsName: string;
  TermsSource: TermsSourceType;
  Enforcement: TermsEnforcementType;
  Links?: { [key: string]: string | undefined };
}
export const CreateTermsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.String,
    ClientId: SensitiveString,
    TermsName: S.String,
    TermsSource: TermsSourceType,
    Enforcement: TermsEnforcementType,
    Links: S.optional(LinksType),
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
  identifier: "CreateTermsRequest",
}) as any as S.Schema<CreateTermsRequest>;
export type TermsIdType = string;
export interface TermsType {
  TermsId: string;
  UserPoolId: string;
  ClientId: string | redacted.Redacted<string>;
  TermsName: string;
  TermsSource: TermsSourceType;
  Enforcement: TermsEnforcementType;
  Links: { [key: string]: string | undefined };
  CreationDate: Date;
  LastModifiedDate: Date;
}
export const TermsType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TermsId: S.String,
    UserPoolId: S.String,
    ClientId: SensitiveString,
    TermsName: S.String,
    TermsSource: TermsSourceType,
    Enforcement: TermsEnforcementType,
    Links: LinksType,
    CreationDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    LastModifiedDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({ identifier: "TermsType" }) as any as S.Schema<TermsType>;
export interface CreateTermsResponse {
  Terms?: TermsType;
}
export const CreateTermsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Terms: S.optional(TermsType) }).pipe(ns),
).annotate({
  identifier: "CreateTermsResponse",
}) as any as S.Schema<CreateTermsResponse>;
export type UserImportJobNameType = string;
export interface CreateUserImportJobRequest {
  JobName: string;
  UserPoolId: string;
  CloudWatchLogsRoleArn: string;
}
export const CreateUserImportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobName: S.String,
    UserPoolId: S.String,
    CloudWatchLogsRoleArn: S.String,
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
  identifier: "CreateUserImportJobRequest",
}) as any as S.Schema<CreateUserImportJobRequest>;
export type UserImportJobIdType = string;
export type PreSignedUrlType = string;
export type UserImportJobStatusType =
  | "Created"
  | "Pending"
  | "InProgress"
  | "Stopping"
  | "Expired"
  | "Stopped"
  | "Failed"
  | "Succeeded"
  | (string & {});
export const UserImportJobStatusType = /*@__PURE__*/ S.String;

export type LongType = number;
export type CompletionMessageType = string;
export interface UserImportJobType {
  JobName?: string;
  JobId?: string;
  UserPoolId?: string;
  PreSignedUrl?: string;
  CreationDate?: Date;
  StartDate?: Date;
  CompletionDate?: Date;
  Status?: UserImportJobStatusType;
  CloudWatchLogsRoleArn?: string;
  ImportedUsers?: number;
  SkippedUsers?: number;
  FailedUsers?: number;
  CompletionMessage?: string;
}
export const UserImportJobType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobName: S.optional(S.String),
    JobId: S.optional(S.String),
    UserPoolId: S.optional(S.String),
    PreSignedUrl: S.optional(S.String),
    CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    StartDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CompletionDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Status: S.optional(UserImportJobStatusType),
    CloudWatchLogsRoleArn: S.optional(S.String),
    ImportedUsers: S.optional(S.Number),
    SkippedUsers: S.optional(S.Number),
    FailedUsers: S.optional(S.Number),
    CompletionMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "UserImportJobType",
}) as any as S.Schema<UserImportJobType>;
export interface CreateUserImportJobResponse {
  UserImportJob?: UserImportJobType;
}
export const CreateUserImportJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UserImportJob: S.optional(UserImportJobType) }).pipe(ns),
).annotate({
  identifier: "CreateUserImportJobResponse",
}) as any as S.Schema<CreateUserImportJobResponse>;
export type UserPoolNameType = string;
export type PasswordPolicyMinLengthType = number;
export type PasswordHistorySizeType = number;
export type TemporaryPasswordValidityDaysType = number;
export interface PasswordPolicyType {
  MinimumLength?: number;
  RequireUppercase?: boolean;
  RequireLowercase?: boolean;
  RequireNumbers?: boolean;
  RequireSymbols?: boolean;
  PasswordHistorySize?: number;
  TemporaryPasswordValidityDays?: number;
}
export const PasswordPolicyType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MinimumLength: S.optional(S.Number),
    RequireUppercase: S.optional(S.Boolean),
    RequireLowercase: S.optional(S.Boolean),
    RequireNumbers: S.optional(S.Boolean),
    RequireSymbols: S.optional(S.Boolean),
    PasswordHistorySize: S.optional(S.Number),
    TemporaryPasswordValidityDays: S.optional(S.Number),
  }),
).annotate({
  identifier: "PasswordPolicyType",
}) as any as S.Schema<PasswordPolicyType>;
export type AuthFactorType =
  | "PASSWORD"
  | "EMAIL_OTP"
  | "SMS_OTP"
  | "WEB_AUTHN"
  | (string & {});
export const AuthFactorType = /*@__PURE__*/ S.String;

export type AllowedFirstAuthFactorsListType = AuthFactorType[];
export const AllowedFirstAuthFactorsListType =
  /*@__PURE__*/ S.Array(AuthFactorType);
export interface SignInPolicyType {
  AllowedFirstAuthFactors?: AuthFactorType[];
}
export const SignInPolicyType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AllowedFirstAuthFactors: S.optional(AllowedFirstAuthFactorsListType),
  }),
).annotate({
  identifier: "SignInPolicyType",
}) as any as S.Schema<SignInPolicyType>;
export interface UserPoolPolicyType {
  PasswordPolicy?: PasswordPolicyType;
  SignInPolicy?: SignInPolicyType;
}
export const UserPoolPolicyType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PasswordPolicy: S.optional(PasswordPolicyType),
    SignInPolicy: S.optional(SignInPolicyType),
  }),
).annotate({
  identifier: "UserPoolPolicyType",
}) as any as S.Schema<UserPoolPolicyType>;
export type DeletionProtectionType = "ACTIVE" | "INACTIVE" | (string & {});
export const DeletionProtectionType = /*@__PURE__*/ S.String;

export type PreTokenGenerationLambdaVersionType =
  | "V1_0"
  | "V2_0"
  | "V3_0"
  | (string & {});
export const PreTokenGenerationLambdaVersionType = /*@__PURE__*/ S.String;

export interface PreTokenGenerationVersionConfigType {
  LambdaVersion: PreTokenGenerationLambdaVersionType;
  LambdaArn: string;
}
export const PreTokenGenerationVersionConfigType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LambdaVersion: PreTokenGenerationLambdaVersionType,
    LambdaArn: S.String,
  }),
).annotate({
  identifier: "PreTokenGenerationVersionConfigType",
}) as any as S.Schema<PreTokenGenerationVersionConfigType>;
export type CustomSMSSenderLambdaVersionType = "V1_0" | (string & {});
export const CustomSMSSenderLambdaVersionType = /*@__PURE__*/ S.String;

export interface CustomSMSLambdaVersionConfigType {
  LambdaVersion: CustomSMSSenderLambdaVersionType;
  LambdaArn: string;
}
export const CustomSMSLambdaVersionConfigType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LambdaVersion: CustomSMSSenderLambdaVersionType,
    LambdaArn: S.String,
  }),
).annotate({
  identifier: "CustomSMSLambdaVersionConfigType",
}) as any as S.Schema<CustomSMSLambdaVersionConfigType>;
export type CustomEmailSenderLambdaVersionType = "V1_0" | (string & {});
export const CustomEmailSenderLambdaVersionType = /*@__PURE__*/ S.String;

export interface CustomEmailLambdaVersionConfigType {
  LambdaVersion: CustomEmailSenderLambdaVersionType;
  LambdaArn: string;
}
export const CustomEmailLambdaVersionConfigType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LambdaVersion: CustomEmailSenderLambdaVersionType,
    LambdaArn: S.String,
  }),
).annotate({
  identifier: "CustomEmailLambdaVersionConfigType",
}) as any as S.Schema<CustomEmailLambdaVersionConfigType>;
export type InboundFederationLambdaVersionType = "V1_0" | (string & {});
export const InboundFederationLambdaVersionType = /*@__PURE__*/ S.String;

export interface InboundFederationLambdaType {
  LambdaVersion: InboundFederationLambdaVersionType;
  LambdaArn: string;
}
export const InboundFederationLambdaType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LambdaVersion: InboundFederationLambdaVersionType,
    LambdaArn: S.String,
  }),
).annotate({
  identifier: "InboundFederationLambdaType",
}) as any as S.Schema<InboundFederationLambdaType>;
export interface LambdaConfigType {
  PreSignUp?: string;
  CustomMessage?: string;
  PostConfirmation?: string;
  PreAuthentication?: string;
  PostAuthentication?: string;
  DefineAuthChallenge?: string;
  CreateAuthChallenge?: string;
  VerifyAuthChallengeResponse?: string;
  PreTokenGeneration?: string;
  UserMigration?: string;
  PreTokenGenerationConfig?: PreTokenGenerationVersionConfigType;
  CustomSMSSender?: CustomSMSLambdaVersionConfigType;
  CustomEmailSender?: CustomEmailLambdaVersionConfigType;
  KMSKeyID?: string;
  InboundFederation?: InboundFederationLambdaType;
}
export const LambdaConfigType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PreSignUp: S.optional(S.String),
    CustomMessage: S.optional(S.String),
    PostConfirmation: S.optional(S.String),
    PreAuthentication: S.optional(S.String),
    PostAuthentication: S.optional(S.String),
    DefineAuthChallenge: S.optional(S.String),
    CreateAuthChallenge: S.optional(S.String),
    VerifyAuthChallengeResponse: S.optional(S.String),
    PreTokenGeneration: S.optional(S.String),
    UserMigration: S.optional(S.String),
    PreTokenGenerationConfig: S.optional(PreTokenGenerationVersionConfigType),
    CustomSMSSender: S.optional(CustomSMSLambdaVersionConfigType),
    CustomEmailSender: S.optional(CustomEmailLambdaVersionConfigType),
    KMSKeyID: S.optional(S.String),
    InboundFederation: S.optional(InboundFederationLambdaType),
  }),
).annotate({
  identifier: "LambdaConfigType",
}) as any as S.Schema<LambdaConfigType>;
export type VerifiedAttributeType = "phone_number" | "email" | (string & {});
export const VerifiedAttributeType = /*@__PURE__*/ S.String;

export type VerifiedAttributesListType = VerifiedAttributeType[];
export const VerifiedAttributesListType = /*@__PURE__*/ S.Array(
  VerifiedAttributeType,
);
export type AliasAttributeType =
  | "phone_number"
  | "email"
  | "preferred_username"
  | (string & {});
export const AliasAttributeType = /*@__PURE__*/ S.String;

export type AliasAttributesListType = AliasAttributeType[];
export const AliasAttributesListType =
  /*@__PURE__*/ S.Array(AliasAttributeType);
export type UsernameAttributeType = "phone_number" | "email" | (string & {});
export const UsernameAttributeType = /*@__PURE__*/ S.String;

export type UsernameAttributesListType = UsernameAttributeType[];
export const UsernameAttributesListType = /*@__PURE__*/ S.Array(
  UsernameAttributeType,
);
export type SmsVerificationMessageType = string;
export type EmailVerificationMessageType = string;
export type EmailVerificationSubjectType = string;
export type EmailVerificationMessageByLinkType = string;
export type EmailVerificationSubjectByLinkType = string;
export type DefaultEmailOptionType =
  | "CONFIRM_WITH_LINK"
  | "CONFIRM_WITH_CODE"
  | (string & {});
export const DefaultEmailOptionType = /*@__PURE__*/ S.String;

export interface VerificationMessageTemplateType {
  SmsMessage?: string;
  EmailMessage?: string;
  EmailSubject?: string;
  EmailMessageByLink?: string;
  EmailSubjectByLink?: string;
  DefaultEmailOption?: DefaultEmailOptionType;
}
export const VerificationMessageTemplateType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SmsMessage: S.optional(S.String),
    EmailMessage: S.optional(S.String),
    EmailSubject: S.optional(S.String),
    EmailMessageByLink: S.optional(S.String),
    EmailSubjectByLink: S.optional(S.String),
    DefaultEmailOption: S.optional(DefaultEmailOptionType),
  }),
).annotate({
  identifier: "VerificationMessageTemplateType",
}) as any as S.Schema<VerificationMessageTemplateType>;
export type UserPoolMfaType = "OFF" | "ON" | "OPTIONAL" | (string & {});
export const UserPoolMfaType = /*@__PURE__*/ S.String;

export type AttributesRequireVerificationBeforeUpdateType =
  VerifiedAttributeType[];
export const AttributesRequireVerificationBeforeUpdateType =
  /*@__PURE__*/ S.Array(VerifiedAttributeType);
export interface UserAttributeUpdateSettingsType {
  AttributesRequireVerificationBeforeUpdate?: VerifiedAttributeType[];
}
export const UserAttributeUpdateSettingsType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AttributesRequireVerificationBeforeUpdate: S.optional(
      AttributesRequireVerificationBeforeUpdateType,
    ),
  }),
).annotate({
  identifier: "UserAttributeUpdateSettingsType",
}) as any as S.Schema<UserAttributeUpdateSettingsType>;
export interface DeviceConfigurationType {
  ChallengeRequiredOnNewDevice?: boolean;
  DeviceOnlyRememberedOnUserPrompt?: boolean;
}
export const DeviceConfigurationType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChallengeRequiredOnNewDevice: S.optional(S.Boolean),
    DeviceOnlyRememberedOnUserPrompt: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "DeviceConfigurationType",
}) as any as S.Schema<DeviceConfigurationType>;
export type EmailAddressType = string;
export type EmailSendingAccountType =
  | "COGNITO_DEFAULT"
  | "DEVELOPER"
  | (string & {});
export const EmailSendingAccountType = /*@__PURE__*/ S.String;

export type SESConfigurationSet = string;
export interface EmailConfigurationType {
  SourceArn?: string;
  ReplyToEmailAddress?: string;
  EmailSendingAccount?: EmailSendingAccountType;
  From?: string;
  ConfigurationSet?: string;
}
export const EmailConfigurationType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceArn: S.optional(S.String),
    ReplyToEmailAddress: S.optional(S.String),
    EmailSendingAccount: S.optional(EmailSendingAccountType),
    From: S.optional(S.String),
    ConfigurationSet: S.optional(S.String),
  }),
).annotate({
  identifier: "EmailConfigurationType",
}) as any as S.Schema<EmailConfigurationType>;
export type RegionCodeType = string;
export interface SmsConfigurationType {
  SnsCallerArn: string;
  ExternalId?: string;
  SnsRegion?: string;
}
export const SmsConfigurationType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SnsCallerArn: S.String,
    ExternalId: S.optional(S.String),
    SnsRegion: S.optional(S.String),
  }),
).annotate({
  identifier: "SmsConfigurationType",
}) as any as S.Schema<SmsConfigurationType>;
export type TagKeysType = string;
export type TagValueType = string;
export type UserPoolTagsType = { [key: string]: string | undefined };
export const UserPoolTagsType = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type AdminCreateUserUnusedAccountValidityDaysType = number;
export type SmsInviteMessageType = string;
export type EmailInviteMessageType = string;
export interface MessageTemplateType {
  SMSMessage?: string;
  EmailMessage?: string;
  EmailSubject?: string;
}
export const MessageTemplateType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SMSMessage: S.optional(S.String),
    EmailMessage: S.optional(S.String),
    EmailSubject: S.optional(S.String),
  }),
).annotate({
  identifier: "MessageTemplateType",
}) as any as S.Schema<MessageTemplateType>;
export interface AdminCreateUserConfigType {
  AllowAdminCreateUserOnly?: boolean;
  UnusedAccountValidityDays?: number;
  InviteMessageTemplate?: MessageTemplateType;
}
export const AdminCreateUserConfigType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AllowAdminCreateUserOnly: S.optional(S.Boolean),
    UnusedAccountValidityDays: S.optional(S.Number),
    InviteMessageTemplate: S.optional(MessageTemplateType),
  }),
).annotate({
  identifier: "AdminCreateUserConfigType",
}) as any as S.Schema<AdminCreateUserConfigType>;
export type SchemaAttributesListType = SchemaAttributeType[];
export const SchemaAttributesListType =
  /*@__PURE__*/ S.Array(SchemaAttributeType);
export type AdvancedSecurityModeType =
  | "OFF"
  | "AUDIT"
  | "ENFORCED"
  | (string & {});
export const AdvancedSecurityModeType = /*@__PURE__*/ S.String;

export type AdvancedSecurityEnabledModeType =
  | "AUDIT"
  | "ENFORCED"
  | (string & {});
export const AdvancedSecurityEnabledModeType = /*@__PURE__*/ S.String;

export interface AdvancedSecurityAdditionalFlowsType {
  CustomAuthMode?: AdvancedSecurityEnabledModeType;
}
export const AdvancedSecurityAdditionalFlowsType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CustomAuthMode: S.optional(AdvancedSecurityEnabledModeType) }),
).annotate({
  identifier: "AdvancedSecurityAdditionalFlowsType",
}) as any as S.Schema<AdvancedSecurityAdditionalFlowsType>;
export interface UserPoolAddOnsType {
  AdvancedSecurityMode: AdvancedSecurityModeType;
  AdvancedSecurityAdditionalFlows?: AdvancedSecurityAdditionalFlowsType;
}
export const UserPoolAddOnsType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AdvancedSecurityMode: AdvancedSecurityModeType,
    AdvancedSecurityAdditionalFlows: S.optional(
      AdvancedSecurityAdditionalFlowsType,
    ),
  }),
).annotate({
  identifier: "UserPoolAddOnsType",
}) as any as S.Schema<UserPoolAddOnsType>;
export interface UsernameConfigurationType {
  CaseSensitive: boolean;
}
export const UsernameConfigurationType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CaseSensitive: S.Boolean }),
).annotate({
  identifier: "UsernameConfigurationType",
}) as any as S.Schema<UsernameConfigurationType>;
export type PriorityType = number;
export type RecoveryOptionNameType =
  | "verified_email"
  | "verified_phone_number"
  | "admin_only"
  | (string & {});
export const RecoveryOptionNameType = /*@__PURE__*/ S.String;

export interface RecoveryOptionType {
  Priority: number;
  Name: RecoveryOptionNameType;
}
export const RecoveryOptionType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Priority: S.Number, Name: RecoveryOptionNameType }),
).annotate({
  identifier: "RecoveryOptionType",
}) as any as S.Schema<RecoveryOptionType>;
export type RecoveryMechanismsType = RecoveryOptionType[];
export const RecoveryMechanismsType = /*@__PURE__*/ S.Array(RecoveryOptionType);
export interface AccountRecoverySettingType {
  RecoveryMechanisms?: RecoveryOptionType[];
}
export const AccountRecoverySettingType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RecoveryMechanisms: S.optional(RecoveryMechanismsType) }),
).annotate({
  identifier: "AccountRecoverySettingType",
}) as any as S.Schema<AccountRecoverySettingType>;
export type UserPoolTierType = "LITE" | "ESSENTIALS" | "PLUS" | (string & {});
export const UserPoolTierType = /*@__PURE__*/ S.String;

export type EncryptionKeyType =
  | "AWS_OWNED_KEY"
  | "CUSTOMER_MANAGED_KEY"
  | (string & {});
export const EncryptionKeyType = /*@__PURE__*/ S.String;

export type EncryptionKeyArnType = string;
export interface KeyConfigurationType {
  KeyType?: EncryptionKeyType;
  KmsKeyArn?: string;
}
export const KeyConfigurationType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    KeyType: S.optional(EncryptionKeyType),
    KmsKeyArn: S.optional(S.String),
  }),
).annotate({
  identifier: "KeyConfigurationType",
}) as any as S.Schema<KeyConfigurationType>;
export type IssuerType = "ORIGINAL" | "UPDATED" | (string & {});
export const IssuerType = /*@__PURE__*/ S.String;

export interface IssuerConfigurationType {
  Type?: IssuerType;
}
export const IssuerConfigurationType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Type: S.optional(IssuerType) }),
).annotate({
  identifier: "IssuerConfigurationType",
}) as any as S.Schema<IssuerConfigurationType>;
export interface CreateUserPoolRequest {
  PoolName: string;
  Policies?: UserPoolPolicyType;
  DeletionProtection?: DeletionProtectionType;
  LambdaConfig?: LambdaConfigType;
  AutoVerifiedAttributes?: VerifiedAttributeType[];
  AliasAttributes?: AliasAttributeType[];
  UsernameAttributes?: UsernameAttributeType[];
  SmsVerificationMessage?: string;
  EmailVerificationMessage?: string;
  EmailVerificationSubject?: string;
  VerificationMessageTemplate?: VerificationMessageTemplateType;
  SmsAuthenticationMessage?: string;
  MfaConfiguration?: UserPoolMfaType;
  UserAttributeUpdateSettings?: UserAttributeUpdateSettingsType;
  DeviceConfiguration?: DeviceConfigurationType;
  EmailConfiguration?: EmailConfigurationType;
  SmsConfiguration?: SmsConfigurationType;
  UserPoolTags?: { [key: string]: string | undefined };
  AdminCreateUserConfig?: AdminCreateUserConfigType;
  Schema?: SchemaAttributeType[];
  UserPoolAddOns?: UserPoolAddOnsType;
  UsernameConfiguration?: UsernameConfigurationType;
  AccountRecoverySetting?: AccountRecoverySettingType;
  UserPoolTier?: UserPoolTierType;
  KeyConfiguration?: KeyConfigurationType;
  IssuerConfiguration?: IssuerConfigurationType;
}
export const CreateUserPoolRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PoolName: S.String,
    Policies: S.optional(UserPoolPolicyType),
    DeletionProtection: S.optional(DeletionProtectionType),
    LambdaConfig: S.optional(LambdaConfigType),
    AutoVerifiedAttributes: S.optional(VerifiedAttributesListType),
    AliasAttributes: S.optional(AliasAttributesListType),
    UsernameAttributes: S.optional(UsernameAttributesListType),
    SmsVerificationMessage: S.optional(S.String),
    EmailVerificationMessage: S.optional(S.String),
    EmailVerificationSubject: S.optional(S.String),
    VerificationMessageTemplate: S.optional(VerificationMessageTemplateType),
    SmsAuthenticationMessage: S.optional(S.String),
    MfaConfiguration: S.optional(UserPoolMfaType),
    UserAttributeUpdateSettings: S.optional(UserAttributeUpdateSettingsType),
    DeviceConfiguration: S.optional(DeviceConfigurationType),
    EmailConfiguration: S.optional(EmailConfigurationType),
    SmsConfiguration: S.optional(SmsConfigurationType),
    UserPoolTags: S.optional(UserPoolTagsType),
    AdminCreateUserConfig: S.optional(AdminCreateUserConfigType),
    Schema: S.optional(SchemaAttributesListType),
    UserPoolAddOns: S.optional(UserPoolAddOnsType),
    UsernameConfiguration: S.optional(UsernameConfigurationType),
    AccountRecoverySetting: S.optional(AccountRecoverySettingType),
    UserPoolTier: S.optional(UserPoolTierType),
    KeyConfiguration: S.optional(KeyConfigurationType),
    IssuerConfiguration: S.optional(IssuerConfigurationType),
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
  identifier: "CreateUserPoolRequest",
}) as any as S.Schema<CreateUserPoolRequest>;
export type StatusType = "Enabled" | "Disabled" | (string & {});
export const StatusType = /*@__PURE__*/ S.String;

export type DomainType = string;
export interface UserPoolType {
  Id?: string;
  Name?: string;
  Policies?: UserPoolPolicyType;
  DeletionProtection?: DeletionProtectionType;
  LambdaConfig?: LambdaConfigType;
  Status?: StatusType;
  LastModifiedDate?: Date;
  CreationDate?: Date;
  SchemaAttributes?: SchemaAttributeType[];
  AutoVerifiedAttributes?: VerifiedAttributeType[];
  AliasAttributes?: AliasAttributeType[];
  UsernameAttributes?: UsernameAttributeType[];
  SmsVerificationMessage?: string;
  EmailVerificationMessage?: string;
  EmailVerificationSubject?: string;
  VerificationMessageTemplate?: VerificationMessageTemplateType;
  SmsAuthenticationMessage?: string;
  UserAttributeUpdateSettings?: UserAttributeUpdateSettingsType;
  MfaConfiguration?: UserPoolMfaType;
  DeviceConfiguration?: DeviceConfigurationType;
  EstimatedNumberOfUsers?: number;
  EmailConfiguration?: EmailConfigurationType;
  SmsConfiguration?: SmsConfigurationType;
  UserPoolTags?: { [key: string]: string | undefined };
  SmsConfigurationFailure?: string;
  EmailConfigurationFailure?: string;
  Domain?: string;
  CustomDomain?: string;
  AdminCreateUserConfig?: AdminCreateUserConfigType;
  UserPoolAddOns?: UserPoolAddOnsType;
  UsernameConfiguration?: UsernameConfigurationType;
  Arn?: string;
  AccountRecoverySetting?: AccountRecoverySettingType;
  UserPoolTier?: UserPoolTierType;
  KeyConfiguration?: KeyConfigurationType;
  IssuerConfiguration?: IssuerConfigurationType;
}
export const UserPoolType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Policies: S.optional(UserPoolPolicyType),
    DeletionProtection: S.optional(DeletionProtectionType),
    LambdaConfig: S.optional(LambdaConfigType),
    Status: S.optional(StatusType),
    LastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    SchemaAttributes: S.optional(SchemaAttributesListType),
    AutoVerifiedAttributes: S.optional(VerifiedAttributesListType),
    AliasAttributes: S.optional(AliasAttributesListType),
    UsernameAttributes: S.optional(UsernameAttributesListType),
    SmsVerificationMessage: S.optional(S.String),
    EmailVerificationMessage: S.optional(S.String),
    EmailVerificationSubject: S.optional(S.String),
    VerificationMessageTemplate: S.optional(VerificationMessageTemplateType),
    SmsAuthenticationMessage: S.optional(S.String),
    UserAttributeUpdateSettings: S.optional(UserAttributeUpdateSettingsType),
    MfaConfiguration: S.optional(UserPoolMfaType),
    DeviceConfiguration: S.optional(DeviceConfigurationType),
    EstimatedNumberOfUsers: S.optional(S.Number),
    EmailConfiguration: S.optional(EmailConfigurationType),
    SmsConfiguration: S.optional(SmsConfigurationType),
    UserPoolTags: S.optional(UserPoolTagsType),
    SmsConfigurationFailure: S.optional(S.String),
    EmailConfigurationFailure: S.optional(S.String),
    Domain: S.optional(S.String),
    CustomDomain: S.optional(S.String),
    AdminCreateUserConfig: S.optional(AdminCreateUserConfigType),
    UserPoolAddOns: S.optional(UserPoolAddOnsType),
    UsernameConfiguration: S.optional(UsernameConfigurationType),
    Arn: S.optional(S.String),
    AccountRecoverySetting: S.optional(AccountRecoverySettingType),
    UserPoolTier: S.optional(UserPoolTierType),
    KeyConfiguration: S.optional(KeyConfigurationType),
    IssuerConfiguration: S.optional(IssuerConfigurationType),
  }),
).annotate({ identifier: "UserPoolType" }) as any as S.Schema<UserPoolType>;
export interface CreateUserPoolResponse {
  UserPool?: UserPoolType;
}
export const CreateUserPoolResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UserPool: S.optional(UserPoolType) }).pipe(ns),
).annotate({
  identifier: "CreateUserPoolResponse",
}) as any as S.Schema<CreateUserPoolResponse>;
export type ClientNameType = string;
export type GenerateSecret = boolean;
export type RefreshTokenValidityType = number;
export type AccessTokenValidityType = number;
export type IdTokenValidityType = number;
export type TimeUnitsType =
  | "seconds"
  | "minutes"
  | "hours"
  | "days"
  | (string & {});
export const TimeUnitsType = /*@__PURE__*/ S.String;

export interface TokenValidityUnitsType {
  AccessToken?: TimeUnitsType;
  IdToken?: TimeUnitsType;
  RefreshToken?: TimeUnitsType;
}
export const TokenValidityUnitsType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccessToken: S.optional(TimeUnitsType),
    IdToken: S.optional(TimeUnitsType),
    RefreshToken: S.optional(TimeUnitsType),
  }),
).annotate({
  identifier: "TokenValidityUnitsType",
}) as any as S.Schema<TokenValidityUnitsType>;
export type ClientPermissionType = string;
export type ClientPermissionListType = string[];
export const ClientPermissionListType = /*@__PURE__*/ S.Array(S.String);
export type ExplicitAuthFlowsType =
  | "ADMIN_NO_SRP_AUTH"
  | "CUSTOM_AUTH_FLOW_ONLY"
  | "USER_PASSWORD_AUTH"
  | "ALLOW_ADMIN_USER_PASSWORD_AUTH"
  | "ALLOW_CUSTOM_AUTH"
  | "ALLOW_USER_PASSWORD_AUTH"
  | "ALLOW_USER_SRP_AUTH"
  | "ALLOW_REFRESH_TOKEN_AUTH"
  | "ALLOW_USER_AUTH"
  | (string & {});
export const ExplicitAuthFlowsType = /*@__PURE__*/ S.String;

export type ExplicitAuthFlowsListType = ExplicitAuthFlowsType[];
export const ExplicitAuthFlowsListType = /*@__PURE__*/ S.Array(
  ExplicitAuthFlowsType,
);
export type SupportedIdentityProvidersListType = string[];
export const SupportedIdentityProvidersListType = /*@__PURE__*/ S.Array(
  S.String,
);
export type RedirectUrlType = string;
export type CallbackURLsListType = string[];
export const CallbackURLsListType = /*@__PURE__*/ S.Array(S.String);
export type LogoutURLsListType = string[];
export const LogoutURLsListType = /*@__PURE__*/ S.Array(S.String);
export type OAuthFlowType =
  | "code"
  | "implicit"
  | "client_credentials"
  | (string & {});
export const OAuthFlowType = /*@__PURE__*/ S.String;

export type OAuthFlowsType = OAuthFlowType[];
export const OAuthFlowsType = /*@__PURE__*/ S.Array(OAuthFlowType);
export type ScopeType = string;
export type ScopeListType = string[];
export const ScopeListType = /*@__PURE__*/ S.Array(S.String);
export type HexStringType = string;
export interface AnalyticsConfigurationType {
  ApplicationId?: string;
  ApplicationArn?: string;
  RoleArn?: string;
  ExternalId?: string;
  UserDataShared?: boolean;
}
export const AnalyticsConfigurationType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    ApplicationArn: S.optional(S.String),
    RoleArn: S.optional(S.String),
    ExternalId: S.optional(S.String),
    UserDataShared: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "AnalyticsConfigurationType",
}) as any as S.Schema<AnalyticsConfigurationType>;
export type PreventUserExistenceErrorTypes =
  | "LEGACY"
  | "ENABLED"
  | (string & {});
export const PreventUserExistenceErrorTypes = /*@__PURE__*/ S.String;

export type AuthSessionValidityType = number;
export type FeatureType = "ENABLED" | "DISABLED" | (string & {});
export const FeatureType = /*@__PURE__*/ S.String;

export type RetryGracePeriodSecondsType = number;
export interface RefreshTokenRotationType {
  Feature: FeatureType;
  RetryGracePeriodSeconds?: number;
}
export const RefreshTokenRotationType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Feature: FeatureType,
    RetryGracePeriodSeconds: S.optional(S.Number),
  }),
).annotate({
  identifier: "RefreshTokenRotationType",
}) as any as S.Schema<RefreshTokenRotationType>;
export interface CreateUserPoolClientRequest {
  UserPoolId: string;
  ClientName: string;
  GenerateSecret?: boolean;
  ClientSecret?: string | redacted.Redacted<string>;
  RefreshTokenValidity?: number;
  AccessTokenValidity?: number;
  IdTokenValidity?: number;
  TokenValidityUnits?: TokenValidityUnitsType;
  ReadAttributes?: string[];
  WriteAttributes?: string[];
  ExplicitAuthFlows?: ExplicitAuthFlowsType[];
  SupportedIdentityProviders?: string[];
  CallbackURLs?: string[];
  LogoutURLs?: string[];
  DefaultRedirectURI?: string;
  AllowedOAuthFlows?: OAuthFlowType[];
  AllowedOAuthScopes?: string[];
  AllowedOAuthFlowsUserPoolClient?: boolean;
  AnalyticsConfiguration?: AnalyticsConfigurationType;
  PreventUserExistenceErrors?: PreventUserExistenceErrorTypes;
  EnableTokenRevocation?: boolean;
  EnablePropagateAdditionalUserContextData?: boolean;
  AuthSessionValidity?: number;
  RefreshTokenRotation?: RefreshTokenRotationType;
}
export const CreateUserPoolClientRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.String,
    ClientName: S.String,
    GenerateSecret: S.optional(S.Boolean),
    ClientSecret: S.optional(SensitiveString),
    RefreshTokenValidity: S.optional(S.Number),
    AccessTokenValidity: S.optional(S.Number),
    IdTokenValidity: S.optional(S.Number),
    TokenValidityUnits: S.optional(TokenValidityUnitsType),
    ReadAttributes: S.optional(ClientPermissionListType),
    WriteAttributes: S.optional(ClientPermissionListType),
    ExplicitAuthFlows: S.optional(ExplicitAuthFlowsListType),
    SupportedIdentityProviders: S.optional(SupportedIdentityProvidersListType),
    CallbackURLs: S.optional(CallbackURLsListType),
    LogoutURLs: S.optional(LogoutURLsListType),
    DefaultRedirectURI: S.optional(S.String),
    AllowedOAuthFlows: S.optional(OAuthFlowsType),
    AllowedOAuthScopes: S.optional(ScopeListType),
    AllowedOAuthFlowsUserPoolClient: S.optional(S.Boolean),
    AnalyticsConfiguration: S.optional(AnalyticsConfigurationType),
    PreventUserExistenceErrors: S.optional(PreventUserExistenceErrorTypes),
    EnableTokenRevocation: S.optional(S.Boolean),
    EnablePropagateAdditionalUserContextData: S.optional(S.Boolean),
    AuthSessionValidity: S.optional(S.Number),
    RefreshTokenRotation: S.optional(RefreshTokenRotationType),
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
  identifier: "CreateUserPoolClientRequest",
}) as any as S.Schema<CreateUserPoolClientRequest>;
export interface UserPoolClientType {
  UserPoolId?: string;
  ClientName?: string;
  ClientId?: string | redacted.Redacted<string>;
  ClientSecret?: string | redacted.Redacted<string>;
  LastModifiedDate?: Date;
  CreationDate?: Date;
  RefreshTokenValidity?: number;
  AccessTokenValidity?: number;
  IdTokenValidity?: number;
  TokenValidityUnits?: TokenValidityUnitsType;
  ReadAttributes?: string[];
  WriteAttributes?: string[];
  ExplicitAuthFlows?: ExplicitAuthFlowsType[];
  SupportedIdentityProviders?: string[];
  CallbackURLs?: string[];
  LogoutURLs?: string[];
  DefaultRedirectURI?: string;
  AllowedOAuthFlows?: OAuthFlowType[];
  AllowedOAuthScopes?: string[];
  AllowedOAuthFlowsUserPoolClient?: boolean;
  AnalyticsConfiguration?: AnalyticsConfigurationType;
  PreventUserExistenceErrors?: PreventUserExistenceErrorTypes;
  EnableTokenRevocation?: boolean;
  EnablePropagateAdditionalUserContextData?: boolean;
  AuthSessionValidity?: number;
  RefreshTokenRotation?: RefreshTokenRotationType;
}
export const UserPoolClientType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.optional(S.String),
    ClientName: S.optional(S.String),
    ClientId: S.optional(SensitiveString),
    ClientSecret: S.optional(SensitiveString),
    LastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    RefreshTokenValidity: S.optional(S.Number),
    AccessTokenValidity: S.optional(S.Number),
    IdTokenValidity: S.optional(S.Number),
    TokenValidityUnits: S.optional(TokenValidityUnitsType),
    ReadAttributes: S.optional(ClientPermissionListType),
    WriteAttributes: S.optional(ClientPermissionListType),
    ExplicitAuthFlows: S.optional(ExplicitAuthFlowsListType),
    SupportedIdentityProviders: S.optional(SupportedIdentityProvidersListType),
    CallbackURLs: S.optional(CallbackURLsListType),
    LogoutURLs: S.optional(LogoutURLsListType),
    DefaultRedirectURI: S.optional(S.String),
    AllowedOAuthFlows: S.optional(OAuthFlowsType),
    AllowedOAuthScopes: S.optional(ScopeListType),
    AllowedOAuthFlowsUserPoolClient: S.optional(S.Boolean),
    AnalyticsConfiguration: S.optional(AnalyticsConfigurationType),
    PreventUserExistenceErrors: S.optional(PreventUserExistenceErrorTypes),
    EnableTokenRevocation: S.optional(S.Boolean),
    EnablePropagateAdditionalUserContextData: S.optional(S.Boolean),
    AuthSessionValidity: S.optional(S.Number),
    RefreshTokenRotation: S.optional(RefreshTokenRotationType),
  }),
).annotate({
  identifier: "UserPoolClientType",
}) as any as S.Schema<UserPoolClientType>;
export interface CreateUserPoolClientResponse {
  UserPoolClient?: UserPoolClientType;
}
export const CreateUserPoolClientResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UserPoolClient: S.optional(UserPoolClientType) }).pipe(ns),
).annotate({
  identifier: "CreateUserPoolClientResponse",
}) as any as S.Schema<CreateUserPoolClientResponse>;
export type WrappedIntegerType = number;
export type SecurityPolicyType =
  | "TLS_V1"
  | "TLS_V1_2_2021"
  | "TLS_V1_3_2025"
  | (string & {});
export const SecurityPolicyType = /*@__PURE__*/ S.String;

export interface CustomDomainConfigType {
  CertificateArn: string;
  SecurityPolicy?: SecurityPolicyType;
}
export const CustomDomainConfigType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CertificateArn: S.String,
    SecurityPolicy: S.optional(SecurityPolicyType),
  }),
).annotate({
  identifier: "CustomDomainConfigType",
}) as any as S.Schema<CustomDomainConfigType>;
export type RegionNameType = string;
export type HealthCheckIdType = string;
export interface FailoverType {
  SecondaryRegion: string;
  PrimaryRoute53HealthCheckId: string;
}
export const FailoverType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SecondaryRegion: S.String,
    PrimaryRoute53HealthCheckId: S.String,
  }),
).annotate({ identifier: "FailoverType" }) as any as S.Schema<FailoverType>;
export interface RoutingType {
  Failover?: FailoverType;
}
export const RoutingType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Failover: S.optional(FailoverType) }),
).annotate({ identifier: "RoutingType" }) as any as S.Schema<RoutingType>;
export interface CreateUserPoolDomainRequest {
  Domain: string;
  UserPoolId: string;
  ManagedLoginVersion?: number;
  CustomDomainConfig?: CustomDomainConfigType;
  Routing?: RoutingType;
}
export const CreateUserPoolDomainRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Domain: S.String,
    UserPoolId: S.String,
    ManagedLoginVersion: S.optional(S.Number),
    CustomDomainConfig: S.optional(CustomDomainConfigType),
    Routing: S.optional(RoutingType),
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
  identifier: "CreateUserPoolDomainRequest",
}) as any as S.Schema<CreateUserPoolDomainRequest>;
export interface CreateUserPoolDomainResponse {
  ManagedLoginVersion?: number;
  CloudFrontDomain?: string;
  Routing?: RoutingType;
}
export const CreateUserPoolDomainResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ManagedLoginVersion: S.optional(S.Number),
    CloudFrontDomain: S.optional(S.String),
    Routing: S.optional(RoutingType),
  }).pipe(ns),
).annotate({
  identifier: "CreateUserPoolDomainResponse",
}) as any as S.Schema<CreateUserPoolDomainResponse>;
export interface CreateUserPoolReplicaRequest {
  UserPoolId: string;
  RegionName: string;
  UserPoolTags?: { [key: string]: string | undefined };
}
export const CreateUserPoolReplicaRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.String,
    RegionName: S.String,
    UserPoolTags: S.optional(UserPoolTagsType),
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
  identifier: "CreateUserPoolReplicaRequest",
}) as any as S.Schema<CreateUserPoolReplicaRequest>;
export type ReplicaStatusType =
  | "CREATING"
  | "ACTIVE"
  | "INACTIVE"
  | "DELETING"
  | (string & {});
export const ReplicaStatusType = /*@__PURE__*/ S.String;

export type ReplicaRoleType = "PRIMARY" | "SECONDARY" | (string & {});
export const ReplicaRoleType = /*@__PURE__*/ S.String;

export interface UserPoolReplicaType {
  RegionName?: string;
  Status?: ReplicaStatusType;
  Role?: ReplicaRoleType;
  UserPoolArn?: string;
}
export const UserPoolReplicaType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegionName: S.optional(S.String),
    Status: S.optional(ReplicaStatusType),
    Role: S.optional(ReplicaRoleType),
    UserPoolArn: S.optional(S.String),
  }),
).annotate({
  identifier: "UserPoolReplicaType",
}) as any as S.Schema<UserPoolReplicaType>;
export interface CreateUserPoolReplicaResponse {
  UserPoolReplica?: UserPoolReplicaType;
}
export const CreateUserPoolReplicaResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UserPoolReplica: S.optional(UserPoolReplicaType) }).pipe(ns),
).annotate({
  identifier: "CreateUserPoolReplicaResponse",
}) as any as S.Schema<CreateUserPoolReplicaResponse>;
export interface DeleteGroupRequest {
  GroupName: string;
  UserPoolId: string;
}
export const DeleteGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GroupName: S.String, UserPoolId: S.String }).pipe(
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
  identifier: "DeleteGroupRequest",
}) as any as S.Schema<DeleteGroupRequest>;
export interface DeleteGroupResponse {}
export const DeleteGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteGroupResponse",
}) as any as S.Schema<DeleteGroupResponse>;
export interface DeleteIdentityProviderRequest {
  UserPoolId: string;
  ProviderName: string;
}
export const DeleteIdentityProviderRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UserPoolId: S.String, ProviderName: S.String }).pipe(
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
  identifier: "DeleteIdentityProviderRequest",
}) as any as S.Schema<DeleteIdentityProviderRequest>;
export interface DeleteIdentityProviderResponse {}
export const DeleteIdentityProviderResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteIdentityProviderResponse",
}) as any as S.Schema<DeleteIdentityProviderResponse>;
export interface DeleteManagedLoginBrandingRequest {
  ManagedLoginBrandingId: string;
  UserPoolId: string;
}
export const DeleteManagedLoginBrandingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ManagedLoginBrandingId: S.String, UserPoolId: S.String }).pipe(
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
  identifier: "DeleteManagedLoginBrandingRequest",
}) as any as S.Schema<DeleteManagedLoginBrandingRequest>;
export interface DeleteManagedLoginBrandingResponse {}
export const DeleteManagedLoginBrandingResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteManagedLoginBrandingResponse",
}) as any as S.Schema<DeleteManagedLoginBrandingResponse>;
export interface DeleteResourceServerRequest {
  UserPoolId: string;
  Identifier: string;
}
export const DeleteResourceServerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UserPoolId: S.String, Identifier: S.String }).pipe(
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
  identifier: "DeleteResourceServerRequest",
}) as any as S.Schema<DeleteResourceServerRequest>;
export interface DeleteResourceServerResponse {}
export const DeleteResourceServerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteResourceServerResponse",
}) as any as S.Schema<DeleteResourceServerResponse>;
export interface DeleteTermsRequest {
  TermsId: string;
  UserPoolId: string;
}
export const DeleteTermsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TermsId: S.String, UserPoolId: S.String }).pipe(
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
  identifier: "DeleteTermsRequest",
}) as any as S.Schema<DeleteTermsRequest>;
export interface DeleteTermsResponse {}
export const DeleteTermsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteTermsResponse",
}) as any as S.Schema<DeleteTermsResponse>;
export interface DeleteUserRequest {
  AccessToken: string | redacted.Redacted<string>;
}
export const DeleteUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccessToken: SensitiveString }).pipe(
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
  identifier: "DeleteUserRequest",
}) as any as S.Schema<DeleteUserRequest>;
export interface DeleteUserResponse {}
export const DeleteUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteUserResponse",
}) as any as S.Schema<DeleteUserResponse>;
export interface DeleteUserAttributesRequest {
  UserAttributeNames: string[];
  AccessToken: string | redacted.Redacted<string>;
}
export const DeleteUserAttributesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserAttributeNames: AttributeNameListType,
    AccessToken: SensitiveString,
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
  identifier: "DeleteUserAttributesRequest",
}) as any as S.Schema<DeleteUserAttributesRequest>;
export interface DeleteUserAttributesResponse {}
export const DeleteUserAttributesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteUserAttributesResponse",
}) as any as S.Schema<DeleteUserAttributesResponse>;
export interface DeleteUserPoolRequest {
  UserPoolId: string;
}
export const DeleteUserPoolRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UserPoolId: S.String }).pipe(
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
  identifier: "DeleteUserPoolRequest",
}) as any as S.Schema<DeleteUserPoolRequest>;
export interface DeleteUserPoolResponse {}
export const DeleteUserPoolResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteUserPoolResponse",
}) as any as S.Schema<DeleteUserPoolResponse>;
export interface DeleteUserPoolClientRequest {
  UserPoolId: string;
  ClientId: string | redacted.Redacted<string>;
}
export const DeleteUserPoolClientRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UserPoolId: S.String, ClientId: SensitiveString }).pipe(
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
  identifier: "DeleteUserPoolClientRequest",
}) as any as S.Schema<DeleteUserPoolClientRequest>;
export interface DeleteUserPoolClientResponse {}
export const DeleteUserPoolClientResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteUserPoolClientResponse",
}) as any as S.Schema<DeleteUserPoolClientResponse>;
export interface DeleteUserPoolClientSecretRequest {
  UserPoolId: string;
  ClientId: string | redacted.Redacted<string>;
  ClientSecretId: string;
}
export const DeleteUserPoolClientSecretRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.String,
    ClientId: SensitiveString,
    ClientSecretId: S.String,
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
  identifier: "DeleteUserPoolClientSecretRequest",
}) as any as S.Schema<DeleteUserPoolClientSecretRequest>;
export interface DeleteUserPoolClientSecretResponse {}
export const DeleteUserPoolClientSecretResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteUserPoolClientSecretResponse",
}) as any as S.Schema<DeleteUserPoolClientSecretResponse>;
export interface DeleteUserPoolDomainRequest {
  Domain: string;
  UserPoolId: string;
}
export const DeleteUserPoolDomainRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Domain: S.String, UserPoolId: S.String }).pipe(
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
  identifier: "DeleteUserPoolDomainRequest",
}) as any as S.Schema<DeleteUserPoolDomainRequest>;
export interface DeleteUserPoolDomainResponse {}
export const DeleteUserPoolDomainResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteUserPoolDomainResponse",
}) as any as S.Schema<DeleteUserPoolDomainResponse>;
export interface DeleteUserPoolReplicaRequest {
  UserPoolId: string;
  RegionName: string;
}
export const DeleteUserPoolReplicaRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UserPoolId: S.String, RegionName: S.String }).pipe(
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
  identifier: "DeleteUserPoolReplicaRequest",
}) as any as S.Schema<DeleteUserPoolReplicaRequest>;
export interface DeleteUserPoolReplicaResponse {
  UserPoolReplica?: UserPoolReplicaType;
}
export const DeleteUserPoolReplicaResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UserPoolReplica: S.optional(UserPoolReplicaType) }).pipe(ns),
).annotate({
  identifier: "DeleteUserPoolReplicaResponse",
}) as any as S.Schema<DeleteUserPoolReplicaResponse>;
export interface DeleteWebAuthnCredentialRequest {
  AccessToken: string | redacted.Redacted<string>;
  CredentialId: string;
}
export const DeleteWebAuthnCredentialRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccessToken: SensitiveString, CredentialId: S.String }).pipe(
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
  identifier: "DeleteWebAuthnCredentialRequest",
}) as any as S.Schema<DeleteWebAuthnCredentialRequest>;
export interface DeleteWebAuthnCredentialResponse {}
export const DeleteWebAuthnCredentialResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteWebAuthnCredentialResponse",
}) as any as S.Schema<DeleteWebAuthnCredentialResponse>;
export interface DescribeIdentityProviderRequest {
  UserPoolId: string;
  ProviderName: string;
}
export const DescribeIdentityProviderRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UserPoolId: S.String, ProviderName: S.String }).pipe(
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
  identifier: "DescribeIdentityProviderRequest",
}) as any as S.Schema<DescribeIdentityProviderRequest>;
export interface DescribeIdentityProviderResponse {
  IdentityProvider: IdentityProviderType;
}
export const DescribeIdentityProviderResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IdentityProvider: IdentityProviderType }).pipe(ns),
).annotate({
  identifier: "DescribeIdentityProviderResponse",
}) as any as S.Schema<DescribeIdentityProviderResponse>;
export interface DescribeManagedLoginBrandingRequest {
  UserPoolId: string;
  ManagedLoginBrandingId: string;
  ReturnMergedResources?: boolean;
}
export const DescribeManagedLoginBrandingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.String,
    ManagedLoginBrandingId: S.String,
    ReturnMergedResources: S.optional(S.Boolean),
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
  identifier: "DescribeManagedLoginBrandingRequest",
}) as any as S.Schema<DescribeManagedLoginBrandingRequest>;
export interface DescribeManagedLoginBrandingResponse {
  ManagedLoginBranding?: ManagedLoginBrandingType;
}
export const DescribeManagedLoginBrandingResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ManagedLoginBranding: S.optional(ManagedLoginBrandingType),
    }).pipe(ns),
).annotate({
  identifier: "DescribeManagedLoginBrandingResponse",
}) as any as S.Schema<DescribeManagedLoginBrandingResponse>;
export interface DescribeManagedLoginBrandingByClientRequest {
  UserPoolId: string;
  ClientId: string | redacted.Redacted<string>;
  ReturnMergedResources?: boolean;
}
export const DescribeManagedLoginBrandingByClientRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      UserPoolId: S.String,
      ClientId: SensitiveString,
      ReturnMergedResources: S.optional(S.Boolean),
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
    identifier: "DescribeManagedLoginBrandingByClientRequest",
  }) as any as S.Schema<DescribeManagedLoginBrandingByClientRequest>;
export interface DescribeManagedLoginBrandingByClientResponse {
  ManagedLoginBranding?: ManagedLoginBrandingType;
}
export const DescribeManagedLoginBrandingByClientResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ManagedLoginBranding: S.optional(ManagedLoginBrandingType),
    }).pipe(ns),
  ).annotate({
    identifier: "DescribeManagedLoginBrandingByClientResponse",
  }) as any as S.Schema<DescribeManagedLoginBrandingByClientResponse>;
export interface DescribeResourceServerRequest {
  UserPoolId: string;
  Identifier: string;
}
export const DescribeResourceServerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UserPoolId: S.String, Identifier: S.String }).pipe(
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
  identifier: "DescribeResourceServerRequest",
}) as any as S.Schema<DescribeResourceServerRequest>;
export interface DescribeResourceServerResponse {
  ResourceServer: ResourceServerType;
}
export const DescribeResourceServerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceServer: ResourceServerType }).pipe(ns),
).annotate({
  identifier: "DescribeResourceServerResponse",
}) as any as S.Schema<DescribeResourceServerResponse>;
export interface DescribeRiskConfigurationRequest {
  UserPoolId: string;
  ClientId?: string | redacted.Redacted<string>;
}
export const DescribeRiskConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.String,
    ClientId: S.optional(SensitiveString),
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
  identifier: "DescribeRiskConfigurationRequest",
}) as any as S.Schema<DescribeRiskConfigurationRequest>;
export type EventFilterType =
  | "SIGN_IN"
  | "PASSWORD_CHANGE"
  | "SIGN_UP"
  | (string & {});
export const EventFilterType = /*@__PURE__*/ S.String;

export type EventFiltersType = EventFilterType[];
export const EventFiltersType = /*@__PURE__*/ S.Array(EventFilterType);
export type CompromisedCredentialsEventActionType =
  | "BLOCK"
  | "NO_ACTION"
  | (string & {});
export const CompromisedCredentialsEventActionType = /*@__PURE__*/ S.String;

export interface CompromisedCredentialsActionsType {
  EventAction: CompromisedCredentialsEventActionType;
}
export const CompromisedCredentialsActionsType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EventAction: CompromisedCredentialsEventActionType }),
).annotate({
  identifier: "CompromisedCredentialsActionsType",
}) as any as S.Schema<CompromisedCredentialsActionsType>;
export interface CompromisedCredentialsRiskConfigurationType {
  EventFilter?: EventFilterType[];
  Actions: CompromisedCredentialsActionsType;
}
export const CompromisedCredentialsRiskConfigurationType =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      EventFilter: S.optional(EventFiltersType),
      Actions: CompromisedCredentialsActionsType,
    }),
  ).annotate({
    identifier: "CompromisedCredentialsRiskConfigurationType",
  }) as any as S.Schema<CompromisedCredentialsRiskConfigurationType>;
export type EmailNotificationSubjectType = string;
export type EmailNotificationBodyType = string;
export interface NotifyEmailType {
  Subject: string;
  HtmlBody?: string;
  TextBody?: string;
}
export const NotifyEmailType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Subject: S.String,
    HtmlBody: S.optional(S.String),
    TextBody: S.optional(S.String),
  }),
).annotate({
  identifier: "NotifyEmailType",
}) as any as S.Schema<NotifyEmailType>;
export interface NotifyConfigurationType {
  From?: string;
  ReplyTo?: string;
  SourceArn: string;
  BlockEmail?: NotifyEmailType;
  NoActionEmail?: NotifyEmailType;
  MfaEmail?: NotifyEmailType;
}
export const NotifyConfigurationType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    From: S.optional(S.String),
    ReplyTo: S.optional(S.String),
    SourceArn: S.String,
    BlockEmail: S.optional(NotifyEmailType),
    NoActionEmail: S.optional(NotifyEmailType),
    MfaEmail: S.optional(NotifyEmailType),
  }),
).annotate({
  identifier: "NotifyConfigurationType",
}) as any as S.Schema<NotifyConfigurationType>;
export type AccountTakeoverActionNotifyType = boolean;
export type AccountTakeoverEventActionType =
  | "BLOCK"
  | "MFA_IF_CONFIGURED"
  | "MFA_REQUIRED"
  | "NO_ACTION"
  | (string & {});
export const AccountTakeoverEventActionType = /*@__PURE__*/ S.String;

export interface AccountTakeoverActionType {
  Notify: boolean;
  EventAction: AccountTakeoverEventActionType;
}
export const AccountTakeoverActionType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Notify: S.Boolean, EventAction: AccountTakeoverEventActionType }),
).annotate({
  identifier: "AccountTakeoverActionType",
}) as any as S.Schema<AccountTakeoverActionType>;
export interface AccountTakeoverActionsType {
  LowAction?: AccountTakeoverActionType;
  MediumAction?: AccountTakeoverActionType;
  HighAction?: AccountTakeoverActionType;
}
export const AccountTakeoverActionsType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LowAction: S.optional(AccountTakeoverActionType),
    MediumAction: S.optional(AccountTakeoverActionType),
    HighAction: S.optional(AccountTakeoverActionType),
  }),
).annotate({
  identifier: "AccountTakeoverActionsType",
}) as any as S.Schema<AccountTakeoverActionsType>;
export interface AccountTakeoverRiskConfigurationType {
  NotifyConfiguration?: NotifyConfigurationType;
  Actions: AccountTakeoverActionsType;
}
export const AccountTakeoverRiskConfigurationType = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      NotifyConfiguration: S.optional(NotifyConfigurationType),
      Actions: AccountTakeoverActionsType,
    }),
).annotate({
  identifier: "AccountTakeoverRiskConfigurationType",
}) as any as S.Schema<AccountTakeoverRiskConfigurationType>;
export type BlockedIPRangeListType = string[];
export const BlockedIPRangeListType = /*@__PURE__*/ S.Array(S.String);
export type SkippedIPRangeListType = string[];
export const SkippedIPRangeListType = /*@__PURE__*/ S.Array(S.String);
export interface RiskExceptionConfigurationType {
  BlockedIPRangeList?: string[];
  SkippedIPRangeList?: string[];
}
export const RiskExceptionConfigurationType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BlockedIPRangeList: S.optional(BlockedIPRangeListType),
    SkippedIPRangeList: S.optional(SkippedIPRangeListType),
  }),
).annotate({
  identifier: "RiskExceptionConfigurationType",
}) as any as S.Schema<RiskExceptionConfigurationType>;
export interface RiskConfigurationType {
  UserPoolId?: string;
  ClientId?: string | redacted.Redacted<string>;
  CompromisedCredentialsRiskConfiguration?: CompromisedCredentialsRiskConfigurationType;
  AccountTakeoverRiskConfiguration?: AccountTakeoverRiskConfigurationType;
  RiskExceptionConfiguration?: RiskExceptionConfigurationType;
  LastModifiedDate?: Date;
}
export const RiskConfigurationType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.optional(S.String),
    ClientId: S.optional(SensitiveString),
    CompromisedCredentialsRiskConfiguration: S.optional(
      CompromisedCredentialsRiskConfigurationType,
    ),
    AccountTakeoverRiskConfiguration: S.optional(
      AccountTakeoverRiskConfigurationType,
    ),
    RiskExceptionConfiguration: S.optional(RiskExceptionConfigurationType),
    LastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "RiskConfigurationType",
}) as any as S.Schema<RiskConfigurationType>;
export interface DescribeRiskConfigurationResponse {
  RiskConfiguration: RiskConfigurationType;
}
export const DescribeRiskConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RiskConfiguration: RiskConfigurationType }).pipe(ns),
).annotate({
  identifier: "DescribeRiskConfigurationResponse",
}) as any as S.Schema<DescribeRiskConfigurationResponse>;
export interface DescribeTermsRequest {
  TermsId: string;
  UserPoolId: string;
}
export const DescribeTermsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TermsId: S.String, UserPoolId: S.String }).pipe(
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
  identifier: "DescribeTermsRequest",
}) as any as S.Schema<DescribeTermsRequest>;
export interface DescribeTermsResponse {
  Terms?: TermsType;
}
export const DescribeTermsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Terms: S.optional(TermsType) }).pipe(ns),
).annotate({
  identifier: "DescribeTermsResponse",
}) as any as S.Schema<DescribeTermsResponse>;
export interface DescribeUserImportJobRequest {
  UserPoolId: string;
  JobId: string;
}
export const DescribeUserImportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UserPoolId: S.String, JobId: S.String }).pipe(
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
  identifier: "DescribeUserImportJobRequest",
}) as any as S.Schema<DescribeUserImportJobRequest>;
export interface DescribeUserImportJobResponse {
  UserImportJob?: UserImportJobType;
}
export const DescribeUserImportJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UserImportJob: S.optional(UserImportJobType) }).pipe(ns),
).annotate({
  identifier: "DescribeUserImportJobResponse",
}) as any as S.Schema<DescribeUserImportJobResponse>;
export interface DescribeUserPoolRequest {
  UserPoolId: string;
}
export const DescribeUserPoolRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UserPoolId: S.String }).pipe(
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
  identifier: "DescribeUserPoolRequest",
}) as any as S.Schema<DescribeUserPoolRequest>;
export interface DescribeUserPoolResponse {
  UserPool?: UserPoolType;
}
export const DescribeUserPoolResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UserPool: S.optional(UserPoolType) }).pipe(ns),
).annotate({
  identifier: "DescribeUserPoolResponse",
}) as any as S.Schema<DescribeUserPoolResponse>;
export interface DescribeUserPoolClientRequest {
  UserPoolId: string;
  ClientId: string | redacted.Redacted<string>;
}
export const DescribeUserPoolClientRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UserPoolId: S.String, ClientId: SensitiveString }).pipe(
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
  identifier: "DescribeUserPoolClientRequest",
}) as any as S.Schema<DescribeUserPoolClientRequest>;
export interface DescribeUserPoolClientResponse {
  UserPoolClient?: UserPoolClientType;
}
export const DescribeUserPoolClientResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UserPoolClient: S.optional(UserPoolClientType) }).pipe(ns),
).annotate({
  identifier: "DescribeUserPoolClientResponse",
}) as any as S.Schema<DescribeUserPoolClientResponse>;
export interface DescribeUserPoolDomainRequest {
  Domain: string;
}
export const DescribeUserPoolDomainRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Domain: S.String }).pipe(
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
  identifier: "DescribeUserPoolDomainRequest",
}) as any as S.Schema<DescribeUserPoolDomainRequest>;
export type AWSAccountIdType = string;
export type S3BucketType = string;
export type DomainVersionType = string;
export type DomainStatusType =
  | "CREATING"
  | "DELETING"
  | "UPDATING"
  | "ACTIVE"
  | "FAILED"
  | (string & {});
export const DomainStatusType = /*@__PURE__*/ S.String;

export interface DomainDescriptionType {
  UserPoolId?: string;
  AWSAccountId?: string;
  Domain?: string;
  S3Bucket?: string;
  CloudFrontDistribution?: string;
  Version?: string;
  Status?: DomainStatusType;
  CustomDomainConfig?: CustomDomainConfigType;
  ManagedLoginVersion?: number;
  Routing?: RoutingType;
}
export const DomainDescriptionType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.optional(S.String),
    AWSAccountId: S.optional(S.String),
    Domain: S.optional(S.String),
    S3Bucket: S.optional(S.String),
    CloudFrontDistribution: S.optional(S.String),
    Version: S.optional(S.String),
    Status: S.optional(DomainStatusType),
    CustomDomainConfig: S.optional(CustomDomainConfigType),
    ManagedLoginVersion: S.optional(S.Number),
    Routing: S.optional(RoutingType),
  }),
).annotate({
  identifier: "DomainDescriptionType",
}) as any as S.Schema<DomainDescriptionType>;
export interface DescribeUserPoolDomainResponse {
  DomainDescription?: DomainDescriptionType;
}
export const DescribeUserPoolDomainResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainDescription: S.optional(DomainDescriptionType) }).pipe(ns),
).annotate({
  identifier: "DescribeUserPoolDomainResponse",
}) as any as S.Schema<DescribeUserPoolDomainResponse>;
export interface ForgetDeviceRequest {
  AccessToken?: string | redacted.Redacted<string>;
  DeviceKey: string;
}
export const ForgetDeviceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccessToken: S.optional(SensitiveString),
    DeviceKey: S.String,
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
  identifier: "ForgetDeviceRequest",
}) as any as S.Schema<ForgetDeviceRequest>;
export interface ForgetDeviceResponse {}
export const ForgetDeviceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "ForgetDeviceResponse",
}) as any as S.Schema<ForgetDeviceResponse>;
export interface ForgotPasswordRequest {
  ClientId: string | redacted.Redacted<string>;
  SecretHash?: string | redacted.Redacted<string>;
  UserContextData?: UserContextDataType;
  Username: string | redacted.Redacted<string>;
  AnalyticsMetadata?: AnalyticsMetadataType;
  ClientMetadata?: { [key: string]: string | undefined };
}
export const ForgotPasswordRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientId: SensitiveString,
    SecretHash: S.optional(SensitiveString),
    UserContextData: S.optional(UserContextDataType),
    Username: SensitiveString,
    AnalyticsMetadata: S.optional(AnalyticsMetadataType),
    ClientMetadata: S.optional(ClientMetadataType),
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
  identifier: "ForgotPasswordRequest",
}) as any as S.Schema<ForgotPasswordRequest>;
export interface CodeDeliveryDetailsType {
  Destination?: string;
  DeliveryMedium?: DeliveryMediumType;
  AttributeName?: string;
}
export const CodeDeliveryDetailsType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Destination: S.optional(S.String),
    DeliveryMedium: S.optional(DeliveryMediumType),
    AttributeName: S.optional(S.String),
  }),
).annotate({
  identifier: "CodeDeliveryDetailsType",
}) as any as S.Schema<CodeDeliveryDetailsType>;
export interface ForgotPasswordResponse {
  CodeDeliveryDetails?: CodeDeliveryDetailsType;
}
export const ForgotPasswordResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CodeDeliveryDetails: S.optional(CodeDeliveryDetailsType) }).pipe(
    ns,
  ),
).annotate({
  identifier: "ForgotPasswordResponse",
}) as any as S.Schema<ForgotPasswordResponse>;
export interface GetCSVHeaderRequest {
  UserPoolId: string;
}
export const GetCSVHeaderRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UserPoolId: S.String }).pipe(
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
  identifier: "GetCSVHeaderRequest",
}) as any as S.Schema<GetCSVHeaderRequest>;
export type ListOfStringTypes = string[];
export const ListOfStringTypes = /*@__PURE__*/ S.Array(S.String);
export interface GetCSVHeaderResponse {
  UserPoolId?: string;
  CSVHeader?: string[];
}
export const GetCSVHeaderResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.optional(S.String),
    CSVHeader: S.optional(ListOfStringTypes),
  }).pipe(ns),
).annotate({
  identifier: "GetCSVHeaderResponse",
}) as any as S.Schema<GetCSVHeaderResponse>;
export interface GetDeviceRequest {
  DeviceKey: string;
  AccessToken?: string | redacted.Redacted<string>;
}
export const GetDeviceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeviceKey: S.String,
    AccessToken: S.optional(SensitiveString),
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
  identifier: "GetDeviceRequest",
}) as any as S.Schema<GetDeviceRequest>;
export interface GetDeviceResponse {
  Device: DeviceType;
}
export const GetDeviceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Device: DeviceType }).pipe(ns),
).annotate({
  identifier: "GetDeviceResponse",
}) as any as S.Schema<GetDeviceResponse>;
export interface GetGroupRequest {
  GroupName: string;
  UserPoolId: string;
}
export const GetGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GroupName: S.String, UserPoolId: S.String }).pipe(
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
  identifier: "GetGroupRequest",
}) as any as S.Schema<GetGroupRequest>;
export interface GetGroupResponse {
  Group?: GroupType;
}
export const GetGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Group: S.optional(GroupType) }).pipe(ns),
).annotate({
  identifier: "GetGroupResponse",
}) as any as S.Schema<GetGroupResponse>;
export interface GetIdentityProviderByIdentifierRequest {
  UserPoolId: string;
  IdpIdentifier: string;
}
export const GetIdentityProviderByIdentifierRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ UserPoolId: S.String, IdpIdentifier: S.String }).pipe(
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
  identifier: "GetIdentityProviderByIdentifierRequest",
}) as any as S.Schema<GetIdentityProviderByIdentifierRequest>;
export interface GetIdentityProviderByIdentifierResponse {
  IdentityProvider: IdentityProviderType;
}
export const GetIdentityProviderByIdentifierResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ IdentityProvider: IdentityProviderType }).pipe(ns),
).annotate({
  identifier: "GetIdentityProviderByIdentifierResponse",
}) as any as S.Schema<GetIdentityProviderByIdentifierResponse>;
export interface GetLogDeliveryConfigurationRequest {
  UserPoolId: string;
}
export const GetLogDeliveryConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UserPoolId: S.String }).pipe(
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
  identifier: "GetLogDeliveryConfigurationRequest",
}) as any as S.Schema<GetLogDeliveryConfigurationRequest>;
export type LogLevel = "ERROR" | "INFO" | (string & {});
export const LogLevel = /*@__PURE__*/ S.String;

export type EventSourceName =
  | "userNotification"
  | "userAuthEvents"
  | (string & {});
export const EventSourceName = /*@__PURE__*/ S.String;

export interface CloudWatchLogsConfigurationType {
  LogGroupArn?: string;
}
export const CloudWatchLogsConfigurationType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LogGroupArn: S.optional(S.String) }),
).annotate({
  identifier: "CloudWatchLogsConfigurationType",
}) as any as S.Schema<CloudWatchLogsConfigurationType>;
export type S3ArnType = string;
export interface S3ConfigurationType {
  BucketArn?: string;
}
export const S3ConfigurationType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BucketArn: S.optional(S.String) }),
).annotate({
  identifier: "S3ConfigurationType",
}) as any as S.Schema<S3ConfigurationType>;
export interface FirehoseConfigurationType {
  StreamArn?: string;
}
export const FirehoseConfigurationType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ StreamArn: S.optional(S.String) }),
).annotate({
  identifier: "FirehoseConfigurationType",
}) as any as S.Schema<FirehoseConfigurationType>;
export interface LogConfigurationType {
  LogLevel: LogLevel;
  EventSource: EventSourceName;
  CloudWatchLogsConfiguration?: CloudWatchLogsConfigurationType;
  S3Configuration?: S3ConfigurationType;
  FirehoseConfiguration?: FirehoseConfigurationType;
}
export const LogConfigurationType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LogLevel: LogLevel,
    EventSource: EventSourceName,
    CloudWatchLogsConfiguration: S.optional(CloudWatchLogsConfigurationType),
    S3Configuration: S.optional(S3ConfigurationType),
    FirehoseConfiguration: S.optional(FirehoseConfigurationType),
  }),
).annotate({
  identifier: "LogConfigurationType",
}) as any as S.Schema<LogConfigurationType>;
export type LogConfigurationListType = LogConfigurationType[];
export const LogConfigurationListType =
  /*@__PURE__*/ S.Array(LogConfigurationType);
export interface LogDeliveryConfigurationType {
  UserPoolId: string;
  LogConfigurations: LogConfigurationType[];
}
export const LogDeliveryConfigurationType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.String,
    LogConfigurations: LogConfigurationListType,
  }),
).annotate({
  identifier: "LogDeliveryConfigurationType",
}) as any as S.Schema<LogDeliveryConfigurationType>;
export interface GetLogDeliveryConfigurationResponse {
  LogDeliveryConfiguration?: LogDeliveryConfigurationType;
}
export const GetLogDeliveryConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LogDeliveryConfiguration: S.optional(LogDeliveryConfigurationType),
  }).pipe(ns),
).annotate({
  identifier: "GetLogDeliveryConfigurationResponse",
}) as any as S.Schema<GetLogDeliveryConfigurationResponse>;
export interface GetSigningCertificateRequest {
  UserPoolId: string;
}
export const GetSigningCertificateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UserPoolId: S.String }).pipe(
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
  identifier: "GetSigningCertificateRequest",
}) as any as S.Schema<GetSigningCertificateRequest>;
export interface GetSigningCertificateResponse {
  Certificate?: string;
}
export const GetSigningCertificateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Certificate: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "GetSigningCertificateResponse",
}) as any as S.Schema<GetSigningCertificateResponse>;
export interface GetTokensFromRefreshTokenRequest {
  RefreshToken: string | redacted.Redacted<string>;
  ClientId: string | redacted.Redacted<string>;
  ClientSecret?: string | redacted.Redacted<string>;
  DeviceKey?: string;
  ClientMetadata?: { [key: string]: string | undefined };
}
export const GetTokensFromRefreshTokenRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RefreshToken: SensitiveString,
    ClientId: SensitiveString,
    ClientSecret: S.optional(SensitiveString),
    DeviceKey: S.optional(S.String),
    ClientMetadata: S.optional(ClientMetadataType),
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
  identifier: "GetTokensFromRefreshTokenRequest",
}) as any as S.Schema<GetTokensFromRefreshTokenRequest>;
export interface GetTokensFromRefreshTokenResponse {
  AuthenticationResult?: AuthenticationResultType;
}
export const GetTokensFromRefreshTokenResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AuthenticationResult: S.optional(AuthenticationResultType) }).pipe(
    ns,
  ),
).annotate({
  identifier: "GetTokensFromRefreshTokenResponse",
}) as any as S.Schema<GetTokensFromRefreshTokenResponse>;
export interface GetUICustomizationRequest {
  UserPoolId: string;
  ClientId?: string | redacted.Redacted<string>;
}
export const GetUICustomizationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.String,
    ClientId: S.optional(SensitiveString),
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
  identifier: "GetUICustomizationRequest",
}) as any as S.Schema<GetUICustomizationRequest>;
export type ImageUrlType = string;
export type CSSType = string;
export type CSSVersionType = string;
export interface UICustomizationType {
  UserPoolId?: string;
  ClientId?: string | redacted.Redacted<string>;
  ImageUrl?: string;
  CSS?: string;
  CSSVersion?: string;
  LastModifiedDate?: Date;
  CreationDate?: Date;
}
export const UICustomizationType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.optional(S.String),
    ClientId: S.optional(SensitiveString),
    ImageUrl: S.optional(S.String),
    CSS: S.optional(S.String),
    CSSVersion: S.optional(S.String),
    LastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "UICustomizationType",
}) as any as S.Schema<UICustomizationType>;
export interface GetUICustomizationResponse {
  UICustomization: UICustomizationType;
}
export const GetUICustomizationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UICustomization: UICustomizationType }).pipe(ns),
).annotate({
  identifier: "GetUICustomizationResponse",
}) as any as S.Schema<GetUICustomizationResponse>;
export interface GetUserRequest {
  AccessToken: string | redacted.Redacted<string>;
}
export const GetUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccessToken: SensitiveString }).pipe(
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
).annotate({ identifier: "GetUserRequest" }) as any as S.Schema<GetUserRequest>;
export interface GetUserResponse {
  Username: string | redacted.Redacted<string>;
  UserAttributes: AttributeType[];
  MFAOptions?: MFAOptionType[];
  PreferredMfaSetting?: string;
  UserMFASettingList?: string[];
}
export const GetUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Username: SensitiveString,
    UserAttributes: AttributeListType,
    MFAOptions: S.optional(MFAOptionListType),
    PreferredMfaSetting: S.optional(S.String),
    UserMFASettingList: S.optional(UserMFASettingListType),
  }).pipe(ns),
).annotate({
  identifier: "GetUserResponse",
}) as any as S.Schema<GetUserResponse>;
export interface GetUserAttributeVerificationCodeRequest {
  AccessToken: string | redacted.Redacted<string>;
  AttributeName: string;
  ClientMetadata?: { [key: string]: string | undefined };
}
export const GetUserAttributeVerificationCodeRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AccessToken: SensitiveString,
      AttributeName: S.String,
      ClientMetadata: S.optional(ClientMetadataType),
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
  identifier: "GetUserAttributeVerificationCodeRequest",
}) as any as S.Schema<GetUserAttributeVerificationCodeRequest>;
export interface GetUserAttributeVerificationCodeResponse {
  CodeDeliveryDetails?: CodeDeliveryDetailsType;
}
export const GetUserAttributeVerificationCodeResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ CodeDeliveryDetails: S.optional(CodeDeliveryDetailsType) }).pipe(
      ns,
    ),
).annotate({
  identifier: "GetUserAttributeVerificationCodeResponse",
}) as any as S.Schema<GetUserAttributeVerificationCodeResponse>;
export interface GetUserAuthFactorsRequest {
  AccessToken: string | redacted.Redacted<string>;
}
export const GetUserAuthFactorsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccessToken: SensitiveString }).pipe(
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
  identifier: "GetUserAuthFactorsRequest",
}) as any as S.Schema<GetUserAuthFactorsRequest>;
export type ConfiguredUserAuthFactorsListType = AuthFactorType[];
export const ConfiguredUserAuthFactorsListType =
  /*@__PURE__*/ S.Array(AuthFactorType);
export interface GetUserAuthFactorsResponse {
  Username: string | redacted.Redacted<string>;
  PreferredMfaSetting?: string;
  UserMFASettingList?: string[];
  ConfiguredUserAuthFactors?: AuthFactorType[];
}
export const GetUserAuthFactorsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Username: SensitiveString,
    PreferredMfaSetting: S.optional(S.String),
    UserMFASettingList: S.optional(UserMFASettingListType),
    ConfiguredUserAuthFactors: S.optional(ConfiguredUserAuthFactorsListType),
  }).pipe(ns),
).annotate({
  identifier: "GetUserAuthFactorsResponse",
}) as any as S.Schema<GetUserAuthFactorsResponse>;
export interface GetUserPoolMfaConfigRequest {
  UserPoolId: string;
}
export const GetUserPoolMfaConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UserPoolId: S.String }).pipe(
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
  identifier: "GetUserPoolMfaConfigRequest",
}) as any as S.Schema<GetUserPoolMfaConfigRequest>;
export interface SmsMfaConfigType {
  SmsAuthenticationMessage?: string;
  SmsConfiguration?: SmsConfigurationType;
}
export const SmsMfaConfigType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SmsAuthenticationMessage: S.optional(S.String),
    SmsConfiguration: S.optional(SmsConfigurationType),
  }),
).annotate({
  identifier: "SmsMfaConfigType",
}) as any as S.Schema<SmsMfaConfigType>;
export interface SoftwareTokenMfaConfigType {
  Enabled?: boolean;
}
export const SoftwareTokenMfaConfigType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Enabled: S.optional(S.Boolean) }),
).annotate({
  identifier: "SoftwareTokenMfaConfigType",
}) as any as S.Schema<SoftwareTokenMfaConfigType>;
export type EmailMfaMessageType = string;
export type EmailMfaSubjectType = string;
export interface EmailMfaConfigType {
  Message?: string;
  Subject?: string;
}
export const EmailMfaConfigType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Message: S.optional(S.String), Subject: S.optional(S.String) }),
).annotate({
  identifier: "EmailMfaConfigType",
}) as any as S.Schema<EmailMfaConfigType>;
export type RelyingPartyIdType = string;
export type UserVerificationType = "required" | "preferred" | (string & {});
export const UserVerificationType = /*@__PURE__*/ S.String;

export type WebAuthnFactorConfigurationType =
  | "SINGLE_FACTOR"
  | "MULTI_FACTOR_WITH_USER_VERIFICATION"
  | (string & {});
export const WebAuthnFactorConfigurationType = /*@__PURE__*/ S.String;

export interface WebAuthnConfigurationType {
  RelyingPartyId?: string;
  UserVerification?: UserVerificationType;
  FactorConfiguration?: WebAuthnFactorConfigurationType;
}
export const WebAuthnConfigurationType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RelyingPartyId: S.optional(S.String),
    UserVerification: S.optional(UserVerificationType),
    FactorConfiguration: S.optional(WebAuthnFactorConfigurationType),
  }),
).annotate({
  identifier: "WebAuthnConfigurationType",
}) as any as S.Schema<WebAuthnConfigurationType>;
export interface GetUserPoolMfaConfigResponse {
  SmsMfaConfiguration?: SmsMfaConfigType;
  SoftwareTokenMfaConfiguration?: SoftwareTokenMfaConfigType;
  EmailMfaConfiguration?: EmailMfaConfigType;
  MfaConfiguration?: UserPoolMfaType;
  WebAuthnConfiguration?: WebAuthnConfigurationType;
}
export const GetUserPoolMfaConfigResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SmsMfaConfiguration: S.optional(SmsMfaConfigType),
    SoftwareTokenMfaConfiguration: S.optional(SoftwareTokenMfaConfigType),
    EmailMfaConfiguration: S.optional(EmailMfaConfigType),
    MfaConfiguration: S.optional(UserPoolMfaType),
    WebAuthnConfiguration: S.optional(WebAuthnConfigurationType),
  }).pipe(ns),
).annotate({
  identifier: "GetUserPoolMfaConfigResponse",
}) as any as S.Schema<GetUserPoolMfaConfigResponse>;
export interface GlobalSignOutRequest {
  AccessToken: string | redacted.Redacted<string>;
}
export const GlobalSignOutRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccessToken: SensitiveString }).pipe(
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
  identifier: "GlobalSignOutRequest",
}) as any as S.Schema<GlobalSignOutRequest>;
export interface GlobalSignOutResponse {}
export const GlobalSignOutResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "GlobalSignOutResponse",
}) as any as S.Schema<GlobalSignOutResponse>;
export interface InitiateAuthRequest {
  AuthFlow: AuthFlowType;
  AuthParameters?: { [key: string]: string | undefined };
  ClientMetadata?: { [key: string]: string | undefined };
  ClientId: string | redacted.Redacted<string>;
  AnalyticsMetadata?: AnalyticsMetadataType;
  UserContextData?: UserContextDataType;
  Session?: string | redacted.Redacted<string>;
}
export const InitiateAuthRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthFlow: AuthFlowType,
    AuthParameters: S.optional(AuthParametersType),
    ClientMetadata: S.optional(ClientMetadataType),
    ClientId: SensitiveString,
    AnalyticsMetadata: S.optional(AnalyticsMetadataType),
    UserContextData: S.optional(UserContextDataType),
    Session: S.optional(SensitiveString),
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
  identifier: "InitiateAuthRequest",
}) as any as S.Schema<InitiateAuthRequest>;
export interface InitiateAuthResponse {
  ChallengeName?: ChallengeNameType;
  Session?: string | redacted.Redacted<string>;
  ChallengeParameters?: { [key: string]: string | undefined };
  AuthenticationResult?: AuthenticationResultType;
  AvailableChallenges?: ChallengeNameType[];
}
export const InitiateAuthResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChallengeName: S.optional(ChallengeNameType),
    Session: S.optional(SensitiveString),
    ChallengeParameters: S.optional(ChallengeParametersType),
    AuthenticationResult: S.optional(AuthenticationResultType),
    AvailableChallenges: S.optional(AvailableChallengeListType),
  }).pipe(ns),
).annotate({
  identifier: "InitiateAuthResponse",
}) as any as S.Schema<InitiateAuthResponse>;
export interface ListDevicesRequest {
  AccessToken: string | redacted.Redacted<string>;
  Limit?: number;
  PaginationToken?: string;
}
export const ListDevicesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccessToken: SensitiveString,
    Limit: S.optional(S.Number),
    PaginationToken: S.optional(S.String),
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
  identifier: "ListDevicesRequest",
}) as any as S.Schema<ListDevicesRequest>;
export interface ListDevicesResponse {
  Devices?: DeviceType[];
  PaginationToken?: string;
}
export const ListDevicesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Devices: S.optional(DeviceListType),
    PaginationToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListDevicesResponse",
}) as any as S.Schema<ListDevicesResponse>;
export interface ListGroupsRequest {
  UserPoolId: string;
  Limit?: number;
  NextToken?: string;
}
export const ListGroupsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.String,
    Limit: S.optional(S.Number),
    NextToken: S.optional(S.String),
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
  identifier: "ListGroupsRequest",
}) as any as S.Schema<ListGroupsRequest>;
export interface ListGroupsResponse {
  Groups?: GroupType[];
  NextToken?: string;
}
export const ListGroupsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Groups: S.optional(GroupListType),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListGroupsResponse",
}) as any as S.Schema<ListGroupsResponse>;
export type ListProvidersLimitType = number;
export type PaginationKeyType = string;
export interface ListIdentityProvidersRequest {
  UserPoolId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListIdentityProvidersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
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
  identifier: "ListIdentityProvidersRequest",
}) as any as S.Schema<ListIdentityProvidersRequest>;
export interface ProviderDescription {
  ProviderName?: string;
  ProviderType?: IdentityProviderTypeType;
  LastModifiedDate?: Date;
  CreationDate?: Date;
}
export const ProviderDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProviderName: S.optional(S.String),
    ProviderType: S.optional(IdentityProviderTypeType),
    LastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "ProviderDescription",
}) as any as S.Schema<ProviderDescription>;
export type ProvidersListType = ProviderDescription[];
export const ProvidersListType = /*@__PURE__*/ S.Array(ProviderDescription);
export interface ListIdentityProvidersResponse {
  Providers: ProviderDescription[];
  NextToken?: string;
}
export const ListIdentityProvidersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Providers: ProvidersListType,
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListIdentityProvidersResponse",
}) as any as S.Schema<ListIdentityProvidersResponse>;
export type ListResourceServersLimitType = number;
export interface ListResourceServersRequest {
  UserPoolId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListResourceServersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
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
  identifier: "ListResourceServersRequest",
}) as any as S.Schema<ListResourceServersRequest>;
export type ResourceServersListType = ResourceServerType[];
export const ResourceServersListType =
  /*@__PURE__*/ S.Array(ResourceServerType);
export interface ListResourceServersResponse {
  ResourceServers: ResourceServerType[];
  NextToken?: string;
}
export const ListResourceServersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceServers: ResourceServersListType,
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListResourceServersResponse",
}) as any as S.Schema<ListResourceServersResponse>;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String }).pipe(
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
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(UserPoolTagsType) }).pipe(ns),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export type ListTermsRequestMaxResultsInteger = number;
export interface ListTermsRequest {
  UserPoolId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListTermsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
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
  identifier: "ListTermsRequest",
}) as any as S.Schema<ListTermsRequest>;
export interface TermsDescriptionType {
  TermsId: string;
  TermsName: string;
  Enforcement: TermsEnforcementType;
  CreationDate: Date;
  LastModifiedDate: Date;
}
export const TermsDescriptionType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TermsId: S.String,
    TermsName: S.String,
    Enforcement: TermsEnforcementType,
    CreationDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    LastModifiedDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "TermsDescriptionType",
}) as any as S.Schema<TermsDescriptionType>;
export type TermsDescriptionListType = TermsDescriptionType[];
export const TermsDescriptionListType =
  /*@__PURE__*/ S.Array(TermsDescriptionType);
export interface ListTermsResponse {
  Terms: TermsDescriptionType[];
  NextToken?: string;
}
export const ListTermsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Terms: TermsDescriptionListType,
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListTermsResponse",
}) as any as S.Schema<ListTermsResponse>;
export type PoolQueryLimitType = number;
export interface ListUserImportJobsRequest {
  UserPoolId: string;
  MaxResults: number;
  PaginationToken?: string;
}
export const ListUserImportJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.String,
    MaxResults: S.Number,
    PaginationToken: S.optional(S.String),
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
  identifier: "ListUserImportJobsRequest",
}) as any as S.Schema<ListUserImportJobsRequest>;
export type UserImportJobsListType = UserImportJobType[];
export const UserImportJobsListType = /*@__PURE__*/ S.Array(UserImportJobType);
export interface ListUserImportJobsResponse {
  UserImportJobs?: UserImportJobType[];
  PaginationToken?: string;
}
export const ListUserImportJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserImportJobs: S.optional(UserImportJobsListType),
    PaginationToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListUserImportJobsResponse",
}) as any as S.Schema<ListUserImportJobsResponse>;
export type QueryLimit = number;
export interface ListUserPoolClientsRequest {
  UserPoolId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListUserPoolClientsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
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
  identifier: "ListUserPoolClientsRequest",
}) as any as S.Schema<ListUserPoolClientsRequest>;
export interface UserPoolClientDescription {
  ClientId?: string | redacted.Redacted<string>;
  UserPoolId?: string;
  ClientName?: string;
}
export const UserPoolClientDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientId: S.optional(SensitiveString),
    UserPoolId: S.optional(S.String),
    ClientName: S.optional(S.String),
  }),
).annotate({
  identifier: "UserPoolClientDescription",
}) as any as S.Schema<UserPoolClientDescription>;
export type UserPoolClientListType = UserPoolClientDescription[];
export const UserPoolClientListType = /*@__PURE__*/ S.Array(
  UserPoolClientDescription,
);
export interface ListUserPoolClientsResponse {
  UserPoolClients?: UserPoolClientDescription[];
  NextToken?: string;
}
export const ListUserPoolClientsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolClients: S.optional(UserPoolClientListType),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListUserPoolClientsResponse",
}) as any as S.Schema<ListUserPoolClientsResponse>;
export interface ListUserPoolClientSecretsRequest {
  UserPoolId: string;
  ClientId: string | redacted.Redacted<string>;
  NextToken?: string;
}
export const ListUserPoolClientSecretsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.String,
    ClientId: SensitiveString,
    NextToken: S.optional(S.String),
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
  identifier: "ListUserPoolClientSecretsRequest",
}) as any as S.Schema<ListUserPoolClientSecretsRequest>;
export type ClientSecretDescriptorListType = ClientSecretDescriptorType[];
export const ClientSecretDescriptorListType = /*@__PURE__*/ S.Array(
  ClientSecretDescriptorType,
);
export interface ListUserPoolClientSecretsResponse {
  ClientSecrets?: ClientSecretDescriptorType[];
  NextToken?: string;
}
export const ListUserPoolClientSecretsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientSecrets: S.optional(ClientSecretDescriptorListType),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListUserPoolClientSecretsResponse",
}) as any as S.Schema<ListUserPoolClientSecretsResponse>;
export interface ListUserPoolReplicasRequest {
  UserPoolId: string;
  NextToken?: string;
}
export const ListUserPoolReplicasRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UserPoolId: S.String, NextToken: S.optional(S.String) }).pipe(
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
  identifier: "ListUserPoolReplicasRequest",
}) as any as S.Schema<ListUserPoolReplicasRequest>;
export type UserPoolReplicaListType = UserPoolReplicaType[];
export const UserPoolReplicaListType =
  /*@__PURE__*/ S.Array(UserPoolReplicaType);
export interface ListUserPoolReplicasResponse {
  UserPoolReplicas?: UserPoolReplicaType[];
  NextToken?: string;
}
export const ListUserPoolReplicasResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolReplicas: S.optional(UserPoolReplicaListType),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListUserPoolReplicasResponse",
}) as any as S.Schema<ListUserPoolReplicasResponse>;
export interface ListUserPoolsRequest {
  NextToken?: string;
  MaxResults: number;
}
export const ListUserPoolsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ NextToken: S.optional(S.String), MaxResults: S.Number }).pipe(
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
  identifier: "ListUserPoolsRequest",
}) as any as S.Schema<ListUserPoolsRequest>;
export type ReplicaRegionsType = string[];
export const ReplicaRegionsType = /*@__PURE__*/ S.Array(S.String);
export interface UserPoolDescriptionType {
  Id?: string;
  Name?: string;
  LambdaConfig?: LambdaConfigType;
  Status?: StatusType;
  LastModifiedDate?: Date;
  CreationDate?: Date;
  ReplicaRegions?: string[];
}
export const UserPoolDescriptionType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    LambdaConfig: S.optional(LambdaConfigType),
    Status: S.optional(StatusType),
    LastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ReplicaRegions: S.optional(ReplicaRegionsType),
  }),
).annotate({
  identifier: "UserPoolDescriptionType",
}) as any as S.Schema<UserPoolDescriptionType>;
export type UserPoolListType = UserPoolDescriptionType[];
export const UserPoolListType = /*@__PURE__*/ S.Array(UserPoolDescriptionType);
export interface ListUserPoolsResponse {
  UserPools?: UserPoolDescriptionType[];
  NextToken?: string;
}
export const ListUserPoolsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPools: S.optional(UserPoolListType),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListUserPoolsResponse",
}) as any as S.Schema<ListUserPoolsResponse>;
export type SearchedAttributeNamesListType = string[];
export const SearchedAttributeNamesListType = /*@__PURE__*/ S.Array(S.String);
export type UserFilterType = string;
export interface ListUsersRequest {
  UserPoolId: string;
  AttributesToGet?: string[];
  Limit?: number;
  PaginationToken?: string;
  Filter?: string;
}
export const ListUsersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.String,
    AttributesToGet: S.optional(SearchedAttributeNamesListType),
    Limit: S.optional(S.Number),
    PaginationToken: S.optional(S.String),
    Filter: S.optional(S.String),
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
  identifier: "ListUsersRequest",
}) as any as S.Schema<ListUsersRequest>;
export type UsersListType = UserType[];
export const UsersListType = /*@__PURE__*/ S.Array(UserType);
export interface ListUsersResponse {
  Users?: UserType[];
  PaginationToken?: string;
}
export const ListUsersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Users: S.optional(UsersListType),
    PaginationToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListUsersResponse",
}) as any as S.Schema<ListUsersResponse>;
export interface ListUsersInGroupRequest {
  UserPoolId: string;
  GroupName: string;
  Limit?: number;
  NextToken?: string;
}
export const ListUsersInGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.String,
    GroupName: S.String,
    Limit: S.optional(S.Number),
    NextToken: S.optional(S.String),
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
  identifier: "ListUsersInGroupRequest",
}) as any as S.Schema<ListUsersInGroupRequest>;
export interface ListUsersInGroupResponse {
  Users?: UserType[];
  NextToken?: string;
}
export const ListUsersInGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Users: S.optional(UsersListType),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListUsersInGroupResponse",
}) as any as S.Schema<ListUsersInGroupResponse>;
export type WebAuthnCredentialsQueryLimitType = number;
export interface ListWebAuthnCredentialsRequest {
  AccessToken: string | redacted.Redacted<string>;
  NextToken?: string;
  MaxResults?: number;
}
export const ListWebAuthnCredentialsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccessToken: SensitiveString,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
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
  identifier: "ListWebAuthnCredentialsRequest",
}) as any as S.Schema<ListWebAuthnCredentialsRequest>;
export type WebAuthnAuthenticatorAttachmentType = string;
export type WebAuthnAuthenticatorTransportType = string;
export type WebAuthnAuthenticatorTransportsList = string[];
export const WebAuthnAuthenticatorTransportsList = /*@__PURE__*/ S.Array(
  S.String,
);
export interface WebAuthnCredentialDescription {
  CredentialId: string;
  FriendlyCredentialName: string;
  RelyingPartyId: string;
  AuthenticatorAttachment?: string;
  AuthenticatorTransports: string[];
  CreatedAt: Date;
}
export const WebAuthnCredentialDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CredentialId: S.String,
    FriendlyCredentialName: S.String,
    RelyingPartyId: S.String,
    AuthenticatorAttachment: S.optional(S.String),
    AuthenticatorTransports: WebAuthnAuthenticatorTransportsList,
    CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "WebAuthnCredentialDescription",
}) as any as S.Schema<WebAuthnCredentialDescription>;
export type WebAuthnCredentialDescriptionListType =
  WebAuthnCredentialDescription[];
export const WebAuthnCredentialDescriptionListType = /*@__PURE__*/ S.Array(
  WebAuthnCredentialDescription,
);
export interface ListWebAuthnCredentialsResponse {
  Credentials: WebAuthnCredentialDescription[];
  NextToken?: string;
}
export const ListWebAuthnCredentialsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Credentials: WebAuthnCredentialDescriptionListType,
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListWebAuthnCredentialsResponse",
}) as any as S.Schema<ListWebAuthnCredentialsResponse>;
export interface ResendConfirmationCodeRequest {
  ClientId: string | redacted.Redacted<string>;
  SecretHash?: string | redacted.Redacted<string>;
  UserContextData?: UserContextDataType;
  Username: string | redacted.Redacted<string>;
  AnalyticsMetadata?: AnalyticsMetadataType;
  ClientMetadata?: { [key: string]: string | undefined };
}
export const ResendConfirmationCodeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientId: SensitiveString,
    SecretHash: S.optional(SensitiveString),
    UserContextData: S.optional(UserContextDataType),
    Username: SensitiveString,
    AnalyticsMetadata: S.optional(AnalyticsMetadataType),
    ClientMetadata: S.optional(ClientMetadataType),
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
  identifier: "ResendConfirmationCodeRequest",
}) as any as S.Schema<ResendConfirmationCodeRequest>;
export interface ResendConfirmationCodeResponse {
  CodeDeliveryDetails?: CodeDeliveryDetailsType;
}
export const ResendConfirmationCodeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CodeDeliveryDetails: S.optional(CodeDeliveryDetailsType) }).pipe(
    ns,
  ),
).annotate({
  identifier: "ResendConfirmationCodeResponse",
}) as any as S.Schema<ResendConfirmationCodeResponse>;
export interface RespondToAuthChallengeRequest {
  ClientId: string | redacted.Redacted<string>;
  ChallengeName: ChallengeNameType;
  Session?: string | redacted.Redacted<string>;
  ChallengeResponses?: { [key: string]: string | undefined };
  AnalyticsMetadata?: AnalyticsMetadataType;
  UserContextData?: UserContextDataType;
  ClientMetadata?: { [key: string]: string | undefined };
}
export const RespondToAuthChallengeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientId: SensitiveString,
    ChallengeName: ChallengeNameType,
    Session: S.optional(SensitiveString),
    ChallengeResponses: S.optional(ChallengeResponsesType),
    AnalyticsMetadata: S.optional(AnalyticsMetadataType),
    UserContextData: S.optional(UserContextDataType),
    ClientMetadata: S.optional(ClientMetadataType),
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
  identifier: "RespondToAuthChallengeRequest",
}) as any as S.Schema<RespondToAuthChallengeRequest>;
export interface RespondToAuthChallengeResponse {
  ChallengeName?: ChallengeNameType;
  Session?: string | redacted.Redacted<string>;
  ChallengeParameters?: { [key: string]: string | undefined };
  AuthenticationResult?: AuthenticationResultType;
}
export const RespondToAuthChallengeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChallengeName: S.optional(ChallengeNameType),
    Session: S.optional(SensitiveString),
    ChallengeParameters: S.optional(ChallengeParametersType),
    AuthenticationResult: S.optional(AuthenticationResultType),
  }).pipe(ns),
).annotate({
  identifier: "RespondToAuthChallengeResponse",
}) as any as S.Schema<RespondToAuthChallengeResponse>;
export interface RevokeTokenRequest {
  Token: string | redacted.Redacted<string>;
  ClientId: string | redacted.Redacted<string>;
  ClientSecret?: string | redacted.Redacted<string>;
}
export const RevokeTokenRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Token: SensitiveString,
    ClientId: SensitiveString,
    ClientSecret: S.optional(SensitiveString),
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
  identifier: "RevokeTokenRequest",
}) as any as S.Schema<RevokeTokenRequest>;
export interface RevokeTokenResponse {}
export const RevokeTokenResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "RevokeTokenResponse",
}) as any as S.Schema<RevokeTokenResponse>;
export interface SetLogDeliveryConfigurationRequest {
  UserPoolId: string;
  LogConfigurations: LogConfigurationType[];
}
export const SetLogDeliveryConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.String,
    LogConfigurations: LogConfigurationListType,
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
  identifier: "SetLogDeliveryConfigurationRequest",
}) as any as S.Schema<SetLogDeliveryConfigurationRequest>;
export interface SetLogDeliveryConfigurationResponse {
  LogDeliveryConfiguration?: LogDeliveryConfigurationType;
}
export const SetLogDeliveryConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LogDeliveryConfiguration: S.optional(LogDeliveryConfigurationType),
  }).pipe(ns),
).annotate({
  identifier: "SetLogDeliveryConfigurationResponse",
}) as any as S.Schema<SetLogDeliveryConfigurationResponse>;
export interface SetRiskConfigurationRequest {
  UserPoolId: string;
  ClientId?: string | redacted.Redacted<string>;
  CompromisedCredentialsRiskConfiguration?: CompromisedCredentialsRiskConfigurationType;
  AccountTakeoverRiskConfiguration?: AccountTakeoverRiskConfigurationType;
  RiskExceptionConfiguration?: RiskExceptionConfigurationType;
}
export const SetRiskConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.String,
    ClientId: S.optional(SensitiveString),
    CompromisedCredentialsRiskConfiguration: S.optional(
      CompromisedCredentialsRiskConfigurationType,
    ),
    AccountTakeoverRiskConfiguration: S.optional(
      AccountTakeoverRiskConfigurationType,
    ),
    RiskExceptionConfiguration: S.optional(RiskExceptionConfigurationType),
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
  identifier: "SetRiskConfigurationRequest",
}) as any as S.Schema<SetRiskConfigurationRequest>;
export interface SetRiskConfigurationResponse {
  RiskConfiguration: RiskConfigurationType;
}
export const SetRiskConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RiskConfiguration: RiskConfigurationType }).pipe(ns),
).annotate({
  identifier: "SetRiskConfigurationResponse",
}) as any as S.Schema<SetRiskConfigurationResponse>;
export type ImageFileType = Uint8Array;
export interface SetUICustomizationRequest {
  UserPoolId: string;
  ClientId?: string | redacted.Redacted<string>;
  CSS?: string;
  ImageFile?: Uint8Array;
}
export const SetUICustomizationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.String,
    ClientId: S.optional(SensitiveString),
    CSS: S.optional(S.String),
    ImageFile: S.optional(T.Blob),
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
  identifier: "SetUICustomizationRequest",
}) as any as S.Schema<SetUICustomizationRequest>;
export interface SetUICustomizationResponse {
  UICustomization: UICustomizationType;
}
export const SetUICustomizationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UICustomization: UICustomizationType }).pipe(ns),
).annotate({
  identifier: "SetUICustomizationResponse",
}) as any as S.Schema<SetUICustomizationResponse>;
export interface SetUserMFAPreferenceRequest {
  SMSMfaSettings?: SMSMfaSettingsType;
  SoftwareTokenMfaSettings?: SoftwareTokenMfaSettingsType;
  EmailMfaSettings?: EmailMfaSettingsType;
  WebAuthnMfaSettings?: WebAuthnMfaSettingsType;
  AccessToken: string | redacted.Redacted<string>;
}
export const SetUserMFAPreferenceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SMSMfaSettings: S.optional(SMSMfaSettingsType),
    SoftwareTokenMfaSettings: S.optional(SoftwareTokenMfaSettingsType),
    EmailMfaSettings: S.optional(EmailMfaSettingsType),
    WebAuthnMfaSettings: S.optional(WebAuthnMfaSettingsType),
    AccessToken: SensitiveString,
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
  identifier: "SetUserMFAPreferenceRequest",
}) as any as S.Schema<SetUserMFAPreferenceRequest>;
export interface SetUserMFAPreferenceResponse {}
export const SetUserMFAPreferenceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "SetUserMFAPreferenceResponse",
}) as any as S.Schema<SetUserMFAPreferenceResponse>;
export interface SetUserPoolMfaConfigRequest {
  UserPoolId: string;
  SmsMfaConfiguration?: SmsMfaConfigType;
  SoftwareTokenMfaConfiguration?: SoftwareTokenMfaConfigType;
  EmailMfaConfiguration?: EmailMfaConfigType;
  MfaConfiguration?: UserPoolMfaType;
  WebAuthnConfiguration?: WebAuthnConfigurationType;
}
export const SetUserPoolMfaConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.String,
    SmsMfaConfiguration: S.optional(SmsMfaConfigType),
    SoftwareTokenMfaConfiguration: S.optional(SoftwareTokenMfaConfigType),
    EmailMfaConfiguration: S.optional(EmailMfaConfigType),
    MfaConfiguration: S.optional(UserPoolMfaType),
    WebAuthnConfiguration: S.optional(WebAuthnConfigurationType),
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
  identifier: "SetUserPoolMfaConfigRequest",
}) as any as S.Schema<SetUserPoolMfaConfigRequest>;
export interface SetUserPoolMfaConfigResponse {
  SmsMfaConfiguration?: SmsMfaConfigType;
  SoftwareTokenMfaConfiguration?: SoftwareTokenMfaConfigType;
  EmailMfaConfiguration?: EmailMfaConfigType;
  MfaConfiguration?: UserPoolMfaType;
  WebAuthnConfiguration?: WebAuthnConfigurationType;
}
export const SetUserPoolMfaConfigResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SmsMfaConfiguration: S.optional(SmsMfaConfigType),
    SoftwareTokenMfaConfiguration: S.optional(SoftwareTokenMfaConfigType),
    EmailMfaConfiguration: S.optional(EmailMfaConfigType),
    MfaConfiguration: S.optional(UserPoolMfaType),
    WebAuthnConfiguration: S.optional(WebAuthnConfigurationType),
  }).pipe(ns),
).annotate({
  identifier: "SetUserPoolMfaConfigResponse",
}) as any as S.Schema<SetUserPoolMfaConfigResponse>;
export interface SetUserSettingsRequest {
  AccessToken: string | redacted.Redacted<string>;
  MFAOptions: MFAOptionType[];
}
export const SetUserSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccessToken: SensitiveString,
    MFAOptions: MFAOptionListType,
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
  identifier: "SetUserSettingsRequest",
}) as any as S.Schema<SetUserSettingsRequest>;
export interface SetUserSettingsResponse {}
export const SetUserSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "SetUserSettingsResponse",
}) as any as S.Schema<SetUserSettingsResponse>;
export interface SignUpRequest {
  ClientId: string | redacted.Redacted<string>;
  SecretHash?: string | redacted.Redacted<string>;
  Username: string | redacted.Redacted<string>;
  Password?: string | redacted.Redacted<string>;
  UserAttributes?: AttributeType[];
  ValidationData?: AttributeType[];
  AnalyticsMetadata?: AnalyticsMetadataType;
  UserContextData?: UserContextDataType;
  ClientMetadata?: { [key: string]: string | undefined };
}
export const SignUpRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientId: SensitiveString,
    SecretHash: S.optional(SensitiveString),
    Username: SensitiveString,
    Password: S.optional(SensitiveString),
    UserAttributes: S.optional(AttributeListType),
    ValidationData: S.optional(AttributeListType),
    AnalyticsMetadata: S.optional(AnalyticsMetadataType),
    UserContextData: S.optional(UserContextDataType),
    ClientMetadata: S.optional(ClientMetadataType),
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
).annotate({ identifier: "SignUpRequest" }) as any as S.Schema<SignUpRequest>;
export interface SignUpResponse {
  UserConfirmed: boolean;
  CodeDeliveryDetails?: CodeDeliveryDetailsType;
  UserSub: string;
  Session?: string | redacted.Redacted<string>;
}
export const SignUpResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserConfirmed: S.Boolean,
    CodeDeliveryDetails: S.optional(CodeDeliveryDetailsType),
    UserSub: S.String,
    Session: S.optional(SensitiveString),
  }).pipe(ns),
).annotate({ identifier: "SignUpResponse" }) as any as S.Schema<SignUpResponse>;
export interface StartUserImportJobRequest {
  UserPoolId: string;
  JobId: string;
}
export const StartUserImportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UserPoolId: S.String, JobId: S.String }).pipe(
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
  identifier: "StartUserImportJobRequest",
}) as any as S.Schema<StartUserImportJobRequest>;
export interface StartUserImportJobResponse {
  UserImportJob?: UserImportJobType;
}
export const StartUserImportJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UserImportJob: S.optional(UserImportJobType) }).pipe(ns),
).annotate({
  identifier: "StartUserImportJobResponse",
}) as any as S.Schema<StartUserImportJobResponse>;
export interface StartWebAuthnRegistrationRequest {
  AccessToken: string | redacted.Redacted<string>;
}
export const StartWebAuthnRegistrationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccessToken: SensitiveString }).pipe(
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
  identifier: "StartWebAuthnRegistrationRequest",
}) as any as S.Schema<StartWebAuthnRegistrationRequest>;
export interface StartWebAuthnRegistrationResponse {
  CredentialCreationOptions: any;
}
export const StartWebAuthnRegistrationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CredentialCreationOptions: S.Any }).pipe(ns),
).annotate({
  identifier: "StartWebAuthnRegistrationResponse",
}) as any as S.Schema<StartWebAuthnRegistrationResponse>;
export interface StopUserImportJobRequest {
  UserPoolId: string;
  JobId: string;
}
export const StopUserImportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UserPoolId: S.String, JobId: S.String }).pipe(
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
  identifier: "StopUserImportJobRequest",
}) as any as S.Schema<StopUserImportJobRequest>;
export interface StopUserImportJobResponse {
  UserImportJob?: UserImportJobType;
}
export const StopUserImportJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UserImportJob: S.optional(UserImportJobType) }).pipe(ns),
).annotate({
  identifier: "StopUserImportJobResponse",
}) as any as S.Schema<StopUserImportJobResponse>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String, Tags: UserPoolTagsType }).pipe(
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
  identifier: "TagResourceRequest",
}) as any as S.Schema<TagResourceRequest>;
export interface TagResourceResponse {}
export const TagResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "TagResourceResponse",
}) as any as S.Schema<TagResourceResponse>;
export type UserPoolTagsListType = string[];
export const UserPoolTagsListType = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String, TagKeys: UserPoolTagsListType }).pipe(
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
  identifier: "UntagResourceRequest",
}) as any as S.Schema<UntagResourceRequest>;
export interface UntagResourceResponse {}
export const UntagResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export interface UpdateAuthEventFeedbackRequest {
  UserPoolId: string;
  Username: string | redacted.Redacted<string>;
  EventId: string;
  FeedbackToken: string | redacted.Redacted<string>;
  FeedbackValue: FeedbackValueType;
}
export const UpdateAuthEventFeedbackRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.String,
    Username: SensitiveString,
    EventId: S.String,
    FeedbackToken: SensitiveString,
    FeedbackValue: FeedbackValueType,
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
  identifier: "UpdateAuthEventFeedbackRequest",
}) as any as S.Schema<UpdateAuthEventFeedbackRequest>;
export interface UpdateAuthEventFeedbackResponse {}
export const UpdateAuthEventFeedbackResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateAuthEventFeedbackResponse",
}) as any as S.Schema<UpdateAuthEventFeedbackResponse>;
export interface UpdateDeviceStatusRequest {
  AccessToken: string | redacted.Redacted<string>;
  DeviceKey: string;
  DeviceRememberedStatus?: DeviceRememberedStatusType;
}
export const UpdateDeviceStatusRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccessToken: SensitiveString,
    DeviceKey: S.String,
    DeviceRememberedStatus: S.optional(DeviceRememberedStatusType),
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
  identifier: "UpdateDeviceStatusRequest",
}) as any as S.Schema<UpdateDeviceStatusRequest>;
export interface UpdateDeviceStatusResponse {}
export const UpdateDeviceStatusResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateDeviceStatusResponse",
}) as any as S.Schema<UpdateDeviceStatusResponse>;
export interface UpdateGroupRequest {
  GroupName: string;
  UserPoolId: string;
  Description?: string;
  RoleArn?: string;
  Precedence?: number;
}
export const UpdateGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupName: S.String,
    UserPoolId: S.String,
    Description: S.optional(S.String),
    RoleArn: S.optional(S.String),
    Precedence: S.optional(S.Number),
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
  identifier: "UpdateGroupRequest",
}) as any as S.Schema<UpdateGroupRequest>;
export interface UpdateGroupResponse {
  Group?: GroupType;
}
export const UpdateGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Group: S.optional(GroupType) }).pipe(ns),
).annotate({
  identifier: "UpdateGroupResponse",
}) as any as S.Schema<UpdateGroupResponse>;
export interface UpdateIdentityProviderRequest {
  UserPoolId: string;
  ProviderName: string;
  ProviderDetails?: { [key: string]: string | undefined };
  AttributeMapping?: { [key: string]: string | undefined };
  IdpIdentifiers?: string[];
}
export const UpdateIdentityProviderRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.String,
    ProviderName: S.String,
    ProviderDetails: S.optional(ProviderDetailsType),
    AttributeMapping: S.optional(AttributeMappingType),
    IdpIdentifiers: S.optional(IdpIdentifiersListType),
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
  identifier: "UpdateIdentityProviderRequest",
}) as any as S.Schema<UpdateIdentityProviderRequest>;
export interface UpdateIdentityProviderResponse {
  IdentityProvider: IdentityProviderType;
}
export const UpdateIdentityProviderResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IdentityProvider: IdentityProviderType }).pipe(ns),
).annotate({
  identifier: "UpdateIdentityProviderResponse",
}) as any as S.Schema<UpdateIdentityProviderResponse>;
export interface UpdateManagedLoginBrandingRequest {
  UserPoolId?: string;
  ManagedLoginBrandingId?: string;
  UseCognitoProvidedValues?: boolean;
  Settings?: any;
  Assets?: AssetType[];
}
export const UpdateManagedLoginBrandingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.optional(S.String),
    ManagedLoginBrandingId: S.optional(S.String),
    UseCognitoProvidedValues: S.optional(S.Boolean),
    Settings: S.optional(S.Any),
    Assets: S.optional(AssetListType),
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
  identifier: "UpdateManagedLoginBrandingRequest",
}) as any as S.Schema<UpdateManagedLoginBrandingRequest>;
export interface UpdateManagedLoginBrandingResponse {
  ManagedLoginBranding?: ManagedLoginBrandingType;
}
export const UpdateManagedLoginBrandingResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ManagedLoginBranding: S.optional(ManagedLoginBrandingType) }).pipe(
    ns,
  ),
).annotate({
  identifier: "UpdateManagedLoginBrandingResponse",
}) as any as S.Schema<UpdateManagedLoginBrandingResponse>;
export interface UpdateResourceServerRequest {
  UserPoolId: string;
  Identifier: string;
  Name: string;
  Scopes?: ResourceServerScopeType[];
}
export const UpdateResourceServerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.String,
    Identifier: S.String,
    Name: S.String,
    Scopes: S.optional(ResourceServerScopeListType),
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
  identifier: "UpdateResourceServerRequest",
}) as any as S.Schema<UpdateResourceServerRequest>;
export interface UpdateResourceServerResponse {
  ResourceServer: ResourceServerType;
}
export const UpdateResourceServerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceServer: ResourceServerType }).pipe(ns),
).annotate({
  identifier: "UpdateResourceServerResponse",
}) as any as S.Schema<UpdateResourceServerResponse>;
export interface UpdateTermsRequest {
  TermsId: string;
  UserPoolId: string;
  TermsName?: string;
  TermsSource?: TermsSourceType;
  Enforcement?: TermsEnforcementType;
  Links?: { [key: string]: string | undefined };
}
export const UpdateTermsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TermsId: S.String,
    UserPoolId: S.String,
    TermsName: S.optional(S.String),
    TermsSource: S.optional(TermsSourceType),
    Enforcement: S.optional(TermsEnforcementType),
    Links: S.optional(LinksType),
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
  identifier: "UpdateTermsRequest",
}) as any as S.Schema<UpdateTermsRequest>;
export interface UpdateTermsResponse {
  Terms?: TermsType;
}
export const UpdateTermsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Terms: S.optional(TermsType) }).pipe(ns),
).annotate({
  identifier: "UpdateTermsResponse",
}) as any as S.Schema<UpdateTermsResponse>;
export interface UpdateUserAttributesRequest {
  UserAttributes: AttributeType[];
  AccessToken: string | redacted.Redacted<string>;
  ClientMetadata?: { [key: string]: string | undefined };
}
export const UpdateUserAttributesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserAttributes: AttributeListType,
    AccessToken: SensitiveString,
    ClientMetadata: S.optional(ClientMetadataType),
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
  identifier: "UpdateUserAttributesRequest",
}) as any as S.Schema<UpdateUserAttributesRequest>;
export type CodeDeliveryDetailsListType = CodeDeliveryDetailsType[];
export const CodeDeliveryDetailsListType = /*@__PURE__*/ S.Array(
  CodeDeliveryDetailsType,
);
export interface UpdateUserAttributesResponse {
  CodeDeliveryDetailsList?: CodeDeliveryDetailsType[];
}
export const UpdateUserAttributesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CodeDeliveryDetailsList: S.optional(CodeDeliveryDetailsListType),
  }).pipe(ns),
).annotate({
  identifier: "UpdateUserAttributesResponse",
}) as any as S.Schema<UpdateUserAttributesResponse>;
export interface UpdateUserPoolRequest {
  UserPoolId: string;
  Policies?: UserPoolPolicyType;
  DeletionProtection?: DeletionProtectionType;
  LambdaConfig?: LambdaConfigType;
  AutoVerifiedAttributes?: VerifiedAttributeType[];
  SmsVerificationMessage?: string;
  EmailVerificationMessage?: string;
  EmailVerificationSubject?: string;
  VerificationMessageTemplate?: VerificationMessageTemplateType;
  SmsAuthenticationMessage?: string;
  UserAttributeUpdateSettings?: UserAttributeUpdateSettingsType;
  MfaConfiguration?: UserPoolMfaType;
  DeviceConfiguration?: DeviceConfigurationType;
  EmailConfiguration?: EmailConfigurationType;
  SmsConfiguration?: SmsConfigurationType;
  UserPoolTags?: { [key: string]: string | undefined };
  AdminCreateUserConfig?: AdminCreateUserConfigType;
  UserPoolAddOns?: UserPoolAddOnsType;
  AccountRecoverySetting?: AccountRecoverySettingType;
  PoolName?: string;
  UserPoolTier?: UserPoolTierType;
  KeyConfiguration?: KeyConfigurationType;
  IssuerConfiguration?: IssuerConfigurationType;
}
export const UpdateUserPoolRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.String,
    Policies: S.optional(UserPoolPolicyType),
    DeletionProtection: S.optional(DeletionProtectionType),
    LambdaConfig: S.optional(LambdaConfigType),
    AutoVerifiedAttributes: S.optional(VerifiedAttributesListType),
    SmsVerificationMessage: S.optional(S.String),
    EmailVerificationMessage: S.optional(S.String),
    EmailVerificationSubject: S.optional(S.String),
    VerificationMessageTemplate: S.optional(VerificationMessageTemplateType),
    SmsAuthenticationMessage: S.optional(S.String),
    UserAttributeUpdateSettings: S.optional(UserAttributeUpdateSettingsType),
    MfaConfiguration: S.optional(UserPoolMfaType),
    DeviceConfiguration: S.optional(DeviceConfigurationType),
    EmailConfiguration: S.optional(EmailConfigurationType),
    SmsConfiguration: S.optional(SmsConfigurationType),
    UserPoolTags: S.optional(UserPoolTagsType),
    AdminCreateUserConfig: S.optional(AdminCreateUserConfigType),
    UserPoolAddOns: S.optional(UserPoolAddOnsType),
    AccountRecoverySetting: S.optional(AccountRecoverySettingType),
    PoolName: S.optional(S.String),
    UserPoolTier: S.optional(UserPoolTierType),
    KeyConfiguration: S.optional(KeyConfigurationType),
    IssuerConfiguration: S.optional(IssuerConfigurationType),
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
  identifier: "UpdateUserPoolRequest",
}) as any as S.Schema<UpdateUserPoolRequest>;
export interface UpdateUserPoolResponse {}
export const UpdateUserPoolResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateUserPoolResponse",
}) as any as S.Schema<UpdateUserPoolResponse>;
export interface UpdateUserPoolClientRequest {
  UserPoolId: string;
  ClientId: string | redacted.Redacted<string>;
  ClientName?: string;
  RefreshTokenValidity?: number;
  AccessTokenValidity?: number;
  IdTokenValidity?: number;
  TokenValidityUnits?: TokenValidityUnitsType;
  ReadAttributes?: string[];
  WriteAttributes?: string[];
  ExplicitAuthFlows?: ExplicitAuthFlowsType[];
  SupportedIdentityProviders?: string[];
  CallbackURLs?: string[];
  LogoutURLs?: string[];
  DefaultRedirectURI?: string;
  AllowedOAuthFlows?: OAuthFlowType[];
  AllowedOAuthScopes?: string[];
  AllowedOAuthFlowsUserPoolClient?: boolean;
  AnalyticsConfiguration?: AnalyticsConfigurationType;
  PreventUserExistenceErrors?: PreventUserExistenceErrorTypes;
  EnableTokenRevocation?: boolean;
  EnablePropagateAdditionalUserContextData?: boolean;
  AuthSessionValidity?: number;
  RefreshTokenRotation?: RefreshTokenRotationType;
}
export const UpdateUserPoolClientRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.String,
    ClientId: SensitiveString,
    ClientName: S.optional(S.String),
    RefreshTokenValidity: S.optional(S.Number),
    AccessTokenValidity: S.optional(S.Number),
    IdTokenValidity: S.optional(S.Number),
    TokenValidityUnits: S.optional(TokenValidityUnitsType),
    ReadAttributes: S.optional(ClientPermissionListType),
    WriteAttributes: S.optional(ClientPermissionListType),
    ExplicitAuthFlows: S.optional(ExplicitAuthFlowsListType),
    SupportedIdentityProviders: S.optional(SupportedIdentityProvidersListType),
    CallbackURLs: S.optional(CallbackURLsListType),
    LogoutURLs: S.optional(LogoutURLsListType),
    DefaultRedirectURI: S.optional(S.String),
    AllowedOAuthFlows: S.optional(OAuthFlowsType),
    AllowedOAuthScopes: S.optional(ScopeListType),
    AllowedOAuthFlowsUserPoolClient: S.optional(S.Boolean),
    AnalyticsConfiguration: S.optional(AnalyticsConfigurationType),
    PreventUserExistenceErrors: S.optional(PreventUserExistenceErrorTypes),
    EnableTokenRevocation: S.optional(S.Boolean),
    EnablePropagateAdditionalUserContextData: S.optional(S.Boolean),
    AuthSessionValidity: S.optional(S.Number),
    RefreshTokenRotation: S.optional(RefreshTokenRotationType),
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
  identifier: "UpdateUserPoolClientRequest",
}) as any as S.Schema<UpdateUserPoolClientRequest>;
export interface UpdateUserPoolClientResponse {
  UserPoolClient?: UserPoolClientType;
}
export const UpdateUserPoolClientResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UserPoolClient: S.optional(UserPoolClientType) }).pipe(ns),
).annotate({
  identifier: "UpdateUserPoolClientResponse",
}) as any as S.Schema<UpdateUserPoolClientResponse>;
export interface UpdateUserPoolDomainRequest {
  Domain: string;
  UserPoolId: string;
  ManagedLoginVersion?: number;
  CustomDomainConfig?: CustomDomainConfigType;
  Routing?: RoutingType;
}
export const UpdateUserPoolDomainRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Domain: S.String,
    UserPoolId: S.String,
    ManagedLoginVersion: S.optional(S.Number),
    CustomDomainConfig: S.optional(CustomDomainConfigType),
    Routing: S.optional(RoutingType),
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
  identifier: "UpdateUserPoolDomainRequest",
}) as any as S.Schema<UpdateUserPoolDomainRequest>;
export interface UpdateUserPoolDomainResponse {
  ManagedLoginVersion?: number;
  CloudFrontDomain?: string;
  Routing?: RoutingType;
}
export const UpdateUserPoolDomainResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ManagedLoginVersion: S.optional(S.Number),
    CloudFrontDomain: S.optional(S.String),
    Routing: S.optional(RoutingType),
  }).pipe(ns),
).annotate({
  identifier: "UpdateUserPoolDomainResponse",
}) as any as S.Schema<UpdateUserPoolDomainResponse>;
export type UpdateReplicaStatusType = "ACTIVE" | "INACTIVE" | (string & {});
export const UpdateReplicaStatusType = /*@__PURE__*/ S.String;

export interface UpdateUserPoolReplicaRequest {
  UserPoolId: string;
  RegionName: string;
  Status: UpdateReplicaStatusType;
}
export const UpdateUserPoolReplicaRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolId: S.String,
    RegionName: S.String,
    Status: UpdateReplicaStatusType,
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
  identifier: "UpdateUserPoolReplicaRequest",
}) as any as S.Schema<UpdateUserPoolReplicaRequest>;
export interface UpdateUserPoolReplicaResponse {
  UserPoolReplica?: UserPoolReplicaType;
}
export const UpdateUserPoolReplicaResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UserPoolReplica: S.optional(UserPoolReplicaType) }).pipe(ns),
).annotate({
  identifier: "UpdateUserPoolReplicaResponse",
}) as any as S.Schema<UpdateUserPoolReplicaResponse>;
export type SoftwareTokenMFAUserCodeType = string | redacted.Redacted<string>;
export interface VerifySoftwareTokenRequest {
  AccessToken?: string | redacted.Redacted<string>;
  Session?: string | redacted.Redacted<string>;
  UserCode: string | redacted.Redacted<string>;
  FriendlyDeviceName?: string;
}
export const VerifySoftwareTokenRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccessToken: S.optional(SensitiveString),
    Session: S.optional(SensitiveString),
    UserCode: SensitiveString,
    FriendlyDeviceName: S.optional(S.String),
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
  identifier: "VerifySoftwareTokenRequest",
}) as any as S.Schema<VerifySoftwareTokenRequest>;
export type VerifySoftwareTokenResponseType =
  | "SUCCESS"
  | "ERROR"
  | (string & {});
export const VerifySoftwareTokenResponseType = /*@__PURE__*/ S.String;

export interface VerifySoftwareTokenResponse {
  Status?: VerifySoftwareTokenResponseType;
  Session?: string | redacted.Redacted<string>;
}
export const VerifySoftwareTokenResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(VerifySoftwareTokenResponseType),
    Session: S.optional(SensitiveString),
  }).pipe(ns),
).annotate({
  identifier: "VerifySoftwareTokenResponse",
}) as any as S.Schema<VerifySoftwareTokenResponse>;
export interface VerifyUserAttributeRequest {
  AccessToken: string | redacted.Redacted<string>;
  AttributeName: string;
  Code: string;
}
export const VerifyUserAttributeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccessToken: SensitiveString,
    AttributeName: S.String,
    Code: S.String,
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
  identifier: "VerifyUserAttributeRequest",
}) as any as S.Schema<VerifyUserAttributeRequest>;
export interface VerifyUserAttributeResponse {}
export const VerifyUserAttributeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "VerifyUserAttributeResponse",
}) as any as S.Schema<VerifyUserAttributeResponse>;
export type MessageType = string;
export type InvalidParameterExceptionReasonCodeType = string;
export type AddCustomAttributesError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserImportInProgressException
  | CommonErrors;
/**
 * Adds additional user attributes to the user pool schema. Custom attributes can be
 * mutable or immutable and have a `custom:` or `dev:` prefix. For
 * more information, see Custom attributes.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const addCustomAttributes: API.OperationMethod<
  AddCustomAttributesRequest,
  AddCustomAttributesResponse,
  AddCustomAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AddCustomAttributesRequest,
  output: AddCustomAttributesResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserImportInProgressException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddCustomAttributes",
}));

export type AddUserPoolClientSecretError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterException
  | LimitExceededException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new client secret for an existing confidential user pool app client. Supports up to 2 active secrets per app client for zero-downtime credential rotation workflows.
 */
export const addUserPoolClientSecret: API.OperationMethod<
  AddUserPoolClientSecretRequest,
  AddUserPoolClientSecretResponse,
  AddUserPoolClientSecretError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AddUserPoolClientSecretRequest,
  output: AddUserPoolClientSecretResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterException,
    LimitExceededException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddUserPoolClientSecret",
}));

export type AdminAddUserToGroupError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotFoundException
  | CommonErrors;
/**
 * Adds a user to a group. A user who is in a group can present a preferred-role claim to
 * an identity pool, and populates a `cognito:groups` claim to their access and
 * identity tokens.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const adminAddUserToGroup: API.OperationMethod<
  AdminAddUserToGroupRequest,
  AdminAddUserToGroupResponse,
  AdminAddUserToGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AdminAddUserToGroupRequest,
  output: AdminAddUserToGroupResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdminAddUserToGroup",
}));

export type AdminConfirmSignUpError =
  | InternalErrorException
  | InvalidLambdaResponseException
  | InvalidParameterException
  | LimitExceededException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyFailedAttemptsException
  | TooManyRequestsException
  | UnexpectedLambdaException
  | UserLambdaValidationException
  | UserNotFoundException
  | CommonErrors;
/**
 * Confirms user sign-up as an administrator.
 *
 * This request sets a user account active in a user pool that requires confirmation of new user accounts before they can sign in. You can
 * configure your user pool to not send confirmation codes to new users and instead confirm
 * them with this API operation on the back end.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 *
 * To configure your user pool to require administrative confirmation of users, set
 * `AllowAdminCreateUserOnly` to `true` in a
 * `CreateUserPool` or `UpdateUserPool` request.
 */
export const adminConfirmSignUp: API.OperationMethod<
  AdminConfirmSignUpRequest,
  AdminConfirmSignUpResponse,
  AdminConfirmSignUpError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AdminConfirmSignUpRequest,
  output: AdminConfirmSignUpResponse,
  errors: [
    InternalErrorException,
    InvalidLambdaResponseException,
    InvalidParameterException,
    LimitExceededException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyFailedAttemptsException,
    TooManyRequestsException,
    UnexpectedLambdaException,
    UserLambdaValidationException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdminConfirmSignUp",
}));

export type AdminCreateUserError =
  | CodeDeliveryFailureException
  | InternalErrorException
  | InvalidLambdaResponseException
  | InvalidParameterException
  | InvalidPasswordException
  | InvalidSmsRoleAccessPolicyException
  | InvalidSmsRoleTrustRelationshipException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UnexpectedLambdaException
  | UnsupportedUserStateException
  | UserLambdaValidationException
  | UsernameExistsException
  | UserNotFoundException
  | CommonErrors;
/**
 * Creates a new user in the specified user pool.
 *
 * If `MessageAction` isn't set, the default is to send a welcome message via
 * email or phone (SMS).
 *
 * This message is based on a template that you configured in your call to create or
 * update a user pool. This template includes your custom sign-up instructions and
 * placeholders for user name and temporary password.
 *
 * Alternatively, you can call `AdminCreateUser` with `SUPPRESS`
 * for the `MessageAction` parameter, and Amazon Cognito won't send any email.
 *
 * In either case, if the user has a password, they will be in the
 * `FORCE_CHANGE_PASSWORD` state until they sign in and set their password.
 * Your invitation message template must have the `{####}` password placeholder
 * if your users have passwords. If your template doesn't have this placeholder, Amazon Cognito
 * doesn't deliver the invitation message. In this case, you must update your message
 * template and resend the password with a new `AdminCreateUser` request with a
 * `MessageAction` value of `RESEND`.
 *
 * This action might generate an SMS text message. Starting June 1, 2021, US telecom carriers
 * require you to register an origination phone number before you can send SMS messages
 * to US phone numbers. If you use SMS text messages in Amazon Cognito, you must register a
 * phone number with Amazon Pinpoint.
 * Amazon Cognito uses the registered number automatically. Otherwise, Amazon Cognito users who must
 * receive SMS messages might not be able to sign up, activate their accounts, or sign
 * in.
 *
 * If you have never used SMS text messages with Amazon Cognito or any other Amazon Web Services service,
 * Amazon Simple Notification Service might place your account in the SMS sandbox. In
 * sandbox
 * mode
 * , you can send messages only to verified phone
 * numbers. After you test your app while in the sandbox environment, you can move out
 * of the sandbox and into production. For more information, see SMS message settings for Amazon Cognito user pools in the Amazon Cognito
 * Developer Guide.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const adminCreateUser: API.OperationMethod<
  AdminCreateUserRequest,
  AdminCreateUserResponse,
  AdminCreateUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AdminCreateUserRequest,
  output: AdminCreateUserResponse,
  errors: [
    CodeDeliveryFailureException,
    InternalErrorException,
    InvalidLambdaResponseException,
    InvalidParameterException,
    InvalidPasswordException,
    InvalidSmsRoleAccessPolicyException,
    InvalidSmsRoleTrustRelationshipException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UnexpectedLambdaException,
    UnsupportedUserStateException,
    UserLambdaValidationException,
    UsernameExistsException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdminCreateUser",
}));

export type AdminDeleteUserError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotFoundException
  | CommonErrors;
/**
 * Deletes a user profile in your user pool.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const adminDeleteUser: API.OperationMethod<
  AdminDeleteUserRequest,
  AdminDeleteUserResponse,
  AdminDeleteUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AdminDeleteUserRequest,
  output: AdminDeleteUserResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdminDeleteUser",
}));

export type AdminDeleteUserAttributesError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotFoundException
  | CommonErrors;
/**
 * Deletes attribute values from a user. This operation doesn't affect tokens for
 * existing user sessions. The next ID token that the user receives will no longer have the
 * deleted attributes.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const adminDeleteUserAttributes: API.OperationMethod<
  AdminDeleteUserAttributesRequest,
  AdminDeleteUserAttributesResponse,
  AdminDeleteUserAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AdminDeleteUserAttributesRequest,
  output: AdminDeleteUserAttributesResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdminDeleteUserAttributes",
}));

export type AdminDisableProviderForUserError =
  | AliasExistsException
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotFoundException
  | CommonErrors;
/**
 * Prevents the user from signing in with the specified external (SAML or social)
 * identity provider (IdP). If the user that you want to deactivate is a Amazon Cognito user pools
 * native username + password user, they can't use their password to sign in. If the user
 * to deactivate is a linked external IdP user, any link between that user and an existing
 * user is removed. When the external user signs in again, and the user is no longer
 * attached to the previously linked `DestinationUser`, the user must create a
 * new user account.
 *
 * The value of `ProviderName` must match the name of a user pool IdP.
 *
 * To deactivate a local user, set `ProviderName` to `Cognito` and
 * the `ProviderAttributeName` to `Cognito_Subject`. The
 * `ProviderAttributeValue` must be user's local username.
 *
 * The `ProviderAttributeName` must always be `Cognito_Subject` for
 * social IdPs. The `ProviderAttributeValue` must always be the exact subject
 * that was used when the user was originally linked as a source user.
 *
 * For de-linking a SAML identity, there are two scenarios. If the linked identity has
 * not yet been used to sign in, the `ProviderAttributeName` and
 * `ProviderAttributeValue` must be the same values that were used for the
 * `SourceUser` when the identities were originally linked using
 * AdminLinkProviderForUser call. This is also true if the linking was done with
 * `ProviderAttributeName` set to `Cognito_Subject`. If the user
 * has already signed in, the `ProviderAttributeName` must be
 * `Cognito_Subject` and `ProviderAttributeValue` must be the
 * `NameID` from their SAML assertion.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const adminDisableProviderForUser: API.OperationMethod<
  AdminDisableProviderForUserRequest,
  AdminDisableProviderForUserResponse,
  AdminDisableProviderForUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AdminDisableProviderForUserRequest,
  output: AdminDisableProviderForUserResponse,
  errors: [
    AliasExistsException,
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdminDisableProviderForUser",
}));

export type AdminDisableUserError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotFoundException
  | CommonErrors;
/**
 * Deactivates a user profile and revokes all access tokens for the user. A deactivated
 * user can't sign in, but still appears in the responses to `ListUsers`
 * API requests.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const adminDisableUser: API.OperationMethod<
  AdminDisableUserRequest,
  AdminDisableUserResponse,
  AdminDisableUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AdminDisableUserRequest,
  output: AdminDisableUserResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdminDisableUser",
}));

export type AdminEnableUserError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotFoundException
  | CommonErrors;
/**
 * Activates sign-in for a user profile that previously had sign-in access
 * disabled.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const adminEnableUser: API.OperationMethod<
  AdminEnableUserRequest,
  AdminEnableUserResponse,
  AdminEnableUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AdminEnableUserRequest,
  output: AdminEnableUserResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdminEnableUser",
}));

export type AdminForgetDeviceError =
  | InternalErrorException
  | InvalidParameterException
  | InvalidUserPoolConfigurationException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotFoundException
  | CommonErrors;
/**
 * Forgets, or deletes, a remembered device from a user's profile. After you forget
 * the device, the user can no longer complete device authentication with that device and
 * when applicable, must submit MFA codes again. For more information, see Working with devices.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const adminForgetDevice: API.OperationMethod<
  AdminForgetDeviceRequest,
  AdminForgetDeviceResponse,
  AdminForgetDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AdminForgetDeviceRequest,
  output: AdminForgetDeviceResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    InvalidUserPoolConfigurationException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdminForgetDevice",
}));

export type AdminGetDeviceError =
  | InternalErrorException
  | InvalidParameterException
  | InvalidUserPoolConfigurationException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Given the device key, returns details for a user's device. For more information,
 * see Working with devices.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const adminGetDevice: API.OperationMethod<
  AdminGetDeviceRequest,
  AdminGetDeviceResponse,
  AdminGetDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AdminGetDeviceRequest,
  output: AdminGetDeviceResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    InvalidUserPoolConfigurationException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdminGetDevice",
}));

export type AdminGetUserError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotFoundException
  | CommonErrors;
/**
 * Given a username, returns details about a user profile in a user pool. You can specify
 * alias attributes in the `Username` request parameter.
 *
 * This operation contributes to your monthly active user (MAU) count for the purpose of
 * billing.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const adminGetUser: API.OperationMethod<
  AdminGetUserRequest,
  AdminGetUserResponse,
  AdminGetUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AdminGetUserRequest,
  output: AdminGetUserResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdminGetUser",
}));

export type AdminInitiateAuthError =
  | InternalErrorException
  | InvalidEmailRoleAccessPolicyException
  | InvalidLambdaResponseException
  | InvalidParameterException
  | InvalidSmsRoleAccessPolicyException
  | InvalidSmsRoleTrustRelationshipException
  | InvalidUserPoolConfigurationException
  | MFAMethodNotFoundException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordResetRequiredException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UnexpectedLambdaException
  | UnsupportedOperationException
  | UserLambdaValidationException
  | UserNotConfirmedException
  | UserNotFoundException
  | CommonErrors;
/**
 * Starts sign-in for applications with a server-side component, for example a
 * traditional web application. This operation specifies the authentication flow that
 * you'd like to begin. The authentication flow that you specify must be supported in
 * your app client configuration. For more information about authentication flows, see
 * Authentication flows.
 *
 * This action might generate an SMS text message. Starting June 1, 2021, US telecom carriers
 * require you to register an origination phone number before you can send SMS messages
 * to US phone numbers. If you use SMS text messages in Amazon Cognito, you must register a
 * phone number with Amazon Pinpoint.
 * Amazon Cognito uses the registered number automatically. Otherwise, Amazon Cognito users who must
 * receive SMS messages might not be able to sign up, activate their accounts, or sign
 * in.
 *
 * If you have never used SMS text messages with Amazon Cognito or any other Amazon Web Services service,
 * Amazon Simple Notification Service might place your account in the SMS sandbox. In
 * sandbox
 * mode
 * , you can send messages only to verified phone
 * numbers. After you test your app while in the sandbox environment, you can move out
 * of the sandbox and into production. For more information, see SMS message settings for Amazon Cognito user pools in the Amazon Cognito
 * Developer Guide.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const adminInitiateAuth: API.OperationMethod<
  AdminInitiateAuthRequest,
  AdminInitiateAuthResponse,
  AdminInitiateAuthError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AdminInitiateAuthRequest,
  output: AdminInitiateAuthResponse,
  errors: [
    InternalErrorException,
    InvalidEmailRoleAccessPolicyException,
    InvalidLambdaResponseException,
    InvalidParameterException,
    InvalidSmsRoleAccessPolicyException,
    InvalidSmsRoleTrustRelationshipException,
    InvalidUserPoolConfigurationException,
    MFAMethodNotFoundException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordResetRequiredException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UnexpectedLambdaException,
    UnsupportedOperationException,
    UserLambdaValidationException,
    UserNotConfirmedException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdminInitiateAuth",
}));

export type AdminLinkProviderForUserError =
  | AliasExistsException
  | InternalErrorException
  | InvalidParameterException
  | LimitExceededException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotFoundException
  | CommonErrors;
/**
 * Links an existing user account in a user pool, or `DestinationUser`, to an
 * identity from an external IdP, or `SourceUser`, based on a specified
 * attribute name and value from the external IdP.
 *
 * This operation connects a local user profile with a user identity who hasn't yet
 * signed in from their third-party IdP. When the user signs in with their IdP, they get
 * access-control configuration from the local user profile. Linked local users can also
 * sign in with SDK-based API operations like `InitiateAuth` after they sign in
 * at least once through their IdP. For more information, see Linking federated users.
 *
 * The maximum number of federated identities linked to a user is five.
 *
 * Because this API allows a user with an external federated identity to sign in as a
 * local user, it is critical that it only be used with external IdPs and linked
 * attributes that you trust.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const adminLinkProviderForUser: API.OperationMethod<
  AdminLinkProviderForUserRequest,
  AdminLinkProviderForUserResponse,
  AdminLinkProviderForUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AdminLinkProviderForUserRequest,
  output: AdminLinkProviderForUserResponse,
  errors: [
    AliasExistsException,
    InternalErrorException,
    InvalidParameterException,
    LimitExceededException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdminLinkProviderForUser",
}));

export type AdminListDevicesError =
  | InternalErrorException
  | InvalidParameterException
  | InvalidUserPoolConfigurationException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists a user's registered devices. Remembered devices are used in authentication
 * services where you offer a "Remember me" option for users who you want to permit to sign
 * in without MFA from a trusted device. Users can bypass MFA while your application
 * performs device SRP authentication on the back end. For more information, see Working with devices.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const adminListDevices: API.OperationMethod<
  AdminListDevicesRequest,
  AdminListDevicesResponse,
  AdminListDevicesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AdminListDevicesRequest,
  output: AdminListDevicesResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    InvalidUserPoolConfigurationException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdminListDevices",
}));

export type AdminListGroupsForUserError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotFoundException
  | CommonErrors;
/**
 * Lists the groups that a user belongs to. User pool groups are identifiers that you can
 * reference from the contents of ID and access tokens, and set preferred IAM roles for
 * identity-pool authentication. For more information, see Adding groups to a user pool.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const adminListGroupsForUser: API.PaginatedOperationMethod<
  AdminListGroupsForUserRequest,
  AdminListGroupsForUserResponse,
  AdminListGroupsForUserError,
  Credentials | HttpClient.HttpClient,
  GroupType
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: AdminListGroupsForUserRequest,
  output: AdminListGroupsForUserResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdminListGroupsForUser",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Groups",
    pageSize: "Limit",
  } as const,
})) as any;

export type AdminListUserAuthEventsError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotFoundException
  | UserPoolAddOnNotEnabledException
  | CommonErrors;
/**
 * Requests a history of user activity and any risks detected as part of Amazon Cognito threat
 * protection. For more information, see Viewing user event history.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const adminListUserAuthEvents: API.PaginatedOperationMethod<
  AdminListUserAuthEventsRequest,
  AdminListUserAuthEventsResponse,
  AdminListUserAuthEventsError,
  Credentials | HttpClient.HttpClient,
  AuthEventType
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: AdminListUserAuthEventsRequest,
  output: AdminListUserAuthEventsResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotFoundException,
    UserPoolAddOnNotEnabledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdminListUserAuthEvents",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AuthEvents",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type AdminRemoveUserFromGroupError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotFoundException
  | CommonErrors;
/**
 * Given a username and a group name, removes them from the group. User pool groups are
 * identifiers that you can reference from the contents of ID and access tokens, and set
 * preferred IAM roles for identity-pool authentication. For more information, see Adding groups to a user pool.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const adminRemoveUserFromGroup: API.OperationMethod<
  AdminRemoveUserFromGroupRequest,
  AdminRemoveUserFromGroupResponse,
  AdminRemoveUserFromGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AdminRemoveUserFromGroupRequest,
  output: AdminRemoveUserFromGroupResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdminRemoveUserFromGroup",
}));

export type AdminResetUserPasswordError =
  | InternalErrorException
  | InvalidEmailRoleAccessPolicyException
  | InvalidLambdaResponseException
  | InvalidParameterException
  | InvalidSmsRoleAccessPolicyException
  | InvalidSmsRoleTrustRelationshipException
  | LimitExceededException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UnexpectedLambdaException
  | UserLambdaValidationException
  | UserNotFoundException
  | CommonErrors;
/**
 * Begins the password reset process. Sets the requested user’s account into a
 * `RESET_REQUIRED` status, and sends them a password-reset code. Your user
 * pool also sends the user a notification with a reset code and the information that their
 * password has been reset. At sign-in, your application or the managed login session
 * receives a challenge to complete the reset by confirming the code and setting a new
 * password.
 *
 * To use this API operation, your user pool must have self-service account recovery
 * configured.
 *
 * This action might generate an SMS text message. Starting June 1, 2021, US telecom carriers
 * require you to register an origination phone number before you can send SMS messages
 * to US phone numbers. If you use SMS text messages in Amazon Cognito, you must register a
 * phone number with Amazon Pinpoint.
 * Amazon Cognito uses the registered number automatically. Otherwise, Amazon Cognito users who must
 * receive SMS messages might not be able to sign up, activate their accounts, or sign
 * in.
 *
 * If you have never used SMS text messages with Amazon Cognito or any other Amazon Web Services service,
 * Amazon Simple Notification Service might place your account in the SMS sandbox. In
 * sandbox
 * mode
 * , you can send messages only to verified phone
 * numbers. After you test your app while in the sandbox environment, you can move out
 * of the sandbox and into production. For more information, see SMS message settings for Amazon Cognito user pools in the Amazon Cognito
 * Developer Guide.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const adminResetUserPassword: API.OperationMethod<
  AdminResetUserPasswordRequest,
  AdminResetUserPasswordResponse,
  AdminResetUserPasswordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AdminResetUserPasswordRequest,
  output: AdminResetUserPasswordResponse,
  errors: [
    InternalErrorException,
    InvalidEmailRoleAccessPolicyException,
    InvalidLambdaResponseException,
    InvalidParameterException,
    InvalidSmsRoleAccessPolicyException,
    InvalidSmsRoleTrustRelationshipException,
    LimitExceededException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UnexpectedLambdaException,
    UserLambdaValidationException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdminResetUserPassword",
}));

export type AdminRespondToAuthChallengeError =
  | AliasExistsException
  | CodeMismatchException
  | ExpiredCodeException
  | InternalErrorException
  | InvalidEmailRoleAccessPolicyException
  | InvalidLambdaResponseException
  | InvalidParameterException
  | InvalidPasswordException
  | InvalidSmsRoleAccessPolicyException
  | InvalidSmsRoleTrustRelationshipException
  | InvalidUserPoolConfigurationException
  | MFAMethodNotFoundException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordHistoryPolicyViolationException
  | PasswordResetRequiredException
  | ResourceNotFoundException
  | SoftwareTokenMFANotFoundException
  | TooManyRequestsException
  | UnexpectedLambdaException
  | UserLambdaValidationException
  | UserNotConfirmedException
  | UserNotFoundException
  | CommonErrors;
/**
 * Some API operations in a user pool generate a challenge, like a prompt for an MFA
 * code, for device authentication that bypasses MFA, or for a custom authentication
 * challenge. An `AdminRespondToAuthChallenge` API request provides the answer
 * to that challenge, like a code or a secure remote password (SRP). The parameters of a
 * response to an authentication challenge vary with the type of challenge.
 *
 * For more information about custom authentication challenges, see Custom
 * authentication challenge Lambda triggers.
 *
 * This action might generate an SMS text message. Starting June 1, 2021, US telecom carriers
 * require you to register an origination phone number before you can send SMS messages
 * to US phone numbers. If you use SMS text messages in Amazon Cognito, you must register a
 * phone number with Amazon Pinpoint.
 * Amazon Cognito uses the registered number automatically. Otherwise, Amazon Cognito users who must
 * receive SMS messages might not be able to sign up, activate their accounts, or sign
 * in.
 *
 * If you have never used SMS text messages with Amazon Cognito or any other Amazon Web Services service,
 * Amazon Simple Notification Service might place your account in the SMS sandbox. In
 * sandbox
 * mode
 * , you can send messages only to verified phone
 * numbers. After you test your app while in the sandbox environment, you can move out
 * of the sandbox and into production. For more information, see SMS message settings for Amazon Cognito user pools in the Amazon Cognito
 * Developer Guide.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const adminRespondToAuthChallenge: API.OperationMethod<
  AdminRespondToAuthChallengeRequest,
  AdminRespondToAuthChallengeResponse,
  AdminRespondToAuthChallengeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AdminRespondToAuthChallengeRequest,
  output: AdminRespondToAuthChallengeResponse,
  errors: [
    AliasExistsException,
    CodeMismatchException,
    ExpiredCodeException,
    InternalErrorException,
    InvalidEmailRoleAccessPolicyException,
    InvalidLambdaResponseException,
    InvalidParameterException,
    InvalidPasswordException,
    InvalidSmsRoleAccessPolicyException,
    InvalidSmsRoleTrustRelationshipException,
    InvalidUserPoolConfigurationException,
    MFAMethodNotFoundException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordHistoryPolicyViolationException,
    PasswordResetRequiredException,
    ResourceNotFoundException,
    SoftwareTokenMFANotFoundException,
    TooManyRequestsException,
    UnexpectedLambdaException,
    UserLambdaValidationException,
    UserNotConfirmedException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdminRespondToAuthChallenge",
}));

export type AdminSetUserMFAPreferenceError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordResetRequiredException
  | ResourceNotFoundException
  | UserNotConfirmedException
  | UserNotFoundException
  | CommonErrors;
/**
 * Sets the user's multi-factor authentication (MFA) preference, including which MFA
 * options are activated, and if any are preferred. Only one factor can be set as
 * preferred. The preferred MFA factor will be used to authenticate a user if multiple
 * factors are activated. If multiple options are activated and no preference is set, a
 * challenge to choose an MFA option will be returned during sign-in.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const adminSetUserMFAPreference: API.OperationMethod<
  AdminSetUserMFAPreferenceRequest,
  AdminSetUserMFAPreferenceResponse,
  AdminSetUserMFAPreferenceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AdminSetUserMFAPreferenceRequest,
  output: AdminSetUserMFAPreferenceResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordResetRequiredException,
    ResourceNotFoundException,
    UserNotConfirmedException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdminSetUserMFAPreference",
}));

export type AdminSetUserPasswordError =
  | InternalErrorException
  | InvalidParameterException
  | InvalidPasswordException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordHistoryPolicyViolationException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotFoundException
  | CommonErrors;
/**
 * Sets the specified user's password in a user pool. This operation administratively
 * sets a temporary or permanent password for a user. With this operation, you can bypass
 * self-service password changes and permit immediate sign-in with the password that you
 * set. To do this, set `Permanent` to `true`.
 *
 * You can also set a new temporary password in this request, send it to a user, and
 * require them to choose a new password on their next sign-in. To do this, set
 * `Permanent` to `false`.
 *
 * If the password is temporary, the user's `Status` becomes
 * `FORCE_CHANGE_PASSWORD`. When the user next tries to sign in, the
 * `InitiateAuth` or `AdminInitiateAuth` response includes the
 * `NEW_PASSWORD_REQUIRED` challenge. If the user doesn't sign in
 * before the temporary password expires, they can no longer sign in and you must repeat
 * this operation to set a temporary or permanent password for them.
 *
 * After the user sets a new password, or if you set a permanent password, their status
 * becomes `Confirmed`.
 *
 * `AdminSetUserPassword` can set a password for the user profile that Amazon Cognito
 * creates for third-party federated users. When you set a password, the federated user's
 * status changes from `EXTERNAL_PROVIDER` to `CONFIRMED`. A user in
 * this state can sign in as a federated user, and initiate authentication flows in the API
 * like a linked native user. They can also modify their password and attributes in
 * token-authenticated API requests like `ChangePassword` and
 * `UpdateUserAttributes`. As a best security practice and to keep users in
 * sync with your external IdP, don't set passwords on federated user profiles. To set up a
 * federated user for native sign-in with a linked native user, refer to Linking federated users to an existing user
 * profile.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const adminSetUserPassword: API.OperationMethod<
  AdminSetUserPasswordRequest,
  AdminSetUserPasswordResponse,
  AdminSetUserPasswordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AdminSetUserPasswordRequest,
  output: AdminSetUserPasswordResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    InvalidPasswordException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordHistoryPolicyViolationException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdminSetUserPassword",
}));

export type AdminSetUserSettingsError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | UserNotFoundException
  | CommonErrors;
/**
 * *This action is no longer supported.* You can use it to configure
 * only SMS MFA. You can't use it to configure time-based one-time password (TOTP) software
 * token MFA.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const adminSetUserSettings: API.OperationMethod<
  AdminSetUserSettingsRequest,
  AdminSetUserSettingsResponse,
  AdminSetUserSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AdminSetUserSettingsRequest,
  output: AdminSetUserSettingsResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdminSetUserSettings",
}));

export type AdminUpdateAuthEventFeedbackError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotFoundException
  | UserPoolAddOnNotEnabledException
  | CommonErrors;
/**
 * Provides the feedback for an authentication event generated by threat protection
 * features. Your response indicates that you think that the event either was from a valid
 * user or was an unwanted authentication attempt. This feedback improves the risk
 * evaluation decision for the user pool as part of Amazon Cognito threat protection.
 * To activate this setting, your user pool must be on the
 * Plus tier.
 *
 * To train the threat-protection model to recognize trusted and untrusted sign-in
 * characteristics, configure threat protection in audit-only mode and provide a mechanism
 * for users or administrators to submit feedback. Your feedback can tell Amazon Cognito that a risk
 * rating was assigned at a level you don't agree with.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const adminUpdateAuthEventFeedback: API.OperationMethod<
  AdminUpdateAuthEventFeedbackRequest,
  AdminUpdateAuthEventFeedbackResponse,
  AdminUpdateAuthEventFeedbackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AdminUpdateAuthEventFeedbackRequest,
  output: AdminUpdateAuthEventFeedbackResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotFoundException,
    UserPoolAddOnNotEnabledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdminUpdateAuthEventFeedback",
}));

export type AdminUpdateDeviceStatusError =
  | InternalErrorException
  | InvalidParameterException
  | InvalidUserPoolConfigurationException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotFoundException
  | CommonErrors;
/**
 * Updates the status of a user's device so that it is marked as remembered or not
 * remembered for the purpose of device authentication. Device authentication is a
 * "remember me" mechanism that silently completes sign-in from trusted devices with a
 * device key instead of a user-provided MFA code. This operation changes the status of a
 * device without deleting it, so you can enable it again later. For more information about
 * device authentication, see Working with devices.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const adminUpdateDeviceStatus: API.OperationMethod<
  AdminUpdateDeviceStatusRequest,
  AdminUpdateDeviceStatusResponse,
  AdminUpdateDeviceStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AdminUpdateDeviceStatusRequest,
  output: AdminUpdateDeviceStatusResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    InvalidUserPoolConfigurationException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdminUpdateDeviceStatus",
}));

export type AdminUpdateUserAttributesError =
  | AliasExistsException
  | InternalErrorException
  | InvalidEmailRoleAccessPolicyException
  | InvalidLambdaResponseException
  | InvalidParameterException
  | InvalidSmsRoleAccessPolicyException
  | InvalidSmsRoleTrustRelationshipException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UnexpectedLambdaException
  | UserLambdaValidationException
  | UserNotFoundException
  | CommonErrors;
/**
 * Updates the specified user's attributes. To delete an attribute from your user,
 * submit the attribute in your API request with a blank value.
 *
 * For custom attributes, you must add a `custom:` prefix to the attribute
 * name, for example `custom:department`.
 *
 * This operation can set a user's email address or phone number as verified and
 * permit immediate sign-in in user pools that require verification of these attributes. To
 * do this, set the `email_verified` or `phone_number_verified`
 * attribute to `true`.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 *
 * This action might generate an SMS text message. Starting June 1, 2021, US telecom carriers
 * require you to register an origination phone number before you can send SMS messages
 * to US phone numbers. If you use SMS text messages in Amazon Cognito, you must register a
 * phone number with Amazon Pinpoint.
 * Amazon Cognito uses the registered number automatically. Otherwise, Amazon Cognito users who must
 * receive SMS messages might not be able to sign up, activate their accounts, or sign
 * in.
 *
 * If you have never used SMS text messages with Amazon Cognito or any other Amazon Web Services service,
 * Amazon Simple Notification Service might place your account in the SMS sandbox. In
 * sandbox
 * mode
 * , you can send messages only to verified phone
 * numbers. After you test your app while in the sandbox environment, you can move out
 * of the sandbox and into production. For more information, see SMS message settings for Amazon Cognito user pools in the Amazon Cognito
 * Developer Guide.
 */
export const adminUpdateUserAttributes: API.OperationMethod<
  AdminUpdateUserAttributesRequest,
  AdminUpdateUserAttributesResponse,
  AdminUpdateUserAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AdminUpdateUserAttributesRequest,
  output: AdminUpdateUserAttributesResponse,
  errors: [
    AliasExistsException,
    InternalErrorException,
    InvalidEmailRoleAccessPolicyException,
    InvalidLambdaResponseException,
    InvalidParameterException,
    InvalidSmsRoleAccessPolicyException,
    InvalidSmsRoleTrustRelationshipException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UnexpectedLambdaException,
    UserLambdaValidationException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdminUpdateUserAttributes",
}));

export type AdminUserGlobalSignOutError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotFoundException
  | CommonErrors;
/**
 * Invalidates the identity, access, and refresh tokens that Amazon Cognito issued to a user. Call
 * this operation with your administrative credentials when your user signs out of your
 * app. This results in the following behavior.
 *
 * - Amazon Cognito no longer accepts *token-authorized* user operations
 * that you authorize with a signed-out user's access tokens. For more information,
 * see Using the Amazon Cognito user pools API and user pool
 * endpoints.
 *
 * Amazon Cognito returns an `Access Token has been revoked` error when your
 * app attempts to authorize a user pools API request with a revoked access token
 * that contains the scope `aws.cognito.signin.user.admin`.
 *
 * - Amazon Cognito no longer accepts a signed-out user's ID token in a GetId request to an identity pool with
 * `ServerSideTokenCheck` enabled for its user pool IdP
 * configuration in CognitoIdentityProvider.
 *
 * - Amazon Cognito no longer accepts a signed-out user's refresh tokens in refresh
 * requests.
 *
 * Other requests might be valid until your user's token expires. This operation
 * doesn't clear the managed login session cookie. To clear the session for
 * a user who signed in with managed login or the classic hosted UI, direct their browser
 * session to the logout endpoint.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const adminUserGlobalSignOut: API.OperationMethod<
  AdminUserGlobalSignOutRequest,
  AdminUserGlobalSignOutResponse,
  AdminUserGlobalSignOutError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AdminUserGlobalSignOutRequest,
  output: AdminUserGlobalSignOutResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdminUserGlobalSignOut",
}));

export type AssociateSoftwareTokenError =
  | ConcurrentModificationException
  | ForbiddenException
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | SoftwareTokenMFANotFoundException
  | CommonErrors;
/**
 * Begins setup of time-based one-time password (TOTP) multi-factor authentication (MFA)
 * for a user, with a unique private key that Amazon Cognito generates and returns in the API
 * response. You can authorize an `AssociateSoftwareToken` request with either
 * the user's access token, or a session string from a challenge response that you received
 * from Amazon Cognito.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 *
 * Authorize this action with a signed-in user's access token. It must include the scope `aws.cognito.signin.user.admin`.
 */
export const associateSoftwareToken: API.OperationMethod<
  AssociateSoftwareTokenRequest,
  AssociateSoftwareTokenResponse,
  AssociateSoftwareTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateSoftwareTokenRequest,
  output: AssociateSoftwareTokenResponse,
  errors: [
    ConcurrentModificationException,
    ForbiddenException,
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    SoftwareTokenMFANotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateSoftwareToken",
}));

export type ChangePasswordError =
  | ForbiddenException
  | InternalErrorException
  | InvalidParameterException
  | InvalidPasswordException
  | LimitExceededException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordHistoryPolicyViolationException
  | PasswordResetRequiredException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotConfirmedException
  | UserNotFoundException
  | CommonErrors;
/**
 * Changes the password for the currently signed-in user.
 *
 * Authorize this action with a signed-in user's access token. It must include the scope `aws.cognito.signin.user.admin`.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 */
export const changePassword: API.OperationMethod<
  ChangePasswordRequest,
  ChangePasswordResponse,
  ChangePasswordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ChangePasswordRequest,
  output: ChangePasswordResponse,
  errors: [
    ForbiddenException,
    InternalErrorException,
    InvalidParameterException,
    InvalidPasswordException,
    LimitExceededException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordHistoryPolicyViolationException,
    PasswordResetRequiredException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotConfirmedException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ChangePassword",
}));

export type CompleteWebAuthnRegistrationError =
  | ForbiddenException
  | InternalErrorException
  | InvalidParameterException
  | LimitExceededException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordResetRequiredException
  | TooManyRequestsException
  | WebAuthnChallengeNotFoundException
  | WebAuthnClientMismatchException
  | WebAuthnCredentialNotSupportedException
  | WebAuthnNotEnabledException
  | WebAuthnOriginNotAllowedException
  | WebAuthnRelyingPartyMismatchException
  | CommonErrors;
/**
 * Completes registration of a passkey authenticator for the currently signed-in
 * user.
 *
 * Authorize this action with a signed-in user's access token. It must include the scope `aws.cognito.signin.user.admin`.
 */
export const completeWebAuthnRegistration: API.OperationMethod<
  CompleteWebAuthnRegistrationRequest,
  CompleteWebAuthnRegistrationResponse,
  CompleteWebAuthnRegistrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CompleteWebAuthnRegistrationRequest,
  output: CompleteWebAuthnRegistrationResponse,
  errors: [
    ForbiddenException,
    InternalErrorException,
    InvalidParameterException,
    LimitExceededException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordResetRequiredException,
    TooManyRequestsException,
    WebAuthnChallengeNotFoundException,
    WebAuthnClientMismatchException,
    WebAuthnCredentialNotSupportedException,
    WebAuthnNotEnabledException,
    WebAuthnOriginNotAllowedException,
    WebAuthnRelyingPartyMismatchException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CompleteWebAuthnRegistration",
}));

export type ConfirmDeviceError =
  | DeviceKeyExistsException
  | ForbiddenException
  | InternalErrorException
  | InvalidLambdaResponseException
  | InvalidParameterException
  | InvalidPasswordException
  | InvalidUserPoolConfigurationException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordResetRequiredException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UsernameExistsException
  | UserNotConfirmedException
  | UserNotFoundException
  | CommonErrors;
/**
 * Confirms a device that a user wants to remember. A remembered device is a "Remember me
 * on this device" option for user pools that perform authentication with the device key of
 * a trusted device in the back end, instead of a user-provided MFA code. For more
 * information about device authentication, see Working with user devices in your user pool.
 *
 * Authorize this action with a signed-in user's access token. It must include the scope `aws.cognito.signin.user.admin`.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 */
export const confirmDevice: API.OperationMethod<
  ConfirmDeviceRequest,
  ConfirmDeviceResponse,
  ConfirmDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ConfirmDeviceRequest,
  output: ConfirmDeviceResponse,
  errors: [
    DeviceKeyExistsException,
    ForbiddenException,
    InternalErrorException,
    InvalidLambdaResponseException,
    InvalidParameterException,
    InvalidPasswordException,
    InvalidUserPoolConfigurationException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordResetRequiredException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UsernameExistsException,
    UserNotConfirmedException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ConfirmDevice",
}));

export type ConfirmForgotPasswordError =
  | CodeMismatchException
  | ExpiredCodeException
  | ForbiddenException
  | InternalErrorException
  | InvalidLambdaResponseException
  | InvalidParameterException
  | InvalidPasswordException
  | LimitExceededException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordHistoryPolicyViolationException
  | ResourceNotFoundException
  | TooManyFailedAttemptsException
  | TooManyRequestsException
  | UnexpectedLambdaException
  | UserLambdaValidationException
  | UserNotConfirmedException
  | UserNotFoundException
  | CommonErrors;
/**
 * This public API operation accepts a confirmation code that Amazon Cognito sent to a user and
 * accepts a new password for that user.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 */
export const confirmForgotPassword: API.OperationMethod<
  ConfirmForgotPasswordRequest,
  ConfirmForgotPasswordResponse,
  ConfirmForgotPasswordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ConfirmForgotPasswordRequest,
  output: ConfirmForgotPasswordResponse,
  errors: [
    CodeMismatchException,
    ExpiredCodeException,
    ForbiddenException,
    InternalErrorException,
    InvalidLambdaResponseException,
    InvalidParameterException,
    InvalidPasswordException,
    LimitExceededException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordHistoryPolicyViolationException,
    ResourceNotFoundException,
    TooManyFailedAttemptsException,
    TooManyRequestsException,
    UnexpectedLambdaException,
    UserLambdaValidationException,
    UserNotConfirmedException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ConfirmForgotPassword",
}));

export type ConfirmSignUpError =
  | AliasExistsException
  | CodeMismatchException
  | ExpiredCodeException
  | ForbiddenException
  | InternalErrorException
  | InvalidLambdaResponseException
  | InvalidParameterException
  | LimitExceededException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyFailedAttemptsException
  | TooManyRequestsException
  | UnexpectedLambdaException
  | UserLambdaValidationException
  | UserNotFoundException
  | CommonErrors;
/**
 * Confirms the account of a new user. This public API operation submits a code that
 * Amazon Cognito sent to your user when they signed up in your user pool. After your user enters
 * their code, they confirm ownership of the email address or phone number that they
 * provided, and their user account becomes active. Depending on your user pool
 * configuration, your users will receive their confirmation code in an email or SMS
 * message.
 *
 * Local users who signed up in your user pool are the only type of user who can confirm
 * sign-up with a code. Users who federate through an external identity provider (IdP) have
 * already been confirmed by their IdP.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 */
export const confirmSignUp: API.OperationMethod<
  ConfirmSignUpRequest,
  ConfirmSignUpResponse,
  ConfirmSignUpError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ConfirmSignUpRequest,
  output: ConfirmSignUpResponse,
  errors: [
    AliasExistsException,
    CodeMismatchException,
    ExpiredCodeException,
    ForbiddenException,
    InternalErrorException,
    InvalidLambdaResponseException,
    InvalidParameterException,
    LimitExceededException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyFailedAttemptsException,
    TooManyRequestsException,
    UnexpectedLambdaException,
    UserLambdaValidationException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ConfirmSignUp",
}));

export type CreateGroupError =
  | GroupExistsException
  | InternalErrorException
  | InvalidParameterException
  | LimitExceededException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new group in the specified user pool. For more information about user pool
 * groups, see Adding groups to a user pool.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const createGroup: API.OperationMethod<
  CreateGroupRequest,
  CreateGroupResponse,
  CreateGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateGroupRequest,
  output: CreateGroupResponse,
  errors: [
    GroupExistsException,
    InternalErrorException,
    InvalidParameterException,
    LimitExceededException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGroup",
}));

export type CreateIdentityProviderError =
  | DuplicateProviderException
  | InternalErrorException
  | InvalidParameterException
  | LimitExceededException
  | NotAuthorizedException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Adds a configuration and trust relationship between a third-party identity provider
 * (IdP) and a user pool. Amazon Cognito accepts sign-in with third-party identity providers through
 * managed login and OIDC relying-party libraries. For more information, see Third-party IdP sign-in.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const createIdentityProvider: API.OperationMethod<
  CreateIdentityProviderRequest,
  CreateIdentityProviderResponse,
  CreateIdentityProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateIdentityProviderRequest,
  output: CreateIdentityProviderResponse,
  errors: [
    DuplicateProviderException,
    InternalErrorException,
    InvalidParameterException,
    LimitExceededException,
    NotAuthorizedException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIdentityProvider",
}));

export type CreateManagedLoginBrandingError =
  | ConcurrentModificationException
  | InternalErrorException
  | InvalidParameterException
  | LimitExceededException
  | ManagedLoginBrandingExistsException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new set of branding settings for a user pool style and associates it with an
 * app client. This operation is the programmatic option for the creation of a new style in
 * the branding editor.
 *
 * Provides values for UI customization in a `Settings` JSON object and image
 * files in an `Assets` array. To send the JSON object `Document`
 * type parameter in `Settings`, you might need to update to the most recent
 * version of your Amazon Web Services SDK. To create a new style with default settings, set
 * `UseCognitoProvidedValues` to `true` and don't provide
 * values for any other options.
 *
 * This operation has a 2-megabyte request-size limit and include the CSS settings and
 * image assets for your app client. Your branding settings might exceed 2MB in size. Amazon Cognito
 * doesn't require that you pass all parameters in one request and preserves existing
 * style settings that you don't specify. If your request is larger than 2MB, separate it
 * into multiple requests, each with a size smaller than the limit.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const createManagedLoginBranding: API.OperationMethod<
  CreateManagedLoginBrandingRequest,
  CreateManagedLoginBrandingResponse,
  CreateManagedLoginBrandingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateManagedLoginBrandingRequest,
  output: CreateManagedLoginBrandingResponse,
  errors: [
    ConcurrentModificationException,
    InternalErrorException,
    InvalidParameterException,
    LimitExceededException,
    ManagedLoginBrandingExistsException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateManagedLoginBranding",
}));

export type CreateResourceServerError =
  | InternalErrorException
  | InvalidParameterException
  | LimitExceededException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new OAuth2.0 resource server and defines custom scopes within it. Resource
 * servers are associated with custom scopes and machine-to-machine (M2M) authorization.
 * For more information, see Access control with resource servers.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const createResourceServer: API.OperationMethod<
  CreateResourceServerRequest,
  CreateResourceServerResponse,
  CreateResourceServerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateResourceServerRequest,
  output: CreateResourceServerResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    LimitExceededException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateResourceServer",
}));

export type CreateTermsError =
  | ConcurrentModificationException
  | InternalErrorException
  | InvalidParameterException
  | LimitExceededException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TermsExistsException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates terms documents for the requested app client. When Terms and conditions and
 * Privacy policy documents are configured, the app client displays links to them in the
 * sign-up page of managed login for the app client.
 *
 * You can provide URLs for terms documents in the languages that are supported by managed login localization. Amazon Cognito directs users to the terms documents for
 * their current language, with fallback to `default` if no document exists for
 * the language.
 *
 * Each request accepts one type of terms document and a map of language-to-link for that
 * document type. You must provide both types of terms documents in at least one language
 * before Amazon Cognito displays your terms documents. Supply each type in separate
 * requests.
 *
 * For more information, see Terms documents.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const createTerms: API.OperationMethod<
  CreateTermsRequest,
  CreateTermsResponse,
  CreateTermsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateTermsRequest,
  output: CreateTermsResponse,
  errors: [
    ConcurrentModificationException,
    InternalErrorException,
    InvalidParameterException,
    LimitExceededException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TermsExistsException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTerms",
}));

export type CreateUserImportJobError =
  | InternalErrorException
  | InvalidParameterException
  | LimitExceededException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a user import job. You can import users into user pools from a comma-separated
 * values (CSV) file without adding Amazon Cognito MAU costs to your Amazon Web Services bill.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const createUserImportJob: API.OperationMethod<
  CreateUserImportJobRequest,
  CreateUserImportJobResponse,
  CreateUserImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateUserImportJobRequest,
  output: CreateUserImportJobResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    LimitExceededException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUserImportJob",
}));

export type CreateUserPoolError =
  | FeatureUnavailableInTierException
  | InternalErrorException
  | InvalidEmailRoleAccessPolicyException
  | InvalidParameterException
  | InvalidSmsRoleAccessPolicyException
  | InvalidSmsRoleTrustRelationshipException
  | LimitExceededException
  | NotAuthorizedException
  | TierChangeNotAllowedException
  | TooManyRequestsException
  | UserPoolTaggingException
  | CommonErrors;
/**
 * Creates a new Amazon Cognito user pool. This operation sets basic and advanced configuration
 * options.
 *
 * If you don't provide a value for an attribute, Amazon Cognito sets it to its default value.
 *
 * This action might generate an SMS text message. Starting June 1, 2021, US telecom carriers
 * require you to register an origination phone number before you can send SMS messages
 * to US phone numbers. If you use SMS text messages in Amazon Cognito, you must register a
 * phone number with Amazon Pinpoint.
 * Amazon Cognito uses the registered number automatically. Otherwise, Amazon Cognito users who must
 * receive SMS messages might not be able to sign up, activate their accounts, or sign
 * in.
 *
 * If you have never used SMS text messages with Amazon Cognito or any other Amazon Web Services service,
 * Amazon Simple Notification Service might place your account in the SMS sandbox. In
 * sandbox
 * mode
 * , you can send messages only to verified phone
 * numbers. After you test your app while in the sandbox environment, you can move out
 * of the sandbox and into production. For more information, see SMS message settings for Amazon Cognito user pools in the Amazon Cognito
 * Developer Guide.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const createUserPool: API.OperationMethod<
  CreateUserPoolRequest,
  CreateUserPoolResponse,
  CreateUserPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateUserPoolRequest,
  output: CreateUserPoolResponse,
  errors: [
    FeatureUnavailableInTierException,
    InternalErrorException,
    InvalidEmailRoleAccessPolicyException,
    InvalidParameterException,
    InvalidSmsRoleAccessPolicyException,
    InvalidSmsRoleTrustRelationshipException,
    LimitExceededException,
    NotAuthorizedException,
    TierChangeNotAllowedException,
    TooManyRequestsException,
    UserPoolTaggingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUserPool",
}));

export type CreateUserPoolClientError =
  | FeatureUnavailableInTierException
  | InternalErrorException
  | InvalidOAuthFlowException
  | InvalidParameterException
  | LimitExceededException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | ScopeDoesNotExistException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates an app client in a user pool. This operation sets basic and advanced
 * configuration options.
 *
 * Unlike app clients created in the console, Amazon Cognito doesn't automatically assign a
 * branding style to app clients that you configure with this API operation. Managed login and classic hosted UI pages aren't
 * available for your client until after you apply a branding style.
 *
 * If you don't provide a value for an attribute, Amazon Cognito sets it to its default value.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const createUserPoolClient: API.OperationMethod<
  CreateUserPoolClientRequest,
  CreateUserPoolClientResponse,
  CreateUserPoolClientError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateUserPoolClientRequest,
  output: CreateUserPoolClientResponse,
  errors: [
    FeatureUnavailableInTierException,
    InternalErrorException,
    InvalidOAuthFlowException,
    InvalidParameterException,
    LimitExceededException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    ScopeDoesNotExistException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUserPoolClient",
}));

export type CreateUserPoolDomainError =
  | ConcurrentModificationException
  | FeatureUnavailableInTierException
  | InternalErrorException
  | InvalidParameterException
  | LimitExceededException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * A user pool domain hosts managed login, an authorization server and web server for
 * authentication in your application. This operation creates a new user pool prefix domain
 * or custom domain and sets the managed login branding version. Set the branding version
 * to `1` for hosted UI (classic) or `2` for managed login. When you
 * choose a custom domain, you must provide an SSL certificate in the US East (N. Virginia)
 * Amazon Web Services Region in your request.
 *
 * Your prefix domain might take up to one minute to take effect. Your custom domain is
 * online within five minutes, but it can take up to one hour to distribute your SSL
 * certificate.
 *
 * For more information about adding a custom domain to your user pool, see Configuring a user pool domain.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const createUserPoolDomain: API.OperationMethod<
  CreateUserPoolDomainRequest,
  CreateUserPoolDomainResponse,
  CreateUserPoolDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateUserPoolDomainRequest,
  output: CreateUserPoolDomainResponse,
  errors: [
    ConcurrentModificationException,
    FeatureUnavailableInTierException,
    InternalErrorException,
    InvalidParameterException,
    LimitExceededException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUserPoolDomain",
}));

export type CreateUserPoolReplicaError =
  | FeatureUnavailableInTierException
  | InternalErrorException
  | InvalidParameterException
  | LimitExceededException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserPoolTaggingException
  | CommonErrors;
/**
 * Creates a replica of an existing user pool in a specified Amazon Web Services Region. The replica
 * enables multi-region replication for high availability and disaster recovery. To create
 * a replica, you must have permissions to create user pools in the target Region.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const createUserPoolReplica: API.OperationMethod<
  CreateUserPoolReplicaRequest,
  CreateUserPoolReplicaResponse,
  CreateUserPoolReplicaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateUserPoolReplicaRequest,
  output: CreateUserPoolReplicaResponse,
  errors: [
    FeatureUnavailableInTierException,
    InternalErrorException,
    InvalidParameterException,
    LimitExceededException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserPoolTaggingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUserPoolReplica",
}));

export type DeleteGroupError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a group from the specified user pool. When you delete a group, that group no
 * longer contributes to users' `cognito:preferred_group` or
 * `cognito:groups` claims, and no longer influence access-control decision
 * that are based on group membership. For more information about user pool groups, see
 * Adding groups to a user pool.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const deleteGroup: API.OperationMethod<
  DeleteGroupRequest,
  DeleteGroupResponse,
  DeleteGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteGroupRequest,
  output: DeleteGroupResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGroup",
}));

export type DeleteIdentityProviderError =
  | ConcurrentModificationException
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UnsupportedIdentityProviderException
  | CommonErrors;
/**
 * Deletes a user pool identity provider (IdP). After you delete an IdP, users can no
 * longer sign in to your user pool through that IdP. For more information about user pool
 * IdPs, see Third-party IdP sign-in.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const deleteIdentityProvider: API.OperationMethod<
  DeleteIdentityProviderRequest,
  DeleteIdentityProviderResponse,
  DeleteIdentityProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteIdentityProviderRequest,
  output: DeleteIdentityProviderResponse,
  errors: [
    ConcurrentModificationException,
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UnsupportedIdentityProviderException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIdentityProvider",
}));

export type DeleteManagedLoginBrandingError =
  | ConcurrentModificationException
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a managed login branding style. When you delete a style, you delete the
 * branding association for an app client. When an app client doesn't have a style
 * assigned, your managed login pages for that app client are nonfunctional until you
 * create a new style or switch the domain branding version.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const deleteManagedLoginBranding: API.OperationMethod<
  DeleteManagedLoginBrandingRequest,
  DeleteManagedLoginBrandingResponse,
  DeleteManagedLoginBrandingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteManagedLoginBrandingRequest,
  output: DeleteManagedLoginBrandingResponse,
  errors: [
    ConcurrentModificationException,
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteManagedLoginBranding",
}));

export type DeleteResourceServerError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a resource server. After you delete a resource server, users can no longer
 * generate access tokens with scopes that are associate with that resource server.
 *
 * Resource servers are associated with custom scopes and machine-to-machine (M2M)
 * authorization. For more information, see Access control with resource servers.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const deleteResourceServer: API.OperationMethod<
  DeleteResourceServerRequest,
  DeleteResourceServerResponse,
  DeleteResourceServerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteResourceServerRequest,
  output: DeleteResourceServerResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourceServer",
}));

export type DeleteTermsError =
  | ConcurrentModificationException
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes the terms documents with the requested ID from your app client.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const deleteTerms: API.OperationMethod<
  DeleteTermsRequest,
  DeleteTermsResponse,
  DeleteTermsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTermsRequest,
  output: DeleteTermsResponse,
  errors: [
    ConcurrentModificationException,
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTerms",
}));

export type DeleteUserError =
  | ForbiddenException
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordResetRequiredException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotConfirmedException
  | UserNotFoundException
  | CommonErrors;
/**
 * Deletes the profile of the currently signed-in user. A deleted user profile can no
 * longer be used to sign in and can't be restored.
 *
 * Authorize this action with a signed-in user's access token. It must include the scope `aws.cognito.signin.user.admin`.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 */
export const deleteUser: API.OperationMethod<
  DeleteUserRequest,
  DeleteUserResponse,
  DeleteUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteUserRequest,
  output: DeleteUserResponse,
  errors: [
    ForbiddenException,
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordResetRequiredException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotConfirmedException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUser",
}));

export type DeleteUserAttributesError =
  | ForbiddenException
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordResetRequiredException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotConfirmedException
  | UserNotFoundException
  | CommonErrors;
/**
 * Deletes attributes from the currently signed-in user. For example, your application
 * can submit a request to this operation when a user wants to remove their
 * `birthdate` attribute value.
 *
 * Authorize this action with a signed-in user's access token. It must include the scope `aws.cognito.signin.user.admin`.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 */
export const deleteUserAttributes: API.OperationMethod<
  DeleteUserAttributesRequest,
  DeleteUserAttributesResponse,
  DeleteUserAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteUserAttributesRequest,
  output: DeleteUserAttributesResponse,
  errors: [
    ForbiddenException,
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordResetRequiredException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotConfirmedException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUserAttributes",
}));

export type DeleteUserPoolError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserImportInProgressException
  | CommonErrors;
/**
 * Deletes a user pool. After you delete a user pool, users can no longer sign in to any
 * associated applications.
 *
 * When you delete a user pool, it's no longer visible or operational in your Amazon Web Services account. Amazon Cognito retains deleted user pools in an inactive state for 14
 * days, then begins a cleanup process that fully removes them from Amazon Web Services systems. In case
 * of accidental deletion, contact Amazon Web Services Support within 14 days for restoration
 * assistance.
 *
 * Amazon Cognito begins full deletion of all resources from deleted user pools after 14 days. In
 * the case of large user pools, the cleanup process might take significant additional time
 * before all user data is permanently deleted.
 */
export const deleteUserPool: API.OperationMethod<
  DeleteUserPoolRequest,
  DeleteUserPoolResponse,
  DeleteUserPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteUserPoolRequest,
  output: DeleteUserPoolResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserImportInProgressException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUserPool",
}));

export type DeleteUserPoolClientError =
  | ConcurrentModificationException
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a user pool app client. After you delete an app client, users can no longer
 * sign in to the associated application.
 */
export const deleteUserPoolClient: API.OperationMethod<
  DeleteUserPoolClientRequest,
  DeleteUserPoolClientResponse,
  DeleteUserPoolClientError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteUserPoolClientRequest,
  output: DeleteUserPoolClientResponse,
  errors: [
    ConcurrentModificationException,
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUserPoolClient",
}));

export type DeleteUserPoolClientSecretError =
  | InternalServerException
  | InvalidParameterException
  | LimitExceededException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a specific client secret from a user pool app client. You cannot delete the last remaining secret for an app client.
 */
export const deleteUserPoolClientSecret: API.OperationMethod<
  DeleteUserPoolClientSecretRequest,
  DeleteUserPoolClientSecretResponse,
  DeleteUserPoolClientSecretError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteUserPoolClientSecretRequest,
  output: DeleteUserPoolClientSecretResponse,
  errors: [
    InternalServerException,
    InvalidParameterException,
    LimitExceededException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUserPoolClientSecret",
}));

export type DeleteUserPoolDomainError =
  | ConcurrentModificationException
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Given a user pool ID and domain identifier, deletes a user pool domain. After you
 * delete a user pool domain, your managed login pages and authorization server are no
 * longer available.
 */
export const deleteUserPoolDomain: API.OperationMethod<
  DeleteUserPoolDomainRequest,
  DeleteUserPoolDomainResponse,
  DeleteUserPoolDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteUserPoolDomainRequest,
  output: DeleteUserPoolDomainResponse,
  errors: [
    ConcurrentModificationException,
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUserPoolDomain",
}));

export type DeleteUserPoolReplicaError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a secondary replica user pool. You can only delete replicas that are in the
 * INACTIVE status. This operation must be called from the primary Region.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const deleteUserPoolReplica: API.OperationMethod<
  DeleteUserPoolReplicaRequest,
  DeleteUserPoolReplicaResponse,
  DeleteUserPoolReplicaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteUserPoolReplicaRequest,
  output: DeleteUserPoolReplicaResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUserPoolReplica",
}));

export type DeleteWebAuthnCredentialError =
  | ForbiddenException
  | InternalErrorException
  | InvalidParameterException
  | LimitExceededException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordResetRequiredException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a registered passkey, or WebAuthn, authenticator for the currently signed-in
 * user.
 *
 * Authorize this action with a signed-in user's access token. It must include the scope `aws.cognito.signin.user.admin`.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 */
export const deleteWebAuthnCredential: API.OperationMethod<
  DeleteWebAuthnCredentialRequest,
  DeleteWebAuthnCredentialResponse,
  DeleteWebAuthnCredentialError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteWebAuthnCredentialRequest,
  output: DeleteWebAuthnCredentialResponse,
  errors: [
    ForbiddenException,
    InternalErrorException,
    InvalidParameterException,
    LimitExceededException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordResetRequiredException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWebAuthnCredential",
}));

export type DescribeIdentityProviderError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Given a user pool ID and identity provider (IdP) name, returns details about the
 * IdP.
 */
export const describeIdentityProvider: API.OperationMethod<
  DescribeIdentityProviderRequest,
  DescribeIdentityProviderResponse,
  DescribeIdentityProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeIdentityProviderRequest,
  output: DescribeIdentityProviderResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeIdentityProvider",
}));

export type DescribeManagedLoginBrandingError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Given the ID of a managed login branding style, returns detailed information about the
 * style.
 */
export const describeManagedLoginBranding: API.OperationMethod<
  DescribeManagedLoginBrandingRequest,
  DescribeManagedLoginBrandingResponse,
  DescribeManagedLoginBrandingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeManagedLoginBrandingRequest,
  output: DescribeManagedLoginBrandingResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeManagedLoginBranding",
}));

export type DescribeManagedLoginBrandingByClientError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Given the ID of a user pool app client, returns detailed information about the style
 * assigned to the app client.
 */
export const describeManagedLoginBrandingByClient: API.OperationMethod<
  DescribeManagedLoginBrandingByClientRequest,
  DescribeManagedLoginBrandingByClientResponse,
  DescribeManagedLoginBrandingByClientError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeManagedLoginBrandingByClientRequest,
  output: DescribeManagedLoginBrandingByClientResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeManagedLoginBrandingByClient",
}));

export type DescribeResourceServerError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Describes a resource server. For more information about resource servers, see Access control with resource servers.
 */
export const describeResourceServer: API.OperationMethod<
  DescribeResourceServerRequest,
  DescribeResourceServerResponse,
  DescribeResourceServerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeResourceServerRequest,
  output: DescribeResourceServerResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeResourceServer",
}));

export type DescribeRiskConfigurationError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserPoolAddOnNotEnabledException
  | CommonErrors;
/**
 * Given an app client or user pool ID where threat protection is configured, describes
 * the risk configuration. This operation returns details about adaptive authentication,
 * compromised credentials, and IP-address allow- and denylists. For more information about
 * threat protection, see Threat protection.
 */
export const describeRiskConfiguration: API.OperationMethod<
  DescribeRiskConfigurationRequest,
  DescribeRiskConfigurationResponse,
  DescribeRiskConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeRiskConfigurationRequest,
  output: DescribeRiskConfigurationResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserPoolAddOnNotEnabledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRiskConfiguration",
}));

export type DescribeTermsError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns details for the requested terms documents ID. For more information, see Terms documents.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const describeTerms: API.OperationMethod<
  DescribeTermsRequest,
  DescribeTermsResponse,
  DescribeTermsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeTermsRequest,
  output: DescribeTermsResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTerms",
}));

export type DescribeUserImportJobError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Describes a user import job. For more information about user CSV import, see Importing users from a CSV file.
 */
export const describeUserImportJob: API.OperationMethod<
  DescribeUserImportJobRequest,
  DescribeUserImportJobResponse,
  DescribeUserImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeUserImportJobRequest,
  output: DescribeUserImportJobResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeUserImportJob",
}));

export type DescribeUserPoolError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserPoolTaggingException
  | CommonErrors;
/**
 * Given a user pool ID, returns configuration information. This operation is useful when
 * you want to inspect an existing user pool and programmatically replicate the
 * configuration to another user pool.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const describeUserPool: API.OperationMethod<
  DescribeUserPoolRequest,
  DescribeUserPoolResponse,
  DescribeUserPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeUserPoolRequest,
  output: DescribeUserPoolResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserPoolTaggingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeUserPool",
}));

export type DescribeUserPoolClientError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Given an app client ID, returns configuration information. This operation is useful
 * when you want to inspect an existing app client and programmatically replicate the
 * configuration to another app client. For more information about app clients, see App clients.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const describeUserPoolClient: API.OperationMethod<
  DescribeUserPoolClientRequest,
  DescribeUserPoolClientResponse,
  DescribeUserPoolClientError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeUserPoolClientRequest,
  output: DescribeUserPoolClientResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeUserPoolClient",
}));

export type DescribeUserPoolDomainError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Given a user pool domain name, returns information about the domain
 * configuration.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const describeUserPoolDomain: API.OperationMethod<
  DescribeUserPoolDomainRequest,
  DescribeUserPoolDomainResponse,
  DescribeUserPoolDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeUserPoolDomainRequest,
  output: DescribeUserPoolDomainResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeUserPoolDomain",
}));

export type ForgetDeviceError =
  | ForbiddenException
  | InternalErrorException
  | InvalidParameterException
  | InvalidUserPoolConfigurationException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordResetRequiredException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotConfirmedException
  | UserNotFoundException
  | CommonErrors;
/**
 * Given a device key, deletes a remembered device as the currently signed-in user. For
 * more information about device authentication, see Working with user devices in your user pool.
 *
 * Authorize this action with a signed-in user's access token. It must include the scope `aws.cognito.signin.user.admin`.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 */
export const forgetDevice: API.OperationMethod<
  ForgetDeviceRequest,
  ForgetDeviceResponse,
  ForgetDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ForgetDeviceRequest,
  output: ForgetDeviceResponse,
  errors: [
    ForbiddenException,
    InternalErrorException,
    InvalidParameterException,
    InvalidUserPoolConfigurationException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordResetRequiredException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotConfirmedException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ForgetDevice",
}));

export type ForgotPasswordError =
  | CodeDeliveryFailureException
  | ForbiddenException
  | InternalErrorException
  | InvalidEmailRoleAccessPolicyException
  | InvalidLambdaResponseException
  | InvalidParameterException
  | InvalidSmsRoleAccessPolicyException
  | InvalidSmsRoleTrustRelationshipException
  | LimitExceededException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UnexpectedLambdaException
  | UserLambdaValidationException
  | UserNotFoundException
  | CommonErrors;
/**
 * Sends a password-reset confirmation code to the email address or phone number of the
 * requested username. The message delivery method is determined by the user's
 * available attributes and the `AccountRecoverySetting` configuration of the
 * user pool.
 *
 * For the `Username` parameter, you can use the username or an email, phone,
 * or preferred username alias.
 *
 * If neither a verified phone number nor a verified email exists, Amazon Cognito responds with an
 * `InvalidParameterException` error . If your app client has a client
 * secret and you don't provide a `SECRET_HASH` parameter, this API returns
 * `NotAuthorizedException`.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 *
 * This action might generate an SMS text message. Starting June 1, 2021, US telecom carriers
 * require you to register an origination phone number before you can send SMS messages
 * to US phone numbers. If you use SMS text messages in Amazon Cognito, you must register a
 * phone number with Amazon Pinpoint.
 * Amazon Cognito uses the registered number automatically. Otherwise, Amazon Cognito users who must
 * receive SMS messages might not be able to sign up, activate their accounts, or sign
 * in.
 *
 * If you have never used SMS text messages with Amazon Cognito or any other Amazon Web Services service,
 * Amazon Simple Notification Service might place your account in the SMS sandbox. In
 * sandbox
 * mode
 * , you can send messages only to verified phone
 * numbers. After you test your app while in the sandbox environment, you can move out
 * of the sandbox and into production. For more information, see SMS message settings for Amazon Cognito user pools in the Amazon Cognito
 * Developer Guide.
 */
export const forgotPassword: API.OperationMethod<
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ForgotPasswordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ForgotPasswordRequest,
  output: ForgotPasswordResponse,
  errors: [
    CodeDeliveryFailureException,
    ForbiddenException,
    InternalErrorException,
    InvalidEmailRoleAccessPolicyException,
    InvalidLambdaResponseException,
    InvalidParameterException,
    InvalidSmsRoleAccessPolicyException,
    InvalidSmsRoleTrustRelationshipException,
    LimitExceededException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UnexpectedLambdaException,
    UserLambdaValidationException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ForgotPassword",
}));

export type GetCSVHeaderError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Given a user pool ID, generates a comma-separated value (CSV) list populated with
 * available user attributes in the user pool. This list is the header for the CSV file
 * that determines the users in a user import job. Save the content of
 * `CSVHeader` in the response as a `.csv` file and populate it
 * with the usernames and attributes of users that you want to import. For more information
 * about CSV user import, see Importing users from a CSV file.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const getCSVHeader: API.OperationMethod<
  GetCSVHeaderRequest,
  GetCSVHeaderResponse,
  GetCSVHeaderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCSVHeaderRequest,
  output: GetCSVHeaderResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCSVHeader",
}));

export type GetDeviceError =
  | ForbiddenException
  | InternalErrorException
  | InvalidParameterException
  | InvalidUserPoolConfigurationException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordResetRequiredException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotConfirmedException
  | UserNotFoundException
  | CommonErrors;
/**
 * Given a device key, returns information about a remembered device for the current
 * user. For more information about device authentication, see Working with user devices in your user pool.
 *
 * Authorize this action with a signed-in user's access token. It must include the scope `aws.cognito.signin.user.admin`.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 */
export const getDevice: API.OperationMethod<
  GetDeviceRequest,
  GetDeviceResponse,
  GetDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDeviceRequest,
  output: GetDeviceResponse,
  errors: [
    ForbiddenException,
    InternalErrorException,
    InvalidParameterException,
    InvalidUserPoolConfigurationException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordResetRequiredException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotConfirmedException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDevice",
}));

export type GetGroupError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Given a user pool ID and a group name, returns information about the user
 * group.
 *
 * For more information about user pool groups, see Adding groups to a user pool.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const getGroup: API.OperationMethod<
  GetGroupRequest,
  GetGroupResponse,
  GetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetGroupRequest,
  output: GetGroupResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGroup",
}));

export type GetIdentityProviderByIdentifierError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Given the identifier of an identity provider (IdP), for example
 * `examplecorp`, returns information about the user pool configuration for
 * that IdP. For more information about IdPs, see Third-party IdP sign-in.
 */
export const getIdentityProviderByIdentifier: API.OperationMethod<
  GetIdentityProviderByIdentifierRequest,
  GetIdentityProviderByIdentifierResponse,
  GetIdentityProviderByIdentifierError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetIdentityProviderByIdentifierRequest,
  output: GetIdentityProviderByIdentifierResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIdentityProviderByIdentifier",
}));

export type GetLogDeliveryConfigurationError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Given a user pool ID, returns the logging configuration. User pools can export
 * message-delivery error and threat-protection activity logs to external Amazon Web Services services. For more information, see Exporting user pool logs.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const getLogDeliveryConfiguration: API.OperationMethod<
  GetLogDeliveryConfigurationRequest,
  GetLogDeliveryConfigurationResponse,
  GetLogDeliveryConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetLogDeliveryConfigurationRequest,
  output: GetLogDeliveryConfigurationResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLogDeliveryConfiguration",
}));

export type GetSigningCertificateError =
  | InternalErrorException
  | InvalidParameterException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Given a user pool ID, returns the signing certificate for SAML 2.0 federation.
 *
 * Issued certificates are valid for 10 years from the date of issue. Amazon Cognito issues and
 * assigns a new signing certificate annually. This renewal process returns a new value in
 * the response to `GetSigningCertificate`, but doesn't invalidate the original
 * certificate.
 *
 * For more information, see Signing SAML requests.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const getSigningCertificate: API.OperationMethod<
  GetSigningCertificateRequest,
  GetSigningCertificateResponse,
  GetSigningCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSigningCertificateRequest,
  output: GetSigningCertificateResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    OperationNotEnabledException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSigningCertificate",
}));

export type GetTokensFromRefreshTokenError =
  | ForbiddenException
  | InternalErrorException
  | InvalidLambdaResponseException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | RefreshTokenReuseException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UnexpectedLambdaException
  | UserLambdaValidationException
  | UserNotFoundException
  | CommonErrors;
/**
 * Given a refresh token, issues new ID, access, and optionally refresh tokens for the
 * user who owns the submitted token. This operation issues a new refresh token and
 * invalidates the original refresh token after an optional grace period when refresh token
 * rotation is enabled. If refresh token rotation is disabled, issues new ID and access
 * tokens only.
 */
export const getTokensFromRefreshToken: API.OperationMethod<
  GetTokensFromRefreshTokenRequest,
  GetTokensFromRefreshTokenResponse,
  GetTokensFromRefreshTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTokensFromRefreshTokenRequest,
  output: GetTokensFromRefreshTokenResponse,
  errors: [
    ForbiddenException,
    InternalErrorException,
    InvalidLambdaResponseException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    RefreshTokenReuseException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UnexpectedLambdaException,
    UserLambdaValidationException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTokensFromRefreshToken",
}));

export type GetUICustomizationError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Given a user pool ID or app client, returns information about classic hosted UI
 * branding that you applied, if any. Returns user-pool level branding information if no
 * app client branding is applied, or if you don't specify an app client ID. Returns
 * an empty object if you haven't applied hosted UI branding to either the client or
 * the user pool. For more information, see Hosted UI (classic) branding.
 */
export const getUICustomization: API.OperationMethod<
  GetUICustomizationRequest,
  GetUICustomizationResponse,
  GetUICustomizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetUICustomizationRequest,
  output: GetUICustomizationResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUICustomization",
}));

export type GetUserError =
  | ForbiddenException
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordResetRequiredException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotConfirmedException
  | UserNotFoundException
  | CommonErrors;
/**
 * Gets user attributes and and MFA settings for the currently signed-in user.
 *
 * Authorize this action with a signed-in user's access token. It must include the scope `aws.cognito.signin.user.admin`.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 */
export const getUser: API.OperationMethod<
  GetUserRequest,
  GetUserResponse,
  GetUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetUserRequest,
  output: GetUserResponse,
  errors: [
    ForbiddenException,
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordResetRequiredException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotConfirmedException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUser",
}));

export type GetUserAttributeVerificationCodeError =
  | CodeDeliveryFailureException
  | ForbiddenException
  | InternalErrorException
  | InvalidEmailRoleAccessPolicyException
  | InvalidLambdaResponseException
  | InvalidParameterException
  | InvalidSmsRoleAccessPolicyException
  | InvalidSmsRoleTrustRelationshipException
  | LimitExceededException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordResetRequiredException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UnexpectedLambdaException
  | UserLambdaValidationException
  | UserNotConfirmedException
  | UserNotFoundException
  | CommonErrors;
/**
 * Given an attribute name, sends a user attribute verification code for the specified
 * attribute name to the currently signed-in user.
 *
 * Authorize this action with a signed-in user's access token. It must include the scope `aws.cognito.signin.user.admin`.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 *
 * This action might generate an SMS text message. Starting June 1, 2021, US telecom carriers
 * require you to register an origination phone number before you can send SMS messages
 * to US phone numbers. If you use SMS text messages in Amazon Cognito, you must register a
 * phone number with Amazon Pinpoint.
 * Amazon Cognito uses the registered number automatically. Otherwise, Amazon Cognito users who must
 * receive SMS messages might not be able to sign up, activate their accounts, or sign
 * in.
 *
 * If you have never used SMS text messages with Amazon Cognito or any other Amazon Web Services service,
 * Amazon Simple Notification Service might place your account in the SMS sandbox. In
 * sandbox
 * mode
 * , you can send messages only to verified phone
 * numbers. After you test your app while in the sandbox environment, you can move out
 * of the sandbox and into production. For more information, see SMS message settings for Amazon Cognito user pools in the Amazon Cognito
 * Developer Guide.
 */
export const getUserAttributeVerificationCode: API.OperationMethod<
  GetUserAttributeVerificationCodeRequest,
  GetUserAttributeVerificationCodeResponse,
  GetUserAttributeVerificationCodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetUserAttributeVerificationCodeRequest,
  output: GetUserAttributeVerificationCodeResponse,
  errors: [
    CodeDeliveryFailureException,
    ForbiddenException,
    InternalErrorException,
    InvalidEmailRoleAccessPolicyException,
    InvalidLambdaResponseException,
    InvalidParameterException,
    InvalidSmsRoleAccessPolicyException,
    InvalidSmsRoleTrustRelationshipException,
    LimitExceededException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordResetRequiredException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UnexpectedLambdaException,
    UserLambdaValidationException,
    UserNotConfirmedException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUserAttributeVerificationCode",
}));

export type GetUserAuthFactorsError =
  | ForbiddenException
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordResetRequiredException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotConfirmedException
  | UserNotFoundException
  | CommonErrors;
/**
 * Lists the authentication options for the currently signed-in user. Returns the
 * following:
 *
 * - The user's multi-factor authentication (MFA) preferences.
 *
 * - The user's options for choice-based authentication with the
 * `USER_AUTH` flow.
 *
 * Authorize this action with a signed-in user's access token. It must include the scope `aws.cognito.signin.user.admin`.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 */
export const getUserAuthFactors: API.OperationMethod<
  GetUserAuthFactorsRequest,
  GetUserAuthFactorsResponse,
  GetUserAuthFactorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetUserAuthFactorsRequest,
  output: GetUserAuthFactorsResponse,
  errors: [
    ForbiddenException,
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordResetRequiredException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotConfirmedException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUserAuthFactors",
}));

export type GetUserPoolMfaConfigError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Given a user pool ID, returns configuration for sign-in with WebAuthn authenticators
 * and for multi-factor authentication (MFA). This operation describes the
 * following:
 *
 * - The WebAuthn relying party (RP) ID and user-verification settings.
 *
 * - The required, optional, or disabled state of MFA for all user pool
 * users.
 *
 * - The message templates for email and SMS MFA.
 *
 * - The enabled or disabled state of time-based one-time password (TOTP)
 * MFA.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const getUserPoolMfaConfig: API.OperationMethod<
  GetUserPoolMfaConfigRequest,
  GetUserPoolMfaConfigResponse,
  GetUserPoolMfaConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetUserPoolMfaConfigRequest,
  output: GetUserPoolMfaConfigResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUserPoolMfaConfig",
}));

export type GlobalSignOutError =
  | ForbiddenException
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordResetRequiredException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotConfirmedException
  | CommonErrors;
/**
 * Invalidates the identity, access, and refresh tokens that Amazon Cognito issued to a user. Call
 * this operation when your user signs out of your app. This results in the following
 * behavior.
 *
 * - Amazon Cognito no longer accepts *token-authorized* user operations
 * that you authorize with a signed-out user's access tokens. For more information,
 * see Using the Amazon Cognito user pools API and user pool
 * endpoints.
 *
 * Amazon Cognito returns an `Access Token has been revoked` error when your
 * app attempts to authorize a user pools API request with a revoked access token
 * that contains the scope `aws.cognito.signin.user.admin`.
 *
 * - Amazon Cognito no longer accepts a signed-out user's ID token in a GetId request to an identity pool with
 * `ServerSideTokenCheck` enabled for its user pool IdP
 * configuration in CognitoIdentityProvider.
 *
 * - Amazon Cognito no longer accepts a signed-out user's refresh tokens in refresh
 * requests.
 *
 * Other requests might be valid until your user's token expires. This operation
 * doesn't clear the managed login session cookie. To clear the session for
 * a user who signed in with managed login or the classic hosted UI, direct their browser
 * session to the logout endpoint.
 *
 * Authorize this action with a signed-in user's access token. It must include the scope `aws.cognito.signin.user.admin`.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 */
export const globalSignOut: API.OperationMethod<
  GlobalSignOutRequest,
  GlobalSignOutResponse,
  GlobalSignOutError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GlobalSignOutRequest,
  output: GlobalSignOutResponse,
  errors: [
    ForbiddenException,
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordResetRequiredException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotConfirmedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GlobalSignOut",
}));

export type InitiateAuthError =
  | ForbiddenException
  | InternalErrorException
  | InvalidEmailRoleAccessPolicyException
  | InvalidLambdaResponseException
  | InvalidParameterException
  | InvalidSmsRoleAccessPolicyException
  | InvalidSmsRoleTrustRelationshipException
  | InvalidUserPoolConfigurationException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordResetRequiredException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UnexpectedLambdaException
  | UnsupportedOperationException
  | UserLambdaValidationException
  | UserNotConfirmedException
  | UserNotFoundException
  | CommonErrors;
/**
 * Declares an authentication flow and initiates sign-in for a user in the Amazon Cognito user
 * directory. Amazon Cognito might respond with an additional challenge or an
 * `AuthenticationResult` that contains the outcome of a successful
 * authentication. You can't sign in a user with a federated IdP with
 * `InitiateAuth`. For more information, see Authentication.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 *
 * This action might generate an SMS text message. Starting June 1, 2021, US telecom carriers
 * require you to register an origination phone number before you can send SMS messages
 * to US phone numbers. If you use SMS text messages in Amazon Cognito, you must register a
 * phone number with Amazon Pinpoint.
 * Amazon Cognito uses the registered number automatically. Otherwise, Amazon Cognito users who must
 * receive SMS messages might not be able to sign up, activate their accounts, or sign
 * in.
 *
 * If you have never used SMS text messages with Amazon Cognito or any other Amazon Web Services service,
 * Amazon Simple Notification Service might place your account in the SMS sandbox. In
 * sandbox
 * mode
 * , you can send messages only to verified phone
 * numbers. After you test your app while in the sandbox environment, you can move out
 * of the sandbox and into production. For more information, see SMS message settings for Amazon Cognito user pools in the Amazon Cognito
 * Developer Guide.
 */
export const initiateAuth: API.OperationMethod<
  InitiateAuthRequest,
  InitiateAuthResponse,
  InitiateAuthError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: InitiateAuthRequest,
  output: InitiateAuthResponse,
  errors: [
    ForbiddenException,
    InternalErrorException,
    InvalidEmailRoleAccessPolicyException,
    InvalidLambdaResponseException,
    InvalidParameterException,
    InvalidSmsRoleAccessPolicyException,
    InvalidSmsRoleTrustRelationshipException,
    InvalidUserPoolConfigurationException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordResetRequiredException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UnexpectedLambdaException,
    UnsupportedOperationException,
    UserLambdaValidationException,
    UserNotConfirmedException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InitiateAuth",
}));

export type ListDevicesError =
  | ForbiddenException
  | InternalErrorException
  | InvalidParameterException
  | InvalidUserPoolConfigurationException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordResetRequiredException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotConfirmedException
  | UserNotFoundException
  | CommonErrors;
/**
 * Lists the devices that Amazon Cognito has registered to the currently signed-in user. For more
 * information about device authentication, see Working with user devices in your user pool.
 *
 * Authorize this action with a signed-in user's access token. It must include the scope `aws.cognito.signin.user.admin`.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 */
export const listDevices: API.OperationMethod<
  ListDevicesRequest,
  ListDevicesResponse,
  ListDevicesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListDevicesRequest,
  output: ListDevicesResponse,
  errors: [
    ForbiddenException,
    InternalErrorException,
    InvalidParameterException,
    InvalidUserPoolConfigurationException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordResetRequiredException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotConfirmedException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDevices",
}));

export type ListGroupsError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Given a user pool ID, returns user pool groups and their details.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const listGroups: API.PaginatedOperationMethod<
  ListGroupsRequest,
  ListGroupsResponse,
  ListGroupsError,
  Credentials | HttpClient.HttpClient,
  GroupType
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListGroupsRequest,
  output: ListGroupsResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Groups",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListIdentityProvidersError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Given a user pool ID, returns information about configured identity providers (IdPs).
 * For more information about IdPs, see Third-party IdP sign-in.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const listIdentityProviders: API.PaginatedOperationMethod<
  ListIdentityProvidersRequest,
  ListIdentityProvidersResponse,
  ListIdentityProvidersError,
  Credentials | HttpClient.HttpClient,
  ProviderDescription
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListIdentityProvidersRequest,
  output: ListIdentityProvidersResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIdentityProviders",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Providers",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListResourceServersError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Given a user pool ID, returns all resource servers and their details. For more
 * information about resource servers, see Access control with resource servers.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const listResourceServers: API.PaginatedOperationMethod<
  ListResourceServersRequest,
  ListResourceServersResponse,
  ListResourceServersError,
  Credentials | HttpClient.HttpClient,
  ResourceServerType
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListResourceServersRequest,
  output: ListResourceServersResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceServers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ResourceServers",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists the tags that are assigned to an Amazon Cognito user pool. For more information, see
 * Tagging
 * resources.
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
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListTermsError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns details about all terms documents for the requested user pool.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const listTerms: API.OperationMethod<
  ListTermsRequest,
  ListTermsResponse,
  ListTermsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTermsRequest,
  output: ListTermsResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTerms",
}));

export type ListUserImportJobsError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Given a user pool ID, returns user import jobs and their details. Import jobs are
 * retained in user pool configuration so that you can stage, stop, start, review, and
 * delete them. For more information about user import, see Importing users from a CSV file.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const listUserImportJobs: API.OperationMethod<
  ListUserImportJobsRequest,
  ListUserImportJobsResponse,
  ListUserImportJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListUserImportJobsRequest,
  output: ListUserImportJobsResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUserImportJobs",
}));

export type ListUserPoolClientsError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Given a user pool ID, lists app clients. App clients are sets of rules for the access
 * that you want a user pool to grant to one application. For more information, see App clients.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const listUserPoolClients: API.PaginatedOperationMethod<
  ListUserPoolClientsRequest,
  ListUserPoolClientsResponse,
  ListUserPoolClientsError,
  Credentials | HttpClient.HttpClient,
  UserPoolClientDescription
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListUserPoolClientsRequest,
  output: ListUserPoolClientsResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUserPoolClients",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "UserPoolClients",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListUserPoolClientSecretsError =
  | InternalServerException
  | InvalidParameterException
  | LimitExceededException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists all client secrets associated with a user pool app client. Returns metadata about the secrets. The response does not include pagination tokens as there are only 2 secrets at any given time and we return both with every ListUserPoolClientSecrets call. For security reasons, the response never reveals the actual secret value in ClientSecretValue.
 */
export const listUserPoolClientSecrets: API.OperationMethod<
  ListUserPoolClientSecretsRequest,
  ListUserPoolClientSecretsResponse,
  ListUserPoolClientSecretsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListUserPoolClientSecretsRequest,
  output: ListUserPoolClientSecretsResponse,
  errors: [
    InternalServerException,
    InvalidParameterException,
    LimitExceededException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUserPoolClientSecrets",
}));

export type ListUserPoolReplicasError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists all replicas for a user pool, including both primary and secondary replicas. We
 * recommend using pagination to ensure that the operation returns quickly and
 * successfully.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const listUserPoolReplicas: API.OperationMethod<
  ListUserPoolReplicasRequest,
  ListUserPoolReplicasResponse,
  ListUserPoolReplicasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListUserPoolReplicasRequest,
  output: ListUserPoolReplicasResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUserPoolReplicas",
}));

export type ListUserPoolsError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists user pools and their details in the current Amazon Web Services account.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const listUserPools: API.PaginatedOperationMethod<
  ListUserPoolsRequest,
  ListUserPoolsResponse,
  ListUserPoolsError,
  Credentials | HttpClient.HttpClient,
  UserPoolDescriptionType
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListUserPoolsRequest,
  output: ListUserPoolsResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUserPools",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "UserPools",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListUsersError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Given a user pool ID, returns a list of users and their basic details in a user
 * pool.
 *
 * This operation is eventually consistent. You might experience a delay before results
 * are up-to-date. To validate the existence or configuration of an individual user, use
 * `AdminGetUser`.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const listUsers: API.PaginatedOperationMethod<
  ListUsersRequest,
  ListUsersResponse,
  ListUsersError,
  Credentials | HttpClient.HttpClient,
  UserType
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListUsersRequest,
  output: ListUsersResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUsers",
  pagination: {
    inputToken: "PaginationToken",
    outputToken: "PaginationToken",
    items: "Users",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListUsersInGroupError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Given a user pool ID and a group name, returns a list of users in the group. For more
 * information about user pool groups, see Adding groups to a user pool.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const listUsersInGroup: API.PaginatedOperationMethod<
  ListUsersInGroupRequest,
  ListUsersInGroupResponse,
  ListUsersInGroupError,
  Credentials | HttpClient.HttpClient,
  UserType
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListUsersInGroupRequest,
  output: ListUsersInGroupResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUsersInGroup",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Users",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListWebAuthnCredentialsError =
  | ForbiddenException
  | InternalErrorException
  | InvalidParameterException
  | LimitExceededException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordResetRequiredException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Generates a list of the currently signed-in user's registered passkey, or
 * WebAuthn, credentials.
 *
 * Authorize this action with a signed-in user's access token. It must include the scope `aws.cognito.signin.user.admin`.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 */
export const listWebAuthnCredentials: API.OperationMethod<
  ListWebAuthnCredentialsRequest,
  ListWebAuthnCredentialsResponse,
  ListWebAuthnCredentialsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListWebAuthnCredentialsRequest,
  output: ListWebAuthnCredentialsResponse,
  errors: [
    ForbiddenException,
    InternalErrorException,
    InvalidParameterException,
    LimitExceededException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordResetRequiredException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWebAuthnCredentials",
}));

export type ResendConfirmationCodeError =
  | CodeDeliveryFailureException
  | ForbiddenException
  | InternalErrorException
  | InvalidEmailRoleAccessPolicyException
  | InvalidLambdaResponseException
  | InvalidParameterException
  | InvalidSmsRoleAccessPolicyException
  | InvalidSmsRoleTrustRelationshipException
  | LimitExceededException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UnexpectedLambdaException
  | UserLambdaValidationException
  | UserNotFoundException
  | CommonErrors;
/**
 * Resends the code that confirms a new account for a user who has signed up in your user
 * pool. Amazon Cognito sends confirmation codes to the user attribute in the
 * `AutoVerifiedAttributes` property of your user pool. When you prompt new
 * users for the confirmation code, include a "Resend code" option that generates a call to
 * this API operation.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 *
 * This action might generate an SMS text message. Starting June 1, 2021, US telecom carriers
 * require you to register an origination phone number before you can send SMS messages
 * to US phone numbers. If you use SMS text messages in Amazon Cognito, you must register a
 * phone number with Amazon Pinpoint.
 * Amazon Cognito uses the registered number automatically. Otherwise, Amazon Cognito users who must
 * receive SMS messages might not be able to sign up, activate their accounts, or sign
 * in.
 *
 * If you have never used SMS text messages with Amazon Cognito or any other Amazon Web Services service,
 * Amazon Simple Notification Service might place your account in the SMS sandbox. In
 * sandbox
 * mode
 * , you can send messages only to verified phone
 * numbers. After you test your app while in the sandbox environment, you can move out
 * of the sandbox and into production. For more information, see SMS message settings for Amazon Cognito user pools in the Amazon Cognito
 * Developer Guide.
 */
export const resendConfirmationCode: API.OperationMethod<
  ResendConfirmationCodeRequest,
  ResendConfirmationCodeResponse,
  ResendConfirmationCodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ResendConfirmationCodeRequest,
  output: ResendConfirmationCodeResponse,
  errors: [
    CodeDeliveryFailureException,
    ForbiddenException,
    InternalErrorException,
    InvalidEmailRoleAccessPolicyException,
    InvalidLambdaResponseException,
    InvalidParameterException,
    InvalidSmsRoleAccessPolicyException,
    InvalidSmsRoleTrustRelationshipException,
    LimitExceededException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UnexpectedLambdaException,
    UserLambdaValidationException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResendConfirmationCode",
}));

export type RespondToAuthChallengeError =
  | AliasExistsException
  | CodeMismatchException
  | ExpiredCodeException
  | ForbiddenException
  | InternalErrorException
  | InvalidEmailRoleAccessPolicyException
  | InvalidLambdaResponseException
  | InvalidParameterException
  | InvalidPasswordException
  | InvalidSmsRoleAccessPolicyException
  | InvalidSmsRoleTrustRelationshipException
  | InvalidUserPoolConfigurationException
  | MFAMethodNotFoundException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordHistoryPolicyViolationException
  | PasswordResetRequiredException
  | ResourceNotFoundException
  | SoftwareTokenMFANotFoundException
  | TooManyRequestsException
  | UnexpectedLambdaException
  | UserLambdaValidationException
  | UserNotConfirmedException
  | UserNotFoundException
  | CommonErrors;
/**
 * Some API operations in a user pool generate a challenge, like a prompt for an MFA
 * code, for device authentication that bypasses MFA, or for a custom authentication
 * challenge. A `RespondToAuthChallenge` API request provides the answer to that
 * challenge, like a code or a secure remote password (SRP). The parameters of a response
 * to an authentication challenge vary with the type of challenge.
 *
 * For more information about custom authentication challenges, see Custom
 * authentication challenge Lambda triggers.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 *
 * This action might generate an SMS text message. Starting June 1, 2021, US telecom carriers
 * require you to register an origination phone number before you can send SMS messages
 * to US phone numbers. If you use SMS text messages in Amazon Cognito, you must register a
 * phone number with Amazon Pinpoint.
 * Amazon Cognito uses the registered number automatically. Otherwise, Amazon Cognito users who must
 * receive SMS messages might not be able to sign up, activate their accounts, or sign
 * in.
 *
 * If you have never used SMS text messages with Amazon Cognito or any other Amazon Web Services service,
 * Amazon Simple Notification Service might place your account in the SMS sandbox. In
 * sandbox
 * mode
 * , you can send messages only to verified phone
 * numbers. After you test your app while in the sandbox environment, you can move out
 * of the sandbox and into production. For more information, see SMS message settings for Amazon Cognito user pools in the Amazon Cognito
 * Developer Guide.
 */
export const respondToAuthChallenge: API.OperationMethod<
  RespondToAuthChallengeRequest,
  RespondToAuthChallengeResponse,
  RespondToAuthChallengeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RespondToAuthChallengeRequest,
  output: RespondToAuthChallengeResponse,
  errors: [
    AliasExistsException,
    CodeMismatchException,
    ExpiredCodeException,
    ForbiddenException,
    InternalErrorException,
    InvalidEmailRoleAccessPolicyException,
    InvalidLambdaResponseException,
    InvalidParameterException,
    InvalidPasswordException,
    InvalidSmsRoleAccessPolicyException,
    InvalidSmsRoleTrustRelationshipException,
    InvalidUserPoolConfigurationException,
    MFAMethodNotFoundException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordHistoryPolicyViolationException,
    PasswordResetRequiredException,
    ResourceNotFoundException,
    SoftwareTokenMFANotFoundException,
    TooManyRequestsException,
    UnexpectedLambdaException,
    UserLambdaValidationException,
    UserNotConfirmedException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RespondToAuthChallenge",
}));

export type RevokeTokenError =
  | ForbiddenException
  | InternalErrorException
  | InvalidParameterException
  | OperationNotEnabledException
  | TooManyRequestsException
  | UnauthorizedException
  | UnsupportedOperationException
  | UnsupportedTokenTypeException
  | CommonErrors;
/**
 * Revokes all of the access tokens generated by, and at the same time as, the specified
 * refresh token. After a token is revoked, you can't use the revoked token to access Amazon Cognito
 * user APIs, or to authorize access to your resource server.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 */
export const revokeToken: API.OperationMethod<
  RevokeTokenRequest,
  RevokeTokenResponse,
  RevokeTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RevokeTokenRequest,
  output: RevokeTokenResponse,
  errors: [
    ForbiddenException,
    InternalErrorException,
    InvalidParameterException,
    OperationNotEnabledException,
    TooManyRequestsException,
    UnauthorizedException,
    UnsupportedOperationException,
    UnsupportedTokenTypeException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RevokeToken",
}));

export type SetLogDeliveryConfigurationError =
  | FeatureUnavailableInTierException
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Sets up or modifies the logging configuration of a user pool. User pools can export
 * user notification logs and, when threat protection is active, user-activity logs. For
 * more information, see Exporting user
 * pool logs.
 */
export const setLogDeliveryConfiguration: API.OperationMethod<
  SetLogDeliveryConfigurationRequest,
  SetLogDeliveryConfigurationResponse,
  SetLogDeliveryConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SetLogDeliveryConfigurationRequest,
  output: SetLogDeliveryConfigurationResponse,
  errors: [
    FeatureUnavailableInTierException,
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetLogDeliveryConfiguration",
}));

export type SetRiskConfigurationError =
  | CodeDeliveryFailureException
  | InternalErrorException
  | InvalidEmailRoleAccessPolicyException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserPoolAddOnNotEnabledException
  | CommonErrors;
/**
 * Configures threat protection for a user pool or app client. Sets configuration for the
 * following.
 *
 * - Responses to risks with adaptive authentication
 *
 * - Responses to vulnerable passwords with compromised-credentials
 * detection
 *
 * - Notifications to users who have had risky activity detected
 *
 * - IP-address denylist and allowlist
 *
 * To set the risk configuration for the user pool to defaults, send this request with
 * only the `UserPoolId` parameter. To reset the threat protection settings of
 * an app client to be inherited from the user pool, send `UserPoolId` and
 * `ClientId` parameters only. To change threat protection to audit-only or
 * off, update the value of `UserPoolAddOns` in an `UpdateUserPool`
 * request. To activate this setting, your user pool must be on the
 * Plus tier.
 *
 * In secondary regions for user pools with multi-region replication, only the
 * `SourceARN` and `From` attributes of
 * `NotifyConfiguration` can be modified to configure region-specific SES
 * integration. All other risk configuration settings must match the existing values to
 * maintain consistency across replicas.
 */
export const setRiskConfiguration: API.OperationMethod<
  SetRiskConfigurationRequest,
  SetRiskConfigurationResponse,
  SetRiskConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SetRiskConfigurationRequest,
  output: SetRiskConfigurationResponse,
  errors: [
    CodeDeliveryFailureException,
    InternalErrorException,
    InvalidEmailRoleAccessPolicyException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserPoolAddOnNotEnabledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetRiskConfiguration",
}));

export type SetUICustomizationError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Configures UI branding settings for domains with the hosted UI (classic) branding
 * version. Your user pool must have a domain. Configure a domain with .
 *
 * Set the default configuration for all clients with a `ClientId` of
 * `ALL`. When the `ClientId` value is an app client ID, the
 * settings you pass in this request apply to that app client and override the default
 * `ALL` configuration.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const setUICustomization: API.OperationMethod<
  SetUICustomizationRequest,
  SetUICustomizationResponse,
  SetUICustomizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SetUICustomizationRequest,
  output: SetUICustomizationResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetUICustomization",
}));

export type SetUserMFAPreferenceError =
  | ForbiddenException
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordResetRequiredException
  | ResourceNotFoundException
  | UserNotConfirmedException
  | UserNotFoundException
  | CommonErrors;
/**
 * Set the user's multi-factor authentication (MFA) method preference, including which
 * MFA factors are activated and if any are preferred. Only one factor can be set as
 * preferred. The preferred MFA factor will be used to authenticate a user if multiple
 * factors are activated. If multiple options are activated and no preference is set, a
 * challenge to choose an MFA option will be returned during sign-in. If an MFA type is
 * activated for a user, the user will be prompted for MFA during all sign-in attempts
 * unless device tracking is turned on and the device has been trusted. If you want MFA to
 * be applied selectively based on the assessed risk level of sign-in attempts, deactivate
 * MFA for users and turn on Adaptive Authentication for the user pool.
 *
 * Authorize this action with a signed-in user's access token. It must include the scope `aws.cognito.signin.user.admin`.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 */
export const setUserMFAPreference: API.OperationMethod<
  SetUserMFAPreferenceRequest,
  SetUserMFAPreferenceResponse,
  SetUserMFAPreferenceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SetUserMFAPreferenceRequest,
  output: SetUserMFAPreferenceResponse,
  errors: [
    ForbiddenException,
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordResetRequiredException,
    ResourceNotFoundException,
    UserNotConfirmedException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetUserMFAPreference",
}));

export type SetUserPoolMfaConfigError =
  | ConcurrentModificationException
  | FeatureUnavailableInTierException
  | InternalErrorException
  | InvalidParameterException
  | InvalidSmsRoleAccessPolicyException
  | InvalidSmsRoleTrustRelationshipException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Sets user pool multi-factor authentication (MFA) and passkey configuration. For more
 * information about user pool MFA, see Adding MFA. For more information about WebAuthn passkeys see Authentication flows.
 *
 * This action might generate an SMS text message. Starting June 1, 2021, US telecom carriers
 * require you to register an origination phone number before you can send SMS messages
 * to US phone numbers. If you use SMS text messages in Amazon Cognito, you must register a
 * phone number with Amazon Pinpoint.
 * Amazon Cognito uses the registered number automatically. Otherwise, Amazon Cognito users who must
 * receive SMS messages might not be able to sign up, activate their accounts, or sign
 * in.
 *
 * If you have never used SMS text messages with Amazon Cognito or any other Amazon Web Services service,
 * Amazon Simple Notification Service might place your account in the SMS sandbox. In
 * sandbox
 * mode
 * , you can send messages only to verified phone
 * numbers. After you test your app while in the sandbox environment, you can move out
 * of the sandbox and into production. For more information, see SMS message settings for Amazon Cognito user pools in the Amazon Cognito
 * Developer Guide.
 */
export const setUserPoolMfaConfig: API.OperationMethod<
  SetUserPoolMfaConfigRequest,
  SetUserPoolMfaConfigResponse,
  SetUserPoolMfaConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SetUserPoolMfaConfigRequest,
  output: SetUserPoolMfaConfigResponse,
  errors: [
    ConcurrentModificationException,
    FeatureUnavailableInTierException,
    InternalErrorException,
    InvalidParameterException,
    InvalidSmsRoleAccessPolicyException,
    InvalidSmsRoleTrustRelationshipException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetUserPoolMfaConfig",
}));

export type SetUserSettingsError =
  | ForbiddenException
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordResetRequiredException
  | ResourceNotFoundException
  | UserNotConfirmedException
  | UserNotFoundException
  | CommonErrors;
/**
 * *This action is no longer supported.* You can use it to configure
 * only SMS MFA. You can't use it to configure time-based one-time password (TOTP) software
 * token or email MFA.
 *
 * Authorize this action with a signed-in user's access token. It must include the scope `aws.cognito.signin.user.admin`.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 */
export const setUserSettings: API.OperationMethod<
  SetUserSettingsRequest,
  SetUserSettingsResponse,
  SetUserSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SetUserSettingsRequest,
  output: SetUserSettingsResponse,
  errors: [
    ForbiddenException,
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordResetRequiredException,
    ResourceNotFoundException,
    UserNotConfirmedException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetUserSettings",
}));

export type SignUpError =
  | CodeDeliveryFailureException
  | ForbiddenException
  | InternalErrorException
  | InvalidEmailRoleAccessPolicyException
  | InvalidLambdaResponseException
  | InvalidParameterException
  | InvalidPasswordException
  | InvalidSmsRoleAccessPolicyException
  | InvalidSmsRoleTrustRelationshipException
  | LimitExceededException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UnexpectedLambdaException
  | UserLambdaValidationException
  | UsernameExistsException
  | CommonErrors;
/**
 * Registers a user with an app client and requests a user name, password, and user
 * attributes in the user pool.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 *
 * This action might generate an SMS text message. Starting June 1, 2021, US telecom carriers
 * require you to register an origination phone number before you can send SMS messages
 * to US phone numbers. If you use SMS text messages in Amazon Cognito, you must register a
 * phone number with Amazon Pinpoint.
 * Amazon Cognito uses the registered number automatically. Otherwise, Amazon Cognito users who must
 * receive SMS messages might not be able to sign up, activate their accounts, or sign
 * in.
 *
 * If you have never used SMS text messages with Amazon Cognito or any other Amazon Web Services service,
 * Amazon Simple Notification Service might place your account in the SMS sandbox. In
 * sandbox
 * mode
 * , you can send messages only to verified phone
 * numbers. After you test your app while in the sandbox environment, you can move out
 * of the sandbox and into production. For more information, see SMS message settings for Amazon Cognito user pools in the Amazon Cognito
 * Developer Guide.
 *
 * You might receive a `LimitExceeded` exception in response to this request
 * if you have exceeded a rate quota for email or SMS messages, and if your user pool
 * automatically verifies email addresses or phone numbers. When you get this exception in
 * the response, the user is successfully created and is in an `UNCONFIRMED`
 * state.
 */
export const signUp: API.OperationMethod<
  SignUpRequest,
  SignUpResponse,
  SignUpError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SignUpRequest,
  output: SignUpResponse,
  errors: [
    CodeDeliveryFailureException,
    ForbiddenException,
    InternalErrorException,
    InvalidEmailRoleAccessPolicyException,
    InvalidLambdaResponseException,
    InvalidParameterException,
    InvalidPasswordException,
    InvalidSmsRoleAccessPolicyException,
    InvalidSmsRoleTrustRelationshipException,
    LimitExceededException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UnexpectedLambdaException,
    UserLambdaValidationException,
    UsernameExistsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SignUp",
}));

export type StartUserImportJobError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Instructs your user pool to start importing users from a CSV file that contains their
 * usernames and attributes. For more information about importing users from a CSV file,
 * see Importing users from a CSV file.
 */
export const startUserImportJob: API.OperationMethod<
  StartUserImportJobRequest,
  StartUserImportJobResponse,
  StartUserImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartUserImportJobRequest,
  output: StartUserImportJobResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartUserImportJob",
}));

export type StartWebAuthnRegistrationError =
  | ForbiddenException
  | InternalErrorException
  | InvalidParameterException
  | LimitExceededException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordResetRequiredException
  | TooManyRequestsException
  | WebAuthnConfigurationMissingException
  | WebAuthnNotEnabledException
  | CommonErrors;
/**
 * Requests credential creation options from your user pool for the currently signed-in
 * user. Returns information about the user pool, the user profile, and authentication
 * requirements. Users must provide this information in their request to enroll your
 * application with their passkey provider.
 *
 * Authorize this action with a signed-in user's access token. It must include the scope `aws.cognito.signin.user.admin`.
 */
export const startWebAuthnRegistration: API.OperationMethod<
  StartWebAuthnRegistrationRequest,
  StartWebAuthnRegistrationResponse,
  StartWebAuthnRegistrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartWebAuthnRegistrationRequest,
  output: StartWebAuthnRegistrationResponse,
  errors: [
    ForbiddenException,
    InternalErrorException,
    InvalidParameterException,
    LimitExceededException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordResetRequiredException,
    TooManyRequestsException,
    WebAuthnConfigurationMissingException,
    WebAuthnNotEnabledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartWebAuthnRegistration",
}));

export type StopUserImportJobError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Instructs your user pool to stop a running job that's importing users from a CSV
 * file that contains their usernames and attributes. For more information about importing
 * users from a CSV file, see Importing users from a CSV file.
 */
export const stopUserImportJob: API.OperationMethod<
  StopUserImportJobRequest,
  StopUserImportJobResponse,
  StopUserImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopUserImportJobRequest,
  output: StopUserImportJobResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopUserImportJob",
}));

export type TagResourceError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Assigns a set of tags to an Amazon Cognito user pool. A tag is a label that you can use to
 * categorize and manage user pools in different ways, such as by purpose, owner,
 * environment, or other criteria.
 *
 * Each tag consists of a key and value, both of which you define. A key is a general
 * category for more specific values. For example, if you have two versions of a user pool,
 * one for testing and another for production, you might assign an `Environment`
 * tag key to both user pools. The value of this key might be `Test` for one
 * user pool, and `Production` for the other.
 *
 * Tags are useful for cost tracking and access control. You can activate your tags so
 * that they appear on the Billing and Cost Management console, where you can track the
 * costs associated with your user pools. In an Identity and Access Management policy, you can constrain
 * permissions for user pools based on specific tags or tag values.
 *
 * You can use this action up to 5 times per second, per account. A user pool can have as
 * many as 50 tags.
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
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Given tag IDs that you previously assigned to a user pool, removes them.
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
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateAuthEventFeedbackError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotFoundException
  | UserPoolAddOnNotEnabledException
  | CommonErrors;
/**
 * Provides the feedback for an authentication event generated by threat protection
 * features. The user's response indicates that you think that the event either was from a
 * valid user or was an unwanted authentication attempt. This feedback improves the risk
 * evaluation decision for the user pool as part of Amazon Cognito threat protection.
 * To activate this setting, your user pool must be on the
 * Plus tier.
 *
 * This operation requires a `FeedbackToken` that Amazon Cognito generates and adds to
 * notification emails when users have potentially suspicious authentication events. Users
 * invoke this operation when they select the link that corresponds to
 * `{one-click-link-valid}` or `{one-click-link-invalid}` in your
 * notification template. Because `FeedbackToken` is a required parameter, you
 * can't make requests to `UpdateAuthEventFeedback` without the contents of
 * the notification email message.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 */
export const updateAuthEventFeedback: API.OperationMethod<
  UpdateAuthEventFeedbackRequest,
  UpdateAuthEventFeedbackResponse,
  UpdateAuthEventFeedbackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAuthEventFeedbackRequest,
  output: UpdateAuthEventFeedbackResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotFoundException,
    UserPoolAddOnNotEnabledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAuthEventFeedback",
}));

export type UpdateDeviceStatusError =
  | ForbiddenException
  | InternalErrorException
  | InvalidParameterException
  | InvalidUserPoolConfigurationException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordResetRequiredException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotConfirmedException
  | UserNotFoundException
  | CommonErrors;
/**
 * Updates the status of a the currently signed-in user's device so that it is
 * marked as remembered or not remembered for the purpose of device authentication. Device
 * authentication is a "remember me" mechanism that silently completes sign-in from trusted
 * devices with a device key instead of a user-provided MFA code. This operation changes
 * the status of a device without deleting it, so you can enable it again later. For more
 * information about device authentication, see Working with devices.
 *
 * Authorize this action with a signed-in user's access token. It must include the scope `aws.cognito.signin.user.admin`.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 */
export const updateDeviceStatus: API.OperationMethod<
  UpdateDeviceStatusRequest,
  UpdateDeviceStatusResponse,
  UpdateDeviceStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDeviceStatusRequest,
  output: UpdateDeviceStatusResponse,
  errors: [
    ForbiddenException,
    InternalErrorException,
    InvalidParameterException,
    InvalidUserPoolConfigurationException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordResetRequiredException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotConfirmedException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDeviceStatus",
}));

export type UpdateGroupError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Given the name of a user pool group, updates any of the properties for precedence,
 * IAM role, or description. For more information about user pool groups, see Adding groups to a user pool.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const updateGroup: API.OperationMethod<
  UpdateGroupRequest,
  UpdateGroupResponse,
  UpdateGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateGroupRequest,
  output: UpdateGroupResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGroup",
}));

export type UpdateIdentityProviderError =
  | ConcurrentModificationException
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UnsupportedIdentityProviderException
  | CommonErrors;
/**
 * Modifies the configuration and trust relationship between a third-party identity
 * provider (IdP) and a user pool. Amazon Cognito accepts sign-in with third-party identity
 * providers through managed login and OIDC relying-party libraries. For more information,
 * see Third-party IdP sign-in.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const updateIdentityProvider: API.OperationMethod<
  UpdateIdentityProviderRequest,
  UpdateIdentityProviderResponse,
  UpdateIdentityProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateIdentityProviderRequest,
  output: UpdateIdentityProviderResponse,
  errors: [
    ConcurrentModificationException,
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UnsupportedIdentityProviderException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIdentityProvider",
}));

export type UpdateManagedLoginBrandingError =
  | ConcurrentModificationException
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Configures the branding settings for a user pool style. This operation is the
 * programmatic option for the configuration of a style in the branding editor.
 *
 * Provides values for UI customization in a `Settings` JSON object and image
 * files in an `Assets` array.
 *
 * This operation has a 2-megabyte request-size limit and include the CSS settings and
 * image assets for your app client. Your branding settings might exceed 2MB in size. Amazon Cognito
 * doesn't require that you pass all parameters in one request and preserves existing
 * style settings that you don't specify. If your request is larger than 2MB, separate it
 * into multiple requests, each with a size smaller than the limit.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const updateManagedLoginBranding: API.OperationMethod<
  UpdateManagedLoginBrandingRequest,
  UpdateManagedLoginBrandingResponse,
  UpdateManagedLoginBrandingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateManagedLoginBrandingRequest,
  output: UpdateManagedLoginBrandingResponse,
  errors: [
    ConcurrentModificationException,
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateManagedLoginBranding",
}));

export type UpdateResourceServerError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the name and scopes of a resource server. All other fields are read-only. For
 * more information about resource servers, see Access control with resource servers.
 *
 * If you don't provide a value for an attribute, it is set to the default
 * value.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const updateResourceServer: API.OperationMethod<
  UpdateResourceServerRequest,
  UpdateResourceServerResponse,
  UpdateResourceServerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateResourceServerRequest,
  output: UpdateResourceServerResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateResourceServer",
}));

export type UpdateTermsError =
  | ConcurrentModificationException
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TermsExistsException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Modifies existing terms documents for the requested app client. When Terms and
 * conditions and Privacy policy documents are configured, the app client displays links to
 * them in the sign-up page of managed login for the app client.
 *
 * You can provide URLs for terms documents in the languages that are supported by managed login localization. Amazon Cognito directs users to the terms documents for
 * their current language, with fallback to `default` if no document exists for
 * the language.
 *
 * Each request accepts one type of terms document and a map of language-to-link for that
 * document type. You must provide both types of terms documents in at least one language
 * before Amazon Cognito displays your terms documents. Supply each type in separate
 * requests.
 *
 * For more information, see Terms documents.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const updateTerms: API.OperationMethod<
  UpdateTermsRequest,
  UpdateTermsResponse,
  UpdateTermsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateTermsRequest,
  output: UpdateTermsResponse,
  errors: [
    ConcurrentModificationException,
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TermsExistsException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTerms",
}));

export type UpdateUserAttributesError =
  | AliasExistsException
  | CodeDeliveryFailureException
  | CodeMismatchException
  | ExpiredCodeException
  | ForbiddenException
  | InternalErrorException
  | InvalidEmailRoleAccessPolicyException
  | InvalidLambdaResponseException
  | InvalidParameterException
  | InvalidSmsRoleAccessPolicyException
  | InvalidSmsRoleTrustRelationshipException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordResetRequiredException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UnexpectedLambdaException
  | UserLambdaValidationException
  | UserNotConfirmedException
  | UserNotFoundException
  | CommonErrors;
/**
 * Updates the currently signed-in user's attributes. To delete an attribute from
 * the user, submit the attribute in your API request with a blank value.
 *
 * For custom attributes, you must add a `custom:` prefix to the attribute
 * name, for example `custom:department`.
 *
 * Authorize this action with a signed-in user's access token. It must include the scope `aws.cognito.signin.user.admin`.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 *
 * This action might generate an SMS text message. Starting June 1, 2021, US telecom carriers
 * require you to register an origination phone number before you can send SMS messages
 * to US phone numbers. If you use SMS text messages in Amazon Cognito, you must register a
 * phone number with Amazon Pinpoint.
 * Amazon Cognito uses the registered number automatically. Otherwise, Amazon Cognito users who must
 * receive SMS messages might not be able to sign up, activate their accounts, or sign
 * in.
 *
 * If you have never used SMS text messages with Amazon Cognito or any other Amazon Web Services service,
 * Amazon Simple Notification Service might place your account in the SMS sandbox. In
 * sandbox
 * mode
 * , you can send messages only to verified phone
 * numbers. After you test your app while in the sandbox environment, you can move out
 * of the sandbox and into production. For more information, see SMS message settings for Amazon Cognito user pools in the Amazon Cognito
 * Developer Guide.
 */
export const updateUserAttributes: API.OperationMethod<
  UpdateUserAttributesRequest,
  UpdateUserAttributesResponse,
  UpdateUserAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateUserAttributesRequest,
  output: UpdateUserAttributesResponse,
  errors: [
    AliasExistsException,
    CodeDeliveryFailureException,
    CodeMismatchException,
    ExpiredCodeException,
    ForbiddenException,
    InternalErrorException,
    InvalidEmailRoleAccessPolicyException,
    InvalidLambdaResponseException,
    InvalidParameterException,
    InvalidSmsRoleAccessPolicyException,
    InvalidSmsRoleTrustRelationshipException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordResetRequiredException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UnexpectedLambdaException,
    UserLambdaValidationException,
    UserNotConfirmedException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUserAttributes",
}));

export type UpdateUserPoolError =
  | ConcurrentModificationException
  | FeatureUnavailableInTierException
  | InternalErrorException
  | InvalidEmailRoleAccessPolicyException
  | InvalidParameterException
  | InvalidSmsRoleAccessPolicyException
  | InvalidSmsRoleTrustRelationshipException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TierChangeNotAllowedException
  | TooManyRequestsException
  | UserImportInProgressException
  | UserPoolTaggingException
  | CommonErrors;
/**
 * Updates the configuration of a user pool. To avoid setting parameters to Amazon Cognito
 * defaults, construct this API request to pass the existing configuration of your user
 * pool, modified to include the changes that you want to make.
 *
 * If you don't provide a value for an attribute, Amazon Cognito sets it to its default value.
 *
 * In secondary regions for user pools with multi-region replication, regional
 * configurations for email, SMS, Lambda functions, and tags can be updated. Both global
 * and regional settings must be provided as inputs, with global settings required to match
 * existing values to maintain consistency across replicas.
 *
 * This action might generate an SMS text message. Starting June 1, 2021, US telecom carriers
 * require you to register an origination phone number before you can send SMS messages
 * to US phone numbers. If you use SMS text messages in Amazon Cognito, you must register a
 * phone number with Amazon Pinpoint.
 * Amazon Cognito uses the registered number automatically. Otherwise, Amazon Cognito users who must
 * receive SMS messages might not be able to sign up, activate their accounts, or sign
 * in.
 *
 * If you have never used SMS text messages with Amazon Cognito or any other Amazon Web Services service,
 * Amazon Simple Notification Service might place your account in the SMS sandbox. In
 * sandbox
 * mode
 * , you can send messages only to verified phone
 * numbers. After you test your app while in the sandbox environment, you can move out
 * of the sandbox and into production. For more information, see SMS message settings for Amazon Cognito user pools in the Amazon Cognito
 * Developer Guide.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const updateUserPool: API.OperationMethod<
  UpdateUserPoolRequest,
  UpdateUserPoolResponse,
  UpdateUserPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateUserPoolRequest,
  output: UpdateUserPoolResponse,
  errors: [
    ConcurrentModificationException,
    FeatureUnavailableInTierException,
    InternalErrorException,
    InvalidEmailRoleAccessPolicyException,
    InvalidParameterException,
    InvalidSmsRoleAccessPolicyException,
    InvalidSmsRoleTrustRelationshipException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TierChangeNotAllowedException,
    TooManyRequestsException,
    UserImportInProgressException,
    UserPoolTaggingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUserPool",
}));

export type UpdateUserPoolClientError =
  | ConcurrentModificationException
  | FeatureUnavailableInTierException
  | InternalErrorException
  | InvalidOAuthFlowException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | ScopeDoesNotExistException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Given a user pool app client ID, updates the configuration. To avoid setting
 * parameters to Amazon Cognito defaults, construct this API request to pass the existing
 * configuration of your app client, modified to include the changes that you want to
 * make.
 *
 * If you don't provide a value for an attribute, Amazon Cognito sets it to its default value.
 *
 * Unlike app clients created in the console, Amazon Cognito doesn't automatically assign a
 * branding style to app clients that you configure with this API operation. Managed login and classic hosted UI pages aren't
 * available for your client until after you apply a branding style.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const updateUserPoolClient: API.OperationMethod<
  UpdateUserPoolClientRequest,
  UpdateUserPoolClientResponse,
  UpdateUserPoolClientError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateUserPoolClientRequest,
  output: UpdateUserPoolClientResponse,
  errors: [
    ConcurrentModificationException,
    FeatureUnavailableInTierException,
    InternalErrorException,
    InvalidOAuthFlowException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    ScopeDoesNotExistException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUserPoolClient",
}));

export type UpdateUserPoolDomainError =
  | ConcurrentModificationException
  | FeatureUnavailableInTierException
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * A user pool domain hosts managed login, an authorization server and web server for
 * authentication in your application. This operation updates the branding version for user
 * pool domains between `1` for hosted UI (classic) and `2` for
 * managed login. It also updates the SSL certificate for user pool custom domains.
 *
 * Changes to the domain branding version take up to one minute to take effect for a
 * prefix domain and up to five minutes for a custom domain.
 *
 * This operation doesn't change the name of your user pool domain. To change your
 * domain, delete it with `DeleteUserPoolDomain` and create a new domain with
 * `CreateUserPoolDomain`.
 *
 * You can pass the ARN of a new Certificate Manager certificate in this request. Typically, ACM
 * certificates automatically renew and you user pool can continue to use the same ARN. But
 * if you generate a new certificate for your custom domain name, replace the original
 * configuration with the new ARN in this request.
 *
 * ACM certificates for custom domains must be in the US East (N. Virginia)
 * Amazon Web Services Region. After you submit your request, Amazon Cognito requires up to 1 hour to distribute
 * your new certificate to your custom domain.
 *
 * For more information about adding a custom domain to your user pool, see Configuring a user pool domain.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const updateUserPoolDomain: API.OperationMethod<
  UpdateUserPoolDomainRequest,
  UpdateUserPoolDomainResponse,
  UpdateUserPoolDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateUserPoolDomainRequest,
  output: UpdateUserPoolDomainResponse,
  errors: [
    ConcurrentModificationException,
    FeatureUnavailableInTierException,
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUserPoolDomain",
}));

export type UpdateUserPoolReplicaError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates replica-specific settings for a user pool replica. You can modify the status
 * to activate or deactivate the replica. This request can be made in both primary and secondary
 * regions of the user pool.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const updateUserPoolReplica: API.OperationMethod<
  UpdateUserPoolReplicaRequest,
  UpdateUserPoolReplicaResponse,
  UpdateUserPoolReplicaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateUserPoolReplicaRequest,
  output: UpdateUserPoolReplicaResponse,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUserPoolReplica",
}));

export type VerifySoftwareTokenError =
  | CodeMismatchException
  | EnableSoftwareTokenMFAException
  | ForbiddenException
  | InternalErrorException
  | InvalidParameterException
  | InvalidUserPoolConfigurationException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordResetRequiredException
  | ResourceNotFoundException
  | SoftwareTokenMFANotFoundException
  | TooManyRequestsException
  | UserNotConfirmedException
  | UserNotFoundException
  | CommonErrors;
/**
 * Registers the current user's time-based one-time password (TOTP) authenticator
 * with a code generated in their authenticator app from a private key that's supplied
 * by your user pool. Marks the user's software token MFA status as "verified" if
 * successful. The request takes an access token or a session string, but not both.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 */
export const verifySoftwareToken: API.OperationMethod<
  VerifySoftwareTokenRequest,
  VerifySoftwareTokenResponse,
  VerifySoftwareTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: VerifySoftwareTokenRequest,
  output: VerifySoftwareTokenResponse,
  errors: [
    CodeMismatchException,
    EnableSoftwareTokenMFAException,
    ForbiddenException,
    InternalErrorException,
    InvalidParameterException,
    InvalidUserPoolConfigurationException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordResetRequiredException,
    ResourceNotFoundException,
    SoftwareTokenMFANotFoundException,
    TooManyRequestsException,
    UserNotConfirmedException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "VerifySoftwareToken",
}));

export type VerifyUserAttributeError =
  | AliasExistsException
  | CodeMismatchException
  | ExpiredCodeException
  | ForbiddenException
  | InternalErrorException
  | InvalidParameterException
  | LimitExceededException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordResetRequiredException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotConfirmedException
  | UserNotFoundException
  | CommonErrors;
/**
 * Submits a verification code for a signed-in user who has added or changed a value of
 * an auto-verified attribute. When successful, the user's attribute becomes verified
 * and the attribute `email_verified` or `phone_number_verified`
 * becomes `true`.
 *
 * If your user pool requires verification before Amazon Cognito updates the attribute value,
 * this operation updates the affected attribute to its pending value.
 *
 * Authorize this action with a signed-in user's access token. It must include the scope `aws.cognito.signin.user.admin`.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 */
export const verifyUserAttribute: API.OperationMethod<
  VerifyUserAttributeRequest,
  VerifyUserAttributeResponse,
  VerifyUserAttributeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: VerifyUserAttributeRequest,
  output: VerifyUserAttributeResponse,
  errors: [
    AliasExistsException,
    CodeMismatchException,
    ExpiredCodeException,
    ForbiddenException,
    InternalErrorException,
    InvalidParameterException,
    LimitExceededException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordResetRequiredException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotConfirmedException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "VerifyUserAttribute",
}));
