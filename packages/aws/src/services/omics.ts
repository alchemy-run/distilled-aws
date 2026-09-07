import * as HttpClient from "effect/unstable/http/HttpClient";
import * as S from "@distilled.cloud/core/schema";
import * as API from "@distilled.cloud/core/api";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc = T.AwsApiService({ sdkId: "Omics", serviceShapeName: "Omics" });
const auth = T.AwsAuthSigv4({ name: "omics" });
const ver = T.ServiceVersion("2022-11-28");
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
              `https://omics-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://omics-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://omics.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://omics.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(T.HttpError(500), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class NotSupportedOperationException
  extends /*@__PURE__*/ S.TaggedError<NotSupportedOperationException>()(
    "NotSupportedOperationException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(405),
  ).pipe(C.withBadRequestError) {}
export class RangeNotSatisfiableException
  extends /*@__PURE__*/ S.TaggedError<RangeNotSatisfiableException>()(
    "RangeNotSatisfiableException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(T.HttpError(416), T.Retryable()),
  ).pipe(C.withRetryableError) {}
export class RequestTimeoutException
  extends /*@__PURE__*/ S.TaggedError<RequestTimeoutException>()(
    "RequestTimeoutException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(408),
  ).pipe(C.withTimeoutError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(T.HttpError(429), T.Retryable({ throttling: true })),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type SequenceStoreId = string;
export type UploadId = string;
export interface AbortMultipartReadSetUploadRequest {
  sequenceStoreId: string;
  uploadId: string;
}
export const AbortMultipartReadSetUploadRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sequenceStoreId: S.String.pipe(T.HttpLabel("sequenceStoreId")),
    uploadId: S.String.pipe(T.HttpLabel("uploadId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/sequencestore/{sequenceStoreId}/upload/{uploadId}/abort",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AbortMultipartReadSetUploadRequest",
}) as any as S.Schema<AbortMultipartReadSetUploadRequest>;
export interface AbortMultipartReadSetUploadResponse {}
export const AbortMultipartReadSetUploadResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AbortMultipartReadSetUploadResponse",
}) as any as S.Schema<AbortMultipartReadSetUploadResponse>;
export interface AcceptShareRequest {
  shareId: string;
}
export const AcceptShareRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ shareId: S.String.pipe(T.HttpLabel("shareId")) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/share/{shareId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AcceptShareRequest",
}) as any as S.Schema<AcceptShareRequest>;
export type ShareStatus = string;
export interface AcceptShareResponse {
  status?: string;
}
export const AcceptShareResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: S.optional(S.String) }),
).annotate({
  identifier: "AcceptShareResponse",
}) as any as S.Schema<AcceptShareResponse>;
export type ReadSetId = string;
export type ReadSetIdList = string[];
export const ReadSetIdList = /*@__PURE__*/ S.Array(S.String);
export interface BatchDeleteReadSetRequest {
  ids: string[];
  sequenceStoreId: string;
}
export const BatchDeleteReadSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ids: ReadSetIdList,
    sequenceStoreId: S.String.pipe(T.HttpLabel("sequenceStoreId")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/sequencestore/{sequenceStoreId}/readset/batch/delete",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchDeleteReadSetRequest",
}) as any as S.Schema<BatchDeleteReadSetRequest>;
export interface ReadSetBatchError {
  id: string;
  code: string;
  message: string;
}
export const ReadSetBatchError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String, code: S.String, message: S.String }),
).annotate({
  identifier: "ReadSetBatchError",
}) as any as S.Schema<ReadSetBatchError>;
export type ReadSetBatchErrorList = ReadSetBatchError[];
export const ReadSetBatchErrorList = /*@__PURE__*/ S.Array(ReadSetBatchError);
export interface BatchDeleteReadSetResponse {
  errors?: ReadSetBatchError[];
}
export const BatchDeleteReadSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ errors: S.optional(ReadSetBatchErrorList) }),
).annotate({
  identifier: "BatchDeleteReadSetResponse",
}) as any as S.Schema<BatchDeleteReadSetResponse>;
export type ResourceId = string;
export interface CancelAnnotationImportRequest {
  jobId: string;
}
export const CancelAnnotationImportRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobId: S.String.pipe(T.HttpLabel("jobId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/import/annotation/{jobId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelAnnotationImportRequest",
}) as any as S.Schema<CancelAnnotationImportRequest>;
export interface CancelAnnotationImportResponse {}
export const CancelAnnotationImportResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CancelAnnotationImportResponse",
}) as any as S.Schema<CancelAnnotationImportResponse>;
export type RunId = string;
export interface CancelRunRequest {
  id: string;
}
export const CancelRunRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/run/{id}/cancel" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelRunRequest",
}) as any as S.Schema<CancelRunRequest>;
export interface CancelRunResponse {}
export const CancelRunResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CancelRunResponse",
}) as any as S.Schema<CancelRunResponse>;
export type BatchId = string;
export interface CancelRunBatchRequest {
  batchId: string;
}
export const CancelRunBatchRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ batchId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/runBatch/cancel" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelRunBatchRequest",
}) as any as S.Schema<CancelRunBatchRequest>;
export interface CancelRunBatchResponse {}
export const CancelRunBatchResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CancelRunBatchResponse",
}) as any as S.Schema<CancelRunBatchResponse>;
export interface CancelVariantImportRequest {
  jobId: string;
}
export const CancelVariantImportRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobId: S.String.pipe(T.HttpLabel("jobId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/import/variant/{jobId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelVariantImportRequest",
}) as any as S.Schema<CancelVariantImportRequest>;
export interface CancelVariantImportResponse {}
export const CancelVariantImportResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CancelVariantImportResponse",
}) as any as S.Schema<CancelVariantImportResponse>;
export type ReadSetPartSource = string;
export interface CompleteReadSetUploadPartListItem {
  partNumber: number;
  partSource: string;
  checksum: string;
}
export const CompleteReadSetUploadPartListItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ partNumber: S.Number, partSource: S.String, checksum: S.String }),
).annotate({
  identifier: "CompleteReadSetUploadPartListItem",
}) as any as S.Schema<CompleteReadSetUploadPartListItem>;
export type CompleteReadSetUploadPartList = CompleteReadSetUploadPartListItem[];
export const CompleteReadSetUploadPartList = /*@__PURE__*/ S.Array(
  CompleteReadSetUploadPartListItem,
);
export interface CompleteMultipartReadSetUploadRequest {
  sequenceStoreId: string;
  uploadId: string;
  parts: CompleteReadSetUploadPartListItem[];
}
export const CompleteMultipartReadSetUploadRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      sequenceStoreId: S.String.pipe(T.HttpLabel("sequenceStoreId")),
      uploadId: S.String.pipe(T.HttpLabel("uploadId")),
      parts: CompleteReadSetUploadPartList,
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/sequencestore/{sequenceStoreId}/upload/{uploadId}/complete",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CompleteMultipartReadSetUploadRequest",
}) as any as S.Schema<CompleteMultipartReadSetUploadRequest>;
export interface CompleteMultipartReadSetUploadResponse {
  readSetId: string;
}
export const CompleteMultipartReadSetUploadResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ readSetId: S.String }),
).annotate({
  identifier: "CompleteMultipartReadSetUploadResponse",
}) as any as S.Schema<CompleteMultipartReadSetUploadResponse>;
export type ReferenceArn = string;
export type ReferenceItem = { referenceArn: string };
export const ReferenceItem = /*@__PURE__*/ S.Union([
  S.Struct({ referenceArn: S.String }),
]);
export type StoreName = string;
export type Description = string;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type VersionName = string;
export type EncryptionType = string;
export interface SseConfig {
  type: string;
  keyArn?: string;
}
export const SseConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ type: S.String, keyArn: S.optional(S.String) }),
).annotate({ identifier: "SseConfig" }) as any as S.Schema<SseConfig>;
export type StoreFormat = string;
export type AnnotationType = string;
export type FormatToHeaderKey = string;
export type FormatToHeader = { [key: string]: string | undefined };
export const FormatToHeader = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type SchemaValueType = string;
export type SchemaItem = { [key: string]: string | undefined };
export const SchemaItem = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type Schema = { [key: string]: string | undefined }[];
export const Schema = /*@__PURE__*/ S.Array(SchemaItem);
export interface TsvStoreOptions {
  annotationType?: string;
  formatToHeader?: { [key: string]: string | undefined };
  schema?: { [key: string]: string | undefined }[];
}
export const TsvStoreOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    annotationType: S.optional(S.String),
    formatToHeader: S.optional(FormatToHeader),
    schema: S.optional(Schema),
  }),
).annotate({
  identifier: "TsvStoreOptions",
}) as any as S.Schema<TsvStoreOptions>;
export type StoreOptions = { tsvStoreOptions: TsvStoreOptions };
export const StoreOptions = /*@__PURE__*/ S.Union([
  S.Struct({ tsvStoreOptions: TsvStoreOptions }),
]);
export interface CreateAnnotationStoreRequest {
  reference?: ReferenceItem;
  name?: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
  versionName?: string;
  sseConfig?: SseConfig;
  storeFormat: string;
  storeOptions?: StoreOptions;
}
export const CreateAnnotationStoreRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    reference: S.optional(ReferenceItem),
    name: S.optional(S.String),
    description: S.optional(S.String),
    tags: S.optional(TagMap),
    versionName: S.optional(S.String),
    sseConfig: S.optional(SseConfig),
    storeFormat: S.String,
    storeOptions: S.optional(StoreOptions),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/annotationStore" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateAnnotationStoreRequest",
}) as any as S.Schema<CreateAnnotationStoreRequest>;
export type StoreStatus = string;
export type CreationTime = Date;
export interface CreateAnnotationStoreResponse {
  id: string;
  reference?: ReferenceItem;
  storeFormat?: string;
  storeOptions?: StoreOptions;
  status: string;
  name: string;
  versionName: string;
  creationTime: Date;
}
export const CreateAnnotationStoreResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    reference: S.optional(ReferenceItem),
    storeFormat: S.optional(S.String),
    storeOptions: S.optional(StoreOptions),
    status: S.String,
    name: S.String,
    versionName: S.String,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "CreateAnnotationStoreResponse",
}) as any as S.Schema<CreateAnnotationStoreResponse>;
export interface TsvVersionOptions {
  annotationType?: string;
  formatToHeader?: { [key: string]: string | undefined };
  schema?: { [key: string]: string | undefined }[];
}
export const TsvVersionOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    annotationType: S.optional(S.String),
    formatToHeader: S.optional(FormatToHeader),
    schema: S.optional(Schema),
  }),
).annotate({
  identifier: "TsvVersionOptions",
}) as any as S.Schema<TsvVersionOptions>;
export type VersionOptions = { tsvVersionOptions: TsvVersionOptions };
export const VersionOptions = /*@__PURE__*/ S.Union([
  S.Struct({ tsvVersionOptions: TsvVersionOptions }),
]);
export interface CreateAnnotationStoreVersionRequest {
  name: string;
  versionName: string;
  description?: string;
  versionOptions?: VersionOptions;
  tags?: { [key: string]: string | undefined };
}
export const CreateAnnotationStoreVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    versionName: S.String,
    description: S.optional(S.String),
    versionOptions: S.optional(VersionOptions),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/annotationStore/{name}/version" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateAnnotationStoreVersionRequest",
}) as any as S.Schema<CreateAnnotationStoreVersionRequest>;
export type VersionStatus = string;
export interface CreateAnnotationStoreVersionResponse {
  id: string;
  versionName: string;
  storeId: string;
  versionOptions?: VersionOptions;
  name: string;
  status: string;
  creationTime: Date;
}
export const CreateAnnotationStoreVersionResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      id: S.String,
      versionName: S.String,
      storeId: S.String,
      versionOptions: S.optional(VersionOptions),
      name: S.String,
      status: S.String,
      creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    }),
).annotate({
  identifier: "CreateAnnotationStoreVersionResponse",
}) as any as S.Schema<CreateAnnotationStoreVersionResponse>;
export type ConfigurationName = string;
export type ConfigurationDescription = string;
export type SecurityGroupId = string;
export type SecurityGroupIds = string[];
export const SecurityGroupIds = /*@__PURE__*/ S.Array(S.String);
export type SubnetId = string;
export type SubnetIds = string[];
export const SubnetIds = /*@__PURE__*/ S.Array(S.String);
export interface VpcConfig {
  securityGroupIds?: string[];
  subnetIds?: string[];
}
export const VpcConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    securityGroupIds: S.optional(SecurityGroupIds),
    subnetIds: S.optional(SubnetIds),
  }),
).annotate({ identifier: "VpcConfig" }) as any as S.Schema<VpcConfig>;
export interface RunConfigurations {
  vpcConfig?: VpcConfig;
}
export const RunConfigurations = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ vpcConfig: S.optional(VpcConfig) }),
).annotate({
  identifier: "RunConfigurations",
}) as any as S.Schema<RunConfigurations>;
export type ConfigurationRequestId = string;
export interface CreateConfigurationRequest {
  name: string;
  description?: string;
  runConfigurations: RunConfigurations;
  tags?: { [key: string]: string | undefined };
  requestId: string;
}
export const CreateConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    runConfigurations: RunConfigurations,
    tags: S.optional(TagMap),
    requestId: S.String.pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/configuration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateConfigurationRequest",
}) as any as S.Schema<CreateConfigurationRequest>;
export type ConfigurationArn = string;
export type ConfigurationUuid = string;
export type VpcId = string;
export interface VpcConfigResponse {
  securityGroupIds?: string[];
  subnetIds?: string[];
  vpcId?: string;
}
export const VpcConfigResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    securityGroupIds: S.optional(SecurityGroupIds),
    subnetIds: S.optional(SubnetIds),
    vpcId: S.optional(S.String),
  }),
).annotate({
  identifier: "VpcConfigResponse",
}) as any as S.Schema<VpcConfigResponse>;
export interface RunConfigurationsResponse {
  vpcConfig?: VpcConfigResponse;
}
export const RunConfigurationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ vpcConfig: S.optional(VpcConfigResponse) }),
).annotate({
  identifier: "RunConfigurationsResponse",
}) as any as S.Schema<RunConfigurationsResponse>;
export type ConfigurationStatus = string;
export type ConfigurationTimestamp = Date;
export interface CreateConfigurationResponse {
  arn?: string;
  uuid?: string;
  name?: string;
  description?: string;
  runConfigurations?: RunConfigurationsResponse;
  status?: string;
  creationTime?: Date;
  tags?: { [key: string]: string | undefined };
}
export const CreateConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    uuid: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    runConfigurations: S.optional(RunConfigurationsResponse),
    status: S.optional(S.String),
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "CreateConfigurationResponse",
}) as any as S.Schema<CreateConfigurationResponse>;
export type ClientToken = string;
export type FileType = string;
export type SubjectId = string;
export type SampleId = string;
export type GeneratedFrom = string;
export type ReadSetName = string;
export type ReadSetDescription = string;
export interface CreateMultipartReadSetUploadRequest {
  sequenceStoreId: string;
  clientToken?: string;
  sourceFileType: string;
  subjectId: string;
  sampleId: string;
  generatedFrom?: string;
  referenceArn?: string;
  name: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateMultipartReadSetUploadRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sequenceStoreId: S.String.pipe(T.HttpLabel("sequenceStoreId")),
    clientToken: S.optional(S.String),
    sourceFileType: S.String,
    subjectId: S.String,
    sampleId: S.String,
    generatedFrom: S.optional(S.String),
    referenceArn: S.optional(S.String),
    name: S.String,
    description: S.optional(S.String),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/sequencestore/{sequenceStoreId}/upload",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateMultipartReadSetUploadRequest",
}) as any as S.Schema<CreateMultipartReadSetUploadRequest>;
export interface CreateMultipartReadSetUploadResponse {
  sequenceStoreId: string;
  uploadId: string;
  sourceFileType: string;
  subjectId: string;
  sampleId: string;
  generatedFrom?: string;
  referenceArn: string;
  name?: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
  creationTime: Date;
}
export const CreateMultipartReadSetUploadResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      sequenceStoreId: S.String,
      uploadId: S.String,
      sourceFileType: S.String,
      subjectId: S.String,
      sampleId: S.String,
      generatedFrom: S.optional(S.String),
      referenceArn: S.String,
      name: S.optional(S.String),
      description: S.optional(S.String),
      tags: S.optional(TagMap),
      creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    }),
).annotate({
  identifier: "CreateMultipartReadSetUploadResponse",
}) as any as S.Schema<CreateMultipartReadSetUploadResponse>;
export type ReferenceStoreName = string;
export type ReferenceStoreDescription = string;
export interface CreateReferenceStoreRequest {
  name: string;
  description?: string;
  sseConfig?: SseConfig;
  tags?: { [key: string]: string | undefined };
  clientToken?: string;
}
export const CreateReferenceStoreRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    sseConfig: S.optional(SseConfig),
    tags: S.optional(TagMap),
    clientToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/referencestore" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateReferenceStoreRequest",
}) as any as S.Schema<CreateReferenceStoreRequest>;
export type ReferenceStoreId = string;
export type ReferenceStoreArn = string;
export interface CreateReferenceStoreResponse {
  id: string;
  arn: string;
  name?: string;
  description?: string;
  sseConfig?: SseConfig;
  creationTime: Date;
}
export const CreateReferenceStoreResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    name: S.optional(S.String),
    description: S.optional(S.String),
    sseConfig: S.optional(SseConfig),
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "CreateReferenceStoreResponse",
}) as any as S.Schema<CreateReferenceStoreResponse>;
export type CacheBehavior = string;
export type S3UriForBucketOrObject = string;
export type UserCustomDescription = string;
export type UserCustomName = string;
export type RunCacheRequestId = string;
export type AwsAccountId = string;
export interface CreateRunCacheRequest {
  cacheBehavior?: string;
  cacheS3Location: string;
  description?: string;
  name?: string;
  requestId: string;
  tags?: { [key: string]: string | undefined };
  cacheBucketOwnerId?: string;
}
export const CreateRunCacheRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cacheBehavior: S.optional(S.String),
    cacheS3Location: S.String,
    description: S.optional(S.String),
    name: S.optional(S.String),
    requestId: S.String.pipe(T.IdempotencyToken()),
    tags: S.optional(TagMap),
    cacheBucketOwnerId: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/runCache" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateRunCacheRequest",
}) as any as S.Schema<CreateRunCacheRequest>;
export type RunCacheArn = string;
export type RunCacheId = string;
export type RunCacheStatus = string;
export interface CreateRunCacheResponse {
  arn?: string;
  id?: string;
  status?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateRunCacheResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    id: S.optional(S.String),
    status: S.optional(S.String),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "CreateRunCacheResponse",
}) as any as S.Schema<CreateRunCacheResponse>;
export type RunGroupName = string;
export type RunGroupRequestId = string;
export interface CreateRunGroupRequest {
  name?: string;
  maxCpus?: number;
  maxRuns?: number;
  maxDuration?: number;
  tags?: { [key: string]: string | undefined };
  requestId: string;
  maxGpus?: number;
}
export const CreateRunGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    maxCpus: S.optional(S.Number),
    maxRuns: S.optional(S.Number),
    maxDuration: S.optional(S.Number),
    tags: S.optional(TagMap),
    requestId: S.String.pipe(T.IdempotencyToken()),
    maxGpus: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/runGroup" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateRunGroupRequest",
}) as any as S.Schema<CreateRunGroupRequest>;
export type RunGroupArn = string;
export type RunGroupId = string;
export interface CreateRunGroupResponse {
  arn?: string;
  id?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateRunGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    id: S.optional(S.String),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "CreateRunGroupResponse",
}) as any as S.Schema<CreateRunGroupResponse>;
export type SequenceStoreName = string;
export type SequenceStoreDescription = string;
export type FallbackLocation = string;
export type ETagAlgorithmFamily = string;
export type PropagatedSetLevelTags = string[];
export const PropagatedSetLevelTags = /*@__PURE__*/ S.Array(S.String);
export type AccessLogLocation = string;
export interface S3AccessConfig {
  accessLogLocation?: string;
}
export const S3AccessConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ accessLogLocation: S.optional(S.String) }),
).annotate({ identifier: "S3AccessConfig" }) as any as S.Schema<S3AccessConfig>;
export interface CreateSequenceStoreRequest {
  name: string;
  description?: string;
  sseConfig?: SseConfig;
  tags?: { [key: string]: string | undefined };
  clientToken?: string;
  fallbackLocation?: string;
  eTagAlgorithmFamily?: string;
  propagatedSetLevelTags?: string[];
  s3AccessConfig?: S3AccessConfig;
}
export const CreateSequenceStoreRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    sseConfig: S.optional(SseConfig),
    tags: S.optional(TagMap),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    fallbackLocation: S.optional(S.String),
    eTagAlgorithmFamily: S.optional(S.String),
    propagatedSetLevelTags: S.optional(PropagatedSetLevelTags),
    s3AccessConfig: S.optional(S3AccessConfig),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/sequencestore" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateSequenceStoreRequest",
}) as any as S.Schema<CreateSequenceStoreRequest>;
export type SequenceStoreArn = string;
export type SequenceStoreStatus = string;
export type SequenceStoreStatusMessage = string;
export type S3Uri = string;
export type S3AccessPointArn = string;
export interface SequenceStoreS3Access {
  s3Uri?: string;
  s3AccessPointArn?: string;
  accessLogLocation?: string;
}
export const SequenceStoreS3Access = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    s3Uri: S.optional(S.String),
    s3AccessPointArn: S.optional(S.String),
    accessLogLocation: S.optional(S.String),
  }),
).annotate({
  identifier: "SequenceStoreS3Access",
}) as any as S.Schema<SequenceStoreS3Access>;
export interface CreateSequenceStoreResponse {
  id: string;
  arn: string;
  name?: string;
  description?: string;
  sseConfig?: SseConfig;
  creationTime: Date;
  fallbackLocation?: string;
  eTagAlgorithmFamily?: string;
  status?: string;
  statusMessage?: string;
  propagatedSetLevelTags?: string[];
  s3Access?: SequenceStoreS3Access;
}
export const CreateSequenceStoreResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    name: S.optional(S.String),
    description: S.optional(S.String),
    sseConfig: S.optional(SseConfig),
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    fallbackLocation: S.optional(S.String),
    eTagAlgorithmFamily: S.optional(S.String),
    status: S.optional(S.String),
    statusMessage: S.optional(S.String),
    propagatedSetLevelTags: S.optional(PropagatedSetLevelTags),
    s3Access: S.optional(SequenceStoreS3Access),
  }),
).annotate({
  identifier: "CreateSequenceStoreResponse",
}) as any as S.Schema<CreateSequenceStoreResponse>;
export type ShareName = string;
export interface CreateShareRequest {
  resourceArn: string;
  principalSubscriber: string;
  shareName?: string;
}
export const CreateShareRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String,
    principalSubscriber: S.String,
    shareName: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/share" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateShareRequest",
}) as any as S.Schema<CreateShareRequest>;
export interface CreateShareResponse {
  shareId?: string;
  status?: string;
  shareName?: string;
}
export const CreateShareResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    shareId: S.optional(S.String),
    status: S.optional(S.String),
    shareName: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateShareResponse",
}) as any as S.Schema<CreateShareResponse>;
export interface CreateVariantStoreRequest {
  reference: ReferenceItem;
  name?: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
  sseConfig?: SseConfig;
}
export const CreateVariantStoreRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    reference: ReferenceItem,
    name: S.optional(S.String),
    description: S.optional(S.String),
    tags: S.optional(TagMap),
    sseConfig: S.optional(SseConfig),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/variantStore" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateVariantStoreRequest",
}) as any as S.Schema<CreateVariantStoreRequest>;
export interface CreateVariantStoreResponse {
  id: string;
  reference?: ReferenceItem;
  status: string;
  name: string;
  creationTime: Date;
}
export const CreateVariantStoreResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    reference: S.optional(ReferenceItem),
    status: S.String,
    name: S.String,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "CreateVariantStoreResponse",
}) as any as S.Schema<CreateVariantStoreResponse>;
export type WorkflowName = string;
export type WorkflowDescription = string;
export type WorkflowEngine = string;
export type WorkflowDefinition = string;
export type WorkflowMain = string;
export type WorkflowParameterName = string;
export type WorkflowParameterDescription = string;
export interface WorkflowParameter {
  description?: string;
  optional?: boolean;
}
export const WorkflowParameter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    description: S.optional(S.String),
    optional: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "WorkflowParameter",
}) as any as S.Schema<WorkflowParameter>;
export type WorkflowParameterTemplate = {
  [key: string]: WorkflowParameter | undefined;
};
export const WorkflowParameterTemplate = /*@__PURE__*/ S.Record(
  S.String,
  WorkflowParameter.pipe(S.optional),
);
export type WorkflowRequestId = string;
export type Accelerators = string;
export type StorageType = string;
export type Uri = string;
export type EcrRepositoryPrefix = string;
export type UpstreamRepositoryPrefix = string;
export interface RegistryMapping {
  upstreamRegistryUrl?: string;
  ecrRepositoryPrefix?: string;
  upstreamRepositoryPrefix?: string;
  ecrAccountId?: string;
}
export const RegistryMapping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    upstreamRegistryUrl: S.optional(S.String),
    ecrRepositoryPrefix: S.optional(S.String),
    upstreamRepositoryPrefix: S.optional(S.String),
    ecrAccountId: S.optional(S.String),
  }),
).annotate({
  identifier: "RegistryMapping",
}) as any as S.Schema<RegistryMapping>;
export type RegistryMappingsList = RegistryMapping[];
export const RegistryMappingsList = /*@__PURE__*/ S.Array(RegistryMapping);
export interface ImageMapping {
  sourceImage?: string;
  destinationImage?: string;
}
export const ImageMapping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceImage: S.optional(S.String),
    destinationImage: S.optional(S.String),
  }),
).annotate({ identifier: "ImageMapping" }) as any as S.Schema<ImageMapping>;
export type ImageMappingsList = ImageMapping[];
export const ImageMappingsList = /*@__PURE__*/ S.Array(ImageMapping);
export interface ContainerRegistryMap {
  registryMappings?: RegistryMapping[];
  imageMappings?: ImageMapping[];
}
export const ContainerRegistryMap = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    registryMappings: S.optional(RegistryMappingsList),
    imageMappings: S.optional(ImageMappingsList),
  }),
).annotate({
  identifier: "ContainerRegistryMap",
}) as any as S.Schema<ContainerRegistryMap>;
export type ReadmeMarkdown = string;
export type ParameterTemplatePath = string;
export type ReadmePath = string;
export type ConnectionArn = string;
export type FullRepositoryId = string;
export type SourceReferenceType = string;
export type SourceReferenceValue = string;
export interface SourceReference {
  type: string;
  value: string;
}
export const SourceReference = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ type: S.String, value: S.String }),
).annotate({
  identifier: "SourceReference",
}) as any as S.Schema<SourceReference>;
export type ExcludeFilePatternList = string[];
export const ExcludeFilePatternList = /*@__PURE__*/ S.Array(S.String);
export interface DefinitionRepository {
  connectionArn: string;
  fullRepositoryId: string;
  sourceReference?: SourceReference;
  excludeFilePatterns?: string[];
}
export const DefinitionRepository = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    connectionArn: S.String,
    fullRepositoryId: S.String,
    sourceReference: S.optional(SourceReference),
    excludeFilePatterns: S.optional(ExcludeFilePatternList),
  }),
).annotate({
  identifier: "DefinitionRepository",
}) as any as S.Schema<DefinitionRepository>;
export type WorkflowBucketOwnerId = string;
export type S3UriForObject = string;
export interface CreateWorkflowRequest {
  name?: string;
  description?: string;
  engine?: string;
  definitionZip?: Uint8Array;
  definitionUri?: string;
  main?: string;
  parameterTemplate?: { [key: string]: WorkflowParameter | undefined };
  storageCapacity?: number;
  tags?: { [key: string]: string | undefined };
  requestId: string;
  accelerators?: string;
  storageType?: string;
  containerRegistryMap?: ContainerRegistryMap;
  containerRegistryMapUri?: string;
  readmeMarkdown?: string;
  parameterTemplatePath?: string;
  readmePath?: string;
  definitionRepository?: DefinitionRepository;
  workflowBucketOwnerId?: string;
  readmeUri?: string;
}
export const CreateWorkflowRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    description: S.optional(S.String),
    engine: S.optional(S.String),
    definitionZip: S.optional(T.Blob),
    definitionUri: S.optional(S.String),
    main: S.optional(S.String),
    parameterTemplate: S.optional(WorkflowParameterTemplate),
    storageCapacity: S.optional(S.Number),
    tags: S.optional(TagMap),
    requestId: S.String.pipe(T.IdempotencyToken()),
    accelerators: S.optional(S.String),
    storageType: S.optional(S.String),
    containerRegistryMap: S.optional(ContainerRegistryMap),
    containerRegistryMapUri: S.optional(S.String),
    readmeMarkdown: S.optional(S.String),
    parameterTemplatePath: S.optional(S.String),
    readmePath: S.optional(S.String),
    definitionRepository: S.optional(DefinitionRepository),
    workflowBucketOwnerId: S.optional(S.String),
    readmeUri: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/workflow" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateWorkflowRequest",
}) as any as S.Schema<CreateWorkflowRequest>;
export type WorkflowArn = string;
export type WorkflowId = string;
export type WorkflowStatus = string;
export type WorkflowUuid = string;
export interface CreateWorkflowResponse {
  arn?: string;
  id?: string;
  status?: string;
  tags?: { [key: string]: string | undefined };
  uuid?: string;
}
export const CreateWorkflowResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    id: S.optional(S.String),
    status: S.optional(S.String),
    tags: S.optional(TagMap),
    uuid: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateWorkflowResponse",
}) as any as S.Schema<CreateWorkflowResponse>;
export type WorkflowVersionName = string;
export type WorkflowVersionDescription = string;
export interface CreateWorkflowVersionRequest {
  workflowId: string;
  versionName: string;
  definitionZip?: Uint8Array;
  definitionUri?: string;
  accelerators?: string;
  description?: string;
  engine?: string;
  main?: string;
  parameterTemplate?: { [key: string]: WorkflowParameter | undefined };
  requestId: string;
  storageType?: string;
  storageCapacity?: number;
  tags?: { [key: string]: string | undefined };
  workflowBucketOwnerId?: string;
  containerRegistryMap?: ContainerRegistryMap;
  containerRegistryMapUri?: string;
  readmeMarkdown?: string;
  parameterTemplatePath?: string;
  readmePath?: string;
  definitionRepository?: DefinitionRepository;
  readmeUri?: string;
}
export const CreateWorkflowVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workflowId: S.String.pipe(T.HttpLabel("workflowId")),
    versionName: S.String,
    definitionZip: S.optional(T.Blob),
    definitionUri: S.optional(S.String),
    accelerators: S.optional(S.String),
    description: S.optional(S.String),
    engine: S.optional(S.String),
    main: S.optional(S.String),
    parameterTemplate: S.optional(WorkflowParameterTemplate),
    requestId: S.String.pipe(T.IdempotencyToken()),
    storageType: S.optional(S.String),
    storageCapacity: S.optional(S.Number),
    tags: S.optional(TagMap),
    workflowBucketOwnerId: S.optional(S.String),
    containerRegistryMap: S.optional(ContainerRegistryMap),
    containerRegistryMapUri: S.optional(S.String),
    readmeMarkdown: S.optional(S.String),
    parameterTemplatePath: S.optional(S.String),
    readmePath: S.optional(S.String),
    definitionRepository: S.optional(DefinitionRepository),
    readmeUri: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/workflow/{workflowId}/version" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateWorkflowVersionRequest",
}) as any as S.Schema<CreateWorkflowVersionRequest>;
export type WorkflowVersionArn = string;
export interface CreateWorkflowVersionResponse {
  arn?: string;
  workflowId?: string;
  versionName?: string;
  status?: string;
  tags?: { [key: string]: string | undefined };
  uuid?: string;
}
export const CreateWorkflowVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    workflowId: S.optional(S.String),
    versionName: S.optional(S.String),
    status: S.optional(S.String),
    tags: S.optional(TagMap),
    uuid: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateWorkflowVersionResponse",
}) as any as S.Schema<CreateWorkflowVersionResponse>;
export interface DeleteAnnotationStoreRequest {
  name: string;
  force?: boolean;
}
export const DeleteAnnotationStoreRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    force: S.optional(S.Boolean).pipe(T.HttpQuery("force")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/annotationStore/{name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAnnotationStoreRequest",
}) as any as S.Schema<DeleteAnnotationStoreRequest>;
export interface DeleteAnnotationStoreResponse {
  status: string;
}
export const DeleteAnnotationStoreResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: S.String }),
).annotate({
  identifier: "DeleteAnnotationStoreResponse",
}) as any as S.Schema<DeleteAnnotationStoreResponse>;
export type VersionList = string[];
export const VersionList = /*@__PURE__*/ S.Array(S.String);
export interface DeleteAnnotationStoreVersionsRequest {
  name: string;
  versions: string[];
  force?: boolean;
}
export const DeleteAnnotationStoreVersionsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      name: S.String.pipe(T.HttpLabel("name")),
      versions: VersionList,
      force: S.optional(S.Boolean).pipe(T.HttpQuery("force")),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/annotationStore/{name}/versions/delete",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteAnnotationStoreVersionsRequest",
}) as any as S.Schema<DeleteAnnotationStoreVersionsRequest>;
export interface VersionDeleteError {
  versionName: string;
  message: string;
}
export const VersionDeleteError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ versionName: S.String, message: S.String }),
).annotate({
  identifier: "VersionDeleteError",
}) as any as S.Schema<VersionDeleteError>;
export type VersionDeleteErrorList = VersionDeleteError[];
export const VersionDeleteErrorList = /*@__PURE__*/ S.Array(VersionDeleteError);
export interface DeleteAnnotationStoreVersionsResponse {
  errors?: VersionDeleteError[];
}
export const DeleteAnnotationStoreVersionsResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ errors: S.optional(VersionDeleteErrorList) }),
).annotate({
  identifier: "DeleteAnnotationStoreVersionsResponse",
}) as any as S.Schema<DeleteAnnotationStoreVersionsResponse>;
export interface DeleteBatchRequest {
  batchId: string;
}
export const DeleteBatchRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ batchId: S.String.pipe(T.HttpLabel("batchId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/runBatch/{batchId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteBatchRequest",
}) as any as S.Schema<DeleteBatchRequest>;
export interface DeleteBatchResponse {}
export const DeleteBatchResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteBatchResponse",
}) as any as S.Schema<DeleteBatchResponse>;
export interface DeleteConfigurationRequest {
  name: string;
}
export const DeleteConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String.pipe(T.HttpLabel("name")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/configuration/{name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteConfigurationRequest",
}) as any as S.Schema<DeleteConfigurationRequest>;
export interface DeleteConfigurationResponse {}
export const DeleteConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteConfigurationResponse",
}) as any as S.Schema<DeleteConfigurationResponse>;
export type ReferenceId = string;
export interface DeleteReferenceRequest {
  id: string;
  referenceStoreId: string;
}
export const DeleteReferenceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    referenceStoreId: S.String.pipe(T.HttpLabel("referenceStoreId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/referencestore/{referenceStoreId}/reference/{id}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteReferenceRequest",
}) as any as S.Schema<DeleteReferenceRequest>;
export interface DeleteReferenceResponse {}
export const DeleteReferenceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteReferenceResponse",
}) as any as S.Schema<DeleteReferenceResponse>;
export interface DeleteReferenceStoreRequest {
  id: string;
}
export const DeleteReferenceStoreRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/referencestore/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteReferenceStoreRequest",
}) as any as S.Schema<DeleteReferenceStoreRequest>;
export interface DeleteReferenceStoreResponse {}
export const DeleteReferenceStoreResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteReferenceStoreResponse",
}) as any as S.Schema<DeleteReferenceStoreResponse>;
export interface DeleteRunRequest {
  id: string;
}
export const DeleteRunRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/run/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteRunRequest",
}) as any as S.Schema<DeleteRunRequest>;
export interface DeleteRunResponse {}
export const DeleteRunResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteRunResponse",
}) as any as S.Schema<DeleteRunResponse>;
export interface DeleteRunBatchRequest {
  batchId: string;
}
export const DeleteRunBatchRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ batchId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/runBatch/delete" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteRunBatchRequest",
}) as any as S.Schema<DeleteRunBatchRequest>;
export interface DeleteRunBatchResponse {}
export const DeleteRunBatchResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteRunBatchResponse",
}) as any as S.Schema<DeleteRunBatchResponse>;
export interface DeleteRunCacheRequest {
  id: string;
}
export const DeleteRunCacheRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/runCache/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteRunCacheRequest",
}) as any as S.Schema<DeleteRunCacheRequest>;
export interface DeleteRunCacheResponse {}
export const DeleteRunCacheResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteRunCacheResponse",
}) as any as S.Schema<DeleteRunCacheResponse>;
export interface DeleteRunGroupRequest {
  id: string;
}
export const DeleteRunGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/runGroup/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteRunGroupRequest",
}) as any as S.Schema<DeleteRunGroupRequest>;
export interface DeleteRunGroupResponse {}
export const DeleteRunGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteRunGroupResponse",
}) as any as S.Schema<DeleteRunGroupResponse>;
export interface DeleteS3AccessPolicyRequest {
  s3AccessPointArn: string;
}
export const DeleteS3AccessPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    s3AccessPointArn: S.String.pipe(T.HttpLabel("s3AccessPointArn")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/s3accesspolicy/{s3AccessPointArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteS3AccessPolicyRequest",
}) as any as S.Schema<DeleteS3AccessPolicyRequest>;
export interface DeleteS3AccessPolicyResponse {}
export const DeleteS3AccessPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteS3AccessPolicyResponse",
}) as any as S.Schema<DeleteS3AccessPolicyResponse>;
export interface DeleteSequenceStoreRequest {
  id: string;
}
export const DeleteSequenceStoreRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/sequencestore/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSequenceStoreRequest",
}) as any as S.Schema<DeleteSequenceStoreRequest>;
export interface DeleteSequenceStoreResponse {}
export const DeleteSequenceStoreResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteSequenceStoreResponse",
}) as any as S.Schema<DeleteSequenceStoreResponse>;
export interface DeleteShareRequest {
  shareId: string;
}
export const DeleteShareRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ shareId: S.String.pipe(T.HttpLabel("shareId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/share/{shareId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteShareRequest",
}) as any as S.Schema<DeleteShareRequest>;
export interface DeleteShareResponse {
  status?: string;
}
export const DeleteShareResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: S.optional(S.String) }),
).annotate({
  identifier: "DeleteShareResponse",
}) as any as S.Schema<DeleteShareResponse>;
export interface DeleteVariantStoreRequest {
  name: string;
  force?: boolean;
}
export const DeleteVariantStoreRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    force: S.optional(S.Boolean).pipe(T.HttpQuery("force")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/variantStore/{name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteVariantStoreRequest",
}) as any as S.Schema<DeleteVariantStoreRequest>;
export interface DeleteVariantStoreResponse {
  status: string;
}
export const DeleteVariantStoreResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: S.String }),
).annotate({
  identifier: "DeleteVariantStoreResponse",
}) as any as S.Schema<DeleteVariantStoreResponse>;
export interface DeleteWorkflowRequest {
  id: string;
}
export const DeleteWorkflowRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/workflow/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteWorkflowRequest",
}) as any as S.Schema<DeleteWorkflowRequest>;
export interface DeleteWorkflowResponse {}
export const DeleteWorkflowResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteWorkflowResponse",
}) as any as S.Schema<DeleteWorkflowResponse>;
export interface DeleteWorkflowVersionRequest {
  workflowId: string;
  versionName: string;
}
export const DeleteWorkflowVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workflowId: S.String.pipe(T.HttpLabel("workflowId")),
    versionName: S.String.pipe(T.HttpLabel("versionName")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/workflow/{workflowId}/version/{versionName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteWorkflowVersionRequest",
}) as any as S.Schema<DeleteWorkflowVersionRequest>;
export interface DeleteWorkflowVersionResponse {}
export const DeleteWorkflowVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteWorkflowVersionResponse",
}) as any as S.Schema<DeleteWorkflowVersionResponse>;
export interface GetAnnotationImportRequest {
  jobId: string;
}
export const GetAnnotationImportRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobId: S.String.pipe(T.HttpLabel("jobId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/import/annotation/{jobId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAnnotationImportRequest",
}) as any as S.Schema<GetAnnotationImportRequest>;
export type Arn = string;
export type JobStatus = string;
export type JobStatusMsg = string;
export type UpdateTime = Date;
export type CompletionTime = Date;
export interface AnnotationImportItemDetail {
  source: string;
  jobStatus: string;
}
export const AnnotationImportItemDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ source: S.String, jobStatus: S.String }),
).annotate({
  identifier: "AnnotationImportItemDetail",
}) as any as S.Schema<AnnotationImportItemDetail>;
export type AnnotationImportItemDetails = AnnotationImportItemDetail[];
export const AnnotationImportItemDetails = /*@__PURE__*/ S.Array(
  AnnotationImportItemDetail,
);
export type RunLeftNormalization = boolean;
export type Separator = string;
export type Encoding = string;
export type Quote = string;
export type QuoteAll = boolean;
export type EscapeChar = string;
export type EscapeQuotes = boolean;
export type CommentChar = string;
export type Header = boolean;
export type LineSep = string;
export interface ReadOptions {
  sep?: string;
  encoding?: string;
  quote?: string;
  quoteAll?: boolean;
  escape?: string;
  escapeQuotes?: boolean;
  comment?: string;
  header?: boolean;
  lineSep?: string;
}
export const ReadOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sep: S.optional(S.String),
    encoding: S.optional(S.String),
    quote: S.optional(S.String),
    quoteAll: S.optional(S.Boolean),
    escape: S.optional(S.String),
    escapeQuotes: S.optional(S.Boolean),
    comment: S.optional(S.String),
    header: S.optional(S.Boolean),
    lineSep: S.optional(S.String),
  }),
).annotate({ identifier: "ReadOptions" }) as any as S.Schema<ReadOptions>;
export interface TsvOptions {
  readOptions?: ReadOptions;
}
export const TsvOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ readOptions: S.optional(ReadOptions) }),
).annotate({ identifier: "TsvOptions" }) as any as S.Schema<TsvOptions>;
export interface VcfOptions {
  ignoreQualField?: boolean;
  ignoreFilterField?: boolean;
}
export const VcfOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ignoreQualField: S.optional(S.Boolean),
    ignoreFilterField: S.optional(S.Boolean),
  }),
).annotate({ identifier: "VcfOptions" }) as any as S.Schema<VcfOptions>;
export type FormatOptions =
  | { tsvOptions: TsvOptions; vcfOptions?: never }
  | { tsvOptions?: never; vcfOptions: VcfOptions };
export const FormatOptions = /*@__PURE__*/ S.Union([
  S.Struct({ tsvOptions: TsvOptions }),
  S.Struct({ vcfOptions: VcfOptions }),
]);
export type AnnotationFieldMap = { [key: string]: string | undefined };
export const AnnotationFieldMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface GetAnnotationImportResponse {
  id: string;
  destinationName: string;
  versionName: string;
  roleArn: string;
  status: string;
  statusMessage: string;
  creationTime: Date;
  updateTime: Date;
  completionTime: Date;
  items: AnnotationImportItemDetail[];
  runLeftNormalization: boolean;
  formatOptions: FormatOptions;
  annotationFields?: { [key: string]: string | undefined };
}
export const GetAnnotationImportResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    destinationName: S.String,
    versionName: S.String,
    roleArn: S.String,
    status: S.String,
    statusMessage: S.String,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    completionTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    items: AnnotationImportItemDetails,
    runLeftNormalization: S.Boolean,
    formatOptions: FormatOptions,
    annotationFields: S.optional(AnnotationFieldMap),
  }),
).annotate({
  identifier: "GetAnnotationImportResponse",
}) as any as S.Schema<GetAnnotationImportResponse>;
export interface GetAnnotationStoreRequest {
  name: string;
}
export const GetAnnotationStoreRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String.pipe(T.HttpLabel("name")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/annotationStore/{name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAnnotationStoreRequest",
}) as any as S.Schema<GetAnnotationStoreRequest>;
export type StatusMessage = string;
export interface GetAnnotationStoreResponse {
  id: string;
  reference: ReferenceItem;
  status: string;
  storeArn: string;
  name: string;
  description: string;
  sseConfig: SseConfig;
  creationTime: Date;
  updateTime: Date;
  tags: { [key: string]: string | undefined };
  storeOptions?: StoreOptions;
  storeFormat?: string;
  statusMessage: string;
  storeSizeBytes: number;
  numVersions: number;
}
export const GetAnnotationStoreResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    reference: ReferenceItem,
    status: S.String,
    storeArn: S.String,
    name: S.String,
    description: S.String,
    sseConfig: SseConfig,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    tags: TagMap,
    storeOptions: S.optional(StoreOptions),
    storeFormat: S.optional(S.String),
    statusMessage: S.String,
    storeSizeBytes: S.Number,
    numVersions: S.Number,
  }),
).annotate({
  identifier: "GetAnnotationStoreResponse",
}) as any as S.Schema<GetAnnotationStoreResponse>;
export interface GetAnnotationStoreVersionRequest {
  name: string;
  versionName: string;
}
export const GetAnnotationStoreVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    versionName: S.String.pipe(T.HttpLabel("versionName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/annotationStore/{name}/version/{versionName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAnnotationStoreVersionRequest",
}) as any as S.Schema<GetAnnotationStoreVersionRequest>;
export interface GetAnnotationStoreVersionResponse {
  storeId: string;
  id: string;
  status: string;
  versionArn: string;
  name: string;
  versionName: string;
  description: string;
  creationTime: Date;
  updateTime: Date;
  tags: { [key: string]: string | undefined };
  versionOptions?: VersionOptions;
  statusMessage: string;
  versionSizeBytes: number;
}
export const GetAnnotationStoreVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    storeId: S.String,
    id: S.String,
    status: S.String,
    versionArn: S.String,
    name: S.String,
    versionName: S.String,
    description: S.String,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    tags: TagMap,
    versionOptions: S.optional(VersionOptions),
    statusMessage: S.String,
    versionSizeBytes: S.Number,
  }),
).annotate({
  identifier: "GetAnnotationStoreVersionResponse",
}) as any as S.Schema<GetAnnotationStoreVersionResponse>;
export interface GetBatchRequest {
  batchId: string;
}
export const GetBatchRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ batchId: S.String.pipe(T.HttpLabel("batchId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/runBatch/{batchId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetBatchRequest",
}) as any as S.Schema<GetBatchRequest>;
export type BatchArn = string;
export type BatchUuid = string;
export type BatchName = string;
export type BatchStatus = string;
export type WorkflowType = string;
export type RunRoleArn = string;
export type RunName = string;
export type NumericIdInArn = string;
export type RunParameters = unknown;
export type RunOutputUri = string;
export type RunLogLevel = string;
export type RunRetentionMode = string;
export type WorkflowOwnerId = string;
export type NetworkingMode = string;
export type EngineSettings = unknown;
export type ScratchStorageMode = string;
export interface DefaultRunSetting {
  workflowId: string;
  workflowType?: string;
  roleArn: string;
  name?: string;
  cacheId?: string;
  cacheBehavior?: string;
  runGroupId?: string;
  priority?: number;
  parameters?: any;
  storageCapacity?: number;
  outputUri?: string;
  logLevel?: string;
  runTags?: { [key: string]: string | undefined };
  retentionMode?: string;
  storageType?: string;
  workflowOwnerId?: string;
  outputBucketOwnerId?: string;
  workflowVersionName?: string;
  networkingMode?: string;
  configurationName?: string;
  engineSettings?: any;
  scratchStorageMode?: string;
}
export const DefaultRunSetting = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workflowId: S.String,
    workflowType: S.optional(S.String),
    roleArn: S.String,
    name: S.optional(S.String),
    cacheId: S.optional(S.String),
    cacheBehavior: S.optional(S.String),
    runGroupId: S.optional(S.String),
    priority: S.optional(S.Number),
    parameters: S.optional(S.Any),
    storageCapacity: S.optional(S.Number),
    outputUri: S.optional(S.String),
    logLevel: S.optional(S.String),
    runTags: S.optional(TagMap),
    retentionMode: S.optional(S.String),
    storageType: S.optional(S.String),
    workflowOwnerId: S.optional(S.String),
    outputBucketOwnerId: S.optional(S.String),
    workflowVersionName: S.optional(S.String),
    networkingMode: S.optional(S.String),
    configurationName: S.optional(S.String),
    engineSettings: S.optional(S.Any),
    scratchStorageMode: S.optional(S.String),
  }),
).annotate({
  identifier: "DefaultRunSetting",
}) as any as S.Schema<DefaultRunSetting>;
export interface SubmissionSummary {
  successfulStartSubmissionCount?: number;
  failedStartSubmissionCount?: number;
  pendingStartSubmissionCount?: number;
  successfulCancelSubmissionCount?: number;
  failedCancelSubmissionCount?: number;
  successfulDeleteSubmissionCount?: number;
  failedDeleteSubmissionCount?: number;
}
export const SubmissionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    successfulStartSubmissionCount: S.optional(S.Number),
    failedStartSubmissionCount: S.optional(S.Number),
    pendingStartSubmissionCount: S.optional(S.Number),
    successfulCancelSubmissionCount: S.optional(S.Number),
    failedCancelSubmissionCount: S.optional(S.Number),
    successfulDeleteSubmissionCount: S.optional(S.Number),
    failedDeleteSubmissionCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "SubmissionSummary",
}) as any as S.Schema<SubmissionSummary>;
export interface RunSummary {
  pendingRunCount?: number;
  startingRunCount?: number;
  runningRunCount?: number;
  stoppingRunCount?: number;
  completedRunCount?: number;
  deletedRunCount?: number;
  failedRunCount?: number;
  cancelledRunCount?: number;
}
export const RunSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pendingRunCount: S.optional(S.Number),
    startingRunCount: S.optional(S.Number),
    runningRunCount: S.optional(S.Number),
    stoppingRunCount: S.optional(S.Number),
    completedRunCount: S.optional(S.Number),
    deletedRunCount: S.optional(S.Number),
    failedRunCount: S.optional(S.Number),
    cancelledRunCount: S.optional(S.Number),
  }),
).annotate({ identifier: "RunSummary" }) as any as S.Schema<RunSummary>;
export type BatchTimestamp = Date;
export interface GetBatchResponse {
  id?: string;
  arn?: string;
  uuid?: string;
  name?: string;
  status?: string;
  tags?: { [key: string]: string | undefined };
  totalRuns?: number;
  defaultRunSetting?: DefaultRunSetting;
  submissionSummary?: SubmissionSummary;
  runSummary?: RunSummary;
  creationTime?: Date;
  submittedTime?: Date;
  processedTime?: Date;
  failedTime?: Date;
  failureReason?: string;
}
export const GetBatchResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    arn: S.optional(S.String),
    uuid: S.optional(S.String),
    name: S.optional(S.String),
    status: S.optional(S.String),
    tags: S.optional(TagMap),
    totalRuns: S.optional(S.Number),
    defaultRunSetting: S.optional(DefaultRunSetting),
    submissionSummary: S.optional(SubmissionSummary),
    runSummary: S.optional(RunSummary),
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    submittedTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    processedTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    failedTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    failureReason: S.optional(S.String),
  }),
).annotate({
  identifier: "GetBatchResponse",
}) as any as S.Schema<GetBatchResponse>;
export interface GetConfigurationRequest {
  name: string;
}
export const GetConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String.pipe(T.HttpLabel("name")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/configuration/{name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetConfigurationRequest",
}) as any as S.Schema<GetConfigurationRequest>;
export interface GetConfigurationResponse {
  arn?: string;
  uuid?: string;
  name?: string;
  description?: string;
  runConfigurations?: RunConfigurationsResponse;
  status?: string;
  creationTime?: Date;
  tags?: { [key: string]: string | undefined };
}
export const GetConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    uuid: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    runConfigurations: S.optional(RunConfigurationsResponse),
    status: S.optional(S.String),
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "GetConfigurationResponse",
}) as any as S.Schema<GetConfigurationResponse>;
export type ReadSetFile = string;
export interface GetReadSetRequest {
  id: string;
  sequenceStoreId: string;
  file?: string;
  partNumber: number;
}
export const GetReadSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    sequenceStoreId: S.String.pipe(T.HttpLabel("sequenceStoreId")),
    file: S.optional(S.String).pipe(T.HttpQuery("file")),
    partNumber: S.Number.pipe(T.HttpQuery("partNumber")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/sequencestore/{sequenceStoreId}/readset/{id}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetReadSetRequest",
}) as any as S.Schema<GetReadSetRequest>;
export interface GetReadSetResponse {
  payload?: T.StreamingOutputBody;
}
export const GetReadSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ payload: S.optional(T.StreamingOutput).pipe(T.HttpPayload()) }),
).annotate({
  identifier: "GetReadSetResponse",
}) as any as S.Schema<GetReadSetResponse>;
export type ActivationJobId = string;
export interface GetReadSetActivationJobRequest {
  id: string;
  sequenceStoreId: string;
}
export const GetReadSetActivationJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    sequenceStoreId: S.String.pipe(T.HttpLabel("sequenceStoreId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/sequencestore/{sequenceStoreId}/activationjob/{id}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetReadSetActivationJobRequest",
}) as any as S.Schema<GetReadSetActivationJobRequest>;
export type ReadSetActivationJobStatus = string;
export type JobStatusMessage = string;
export type ReadSetActivationJobItemStatus = string;
export interface ActivateReadSetSourceItem {
  readSetId: string;
  status: string;
  statusMessage?: string;
}
export const ActivateReadSetSourceItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    readSetId: S.String,
    status: S.String,
    statusMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "ActivateReadSetSourceItem",
}) as any as S.Schema<ActivateReadSetSourceItem>;
export type ActivateReadSetSourceList = ActivateReadSetSourceItem[];
export const ActivateReadSetSourceList = /*@__PURE__*/ S.Array(
  ActivateReadSetSourceItem,
);
export interface GetReadSetActivationJobResponse {
  id: string;
  sequenceStoreId: string;
  status: string;
  statusMessage?: string;
  creationTime: Date;
  completionTime?: Date;
  sources?: ActivateReadSetSourceItem[];
}
export const GetReadSetActivationJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    sequenceStoreId: S.String,
    status: S.String,
    statusMessage: S.optional(S.String),
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    completionTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    sources: S.optional(ActivateReadSetSourceList),
  }),
).annotate({
  identifier: "GetReadSetActivationJobResponse",
}) as any as S.Schema<GetReadSetActivationJobResponse>;
export type ExportJobId = string;
export interface GetReadSetExportJobRequest {
  sequenceStoreId: string;
  id: string;
}
export const GetReadSetExportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sequenceStoreId: S.String.pipe(T.HttpLabel("sequenceStoreId")),
    id: S.String.pipe(T.HttpLabel("id")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/sequencestore/{sequenceStoreId}/exportjob/{id}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetReadSetExportJobRequest",
}) as any as S.Schema<GetReadSetExportJobRequest>;
export type S3Destination = string;
export type ReadSetExportJobStatus = string;
export type ReadSetExportJobItemStatus = string;
export interface ExportReadSetDetail {
  id: string;
  status: string;
  statusMessage?: string;
}
export const ExportReadSetDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    status: S.String,
    statusMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "ExportReadSetDetail",
}) as any as S.Schema<ExportReadSetDetail>;
export type ExportReadSetDetailList = ExportReadSetDetail[];
export const ExportReadSetDetailList =
  /*@__PURE__*/ S.Array(ExportReadSetDetail);
export interface GetReadSetExportJobResponse {
  id: string;
  sequenceStoreId: string;
  destination: string;
  status: string;
  statusMessage?: string;
  creationTime: Date;
  completionTime?: Date;
  readSets?: ExportReadSetDetail[];
}
export const GetReadSetExportJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    sequenceStoreId: S.String,
    destination: S.String,
    status: S.String,
    statusMessage: S.optional(S.String),
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    completionTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    readSets: S.optional(ExportReadSetDetailList),
  }),
).annotate({
  identifier: "GetReadSetExportJobResponse",
}) as any as S.Schema<GetReadSetExportJobResponse>;
export type ImportJobId = string;
export interface GetReadSetImportJobRequest {
  id: string;
  sequenceStoreId: string;
}
export const GetReadSetImportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    sequenceStoreId: S.String.pipe(T.HttpLabel("sequenceStoreId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/sequencestore/{sequenceStoreId}/importjob/{id}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetReadSetImportJobRequest",
}) as any as S.Schema<GetReadSetImportJobRequest>;
export type RoleArn = string;
export type ReadSetImportJobStatus = string;
export interface SourceFiles {
  source1: string;
  source2?: string;
}
export const SourceFiles = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ source1: S.String, source2: S.optional(S.String) }),
).annotate({ identifier: "SourceFiles" }) as any as S.Schema<SourceFiles>;
export type ReadSetImportJobItemStatus = string;
export interface ImportReadSetSourceItem {
  sourceFiles: SourceFiles;
  sourceFileType: string;
  status: string;
  statusMessage?: string;
  subjectId: string;
  sampleId: string;
  generatedFrom?: string;
  referenceArn?: string;
  name?: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
  readSetId?: string;
}
export const ImportReadSetSourceItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceFiles: SourceFiles,
    sourceFileType: S.String,
    status: S.String,
    statusMessage: S.optional(S.String),
    subjectId: S.String,
    sampleId: S.String,
    generatedFrom: S.optional(S.String),
    referenceArn: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    tags: S.optional(TagMap),
    readSetId: S.optional(S.String),
  }),
).annotate({
  identifier: "ImportReadSetSourceItem",
}) as any as S.Schema<ImportReadSetSourceItem>;
export type ImportReadSetSourceList = ImportReadSetSourceItem[];
export const ImportReadSetSourceList = /*@__PURE__*/ S.Array(
  ImportReadSetSourceItem,
);
export interface GetReadSetImportJobResponse {
  id: string;
  sequenceStoreId: string;
  roleArn: string;
  status: string;
  statusMessage?: string;
  creationTime: Date;
  completionTime?: Date;
  sources: ImportReadSetSourceItem[];
}
export const GetReadSetImportJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    sequenceStoreId: S.String,
    roleArn: S.String,
    status: S.String,
    statusMessage: S.optional(S.String),
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    completionTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    sources: ImportReadSetSourceList,
  }),
).annotate({
  identifier: "GetReadSetImportJobResponse",
}) as any as S.Schema<GetReadSetImportJobResponse>;
export interface GetReadSetMetadataRequest {
  id: string;
  sequenceStoreId: string;
}
export const GetReadSetMetadataRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    sequenceStoreId: S.String.pipe(T.HttpLabel("sequenceStoreId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/sequencestore/{sequenceStoreId}/readset/{id}/metadata",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetReadSetMetadataRequest",
}) as any as S.Schema<GetReadSetMetadataRequest>;
export type ReadSetArn = string;
export type ReadSetStatus = string;
export interface SequenceInformation {
  totalReadCount?: number;
  totalBaseCount?: number;
  generatedFrom?: string;
  alignment?: string;
}
export const SequenceInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    totalReadCount: S.optional(S.Number),
    totalBaseCount: S.optional(S.Number),
    generatedFrom: S.optional(S.String),
    alignment: S.optional(S.String),
  }),
).annotate({
  identifier: "SequenceInformation",
}) as any as S.Schema<SequenceInformation>;
export interface ReadSetS3Access {
  s3Uri?: string;
}
export const ReadSetS3Access = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ s3Uri: S.optional(S.String) }),
).annotate({
  identifier: "ReadSetS3Access",
}) as any as S.Schema<ReadSetS3Access>;
export interface FileInformation {
  totalParts?: number;
  partSize?: number;
  contentLength?: number;
  s3Access?: ReadSetS3Access;
}
export const FileInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    totalParts: S.optional(S.Number),
    partSize: S.optional(S.Number),
    contentLength: S.optional(S.Number),
    s3Access: S.optional(ReadSetS3Access),
  }),
).annotate({
  identifier: "FileInformation",
}) as any as S.Schema<FileInformation>;
export interface ReadSetFiles {
  source1?: FileInformation;
  source2?: FileInformation;
  index?: FileInformation;
}
export const ReadSetFiles = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    source1: S.optional(FileInformation),
    source2: S.optional(FileInformation),
    index: S.optional(FileInformation),
  }),
).annotate({ identifier: "ReadSetFiles" }) as any as S.Schema<ReadSetFiles>;
export type ReadSetStatusMessage = string;
export type CreationType = string;
export type ETagAlgorithm = string;
export interface ETag {
  algorithm?: string;
  source1?: string;
  source2?: string;
}
export const ETag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    algorithm: S.optional(S.String),
    source1: S.optional(S.String),
    source2: S.optional(S.String),
  }),
).annotate({ identifier: "ETag" }) as any as S.Schema<ETag>;
export type CreationJobId = string;
export interface GetReadSetMetadataResponse {
  id: string;
  arn: string;
  sequenceStoreId: string;
  subjectId?: string;
  sampleId?: string;
  status: string;
  name?: string;
  description?: string;
  fileType: string;
  creationTime: Date;
  sequenceInformation?: SequenceInformation;
  referenceArn?: string;
  files?: ReadSetFiles;
  statusMessage?: string;
  creationType?: string;
  etag?: ETag;
  creationJobId?: string;
}
export const GetReadSetMetadataResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    sequenceStoreId: S.String,
    subjectId: S.optional(S.String),
    sampleId: S.optional(S.String),
    status: S.String,
    name: S.optional(S.String),
    description: S.optional(S.String),
    fileType: S.String,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    sequenceInformation: S.optional(SequenceInformation),
    referenceArn: S.optional(S.String),
    files: S.optional(ReadSetFiles),
    statusMessage: S.optional(S.String),
    creationType: S.optional(S.String),
    etag: S.optional(ETag),
    creationJobId: S.optional(S.String),
  }),
).annotate({
  identifier: "GetReadSetMetadataResponse",
}) as any as S.Schema<GetReadSetMetadataResponse>;
export type Range = string;
export type ReferenceFile = string;
export interface GetReferenceRequest {
  id: string;
  referenceStoreId: string;
  range?: string;
  partNumber: number;
  file?: string;
}
export const GetReferenceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    referenceStoreId: S.String.pipe(T.HttpLabel("referenceStoreId")),
    range: S.optional(S.String).pipe(T.HttpHeader("Range")),
    partNumber: S.Number.pipe(T.HttpQuery("partNumber")),
    file: S.optional(S.String).pipe(T.HttpQuery("file")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/referencestore/{referenceStoreId}/reference/{id}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetReferenceRequest",
}) as any as S.Schema<GetReferenceRequest>;
export interface GetReferenceResponse {
  payload?: T.StreamingOutputBody;
}
export const GetReferenceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ payload: S.optional(T.StreamingOutput).pipe(T.HttpPayload()) }),
).annotate({
  identifier: "GetReferenceResponse",
}) as any as S.Schema<GetReferenceResponse>;
export interface GetReferenceImportJobRequest {
  id: string;
  referenceStoreId: string;
}
export const GetReferenceImportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    referenceStoreId: S.String.pipe(T.HttpLabel("referenceStoreId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/referencestore/{referenceStoreId}/importjob/{id}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetReferenceImportJobRequest",
}) as any as S.Schema<GetReferenceImportJobRequest>;
export type ReferenceImportJobStatus = string;
export type ReferenceImportJobItemStatus = string;
export type ReferenceName = string;
export type ReferenceDescription = string;
export interface ImportReferenceSourceItem {
  sourceFile?: string;
  status: string;
  statusMessage?: string;
  name?: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
  referenceId?: string;
}
export const ImportReferenceSourceItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceFile: S.optional(S.String),
    status: S.String,
    statusMessage: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    tags: S.optional(TagMap),
    referenceId: S.optional(S.String),
  }),
).annotate({
  identifier: "ImportReferenceSourceItem",
}) as any as S.Schema<ImportReferenceSourceItem>;
export type ImportReferenceSourceList = ImportReferenceSourceItem[];
export const ImportReferenceSourceList = /*@__PURE__*/ S.Array(
  ImportReferenceSourceItem,
);
export interface GetReferenceImportJobResponse {
  id: string;
  referenceStoreId: string;
  roleArn: string;
  status: string;
  statusMessage?: string;
  creationTime: Date;
  completionTime?: Date;
  sources: ImportReferenceSourceItem[];
}
export const GetReferenceImportJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    referenceStoreId: S.String,
    roleArn: S.String,
    status: S.String,
    statusMessage: S.optional(S.String),
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    completionTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    sources: ImportReferenceSourceList,
  }),
).annotate({
  identifier: "GetReferenceImportJobResponse",
}) as any as S.Schema<GetReferenceImportJobResponse>;
export interface GetReferenceMetadataRequest {
  id: string;
  referenceStoreId: string;
}
export const GetReferenceMetadataRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    referenceStoreId: S.String.pipe(T.HttpLabel("referenceStoreId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/referencestore/{referenceStoreId}/reference/{id}/metadata",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetReferenceMetadataRequest",
}) as any as S.Schema<GetReferenceMetadataRequest>;
export type Md5 = string;
export type ReferenceStatus = string;
export interface ReferenceFiles {
  source?: FileInformation;
  index?: FileInformation;
}
export const ReferenceFiles = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    source: S.optional(FileInformation),
    index: S.optional(FileInformation),
  }),
).annotate({ identifier: "ReferenceFiles" }) as any as S.Schema<ReferenceFiles>;
export type ReferenceCreationType = string;
export interface GetReferenceMetadataResponse {
  id: string;
  arn: string;
  referenceStoreId: string;
  md5: string;
  status?: string;
  name?: string;
  description?: string;
  creationTime: Date;
  updateTime: Date;
  files?: ReferenceFiles;
  creationType?: string;
  creationJobId?: string;
}
export const GetReferenceMetadataResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    referenceStoreId: S.String,
    md5: S.String,
    status: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    files: S.optional(ReferenceFiles),
    creationType: S.optional(S.String),
    creationJobId: S.optional(S.String),
  }),
).annotate({
  identifier: "GetReferenceMetadataResponse",
}) as any as S.Schema<GetReferenceMetadataResponse>;
export interface GetReferenceStoreRequest {
  id: string;
}
export const GetReferenceStoreRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/referencestore/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetReferenceStoreRequest",
}) as any as S.Schema<GetReferenceStoreRequest>;
export interface GetReferenceStoreResponse {
  id: string;
  arn: string;
  name?: string;
  description?: string;
  sseConfig?: SseConfig;
  creationTime: Date;
}
export const GetReferenceStoreResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    name: S.optional(S.String),
    description: S.optional(S.String),
    sseConfig: S.optional(SseConfig),
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "GetReferenceStoreResponse",
}) as any as S.Schema<GetReferenceStoreResponse>;
export type RunExport = string;
export type RunExportList = string[];
export const RunExportList = /*@__PURE__*/ S.Array(S.String);
export interface GetRunRequest {
  id: string;
  export?: string[];
}
export const GetRunRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    export: S.optional(RunExportList).pipe(T.HttpQuery("export")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/run/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetRunRequest" }) as any as S.Schema<GetRunRequest>;
export type RunArn = string;
export type EngineVersion = string;
export type RunStatus = string;
export type WorkflowDigest = string;
export type RunResourceDigestKey = string;
export type RunResourceDigest = string;
export type RunResourceDigests = { [key: string]: string | undefined };
export const RunResourceDigests = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type RunStartedBy = string;
export type RunTimestamp = Date;
export type RunStatusMessage = string;
export type RunFailureReason = string;
export type EngineLogStream = string;
export type RunLogStream = string;
export interface RunLogLocation {
  engineLogStream?: string;
  runLogStream?: string;
}
export const RunLogLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    engineLogStream: S.optional(S.String),
    runLogStream: S.optional(S.String),
  }),
).annotate({ identifier: "RunLogLocation" }) as any as S.Schema<RunLogLocation>;
export type RunUuid = string;
export interface ConfigurationDetails {
  name?: string;
  arn?: string;
  uuid?: string;
}
export const ConfigurationDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    arn: S.optional(S.String),
    uuid: S.optional(S.String),
  }),
).annotate({
  identifier: "ConfigurationDetails",
}) as any as S.Schema<ConfigurationDetails>;
export interface GetRunResponse {
  arn?: string;
  id?: string;
  cacheId?: string;
  cacheBehavior?: string;
  engineVersion?: string;
  status?: string;
  workflowId?: string;
  workflowType?: string;
  runId?: string;
  roleArn?: string;
  name?: string;
  runGroupId?: string;
  batchId?: string;
  priority?: number;
  definition?: string;
  digest?: string;
  parameters?: any;
  storageCapacity?: number;
  outputUri?: string;
  logLevel?: string;
  resourceDigests?: { [key: string]: string | undefined };
  startedBy?: string;
  creationTime?: Date;
  startTime?: Date;
  stopTime?: Date;
  statusMessage?: string;
  tags?: { [key: string]: string | undefined };
  accelerators?: string;
  retentionMode?: string;
  failureReason?: string;
  logLocation?: RunLogLocation;
  uuid?: string;
  runOutputUri?: string;
  storageType?: string;
  workflowOwnerId?: string;
  workflowVersionName?: string;
  workflowUuid?: string;
  networkingMode?: string;
  scratchStorageMode?: string;
  configuration?: ConfigurationDetails;
  vpcConfig?: VpcConfigResponse;
  engineSettings?: any;
}
export const GetRunResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    id: S.optional(S.String),
    cacheId: S.optional(S.String),
    cacheBehavior: S.optional(S.String),
    engineVersion: S.optional(S.String),
    status: S.optional(S.String),
    workflowId: S.optional(S.String),
    workflowType: S.optional(S.String),
    runId: S.optional(S.String),
    roleArn: S.optional(S.String),
    name: S.optional(S.String),
    runGroupId: S.optional(S.String),
    batchId: S.optional(S.String),
    priority: S.optional(S.Number),
    definition: S.optional(S.String),
    digest: S.optional(S.String),
    parameters: S.optional(S.Any),
    storageCapacity: S.optional(S.Number),
    outputUri: S.optional(S.String),
    logLevel: S.optional(S.String),
    resourceDigests: S.optional(RunResourceDigests),
    startedBy: S.optional(S.String),
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    startTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    stopTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    statusMessage: S.optional(S.String),
    tags: S.optional(TagMap),
    accelerators: S.optional(S.String),
    retentionMode: S.optional(S.String),
    failureReason: S.optional(S.String),
    logLocation: S.optional(RunLogLocation),
    uuid: S.optional(S.String),
    runOutputUri: S.optional(S.String),
    storageType: S.optional(S.String),
    workflowOwnerId: S.optional(S.String),
    workflowVersionName: S.optional(S.String),
    workflowUuid: S.optional(S.String),
    networkingMode: S.optional(S.String),
    scratchStorageMode: S.optional(S.String),
    configuration: S.optional(ConfigurationDetails),
    vpcConfig: S.optional(VpcConfigResponse),
    engineSettings: S.optional(S.Any),
  }),
).annotate({ identifier: "GetRunResponse" }) as any as S.Schema<GetRunResponse>;
export interface GetRunCacheRequest {
  id: string;
}
export const GetRunCacheRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/runCache/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRunCacheRequest",
}) as any as S.Schema<GetRunCacheRequest>;
export type RunCacheTimestamp = Date;
export interface GetRunCacheResponse {
  arn?: string;
  cacheBehavior?: string;
  cacheBucketOwnerId?: string;
  cacheS3Uri?: string;
  creationTime?: Date;
  description?: string;
  id?: string;
  name?: string;
  status?: string;
  tags?: { [key: string]: string | undefined };
}
export const GetRunCacheResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    cacheBehavior: S.optional(S.String),
    cacheBucketOwnerId: S.optional(S.String),
    cacheS3Uri: S.optional(S.String),
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    description: S.optional(S.String),
    id: S.optional(S.String),
    name: S.optional(S.String),
    status: S.optional(S.String),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "GetRunCacheResponse",
}) as any as S.Schema<GetRunCacheResponse>;
export interface GetRunGroupRequest {
  id: string;
}
export const GetRunGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/runGroup/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRunGroupRequest",
}) as any as S.Schema<GetRunGroupRequest>;
export type RunGroupTimestamp = Date;
export interface GetRunGroupResponse {
  arn?: string;
  id?: string;
  name?: string;
  maxCpus?: number;
  maxRuns?: number;
  maxDuration?: number;
  creationTime?: Date;
  tags?: { [key: string]: string | undefined };
  maxGpus?: number;
}
export const GetRunGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    id: S.optional(S.String),
    name: S.optional(S.String),
    maxCpus: S.optional(S.Number),
    maxRuns: S.optional(S.Number),
    maxDuration: S.optional(S.Number),
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    tags: S.optional(TagMap),
    maxGpus: S.optional(S.Number),
  }),
).annotate({
  identifier: "GetRunGroupResponse",
}) as any as S.Schema<GetRunGroupResponse>;
export type TaskId = string;
export interface GetRunTaskRequest {
  id: string;
  taskId: string;
}
export const GetRunTaskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    taskId: S.String.pipe(T.HttpLabel("taskId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/run/{id}/task/{taskId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRunTaskRequest",
}) as any as S.Schema<GetRunTaskRequest>;
export type TaskStatus = string;
export type TaskName = string;
export type TaskTimestamp = Date;
export type TaskStatusMessage = string;
export type TaskLogStream = string;
export type TaskInstanceType = string;
export type TaskFailureReason = string;
export type TaskImageDigest = string;
export interface ImageDetails {
  image?: string;
  imageDigest?: string;
  sourceImage?: string;
}
export const ImageDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    image: S.optional(S.String),
    imageDigest: S.optional(S.String),
    sourceImage: S.optional(S.String),
  }),
).annotate({ identifier: "ImageDetails" }) as any as S.Schema<ImageDetails>;
export type TaskUuid = string;
export interface GetRunTaskResponse {
  taskId?: string;
  status?: string;
  name?: string;
  cpus?: number;
  cacheHit?: boolean;
  cacheS3Uri?: string;
  memory?: number;
  creationTime?: Date;
  startTime?: Date;
  stopTime?: Date;
  statusMessage?: string;
  logStream?: string;
  gpus?: number;
  instanceType?: string;
  failureReason?: string;
  imageDetails?: ImageDetails;
  uuid?: string;
}
export const GetRunTaskResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taskId: S.optional(S.String),
    status: S.optional(S.String),
    name: S.optional(S.String),
    cpus: S.optional(S.Number),
    cacheHit: S.optional(S.Boolean),
    cacheS3Uri: S.optional(S.String),
    memory: S.optional(S.Number),
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    startTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    stopTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    statusMessage: S.optional(S.String),
    logStream: S.optional(S.String),
    gpus: S.optional(S.Number),
    instanceType: S.optional(S.String),
    failureReason: S.optional(S.String),
    imageDetails: S.optional(ImageDetails),
    uuid: S.optional(S.String),
  }),
).annotate({
  identifier: "GetRunTaskResponse",
}) as any as S.Schema<GetRunTaskResponse>;
export interface GetS3AccessPolicyRequest {
  s3AccessPointArn: string;
}
export const GetS3AccessPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    s3AccessPointArn: S.String.pipe(T.HttpLabel("s3AccessPointArn")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/s3accesspolicy/{s3AccessPointArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetS3AccessPolicyRequest",
}) as any as S.Schema<GetS3AccessPolicyRequest>;
export type StoreId = string;
export type StoreType = "SEQUENCE_STORE" | "REFERENCE_STORE" | (string & {});
export const StoreType = S.String;

export type S3AccessPolicy = string;
export interface GetS3AccessPolicyResponse {
  s3AccessPointArn?: string;
  storeId?: string;
  storeType?: StoreType;
  updateTime?: Date;
  s3AccessPolicy: string;
}
export const GetS3AccessPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    s3AccessPointArn: S.optional(S.String),
    storeId: S.optional(S.String),
    storeType: S.optional(StoreType),
    updateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    s3AccessPolicy: S.String,
  }),
).annotate({
  identifier: "GetS3AccessPolicyResponse",
}) as any as S.Schema<GetS3AccessPolicyResponse>;
export interface GetSequenceStoreRequest {
  id: string;
}
export const GetSequenceStoreRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/sequencestore/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSequenceStoreRequest",
}) as any as S.Schema<GetSequenceStoreRequest>;
export interface GetSequenceStoreResponse {
  id: string;
  arn: string;
  name?: string;
  description?: string;
  sseConfig?: SseConfig;
  creationTime: Date;
  fallbackLocation?: string;
  s3Access?: SequenceStoreS3Access;
  eTagAlgorithmFamily?: string;
  status?: string;
  statusMessage?: string;
  propagatedSetLevelTags?: string[];
  updateTime?: Date;
}
export const GetSequenceStoreResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    name: S.optional(S.String),
    description: S.optional(S.String),
    sseConfig: S.optional(SseConfig),
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    fallbackLocation: S.optional(S.String),
    s3Access: S.optional(SequenceStoreS3Access),
    eTagAlgorithmFamily: S.optional(S.String),
    status: S.optional(S.String),
    statusMessage: S.optional(S.String),
    propagatedSetLevelTags: S.optional(PropagatedSetLevelTags),
    updateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "GetSequenceStoreResponse",
}) as any as S.Schema<GetSequenceStoreResponse>;
export interface GetShareRequest {
  shareId: string;
}
export const GetShareRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ shareId: S.String.pipe(T.HttpLabel("shareId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/share/{shareId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetShareRequest",
}) as any as S.Schema<GetShareRequest>;
export interface ShareDetails {
  shareId?: string;
  resourceArn?: string;
  resourceId?: string;
  principalSubscriber?: string;
  ownerId?: string;
  status?: string;
  statusMessage?: string;
  shareName?: string;
  creationTime?: Date;
  updateTime?: Date;
}
export const ShareDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    shareId: S.optional(S.String),
    resourceArn: S.optional(S.String),
    resourceId: S.optional(S.String),
    principalSubscriber: S.optional(S.String),
    ownerId: S.optional(S.String),
    status: S.optional(S.String),
    statusMessage: S.optional(S.String),
    shareName: S.optional(S.String),
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({ identifier: "ShareDetails" }) as any as S.Schema<ShareDetails>;
export interface GetShareResponse {
  share?: ShareDetails;
}
export const GetShareResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ share: S.optional(ShareDetails) }),
).annotate({
  identifier: "GetShareResponse",
}) as any as S.Schema<GetShareResponse>;
export interface GetVariantImportRequest {
  jobId: string;
}
export const GetVariantImportRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobId: S.String.pipe(T.HttpLabel("jobId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/import/variant/{jobId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetVariantImportRequest",
}) as any as S.Schema<GetVariantImportRequest>;
export interface VariantImportItemDetail {
  source: string;
  jobStatus: string;
  statusMessage?: string;
}
export const VariantImportItemDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    source: S.String,
    jobStatus: S.String,
    statusMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "VariantImportItemDetail",
}) as any as S.Schema<VariantImportItemDetail>;
export type VariantImportItemDetails = VariantImportItemDetail[];
export const VariantImportItemDetails = /*@__PURE__*/ S.Array(
  VariantImportItemDetail,
);
export interface GetVariantImportResponse {
  id: string;
  destinationName: string;
  roleArn: string;
  status: string;
  statusMessage: string;
  creationTime: Date;
  updateTime: Date;
  completionTime?: Date;
  items: VariantImportItemDetail[];
  runLeftNormalization: boolean;
  annotationFields?: { [key: string]: string | undefined };
}
export const GetVariantImportResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    destinationName: S.String,
    roleArn: S.String,
    status: S.String,
    statusMessage: S.String,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    completionTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    items: VariantImportItemDetails,
    runLeftNormalization: S.Boolean,
    annotationFields: S.optional(AnnotationFieldMap),
  }),
).annotate({
  identifier: "GetVariantImportResponse",
}) as any as S.Schema<GetVariantImportResponse>;
export interface GetVariantStoreRequest {
  name: string;
}
export const GetVariantStoreRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String.pipe(T.HttpLabel("name")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/variantStore/{name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetVariantStoreRequest",
}) as any as S.Schema<GetVariantStoreRequest>;
export interface GetVariantStoreResponse {
  id: string;
  reference: ReferenceItem;
  status: string;
  storeArn: string;
  name: string;
  description: string;
  sseConfig: SseConfig;
  creationTime: Date;
  updateTime: Date;
  tags: { [key: string]: string | undefined };
  statusMessage: string;
  storeSizeBytes: number;
}
export const GetVariantStoreResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    reference: ReferenceItem,
    status: S.String,
    storeArn: S.String,
    name: S.String,
    description: S.String,
    sseConfig: SseConfig,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    tags: TagMap,
    statusMessage: S.String,
    storeSizeBytes: S.Number,
  }),
).annotate({
  identifier: "GetVariantStoreResponse",
}) as any as S.Schema<GetVariantStoreResponse>;
export type WorkflowExport = string;
export type WorkflowExportList = string[];
export const WorkflowExportList = /*@__PURE__*/ S.Array(S.String);
export interface GetWorkflowRequest {
  id: string;
  type?: string;
  export?: string[];
  workflowOwnerId?: string;
}
export const GetWorkflowRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    type: S.optional(S.String).pipe(T.HttpQuery("type")),
    export: S.optional(WorkflowExportList).pipe(T.HttpQuery("export")),
    workflowOwnerId: S.optional(S.String).pipe(T.HttpQuery("workflowOwnerId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/workflow/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetWorkflowRequest",
}) as any as S.Schema<GetWorkflowRequest>;
export type WorkflowTimestamp = Date;
export type WorkflowStatusMessage = string;
export type WorkflowMetadataKey = string;
export type WorkflowMetadataValue = string;
export type WorkflowMetadata = { [key: string]: string | undefined };
export const WorkflowMetadata = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type ReadmeS3PresignedUrl = string;
export interface DefinitionRepositoryDetails {
  connectionArn?: string;
  fullRepositoryId?: string;
  sourceReference?: SourceReference;
  providerType?: string;
  providerEndpoint?: string;
}
export const DefinitionRepositoryDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    connectionArn: S.optional(S.String),
    fullRepositoryId: S.optional(S.String),
    sourceReference: S.optional(SourceReference),
    providerType: S.optional(S.String),
    providerEndpoint: S.optional(S.String),
  }),
).annotate({
  identifier: "DefinitionRepositoryDetails",
}) as any as S.Schema<DefinitionRepositoryDetails>;
export type WorkflowProfileName = string;
export type WorkflowProfileList = string[];
export const WorkflowProfileList = /*@__PURE__*/ S.Array(S.String);
export type WorkflowProfileParameterTemplates = {
  [key: string]: { [key: string]: WorkflowParameter | undefined } | undefined;
};
export const WorkflowProfileParameterTemplates = /*@__PURE__*/ S.Record(
  S.String,
  WorkflowParameterTemplate.pipe(S.optional),
);
export interface GetWorkflowResponse {
  arn?: string;
  id?: string;
  status?: string;
  type?: string;
  name?: string;
  description?: string;
  engine?: string;
  definition?: string;
  main?: string;
  digest?: string;
  parameterTemplate?: { [key: string]: WorkflowParameter | undefined };
  storageCapacity?: number;
  creationTime?: Date;
  statusMessage?: string;
  tags?: { [key: string]: string | undefined };
  metadata?: { [key: string]: string | undefined };
  accelerators?: string;
  storageType?: string;
  uuid?: string;
  containerRegistryMap?: ContainerRegistryMap;
  readme?: string;
  definitionRepositoryDetails?: DefinitionRepositoryDetails;
  readmePath?: string;
  profiles?: string[];
  profileParameterTemplates?: {
    [key: string]: { [key: string]: WorkflowParameter | undefined } | undefined;
  };
}
export const GetWorkflowResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    id: S.optional(S.String),
    status: S.optional(S.String),
    type: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    engine: S.optional(S.String),
    definition: S.optional(S.String),
    main: S.optional(S.String),
    digest: S.optional(S.String),
    parameterTemplate: S.optional(WorkflowParameterTemplate),
    storageCapacity: S.optional(S.Number),
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    statusMessage: S.optional(S.String),
    tags: S.optional(TagMap),
    metadata: S.optional(WorkflowMetadata),
    accelerators: S.optional(S.String),
    storageType: S.optional(S.String),
    uuid: S.optional(S.String),
    containerRegistryMap: S.optional(ContainerRegistryMap),
    readme: S.optional(S.String),
    definitionRepositoryDetails: S.optional(DefinitionRepositoryDetails),
    readmePath: S.optional(S.String),
    profiles: S.optional(WorkflowProfileList),
    profileParameterTemplates: S.optional(WorkflowProfileParameterTemplates),
  }),
).annotate({
  identifier: "GetWorkflowResponse",
}) as any as S.Schema<GetWorkflowResponse>;
export interface GetWorkflowVersionRequest {
  workflowId: string;
  versionName: string;
  type?: string;
  export?: string[];
  workflowOwnerId?: string;
}
export const GetWorkflowVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workflowId: S.String.pipe(T.HttpLabel("workflowId")),
    versionName: S.String.pipe(T.HttpLabel("versionName")),
    type: S.optional(S.String).pipe(T.HttpQuery("type")),
    export: S.optional(WorkflowExportList).pipe(T.HttpQuery("export")),
    workflowOwnerId: S.optional(S.String).pipe(T.HttpQuery("workflowOwnerId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/workflow/{workflowId}/version/{versionName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetWorkflowVersionRequest",
}) as any as S.Schema<GetWorkflowVersionRequest>;
export interface GetWorkflowVersionResponse {
  arn?: string;
  workflowId?: string;
  versionName?: string;
  accelerators?: string;
  creationTime?: Date;
  description?: string;
  definition?: string;
  digest?: string;
  engine?: string;
  main?: string;
  metadata?: { [key: string]: string | undefined };
  parameterTemplate?: { [key: string]: WorkflowParameter | undefined };
  status?: string;
  statusMessage?: string;
  storageType?: string;
  storageCapacity?: number;
  type?: string;
  tags?: { [key: string]: string | undefined };
  uuid?: string;
  workflowBucketOwnerId?: string;
  containerRegistryMap?: ContainerRegistryMap;
  readme?: string;
  definitionRepositoryDetails?: DefinitionRepositoryDetails;
  readmePath?: string;
  profiles?: string[];
  profileParameterTemplates?: {
    [key: string]: { [key: string]: WorkflowParameter | undefined } | undefined;
  };
}
export const GetWorkflowVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    workflowId: S.optional(S.String),
    versionName: S.optional(S.String),
    accelerators: S.optional(S.String),
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    description: S.optional(S.String),
    definition: S.optional(S.String),
    digest: S.optional(S.String),
    engine: S.optional(S.String),
    main: S.optional(S.String),
    metadata: S.optional(WorkflowMetadata),
    parameterTemplate: S.optional(WorkflowParameterTemplate),
    status: S.optional(S.String),
    statusMessage: S.optional(S.String),
    storageType: S.optional(S.String),
    storageCapacity: S.optional(S.Number),
    type: S.optional(S.String),
    tags: S.optional(TagMap),
    uuid: S.optional(S.String),
    workflowBucketOwnerId: S.optional(S.String),
    containerRegistryMap: S.optional(ContainerRegistryMap),
    readme: S.optional(S.String),
    definitionRepositoryDetails: S.optional(DefinitionRepositoryDetails),
    readmePath: S.optional(S.String),
    profiles: S.optional(WorkflowProfileList),
    profileParameterTemplates: S.optional(WorkflowProfileParameterTemplates),
  }),
).annotate({
  identifier: "GetWorkflowVersionResponse",
}) as any as S.Schema<GetWorkflowVersionResponse>;
export type ResourceIdentifier = string;
export type IdList = string[];
export const IdList = /*@__PURE__*/ S.Array(S.String);
export interface ListAnnotationImportJobsFilter {
  status?: string;
  storeName?: string;
}
export const ListAnnotationImportJobsFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: S.optional(S.String), storeName: S.optional(S.String) }),
).annotate({
  identifier: "ListAnnotationImportJobsFilter",
}) as any as S.Schema<ListAnnotationImportJobsFilter>;
export interface ListAnnotationImportJobsRequest {
  maxResults?: number;
  ids?: string[];
  nextToken?: string;
  filter?: ListAnnotationImportJobsFilter;
}
export const ListAnnotationImportJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    ids: S.optional(IdList),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    filter: S.optional(ListAnnotationImportJobsFilter),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/import/annotations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAnnotationImportJobsRequest",
}) as any as S.Schema<ListAnnotationImportJobsRequest>;
export interface AnnotationImportJobItem {
  id: string;
  destinationName: string;
  versionName: string;
  roleArn: string;
  status: string;
  creationTime: Date;
  updateTime: Date;
  completionTime?: Date;
  runLeftNormalization?: boolean;
  annotationFields?: { [key: string]: string | undefined };
}
export const AnnotationImportJobItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    destinationName: S.String,
    versionName: S.String,
    roleArn: S.String,
    status: S.String,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    completionTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    runLeftNormalization: S.optional(S.Boolean),
    annotationFields: S.optional(AnnotationFieldMap),
  }),
).annotate({
  identifier: "AnnotationImportJobItem",
}) as any as S.Schema<AnnotationImportJobItem>;
export type AnnotationImportJobItems = AnnotationImportJobItem[];
export const AnnotationImportJobItems = /*@__PURE__*/ S.Array(
  AnnotationImportJobItem,
);
export interface ListAnnotationImportJobsResponse {
  annotationImportJobs?: AnnotationImportJobItem[];
  nextToken?: string;
}
export const ListAnnotationImportJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    annotationImportJobs: S.optional(AnnotationImportJobItems),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAnnotationImportJobsResponse",
}) as any as S.Schema<ListAnnotationImportJobsResponse>;
export interface ListAnnotationStoresFilter {
  status?: string;
}
export const ListAnnotationStoresFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: S.optional(S.String) }),
).annotate({
  identifier: "ListAnnotationStoresFilter",
}) as any as S.Schema<ListAnnotationStoresFilter>;
export interface ListAnnotationStoresRequest {
  ids?: string[];
  maxResults?: number;
  nextToken?: string;
  filter?: ListAnnotationStoresFilter;
}
export const ListAnnotationStoresRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ids: S.optional(IdList),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    filter: S.optional(ListAnnotationStoresFilter),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/annotationStores" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAnnotationStoresRequest",
}) as any as S.Schema<ListAnnotationStoresRequest>;
export interface AnnotationStoreItem {
  id: string;
  reference: ReferenceItem;
  status: string;
  storeArn: string;
  name: string;
  storeFormat: string;
  description: string;
  sseConfig: SseConfig;
  creationTime: Date;
  updateTime: Date;
  statusMessage: string;
  storeSizeBytes: number;
}
export const AnnotationStoreItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    reference: ReferenceItem,
    status: S.String,
    storeArn: S.String,
    name: S.String,
    storeFormat: S.String,
    description: S.String,
    sseConfig: SseConfig,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    statusMessage: S.String,
    storeSizeBytes: S.Number,
  }),
).annotate({
  identifier: "AnnotationStoreItem",
}) as any as S.Schema<AnnotationStoreItem>;
export type AnnotationStoreItems = AnnotationStoreItem[];
export const AnnotationStoreItems = /*@__PURE__*/ S.Array(AnnotationStoreItem);
export interface ListAnnotationStoresResponse {
  annotationStores?: AnnotationStoreItem[];
  nextToken?: string;
}
export const ListAnnotationStoresResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    annotationStores: S.optional(AnnotationStoreItems),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAnnotationStoresResponse",
}) as any as S.Schema<ListAnnotationStoresResponse>;
export interface ListAnnotationStoreVersionsFilter {
  status?: string;
}
export const ListAnnotationStoreVersionsFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: S.optional(S.String) }),
).annotate({
  identifier: "ListAnnotationStoreVersionsFilter",
}) as any as S.Schema<ListAnnotationStoreVersionsFilter>;
export interface ListAnnotationStoreVersionsRequest {
  name: string;
  maxResults?: number;
  nextToken?: string;
  filter?: ListAnnotationStoreVersionsFilter;
}
export const ListAnnotationStoreVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    filter: S.optional(ListAnnotationStoreVersionsFilter),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/annotationStore/{name}/versions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAnnotationStoreVersionsRequest",
}) as any as S.Schema<ListAnnotationStoreVersionsRequest>;
export interface AnnotationStoreVersionItem {
  storeId: string;
  id: string;
  status: string;
  versionArn: string;
  name: string;
  versionName: string;
  description: string;
  creationTime: Date;
  updateTime: Date;
  statusMessage: string;
  versionSizeBytes: number;
}
export const AnnotationStoreVersionItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    storeId: S.String,
    id: S.String,
    status: S.String,
    versionArn: S.String,
    name: S.String,
    versionName: S.String,
    description: S.String,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    statusMessage: S.String,
    versionSizeBytes: S.Number,
  }),
).annotate({
  identifier: "AnnotationStoreVersionItem",
}) as any as S.Schema<AnnotationStoreVersionItem>;
export type AnnotationStoreVersionItems = AnnotationStoreVersionItem[];
export const AnnotationStoreVersionItems = /*@__PURE__*/ S.Array(
  AnnotationStoreVersionItem,
);
export interface ListAnnotationStoreVersionsResponse {
  annotationStoreVersions?: AnnotationStoreVersionItem[];
  nextToken?: string;
}
export const ListAnnotationStoreVersionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    annotationStoreVersions: S.optional(AnnotationStoreVersionItems),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAnnotationStoreVersionsResponse",
}) as any as S.Schema<ListAnnotationStoreVersionsResponse>;
export type ListToken = string;
export interface ListBatchRequest {
  maxItems?: number;
  startingToken?: string;
  status?: string;
  name?: string;
  runGroupId?: string;
}
export const ListBatchRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxItems: S.optional(S.Number).pipe(T.HttpQuery("maxItems")),
    startingToken: S.optional(S.String).pipe(T.HttpQuery("startingToken")),
    status: S.optional(S.String).pipe(T.HttpQuery("status")),
    name: S.optional(S.String).pipe(T.HttpQuery("name")),
    runGroupId: S.optional(S.String).pipe(T.HttpQuery("runGroupId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/runBatch" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListBatchRequest",
}) as any as S.Schema<ListBatchRequest>;
export interface BatchListItem {
  id?: string;
  name?: string;
  status?: string;
  createdAt?: Date;
  totalRuns?: number;
  workflowId?: string;
}
export const BatchListItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    name: S.optional(S.String),
    status: S.optional(S.String),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    totalRuns: S.optional(S.Number),
    workflowId: S.optional(S.String),
  }),
).annotate({ identifier: "BatchListItem" }) as any as S.Schema<BatchListItem>;
export type BatchList = BatchListItem[];
export const BatchList = /*@__PURE__*/ S.Array(BatchListItem);
export interface ListBatchResponse {
  items?: BatchListItem[];
  nextToken?: string;
}
export const ListBatchResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ items: S.optional(BatchList), nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListBatchResponse",
}) as any as S.Schema<ListBatchResponse>;
export type ConfigurationListToken = string;
export interface ListConfigurationsRequest {
  maxResults?: number;
  startingToken?: string;
}
export const ListConfigurationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    startingToken: S.optional(S.String).pipe(T.HttpQuery("startingToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/configuration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListConfigurationsRequest",
}) as any as S.Schema<ListConfigurationsRequest>;
export interface ConfigurationListItem {
  arn?: string;
  name?: string;
  description?: string;
  status?: string;
  creationTime?: Date;
}
export const ConfigurationListItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    status: S.optional(S.String),
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "ConfigurationListItem",
}) as any as S.Schema<ConfigurationListItem>;
export type ConfigurationList = ConfigurationListItem[];
export const ConfigurationList = /*@__PURE__*/ S.Array(ConfigurationListItem);
export interface ListConfigurationsResponse {
  items?: ConfigurationListItem[];
  nextToken?: string;
}
export const ListConfigurationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(ConfigurationList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListConfigurationsResponse",
}) as any as S.Schema<ListConfigurationsResponse>;
export type NextToken = string;
export interface ListMultipartReadSetUploadsRequest {
  sequenceStoreId: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListMultipartReadSetUploadsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sequenceStoreId: S.String.pipe(T.HttpLabel("sequenceStoreId")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/sequencestore/{sequenceStoreId}/uploads",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListMultipartReadSetUploadsRequest",
}) as any as S.Schema<ListMultipartReadSetUploadsRequest>;
export interface MultipartReadSetUploadListItem {
  sequenceStoreId: string;
  uploadId: string;
  sourceFileType: string;
  subjectId: string;
  sampleId: string;
  generatedFrom: string;
  referenceArn: string;
  name?: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
  creationTime: Date;
}
export const MultipartReadSetUploadListItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sequenceStoreId: S.String,
    uploadId: S.String,
    sourceFileType: S.String,
    subjectId: S.String,
    sampleId: S.String,
    generatedFrom: S.String,
    referenceArn: S.String,
    name: S.optional(S.String),
    description: S.optional(S.String),
    tags: S.optional(TagMap),
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "MultipartReadSetUploadListItem",
}) as any as S.Schema<MultipartReadSetUploadListItem>;
export type MultipartReadSetUploadList = MultipartReadSetUploadListItem[];
export const MultipartReadSetUploadList = /*@__PURE__*/ S.Array(
  MultipartReadSetUploadListItem,
);
export interface ListMultipartReadSetUploadsResponse {
  nextToken?: string;
  uploads?: MultipartReadSetUploadListItem[];
}
export const ListMultipartReadSetUploadsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    uploads: S.optional(MultipartReadSetUploadList),
  }),
).annotate({
  identifier: "ListMultipartReadSetUploadsResponse",
}) as any as S.Schema<ListMultipartReadSetUploadsResponse>;
export interface ActivateReadSetFilter {
  status?: string;
  createdAfter?: Date;
  createdBefore?: Date;
}
export const ActivateReadSetFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.optional(S.String),
    createdAfter: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    createdBefore: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "ActivateReadSetFilter",
}) as any as S.Schema<ActivateReadSetFilter>;
export interface ListReadSetActivationJobsRequest {
  sequenceStoreId: string;
  maxResults?: number;
  nextToken?: string;
  filter?: ActivateReadSetFilter;
}
export const ListReadSetActivationJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sequenceStoreId: S.String.pipe(T.HttpLabel("sequenceStoreId")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    filter: S.optional(ActivateReadSetFilter),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/sequencestore/{sequenceStoreId}/activationjobs",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListReadSetActivationJobsRequest",
}) as any as S.Schema<ListReadSetActivationJobsRequest>;
export interface ActivateReadSetJobItem {
  id: string;
  sequenceStoreId: string;
  status: string;
  creationTime: Date;
  completionTime?: Date;
}
export const ActivateReadSetJobItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    sequenceStoreId: S.String,
    status: S.String,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    completionTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "ActivateReadSetJobItem",
}) as any as S.Schema<ActivateReadSetJobItem>;
export type ActivateReadSetJobList = ActivateReadSetJobItem[];
export const ActivateReadSetJobList = /*@__PURE__*/ S.Array(
  ActivateReadSetJobItem,
);
export interface ListReadSetActivationJobsResponse {
  nextToken?: string;
  activationJobs?: ActivateReadSetJobItem[];
}
export const ListReadSetActivationJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    activationJobs: S.optional(ActivateReadSetJobList),
  }),
).annotate({
  identifier: "ListReadSetActivationJobsResponse",
}) as any as S.Schema<ListReadSetActivationJobsResponse>;
export interface ExportReadSetFilter {
  status?: string;
  createdAfter?: Date;
  createdBefore?: Date;
}
export const ExportReadSetFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.optional(S.String),
    createdAfter: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    createdBefore: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "ExportReadSetFilter",
}) as any as S.Schema<ExportReadSetFilter>;
export interface ListReadSetExportJobsRequest {
  sequenceStoreId: string;
  maxResults?: number;
  nextToken?: string;
  filter?: ExportReadSetFilter;
}
export const ListReadSetExportJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sequenceStoreId: S.String.pipe(T.HttpLabel("sequenceStoreId")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    filter: S.optional(ExportReadSetFilter),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/sequencestore/{sequenceStoreId}/exportjobs",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListReadSetExportJobsRequest",
}) as any as S.Schema<ListReadSetExportJobsRequest>;
export interface ExportReadSetJobDetail {
  id: string;
  sequenceStoreId: string;
  destination: string;
  status: string;
  creationTime: Date;
  completionTime?: Date;
}
export const ExportReadSetJobDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    sequenceStoreId: S.String,
    destination: S.String,
    status: S.String,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    completionTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "ExportReadSetJobDetail",
}) as any as S.Schema<ExportReadSetJobDetail>;
export type ExportReadSetJobDetailList = ExportReadSetJobDetail[];
export const ExportReadSetJobDetailList = /*@__PURE__*/ S.Array(
  ExportReadSetJobDetail,
);
export interface ListReadSetExportJobsResponse {
  nextToken?: string;
  exportJobs?: ExportReadSetJobDetail[];
}
export const ListReadSetExportJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    exportJobs: S.optional(ExportReadSetJobDetailList),
  }),
).annotate({
  identifier: "ListReadSetExportJobsResponse",
}) as any as S.Schema<ListReadSetExportJobsResponse>;
export interface ImportReadSetFilter {
  status?: string;
  createdAfter?: Date;
  createdBefore?: Date;
}
export const ImportReadSetFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.optional(S.String),
    createdAfter: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    createdBefore: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "ImportReadSetFilter",
}) as any as S.Schema<ImportReadSetFilter>;
export interface ListReadSetImportJobsRequest {
  maxResults?: number;
  nextToken?: string;
  sequenceStoreId: string;
  filter?: ImportReadSetFilter;
}
export const ListReadSetImportJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    sequenceStoreId: S.String.pipe(T.HttpLabel("sequenceStoreId")),
    filter: S.optional(ImportReadSetFilter),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/sequencestore/{sequenceStoreId}/importjobs",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListReadSetImportJobsRequest",
}) as any as S.Schema<ListReadSetImportJobsRequest>;
export interface ImportReadSetJobItem {
  id: string;
  sequenceStoreId: string;
  roleArn: string;
  status: string;
  creationTime: Date;
  completionTime?: Date;
}
export const ImportReadSetJobItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    sequenceStoreId: S.String,
    roleArn: S.String,
    status: S.String,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    completionTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "ImportReadSetJobItem",
}) as any as S.Schema<ImportReadSetJobItem>;
export type ImportReadSetJobList = ImportReadSetJobItem[];
export const ImportReadSetJobList = /*@__PURE__*/ S.Array(ImportReadSetJobItem);
export interface ListReadSetImportJobsResponse {
  nextToken?: string;
  importJobs?: ImportReadSetJobItem[];
}
export const ListReadSetImportJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    importJobs: S.optional(ImportReadSetJobList),
  }),
).annotate({
  identifier: "ListReadSetImportJobsResponse",
}) as any as S.Schema<ListReadSetImportJobsResponse>;
export type ReferenceArnFilter = string;
export interface ReadSetFilter {
  name?: string;
  status?: string;
  referenceArn?: string;
  createdAfter?: Date;
  createdBefore?: Date;
  sampleId?: string;
  subjectId?: string;
  generatedFrom?: string;
  creationType?: string;
}
export const ReadSetFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    status: S.optional(S.String),
    referenceArn: S.optional(S.String),
    createdAfter: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    createdBefore: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    sampleId: S.optional(S.String),
    subjectId: S.optional(S.String),
    generatedFrom: S.optional(S.String),
    creationType: S.optional(S.String),
  }),
).annotate({ identifier: "ReadSetFilter" }) as any as S.Schema<ReadSetFilter>;
export interface ListReadSetsRequest {
  sequenceStoreId: string;
  maxResults?: number;
  nextToken?: string;
  filter?: ReadSetFilter;
}
export const ListReadSetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sequenceStoreId: S.String.pipe(T.HttpLabel("sequenceStoreId")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    filter: S.optional(ReadSetFilter),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/sequencestore/{sequenceStoreId}/readsets",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListReadSetsRequest",
}) as any as S.Schema<ListReadSetsRequest>;
export interface ReadSetListItem {
  id: string;
  arn: string;
  sequenceStoreId: string;
  subjectId?: string;
  sampleId?: string;
  status: string;
  name?: string;
  description?: string;
  referenceArn?: string;
  fileType: string;
  sequenceInformation?: SequenceInformation;
  creationTime: Date;
  statusMessage?: string;
  creationType?: string;
  etag?: ETag;
}
export const ReadSetListItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    sequenceStoreId: S.String,
    subjectId: S.optional(S.String),
    sampleId: S.optional(S.String),
    status: S.String,
    name: S.optional(S.String),
    description: S.optional(S.String),
    referenceArn: S.optional(S.String),
    fileType: S.String,
    sequenceInformation: S.optional(SequenceInformation),
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    statusMessage: S.optional(S.String),
    creationType: S.optional(S.String),
    etag: S.optional(ETag),
  }),
).annotate({
  identifier: "ReadSetListItem",
}) as any as S.Schema<ReadSetListItem>;
export type ReadSetList = ReadSetListItem[];
export const ReadSetList = /*@__PURE__*/ S.Array(ReadSetListItem);
export interface ListReadSetsResponse {
  nextToken?: string;
  readSets: ReadSetListItem[];
}
export const ListReadSetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), readSets: ReadSetList }),
).annotate({
  identifier: "ListReadSetsResponse",
}) as any as S.Schema<ListReadSetsResponse>;
export interface ReadSetUploadPartListFilter {
  createdAfter?: Date;
  createdBefore?: Date;
}
export const ReadSetUploadPartListFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    createdAfter: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    createdBefore: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "ReadSetUploadPartListFilter",
}) as any as S.Schema<ReadSetUploadPartListFilter>;
export interface ListReadSetUploadPartsRequest {
  sequenceStoreId: string;
  uploadId: string;
  partSource: string;
  maxResults?: number;
  nextToken?: string;
  filter?: ReadSetUploadPartListFilter;
}
export const ListReadSetUploadPartsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sequenceStoreId: S.String.pipe(T.HttpLabel("sequenceStoreId")),
    uploadId: S.String.pipe(T.HttpLabel("uploadId")),
    partSource: S.String,
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    filter: S.optional(ReadSetUploadPartListFilter),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/sequencestore/{sequenceStoreId}/upload/{uploadId}/parts",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListReadSetUploadPartsRequest",
}) as any as S.Schema<ListReadSetUploadPartsRequest>;
export interface ReadSetUploadPartListItem {
  partNumber: number;
  partSize: number;
  partSource: string;
  checksum: string;
  creationTime?: Date;
  lastUpdatedTime?: Date;
}
export const ReadSetUploadPartListItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    partNumber: S.Number,
    partSize: S.Number,
    partSource: S.String,
    checksum: S.String,
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastUpdatedTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "ReadSetUploadPartListItem",
}) as any as S.Schema<ReadSetUploadPartListItem>;
export type ReadSetUploadPartList = ReadSetUploadPartListItem[];
export const ReadSetUploadPartList = /*@__PURE__*/ S.Array(
  ReadSetUploadPartListItem,
);
export interface ListReadSetUploadPartsResponse {
  nextToken?: string;
  parts?: ReadSetUploadPartListItem[];
}
export const ListReadSetUploadPartsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    parts: S.optional(ReadSetUploadPartList),
  }),
).annotate({
  identifier: "ListReadSetUploadPartsResponse",
}) as any as S.Schema<ListReadSetUploadPartsResponse>;
export interface ImportReferenceFilter {
  status?: string;
  createdAfter?: Date;
  createdBefore?: Date;
}
export const ImportReferenceFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.optional(S.String),
    createdAfter: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    createdBefore: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "ImportReferenceFilter",
}) as any as S.Schema<ImportReferenceFilter>;
export interface ListReferenceImportJobsRequest {
  maxResults?: number;
  nextToken?: string;
  referenceStoreId: string;
  filter?: ImportReferenceFilter;
}
export const ListReferenceImportJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    referenceStoreId: S.String.pipe(T.HttpLabel("referenceStoreId")),
    filter: S.optional(ImportReferenceFilter),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/referencestore/{referenceStoreId}/importjobs",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListReferenceImportJobsRequest",
}) as any as S.Schema<ListReferenceImportJobsRequest>;
export interface ImportReferenceJobItem {
  id: string;
  referenceStoreId: string;
  roleArn: string;
  status: string;
  creationTime: Date;
  completionTime?: Date;
}
export const ImportReferenceJobItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    referenceStoreId: S.String,
    roleArn: S.String,
    status: S.String,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    completionTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "ImportReferenceJobItem",
}) as any as S.Schema<ImportReferenceJobItem>;
export type ImportReferenceJobList = ImportReferenceJobItem[];
export const ImportReferenceJobList = /*@__PURE__*/ S.Array(
  ImportReferenceJobItem,
);
export interface ListReferenceImportJobsResponse {
  nextToken?: string;
  importJobs?: ImportReferenceJobItem[];
}
export const ListReferenceImportJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    importJobs: S.optional(ImportReferenceJobList),
  }),
).annotate({
  identifier: "ListReferenceImportJobsResponse",
}) as any as S.Schema<ListReferenceImportJobsResponse>;
export interface ReferenceFilter {
  name?: string;
  md5?: string;
  createdAfter?: Date;
  createdBefore?: Date;
}
export const ReferenceFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    md5: S.optional(S.String),
    createdAfter: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    createdBefore: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "ReferenceFilter",
}) as any as S.Schema<ReferenceFilter>;
export interface ListReferencesRequest {
  referenceStoreId: string;
  maxResults?: number;
  nextToken?: string;
  filter?: ReferenceFilter;
}
export const ListReferencesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    referenceStoreId: S.String.pipe(T.HttpLabel("referenceStoreId")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    filter: S.optional(ReferenceFilter),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/referencestore/{referenceStoreId}/references",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListReferencesRequest",
}) as any as S.Schema<ListReferencesRequest>;
export interface ReferenceListItem {
  id: string;
  arn: string;
  referenceStoreId: string;
  md5: string;
  status?: string;
  name?: string;
  description?: string;
  creationTime: Date;
  updateTime: Date;
}
export const ReferenceListItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    referenceStoreId: S.String,
    md5: S.String,
    status: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "ReferenceListItem",
}) as any as S.Schema<ReferenceListItem>;
export type ReferenceList = ReferenceListItem[];
export const ReferenceList = /*@__PURE__*/ S.Array(ReferenceListItem);
export interface ListReferencesResponse {
  nextToken?: string;
  references: ReferenceListItem[];
}
export const ListReferencesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), references: ReferenceList }),
).annotate({
  identifier: "ListReferencesResponse",
}) as any as S.Schema<ListReferencesResponse>;
export interface ReferenceStoreFilter {
  name?: string;
  createdAfter?: Date;
  createdBefore?: Date;
}
export const ReferenceStoreFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    createdAfter: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    createdBefore: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "ReferenceStoreFilter",
}) as any as S.Schema<ReferenceStoreFilter>;
export interface ListReferenceStoresRequest {
  maxResults?: number;
  nextToken?: string;
  filter?: ReferenceStoreFilter;
}
export const ListReferenceStoresRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    filter: S.optional(ReferenceStoreFilter),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/referencestores" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListReferenceStoresRequest",
}) as any as S.Schema<ListReferenceStoresRequest>;
export interface ReferenceStoreDetail {
  arn: string;
  id: string;
  name?: string;
  description?: string;
  sseConfig?: SseConfig;
  creationTime: Date;
}
export const ReferenceStoreDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    id: S.String,
    name: S.optional(S.String),
    description: S.optional(S.String),
    sseConfig: S.optional(SseConfig),
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "ReferenceStoreDetail",
}) as any as S.Schema<ReferenceStoreDetail>;
export type ReferenceStoreDetailList = ReferenceStoreDetail[];
export const ReferenceStoreDetailList =
  /*@__PURE__*/ S.Array(ReferenceStoreDetail);
export interface ListReferenceStoresResponse {
  nextToken?: string;
  referenceStores: ReferenceStoreDetail[];
}
export const ListReferenceStoresResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    referenceStores: ReferenceStoreDetailList,
  }),
).annotate({
  identifier: "ListReferenceStoresResponse",
}) as any as S.Schema<ListReferenceStoresResponse>;
export interface ListRunCachesRequest {
  maxResults?: number;
  startingToken?: string;
}
export const ListRunCachesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    startingToken: S.optional(S.String).pipe(T.HttpQuery("startingToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/runCache" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListRunCachesRequest",
}) as any as S.Schema<ListRunCachesRequest>;
export interface RunCacheListItem {
  arn?: string;
  cacheBehavior?: string;
  cacheS3Uri?: string;
  creationTime?: Date;
  id?: string;
  name?: string;
  status?: string;
}
export const RunCacheListItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    cacheBehavior: S.optional(S.String),
    cacheS3Uri: S.optional(S.String),
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    id: S.optional(S.String),
    name: S.optional(S.String),
    status: S.optional(S.String),
  }),
).annotate({
  identifier: "RunCacheListItem",
}) as any as S.Schema<RunCacheListItem>;
export type RunCacheList = RunCacheListItem[];
export const RunCacheList = /*@__PURE__*/ S.Array(RunCacheListItem);
export interface ListRunCachesResponse {
  items?: RunCacheListItem[];
  nextToken?: string;
}
export const ListRunCachesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(RunCacheList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListRunCachesResponse",
}) as any as S.Schema<ListRunCachesResponse>;
export type RunGroupListToken = string;
export interface ListRunGroupsRequest {
  name?: string;
  startingToken?: string;
  maxResults?: number;
}
export const ListRunGroupsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String).pipe(T.HttpQuery("name")),
    startingToken: S.optional(S.String).pipe(T.HttpQuery("startingToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/runGroup" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListRunGroupsRequest",
}) as any as S.Schema<ListRunGroupsRequest>;
export interface RunGroupListItem {
  arn?: string;
  id?: string;
  name?: string;
  maxCpus?: number;
  maxRuns?: number;
  maxDuration?: number;
  creationTime?: Date;
  maxGpus?: number;
}
export const RunGroupListItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    id: S.optional(S.String),
    name: S.optional(S.String),
    maxCpus: S.optional(S.Number),
    maxRuns: S.optional(S.Number),
    maxDuration: S.optional(S.Number),
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    maxGpus: S.optional(S.Number),
  }),
).annotate({
  identifier: "RunGroupListItem",
}) as any as S.Schema<RunGroupListItem>;
export type RunGroupList = RunGroupListItem[];
export const RunGroupList = /*@__PURE__*/ S.Array(RunGroupListItem);
export interface ListRunGroupsResponse {
  items?: RunGroupListItem[];
  nextToken?: string;
}
export const ListRunGroupsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(RunGroupList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListRunGroupsResponse",
}) as any as S.Schema<ListRunGroupsResponse>;
export type RunListToken = string;
export interface ListRunsRequest {
  name?: string;
  runGroupId?: string;
  batchId?: string;
  startingToken?: string;
  maxResults?: number;
  status?: string;
}
export const ListRunsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String).pipe(T.HttpQuery("name")),
    runGroupId: S.optional(S.String).pipe(T.HttpQuery("runGroupId")),
    batchId: S.optional(S.String).pipe(T.HttpQuery("batchId")),
    startingToken: S.optional(S.String).pipe(T.HttpQuery("startingToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    status: S.optional(S.String).pipe(T.HttpQuery("status")),
  }).pipe(
    T.all(T.Http({ method: "GET", uri: "/run" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListRunsRequest",
}) as any as S.Schema<ListRunsRequest>;
export interface RunListItem {
  arn?: string;
  id?: string;
  status?: string;
  workflowId?: string;
  batchId?: string;
  name?: string;
  priority?: number;
  storageCapacity?: number;
  creationTime?: Date;
  startTime?: Date;
  stopTime?: Date;
  storageType?: string;
  workflowVersionName?: string;
  workflowName?: string;
}
export const RunListItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    id: S.optional(S.String),
    status: S.optional(S.String),
    workflowId: S.optional(S.String),
    batchId: S.optional(S.String),
    name: S.optional(S.String),
    priority: S.optional(S.Number),
    storageCapacity: S.optional(S.Number),
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    startTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    stopTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    storageType: S.optional(S.String),
    workflowVersionName: S.optional(S.String),
    workflowName: S.optional(S.String),
  }),
).annotate({ identifier: "RunListItem" }) as any as S.Schema<RunListItem>;
export type RunList = RunListItem[];
export const RunList = /*@__PURE__*/ S.Array(RunListItem);
export interface ListRunsResponse {
  items?: RunListItem[];
  nextToken?: string;
}
export const ListRunsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ items: S.optional(RunList), nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListRunsResponse",
}) as any as S.Schema<ListRunsResponse>;
export type SubmissionStatus = string;
export interface ListRunsInBatchRequest {
  batchId: string;
  maxItems?: number;
  startingToken?: string;
  submissionStatus?: string;
  runSettingId?: string;
  runId?: string;
}
export const ListRunsInBatchRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    batchId: S.String.pipe(T.HttpLabel("batchId")),
    maxItems: S.optional(S.Number).pipe(T.HttpQuery("maxItems")),
    startingToken: S.optional(S.String).pipe(T.HttpQuery("startingToken")),
    submissionStatus: S.optional(S.String).pipe(
      T.HttpQuery("submissionStatus"),
    ),
    runSettingId: S.optional(S.String).pipe(T.HttpQuery("runSettingId")),
    runId: S.optional(S.String).pipe(T.HttpQuery("runId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/runBatch/{batchId}/run" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListRunsInBatchRequest",
}) as any as S.Schema<ListRunsInBatchRequest>;
export type RunSettingId = string;
export type SubmissionFailureReason = string;
export type SubmissionFailureMessage = string;
export interface RunBatchListItem {
  runSettingId?: string;
  runId?: string;
  runInternalUuid?: string;
  runArn?: string;
  submissionStatus?: string;
  submissionFailureReason?: string;
  submissionFailureMessage?: string;
}
export const RunBatchListItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    runSettingId: S.optional(S.String),
    runId: S.optional(S.String),
    runInternalUuid: S.optional(S.String),
    runArn: S.optional(S.String),
    submissionStatus: S.optional(S.String),
    submissionFailureReason: S.optional(S.String),
    submissionFailureMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "RunBatchListItem",
}) as any as S.Schema<RunBatchListItem>;
export type RunBatchList = RunBatchListItem[];
export const RunBatchList = /*@__PURE__*/ S.Array(RunBatchListItem);
export interface ListRunsInBatchResponse {
  runs?: RunBatchListItem[];
  nextToken?: string;
}
export const ListRunsInBatchResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ runs: S.optional(RunBatchList), nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListRunsInBatchResponse",
}) as any as S.Schema<ListRunsInBatchResponse>;
export type TaskListToken = string;
export interface ListRunTasksRequest {
  id: string;
  status?: string;
  startingToken?: string;
  maxResults?: number;
}
export const ListRunTasksRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    status: S.optional(S.String).pipe(T.HttpQuery("status")),
    startingToken: S.optional(S.String).pipe(T.HttpQuery("startingToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/run/{id}/task" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListRunTasksRequest",
}) as any as S.Schema<ListRunTasksRequest>;
export interface TaskListItem {
  taskId?: string;
  status?: string;
  name?: string;
  cpus?: number;
  cacheHit?: boolean;
  cacheS3Uri?: string;
  memory?: number;
  creationTime?: Date;
  startTime?: Date;
  stopTime?: Date;
  gpus?: number;
  instanceType?: string;
  uuid?: string;
}
export const TaskListItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taskId: S.optional(S.String),
    status: S.optional(S.String),
    name: S.optional(S.String),
    cpus: S.optional(S.Number),
    cacheHit: S.optional(S.Boolean),
    cacheS3Uri: S.optional(S.String),
    memory: S.optional(S.Number),
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    startTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    stopTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    gpus: S.optional(S.Number),
    instanceType: S.optional(S.String),
    uuid: S.optional(S.String),
  }),
).annotate({ identifier: "TaskListItem" }) as any as S.Schema<TaskListItem>;
export type TaskList = TaskListItem[];
export const TaskList = /*@__PURE__*/ S.Array(TaskListItem);
export interface ListRunTasksResponse {
  items?: TaskListItem[];
  nextToken?: string;
}
export const ListRunTasksResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ items: S.optional(TaskList), nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListRunTasksResponse",
}) as any as S.Schema<ListRunTasksResponse>;
export interface SequenceStoreFilter {
  name?: string;
  createdAfter?: Date;
  createdBefore?: Date;
  status?: string;
  updatedAfter?: Date;
  updatedBefore?: Date;
}
export const SequenceStoreFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    createdAfter: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    createdBefore: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    status: S.optional(S.String),
    updatedAfter: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedBefore: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "SequenceStoreFilter",
}) as any as S.Schema<SequenceStoreFilter>;
export interface ListSequenceStoresRequest {
  maxResults?: number;
  nextToken?: string;
  filter?: SequenceStoreFilter;
}
export const ListSequenceStoresRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    filter: S.optional(SequenceStoreFilter),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/sequencestores" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSequenceStoresRequest",
}) as any as S.Schema<ListSequenceStoresRequest>;
export interface SequenceStoreDetail {
  arn: string;
  id: string;
  name?: string;
  description?: string;
  sseConfig?: SseConfig;
  creationTime: Date;
  fallbackLocation?: string;
  eTagAlgorithmFamily?: string;
  status?: string;
  statusMessage?: string;
  updateTime?: Date;
}
export const SequenceStoreDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    id: S.String,
    name: S.optional(S.String),
    description: S.optional(S.String),
    sseConfig: S.optional(SseConfig),
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    fallbackLocation: S.optional(S.String),
    eTagAlgorithmFamily: S.optional(S.String),
    status: S.optional(S.String),
    statusMessage: S.optional(S.String),
    updateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "SequenceStoreDetail",
}) as any as S.Schema<SequenceStoreDetail>;
export type SequenceStoreDetailList = SequenceStoreDetail[];
export const SequenceStoreDetailList =
  /*@__PURE__*/ S.Array(SequenceStoreDetail);
export interface ListSequenceStoresResponse {
  nextToken?: string;
  sequenceStores: SequenceStoreDetail[];
}
export const ListSequenceStoresResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    sequenceStores: SequenceStoreDetailList,
  }),
).annotate({
  identifier: "ListSequenceStoresResponse",
}) as any as S.Schema<ListSequenceStoresResponse>;
export type ResourceOwner = string;
export type ArnList = string[];
export const ArnList = /*@__PURE__*/ S.Array(S.String);
export type StatusList = string[];
export const StatusList = /*@__PURE__*/ S.Array(S.String);
export type ShareResourceType = string;
export type TypeList = string[];
export const TypeList = /*@__PURE__*/ S.Array(S.String);
export interface Filter {
  resourceArns?: string[];
  status?: string[];
  type?: string[];
}
export const Filter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArns: S.optional(ArnList),
    status: S.optional(StatusList),
    type: S.optional(TypeList),
  }),
).annotate({ identifier: "Filter" }) as any as S.Schema<Filter>;
export interface ListSharesRequest {
  resourceOwner: string;
  filter?: Filter;
  nextToken?: string;
  maxResults?: number;
}
export const ListSharesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceOwner: S.String,
    filter: S.optional(Filter),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/shares" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSharesRequest",
}) as any as S.Schema<ListSharesRequest>;
export type ShareDetailsList = ShareDetails[];
export const ShareDetailsList = /*@__PURE__*/ S.Array(ShareDetails);
export interface ListSharesResponse {
  shares: ShareDetails[];
  nextToken?: string;
}
export const ListSharesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ shares: ShareDetailsList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListSharesResponse",
}) as any as S.Schema<ListSharesResponse>;
export type TagArn = string;
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
  tags: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: TagMap }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface ListVariantImportJobsFilter {
  status?: string;
  storeName?: string;
}
export const ListVariantImportJobsFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: S.optional(S.String), storeName: S.optional(S.String) }),
).annotate({
  identifier: "ListVariantImportJobsFilter",
}) as any as S.Schema<ListVariantImportJobsFilter>;
export interface ListVariantImportJobsRequest {
  maxResults?: number;
  ids?: string[];
  nextToken?: string;
  filter?: ListVariantImportJobsFilter;
}
export const ListVariantImportJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    ids: S.optional(IdList),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    filter: S.optional(ListVariantImportJobsFilter),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/import/variants" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListVariantImportJobsRequest",
}) as any as S.Schema<ListVariantImportJobsRequest>;
export interface VariantImportJobItem {
  id: string;
  destinationName: string;
  roleArn: string;
  status: string;
  creationTime: Date;
  updateTime: Date;
  completionTime?: Date;
  runLeftNormalization?: boolean;
  annotationFields?: { [key: string]: string | undefined };
}
export const VariantImportJobItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    destinationName: S.String,
    roleArn: S.String,
    status: S.String,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    completionTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    runLeftNormalization: S.optional(S.Boolean),
    annotationFields: S.optional(AnnotationFieldMap),
  }),
).annotate({
  identifier: "VariantImportJobItem",
}) as any as S.Schema<VariantImportJobItem>;
export type VariantImportJobItems = VariantImportJobItem[];
export const VariantImportJobItems =
  /*@__PURE__*/ S.Array(VariantImportJobItem);
export interface ListVariantImportJobsResponse {
  variantImportJobs?: VariantImportJobItem[];
  nextToken?: string;
}
export const ListVariantImportJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    variantImportJobs: S.optional(VariantImportJobItems),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListVariantImportJobsResponse",
}) as any as S.Schema<ListVariantImportJobsResponse>;
export interface ListVariantStoresFilter {
  status?: string;
}
export const ListVariantStoresFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: S.optional(S.String) }),
).annotate({
  identifier: "ListVariantStoresFilter",
}) as any as S.Schema<ListVariantStoresFilter>;
export interface ListVariantStoresRequest {
  maxResults?: number;
  ids?: string[];
  nextToken?: string;
  filter?: ListVariantStoresFilter;
}
export const ListVariantStoresRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    ids: S.optional(IdList),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    filter: S.optional(ListVariantStoresFilter),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/variantStores" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListVariantStoresRequest",
}) as any as S.Schema<ListVariantStoresRequest>;
export interface VariantStoreItem {
  id: string;
  reference: ReferenceItem;
  status: string;
  storeArn: string;
  name: string;
  description: string;
  sseConfig: SseConfig;
  creationTime: Date;
  updateTime: Date;
  statusMessage: string;
  storeSizeBytes: number;
}
export const VariantStoreItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    reference: ReferenceItem,
    status: S.String,
    storeArn: S.String,
    name: S.String,
    description: S.String,
    sseConfig: SseConfig,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    statusMessage: S.String,
    storeSizeBytes: S.Number,
  }),
).annotate({
  identifier: "VariantStoreItem",
}) as any as S.Schema<VariantStoreItem>;
export type VariantStoreItems = VariantStoreItem[];
export const VariantStoreItems = /*@__PURE__*/ S.Array(VariantStoreItem);
export interface ListVariantStoresResponse {
  variantStores?: VariantStoreItem[];
  nextToken?: string;
}
export const ListVariantStoresResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    variantStores: S.optional(VariantStoreItems),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListVariantStoresResponse",
}) as any as S.Schema<ListVariantStoresResponse>;
export type WorkflowListToken = string;
export interface ListWorkflowsRequest {
  type?: string;
  name?: string;
  startingToken?: string;
  maxResults?: number;
}
export const ListWorkflowsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(S.String).pipe(T.HttpQuery("type")),
    name: S.optional(S.String).pipe(T.HttpQuery("name")),
    startingToken: S.optional(S.String).pipe(T.HttpQuery("startingToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/workflow" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListWorkflowsRequest",
}) as any as S.Schema<ListWorkflowsRequest>;
export interface WorkflowListItem {
  arn?: string;
  id?: string;
  name?: string;
  status?: string;
  type?: string;
  digest?: string;
  creationTime?: Date;
  metadata?: { [key: string]: string | undefined };
}
export const WorkflowListItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    id: S.optional(S.String),
    name: S.optional(S.String),
    status: S.optional(S.String),
    type: S.optional(S.String),
    digest: S.optional(S.String),
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    metadata: S.optional(WorkflowMetadata),
  }),
).annotate({
  identifier: "WorkflowListItem",
}) as any as S.Schema<WorkflowListItem>;
export type WorkflowList = WorkflowListItem[];
export const WorkflowList = /*@__PURE__*/ S.Array(WorkflowListItem);
export interface ListWorkflowsResponse {
  items?: WorkflowListItem[];
  nextToken?: string;
}
export const ListWorkflowsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(WorkflowList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListWorkflowsResponse",
}) as any as S.Schema<ListWorkflowsResponse>;
export type WorkflowVersionListToken = string;
export interface ListWorkflowVersionsRequest {
  workflowId: string;
  type?: string;
  workflowOwnerId?: string;
  startingToken?: string;
  maxResults?: number;
}
export const ListWorkflowVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workflowId: S.String.pipe(T.HttpLabel("workflowId")),
    type: S.optional(S.String).pipe(T.HttpQuery("type")),
    workflowOwnerId: S.optional(S.String).pipe(T.HttpQuery("workflowOwnerId")),
    startingToken: S.optional(S.String).pipe(T.HttpQuery("startingToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/workflow/{workflowId}/version" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListWorkflowVersionsRequest",
}) as any as S.Schema<ListWorkflowVersionsRequest>;
export interface WorkflowVersionListItem {
  arn?: string;
  workflowId?: string;
  versionName?: string;
  description?: string;
  status?: string;
  type?: string;
  digest?: string;
  creationTime?: Date;
  metadata?: { [key: string]: string | undefined };
}
export const WorkflowVersionListItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    workflowId: S.optional(S.String),
    versionName: S.optional(S.String),
    description: S.optional(S.String),
    status: S.optional(S.String),
    type: S.optional(S.String),
    digest: S.optional(S.String),
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    metadata: S.optional(WorkflowMetadata),
  }),
).annotate({
  identifier: "WorkflowVersionListItem",
}) as any as S.Schema<WorkflowVersionListItem>;
export type WorkflowVersionList = WorkflowVersionListItem[];
export const WorkflowVersionList = /*@__PURE__*/ S.Array(
  WorkflowVersionListItem,
);
export interface ListWorkflowVersionsResponse {
  items?: WorkflowVersionListItem[];
  nextToken?: string;
}
export const ListWorkflowVersionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(WorkflowVersionList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListWorkflowVersionsResponse",
}) as any as S.Schema<ListWorkflowVersionsResponse>;
export interface PutS3AccessPolicyRequest {
  s3AccessPointArn: string;
  s3AccessPolicy: string;
}
export const PutS3AccessPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    s3AccessPointArn: S.String.pipe(T.HttpLabel("s3AccessPointArn")),
    s3AccessPolicy: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/s3accesspolicy/{s3AccessPointArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutS3AccessPolicyRequest",
}) as any as S.Schema<PutS3AccessPolicyRequest>;
export interface PutS3AccessPolicyResponse {
  s3AccessPointArn?: string;
  storeId?: string;
  storeType?: StoreType;
}
export const PutS3AccessPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    s3AccessPointArn: S.optional(S.String),
    storeId: S.optional(S.String),
    storeType: S.optional(StoreType),
  }),
).annotate({
  identifier: "PutS3AccessPolicyResponse",
}) as any as S.Schema<PutS3AccessPolicyResponse>;
export interface AnnotationImportItemSource {
  source: string;
}
export const AnnotationImportItemSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ source: S.String }),
).annotate({
  identifier: "AnnotationImportItemSource",
}) as any as S.Schema<AnnotationImportItemSource>;
export type AnnotationImportItemSources = AnnotationImportItemSource[];
export const AnnotationImportItemSources = /*@__PURE__*/ S.Array(
  AnnotationImportItemSource,
);
export interface StartAnnotationImportRequest {
  destinationName: string;
  roleArn: string;
  items: AnnotationImportItemSource[];
  versionName?: string;
  formatOptions?: FormatOptions;
  runLeftNormalization?: boolean;
  annotationFields?: { [key: string]: string | undefined };
}
export const StartAnnotationImportRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    destinationName: S.String,
    roleArn: S.String,
    items: AnnotationImportItemSources,
    versionName: S.optional(S.String),
    formatOptions: S.optional(FormatOptions),
    runLeftNormalization: S.optional(S.Boolean),
    annotationFields: S.optional(AnnotationFieldMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/import/annotation" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartAnnotationImportRequest",
}) as any as S.Schema<StartAnnotationImportRequest>;
export interface StartAnnotationImportResponse {
  jobId: string;
}
export const StartAnnotationImportResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobId: S.String }),
).annotate({
  identifier: "StartAnnotationImportResponse",
}) as any as S.Schema<StartAnnotationImportResponse>;
export interface StartReadSetActivationJobSourceItem {
  readSetId: string;
}
export const StartReadSetActivationJobSourceItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ readSetId: S.String }),
).annotate({
  identifier: "StartReadSetActivationJobSourceItem",
}) as any as S.Schema<StartReadSetActivationJobSourceItem>;
export type StartReadSetActivationJobSourceList =
  StartReadSetActivationJobSourceItem[];
export const StartReadSetActivationJobSourceList = /*@__PURE__*/ S.Array(
  StartReadSetActivationJobSourceItem,
);
export interface StartReadSetActivationJobRequest {
  sequenceStoreId: string;
  clientToken?: string;
  sources: StartReadSetActivationJobSourceItem[];
}
export const StartReadSetActivationJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sequenceStoreId: S.String.pipe(T.HttpLabel("sequenceStoreId")),
    clientToken: S.optional(S.String),
    sources: StartReadSetActivationJobSourceList,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/sequencestore/{sequenceStoreId}/activationjob",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartReadSetActivationJobRequest",
}) as any as S.Schema<StartReadSetActivationJobRequest>;
export interface StartReadSetActivationJobResponse {
  id: string;
  sequenceStoreId: string;
  status: string;
  creationTime: Date;
}
export const StartReadSetActivationJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    sequenceStoreId: S.String,
    status: S.String,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "StartReadSetActivationJobResponse",
}) as any as S.Schema<StartReadSetActivationJobResponse>;
export interface ExportReadSet {
  readSetId: string;
}
export const ExportReadSet = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ readSetId: S.String }),
).annotate({ identifier: "ExportReadSet" }) as any as S.Schema<ExportReadSet>;
export type ExportReadSetList = ExportReadSet[];
export const ExportReadSetList = /*@__PURE__*/ S.Array(ExportReadSet);
export interface StartReadSetExportJobRequest {
  sequenceStoreId: string;
  destination: string;
  roleArn: string;
  clientToken?: string;
  sources: ExportReadSet[];
}
export const StartReadSetExportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sequenceStoreId: S.String.pipe(T.HttpLabel("sequenceStoreId")),
    destination: S.String,
    roleArn: S.String,
    clientToken: S.optional(S.String),
    sources: ExportReadSetList,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/sequencestore/{sequenceStoreId}/exportjob",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartReadSetExportJobRequest",
}) as any as S.Schema<StartReadSetExportJobRequest>;
export interface StartReadSetExportJobResponse {
  id: string;
  sequenceStoreId: string;
  destination: string;
  status: string;
  creationTime: Date;
}
export const StartReadSetExportJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    sequenceStoreId: S.String,
    destination: S.String,
    status: S.String,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "StartReadSetExportJobResponse",
}) as any as S.Schema<StartReadSetExportJobResponse>;
export interface StartReadSetImportJobSourceItem {
  sourceFiles: SourceFiles;
  sourceFileType: string;
  subjectId: string;
  sampleId: string;
  generatedFrom?: string;
  referenceArn?: string;
  name?: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
}
export const StartReadSetImportJobSourceItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceFiles: SourceFiles,
    sourceFileType: S.String,
    subjectId: S.String,
    sampleId: S.String,
    generatedFrom: S.optional(S.String),
    referenceArn: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "StartReadSetImportJobSourceItem",
}) as any as S.Schema<StartReadSetImportJobSourceItem>;
export type StartReadSetImportJobSourceList = StartReadSetImportJobSourceItem[];
export const StartReadSetImportJobSourceList = /*@__PURE__*/ S.Array(
  StartReadSetImportJobSourceItem,
);
export interface StartReadSetImportJobRequest {
  sequenceStoreId: string;
  roleArn: string;
  clientToken?: string;
  sources: StartReadSetImportJobSourceItem[];
}
export const StartReadSetImportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sequenceStoreId: S.String.pipe(T.HttpLabel("sequenceStoreId")),
    roleArn: S.String,
    clientToken: S.optional(S.String),
    sources: StartReadSetImportJobSourceList,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/sequencestore/{sequenceStoreId}/importjob",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartReadSetImportJobRequest",
}) as any as S.Schema<StartReadSetImportJobRequest>;
export interface StartReadSetImportJobResponse {
  id: string;
  sequenceStoreId: string;
  roleArn: string;
  status: string;
  creationTime: Date;
}
export const StartReadSetImportJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    sequenceStoreId: S.String,
    roleArn: S.String,
    status: S.String,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "StartReadSetImportJobResponse",
}) as any as S.Schema<StartReadSetImportJobResponse>;
export interface StartReferenceImportJobSourceItem {
  sourceFile: string;
  name: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
}
export const StartReferenceImportJobSourceItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceFile: S.String,
    name: S.String,
    description: S.optional(S.String),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "StartReferenceImportJobSourceItem",
}) as any as S.Schema<StartReferenceImportJobSourceItem>;
export type StartReferenceImportJobSourceList =
  StartReferenceImportJobSourceItem[];
export const StartReferenceImportJobSourceList = /*@__PURE__*/ S.Array(
  StartReferenceImportJobSourceItem,
);
export interface StartReferenceImportJobRequest {
  referenceStoreId: string;
  roleArn: string;
  clientToken?: string;
  sources: StartReferenceImportJobSourceItem[];
}
export const StartReferenceImportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    referenceStoreId: S.String.pipe(T.HttpLabel("referenceStoreId")),
    roleArn: S.String,
    clientToken: S.optional(S.String),
    sources: StartReferenceImportJobSourceList,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/referencestore/{referenceStoreId}/importjob",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartReferenceImportJobRequest",
}) as any as S.Schema<StartReferenceImportJobRequest>;
export interface StartReferenceImportJobResponse {
  id: string;
  referenceStoreId: string;
  roleArn: string;
  status: string;
  creationTime: Date;
}
export const StartReferenceImportJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    referenceStoreId: S.String,
    roleArn: S.String,
    status: S.String,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "StartReferenceImportJobResponse",
}) as any as S.Schema<StartReferenceImportJobResponse>;
export type RunRequestId = string;
export interface StartRunRequest {
  workflowId?: string;
  workflowType?: string;
  runId?: string;
  roleArn: string;
  name?: string;
  cacheId?: string;
  cacheBehavior?: string;
  runGroupId?: string;
  priority?: number;
  parameters?: any;
  storageCapacity?: number;
  outputUri: string;
  logLevel?: string;
  tags?: { [key: string]: string | undefined };
  requestId: string;
  retentionMode?: string;
  storageType?: string;
  workflowOwnerId?: string;
  workflowVersionName?: string;
  networkingMode?: string;
  scratchStorageMode?: string;
  configurationName?: string;
  engineSettings?: any;
}
export const StartRunRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workflowId: S.optional(S.String),
    workflowType: S.optional(S.String),
    runId: S.optional(S.String),
    roleArn: S.String,
    name: S.optional(S.String),
    cacheId: S.optional(S.String),
    cacheBehavior: S.optional(S.String),
    runGroupId: S.optional(S.String),
    priority: S.optional(S.Number),
    parameters: S.optional(S.Any),
    storageCapacity: S.optional(S.Number),
    outputUri: S.String,
    logLevel: S.optional(S.String),
    tags: S.optional(TagMap),
    requestId: S.String.pipe(T.IdempotencyToken()),
    retentionMode: S.optional(S.String),
    storageType: S.optional(S.String),
    workflowOwnerId: S.optional(S.String),
    workflowVersionName: S.optional(S.String),
    networkingMode: S.optional(S.String),
    scratchStorageMode: S.optional(S.String),
    configurationName: S.optional(S.String),
    engineSettings: S.optional(S.Any),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/run" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartRunRequest",
}) as any as S.Schema<StartRunRequest>;
export interface StartRunResponse {
  arn?: string;
  id?: string;
  status?: string;
  tags?: { [key: string]: string | undefined };
  uuid?: string;
  runOutputUri?: string;
  configuration?: ConfigurationDetails;
  networkingMode?: string;
}
export const StartRunResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    id: S.optional(S.String),
    status: S.optional(S.String),
    tags: S.optional(TagMap),
    uuid: S.optional(S.String),
    runOutputUri: S.optional(S.String),
    configuration: S.optional(ConfigurationDetails),
    networkingMode: S.optional(S.String),
  }),
).annotate({
  identifier: "StartRunResponse",
}) as any as S.Schema<StartRunResponse>;
export type BatchRequestId = string;
export interface InlineSetting {
  runSettingId: string;
  name?: string;
  outputUri?: string;
  priority?: number;
  parameters?: any;
  outputBucketOwnerId?: string;
  runTags?: { [key: string]: string | undefined };
  engineSettings?: any;
}
export const InlineSetting = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    runSettingId: S.String,
    name: S.optional(S.String),
    outputUri: S.optional(S.String),
    priority: S.optional(S.Number),
    parameters: S.optional(S.Any),
    outputBucketOwnerId: S.optional(S.String),
    runTags: S.optional(TagMap),
    engineSettings: S.optional(S.Any),
  }),
).annotate({ identifier: "InlineSetting" }) as any as S.Schema<InlineSetting>;
export type InlineSettings = InlineSetting[];
export const InlineSettings = /*@__PURE__*/ S.Array(InlineSetting);
export type S3UriSettings = string;
export type BatchRunSettings =
  | { inlineSettings: InlineSetting[]; s3UriSettings?: never }
  | { inlineSettings?: never; s3UriSettings: string };
export const BatchRunSettings = /*@__PURE__*/ S.Union([
  S.Struct({ inlineSettings: InlineSettings }),
  S.Struct({ s3UriSettings: S.String }),
]);
export interface StartRunBatchRequest {
  batchName?: string;
  requestId: string;
  tags?: { [key: string]: string | undefined };
  defaultRunSetting: DefaultRunSetting;
  batchRunSettings: BatchRunSettings;
}
export const StartRunBatchRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    batchName: S.optional(S.String),
    requestId: S.String.pipe(T.IdempotencyToken()),
    tags: S.optional(TagMap),
    defaultRunSetting: DefaultRunSetting,
    batchRunSettings: BatchRunSettings,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/runBatch" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartRunBatchRequest",
}) as any as S.Schema<StartRunBatchRequest>;
export interface StartRunBatchResponse {
  id?: string;
  arn?: string;
  status?: string;
  uuid?: string;
  tags?: { [key: string]: string | undefined };
}
export const StartRunBatchResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    arn: S.optional(S.String),
    status: S.optional(S.String),
    uuid: S.optional(S.String),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "StartRunBatchResponse",
}) as any as S.Schema<StartRunBatchResponse>;
export interface VariantImportItemSource {
  source: string;
}
export const VariantImportItemSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ source: S.String }),
).annotate({
  identifier: "VariantImportItemSource",
}) as any as S.Schema<VariantImportItemSource>;
export type VariantImportItemSources = VariantImportItemSource[];
export const VariantImportItemSources = /*@__PURE__*/ S.Array(
  VariantImportItemSource,
);
export interface StartVariantImportRequest {
  destinationName: string;
  roleArn: string;
  items: VariantImportItemSource[];
  runLeftNormalization?: boolean;
  annotationFields?: { [key: string]: string | undefined };
}
export const StartVariantImportRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    destinationName: S.String,
    roleArn: S.String,
    items: VariantImportItemSources,
    runLeftNormalization: S.optional(S.Boolean),
    annotationFields: S.optional(AnnotationFieldMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/import/variant" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartVariantImportRequest",
}) as any as S.Schema<StartVariantImportRequest>;
export interface StartVariantImportResponse {
  jobId: string;
}
export const StartVariantImportResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobId: S.String }),
).annotate({
  identifier: "StartVariantImportResponse",
}) as any as S.Schema<StartVariantImportResponse>;
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
export interface UpdateAnnotationStoreRequest {
  name: string;
  description?: string;
}
export const UpdateAnnotationStoreRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    description: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/annotationStore/{name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAnnotationStoreRequest",
}) as any as S.Schema<UpdateAnnotationStoreRequest>;
export interface UpdateAnnotationStoreResponse {
  id: string;
  reference: ReferenceItem;
  status: string;
  name: string;
  description: string;
  creationTime: Date;
  updateTime: Date;
  storeOptions?: StoreOptions;
  storeFormat?: string;
}
export const UpdateAnnotationStoreResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    reference: ReferenceItem,
    status: S.String,
    name: S.String,
    description: S.String,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    storeOptions: S.optional(StoreOptions),
    storeFormat: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateAnnotationStoreResponse",
}) as any as S.Schema<UpdateAnnotationStoreResponse>;
export interface UpdateAnnotationStoreVersionRequest {
  name: string;
  versionName: string;
  description?: string;
}
export const UpdateAnnotationStoreVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    versionName: S.String.pipe(T.HttpLabel("versionName")),
    description: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/annotationStore/{name}/version/{versionName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAnnotationStoreVersionRequest",
}) as any as S.Schema<UpdateAnnotationStoreVersionRequest>;
export interface UpdateAnnotationStoreVersionResponse {
  storeId: string;
  id: string;
  status: string;
  name: string;
  versionName: string;
  description: string;
  creationTime: Date;
  updateTime: Date;
}
export const UpdateAnnotationStoreVersionResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      storeId: S.String,
      id: S.String,
      status: S.String,
      name: S.String,
      versionName: S.String,
      description: S.String,
      creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
      updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    }),
).annotate({
  identifier: "UpdateAnnotationStoreVersionResponse",
}) as any as S.Schema<UpdateAnnotationStoreVersionResponse>;
export interface UpdateRunCacheRequest {
  cacheBehavior?: string;
  description?: string;
  id: string;
  name?: string;
}
export const UpdateRunCacheRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cacheBehavior: S.optional(S.String),
    description: S.optional(S.String),
    id: S.String.pipe(T.HttpLabel("id")),
    name: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/runCache/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateRunCacheRequest",
}) as any as S.Schema<UpdateRunCacheRequest>;
export interface UpdateRunCacheResponse {}
export const UpdateRunCacheResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateRunCacheResponse",
}) as any as S.Schema<UpdateRunCacheResponse>;
export interface UpdateRunGroupRequest {
  id: string;
  name?: string;
  maxCpus?: number;
  maxRuns?: number;
  maxDuration?: number;
  maxGpus?: number;
}
export const UpdateRunGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    name: S.optional(S.String),
    maxCpus: S.optional(S.Number),
    maxRuns: S.optional(S.Number),
    maxDuration: S.optional(S.Number),
    maxGpus: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/runGroup/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateRunGroupRequest",
}) as any as S.Schema<UpdateRunGroupRequest>;
export interface UpdateRunGroupResponse {}
export const UpdateRunGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateRunGroupResponse",
}) as any as S.Schema<UpdateRunGroupResponse>;
export interface UpdateSequenceStoreRequest {
  id: string;
  name?: string;
  description?: string;
  clientToken?: string;
  fallbackLocation?: string;
  propagatedSetLevelTags?: string[];
  s3AccessConfig?: S3AccessConfig;
}
export const UpdateSequenceStoreRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    name: S.optional(S.String),
    description: S.optional(S.String),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    fallbackLocation: S.optional(S.String),
    propagatedSetLevelTags: S.optional(PropagatedSetLevelTags),
    s3AccessConfig: S.optional(S3AccessConfig),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/sequencestore/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateSequenceStoreRequest",
}) as any as S.Schema<UpdateSequenceStoreRequest>;
export interface UpdateSequenceStoreResponse {
  id: string;
  arn: string;
  name?: string;
  description?: string;
  sseConfig?: SseConfig;
  creationTime: Date;
  updateTime?: Date;
  propagatedSetLevelTags?: string[];
  status?: string;
  statusMessage?: string;
  fallbackLocation?: string;
  s3Access?: SequenceStoreS3Access;
  eTagAlgorithmFamily?: string;
}
export const UpdateSequenceStoreResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    name: S.optional(S.String),
    description: S.optional(S.String),
    sseConfig: S.optional(SseConfig),
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    propagatedSetLevelTags: S.optional(PropagatedSetLevelTags),
    status: S.optional(S.String),
    statusMessage: S.optional(S.String),
    fallbackLocation: S.optional(S.String),
    s3Access: S.optional(SequenceStoreS3Access),
    eTagAlgorithmFamily: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateSequenceStoreResponse",
}) as any as S.Schema<UpdateSequenceStoreResponse>;
export interface UpdateVariantStoreRequest {
  name: string;
  description?: string;
}
export const UpdateVariantStoreRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    description: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/variantStore/{name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateVariantStoreRequest",
}) as any as S.Schema<UpdateVariantStoreRequest>;
export interface UpdateVariantStoreResponse {
  id: string;
  reference: ReferenceItem;
  status: string;
  name: string;
  description: string;
  creationTime: Date;
  updateTime: Date;
}
export const UpdateVariantStoreResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    reference: ReferenceItem,
    status: S.String,
    name: S.String,
    description: S.String,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "UpdateVariantStoreResponse",
}) as any as S.Schema<UpdateVariantStoreResponse>;
export interface UpdateWorkflowRequest {
  id: string;
  name?: string;
  description?: string;
  storageType?: string;
  storageCapacity?: number;
  readmeMarkdown?: string;
}
export const UpdateWorkflowRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    name: S.optional(S.String),
    description: S.optional(S.String),
    storageType: S.optional(S.String),
    storageCapacity: S.optional(S.Number),
    readmeMarkdown: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/workflow/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateWorkflowRequest",
}) as any as S.Schema<UpdateWorkflowRequest>;
export interface UpdateWorkflowResponse {}
export const UpdateWorkflowResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateWorkflowResponse",
}) as any as S.Schema<UpdateWorkflowResponse>;
export interface UpdateWorkflowVersionRequest {
  workflowId: string;
  versionName: string;
  description?: string;
  storageType?: string;
  storageCapacity?: number;
  readmeMarkdown?: string;
}
export const UpdateWorkflowVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workflowId: S.String.pipe(T.HttpLabel("workflowId")),
    versionName: S.String.pipe(T.HttpLabel("versionName")),
    description: S.optional(S.String),
    storageType: S.optional(S.String),
    storageCapacity: S.optional(S.Number),
    readmeMarkdown: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/workflow/{workflowId}/version/{versionName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateWorkflowVersionRequest",
}) as any as S.Schema<UpdateWorkflowVersionRequest>;
export interface UpdateWorkflowVersionResponse {}
export const UpdateWorkflowVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateWorkflowVersionResponse",
}) as any as S.Schema<UpdateWorkflowVersionResponse>;
export interface UploadReadSetPartRequest {
  sequenceStoreId: string;
  uploadId: string;
  partSource: string;
  partNumber: number;
  payload: T.StreamingInputBody;
}
export const UploadReadSetPartRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sequenceStoreId: S.String.pipe(T.HttpLabel("sequenceStoreId")),
    uploadId: S.String.pipe(T.HttpLabel("uploadId")),
    partSource: S.String.pipe(T.HttpQuery("partSource")),
    partNumber: S.Number.pipe(T.HttpQuery("partNumber")),
    payload: T.StreamingInput.pipe(T.RequiresLength()).pipe(T.HttpPayload()),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/sequencestore/{sequenceStoreId}/upload/{uploadId}/part",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UploadReadSetPartRequest",
}) as any as S.Schema<UploadReadSetPartRequest>;
export interface UploadReadSetPartResponse {
  checksum: string;
}
export const UploadReadSetPartResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ checksum: S.String }),
).annotate({
  identifier: "UploadReadSetPartResponse",
}) as any as S.Schema<UploadReadSetPartResponse>;
export type AbortMultipartReadSetUploadError =
  | AccessDeniedException
  | InternalServerException
  | NotSupportedOperationException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops a multipart read set upload into a sequence store and returns a response with no body if the operation is successful. To confirm that a multipart read set upload has been stopped, use the `ListMultipartReadSetUploads` API operation to view all active multipart read set uploads.
 */
export const abortMultipartReadSetUpload: API.OperationMethod<
  AbortMultipartReadSetUploadRequest,
  AbortMultipartReadSetUploadResponse,
  AbortMultipartReadSetUploadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AbortMultipartReadSetUploadRequest,
  output: AbortMultipartReadSetUploadResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotSupportedOperationException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AbortMultipartReadSetUpload",
  endpointHostPrefix: "control-storage-",
}));

export type AcceptShareError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Accept a resource share request.
 */
export const acceptShare: API.OperationMethod<
  AcceptShareRequest,
  AcceptShareResponse,
  AcceptShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AcceptShareRequest,
  output: AcceptShareResponse,
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
  operationName: "AcceptShare",
  endpointHostPrefix: "analytics-",
}));

export type BatchDeleteReadSetError =
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes one or more read sets. If the operation is successful, it returns a response with no body. If there is an error with deleting one of the read sets, the operation returns an error list. If the operation successfully deletes only a subset of files, it will return an error list for the remaining files that fail to be deleted. There is a limit of 100 read sets that can be deleted in each `BatchDeleteReadSet` API call.
 */
export const batchDeleteReadSet: API.OperationMethod<
  BatchDeleteReadSetRequest,
  BatchDeleteReadSetResponse,
  BatchDeleteReadSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchDeleteReadSetRequest,
  output: BatchDeleteReadSetResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteReadSet",
  endpointHostPrefix: "control-storage-",
}));

export type CancelAnnotationImportJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Amazon Web Services HealthOmics variant stores and annotation stores are no longer open to new customers. Existing customers can continue to use the service as normal. For more information, see Amazon Web Services HealthOmics variant store and annotation store availability change.
 *
 * Cancels an annotation import job.
 */
export const cancelAnnotationImportJob: API.OperationMethod<
  CancelAnnotationImportRequest,
  CancelAnnotationImportResponse,
  CancelAnnotationImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelAnnotationImportRequest,
  output: CancelAnnotationImportResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelAnnotationImportJob",
  endpointHostPrefix: "analytics-",
}));

export type CancelRunError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels a run using its ID and returns a response with no body if the operation is successful. To confirm that the run has been cancelled, use the `ListRuns` API operation to check that it is no longer listed.
 */
export const cancelRun: API.OperationMethod<
  CancelRunRequest,
  CancelRunResponse,
  CancelRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelRunRequest,
  output: CancelRunResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelRun",
  endpointHostPrefix: "workflows-",
}));

export type CancelRunBatchError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels all runs within a specified batch. This operation prevents not-yet-submitted runs from starting and submits `CancelRun` requests for runs that have already started.
 *
 * Cancel is only allowed on batches in `PENDING`, `SUBMITTING`, or `INPROGRESS` state. Cancel operations are non-atomic and may be partially successful. Use `GetBatch` to review `successfulCancelSubmissionCount` and `failedCancelSubmissionCount` in the `submissionSummary`. Only one cancel or delete operation per batch is allowed at a time.
 */
export const cancelRunBatch: API.OperationMethod<
  CancelRunBatchRequest,
  CancelRunBatchResponse,
  CancelRunBatchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelRunBatchRequest,
  output: CancelRunBatchResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelRunBatch",
  endpointHostPrefix: "workflows-",
}));

export type CancelVariantImportJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Amazon Web Services HealthOmics variant stores and annotation stores are no longer open to new customers. Existing customers can continue to use the service as normal. For more information, see Amazon Web Services HealthOmics variant store and annotation store availability change.
 *
 * Cancels a variant import job.
 */
export const cancelVariantImportJob: API.OperationMethod<
  CancelVariantImportRequest,
  CancelVariantImportResponse,
  CancelVariantImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelVariantImportRequest,
  output: CancelVariantImportResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelVariantImportJob",
  endpointHostPrefix: "analytics-",
}));

export type CompleteMultipartReadSetUploadError =
  | AccessDeniedException
  | InternalServerException
  | NotSupportedOperationException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Completes a multipart read set upload into a sequence store after you have initiated the upload process with `CreateMultipartReadSetUpload` and uploaded all read set parts using `UploadReadSetPart`. You must specify the parts you uploaded using the parts parameter. If the operation is successful, it returns the read set ID(s) of the uploaded read set(s).
 *
 * For more information, see Direct upload to a sequence store in the *Amazon Web Services HealthOmics User Guide*.
 */
export const completeMultipartReadSetUpload: API.OperationMethod<
  CompleteMultipartReadSetUploadRequest,
  CompleteMultipartReadSetUploadResponse,
  CompleteMultipartReadSetUploadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CompleteMultipartReadSetUploadRequest,
  output: CompleteMultipartReadSetUploadResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotSupportedOperationException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CompleteMultipartReadSetUpload",
  endpointHostPrefix: "storage-",
}));

export type CreateAnnotationStoreError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Amazon Web Services HealthOmics variant stores and annotation stores are no longer open to new customers. Existing customers can continue to use the service as normal. For more information, see Amazon Web Services HealthOmics variant store and annotation store availability change.
 *
 * Creates an annotation store.
 */
export const createAnnotationStore: API.OperationMethod<
  CreateAnnotationStoreRequest,
  CreateAnnotationStoreResponse,
  CreateAnnotationStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAnnotationStoreRequest,
  output: CreateAnnotationStoreResponse,
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
  operationName: "CreateAnnotationStore",
  endpointHostPrefix: "analytics-",
}));

export type CreateAnnotationStoreVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new version of an annotation store.
 */
export const createAnnotationStoreVersion: API.OperationMethod<
  CreateAnnotationStoreVersionRequest,
  CreateAnnotationStoreVersionResponse,
  CreateAnnotationStoreVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAnnotationStoreVersionRequest,
  output: CreateAnnotationStoreVersionResponse,
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
  operationName: "CreateAnnotationStoreVersion",
  endpointHostPrefix: "analytics-",
}));

export type CreateConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a new configuration.
 */
export const createConfiguration: API.OperationMethod<
  CreateConfigurationRequest,
  CreateConfigurationResponse,
  CreateConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateConfigurationRequest,
  output: CreateConfigurationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConfiguration",
  endpointHostPrefix: "workflows-",
}));

export type CreateMultipartReadSetUploadError =
  | AccessDeniedException
  | InternalServerException
  | NotSupportedOperationException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Initiates a multipart read set upload for uploading partitioned source files into a sequence store. You can directly import source files from an EC2 instance and other local compute, or from an S3 bucket. To separate these source files into parts, use the `split` operation. Each part cannot be larger than 100 MB. If the operation is successful, it provides an `uploadId` which is required by the `UploadReadSetPart` API operation to upload parts into a sequence store.
 *
 * To continue uploading a multipart read set into your sequence store, you must use the `UploadReadSetPart` API operation to upload each part individually following the steps below:
 *
 * - Specify the `uploadId` obtained from the previous call to `CreateMultipartReadSetUpload`.
 *
 * - Upload parts for that `uploadId`.
 *
 * When you have finished uploading parts, use the `CompleteMultipartReadSetUpload` API to complete the multipart read set upload and to retrieve the final read set IDs in the response.
 *
 * To learn more about creating parts and the `split` operation, see Direct upload to a sequence store in the *Amazon Web Services HealthOmics User Guide*.
 */
export const createMultipartReadSetUpload: API.OperationMethod<
  CreateMultipartReadSetUploadRequest,
  CreateMultipartReadSetUploadResponse,
  CreateMultipartReadSetUploadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateMultipartReadSetUploadRequest,
  output: CreateMultipartReadSetUploadResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotSupportedOperationException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMultipartReadSetUpload",
  endpointHostPrefix: "control-storage-",
}));

export type CreateReferenceStoreError =
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a reference store and returns metadata in JSON format. Reference stores are used to store reference genomes in FASTA format. A reference store is created when the first reference genome is imported. To import additional reference genomes from an Amazon S3 bucket, use the `StartReferenceImportJob` API operation.
 *
 * For more information, see Creating a HealthOmics reference store in the *Amazon Web Services HealthOmics User Guide*.
 */
export const createReferenceStore: API.OperationMethod<
  CreateReferenceStoreRequest,
  CreateReferenceStoreResponse,
  CreateReferenceStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateReferenceStoreRequest,
  output: CreateReferenceStoreResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateReferenceStore",
  endpointHostPrefix: "control-storage-",
}));

export type CreateRunCacheError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a run cache to store and reference task outputs from completed private runs. Specify an Amazon S3 location where Amazon Web Services HealthOmics saves the cached data. This data must be immediately accessible and not in an archived state. You can save intermediate task files to a run cache if they are declared as task outputs in the workflow definition file.
 *
 * For more information, see Call caching and Creating a run cache in the *Amazon Web Services HealthOmics User Guide*.
 */
export const createRunCache: API.OperationMethod<
  CreateRunCacheRequest,
  CreateRunCacheResponse,
  CreateRunCacheError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRunCacheRequest,
  output: CreateRunCacheResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRunCache",
  endpointHostPrefix: "workflows-",
}));

export type CreateRunGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a run group to limit the compute resources for the runs that are added to the group. Returns an ARN, ID, and tags for the run group.
 */
export const createRunGroup: API.OperationMethod<
  CreateRunGroupRequest,
  CreateRunGroupResponse,
  CreateRunGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRunGroupRequest,
  output: CreateRunGroupResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRunGroup",
  endpointHostPrefix: "workflows-",
}));

export type CreateSequenceStoreError =
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a sequence store and returns its metadata. Sequence stores are used to store sequence data files called read sets that are saved in FASTQ, BAM, uBAM, or CRAM formats. For aligned formats (BAM and CRAM), a sequence store can only use one reference genome. For unaligned formats (FASTQ and uBAM), a reference genome is not required. You can create multiple sequence stores per region per account.
 *
 * The following are optional parameters you can specify for your sequence store:
 *
 * - Use `s3AccessConfig` to configure your sequence store with S3 access logs (recommended).
 *
 * - Use `sseConfig` to define your own KMS key for encryption.
 *
 * - Use `eTagAlgorithmFamily` to define which algorithm to use for the HealthOmics eTag on objects.
 *
 * - Use `fallbackLocation` to define a backup location for storing files that have failed a direct upload.
 *
 * - Use `propagatedSetLevelTags` to configure tags that propagate to all objects in your store.
 *
 * For more information, see Creating a HealthOmics sequence store in the *Amazon Web Services HealthOmics User Guide*.
 */
export const createSequenceStore: API.OperationMethod<
  CreateSequenceStoreRequest,
  CreateSequenceStoreResponse,
  CreateSequenceStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSequenceStoreRequest,
  output: CreateSequenceStoreResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSequenceStore",
  endpointHostPrefix: "control-storage-",
}));

export type CreateShareError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a cross-account shared resource. The resource owner makes an offer to share the resource with the principal subscriber (an AWS user with a different account than the resource owner).
 *
 * The following resources support cross-account sharing:
 *
 * - HealthOmics variant stores
 *
 * - HealthOmics annotation stores
 *
 * - Private workflows
 */
export const createShare: API.OperationMethod<
  CreateShareRequest,
  CreateShareResponse,
  CreateShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateShareRequest,
  output: CreateShareResponse,
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
  operationName: "CreateShare",
  endpointHostPrefix: "analytics-",
}));

export type CreateVariantStoreError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Amazon Web Services HealthOmics variant stores and annotation stores are no longer open to new customers. Existing customers can continue to use the service as normal. For more information, see Amazon Web Services HealthOmics variant store and annotation store availability change.
 *
 * Creates a variant store.
 */
export const createVariantStore: API.OperationMethod<
  CreateVariantStoreRequest,
  CreateVariantStoreResponse,
  CreateVariantStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateVariantStoreRequest,
  output: CreateVariantStoreResponse,
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
  operationName: "CreateVariantStore",
  endpointHostPrefix: "analytics-",
}));

export type CreateWorkflowError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a private workflow. Before you create a private workflow, you must create and configure these required resources:
 *
 * - *Workflow definition file:* A workflow definition file written in WDL, Nextflow, or CWL. The workflow definition specifies the inputs and outputs for runs that use the workflow. It also includes specifications for the runs and run tasks for your workflow, including compute and memory requirements. The workflow definition file must be in `.zip` format. For more information, see Workflow definition files in Amazon Web Services HealthOmics.
 *
 * - You can use Amazon Q CLI to build and validate your workflow definition files in WDL, Nextflow, and CWL. For more information, see Example prompts for Amazon Q CLI and the Amazon Web Services HealthOmics Agentic generative AI tutorial on GitHub.
 *
 * - *(Optional) Parameter template file:* A parameter template file written in JSON. Create the file to define the run parameters, or Amazon Web Services HealthOmics generates the parameter template for you. For more information, see Parameter template files for HealthOmics workflows.
 *
 * - *ECR container images:* Create container images for the workflow in a private ECR repository, or synchronize images from a supported upstream registry with your Amazon ECR private repository.
 *
 * - *(Optional) Sentieon licenses:* Request a Sentieon license to use the Sentieon software in private workflows.
 *
 * For more information, see Creating or updating a private workflow in Amazon Web Services HealthOmics in the *Amazon Web Services HealthOmics User Guide*.
 */
export const createWorkflow: API.OperationMethod<
  CreateWorkflowRequest,
  CreateWorkflowResponse,
  CreateWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateWorkflowRequest,
  output: CreateWorkflowResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWorkflow",
  endpointHostPrefix: "workflows-",
}));

export type CreateWorkflowVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new workflow version for the workflow that you specify with the `workflowId` parameter.
 *
 * When you create a new version of a workflow, you need to specify the configuration for the new version. It doesn't inherit any configuration values from the workflow.
 *
 * Provide a version name that is unique for this workflow. You cannot change the name after HealthOmics creates the version.
 *
 * Don't include any personally identifiable information (PII) in the version name. Version names appear in the workflow version ARN.
 *
 * For more information, see Workflow versioning in Amazon Web Services HealthOmics in the *Amazon Web Services HealthOmics User Guide*.
 */
export const createWorkflowVersion: API.OperationMethod<
  CreateWorkflowVersionRequest,
  CreateWorkflowVersionResponse,
  CreateWorkflowVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateWorkflowVersionRequest,
  output: CreateWorkflowVersionResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWorkflowVersion",
  endpointHostPrefix: "workflows-",
}));

export type DeleteAnnotationStoreError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Amazon Web Services HealthOmics variant stores and annotation stores are no longer open to new customers. Existing customers can continue to use the service as normal. For more information, see Amazon Web Services HealthOmics variant store and annotation store availability change.
 *
 * Deletes an annotation store.
 */
export const deleteAnnotationStore: API.OperationMethod<
  DeleteAnnotationStoreRequest,
  DeleteAnnotationStoreResponse,
  DeleteAnnotationStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAnnotationStoreRequest,
  output: DeleteAnnotationStoreResponse,
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
  operationName: "DeleteAnnotationStore",
  endpointHostPrefix: "analytics-",
}));

export type DeleteAnnotationStoreVersionsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes one or multiple versions of an annotation store.
 */
export const deleteAnnotationStoreVersions: API.OperationMethod<
  DeleteAnnotationStoreVersionsRequest,
  DeleteAnnotationStoreVersionsResponse,
  DeleteAnnotationStoreVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAnnotationStoreVersionsRequest,
  output: DeleteAnnotationStoreVersionsResponse,
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
  operationName: "DeleteAnnotationStoreVersions",
  endpointHostPrefix: "analytics-",
}));

export type DeleteBatchError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a run batch resource and its associated metadata. This operation does not delete the individual workflow runs. To delete the runs, call `DeleteRunBatch` before calling `DeleteBatch`.
 *
 * `DeleteBatch` requires the batch to be in a terminal state: `PROCESSED`, `FAILED`, `CANCELLED`, or `RUNS_DELETED`. After `DeleteBatch` completes, the batch metadata is no longer accessible. You cannot call `GetBatch`, `ListRunsInBatch`, `DeleteRunBatch`, or `CancelRunBatch` on a deleted batch.
 */
export const deleteBatch: API.OperationMethod<
  DeleteBatchRequest,
  DeleteBatchResponse,
  DeleteBatchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteBatchRequest,
  output: DeleteBatchResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBatch",
  endpointHostPrefix: "workflows-",
}));

export type DeleteConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete an existing configuration.
 */
export const deleteConfiguration: API.OperationMethod<
  DeleteConfigurationRequest,
  DeleteConfigurationResponse,
  DeleteConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteConfigurationRequest,
  output: DeleteConfigurationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfiguration",
  endpointHostPrefix: "workflows-",
}));

export type DeleteReferenceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a reference genome and returns a response with no body if the operation is successful. The read set associated with the reference genome must first be deleted before deleting the reference genome. After the reference genome is deleted, you can delete the reference store using the `DeleteReferenceStore` API operation.
 *
 * For more information, see Deleting HealthOmics reference and sequence stores in the *Amazon Web Services HealthOmics User Guide*.
 */
export const deleteReference: API.OperationMethod<
  DeleteReferenceRequest,
  DeleteReferenceResponse,
  DeleteReferenceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteReferenceRequest,
  output: DeleteReferenceResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteReference",
  endpointHostPrefix: "control-storage-",
}));

export type DeleteReferenceStoreError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a reference store and returns a response with no body if the operation is successful. You can only delete a reference store when it does not contain any reference genomes. To empty a reference store, use `DeleteReference`.
 *
 * For more information about your workflow status, see Deleting HealthOmics reference and sequence stores in the *Amazon Web Services HealthOmics User Guide*.
 */
export const deleteReferenceStore: API.OperationMethod<
  DeleteReferenceStoreRequest,
  DeleteReferenceStoreResponse,
  DeleteReferenceStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteReferenceStoreRequest,
  output: DeleteReferenceStoreResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteReferenceStore",
  endpointHostPrefix: "control-storage-",
}));

export type DeleteRunError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a run and returns a response with no body if the operation is successful. You can only delete a run that has reached a `COMPLETED`, `FAILED`, or `CANCELLED` stage. A completed run has delivered an output, or was cancelled and resulted in no output. When you delete a run, only the metadata associated with the run is deleted. The run outputs remain in Amazon S3 and logs remain in CloudWatch.
 *
 * To verify that the workflow is deleted:
 *
 * - Use `ListRuns` to confirm the workflow no longer appears in the list.
 *
 * - Use `GetRun` to verify the workflow cannot be found.
 */
export const deleteRun: API.OperationMethod<
  DeleteRunRequest,
  DeleteRunResponse,
  DeleteRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRunRequest,
  output: DeleteRunResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRun",
  endpointHostPrefix: "workflows-",
}));

export type DeleteRunBatchError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the individual workflow runs within a batch. This operation is separate from `DeleteBatch`, which removes the batch metadata.
 *
 * Delete is only allowed on batches in `PROCESSED` or `CANCELLED` state. Delete operations are non-atomic and may be partially successful. Use `GetBatch` to review `successfulDeleteSubmissionCount` and `failedDeleteSubmissionCount` in the `submissionSummary`. Only one cancel or delete operation per batch is allowed at a time.
 */
export const deleteRunBatch: API.OperationMethod<
  DeleteRunBatchRequest,
  DeleteRunBatchResponse,
  DeleteRunBatchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRunBatchRequest,
  output: DeleteRunBatchResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRunBatch",
  endpointHostPrefix: "workflows-",
}));

export type DeleteRunCacheError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a run cache and returns a response with no body if the operation is successful. This action removes the cache metadata stored in the service account, but does not delete the data in Amazon S3. You can access the cache data in Amazon S3, for inspection or to troubleshoot issues. You can remove old cache data using standard S3 `Delete` operations.
 *
 * For more information, see Deleting a run cache in the *Amazon Web Services HealthOmics User Guide*.
 */
export const deleteRunCache: API.OperationMethod<
  DeleteRunCacheRequest,
  DeleteRunCacheResponse,
  DeleteRunCacheError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRunCacheRequest,
  output: DeleteRunCacheResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRunCache",
  endpointHostPrefix: "workflows-",
}));

export type DeleteRunGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a run group and returns a response with no body if the operation is successful.
 *
 * To verify that the run group is deleted:
 *
 * - Use `ListRunGroups` to confirm the workflow no longer appears in the list.
 *
 * - Use `GetRunGroup` to verify the workflow cannot be found.
 */
export const deleteRunGroup: API.OperationMethod<
  DeleteRunGroupRequest,
  DeleteRunGroupResponse,
  DeleteRunGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRunGroupRequest,
  output: DeleteRunGroupResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRunGroup",
  endpointHostPrefix: "workflows-",
}));

export type DeleteS3AccessPolicyError =
  | AccessDeniedException
  | InternalServerException
  | NotSupportedOperationException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an access policy for the specified store.
 */
export const deleteS3AccessPolicy: API.OperationMethod<
  DeleteS3AccessPolicyRequest,
  DeleteS3AccessPolicyResponse,
  DeleteS3AccessPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteS3AccessPolicyRequest,
  output: DeleteS3AccessPolicyResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotSupportedOperationException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteS3AccessPolicy",
  endpointHostPrefix: "control-storage-",
}));

export type DeleteSequenceStoreError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a sequence store and returns a response with no body if the operation is successful. You can only delete a sequence store when it does not contain any read sets.
 *
 * Use the `BatchDeleteReadSet` API operation to ensure that all read sets in the sequence store are deleted. When a sequence store is deleted, all tags associated with the store are also deleted.
 *
 * For more information, see Deleting HealthOmics reference and sequence stores in the *Amazon Web Services HealthOmics User Guide*.
 */
export const deleteSequenceStore: API.OperationMethod<
  DeleteSequenceStoreRequest,
  DeleteSequenceStoreResponse,
  DeleteSequenceStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSequenceStoreRequest,
  output: DeleteSequenceStoreResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSequenceStore",
  endpointHostPrefix: "control-storage-",
}));

export type DeleteShareError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a resource share. If you are the resource owner, the subscriber will no longer have access to the shared resource. If you are the subscriber, this operation deletes your access to the share.
 */
export const deleteShare: API.OperationMethod<
  DeleteShareRequest,
  DeleteShareResponse,
  DeleteShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteShareRequest,
  output: DeleteShareResponse,
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
  operationName: "DeleteShare",
  endpointHostPrefix: "analytics-",
}));

export type DeleteVariantStoreError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Amazon Web Services HealthOmics variant stores and annotation stores are no longer open to new customers. Existing customers can continue to use the service as normal. For more information, see Amazon Web Services HealthOmics variant store and annotation store availability change.
 *
 * Deletes a variant store.
 */
export const deleteVariantStore: API.OperationMethod<
  DeleteVariantStoreRequest,
  DeleteVariantStoreResponse,
  DeleteVariantStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteVariantStoreRequest,
  output: DeleteVariantStoreResponse,
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
  operationName: "DeleteVariantStore",
  endpointHostPrefix: "analytics-",
}));

export type DeleteWorkflowError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a workflow by specifying its ID. This operation returns a response with no body if the deletion is successful.
 *
 * To verify that the workflow is deleted:
 *
 * - Use `ListWorkflows` to confirm the workflow no longer appears in the list.
 *
 * - Use `GetWorkflow` to verify the workflow cannot be found.
 */
export const deleteWorkflow: API.OperationMethod<
  DeleteWorkflowRequest,
  DeleteWorkflowResponse,
  DeleteWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteWorkflowRequest,
  output: DeleteWorkflowResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWorkflow",
  endpointHostPrefix: "workflows-",
}));

export type DeleteWorkflowVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a workflow version. Deleting a workflow version doesn't affect any ongoing runs that are using the workflow version.
 *
 * For more information, see Workflow versioning in Amazon Web Services HealthOmics in the *Amazon Web Services HealthOmics User Guide*.
 */
export const deleteWorkflowVersion: API.OperationMethod<
  DeleteWorkflowVersionRequest,
  DeleteWorkflowVersionResponse,
  DeleteWorkflowVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteWorkflowVersionRequest,
  output: DeleteWorkflowVersionResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWorkflowVersion",
  endpointHostPrefix: "workflows-",
}));

export type GetAnnotationImportJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Amazon Web Services HealthOmics variant stores and annotation stores are no longer open to new customers. Existing customers can continue to use the service as normal. For more information, see Amazon Web Services HealthOmics variant store and annotation store availability change.
 *
 * Gets information about an annotation import job.
 */
export const getAnnotationImportJob: API.OperationMethod<
  GetAnnotationImportRequest,
  GetAnnotationImportResponse,
  GetAnnotationImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAnnotationImportRequest,
  output: GetAnnotationImportResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAnnotationImportJob",
  endpointHostPrefix: "analytics-",
}));

export type GetAnnotationStoreError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Amazon Web Services HealthOmics variant stores and annotation stores are no longer open to new customers. Existing customers can continue to use the service as normal. For more information, see Amazon Web Services HealthOmics variant store and annotation store availability change.
 *
 * Gets information about an annotation store.
 */
export const getAnnotationStore: API.OperationMethod<
  GetAnnotationStoreRequest,
  GetAnnotationStoreResponse,
  GetAnnotationStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAnnotationStoreRequest,
  output: GetAnnotationStoreResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAnnotationStore",
  endpointHostPrefix: "analytics-",
}));

export type GetAnnotationStoreVersionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the metadata for an annotation store version.
 */
export const getAnnotationStoreVersion: API.OperationMethod<
  GetAnnotationStoreVersionRequest,
  GetAnnotationStoreVersionResponse,
  GetAnnotationStoreVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAnnotationStoreVersionRequest,
  output: GetAnnotationStoreVersionResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAnnotationStoreVersion",
  endpointHostPrefix: "analytics-",
}));

export type GetBatchError =
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details and current status for a specific run batch, including submission progress and run execution counts.
 */
export const getBatch: API.OperationMethod<
  GetBatchRequest,
  GetBatchResponse,
  GetBatchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetBatchRequest,
  output: GetBatchResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBatch",
  endpointHostPrefix: "workflows-",
}));

export type GetConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieve configuration details for specified name.
 */
export const getConfiguration: API.OperationMethod<
  GetConfigurationRequest,
  GetConfigurationResponse,
  GetConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetConfigurationRequest,
  output: GetConfigurationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfiguration",
  endpointHostPrefix: "workflows-",
}));

export type GetReadSetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RangeNotSatisfiableException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information from parts of a read set and returns the read set in the same format that it was uploaded. You must have read sets uploaded to your sequence store in order to run this operation.
 */
export const getReadSet: API.OperationMethod<
  GetReadSetRequest,
  GetReadSetResponse,
  GetReadSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetReadSetRequest,
  output: GetReadSetResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RangeNotSatisfiableException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReadSet",
  endpointHostPrefix: "storage-",
}));

export type GetReadSetActivationJobError =
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns detailed information about the status of a read set activation job in JSON format.
 */
export const getReadSetActivationJob: API.OperationMethod<
  GetReadSetActivationJobRequest,
  GetReadSetActivationJobResponse,
  GetReadSetActivationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetReadSetActivationJobRequest,
  output: GetReadSetActivationJobResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReadSetActivationJob",
  endpointHostPrefix: "control-storage-",
}));

export type GetReadSetExportJobError =
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves status information about a read set export job and returns the data in JSON format. Use this operation to actively monitor the progress of an export job.
 */
export const getReadSetExportJob: API.OperationMethod<
  GetReadSetExportJobRequest,
  GetReadSetExportJobResponse,
  GetReadSetExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetReadSetExportJobRequest,
  output: GetReadSetExportJobResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReadSetExportJob",
  endpointHostPrefix: "control-storage-",
}));

export type GetReadSetImportJobError =
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets detailed and status information about a read set import job and returns the data in JSON format.
 */
export const getReadSetImportJob: API.OperationMethod<
  GetReadSetImportJobRequest,
  GetReadSetImportJobResponse,
  GetReadSetImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetReadSetImportJobRequest,
  output: GetReadSetImportJobResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReadSetImportJob",
  endpointHostPrefix: "control-storage-",
}));

export type GetReadSetMetadataError =
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the metadata for a read set from a sequence store in JSON format. This operation does not return tags. To retrieve the list of tags for a read set, use the `ListTagsForResource` API operation.
 */
export const getReadSetMetadata: API.OperationMethod<
  GetReadSetMetadataRequest,
  GetReadSetMetadataResponse,
  GetReadSetMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetReadSetMetadataRequest,
  output: GetReadSetMetadataResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReadSetMetadata",
  endpointHostPrefix: "control-storage-",
}));

export type GetReferenceError =
  | AccessDeniedException
  | InternalServerException
  | RangeNotSatisfiableException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Downloads parts of data from a reference genome and returns the reference file in the same format that it was uploaded.
 *
 * For more information, see Creating a HealthOmics reference store in the *Amazon Web Services HealthOmics User Guide*.
 */
export const getReference: API.OperationMethod<
  GetReferenceRequest,
  GetReferenceResponse,
  GetReferenceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetReferenceRequest,
  output: GetReferenceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RangeNotSatisfiableException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReference",
  endpointHostPrefix: "storage-",
}));

export type GetReferenceImportJobError =
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Monitors the status of a reference import job. This operation can be called after calling the `StartReferenceImportJob` operation.
 */
export const getReferenceImportJob: API.OperationMethod<
  GetReferenceImportJobRequest,
  GetReferenceImportJobResponse,
  GetReferenceImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetReferenceImportJobRequest,
  output: GetReferenceImportJobResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReferenceImportJob",
  endpointHostPrefix: "control-storage-",
}));

export type GetReferenceMetadataError =
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves metadata for a reference genome. This operation returns the number of parts, part size, and MD5 of an entire file. This operation does not return tags. To retrieve the list of tags for a read set, use the `ListTagsForResource` API operation.
 */
export const getReferenceMetadata: API.OperationMethod<
  GetReferenceMetadataRequest,
  GetReferenceMetadataResponse,
  GetReferenceMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetReferenceMetadataRequest,
  output: GetReferenceMetadataResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReferenceMetadata",
  endpointHostPrefix: "control-storage-",
}));

export type GetReferenceStoreError =
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a reference store.
 */
export const getReferenceStore: API.OperationMethod<
  GetReferenceStoreRequest,
  GetReferenceStoreResponse,
  GetReferenceStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetReferenceStoreRequest,
  output: GetReferenceStoreResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReferenceStore",
  endpointHostPrefix: "control-storage-",
}));

export type GetRunError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets detailed information about a specific run using its ID.
 *
 * Amazon Web Services HealthOmics stores a configurable number of runs, as determined by service limits, that are available to the console and API. If `GetRun` does not return the requested run, you can find all run logs in the CloudWatch logs. For more information about viewing the run logs, see CloudWatch logs in the *Amazon Web Services HealthOmics User Guide*.
 */
export const getRun: API.OperationMethod<
  GetRunRequest,
  GetRunResponse,
  GetRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRunRequest,
  output: GetRunResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRun",
  endpointHostPrefix: "workflows-",
}));

export type GetRunCacheError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about the specified run cache using its ID.
 *
 * For more information, see Call caching for Amazon Web Services HealthOmics runs in the *Amazon Web Services HealthOmics User Guide*.
 */
export const getRunCache: API.OperationMethod<
  GetRunCacheRequest,
  GetRunCacheResponse,
  GetRunCacheError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRunCacheRequest,
  output: GetRunCacheResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRunCache",
  endpointHostPrefix: "workflows-",
}));

export type GetRunGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a run group and returns its metadata.
 */
export const getRunGroup: API.OperationMethod<
  GetRunGroupRequest,
  GetRunGroupResponse,
  GetRunGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRunGroupRequest,
  output: GetRunGroupResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRunGroup",
  endpointHostPrefix: "workflows-",
}));

export type GetRunTaskError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets detailed information about a run task using its ID.
 */
export const getRunTask: API.OperationMethod<
  GetRunTaskRequest,
  GetRunTaskResponse,
  GetRunTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRunTaskRequest,
  output: GetRunTaskResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRunTask",
  endpointHostPrefix: "workflows-",
}));

export type GetS3AccessPolicyError =
  | AccessDeniedException
  | InternalServerException
  | NotSupportedOperationException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details about an access policy on a given store.
 */
export const getS3AccessPolicy: API.OperationMethod<
  GetS3AccessPolicyRequest,
  GetS3AccessPolicyResponse,
  GetS3AccessPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetS3AccessPolicyRequest,
  output: GetS3AccessPolicyResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotSupportedOperationException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetS3AccessPolicy",
  endpointHostPrefix: "control-storage-",
}));

export type GetSequenceStoreError =
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves metadata for a sequence store using its ID and returns it in JSON format.
 */
export const getSequenceStore: API.OperationMethod<
  GetSequenceStoreRequest,
  GetSequenceStoreResponse,
  GetSequenceStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSequenceStoreRequest,
  output: GetSequenceStoreResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSequenceStore",
  endpointHostPrefix: "control-storage-",
}));

export type GetShareError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the metadata for the specified resource share.
 */
export const getShare: API.OperationMethod<
  GetShareRequest,
  GetShareResponse,
  GetShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetShareRequest,
  output: GetShareResponse,
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
  operationName: "GetShare",
  endpointHostPrefix: "analytics-",
}));

export type GetVariantImportJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Amazon Web Services HealthOmics variant stores and annotation stores are no longer open to new customers. Existing customers can continue to use the service as normal. For more information, see Amazon Web Services HealthOmics variant store and annotation store availability change.
 *
 * Gets information about a variant import job.
 */
export const getVariantImportJob: API.OperationMethod<
  GetVariantImportRequest,
  GetVariantImportResponse,
  GetVariantImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetVariantImportRequest,
  output: GetVariantImportResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVariantImportJob",
  endpointHostPrefix: "analytics-",
}));

export type GetVariantStoreError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Amazon Web Services HealthOmics variant stores and annotation stores are no longer open to new customers. Existing customers can continue to use the service as normal. For more information, see Amazon Web Services HealthOmics variant store and annotation store availability change.
 *
 * Gets information about a variant store.
 */
export const getVariantStore: API.OperationMethod<
  GetVariantStoreRequest,
  GetVariantStoreResponse,
  GetVariantStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetVariantStoreRequest,
  output: GetVariantStoreResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVariantStore",
  endpointHostPrefix: "analytics-",
}));

export type GetWorkflowError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets all information about a workflow using its ID.
 *
 * If a workflow is shared with you, you cannot export the workflow.
 *
 * For more information about your workflow status, see Verify the workflow status in the *Amazon Web Services HealthOmics User Guide*.
 */
export const getWorkflow: API.OperationMethod<
  GetWorkflowRequest,
  GetWorkflowResponse,
  GetWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetWorkflowRequest,
  output: GetWorkflowResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkflow",
  endpointHostPrefix: "workflows-",
}));

export type GetWorkflowVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a workflow version. For more information, see Workflow versioning in Amazon Web Services HealthOmics in the *Amazon Web Services HealthOmics User Guide*.
 */
export const getWorkflowVersion: API.OperationMethod<
  GetWorkflowVersionRequest,
  GetWorkflowVersionResponse,
  GetWorkflowVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetWorkflowVersionRequest,
  output: GetWorkflowVersionResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkflowVersion",
  endpointHostPrefix: "workflows-",
}));

export type ListAnnotationImportJobsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Amazon Web Services HealthOmics variant stores and annotation stores are no longer open to new customers. Existing customers can continue to use the service as normal. For more information, see Amazon Web Services HealthOmics variant store and annotation store availability change.
 *
 * Retrieves a list of annotation import jobs.
 */
export const listAnnotationImportJobs: API.PaginatedOperationMethod<
  ListAnnotationImportJobsRequest,
  ListAnnotationImportJobsResponse,
  ListAnnotationImportJobsError,
  Credentials | HttpClient.HttpClient,
  AnnotationImportJobItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAnnotationImportJobsRequest,
  output: ListAnnotationImportJobsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAnnotationImportJobs",
  endpointHostPrefix: "analytics-",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "annotationImportJobs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAnnotationStoresError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Amazon Web Services HealthOmics variant stores and annotation stores are no longer open to new customers. Existing customers can continue to use the service as normal. For more information, see Amazon Web Services HealthOmics variant store and annotation store availability change.
 *
 * Retrieves a list of annotation stores.
 */
export const listAnnotationStores: API.PaginatedOperationMethod<
  ListAnnotationStoresRequest,
  ListAnnotationStoresResponse,
  ListAnnotationStoresError,
  Credentials | HttpClient.HttpClient,
  AnnotationStoreItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAnnotationStoresRequest,
  output: ListAnnotationStoresResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAnnotationStores",
  endpointHostPrefix: "analytics-",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "annotationStores",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAnnotationStoreVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the versions of an annotation store.
 */
export const listAnnotationStoreVersions: API.PaginatedOperationMethod<
  ListAnnotationStoreVersionsRequest,
  ListAnnotationStoreVersionsResponse,
  ListAnnotationStoreVersionsError,
  Credentials | HttpClient.HttpClient,
  AnnotationStoreVersionItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAnnotationStoreVersionsRequest,
  output: ListAnnotationStoreVersionsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAnnotationStoreVersions",
  endpointHostPrefix: "analytics-",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "annotationStoreVersions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBatchError =
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of run batches in your account, with optional filtering by status, name, or run group. Results are paginated. Only one filter per call is supported.
 */
export const listBatch: API.PaginatedOperationMethod<
  ListBatchRequest,
  ListBatchResponse,
  ListBatchError,
  Credentials | HttpClient.HttpClient,
  BatchListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListBatchRequest,
  output: ListBatchResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBatch",
  endpointHostPrefix: "workflows-",
  pagination: {
    inputToken: "startingToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxItems",
  } as const,
})) as any;

export type ListConfigurationsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List all configurations for the account.
 */
export const listConfigurations: API.PaginatedOperationMethod<
  ListConfigurationsRequest,
  ListConfigurationsResponse,
  ListConfigurationsError,
  Credentials | HttpClient.HttpClient,
  ConfigurationListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListConfigurationsRequest,
  output: ListConfigurationsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConfigurations",
  endpointHostPrefix: "workflows-",
  pagination: {
    inputToken: "startingToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMultipartReadSetUploadsError =
  | AccessDeniedException
  | InternalServerException
  | NotSupportedOperationException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists in-progress multipart read set uploads for a sequence store and returns it in a JSON formatted output. Multipart read set uploads are initiated by the `CreateMultipartReadSetUploads` API operation. This operation returns a response with no body when the upload is complete.
 */
export const listMultipartReadSetUploads: API.PaginatedOperationMethod<
  ListMultipartReadSetUploadsRequest,
  ListMultipartReadSetUploadsResponse,
  ListMultipartReadSetUploadsError,
  Credentials | HttpClient.HttpClient,
  MultipartReadSetUploadListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMultipartReadSetUploadsRequest,
  output: ListMultipartReadSetUploadsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotSupportedOperationException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMultipartReadSetUploads",
  endpointHostPrefix: "control-storage-",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "uploads",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListReadSetActivationJobsError =
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of read set activation jobs and returns the metadata in a JSON formatted output. To extract metadata from a read set activation job, use the `GetReadSetActivationJob` API operation.
 */
export const listReadSetActivationJobs: API.PaginatedOperationMethod<
  ListReadSetActivationJobsRequest,
  ListReadSetActivationJobsResponse,
  ListReadSetActivationJobsError,
  Credentials | HttpClient.HttpClient,
  ActivateReadSetJobItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListReadSetActivationJobsRequest,
  output: ListReadSetActivationJobsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReadSetActivationJobs",
  endpointHostPrefix: "control-storage-",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "activationJobs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListReadSetExportJobsError =
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of read set export jobs in a JSON formatted response. This API operation is used to check the status of a read set export job initiated by the `StartReadSetExportJob` API operation.
 */
export const listReadSetExportJobs: API.PaginatedOperationMethod<
  ListReadSetExportJobsRequest,
  ListReadSetExportJobsResponse,
  ListReadSetExportJobsError,
  Credentials | HttpClient.HttpClient,
  ExportReadSetJobDetail
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListReadSetExportJobsRequest,
  output: ListReadSetExportJobsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReadSetExportJobs",
  endpointHostPrefix: "control-storage-",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "exportJobs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListReadSetImportJobsError =
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of read set import jobs and returns the data in JSON format.
 */
export const listReadSetImportJobs: API.PaginatedOperationMethod<
  ListReadSetImportJobsRequest,
  ListReadSetImportJobsResponse,
  ListReadSetImportJobsError,
  Credentials | HttpClient.HttpClient,
  ImportReadSetJobItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListReadSetImportJobsRequest,
  output: ListReadSetImportJobsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReadSetImportJobs",
  endpointHostPrefix: "control-storage-",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "importJobs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListReadSetsError =
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of read sets from a sequence store ID and returns the metadata in JSON format.
 */
export const listReadSets: API.PaginatedOperationMethod<
  ListReadSetsRequest,
  ListReadSetsResponse,
  ListReadSetsError,
  Credentials | HttpClient.HttpClient,
  ReadSetListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListReadSetsRequest,
  output: ListReadSetsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReadSets",
  endpointHostPrefix: "control-storage-",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "readSets",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListReadSetUploadPartsError =
  | AccessDeniedException
  | InternalServerException
  | NotSupportedOperationException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all parts in a multipart read set upload for a sequence store and returns the metadata in a JSON formatted output.
 */
export const listReadSetUploadParts: API.PaginatedOperationMethod<
  ListReadSetUploadPartsRequest,
  ListReadSetUploadPartsResponse,
  ListReadSetUploadPartsError,
  Credentials | HttpClient.HttpClient,
  ReadSetUploadPartListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListReadSetUploadPartsRequest,
  output: ListReadSetUploadPartsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotSupportedOperationException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReadSetUploadParts",
  endpointHostPrefix: "control-storage-",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "parts",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListReferenceImportJobsError =
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the metadata of one or more reference import jobs for a reference store.
 */
export const listReferenceImportJobs: API.PaginatedOperationMethod<
  ListReferenceImportJobsRequest,
  ListReferenceImportJobsResponse,
  ListReferenceImportJobsError,
  Credentials | HttpClient.HttpClient,
  ImportReferenceJobItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListReferenceImportJobsRequest,
  output: ListReferenceImportJobsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReferenceImportJobs",
  endpointHostPrefix: "control-storage-",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "importJobs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListReferencesError =
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the metadata of one or more reference genomes in a reference store.
 *
 * For more information, see Creating a reference store in the *Amazon Web Services HealthOmics User Guide*.
 */
export const listReferences: API.PaginatedOperationMethod<
  ListReferencesRequest,
  ListReferencesResponse,
  ListReferencesError,
  Credentials | HttpClient.HttpClient,
  ReferenceListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListReferencesRequest,
  output: ListReferencesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReferences",
  endpointHostPrefix: "control-storage-",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "references",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListReferenceStoresError =
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of reference stores linked to your account and returns their metadata in JSON format.
 *
 * For more information, see Creating a reference store in the *Amazon Web Services HealthOmics User Guide*.
 */
export const listReferenceStores: API.PaginatedOperationMethod<
  ListReferenceStoresRequest,
  ListReferenceStoresResponse,
  ListReferenceStoresError,
  Credentials | HttpClient.HttpClient,
  ReferenceStoreDetail
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListReferenceStoresRequest,
  output: ListReferenceStoresResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReferenceStores",
  endpointHostPrefix: "control-storage-",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "referenceStores",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRunCachesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of your run caches and the metadata for each cache.
 */
export const listRunCaches: API.PaginatedOperationMethod<
  ListRunCachesRequest,
  ListRunCachesResponse,
  ListRunCachesError,
  Credentials | HttpClient.HttpClient,
  RunCacheListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRunCachesRequest,
  output: ListRunCachesResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRunCaches",
  endpointHostPrefix: "workflows-",
  pagination: {
    inputToken: "startingToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRunGroupsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of all run groups and returns the metadata for each run group.
 */
export const listRunGroups: API.PaginatedOperationMethod<
  ListRunGroupsRequest,
  ListRunGroupsResponse,
  ListRunGroupsError,
  Credentials | HttpClient.HttpClient,
  RunGroupListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRunGroupsRequest,
  output: ListRunGroupsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRunGroups",
  endpointHostPrefix: "workflows-",
  pagination: {
    inputToken: "startingToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRunsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of runs and returns each run's metadata and status.
 *
 * Amazon Web Services HealthOmics stores a configurable number of runs, as determined by service limits, that are available to the console and API. If the `ListRuns` response doesn't include specific runs that you expected, you can find all run logs in the CloudWatch logs. For more information about viewing the run logs, see CloudWatch logs in the *Amazon Web Services HealthOmics User Guide*.
 */
export const listRuns: API.PaginatedOperationMethod<
  ListRunsRequest,
  ListRunsResponse,
  ListRunsError,
  Credentials | HttpClient.HttpClient,
  RunListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRunsRequest,
  output: ListRunsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRuns",
  endpointHostPrefix: "workflows-",
  pagination: {
    inputToken: "startingToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRunsInBatchError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a paginated list of individual workflow runs within a specific batch. Use this operation to map each `runSettingId` to its HealthOmics-generated `runId`, and to check the submission status of each run. Only one filter per call is supported.
 */
export const listRunsInBatch: API.PaginatedOperationMethod<
  ListRunsInBatchRequest,
  ListRunsInBatchResponse,
  ListRunsInBatchError,
  Credentials | HttpClient.HttpClient,
  RunBatchListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRunsInBatchRequest,
  output: ListRunsInBatchResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRunsInBatch",
  endpointHostPrefix: "workflows-",
  pagination: {
    inputToken: "startingToken",
    outputToken: "nextToken",
    items: "runs",
    pageSize: "maxItems",
  } as const,
})) as any;

export type ListRunTasksError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of tasks and status information within their specified run. Use this operation to monitor runs and to identify which specific tasks have failed.
 */
export const listRunTasks: API.PaginatedOperationMethod<
  ListRunTasksRequest,
  ListRunTasksResponse,
  ListRunTasksError,
  Credentials | HttpClient.HttpClient,
  TaskListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRunTasksRequest,
  output: ListRunTasksResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRunTasks",
  endpointHostPrefix: "workflows-",
  pagination: {
    inputToken: "startingToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSequenceStoresError =
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of sequence stores and returns each sequence store's metadata.
 *
 * For more information, see Creating a HealthOmics sequence store in the *Amazon Web Services HealthOmics User Guide*.
 */
export const listSequenceStores: API.PaginatedOperationMethod<
  ListSequenceStoresRequest,
  ListSequenceStoresResponse,
  ListSequenceStoresError,
  Credentials | HttpClient.HttpClient,
  SequenceStoreDetail
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSequenceStoresRequest,
  output: ListSequenceStoresResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSequenceStores",
  endpointHostPrefix: "control-storage-",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "sequenceStores",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSharesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the resource shares associated with an account. Use the filter parameter to retrieve a specific subset of the shares.
 */
export const listShares: API.PaginatedOperationMethod<
  ListSharesRequest,
  ListSharesResponse,
  ListSharesError,
  Credentials | HttpClient.HttpClient,
  ShareDetails
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSharesRequest,
  output: ListSharesResponse,
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
  operationName: "ListShares",
  endpointHostPrefix: "analytics-",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "shares",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of tags for a resource.
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
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  endpointHostPrefix: "tags-",
}));

export type ListVariantImportJobsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Amazon Web Services HealthOmics variant stores and annotation stores are no longer open to new customers. Existing customers can continue to use the service as normal. For more information, see Amazon Web Services HealthOmics variant store and annotation store availability change.
 *
 * Retrieves a list of variant import jobs.
 */
export const listVariantImportJobs: API.PaginatedOperationMethod<
  ListVariantImportJobsRequest,
  ListVariantImportJobsResponse,
  ListVariantImportJobsError,
  Credentials | HttpClient.HttpClient,
  VariantImportJobItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListVariantImportJobsRequest,
  output: ListVariantImportJobsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVariantImportJobs",
  endpointHostPrefix: "analytics-",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "variantImportJobs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListVariantStoresError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Amazon Web Services HealthOmics variant stores and annotation stores are no longer open to new customers. Existing customers can continue to use the service as normal. For more information, see Amazon Web Services HealthOmics variant store and annotation store availability change.
 *
 * Retrieves a list of variant stores.
 */
export const listVariantStores: API.PaginatedOperationMethod<
  ListVariantStoresRequest,
  ListVariantStoresResponse,
  ListVariantStoresError,
  Credentials | HttpClient.HttpClient,
  VariantStoreItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListVariantStoresRequest,
  output: ListVariantStoresResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVariantStores",
  endpointHostPrefix: "analytics-",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "variantStores",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListWorkflowsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of existing workflows. You can filter for specific workflows by their name and type. Using the type parameter, specify `PRIVATE` to retrieve a list of private workflows or specify `READY2RUN` for a list of all Ready2Run workflows. If you do not specify the type of workflow, this operation returns a list of existing workflows.
 */
export const listWorkflows: API.PaginatedOperationMethod<
  ListWorkflowsRequest,
  ListWorkflowsResponse,
  ListWorkflowsError,
  Credentials | HttpClient.HttpClient,
  WorkflowListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListWorkflowsRequest,
  output: ListWorkflowsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkflows",
  endpointHostPrefix: "workflows-",
  pagination: {
    inputToken: "startingToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListWorkflowVersionsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the workflow versions for the specified workflow. For more information, see Workflow versioning in Amazon Web Services HealthOmics in the *Amazon Web Services HealthOmics User Guide*.
 */
export const listWorkflowVersions: API.PaginatedOperationMethod<
  ListWorkflowVersionsRequest,
  ListWorkflowVersionsResponse,
  ListWorkflowVersionsError,
  Credentials | HttpClient.HttpClient,
  WorkflowVersionListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListWorkflowVersionsRequest,
  output: ListWorkflowVersionsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkflowVersions",
  endpointHostPrefix: "workflows-",
  pagination: {
    inputToken: "startingToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PutS3AccessPolicyError =
  | AccessDeniedException
  | InternalServerException
  | NotSupportedOperationException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds an access policy to the specified store.
 */
export const putS3AccessPolicy: API.OperationMethod<
  PutS3AccessPolicyRequest,
  PutS3AccessPolicyResponse,
  PutS3AccessPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutS3AccessPolicyRequest,
  output: PutS3AccessPolicyResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotSupportedOperationException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutS3AccessPolicy",
  endpointHostPrefix: "control-storage-",
}));

export type StartAnnotationImportJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Amazon Web Services HealthOmics variant stores and annotation stores are no longer open to new customers. Existing customers can continue to use the service as normal. For more information, see Amazon Web Services HealthOmics variant store and annotation store availability change.
 *
 * Starts an annotation import job.
 */
export const startAnnotationImportJob: API.OperationMethod<
  StartAnnotationImportRequest,
  StartAnnotationImportResponse,
  StartAnnotationImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartAnnotationImportRequest,
  output: StartAnnotationImportResponse,
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
  operationName: "StartAnnotationImportJob",
  endpointHostPrefix: "analytics-",
}));

export type StartReadSetActivationJobError =
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Activates an archived read set and returns its metadata in a JSON formatted output. AWS HealthOmics automatically archives unused read sets after 30 days. To monitor the status of your read set activation job, use the `GetReadSetActivationJob` operation.
 *
 * To learn more, see Activating read sets in the *Amazon Web Services HealthOmics User Guide*.
 */
export const startReadSetActivationJob: API.OperationMethod<
  StartReadSetActivationJobRequest,
  StartReadSetActivationJobResponse,
  StartReadSetActivationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartReadSetActivationJobRequest,
  output: StartReadSetActivationJobResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartReadSetActivationJob",
  endpointHostPrefix: "control-storage-",
}));

export type StartReadSetExportJobError =
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a read set export job. When the export job is finished, the read set is exported to an Amazon S3 bucket which can be retrieved using the `GetReadSetExportJob` API operation.
 *
 * To monitor the status of the export job, use the `ListReadSetExportJobs` API operation.
 */
export const startReadSetExportJob: API.OperationMethod<
  StartReadSetExportJobRequest,
  StartReadSetExportJobResponse,
  StartReadSetExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartReadSetExportJobRequest,
  output: StartReadSetExportJobResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartReadSetExportJob",
  endpointHostPrefix: "control-storage-",
}));

export type StartReadSetImportJobError =
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Imports a read set from the sequence store. Read set import jobs support a maximum of 100 read sets of different types. Monitor the progress of your read set import job by calling the `GetReadSetImportJob` API operation.
 */
export const startReadSetImportJob: API.OperationMethod<
  StartReadSetImportJobRequest,
  StartReadSetImportJobResponse,
  StartReadSetImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartReadSetImportJobRequest,
  output: StartReadSetImportJobResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartReadSetImportJob",
  endpointHostPrefix: "control-storage-",
}));

export type StartReferenceImportJobError =
  | AccessDeniedException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Imports a reference genome from Amazon S3 into a specified reference store. You can have multiple reference genomes in a reference store. You can only import reference genomes one at a time into each reference store. Monitor the status of your reference import job by using the `GetReferenceImportJob` API operation.
 */
export const startReferenceImportJob: API.OperationMethod<
  StartReferenceImportJobRequest,
  StartReferenceImportJobResponse,
  StartReferenceImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartReferenceImportJobRequest,
  output: StartReferenceImportJobResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartReferenceImportJob",
  endpointHostPrefix: "control-storage-",
}));

export type StartRunError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a new run and returns details about the run, or duplicates an existing run. A run is a single invocation of a workflow. If you provide request IDs, Amazon Web Services HealthOmics identifies duplicate requests and starts the run only once. Monitor the progress of the run by calling the `GetRun` API operation.
 *
 * To start a new run, the following inputs are required:
 *
 * - A service role ARN (`roleArn`).
 *
 * - The run's workflow ID (`workflowId`, not the `uuid` or `runId`).
 *
 * - An Amazon S3 location (`outputUri`) where the run outputs will be saved.
 *
 * - All required workflow parameters (`parameter`), which can include optional parameters from the parameter template. The run cannot include any parameters that are not defined in the parameter template. To see all possible parameters, use the `GetRun` API operation.
 *
 * - For runs with a `STATIC` (default) storage type, specify the required storage capacity (in gibibytes). A storage capacity value is not required for runs that use `DYNAMIC` storage.
 *
 * `StartRun` can also duplicate an existing run using the run's default values. You can modify these default values and/or add other optional inputs. To duplicate a run, the following inputs are required:
 *
 * - A service role ARN (`roleArn`).
 *
 * - The ID of the run to duplicate (`runId`).
 *
 * - An Amazon S3 location where the run outputs will be saved (`outputUri`).
 *
 * To learn more about the optional parameters for `StartRun`, see Starting a run in the *Amazon Web Services HealthOmics User Guide*.
 *
 * Use the `retentionMode` input to control how long the metadata for each run is stored in CloudWatch. There are two retention modes:
 *
 * - Specify `REMOVE` to automatically remove the oldest runs when you reach the maximum service retention limit for runs. It is recommended that you use the `REMOVE` mode to initiate major run requests so that your runs do not fail when you reach the limit.
 *
 * - The `retentionMode` is set to the `RETAIN` mode by default, which allows you to manually remove runs after reaching the maximum service retention limit. Under this setting, you cannot create additional runs until you remove the excess runs.
 *
 * To learn more about the retention modes, see Run retention mode in the *Amazon Web Services HealthOmics User Guide*.
 *
 * You can use Amazon Q CLI to analyze run logs and make performance optimization recommendations. To get started, see the Amazon Web Services HealthOmics MCP server on GitHub.
 */
export const startRun: API.OperationMethod<
  StartRunRequest,
  StartRunResponse,
  StartRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartRunRequest,
  output: StartRunResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartRun",
  endpointHostPrefix: "workflows-",
}));

export type StartRunBatchError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a batch of workflow runs. You can group up to 100,000 runs into a single batch that share a common configuration defined in `defaultRunSetting`. Per-run overrides can be provided either inline via `inlineSettings` (up to 100 runs) or via a JSON file stored in Amazon S3 via `s3UriSettings` (up to 100,000 runs).
 *
 * `StartRunBatch` validates common fields synchronously and returns immediately with a batch ID and status `CREATING`. The batch transitions to `PENDING` once initial setup completes. Runs are then submitted gradually and asynchronously at a rate governed by your `StartRun` throughput quota.
 */
export const startRunBatch: API.OperationMethod<
  StartRunBatchRequest,
  StartRunBatchResponse,
  StartRunBatchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartRunBatchRequest,
  output: StartRunBatchResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartRunBatch",
  endpointHostPrefix: "workflows-",
}));

export type StartVariantImportJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Amazon Web Services HealthOmics variant stores and annotation stores are no longer open to new customers. Existing customers can continue to use the service as normal. For more information, see Amazon Web Services HealthOmics variant store and annotation store availability change.
 *
 * Starts a variant import job.
 */
export const startVariantImportJob: API.OperationMethod<
  StartVariantImportRequest,
  StartVariantImportResponse,
  StartVariantImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartVariantImportRequest,
  output: StartVariantImportResponse,
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
  operationName: "StartVariantImportJob",
  endpointHostPrefix: "analytics-",
}));

export type TagResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Tags a resource.
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
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
  endpointHostPrefix: "tags-",
}));

export type UntagResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes tags from a resource.
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
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
  endpointHostPrefix: "tags-",
}));

export type UpdateAnnotationStoreError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Amazon Web Services HealthOmics variant stores and annotation stores are no longer open to new customers. Existing customers can continue to use the service as normal. For more information, see Amazon Web Services HealthOmics variant store and annotation store availability change.
 *
 * Updates an annotation store.
 */
export const updateAnnotationStore: API.OperationMethod<
  UpdateAnnotationStoreRequest,
  UpdateAnnotationStoreResponse,
  UpdateAnnotationStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAnnotationStoreRequest,
  output: UpdateAnnotationStoreResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAnnotationStore",
  endpointHostPrefix: "analytics-",
}));

export type UpdateAnnotationStoreVersionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the description of an annotation store version.
 */
export const updateAnnotationStoreVersion: API.OperationMethod<
  UpdateAnnotationStoreVersionRequest,
  UpdateAnnotationStoreVersionResponse,
  UpdateAnnotationStoreVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAnnotationStoreVersionRequest,
  output: UpdateAnnotationStoreVersionResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAnnotationStoreVersion",
  endpointHostPrefix: "analytics-",
}));

export type UpdateRunCacheError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a run cache using its ID and returns a response with no body if the operation is successful. You can update the run cache description, name, or the default run cache behavior with `CACHE_ON_FAILURE` or `CACHE_ALWAYS`. To confirm that your run cache settings have been properly updated, use the `GetRunCache` API operation.
 *
 * For more information, see How call caching works in the *Amazon Web Services HealthOmics User Guide*.
 */
export const updateRunCache: API.OperationMethod<
  UpdateRunCacheRequest,
  UpdateRunCacheResponse,
  UpdateRunCacheError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRunCacheRequest,
  output: UpdateRunCacheResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRunCache",
  endpointHostPrefix: "workflows-",
}));

export type UpdateRunGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the settings of a run group and returns a response with no body if the operation is successful.
 *
 * You can update the following settings with `UpdateRunGroup`:
 *
 * - Maximum number of CPUs
 *
 * - Run time (measured in minutes)
 *
 * - Number of GPUs
 *
 * - Number of concurrent runs
 *
 * - Group name
 *
 * To confirm that the settings have been successfully updated, use the `ListRunGroups` or `GetRunGroup` API operations to verify that the desired changes have been made.
 */
export const updateRunGroup: API.OperationMethod<
  UpdateRunGroupRequest,
  UpdateRunGroupResponse,
  UpdateRunGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRunGroupRequest,
  output: UpdateRunGroupResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRunGroup",
  endpointHostPrefix: "workflows-",
}));

export type UpdateSequenceStoreError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update one or more parameters for the sequence store.
 */
export const updateSequenceStore: API.OperationMethod<
  UpdateSequenceStoreRequest,
  UpdateSequenceStoreResponse,
  UpdateSequenceStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSequenceStoreRequest,
  output: UpdateSequenceStoreResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSequenceStore",
  endpointHostPrefix: "control-storage-",
}));

export type UpdateVariantStoreError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Amazon Web Services HealthOmics variant stores and annotation stores are no longer open to new customers. Existing customers can continue to use the service as normal. For more information, see Amazon Web Services HealthOmics variant store and annotation store availability change.
 *
 * Updates a variant store.
 */
export const updateVariantStore: API.OperationMethod<
  UpdateVariantStoreRequest,
  UpdateVariantStoreResponse,
  UpdateVariantStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateVariantStoreRequest,
  output: UpdateVariantStoreResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateVariantStore",
  endpointHostPrefix: "analytics-",
}));

export type UpdateWorkflowError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates information about a workflow.
 *
 * You can update the following workflow information:
 *
 * - Name
 *
 * - Description
 *
 * - Default storage type
 *
 * - Default storage capacity (with workflow ID)
 *
 * This operation returns a response with no body if the operation is successful. You can check the workflow updates by calling the `GetWorkflow` API operation.
 *
 * For more information, see Update a private workflow in the *Amazon Web Services HealthOmics User Guide*.
 */
export const updateWorkflow: API.OperationMethod<
  UpdateWorkflowRequest,
  UpdateWorkflowResponse,
  UpdateWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateWorkflowRequest,
  output: UpdateWorkflowResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWorkflow",
  endpointHostPrefix: "workflows-",
}));

export type UpdateWorkflowVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates information about the workflow version. For more information, see Workflow versioning in Amazon Web Services HealthOmics in the *Amazon Web Services HealthOmics User Guide*.
 */
export const updateWorkflowVersion: API.OperationMethod<
  UpdateWorkflowVersionRequest,
  UpdateWorkflowVersionResponse,
  UpdateWorkflowVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateWorkflowVersionRequest,
  output: UpdateWorkflowVersionResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWorkflowVersion",
  endpointHostPrefix: "workflows-",
}));

export type UploadReadSetPartError =
  | AccessDeniedException
  | InternalServerException
  | NotSupportedOperationException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Uploads a specific part of a read set into a sequence store. When you a upload a read set part with a part number that already exists, the new part replaces the existing one. This operation returns a JSON formatted response containing a string identifier that is used to confirm that parts are being added to the intended upload.
 *
 * For more information, see Direct upload to a sequence store in the *Amazon Web Services HealthOmics User Guide*.
 */
export const uploadReadSetPart: API.OperationMethod<
  UploadReadSetPartRequest,
  UploadReadSetPartResponse,
  UploadReadSetPartError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UploadReadSetPartRequest,
  output: UploadReadSetPartResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotSupportedOperationException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UploadReadSetPart",
  endpointHostPrefix: "storage-",
}));
