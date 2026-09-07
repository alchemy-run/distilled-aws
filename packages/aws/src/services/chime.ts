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
  sdkId: "Chime",
  serviceShapeName: "UCBuzzConsoleService",
});
const auth = T.AwsAuthSigv4({ name: "chime" });
const ver = T.ServiceVersion("2018-05-01");
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
        if (
          _.getAttr(PartitionResult, "name") === "aws" &&
          UseFIPS === false &&
          UseDualStack === false
        ) {
          return e(
            "https://chime.us-east-1.amazonaws.com",
            {
              authSchemes: [
                {
                  name: "sigv4",
                  signingName: "chime",
                  signingRegion: "us-east-1",
                },
              ],
            },
            {},
          );
        }
        if (UseFIPS === true && UseDualStack === true) {
          if (
            true === _.getAttr(PartitionResult, "supportsFIPS") &&
            true === _.getAttr(PartitionResult, "supportsDualStack")
          ) {
            return e(
              `https://chime-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://chime-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://chime.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://chime.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
      Code: S.optional(
        S.suspend(() => ErrorCode).annotate({ identifier: "ErrorCode" }),
      ),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    {
      Code: S.optional(
        S.suspend(() => ErrorCode).annotate({ identifier: "ErrorCode" }),
      ),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      Code: S.optional(
        S.suspend(() => ErrorCode).annotate({ identifier: "ErrorCode" }),
      ),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ForbiddenException
  extends /*@__PURE__*/ S.TaggedError<ForbiddenException>()(
    "ForbiddenException",
    {
      Code: S.optional(
        S.suspend(() => ErrorCode).annotate({ identifier: "ErrorCode" }),
      ),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    {
      Code: S.optional(
        S.suspend(() => ErrorCode).annotate({ identifier: "ErrorCode" }),
      ),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ResourceLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ResourceLimitExceededException>()(
    "ResourceLimitExceededException",
    {
      Code: S.optional(
        S.suspend(() => ErrorCode).annotate({ identifier: "ErrorCode" }),
      ),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ServiceFailureException
  extends /*@__PURE__*/ S.TaggedError<ServiceFailureException>()(
    "ServiceFailureException",
    {
      Code: S.optional(
        S.suspend(() => ErrorCode).annotate({ identifier: "ErrorCode" }),
      ),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    {
      Code: S.optional(
        S.suspend(() => ErrorCode).annotate({ identifier: "ErrorCode" }),
      ),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(503),
  ).pipe(C.withServerError) {}
export class ThrottledClientException
  extends /*@__PURE__*/ S.TaggedError<ThrottledClientException>()(
    "ThrottledClientException",
    {
      Code: S.optional(
        S.suspend(() => ErrorCode).annotate({ identifier: "ErrorCode" }),
      ),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class UnauthorizedClientException
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedClientException>()(
    "UnauthorizedClientException",
    {
      Code: S.optional(
        S.suspend(() => ErrorCode).annotate({ identifier: "ErrorCode" }),
      ),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(401),
  ).pipe(C.withAuthError) {}
export class UnprocessableEntityException
  extends /*@__PURE__*/ S.TaggedError<UnprocessableEntityException>()(
    "UnprocessableEntityException",
    {
      Code: S.optional(
        S.suspend(() => ErrorCode).annotate({ identifier: "ErrorCode" }),
      ),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(422),
  ).pipe(C.withBadRequestError) {}
export type E164PhoneNumber = string | redacted.Redacted<string>;
export interface AssociatePhoneNumberWithUserRequest {
  AccountId: string;
  UserId: string;
  E164PhoneNumber: string | redacted.Redacted<string>;
}
export const AssociatePhoneNumberWithUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(T.HttpLabel("AccountId")),
    UserId: S.String.pipe(T.HttpLabel("UserId")),
    E164PhoneNumber: SensitiveString,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/accounts/{AccountId}/users/{UserId}?operation=associate-phone-number",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociatePhoneNumberWithUserRequest",
}) as any as S.Schema<AssociatePhoneNumberWithUserRequest>;
export interface AssociatePhoneNumberWithUserResponse {}
export const AssociatePhoneNumberWithUserResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "AssociatePhoneNumberWithUserResponse",
}) as any as S.Schema<AssociatePhoneNumberWithUserResponse>;
export type NonEmptyString = string;
export interface SigninDelegateGroup {
  GroupName?: string;
}
export const SigninDelegateGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GroupName: S.optional(S.String) }),
).annotate({
  identifier: "SigninDelegateGroup",
}) as any as S.Schema<SigninDelegateGroup>;
export type SigninDelegateGroupList = SigninDelegateGroup[];
export const SigninDelegateGroupList =
  /*@__PURE__*/ S.Array(SigninDelegateGroup);
export interface AssociateSigninDelegateGroupsWithAccountRequest {
  AccountId: string;
  SigninDelegateGroups: SigninDelegateGroup[];
}
export const AssociateSigninDelegateGroupsWithAccountRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AccountId: S.String.pipe(T.HttpLabel("AccountId")),
      SigninDelegateGroups: SigninDelegateGroupList,
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/accounts/{AccountId}?operation=associate-signin-delegate-groups",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "AssociateSigninDelegateGroupsWithAccountRequest",
  }) as any as S.Schema<AssociateSigninDelegateGroupsWithAccountRequest>;
export interface AssociateSigninDelegateGroupsWithAccountResponse {}
export const AssociateSigninDelegateGroupsWithAccountResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "AssociateSigninDelegateGroupsWithAccountResponse",
  }) as any as S.Schema<AssociateSigninDelegateGroupsWithAccountResponse>;
export type RoomMembershipRole = "Administrator" | "Member" | (string & {});
export const RoomMembershipRole = S.String;

export interface MembershipItem {
  MemberId?: string;
  Role?: RoomMembershipRole;
}
export const MembershipItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MemberId: S.optional(S.String),
    Role: S.optional(RoomMembershipRole),
  }),
).annotate({ identifier: "MembershipItem" }) as any as S.Schema<MembershipItem>;
export type MembershipItemList = MembershipItem[];
export const MembershipItemList = /*@__PURE__*/ S.Array(MembershipItem);
export interface BatchCreateRoomMembershipRequest {
  AccountId: string;
  RoomId: string;
  MembershipItemList: MembershipItem[];
}
export const BatchCreateRoomMembershipRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(T.HttpLabel("AccountId")),
    RoomId: S.String.pipe(T.HttpLabel("RoomId")),
    MembershipItemList: MembershipItemList,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/accounts/{AccountId}/rooms/{RoomId}/memberships?operation=batch-create",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchCreateRoomMembershipRequest",
}) as any as S.Schema<BatchCreateRoomMembershipRequest>;
export type ErrorCode =
  | "BadRequest"
  | "Conflict"
  | "Forbidden"
  | "NotFound"
  | "PreconditionFailed"
  | "ResourceLimitExceeded"
  | "ServiceFailure"
  | "AccessDenied"
  | "ServiceUnavailable"
  | "Throttled"
  | "Throttling"
  | "Unauthorized"
  | "Unprocessable"
  | "VoiceConnectorGroupAssociationsExist"
  | "PhoneNumberAssociationsExist"
  | (string & {});
export const ErrorCode = S.String;

export interface MemberError {
  MemberId?: string;
  ErrorCode?: ErrorCode;
  ErrorMessage?: string;
}
export const MemberError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MemberId: S.optional(S.String),
    ErrorCode: S.optional(ErrorCode),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({ identifier: "MemberError" }) as any as S.Schema<MemberError>;
export type MemberErrorList = MemberError[];
export const MemberErrorList = /*@__PURE__*/ S.Array(MemberError);
export interface BatchCreateRoomMembershipResponse {
  Errors?: MemberError[];
}
export const BatchCreateRoomMembershipResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Errors: S.optional(MemberErrorList) }),
).annotate({
  identifier: "BatchCreateRoomMembershipResponse",
}) as any as S.Schema<BatchCreateRoomMembershipResponse>;
export type NonEmptyStringList = string[];
export const NonEmptyStringList = /*@__PURE__*/ S.Array(S.String);
export interface BatchDeletePhoneNumberRequest {
  PhoneNumberIds: string[];
}
export const BatchDeletePhoneNumberRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PhoneNumberIds: NonEmptyStringList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/phone-numbers?operation=batch-delete" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchDeletePhoneNumberRequest",
}) as any as S.Schema<BatchDeletePhoneNumberRequest>;
export interface PhoneNumberError {
  PhoneNumberId?: string;
  ErrorCode?: ErrorCode;
  ErrorMessage?: string;
}
export const PhoneNumberError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PhoneNumberId: S.optional(S.String),
    ErrorCode: S.optional(ErrorCode),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "PhoneNumberError",
}) as any as S.Schema<PhoneNumberError>;
export type PhoneNumberErrorList = PhoneNumberError[];
export const PhoneNumberErrorList = /*@__PURE__*/ S.Array(PhoneNumberError);
export interface BatchDeletePhoneNumberResponse {
  PhoneNumberErrors?: PhoneNumberError[];
}
export const BatchDeletePhoneNumberResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PhoneNumberErrors: S.optional(PhoneNumberErrorList) }),
).annotate({
  identifier: "BatchDeletePhoneNumberResponse",
}) as any as S.Schema<BatchDeletePhoneNumberResponse>;
export type UserIdList = string[];
export const UserIdList = /*@__PURE__*/ S.Array(S.String);
export interface BatchSuspendUserRequest {
  AccountId: string;
  UserIdList: string[];
}
export const BatchSuspendUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(T.HttpLabel("AccountId")),
    UserIdList: UserIdList,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/accounts/{AccountId}/users?operation=suspend",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchSuspendUserRequest",
}) as any as S.Schema<BatchSuspendUserRequest>;
export interface UserError {
  UserId?: string;
  ErrorCode?: ErrorCode;
  ErrorMessage?: string;
}
export const UserError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserId: S.optional(S.String),
    ErrorCode: S.optional(ErrorCode),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({ identifier: "UserError" }) as any as S.Schema<UserError>;
export type UserErrorList = UserError[];
export const UserErrorList = /*@__PURE__*/ S.Array(UserError);
export interface BatchSuspendUserResponse {
  UserErrors?: UserError[];
}
export const BatchSuspendUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UserErrors: S.optional(UserErrorList) }),
).annotate({
  identifier: "BatchSuspendUserResponse",
}) as any as S.Schema<BatchSuspendUserResponse>;
export interface BatchUnsuspendUserRequest {
  AccountId: string;
  UserIdList: string[];
}
export const BatchUnsuspendUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(T.HttpLabel("AccountId")),
    UserIdList: UserIdList,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/accounts/{AccountId}/users?operation=unsuspend",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchUnsuspendUserRequest",
}) as any as S.Schema<BatchUnsuspendUserRequest>;
export interface BatchUnsuspendUserResponse {
  UserErrors?: UserError[];
}
export const BatchUnsuspendUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UserErrors: S.optional(UserErrorList) }),
).annotate({
  identifier: "BatchUnsuspendUserResponse",
}) as any as S.Schema<BatchUnsuspendUserResponse>;
export type PhoneNumberProductType =
  | "BusinessCalling"
  | "VoiceConnector"
  | "SipMediaApplicationDialIn"
  | (string & {});
export const PhoneNumberProductType = S.String;

export type CallingName = string | redacted.Redacted<string>;
export interface UpdatePhoneNumberRequestItem {
  PhoneNumberId: string;
  ProductType?: PhoneNumberProductType;
  CallingName?: string | redacted.Redacted<string>;
}
export const UpdatePhoneNumberRequestItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PhoneNumberId: S.String,
    ProductType: S.optional(PhoneNumberProductType),
    CallingName: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "UpdatePhoneNumberRequestItem",
}) as any as S.Schema<UpdatePhoneNumberRequestItem>;
export type UpdatePhoneNumberRequestItemList = UpdatePhoneNumberRequestItem[];
export const UpdatePhoneNumberRequestItemList = /*@__PURE__*/ S.Array(
  UpdatePhoneNumberRequestItem,
);
export interface BatchUpdatePhoneNumberRequest {
  UpdatePhoneNumberRequestItems: UpdatePhoneNumberRequestItem[];
}
export const BatchUpdatePhoneNumberRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UpdatePhoneNumberRequestItems: UpdatePhoneNumberRequestItemList,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/phone-numbers?operation=batch-update" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchUpdatePhoneNumberRequest",
}) as any as S.Schema<BatchUpdatePhoneNumberRequest>;
export interface BatchUpdatePhoneNumberResponse {
  PhoneNumberErrors?: PhoneNumberError[];
}
export const BatchUpdatePhoneNumberResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PhoneNumberErrors: S.optional(PhoneNumberErrorList) }),
).annotate({
  identifier: "BatchUpdatePhoneNumberResponse",
}) as any as S.Schema<BatchUpdatePhoneNumberResponse>;
export type License = "Basic" | "Plus" | "Pro" | "ProTrial" | (string & {});
export const License = S.String;

export type UserType = "PrivateUser" | "SharedDevice" | (string & {});
export const UserType = S.String;

export type SensitiveString = string | redacted.Redacted<string>;
export interface AlexaForBusinessMetadata {
  IsAlexaForBusinessEnabled?: boolean;
  AlexaForBusinessRoomArn?: string | redacted.Redacted<string>;
}
export const AlexaForBusinessMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IsAlexaForBusinessEnabled: S.optional(S.Boolean),
    AlexaForBusinessRoomArn: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "AlexaForBusinessMetadata",
}) as any as S.Schema<AlexaForBusinessMetadata>;
export interface UpdateUserRequestItem {
  UserId: string;
  LicenseType?: License;
  UserType?: UserType;
  AlexaForBusinessMetadata?: AlexaForBusinessMetadata;
}
export const UpdateUserRequestItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserId: S.String,
    LicenseType: S.optional(License),
    UserType: S.optional(UserType),
    AlexaForBusinessMetadata: S.optional(AlexaForBusinessMetadata),
  }),
).annotate({
  identifier: "UpdateUserRequestItem",
}) as any as S.Schema<UpdateUserRequestItem>;
export type UpdateUserRequestItemList = UpdateUserRequestItem[];
export const UpdateUserRequestItemList = /*@__PURE__*/ S.Array(
  UpdateUserRequestItem,
);
export interface BatchUpdateUserRequest {
  AccountId: string;
  UpdateUserRequestItems: UpdateUserRequestItem[];
}
export const BatchUpdateUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(T.HttpLabel("AccountId")),
    UpdateUserRequestItems: UpdateUserRequestItemList,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/accounts/{AccountId}/users" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchUpdateUserRequest",
}) as any as S.Schema<BatchUpdateUserRequest>;
export interface BatchUpdateUserResponse {
  UserErrors?: UserError[];
}
export const BatchUpdateUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UserErrors: S.optional(UserErrorList) }),
).annotate({
  identifier: "BatchUpdateUserResponse",
}) as any as S.Schema<BatchUpdateUserResponse>;
export type AccountName = string;
export interface CreateAccountRequest {
  Name: string;
}
export const CreateAccountRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/accounts" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateAccountRequest",
}) as any as S.Schema<CreateAccountRequest>;
export type AccountType =
  | "Team"
  | "EnterpriseDirectory"
  | "EnterpriseLWA"
  | "EnterpriseOIDC"
  | (string & {});
export const AccountType = S.String;

export type Iso8601Timestamp = Date;
export type LicenseList = License[];
export const LicenseList = /*@__PURE__*/ S.Array(License);
export type AccountStatus = "Suspended" | "Active" | (string & {});
export const AccountStatus = S.String;

export interface Account {
  AwsAccountId: string;
  AccountId: string;
  Name: string;
  AccountType?: AccountType;
  CreatedTimestamp?: Date;
  DefaultLicense?: License;
  SupportedLicenses?: License[];
  AccountStatus?: AccountStatus;
  SigninDelegateGroups?: SigninDelegateGroup[];
}
export const Account = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AwsAccountId: S.String,
    AccountId: S.String,
    Name: S.String,
    AccountType: S.optional(AccountType),
    CreatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    DefaultLicense: S.optional(License),
    SupportedLicenses: S.optional(LicenseList),
    AccountStatus: S.optional(AccountStatus),
    SigninDelegateGroups: S.optional(SigninDelegateGroupList),
  }),
).annotate({ identifier: "Account" }) as any as S.Schema<Account>;
export interface CreateAccountResponse {
  Account?: Account;
}
export const CreateAccountResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Account: S.optional(Account) }),
).annotate({
  identifier: "CreateAccountResponse",
}) as any as S.Schema<CreateAccountResponse>;
export interface CreateBotRequest {
  AccountId: string;
  DisplayName: string | redacted.Redacted<string>;
  Domain?: string;
}
export const CreateBotRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(T.HttpLabel("AccountId")),
    DisplayName: SensitiveString,
    Domain: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/accounts/{AccountId}/bots" }),
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
export type BotType = "ChatBot" | (string & {});
export const BotType = S.String;

export interface Bot {
  BotId?: string;
  UserId?: string;
  DisplayName?: string | redacted.Redacted<string>;
  BotType?: BotType;
  Disabled?: boolean;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
  BotEmail?: string | redacted.Redacted<string>;
  SecurityToken?: string | redacted.Redacted<string>;
}
export const Bot = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BotId: S.optional(S.String),
    UserId: S.optional(S.String),
    DisplayName: S.optional(SensitiveString),
    BotType: S.optional(BotType),
    Disabled: S.optional(S.Boolean),
    CreatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    UpdatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    BotEmail: S.optional(SensitiveString),
    SecurityToken: S.optional(SensitiveString),
  }),
).annotate({ identifier: "Bot" }) as any as S.Schema<Bot>;
export interface CreateBotResponse {
  Bot?: Bot;
}
export const CreateBotResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Bot: S.optional(Bot) }),
).annotate({
  identifier: "CreateBotResponse",
}) as any as S.Schema<CreateBotResponse>;
export type GuidString = string;
export type JoinTokenString = string | redacted.Redacted<string>;
export interface CreateMeetingDialOutRequest {
  MeetingId: string;
  FromPhoneNumber: string | redacted.Redacted<string>;
  ToPhoneNumber: string | redacted.Redacted<string>;
  JoinToken: string | redacted.Redacted<string>;
}
export const CreateMeetingDialOutRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MeetingId: S.String.pipe(T.HttpLabel("MeetingId")),
    FromPhoneNumber: SensitiveString,
    ToPhoneNumber: SensitiveString,
    JoinToken: SensitiveString,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/meetings/{MeetingId}/dial-outs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateMeetingDialOutRequest",
}) as any as S.Schema<CreateMeetingDialOutRequest>;
export interface CreateMeetingDialOutResponse {
  TransactionId?: string;
}
export const CreateMeetingDialOutResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TransactionId: S.optional(S.String) }),
).annotate({
  identifier: "CreateMeetingDialOutResponse",
}) as any as S.Schema<CreateMeetingDialOutResponse>;
export type E164PhoneNumberList = (string | redacted.Redacted<string>)[];
export const E164PhoneNumberList = /*@__PURE__*/ S.Array(SensitiveString);
export interface CreatePhoneNumberOrderRequest {
  ProductType: PhoneNumberProductType;
  E164PhoneNumbers: (string | redacted.Redacted<string>)[];
}
export const CreatePhoneNumberOrderRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProductType: PhoneNumberProductType,
    E164PhoneNumbers: E164PhoneNumberList,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/phone-number-orders" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreatePhoneNumberOrderRequest",
}) as any as S.Schema<CreatePhoneNumberOrderRequest>;
export type PhoneNumberOrderStatus =
  | "Processing"
  | "Successful"
  | "Failed"
  | "Partial"
  | (string & {});
export const PhoneNumberOrderStatus = S.String;

export type OrderedPhoneNumberStatus =
  | "Processing"
  | "Acquired"
  | "Failed"
  | (string & {});
export const OrderedPhoneNumberStatus = S.String;

export interface OrderedPhoneNumber {
  E164PhoneNumber?: string | redacted.Redacted<string>;
  Status?: OrderedPhoneNumberStatus;
}
export const OrderedPhoneNumber = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    E164PhoneNumber: S.optional(SensitiveString),
    Status: S.optional(OrderedPhoneNumberStatus),
  }),
).annotate({
  identifier: "OrderedPhoneNumber",
}) as any as S.Schema<OrderedPhoneNumber>;
export type OrderedPhoneNumberList = OrderedPhoneNumber[];
export const OrderedPhoneNumberList = /*@__PURE__*/ S.Array(OrderedPhoneNumber);
export interface PhoneNumberOrder {
  PhoneNumberOrderId?: string;
  ProductType?: PhoneNumberProductType;
  Status?: PhoneNumberOrderStatus;
  OrderedPhoneNumbers?: OrderedPhoneNumber[];
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
}
export const PhoneNumberOrder = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PhoneNumberOrderId: S.optional(S.String),
    ProductType: S.optional(PhoneNumberProductType),
    Status: S.optional(PhoneNumberOrderStatus),
    OrderedPhoneNumbers: S.optional(OrderedPhoneNumberList),
    CreatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    UpdatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "PhoneNumberOrder",
}) as any as S.Schema<PhoneNumberOrder>;
export interface CreatePhoneNumberOrderResponse {
  PhoneNumberOrder?: PhoneNumberOrder;
}
export const CreatePhoneNumberOrderResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PhoneNumberOrder: S.optional(PhoneNumberOrder) }),
).annotate({
  identifier: "CreatePhoneNumberOrderResponse",
}) as any as S.Schema<CreatePhoneNumberOrderResponse>;
export type ClientRequestToken = string | redacted.Redacted<string>;
export interface CreateRoomRequest {
  AccountId: string;
  Name: string | redacted.Redacted<string>;
  ClientRequestToken?: string | redacted.Redacted<string>;
}
export const CreateRoomRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(T.HttpLabel("AccountId")),
    Name: SensitiveString,
    ClientRequestToken: S.optional(SensitiveString).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/accounts/{AccountId}/rooms" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateRoomRequest",
}) as any as S.Schema<CreateRoomRequest>;
export interface Room {
  RoomId?: string;
  Name?: string | redacted.Redacted<string>;
  AccountId?: string;
  CreatedBy?: string;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
}
export const Room = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RoomId: S.optional(S.String),
    Name: S.optional(SensitiveString),
    AccountId: S.optional(S.String),
    CreatedBy: S.optional(S.String),
    CreatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    UpdatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({ identifier: "Room" }) as any as S.Schema<Room>;
export interface CreateRoomResponse {
  Room?: Room;
}
export const CreateRoomResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Room: S.optional(Room) }),
).annotate({
  identifier: "CreateRoomResponse",
}) as any as S.Schema<CreateRoomResponse>;
export interface CreateRoomMembershipRequest {
  AccountId: string;
  RoomId: string;
  MemberId: string;
  Role?: RoomMembershipRole;
}
export const CreateRoomMembershipRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(T.HttpLabel("AccountId")),
    RoomId: S.String.pipe(T.HttpLabel("RoomId")),
    MemberId: S.String,
    Role: S.optional(RoomMembershipRole),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/accounts/{AccountId}/rooms/{RoomId}/memberships",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateRoomMembershipRequest",
}) as any as S.Schema<CreateRoomMembershipRequest>;
export type MemberType = "User" | "Bot" | "Webhook" | (string & {});
export const MemberType = S.String;

export interface Member {
  MemberId?: string;
  MemberType?: MemberType;
  Email?: string | redacted.Redacted<string>;
  FullName?: string | redacted.Redacted<string>;
  AccountId?: string;
}
export const Member = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MemberId: S.optional(S.String),
    MemberType: S.optional(MemberType),
    Email: S.optional(SensitiveString),
    FullName: S.optional(SensitiveString),
    AccountId: S.optional(S.String),
  }),
).annotate({ identifier: "Member" }) as any as S.Schema<Member>;
export interface RoomMembership {
  RoomId?: string;
  Member?: Member;
  Role?: RoomMembershipRole;
  InvitedBy?: string;
  UpdatedTimestamp?: Date;
}
export const RoomMembership = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RoomId: S.optional(S.String),
    Member: S.optional(Member),
    Role: S.optional(RoomMembershipRole),
    InvitedBy: S.optional(S.String),
    UpdatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({ identifier: "RoomMembership" }) as any as S.Schema<RoomMembership>;
export interface CreateRoomMembershipResponse {
  RoomMembership?: RoomMembership;
}
export const CreateRoomMembershipResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RoomMembership: S.optional(RoomMembership) }),
).annotate({
  identifier: "CreateRoomMembershipResponse",
}) as any as S.Schema<CreateRoomMembershipResponse>;
export type EmailAddress = string | redacted.Redacted<string>;
export interface CreateUserRequest {
  AccountId: string;
  Username?: string;
  Email?: string | redacted.Redacted<string>;
  UserType?: UserType;
}
export const CreateUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(T.HttpLabel("AccountId")),
    Username: S.optional(S.String),
    Email: S.optional(SensitiveString),
    UserType: S.optional(UserType),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/accounts/{AccountId}/users?operation=create",
      }),
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
export type RegistrationStatus =
  | "Unregistered"
  | "Registered"
  | "Suspended"
  | (string & {});
export const RegistrationStatus = S.String;

export type InviteStatus = "Pending" | "Accepted" | "Failed" | (string & {});
export const InviteStatus = S.String;

export interface User {
  UserId: string;
  AccountId?: string;
  PrimaryEmail?: string | redacted.Redacted<string>;
  PrimaryProvisionedNumber?: string | redacted.Redacted<string>;
  DisplayName?: string | redacted.Redacted<string>;
  LicenseType?: License;
  UserType?: UserType;
  UserRegistrationStatus?: RegistrationStatus;
  UserInvitationStatus?: InviteStatus;
  RegisteredOn?: Date;
  InvitedOn?: Date;
  AlexaForBusinessMetadata?: AlexaForBusinessMetadata;
  PersonalPIN?: string;
}
export const User = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserId: S.String,
    AccountId: S.optional(S.String),
    PrimaryEmail: S.optional(SensitiveString),
    PrimaryProvisionedNumber: S.optional(SensitiveString),
    DisplayName: S.optional(SensitiveString),
    LicenseType: S.optional(License),
    UserType: S.optional(UserType),
    UserRegistrationStatus: S.optional(RegistrationStatus),
    UserInvitationStatus: S.optional(InviteStatus),
    RegisteredOn: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    InvitedOn: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    AlexaForBusinessMetadata: S.optional(AlexaForBusinessMetadata),
    PersonalPIN: S.optional(S.String),
  }),
).annotate({ identifier: "User" }) as any as S.Schema<User>;
export interface CreateUserResponse {
  User?: User;
}
export const CreateUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ User: S.optional(User) }),
).annotate({
  identifier: "CreateUserResponse",
}) as any as S.Schema<CreateUserResponse>;
export interface DeleteAccountRequest {
  AccountId: string;
}
export const DeleteAccountRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccountId: S.String.pipe(T.HttpLabel("AccountId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/accounts/{AccountId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAccountRequest",
}) as any as S.Schema<DeleteAccountRequest>;
export interface DeleteAccountResponse {}
export const DeleteAccountResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAccountResponse",
}) as any as S.Schema<DeleteAccountResponse>;
export interface DeleteEventsConfigurationRequest {
  AccountId: string;
  BotId: string;
}
export const DeleteEventsConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(T.HttpLabel("AccountId")),
    BotId: S.String.pipe(T.HttpLabel("BotId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/accounts/{AccountId}/bots/{BotId}/events-configuration",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteEventsConfigurationRequest",
}) as any as S.Schema<DeleteEventsConfigurationRequest>;
export interface DeleteEventsConfigurationResponse {}
export const DeleteEventsConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteEventsConfigurationResponse",
}) as any as S.Schema<DeleteEventsConfigurationResponse>;
export interface DeletePhoneNumberRequest {
  PhoneNumberId: string;
}
export const DeletePhoneNumberRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PhoneNumberId: S.String.pipe(T.HttpLabel("PhoneNumberId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/phone-numbers/{PhoneNumberId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeletePhoneNumberRequest",
}) as any as S.Schema<DeletePhoneNumberRequest>;
export interface DeletePhoneNumberResponse {}
export const DeletePhoneNumberResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeletePhoneNumberResponse",
}) as any as S.Schema<DeletePhoneNumberResponse>;
export interface DeleteRoomRequest {
  AccountId: string;
  RoomId: string;
}
export const DeleteRoomRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(T.HttpLabel("AccountId")),
    RoomId: S.String.pipe(T.HttpLabel("RoomId")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/accounts/{AccountId}/rooms/{RoomId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteRoomRequest",
}) as any as S.Schema<DeleteRoomRequest>;
export interface DeleteRoomResponse {}
export const DeleteRoomResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteRoomResponse",
}) as any as S.Schema<DeleteRoomResponse>;
export interface DeleteRoomMembershipRequest {
  AccountId: string;
  RoomId: string;
  MemberId: string;
}
export const DeleteRoomMembershipRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(T.HttpLabel("AccountId")),
    RoomId: S.String.pipe(T.HttpLabel("RoomId")),
    MemberId: S.String.pipe(T.HttpLabel("MemberId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/accounts/{AccountId}/rooms/{RoomId}/memberships/{MemberId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteRoomMembershipRequest",
}) as any as S.Schema<DeleteRoomMembershipRequest>;
export interface DeleteRoomMembershipResponse {}
export const DeleteRoomMembershipResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteRoomMembershipResponse",
}) as any as S.Schema<DeleteRoomMembershipResponse>;
export interface DisassociatePhoneNumberFromUserRequest {
  AccountId: string;
  UserId: string;
}
export const DisassociatePhoneNumberFromUserRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AccountId: S.String.pipe(T.HttpLabel("AccountId")),
      UserId: S.String.pipe(T.HttpLabel("UserId")),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/accounts/{AccountId}/users/{UserId}?operation=disassociate-phone-number",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DisassociatePhoneNumberFromUserRequest",
}) as any as S.Schema<DisassociatePhoneNumberFromUserRequest>;
export interface DisassociatePhoneNumberFromUserResponse {}
export const DisassociatePhoneNumberFromUserResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DisassociatePhoneNumberFromUserResponse",
}) as any as S.Schema<DisassociatePhoneNumberFromUserResponse>;
export interface DisassociateSigninDelegateGroupsFromAccountRequest {
  AccountId: string;
  GroupNames: string[];
}
export const DisassociateSigninDelegateGroupsFromAccountRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AccountId: S.String.pipe(T.HttpLabel("AccountId")),
      GroupNames: NonEmptyStringList,
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/accounts/{AccountId}?operation=disassociate-signin-delegate-groups",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DisassociateSigninDelegateGroupsFromAccountRequest",
  }) as any as S.Schema<DisassociateSigninDelegateGroupsFromAccountRequest>;
export interface DisassociateSigninDelegateGroupsFromAccountResponse {}
export const DisassociateSigninDelegateGroupsFromAccountResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "DisassociateSigninDelegateGroupsFromAccountResponse",
  }) as any as S.Schema<DisassociateSigninDelegateGroupsFromAccountResponse>;
export interface GetAccountRequest {
  AccountId: string;
}
export const GetAccountRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccountId: S.String.pipe(T.HttpLabel("AccountId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/accounts/{AccountId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAccountRequest",
}) as any as S.Schema<GetAccountRequest>;
export interface GetAccountResponse {
  Account?: Account;
}
export const GetAccountResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Account: S.optional(Account) }),
).annotate({
  identifier: "GetAccountResponse",
}) as any as S.Schema<GetAccountResponse>;
export interface GetAccountSettingsRequest {
  AccountId: string;
}
export const GetAccountSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccountId: S.String.pipe(T.HttpLabel("AccountId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/accounts/{AccountId}/settings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAccountSettingsRequest",
}) as any as S.Schema<GetAccountSettingsRequest>;
export interface AccountSettings {
  DisableRemoteControl?: boolean;
  EnableDialOut?: boolean;
}
export const AccountSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DisableRemoteControl: S.optional(S.Boolean),
    EnableDialOut: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "AccountSettings",
}) as any as S.Schema<AccountSettings>;
export interface GetAccountSettingsResponse {
  AccountSettings?: AccountSettings;
}
export const GetAccountSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccountSettings: S.optional(AccountSettings) }),
).annotate({
  identifier: "GetAccountSettingsResponse",
}) as any as S.Schema<GetAccountSettingsResponse>;
export interface GetBotRequest {
  AccountId: string;
  BotId: string;
}
export const GetBotRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(T.HttpLabel("AccountId")),
    BotId: S.String.pipe(T.HttpLabel("BotId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/accounts/{AccountId}/bots/{BotId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetBotRequest" }) as any as S.Schema<GetBotRequest>;
export interface GetBotResponse {
  Bot?: Bot;
}
export const GetBotResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Bot: S.optional(Bot) }),
).annotate({ identifier: "GetBotResponse" }) as any as S.Schema<GetBotResponse>;
export interface GetEventsConfigurationRequest {
  AccountId: string;
  BotId: string;
}
export const GetEventsConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(T.HttpLabel("AccountId")),
    BotId: S.String.pipe(T.HttpLabel("BotId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/accounts/{AccountId}/bots/{BotId}/events-configuration",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetEventsConfigurationRequest",
}) as any as S.Schema<GetEventsConfigurationRequest>;
export interface EventsConfiguration {
  BotId?: string;
  OutboundEventsHTTPSEndpoint?: string | redacted.Redacted<string>;
  LambdaFunctionArn?: string | redacted.Redacted<string>;
}
export const EventsConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BotId: S.optional(S.String),
    OutboundEventsHTTPSEndpoint: S.optional(SensitiveString),
    LambdaFunctionArn: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "EventsConfiguration",
}) as any as S.Schema<EventsConfiguration>;
export interface GetEventsConfigurationResponse {
  EventsConfiguration?: EventsConfiguration;
}
export const GetEventsConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EventsConfiguration: S.optional(EventsConfiguration) }),
).annotate({
  identifier: "GetEventsConfigurationResponse",
}) as any as S.Schema<GetEventsConfigurationResponse>;
export interface GetGlobalSettingsRequest {}
export const GetGlobalSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/settings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetGlobalSettingsRequest",
}) as any as S.Schema<GetGlobalSettingsRequest>;
export interface BusinessCallingSettings {
  CdrBucket?: string;
}
export const BusinessCallingSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CdrBucket: S.optional(S.String) }),
).annotate({
  identifier: "BusinessCallingSettings",
}) as any as S.Schema<BusinessCallingSettings>;
export interface VoiceConnectorSettings {
  CdrBucket?: string;
}
export const VoiceConnectorSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CdrBucket: S.optional(S.String) }),
).annotate({
  identifier: "VoiceConnectorSettings",
}) as any as S.Schema<VoiceConnectorSettings>;
export interface GetGlobalSettingsResponse {
  BusinessCalling?: BusinessCallingSettings;
  VoiceConnector?: VoiceConnectorSettings;
}
export const GetGlobalSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BusinessCalling: S.optional(BusinessCallingSettings),
    VoiceConnector: S.optional(VoiceConnectorSettings),
  }),
).annotate({
  identifier: "GetGlobalSettingsResponse",
}) as any as S.Schema<GetGlobalSettingsResponse>;
export interface GetPhoneNumberRequest {
  PhoneNumberId: string;
}
export const GetPhoneNumberRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PhoneNumberId: S.String.pipe(T.HttpLabel("PhoneNumberId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/phone-numbers/{PhoneNumberId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPhoneNumberRequest",
}) as any as S.Schema<GetPhoneNumberRequest>;
export type Alpha2CountryCode = string;
export type PhoneNumberType = "Local" | "TollFree" | (string & {});
export const PhoneNumberType = S.String;

export type PhoneNumberStatus =
  | "AcquireInProgress"
  | "AcquireFailed"
  | "Unassigned"
  | "Assigned"
  | "ReleaseInProgress"
  | "DeleteInProgress"
  | "ReleaseFailed"
  | "DeleteFailed"
  | (string & {});
export const PhoneNumberStatus = S.String;

export interface PhoneNumberCapabilities {
  InboundCall?: boolean;
  OutboundCall?: boolean;
  InboundSMS?: boolean;
  OutboundSMS?: boolean;
  InboundMMS?: boolean;
  OutboundMMS?: boolean;
}
export const PhoneNumberCapabilities = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InboundCall: S.optional(S.Boolean),
    OutboundCall: S.optional(S.Boolean),
    InboundSMS: S.optional(S.Boolean),
    OutboundSMS: S.optional(S.Boolean),
    InboundMMS: S.optional(S.Boolean),
    OutboundMMS: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "PhoneNumberCapabilities",
}) as any as S.Schema<PhoneNumberCapabilities>;
export type PhoneNumberAssociationName =
  | "AccountId"
  | "UserId"
  | "VoiceConnectorId"
  | "VoiceConnectorGroupId"
  | "SipRuleId"
  | (string & {});
export const PhoneNumberAssociationName = S.String;

export interface PhoneNumberAssociation {
  Value?: string;
  Name?: PhoneNumberAssociationName;
  AssociatedTimestamp?: Date;
}
export const PhoneNumberAssociation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Value: S.optional(S.String),
    Name: S.optional(PhoneNumberAssociationName),
    AssociatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "PhoneNumberAssociation",
}) as any as S.Schema<PhoneNumberAssociation>;
export type PhoneNumberAssociationList = PhoneNumberAssociation[];
export const PhoneNumberAssociationList = /*@__PURE__*/ S.Array(
  PhoneNumberAssociation,
);
export type CallingNameStatus =
  | "Unassigned"
  | "UpdateInProgress"
  | "UpdateSucceeded"
  | "UpdateFailed"
  | (string & {});
export const CallingNameStatus = S.String;

export interface PhoneNumber {
  PhoneNumberId?: string;
  E164PhoneNumber?: string | redacted.Redacted<string>;
  Country?: string;
  Type?: PhoneNumberType;
  ProductType?: PhoneNumberProductType;
  Status?: PhoneNumberStatus;
  Capabilities?: PhoneNumberCapabilities;
  Associations?: PhoneNumberAssociation[];
  CallingName?: string | redacted.Redacted<string>;
  CallingNameStatus?: CallingNameStatus;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
  DeletionTimestamp?: Date;
}
export const PhoneNumber = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PhoneNumberId: S.optional(S.String),
    E164PhoneNumber: S.optional(SensitiveString),
    Country: S.optional(S.String),
    Type: S.optional(PhoneNumberType),
    ProductType: S.optional(PhoneNumberProductType),
    Status: S.optional(PhoneNumberStatus),
    Capabilities: S.optional(PhoneNumberCapabilities),
    Associations: S.optional(PhoneNumberAssociationList),
    CallingName: S.optional(SensitiveString),
    CallingNameStatus: S.optional(CallingNameStatus),
    CreatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    UpdatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    DeletionTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({ identifier: "PhoneNumber" }) as any as S.Schema<PhoneNumber>;
export interface GetPhoneNumberResponse {
  PhoneNumber?: PhoneNumber;
}
export const GetPhoneNumberResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PhoneNumber: S.optional(PhoneNumber) }),
).annotate({
  identifier: "GetPhoneNumberResponse",
}) as any as S.Schema<GetPhoneNumberResponse>;
export interface GetPhoneNumberOrderRequest {
  PhoneNumberOrderId: string;
}
export const GetPhoneNumberOrderRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PhoneNumberOrderId: S.String.pipe(T.HttpLabel("PhoneNumberOrderId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/phone-number-orders/{PhoneNumberOrderId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPhoneNumberOrderRequest",
}) as any as S.Schema<GetPhoneNumberOrderRequest>;
export interface GetPhoneNumberOrderResponse {
  PhoneNumberOrder?: PhoneNumberOrder;
}
export const GetPhoneNumberOrderResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PhoneNumberOrder: S.optional(PhoneNumberOrder) }),
).annotate({
  identifier: "GetPhoneNumberOrderResponse",
}) as any as S.Schema<GetPhoneNumberOrderResponse>;
export interface GetPhoneNumberSettingsRequest {}
export const GetPhoneNumberSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/settings/phone-number" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPhoneNumberSettingsRequest",
}) as any as S.Schema<GetPhoneNumberSettingsRequest>;
export interface GetPhoneNumberSettingsResponse {
  CallingName?: string | redacted.Redacted<string>;
  CallingNameUpdatedTimestamp?: Date;
}
export const GetPhoneNumberSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CallingName: S.optional(SensitiveString),
    CallingNameUpdatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "GetPhoneNumberSettingsResponse",
}) as any as S.Schema<GetPhoneNumberSettingsResponse>;
export interface GetRetentionSettingsRequest {
  AccountId: string;
}
export const GetRetentionSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccountId: S.String.pipe(T.HttpLabel("AccountId")) }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/accounts/{AccountId}/retention-settings",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRetentionSettingsRequest",
}) as any as S.Schema<GetRetentionSettingsRequest>;
export type RetentionDays = number;
export interface RoomRetentionSettings {
  RetentionDays?: number;
}
export const RoomRetentionSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RetentionDays: S.optional(S.Number) }),
).annotate({
  identifier: "RoomRetentionSettings",
}) as any as S.Schema<RoomRetentionSettings>;
export interface ConversationRetentionSettings {
  RetentionDays?: number;
}
export const ConversationRetentionSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RetentionDays: S.optional(S.Number) }),
).annotate({
  identifier: "ConversationRetentionSettings",
}) as any as S.Schema<ConversationRetentionSettings>;
export interface RetentionSettings {
  RoomRetentionSettings?: RoomRetentionSettings;
  ConversationRetentionSettings?: ConversationRetentionSettings;
}
export const RetentionSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RoomRetentionSettings: S.optional(RoomRetentionSettings),
    ConversationRetentionSettings: S.optional(ConversationRetentionSettings),
  }),
).annotate({
  identifier: "RetentionSettings",
}) as any as S.Schema<RetentionSettings>;
export interface GetRetentionSettingsResponse {
  RetentionSettings?: RetentionSettings;
  InitiateDeletionTimestamp?: Date;
}
export const GetRetentionSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RetentionSettings: S.optional(RetentionSettings),
    InitiateDeletionTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "GetRetentionSettingsResponse",
}) as any as S.Schema<GetRetentionSettingsResponse>;
export interface GetRoomRequest {
  AccountId: string;
  RoomId: string;
}
export const GetRoomRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(T.HttpLabel("AccountId")),
    RoomId: S.String.pipe(T.HttpLabel("RoomId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/accounts/{AccountId}/rooms/{RoomId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetRoomRequest" }) as any as S.Schema<GetRoomRequest>;
export interface GetRoomResponse {
  Room?: Room;
}
export const GetRoomResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Room: S.optional(Room) }),
).annotate({
  identifier: "GetRoomResponse",
}) as any as S.Schema<GetRoomResponse>;
export interface GetUserRequest {
  AccountId: string;
  UserId: string;
}
export const GetUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(T.HttpLabel("AccountId")),
    UserId: S.String.pipe(T.HttpLabel("UserId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/accounts/{AccountId}/users/{UserId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetUserRequest" }) as any as S.Schema<GetUserRequest>;
export interface GetUserResponse {
  User?: User;
}
export const GetUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ User: S.optional(User) }),
).annotate({
  identifier: "GetUserResponse",
}) as any as S.Schema<GetUserResponse>;
export interface GetUserSettingsRequest {
  AccountId: string;
  UserId: string;
}
export const GetUserSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(T.HttpLabel("AccountId")),
    UserId: S.String.pipe(T.HttpLabel("UserId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/accounts/{AccountId}/users/{UserId}/settings",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetUserSettingsRequest",
}) as any as S.Schema<GetUserSettingsRequest>;
export interface TelephonySettings {
  InboundCalling: boolean;
  OutboundCalling: boolean;
  SMS: boolean;
}
export const TelephonySettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InboundCalling: S.Boolean,
    OutboundCalling: S.Boolean,
    SMS: S.Boolean,
  }),
).annotate({
  identifier: "TelephonySettings",
}) as any as S.Schema<TelephonySettings>;
export interface UserSettings {
  Telephony: TelephonySettings;
}
export const UserSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Telephony: TelephonySettings }),
).annotate({ identifier: "UserSettings" }) as any as S.Schema<UserSettings>;
export interface GetUserSettingsResponse {
  UserSettings?: UserSettings;
}
export const GetUserSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UserSettings: S.optional(UserSettings) }),
).annotate({
  identifier: "GetUserSettingsResponse",
}) as any as S.Schema<GetUserSettingsResponse>;
export type UserEmailList = (string | redacted.Redacted<string>)[];
export const UserEmailList = /*@__PURE__*/ S.Array(SensitiveString);
export interface InviteUsersRequest {
  AccountId: string;
  UserEmailList: (string | redacted.Redacted<string>)[];
  UserType?: UserType;
}
export const InviteUsersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(T.HttpLabel("AccountId")),
    UserEmailList: UserEmailList,
    UserType: S.optional(UserType),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/accounts/{AccountId}/users?operation=add",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "InviteUsersRequest",
}) as any as S.Schema<InviteUsersRequest>;
export type EmailStatus = "NotSent" | "Sent" | "Failed" | (string & {});
export const EmailStatus = S.String;

export interface Invite {
  InviteId?: string;
  Status?: InviteStatus;
  EmailAddress?: string | redacted.Redacted<string>;
  EmailStatus?: EmailStatus;
}
export const Invite = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InviteId: S.optional(S.String),
    Status: S.optional(InviteStatus),
    EmailAddress: S.optional(SensitiveString),
    EmailStatus: S.optional(EmailStatus),
  }),
).annotate({ identifier: "Invite" }) as any as S.Schema<Invite>;
export type InviteList = Invite[];
export const InviteList = /*@__PURE__*/ S.Array(Invite);
export interface InviteUsersResponse {
  Invites?: Invite[];
}
export const InviteUsersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Invites: S.optional(InviteList) }),
).annotate({
  identifier: "InviteUsersResponse",
}) as any as S.Schema<InviteUsersResponse>;
export type ProfileServiceMaxResults = number;
export interface ListAccountsRequest {
  Name?: string;
  UserEmail?: string | redacted.Redacted<string>;
  NextToken?: string;
  MaxResults?: number;
}
export const ListAccountsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String).pipe(T.HttpQuery("name")),
    UserEmail: S.optional(SensitiveString).pipe(T.HttpQuery("user-email")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/accounts" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAccountsRequest",
}) as any as S.Schema<ListAccountsRequest>;
export type AccountList = Account[];
export const AccountList = /*@__PURE__*/ S.Array(Account);
export interface ListAccountsResponse {
  Accounts?: Account[];
  NextToken?: string;
}
export const ListAccountsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Accounts: S.optional(AccountList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAccountsResponse",
}) as any as S.Schema<ListAccountsResponse>;
export type ResultMax = number;
export interface ListBotsRequest {
  AccountId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListBotsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(T.HttpLabel("AccountId")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/accounts/{AccountId}/bots" }),
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
export type BotList = Bot[];
export const BotList = /*@__PURE__*/ S.Array(Bot);
export interface ListBotsResponse {
  Bots?: Bot[];
  NextToken?: string;
}
export const ListBotsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Bots: S.optional(BotList), NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListBotsResponse",
}) as any as S.Schema<ListBotsResponse>;
export interface ListPhoneNumberOrdersRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListPhoneNumberOrdersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/phone-number-orders" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPhoneNumberOrdersRequest",
}) as any as S.Schema<ListPhoneNumberOrdersRequest>;
export type PhoneNumberOrderList = PhoneNumberOrder[];
export const PhoneNumberOrderList = /*@__PURE__*/ S.Array(PhoneNumberOrder);
export interface ListPhoneNumberOrdersResponse {
  PhoneNumberOrders?: PhoneNumberOrder[];
  NextToken?: string;
}
export const ListPhoneNumberOrdersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PhoneNumberOrders: S.optional(PhoneNumberOrderList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPhoneNumberOrdersResponse",
}) as any as S.Schema<ListPhoneNumberOrdersResponse>;
export interface ListPhoneNumbersRequest {
  Status?: PhoneNumberStatus;
  ProductType?: PhoneNumberProductType;
  FilterName?: PhoneNumberAssociationName;
  FilterValue?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListPhoneNumbersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(PhoneNumberStatus).pipe(T.HttpQuery("status")),
    ProductType: S.optional(PhoneNumberProductType).pipe(
      T.HttpQuery("product-type"),
    ),
    FilterName: S.optional(PhoneNumberAssociationName).pipe(
      T.HttpQuery("filter-name"),
    ),
    FilterValue: S.optional(S.String).pipe(T.HttpQuery("filter-value")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/phone-numbers" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPhoneNumbersRequest",
}) as any as S.Schema<ListPhoneNumbersRequest>;
export type PhoneNumberList = PhoneNumber[];
export const PhoneNumberList = /*@__PURE__*/ S.Array(PhoneNumber);
export interface ListPhoneNumbersResponse {
  PhoneNumbers?: PhoneNumber[];
  NextToken?: string;
}
export const ListPhoneNumbersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PhoneNumbers: S.optional(PhoneNumberList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPhoneNumbersResponse",
}) as any as S.Schema<ListPhoneNumbersResponse>;
export interface ListRoomMembershipsRequest {
  AccountId: string;
  RoomId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListRoomMembershipsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(T.HttpLabel("AccountId")),
    RoomId: S.String.pipe(T.HttpLabel("RoomId")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/accounts/{AccountId}/rooms/{RoomId}/memberships",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListRoomMembershipsRequest",
}) as any as S.Schema<ListRoomMembershipsRequest>;
export type RoomMembershipList = RoomMembership[];
export const RoomMembershipList = /*@__PURE__*/ S.Array(RoomMembership);
export interface ListRoomMembershipsResponse {
  RoomMemberships?: RoomMembership[];
  NextToken?: string;
}
export const ListRoomMembershipsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RoomMemberships: S.optional(RoomMembershipList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListRoomMembershipsResponse",
}) as any as S.Schema<ListRoomMembershipsResponse>;
export interface ListRoomsRequest {
  AccountId: string;
  MemberId?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListRoomsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(T.HttpLabel("AccountId")),
    MemberId: S.optional(S.String).pipe(T.HttpQuery("member-id")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/accounts/{AccountId}/rooms" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListRoomsRequest",
}) as any as S.Schema<ListRoomsRequest>;
export type RoomList = Room[];
export const RoomList = /*@__PURE__*/ S.Array(Room);
export interface ListRoomsResponse {
  Rooms?: Room[];
  NextToken?: string;
}
export const ListRoomsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Rooms: S.optional(RoomList), NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListRoomsResponse",
}) as any as S.Schema<ListRoomsResponse>;
export interface ListSupportedPhoneNumberCountriesRequest {
  ProductType: PhoneNumberProductType;
}
export const ListSupportedPhoneNumberCountriesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ProductType: PhoneNumberProductType.pipe(T.HttpQuery("product-type")),
    }).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/phone-number-countries" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListSupportedPhoneNumberCountriesRequest",
}) as any as S.Schema<ListSupportedPhoneNumberCountriesRequest>;
export type PhoneNumberTypeList = PhoneNumberType[];
export const PhoneNumberTypeList = /*@__PURE__*/ S.Array(PhoneNumberType);
export interface PhoneNumberCountry {
  CountryCode?: string;
  SupportedPhoneNumberTypes?: PhoneNumberType[];
}
export const PhoneNumberCountry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CountryCode: S.optional(S.String),
    SupportedPhoneNumberTypes: S.optional(PhoneNumberTypeList),
  }),
).annotate({
  identifier: "PhoneNumberCountry",
}) as any as S.Schema<PhoneNumberCountry>;
export type PhoneNumberCountriesList = PhoneNumberCountry[];
export const PhoneNumberCountriesList =
  /*@__PURE__*/ S.Array(PhoneNumberCountry);
export interface ListSupportedPhoneNumberCountriesResponse {
  PhoneNumberCountries?: PhoneNumberCountry[];
}
export const ListSupportedPhoneNumberCountriesResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ PhoneNumberCountries: S.optional(PhoneNumberCountriesList) }),
  ).annotate({
    identifier: "ListSupportedPhoneNumberCountriesResponse",
  }) as any as S.Schema<ListSupportedPhoneNumberCountriesResponse>;
export interface ListUsersRequest {
  AccountId: string;
  UserEmail?: string | redacted.Redacted<string>;
  UserType?: UserType;
  MaxResults?: number;
  NextToken?: string;
}
export const ListUsersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(T.HttpLabel("AccountId")),
    UserEmail: S.optional(SensitiveString).pipe(T.HttpQuery("user-email")),
    UserType: S.optional(UserType).pipe(T.HttpQuery("user-type")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/accounts/{AccountId}/users" }),
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
export type UserList = User[];
export const UserList = /*@__PURE__*/ S.Array(User);
export interface ListUsersResponse {
  Users?: User[];
  NextToken?: string;
}
export const ListUsersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Users: S.optional(UserList), NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListUsersResponse",
}) as any as S.Schema<ListUsersResponse>;
export interface LogoutUserRequest {
  AccountId: string;
  UserId: string;
}
export const LogoutUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(T.HttpLabel("AccountId")),
    UserId: S.String.pipe(T.HttpLabel("UserId")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/accounts/{AccountId}/users/{UserId}?operation=logout",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "LogoutUserRequest",
}) as any as S.Schema<LogoutUserRequest>;
export interface LogoutUserResponse {}
export const LogoutUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "LogoutUserResponse",
}) as any as S.Schema<LogoutUserResponse>;
export interface PutEventsConfigurationRequest {
  AccountId: string;
  BotId: string;
  OutboundEventsHTTPSEndpoint?: string | redacted.Redacted<string>;
  LambdaFunctionArn?: string | redacted.Redacted<string>;
}
export const PutEventsConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(T.HttpLabel("AccountId")),
    BotId: S.String.pipe(T.HttpLabel("BotId")),
    OutboundEventsHTTPSEndpoint: S.optional(SensitiveString),
    LambdaFunctionArn: S.optional(SensitiveString),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/accounts/{AccountId}/bots/{BotId}/events-configuration",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutEventsConfigurationRequest",
}) as any as S.Schema<PutEventsConfigurationRequest>;
export interface PutEventsConfigurationResponse {
  EventsConfiguration?: EventsConfiguration;
}
export const PutEventsConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EventsConfiguration: S.optional(EventsConfiguration) }),
).annotate({
  identifier: "PutEventsConfigurationResponse",
}) as any as S.Schema<PutEventsConfigurationResponse>;
export interface PutRetentionSettingsRequest {
  AccountId: string;
  RetentionSettings: RetentionSettings;
}
export const PutRetentionSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(T.HttpLabel("AccountId")),
    RetentionSettings: RetentionSettings,
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/accounts/{AccountId}/retention-settings",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutRetentionSettingsRequest",
}) as any as S.Schema<PutRetentionSettingsRequest>;
export interface PutRetentionSettingsResponse {
  RetentionSettings?: RetentionSettings;
  InitiateDeletionTimestamp?: Date;
}
export const PutRetentionSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RetentionSettings: S.optional(RetentionSettings),
    InitiateDeletionTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "PutRetentionSettingsResponse",
}) as any as S.Schema<PutRetentionSettingsResponse>;
export interface RedactConversationMessageRequest {
  AccountId: string;
  ConversationId: string;
  MessageId: string;
}
export const RedactConversationMessageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(T.HttpLabel("AccountId")),
    ConversationId: S.String.pipe(T.HttpLabel("ConversationId")),
    MessageId: S.String.pipe(T.HttpLabel("MessageId")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/accounts/{AccountId}/conversations/{ConversationId}/messages/{MessageId}?operation=redact",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RedactConversationMessageRequest",
}) as any as S.Schema<RedactConversationMessageRequest>;
export interface RedactConversationMessageResponse {}
export const RedactConversationMessageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "RedactConversationMessageResponse",
}) as any as S.Schema<RedactConversationMessageResponse>;
export interface RedactRoomMessageRequest {
  AccountId: string;
  RoomId: string;
  MessageId: string;
}
export const RedactRoomMessageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(T.HttpLabel("AccountId")),
    RoomId: S.String.pipe(T.HttpLabel("RoomId")),
    MessageId: S.String.pipe(T.HttpLabel("MessageId")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/accounts/{AccountId}/rooms/{RoomId}/messages/{MessageId}?operation=redact",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RedactRoomMessageRequest",
}) as any as S.Schema<RedactRoomMessageRequest>;
export interface RedactRoomMessageResponse {}
export const RedactRoomMessageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "RedactRoomMessageResponse",
}) as any as S.Schema<RedactRoomMessageResponse>;
export interface RegenerateSecurityTokenRequest {
  AccountId: string;
  BotId: string;
}
export const RegenerateSecurityTokenRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(T.HttpLabel("AccountId")),
    BotId: S.String.pipe(T.HttpLabel("BotId")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/accounts/{AccountId}/bots/{BotId}?operation=regenerate-security-token",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RegenerateSecurityTokenRequest",
}) as any as S.Schema<RegenerateSecurityTokenRequest>;
export interface RegenerateSecurityTokenResponse {
  Bot?: Bot;
}
export const RegenerateSecurityTokenResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Bot: S.optional(Bot) }),
).annotate({
  identifier: "RegenerateSecurityTokenResponse",
}) as any as S.Schema<RegenerateSecurityTokenResponse>;
export interface ResetPersonalPINRequest {
  AccountId: string;
  UserId: string;
}
export const ResetPersonalPINRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(T.HttpLabel("AccountId")),
    UserId: S.String.pipe(T.HttpLabel("UserId")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/accounts/{AccountId}/users/{UserId}?operation=reset-personal-pin",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ResetPersonalPINRequest",
}) as any as S.Schema<ResetPersonalPINRequest>;
export interface ResetPersonalPINResponse {
  User?: User;
}
export const ResetPersonalPINResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ User: S.optional(User) }),
).annotate({
  identifier: "ResetPersonalPINResponse",
}) as any as S.Schema<ResetPersonalPINResponse>;
export interface RestorePhoneNumberRequest {
  PhoneNumberId: string;
}
export const RestorePhoneNumberRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PhoneNumberId: S.String.pipe(T.HttpLabel("PhoneNumberId")) }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/phone-numbers/{PhoneNumberId}?operation=restore",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RestorePhoneNumberRequest",
}) as any as S.Schema<RestorePhoneNumberRequest>;
export interface RestorePhoneNumberResponse {
  PhoneNumber?: PhoneNumber;
}
export const RestorePhoneNumberResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PhoneNumber: S.optional(PhoneNumber) }),
).annotate({
  identifier: "RestorePhoneNumberResponse",
}) as any as S.Schema<RestorePhoneNumberResponse>;
export type TollFreePrefix = string;
export type PhoneNumberMaxResults = number;
export interface SearchAvailablePhoneNumbersRequest {
  AreaCode?: string;
  City?: string;
  Country?: string;
  State?: string;
  TollFreePrefix?: string;
  PhoneNumberType?: PhoneNumberType;
  MaxResults?: number;
  NextToken?: string;
}
export const SearchAvailablePhoneNumbersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AreaCode: S.optional(S.String).pipe(T.HttpQuery("area-code")),
    City: S.optional(S.String).pipe(T.HttpQuery("city")),
    Country: S.optional(S.String).pipe(T.HttpQuery("country")),
    State: S.optional(S.String).pipe(T.HttpQuery("state")),
    TollFreePrefix: S.optional(S.String).pipe(T.HttpQuery("toll-free-prefix")),
    PhoneNumberType: S.optional(PhoneNumberType).pipe(
      T.HttpQuery("phone-number-type"),
    ),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/search?type=phone-numbers" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SearchAvailablePhoneNumbersRequest",
}) as any as S.Schema<SearchAvailablePhoneNumbersRequest>;
export interface SearchAvailablePhoneNumbersResponse {
  E164PhoneNumbers?: (string | redacted.Redacted<string>)[];
  NextToken?: string;
}
export const SearchAvailablePhoneNumbersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    E164PhoneNumbers: S.optional(E164PhoneNumberList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "SearchAvailablePhoneNumbersResponse",
}) as any as S.Schema<SearchAvailablePhoneNumbersResponse>;
export interface UpdateAccountRequest {
  AccountId: string;
  Name?: string;
  DefaultLicense?: License;
}
export const UpdateAccountRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(T.HttpLabel("AccountId")),
    Name: S.optional(S.String),
    DefaultLicense: S.optional(License),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/accounts/{AccountId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAccountRequest",
}) as any as S.Schema<UpdateAccountRequest>;
export interface UpdateAccountResponse {
  Account?: Account;
}
export const UpdateAccountResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Account: S.optional(Account) }),
).annotate({
  identifier: "UpdateAccountResponse",
}) as any as S.Schema<UpdateAccountResponse>;
export interface UpdateAccountSettingsRequest {
  AccountId: string;
  AccountSettings: AccountSettings;
}
export const UpdateAccountSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(T.HttpLabel("AccountId")),
    AccountSettings: AccountSettings,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/accounts/{AccountId}/settings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAccountSettingsRequest",
}) as any as S.Schema<UpdateAccountSettingsRequest>;
export interface UpdateAccountSettingsResponse {}
export const UpdateAccountSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateAccountSettingsResponse",
}) as any as S.Schema<UpdateAccountSettingsResponse>;
export interface UpdateBotRequest {
  AccountId: string;
  BotId: string;
  Disabled?: boolean;
}
export const UpdateBotRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(T.HttpLabel("AccountId")),
    BotId: S.String.pipe(T.HttpLabel("BotId")),
    Disabled: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/accounts/{AccountId}/bots/{BotId}" }),
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
  Bot?: Bot;
}
export const UpdateBotResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Bot: S.optional(Bot) }),
).annotate({
  identifier: "UpdateBotResponse",
}) as any as S.Schema<UpdateBotResponse>;
export interface UpdateGlobalSettingsRequest {
  BusinessCalling?: BusinessCallingSettings;
  VoiceConnector?: VoiceConnectorSettings;
}
export const UpdateGlobalSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BusinessCalling: S.optional(BusinessCallingSettings),
    VoiceConnector: S.optional(VoiceConnectorSettings),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/settings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateGlobalSettingsRequest",
}) as any as S.Schema<UpdateGlobalSettingsRequest>;
export interface UpdateGlobalSettingsResponse {}
export const UpdateGlobalSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateGlobalSettingsResponse",
}) as any as S.Schema<UpdateGlobalSettingsResponse>;
export interface UpdatePhoneNumberRequest {
  PhoneNumberId: string;
  ProductType?: PhoneNumberProductType;
  CallingName?: string | redacted.Redacted<string>;
}
export const UpdatePhoneNumberRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PhoneNumberId: S.String.pipe(T.HttpLabel("PhoneNumberId")),
    ProductType: S.optional(PhoneNumberProductType),
    CallingName: S.optional(SensitiveString),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/phone-numbers/{PhoneNumberId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdatePhoneNumberRequest",
}) as any as S.Schema<UpdatePhoneNumberRequest>;
export interface UpdatePhoneNumberResponse {
  PhoneNumber?: PhoneNumber;
}
export const UpdatePhoneNumberResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PhoneNumber: S.optional(PhoneNumber) }),
).annotate({
  identifier: "UpdatePhoneNumberResponse",
}) as any as S.Schema<UpdatePhoneNumberResponse>;
export interface UpdatePhoneNumberSettingsRequest {
  CallingName: string | redacted.Redacted<string>;
}
export const UpdatePhoneNumberSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CallingName: SensitiveString }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/settings/phone-number" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdatePhoneNumberSettingsRequest",
}) as any as S.Schema<UpdatePhoneNumberSettingsRequest>;
export interface UpdatePhoneNumberSettingsResponse {}
export const UpdatePhoneNumberSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdatePhoneNumberSettingsResponse",
}) as any as S.Schema<UpdatePhoneNumberSettingsResponse>;
export interface UpdateRoomRequest {
  AccountId: string;
  RoomId: string;
  Name?: string | redacted.Redacted<string>;
}
export const UpdateRoomRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(T.HttpLabel("AccountId")),
    RoomId: S.String.pipe(T.HttpLabel("RoomId")),
    Name: S.optional(SensitiveString),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/accounts/{AccountId}/rooms/{RoomId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateRoomRequest",
}) as any as S.Schema<UpdateRoomRequest>;
export interface UpdateRoomResponse {
  Room?: Room;
}
export const UpdateRoomResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Room: S.optional(Room) }),
).annotate({
  identifier: "UpdateRoomResponse",
}) as any as S.Schema<UpdateRoomResponse>;
export interface UpdateRoomMembershipRequest {
  AccountId: string;
  RoomId: string;
  MemberId: string;
  Role?: RoomMembershipRole;
}
export const UpdateRoomMembershipRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(T.HttpLabel("AccountId")),
    RoomId: S.String.pipe(T.HttpLabel("RoomId")),
    MemberId: S.String.pipe(T.HttpLabel("MemberId")),
    Role: S.optional(RoomMembershipRole),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/accounts/{AccountId}/rooms/{RoomId}/memberships/{MemberId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateRoomMembershipRequest",
}) as any as S.Schema<UpdateRoomMembershipRequest>;
export interface UpdateRoomMembershipResponse {
  RoomMembership?: RoomMembership;
}
export const UpdateRoomMembershipResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RoomMembership: S.optional(RoomMembership) }),
).annotate({
  identifier: "UpdateRoomMembershipResponse",
}) as any as S.Schema<UpdateRoomMembershipResponse>;
export interface UpdateUserRequest {
  AccountId: string;
  UserId: string;
  LicenseType?: License;
  UserType?: UserType;
  AlexaForBusinessMetadata?: AlexaForBusinessMetadata;
}
export const UpdateUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(T.HttpLabel("AccountId")),
    UserId: S.String.pipe(T.HttpLabel("UserId")),
    LicenseType: S.optional(License),
    UserType: S.optional(UserType),
    AlexaForBusinessMetadata: S.optional(AlexaForBusinessMetadata),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/accounts/{AccountId}/users/{UserId}" }),
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
  S.Struct({ User: S.optional(User) }),
).annotate({
  identifier: "UpdateUserResponse",
}) as any as S.Schema<UpdateUserResponse>;
export interface UpdateUserSettingsRequest {
  AccountId: string;
  UserId: string;
  UserSettings: UserSettings;
}
export const UpdateUserSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(T.HttpLabel("AccountId")),
    UserId: S.String.pipe(T.HttpLabel("UserId")),
    UserSettings: UserSettings,
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/accounts/{AccountId}/users/{UserId}/settings",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateUserSettingsRequest",
}) as any as S.Schema<UpdateUserSettingsRequest>;
export interface UpdateUserSettingsResponse {}
export const UpdateUserSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateUserSettingsResponse",
}) as any as S.Schema<UpdateUserSettingsResponse>;
export type AssociatePhoneNumberWithUserError =
  | AccessDeniedException
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Associates a phone number with the specified Amazon Chime user.
 */
export const associatePhoneNumberWithUser: API.OperationMethod<
  AssociatePhoneNumberWithUserRequest,
  AssociatePhoneNumberWithUserResponse,
  AssociatePhoneNumberWithUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociatePhoneNumberWithUserRequest,
  output: AssociatePhoneNumberWithUserResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociatePhoneNumberWithUser",
}));

export type AssociateSigninDelegateGroupsWithAccountError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Associates the specified sign-in delegate groups with the specified Amazon Chime account.
 */
export const associateSigninDelegateGroupsWithAccount: API.OperationMethod<
  AssociateSigninDelegateGroupsWithAccountRequest,
  AssociateSigninDelegateGroupsWithAccountResponse,
  AssociateSigninDelegateGroupsWithAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateSigninDelegateGroupsWithAccountRequest,
  output: AssociateSigninDelegateGroupsWithAccountResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateSigninDelegateGroupsWithAccount",
}));

export type BatchCreateRoomMembershipError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Adds up to 50 members to a chat room in an Amazon Chime Enterprise account. Members can be users or bots. The member role designates whether the member is a
 * chat room administrator or a general chat room member.
 */
export const batchCreateRoomMembership: API.OperationMethod<
  BatchCreateRoomMembershipRequest,
  BatchCreateRoomMembershipResponse,
  BatchCreateRoomMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchCreateRoomMembershipRequest,
  output: BatchCreateRoomMembershipResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchCreateRoomMembership",
}));

export type BatchDeletePhoneNumberError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Moves phone numbers into the
 * **Deletion queue**. Phone numbers must be disassociated from any users or Amazon Chime Voice Connectors before they can be deleted.
 *
 * Phone numbers remain in the
 * **Deletion queue** for 7 days before they are deleted permanently.
 */
export const batchDeletePhoneNumber: API.OperationMethod<
  BatchDeletePhoneNumberRequest,
  BatchDeletePhoneNumberResponse,
  BatchDeletePhoneNumberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchDeletePhoneNumberRequest,
  output: BatchDeletePhoneNumberResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeletePhoneNumber",
}));

export type BatchSuspendUserError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Suspends up to 50 users from a `Team` or `EnterpriseLWA` Amazon Chime
 * account. For more information about different account types, see Managing Your Amazon Chime Accounts in the Amazon Chime Administration
 * Guide.
 *
 * Users suspended from a `Team` account are disassociated from the account,but they
 * can continue to use Amazon Chime as free users. To remove the suspension from suspended
 * `Team` account users, invite them to the `Team` account again.
 * You can use the InviteUsers action to do so.
 *
 * Users suspended from an `EnterpriseLWA` account are immediately signed out of
 * Amazon Chime and can no longer sign in. To remove the suspension from suspended `EnterpriseLWA` account users, use the
 * BatchUnsuspendUser action.
 *
 * To sign out users without suspending them, use the
 * LogoutUser action.
 */
export const batchSuspendUser: API.OperationMethod<
  BatchSuspendUserRequest,
  BatchSuspendUserResponse,
  BatchSuspendUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchSuspendUserRequest,
  output: BatchSuspendUserResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchSuspendUser",
}));

export type BatchUnsuspendUserError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Removes the suspension from up to 50 previously suspended users for the specified Amazon
 * Chime `EnterpriseLWA` account. Only users on `EnterpriseLWA`
 * accounts can be unsuspended using this action. For more information about different account types, see
 *
 * Managing Your Amazon Chime Accounts
 * in the account types, in the *Amazon Chime Administration Guide*.
 *
 * Previously suspended users who are unsuspended using this action are returned to
 * `Registered`
 * status. Users who are not previously suspended are ignored.
 */
export const batchUnsuspendUser: API.OperationMethod<
  BatchUnsuspendUserRequest,
  BatchUnsuspendUserResponse,
  BatchUnsuspendUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchUnsuspendUserRequest,
  output: BatchUnsuspendUserResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchUnsuspendUser",
}));

export type BatchUpdatePhoneNumberError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Updates phone number product types or calling names. You can update one attribute at a time for each `UpdatePhoneNumberRequestItem`. For example, you can update the product type or the calling name.
 *
 * For toll-free numbers, you cannot use the Amazon Chime Business Calling product type. For numbers outside the U.S., you must use the Amazon Chime SIP Media Application Dial-In product type.
 *
 * Updates to outbound calling names can take up to 72 hours to complete. Pending updates to outbound calling names must be complete before you can request another update.
 */
export const batchUpdatePhoneNumber: API.OperationMethod<
  BatchUpdatePhoneNumberRequest,
  BatchUpdatePhoneNumberResponse,
  BatchUpdatePhoneNumberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchUpdatePhoneNumberRequest,
  output: BatchUpdatePhoneNumberResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchUpdatePhoneNumber",
}));

export type BatchUpdateUserError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Updates user details within the UpdateUserRequestItem object for up to 20 users for the specified Amazon Chime account. Currently, only `LicenseType` updates are supported for this action.
 */
export const batchUpdateUser: API.OperationMethod<
  BatchUpdateUserRequest,
  BatchUpdateUserResponse,
  BatchUpdateUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchUpdateUserRequest,
  output: BatchUpdateUserResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchUpdateUser",
}));

export type CreateAccountError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Creates an Amazon Chime account under the administrator's AWS account. Only `Team`
 * account types are currently supported for this action. For more information about different account types, see
 * Managing Your Amazon Chime Accounts in the Amazon Chime
 * Administration Guide.
 */
export const createAccount: API.OperationMethod<
  CreateAccountRequest,
  CreateAccountResponse,
  CreateAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAccountRequest,
  output: CreateAccountResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAccount",
}));

export type CreateBotError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Creates a bot for an Amazon Chime Enterprise account.
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
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBot",
}));

export type CreateMeetingDialOutError =
  | AccessDeniedException
  | BadRequestException
  | ForbiddenException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Uses the join token and call metadata in a meeting request (From number, To number, and so forth) to initiate an outbound call to a public
 * switched telephone network (PSTN) and join them into a Chime meeting. Also ensures that the From number belongs to the customer.
 *
 * To play welcome audio or implement an interactive voice response (IVR), use the
 * `CreateSipMediaApplicationCall` action with the corresponding SIP media application ID.
 *
 * **This API is not available in a dedicated namespace.**
 */
export const createMeetingDialOut: API.OperationMethod<
  CreateMeetingDialOutRequest,
  CreateMeetingDialOutResponse,
  CreateMeetingDialOutError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateMeetingDialOutRequest,
  output: CreateMeetingDialOutResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMeetingDialOut",
}));

export type CreatePhoneNumberOrderError =
  | AccessDeniedException
  | BadRequestException
  | ForbiddenException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Creates an order for phone numbers to be provisioned. For toll-free numbers, you cannot use the Amazon Chime Business Calling product type.
 * For numbers outside the U.S., you must use the Amazon Chime SIP Media Application Dial-In product type.
 */
export const createPhoneNumberOrder: API.OperationMethod<
  CreatePhoneNumberOrderRequest,
  CreatePhoneNumberOrderResponse,
  CreatePhoneNumberOrderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePhoneNumberOrderRequest,
  output: CreatePhoneNumberOrderResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePhoneNumberOrder",
}));

export type CreateRoomError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Creates a chat room for the specified Amazon Chime Enterprise account.
 */
export const createRoom: API.OperationMethod<
  CreateRoomRequest,
  CreateRoomResponse,
  CreateRoomError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRoomRequest,
  output: CreateRoomResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRoom",
}));

export type CreateRoomMembershipError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Adds a member to a chat room in an Amazon Chime Enterprise account. A member can be either a user or a bot. The member role designates whether the member is a chat room administrator or a general chat room member.
 */
export const createRoomMembership: API.OperationMethod<
  CreateRoomMembershipRequest,
  CreateRoomMembershipResponse,
  CreateRoomMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRoomMembershipRequest,
  output: CreateRoomMembershipResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRoomMembership",
}));

export type CreateUserError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Creates a user under the specified Amazon Chime account.
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
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUser",
}));

export type DeleteAccountError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Deletes the specified Amazon Chime account. You must suspend all users before deleting
 * `Team` account. You can use the BatchSuspendUser action
 * to dodo.
 *
 * For `EnterpriseLWA` and `EnterpriseAD` accounts, you must release the
 * claimed domains for your Amazon Chime account before deletion. As soon as you release
 * the domain, all users under that account are suspended.
 *
 * Deleted accounts appear in your `Disabled` accounts list for 90 days. To restore
 * deleted account from your `Disabled` accounts list, you must contact AWS
 * Support.
 *
 * After 90 days, deleted accounts are permanently removed from your
 * `Disabled` accounts list.
 */
export const deleteAccount: API.OperationMethod<
  DeleteAccountRequest,
  DeleteAccountResponse,
  DeleteAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAccountRequest,
  output: DeleteAccountResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccount",
}));

export type DeleteEventsConfigurationError =
  | BadRequestException
  | ForbiddenException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Deletes the events configuration that allows a bot to receive outgoing events.
 */
export const deleteEventsConfiguration: API.OperationMethod<
  DeleteEventsConfigurationRequest,
  DeleteEventsConfigurationResponse,
  DeleteEventsConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEventsConfigurationRequest,
  output: DeleteEventsConfigurationResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEventsConfiguration",
}));

export type DeletePhoneNumberError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Moves the specified phone number into the **Deletion queue**. A
 * phone number must be disassociated from any users or Amazon Chime Voice Connectors
 * before it can be deleted.
 *
 * Deleted phone numbers remain in the
 * **Deletion queue**
 * for 7 days before they are deleted permanently.
 */
export const deletePhoneNumber: API.OperationMethod<
  DeletePhoneNumberRequest,
  DeletePhoneNumberResponse,
  DeletePhoneNumberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePhoneNumberRequest,
  output: DeletePhoneNumberResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePhoneNumber",
}));

export type DeleteRoomError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Deletes a chat room in an Amazon Chime Enterprise account.
 */
export const deleteRoom: API.OperationMethod<
  DeleteRoomRequest,
  DeleteRoomResponse,
  DeleteRoomError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRoomRequest,
  output: DeleteRoomResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRoom",
}));

export type DeleteRoomMembershipError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Removes a member from a chat room in an Amazon Chime Enterprise account.
 */
export const deleteRoomMembership: API.OperationMethod<
  DeleteRoomMembershipRequest,
  DeleteRoomMembershipResponse,
  DeleteRoomMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRoomMembershipRequest,
  output: DeleteRoomMembershipResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRoomMembership",
}));

export type DisassociatePhoneNumberFromUserError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Disassociates the primary provisioned phone number from the specified Amazon Chime user.
 */
export const disassociatePhoneNumberFromUser: API.OperationMethod<
  DisassociatePhoneNumberFromUserRequest,
  DisassociatePhoneNumberFromUserResponse,
  DisassociatePhoneNumberFromUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociatePhoneNumberFromUserRequest,
  output: DisassociatePhoneNumberFromUserResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociatePhoneNumberFromUser",
}));

export type DisassociateSigninDelegateGroupsFromAccountError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Disassociates the specified sign-in delegate groups from the specified Amazon Chime account.
 */
export const disassociateSigninDelegateGroupsFromAccount: API.OperationMethod<
  DisassociateSigninDelegateGroupsFromAccountRequest,
  DisassociateSigninDelegateGroupsFromAccountResponse,
  DisassociateSigninDelegateGroupsFromAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateSigninDelegateGroupsFromAccountRequest,
  output: DisassociateSigninDelegateGroupsFromAccountResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateSigninDelegateGroupsFromAccount",
}));

export type GetAccountError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Retrieves details for the specified Amazon Chime account, such as account type and supported
 * licenses.
 */
export const getAccount: API.OperationMethod<
  GetAccountRequest,
  GetAccountResponse,
  GetAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAccountRequest,
  output: GetAccountResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccount",
}));

export type GetAccountSettingsError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Retrieves account settings for the specified Amazon Chime account ID, such as remote control
 * and dialout settings. For more information about these settings, see
 * Use the Policies Page in the *Amazon Chime Administration Guide*.
 */
export const getAccountSettings: API.OperationMethod<
  GetAccountSettingsRequest,
  GetAccountSettingsResponse,
  GetAccountSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAccountSettingsRequest,
  output: GetAccountSettingsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountSettings",
}));

export type GetBotError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Retrieves details for the specified bot, such as bot email address, bot type, status, and display name.
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
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBot",
}));

export type GetEventsConfigurationError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Gets details for an events configuration that allows a bot to receive outgoing events, such as an HTTPS endpoint or Lambda function ARN.
 */
export const getEventsConfiguration: API.OperationMethod<
  GetEventsConfigurationRequest,
  GetEventsConfigurationResponse,
  GetEventsConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEventsConfigurationRequest,
  output: GetEventsConfigurationResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEventsConfiguration",
}));

export type GetGlobalSettingsError =
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Retrieves global settings for the administrator's AWS account, such as Amazon Chime Business
 * Calling and Amazon Chime Voice Connector settings.
 */
export const getGlobalSettings: API.OperationMethod<
  GetGlobalSettingsRequest,
  GetGlobalSettingsResponse,
  GetGlobalSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetGlobalSettingsRequest,
  output: GetGlobalSettingsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGlobalSettings",
}));

export type GetPhoneNumberError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Retrieves details for the specified phone number ID, such as associations, capabilities, and product type.
 */
export const getPhoneNumber: API.OperationMethod<
  GetPhoneNumberRequest,
  GetPhoneNumberResponse,
  GetPhoneNumberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPhoneNumberRequest,
  output: GetPhoneNumberResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPhoneNumber",
}));

export type GetPhoneNumberOrderError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Retrieves details for the specified phone number order, such as the order creation timestamp, phone
 * numbers in E.164 format, product type, and order status.
 */
export const getPhoneNumberOrder: API.OperationMethod<
  GetPhoneNumberOrderRequest,
  GetPhoneNumberOrderResponse,
  GetPhoneNumberOrderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPhoneNumberOrderRequest,
  output: GetPhoneNumberOrderResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPhoneNumberOrder",
}));

export type GetPhoneNumberSettingsError =
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Retrieves the phone number settings for the administrator's AWS account, such as the default outbound calling name.
 */
export const getPhoneNumberSettings: API.OperationMethod<
  GetPhoneNumberSettingsRequest,
  GetPhoneNumberSettingsResponse,
  GetPhoneNumberSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPhoneNumberSettingsRequest,
  output: GetPhoneNumberSettingsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPhoneNumberSettings",
}));

export type GetRetentionSettingsError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Gets the retention settings for the specified Amazon Chime Enterprise account. For more information about retention settings, see
 * Managing Chat Retention Policies in the *Amazon Chime Administration Guide*.
 */
export const getRetentionSettings: API.OperationMethod<
  GetRetentionSettingsRequest,
  GetRetentionSettingsResponse,
  GetRetentionSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRetentionSettingsRequest,
  output: GetRetentionSettingsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRetentionSettings",
}));

export type GetRoomError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Retrieves room details, such as the room name, for a room in an Amazon Chime Enterprise account.
 */
export const getRoom: API.OperationMethod<
  GetRoomRequest,
  GetRoomResponse,
  GetRoomError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRoomRequest,
  output: GetRoomResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRoom",
}));

export type GetUserError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Retrieves details for the specified user ID, such as primary email address, license type,and personal meeting PIN.
 *
 * To retrieve user details with an email address instead of a user ID, use the
 * ListUsers action, and then filter by email address.
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
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUser",
}));

export type GetUserSettingsError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Retrieves settings for the specified user ID, such as any associated phone number settings.
 */
export const getUserSettings: API.OperationMethod<
  GetUserSettingsRequest,
  GetUserSettingsResponse,
  GetUserSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetUserSettingsRequest,
  output: GetUserSettingsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUserSettings",
}));

export type InviteUsersError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Sends email to a maximum of 50 users, inviting them to the specified Amazon Chime
 * `Team` account. Only `Team` account types are currently
 * supported for this action.
 */
export const inviteUsers: API.OperationMethod<
  InviteUsersRequest,
  InviteUsersResponse,
  InviteUsersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: InviteUsersRequest,
  output: InviteUsersResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InviteUsers",
}));

export type ListAccountsError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Lists the Amazon Chime accounts under the administrator's AWS account. You can filter accounts
 * by account name prefix. To find out which Amazon Chime account a user belongs to, you can
 * filter by the user's email address, which returns one account result.
 */
export const listAccounts: API.PaginatedOperationMethod<
  ListAccountsRequest,
  ListAccountsResponse,
  ListAccountsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAccountsRequest,
  output: ListAccountsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccounts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListBotsError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Lists the bots associated with the administrator's Amazon Chime Enterprise account ID.
 */
export const listBots: API.PaginatedOperationMethod<
  ListBotsRequest,
  ListBotsResponse,
  ListBotsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListBotsRequest,
  output: ListBotsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBots",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPhoneNumberOrdersError =
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Lists the phone number orders for the administrator's Amazon Chime account.
 */
export const listPhoneNumberOrders: API.PaginatedOperationMethod<
  ListPhoneNumberOrdersRequest,
  ListPhoneNumberOrdersResponse,
  ListPhoneNumberOrdersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPhoneNumberOrdersRequest,
  output: ListPhoneNumberOrdersResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPhoneNumberOrders",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPhoneNumbersError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Lists the phone numbers for the specified Amazon Chime account, Amazon Chime user, Amazon Chime Voice Connector, or Amazon Chime Voice Connector group.
 */
export const listPhoneNumbers: API.PaginatedOperationMethod<
  ListPhoneNumbersRequest,
  ListPhoneNumbersResponse,
  ListPhoneNumbersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPhoneNumbersRequest,
  output: ListPhoneNumbersResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPhoneNumbers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRoomMembershipsError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Lists the membership details for the specified room in an Amazon Chime Enterprise account,
 * such as the members' IDs, email addresses, and names.
 */
export const listRoomMemberships: API.PaginatedOperationMethod<
  ListRoomMembershipsRequest,
  ListRoomMembershipsResponse,
  ListRoomMembershipsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRoomMembershipsRequest,
  output: ListRoomMembershipsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRoomMemberships",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRoomsError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Lists the room details for the specified Amazon Chime Enterprise account. Optionally, filter the results by a member ID (user ID or bot ID) to see a list of rooms that the member belongs to.
 */
export const listRooms: API.PaginatedOperationMethod<
  ListRoomsRequest,
  ListRoomsResponse,
  ListRoomsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRoomsRequest,
  output: ListRoomsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRooms",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSupportedPhoneNumberCountriesError =
  | AccessDeniedException
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Lists supported phone number countries.
 */
export const listSupportedPhoneNumberCountries: API.OperationMethod<
  ListSupportedPhoneNumberCountriesRequest,
  ListSupportedPhoneNumberCountriesResponse,
  ListSupportedPhoneNumberCountriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListSupportedPhoneNumberCountriesRequest,
  output: ListSupportedPhoneNumberCountriesResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSupportedPhoneNumberCountries",
}));

export type ListUsersError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Lists the users that belong to the specified Amazon Chime account. You can specify an email
 * address to list only the user that the email address belongs to.
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
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
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

export type LogoutUserError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Logs out the specified user from all of the devices they are currently logged into.
 */
export const logoutUser: API.OperationMethod<
  LogoutUserRequest,
  LogoutUserResponse,
  LogoutUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: LogoutUserRequest,
  output: LogoutUserResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "LogoutUser",
}));

export type PutEventsConfigurationError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Creates an events configuration that allows a bot to receive outgoing events sent by Amazon
 * Chime. Choose either an HTTPS endpoint or a Lambda function ARN. For more information,
 * see Bot.
 */
export const putEventsConfiguration: API.OperationMethod<
  PutEventsConfigurationRequest,
  PutEventsConfigurationResponse,
  PutEventsConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutEventsConfigurationRequest,
  output: PutEventsConfigurationResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutEventsConfiguration",
}));

export type PutRetentionSettingsError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Puts retention settings for the specified Amazon Chime Enterprise account. We recommend using AWS CloudTrail to monitor usage of this API for your account. For more information, see
 * Logging Amazon Chime API Calls with AWS CloudTrail
 * in the *Amazon Chime Administration Guide*.
 *
 * To turn off existing retention settings, remove the number of days from the corresponding
 * **RetentionDays**
 * field in the
 * **RetentionSettings**
 * object. For more information about retention settings, see
 * Managing Chat Retention Policies
 * in the *Amazon Chime Administration Guide*.
 */
export const putRetentionSettings: API.OperationMethod<
  PutRetentionSettingsRequest,
  PutRetentionSettingsResponse,
  PutRetentionSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutRetentionSettingsRequest,
  output: PutRetentionSettingsResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutRetentionSettings",
}));

export type RedactConversationMessageError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Redacts the specified message from the specified Amazon Chime conversation.
 */
export const redactConversationMessage: API.OperationMethod<
  RedactConversationMessageRequest,
  RedactConversationMessageResponse,
  RedactConversationMessageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RedactConversationMessageRequest,
  output: RedactConversationMessageResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RedactConversationMessage",
}));

export type RedactRoomMessageError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Redacts the specified message from the specified Amazon Chime channel.
 */
export const redactRoomMessage: API.OperationMethod<
  RedactRoomMessageRequest,
  RedactRoomMessageResponse,
  RedactRoomMessageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RedactRoomMessageRequest,
  output: RedactRoomMessageResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RedactRoomMessage",
}));

export type RegenerateSecurityTokenError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Regenerates the security token for a bot.
 */
export const regenerateSecurityToken: API.OperationMethod<
  RegenerateSecurityTokenRequest,
  RegenerateSecurityTokenResponse,
  RegenerateSecurityTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegenerateSecurityTokenRequest,
  output: RegenerateSecurityTokenResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegenerateSecurityToken",
}));

export type ResetPersonalPINError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Resets the personal meeting PIN for the specified user on an Amazon Chime account. Returns
 * the User object with the updated personal meeting PIN.
 */
export const resetPersonalPIN: API.OperationMethod<
  ResetPersonalPINRequest,
  ResetPersonalPINResponse,
  ResetPersonalPINError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ResetPersonalPINRequest,
  output: ResetPersonalPINResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResetPersonalPIN",
}));

export type RestorePhoneNumberError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Moves a phone number from the **Deletion queue** back into the
 * phone number **Inventory**.
 */
export const restorePhoneNumber: API.OperationMethod<
  RestorePhoneNumberRequest,
  RestorePhoneNumberResponse,
  RestorePhoneNumberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RestorePhoneNumberRequest,
  output: RestorePhoneNumberResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestorePhoneNumber",
}));

export type SearchAvailablePhoneNumbersError =
  | AccessDeniedException
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Searches for phone numbers that can be ordered. For US numbers, provide at least one of
 * the following search filters: `AreaCode`, `City`,
 * `State`, or `TollFreePrefix`. If you provide
 * `City`, you must also provide `State`. Numbers outside the US only
 * support the `PhoneNumberType` filter, which you must use.
 */
export const searchAvailablePhoneNumbers: API.PaginatedOperationMethod<
  SearchAvailablePhoneNumbersRequest,
  SearchAvailablePhoneNumbersResponse,
  SearchAvailablePhoneNumbersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: SearchAvailablePhoneNumbersRequest,
  output: SearchAvailablePhoneNumbersResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchAvailablePhoneNumbers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type UpdateAccountError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Updates account details for the specified Amazon Chime account. Currently, only account name and default license updates are supported for this action.
 */
export const updateAccount: API.OperationMethod<
  UpdateAccountRequest,
  UpdateAccountResponse,
  UpdateAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAccountRequest,
  output: UpdateAccountResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAccount",
}));

export type UpdateAccountSettingsError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Updates the settings for the specified Amazon Chime account. You can update settings for
 * remote control of shared screens, or for the dial-out option. For more information about
 * these settings, see Use
 * the Policies Page in the Amazon Chime Administration
 * Guide.
 */
export const updateAccountSettings: API.OperationMethod<
  UpdateAccountSettingsRequest,
  UpdateAccountSettingsResponse,
  UpdateAccountSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAccountSettingsRequest,
  output: UpdateAccountSettingsResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAccountSettings",
}));

export type UpdateBotError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Updates the status of the specified bot, such as starting or stopping the bot from running in your Amazon Chime Enterprise account.
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
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBot",
}));

export type UpdateGlobalSettingsError =
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Updates global settings for the administrator's AWS account, such as Amazon Chime Business Calling and Amazon Chime Voice Connector settings.
 */
export const updateGlobalSettings: API.OperationMethod<
  UpdateGlobalSettingsRequest,
  UpdateGlobalSettingsResponse,
  UpdateGlobalSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateGlobalSettingsRequest,
  output: UpdateGlobalSettingsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGlobalSettings",
}));

export type UpdatePhoneNumberError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Updates phone number details, such as product type or calling name, for the specified phone number ID. You can update one phone number detail at a time. For example, you can update either the product type or the calling name in one action.
 *
 * For toll-free numbers, you cannot use the Amazon Chime Business Calling product type. For numbers outside the U.S., you must use the Amazon Chime SIP Media Application Dial-In product type.
 *
 * Updates to outbound calling names can take 72 hours to complete. Pending updates to outbound calling names must be complete before you can request another update.
 */
export const updatePhoneNumber: API.OperationMethod<
  UpdatePhoneNumberRequest,
  UpdatePhoneNumberResponse,
  UpdatePhoneNumberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePhoneNumberRequest,
  output: UpdatePhoneNumberResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePhoneNumber",
}));

export type UpdatePhoneNumberSettingsError =
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Updates the phone number settings for the administrator's AWS account, such as the default
 * outbound calling name. You can update the default outbound calling name once every seven
 * days. Outbound calling names can take up to 72 hours to update.
 */
export const updatePhoneNumberSettings: API.OperationMethod<
  UpdatePhoneNumberSettingsRequest,
  UpdatePhoneNumberSettingsResponse,
  UpdatePhoneNumberSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePhoneNumberSettingsRequest,
  output: UpdatePhoneNumberSettingsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePhoneNumberSettings",
}));

export type UpdateRoomError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Updates room details, such as the room name, for a room in an Amazon Chime Enterprise account.
 */
export const updateRoom: API.OperationMethod<
  UpdateRoomRequest,
  UpdateRoomResponse,
  UpdateRoomError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRoomRequest,
  output: UpdateRoomResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRoom",
}));

export type UpdateRoomMembershipError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Updates room membership details, such as the member role, for a room in an Amazon Chime
 * Enterprise account. The member role designates whether the member is a chat room
 * administrator or a general chat room member. The member role can be updated only for
 * user IDs.
 */
export const updateRoomMembership: API.OperationMethod<
  UpdateRoomMembershipRequest,
  UpdateRoomMembershipResponse,
  UpdateRoomMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRoomMembershipRequest,
  output: UpdateRoomMembershipResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRoomMembership",
}));

export type UpdateUserError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Updates user details for a specified user ID. Currently, only `LicenseType` updates are supported for this action.
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
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUser",
}));

export type UpdateUserSettingsError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Updates the settings for the specified user, such as phone number settings.
 */
export const updateUserSettings: API.OperationMethod<
  UpdateUserSettingsRequest,
  UpdateUserSettingsResponse,
  UpdateUserSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateUserSettingsRequest,
  output: UpdateUserSettingsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUserSettings",
}));
