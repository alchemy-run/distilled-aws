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
  sdkId: "identitystore",
  serviceShapeName: "AWSIdentityStore",
});
const auth = T.AwsAuthSigv4({ name: "identitystore" });
const ver = T.ServiceVersion("2020-06-15");
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
              `https://identitystore-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
              return e(`https://identitystore.${Region}.amazonaws.com`);
            }
            return e(
              `https://identitystore-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://identitystore.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://identitystore.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      RequestId: S.optional(S.String),
      Reason: S.optional(
        S.suspend(() => ConflictExceptionReason).annotate({
          identifier: "ConflictExceptionReason",
        }),
      ),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      ResourceType: S.optional(
        S.suspend(() => ResourceType).annotate({ identifier: "ResourceType" }),
      ),
      ResourceId: S.optional(S.String),
      Reason: S.optional(
        S.suspend(() => ResourceNotFoundExceptionReason).annotate({
          identifier: "ResourceNotFoundExceptionReason",
        }),
      ),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      RequestId: S.optional(S.String),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      RequestId: S.optional(S.String),
    },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      RequestId: S.optional(S.String),
      Reason: S.optional(
        S.suspend(() => ValidationExceptionReason).annotate({
          identifier: "ValidationExceptionReason",
        }),
      ),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type IdentityStoreId = string;
export type GroupDisplayName = string | redacted.Redacted<string>;
export type SensitiveStringType = string | redacted.Redacted<string>;
export interface CreateGroupRequest {
  IdentityStoreId: string;
  DisplayName?: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
}
export const CreateGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IdentityStoreId: S.String,
    DisplayName: S.optional(SensitiveString),
    Description: S.optional(SensitiveString),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateGroupRequest",
}) as any as S.Schema<CreateGroupRequest>;
export type ResourceId = string;
export interface CreateGroupResponse {
  GroupId: string;
  IdentityStoreId: string;
}
export const CreateGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GroupId: S.String, IdentityStoreId: S.String }),
).annotate({
  identifier: "CreateGroupResponse",
}) as any as S.Schema<CreateGroupResponse>;
export type MemberId = { UserId: string };
export const MemberId = /*@__PURE__*/ S.Union([S.Struct({ UserId: S.String })]);
export interface CreateGroupMembershipRequest {
  IdentityStoreId: string;
  GroupId: string;
  MemberId: MemberId;
}
export const CreateGroupMembershipRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IdentityStoreId: S.String,
    GroupId: S.String,
    MemberId: MemberId,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateGroupMembershipRequest",
}) as any as S.Schema<CreateGroupMembershipRequest>;
export interface CreateGroupMembershipResponse {
  MembershipId: string;
  IdentityStoreId: string;
}
export const CreateGroupMembershipResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MembershipId: S.String, IdentityStoreId: S.String }),
).annotate({
  identifier: "CreateGroupMembershipResponse",
}) as any as S.Schema<CreateGroupMembershipResponse>;
export type UserName = string | redacted.Redacted<string>;
export interface Name {
  Formatted?: string | redacted.Redacted<string>;
  FamilyName?: string | redacted.Redacted<string>;
  GivenName?: string | redacted.Redacted<string>;
  MiddleName?: string | redacted.Redacted<string>;
  HonorificPrefix?: string | redacted.Redacted<string>;
  HonorificSuffix?: string | redacted.Redacted<string>;
}
export const Name = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Formatted: S.optional(SensitiveString),
    FamilyName: S.optional(SensitiveString),
    GivenName: S.optional(SensitiveString),
    MiddleName: S.optional(SensitiveString),
    HonorificPrefix: S.optional(SensitiveString),
    HonorificSuffix: S.optional(SensitiveString),
  }),
).annotate({ identifier: "Name" }) as any as S.Schema<Name>;
export interface Email {
  Value?: string | redacted.Redacted<string>;
  Type?: string | redacted.Redacted<string>;
  Primary?: boolean;
}
export const Email = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Value: S.optional(SensitiveString),
    Type: S.optional(SensitiveString),
    Primary: S.optional(S.Boolean),
  }),
).annotate({ identifier: "Email" }) as any as S.Schema<Email>;
export type Emails = Email[];
export const Emails = /*@__PURE__*/ S.Array(Email);
export interface Address {
  StreetAddress?: string | redacted.Redacted<string>;
  Locality?: string | redacted.Redacted<string>;
  Region?: string | redacted.Redacted<string>;
  PostalCode?: string | redacted.Redacted<string>;
  Country?: string | redacted.Redacted<string>;
  Formatted?: string | redacted.Redacted<string>;
  Type?: string | redacted.Redacted<string>;
  Primary?: boolean;
}
export const Address = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StreetAddress: S.optional(SensitiveString),
    Locality: S.optional(SensitiveString),
    Region: S.optional(SensitiveString),
    PostalCode: S.optional(SensitiveString),
    Country: S.optional(SensitiveString),
    Formatted: S.optional(SensitiveString),
    Type: S.optional(SensitiveString),
    Primary: S.optional(S.Boolean),
  }),
).annotate({ identifier: "Address" }) as any as S.Schema<Address>;
export type Addresses = Address[];
export const Addresses = /*@__PURE__*/ S.Array(Address);
export interface PhoneNumber {
  Value?: string | redacted.Redacted<string>;
  Type?: string | redacted.Redacted<string>;
  Primary?: boolean;
}
export const PhoneNumber = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Value: S.optional(SensitiveString),
    Type: S.optional(SensitiveString),
    Primary: S.optional(S.Boolean),
  }),
).annotate({ identifier: "PhoneNumber" }) as any as S.Schema<PhoneNumber>;
export type PhoneNumbers = PhoneNumber[];
export const PhoneNumbers = /*@__PURE__*/ S.Array(PhoneNumber);
export interface Photo {
  Value: string | redacted.Redacted<string>;
  Type?: string | redacted.Redacted<string>;
  Display?: string | redacted.Redacted<string>;
  Primary?: boolean;
}
export const Photo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Value: SensitiveString,
    Type: S.optional(SensitiveString),
    Display: S.optional(SensitiveString),
    Primary: S.optional(S.Boolean),
  }),
).annotate({ identifier: "Photo" }) as any as S.Schema<Photo>;
export type Photos = Photo[];
export const Photos = /*@__PURE__*/ S.Array(Photo);
export interface Role {
  Value?: string | redacted.Redacted<string>;
  Type?: string | redacted.Redacted<string>;
  Primary?: boolean;
}
export const Role = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Value: S.optional(SensitiveString),
    Type: S.optional(SensitiveString),
    Primary: S.optional(S.Boolean),
  }),
).annotate({ identifier: "Role" }) as any as S.Schema<Role>;
export type Roles = Role[];
export const Roles = /*@__PURE__*/ S.Array(Role);
export type ExtensionName = string;
export type AttributeValue = unknown;
export type Extensions = { [key: string]: any | undefined };
export const Extensions = /*@__PURE__*/ S.Record(
  S.String,
  S.Any.pipe(S.optional),
);
export interface CreateUserRequest {
  IdentityStoreId: string;
  UserName?: string | redacted.Redacted<string>;
  Name?: Name;
  DisplayName?: string | redacted.Redacted<string>;
  NickName?: string | redacted.Redacted<string>;
  ProfileUrl?: string | redacted.Redacted<string>;
  Emails?: Email[];
  Addresses?: Address[];
  PhoneNumbers?: PhoneNumber[];
  UserType?: string | redacted.Redacted<string>;
  Title?: string | redacted.Redacted<string>;
  PreferredLanguage?: string | redacted.Redacted<string>;
  Locale?: string | redacted.Redacted<string>;
  Timezone?: string | redacted.Redacted<string>;
  Photos?: Photo[];
  Website?: string | redacted.Redacted<string>;
  Birthdate?: string | redacted.Redacted<string>;
  Roles?: Role[];
  Extensions?: { [key: string]: any | undefined };
}
export const CreateUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IdentityStoreId: S.String,
    UserName: S.optional(SensitiveString),
    Name: S.optional(Name),
    DisplayName: S.optional(SensitiveString),
    NickName: S.optional(SensitiveString),
    ProfileUrl: S.optional(SensitiveString),
    Emails: S.optional(Emails),
    Addresses: S.optional(Addresses),
    PhoneNumbers: S.optional(PhoneNumbers),
    UserType: S.optional(SensitiveString),
    Title: S.optional(SensitiveString),
    PreferredLanguage: S.optional(SensitiveString),
    Locale: S.optional(SensitiveString),
    Timezone: S.optional(SensitiveString),
    Photos: S.optional(Photos),
    Website: S.optional(SensitiveString),
    Birthdate: S.optional(SensitiveString),
    Roles: S.optional(Roles),
    Extensions: S.optional(Extensions),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateUserRequest",
}) as any as S.Schema<CreateUserRequest>;
export interface CreateUserResponse {
  IdentityStoreId: string;
  UserId: string;
}
export const CreateUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IdentityStoreId: S.String, UserId: S.String }),
).annotate({
  identifier: "CreateUserResponse",
}) as any as S.Schema<CreateUserResponse>;
export interface DeleteGroupRequest {
  IdentityStoreId: string;
  GroupId: string;
}
export const DeleteGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IdentityStoreId: S.String, GroupId: S.String }).pipe(
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
export interface DeleteGroupMembershipRequest {
  IdentityStoreId: string;
  MembershipId: string;
}
export const DeleteGroupMembershipRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IdentityStoreId: S.String, MembershipId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteGroupMembershipRequest",
}) as any as S.Schema<DeleteGroupMembershipRequest>;
export interface DeleteGroupMembershipResponse {}
export const DeleteGroupMembershipResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteGroupMembershipResponse",
}) as any as S.Schema<DeleteGroupMembershipResponse>;
export interface DeleteUserRequest {
  IdentityStoreId: string;
  UserId: string;
}
export const DeleteUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IdentityStoreId: S.String, UserId: S.String }).pipe(
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
export interface DescribeGroupRequest {
  IdentityStoreId: string;
  GroupId: string;
}
export const DescribeGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IdentityStoreId: S.String, GroupId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeGroupRequest",
}) as any as S.Schema<DescribeGroupRequest>;
export type ExternalIdIssuer = string | redacted.Redacted<string>;
export type ExternalIdIdentifier = string | redacted.Redacted<string>;
export interface ExternalId {
  Issuer: string | redacted.Redacted<string>;
  Id: string | redacted.Redacted<string>;
}
export const ExternalId = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Issuer: SensitiveString, Id: SensitiveString }),
).annotate({ identifier: "ExternalId" }) as any as S.Schema<ExternalId>;
export type ExternalIds = ExternalId[];
export const ExternalIds = /*@__PURE__*/ S.Array(ExternalId);
export type StringType = string;
export interface DescribeGroupResponse {
  GroupId: string;
  DisplayName?: string | redacted.Redacted<string>;
  ExternalIds?: ExternalId[];
  Description?: string | redacted.Redacted<string>;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  CreatedBy?: string;
  UpdatedBy?: string;
  IdentityStoreId: string;
}
export const DescribeGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupId: S.String,
    DisplayName: S.optional(SensitiveString),
    ExternalIds: S.optional(ExternalIds),
    Description: S.optional(SensitiveString),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CreatedBy: S.optional(S.String),
    UpdatedBy: S.optional(S.String),
    IdentityStoreId: S.String,
  }),
).annotate({
  identifier: "DescribeGroupResponse",
}) as any as S.Schema<DescribeGroupResponse>;
export interface DescribeGroupMembershipRequest {
  IdentityStoreId: string;
  MembershipId: string;
}
export const DescribeGroupMembershipRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IdentityStoreId: S.String, MembershipId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeGroupMembershipRequest",
}) as any as S.Schema<DescribeGroupMembershipRequest>;
export interface DescribeGroupMembershipResponse {
  IdentityStoreId: string;
  MembershipId: string;
  GroupId: string;
  MemberId: MemberId;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  CreatedBy?: string;
  UpdatedBy?: string;
}
export const DescribeGroupMembershipResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IdentityStoreId: S.String,
    MembershipId: S.String,
    GroupId: S.String,
    MemberId: MemberId,
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CreatedBy: S.optional(S.String),
    UpdatedBy: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeGroupMembershipResponse",
}) as any as S.Schema<DescribeGroupMembershipResponse>;
export type ExtensionNames = string[];
export const ExtensionNames = /*@__PURE__*/ S.Array(S.String);
export interface DescribeUserRequest {
  IdentityStoreId: string;
  UserId: string;
  Extensions?: string[];
}
export const DescribeUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IdentityStoreId: S.String,
    UserId: S.String,
    Extensions: S.optional(ExtensionNames),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeUserRequest",
}) as any as S.Schema<DescribeUserRequest>;
export type UserStatus = "ENABLED" | "DISABLED" | (string & {});
export const UserStatus = S.String;

export interface DescribeUserResponse {
  IdentityStoreId: string;
  UserId: string;
  UserName?: string | redacted.Redacted<string>;
  ExternalIds?: ExternalId[];
  Name?: Name;
  DisplayName?: string | redacted.Redacted<string>;
  NickName?: string | redacted.Redacted<string>;
  ProfileUrl?: string | redacted.Redacted<string>;
  Emails?: Email[];
  Addresses?: Address[];
  PhoneNumbers?: PhoneNumber[];
  UserType?: string | redacted.Redacted<string>;
  Title?: string | redacted.Redacted<string>;
  PreferredLanguage?: string | redacted.Redacted<string>;
  Locale?: string | redacted.Redacted<string>;
  Timezone?: string | redacted.Redacted<string>;
  UserStatus?: UserStatus;
  Photos?: Photo[];
  Website?: string | redacted.Redacted<string>;
  Birthdate?: string | redacted.Redacted<string>;
  Roles?: Role[];
  CreatedAt?: Date;
  CreatedBy?: string;
  UpdatedAt?: Date;
  UpdatedBy?: string;
  Extensions?: { [key: string]: any | undefined };
}
export const DescribeUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IdentityStoreId: S.String,
    UserId: S.String,
    UserName: S.optional(SensitiveString),
    ExternalIds: S.optional(ExternalIds),
    Name: S.optional(Name),
    DisplayName: S.optional(SensitiveString),
    NickName: S.optional(SensitiveString),
    ProfileUrl: S.optional(SensitiveString),
    Emails: S.optional(Emails),
    Addresses: S.optional(Addresses),
    PhoneNumbers: S.optional(PhoneNumbers),
    UserType: S.optional(SensitiveString),
    Title: S.optional(SensitiveString),
    PreferredLanguage: S.optional(SensitiveString),
    Locale: S.optional(SensitiveString),
    Timezone: S.optional(SensitiveString),
    UserStatus: S.optional(UserStatus),
    Photos: S.optional(Photos),
    Website: S.optional(SensitiveString),
    Birthdate: S.optional(SensitiveString),
    Roles: S.optional(Roles),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CreatedBy: S.optional(S.String),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedBy: S.optional(S.String),
    Extensions: S.optional(Extensions),
  }),
).annotate({
  identifier: "DescribeUserResponse",
}) as any as S.Schema<DescribeUserResponse>;
export type AttributePath = string;
export interface UniqueAttribute {
  AttributePath: string;
  AttributeValue: any;
}
export const UniqueAttribute = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AttributePath: S.String, AttributeValue: S.Any }),
).annotate({
  identifier: "UniqueAttribute",
}) as any as S.Schema<UniqueAttribute>;
export type AlternateIdentifier =
  | { ExternalId: ExternalId; UniqueAttribute?: never }
  | { ExternalId?: never; UniqueAttribute: UniqueAttribute };
export const AlternateIdentifier = /*@__PURE__*/ S.Union([
  S.Struct({ ExternalId: ExternalId }),
  S.Struct({ UniqueAttribute: UniqueAttribute }),
]);
export interface GetGroupIdRequest {
  IdentityStoreId: string;
  AlternateIdentifier: AlternateIdentifier;
}
export const GetGroupIdRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IdentityStoreId: S.String,
    AlternateIdentifier: AlternateIdentifier,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetGroupIdRequest",
}) as any as S.Schema<GetGroupIdRequest>;
export interface GetGroupIdResponse {
  GroupId: string;
  IdentityStoreId: string;
}
export const GetGroupIdResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GroupId: S.String, IdentityStoreId: S.String }),
).annotate({
  identifier: "GetGroupIdResponse",
}) as any as S.Schema<GetGroupIdResponse>;
export interface GetGroupMembershipIdRequest {
  IdentityStoreId: string;
  GroupId: string;
  MemberId: MemberId;
}
export const GetGroupMembershipIdRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IdentityStoreId: S.String,
    GroupId: S.String,
    MemberId: MemberId,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetGroupMembershipIdRequest",
}) as any as S.Schema<GetGroupMembershipIdRequest>;
export interface GetGroupMembershipIdResponse {
  MembershipId: string;
  IdentityStoreId: string;
}
export const GetGroupMembershipIdResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MembershipId: S.String, IdentityStoreId: S.String }),
).annotate({
  identifier: "GetGroupMembershipIdResponse",
}) as any as S.Schema<GetGroupMembershipIdResponse>;
export interface GetUserIdRequest {
  IdentityStoreId: string;
  AlternateIdentifier: AlternateIdentifier;
}
export const GetUserIdRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IdentityStoreId: S.String,
    AlternateIdentifier: AlternateIdentifier,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetUserIdRequest",
}) as any as S.Schema<GetUserIdRequest>;
export interface GetUserIdResponse {
  IdentityStoreId: string;
  UserId: string;
}
export const GetUserIdResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IdentityStoreId: S.String, UserId: S.String }),
).annotate({
  identifier: "GetUserIdResponse",
}) as any as S.Schema<GetUserIdResponse>;
export type GroupIds = string[];
export const GroupIds = /*@__PURE__*/ S.Array(S.String);
export interface IsMemberInGroupsRequest {
  IdentityStoreId: string;
  MemberId: MemberId;
  GroupIds: string[];
}
export const IsMemberInGroupsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IdentityStoreId: S.String,
    MemberId: MemberId,
    GroupIds: GroupIds,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "IsMemberInGroupsRequest",
}) as any as S.Schema<IsMemberInGroupsRequest>;
export interface GroupMembershipExistenceResult {
  GroupId?: string;
  MemberId?: MemberId;
  MembershipExists?: boolean;
}
export const GroupMembershipExistenceResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupId: S.optional(S.String),
    MemberId: S.optional(MemberId),
    MembershipExists: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "GroupMembershipExistenceResult",
}) as any as S.Schema<GroupMembershipExistenceResult>;
export type GroupMembershipExistenceResults = GroupMembershipExistenceResult[];
export const GroupMembershipExistenceResults = /*@__PURE__*/ S.Array(
  GroupMembershipExistenceResult,
);
export interface IsMemberInGroupsResponse {
  Results: GroupMembershipExistenceResult[];
}
export const IsMemberInGroupsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Results: GroupMembershipExistenceResults }),
).annotate({
  identifier: "IsMemberInGroupsResponse",
}) as any as S.Schema<IsMemberInGroupsResponse>;
export type MaxResults = number;
export type NextToken = string;
export interface ListGroupMembershipsRequest {
  IdentityStoreId: string;
  GroupId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListGroupMembershipsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IdentityStoreId: S.String,
    GroupId: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListGroupMembershipsRequest",
}) as any as S.Schema<ListGroupMembershipsRequest>;
export interface GroupMembership {
  IdentityStoreId: string;
  MembershipId?: string;
  GroupId?: string;
  MemberId?: MemberId;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  CreatedBy?: string;
  UpdatedBy?: string;
}
export const GroupMembership = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IdentityStoreId: S.String,
    MembershipId: S.optional(S.String),
    GroupId: S.optional(S.String),
    MemberId: S.optional(MemberId),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CreatedBy: S.optional(S.String),
    UpdatedBy: S.optional(S.String),
  }),
).annotate({
  identifier: "GroupMembership",
}) as any as S.Schema<GroupMembership>;
export type GroupMemberships = GroupMembership[];
export const GroupMemberships = /*@__PURE__*/ S.Array(GroupMembership);
export interface ListGroupMembershipsResponse {
  GroupMemberships: GroupMembership[];
  NextToken?: string;
}
export const ListGroupMembershipsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupMemberships: GroupMemberships,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListGroupMembershipsResponse",
}) as any as S.Schema<ListGroupMembershipsResponse>;
export interface ListGroupMembershipsForMemberRequest {
  IdentityStoreId: string;
  MemberId: MemberId;
  MaxResults?: number;
  NextToken?: string;
}
export const ListGroupMembershipsForMemberRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      IdentityStoreId: S.String,
      MemberId: MemberId,
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "ListGroupMembershipsForMemberRequest",
}) as any as S.Schema<ListGroupMembershipsForMemberRequest>;
export interface ListGroupMembershipsForMemberResponse {
  GroupMemberships: GroupMembership[];
  NextToken?: string;
}
export const ListGroupMembershipsForMemberResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      GroupMemberships: GroupMemberships,
      NextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListGroupMembershipsForMemberResponse",
}) as any as S.Schema<ListGroupMembershipsForMemberResponse>;
export interface Filter {
  AttributePath: string;
  AttributeValue: string | redacted.Redacted<string>;
}
export const Filter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AttributePath: S.String, AttributeValue: SensitiveString }),
).annotate({ identifier: "Filter" }) as any as S.Schema<Filter>;
export type Filters = Filter[];
export const Filters = /*@__PURE__*/ S.Array(Filter);
export interface ListGroupsRequest {
  IdentityStoreId: string;
  MaxResults?: number;
  NextToken?: string;
  Filters?: Filter[];
}
export const ListGroupsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IdentityStoreId: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    Filters: S.optional(Filters),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListGroupsRequest",
}) as any as S.Schema<ListGroupsRequest>;
export interface Group {
  GroupId: string;
  DisplayName?: string | redacted.Redacted<string>;
  ExternalIds?: ExternalId[];
  Description?: string | redacted.Redacted<string>;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  CreatedBy?: string;
  UpdatedBy?: string;
  IdentityStoreId: string;
}
export const Group = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupId: S.String,
    DisplayName: S.optional(SensitiveString),
    ExternalIds: S.optional(ExternalIds),
    Description: S.optional(SensitiveString),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CreatedBy: S.optional(S.String),
    UpdatedBy: S.optional(S.String),
    IdentityStoreId: S.String,
  }),
).annotate({ identifier: "Group" }) as any as S.Schema<Group>;
export type Groups = Group[];
export const Groups = /*@__PURE__*/ S.Array(Group);
export interface ListGroupsResponse {
  Groups: Group[];
  NextToken?: string;
}
export const ListGroupsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Groups: Groups, NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListGroupsResponse",
}) as any as S.Schema<ListGroupsResponse>;
export interface ListUsersRequest {
  IdentityStoreId: string;
  Extensions?: string[];
  MaxResults?: number;
  NextToken?: string;
  Filters?: Filter[];
}
export const ListUsersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IdentityStoreId: S.String,
    Extensions: S.optional(ExtensionNames),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    Filters: S.optional(Filters),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListUsersRequest",
}) as any as S.Schema<ListUsersRequest>;
export interface User {
  IdentityStoreId: string;
  UserId: string;
  UserName?: string | redacted.Redacted<string>;
  ExternalIds?: ExternalId[];
  Name?: Name;
  DisplayName?: string | redacted.Redacted<string>;
  NickName?: string | redacted.Redacted<string>;
  ProfileUrl?: string | redacted.Redacted<string>;
  Emails?: Email[];
  Addresses?: Address[];
  PhoneNumbers?: PhoneNumber[];
  UserType?: string | redacted.Redacted<string>;
  Title?: string | redacted.Redacted<string>;
  PreferredLanguage?: string | redacted.Redacted<string>;
  Locale?: string | redacted.Redacted<string>;
  Timezone?: string | redacted.Redacted<string>;
  UserStatus?: UserStatus;
  Photos?: Photo[];
  Website?: string | redacted.Redacted<string>;
  Birthdate?: string | redacted.Redacted<string>;
  Roles?: Role[];
  CreatedAt?: Date;
  CreatedBy?: string;
  UpdatedAt?: Date;
  UpdatedBy?: string;
  Extensions?: { [key: string]: any | undefined };
}
export const User = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IdentityStoreId: S.String,
    UserId: S.String,
    UserName: S.optional(SensitiveString),
    ExternalIds: S.optional(ExternalIds),
    Name: S.optional(Name),
    DisplayName: S.optional(SensitiveString),
    NickName: S.optional(SensitiveString),
    ProfileUrl: S.optional(SensitiveString),
    Emails: S.optional(Emails),
    Addresses: S.optional(Addresses),
    PhoneNumbers: S.optional(PhoneNumbers),
    UserType: S.optional(SensitiveString),
    Title: S.optional(SensitiveString),
    PreferredLanguage: S.optional(SensitiveString),
    Locale: S.optional(SensitiveString),
    Timezone: S.optional(SensitiveString),
    UserStatus: S.optional(UserStatus),
    Photos: S.optional(Photos),
    Website: S.optional(SensitiveString),
    Birthdate: S.optional(SensitiveString),
    Roles: S.optional(Roles),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CreatedBy: S.optional(S.String),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedBy: S.optional(S.String),
    Extensions: S.optional(Extensions),
  }),
).annotate({ identifier: "User" }) as any as S.Schema<User>;
export type Users = User[];
export const Users = /*@__PURE__*/ S.Array(User);
export interface ListUsersResponse {
  Users: User[];
  NextToken?: string;
}
export const ListUsersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Users: Users, NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListUsersResponse",
}) as any as S.Schema<ListUsersResponse>;
export interface AttributeOperation {
  AttributePath: string;
  AttributeValue?: any;
}
export const AttributeOperation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AttributePath: S.String, AttributeValue: S.optional(S.Any) }),
).annotate({
  identifier: "AttributeOperation",
}) as any as S.Schema<AttributeOperation>;
export type AttributeOperations = AttributeOperation[];
export const AttributeOperations = /*@__PURE__*/ S.Array(AttributeOperation);
export interface UpdateGroupRequest {
  IdentityStoreId: string;
  GroupId: string;
  Operations: AttributeOperation[];
}
export const UpdateGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IdentityStoreId: S.String,
    GroupId: S.String,
    Operations: AttributeOperations,
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
export interface UpdateUserRequest {
  IdentityStoreId: string;
  UserId: string;
  Operations: AttributeOperation[];
}
export const UpdateUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IdentityStoreId: S.String,
    UserId: S.String,
    Operations: AttributeOperations,
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
export type ExceptionMessage = string;
export type RequestId = string;
export type ConflictExceptionReason =
  | "UNIQUENESS_CONSTRAINT_VIOLATION"
  | "CONCURRENT_MODIFICATION"
  | (string & {});
export const ConflictExceptionReason = S.String;

export type ResourceType =
  | "GROUP"
  | "USER"
  | "IDENTITY_STORE"
  | "GROUP_MEMBERSHIP"
  | "RESOURCE_POLICY"
  | (string & {});
export const ResourceType = S.String;

export type ResourceNotFoundExceptionReason =
  | "KMS_KEY_NOT_FOUND"
  | (string & {});
export const ResourceNotFoundExceptionReason = S.String;

export type ValidationExceptionReason =
  | "KMS_INVALID_ARN"
  | "KMS_INVALID_KEY_USAGE"
  | "KMS_INVALID_STATE"
  | "KMS_DISABLED"
  | (string & {});
export const ValidationExceptionReason = S.String;

export type CreateGroupError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a group within the specified identity store.
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
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGroup",
}));

export type CreateGroupMembershipError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a relationship between a member and a group. The following identifiers must be specified: `GroupId`, `IdentityStoreId`, and `MemberId`.
 */
export const createGroupMembership: API.OperationMethod<
  CreateGroupMembershipRequest,
  CreateGroupMembershipResponse,
  CreateGroupMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateGroupMembershipRequest,
  output: CreateGroupMembershipResponse,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGroupMembership",
}));

export type CreateUserError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a user within the specified identity store.
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
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUser",
}));

export type DeleteGroupError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Delete a group within an identity store given `GroupId`.
 */
export const deleteGroup: API.OperationMethod<
  DeleteGroupRequest,
  DeleteGroupResponse,
  DeleteGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteGroupRequest,
  output: DeleteGroupResponse,
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGroup",
}));

export type DeleteGroupMembershipError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Delete a membership within a group given `MembershipId`.
 */
export const deleteGroupMembership: API.OperationMethod<
  DeleteGroupMembershipRequest,
  DeleteGroupMembershipResponse,
  DeleteGroupMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteGroupMembershipRequest,
  output: DeleteGroupMembershipResponse,
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGroupMembership",
}));

export type DeleteUserError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a user within an identity store given `UserId`.
 */
export const deleteUser: API.OperationMethod<
  DeleteUserRequest,
  DeleteUserResponse,
  DeleteUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteUserRequest,
  output: DeleteUserResponse,
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUser",
}));

export type DescribeGroupError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the group metadata and attributes from `GroupId` in an identity store.
 *
 * If you have access to a member account, you can use this API operation from the member account. For more information, see Limiting access to the identity store from member accounts in the * IAM Identity Center User Guide*.
 */
export const describeGroup: API.OperationMethod<
  DescribeGroupRequest,
  DescribeGroupResponse,
  DescribeGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeGroupRequest,
  output: DescribeGroupResponse,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGroup",
}));

export type DescribeGroupMembershipError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves membership metadata and attributes from `MembershipId` in an identity store.
 *
 * If you have access to a member account, you can use this API operation from the member account. For more information, see Limiting access to the identity store from member accounts in the * IAM Identity Center User Guide*.
 */
export const describeGroupMembership: API.OperationMethod<
  DescribeGroupMembershipRequest,
  DescribeGroupMembershipResponse,
  DescribeGroupMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeGroupMembershipRequest,
  output: DescribeGroupMembershipResponse,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGroupMembership",
}));

export type DescribeUserError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the user metadata and attributes from the `UserId` in an identity store.
 *
 * If you have access to a member account, you can use this API operation from the member account. For more information, see Limiting access to the identity store from member accounts in the * IAM Identity Center User Guide*.
 */
export const describeUser: API.OperationMethod<
  DescribeUserRequest,
  DescribeUserResponse,
  DescribeUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeUserRequest,
  output: DescribeUserResponse,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeUser",
}));

export type GetGroupIdError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves `GroupId` in an identity store.
 *
 * If you have access to a member account, you can use this API operation from the member account. For more information, see Limiting access to the identity store from member accounts in the * IAM Identity Center User Guide*.
 */
export const getGroupId: API.OperationMethod<
  GetGroupIdRequest,
  GetGroupIdResponse,
  GetGroupIdError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetGroupIdRequest,
  output: GetGroupIdResponse,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGroupId",
}));

export type GetGroupMembershipIdError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the `MembershipId` in an identity store.
 *
 * If you have access to a member account, you can use this API operation from the member account. For more information, see Limiting access to the identity store from member accounts in the * IAM Identity Center User Guide*.
 */
export const getGroupMembershipId: API.OperationMethod<
  GetGroupMembershipIdRequest,
  GetGroupMembershipIdResponse,
  GetGroupMembershipIdError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetGroupMembershipIdRequest,
  output: GetGroupMembershipIdResponse,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGroupMembershipId",
}));

export type GetUserIdError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the `UserId` in an identity store.
 *
 * If you have access to a member account, you can use this API operation from the member account. For more information, see Limiting access to the identity store from member accounts in the * IAM Identity Center User Guide*.
 */
export const getUserId: API.OperationMethod<
  GetUserIdRequest,
  GetUserIdResponse,
  GetUserIdError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetUserIdRequest,
  output: GetUserIdResponse,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUserId",
}));

export type IsMemberInGroupsError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Checks the user's membership in all requested groups and returns if the member exists in all queried groups.
 *
 * If you have access to a member account, you can use this API operation from the member account. For more information, see Limiting access to the identity store from member accounts in the * IAM Identity Center User Guide*.
 */
export const isMemberInGroups: API.OperationMethod<
  IsMemberInGroupsRequest,
  IsMemberInGroupsResponse,
  IsMemberInGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: IsMemberInGroupsRequest,
  output: IsMemberInGroupsResponse,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "IsMemberInGroups",
}));

export type ListGroupMembershipsError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * For the specified group in the specified identity store, returns the list of all ` GroupMembership` objects and returns results in paginated form.
 *
 * If you have access to a member account, you can use this API operation from the member account. For more information, see Limiting access to the identity store from member accounts in the * IAM Identity Center User Guide*.
 */
export const listGroupMemberships: API.PaginatedOperationMethod<
  ListGroupMembershipsRequest,
  ListGroupMembershipsResponse,
  ListGroupMembershipsError,
  Credentials | HttpClient.HttpClient,
  GroupMembership
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListGroupMembershipsRequest,
  output: ListGroupMembershipsResponse,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGroupMemberships",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "GroupMemberships",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListGroupMembershipsForMemberError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * For the specified member in the specified identity store, returns the list of all ` GroupMembership` objects and returns results in paginated form.
 *
 * If you have access to a member account, you can use this API operation from the member account. For more information, see Limiting access to the identity store from member accounts in the * IAM Identity Center User Guide*.
 */
export const listGroupMembershipsForMember: API.PaginatedOperationMethod<
  ListGroupMembershipsForMemberRequest,
  ListGroupMembershipsForMemberResponse,
  ListGroupMembershipsForMemberError,
  Credentials | HttpClient.HttpClient,
  GroupMembership
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListGroupMembershipsForMemberRequest,
  output: ListGroupMembershipsForMemberResponse,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGroupMembershipsForMember",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "GroupMemberships",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListGroupsError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists all groups in the identity store. Returns a paginated list of complete `Group` objects. Filtering for a `Group` by the `DisplayName` attribute is deprecated. Instead, use the `GetGroupId` API action.
 *
 * If you have access to a member account, you can use this API operation from the member account. For more information, see Limiting access to the identity store from member accounts in the * IAM Identity Center User Guide*.
 */
export const listGroups: API.PaginatedOperationMethod<
  ListGroupsRequest,
  ListGroupsResponse,
  ListGroupsError,
  Credentials | HttpClient.HttpClient,
  Group
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListGroupsRequest,
  output: ListGroupsResponse,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Groups",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListUsersError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists all users in the identity store. Returns a paginated list of complete `User` objects. Filtering for a `User` by the `UserName` attribute is deprecated. Instead, use the `GetUserId` API action.
 *
 * If you have access to a member account, you can use this API operation from the member account. For more information, see Limiting access to the identity store from member accounts in the * IAM Identity Center User Guide*.
 */
export const listUsers: API.PaginatedOperationMethod<
  ListUsersRequest,
  ListUsersResponse,
  ListUsersError,
  Credentials | HttpClient.HttpClient,
  User
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListUsersRequest,
  output: ListUsersResponse,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUsers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Users",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type UpdateGroupError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified group metadata and attributes in the specified identity store.
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
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGroup",
}));

export type UpdateUserError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified user metadata and attributes in the specified identity store.
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
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUser",
}));
