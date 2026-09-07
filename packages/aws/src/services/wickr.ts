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
  sdkId: "Wickr",
  serviceShapeName: "WickrAdminApi",
});
const auth = T.AwsAuthSigv4({ name: "wickr" });
const ver = T.ServiceVersion("2024-02-01");
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
              `https://admin.wickr-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://admin.wickr-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://admin.wickr.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://admin.wickr.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class BadRequestError
  extends /*@__PURE__*/ S.TaggedError<BadRequestError>()(
    "BadRequestError",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ForbiddenError
  extends /*@__PURE__*/ S.TaggedError<ForbiddenError>()(
    "ForbiddenError",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class InternalServerError
  extends /*@__PURE__*/ S.TaggedError<InternalServerError>()(
    "InternalServerError",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class RateLimitError
  extends /*@__PURE__*/ S.TaggedError<RateLimitError>()(
    "RateLimitError",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ResourceNotFoundError
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundError>()(
    "ResourceNotFoundError",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class UnauthorizedError
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedError>()(
    "UnauthorizedError",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(401),
  ).pipe(C.withAuthError) {}
export class ValidationError
  extends /*@__PURE__*/ S.TaggedError<ValidationError>()(
    "ValidationError",
    {
      reasons: S.optional(
        S.suspend(() => ErrorDetailList).annotate({
          identifier: "ErrorDetailList",
        }),
      ),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(422),
  ).pipe(C.withBadRequestError) {}
export type NetworkId = string;
export type SensitiveString = string | redacted.Redacted<string>;
export type SecurityGroupId = string;
export type SecurityGroupIdList = string[];
export const SecurityGroupIdList = /*@__PURE__*/ S.Array(S.String);
export interface BatchCreateUserRequestItem {
  firstName?: string | redacted.Redacted<string>;
  lastName?: string | redacted.Redacted<string>;
  securityGroupIds: string[];
  username: string;
  inviteCode?: string;
  inviteCodeTtl?: number;
  codeValidation?: boolean;
}
export const BatchCreateUserRequestItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    firstName: S.optional(SensitiveString),
    lastName: S.optional(SensitiveString),
    securityGroupIds: SecurityGroupIdList,
    username: S.String,
    inviteCode: S.optional(S.String),
    inviteCodeTtl: S.optional(S.Number),
    codeValidation: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "BatchCreateUserRequestItem",
}) as any as S.Schema<BatchCreateUserRequestItem>;
export type BatchCreateUserRequestItems = BatchCreateUserRequestItem[];
export const BatchCreateUserRequestItems = /*@__PURE__*/ S.Array(
  BatchCreateUserRequestItem,
);
export type ClientToken = string;
export interface BatchCreateUserRequest {
  networkId: string;
  users: BatchCreateUserRequestItem[];
  clientToken?: string;
}
export const BatchCreateUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    networkId: S.String.pipe(T.HttpLabel("networkId")),
    users: BatchCreateUserRequestItems,
    clientToken: S.optional(S.String).pipe(
      T.HttpHeader("X-Client-Token"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/networks/{networkId}/users" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchCreateUserRequest",
}) as any as S.Schema<BatchCreateUserRequest>;
export type UserId = string;
export interface User {
  userId?: string;
  firstName?: string | redacted.Redacted<string>;
  lastName?: string | redacted.Redacted<string>;
  username?: string;
  securityGroups?: string[];
  isAdmin?: boolean;
  suspended?: boolean;
  status?: number;
  otpEnabled?: boolean;
  scimId?: string;
  type?: string;
  cell?: string;
  countryCode?: string;
  challengeFailures?: number;
  isInviteExpired?: boolean;
  isUser?: boolean;
  inviteCode?: string;
  codeValidation?: boolean;
  uname?: string;
}
export const User = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    userId: S.optional(S.String),
    firstName: S.optional(SensitiveString),
    lastName: S.optional(SensitiveString),
    username: S.optional(S.String),
    securityGroups: S.optional(SecurityGroupIdList),
    isAdmin: S.optional(S.Boolean),
    suspended: S.optional(S.Boolean),
    status: S.optional(S.Number),
    otpEnabled: S.optional(S.Boolean),
    scimId: S.optional(S.String),
    type: S.optional(S.String),
    cell: S.optional(S.String),
    countryCode: S.optional(S.String),
    challengeFailures: S.optional(S.Number),
    isInviteExpired: S.optional(S.Boolean),
    isUser: S.optional(S.Boolean),
    inviteCode: S.optional(S.String),
    codeValidation: S.optional(S.Boolean),
    uname: S.optional(S.String),
  }),
).annotate({ identifier: "User" }) as any as S.Schema<User>;
export type Users = User[];
export const Users = /*@__PURE__*/ S.Array(User);
export interface BatchUserErrorResponseItem {
  field?: string;
  reason?: string;
  userId: string;
}
export const BatchUserErrorResponseItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    field: S.optional(S.String),
    reason: S.optional(S.String),
    userId: S.String,
  }),
).annotate({
  identifier: "BatchUserErrorResponseItem",
}) as any as S.Schema<BatchUserErrorResponseItem>;
export type BatchUserErrorResponseItems = BatchUserErrorResponseItem[];
export const BatchUserErrorResponseItems = /*@__PURE__*/ S.Array(
  BatchUserErrorResponseItem,
);
export interface BatchCreateUserResponse {
  message?: string;
  successful?: User[];
  failed?: BatchUserErrorResponseItem[];
}
export const BatchCreateUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    message: S.optional(S.String),
    successful: S.optional(Users),
    failed: S.optional(BatchUserErrorResponseItems),
  }),
).annotate({
  identifier: "BatchCreateUserResponse",
}) as any as S.Schema<BatchCreateUserResponse>;
export type UserIds = string[];
export const UserIds = /*@__PURE__*/ S.Array(S.String);
export interface BatchDeleteUserRequest {
  networkId: string;
  userIds: string[];
  clientToken?: string;
}
export const BatchDeleteUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    networkId: S.String.pipe(T.HttpLabel("networkId")),
    userIds: UserIds,
    clientToken: S.optional(S.String).pipe(
      T.HttpHeader("X-Client-Token"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/networks/{networkId}/users/batch-delete",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchDeleteUserRequest",
}) as any as S.Schema<BatchDeleteUserRequest>;
export interface BatchUserSuccessResponseItem {
  userId: string;
}
export const BatchUserSuccessResponseItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ userId: S.String }),
).annotate({
  identifier: "BatchUserSuccessResponseItem",
}) as any as S.Schema<BatchUserSuccessResponseItem>;
export type BatchUserSuccessResponseItems = BatchUserSuccessResponseItem[];
export const BatchUserSuccessResponseItems = /*@__PURE__*/ S.Array(
  BatchUserSuccessResponseItem,
);
export interface BatchDeleteUserResponse {
  message?: string;
  successful?: BatchUserSuccessResponseItem[];
  failed?: BatchUserErrorResponseItem[];
}
export const BatchDeleteUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    message: S.optional(S.String),
    successful: S.optional(BatchUserSuccessResponseItems),
    failed: S.optional(BatchUserErrorResponseItems),
  }),
).annotate({
  identifier: "BatchDeleteUserResponse",
}) as any as S.Schema<BatchDeleteUserResponse>;
export type Unames = string[];
export const Unames = /*@__PURE__*/ S.Array(S.String);
export interface BatchLookupUserUnameRequest {
  networkId: string;
  unames: string[];
  clientToken?: string;
}
export const BatchLookupUserUnameRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    networkId: S.String.pipe(T.HttpLabel("networkId")),
    unames: Unames,
    clientToken: S.optional(S.String).pipe(
      T.HttpHeader("X-Client-Token"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/networks/{networkId}/users/uname-lookup",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchLookupUserUnameRequest",
}) as any as S.Schema<BatchLookupUserUnameRequest>;
export type Uname = string;
export interface BatchUnameSuccessResponseItem {
  uname: string;
  username: string;
}
export const BatchUnameSuccessResponseItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ uname: S.String, username: S.String }),
).annotate({
  identifier: "BatchUnameSuccessResponseItem",
}) as any as S.Schema<BatchUnameSuccessResponseItem>;
export type BatchUnameSuccessResponseItems = BatchUnameSuccessResponseItem[];
export const BatchUnameSuccessResponseItems = /*@__PURE__*/ S.Array(
  BatchUnameSuccessResponseItem,
);
export interface BatchUnameErrorResponseItem {
  field?: string;
  reason?: string;
  uname: string;
}
export const BatchUnameErrorResponseItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    field: S.optional(S.String),
    reason: S.optional(S.String),
    uname: S.String,
  }),
).annotate({
  identifier: "BatchUnameErrorResponseItem",
}) as any as S.Schema<BatchUnameErrorResponseItem>;
export type BatchUnameErrorResponseItems = BatchUnameErrorResponseItem[];
export const BatchUnameErrorResponseItems = /*@__PURE__*/ S.Array(
  BatchUnameErrorResponseItem,
);
export interface BatchLookupUserUnameResponse {
  message?: string;
  successful?: BatchUnameSuccessResponseItem[];
  failed?: BatchUnameErrorResponseItem[];
}
export const BatchLookupUserUnameResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    message: S.optional(S.String),
    successful: S.optional(BatchUnameSuccessResponseItems),
    failed: S.optional(BatchUnameErrorResponseItems),
  }),
).annotate({
  identifier: "BatchLookupUserUnameResponse",
}) as any as S.Schema<BatchLookupUserUnameResponse>;
export interface BatchReinviteUserRequest {
  networkId: string;
  userIds: string[];
  clientToken?: string;
}
export const BatchReinviteUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    networkId: S.String.pipe(T.HttpLabel("networkId")),
    userIds: UserIds,
    clientToken: S.optional(S.String).pipe(
      T.HttpHeader("X-Client-Token"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/networks/{networkId}/users/re-invite" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchReinviteUserRequest",
}) as any as S.Schema<BatchReinviteUserRequest>;
export interface BatchReinviteUserResponse {
  message?: string;
  successful?: BatchUserSuccessResponseItem[];
  failed?: BatchUserErrorResponseItem[];
}
export const BatchReinviteUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    message: S.optional(S.String),
    successful: S.optional(BatchUserSuccessResponseItems),
    failed: S.optional(BatchUserErrorResponseItems),
  }),
).annotate({
  identifier: "BatchReinviteUserResponse",
}) as any as S.Schema<BatchReinviteUserResponse>;
export type AppIds = string[];
export const AppIds = /*@__PURE__*/ S.Array(S.String);
export interface BatchResetDevicesForUserRequest {
  networkId: string;
  userId: string;
  appIds: string[];
  clientToken?: string;
}
export const BatchResetDevicesForUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    networkId: S.String.pipe(T.HttpLabel("networkId")),
    userId: S.String.pipe(T.HttpLabel("userId")),
    appIds: AppIds,
    clientToken: S.optional(S.String).pipe(
      T.HttpHeader("X-Client-Token"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/networks/{networkId}/users/{userId}/devices",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchResetDevicesForUserRequest",
}) as any as S.Schema<BatchResetDevicesForUserRequest>;
export interface BatchDeviceSuccessResponseItem {
  appId: string;
}
export const BatchDeviceSuccessResponseItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ appId: S.String }),
).annotate({
  identifier: "BatchDeviceSuccessResponseItem",
}) as any as S.Schema<BatchDeviceSuccessResponseItem>;
export type BatchDeviceSuccessResponseItems = BatchDeviceSuccessResponseItem[];
export const BatchDeviceSuccessResponseItems = /*@__PURE__*/ S.Array(
  BatchDeviceSuccessResponseItem,
);
export interface BatchDeviceErrorResponseItem {
  field?: string;
  reason?: string;
  appId: string;
}
export const BatchDeviceErrorResponseItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    field: S.optional(S.String),
    reason: S.optional(S.String),
    appId: S.String,
  }),
).annotate({
  identifier: "BatchDeviceErrorResponseItem",
}) as any as S.Schema<BatchDeviceErrorResponseItem>;
export type BatchDeviceErrorResponseItems = BatchDeviceErrorResponseItem[];
export const BatchDeviceErrorResponseItems = /*@__PURE__*/ S.Array(
  BatchDeviceErrorResponseItem,
);
export interface BatchResetDevicesForUserResponse {
  message?: string;
  successful?: BatchDeviceSuccessResponseItem[];
  failed?: BatchDeviceErrorResponseItem[];
}
export const BatchResetDevicesForUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    message: S.optional(S.String),
    successful: S.optional(BatchDeviceSuccessResponseItems),
    failed: S.optional(BatchDeviceErrorResponseItems),
  }),
).annotate({
  identifier: "BatchResetDevicesForUserResponse",
}) as any as S.Schema<BatchResetDevicesForUserResponse>;
export interface BatchToggleUserSuspendStatusRequest {
  networkId: string;
  suspend: boolean;
  userIds: string[];
  clientToken?: string;
}
export const BatchToggleUserSuspendStatusRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    networkId: S.String.pipe(T.HttpLabel("networkId")),
    suspend: S.Boolean.pipe(T.HttpQuery("suspend")),
    userIds: UserIds,
    clientToken: S.optional(S.String).pipe(
      T.HttpHeader("X-Client-Token"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/networks/{networkId}/users/toggleSuspend",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchToggleUserSuspendStatusRequest",
}) as any as S.Schema<BatchToggleUserSuspendStatusRequest>;
export interface BatchToggleUserSuspendStatusResponse {
  message?: string;
  successful?: BatchUserSuccessResponseItem[];
  failed?: BatchUserErrorResponseItem[];
}
export const BatchToggleUserSuspendStatusResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      message: S.optional(S.String),
      successful: S.optional(BatchUserSuccessResponseItems),
      failed: S.optional(BatchUserErrorResponseItems),
    }),
).annotate({
  identifier: "BatchToggleUserSuspendStatusResponse",
}) as any as S.Schema<BatchToggleUserSuspendStatusResponse>;
export interface CreateBotRequest {
  networkId: string;
  username: string;
  displayName?: string;
  groupId: string;
  challenge: string | redacted.Redacted<string>;
}
export const CreateBotRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    networkId: S.String.pipe(T.HttpLabel("networkId")),
    username: S.String,
    displayName: S.optional(S.String),
    groupId: S.String,
    challenge: SensitiveString,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/networks/{networkId}/bots" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateBotRequest",
}) as any as S.Schema<CreateBotRequest>;
export type BotId = string;
export interface CreateBotResponse {
  message?: string;
  botId: string;
  networkId?: string;
  username?: string;
  displayName?: string;
  groupId?: string;
}
export const CreateBotResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    message: S.optional(S.String),
    botId: S.String,
    networkId: S.optional(S.String),
    username: S.optional(S.String),
    displayName: S.optional(S.String),
    groupId: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateBotResponse",
}) as any as S.Schema<CreateBotResponse>;
export interface CreateDataRetentionBotRequest {
  networkId: string;
}
export const CreateDataRetentionBotRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ networkId: S.String.pipe(T.HttpLabel("networkId")) }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/networks/{networkId}/data-retention-bots",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDataRetentionBotRequest",
}) as any as S.Schema<CreateDataRetentionBotRequest>;
export interface CreateDataRetentionBotResponse {
  message?: string;
}
export const CreateDataRetentionBotResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ message: S.optional(S.String) }),
).annotate({
  identifier: "CreateDataRetentionBotResponse",
}) as any as S.Schema<CreateDataRetentionBotResponse>;
export interface CreateDataRetentionBotChallengeRequest {
  networkId: string;
}
export const CreateDataRetentionBotChallengeRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ networkId: S.String.pipe(T.HttpLabel("networkId")) }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/networks/{networkId}/data-retention-bots/challenge",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateDataRetentionBotChallengeRequest",
}) as any as S.Schema<CreateDataRetentionBotChallengeRequest>;
export interface CreateDataRetentionBotChallengeResponse {
  challenge: string | redacted.Redacted<string>;
}
export const CreateDataRetentionBotChallengeResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ challenge: SensitiveString }),
).annotate({
  identifier: "CreateDataRetentionBotChallengeResponse",
}) as any as S.Schema<CreateDataRetentionBotChallengeResponse>;
export type AccessLevel = "STANDARD" | "PREMIUM" | (string & {});
export const AccessLevel = S.String;

export interface CreateNetworkRequest {
  networkName: string;
  accessLevel: AccessLevel;
  enablePremiumFreeTrial?: boolean;
  encryptionKeyArn?: string;
}
export const CreateNetworkRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    networkName: S.String,
    accessLevel: AccessLevel,
    enablePremiumFreeTrial: S.optional(S.Boolean),
    encryptionKeyArn: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/networks" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateNetworkRequest",
}) as any as S.Schema<CreateNetworkRequest>;
export interface CreateNetworkResponse {
  networkId?: string;
  networkName?: string;
  encryptionKeyArn?: string;
}
export const CreateNetworkResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    networkId: S.optional(S.String),
    networkName: S.optional(S.String),
    encryptionKeyArn: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateNetworkResponse",
}) as any as S.Schema<CreateNetworkResponse>;
export type PermittedNetworksList = string[];
export const PermittedNetworksList = /*@__PURE__*/ S.Array(S.String);
export interface WickrAwsNetworks {
  region: string;
  networkId: string;
}
export const WickrAwsNetworks = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ region: S.String, networkId: S.String }),
).annotate({
  identifier: "WickrAwsNetworks",
}) as any as S.Schema<WickrAwsNetworks>;
export type WickrAwsNetworksList = WickrAwsNetworks[];
export const WickrAwsNetworksList = /*@__PURE__*/ S.Array(WickrAwsNetworks);
export interface PermittedWickrEnterpriseNetwork {
  domain: string;
  networkId: string;
}
export const PermittedWickrEnterpriseNetwork = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ domain: S.String, networkId: S.String }),
).annotate({
  identifier: "PermittedWickrEnterpriseNetwork",
}) as any as S.Schema<PermittedWickrEnterpriseNetwork>;
export type PermittedWickrEnterpriseNetworksList =
  PermittedWickrEnterpriseNetwork[];
export const PermittedWickrEnterpriseNetworksList = /*@__PURE__*/ S.Array(
  PermittedWickrEnterpriseNetwork,
);
export interface SecurityGroupSettingsRequest {
  lockoutThreshold?: number;
  permittedNetworks?: string[];
  enableGuestFederation?: boolean;
  globalFederation?: boolean;
  federationMode?: number;
  enableRestrictedGlobalFederation?: boolean;
  permittedWickrAwsNetworks?: WickrAwsNetworks[];
  permittedWickrEnterpriseNetworks?: PermittedWickrEnterpriseNetwork[];
}
export const SecurityGroupSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    lockoutThreshold: S.optional(S.Number),
    permittedNetworks: S.optional(PermittedNetworksList),
    enableGuestFederation: S.optional(S.Boolean),
    globalFederation: S.optional(S.Boolean),
    federationMode: S.optional(S.Number),
    enableRestrictedGlobalFederation: S.optional(S.Boolean),
    permittedWickrAwsNetworks: S.optional(WickrAwsNetworksList),
    permittedWickrEnterpriseNetworks: S.optional(
      PermittedWickrEnterpriseNetworksList,
    ),
  }),
).annotate({
  identifier: "SecurityGroupSettingsRequest",
}) as any as S.Schema<SecurityGroupSettingsRequest>;
export interface CreateSecurityGroupRequest {
  networkId: string;
  name: string;
  securityGroupSettings: SecurityGroupSettingsRequest;
  clientToken?: string;
}
export const CreateSecurityGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    networkId: S.String.pipe(T.HttpLabel("networkId")),
    name: S.String,
    securityGroupSettings: SecurityGroupSettingsRequest,
    clientToken: S.optional(S.String).pipe(
      T.HttpHeader("X-Client-Token"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/networks/{networkId}/security-groups" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateSecurityGroupRequest",
}) as any as S.Schema<CreateSecurityGroupRequest>;
export type SecurityGroupStringList = string[];
export const SecurityGroupStringList = /*@__PURE__*/ S.Array(S.String);
export interface CallingSettings {
  canStart11Call?: boolean;
  canVideoCall?: boolean;
  forceTcpCall?: boolean;
}
export const CallingSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    canStart11Call: S.optional(S.Boolean),
    canVideoCall: S.optional(S.Boolean),
    forceTcpCall: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "CallingSettings",
}) as any as S.Schema<CallingSettings>;
export interface PasswordRequirements {
  lowercase?: number;
  minLength?: number;
  numbers?: number;
  symbols?: number;
  uppercase?: number;
}
export const PasswordRequirements = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    lowercase: S.optional(S.Number),
    minLength: S.optional(S.Number),
    numbers: S.optional(S.Number),
    symbols: S.optional(S.Number),
    uppercase: S.optional(S.Number),
  }),
).annotate({
  identifier: "PasswordRequirements",
}) as any as S.Schema<PasswordRequirements>;
export interface ShredderSettings {
  canProcessManually?: boolean;
  intensity?: number;
}
export const ShredderSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    canProcessManually: S.optional(S.Boolean),
    intensity: S.optional(S.Number),
  }),
).annotate({
  identifier: "ShredderSettings",
}) as any as S.Schema<ShredderSettings>;
export interface SecurityGroupSettings {
  alwaysReauthenticate?: boolean;
  atakPackageValues?: string[];
  calling?: CallingSettings;
  checkForUpdates?: boolean;
  enableAtak?: boolean;
  enableCrashReports?: boolean;
  enableFileDownload?: boolean;
  enableGuestFederation?: boolean;
  enableNotificationPreview?: boolean;
  enableOpenAccessOption?: boolean;
  enableRestrictedGlobalFederation?: boolean;
  filesEnabled?: boolean;
  forceDeviceLockout?: number;
  forceOpenAccess?: boolean;
  forceReadReceipts?: boolean;
  globalFederation?: boolean;
  isAtoEnabled?: boolean;
  isLinkPreviewEnabled?: boolean;
  locationAllowMaps?: boolean;
  locationEnabled?: boolean;
  maxAutoDownloadSize?: number;
  maxBor?: number;
  maxTtl?: number;
  messageForwardingEnabled?: boolean;
  passwordRequirements?: PasswordRequirements;
  presenceEnabled?: boolean;
  quickResponses?: string[];
  showMasterRecoveryKey?: boolean;
  shredder?: ShredderSettings;
  ssoMaxIdleMinutes?: number;
  maxNonSsoSessionMinutes?: number;
  federationMode?: number;
  lockoutThreshold?: number;
  permittedNetworks?: string[];
  permittedWickrAwsNetworks?: WickrAwsNetworks[];
  permittedWickrEnterpriseNetworks?: PermittedWickrEnterpriseNetwork[];
}
export const SecurityGroupSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    alwaysReauthenticate: S.optional(S.Boolean),
    atakPackageValues: S.optional(SecurityGroupStringList),
    calling: S.optional(CallingSettings),
    checkForUpdates: S.optional(S.Boolean),
    enableAtak: S.optional(S.Boolean),
    enableCrashReports: S.optional(S.Boolean),
    enableFileDownload: S.optional(S.Boolean),
    enableGuestFederation: S.optional(S.Boolean),
    enableNotificationPreview: S.optional(S.Boolean),
    enableOpenAccessOption: S.optional(S.Boolean),
    enableRestrictedGlobalFederation: S.optional(S.Boolean),
    filesEnabled: S.optional(S.Boolean),
    forceDeviceLockout: S.optional(S.Number),
    forceOpenAccess: S.optional(S.Boolean),
    forceReadReceipts: S.optional(S.Boolean),
    globalFederation: S.optional(S.Boolean),
    isAtoEnabled: S.optional(S.Boolean),
    isLinkPreviewEnabled: S.optional(S.Boolean),
    locationAllowMaps: S.optional(S.Boolean),
    locationEnabled: S.optional(S.Boolean),
    maxAutoDownloadSize: S.optional(S.Number),
    maxBor: S.optional(S.Number),
    maxTtl: S.optional(S.Number),
    messageForwardingEnabled: S.optional(S.Boolean),
    passwordRequirements: S.optional(PasswordRequirements),
    presenceEnabled: S.optional(S.Boolean),
    quickResponses: S.optional(SecurityGroupStringList),
    showMasterRecoveryKey: S.optional(S.Boolean),
    shredder: S.optional(ShredderSettings),
    ssoMaxIdleMinutes: S.optional(S.Number),
    maxNonSsoSessionMinutes: S.optional(S.Number),
    federationMode: S.optional(S.Number),
    lockoutThreshold: S.optional(S.Number),
    permittedNetworks: S.optional(PermittedNetworksList),
    permittedWickrAwsNetworks: S.optional(WickrAwsNetworksList),
    permittedWickrEnterpriseNetworks: S.optional(
      PermittedWickrEnterpriseNetworksList,
    ),
  }),
).annotate({
  identifier: "SecurityGroupSettings",
}) as any as S.Schema<SecurityGroupSettings>;
export interface SecurityGroup {
  activeMembers: number;
  botMembers: number;
  activeDirectoryGuid?: string;
  id: string;
  isDefault: boolean;
  name: string;
  modified: number;
  securityGroupSettings: SecurityGroupSettings;
}
export const SecurityGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    activeMembers: S.Number,
    botMembers: S.Number,
    activeDirectoryGuid: S.optional(S.String),
    id: S.String,
    isDefault: S.Boolean,
    name: S.String,
    modified: S.Number,
    securityGroupSettings: SecurityGroupSettings,
  }),
).annotate({ identifier: "SecurityGroup" }) as any as S.Schema<SecurityGroup>;
export interface CreateSecurityGroupResponse {
  securityGroup: SecurityGroup;
}
export const CreateSecurityGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ securityGroup: SecurityGroup }),
).annotate({
  identifier: "CreateSecurityGroupResponse",
}) as any as S.Schema<CreateSecurityGroupResponse>;
export interface DeleteBotRequest {
  networkId: string;
  botId: string;
}
export const DeleteBotRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    networkId: S.String.pipe(T.HttpLabel("networkId")),
    botId: S.String.pipe(T.HttpLabel("botId")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/networks/{networkId}/bots/{botId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteBotRequest",
}) as any as S.Schema<DeleteBotRequest>;
export interface DeleteBotResponse {
  message?: string;
}
export const DeleteBotResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ message: S.optional(S.String) }),
).annotate({
  identifier: "DeleteBotResponse",
}) as any as S.Schema<DeleteBotResponse>;
export interface DeleteDataRetentionBotRequest {
  networkId: string;
}
export const DeleteDataRetentionBotRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ networkId: S.String.pipe(T.HttpLabel("networkId")) }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/networks/{networkId}/data-retention-bots",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDataRetentionBotRequest",
}) as any as S.Schema<DeleteDataRetentionBotRequest>;
export interface DeleteDataRetentionBotResponse {
  message?: string;
}
export const DeleteDataRetentionBotResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ message: S.optional(S.String) }),
).annotate({
  identifier: "DeleteDataRetentionBotResponse",
}) as any as S.Schema<DeleteDataRetentionBotResponse>;
export interface DeleteNetworkRequest {
  networkId: string;
  clientToken?: string;
}
export const DeleteNetworkRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    networkId: S.String.pipe(T.HttpLabel("networkId")),
    clientToken: S.optional(S.String).pipe(
      T.HttpHeader("X-Client-Token"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/networks/{networkId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteNetworkRequest",
}) as any as S.Schema<DeleteNetworkRequest>;
export interface DeleteNetworkResponse {
  message?: string;
}
export const DeleteNetworkResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ message: S.optional(S.String) }),
).annotate({
  identifier: "DeleteNetworkResponse",
}) as any as S.Schema<DeleteNetworkResponse>;
export interface DeleteSecurityGroupRequest {
  networkId: string;
  groupId: string;
}
export const DeleteSecurityGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    networkId: S.String.pipe(T.HttpLabel("networkId")),
    groupId: S.String.pipe(T.HttpLabel("groupId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/networks/{networkId}/security-groups/{groupId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSecurityGroupRequest",
}) as any as S.Schema<DeleteSecurityGroupRequest>;
export interface DeleteSecurityGroupResponse {
  message?: string;
  networkId?: string;
  groupId?: string;
}
export const DeleteSecurityGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    message: S.optional(S.String),
    networkId: S.optional(S.String),
    groupId: S.optional(S.String),
  }),
).annotate({
  identifier: "DeleteSecurityGroupResponse",
}) as any as S.Schema<DeleteSecurityGroupResponse>;
export interface GetBotRequest {
  networkId: string;
  botId: string;
}
export const GetBotRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    networkId: S.String.pipe(T.HttpLabel("networkId")),
    botId: S.String.pipe(T.HttpLabel("botId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/networks/{networkId}/bots/{botId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetBotRequest" }) as any as S.Schema<GetBotRequest>;
export type BotStatus = 1 | 2 | (number & {});
export const BotStatus = S.Number;
export interface GetBotResponse {
  botId?: string;
  displayName?: string;
  username?: string;
  uname?: string;
  pubkey?: string;
  status?: BotStatus;
  groupId?: string;
  hasChallenge?: boolean;
  suspended?: boolean;
  lastLogin?: string;
}
export const GetBotResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.optional(S.String),
    displayName: S.optional(S.String),
    username: S.optional(S.String),
    uname: S.optional(S.String),
    pubkey: S.optional(S.String),
    status: S.optional(BotStatus),
    groupId: S.optional(S.String),
    hasChallenge: S.optional(S.Boolean),
    suspended: S.optional(S.Boolean),
    lastLogin: S.optional(S.String),
  }),
).annotate({ identifier: "GetBotResponse" }) as any as S.Schema<GetBotResponse>;
export interface GetBotsCountRequest {
  networkId: string;
}
export const GetBotsCountRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ networkId: S.String.pipe(T.HttpLabel("networkId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/networks/{networkId}/bots/count" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetBotsCountRequest",
}) as any as S.Schema<GetBotsCountRequest>;
export interface GetBotsCountResponse {
  pending: number;
  active: number;
  total: number;
}
export const GetBotsCountResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ pending: S.Number, active: S.Number, total: S.Number }),
).annotate({
  identifier: "GetBotsCountResponse",
}) as any as S.Schema<GetBotsCountResponse>;
export interface GetDataRetentionBotRequest {
  networkId: string;
}
export const GetDataRetentionBotRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ networkId: S.String.pipe(T.HttpLabel("networkId")) }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/networks/{networkId}/data-retention-bots",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDataRetentionBotRequest",
}) as any as S.Schema<GetDataRetentionBotRequest>;
export interface GetDataRetentionBotResponse {
  botName?: string;
  botExists?: boolean;
  isBotActive?: boolean;
  isDataRetentionBotRegistered?: boolean;
  isDataRetentionServiceEnabled?: boolean;
  isPubkeyMsgAcked?: boolean;
}
export const GetDataRetentionBotResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botName: S.optional(S.String),
    botExists: S.optional(S.Boolean),
    isBotActive: S.optional(S.Boolean),
    isDataRetentionBotRegistered: S.optional(S.Boolean),
    isDataRetentionServiceEnabled: S.optional(S.Boolean),
    isPubkeyMsgAcked: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "GetDataRetentionBotResponse",
}) as any as S.Schema<GetDataRetentionBotResponse>;
export interface GetGuestUserHistoryCountRequest {
  networkId: string;
}
export const GetGuestUserHistoryCountRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ networkId: S.String.pipe(T.HttpLabel("networkId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/networks/{networkId}/guest-users/count" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetGuestUserHistoryCountRequest",
}) as any as S.Schema<GetGuestUserHistoryCountRequest>;
export interface GuestUserHistoryCount {
  month: string;
  count: string;
}
export const GuestUserHistoryCount = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ month: S.String, count: S.String }),
).annotate({
  identifier: "GuestUserHistoryCount",
}) as any as S.Schema<GuestUserHistoryCount>;
export type GuestUserHistoryCountList = GuestUserHistoryCount[];
export const GuestUserHistoryCountList = /*@__PURE__*/ S.Array(
  GuestUserHistoryCount,
);
export interface GetGuestUserHistoryCountResponse {
  history: GuestUserHistoryCount[];
}
export const GetGuestUserHistoryCountResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ history: GuestUserHistoryCountList }),
).annotate({
  identifier: "GetGuestUserHistoryCountResponse",
}) as any as S.Schema<GetGuestUserHistoryCountResponse>;
export interface GetNetworkRequest {
  networkId: string;
}
export const GetNetworkRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ networkId: S.String.pipe(T.HttpLabel("networkId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/networks/{networkId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetNetworkRequest",
}) as any as S.Schema<GetNetworkRequest>;
export interface GetNetworkResponse {
  networkId: string;
  networkName: string;
  accessLevel: AccessLevel;
  awsAccountId: string;
  networkArn: string;
  standing?: number;
  freeTrialExpiration?: string;
  migrationState?: number;
  encryptionKeyArn?: string;
}
export const GetNetworkResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    networkId: S.String,
    networkName: S.String,
    accessLevel: AccessLevel,
    awsAccountId: S.String,
    networkArn: S.String,
    standing: S.optional(S.Number),
    freeTrialExpiration: S.optional(S.String),
    migrationState: S.optional(S.Number),
    encryptionKeyArn: S.optional(S.String),
  }),
).annotate({
  identifier: "GetNetworkResponse",
}) as any as S.Schema<GetNetworkResponse>;
export interface GetNetworkSettingsRequest {
  networkId: string;
}
export const GetNetworkSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ networkId: S.String.pipe(T.HttpLabel("networkId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/networks/{networkId}/settings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetNetworkSettingsRequest",
}) as any as S.Schema<GetNetworkSettingsRequest>;
export interface Setting {
  optionName: string;
  value: string;
  type: string;
}
export const Setting = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ optionName: S.String, value: S.String, type: S.String }),
).annotate({ identifier: "Setting" }) as any as S.Schema<Setting>;
export type SettingsList = Setting[];
export const SettingsList = /*@__PURE__*/ S.Array(Setting);
export interface GetNetworkSettingsResponse {
  settings: Setting[];
}
export const GetNetworkSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ settings: SettingsList }),
).annotate({
  identifier: "GetNetworkSettingsResponse",
}) as any as S.Schema<GetNetworkSettingsResponse>;
export interface GetOidcInfoRequest {
  networkId: string;
  clientId?: string;
  code?: string;
  grantType?: string;
  redirectUri?: string;
  url?: string;
  clientSecret?: string | redacted.Redacted<string>;
  codeVerifier?: string;
  certificate?: string;
}
export const GetOidcInfoRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    networkId: S.String.pipe(T.HttpLabel("networkId")),
    clientId: S.optional(S.String).pipe(T.HttpQuery("clientId")),
    code: S.optional(S.String).pipe(T.HttpQuery("code")),
    grantType: S.optional(S.String).pipe(T.HttpQuery("grantType")),
    redirectUri: S.optional(S.String).pipe(T.HttpQuery("redirectUri")),
    url: S.optional(S.String).pipe(T.HttpQuery("url")),
    clientSecret: S.optional(SensitiveString).pipe(T.HttpQuery("clientSecret")),
    codeVerifier: S.optional(S.String).pipe(T.HttpQuery("codeVerifier")),
    certificate: S.optional(S.String).pipe(T.HttpQuery("certificate")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/networks/{networkId}/oidc" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetOidcInfoRequest",
}) as any as S.Schema<GetOidcInfoRequest>;
export interface OidcConfigInfo {
  applicationName?: string;
  clientId?: string;
  companyId: string;
  scopes: string;
  issuer: string;
  clientSecret?: string | redacted.Redacted<string>;
  secret?: string | redacted.Redacted<string>;
  redirectUrl?: string;
  userId?: string;
  customUsername?: string;
  caCertificate?: string;
  applicationId?: number;
  ssoTokenBufferMinutes?: number;
  extraAuthParams?: string;
}
export const OidcConfigInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationName: S.optional(S.String),
    clientId: S.optional(S.String),
    companyId: S.String,
    scopes: S.String,
    issuer: S.String,
    clientSecret: S.optional(SensitiveString),
    secret: S.optional(SensitiveString),
    redirectUrl: S.optional(S.String),
    userId: S.optional(S.String),
    customUsername: S.optional(S.String),
    caCertificate: S.optional(S.String),
    applicationId: S.optional(S.Number),
    ssoTokenBufferMinutes: S.optional(S.Number),
    extraAuthParams: S.optional(S.String),
  }),
).annotate({ identifier: "OidcConfigInfo" }) as any as S.Schema<OidcConfigInfo>;
export interface OidcTokenInfo {
  codeVerifier?: string;
  codeChallenge?: string;
  accessToken?: string;
  idToken?: string;
  refreshToken?: string;
  tokenType?: string;
  expiresIn?: number;
}
export const OidcTokenInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    codeVerifier: S.optional(S.String),
    codeChallenge: S.optional(S.String),
    accessToken: S.optional(S.String),
    idToken: S.optional(S.String),
    refreshToken: S.optional(S.String),
    tokenType: S.optional(S.String),
    expiresIn: S.optional(S.Number),
  }),
).annotate({ identifier: "OidcTokenInfo" }) as any as S.Schema<OidcTokenInfo>;
export interface GetOidcInfoResponse {
  openidConnectInfo?: OidcConfigInfo;
  tokenInfo?: OidcTokenInfo;
}
export const GetOidcInfoResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    openidConnectInfo: S.optional(OidcConfigInfo),
    tokenInfo: S.optional(OidcTokenInfo),
  }),
).annotate({
  identifier: "GetOidcInfoResponse",
}) as any as S.Schema<GetOidcInfoResponse>;
export interface GetOpentdfConfigRequest {
  networkId: string;
}
export const GetOpentdfConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ networkId: S.String.pipe(T.HttpLabel("networkId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/networks/{networkId}/tdf" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetOpentdfConfigRequest",
}) as any as S.Schema<GetOpentdfConfigRequest>;
export interface GetOpentdfConfigResponse {
  clientId: string;
  domain: string;
  clientSecret: string | redacted.Redacted<string>;
  provider: string;
}
export const GetOpentdfConfigResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientId: S.String,
    domain: S.String,
    clientSecret: SensitiveString,
    provider: S.String,
  }),
).annotate({
  identifier: "GetOpentdfConfigResponse",
}) as any as S.Schema<GetOpentdfConfigResponse>;
export interface GetSecurityGroupRequest {
  networkId: string;
  groupId: string;
}
export const GetSecurityGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    networkId: S.String.pipe(T.HttpLabel("networkId")),
    groupId: S.String.pipe(T.HttpLabel("groupId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/networks/{networkId}/security-groups/{groupId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSecurityGroupRequest",
}) as any as S.Schema<GetSecurityGroupRequest>;
export interface GetSecurityGroupResponse {
  securityGroup: SecurityGroup;
}
export const GetSecurityGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ securityGroup: SecurityGroup }),
).annotate({
  identifier: "GetSecurityGroupResponse",
}) as any as S.Schema<GetSecurityGroupResponse>;
export interface GetUserRequest {
  networkId: string;
  userId: string;
  startTime?: Date;
  endTime?: Date;
}
export const GetUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    networkId: S.String.pipe(T.HttpLabel("networkId")),
    userId: S.String.pipe(T.HttpLabel("userId")),
    startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
      T.HttpQuery("startTime"),
    ),
    endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
      T.HttpQuery("endTime"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/networks/{networkId}/users/{userId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetUserRequest" }) as any as S.Schema<GetUserRequest>;
export interface GetUserResponse {
  userId: string;
  firstName?: string | redacted.Redacted<string>;
  lastName?: string | redacted.Redacted<string>;
  username?: string;
  isAdmin?: boolean;
  suspended?: boolean;
  status?: number;
  lastActivity?: number;
  lastLogin?: number;
  securityGroupIds?: string[];
}
export const GetUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    userId: S.String,
    firstName: S.optional(SensitiveString),
    lastName: S.optional(SensitiveString),
    username: S.optional(S.String),
    isAdmin: S.optional(S.Boolean),
    suspended: S.optional(S.Boolean),
    status: S.optional(S.Number),
    lastActivity: S.optional(S.Number),
    lastLogin: S.optional(S.Number),
    securityGroupIds: S.optional(SecurityGroupIdList),
  }),
).annotate({
  identifier: "GetUserResponse",
}) as any as S.Schema<GetUserResponse>;
export interface GetUsersCountRequest {
  networkId: string;
}
export const GetUsersCountRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ networkId: S.String.pipe(T.HttpLabel("networkId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/networks/{networkId}/users/count" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetUsersCountRequest",
}) as any as S.Schema<GetUsersCountRequest>;
export interface GetUsersCountResponse {
  pending: number;
  active: number;
  rejected: number;
  remaining: number;
  total: number;
}
export const GetUsersCountResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pending: S.Number,
    active: S.Number,
    rejected: S.Number,
    remaining: S.Number,
    total: S.Number,
  }),
).annotate({
  identifier: "GetUsersCountResponse",
}) as any as S.Schema<GetUsersCountResponse>;
export type SortDirection = "ASC" | "DESC" | (string & {});
export const SortDirection = S.String;

export interface ListBlockedGuestUsersRequest {
  networkId: string;
  maxResults?: number;
  sortDirection?: SortDirection;
  sortFields?: string;
  username?: string;
  admin?: string;
  nextToken?: string;
}
export const ListBlockedGuestUsersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    networkId: S.String.pipe(T.HttpLabel("networkId")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    sortDirection: S.optional(SortDirection).pipe(T.HttpQuery("sortDirection")),
    sortFields: S.optional(S.String).pipe(T.HttpQuery("sortFields")),
    username: S.optional(S.String).pipe(T.HttpQuery("username")),
    admin: S.optional(S.String).pipe(T.HttpQuery("admin")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/networks/{networkId}/guest-users/blocklist",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListBlockedGuestUsersRequest",
}) as any as S.Schema<ListBlockedGuestUsersRequest>;
export interface BlockedGuestUser {
  username: string;
  admin: string;
  modified: string;
  usernameHash: string;
}
export const BlockedGuestUser = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    username: S.String,
    admin: S.String,
    modified: S.String,
    usernameHash: S.String,
  }),
).annotate({
  identifier: "BlockedGuestUser",
}) as any as S.Schema<BlockedGuestUser>;
export type BlockedGuestUserList = BlockedGuestUser[];
export const BlockedGuestUserList = /*@__PURE__*/ S.Array(BlockedGuestUser);
export interface ListBlockedGuestUsersResponse {
  nextToken?: string;
  blocklist: BlockedGuestUser[];
}
export const ListBlockedGuestUsersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    blocklist: BlockedGuestUserList,
  }),
).annotate({
  identifier: "ListBlockedGuestUsersResponse",
}) as any as S.Schema<ListBlockedGuestUsersResponse>;
export interface ListBotsRequest {
  networkId: string;
  nextToken?: string;
  maxResults?: number;
  sortFields?: string;
  sortDirection?: SortDirection;
  displayName?: string;
  username?: string;
  status?: BotStatus;
  groupId?: string;
}
export const ListBotsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    networkId: S.String.pipe(T.HttpLabel("networkId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    sortFields: S.optional(S.String).pipe(T.HttpQuery("sortFields")),
    sortDirection: S.optional(SortDirection).pipe(T.HttpQuery("sortDirection")),
    displayName: S.optional(S.String).pipe(T.HttpQuery("displayName")),
    username: S.optional(S.String).pipe(T.HttpQuery("username")),
    status: S.optional(BotStatus).pipe(T.HttpQuery("status")),
    groupId: S.optional(S.String).pipe(T.HttpQuery("groupId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/networks/{networkId}/bots" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListBotsRequest",
}) as any as S.Schema<ListBotsRequest>;
export interface Bot {
  botId?: string;
  displayName?: string;
  username?: string;
  uname?: string;
  pubkey?: string;
  status?: BotStatus;
  groupId?: string;
  hasChallenge?: boolean;
  suspended?: boolean;
  lastLogin?: string;
}
export const Bot = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.optional(S.String),
    displayName: S.optional(S.String),
    username: S.optional(S.String),
    uname: S.optional(S.String),
    pubkey: S.optional(S.String),
    status: S.optional(BotStatus),
    groupId: S.optional(S.String),
    hasChallenge: S.optional(S.Boolean),
    suspended: S.optional(S.Boolean),
    lastLogin: S.optional(S.String),
  }),
).annotate({ identifier: "Bot" }) as any as S.Schema<Bot>;
export type Bots = Bot[];
export const Bots = /*@__PURE__*/ S.Array(Bot);
export interface ListBotsResponse {
  bots: Bot[];
  nextToken?: string;
}
export const ListBotsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ bots: Bots, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListBotsResponse",
}) as any as S.Schema<ListBotsResponse>;
export interface ListDevicesForUserRequest {
  networkId: string;
  userId: string;
  nextToken?: string;
  maxResults?: number;
  sortFields?: string;
  sortDirection?: SortDirection;
}
export const ListDevicesForUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    networkId: S.String.pipe(T.HttpLabel("networkId")),
    userId: S.String.pipe(T.HttpLabel("userId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    sortFields: S.optional(S.String).pipe(T.HttpQuery("sortFields")),
    sortDirection: S.optional(SortDirection).pipe(T.HttpQuery("sortDirection")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/networks/{networkId}/users/{userId}/devices",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDevicesForUserRequest",
}) as any as S.Schema<ListDevicesForUserRequest>;
export interface BasicDeviceObject {
  appId?: string;
  created?: string;
  lastLogin?: string;
  statusText?: string;
  suspend?: boolean;
  type?: string;
}
export const BasicDeviceObject = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.optional(S.String),
    created: S.optional(S.String),
    lastLogin: S.optional(S.String),
    statusText: S.optional(S.String),
    suspend: S.optional(S.Boolean),
    type: S.optional(S.String),
  }),
).annotate({
  identifier: "BasicDeviceObject",
}) as any as S.Schema<BasicDeviceObject>;
export type Devices = BasicDeviceObject[];
export const Devices = /*@__PURE__*/ S.Array(BasicDeviceObject);
export interface ListDevicesForUserResponse {
  nextToken?: string;
  devices: BasicDeviceObject[];
}
export const ListDevicesForUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), devices: Devices }),
).annotate({
  identifier: "ListDevicesForUserResponse",
}) as any as S.Schema<ListDevicesForUserResponse>;
export interface ListGuestUsersRequest {
  networkId: string;
  maxResults?: number;
  sortDirection?: SortDirection;
  sortFields?: string;
  username?: string;
  billingPeriod?: string;
  nextToken?: string;
}
export const ListGuestUsersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    networkId: S.String.pipe(T.HttpLabel("networkId")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    sortDirection: S.optional(SortDirection).pipe(T.HttpQuery("sortDirection")),
    sortFields: S.optional(S.String).pipe(T.HttpQuery("sortFields")),
    username: S.optional(S.String).pipe(T.HttpQuery("username")),
    billingPeriod: S.optional(S.String).pipe(T.HttpQuery("billingPeriod")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/networks/{networkId}/guest-users" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListGuestUsersRequest",
}) as any as S.Schema<ListGuestUsersRequest>;
export interface GuestUser {
  billingPeriod: string;
  username: string;
  usernameHash: string;
}
export const GuestUser = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    billingPeriod: S.String,
    username: S.String,
    usernameHash: S.String,
  }),
).annotate({ identifier: "GuestUser" }) as any as S.Schema<GuestUser>;
export type GuestUserList = GuestUser[];
export const GuestUserList = /*@__PURE__*/ S.Array(GuestUser);
export interface ListGuestUsersResponse {
  nextToken?: string;
  guestlist: GuestUser[];
}
export const ListGuestUsersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), guestlist: GuestUserList }),
).annotate({
  identifier: "ListGuestUsersResponse",
}) as any as S.Schema<ListGuestUsersResponse>;
export interface ListNetworksRequest {
  maxResults?: number;
  sortFields?: string;
  sortDirection?: SortDirection;
  nextToken?: string;
}
export const ListNetworksRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    sortFields: S.optional(S.String).pipe(T.HttpQuery("sortFields")),
    sortDirection: S.optional(SortDirection).pipe(T.HttpQuery("sortDirection")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/networks" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListNetworksRequest",
}) as any as S.Schema<ListNetworksRequest>;
export interface Network {
  networkId: string;
  networkName: string;
  accessLevel: AccessLevel;
  awsAccountId: string;
  networkArn: string;
  standing?: number;
  freeTrialExpiration?: string;
  migrationState?: number;
  encryptionKeyArn?: string;
}
export const Network = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    networkId: S.String,
    networkName: S.String,
    accessLevel: AccessLevel,
    awsAccountId: S.String,
    networkArn: S.String,
    standing: S.optional(S.Number),
    freeTrialExpiration: S.optional(S.String),
    migrationState: S.optional(S.Number),
    encryptionKeyArn: S.optional(S.String),
  }),
).annotate({ identifier: "Network" }) as any as S.Schema<Network>;
export type NetworkList = Network[];
export const NetworkList = /*@__PURE__*/ S.Array(Network);
export interface ListNetworksResponse {
  networks: Network[];
  nextToken?: string;
}
export const ListNetworksResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ networks: NetworkList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListNetworksResponse",
}) as any as S.Schema<ListNetworksResponse>;
export interface ListSecurityGroupsRequest {
  networkId: string;
  nextToken?: string;
  maxResults?: number;
  sortFields?: string;
  sortDirection?: SortDirection;
}
export const ListSecurityGroupsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    networkId: S.String.pipe(T.HttpLabel("networkId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    sortFields: S.optional(S.String).pipe(T.HttpQuery("sortFields")),
    sortDirection: S.optional(SortDirection).pipe(T.HttpQuery("sortDirection")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/networks/{networkId}/security-groups" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSecurityGroupsRequest",
}) as any as S.Schema<ListSecurityGroupsRequest>;
export type SecurityGroupList = SecurityGroup[];
export const SecurityGroupList = /*@__PURE__*/ S.Array(SecurityGroup);
export interface ListSecurityGroupsResponse {
  securityGroups?: SecurityGroup[];
  nextToken?: string;
}
export const ListSecurityGroupsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    securityGroups: S.optional(SecurityGroupList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSecurityGroupsResponse",
}) as any as S.Schema<ListSecurityGroupsResponse>;
export interface ListSecurityGroupUsersRequest {
  networkId: string;
  groupId: string;
  nextToken?: string;
  maxResults?: number;
  sortFields?: string;
  sortDirection?: SortDirection;
}
export const ListSecurityGroupUsersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    networkId: S.String.pipe(T.HttpLabel("networkId")),
    groupId: S.String.pipe(T.HttpLabel("groupId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    sortFields: S.optional(S.String).pipe(T.HttpQuery("sortFields")),
    sortDirection: S.optional(SortDirection).pipe(T.HttpQuery("sortDirection")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/networks/{networkId}/security-groups/{groupId}/users",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSecurityGroupUsersRequest",
}) as any as S.Schema<ListSecurityGroupUsersRequest>;
export interface ListSecurityGroupUsersResponse {
  users: User[];
  nextToken?: string;
}
export const ListSecurityGroupUsersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ users: Users, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListSecurityGroupUsersResponse",
}) as any as S.Schema<ListSecurityGroupUsersResponse>;
export type UserStatus = 1 | 2 | (number & {});
export const UserStatus = S.Number;
export interface ListUsersRequest {
  networkId: string;
  nextToken?: string;
  maxResults?: number;
  sortFields?: string;
  sortDirection?: SortDirection;
  firstName?: string | redacted.Redacted<string>;
  lastName?: string | redacted.Redacted<string>;
  username?: string;
  status?: UserStatus;
  groupId?: string;
}
export const ListUsersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    networkId: S.String.pipe(T.HttpLabel("networkId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    sortFields: S.optional(S.String).pipe(T.HttpQuery("sortFields")),
    sortDirection: S.optional(SortDirection).pipe(T.HttpQuery("sortDirection")),
    firstName: S.optional(SensitiveString).pipe(T.HttpQuery("firstName")),
    lastName: S.optional(SensitiveString).pipe(T.HttpQuery("lastName")),
    username: S.optional(S.String).pipe(T.HttpQuery("username")),
    status: S.optional(UserStatus).pipe(T.HttpQuery("status")),
    groupId: S.optional(S.String).pipe(T.HttpQuery("groupId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/networks/{networkId}/users" }),
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
export interface ListUsersResponse {
  nextToken?: string;
  users?: User[];
}
export const ListUsersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), users: S.optional(Users) }),
).annotate({
  identifier: "ListUsersResponse",
}) as any as S.Schema<ListUsersResponse>;
export interface RegisterOidcConfigRequest {
  networkId: string;
  companyId: string;
  customUsername?: string;
  extraAuthParams?: string;
  issuer: string;
  scopes: string;
  secret?: string | redacted.Redacted<string>;
  ssoTokenBufferMinutes?: number;
  userId?: string;
}
export const RegisterOidcConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    networkId: S.String.pipe(T.HttpLabel("networkId")),
    companyId: S.String,
    customUsername: S.optional(S.String),
    extraAuthParams: S.optional(S.String),
    issuer: S.String,
    scopes: S.String,
    secret: S.optional(SensitiveString),
    ssoTokenBufferMinutes: S.optional(S.Number),
    userId: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/networks/{networkId}/oidc/save" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RegisterOidcConfigRequest",
}) as any as S.Schema<RegisterOidcConfigRequest>;
export interface RegisterOidcConfigResponse {
  applicationName?: string;
  clientId?: string;
  companyId: string;
  scopes: string;
  issuer: string;
  clientSecret?: string | redacted.Redacted<string>;
  secret?: string | redacted.Redacted<string>;
  redirectUrl?: string;
  userId?: string;
  customUsername?: string;
  caCertificate?: string;
  applicationId?: number;
  ssoTokenBufferMinutes?: number;
  extraAuthParams?: string;
}
export const RegisterOidcConfigResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationName: S.optional(S.String),
    clientId: S.optional(S.String),
    companyId: S.String,
    scopes: S.String,
    issuer: S.String,
    clientSecret: S.optional(SensitiveString),
    secret: S.optional(SensitiveString),
    redirectUrl: S.optional(S.String),
    userId: S.optional(S.String),
    customUsername: S.optional(S.String),
    caCertificate: S.optional(S.String),
    applicationId: S.optional(S.Number),
    ssoTokenBufferMinutes: S.optional(S.Number),
    extraAuthParams: S.optional(S.String),
  }),
).annotate({
  identifier: "RegisterOidcConfigResponse",
}) as any as S.Schema<RegisterOidcConfigResponse>;
export interface RegisterOidcConfigTestRequest {
  networkId: string;
  extraAuthParams?: string;
  issuer: string;
  scopes: string;
  certificate?: string;
}
export const RegisterOidcConfigTestRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    networkId: S.String.pipe(T.HttpLabel("networkId")),
    extraAuthParams: S.optional(S.String),
    issuer: S.String,
    scopes: S.String,
    certificate: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/networks/{networkId}/oidc/test" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RegisterOidcConfigTestRequest",
}) as any as S.Schema<RegisterOidcConfigTestRequest>;
export type StringList = string[];
export const StringList = /*@__PURE__*/ S.Array(S.String);
export interface RegisterOidcConfigTestResponse {
  tokenEndpoint?: string;
  userinfoEndpoint?: string;
  responseTypesSupported?: string[];
  scopesSupported?: string[];
  issuer?: string;
  authorizationEndpoint?: string;
  endSessionEndpoint?: string;
  logoutEndpoint?: string;
  grantTypesSupported?: string[];
  revocationEndpoint?: string;
  tokenEndpointAuthMethodsSupported?: string[];
  microsoftMultiRefreshToken?: boolean;
}
export const RegisterOidcConfigTestResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    tokenEndpoint: S.optional(S.String),
    userinfoEndpoint: S.optional(S.String),
    responseTypesSupported: S.optional(StringList),
    scopesSupported: S.optional(StringList),
    issuer: S.optional(S.String),
    authorizationEndpoint: S.optional(S.String),
    endSessionEndpoint: S.optional(S.String),
    logoutEndpoint: S.optional(S.String),
    grantTypesSupported: S.optional(StringList),
    revocationEndpoint: S.optional(S.String),
    tokenEndpointAuthMethodsSupported: S.optional(StringList),
    microsoftMultiRefreshToken: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "RegisterOidcConfigTestResponse",
}) as any as S.Schema<RegisterOidcConfigTestResponse>;
export interface RegisterOpentdfConfigRequest {
  networkId: string;
  clientId: string;
  clientSecret: string | redacted.Redacted<string>;
  domain: string;
  provider: string;
  dryRun?: boolean;
}
export const RegisterOpentdfConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    networkId: S.String.pipe(T.HttpLabel("networkId")),
    clientId: S.String,
    clientSecret: SensitiveString,
    domain: S.String,
    provider: S.String,
    dryRun: S.optional(S.Boolean).pipe(T.HttpQuery("dryRun")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/networks/{networkId}/tdf" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RegisterOpentdfConfigRequest",
}) as any as S.Schema<RegisterOpentdfConfigRequest>;
export interface RegisterOpentdfConfigResponse {
  clientId: string;
  domain: string;
  clientSecret: string | redacted.Redacted<string>;
  provider: string;
}
export const RegisterOpentdfConfigResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientId: S.String,
    domain: S.String,
    clientSecret: SensitiveString,
    provider: S.String,
  }),
).annotate({
  identifier: "RegisterOpentdfConfigResponse",
}) as any as S.Schema<RegisterOpentdfConfigResponse>;
export interface UpdateBotRequest {
  networkId: string;
  botId: string;
  displayName?: string;
  groupId?: string;
  challenge?: string | redacted.Redacted<string>;
  suspend?: boolean;
}
export const UpdateBotRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    networkId: S.String.pipe(T.HttpLabel("networkId")),
    botId: S.String.pipe(T.HttpLabel("botId")),
    displayName: S.optional(S.String),
    groupId: S.optional(S.String),
    challenge: S.optional(SensitiveString),
    suspend: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/networks/{networkId}/bots/{botId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateBotRequest",
}) as any as S.Schema<UpdateBotRequest>;
export interface UpdateBotResponse {
  message?: string;
}
export const UpdateBotResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ message: S.optional(S.String) }),
).annotate({
  identifier: "UpdateBotResponse",
}) as any as S.Schema<UpdateBotResponse>;
export type DataRetentionActionType =
  | "ENABLE"
  | "DISABLE"
  | "PUBKEY_MSG_ACK"
  | (string & {});
export const DataRetentionActionType = S.String;

export interface UpdateDataRetentionRequest {
  networkId: string;
  actionType: DataRetentionActionType;
}
export const UpdateDataRetentionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    networkId: S.String.pipe(T.HttpLabel("networkId")),
    actionType: DataRetentionActionType,
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/networks/{networkId}/data-retention-bots",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDataRetentionRequest",
}) as any as S.Schema<UpdateDataRetentionRequest>;
export interface UpdateDataRetentionResponse {
  message?: string;
}
export const UpdateDataRetentionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ message: S.optional(S.String) }),
).annotate({
  identifier: "UpdateDataRetentionResponse",
}) as any as S.Schema<UpdateDataRetentionResponse>;
export interface UpdateGuestUserRequest {
  networkId: string;
  usernameHash: string;
  block: boolean;
}
export const UpdateGuestUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    networkId: S.String.pipe(T.HttpLabel("networkId")),
    usernameHash: S.String.pipe(T.HttpLabel("usernameHash")),
    block: S.Boolean,
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/networks/{networkId}/guest-users/{usernameHash}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateGuestUserRequest",
}) as any as S.Schema<UpdateGuestUserRequest>;
export interface UpdateGuestUserResponse {
  message?: string;
}
export const UpdateGuestUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ message: S.optional(S.String) }),
).annotate({
  identifier: "UpdateGuestUserResponse",
}) as any as S.Schema<UpdateGuestUserResponse>;
export interface UpdateNetworkRequest {
  networkId: string;
  networkName: string;
  clientToken?: string;
  encryptionKeyArn?: string;
}
export const UpdateNetworkRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    networkId: S.String.pipe(T.HttpLabel("networkId")),
    networkName: S.String,
    clientToken: S.optional(S.String).pipe(
      T.HttpHeader("X-Client-Token"),
      T.IdempotencyToken(),
    ),
    encryptionKeyArn: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/networks/{networkId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateNetworkRequest",
}) as any as S.Schema<UpdateNetworkRequest>;
export interface UpdateNetworkResponse {
  message?: string;
}
export const UpdateNetworkResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ message: S.optional(S.String) }),
).annotate({
  identifier: "UpdateNetworkResponse",
}) as any as S.Schema<UpdateNetworkResponse>;
export type Status = "DISABLED" | "ENABLED" | "FORCE_ENABLED" | (string & {});
export const Status = S.String;

export interface ReadReceiptConfig {
  status?: Status;
}
export const ReadReceiptConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: S.optional(Status) }),
).annotate({
  identifier: "ReadReceiptConfig",
}) as any as S.Schema<ReadReceiptConfig>;
export interface ConsentPopupConfig {
  enabled: boolean;
  header?: string;
  content?: string;
  closeButtonLabel?: string;
}
export const ConsentPopupConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    enabled: S.Boolean,
    header: S.optional(S.String),
    content: S.optional(S.String),
    closeButtonLabel: S.optional(S.String),
  }),
).annotate({
  identifier: "ConsentPopupConfig",
}) as any as S.Schema<ConsentPopupConfig>;
export interface NetworkSettings {
  enableClientMetrics?: boolean;
  readReceiptConfig?: ReadReceiptConfig;
  dataRetention?: boolean;
  enableTrustedDataFormat?: boolean;
  consentPopup?: ConsentPopupConfig;
}
export const NetworkSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    enableClientMetrics: S.optional(S.Boolean),
    readReceiptConfig: S.optional(ReadReceiptConfig),
    dataRetention: S.optional(S.Boolean),
    enableTrustedDataFormat: S.optional(S.Boolean),
    consentPopup: S.optional(ConsentPopupConfig),
  }),
).annotate({
  identifier: "NetworkSettings",
}) as any as S.Schema<NetworkSettings>;
export interface UpdateNetworkSettingsRequest {
  networkId: string;
  settings: NetworkSettings;
}
export const UpdateNetworkSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    networkId: S.String.pipe(T.HttpLabel("networkId")),
    settings: NetworkSettings,
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/networks/{networkId}/settings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateNetworkSettingsRequest",
}) as any as S.Schema<UpdateNetworkSettingsRequest>;
export interface UpdateNetworkSettingsResponse {
  settings: Setting[];
}
export const UpdateNetworkSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ settings: SettingsList }),
).annotate({
  identifier: "UpdateNetworkSettingsResponse",
}) as any as S.Schema<UpdateNetworkSettingsResponse>;
export interface UpdateSecurityGroupRequest {
  networkId: string;
  groupId: string;
  name?: string;
  securityGroupSettings?: SecurityGroupSettings;
}
export const UpdateSecurityGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    networkId: S.String.pipe(T.HttpLabel("networkId")),
    groupId: S.String.pipe(T.HttpLabel("groupId")),
    name: S.optional(S.String),
    securityGroupSettings: S.optional(SecurityGroupSettings),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/networks/{networkId}/security-groups/{groupId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateSecurityGroupRequest",
}) as any as S.Schema<UpdateSecurityGroupRequest>;
export interface UpdateSecurityGroupResponse {
  securityGroup: SecurityGroup;
}
export const UpdateSecurityGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ securityGroup: SecurityGroup }),
).annotate({
  identifier: "UpdateSecurityGroupResponse",
}) as any as S.Schema<UpdateSecurityGroupResponse>;
export interface UpdateUserDetails {
  firstName?: string | redacted.Redacted<string>;
  lastName?: string | redacted.Redacted<string>;
  username?: string;
  securityGroupIds?: string[];
  inviteCode?: string;
  inviteCodeTtl?: number;
  codeValidation?: boolean;
}
export const UpdateUserDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    firstName: S.optional(SensitiveString),
    lastName: S.optional(SensitiveString),
    username: S.optional(S.String),
    securityGroupIds: S.optional(SecurityGroupIdList),
    inviteCode: S.optional(S.String),
    inviteCodeTtl: S.optional(S.Number),
    codeValidation: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "UpdateUserDetails",
}) as any as S.Schema<UpdateUserDetails>;
export interface UpdateUserRequest {
  networkId: string;
  userId: string;
  userDetails?: UpdateUserDetails;
}
export const UpdateUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    networkId: S.String.pipe(T.HttpLabel("networkId")),
    userId: S.String,
    userDetails: S.optional(UpdateUserDetails),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/networks/{networkId}/users" }),
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
  userId: string;
  networkId: string;
  securityGroupIds?: string[];
  firstName?: string | redacted.Redacted<string>;
  lastName?: string | redacted.Redacted<string>;
  middleName?: string;
  suspended: boolean;
  modified?: number;
  status?: number;
  inviteCode?: string;
  inviteExpiration?: number;
  codeValidation?: boolean;
}
export const UpdateUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    userId: S.String,
    networkId: S.String,
    securityGroupIds: S.optional(SecurityGroupIdList),
    firstName: S.optional(SensitiveString),
    lastName: S.optional(SensitiveString),
    middleName: S.optional(S.String),
    suspended: S.Boolean,
    modified: S.optional(S.Number),
    status: S.optional(S.Number),
    inviteCode: S.optional(S.String),
    inviteExpiration: S.optional(S.Number),
    codeValidation: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "UpdateUserResponse",
}) as any as S.Schema<UpdateUserResponse>;
export interface ErrorDetail {
  field?: string;
  reason?: string;
}
export const ErrorDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ field: S.optional(S.String), reason: S.optional(S.String) }),
).annotate({ identifier: "ErrorDetail" }) as any as S.Schema<ErrorDetail>;
export type ErrorDetailList = ErrorDetail[];
export const ErrorDetailList = /*@__PURE__*/ S.Array(ErrorDetail);
export type BatchCreateUserError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Creates multiple users in a specified Wickr network. This operation allows you to provision multiple user accounts simultaneously, optionally specifying security groups, and validation requirements for each user.
 *
 * `codeValidation`, `inviteCode`, and `inviteCodeTtl` are restricted to networks under preview only.
 */
export const batchCreateUser: API.OperationMethod<
  BatchCreateUserRequest,
  BatchCreateUserResponse,
  BatchCreateUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchCreateUserRequest,
  output: BatchCreateUserResponse,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchCreateUser",
}));

export type BatchDeleteUserError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Deletes multiple users from a specified Wickr network. This operation permanently removes user accounts and their associated data from the network.
 */
export const batchDeleteUser: API.OperationMethod<
  BatchDeleteUserRequest,
  BatchDeleteUserResponse,
  BatchDeleteUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchDeleteUserRequest,
  output: BatchDeleteUserResponse,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteUser",
}));

export type BatchLookupUserUnameError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Looks up multiple user usernames from their unique username hashes (unames). This operation allows you to retrieve the email addresses associated with a list of username hashes.
 */
export const batchLookupUserUname: API.OperationMethod<
  BatchLookupUserUnameRequest,
  BatchLookupUserUnameResponse,
  BatchLookupUserUnameError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchLookupUserUnameRequest,
  output: BatchLookupUserUnameResponse,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchLookupUserUname",
}));

export type BatchReinviteUserError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Resends invitation codes to multiple users who have pending invitations in a Wickr network. This operation is useful when users haven't accepted their initial invitations or when invitations have expired.
 */
export const batchReinviteUser: API.OperationMethod<
  BatchReinviteUserRequest,
  BatchReinviteUserResponse,
  BatchReinviteUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchReinviteUserRequest,
  output: BatchReinviteUserResponse,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchReinviteUser",
}));

export type BatchResetDevicesForUserError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Resets multiple devices for a specific user in a Wickr network. This operation forces the selected devices to log out and requires users to re-authenticate, which is useful for security purposes or when devices need to be revoked.
 */
export const batchResetDevicesForUser: API.OperationMethod<
  BatchResetDevicesForUserRequest,
  BatchResetDevicesForUserResponse,
  BatchResetDevicesForUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchResetDevicesForUserRequest,
  output: BatchResetDevicesForUserResponse,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchResetDevicesForUser",
}));

export type BatchToggleUserSuspendStatusError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Suspends or unsuspends multiple users in a Wickr network. Suspended users cannot access the network until they are unsuspended. This operation is useful for temporarily restricting access without deleting user accounts.
 */
export const batchToggleUserSuspendStatus: API.OperationMethod<
  BatchToggleUserSuspendStatusRequest,
  BatchToggleUserSuspendStatusResponse,
  BatchToggleUserSuspendStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchToggleUserSuspendStatusRequest,
  output: BatchToggleUserSuspendStatusResponse,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchToggleUserSuspendStatus",
}));

export type CreateBotError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Creates a new bot in a specified Wickr network. Bots are automated accounts that can send and receive messages, enabling integration with external systems and automation of tasks.
 */
export const createBot: API.OperationMethod<
  CreateBotRequest,
  CreateBotResponse,
  CreateBotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateBotRequest,
  output: CreateBotResponse,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBot",
}));

export type CreateDataRetentionBotError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Creates a data retention bot in a Wickr network. Data retention bots are specialized bots that handle message archiving and compliance by capturing and storing messages for regulatory or organizational requirements.
 */
export const createDataRetentionBot: API.OperationMethod<
  CreateDataRetentionBotRequest,
  CreateDataRetentionBotResponse,
  CreateDataRetentionBotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDataRetentionBotRequest,
  output: CreateDataRetentionBotResponse,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataRetentionBot",
}));

export type CreateDataRetentionBotChallengeError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Creates a new challenge password for the data retention bot. This password is used for authentication when the bot connects to the network.
 */
export const createDataRetentionBotChallenge: API.OperationMethod<
  CreateDataRetentionBotChallengeRequest,
  CreateDataRetentionBotChallengeResponse,
  CreateDataRetentionBotChallengeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDataRetentionBotChallengeRequest,
  output: CreateDataRetentionBotChallengeResponse,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataRetentionBotChallenge",
}));

export type CreateNetworkError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Creates a new Wickr network with specified access level and configuration. This operation provisions a new communication network for your organization.
 */
export const createNetwork: API.OperationMethod<
  CreateNetworkRequest,
  CreateNetworkResponse,
  CreateNetworkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateNetworkRequest,
  output: CreateNetworkResponse,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateNetwork",
}));

export type CreateSecurityGroupError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Creates a new security group in a Wickr network. Security groups allow you to organize users and control their permissions, features, and security settings.
 */
export const createSecurityGroup: API.OperationMethod<
  CreateSecurityGroupRequest,
  CreateSecurityGroupResponse,
  CreateSecurityGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSecurityGroupRequest,
  output: CreateSecurityGroupResponse,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSecurityGroup",
}));

export type DeleteBotError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Deletes a bot from a specified Wickr network. This operation permanently removes the bot account and its associated data from the network.
 */
export const deleteBot: API.OperationMethod<
  DeleteBotRequest,
  DeleteBotResponse,
  DeleteBotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteBotRequest,
  output: DeleteBotResponse,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBot",
}));

export type DeleteDataRetentionBotError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Deletes the data retention bot from a Wickr network. This operation permanently removes the bot and all its associated data from the database.
 */
export const deleteDataRetentionBot: API.OperationMethod<
  DeleteDataRetentionBotRequest,
  DeleteDataRetentionBotResponse,
  DeleteDataRetentionBotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDataRetentionBotRequest,
  output: DeleteDataRetentionBotResponse,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataRetentionBot",
}));

export type DeleteNetworkError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Deletes a Wickr network and all its associated resources, including users, bots, security groups, and settings. This operation is permanent and cannot be undone.
 */
export const deleteNetwork: API.OperationMethod<
  DeleteNetworkRequest,
  DeleteNetworkResponse,
  DeleteNetworkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteNetworkRequest,
  output: DeleteNetworkResponse,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNetwork",
}));

export type DeleteSecurityGroupError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Deletes a security group from a Wickr network. This operation cannot be performed on the default security group.
 */
export const deleteSecurityGroup: API.OperationMethod<
  DeleteSecurityGroupRequest,
  DeleteSecurityGroupResponse,
  DeleteSecurityGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSecurityGroupRequest,
  output: DeleteSecurityGroupResponse,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSecurityGroup",
}));

export type GetBotError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Retrieves detailed information about a specific bot in a Wickr network, including its status, group membership, and authentication details.
 */
export const getBot: API.OperationMethod<
  GetBotRequest,
  GetBotResponse,
  GetBotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetBotRequest,
  output: GetBotResponse,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBot",
}));

export type GetBotsCountError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Retrieves the count of bots in a Wickr network, categorized by their status (pending, active, and total).
 */
export const getBotsCount: API.OperationMethod<
  GetBotsCountRequest,
  GetBotsCountResponse,
  GetBotsCountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetBotsCountRequest,
  output: GetBotsCountResponse,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBotsCount",
}));

export type GetDataRetentionBotError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Retrieves information about the data retention bot in a Wickr network, including its status and whether the data retention service is enabled.
 */
export const getDataRetentionBot: API.OperationMethod<
  GetDataRetentionBotRequest,
  GetDataRetentionBotResponse,
  GetDataRetentionBotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDataRetentionBotRequest,
  output: GetDataRetentionBotResponse,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataRetentionBot",
}));

export type GetGuestUserHistoryCountError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Retrieves historical guest user count data for a Wickr network, showing the number of guest users per billing period over the past 90 days.
 */
export const getGuestUserHistoryCount: API.OperationMethod<
  GetGuestUserHistoryCountRequest,
  GetGuestUserHistoryCountResponse,
  GetGuestUserHistoryCountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetGuestUserHistoryCountRequest,
  output: GetGuestUserHistoryCountResponse,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGuestUserHistoryCount",
}));

export type GetNetworkError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Retrieves detailed information about a specific Wickr network, including its configuration, access level, and status.
 */
export const getNetwork: API.OperationMethod<
  GetNetworkRequest,
  GetNetworkResponse,
  GetNetworkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetNetworkRequest,
  output: GetNetworkResponse,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNetwork",
}));

export type GetNetworkSettingsError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Retrieves all network-level settings for a Wickr network, including client metrics, data retention, and other configuration options.
 */
export const getNetworkSettings: API.OperationMethod<
  GetNetworkSettingsRequest,
  GetNetworkSettingsResponse,
  GetNetworkSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetNetworkSettingsRequest,
  output: GetNetworkSettingsResponse,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNetworkSettings",
}));

export type GetOidcInfoError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Retrieves the OpenID Connect (OIDC) configuration for a Wickr network, including SSO settings and optional token information if access token parameters are provided.
 */
export const getOidcInfo: API.OperationMethod<
  GetOidcInfoRequest,
  GetOidcInfoResponse,
  GetOidcInfoError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetOidcInfoRequest,
  output: GetOidcInfoResponse,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOidcInfo",
}));

export type GetOpentdfConfigError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Retrieves the OpenTDF integration configuration for a Wickr network.
 */
export const getOpentdfConfig: API.OperationMethod<
  GetOpentdfConfigRequest,
  GetOpentdfConfigResponse,
  GetOpentdfConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetOpentdfConfigRequest,
  output: GetOpentdfConfigResponse,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOpentdfConfig",
}));

export type GetSecurityGroupError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Retrieves detailed information about a specific security group in a Wickr network, including its settings, member counts, and configuration.
 */
export const getSecurityGroup: API.OperationMethod<
  GetSecurityGroupRequest,
  GetSecurityGroupResponse,
  GetSecurityGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSecurityGroupRequest,
  output: GetSecurityGroupResponse,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSecurityGroup",
}));

export type GetUserError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Retrieves detailed information about a specific user in a Wickr network, including their profile, status, and activity history.
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
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUser",
}));

export type GetUsersCountError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Retrieves the count of users in a Wickr network, categorized by their status (pending, active, rejected) and showing how many users can still be added.
 */
export const getUsersCount: API.OperationMethod<
  GetUsersCountRequest,
  GetUsersCountResponse,
  GetUsersCountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetUsersCountRequest,
  output: GetUsersCountResponse,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUsersCount",
}));

export type ListBlockedGuestUsersError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Retrieves a paginated list of guest users who have been blocked from a Wickr network. You can filter and sort the results.
 */
export const listBlockedGuestUsers: API.PaginatedOperationMethod<
  ListBlockedGuestUsersRequest,
  ListBlockedGuestUsersResponse,
  ListBlockedGuestUsersError,
  Credentials | HttpClient.HttpClient,
  BlockedGuestUser
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListBlockedGuestUsersRequest,
  output: ListBlockedGuestUsersResponse,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBlockedGuestUsers",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "blocklist",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBotsError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Retrieves a paginated list of bots in a specified Wickr network. You can filter and sort the results based on various criteria.
 */
export const listBots: API.PaginatedOperationMethod<
  ListBotsRequest,
  ListBotsResponse,
  ListBotsError,
  Credentials | HttpClient.HttpClient,
  Bot
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListBotsRequest,
  output: ListBotsResponse,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBots",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "bots",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDevicesForUserError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Retrieves a paginated list of devices associated with a specific user in a Wickr network. This operation returns information about all devices where the user has logged into Wickr.
 */
export const listDevicesForUser: API.PaginatedOperationMethod<
  ListDevicesForUserRequest,
  ListDevicesForUserResponse,
  ListDevicesForUserError,
  Credentials | HttpClient.HttpClient,
  BasicDeviceObject
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDevicesForUserRequest,
  output: ListDevicesForUserResponse,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDevicesForUser",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "devices",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListGuestUsersError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Retrieves a paginated list of guest users who have communicated with your Wickr network. Guest users are external users from federated networks who can communicate with network members.
 */
export const listGuestUsers: API.PaginatedOperationMethod<
  ListGuestUsersRequest,
  ListGuestUsersResponse,
  ListGuestUsersError,
  Credentials | HttpClient.HttpClient,
  GuestUser
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListGuestUsersRequest,
  output: ListGuestUsersResponse,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGuestUsers",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "guestlist",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListNetworksError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Retrieves a paginated list of all Wickr networks associated with your Amazon Web Services account. You can sort the results by network ID or name.
 */
export const listNetworks: API.PaginatedOperationMethod<
  ListNetworksRequest,
  ListNetworksResponse,
  ListNetworksError,
  Credentials | HttpClient.HttpClient,
  Network
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListNetworksRequest,
  output: ListNetworksResponse,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNetworks",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "networks",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSecurityGroupsError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Retrieves a paginated list of security groups in a specified Wickr network. You can sort the results by various criteria.
 */
export const listSecurityGroups: API.PaginatedOperationMethod<
  ListSecurityGroupsRequest,
  ListSecurityGroupsResponse,
  ListSecurityGroupsError,
  Credentials | HttpClient.HttpClient,
  SecurityGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSecurityGroupsRequest,
  output: ListSecurityGroupsResponse,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSecurityGroups",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "securityGroups",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSecurityGroupUsersError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Retrieves a paginated list of users who belong to a specific security group in a Wickr network.
 */
export const listSecurityGroupUsers: API.PaginatedOperationMethod<
  ListSecurityGroupUsersRequest,
  ListSecurityGroupUsersResponse,
  ListSecurityGroupUsersError,
  Credentials | HttpClient.HttpClient,
  User
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSecurityGroupUsersRequest,
  output: ListSecurityGroupUsersResponse,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSecurityGroupUsers",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "users",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListUsersError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Retrieves a paginated list of users in a specified Wickr network. You can filter and sort the results based on various criteria such as name, status, or security group membership.
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
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUsers",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "users",
    pageSize: "maxResults",
  } as const,
})) as any;

export type RegisterOidcConfigError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Registers and saves an OpenID Connect (OIDC) configuration for a Wickr network, enabling Single Sign-On (SSO) authentication through an identity provider.
 */
export const registerOidcConfig: API.OperationMethod<
  RegisterOidcConfigRequest,
  RegisterOidcConfigResponse,
  RegisterOidcConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterOidcConfigRequest,
  output: RegisterOidcConfigResponse,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterOidcConfig",
}));

export type RegisterOidcConfigTestError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Tests an OpenID Connect (OIDC) configuration for a Wickr network by validating the connection to the identity provider and retrieving its supported capabilities.
 */
export const registerOidcConfigTest: API.OperationMethod<
  RegisterOidcConfigTestRequest,
  RegisterOidcConfigTestResponse,
  RegisterOidcConfigTestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterOidcConfigTestRequest,
  output: RegisterOidcConfigTestResponse,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterOidcConfigTest",
}));

export type RegisterOpentdfConfigError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Registers and saves OpenTDF configuration for a Wickr network, enabling attribute-based access control for Wickr through an OpenTDF provider.
 */
export const registerOpentdfConfig: API.OperationMethod<
  RegisterOpentdfConfigRequest,
  RegisterOpentdfConfigResponse,
  RegisterOpentdfConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterOpentdfConfigRequest,
  output: RegisterOpentdfConfigResponse,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterOpentdfConfig",
}));

export type UpdateBotError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Updates the properties of an existing bot in a Wickr network. This operation allows you to modify the bot's display name, security group, password, or suspension status.
 */
export const updateBot: API.OperationMethod<
  UpdateBotRequest,
  UpdateBotResponse,
  UpdateBotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateBotRequest,
  output: UpdateBotResponse,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBot",
}));

export type UpdateDataRetentionError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Updates the data retention bot settings, allowing you to enable or disable the data retention service, or acknowledge the public key message.
 */
export const updateDataRetention: API.OperationMethod<
  UpdateDataRetentionRequest,
  UpdateDataRetentionResponse,
  UpdateDataRetentionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDataRetentionRequest,
  output: UpdateDataRetentionResponse,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataRetention",
}));

export type UpdateGuestUserError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Updates the block status of a guest user in a Wickr network. This operation allows you to block or unblock a guest user from accessing the network.
 */
export const updateGuestUser: API.OperationMethod<
  UpdateGuestUserRequest,
  UpdateGuestUserResponse,
  UpdateGuestUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateGuestUserRequest,
  output: UpdateGuestUserResponse,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGuestUser",
}));

export type UpdateNetworkError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Updates the properties of an existing Wickr network, such as its name or encryption key configuration.
 */
export const updateNetwork: API.OperationMethod<
  UpdateNetworkRequest,
  UpdateNetworkResponse,
  UpdateNetworkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateNetworkRequest,
  output: UpdateNetworkResponse,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNetwork",
}));

export type UpdateNetworkSettingsError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Updates network-level settings for a Wickr network. You can modify settings such as client metrics, data retention, and other network-wide options.
 */
export const updateNetworkSettings: API.OperationMethod<
  UpdateNetworkSettingsRequest,
  UpdateNetworkSettingsResponse,
  UpdateNetworkSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateNetworkSettingsRequest,
  output: UpdateNetworkSettingsResponse,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNetworkSettings",
}));

export type UpdateSecurityGroupError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Updates the properties of an existing security group in a Wickr network, such as its name or settings.
 */
export const updateSecurityGroup: API.OperationMethod<
  UpdateSecurityGroupRequest,
  UpdateSecurityGroupResponse,
  UpdateSecurityGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSecurityGroupRequest,
  output: UpdateSecurityGroupResponse,
  errors: [
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSecurityGroup",
}));

export type UpdateUserError =
  | BadRequestError
  | ForbiddenError
  | InternalServerError
  | RateLimitError
  | ResourceNotFoundError
  | UnauthorizedError
  | ValidationError
  | CommonErrors;
/**
 * Updates the properties of an existing user in a Wickr network. This operation allows you to modify the user's name, password, security group membership, and invite code settings.
 *
 * `codeValidation`, `inviteCode`, and `inviteCodeTtl` are restricted to networks under preview only.
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
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    RateLimitError,
    ResourceNotFoundError,
    UnauthorizedError,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUser",
}));
