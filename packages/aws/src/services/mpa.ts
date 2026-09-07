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
  sdkId: "MPA",
  serviceShapeName: "AWSFluffyCoreService",
});
const auth = T.AwsAuthSigv4({ name: "mpa" });
const ver = T.ServiceVersion("2022-07-26");
const proto = T.AwsProtocolsRestJson1();
const rules = T.EndpointResolver((p, _) => {
  const { UseFIPS = false, Endpoint, Region } = p;
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
    return e(Endpoint);
  }
  if (Region != null) {
    {
      const PartitionResult = _.partition(Region);
      if (PartitionResult != null && PartitionResult !== false) {
        if (UseFIPS === true) {
          return e(
            `https://mpa-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        return e(
          `https://mpa.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
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
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(T.HttpError(500), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class InvalidParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterException>()(
    "InvalidParameterException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      ResourceName: S.optional(S.String),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type SessionArn = string;
export interface CancelSessionRequest {
  SessionArn: string;
}
export const CancelSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SessionArn: S.String.pipe(T.HttpLabel("SessionArn")) }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/sessions/{SessionArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelSessionRequest",
}) as any as S.Schema<CancelSessionRequest>;
export interface CancelSessionResponse {}
export const CancelSessionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CancelSessionResponse",
}) as any as S.Schema<CancelSessionResponse>;
export type Token = string;
export interface MofNApprovalStrategy {
  MinApprovalsRequired: number;
}
export const MofNApprovalStrategy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MinApprovalsRequired: S.Number }),
).annotate({
  identifier: "MofNApprovalStrategy",
}) as any as S.Schema<MofNApprovalStrategy>;
export type ApprovalStrategy = { MofN: MofNApprovalStrategy };
export const ApprovalStrategy = /*@__PURE__*/ S.Union([
  S.Struct({ MofN: MofNApprovalStrategy }),
]);
export type IdentityId = string;
export interface ApprovalTeamRequestApprover {
  PrimaryIdentityId: string;
  PrimaryIdentitySourceArn: string;
}
export const ApprovalTeamRequestApprover = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PrimaryIdentityId: S.String, PrimaryIdentitySourceArn: S.String }),
).annotate({
  identifier: "ApprovalTeamRequestApprover",
}) as any as S.Schema<ApprovalTeamRequestApprover>;
export type ApprovalTeamRequestApprovers = ApprovalTeamRequestApprover[];
export const ApprovalTeamRequestApprovers = /*@__PURE__*/ S.Array(
  ApprovalTeamRequestApprover,
);
export type Description = string | redacted.Redacted<string>;
export type QualifiedPolicyArn = string;
export interface PolicyReference {
  PolicyArn: string;
}
export const PolicyReference = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PolicyArn: S.String }),
).annotate({
  identifier: "PolicyReference",
}) as any as S.Schema<PolicyReference>;
export type PoliciesReferences = PolicyReference[];
export const PoliciesReferences = /*@__PURE__*/ S.Array(PolicyReference);
export type ApprovalTeamName = string;
export type TagKey = string | redacted.Redacted<string>;
export type TagValue = string | redacted.Redacted<string>;
export type Tags = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export const Tags = /*@__PURE__*/ S.Record(
  S.String,
  SensitiveString.pipe(S.optional),
);
export interface CreateApprovalTeamRequest {
  ClientToken?: string;
  ApprovalStrategy: ApprovalStrategy;
  Approvers: ApprovalTeamRequestApprover[];
  Description: string | redacted.Redacted<string>;
  Policies: PolicyReference[];
  Name: string;
  Tags?: { [key: string]: string | redacted.Redacted<string> | undefined };
}
export const CreateApprovalTeamRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    ApprovalStrategy: ApprovalStrategy,
    Approvers: ApprovalTeamRequestApprovers,
    Description: SensitiveString,
    Policies: PoliciesReferences,
    Name: S.String,
    Tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/approval-teams" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateApprovalTeamRequest",
}) as any as S.Schema<CreateApprovalTeamRequest>;
export type IsoTimestamp = Date;
export type ApprovalTeamArn = string;
export interface CreateApprovalTeamResponse {
  CreationTime?: Date;
  Arn?: string;
  Name?: string;
  VersionId?: string;
}
export const CreateApprovalTeamResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Arn: S.optional(S.String),
    Name: S.optional(S.String),
    VersionId: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateApprovalTeamResponse",
}) as any as S.Schema<CreateApprovalTeamResponse>;
export type IdcInstanceArn = string;
export interface IamIdentityCenter {
  InstanceArn: string;
  Region: string;
}
export const IamIdentityCenter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InstanceArn: S.String, Region: S.String }),
).annotate({
  identifier: "IamIdentityCenter",
}) as any as S.Schema<IamIdentityCenter>;
export interface IdentitySourceParameters {
  IamIdentityCenter?: IamIdentityCenter;
}
export const IdentitySourceParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IamIdentityCenter: S.optional(IamIdentityCenter) }),
).annotate({
  identifier: "IdentitySourceParameters",
}) as any as S.Schema<IdentitySourceParameters>;
export interface CreateIdentitySourceRequest {
  IdentitySourceParameters: IdentitySourceParameters;
  ClientToken?: string;
  Tags?: { [key: string]: string | redacted.Redacted<string> | undefined };
}
export const CreateIdentitySourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IdentitySourceParameters: IdentitySourceParameters,
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    Tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/identity-sources" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateIdentitySourceRequest",
}) as any as S.Schema<CreateIdentitySourceRequest>;
export type IdentitySourceType = "IAM_IDENTITY_CENTER" | (string & {});
export const IdentitySourceType = /*@__PURE__*/ S.String;

export interface CreateIdentitySourceResponse {
  IdentitySourceType?: IdentitySourceType;
  IdentitySourceArn?: string;
  CreationTime?: Date;
}
export const CreateIdentitySourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IdentitySourceType: S.optional(IdentitySourceType),
    IdentitySourceArn: S.optional(S.String),
    CreationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "CreateIdentitySourceResponse",
}) as any as S.Schema<CreateIdentitySourceResponse>;
export interface DeleteIdentitySourceRequest {
  IdentitySourceArn: string;
}
export const DeleteIdentitySourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IdentitySourceArn: S.String.pipe(T.HttpLabel("IdentitySourceArn")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/identity-sources/{IdentitySourceArn}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteIdentitySourceRequest",
}) as any as S.Schema<DeleteIdentitySourceRequest>;
export interface DeleteIdentitySourceResponse {}
export const DeleteIdentitySourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteIdentitySourceResponse",
}) as any as S.Schema<DeleteIdentitySourceResponse>;
export interface DeleteInactiveApprovalTeamVersionRequest {
  Arn: string;
  VersionId: string;
}
export const DeleteInactiveApprovalTeamVersionRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Arn: S.String.pipe(T.HttpLabel("Arn")),
      VersionId: S.String.pipe(T.HttpLabel("VersionId")),
    }).pipe(
      T.all(
        T.Http({ method: "DELETE", uri: "/approval-teams/{Arn}/{VersionId}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteInactiveApprovalTeamVersionRequest",
}) as any as S.Schema<DeleteInactiveApprovalTeamVersionRequest>;
export interface DeleteInactiveApprovalTeamVersionResponse {}
export const DeleteInactiveApprovalTeamVersionResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "DeleteInactiveApprovalTeamVersionResponse",
  }) as any as S.Schema<DeleteInactiveApprovalTeamVersionResponse>;
export interface GetApprovalTeamRequest {
  Arn: string;
}
export const GetApprovalTeamRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/approval-teams/{Arn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetApprovalTeamRequest",
}) as any as S.Schema<GetApprovalTeamRequest>;
export type ApprovalStrategyResponse = { MofN: MofNApprovalStrategy };
export const ApprovalStrategyResponse = /*@__PURE__*/ S.Union([
  S.Struct({ MofN: MofNApprovalStrategy }),
]);
export type ParticipantId = string;
export type IdentityStatus =
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | "INVALID"
  | (string & {});
export const IdentityStatus = /*@__PURE__*/ S.String;

export type ApproverLastActivity =
  | "VOTED"
  | "BASELINED"
  | "RESPONDED_TO_INVITATION"
  | (string & {});
export const ApproverLastActivity = /*@__PURE__*/ S.String;

export type MfaType = "EMAIL_OTP" | (string & {});
export const MfaType = /*@__PURE__*/ S.String;

export type MfaSyncStatus = "IN_SYNC" | "OUT_OF_SYNC" | (string & {});
export const MfaSyncStatus = /*@__PURE__*/ S.String;

export interface MfaMethod {
  Type: MfaType;
  SyncStatus: MfaSyncStatus;
}
export const MfaMethod = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Type: MfaType, SyncStatus: MfaSyncStatus }),
).annotate({ identifier: "MfaMethod" }) as any as S.Schema<MfaMethod>;
export type MfaMethods = MfaMethod[];
export const MfaMethods = /*@__PURE__*/ S.Array(MfaMethod);
export interface GetApprovalTeamResponseApprover {
  ApproverId?: string;
  ResponseTime?: Date;
  PrimaryIdentityId?: string;
  PrimaryIdentitySourceArn?: string;
  PrimaryIdentityStatus?: IdentityStatus;
  LastActivity?: ApproverLastActivity;
  LastActivityTime?: Date;
  PendingBaselineSessionArn?: string;
  MfaMethods?: MfaMethod[];
}
export const GetApprovalTeamResponseApprover = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApproverId: S.optional(S.String),
    ResponseTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    PrimaryIdentityId: S.optional(S.String),
    PrimaryIdentitySourceArn: S.optional(S.String),
    PrimaryIdentityStatus: S.optional(IdentityStatus),
    LastActivity: S.optional(ApproverLastActivity),
    LastActivityTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    PendingBaselineSessionArn: S.optional(S.String),
    MfaMethods: S.optional(MfaMethods),
  }),
).annotate({
  identifier: "GetApprovalTeamResponseApprover",
}) as any as S.Schema<GetApprovalTeamResponseApprover>;
export type GetApprovalTeamResponseApprovers =
  GetApprovalTeamResponseApprover[];
export const GetApprovalTeamResponseApprovers = /*@__PURE__*/ S.Array(
  GetApprovalTeamResponseApprover,
);
export type ApprovalTeamStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "DELETING"
  | "PENDING"
  | (string & {});
export const ApprovalTeamStatus = /*@__PURE__*/ S.String;

export type ApprovalTeamStatusCode =
  | "VALIDATING"
  | "PENDING_ACTIVATION"
  | "FAILED_VALIDATION"
  | "FAILED_ACTIVATION"
  | "UPDATE_PENDING_APPROVAL"
  | "UPDATE_PENDING_ACTIVATION"
  | "UPDATE_FAILED_APPROVAL"
  | "UPDATE_FAILED_ACTIVATION"
  | "UPDATE_FAILED_VALIDATION"
  | "DELETE_PENDING_APPROVAL"
  | "DELETE_FAILED_APPROVAL"
  | "DELETE_FAILED_VALIDATION"
  | (string & {});
export const ApprovalTeamStatusCode = /*@__PURE__*/ S.String;

export type Message = string;
export interface PendingUpdate {
  VersionId?: string;
  Description?: string;
  ApprovalStrategy?: ApprovalStrategyResponse;
  NumberOfApprovers?: number;
  Status?: ApprovalTeamStatus;
  StatusCode?: ApprovalTeamStatusCode;
  StatusMessage?: string;
  Approvers?: GetApprovalTeamResponseApprover[];
  UpdateInitiationTime?: Date;
}
export const PendingUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VersionId: S.optional(S.String),
    Description: S.optional(S.String),
    ApprovalStrategy: S.optional(ApprovalStrategyResponse),
    NumberOfApprovers: S.optional(S.Number),
    Status: S.optional(ApprovalTeamStatus),
    StatusCode: S.optional(ApprovalTeamStatusCode),
    StatusMessage: S.optional(S.String),
    Approvers: S.optional(GetApprovalTeamResponseApprovers),
    UpdateInitiationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({ identifier: "PendingUpdate" }) as any as S.Schema<PendingUpdate>;
export interface GetApprovalTeamResponse {
  CreationTime?: Date;
  ApprovalStrategy?: ApprovalStrategyResponse;
  NumberOfApprovers?: number;
  Approvers?: GetApprovalTeamResponseApprover[];
  Arn?: string;
  Description?: string | redacted.Redacted<string>;
  Name?: string;
  Status?: ApprovalTeamStatus;
  StatusCode?: ApprovalTeamStatusCode;
  StatusMessage?: string;
  UpdateSessionArn?: string;
  VersionId?: string;
  Policies?: PolicyReference[];
  LastUpdateTime?: Date;
  PendingUpdate?: PendingUpdate;
}
export const GetApprovalTeamResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ApprovalStrategy: S.optional(ApprovalStrategyResponse),
    NumberOfApprovers: S.optional(S.Number),
    Approvers: S.optional(GetApprovalTeamResponseApprovers),
    Arn: S.optional(S.String),
    Description: S.optional(SensitiveString),
    Name: S.optional(S.String),
    Status: S.optional(ApprovalTeamStatus),
    StatusCode: S.optional(ApprovalTeamStatusCode),
    StatusMessage: S.optional(S.String),
    UpdateSessionArn: S.optional(S.String),
    VersionId: S.optional(S.String),
    Policies: S.optional(PoliciesReferences),
    LastUpdateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    PendingUpdate: S.optional(PendingUpdate),
  }),
).annotate({
  identifier: "GetApprovalTeamResponse",
}) as any as S.Schema<GetApprovalTeamResponse>;
export interface GetIdentitySourceRequest {
  IdentitySourceArn: string;
}
export const GetIdentitySourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IdentitySourceArn: S.String.pipe(T.HttpLabel("IdentitySourceArn")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/identity-sources/{IdentitySourceArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetIdentitySourceRequest",
}) as any as S.Schema<GetIdentitySourceRequest>;
export interface IamIdentityCenterForGet {
  InstanceArn?: string;
  ApprovalPortalUrl?: string;
  Region?: string;
}
export const IamIdentityCenterForGet = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstanceArn: S.optional(S.String),
    ApprovalPortalUrl: S.optional(S.String),
    Region: S.optional(S.String),
  }),
).annotate({
  identifier: "IamIdentityCenterForGet",
}) as any as S.Schema<IamIdentityCenterForGet>;
export type IdentitySourceParametersForGet = {
  IamIdentityCenter: IamIdentityCenterForGet;
};
export const IdentitySourceParametersForGet = /*@__PURE__*/ S.Union([
  S.Struct({ IamIdentityCenter: IamIdentityCenterForGet }),
]);
export type IdentitySourceStatus =
  | "CREATING"
  | "ACTIVE"
  | "DELETING"
  | "ERROR"
  | (string & {});
export const IdentitySourceStatus = /*@__PURE__*/ S.String;

export type IdentitySourceStatusCode =
  | "ACCESS_DENIED"
  | "DELETION_FAILED"
  | "IDC_INSTANCE_NOT_FOUND"
  | "IDC_INSTANCE_NOT_VALID"
  | (string & {});
export const IdentitySourceStatusCode = /*@__PURE__*/ S.String;

export interface GetIdentitySourceResponse {
  IdentitySourceType?: IdentitySourceType;
  IdentitySourceParameters?: IdentitySourceParametersForGet;
  IdentitySourceArn?: string;
  CreationTime?: Date;
  Status?: IdentitySourceStatus;
  StatusCode?: IdentitySourceStatusCode;
  StatusMessage?: string;
}
export const GetIdentitySourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IdentitySourceType: S.optional(IdentitySourceType),
    IdentitySourceParameters: S.optional(IdentitySourceParametersForGet),
    IdentitySourceArn: S.optional(S.String),
    CreationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Status: S.optional(IdentitySourceStatus),
    StatusCode: S.optional(IdentitySourceStatusCode),
    StatusMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "GetIdentitySourceResponse",
}) as any as S.Schema<GetIdentitySourceResponse>;
export interface GetPolicyVersionRequest {
  PolicyVersionArn: string;
}
export const GetPolicyVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PolicyVersionArn: S.String.pipe(T.HttpLabel("PolicyVersionArn")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/policy-versions/{PolicyVersionArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPolicyVersionRequest",
}) as any as S.Schema<GetPolicyVersionRequest>;
export type UnqualifiedPolicyArn = string;
export type PolicyVersionId = number;
export type PolicyType = "AWS_MANAGED" | "AWS_RAM" | (string & {});
export const PolicyType = /*@__PURE__*/ S.String;

export type PolicyName = string;
export type PolicyStatus = "ATTACHABLE" | "DEPRECATED" | (string & {});
export const PolicyStatus = /*@__PURE__*/ S.String;

export type PolicyDocument = string | redacted.Redacted<string>;
export interface PolicyVersion {
  Arn: string;
  PolicyArn: string;
  VersionId: number;
  PolicyType: PolicyType;
  IsDefault: boolean;
  Name: string;
  Status: PolicyStatus;
  CreationTime: Date;
  LastUpdatedTime: Date;
  Document: string | redacted.Redacted<string>;
}
export const PolicyVersion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    PolicyArn: S.String,
    VersionId: S.Number,
    PolicyType: PolicyType,
    IsDefault: S.Boolean,
    Name: S.String,
    Status: PolicyStatus,
    CreationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    LastUpdatedTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    Document: SensitiveString,
  }),
).annotate({ identifier: "PolicyVersion" }) as any as S.Schema<PolicyVersion>;
export interface GetPolicyVersionResponse {
  PolicyVersion: PolicyVersion;
}
export const GetPolicyVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PolicyVersion: PolicyVersion }),
).annotate({
  identifier: "GetPolicyVersionResponse",
}) as any as S.Schema<GetPolicyVersionResponse>;
export interface GetResourcePolicyRequest {
  ResourceArn: string;
  PolicyName: string;
  PolicyType: PolicyType;
}
export const GetResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String,
    PolicyName: S.String,
    PolicyType: PolicyType,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetResourcePolicy" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetResourcePolicyRequest",
}) as any as S.Schema<GetResourcePolicyRequest>;
export interface GetResourcePolicyResponse {
  ResourceArn: string;
  PolicyType: PolicyType;
  PolicyVersionArn?: string;
  PolicyName: string;
  PolicyDocument: string | redacted.Redacted<string>;
}
export const GetResourcePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String,
    PolicyType: PolicyType,
    PolicyVersionArn: S.optional(S.String),
    PolicyName: S.String,
    PolicyDocument: SensitiveString,
  }),
).annotate({
  identifier: "GetResourcePolicyResponse",
}) as any as S.Schema<GetResourcePolicyResponse>;
export interface GetSessionRequest {
  SessionArn: string;
}
export const GetSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SessionArn: S.String.pipe(T.HttpLabel("SessionArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/sessions/{SessionArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSessionRequest",
}) as any as S.Schema<GetSessionRequest>;
export type SessionKey = string | redacted.Redacted<string>;
export type SessionValue = string | redacted.Redacted<string>;
export type SessionMetadata = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export const SessionMetadata = /*@__PURE__*/ S.Record(
  S.String,
  SensitiveString.pipe(S.optional),
);
export type SessionStatus =
  | "PENDING"
  | "CANCELLED"
  | "APPROVED"
  | "FAILED"
  | "CREATING"
  | (string & {});
export const SessionStatus = /*@__PURE__*/ S.String;

export type SessionStatusCode =
  | "REJECTED"
  | "EXPIRED"
  | "CONFIGURATION_CHANGED"
  | "ALL_APPROVERS_IN_SESSION"
  | (string & {});
export const SessionStatusCode = /*@__PURE__*/ S.String;

export type SessionExecutionStatus =
  | "EXECUTED"
  | "FAILED"
  | "PENDING"
  | (string & {});
export const SessionExecutionStatus = /*@__PURE__*/ S.String;

export type ActionName = string;
export type ServicePrincipal = string;
export type AccountId = string;
export type Region = string;
export type RequesterComment = string | redacted.Redacted<string>;
export type ActionCompletionStrategy =
  | "AUTO_COMPLETION_UPON_APPROVAL"
  | (string & {});
export const ActionCompletionStrategy = /*@__PURE__*/ S.String;

export type SessionResponse =
  | "APPROVED"
  | "REJECTED"
  | "NO_RESPONSE"
  | (string & {});
export const SessionResponse = /*@__PURE__*/ S.String;

export interface GetSessionResponseApproverResponse {
  ApproverId?: string;
  IdentitySourceArn?: string;
  IdentityId?: string;
  Response?: SessionResponse;
  ResponseTime?: Date;
}
export const GetSessionResponseApproverResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApproverId: S.optional(S.String),
    IdentitySourceArn: S.optional(S.String),
    IdentityId: S.optional(S.String),
    Response: S.optional(SessionResponse),
    ResponseTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "GetSessionResponseApproverResponse",
}) as any as S.Schema<GetSessionResponseApproverResponse>;
export type GetSessionResponseApproverResponses =
  GetSessionResponseApproverResponse[];
export const GetSessionResponseApproverResponses = /*@__PURE__*/ S.Array(
  GetSessionResponseApproverResponse,
);
export type AdditionalSecurityRequirement =
  | "APPROVER_VERIFICATION_REQUIRED"
  | (string & {});
export const AdditionalSecurityRequirement = /*@__PURE__*/ S.String;

export type AdditionalSecurityRequirements = AdditionalSecurityRequirement[];
export const AdditionalSecurityRequirements = /*@__PURE__*/ S.Array(
  AdditionalSecurityRequirement,
);
export interface GetSessionResponse {
  SessionArn?: string;
  ApprovalTeamArn?: string;
  ApprovalTeamName?: string;
  ProtectedResourceArn?: string;
  ApprovalStrategy?: ApprovalStrategyResponse;
  NumberOfApprovers?: number;
  InitiationTime?: Date;
  ExpirationTime?: Date;
  CompletionTime?: Date;
  Description?: string | redacted.Redacted<string>;
  Metadata?: { [key: string]: string | redacted.Redacted<string> | undefined };
  Status?: SessionStatus;
  StatusCode?: SessionStatusCode;
  StatusMessage?: string;
  ExecutionStatus?: SessionExecutionStatus;
  ActionName?: string;
  RequesterServicePrincipal?: string;
  RequesterPrincipalArn?: string;
  RequesterAccountId?: string;
  RequesterRegion?: string;
  RequesterComment?: string | redacted.Redacted<string>;
  ActionCompletionStrategy?: ActionCompletionStrategy;
  ApproverResponses?: GetSessionResponseApproverResponse[];
  AdditionalSecurityRequirements?: AdditionalSecurityRequirement[];
}
export const GetSessionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SessionArn: S.optional(S.String),
    ApprovalTeamArn: S.optional(S.String),
    ApprovalTeamName: S.optional(S.String),
    ProtectedResourceArn: S.optional(S.String),
    ApprovalStrategy: S.optional(ApprovalStrategyResponse),
    NumberOfApprovers: S.optional(S.Number),
    InitiationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ExpirationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    CompletionTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Description: S.optional(SensitiveString),
    Metadata: S.optional(SessionMetadata),
    Status: S.optional(SessionStatus),
    StatusCode: S.optional(SessionStatusCode),
    StatusMessage: S.optional(S.String),
    ExecutionStatus: S.optional(SessionExecutionStatus),
    ActionName: S.optional(S.String),
    RequesterServicePrincipal: S.optional(S.String),
    RequesterPrincipalArn: S.optional(S.String),
    RequesterAccountId: S.optional(S.String),
    RequesterRegion: S.optional(S.String),
    RequesterComment: S.optional(SensitiveString),
    ActionCompletionStrategy: S.optional(ActionCompletionStrategy),
    ApproverResponses: S.optional(GetSessionResponseApproverResponses),
    AdditionalSecurityRequirements: S.optional(AdditionalSecurityRequirements),
  }),
).annotate({
  identifier: "GetSessionResponse",
}) as any as S.Schema<GetSessionResponse>;
export type MaxResults = number;
export interface ListApprovalTeamsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListApprovalTeamsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/approval-teams/?List" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListApprovalTeamsRequest",
}) as any as S.Schema<ListApprovalTeamsRequest>;
export interface ListApprovalTeamsResponseApprovalTeam {
  CreationTime?: Date;
  ApprovalStrategy?: ApprovalStrategyResponse;
  NumberOfApprovers?: number;
  Arn?: string;
  Name?: string;
  Description?: string | redacted.Redacted<string>;
  Status?: ApprovalTeamStatus;
  StatusCode?: ApprovalTeamStatusCode;
  StatusMessage?: string;
}
export const ListApprovalTeamsResponseApprovalTeam = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      CreationTime: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      ApprovalStrategy: S.optional(ApprovalStrategyResponse),
      NumberOfApprovers: S.optional(S.Number),
      Arn: S.optional(S.String),
      Name: S.optional(S.String),
      Description: S.optional(SensitiveString),
      Status: S.optional(ApprovalTeamStatus),
      StatusCode: S.optional(ApprovalTeamStatusCode),
      StatusMessage: S.optional(S.String),
    }),
).annotate({
  identifier: "ListApprovalTeamsResponseApprovalTeam",
}) as any as S.Schema<ListApprovalTeamsResponseApprovalTeam>;
export type ListApprovalTeamsResponseApprovalTeams =
  ListApprovalTeamsResponseApprovalTeam[];
export const ListApprovalTeamsResponseApprovalTeams = /*@__PURE__*/ S.Array(
  ListApprovalTeamsResponseApprovalTeam,
);
export interface ListApprovalTeamsResponse {
  NextToken?: string;
  ApprovalTeams?: ListApprovalTeamsResponseApprovalTeam[];
}
export const ListApprovalTeamsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    ApprovalTeams: S.optional(ListApprovalTeamsResponseApprovalTeams),
  }),
).annotate({
  identifier: "ListApprovalTeamsResponse",
}) as any as S.Schema<ListApprovalTeamsResponse>;
export interface ListIdentitySourcesRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListIdentitySourcesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/identity-sources/?List" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListIdentitySourcesRequest",
}) as any as S.Schema<ListIdentitySourcesRequest>;
export interface IamIdentityCenterForList {
  InstanceArn?: string;
  ApprovalPortalUrl?: string;
  Region?: string;
}
export const IamIdentityCenterForList = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstanceArn: S.optional(S.String),
    ApprovalPortalUrl: S.optional(S.String),
    Region: S.optional(S.String),
  }),
).annotate({
  identifier: "IamIdentityCenterForList",
}) as any as S.Schema<IamIdentityCenterForList>;
export type IdentitySourceParametersForList = {
  IamIdentityCenter: IamIdentityCenterForList;
};
export const IdentitySourceParametersForList = /*@__PURE__*/ S.Union([
  S.Struct({ IamIdentityCenter: IamIdentityCenterForList }),
]);
export interface IdentitySourceForList {
  IdentitySourceType?: IdentitySourceType;
  IdentitySourceParameters?: IdentitySourceParametersForList;
  IdentitySourceArn?: string;
  CreationTime?: Date;
  Status?: IdentitySourceStatus;
  StatusCode?: IdentitySourceStatusCode;
  StatusMessage?: string;
}
export const IdentitySourceForList = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IdentitySourceType: S.optional(IdentitySourceType),
    IdentitySourceParameters: S.optional(IdentitySourceParametersForList),
    IdentitySourceArn: S.optional(S.String),
    CreationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Status: S.optional(IdentitySourceStatus),
    StatusCode: S.optional(IdentitySourceStatusCode),
    StatusMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "IdentitySourceForList",
}) as any as S.Schema<IdentitySourceForList>;
export type IdentitySources = IdentitySourceForList[];
export const IdentitySources = /*@__PURE__*/ S.Array(IdentitySourceForList);
export interface ListIdentitySourcesResponse {
  NextToken?: string;
  IdentitySources?: IdentitySourceForList[];
}
export const ListIdentitySourcesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    IdentitySources: S.optional(IdentitySources),
  }),
).annotate({
  identifier: "ListIdentitySourcesResponse",
}) as any as S.Schema<ListIdentitySourcesResponse>;
export interface ListPoliciesRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListPoliciesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/policies/?List" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPoliciesRequest",
}) as any as S.Schema<ListPoliciesRequest>;
export interface Policy {
  Arn: string;
  DefaultVersion: number;
  PolicyType: PolicyType;
  Name: string;
}
export const Policy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    DefaultVersion: S.Number,
    PolicyType: PolicyType,
    Name: S.String,
  }),
).annotate({ identifier: "Policy" }) as any as S.Schema<Policy>;
export type Policies = Policy[];
export const Policies = /*@__PURE__*/ S.Array(Policy);
export interface ListPoliciesResponse {
  NextToken?: string;
  Policies?: Policy[];
}
export const ListPoliciesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ NextToken: S.optional(S.String), Policies: S.optional(Policies) }),
).annotate({
  identifier: "ListPoliciesResponse",
}) as any as S.Schema<ListPoliciesResponse>;
export interface ListPolicyVersionsRequest {
  MaxResults?: number;
  NextToken?: string;
  PolicyArn: string;
}
export const ListPolicyVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    PolicyArn: S.String.pipe(T.HttpLabel("PolicyArn")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/policies/{PolicyArn}/?List" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPolicyVersionsRequest",
}) as any as S.Schema<ListPolicyVersionsRequest>;
export interface PolicyVersionSummary {
  Arn: string;
  PolicyArn: string;
  VersionId: number;
  PolicyType: PolicyType;
  IsDefault: boolean;
  Name: string;
  Status: PolicyStatus;
  CreationTime: Date;
  LastUpdatedTime: Date;
}
export const PolicyVersionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    PolicyArn: S.String,
    VersionId: S.Number,
    PolicyType: PolicyType,
    IsDefault: S.Boolean,
    Name: S.String,
    Status: PolicyStatus,
    CreationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    LastUpdatedTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "PolicyVersionSummary",
}) as any as S.Schema<PolicyVersionSummary>;
export type PolicyVersions = PolicyVersionSummary[];
export const PolicyVersions = /*@__PURE__*/ S.Array(PolicyVersionSummary);
export interface ListPolicyVersionsResponse {
  NextToken?: string;
  PolicyVersions?: PolicyVersionSummary[];
}
export const ListPolicyVersionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    PolicyVersions: S.optional(PolicyVersions),
  }),
).annotate({
  identifier: "ListPolicyVersionsResponse",
}) as any as S.Schema<ListPolicyVersionsResponse>;
export interface ListResourcePoliciesRequest {
  ResourceArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListResourcePoliciesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/resource-policies/{ResourceArn}/?List" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListResourcePoliciesRequest",
}) as any as S.Schema<ListResourcePoliciesRequest>;
export interface ListResourcePoliciesResponseResourcePolicy {
  PolicyArn?: string;
  PolicyType?: PolicyType;
  PolicyName?: string;
}
export const ListResourcePoliciesResponseResourcePolicy =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      PolicyArn: S.optional(S.String),
      PolicyType: S.optional(PolicyType),
      PolicyName: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListResourcePoliciesResponseResourcePolicy",
  }) as any as S.Schema<ListResourcePoliciesResponseResourcePolicy>;
export type ListResourcePoliciesResponseResourcePolicies =
  ListResourcePoliciesResponseResourcePolicy[];
export const ListResourcePoliciesResponseResourcePolicies =
  /*@__PURE__*/ S.Array(ListResourcePoliciesResponseResourcePolicy);
export interface ListResourcePoliciesResponse {
  NextToken?: string;
  ResourcePolicies?: ListResourcePoliciesResponseResourcePolicy[];
}
export const ListResourcePoliciesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    ResourcePolicies: S.optional(ListResourcePoliciesResponseResourcePolicies),
  }),
).annotate({
  identifier: "ListResourcePoliciesResponse",
}) as any as S.Schema<ListResourcePoliciesResponse>;
export type FilterField =
  | "ActionName"
  | "ApprovalTeamName"
  | "VotingTime"
  | "Vote"
  | "SessionStatus"
  | "InitiationTime"
  | (string & {});
export const FilterField = /*@__PURE__*/ S.String;

export type Operator =
  | "EQ"
  | "NE"
  | "GT"
  | "LT"
  | "GTE"
  | "LTE"
  | "CONTAINS"
  | "NOT_CONTAINS"
  | "BETWEEN"
  | (string & {});
export const Operator = /*@__PURE__*/ S.String;

export interface Filter {
  FieldName?: FilterField;
  Operator?: Operator;
  Value?: string;
}
export const Filter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FieldName: S.optional(FilterField),
    Operator: S.optional(Operator),
    Value: S.optional(S.String),
  }),
).annotate({ identifier: "Filter" }) as any as S.Schema<Filter>;
export type Filters = Filter[];
export const Filters = /*@__PURE__*/ S.Array(Filter);
export interface ListSessionsRequest {
  ApprovalTeamArn: string;
  MaxResults?: number;
  NextToken?: string;
  Filters?: Filter[];
}
export const ListSessionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApprovalTeamArn: S.String.pipe(T.HttpLabel("ApprovalTeamArn")),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    Filters: S.optional(Filters),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/approval-teams/{ApprovalTeamArn}/sessions/?List",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSessionsRequest",
}) as any as S.Schema<ListSessionsRequest>;
export interface ListSessionsResponseSession {
  SessionArn?: string;
  ApprovalTeamName?: string;
  ApprovalTeamArn?: string;
  InitiationTime?: Date;
  ExpirationTime?: Date;
  CompletionTime?: Date;
  Description?: string | redacted.Redacted<string>;
  ActionName?: string;
  ProtectedResourceArn?: string;
  RequesterServicePrincipal?: string;
  RequesterPrincipalArn?: string;
  RequesterRegion?: string;
  RequesterAccountId?: string;
  Status?: SessionStatus;
  StatusCode?: SessionStatusCode;
  StatusMessage?: string;
  ActionCompletionStrategy?: ActionCompletionStrategy;
  AdditionalSecurityRequirements?: AdditionalSecurityRequirement[];
}
export const ListSessionsResponseSession = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SessionArn: S.optional(S.String),
    ApprovalTeamName: S.optional(S.String),
    ApprovalTeamArn: S.optional(S.String),
    InitiationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ExpirationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    CompletionTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Description: S.optional(SensitiveString),
    ActionName: S.optional(S.String),
    ProtectedResourceArn: S.optional(S.String),
    RequesterServicePrincipal: S.optional(S.String),
    RequesterPrincipalArn: S.optional(S.String),
    RequesterRegion: S.optional(S.String),
    RequesterAccountId: S.optional(S.String),
    Status: S.optional(SessionStatus),
    StatusCode: S.optional(SessionStatusCode),
    StatusMessage: S.optional(S.String),
    ActionCompletionStrategy: S.optional(ActionCompletionStrategy),
    AdditionalSecurityRequirements: S.optional(AdditionalSecurityRequirements),
  }),
).annotate({
  identifier: "ListSessionsResponseSession",
}) as any as S.Schema<ListSessionsResponseSession>;
export type ListSessionsResponseSessions = ListSessionsResponseSession[];
export const ListSessionsResponseSessions = /*@__PURE__*/ S.Array(
  ListSessionsResponseSession,
);
export interface ListSessionsResponse {
  NextToken?: string;
  Sessions?: ListSessionsResponseSession[];
}
export const ListSessionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    Sessions: S.optional(ListSessionsResponseSessions),
  }),
).annotate({
  identifier: "ListSessionsResponse",
}) as any as S.Schema<ListSessionsResponse>;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/tags/{ResourceArn}" }),
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
  Tags?: { [key: string]: string | redacted.Redacted<string> | undefined };
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(Tags) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface StartActiveApprovalTeamDeletionRequest {
  PendingWindowDays?: number;
  Arn: string;
}
export const StartActiveApprovalTeamDeletionRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      PendingWindowDays: S.optional(S.Number),
      Arn: S.String.pipe(T.HttpLabel("Arn")),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/approval-teams/{Arn}?Delete" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "StartActiveApprovalTeamDeletionRequest",
}) as any as S.Schema<StartActiveApprovalTeamDeletionRequest>;
export interface StartActiveApprovalTeamDeletionResponse {
  DeletionCompletionTime?: Date;
  DeletionStartTime?: Date;
}
export const StartActiveApprovalTeamDeletionResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      DeletionCompletionTime: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      DeletionStartTime: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
    }),
).annotate({
  identifier: "StartActiveApprovalTeamDeletionResponse",
}) as any as S.Schema<StartActiveApprovalTeamDeletionResponse>;
export type StartApprovalTeamBaselineApproverIds = string[];
export const StartApprovalTeamBaselineApproverIds = /*@__PURE__*/ S.Array(
  S.String,
);
export interface StartApprovalTeamBaselineRequest {
  Arn: string;
  ApproverIds?: string[];
}
export const StartApprovalTeamBaselineRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String.pipe(T.HttpLabel("Arn")),
    ApproverIds: S.optional(StartApprovalTeamBaselineApproverIds),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/approval-teams/{Arn}/baseline" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartApprovalTeamBaselineRequest",
}) as any as S.Schema<StartApprovalTeamBaselineRequest>;
export interface StartApprovalTeamBaselineResponse {
  BaselineSessionArn?: string;
}
export const StartApprovalTeamBaselineResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BaselineSessionArn: S.optional(S.String) }),
).annotate({
  identifier: "StartApprovalTeamBaselineResponse",
}) as any as S.Schema<StartApprovalTeamBaselineResponse>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: { [key: string]: string | redacted.Redacted<string> | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    Tags: Tags,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/tags/{ResourceArn}" }),
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
export type TagKeyList = (string | redacted.Redacted<string>)[];
export const TagKeyList = /*@__PURE__*/ S.Array(SensitiveString);
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: (string | redacted.Redacted<string>)[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    TagKeys: TagKeyList,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/tags/{ResourceArn}" }),
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
export type UpdateAction = "SYNCHRONIZE_MFA_DEVICES" | (string & {});
export const UpdateAction = /*@__PURE__*/ S.String;

export type UpdateActions = UpdateAction[];
export const UpdateActions = /*@__PURE__*/ S.Array(UpdateAction);
export interface UpdateApprovalTeamRequest {
  ApprovalStrategy?: ApprovalStrategy;
  Approvers?: ApprovalTeamRequestApprover[];
  Description?: string | redacted.Redacted<string>;
  Arn: string;
  UpdateActions?: UpdateAction[];
}
export const UpdateApprovalTeamRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApprovalStrategy: S.optional(ApprovalStrategy),
    Approvers: S.optional(ApprovalTeamRequestApprovers),
    Description: S.optional(SensitiveString),
    Arn: S.String.pipe(T.HttpLabel("Arn")),
    UpdateActions: S.optional(UpdateActions),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/approval-teams/{Arn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateApprovalTeamRequest",
}) as any as S.Schema<UpdateApprovalTeamRequest>;
export interface UpdateApprovalTeamResponse {
  VersionId?: string;
}
export const UpdateApprovalTeamResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ VersionId: S.optional(S.String) }),
).annotate({
  identifier: "UpdateApprovalTeamResponse",
}) as any as S.Schema<UpdateApprovalTeamResponse>;
export type CancelSessionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels an approval session. For more information, see Session in the *Multi-party approval User Guide*.
 */
export const cancelSession: API.OperationMethod<
  CancelSessionRequest,
  CancelSessionResponse,
  CancelSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelSessionRequest,
  output: CancelSessionResponse,
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
  operationName: "CancelSession",
}));

export type CreateApprovalTeamError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new approval team. For more information, see Approval team in the *Multi-party approval User Guide*.
 */
export const createApprovalTeam: API.OperationMethod<
  CreateApprovalTeamRequest,
  CreateApprovalTeamResponse,
  CreateApprovalTeamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateApprovalTeamRequest,
  output: CreateApprovalTeamResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApprovalTeam",
}));

export type CreateIdentitySourceError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new identity source. For more information, see Identity Source in the *Multi-party approval User Guide*.
 */
export const createIdentitySource: API.OperationMethod<
  CreateIdentitySourceRequest,
  CreateIdentitySourceResponse,
  CreateIdentitySourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateIdentitySourceRequest,
  output: CreateIdentitySourceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIdentitySource",
}));

export type DeleteIdentitySourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an identity source. For more information, see Identity Source in the *Multi-party approval User Guide*.
 */
export const deleteIdentitySource: API.OperationMethod<
  DeleteIdentitySourceRequest,
  DeleteIdentitySourceResponse,
  DeleteIdentitySourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteIdentitySourceRequest,
  output: DeleteIdentitySourceResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIdentitySource",
}));

export type DeleteInactiveApprovalTeamVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an inactive approval team. For more information, see Team health in the *Multi-party approval User Guide*.
 *
 * You can also use this operation to delete a team draft. For more information, see Interacting with drafts in the *Multi-party approval User Guide*.
 */
export const deleteInactiveApprovalTeamVersion: API.OperationMethod<
  DeleteInactiveApprovalTeamVersionRequest,
  DeleteInactiveApprovalTeamVersionResponse,
  DeleteInactiveApprovalTeamVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteInactiveApprovalTeamVersionRequest,
  output: DeleteInactiveApprovalTeamVersionResponse,
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
  operationName: "DeleteInactiveApprovalTeamVersion",
}));

export type GetApprovalTeamError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns details for an approval team.
 */
export const getApprovalTeam: API.OperationMethod<
  GetApprovalTeamRequest,
  GetApprovalTeamResponse,
  GetApprovalTeamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetApprovalTeamRequest,
  output: GetApprovalTeamResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApprovalTeam",
}));

export type GetIdentitySourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns details for an identity source. For more information, see Identity Source in the *Multi-party approval User Guide*.
 */
export const getIdentitySource: API.OperationMethod<
  GetIdentitySourceRequest,
  GetIdentitySourceResponse,
  GetIdentitySourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetIdentitySourceRequest,
  output: GetIdentitySourceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIdentitySource",
}));

export type GetPolicyVersionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns details for the version of a policy. Policies define the permissions for team resources.
 */
export const getPolicyVersion: API.OperationMethod<
  GetPolicyVersionRequest,
  GetPolicyVersionResponse,
  GetPolicyVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPolicyVersionRequest,
  output: GetPolicyVersionResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPolicyVersion",
}));

export type GetResourcePolicyError =
  | AccessDeniedException
  | InvalidParameterException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns details about a policy for a resource.
 */
export const getResourcePolicy: API.OperationMethod<
  GetResourcePolicyRequest,
  GetResourcePolicyResponse,
  GetResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetResourcePolicyRequest,
  output: GetResourcePolicyResponse,
  errors: [
    AccessDeniedException,
    InvalidParameterException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicy",
}));

export type GetSessionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns details for an approval session. For more information, see Session in the *Multi-party approval User Guide*.
 */
export const getSession: API.OperationMethod<
  GetSessionRequest,
  GetSessionResponse,
  GetSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSessionRequest,
  output: GetSessionResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSession",
}));

export type ListApprovalTeamsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of approval teams.
 */
export const listApprovalTeams: API.PaginatedOperationMethod<
  ListApprovalTeamsRequest,
  ListApprovalTeamsResponse,
  ListApprovalTeamsError,
  Credentials | HttpClient.HttpClient,
  ListApprovalTeamsResponseApprovalTeam
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListApprovalTeamsRequest,
  output: ListApprovalTeamsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApprovalTeams",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ApprovalTeams",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListIdentitySourcesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of identity sources. For more information, see Identity Source in the *Multi-party approval User Guide*.
 */
export const listIdentitySources: API.PaginatedOperationMethod<
  ListIdentitySourcesRequest,
  ListIdentitySourcesResponse,
  ListIdentitySourcesError,
  Credentials | HttpClient.HttpClient,
  IdentitySourceForList
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListIdentitySourcesRequest,
  output: ListIdentitySourcesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIdentitySources",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "IdentitySources",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPoliciesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of policies. Policies define the permissions for team resources.
 */
export const listPolicies: API.PaginatedOperationMethod<
  ListPoliciesRequest,
  ListPoliciesResponse,
  ListPoliciesError,
  Credentials | HttpClient.HttpClient,
  Policy
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPoliciesRequest,
  output: ListPoliciesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPolicies",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Policies",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPolicyVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of the versions for policies. Policies define the permissions for team resources.
 */
export const listPolicyVersions: API.PaginatedOperationMethod<
  ListPolicyVersionsRequest,
  ListPolicyVersionsResponse,
  ListPolicyVersionsError,
  Credentials | HttpClient.HttpClient,
  PolicyVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPolicyVersionsRequest,
  output: ListPolicyVersionsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPolicyVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PolicyVersions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListResourcePoliciesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of policies for a resource.
 */
export const listResourcePolicies: API.PaginatedOperationMethod<
  ListResourcePoliciesRequest,
  ListResourcePoliciesResponse,
  ListResourcePoliciesError,
  Credentials | HttpClient.HttpClient,
  ListResourcePoliciesResponseResourcePolicy
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListResourcePoliciesRequest,
  output: ListResourcePoliciesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourcePolicies",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ResourcePolicies",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSessionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of approval sessions. For more information, see Session in the *Multi-party approval User Guide*.
 */
export const listSessions: API.PaginatedOperationMethod<
  ListSessionsRequest,
  ListSessionsResponse,
  ListSessionsError,
  Credentials | HttpClient.HttpClient,
  ListSessionsResponseSession
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSessionsRequest,
  output: ListSessionsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSessions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Sessions",
    pageSize: "MaxResults",
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
 * Returns a list of the tags for a resource.
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

export type StartActiveApprovalTeamDeletionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts the deletion process for an active approval team.
 *
 * **Deletions require team approval**
 *
 * Requests to delete an active team must be approved by the team.
 */
export const startActiveApprovalTeamDeletion: API.OperationMethod<
  StartActiveApprovalTeamDeletionRequest,
  StartActiveApprovalTeamDeletionResponse,
  StartActiveApprovalTeamDeletionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartActiveApprovalTeamDeletionRequest,
  output: StartActiveApprovalTeamDeletionResponse,
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
  operationName: "StartActiveApprovalTeamDeletion",
}));

export type StartApprovalTeamBaselineError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a baseline session for specified approvers on an `ACTIVE` approval team.
 */
export const startApprovalTeamBaseline: API.OperationMethod<
  StartApprovalTeamBaselineRequest,
  StartApprovalTeamBaselineResponse,
  StartApprovalTeamBaselineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartApprovalTeamBaselineRequest,
  output: StartApprovalTeamBaselineResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartApprovalTeamBaseline",
}));

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates a resource tag. Each tag is a label consisting of a user-defined key and value. Tags can help you manage, identify, organize, search for, and filter resources.
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
    TooManyTagsException,
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
 * Removes a resource tag. Each tag is a label consisting of a user-defined key and value. Tags can help you manage, identify, organize, search for, and filter resources.
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

export type UpdateApprovalTeamError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an approval team. You can request to update the team description, approval threshold, and approvers in the team.
 *
 * **Updates require team approval**
 *
 * Updates to an active team must be approved by the team.
 */
export const updateApprovalTeam: API.OperationMethod<
  UpdateApprovalTeamRequest,
  UpdateApprovalTeamResponse,
  UpdateApprovalTeamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateApprovalTeamRequest,
  output: UpdateApprovalTeamResponse,
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
  operationName: "UpdateApprovalTeam",
}));
