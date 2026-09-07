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
  sdkId: "CodeGuru Security",
  serviceShapeName: "AwsCodeGuruSecurity",
});
const auth = T.AwsAuthSigv4({ name: "codeguru-security" });
const ver = T.ServiceVersion("2018-05-10");
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
              `https://codeguru-security-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://codeguru-security-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://codeguru-security.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://codeguru-security.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
      errorCode: S.String,
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.optional(S.String),
      resourceType: S.optional(S.String),
    },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      errorCode: S.String,
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
      error: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.all(T.HttpError(500), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      errorCode: S.String,
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      errorCode: S.String,
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
      errorCode: S.String,
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
export interface FindingIdentifier {
  scanName: string;
  findingId: string;
}
export const FindingIdentifier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ scanName: S.String, findingId: S.String }),
).annotate({
  identifier: "FindingIdentifier",
}) as any as S.Schema<FindingIdentifier>;
export type FindingIdentifiers = FindingIdentifier[];
export const FindingIdentifiers = /*@__PURE__*/ S.Array(FindingIdentifier);
export interface BatchGetFindingsRequest {
  findingIdentifiers: FindingIdentifier[];
}
export const BatchGetFindingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ findingIdentifiers: FindingIdentifiers }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/batchGetFindings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetFindingsRequest",
}) as any as S.Schema<BatchGetFindingsRequest>;
export type Status = "Closed" | "Open" | "All" | (string & {});
export const Status = S.String;

export interface Resource {
  id?: string;
  subResourceId?: string;
}
export const Resource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.optional(S.String), subResourceId: S.optional(S.String) }),
).annotate({ identifier: "Resource" }) as any as S.Schema<Resource>;
export type ReferenceUrls = string[];
export const ReferenceUrls = /*@__PURE__*/ S.Array(S.String);
export type RelatedVulnerabilities = string[];
export const RelatedVulnerabilities = /*@__PURE__*/ S.Array(S.String);
export interface CodeLine {
  number?: number;
  content?: string;
}
export const CodeLine = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ number: S.optional(S.Number), content: S.optional(S.String) }),
).annotate({ identifier: "CodeLine" }) as any as S.Schema<CodeLine>;
export type CodeSnippet = CodeLine[];
export const CodeSnippet = /*@__PURE__*/ S.Array(CodeLine);
export interface FilePath {
  name?: string;
  path?: string;
  startLine?: number;
  endLine?: number;
  codeSnippet?: CodeLine[];
}
export const FilePath = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    path: S.optional(S.String),
    startLine: S.optional(S.Number),
    endLine: S.optional(S.Number),
    codeSnippet: S.optional(CodeSnippet),
  }),
).annotate({ identifier: "FilePath" }) as any as S.Schema<FilePath>;
export interface Vulnerability {
  referenceUrls?: string[];
  relatedVulnerabilities?: string[];
  id?: string;
  filePath?: FilePath;
  itemCount?: number;
}
export const Vulnerability = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    referenceUrls: S.optional(ReferenceUrls),
    relatedVulnerabilities: S.optional(RelatedVulnerabilities),
    id: S.optional(S.String),
    filePath: S.optional(FilePath),
    itemCount: S.optional(S.Number),
  }),
).annotate({ identifier: "Vulnerability" }) as any as S.Schema<Vulnerability>;
export type Severity =
  | "Critical"
  | "High"
  | "Medium"
  | "Low"
  | "Info"
  | (string & {});
export const Severity = S.String;

export interface Recommendation {
  text?: string;
  url?: string;
}
export const Recommendation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ text: S.optional(S.String), url: S.optional(S.String) }),
).annotate({ identifier: "Recommendation" }) as any as S.Schema<Recommendation>;
export interface SuggestedFix {
  description?: string;
  code?: string;
}
export const SuggestedFix = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ description: S.optional(S.String), code: S.optional(S.String) }),
).annotate({ identifier: "SuggestedFix" }) as any as S.Schema<SuggestedFix>;
export type SuggestedFixes = SuggestedFix[];
export const SuggestedFixes = /*@__PURE__*/ S.Array(SuggestedFix);
export interface Remediation {
  recommendation?: Recommendation;
  suggestedFixes?: SuggestedFix[];
}
export const Remediation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    recommendation: S.optional(Recommendation),
    suggestedFixes: S.optional(SuggestedFixes),
  }),
).annotate({ identifier: "Remediation" }) as any as S.Schema<Remediation>;
export type DetectorTags = string[];
export const DetectorTags = /*@__PURE__*/ S.Array(S.String);
export interface Finding {
  createdAt?: Date;
  description?: string;
  generatorId?: string;
  id?: string;
  updatedAt?: Date;
  type?: string;
  status?: Status;
  resource?: Resource;
  vulnerability?: Vulnerability;
  severity?: Severity;
  remediation?: Remediation;
  title?: string;
  detectorTags?: string[];
  detectorId?: string;
  detectorName?: string;
  ruleId?: string;
}
export const Finding = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    description: S.optional(S.String),
    generatorId: S.optional(S.String),
    id: S.optional(S.String),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    type: S.optional(S.String),
    status: S.optional(Status),
    resource: S.optional(Resource),
    vulnerability: S.optional(Vulnerability),
    severity: S.optional(Severity),
    remediation: S.optional(Remediation),
    title: S.optional(S.String),
    detectorTags: S.optional(DetectorTags),
    detectorId: S.optional(S.String),
    detectorName: S.optional(S.String),
    ruleId: S.optional(S.String),
  }),
).annotate({ identifier: "Finding" }) as any as S.Schema<Finding>;
export type Findings = Finding[];
export const Findings = /*@__PURE__*/ S.Array(Finding);
export type ScanName = string;
export type ErrorCode =
  | "DUPLICATE_IDENTIFIER"
  | "ITEM_DOES_NOT_EXIST"
  | "INTERNAL_ERROR"
  | "INVALID_FINDING_ID"
  | "INVALID_SCAN_NAME"
  | (string & {});
export const ErrorCode = S.String;

export interface BatchGetFindingsError_ {
  scanName: string;
  findingId: string;
  errorCode: ErrorCode;
  message: string;
}
export const BatchGetFindingsError_ = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    scanName: S.String,
    findingId: S.String,
    errorCode: ErrorCode,
    message: S.String,
  }),
).annotate({
  identifier: "BatchGetFindingsError",
}) as any as S.Schema<BatchGetFindingsError_>;
export type BatchGetFindingsErrors = BatchGetFindingsError_[];
export const BatchGetFindingsErrors = /*@__PURE__*/ S.Array(
  BatchGetFindingsError_,
);
export interface BatchGetFindingsResponse {
  findings: Finding[];
  failedFindings: BatchGetFindingsError_[];
}
export const BatchGetFindingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ findings: Findings, failedFindings: BatchGetFindingsErrors }),
).annotate({
  identifier: "BatchGetFindingsResponse",
}) as any as S.Schema<BatchGetFindingsResponse>;
export type ClientToken = string;
export type Uuid = string;
export type ResourceId = { codeArtifactId: string };
export const ResourceId = /*@__PURE__*/ S.Union([
  S.Struct({ codeArtifactId: S.String }),
]);
export type ScanType = "Standard" | "Express" | (string & {});
export const ScanType = S.String;

export type AnalysisType = "Security" | "All" | (string & {});
export const AnalysisType = S.String;

export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateScanRequest {
  clientToken?: string;
  resourceId: ResourceId;
  scanName: string;
  scanType?: ScanType;
  analysisType?: AnalysisType;
  tags?: { [key: string]: string | undefined };
}
export const CreateScanRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    resourceId: ResourceId,
    scanName: S.String,
    scanType: S.optional(ScanType),
    analysisType: S.optional(AnalysisType),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/scans" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateScanRequest",
}) as any as S.Schema<CreateScanRequest>;
export type ScanState = "InProgress" | "Successful" | "Failed" | (string & {});
export const ScanState = S.String;

export type ScanNameArn = string;
export interface CreateScanResponse {
  scanName: string;
  runId: string;
  resourceId: ResourceId;
  scanState: ScanState;
  scanNameArn?: string;
}
export const CreateScanResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    scanName: S.String,
    runId: S.String,
    resourceId: ResourceId,
    scanState: ScanState,
    scanNameArn: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateScanResponse",
}) as any as S.Schema<CreateScanResponse>;
export interface CreateUploadUrlRequest {
  scanName: string;
}
export const CreateUploadUrlRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ scanName: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/uploadUrl" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateUploadUrlRequest",
}) as any as S.Schema<CreateUploadUrlRequest>;
export type S3Url = string | redacted.Redacted<string>;
export type HeaderKey = string;
export type HeaderValue = string;
export type RequestHeaderMap = { [key: string]: string | undefined };
export const RequestHeaderMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateUploadUrlResponse {
  s3Url: string | redacted.Redacted<string>;
  requestHeaders: { [key: string]: string | undefined };
  codeArtifactId: string;
}
export const CreateUploadUrlResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    s3Url: SensitiveString,
    requestHeaders: RequestHeaderMap,
    codeArtifactId: S.String,
  }),
).annotate({
  identifier: "CreateUploadUrlResponse",
}) as any as S.Schema<CreateUploadUrlResponse>;
export interface GetAccountConfigurationRequest {}
export const GetAccountConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/accountConfiguration/get" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAccountConfigurationRequest",
}) as any as S.Schema<GetAccountConfigurationRequest>;
export type KmsKeyArn = string;
export interface EncryptionConfig {
  kmsKeyArn?: string;
}
export const EncryptionConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ kmsKeyArn: S.optional(S.String) }),
).annotate({
  identifier: "EncryptionConfig",
}) as any as S.Schema<EncryptionConfig>;
export interface GetAccountConfigurationResponse {
  encryptionConfig: EncryptionConfig;
}
export const GetAccountConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ encryptionConfig: EncryptionConfig }),
).annotate({
  identifier: "GetAccountConfigurationResponse",
}) as any as S.Schema<GetAccountConfigurationResponse>;
export type NextToken = string;
export interface GetFindingsRequest {
  scanName: string;
  nextToken?: string;
  maxResults?: number;
  status?: Status;
}
export const GetFindingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    scanName: S.String.pipe(T.HttpLabel("scanName")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    status: S.optional(Status).pipe(T.HttpQuery("status")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/findings/{scanName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetFindingsRequest",
}) as any as S.Schema<GetFindingsRequest>;
export interface GetFindingsResponse {
  findings?: Finding[];
  nextToken?: string;
}
export const GetFindingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ findings: S.optional(Findings), nextToken: S.optional(S.String) }),
).annotate({
  identifier: "GetFindingsResponse",
}) as any as S.Schema<GetFindingsResponse>;
export interface GetMetricsSummaryRequest {
  date: Date;
}
export const GetMetricsSummaryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    date: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
      T.HttpQuery("date"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/metrics/summary" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMetricsSummaryRequest",
}) as any as S.Schema<GetMetricsSummaryRequest>;
export interface FindingMetricsValuePerSeverity {
  info?: number;
  low?: number;
  medium?: number;
  high?: number;
  critical?: number;
}
export const FindingMetricsValuePerSeverity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    info: S.optional(S.Number),
    low: S.optional(S.Number),
    medium: S.optional(S.Number),
    high: S.optional(S.Number),
    critical: S.optional(S.Number),
  }),
).annotate({
  identifier: "FindingMetricsValuePerSeverity",
}) as any as S.Schema<FindingMetricsValuePerSeverity>;
export interface CategoryWithFindingNum {
  categoryName?: string;
  findingNumber?: number;
}
export const CategoryWithFindingNum = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    categoryName: S.optional(S.String),
    findingNumber: S.optional(S.Number),
  }),
).annotate({
  identifier: "CategoryWithFindingNum",
}) as any as S.Schema<CategoryWithFindingNum>;
export type CategoriesWithMostFindings = CategoryWithFindingNum[];
export const CategoriesWithMostFindings = /*@__PURE__*/ S.Array(
  CategoryWithFindingNum,
);
export interface ScanNameWithFindingNum {
  scanName?: string;
  findingNumber?: number;
}
export const ScanNameWithFindingNum = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    scanName: S.optional(S.String),
    findingNumber: S.optional(S.Number),
  }),
).annotate({
  identifier: "ScanNameWithFindingNum",
}) as any as S.Schema<ScanNameWithFindingNum>;
export type ScansWithMostOpenFindings = ScanNameWithFindingNum[];
export const ScansWithMostOpenFindings = /*@__PURE__*/ S.Array(
  ScanNameWithFindingNum,
);
export type ScansWithMostOpenCriticalFindings = ScanNameWithFindingNum[];
export const ScansWithMostOpenCriticalFindings = /*@__PURE__*/ S.Array(
  ScanNameWithFindingNum,
);
export interface MetricsSummary {
  date?: Date;
  openFindings?: FindingMetricsValuePerSeverity;
  categoriesWithMostFindings?: CategoryWithFindingNum[];
  scansWithMostOpenFindings?: ScanNameWithFindingNum[];
  scansWithMostOpenCriticalFindings?: ScanNameWithFindingNum[];
}
export const MetricsSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    date: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    openFindings: S.optional(FindingMetricsValuePerSeverity),
    categoriesWithMostFindings: S.optional(CategoriesWithMostFindings),
    scansWithMostOpenFindings: S.optional(ScansWithMostOpenFindings),
    scansWithMostOpenCriticalFindings: S.optional(
      ScansWithMostOpenCriticalFindings,
    ),
  }),
).annotate({ identifier: "MetricsSummary" }) as any as S.Schema<MetricsSummary>;
export interface GetMetricsSummaryResponse {
  metricsSummary?: MetricsSummary;
}
export const GetMetricsSummaryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ metricsSummary: S.optional(MetricsSummary) }),
).annotate({
  identifier: "GetMetricsSummaryResponse",
}) as any as S.Schema<GetMetricsSummaryResponse>;
export interface GetScanRequest {
  scanName: string;
  runId?: string;
}
export const GetScanRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    scanName: S.String.pipe(T.HttpLabel("scanName")),
    runId: S.optional(S.String).pipe(T.HttpQuery("runId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/scans/{scanName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetScanRequest" }) as any as S.Schema<GetScanRequest>;
export type ErrorMessage = string;
export interface GetScanResponse {
  scanName: string;
  runId: string;
  scanState: ScanState;
  createdAt: Date;
  analysisType: AnalysisType;
  updatedAt?: Date;
  numberOfRevisions?: number;
  scanNameArn?: string;
  errorMessage?: string;
}
export const GetScanResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    scanName: S.String,
    runId: S.String,
    scanState: ScanState,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    analysisType: AnalysisType,
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    numberOfRevisions: S.optional(S.Number),
    scanNameArn: S.optional(S.String),
    errorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "GetScanResponse",
}) as any as S.Schema<GetScanResponse>;
export interface ListFindingsMetricsRequest {
  nextToken?: string;
  maxResults?: number;
  startDate: Date;
  endDate: Date;
}
export const ListFindingsMetricsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    startDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
      T.HttpQuery("startDate"),
    ),
    endDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
      T.HttpQuery("endDate"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/metrics/findings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListFindingsMetricsRequest",
}) as any as S.Schema<ListFindingsMetricsRequest>;
export interface AccountFindingsMetric {
  date?: Date;
  newFindings?: FindingMetricsValuePerSeverity;
  closedFindings?: FindingMetricsValuePerSeverity;
  openFindings?: FindingMetricsValuePerSeverity;
  meanTimeToClose?: FindingMetricsValuePerSeverity;
}
export const AccountFindingsMetric = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    date: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    newFindings: S.optional(FindingMetricsValuePerSeverity),
    closedFindings: S.optional(FindingMetricsValuePerSeverity),
    openFindings: S.optional(FindingMetricsValuePerSeverity),
    meanTimeToClose: S.optional(FindingMetricsValuePerSeverity),
  }),
).annotate({
  identifier: "AccountFindingsMetric",
}) as any as S.Schema<AccountFindingsMetric>;
export type FindingsMetricList = AccountFindingsMetric[];
export const FindingsMetricList = /*@__PURE__*/ S.Array(AccountFindingsMetric);
export interface ListFindingsMetricsResponse {
  findingsMetrics?: AccountFindingsMetric[];
  nextToken?: string;
}
export const ListFindingsMetricsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    findingsMetrics: S.optional(FindingsMetricList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListFindingsMetricsResponse",
}) as any as S.Schema<ListFindingsMetricsResponse>;
export interface ListScansRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListScansRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/scans" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListScansRequest",
}) as any as S.Schema<ListScansRequest>;
export interface ScanSummary {
  scanState: ScanState;
  createdAt: Date;
  updatedAt?: Date;
  scanName: string;
  runId: string;
  scanNameArn?: string;
}
export const ScanSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    scanState: ScanState,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    scanName: S.String,
    runId: S.String,
    scanNameArn: S.optional(S.String),
  }),
).annotate({ identifier: "ScanSummary" }) as any as S.Schema<ScanSummary>;
export type ScanSummaries = ScanSummary[];
export const ScanSummaries = /*@__PURE__*/ S.Array(ScanSummary);
export interface ListScansResponse {
  summaries?: ScanSummary[];
  nextToken?: string;
}
export const ListScansResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    summaries: S.optional(ScanSummaries),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListScansResponse",
}) as any as S.Schema<ListScansResponse>;
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
  S.Struct({ tags: S.optional(TagMap) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tags: TagMap,
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
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tagKeys: TagKeyList.pipe(T.HttpQuery("tagKeys")),
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
export interface UpdateAccountConfigurationRequest {
  encryptionConfig: EncryptionConfig;
}
export const UpdateAccountConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ encryptionConfig: EncryptionConfig }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/updateAccountConfiguration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAccountConfigurationRequest",
}) as any as S.Schema<UpdateAccountConfigurationRequest>;
export interface UpdateAccountConfigurationResponse {
  encryptionConfig: EncryptionConfig;
}
export const UpdateAccountConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ encryptionConfig: EncryptionConfig }),
).annotate({
  identifier: "UpdateAccountConfigurationResponse",
}) as any as S.Schema<UpdateAccountConfigurationResponse>;
export type ValidationExceptionReason =
  | "unknownOperation"
  | "cannotParse"
  | "fieldValidationFailed"
  | "other"
  | "lambdaCodeShaMisMatch"
  | (string & {});
export const ValidationExceptionReason = S.String;

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
export type BatchGetFindingsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of requested findings from standard scans.
 */
export const batchGetFindings: API.OperationMethod<
  BatchGetFindingsRequest,
  BatchGetFindingsResponse,
  BatchGetFindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetFindingsRequest,
  output: BatchGetFindingsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetFindings",
}));

export type CreateScanError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use to create a scan using code uploaded to an Amazon S3 bucket.
 */
export const createScan: API.OperationMethod<
  CreateScanRequest,
  CreateScanResponse,
  CreateScanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateScanRequest,
  output: CreateScanResponse,
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
  operationName: "CreateScan",
}));

export type CreateUploadUrlError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Generates a pre-signed URL, request headers used to upload a code resource, and code artifact identifier for the uploaded resource.
 *
 * You can upload your code resource to the URL with the request headers using any HTTP client.
 */
export const createUploadUrl: API.OperationMethod<
  CreateUploadUrlRequest,
  CreateUploadUrlResponse,
  CreateUploadUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateUploadUrlRequest,
  output: CreateUploadUrlResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUploadUrl",
}));

export type GetAccountConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use to get the encryption configuration for an account.
 */
export const getAccountConfiguration: API.OperationMethod<
  GetAccountConfigurationRequest,
  GetAccountConfigurationResponse,
  GetAccountConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAccountConfigurationRequest,
  output: GetAccountConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountConfiguration",
}));

export type GetFindingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of all findings generated by a particular scan.
 */
export const getFindings: API.PaginatedOperationMethod<
  GetFindingsRequest,
  GetFindingsResponse,
  GetFindingsError,
  Credentials | HttpClient.HttpClient,
  Finding
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetFindingsRequest,
  output: GetFindingsResponse,
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
  operationName: "GetFindings",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "findings",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetMetricsSummaryError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a summary of metrics for an account from a specified date, including number of open findings, the categories with most findings, the scans with most open findings, and scans with most open critical findings.
 */
export const getMetricsSummary: API.OperationMethod<
  GetMetricsSummaryRequest,
  GetMetricsSummaryResponse,
  GetMetricsSummaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMetricsSummaryRequest,
  output: GetMetricsSummaryResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMetricsSummary",
}));

export type GetScanError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns details about a scan, including whether or not a scan has completed.
 */
export const getScan: API.OperationMethod<
  GetScanRequest,
  GetScanResponse,
  GetScanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetScanRequest,
  output: GetScanResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetScan",
}));

export type ListFindingsMetricsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns metrics about all findings in an account within a specified time range.
 */
export const listFindingsMetrics: API.PaginatedOperationMethod<
  ListFindingsMetricsRequest,
  ListFindingsMetricsResponse,
  ListFindingsMetricsError,
  Credentials | HttpClient.HttpClient,
  AccountFindingsMetric
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListFindingsMetricsRequest,
  output: ListFindingsMetricsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFindingsMetrics",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "findingsMetrics",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListScansError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of all scans in an account. Does not return `EXPRESS` scans.
 */
export const listScans: API.PaginatedOperationMethod<
  ListScansRequest,
  ListScansResponse,
  ListScansError,
  Credentials | HttpClient.HttpClient,
  ScanSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListScansRequest,
  output: ListScansResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListScans",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "summaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of all tags associated with a scan.
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
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
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
 * Use to add one or more tags to an existing scan.
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
 * Use to remove one or more tags from an existing scan.
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

export type UpdateAccountConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use to update the encryption configuration for an account.
 */
export const updateAccountConfiguration: API.OperationMethod<
  UpdateAccountConfigurationRequest,
  UpdateAccountConfigurationResponse,
  UpdateAccountConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAccountConfigurationRequest,
  output: UpdateAccountConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAccountConfiguration",
}));
