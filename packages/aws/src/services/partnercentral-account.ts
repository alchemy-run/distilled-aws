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
  sdkId: "PartnerCentral Account",
  serviceShapeName: "PartnerCentralAccount",
});
const auth = T.AwsAuthSigv4({ name: "partnercentral-account" });
const ver = T.ServiceVersion("2025-04-04");
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
            `https://partnercentral-account-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        return e(
          `https://partnercentral-account.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
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
      message: S.String.pipe(T.ErrorMessage()),
      Reason: S.suspend(() => AccessDeniedExceptionReason).annotate({
        identifier: "AccessDeniedExceptionReason",
      }),
    },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      Reason: S.suspend(() => ConflictExceptionReason).annotate({
        identifier: "ConflictExceptionReason",
      }),
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
      Reason: S.suspend(() => ResourceNotFoundExceptionReason).annotate({
        identifier: "ResourceNotFoundExceptionReason",
      }),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      Reason: S.suspend(() => ServiceQuotaExceededExceptionReason).annotate({
        identifier: "ServiceQuotaExceededExceptionReason",
      }),
    },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      ServiceCode: S.optional(S.String),
      QuotaCode: S.optional(S.String),
    },
    T.all(T.HttpError(429), T.Retryable()),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      Reason: S.suspend(() => ValidationExceptionReason).annotate({
        identifier: "ValidationExceptionReason",
      }),
      ErrorDetails: S.optional(
        S.suspend(() => ValidationErrorList).annotate({
          identifier: "ValidationErrorList",
        }),
      ),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type Catalog = string;
export type ConnectionInvitationId = string;
export type ClientToken = string;
export interface AcceptConnectionInvitationRequest {
  Catalog: string;
  Identifier: string;
  ClientToken: string;
}
export const AcceptConnectionInvitationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    Identifier: S.String,
    ClientToken: S.String.pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "AcceptConnectionInvitationRequest",
}) as any as S.Schema<AcceptConnectionInvitationRequest>;
export type ConnectionId = string;
export type ConnectionArn = string;
export type AwsAccountId = string;
export type ConnectionType =
  | "OPPORTUNITY_COLLABORATION"
  | "SUBSIDIARY"
  | (string & {});
export const ConnectionType = S.String;

export type Email = string;
export type SensitiveUnicodeString = string | redacted.Redacted<string>;
export type ConnectionTypeStatus = "ACTIVE" | "CANCELED" | (string & {});
export const ConnectionTypeStatus = S.String;

export type PartnerProfileId = string;
export type UnicodeString = string;
export interface PartnerProfileSummary {
  Id: string;
  Name: string;
}
export const PartnerProfileSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.String, Name: S.String }),
).annotate({
  identifier: "PartnerProfileSummary",
}) as any as S.Schema<PartnerProfileSummary>;
export type SellerProfileId = string;
export interface SellerProfileSummary {
  Id: string;
  Name: string;
}
export const SellerProfileSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.String, Name: S.String }),
).annotate({
  identifier: "SellerProfileSummary",
}) as any as S.Schema<SellerProfileSummary>;
export interface AccountSummary {
  Name: string;
}
export const AccountSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }),
).annotate({ identifier: "AccountSummary" }) as any as S.Schema<AccountSummary>;
export type Participant =
  | {
      PartnerProfile: PartnerProfileSummary;
      SellerProfile?: never;
      Account?: never;
    }
  | {
      PartnerProfile?: never;
      SellerProfile: SellerProfileSummary;
      Account?: never;
    }
  | { PartnerProfile?: never; SellerProfile?: never; Account: AccountSummary };
export const Participant = /*@__PURE__*/ S.Union([
  S.Struct({ PartnerProfile: PartnerProfileSummary }),
  S.Struct({ SellerProfile: SellerProfileSummary }),
  S.Struct({ Account: AccountSummary }),
]);
export interface ConnectionTypeDetail {
  CreatedAt: Date;
  InviterEmail: string;
  InviterName: string | redacted.Redacted<string>;
  Status: ConnectionTypeStatus;
  CanceledAt?: Date;
  CanceledBy?: string;
  OtherParticipant: Participant;
}
export const ConnectionTypeDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    InviterEmail: S.String,
    InviterName: SensitiveString,
    Status: ConnectionTypeStatus,
    CanceledAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    CanceledBy: S.optional(S.String),
    OtherParticipant: Participant,
  }),
).annotate({
  identifier: "ConnectionTypeDetail",
}) as any as S.Schema<ConnectionTypeDetail>;
export type ConnectionTypeDetailMap = {
  [key in ConnectionType]?: ConnectionTypeDetail;
};
export const ConnectionTypeDetailMap = /*@__PURE__*/ S.Record(
  ConnectionType,
  ConnectionTypeDetail.pipe(S.optional),
);
export interface Connection {
  Catalog: string;
  Id: string;
  Arn: string;
  OtherParticipantAccountId: string;
  UpdatedAt: Date;
  ConnectionTypes: { [key: string]: ConnectionTypeDetail | undefined };
}
export const Connection = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    Id: S.String,
    Arn: S.String,
    OtherParticipantAccountId: S.String,
    UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ConnectionTypes: ConnectionTypeDetailMap,
  }),
).annotate({ identifier: "Connection" }) as any as S.Schema<Connection>;
export interface AcceptConnectionInvitationResponse {
  Connection: Connection;
}
export const AcceptConnectionInvitationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Connection: Connection }),
).annotate({
  identifier: "AcceptConnectionInvitationResponse",
}) as any as S.Schema<AcceptConnectionInvitationResponse>;
export type PartnerIdentifier = string;
export type EmailVerificationCode = string | redacted.Redacted<string>;
export interface AssociateAwsTrainingCertificationEmailDomainRequest {
  Catalog: string;
  Identifier: string;
  ClientToken?: string;
  Email: string;
  EmailVerificationCode: string | redacted.Redacted<string>;
}
export const AssociateAwsTrainingCertificationEmailDomainRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Catalog: S.String,
      Identifier: S.String,
      ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
      Email: S.String,
      EmailVerificationCode: SensitiveString,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "AssociateAwsTrainingCertificationEmailDomainRequest",
  }) as any as S.Schema<AssociateAwsTrainingCertificationEmailDomainRequest>;
export interface AssociateAwsTrainingCertificationEmailDomainResponse {}
export const AssociateAwsTrainingCertificationEmailDomainResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "AssociateAwsTrainingCertificationEmailDomainResponse",
  }) as any as S.Schema<AssociateAwsTrainingCertificationEmailDomainResponse>;
export interface CancelConnectionRequest {
  Catalog: string;
  Identifier: string;
  ConnectionType: ConnectionType;
  Reason: string;
  ClientToken: string;
}
export const CancelConnectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    Identifier: S.String,
    ConnectionType: ConnectionType,
    Reason: S.String,
    ClientToken: S.String.pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CancelConnectionRequest",
}) as any as S.Schema<CancelConnectionRequest>;
export interface CancelConnectionResponse {
  Catalog: string;
  Id: string;
  Arn: string;
  OtherParticipantAccountId: string;
  UpdatedAt: Date;
  ConnectionTypes: { [key: string]: ConnectionTypeDetail | undefined };
}
export const CancelConnectionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    Id: S.String,
    Arn: S.String,
    OtherParticipantAccountId: S.String,
    UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ConnectionTypes: ConnectionTypeDetailMap,
  }),
).annotate({
  identifier: "CancelConnectionResponse",
}) as any as S.Schema<CancelConnectionResponse>;
export interface CancelConnectionInvitationRequest {
  Catalog: string;
  Identifier: string;
  ClientToken: string;
}
export const CancelConnectionInvitationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    Identifier: S.String,
    ClientToken: S.String.pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CancelConnectionInvitationRequest",
}) as any as S.Schema<CancelConnectionInvitationRequest>;
export type ConnectionInvitationArn = string;
export type ParticipantIdentifier = string;
export type ParticipantType = "SENDER" | "RECEIVER" | (string & {});
export const ParticipantType = S.String;

export type InvitationStatus =
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | "CANCELED"
  | "EXPIRED"
  | (string & {});
export const InvitationStatus = S.String;

export type UnicodeStringIncludingNewLine = string;
export interface CancelConnectionInvitationResponse {
  Catalog: string;
  Id: string;
  Arn: string;
  ConnectionId?: string;
  ConnectionType: ConnectionType;
  CreatedAt: Date;
  UpdatedAt: Date;
  ExpiresAt?: Date;
  OtherParticipantIdentifier: string;
  ParticipantType: ParticipantType;
  Status: InvitationStatus;
  InvitationMessage: string;
  InviterEmail: string;
  InviterName: string | redacted.Redacted<string>;
}
export const CancelConnectionInvitationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    Id: S.String,
    Arn: S.String,
    ConnectionId: S.optional(S.String),
    ConnectionType: ConnectionType,
    CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ExpiresAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    OtherParticipantIdentifier: S.String,
    ParticipantType: ParticipantType,
    Status: InvitationStatus,
    InvitationMessage: S.String,
    InviterEmail: S.String,
    InviterName: SensitiveString,
  }),
).annotate({
  identifier: "CancelConnectionInvitationResponse",
}) as any as S.Schema<CancelConnectionInvitationResponse>;
export type ProfileTaskId = string;
export interface CancelProfileUpdateTaskRequest {
  Catalog: string;
  Identifier: string;
  ClientToken?: string;
  TaskId: string;
}
export const CancelProfileUpdateTaskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    Identifier: S.String,
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    TaskId: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CancelProfileUpdateTaskRequest",
}) as any as S.Schema<CancelProfileUpdateTaskRequest>;
export type PartnerArn = string;
export type PartnerId = string;
export type Url = string;
export type PrimarySolutionType =
  | "SOFTWARE_PRODUCTS"
  | "CONSULTING_SERVICES"
  | "PROFESSIONAL_SERVICES"
  | "MANAGED_SERVICES"
  | "HARDWARE_PRODUCTS"
  | "COMMUNICATION_SERVICES"
  | "VALUE_ADDED_RESALE_AWS_SERVICES"
  | "TRAINING_SERVICES"
  | (string & {});
export const PrimarySolutionType = S.String;

export type IndustrySegment =
  | "AGRICULTURE_MINING"
  | "BIOTECHNOLOGY"
  | "BUSINESS_CONSUMER_SERVICES"
  | "BUSINESS_SERV"
  | "COMMUNICATIONS"
  | "COMPUTER_HARDWARE"
  | "COMPUTERS_ELECTRONICS"
  | "COMPUTER_SOFTWARE"
  | "CONSUMER_GOODS"
  | "CONSUMER_RELATED"
  | "EDUCATION"
  | "ENERGY_UTILITIES"
  | "FINANCIAL_SERVICES"
  | "GAMING"
  | "GOVERNMENT"
  | "GOVERNMENT_EDUCATION_PUBLIC_SERVICES"
  | "HEALTHCARE"
  | "HEALTHCARE_PHARMACEUTICALS_BIOTECH"
  | "INDUSTRIAL_ENERGY"
  | "INTERNET_SPECIFIC"
  | "LIFE_SCIENCES"
  | "MANUFACTURING"
  | "MEDIA_ENTERTAINMENT_LEISURE"
  | "MEDIA_ENTERTAINMENT"
  | "MEDICAL_HEALTH"
  | "NON_PROFIT_ORGANIZATION"
  | "OTHER"
  | "PROFESSIONAL_SERVICES"
  | "REAL_ESTATE_CONSTRUCTION"
  | "RETAIL"
  | "RETAIL_WHOLESALE_DISTRIBUTION"
  | "SEMICONDUCTOR_ELECTR"
  | "SOFTWARE_INTERNET"
  | "TELECOMMUNICATIONS"
  | "TRANSPORTATION_LOGISTICS"
  | "TRAVEL_HOSPITALITY"
  | "WHOLESALE_DISTRIBUTION"
  | (string & {});
export const IndustrySegment = S.String;

export type IndustrySegmentList = IndustrySegment[];
export const IndustrySegmentList = /*@__PURE__*/ S.Array(IndustrySegment);
export type Locale = string;
export interface LocalizedContent {
  DisplayName: string;
  Description: string;
  WebsiteUrl: string;
  LogoUrl: string;
  Locale: string;
}
export const LocalizedContent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DisplayName: S.String,
    Description: S.String,
    WebsiteUrl: S.String,
    LogoUrl: S.String,
    Locale: S.String,
  }),
).annotate({
  identifier: "LocalizedContent",
}) as any as S.Schema<LocalizedContent>;
export type LocalizedContentList = LocalizedContent[];
export const LocalizedContentList = /*@__PURE__*/ S.Array(LocalizedContent);
export type CountryCode = string;
export type SubdivisionCode = string;
export interface Headquarters {
  CountryCode: string;
  SubdivisionCode: string;
}
export const Headquarters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CountryCode: S.String, SubdivisionCode: S.String }),
).annotate({ identifier: "Headquarters" }) as any as S.Schema<Headquarters>;
export interface TaskDetails {
  DisplayName: string;
  Description: string;
  WebsiteUrl: string;
  LogoUrl: string;
  PrimarySolutionType: PrimarySolutionType;
  IndustrySegments: IndustrySegment[];
  TranslationSourceLocale: string;
  LocalizedContents?: LocalizedContent[];
  Headquarters?: Headquarters;
}
export const TaskDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DisplayName: S.String,
    Description: S.String,
    WebsiteUrl: S.String,
    LogoUrl: S.String,
    PrimarySolutionType: PrimarySolutionType,
    IndustrySegments: IndustrySegmentList,
    TranslationSourceLocale: S.String,
    LocalizedContents: S.optional(LocalizedContentList),
    Headquarters: S.optional(Headquarters),
  }),
).annotate({ identifier: "TaskDetails" }) as any as S.Schema<TaskDetails>;
export type ProfileTaskStatus =
  | "IN_PROGRESS"
  | "CANCELED"
  | "SUCCEEDED"
  | "FAILED"
  | (string & {});
export const ProfileTaskStatus = S.String;

export type ProfileValidationErrorReason =
  | "INVALID_CONTENT"
  | "DUPLICATE_PROFILE"
  | "INVALID_LOGO"
  | "INVALID_LOGO_URL"
  | "INVALID_LOGO_FILE"
  | "INVALID_LOGO_SIZE"
  | "INVALID_WEBSITE_URL"
  | (string & {});
export const ProfileValidationErrorReason = S.String;

export interface ErrorDetail {
  Locale: string;
  Message: string;
  Reason: ProfileValidationErrorReason;
}
export const ErrorDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Locale: S.String,
    Message: S.String,
    Reason: ProfileValidationErrorReason,
  }),
).annotate({ identifier: "ErrorDetail" }) as any as S.Schema<ErrorDetail>;
export type ErrorDetailList = ErrorDetail[];
export const ErrorDetailList = /*@__PURE__*/ S.Array(ErrorDetail);
export interface CancelProfileUpdateTaskResponse {
  Catalog: string;
  Arn: string;
  Id: string;
  TaskId: string;
  TaskDetails: TaskDetails;
  StartedAt: Date;
  Status: ProfileTaskStatus;
  EndedAt?: Date;
  ErrorDetailList?: ErrorDetail[];
}
export const CancelProfileUpdateTaskResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    Arn: S.String,
    Id: S.String,
    TaskId: S.String,
    TaskDetails: TaskDetails,
    StartedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    Status: ProfileTaskStatus,
    EndedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    ErrorDetailList: S.optional(ErrorDetailList),
  }),
).annotate({
  identifier: "CancelProfileUpdateTaskResponse",
}) as any as S.Schema<CancelProfileUpdateTaskResponse>;
export interface CreateConnectionInvitationRequest {
  Catalog: string;
  ClientToken: string;
  ConnectionType: ConnectionType;
  Email: string;
  Message: string;
  Name: string | redacted.Redacted<string>;
  ReceiverIdentifier: string;
}
export const CreateConnectionInvitationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    ClientToken: S.String.pipe(T.IdempotencyToken()),
    ConnectionType: ConnectionType,
    Email: S.String,
    Message: S.String,
    Name: SensitiveString,
    ReceiverIdentifier: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateConnectionInvitationRequest",
}) as any as S.Schema<CreateConnectionInvitationRequest>;
export interface CreateConnectionInvitationResponse {
  Catalog: string;
  Id: string;
  Arn: string;
  ConnectionId?: string;
  ConnectionType: ConnectionType;
  CreatedAt: Date;
  UpdatedAt: Date;
  ExpiresAt?: Date;
  OtherParticipantIdentifier: string;
  ParticipantType: ParticipantType;
  Status: InvitationStatus;
  InvitationMessage: string;
  InviterEmail: string;
  InviterName: string | redacted.Redacted<string>;
}
export const CreateConnectionInvitationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    Id: S.String,
    Arn: S.String,
    ConnectionId: S.optional(S.String),
    ConnectionType: ConnectionType,
    CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ExpiresAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    OtherParticipantIdentifier: S.String,
    ParticipantType: ParticipantType,
    Status: InvitationStatus,
    InvitationMessage: S.String,
    InviterEmail: S.String,
    InviterName: SensitiveString,
  }),
).annotate({
  identifier: "CreateConnectionInvitationResponse",
}) as any as S.Schema<CreateConnectionInvitationResponse>;
export interface AllianceLeadContact {
  FirstName: string | redacted.Redacted<string>;
  LastName: string | redacted.Redacted<string>;
  Email: string;
  BusinessTitle: string | redacted.Redacted<string>;
}
export const AllianceLeadContact = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FirstName: SensitiveString,
    LastName: SensitiveString,
    Email: S.String,
    BusinessTitle: SensitiveString,
  }),
).annotate({
  identifier: "AllianceLeadContact",
}) as any as S.Schema<AllianceLeadContact>;
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
export interface CreatePartnerRequest {
  Catalog: string;
  ClientToken?: string;
  LegalName: string | redacted.Redacted<string>;
  PrimarySolutionType: PrimarySolutionType;
  AllianceLeadContact: AllianceLeadContact;
  EmailVerificationCode: string | redacted.Redacted<string>;
  Tags?: Tag[];
}
export const CreatePartnerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    LegalName: SensitiveString,
    PrimarySolutionType: PrimarySolutionType,
    AllianceLeadContact: AllianceLeadContact,
    EmailVerificationCode: SensitiveString,
    Tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreatePartnerRequest",
}) as any as S.Schema<CreatePartnerRequest>;
export interface PartnerProfile {
  DisplayName: string;
  Description: string;
  WebsiteUrl: string;
  LogoUrl: string;
  PrimarySolutionType: PrimarySolutionType;
  IndustrySegments: IndustrySegment[];
  TranslationSourceLocale: string;
  LocalizedContents?: LocalizedContent[];
  Headquarters?: Headquarters;
  ProfileId?: string;
}
export const PartnerProfile = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DisplayName: S.String,
    Description: S.String,
    WebsiteUrl: S.String,
    LogoUrl: S.String,
    PrimarySolutionType: PrimarySolutionType,
    IndustrySegments: IndustrySegmentList,
    TranslationSourceLocale: S.String,
    LocalizedContents: S.optional(LocalizedContentList),
    Headquarters: S.optional(Headquarters),
    ProfileId: S.optional(S.String),
  }),
).annotate({ identifier: "PartnerProfile" }) as any as S.Schema<PartnerProfile>;
export type DomainName = string;
export interface PartnerDomain {
  DomainName: string;
  RegisteredAt: Date;
}
export const PartnerDomain = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.String,
    RegisteredAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({ identifier: "PartnerDomain" }) as any as S.Schema<PartnerDomain>;
export type PartnerDomainList = PartnerDomain[];
export const PartnerDomainList = /*@__PURE__*/ S.Array(PartnerDomain);
export interface CreatePartnerResponse {
  Catalog: string;
  Arn: string;
  Id: string;
  LegalName: string | redacted.Redacted<string>;
  CreatedAt: Date;
  Profile: PartnerProfile;
  AwsTrainingCertificationEmailDomains?: PartnerDomain[];
  AllianceLeadContact: AllianceLeadContact;
}
export const CreatePartnerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    Arn: S.String,
    Id: S.String,
    LegalName: SensitiveString,
    CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    Profile: PartnerProfile,
    AwsTrainingCertificationEmailDomains: S.optional(PartnerDomainList),
    AllianceLeadContact: AllianceLeadContact,
  }),
).annotate({
  identifier: "CreatePartnerResponse",
}) as any as S.Schema<CreatePartnerResponse>;
export interface DisassociateAwsTrainingCertificationEmailDomainRequest {
  Catalog: string;
  Identifier: string;
  ClientToken?: string;
  DomainName: string;
}
export const DisassociateAwsTrainingCertificationEmailDomainRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Catalog: S.String,
      Identifier: S.String,
      ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
      DomainName: S.String,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "DisassociateAwsTrainingCertificationEmailDomainRequest",
  }) as any as S.Schema<DisassociateAwsTrainingCertificationEmailDomainRequest>;
export interface DisassociateAwsTrainingCertificationEmailDomainResponse {}
export const DisassociateAwsTrainingCertificationEmailDomainResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "DisassociateAwsTrainingCertificationEmailDomainResponse",
  }) as any as S.Schema<DisassociateAwsTrainingCertificationEmailDomainResponse>;
export interface GetAllianceLeadContactRequest {
  Catalog: string;
  Identifier: string;
}
export const GetAllianceLeadContactRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Catalog: S.String, Identifier: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetAllianceLeadContactRequest",
}) as any as S.Schema<GetAllianceLeadContactRequest>;
export interface GetAllianceLeadContactResponse {
  Catalog: string;
  Arn: string;
  Id: string;
  AllianceLeadContact: AllianceLeadContact;
}
export const GetAllianceLeadContactResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    Arn: S.String,
    Id: S.String,
    AllianceLeadContact: AllianceLeadContact,
  }),
).annotate({
  identifier: "GetAllianceLeadContactResponse",
}) as any as S.Schema<GetAllianceLeadContactResponse>;
export interface GetConnectionRequest {
  Catalog: string;
  Identifier: string;
}
export const GetConnectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Catalog: S.String, Identifier: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetConnectionRequest",
}) as any as S.Schema<GetConnectionRequest>;
export interface GetConnectionResponse {
  Catalog: string;
  Id: string;
  Arn: string;
  OtherParticipantAccountId: string;
  UpdatedAt: Date;
  ConnectionTypes: { [key: string]: ConnectionTypeDetail | undefined };
}
export const GetConnectionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    Id: S.String,
    Arn: S.String,
    OtherParticipantAccountId: S.String,
    UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ConnectionTypes: ConnectionTypeDetailMap,
  }),
).annotate({
  identifier: "GetConnectionResponse",
}) as any as S.Schema<GetConnectionResponse>;
export interface GetConnectionInvitationRequest {
  Catalog: string;
  Identifier: string;
}
export const GetConnectionInvitationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Catalog: S.String, Identifier: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetConnectionInvitationRequest",
}) as any as S.Schema<GetConnectionInvitationRequest>;
export interface GetConnectionInvitationResponse {
  Catalog: string;
  Id: string;
  Arn: string;
  ConnectionId?: string;
  ConnectionType: ConnectionType;
  CreatedAt: Date;
  UpdatedAt: Date;
  ExpiresAt?: Date;
  OtherParticipantIdentifier: string;
  ParticipantType: ParticipantType;
  Status: InvitationStatus;
  InvitationMessage: string;
  InviterEmail: string;
  InviterName: string | redacted.Redacted<string>;
}
export const GetConnectionInvitationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    Id: S.String,
    Arn: S.String,
    ConnectionId: S.optional(S.String),
    ConnectionType: ConnectionType,
    CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ExpiresAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    OtherParticipantIdentifier: S.String,
    ParticipantType: ParticipantType,
    Status: InvitationStatus,
    InvitationMessage: S.String,
    InviterEmail: S.String,
    InviterName: SensitiveString,
  }),
).annotate({
  identifier: "GetConnectionInvitationResponse",
}) as any as S.Schema<GetConnectionInvitationResponse>;
export interface GetConnectionPreferencesRequest {
  Catalog: string;
}
export const GetConnectionPreferencesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Catalog: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetConnectionPreferencesRequest",
}) as any as S.Schema<GetConnectionPreferencesRequest>;
export type ConnectionPreferencesArn = string;
export type AccessType =
  | "ALLOW_ALL"
  | "DENY_ALL"
  | "ALLOW_BY_DEFAULT_DENY_SOME"
  | (string & {});
export const AccessType = S.String;

export type ParticipantIdentifierList = string[];
export const ParticipantIdentifierList = /*@__PURE__*/ S.Array(S.String);
export type Revision = number;
export interface GetConnectionPreferencesResponse {
  Catalog: string;
  Arn: string;
  AccessType: AccessType;
  ExcludedParticipantIds?: string[];
  UpdatedAt: Date;
  Revision: number;
}
export const GetConnectionPreferencesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    Arn: S.String,
    AccessType: AccessType,
    ExcludedParticipantIds: S.optional(ParticipantIdentifierList),
    UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    Revision: S.Number,
  }),
).annotate({
  identifier: "GetConnectionPreferencesResponse",
}) as any as S.Schema<GetConnectionPreferencesResponse>;
export interface GetPartnerRequest {
  Catalog: string;
  Identifier: string;
}
export const GetPartnerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Catalog: S.String, Identifier: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetPartnerRequest",
}) as any as S.Schema<GetPartnerRequest>;
export interface GetPartnerResponse {
  Catalog: string;
  Arn: string;
  Id: string;
  LegalName: string | redacted.Redacted<string>;
  CreatedAt: Date;
  Profile: PartnerProfile;
  AwsTrainingCertificationEmailDomains?: PartnerDomain[];
}
export const GetPartnerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    Arn: S.String,
    Id: S.String,
    LegalName: SensitiveString,
    CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    Profile: PartnerProfile,
    AwsTrainingCertificationEmailDomains: S.optional(PartnerDomainList),
  }),
).annotate({
  identifier: "GetPartnerResponse",
}) as any as S.Schema<GetPartnerResponse>;
export interface GetProfileUpdateTaskRequest {
  Catalog: string;
  Identifier: string;
}
export const GetProfileUpdateTaskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Catalog: S.String, Identifier: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetProfileUpdateTaskRequest",
}) as any as S.Schema<GetProfileUpdateTaskRequest>;
export interface GetProfileUpdateTaskResponse {
  Catalog: string;
  Arn: string;
  Id: string;
  TaskId: string;
  TaskDetails: TaskDetails;
  StartedAt: Date;
  Status: ProfileTaskStatus;
  EndedAt?: Date;
  ErrorDetailList?: ErrorDetail[];
}
export const GetProfileUpdateTaskResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    Arn: S.String,
    Id: S.String,
    TaskId: S.String,
    TaskDetails: TaskDetails,
    StartedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    Status: ProfileTaskStatus,
    EndedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    ErrorDetailList: S.optional(ErrorDetailList),
  }),
).annotate({
  identifier: "GetProfileUpdateTaskResponse",
}) as any as S.Schema<GetProfileUpdateTaskResponse>;
export interface GetProfileVisibilityRequest {
  Catalog: string;
  Identifier: string;
}
export const GetProfileVisibilityRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Catalog: S.String, Identifier: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetProfileVisibilityRequest",
}) as any as S.Schema<GetProfileVisibilityRequest>;
export type ProfileVisibility = "PRIVATE" | "PUBLIC" | (string & {});
export const ProfileVisibility = S.String;

export interface GetProfileVisibilityResponse {
  Catalog: string;
  Arn: string;
  Id: string;
  Visibility: ProfileVisibility;
  ProfileId: string;
}
export const GetProfileVisibilityResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    Arn: S.String,
    Id: S.String,
    Visibility: ProfileVisibility,
    ProfileId: S.String,
  }),
).annotate({
  identifier: "GetProfileVisibilityResponse",
}) as any as S.Schema<GetProfileVisibilityResponse>;
export interface GetQualificationsAssociationDetailsRequest {
  Catalog: string;
  Identifier: string;
}
export const GetQualificationsAssociationDetailsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Catalog: S.String, Identifier: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "GetQualificationsAssociationDetailsRequest",
  }) as any as S.Schema<GetQualificationsAssociationDetailsRequest>;
export type QualificationsAssociationStatus =
  | "ASSOCIATED"
  | "NOT_ASSOCIATED"
  | (string & {});
export const QualificationsAssociationStatus = S.String;

export interface QualificationsAssociationPartner {
  ProfileId?: string;
  AccountId?: string;
}
export const QualificationsAssociationPartner = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProfileId: S.optional(S.String),
    AccountId: S.optional(S.String),
  }),
).annotate({
  identifier: "QualificationsAssociationPartner",
}) as any as S.Schema<QualificationsAssociationPartner>;
export type AssociatedPartnerList = QualificationsAssociationPartner[];
export const AssociatedPartnerList = /*@__PURE__*/ S.Array(
  QualificationsAssociationPartner,
);
export interface GetQualificationsAssociationDetailsResponse {
  Catalog: string;
  Arn: string;
  Id: string;
  Status: QualificationsAssociationStatus;
  PrimaryPartner?: QualificationsAssociationPartner;
  AssociatedPartners?: QualificationsAssociationPartner[];
  UpdatedAt?: Date;
}
export const GetQualificationsAssociationDetailsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Catalog: S.String,
      Arn: S.String,
      Id: S.String,
      Status: QualificationsAssociationStatus,
      PrimaryPartner: S.optional(QualificationsAssociationPartner),
      AssociatedPartners: S.optional(AssociatedPartnerList),
      UpdatedAt: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
    }),
  ).annotate({
    identifier: "GetQualificationsAssociationDetailsResponse",
  }) as any as S.Schema<GetQualificationsAssociationDetailsResponse>;
export interface GetQualificationsAssociationTaskRequest {
  Catalog: string;
  Identifier: string;
}
export const GetQualificationsAssociationTaskRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ Catalog: S.String, Identifier: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "GetQualificationsAssociationTaskRequest",
}) as any as S.Schema<GetQualificationsAssociationTaskRequest>;
export type QualificationsAssociationTaskId = string;
export type QualificationsAssociationTaskStatus =
  | "IN_PROGRESS"
  | "SUCCEEDED"
  | (string & {});
export const QualificationsAssociationTaskStatus = S.String;

export interface GetQualificationsAssociationTaskResponse {
  Catalog: string;
  Arn: string;
  Id: string;
  TaskId: string;
  Status: QualificationsAssociationTaskStatus;
  PrimaryPartner: QualificationsAssociationPartner;
  StartedAt: Date;
  EndedAt?: Date;
}
export const GetQualificationsAssociationTaskResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Catalog: S.String,
      Arn: S.String,
      Id: S.String,
      TaskId: S.String,
      Status: QualificationsAssociationTaskStatus,
      PrimaryPartner: QualificationsAssociationPartner,
      StartedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
      EndedAt: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
    }),
).annotate({
  identifier: "GetQualificationsAssociationTaskResponse",
}) as any as S.Schema<GetQualificationsAssociationTaskResponse>;
export interface GetQualificationsDisassociationTaskRequest {
  Catalog: string;
  Identifier: string;
}
export const GetQualificationsDisassociationTaskRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Catalog: S.String, Identifier: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "GetQualificationsDisassociationTaskRequest",
  }) as any as S.Schema<GetQualificationsDisassociationTaskRequest>;
export type QualificationsDisassociationTaskId = string;
export type QualificationsDisassociationTaskStatus =
  | "IN_PROGRESS"
  | "SUCCEEDED"
  | (string & {});
export const QualificationsDisassociationTaskStatus = S.String;

export interface GetQualificationsDisassociationTaskResponse {
  Catalog: string;
  Arn: string;
  Id: string;
  TaskId: string;
  Status: QualificationsDisassociationTaskStatus;
  AssociatedPartner: QualificationsAssociationPartner;
  StartedAt: Date;
  EndedAt?: Date;
}
export const GetQualificationsDisassociationTaskResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Catalog: S.String,
      Arn: S.String,
      Id: S.String,
      TaskId: S.String,
      Status: QualificationsDisassociationTaskStatus,
      AssociatedPartner: QualificationsAssociationPartner,
      StartedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
      EndedAt: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
    }),
  ).annotate({
    identifier: "GetQualificationsDisassociationTaskResponse",
  }) as any as S.Schema<GetQualificationsDisassociationTaskResponse>;
export type VerificationType =
  | "BUSINESS_VERIFICATION"
  | "REGISTRANT_VERIFICATION"
  | (string & {});
export const VerificationType = S.String;

export interface GetVerificationRequest {
  VerificationType: VerificationType;
}
export const GetVerificationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ VerificationType: VerificationType }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetVerificationRequest",
}) as any as S.Schema<GetVerificationRequest>;
export type VerificationStatus =
  | "PENDING_CUSTOMER_ACTION"
  | "IN_PROGRESS"
  | "FAILED"
  | "SUCCEEDED"
  | "REJECTED"
  | (string & {});
export const VerificationStatus = S.String;

export type VerificationStatusReason = string;
export type LegalName = string | redacted.Redacted<string>;
export type RegistrationId = string | redacted.Redacted<string>;
export type JurisdictionCode = string;
export interface BusinessVerificationDetails {
  LegalName: string | redacted.Redacted<string>;
  RegistrationId: string | redacted.Redacted<string>;
  CountryCode: string;
  JurisdictionOfIncorporation?: string;
}
export const BusinessVerificationDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LegalName: SensitiveString,
    RegistrationId: SensitiveString,
    CountryCode: S.String,
    JurisdictionOfIncorporation: S.optional(S.String),
  }),
).annotate({
  identifier: "BusinessVerificationDetails",
}) as any as S.Schema<BusinessVerificationDetails>;
export type CompletionUrl = string;
export interface BusinessVerificationResponse {
  BusinessVerificationDetails: BusinessVerificationDetails;
  CompletionUrl?: string;
  CompletionUrlExpiresAt?: Date;
}
export const BusinessVerificationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BusinessVerificationDetails: BusinessVerificationDetails,
    CompletionUrl: S.optional(S.String),
    CompletionUrlExpiresAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "BusinessVerificationResponse",
}) as any as S.Schema<BusinessVerificationResponse>;
export interface RegistrantVerificationResponse {
  CompletionUrl: string;
  CompletionUrlExpiresAt: Date;
}
export const RegistrantVerificationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CompletionUrl: S.String,
    CompletionUrlExpiresAt: T.DateFromString.pipe(
      T.TimestampFormat("date-time"),
    ),
  }),
).annotate({
  identifier: "RegistrantVerificationResponse",
}) as any as S.Schema<RegistrantVerificationResponse>;
export type VerificationResponseDetails =
  | {
      BusinessVerificationResponse: BusinessVerificationResponse;
      RegistrantVerificationResponse?: never;
    }
  | {
      BusinessVerificationResponse?: never;
      RegistrantVerificationResponse: RegistrantVerificationResponse;
    };
export const VerificationResponseDetails = /*@__PURE__*/ S.Union([
  S.Struct({ BusinessVerificationResponse: BusinessVerificationResponse }),
  S.Struct({ RegistrantVerificationResponse: RegistrantVerificationResponse }),
]);
export interface GetVerificationResponse {
  VerificationType: VerificationType;
  VerificationStatus: VerificationStatus;
  VerificationStatusReason?: string;
  VerificationResponseDetails: VerificationResponseDetails;
  StartedAt: Date;
  CompletedAt?: Date;
}
export const GetVerificationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VerificationType: VerificationType,
    VerificationStatus: VerificationStatus,
    VerificationStatusReason: S.optional(S.String),
    VerificationResponseDetails: VerificationResponseDetails,
    StartedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    CompletedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "GetVerificationResponse",
}) as any as S.Schema<GetVerificationResponse>;
export type NextToken = string;
export type MaxResults = number;
export interface ListConnectionInvitationsRequest {
  Catalog: string;
  NextToken?: string;
  ConnectionType?: ConnectionType;
  MaxResults?: number;
  OtherParticipantIdentifiers?: string[];
  ParticipantType?: ParticipantType;
  Status?: InvitationStatus;
}
export const ListConnectionInvitationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    NextToken: S.optional(S.String),
    ConnectionType: S.optional(ConnectionType),
    MaxResults: S.optional(S.Number),
    OtherParticipantIdentifiers: S.optional(ParticipantIdentifierList),
    ParticipantType: S.optional(ParticipantType),
    Status: S.optional(InvitationStatus),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListConnectionInvitationsRequest",
}) as any as S.Schema<ListConnectionInvitationsRequest>;
export interface ConnectionInvitationSummary {
  Catalog: string;
  Id: string;
  Arn: string;
  ConnectionId?: string;
  ConnectionType: ConnectionType;
  CreatedAt: Date;
  UpdatedAt: Date;
  ExpiresAt?: Date;
  OtherParticipantIdentifier: string;
  ParticipantType: ParticipantType;
  Status: InvitationStatus;
}
export const ConnectionInvitationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    Id: S.String,
    Arn: S.String,
    ConnectionId: S.optional(S.String),
    ConnectionType: ConnectionType,
    CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ExpiresAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    OtherParticipantIdentifier: S.String,
    ParticipantType: ParticipantType,
    Status: InvitationStatus,
  }),
).annotate({
  identifier: "ConnectionInvitationSummary",
}) as any as S.Schema<ConnectionInvitationSummary>;
export type ConnectionInvitationSummaryList = ConnectionInvitationSummary[];
export const ConnectionInvitationSummaryList = /*@__PURE__*/ S.Array(
  ConnectionInvitationSummary,
);
export interface ListConnectionInvitationsResponse {
  ConnectionInvitationSummaries: ConnectionInvitationSummary[];
  NextToken?: string;
}
export const ListConnectionInvitationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectionInvitationSummaries: ConnectionInvitationSummaryList,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListConnectionInvitationsResponse",
}) as any as S.Schema<ListConnectionInvitationsResponse>;
export type ConnectionTypeFilter = string;
export interface ListConnectionsRequest {
  Catalog: string;
  NextToken?: string;
  ConnectionType?: string;
  MaxResults?: number;
  OtherParticipantIdentifiers?: string[];
}
export const ListConnectionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    NextToken: S.optional(S.String),
    ConnectionType: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    OtherParticipantIdentifiers: S.optional(ParticipantIdentifierList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListConnectionsRequest",
}) as any as S.Schema<ListConnectionsRequest>;
export interface ConnectionTypeSummary {
  Status: ConnectionTypeStatus;
  OtherParticipant: Participant;
}
export const ConnectionTypeSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Status: ConnectionTypeStatus, OtherParticipant: Participant }),
).annotate({
  identifier: "ConnectionTypeSummary",
}) as any as S.Schema<ConnectionTypeSummary>;
export type ConnectionTypeSummaryMap = {
  [key in ConnectionType]?: ConnectionTypeSummary;
};
export const ConnectionTypeSummaryMap = /*@__PURE__*/ S.Record(
  ConnectionType,
  ConnectionTypeSummary.pipe(S.optional),
);
export interface ConnectionSummary {
  Catalog: string;
  Id: string;
  Arn: string;
  OtherParticipantAccountId: string;
  UpdatedAt: Date;
  ConnectionTypes: { [key: string]: ConnectionTypeSummary | undefined };
}
export const ConnectionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    Id: S.String,
    Arn: S.String,
    OtherParticipantAccountId: S.String,
    UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ConnectionTypes: ConnectionTypeSummaryMap,
  }),
).annotate({
  identifier: "ConnectionSummary",
}) as any as S.Schema<ConnectionSummary>;
export type ConnectionSummaryList = ConnectionSummary[];
export const ConnectionSummaryList = /*@__PURE__*/ S.Array(ConnectionSummary);
export interface ListConnectionsResponse {
  ConnectionSummaries: ConnectionSummary[];
  NextToken?: string;
}
export const ListConnectionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectionSummaries: ConnectionSummaryList,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListConnectionsResponse",
}) as any as S.Schema<ListConnectionsResponse>;
export interface ListPartnersRequest {
  Catalog: string;
  NextToken?: string;
}
export const ListPartnersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Catalog: S.String, NextToken: S.optional(S.String) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListPartnersRequest",
}) as any as S.Schema<ListPartnersRequest>;
export interface PartnerSummary {
  Catalog: string;
  Arn: string;
  Id: string;
  LegalName: string | redacted.Redacted<string>;
  CreatedAt: Date;
}
export const PartnerSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    Arn: S.String,
    Id: S.String,
    LegalName: SensitiveString,
    CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({ identifier: "PartnerSummary" }) as any as S.Schema<PartnerSummary>;
export type PartnerSummaryList = PartnerSummary[];
export const PartnerSummaryList = /*@__PURE__*/ S.Array(PartnerSummary);
export interface ListPartnersResponse {
  PartnerSummaryList: PartnerSummary[];
  NextToken?: string;
}
export const ListPartnersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PartnerSummaryList: PartnerSummaryList,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPartnersResponse",
}) as any as S.Schema<ListPartnersResponse>;
export type TaggableResourceArn = string;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface ListTagsForResourceResponse {
  ResourceArn: string;
  Tags?: Tag[];
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String, Tags: S.optional(TagList) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface PutAllianceLeadContactRequest {
  Catalog: string;
  Identifier: string;
  AllianceLeadContact: AllianceLeadContact;
  EmailVerificationCode?: string | redacted.Redacted<string>;
}
export const PutAllianceLeadContactRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    Identifier: S.String,
    AllianceLeadContact: AllianceLeadContact,
    EmailVerificationCode: S.optional(SensitiveString),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "PutAllianceLeadContactRequest",
}) as any as S.Schema<PutAllianceLeadContactRequest>;
export interface PutAllianceLeadContactResponse {
  Catalog: string;
  Arn: string;
  Id: string;
  AllianceLeadContact: AllianceLeadContact;
}
export const PutAllianceLeadContactResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    Arn: S.String,
    Id: S.String,
    AllianceLeadContact: AllianceLeadContact,
  }),
).annotate({
  identifier: "PutAllianceLeadContactResponse",
}) as any as S.Schema<PutAllianceLeadContactResponse>;
export interface PutProfileVisibilityRequest {
  Catalog: string;
  Identifier: string;
  Visibility: ProfileVisibility;
}
export const PutProfileVisibilityRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    Identifier: S.String,
    Visibility: ProfileVisibility,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "PutProfileVisibilityRequest",
}) as any as S.Schema<PutProfileVisibilityRequest>;
export interface PutProfileVisibilityResponse {
  Catalog: string;
  Arn: string;
  Id: string;
  Visibility: ProfileVisibility;
  ProfileId: string;
}
export const PutProfileVisibilityResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    Arn: S.String,
    Id: S.String,
    Visibility: ProfileVisibility,
    ProfileId: S.String,
  }),
).annotate({
  identifier: "PutProfileVisibilityResponse",
}) as any as S.Schema<PutProfileVisibilityResponse>;
export interface RejectConnectionInvitationRequest {
  Catalog: string;
  Identifier: string;
  ClientToken: string;
  Reason?: string;
}
export const RejectConnectionInvitationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    Identifier: S.String,
    ClientToken: S.String.pipe(T.IdempotencyToken()),
    Reason: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "RejectConnectionInvitationRequest",
}) as any as S.Schema<RejectConnectionInvitationRequest>;
export interface RejectConnectionInvitationResponse {
  Catalog: string;
  Id: string;
  Arn: string;
  ConnectionId?: string;
  ConnectionType: ConnectionType;
  CreatedAt: Date;
  UpdatedAt: Date;
  ExpiresAt?: Date;
  OtherParticipantIdentifier: string;
  ParticipantType: ParticipantType;
  Status: InvitationStatus;
  InvitationMessage: string;
  InviterEmail: string;
  InviterName: string | redacted.Redacted<string>;
}
export const RejectConnectionInvitationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    Id: S.String,
    Arn: S.String,
    ConnectionId: S.optional(S.String),
    ConnectionType: ConnectionType,
    CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ExpiresAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    OtherParticipantIdentifier: S.String,
    ParticipantType: ParticipantType,
    Status: InvitationStatus,
    InvitationMessage: S.String,
    InviterEmail: S.String,
    InviterName: SensitiveString,
  }),
).annotate({
  identifier: "RejectConnectionInvitationResponse",
}) as any as S.Schema<RejectConnectionInvitationResponse>;
export interface SendEmailVerificationCodeRequest {
  Catalog: string;
  Email: string;
}
export const SendEmailVerificationCodeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Catalog: S.String, Email: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "SendEmailVerificationCodeRequest",
}) as any as S.Schema<SendEmailVerificationCodeRequest>;
export interface SendEmailVerificationCodeResponse {}
export const SendEmailVerificationCodeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "SendEmailVerificationCodeResponse",
}) as any as S.Schema<SendEmailVerificationCodeResponse>;
export interface StartProfileUpdateTaskRequest {
  Catalog: string;
  Identifier: string;
  ClientToken?: string;
  TaskDetails: TaskDetails;
}
export const StartProfileUpdateTaskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    Identifier: S.String,
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    TaskDetails: TaskDetails,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartProfileUpdateTaskRequest",
}) as any as S.Schema<StartProfileUpdateTaskRequest>;
export interface StartProfileUpdateTaskResponse {
  Catalog: string;
  Arn: string;
  Id: string;
  TaskId: string;
  TaskDetails: TaskDetails;
  StartedAt: Date;
  Status: ProfileTaskStatus;
  EndedAt?: Date;
  ErrorDetailList?: ErrorDetail[];
}
export const StartProfileUpdateTaskResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    Arn: S.String,
    Id: S.String,
    TaskId: S.String,
    TaskDetails: TaskDetails,
    StartedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    Status: ProfileTaskStatus,
    EndedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    ErrorDetailList: S.optional(ErrorDetailList),
  }),
).annotate({
  identifier: "StartProfileUpdateTaskResponse",
}) as any as S.Schema<StartProfileUpdateTaskResponse>;
export interface StartQualificationsAssociationTaskRequest {
  Catalog: string;
  Identifier: string;
  ClientToken?: string;
  PrimaryPartner: QualificationsAssociationPartner;
}
export const StartQualificationsAssociationTaskRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Catalog: S.String,
      Identifier: S.String,
      ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
      PrimaryPartner: QualificationsAssociationPartner,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "StartQualificationsAssociationTaskRequest",
  }) as any as S.Schema<StartQualificationsAssociationTaskRequest>;
export interface StartQualificationsAssociationTaskResponse {
  Catalog: string;
  Arn: string;
  Id: string;
  TaskId: string;
  Status: QualificationsAssociationTaskStatus;
  PrimaryPartner: QualificationsAssociationPartner;
  StartedAt: Date;
}
export const StartQualificationsAssociationTaskResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Catalog: S.String,
      Arn: S.String,
      Id: S.String,
      TaskId: S.String,
      Status: QualificationsAssociationTaskStatus,
      PrimaryPartner: QualificationsAssociationPartner,
      StartedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    }),
  ).annotate({
    identifier: "StartQualificationsAssociationTaskResponse",
  }) as any as S.Schema<StartQualificationsAssociationTaskResponse>;
export interface StartQualificationsDisassociationTaskRequest {
  Catalog: string;
  Identifier: string;
  ClientToken?: string;
  AssociatedPartner: QualificationsAssociationPartner;
}
export const StartQualificationsDisassociationTaskRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Catalog: S.String,
      Identifier: S.String,
      ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
      AssociatedPartner: QualificationsAssociationPartner,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "StartQualificationsDisassociationTaskRequest",
  }) as any as S.Schema<StartQualificationsDisassociationTaskRequest>;
export interface StartQualificationsDisassociationTaskResponse {
  Catalog: string;
  Arn: string;
  Id: string;
  TaskId: string;
  Status: QualificationsDisassociationTaskStatus;
  AssociatedPartner: QualificationsAssociationPartner;
  StartedAt: Date;
}
export const StartQualificationsDisassociationTaskResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Catalog: S.String,
      Arn: S.String,
      Id: S.String,
      TaskId: S.String,
      Status: QualificationsDisassociationTaskStatus,
      AssociatedPartner: QualificationsAssociationPartner,
      StartedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    }),
  ).annotate({
    identifier: "StartQualificationsDisassociationTaskResponse",
  }) as any as S.Schema<StartQualificationsDisassociationTaskResponse>;
export interface RegistrantVerificationDetails {}
export const RegistrantVerificationDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "RegistrantVerificationDetails",
}) as any as S.Schema<RegistrantVerificationDetails>;
export type VerificationDetails =
  | {
      BusinessVerificationDetails: BusinessVerificationDetails;
      RegistrantVerificationDetails?: never;
    }
  | {
      BusinessVerificationDetails?: never;
      RegistrantVerificationDetails: RegistrantVerificationDetails;
    };
export const VerificationDetails = /*@__PURE__*/ S.Union([
  S.Struct({ BusinessVerificationDetails: BusinessVerificationDetails }),
  S.Struct({ RegistrantVerificationDetails: RegistrantVerificationDetails }),
]);
export interface StartVerificationRequest {
  ClientToken?: string;
  VerificationDetails?: VerificationDetails;
}
export const StartVerificationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    VerificationDetails: S.optional(VerificationDetails),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartVerificationRequest",
}) as any as S.Schema<StartVerificationRequest>;
export interface StartVerificationResponse {
  VerificationType: VerificationType;
  VerificationStatus: VerificationStatus;
  VerificationStatusReason?: string;
  VerificationResponseDetails: VerificationResponseDetails;
  StartedAt: Date;
  CompletedAt?: Date;
}
export const StartVerificationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VerificationType: VerificationType,
    VerificationStatus: VerificationStatus,
    VerificationStatusReason: S.optional(S.String),
    VerificationResponseDetails: VerificationResponseDetails,
    StartedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    CompletedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "StartVerificationResponse",
}) as any as S.Schema<StartVerificationResponse>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String, Tags: TagList }).pipe(
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
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String, TagKeys: TagKeyList }).pipe(
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
export interface UpdateConnectionPreferencesRequest {
  Catalog: string;
  Revision: number;
  AccessType: AccessType;
  ExcludedParticipantIdentifiers?: string[];
}
export const UpdateConnectionPreferencesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    Revision: S.Number,
    AccessType: AccessType,
    ExcludedParticipantIdentifiers: S.optional(ParticipantIdentifierList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateConnectionPreferencesRequest",
}) as any as S.Schema<UpdateConnectionPreferencesRequest>;
export interface UpdateConnectionPreferencesResponse {
  Catalog: string;
  Arn: string;
  AccessType: AccessType;
  ExcludedParticipantIds?: string[];
  UpdatedAt: Date;
  Revision: number;
}
export const UpdateConnectionPreferencesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    Arn: S.String,
    AccessType: AccessType,
    ExcludedParticipantIds: S.optional(ParticipantIdentifierList),
    UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    Revision: S.Number,
  }),
).annotate({
  identifier: "UpdateConnectionPreferencesResponse",
}) as any as S.Schema<UpdateConnectionPreferencesResponse>;
export type AccessDeniedExceptionReason =
  | "ACCESS_DENIED"
  | "INCOMPATIBLE_BENEFIT_AWS_PARTNER_STATE"
  | (string & {});
export const AccessDeniedExceptionReason = S.String;

export type ConflictExceptionReason =
  | "CONFLICT_CLIENT_TOKEN"
  | "DUPLICATE_PARTNER"
  | "INCOMPATIBLE_PROFILE_STATE"
  | "INCOMPATIBLE_PARTNER_PROFILE_TASK_STATE"
  | "DUPLICATE_CONNECTION_INVITATION"
  | "INCOMPATIBLE_CONNECTION_INVITATION_STATE"
  | "INCOMPATIBLE_CONNECTION_INVITATION_RECEIVER"
  | "DUPLICATE_CONNECTION"
  | "INCOMPATIBLE_CONNECTION_STATE"
  | "INCOMPATIBLE_CONNECTION_PREFERENCES_REVISION"
  | "ACCOUNT_ALREADY_VERIFIED"
  | "VERIFICATION_ALREADY_IN_PROGRESS"
  | "INCOMPATIBLE_QUALIFICATIONS_ASSOCIATION_TASK_STATE"
  | (string & {});
export const ConflictExceptionReason = S.String;

export type ResourceNotFoundExceptionReason =
  | "PARTNER_NOT_FOUND"
  | "PARTNER_PROFILE_NOT_FOUND"
  | "PARTNER_PROFILE_TASK_NOT_FOUND"
  | "PARTNER_DOMAIN_NOT_FOUND"
  | "SENDER_PROFILE_NOT_FOUND"
  | "RECEIVER_PROFILE_NOT_FOUND"
  | "CONNECTION_INVITATION_NOT_FOUND"
  | "CONNECTION_NOT_FOUND"
  | "VERIFICATION_NOT_FOUND"
  | "QUALIFICATIONS_ASSOCIATION_TASK_NOT_FOUND"
  | "QUALIFICATIONS_DISASSOCIATION_TASK_NOT_FOUND"
  | (string & {});
export const ResourceNotFoundExceptionReason = S.String;

export type ServiceQuotaExceededExceptionReason =
  | "LIMIT_EXCEEDED_NUMBER_OF_EMAIL"
  | "LIMIT_EXCEEDED_NUMBER_OF_DOMAIN"
  | "LIMIT_EXCEEDED_NUMBER_OF_CONNECTION_INVITATION_PER_DAY"
  | "LIMIT_EXCEEDED_NUMBER_OF_ACTIVE_CONNECTION"
  | "LIMIT_EXCEEDED_NUMBER_OF_OPEN_CONNECTION_INVITATION"
  | "LIMIT_EXCEEDED_NUMBER_OF_PROFILE_UPDATE_PER_DAY"
  | "LIMIT_EXCEEDED_NUMBER_OF_PROFILE_VISIBILITY_UPDATE_PER_DAY"
  | (string & {});
export const ServiceQuotaExceededExceptionReason = S.String;

export type ValidationExceptionReason =
  | "REQUEST_VALIDATION_FAILED"
  | "BUSINESS_VALIDATION_FAILED"
  | (string & {});
export const ValidationExceptionReason = S.String;

export type FieldValidationCode =
  | "REQUIRED_FIELD_MISSING"
  | "DUPLICATE_VALUE"
  | "INVALID_VALUE"
  | "INVALID_STRING_FORMAT"
  | "TOO_MANY_VALUES"
  | "ACTION_NOT_PERMITTED"
  | "INVALID_ENUM_VALUE"
  | (string & {});
export const FieldValidationCode = S.String;

export interface FieldValidationError {
  Name: string;
  Message: string;
  Code: FieldValidationCode;
}
export const FieldValidationError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Message: S.String, Code: FieldValidationCode }),
).annotate({
  identifier: "FieldValidationError",
}) as any as S.Schema<FieldValidationError>;
export type BusinessValidationCode =
  | "INCOMPATIBLE_CONNECTION_INVITATION_REQUEST"
  | "INCOMPATIBLE_LEGAL_NAME"
  | "INCOMPATIBLE_KNOW_YOUR_BUSINESS_STATUS"
  | "INCOMPATIBLE_IDENTITY_VERIFICATION_STATUS"
  | "INVALID_ACCOUNT_LINKING_STATUS"
  | "INVALID_ACCOUNT_STATE"
  | "INCOMPATIBLE_DOMAIN"
  | "INELIGIBLE_ACCOUNT_TIER"
  | "MISSING_ACTIVE_SUBSIDIARY_CONNECTION"
  | "INCOMPATIBLE_SUBSIDIARY_CONNECTION"
  | "INCOMPATIBLE_PRIMARY_PARTNER"
  | "QUALIFICATIONS_ASSOCIATION_LIMIT_EXCEEDED"
  | "QUALIFICATIONS_ASSOCIATION_NOT_FOUND"
  | "QUALIFICATIONS_ASSOCIATION_EXISTS"
  | (string & {});
export const BusinessValidationCode = S.String;

export interface BusinessValidationError {
  Message: string;
  Code: BusinessValidationCode;
}
export const BusinessValidationError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Message: S.String, Code: BusinessValidationCode }),
).annotate({
  identifier: "BusinessValidationError",
}) as any as S.Schema<BusinessValidationError>;
export type ValidationError =
  | {
      FieldValidationError: FieldValidationError;
      BusinessValidationError?: never;
    }
  | {
      FieldValidationError?: never;
      BusinessValidationError: BusinessValidationError;
    };
export const ValidationError = /*@__PURE__*/ S.Union([
  S.Struct({ FieldValidationError: FieldValidationError }),
  S.Struct({ BusinessValidationError: BusinessValidationError }),
]);
export type ValidationErrorList = ValidationError[];
export const ValidationErrorList = /*@__PURE__*/ S.Array(ValidationError);
export type AcceptConnectionInvitationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Accepts a connection invitation from another partner, establishing a formal partnership connection between the two parties.
 */
export const acceptConnectionInvitation: API.OperationMethod<
  AcceptConnectionInvitationRequest,
  AcceptConnectionInvitationResponse,
  AcceptConnectionInvitationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AcceptConnectionInvitationRequest,
  output: AcceptConnectionInvitationResponse,
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
  operationName: "AcceptConnectionInvitation",
}));

export type AssociateAwsTrainingCertificationEmailDomainError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates an email domain with AWS training and certification for the partner account, enabling automatic verification of employee certifications.
 */
export const associateAwsTrainingCertificationEmailDomain: API.OperationMethod<
  AssociateAwsTrainingCertificationEmailDomainRequest,
  AssociateAwsTrainingCertificationEmailDomainResponse,
  AssociateAwsTrainingCertificationEmailDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateAwsTrainingCertificationEmailDomainRequest,
  output: AssociateAwsTrainingCertificationEmailDomainResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateAwsTrainingCertificationEmailDomain",
}));

export type CancelConnectionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels an existing connection between partners, terminating the partnership relationship.
 */
export const cancelConnection: API.OperationMethod<
  CancelConnectionRequest,
  CancelConnectionResponse,
  CancelConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelConnectionRequest,
  output: CancelConnectionResponse,
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
  operationName: "CancelConnection",
}));

export type CancelConnectionInvitationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels a pending connection invitation before it has been accepted or rejected.
 */
export const cancelConnectionInvitation: API.OperationMethod<
  CancelConnectionInvitationRequest,
  CancelConnectionInvitationResponse,
  CancelConnectionInvitationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelConnectionInvitationRequest,
  output: CancelConnectionInvitationResponse,
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
  operationName: "CancelConnectionInvitation",
}));

export type CancelProfileUpdateTaskError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels an in-progress profile update task, stopping any pending changes to the partner profile.
 */
export const cancelProfileUpdateTask: API.OperationMethod<
  CancelProfileUpdateTaskRequest,
  CancelProfileUpdateTaskResponse,
  CancelProfileUpdateTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelProfileUpdateTaskRequest,
  output: CancelProfileUpdateTaskResponse,
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
  operationName: "CancelProfileUpdateTask",
}));

export type CreateConnectionInvitationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new connection invitation to establish a partnership with another organization.
 */
export const createConnectionInvitation: API.OperationMethod<
  CreateConnectionInvitationRequest,
  CreateConnectionInvitationResponse,
  CreateConnectionInvitationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateConnectionInvitationRequest,
  output: CreateConnectionInvitationResponse,
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
  operationName: "CreateConnectionInvitation",
}));

export type CreatePartnerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new partner account in the AWS Partner Network with the specified details and configuration.
 */
export const createPartner: API.OperationMethod<
  CreatePartnerRequest,
  CreatePartnerResponse,
  CreatePartnerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePartnerRequest,
  output: CreatePartnerResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePartner",
}));

export type DisassociateAwsTrainingCertificationEmailDomainError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes the association between an email domain and AWS training and certification for the partner account.
 */
export const disassociateAwsTrainingCertificationEmailDomain: API.OperationMethod<
  DisassociateAwsTrainingCertificationEmailDomainRequest,
  DisassociateAwsTrainingCertificationEmailDomainResponse,
  DisassociateAwsTrainingCertificationEmailDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateAwsTrainingCertificationEmailDomainRequest,
  output: DisassociateAwsTrainingCertificationEmailDomainResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateAwsTrainingCertificationEmailDomain",
}));

export type GetAllianceLeadContactError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the alliance lead contact information for a partner account.
 */
export const getAllianceLeadContact: API.OperationMethod<
  GetAllianceLeadContactRequest,
  GetAllianceLeadContactResponse,
  GetAllianceLeadContactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAllianceLeadContactRequest,
  output: GetAllianceLeadContactResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAllianceLeadContact",
}));

export type GetConnectionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific connection between partners.
 */
export const getConnection: API.OperationMethod<
  GetConnectionRequest,
  GetConnectionResponse,
  GetConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetConnectionRequest,
  output: GetConnectionResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnection",
}));

export type GetConnectionInvitationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific connection invitation.
 */
export const getConnectionInvitation: API.OperationMethod<
  GetConnectionInvitationRequest,
  GetConnectionInvitationResponse,
  GetConnectionInvitationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetConnectionInvitationRequest,
  output: GetConnectionInvitationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnectionInvitation",
}));

export type GetConnectionPreferencesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the connection preferences for a partner account, including access settings and exclusions.
 */
export const getConnectionPreferences: API.OperationMethod<
  GetConnectionPreferencesRequest,
  GetConnectionPreferencesResponse,
  GetConnectionPreferencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetConnectionPreferencesRequest,
  output: GetConnectionPreferencesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnectionPreferences",
}));

export type GetPartnerError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific partner account.
 */
export const getPartner: API.OperationMethod<
  GetPartnerRequest,
  GetPartnerResponse,
  GetPartnerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPartnerRequest,
  output: GetPartnerResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPartner",
}));

export type GetProfileUpdateTaskError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a specific profile update task.
 */
export const getProfileUpdateTask: API.OperationMethod<
  GetProfileUpdateTaskRequest,
  GetProfileUpdateTaskResponse,
  GetProfileUpdateTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetProfileUpdateTaskRequest,
  output: GetProfileUpdateTaskResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProfileUpdateTask",
}));

export type GetProfileVisibilityError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the visibility settings for a partner profile, determining who can see the profile information.
 */
export const getProfileVisibility: API.OperationMethod<
  GetProfileVisibilityRequest,
  GetProfileVisibilityResponse,
  GetProfileVisibilityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetProfileVisibilityRequest,
  output: GetProfileVisibilityResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProfileVisibility",
}));

export type GetQualificationsAssociationDetailsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns your current qualifications association status, the primary partner, and the full list of partners associated under the primary partner.
 */
export const getQualificationsAssociationDetails: API.OperationMethod<
  GetQualificationsAssociationDetailsRequest,
  GetQualificationsAssociationDetailsResponse,
  GetQualificationsAssociationDetailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetQualificationsAssociationDetailsRequest,
  output: GetQualificationsAssociationDetailsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQualificationsAssociationDetails",
}));

export type GetQualificationsAssociationTaskError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the status and details of the most recent qualifications association task for your partner account. Use this operation to poll the progress of an association task initiated by `StartQualificationsAssociationTask`.
 */
export const getQualificationsAssociationTask: API.OperationMethod<
  GetQualificationsAssociationTaskRequest,
  GetQualificationsAssociationTaskResponse,
  GetQualificationsAssociationTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetQualificationsAssociationTaskRequest,
  output: GetQualificationsAssociationTaskResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQualificationsAssociationTask",
}));

export type GetQualificationsDisassociationTaskError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the status and details of the most recent qualifications disassociation task for your partner account. Use this operation to poll the progress of a disassociation task initiated by `StartQualificationsDisassociationTask`.
 */
export const getQualificationsDisassociationTask: API.OperationMethod<
  GetQualificationsDisassociationTaskRequest,
  GetQualificationsDisassociationTaskResponse,
  GetQualificationsDisassociationTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetQualificationsDisassociationTaskRequest,
  output: GetQualificationsDisassociationTaskResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQualificationsDisassociationTask",
}));

export type GetVerificationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the current status and details of a verification process for a partner account. This operation allows partners to check the progress and results of business or registrant verification processes.
 */
export const getVerification: API.OperationMethod<
  GetVerificationRequest,
  GetVerificationResponse,
  GetVerificationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetVerificationRequest,
  output: GetVerificationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVerification",
}));

export type ListConnectionInvitationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists connection invitations for the partner account, with optional filtering by status, type, and other criteria.
 */
export const listConnectionInvitations: API.PaginatedOperationMethod<
  ListConnectionInvitationsRequest,
  ListConnectionInvitationsResponse,
  ListConnectionInvitationsError,
  Credentials | HttpClient.HttpClient,
  ConnectionInvitationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListConnectionInvitationsRequest,
  output: ListConnectionInvitationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConnectionInvitations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ConnectionInvitationSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListConnectionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists active connections for the partner account, with optional filtering by connection type and participant.
 */
export const listConnections: API.PaginatedOperationMethod<
  ListConnectionsRequest,
  ListConnectionsResponse,
  ListConnectionsError,
  Credentials | HttpClient.HttpClient,
  ConnectionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListConnectionsRequest,
  output: ListConnectionsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConnections",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ConnectionSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPartnersError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists partner accounts in the catalog, providing a summary view of all partners.
 */
export const listPartners: API.PaginatedOperationMethod<
  ListPartnersRequest,
  ListPartnersResponse,
  ListPartnersError,
  Credentials | HttpClient.HttpClient,
  PartnerSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPartnersRequest,
  output: ListPartnersResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPartners",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PartnerSummaryList",
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
 * Lists all tags associated with a specific AWS Partner Central Account resource.
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

export type PutAllianceLeadContactError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates the alliance lead contact information for a partner account.
 */
export const putAllianceLeadContact: API.OperationMethod<
  PutAllianceLeadContactRequest,
  PutAllianceLeadContactResponse,
  PutAllianceLeadContactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutAllianceLeadContactRequest,
  output: PutAllianceLeadContactResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAllianceLeadContact",
}));

export type PutProfileVisibilityError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sets the visibility level for a partner profile, controlling who can view the profile information.
 */
export const putProfileVisibility: API.OperationMethod<
  PutProfileVisibilityRequest,
  PutProfileVisibilityResponse,
  PutProfileVisibilityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutProfileVisibilityRequest,
  output: PutProfileVisibilityResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutProfileVisibility",
}));

export type RejectConnectionInvitationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Rejects a connection invitation from another partner, declining the partnership request.
 */
export const rejectConnectionInvitation: API.OperationMethod<
  RejectConnectionInvitationRequest,
  RejectConnectionInvitationResponse,
  RejectConnectionInvitationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RejectConnectionInvitationRequest,
  output: RejectConnectionInvitationResponse,
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
  operationName: "RejectConnectionInvitation",
}));

export type SendEmailVerificationCodeError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sends an email verification code to the specified email address for account verification purposes.
 */
export const sendEmailVerificationCode: API.OperationMethod<
  SendEmailVerificationCodeRequest,
  SendEmailVerificationCodeResponse,
  SendEmailVerificationCodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SendEmailVerificationCodeRequest,
  output: SendEmailVerificationCodeResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendEmailVerificationCode",
}));

export type StartProfileUpdateTaskError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Initiates a profile update task to modify partner profile information asynchronously.
 */
export const startProfileUpdateTask: API.OperationMethod<
  StartProfileUpdateTaskRequest,
  StartProfileUpdateTaskResponse,
  StartProfileUpdateTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartProfileUpdateTaskRequest,
  output: StartProfileUpdateTaskResponse,
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
  operationName: "StartProfileUpdateTask",
}));

export type StartQualificationsAssociationTaskError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Initiates an asynchronous task to associate your partner qualifications with a primary account. You must be a subsidiary of the primary account with an active subsidiary connection. Use `GetQualificationsAssociationTask` to monitor task progress.
 */
export const startQualificationsAssociationTask: API.OperationMethod<
  StartQualificationsAssociationTaskRequest,
  StartQualificationsAssociationTaskResponse,
  StartQualificationsAssociationTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartQualificationsAssociationTaskRequest,
  output: StartQualificationsAssociationTaskResponse,
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
  operationName: "StartQualificationsAssociationTask",
}));

export type StartQualificationsDisassociationTaskError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Initiates an asynchronous task to disassociate your partner qualifications from a primary account. You must currently be associated and cannot disassociate if you are the primary partner. Use `GetQualificationsDisassociationTask` to monitor task progress.
 */
export const startQualificationsDisassociationTask: API.OperationMethod<
  StartQualificationsDisassociationTaskRequest,
  StartQualificationsDisassociationTaskResponse,
  StartQualificationsDisassociationTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartQualificationsDisassociationTaskRequest,
  output: StartQualificationsDisassociationTaskResponse,
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
  operationName: "StartQualificationsDisassociationTask",
}));

export type StartVerificationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Initiates a new verification process for a partner account. This operation begins the verification workflow for either business registration or individual registrant identity verification as required by AWS Partner Central.
 */
export const startVerification: API.OperationMethod<
  StartVerificationRequest,
  StartVerificationResponse,
  StartVerificationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartVerificationRequest,
  output: StartVerificationResponse,
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
  operationName: "StartVerification",
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
 * Adds or updates tags for a specified AWS Partner Central Account resource.
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
 * Removes specified tags from an AWS Partner Central Account resource.
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

export type UpdateConnectionPreferencesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the connection preferences for a partner account, modifying access settings and exclusions.
 */
export const updateConnectionPreferences: API.OperationMethod<
  UpdateConnectionPreferencesRequest,
  UpdateConnectionPreferencesResponse,
  UpdateConnectionPreferencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateConnectionPreferencesRequest,
  output: UpdateConnectionPreferencesResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConnectionPreferences",
}));
