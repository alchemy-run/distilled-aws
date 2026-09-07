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
const ns = T.XmlNamespace(
  "http://directoryservicedata.amazonaws.com/doc/2023-05-31/",
);
const svc = T.AwsApiService({
  sdkId: "Directory Service Data",
  serviceShapeName: "DirectoryServiceData",
});
const auth = T.AwsAuthSigv4({ name: "ds-data" });
const ver = T.ServiceVersion("2023-05-31");
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
              `https://ds-data-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://ds-data-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://ds-data.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://ds-data.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Reason: S.optional(
        S.suspend(() => AccessDeniedReason).annotate({
          identifier: "AccessDeniedReason",
        }),
      ),
    },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class DirectoryUnavailableException
  extends /*@__PURE__*/ S.TaggedError<DirectoryUnavailableException>()(
    "DirectoryUnavailableException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Reason: S.optional(
        S.suspend(() => DirectoryUnavailableReason).annotate({
          identifier: "DirectoryUnavailableReason",
        }),
      ),
    },
    T.all(T.HttpError(400), T.Retryable()),
  ).pipe(C.withBadRequestError, C.withRetryableError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(T.HttpError(500), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      RetryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
    },
    T.all(T.HttpError(429), T.Retryable({ throttling: true })),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Reason: S.optional(
        S.suspend(() => ValidationExceptionReason).annotate({
          identifier: "ValidationExceptionReason",
        }),
      ),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type DirectoryId = string;
export type GroupName = string;
export type MemberName = string;
export type Realm = string;
export type ClientToken = string;
export interface AddGroupMemberRequest {
  DirectoryId: string;
  GroupName: string;
  MemberName: string;
  MemberRealm?: string;
  ClientToken?: string;
}
export const AddGroupMemberRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DirectoryId: S.String.pipe(T.HttpQuery("DirectoryId")),
    GroupName: S.String,
    MemberName: S.String,
    MemberRealm: S.optional(S.String),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/GroupMemberships/AddGroupMember" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AddGroupMemberRequest",
}) as any as S.Schema<AddGroupMemberRequest>;
export interface AddGroupMemberResult {}
export const AddGroupMemberResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "AddGroupMemberResult",
}) as any as S.Schema<AddGroupMemberResult>;
export type GroupType = "Distribution" | "Security" | (string & {});
export const GroupType = /*@__PURE__*/ S.String;

export type GroupScope =
  | "DomainLocal"
  | "Global"
  | "Universal"
  | "BuiltinLocal"
  | (string & {});
export const GroupScope = /*@__PURE__*/ S.String;

export type LdapDisplayName = string;
export type StringAttributeValue = string | redacted.Redacted<string>;
export type NumberAttributeValue = number;
export type BooleanAttributeValue = boolean;
export type StringSetAttributeValue = (string | redacted.Redacted<string>)[];
export const StringSetAttributeValue = /*@__PURE__*/ S.Array(SensitiveString);
export type AttributeValue =
  | {
      S: string | redacted.Redacted<string>;
      N?: never;
      BOOL?: never;
      SS?: never;
    }
  | { S?: never; N: number; BOOL?: never; SS?: never }
  | { S?: never; N?: never; BOOL: boolean; SS?: never }
  | {
      S?: never;
      N?: never;
      BOOL?: never;
      SS: (string | redacted.Redacted<string>)[];
    };
export const AttributeValue = /*@__PURE__*/ S.Union([
  S.Struct({ S: SensitiveString }),
  S.Struct({ N: S.Number }),
  S.Struct({ BOOL: S.Boolean }),
  S.Struct({ SS: StringSetAttributeValue }),
]);
export type Attributes = { [key: string]: AttributeValue | undefined };
export const Attributes = /*@__PURE__*/ S.Record(
  S.String,
  AttributeValue.pipe(S.optional),
);
export interface CreateGroupRequest {
  DirectoryId: string;
  SAMAccountName: string;
  GroupType?: GroupType;
  GroupScope?: GroupScope;
  OtherAttributes?: { [key: string]: AttributeValue | undefined };
  ClientToken?: string;
}
export const CreateGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DirectoryId: S.String.pipe(T.HttpQuery("DirectoryId")),
    SAMAccountName: S.String,
    GroupType: S.optional(GroupType),
    GroupScope: S.optional(GroupScope),
    OtherAttributes: S.optional(Attributes),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/Groups/CreateGroup" }),
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
export type SID = string;
export interface CreateGroupResult {
  DirectoryId?: string;
  SAMAccountName?: string;
  SID?: string;
}
export const CreateGroupResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DirectoryId: S.optional(S.String),
    SAMAccountName: S.optional(S.String),
    SID: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "CreateGroupResult",
}) as any as S.Schema<CreateGroupResult>;
export type UserName = string;
export type EmailAddress = string | redacted.Redacted<string>;
export type GivenName = string | redacted.Redacted<string>;
export type Surname = string | redacted.Redacted<string>;
export interface CreateUserRequest {
  DirectoryId: string;
  SAMAccountName: string;
  EmailAddress?: string | redacted.Redacted<string>;
  GivenName?: string | redacted.Redacted<string>;
  Surname?: string | redacted.Redacted<string>;
  OtherAttributes?: { [key: string]: AttributeValue | undefined };
  ClientToken?: string;
}
export const CreateUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DirectoryId: S.String.pipe(T.HttpQuery("DirectoryId")),
    SAMAccountName: S.String,
    EmailAddress: S.optional(SensitiveString),
    GivenName: S.optional(SensitiveString),
    Surname: S.optional(SensitiveString),
    OtherAttributes: S.optional(Attributes),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/Users/CreateUser" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateUserRequest",
}) as any as S.Schema<CreateUserRequest>;
export interface CreateUserResult {
  DirectoryId?: string;
  SID?: string;
  SAMAccountName?: string;
}
export const CreateUserResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DirectoryId: S.optional(S.String),
    SID: S.optional(S.String),
    SAMAccountName: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "CreateUserResult",
}) as any as S.Schema<CreateUserResult>;
export interface DeleteGroupRequest {
  DirectoryId: string;
  SAMAccountName: string;
  ClientToken?: string;
}
export const DeleteGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DirectoryId: S.String.pipe(T.HttpQuery("DirectoryId")),
    SAMAccountName: S.String,
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/Groups/DeleteGroup" }),
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
export interface DeleteGroupResult {}
export const DeleteGroupResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteGroupResult",
}) as any as S.Schema<DeleteGroupResult>;
export interface DeleteUserRequest {
  DirectoryId: string;
  SAMAccountName: string;
  ClientToken?: string;
}
export const DeleteUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DirectoryId: S.String.pipe(T.HttpQuery("DirectoryId")),
    SAMAccountName: S.String,
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/Users/DeleteUser" }),
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
export interface DeleteUserResult {}
export const DeleteUserResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteUserResult",
}) as any as S.Schema<DeleteUserResult>;
export type LdapDisplayNameList = string[];
export const LdapDisplayNameList = /*@__PURE__*/ S.Array(S.String);
export interface DescribeGroupRequest {
  DirectoryId: string;
  Realm?: string;
  SAMAccountName: string;
  OtherAttributes?: string[];
}
export const DescribeGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DirectoryId: S.String.pipe(T.HttpQuery("DirectoryId")),
    Realm: S.optional(S.String),
    SAMAccountName: S.String,
    OtherAttributes: S.optional(LdapDisplayNameList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/Groups/DescribeGroup" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeGroupRequest",
}) as any as S.Schema<DescribeGroupRequest>;
export type DistinguishedName = string | redacted.Redacted<string>;
export interface DescribeGroupResult {
  DirectoryId?: string;
  Realm?: string;
  SID?: string;
  SAMAccountName?: string;
  DistinguishedName?: string | redacted.Redacted<string>;
  GroupType?: GroupType;
  GroupScope?: GroupScope;
  OtherAttributes?: { [key: string]: AttributeValue | undefined };
}
export const DescribeGroupResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DirectoryId: S.optional(S.String),
    Realm: S.optional(S.String),
    SID: S.optional(S.String),
    SAMAccountName: S.optional(S.String),
    DistinguishedName: S.optional(SensitiveString),
    GroupType: S.optional(GroupType),
    GroupScope: S.optional(GroupScope),
    OtherAttributes: S.optional(Attributes),
  }).pipe(ns),
).annotate({
  identifier: "DescribeGroupResult",
}) as any as S.Schema<DescribeGroupResult>;
export interface DescribeUserRequest {
  DirectoryId: string;
  SAMAccountName: string;
  OtherAttributes?: string[];
  Realm?: string;
}
export const DescribeUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DirectoryId: S.String.pipe(T.HttpQuery("DirectoryId")),
    SAMAccountName: S.String,
    OtherAttributes: S.optional(LdapDisplayNameList),
    Realm: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/Users/DescribeUser" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeUserRequest",
}) as any as S.Schema<DescribeUserRequest>;
export type UserPrincipalName = string | redacted.Redacted<string>;
export interface DescribeUserResult {
  DirectoryId?: string;
  Realm?: string;
  SID?: string;
  SAMAccountName?: string;
  DistinguishedName?: string | redacted.Redacted<string>;
  UserPrincipalName?: string | redacted.Redacted<string>;
  EmailAddress?: string | redacted.Redacted<string>;
  GivenName?: string | redacted.Redacted<string>;
  Surname?: string | redacted.Redacted<string>;
  Enabled?: boolean;
  OtherAttributes?: { [key: string]: AttributeValue | undefined };
}
export const DescribeUserResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DirectoryId: S.optional(S.String),
    Realm: S.optional(S.String),
    SID: S.optional(S.String),
    SAMAccountName: S.optional(S.String),
    DistinguishedName: S.optional(SensitiveString),
    UserPrincipalName: S.optional(SensitiveString),
    EmailAddress: S.optional(SensitiveString),
    GivenName: S.optional(SensitiveString),
    Surname: S.optional(SensitiveString),
    Enabled: S.optional(S.Boolean),
    OtherAttributes: S.optional(Attributes),
  }).pipe(ns),
).annotate({
  identifier: "DescribeUserResult",
}) as any as S.Schema<DescribeUserResult>;
export interface DisableUserRequest {
  DirectoryId: string;
  SAMAccountName: string;
  ClientToken?: string;
}
export const DisableUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DirectoryId: S.String.pipe(T.HttpQuery("DirectoryId")),
    SAMAccountName: S.String,
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/Users/DisableUser" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisableUserRequest",
}) as any as S.Schema<DisableUserRequest>;
export interface DisableUserResult {}
export const DisableUserResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DisableUserResult",
}) as any as S.Schema<DisableUserResult>;
export type NextToken = string | redacted.Redacted<string>;
export type MaxResults = number;
export interface ListGroupMembersRequest {
  DirectoryId: string;
  Realm?: string;
  MemberRealm?: string;
  SAMAccountName: string;
  NextToken?: string | redacted.Redacted<string>;
  MaxResults?: number;
}
export const ListGroupMembersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DirectoryId: S.String.pipe(T.HttpQuery("DirectoryId")),
    Realm: S.optional(S.String),
    MemberRealm: S.optional(S.String),
    SAMAccountName: S.String,
    NextToken: S.optional(SensitiveString),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/GroupMemberships/ListGroupMembers" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListGroupMembersRequest",
}) as any as S.Schema<ListGroupMembersRequest>;
export type MemberType = "USER" | "GROUP" | "COMPUTER" | (string & {});
export const MemberType = /*@__PURE__*/ S.String;

export interface Member {
  SID: string;
  SAMAccountName: string;
  MemberType: MemberType;
}
export const Member = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SID: S.String, SAMAccountName: S.String, MemberType: MemberType }),
).annotate({ identifier: "Member" }) as any as S.Schema<Member>;
export type MemberList = Member[];
export const MemberList = /*@__PURE__*/ S.Array(Member);
export interface ListGroupMembersResult {
  DirectoryId?: string;
  Realm?: string;
  MemberRealm?: string;
  Members?: Member[];
  NextToken?: string | redacted.Redacted<string>;
}
export const ListGroupMembersResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DirectoryId: S.optional(S.String),
    Realm: S.optional(S.String),
    MemberRealm: S.optional(S.String),
    Members: S.optional(MemberList),
    NextToken: S.optional(SensitiveString),
  }).pipe(ns),
).annotate({
  identifier: "ListGroupMembersResult",
}) as any as S.Schema<ListGroupMembersResult>;
export interface ListGroupsRequest {
  DirectoryId: string;
  Realm?: string;
  NextToken?: string | redacted.Redacted<string>;
  MaxResults?: number;
}
export const ListGroupsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DirectoryId: S.String.pipe(T.HttpQuery("DirectoryId")),
    Realm: S.optional(S.String),
    NextToken: S.optional(SensitiveString),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/Groups/ListGroups" }),
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
export interface GroupSummary {
  SID: string;
  SAMAccountName: string;
  GroupType: GroupType;
  GroupScope: GroupScope;
}
export const GroupSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SID: S.String,
    SAMAccountName: S.String,
    GroupType: GroupType,
    GroupScope: GroupScope,
  }),
).annotate({ identifier: "GroupSummary" }) as any as S.Schema<GroupSummary>;
export type GroupSummaryList = GroupSummary[];
export const GroupSummaryList = /*@__PURE__*/ S.Array(GroupSummary);
export interface ListGroupsResult {
  DirectoryId?: string;
  Realm?: string;
  Groups?: GroupSummary[];
  NextToken?: string | redacted.Redacted<string>;
}
export const ListGroupsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DirectoryId: S.optional(S.String),
    Realm: S.optional(S.String),
    Groups: S.optional(GroupSummaryList),
    NextToken: S.optional(SensitiveString),
  }).pipe(ns),
).annotate({
  identifier: "ListGroupsResult",
}) as any as S.Schema<ListGroupsResult>;
export interface ListGroupsForMemberRequest {
  DirectoryId: string;
  Realm?: string;
  MemberRealm?: string;
  SAMAccountName: string;
  NextToken?: string | redacted.Redacted<string>;
  MaxResults?: number;
}
export const ListGroupsForMemberRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DirectoryId: S.String.pipe(T.HttpQuery("DirectoryId")),
    Realm: S.optional(S.String),
    MemberRealm: S.optional(S.String),
    SAMAccountName: S.String,
    NextToken: S.optional(SensitiveString),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/GroupMemberships/ListGroupsForMember" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListGroupsForMemberRequest",
}) as any as S.Schema<ListGroupsForMemberRequest>;
export interface ListGroupsForMemberResult {
  DirectoryId?: string;
  Realm?: string;
  MemberRealm?: string;
  Groups?: GroupSummary[];
  NextToken?: string | redacted.Redacted<string>;
}
export const ListGroupsForMemberResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DirectoryId: S.optional(S.String),
    Realm: S.optional(S.String),
    MemberRealm: S.optional(S.String),
    Groups: S.optional(GroupSummaryList),
    NextToken: S.optional(SensitiveString),
  }).pipe(ns),
).annotate({
  identifier: "ListGroupsForMemberResult",
}) as any as S.Schema<ListGroupsForMemberResult>;
export interface ListUsersRequest {
  DirectoryId: string;
  Realm?: string;
  NextToken?: string | redacted.Redacted<string>;
  MaxResults?: number;
}
export const ListUsersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DirectoryId: S.String.pipe(T.HttpQuery("DirectoryId")),
    Realm: S.optional(S.String),
    NextToken: S.optional(SensitiveString),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/Users/ListUsers" }),
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
export interface UserSummary {
  SID: string;
  SAMAccountName: string;
  GivenName?: string | redacted.Redacted<string>;
  Surname?: string | redacted.Redacted<string>;
  Enabled: boolean;
}
export const UserSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SID: S.String,
    SAMAccountName: S.String,
    GivenName: S.optional(SensitiveString),
    Surname: S.optional(SensitiveString),
    Enabled: S.Boolean,
  }),
).annotate({ identifier: "UserSummary" }) as any as S.Schema<UserSummary>;
export type UserSummaryList = UserSummary[];
export const UserSummaryList = /*@__PURE__*/ S.Array(UserSummary);
export interface ListUsersResult {
  DirectoryId?: string;
  Realm?: string;
  Users?: UserSummary[];
  NextToken?: string | redacted.Redacted<string>;
}
export const ListUsersResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DirectoryId: S.optional(S.String),
    Realm: S.optional(S.String),
    Users: S.optional(UserSummaryList),
    NextToken: S.optional(SensitiveString),
  }).pipe(ns),
).annotate({
  identifier: "ListUsersResult",
}) as any as S.Schema<ListUsersResult>;
export interface RemoveGroupMemberRequest {
  DirectoryId: string;
  GroupName: string;
  MemberName: string;
  MemberRealm?: string;
  ClientToken?: string;
}
export const RemoveGroupMemberRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DirectoryId: S.String.pipe(T.HttpQuery("DirectoryId")),
    GroupName: S.String,
    MemberName: S.String,
    MemberRealm: S.optional(S.String),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/GroupMemberships/RemoveGroupMember" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RemoveGroupMemberRequest",
}) as any as S.Schema<RemoveGroupMemberRequest>;
export interface RemoveGroupMemberResult {}
export const RemoveGroupMemberResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "RemoveGroupMemberResult",
}) as any as S.Schema<RemoveGroupMemberResult>;
export type SearchString = string | redacted.Redacted<string>;
export interface SearchGroupsRequest {
  DirectoryId: string;
  SearchString: string | redacted.Redacted<string>;
  SearchAttributes: string[];
  Realm?: string;
  NextToken?: string | redacted.Redacted<string>;
  MaxResults?: number;
}
export const SearchGroupsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DirectoryId: S.String.pipe(T.HttpQuery("DirectoryId")),
    SearchString: SensitiveString,
    SearchAttributes: LdapDisplayNameList,
    Realm: S.optional(S.String),
    NextToken: S.optional(SensitiveString),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/Groups/SearchGroups" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SearchGroupsRequest",
}) as any as S.Schema<SearchGroupsRequest>;
export interface Group {
  SID?: string;
  SAMAccountName: string;
  DistinguishedName?: string | redacted.Redacted<string>;
  GroupType?: GroupType;
  GroupScope?: GroupScope;
  OtherAttributes?: { [key: string]: AttributeValue | undefined };
}
export const Group = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SID: S.optional(S.String),
    SAMAccountName: S.String,
    DistinguishedName: S.optional(SensitiveString),
    GroupType: S.optional(GroupType),
    GroupScope: S.optional(GroupScope),
    OtherAttributes: S.optional(Attributes),
  }),
).annotate({ identifier: "Group" }) as any as S.Schema<Group>;
export type GroupList = Group[];
export const GroupList = /*@__PURE__*/ S.Array(Group);
export interface SearchGroupsResult {
  DirectoryId?: string;
  Realm?: string;
  Groups?: Group[];
  NextToken?: string | redacted.Redacted<string>;
}
export const SearchGroupsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DirectoryId: S.optional(S.String),
    Realm: S.optional(S.String),
    Groups: S.optional(GroupList),
    NextToken: S.optional(SensitiveString),
  }).pipe(ns),
).annotate({
  identifier: "SearchGroupsResult",
}) as any as S.Schema<SearchGroupsResult>;
export interface SearchUsersRequest {
  DirectoryId: string;
  Realm?: string;
  SearchString: string | redacted.Redacted<string>;
  SearchAttributes: string[];
  NextToken?: string | redacted.Redacted<string>;
  MaxResults?: number;
}
export const SearchUsersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DirectoryId: S.String.pipe(T.HttpQuery("DirectoryId")),
    Realm: S.optional(S.String),
    SearchString: SensitiveString,
    SearchAttributes: LdapDisplayNameList,
    NextToken: S.optional(SensitiveString),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/Users/SearchUsers" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SearchUsersRequest",
}) as any as S.Schema<SearchUsersRequest>;
export interface User {
  SID?: string;
  SAMAccountName: string;
  DistinguishedName?: string | redacted.Redacted<string>;
  UserPrincipalName?: string | redacted.Redacted<string>;
  EmailAddress?: string | redacted.Redacted<string>;
  GivenName?: string | redacted.Redacted<string>;
  Surname?: string | redacted.Redacted<string>;
  Enabled?: boolean;
  OtherAttributes?: { [key: string]: AttributeValue | undefined };
}
export const User = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SID: S.optional(S.String),
    SAMAccountName: S.String,
    DistinguishedName: S.optional(SensitiveString),
    UserPrincipalName: S.optional(SensitiveString),
    EmailAddress: S.optional(SensitiveString),
    GivenName: S.optional(SensitiveString),
    Surname: S.optional(SensitiveString),
    Enabled: S.optional(S.Boolean),
    OtherAttributes: S.optional(Attributes),
  }),
).annotate({ identifier: "User" }) as any as S.Schema<User>;
export type UserList = User[];
export const UserList = /*@__PURE__*/ S.Array(User);
export interface SearchUsersResult {
  DirectoryId?: string;
  Realm?: string;
  Users?: User[];
  NextToken?: string | redacted.Redacted<string>;
}
export const SearchUsersResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DirectoryId: S.optional(S.String),
    Realm: S.optional(S.String),
    Users: S.optional(UserList),
    NextToken: S.optional(SensitiveString),
  }).pipe(ns),
).annotate({
  identifier: "SearchUsersResult",
}) as any as S.Schema<SearchUsersResult>;
export type UpdateType = "ADD" | "REPLACE" | "REMOVE" | (string & {});
export const UpdateType = /*@__PURE__*/ S.String;

export interface UpdateGroupRequest {
  DirectoryId: string;
  SAMAccountName: string;
  GroupType?: GroupType;
  GroupScope?: GroupScope;
  OtherAttributes?: { [key: string]: AttributeValue | undefined };
  UpdateType?: UpdateType;
  ClientToken?: string;
}
export const UpdateGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DirectoryId: S.String.pipe(T.HttpQuery("DirectoryId")),
    SAMAccountName: S.String,
    GroupType: S.optional(GroupType),
    GroupScope: S.optional(GroupScope),
    OtherAttributes: S.optional(Attributes),
    UpdateType: S.optional(UpdateType),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/Groups/UpdateGroup" }),
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
export interface UpdateGroupResult {}
export const UpdateGroupResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateGroupResult",
}) as any as S.Schema<UpdateGroupResult>;
export interface UpdateUserRequest {
  DirectoryId: string;
  SAMAccountName: string;
  EmailAddress?: string | redacted.Redacted<string>;
  GivenName?: string | redacted.Redacted<string>;
  Surname?: string | redacted.Redacted<string>;
  OtherAttributes?: { [key: string]: AttributeValue | undefined };
  UpdateType?: UpdateType;
  ClientToken?: string;
}
export const UpdateUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DirectoryId: S.String.pipe(T.HttpQuery("DirectoryId")),
    SAMAccountName: S.String,
    EmailAddress: S.optional(SensitiveString),
    GivenName: S.optional(SensitiveString),
    Surname: S.optional(SensitiveString),
    OtherAttributes: S.optional(Attributes),
    UpdateType: S.optional(UpdateType),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/Users/UpdateUser" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateUserRequest",
}) as any as S.Schema<UpdateUserRequest>;
export interface UpdateUserResult {}
export const UpdateUserResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateUserResult",
}) as any as S.Schema<UpdateUserResult>;
export type ExceptionMessage = string;
export type AccessDeniedReason =
  | "IAM_AUTH"
  | "DIRECTORY_AUTH"
  | "DATA_DISABLED"
  | (string & {});
export const AccessDeniedReason = /*@__PURE__*/ S.String;

export type DirectoryUnavailableReason =
  | "INVALID_DIRECTORY_STATE"
  | "DIRECTORY_TIMEOUT"
  | "DIRECTORY_RESOURCES_EXCEEDED"
  | "NO_DISK_SPACE"
  | "TRUST_AUTH_FAILURE"
  | (string & {});
export const DirectoryUnavailableReason = /*@__PURE__*/ S.String;

export type ValidationExceptionReason =
  | "INVALID_REALM"
  | "INVALID_DIRECTORY_TYPE"
  | "INVALID_SECONDARY_REGION"
  | "INVALID_NEXT_TOKEN"
  | "INVALID_ATTRIBUTE_VALUE"
  | "INVALID_ATTRIBUTE_NAME"
  | "INVALID_ATTRIBUTE_FOR_USER"
  | "INVALID_ATTRIBUTE_FOR_GROUP"
  | "INVALID_ATTRIBUTE_FOR_SEARCH"
  | "INVALID_ATTRIBUTE_FOR_MODIFY"
  | "DUPLICATE_ATTRIBUTE"
  | "MISSING_ATTRIBUTE"
  | "ATTRIBUTE_EXISTS"
  | "LDAP_SIZE_LIMIT_EXCEEDED"
  | "LDAP_UNSUPPORTED_OPERATION"
  | (string & {});
export const ValidationExceptionReason = /*@__PURE__*/ S.String;

export type AddGroupMemberError =
  | AccessDeniedException
  | ConflictException
  | DirectoryUnavailableException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds an existing user, group, or computer as a group member.
 */
export const addGroupMember: API.OperationMethod<
  AddGroupMemberRequest,
  AddGroupMemberResult,
  AddGroupMemberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AddGroupMemberRequest,
  output: AddGroupMemberResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    DirectoryUnavailableException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddGroupMember",
}));

export type CreateGroupError =
  | AccessDeniedException
  | ConflictException
  | DirectoryUnavailableException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new group.
 */
export const createGroup: API.OperationMethod<
  CreateGroupRequest,
  CreateGroupResult,
  CreateGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateGroupRequest,
  output: CreateGroupResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    DirectoryUnavailableException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGroup",
}));

export type CreateUserError =
  | AccessDeniedException
  | ConflictException
  | DirectoryUnavailableException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new user.
 */
export const createUser: API.OperationMethod<
  CreateUserRequest,
  CreateUserResult,
  CreateUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateUserRequest,
  output: CreateUserResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    DirectoryUnavailableException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUser",
}));

export type DeleteGroupError =
  | AccessDeniedException
  | ConflictException
  | DirectoryUnavailableException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a group.
 */
export const deleteGroup: API.OperationMethod<
  DeleteGroupRequest,
  DeleteGroupResult,
  DeleteGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteGroupRequest,
  output: DeleteGroupResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    DirectoryUnavailableException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGroup",
}));

export type DeleteUserError =
  | AccessDeniedException
  | ConflictException
  | DirectoryUnavailableException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a user.
 */
export const deleteUser: API.OperationMethod<
  DeleteUserRequest,
  DeleteUserResult,
  DeleteUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteUserRequest,
  output: DeleteUserResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    DirectoryUnavailableException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUser",
}));

export type DescribeGroupError =
  | AccessDeniedException
  | DirectoryUnavailableException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a specific group.
 */
export const describeGroup: API.OperationMethod<
  DescribeGroupRequest,
  DescribeGroupResult,
  DescribeGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeGroupRequest,
  output: DescribeGroupResult,
  errors: [
    AccessDeniedException,
    DirectoryUnavailableException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGroup",
}));

export type DescribeUserError =
  | AccessDeniedException
  | DirectoryUnavailableException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a specific user.
 */
export const describeUser: API.OperationMethod<
  DescribeUserRequest,
  DescribeUserResult,
  DescribeUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeUserRequest,
  output: DescribeUserResult,
  errors: [
    AccessDeniedException,
    DirectoryUnavailableException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeUser",
}));

export type DisableUserError =
  | AccessDeniedException
  | ConflictException
  | DirectoryUnavailableException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deactivates an active user account. For information about how to enable an inactive user
 * account, see ResetUserPassword
 * in the *Directory Service API Reference*.
 */
export const disableUser: API.OperationMethod<
  DisableUserRequest,
  DisableUserResult,
  DisableUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisableUserRequest,
  output: DisableUserResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    DirectoryUnavailableException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableUser",
}));

export type ListGroupMembersError =
  | AccessDeniedException
  | DirectoryUnavailableException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns member information for the specified group.
 *
 * This operation supports pagination with the use of the `NextToken` request and
 * response parameters. If more results are available, the
 * `ListGroupMembers.NextToken` member contains a token that you pass in the next
 * call to `ListGroupMembers`. This retrieves the next set of items.
 *
 * You can also specify a maximum number of return results with the `MaxResults`
 * parameter.
 */
export const listGroupMembers: API.PaginatedOperationMethod<
  ListGroupMembersRequest,
  ListGroupMembersResult,
  ListGroupMembersError,
  Credentials | HttpClient.HttpClient,
  Member
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListGroupMembersRequest,
  output: ListGroupMembersResult,
  errors: [
    AccessDeniedException,
    DirectoryUnavailableException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGroupMembers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Members",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListGroupsError =
  | AccessDeniedException
  | DirectoryUnavailableException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns group information for the specified directory.
 *
 * This operation supports pagination with the use of the `NextToken` request and
 * response parameters. If more results are available, the `ListGroups.NextToken`
 * member contains a token that you pass in the next call to `ListGroups`. This
 * retrieves the next set of items.
 *
 * You can also specify a maximum number of return results with the `MaxResults`
 * parameter.
 */
export const listGroups: API.PaginatedOperationMethod<
  ListGroupsRequest,
  ListGroupsResult,
  ListGroupsError,
  Credentials | HttpClient.HttpClient,
  GroupSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListGroupsRequest,
  output: ListGroupsResult,
  errors: [
    AccessDeniedException,
    DirectoryUnavailableException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
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

export type ListGroupsForMemberError =
  | AccessDeniedException
  | DirectoryUnavailableException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns group information for the specified member.
 *
 * This operation supports pagination with the use of the `NextToken` request and
 * response parameters. If more results are available, the
 * `ListGroupsForMember.NextToken` member contains a token that you pass in the next
 * call to `ListGroupsForMember`. This retrieves the next set of items.
 *
 * You can also specify a maximum number of return results with the `MaxResults`
 * parameter.
 */
export const listGroupsForMember: API.PaginatedOperationMethod<
  ListGroupsForMemberRequest,
  ListGroupsForMemberResult,
  ListGroupsForMemberError,
  Credentials | HttpClient.HttpClient,
  GroupSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListGroupsForMemberRequest,
  output: ListGroupsForMemberResult,
  errors: [
    AccessDeniedException,
    DirectoryUnavailableException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGroupsForMember",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Groups",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListUsersError =
  | AccessDeniedException
  | DirectoryUnavailableException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns user information for the specified directory.
 *
 * This operation supports pagination with the use of the `NextToken` request and
 * response parameters. If more results are available, the `ListUsers.NextToken`
 * member contains a token that you pass in the next call to `ListUsers`. This
 * retrieves the next set of items.
 *
 * You can also specify a maximum number of return results with the `MaxResults`
 * parameter.
 */
export const listUsers: API.PaginatedOperationMethod<
  ListUsersRequest,
  ListUsersResult,
  ListUsersError,
  Credentials | HttpClient.HttpClient,
  UserSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListUsersRequest,
  output: ListUsersResult,
  errors: [
    AccessDeniedException,
    DirectoryUnavailableException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
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

export type RemoveGroupMemberError =
  | AccessDeniedException
  | ConflictException
  | DirectoryUnavailableException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes a member from a group.
 */
export const removeGroupMember: API.OperationMethod<
  RemoveGroupMemberRequest,
  RemoveGroupMemberResult,
  RemoveGroupMemberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RemoveGroupMemberRequest,
  output: RemoveGroupMemberResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    DirectoryUnavailableException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveGroupMember",
}));

export type SearchGroupsError =
  | AccessDeniedException
  | DirectoryUnavailableException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Searches the specified directory for a group. You can find groups that match the
 * `SearchString` parameter with the value of their attributes included in the
 * `SearchString` parameter.
 *
 * This operation supports pagination with the use of the `NextToken` request and
 * response parameters. If more results are available, the `SearchGroups.NextToken`
 * member contains a token that you pass in the next call to `SearchGroups`. This
 * retrieves the next set of items.
 *
 * You can also specify a maximum number of return results with the `MaxResults`
 * parameter.
 */
export const searchGroups: API.PaginatedOperationMethod<
  SearchGroupsRequest,
  SearchGroupsResult,
  SearchGroupsError,
  Credentials | HttpClient.HttpClient,
  Group
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: SearchGroupsRequest,
  output: SearchGroupsResult,
  errors: [
    AccessDeniedException,
    DirectoryUnavailableException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Groups",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type SearchUsersError =
  | AccessDeniedException
  | DirectoryUnavailableException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Searches the specified directory for a user. You can find users that match the
 * `SearchString` parameter with the value of their attributes included in the
 * `SearchString` parameter.
 *
 * This operation supports pagination with the use of the `NextToken` request and
 * response parameters. If more results are available, the `SearchUsers.NextToken`
 * member contains a token that you pass in the next call to `SearchUsers`. This
 * retrieves the next set of items.
 *
 * You can also specify a maximum number of return results with the `MaxResults`
 * parameter.
 */
export const searchUsers: API.PaginatedOperationMethod<
  SearchUsersRequest,
  SearchUsersResult,
  SearchUsersError,
  Credentials | HttpClient.HttpClient,
  User
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: SearchUsersRequest,
  output: SearchUsersResult,
  errors: [
    AccessDeniedException,
    DirectoryUnavailableException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchUsers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Users",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type UpdateGroupError =
  | AccessDeniedException
  | ConflictException
  | DirectoryUnavailableException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates group information.
 */
export const updateGroup: API.OperationMethod<
  UpdateGroupRequest,
  UpdateGroupResult,
  UpdateGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateGroupRequest,
  output: UpdateGroupResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    DirectoryUnavailableException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGroup",
}));

export type UpdateUserError =
  | AccessDeniedException
  | ConflictException
  | DirectoryUnavailableException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates user information.
 */
export const updateUser: API.OperationMethod<
  UpdateUserRequest,
  UpdateUserResult,
  UpdateUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateUserRequest,
  output: UpdateUserResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    DirectoryUnavailableException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUser",
}));
