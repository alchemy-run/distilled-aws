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
  sdkId: "SimpleDBv2",
  serviceShapeName: "SimpleDBv2",
});
const auth = T.AwsAuthSigv4({ name: "sdb" });
const ver = T.ServiceVersion("2025-09-26");
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
          Region === "us-east-1" &&
          UseFIPS === false &&
          UseDualStack === false
        ) {
          return e("https://sdb.amazonaws.com");
        }
        if (UseFIPS === true && UseDualStack === true) {
          if (
            true === _.getAttr(PartitionResult, "supportsFIPS") &&
            true === _.getAttr(PartitionResult, "supportsDualStack")
          ) {
            return e(
              `https://sdb-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true && UseDualStack === false) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://sdb-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseFIPS === false && UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://sdb.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://sdb.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidNextTokenException>()(
    "InvalidNextTokenException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterCombinationException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterCombinationException>()(
    "InvalidParameterCombinationException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterValueException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterValueException>()(
    "InvalidParameterValueException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class NoSuchDomainException
  extends /*@__PURE__*/ S.TaggedError<NoSuchDomainException>()(
    "NoSuchDomainException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class NoSuchExportException
  extends /*@__PURE__*/ S.TaggedError<NoSuchExportException>()(
    "NoSuchExportException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class NumberExportsLimitExceeded
  extends /*@__PURE__*/ S.TaggedError<NumberExportsLimitExceeded>()(
    "NumberExportsLimitExceeded",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError, C.withThrottlingError) {}
export type ExportArn = string;
export interface GetExportRequest {
  exportArn: string;
}
export const GetExportRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ exportArn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/GetExport" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetExportRequest",
}) as any as S.Schema<GetExportRequest>;
export type IdempotencyToken = string;
export type ExportStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "SUCCEEDED"
  | "FAILED"
  | (string & {});
export const ExportStatus = /*@__PURE__*/ S.String;

export type DomainName = string;
export type RequestedAt = Date;
export type S3BucketName = string;
export type S3KeyPrefix = string;
export type S3SseAlgorithm = "AES256" | "KMS" | (string & {});
export const S3SseAlgorithm = /*@__PURE__*/ S.String;

export type S3SseKmsKeyId = string;
export type AwsAccountId = string;
export type FailureCode = string;
export type FailureMessage = string;
export type ExportManifestSummary = string;
export type ItemsCount = number;
export type ExportDataCutoffTime = Date;
export interface GetExportResponse {
  exportArn: string;
  clientToken: string;
  exportStatus: ExportStatus;
  domainName: string;
  requestedAt: Date;
  s3Bucket: string;
  s3KeyPrefix?: string;
  s3SseAlgorithm?: S3SseAlgorithm;
  s3SseKmsKeyId?: string;
  s3BucketOwner?: string;
  failureCode?: string;
  failureMessage?: string;
  exportManifest?: string;
  itemsCount?: number;
  exportDataCutoffTime?: Date;
}
export const GetExportResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    exportArn: S.String,
    clientToken: S.String,
    exportStatus: ExportStatus,
    domainName: S.String,
    requestedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    s3Bucket: S.String,
    s3KeyPrefix: S.optional(S.String),
    s3SseAlgorithm: S.optional(S3SseAlgorithm),
    s3SseKmsKeyId: S.optional(S.String),
    s3BucketOwner: S.optional(S.String),
    failureCode: S.optional(S.String),
    failureMessage: S.optional(S.String),
    exportManifest: S.optional(S.String),
    itemsCount: S.optional(S.Number),
    exportDataCutoffTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "GetExportResponse",
}) as any as S.Schema<GetExportResponse>;
export type MaxResults = number;
export type NextToken = string;
export interface ListExportsRequest {
  domainName?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListExportsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainName: S.optional(S.String),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/ListExports" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListExportsRequest",
}) as any as S.Schema<ListExportsRequest>;
export interface ExportSummary {
  exportArn: string;
  exportStatus: ExportStatus;
  requestedAt: Date;
  domainName: string;
}
export const ExportSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    exportArn: S.String,
    exportStatus: ExportStatus,
    requestedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    domainName: S.String,
  }),
).annotate({ identifier: "ExportSummary" }) as any as S.Schema<ExportSummary>;
export type ExportSummaries = ExportSummary[];
export const ExportSummaries = /*@__PURE__*/ S.Array(ExportSummary);
export interface ListExportsResponse {
  exportSummaries: ExportSummary[];
  nextToken?: string;
}
export const ListExportsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    exportSummaries: ExportSummaries,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListExportsResponse",
}) as any as S.Schema<ListExportsResponse>;
export interface StartDomainExportRequest {
  clientToken?: string;
  domainName: string;
  s3Bucket: string;
  s3KeyPrefix?: string;
  s3SseAlgorithm?: S3SseAlgorithm;
  s3SseKmsKeyId?: string;
  s3BucketOwner?: string;
}
export const StartDomainExportRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    domainName: S.String,
    s3Bucket: S.String,
    s3KeyPrefix: S.optional(S.String),
    s3SseAlgorithm: S.optional(S3SseAlgorithm),
    s3SseKmsKeyId: S.optional(S.String),
    s3BucketOwner: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/StartDomainExport" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartDomainExportRequest",
}) as any as S.Schema<StartDomainExportRequest>;
export interface StartDomainExportResponse {
  clientToken: string;
  exportArn: string;
  requestedAt: Date;
}
export const StartDomainExportResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.String,
    exportArn: S.String,
    requestedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "StartDomainExportResponse",
}) as any as S.Schema<StartDomainExportResponse>;
export type GetExportError =
  | InvalidParameterValueException
  | NoSuchExportException
  | CommonErrors;
/**
 * Returns information for an existing domain export.
 */
export const getExport: API.OperationMethod<
  GetExportRequest,
  GetExportResponse,
  GetExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetExportRequest,
  output: GetExportResponse,
  errors: [InvalidParameterValueException, NoSuchExportException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExport",
}));

export type ListExportsError =
  | InvalidNextTokenException
  | InvalidParameterValueException
  | NoSuchDomainException
  | CommonErrors;
/**
 * Lists all exports that were created. The results are paginated and can be filtered by domain name.
 */
export const listExports: API.PaginatedOperationMethod<
  ListExportsRequest,
  ListExportsResponse,
  ListExportsError,
  Credentials | HttpClient.HttpClient,
  ExportSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListExportsRequest,
  output: ListExportsResponse,
  errors: [
    InvalidNextTokenException,
    InvalidParameterValueException,
    NoSuchDomainException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExports",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "exportSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type StartDomainExportError =
  | ConflictException
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | NoSuchDomainException
  | NumberExportsLimitExceeded
  | CommonErrors;
/**
 * Initiates the export of a SimpleDB domain to an S3 bucket.
 */
export const startDomainExport: API.OperationMethod<
  StartDomainExportRequest,
  StartDomainExportResponse,
  StartDomainExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartDomainExportRequest,
  output: StartDomainExportResponse,
  errors: [
    ConflictException,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    NoSuchDomainException,
    NumberExportsLimitExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDomainExport",
}));
