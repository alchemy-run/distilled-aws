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
  sdkId: "PartnerCentral Channel",
  serviceShapeName: "PartnerCentralChannel",
});
const auth = T.AwsAuthSigv4({ name: "partnercentral-channel" });
const ver = T.ServiceVersion("2024-03-18");
const proto = T.AwsProtocolsAwsJson1_0();
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
  const _p0 = () => ({
    authSchemes: [
      { name: "sigv4a", signingRegionSet: ["*"] },
      { name: "sigv4", signingRegion: "us-gov-west-1" },
    ],
  });
  const _p1 = (_0: unknown) => ({
    authSchemes: [
      { name: "sigv4a", signingRegionSet: ["*"] },
      {
        name: "sigv4",
        signingRegion: `${_.getAttr(_0, "implicitGlobalRegion")}`,
      },
    ],
  });
  if (Endpoint != null) {
    if (UseFIPS === true) {
      return err(
        "Invalid Configuration: FIPS and custom endpoint are not supported",
      );
    }
    return e(
      Endpoint,
      {
        authSchemes: [
          { name: "sigv4a", signingRegionSet: ["*"] },
          { name: "sigv4" },
        ],
      },
      {},
    );
  }
  if (Region != null) {
    {
      const PartitionResult = _.partition(Region);
      if (PartitionResult != null && PartitionResult !== false) {
        if (
          _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
          UseFIPS === false
        ) {
          return e(
            `https://partnercentral-channel.us-gov.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            _p0(),
            {},
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
          UseFIPS === true
        ) {
          return e(
            `https://partnercentral-channel-fips.us-gov.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            _p0(),
            {},
          );
        }
        if (UseFIPS === true) {
          return e(
            `https://partnercentral-channel-fips.global.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            _p1(PartitionResult),
            {},
          );
        }
        return e(
          `https://partnercentral-channel.global.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          _p1(PartitionResult),
          {},
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: S.String.pipe(T.ErrorMessage()), reason: S.optional(S.String) },
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
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(T.HttpError(500), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.optional(S.String),
      resourceType: S.optional(S.String),
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
      quotaCode: S.String,
    },
    T.all(T.HttpError(402), T.Retryable()),
  ).pipe(C.withQuotaError, C.withRetryableError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      serviceCode: S.optional(S.String),
      quotaCode: S.optional(S.String),
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
export type Catalog = string;
export type ChannelHandshakeIdentifier = string;
export interface AcceptChannelHandshakeRequest {
  catalog: string;
  identifier: string;
}
export const AcceptChannelHandshakeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ catalog: S.String, identifier: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/AcceptChannelHandshake" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AcceptChannelHandshakeRequest",
}) as any as S.Schema<AcceptChannelHandshakeRequest>;
export type ChannelHandshakeId = string;
export type Arn = string;
export type HandshakeStatus =
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | "CANCELED"
  | "EXPIRED"
  | (string & {});
export const HandshakeStatus = /*@__PURE__*/ S.String;

export interface AcceptChannelHandshakeDetail {
  id?: string;
  arn?: string;
  status?: HandshakeStatus;
}
export const AcceptChannelHandshakeDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    arn: S.optional(S.String),
    status: S.optional(HandshakeStatus),
  }),
).annotate({
  identifier: "AcceptChannelHandshakeDetail",
}) as any as S.Schema<AcceptChannelHandshakeDetail>;
export interface AcceptChannelHandshakeResponse {
  channelHandshakeDetail?: AcceptChannelHandshakeDetail;
}
export const AcceptChannelHandshakeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    channelHandshakeDetail: S.optional(AcceptChannelHandshakeDetail),
  }),
).annotate({
  identifier: "AcceptChannelHandshakeResponse",
}) as any as S.Schema<AcceptChannelHandshakeResponse>;
export interface CancelChannelHandshakeRequest {
  catalog: string;
  identifier: string;
}
export const CancelChannelHandshakeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ catalog: S.String, identifier: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CancelChannelHandshake" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelChannelHandshakeRequest",
}) as any as S.Schema<CancelChannelHandshakeRequest>;
export interface CancelChannelHandshakeDetail {
  id?: string;
  arn?: string;
  status?: HandshakeStatus;
}
export const CancelChannelHandshakeDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    arn: S.optional(S.String),
    status: S.optional(HandshakeStatus),
  }),
).annotate({
  identifier: "CancelChannelHandshakeDetail",
}) as any as S.Schema<CancelChannelHandshakeDetail>;
export interface CancelChannelHandshakeResponse {
  channelHandshakeDetail?: CancelChannelHandshakeDetail;
}
export const CancelChannelHandshakeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    channelHandshakeDetail: S.optional(CancelChannelHandshakeDetail),
  }),
).annotate({
  identifier: "CancelChannelHandshakeResponse",
}) as any as S.Schema<CancelChannelHandshakeResponse>;
export type HandshakeType =
  | "START_SERVICE_PERIOD"
  | "REVOKE_SERVICE_PERIOD"
  | "PROGRAM_MANAGEMENT_ACCOUNT"
  | (string & {});
export const HandshakeType = /*@__PURE__*/ S.String;

export type AssociatedResourceIdentifier = string;
export type ProgramManagementAccountIdentifier = string;
export type Note = string;
export type ServicePeriodType =
  | "MINIMUM_NOTICE_PERIOD"
  | "FIXED_COMMITMENT_PERIOD"
  | (string & {});
export const ServicePeriodType = /*@__PURE__*/ S.String;

export type MinimumNoticeDays = string;
export interface StartServicePeriodPayload {
  programManagementAccountIdentifier: string;
  note?: string;
  servicePeriodType: ServicePeriodType;
  minimumNoticeDays?: string;
  endDate?: Date;
}
export const StartServicePeriodPayload = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    programManagementAccountIdentifier: S.String,
    note: S.optional(S.String),
    servicePeriodType: ServicePeriodType,
    minimumNoticeDays: S.optional(S.String),
    endDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
  }),
).annotate({
  identifier: "StartServicePeriodPayload",
}) as any as S.Schema<StartServicePeriodPayload>;
export interface RevokeServicePeriodPayload {
  programManagementAccountIdentifier: string;
  note?: string;
}
export const RevokeServicePeriodPayload = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    programManagementAccountIdentifier: S.String,
    note: S.optional(S.String),
  }),
).annotate({
  identifier: "RevokeServicePeriodPayload",
}) as any as S.Schema<RevokeServicePeriodPayload>;
export type ChannelHandshakePayload =
  | {
      startServicePeriodPayload: StartServicePeriodPayload;
      revokeServicePeriodPayload?: never;
    }
  | {
      startServicePeriodPayload?: never;
      revokeServicePeriodPayload: RevokeServicePeriodPayload;
    };
export const ChannelHandshakePayload = /*@__PURE__*/ S.Union([
  S.Struct({ startServicePeriodPayload: StartServicePeriodPayload }),
  S.Struct({ revokeServicePeriodPayload: RevokeServicePeriodPayload }),
]);
export type ClientToken = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  key: string;
  value: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.String, value: S.String }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = /*@__PURE__*/ S.Array(Tag);
export interface CreateChannelHandshakeRequest {
  handshakeType: HandshakeType;
  catalog: string;
  associatedResourceIdentifier: string;
  payload?: ChannelHandshakePayload;
  clientToken?: string;
  tags?: Tag[];
}
export const CreateChannelHandshakeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    handshakeType: HandshakeType,
    catalog: S.String,
    associatedResourceIdentifier: S.String,
    payload: S.optional(ChannelHandshakePayload),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CreateChannelHandshake" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateChannelHandshakeRequest",
}) as any as S.Schema<CreateChannelHandshakeRequest>;
export interface CreateChannelHandshakeDetail {
  id?: string;
  arn?: string;
}
export const CreateChannelHandshakeDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.optional(S.String), arn: S.optional(S.String) }),
).annotate({
  identifier: "CreateChannelHandshakeDetail",
}) as any as S.Schema<CreateChannelHandshakeDetail>;
export interface CreateChannelHandshakeResponse {
  channelHandshakeDetail?: CreateChannelHandshakeDetail;
}
export const CreateChannelHandshakeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    channelHandshakeDetail: S.optional(CreateChannelHandshakeDetail),
  }),
).annotate({
  identifier: "CreateChannelHandshakeResponse",
}) as any as S.Schema<CreateChannelHandshakeResponse>;
export type Program =
  | "SOLUTION_PROVIDER"
  | "DISTRIBUTION"
  | "DISTRIBUTION_SELLER"
  | (string & {});
export const Program = /*@__PURE__*/ S.String;

export type ProgramManagementAccountDisplayName = string;
export type AccountId = string;
export interface CreateProgramManagementAccountRequest {
  catalog: string;
  program: Program;
  displayName: string;
  accountId: string;
  clientToken?: string;
  tags?: Tag[];
}
export const CreateProgramManagementAccountRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      catalog: S.String,
      program: Program,
      displayName: S.String,
      accountId: S.String,
      clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
      tags: S.optional(TagList),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/CreateProgramManagementAccount" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateProgramManagementAccountRequest",
}) as any as S.Schema<CreateProgramManagementAccountRequest>;
export type ProgramManagementAccountId = string;
export interface CreateProgramManagementAccountDetail {
  id?: string;
  arn?: string;
}
export const CreateProgramManagementAccountDetail = /*@__PURE__*/ S.suspend(
  () => S.Struct({ id: S.optional(S.String), arn: S.optional(S.String) }),
).annotate({
  identifier: "CreateProgramManagementAccountDetail",
}) as any as S.Schema<CreateProgramManagementAccountDetail>;
export interface CreateProgramManagementAccountResponse {
  programManagementAccountDetail?: CreateProgramManagementAccountDetail;
}
export const CreateProgramManagementAccountResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      programManagementAccountDetail: S.optional(
        CreateProgramManagementAccountDetail,
      ),
    }),
).annotate({
  identifier: "CreateProgramManagementAccountResponse",
}) as any as S.Schema<CreateProgramManagementAccountResponse>;
export type AssociationType =
  | "DOWNSTREAM_SELLER"
  | "END_CUSTOMER"
  | "INTERNAL"
  | (string & {});
export const AssociationType = /*@__PURE__*/ S.String;

export type RelationshipDisplayName = string;
export type ResaleAccountModel =
  | "DISTRIBUTOR"
  | "END_CUSTOMER"
  | "SOLUTION_PROVIDER"
  | (string & {});
export const ResaleAccountModel = /*@__PURE__*/ S.String;

export type Sector =
  | "COMMERCIAL"
  | "GOVERNMENT"
  | "GOVERNMENT_EXCEPTION"
  | (string & {});
export const Sector = /*@__PURE__*/ S.String;

export type Coverage =
  | "ENTIRE_ORGANIZATION"
  | "MANAGEMENT_ACCOUNT_ONLY"
  | (string & {});
export const Coverage = /*@__PURE__*/ S.String;

export interface ResoldEnterprise {
  coverage: Coverage;
  tamLocation: string;
  chargeAccountId?: string;
}
export const ResoldEnterprise = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    coverage: Coverage,
    tamLocation: S.String,
    chargeAccountId: S.optional(S.String),
  }),
).annotate({
  identifier: "ResoldEnterprise",
}) as any as S.Schema<ResoldEnterprise>;
export type Provider = "DISTRIBUTOR" | "DISTRIBUTION_SELLER" | (string & {});
export const Provider = /*@__PURE__*/ S.String;

export interface PartnerLedSupport {
  coverage: Coverage;
  provider?: Provider;
  tamLocation: string;
}
export const PartnerLedSupport = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    coverage: Coverage,
    provider: S.optional(Provider),
    tamLocation: S.String,
  }),
).annotate({
  identifier: "PartnerLedSupport",
}) as any as S.Schema<PartnerLedSupport>;
export interface ResoldUnifiedOperations {
  coverage: Coverage;
  tamLocation: string;
  chargeAccountId?: string;
}
export const ResoldUnifiedOperations = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    coverage: Coverage,
    tamLocation: S.String,
    chargeAccountId: S.optional(S.String),
  }),
).annotate({
  identifier: "ResoldUnifiedOperations",
}) as any as S.Schema<ResoldUnifiedOperations>;
export type SupportPlan =
  | {
      resoldEnterprise: ResoldEnterprise;
      partnerLedSupport?: never;
      resoldUnifiedOperations?: never;
    }
  | {
      resoldEnterprise?: never;
      partnerLedSupport: PartnerLedSupport;
      resoldUnifiedOperations?: never;
    }
  | {
      resoldEnterprise?: never;
      partnerLedSupport?: never;
      resoldUnifiedOperations: ResoldUnifiedOperations;
    };
export const SupportPlan = /*@__PURE__*/ S.Union([
  S.Struct({ resoldEnterprise: ResoldEnterprise }),
  S.Struct({ partnerLedSupport: PartnerLedSupport }),
  S.Struct({ resoldUnifiedOperations: ResoldUnifiedOperations }),
]);
export interface CreateRelationshipRequest {
  catalog: string;
  associationType: AssociationType;
  programManagementAccountIdentifier: string;
  associatedAccountId: string;
  displayName: string;
  resaleAccountModel?: ResaleAccountModel;
  sector: Sector;
  clientToken?: string;
  tags?: Tag[];
  requestedSupportPlan?: SupportPlan;
}
export const CreateRelationshipRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    catalog: S.String,
    associationType: AssociationType,
    programManagementAccountIdentifier: S.String,
    associatedAccountId: S.String,
    displayName: S.String,
    resaleAccountModel: S.optional(ResaleAccountModel),
    sector: Sector,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(TagList),
    requestedSupportPlan: S.optional(SupportPlan),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CreateRelationship" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateRelationshipRequest",
}) as any as S.Schema<CreateRelationshipRequest>;
export type RelationshipId = string;
export interface CreateRelationshipDetail {
  arn?: string;
  id?: string;
}
export const CreateRelationshipDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.optional(S.String), id: S.optional(S.String) }),
).annotate({
  identifier: "CreateRelationshipDetail",
}) as any as S.Schema<CreateRelationshipDetail>;
export interface CreateRelationshipResponse {
  relationshipDetail?: CreateRelationshipDetail;
}
export const CreateRelationshipResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ relationshipDetail: S.optional(CreateRelationshipDetail) }),
).annotate({
  identifier: "CreateRelationshipResponse",
}) as any as S.Schema<CreateRelationshipResponse>;
export interface DeleteProgramManagementAccountRequest {
  catalog: string;
  identifier: string;
  clientToken?: string;
}
export const DeleteProgramManagementAccountRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      catalog: S.String,
      identifier: S.String,
      clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/DeleteProgramManagementAccount" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteProgramManagementAccountRequest",
}) as any as S.Schema<DeleteProgramManagementAccountRequest>;
export interface DeleteProgramManagementAccountResponse {}
export const DeleteProgramManagementAccountResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeleteProgramManagementAccountResponse",
}) as any as S.Schema<DeleteProgramManagementAccountResponse>;
export type RelationshipIdentifier = string;
export interface DeleteRelationshipRequest {
  catalog: string;
  identifier: string;
  programManagementAccountIdentifier: string;
  clientToken?: string;
}
export const DeleteRelationshipRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    catalog: S.String,
    identifier: S.String,
    programManagementAccountIdentifier: S.String,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeleteRelationship" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteRelationshipRequest",
}) as any as S.Schema<DeleteRelationshipRequest>;
export interface DeleteRelationshipResponse {}
export const DeleteRelationshipResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteRelationshipResponse",
}) as any as S.Schema<DeleteRelationshipResponse>;
export interface GetRelationshipRequest {
  catalog: string;
  programManagementAccountIdentifier: string;
  identifier: string;
}
export const GetRelationshipRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    catalog: S.String,
    programManagementAccountIdentifier: S.String,
    identifier: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetRelationship" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRelationshipRequest",
}) as any as S.Schema<GetRelationshipRequest>;
export type Revision = string;
export interface RelationshipDetail {
  arn?: string;
  id?: string;
  revision?: string;
  catalog?: string;
  associationType?: AssociationType;
  programManagementAccountId?: string;
  associatedAccountId?: string;
  displayName?: string;
  resaleAccountModel?: ResaleAccountModel;
  sector?: Sector;
  createdAt?: Date;
  updatedAt?: Date;
  startDate?: Date;
}
export const RelationshipDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    id: S.optional(S.String),
    revision: S.optional(S.String),
    catalog: S.optional(S.String),
    associationType: S.optional(AssociationType),
    programManagementAccountId: S.optional(S.String),
    associatedAccountId: S.optional(S.String),
    displayName: S.optional(S.String),
    resaleAccountModel: S.optional(ResaleAccountModel),
    sector: S.optional(Sector),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    startDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "RelationshipDetail",
}) as any as S.Schema<RelationshipDetail>;
export interface GetRelationshipResponse {
  relationshipDetail?: RelationshipDetail;
}
export const GetRelationshipResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ relationshipDetail: S.optional(RelationshipDetail) }),
).annotate({
  identifier: "GetRelationshipResponse",
}) as any as S.Schema<GetRelationshipResponse>;
export type ParticipantType = "SENDER" | "RECEIVER" | (string & {});
export const ParticipantType = /*@__PURE__*/ S.String;

export type HandshakeStatusList = HandshakeStatus[];
export const HandshakeStatusList = /*@__PURE__*/ S.Array(HandshakeStatus);
export type AssociatedResourceIdentifierList = string[];
export const AssociatedResourceIdentifierList = /*@__PURE__*/ S.Array(S.String);
export type ServicePeriodTypeList = ServicePeriodType[];
export const ServicePeriodTypeList = /*@__PURE__*/ S.Array(ServicePeriodType);
export interface StartServicePeriodTypeFilters {
  servicePeriodTypes?: ServicePeriodType[];
}
export const StartServicePeriodTypeFilters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ servicePeriodTypes: S.optional(ServicePeriodTypeList) }),
).annotate({
  identifier: "StartServicePeriodTypeFilters",
}) as any as S.Schema<StartServicePeriodTypeFilters>;
export interface RevokeServicePeriodTypeFilters {
  servicePeriodTypes?: ServicePeriodType[];
}
export const RevokeServicePeriodTypeFilters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ servicePeriodTypes: S.optional(ServicePeriodTypeList) }),
).annotate({
  identifier: "RevokeServicePeriodTypeFilters",
}) as any as S.Schema<RevokeServicePeriodTypeFilters>;
export type ProgramList = Program[];
export const ProgramList = /*@__PURE__*/ S.Array(Program);
export interface ProgramManagementAccountTypeFilters {
  programs?: Program[];
}
export const ProgramManagementAccountTypeFilters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ programs: S.optional(ProgramList) }),
).annotate({
  identifier: "ProgramManagementAccountTypeFilters",
}) as any as S.Schema<ProgramManagementAccountTypeFilters>;
export type ListChannelHandshakesTypeFilters =
  | {
      startServicePeriodTypeFilters: StartServicePeriodTypeFilters;
      revokeServicePeriodTypeFilters?: never;
      programManagementAccountTypeFilters?: never;
    }
  | {
      startServicePeriodTypeFilters?: never;
      revokeServicePeriodTypeFilters: RevokeServicePeriodTypeFilters;
      programManagementAccountTypeFilters?: never;
    }
  | {
      startServicePeriodTypeFilters?: never;
      revokeServicePeriodTypeFilters?: never;
      programManagementAccountTypeFilters: ProgramManagementAccountTypeFilters;
    };
export const ListChannelHandshakesTypeFilters = /*@__PURE__*/ S.Union([
  S.Struct({ startServicePeriodTypeFilters: StartServicePeriodTypeFilters }),
  S.Struct({ revokeServicePeriodTypeFilters: RevokeServicePeriodTypeFilters }),
  S.Struct({
    programManagementAccountTypeFilters: ProgramManagementAccountTypeFilters,
  }),
]);
export type SortOrder = "Ascending" | "Descending" | (string & {});
export const SortOrder = /*@__PURE__*/ S.String;

export type StartServicePeriodTypeSortName = "UpdatedAt" | (string & {});
export const StartServicePeriodTypeSortName = /*@__PURE__*/ S.String;

export interface StartServicePeriodTypeSort {
  sortOrder: SortOrder;
  sortBy: StartServicePeriodTypeSortName;
}
export const StartServicePeriodTypeSort = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sortOrder: SortOrder, sortBy: StartServicePeriodTypeSortName }),
).annotate({
  identifier: "StartServicePeriodTypeSort",
}) as any as S.Schema<StartServicePeriodTypeSort>;
export type RevokeServicePeriodTypeSortName = "UpdatedAt" | (string & {});
export const RevokeServicePeriodTypeSortName = /*@__PURE__*/ S.String;

export interface RevokeServicePeriodTypeSort {
  sortOrder: SortOrder;
  sortBy: RevokeServicePeriodTypeSortName;
}
export const RevokeServicePeriodTypeSort = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sortOrder: SortOrder, sortBy: RevokeServicePeriodTypeSortName }),
).annotate({
  identifier: "RevokeServicePeriodTypeSort",
}) as any as S.Schema<RevokeServicePeriodTypeSort>;
export type ProgramManagementAccountTypeSortName = "UpdatedAt" | (string & {});
export const ProgramManagementAccountTypeSortName = /*@__PURE__*/ S.String;

export interface ProgramManagementAccountTypeSort {
  sortOrder: SortOrder;
  sortBy: ProgramManagementAccountTypeSortName;
}
export const ProgramManagementAccountTypeSort = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sortOrder: SortOrder,
    sortBy: ProgramManagementAccountTypeSortName,
  }),
).annotate({
  identifier: "ProgramManagementAccountTypeSort",
}) as any as S.Schema<ProgramManagementAccountTypeSort>;
export type ListChannelHandshakesTypeSort =
  | {
      startServicePeriodTypeSort: StartServicePeriodTypeSort;
      revokeServicePeriodTypeSort?: never;
      programManagementAccountTypeSort?: never;
    }
  | {
      startServicePeriodTypeSort?: never;
      revokeServicePeriodTypeSort: RevokeServicePeriodTypeSort;
      programManagementAccountTypeSort?: never;
    }
  | {
      startServicePeriodTypeSort?: never;
      revokeServicePeriodTypeSort?: never;
      programManagementAccountTypeSort: ProgramManagementAccountTypeSort;
    };
export const ListChannelHandshakesTypeSort = /*@__PURE__*/ S.Union([
  S.Struct({ startServicePeriodTypeSort: StartServicePeriodTypeSort }),
  S.Struct({ revokeServicePeriodTypeSort: RevokeServicePeriodTypeSort }),
  S.Struct({
    programManagementAccountTypeSort: ProgramManagementAccountTypeSort,
  }),
]);
export type NextToken = string;
export interface ListChannelHandshakesRequest {
  handshakeType: HandshakeType;
  catalog: string;
  participantType: ParticipantType;
  maxResults?: number;
  statuses?: HandshakeStatus[];
  associatedResourceIdentifiers?: string[];
  handshakeTypeFilters?: ListChannelHandshakesTypeFilters;
  handshakeTypeSort?: ListChannelHandshakesTypeSort;
  nextToken?: string;
}
export const ListChannelHandshakesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    handshakeType: HandshakeType,
    catalog: S.String,
    participantType: ParticipantType,
    maxResults: S.optional(S.Number),
    statuses: S.optional(HandshakeStatusList),
    associatedResourceIdentifiers: S.optional(AssociatedResourceIdentifierList),
    handshakeTypeFilters: S.optional(ListChannelHandshakesTypeFilters),
    handshakeTypeSort: S.optional(ListChannelHandshakesTypeSort),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListChannelHandshakes" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListChannelHandshakesRequest",
}) as any as S.Schema<ListChannelHandshakesRequest>;
export type PartnerProfileDisplayName = string;
export type AssociatedResourceId = string;
export interface StartServicePeriodHandshakeDetail {
  note?: string;
  servicePeriodType?: ServicePeriodType;
  minimumNoticeDays?: string;
  startDate?: Date;
  endDate?: Date;
}
export const StartServicePeriodHandshakeDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    note: S.optional(S.String),
    servicePeriodType: S.optional(ServicePeriodType),
    minimumNoticeDays: S.optional(S.String),
    startDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    endDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
  }),
).annotate({
  identifier: "StartServicePeriodHandshakeDetail",
}) as any as S.Schema<StartServicePeriodHandshakeDetail>;
export interface RevokeServicePeriodHandshakeDetail {
  note?: string;
  servicePeriodType?: ServicePeriodType;
  minimumNoticeDays?: string;
  startDate?: Date;
  endDate?: Date;
}
export const RevokeServicePeriodHandshakeDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    note: S.optional(S.String),
    servicePeriodType: S.optional(ServicePeriodType),
    minimumNoticeDays: S.optional(S.String),
    startDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    endDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
  }),
).annotate({
  identifier: "RevokeServicePeriodHandshakeDetail",
}) as any as S.Schema<RevokeServicePeriodHandshakeDetail>;
export interface ProgramManagementAccountHandshakeDetail {
  program?: Program;
}
export const ProgramManagementAccountHandshakeDetail = /*@__PURE__*/ S.suspend(
  () => S.Struct({ program: S.optional(Program) }),
).annotate({
  identifier: "ProgramManagementAccountHandshakeDetail",
}) as any as S.Schema<ProgramManagementAccountHandshakeDetail>;
export type HandshakeDetail =
  | {
      startServicePeriodHandshakeDetail: StartServicePeriodHandshakeDetail;
      revokeServicePeriodHandshakeDetail?: never;
      programManagementAccountHandshakeDetail?: never;
    }
  | {
      startServicePeriodHandshakeDetail?: never;
      revokeServicePeriodHandshakeDetail: RevokeServicePeriodHandshakeDetail;
      programManagementAccountHandshakeDetail?: never;
    }
  | {
      startServicePeriodHandshakeDetail?: never;
      revokeServicePeriodHandshakeDetail?: never;
      programManagementAccountHandshakeDetail: ProgramManagementAccountHandshakeDetail;
    };
export const HandshakeDetail = /*@__PURE__*/ S.Union([
  S.Struct({
    startServicePeriodHandshakeDetail: StartServicePeriodHandshakeDetail,
  }),
  S.Struct({
    revokeServicePeriodHandshakeDetail: RevokeServicePeriodHandshakeDetail,
  }),
  S.Struct({
    programManagementAccountHandshakeDetail:
      ProgramManagementAccountHandshakeDetail,
  }),
]);
export interface ChannelHandshakeSummary {
  id?: string;
  arn?: string;
  catalog?: string;
  handshakeType?: HandshakeType;
  ownerAccountId?: string;
  senderAccountId?: string;
  senderDisplayName?: string;
  receiverAccountId?: string;
  associatedResourceId?: string;
  detail?: HandshakeDetail;
  createdAt?: Date;
  updatedAt?: Date;
  status?: HandshakeStatus;
}
export const ChannelHandshakeSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    arn: S.optional(S.String),
    catalog: S.optional(S.String),
    handshakeType: S.optional(HandshakeType),
    ownerAccountId: S.optional(S.String),
    senderAccountId: S.optional(S.String),
    senderDisplayName: S.optional(S.String),
    receiverAccountId: S.optional(S.String),
    associatedResourceId: S.optional(S.String),
    detail: S.optional(HandshakeDetail),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    status: S.optional(HandshakeStatus),
  }),
).annotate({
  identifier: "ChannelHandshakeSummary",
}) as any as S.Schema<ChannelHandshakeSummary>;
export type ChannelHandshakeSummaries = ChannelHandshakeSummary[];
export const ChannelHandshakeSummaries = /*@__PURE__*/ S.Array(
  ChannelHandshakeSummary,
);
export interface ListChannelHandshakesResponse {
  items?: ChannelHandshakeSummary[];
  nextToken?: string;
}
export const ListChannelHandshakesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(ChannelHandshakeSummaries),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListChannelHandshakesResponse",
}) as any as S.Schema<ListChannelHandshakesResponse>;
export type ProgramManagementAccountDisplayNameList = string[];
export const ProgramManagementAccountDisplayNameList = /*@__PURE__*/ S.Array(
  S.String,
);
export type AccountIdList = string[];
export const AccountIdList = /*@__PURE__*/ S.Array(S.String);
export type ProgramManagementAccountStatus =
  | "PENDING"
  | "ACTIVE"
  | "INACTIVE"
  | (string & {});
export const ProgramManagementAccountStatus = /*@__PURE__*/ S.String;

export type ProgramManagementAccountStatusList =
  ProgramManagementAccountStatus[];
export const ProgramManagementAccountStatusList = /*@__PURE__*/ S.Array(
  ProgramManagementAccountStatus,
);
export type ListProgramManagementAccountsSortName = "UpdatedAt" | (string & {});
export const ListProgramManagementAccountsSortName = /*@__PURE__*/ S.String;

export interface ListProgramManagementAccountsSortBase {
  sortOrder: SortOrder;
  sortBy: ListProgramManagementAccountsSortName;
}
export const ListProgramManagementAccountsSortBase = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      sortOrder: SortOrder,
      sortBy: ListProgramManagementAccountsSortName,
    }),
).annotate({
  identifier: "ListProgramManagementAccountsSortBase",
}) as any as S.Schema<ListProgramManagementAccountsSortBase>;
export interface ListProgramManagementAccountsRequest {
  catalog: string;
  maxResults?: number;
  displayNames?: string[];
  programs?: Program[];
  accountIds?: string[];
  statuses?: ProgramManagementAccountStatus[];
  sort?: ListProgramManagementAccountsSortBase;
  nextToken?: string;
}
export const ListProgramManagementAccountsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      catalog: S.String,
      maxResults: S.optional(S.Number),
      displayNames: S.optional(ProgramManagementAccountDisplayNameList),
      programs: S.optional(ProgramList),
      accountIds: S.optional(AccountIdList),
      statuses: S.optional(ProgramManagementAccountStatusList),
      sort: S.optional(ListProgramManagementAccountsSortBase),
      nextToken: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/ListProgramManagementAccounts" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListProgramManagementAccountsRequest",
}) as any as S.Schema<ListProgramManagementAccountsRequest>;
export interface ProgramManagementAccountSummary {
  id?: string;
  revision?: string;
  catalog?: string;
  program?: Program;
  displayName?: string;
  accountId?: string;
  arn?: string;
  createdAt?: Date;
  updatedAt?: Date;
  startDate?: Date;
  status?: ProgramManagementAccountStatus;
}
export const ProgramManagementAccountSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    revision: S.optional(S.String),
    catalog: S.optional(S.String),
    program: S.optional(Program),
    displayName: S.optional(S.String),
    accountId: S.optional(S.String),
    arn: S.optional(S.String),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    startDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    status: S.optional(ProgramManagementAccountStatus),
  }),
).annotate({
  identifier: "ProgramManagementAccountSummary",
}) as any as S.Schema<ProgramManagementAccountSummary>;
export type ProgramManagementAccountSummaries =
  ProgramManagementAccountSummary[];
export const ProgramManagementAccountSummaries = /*@__PURE__*/ S.Array(
  ProgramManagementAccountSummary,
);
export interface ListProgramManagementAccountsResponse {
  items?: ProgramManagementAccountSummary[];
  nextToken?: string;
}
export const ListProgramManagementAccountsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      items: S.optional(ProgramManagementAccountSummaries),
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListProgramManagementAccountsResponse",
}) as any as S.Schema<ListProgramManagementAccountsResponse>;
export type AssociationTypeList = AssociationType[];
export const AssociationTypeList = /*@__PURE__*/ S.Array(AssociationType);
export type RelationshipDisplayNameList = string[];
export const RelationshipDisplayNameList = /*@__PURE__*/ S.Array(S.String);
export type ProgramManagementAccountIdentifierList = string[];
export const ProgramManagementAccountIdentifierList = /*@__PURE__*/ S.Array(
  S.String,
);
export type ListRelationshipsSortName = "UpdatedAt" | (string & {});
export const ListRelationshipsSortName = /*@__PURE__*/ S.String;

export interface ListRelationshipsSortBase {
  sortOrder: SortOrder;
  sortBy: ListRelationshipsSortName;
}
export const ListRelationshipsSortBase = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sortOrder: SortOrder, sortBy: ListRelationshipsSortName }),
).annotate({
  identifier: "ListRelationshipsSortBase",
}) as any as S.Schema<ListRelationshipsSortBase>;
export interface ListRelationshipsRequest {
  catalog: string;
  maxResults?: number;
  associatedAccountIds?: string[];
  associationTypes?: AssociationType[];
  displayNames?: string[];
  programManagementAccountIdentifiers?: string[];
  sort?: ListRelationshipsSortBase;
  nextToken?: string;
}
export const ListRelationshipsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    catalog: S.String,
    maxResults: S.optional(S.Number),
    associatedAccountIds: S.optional(AccountIdList),
    associationTypes: S.optional(AssociationTypeList),
    displayNames: S.optional(RelationshipDisplayNameList),
    programManagementAccountIdentifiers: S.optional(
      ProgramManagementAccountIdentifierList,
    ),
    sort: S.optional(ListRelationshipsSortBase),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListRelationships" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListRelationshipsRequest",
}) as any as S.Schema<ListRelationshipsRequest>;
export interface RelationshipSummary {
  arn?: string;
  id?: string;
  revision?: string;
  catalog?: string;
  associationType?: AssociationType;
  programManagementAccountId?: string;
  associatedAccountId?: string;
  displayName?: string;
  sector?: Sector;
  createdAt?: Date;
  updatedAt?: Date;
  startDate?: Date;
}
export const RelationshipSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    id: S.optional(S.String),
    revision: S.optional(S.String),
    catalog: S.optional(S.String),
    associationType: S.optional(AssociationType),
    programManagementAccountId: S.optional(S.String),
    associatedAccountId: S.optional(S.String),
    displayName: S.optional(S.String),
    sector: S.optional(Sector),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    startDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "RelationshipSummary",
}) as any as S.Schema<RelationshipSummary>;
export type RelationshipSummaries = RelationshipSummary[];
export const RelationshipSummaries = /*@__PURE__*/ S.Array(RelationshipSummary);
export interface ListRelationshipsResponse {
  items?: RelationshipSummary[];
  nextToken?: string;
}
export const ListRelationshipsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(RelationshipSummaries),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListRelationshipsResponse",
}) as any as S.Schema<ListRelationshipsResponse>;
export type TaggableArn = string;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListTagsForResource" }),
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
  tags?: Tag[];
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: S.optional(TagList) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface RejectChannelHandshakeRequest {
  catalog: string;
  identifier: string;
}
export const RejectChannelHandshakeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ catalog: S.String, identifier: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/RejectChannelHandshake" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RejectChannelHandshakeRequest",
}) as any as S.Schema<RejectChannelHandshakeRequest>;
export interface RejectChannelHandshakeDetail {
  id?: string;
  arn?: string;
  status?: HandshakeStatus;
}
export const RejectChannelHandshakeDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    arn: S.optional(S.String),
    status: S.optional(HandshakeStatus),
  }),
).annotate({
  identifier: "RejectChannelHandshakeDetail",
}) as any as S.Schema<RejectChannelHandshakeDetail>;
export interface RejectChannelHandshakeResponse {
  channelHandshakeDetail?: RejectChannelHandshakeDetail;
}
export const RejectChannelHandshakeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    channelHandshakeDetail: S.optional(RejectChannelHandshakeDetail),
  }),
).annotate({
  identifier: "RejectChannelHandshakeResponse",
}) as any as S.Schema<RejectChannelHandshakeResponse>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String, tags: TagList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/TagResource" }),
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
  S.Struct({ resourceArn: S.String, tagKeys: TagKeyList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/UntagResource" }),
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
export interface UpdateProgramManagementAccountRequest {
  catalog: string;
  identifier: string;
  revision?: string;
  displayName?: string;
}
export const UpdateProgramManagementAccountRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      catalog: S.String,
      identifier: S.String,
      revision: S.optional(S.String),
      displayName: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/UpdateProgramManagementAccount" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateProgramManagementAccountRequest",
}) as any as S.Schema<UpdateProgramManagementAccountRequest>;
export interface UpdateProgramManagementAccountDetail {
  id?: string;
  arn?: string;
  revision?: string;
  displayName?: string;
}
export const UpdateProgramManagementAccountDetail = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      id: S.optional(S.String),
      arn: S.optional(S.String),
      revision: S.optional(S.String),
      displayName: S.optional(S.String),
    }),
).annotate({
  identifier: "UpdateProgramManagementAccountDetail",
}) as any as S.Schema<UpdateProgramManagementAccountDetail>;
export interface UpdateProgramManagementAccountResponse {
  programManagementAccountDetail?: UpdateProgramManagementAccountDetail;
}
export const UpdateProgramManagementAccountResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      programManagementAccountDetail: S.optional(
        UpdateProgramManagementAccountDetail,
      ),
    }),
).annotate({
  identifier: "UpdateProgramManagementAccountResponse",
}) as any as S.Schema<UpdateProgramManagementAccountResponse>;
export interface UpdateRelationshipRequest {
  catalog: string;
  identifier: string;
  programManagementAccountIdentifier: string;
  revision?: string;
  displayName?: string;
  requestedSupportPlan?: SupportPlan;
}
export const UpdateRelationshipRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    catalog: S.String,
    identifier: S.String,
    programManagementAccountIdentifier: S.String,
    revision: S.optional(S.String),
    displayName: S.optional(S.String),
    requestedSupportPlan: S.optional(SupportPlan),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/UpdateRelationship" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateRelationshipRequest",
}) as any as S.Schema<UpdateRelationshipRequest>;
export interface UpdateRelationshipDetail {
  arn?: string;
  id?: string;
  revision?: string;
  displayName?: string;
}
export const UpdateRelationshipDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    id: S.optional(S.String),
    revision: S.optional(S.String),
    displayName: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateRelationshipDetail",
}) as any as S.Schema<UpdateRelationshipDetail>;
export interface UpdateRelationshipResponse {
  relationshipDetail?: UpdateRelationshipDetail;
}
export const UpdateRelationshipResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ relationshipDetail: S.optional(UpdateRelationshipDetail) }),
).annotate({
  identifier: "UpdateRelationshipResponse",
}) as any as S.Schema<UpdateRelationshipResponse>;
export type ValidationExceptionReason =
  | "REQUEST_VALIDATION_FAILED"
  | "BUSINESS_VALIDATION_FAILED"
  | (string & {});
export const ValidationExceptionReason = /*@__PURE__*/ S.String;

export interface ValidationExceptionField {
  name: string;
  code: string;
  message: string;
}
export const ValidationExceptionField = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, code: S.String, message: S.String }),
).annotate({
  identifier: "ValidationExceptionField",
}) as any as S.Schema<ValidationExceptionField>;
export type ValidationExceptionFieldList = ValidationExceptionField[];
export const ValidationExceptionFieldList = /*@__PURE__*/ S.Array(
  ValidationExceptionField,
);
export type AcceptChannelHandshakeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Accepts a pending channel handshake request from another AWS account.
 */
export const acceptChannelHandshake: API.OperationMethod<
  AcceptChannelHandshakeRequest,
  AcceptChannelHandshakeResponse,
  AcceptChannelHandshakeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AcceptChannelHandshakeRequest,
  output: AcceptChannelHandshakeResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptChannelHandshake",
}));

export type CancelChannelHandshakeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels a pending channel handshake request.
 */
export const cancelChannelHandshake: API.OperationMethod<
  CancelChannelHandshakeRequest,
  CancelChannelHandshakeResponse,
  CancelChannelHandshakeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelChannelHandshakeRequest,
  output: CancelChannelHandshakeResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelChannelHandshake",
}));

export type CreateChannelHandshakeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new channel handshake request to establish a partnership with another AWS account.
 */
export const createChannelHandshake: API.OperationMethod<
  CreateChannelHandshakeRequest,
  CreateChannelHandshakeResponse,
  CreateChannelHandshakeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateChannelHandshakeRequest,
  output: CreateChannelHandshakeResponse,
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
  operationName: "CreateChannelHandshake",
}));

export type CreateProgramManagementAccountError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new program management account for managing partner relationships.
 */
export const createProgramManagementAccount: API.OperationMethod<
  CreateProgramManagementAccountRequest,
  CreateProgramManagementAccountResponse,
  CreateProgramManagementAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateProgramManagementAccountRequest,
  output: CreateProgramManagementAccountResponse,
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
  operationName: "CreateProgramManagementAccount",
}));

export type CreateRelationshipError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new partner relationship between accounts.
 */
export const createRelationship: API.OperationMethod<
  CreateRelationshipRequest,
  CreateRelationshipResponse,
  CreateRelationshipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRelationshipRequest,
  output: CreateRelationshipResponse,
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
  operationName: "CreateRelationship",
}));

export type DeleteProgramManagementAccountError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a program management account.
 */
export const deleteProgramManagementAccount: API.OperationMethod<
  DeleteProgramManagementAccountRequest,
  DeleteProgramManagementAccountResponse,
  DeleteProgramManagementAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteProgramManagementAccountRequest,
  output: DeleteProgramManagementAccountResponse,
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
  operationName: "DeleteProgramManagementAccount",
}));

export type DeleteRelationshipError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a partner relationship.
 */
export const deleteRelationship: API.OperationMethod<
  DeleteRelationshipRequest,
  DeleteRelationshipResponse,
  DeleteRelationshipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRelationshipRequest,
  output: DeleteRelationshipResponse,
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
  operationName: "DeleteRelationship",
}));

export type GetRelationshipError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details of a specific partner relationship.
 */
export const getRelationship: API.OperationMethod<
  GetRelationshipRequest,
  GetRelationshipResponse,
  GetRelationshipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRelationshipRequest,
  output: GetRelationshipResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRelationship",
}));

export type ListChannelHandshakesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists channel handshakes based on specified criteria.
 */
export const listChannelHandshakes: API.PaginatedOperationMethod<
  ListChannelHandshakesRequest,
  ListChannelHandshakesResponse,
  ListChannelHandshakesError,
  Credentials | HttpClient.HttpClient,
  ChannelHandshakeSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListChannelHandshakesRequest,
  output: ListChannelHandshakesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListChannelHandshakes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListProgramManagementAccountsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists program management accounts based on specified criteria.
 */
export const listProgramManagementAccounts: API.PaginatedOperationMethod<
  ListProgramManagementAccountsRequest,
  ListProgramManagementAccountsResponse,
  ListProgramManagementAccountsError,
  Credentials | HttpClient.HttpClient,
  ProgramManagementAccountSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListProgramManagementAccountsRequest,
  output: ListProgramManagementAccountsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProgramManagementAccounts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRelationshipsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists partner relationships based on specified criteria.
 */
export const listRelationships: API.PaginatedOperationMethod<
  ListRelationshipsRequest,
  ListRelationshipsResponse,
  ListRelationshipsError,
  Credentials | HttpClient.HttpClient,
  RelationshipSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRelationshipsRequest,
  output: ListRelationshipsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRelationships",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
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
 * Lists tags associated with a specific resource.
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

export type RejectChannelHandshakeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Rejects a pending channel handshake request.
 */
export const rejectChannelHandshake: API.OperationMethod<
  RejectChannelHandshakeRequest,
  RejectChannelHandshakeResponse,
  RejectChannelHandshakeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RejectChannelHandshakeRequest,
  output: RejectChannelHandshakeResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RejectChannelHandshake",
}));

export type TagResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds or updates tags for a specified resource.
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
    ConflictException,
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
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes tags from a specified resource.
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
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateProgramManagementAccountError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the properties of a program management account.
 */
export const updateProgramManagementAccount: API.OperationMethod<
  UpdateProgramManagementAccountRequest,
  UpdateProgramManagementAccountResponse,
  UpdateProgramManagementAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateProgramManagementAccountRequest,
  output: UpdateProgramManagementAccountResponse,
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
  operationName: "UpdateProgramManagementAccount",
}));

export type UpdateRelationshipError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the properties of a partner relationship.
 */
export const updateRelationship: API.OperationMethod<
  UpdateRelationshipRequest,
  UpdateRelationshipResponse,
  UpdateRelationshipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRelationshipRequest,
  output: UpdateRelationshipResponse,
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
  operationName: "UpdateRelationship",
}));
