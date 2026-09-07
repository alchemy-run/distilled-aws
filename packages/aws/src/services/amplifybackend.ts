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
  sdkId: "AmplifyBackend",
  serviceShapeName: "AmplifyBackend",
});
const auth = T.AwsAuthSigv4({ name: "amplifybackend" });
const ver = T.ServiceVersion("2020-08-11");
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
              `https://amplifybackend-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://amplifybackend-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://amplifybackend.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://amplifybackend.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class GatewayTimeoutException
  extends /*@__PURE__*/ S.TaggedError<GatewayTimeoutException>()(
    "GatewayTimeoutException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(504),
  ).pipe(C.withTimeoutError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      ResourceType: S.optional(S.String),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    {
      LimitType: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export interface CloneBackendRequest {
  AppId: string;
  BackendEnvironmentName: string;
  TargetEnvironmentName?: string;
}
export const CloneBackendRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppId: S.String.pipe(T.HttpLabel("AppId")),
    BackendEnvironmentName: S.String.pipe(
      T.HttpLabel("BackendEnvironmentName"),
    ),
    TargetEnvironmentName: S.optional(S.String),
  })
    .pipe(S.encodeKeys({ TargetEnvironmentName: "targetEnvironmentName" }))
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/backend/{AppId}/environments/{BackendEnvironmentName}/clone",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CloneBackendRequest",
}) as any as S.Schema<CloneBackendRequest>;
export interface CloneBackendResponse {
  AppId?: string;
  BackendEnvironmentName?: string;
  Error?: string;
  JobId?: string;
  Operation?: string;
  Status?: string;
}
export const CloneBackendResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppId: S.optional(S.String),
    BackendEnvironmentName: S.optional(S.String),
    Error: S.optional(S.String),
    JobId: S.optional(S.String),
    Operation: S.optional(S.String),
    Status: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AppId: "appId",
      BackendEnvironmentName: "backendEnvironmentName",
      Error: "error",
      JobId: "jobId",
      Operation: "operation",
      Status: "status",
    }),
  ),
).annotate({
  identifier: "CloneBackendResponse",
}) as any as S.Schema<CloneBackendResponse>;
export interface ResourceConfig {}
export const ResourceConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({ identifier: "ResourceConfig" }) as any as S.Schema<ResourceConfig>;
export interface CreateBackendRequest {
  AppId?: string;
  AppName?: string;
  BackendEnvironmentName?: string;
  ResourceConfig?: ResourceConfig;
  ResourceName?: string;
}
export const CreateBackendRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppId: S.optional(S.String),
    AppName: S.optional(S.String),
    BackendEnvironmentName: S.optional(S.String),
    ResourceConfig: S.optional(ResourceConfig),
    ResourceName: S.optional(S.String),
  })
    .pipe(
      S.encodeKeys({
        AppId: "appId",
        AppName: "appName",
        BackendEnvironmentName: "backendEnvironmentName",
        ResourceConfig: "resourceConfig",
        ResourceName: "resourceName",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/backend" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateBackendRequest",
}) as any as S.Schema<CreateBackendRequest>;
export interface CreateBackendResponse {
  AppId?: string;
  BackendEnvironmentName?: string;
  Error?: string;
  JobId?: string;
  Operation?: string;
  Status?: string;
}
export const CreateBackendResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppId: S.optional(S.String),
    BackendEnvironmentName: S.optional(S.String),
    Error: S.optional(S.String),
    JobId: S.optional(S.String),
    Operation: S.optional(S.String),
    Status: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AppId: "appId",
      BackendEnvironmentName: "backendEnvironmentName",
      Error: "error",
      JobId: "jobId",
      Operation: "operation",
      Status: "status",
    }),
  ),
).annotate({
  identifier: "CreateBackendResponse",
}) as any as S.Schema<CreateBackendResponse>;
export type Mode =
  | "API_KEY"
  | "AWS_IAM"
  | "AMAZON_COGNITO_USER_POOLS"
  | "OPENID_CONNECT"
  | (string & {});
export const Mode = /*@__PURE__*/ S.String;

export interface BackendAPIAppSyncAuthSettings {
  CognitoUserPoolId?: string;
  Description?: string;
  ExpirationTime?: number;
  OpenIDAuthTTL?: string;
  OpenIDClientId?: string;
  OpenIDIatTTL?: string;
  OpenIDIssueURL?: string;
  OpenIDProviderName?: string;
}
export const BackendAPIAppSyncAuthSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CognitoUserPoolId: S.optional(S.String),
    Description: S.optional(S.String),
    ExpirationTime: S.optional(S.Number),
    OpenIDAuthTTL: S.optional(S.String),
    OpenIDClientId: S.optional(S.String),
    OpenIDIatTTL: S.optional(S.String),
    OpenIDIssueURL: S.optional(S.String),
    OpenIDProviderName: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      CognitoUserPoolId: "cognitoUserPoolId",
      Description: "description",
      ExpirationTime: "expirationTime",
      OpenIDAuthTTL: "openIDAuthTTL",
      OpenIDClientId: "openIDClientId",
      OpenIDIatTTL: "openIDIatTTL",
      OpenIDIssueURL: "openIDIssueURL",
      OpenIDProviderName: "openIDProviderName",
    }),
  ),
).annotate({
  identifier: "BackendAPIAppSyncAuthSettings",
}) as any as S.Schema<BackendAPIAppSyncAuthSettings>;
export interface BackendAPIAuthType {
  Mode?: Mode;
  Settings?: BackendAPIAppSyncAuthSettings;
}
export const BackendAPIAuthType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Mode: S.optional(Mode),
    Settings: S.optional(BackendAPIAppSyncAuthSettings),
  }).pipe(S.encodeKeys({ Mode: "mode", Settings: "settings" })),
).annotate({
  identifier: "BackendAPIAuthType",
}) as any as S.Schema<BackendAPIAuthType>;
export type ListOfBackendAPIAuthType = BackendAPIAuthType[];
export const ListOfBackendAPIAuthType =
  /*@__PURE__*/ S.Array(BackendAPIAuthType);
export type ResolutionStrategy =
  | "OPTIMISTIC_CONCURRENCY"
  | "LAMBDA"
  | "AUTOMERGE"
  | "NONE"
  | (string & {});
export const ResolutionStrategy = /*@__PURE__*/ S.String;

export interface BackendAPIConflictResolution {
  ResolutionStrategy?: ResolutionStrategy;
}
export const BackendAPIConflictResolution = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResolutionStrategy: S.optional(ResolutionStrategy) }).pipe(
    S.encodeKeys({ ResolutionStrategy: "resolutionStrategy" }),
  ),
).annotate({
  identifier: "BackendAPIConflictResolution",
}) as any as S.Schema<BackendAPIConflictResolution>;
export interface BackendAPIResourceConfig {
  AdditionalAuthTypes?: BackendAPIAuthType[];
  ApiName?: string;
  ConflictResolution?: BackendAPIConflictResolution;
  DefaultAuthType?: BackendAPIAuthType;
  Service?: string;
  TransformSchema?: string;
}
export const BackendAPIResourceConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AdditionalAuthTypes: S.optional(ListOfBackendAPIAuthType),
    ApiName: S.optional(S.String),
    ConflictResolution: S.optional(BackendAPIConflictResolution),
    DefaultAuthType: S.optional(BackendAPIAuthType),
    Service: S.optional(S.String),
    TransformSchema: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AdditionalAuthTypes: "additionalAuthTypes",
      ApiName: "apiName",
      ConflictResolution: "conflictResolution",
      DefaultAuthType: "defaultAuthType",
      Service: "service",
      TransformSchema: "transformSchema",
    }),
  ),
).annotate({
  identifier: "BackendAPIResourceConfig",
}) as any as S.Schema<BackendAPIResourceConfig>;
export interface CreateBackendAPIRequest {
  AppId: string;
  BackendEnvironmentName?: string;
  ResourceConfig?: BackendAPIResourceConfig;
  ResourceName?: string;
}
export const CreateBackendAPIRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppId: S.String.pipe(T.HttpLabel("AppId")),
    BackendEnvironmentName: S.optional(S.String),
    ResourceConfig: S.optional(BackendAPIResourceConfig),
    ResourceName: S.optional(S.String),
  })
    .pipe(
      S.encodeKeys({
        BackendEnvironmentName: "backendEnvironmentName",
        ResourceConfig: "resourceConfig",
        ResourceName: "resourceName",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/backend/{AppId}/api" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateBackendAPIRequest",
}) as any as S.Schema<CreateBackendAPIRequest>;
export interface CreateBackendAPIResponse {
  AppId?: string;
  BackendEnvironmentName?: string;
  Error?: string;
  JobId?: string;
  Operation?: string;
  Status?: string;
}
export const CreateBackendAPIResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppId: S.optional(S.String),
    BackendEnvironmentName: S.optional(S.String),
    Error: S.optional(S.String),
    JobId: S.optional(S.String),
    Operation: S.optional(S.String),
    Status: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AppId: "appId",
      BackendEnvironmentName: "backendEnvironmentName",
      Error: "error",
      JobId: "jobId",
      Operation: "operation",
      Status: "status",
    }),
  ),
).annotate({
  identifier: "CreateBackendAPIResponse",
}) as any as S.Schema<CreateBackendAPIResponse>;
export type AuthResources =
  | "USER_POOL_ONLY"
  | "IDENTITY_POOL_AND_USER_POOL"
  | (string & {});
export const AuthResources = /*@__PURE__*/ S.String;

export interface CreateBackendAuthIdentityPoolConfig {
  IdentityPoolName?: string;
  UnauthenticatedLogin?: boolean;
}
export const CreateBackendAuthIdentityPoolConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IdentityPoolName: S.optional(S.String),
    UnauthenticatedLogin: S.optional(S.Boolean),
  }).pipe(
    S.encodeKeys({
      IdentityPoolName: "identityPoolName",
      UnauthenticatedLogin: "unauthenticatedLogin",
    }),
  ),
).annotate({
  identifier: "CreateBackendAuthIdentityPoolConfig",
}) as any as S.Schema<CreateBackendAuthIdentityPoolConfig>;
export type Service = "COGNITO" | (string & {});
export const Service = /*@__PURE__*/ S.String;

export type DeliveryMethod = "EMAIL" | "SMS" | (string & {});
export const DeliveryMethod = /*@__PURE__*/ S.String;

export interface EmailSettings {
  EmailMessage?: string;
  EmailSubject?: string;
}
export const EmailSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EmailMessage: S.optional(S.String),
    EmailSubject: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      EmailMessage: "emailMessage",
      EmailSubject: "emailSubject",
    }),
  ),
).annotate({ identifier: "EmailSettings" }) as any as S.Schema<EmailSettings>;
export interface SmsSettings {
  SmsMessage?: string;
}
export const SmsSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SmsMessage: S.optional(S.String) }).pipe(
    S.encodeKeys({ SmsMessage: "smsMessage" }),
  ),
).annotate({ identifier: "SmsSettings" }) as any as S.Schema<SmsSettings>;
export interface CreateBackendAuthForgotPasswordConfig {
  DeliveryMethod?: DeliveryMethod;
  EmailSettings?: EmailSettings;
  SmsSettings?: SmsSettings;
}
export const CreateBackendAuthForgotPasswordConfig = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      DeliveryMethod: S.optional(DeliveryMethod),
      EmailSettings: S.optional(EmailSettings),
      SmsSettings: S.optional(SmsSettings),
    }).pipe(
      S.encodeKeys({
        DeliveryMethod: "deliveryMethod",
        EmailSettings: "emailSettings",
        SmsSettings: "smsSettings",
      }),
    ),
).annotate({
  identifier: "CreateBackendAuthForgotPasswordConfig",
}) as any as S.Schema<CreateBackendAuthForgotPasswordConfig>;
export type MFAMode = "ON" | "OFF" | "OPTIONAL" | (string & {});
export const MFAMode = /*@__PURE__*/ S.String;

export type MfaTypesElement = "SMS" | "TOTP" | (string & {});
export const MfaTypesElement = /*@__PURE__*/ S.String;

export type ListOfMfaTypesElement = MfaTypesElement[];
export const ListOfMfaTypesElement = /*@__PURE__*/ S.Array(MfaTypesElement);
export interface Settings {
  MfaTypes?: MfaTypesElement[];
  SmsMessage?: string;
}
export const Settings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MfaTypes: S.optional(ListOfMfaTypesElement),
    SmsMessage: S.optional(S.String),
  }).pipe(S.encodeKeys({ MfaTypes: "mfaTypes", SmsMessage: "smsMessage" })),
).annotate({ identifier: "Settings" }) as any as S.Schema<Settings>;
export interface CreateBackendAuthMFAConfig {
  MFAMode?: MFAMode;
  Settings?: Settings;
}
export const CreateBackendAuthMFAConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MFAMode: S.optional(MFAMode),
    Settings: S.optional(Settings),
  }).pipe(S.encodeKeys({ Settings: "settings" })),
).annotate({
  identifier: "CreateBackendAuthMFAConfig",
}) as any as S.Schema<CreateBackendAuthMFAConfig>;
export type OAuthGrantType = "CODE" | "IMPLICIT" | (string & {});
export const OAuthGrantType = /*@__PURE__*/ S.String;

export type OAuthScopesElement =
  | "PHONE"
  | "EMAIL"
  | "OPENID"
  | "PROFILE"
  | "AWS_COGNITO_SIGNIN_USER_ADMIN"
  | (string & {});
export const OAuthScopesElement = /*@__PURE__*/ S.String;

export type ListOfOAuthScopesElement = OAuthScopesElement[];
export const ListOfOAuthScopesElement =
  /*@__PURE__*/ S.Array(OAuthScopesElement);
export type ListOf__string = string[];
export const ListOf__string = /*@__PURE__*/ S.Array(S.String);
export interface BackendAuthSocialProviderConfig {
  ClientId?: string;
  ClientSecret?: string;
}
export const BackendAuthSocialProviderConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientId: S.optional(S.String),
    ClientSecret: S.optional(S.String),
  }).pipe(
    S.encodeKeys({ ClientId: "client_id", ClientSecret: "client_secret" }),
  ),
).annotate({
  identifier: "BackendAuthSocialProviderConfig",
}) as any as S.Schema<BackendAuthSocialProviderConfig>;
export interface BackendAuthAppleProviderConfig {
  ClientId?: string;
  KeyId?: string;
  PrivateKey?: string;
  TeamId?: string;
}
export const BackendAuthAppleProviderConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientId: S.optional(S.String),
    KeyId: S.optional(S.String),
    PrivateKey: S.optional(S.String),
    TeamId: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ClientId: "client_id",
      KeyId: "key_id",
      PrivateKey: "private_key",
      TeamId: "team_id",
    }),
  ),
).annotate({
  identifier: "BackendAuthAppleProviderConfig",
}) as any as S.Schema<BackendAuthAppleProviderConfig>;
export interface SocialProviderSettings {
  Facebook?: BackendAuthSocialProviderConfig;
  Google?: BackendAuthSocialProviderConfig;
  LoginWithAmazon?: BackendAuthSocialProviderConfig;
  SignInWithApple?: BackendAuthAppleProviderConfig;
}
export const SocialProviderSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Facebook: S.optional(BackendAuthSocialProviderConfig),
    Google: S.optional(BackendAuthSocialProviderConfig),
    LoginWithAmazon: S.optional(BackendAuthSocialProviderConfig),
    SignInWithApple: S.optional(BackendAuthAppleProviderConfig),
  }),
).annotate({
  identifier: "SocialProviderSettings",
}) as any as S.Schema<SocialProviderSettings>;
export interface CreateBackendAuthOAuthConfig {
  DomainPrefix?: string;
  OAuthGrantType?: OAuthGrantType;
  OAuthScopes?: OAuthScopesElement[];
  RedirectSignInURIs?: string[];
  RedirectSignOutURIs?: string[];
  SocialProviderSettings?: SocialProviderSettings;
}
export const CreateBackendAuthOAuthConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainPrefix: S.optional(S.String),
    OAuthGrantType: S.optional(OAuthGrantType),
    OAuthScopes: S.optional(ListOfOAuthScopesElement),
    RedirectSignInURIs: S.optional(ListOf__string),
    RedirectSignOutURIs: S.optional(ListOf__string),
    SocialProviderSettings: S.optional(SocialProviderSettings),
  }).pipe(
    S.encodeKeys({
      DomainPrefix: "domainPrefix",
      OAuthGrantType: "oAuthGrantType",
      OAuthScopes: "oAuthScopes",
      RedirectSignInURIs: "redirectSignInURIs",
      RedirectSignOutURIs: "redirectSignOutURIs",
      SocialProviderSettings: "socialProviderSettings",
    }),
  ),
).annotate({
  identifier: "CreateBackendAuthOAuthConfig",
}) as any as S.Schema<CreateBackendAuthOAuthConfig>;
export type AdditionalConstraintsElement =
  | "REQUIRE_DIGIT"
  | "REQUIRE_LOWERCASE"
  | "REQUIRE_SYMBOL"
  | "REQUIRE_UPPERCASE"
  | (string & {});
export const AdditionalConstraintsElement = /*@__PURE__*/ S.String;

export type ListOfAdditionalConstraintsElement = AdditionalConstraintsElement[];
export const ListOfAdditionalConstraintsElement = /*@__PURE__*/ S.Array(
  AdditionalConstraintsElement,
);
export interface CreateBackendAuthPasswordPolicyConfig {
  AdditionalConstraints?: AdditionalConstraintsElement[];
  MinimumLength?: number;
}
export const CreateBackendAuthPasswordPolicyConfig = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AdditionalConstraints: S.optional(ListOfAdditionalConstraintsElement),
      MinimumLength: S.optional(S.Number),
    }).pipe(
      S.encodeKeys({
        AdditionalConstraints: "additionalConstraints",
        MinimumLength: "minimumLength",
      }),
    ),
).annotate({
  identifier: "CreateBackendAuthPasswordPolicyConfig",
}) as any as S.Schema<CreateBackendAuthPasswordPolicyConfig>;
export type RequiredSignUpAttributesElement =
  | "ADDRESS"
  | "BIRTHDATE"
  | "EMAIL"
  | "FAMILY_NAME"
  | "GENDER"
  | "GIVEN_NAME"
  | "LOCALE"
  | "MIDDLE_NAME"
  | "NAME"
  | "NICKNAME"
  | "PHONE_NUMBER"
  | "PICTURE"
  | "PREFERRED_USERNAME"
  | "PROFILE"
  | "UPDATED_AT"
  | "WEBSITE"
  | "ZONE_INFO"
  | (string & {});
export const RequiredSignUpAttributesElement = /*@__PURE__*/ S.String;

export type ListOfRequiredSignUpAttributesElement =
  RequiredSignUpAttributesElement[];
export const ListOfRequiredSignUpAttributesElement = /*@__PURE__*/ S.Array(
  RequiredSignUpAttributesElement,
);
export type SignInMethod =
  | "EMAIL"
  | "EMAIL_AND_PHONE_NUMBER"
  | "PHONE_NUMBER"
  | "USERNAME"
  | (string & {});
export const SignInMethod = /*@__PURE__*/ S.String;

export interface CreateBackendAuthVerificationMessageConfig {
  DeliveryMethod?: DeliveryMethod;
  EmailSettings?: EmailSettings;
  SmsSettings?: SmsSettings;
}
export const CreateBackendAuthVerificationMessageConfig =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      DeliveryMethod: S.optional(DeliveryMethod),
      EmailSettings: S.optional(EmailSettings),
      SmsSettings: S.optional(SmsSettings),
    }).pipe(
      S.encodeKeys({
        DeliveryMethod: "deliveryMethod",
        EmailSettings: "emailSettings",
        SmsSettings: "smsSettings",
      }),
    ),
  ).annotate({
    identifier: "CreateBackendAuthVerificationMessageConfig",
  }) as any as S.Schema<CreateBackendAuthVerificationMessageConfig>;
export interface CreateBackendAuthUserPoolConfig {
  ForgotPassword?: CreateBackendAuthForgotPasswordConfig;
  Mfa?: CreateBackendAuthMFAConfig;
  OAuth?: CreateBackendAuthOAuthConfig;
  PasswordPolicy?: CreateBackendAuthPasswordPolicyConfig;
  RequiredSignUpAttributes?: RequiredSignUpAttributesElement[];
  SignInMethod?: SignInMethod;
  UserPoolName?: string;
  VerificationMessage?: CreateBackendAuthVerificationMessageConfig;
}
export const CreateBackendAuthUserPoolConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ForgotPassword: S.optional(CreateBackendAuthForgotPasswordConfig),
    Mfa: S.optional(CreateBackendAuthMFAConfig),
    OAuth: S.optional(CreateBackendAuthOAuthConfig),
    PasswordPolicy: S.optional(CreateBackendAuthPasswordPolicyConfig),
    RequiredSignUpAttributes: S.optional(ListOfRequiredSignUpAttributesElement),
    SignInMethod: S.optional(SignInMethod),
    UserPoolName: S.optional(S.String),
    VerificationMessage: S.optional(CreateBackendAuthVerificationMessageConfig),
  }).pipe(
    S.encodeKeys({
      ForgotPassword: "forgotPassword",
      Mfa: "mfa",
      OAuth: "oAuth",
      PasswordPolicy: "passwordPolicy",
      RequiredSignUpAttributes: "requiredSignUpAttributes",
      SignInMethod: "signInMethod",
      UserPoolName: "userPoolName",
      VerificationMessage: "verificationMessage",
    }),
  ),
).annotate({
  identifier: "CreateBackendAuthUserPoolConfig",
}) as any as S.Schema<CreateBackendAuthUserPoolConfig>;
export interface CreateBackendAuthResourceConfig {
  AuthResources?: AuthResources;
  IdentityPoolConfigs?: CreateBackendAuthIdentityPoolConfig;
  Service?: Service;
  UserPoolConfigs?: CreateBackendAuthUserPoolConfig;
}
export const CreateBackendAuthResourceConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthResources: S.optional(AuthResources),
    IdentityPoolConfigs: S.optional(CreateBackendAuthIdentityPoolConfig),
    Service: S.optional(Service),
    UserPoolConfigs: S.optional(CreateBackendAuthUserPoolConfig),
  }).pipe(
    S.encodeKeys({
      AuthResources: "authResources",
      IdentityPoolConfigs: "identityPoolConfigs",
      Service: "service",
      UserPoolConfigs: "userPoolConfigs",
    }),
  ),
).annotate({
  identifier: "CreateBackendAuthResourceConfig",
}) as any as S.Schema<CreateBackendAuthResourceConfig>;
export interface CreateBackendAuthRequest {
  AppId: string;
  BackendEnvironmentName?: string;
  ResourceConfig?: CreateBackendAuthResourceConfig;
  ResourceName?: string;
}
export const CreateBackendAuthRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppId: S.String.pipe(T.HttpLabel("AppId")),
    BackendEnvironmentName: S.optional(S.String),
    ResourceConfig: S.optional(CreateBackendAuthResourceConfig),
    ResourceName: S.optional(S.String),
  })
    .pipe(
      S.encodeKeys({
        BackendEnvironmentName: "backendEnvironmentName",
        ResourceConfig: "resourceConfig",
        ResourceName: "resourceName",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/backend/{AppId}/auth" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateBackendAuthRequest",
}) as any as S.Schema<CreateBackendAuthRequest>;
export interface CreateBackendAuthResponse {
  AppId?: string;
  BackendEnvironmentName?: string;
  Error?: string;
  JobId?: string;
  Operation?: string;
  Status?: string;
}
export const CreateBackendAuthResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppId: S.optional(S.String),
    BackendEnvironmentName: S.optional(S.String),
    Error: S.optional(S.String),
    JobId: S.optional(S.String),
    Operation: S.optional(S.String),
    Status: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AppId: "appId",
      BackendEnvironmentName: "backendEnvironmentName",
      Error: "error",
      JobId: "jobId",
      Operation: "operation",
      Status: "status",
    }),
  ),
).annotate({
  identifier: "CreateBackendAuthResponse",
}) as any as S.Schema<CreateBackendAuthResponse>;
export interface CreateBackendConfigRequest {
  AppId: string;
  BackendManagerAppId?: string;
}
export const CreateBackendConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppId: S.String.pipe(T.HttpLabel("AppId")),
    BackendManagerAppId: S.optional(S.String),
  })
    .pipe(S.encodeKeys({ BackendManagerAppId: "backendManagerAppId" }))
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/backend/{AppId}/config" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateBackendConfigRequest",
}) as any as S.Schema<CreateBackendConfigRequest>;
export interface CreateBackendConfigResponse {
  AppId?: string;
  BackendEnvironmentName?: string;
  JobId?: string;
  Status?: string;
}
export const CreateBackendConfigResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppId: S.optional(S.String),
    BackendEnvironmentName: S.optional(S.String),
    JobId: S.optional(S.String),
    Status: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AppId: "appId",
      BackendEnvironmentName: "backendEnvironmentName",
      JobId: "jobId",
      Status: "status",
    }),
  ),
).annotate({
  identifier: "CreateBackendConfigResponse",
}) as any as S.Schema<CreateBackendConfigResponse>;
export type AuthenticatedElement =
  | "READ"
  | "CREATE_AND_UPDATE"
  | "DELETE"
  | (string & {});
export const AuthenticatedElement = /*@__PURE__*/ S.String;

export type ListOfAuthenticatedElement = AuthenticatedElement[];
export const ListOfAuthenticatedElement =
  /*@__PURE__*/ S.Array(AuthenticatedElement);
export type UnAuthenticatedElement =
  | "READ"
  | "CREATE_AND_UPDATE"
  | "DELETE"
  | (string & {});
export const UnAuthenticatedElement = /*@__PURE__*/ S.String;

export type ListOfUnAuthenticatedElement = UnAuthenticatedElement[];
export const ListOfUnAuthenticatedElement = /*@__PURE__*/ S.Array(
  UnAuthenticatedElement,
);
export interface BackendStoragePermissions {
  Authenticated?: AuthenticatedElement[];
  UnAuthenticated?: UnAuthenticatedElement[];
}
export const BackendStoragePermissions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Authenticated: S.optional(ListOfAuthenticatedElement),
    UnAuthenticated: S.optional(ListOfUnAuthenticatedElement),
  }).pipe(
    S.encodeKeys({
      Authenticated: "authenticated",
      UnAuthenticated: "unAuthenticated",
    }),
  ),
).annotate({
  identifier: "BackendStoragePermissions",
}) as any as S.Schema<BackendStoragePermissions>;
export type ServiceName = "S3" | (string & {});
export const ServiceName = /*@__PURE__*/ S.String;

export interface CreateBackendStorageResourceConfig {
  BucketName?: string;
  Permissions?: BackendStoragePermissions;
  ServiceName?: ServiceName;
}
export const CreateBackendStorageResourceConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BucketName: S.optional(S.String),
    Permissions: S.optional(BackendStoragePermissions),
    ServiceName: S.optional(ServiceName),
  }).pipe(
    S.encodeKeys({
      BucketName: "bucketName",
      Permissions: "permissions",
      ServiceName: "serviceName",
    }),
  ),
).annotate({
  identifier: "CreateBackendStorageResourceConfig",
}) as any as S.Schema<CreateBackendStorageResourceConfig>;
export interface CreateBackendStorageRequest {
  AppId: string;
  BackendEnvironmentName?: string;
  ResourceConfig?: CreateBackendStorageResourceConfig;
  ResourceName?: string;
}
export const CreateBackendStorageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppId: S.String.pipe(T.HttpLabel("AppId")),
    BackendEnvironmentName: S.optional(S.String),
    ResourceConfig: S.optional(CreateBackendStorageResourceConfig),
    ResourceName: S.optional(S.String),
  })
    .pipe(
      S.encodeKeys({
        BackendEnvironmentName: "backendEnvironmentName",
        ResourceConfig: "resourceConfig",
        ResourceName: "resourceName",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/backend/{AppId}/storage" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateBackendStorageRequest",
}) as any as S.Schema<CreateBackendStorageRequest>;
export interface CreateBackendStorageResponse {
  AppId?: string;
  BackendEnvironmentName?: string;
  JobId?: string;
  Status?: string;
}
export const CreateBackendStorageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppId: S.optional(S.String),
    BackendEnvironmentName: S.optional(S.String),
    JobId: S.optional(S.String),
    Status: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AppId: "appId",
      BackendEnvironmentName: "backendEnvironmentName",
      JobId: "jobId",
      Status: "status",
    }),
  ),
).annotate({
  identifier: "CreateBackendStorageResponse",
}) as any as S.Schema<CreateBackendStorageResponse>;
export interface CreateTokenRequest {
  AppId: string;
}
export const CreateTokenRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AppId: S.String.pipe(T.HttpLabel("AppId")) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/backend/{AppId}/challenge" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateTokenRequest",
}) as any as S.Schema<CreateTokenRequest>;
export interface CreateTokenResponse {
  AppId?: string;
  ChallengeCode?: string;
  SessionId?: string;
  Ttl?: string;
}
export const CreateTokenResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppId: S.optional(S.String),
    ChallengeCode: S.optional(S.String),
    SessionId: S.optional(S.String),
    Ttl: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AppId: "appId",
      ChallengeCode: "challengeCode",
      SessionId: "sessionId",
      Ttl: "ttl",
    }),
  ),
).annotate({
  identifier: "CreateTokenResponse",
}) as any as S.Schema<CreateTokenResponse>;
export interface DeleteBackendRequest {
  AppId: string;
  BackendEnvironmentName: string;
}
export const DeleteBackendRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppId: S.String.pipe(T.HttpLabel("AppId")),
    BackendEnvironmentName: S.String.pipe(
      T.HttpLabel("BackendEnvironmentName"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/backend/{AppId}/environments/{BackendEnvironmentName}/remove",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteBackendRequest",
}) as any as S.Schema<DeleteBackendRequest>;
export interface DeleteBackendResponse {
  AppId?: string;
  BackendEnvironmentName?: string;
  Error?: string;
  JobId?: string;
  Operation?: string;
  Status?: string;
}
export const DeleteBackendResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppId: S.optional(S.String),
    BackendEnvironmentName: S.optional(S.String),
    Error: S.optional(S.String),
    JobId: S.optional(S.String),
    Operation: S.optional(S.String),
    Status: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AppId: "appId",
      BackendEnvironmentName: "backendEnvironmentName",
      Error: "error",
      JobId: "jobId",
      Operation: "operation",
      Status: "status",
    }),
  ),
).annotate({
  identifier: "DeleteBackendResponse",
}) as any as S.Schema<DeleteBackendResponse>;
export interface DeleteBackendAPIRequest {
  AppId: string;
  BackendEnvironmentName: string;
  ResourceConfig?: BackendAPIResourceConfig;
  ResourceName?: string;
}
export const DeleteBackendAPIRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppId: S.String.pipe(T.HttpLabel("AppId")),
    BackendEnvironmentName: S.String.pipe(
      T.HttpLabel("BackendEnvironmentName"),
    ),
    ResourceConfig: S.optional(BackendAPIResourceConfig),
    ResourceName: S.optional(S.String),
  })
    .pipe(
      S.encodeKeys({
        ResourceConfig: "resourceConfig",
        ResourceName: "resourceName",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/backend/{AppId}/api/{BackendEnvironmentName}/remove",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteBackendAPIRequest",
}) as any as S.Schema<DeleteBackendAPIRequest>;
export interface DeleteBackendAPIResponse {
  AppId?: string;
  BackendEnvironmentName?: string;
  Error?: string;
  JobId?: string;
  Operation?: string;
  Status?: string;
}
export const DeleteBackendAPIResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppId: S.optional(S.String),
    BackendEnvironmentName: S.optional(S.String),
    Error: S.optional(S.String),
    JobId: S.optional(S.String),
    Operation: S.optional(S.String),
    Status: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AppId: "appId",
      BackendEnvironmentName: "backendEnvironmentName",
      Error: "error",
      JobId: "jobId",
      Operation: "operation",
      Status: "status",
    }),
  ),
).annotate({
  identifier: "DeleteBackendAPIResponse",
}) as any as S.Schema<DeleteBackendAPIResponse>;
export interface DeleteBackendAuthRequest {
  AppId: string;
  BackendEnvironmentName: string;
  ResourceName?: string;
}
export const DeleteBackendAuthRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppId: S.String.pipe(T.HttpLabel("AppId")),
    BackendEnvironmentName: S.String.pipe(
      T.HttpLabel("BackendEnvironmentName"),
    ),
    ResourceName: S.optional(S.String),
  })
    .pipe(S.encodeKeys({ ResourceName: "resourceName" }))
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/backend/{AppId}/auth/{BackendEnvironmentName}/remove",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteBackendAuthRequest",
}) as any as S.Schema<DeleteBackendAuthRequest>;
export interface DeleteBackendAuthResponse {
  AppId?: string;
  BackendEnvironmentName?: string;
  Error?: string;
  JobId?: string;
  Operation?: string;
  Status?: string;
}
export const DeleteBackendAuthResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppId: S.optional(S.String),
    BackendEnvironmentName: S.optional(S.String),
    Error: S.optional(S.String),
    JobId: S.optional(S.String),
    Operation: S.optional(S.String),
    Status: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AppId: "appId",
      BackendEnvironmentName: "backendEnvironmentName",
      Error: "error",
      JobId: "jobId",
      Operation: "operation",
      Status: "status",
    }),
  ),
).annotate({
  identifier: "DeleteBackendAuthResponse",
}) as any as S.Schema<DeleteBackendAuthResponse>;
export interface DeleteBackendStorageRequest {
  AppId: string;
  BackendEnvironmentName: string;
  ResourceName?: string;
  ServiceName?: ServiceName;
}
export const DeleteBackendStorageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppId: S.String.pipe(T.HttpLabel("AppId")),
    BackendEnvironmentName: S.String.pipe(
      T.HttpLabel("BackendEnvironmentName"),
    ),
    ResourceName: S.optional(S.String),
    ServiceName: S.optional(ServiceName),
  })
    .pipe(
      S.encodeKeys({
        ResourceName: "resourceName",
        ServiceName: "serviceName",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/backend/{AppId}/storage/{BackendEnvironmentName}/remove",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteBackendStorageRequest",
}) as any as S.Schema<DeleteBackendStorageRequest>;
export interface DeleteBackendStorageResponse {
  AppId?: string;
  BackendEnvironmentName?: string;
  JobId?: string;
  Status?: string;
}
export const DeleteBackendStorageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppId: S.optional(S.String),
    BackendEnvironmentName: S.optional(S.String),
    JobId: S.optional(S.String),
    Status: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AppId: "appId",
      BackendEnvironmentName: "backendEnvironmentName",
      JobId: "jobId",
      Status: "status",
    }),
  ),
).annotate({
  identifier: "DeleteBackendStorageResponse",
}) as any as S.Schema<DeleteBackendStorageResponse>;
export interface DeleteTokenRequest {
  AppId: string;
  SessionId: string;
}
export const DeleteTokenRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppId: S.String.pipe(T.HttpLabel("AppId")),
    SessionId: S.String.pipe(T.HttpLabel("SessionId")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/backend/{AppId}/challenge/{SessionId}/remove",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteTokenRequest",
}) as any as S.Schema<DeleteTokenRequest>;
export interface DeleteTokenResponse {
  IsSuccess?: boolean;
}
export const DeleteTokenResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IsSuccess: S.optional(S.Boolean) }).pipe(
    S.encodeKeys({ IsSuccess: "isSuccess" }),
  ),
).annotate({
  identifier: "DeleteTokenResponse",
}) as any as S.Schema<DeleteTokenResponse>;
export interface GenerateBackendAPIModelsRequest {
  AppId: string;
  BackendEnvironmentName: string;
  ResourceName?: string;
}
export const GenerateBackendAPIModelsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppId: S.String.pipe(T.HttpLabel("AppId")),
    BackendEnvironmentName: S.String.pipe(
      T.HttpLabel("BackendEnvironmentName"),
    ),
    ResourceName: S.optional(S.String),
  })
    .pipe(S.encodeKeys({ ResourceName: "resourceName" }))
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/backend/{AppId}/api/{BackendEnvironmentName}/generateModels",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GenerateBackendAPIModelsRequest",
}) as any as S.Schema<GenerateBackendAPIModelsRequest>;
export interface GenerateBackendAPIModelsResponse {
  AppId?: string;
  BackendEnvironmentName?: string;
  Error?: string;
  JobId?: string;
  Operation?: string;
  Status?: string;
}
export const GenerateBackendAPIModelsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppId: S.optional(S.String),
    BackendEnvironmentName: S.optional(S.String),
    Error: S.optional(S.String),
    JobId: S.optional(S.String),
    Operation: S.optional(S.String),
    Status: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AppId: "appId",
      BackendEnvironmentName: "backendEnvironmentName",
      Error: "error",
      JobId: "jobId",
      Operation: "operation",
      Status: "status",
    }),
  ),
).annotate({
  identifier: "GenerateBackendAPIModelsResponse",
}) as any as S.Schema<GenerateBackendAPIModelsResponse>;
export interface GetBackendRequest {
  AppId: string;
  BackendEnvironmentName?: string;
}
export const GetBackendRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppId: S.String.pipe(T.HttpLabel("AppId")),
    BackendEnvironmentName: S.optional(S.String),
  })
    .pipe(S.encodeKeys({ BackendEnvironmentName: "backendEnvironmentName" }))
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/backend/{AppId}/details" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetBackendRequest",
}) as any as S.Schema<GetBackendRequest>;
export interface GetBackendResponse {
  AmplifyFeatureFlags?: string;
  AmplifyMetaConfig?: string;
  AppId?: string;
  AppName?: string;
  BackendEnvironmentList?: string[];
  BackendEnvironmentName?: string;
  Error?: string;
}
export const GetBackendResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AmplifyFeatureFlags: S.optional(S.String),
    AmplifyMetaConfig: S.optional(S.String),
    AppId: S.optional(S.String),
    AppName: S.optional(S.String),
    BackendEnvironmentList: S.optional(ListOf__string),
    BackendEnvironmentName: S.optional(S.String),
    Error: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AmplifyFeatureFlags: "amplifyFeatureFlags",
      AmplifyMetaConfig: "amplifyMetaConfig",
      AppId: "appId",
      AppName: "appName",
      BackendEnvironmentList: "backendEnvironmentList",
      BackendEnvironmentName: "backendEnvironmentName",
      Error: "error",
    }),
  ),
).annotate({
  identifier: "GetBackendResponse",
}) as any as S.Schema<GetBackendResponse>;
export interface GetBackendAPIRequest {
  AppId: string;
  BackendEnvironmentName: string;
  ResourceConfig?: BackendAPIResourceConfig;
  ResourceName?: string;
}
export const GetBackendAPIRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppId: S.String.pipe(T.HttpLabel("AppId")),
    BackendEnvironmentName: S.String.pipe(
      T.HttpLabel("BackendEnvironmentName"),
    ),
    ResourceConfig: S.optional(BackendAPIResourceConfig),
    ResourceName: S.optional(S.String),
  })
    .pipe(
      S.encodeKeys({
        ResourceConfig: "resourceConfig",
        ResourceName: "resourceName",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/backend/{AppId}/api/{BackendEnvironmentName}/details",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetBackendAPIRequest",
}) as any as S.Schema<GetBackendAPIRequest>;
export interface GetBackendAPIResponse {
  AppId?: string;
  BackendEnvironmentName?: string;
  Error?: string;
  ResourceConfig?: BackendAPIResourceConfig;
  ResourceName?: string;
}
export const GetBackendAPIResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppId: S.optional(S.String),
    BackendEnvironmentName: S.optional(S.String),
    Error: S.optional(S.String),
    ResourceConfig: S.optional(BackendAPIResourceConfig),
    ResourceName: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AppId: "appId",
      BackendEnvironmentName: "backendEnvironmentName",
      Error: "error",
      ResourceConfig: "resourceConfig",
      ResourceName: "resourceName",
    }),
  ),
).annotate({
  identifier: "GetBackendAPIResponse",
}) as any as S.Schema<GetBackendAPIResponse>;
export interface GetBackendAPIModelsRequest {
  AppId: string;
  BackendEnvironmentName: string;
  ResourceName?: string;
}
export const GetBackendAPIModelsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppId: S.String.pipe(T.HttpLabel("AppId")),
    BackendEnvironmentName: S.String.pipe(
      T.HttpLabel("BackendEnvironmentName"),
    ),
    ResourceName: S.optional(S.String),
  })
    .pipe(S.encodeKeys({ ResourceName: "resourceName" }))
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/backend/{AppId}/api/{BackendEnvironmentName}/getModels",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetBackendAPIModelsRequest",
}) as any as S.Schema<GetBackendAPIModelsRequest>;
export type Status = "LATEST" | "STALE" | (string & {});
export const Status = /*@__PURE__*/ S.String;

export interface GetBackendAPIModelsResponse {
  Models?: string;
  Status?: Status;
  ModelIntrospectionSchema?: string;
}
export const GetBackendAPIModelsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Models: S.optional(S.String),
    Status: S.optional(Status),
    ModelIntrospectionSchema: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      Models: "models",
      Status: "status",
      ModelIntrospectionSchema: "modelIntrospectionSchema",
    }),
  ),
).annotate({
  identifier: "GetBackendAPIModelsResponse",
}) as any as S.Schema<GetBackendAPIModelsResponse>;
export interface GetBackendAuthRequest {
  AppId: string;
  BackendEnvironmentName: string;
  ResourceName?: string;
}
export const GetBackendAuthRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppId: S.String.pipe(T.HttpLabel("AppId")),
    BackendEnvironmentName: S.String.pipe(
      T.HttpLabel("BackendEnvironmentName"),
    ),
    ResourceName: S.optional(S.String),
  })
    .pipe(S.encodeKeys({ ResourceName: "resourceName" }))
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/backend/{AppId}/auth/{BackendEnvironmentName}/details",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetBackendAuthRequest",
}) as any as S.Schema<GetBackendAuthRequest>;
export interface GetBackendAuthResponse {
  AppId?: string;
  BackendEnvironmentName?: string;
  Error?: string;
  ResourceConfig?: CreateBackendAuthResourceConfig & {
    AuthResources: AuthResources;
    Service: Service;
    UserPoolConfigs: CreateBackendAuthUserPoolConfig & {
      RequiredSignUpAttributes: ListOfRequiredSignUpAttributesElement;
      SignInMethod: SignInMethod;
      UserPoolName: string;
      ForgotPassword: CreateBackendAuthForgotPasswordConfig & {
        DeliveryMethod: DeliveryMethod;
      };
      Mfa: CreateBackendAuthMFAConfig & { MFAMode: MFAMode };
      OAuth: CreateBackendAuthOAuthConfig & {
        OAuthGrantType: OAuthGrantType;
        OAuthScopes: ListOfOAuthScopesElement;
        RedirectSignInURIs: ListOf__string;
        RedirectSignOutURIs: ListOf__string;
      };
      PasswordPolicy: CreateBackendAuthPasswordPolicyConfig & {
        MinimumLength: number;
      };
      VerificationMessage: CreateBackendAuthVerificationMessageConfig & {
        DeliveryMethod: DeliveryMethod;
      };
    };
    IdentityPoolConfigs: CreateBackendAuthIdentityPoolConfig & {
      IdentityPoolName: string;
      UnauthenticatedLogin: boolean;
    };
  };
  ResourceName?: string;
}
export const GetBackendAuthResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppId: S.optional(S.String),
    BackendEnvironmentName: S.optional(S.String),
    Error: S.optional(S.String),
    ResourceConfig: S.optional(CreateBackendAuthResourceConfig),
    ResourceName: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AppId: "appId",
      BackendEnvironmentName: "backendEnvironmentName",
      Error: "error",
      ResourceConfig: "resourceConfig",
      ResourceName: "resourceName",
    }),
  ),
).annotate({
  identifier: "GetBackendAuthResponse",
}) as any as S.Schema<GetBackendAuthResponse>;
export interface GetBackendJobRequest {
  AppId: string;
  BackendEnvironmentName: string;
  JobId: string;
}
export const GetBackendJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppId: S.String.pipe(T.HttpLabel("AppId")),
    BackendEnvironmentName: S.String.pipe(
      T.HttpLabel("BackendEnvironmentName"),
    ),
    JobId: S.String.pipe(T.HttpLabel("JobId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/backend/{AppId}/job/{BackendEnvironmentName}/{JobId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetBackendJobRequest",
}) as any as S.Schema<GetBackendJobRequest>;
export interface GetBackendJobResponse {
  AppId?: string;
  BackendEnvironmentName?: string;
  CreateTime?: string;
  Error?: string;
  JobId?: string;
  Operation?: string;
  Status?: string;
  UpdateTime?: string;
}
export const GetBackendJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppId: S.optional(S.String),
    BackendEnvironmentName: S.optional(S.String),
    CreateTime: S.optional(S.String),
    Error: S.optional(S.String),
    JobId: S.optional(S.String),
    Operation: S.optional(S.String),
    Status: S.optional(S.String),
    UpdateTime: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AppId: "appId",
      BackendEnvironmentName: "backendEnvironmentName",
      CreateTime: "createTime",
      Error: "error",
      JobId: "jobId",
      Operation: "operation",
      Status: "status",
      UpdateTime: "updateTime",
    }),
  ),
).annotate({
  identifier: "GetBackendJobResponse",
}) as any as S.Schema<GetBackendJobResponse>;
export interface GetBackendStorageRequest {
  AppId: string;
  BackendEnvironmentName: string;
  ResourceName?: string;
}
export const GetBackendStorageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppId: S.String.pipe(T.HttpLabel("AppId")),
    BackendEnvironmentName: S.String.pipe(
      T.HttpLabel("BackendEnvironmentName"),
    ),
    ResourceName: S.optional(S.String),
  })
    .pipe(S.encodeKeys({ ResourceName: "resourceName" }))
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/backend/{AppId}/storage/{BackendEnvironmentName}/details",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetBackendStorageRequest",
}) as any as S.Schema<GetBackendStorageRequest>;
export interface GetBackendStorageResourceConfig {
  BucketName?: string;
  Imported?: boolean;
  Permissions?: BackendStoragePermissions;
  ServiceName?: ServiceName;
}
export const GetBackendStorageResourceConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BucketName: S.optional(S.String),
    Imported: S.optional(S.Boolean),
    Permissions: S.optional(BackendStoragePermissions),
    ServiceName: S.optional(ServiceName),
  }).pipe(
    S.encodeKeys({
      BucketName: "bucketName",
      Imported: "imported",
      Permissions: "permissions",
      ServiceName: "serviceName",
    }),
  ),
).annotate({
  identifier: "GetBackendStorageResourceConfig",
}) as any as S.Schema<GetBackendStorageResourceConfig>;
export interface GetBackendStorageResponse {
  AppId?: string;
  BackendEnvironmentName?: string;
  ResourceConfig?: GetBackendStorageResourceConfig & {
    Imported: boolean;
    ServiceName: ServiceName;
    Permissions: BackendStoragePermissions & {
      Authenticated: ListOfAuthenticatedElement;
    };
  };
  ResourceName?: string;
}
export const GetBackendStorageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppId: S.optional(S.String),
    BackendEnvironmentName: S.optional(S.String),
    ResourceConfig: S.optional(GetBackendStorageResourceConfig),
    ResourceName: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AppId: "appId",
      BackendEnvironmentName: "backendEnvironmentName",
      ResourceConfig: "resourceConfig",
      ResourceName: "resourceName",
    }),
  ),
).annotate({
  identifier: "GetBackendStorageResponse",
}) as any as S.Schema<GetBackendStorageResponse>;
export interface GetTokenRequest {
  AppId: string;
  SessionId: string;
}
export const GetTokenRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppId: S.String.pipe(T.HttpLabel("AppId")),
    SessionId: S.String.pipe(T.HttpLabel("SessionId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/backend/{AppId}/challenge/{SessionId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetTokenRequest",
}) as any as S.Schema<GetTokenRequest>;
export interface GetTokenResponse {
  AppId?: string;
  ChallengeCode?: string;
  SessionId?: string;
  Ttl?: string;
}
export const GetTokenResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppId: S.optional(S.String),
    ChallengeCode: S.optional(S.String),
    SessionId: S.optional(S.String),
    Ttl: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AppId: "appId",
      ChallengeCode: "challengeCode",
      SessionId: "sessionId",
      Ttl: "ttl",
    }),
  ),
).annotate({
  identifier: "GetTokenResponse",
}) as any as S.Schema<GetTokenResponse>;
export interface ImportBackendAuthRequest {
  AppId: string;
  BackendEnvironmentName: string;
  IdentityPoolId?: string;
  NativeClientId?: string;
  UserPoolId?: string;
  WebClientId?: string;
}
export const ImportBackendAuthRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppId: S.String.pipe(T.HttpLabel("AppId")),
    BackendEnvironmentName: S.String.pipe(
      T.HttpLabel("BackendEnvironmentName"),
    ),
    IdentityPoolId: S.optional(S.String),
    NativeClientId: S.optional(S.String),
    UserPoolId: S.optional(S.String),
    WebClientId: S.optional(S.String),
  })
    .pipe(
      S.encodeKeys({
        IdentityPoolId: "identityPoolId",
        NativeClientId: "nativeClientId",
        UserPoolId: "userPoolId",
        WebClientId: "webClientId",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/backend/{AppId}/auth/{BackendEnvironmentName}/import",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ImportBackendAuthRequest",
}) as any as S.Schema<ImportBackendAuthRequest>;
export interface ImportBackendAuthResponse {
  AppId?: string;
  BackendEnvironmentName?: string;
  Error?: string;
  JobId?: string;
  Operation?: string;
  Status?: string;
}
export const ImportBackendAuthResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppId: S.optional(S.String),
    BackendEnvironmentName: S.optional(S.String),
    Error: S.optional(S.String),
    JobId: S.optional(S.String),
    Operation: S.optional(S.String),
    Status: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AppId: "appId",
      BackendEnvironmentName: "backendEnvironmentName",
      Error: "error",
      JobId: "jobId",
      Operation: "operation",
      Status: "status",
    }),
  ),
).annotate({
  identifier: "ImportBackendAuthResponse",
}) as any as S.Schema<ImportBackendAuthResponse>;
export interface ImportBackendStorageRequest {
  AppId: string;
  BackendEnvironmentName: string;
  BucketName?: string;
  ServiceName?: ServiceName;
}
export const ImportBackendStorageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppId: S.String.pipe(T.HttpLabel("AppId")),
    BackendEnvironmentName: S.String.pipe(
      T.HttpLabel("BackendEnvironmentName"),
    ),
    BucketName: S.optional(S.String),
    ServiceName: S.optional(ServiceName),
  })
    .pipe(
      S.encodeKeys({ BucketName: "bucketName", ServiceName: "serviceName" }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/backend/{AppId}/storage/{BackendEnvironmentName}/import",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ImportBackendStorageRequest",
}) as any as S.Schema<ImportBackendStorageRequest>;
export interface ImportBackendStorageResponse {
  AppId?: string;
  BackendEnvironmentName?: string;
  JobId?: string;
  Status?: string;
}
export const ImportBackendStorageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppId: S.optional(S.String),
    BackendEnvironmentName: S.optional(S.String),
    JobId: S.optional(S.String),
    Status: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AppId: "appId",
      BackendEnvironmentName: "backendEnvironmentName",
      JobId: "jobId",
      Status: "status",
    }),
  ),
).annotate({
  identifier: "ImportBackendStorageResponse",
}) as any as S.Schema<ImportBackendStorageResponse>;
export type __integerMin1Max25 = number;
export interface ListBackendJobsRequest {
  AppId: string;
  BackendEnvironmentName: string;
  JobId?: string;
  MaxResults?: number;
  NextToken?: string;
  Operation?: string;
  Status?: string;
}
export const ListBackendJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppId: S.String.pipe(T.HttpLabel("AppId")),
    BackendEnvironmentName: S.String.pipe(
      T.HttpLabel("BackendEnvironmentName"),
    ),
    JobId: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    Operation: S.optional(S.String),
    Status: S.optional(S.String),
  })
    .pipe(
      S.encodeKeys({
        JobId: "jobId",
        MaxResults: "maxResults",
        NextToken: "nextToken",
        Operation: "operation",
        Status: "status",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/backend/{AppId}/job/{BackendEnvironmentName}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListBackendJobsRequest",
}) as any as S.Schema<ListBackendJobsRequest>;
export interface BackendJobRespObj {
  AppId?: string;
  BackendEnvironmentName?: string;
  CreateTime?: string;
  Error?: string;
  JobId?: string;
  Operation?: string;
  Status?: string;
  UpdateTime?: string;
}
export const BackendJobRespObj = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppId: S.optional(S.String),
    BackendEnvironmentName: S.optional(S.String),
    CreateTime: S.optional(S.String),
    Error: S.optional(S.String),
    JobId: S.optional(S.String),
    Operation: S.optional(S.String),
    Status: S.optional(S.String),
    UpdateTime: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AppId: "appId",
      BackendEnvironmentName: "backendEnvironmentName",
      CreateTime: "createTime",
      Error: "error",
      JobId: "jobId",
      Operation: "operation",
      Status: "status",
      UpdateTime: "updateTime",
    }),
  ),
).annotate({
  identifier: "BackendJobRespObj",
}) as any as S.Schema<BackendJobRespObj>;
export type ListOfBackendJobRespObj = BackendJobRespObj[];
export const ListOfBackendJobRespObj = /*@__PURE__*/ S.Array(BackendJobRespObj);
export interface ListBackendJobsResponse {
  Jobs?: (BackendJobRespObj & {
    AppId: string;
    BackendEnvironmentName: string;
  })[];
  NextToken?: string;
}
export const ListBackendJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Jobs: S.optional(ListOfBackendJobRespObj),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Jobs: "jobs", NextToken: "nextToken" })),
).annotate({
  identifier: "ListBackendJobsResponse",
}) as any as S.Schema<ListBackendJobsResponse>;
export interface ListS3BucketsRequest {
  NextToken?: string;
}
export const ListS3BucketsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ NextToken: S.optional(S.String) })
    .pipe(S.encodeKeys({ NextToken: "nextToken" }))
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/s3Buckets" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListS3BucketsRequest",
}) as any as S.Schema<ListS3BucketsRequest>;
export interface S3BucketInfo {
  CreationDate?: string;
  Name?: string;
}
export const S3BucketInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreationDate: S.optional(S.String),
    Name: S.optional(S.String),
  }).pipe(S.encodeKeys({ CreationDate: "creationDate", Name: "name" })),
).annotate({ identifier: "S3BucketInfo" }) as any as S.Schema<S3BucketInfo>;
export type ListOfS3BucketInfo = S3BucketInfo[];
export const ListOfS3BucketInfo = /*@__PURE__*/ S.Array(S3BucketInfo);
export interface ListS3BucketsResponse {
  Buckets?: S3BucketInfo[];
  NextToken?: string;
}
export const ListS3BucketsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Buckets: S.optional(ListOfS3BucketInfo),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Buckets: "buckets", NextToken: "nextToken" })),
).annotate({
  identifier: "ListS3BucketsResponse",
}) as any as S.Schema<ListS3BucketsResponse>;
export interface RemoveAllBackendsRequest {
  AppId: string;
  CleanAmplifyApp?: boolean;
}
export const RemoveAllBackendsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppId: S.String.pipe(T.HttpLabel("AppId")),
    CleanAmplifyApp: S.optional(S.Boolean),
  })
    .pipe(S.encodeKeys({ CleanAmplifyApp: "cleanAmplifyApp" }))
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/backend/{AppId}/remove" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "RemoveAllBackendsRequest",
}) as any as S.Schema<RemoveAllBackendsRequest>;
export interface RemoveAllBackendsResponse {
  AppId?: string;
  Error?: string;
  JobId?: string;
  Operation?: string;
  Status?: string;
}
export const RemoveAllBackendsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppId: S.optional(S.String),
    Error: S.optional(S.String),
    JobId: S.optional(S.String),
    Operation: S.optional(S.String),
    Status: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AppId: "appId",
      Error: "error",
      JobId: "jobId",
      Operation: "operation",
      Status: "status",
    }),
  ),
).annotate({
  identifier: "RemoveAllBackendsResponse",
}) as any as S.Schema<RemoveAllBackendsResponse>;
export interface RemoveBackendConfigRequest {
  AppId: string;
}
export const RemoveBackendConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AppId: S.String.pipe(T.HttpLabel("AppId")) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/backend/{AppId}/config/remove" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RemoveBackendConfigRequest",
}) as any as S.Schema<RemoveBackendConfigRequest>;
export interface RemoveBackendConfigResponse {
  Error?: string;
}
export const RemoveBackendConfigResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Error: S.optional(S.String) }).pipe(
    S.encodeKeys({ Error: "error" }),
  ),
).annotate({
  identifier: "RemoveBackendConfigResponse",
}) as any as S.Schema<RemoveBackendConfigResponse>;
export interface UpdateBackendAPIRequest {
  AppId: string;
  BackendEnvironmentName: string;
  ResourceConfig?: BackendAPIResourceConfig;
  ResourceName?: string;
}
export const UpdateBackendAPIRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppId: S.String.pipe(T.HttpLabel("AppId")),
    BackendEnvironmentName: S.String.pipe(
      T.HttpLabel("BackendEnvironmentName"),
    ),
    ResourceConfig: S.optional(BackendAPIResourceConfig),
    ResourceName: S.optional(S.String),
  })
    .pipe(
      S.encodeKeys({
        ResourceConfig: "resourceConfig",
        ResourceName: "resourceName",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/backend/{AppId}/api/{BackendEnvironmentName}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateBackendAPIRequest",
}) as any as S.Schema<UpdateBackendAPIRequest>;
export interface UpdateBackendAPIResponse {
  AppId?: string;
  BackendEnvironmentName?: string;
  Error?: string;
  JobId?: string;
  Operation?: string;
  Status?: string;
}
export const UpdateBackendAPIResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppId: S.optional(S.String),
    BackendEnvironmentName: S.optional(S.String),
    Error: S.optional(S.String),
    JobId: S.optional(S.String),
    Operation: S.optional(S.String),
    Status: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AppId: "appId",
      BackendEnvironmentName: "backendEnvironmentName",
      Error: "error",
      JobId: "jobId",
      Operation: "operation",
      Status: "status",
    }),
  ),
).annotate({
  identifier: "UpdateBackendAPIResponse",
}) as any as S.Schema<UpdateBackendAPIResponse>;
export interface UpdateBackendAuthIdentityPoolConfig {
  UnauthenticatedLogin?: boolean;
}
export const UpdateBackendAuthIdentityPoolConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UnauthenticatedLogin: S.optional(S.Boolean) }).pipe(
    S.encodeKeys({ UnauthenticatedLogin: "unauthenticatedLogin" }),
  ),
).annotate({
  identifier: "UpdateBackendAuthIdentityPoolConfig",
}) as any as S.Schema<UpdateBackendAuthIdentityPoolConfig>;
export interface UpdateBackendAuthForgotPasswordConfig {
  DeliveryMethod?: DeliveryMethod;
  EmailSettings?: EmailSettings;
  SmsSettings?: SmsSettings;
}
export const UpdateBackendAuthForgotPasswordConfig = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      DeliveryMethod: S.optional(DeliveryMethod),
      EmailSettings: S.optional(EmailSettings),
      SmsSettings: S.optional(SmsSettings),
    }).pipe(
      S.encodeKeys({
        DeliveryMethod: "deliveryMethod",
        EmailSettings: "emailSettings",
        SmsSettings: "smsSettings",
      }),
    ),
).annotate({
  identifier: "UpdateBackendAuthForgotPasswordConfig",
}) as any as S.Schema<UpdateBackendAuthForgotPasswordConfig>;
export interface UpdateBackendAuthMFAConfig {
  MFAMode?: MFAMode;
  Settings?: Settings;
}
export const UpdateBackendAuthMFAConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MFAMode: S.optional(MFAMode),
    Settings: S.optional(Settings),
  }).pipe(S.encodeKeys({ Settings: "settings" })),
).annotate({
  identifier: "UpdateBackendAuthMFAConfig",
}) as any as S.Schema<UpdateBackendAuthMFAConfig>;
export interface UpdateBackendAuthOAuthConfig {
  DomainPrefix?: string;
  OAuthGrantType?: OAuthGrantType;
  OAuthScopes?: OAuthScopesElement[];
  RedirectSignInURIs?: string[];
  RedirectSignOutURIs?: string[];
  SocialProviderSettings?: SocialProviderSettings;
}
export const UpdateBackendAuthOAuthConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainPrefix: S.optional(S.String),
    OAuthGrantType: S.optional(OAuthGrantType),
    OAuthScopes: S.optional(ListOfOAuthScopesElement),
    RedirectSignInURIs: S.optional(ListOf__string),
    RedirectSignOutURIs: S.optional(ListOf__string),
    SocialProviderSettings: S.optional(SocialProviderSettings),
  }).pipe(
    S.encodeKeys({
      DomainPrefix: "domainPrefix",
      OAuthGrantType: "oAuthGrantType",
      OAuthScopes: "oAuthScopes",
      RedirectSignInURIs: "redirectSignInURIs",
      RedirectSignOutURIs: "redirectSignOutURIs",
      SocialProviderSettings: "socialProviderSettings",
    }),
  ),
).annotate({
  identifier: "UpdateBackendAuthOAuthConfig",
}) as any as S.Schema<UpdateBackendAuthOAuthConfig>;
export interface UpdateBackendAuthPasswordPolicyConfig {
  AdditionalConstraints?: AdditionalConstraintsElement[];
  MinimumLength?: number;
}
export const UpdateBackendAuthPasswordPolicyConfig = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AdditionalConstraints: S.optional(ListOfAdditionalConstraintsElement),
      MinimumLength: S.optional(S.Number),
    }).pipe(
      S.encodeKeys({
        AdditionalConstraints: "additionalConstraints",
        MinimumLength: "minimumLength",
      }),
    ),
).annotate({
  identifier: "UpdateBackendAuthPasswordPolicyConfig",
}) as any as S.Schema<UpdateBackendAuthPasswordPolicyConfig>;
export interface UpdateBackendAuthVerificationMessageConfig {
  DeliveryMethod?: DeliveryMethod;
  EmailSettings?: EmailSettings;
  SmsSettings?: SmsSettings;
}
export const UpdateBackendAuthVerificationMessageConfig =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      DeliveryMethod: S.optional(DeliveryMethod),
      EmailSettings: S.optional(EmailSettings),
      SmsSettings: S.optional(SmsSettings),
    }).pipe(
      S.encodeKeys({
        DeliveryMethod: "deliveryMethod",
        EmailSettings: "emailSettings",
        SmsSettings: "smsSettings",
      }),
    ),
  ).annotate({
    identifier: "UpdateBackendAuthVerificationMessageConfig",
  }) as any as S.Schema<UpdateBackendAuthVerificationMessageConfig>;
export interface UpdateBackendAuthUserPoolConfig {
  ForgotPassword?: UpdateBackendAuthForgotPasswordConfig;
  Mfa?: UpdateBackendAuthMFAConfig;
  OAuth?: UpdateBackendAuthOAuthConfig;
  PasswordPolicy?: UpdateBackendAuthPasswordPolicyConfig;
  VerificationMessage?: UpdateBackendAuthVerificationMessageConfig;
}
export const UpdateBackendAuthUserPoolConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ForgotPassword: S.optional(UpdateBackendAuthForgotPasswordConfig),
    Mfa: S.optional(UpdateBackendAuthMFAConfig),
    OAuth: S.optional(UpdateBackendAuthOAuthConfig),
    PasswordPolicy: S.optional(UpdateBackendAuthPasswordPolicyConfig),
    VerificationMessage: S.optional(UpdateBackendAuthVerificationMessageConfig),
  }).pipe(
    S.encodeKeys({
      ForgotPassword: "forgotPassword",
      Mfa: "mfa",
      OAuth: "oAuth",
      PasswordPolicy: "passwordPolicy",
      VerificationMessage: "verificationMessage",
    }),
  ),
).annotate({
  identifier: "UpdateBackendAuthUserPoolConfig",
}) as any as S.Schema<UpdateBackendAuthUserPoolConfig>;
export interface UpdateBackendAuthResourceConfig {
  AuthResources?: AuthResources;
  IdentityPoolConfigs?: UpdateBackendAuthIdentityPoolConfig;
  Service?: Service;
  UserPoolConfigs?: UpdateBackendAuthUserPoolConfig;
}
export const UpdateBackendAuthResourceConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthResources: S.optional(AuthResources),
    IdentityPoolConfigs: S.optional(UpdateBackendAuthIdentityPoolConfig),
    Service: S.optional(Service),
    UserPoolConfigs: S.optional(UpdateBackendAuthUserPoolConfig),
  }).pipe(
    S.encodeKeys({
      AuthResources: "authResources",
      IdentityPoolConfigs: "identityPoolConfigs",
      Service: "service",
      UserPoolConfigs: "userPoolConfigs",
    }),
  ),
).annotate({
  identifier: "UpdateBackendAuthResourceConfig",
}) as any as S.Schema<UpdateBackendAuthResourceConfig>;
export interface UpdateBackendAuthRequest {
  AppId: string;
  BackendEnvironmentName: string;
  ResourceConfig?: UpdateBackendAuthResourceConfig;
  ResourceName?: string;
}
export const UpdateBackendAuthRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppId: S.String.pipe(T.HttpLabel("AppId")),
    BackendEnvironmentName: S.String.pipe(
      T.HttpLabel("BackendEnvironmentName"),
    ),
    ResourceConfig: S.optional(UpdateBackendAuthResourceConfig),
    ResourceName: S.optional(S.String),
  })
    .pipe(
      S.encodeKeys({
        ResourceConfig: "resourceConfig",
        ResourceName: "resourceName",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/backend/{AppId}/auth/{BackendEnvironmentName}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateBackendAuthRequest",
}) as any as S.Schema<UpdateBackendAuthRequest>;
export interface UpdateBackendAuthResponse {
  AppId?: string;
  BackendEnvironmentName?: string;
  Error?: string;
  JobId?: string;
  Operation?: string;
  Status?: string;
}
export const UpdateBackendAuthResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppId: S.optional(S.String),
    BackendEnvironmentName: S.optional(S.String),
    Error: S.optional(S.String),
    JobId: S.optional(S.String),
    Operation: S.optional(S.String),
    Status: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AppId: "appId",
      BackendEnvironmentName: "backendEnvironmentName",
      Error: "error",
      JobId: "jobId",
      Operation: "operation",
      Status: "status",
    }),
  ),
).annotate({
  identifier: "UpdateBackendAuthResponse",
}) as any as S.Schema<UpdateBackendAuthResponse>;
export interface LoginAuthConfigReqObj {
  AwsCognitoIdentityPoolId?: string;
  AwsCognitoRegion?: string;
  AwsUserPoolsId?: string;
  AwsUserPoolsWebClientId?: string;
}
export const LoginAuthConfigReqObj = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AwsCognitoIdentityPoolId: S.optional(S.String),
    AwsCognitoRegion: S.optional(S.String),
    AwsUserPoolsId: S.optional(S.String),
    AwsUserPoolsWebClientId: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AwsCognitoIdentityPoolId: "aws_cognito_identity_pool_id",
      AwsCognitoRegion: "aws_cognito_region",
      AwsUserPoolsId: "aws_user_pools_id",
      AwsUserPoolsWebClientId: "aws_user_pools_web_client_id",
    }),
  ),
).annotate({
  identifier: "LoginAuthConfigReqObj",
}) as any as S.Schema<LoginAuthConfigReqObj>;
export interface UpdateBackendConfigRequest {
  AppId: string;
  LoginAuthConfig?: LoginAuthConfigReqObj;
}
export const UpdateBackendConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppId: S.String.pipe(T.HttpLabel("AppId")),
    LoginAuthConfig: S.optional(LoginAuthConfigReqObj),
  })
    .pipe(S.encodeKeys({ LoginAuthConfig: "loginAuthConfig" }))
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/backend/{AppId}/config/update" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateBackendConfigRequest",
}) as any as S.Schema<UpdateBackendConfigRequest>;
export interface UpdateBackendConfigResponse {
  AppId?: string;
  BackendManagerAppId?: string;
  Error?: string;
  LoginAuthConfig?: LoginAuthConfigReqObj;
}
export const UpdateBackendConfigResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppId: S.optional(S.String),
    BackendManagerAppId: S.optional(S.String),
    Error: S.optional(S.String),
    LoginAuthConfig: S.optional(LoginAuthConfigReqObj),
  }).pipe(
    S.encodeKeys({
      AppId: "appId",
      BackendManagerAppId: "backendManagerAppId",
      Error: "error",
      LoginAuthConfig: "loginAuthConfig",
    }),
  ),
).annotate({
  identifier: "UpdateBackendConfigResponse",
}) as any as S.Schema<UpdateBackendConfigResponse>;
export interface UpdateBackendJobRequest {
  AppId: string;
  BackendEnvironmentName: string;
  JobId: string;
  Operation?: string;
  Status?: string;
}
export const UpdateBackendJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppId: S.String.pipe(T.HttpLabel("AppId")),
    BackendEnvironmentName: S.String.pipe(
      T.HttpLabel("BackendEnvironmentName"),
    ),
    JobId: S.String.pipe(T.HttpLabel("JobId")),
    Operation: S.optional(S.String),
    Status: S.optional(S.String),
  })
    .pipe(S.encodeKeys({ Operation: "operation", Status: "status" }))
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/backend/{AppId}/job/{BackendEnvironmentName}/{JobId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateBackendJobRequest",
}) as any as S.Schema<UpdateBackendJobRequest>;
export interface UpdateBackendJobResponse {
  AppId?: string;
  BackendEnvironmentName?: string;
  CreateTime?: string;
  Error?: string;
  JobId?: string;
  Operation?: string;
  Status?: string;
  UpdateTime?: string;
}
export const UpdateBackendJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppId: S.optional(S.String),
    BackendEnvironmentName: S.optional(S.String),
    CreateTime: S.optional(S.String),
    Error: S.optional(S.String),
    JobId: S.optional(S.String),
    Operation: S.optional(S.String),
    Status: S.optional(S.String),
    UpdateTime: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AppId: "appId",
      BackendEnvironmentName: "backendEnvironmentName",
      CreateTime: "createTime",
      Error: "error",
      JobId: "jobId",
      Operation: "operation",
      Status: "status",
      UpdateTime: "updateTime",
    }),
  ),
).annotate({
  identifier: "UpdateBackendJobResponse",
}) as any as S.Schema<UpdateBackendJobResponse>;
export interface UpdateBackendStorageResourceConfig {
  Permissions?: BackendStoragePermissions;
  ServiceName?: ServiceName;
}
export const UpdateBackendStorageResourceConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Permissions: S.optional(BackendStoragePermissions),
    ServiceName: S.optional(ServiceName),
  }).pipe(
    S.encodeKeys({ Permissions: "permissions", ServiceName: "serviceName" }),
  ),
).annotate({
  identifier: "UpdateBackendStorageResourceConfig",
}) as any as S.Schema<UpdateBackendStorageResourceConfig>;
export interface UpdateBackendStorageRequest {
  AppId: string;
  BackendEnvironmentName: string;
  ResourceConfig?: UpdateBackendStorageResourceConfig;
  ResourceName?: string;
}
export const UpdateBackendStorageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppId: S.String.pipe(T.HttpLabel("AppId")),
    BackendEnvironmentName: S.String.pipe(
      T.HttpLabel("BackendEnvironmentName"),
    ),
    ResourceConfig: S.optional(UpdateBackendStorageResourceConfig),
    ResourceName: S.optional(S.String),
  })
    .pipe(
      S.encodeKeys({
        ResourceConfig: "resourceConfig",
        ResourceName: "resourceName",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/backend/{AppId}/storage/{BackendEnvironmentName}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateBackendStorageRequest",
}) as any as S.Schema<UpdateBackendStorageRequest>;
export interface UpdateBackendStorageResponse {
  AppId?: string;
  BackendEnvironmentName?: string;
  JobId?: string;
  Status?: string;
}
export const UpdateBackendStorageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppId: S.optional(S.String),
    BackendEnvironmentName: S.optional(S.String),
    JobId: S.optional(S.String),
    Status: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AppId: "appId",
      BackendEnvironmentName: "backendEnvironmentName",
      JobId: "jobId",
      Status: "status",
    }),
  ),
).annotate({
  identifier: "UpdateBackendStorageResponse",
}) as any as S.Schema<UpdateBackendStorageResponse>;
export type CloneBackendError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * This operation clones an existing backend.
 */
export const cloneBackend: API.OperationMethod<
  CloneBackendRequest,
  CloneBackendResponse,
  CloneBackendError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CloneBackendRequest,
  output: CloneBackendResponse,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CloneBackend",
}));

export type CreateBackendError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * This operation creates a backend for an Amplify app. Backends are automatically created at the time of app creation.
 */
export const createBackend: API.OperationMethod<
  CreateBackendRequest,
  CreateBackendResponse,
  CreateBackendError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateBackendRequest,
  output: CreateBackendResponse,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBackend",
}));

export type CreateBackendAPIError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new backend API resource.
 */
export const createBackendAPI: API.OperationMethod<
  CreateBackendAPIRequest,
  CreateBackendAPIResponse,
  CreateBackendAPIError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateBackendAPIRequest,
  output: CreateBackendAPIResponse,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBackendAPI",
}));

export type CreateBackendAuthError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new backend authentication resource.
 */
export const createBackendAuth: API.OperationMethod<
  CreateBackendAuthRequest,
  CreateBackendAuthResponse,
  CreateBackendAuthError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateBackendAuthRequest,
  output: CreateBackendAuthResponse,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBackendAuth",
}));

export type CreateBackendConfigError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a config object for a backend.
 */
export const createBackendConfig: API.OperationMethod<
  CreateBackendConfigRequest,
  CreateBackendConfigResponse,
  CreateBackendConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateBackendConfigRequest,
  output: CreateBackendConfigResponse,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBackendConfig",
}));

export type CreateBackendStorageError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a backend storage resource.
 */
export const createBackendStorage: API.OperationMethod<
  CreateBackendStorageRequest,
  CreateBackendStorageResponse,
  CreateBackendStorageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateBackendStorageRequest,
  output: CreateBackendStorageResponse,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBackendStorage",
}));

export type CreateTokenError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Generates a one-time challenge code to authenticate a user into your Amplify Admin UI.
 */
export const createToken: API.OperationMethod<
  CreateTokenRequest,
  CreateTokenResponse,
  CreateTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateTokenRequest,
  output: CreateTokenResponse,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateToken",
}));

export type DeleteBackendError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes an existing environment from your Amplify project.
 */
export const deleteBackend: API.OperationMethod<
  DeleteBackendRequest,
  DeleteBackendResponse,
  DeleteBackendError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteBackendRequest,
  output: DeleteBackendResponse,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBackend",
}));

export type DeleteBackendAPIError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an existing backend API resource.
 */
export const deleteBackendAPI: API.OperationMethod<
  DeleteBackendAPIRequest,
  DeleteBackendAPIResponse,
  DeleteBackendAPIError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteBackendAPIRequest,
  output: DeleteBackendAPIResponse,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBackendAPI",
}));

export type DeleteBackendAuthError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an existing backend authentication resource.
 */
export const deleteBackendAuth: API.OperationMethod<
  DeleteBackendAuthRequest,
  DeleteBackendAuthResponse,
  DeleteBackendAuthError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteBackendAuthRequest,
  output: DeleteBackendAuthResponse,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBackendAuth",
}));

export type DeleteBackendStorageError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes the specified backend storage resource.
 */
export const deleteBackendStorage: API.OperationMethod<
  DeleteBackendStorageRequest,
  DeleteBackendStorageResponse,
  DeleteBackendStorageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteBackendStorageRequest,
  output: DeleteBackendStorageResponse,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBackendStorage",
}));

export type DeleteTokenError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes the challenge token based on the given appId and sessionId.
 */
export const deleteToken: API.OperationMethod<
  DeleteTokenRequest,
  DeleteTokenResponse,
  DeleteTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTokenRequest,
  output: DeleteTokenResponse,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteToken",
}));

export type GenerateBackendAPIModelsError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Generates a model schema for an existing backend API resource.
 */
export const generateBackendAPIModels: API.OperationMethod<
  GenerateBackendAPIModelsRequest,
  GenerateBackendAPIModelsResponse,
  GenerateBackendAPIModelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GenerateBackendAPIModelsRequest,
  output: GenerateBackendAPIModelsResponse,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GenerateBackendAPIModels",
}));

export type GetBackendError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Provides project-level details for your Amplify UI project.
 */
export const getBackend: API.OperationMethod<
  GetBackendRequest,
  GetBackendResponse,
  GetBackendError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetBackendRequest,
  output: GetBackendResponse,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBackend",
}));

export type GetBackendAPIError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the details for a backend API.
 */
export const getBackendAPI: API.OperationMethod<
  GetBackendAPIRequest,
  GetBackendAPIResponse,
  GetBackendAPIError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetBackendAPIRequest,
  output: GetBackendAPIResponse,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBackendAPI",
}));

export type GetBackendAPIModelsError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a model introspection schema for an existing backend API resource.
 */
export const getBackendAPIModels: API.OperationMethod<
  GetBackendAPIModelsRequest,
  GetBackendAPIModelsResponse,
  GetBackendAPIModelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetBackendAPIModelsRequest,
  output: GetBackendAPIModelsResponse,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBackendAPIModels",
}));

export type GetBackendAuthError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a backend auth details.
 */
export const getBackendAuth: API.OperationMethod<
  GetBackendAuthRequest,
  GetBackendAuthResponse,
  GetBackendAuthError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetBackendAuthRequest,
  output: GetBackendAuthResponse,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBackendAuth",
}));

export type GetBackendJobError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns information about a specific job.
 */
export const getBackendJob: API.OperationMethod<
  GetBackendJobRequest,
  GetBackendJobResponse,
  GetBackendJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetBackendJobRequest,
  output: GetBackendJobResponse,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBackendJob",
}));

export type GetBackendStorageError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets details for a backend storage resource.
 */
export const getBackendStorage: API.OperationMethod<
  GetBackendStorageRequest,
  GetBackendStorageResponse,
  GetBackendStorageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetBackendStorageRequest,
  output: GetBackendStorageResponse,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBackendStorage",
}));

export type GetTokenError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the challenge token based on the given appId and sessionId.
 */
export const getToken: API.OperationMethod<
  GetTokenRequest,
  GetTokenResponse,
  GetTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTokenRequest,
  output: GetTokenResponse,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetToken",
}));

export type ImportBackendAuthError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Imports an existing backend authentication resource.
 */
export const importBackendAuth: API.OperationMethod<
  ImportBackendAuthRequest,
  ImportBackendAuthResponse,
  ImportBackendAuthError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ImportBackendAuthRequest,
  output: ImportBackendAuthResponse,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportBackendAuth",
}));

export type ImportBackendStorageError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Imports an existing backend storage resource.
 */
export const importBackendStorage: API.OperationMethod<
  ImportBackendStorageRequest,
  ImportBackendStorageResponse,
  ImportBackendStorageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ImportBackendStorageRequest,
  output: ImportBackendStorageResponse,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportBackendStorage",
}));

export type ListBackendJobsError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists the jobs for the backend of an Amplify app.
 */
export const listBackendJobs: API.OperationMethod<
  ListBackendJobsRequest,
  ListBackendJobsResponse,
  ListBackendJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListBackendJobsRequest,
  output: ListBackendJobsResponse,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBackendJobs",
}));

export type ListS3BucketsError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * The list of S3 buckets in your account.
 */
export const listS3Buckets: API.OperationMethod<
  ListS3BucketsRequest,
  ListS3BucketsResponse,
  ListS3BucketsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListS3BucketsRequest,
  output: ListS3BucketsResponse,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListS3Buckets",
}));

export type RemoveAllBackendsError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes all backend environments from your Amplify project.
 */
export const removeAllBackends: API.OperationMethod<
  RemoveAllBackendsRequest,
  RemoveAllBackendsResponse,
  RemoveAllBackendsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RemoveAllBackendsRequest,
  output: RemoveAllBackendsResponse,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveAllBackends",
}));

export type RemoveBackendConfigError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes the AWS resources required to access the Amplify Admin UI.
 */
export const removeBackendConfig: API.OperationMethod<
  RemoveBackendConfigRequest,
  RemoveBackendConfigResponse,
  RemoveBackendConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RemoveBackendConfigRequest,
  output: RemoveBackendConfigResponse,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveBackendConfig",
}));

export type UpdateBackendAPIError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an existing backend API resource.
 */
export const updateBackendAPI: API.OperationMethod<
  UpdateBackendAPIRequest,
  UpdateBackendAPIResponse,
  UpdateBackendAPIError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateBackendAPIRequest,
  output: UpdateBackendAPIResponse,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBackendAPI",
}));

export type UpdateBackendAuthError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an existing backend authentication resource.
 */
export const updateBackendAuth: API.OperationMethod<
  UpdateBackendAuthRequest,
  UpdateBackendAuthResponse,
  UpdateBackendAuthError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateBackendAuthRequest,
  output: UpdateBackendAuthResponse,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBackendAuth",
}));

export type UpdateBackendConfigError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the AWS resources required to access the Amplify Admin UI.
 */
export const updateBackendConfig: API.OperationMethod<
  UpdateBackendConfigRequest,
  UpdateBackendConfigResponse,
  UpdateBackendConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateBackendConfigRequest,
  output: UpdateBackendConfigResponse,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBackendConfig",
}));

export type UpdateBackendJobError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates a specific job.
 */
export const updateBackendJob: API.OperationMethod<
  UpdateBackendJobRequest,
  UpdateBackendJobResponse,
  UpdateBackendJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateBackendJobRequest,
  output: UpdateBackendJobResponse,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBackendJob",
}));

export type UpdateBackendStorageError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an existing backend storage resource.
 */
export const updateBackendStorage: API.OperationMethod<
  UpdateBackendStorageRequest,
  UpdateBackendStorageResponse,
  UpdateBackendStorageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateBackendStorageRequest,
  output: UpdateBackendStorageResponse,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBackendStorage",
}));
