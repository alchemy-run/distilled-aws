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
  sdkId: "ApplicationCostProfiler",
  serviceShapeName: "AWSApplicationCostProfiler",
});
const auth = T.AwsAuthSigv4({ name: "application-cost-profiler" });
const ver = T.ServiceVersion("2020-09-10");
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
              `https://application-cost-profiler-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://application-cost-profiler-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://application-cost-profiler.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://application-cost-profiler.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
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
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type ReportId = string;
export interface DeleteReportDefinitionRequest {
  reportId: string;
}
export const DeleteReportDefinitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ reportId: S.String.pipe(T.HttpLabel("reportId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/reportDefinition/{reportId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteReportDefinitionRequest",
}) as any as S.Schema<DeleteReportDefinitionRequest>;
export interface DeleteReportDefinitionResult {
  reportId?: string;
}
export const DeleteReportDefinitionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ reportId: S.optional(S.String) }),
).annotate({
  identifier: "DeleteReportDefinitionResult",
}) as any as S.Schema<DeleteReportDefinitionResult>;
export interface GetReportDefinitionRequest {
  reportId: string;
}
export const GetReportDefinitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ reportId: S.String.pipe(T.HttpLabel("reportId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/reportDefinition/{reportId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetReportDefinitionRequest",
}) as any as S.Schema<GetReportDefinitionRequest>;
export type ReportDescription = string;
export type ReportFrequency = "MONTHLY" | "DAILY" | "ALL" | (string & {});
export const ReportFrequency = S.String;

export type Format = "CSV" | "PARQUET" | (string & {});
export const Format = S.String;

export type S3Bucket = string;
export type S3Prefix = string;
export interface S3Location {
  bucket: string;
  prefix: string;
}
export const S3Location = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ bucket: S.String, prefix: S.String }),
).annotate({ identifier: "S3Location" }) as any as S.Schema<S3Location>;
export interface GetReportDefinitionResult {
  reportId: string;
  reportDescription: string;
  reportFrequency: ReportFrequency;
  format: Format;
  destinationS3Location: S3Location;
  createdAt: Date;
  lastUpdated: Date;
}
export const GetReportDefinitionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    reportId: S.String,
    reportDescription: S.String,
    reportFrequency: ReportFrequency,
    format: Format,
    destinationS3Location: S3Location,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastUpdated: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "GetReportDefinitionResult",
}) as any as S.Schema<GetReportDefinitionResult>;
export type S3Key = string;
export type S3BucketRegion =
  | "ap-east-1"
  | "me-south-1"
  | "eu-south-1"
  | "af-south-1"
  | (string & {});
export const S3BucketRegion = S.String;

export interface SourceS3Location {
  bucket: string;
  key: string;
  region?: S3BucketRegion;
}
export const SourceS3Location = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bucket: S.String,
    key: S.String,
    region: S.optional(S3BucketRegion),
  }),
).annotate({
  identifier: "SourceS3Location",
}) as any as S.Schema<SourceS3Location>;
export interface ImportApplicationUsageRequest {
  sourceS3Location: SourceS3Location;
}
export const ImportApplicationUsageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sourceS3Location: SourceS3Location }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/importApplicationUsage" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ImportApplicationUsageRequest",
}) as any as S.Schema<ImportApplicationUsageRequest>;
export type ImportId = string;
export interface ImportApplicationUsageResult {
  importId: string;
}
export const ImportApplicationUsageResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ importId: S.String }),
).annotate({
  identifier: "ImportApplicationUsageResult",
}) as any as S.Schema<ImportApplicationUsageResult>;
export type Token = string;
export interface ListReportDefinitionsRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListReportDefinitionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/reportDefinition" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListReportDefinitionsRequest",
}) as any as S.Schema<ListReportDefinitionsRequest>;
export interface ReportDefinition {
  reportId?: string;
  reportDescription?: string;
  reportFrequency?: ReportFrequency;
  format?: Format;
  destinationS3Location?: S3Location;
  createdAt?: Date;
  lastUpdatedAt?: Date;
}
export const ReportDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    reportId: S.optional(S.String),
    reportDescription: S.optional(S.String),
    reportFrequency: S.optional(ReportFrequency),
    format: S.optional(Format),
    destinationS3Location: S.optional(S3Location),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "ReportDefinition",
}) as any as S.Schema<ReportDefinition>;
export type ReportDefinitionList = ReportDefinition[];
export const ReportDefinitionList = /*@__PURE__*/ S.Array(ReportDefinition);
export interface ListReportDefinitionsResult {
  reportDefinitions?: ReportDefinition[];
  nextToken?: string;
}
export const ListReportDefinitionsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    reportDefinitions: S.optional(ReportDefinitionList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListReportDefinitionsResult",
}) as any as S.Schema<ListReportDefinitionsResult>;
export interface PutReportDefinitionRequest {
  reportId: string;
  reportDescription: string;
  reportFrequency: ReportFrequency;
  format: Format;
  destinationS3Location: S3Location;
}
export const PutReportDefinitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    reportId: S.String,
    reportDescription: S.String,
    reportFrequency: ReportFrequency,
    format: Format,
    destinationS3Location: S3Location,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/reportDefinition" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutReportDefinitionRequest",
}) as any as S.Schema<PutReportDefinitionRequest>;
export interface PutReportDefinitionResult {
  reportId?: string;
}
export const PutReportDefinitionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ reportId: S.optional(S.String) }),
).annotate({
  identifier: "PutReportDefinitionResult",
}) as any as S.Schema<PutReportDefinitionResult>;
export interface UpdateReportDefinitionRequest {
  reportId: string;
  reportDescription: string;
  reportFrequency: ReportFrequency;
  format: Format;
  destinationS3Location: S3Location;
}
export const UpdateReportDefinitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    reportId: S.String.pipe(T.HttpLabel("reportId")),
    reportDescription: S.String,
    reportFrequency: ReportFrequency,
    format: Format,
    destinationS3Location: S3Location,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/reportDefinition/{reportId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateReportDefinitionRequest",
}) as any as S.Schema<UpdateReportDefinitionRequest>;
export interface UpdateReportDefinitionResult {
  reportId?: string;
}
export const UpdateReportDefinitionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ reportId: S.optional(S.String) }),
).annotate({
  identifier: "UpdateReportDefinitionResult",
}) as any as S.Schema<UpdateReportDefinitionResult>;
export type ErrorMessage = string;
export type DeleteReportDefinitionError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified report definition in AWS Application Cost Profiler. This stops the report from being
 * generated.
 */
export const deleteReportDefinition: API.OperationMethod<
  DeleteReportDefinitionRequest,
  DeleteReportDefinitionResult,
  DeleteReportDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteReportDefinitionRequest,
  output: DeleteReportDefinitionResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteReportDefinition",
}));

export type GetReportDefinitionError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the definition of a report already configured in AWS Application Cost Profiler.
 */
export const getReportDefinition: API.OperationMethod<
  GetReportDefinitionRequest,
  GetReportDefinitionResult,
  GetReportDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetReportDefinitionRequest,
  output: GetReportDefinitionResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReportDefinition",
}));

export type ImportApplicationUsageError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Ingests application usage data from Amazon Simple Storage Service (Amazon S3).
 *
 * The data must already exist in the S3 location. As part of the action, AWS Application Cost Profiler
 * copies the object from your S3 bucket to an S3 bucket owned by Amazon for processing
 * asynchronously.
 */
export const importApplicationUsage: API.OperationMethod<
  ImportApplicationUsageRequest,
  ImportApplicationUsageResult,
  ImportApplicationUsageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ImportApplicationUsageRequest,
  output: ImportApplicationUsageResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportApplicationUsage",
}));

export type ListReportDefinitionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of all reports and their configurations for your AWS account.
 *
 * The maximum number of reports is one.
 */
export const listReportDefinitions: API.PaginatedOperationMethod<
  ListReportDefinitionsRequest,
  ListReportDefinitionsResult,
  ListReportDefinitionsError,
  Credentials | HttpClient.HttpClient,
  ReportDefinition
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListReportDefinitionsRequest,
  output: ListReportDefinitionsResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReportDefinitions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "reportDefinitions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PutReportDefinitionError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates the report definition for a report in Application Cost Profiler.
 */
export const putReportDefinition: API.OperationMethod<
  PutReportDefinitionRequest,
  PutReportDefinitionResult,
  PutReportDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutReportDefinitionRequest,
  output: PutReportDefinitionResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutReportDefinition",
}));

export type UpdateReportDefinitionError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates existing report in AWS Application Cost Profiler.
 */
export const updateReportDefinition: API.OperationMethod<
  UpdateReportDefinitionRequest,
  UpdateReportDefinitionResult,
  UpdateReportDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateReportDefinitionRequest,
  output: UpdateReportDefinitionResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateReportDefinition",
}));
