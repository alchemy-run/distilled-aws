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
export const NotificationSubscriptionStatus = /*@__PURE__*/ S.String;

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
export type ReportId = string;
export type VersionAttribute = number;
export type ShortStringAttribute = string;
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
export type LongStringAttribute = string;
export type TimestampAttribute = Date;
export type PublishedState = "PUBLISHED" | "UNPUBLISHED" | (string & {});
export const PublishedState = /*@__PURE__*/ S.String;

export type AcceptanceType = "PASSTHROUGH" | "EXPLICIT" | (string & {});
export const AcceptanceType = /*@__PURE__*/ S.String;

export type SequenceNumberAttribute = number;
export type UploadState =
  | "PROCESSING"
  | "COMPLETE"
  | "FAILED"
  | "FAULT"
  | (string & {});
export const UploadState = /*@__PURE__*/ S.String;

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
export const CustomerAgreementState = /*@__PURE__*/ S.String;

export type AgreementTerms = string[];
export const AgreementTerms = /*@__PURE__*/ S.Array(S.String);
export type AgreementType = "CUSTOM" | "DEFAULT" | "MODIFIED" | (string & {});
export const AgreementType = /*@__PURE__*/ S.String;

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
