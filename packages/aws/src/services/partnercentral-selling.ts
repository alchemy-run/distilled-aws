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
  sdkId: "PartnerCentral Selling",
  serviceShapeName: "AWSPartnerCentralSelling",
});
const auth = T.AwsAuthSigv4({ name: "partnercentral-selling" });
const ver = T.ServiceVersion("2022-07-26");
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
            `https://partnercentral-selling-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        return e(
          `https://partnercentral-selling.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
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
        S.suspend(() => AccessDeniedExceptionErrorCode).annotate({
          identifier: "AccessDeniedExceptionErrorCode",
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
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      Reason: S.suspend(() => ValidationExceptionReason).annotate({
        identifier: "ValidationExceptionReason",
      }),
      ErrorList: S.optional(
        S.suspend(() => ValidationExceptionErrorList).annotate({
          identifier: "ValidationExceptionErrorList",
        }),
      ),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type CatalogIdentifier = string;
export type EngagementInvitationArnOrIdentifier = string;
export interface AcceptEngagementInvitationRequest {
  Catalog: string;
  Identifier: string;
}
export const AcceptEngagementInvitationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Catalog: S.String, Identifier: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/AcceptEngagementInvitation" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AcceptEngagementInvitationRequest",
}) as any as S.Schema<AcceptEngagementInvitationRequest>;
export interface AcceptEngagementInvitationResponse {}
export const AcceptEngagementInvitationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AcceptEngagementInvitationResponse",
}) as any as S.Schema<AcceptEngagementInvitationResponse>;
export type OpportunityIdentifier = string;
export type Email = string | redacted.Redacted<string>;
export type Name = string | redacted.Redacted<string>;
export type PhoneNumber = string | redacted.Redacted<string>;
export type JobTitle = string | redacted.Redacted<string>;
export interface AssigneeContact {
  Email: string | redacted.Redacted<string>;
  FirstName: string | redacted.Redacted<string>;
  LastName: string | redacted.Redacted<string>;
  Phone?: string | redacted.Redacted<string>;
  BusinessTitle: string | redacted.Redacted<string>;
}
export const AssigneeContact = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Email: SensitiveString,
    FirstName: SensitiveString,
    LastName: SensitiveString,
    Phone: S.optional(SensitiveString),
    BusinessTitle: SensitiveString,
  }),
).annotate({
  identifier: "AssigneeContact",
}) as any as S.Schema<AssigneeContact>;
export interface AssignOpportunityRequest {
  Catalog: string;
  Identifier: string;
  Assignee: AssigneeContact;
}
export const AssignOpportunityRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    Identifier: S.String,
    Assignee: AssigneeContact,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/AssignOpportunity" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssignOpportunityRequest",
}) as any as S.Schema<AssignOpportunityRequest>;
export interface AssignOpportunityResponse {}
export const AssignOpportunityResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AssignOpportunityResponse",
}) as any as S.Schema<AssignOpportunityResponse>;
export type RelatedEntityType =
  | "Solutions"
  | "AwsProducts"
  | "AwsMarketplaceOffers"
  | "AwsMarketplaceOfferSets"
  | "AwsMarketplaceSolutions"
  | "AwsMarketplaceProducts"
  | (string & {});
export const RelatedEntityType = S.String;

export interface AssociateOpportunityRequest {
  Catalog: string;
  OpportunityIdentifier: string;
  RelatedEntityType: RelatedEntityType;
  RelatedEntityIdentifier: string;
}
export const AssociateOpportunityRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    OpportunityIdentifier: S.String,
    RelatedEntityType: RelatedEntityType,
    RelatedEntityIdentifier: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/AssociateOpportunity" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateOpportunityRequest",
}) as any as S.Schema<AssociateOpportunityRequest>;
export interface AssociateOpportunityResponse {}
export const AssociateOpportunityResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AssociateOpportunityResponse",
}) as any as S.Schema<AssociateOpportunityResponse>;
export type ClientToken = string;
export type EngagementTitle = string;
export type EngagementDescription = string;
export type EngagementContextIdentifier = string;
export type EngagementContextType =
  | "CustomerProject"
  | "Lead"
  | "ProspectingResult"
  | (string & {});
export const EngagementContextType = S.String;

export type Industry =
  | "Aerospace"
  | "Agriculture"
  | "Automotive"
  | "Computers and Electronics"
  | "Consumer Goods"
  | "Education"
  | "Energy - Oil and Gas"
  | "Energy - Power and Utilities"
  | "Financial Services"
  | "Gaming"
  | "Government"
  | "Healthcare"
  | "Hospitality"
  | "Life Sciences"
  | "Manufacturing"
  | "Marketing and Advertising"
  | "Media and Entertainment"
  | "Mining"
  | "Non-Profit Organization"
  | "Professional Services"
  | "Real Estate and Construction"
  | "Retail"
  | "Software and Internet"
  | "Telecommunications"
  | "Transportation and Logistics"
  | "Travel"
  | "Wholesale and Distribution"
  | "Other"
  | (string & {});
export const Industry = S.String;

export type CompanyName = string | redacted.Redacted<string>;
export type CompanyWebsiteUrl = string | redacted.Redacted<string>;
export type CountryCode =
  | "US"
  | "AF"
  | "AX"
  | "AL"
  | "DZ"
  | "AS"
  | "AD"
  | "AO"
  | "AI"
  | "AQ"
  | "AG"
  | "AR"
  | "AM"
  | "AW"
  | "AU"
  | "AT"
  | "AZ"
  | "BS"
  | "BH"
  | "BD"
  | "BB"
  | "BY"
  | "BE"
  | "BZ"
  | "BJ"
  | "BM"
  | "BT"
  | "BO"
  | "BQ"
  | "BA"
  | "BW"
  | "BV"
  | "BR"
  | "IO"
  | "BN"
  | "BG"
  | "BF"
  | "BI"
  | "KH"
  | "CM"
  | "CA"
  | "CV"
  | "KY"
  | "CF"
  | "TD"
  | "CL"
  | "CN"
  | "CX"
  | "CC"
  | "CO"
  | "KM"
  | "CG"
  | "CK"
  | "CR"
  | "CI"
  | "HR"
  | "CU"
  | "CW"
  | "CY"
  | "CZ"
  | "CD"
  | "DK"
  | "DJ"
  | "DM"
  | "DO"
  | "EC"
  | "EG"
  | "SV"
  | "GQ"
  | "ER"
  | "EE"
  | "ET"
  | "FK"
  | "FO"
  | "FJ"
  | "FI"
  | "FR"
  | "GF"
  | "PF"
  | "TF"
  | "GA"
  | "GM"
  | "GE"
  | "DE"
  | "GH"
  | "GI"
  | "GR"
  | "GL"
  | "GD"
  | "GP"
  | "GU"
  | "GT"
  | "GG"
  | "GN"
  | "GW"
  | "GY"
  | "HT"
  | "HM"
  | "VA"
  | "HN"
  | "HK"
  | "HU"
  | "IS"
  | "IN"
  | "ID"
  | "IR"
  | "IQ"
  | "IE"
  | "IM"
  | "IL"
  | "IT"
  | "JM"
  | "JP"
  | "JE"
  | "JO"
  | "KZ"
  | "KE"
  | "KI"
  | "KR"
  | "KW"
  | "KG"
  | "LA"
  | "LV"
  | "LB"
  | "LS"
  | "LR"
  | "LY"
  | "LI"
  | "LT"
  | "LU"
  | "MO"
  | "MK"
  | "MG"
  | "MW"
  | "MY"
  | "MV"
  | "ML"
  | "MT"
  | "MH"
  | "MQ"
  | "MR"
  | "MU"
  | "YT"
  | "MX"
  | "FM"
  | "MD"
  | "MC"
  | "MN"
  | "ME"
  | "MS"
  | "MA"
  | "MZ"
  | "MM"
  | "NA"
  | "NR"
  | "NP"
  | "NL"
  | "AN"
  | "NC"
  | "NZ"
  | "NI"
  | "NE"
  | "NG"
  | "NU"
  | "NF"
  | "MP"
  | "NO"
  | "OM"
  | "PK"
  | "PW"
  | "PS"
  | "PA"
  | "PG"
  | "PY"
  | "PE"
  | "PH"
  | "PN"
  | "PL"
  | "PT"
  | "PR"
  | "QA"
  | "RE"
  | "RO"
  | "RU"
  | "RW"
  | "BL"
  | "SH"
  | "KN"
  | "LC"
  | "MF"
  | "PM"
  | "VC"
  | "WS"
  | "SM"
  | "ST"
  | "SA"
  | "SN"
  | "RS"
  | "SC"
  | "SL"
  | "SG"
  | "SX"
  | "SK"
  | "SI"
  | "SB"
  | "SO"
  | "ZA"
  | "GS"
  | "SS"
  | "ES"
  | "LK"
  | "SD"
  | "SR"
  | "SJ"
  | "SZ"
  | "SE"
  | "CH"
  | "SY"
  | "TW"
  | "TJ"
  | "TZ"
  | "TH"
  | "TL"
  | "TG"
  | "TK"
  | "TO"
  | "TT"
  | "TN"
  | "TR"
  | "TM"
  | "TC"
  | "TV"
  | "UG"
  | "UA"
  | "AE"
  | "GB"
  | "UM"
  | "UY"
  | "UZ"
  | "VU"
  | "VE"
  | "VN"
  | "VG"
  | "VI"
  | "WF"
  | "EH"
  | "YE"
  | "ZM"
  | "ZW"
  | (string & {});
export const CountryCode = S.String;

export interface EngagementCustomer {
  Industry: Industry;
  CompanyName: string | redacted.Redacted<string>;
  WebsiteUrl: string | redacted.Redacted<string>;
  CountryCode: CountryCode;
}
export const EngagementCustomer = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Industry: Industry,
    CompanyName: SensitiveString,
    WebsiteUrl: SensitiveString,
    CountryCode: CountryCode,
  }),
).annotate({
  identifier: "EngagementCustomer",
}) as any as S.Schema<EngagementCustomer>;
export type EngagementCustomerProjectTitle = string;
export type EngagementCustomerBusinessProblem =
  | string
  | redacted.Redacted<string>;
export interface EngagementCustomerProjectDetails {
  Title: string;
  BusinessProblem: string | redacted.Redacted<string>;
  TargetCompletionDate: string;
}
export const EngagementCustomerProjectDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Title: S.String,
    BusinessProblem: SensitiveString,
    TargetCompletionDate: S.String,
  }),
).annotate({
  identifier: "EngagementCustomerProjectDetails",
}) as any as S.Schema<EngagementCustomerProjectDetails>;
export interface CustomerProjectsContext {
  Customer?: EngagementCustomer;
  Project?: EngagementCustomerProjectDetails;
}
export const CustomerProjectsContext = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Customer: S.optional(EngagementCustomer),
    Project: S.optional(EngagementCustomerProjectDetails),
  }),
).annotate({
  identifier: "CustomerProjectsContext",
}) as any as S.Schema<CustomerProjectsContext>;
export interface LeadInsights {
  LeadReadinessScore?: string;
}
export const LeadInsights = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LeadReadinessScore: S.optional(S.String) }),
).annotate({ identifier: "LeadInsights" }) as any as S.Schema<LeadInsights>;
export type LeadQualificationStatus = string;
export type LeadIndustry = string;
export type LeadWebsiteUrl = string | redacted.Redacted<string>;
export type LeadCountryCode = string | redacted.Redacted<string>;
export interface LeadAddress {
  City?: string;
  PostalCode?: string;
  StateOrRegion?: string;
  CountryCode?: string | redacted.Redacted<string>;
}
export const LeadAddress = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    City: S.optional(S.String),
    PostalCode: S.optional(S.String),
    StateOrRegion: S.optional(S.String),
    CountryCode: S.optional(SensitiveString),
  }),
).annotate({ identifier: "LeadAddress" }) as any as S.Schema<LeadAddress>;
export type AwsMaturity = string;
export type LeadMarketSegment = string;
export interface LeadCustomer {
  Industry?: string;
  CompanyName: string | redacted.Redacted<string>;
  WebsiteUrl?: string | redacted.Redacted<string>;
  Address?: LeadAddress;
  AwsMaturity?: string;
  MarketSegment?: string;
}
export const LeadCustomer = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Industry: S.optional(S.String),
    CompanyName: SensitiveString,
    WebsiteUrl: S.optional(SensitiveString),
    Address: S.optional(LeadAddress),
    AwsMaturity: S.optional(S.String),
    MarketSegment: S.optional(S.String),
  }),
).annotate({ identifier: "LeadCustomer" }) as any as S.Schema<LeadCustomer>;
export type LeadSourceType = string;
export type LeadSourceId = string;
export type LeadSourceName = string;
export type EngagementUseCase = string;
export type CustomerAction = string;
export type LeadBusinessProblem = string | redacted.Redacted<string>;
export type LeadJobTitle = string | redacted.Redacted<string>;
export type LeadEmail = string | redacted.Redacted<string>;
export type LeadPhoneNumber = string | redacted.Redacted<string>;
export interface LeadContact {
  BusinessTitle: string | redacted.Redacted<string>;
  Email: string | redacted.Redacted<string>;
  FirstName: string | redacted.Redacted<string>;
  LastName: string | redacted.Redacted<string>;
  Phone?: string | redacted.Redacted<string>;
}
export const LeadContact = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BusinessTitle: SensitiveString,
    Email: SensitiveString,
    FirstName: SensitiveString,
    LastName: SensitiveString,
    Phone: S.optional(SensitiveString),
  }),
).annotate({ identifier: "LeadContact" }) as any as S.Schema<LeadContact>;
export interface LeadInteraction {
  SourceType?: string;
  SourceId?: string;
  SourceName?: string;
  Usecase?: string;
  InteractionDate?: Date;
  CustomerAction?: string;
  BusinessProblem?: string | redacted.Redacted<string>;
  Contact: LeadContact;
}
export const LeadInteraction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceType: S.optional(S.String),
    SourceId: S.optional(S.String),
    SourceName: S.optional(S.String),
    Usecase: S.optional(S.String),
    InteractionDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    CustomerAction: S.optional(S.String),
    BusinessProblem: S.optional(SensitiveString),
    Contact: LeadContact,
  }),
).annotate({
  identifier: "LeadInteraction",
}) as any as S.Schema<LeadInteraction>;
export type LeadInteractionList = LeadInteraction[];
export const LeadInteractionList = /*@__PURE__*/ S.Array(LeadInteraction);
export interface LeadContext {
  Insights?: LeadInsights;
  QualificationStatus?: string;
  Customer: LeadCustomer;
  Interactions: LeadInteraction[];
}
export const LeadContext = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Insights: S.optional(LeadInsights),
    QualificationStatus: S.optional(S.String),
    Customer: LeadCustomer,
    Interactions: LeadInteractionList,
  }),
).annotate({ identifier: "LeadContext" }) as any as S.Schema<LeadContext>;
export type ProspectingAccountName = string;
export type ProspectingGeo = string;
export type ProspectingRegion = string;
export type ProspectingSubRegion = string;
export type ProspectingSubIndustry = string;
export type ProspectingSegment = string;
export type ProspectingCompanySize = string;
export type EligibleProgramsList = string[];
export const EligibleProgramsList = /*@__PURE__*/ S.Array(S.String);
export type ProspectingPublicProfileSummary = string;
export interface ProspectingResultCustomer {
  AccountName?: string;
  Geo?: string;
  Region?: string;
  SubRegion?: string;
  Country?: CountryCode;
  Industry?: Industry;
  SubIndustry?: string;
  Segment?: string;
  CompanySize?: string;
  EligiblePrograms?: string[];
  PublicProfileSummary?: string;
}
export const ProspectingResultCustomer = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountName: S.optional(S.String),
    Geo: S.optional(S.String),
    Region: S.optional(S.String),
    SubRegion: S.optional(S.String),
    Country: S.optional(CountryCode),
    Industry: S.optional(Industry),
    SubIndustry: S.optional(S.String),
    Segment: S.optional(S.String),
    CompanySize: S.optional(S.String),
    EligiblePrograms: S.optional(EligibleProgramsList),
    PublicProfileSummary: S.optional(S.String),
  }),
).annotate({
  identifier: "ProspectingResultCustomer",
}) as any as S.Schema<ProspectingResultCustomer>;
export type EngagementScoreLevel = string;
export interface ProspectingInsights {
  MarketplaceEngagementScore?: string;
  SolutionScore?: string;
  SolutionCategory?: string;
  SolutionSubCategory?: string;
}
export const ProspectingInsights = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MarketplaceEngagementScore: S.optional(S.String),
    SolutionScore: S.optional(S.String),
    SolutionCategory: S.optional(S.String),
    SolutionSubCategory: S.optional(S.String),
  }),
).annotate({
  identifier: "ProspectingInsights",
}) as any as S.Schema<ProspectingInsights>;
export type ProspectingTaskIdentifier = string;
export type TaskArn = string;
export type TaskName = string;
export interface ProspectingResultAws {
  Customer?: ProspectingResultCustomer;
  Insights?: ProspectingInsights;
  StartTime?: Date;
  EndTime?: Date;
  TaskId?: string;
  TaskArn?: string;
  TaskName?: string;
}
export const ProspectingResultAws = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Customer: S.optional(ProspectingResultCustomer),
    Insights: S.optional(ProspectingInsights),
    StartTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    EndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    TaskId: S.optional(S.String),
    TaskArn: S.optional(S.String),
    TaskName: S.optional(S.String),
  }),
).annotate({
  identifier: "ProspectingResultAws",
}) as any as S.Schema<ProspectingResultAws>;
export interface ProspectingResult {
  Aws?: ProspectingResultAws;
}
export const ProspectingResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Aws: S.optional(ProspectingResultAws) }),
).annotate({
  identifier: "ProspectingResult",
}) as any as S.Schema<ProspectingResult>;
export type EngagementContextPayload =
  | {
      CustomerProject: CustomerProjectsContext;
      Lead?: never;
      ProspectingResult?: never;
    }
  | { CustomerProject?: never; Lead: LeadContext; ProspectingResult?: never }
  | {
      CustomerProject?: never;
      Lead?: never;
      ProspectingResult: ProspectingResult;
    };
export const EngagementContextPayload = /*@__PURE__*/ S.Union([
  S.Struct({ CustomerProject: CustomerProjectsContext }),
  S.Struct({ Lead: LeadContext }),
  S.Struct({ ProspectingResult: ProspectingResult }),
]);
export interface EngagementContextDetails {
  Id?: string;
  Type: EngagementContextType;
  Payload?: EngagementContextPayload;
}
export const EngagementContextDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Type: EngagementContextType,
    Payload: S.optional(EngagementContextPayload),
  }),
).annotate({
  identifier: "EngagementContextDetails",
}) as any as S.Schema<EngagementContextDetails>;
export type EngagementContexts = EngagementContextDetails[];
export const EngagementContexts = /*@__PURE__*/ S.Array(
  EngagementContextDetails,
);
export interface CreateEngagementRequest {
  Catalog: string;
  ClientToken: string;
  Title?: string;
  Description?: string;
  Contexts?: EngagementContextDetails[];
}
export const CreateEngagementRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    ClientToken: S.String.pipe(T.IdempotencyToken()),
    Title: S.optional(S.String),
    Description: S.optional(S.String),
    Contexts: S.optional(EngagementContexts),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CreateEngagement" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateEngagementRequest",
}) as any as S.Schema<CreateEngagementRequest>;
export type EngagementIdentifier = string;
export type EngagementArn = string;
export interface CreateEngagementResponse {
  Id?: string;
  Arn?: string;
  ModifiedAt?: Date;
}
export const CreateEngagementResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Arn: S.optional(S.String),
    ModifiedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "CreateEngagementResponse",
}) as any as S.Schema<CreateEngagementResponse>;
export type EngagementArnOrIdentifier = string;
export interface CreateEngagementContextRequest {
  Catalog: string;
  EngagementIdentifier: string;
  ClientToken: string;
  Type: EngagementContextType;
  Payload: EngagementContextPayload;
}
export const CreateEngagementContextRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    EngagementIdentifier: S.String,
    ClientToken: S.String.pipe(T.IdempotencyToken()),
    Type: EngagementContextType,
    Payload: EngagementContextPayload,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CreateEngagementContext" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateEngagementContextRequest",
}) as any as S.Schema<CreateEngagementContextRequest>;
export interface CreateEngagementContextResponse {
  EngagementId?: string;
  EngagementArn?: string;
  EngagementLastModifiedAt?: Date;
  ContextId?: string;
}
export const CreateEngagementContextResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EngagementId: S.optional(S.String),
    EngagementArn: S.optional(S.String),
    EngagementLastModifiedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ContextId: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateEngagementContextResponse",
}) as any as S.Schema<CreateEngagementContextResponse>;
export type InvitationMessage = string | redacted.Redacted<string>;
export type Alias = string | redacted.Redacted<string>;
export type AwsAccount = string | redacted.Redacted<string>;
export interface AccountReceiver {
  Alias?: string | redacted.Redacted<string>;
  AwsAccountId: string | redacted.Redacted<string>;
}
export const AccountReceiver = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Alias: S.optional(SensitiveString),
    AwsAccountId: SensitiveString,
  }),
).annotate({
  identifier: "AccountReceiver",
}) as any as S.Schema<AccountReceiver>;
export type Receiver = { Account: AccountReceiver };
export const Receiver = /*@__PURE__*/ S.Union([
  S.Struct({ Account: AccountReceiver }),
]);
export type SenderContactEmail = string | redacted.Redacted<string>;
export interface SenderContact {
  Email: string | redacted.Redacted<string>;
  FirstName?: string | redacted.Redacted<string>;
  LastName?: string | redacted.Redacted<string>;
  BusinessTitle?: string | redacted.Redacted<string>;
  Phone?: string | redacted.Redacted<string>;
}
export const SenderContact = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Email: SensitiveString,
    FirstName: S.optional(SensitiveString),
    LastName: S.optional(SensitiveString),
    BusinessTitle: S.optional(SensitiveString),
    Phone: S.optional(SensitiveString),
  }),
).annotate({ identifier: "SenderContact" }) as any as S.Schema<SenderContact>;
export type SenderContactList = SenderContact[];
export const SenderContactList = /*@__PURE__*/ S.Array(SenderContact);
export type ReceiverResponsibility =
  | "Distributor"
  | "Reseller"
  | "Hardware Partner"
  | "Managed Service Provider"
  | "Software Partner"
  | "Services Partner"
  | "Training Partner"
  | "Co-Sell Facilitator"
  | "Facilitator"
  | (string & {});
export const ReceiverResponsibility = S.String;

export type ReceiverResponsibilityList = ReceiverResponsibility[];
export const ReceiverResponsibilityList = /*@__PURE__*/ S.Array(
  ReceiverResponsibility,
);
export type Amount = string | redacted.Redacted<string>;
export type CurrencyCode =
  | "USD"
  | "EUR"
  | "GBP"
  | "AUD"
  | "CAD"
  | "CNY"
  | "NZD"
  | "INR"
  | "JPY"
  | "CHF"
  | "SEK"
  | "AED"
  | "AFN"
  | "ALL"
  | "AMD"
  | "ANG"
  | "AOA"
  | "ARS"
  | "AWG"
  | "AZN"
  | "BAM"
  | "BBD"
  | "BDT"
  | "BGN"
  | "BHD"
  | "BIF"
  | "BMD"
  | "BND"
  | "BOB"
  | "BOV"
  | "BRL"
  | "BSD"
  | "BTN"
  | "BWP"
  | "BYN"
  | "BZD"
  | "CDF"
  | "CHE"
  | "CHW"
  | "CLF"
  | "CLP"
  | "COP"
  | "COU"
  | "CRC"
  | "CUC"
  | "CUP"
  | "CVE"
  | "CZK"
  | "DJF"
  | "DKK"
  | "DOP"
  | "DZD"
  | "EGP"
  | "ERN"
  | "ETB"
  | "FJD"
  | "FKP"
  | "GEL"
  | "GHS"
  | "GIP"
  | "GMD"
  | "GNF"
  | "GTQ"
  | "GYD"
  | "HKD"
  | "HNL"
  | "HRK"
  | "HTG"
  | "HUF"
  | "IDR"
  | "ILS"
  | "IQD"
  | "IRR"
  | "ISK"
  | "JMD"
  | "JOD"
  | "KES"
  | "KGS"
  | "KHR"
  | "KMF"
  | "KPW"
  | "KRW"
  | "KWD"
  | "KYD"
  | "KZT"
  | "LAK"
  | "LBP"
  | "LKR"
  | "LRD"
  | "LSL"
  | "LYD"
  | "MAD"
  | "MDL"
  | "MGA"
  | "MKD"
  | "MMK"
  | "MNT"
  | "MOP"
  | "MRU"
  | "MUR"
  | "MVR"
  | "MWK"
  | "MXN"
  | "MXV"
  | "MYR"
  | "MZN"
  | "NAD"
  | "NGN"
  | "NIO"
  | "NOK"
  | "NPR"
  | "OMR"
  | "PAB"
  | "PEN"
  | "PGK"
  | "PHP"
  | "PKR"
  | "PLN"
  | "PYG"
  | "QAR"
  | "RON"
  | "RSD"
  | "RUB"
  | "RWF"
  | "SAR"
  | "SBD"
  | "SCR"
  | "SDG"
  | "SGD"
  | "SHP"
  | "SLL"
  | "SOS"
  | "SRD"
  | "SSP"
  | "STN"
  | "SVC"
  | "SYP"
  | "SZL"
  | "THB"
  | "TJS"
  | "TMT"
  | "TND"
  | "TOP"
  | "TRY"
  | "TTD"
  | "TWD"
  | "TZS"
  | "UAH"
  | "UGX"
  | "USN"
  | "UYI"
  | "UYU"
  | "UZS"
  | "VEF"
  | "VND"
  | "VUV"
  | "WST"
  | "XAF"
  | "XCD"
  | "XDR"
  | "XOF"
  | "XPF"
  | "XSU"
  | "XUA"
  | "YER"
  | "ZAR"
  | "ZMW"
  | "ZWL"
  | (string & {});
export const CurrencyCode = S.String;

export type PaymentFrequency = "Monthly" | (string & {});
export const PaymentFrequency = S.String;

export type EstimationUrl = string;
export interface ExpectedCustomerSpend {
  Amount?: string | redacted.Redacted<string>;
  CurrencyCode: CurrencyCode;
  Frequency: PaymentFrequency;
  TargetCompany: string;
  EstimationUrl?: string;
}
export const ExpectedCustomerSpend = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Amount: S.optional(SensitiveString),
    CurrencyCode: CurrencyCode,
    Frequency: PaymentFrequency,
    TargetCompany: S.String,
    EstimationUrl: S.optional(S.String),
  }),
).annotate({
  identifier: "ExpectedCustomerSpend",
}) as any as S.Schema<ExpectedCustomerSpend>;
export type ExpectedCustomerSpendList = ExpectedCustomerSpend[];
export const ExpectedCustomerSpendList = /*@__PURE__*/ S.Array(
  ExpectedCustomerSpend,
);
export interface ProjectDetails {
  BusinessProblem: string | redacted.Redacted<string>;
  Title: string;
  TargetCompletionDate: string;
  ExpectedCustomerSpend: ExpectedCustomerSpend[];
}
export const ProjectDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BusinessProblem: SensitiveString,
    Title: S.String,
    TargetCompletionDate: S.String,
    ExpectedCustomerSpend: ExpectedCustomerSpendList,
  }),
).annotate({ identifier: "ProjectDetails" }) as any as S.Schema<ProjectDetails>;
export interface OpportunityInvitationPayload {
  SenderContacts?: SenderContact[];
  ReceiverResponsibilities: ReceiverResponsibility[];
  Customer: EngagementCustomer;
  Project: ProjectDetails;
}
export const OpportunityInvitationPayload = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SenderContacts: S.optional(SenderContactList),
    ReceiverResponsibilities: ReceiverResponsibilityList,
    Customer: EngagementCustomer,
    Project: ProjectDetails,
  }),
).annotate({
  identifier: "OpportunityInvitationPayload",
}) as any as S.Schema<OpportunityInvitationPayload>;
export interface LeadInvitationCustomer {
  Industry?: string;
  CompanyName: string | redacted.Redacted<string>;
  WebsiteUrl?: string | redacted.Redacted<string>;
  CountryCode?: string | redacted.Redacted<string>;
  AwsMaturity?: string;
  MarketSegment?: string;
}
export const LeadInvitationCustomer = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Industry: S.optional(S.String),
    CompanyName: SensitiveString,
    WebsiteUrl: S.optional(SensitiveString),
    CountryCode: S.optional(SensitiveString),
    AwsMaturity: S.optional(S.String),
    MarketSegment: S.optional(S.String),
  }),
).annotate({
  identifier: "LeadInvitationCustomer",
}) as any as S.Schema<LeadInvitationCustomer>;
export interface LeadInvitationInteraction {
  SourceType?: string;
  SourceId?: string;
  SourceName?: string;
  Usecase?: string;
  ContactBusinessTitle: string | redacted.Redacted<string>;
}
export const LeadInvitationInteraction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceType: S.optional(S.String),
    SourceId: S.optional(S.String),
    SourceName: S.optional(S.String),
    Usecase: S.optional(S.String),
    ContactBusinessTitle: SensitiveString,
  }),
).annotate({
  identifier: "LeadInvitationInteraction",
}) as any as S.Schema<LeadInvitationInteraction>;
export interface LeadInvitationPayload {
  Customer: LeadInvitationCustomer;
  Interaction: LeadInvitationInteraction;
}
export const LeadInvitationPayload = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Customer: LeadInvitationCustomer,
    Interaction: LeadInvitationInteraction,
  }),
).annotate({
  identifier: "LeadInvitationPayload",
}) as any as S.Schema<LeadInvitationPayload>;
export type Payload =
  | {
      OpportunityInvitation: OpportunityInvitationPayload;
      LeadInvitation?: never;
    }
  | { OpportunityInvitation?: never; LeadInvitation: LeadInvitationPayload };
export const Payload = /*@__PURE__*/ S.Union([
  S.Struct({ OpportunityInvitation: OpportunityInvitationPayload }),
  S.Struct({ LeadInvitation: LeadInvitationPayload }),
]);
export interface Invitation {
  Message: string | redacted.Redacted<string>;
  Receiver: Receiver;
  Payload: Payload;
}
export const Invitation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Message: SensitiveString, Receiver: Receiver, Payload: Payload }),
).annotate({ identifier: "Invitation" }) as any as S.Schema<Invitation>;
export interface CreateEngagementInvitationRequest {
  Catalog: string;
  ClientToken: string;
  EngagementIdentifier: string;
  Invitation: Invitation;
}
export const CreateEngagementInvitationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    ClientToken: S.String.pipe(T.IdempotencyToken()),
    EngagementIdentifier: S.String,
    Invitation: Invitation,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CreateEngagementInvitation" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateEngagementInvitationRequest",
}) as any as S.Schema<CreateEngagementInvitationRequest>;
export type EngagementInvitationIdentifier = string;
export type EngagementInvitationArn = string;
export interface CreateEngagementInvitationResponse {
  Id: string;
  Arn: string;
}
export const CreateEngagementInvitationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.String, Arn: S.String }),
).annotate({
  identifier: "CreateEngagementInvitationResponse",
}) as any as S.Schema<CreateEngagementInvitationResponse>;
export type PrimaryNeedFromAws =
  | "Co-Sell - Architectural Validation"
  | "Co-Sell - Business Presentation"
  | "Co-Sell - Competitive Information"
  | "Co-Sell - Pricing Assistance"
  | "Co-Sell - Technical Consultation"
  | "Co-Sell - Total Cost of Ownership Evaluation"
  | "Co-Sell - Deal Support"
  | "Co-Sell - Support for Public Tender / RFx"
  | (string & {});
export const PrimaryNeedFromAws = S.String;

export type PrimaryNeedsFromAws = PrimaryNeedFromAws[];
export const PrimaryNeedsFromAws = /*@__PURE__*/ S.Array(PrimaryNeedFromAws);
export type NationalSecurity = "Yes" | "No" | (string & {});
export const NationalSecurity = S.String;

export type WebsiteUrl = string | redacted.Redacted<string>;
export type AddressPart = string | redacted.Redacted<string>;
export interface Address {
  City?: string | redacted.Redacted<string>;
  PostalCode?: string | redacted.Redacted<string>;
  StateOrRegion?: string | redacted.Redacted<string>;
  CountryCode?: CountryCode;
  StreetAddress?: string | redacted.Redacted<string>;
}
export const Address = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    City: S.optional(SensitiveString),
    PostalCode: S.optional(SensitiveString),
    StateOrRegion: S.optional(SensitiveString),
    CountryCode: S.optional(CountryCode),
    StreetAddress: S.optional(SensitiveString),
  }),
).annotate({ identifier: "Address" }) as any as S.Schema<Address>;
export type DunsNumber = string | redacted.Redacted<string>;
export interface Account {
  Industry?: Industry;
  OtherIndustry?: string;
  CompanyName: string | redacted.Redacted<string>;
  WebsiteUrl?: string | redacted.Redacted<string>;
  AwsAccountId?: string | redacted.Redacted<string>;
  Address?: Address;
  Duns?: string | redacted.Redacted<string>;
}
export const Account = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Industry: S.optional(Industry),
    OtherIndustry: S.optional(S.String),
    CompanyName: SensitiveString,
    WebsiteUrl: S.optional(SensitiveString),
    AwsAccountId: S.optional(SensitiveString),
    Address: S.optional(Address),
    Duns: S.optional(SensitiveString),
  }),
).annotate({ identifier: "Account" }) as any as S.Schema<Account>;
export interface Contact {
  Email?: string | redacted.Redacted<string>;
  FirstName?: string | redacted.Redacted<string>;
  LastName?: string | redacted.Redacted<string>;
  BusinessTitle?: string | redacted.Redacted<string>;
  Phone?: string | redacted.Redacted<string>;
}
export const Contact = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Email: S.optional(SensitiveString),
    FirstName: S.optional(SensitiveString),
    LastName: S.optional(SensitiveString),
    BusinessTitle: S.optional(SensitiveString),
    Phone: S.optional(SensitiveString),
  }),
).annotate({ identifier: "Contact" }) as any as S.Schema<Contact>;
export type CustomerContactsList = Contact[];
export const CustomerContactsList = /*@__PURE__*/ S.Array(Contact);
export interface Customer {
  Account?: Account;
  Contacts?: Contact[];
}
export const Customer = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Account: S.optional(Account),
    Contacts: S.optional(CustomerContactsList),
  }),
).annotate({ identifier: "Customer" }) as any as S.Schema<Customer>;
export type DeliveryModel =
  | "SaaS or PaaS"
  | "BYOL or AMI"
  | "Managed Services"
  | "Professional Services"
  | "Resell"
  | "Other"
  | (string & {});
export const DeliveryModel = S.String;

export type DeliveryModels = DeliveryModel[];
export const DeliveryModels = /*@__PURE__*/ S.Array(DeliveryModel);
export type ExpectedContractDurationTerm = "Months" | (string & {});
export const ExpectedContractDurationTerm = S.String;

export interface ExpectedContractDuration {
  Term: ExpectedContractDurationTerm;
  Value: string;
}
export const ExpectedContractDuration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Term: ExpectedContractDurationTerm, Value: S.String }),
).annotate({
  identifier: "ExpectedContractDuration",
}) as any as S.Schema<ExpectedContractDuration>;
export type PiiString = string | redacted.Redacted<string>;
export type ApnPrograms = string[];
export const ApnPrograms = /*@__PURE__*/ S.Array(S.String);
export type SalesActivity =
  | "Initialized discussions with customer"
  | "Customer has shown interest in solution"
  | "Conducted POC / Demo"
  | "In evaluation / planning stage"
  | "Agreed on solution to Business Problem"
  | "Completed Action Plan"
  | "Finalized Deployment Need"
  | "SOW Signed"
  | (string & {});
export const SalesActivity = S.String;

export type SalesActivities = SalesActivity[];
export const SalesActivities = /*@__PURE__*/ S.Array(SalesActivity);
export type CompetitorName =
  | "Oracle Cloud"
  | "On-Prem"
  | "Co-location"
  | "Akamai"
  | "AliCloud"
  | "Google Cloud Platform"
  | "IBM Softlayer"
  | "Microsoft Azure"
  | "Other- Cost Optimization"
  | "No Competition"
  | "*Other"
  | (string & {});
export const CompetitorName = S.String;

export type AwsPartition = "aws-eusc" | (string & {});
export const AwsPartition = S.String;

export interface Project {
  DeliveryModels?: DeliveryModel[];
  ExpectedCustomerSpend?: ExpectedCustomerSpend[];
  ExpectedContractDuration?: ExpectedContractDuration;
  Title?: string | redacted.Redacted<string>;
  ApnPrograms?: string[];
  CustomerBusinessProblem?: string | redacted.Redacted<string>;
  CustomerUseCase?: string;
  RelatedOpportunityIdentifier?: string;
  SalesActivities?: SalesActivity[];
  CompetitorName?: CompetitorName;
  OtherCompetitorNames?: string;
  OtherSolutionDescription?: string | redacted.Redacted<string>;
  AdditionalComments?: string;
  AwsPartition?: AwsPartition;
}
export const Project = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeliveryModels: S.optional(DeliveryModels),
    ExpectedCustomerSpend: S.optional(ExpectedCustomerSpendList),
    ExpectedContractDuration: S.optional(ExpectedContractDuration),
    Title: S.optional(SensitiveString),
    ApnPrograms: S.optional(ApnPrograms),
    CustomerBusinessProblem: S.optional(SensitiveString),
    CustomerUseCase: S.optional(S.String),
    RelatedOpportunityIdentifier: S.optional(S.String),
    SalesActivities: S.optional(SalesActivities),
    CompetitorName: S.optional(CompetitorName),
    OtherCompetitorNames: S.optional(S.String),
    OtherSolutionDescription: S.optional(SensitiveString),
    AdditionalComments: S.optional(S.String),
    AwsPartition: S.optional(AwsPartition),
  }),
).annotate({ identifier: "Project" }) as any as S.Schema<Project>;
export type OpportunityType =
  | "Net New Business"
  | "Flat Renewal"
  | "Expansion"
  | (string & {});
export const OpportunityType = S.String;

export type MarketingSource = "Marketing Activity" | "None" | (string & {});
export const MarketingSource = S.String;

export type UseCases = string[];
export const UseCases = /*@__PURE__*/ S.Array(S.String);
export type Channel =
  | "AWS Marketing Central"
  | "Content Syndication"
  | "Display"
  | "Email"
  | "Live Event"
  | "Out Of Home (OOH)"
  | "Print"
  | "Search"
  | "Social"
  | "Telemarketing"
  | "TV"
  | "Video"
  | "Virtual Event"
  | (string & {});
export const Channel = S.String;

export type Channels = Channel[];
export const Channels = /*@__PURE__*/ S.Array(Channel);
export type AwsFundingUsed = "Yes" | "No" | (string & {});
export const AwsFundingUsed = S.String;

export interface Marketing {
  CampaignName?: string;
  Source?: MarketingSource;
  UseCases?: string[];
  Channels?: Channel[];
  AwsFundingUsed?: AwsFundingUsed;
}
export const Marketing = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CampaignName: S.optional(S.String),
    Source: S.optional(MarketingSource),
    UseCases: S.optional(UseCases),
    Channels: S.optional(Channels),
    AwsFundingUsed: S.optional(AwsFundingUsed),
  }),
).annotate({ identifier: "Marketing" }) as any as S.Schema<Marketing>;
export type RevenueModel =
  | "Contract"
  | "Pay-as-you-go"
  | "Subscription"
  | (string & {});
export const RevenueModel = S.String;

export interface MonetaryValue {
  Amount: string;
  CurrencyCode: CurrencyCode;
}
export const MonetaryValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Amount: S.String, CurrencyCode: CurrencyCode }),
).annotate({ identifier: "MonetaryValue" }) as any as S.Schema<MonetaryValue>;
export interface SoftwareRevenue {
  DeliveryModel?: RevenueModel;
  Value?: MonetaryValue;
  EffectiveDate?: string;
  ExpirationDate?: string;
}
export const SoftwareRevenue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeliveryModel: S.optional(RevenueModel),
    Value: S.optional(MonetaryValue),
    EffectiveDate: S.optional(S.String),
    ExpirationDate: S.optional(S.String),
  }),
).annotate({
  identifier: "SoftwareRevenue",
}) as any as S.Schema<SoftwareRevenue>;
export type Stage =
  | "Prospect"
  | "Qualified"
  | "Technical Validation"
  | "Business Validation"
  | "Committed"
  | "Launched"
  | "Closed Lost"
  | (string & {});
export const Stage = S.String;

export type ClosedLostReason =
  | "Customer Deficiency"
  | "Delay / Cancellation of Project"
  | "Legal / Tax / Regulatory"
  | "Lost to Competitor - Google"
  | "Lost to Competitor - Microsoft"
  | "Lost to Competitor - SoftLayer"
  | "Lost to Competitor - VMWare"
  | "Lost to Competitor - Other"
  | "No Opportunity"
  | "On Premises Deployment"
  | "Partner Gap"
  | "Price"
  | "Security / Compliance"
  | "Technical Limitations"
  | "Customer Experience"
  | "Other"
  | "People/Relationship/Governance"
  | "Product/Technology"
  | "Financial/Commercial"
  | (string & {});
export const ClosedLostReason = S.String;

export type ReviewStatus =
  | "Pending Submission"
  | "Submitted"
  | "In review"
  | "Approved"
  | "Rejected"
  | "Action Required"
  | (string & {});
export const ReviewStatus = S.String;

export interface NextStepsHistory {
  Value: string;
  Time: Date;
}
export const NextStepsHistory = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Value: S.String,
    Time: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "NextStepsHistory",
}) as any as S.Schema<NextStepsHistory>;
export type NextStepsHistories = NextStepsHistory[];
export const NextStepsHistories = /*@__PURE__*/ S.Array(NextStepsHistory);
export interface LifeCycle {
  Stage?: Stage;
  ClosedLostReason?: ClosedLostReason;
  NextSteps?: string | redacted.Redacted<string>;
  TargetCloseDate?: string;
  ReviewStatus?: ReviewStatus;
  ReviewComments?: string;
  ReviewStatusReason?: string;
  NextStepsHistory?: NextStepsHistory[];
}
export const LifeCycle = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Stage: S.optional(Stage),
    ClosedLostReason: S.optional(ClosedLostReason),
    NextSteps: S.optional(SensitiveString),
    TargetCloseDate: S.optional(S.String),
    ReviewStatus: S.optional(ReviewStatus),
    ReviewComments: S.optional(S.String),
    ReviewStatusReason: S.optional(S.String),
    NextStepsHistory: S.optional(NextStepsHistories),
  }),
).annotate({ identifier: "LifeCycle" }) as any as S.Schema<LifeCycle>;
export type OpportunityOrigin =
  | "AWS Referral"
  | "Partner Referral"
  | (string & {});
export const OpportunityOrigin = S.String;

export type PartnerOpportunityTeamMembersList = Contact[];
export const PartnerOpportunityTeamMembersList = /*@__PURE__*/ S.Array(Contact);
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
export interface CreateOpportunityRequest {
  Catalog: string;
  PrimaryNeedsFromAws?: PrimaryNeedFromAws[];
  NationalSecurity?: NationalSecurity;
  PartnerOpportunityIdentifier?: string;
  Customer?: Customer;
  Project?: Project;
  OpportunityType?: OpportunityType;
  Marketing?: Marketing;
  SoftwareRevenue?: SoftwareRevenue;
  ClientToken: string;
  LifeCycle?: LifeCycle;
  Origin?: OpportunityOrigin;
  OpportunityTeam?: Contact[];
  Tags?: Tag[];
}
export const CreateOpportunityRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    PrimaryNeedsFromAws: S.optional(PrimaryNeedsFromAws),
    NationalSecurity: S.optional(NationalSecurity),
    PartnerOpportunityIdentifier: S.optional(S.String),
    Customer: S.optional(Customer),
    Project: S.optional(Project),
    OpportunityType: S.optional(OpportunityType),
    Marketing: S.optional(Marketing),
    SoftwareRevenue: S.optional(SoftwareRevenue),
    ClientToken: S.String.pipe(T.IdempotencyToken()),
    LifeCycle: S.optional(LifeCycle),
    Origin: S.optional(OpportunityOrigin),
    OpportunityTeam: S.optional(PartnerOpportunityTeamMembersList),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CreateOpportunity" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateOpportunityRequest",
}) as any as S.Schema<CreateOpportunityRequest>;
export interface CreateOpportunityResponse {
  Id: string;
  PartnerOpportunityIdentifier?: string;
  LastModifiedDate?: Date;
}
export const CreateOpportunityResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.String,
    PartnerOpportunityIdentifier: S.optional(S.String),
    LastModifiedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "CreateOpportunityResponse",
}) as any as S.Schema<CreateOpportunityResponse>;
export type ResourceType = "Opportunity" | (string & {});
export const ResourceType = S.String;

export type ResourceIdentifier = string;
export type ResourceTemplateName = string;
export interface CreateResourceSnapshotRequest {
  Catalog: string;
  EngagementIdentifier: string;
  ResourceType: ResourceType;
  ResourceIdentifier: string;
  ResourceSnapshotTemplateIdentifier: string;
  ClientToken: string;
}
export const CreateResourceSnapshotRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    EngagementIdentifier: S.String,
    ResourceType: ResourceType,
    ResourceIdentifier: S.String,
    ResourceSnapshotTemplateIdentifier: S.String,
    ClientToken: S.String.pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CreateResourceSnapshot" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateResourceSnapshotRequest",
}) as any as S.Schema<CreateResourceSnapshotRequest>;
export type ResourceArn = string;
export type ResourceSnapshotRevision = number;
export interface CreateResourceSnapshotResponse {
  Arn?: string;
  Revision?: number;
}
export const CreateResourceSnapshotResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String), Revision: S.optional(S.Number) }),
).annotate({
  identifier: "CreateResourceSnapshotResponse",
}) as any as S.Schema<CreateResourceSnapshotResponse>;
export interface CreateResourceSnapshotJobRequest {
  Catalog: string;
  ClientToken: string;
  EngagementIdentifier: string;
  ResourceType: ResourceType;
  ResourceIdentifier: string;
  ResourceSnapshotTemplateIdentifier: string;
  Tags?: Tag[];
}
export const CreateResourceSnapshotJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    ClientToken: S.String.pipe(T.IdempotencyToken()),
    EngagementIdentifier: S.String,
    ResourceType: ResourceType,
    ResourceIdentifier: S.String,
    ResourceSnapshotTemplateIdentifier: S.String,
    Tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CreateResourceSnapshotJob" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateResourceSnapshotJobRequest",
}) as any as S.Schema<CreateResourceSnapshotJobRequest>;
export type ResourceSnapshotJobIdentifier = string;
export type ResourceSnapshotJobArn = string;
export interface CreateResourceSnapshotJobResponse {
  Id?: string;
  Arn?: string;
}
export const CreateResourceSnapshotJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.optional(S.String), Arn: S.optional(S.String) }),
).annotate({
  identifier: "CreateResourceSnapshotJobResponse",
}) as any as S.Schema<CreateResourceSnapshotJobResponse>;
export interface DeleteResourceSnapshotJobRequest {
  Catalog: string;
  ResourceSnapshotJobIdentifier: string;
}
export const DeleteResourceSnapshotJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Catalog: S.String, ResourceSnapshotJobIdentifier: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeleteResourceSnapshotJob" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteResourceSnapshotJobRequest",
}) as any as S.Schema<DeleteResourceSnapshotJobRequest>;
export interface DeleteResourceSnapshotJobResponse {}
export const DeleteResourceSnapshotJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteResourceSnapshotJobResponse",
}) as any as S.Schema<DeleteResourceSnapshotJobResponse>;
export interface DisassociateOpportunityRequest {
  Catalog: string;
  OpportunityIdentifier: string;
  RelatedEntityType: RelatedEntityType;
  RelatedEntityIdentifier: string;
}
export const DisassociateOpportunityRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    OpportunityIdentifier: S.String,
    RelatedEntityType: RelatedEntityType,
    RelatedEntityIdentifier: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DisassociateOpportunity" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateOpportunityRequest",
}) as any as S.Schema<DisassociateOpportunityRequest>;
export interface DisassociateOpportunityResponse {}
export const DisassociateOpportunityResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisassociateOpportunityResponse",
}) as any as S.Schema<DisassociateOpportunityResponse>;
export interface GetAwsOpportunitySummaryRequest {
  Catalog: string;
  RelatedOpportunityIdentifier: string;
}
export const GetAwsOpportunitySummaryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Catalog: S.String, RelatedOpportunityIdentifier: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetAwsOpportunitySummary" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAwsOpportunitySummaryRequest",
}) as any as S.Schema<GetAwsOpportunitySummaryRequest>;
export type SalesInvolvementType =
  | "For Visibility Only"
  | "Co-Sell"
  | (string & {});
export const SalesInvolvementType = S.String;

export type Visibility = "Full" | "Limited" | (string & {});
export const Visibility = S.String;

export type AwsClosedLostReason =
  | "Administrative"
  | "Business Associate Agreement"
  | "Company Acquired/Dissolved"
  | "Competitive Offering"
  | "Customer Data Requirement"
  | "Customer Deficiency"
  | "Customer Experience"
  | "Delay / Cancellation of Project"
  | "Duplicate"
  | "Duplicate Opportunity"
  | "Executive Blocker"
  | "Failed Vetting"
  | "Feature Limitation"
  | "Financial/Commercial"
  | "Insufficient Amazon Value"
  | "Insufficient AWS Value"
  | "International Constraints"
  | "Legal / Tax / Regulatory"
  | "Legal Terms and Conditions"
  | "Lost to Competitor"
  | "Lost to Competitor - Google"
  | "Lost to Competitor - Microsoft"
  | "Lost to Competitor - Other"
  | "Lost to Competitor - Rackspace"
  | "Lost to Competitor - SoftLayer"
  | "Lost to Competitor - VMWare"
  | "No Customer Reference"
  | "No Integration Resources"
  | "No Opportunity"
  | "No Perceived Value of MP"
  | "No Response"
  | "Not Committed to AWS"
  | "No Update"
  | "On Premises Deployment"
  | "Other"
  | "Other (Details in Description)"
  | "Partner Gap"
  | "Past Due"
  | "People/Relationship/Governance"
  | "Platform Technology Limitation"
  | "Preference for Competitor"
  | "Price"
  | "Product/Technology"
  | "Product Not on AWS"
  | "Security / Compliance"
  | "Self-Service"
  | "Technical Limitations"
  | "Term Sheet Impasse"
  | (string & {});
export const AwsClosedLostReason = S.String;

export type AwsOpportunityStage =
  | "Not Started"
  | "In Progress"
  | "Prospect"
  | "Engaged"
  | "Identified"
  | "Qualify"
  | "Research"
  | "Seller Engaged"
  | "Evaluating"
  | "Seller Registered"
  | "Term Sheet Negotiation"
  | "Contract Negotiation"
  | "Onboarding"
  | "Building Integration"
  | "Qualified"
  | "On-hold"
  | "Technical Validation"
  | "Business Validation"
  | "Committed"
  | "Launched"
  | "Deferred to Partner"
  | "Closed Lost"
  | "Completed"
  | "Closed Incomplete"
  | (string & {});
export const AwsOpportunityStage = S.String;

export interface ProfileNextStepsHistory {
  Value: string;
  Time: Date;
}
export const ProfileNextStepsHistory = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Value: S.String,
    Time: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "ProfileNextStepsHistory",
}) as any as S.Schema<ProfileNextStepsHistory>;
export type ProfileNextStepsHistories = ProfileNextStepsHistory[];
export const ProfileNextStepsHistories = /*@__PURE__*/ S.Array(
  ProfileNextStepsHistory,
);
export interface AwsOpportunityLifeCycle {
  TargetCloseDate?: string;
  ClosedLostReason?: AwsClosedLostReason;
  Stage?: AwsOpportunityStage;
  NextSteps?: string | redacted.Redacted<string>;
  NextStepsHistory?: ProfileNextStepsHistory[];
}
export const AwsOpportunityLifeCycle = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TargetCloseDate: S.optional(S.String),
    ClosedLostReason: S.optional(AwsClosedLostReason),
    Stage: S.optional(AwsOpportunityStage),
    NextSteps: S.optional(SensitiveString),
    NextStepsHistory: S.optional(ProfileNextStepsHistories),
  }),
).annotate({
  identifier: "AwsOpportunityLifeCycle",
}) as any as S.Schema<AwsOpportunityLifeCycle>;
export type AwsMemberBusinessTitle =
  | "AWSSalesRep"
  | "AWSAccountOwner"
  | "WWPSPDM"
  | "PDM"
  | "PSM"
  | "ISVSM"
  | "Signatory"
  | (string & {});
export const AwsMemberBusinessTitle = S.String;

export interface AwsTeamMember {
  Email?: string | redacted.Redacted<string>;
  FirstName?: string | redacted.Redacted<string>;
  LastName?: string | redacted.Redacted<string>;
  BusinessTitle?: AwsMemberBusinessTitle;
}
export const AwsTeamMember = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Email: S.optional(SensitiveString),
    FirstName: S.optional(SensitiveString),
    LastName: S.optional(SensitiveString),
    BusinessTitle: S.optional(AwsMemberBusinessTitle),
  }),
).annotate({ identifier: "AwsTeamMember" }) as any as S.Schema<AwsTeamMember>;
export type AwsOpportunityTeamMembersList = AwsTeamMember[];
export const AwsOpportunityTeamMembersList =
  /*@__PURE__*/ S.Array(AwsTeamMember);
export type EngagementScore = "High" | "Medium" | "Low" | (string & {});
export const EngagementScore = S.String;

export type MonetaryAmount = string | redacted.Redacted<string>;
export type AmountMap = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export const AmountMap = /*@__PURE__*/ S.Record(
  S.String,
  SensitiveString.pipe(S.optional),
);
export type StringList = string[];
export const StringList = /*@__PURE__*/ S.Array(S.String);
export interface AwsProductOptimization {
  Description: string;
  SavingsAmount: string | redacted.Redacted<string>;
}
export const AwsProductOptimization = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Description: S.String, SavingsAmount: SensitiveString }),
).annotate({
  identifier: "AwsProductOptimization",
}) as any as S.Schema<AwsProductOptimization>;
export type AwsProductOptimizationsList = AwsProductOptimization[];
export const AwsProductOptimizationsList = /*@__PURE__*/ S.Array(
  AwsProductOptimization,
);
export interface AwsProductDetails {
  ProductCode: string;
  ServiceCode?: string;
  Categories: string[];
  Amount?: string | redacted.Redacted<string>;
  OptimizedAmount?: string | redacted.Redacted<string>;
  PotentialSavingsAmount?: string | redacted.Redacted<string>;
  Optimizations: AwsProductOptimization[];
}
export const AwsProductDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProductCode: S.String,
    ServiceCode: S.optional(S.String),
    Categories: StringList,
    Amount: S.optional(SensitiveString),
    OptimizedAmount: S.optional(SensitiveString),
    PotentialSavingsAmount: S.optional(SensitiveString),
    Optimizations: AwsProductOptimizationsList,
  }),
).annotate({
  identifier: "AwsProductDetails",
}) as any as S.Schema<AwsProductDetails>;
export type AwsProductsList = AwsProductDetails[];
export const AwsProductsList = /*@__PURE__*/ S.Array(AwsProductDetails);
export interface AwsProductInsights {
  CurrencyCode: CurrencyCode;
  Frequency: PaymentFrequency;
  TotalAmount?: string | redacted.Redacted<string>;
  TotalOptimizedAmount?: string | redacted.Redacted<string>;
  TotalPotentialSavingsAmount?: string | redacted.Redacted<string>;
  TotalAmountByCategory: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
  AwsProducts: AwsProductDetails[];
}
export const AwsProductInsights = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CurrencyCode: CurrencyCode,
    Frequency: PaymentFrequency,
    TotalAmount: S.optional(SensitiveString),
    TotalOptimizedAmount: S.optional(SensitiveString),
    TotalPotentialSavingsAmount: S.optional(SensitiveString),
    TotalAmountByCategory: AmountMap,
    AwsProducts: AwsProductsList,
  }),
).annotate({
  identifier: "AwsProductInsights",
}) as any as S.Schema<AwsProductInsights>;
export interface AwsProductsSpendInsightsBySource {
  Partner?: AwsProductInsights;
  AWS?: AwsProductInsights;
}
export const AwsProductsSpendInsightsBySource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Partner: S.optional(AwsProductInsights),
    AWS: S.optional(AwsProductInsights),
  }),
).annotate({
  identifier: "AwsProductsSpendInsightsBySource",
}) as any as S.Schema<AwsProductsSpendInsightsBySource>;
export interface OpportunityQuality {
  Score?: number;
  Trend?: string;
}
export const OpportunityQuality = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Score: S.optional(S.Number), Trend: S.optional(S.String) }),
).annotate({
  identifier: "OpportunityQuality",
}) as any as S.Schema<OpportunityQuality>;
export type RecommendationAttributeMap = { [key: string]: string | undefined };
export const RecommendationAttributeMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface Recommendation {
  Type: string;
  Details: string;
  Attributes?: { [key: string]: string | undefined };
}
export const Recommendation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.String,
    Details: S.String,
    Attributes: S.optional(RecommendationAttributeMap),
  }),
).annotate({ identifier: "Recommendation" }) as any as S.Schema<Recommendation>;
export type RecommendationList = Recommendation[];
export const RecommendationList = /*@__PURE__*/ S.Array(Recommendation);
export interface AwsOpportunityInsights {
  NextBestActions?: string;
  EngagementScore?: EngagementScore;
  AwsProductsSpendInsightsBySource?: AwsProductsSpendInsightsBySource;
  OpportunityQuality?: OpportunityQuality;
  Recommendations?: Recommendation[];
}
export const AwsOpportunityInsights = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextBestActions: S.optional(S.String),
    EngagementScore: S.optional(EngagementScore),
    AwsProductsSpendInsightsBySource: S.optional(
      AwsProductsSpendInsightsBySource,
    ),
    OpportunityQuality: S.optional(OpportunityQuality),
    Recommendations: S.optional(RecommendationList),
  }),
).annotate({
  identifier: "AwsOpportunityInsights",
}) as any as S.Schema<AwsOpportunityInsights>;
export type InvolvementTypeChangeReason =
  | "Expansion Opportunity"
  | "Change in Deal Information"
  | "Customer Requested"
  | "Technical Complexity"
  | "Risk Mitigation"
  | (string & {});
export const InvolvementTypeChangeReason = S.String;

export type AwsProductIdentifier = string;
export type AwsProductIdentifiers = string[];
export const AwsProductIdentifiers = /*@__PURE__*/ S.Array(S.String);
export type SolutionIdentifier = string;
export type SolutionIdentifiers = string[];
export const SolutionIdentifiers = /*@__PURE__*/ S.Array(S.String);
export type AwsMarketplaceSolutionIdentifier = string;
export type AwsMarketplaceSolutionIdentifiers = string[];
export const AwsMarketplaceSolutionIdentifiers = /*@__PURE__*/ S.Array(
  S.String,
);
export type AwsMarketplaceProductArn = string;
export type AwsMarketplaceProductIdentifiers = string[];
export const AwsMarketplaceProductIdentifiers = /*@__PURE__*/ S.Array(S.String);
export interface AwsOpportunityRelatedEntities {
  AwsProducts?: string[];
  Solutions?: string[];
  AwsMarketplaceSolutions?: string[];
  AwsMarketplaceProducts?: string[];
}
export const AwsOpportunityRelatedEntities = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AwsProducts: S.optional(AwsProductIdentifiers),
    Solutions: S.optional(SolutionIdentifiers),
    AwsMarketplaceSolutions: S.optional(AwsMarketplaceSolutionIdentifiers),
    AwsMarketplaceProducts: S.optional(AwsMarketplaceProductIdentifiers),
  }),
).annotate({
  identifier: "AwsOpportunityRelatedEntities",
}) as any as S.Schema<AwsOpportunityRelatedEntities>;
export interface AwsOpportunityCustomer {
  Contacts?: Contact[];
}
export const AwsOpportunityCustomer = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Contacts: S.optional(CustomerContactsList) }),
).annotate({
  identifier: "AwsOpportunityCustomer",
}) as any as S.Schema<AwsOpportunityCustomer>;
export interface AwsOpportunityProject {
  ExpectedCustomerSpend?: ExpectedCustomerSpend[];
  AwsPartition?: AwsPartition;
}
export const AwsOpportunityProject = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExpectedCustomerSpend: S.optional(ExpectedCustomerSpendList),
    AwsPartition: S.optional(AwsPartition),
  }),
).annotate({
  identifier: "AwsOpportunityProject",
}) as any as S.Schema<AwsOpportunityProject>;
export interface AwsSoftwareRevenue {
  Value?: MonetaryValue;
  Discount?: string;
  EffectiveDate?: string;
  ExpirationDate?: string;
}
export const AwsSoftwareRevenue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Value: S.optional(MonetaryValue),
    Discount: S.optional(S.String),
    EffectiveDate: S.optional(S.String),
    ExpirationDate: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsSoftwareRevenue",
}) as any as S.Schema<AwsSoftwareRevenue>;
export interface GetAwsOpportunitySummaryResponse {
  RelatedOpportunityId?: string;
  Origin?: OpportunityOrigin;
  InvolvementType?: SalesInvolvementType;
  Visibility?: Visibility;
  LifeCycle?: AwsOpportunityLifeCycle;
  OpportunityTeam?: AwsTeamMember[];
  Insights?: AwsOpportunityInsights;
  InvolvementTypeChangeReason?: InvolvementTypeChangeReason;
  RelatedEntityIds?: AwsOpportunityRelatedEntities;
  Customer?: AwsOpportunityCustomer;
  Project?: AwsOpportunityProject;
  CosellMotion?: string;
  SoftwareRevenue?: AwsSoftwareRevenue;
  Catalog: string;
}
export const GetAwsOpportunitySummaryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RelatedOpportunityId: S.optional(S.String),
    Origin: S.optional(OpportunityOrigin),
    InvolvementType: S.optional(SalesInvolvementType),
    Visibility: S.optional(Visibility),
    LifeCycle: S.optional(AwsOpportunityLifeCycle),
    OpportunityTeam: S.optional(AwsOpportunityTeamMembersList),
    Insights: S.optional(AwsOpportunityInsights),
    InvolvementTypeChangeReason: S.optional(InvolvementTypeChangeReason),
    RelatedEntityIds: S.optional(AwsOpportunityRelatedEntities),
    Customer: S.optional(AwsOpportunityCustomer),
    Project: S.optional(AwsOpportunityProject),
    CosellMotion: S.optional(S.String),
    SoftwareRevenue: S.optional(AwsSoftwareRevenue),
    Catalog: S.String,
  }),
).annotate({
  identifier: "GetAwsOpportunitySummaryResponse",
}) as any as S.Schema<GetAwsOpportunitySummaryResponse>;
export interface GetEngagementRequest {
  Catalog: string;
  Identifier: string;
}
export const GetEngagementRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Catalog: S.String, Identifier: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetEngagement" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetEngagementRequest",
}) as any as S.Schema<GetEngagementRequest>;
export interface GetEngagementResponse {
  Id?: string;
  Arn?: string;
  Title?: string;
  Description?: string;
  CreatedAt?: Date;
  CreatedBy?: string | redacted.Redacted<string>;
  MemberCount?: number;
  ModifiedAt?: Date;
  ModifiedBy?: string | redacted.Redacted<string>;
  Contexts?: EngagementContextDetails[];
}
export const GetEngagementResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Arn: S.optional(S.String),
    Title: S.optional(S.String),
    Description: S.optional(S.String),
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    CreatedBy: S.optional(SensitiveString),
    MemberCount: S.optional(S.Number),
    ModifiedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ModifiedBy: S.optional(SensitiveString),
    Contexts: S.optional(EngagementContexts),
  }),
).annotate({
  identifier: "GetEngagementResponse",
}) as any as S.Schema<GetEngagementResponse>;
export interface GetEngagementInvitationRequest {
  Catalog: string;
  Identifier: string;
}
export const GetEngagementInvitationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Catalog: S.String, Identifier: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetEngagementInvitation" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetEngagementInvitationRequest",
}) as any as S.Schema<GetEngagementInvitationRequest>;
export type EngagementInvitationPayloadType =
  | "OpportunityInvitation"
  | "LeadInvitation"
  | (string & {});
export const EngagementInvitationPayloadType = S.String;

export type InvitationStatus =
  | "ACCEPTED"
  | "PENDING"
  | "REJECTED"
  | "EXPIRED"
  | (string & {});
export const InvitationStatus = S.String;

export type RejectionReasonString = string;
export type MemberCompanyName = string | redacted.Redacted<string>;
export interface EngagementMemberSummary {
  CompanyName?: string | redacted.Redacted<string>;
  WebsiteUrl?: string;
}
export const EngagementMemberSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CompanyName: S.optional(SensitiveString),
    WebsiteUrl: S.optional(S.String),
  }),
).annotate({
  identifier: "EngagementMemberSummary",
}) as any as S.Schema<EngagementMemberSummary>;
export type EngagementMemberSummaries = EngagementMemberSummary[];
export const EngagementMemberSummaries = /*@__PURE__*/ S.Array(
  EngagementMemberSummary,
);
export interface InvitationProspectingResultAws {
  Customer?: ProspectingResultCustomer;
  Insights?: ProspectingInsights;
}
export const InvitationProspectingResultAws = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Customer: S.optional(ProspectingResultCustomer),
    Insights: S.optional(ProspectingInsights),
  }),
).annotate({
  identifier: "InvitationProspectingResultAws",
}) as any as S.Schema<InvitationProspectingResultAws>;
export interface EnrichmentContext {
  ProspectingResultAws?: InvitationProspectingResultAws;
  LeadInsights?: LeadInsights;
}
export const EnrichmentContext = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProspectingResultAws: S.optional(InvitationProspectingResultAws),
    LeadInsights: S.optional(LeadInsights),
  }),
).annotate({
  identifier: "EnrichmentContext",
}) as any as S.Schema<EnrichmentContext>;
export interface GetEngagementInvitationResponse {
  Arn?: string;
  PayloadType?: EngagementInvitationPayloadType;
  Id: string;
  EngagementId?: string;
  EngagementTitle?: string;
  Status?: InvitationStatus;
  InvitationDate?: Date;
  ExpirationDate?: Date;
  SenderAwsAccountId?: string | redacted.Redacted<string>;
  SenderCompanyName?: string;
  Receiver?: Receiver;
  Catalog: string;
  RejectionReason?: string;
  Payload?: Payload;
  InvitationMessage?: string | redacted.Redacted<string>;
  EngagementDescription?: string;
  ExistingMembers?: EngagementMemberSummary[];
  EnrichmentContext?: EnrichmentContext;
}
export const GetEngagementInvitationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    PayloadType: S.optional(EngagementInvitationPayloadType),
    Id: S.String,
    EngagementId: S.optional(S.String),
    EngagementTitle: S.optional(S.String),
    Status: S.optional(InvitationStatus),
    InvitationDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ExpirationDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    SenderAwsAccountId: S.optional(SensitiveString),
    SenderCompanyName: S.optional(S.String),
    Receiver: S.optional(Receiver),
    Catalog: S.String,
    RejectionReason: S.optional(S.String),
    Payload: S.optional(Payload),
    InvitationMessage: S.optional(SensitiveString),
    EngagementDescription: S.optional(S.String),
    ExistingMembers: S.optional(EngagementMemberSummaries),
    EnrichmentContext: S.optional(EnrichmentContext),
  }),
).annotate({
  identifier: "GetEngagementInvitationResponse",
}) as any as S.Schema<GetEngagementInvitationResponse>;
export interface GetOpportunityRequest {
  Catalog: string;
  Identifier: string;
}
export const GetOpportunityRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Catalog: S.String, Identifier: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetOpportunity" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetOpportunityRequest",
}) as any as S.Schema<GetOpportunityRequest>;
export type OpportunityArn = string;
export type AwsMarketplaceOfferIdentifier = string;
export type AwsMarketplaceOfferIdentifiers = string[];
export const AwsMarketplaceOfferIdentifiers = /*@__PURE__*/ S.Array(S.String);
export type AwsMarketplaceOfferSetIdentifier = string;
export type AwsMarketplaceOfferSetIdentifiers = string[];
export const AwsMarketplaceOfferSetIdentifiers = /*@__PURE__*/ S.Array(
  S.String,
);
export interface RelatedEntityIdentifiers {
  AwsMarketplaceOffers?: string[];
  AwsMarketplaceOfferSets?: string[];
  Solutions?: string[];
  AwsProducts?: string[];
  AwsMarketplaceSolutions?: string[];
  AwsMarketplaceProducts?: string[];
}
export const RelatedEntityIdentifiers = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AwsMarketplaceOffers: S.optional(AwsMarketplaceOfferIdentifiers),
    AwsMarketplaceOfferSets: S.optional(AwsMarketplaceOfferSetIdentifiers),
    Solutions: S.optional(SolutionIdentifiers),
    AwsProducts: S.optional(AwsProductIdentifiers),
    AwsMarketplaceSolutions: S.optional(AwsMarketplaceSolutionIdentifiers),
    AwsMarketplaceProducts: S.optional(AwsMarketplaceProductIdentifiers),
  }),
).annotate({
  identifier: "RelatedEntityIdentifiers",
}) as any as S.Schema<RelatedEntityIdentifiers>;
export interface GetOpportunityResponse {
  Catalog: string;
  PrimaryNeedsFromAws?: PrimaryNeedFromAws[];
  NationalSecurity?: NationalSecurity;
  PartnerOpportunityIdentifier?: string;
  Customer?: Customer;
  Project?: Project;
  OpportunityType?: OpportunityType;
  Marketing?: Marketing;
  SoftwareRevenue?: SoftwareRevenue;
  Id: string;
  Arn?: string;
  LastModifiedDate: Date;
  CreatedDate: Date;
  RelatedEntityIdentifiers: RelatedEntityIdentifiers;
  LifeCycle?: LifeCycle;
  OpportunityTeam?: Contact[];
}
export const GetOpportunityResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    PrimaryNeedsFromAws: S.optional(PrimaryNeedsFromAws),
    NationalSecurity: S.optional(NationalSecurity),
    PartnerOpportunityIdentifier: S.optional(S.String),
    Customer: S.optional(Customer),
    Project: S.optional(Project),
    OpportunityType: S.optional(OpportunityType),
    Marketing: S.optional(Marketing),
    SoftwareRevenue: S.optional(SoftwareRevenue),
    Id: S.String,
    Arn: S.optional(S.String),
    LastModifiedDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    CreatedDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    RelatedEntityIdentifiers: RelatedEntityIdentifiers,
    LifeCycle: S.optional(LifeCycle),
    OpportunityTeam: S.optional(PartnerOpportunityTeamMembersList),
  }),
).annotate({
  identifier: "GetOpportunityResponse",
}) as any as S.Schema<GetOpportunityResponse>;
export interface GetProspectingFromEngagementTaskRequest {
  Catalog: string;
  TaskIdentifier: string;
}
export const GetProspectingFromEngagementTaskRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ Catalog: S.String, TaskIdentifier: S.String }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/GetProspectingFromEngagementTask" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetProspectingFromEngagementTaskRequest",
}) as any as S.Schema<GetProspectingFromEngagementTaskRequest>;
export type ProspectingTaskArn = string;
export type ProspectingTaskStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED"
  | (string & {});
export const ProspectingTaskStatus = S.String;

export interface EngagementProspectingResult {
  EngagementIdentifier: string;
  EngagementContextId?: string;
  Status: ProspectingTaskStatus;
  ReasonCode?: string;
  Message?: string;
}
export const EngagementProspectingResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EngagementIdentifier: S.String,
    EngagementContextId: S.optional(S.String),
    Status: ProspectingTaskStatus,
    ReasonCode: S.optional(S.String),
    Message: S.optional(S.String),
  }),
).annotate({
  identifier: "EngagementProspectingResult",
}) as any as S.Schema<EngagementProspectingResult>;
export type EngagementProspectingResultList = EngagementProspectingResult[];
export const EngagementProspectingResultList = /*@__PURE__*/ S.Array(
  EngagementProspectingResult,
);
export interface GetProspectingFromEngagementTaskResponse {
  TaskId: string;
  TaskArn: string;
  TaskName: string;
  StartTime: Date;
  EndTime?: Date;
  Engagements: EngagementProspectingResult[];
}
export const GetProspectingFromEngagementTaskResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      TaskId: S.String,
      TaskArn: S.String,
      TaskName: S.String,
      StartTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
      EndTime: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      Engagements: EngagementProspectingResultList,
    }),
).annotate({
  identifier: "GetProspectingFromEngagementTaskResponse",
}) as any as S.Schema<GetProspectingFromEngagementTaskResponse>;
export interface GetResourceSnapshotRequest {
  Catalog: string;
  EngagementIdentifier: string;
  ResourceType: ResourceType;
  ResourceIdentifier: string;
  ResourceSnapshotTemplateIdentifier: string;
  Revision?: number;
}
export const GetResourceSnapshotRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    EngagementIdentifier: S.String,
    ResourceType: ResourceType,
    ResourceIdentifier: S.String,
    ResourceSnapshotTemplateIdentifier: S.String,
    Revision: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetResourceSnapshot" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetResourceSnapshotRequest",
}) as any as S.Schema<GetResourceSnapshotRequest>;
export interface LifeCycleForView {
  TargetCloseDate?: string;
  ReviewStatus?: ReviewStatus;
  Stage?: Stage;
  NextSteps?: string | redacted.Redacted<string>;
}
export const LifeCycleForView = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TargetCloseDate: S.optional(S.String),
    ReviewStatus: S.optional(ReviewStatus),
    Stage: S.optional(Stage),
    NextSteps: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "LifeCycleForView",
}) as any as S.Schema<LifeCycleForView>;
export interface ProjectView {
  DeliveryModels?: DeliveryModel[];
  ExpectedCustomerSpend?: ExpectedCustomerSpend[];
  ExpectedContractDuration?: ExpectedContractDuration;
  CustomerUseCase?: string;
  SalesActivities?: SalesActivity[];
  OtherSolutionDescription?: string | redacted.Redacted<string>;
}
export const ProjectView = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeliveryModels: S.optional(DeliveryModels),
    ExpectedCustomerSpend: S.optional(ExpectedCustomerSpendList),
    ExpectedContractDuration: S.optional(ExpectedContractDuration),
    CustomerUseCase: S.optional(S.String),
    SalesActivities: S.optional(SalesActivities),
    OtherSolutionDescription: S.optional(SensitiveString),
  }),
).annotate({ identifier: "ProjectView" }) as any as S.Schema<ProjectView>;
export interface OpportunitySummaryView {
  OpportunityType?: OpportunityType;
  Lifecycle?: LifeCycleForView;
  OpportunityTeam?: Contact[];
  PrimaryNeedsFromAws?: PrimaryNeedFromAws[];
  Customer?: Customer;
  Project?: ProjectView;
  RelatedEntityIdentifiers?: RelatedEntityIdentifiers;
}
export const OpportunitySummaryView = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OpportunityType: S.optional(OpportunityType),
    Lifecycle: S.optional(LifeCycleForView),
    OpportunityTeam: S.optional(PartnerOpportunityTeamMembersList),
    PrimaryNeedsFromAws: S.optional(PrimaryNeedsFromAws),
    Customer: S.optional(Customer),
    Project: S.optional(ProjectView),
    RelatedEntityIdentifiers: S.optional(RelatedEntityIdentifiers),
  }),
).annotate({
  identifier: "OpportunitySummaryView",
}) as any as S.Schema<OpportunitySummaryView>;
export interface AwsOpportunitySummaryFullView {
  RelatedOpportunityId?: string;
  Origin?: OpportunityOrigin;
  InvolvementType?: SalesInvolvementType;
  Visibility?: Visibility;
  LifeCycle?: AwsOpportunityLifeCycle;
  OpportunityTeam?: AwsTeamMember[];
  Insights?: AwsOpportunityInsights;
  InvolvementTypeChangeReason?: InvolvementTypeChangeReason;
  RelatedEntityIds?: AwsOpportunityRelatedEntities;
  Customer?: AwsOpportunityCustomer;
  Project?: AwsOpportunityProject;
  CosellMotion?: string;
  SoftwareRevenue?: AwsSoftwareRevenue;
}
export const AwsOpportunitySummaryFullView = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RelatedOpportunityId: S.optional(S.String),
    Origin: S.optional(OpportunityOrigin),
    InvolvementType: S.optional(SalesInvolvementType),
    Visibility: S.optional(Visibility),
    LifeCycle: S.optional(AwsOpportunityLifeCycle),
    OpportunityTeam: S.optional(AwsOpportunityTeamMembersList),
    Insights: S.optional(AwsOpportunityInsights),
    InvolvementTypeChangeReason: S.optional(InvolvementTypeChangeReason),
    RelatedEntityIds: S.optional(AwsOpportunityRelatedEntities),
    Customer: S.optional(AwsOpportunityCustomer),
    Project: S.optional(AwsOpportunityProject),
    CosellMotion: S.optional(S.String),
    SoftwareRevenue: S.optional(AwsSoftwareRevenue),
  }),
).annotate({
  identifier: "AwsOpportunitySummaryFullView",
}) as any as S.Schema<AwsOpportunitySummaryFullView>;
export type ResourceSnapshotPayload =
  | {
      OpportunitySummary: OpportunitySummaryView;
      AwsOpportunitySummaryFullView?: never;
    }
  | {
      OpportunitySummary?: never;
      AwsOpportunitySummaryFullView: AwsOpportunitySummaryFullView;
    };
export const ResourceSnapshotPayload = /*@__PURE__*/ S.Union([
  S.Struct({ OpportunitySummary: OpportunitySummaryView }),
  S.Struct({ AwsOpportunitySummaryFullView: AwsOpportunitySummaryFullView }),
]);
export type AwsAccountIdOrAliasList = (string | redacted.Redacted<string>)[];
export const AwsAccountIdOrAliasList = /*@__PURE__*/ S.Array(SensitiveString);
export interface GetResourceSnapshotResponse {
  Catalog: string;
  Arn?: string;
  CreatedBy?: string | redacted.Redacted<string>;
  CreatedAt?: Date;
  EngagementId?: string;
  ResourceType?: ResourceType;
  ResourceId?: string;
  ResourceSnapshotTemplateName?: string;
  Revision?: number;
  Payload?: ResourceSnapshotPayload;
  TargetMemberAccounts?: (string | redacted.Redacted<string>)[];
}
export const GetResourceSnapshotResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    Arn: S.optional(S.String),
    CreatedBy: S.optional(SensitiveString),
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    EngagementId: S.optional(S.String),
    ResourceType: S.optional(ResourceType),
    ResourceId: S.optional(S.String),
    ResourceSnapshotTemplateName: S.optional(S.String),
    Revision: S.optional(S.Number),
    Payload: S.optional(ResourceSnapshotPayload),
    TargetMemberAccounts: S.optional(AwsAccountIdOrAliasList),
  }),
).annotate({
  identifier: "GetResourceSnapshotResponse",
}) as any as S.Schema<GetResourceSnapshotResponse>;
export interface GetResourceSnapshotJobRequest {
  Catalog: string;
  ResourceSnapshotJobIdentifier: string;
}
export const GetResourceSnapshotJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Catalog: S.String, ResourceSnapshotJobIdentifier: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetResourceSnapshotJob" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetResourceSnapshotJobRequest",
}) as any as S.Schema<GetResourceSnapshotJobRequest>;
export type ResourceSnapshotJobStatus = "Running" | "Stopped" | (string & {});
export const ResourceSnapshotJobStatus = S.String;

export interface GetResourceSnapshotJobResponse {
  Catalog: string;
  Id?: string;
  Arn?: string;
  EngagementId?: string;
  ResourceType?: ResourceType;
  ResourceId?: string;
  ResourceArn?: string;
  ResourceSnapshotTemplateName?: string;
  CreatedAt?: Date;
  Status?: ResourceSnapshotJobStatus;
  LastSuccessfulExecutionDate?: Date;
  LastFailure?: string;
}
export const GetResourceSnapshotJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    Id: S.optional(S.String),
    Arn: S.optional(S.String),
    EngagementId: S.optional(S.String),
    ResourceType: S.optional(ResourceType),
    ResourceId: S.optional(S.String),
    ResourceArn: S.optional(S.String),
    ResourceSnapshotTemplateName: S.optional(S.String),
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Status: S.optional(ResourceSnapshotJobStatus),
    LastSuccessfulExecutionDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    LastFailure: S.optional(S.String),
  }),
).annotate({
  identifier: "GetResourceSnapshotJobResponse",
}) as any as S.Schema<GetResourceSnapshotJobResponse>;
export interface GetSellingSystemSettingsRequest {
  Catalog: string;
}
export const GetSellingSystemSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Catalog: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetSellingSystemSettings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSellingSystemSettingsRequest",
}) as any as S.Schema<GetSellingSystemSettingsRequest>;
export type ResourceSnapshotJobRoleArn = string;
export interface GetSellingSystemSettingsResponse {
  Catalog: string;
  ResourceSnapshotJobRoleArn?: string;
}
export const GetSellingSystemSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    ResourceSnapshotJobRoleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "GetSellingSystemSettingsResponse",
}) as any as S.Schema<GetSellingSystemSettingsResponse>;
export type SortOrder = "ASCENDING" | "DESCENDING" | (string & {});
export const SortOrder = S.String;

export type ListTasksSortName = "StartTime" | (string & {});
export const ListTasksSortName = S.String;

export interface ListTasksSortBase {
  SortOrder: SortOrder;
  SortBy: ListTasksSortName;
}
export const ListTasksSortBase = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SortOrder: SortOrder, SortBy: ListTasksSortName }),
).annotate({
  identifier: "ListTasksSortBase",
}) as any as S.Schema<ListTasksSortBase>;
export type TaskStatus = "IN_PROGRESS" | "COMPLETE" | "FAILED" | (string & {});
export const TaskStatus = S.String;

export type TaskStatuses = TaskStatus[];
export const TaskStatuses = /*@__PURE__*/ S.Array(TaskStatus);
export type OpportunityIdentifiers = string[];
export const OpportunityIdentifiers = /*@__PURE__*/ S.Array(S.String);
export type EngagementInvitationIdentifiers = string[];
export const EngagementInvitationIdentifiers = /*@__PURE__*/ S.Array(S.String);
export type TaskArnOrIdentifier = string;
export type TaskIdentifiers = string[];
export const TaskIdentifiers = /*@__PURE__*/ S.Array(S.String);
export interface ListEngagementByAcceptingInvitationTasksRequest {
  MaxResults?: number;
  NextToken?: string;
  Sort?: ListTasksSortBase;
  Catalog: string;
  TaskStatus?: TaskStatus[];
  OpportunityIdentifier?: string[];
  EngagementInvitationIdentifier?: string[];
  TaskIdentifier?: string[];
}
export const ListEngagementByAcceptingInvitationTasksRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
      Sort: S.optional(ListTasksSortBase),
      Catalog: S.String,
      TaskStatus: S.optional(TaskStatuses),
      OpportunityIdentifier: S.optional(OpportunityIdentifiers),
      EngagementInvitationIdentifier: S.optional(
        EngagementInvitationIdentifiers,
      ),
      TaskIdentifier: S.optional(TaskIdentifiers),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/ListEngagementByAcceptingInvitationTasks",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListEngagementByAcceptingInvitationTasksRequest",
  }) as any as S.Schema<ListEngagementByAcceptingInvitationTasksRequest>;
export type TaskIdentifier = string;
export type ReasonCode =
  | "InvitationAccessDenied"
  | "InvitationValidationFailed"
  | "EngagementAccessDenied"
  | "OpportunityAccessDenied"
  | "ResourceSnapshotJobAccessDenied"
  | "ResourceSnapshotJobValidationFailed"
  | "ResourceSnapshotJobConflict"
  | "EngagementValidationFailed"
  | "EngagementConflict"
  | "OpportunitySubmissionFailed"
  | "EngagementInvitationConflict"
  | "InternalError"
  | "OpportunityValidationFailed"
  | "OpportunityConflict"
  | "ResourceSnapshotAccessDenied"
  | "ResourceSnapshotValidationFailed"
  | "ResourceSnapshotConflict"
  | "ServiceQuotaExceeded"
  | "RequestThrottled"
  | "ContextNotFound"
  | "CustomerProjectContextNotPermitted"
  | "DisqualifiedLeadNotPermitted"
  | (string & {});
export const ReasonCode = S.String;

export interface ListEngagementByAcceptingInvitationTaskSummary {
  TaskId?: string;
  TaskArn?: string;
  StartTime?: Date;
  TaskStatus?: TaskStatus;
  Message?: string;
  ReasonCode?: ReasonCode;
  OpportunityId?: string;
  ResourceSnapshotJobId?: string;
  EngagementInvitationId?: string;
}
export const ListEngagementByAcceptingInvitationTaskSummary =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      TaskId: S.optional(S.String),
      TaskArn: S.optional(S.String),
      StartTime: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      TaskStatus: S.optional(TaskStatus),
      Message: S.optional(S.String),
      ReasonCode: S.optional(ReasonCode),
      OpportunityId: S.optional(S.String),
      ResourceSnapshotJobId: S.optional(S.String),
      EngagementInvitationId: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListEngagementByAcceptingInvitationTaskSummary",
  }) as any as S.Schema<ListEngagementByAcceptingInvitationTaskSummary>;
export type ListEngagementByAcceptingInvitationTaskSummaries =
  ListEngagementByAcceptingInvitationTaskSummary[];
export const ListEngagementByAcceptingInvitationTaskSummaries =
  /*@__PURE__*/ S.Array(ListEngagementByAcceptingInvitationTaskSummary);
export interface ListEngagementByAcceptingInvitationTasksResponse {
  TaskSummaries?: ListEngagementByAcceptingInvitationTaskSummary[];
  NextToken?: string;
}
export const ListEngagementByAcceptingInvitationTasksResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      TaskSummaries: S.optional(
        ListEngagementByAcceptingInvitationTaskSummaries,
      ),
      NextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListEngagementByAcceptingInvitationTasksResponse",
  }) as any as S.Schema<ListEngagementByAcceptingInvitationTasksResponse>;
export type EngagementIdentifiers = string[];
export const EngagementIdentifiers = /*@__PURE__*/ S.Array(S.String);
export interface ListEngagementFromOpportunityTasksRequest {
  MaxResults?: number;
  NextToken?: string;
  Sort?: ListTasksSortBase;
  Catalog: string;
  TaskStatus?: TaskStatus[];
  TaskIdentifier?: string[];
  OpportunityIdentifier?: string[];
  EngagementIdentifier?: string[];
}
export const ListEngagementFromOpportunityTasksRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
      Sort: S.optional(ListTasksSortBase),
      Catalog: S.String,
      TaskStatus: S.optional(TaskStatuses),
      TaskIdentifier: S.optional(TaskIdentifiers),
      OpportunityIdentifier: S.optional(OpportunityIdentifiers),
      EngagementIdentifier: S.optional(EngagementIdentifiers),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/ListEngagementFromOpportunityTasks" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListEngagementFromOpportunityTasksRequest",
  }) as any as S.Schema<ListEngagementFromOpportunityTasksRequest>;
export interface ListEngagementFromOpportunityTaskSummary {
  TaskId?: string;
  TaskArn?: string;
  StartTime?: Date;
  TaskStatus?: TaskStatus;
  Message?: string;
  ReasonCode?: ReasonCode;
  OpportunityId?: string;
  ResourceSnapshotJobId?: string;
  EngagementId?: string;
  EngagementInvitationId?: string;
}
export const ListEngagementFromOpportunityTaskSummary = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      TaskId: S.optional(S.String),
      TaskArn: S.optional(S.String),
      StartTime: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      TaskStatus: S.optional(TaskStatus),
      Message: S.optional(S.String),
      ReasonCode: S.optional(ReasonCode),
      OpportunityId: S.optional(S.String),
      ResourceSnapshotJobId: S.optional(S.String),
      EngagementId: S.optional(S.String),
      EngagementInvitationId: S.optional(S.String),
    }),
).annotate({
  identifier: "ListEngagementFromOpportunityTaskSummary",
}) as any as S.Schema<ListEngagementFromOpportunityTaskSummary>;
export type ListEngagementFromOpportunityTaskSummaries =
  ListEngagementFromOpportunityTaskSummary[];
export const ListEngagementFromOpportunityTaskSummaries = /*@__PURE__*/ S.Array(
  ListEngagementFromOpportunityTaskSummary,
);
export interface ListEngagementFromOpportunityTasksResponse {
  TaskSummaries?: ListEngagementFromOpportunityTaskSummary[];
  NextToken?: string;
}
export const ListEngagementFromOpportunityTasksResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      TaskSummaries: S.optional(ListEngagementFromOpportunityTaskSummaries),
      NextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListEngagementFromOpportunityTasksResponse",
  }) as any as S.Schema<ListEngagementFromOpportunityTasksResponse>;
export type PageSize = number;
export type OpportunityEngagementInvitationSortName =
  | "InvitationDate"
  | (string & {});
export const OpportunityEngagementInvitationSortName = S.String;

export interface OpportunityEngagementInvitationSort {
  SortOrder: SortOrder;
  SortBy: OpportunityEngagementInvitationSortName;
}
export const OpportunityEngagementInvitationSort = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SortOrder: SortOrder,
    SortBy: OpportunityEngagementInvitationSortName,
  }),
).annotate({
  identifier: "OpportunityEngagementInvitationSort",
}) as any as S.Schema<OpportunityEngagementInvitationSort>;
export type EngagementInvitationsPayloadType =
  EngagementInvitationPayloadType[];
export const EngagementInvitationsPayloadType = /*@__PURE__*/ S.Array(
  EngagementInvitationPayloadType,
);
export type ParticipantType = "SENDER" | "RECEIVER" | (string & {});
export const ParticipantType = S.String;

export type InvitationStatusList = InvitationStatus[];
export const InvitationStatusList = /*@__PURE__*/ S.Array(InvitationStatus);
export interface ListEngagementInvitationsRequest {
  Catalog: string;
  MaxResults?: number;
  NextToken?: string;
  Sort?: OpportunityEngagementInvitationSort;
  PayloadType?: EngagementInvitationPayloadType[];
  ParticipantType: ParticipantType;
  Status?: InvitationStatus[];
  EngagementIdentifier?: string[];
  SenderAwsAccountId?: (string | redacted.Redacted<string>)[];
}
export const ListEngagementInvitationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    Sort: S.optional(OpportunityEngagementInvitationSort),
    PayloadType: S.optional(EngagementInvitationsPayloadType),
    ParticipantType: ParticipantType,
    Status: S.optional(InvitationStatusList),
    EngagementIdentifier: S.optional(EngagementIdentifiers),
    SenderAwsAccountId: S.optional(AwsAccountIdOrAliasList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListEngagementInvitations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListEngagementInvitationsRequest",
}) as any as S.Schema<ListEngagementInvitationsRequest>;
export interface EngagementInvitationSummary {
  Arn?: string;
  PayloadType?: EngagementInvitationPayloadType;
  Id: string;
  EngagementId?: string;
  EngagementTitle?: string;
  Status?: InvitationStatus;
  InvitationDate?: Date;
  ExpirationDate?: Date;
  SenderAwsAccountId?: string | redacted.Redacted<string>;
  SenderCompanyName?: string;
  Receiver?: Receiver;
  Catalog: string;
  ParticipantType?: ParticipantType;
}
export const EngagementInvitationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    PayloadType: S.optional(EngagementInvitationPayloadType),
    Id: S.String,
    EngagementId: S.optional(S.String),
    EngagementTitle: S.optional(S.String),
    Status: S.optional(InvitationStatus),
    InvitationDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ExpirationDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    SenderAwsAccountId: S.optional(SensitiveString),
    SenderCompanyName: S.optional(S.String),
    Receiver: S.optional(Receiver),
    Catalog: S.String,
    ParticipantType: S.optional(ParticipantType),
  }),
).annotate({
  identifier: "EngagementInvitationSummary",
}) as any as S.Schema<EngagementInvitationSummary>;
export type EngagementInvitationSummaries = EngagementInvitationSummary[];
export const EngagementInvitationSummaries = /*@__PURE__*/ S.Array(
  EngagementInvitationSummary,
);
export interface ListEngagementInvitationsResponse {
  EngagementInvitationSummaries?: EngagementInvitationSummary[];
  NextToken?: string;
}
export const ListEngagementInvitationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EngagementInvitationSummaries: S.optional(EngagementInvitationSummaries),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListEngagementInvitationsResponse",
}) as any as S.Schema<ListEngagementInvitationsResponse>;
export type MemberPageSize = number;
export interface ListEngagementMembersRequest {
  Catalog: string;
  Identifier: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListEngagementMembersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    Identifier: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListEngagementMembers" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListEngagementMembersRequest",
}) as any as S.Schema<ListEngagementMembersRequest>;
export interface EngagementMember {
  CompanyName?: string | redacted.Redacted<string>;
  WebsiteUrl?: string;
  AccountId?: string | redacted.Redacted<string>;
}
export const EngagementMember = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CompanyName: S.optional(SensitiveString),
    WebsiteUrl: S.optional(S.String),
    AccountId: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "EngagementMember",
}) as any as S.Schema<EngagementMember>;
export type EngagementMembers = EngagementMember[];
export const EngagementMembers = /*@__PURE__*/ S.Array(EngagementMember);
export interface ListEngagementMembersResponse {
  EngagementMemberList: EngagementMember[];
  NextToken?: string;
}
export const ListEngagementMembersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EngagementMemberList: EngagementMembers,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListEngagementMembersResponse",
}) as any as S.Schema<ListEngagementMembersResponse>;
export interface ListEngagementResourceAssociationsRequest {
  Catalog: string;
  MaxResults?: number;
  NextToken?: string;
  EngagementIdentifier?: string;
  ResourceType?: ResourceType;
  ResourceIdentifier?: string;
  CreatedBy?: string | redacted.Redacted<string>;
}
export const ListEngagementResourceAssociationsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Catalog: S.String,
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
      EngagementIdentifier: S.optional(S.String),
      ResourceType: S.optional(ResourceType),
      ResourceIdentifier: S.optional(S.String),
      CreatedBy: S.optional(SensitiveString),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/ListEngagementResourceAssociations" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListEngagementResourceAssociationsRequest",
  }) as any as S.Schema<ListEngagementResourceAssociationsRequest>;
export interface EngagementResourceAssociationSummary {
  Catalog: string;
  EngagementId?: string;
  ResourceType?: ResourceType;
  ResourceId?: string;
  CreatedBy?: string | redacted.Redacted<string>;
}
export const EngagementResourceAssociationSummary = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Catalog: S.String,
      EngagementId: S.optional(S.String),
      ResourceType: S.optional(ResourceType),
      ResourceId: S.optional(S.String),
      CreatedBy: S.optional(SensitiveString),
    }),
).annotate({
  identifier: "EngagementResourceAssociationSummary",
}) as any as S.Schema<EngagementResourceAssociationSummary>;
export type EngagementResourceAssociationSummaryList =
  EngagementResourceAssociationSummary[];
export const EngagementResourceAssociationSummaryList = /*@__PURE__*/ S.Array(
  EngagementResourceAssociationSummary,
);
export interface ListEngagementResourceAssociationsResponse {
  EngagementResourceAssociationSummaries: EngagementResourceAssociationSummary[];
  NextToken?: string;
}
export const ListEngagementResourceAssociationsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      EngagementResourceAssociationSummaries:
        EngagementResourceAssociationSummaryList,
      NextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListEngagementResourceAssociationsResponse",
  }) as any as S.Schema<ListEngagementResourceAssociationsResponse>;
export type AwsAccountList = (string | redacted.Redacted<string>)[];
export const AwsAccountList = /*@__PURE__*/ S.Array(SensitiveString);
export type EngagementContextTypeList = EngagementContextType[];
export const EngagementContextTypeList = /*@__PURE__*/ S.Array(
  EngagementContextType,
);
export type EngagementSortName = "CreatedDate" | (string & {});
export const EngagementSortName = S.String;

export interface EngagementSort {
  SortOrder: SortOrder;
  SortBy: EngagementSortName;
}
export const EngagementSort = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SortOrder: SortOrder, SortBy: EngagementSortName }),
).annotate({ identifier: "EngagementSort" }) as any as S.Schema<EngagementSort>;
export type EngagementPageSize = number;
export interface ListEngagementsRequest {
  Catalog: string;
  CreatedBy?: (string | redacted.Redacted<string>)[];
  ExcludeCreatedBy?: (string | redacted.Redacted<string>)[];
  ContextTypes?: EngagementContextType[];
  ExcludeContextTypes?: EngagementContextType[];
  Sort?: EngagementSort;
  MaxResults?: number;
  NextToken?: string;
  EngagementIdentifier?: string[];
}
export const ListEngagementsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    CreatedBy: S.optional(AwsAccountList),
    ExcludeCreatedBy: S.optional(AwsAccountList),
    ContextTypes: S.optional(EngagementContextTypeList),
    ExcludeContextTypes: S.optional(EngagementContextTypeList),
    Sort: S.optional(EngagementSort),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    EngagementIdentifier: S.optional(EngagementIdentifiers),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListEngagements" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListEngagementsRequest",
}) as any as S.Schema<ListEngagementsRequest>;
export interface EngagementSummary {
  Arn?: string;
  Id?: string;
  Title?: string;
  CreatedAt?: Date;
  CreatedBy?: string | redacted.Redacted<string>;
  MemberCount?: number;
  ModifiedAt?: Date;
  ModifiedBy?: string | redacted.Redacted<string>;
  ContextTypes?: EngagementContextType[];
}
export const EngagementSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Id: S.optional(S.String),
    Title: S.optional(S.String),
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    CreatedBy: S.optional(SensitiveString),
    MemberCount: S.optional(S.Number),
    ModifiedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ModifiedBy: S.optional(SensitiveString),
    ContextTypes: S.optional(EngagementContextTypeList),
  }),
).annotate({
  identifier: "EngagementSummary",
}) as any as S.Schema<EngagementSummary>;
export type EngagementSummaryList = EngagementSummary[];
export const EngagementSummaryList = /*@__PURE__*/ S.Array(EngagementSummary);
export interface ListEngagementsResponse {
  EngagementSummaryList: EngagementSummary[];
  NextToken?: string;
}
export const ListEngagementsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EngagementSummaryList: EngagementSummaryList,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListEngagementsResponse",
}) as any as S.Schema<ListEngagementsResponse>;
export type OpportunitySortName =
  | "LastModifiedDate"
  | "Identifier"
  | "CustomerCompanyName"
  | "CreatedDate"
  | "TargetCloseDate"
  | (string & {});
export const OpportunitySortName = S.String;

export interface OpportunitySort {
  SortOrder: SortOrder;
  SortBy: OpportunitySortName;
}
export const OpportunitySort = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SortOrder: SortOrder, SortBy: OpportunitySortName }),
).annotate({
  identifier: "OpportunitySort",
}) as any as S.Schema<OpportunitySort>;
export interface LastModifiedDate {
  AfterLastModifiedDate?: Date;
  BeforeLastModifiedDate?: Date;
}
export const LastModifiedDate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AfterLastModifiedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    BeforeLastModifiedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "LastModifiedDate",
}) as any as S.Schema<LastModifiedDate>;
export type FilterIdentifier = string[];
export const FilterIdentifier = /*@__PURE__*/ S.Array(S.String);
export type FilterLifeCycleStage = Stage[];
export const FilterLifeCycleStage = /*@__PURE__*/ S.Array(Stage);
export type FilterLifeCycleReviewStatus = ReviewStatus[];
export const FilterLifeCycleReviewStatus = /*@__PURE__*/ S.Array(ReviewStatus);
export interface CreatedDateFilter {
  AfterCreatedDate?: Date;
  BeforeCreatedDate?: Date;
}
export const CreatedDateFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AfterCreatedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    BeforeCreatedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "CreatedDateFilter",
}) as any as S.Schema<CreatedDateFilter>;
export interface TargetCloseDateFilter {
  AfterTargetCloseDate?: string;
  BeforeTargetCloseDate?: string;
}
export const TargetCloseDateFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AfterTargetCloseDate: S.optional(S.String),
    BeforeTargetCloseDate: S.optional(S.String),
  }),
).annotate({
  identifier: "TargetCloseDateFilter",
}) as any as S.Schema<TargetCloseDateFilter>;
export interface ListOpportunitiesRequest {
  Catalog: string;
  MaxResults?: number;
  NextToken?: string;
  Sort?: OpportunitySort;
  LastModifiedDate?: LastModifiedDate;
  Identifier?: string[];
  LifeCycleStage?: Stage[];
  LifeCycleReviewStatus?: ReviewStatus[];
  CustomerCompanyName?: string[];
  CreatedDate?: CreatedDateFilter;
  TargetCloseDate?: TargetCloseDateFilter;
}
export const ListOpportunitiesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    Sort: S.optional(OpportunitySort),
    LastModifiedDate: S.optional(LastModifiedDate),
    Identifier: S.optional(FilterIdentifier),
    LifeCycleStage: S.optional(FilterLifeCycleStage),
    LifeCycleReviewStatus: S.optional(FilterLifeCycleReviewStatus),
    CustomerCompanyName: S.optional(StringList),
    CreatedDate: S.optional(CreatedDateFilter),
    TargetCloseDate: S.optional(TargetCloseDateFilter),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListOpportunities" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListOpportunitiesRequest",
}) as any as S.Schema<ListOpportunitiesRequest>;
export interface LifeCycleSummary {
  Stage?: Stage;
  ClosedLostReason?: ClosedLostReason;
  NextSteps?: string | redacted.Redacted<string>;
  TargetCloseDate?: string;
  ReviewStatus?: ReviewStatus;
  ReviewComments?: string;
  ReviewStatusReason?: string;
}
export const LifeCycleSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Stage: S.optional(Stage),
    ClosedLostReason: S.optional(ClosedLostReason),
    NextSteps: S.optional(SensitiveString),
    TargetCloseDate: S.optional(S.String),
    ReviewStatus: S.optional(ReviewStatus),
    ReviewComments: S.optional(S.String),
    ReviewStatusReason: S.optional(S.String),
  }),
).annotate({
  identifier: "LifeCycleSummary",
}) as any as S.Schema<LifeCycleSummary>;
export interface AddressSummary {
  City?: string | redacted.Redacted<string>;
  PostalCode?: string | redacted.Redacted<string>;
  StateOrRegion?: string | redacted.Redacted<string>;
  CountryCode?: CountryCode;
}
export const AddressSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    City: S.optional(SensitiveString),
    PostalCode: S.optional(SensitiveString),
    StateOrRegion: S.optional(SensitiveString),
    CountryCode: S.optional(CountryCode),
  }),
).annotate({ identifier: "AddressSummary" }) as any as S.Schema<AddressSummary>;
export interface AccountSummary {
  Industry?: Industry;
  OtherIndustry?: string;
  CompanyName: string | redacted.Redacted<string>;
  WebsiteUrl?: string | redacted.Redacted<string>;
  Address?: AddressSummary;
}
export const AccountSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Industry: S.optional(Industry),
    OtherIndustry: S.optional(S.String),
    CompanyName: SensitiveString,
    WebsiteUrl: S.optional(SensitiveString),
    Address: S.optional(AddressSummary),
  }),
).annotate({ identifier: "AccountSummary" }) as any as S.Schema<AccountSummary>;
export interface CustomerSummary {
  Account?: AccountSummary;
}
export const CustomerSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Account: S.optional(AccountSummary) }),
).annotate({
  identifier: "CustomerSummary",
}) as any as S.Schema<CustomerSummary>;
export interface ProjectSummary {
  DeliveryModels?: DeliveryModel[];
  ExpectedCustomerSpend?: ExpectedCustomerSpend[];
  ExpectedContractDuration?: ExpectedContractDuration;
}
export const ProjectSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeliveryModels: S.optional(DeliveryModels),
    ExpectedCustomerSpend: S.optional(ExpectedCustomerSpendList),
    ExpectedContractDuration: S.optional(ExpectedContractDuration),
  }),
).annotate({ identifier: "ProjectSummary" }) as any as S.Schema<ProjectSummary>;
export interface OpportunitySummary {
  Catalog: string;
  Id?: string;
  Arn?: string;
  PartnerOpportunityIdentifier?: string;
  OpportunityType?: OpportunityType;
  LastModifiedDate?: Date;
  CreatedDate?: Date;
  LifeCycle?: LifeCycleSummary;
  Customer?: CustomerSummary;
  Project?: ProjectSummary;
}
export const OpportunitySummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    Id: S.optional(S.String),
    Arn: S.optional(S.String),
    PartnerOpportunityIdentifier: S.optional(S.String),
    OpportunityType: S.optional(OpportunityType),
    LastModifiedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    CreatedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    LifeCycle: S.optional(LifeCycleSummary),
    Customer: S.optional(CustomerSummary),
    Project: S.optional(ProjectSummary),
  }),
).annotate({
  identifier: "OpportunitySummary",
}) as any as S.Schema<OpportunitySummary>;
export type OpportunitySummaries = OpportunitySummary[];
export const OpportunitySummaries = /*@__PURE__*/ S.Array(OpportunitySummary);
export interface ListOpportunitiesResponse {
  OpportunitySummaries: OpportunitySummary[];
  NextToken?: string;
}
export const ListOpportunitiesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OpportunitySummaries: OpportunitySummaries,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListOpportunitiesResponse",
}) as any as S.Schema<ListOpportunitiesResponse>;
export type ContextIdentifier = string;
export type ContextIdentifiers = string[];
export const ContextIdentifiers = /*@__PURE__*/ S.Array(S.String);
export interface ListOpportunityFromEngagementTasksRequest {
  MaxResults?: number;
  NextToken?: string;
  Sort?: ListTasksSortBase;
  Catalog: string;
  TaskStatus?: TaskStatus[];
  TaskIdentifier?: string[];
  OpportunityIdentifier?: string[];
  EngagementIdentifier?: string[];
  ContextIdentifier?: string[];
}
export const ListOpportunityFromEngagementTasksRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
      Sort: S.optional(ListTasksSortBase),
      Catalog: S.String,
      TaskStatus: S.optional(TaskStatuses),
      TaskIdentifier: S.optional(TaskIdentifiers),
      OpportunityIdentifier: S.optional(OpportunityIdentifiers),
      EngagementIdentifier: S.optional(EngagementIdentifiers),
      ContextIdentifier: S.optional(ContextIdentifiers),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/ListOpportunityFromEngagementTasks" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListOpportunityFromEngagementTasksRequest",
  }) as any as S.Schema<ListOpportunityFromEngagementTasksRequest>;
export interface ListOpportunityFromEngagementTaskSummary {
  TaskId?: string;
  TaskArn?: string;
  StartTime?: Date;
  TaskStatus?: TaskStatus;
  Message?: string;
  ReasonCode?: ReasonCode;
  OpportunityId?: string;
  ResourceSnapshotJobId?: string;
  EngagementId?: string;
  ContextId?: string;
}
export const ListOpportunityFromEngagementTaskSummary = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      TaskId: S.optional(S.String),
      TaskArn: S.optional(S.String),
      StartTime: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      TaskStatus: S.optional(TaskStatus),
      Message: S.optional(S.String),
      ReasonCode: S.optional(ReasonCode),
      OpportunityId: S.optional(S.String),
      ResourceSnapshotJobId: S.optional(S.String),
      EngagementId: S.optional(S.String),
      ContextId: S.optional(S.String),
    }),
).annotate({
  identifier: "ListOpportunityFromEngagementTaskSummary",
}) as any as S.Schema<ListOpportunityFromEngagementTaskSummary>;
export type ListOpportunityFromEngagementTaskSummaries =
  ListOpportunityFromEngagementTaskSummary[];
export const ListOpportunityFromEngagementTaskSummaries = /*@__PURE__*/ S.Array(
  ListOpportunityFromEngagementTaskSummary,
);
export interface ListOpportunityFromEngagementTasksResponse {
  TaskSummaries?: ListOpportunityFromEngagementTaskSummary[];
  NextToken?: string;
}
export const ListOpportunityFromEngagementTasksResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      TaskSummaries: S.optional(ListOpportunityFromEngagementTaskSummaries),
      NextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListOpportunityFromEngagementTasksResponse",
  }) as any as S.Schema<ListOpportunityFromEngagementTasksResponse>;
export type TaskIdentifierList = string[];
export const TaskIdentifierList = /*@__PURE__*/ S.Array(S.String);
export type TaskNameList = string[];
export const TaskNameList = /*@__PURE__*/ S.Array(S.String);
export type ProspectingFromEngagementTaskSortName =
  | "StartTime"
  | "TaskName"
  | "FailedEngagementCount"
  | (string & {});
export const ProspectingFromEngagementTaskSortName = S.String;

export interface ProspectingFromEngagementTaskSort {
  SortOrder: SortOrder;
  SortBy: ProspectingFromEngagementTaskSortName;
}
export const ProspectingFromEngagementTaskSort = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SortOrder: SortOrder,
    SortBy: ProspectingFromEngagementTaskSortName,
  }),
).annotate({
  identifier: "ProspectingFromEngagementTaskSort",
}) as any as S.Schema<ProspectingFromEngagementTaskSort>;
export interface ListProspectingFromEngagementTasksRequest {
  Catalog: string;
  MaxResults?: number;
  NextToken?: string;
  TaskIdentifier?: string[];
  TaskName?: string[];
  StartAfter?: Date;
  StartBefore?: Date;
  Sort?: ProspectingFromEngagementTaskSort;
}
export const ListProspectingFromEngagementTasksRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Catalog: S.String,
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
      TaskIdentifier: S.optional(TaskIdentifierList),
      TaskName: S.optional(TaskNameList),
      StartAfter: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      StartBefore: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      Sort: S.optional(ProspectingFromEngagementTaskSort),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/ListProspectingFromEngagementTasks" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListProspectingFromEngagementTasksRequest",
  }) as any as S.Schema<ListProspectingFromEngagementTasksRequest>;
export interface ProspectingTaskSummary {
  TaskId: string;
  TaskArn: string;
  TaskName: string;
  StartTime: Date;
  EndTime?: Date;
  TotalEngagementCount: number;
  CompletedEngagementCount: number;
  FailedEngagementCount: number;
}
export const ProspectingTaskSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TaskId: S.String,
    TaskArn: S.String,
    TaskName: S.String,
    StartTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    EndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    TotalEngagementCount: S.Number,
    CompletedEngagementCount: S.Number,
    FailedEngagementCount: S.Number,
  }),
).annotate({
  identifier: "ProspectingTaskSummary",
}) as any as S.Schema<ProspectingTaskSummary>;
export type ProspectingTaskSummaryList = ProspectingTaskSummary[];
export const ProspectingTaskSummaryList = /*@__PURE__*/ S.Array(
  ProspectingTaskSummary,
);
export interface ListProspectingFromEngagementTasksResponse {
  NextToken?: string;
  TaskSummaries: ProspectingTaskSummary[];
}
export const ListProspectingFromEngagementTasksResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      NextToken: S.optional(S.String),
      TaskSummaries: ProspectingTaskSummaryList,
    }),
  ).annotate({
    identifier: "ListProspectingFromEngagementTasksResponse",
  }) as any as S.Schema<ListProspectingFromEngagementTasksResponse>;
export type SortBy = "CreatedDate" | (string & {});
export const SortBy = S.String;

export interface SortObject {
  SortBy?: SortBy;
  SortOrder?: SortOrder;
}
export const SortObject = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SortBy: S.optional(SortBy), SortOrder: S.optional(SortOrder) }),
).annotate({ identifier: "SortObject" }) as any as S.Schema<SortObject>;
export interface ListResourceSnapshotJobsRequest {
  Catalog: string;
  MaxResults?: number;
  NextToken?: string;
  EngagementIdentifier?: string;
  Status?: ResourceSnapshotJobStatus;
  Sort?: SortObject;
}
export const ListResourceSnapshotJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    EngagementIdentifier: S.optional(S.String),
    Status: S.optional(ResourceSnapshotJobStatus),
    Sort: S.optional(SortObject),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListResourceSnapshotJobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListResourceSnapshotJobsRequest",
}) as any as S.Schema<ListResourceSnapshotJobsRequest>;
export interface ResourceSnapshotJobSummary {
  Id?: string;
  Arn?: string;
  EngagementId?: string;
  Status?: ResourceSnapshotJobStatus;
}
export const ResourceSnapshotJobSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Arn: S.optional(S.String),
    EngagementId: S.optional(S.String),
    Status: S.optional(ResourceSnapshotJobStatus),
  }),
).annotate({
  identifier: "ResourceSnapshotJobSummary",
}) as any as S.Schema<ResourceSnapshotJobSummary>;
export type ResourceSnapshotJobSummaryList = ResourceSnapshotJobSummary[];
export const ResourceSnapshotJobSummaryList = /*@__PURE__*/ S.Array(
  ResourceSnapshotJobSummary,
);
export interface ListResourceSnapshotJobsResponse {
  ResourceSnapshotJobSummaries: ResourceSnapshotJobSummary[];
  NextToken?: string;
}
export const ListResourceSnapshotJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceSnapshotJobSummaries: ResourceSnapshotJobSummaryList,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListResourceSnapshotJobsResponse",
}) as any as S.Schema<ListResourceSnapshotJobsResponse>;
export interface ListResourceSnapshotsRequest {
  Catalog: string;
  MaxResults?: number;
  NextToken?: string;
  EngagementIdentifier: string;
  ResourceType?: ResourceType;
  ResourceIdentifier?: string;
  ResourceSnapshotTemplateIdentifier?: string;
  CreatedBy?: string | redacted.Redacted<string>;
}
export const ListResourceSnapshotsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    EngagementIdentifier: S.String,
    ResourceType: S.optional(ResourceType),
    ResourceIdentifier: S.optional(S.String),
    ResourceSnapshotTemplateIdentifier: S.optional(S.String),
    CreatedBy: S.optional(SensitiveString),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListResourceSnapshots" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListResourceSnapshotsRequest",
}) as any as S.Schema<ListResourceSnapshotsRequest>;
export type ResourceSnapshotArn = string;
export interface ResourceSnapshotSummary {
  Arn?: string;
  Revision?: number;
  ResourceType?: ResourceType;
  ResourceId?: string;
  ResourceSnapshotTemplateName?: string;
  CreatedBy?: string | redacted.Redacted<string>;
}
export const ResourceSnapshotSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Revision: S.optional(S.Number),
    ResourceType: S.optional(ResourceType),
    ResourceId: S.optional(S.String),
    ResourceSnapshotTemplateName: S.optional(S.String),
    CreatedBy: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "ResourceSnapshotSummary",
}) as any as S.Schema<ResourceSnapshotSummary>;
export type ResourceSnapshotSummaryList = ResourceSnapshotSummary[];
export const ResourceSnapshotSummaryList = /*@__PURE__*/ S.Array(
  ResourceSnapshotSummary,
);
export interface ListResourceSnapshotsResponse {
  ResourceSnapshotSummaries: ResourceSnapshotSummary[];
  NextToken?: string;
}
export const ListResourceSnapshotsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceSnapshotSummaries: ResourceSnapshotSummaryList,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListResourceSnapshotsResponse",
}) as any as S.Schema<ListResourceSnapshotsResponse>;
export type SolutionSortName =
  | "Identifier"
  | "Name"
  | "Status"
  | "Category"
  | "CreatedDate"
  | (string & {});
export const SolutionSortName = S.String;

export interface SolutionSort {
  SortOrder: SortOrder;
  SortBy: SolutionSortName;
}
export const SolutionSort = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SortOrder: SortOrder, SortBy: SolutionSortName }),
).annotate({ identifier: "SolutionSort" }) as any as S.Schema<SolutionSort>;
export type SolutionStatus = "Active" | "Inactive" | "Draft" | (string & {});
export const SolutionStatus = S.String;

export type FilterStatus = SolutionStatus[];
export const FilterStatus = /*@__PURE__*/ S.Array(SolutionStatus);
export type AwsMarketplaceSolutionArn = string;
export type AwsMarketplaceSolutionArnList = string[];
export const AwsMarketplaceSolutionArnList = /*@__PURE__*/ S.Array(S.String);
export interface ListSolutionsRequest {
  Catalog: string;
  MaxResults?: number;
  NextToken?: string;
  Sort?: SolutionSort;
  Status?: SolutionStatus[];
  Identifier?: string[];
  Category?: string[];
  AwsMarketplaceSolutionArn?: string[];
}
export const ListSolutionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    Sort: S.optional(SolutionSort),
    Status: S.optional(FilterStatus),
    Identifier: S.optional(SolutionIdentifiers),
    Category: S.optional(StringList),
    AwsMarketplaceSolutionArn: S.optional(AwsMarketplaceSolutionArnList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListSolutions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSolutionsRequest",
}) as any as S.Schema<ListSolutionsRequest>;
export type SolutionArn = string;
export interface SolutionBase {
  Catalog: string;
  Id: string;
  Arn?: string;
  Name: string;
  Status: SolutionStatus;
  Category: string;
  CreatedDate: Date;
  AwsMarketplaceSolutionArn?: string;
}
export const SolutionBase = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    Id: S.String,
    Arn: S.optional(S.String),
    Name: S.String,
    Status: SolutionStatus,
    Category: S.String,
    CreatedDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    AwsMarketplaceSolutionArn: S.optional(S.String),
  }),
).annotate({ identifier: "SolutionBase" }) as any as S.Schema<SolutionBase>;
export type SolutionList = SolutionBase[];
export const SolutionList = /*@__PURE__*/ S.Array(SolutionBase);
export interface ListSolutionsResponse {
  SolutionSummaries: SolutionBase[];
  NextToken?: string;
}
export const ListSolutionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SolutionSummaries: SolutionList,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSolutionsResponse",
}) as any as S.Schema<ListSolutionsResponse>;
export type TaggableResourceArn = string;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String }).pipe(
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
  Tags: Tag[];
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: TagList }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export type ResourceSnapshotJobRoleIdentifier = string;
export interface PutSellingSystemSettingsRequest {
  Catalog: string;
  ResourceSnapshotJobRoleIdentifier?: string;
}
export const PutSellingSystemSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    ResourceSnapshotJobRoleIdentifier: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/PutSellingSystemSettings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutSellingSystemSettingsRequest",
}) as any as S.Schema<PutSellingSystemSettingsRequest>;
export interface PutSellingSystemSettingsResponse {
  Catalog: string;
  ResourceSnapshotJobRoleArn?: string;
}
export const PutSellingSystemSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    ResourceSnapshotJobRoleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "PutSellingSystemSettingsResponse",
}) as any as S.Schema<PutSellingSystemSettingsResponse>;
export interface RejectEngagementInvitationRequest {
  Catalog: string;
  Identifier: string;
  RejectionReason?: string;
}
export const RejectEngagementInvitationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    Identifier: S.String,
    RejectionReason: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/RejectEngagementInvitation" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RejectEngagementInvitationRequest",
}) as any as S.Schema<RejectEngagementInvitationRequest>;
export interface RejectEngagementInvitationResponse {}
export const RejectEngagementInvitationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "RejectEngagementInvitationResponse",
}) as any as S.Schema<RejectEngagementInvitationResponse>;
export interface StartEngagementByAcceptingInvitationTaskRequest {
  Catalog: string;
  ClientToken: string;
  Identifier: string;
  Tags?: Tag[];
}
export const StartEngagementByAcceptingInvitationTaskRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Catalog: S.String,
      ClientToken: S.String.pipe(T.IdempotencyToken()),
      Identifier: S.String,
      Tags: S.optional(TagList),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/StartEngagementByAcceptingInvitationTask",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "StartEngagementByAcceptingInvitationTaskRequest",
  }) as any as S.Schema<StartEngagementByAcceptingInvitationTaskRequest>;
export interface StartEngagementByAcceptingInvitationTaskResponse {
  TaskId?: string;
  TaskArn?: string;
  StartTime?: Date;
  TaskStatus?: TaskStatus;
  Message?: string;
  ReasonCode?: ReasonCode;
  OpportunityId?: string;
  ResourceSnapshotJobId?: string;
  EngagementInvitationId?: string;
}
export const StartEngagementByAcceptingInvitationTaskResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      TaskId: S.optional(S.String),
      TaskArn: S.optional(S.String),
      StartTime: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      TaskStatus: S.optional(TaskStatus),
      Message: S.optional(S.String),
      ReasonCode: S.optional(ReasonCode),
      OpportunityId: S.optional(S.String),
      ResourceSnapshotJobId: S.optional(S.String),
      EngagementInvitationId: S.optional(S.String),
    }),
  ).annotate({
    identifier: "StartEngagementByAcceptingInvitationTaskResponse",
  }) as any as S.Schema<StartEngagementByAcceptingInvitationTaskResponse>;
export interface AwsSubmission {
  InvolvementType: SalesInvolvementType;
  Visibility?: Visibility;
}
export const AwsSubmission = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InvolvementType: SalesInvolvementType,
    Visibility: S.optional(Visibility),
  }),
).annotate({ identifier: "AwsSubmission" }) as any as S.Schema<AwsSubmission>;
export interface StartEngagementFromOpportunityTaskRequest {
  Catalog: string;
  ClientToken: string;
  Identifier: string;
  AwsSubmission: AwsSubmission;
  Tags?: Tag[];
}
export const StartEngagementFromOpportunityTaskRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Catalog: S.String,
      ClientToken: S.String.pipe(T.IdempotencyToken()),
      Identifier: S.String,
      AwsSubmission: AwsSubmission,
      Tags: S.optional(TagList),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/StartEngagementFromOpportunityTask" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "StartEngagementFromOpportunityTaskRequest",
  }) as any as S.Schema<StartEngagementFromOpportunityTaskRequest>;
export interface StartEngagementFromOpportunityTaskResponse {
  TaskId?: string;
  TaskArn?: string;
  StartTime?: Date;
  TaskStatus?: TaskStatus;
  Message?: string;
  ReasonCode?: ReasonCode;
  OpportunityId?: string;
  ResourceSnapshotJobId?: string;
  EngagementId?: string;
  EngagementInvitationId?: string;
}
export const StartEngagementFromOpportunityTaskResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      TaskId: S.optional(S.String),
      TaskArn: S.optional(S.String),
      StartTime: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      TaskStatus: S.optional(TaskStatus),
      Message: S.optional(S.String),
      ReasonCode: S.optional(ReasonCode),
      OpportunityId: S.optional(S.String),
      ResourceSnapshotJobId: S.optional(S.String),
      EngagementId: S.optional(S.String),
      EngagementInvitationId: S.optional(S.String),
    }),
  ).annotate({
    identifier: "StartEngagementFromOpportunityTaskResponse",
  }) as any as S.Schema<StartEngagementFromOpportunityTaskResponse>;
export interface StartOpportunityFromEngagementTaskRequest {
  Catalog: string;
  ClientToken: string;
  Identifier: string;
  ContextIdentifier: string;
  Tags?: Tag[];
}
export const StartOpportunityFromEngagementTaskRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Catalog: S.String,
      ClientToken: S.String.pipe(T.IdempotencyToken()),
      Identifier: S.String,
      ContextIdentifier: S.String,
      Tags: S.optional(TagList),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/StartOpportunityFromEngagementTask" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "StartOpportunityFromEngagementTaskRequest",
  }) as any as S.Schema<StartOpportunityFromEngagementTaskRequest>;
export interface StartOpportunityFromEngagementTaskResponse {
  TaskId?: string;
  TaskArn?: string;
  StartTime?: Date;
  TaskStatus?: TaskStatus;
  Message?: string;
  ReasonCode?: ReasonCode;
  OpportunityId?: string;
  ResourceSnapshotJobId?: string;
  EngagementId?: string;
  ContextId?: string;
}
export const StartOpportunityFromEngagementTaskResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      TaskId: S.optional(S.String),
      TaskArn: S.optional(S.String),
      StartTime: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      TaskStatus: S.optional(TaskStatus),
      Message: S.optional(S.String),
      ReasonCode: S.optional(ReasonCode),
      OpportunityId: S.optional(S.String),
      ResourceSnapshotJobId: S.optional(S.String),
      EngagementId: S.optional(S.String),
      ContextId: S.optional(S.String),
    }),
  ).annotate({
    identifier: "StartOpportunityFromEngagementTaskResponse",
  }) as any as S.Schema<StartOpportunityFromEngagementTaskResponse>;
export type EngagementIdentifierList = string[];
export const EngagementIdentifierList = /*@__PURE__*/ S.Array(S.String);
export interface StartProspectingFromEngagementTaskRequest {
  Catalog: string;
  Identifiers: string[];
  TaskName: string;
  ClientToken: string;
}
export const StartProspectingFromEngagementTaskRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Catalog: S.String,
      Identifiers: EngagementIdentifierList,
      TaskName: S.String,
      ClientToken: S.String.pipe(T.IdempotencyToken()),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/StartProspectingFromEngagementTask" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "StartProspectingFromEngagementTaskRequest",
  }) as any as S.Schema<StartProspectingFromEngagementTaskRequest>;
export interface StartProspectingFromEngagementTaskResponse {
  Identifiers: string[];
  TaskName: string;
  Message?: string;
  ReasonCode?: string;
  StartTime: Date;
  TaskId?: string;
  TaskArn?: string;
  TaskStatus: ProspectingTaskStatus;
}
export const StartProspectingFromEngagementTaskResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Identifiers: EngagementIdentifierList,
      TaskName: S.String,
      Message: S.optional(S.String),
      ReasonCode: S.optional(S.String),
      StartTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
      TaskId: S.optional(S.String),
      TaskArn: S.optional(S.String),
      TaskStatus: ProspectingTaskStatus,
    }),
  ).annotate({
    identifier: "StartProspectingFromEngagementTaskResponse",
  }) as any as S.Schema<StartProspectingFromEngagementTaskResponse>;
export interface StartResourceSnapshotJobRequest {
  Catalog: string;
  ResourceSnapshotJobIdentifier: string;
}
export const StartResourceSnapshotJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Catalog: S.String, ResourceSnapshotJobIdentifier: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/StartResourceSnapshotJob" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartResourceSnapshotJobRequest",
}) as any as S.Schema<StartResourceSnapshotJobRequest>;
export interface StartResourceSnapshotJobResponse {}
export const StartResourceSnapshotJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StartResourceSnapshotJobResponse",
}) as any as S.Schema<StartResourceSnapshotJobResponse>;
export interface StopResourceSnapshotJobRequest {
  Catalog: string;
  ResourceSnapshotJobIdentifier: string;
}
export const StopResourceSnapshotJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Catalog: S.String, ResourceSnapshotJobIdentifier: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/StopResourceSnapshotJob" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopResourceSnapshotJobRequest",
}) as any as S.Schema<StopResourceSnapshotJobRequest>;
export interface StopResourceSnapshotJobResponse {}
export const StopResourceSnapshotJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StopResourceSnapshotJobResponse",
}) as any as S.Schema<StopResourceSnapshotJobResponse>;
export interface SubmitOpportunityRequest {
  Catalog: string;
  Identifier: string;
  InvolvementType: SalesInvolvementType;
  Visibility?: Visibility;
}
export const SubmitOpportunityRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    Identifier: S.String,
    InvolvementType: SalesInvolvementType,
    Visibility: S.optional(Visibility),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/SubmitOpportunity" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SubmitOpportunityRequest",
}) as any as S.Schema<SubmitOpportunityRequest>;
export interface SubmitOpportunityResponse {}
export const SubmitOpportunityResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "SubmitOpportunityResponse",
}) as any as S.Schema<SubmitOpportunityResponse>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String, Tags: TagList }).pipe(
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
  ResourceArn: string;
  TagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String, TagKeys: TagKeyList }).pipe(
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
export interface UpdateLeadContext {
  QualificationStatus?: string;
  Customer: LeadCustomer;
  Interaction?: LeadInteraction;
  Insights?: LeadInsights;
}
export const UpdateLeadContext = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QualificationStatus: S.optional(S.String),
    Customer: LeadCustomer,
    Interaction: S.optional(LeadInteraction),
    Insights: S.optional(LeadInsights),
  }),
).annotate({
  identifier: "UpdateLeadContext",
}) as any as S.Schema<UpdateLeadContext>;
export type UpdateEngagementContextPayload =
  | {
      Lead: UpdateLeadContext;
      CustomerProject?: never;
      ProspectingResult?: never;
    }
  | {
      Lead?: never;
      CustomerProject: CustomerProjectsContext;
      ProspectingResult?: never;
    }
  | {
      Lead?: never;
      CustomerProject?: never;
      ProspectingResult: ProspectingResult;
    };
export const UpdateEngagementContextPayload = /*@__PURE__*/ S.Union([
  S.Struct({ Lead: UpdateLeadContext }),
  S.Struct({ CustomerProject: CustomerProjectsContext }),
  S.Struct({ ProspectingResult: ProspectingResult }),
]);
export interface UpdateEngagementContextRequest {
  Catalog: string;
  EngagementIdentifier: string;
  ContextIdentifier: string;
  EngagementLastModifiedAt: Date;
  Type: EngagementContextType;
  Payload: UpdateEngagementContextPayload;
}
export const UpdateEngagementContextRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    EngagementIdentifier: S.String,
    ContextIdentifier: S.String,
    EngagementLastModifiedAt: T.DateFromString.pipe(
      T.TimestampFormat("date-time"),
    ),
    Type: EngagementContextType,
    Payload: UpdateEngagementContextPayload,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/UpdateEngagementContext" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateEngagementContextRequest",
}) as any as S.Schema<UpdateEngagementContextRequest>;
export interface UpdateEngagementContextResponse {
  EngagementId: string;
  EngagementArn: string;
  EngagementLastModifiedAt: Date;
  ContextId: string;
}
export const UpdateEngagementContextResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EngagementId: S.String,
    EngagementArn: S.String,
    EngagementLastModifiedAt: T.DateFromString.pipe(
      T.TimestampFormat("date-time"),
    ),
    ContextId: S.String,
  }),
).annotate({
  identifier: "UpdateEngagementContextResponse",
}) as any as S.Schema<UpdateEngagementContextResponse>;
export interface UpdateOpportunityRequest {
  Catalog: string;
  PrimaryNeedsFromAws?: PrimaryNeedFromAws[];
  NationalSecurity?: NationalSecurity;
  PartnerOpportunityIdentifier?: string;
  Customer?: Customer;
  Project?: Project;
  OpportunityType?: OpportunityType;
  Marketing?: Marketing;
  SoftwareRevenue?: SoftwareRevenue;
  LastModifiedDate: Date;
  Identifier: string;
  LifeCycle?: LifeCycle;
}
export const UpdateOpportunityRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.String,
    PrimaryNeedsFromAws: S.optional(PrimaryNeedsFromAws),
    NationalSecurity: S.optional(NationalSecurity),
    PartnerOpportunityIdentifier: S.optional(S.String),
    Customer: S.optional(Customer),
    Project: S.optional(Project),
    OpportunityType: S.optional(OpportunityType),
    Marketing: S.optional(Marketing),
    SoftwareRevenue: S.optional(SoftwareRevenue),
    LastModifiedDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    Identifier: S.String,
    LifeCycle: S.optional(LifeCycle),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/UpdateOpportunity" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateOpportunityRequest",
}) as any as S.Schema<UpdateOpportunityRequest>;
export interface UpdateOpportunityResponse {
  Id: string;
  LastModifiedDate: Date;
}
export const UpdateOpportunityResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.String,
    LastModifiedDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "UpdateOpportunityResponse",
}) as any as S.Schema<UpdateOpportunityResponse>;
export type AccessDeniedExceptionErrorCode =
  | "INCOMPATIBLE_BENEFIT_AWS_PARTNER_STATE"
  | (string & {});
export const AccessDeniedExceptionErrorCode = S.String;

export type ValidationExceptionReason =
  | "REQUEST_VALIDATION_FAILED"
  | "BUSINESS_VALIDATION_FAILED"
  | (string & {});
export const ValidationExceptionReason = S.String;

export type ValidationExceptionErrorCode =
  | "REQUIRED_FIELD_MISSING"
  | "INVALID_ENUM_VALUE"
  | "INVALID_STRING_FORMAT"
  | "INVALID_VALUE"
  | "NOT_ENOUGH_VALUES"
  | "TOO_MANY_VALUES"
  | "INVALID_RESOURCE_STATE"
  | "DUPLICATE_KEY_VALUE"
  | "VALUE_OUT_OF_RANGE"
  | "ACTION_NOT_PERMITTED"
  | (string & {});
export const ValidationExceptionErrorCode = S.String;

export interface ValidationExceptionError {
  FieldName?: string;
  Message: string;
  Code: ValidationExceptionErrorCode;
}
export const ValidationExceptionError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FieldName: S.optional(S.String),
    Message: S.String,
    Code: ValidationExceptionErrorCode,
  }),
).annotate({
  identifier: "ValidationExceptionError",
}) as any as S.Schema<ValidationExceptionError>;
export type ValidationExceptionErrorList = ValidationExceptionError[];
export const ValidationExceptionErrorList = /*@__PURE__*/ S.Array(
  ValidationExceptionError,
);
export type AcceptEngagementInvitationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use the `AcceptEngagementInvitation` action to accept an engagement invitation shared by AWS. Accepting the invitation indicates your willingness to participate in the engagement, granting you access to all engagement-related data.
 */
export const acceptEngagementInvitation: API.OperationMethod<
  AcceptEngagementInvitationRequest,
  AcceptEngagementInvitationResponse,
  AcceptEngagementInvitationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AcceptEngagementInvitationRequest,
  output: AcceptEngagementInvitationResponse,
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
  operationName: "AcceptEngagementInvitation",
}));

export type AssignOpportunityError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Enables you to reassign an existing `Opportunity` to another user within your Partner Central account. The specified user receives the opportunity, and it appears on their Partner Central dashboard, allowing them to take necessary actions or proceed with the opportunity.
 *
 * This is useful for distributing opportunities to the appropriate team members or departments within your organization, ensuring that each opportunity is handled by the right person. By default, the opportunity owner is the one who creates it. Currently, there's no API to enumerate the list of available users.
 */
export const assignOpportunity: API.OperationMethod<
  AssignOpportunityRequest,
  AssignOpportunityResponse,
  AssignOpportunityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssignOpportunityRequest,
  output: AssignOpportunityResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssignOpportunity",
}));

export type AssociateOpportunityError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Enables you to create a formal association between an `Opportunity` and various related entities, enriching the context and details of the opportunity for better collaboration and decision making. You can associate an opportunity with the following entity types:
 *
 * - Partner Solution: A software product or consulting practice created and delivered by Partners. Partner Solutions help customers address business challenges using Amazon Web Services services.
 *
 * - Amazon Web Services Products: Amazon Web Services offers many products and services that provide scalable, reliable, and cost-effective infrastructure solutions. For the latest list of Amazon Web Services products, see Amazon Web Services products.
 *
 * - Amazon Web Services Marketplace private offer: Allows Amazon Web Services Marketplace sellers to extend custom pricing and terms to individual Amazon Web Services customers. Sellers can negotiate custom prices, payment schedules, and end user license terms through private offers, enabling Amazon Web Services customers to acquire software solutions tailored to their specific needs. For more information, see Private offers in Amazon Web Services Marketplace.
 *
 * To obtain identifiers for these entities, use the following methods:
 *
 * - Solution: Use the `ListSolutions` operation.
 *
 * - AWS Products: For the latest list of Amazon Web Services products, see Amazon Web Services products.
 *
 * - Amazon Web Services Marketplace private offer: Use the Using the Amazon Web Services Marketplace Catalog API to list entities. Specifically, use the `ListEntities` operation to retrieve a list of private offers. The request returns the details of available private offers. For more information, see ListEntities.
 */
export const associateOpportunity: API.OperationMethod<
  AssociateOpportunityRequest,
  AssociateOpportunityResponse,
  AssociateOpportunityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateOpportunityRequest,
  output: AssociateOpportunityResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateOpportunity",
}));

export type CreateEngagementError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The `CreateEngagement` action allows you to create an `Engagement`, which serves as a collaborative space between different parties such as AWS Partners and AWS Sellers. This action automatically adds the caller's AWS account as an active member of the newly created `Engagement`.
 */
export const createEngagement: API.OperationMethod<
  CreateEngagementRequest,
  CreateEngagementResponse,
  CreateEngagementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateEngagementRequest,
  output: CreateEngagementResponse,
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
  operationName: "CreateEngagement",
}));

export type CreateEngagementContextError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new context within an existing engagement. This action allows you to add contextual information such as customer projects or documents to an engagement, providing additional details that help facilitate collaboration between engagement members.
 */
export const createEngagementContext: API.OperationMethod<
  CreateEngagementContextRequest,
  CreateEngagementContextResponse,
  CreateEngagementContextError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateEngagementContextRequest,
  output: CreateEngagementContextResponse,
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
  operationName: "CreateEngagementContext",
}));

export type CreateEngagementInvitationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This action creates an invitation from a sender to a single receiver to join an engagement.
 */
export const createEngagementInvitation: API.OperationMethod<
  CreateEngagementInvitationRequest,
  CreateEngagementInvitationResponse,
  CreateEngagementInvitationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateEngagementInvitationRequest,
  output: CreateEngagementInvitationResponse,
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
  operationName: "CreateEngagementInvitation",
}));

export type CreateOpportunityError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an `Opportunity` record in Partner Central. Use this operation to create a potential business opportunity for submission to Amazon Web Services. Creating an opportunity sets `Lifecycle.ReviewStatus` to `Pending Submission`.
 *
 * To submit an opportunity, follow these steps:
 *
 * - To create the opportunity, use `CreateOpportunity`.
 *
 * - To associate a solution with the opportunity, use `AssociateOpportunity`.
 *
 * - To start the engagement with AWS, use `StartEngagementFromOpportunity`.
 *
 * After submission, you can't edit the opportunity until the review is complete. But opportunities in the `Pending Submission` state must have complete details. You can update the opportunity while it's in the `Pending Submission` state.
 *
 * There's a set of mandatory fields to create opportunities, but consider providing optional fields to enrich the opportunity record.
 */
export const createOpportunity: API.OperationMethod<
  CreateOpportunityRequest,
  CreateOpportunityResponse,
  CreateOpportunityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateOpportunityRequest,
  output: CreateOpportunityResponse,
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
  operationName: "CreateOpportunity",
}));

export type CreateResourceSnapshotError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This action allows you to create an immutable snapshot of a specific resource, such as an opportunity, within the context of an engagement. The snapshot captures a subset of the resource's data based on the schema defined by the provided template.
 */
export const createResourceSnapshot: API.OperationMethod<
  CreateResourceSnapshotRequest,
  CreateResourceSnapshotResponse,
  CreateResourceSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateResourceSnapshotRequest,
  output: CreateResourceSnapshotResponse,
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
  operationName: "CreateResourceSnapshot",
}));

export type CreateResourceSnapshotJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use this action to create a job to generate a snapshot of the specified resource within an engagement. It initiates an asynchronous process to create a resource snapshot. The job creates a new snapshot only if the resource state has changed, adhering to the same access control and immutability rules as direct snapshot creation.
 */
export const createResourceSnapshotJob: API.OperationMethod<
  CreateResourceSnapshotJobRequest,
  CreateResourceSnapshotJobResponse,
  CreateResourceSnapshotJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateResourceSnapshotJobRequest,
  output: CreateResourceSnapshotJobResponse,
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
  operationName: "CreateResourceSnapshotJob",
}));

export type DeleteResourceSnapshotJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use this action to deletes a previously created resource snapshot job. The job must be in a stopped state before it can be deleted.
 */
export const deleteResourceSnapshotJob: API.OperationMethod<
  DeleteResourceSnapshotJobRequest,
  DeleteResourceSnapshotJobResponse,
  DeleteResourceSnapshotJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteResourceSnapshotJobRequest,
  output: DeleteResourceSnapshotJobResponse,
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
  operationName: "DeleteResourceSnapshotJob",
}));

export type DisassociateOpportunityError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Allows you to remove an existing association between an `Opportunity` and related entities, such as a Partner Solution, Amazon Web Services product, or an Amazon Web Services Marketplace offer. This operation is the counterpart to `AssociateOpportunity`, and it provides flexibility to manage associations as business needs change.
 *
 * Use this operation to update the associations of an `Opportunity` due to changes in the related entities, or if an association was made in error. Ensuring accurate associations helps maintain clarity and accuracy to track and manage business opportunities. When you replace an entity, first attach the new entity and then disassociate the one to be removed, especially if it's the last remaining entity that's required.
 */
export const disassociateOpportunity: API.OperationMethod<
  DisassociateOpportunityRequest,
  DisassociateOpportunityResponse,
  DisassociateOpportunityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateOpportunityRequest,
  output: DisassociateOpportunityResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateOpportunity",
}));

export type GetAwsOpportunitySummaryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a summary of an AWS Opportunity. This summary includes high-level details about the opportunity sourced from AWS, such as lifecycle information, customer details, and involvement type. It is useful for tracking updates on the AWS opportunity corresponding to an opportunity in the partner's account.
 */
export const getAwsOpportunitySummary: API.OperationMethod<
  GetAwsOpportunitySummaryRequest,
  GetAwsOpportunitySummaryResponse,
  GetAwsOpportunitySummaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAwsOpportunitySummaryRequest,
  output: GetAwsOpportunitySummaryResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAwsOpportunitySummary",
}));

export type GetEngagementError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use this action to retrieve the engagement record for a given `EngagementIdentifier`.
 */
export const getEngagement: API.OperationMethod<
  GetEngagementRequest,
  GetEngagementResponse,
  GetEngagementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEngagementRequest,
  output: GetEngagementResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEngagement",
}));

export type GetEngagementInvitationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of an engagement invitation shared by AWS with a partner. The information includes aspects such as customer, project details, and lifecycle information. To connect an engagement invitation with an opportunity, match the invitation’s `Payload.Project.Title` with opportunity `Project.Title`.
 */
export const getEngagementInvitation: API.OperationMethod<
  GetEngagementInvitationRequest,
  GetEngagementInvitationResponse,
  GetEngagementInvitationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEngagementInvitationRequest,
  output: GetEngagementInvitationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEngagementInvitation",
}));

export type GetOpportunityError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Fetches the `Opportunity` record from Partner Central by a given `Identifier`.
 *
 * Use the `ListOpportunities` action or the event notification (from Amazon EventBridge) to obtain this identifier.
 */
export const getOpportunity: API.OperationMethod<
  GetOpportunityRequest,
  GetOpportunityResponse,
  GetOpportunityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetOpportunityRequest,
  output: GetOpportunityResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOpportunity",
}));

export type GetProspectingFromEngagementTaskError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details and current status of a prospecting task previously started with `StartProspectingFromEngagementTask` to enable polling for completion and access to per-engagement processing results.
 */
export const getProspectingFromEngagementTask: API.OperationMethod<
  GetProspectingFromEngagementTaskRequest,
  GetProspectingFromEngagementTaskResponse,
  GetProspectingFromEngagementTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetProspectingFromEngagementTaskRequest,
  output: GetProspectingFromEngagementTaskResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProspectingFromEngagementTask",
}));

export type GetResourceSnapshotError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use this action to retrieve a specific snapshot record.
 */
export const getResourceSnapshot: API.OperationMethod<
  GetResourceSnapshotRequest,
  GetResourceSnapshotResponse,
  GetResourceSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetResourceSnapshotRequest,
  output: GetResourceSnapshotResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourceSnapshot",
}));

export type GetResourceSnapshotJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use this action to retrieves information about a specific resource snapshot job.
 */
export const getResourceSnapshotJob: API.OperationMethod<
  GetResourceSnapshotJobRequest,
  GetResourceSnapshotJobResponse,
  GetResourceSnapshotJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetResourceSnapshotJobRequest,
  output: GetResourceSnapshotJobResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourceSnapshotJob",
}));

export type GetSellingSystemSettingsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the currently set system settings, which include the IAM Role used for resource snapshot jobs.
 */
export const getSellingSystemSettings: API.OperationMethod<
  GetSellingSystemSettingsRequest,
  GetSellingSystemSettingsResponse,
  GetSellingSystemSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSellingSystemSettingsRequest,
  output: GetSellingSystemSettingsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSellingSystemSettings",
}));

export type ListEngagementByAcceptingInvitationTasksError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all in-progress, completed, or failed StartEngagementByAcceptingInvitationTask tasks that were initiated by the caller's account.
 */
export const listEngagementByAcceptingInvitationTasks: API.PaginatedOperationMethod<
  ListEngagementByAcceptingInvitationTasksRequest,
  ListEngagementByAcceptingInvitationTasksResponse,
  ListEngagementByAcceptingInvitationTasksError,
  Credentials | HttpClient.HttpClient,
  ListEngagementByAcceptingInvitationTaskSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEngagementByAcceptingInvitationTasksRequest,
  output: ListEngagementByAcceptingInvitationTasksResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEngagementByAcceptingInvitationTasks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TaskSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListEngagementFromOpportunityTasksError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all in-progress, completed, or failed `EngagementFromOpportunity` tasks that were initiated by the caller's account.
 */
export const listEngagementFromOpportunityTasks: API.PaginatedOperationMethod<
  ListEngagementFromOpportunityTasksRequest,
  ListEngagementFromOpportunityTasksResponse,
  ListEngagementFromOpportunityTasksError,
  Credentials | HttpClient.HttpClient,
  ListEngagementFromOpportunityTaskSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEngagementFromOpportunityTasksRequest,
  output: ListEngagementFromOpportunityTasksResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEngagementFromOpportunityTasks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TaskSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListEngagementInvitationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of engagement invitations sent to the partner. This allows partners to view all pending or past engagement invitations, helping them track opportunities shared by AWS.
 */
export const listEngagementInvitations: API.PaginatedOperationMethod<
  ListEngagementInvitationsRequest,
  ListEngagementInvitationsResponse,
  ListEngagementInvitationsError,
  Credentials | HttpClient.HttpClient,
  EngagementInvitationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEngagementInvitationsRequest,
  output: ListEngagementInvitationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEngagementInvitations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EngagementInvitationSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListEngagementMembersError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of member partners in an Engagement. This operation can only be invoked by members of the Engagement. The `ListEngagementMembers` operation allows you to fetch information about the members of a specific Engagement. This action is restricted to members of the Engagement being queried.
 */
export const listEngagementMembers: API.PaginatedOperationMethod<
  ListEngagementMembersRequest,
  ListEngagementMembersResponse,
  ListEngagementMembersError,
  Credentials | HttpClient.HttpClient,
  EngagementMember
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEngagementMembersRequest,
  output: ListEngagementMembersResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEngagementMembers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EngagementMemberList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListEngagementResourceAssociationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the associations between resources and engagements where the caller is a member and has at least one snapshot in the engagement.
 */
export const listEngagementResourceAssociations: API.PaginatedOperationMethod<
  ListEngagementResourceAssociationsRequest,
  ListEngagementResourceAssociationsResponse,
  ListEngagementResourceAssociationsError,
  Credentials | HttpClient.HttpClient,
  EngagementResourceAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEngagementResourceAssociationsRequest,
  output: ListEngagementResourceAssociationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEngagementResourceAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EngagementResourceAssociationSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListEngagementsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This action allows users to retrieve a list of Engagement records from Partner Central. This action can be used to manage and track various engagements across different stages of the partner selling process.
 */
export const listEngagements: API.PaginatedOperationMethod<
  ListEngagementsRequest,
  ListEngagementsResponse,
  ListEngagementsError,
  Credentials | HttpClient.HttpClient,
  EngagementSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEngagementsRequest,
  output: ListEngagementsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEngagements",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EngagementSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListOpportunitiesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This request accepts a list of filters that retrieve opportunity subsets as well as sort options. This feature is available to partners from Partner Central using the `ListOpportunities` API action.
 *
 * To synchronize your system with Amazon Web Services, list only the opportunities that were newly created or updated. We recommend you rely on events emitted by the service into your Amazon Web Services account’s Amazon EventBridge default event bus. You can also use the `ListOpportunities` action.
 *
 * We recommend the following approach:
 *
 * - Find the latest `LastModifiedDate` that you stored, and only use the values that came from Amazon Web Services. Don’t use values generated by your system.
 *
 * - When you send a `ListOpportunities` request, submit the date in ISO 8601 format in the `AfterLastModifiedDate` filter.
 *
 * - Amazon Web Services only returns opportunities created or updated on or after that date and time. Use `NextToken` to iterate over all pages.
 */
export const listOpportunities: API.PaginatedOperationMethod<
  ListOpportunitiesRequest,
  ListOpportunitiesResponse,
  ListOpportunitiesError,
  Credentials | HttpClient.HttpClient,
  OpportunitySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListOpportunitiesRequest,
  output: ListOpportunitiesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOpportunities",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "OpportunitySummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListOpportunityFromEngagementTasksError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all in-progress, completed, or failed opportunity creation tasks from engagements that were initiated by the caller's account.
 */
export const listOpportunityFromEngagementTasks: API.PaginatedOperationMethod<
  ListOpportunityFromEngagementTasksRequest,
  ListOpportunityFromEngagementTasksResponse,
  ListOpportunityFromEngagementTasksError,
  Credentials | HttpClient.HttpClient,
  ListOpportunityFromEngagementTaskSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListOpportunityFromEngagementTasksRequest,
  output: ListOpportunityFromEngagementTasksResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOpportunityFromEngagementTasks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TaskSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListProspectingFromEngagementTasksError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all prospecting tasks initiated by the caller's account. Supports optional filters by task identifier, task name, or start time range. Results can be sorted using configurable options. The response is paginated. Use the `NextToken` value from each response to retrieve subsequent pages.
 */
export const listProspectingFromEngagementTasks: API.PaginatedOperationMethod<
  ListProspectingFromEngagementTasksRequest,
  ListProspectingFromEngagementTasksResponse,
  ListProspectingFromEngagementTasksError,
  Credentials | HttpClient.HttpClient,
  ProspectingTaskSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListProspectingFromEngagementTasksRequest,
  output: ListProspectingFromEngagementTasksResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProspectingFromEngagementTasks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TaskSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListResourceSnapshotJobsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists resource snapshot jobs owned by the customer. This operation supports various filtering scenarios, including listing all jobs owned by the caller, jobs for a specific engagement, jobs with a specific status, or any combination of these filters.
 */
export const listResourceSnapshotJobs: API.PaginatedOperationMethod<
  ListResourceSnapshotJobsRequest,
  ListResourceSnapshotJobsResponse,
  ListResourceSnapshotJobsError,
  Credentials | HttpClient.HttpClient,
  ResourceSnapshotJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListResourceSnapshotJobsRequest,
  output: ListResourceSnapshotJobsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceSnapshotJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ResourceSnapshotJobSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListResourceSnapshotsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of resource view snapshots based on specified criteria. This operation supports various use cases, including:
 *
 * - Fetching all snapshots associated with an engagement.
 *
 * - Retrieving snapshots of a specific resource type within an engagement.
 *
 * - Obtaining snapshots for a particular resource using a specified template.
 *
 * - Accessing the latest snapshot of a resource within an engagement.
 *
 * - Filtering snapshots by resource owner.
 */
export const listResourceSnapshots: API.PaginatedOperationMethod<
  ListResourceSnapshotsRequest,
  ListResourceSnapshotsResponse,
  ListResourceSnapshotsError,
  Credentials | HttpClient.HttpClient,
  ResourceSnapshotSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListResourceSnapshotsRequest,
  output: ListResourceSnapshotsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceSnapshots",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ResourceSnapshotSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSolutionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of Partner Solutions that the partner registered on Partner Central. This API is used to generate a list of solutions that an end user selects from for association with an opportunity.
 */
export const listSolutions: API.PaginatedOperationMethod<
  ListSolutionsRequest,
  ListSolutionsResponse,
  ListSolutionsError,
  Credentials | HttpClient.HttpClient,
  SolutionBase
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSolutionsRequest,
  output: ListSolutionsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSolutions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SolutionSummaries",
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
 * Returns a list of tags for a resource.
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

export type PutSellingSystemSettingsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the currently set system settings, which include the IAM Role used for resource snapshot jobs.
 */
export const putSellingSystemSettings: API.OperationMethod<
  PutSellingSystemSettingsRequest,
  PutSellingSystemSettingsResponse,
  PutSellingSystemSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutSellingSystemSettingsRequest,
  output: PutSellingSystemSettingsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutSellingSystemSettings",
}));

export type RejectEngagementInvitationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This action rejects an `EngagementInvitation` that AWS shared. Rejecting an invitation indicates that the partner doesn't want to pursue the opportunity, and all related data will become inaccessible thereafter.
 */
export const rejectEngagementInvitation: API.OperationMethod<
  RejectEngagementInvitationRequest,
  RejectEngagementInvitationResponse,
  RejectEngagementInvitationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RejectEngagementInvitationRequest,
  output: RejectEngagementInvitationResponse,
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
  operationName: "RejectEngagementInvitation",
}));

export type StartEngagementByAcceptingInvitationTaskError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This action starts the engagement by accepting an `EngagementInvitation`. The task is asynchronous and involves the following steps: accepting the invitation, creating an opportunity in the partner’s account from the AWS opportunity, and copying details for tracking. When completed, an `Opportunity Created` event is generated, indicating that the opportunity has been successfully created in the partner's account.
 */
export const startEngagementByAcceptingInvitationTask: API.OperationMethod<
  StartEngagementByAcceptingInvitationTaskRequest,
  StartEngagementByAcceptingInvitationTaskResponse,
  StartEngagementByAcceptingInvitationTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartEngagementByAcceptingInvitationTaskRequest,
  output: StartEngagementByAcceptingInvitationTaskResponse,
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
  operationName: "StartEngagementByAcceptingInvitationTask",
}));

export type StartEngagementFromOpportunityTaskError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Similar to `StartEngagementByAcceptingInvitationTask`, this action is asynchronous and performs multiple steps before completion. This action orchestrates a comprehensive workflow that combines multiple API operations into a single task to create and initiate an engagement from an existing opportunity. It automatically executes a sequence of operations including `GetOpportunity`, `CreateEngagement` (if it doesn't exist), `CreateResourceSnapshot`, `CreateResourceSnapshotJob`, `CreateEngagementInvitation` (if not already invited/accepted), and `SubmitOpportunity`.
 */
export const startEngagementFromOpportunityTask: API.OperationMethod<
  StartEngagementFromOpportunityTaskRequest,
  StartEngagementFromOpportunityTaskResponse,
  StartEngagementFromOpportunityTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartEngagementFromOpportunityTaskRequest,
  output: StartEngagementFromOpportunityTaskResponse,
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
  operationName: "StartEngagementFromOpportunityTask",
}));

export type StartOpportunityFromEngagementTaskError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This action creates an opportunity from an existing engagement context. The task is asynchronous and orchestrates the process of converting engagement contextual information into a structured opportunity record within the partner's account.
 */
export const startOpportunityFromEngagementTask: API.OperationMethod<
  StartOpportunityFromEngagementTaskRequest,
  StartOpportunityFromEngagementTaskResponse,
  StartOpportunityFromEngagementTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartOpportunityFromEngagementTaskRequest,
  output: StartOpportunityFromEngagementTaskResponse,
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
  operationName: "StartOpportunityFromEngagementTask",
}));

export type StartProspectingFromEngagementTaskError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a task to convert one or more engagement contexts into new prospecting leads. The task runs asynchronously. To poll for status, use `GetProspectingFromEngagementTask`, or use `ListProspectingFromEngagementTasks` to monitor multiple tasks.
 */
export const startProspectingFromEngagementTask: API.OperationMethod<
  StartProspectingFromEngagementTaskRequest,
  StartProspectingFromEngagementTaskResponse,
  StartProspectingFromEngagementTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartProspectingFromEngagementTaskRequest,
  output: StartProspectingFromEngagementTaskResponse,
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
  operationName: "StartProspectingFromEngagementTask",
}));

export type StartResourceSnapshotJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a resource snapshot job that has been previously created.
 */
export const startResourceSnapshotJob: API.OperationMethod<
  StartResourceSnapshotJobRequest,
  StartResourceSnapshotJobResponse,
  StartResourceSnapshotJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartResourceSnapshotJobRequest,
  output: StartResourceSnapshotJobResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartResourceSnapshotJob",
}));

export type StopResourceSnapshotJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops a resource snapshot job. The job must be started prior to being stopped.
 */
export const stopResourceSnapshotJob: API.OperationMethod<
  StopResourceSnapshotJobRequest,
  StopResourceSnapshotJobResponse,
  StopResourceSnapshotJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopResourceSnapshotJobRequest,
  output: StopResourceSnapshotJobResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopResourceSnapshotJob",
}));

export type SubmitOpportunityError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use this action to submit an Opportunity that was previously created by partner for AWS review. After you perform this action, the Opportunity becomes non-editable until it is reviewed by AWS and has ` LifeCycle.ReviewStatus ` as either `Approved` or `Action Required`.
 */
export const submitOpportunity: API.OperationMethod<
  SubmitOpportunityRequest,
  SubmitOpportunityResponse,
  SubmitOpportunityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SubmitOpportunityRequest,
  output: SubmitOpportunityResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SubmitOpportunity",
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
 * Assigns one or more tags (key-value pairs) to the specified resource.
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
 * Removes a tag or tags from a resource.
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

export type UpdateEngagementContextError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the context information for an existing engagement with new or modified data.
 */
export const updateEngagementContext: API.OperationMethod<
  UpdateEngagementContextRequest,
  UpdateEngagementContextResponse,
  UpdateEngagementContextError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateEngagementContextRequest,
  output: UpdateEngagementContextResponse,
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
  operationName: "UpdateEngagementContext",
}));

export type UpdateOpportunityError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the `Opportunity` record identified by a given `Identifier`. This operation allows you to modify the details of an existing opportunity to reflect the latest information and progress. Use this action to keep the opportunity record up-to-date and accurate.
 *
 * When you perform updates, include the entire payload with each request. If any field is omitted, the API assumes that the field is set to `null`. The best practice is to always perform a `GetOpportunity` to retrieve the latest values, then send the complete payload with the updated values to be changed.
 */
export const updateOpportunity: API.OperationMethod<
  UpdateOpportunityRequest,
  UpdateOpportunityResponse,
  UpdateOpportunityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateOpportunityRequest,
  output: UpdateOpportunityResponse,
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
  operationName: "UpdateOpportunity",
}));
