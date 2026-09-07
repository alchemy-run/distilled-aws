import * as HttpClient from "effect/unstable/http/HttpClient";
import * as S from "@distilled.cloud/core/schema";
import * as API from "@distilled.cloud/core/api";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const ns = T.XmlNamespace("http://support.amazonaws.com/doc/2013-04-15/");
const svc = T.AwsApiService({
  sdkId: "Support",
  serviceShapeName: "AWSSupport_20130415",
});
const auth = T.AwsAuthSigv4({ name: "support" });
const ver = T.ServiceVersion("2013-04-15");
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
  const _p0 = () => ({
    authSchemes: [
      { name: "sigv4", signingName: "support", signingRegion: "us-gov-west-1" },
    ],
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
            "https://support.us-east-1.amazonaws.com",
            {
              authSchemes: [
                {
                  name: "sigv4",
                  signingName: "support",
                  signingRegion: "us-east-1",
                },
              ],
            },
            {},
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-cn" &&
          UseFIPS === false &&
          UseDualStack === false
        ) {
          return e(
            "https://support.cn-north-1.amazonaws.com.cn",
            {
              authSchemes: [
                {
                  name: "sigv4",
                  signingName: "support",
                  signingRegion: "cn-north-1",
                },
              ],
            },
            {},
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
          UseFIPS === false &&
          UseDualStack === false
        ) {
          return e("https://support.us-gov-west-1.amazonaws.com", _p0(), {});
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
          UseFIPS === true &&
          UseDualStack === false
        ) {
          return e("https://support.us-gov-west-1.amazonaws.com", _p0(), {});
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-iso" &&
          UseFIPS === false &&
          UseDualStack === false
        ) {
          return e(
            "https://support.us-iso-east-1.c2s.ic.gov",
            {
              authSchemes: [
                {
                  name: "sigv4",
                  signingName: "support",
                  signingRegion: "us-iso-east-1",
                },
              ],
            },
            {},
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-iso-b" &&
          UseFIPS === false &&
          UseDualStack === false
        ) {
          return e(
            "https://support.us-isob-east-1.sc2s.sgov.gov",
            {
              authSchemes: [
                {
                  name: "sigv4",
                  signingName: "support",
                  signingRegion: "us-isob-east-1",
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
              `https://support-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://support-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://support.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://support.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class AttachmentIdNotFound
  extends /*@__PURE__*/ S.TaggedError<AttachmentIdNotFound>()(
    "AttachmentIdNotFound",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class AttachmentLimitExceeded
  extends /*@__PURE__*/ S.TaggedError<AttachmentLimitExceeded>()(
    "AttachmentLimitExceeded",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withThrottlingError) {}
export class AttachmentSetExpired
  extends /*@__PURE__*/ S.TaggedError<AttachmentSetExpired>()(
    "AttachmentSetExpired",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class AttachmentSetIdNotFound
  extends /*@__PURE__*/ S.TaggedError<AttachmentSetIdNotFound>()(
    "AttachmentSetIdNotFound",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class AttachmentSetSizeLimitExceeded
  extends /*@__PURE__*/ S.TaggedError<AttachmentSetSizeLimitExceeded>()(
    "AttachmentSetSizeLimitExceeded",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withThrottlingError) {}
export class CaseCreationLimitExceeded
  extends /*@__PURE__*/ S.TaggedError<CaseCreationLimitExceeded>()(
    "CaseCreationLimitExceeded",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withThrottlingError) {}
export class CaseIdNotFound
  extends /*@__PURE__*/ S.TaggedError<CaseIdNotFound>()("CaseIdNotFound", {
    message: S.optional(S.String).pipe(T.ErrorMessage()),
  }) {}
export class DescribeAttachmentLimitExceeded
  extends /*@__PURE__*/ S.TaggedError<DescribeAttachmentLimitExceeded>()(
    "DescribeAttachmentLimitExceeded",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withThrottlingError) {}
export class InternalServerError
  extends /*@__PURE__*/ S.TaggedError<InternalServerError>()(
    "InternalServerError",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "Throttling", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export type AttachmentSetId = string;
export type FileName = string;
export type Data = Uint8Array;
export interface Attachment {
  fileName?: string;
  data?: Uint8Array;
}
export const Attachment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ fileName: S.optional(S.String), data: S.optional(T.Blob) }),
).annotate({ identifier: "Attachment" }) as any as S.Schema<Attachment>;
export type Attachments = Attachment[];
export const Attachments = /*@__PURE__*/ S.Array(Attachment);
export interface AddAttachmentsToSetRequest {
  attachmentSetId?: string;
  attachments: Attachment[];
}
export const AddAttachmentsToSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    attachmentSetId: S.optional(S.String),
    attachments: Attachments,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AddAttachmentsToSetRequest",
}) as any as S.Schema<AddAttachmentsToSetRequest>;
export type ExpiryTime = string;
export interface AddAttachmentsToSetResponse {
  attachmentSetId?: string;
  expiryTime?: string;
}
export const AddAttachmentsToSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    attachmentSetId: S.optional(S.String),
    expiryTime: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "AddAttachmentsToSetResponse",
}) as any as S.Schema<AddAttachmentsToSetResponse>;
export type CaseId = string;
export type CommunicationBody = string;
export type CcEmailAddress = string;
export type CcEmailAddressList = string[];
export const CcEmailAddressList = /*@__PURE__*/ S.Array(S.String);
export interface AddCommunicationToCaseRequest {
  caseId?: string;
  communicationBody: string;
  ccEmailAddresses?: string[];
  attachmentSetId?: string;
}
export const AddCommunicationToCaseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    caseId: S.optional(S.String),
    communicationBody: S.String,
    ccEmailAddresses: S.optional(CcEmailAddressList),
    attachmentSetId: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AddCommunicationToCaseRequest",
}) as any as S.Schema<AddCommunicationToCaseRequest>;
export type Result = boolean;
export interface AddCommunicationToCaseResponse {
  result?: boolean;
}
export const AddCommunicationToCaseResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ result: S.optional(S.Boolean) }).pipe(ns),
).annotate({
  identifier: "AddCommunicationToCaseResponse",
}) as any as S.Schema<AddCommunicationToCaseResponse>;
export type Subject = string;
export type ServiceCode2 = string;
export type SeverityCode = string;
export type CategoryCode = string;
export type Language = string;
export type IssueType = string;
export interface CreateCaseRequest {
  subject: string;
  serviceCode?: string;
  severityCode?: string;
  categoryCode?: string;
  communicationBody: string;
  ccEmailAddresses?: string[];
  language?: string;
  issueType?: string;
  attachmentSetId?: string;
}
export const CreateCaseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    subject: S.String,
    serviceCode: S.optional(S.String),
    severityCode: S.optional(S.String),
    categoryCode: S.optional(S.String),
    communicationBody: S.String,
    ccEmailAddresses: S.optional(CcEmailAddressList),
    language: S.optional(S.String),
    issueType: S.optional(S.String),
    attachmentSetId: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateCaseRequest",
}) as any as S.Schema<CreateCaseRequest>;
export interface CreateCaseResponse {
  caseId?: string;
}
export const CreateCaseResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ caseId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "CreateCaseResponse",
}) as any as S.Schema<CreateCaseResponse>;
export type AttachmentId = string;
export interface DescribeAttachmentRequest {
  attachmentId: string;
}
export const DescribeAttachmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ attachmentId: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeAttachmentRequest",
}) as any as S.Schema<DescribeAttachmentRequest>;
export interface DescribeAttachmentResponse {
  attachment?: Attachment;
}
export const DescribeAttachmentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ attachment: S.optional(Attachment) }).pipe(ns),
).annotate({
  identifier: "DescribeAttachmentResponse",
}) as any as S.Schema<DescribeAttachmentResponse>;
export type CaseIdList = string[];
export const CaseIdList = /*@__PURE__*/ S.Array(S.String);
export type DisplayId = string;
export type AfterTime = string;
export type BeforeTime = string;
export type IncludeResolvedCases = boolean;
export type NextToken = string;
export type MaxResults = number;
export type IncludeCommunications = boolean;
export interface DescribeCasesRequest {
  caseIdList?: string[];
  displayId?: string;
  afterTime?: string;
  beforeTime?: string;
  includeResolvedCases?: boolean;
  nextToken?: string;
  maxResults?: number;
  language?: string;
  includeCommunications?: boolean;
}
export const DescribeCasesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    caseIdList: S.optional(CaseIdList),
    displayId: S.optional(S.String),
    afterTime: S.optional(S.String),
    beforeTime: S.optional(S.String),
    includeResolvedCases: S.optional(S.Boolean),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
    language: S.optional(S.String),
    includeCommunications: S.optional(S.Boolean),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeCasesRequest",
}) as any as S.Schema<DescribeCasesRequest>;
export type Status = string;
export type ServiceCode = string;
export type SubmittedBy = string;
export type TimeCreated = string;
export type ValidatedCommunicationBody = string;
export interface AttachmentDetails {
  attachmentId?: string;
  fileName?: string;
}
export const AttachmentDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    attachmentId: S.optional(S.String),
    fileName: S.optional(S.String),
  }),
).annotate({
  identifier: "AttachmentDetails",
}) as any as S.Schema<AttachmentDetails>;
export type AttachmentSet = AttachmentDetails[];
export const AttachmentSet = /*@__PURE__*/ S.Array(AttachmentDetails);
export interface Communication {
  caseId?: string;
  body?: string;
  submittedBy?: string;
  timeCreated?: string;
  attachmentSet?: AttachmentDetails[];
}
export const Communication = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    caseId: S.optional(S.String),
    body: S.optional(S.String),
    submittedBy: S.optional(S.String),
    timeCreated: S.optional(S.String),
    attachmentSet: S.optional(AttachmentSet),
  }),
).annotate({ identifier: "Communication" }) as any as S.Schema<Communication>;
export type CommunicationList = Communication[];
export const CommunicationList = /*@__PURE__*/ S.Array(Communication);
export interface RecentCaseCommunications {
  communications?: Communication[];
  nextToken?: string;
}
export const RecentCaseCommunications = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    communications: S.optional(CommunicationList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "RecentCaseCommunications",
}) as any as S.Schema<RecentCaseCommunications>;
export interface CaseDetails {
  caseId?: string;
  displayId?: string;
  subject?: string;
  status?: string;
  serviceCode?: string;
  categoryCode?: string;
  severityCode?: string;
  submittedBy?: string;
  timeCreated?: string;
  recentCommunications?: RecentCaseCommunications;
  ccEmailAddresses?: string[];
  language?: string;
}
export const CaseDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    caseId: S.optional(S.String),
    displayId: S.optional(S.String),
    subject: S.optional(S.String),
    status: S.optional(S.String),
    serviceCode: S.optional(S.String),
    categoryCode: S.optional(S.String),
    severityCode: S.optional(S.String),
    submittedBy: S.optional(S.String),
    timeCreated: S.optional(S.String),
    recentCommunications: S.optional(RecentCaseCommunications),
    ccEmailAddresses: S.optional(CcEmailAddressList),
    language: S.optional(S.String),
  }),
).annotate({ identifier: "CaseDetails" }) as any as S.Schema<CaseDetails>;
export type CaseList = CaseDetails[];
export const CaseList = /*@__PURE__*/ S.Array(CaseDetails);
export interface DescribeCasesResponse {
  cases?: CaseDetails[];
  nextToken?: string;
}
export const DescribeCasesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cases: S.optional(CaseList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeCasesResponse",
}) as any as S.Schema<DescribeCasesResponse>;
export interface DescribeCommunicationsRequest {
  caseId: string;
  beforeTime?: string;
  afterTime?: string;
  nextToken?: string;
  maxResults?: number;
}
export const DescribeCommunicationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    caseId: S.String,
    beforeTime: S.optional(S.String),
    afterTime: S.optional(S.String),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeCommunicationsRequest",
}) as any as S.Schema<DescribeCommunicationsRequest>;
export interface DescribeCommunicationsResponse {
  communications?: Communication[];
  nextToken?: string;
}
export const DescribeCommunicationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    communications: S.optional(CommunicationList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeCommunicationsResponse",
}) as any as S.Schema<DescribeCommunicationsResponse>;
export interface DescribeCreateCaseOptionsRequest {
  issueType: string;
  serviceCode: string;
  language: string;
  categoryCode: string;
}
export const DescribeCreateCaseOptionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    issueType: S.String,
    serviceCode: S.String,
    language: S.String,
    categoryCode: S.String,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeCreateCaseOptionsRequest",
}) as any as S.Schema<DescribeCreateCaseOptionsRequest>;
export type ValidatedLanguageAvailability = string;
export type Type = string;
export type StartTime = string;
export type EndTime = string;
export interface SupportedHour {
  startTime?: string;
  endTime?: string;
}
export const SupportedHour = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ startTime: S.optional(S.String), endTime: S.optional(S.String) }),
).annotate({ identifier: "SupportedHour" }) as any as S.Schema<SupportedHour>;
export type SupportedHoursList = SupportedHour[];
export const SupportedHoursList = /*@__PURE__*/ S.Array(SupportedHour);
export type ValidatedDateTime = string;
export interface DateInterval {
  startDateTime?: string;
  endDateTime?: string;
}
export const DateInterval = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    startDateTime: S.optional(S.String),
    endDateTime: S.optional(S.String),
  }),
).annotate({ identifier: "DateInterval" }) as any as S.Schema<DateInterval>;
export type DatesWithoutSupportList = DateInterval[];
export const DatesWithoutSupportList = /*@__PURE__*/ S.Array(DateInterval);
export interface CommunicationTypeOptions {
  type?: string;
  supportedHours?: SupportedHour[];
  datesWithoutSupport?: DateInterval[];
}
export const CommunicationTypeOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(S.String),
    supportedHours: S.optional(SupportedHoursList),
    datesWithoutSupport: S.optional(DatesWithoutSupportList),
  }),
).annotate({
  identifier: "CommunicationTypeOptions",
}) as any as S.Schema<CommunicationTypeOptions>;
export type CommunicationTypeOptionsList = CommunicationTypeOptions[];
export const CommunicationTypeOptionsList = /*@__PURE__*/ S.Array(
  CommunicationTypeOptions,
);
export interface DescribeCreateCaseOptionsResponse {
  languageAvailability?: string;
  communicationTypes?: CommunicationTypeOptions[];
}
export const DescribeCreateCaseOptionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    languageAvailability: S.optional(S.String),
    communicationTypes: S.optional(CommunicationTypeOptionsList),
  }).pipe(ns),
).annotate({
  identifier: "DescribeCreateCaseOptionsResponse",
}) as any as S.Schema<DescribeCreateCaseOptionsResponse>;
export type ServiceCodeList = string[];
export const ServiceCodeList = /*@__PURE__*/ S.Array(S.String);
export interface DescribeServicesRequest {
  serviceCodeList?: string[];
  language?: string;
}
export const DescribeServicesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceCodeList: S.optional(ServiceCodeList),
    language: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeServicesRequest",
}) as any as S.Schema<DescribeServicesRequest>;
export type ServiceName = string;
export type CategoryName = string;
export interface Category {
  code?: string;
  name?: string;
}
export const Category = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ code: S.optional(S.String), name: S.optional(S.String) }),
).annotate({ identifier: "Category" }) as any as S.Schema<Category>;
export type CategoryList = Category[];
export const CategoryList = /*@__PURE__*/ S.Array(Category);
export interface Service {
  code?: string;
  name?: string;
  categories?: Category[];
}
export const Service = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    code: S.optional(S.String),
    name: S.optional(S.String),
    categories: S.optional(CategoryList),
  }),
).annotate({ identifier: "Service" }) as any as S.Schema<Service>;
export type ServiceList = Service[];
export const ServiceList = /*@__PURE__*/ S.Array(Service);
export interface DescribeServicesResponse {
  services?: Service[];
}
export const DescribeServicesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ services: S.optional(ServiceList) }).pipe(ns),
).annotate({
  identifier: "DescribeServicesResponse",
}) as any as S.Schema<DescribeServicesResponse>;
export interface DescribeSeverityLevelsRequest {
  language?: string;
}
export const DescribeSeverityLevelsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ language: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeSeverityLevelsRequest",
}) as any as S.Schema<DescribeSeverityLevelsRequest>;
export type SeverityLevelCode = string;
export type SeverityLevelName = string;
export interface SeverityLevel {
  code?: string;
  name?: string;
}
export const SeverityLevel = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ code: S.optional(S.String), name: S.optional(S.String) }),
).annotate({ identifier: "SeverityLevel" }) as any as S.Schema<SeverityLevel>;
export type SeverityLevelsList = SeverityLevel[];
export const SeverityLevelsList = /*@__PURE__*/ S.Array(SeverityLevel);
export interface DescribeSeverityLevelsResponse {
  severityLevels?: SeverityLevel[];
}
export const DescribeSeverityLevelsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ severityLevels: S.optional(SeverityLevelsList) }).pipe(ns),
).annotate({
  identifier: "DescribeSeverityLevelsResponse",
}) as any as S.Schema<DescribeSeverityLevelsResponse>;
export type ValidatedIssueTypeString = string;
export type ValidatedServiceCode = string;
export type ValidatedCategoryCode = string;
export interface DescribeSupportedLanguagesRequest {
  issueType: string;
  serviceCode: string;
  categoryCode: string;
}
export const DescribeSupportedLanguagesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    issueType: S.String,
    serviceCode: S.String,
    categoryCode: S.String,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeSupportedLanguagesRequest",
}) as any as S.Schema<DescribeSupportedLanguagesRequest>;
export type Code = string;
export type Display = string;
export interface SupportedLanguage {
  code?: string;
  language?: string;
  display?: string;
}
export const SupportedLanguage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    code: S.optional(S.String),
    language: S.optional(S.String),
    display: S.optional(S.String),
  }),
).annotate({
  identifier: "SupportedLanguage",
}) as any as S.Schema<SupportedLanguage>;
export type SupportedLanguagesList = SupportedLanguage[];
export const SupportedLanguagesList = /*@__PURE__*/ S.Array(SupportedLanguage);
export interface DescribeSupportedLanguagesResponse {
  supportedLanguages?: SupportedLanguage[];
}
export const DescribeSupportedLanguagesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ supportedLanguages: S.optional(SupportedLanguagesList) }).pipe(ns),
).annotate({
  identifier: "DescribeSupportedLanguagesResponse",
}) as any as S.Schema<DescribeSupportedLanguagesResponse>;
export type StringList = string[];
export const StringList = /*@__PURE__*/ S.Array(S.String).pipe(T.Sparse());
export interface DescribeTrustedAdvisorCheckRefreshStatusesRequest {
  checkIds: string[];
}
export const DescribeTrustedAdvisorCheckRefreshStatusesRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ checkIds: StringList }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DescribeTrustedAdvisorCheckRefreshStatusesRequest",
  }) as any as S.Schema<DescribeTrustedAdvisorCheckRefreshStatusesRequest>;
export interface TrustedAdvisorCheckRefreshStatus {
  checkId: string;
  status: string;
  millisUntilNextRefreshable: number;
}
export const TrustedAdvisorCheckRefreshStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    checkId: S.String,
    status: S.String,
    millisUntilNextRefreshable: S.Number,
  }),
).annotate({
  identifier: "TrustedAdvisorCheckRefreshStatus",
}) as any as S.Schema<TrustedAdvisorCheckRefreshStatus>;
export type TrustedAdvisorCheckRefreshStatusList =
  TrustedAdvisorCheckRefreshStatus[];
export const TrustedAdvisorCheckRefreshStatusList = /*@__PURE__*/ S.Array(
  TrustedAdvisorCheckRefreshStatus,
);
export interface DescribeTrustedAdvisorCheckRefreshStatusesResponse {
  statuses: TrustedAdvisorCheckRefreshStatus[];
}
export const DescribeTrustedAdvisorCheckRefreshStatusesResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ statuses: TrustedAdvisorCheckRefreshStatusList }).pipe(ns),
  ).annotate({
    identifier: "DescribeTrustedAdvisorCheckRefreshStatusesResponse",
  }) as any as S.Schema<DescribeTrustedAdvisorCheckRefreshStatusesResponse>;
export interface DescribeTrustedAdvisorCheckResultRequest {
  checkId: string;
  language?: string;
}
export const DescribeTrustedAdvisorCheckResultRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ checkId: S.String, language: S.optional(S.String) }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeTrustedAdvisorCheckResultRequest",
}) as any as S.Schema<DescribeTrustedAdvisorCheckResultRequest>;
export interface TrustedAdvisorResourcesSummary {
  resourcesProcessed: number;
  resourcesFlagged: number;
  resourcesIgnored: number;
  resourcesSuppressed: number;
}
export const TrustedAdvisorResourcesSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourcesProcessed: S.Number,
    resourcesFlagged: S.Number,
    resourcesIgnored: S.Number,
    resourcesSuppressed: S.Number,
  }),
).annotate({
  identifier: "TrustedAdvisorResourcesSummary",
}) as any as S.Schema<TrustedAdvisorResourcesSummary>;
export interface TrustedAdvisorCostOptimizingSummary {
  estimatedMonthlySavings: number;
  estimatedPercentMonthlySavings: number;
}
export const TrustedAdvisorCostOptimizingSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    estimatedMonthlySavings: S.Number,
    estimatedPercentMonthlySavings: S.Number,
  }),
).annotate({
  identifier: "TrustedAdvisorCostOptimizingSummary",
}) as any as S.Schema<TrustedAdvisorCostOptimizingSummary>;
export interface TrustedAdvisorCategorySpecificSummary {
  costOptimizing?: TrustedAdvisorCostOptimizingSummary;
}
export const TrustedAdvisorCategorySpecificSummary = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      costOptimizing: S.optional(TrustedAdvisorCostOptimizingSummary),
    }),
).annotate({
  identifier: "TrustedAdvisorCategorySpecificSummary",
}) as any as S.Schema<TrustedAdvisorCategorySpecificSummary>;
export interface TrustedAdvisorResourceDetail {
  status: string;
  region?: string;
  resourceId: string;
  isSuppressed?: boolean;
  metadata: string[];
}
export const TrustedAdvisorResourceDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.String,
    region: S.optional(S.String),
    resourceId: S.String,
    isSuppressed: S.optional(S.Boolean),
    metadata: StringList,
  }),
).annotate({
  identifier: "TrustedAdvisorResourceDetail",
}) as any as S.Schema<TrustedAdvisorResourceDetail>;
export type TrustedAdvisorResourceDetailList = TrustedAdvisorResourceDetail[];
export const TrustedAdvisorResourceDetailList = /*@__PURE__*/ S.Array(
  TrustedAdvisorResourceDetail,
);
export interface TrustedAdvisorCheckResult {
  checkId: string;
  timestamp: string;
  status: string;
  resourcesSummary: TrustedAdvisorResourcesSummary;
  categorySpecificSummary: TrustedAdvisorCategorySpecificSummary;
  flaggedResources: TrustedAdvisorResourceDetail[];
}
export const TrustedAdvisorCheckResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    checkId: S.String,
    timestamp: S.String,
    status: S.String,
    resourcesSummary: TrustedAdvisorResourcesSummary,
    categorySpecificSummary: TrustedAdvisorCategorySpecificSummary,
    flaggedResources: TrustedAdvisorResourceDetailList,
  }),
).annotate({
  identifier: "TrustedAdvisorCheckResult",
}) as any as S.Schema<TrustedAdvisorCheckResult>;
export interface DescribeTrustedAdvisorCheckResultResponse {
  result?: TrustedAdvisorCheckResult;
}
export const DescribeTrustedAdvisorCheckResultResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ result: S.optional(TrustedAdvisorCheckResult) }).pipe(ns),
  ).annotate({
    identifier: "DescribeTrustedAdvisorCheckResultResponse",
  }) as any as S.Schema<DescribeTrustedAdvisorCheckResultResponse>;
export interface DescribeTrustedAdvisorChecksRequest {
  language: string;
}
export const DescribeTrustedAdvisorChecksRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ language: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeTrustedAdvisorChecksRequest",
}) as any as S.Schema<DescribeTrustedAdvisorChecksRequest>;
export interface TrustedAdvisorCheckDescription {
  id: string;
  name: string;
  description: string;
  category: string;
  metadata: string[];
}
export const TrustedAdvisorCheckDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    name: S.String,
    description: S.String,
    category: S.String,
    metadata: StringList,
  }),
).annotate({
  identifier: "TrustedAdvisorCheckDescription",
}) as any as S.Schema<TrustedAdvisorCheckDescription>;
export type TrustedAdvisorCheckList = TrustedAdvisorCheckDescription[];
export const TrustedAdvisorCheckList = /*@__PURE__*/ S.Array(
  TrustedAdvisorCheckDescription,
);
export interface DescribeTrustedAdvisorChecksResponse {
  checks: TrustedAdvisorCheckDescription[];
}
export const DescribeTrustedAdvisorChecksResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ checks: TrustedAdvisorCheckList }).pipe(ns),
).annotate({
  identifier: "DescribeTrustedAdvisorChecksResponse",
}) as any as S.Schema<DescribeTrustedAdvisorChecksResponse>;
export interface DescribeTrustedAdvisorCheckSummariesRequest {
  checkIds: string[];
}
export const DescribeTrustedAdvisorCheckSummariesRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ checkIds: StringList }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DescribeTrustedAdvisorCheckSummariesRequest",
  }) as any as S.Schema<DescribeTrustedAdvisorCheckSummariesRequest>;
export interface TrustedAdvisorCheckSummary {
  checkId: string;
  timestamp: string;
  status: string;
  hasFlaggedResources?: boolean;
  resourcesSummary: TrustedAdvisorResourcesSummary;
  categorySpecificSummary: TrustedAdvisorCategorySpecificSummary;
}
export const TrustedAdvisorCheckSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    checkId: S.String,
    timestamp: S.String,
    status: S.String,
    hasFlaggedResources: S.optional(S.Boolean),
    resourcesSummary: TrustedAdvisorResourcesSummary,
    categorySpecificSummary: TrustedAdvisorCategorySpecificSummary,
  }),
).annotate({
  identifier: "TrustedAdvisorCheckSummary",
}) as any as S.Schema<TrustedAdvisorCheckSummary>;
export type TrustedAdvisorCheckSummaryList = TrustedAdvisorCheckSummary[];
export const TrustedAdvisorCheckSummaryList = /*@__PURE__*/ S.Array(
  TrustedAdvisorCheckSummary,
);
export interface DescribeTrustedAdvisorCheckSummariesResponse {
  summaries: TrustedAdvisorCheckSummary[];
}
export const DescribeTrustedAdvisorCheckSummariesResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ summaries: TrustedAdvisorCheckSummaryList }).pipe(ns),
  ).annotate({
    identifier: "DescribeTrustedAdvisorCheckSummariesResponse",
  }) as any as S.Schema<DescribeTrustedAdvisorCheckSummariesResponse>;
export interface RefreshTrustedAdvisorCheckRequest {
  checkId: string;
}
export const RefreshTrustedAdvisorCheckRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ checkId: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RefreshTrustedAdvisorCheckRequest",
}) as any as S.Schema<RefreshTrustedAdvisorCheckRequest>;
export interface RefreshTrustedAdvisorCheckResponse {
  status: TrustedAdvisorCheckRefreshStatus;
}
export const RefreshTrustedAdvisorCheckResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: TrustedAdvisorCheckRefreshStatus }).pipe(ns),
).annotate({
  identifier: "RefreshTrustedAdvisorCheckResponse",
}) as any as S.Schema<RefreshTrustedAdvisorCheckResponse>;
export interface ResolveCaseRequest {
  caseId?: string;
}
export const ResolveCaseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ caseId: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ResolveCaseRequest",
}) as any as S.Schema<ResolveCaseRequest>;
export type CaseStatus = string;
export interface ResolveCaseResponse {
  initialCaseStatus?: string;
  finalCaseStatus?: string;
}
export const ResolveCaseResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    initialCaseStatus: S.optional(S.String),
    finalCaseStatus: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ResolveCaseResponse",
}) as any as S.Schema<ResolveCaseResponse>;
export type ErrorMessage = string;
export type AvailabilityErrorMessage = string;
export type AddAttachmentsToSetError =
  | AttachmentLimitExceeded
  | AttachmentSetExpired
  | AttachmentSetIdNotFound
  | AttachmentSetSizeLimitExceeded
  | InternalServerError
  | CommonErrors;
/**
 * Adds one or more attachments to an attachment set.
 *
 * An attachment set is a temporary container for attachments that you add to a case or
 * case communication. The set is available for 1 hour after it's created. The
 * `expiryTime` returned in the response is when the set expires.
 *
 * - You must have a Business, Enterprise On-Ramp, or Enterprise Support plan to use the Amazon Web Services Support
 * API.
 *
 * - If you call the Amazon Web Services Support API from an account that doesn't have a
 * Business, Enterprise On-Ramp, or Enterprise Support plan, the
 * `SubscriptionRequiredException` error message appears. For
 * information about changing your support plan, see Amazon Web Services Support.
 */
export const addAttachmentsToSet: API.OperationMethod<
  AddAttachmentsToSetRequest,
  AddAttachmentsToSetResponse,
  AddAttachmentsToSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AddAttachmentsToSetRequest,
  output: AddAttachmentsToSetResponse,
  errors: [
    AttachmentLimitExceeded,
    AttachmentSetExpired,
    AttachmentSetIdNotFound,
    AttachmentSetSizeLimitExceeded,
    InternalServerError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddAttachmentsToSet",
}));

export type AddCommunicationToCaseError =
  | AttachmentSetExpired
  | AttachmentSetIdNotFound
  | CaseIdNotFound
  | InternalServerError
  | CommonErrors;
/**
 * Adds additional customer communication to an Amazon Web Services Support case. Use the `caseId`
 * parameter to identify the case to which to add communication. You can list a set of
 * email addresses to copy on the communication by using the `ccEmailAddresses`
 * parameter. The `communicationBody` value contains the text of the
 * communication.
 *
 * - You must have a Business, Enterprise On-Ramp, or Enterprise Support plan to use the Amazon Web Services Support
 * API.
 *
 * - If you call the Amazon Web Services Support API from an account that doesn't have a
 * Business, Enterprise On-Ramp, or Enterprise Support plan, the
 * `SubscriptionRequiredException` error message appears. For
 * information about changing your support plan, see Amazon Web Services Support.
 */
export const addCommunicationToCase: API.OperationMethod<
  AddCommunicationToCaseRequest,
  AddCommunicationToCaseResponse,
  AddCommunicationToCaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AddCommunicationToCaseRequest,
  output: AddCommunicationToCaseResponse,
  errors: [
    AttachmentSetExpired,
    AttachmentSetIdNotFound,
    CaseIdNotFound,
    InternalServerError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddCommunicationToCase",
}));

export type CreateCaseError =
  | AttachmentSetExpired
  | AttachmentSetIdNotFound
  | CaseCreationLimitExceeded
  | InternalServerError
  | CommonErrors;
/**
 * Creates a case in the Amazon Web Services Support Center. This operation is similar to how you create a case
 * in the Amazon Web Services Support Center Create
 * Case page.
 *
 * The Amazon Web Services Support API doesn't support requesting service limit increases. You can submit a
 * service limit increase in the following ways:
 *
 * - Submit a request from the Amazon Web Services Support Center Create Case page.
 *
 * - Use the Service Quotas RequestServiceQuotaIncrease operation.
 *
 * A successful `CreateCase` request returns an Amazon Web Services Support case number. You can use
 * the DescribeCases operation and specify the case number to get
 * existing Amazon Web Services Support cases. After you create a case, use the AddCommunicationToCase operation to add additional communication or
 * attachments to an existing case.
 *
 * The `caseId` is separate from the `displayId` that appears in
 * the Amazon Web Services Support Center. Use the DescribeCases operation to get the `displayId`.
 *
 * - You must have a Business, Enterprise On-Ramp, or Enterprise Support plan to use the Amazon Web Services Support
 * API.
 *
 * - If you call the Amazon Web Services Support API from an account that doesn't have a
 * Business, Enterprise On-Ramp, or Enterprise Support plan, the
 * `SubscriptionRequiredException` error message appears. For
 * information about changing your support plan, see Amazon Web Services Support.
 */
export const createCase: API.OperationMethod<
  CreateCaseRequest,
  CreateCaseResponse,
  CreateCaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCaseRequest,
  output: CreateCaseResponse,
  errors: [
    AttachmentSetExpired,
    AttachmentSetIdNotFound,
    CaseCreationLimitExceeded,
    InternalServerError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCase",
}));

export type DescribeAttachmentError =
  | AttachmentIdNotFound
  | DescribeAttachmentLimitExceeded
  | InternalServerError
  | CommonErrors;
/**
 * Returns the attachment that has the specified ID. Attachments can include screenshots,
 * error logs, or other files that describe your issue. Attachment IDs are generated by the
 * case management system when you add an attachment to a case or case communication.
 * Attachment IDs are returned in the AttachmentDetails objects that are
 * returned by the DescribeCommunications operation.
 *
 * - You must have a Business, Enterprise On-Ramp, or Enterprise Support plan to use the Amazon Web Services Support
 * API.
 *
 * - If you call the Amazon Web Services Support API from an account that doesn't have a
 * Business, Enterprise On-Ramp, or Enterprise Support plan, the
 * `SubscriptionRequiredException` error message appears. For
 * information about changing your support plan, see Amazon Web Services Support.
 */
export const describeAttachment: API.OperationMethod<
  DescribeAttachmentRequest,
  DescribeAttachmentResponse,
  DescribeAttachmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeAttachmentRequest,
  output: DescribeAttachmentResponse,
  errors: [
    AttachmentIdNotFound,
    DescribeAttachmentLimitExceeded,
    InternalServerError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAttachment",
}));

export type DescribeCasesError =
  | CaseIdNotFound
  | InternalServerError
  | CommonErrors;
/**
 * Returns a list of cases that you specify by passing one or more case IDs. You can use
 * the `afterTime` and `beforeTime` parameters to filter the cases by
 * date. You can set values for the `includeResolvedCases` and
 * `includeCommunications` parameters to specify how much information to
 * return.
 *
 * The response returns the following in JSON format:
 *
 * - One or more CaseDetails data types.
 *
 * - One or more `nextToken` values, which specify where to paginate the
 * returned records represented by the `CaseDetails` objects.
 *
 * Case data is available for 12 months after creation. If a case was created more than
 * 12 months ago, a request might return an error.
 *
 * - You must have a Business, Enterprise On-Ramp, or Enterprise Support plan to use the Amazon Web Services Support
 * API.
 *
 * - If you call the Amazon Web Services Support API from an account that doesn't have a
 * Business, Enterprise On-Ramp, or Enterprise Support plan, the
 * `SubscriptionRequiredException` error message appears. For
 * information about changing your support plan, see Amazon Web Services Support.
 */
export const describeCases: API.PaginatedOperationMethod<
  DescribeCasesRequest,
  DescribeCasesResponse,
  DescribeCasesError,
  Credentials | HttpClient.HttpClient,
  CaseDetails
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeCasesRequest,
  output: DescribeCasesResponse,
  errors: [CaseIdNotFound, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCases",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "cases",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeCommunicationsError =
  | CaseIdNotFound
  | InternalServerError
  | CommonErrors;
/**
 * Returns communications and attachments for one or more support cases. Use the
 * `afterTime` and `beforeTime` parameters to filter by date. You
 * can use the `caseId` parameter to restrict the results to a specific
 * case.
 *
 * Case data is available for 12 months after creation. If a case was created more than
 * 12 months ago, a request for data might cause an error.
 *
 * You can use the `maxResults` and `nextToken` parameters to
 * control the pagination of the results. Set `maxResults` to the number of
 * cases that you want to display on each page, and use `nextToken` to specify
 * the resumption of pagination.
 *
 * - You must have a Business, Enterprise On-Ramp, or Enterprise Support plan to use the Amazon Web Services Support
 * API.
 *
 * - If you call the Amazon Web Services Support API from an account that doesn't have a
 * Business, Enterprise On-Ramp, or Enterprise Support plan, the
 * `SubscriptionRequiredException` error message appears. For
 * information about changing your support plan, see Amazon Web Services Support.
 */
export const describeCommunications: API.PaginatedOperationMethod<
  DescribeCommunicationsRequest,
  DescribeCommunicationsResponse,
  DescribeCommunicationsError,
  Credentials | HttpClient.HttpClient,
  Communication
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeCommunicationsRequest,
  output: DescribeCommunicationsResponse,
  errors: [CaseIdNotFound, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCommunications",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "communications",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeCreateCaseOptionsError =
  | InternalServerError
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a list of CreateCaseOption types along with the
 * corresponding supported hours and language availability. You can specify the `language`
 * `categoryCode`,
 * `issueType` and `serviceCode` used to retrieve the CreateCaseOptions.
 *
 * - You must have a Business, Enterprise On-Ramp, or Enterprise Support plan to use the Amazon Web Services Support
 * API.
 *
 * - If you call the Amazon Web Services Support API from an account that doesn't have a
 * Business, Enterprise On-Ramp, or Enterprise Support plan, the
 * `SubscriptionRequiredException` error message appears. For
 * information about changing your support plan, see Amazon Web Services Support.
 */
export const describeCreateCaseOptions: API.OperationMethod<
  DescribeCreateCaseOptionsRequest,
  DescribeCreateCaseOptionsResponse,
  DescribeCreateCaseOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeCreateCaseOptionsRequest,
  output: DescribeCreateCaseOptionsResponse,
  errors: [InternalServerError, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCreateCaseOptions",
}));

export type DescribeServicesError = InternalServerError | CommonErrors;
/**
 * Returns the current list of Amazon Web Services services and a list of service categories for each
 * service. You then use service names and categories in your CreateCase
 * requests. Each Amazon Web Services service has its own set of categories.
 *
 * The service codes and category codes correspond to the values that appear in the
 * **Service** and **Category** lists on the Amazon Web Services Support Center Create Case page. The values in those fields
 * don't necessarily match the service codes and categories returned by the
 * `DescribeServices` operation. Always use the service codes and categories
 * that the `DescribeServices` operation returns, so that you have the most
 * recent set of service and category codes.
 *
 * - You must have a Business, Enterprise On-Ramp, or Enterprise Support plan to use the Amazon Web Services Support
 * API.
 *
 * - If you call the Amazon Web Services Support API from an account that doesn't have a
 * Business, Enterprise On-Ramp, or Enterprise Support plan, the
 * `SubscriptionRequiredException` error message appears. For
 * information about changing your support plan, see Amazon Web Services Support.
 */
export const describeServices: API.OperationMethod<
  DescribeServicesRequest,
  DescribeServicesResponse,
  DescribeServicesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeServicesRequest,
  output: DescribeServicesResponse,
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeServices",
}));

export type DescribeSeverityLevelsError = InternalServerError | CommonErrors;
/**
 * Returns the list of severity levels that you can assign to a support case. The
 * severity level for a case is also a field in the CaseDetails data type
 * that you include for a CreateCase request.
 *
 * - You must have a Business, Enterprise On-Ramp, or Enterprise Support plan to use the Amazon Web Services Support
 * API.
 *
 * - If you call the Amazon Web Services Support API from an account that doesn't have a
 * Business, Enterprise On-Ramp, or Enterprise Support plan, the
 * `SubscriptionRequiredException` error message appears. For
 * information about changing your support plan, see Amazon Web Services Support.
 */
export const describeSeverityLevels: API.OperationMethod<
  DescribeSeverityLevelsRequest,
  DescribeSeverityLevelsResponse,
  DescribeSeverityLevelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeSeverityLevelsRequest,
  output: DescribeSeverityLevelsResponse,
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSeverityLevels",
}));

export type DescribeSupportedLanguagesError =
  | InternalServerError
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a list of supported languages for a specified `categoryCode`,
 * `issueType` and `serviceCode`. The returned supported languages will
 * include a ISO 639-1 code for the `language`, and the language display name.
 *
 * - You must have a Business, Enterprise On-Ramp, or Enterprise Support plan to use the Amazon Web Services Support
 * API.
 *
 * - If you call the Amazon Web Services Support API from an account that doesn't have a
 * Business, Enterprise On-Ramp, or Enterprise Support plan, the
 * `SubscriptionRequiredException` error message appears. For
 * information about changing your support plan, see Amazon Web Services Support.
 */
export const describeSupportedLanguages: API.OperationMethod<
  DescribeSupportedLanguagesRequest,
  DescribeSupportedLanguagesResponse,
  DescribeSupportedLanguagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeSupportedLanguagesRequest,
  output: DescribeSupportedLanguagesResponse,
  errors: [InternalServerError, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSupportedLanguages",
}));

export type DescribeTrustedAdvisorCheckRefreshStatusesError =
  | InternalServerError
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the refresh status of the Trusted Advisor checks that have the specified check
 * IDs. You can get the check IDs by calling the DescribeTrustedAdvisorChecks operation.
 *
 * Some checks are refreshed automatically, and you can't return their refresh statuses
 * by using the `DescribeTrustedAdvisorCheckRefreshStatuses` operation. If you
 * call this operation for these checks, you might see an
 * `InvalidParameterValue` error.
 *
 * - You must have a Business, Enterprise On-Ramp, or Enterprise Support plan to use the Amazon Web Services Support
 * API.
 *
 * - If you call the Amazon Web Services Support API from an account that doesn't have a
 * Business, Enterprise On-Ramp, or Enterprise Support plan, the
 * `SubscriptionRequiredException` error message appears. For
 * information about changing your support plan, see Amazon Web Services Support.
 *
 * To call the Trusted Advisor operations in
 * the Amazon Web Services Support API, you must use the US East (N. Virginia) endpoint. Currently, the US West (Oregon) and Europe (Ireland)
 * endpoints don't support the Trusted Advisor operations. For more information, see About the Amazon Web Services Support
 * API in the *Amazon Web Services Support User Guide*.
 */
export const describeTrustedAdvisorCheckRefreshStatuses: API.OperationMethod<
  DescribeTrustedAdvisorCheckRefreshStatusesRequest,
  DescribeTrustedAdvisorCheckRefreshStatusesResponse,
  DescribeTrustedAdvisorCheckRefreshStatusesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeTrustedAdvisorCheckRefreshStatusesRequest,
  output: DescribeTrustedAdvisorCheckRefreshStatusesResponse,
  errors: [InternalServerError, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTrustedAdvisorCheckRefreshStatuses",
}));

export type DescribeTrustedAdvisorCheckResultError =
  | InternalServerError
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the results of the Trusted Advisor check that has the specified check ID. You
 * can get the check IDs by calling the DescribeTrustedAdvisorChecks
 * operation.
 *
 * The response contains a TrustedAdvisorCheckResult object, which
 * contains these three objects:
 *
 * - TrustedAdvisorCategorySpecificSummary
 *
 * - TrustedAdvisorResourceDetail
 *
 * - TrustedAdvisorResourcesSummary
 *
 * In addition, the response contains these fields:
 *
 * - **status** - The alert status of the check
 * can be `ok` (green), `warning` (yellow),
 * `error` (red), or `not_available`.
 *
 * - **timestamp** - The time of the last refresh
 * of the check.
 *
 * - **checkId** - The unique identifier for the
 * check.
 *
 * - You must have a Business, Enterprise On-Ramp, or Enterprise Support plan to use the Amazon Web Services Support
 * API.
 *
 * - If you call the Amazon Web Services Support API from an account that doesn't have a
 * Business, Enterprise On-Ramp, or Enterprise Support plan, the
 * `SubscriptionRequiredException` error message appears. For
 * information about changing your support plan, see Amazon Web Services Support.
 *
 * To call the Trusted Advisor operations in
 * the Amazon Web Services Support API, you must use the US East (N. Virginia) endpoint. Currently, the US West (Oregon) and Europe (Ireland)
 * endpoints don't support the Trusted Advisor operations. For more information, see About the Amazon Web Services Support
 * API in the *Amazon Web Services Support User Guide*.
 */
export const describeTrustedAdvisorCheckResult: API.OperationMethod<
  DescribeTrustedAdvisorCheckResultRequest,
  DescribeTrustedAdvisorCheckResultResponse,
  DescribeTrustedAdvisorCheckResultError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeTrustedAdvisorCheckResultRequest,
  output: DescribeTrustedAdvisorCheckResultResponse,
  errors: [InternalServerError, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTrustedAdvisorCheckResult",
}));

export type DescribeTrustedAdvisorChecksError =
  | InternalServerError
  | ThrottlingException
  | CommonErrors;
/**
 * Returns information about all available Trusted Advisor checks, including the name, ID,
 * category, description, and metadata. You must specify a language code.
 *
 * The response contains a TrustedAdvisorCheckDescription object for
 * each check. You must set the Amazon Web Services Region to us-east-1.
 *
 * - You must have a Business, Enterprise On-Ramp, or Enterprise Support plan to use the Amazon Web Services Support API.
 *
 * - If you call the Amazon Web Services Support API from an account that doesn't have a
 * Business, Enterprise On-Ramp, or Enterprise Support plan, the `SubscriptionRequiredException` error
 * message appears. For information about changing your support plan, see
 * Amazon Web Services Support.
 *
 * - The names and descriptions for Trusted Advisor checks are subject to change. We
 * recommend that you specify the check ID in your code to uniquely identify a
 * check.
 *
 * To call the Trusted Advisor operations in
 * the Amazon Web Services Support API, you must use the US East (N. Virginia) endpoint. Currently, the US West (Oregon) and Europe (Ireland)
 * endpoints don't support the Trusted Advisor operations. For more information, see About the Amazon Web Services Support
 * API in the *Amazon Web Services Support User Guide*.
 */
export const describeTrustedAdvisorChecks: API.OperationMethod<
  DescribeTrustedAdvisorChecksRequest,
  DescribeTrustedAdvisorChecksResponse,
  DescribeTrustedAdvisorChecksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeTrustedAdvisorChecksRequest,
  output: DescribeTrustedAdvisorChecksResponse,
  errors: [InternalServerError, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTrustedAdvisorChecks",
}));

export type DescribeTrustedAdvisorCheckSummariesError =
  | InternalServerError
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the results for the Trusted Advisor check summaries for the check IDs that you
 * specified. You can get the check IDs by calling the DescribeTrustedAdvisorChecks operation.
 *
 * The response contains an array of TrustedAdvisorCheckSummary
 * objects.
 *
 * - You must have a Business, Enterprise On-Ramp, or Enterprise Support plan to use the Amazon Web Services Support
 * API.
 *
 * - If you call the Amazon Web Services Support API from an account that doesn't have a
 * Business, Enterprise On-Ramp, or Enterprise Support plan, the
 * `SubscriptionRequiredException` error message appears. For
 * information about changing your support plan, see Amazon Web Services Support.
 *
 * To call the Trusted Advisor operations in
 * the Amazon Web Services Support API, you must use the US East (N. Virginia) endpoint. Currently, the US West (Oregon) and Europe (Ireland)
 * endpoints don't support the Trusted Advisor operations. For more information, see About the Amazon Web Services Support
 * API in the *Amazon Web Services Support User Guide*.
 */
export const describeTrustedAdvisorCheckSummaries: API.OperationMethod<
  DescribeTrustedAdvisorCheckSummariesRequest,
  DescribeTrustedAdvisorCheckSummariesResponse,
  DescribeTrustedAdvisorCheckSummariesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeTrustedAdvisorCheckSummariesRequest,
  output: DescribeTrustedAdvisorCheckSummariesResponse,
  errors: [InternalServerError, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTrustedAdvisorCheckSummaries",
}));

export type RefreshTrustedAdvisorCheckError =
  | InternalServerError
  | CommonErrors;
/**
 * Refreshes the Trusted Advisor check that you specify using the check ID. You can get the
 * check IDs by calling the DescribeTrustedAdvisorChecks
 * operation.
 *
 * Some checks are refreshed automatically. If you call the
 * `RefreshTrustedAdvisorCheck` operation to refresh them, you might see
 * the `InvalidParameterValue` error.
 *
 * The response contains a TrustedAdvisorCheckRefreshStatus
 * object.
 *
 * - You must have a Business, Enterprise On-Ramp, or Enterprise Support plan to use the Amazon Web Services Support
 * API.
 *
 * - If you call the Amazon Web Services Support API from an account that doesn't have a
 * Business, Enterprise On-Ramp, or Enterprise Support plan, the
 * `SubscriptionRequiredException` error message appears. For
 * information about changing your support plan, see Amazon Web Services Support.
 *
 * To call the Trusted Advisor operations in
 * the Amazon Web Services Support API, you must use the US East (N. Virginia) endpoint. Currently, the US West (Oregon) and Europe (Ireland)
 * endpoints don't support the Trusted Advisor operations. For more information, see About the Amazon Web Services Support
 * API in the *Amazon Web Services Support User Guide*.
 */
export const refreshTrustedAdvisorCheck: API.OperationMethod<
  RefreshTrustedAdvisorCheckRequest,
  RefreshTrustedAdvisorCheckResponse,
  RefreshTrustedAdvisorCheckError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RefreshTrustedAdvisorCheckRequest,
  output: RefreshTrustedAdvisorCheckResponse,
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RefreshTrustedAdvisorCheck",
}));

export type ResolveCaseError =
  | CaseIdNotFound
  | InternalServerError
  | CommonErrors;
/**
 * Resolves a support case. This operation takes a `caseId` and returns the
 * initial and final state of the case.
 *
 * - You must have a Business, Enterprise On-Ramp, or Enterprise Support plan to use the Amazon Web Services Support
 * API.
 *
 * - If you call the Amazon Web Services Support API from an account that doesn't have a
 * Business, Enterprise On-Ramp, or Enterprise Support plan, the
 * `SubscriptionRequiredException` error message appears. For
 * information about changing your support plan, see Amazon Web Services Support.
 */
export const resolveCase: API.OperationMethod<
  ResolveCaseRequest,
  ResolveCaseResponse,
  ResolveCaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ResolveCaseRequest,
  output: ResolveCaseResponse,
  errors: [CaseIdNotFound, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResolveCase",
}));
