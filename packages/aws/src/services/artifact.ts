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
  sdkId: "Artifact",
  serviceShapeName: "Artifact",
});
const auth = T.AwsAuthSigv4({ name: "artifact" });
const ver = T.ServiceVersion("2018-05-10");
const proto = T.AwsProtocolsRestJson1();
const rules = T.EndpointResolver((p, _) => {
  const { UseDualStack = false, UseFIPS = false, Endpoint, Region } = p;
  const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
    type: "endpoint" as const,
    endpoint: { url: u as string, properties: p, headers: h },
  });
  const err = (m: unknown): T.EndpointResolverResult => ({
    type: "error" as const,
    message: m as string,
  });
  const _p0 = (_0: unknown) => ({
    authSchemes: [
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
              `https://artifact-fips.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              _p0(PartitionResult),
              {},
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true && UseDualStack === false) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://artifact-fips.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              _p0(PartitionResult),
              {},
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseFIPS === false && UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://artifact.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              _p0(PartitionResult),
              {},
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://artifact.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          _p0(PartitionResult),
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
      reason: S.String,
      fieldList: S.optional(
        S.suspend(() => ValidationExceptionFieldList).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type InquiryName = string | redacted.Redacted<string>;
export type LongStringAttribute = string;
export type ShortStringAttribute = string;
export type FileSectionList = string[];
export const FileSectionList = /*@__PURE__*/ S.Array(S.String);
export interface InquiryFileContent {
  fileSections?: string[];
  content: Uint8Array;
}
export const InquiryFileContent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ fileSections: S.optional(FileSectionList), content: T.Blob }),
).annotate({
  identifier: "InquiryFileContent",
}) as any as S.Schema<InquiryFileContent>;
export type InquiryContent =
  | { query: string; fileContent?: never }
  | { query?: never; fileContent: InquiryFileContent };
export const InquiryContent = /*@__PURE__*/ S.Union([
  S.Struct({ query: S.String }),
  S.Struct({ fileContent: InquiryFileContent }),
]);
export type IdempotentClientToken = string;
export type InquirySupportMode = "AI_ONLY" | "FULL_SUPPORT" | (string & {});
export const InquirySupportMode = S.String;

export type TagKey = string;
export type TagValue = string;
export type TagsMap = { [key: string]: string | undefined };
export const TagsMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateComplianceInquiryRequest {
  name: string | redacted.Redacted<string>;
  inquiryContent: InquiryContent;
  clientToken?: string;
  supportMode?: InquirySupportMode;
  tags?: { [key: string]: string | undefined };
}
export const CreateComplianceInquiryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: SensitiveString,
    inquiryContent: InquiryContent,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    supportMode: S.optional(InquirySupportMode),
    tags: S.optional(TagsMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/compliance-inquiry/create" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateComplianceInquiryRequest",
}) as any as S.Schema<CreateComplianceInquiryRequest>;
export type InquiryId = string;
export type InquiryStatus =
  | "PROCESSING"
  | "HUMAN_REVIEW"
  | "COMPLETED"
  | "FAILED"
  | (string & {});
export const InquiryStatus = S.String;

export type InquiryStatusMessage =
  | "Compliance inquiry processing is complete."
  | "Malware was detected on the file. Provide a new file and try again."
  | "Compliance inquiry processing is in-progress."
  | "An internal error occurred while processing the inquiry. Try again at a later time."
  | "Human review is in progress."
  | "Compliance inquiry processing is complete. One or more queries encountered errors during processing."
  | (string & {});
export const InquiryStatusMessage = S.String;

export type InputSource = "TEXT" | "FILE" | (string & {});
export const InputSource = S.String;

export type TimestampAttribute = Date;
export interface InquirySummary {
  arn: string;
  name: string;
  id: string;
  status: InquiryStatus;
  statusMessage: InquiryStatusMessage;
  inputSource: InputSource;
  createdAt: Date;
}
export const InquirySummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    name: S.String,
    id: S.String,
    status: InquiryStatus,
    statusMessage: InquiryStatusMessage,
    inputSource: InputSource,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({ identifier: "InquirySummary" }) as any as S.Schema<InquirySummary>;
export interface CreateComplianceInquiryResponse {
  complianceInquirySummary?: InquirySummary;
  tags?: { [key: string]: string | undefined };
}
export const CreateComplianceInquiryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    complianceInquirySummary: S.optional(InquirySummary),
    tags: S.optional(TagsMap),
  }),
).annotate({
  identifier: "CreateComplianceInquiryResponse",
}) as any as S.Schema<CreateComplianceInquiryResponse>;
export type QueryIdentifiersList = number[];
export const QueryIdentifiersList = /*@__PURE__*/ S.Array(S.Number);
export interface ExportComplianceInquiryRequest {
  complianceInquiryId: string;
  queryIdentifiers?: number[];
  includeCitations?: boolean;
}
export const ExportComplianceInquiryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    complianceInquiryId: S.String,
    queryIdentifiers: S.optional(QueryIdentifiersList),
    includeCitations: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/compliance-inquiry/export" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ExportComplianceInquiryRequest",
}) as any as S.Schema<ExportComplianceInquiryRequest>;
export type PresignedUrl = string | redacted.Redacted<string>;
export interface ExportComplianceInquiryResponse {
  documentPresignedUrl?: string | redacted.Redacted<string>;
  tags?: { [key: string]: string | undefined };
}
export const ExportComplianceInquiryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    documentPresignedUrl: S.optional(SensitiveString),
    tags: S.optional(TagsMap),
  }),
).annotate({
  identifier: "ExportComplianceInquiryResponse",
}) as any as S.Schema<ExportComplianceInquiryResponse>;
export interface GetAccountSettingsRequest {}
export const GetAccountSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/account-settings/get" }),
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
export type NotificationSubscriptionStatus =
  | "SUBSCRIBED"
  | "NOT_SUBSCRIBED"
  | (string & {});
export const NotificationSubscriptionStatus = S.String;

export interface AccountSettings {
  notificationSubscriptionStatus?: NotificationSubscriptionStatus;
}
export const AccountSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    notificationSubscriptionStatus: S.optional(NotificationSubscriptionStatus),
  }),
).annotate({
  identifier: "AccountSettings",
}) as any as S.Schema<AccountSettings>;
export interface GetAccountSettingsResponse {
  accountSettings?: AccountSettings;
}
export const GetAccountSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ accountSettings: S.optional(AccountSettings) }),
).annotate({
  identifier: "GetAccountSettingsResponse",
}) as any as S.Schema<GetAccountSettingsResponse>;
export interface GetComplianceInquiryMetadataRequest {
  complianceInquiryId: string;
}
export const GetComplianceInquiryMetadataRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    complianceInquiryId: S.String.pipe(T.HttpQuery("complianceInquiryId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/compliance-inquiry/getMetadata" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetComplianceInquiryMetadataRequest",
}) as any as S.Schema<GetComplianceInquiryMetadataRequest>;
export interface InquiryDetail {
  arn: string;
  name: string;
  id: string;
  status: InquiryStatus;
  statusMessage: InquiryStatusMessage;
  inputSource: InputSource;
  createdAt: Date;
  updatedAt?: Date;
  supportMode?: InquirySupportMode;
}
export const InquiryDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    name: S.String,
    id: S.String,
    status: InquiryStatus,
    statusMessage: InquiryStatusMessage,
    inputSource: InputSource,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    supportMode: S.optional(InquirySupportMode),
  }),
).annotate({ identifier: "InquiryDetail" }) as any as S.Schema<InquiryDetail>;
export interface GetComplianceInquiryMetadataResponse {
  complianceInquiryDetail?: InquiryDetail;
  tags?: { [key: string]: string | undefined };
}
export const GetComplianceInquiryMetadataResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      complianceInquiryDetail: S.optional(InquiryDetail),
      tags: S.optional(TagsMap),
    }),
).annotate({
  identifier: "GetComplianceInquiryMetadataResponse",
}) as any as S.Schema<GetComplianceInquiryMetadataResponse>;
export type ReportId = string;
export type VersionAttribute = number;
export interface GetReportRequest {
  reportId: string;
  reportVersion?: number;
  termToken: string;
}
export const GetReportRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    reportId: S.String.pipe(T.HttpQuery("reportId")),
    reportVersion: S.optional(S.Number).pipe(T.HttpQuery("reportVersion")),
    termToken: S.String.pipe(T.HttpQuery("termToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/report/get" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetReportRequest",
}) as any as S.Schema<GetReportRequest>;
export interface GetReportResponse {
  documentPresignedUrl?: string;
}
export const GetReportResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ documentPresignedUrl: S.optional(S.String) }),
).annotate({
  identifier: "GetReportResponse",
}) as any as S.Schema<GetReportResponse>;
export interface GetReportMetadataRequest {
  reportId: string;
  reportVersion?: number;
}
export const GetReportMetadataRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    reportId: S.String.pipe(T.HttpQuery("reportId")),
    reportVersion: S.optional(S.Number).pipe(T.HttpQuery("reportVersion")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/report/getMetadata" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetReportMetadataRequest",
}) as any as S.Schema<GetReportMetadataRequest>;
export type PublishedState = "PUBLISHED" | "UNPUBLISHED" | (string & {});
export const PublishedState = S.String;

export type AcceptanceType = "PASSTHROUGH" | "EXPLICIT" | (string & {});
export const AcceptanceType = S.String;

export type SequenceNumberAttribute = number;
export type UploadState =
  | "PROCESSING"
  | "COMPLETE"
  | "FAILED"
  | "FAULT"
  | (string & {});
export const UploadState = S.String;

export type StatusMessage = string;
export interface ReportDetail {
  id?: string;
  name?: string;
  description?: string;
  periodStart?: Date;
  periodEnd?: Date;
  createdAt?: Date;
  lastModifiedAt?: Date;
  deletedAt?: Date;
  state?: PublishedState;
  arn?: string;
  series?: string;
  category?: string;
  companyName?: string;
  productName?: string;
  termArn?: string;
  version?: number;
  acceptanceType?: AcceptanceType;
  sequenceNumber?: number;
  uploadState?: UploadState;
  statusMessage?: string;
}
export const ReportDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    periodStart: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    periodEnd: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastModifiedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    deletedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    state: S.optional(PublishedState),
    arn: S.optional(S.String),
    series: S.optional(S.String),
    category: S.optional(S.String),
    companyName: S.optional(S.String),
    productName: S.optional(S.String),
    termArn: S.optional(S.String),
    version: S.optional(S.Number),
    acceptanceType: S.optional(AcceptanceType),
    sequenceNumber: S.optional(S.Number),
    uploadState: S.optional(UploadState),
    statusMessage: S.optional(S.String),
  }),
).annotate({ identifier: "ReportDetail" }) as any as S.Schema<ReportDetail>;
export interface GetReportMetadataResponse {
  reportDetails?: ReportDetail;
}
export const GetReportMetadataResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ reportDetails: S.optional(ReportDetail) }),
).annotate({
  identifier: "GetReportMetadataResponse",
}) as any as S.Schema<GetReportMetadataResponse>;
export interface GetTermForReportRequest {
  reportId: string;
  reportVersion?: number;
}
export const GetTermForReportRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    reportId: S.String.pipe(T.HttpQuery("reportId")),
    reportVersion: S.optional(S.Number).pipe(T.HttpQuery("reportVersion")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/report/getTermForReport" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetTermForReportRequest",
}) as any as S.Schema<GetTermForReportRequest>;
export interface GetTermForReportResponse {
  documentPresignedUrl?: string;
  termToken?: string;
}
export const GetTermForReportResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    documentPresignedUrl: S.optional(S.String),
    termToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetTermForReportResponse",
}) as any as S.Schema<GetTermForReportResponse>;
export type MaxResultsAttribute = number;
export type NextTokenAttribute = string;
export interface ListComplianceInquiriesRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListComplianceInquiriesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/compliance-inquiry/list" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListComplianceInquiriesRequest",
}) as any as S.Schema<ListComplianceInquiriesRequest>;
export type InquiriesList = InquirySummary[];
export const InquiriesList = /*@__PURE__*/ S.Array(InquirySummary);
export interface ListComplianceInquiriesResponse {
  complianceInquiries?: InquirySummary[];
  nextToken?: string;
}
export const ListComplianceInquiriesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    complianceInquiries: S.optional(InquiriesList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListComplianceInquiriesResponse",
}) as any as S.Schema<ListComplianceInquiriesResponse>;
export interface ListComplianceInquiryQueriesRequest {
  complianceInquiryId: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListComplianceInquiryQueriesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    complianceInquiryId: S.String.pipe(T.HttpQuery("complianceInquiryId")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/compliance-inquiry/listQueries" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListComplianceInquiryQueriesRequest",
}) as any as S.Schema<ListComplianceInquiryQueriesRequest>;
export type ReviewType = "HUMAN" | "AI" | (string & {});
export const ReviewType = S.String;

export interface Citation {
  sourceLabel?: string;
  sourceContent?: string;
  sourceLink?: string;
}
export const Citation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceLabel: S.optional(S.String),
    sourceContent: S.optional(S.String),
    sourceLink: S.optional(S.String),
  }),
).annotate({ identifier: "Citation" }) as any as S.Schema<Citation>;
export type CitationList = Citation[];
export const CitationList = /*@__PURE__*/ S.Array(Citation);
export type QueryStatus = "PROCESSING" | "COMPLETED" | "FAILED" | (string & {});
export const QueryStatus = S.String;

export type QueryStatusMessage =
  | "Query processing is complete."
  | "Query processing is in-progress."
  | "An internal error occurred while processing the query. Try again at a later time."
  | "Query is pending human review."
  | "Query contains restricted or unsupported content."
  | (string & {});
export const QueryStatusMessage = S.String;

export interface ResponseVersion {
  responseText: string;
  timestamp: Date;
}
export const ResponseVersion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    responseText: S.String,
    timestamp: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "ResponseVersion",
}) as any as S.Schema<ResponseVersion>;
export type ResponseVersionList = ResponseVersion[];
export const ResponseVersionList = /*@__PURE__*/ S.Array(ResponseVersion);
export interface QuerySummary {
  queryIdentifier: number;
  query: string;
  response?: string;
  reviewType?: ReviewType;
  citations?: Citation[];
  status: QueryStatus;
  statusMessage: QueryStatusMessage;
  createdAt: Date;
  updatedResponseVersions?: ResponseVersion[];
}
export const QuerySummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    queryIdentifier: S.Number,
    query: S.String,
    response: S.optional(S.String),
    reviewType: S.optional(ReviewType),
    citations: S.optional(CitationList),
    status: QueryStatus,
    statusMessage: QueryStatusMessage,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedResponseVersions: S.optional(ResponseVersionList),
  }),
).annotate({ identifier: "QuerySummary" }) as any as S.Schema<QuerySummary>;
export type QueriesList = QuerySummary[];
export const QueriesList = /*@__PURE__*/ S.Array(QuerySummary);
export interface ListComplianceInquiryQueriesResponse {
  queries?: QuerySummary[];
  nextToken?: string;
}
export const ListComplianceInquiryQueriesResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      queries: S.optional(QueriesList),
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListComplianceInquiryQueriesResponse",
}) as any as S.Schema<ListComplianceInquiryQueriesResponse>;
export interface ListCustomerAgreementsRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListCustomerAgreementsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/customer-agreement/list" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCustomerAgreementsRequest",
}) as any as S.Schema<ListCustomerAgreementsRequest>;
export type CustomerAgreementIdAttribute = string;
export type CustomerAgreementState =
  | "ACTIVE"
  | "CUSTOMER_TERMINATED"
  | "AWS_TERMINATED"
  | (string & {});
export const CustomerAgreementState = S.String;

export type AgreementTerms = string[];
export const AgreementTerms = /*@__PURE__*/ S.Array(S.String);
export type AgreementType = "CUSTOM" | "DEFAULT" | "MODIFIED" | (string & {});
export const AgreementType = S.String;

export interface CustomerAgreementSummary {
  name?: string;
  arn?: string;
  id?: string;
  agreementArn?: string;
  awsAccountId?: string;
  organizationArn?: string;
  effectiveStart?: Date;
  effectiveEnd?: Date;
  state?: CustomerAgreementState;
  description?: string;
  acceptanceTerms?: string[];
  terminateTerms?: string[];
  type?: AgreementType;
}
export const CustomerAgreementSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    arn: S.optional(S.String),
    id: S.optional(S.String),
    agreementArn: S.optional(S.String),
    awsAccountId: S.optional(S.String),
    organizationArn: S.optional(S.String),
    effectiveStart: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    effectiveEnd: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    state: S.optional(CustomerAgreementState),
    description: S.optional(S.String),
    acceptanceTerms: S.optional(AgreementTerms),
    terminateTerms: S.optional(AgreementTerms),
    type: S.optional(AgreementType),
  }),
).annotate({
  identifier: "CustomerAgreementSummary",
}) as any as S.Schema<CustomerAgreementSummary>;
export type CustomerAgreementList = CustomerAgreementSummary[];
export const CustomerAgreementList = /*@__PURE__*/ S.Array(
  CustomerAgreementSummary,
);
export interface ListCustomerAgreementsResponse {
  customerAgreements: CustomerAgreementSummary[];
  nextToken?: string;
}
export const ListCustomerAgreementsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    customerAgreements: CustomerAgreementList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCustomerAgreementsResponse",
}) as any as S.Schema<ListCustomerAgreementsResponse>;
export interface ListReportsRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListReportsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/report/list" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListReportsRequest",
}) as any as S.Schema<ListReportsRequest>;
export interface ReportSummary {
  id?: string;
  name?: string;
  state?: PublishedState;
  arn?: string;
  version?: number;
  uploadState?: UploadState;
  description?: string;
  periodStart?: Date;
  periodEnd?: Date;
  series?: string;
  category?: string;
  companyName?: string;
  productName?: string;
  statusMessage?: string;
  acceptanceType?: AcceptanceType;
}
export const ReportSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    name: S.optional(S.String),
    state: S.optional(PublishedState),
    arn: S.optional(S.String),
    version: S.optional(S.Number),
    uploadState: S.optional(UploadState),
    description: S.optional(S.String),
    periodStart: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    periodEnd: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    series: S.optional(S.String),
    category: S.optional(S.String),
    companyName: S.optional(S.String),
    productName: S.optional(S.String),
    statusMessage: S.optional(S.String),
    acceptanceType: S.optional(AcceptanceType),
  }),
).annotate({ identifier: "ReportSummary" }) as any as S.Schema<ReportSummary>;
export type ReportsList = ReportSummary[];
export const ReportsList = /*@__PURE__*/ S.Array(ReportSummary);
export interface ListReportsResponse {
  reports?: ReportSummary[];
  nextToken?: string;
}
export const ListReportsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    reports: S.optional(ReportsList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListReportsResponse",
}) as any as S.Schema<ListReportsResponse>;
export interface ListReportVersionsRequest {
  reportId: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListReportVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    reportId: S.String.pipe(T.HttpQuery("reportId")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/report/listVersions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListReportVersionsRequest",
}) as any as S.Schema<ListReportVersionsRequest>;
export interface ListReportVersionsResponse {
  reports: ReportSummary[];
  nextToken?: string;
}
export const ListReportVersionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ reports: ReportsList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListReportVersionsResponse",
}) as any as S.Schema<ListReportVersionsResponse>;
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
  S.Struct({ tags: S.optional(TagsMap) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface PutAccountSettingsRequest {
  notificationSubscriptionStatus?: NotificationSubscriptionStatus;
}
export const PutAccountSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    notificationSubscriptionStatus: S.optional(NotificationSubscriptionStatus),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/v1/account-settings/put" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutAccountSettingsRequest",
}) as any as S.Schema<PutAccountSettingsRequest>;
export interface PutAccountSettingsResponse {
  accountSettings?: AccountSettings;
}
export const PutAccountSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ accountSettings: S.optional(AccountSettings) }),
).annotate({
  identifier: "PutAccountSettingsResponse",
}) as any as S.Schema<PutAccountSettingsResponse>;
export type FeedbackRating = "THUMBS_UP" | "THUMBS_DOWN" | (string & {});
export const FeedbackRating = S.String;

export type FeedbackReasonCode =
  | "OTHER"
  | "PARTIAL_RESPONSE"
  | "IRRELEVANT_RESPONSE"
  | (string & {});
export const FeedbackReasonCode = S.String;

export type FeedbackReasonCodeList = FeedbackReasonCode[];
export const FeedbackReasonCodeList = /*@__PURE__*/ S.Array(FeedbackReasonCode);
export type FeedbackCommentAttribute = string | redacted.Redacted<string>;
export interface PutComplianceInquiryFeedbackRequest {
  complianceInquiryId: string;
  queryIdentifier?: number;
  rating: FeedbackRating;
  responseRevisionId?: number;
  reasonCodes?: FeedbackReasonCode[];
  comment?: string | redacted.Redacted<string>;
  clientToken?: string;
}
export const PutComplianceInquiryFeedbackRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    complianceInquiryId: S.String,
    queryIdentifier: S.optional(S.Number),
    rating: FeedbackRating,
    responseRevisionId: S.optional(S.Number),
    reasonCodes: S.optional(FeedbackReasonCodeList),
    comment: S.optional(SensitiveString),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/v1/compliance-inquiry/putFeedback" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutComplianceInquiryFeedbackRequest",
}) as any as S.Schema<PutComplianceInquiryFeedbackRequest>;
export interface PutComplianceInquiryFeedbackResponse {
  submittedAt: Date;
}
export const PutComplianceInquiryFeedbackResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      submittedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    }),
).annotate({
  identifier: "PutComplianceInquiryFeedbackResponse",
}) as any as S.Schema<PutComplianceInquiryFeedbackResponse>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tags: TagsMap,
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
export type TagKeys = string[];
export const TagKeys = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tagKeys: TagKeys.pipe(T.HttpQuery("tagKeys")),
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
export type ValidationExceptionReason = string;
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
export type CreateComplianceInquiryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a new compliance inquiry.
 */
export const createComplianceInquiry: API.OperationMethod<
  CreateComplianceInquiryRequest,
  CreateComplianceInquiryResponse,
  CreateComplianceInquiryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateComplianceInquiryRequest,
  output: CreateComplianceInquiryResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateComplianceInquiry",
}));

export type ExportComplianceInquiryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Export a compliance inquiry report.
 */
export const exportComplianceInquiry: API.OperationMethod<
  ExportComplianceInquiryRequest,
  ExportComplianceInquiryResponse,
  ExportComplianceInquiryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ExportComplianceInquiryRequest,
  output: ExportComplianceInquiryResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExportComplianceInquiry",
}));

export type GetAccountSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get the account settings for Artifact.
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
  operationName: "GetAccountSettings",
}));

export type GetComplianceInquiryMetadataError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get the metadata for a single compliance inquiry.
 */
export const getComplianceInquiryMetadata: API.OperationMethod<
  GetComplianceInquiryMetadataRequest,
  GetComplianceInquiryMetadataResponse,
  GetComplianceInquiryMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetComplianceInquiryMetadataRequest,
  output: GetComplianceInquiryMetadataResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetComplianceInquiryMetadata",
}));

export type GetReportError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get the content for a single report.
 */
export const getReport: API.OperationMethod<
  GetReportRequest,
  GetReportResponse,
  GetReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetReportRequest,
  output: GetReportResponse,
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
  operationName: "GetReport",
}));

export type GetReportMetadataError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get the metadata for a single report.
 */
export const getReportMetadata: API.OperationMethod<
  GetReportMetadataRequest,
  GetReportMetadataResponse,
  GetReportMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetReportMetadataRequest,
  output: GetReportMetadataResponse,
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
  operationName: "GetReportMetadata",
}));

export type GetTermForReportError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get the Term content associated with a single report.
 */
export const getTermForReport: API.OperationMethod<
  GetTermForReportRequest,
  GetTermForReportResponse,
  GetTermForReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTermForReportRequest,
  output: GetTermForReportResponse,
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
  operationName: "GetTermForReport",
}));

export type ListComplianceInquiriesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List available compliance inquiries.
 */
export const listComplianceInquiries: API.PaginatedOperationMethod<
  ListComplianceInquiriesRequest,
  ListComplianceInquiriesResponse,
  ListComplianceInquiriesError,
  Credentials | HttpClient.HttpClient,
  InquirySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListComplianceInquiriesRequest,
  output: ListComplianceInquiriesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListComplianceInquiries",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "complianceInquiries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListComplianceInquiryQueriesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List queries within a compliance inquiry.
 */
export const listComplianceInquiryQueries: API.PaginatedOperationMethod<
  ListComplianceInquiryQueriesRequest,
  ListComplianceInquiryQueriesResponse,
  ListComplianceInquiryQueriesError,
  Credentials | HttpClient.HttpClient,
  QuerySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListComplianceInquiryQueriesRequest,
  output: ListComplianceInquiryQueriesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListComplianceInquiryQueries",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "queries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCustomerAgreementsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List active customer-agreements applicable to calling identity.
 */
export const listCustomerAgreements: API.PaginatedOperationMethod<
  ListCustomerAgreementsRequest,
  ListCustomerAgreementsResponse,
  ListCustomerAgreementsError,
  Credentials | HttpClient.HttpClient,
  CustomerAgreementSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCustomerAgreementsRequest,
  output: ListCustomerAgreementsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCustomerAgreements",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "customerAgreements",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListReportsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List available reports.
 */
export const listReports: API.PaginatedOperationMethod<
  ListReportsRequest,
  ListReportsResponse,
  ListReportsError,
  Credentials | HttpClient.HttpClient,
  ReportSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListReportsRequest,
  output: ListReportsResponse,
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
  operationName: "ListReports",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "reports",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListReportVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List available report versions for a given report.
 */
export const listReportVersions: API.PaginatedOperationMethod<
  ListReportVersionsRequest,
  ListReportVersionsResponse,
  ListReportVersionsError,
  Credentials | HttpClient.HttpClient,
  ReportSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListReportVersionsRequest,
  output: ListReportVersionsResponse,
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
  operationName: "ListReportVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "reports",
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
 * List tags for a resource.
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

export type PutAccountSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Put the account settings for Artifact.
 */
export const putAccountSettings: API.OperationMethod<
  PutAccountSettingsRequest,
  PutAccountSettingsResponse,
  PutAccountSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutAccountSettingsRequest,
  output: PutAccountSettingsResponse,
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
  operationName: "PutAccountSettings",
}));

export type PutComplianceInquiryFeedbackError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Submits feedback on a compliance inquiry response.
 */
export const putComplianceInquiryFeedback: API.OperationMethod<
  PutComplianceInquiryFeedbackRequest,
  PutComplianceInquiryFeedbackResponse,
  PutComplianceInquiryFeedbackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutComplianceInquiryFeedbackRequest,
  output: PutComplianceInquiryFeedbackResponse,
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
  operationName: "PutComplianceInquiryFeedback",
}));

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Add tags to a resource.
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
 * Remove tags from a resource.
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
