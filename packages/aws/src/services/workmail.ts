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
  sdkId: "WorkMail",
  serviceShapeName: "WorkMailService",
});
const auth = T.AwsAuthSigv4({ name: "workmail" });
const ver = T.ServiceVersion("2017-10-01");
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
            return e(
              `https://workmail-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://workmail-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://workmail.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://workmail.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class DirectoryInUseException
  extends /*@__PURE__*/ S.TaggedError<DirectoryInUseException>()(
    "DirectoryInUseException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class DirectoryServiceAuthenticationFailedException
  extends /*@__PURE__*/ S.TaggedError<DirectoryServiceAuthenticationFailedException>()(
    "DirectoryServiceAuthenticationFailedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class DirectoryUnavailableException
  extends /*@__PURE__*/ S.TaggedError<DirectoryUnavailableException>()(
    "DirectoryUnavailableException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class EmailAddressInUseException
  extends /*@__PURE__*/ S.TaggedError<EmailAddressInUseException>()(
    "EmailAddressInUseException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class EntityAlreadyRegisteredException
  extends /*@__PURE__*/ S.TaggedError<EntityAlreadyRegisteredException>()(
    "EntityAlreadyRegisteredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class EntityNotFoundException
  extends /*@__PURE__*/ S.TaggedError<EntityNotFoundException>()(
    "EntityNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class EntityStateException
  extends /*@__PURE__*/ S.TaggedError<EntityStateException>()(
    "EntityStateException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidConfigurationException
  extends /*@__PURE__*/ S.TaggedError<InvalidConfigurationException>()(
    "InvalidConfigurationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidCustomSesConfigurationException
  extends /*@__PURE__*/ S.TaggedError<InvalidCustomSesConfigurationException>()(
    "InvalidCustomSesConfigurationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterException>()(
    "InvalidParameterException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidPasswordException
  extends /*@__PURE__*/ S.TaggedError<InvalidPasswordException>()(
    "InvalidPasswordException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class MailDomainInUseException
  extends /*@__PURE__*/ S.TaggedError<MailDomainInUseException>()(
    "MailDomainInUseException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class MailDomainNotFoundException
  extends /*@__PURE__*/ S.TaggedError<MailDomainNotFoundException>()(
    "MailDomainNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class MailDomainStateException
  extends /*@__PURE__*/ S.TaggedError<MailDomainStateException>()(
    "MailDomainStateException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class NameAvailabilityException
  extends /*@__PURE__*/ S.TaggedError<NameAvailabilityException>()(
    "NameAvailabilityException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class OrganizationNotFoundException
  extends /*@__PURE__*/ S.TaggedError<OrganizationNotFoundException>()(
    "OrganizationNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class OrganizationStateException
  extends /*@__PURE__*/ S.TaggedError<OrganizationStateException>()(
    "OrganizationStateException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ReservedNameException
  extends /*@__PURE__*/ S.TaggedError<ReservedNameException>()(
    "ReservedNameException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class UnsupportedOperationException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedOperationException>()(
    "UnsupportedOperationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export type OrganizationId = string;
export type EntityIdentifier = string;
export interface AssociateDelegateToResourceRequest {
  OrganizationId: string;
  ResourceId: string;
  EntityId: string;
}
export const AssociateDelegateToResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OrganizationId: S.String,
    ResourceId: S.String,
    EntityId: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "AssociateDelegateToResourceRequest",
}) as any as S.Schema<AssociateDelegateToResourceRequest>;
export interface AssociateDelegateToResourceResponse {}
export const AssociateDelegateToResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AssociateDelegateToResourceResponse",
}) as any as S.Schema<AssociateDelegateToResourceResponse>;
export interface AssociateMemberToGroupRequest {
  OrganizationId: string;
  GroupId: string;
  MemberId: string;
}
export const AssociateMemberToGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OrganizationId: S.String,
    GroupId: S.String,
    MemberId: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "AssociateMemberToGroupRequest",
}) as any as S.Schema<AssociateMemberToGroupRequest>;
export interface AssociateMemberToGroupResponse {}
export const AssociateMemberToGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AssociateMemberToGroupResponse",
}) as any as S.Schema<AssociateMemberToGroupResponse>;
export type ImpersonationRoleId = string;
export interface AssumeImpersonationRoleRequest {
  OrganizationId: string;
  ImpersonationRoleId: string;
}
export const AssumeImpersonationRoleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OrganizationId: S.String, ImpersonationRoleId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "AssumeImpersonationRoleRequest",
}) as any as S.Schema<AssumeImpersonationRoleRequest>;
export type ImpersonationToken = string;
export type ExpiresIn = number;
export interface AssumeImpersonationRoleResponse {
  Token?: string;
  ExpiresIn?: number;
}
export const AssumeImpersonationRoleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Token: S.optional(S.String), ExpiresIn: S.optional(S.Number) }),
).annotate({
  identifier: "AssumeImpersonationRoleResponse",
}) as any as S.Schema<AssumeImpersonationRoleResponse>;
export type IdempotencyClientToken = string;
export type MailboxExportJobId = string;
export interface CancelMailboxExportJobRequest {
  ClientToken: string;
  JobId: string;
  OrganizationId: string;
}
export const CancelMailboxExportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientToken: S.String.pipe(T.IdempotencyToken()),
    JobId: S.String,
    OrganizationId: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CancelMailboxExportJobRequest",
}) as any as S.Schema<CancelMailboxExportJobRequest>;
export interface CancelMailboxExportJobResponse {}
export const CancelMailboxExportJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CancelMailboxExportJobResponse",
}) as any as S.Schema<CancelMailboxExportJobResponse>;
export type WorkMailIdentifier = string;
export type EmailAddress = string;
export interface CreateAliasRequest {
  OrganizationId: string;
  EntityId: string;
  Alias: string;
}
export const CreateAliasRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OrganizationId: S.String,
    EntityId: S.String,
    Alias: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateAliasRequest",
}) as any as S.Schema<CreateAliasRequest>;
export interface CreateAliasResponse {}
export const CreateAliasResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CreateAliasResponse",
}) as any as S.Schema<CreateAliasResponse>;
export type DomainName = string;
export type Url = string;
export type ExternalUserName = string;
export type Password = string | redacted.Redacted<string>;
export interface EwsAvailabilityProvider {
  EwsEndpoint: string;
  EwsUsername: string;
  EwsPassword: string | redacted.Redacted<string>;
}
export const EwsAvailabilityProvider = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EwsEndpoint: S.String,
    EwsUsername: S.String,
    EwsPassword: SensitiveString,
  }),
).annotate({
  identifier: "EwsAvailabilityProvider",
}) as any as S.Schema<EwsAvailabilityProvider>;
export type LambdaArn = string;
export interface LambdaAvailabilityProvider {
  LambdaArn: string;
}
export const LambdaAvailabilityProvider = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LambdaArn: S.String }),
).annotate({
  identifier: "LambdaAvailabilityProvider",
}) as any as S.Schema<LambdaAvailabilityProvider>;
export interface CreateAvailabilityConfigurationRequest {
  ClientToken?: string;
  OrganizationId: string;
  DomainName: string;
  EwsProvider?: EwsAvailabilityProvider;
  LambdaProvider?: LambdaAvailabilityProvider;
}
export const CreateAvailabilityConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
      OrganizationId: S.String,
      DomainName: S.String,
      EwsProvider: S.optional(EwsAvailabilityProvider),
      LambdaProvider: S.optional(LambdaAvailabilityProvider),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "CreateAvailabilityConfigurationRequest",
}) as any as S.Schema<CreateAvailabilityConfigurationRequest>;
export interface CreateAvailabilityConfigurationResponse {}
export const CreateAvailabilityConfigurationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "CreateAvailabilityConfigurationResponse",
}) as any as S.Schema<CreateAvailabilityConfigurationResponse>;
export type GroupName = string;
export interface CreateGroupRequest {
  OrganizationId: string;
  Name: string;
  HiddenFromGlobalAddressList?: boolean;
}
export const CreateGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OrganizationId: S.String,
    Name: S.String,
    HiddenFromGlobalAddressList: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateGroupRequest",
}) as any as S.Schema<CreateGroupRequest>;
export interface CreateGroupResponse {
  GroupId?: string;
}
export const CreateGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GroupId: S.optional(S.String) }),
).annotate({
  identifier: "CreateGroupResponse",
}) as any as S.Schema<CreateGroupResponse>;
export type IdentityCenterApplicationName = string;
export type InstanceArn = string;
export interface CreateIdentityCenterApplicationRequest {
  Name: string;
  InstanceArn: string;
  ClientToken?: string;
}
export const CreateIdentityCenterApplicationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Name: S.String,
      InstanceArn: S.String,
      ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "CreateIdentityCenterApplicationRequest",
}) as any as S.Schema<CreateIdentityCenterApplicationRequest>;
export type ApplicationArn = string;
export interface CreateIdentityCenterApplicationResponse {
  ApplicationArn?: string;
}
export const CreateIdentityCenterApplicationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ ApplicationArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateIdentityCenterApplicationResponse",
}) as any as S.Schema<CreateIdentityCenterApplicationResponse>;
export type ImpersonationRoleName = string;
export type ImpersonationRoleType = "FULL_ACCESS" | "READ_ONLY" | (string & {});
export const ImpersonationRoleType = /*@__PURE__*/ S.String;

export type ImpersonationRoleDescription = string;
export type ImpersonationRuleId = string;
export type ImpersonationRuleName = string;
export type ImpersonationRuleDescription = string;
export type AccessEffect = "ALLOW" | "DENY" | (string & {});
export const AccessEffect = /*@__PURE__*/ S.String;

export type TargetUsers = string[];
export const TargetUsers = /*@__PURE__*/ S.Array(S.String);
export interface ImpersonationRule {
  ImpersonationRuleId: string;
  Name?: string;
  Description?: string;
  Effect: AccessEffect;
  TargetUsers?: string[];
  NotTargetUsers?: string[];
}
export const ImpersonationRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ImpersonationRuleId: S.String,
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    Effect: AccessEffect,
    TargetUsers: S.optional(TargetUsers),
    NotTargetUsers: S.optional(TargetUsers),
  }),
).annotate({
  identifier: "ImpersonationRule",
}) as any as S.Schema<ImpersonationRule>;
export type ImpersonationRuleList = ImpersonationRule[];
export const ImpersonationRuleList = /*@__PURE__*/ S.Array(ImpersonationRule);
export interface CreateImpersonationRoleRequest {
  ClientToken?: string;
  OrganizationId: string;
  Name: string;
  Type: ImpersonationRoleType;
  Description?: string;
  Rules: ImpersonationRule[];
}
export const CreateImpersonationRoleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    OrganizationId: S.String,
    Name: S.String,
    Type: ImpersonationRoleType,
    Description: S.optional(S.String),
    Rules: ImpersonationRuleList,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateImpersonationRoleRequest",
}) as any as S.Schema<CreateImpersonationRoleRequest>;
export interface CreateImpersonationRoleResponse {
  ImpersonationRoleId?: string;
}
export const CreateImpersonationRoleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ImpersonationRoleId: S.optional(S.String) }),
).annotate({
  identifier: "CreateImpersonationRoleResponse",
}) as any as S.Schema<CreateImpersonationRoleResponse>;
export type MobileDeviceAccessRuleName = string;
export type MobileDeviceAccessRuleDescription = string;
export type MobileDeviceAccessRuleEffect = "ALLOW" | "DENY" | (string & {});
export const MobileDeviceAccessRuleEffect = /*@__PURE__*/ S.String;

export type DeviceType = string;
export type DeviceTypeList = string[];
export const DeviceTypeList = /*@__PURE__*/ S.Array(S.String);
export type DeviceModel = string;
export type DeviceModelList = string[];
export const DeviceModelList = /*@__PURE__*/ S.Array(S.String);
export type DeviceOperatingSystem = string;
export type DeviceOperatingSystemList = string[];
export const DeviceOperatingSystemList = /*@__PURE__*/ S.Array(S.String);
export type DeviceUserAgent = string;
export type DeviceUserAgentList = string[];
export const DeviceUserAgentList = /*@__PURE__*/ S.Array(S.String);
export interface CreateMobileDeviceAccessRuleRequest {
  OrganizationId: string;
  ClientToken?: string;
  Name: string;
  Description?: string;
  Effect: MobileDeviceAccessRuleEffect;
  DeviceTypes?: string[];
  NotDeviceTypes?: string[];
  DeviceModels?: string[];
  NotDeviceModels?: string[];
  DeviceOperatingSystems?: string[];
  NotDeviceOperatingSystems?: string[];
  DeviceUserAgents?: string[];
  NotDeviceUserAgents?: string[];
}
export const CreateMobileDeviceAccessRuleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OrganizationId: S.String,
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    Name: S.String,
    Description: S.optional(S.String),
    Effect: MobileDeviceAccessRuleEffect,
    DeviceTypes: S.optional(DeviceTypeList),
    NotDeviceTypes: S.optional(DeviceTypeList),
    DeviceModels: S.optional(DeviceModelList),
    NotDeviceModels: S.optional(DeviceModelList),
    DeviceOperatingSystems: S.optional(DeviceOperatingSystemList),
    NotDeviceOperatingSystems: S.optional(DeviceOperatingSystemList),
    DeviceUserAgents: S.optional(DeviceUserAgentList),
    NotDeviceUserAgents: S.optional(DeviceUserAgentList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateMobileDeviceAccessRuleRequest",
}) as any as S.Schema<CreateMobileDeviceAccessRuleRequest>;
export type MobileDeviceAccessRuleId = string;
export interface CreateMobileDeviceAccessRuleResponse {
  MobileDeviceAccessRuleId?: string;
}
export const CreateMobileDeviceAccessRuleResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ MobileDeviceAccessRuleId: S.optional(S.String) }),
).annotate({
  identifier: "CreateMobileDeviceAccessRuleResponse",
}) as any as S.Schema<CreateMobileDeviceAccessRuleResponse>;
export type DirectoryId = string;
export type OrganizationName = string;
export type HostedZoneId = string;
export interface Domain {
  DomainName: string;
  HostedZoneId?: string;
}
export const Domain = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainName: S.String, HostedZoneId: S.optional(S.String) }),
).annotate({ identifier: "Domain" }) as any as S.Schema<Domain>;
export type Domains = Domain[];
export const Domains = /*@__PURE__*/ S.Array(Domain);
export type KmsKeyArn = string;
export interface CreateOrganizationRequest {
  DirectoryId?: string;
  Alias: string;
  ClientToken?: string;
  Domains?: Domain[];
  KmsKeyArn?: string;
  EnableInteroperability?: boolean;
}
export const CreateOrganizationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DirectoryId: S.optional(S.String),
    Alias: S.String,
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    Domains: S.optional(Domains),
    KmsKeyArn: S.optional(S.String),
    EnableInteroperability: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateOrganizationRequest",
}) as any as S.Schema<CreateOrganizationRequest>;
export interface CreateOrganizationResponse {
  OrganizationId?: string;
}
export const CreateOrganizationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OrganizationId: S.optional(S.String) }),
).annotate({
  identifier: "CreateOrganizationResponse",
}) as any as S.Schema<CreateOrganizationResponse>;
export type ResourceName = string;
export type ResourceType = "ROOM" | "EQUIPMENT" | (string & {});
export const ResourceType = /*@__PURE__*/ S.String;

export type ResourceDescription = string | redacted.Redacted<string>;
export interface CreateResourceRequest {
  OrganizationId: string;
  Name: string;
  Type: ResourceType;
  Description?: string | redacted.Redacted<string>;
  HiddenFromGlobalAddressList?: boolean;
}
export const CreateResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OrganizationId: S.String,
    Name: S.String,
    Type: ResourceType,
    Description: S.optional(SensitiveString),
    HiddenFromGlobalAddressList: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateResourceRequest",
}) as any as S.Schema<CreateResourceRequest>;
export type ResourceId = string;
export interface CreateResourceResponse {
  ResourceId?: string;
}
export const CreateResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceId: S.optional(S.String) }),
).annotate({
  identifier: "CreateResourceResponse",
}) as any as S.Schema<CreateResourceResponse>;
export type UserName = string;
export type UserAttribute = string | redacted.Redacted<string>;
export type UserRole =
  | "USER"
  | "RESOURCE"
  | "SYSTEM_USER"
  | "REMOTE_USER"
  | (string & {});
export const UserRole = /*@__PURE__*/ S.String;

export type IdentityProviderUserId = string;
export interface CreateUserRequest {
  OrganizationId: string;
  Name: string;
  DisplayName: string | redacted.Redacted<string>;
  Password?: string | redacted.Redacted<string>;
  Role?: UserRole;
  FirstName?: string | redacted.Redacted<string>;
  LastName?: string | redacted.Redacted<string>;
  HiddenFromGlobalAddressList?: boolean;
  IdentityProviderUserId?: string;
}
export const CreateUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OrganizationId: S.String,
    Name: S.String,
    DisplayName: SensitiveString,
    Password: S.optional(SensitiveString),
    Role: S.optional(UserRole),
    FirstName: S.optional(SensitiveString),
    LastName: S.optional(SensitiveString),
    HiddenFromGlobalAddressList: S.optional(S.Boolean),
    IdentityProviderUserId: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateUserRequest",
}) as any as S.Schema<CreateUserRequest>;
export interface CreateUserResponse {
  UserId?: string;
}
export const CreateUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UserId: S.optional(S.String) }),
).annotate({
  identifier: "CreateUserResponse",
}) as any as S.Schema<CreateUserResponse>;
export type AccessControlRuleName = string;
export interface DeleteAccessControlRuleRequest {
  OrganizationId: string;
  Name: string;
}
export const DeleteAccessControlRuleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OrganizationId: S.String, Name: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteAccessControlRuleRequest",
}) as any as S.Schema<DeleteAccessControlRuleRequest>;
export interface DeleteAccessControlRuleResponse {}
export const DeleteAccessControlRuleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAccessControlRuleResponse",
}) as any as S.Schema<DeleteAccessControlRuleResponse>;
export interface DeleteAliasRequest {
  OrganizationId: string;
  EntityId: string;
  Alias: string;
}
export const DeleteAliasRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OrganizationId: S.String,
    EntityId: S.String,
    Alias: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteAliasRequest",
}) as any as S.Schema<DeleteAliasRequest>;
export interface DeleteAliasResponse {}
export const DeleteAliasResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAliasResponse",
}) as any as S.Schema<DeleteAliasResponse>;
export interface DeleteAvailabilityConfigurationRequest {
  OrganizationId: string;
  DomainName: string;
}
export const DeleteAvailabilityConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ OrganizationId: S.String, DomainName: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DeleteAvailabilityConfigurationRequest",
}) as any as S.Schema<DeleteAvailabilityConfigurationRequest>;
export interface DeleteAvailabilityConfigurationResponse {}
export const DeleteAvailabilityConfigurationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeleteAvailabilityConfigurationResponse",
}) as any as S.Schema<DeleteAvailabilityConfigurationResponse>;
export interface DeleteEmailMonitoringConfigurationRequest {
  OrganizationId: string;
}
export const DeleteEmailMonitoringConfigurationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ OrganizationId: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "DeleteEmailMonitoringConfigurationRequest",
  }) as any as S.Schema<DeleteEmailMonitoringConfigurationRequest>;
export interface DeleteEmailMonitoringConfigurationResponse {}
export const DeleteEmailMonitoringConfigurationResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "DeleteEmailMonitoringConfigurationResponse",
  }) as any as S.Schema<DeleteEmailMonitoringConfigurationResponse>;
export interface DeleteGroupRequest {
  OrganizationId: string;
  GroupId: string;
}
export const DeleteGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OrganizationId: S.String, GroupId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteGroupRequest",
}) as any as S.Schema<DeleteGroupRequest>;
export interface DeleteGroupResponse {}
export const DeleteGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteGroupResponse",
}) as any as S.Schema<DeleteGroupResponse>;
export interface DeleteIdentityCenterApplicationRequest {
  ApplicationArn: string;
}
export const DeleteIdentityCenterApplicationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ ApplicationArn: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DeleteIdentityCenterApplicationRequest",
}) as any as S.Schema<DeleteIdentityCenterApplicationRequest>;
export interface DeleteIdentityCenterApplicationResponse {}
export const DeleteIdentityCenterApplicationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeleteIdentityCenterApplicationResponse",
}) as any as S.Schema<DeleteIdentityCenterApplicationResponse>;
export interface DeleteIdentityProviderConfigurationRequest {
  OrganizationId: string;
}
export const DeleteIdentityProviderConfigurationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ OrganizationId: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "DeleteIdentityProviderConfigurationRequest",
  }) as any as S.Schema<DeleteIdentityProviderConfigurationRequest>;
export interface DeleteIdentityProviderConfigurationResponse {}
export const DeleteIdentityProviderConfigurationResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "DeleteIdentityProviderConfigurationResponse",
  }) as any as S.Schema<DeleteIdentityProviderConfigurationResponse>;
export interface DeleteImpersonationRoleRequest {
  OrganizationId: string;
  ImpersonationRoleId: string;
}
export const DeleteImpersonationRoleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OrganizationId: S.String, ImpersonationRoleId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteImpersonationRoleRequest",
}) as any as S.Schema<DeleteImpersonationRoleRequest>;
export interface DeleteImpersonationRoleResponse {}
export const DeleteImpersonationRoleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteImpersonationRoleResponse",
}) as any as S.Schema<DeleteImpersonationRoleResponse>;
export interface DeleteMailboxPermissionsRequest {
  OrganizationId: string;
  EntityId: string;
  GranteeId: string;
}
export const DeleteMailboxPermissionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OrganizationId: S.String,
    EntityId: S.String,
    GranteeId: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteMailboxPermissionsRequest",
}) as any as S.Schema<DeleteMailboxPermissionsRequest>;
export interface DeleteMailboxPermissionsResponse {}
export const DeleteMailboxPermissionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteMailboxPermissionsResponse",
}) as any as S.Schema<DeleteMailboxPermissionsResponse>;
export type DeviceId = string;
export interface DeleteMobileDeviceAccessOverrideRequest {
  OrganizationId: string;
  UserId: string;
  DeviceId: string;
}
export const DeleteMobileDeviceAccessOverrideRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      OrganizationId: S.String,
      UserId: S.String,
      DeviceId: S.String,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DeleteMobileDeviceAccessOverrideRequest",
}) as any as S.Schema<DeleteMobileDeviceAccessOverrideRequest>;
export interface DeleteMobileDeviceAccessOverrideResponse {}
export const DeleteMobileDeviceAccessOverrideResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeleteMobileDeviceAccessOverrideResponse",
}) as any as S.Schema<DeleteMobileDeviceAccessOverrideResponse>;
export interface DeleteMobileDeviceAccessRuleRequest {
  OrganizationId: string;
  MobileDeviceAccessRuleId: string;
}
export const DeleteMobileDeviceAccessRuleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OrganizationId: S.String,
    MobileDeviceAccessRuleId: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteMobileDeviceAccessRuleRequest",
}) as any as S.Schema<DeleteMobileDeviceAccessRuleRequest>;
export interface DeleteMobileDeviceAccessRuleResponse {}
export const DeleteMobileDeviceAccessRuleResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeleteMobileDeviceAccessRuleResponse",
}) as any as S.Schema<DeleteMobileDeviceAccessRuleResponse>;
export interface DeleteOrganizationRequest {
  ClientToken?: string;
  OrganizationId: string;
  DeleteDirectory: boolean;
  ForceDelete?: boolean;
  DeleteIdentityCenterApplication?: boolean;
}
export const DeleteOrganizationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    OrganizationId: S.String,
    DeleteDirectory: S.Boolean,
    ForceDelete: S.optional(S.Boolean),
    DeleteIdentityCenterApplication: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteOrganizationRequest",
}) as any as S.Schema<DeleteOrganizationRequest>;
export interface DeleteOrganizationResponse {
  OrganizationId?: string;
  State?: string;
}
export const DeleteOrganizationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OrganizationId: S.optional(S.String),
    State: S.optional(S.String),
  }),
).annotate({
  identifier: "DeleteOrganizationResponse",
}) as any as S.Schema<DeleteOrganizationResponse>;
export type PersonalAccessTokenId = string;
export interface DeletePersonalAccessTokenRequest {
  OrganizationId: string;
  PersonalAccessTokenId: string;
}
export const DeletePersonalAccessTokenRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OrganizationId: S.String, PersonalAccessTokenId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeletePersonalAccessTokenRequest",
}) as any as S.Schema<DeletePersonalAccessTokenRequest>;
export interface DeletePersonalAccessTokenResponse {}
export const DeletePersonalAccessTokenResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeletePersonalAccessTokenResponse",
}) as any as S.Schema<DeletePersonalAccessTokenResponse>;
export interface DeleteResourceRequest {
  OrganizationId: string;
  ResourceId: string;
}
export const DeleteResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OrganizationId: S.String, ResourceId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteResourceRequest",
}) as any as S.Schema<DeleteResourceRequest>;
export interface DeleteResourceResponse {}
export const DeleteResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteResourceResponse",
}) as any as S.Schema<DeleteResourceResponse>;
export type ShortString = string;
export interface DeleteRetentionPolicyRequest {
  OrganizationId: string;
  Id: string;
}
export const DeleteRetentionPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OrganizationId: S.String, Id: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteRetentionPolicyRequest",
}) as any as S.Schema<DeleteRetentionPolicyRequest>;
export interface DeleteRetentionPolicyResponse {}
export const DeleteRetentionPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteRetentionPolicyResponse",
}) as any as S.Schema<DeleteRetentionPolicyResponse>;
export interface DeleteUserRequest {
  OrganizationId: string;
  UserId: string;
}
export const DeleteUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OrganizationId: S.String, UserId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteUserRequest",
}) as any as S.Schema<DeleteUserRequest>;
export interface DeleteUserResponse {}
export const DeleteUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteUserResponse",
}) as any as S.Schema<DeleteUserResponse>;
export interface DeregisterFromWorkMailRequest {
  OrganizationId: string;
  EntityId: string;
}
export const DeregisterFromWorkMailRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OrganizationId: S.String, EntityId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeregisterFromWorkMailRequest",
}) as any as S.Schema<DeregisterFromWorkMailRequest>;
export interface DeregisterFromWorkMailResponse {}
export const DeregisterFromWorkMailResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeregisterFromWorkMailResponse",
}) as any as S.Schema<DeregisterFromWorkMailResponse>;
export type WorkMailDomainName = string;
export interface DeregisterMailDomainRequest {
  OrganizationId: string;
  DomainName: string;
}
export const DeregisterMailDomainRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OrganizationId: S.String, DomainName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeregisterMailDomainRequest",
}) as any as S.Schema<DeregisterMailDomainRequest>;
export interface DeregisterMailDomainResponse {}
export const DeregisterMailDomainResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeregisterMailDomainResponse",
}) as any as S.Schema<DeregisterMailDomainResponse>;
export interface DescribeEmailMonitoringConfigurationRequest {
  OrganizationId: string;
}
export const DescribeEmailMonitoringConfigurationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ OrganizationId: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "DescribeEmailMonitoringConfigurationRequest",
  }) as any as S.Schema<DescribeEmailMonitoringConfigurationRequest>;
export type RoleArn = string;
export type LogGroupArn = string;
export interface DescribeEmailMonitoringConfigurationResponse {
  RoleArn?: string;
  LogGroupArn?: string;
}
export const DescribeEmailMonitoringConfigurationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      RoleArn: S.optional(S.String),
      LogGroupArn: S.optional(S.String),
    }),
  ).annotate({
    identifier: "DescribeEmailMonitoringConfigurationResponse",
  }) as any as S.Schema<DescribeEmailMonitoringConfigurationResponse>;
export interface DescribeEntityRequest {
  OrganizationId: string;
  Email: string;
}
export const DescribeEntityRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OrganizationId: S.String, Email: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeEntityRequest",
}) as any as S.Schema<DescribeEntityRequest>;
export type EntityType = "GROUP" | "USER" | "RESOURCE" | (string & {});
export const EntityType = /*@__PURE__*/ S.String;

export interface DescribeEntityResponse {
  EntityId?: string;
  Name?: string;
  Type?: EntityType;
}
export const DescribeEntityResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EntityId: S.optional(S.String),
    Name: S.optional(S.String),
    Type: S.optional(EntityType),
  }),
).annotate({
  identifier: "DescribeEntityResponse",
}) as any as S.Schema<DescribeEntityResponse>;
export interface DescribeGroupRequest {
  OrganizationId: string;
  GroupId: string;
}
export const DescribeGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OrganizationId: S.String, GroupId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeGroupRequest",
}) as any as S.Schema<DescribeGroupRequest>;
export type EntityState = "ENABLED" | "DISABLED" | "DELETED" | (string & {});
export const EntityState = /*@__PURE__*/ S.String;

export interface DescribeGroupResponse {
  GroupId?: string;
  Name?: string;
  Email?: string;
  State?: EntityState;
  EnabledDate?: Date;
  DisabledDate?: Date;
  HiddenFromGlobalAddressList?: boolean;
}
export const DescribeGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupId: S.optional(S.String),
    Name: S.optional(S.String),
    Email: S.optional(S.String),
    State: S.optional(EntityState),
    EnabledDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DisabledDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    HiddenFromGlobalAddressList: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "DescribeGroupResponse",
}) as any as S.Schema<DescribeGroupResponse>;
export interface DescribeIdentityProviderConfigurationRequest {
  OrganizationId: string;
}
export const DescribeIdentityProviderConfigurationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ OrganizationId: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "DescribeIdentityProviderConfigurationRequest",
  }) as any as S.Schema<DescribeIdentityProviderConfigurationRequest>;
export type IdentityProviderAuthenticationMode =
  | "IDENTITY_PROVIDER_ONLY"
  | "IDENTITY_PROVIDER_AND_DIRECTORY"
  | (string & {});
export const IdentityProviderAuthenticationMode = /*@__PURE__*/ S.String;

export interface IdentityCenterConfiguration {
  InstanceArn: string;
  ApplicationArn: string;
}
export const IdentityCenterConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InstanceArn: S.String, ApplicationArn: S.String }),
).annotate({
  identifier: "IdentityCenterConfiguration",
}) as any as S.Schema<IdentityCenterConfiguration>;
export type PersonalAccessTokenConfigurationStatus =
  | "ACTIVE"
  | "INACTIVE"
  | (string & {});
export const PersonalAccessTokenConfigurationStatus = /*@__PURE__*/ S.String;

export type PersonalAccessTokenLifetimeInDays = number;
export interface PersonalAccessTokenConfiguration {
  Status: PersonalAccessTokenConfigurationStatus;
  LifetimeInDays?: number;
}
export const PersonalAccessTokenConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: PersonalAccessTokenConfigurationStatus,
    LifetimeInDays: S.optional(S.Number),
  }),
).annotate({
  identifier: "PersonalAccessTokenConfiguration",
}) as any as S.Schema<PersonalAccessTokenConfiguration>;
export interface DescribeIdentityProviderConfigurationResponse {
  AuthenticationMode?: IdentityProviderAuthenticationMode;
  IdentityCenterConfiguration?: IdentityCenterConfiguration;
  PersonalAccessTokenConfiguration?: PersonalAccessTokenConfiguration;
}
export const DescribeIdentityProviderConfigurationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AuthenticationMode: S.optional(IdentityProviderAuthenticationMode),
      IdentityCenterConfiguration: S.optional(IdentityCenterConfiguration),
      PersonalAccessTokenConfiguration: S.optional(
        PersonalAccessTokenConfiguration,
      ),
    }),
  ).annotate({
    identifier: "DescribeIdentityProviderConfigurationResponse",
  }) as any as S.Schema<DescribeIdentityProviderConfigurationResponse>;
export interface DescribeInboundDmarcSettingsRequest {
  OrganizationId: string;
}
export const DescribeInboundDmarcSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OrganizationId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeInboundDmarcSettingsRequest",
}) as any as S.Schema<DescribeInboundDmarcSettingsRequest>;
export interface DescribeInboundDmarcSettingsResponse {
  Enforced?: boolean;
}
export const DescribeInboundDmarcSettingsResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ Enforced: S.optional(S.Boolean) }),
).annotate({
  identifier: "DescribeInboundDmarcSettingsResponse",
}) as any as S.Schema<DescribeInboundDmarcSettingsResponse>;
export interface DescribeMailboxExportJobRequest {
  JobId: string;
  OrganizationId: string;
}
export const DescribeMailboxExportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobId: S.String, OrganizationId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeMailboxExportJobRequest",
}) as any as S.Schema<DescribeMailboxExportJobRequest>;
export type Description = string;
export type S3BucketName = string;
export type S3ObjectKey = string;
export type Percentage = number;
export type MailboxExportJobState =
  | "RUNNING"
  | "COMPLETED"
  | "FAILED"
  | "CANCELLED"
  | (string & {});
export const MailboxExportJobState = /*@__PURE__*/ S.String;

export type MailboxExportErrorInfo = string;
export interface DescribeMailboxExportJobResponse {
  EntityId?: string;
  Description?: string;
  RoleArn?: string;
  KmsKeyArn?: string;
  S3BucketName?: string;
  S3Prefix?: string;
  S3Path?: string;
  EstimatedProgress?: number;
  State?: MailboxExportJobState;
  ErrorInfo?: string;
  StartTime?: Date;
  EndTime?: Date;
}
export const DescribeMailboxExportJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EntityId: S.optional(S.String),
    Description: S.optional(S.String),
    RoleArn: S.optional(S.String),
    KmsKeyArn: S.optional(S.String),
    S3BucketName: S.optional(S.String),
    S3Prefix: S.optional(S.String),
    S3Path: S.optional(S.String),
    EstimatedProgress: S.optional(S.Number),
    State: S.optional(MailboxExportJobState),
    ErrorInfo: S.optional(S.String),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "DescribeMailboxExportJobResponse",
}) as any as S.Schema<DescribeMailboxExportJobResponse>;
export interface DescribeOrganizationRequest {
  OrganizationId: string;
}
export const DescribeOrganizationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OrganizationId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeOrganizationRequest",
}) as any as S.Schema<DescribeOrganizationRequest>;
export type AmazonResourceName = string;
export interface DescribeOrganizationResponse {
  OrganizationId?: string;
  Alias?: string;
  State?: string;
  DirectoryId?: string;
  DirectoryType?: string;
  DefaultMailDomain?: string;
  CompletedDate?: Date;
  ErrorMessage?: string;
  ARN?: string;
  MigrationAdmin?: string;
  InteroperabilityEnabled?: boolean;
}
export const DescribeOrganizationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OrganizationId: S.optional(S.String),
    Alias: S.optional(S.String),
    State: S.optional(S.String),
    DirectoryId: S.optional(S.String),
    DirectoryType: S.optional(S.String),
    DefaultMailDomain: S.optional(S.String),
    CompletedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ErrorMessage: S.optional(S.String),
    ARN: S.optional(S.String),
    MigrationAdmin: S.optional(S.String),
    InteroperabilityEnabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "DescribeOrganizationResponse",
}) as any as S.Schema<DescribeOrganizationResponse>;
export interface DescribeResourceRequest {
  OrganizationId: string;
  ResourceId: string;
}
export const DescribeResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OrganizationId: S.String, ResourceId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeResourceRequest",
}) as any as S.Schema<DescribeResourceRequest>;
export interface BookingOptions {
  AutoAcceptRequests?: boolean;
  AutoDeclineRecurringRequests?: boolean;
  AutoDeclineConflictingRequests?: boolean;
}
export const BookingOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AutoAcceptRequests: S.optional(S.Boolean),
    AutoDeclineRecurringRequests: S.optional(S.Boolean),
    AutoDeclineConflictingRequests: S.optional(S.Boolean),
  }),
).annotate({ identifier: "BookingOptions" }) as any as S.Schema<BookingOptions>;
export interface DescribeResourceResponse {
  ResourceId?: string;
  Email?: string;
  Name?: string;
  Type?: ResourceType;
  BookingOptions?: BookingOptions;
  State?: EntityState;
  EnabledDate?: Date;
  DisabledDate?: Date;
  Description?: string | redacted.Redacted<string>;
  HiddenFromGlobalAddressList?: boolean;
}
export const DescribeResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceId: S.optional(S.String),
    Email: S.optional(S.String),
    Name: S.optional(S.String),
    Type: S.optional(ResourceType),
    BookingOptions: S.optional(BookingOptions),
    State: S.optional(EntityState),
    EnabledDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DisabledDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Description: S.optional(SensitiveString),
    HiddenFromGlobalAddressList: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "DescribeResourceResponse",
}) as any as S.Schema<DescribeResourceResponse>;
export interface DescribeUserRequest {
  OrganizationId: string;
  UserId: string;
}
export const DescribeUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OrganizationId: S.String, UserId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeUserRequest",
}) as any as S.Schema<DescribeUserRequest>;
export type IdentityProviderIdentityStoreId = string;
export interface DescribeUserResponse {
  UserId?: string;
  Name?: string;
  Email?: string;
  DisplayName?: string | redacted.Redacted<string>;
  State?: EntityState;
  UserRole?: UserRole;
  EnabledDate?: Date;
  DisabledDate?: Date;
  MailboxProvisionedDate?: Date;
  MailboxDeprovisionedDate?: Date;
  FirstName?: string | redacted.Redacted<string>;
  LastName?: string | redacted.Redacted<string>;
  HiddenFromGlobalAddressList?: boolean;
  Initials?: string | redacted.Redacted<string>;
  Telephone?: string | redacted.Redacted<string>;
  Street?: string | redacted.Redacted<string>;
  JobTitle?: string | redacted.Redacted<string>;
  City?: string | redacted.Redacted<string>;
  Company?: string | redacted.Redacted<string>;
  ZipCode?: string | redacted.Redacted<string>;
  Department?: string | redacted.Redacted<string>;
  Country?: string | redacted.Redacted<string>;
  Office?: string | redacted.Redacted<string>;
  IdentityProviderUserId?: string;
  IdentityProviderIdentityStoreId?: string;
}
export const DescribeUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserId: S.optional(S.String),
    Name: S.optional(S.String),
    Email: S.optional(S.String),
    DisplayName: S.optional(SensitiveString),
    State: S.optional(EntityState),
    UserRole: S.optional(UserRole),
    EnabledDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DisabledDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    MailboxProvisionedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    MailboxDeprovisionedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    FirstName: S.optional(SensitiveString),
    LastName: S.optional(SensitiveString),
    HiddenFromGlobalAddressList: S.optional(S.Boolean),
    Initials: S.optional(SensitiveString),
    Telephone: S.optional(SensitiveString),
    Street: S.optional(SensitiveString),
    JobTitle: S.optional(SensitiveString),
    City: S.optional(SensitiveString),
    Company: S.optional(SensitiveString),
    ZipCode: S.optional(SensitiveString),
    Department: S.optional(SensitiveString),
    Country: S.optional(SensitiveString),
    Office: S.optional(SensitiveString),
    IdentityProviderUserId: S.optional(S.String),
    IdentityProviderIdentityStoreId: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeUserResponse",
}) as any as S.Schema<DescribeUserResponse>;
export interface DisassociateDelegateFromResourceRequest {
  OrganizationId: string;
  ResourceId: string;
  EntityId: string;
}
export const DisassociateDelegateFromResourceRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      OrganizationId: S.String,
      ResourceId: S.String,
      EntityId: S.String,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DisassociateDelegateFromResourceRequest",
}) as any as S.Schema<DisassociateDelegateFromResourceRequest>;
export interface DisassociateDelegateFromResourceResponse {}
export const DisassociateDelegateFromResourceResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DisassociateDelegateFromResourceResponse",
}) as any as S.Schema<DisassociateDelegateFromResourceResponse>;
export interface DisassociateMemberFromGroupRequest {
  OrganizationId: string;
  GroupId: string;
  MemberId: string;
}
export const DisassociateMemberFromGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OrganizationId: S.String,
    GroupId: S.String,
    MemberId: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DisassociateMemberFromGroupRequest",
}) as any as S.Schema<DisassociateMemberFromGroupRequest>;
export interface DisassociateMemberFromGroupResponse {}
export const DisassociateMemberFromGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisassociateMemberFromGroupResponse",
}) as any as S.Schema<DisassociateMemberFromGroupResponse>;
export type IpAddress = string;
export type AccessControlRuleAction = string;
export interface GetAccessControlEffectRequest {
  OrganizationId: string;
  IpAddress: string;
  Action: string;
  UserId?: string;
  ImpersonationRoleId?: string;
}
export const GetAccessControlEffectRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OrganizationId: S.String,
    IpAddress: S.String,
    Action: S.String,
    UserId: S.optional(S.String),
    ImpersonationRoleId: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetAccessControlEffectRequest",
}) as any as S.Schema<GetAccessControlEffectRequest>;
export type AccessControlRuleEffect = "ALLOW" | "DENY" | (string & {});
export const AccessControlRuleEffect = /*@__PURE__*/ S.String;

export type AccessControlRuleNameList = string[];
export const AccessControlRuleNameList = /*@__PURE__*/ S.Array(S.String);
export interface GetAccessControlEffectResponse {
  Effect?: AccessControlRuleEffect;
  MatchedRules?: string[];
}
export const GetAccessControlEffectResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Effect: S.optional(AccessControlRuleEffect),
    MatchedRules: S.optional(AccessControlRuleNameList),
  }),
).annotate({
  identifier: "GetAccessControlEffectResponse",
}) as any as S.Schema<GetAccessControlEffectResponse>;
export interface GetDefaultRetentionPolicyRequest {
  OrganizationId: string;
}
export const GetDefaultRetentionPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OrganizationId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetDefaultRetentionPolicyRequest",
}) as any as S.Schema<GetDefaultRetentionPolicyRequest>;
export type FolderName =
  | "INBOX"
  | "DELETED_ITEMS"
  | "SENT_ITEMS"
  | "DRAFTS"
  | "JUNK_EMAIL"
  | (string & {});
export const FolderName = /*@__PURE__*/ S.String;

export type RetentionAction =
  | "NONE"
  | "DELETE"
  | "PERMANENTLY_DELETE"
  | (string & {});
export const RetentionAction = /*@__PURE__*/ S.String;

export type RetentionPeriod = number;
export interface FolderConfiguration {
  Name: FolderName;
  Action: RetentionAction;
  Period?: number;
}
export const FolderConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: FolderName,
    Action: RetentionAction,
    Period: S.optional(S.Number),
  }),
).annotate({
  identifier: "FolderConfiguration",
}) as any as S.Schema<FolderConfiguration>;
export type FolderConfigurations = FolderConfiguration[];
export const FolderConfigurations = /*@__PURE__*/ S.Array(FolderConfiguration);
export interface GetDefaultRetentionPolicyResponse {
  Id?: string;
  Name?: string;
  Description?: string;
  FolderConfigurations?: FolderConfiguration[];
}
export const GetDefaultRetentionPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    FolderConfigurations: S.optional(FolderConfigurations),
  }),
).annotate({
  identifier: "GetDefaultRetentionPolicyResponse",
}) as any as S.Schema<GetDefaultRetentionPolicyResponse>;
export interface GetImpersonationRoleRequest {
  OrganizationId: string;
  ImpersonationRoleId: string;
}
export const GetImpersonationRoleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OrganizationId: S.String, ImpersonationRoleId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetImpersonationRoleRequest",
}) as any as S.Schema<GetImpersonationRoleRequest>;
export interface GetImpersonationRoleResponse {
  ImpersonationRoleId?: string;
  Name?: string;
  Type?: ImpersonationRoleType;
  Description?: string;
  Rules?: ImpersonationRule[];
  DateCreated?: Date;
  DateModified?: Date;
}
export const GetImpersonationRoleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ImpersonationRoleId: S.optional(S.String),
    Name: S.optional(S.String),
    Type: S.optional(ImpersonationRoleType),
    Description: S.optional(S.String),
    Rules: S.optional(ImpersonationRuleList),
    DateCreated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DateModified: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "GetImpersonationRoleResponse",
}) as any as S.Schema<GetImpersonationRoleResponse>;
export interface GetImpersonationRoleEffectRequest {
  OrganizationId: string;
  ImpersonationRoleId: string;
  TargetUser: string;
}
export const GetImpersonationRoleEffectRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OrganizationId: S.String,
    ImpersonationRoleId: S.String,
    TargetUser: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetImpersonationRoleEffectRequest",
}) as any as S.Schema<GetImpersonationRoleEffectRequest>;
export interface ImpersonationMatchedRule {
  ImpersonationRuleId?: string;
  Name?: string;
}
export const ImpersonationMatchedRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ImpersonationRuleId: S.optional(S.String),
    Name: S.optional(S.String),
  }),
).annotate({
  identifier: "ImpersonationMatchedRule",
}) as any as S.Schema<ImpersonationMatchedRule>;
export type ImpersonationMatchedRuleList = ImpersonationMatchedRule[];
export const ImpersonationMatchedRuleList = /*@__PURE__*/ S.Array(
  ImpersonationMatchedRule,
);
export interface GetImpersonationRoleEffectResponse {
  Type?: ImpersonationRoleType;
  Effect?: AccessEffect;
  MatchedRules?: ImpersonationMatchedRule[];
}
export const GetImpersonationRoleEffectResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(ImpersonationRoleType),
    Effect: S.optional(AccessEffect),
    MatchedRules: S.optional(ImpersonationMatchedRuleList),
  }),
).annotate({
  identifier: "GetImpersonationRoleEffectResponse",
}) as any as S.Schema<GetImpersonationRoleEffectResponse>;
export interface GetMailboxDetailsRequest {
  OrganizationId: string;
  UserId: string;
}
export const GetMailboxDetailsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OrganizationId: S.String, UserId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetMailboxDetailsRequest",
}) as any as S.Schema<GetMailboxDetailsRequest>;
export type MailboxQuota = number;
export type MailboxSize = number;
export interface GetMailboxDetailsResponse {
  MailboxQuota?: number;
  MailboxSize?: number;
}
export const GetMailboxDetailsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MailboxQuota: S.optional(S.Number),
    MailboxSize: S.optional(S.Number),
  }),
).annotate({
  identifier: "GetMailboxDetailsResponse",
}) as any as S.Schema<GetMailboxDetailsResponse>;
export interface GetMailDomainRequest {
  OrganizationId: string;
  DomainName: string;
}
export const GetMailDomainRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OrganizationId: S.String, DomainName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetMailDomainRequest",
}) as any as S.Schema<GetMailDomainRequest>;
export interface DnsRecord {
  Type?: string;
  Hostname?: string;
  Value?: string;
}
export const DnsRecord = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(S.String),
    Hostname: S.optional(S.String),
    Value: S.optional(S.String),
  }),
).annotate({ identifier: "DnsRecord" }) as any as S.Schema<DnsRecord>;
export type DnsRecords = DnsRecord[];
export const DnsRecords = /*@__PURE__*/ S.Array(DnsRecord);
export type DnsRecordVerificationStatus =
  | "PENDING"
  | "VERIFIED"
  | "FAILED"
  | (string & {});
export const DnsRecordVerificationStatus = /*@__PURE__*/ S.String;

export interface GetMailDomainResponse {
  Records?: DnsRecord[];
  IsTestDomain?: boolean;
  IsDefault?: boolean;
  OwnershipVerificationStatus?: DnsRecordVerificationStatus;
  DkimVerificationStatus?: DnsRecordVerificationStatus;
}
export const GetMailDomainResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Records: S.optional(DnsRecords),
    IsTestDomain: S.optional(S.Boolean),
    IsDefault: S.optional(S.Boolean),
    OwnershipVerificationStatus: S.optional(DnsRecordVerificationStatus),
    DkimVerificationStatus: S.optional(DnsRecordVerificationStatus),
  }),
).annotate({
  identifier: "GetMailDomainResponse",
}) as any as S.Schema<GetMailDomainResponse>;
export interface GetMobileDeviceAccessEffectRequest {
  OrganizationId: string;
  DeviceType?: string;
  DeviceModel?: string;
  DeviceOperatingSystem?: string;
  DeviceUserAgent?: string;
}
export const GetMobileDeviceAccessEffectRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OrganizationId: S.String,
    DeviceType: S.optional(S.String),
    DeviceModel: S.optional(S.String),
    DeviceOperatingSystem: S.optional(S.String),
    DeviceUserAgent: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetMobileDeviceAccessEffectRequest",
}) as any as S.Schema<GetMobileDeviceAccessEffectRequest>;
export interface MobileDeviceAccessMatchedRule {
  MobileDeviceAccessRuleId?: string;
  Name?: string;
}
export const MobileDeviceAccessMatchedRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MobileDeviceAccessRuleId: S.optional(S.String),
    Name: S.optional(S.String),
  }),
).annotate({
  identifier: "MobileDeviceAccessMatchedRule",
}) as any as S.Schema<MobileDeviceAccessMatchedRule>;
export type MobileDeviceAccessMatchedRuleList = MobileDeviceAccessMatchedRule[];
export const MobileDeviceAccessMatchedRuleList = /*@__PURE__*/ S.Array(
  MobileDeviceAccessMatchedRule,
);
export interface GetMobileDeviceAccessEffectResponse {
  Effect?: MobileDeviceAccessRuleEffect;
  MatchedRules?: MobileDeviceAccessMatchedRule[];
}
export const GetMobileDeviceAccessEffectResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Effect: S.optional(MobileDeviceAccessRuleEffect),
    MatchedRules: S.optional(MobileDeviceAccessMatchedRuleList),
  }),
).annotate({
  identifier: "GetMobileDeviceAccessEffectResponse",
}) as any as S.Schema<GetMobileDeviceAccessEffectResponse>;
export interface GetMobileDeviceAccessOverrideRequest {
  OrganizationId: string;
  UserId: string;
  DeviceId: string;
}
export const GetMobileDeviceAccessOverrideRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      OrganizationId: S.String,
      UserId: S.String,
      DeviceId: S.String,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "GetMobileDeviceAccessOverrideRequest",
}) as any as S.Schema<GetMobileDeviceAccessOverrideRequest>;
export interface GetMobileDeviceAccessOverrideResponse {
  UserId?: string;
  DeviceId?: string;
  Effect?: MobileDeviceAccessRuleEffect;
  Description?: string;
  DateCreated?: Date;
  DateModified?: Date;
}
export const GetMobileDeviceAccessOverrideResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      UserId: S.optional(S.String),
      DeviceId: S.optional(S.String),
      Effect: S.optional(MobileDeviceAccessRuleEffect),
      Description: S.optional(S.String),
      DateCreated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      DateModified: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    }),
).annotate({
  identifier: "GetMobileDeviceAccessOverrideResponse",
}) as any as S.Schema<GetMobileDeviceAccessOverrideResponse>;
export interface GetPersonalAccessTokenMetadataRequest {
  OrganizationId: string;
  PersonalAccessTokenId: string;
}
export const GetPersonalAccessTokenMetadataRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      OrganizationId: S.String,
      PersonalAccessTokenId: S.String,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "GetPersonalAccessTokenMetadataRequest",
}) as any as S.Schema<GetPersonalAccessTokenMetadataRequest>;
export type PersonalAccessTokenName = string;
export type PersonalAccessTokenScope = string;
export type PersonalAccessTokenScopeList = string[];
export const PersonalAccessTokenScopeList = /*@__PURE__*/ S.Array(S.String);
export interface GetPersonalAccessTokenMetadataResponse {
  PersonalAccessTokenId?: string;
  UserId?: string;
  Name?: string;
  DateCreated?: Date;
  DateLastUsed?: Date;
  ExpiresTime?: Date;
  Scopes?: string[];
}
export const GetPersonalAccessTokenMetadataResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      PersonalAccessTokenId: S.optional(S.String),
      UserId: S.optional(S.String),
      Name: S.optional(S.String),
      DateCreated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      DateLastUsed: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      ExpiresTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      Scopes: S.optional(PersonalAccessTokenScopeList),
    }),
).annotate({
  identifier: "GetPersonalAccessTokenMetadataResponse",
}) as any as S.Schema<GetPersonalAccessTokenMetadataResponse>;
export interface ListAccessControlRulesRequest {
  OrganizationId: string;
}
export const ListAccessControlRulesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OrganizationId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListAccessControlRulesRequest",
}) as any as S.Schema<ListAccessControlRulesRequest>;
export type AccessControlRuleDescription = string;
export type IpRange = string;
export type IpRangeList = string[];
export const IpRangeList = /*@__PURE__*/ S.Array(S.String);
export type ActionsList = string[];
export const ActionsList = /*@__PURE__*/ S.Array(S.String);
export type UserIdList = string[];
export const UserIdList = /*@__PURE__*/ S.Array(S.String);
export type ImpersonationRoleIdList = string[];
export const ImpersonationRoleIdList = /*@__PURE__*/ S.Array(S.String);
export interface AccessControlRule {
  Name?: string;
  Effect?: AccessControlRuleEffect;
  Description?: string;
  IpRanges?: string[];
  NotIpRanges?: string[];
  Actions?: string[];
  NotActions?: string[];
  UserIds?: string[];
  NotUserIds?: string[];
  DateCreated?: Date;
  DateModified?: Date;
  ImpersonationRoleIds?: string[];
  NotImpersonationRoleIds?: string[];
}
export const AccessControlRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Effect: S.optional(AccessControlRuleEffect),
    Description: S.optional(S.String),
    IpRanges: S.optional(IpRangeList),
    NotIpRanges: S.optional(IpRangeList),
    Actions: S.optional(ActionsList),
    NotActions: S.optional(ActionsList),
    UserIds: S.optional(UserIdList),
    NotUserIds: S.optional(UserIdList),
    DateCreated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DateModified: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ImpersonationRoleIds: S.optional(ImpersonationRoleIdList),
    NotImpersonationRoleIds: S.optional(ImpersonationRoleIdList),
  }),
).annotate({
  identifier: "AccessControlRule",
}) as any as S.Schema<AccessControlRule>;
export type AccessControlRulesList = AccessControlRule[];
export const AccessControlRulesList = /*@__PURE__*/ S.Array(AccessControlRule);
export interface ListAccessControlRulesResponse {
  Rules?: AccessControlRule[];
}
export const ListAccessControlRulesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Rules: S.optional(AccessControlRulesList) }),
).annotate({
  identifier: "ListAccessControlRulesResponse",
}) as any as S.Schema<ListAccessControlRulesResponse>;
export type NextToken = string;
export type MaxResults = number;
export interface ListAliasesRequest {
  OrganizationId: string;
  EntityId: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListAliasesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OrganizationId: S.String,
    EntityId: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListAliasesRequest",
}) as any as S.Schema<ListAliasesRequest>;
export type Aliases = string[];
export const Aliases = /*@__PURE__*/ S.Array(S.String);
export interface ListAliasesResponse {
  Aliases?: string[];
  NextToken?: string;
}
export const ListAliasesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Aliases: S.optional(Aliases), NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListAliasesResponse",
}) as any as S.Schema<ListAliasesResponse>;
export interface ListAvailabilityConfigurationsRequest {
  OrganizationId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListAvailabilityConfigurationsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      OrganizationId: S.String,
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "ListAvailabilityConfigurationsRequest",
}) as any as S.Schema<ListAvailabilityConfigurationsRequest>;
export type AvailabilityProviderType = "EWS" | "LAMBDA" | (string & {});
export const AvailabilityProviderType = /*@__PURE__*/ S.String;

export interface RedactedEwsAvailabilityProvider {
  EwsEndpoint?: string;
  EwsUsername?: string;
}
export const RedactedEwsAvailabilityProvider = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EwsEndpoint: S.optional(S.String),
    EwsUsername: S.optional(S.String),
  }),
).annotate({
  identifier: "RedactedEwsAvailabilityProvider",
}) as any as S.Schema<RedactedEwsAvailabilityProvider>;
export interface AvailabilityConfiguration {
  DomainName?: string;
  ProviderType?: AvailabilityProviderType;
  EwsProvider?: RedactedEwsAvailabilityProvider;
  LambdaProvider?: LambdaAvailabilityProvider;
  DateCreated?: Date;
  DateModified?: Date;
}
export const AvailabilityConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.optional(S.String),
    ProviderType: S.optional(AvailabilityProviderType),
    EwsProvider: S.optional(RedactedEwsAvailabilityProvider),
    LambdaProvider: S.optional(LambdaAvailabilityProvider),
    DateCreated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DateModified: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "AvailabilityConfiguration",
}) as any as S.Schema<AvailabilityConfiguration>;
export type AvailabilityConfigurationList = AvailabilityConfiguration[];
export const AvailabilityConfigurationList = /*@__PURE__*/ S.Array(
  AvailabilityConfiguration,
);
export interface ListAvailabilityConfigurationsResponse {
  AvailabilityConfigurations?: AvailabilityConfiguration[];
  NextToken?: string;
}
export const ListAvailabilityConfigurationsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AvailabilityConfigurations: S.optional(AvailabilityConfigurationList),
      NextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListAvailabilityConfigurationsResponse",
}) as any as S.Schema<ListAvailabilityConfigurationsResponse>;
export interface ListGroupMembersRequest {
  OrganizationId: string;
  GroupId: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListGroupMembersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OrganizationId: S.String,
    GroupId: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListGroupMembersRequest",
}) as any as S.Schema<ListGroupMembersRequest>;
export type MemberType = "GROUP" | "USER" | (string & {});
export const MemberType = /*@__PURE__*/ S.String;

export interface Member {
  Id?: string;
  Name?: string;
  Type?: MemberType;
  State?: EntityState;
  EnabledDate?: Date;
  DisabledDate?: Date;
}
export const Member = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Type: S.optional(MemberType),
    State: S.optional(EntityState),
    EnabledDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DisabledDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "Member" }) as any as S.Schema<Member>;
export type Members = Member[];
export const Members = /*@__PURE__*/ S.Array(Member);
export interface ListGroupMembersResponse {
  Members?: Member[];
  NextToken?: string;
}
export const ListGroupMembersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Members: S.optional(Members), NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListGroupMembersResponse",
}) as any as S.Schema<ListGroupMembersResponse>;
export interface ListGroupsFilters {
  NamePrefix?: string;
  PrimaryEmailPrefix?: string;
  State?: EntityState;
}
export const ListGroupsFilters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NamePrefix: S.optional(S.String),
    PrimaryEmailPrefix: S.optional(S.String),
    State: S.optional(EntityState),
  }),
).annotate({
  identifier: "ListGroupsFilters",
}) as any as S.Schema<ListGroupsFilters>;
export interface ListGroupsRequest {
  OrganizationId: string;
  NextToken?: string;
  MaxResults?: number;
  Filters?: ListGroupsFilters;
}
export const ListGroupsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OrganizationId: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    Filters: S.optional(ListGroupsFilters),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListGroupsRequest",
}) as any as S.Schema<ListGroupsRequest>;
export interface Group {
  Id?: string;
  Email?: string;
  Name?: string;
  State?: EntityState;
  EnabledDate?: Date;
  DisabledDate?: Date;
}
export const Group = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Email: S.optional(S.String),
    Name: S.optional(S.String),
    State: S.optional(EntityState),
    EnabledDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DisabledDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "Group" }) as any as S.Schema<Group>;
export type Groups = Group[];
export const Groups = /*@__PURE__*/ S.Array(Group);
export interface ListGroupsResponse {
  Groups?: Group[];
  NextToken?: string;
}
export const ListGroupsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Groups: S.optional(Groups), NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListGroupsResponse",
}) as any as S.Schema<ListGroupsResponse>;
export interface ListGroupsForEntityFilters {
  GroupNamePrefix?: string;
}
export const ListGroupsForEntityFilters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GroupNamePrefix: S.optional(S.String) }),
).annotate({
  identifier: "ListGroupsForEntityFilters",
}) as any as S.Schema<ListGroupsForEntityFilters>;
export interface ListGroupsForEntityRequest {
  OrganizationId: string;
  EntityId: string;
  Filters?: ListGroupsForEntityFilters;
  NextToken?: string;
  MaxResults?: number;
}
export const ListGroupsForEntityRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OrganizationId: S.String,
    EntityId: S.String,
    Filters: S.optional(ListGroupsForEntityFilters),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListGroupsForEntityRequest",
}) as any as S.Schema<ListGroupsForEntityRequest>;
export interface GroupIdentifier {
  GroupId?: string;
  GroupName?: string;
}
export const GroupIdentifier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GroupId: S.optional(S.String), GroupName: S.optional(S.String) }),
).annotate({
  identifier: "GroupIdentifier",
}) as any as S.Schema<GroupIdentifier>;
export type GroupIdentifiers = GroupIdentifier[];
export const GroupIdentifiers = /*@__PURE__*/ S.Array(GroupIdentifier);
export interface ListGroupsForEntityResponse {
  Groups?: GroupIdentifier[];
  NextToken?: string;
}
export const ListGroupsForEntityResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Groups: S.optional(GroupIdentifiers),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListGroupsForEntityResponse",
}) as any as S.Schema<ListGroupsForEntityResponse>;
export interface ListImpersonationRolesRequest {
  OrganizationId: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListImpersonationRolesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OrganizationId: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListImpersonationRolesRequest",
}) as any as S.Schema<ListImpersonationRolesRequest>;
export interface ImpersonationRole {
  ImpersonationRoleId?: string;
  Name?: string;
  Type?: ImpersonationRoleType;
  DateCreated?: Date;
  DateModified?: Date;
}
export const ImpersonationRole = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ImpersonationRoleId: S.optional(S.String),
    Name: S.optional(S.String),
    Type: S.optional(ImpersonationRoleType),
    DateCreated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DateModified: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "ImpersonationRole",
}) as any as S.Schema<ImpersonationRole>;
export type ImpersonationRoleList = ImpersonationRole[];
export const ImpersonationRoleList = /*@__PURE__*/ S.Array(ImpersonationRole);
export interface ListImpersonationRolesResponse {
  Roles?: ImpersonationRole[];
  NextToken?: string;
}
export const ListImpersonationRolesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Roles: S.optional(ImpersonationRoleList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListImpersonationRolesResponse",
}) as any as S.Schema<ListImpersonationRolesResponse>;
export interface ListMailboxExportJobsRequest {
  OrganizationId: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListMailboxExportJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OrganizationId: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListMailboxExportJobsRequest",
}) as any as S.Schema<ListMailboxExportJobsRequest>;
export interface MailboxExportJob {
  JobId?: string;
  EntityId?: string;
  Description?: string;
  S3BucketName?: string;
  S3Path?: string;
  EstimatedProgress?: number;
  State?: MailboxExportJobState;
  StartTime?: Date;
  EndTime?: Date;
}
export const MailboxExportJob = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobId: S.optional(S.String),
    EntityId: S.optional(S.String),
    Description: S.optional(S.String),
    S3BucketName: S.optional(S.String),
    S3Path: S.optional(S.String),
    EstimatedProgress: S.optional(S.Number),
    State: S.optional(MailboxExportJobState),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "MailboxExportJob",
}) as any as S.Schema<MailboxExportJob>;
export type Jobs = MailboxExportJob[];
export const Jobs = /*@__PURE__*/ S.Array(MailboxExportJob);
export interface ListMailboxExportJobsResponse {
  Jobs?: MailboxExportJob[];
  NextToken?: string;
}
export const ListMailboxExportJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Jobs: S.optional(Jobs), NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListMailboxExportJobsResponse",
}) as any as S.Schema<ListMailboxExportJobsResponse>;
export interface ListMailboxPermissionsRequest {
  OrganizationId: string;
  EntityId: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListMailboxPermissionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OrganizationId: S.String,
    EntityId: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListMailboxPermissionsRequest",
}) as any as S.Schema<ListMailboxPermissionsRequest>;
export type PermissionType =
  | "FULL_ACCESS"
  | "SEND_AS"
  | "SEND_ON_BEHALF"
  | (string & {});
export const PermissionType = /*@__PURE__*/ S.String;

export type PermissionValues = PermissionType[];
export const PermissionValues = /*@__PURE__*/ S.Array(PermissionType);
export interface Permission {
  GranteeId: string;
  GranteeType: MemberType;
  PermissionValues: PermissionType[];
}
export const Permission = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GranteeId: S.String,
    GranteeType: MemberType,
    PermissionValues: PermissionValues,
  }),
).annotate({ identifier: "Permission" }) as any as S.Schema<Permission>;
export type Permissions = Permission[];
export const Permissions = /*@__PURE__*/ S.Array(Permission);
export interface ListMailboxPermissionsResponse {
  Permissions?: Permission[];
  NextToken?: string;
}
export const ListMailboxPermissionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Permissions: S.optional(Permissions),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListMailboxPermissionsResponse",
}) as any as S.Schema<ListMailboxPermissionsResponse>;
export interface ListMailDomainsRequest {
  OrganizationId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListMailDomainsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OrganizationId: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListMailDomainsRequest",
}) as any as S.Schema<ListMailDomainsRequest>;
export interface MailDomainSummary {
  DomainName?: string;
  DefaultDomain?: boolean;
}
export const MailDomainSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.optional(S.String),
    DefaultDomain: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "MailDomainSummary",
}) as any as S.Schema<MailDomainSummary>;
export type MailDomains = MailDomainSummary[];
export const MailDomains = /*@__PURE__*/ S.Array(MailDomainSummary);
export interface ListMailDomainsResponse {
  MailDomains?: MailDomainSummary[];
  NextToken?: string;
}
export const ListMailDomainsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MailDomains: S.optional(MailDomains),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListMailDomainsResponse",
}) as any as S.Schema<ListMailDomainsResponse>;
export interface ListMobileDeviceAccessOverridesRequest {
  OrganizationId: string;
  UserId?: string;
  DeviceId?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListMobileDeviceAccessOverridesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      OrganizationId: S.String,
      UserId: S.optional(S.String),
      DeviceId: S.optional(S.String),
      NextToken: S.optional(S.String),
      MaxResults: S.optional(S.Number),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "ListMobileDeviceAccessOverridesRequest",
}) as any as S.Schema<ListMobileDeviceAccessOverridesRequest>;
export interface MobileDeviceAccessOverride {
  UserId?: string;
  DeviceId?: string;
  Effect?: MobileDeviceAccessRuleEffect;
  Description?: string;
  DateCreated?: Date;
  DateModified?: Date;
}
export const MobileDeviceAccessOverride = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserId: S.optional(S.String),
    DeviceId: S.optional(S.String),
    Effect: S.optional(MobileDeviceAccessRuleEffect),
    Description: S.optional(S.String),
    DateCreated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DateModified: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "MobileDeviceAccessOverride",
}) as any as S.Schema<MobileDeviceAccessOverride>;
export type MobileDeviceAccessOverridesList = MobileDeviceAccessOverride[];
export const MobileDeviceAccessOverridesList = /*@__PURE__*/ S.Array(
  MobileDeviceAccessOverride,
);
export interface ListMobileDeviceAccessOverridesResponse {
  Overrides?: MobileDeviceAccessOverride[];
  NextToken?: string;
}
export const ListMobileDeviceAccessOverridesResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Overrides: S.optional(MobileDeviceAccessOverridesList),
      NextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListMobileDeviceAccessOverridesResponse",
}) as any as S.Schema<ListMobileDeviceAccessOverridesResponse>;
export interface ListMobileDeviceAccessRulesRequest {
  OrganizationId: string;
}
export const ListMobileDeviceAccessRulesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OrganizationId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListMobileDeviceAccessRulesRequest",
}) as any as S.Schema<ListMobileDeviceAccessRulesRequest>;
export interface MobileDeviceAccessRule {
  MobileDeviceAccessRuleId?: string;
  Name?: string;
  Description?: string;
  Effect?: MobileDeviceAccessRuleEffect;
  DeviceTypes?: string[];
  NotDeviceTypes?: string[];
  DeviceModels?: string[];
  NotDeviceModels?: string[];
  DeviceOperatingSystems?: string[];
  NotDeviceOperatingSystems?: string[];
  DeviceUserAgents?: string[];
  NotDeviceUserAgents?: string[];
  DateCreated?: Date;
  DateModified?: Date;
}
export const MobileDeviceAccessRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MobileDeviceAccessRuleId: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    Effect: S.optional(MobileDeviceAccessRuleEffect),
    DeviceTypes: S.optional(DeviceTypeList),
    NotDeviceTypes: S.optional(DeviceTypeList),
    DeviceModels: S.optional(DeviceModelList),
    NotDeviceModels: S.optional(DeviceModelList),
    DeviceOperatingSystems: S.optional(DeviceOperatingSystemList),
    NotDeviceOperatingSystems: S.optional(DeviceOperatingSystemList),
    DeviceUserAgents: S.optional(DeviceUserAgentList),
    NotDeviceUserAgents: S.optional(DeviceUserAgentList),
    DateCreated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DateModified: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "MobileDeviceAccessRule",
}) as any as S.Schema<MobileDeviceAccessRule>;
export type MobileDeviceAccessRulesList = MobileDeviceAccessRule[];
export const MobileDeviceAccessRulesList = /*@__PURE__*/ S.Array(
  MobileDeviceAccessRule,
);
export interface ListMobileDeviceAccessRulesResponse {
  Rules?: MobileDeviceAccessRule[];
}
export const ListMobileDeviceAccessRulesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Rules: S.optional(MobileDeviceAccessRulesList) }),
).annotate({
  identifier: "ListMobileDeviceAccessRulesResponse",
}) as any as S.Schema<ListMobileDeviceAccessRulesResponse>;
export interface ListOrganizationsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListOrganizationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListOrganizationsRequest",
}) as any as S.Schema<ListOrganizationsRequest>;
export interface OrganizationSummary {
  OrganizationId?: string;
  Alias?: string;
  DefaultMailDomain?: string;
  ErrorMessage?: string;
  State?: string;
}
export const OrganizationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OrganizationId: S.optional(S.String),
    Alias: S.optional(S.String),
    DefaultMailDomain: S.optional(S.String),
    ErrorMessage: S.optional(S.String),
    State: S.optional(S.String),
  }),
).annotate({
  identifier: "OrganizationSummary",
}) as any as S.Schema<OrganizationSummary>;
export type OrganizationSummaries = OrganizationSummary[];
export const OrganizationSummaries = /*@__PURE__*/ S.Array(OrganizationSummary);
export interface ListOrganizationsResponse {
  OrganizationSummaries?: OrganizationSummary[];
  NextToken?: string;
}
export const ListOrganizationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OrganizationSummaries: S.optional(OrganizationSummaries),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListOrganizationsResponse",
}) as any as S.Schema<ListOrganizationsResponse>;
export interface ListPersonalAccessTokensRequest {
  OrganizationId: string;
  UserId?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListPersonalAccessTokensRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OrganizationId: S.String,
    UserId: S.optional(S.String),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListPersonalAccessTokensRequest",
}) as any as S.Schema<ListPersonalAccessTokensRequest>;
export interface PersonalAccessTokenSummary {
  PersonalAccessTokenId?: string;
  UserId?: string;
  Name?: string;
  DateCreated?: Date;
  DateLastUsed?: Date;
  ExpiresTime?: Date;
  Scopes?: string[];
}
export const PersonalAccessTokenSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PersonalAccessTokenId: S.optional(S.String),
    UserId: S.optional(S.String),
    Name: S.optional(S.String),
    DateCreated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DateLastUsed: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ExpiresTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Scopes: S.optional(PersonalAccessTokenScopeList),
  }),
).annotate({
  identifier: "PersonalAccessTokenSummary",
}) as any as S.Schema<PersonalAccessTokenSummary>;
export type PersonalAccessTokenSummaryList = PersonalAccessTokenSummary[];
export const PersonalAccessTokenSummaryList = /*@__PURE__*/ S.Array(
  PersonalAccessTokenSummary,
);
export interface ListPersonalAccessTokensResponse {
  NextToken?: string;
  PersonalAccessTokenSummaries?: PersonalAccessTokenSummary[];
}
export const ListPersonalAccessTokensResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    PersonalAccessTokenSummaries: S.optional(PersonalAccessTokenSummaryList),
  }),
).annotate({
  identifier: "ListPersonalAccessTokensResponse",
}) as any as S.Schema<ListPersonalAccessTokensResponse>;
export interface ListResourceDelegatesRequest {
  OrganizationId: string;
  ResourceId: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListResourceDelegatesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OrganizationId: S.String,
    ResourceId: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListResourceDelegatesRequest",
}) as any as S.Schema<ListResourceDelegatesRequest>;
export interface Delegate {
  Id: string;
  Type: MemberType;
}
export const Delegate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.String, Type: MemberType }),
).annotate({ identifier: "Delegate" }) as any as S.Schema<Delegate>;
export type ResourceDelegates = Delegate[];
export const ResourceDelegates = /*@__PURE__*/ S.Array(Delegate);
export interface ListResourceDelegatesResponse {
  Delegates?: Delegate[];
  NextToken?: string;
}
export const ListResourceDelegatesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Delegates: S.optional(ResourceDelegates),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListResourceDelegatesResponse",
}) as any as S.Schema<ListResourceDelegatesResponse>;
export interface ListResourcesFilters {
  NamePrefix?: string;
  PrimaryEmailPrefix?: string;
  State?: EntityState;
}
export const ListResourcesFilters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NamePrefix: S.optional(S.String),
    PrimaryEmailPrefix: S.optional(S.String),
    State: S.optional(EntityState),
  }),
).annotate({
  identifier: "ListResourcesFilters",
}) as any as S.Schema<ListResourcesFilters>;
export interface ListResourcesRequest {
  OrganizationId: string;
  NextToken?: string;
  MaxResults?: number;
  Filters?: ListResourcesFilters;
}
export const ListResourcesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OrganizationId: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    Filters: S.optional(ListResourcesFilters),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListResourcesRequest",
}) as any as S.Schema<ListResourcesRequest>;
export interface Resource {
  Id?: string;
  Email?: string;
  Name?: string;
  Type?: ResourceType;
  State?: EntityState;
  EnabledDate?: Date;
  DisabledDate?: Date;
  Description?: string | redacted.Redacted<string>;
}
export const Resource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Email: S.optional(S.String),
    Name: S.optional(S.String),
    Type: S.optional(ResourceType),
    State: S.optional(EntityState),
    EnabledDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DisabledDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Description: S.optional(SensitiveString),
  }),
).annotate({ identifier: "Resource" }) as any as S.Schema<Resource>;
export type Resources = Resource[];
export const Resources = /*@__PURE__*/ S.Array(Resource);
export interface ListResourcesResponse {
  Resources?: Resource[];
  NextToken?: string;
}
export const ListResourcesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Resources: S.optional(Resources),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListResourcesResponse",
}) as any as S.Schema<ListResourcesResponse>;
export interface ListTagsForResourceRequest {
  ResourceARN: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.String, Value: S.String }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = /*@__PURE__*/ S.Array(Tag);
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(TagList) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export type IdentityProviderUserIdPrefix = string;
export interface ListUsersFilters {
  UsernamePrefix?: string;
  DisplayNamePrefix?: string | redacted.Redacted<string>;
  PrimaryEmailPrefix?: string;
  State?: EntityState;
  IdentityProviderUserIdPrefix?: string;
}
export const ListUsersFilters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UsernamePrefix: S.optional(S.String),
    DisplayNamePrefix: S.optional(SensitiveString),
    PrimaryEmailPrefix: S.optional(S.String),
    State: S.optional(EntityState),
    IdentityProviderUserIdPrefix: S.optional(S.String),
  }),
).annotate({
  identifier: "ListUsersFilters",
}) as any as S.Schema<ListUsersFilters>;
export interface ListUsersRequest {
  OrganizationId: string;
  NextToken?: string;
  MaxResults?: number;
  Filters?: ListUsersFilters;
}
export const ListUsersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OrganizationId: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    Filters: S.optional(ListUsersFilters),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListUsersRequest",
}) as any as S.Schema<ListUsersRequest>;
export interface User {
  Id?: string;
  Email?: string;
  Name?: string;
  DisplayName?: string;
  State?: EntityState;
  UserRole?: UserRole;
  EnabledDate?: Date;
  DisabledDate?: Date;
  IdentityProviderUserId?: string;
  IdentityProviderIdentityStoreId?: string;
}
export const User = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Email: S.optional(S.String),
    Name: S.optional(S.String),
    DisplayName: S.optional(S.String),
    State: S.optional(EntityState),
    UserRole: S.optional(UserRole),
    EnabledDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DisabledDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    IdentityProviderUserId: S.optional(S.String),
    IdentityProviderIdentityStoreId: S.optional(S.String),
  }),
).annotate({ identifier: "User" }) as any as S.Schema<User>;
export type Users = User[];
export const Users = /*@__PURE__*/ S.Array(User);
export interface ListUsersResponse {
  Users?: User[];
  NextToken?: string;
}
export const ListUsersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Users: S.optional(Users), NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListUsersResponse",
}) as any as S.Schema<ListUsersResponse>;
export interface PutAccessControlRuleRequest {
  Name: string;
  Effect: AccessControlRuleEffect;
  Description: string;
  IpRanges?: string[];
  NotIpRanges?: string[];
  Actions?: string[];
  NotActions?: string[];
  UserIds?: string[];
  NotUserIds?: string[];
  OrganizationId: string;
  ImpersonationRoleIds?: string[];
  NotImpersonationRoleIds?: string[];
}
export const PutAccessControlRuleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Effect: AccessControlRuleEffect,
    Description: S.String,
    IpRanges: S.optional(IpRangeList),
    NotIpRanges: S.optional(IpRangeList),
    Actions: S.optional(ActionsList),
    NotActions: S.optional(ActionsList),
    UserIds: S.optional(UserIdList),
    NotUserIds: S.optional(UserIdList),
    OrganizationId: S.String,
    ImpersonationRoleIds: S.optional(ImpersonationRoleIdList),
    NotImpersonationRoleIds: S.optional(ImpersonationRoleIdList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "PutAccessControlRuleRequest",
}) as any as S.Schema<PutAccessControlRuleRequest>;
export interface PutAccessControlRuleResponse {}
export const PutAccessControlRuleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutAccessControlRuleResponse",
}) as any as S.Schema<PutAccessControlRuleResponse>;
export interface PutEmailMonitoringConfigurationRequest {
  OrganizationId: string;
  RoleArn?: string;
  LogGroupArn: string;
}
export const PutEmailMonitoringConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      OrganizationId: S.String,
      RoleArn: S.optional(S.String),
      LogGroupArn: S.String,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "PutEmailMonitoringConfigurationRequest",
}) as any as S.Schema<PutEmailMonitoringConfigurationRequest>;
export interface PutEmailMonitoringConfigurationResponse {}
export const PutEmailMonitoringConfigurationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "PutEmailMonitoringConfigurationResponse",
}) as any as S.Schema<PutEmailMonitoringConfigurationResponse>;
export interface PutIdentityProviderConfigurationRequest {
  OrganizationId: string;
  AuthenticationMode: IdentityProviderAuthenticationMode;
  IdentityCenterConfiguration: IdentityCenterConfiguration;
  PersonalAccessTokenConfiguration: PersonalAccessTokenConfiguration;
}
export const PutIdentityProviderConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      OrganizationId: S.String,
      AuthenticationMode: IdentityProviderAuthenticationMode,
      IdentityCenterConfiguration: IdentityCenterConfiguration,
      PersonalAccessTokenConfiguration: PersonalAccessTokenConfiguration,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "PutIdentityProviderConfigurationRequest",
}) as any as S.Schema<PutIdentityProviderConfigurationRequest>;
export interface PutIdentityProviderConfigurationResponse {}
export const PutIdentityProviderConfigurationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "PutIdentityProviderConfigurationResponse",
}) as any as S.Schema<PutIdentityProviderConfigurationResponse>;
export interface PutInboundDmarcSettingsRequest {
  OrganizationId: string;
  Enforced: boolean;
}
export const PutInboundDmarcSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OrganizationId: S.String, Enforced: S.Boolean }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "PutInboundDmarcSettingsRequest",
}) as any as S.Schema<PutInboundDmarcSettingsRequest>;
export interface PutInboundDmarcSettingsResponse {}
export const PutInboundDmarcSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutInboundDmarcSettingsResponse",
}) as any as S.Schema<PutInboundDmarcSettingsResponse>;
export interface PutMailboxPermissionsRequest {
  OrganizationId: string;
  EntityId: string;
  GranteeId: string;
  PermissionValues: PermissionType[];
}
export const PutMailboxPermissionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OrganizationId: S.String,
    EntityId: S.String,
    GranteeId: S.String,
    PermissionValues: PermissionValues,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "PutMailboxPermissionsRequest",
}) as any as S.Schema<PutMailboxPermissionsRequest>;
export interface PutMailboxPermissionsResponse {}
export const PutMailboxPermissionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutMailboxPermissionsResponse",
}) as any as S.Schema<PutMailboxPermissionsResponse>;
export interface PutMobileDeviceAccessOverrideRequest {
  OrganizationId: string;
  UserId: string;
  DeviceId: string;
  Effect: MobileDeviceAccessRuleEffect;
  Description?: string;
}
export const PutMobileDeviceAccessOverrideRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      OrganizationId: S.String,
      UserId: S.String,
      DeviceId: S.String,
      Effect: MobileDeviceAccessRuleEffect,
      Description: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "PutMobileDeviceAccessOverrideRequest",
}) as any as S.Schema<PutMobileDeviceAccessOverrideRequest>;
export interface PutMobileDeviceAccessOverrideResponse {}
export const PutMobileDeviceAccessOverrideResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "PutMobileDeviceAccessOverrideResponse",
}) as any as S.Schema<PutMobileDeviceAccessOverrideResponse>;
export type PolicyDescription = string | redacted.Redacted<string>;
export interface PutRetentionPolicyRequest {
  OrganizationId: string;
  Id?: string;
  Name: string;
  Description?: string | redacted.Redacted<string>;
  FolderConfigurations: FolderConfiguration[];
}
export const PutRetentionPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OrganizationId: S.String,
    Id: S.optional(S.String),
    Name: S.String,
    Description: S.optional(SensitiveString),
    FolderConfigurations: FolderConfigurations,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "PutRetentionPolicyRequest",
}) as any as S.Schema<PutRetentionPolicyRequest>;
export interface PutRetentionPolicyResponse {}
export const PutRetentionPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutRetentionPolicyResponse",
}) as any as S.Schema<PutRetentionPolicyResponse>;
export interface RegisterMailDomainRequest {
  ClientToken?: string;
  OrganizationId: string;
  DomainName: string;
}
export const RegisterMailDomainRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    OrganizationId: S.String,
    DomainName: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "RegisterMailDomainRequest",
}) as any as S.Schema<RegisterMailDomainRequest>;
export interface RegisterMailDomainResponse {}
export const RegisterMailDomainResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "RegisterMailDomainResponse",
}) as any as S.Schema<RegisterMailDomainResponse>;
export interface RegisterToWorkMailRequest {
  OrganizationId: string;
  EntityId: string;
  Email: string;
}
export const RegisterToWorkMailRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OrganizationId: S.String,
    EntityId: S.String,
    Email: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "RegisterToWorkMailRequest",
}) as any as S.Schema<RegisterToWorkMailRequest>;
export interface RegisterToWorkMailResponse {}
export const RegisterToWorkMailResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "RegisterToWorkMailResponse",
}) as any as S.Schema<RegisterToWorkMailResponse>;
export interface ResetPasswordRequest {
  OrganizationId: string;
  UserId: string;
  Password: string | redacted.Redacted<string>;
}
export const ResetPasswordRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OrganizationId: S.String,
    UserId: S.String,
    Password: SensitiveString,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ResetPasswordRequest",
}) as any as S.Schema<ResetPasswordRequest>;
export interface ResetPasswordResponse {}
export const ResetPasswordResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "ResetPasswordResponse",
}) as any as S.Schema<ResetPasswordResponse>;
export interface StartMailboxExportJobRequest {
  ClientToken: string;
  OrganizationId: string;
  EntityId: string;
  Description?: string;
  RoleArn: string;
  KmsKeyArn: string;
  S3BucketName: string;
  S3Prefix: string;
}
export const StartMailboxExportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientToken: S.String.pipe(T.IdempotencyToken()),
    OrganizationId: S.String,
    EntityId: S.String,
    Description: S.optional(S.String),
    RoleArn: S.String,
    KmsKeyArn: S.String,
    S3BucketName: S.String,
    S3Prefix: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartMailboxExportJobRequest",
}) as any as S.Schema<StartMailboxExportJobRequest>;
export interface StartMailboxExportJobResponse {
  JobId?: string;
}
export const StartMailboxExportJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobId: S.optional(S.String) }),
).annotate({
  identifier: "StartMailboxExportJobResponse",
}) as any as S.Schema<StartMailboxExportJobResponse>;
export interface TagResourceRequest {
  ResourceARN: string;
  Tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String, Tags: TagList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
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
export interface TestAvailabilityConfigurationRequest {
  OrganizationId: string;
  DomainName?: string;
  EwsProvider?: EwsAvailabilityProvider;
  LambdaProvider?: LambdaAvailabilityProvider;
}
export const TestAvailabilityConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      OrganizationId: S.String,
      DomainName: S.optional(S.String),
      EwsProvider: S.optional(EwsAvailabilityProvider),
      LambdaProvider: S.optional(LambdaAvailabilityProvider),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "TestAvailabilityConfigurationRequest",
}) as any as S.Schema<TestAvailabilityConfigurationRequest>;
export interface TestAvailabilityConfigurationResponse {
  TestPassed?: boolean;
  FailureReason?: string;
}
export const TestAvailabilityConfigurationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      TestPassed: S.optional(S.Boolean),
      FailureReason: S.optional(S.String),
    }),
).annotate({
  identifier: "TestAvailabilityConfigurationResponse",
}) as any as S.Schema<TestAvailabilityConfigurationResponse>;
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  ResourceARN: string;
  TagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String, TagKeys: TagKeyList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
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
export interface UpdateAvailabilityConfigurationRequest {
  OrganizationId: string;
  DomainName: string;
  EwsProvider?: EwsAvailabilityProvider;
  LambdaProvider?: LambdaAvailabilityProvider;
}
export const UpdateAvailabilityConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      OrganizationId: S.String,
      DomainName: S.String,
      EwsProvider: S.optional(EwsAvailabilityProvider),
      LambdaProvider: S.optional(LambdaAvailabilityProvider),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "UpdateAvailabilityConfigurationRequest",
}) as any as S.Schema<UpdateAvailabilityConfigurationRequest>;
export interface UpdateAvailabilityConfigurationResponse {}
export const UpdateAvailabilityConfigurationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "UpdateAvailabilityConfigurationResponse",
}) as any as S.Schema<UpdateAvailabilityConfigurationResponse>;
export interface UpdateDefaultMailDomainRequest {
  OrganizationId: string;
  DomainName: string;
}
export const UpdateDefaultMailDomainRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OrganizationId: S.String, DomainName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateDefaultMailDomainRequest",
}) as any as S.Schema<UpdateDefaultMailDomainRequest>;
export interface UpdateDefaultMailDomainResponse {}
export const UpdateDefaultMailDomainResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateDefaultMailDomainResponse",
}) as any as S.Schema<UpdateDefaultMailDomainResponse>;
export interface UpdateGroupRequest {
  OrganizationId: string;
  GroupId: string;
  HiddenFromGlobalAddressList?: boolean;
}
export const UpdateGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OrganizationId: S.String,
    GroupId: S.String,
    HiddenFromGlobalAddressList: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateGroupRequest",
}) as any as S.Schema<UpdateGroupRequest>;
export interface UpdateGroupResponse {}
export const UpdateGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateGroupResponse",
}) as any as S.Schema<UpdateGroupResponse>;
export interface UpdateImpersonationRoleRequest {
  OrganizationId: string;
  ImpersonationRoleId: string;
  Name: string;
  Type: ImpersonationRoleType;
  Description?: string;
  Rules: ImpersonationRule[];
}
export const UpdateImpersonationRoleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OrganizationId: S.String,
    ImpersonationRoleId: S.String,
    Name: S.String,
    Type: ImpersonationRoleType,
    Description: S.optional(S.String),
    Rules: ImpersonationRuleList,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateImpersonationRoleRequest",
}) as any as S.Schema<UpdateImpersonationRoleRequest>;
export interface UpdateImpersonationRoleResponse {}
export const UpdateImpersonationRoleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateImpersonationRoleResponse",
}) as any as S.Schema<UpdateImpersonationRoleResponse>;
export interface UpdateMailboxQuotaRequest {
  OrganizationId: string;
  UserId: string;
  MailboxQuota: number;
}
export const UpdateMailboxQuotaRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OrganizationId: S.String,
    UserId: S.String,
    MailboxQuota: S.Number,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateMailboxQuotaRequest",
}) as any as S.Schema<UpdateMailboxQuotaRequest>;
export interface UpdateMailboxQuotaResponse {}
export const UpdateMailboxQuotaResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateMailboxQuotaResponse",
}) as any as S.Schema<UpdateMailboxQuotaResponse>;
export interface UpdateMobileDeviceAccessRuleRequest {
  OrganizationId: string;
  MobileDeviceAccessRuleId: string;
  Name: string;
  Description?: string;
  Effect: MobileDeviceAccessRuleEffect;
  DeviceTypes?: string[];
  NotDeviceTypes?: string[];
  DeviceModels?: string[];
  NotDeviceModels?: string[];
  DeviceOperatingSystems?: string[];
  NotDeviceOperatingSystems?: string[];
  DeviceUserAgents?: string[];
  NotDeviceUserAgents?: string[];
}
export const UpdateMobileDeviceAccessRuleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OrganizationId: S.String,
    MobileDeviceAccessRuleId: S.String,
    Name: S.String,
    Description: S.optional(S.String),
    Effect: MobileDeviceAccessRuleEffect,
    DeviceTypes: S.optional(DeviceTypeList),
    NotDeviceTypes: S.optional(DeviceTypeList),
    DeviceModels: S.optional(DeviceModelList),
    NotDeviceModels: S.optional(DeviceModelList),
    DeviceOperatingSystems: S.optional(DeviceOperatingSystemList),
    NotDeviceOperatingSystems: S.optional(DeviceOperatingSystemList),
    DeviceUserAgents: S.optional(DeviceUserAgentList),
    NotDeviceUserAgents: S.optional(DeviceUserAgentList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateMobileDeviceAccessRuleRequest",
}) as any as S.Schema<UpdateMobileDeviceAccessRuleRequest>;
export interface UpdateMobileDeviceAccessRuleResponse {}
export const UpdateMobileDeviceAccessRuleResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "UpdateMobileDeviceAccessRuleResponse",
}) as any as S.Schema<UpdateMobileDeviceAccessRuleResponse>;
export interface UpdatePrimaryEmailAddressRequest {
  OrganizationId: string;
  EntityId: string;
  Email: string;
}
export const UpdatePrimaryEmailAddressRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OrganizationId: S.String,
    EntityId: S.String,
    Email: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdatePrimaryEmailAddressRequest",
}) as any as S.Schema<UpdatePrimaryEmailAddressRequest>;
export interface UpdatePrimaryEmailAddressResponse {}
export const UpdatePrimaryEmailAddressResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdatePrimaryEmailAddressResponse",
}) as any as S.Schema<UpdatePrimaryEmailAddressResponse>;
export type NewResourceDescription = string | redacted.Redacted<string>;
export interface UpdateResourceRequest {
  OrganizationId: string;
  ResourceId: string;
  Name?: string;
  BookingOptions?: BookingOptions;
  Description?: string | redacted.Redacted<string>;
  Type?: ResourceType;
  HiddenFromGlobalAddressList?: boolean;
}
export const UpdateResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OrganizationId: S.String,
    ResourceId: S.String,
    Name: S.optional(S.String),
    BookingOptions: S.optional(BookingOptions),
    Description: S.optional(SensitiveString),
    Type: S.optional(ResourceType),
    HiddenFromGlobalAddressList: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateResourceRequest",
}) as any as S.Schema<UpdateResourceRequest>;
export interface UpdateResourceResponse {}
export const UpdateResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateResourceResponse",
}) as any as S.Schema<UpdateResourceResponse>;
export type IdentityProviderUserIdForUpdate = string;
export interface UpdateUserRequest {
  OrganizationId: string;
  UserId: string;
  Role?: UserRole;
  DisplayName?: string | redacted.Redacted<string>;
  FirstName?: string | redacted.Redacted<string>;
  LastName?: string | redacted.Redacted<string>;
  HiddenFromGlobalAddressList?: boolean;
  Initials?: string | redacted.Redacted<string>;
  Telephone?: string | redacted.Redacted<string>;
  Street?: string | redacted.Redacted<string>;
  JobTitle?: string | redacted.Redacted<string>;
  City?: string | redacted.Redacted<string>;
  Company?: string | redacted.Redacted<string>;
  ZipCode?: string | redacted.Redacted<string>;
  Department?: string | redacted.Redacted<string>;
  Country?: string | redacted.Redacted<string>;
  Office?: string | redacted.Redacted<string>;
  IdentityProviderUserId?: string;
}
export const UpdateUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OrganizationId: S.String,
    UserId: S.String,
    Role: S.optional(UserRole),
    DisplayName: S.optional(SensitiveString),
    FirstName: S.optional(SensitiveString),
    LastName: S.optional(SensitiveString),
    HiddenFromGlobalAddressList: S.optional(S.Boolean),
    Initials: S.optional(SensitiveString),
    Telephone: S.optional(SensitiveString),
    Street: S.optional(SensitiveString),
    JobTitle: S.optional(SensitiveString),
    City: S.optional(SensitiveString),
    Company: S.optional(SensitiveString),
    ZipCode: S.optional(SensitiveString),
    Department: S.optional(SensitiveString),
    Country: S.optional(SensitiveString),
    Office: S.optional(SensitiveString),
    IdentityProviderUserId: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateUserRequest",
}) as any as S.Schema<UpdateUserRequest>;
export interface UpdateUserResponse {}
export const UpdateUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateUserResponse",
}) as any as S.Schema<UpdateUserResponse>;
export type AssociateDelegateToResourceError =
  | EntityNotFoundException
  | EntityStateException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Adds a member (user or group) to the resource's set of delegates.
 */
export const associateDelegateToResource: API.OperationMethod<
  AssociateDelegateToResourceRequest,
  AssociateDelegateToResourceResponse,
  AssociateDelegateToResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateDelegateToResourceRequest,
  output: AssociateDelegateToResourceResponse,
  errors: [
    EntityNotFoundException,
    EntityStateException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateDelegateToResource",
}));

export type AssociateMemberToGroupError =
  | DirectoryServiceAuthenticationFailedException
  | DirectoryUnavailableException
  | EntityNotFoundException
  | EntityStateException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Adds a member (user or group) to the group's set.
 */
export const associateMemberToGroup: API.OperationMethod<
  AssociateMemberToGroupRequest,
  AssociateMemberToGroupResponse,
  AssociateMemberToGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateMemberToGroupRequest,
  output: AssociateMemberToGroupResponse,
  errors: [
    DirectoryServiceAuthenticationFailedException,
    DirectoryUnavailableException,
    EntityNotFoundException,
    EntityStateException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateMemberToGroup",
}));

export type AssumeImpersonationRoleError =
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Assumes an impersonation role for the given WorkMail organization. This method returns an
 * authentication token you can use to make impersonated calls.
 */
export const assumeImpersonationRole: API.OperationMethod<
  AssumeImpersonationRoleRequest,
  AssumeImpersonationRoleResponse,
  AssumeImpersonationRoleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssumeImpersonationRoleRequest,
  output: AssumeImpersonationRoleResponse,
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssumeImpersonationRole",
}));

export type CancelMailboxExportJobError =
  | EntityNotFoundException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Cancels a mailbox export job.
 *
 * If the mailbox export job is near completion, it might not be possible to cancel
 * it.
 */
export const cancelMailboxExportJob: API.OperationMethod<
  CancelMailboxExportJobRequest,
  CancelMailboxExportJobResponse,
  CancelMailboxExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelMailboxExportJobRequest,
  output: CancelMailboxExportJobResponse,
  errors: [
    EntityNotFoundException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelMailboxExportJob",
}));

export type CreateAliasError =
  | EmailAddressInUseException
  | EntityNotFoundException
  | EntityStateException
  | InvalidParameterException
  | LimitExceededException
  | MailDomainNotFoundException
  | MailDomainStateException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Adds an alias to the set of a given member (user or group) of WorkMail.
 */
export const createAlias: API.OperationMethod<
  CreateAliasRequest,
  CreateAliasResponse,
  CreateAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAliasRequest,
  output: CreateAliasResponse,
  errors: [
    EmailAddressInUseException,
    EntityNotFoundException,
    EntityStateException,
    InvalidParameterException,
    LimitExceededException,
    MailDomainNotFoundException,
    MailDomainStateException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAlias",
}));

export type CreateAvailabilityConfigurationError =
  | InvalidParameterException
  | LimitExceededException
  | NameAvailabilityException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Creates an `AvailabilityConfiguration` for the given WorkMail organization and domain.
 */
export const createAvailabilityConfiguration: API.OperationMethod<
  CreateAvailabilityConfigurationRequest,
  CreateAvailabilityConfigurationResponse,
  CreateAvailabilityConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAvailabilityConfigurationRequest,
  output: CreateAvailabilityConfigurationResponse,
  errors: [
    InvalidParameterException,
    LimitExceededException,
    NameAvailabilityException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAvailabilityConfiguration",
}));

export type CreateGroupError =
  | DirectoryServiceAuthenticationFailedException
  | DirectoryUnavailableException
  | InvalidParameterException
  | NameAvailabilityException
  | OrganizationNotFoundException
  | OrganizationStateException
  | ReservedNameException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Creates a group that can be used in WorkMail by calling the RegisterToWorkMail operation.
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
    DirectoryServiceAuthenticationFailedException,
    DirectoryUnavailableException,
    InvalidParameterException,
    NameAvailabilityException,
    OrganizationNotFoundException,
    OrganizationStateException,
    ReservedNameException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGroup",
}));

export type CreateIdentityCenterApplicationError =
  | InvalidParameterException
  | CommonErrors;
/**
 * Creates the WorkMail application in IAM Identity Center that can be used later in the WorkMail - IdC integration. For more information, see PutIdentityProviderConfiguration. This action does not affect the authentication settings for any WorkMail organizations.
 */
export const createIdentityCenterApplication: API.OperationMethod<
  CreateIdentityCenterApplicationRequest,
  CreateIdentityCenterApplicationResponse,
  CreateIdentityCenterApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateIdentityCenterApplicationRequest,
  output: CreateIdentityCenterApplicationResponse,
  errors: [InvalidParameterException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIdentityCenterApplication",
}));

export type CreateImpersonationRoleError =
  | EntityNotFoundException
  | EntityStateException
  | InvalidParameterException
  | LimitExceededException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Creates an impersonation role for the given WorkMail organization.
 *
 * *Idempotency* ensures that an API request completes no more than one
 * time. With an idempotent request, if the original request completes successfully, any
 * subsequent retries also complete successfully without performing any further
 * actions.
 */
export const createImpersonationRole: API.OperationMethod<
  CreateImpersonationRoleRequest,
  CreateImpersonationRoleResponse,
  CreateImpersonationRoleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateImpersonationRoleRequest,
  output: CreateImpersonationRoleResponse,
  errors: [
    EntityNotFoundException,
    EntityStateException,
    InvalidParameterException,
    LimitExceededException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateImpersonationRole",
}));

export type CreateMobileDeviceAccessRuleError =
  | InvalidParameterException
  | LimitExceededException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Creates a new mobile device access rule for the specified WorkMail organization.
 */
export const createMobileDeviceAccessRule: API.OperationMethod<
  CreateMobileDeviceAccessRuleRequest,
  CreateMobileDeviceAccessRuleResponse,
  CreateMobileDeviceAccessRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateMobileDeviceAccessRuleRequest,
  output: CreateMobileDeviceAccessRuleResponse,
  errors: [
    InvalidParameterException,
    LimitExceededException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMobileDeviceAccessRule",
}));

export type CreateOrganizationError =
  | DirectoryInUseException
  | DirectoryUnavailableException
  | InvalidParameterException
  | LimitExceededException
  | NameAvailabilityException
  | CommonErrors;
/**
 * Creates a new WorkMail organization. Optionally, you can choose to associate an existing AWS Directory Service directory with your organization. If an AWS Directory Service directory ID is specified, the organization alias must match the directory alias. If you choose not to associate an existing directory with your organization, then we create a new WorkMail directory for you. For more information, see Adding an organization in the *WorkMail Administrator Guide*.
 *
 * You can associate multiple email domains with an organization, then choose your
 * default email domain from the WorkMail console. You can also associate a domain that is managed
 * in an Amazon Route 53 public hosted zone. For more information, see Adding a
 * domain and Choosing the default domain
 * in the *WorkMail Administrator Guide*.
 *
 * Optionally, you can use a customer managed key from AWS Key Management Service (AWS
 * KMS) to encrypt email for your organization. If you don't associate an AWS KMS key, WorkMail
 * creates a default, AWS managed key for you.
 */
export const createOrganization: API.OperationMethod<
  CreateOrganizationRequest,
  CreateOrganizationResponse,
  CreateOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateOrganizationRequest,
  output: CreateOrganizationResponse,
  errors: [
    DirectoryInUseException,
    DirectoryUnavailableException,
    InvalidParameterException,
    LimitExceededException,
    NameAvailabilityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateOrganization",
}));

export type CreateResourceError =
  | DirectoryServiceAuthenticationFailedException
  | DirectoryUnavailableException
  | InvalidParameterException
  | NameAvailabilityException
  | OrganizationNotFoundException
  | OrganizationStateException
  | ReservedNameException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Creates a new WorkMail resource.
 */
export const createResource: API.OperationMethod<
  CreateResourceRequest,
  CreateResourceResponse,
  CreateResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateResourceRequest,
  output: CreateResourceResponse,
  errors: [
    DirectoryServiceAuthenticationFailedException,
    DirectoryUnavailableException,
    InvalidParameterException,
    NameAvailabilityException,
    OrganizationNotFoundException,
    OrganizationStateException,
    ReservedNameException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateResource",
}));

export type CreateUserError =
  | DirectoryServiceAuthenticationFailedException
  | DirectoryUnavailableException
  | InvalidParameterException
  | InvalidPasswordException
  | NameAvailabilityException
  | OrganizationNotFoundException
  | OrganizationStateException
  | ReservedNameException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Creates a user who can be used in WorkMail by calling the RegisterToWorkMail operation.
 */
export const createUser: API.OperationMethod<
  CreateUserRequest,
  CreateUserResponse,
  CreateUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateUserRequest,
  output: CreateUserResponse,
  errors: [
    DirectoryServiceAuthenticationFailedException,
    DirectoryUnavailableException,
    InvalidParameterException,
    InvalidPasswordException,
    NameAvailabilityException,
    OrganizationNotFoundException,
    OrganizationStateException,
    ReservedNameException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUser",
}));

export type DeleteAccessControlRuleError =
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Deletes an access control rule for the specified WorkMail organization.
 *
 * Deleting already deleted and non-existing rules does not produce an error. In those cases, the service sends back an HTTP 200 response with an empty HTTP body.
 */
export const deleteAccessControlRule: API.OperationMethod<
  DeleteAccessControlRuleRequest,
  DeleteAccessControlRuleResponse,
  DeleteAccessControlRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAccessControlRuleRequest,
  output: DeleteAccessControlRuleResponse,
  errors: [OrganizationNotFoundException, OrganizationStateException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccessControlRule",
}));

export type DeleteAliasError =
  | EntityNotFoundException
  | EntityStateException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Remove one or more specified aliases from a set of aliases for a given
 * user.
 */
export const deleteAlias: API.OperationMethod<
  DeleteAliasRequest,
  DeleteAliasResponse,
  DeleteAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAliasRequest,
  output: DeleteAliasResponse,
  errors: [
    EntityNotFoundException,
    EntityStateException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAlias",
}));

export type DeleteAvailabilityConfigurationError =
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Deletes the `AvailabilityConfiguration` for the given WorkMail organization and domain.
 */
export const deleteAvailabilityConfiguration: API.OperationMethod<
  DeleteAvailabilityConfigurationRequest,
  DeleteAvailabilityConfigurationResponse,
  DeleteAvailabilityConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAvailabilityConfigurationRequest,
  output: DeleteAvailabilityConfigurationResponse,
  errors: [OrganizationNotFoundException, OrganizationStateException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAvailabilityConfiguration",
}));

export type DeleteEmailMonitoringConfigurationError =
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Deletes the email monitoring configuration for a specified organization.
 */
export const deleteEmailMonitoringConfiguration: API.OperationMethod<
  DeleteEmailMonitoringConfigurationRequest,
  DeleteEmailMonitoringConfigurationResponse,
  DeleteEmailMonitoringConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEmailMonitoringConfigurationRequest,
  output: DeleteEmailMonitoringConfigurationResponse,
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEmailMonitoringConfiguration",
}));

export type DeleteGroupError =
  | DirectoryServiceAuthenticationFailedException
  | DirectoryUnavailableException
  | EntityStateException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Deletes a group from WorkMail.
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
    DirectoryServiceAuthenticationFailedException,
    DirectoryUnavailableException,
    EntityStateException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGroup",
}));

export type DeleteIdentityCenterApplicationError =
  | InvalidParameterException
  | OrganizationStateException
  | CommonErrors;
/**
 * Deletes the IAM Identity Center application from WorkMail. This action does not affect the authentication settings for any WorkMail organizations.
 */
export const deleteIdentityCenterApplication: API.OperationMethod<
  DeleteIdentityCenterApplicationRequest,
  DeleteIdentityCenterApplicationResponse,
  DeleteIdentityCenterApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteIdentityCenterApplicationRequest,
  output: DeleteIdentityCenterApplicationResponse,
  errors: [InvalidParameterException, OrganizationStateException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIdentityCenterApplication",
}));

export type DeleteIdentityProviderConfigurationError =
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Disables the integration between IdC and WorkMail. Authentication will continue with the directory as it was before the IdC integration. You might have to reset your directory passwords and reconfigure your desktop and mobile email clients.
 */
export const deleteIdentityProviderConfiguration: API.OperationMethod<
  DeleteIdentityProviderConfigurationRequest,
  DeleteIdentityProviderConfigurationResponse,
  DeleteIdentityProviderConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteIdentityProviderConfigurationRequest,
  output: DeleteIdentityProviderConfigurationResponse,
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIdentityProviderConfiguration",
}));

export type DeleteImpersonationRoleError =
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Deletes an impersonation role for the given WorkMail organization.
 */
export const deleteImpersonationRole: API.OperationMethod<
  DeleteImpersonationRoleRequest,
  DeleteImpersonationRoleResponse,
  DeleteImpersonationRoleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteImpersonationRoleRequest,
  output: DeleteImpersonationRoleResponse,
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteImpersonationRole",
}));

export type DeleteMailboxPermissionsError =
  | EntityNotFoundException
  | EntityStateException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Deletes permissions granted to a member (user or group).
 */
export const deleteMailboxPermissions: API.OperationMethod<
  DeleteMailboxPermissionsRequest,
  DeleteMailboxPermissionsResponse,
  DeleteMailboxPermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteMailboxPermissionsRequest,
  output: DeleteMailboxPermissionsResponse,
  errors: [
    EntityNotFoundException,
    EntityStateException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMailboxPermissions",
}));

export type DeleteMobileDeviceAccessOverrideError =
  | EntityNotFoundException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Deletes the mobile device access override for the given WorkMail organization, user, and device.
 *
 * Deleting already deleted and non-existing overrides does not produce an error. In those cases, the service sends back an HTTP 200 response with an empty HTTP body.
 */
export const deleteMobileDeviceAccessOverride: API.OperationMethod<
  DeleteMobileDeviceAccessOverrideRequest,
  DeleteMobileDeviceAccessOverrideResponse,
  DeleteMobileDeviceAccessOverrideError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteMobileDeviceAccessOverrideRequest,
  output: DeleteMobileDeviceAccessOverrideResponse,
  errors: [
    EntityNotFoundException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMobileDeviceAccessOverride",
}));

export type DeleteMobileDeviceAccessRuleError =
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Deletes a mobile device access rule for the specified WorkMail organization.
 *
 * Deleting already deleted and non-existing rules does not produce an error. In those cases, the service sends back an HTTP 200 response with an empty HTTP body.
 */
export const deleteMobileDeviceAccessRule: API.OperationMethod<
  DeleteMobileDeviceAccessRuleRequest,
  DeleteMobileDeviceAccessRuleResponse,
  DeleteMobileDeviceAccessRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteMobileDeviceAccessRuleRequest,
  output: DeleteMobileDeviceAccessRuleResponse,
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMobileDeviceAccessRule",
}));

export type DeleteOrganizationError =
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Deletes an WorkMail organization and all underlying AWS resources managed by WorkMail as part of the organization. You can choose whether to delete the associated directory. For more information, see Removing an organization in the *WorkMail Administrator Guide*.
 */
export const deleteOrganization: API.OperationMethod<
  DeleteOrganizationRequest,
  DeleteOrganizationResponse,
  DeleteOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteOrganizationRequest,
  output: DeleteOrganizationResponse,
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteOrganization",
}));

export type DeletePersonalAccessTokenError =
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Deletes the Personal Access Token from the provided WorkMail Organization.
 */
export const deletePersonalAccessToken: API.OperationMethod<
  DeletePersonalAccessTokenRequest,
  DeletePersonalAccessTokenResponse,
  DeletePersonalAccessTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePersonalAccessTokenRequest,
  output: DeletePersonalAccessTokenResponse,
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePersonalAccessToken",
}));

export type DeleteResourceError =
  | EntityStateException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Deletes the specified resource.
 */
export const deleteResource: API.OperationMethod<
  DeleteResourceRequest,
  DeleteResourceResponse,
  DeleteResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteResourceRequest,
  output: DeleteResourceResponse,
  errors: [
    EntityStateException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResource",
}));

export type DeleteRetentionPolicyError =
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Deletes the specified retention policy from the specified organization.
 */
export const deleteRetentionPolicy: API.OperationMethod<
  DeleteRetentionPolicyRequest,
  DeleteRetentionPolicyResponse,
  DeleteRetentionPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRetentionPolicyRequest,
  output: DeleteRetentionPolicyResponse,
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRetentionPolicy",
}));

export type DeleteUserError =
  | DirectoryServiceAuthenticationFailedException
  | DirectoryUnavailableException
  | EntityStateException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Deletes a user from WorkMail and all subsequent systems. Before you can delete a
 * user, the user state must be `DISABLED`. Use the DescribeUser
 * action to confirm the user state.
 *
 * Deleting a user is permanent and cannot be undone. WorkMail archives user mailboxes for
 * 30 days before they are permanently removed.
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
    DirectoryServiceAuthenticationFailedException,
    DirectoryUnavailableException,
    EntityStateException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUser",
}));

export type DeregisterFromWorkMailError =
  | EntityNotFoundException
  | EntityStateException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Mark a user, group, or resource as no longer used in WorkMail. This action
 * disassociates the mailbox and schedules it for clean-up. WorkMail keeps mailboxes for 30 days
 * before they are permanently removed. The functionality in the console is
 * *Disable*.
 */
export const deregisterFromWorkMail: API.OperationMethod<
  DeregisterFromWorkMailRequest,
  DeregisterFromWorkMailResponse,
  DeregisterFromWorkMailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeregisterFromWorkMailRequest,
  output: DeregisterFromWorkMailResponse,
  errors: [
    EntityNotFoundException,
    EntityStateException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterFromWorkMail",
}));

export type DeregisterMailDomainError =
  | InvalidCustomSesConfigurationException
  | InvalidParameterException
  | MailDomainInUseException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Removes a domain from WorkMail, stops email routing to WorkMail, and removes the authorization allowing WorkMail use. SES keeps the domain because other applications may use it. You must first
 * remove any email address used by WorkMail entities before you remove the domain.
 */
export const deregisterMailDomain: API.OperationMethod<
  DeregisterMailDomainRequest,
  DeregisterMailDomainResponse,
  DeregisterMailDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeregisterMailDomainRequest,
  output: DeregisterMailDomainResponse,
  errors: [
    InvalidCustomSesConfigurationException,
    InvalidParameterException,
    MailDomainInUseException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterMailDomain",
}));

export type DescribeEmailMonitoringConfigurationError =
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes the current email monitoring configuration for a specified organization.
 */
export const describeEmailMonitoringConfiguration: API.OperationMethod<
  DescribeEmailMonitoringConfigurationRequest,
  DescribeEmailMonitoringConfigurationResponse,
  DescribeEmailMonitoringConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeEmailMonitoringConfigurationRequest,
  output: DescribeEmailMonitoringConfigurationResponse,
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEmailMonitoringConfiguration",
}));

export type DescribeEntityError =
  | EntityNotFoundException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Returns basic details about an entity in WorkMail.
 */
export const describeEntity: API.OperationMethod<
  DescribeEntityRequest,
  DescribeEntityResponse,
  DescribeEntityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeEntityRequest,
  output: DescribeEntityResponse,
  errors: [
    EntityNotFoundException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEntity",
}));

export type DescribeGroupError =
  | EntityNotFoundException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Returns the data available for the group.
 */
export const describeGroup: API.OperationMethod<
  DescribeGroupRequest,
  DescribeGroupResponse,
  DescribeGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeGroupRequest,
  output: DescribeGroupResponse,
  errors: [
    EntityNotFoundException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGroup",
}));

export type DescribeIdentityProviderConfigurationError =
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns detailed information on the current IdC setup for the WorkMail organization.
 */
export const describeIdentityProviderConfiguration: API.OperationMethod<
  DescribeIdentityProviderConfigurationRequest,
  DescribeIdentityProviderConfigurationResponse,
  DescribeIdentityProviderConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeIdentityProviderConfigurationRequest,
  output: DescribeIdentityProviderConfigurationResponse,
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeIdentityProviderConfiguration",
}));

export type DescribeInboundDmarcSettingsError =
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Lists the settings in a DMARC policy for a specified organization.
 */
export const describeInboundDmarcSettings: API.OperationMethod<
  DescribeInboundDmarcSettingsRequest,
  DescribeInboundDmarcSettingsResponse,
  DescribeInboundDmarcSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeInboundDmarcSettingsRequest,
  output: DescribeInboundDmarcSettingsResponse,
  errors: [OrganizationNotFoundException, OrganizationStateException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInboundDmarcSettings",
}));

export type DescribeMailboxExportJobError =
  | EntityNotFoundException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Describes the current status of a mailbox export job.
 */
export const describeMailboxExportJob: API.OperationMethod<
  DescribeMailboxExportJobRequest,
  DescribeMailboxExportJobResponse,
  DescribeMailboxExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeMailboxExportJobRequest,
  output: DescribeMailboxExportJobResponse,
  errors: [
    EntityNotFoundException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMailboxExportJob",
}));

export type DescribeOrganizationError =
  | InvalidParameterException
  | OrganizationNotFoundException
  | CommonErrors;
/**
 * Provides more information regarding a given organization based on its
 * identifier.
 */
export const describeOrganization: API.OperationMethod<
  DescribeOrganizationRequest,
  DescribeOrganizationResponse,
  DescribeOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeOrganizationRequest,
  output: DescribeOrganizationResponse,
  errors: [InvalidParameterException, OrganizationNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeOrganization",
}));

export type DescribeResourceError =
  | EntityNotFoundException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Returns the data available for the resource.
 */
export const describeResource: API.OperationMethod<
  DescribeResourceRequest,
  DescribeResourceResponse,
  DescribeResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeResourceRequest,
  output: DescribeResourceResponse,
  errors: [
    EntityNotFoundException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeResource",
}));

export type DescribeUserError =
  | DirectoryServiceAuthenticationFailedException
  | DirectoryUnavailableException
  | EntityNotFoundException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Provides information regarding the user.
 */
export const describeUser: API.OperationMethod<
  DescribeUserRequest,
  DescribeUserResponse,
  DescribeUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeUserRequest,
  output: DescribeUserResponse,
  errors: [
    DirectoryServiceAuthenticationFailedException,
    DirectoryUnavailableException,
    EntityNotFoundException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeUser",
}));

export type DisassociateDelegateFromResourceError =
  | EntityNotFoundException
  | EntityStateException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Removes a member from the resource's set of delegates.
 */
export const disassociateDelegateFromResource: API.OperationMethod<
  DisassociateDelegateFromResourceRequest,
  DisassociateDelegateFromResourceResponse,
  DisassociateDelegateFromResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateDelegateFromResourceRequest,
  output: DisassociateDelegateFromResourceResponse,
  errors: [
    EntityNotFoundException,
    EntityStateException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateDelegateFromResource",
}));

export type DisassociateMemberFromGroupError =
  | DirectoryServiceAuthenticationFailedException
  | DirectoryUnavailableException
  | EntityNotFoundException
  | EntityStateException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Removes a member from a group.
 */
export const disassociateMemberFromGroup: API.OperationMethod<
  DisassociateMemberFromGroupRequest,
  DisassociateMemberFromGroupResponse,
  DisassociateMemberFromGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateMemberFromGroupRequest,
  output: DisassociateMemberFromGroupResponse,
  errors: [
    DirectoryServiceAuthenticationFailedException,
    DirectoryUnavailableException,
    EntityNotFoundException,
    EntityStateException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateMemberFromGroup",
}));

export type GetAccessControlEffectError =
  | EntityNotFoundException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets the effects of an organization's access control rules as they apply to a
 * specified IPv4 address, access protocol action, and user ID or impersonation role ID. You must provide either the user ID or impersonation role ID. Impersonation role ID can only be used with Action EWS.
 */
export const getAccessControlEffect: API.OperationMethod<
  GetAccessControlEffectRequest,
  GetAccessControlEffectResponse,
  GetAccessControlEffectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAccessControlEffectRequest,
  output: GetAccessControlEffectResponse,
  errors: [
    EntityNotFoundException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessControlEffect",
}));

export type GetDefaultRetentionPolicyError =
  | EntityNotFoundException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Gets the default retention policy details for the specified organization.
 */
export const getDefaultRetentionPolicy: API.OperationMethod<
  GetDefaultRetentionPolicyRequest,
  GetDefaultRetentionPolicyResponse,
  GetDefaultRetentionPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDefaultRetentionPolicyRequest,
  output: GetDefaultRetentionPolicyResponse,
  errors: [
    EntityNotFoundException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDefaultRetentionPolicy",
}));

export type GetImpersonationRoleError =
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets the impersonation role details for the given WorkMail organization.
 */
export const getImpersonationRole: API.OperationMethod<
  GetImpersonationRoleRequest,
  GetImpersonationRoleResponse,
  GetImpersonationRoleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetImpersonationRoleRequest,
  output: GetImpersonationRoleResponse,
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetImpersonationRole",
}));

export type GetImpersonationRoleEffectError =
  | EntityNotFoundException
  | EntityStateException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Tests whether the given impersonation role can impersonate a target user.
 */
export const getImpersonationRoleEffect: API.OperationMethod<
  GetImpersonationRoleEffectRequest,
  GetImpersonationRoleEffectResponse,
  GetImpersonationRoleEffectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetImpersonationRoleEffectRequest,
  output: GetImpersonationRoleEffectResponse,
  errors: [
    EntityNotFoundException,
    EntityStateException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetImpersonationRoleEffect",
}));

export type GetMailboxDetailsError =
  | EntityNotFoundException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Requests a user's mailbox details for a specified organization and user.
 */
export const getMailboxDetails: API.OperationMethod<
  GetMailboxDetailsRequest,
  GetMailboxDetailsResponse,
  GetMailboxDetailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMailboxDetailsRequest,
  output: GetMailboxDetailsResponse,
  errors: [
    EntityNotFoundException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMailboxDetails",
}));

export type GetMailDomainError =
  | InvalidParameterException
  | MailDomainNotFoundException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Gets details for a mail domain, including domain records required to configure your domain with recommended security.
 */
export const getMailDomain: API.OperationMethod<
  GetMailDomainRequest,
  GetMailDomainResponse,
  GetMailDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMailDomainRequest,
  output: GetMailDomainResponse,
  errors: [
    InvalidParameterException,
    MailDomainNotFoundException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMailDomain",
}));

export type GetMobileDeviceAccessEffectError =
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Simulates the effect of the mobile device access rules for the given attributes of a sample access event. Use this method to test the effects of the current set of mobile device access
 * rules for the WorkMail organization for a particular user's attributes.
 */
export const getMobileDeviceAccessEffect: API.OperationMethod<
  GetMobileDeviceAccessEffectRequest,
  GetMobileDeviceAccessEffectResponse,
  GetMobileDeviceAccessEffectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMobileDeviceAccessEffectRequest,
  output: GetMobileDeviceAccessEffectResponse,
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMobileDeviceAccessEffect",
}));

export type GetMobileDeviceAccessOverrideError =
  | EntityNotFoundException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets the mobile device access override for the given WorkMail organization, user, and device.
 */
export const getMobileDeviceAccessOverride: API.OperationMethod<
  GetMobileDeviceAccessOverrideRequest,
  GetMobileDeviceAccessOverrideResponse,
  GetMobileDeviceAccessOverrideError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMobileDeviceAccessOverrideRequest,
  output: GetMobileDeviceAccessOverrideResponse,
  errors: [
    EntityNotFoundException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMobileDeviceAccessOverride",
}));

export type GetPersonalAccessTokenMetadataError =
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Requests details of a specific Personal Access Token within the WorkMail organization.
 */
export const getPersonalAccessTokenMetadata: API.OperationMethod<
  GetPersonalAccessTokenMetadataRequest,
  GetPersonalAccessTokenMetadataResponse,
  GetPersonalAccessTokenMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPersonalAccessTokenMetadataRequest,
  output: GetPersonalAccessTokenMetadataResponse,
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPersonalAccessTokenMetadata",
}));

export type ListAccessControlRulesError =
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Lists the access control rules for the specified organization.
 */
export const listAccessControlRules: API.OperationMethod<
  ListAccessControlRulesRequest,
  ListAccessControlRulesResponse,
  ListAccessControlRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListAccessControlRulesRequest,
  output: ListAccessControlRulesResponse,
  errors: [OrganizationNotFoundException, OrganizationStateException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccessControlRules",
}));

export type ListAliasesError =
  | EntityNotFoundException
  | EntityStateException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Creates a paginated call to list the aliases associated with a given
 * entity.
 */
export const listAliases: API.PaginatedOperationMethod<
  ListAliasesRequest,
  ListAliasesResponse,
  ListAliasesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAliasesRequest,
  output: ListAliasesResponse,
  errors: [
    EntityNotFoundException,
    EntityStateException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAliases",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAvailabilityConfigurationsError =
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * List all the `AvailabilityConfiguration`'s for the given WorkMail organization.
 */
export const listAvailabilityConfigurations: API.PaginatedOperationMethod<
  ListAvailabilityConfigurationsRequest,
  ListAvailabilityConfigurationsResponse,
  ListAvailabilityConfigurationsError,
  Credentials | HttpClient.HttpClient,
  AvailabilityConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAvailabilityConfigurationsRequest,
  output: ListAvailabilityConfigurationsResponse,
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAvailabilityConfigurations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AvailabilityConfigurations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListGroupMembersError =
  | EntityNotFoundException
  | EntityStateException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Returns an overview of the members of a group. Users and groups can be members of a
 * group.
 */
export const listGroupMembers: API.PaginatedOperationMethod<
  ListGroupMembersRequest,
  ListGroupMembersResponse,
  ListGroupMembersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListGroupMembersRequest,
  output: ListGroupMembersResponse,
  errors: [
    EntityNotFoundException,
    EntityStateException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGroupMembers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListGroupsError =
  | EntityNotFoundException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Returns summaries of the organization's groups.
 */
export const listGroups: API.PaginatedOperationMethod<
  ListGroupsRequest,
  ListGroupsResponse,
  ListGroupsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListGroupsRequest,
  output: ListGroupsResponse,
  errors: [
    EntityNotFoundException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListGroupsForEntityError =
  | EntityNotFoundException
  | EntityStateException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Returns all the groups to which an entity belongs.
 */
export const listGroupsForEntity: API.PaginatedOperationMethod<
  ListGroupsForEntityRequest,
  ListGroupsForEntityResponse,
  ListGroupsForEntityError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListGroupsForEntityRequest,
  output: ListGroupsForEntityResponse,
  errors: [
    EntityNotFoundException,
    EntityStateException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGroupsForEntity",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListImpersonationRolesError =
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Lists all the impersonation roles for the given WorkMail organization.
 */
export const listImpersonationRoles: API.PaginatedOperationMethod<
  ListImpersonationRolesRequest,
  ListImpersonationRolesResponse,
  ListImpersonationRolesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListImpersonationRolesRequest,
  output: ListImpersonationRolesResponse,
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListImpersonationRoles",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMailboxExportJobsError =
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Lists the mailbox export jobs started for the specified organization within the last
 * seven days.
 */
export const listMailboxExportJobs: API.PaginatedOperationMethod<
  ListMailboxExportJobsRequest,
  ListMailboxExportJobsResponse,
  ListMailboxExportJobsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMailboxExportJobsRequest,
  output: ListMailboxExportJobsResponse,
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMailboxExportJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMailboxPermissionsError =
  | EntityNotFoundException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Lists the mailbox permissions associated with a user, group, or resource
 * mailbox.
 */
export const listMailboxPermissions: API.PaginatedOperationMethod<
  ListMailboxPermissionsRequest,
  ListMailboxPermissionsResponse,
  ListMailboxPermissionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMailboxPermissionsRequest,
  output: ListMailboxPermissionsResponse,
  errors: [
    EntityNotFoundException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMailboxPermissions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMailDomainsError =
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Lists the mail domains in a given WorkMail organization.
 */
export const listMailDomains: API.PaginatedOperationMethod<
  ListMailDomainsRequest,
  ListMailDomainsResponse,
  ListMailDomainsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMailDomainsRequest,
  output: ListMailDomainsResponse,
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMailDomains",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMobileDeviceAccessOverridesError =
  | EntityNotFoundException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Lists all the mobile device access overrides for any given combination of WorkMail organization, user, or device.
 */
export const listMobileDeviceAccessOverrides: API.PaginatedOperationMethod<
  ListMobileDeviceAccessOverridesRequest,
  ListMobileDeviceAccessOverridesResponse,
  ListMobileDeviceAccessOverridesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMobileDeviceAccessOverridesRequest,
  output: ListMobileDeviceAccessOverridesResponse,
  errors: [
    EntityNotFoundException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMobileDeviceAccessOverrides",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMobileDeviceAccessRulesError =
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Lists the mobile device access rules for the specified WorkMail organization.
 */
export const listMobileDeviceAccessRules: API.OperationMethod<
  ListMobileDeviceAccessRulesRequest,
  ListMobileDeviceAccessRulesResponse,
  ListMobileDeviceAccessRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListMobileDeviceAccessRulesRequest,
  output: ListMobileDeviceAccessRulesResponse,
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMobileDeviceAccessRules",
}));

export type ListOrganizationsError = InvalidParameterException | CommonErrors;
/**
 * Returns summaries of the customer's organizations.
 */
export const listOrganizations: API.PaginatedOperationMethod<
  ListOrganizationsRequest,
  ListOrganizationsResponse,
  ListOrganizationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListOrganizationsRequest,
  output: ListOrganizationsResponse,
  errors: [InvalidParameterException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOrganizations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPersonalAccessTokensError =
  | EntityNotFoundException
  | EntityStateException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Returns a summary of your Personal Access Tokens.
 */
export const listPersonalAccessTokens: API.PaginatedOperationMethod<
  ListPersonalAccessTokensRequest,
  ListPersonalAccessTokensResponse,
  ListPersonalAccessTokensError,
  Credentials | HttpClient.HttpClient,
  PersonalAccessTokenSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPersonalAccessTokensRequest,
  output: ListPersonalAccessTokensResponse,
  errors: [
    EntityNotFoundException,
    EntityStateException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPersonalAccessTokens",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PersonalAccessTokenSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListResourceDelegatesError =
  | EntityNotFoundException
  | EntityStateException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Lists the delegates associated with a resource. Users and groups can be resource
 * delegates and answer requests on behalf of the resource.
 */
export const listResourceDelegates: API.PaginatedOperationMethod<
  ListResourceDelegatesRequest,
  ListResourceDelegatesResponse,
  ListResourceDelegatesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListResourceDelegatesRequest,
  output: ListResourceDelegatesResponse,
  errors: [
    EntityNotFoundException,
    EntityStateException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceDelegates",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListResourcesError =
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Returns summaries of the organization's resources.
 */
export const listResources: API.PaginatedOperationMethod<
  ListResourcesRequest,
  ListResourcesResponse,
  ListResourcesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListResourcesRequest,
  output: ListResourcesResponse,
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResources",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError = ResourceNotFoundException | CommonErrors;
/**
 * Lists the tags applied to an WorkMail organization resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListUsersError =
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Returns summaries of the organization's users.
 */
export const listUsers: API.PaginatedOperationMethod<
  ListUsersRequest,
  ListUsersResponse,
  ListUsersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListUsersRequest,
  output: ListUsersResponse,
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUsers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type PutAccessControlRuleError =
  | EntityNotFoundException
  | InvalidParameterException
  | LimitExceededException
  | OrganizationNotFoundException
  | OrganizationStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Adds a new access control rule for the specified organization. The rule allows or
 * denies access to the organization for the specified IPv4 addresses, access protocol
 * actions, user IDs and impersonation IDs. Adding a new rule with the same name as an existing rule replaces
 * the older rule.
 */
export const putAccessControlRule: API.OperationMethod<
  PutAccessControlRuleRequest,
  PutAccessControlRuleResponse,
  PutAccessControlRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutAccessControlRuleRequest,
  output: PutAccessControlRuleResponse,
  errors: [
    EntityNotFoundException,
    InvalidParameterException,
    LimitExceededException,
    OrganizationNotFoundException,
    OrganizationStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccessControlRule",
}));

export type PutEmailMonitoringConfigurationError =
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates or updates the email monitoring configuration for a specified organization.
 */
export const putEmailMonitoringConfiguration: API.OperationMethod<
  PutEmailMonitoringConfigurationRequest,
  PutEmailMonitoringConfigurationResponse,
  PutEmailMonitoringConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutEmailMonitoringConfigurationRequest,
  output: PutEmailMonitoringConfigurationResponse,
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutEmailMonitoringConfiguration",
}));

export type PutIdentityProviderConfigurationError =
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Enables integration between IAM Identity Center (IdC) and WorkMail to proxy authentication requests for mailbox users. You can connect your IdC directory or your external directory to WorkMail through
 * IdC and manage access to WorkMail mailboxes in a single place. For enhanced protection, you could enable Multifactor Authentication (MFA) and Personal Access Tokens.
 */
export const putIdentityProviderConfiguration: API.OperationMethod<
  PutIdentityProviderConfigurationRequest,
  PutIdentityProviderConfigurationResponse,
  PutIdentityProviderConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutIdentityProviderConfigurationRequest,
  output: PutIdentityProviderConfigurationResponse,
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutIdentityProviderConfiguration",
}));

export type PutInboundDmarcSettingsError =
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Enables or disables a DMARC policy for a given organization.
 */
export const putInboundDmarcSettings: API.OperationMethod<
  PutInboundDmarcSettingsRequest,
  PutInboundDmarcSettingsResponse,
  PutInboundDmarcSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutInboundDmarcSettingsRequest,
  output: PutInboundDmarcSettingsResponse,
  errors: [OrganizationNotFoundException, OrganizationStateException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutInboundDmarcSettings",
}));

export type PutMailboxPermissionsError =
  | EntityNotFoundException
  | EntityStateException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Sets permissions for a user, group, or resource. This replaces any pre-existing
 * permissions.
 */
export const putMailboxPermissions: API.OperationMethod<
  PutMailboxPermissionsRequest,
  PutMailboxPermissionsResponse,
  PutMailboxPermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutMailboxPermissionsRequest,
  output: PutMailboxPermissionsResponse,
  errors: [
    EntityNotFoundException,
    EntityStateException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutMailboxPermissions",
}));

export type PutMobileDeviceAccessOverrideError =
  | EntityNotFoundException
  | EntityStateException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Creates or updates a mobile device access override for the given WorkMail organization, user, and device.
 */
export const putMobileDeviceAccessOverride: API.OperationMethod<
  PutMobileDeviceAccessOverrideRequest,
  PutMobileDeviceAccessOverrideResponse,
  PutMobileDeviceAccessOverrideError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutMobileDeviceAccessOverrideRequest,
  output: PutMobileDeviceAccessOverrideResponse,
  errors: [
    EntityNotFoundException,
    EntityStateException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutMobileDeviceAccessOverride",
}));

export type PutRetentionPolicyError =
  | InvalidParameterException
  | LimitExceededException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Puts a retention policy to the specified organization.
 */
export const putRetentionPolicy: API.OperationMethod<
  PutRetentionPolicyRequest,
  PutRetentionPolicyResponse,
  PutRetentionPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutRetentionPolicyRequest,
  output: PutRetentionPolicyResponse,
  errors: [
    InvalidParameterException,
    LimitExceededException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutRetentionPolicy",
}));

export type RegisterMailDomainError =
  | InvalidParameterException
  | LimitExceededException
  | MailDomainInUseException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Registers a new domain in WorkMail and SES, and configures it for use by WorkMail. Emails received by SES for this domain are routed to the specified WorkMail organization, and WorkMail has
 * permanent permission to use the specified domain for sending your users' emails.
 */
export const registerMailDomain: API.OperationMethod<
  RegisterMailDomainRequest,
  RegisterMailDomainResponse,
  RegisterMailDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterMailDomainRequest,
  output: RegisterMailDomainResponse,
  errors: [
    InvalidParameterException,
    LimitExceededException,
    MailDomainInUseException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterMailDomain",
}));

export type RegisterToWorkMailError =
  | DirectoryServiceAuthenticationFailedException
  | DirectoryUnavailableException
  | EmailAddressInUseException
  | EntityAlreadyRegisteredException
  | EntityNotFoundException
  | EntityStateException
  | InvalidParameterException
  | MailDomainNotFoundException
  | MailDomainStateException
  | OrganizationNotFoundException
  | OrganizationStateException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Registers an existing and disabled user, group, or resource for WorkMail use by
 * associating a mailbox and calendaring capabilities. It performs no change if the user,
 * group, or resource is enabled and fails if the user, group, or resource is deleted. This
 * operation results in the accumulation of costs. For more information, see Pricing. The equivalent console
 * functionality for this operation is *Enable*.
 *
 * Users can either be created by calling the CreateUser API operation
 * or they can be synchronized from your directory. For more information, see DeregisterFromWorkMail.
 */
export const registerToWorkMail: API.OperationMethod<
  RegisterToWorkMailRequest,
  RegisterToWorkMailResponse,
  RegisterToWorkMailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterToWorkMailRequest,
  output: RegisterToWorkMailResponse,
  errors: [
    DirectoryServiceAuthenticationFailedException,
    DirectoryUnavailableException,
    EmailAddressInUseException,
    EntityAlreadyRegisteredException,
    EntityNotFoundException,
    EntityStateException,
    InvalidParameterException,
    MailDomainNotFoundException,
    MailDomainStateException,
    OrganizationNotFoundException,
    OrganizationStateException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterToWorkMail",
}));

export type ResetPasswordError =
  | DirectoryServiceAuthenticationFailedException
  | DirectoryUnavailableException
  | EntityNotFoundException
  | EntityStateException
  | InvalidParameterException
  | InvalidPasswordException
  | OrganizationNotFoundException
  | OrganizationStateException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Allows the administrator to reset the password for a user.
 */
export const resetPassword: API.OperationMethod<
  ResetPasswordRequest,
  ResetPasswordResponse,
  ResetPasswordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ResetPasswordRequest,
  output: ResetPasswordResponse,
  errors: [
    DirectoryServiceAuthenticationFailedException,
    DirectoryUnavailableException,
    EntityNotFoundException,
    EntityStateException,
    InvalidParameterException,
    InvalidPasswordException,
    OrganizationNotFoundException,
    OrganizationStateException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResetPassword",
}));

export type StartMailboxExportJobError =
  | EntityNotFoundException
  | InvalidParameterException
  | LimitExceededException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Starts a mailbox export job to export MIME-format email messages and calendar items
 * from the specified mailbox to the specified Amazon Simple Storage Service (Amazon S3)
 * bucket. For more information, see Exporting mailbox content in
 * the *WorkMail Administrator Guide*.
 */
export const startMailboxExportJob: API.OperationMethod<
  StartMailboxExportJobRequest,
  StartMailboxExportJobResponse,
  StartMailboxExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartMailboxExportJobRequest,
  output: StartMailboxExportJobResponse,
  errors: [
    EntityNotFoundException,
    InvalidParameterException,
    LimitExceededException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMailboxExportJob",
}));

export type TagResourceError =
  | InvalidParameterException
  | OrganizationStateException
  | ResourceNotFoundException
  | TooManyTagsException
  | CommonErrors;
/**
 * Applies the specified tags to the specified WorkMailorganization
 * resource.
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
    InvalidParameterException,
    OrganizationStateException,
    ResourceNotFoundException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type TestAvailabilityConfigurationError =
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Performs a test on an availability provider to ensure that access is allowed. For EWS, it verifies the provided credentials can be used to successfully log in. For Lambda, it verifies that the Lambda function can be invoked and that the resource access
 * policy was configured to deny anonymous access. An anonymous invocation is one done without providing either a `SourceArn` or `SourceAccount` header.
 *
 * The request must contain either one provider definition (`EwsProvider` or
 * `LambdaProvider`) or the `DomainName` parameter. If the
 * `DomainName` parameter is provided, the configuration stored under the
 * `DomainName` will be tested.
 */
export const testAvailabilityConfiguration: API.OperationMethod<
  TestAvailabilityConfigurationRequest,
  TestAvailabilityConfigurationResponse,
  TestAvailabilityConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TestAvailabilityConfigurationRequest,
  output: TestAvailabilityConfigurationResponse,
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestAvailabilityConfiguration",
}));

export type UntagResourceError = ResourceNotFoundException | CommonErrors;
/**
 * Untags the specified tags from the specified WorkMail organization
 * resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateAvailabilityConfigurationError =
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates an existing `AvailabilityConfiguration` for the given WorkMail
 * organization and domain.
 */
export const updateAvailabilityConfiguration: API.OperationMethod<
  UpdateAvailabilityConfigurationRequest,
  UpdateAvailabilityConfigurationResponse,
  UpdateAvailabilityConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAvailabilityConfigurationRequest,
  output: UpdateAvailabilityConfigurationResponse,
  errors: [
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAvailabilityConfiguration",
}));

export type UpdateDefaultMailDomainError =
  | InvalidParameterException
  | MailDomainNotFoundException
  | MailDomainStateException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Updates the default mail domain for an organization. The default mail domain is used by the WorkMail AWS Console to suggest an email address when enabling a mail user. You can only have one default domain.
 */
export const updateDefaultMailDomain: API.OperationMethod<
  UpdateDefaultMailDomainRequest,
  UpdateDefaultMailDomainResponse,
  UpdateDefaultMailDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDefaultMailDomainRequest,
  output: UpdateDefaultMailDomainResponse,
  errors: [
    InvalidParameterException,
    MailDomainNotFoundException,
    MailDomainStateException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDefaultMailDomain",
}));

export type UpdateGroupError =
  | EntityNotFoundException
  | EntityStateException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Updates attributes in a group.
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
    EntityNotFoundException,
    EntityStateException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGroup",
}));

export type UpdateImpersonationRoleError =
  | EntityNotFoundException
  | EntityStateException
  | InvalidParameterException
  | LimitExceededException
  | OrganizationNotFoundException
  | OrganizationStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates an impersonation role for the given WorkMail organization.
 */
export const updateImpersonationRole: API.OperationMethod<
  UpdateImpersonationRoleRequest,
  UpdateImpersonationRoleResponse,
  UpdateImpersonationRoleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateImpersonationRoleRequest,
  output: UpdateImpersonationRoleResponse,
  errors: [
    EntityNotFoundException,
    EntityStateException,
    InvalidParameterException,
    LimitExceededException,
    OrganizationNotFoundException,
    OrganizationStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateImpersonationRole",
}));

export type UpdateMailboxQuotaError =
  | EntityNotFoundException
  | EntityStateException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Updates a user's current mailbox quota for a specified organization and
 * user.
 */
export const updateMailboxQuota: API.OperationMethod<
  UpdateMailboxQuotaRequest,
  UpdateMailboxQuotaResponse,
  UpdateMailboxQuotaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateMailboxQuotaRequest,
  output: UpdateMailboxQuotaResponse,
  errors: [
    EntityNotFoundException,
    EntityStateException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMailboxQuota",
}));

export type UpdateMobileDeviceAccessRuleError =
  | EntityNotFoundException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | CommonErrors;
/**
 * Updates a mobile device access rule for the specified WorkMail organization.
 */
export const updateMobileDeviceAccessRule: API.OperationMethod<
  UpdateMobileDeviceAccessRuleRequest,
  UpdateMobileDeviceAccessRuleResponse,
  UpdateMobileDeviceAccessRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateMobileDeviceAccessRuleRequest,
  output: UpdateMobileDeviceAccessRuleResponse,
  errors: [
    EntityNotFoundException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMobileDeviceAccessRule",
}));

export type UpdatePrimaryEmailAddressError =
  | DirectoryServiceAuthenticationFailedException
  | DirectoryUnavailableException
  | EmailAddressInUseException
  | EntityNotFoundException
  | EntityStateException
  | InvalidParameterException
  | MailDomainNotFoundException
  | MailDomainStateException
  | OrganizationNotFoundException
  | OrganizationStateException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Updates the primary email for a user, group, or resource. The current email is moved
 * into the list of aliases (or swapped between an existing alias and the current primary
 * email), and the email provided in the input is promoted as the primary.
 */
export const updatePrimaryEmailAddress: API.OperationMethod<
  UpdatePrimaryEmailAddressRequest,
  UpdatePrimaryEmailAddressResponse,
  UpdatePrimaryEmailAddressError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePrimaryEmailAddressRequest,
  output: UpdatePrimaryEmailAddressResponse,
  errors: [
    DirectoryServiceAuthenticationFailedException,
    DirectoryUnavailableException,
    EmailAddressInUseException,
    EntityNotFoundException,
    EntityStateException,
    InvalidParameterException,
    MailDomainNotFoundException,
    MailDomainStateException,
    OrganizationNotFoundException,
    OrganizationStateException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePrimaryEmailAddress",
}));

export type UpdateResourceError =
  | DirectoryUnavailableException
  | EmailAddressInUseException
  | EntityNotFoundException
  | EntityStateException
  | InvalidConfigurationException
  | InvalidParameterException
  | MailDomainNotFoundException
  | MailDomainStateException
  | NameAvailabilityException
  | OrganizationNotFoundException
  | OrganizationStateException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Updates data for the resource. To have the latest information, it must be preceded by
 * a DescribeResource call. The dataset in the request should be the one
 * expected when performing another `DescribeResource` call.
 */
export const updateResource: API.OperationMethod<
  UpdateResourceRequest,
  UpdateResourceResponse,
  UpdateResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateResourceRequest,
  output: UpdateResourceResponse,
  errors: [
    DirectoryUnavailableException,
    EmailAddressInUseException,
    EntityNotFoundException,
    EntityStateException,
    InvalidConfigurationException,
    InvalidParameterException,
    MailDomainNotFoundException,
    MailDomainStateException,
    NameAvailabilityException,
    OrganizationNotFoundException,
    OrganizationStateException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateResource",
}));

export type UpdateUserError =
  | DirectoryServiceAuthenticationFailedException
  | DirectoryUnavailableException
  | EntityNotFoundException
  | EntityStateException
  | InvalidParameterException
  | OrganizationNotFoundException
  | OrganizationStateException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Updates data for the user. To have the latest information, it must be preceded by a
 * DescribeUser call. The dataset in the request should be the one
 * expected when performing another `DescribeUser` call.
 */
export const updateUser: API.OperationMethod<
  UpdateUserRequest,
  UpdateUserResponse,
  UpdateUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateUserRequest,
  output: UpdateUserResponse,
  errors: [
    DirectoryServiceAuthenticationFailedException,
    DirectoryUnavailableException,
    EntityNotFoundException,
    EntityStateException,
    InvalidParameterException,
    OrganizationNotFoundException,
    OrganizationStateException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUser",
}));
