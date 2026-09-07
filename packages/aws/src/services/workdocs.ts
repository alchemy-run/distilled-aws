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
const ns = T.XmlNamespace("https://aws.amazon.com/api/v1/");
const svc = T.AwsApiService({
  sdkId: "WorkDocs",
  serviceShapeName: "AWSGorillaBoyService",
});
const auth = T.AwsAuthSigv4({ name: "workdocs" });
const ver = T.ServiceVersion("2016-05-01");
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
              `https://workdocs-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://workdocs-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://workdocs.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://workdocs.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class ConcurrentModificationException
  extends /*@__PURE__*/ S.TaggedError<ConcurrentModificationException>()(
    "ConcurrentModificationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ConflictingOperationException
  extends /*@__PURE__*/ S.TaggedError<ConflictingOperationException>()(
    "ConflictingOperationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class CustomMetadataLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<CustomMetadataLimitExceededException>()(
    "CustomMetadataLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class DeactivatingLastSystemUserException
  extends /*@__PURE__*/ S.TaggedError<DeactivatingLastSystemUserException>()(
    "DeactivatingLastSystemUserException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Code: S.optional(S.String),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class DocumentLockedForCommentsException
  extends /*@__PURE__*/ S.TaggedError<DocumentLockedForCommentsException>()(
    "DocumentLockedForCommentsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class DraftUploadOutOfSyncException
  extends /*@__PURE__*/ S.TaggedError<DraftUploadOutOfSyncException>()(
    "DraftUploadOutOfSyncException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class EntityAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<EntityAlreadyExistsException>()(
    "EntityAlreadyExistsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError, C.withAlreadyExistsError) {}
export class EntityNotExistsException
  extends /*@__PURE__*/ S.TaggedError<EntityNotExistsException>()(
    "EntityNotExistsException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      EntityIds: S.optional(
        S.suspend(() => EntityIdList).annotate({ identifier: "EntityIdList" }),
      ),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class FailedDependencyException
  extends /*@__PURE__*/ S.TaggedError<FailedDependencyException>()(
    "FailedDependencyException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(424),
  ) {}
export class IllegalUserStateException
  extends /*@__PURE__*/ S.TaggedError<IllegalUserStateException>()(
    "IllegalUserStateException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InvalidArgumentException
  extends /*@__PURE__*/ S.TaggedError<InvalidArgumentException>()(
    "InvalidArgumentException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidCommentOperationException
  extends /*@__PURE__*/ S.TaggedError<InvalidCommentOperationException>()(
    "InvalidCommentOperationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InvalidOperationException
  extends /*@__PURE__*/ S.TaggedError<InvalidOperationException>()(
    "InvalidOperationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(405),
  ).pipe(C.withBadRequestError) {}
export class InvalidPasswordException
  extends /*@__PURE__*/ S.TaggedError<InvalidPasswordException>()(
    "InvalidPasswordException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(401),
  ).pipe(C.withAuthError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ProhibitedStateException
  extends /*@__PURE__*/ S.TaggedError<ProhibitedStateException>()(
    "ProhibitedStateException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class RequestedEntityTooLargeException
  extends /*@__PURE__*/ S.TaggedError<RequestedEntityTooLargeException>()(
    "RequestedEntityTooLargeException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(413),
  ).pipe(C.withBadRequestError) {}
export class ResourceAlreadyCheckedOutException
  extends /*@__PURE__*/ S.TaggedError<ResourceAlreadyCheckedOutException>()(
    "ResourceAlreadyCheckedOutException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(503),
  ).pipe(C.withServerError) {}
export class StorageLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<StorageLimitExceededException>()(
    "StorageLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class StorageLimitWillExceedException
  extends /*@__PURE__*/ S.TaggedError<StorageLimitWillExceedException>()(
    "StorageLimitWillExceedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(413),
  ).pipe(C.withBadRequestError) {}
export class TooManyLabelsException
  extends /*@__PURE__*/ S.TaggedError<TooManyLabelsException>()(
    "TooManyLabelsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class TooManySubscriptionsException
  extends /*@__PURE__*/ S.TaggedError<TooManySubscriptionsException>()(
    "TooManySubscriptionsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class UnauthorizedOperationException
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedOperationException>()(
    "UnauthorizedOperationException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Code: S.optional(S.String),
    },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class UnauthorizedResourceAccessException
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedResourceAccessException>()(
    "UnauthorizedResourceAccessException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError, C.withAuthError) {}
export type AuthenticationHeaderType = string | redacted.Redacted<string>;
export type ResourceIdType = string;
export type DocumentVersionIdType = string;
export interface AbortDocumentVersionUploadRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  DocumentId: string;
  VersionId: string;
}
export const AbortDocumentVersionUploadRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthenticationToken: S.optional(SensitiveString).pipe(
      T.HttpHeader("Authentication"),
    ),
    DocumentId: S.String.pipe(T.HttpLabel("DocumentId")),
    VersionId: S.String.pipe(T.HttpLabel("VersionId")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "DELETE",
        uri: "/api/v1/documents/{DocumentId}/versions/{VersionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AbortDocumentVersionUploadRequest",
}) as any as S.Schema<AbortDocumentVersionUploadRequest>;
export interface AbortDocumentVersionUploadResponse {}
export const AbortDocumentVersionUploadResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "AbortDocumentVersionUploadResponse",
}) as any as S.Schema<AbortDocumentVersionUploadResponse>;
export type IdType = string;
export interface ActivateUserRequest {
  UserId: string;
  AuthenticationToken?: string | redacted.Redacted<string>;
}
export const ActivateUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserId: S.String.pipe(T.HttpLabel("UserId")),
    AuthenticationToken: S.optional(SensitiveString).pipe(
      T.HttpHeader("Authentication"),
    ),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/api/v1/users/{UserId}/activation" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ActivateUserRequest",
}) as any as S.Schema<ActivateUserRequest>;
export type UsernameType = string | redacted.Redacted<string>;
export type EmailAddressType = string | redacted.Redacted<string>;
export type UserAttributeValueType = string | redacted.Redacted<string>;
export type UserStatusType = "ACTIVE" | "INACTIVE" | "PENDING" | (string & {});
export const UserStatusType = /*@__PURE__*/ S.String;

export type UserType =
  | "USER"
  | "ADMIN"
  | "POWERUSER"
  | "MINIMALUSER"
  | "WORKSPACESUSER"
  | (string & {});
export const UserType = /*@__PURE__*/ S.String;

export type TimeZoneIdType = string;
export type LocaleType =
  | "en"
  | "fr"
  | "ko"
  | "de"
  | "es"
  | "ja"
  | "ru"
  | "zh_CN"
  | "zh_TW"
  | "pt_BR"
  | "default"
  | (string & {});
export const LocaleType = /*@__PURE__*/ S.String;

export type SizeType = number;
export type PositiveSizeType = number;
export type StorageType = "UNLIMITED" | "QUOTA" | (string & {});
export const StorageType = /*@__PURE__*/ S.String;

export interface StorageRuleType {
  StorageAllocatedInBytes?: number;
  StorageType?: StorageType;
}
export const StorageRuleType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StorageAllocatedInBytes: S.optional(S.Number),
    StorageType: S.optional(StorageType),
  }),
).annotate({
  identifier: "StorageRuleType",
}) as any as S.Schema<StorageRuleType>;
export interface UserStorageMetadata {
  StorageUtilizedInBytes?: number;
  StorageRule?: StorageRuleType;
}
export const UserStorageMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StorageUtilizedInBytes: S.optional(S.Number),
    StorageRule: S.optional(StorageRuleType),
  }),
).annotate({
  identifier: "UserStorageMetadata",
}) as any as S.Schema<UserStorageMetadata>;
export interface User {
  Id?: string;
  Username?: string | redacted.Redacted<string>;
  EmailAddress?: string | redacted.Redacted<string>;
  GivenName?: string | redacted.Redacted<string>;
  Surname?: string | redacted.Redacted<string>;
  OrganizationId?: string;
  RootFolderId?: string;
  RecycleBinFolderId?: string;
  Status?: UserStatusType;
  Type?: UserType;
  CreatedTimestamp?: Date;
  ModifiedTimestamp?: Date;
  TimeZoneId?: string;
  Locale?: LocaleType;
  Storage?: UserStorageMetadata;
}
export const User = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Username: S.optional(SensitiveString),
    EmailAddress: S.optional(SensitiveString),
    GivenName: S.optional(SensitiveString),
    Surname: S.optional(SensitiveString),
    OrganizationId: S.optional(S.String),
    RootFolderId: S.optional(S.String),
    RecycleBinFolderId: S.optional(S.String),
    Status: S.optional(UserStatusType),
    Type: S.optional(UserType),
    CreatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ModifiedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    TimeZoneId: S.optional(S.String),
    Locale: S.optional(LocaleType),
    Storage: S.optional(UserStorageMetadata),
  }),
).annotate({ identifier: "User" }) as any as S.Schema<User>;
export interface ActivateUserResponse {
  User?: User;
}
export const ActivateUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ User: S.optional(User) }).pipe(ns),
).annotate({
  identifier: "ActivateUserResponse",
}) as any as S.Schema<ActivateUserResponse>;
export type PrincipalType =
  | "USER"
  | "GROUP"
  | "INVITE"
  | "ANONYMOUS"
  | "ORGANIZATION"
  | (string & {});
export const PrincipalType = /*@__PURE__*/ S.String;

export type RoleType =
  | "VIEWER"
  | "CONTRIBUTOR"
  | "OWNER"
  | "COOWNER"
  | (string & {});
export const RoleType = /*@__PURE__*/ S.String;

export interface SharePrincipal {
  Id: string;
  Type: PrincipalType;
  Role: RoleType;
}
export const SharePrincipal = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.String, Type: PrincipalType, Role: RoleType }),
).annotate({ identifier: "SharePrincipal" }) as any as S.Schema<SharePrincipal>;
export type SharePrincipalList = SharePrincipal[];
export const SharePrincipalList = /*@__PURE__*/ S.Array(SharePrincipal);
export type MessageType = string | redacted.Redacted<string>;
export interface NotificationOptions {
  SendEmail?: boolean;
  EmailMessage?: string | redacted.Redacted<string>;
}
export const NotificationOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SendEmail: S.optional(S.Boolean),
    EmailMessage: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "NotificationOptions",
}) as any as S.Schema<NotificationOptions>;
export interface AddResourcePermissionsRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  ResourceId: string;
  Principals: SharePrincipal[];
  NotificationOptions?: NotificationOptions;
}
export const AddResourcePermissionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthenticationToken: S.optional(SensitiveString).pipe(
      T.HttpHeader("Authentication"),
    ),
    ResourceId: S.String.pipe(T.HttpLabel("ResourceId")),
    Principals: SharePrincipalList,
    NotificationOptions: S.optional(NotificationOptions),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "POST",
        uri: "/api/v1/resources/{ResourceId}/permissions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AddResourcePermissionsRequest",
}) as any as S.Schema<AddResourcePermissionsRequest>;
export type ShareStatusType = "SUCCESS" | "FAILURE" | (string & {});
export const ShareStatusType = /*@__PURE__*/ S.String;

export interface ShareResult {
  PrincipalId?: string;
  InviteePrincipalId?: string;
  Role?: RoleType;
  Status?: ShareStatusType;
  ShareId?: string;
  StatusMessage?: string | redacted.Redacted<string>;
}
export const ShareResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PrincipalId: S.optional(S.String),
    InviteePrincipalId: S.optional(S.String),
    Role: S.optional(RoleType),
    Status: S.optional(ShareStatusType),
    ShareId: S.optional(S.String),
    StatusMessage: S.optional(SensitiveString),
  }),
).annotate({ identifier: "ShareResult" }) as any as S.Schema<ShareResult>;
export type ShareResultsList = ShareResult[];
export const ShareResultsList = /*@__PURE__*/ S.Array(ShareResult);
export interface AddResourcePermissionsResponse {
  ShareResults?: ShareResult[];
}
export const AddResourcePermissionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ShareResults: S.optional(ShareResultsList) }).pipe(ns),
).annotate({
  identifier: "AddResourcePermissionsResponse",
}) as any as S.Schema<AddResourcePermissionsResponse>;
export type CommentIdType = string;
export type CommentTextType = string | redacted.Redacted<string>;
export type CommentVisibilityType = "PUBLIC" | "PRIVATE" | (string & {});
export const CommentVisibilityType = /*@__PURE__*/ S.String;

export interface CreateCommentRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  DocumentId: string;
  VersionId: string;
  ParentId?: string;
  ThreadId?: string;
  Text: string | redacted.Redacted<string>;
  Visibility?: CommentVisibilityType;
  NotifyCollaborators?: boolean;
}
export const CreateCommentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthenticationToken: S.optional(SensitiveString).pipe(
      T.HttpHeader("Authentication"),
    ),
    DocumentId: S.String.pipe(T.HttpLabel("DocumentId")),
    VersionId: S.String.pipe(T.HttpLabel("VersionId")),
    ParentId: S.optional(S.String),
    ThreadId: S.optional(S.String),
    Text: SensitiveString,
    Visibility: S.optional(CommentVisibilityType),
    NotifyCollaborators: S.optional(S.Boolean),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "POST",
        uri: "/api/v1/documents/{DocumentId}/versions/{VersionId}/comment",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateCommentRequest",
}) as any as S.Schema<CreateCommentRequest>;
export type CommentStatusType =
  | "DRAFT"
  | "PUBLISHED"
  | "DELETED"
  | (string & {});
export const CommentStatusType = /*@__PURE__*/ S.String;

export interface Comment {
  CommentId: string;
  ParentId?: string;
  ThreadId?: string;
  Text?: string | redacted.Redacted<string>;
  Contributor?: User;
  CreatedTimestamp?: Date;
  Status?: CommentStatusType;
  Visibility?: CommentVisibilityType;
  RecipientId?: string;
}
export const Comment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CommentId: S.String,
    ParentId: S.optional(S.String),
    ThreadId: S.optional(S.String),
    Text: S.optional(SensitiveString),
    Contributor: S.optional(User),
    CreatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Status: S.optional(CommentStatusType),
    Visibility: S.optional(CommentVisibilityType),
    RecipientId: S.optional(S.String),
  }),
).annotate({ identifier: "Comment" }) as any as S.Schema<Comment>;
export interface CreateCommentResponse {
  Comment?: Comment;
}
export const CreateCommentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Comment: S.optional(Comment) }).pipe(ns),
).annotate({
  identifier: "CreateCommentResponse",
}) as any as S.Schema<CreateCommentResponse>;
export type CustomMetadataKeyType = string;
export type CustomMetadataValueType = string;
export type CustomMetadataMap = { [key: string]: string | undefined };
export const CustomMetadataMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateCustomMetadataRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  ResourceId: string;
  VersionId?: string;
  CustomMetadata: { [key: string]: string | undefined };
}
export const CreateCustomMetadataRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthenticationToken: S.optional(SensitiveString).pipe(
      T.HttpHeader("Authentication"),
    ),
    ResourceId: S.String.pipe(T.HttpLabel("ResourceId")),
    VersionId: S.optional(S.String).pipe(T.HttpQuery("versionid")),
    CustomMetadata: CustomMetadataMap,
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "PUT",
        uri: "/api/v1/resources/{ResourceId}/customMetadata",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateCustomMetadataRequest",
}) as any as S.Schema<CreateCustomMetadataRequest>;
export interface CreateCustomMetadataResponse {}
export const CreateCustomMetadataResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "CreateCustomMetadataResponse",
}) as any as S.Schema<CreateCustomMetadataResponse>;
export type ResourceNameType = string | redacted.Redacted<string>;
export interface CreateFolderRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  Name?: string | redacted.Redacted<string>;
  ParentFolderId: string;
}
export const CreateFolderRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthenticationToken: S.optional(SensitiveString).pipe(
      T.HttpHeader("Authentication"),
    ),
    Name: S.optional(SensitiveString),
    ParentFolderId: S.String,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/api/v1/folders" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateFolderRequest",
}) as any as S.Schema<CreateFolderRequest>;
export type ResourceStateType =
  | "ACTIVE"
  | "RESTORING"
  | "RECYCLING"
  | "RECYCLED"
  | (string & {});
export const ResourceStateType = /*@__PURE__*/ S.String;

export type HashType = string;
export type SharedLabel = string;
export type SharedLabels = string[];
export const SharedLabels = /*@__PURE__*/ S.Array(S.String);
export interface FolderMetadata {
  Id?: string;
  Name?: string | redacted.Redacted<string>;
  CreatorId?: string;
  ParentFolderId?: string;
  CreatedTimestamp?: Date;
  ModifiedTimestamp?: Date;
  ResourceState?: ResourceStateType;
  Signature?: string;
  Labels?: string[];
  Size?: number;
  LatestVersionSize?: number;
}
export const FolderMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Name: S.optional(SensitiveString),
    CreatorId: S.optional(S.String),
    ParentFolderId: S.optional(S.String),
    CreatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ModifiedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ResourceState: S.optional(ResourceStateType),
    Signature: S.optional(S.String),
    Labels: S.optional(SharedLabels),
    Size: S.optional(S.Number),
    LatestVersionSize: S.optional(S.Number),
  }),
).annotate({ identifier: "FolderMetadata" }) as any as S.Schema<FolderMetadata>;
export interface CreateFolderResponse {
  Metadata?: FolderMetadata;
}
export const CreateFolderResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Metadata: S.optional(FolderMetadata) }).pipe(ns),
).annotate({
  identifier: "CreateFolderResponse",
}) as any as S.Schema<CreateFolderResponse>;
export interface CreateLabelsRequest {
  ResourceId: string;
  Labels: string[];
  AuthenticationToken?: string | redacted.Redacted<string>;
}
export const CreateLabelsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceId: S.String.pipe(T.HttpLabel("ResourceId")),
    Labels: SharedLabels,
    AuthenticationToken: S.optional(SensitiveString).pipe(
      T.HttpHeader("Authentication"),
    ),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "PUT", uri: "/api/v1/resources/{ResourceId}/labels" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateLabelsRequest",
}) as any as S.Schema<CreateLabelsRequest>;
export interface CreateLabelsResponse {}
export const CreateLabelsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "CreateLabelsResponse",
}) as any as S.Schema<CreateLabelsResponse>;
export type SubscriptionEndPointType = string;
export type SubscriptionProtocolType = "HTTPS" | "SQS" | (string & {});
export const SubscriptionProtocolType = /*@__PURE__*/ S.String;

export type SubscriptionType = "ALL" | (string & {});
export const SubscriptionType = /*@__PURE__*/ S.String;

export interface CreateNotificationSubscriptionRequest {
  OrganizationId: string;
  Endpoint: string;
  Protocol: SubscriptionProtocolType;
  SubscriptionType: SubscriptionType;
}
export const CreateNotificationSubscriptionRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      OrganizationId: S.String.pipe(T.HttpLabel("OrganizationId")),
      Endpoint: S.String,
      Protocol: SubscriptionProtocolType,
      SubscriptionType: SubscriptionType,
    }).pipe(
      T.all(
        ns,
        T.Http({
          method: "POST",
          uri: "/api/v1/organizations/{OrganizationId}/subscriptions",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateNotificationSubscriptionRequest",
}) as any as S.Schema<CreateNotificationSubscriptionRequest>;
export interface Subscription {
  SubscriptionId?: string;
  EndPoint?: string;
  Protocol?: SubscriptionProtocolType;
}
export const Subscription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SubscriptionId: S.optional(S.String),
    EndPoint: S.optional(S.String),
    Protocol: S.optional(SubscriptionProtocolType),
  }),
).annotate({ identifier: "Subscription" }) as any as S.Schema<Subscription>;
export interface CreateNotificationSubscriptionResponse {
  Subscription?: Subscription;
}
export const CreateNotificationSubscriptionResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ Subscription: S.optional(Subscription) }).pipe(ns),
).annotate({
  identifier: "CreateNotificationSubscriptionResponse",
}) as any as S.Schema<CreateNotificationSubscriptionResponse>;
export type PasswordType = string | redacted.Redacted<string>;
export interface CreateUserRequest {
  OrganizationId?: string;
  Username: string | redacted.Redacted<string>;
  EmailAddress?: string | redacted.Redacted<string>;
  GivenName: string | redacted.Redacted<string>;
  Surname: string | redacted.Redacted<string>;
  Password: string | redacted.Redacted<string>;
  TimeZoneId?: string;
  StorageRule?: StorageRuleType;
  AuthenticationToken?: string | redacted.Redacted<string>;
}
export const CreateUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OrganizationId: S.optional(S.String),
    Username: SensitiveString,
    EmailAddress: S.optional(SensitiveString),
    GivenName: SensitiveString,
    Surname: SensitiveString,
    Password: SensitiveString,
    TimeZoneId: S.optional(S.String),
    StorageRule: S.optional(StorageRuleType),
    AuthenticationToken: S.optional(SensitiveString).pipe(
      T.HttpHeader("Authentication"),
    ),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/api/v1/users" }),
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
export interface CreateUserResponse {
  User?: User;
}
export const CreateUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ User: S.optional(User) }).pipe(ns),
).annotate({
  identifier: "CreateUserResponse",
}) as any as S.Schema<CreateUserResponse>;
export interface DeactivateUserRequest {
  UserId: string;
  AuthenticationToken?: string | redacted.Redacted<string>;
}
export const DeactivateUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserId: S.String.pipe(T.HttpLabel("UserId")),
    AuthenticationToken: S.optional(SensitiveString).pipe(
      T.HttpHeader("Authentication"),
    ),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "DELETE", uri: "/api/v1/users/{UserId}/activation" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeactivateUserRequest",
}) as any as S.Schema<DeactivateUserRequest>;
export interface DeactivateUserResponse {}
export const DeactivateUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeactivateUserResponse",
}) as any as S.Schema<DeactivateUserResponse>;
export interface DeleteCommentRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  DocumentId: string;
  VersionId: string;
  CommentId: string;
}
export const DeleteCommentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthenticationToken: S.optional(SensitiveString).pipe(
      T.HttpHeader("Authentication"),
    ),
    DocumentId: S.String.pipe(T.HttpLabel("DocumentId")),
    VersionId: S.String.pipe(T.HttpLabel("VersionId")),
    CommentId: S.String.pipe(T.HttpLabel("CommentId")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "DELETE",
        uri: "/api/v1/documents/{DocumentId}/versions/{VersionId}/comment/{CommentId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteCommentRequest",
}) as any as S.Schema<DeleteCommentRequest>;
export interface DeleteCommentResponse {}
export const DeleteCommentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteCommentResponse",
}) as any as S.Schema<DeleteCommentResponse>;
export type CustomMetadataKeyList = string[];
export const CustomMetadataKeyList = /*@__PURE__*/ S.Array(S.String);
export interface DeleteCustomMetadataRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  ResourceId: string;
  VersionId?: string;
  Keys?: string[];
  DeleteAll?: boolean;
}
export const DeleteCustomMetadataRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthenticationToken: S.optional(SensitiveString).pipe(
      T.HttpHeader("Authentication"),
    ),
    ResourceId: S.String.pipe(T.HttpLabel("ResourceId")),
    VersionId: S.optional(S.String).pipe(T.HttpQuery("versionId")),
    Keys: S.optional(CustomMetadataKeyList).pipe(T.HttpQuery("keys")),
    DeleteAll: S.optional(S.Boolean).pipe(T.HttpQuery("deleteAll")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "DELETE",
        uri: "/api/v1/resources/{ResourceId}/customMetadata",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteCustomMetadataRequest",
}) as any as S.Schema<DeleteCustomMetadataRequest>;
export interface DeleteCustomMetadataResponse {}
export const DeleteCustomMetadataResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteCustomMetadataResponse",
}) as any as S.Schema<DeleteCustomMetadataResponse>;
export interface DeleteDocumentRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  DocumentId: string;
}
export const DeleteDocumentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthenticationToken: S.optional(SensitiveString).pipe(
      T.HttpHeader("Authentication"),
    ),
    DocumentId: S.String.pipe(T.HttpLabel("DocumentId")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "DELETE", uri: "/api/v1/documents/{DocumentId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDocumentRequest",
}) as any as S.Schema<DeleteDocumentRequest>;
export interface DeleteDocumentResponse {}
export const DeleteDocumentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteDocumentResponse",
}) as any as S.Schema<DeleteDocumentResponse>;
export interface DeleteDocumentVersionRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  DocumentId: string;
  VersionId: string;
  DeletePriorVersions: boolean;
}
export const DeleteDocumentVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthenticationToken: S.optional(SensitiveString).pipe(
      T.HttpHeader("Authentication"),
    ),
    DocumentId: S.String.pipe(T.HttpLabel("DocumentId")),
    VersionId: S.String.pipe(T.HttpLabel("VersionId")),
    DeletePriorVersions: S.Boolean.pipe(T.HttpQuery("deletePriorVersions")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "DELETE",
        uri: "/api/v1/documentVersions/{DocumentId}/versions/{VersionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDocumentVersionRequest",
}) as any as S.Schema<DeleteDocumentVersionRequest>;
export interface DeleteDocumentVersionResponse {}
export const DeleteDocumentVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteDocumentVersionResponse",
}) as any as S.Schema<DeleteDocumentVersionResponse>;
export interface DeleteFolderRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  FolderId: string;
}
export const DeleteFolderRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthenticationToken: S.optional(SensitiveString).pipe(
      T.HttpHeader("Authentication"),
    ),
    FolderId: S.String.pipe(T.HttpLabel("FolderId")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "DELETE", uri: "/api/v1/folders/{FolderId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteFolderRequest",
}) as any as S.Schema<DeleteFolderRequest>;
export interface DeleteFolderResponse {}
export const DeleteFolderResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteFolderResponse",
}) as any as S.Schema<DeleteFolderResponse>;
export interface DeleteFolderContentsRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  FolderId: string;
}
export const DeleteFolderContentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthenticationToken: S.optional(SensitiveString).pipe(
      T.HttpHeader("Authentication"),
    ),
    FolderId: S.String.pipe(T.HttpLabel("FolderId")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "DELETE", uri: "/api/v1/folders/{FolderId}/contents" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteFolderContentsRequest",
}) as any as S.Schema<DeleteFolderContentsRequest>;
export interface DeleteFolderContentsResponse {}
export const DeleteFolderContentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteFolderContentsResponse",
}) as any as S.Schema<DeleteFolderContentsResponse>;
export interface DeleteLabelsRequest {
  ResourceId: string;
  AuthenticationToken?: string | redacted.Redacted<string>;
  Labels?: string[];
  DeleteAll?: boolean;
}
export const DeleteLabelsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceId: S.String.pipe(T.HttpLabel("ResourceId")),
    AuthenticationToken: S.optional(SensitiveString).pipe(
      T.HttpHeader("Authentication"),
    ),
    Labels: S.optional(SharedLabels).pipe(T.HttpQuery("labels")),
    DeleteAll: S.optional(S.Boolean).pipe(T.HttpQuery("deleteAll")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "DELETE",
        uri: "/api/v1/resources/{ResourceId}/labels",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteLabelsRequest",
}) as any as S.Schema<DeleteLabelsRequest>;
export interface DeleteLabelsResponse {}
export const DeleteLabelsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteLabelsResponse",
}) as any as S.Schema<DeleteLabelsResponse>;
export interface DeleteNotificationSubscriptionRequest {
  SubscriptionId: string;
  OrganizationId: string;
}
export const DeleteNotificationSubscriptionRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      SubscriptionId: S.String.pipe(T.HttpLabel("SubscriptionId")),
      OrganizationId: S.String.pipe(T.HttpLabel("OrganizationId")),
    }).pipe(
      T.all(
        ns,
        T.Http({
          method: "DELETE",
          uri: "/api/v1/organizations/{OrganizationId}/subscriptions/{SubscriptionId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteNotificationSubscriptionRequest",
}) as any as S.Schema<DeleteNotificationSubscriptionRequest>;
export interface DeleteNotificationSubscriptionResponse {}
export const DeleteNotificationSubscriptionResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteNotificationSubscriptionResponse",
}) as any as S.Schema<DeleteNotificationSubscriptionResponse>;
export interface DeleteUserRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  UserId: string;
}
export const DeleteUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthenticationToken: S.optional(SensitiveString).pipe(
      T.HttpHeader("Authentication"),
    ),
    UserId: S.String.pipe(T.HttpLabel("UserId")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "DELETE", uri: "/api/v1/users/{UserId}" }),
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
export type ActivityNamesFilterType = string;
export type LimitType = number;
export type SearchMarkerType = string;
export interface DescribeActivitiesRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  StartTime?: Date;
  EndTime?: Date;
  OrganizationId?: string;
  ActivityTypes?: string;
  ResourceId?: string;
  UserId?: string;
  IncludeIndirectActivities?: boolean;
  Limit?: number;
  Marker?: string;
}
export const DescribeActivitiesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthenticationToken: S.optional(SensitiveString).pipe(
      T.HttpHeader("Authentication"),
    ),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
      T.HttpQuery("startTime"),
    ),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
      T.HttpQuery("endTime"),
    ),
    OrganizationId: S.optional(S.String).pipe(T.HttpQuery("organizationId")),
    ActivityTypes: S.optional(S.String).pipe(T.HttpQuery("activityTypes")),
    ResourceId: S.optional(S.String).pipe(T.HttpQuery("resourceId")),
    UserId: S.optional(S.String).pipe(T.HttpQuery("userId")),
    IncludeIndirectActivities: S.optional(S.Boolean).pipe(
      T.HttpQuery("includeIndirectActivities"),
    ),
    Limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
    Marker: S.optional(S.String).pipe(T.HttpQuery("marker")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/api/v1/activities" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeActivitiesRequest",
}) as any as S.Schema<DescribeActivitiesRequest>;
export type ActivityType =
  | "DOCUMENT_CHECKED_IN"
  | "DOCUMENT_CHECKED_OUT"
  | "DOCUMENT_RENAMED"
  | "DOCUMENT_VERSION_UPLOADED"
  | "DOCUMENT_VERSION_DELETED"
  | "DOCUMENT_VERSION_VIEWED"
  | "DOCUMENT_VERSION_DOWNLOADED"
  | "DOCUMENT_RECYCLED"
  | "DOCUMENT_RESTORED"
  | "DOCUMENT_REVERTED"
  | "DOCUMENT_SHARED"
  | "DOCUMENT_UNSHARED"
  | "DOCUMENT_SHARE_PERMISSION_CHANGED"
  | "DOCUMENT_SHAREABLE_LINK_CREATED"
  | "DOCUMENT_SHAREABLE_LINK_REMOVED"
  | "DOCUMENT_SHAREABLE_LINK_PERMISSION_CHANGED"
  | "DOCUMENT_MOVED"
  | "DOCUMENT_COMMENT_ADDED"
  | "DOCUMENT_COMMENT_DELETED"
  | "DOCUMENT_ANNOTATION_ADDED"
  | "DOCUMENT_ANNOTATION_DELETED"
  | "FOLDER_CREATED"
  | "FOLDER_DELETED"
  | "FOLDER_RENAMED"
  | "FOLDER_RECYCLED"
  | "FOLDER_RESTORED"
  | "FOLDER_SHARED"
  | "FOLDER_UNSHARED"
  | "FOLDER_SHARE_PERMISSION_CHANGED"
  | "FOLDER_SHAREABLE_LINK_CREATED"
  | "FOLDER_SHAREABLE_LINK_REMOVED"
  | "FOLDER_SHAREABLE_LINK_PERMISSION_CHANGED"
  | "FOLDER_MOVED"
  | (string & {});
export const ActivityType = /*@__PURE__*/ S.String;

export interface UserMetadata {
  Id?: string;
  Username?: string | redacted.Redacted<string>;
  GivenName?: string | redacted.Redacted<string>;
  Surname?: string | redacted.Redacted<string>;
  EmailAddress?: string | redacted.Redacted<string>;
}
export const UserMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Username: S.optional(SensitiveString),
    GivenName: S.optional(SensitiveString),
    Surname: S.optional(SensitiveString),
    EmailAddress: S.optional(SensitiveString),
  }),
).annotate({ identifier: "UserMetadata" }) as any as S.Schema<UserMetadata>;
export type UserMetadataList = UserMetadata[];
export const UserMetadataList = /*@__PURE__*/ S.Array(UserMetadata);
export type GroupNameType = string;
export interface GroupMetadata {
  Id?: string;
  Name?: string;
}
export const GroupMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.optional(S.String), Name: S.optional(S.String) }),
).annotate({ identifier: "GroupMetadata" }) as any as S.Schema<GroupMetadata>;
export type GroupMetadataList = GroupMetadata[];
export const GroupMetadataList = /*@__PURE__*/ S.Array(GroupMetadata);
export interface Participants {
  Users?: UserMetadata[];
  Groups?: GroupMetadata[];
}
export const Participants = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Users: S.optional(UserMetadataList),
    Groups: S.optional(GroupMetadataList),
  }),
).annotate({ identifier: "Participants" }) as any as S.Schema<Participants>;
export type ResourceType = "FOLDER" | "DOCUMENT" | (string & {});
export const ResourceType = /*@__PURE__*/ S.String;

export interface ResourceMetadata {
  Type?: ResourceType;
  Name?: string | redacted.Redacted<string>;
  OriginalName?: string | redacted.Redacted<string>;
  Id?: string;
  VersionId?: string;
  Owner?: UserMetadata;
  ParentId?: string;
}
export const ResourceMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(ResourceType),
    Name: S.optional(SensitiveString),
    OriginalName: S.optional(SensitiveString),
    Id: S.optional(S.String),
    VersionId: S.optional(S.String),
    Owner: S.optional(UserMetadata),
    ParentId: S.optional(S.String),
  }),
).annotate({
  identifier: "ResourceMetadata",
}) as any as S.Schema<ResourceMetadata>;
export interface CommentMetadata {
  CommentId?: string;
  Contributor?: User;
  CreatedTimestamp?: Date;
  CommentStatus?: CommentStatusType;
  RecipientId?: string;
  ContributorId?: string;
}
export const CommentMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CommentId: S.optional(S.String),
    Contributor: S.optional(User),
    CreatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    CommentStatus: S.optional(CommentStatusType),
    RecipientId: S.optional(S.String),
    ContributorId: S.optional(S.String),
  }),
).annotate({
  identifier: "CommentMetadata",
}) as any as S.Schema<CommentMetadata>;
export interface Activity {
  Type?: ActivityType;
  TimeStamp?: Date;
  IsIndirectActivity?: boolean;
  OrganizationId?: string;
  Initiator?: UserMetadata;
  Participants?: Participants;
  ResourceMetadata?: ResourceMetadata;
  OriginalParent?: ResourceMetadata;
  CommentMetadata?: CommentMetadata;
}
export const Activity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(ActivityType),
    TimeStamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    IsIndirectActivity: S.optional(S.Boolean),
    OrganizationId: S.optional(S.String),
    Initiator: S.optional(UserMetadata),
    Participants: S.optional(Participants),
    ResourceMetadata: S.optional(ResourceMetadata),
    OriginalParent: S.optional(ResourceMetadata),
    CommentMetadata: S.optional(CommentMetadata),
  }),
).annotate({ identifier: "Activity" }) as any as S.Schema<Activity>;
export type UserActivities = Activity[];
export const UserActivities = /*@__PURE__*/ S.Array(Activity);
export interface DescribeActivitiesResponse {
  UserActivities?: Activity[];
  Marker?: string;
}
export const DescribeActivitiesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserActivities: S.optional(UserActivities),
    Marker: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeActivitiesResponse",
}) as any as S.Schema<DescribeActivitiesResponse>;
export type MarkerType = string;
export interface DescribeCommentsRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  DocumentId: string;
  VersionId: string;
  Limit?: number;
  Marker?: string;
}
export const DescribeCommentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthenticationToken: S.optional(SensitiveString).pipe(
      T.HttpHeader("Authentication"),
    ),
    DocumentId: S.String.pipe(T.HttpLabel("DocumentId")),
    VersionId: S.String.pipe(T.HttpLabel("VersionId")),
    Limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
    Marker: S.optional(S.String).pipe(T.HttpQuery("marker")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/api/v1/documents/{DocumentId}/versions/{VersionId}/comments",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeCommentsRequest",
}) as any as S.Schema<DescribeCommentsRequest>;
export type CommentList = Comment[];
export const CommentList = /*@__PURE__*/ S.Array(Comment);
export interface DescribeCommentsResponse {
  Comments?: Comment[];
  Marker?: string;
}
export const DescribeCommentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Comments: S.optional(CommentList),
    Marker: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeCommentsResponse",
}) as any as S.Schema<DescribeCommentsResponse>;
export type PageMarkerType = string;
export type FieldNamesType = string;
export interface DescribeDocumentVersionsRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  DocumentId: string;
  Marker?: string;
  Limit?: number;
  Include?: string;
  Fields?: string;
}
export const DescribeDocumentVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthenticationToken: S.optional(SensitiveString).pipe(
      T.HttpHeader("Authentication"),
    ),
    DocumentId: S.String.pipe(T.HttpLabel("DocumentId")),
    Marker: S.optional(S.String).pipe(T.HttpQuery("marker")),
    Limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
    Include: S.optional(S.String).pipe(T.HttpQuery("include")),
    Fields: S.optional(S.String).pipe(T.HttpQuery("fields")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/api/v1/documents/{DocumentId}/versions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeDocumentVersionsRequest",
}) as any as S.Schema<DescribeDocumentVersionsRequest>;
export type DocumentContentType = string;
export type DocumentStatusType = "INITIALIZED" | "ACTIVE" | (string & {});
export const DocumentStatusType = /*@__PURE__*/ S.String;

export type DocumentThumbnailType =
  | "SMALL"
  | "SMALL_HQ"
  | "LARGE"
  | (string & {});
export const DocumentThumbnailType = /*@__PURE__*/ S.String;

export type UrlType = string | redacted.Redacted<string>;
export type DocumentThumbnailUrlMap = {
  [key in DocumentThumbnailType]?: string | redacted.Redacted<string>;
};
export const DocumentThumbnailUrlMap = /*@__PURE__*/ S.Record(
  DocumentThumbnailType,
  SensitiveString.pipe(S.optional),
);
export type DocumentSourceType = "ORIGINAL" | "WITH_COMMENTS" | (string & {});
export const DocumentSourceType = /*@__PURE__*/ S.String;

export type DocumentSourceUrlMap = {
  [key in DocumentSourceType]?: string | redacted.Redacted<string>;
};
export const DocumentSourceUrlMap = /*@__PURE__*/ S.Record(
  DocumentSourceType,
  SensitiveString.pipe(S.optional),
);
export interface DocumentVersionMetadata {
  Id?: string;
  Name?: string | redacted.Redacted<string>;
  ContentType?: string;
  Size?: number;
  Signature?: string;
  Status?: DocumentStatusType;
  CreatedTimestamp?: Date;
  ModifiedTimestamp?: Date;
  ContentCreatedTimestamp?: Date;
  ContentModifiedTimestamp?: Date;
  CreatorId?: string;
  Thumbnail?: { [key: string]: string | redacted.Redacted<string> | undefined };
  Source?: { [key: string]: string | redacted.Redacted<string> | undefined };
}
export const DocumentVersionMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Name: S.optional(SensitiveString),
    ContentType: S.optional(S.String),
    Size: S.optional(S.Number),
    Signature: S.optional(S.String),
    Status: S.optional(DocumentStatusType),
    CreatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ModifiedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ContentCreatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ContentModifiedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    CreatorId: S.optional(S.String),
    Thumbnail: S.optional(DocumentThumbnailUrlMap),
    Source: S.optional(DocumentSourceUrlMap),
  }),
).annotate({
  identifier: "DocumentVersionMetadata",
}) as any as S.Schema<DocumentVersionMetadata>;
export type DocumentVersionMetadataList = DocumentVersionMetadata[];
export const DocumentVersionMetadataList = /*@__PURE__*/ S.Array(
  DocumentVersionMetadata,
);
export interface DescribeDocumentVersionsResponse {
  DocumentVersions?: DocumentVersionMetadata[];
  Marker?: string;
}
export const DescribeDocumentVersionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DocumentVersions: S.optional(DocumentVersionMetadataList),
    Marker: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeDocumentVersionsResponse",
}) as any as S.Schema<DescribeDocumentVersionsResponse>;
export type ResourceSortType = "DATE" | "NAME" | (string & {});
export const ResourceSortType = /*@__PURE__*/ S.String;

export type OrderType = "ASCENDING" | "DESCENDING" | (string & {});
export const OrderType = /*@__PURE__*/ S.String;

export type FolderContentType = "ALL" | "DOCUMENT" | "FOLDER" | (string & {});
export const FolderContentType = /*@__PURE__*/ S.String;

export interface DescribeFolderContentsRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  FolderId: string;
  Sort?: ResourceSortType;
  Order?: OrderType;
  Limit?: number;
  Marker?: string;
  Type?: FolderContentType;
  Include?: string;
}
export const DescribeFolderContentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthenticationToken: S.optional(SensitiveString).pipe(
      T.HttpHeader("Authentication"),
    ),
    FolderId: S.String.pipe(T.HttpLabel("FolderId")),
    Sort: S.optional(ResourceSortType).pipe(T.HttpQuery("sort")),
    Order: S.optional(OrderType).pipe(T.HttpQuery("order")),
    Limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
    Marker: S.optional(S.String).pipe(T.HttpQuery("marker")),
    Type: S.optional(FolderContentType).pipe(T.HttpQuery("type")),
    Include: S.optional(S.String).pipe(T.HttpQuery("include")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/api/v1/folders/{FolderId}/contents" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeFolderContentsRequest",
}) as any as S.Schema<DescribeFolderContentsRequest>;
export type FolderMetadataList = FolderMetadata[];
export const FolderMetadataList = /*@__PURE__*/ S.Array(FolderMetadata);
export interface DocumentMetadata {
  Id?: string;
  CreatorId?: string;
  ParentFolderId?: string;
  CreatedTimestamp?: Date;
  ModifiedTimestamp?: Date;
  LatestVersionMetadata?: DocumentVersionMetadata;
  ResourceState?: ResourceStateType;
  Labels?: string[];
}
export const DocumentMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    CreatorId: S.optional(S.String),
    ParentFolderId: S.optional(S.String),
    CreatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ModifiedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LatestVersionMetadata: S.optional(DocumentVersionMetadata),
    ResourceState: S.optional(ResourceStateType),
    Labels: S.optional(SharedLabels),
  }),
).annotate({
  identifier: "DocumentMetadata",
}) as any as S.Schema<DocumentMetadata>;
export type DocumentMetadataList = DocumentMetadata[];
export const DocumentMetadataList = /*@__PURE__*/ S.Array(DocumentMetadata);
export interface DescribeFolderContentsResponse {
  Folders?: FolderMetadata[];
  Documents?: DocumentMetadata[];
  Marker?: string;
}
export const DescribeFolderContentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Folders: S.optional(FolderMetadataList),
    Documents: S.optional(DocumentMetadataList),
    Marker: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeFolderContentsResponse",
}) as any as S.Schema<DescribeFolderContentsResponse>;
export type SearchQueryType = string | redacted.Redacted<string>;
export type PositiveIntegerType = number;
export interface DescribeGroupsRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  SearchQuery: string | redacted.Redacted<string>;
  OrganizationId?: string;
  Marker?: string;
  Limit?: number;
}
export const DescribeGroupsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthenticationToken: S.optional(SensitiveString).pipe(
      T.HttpHeader("Authentication"),
    ),
    SearchQuery: SensitiveString.pipe(T.HttpQuery("searchQuery")),
    OrganizationId: S.optional(S.String).pipe(T.HttpQuery("organizationId")),
    Marker: S.optional(S.String).pipe(T.HttpQuery("marker")),
    Limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/api/v1/groups" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeGroupsRequest",
}) as any as S.Schema<DescribeGroupsRequest>;
export interface DescribeGroupsResponse {
  Groups?: GroupMetadata[];
  Marker?: string;
}
export const DescribeGroupsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Groups: S.optional(GroupMetadataList),
    Marker: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeGroupsResponse",
}) as any as S.Schema<DescribeGroupsResponse>;
export interface DescribeNotificationSubscriptionsRequest {
  OrganizationId: string;
  Marker?: string;
  Limit?: number;
}
export const DescribeNotificationSubscriptionsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      OrganizationId: S.String.pipe(T.HttpLabel("OrganizationId")),
      Marker: S.optional(S.String).pipe(T.HttpQuery("marker")),
      Limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
    }).pipe(
      T.all(
        ns,
        T.Http({
          method: "GET",
          uri: "/api/v1/organizations/{OrganizationId}/subscriptions",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeNotificationSubscriptionsRequest",
}) as any as S.Schema<DescribeNotificationSubscriptionsRequest>;
export type SubscriptionList = Subscription[];
export const SubscriptionList = /*@__PURE__*/ S.Array(Subscription);
export interface DescribeNotificationSubscriptionsResponse {
  Subscriptions?: Subscription[];
  Marker?: string;
}
export const DescribeNotificationSubscriptionsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Subscriptions: S.optional(SubscriptionList),
      Marker: S.optional(S.String),
    }).pipe(ns),
  ).annotate({
    identifier: "DescribeNotificationSubscriptionsResponse",
  }) as any as S.Schema<DescribeNotificationSubscriptionsResponse>;
export interface DescribeResourcePermissionsRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  ResourceId: string;
  PrincipalId?: string;
  Limit?: number;
  Marker?: string;
}
export const DescribeResourcePermissionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthenticationToken: S.optional(SensitiveString).pipe(
      T.HttpHeader("Authentication"),
    ),
    ResourceId: S.String.pipe(T.HttpLabel("ResourceId")),
    PrincipalId: S.optional(S.String).pipe(T.HttpQuery("principalId")),
    Limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
    Marker: S.optional(S.String).pipe(T.HttpQuery("marker")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/api/v1/resources/{ResourceId}/permissions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeResourcePermissionsRequest",
}) as any as S.Schema<DescribeResourcePermissionsRequest>;
export type RolePermissionType = "DIRECT" | "INHERITED" | (string & {});
export const RolePermissionType = /*@__PURE__*/ S.String;

export interface PermissionInfo {
  Role?: RoleType;
  Type?: RolePermissionType;
}
export const PermissionInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Role: S.optional(RoleType),
    Type: S.optional(RolePermissionType),
  }),
).annotate({ identifier: "PermissionInfo" }) as any as S.Schema<PermissionInfo>;
export type PermissionInfoList = PermissionInfo[];
export const PermissionInfoList = /*@__PURE__*/ S.Array(PermissionInfo);
export interface Principal {
  Id?: string;
  Type?: PrincipalType;
  Roles?: PermissionInfo[];
}
export const Principal = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Type: S.optional(PrincipalType),
    Roles: S.optional(PermissionInfoList),
  }),
).annotate({ identifier: "Principal" }) as any as S.Schema<Principal>;
export type PrincipalList = Principal[];
export const PrincipalList = /*@__PURE__*/ S.Array(Principal);
export interface DescribeResourcePermissionsResponse {
  Principals?: Principal[];
  Marker?: string;
}
export const DescribeResourcePermissionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Principals: S.optional(PrincipalList),
    Marker: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeResourcePermissionsResponse",
}) as any as S.Schema<DescribeResourcePermissionsResponse>;
export interface DescribeRootFoldersRequest {
  AuthenticationToken: string | redacted.Redacted<string>;
  Limit?: number;
  Marker?: string;
}
export const DescribeRootFoldersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthenticationToken: SensitiveString.pipe(T.HttpHeader("Authentication")),
    Limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
    Marker: S.optional(S.String).pipe(T.HttpQuery("marker")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/api/v1/me/root" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeRootFoldersRequest",
}) as any as S.Schema<DescribeRootFoldersRequest>;
export interface DescribeRootFoldersResponse {
  Folders?: FolderMetadata[];
  Marker?: string;
}
export const DescribeRootFoldersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Folders: S.optional(FolderMetadataList),
    Marker: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeRootFoldersResponse",
}) as any as S.Schema<DescribeRootFoldersResponse>;
export type UserIdsType = string;
export type UserFilterType = "ALL" | "ACTIVE_PENDING" | (string & {});
export const UserFilterType = /*@__PURE__*/ S.String;

export type UserSortType =
  | "USER_NAME"
  | "FULL_NAME"
  | "STORAGE_LIMIT"
  | "USER_STATUS"
  | "STORAGE_USED"
  | (string & {});
export const UserSortType = /*@__PURE__*/ S.String;

export interface DescribeUsersRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  OrganizationId?: string;
  UserIds?: string;
  Query?: string | redacted.Redacted<string>;
  Include?: UserFilterType;
  Order?: OrderType;
  Sort?: UserSortType;
  Marker?: string;
  Limit?: number;
  Fields?: string;
}
export const DescribeUsersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthenticationToken: S.optional(SensitiveString).pipe(
      T.HttpHeader("Authentication"),
    ),
    OrganizationId: S.optional(S.String).pipe(T.HttpQuery("organizationId")),
    UserIds: S.optional(S.String).pipe(T.HttpQuery("userIds")),
    Query: S.optional(SensitiveString).pipe(T.HttpQuery("query")),
    Include: S.optional(UserFilterType).pipe(T.HttpQuery("include")),
    Order: S.optional(OrderType).pipe(T.HttpQuery("order")),
    Sort: S.optional(UserSortType).pipe(T.HttpQuery("sort")),
    Marker: S.optional(S.String).pipe(T.HttpQuery("marker")),
    Limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
    Fields: S.optional(S.String).pipe(T.HttpQuery("fields")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/api/v1/users" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeUsersRequest",
}) as any as S.Schema<DescribeUsersRequest>;
export type OrganizationUserList = User[];
export const OrganizationUserList = /*@__PURE__*/ S.Array(User);
export interface DescribeUsersResponse {
  Users?: User[];
  TotalNumberOfUsers?: number;
  Marker?: string;
}
export const DescribeUsersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Users: S.optional(OrganizationUserList),
    TotalNumberOfUsers: S.optional(S.Number),
    Marker: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeUsersResponse",
}) as any as S.Schema<DescribeUsersResponse>;
export interface GetCurrentUserRequest {
  AuthenticationToken: string | redacted.Redacted<string>;
}
export const GetCurrentUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthenticationToken: SensitiveString.pipe(T.HttpHeader("Authentication")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/api/v1/me" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCurrentUserRequest",
}) as any as S.Schema<GetCurrentUserRequest>;
export interface GetCurrentUserResponse {
  User?: User;
}
export const GetCurrentUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ User: S.optional(User) }).pipe(ns),
).annotate({
  identifier: "GetCurrentUserResponse",
}) as any as S.Schema<GetCurrentUserResponse>;
export interface GetDocumentRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  DocumentId: string;
  IncludeCustomMetadata?: boolean;
}
export const GetDocumentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthenticationToken: S.optional(SensitiveString).pipe(
      T.HttpHeader("Authentication"),
    ),
    DocumentId: S.String.pipe(T.HttpLabel("DocumentId")),
    IncludeCustomMetadata: S.optional(S.Boolean).pipe(
      T.HttpQuery("includeCustomMetadata"),
    ),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/api/v1/documents/{DocumentId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDocumentRequest",
}) as any as S.Schema<GetDocumentRequest>;
export interface GetDocumentResponse {
  Metadata?: DocumentMetadata;
  CustomMetadata?: { [key: string]: string | undefined };
}
export const GetDocumentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Metadata: S.optional(DocumentMetadata),
    CustomMetadata: S.optional(CustomMetadataMap),
  }).pipe(ns),
).annotate({
  identifier: "GetDocumentResponse",
}) as any as S.Schema<GetDocumentResponse>;
export interface GetDocumentPathRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  DocumentId: string;
  Limit?: number;
  Fields?: string;
  Marker?: string;
}
export const GetDocumentPathRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthenticationToken: S.optional(SensitiveString).pipe(
      T.HttpHeader("Authentication"),
    ),
    DocumentId: S.String.pipe(T.HttpLabel("DocumentId")),
    Limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
    Fields: S.optional(S.String).pipe(T.HttpQuery("fields")),
    Marker: S.optional(S.String).pipe(T.HttpQuery("marker")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/api/v1/documents/{DocumentId}/path" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDocumentPathRequest",
}) as any as S.Schema<GetDocumentPathRequest>;
export interface ResourcePathComponent {
  Id?: string;
  Name?: string | redacted.Redacted<string>;
}
export const ResourcePathComponent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.optional(S.String), Name: S.optional(SensitiveString) }),
).annotate({
  identifier: "ResourcePathComponent",
}) as any as S.Schema<ResourcePathComponent>;
export type ResourcePathComponentList = ResourcePathComponent[];
export const ResourcePathComponentList = /*@__PURE__*/ S.Array(
  ResourcePathComponent,
);
export interface ResourcePath {
  Components?: ResourcePathComponent[];
}
export const ResourcePath = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Components: S.optional(ResourcePathComponentList) }),
).annotate({ identifier: "ResourcePath" }) as any as S.Schema<ResourcePath>;
export interface GetDocumentPathResponse {
  Path?: ResourcePath;
}
export const GetDocumentPathResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Path: S.optional(ResourcePath) }).pipe(ns),
).annotate({
  identifier: "GetDocumentPathResponse",
}) as any as S.Schema<GetDocumentPathResponse>;
export interface GetDocumentVersionRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  DocumentId: string;
  VersionId: string;
  Fields?: string;
  IncludeCustomMetadata?: boolean;
}
export const GetDocumentVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthenticationToken: S.optional(SensitiveString).pipe(
      T.HttpHeader("Authentication"),
    ),
    DocumentId: S.String.pipe(T.HttpLabel("DocumentId")),
    VersionId: S.String.pipe(T.HttpLabel("VersionId")),
    Fields: S.optional(S.String).pipe(T.HttpQuery("fields")),
    IncludeCustomMetadata: S.optional(S.Boolean).pipe(
      T.HttpQuery("includeCustomMetadata"),
    ),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/api/v1/documents/{DocumentId}/versions/{VersionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDocumentVersionRequest",
}) as any as S.Schema<GetDocumentVersionRequest>;
export interface GetDocumentVersionResponse {
  Metadata?: DocumentVersionMetadata;
  CustomMetadata?: { [key: string]: string | undefined };
}
export const GetDocumentVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Metadata: S.optional(DocumentVersionMetadata),
    CustomMetadata: S.optional(CustomMetadataMap),
  }).pipe(ns),
).annotate({
  identifier: "GetDocumentVersionResponse",
}) as any as S.Schema<GetDocumentVersionResponse>;
export interface GetFolderRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  FolderId: string;
  IncludeCustomMetadata?: boolean;
}
export const GetFolderRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthenticationToken: S.optional(SensitiveString).pipe(
      T.HttpHeader("Authentication"),
    ),
    FolderId: S.String.pipe(T.HttpLabel("FolderId")),
    IncludeCustomMetadata: S.optional(S.Boolean).pipe(
      T.HttpQuery("includeCustomMetadata"),
    ),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/api/v1/folders/{FolderId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetFolderRequest",
}) as any as S.Schema<GetFolderRequest>;
export interface GetFolderResponse {
  Metadata?: FolderMetadata;
  CustomMetadata?: { [key: string]: string | undefined };
}
export const GetFolderResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Metadata: S.optional(FolderMetadata),
    CustomMetadata: S.optional(CustomMetadataMap),
  }).pipe(ns),
).annotate({
  identifier: "GetFolderResponse",
}) as any as S.Schema<GetFolderResponse>;
export interface GetFolderPathRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  FolderId: string;
  Limit?: number;
  Fields?: string;
  Marker?: string;
}
export const GetFolderPathRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthenticationToken: S.optional(SensitiveString).pipe(
      T.HttpHeader("Authentication"),
    ),
    FolderId: S.String.pipe(T.HttpLabel("FolderId")),
    Limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
    Fields: S.optional(S.String).pipe(T.HttpQuery("fields")),
    Marker: S.optional(S.String).pipe(T.HttpQuery("marker")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/api/v1/folders/{FolderId}/path" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetFolderPathRequest",
}) as any as S.Schema<GetFolderPathRequest>;
export interface GetFolderPathResponse {
  Path?: ResourcePath;
}
export const GetFolderPathResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Path: S.optional(ResourcePath) }).pipe(ns),
).annotate({
  identifier: "GetFolderPathResponse",
}) as any as S.Schema<GetFolderPathResponse>;
export type ResourceCollectionType = "SHARED_WITH_ME" | (string & {});
export const ResourceCollectionType = /*@__PURE__*/ S.String;

export interface GetResourcesRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  UserId?: string;
  CollectionType?: ResourceCollectionType;
  Limit?: number;
  Marker?: string;
}
export const GetResourcesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthenticationToken: S.optional(SensitiveString).pipe(
      T.HttpHeader("Authentication"),
    ),
    UserId: S.optional(S.String).pipe(T.HttpQuery("userId")),
    CollectionType: S.optional(ResourceCollectionType).pipe(
      T.HttpQuery("collectionType"),
    ),
    Limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
    Marker: S.optional(S.String).pipe(T.HttpQuery("marker")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/api/v1/resources" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetResourcesRequest",
}) as any as S.Schema<GetResourcesRequest>;
export interface GetResourcesResponse {
  Folders?: FolderMetadata[];
  Documents?: DocumentMetadata[];
  Marker?: string;
}
export const GetResourcesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Folders: S.optional(FolderMetadataList),
    Documents: S.optional(DocumentMetadataList),
    Marker: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetResourcesResponse",
}) as any as S.Schema<GetResourcesResponse>;
export interface InitiateDocumentVersionUploadRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  Id?: string;
  Name?: string | redacted.Redacted<string>;
  ContentCreatedTimestamp?: Date;
  ContentModifiedTimestamp?: Date;
  ContentType?: string;
  DocumentSizeInBytes?: number;
  ParentFolderId?: string;
}
export const InitiateDocumentVersionUploadRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AuthenticationToken: S.optional(SensitiveString).pipe(
        T.HttpHeader("Authentication"),
      ),
      Id: S.optional(S.String),
      Name: S.optional(SensitiveString),
      ContentCreatedTimestamp: S.optional(
        S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      ),
      ContentModifiedTimestamp: S.optional(
        S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      ),
      ContentType: S.optional(S.String),
      DocumentSizeInBytes: S.optional(S.Number),
      ParentFolderId: S.optional(S.String),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/api/v1/documents" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "InitiateDocumentVersionUploadRequest",
}) as any as S.Schema<InitiateDocumentVersionUploadRequest>;
export type HeaderNameType = string;
export type HeaderValueType = string;
export type SignedHeaderMap = { [key: string]: string | undefined };
export const SignedHeaderMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface UploadMetadata {
  UploadUrl?: string | redacted.Redacted<string>;
  SignedHeaders?: { [key: string]: string | undefined };
}
export const UploadMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UploadUrl: S.optional(SensitiveString),
    SignedHeaders: S.optional(SignedHeaderMap),
  }),
).annotate({ identifier: "UploadMetadata" }) as any as S.Schema<UploadMetadata>;
export interface InitiateDocumentVersionUploadResponse {
  Metadata?: DocumentMetadata;
  UploadMetadata?: UploadMetadata;
}
export const InitiateDocumentVersionUploadResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Metadata: S.optional(DocumentMetadata),
      UploadMetadata: S.optional(UploadMetadata),
    }).pipe(ns),
).annotate({
  identifier: "InitiateDocumentVersionUploadResponse",
}) as any as S.Schema<InitiateDocumentVersionUploadResponse>;
export interface RemoveAllResourcePermissionsRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  ResourceId: string;
}
export const RemoveAllResourcePermissionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthenticationToken: S.optional(SensitiveString).pipe(
      T.HttpHeader("Authentication"),
    ),
    ResourceId: S.String.pipe(T.HttpLabel("ResourceId")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "DELETE",
        uri: "/api/v1/resources/{ResourceId}/permissions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RemoveAllResourcePermissionsRequest",
}) as any as S.Schema<RemoveAllResourcePermissionsRequest>;
export interface RemoveAllResourcePermissionsResponse {}
export const RemoveAllResourcePermissionsResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "RemoveAllResourcePermissionsResponse",
}) as any as S.Schema<RemoveAllResourcePermissionsResponse>;
export interface RemoveResourcePermissionRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  ResourceId: string;
  PrincipalId: string;
  PrincipalType?: PrincipalType;
}
export const RemoveResourcePermissionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthenticationToken: S.optional(SensitiveString).pipe(
      T.HttpHeader("Authentication"),
    ),
    ResourceId: S.String.pipe(T.HttpLabel("ResourceId")),
    PrincipalId: S.String.pipe(T.HttpLabel("PrincipalId")),
    PrincipalType: S.optional(PrincipalType).pipe(T.HttpQuery("type")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "DELETE",
        uri: "/api/v1/resources/{ResourceId}/permissions/{PrincipalId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RemoveResourcePermissionRequest",
}) as any as S.Schema<RemoveResourcePermissionRequest>;
export interface RemoveResourcePermissionResponse {}
export const RemoveResourcePermissionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "RemoveResourcePermissionResponse",
}) as any as S.Schema<RemoveResourcePermissionResponse>;
export interface RestoreDocumentVersionsRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  DocumentId: string;
}
export const RestoreDocumentVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthenticationToken: S.optional(SensitiveString).pipe(
      T.HttpHeader("Authentication"),
    ),
    DocumentId: S.String.pipe(T.HttpLabel("DocumentId")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "POST",
        uri: "/api/v1/documentVersions/restore/{DocumentId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RestoreDocumentVersionsRequest",
}) as any as S.Schema<RestoreDocumentVersionsRequest>;
export interface RestoreDocumentVersionsResponse {}
export const RestoreDocumentVersionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "RestoreDocumentVersionsResponse",
}) as any as S.Schema<RestoreDocumentVersionsResponse>;
export type SearchQueryScopeType = "NAME" | "CONTENT" | (string & {});
export const SearchQueryScopeType = /*@__PURE__*/ S.String;

export type SearchQueryScopeTypeList = SearchQueryScopeType[];
export const SearchQueryScopeTypeList =
  /*@__PURE__*/ S.Array(SearchQueryScopeType);
export type AdditionalResponseFieldType = "WEBURL" | (string & {});
export const AdditionalResponseFieldType = /*@__PURE__*/ S.String;

export type AdditionalResponseFieldsList = AdditionalResponseFieldType[];
export const AdditionalResponseFieldsList = /*@__PURE__*/ S.Array(
  AdditionalResponseFieldType,
);
export type LanguageCodeType =
  | "AR"
  | "BG"
  | "BN"
  | "DA"
  | "DE"
  | "CS"
  | "EL"
  | "EN"
  | "ES"
  | "FA"
  | "FI"
  | "FR"
  | "HI"
  | "HU"
  | "ID"
  | "IT"
  | "JA"
  | "KO"
  | "LT"
  | "LV"
  | "NL"
  | "NO"
  | "PT"
  | "RO"
  | "RU"
  | "SV"
  | "SW"
  | "TH"
  | "TR"
  | "ZH"
  | "DEFAULT"
  | (string & {});
export const LanguageCodeType = /*@__PURE__*/ S.String;

export type TextLocaleTypeList = LanguageCodeType[];
export const TextLocaleTypeList = /*@__PURE__*/ S.Array(LanguageCodeType);
export type ContentCategoryType =
  | "IMAGE"
  | "DOCUMENT"
  | "PDF"
  | "SPREADSHEET"
  | "PRESENTATION"
  | "AUDIO"
  | "VIDEO"
  | "SOURCE_CODE"
  | "OTHER"
  | (string & {});
export const ContentCategoryType = /*@__PURE__*/ S.String;

export type SearchContentCategoryTypeList = ContentCategoryType[];
export const SearchContentCategoryTypeList =
  /*@__PURE__*/ S.Array(ContentCategoryType);
export type SearchResourceType =
  | "FOLDER"
  | "DOCUMENT"
  | "COMMENT"
  | "DOCUMENT_VERSION"
  | (string & {});
export const SearchResourceType = /*@__PURE__*/ S.String;

export type SearchResourceTypeList = SearchResourceType[];
export const SearchResourceTypeList = /*@__PURE__*/ S.Array(SearchResourceType);
export type SearchLabel = string;
export type SearchLabelList = string[];
export const SearchLabelList = /*@__PURE__*/ S.Array(S.String);
export type PrincipalRoleType =
  | "VIEWER"
  | "CONTRIBUTOR"
  | "OWNER"
  | "COOWNER"
  | (string & {});
export const PrincipalRoleType = /*@__PURE__*/ S.String;

export type SearchPrincipalRoleList = PrincipalRoleType[];
export const SearchPrincipalRoleList = /*@__PURE__*/ S.Array(PrincipalRoleType);
export interface SearchPrincipalType {
  Id: string;
  Roles?: PrincipalRoleType[];
}
export const SearchPrincipalType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.String, Roles: S.optional(SearchPrincipalRoleList) }),
).annotate({
  identifier: "SearchPrincipalType",
}) as any as S.Schema<SearchPrincipalType>;
export type SearchPrincipalTypeList = SearchPrincipalType[];
export const SearchPrincipalTypeList =
  /*@__PURE__*/ S.Array(SearchPrincipalType);
export type SearchAncestorId = string;
export type SearchAncestorIdList = string[];
export const SearchAncestorIdList = /*@__PURE__*/ S.Array(S.String);
export type SearchCollectionType = "OWNED" | "SHARED_WITH_ME" | (string & {});
export const SearchCollectionType = /*@__PURE__*/ S.String;

export type SearchCollectionTypeList = SearchCollectionType[];
export const SearchCollectionTypeList =
  /*@__PURE__*/ S.Array(SearchCollectionType);
export type LongType = number;
export interface LongRangeType {
  StartValue?: number;
  EndValue?: number;
}
export const LongRangeType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartValue: S.optional(S.Number),
    EndValue: S.optional(S.Number),
  }),
).annotate({ identifier: "LongRangeType" }) as any as S.Schema<LongRangeType>;
export interface DateRangeType {
  StartValue?: Date;
  EndValue?: Date;
}
export const DateRangeType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartValue: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndValue: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "DateRangeType" }) as any as S.Schema<DateRangeType>;
export interface Filters {
  TextLocales?: LanguageCodeType[];
  ContentCategories?: ContentCategoryType[];
  ResourceTypes?: SearchResourceType[];
  Labels?: string[];
  Principals?: SearchPrincipalType[];
  AncestorIds?: string[];
  SearchCollectionTypes?: SearchCollectionType[];
  SizeRange?: LongRangeType;
  CreatedRange?: DateRangeType;
  ModifiedRange?: DateRangeType;
}
export const Filters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TextLocales: S.optional(TextLocaleTypeList),
    ContentCategories: S.optional(SearchContentCategoryTypeList),
    ResourceTypes: S.optional(SearchResourceTypeList),
    Labels: S.optional(SearchLabelList),
    Principals: S.optional(SearchPrincipalTypeList),
    AncestorIds: S.optional(SearchAncestorIdList),
    SearchCollectionTypes: S.optional(SearchCollectionTypeList),
    SizeRange: S.optional(LongRangeType),
    CreatedRange: S.optional(DateRangeType),
    ModifiedRange: S.optional(DateRangeType),
  }),
).annotate({ identifier: "Filters" }) as any as S.Schema<Filters>;
export type OrderByFieldType =
  | "RELEVANCE"
  | "NAME"
  | "SIZE"
  | "CREATED_TIMESTAMP"
  | "MODIFIED_TIMESTAMP"
  | (string & {});
export const OrderByFieldType = /*@__PURE__*/ S.String;

export type SortOrder = "ASC" | "DESC" | (string & {});
export const SortOrder = /*@__PURE__*/ S.String;

export interface SearchSortResult {
  Field?: OrderByFieldType;
  Order?: SortOrder;
}
export const SearchSortResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Field: S.optional(OrderByFieldType),
    Order: S.optional(SortOrder),
  }),
).annotate({
  identifier: "SearchSortResult",
}) as any as S.Schema<SearchSortResult>;
export type SearchResultSortList = SearchSortResult[];
export const SearchResultSortList = /*@__PURE__*/ S.Array(SearchSortResult);
export type SearchResultsLimitType = number;
export type NextMarkerType = string;
export interface SearchResourcesRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  QueryText?: string | redacted.Redacted<string>;
  QueryScopes?: SearchQueryScopeType[];
  OrganizationId?: string;
  AdditionalResponseFields?: AdditionalResponseFieldType[];
  Filters?: Filters;
  OrderBy?: SearchSortResult[];
  Limit?: number;
  Marker?: string;
}
export const SearchResourcesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthenticationToken: S.optional(SensitiveString).pipe(
      T.HttpHeader("Authentication"),
    ),
    QueryText: S.optional(SensitiveString),
    QueryScopes: S.optional(SearchQueryScopeTypeList),
    OrganizationId: S.optional(S.String),
    AdditionalResponseFields: S.optional(AdditionalResponseFieldsList),
    Filters: S.optional(Filters),
    OrderBy: S.optional(SearchResultSortList),
    Limit: S.optional(S.Number),
    Marker: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/api/v1/search" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SearchResourcesRequest",
}) as any as S.Schema<SearchResourcesRequest>;
export type ResponseItemType =
  | "DOCUMENT"
  | "FOLDER"
  | "COMMENT"
  | "DOCUMENT_VERSION"
  | (string & {});
export const ResponseItemType = /*@__PURE__*/ S.String;

export type ResponseItemWebUrl = string | redacted.Redacted<string>;
export interface ResponseItem {
  ResourceType?: ResponseItemType;
  WebUrl?: string | redacted.Redacted<string>;
  DocumentMetadata?: DocumentMetadata;
  FolderMetadata?: FolderMetadata;
  CommentMetadata?: CommentMetadata;
  DocumentVersionMetadata?: DocumentVersionMetadata;
}
export const ResponseItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceType: S.optional(ResponseItemType),
    WebUrl: S.optional(SensitiveString),
    DocumentMetadata: S.optional(DocumentMetadata),
    FolderMetadata: S.optional(FolderMetadata),
    CommentMetadata: S.optional(CommentMetadata),
    DocumentVersionMetadata: S.optional(DocumentVersionMetadata),
  }),
).annotate({ identifier: "ResponseItem" }) as any as S.Schema<ResponseItem>;
export type ResponseItemsList = ResponseItem[];
export const ResponseItemsList = /*@__PURE__*/ S.Array(ResponseItem);
export interface SearchResourcesResponse {
  Items?: ResponseItem[];
  Marker?: string;
}
export const SearchResourcesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(ResponseItemsList),
    Marker: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "SearchResourcesResponse",
}) as any as S.Schema<SearchResourcesResponse>;
export interface UpdateDocumentRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  DocumentId: string;
  Name?: string | redacted.Redacted<string>;
  ParentFolderId?: string;
  ResourceState?: ResourceStateType;
}
export const UpdateDocumentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthenticationToken: S.optional(SensitiveString).pipe(
      T.HttpHeader("Authentication"),
    ),
    DocumentId: S.String.pipe(T.HttpLabel("DocumentId")),
    Name: S.optional(SensitiveString),
    ParentFolderId: S.optional(S.String),
    ResourceState: S.optional(ResourceStateType),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "PATCH", uri: "/api/v1/documents/{DocumentId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDocumentRequest",
}) as any as S.Schema<UpdateDocumentRequest>;
export interface UpdateDocumentResponse {}
export const UpdateDocumentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateDocumentResponse",
}) as any as S.Schema<UpdateDocumentResponse>;
export type DocumentVersionStatus = "ACTIVE" | (string & {});
export const DocumentVersionStatus = /*@__PURE__*/ S.String;

export interface UpdateDocumentVersionRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  DocumentId: string;
  VersionId: string;
  VersionStatus?: DocumentVersionStatus;
}
export const UpdateDocumentVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthenticationToken: S.optional(SensitiveString).pipe(
      T.HttpHeader("Authentication"),
    ),
    DocumentId: S.String.pipe(T.HttpLabel("DocumentId")),
    VersionId: S.String.pipe(T.HttpLabel("VersionId")),
    VersionStatus: S.optional(DocumentVersionStatus),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "PATCH",
        uri: "/api/v1/documents/{DocumentId}/versions/{VersionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDocumentVersionRequest",
}) as any as S.Schema<UpdateDocumentVersionRequest>;
export interface UpdateDocumentVersionResponse {}
export const UpdateDocumentVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateDocumentVersionResponse",
}) as any as S.Schema<UpdateDocumentVersionResponse>;
export interface UpdateFolderRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  FolderId: string;
  Name?: string | redacted.Redacted<string>;
  ParentFolderId?: string;
  ResourceState?: ResourceStateType;
}
export const UpdateFolderRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthenticationToken: S.optional(SensitiveString).pipe(
      T.HttpHeader("Authentication"),
    ),
    FolderId: S.String.pipe(T.HttpLabel("FolderId")),
    Name: S.optional(SensitiveString),
    ParentFolderId: S.optional(S.String),
    ResourceState: S.optional(ResourceStateType),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "PATCH", uri: "/api/v1/folders/{FolderId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateFolderRequest",
}) as any as S.Schema<UpdateFolderRequest>;
export interface UpdateFolderResponse {}
export const UpdateFolderResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateFolderResponse",
}) as any as S.Schema<UpdateFolderResponse>;
export type BooleanEnumType = "TRUE" | "FALSE" | (string & {});
export const BooleanEnumType = /*@__PURE__*/ S.String;

export interface UpdateUserRequest {
  AuthenticationToken?: string | redacted.Redacted<string>;
  UserId: string;
  GivenName?: string | redacted.Redacted<string>;
  Surname?: string | redacted.Redacted<string>;
  Type?: UserType;
  StorageRule?: StorageRuleType;
  TimeZoneId?: string;
  Locale?: LocaleType;
  GrantPoweruserPrivileges?: BooleanEnumType;
}
export const UpdateUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthenticationToken: S.optional(SensitiveString).pipe(
      T.HttpHeader("Authentication"),
    ),
    UserId: S.String.pipe(T.HttpLabel("UserId")),
    GivenName: S.optional(SensitiveString),
    Surname: S.optional(SensitiveString),
    Type: S.optional(UserType),
    StorageRule: S.optional(StorageRuleType),
    TimeZoneId: S.optional(S.String),
    Locale: S.optional(LocaleType),
    GrantPoweruserPrivileges: S.optional(BooleanEnumType),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "PATCH", uri: "/api/v1/users/{UserId}" }),
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
export interface UpdateUserResponse {
  User?: User;
}
export const UpdateUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ User: S.optional(User) }).pipe(ns),
).annotate({
  identifier: "UpdateUserResponse",
}) as any as S.Schema<UpdateUserResponse>;
export type ErrorMessageType = string;
export type EntityIdList = string[];
export const EntityIdList = /*@__PURE__*/ S.Array(S.String);
export type ExceptionCodeType = string;
export type AbortDocumentVersionUploadError =
  | ConcurrentModificationException
  | EntityNotExistsException
  | FailedDependencyException
  | ProhibitedStateException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Aborts the upload of the specified document version that was previously initiated
 * by InitiateDocumentVersionUpload. The client should make this call
 * only when it no longer intends to upload the document version, or fails to do
 * so.
 */
export const abortDocumentVersionUpload: API.OperationMethod<
  AbortDocumentVersionUploadRequest,
  AbortDocumentVersionUploadResponse,
  AbortDocumentVersionUploadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AbortDocumentVersionUploadRequest,
  output: AbortDocumentVersionUploadResponse,
  errors: [
    ConcurrentModificationException,
    EntityNotExistsException,
    FailedDependencyException,
    ProhibitedStateException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AbortDocumentVersionUpload",
}));

export type ActivateUserError =
  | EntityNotExistsException
  | FailedDependencyException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Activates the specified user. Only active users can access Amazon
 * WorkDocs.
 */
export const activateUser: API.OperationMethod<
  ActivateUserRequest,
  ActivateUserResponse,
  ActivateUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ActivateUserRequest,
  output: ActivateUserResponse,
  errors: [
    EntityNotExistsException,
    FailedDependencyException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ActivateUser",
}));

export type AddResourcePermissionsError =
  | FailedDependencyException
  | ProhibitedStateException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Creates a set of permissions for the specified folder or document. The resource
 * permissions are overwritten if the principals already have different
 * permissions.
 */
export const addResourcePermissions: API.OperationMethod<
  AddResourcePermissionsRequest,
  AddResourcePermissionsResponse,
  AddResourcePermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AddResourcePermissionsRequest,
  output: AddResourcePermissionsResponse,
  errors: [
    FailedDependencyException,
    ProhibitedStateException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddResourcePermissions",
}));

export type CreateCommentError =
  | DocumentLockedForCommentsException
  | EntityNotExistsException
  | FailedDependencyException
  | InvalidCommentOperationException
  | ProhibitedStateException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Adds a new comment to the specified document version.
 */
export const createComment: API.OperationMethod<
  CreateCommentRequest,
  CreateCommentResponse,
  CreateCommentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCommentRequest,
  output: CreateCommentResponse,
  errors: [
    DocumentLockedForCommentsException,
    EntityNotExistsException,
    FailedDependencyException,
    InvalidCommentOperationException,
    ProhibitedStateException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateComment",
}));

export type CreateCustomMetadataError =
  | CustomMetadataLimitExceededException
  | EntityNotExistsException
  | FailedDependencyException
  | ProhibitedStateException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Adds one or more custom properties to the specified resource (a folder, document,
 * or version).
 */
export const createCustomMetadata: API.OperationMethod<
  CreateCustomMetadataRequest,
  CreateCustomMetadataResponse,
  CreateCustomMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCustomMetadataRequest,
  output: CreateCustomMetadataResponse,
  errors: [
    CustomMetadataLimitExceededException,
    EntityNotExistsException,
    FailedDependencyException,
    ProhibitedStateException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCustomMetadata",
}));

export type CreateFolderError =
  | ConcurrentModificationException
  | ConflictingOperationException
  | EntityAlreadyExistsException
  | EntityNotExistsException
  | FailedDependencyException
  | LimitExceededException
  | ProhibitedStateException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Creates a folder with the specified name and parent folder.
 */
export const createFolder: API.OperationMethod<
  CreateFolderRequest,
  CreateFolderResponse,
  CreateFolderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateFolderRequest,
  output: CreateFolderResponse,
  errors: [
    ConcurrentModificationException,
    ConflictingOperationException,
    EntityAlreadyExistsException,
    EntityNotExistsException,
    FailedDependencyException,
    LimitExceededException,
    ProhibitedStateException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFolder",
}));

export type CreateLabelsError =
  | EntityNotExistsException
  | FailedDependencyException
  | ServiceUnavailableException
  | TooManyLabelsException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Adds the specified list of labels to the given resource (a document or
 * folder)
 */
export const createLabels: API.OperationMethod<
  CreateLabelsRequest,
  CreateLabelsResponse,
  CreateLabelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateLabelsRequest,
  output: CreateLabelsResponse,
  errors: [
    EntityNotExistsException,
    FailedDependencyException,
    ServiceUnavailableException,
    TooManyLabelsException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLabels",
}));

export type CreateNotificationSubscriptionError =
  | InvalidArgumentException
  | ServiceUnavailableException
  | TooManySubscriptionsException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Configure Amazon WorkDocs to use Amazon SNS notifications. The endpoint receives a
 * confirmation message, and must confirm the subscription.
 *
 * For more information, see Setting up notifications for an IAM user or role in the Amazon WorkDocs Developer
 * Guide.
 */
export const createNotificationSubscription: API.OperationMethod<
  CreateNotificationSubscriptionRequest,
  CreateNotificationSubscriptionResponse,
  CreateNotificationSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateNotificationSubscriptionRequest,
  output: CreateNotificationSubscriptionResponse,
  errors: [
    InvalidArgumentException,
    ServiceUnavailableException,
    TooManySubscriptionsException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateNotificationSubscription",
}));

export type CreateUserError =
  | EntityAlreadyExistsException
  | FailedDependencyException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Creates a user in a Simple AD or Microsoft AD directory. The status of a newly
 * created user is "ACTIVE". New users can access Amazon WorkDocs.
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
    EntityAlreadyExistsException,
    FailedDependencyException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUser",
}));

export type DeactivateUserError =
  | EntityNotExistsException
  | FailedDependencyException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Deactivates the specified user, which revokes the user's access to Amazon
 * WorkDocs.
 */
export const deactivateUser: API.OperationMethod<
  DeactivateUserRequest,
  DeactivateUserResponse,
  DeactivateUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeactivateUserRequest,
  output: DeactivateUserResponse,
  errors: [
    EntityNotExistsException,
    FailedDependencyException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeactivateUser",
}));

export type DeleteCommentError =
  | DocumentLockedForCommentsException
  | EntityNotExistsException
  | FailedDependencyException
  | ProhibitedStateException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Deletes the specified comment from the document version.
 */
export const deleteComment: API.OperationMethod<
  DeleteCommentRequest,
  DeleteCommentResponse,
  DeleteCommentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCommentRequest,
  output: DeleteCommentResponse,
  errors: [
    DocumentLockedForCommentsException,
    EntityNotExistsException,
    FailedDependencyException,
    ProhibitedStateException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteComment",
}));

export type DeleteCustomMetadataError =
  | EntityNotExistsException
  | FailedDependencyException
  | ProhibitedStateException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Deletes custom metadata from the specified resource.
 */
export const deleteCustomMetadata: API.OperationMethod<
  DeleteCustomMetadataRequest,
  DeleteCustomMetadataResponse,
  DeleteCustomMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCustomMetadataRequest,
  output: DeleteCustomMetadataResponse,
  errors: [
    EntityNotExistsException,
    FailedDependencyException,
    ProhibitedStateException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCustomMetadata",
}));

export type DeleteDocumentError =
  | ConcurrentModificationException
  | ConflictingOperationException
  | EntityNotExistsException
  | FailedDependencyException
  | LimitExceededException
  | ProhibitedStateException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Permanently deletes the specified document and its associated metadata.
 */
export const deleteDocument: API.OperationMethod<
  DeleteDocumentRequest,
  DeleteDocumentResponse,
  DeleteDocumentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDocumentRequest,
  output: DeleteDocumentResponse,
  errors: [
    ConcurrentModificationException,
    ConflictingOperationException,
    EntityNotExistsException,
    FailedDependencyException,
    LimitExceededException,
    ProhibitedStateException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDocument",
}));

export type DeleteDocumentVersionError =
  | ConcurrentModificationException
  | ConflictingOperationException
  | EntityNotExistsException
  | FailedDependencyException
  | InvalidOperationException
  | ProhibitedStateException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Deletes a specific version of a document.
 */
export const deleteDocumentVersion: API.OperationMethod<
  DeleteDocumentVersionRequest,
  DeleteDocumentVersionResponse,
  DeleteDocumentVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDocumentVersionRequest,
  output: DeleteDocumentVersionResponse,
  errors: [
    ConcurrentModificationException,
    ConflictingOperationException,
    EntityNotExistsException,
    FailedDependencyException,
    InvalidOperationException,
    ProhibitedStateException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDocumentVersion",
}));

export type DeleteFolderError =
  | ConcurrentModificationException
  | ConflictingOperationException
  | EntityNotExistsException
  | FailedDependencyException
  | LimitExceededException
  | ProhibitedStateException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Permanently deletes the specified folder and its contents.
 */
export const deleteFolder: API.OperationMethod<
  DeleteFolderRequest,
  DeleteFolderResponse,
  DeleteFolderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteFolderRequest,
  output: DeleteFolderResponse,
  errors: [
    ConcurrentModificationException,
    ConflictingOperationException,
    EntityNotExistsException,
    FailedDependencyException,
    LimitExceededException,
    ProhibitedStateException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFolder",
}));

export type DeleteFolderContentsError =
  | ConflictingOperationException
  | EntityNotExistsException
  | FailedDependencyException
  | ProhibitedStateException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Deletes the contents of the specified folder.
 */
export const deleteFolderContents: API.OperationMethod<
  DeleteFolderContentsRequest,
  DeleteFolderContentsResponse,
  DeleteFolderContentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteFolderContentsRequest,
  output: DeleteFolderContentsResponse,
  errors: [
    ConflictingOperationException,
    EntityNotExistsException,
    FailedDependencyException,
    ProhibitedStateException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFolderContents",
}));

export type DeleteLabelsError =
  | EntityNotExistsException
  | FailedDependencyException
  | ProhibitedStateException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Deletes the specified list of labels from a resource.
 */
export const deleteLabels: API.OperationMethod<
  DeleteLabelsRequest,
  DeleteLabelsResponse,
  DeleteLabelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteLabelsRequest,
  output: DeleteLabelsResponse,
  errors: [
    EntityNotExistsException,
    FailedDependencyException,
    ProhibitedStateException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLabels",
}));

export type DeleteNotificationSubscriptionError =
  | EntityNotExistsException
  | ProhibitedStateException
  | ServiceUnavailableException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Deletes the specified subscription from the specified organization.
 */
export const deleteNotificationSubscription: API.OperationMethod<
  DeleteNotificationSubscriptionRequest,
  DeleteNotificationSubscriptionResponse,
  DeleteNotificationSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteNotificationSubscriptionRequest,
  output: DeleteNotificationSubscriptionResponse,
  errors: [
    EntityNotExistsException,
    ProhibitedStateException,
    ServiceUnavailableException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNotificationSubscription",
}));

export type DeleteUserError =
  | EntityNotExistsException
  | FailedDependencyException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Deletes the specified user from a Simple AD or Microsoft AD directory.
 *
 * Deleting a user immediately and permanently deletes all content in that user's folder structure. Site retention policies do NOT apply to this type of deletion.
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
    EntityNotExistsException,
    FailedDependencyException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUser",
}));

export type DescribeActivitiesError =
  | FailedDependencyException
  | InvalidArgumentException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Describes the user activities in a specified time period.
 */
export const describeActivities: API.PaginatedOperationMethod<
  DescribeActivitiesRequest,
  DescribeActivitiesResponse,
  DescribeActivitiesError,
  Credentials | HttpClient.HttpClient,
  Activity
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeActivitiesRequest,
  output: DescribeActivitiesResponse,
  errors: [
    FailedDependencyException,
    InvalidArgumentException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeActivities",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "UserActivities",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeCommentsError =
  | EntityNotExistsException
  | FailedDependencyException
  | ProhibitedStateException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * List all the comments for the specified document version.
 */
export const describeComments: API.PaginatedOperationMethod<
  DescribeCommentsRequest,
  DescribeCommentsResponse,
  DescribeCommentsError,
  Credentials | HttpClient.HttpClient,
  Comment
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeCommentsRequest,
  output: DescribeCommentsResponse,
  errors: [
    EntityNotExistsException,
    FailedDependencyException,
    ProhibitedStateException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeComments",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Comments",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeDocumentVersionsError =
  | EntityNotExistsException
  | FailedDependencyException
  | InvalidArgumentException
  | InvalidPasswordException
  | ProhibitedStateException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Retrieves the document versions for the specified document.
 *
 * By default, only active versions are returned.
 */
export const describeDocumentVersions: API.PaginatedOperationMethod<
  DescribeDocumentVersionsRequest,
  DescribeDocumentVersionsResponse,
  DescribeDocumentVersionsError,
  Credentials | HttpClient.HttpClient,
  DocumentVersionMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeDocumentVersionsRequest,
  output: DescribeDocumentVersionsResponse,
  errors: [
    EntityNotExistsException,
    FailedDependencyException,
    InvalidArgumentException,
    InvalidPasswordException,
    ProhibitedStateException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDocumentVersions",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "DocumentVersions",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeFolderContentsError =
  | EntityNotExistsException
  | FailedDependencyException
  | InvalidArgumentException
  | ProhibitedStateException
  | ServiceUnavailableException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Describes the contents of the specified folder, including its documents and
 * subfolders.
 *
 * By default, Amazon WorkDocs returns the first 100 active document and folder
 * metadata items. If there are more results, the response includes a marker that you can
 * use to request the next set of results. You can also request initialized
 * documents.
 */
export const describeFolderContents: API.PaginatedOperationMethod<
  DescribeFolderContentsRequest,
  DescribeFolderContentsResponse,
  DescribeFolderContentsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeFolderContentsRequest,
  output: DescribeFolderContentsResponse,
  errors: [
    EntityNotExistsException,
    FailedDependencyException,
    InvalidArgumentException,
    ProhibitedStateException,
    ServiceUnavailableException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFolderContents",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeGroupsError =
  | FailedDependencyException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Describes the groups specified by the query. Groups are defined by the underlying
 * Active Directory.
 */
export const describeGroups: API.PaginatedOperationMethod<
  DescribeGroupsRequest,
  DescribeGroupsResponse,
  DescribeGroupsError,
  Credentials | HttpClient.HttpClient,
  GroupMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeGroupsRequest,
  output: DescribeGroupsResponse,
  errors: [
    FailedDependencyException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGroups",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Groups",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeNotificationSubscriptionsError =
  | EntityNotExistsException
  | ServiceUnavailableException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Lists the specified notification subscriptions.
 */
export const describeNotificationSubscriptions: API.PaginatedOperationMethod<
  DescribeNotificationSubscriptionsRequest,
  DescribeNotificationSubscriptionsResponse,
  DescribeNotificationSubscriptionsError,
  Credentials | HttpClient.HttpClient,
  Subscription
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeNotificationSubscriptionsRequest,
  output: DescribeNotificationSubscriptionsResponse,
  errors: [
    EntityNotExistsException,
    ServiceUnavailableException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeNotificationSubscriptions",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Subscriptions",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeResourcePermissionsError =
  | FailedDependencyException
  | InvalidArgumentException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Describes the permissions of a specified resource.
 */
export const describeResourcePermissions: API.PaginatedOperationMethod<
  DescribeResourcePermissionsRequest,
  DescribeResourcePermissionsResponse,
  DescribeResourcePermissionsError,
  Credentials | HttpClient.HttpClient,
  Principal
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeResourcePermissionsRequest,
  output: DescribeResourcePermissionsResponse,
  errors: [
    FailedDependencyException,
    InvalidArgumentException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeResourcePermissions",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Principals",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeRootFoldersError =
  | FailedDependencyException
  | InvalidArgumentException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Describes the current user's special folders; the `RootFolder` and the
 * `RecycleBin`. `RootFolder` is the root of user's files and
 * folders and `RecycleBin` is the root of recycled items. This is not a valid
 * action for SigV4 (administrative API) clients.
 *
 * This action requires an authentication token. To get an authentication token,
 * register an application with Amazon WorkDocs. For more information, see Authentication and Access
 * Control for User Applications in the
 * Amazon
 * WorkDocs Developer Guide.
 */
export const describeRootFolders: API.PaginatedOperationMethod<
  DescribeRootFoldersRequest,
  DescribeRootFoldersResponse,
  DescribeRootFoldersError,
  Credentials | HttpClient.HttpClient,
  FolderMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeRootFoldersRequest,
  output: DescribeRootFoldersResponse,
  errors: [
    FailedDependencyException,
    InvalidArgumentException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRootFolders",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Folders",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeUsersError =
  | EntityNotExistsException
  | FailedDependencyException
  | InvalidArgumentException
  | RequestedEntityTooLargeException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Describes the specified users. You can describe all users or filter the results
 * (for example, by status or organization).
 *
 * By default, Amazon WorkDocs returns the first 24 active or pending users. If there
 * are more results, the response includes a marker that you can use to request the next
 * set of results.
 */
export const describeUsers: API.PaginatedOperationMethod<
  DescribeUsersRequest,
  DescribeUsersResponse,
  DescribeUsersError,
  Credentials | HttpClient.HttpClient,
  User
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeUsersRequest,
  output: DescribeUsersResponse,
  errors: [
    EntityNotExistsException,
    FailedDependencyException,
    InvalidArgumentException,
    RequestedEntityTooLargeException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeUsers",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Users",
    pageSize: "Limit",
  } as const,
})) as any;

export type GetCurrentUserError =
  | EntityNotExistsException
  | FailedDependencyException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Retrieves details of the current user for whom the authentication token was
 * generated. This is not a valid action for SigV4 (administrative API) clients.
 *
 * This action requires an authentication token. To get an authentication token,
 * register an application with Amazon WorkDocs. For more information, see Authentication and Access
 * Control for User Applications in the
 * Amazon
 * WorkDocs Developer Guide.
 */
export const getCurrentUser: API.OperationMethod<
  GetCurrentUserRequest,
  GetCurrentUserResponse,
  GetCurrentUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCurrentUserRequest,
  output: GetCurrentUserResponse,
  errors: [
    EntityNotExistsException,
    FailedDependencyException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCurrentUser",
}));

export type GetDocumentError =
  | EntityNotExistsException
  | FailedDependencyException
  | InvalidArgumentException
  | InvalidPasswordException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Retrieves details of a document.
 */
export const getDocument: API.OperationMethod<
  GetDocumentRequest,
  GetDocumentResponse,
  GetDocumentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDocumentRequest,
  output: GetDocumentResponse,
  errors: [
    EntityNotExistsException,
    FailedDependencyException,
    InvalidArgumentException,
    InvalidPasswordException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDocument",
}));

export type GetDocumentPathError =
  | EntityNotExistsException
  | FailedDependencyException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Retrieves the path information (the hierarchy from the root folder) for the
 * requested document.
 *
 * By default, Amazon WorkDocs returns a maximum of 100 levels upwards from the
 * requested document and only includes the IDs of the parent folders in the path. You can
 * limit the maximum number of levels. You can also request the names of the parent
 * folders.
 */
export const getDocumentPath: API.OperationMethod<
  GetDocumentPathRequest,
  GetDocumentPathResponse,
  GetDocumentPathError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDocumentPathRequest,
  output: GetDocumentPathResponse,
  errors: [
    EntityNotExistsException,
    FailedDependencyException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDocumentPath",
}));

export type GetDocumentVersionError =
  | EntityNotExistsException
  | FailedDependencyException
  | InvalidPasswordException
  | ProhibitedStateException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Retrieves version metadata for the specified document.
 */
export const getDocumentVersion: API.OperationMethod<
  GetDocumentVersionRequest,
  GetDocumentVersionResponse,
  GetDocumentVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDocumentVersionRequest,
  output: GetDocumentVersionResponse,
  errors: [
    EntityNotExistsException,
    FailedDependencyException,
    InvalidPasswordException,
    ProhibitedStateException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDocumentVersion",
}));

export type GetFolderError =
  | EntityNotExistsException
  | FailedDependencyException
  | InvalidArgumentException
  | ProhibitedStateException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Retrieves the metadata of the specified folder.
 */
export const getFolder: API.OperationMethod<
  GetFolderRequest,
  GetFolderResponse,
  GetFolderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetFolderRequest,
  output: GetFolderResponse,
  errors: [
    EntityNotExistsException,
    FailedDependencyException,
    InvalidArgumentException,
    ProhibitedStateException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFolder",
}));

export type GetFolderPathError =
  | EntityNotExistsException
  | FailedDependencyException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Retrieves the path information (the hierarchy from the root folder) for the
 * specified folder.
 *
 * By default, Amazon WorkDocs returns a maximum of 100 levels upwards from the
 * requested folder and only includes the IDs of the parent folders in the path. You can
 * limit the maximum number of levels. You can also request the parent folder
 * names.
 */
export const getFolderPath: API.OperationMethod<
  GetFolderPathRequest,
  GetFolderPathResponse,
  GetFolderPathError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetFolderPathRequest,
  output: GetFolderPathResponse,
  errors: [
    EntityNotExistsException,
    FailedDependencyException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFolderPath",
}));

export type GetResourcesError =
  | FailedDependencyException
  | InvalidArgumentException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Retrieves a collection of resources, including folders and documents. The only
 * `CollectionType` supported is `SHARED_WITH_ME`.
 */
export const getResources: API.OperationMethod<
  GetResourcesRequest,
  GetResourcesResponse,
  GetResourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetResourcesRequest,
  output: GetResourcesResponse,
  errors: [
    FailedDependencyException,
    InvalidArgumentException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResources",
}));

export type InitiateDocumentVersionUploadError =
  | DraftUploadOutOfSyncException
  | EntityAlreadyExistsException
  | EntityNotExistsException
  | FailedDependencyException
  | InvalidArgumentException
  | InvalidPasswordException
  | LimitExceededException
  | ProhibitedStateException
  | ResourceAlreadyCheckedOutException
  | ServiceUnavailableException
  | StorageLimitExceededException
  | StorageLimitWillExceedException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Creates a new document object and version object.
 *
 * The client specifies the parent folder ID and name of the document to upload. The
 * ID is optionally specified when creating a new version of an existing document. This is
 * the first step to upload a document. Next, upload the document to the URL returned from
 * the call, and then call UpdateDocumentVersion.
 *
 * To cancel the document upload, call AbortDocumentVersionUpload.
 */
export const initiateDocumentVersionUpload: API.OperationMethod<
  InitiateDocumentVersionUploadRequest,
  InitiateDocumentVersionUploadResponse,
  InitiateDocumentVersionUploadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: InitiateDocumentVersionUploadRequest,
  output: InitiateDocumentVersionUploadResponse,
  errors: [
    DraftUploadOutOfSyncException,
    EntityAlreadyExistsException,
    EntityNotExistsException,
    FailedDependencyException,
    InvalidArgumentException,
    InvalidPasswordException,
    LimitExceededException,
    ProhibitedStateException,
    ResourceAlreadyCheckedOutException,
    ServiceUnavailableException,
    StorageLimitExceededException,
    StorageLimitWillExceedException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InitiateDocumentVersionUpload",
}));

export type RemoveAllResourcePermissionsError =
  | FailedDependencyException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Removes all the permissions from the specified resource.
 */
export const removeAllResourcePermissions: API.OperationMethod<
  RemoveAllResourcePermissionsRequest,
  RemoveAllResourcePermissionsResponse,
  RemoveAllResourcePermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RemoveAllResourcePermissionsRequest,
  output: RemoveAllResourcePermissionsResponse,
  errors: [
    FailedDependencyException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveAllResourcePermissions",
}));

export type RemoveResourcePermissionError =
  | FailedDependencyException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Removes the permission for the specified principal from the specified
 * resource.
 */
export const removeResourcePermission: API.OperationMethod<
  RemoveResourcePermissionRequest,
  RemoveResourcePermissionResponse,
  RemoveResourcePermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RemoveResourcePermissionRequest,
  output: RemoveResourcePermissionResponse,
  errors: [
    FailedDependencyException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveResourcePermission",
}));

export type RestoreDocumentVersionsError =
  | ConcurrentModificationException
  | ConflictingOperationException
  | EntityNotExistsException
  | FailedDependencyException
  | InvalidOperationException
  | ProhibitedStateException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Recovers a deleted version of an Amazon WorkDocs document.
 */
export const restoreDocumentVersions: API.OperationMethod<
  RestoreDocumentVersionsRequest,
  RestoreDocumentVersionsResponse,
  RestoreDocumentVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RestoreDocumentVersionsRequest,
  output: RestoreDocumentVersionsResponse,
  errors: [
    ConcurrentModificationException,
    ConflictingOperationException,
    EntityNotExistsException,
    FailedDependencyException,
    InvalidOperationException,
    ProhibitedStateException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreDocumentVersions",
}));

export type SearchResourcesError =
  | InvalidArgumentException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Searches metadata and the content of folders, documents, document versions, and comments.
 */
export const searchResources: API.PaginatedOperationMethod<
  SearchResourcesRequest,
  SearchResourcesResponse,
  SearchResourcesError,
  Credentials | HttpClient.HttpClient,
  ResponseItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: SearchResourcesRequest,
  output: SearchResourcesResponse,
  errors: [
    InvalidArgumentException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchResources",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Items",
    pageSize: "Limit",
  } as const,
})) as any;

export type UpdateDocumentError =
  | ConcurrentModificationException
  | ConflictingOperationException
  | EntityAlreadyExistsException
  | EntityNotExistsException
  | FailedDependencyException
  | LimitExceededException
  | ProhibitedStateException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Updates the specified attributes of a document. The user must have access to both
 * the document and its parent folder, if applicable.
 */
export const updateDocument: API.OperationMethod<
  UpdateDocumentRequest,
  UpdateDocumentResponse,
  UpdateDocumentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDocumentRequest,
  output: UpdateDocumentResponse,
  errors: [
    ConcurrentModificationException,
    ConflictingOperationException,
    EntityAlreadyExistsException,
    EntityNotExistsException,
    FailedDependencyException,
    LimitExceededException,
    ProhibitedStateException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDocument",
}));

export type UpdateDocumentVersionError =
  | ConcurrentModificationException
  | EntityNotExistsException
  | FailedDependencyException
  | InvalidOperationException
  | ProhibitedStateException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Changes the status of the document version to ACTIVE.
 *
 * Amazon WorkDocs also sets its document container to ACTIVE. This is the last step
 * in a document upload, after the client uploads the document to an S3-presigned URL
 * returned by InitiateDocumentVersionUpload.
 */
export const updateDocumentVersion: API.OperationMethod<
  UpdateDocumentVersionRequest,
  UpdateDocumentVersionResponse,
  UpdateDocumentVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDocumentVersionRequest,
  output: UpdateDocumentVersionResponse,
  errors: [
    ConcurrentModificationException,
    EntityNotExistsException,
    FailedDependencyException,
    InvalidOperationException,
    ProhibitedStateException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDocumentVersion",
}));

export type UpdateFolderError =
  | ConcurrentModificationException
  | ConflictingOperationException
  | EntityAlreadyExistsException
  | EntityNotExistsException
  | FailedDependencyException
  | LimitExceededException
  | ProhibitedStateException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Updates the specified attributes of the specified folder. The user must have access
 * to both the folder and its parent folder, if applicable.
 */
export const updateFolder: API.OperationMethod<
  UpdateFolderRequest,
  UpdateFolderResponse,
  UpdateFolderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateFolderRequest,
  output: UpdateFolderResponse,
  errors: [
    ConcurrentModificationException,
    ConflictingOperationException,
    EntityAlreadyExistsException,
    EntityNotExistsException,
    FailedDependencyException,
    LimitExceededException,
    ProhibitedStateException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFolder",
}));

export type UpdateUserError =
  | DeactivatingLastSystemUserException
  | EntityNotExistsException
  | FailedDependencyException
  | IllegalUserStateException
  | InvalidArgumentException
  | ProhibitedStateException
  | ServiceUnavailableException
  | UnauthorizedOperationException
  | UnauthorizedResourceAccessException
  | CommonErrors;
/**
 * Updates the specified attributes of the specified user, and grants or revokes
 * administrative privileges to the Amazon WorkDocs site.
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
    DeactivatingLastSystemUserException,
    EntityNotExistsException,
    FailedDependencyException,
    IllegalUserStateException,
    InvalidArgumentException,
    ProhibitedStateException,
    ServiceUnavailableException,
    UnauthorizedOperationException,
    UnauthorizedResourceAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUser",
}));
