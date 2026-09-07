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
  sdkId: "repostspace",
  serviceShapeName: "RepostSpace",
});
const auth = T.AwsAuthSigv4({ name: "repostspace" });
const ver = T.ServiceVersion("2022-05-13");
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
              `https://repostspace-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://repostspace-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://repostspace.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://repostspace.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
    },
    T.all(T.HttpError(500), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
      serviceCode: S.String,
      quotaCode: S.String,
    },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      serviceCode: S.optional(S.String),
      quotaCode: S.optional(S.String),
      retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
    },
    T.all(T.HttpError(429), T.Retryable({ throttling: true })),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      reason: S.suspend(() => ValidationExceptionReason).annotate({
        identifier: "ValidationExceptionReason",
      }),
      fieldList: S.optional(
        S.suspend(() => ValidationExceptionFieldList).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type SpaceId = string;
export type ChannelId = string;
export type AccessorId = string;
export type AccessorIdList = string[];
export const AccessorIdList = /*@__PURE__*/ S.Array(S.String);
export type ChannelRole =
  | "ASKER"
  | "EXPERT"
  | "MODERATOR"
  | "SUPPORTREQUESTOR"
  | (string & {});
export const ChannelRole = S.String;

export interface BatchAddChannelRoleToAccessorsInput {
  spaceId: string;
  channelId: string;
  accessorIds: string[];
  channelRole: ChannelRole;
}
export const BatchAddChannelRoleToAccessorsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceId: S.String.pipe(T.HttpLabel("spaceId")),
    channelId: S.String.pipe(T.HttpLabel("channelId")),
    accessorIds: AccessorIdList,
    channelRole: ChannelRole,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/spaces/{spaceId}/channels/{channelId}/roles",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchAddChannelRoleToAccessorsInput",
}) as any as S.Schema<BatchAddChannelRoleToAccessorsInput>;
export type ErrorCode = number;
export type ErrorMessage = string;
export interface BatchError {
  accessorId: string;
  error: number;
  message: string;
}
export const BatchError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ accessorId: S.String, error: S.Number, message: S.String }),
).annotate({ identifier: "BatchError" }) as any as S.Schema<BatchError>;
export type BatchErrorList = BatchError[];
export const BatchErrorList = /*@__PURE__*/ S.Array(BatchError);
export interface BatchAddChannelRoleToAccessorsOutput {
  addedAccessorIds: string[];
  errors: BatchError[];
}
export const BatchAddChannelRoleToAccessorsOutput = /*@__PURE__*/ S.suspend(
  () => S.Struct({ addedAccessorIds: AccessorIdList, errors: BatchErrorList }),
).annotate({
  identifier: "BatchAddChannelRoleToAccessorsOutput",
}) as any as S.Schema<BatchAddChannelRoleToAccessorsOutput>;
export type Role =
  | "EXPERT"
  | "MODERATOR"
  | "ADMINISTRATOR"
  | "SUPPORTREQUESTOR"
  | (string & {});
export const Role = S.String;

export interface BatchAddRoleInput {
  spaceId: string;
  accessorIds: string[];
  role: Role;
}
export const BatchAddRoleInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceId: S.String.pipe(T.HttpLabel("spaceId")),
    accessorIds: AccessorIdList,
    role: Role,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/spaces/{spaceId}/roles" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchAddRoleInput",
}) as any as S.Schema<BatchAddRoleInput>;
export interface BatchAddRoleOutput {
  addedAccessorIds: string[];
  errors: BatchError[];
}
export const BatchAddRoleOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ addedAccessorIds: AccessorIdList, errors: BatchErrorList }),
).annotate({
  identifier: "BatchAddRoleOutput",
}) as any as S.Schema<BatchAddRoleOutput>;
export interface BatchRemoveChannelRoleFromAccessorsInput {
  spaceId: string;
  channelId: string;
  accessorIds: string[];
  channelRole: ChannelRole;
}
export const BatchRemoveChannelRoleFromAccessorsInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      spaceId: S.String.pipe(T.HttpLabel("spaceId")),
      channelId: S.String.pipe(T.HttpLabel("channelId")),
      accessorIds: AccessorIdList,
      channelRole: ChannelRole,
    }).pipe(
      T.all(
        T.Http({
          method: "PATCH",
          uri: "/spaces/{spaceId}/channels/{channelId}/roles",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "BatchRemoveChannelRoleFromAccessorsInput",
}) as any as S.Schema<BatchRemoveChannelRoleFromAccessorsInput>;
export interface BatchRemoveChannelRoleFromAccessorsOutput {
  removedAccessorIds: string[];
  errors: BatchError[];
}
export const BatchRemoveChannelRoleFromAccessorsOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ removedAccessorIds: AccessorIdList, errors: BatchErrorList }),
  ).annotate({
    identifier: "BatchRemoveChannelRoleFromAccessorsOutput",
  }) as any as S.Schema<BatchRemoveChannelRoleFromAccessorsOutput>;
export interface BatchRemoveRoleInput {
  spaceId: string;
  accessorIds: string[];
  role: Role;
}
export const BatchRemoveRoleInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceId: S.String.pipe(T.HttpLabel("spaceId")),
    accessorIds: AccessorIdList,
    role: Role,
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/spaces/{spaceId}/roles" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchRemoveRoleInput",
}) as any as S.Schema<BatchRemoveRoleInput>;
export interface BatchRemoveRoleOutput {
  removedAccessorIds: string[];
  errors: BatchError[];
}
export const BatchRemoveRoleOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ removedAccessorIds: AccessorIdList, errors: BatchErrorList }),
).annotate({
  identifier: "BatchRemoveRoleOutput",
}) as any as S.Schema<BatchRemoveRoleOutput>;
export type ChannelName = string | redacted.Redacted<string>;
export type ChannelDescription = string | redacted.Redacted<string>;
export interface CreateChannelInput {
  spaceId: string;
  channelName: string | redacted.Redacted<string>;
  channelDescription?: string | redacted.Redacted<string>;
}
export const CreateChannelInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceId: S.String.pipe(T.HttpLabel("spaceId")),
    channelName: SensitiveString,
    channelDescription: S.optional(SensitiveString),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/spaces/{spaceId}/channels" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateChannelInput",
}) as any as S.Schema<CreateChannelInput>;
export interface CreateChannelOutput {
  channelId: string;
}
export const CreateChannelOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ channelId: S.String }),
).annotate({
  identifier: "CreateChannelOutput",
}) as any as S.Schema<CreateChannelOutput>;
export type SpaceName = string | redacted.Redacted<string>;
export type SpaceSubdomain = string;
export type TierLevel = "BASIC" | "STANDARD" | (string & {});
export const TierLevel = S.String;

export type SpaceDescription = string | redacted.Redacted<string>;
export type KMSKey = string;
export type TagKey = string;
export type TagValue = string;
export type Tags = { [key: string]: string | undefined };
export const Tags = /*@__PURE__*/ S.Record(S.String, S.String.pipe(S.optional));
export type Arn = string;
export type FeatureEnableParameter = "ENABLED" | "DISABLED" | (string & {});
export const FeatureEnableParameter = S.String;

export type EmailDomain = string | redacted.Redacted<string>;
export type AllowedDomainsList = (string | redacted.Redacted<string>)[];
export const AllowedDomainsList = /*@__PURE__*/ S.Array(SensitiveString);
export interface SupportedEmailDomainsParameters {
  enabled?: FeatureEnableParameter;
  allowedDomains?: (string | redacted.Redacted<string>)[];
}
export const SupportedEmailDomainsParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    enabled: S.optional(FeatureEnableParameter),
    allowedDomains: S.optional(AllowedDomainsList),
  }),
).annotate({
  identifier: "SupportedEmailDomainsParameters",
}) as any as S.Schema<SupportedEmailDomainsParameters>;
export interface CreateSpaceInput {
  name: string | redacted.Redacted<string>;
  subdomain: string;
  tier: TierLevel;
  description?: string | redacted.Redacted<string>;
  userKMSKey?: string;
  tags?: { [key: string]: string | undefined };
  roleArn?: string;
  supportedEmailDomains?: SupportedEmailDomainsParameters;
}
export const CreateSpaceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: SensitiveString,
    subdomain: S.String,
    tier: TierLevel,
    description: S.optional(SensitiveString),
    userKMSKey: S.optional(S.String),
    tags: S.optional(Tags),
    roleArn: S.optional(S.String),
    supportedEmailDomains: S.optional(SupportedEmailDomainsParameters),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/spaces" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateSpaceInput",
}) as any as S.Schema<CreateSpaceInput>;
export interface CreateSpaceOutput {
  spaceId: string;
}
export const CreateSpaceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ spaceId: S.String }),
).annotate({
  identifier: "CreateSpaceOutput",
}) as any as S.Schema<CreateSpaceOutput>;
export interface DeleteSpaceInput {
  spaceId: string;
}
export const DeleteSpaceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ spaceId: S.String.pipe(T.HttpLabel("spaceId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/spaces/{spaceId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSpaceInput",
}) as any as S.Schema<DeleteSpaceInput>;
export interface DeleteSpaceResponse {}
export const DeleteSpaceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteSpaceResponse",
}) as any as S.Schema<DeleteSpaceResponse>;
export type AdminId = string;
export interface DeregisterAdminInput {
  spaceId: string;
  adminId: string;
}
export const DeregisterAdminInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceId: S.String.pipe(T.HttpLabel("spaceId")),
    adminId: S.String.pipe(T.HttpLabel("adminId")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/spaces/{spaceId}/admins/{adminId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeregisterAdminInput",
}) as any as S.Schema<DeregisterAdminInput>;
export interface DeregisterAdminResponse {}
export const DeregisterAdminResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeregisterAdminResponse",
}) as any as S.Schema<DeregisterAdminResponse>;
export interface GetChannelInput {
  spaceId: string;
  channelId: string;
}
export const GetChannelInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceId: S.String.pipe(T.HttpLabel("spaceId")),
    channelId: S.String.pipe(T.HttpLabel("channelId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/spaces/{spaceId}/channels/{channelId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetChannelInput",
}) as any as S.Schema<GetChannelInput>;
export type ChannelRoleList = ChannelRole[];
export const ChannelRoleList = /*@__PURE__*/ S.Array(ChannelRole);
export type ChannelRoles = { [key: string]: ChannelRole[] | undefined };
export const ChannelRoles = /*@__PURE__*/ S.Record(
  S.String,
  ChannelRoleList.pipe(S.optional),
);
export type ChannelStatus =
  | "CREATED"
  | "CREATING"
  | "CREATE_FAILED"
  | "DELETED"
  | "DELETING"
  | "DELETE_FAILED"
  | (string & {});
export const ChannelStatus = S.String;

export interface GetChannelOutput {
  spaceId: string;
  channelId: string;
  channelName: string | redacted.Redacted<string>;
  channelDescription?: string | redacted.Redacted<string>;
  createDateTime: Date;
  deleteDateTime?: Date;
  channelRoles?: { [key: string]: ChannelRole[] | undefined };
  channelStatus: ChannelStatus;
}
export const GetChannelOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceId: S.String,
    channelId: S.String,
    channelName: SensitiveString,
    channelDescription: S.optional(SensitiveString),
    createDateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    deleteDateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    channelRoles: S.optional(ChannelRoles),
    channelStatus: ChannelStatus,
  }),
).annotate({
  identifier: "GetChannelOutput",
}) as any as S.Schema<GetChannelOutput>;
export interface GetSpaceInput {
  spaceId: string;
}
export const GetSpaceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ spaceId: S.String.pipe(T.HttpLabel("spaceId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/spaces/{spaceId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetSpaceInput" }) as any as S.Schema<GetSpaceInput>;
export type ProvisioningStatus = string;
export type ConfigurationStatus = "CONFIGURED" | "UNCONFIGURED" | (string & {});
export const ConfigurationStatus = S.String;

export type ClientId = string;
export type IdentityStoreId = string;
export type VanityDomainStatus =
  | "PENDING"
  | "APPROVED"
  | "UNAPPROVED"
  | (string & {});
export const VanityDomainStatus = S.String;

export type Url = string;
export type StorageLimit = number;
export type UserAdmins = string[];
export const UserAdmins = /*@__PURE__*/ S.Array(S.String);
export type GroupAdmins = string[];
export const GroupAdmins = /*@__PURE__*/ S.Array(S.String);
export type RoleList = Role[];
export const RoleList = /*@__PURE__*/ S.Array(Role);
export type Roles = { [key: string]: Role[] | undefined };
export const Roles = /*@__PURE__*/ S.Record(
  S.String,
  RoleList.pipe(S.optional),
);
export type UserCount = number;
export type ContentSize = number;
export type FeatureEnableStatus =
  | "ENABLED"
  | "DISABLED"
  | "NOT_ALLOWED"
  | (string & {});
export const FeatureEnableStatus = S.String;

export interface SupportedEmailDomainsStatus {
  enabled?: FeatureEnableStatus;
  allowedDomains?: (string | redacted.Redacted<string>)[];
}
export const SupportedEmailDomainsStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    enabled: S.optional(FeatureEnableStatus),
    allowedDomains: S.optional(AllowedDomainsList),
  }),
).annotate({
  identifier: "SupportedEmailDomainsStatus",
}) as any as S.Schema<SupportedEmailDomainsStatus>;
export interface GetSpaceOutput {
  spaceId: string;
  arn: string;
  name: string | redacted.Redacted<string>;
  status: string;
  configurationStatus: ConfigurationStatus;
  clientId: string;
  identityStoreId?: string;
  applicationArn?: string;
  description?: string | redacted.Redacted<string>;
  vanityDomainStatus: VanityDomainStatus;
  vanityDomain: string;
  randomDomain: string;
  customerRoleArn?: string;
  createDateTime: Date;
  deleteDateTime?: Date;
  tier: TierLevel;
  storageLimit: number;
  userAdmins?: string[];
  groupAdmins?: string[];
  roles?: { [key: string]: Role[] | undefined };
  userKMSKey?: string;
  userCount?: number;
  contentSize?: number;
  supportedEmailDomains?: SupportedEmailDomainsStatus;
}
export const GetSpaceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceId: S.String,
    arn: S.String,
    name: SensitiveString,
    status: S.String,
    configurationStatus: ConfigurationStatus,
    clientId: S.String,
    identityStoreId: S.optional(S.String),
    applicationArn: S.optional(S.String),
    description: S.optional(SensitiveString),
    vanityDomainStatus: VanityDomainStatus,
    vanityDomain: S.String,
    randomDomain: S.String,
    customerRoleArn: S.optional(S.String),
    createDateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    deleteDateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    tier: TierLevel,
    storageLimit: S.Number,
    userAdmins: S.optional(UserAdmins),
    groupAdmins: S.optional(GroupAdmins),
    roles: S.optional(Roles),
    userKMSKey: S.optional(S.String),
    userCount: S.optional(S.Number),
    contentSize: S.optional(S.Number),
    supportedEmailDomains: S.optional(SupportedEmailDomainsStatus),
  }),
).annotate({ identifier: "GetSpaceOutput" }) as any as S.Schema<GetSpaceOutput>;
export type ListChannelsLimit = number;
export interface ListChannelsInput {
  spaceId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListChannelsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceId: S.String.pipe(T.HttpLabel("spaceId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/spaces/{spaceId}/channels" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListChannelsInput",
}) as any as S.Schema<ListChannelsInput>;
export type GroupCount = number;
export interface ChannelData {
  spaceId: string;
  channelId: string;
  channelName: string | redacted.Redacted<string>;
  channelDescription?: string | redacted.Redacted<string>;
  createDateTime: Date;
  deleteDateTime?: Date;
  channelStatus: ChannelStatus;
  userCount: number;
  groupCount: number;
}
export const ChannelData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceId: S.String,
    channelId: S.String,
    channelName: SensitiveString,
    channelDescription: S.optional(SensitiveString),
    createDateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    deleteDateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    channelStatus: ChannelStatus,
    userCount: S.Number,
    groupCount: S.Number,
  }),
).annotate({ identifier: "ChannelData" }) as any as S.Schema<ChannelData>;
export type ChannelsList = ChannelData[];
export const ChannelsList = /*@__PURE__*/ S.Array(ChannelData);
export interface ListChannelsOutput {
  channels: ChannelData[];
  nextToken?: string;
}
export const ListChannelsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ channels: ChannelsList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListChannelsOutput",
}) as any as S.Schema<ListChannelsOutput>;
export type ListSpacesLimit = number;
export interface ListSpacesInput {
  nextToken?: string;
  maxResults?: number;
}
export const ListSpacesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/spaces" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSpacesInput",
}) as any as S.Schema<ListSpacesInput>;
export interface SpaceData {
  spaceId: string;
  arn: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  status: string;
  configurationStatus: ConfigurationStatus;
  vanityDomainStatus: VanityDomainStatus;
  vanityDomain: string;
  randomDomain: string;
  tier: TierLevel;
  storageLimit: number;
  createDateTime: Date;
  deleteDateTime?: Date;
  userKMSKey?: string;
  userCount?: number;
  contentSize?: number;
  supportedEmailDomains?: SupportedEmailDomainsStatus;
}
export const SpaceData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceId: S.String,
    arn: S.String,
    name: SensitiveString,
    description: S.optional(SensitiveString),
    status: S.String,
    configurationStatus: ConfigurationStatus,
    vanityDomainStatus: VanityDomainStatus,
    vanityDomain: S.String,
    randomDomain: S.String,
    tier: TierLevel,
    storageLimit: S.Number,
    createDateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    deleteDateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    userKMSKey: S.optional(S.String),
    userCount: S.optional(S.Number),
    contentSize: S.optional(S.Number),
    supportedEmailDomains: S.optional(SupportedEmailDomainsStatus),
  }),
).annotate({ identifier: "SpaceData" }) as any as S.Schema<SpaceData>;
export type SpacesList = SpaceData[];
export const SpacesList = /*@__PURE__*/ S.Array(SpaceData);
export interface ListSpacesOutput {
  spaces: SpaceData[];
  nextToken?: string;
}
export const ListSpacesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ spaces: SpacesList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListSpacesOutput",
}) as any as S.Schema<ListSpacesOutput>;
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
  S.Struct({ tags: S.optional(Tags) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface RegisterAdminInput {
  spaceId: string;
  adminId: string;
}
export const RegisterAdminInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceId: S.String.pipe(T.HttpLabel("spaceId")),
    adminId: S.String.pipe(T.HttpLabel("adminId")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/spaces/{spaceId}/admins/{adminId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RegisterAdminInput",
}) as any as S.Schema<RegisterAdminInput>;
export interface RegisterAdminResponse {}
export const RegisterAdminResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "RegisterAdminResponse",
}) as any as S.Schema<RegisterAdminResponse>;
export type InviteTitle = string | redacted.Redacted<string>;
export type InviteBody = string | redacted.Redacted<string>;
export interface SendInvitesInput {
  spaceId: string;
  accessorIds: string[];
  title: string | redacted.Redacted<string>;
  body: string | redacted.Redacted<string>;
}
export const SendInvitesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceId: S.String.pipe(T.HttpLabel("spaceId")),
    accessorIds: AccessorIdList,
    title: SensitiveString,
    body: SensitiveString,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/spaces/{spaceId}/invite" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SendInvitesInput",
}) as any as S.Schema<SendInvitesInput>;
export interface SendInvitesResponse {}
export const SendInvitesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "SendInvitesResponse",
}) as any as S.Schema<SendInvitesResponse>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tags: Tags,
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
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tagKeys: TagKeyList.pipe(T.HttpQuery("tagKeys")),
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
export interface UpdateChannelInput {
  spaceId: string;
  channelId: string;
  channelName: string | redacted.Redacted<string>;
  channelDescription?: string | redacted.Redacted<string>;
}
export const UpdateChannelInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceId: S.String.pipe(T.HttpLabel("spaceId")),
    channelId: S.String.pipe(T.HttpLabel("channelId")),
    channelName: SensitiveString,
    channelDescription: S.optional(SensitiveString),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/spaces/{spaceId}/channels/{channelId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateChannelInput",
}) as any as S.Schema<UpdateChannelInput>;
export interface UpdateChannelOutput {}
export const UpdateChannelOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateChannelOutput",
}) as any as S.Schema<UpdateChannelOutput>;
export interface UpdateSpaceInput {
  spaceId: string;
  description?: string | redacted.Redacted<string>;
  tier?: TierLevel;
  roleArn?: string;
  supportedEmailDomains?: SupportedEmailDomainsParameters;
}
export const UpdateSpaceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceId: S.String.pipe(T.HttpLabel("spaceId")),
    description: S.optional(SensitiveString),
    tier: S.optional(TierLevel),
    roleArn: S.optional(S.String),
    supportedEmailDomains: S.optional(SupportedEmailDomainsParameters),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/spaces/{spaceId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateSpaceInput",
}) as any as S.Schema<UpdateSpaceInput>;
export interface UpdateSpaceResponse {}
export const UpdateSpaceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateSpaceResponse",
}) as any as S.Schema<UpdateSpaceResponse>;
export type ValidationExceptionReason =
  | "unknownOperation"
  | "cannotParse"
  | "fieldValidationFailed"
  | "other"
  | (string & {});
export const ValidationExceptionReason = S.String;

export interface ValidationExceptionField {
  name: string;
  message: string;
}
export const ValidationExceptionField = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, message: S.String }),
).annotate({
  identifier: "ValidationExceptionField",
}) as any as S.Schema<ValidationExceptionField>;
export type ValidationExceptionFieldList = ValidationExceptionField[];
export const ValidationExceptionFieldList = /*@__PURE__*/ S.Array(
  ValidationExceptionField,
);
export type BatchAddChannelRoleToAccessorsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Add role to multiple users or groups in a private re:Post channel.
 */
export const batchAddChannelRoleToAccessors: API.OperationMethod<
  BatchAddChannelRoleToAccessorsInput,
  BatchAddChannelRoleToAccessorsOutput,
  BatchAddChannelRoleToAccessorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchAddChannelRoleToAccessorsInput,
  output: BatchAddChannelRoleToAccessorsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchAddChannelRoleToAccessors",
}));

export type BatchAddRoleError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Add a role to multiple users or groups in a private re:Post.
 */
export const batchAddRole: API.OperationMethod<
  BatchAddRoleInput,
  BatchAddRoleOutput,
  BatchAddRoleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchAddRoleInput,
  output: BatchAddRoleOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchAddRole",
}));

export type BatchRemoveChannelRoleFromAccessorsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Remove a role from multiple users or groups in a private re:Post channel.
 */
export const batchRemoveChannelRoleFromAccessors: API.OperationMethod<
  BatchRemoveChannelRoleFromAccessorsInput,
  BatchRemoveChannelRoleFromAccessorsOutput,
  BatchRemoveChannelRoleFromAccessorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchRemoveChannelRoleFromAccessorsInput,
  output: BatchRemoveChannelRoleFromAccessorsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchRemoveChannelRoleFromAccessors",
}));

export type BatchRemoveRoleError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Remove a role from multiple users or groups in a private re:Post.
 */
export const batchRemoveRole: API.OperationMethod<
  BatchRemoveRoleInput,
  BatchRemoveRoleOutput,
  BatchRemoveRoleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchRemoveRoleInput,
  output: BatchRemoveRoleOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchRemoveRole",
}));

export type CreateChannelError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a channel in an AWS re:Post Private private re:Post.
 */
export const createChannel: API.OperationMethod<
  CreateChannelInput,
  CreateChannelOutput,
  CreateChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateChannelInput,
  output: CreateChannelOutput,
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
  operationName: "CreateChannel",
}));

export type CreateSpaceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an AWS re:Post Private private re:Post.
 */
export const createSpace: API.OperationMethod<
  CreateSpaceInput,
  CreateSpaceOutput,
  CreateSpaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSpaceInput,
  output: CreateSpaceOutput,
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
  operationName: "CreateSpace",
}));

export type DeleteSpaceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an AWS re:Post Private private re:Post.
 */
export const deleteSpace: API.OperationMethod<
  DeleteSpaceInput,
  DeleteSpaceResponse,
  DeleteSpaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSpaceInput,
  output: DeleteSpaceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSpace",
}));

export type DeregisterAdminError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes the user or group from the list of administrators of the private re:Post.
 */
export const deregisterAdmin: API.OperationMethod<
  DeregisterAdminInput,
  DeregisterAdminResponse,
  DeregisterAdminError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeregisterAdminInput,
  output: DeregisterAdminResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterAdmin",
}));

export type GetChannelError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Displays information about a channel in a private re:Post.
 */
export const getChannel: API.OperationMethod<
  GetChannelInput,
  GetChannelOutput,
  GetChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetChannelInput,
  output: GetChannelOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetChannel",
}));

export type GetSpaceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Displays information about the AWS re:Post Private private re:Post.
 */
export const getSpace: API.OperationMethod<
  GetSpaceInput,
  GetSpaceOutput,
  GetSpaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSpaceInput,
  output: GetSpaceOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSpace",
}));

export type ListChannelsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns the list of channel within a private re:Post with some information about each channel.
 */
export const listChannels: API.PaginatedOperationMethod<
  ListChannelsInput,
  ListChannelsOutput,
  ListChannelsError,
  Credentials | HttpClient.HttpClient,
  ChannelData
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListChannelsInput,
  output: ListChannelsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListChannels",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "channels",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSpacesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of AWS re:Post Private private re:Posts in the account with some information about each private re:Post.
 */
export const listSpaces: API.PaginatedOperationMethod<
  ListSpacesInput,
  ListSpacesOutput,
  ListSpacesError,
  Credentials | HttpClient.HttpClient,
  SpaceData
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSpacesInput,
  output: ListSpacesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSpaces",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "spaces",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the tags that are associated with the AWS re:Post Private resource specified by the resourceArn. The only resource that can be tagged is a private re:Post.
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
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type RegisterAdminError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds a user or group to the list of administrators of the private re:Post.
 */
export const registerAdmin: API.OperationMethod<
  RegisterAdminInput,
  RegisterAdminResponse,
  RegisterAdminError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterAdminInput,
  output: RegisterAdminResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterAdmin",
}));

export type SendInvitesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sends an invitation email to selected users and groups.
 */
export const sendInvites: API.OperationMethod<
  SendInvitesInput,
  SendInvitesResponse,
  SendInvitesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SendInvitesInput,
  output: SendInvitesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendInvites",
}));

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates tags with an AWS re:Post Private resource. Currently, the only resource that can be tagged is the private re:Post. If you specify a new tag key for the resource, the tag is appended to the list of tags that are associated with the resource. If you specify a tag key that’s already associated with the resource, the new tag value that you specify replaces the previous value for that tag.
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
    AccessDeniedException,
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
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes the association of the tag with the AWS re:Post Private resource.
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
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateChannelError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Modifies an existing channel.
 */
export const updateChannel: API.OperationMethod<
  UpdateChannelInput,
  UpdateChannelOutput,
  UpdateChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateChannelInput,
  output: UpdateChannelOutput,
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
  operationName: "UpdateChannel",
}));

export type UpdateSpaceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Modifies an existing AWS re:Post Private private re:Post.
 */
export const updateSpace: API.OperationMethod<
  UpdateSpaceInput,
  UpdateSpaceResponse,
  UpdateSpaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSpaceInput,
  output: UpdateSpaceResponse,
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
  operationName: "UpdateSpace",
}));
