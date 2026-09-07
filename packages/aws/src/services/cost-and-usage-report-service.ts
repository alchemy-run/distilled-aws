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
  sdkId: "Cost and Usage Report Service",
  serviceShapeName: "AWSOrigamiServiceGatewayService",
});
const auth = T.AwsAuthSigv4({ name: "cur" });
const ver = T.ServiceVersion("2017-01-06");
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
              `https://cur-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://cur-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://cur.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://cur.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class DuplicateReportNameException
  extends /*@__PURE__*/ S.TaggedError<DuplicateReportNameException>()(
    "DuplicateReportNameException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InternalErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalErrorException>()(
    "InternalErrorException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withServerError) {}
export class ReportBucketNotVerified
  extends /*@__PURE__*/ S.TaggedError<ReportBucketNotVerified>()(
    "ReportBucketNotVerified",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.SyntheticError({
      from: "ValidationException",
      message: { matches: "[Bb]ucket" },
    }),
  ).pipe(C.withRetryableError) {}
export class ReportLimitReachedException
  extends /*@__PURE__*/ S.TaggedError<ReportLimitReachedException>()(
    "ReportLimitReachedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export type ReportName = string;
export interface DeleteReportDefinitionRequest {
  ReportName: string;
}
export const DeleteReportDefinitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReportName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteReportDefinitionRequest",
}) as any as S.Schema<DeleteReportDefinitionRequest>;
export type DeleteResponseMessage = string;
export interface DeleteReportDefinitionResponse {
  ResponseMessage?: string;
}
export const DeleteReportDefinitionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResponseMessage: S.optional(S.String) }),
).annotate({
  identifier: "DeleteReportDefinitionResponse",
}) as any as S.Schema<DeleteReportDefinitionResponse>;
export type MaxResults = number;
export interface DescribeReportDefinitionsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeReportDefinitionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeReportDefinitionsRequest",
}) as any as S.Schema<DescribeReportDefinitionsRequest>;
export type TimeUnit = "HOURLY" | "DAILY" | "MONTHLY" | (string & {});
export const TimeUnit = S.String;

export type ReportFormat = "textORcsv" | "Parquet" | (string & {});
export const ReportFormat = S.String;

export type CompressionFormat = "ZIP" | "GZIP" | "Parquet" | (string & {});
export const CompressionFormat = S.String;

export type SchemaElement =
  | "RESOURCES"
  | "SPLIT_COST_ALLOCATION_DATA"
  | "MANUAL_DISCOUNT_COMPATIBILITY"
  | (string & {});
export const SchemaElement = S.String;

export type SchemaElementList = SchemaElement[];
export const SchemaElementList = /*@__PURE__*/ S.Array(SchemaElement);
export type S3Bucket = string;
export type S3Prefix = string;
export type AWSRegion =
  | "af-south-1"
  | "ap-east-1"
  | "ap-south-1"
  | "ap-south-2"
  | "ap-southeast-1"
  | "ap-southeast-2"
  | "ap-southeast-3"
  | "ap-northeast-1"
  | "ap-northeast-2"
  | "ap-northeast-3"
  | "ca-central-1"
  | "eu-central-1"
  | "eu-central-2"
  | "eu-west-1"
  | "eu-west-2"
  | "eu-west-3"
  | "eu-north-1"
  | "eu-south-1"
  | "eu-south-2"
  | "me-central-1"
  | "me-south-1"
  | "sa-east-1"
  | "us-east-1"
  | "us-east-2"
  | "us-west-1"
  | "us-west-2"
  | "cn-north-1"
  | "cn-northwest-1"
  | (string & {});
export const AWSRegion = S.String;

export type AdditionalArtifact =
  | "REDSHIFT"
  | "QUICKSIGHT"
  | "ATHENA"
  | (string & {});
export const AdditionalArtifact = S.String;

export type AdditionalArtifactList = AdditionalArtifact[];
export const AdditionalArtifactList = /*@__PURE__*/ S.Array(AdditionalArtifact);
export type RefreshClosedReports = boolean;
export type ReportVersioning =
  | "CREATE_NEW_REPORT"
  | "OVERWRITE_REPORT"
  | (string & {});
export const ReportVersioning = S.String;

export type BillingViewArn = string;
export type LastDelivery = string;
export type LastStatus =
  | "SUCCESS"
  | "ERROR_PERMISSIONS"
  | "ERROR_NO_BUCKET"
  | (string & {});
export const LastStatus = S.String;

export interface ReportStatus {
  lastDelivery?: string;
  lastStatus?: LastStatus;
}
export const ReportStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    lastDelivery: S.optional(S.String),
    lastStatus: S.optional(LastStatus),
  }),
).annotate({ identifier: "ReportStatus" }) as any as S.Schema<ReportStatus>;
export interface ReportDefinition {
  ReportName: string;
  TimeUnit: TimeUnit;
  Format: ReportFormat;
  Compression: CompressionFormat;
  AdditionalSchemaElements: SchemaElement[];
  S3Bucket: string;
  S3Prefix: string;
  S3Region: AWSRegion;
  AdditionalArtifacts?: AdditionalArtifact[];
  RefreshClosedReports?: boolean;
  ReportVersioning?: ReportVersioning;
  BillingViewArn?: string;
  ReportStatus?: ReportStatus;
}
export const ReportDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReportName: S.String,
    TimeUnit: TimeUnit,
    Format: ReportFormat,
    Compression: CompressionFormat,
    AdditionalSchemaElements: SchemaElementList,
    S3Bucket: S.String,
    S3Prefix: S.String,
    S3Region: AWSRegion,
    AdditionalArtifacts: S.optional(AdditionalArtifactList),
    RefreshClosedReports: S.optional(S.Boolean),
    ReportVersioning: S.optional(ReportVersioning),
    BillingViewArn: S.optional(S.String),
    ReportStatus: S.optional(ReportStatus),
  }),
).annotate({
  identifier: "ReportDefinition",
}) as any as S.Schema<ReportDefinition>;
export type ReportDefinitionList = ReportDefinition[];
export const ReportDefinitionList = /*@__PURE__*/ S.Array(ReportDefinition);
export interface DescribeReportDefinitionsResponse {
  ReportDefinitions?: ReportDefinition[];
  NextToken?: string;
}
export const DescribeReportDefinitionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReportDefinitions: S.optional(ReportDefinitionList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeReportDefinitionsResponse",
}) as any as S.Schema<DescribeReportDefinitionsResponse>;
export interface ListTagsForResourceRequest {
  ReportName: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReportName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
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
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(TagList) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface ModifyReportDefinitionRequest {
  ReportName: string;
  ReportDefinition: ReportDefinition;
}
export const ModifyReportDefinitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReportName: S.String, ReportDefinition: ReportDefinition }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ModifyReportDefinitionRequest",
}) as any as S.Schema<ModifyReportDefinitionRequest>;
export interface ModifyReportDefinitionResponse {}
export const ModifyReportDefinitionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "ModifyReportDefinitionResponse",
}) as any as S.Schema<ModifyReportDefinitionResponse>;
export interface PutReportDefinitionRequest {
  ReportDefinition: ReportDefinition;
  Tags?: Tag[];
}
export const PutReportDefinitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReportDefinition: ReportDefinition,
    Tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "PutReportDefinitionRequest",
}) as any as S.Schema<PutReportDefinitionRequest>;
export interface PutReportDefinitionResponse {}
export const PutReportDefinitionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutReportDefinitionResponse",
}) as any as S.Schema<PutReportDefinitionResponse>;
export interface TagResourceRequest {
  ReportName: string;
  Tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReportName: S.String, Tags: TagList }).pipe(
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
  ReportName: string;
  TagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReportName: S.String, TagKeys: TagKeyList }).pipe(
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
export type ErrorMessage = string;
export type DeleteReportDefinitionError =
  | InternalErrorException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified report. Any tags associated with the report are also
 * deleted.
 */
export const deleteReportDefinition: API.OperationMethod<
  DeleteReportDefinitionRequest,
  DeleteReportDefinitionResponse,
  DeleteReportDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteReportDefinitionRequest,
  output: DeleteReportDefinitionResponse,
  errors: [InternalErrorException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteReportDefinition",
}));

export type DescribeReportDefinitionsError =
  | InternalErrorException
  | CommonErrors;
/**
 * Lists the Amazon Web Services Cost and Usage Report available to this account.
 */
export const describeReportDefinitions: API.PaginatedOperationMethod<
  DescribeReportDefinitionsRequest,
  DescribeReportDefinitionsResponse,
  DescribeReportDefinitionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeReportDefinitionsRequest,
  output: DescribeReportDefinitionsResponse,
  errors: [InternalErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReportDefinitions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalErrorException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the tags associated with the specified report definition.
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
    InternalErrorException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ModifyReportDefinitionError =
  | InternalErrorException
  | ValidationException
  | ReportBucketNotVerified
  | CommonErrors;
/**
 * Allows you to programmatically update your report preferences.
 */
export const modifyReportDefinition: API.OperationMethod<
  ModifyReportDefinitionRequest,
  ModifyReportDefinitionResponse,
  ModifyReportDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyReportDefinitionRequest,
  output: ModifyReportDefinitionResponse,
  errors: [
    InternalErrorException,
    ValidationException,
    ReportBucketNotVerified,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyReportDefinition",
}));

export type PutReportDefinitionError =
  | DuplicateReportNameException
  | InternalErrorException
  | ReportLimitReachedException
  | ResourceNotFoundException
  | ValidationException
  | ReportBucketNotVerified
  | CommonErrors;
/**
 * Creates a new report using the description that you provide.
 */
export const putReportDefinition: API.OperationMethod<
  PutReportDefinitionRequest,
  PutReportDefinitionResponse,
  PutReportDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutReportDefinitionRequest,
  output: PutReportDefinitionResponse,
  errors: [
    DuplicateReportNameException,
    InternalErrorException,
    ReportLimitReachedException,
    ResourceNotFoundException,
    ValidationException,
    ReportBucketNotVerified,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutReportDefinition",
}));

export type TagResourceError =
  | InternalErrorException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Associates a set of tags with a report definition.
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
    InternalErrorException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InternalErrorException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates a set of tags from a report definition.
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
    InternalErrorException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));
