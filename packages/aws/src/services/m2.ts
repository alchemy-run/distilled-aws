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
  sdkId: "m2",
  serviceShapeName: "AwsSupernovaControlPlaneService",
});
const auth = T.AwsAuthSigv4({ name: "m2" });
const ver = T.ServiceVersion("2021-04-28");
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
              `https://m2-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://m2-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://m2.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://m2.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
      resourceId: S.optional(S.String),
      resourceType: S.optional(S.String),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ExecutionTimeoutException
  extends /*@__PURE__*/ S.TaggedError<ExecutionTimeoutException>()(
    "ExecutionTimeoutException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(T.HttpError(504), T.Retryable()),
  ).pipe(C.withTimeoutError, C.withRetryableError) {}
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
      resourceId: S.optional(S.String),
      resourceType: S.optional(S.String),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.optional(S.String),
      resourceType: S.optional(S.String),
      serviceCode: S.optional(S.String),
      quotaCode: S.optional(S.String),
    },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(T.HttpError(503), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
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
      reason: S.optional(S.String),
      fieldList: S.optional(
        S.suspend(() => ValidationExceptionFieldList).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type Identifier = string;
export type AuthSecretsManagerArn = string;
export interface CancelBatchJobExecutionRequest {
  applicationId: string;
  executionId: string;
  authSecretsManagerArn?: string;
}
export const CancelBatchJobExecutionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    executionId: S.String.pipe(T.HttpLabel("executionId")),
    authSecretsManagerArn: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/applications/{applicationId}/batch-job-executions/{executionId}/cancel",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelBatchJobExecutionRequest",
}) as any as S.Schema<CancelBatchJobExecutionRequest>;
export interface CancelBatchJobExecutionResponse {}
export const CancelBatchJobExecutionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CancelBatchJobExecutionResponse",
}) as any as S.Schema<CancelBatchJobExecutionResponse>;
export type EntityName = string;
export type EntityDescription = string;
export type EngineType = string;
export type String2000 = string;
export type StringFree65000 = string;
export type Definition =
  | { s3Location: string; content?: never }
  | { s3Location?: never; content: string };
export const Definition = /*@__PURE__*/ S.Union([
  S.Struct({ s3Location: S.String }),
  S.Struct({ content: S.String }),
]);
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type ClientToken = string;
export type Arn = string;
export interface CreateApplicationRequest {
  name: string;
  description?: string;
  engineType: string;
  definition: Definition;
  tags?: { [key: string]: string | undefined };
  clientToken?: string;
  kmsKeyId?: string;
  roleArn?: string;
}
export const CreateApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    engineType: S.String,
    definition: Definition,
    tags: S.optional(TagMap),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    kmsKeyId: S.optional(S.String),
    roleArn: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/applications" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateApplicationRequest",
}) as any as S.Schema<CreateApplicationRequest>;
export type Version = number;
export interface CreateApplicationResponse {
  applicationArn: string;
  applicationId: string;
  applicationVersion: number;
}
export const CreateApplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationArn: S.String,
    applicationId: S.String,
    applicationVersion: S.Number,
  }),
).annotate({
  identifier: "CreateApplicationResponse",
}) as any as S.Schema<CreateApplicationResponse>;
export type String200 = string;
export type ExternalLocation = { s3Location: string };
export const ExternalLocation = /*@__PURE__*/ S.Union([
  S.Struct({ s3Location: S.String }),
]);
export interface DataSetExportItem {
  datasetName: string;
  externalLocation: ExternalLocation;
}
export const DataSetExportItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ datasetName: S.String, externalLocation: ExternalLocation }),
).annotate({
  identifier: "DataSetExportItem",
}) as any as S.Schema<DataSetExportItem>;
export type DataSetExportList = DataSetExportItem[];
export const DataSetExportList = /*@__PURE__*/ S.Array(DataSetExportItem);
export type DataSetExportConfig =
  | { s3Location: string; dataSets?: never }
  | { s3Location?: never; dataSets: DataSetExportItem[] };
export const DataSetExportConfig = /*@__PURE__*/ S.Union([
  S.Struct({ s3Location: S.String }),
  S.Struct({ dataSets: DataSetExportList }),
]);
export type KMSKeyId = string;
export interface CreateDataSetExportTaskRequest {
  applicationId: string;
  exportConfig: DataSetExportConfig;
  clientToken?: string;
  kmsKeyId?: string;
}
export const CreateDataSetExportTaskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    exportConfig: DataSetExportConfig,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    kmsKeyId: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/applications/{applicationId}/dataset-export-task",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDataSetExportTaskRequest",
}) as any as S.Schema<CreateDataSetExportTaskRequest>;
export interface CreateDataSetExportTaskResponse {
  taskId: string;
}
export const CreateDataSetExportTaskResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ taskId: S.String }),
).annotate({
  identifier: "CreateDataSetExportTaskResponse",
}) as any as S.Schema<CreateDataSetExportTaskResponse>;
export interface PrimaryKey {
  name?: string;
  offset: number;
  length: number;
}
export const PrimaryKey = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(S.String), offset: S.Number, length: S.Number }),
).annotate({ identifier: "PrimaryKey" }) as any as S.Schema<PrimaryKey>;
export interface AlternateKey {
  name?: string;
  offset: number;
  length: number;
  allowDuplicates?: boolean;
}
export const AlternateKey = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    offset: S.Number,
    length: S.Number,
    allowDuplicates: S.optional(S.Boolean),
  }),
).annotate({ identifier: "AlternateKey" }) as any as S.Schema<AlternateKey>;
export type AlternateKeyList = AlternateKey[];
export const AlternateKeyList = /*@__PURE__*/ S.Array(AlternateKey);
export interface VsamAttributes {
  format: string;
  encoding?: string;
  compressed?: boolean;
  primaryKey?: PrimaryKey;
  alternateKeys?: AlternateKey[];
}
export const VsamAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    format: S.String,
    encoding: S.optional(S.String),
    compressed: S.optional(S.Boolean),
    primaryKey: S.optional(PrimaryKey),
    alternateKeys: S.optional(AlternateKeyList),
  }),
).annotate({ identifier: "VsamAttributes" }) as any as S.Schema<VsamAttributes>;
export interface GdgAttributes {
  limit?: number;
  rollDisposition?: string;
}
export const GdgAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    limit: S.optional(S.Number),
    rollDisposition: S.optional(S.String),
  }),
).annotate({ identifier: "GdgAttributes" }) as any as S.Schema<GdgAttributes>;
export type String20 = string;
export type String20List = string[];
export const String20List = /*@__PURE__*/ S.Array(S.String);
export interface PoAttributes {
  format: string;
  encoding?: string;
  memberFileExtensions: string[];
}
export const PoAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    format: S.String,
    encoding: S.optional(S.String),
    memberFileExtensions: String20List,
  }),
).annotate({ identifier: "PoAttributes" }) as any as S.Schema<PoAttributes>;
export interface PsAttributes {
  format: string;
  encoding?: string;
}
export const PsAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ format: S.String, encoding: S.optional(S.String) }),
).annotate({ identifier: "PsAttributes" }) as any as S.Schema<PsAttributes>;
export type DatasetOrgAttributes =
  | { vsam: VsamAttributes; gdg?: never; po?: never; ps?: never }
  | { vsam?: never; gdg: GdgAttributes; po?: never; ps?: never }
  | { vsam?: never; gdg?: never; po: PoAttributes; ps?: never }
  | { vsam?: never; gdg?: never; po?: never; ps: PsAttributes };
export const DatasetOrgAttributes = /*@__PURE__*/ S.Union([
  S.Struct({ vsam: VsamAttributes }),
  S.Struct({ gdg: GdgAttributes }),
  S.Struct({ po: PoAttributes }),
  S.Struct({ ps: PsAttributes }),
]);
export interface RecordLength {
  min: number;
  max: number;
}
export const RecordLength = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ min: S.Number, max: S.Number }),
).annotate({ identifier: "RecordLength" }) as any as S.Schema<RecordLength>;
export interface DataSet {
  storageType?: string;
  datasetName: string;
  datasetOrg: DatasetOrgAttributes;
  relativePath?: string;
  recordLength: RecordLength;
}
export const DataSet = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    storageType: S.optional(S.String),
    datasetName: S.String,
    datasetOrg: DatasetOrgAttributes,
    relativePath: S.optional(S.String),
    recordLength: RecordLength,
  }),
).annotate({ identifier: "DataSet" }) as any as S.Schema<DataSet>;
export interface DataSetImportItem {
  dataSet: DataSet;
  externalLocation: ExternalLocation;
}
export const DataSetImportItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ dataSet: DataSet, externalLocation: ExternalLocation }),
).annotate({
  identifier: "DataSetImportItem",
}) as any as S.Schema<DataSetImportItem>;
export type DataSetImportList = DataSetImportItem[];
export const DataSetImportList = /*@__PURE__*/ S.Array(DataSetImportItem);
export type DataSetImportConfig =
  | { s3Location: string; dataSets?: never }
  | { s3Location?: never; dataSets: DataSetImportItem[] };
export const DataSetImportConfig = /*@__PURE__*/ S.Union([
  S.Struct({ s3Location: S.String }),
  S.Struct({ dataSets: DataSetImportList }),
]);
export interface CreateDataSetImportTaskRequest {
  applicationId: string;
  importConfig: DataSetImportConfig;
  clientToken?: string;
}
export const CreateDataSetImportTaskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    importConfig: DataSetImportConfig,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/applications/{applicationId}/dataset-import-task",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDataSetImportTaskRequest",
}) as any as S.Schema<CreateDataSetImportTaskRequest>;
export interface CreateDataSetImportTaskResponse {
  taskId: string;
}
export const CreateDataSetImportTaskResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ taskId: S.String }),
).annotate({
  identifier: "CreateDataSetImportTaskResponse",
}) as any as S.Schema<CreateDataSetImportTaskResponse>;
export interface CreateDeploymentRequest {
  environmentId: string;
  applicationId: string;
  applicationVersion: number;
  clientToken?: string;
}
export const CreateDeploymentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    environmentId: S.String,
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    applicationVersion: S.Number,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/applications/{applicationId}/deployments",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDeploymentRequest",
}) as any as S.Schema<CreateDeploymentRequest>;
export interface CreateDeploymentResponse {
  deploymentId: string;
}
export const CreateDeploymentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ deploymentId: S.String }),
).annotate({
  identifier: "CreateDeploymentResponse",
}) as any as S.Schema<CreateDeploymentResponse>;
export type EngineVersion = string;
export type String50 = string;
export type String50List = string[];
export const String50List = /*@__PURE__*/ S.Array(S.String);
export interface EfsStorageConfiguration {
  fileSystemId: string;
  mountPoint: string;
}
export const EfsStorageConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ fileSystemId: S.String, mountPoint: S.String }).pipe(
    S.encodeKeys({ fileSystemId: "file-system-id", mountPoint: "mount-point" }),
  ),
).annotate({
  identifier: "EfsStorageConfiguration",
}) as any as S.Schema<EfsStorageConfiguration>;
export interface FsxStorageConfiguration {
  fileSystemId: string;
  mountPoint: string;
}
export const FsxStorageConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ fileSystemId: S.String, mountPoint: S.String }).pipe(
    S.encodeKeys({ fileSystemId: "file-system-id", mountPoint: "mount-point" }),
  ),
).annotate({
  identifier: "FsxStorageConfiguration",
}) as any as S.Schema<FsxStorageConfiguration>;
export type StorageConfiguration =
  | { efs: EfsStorageConfiguration; fsx?: never }
  | { efs?: never; fsx: FsxStorageConfiguration };
export const StorageConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ efs: EfsStorageConfiguration }),
  S.Struct({ fsx: FsxStorageConfiguration }),
]);
export type StorageConfigurationList = StorageConfiguration[];
export const StorageConfigurationList =
  /*@__PURE__*/ S.Array(StorageConfiguration);
export type CapacityValue = number;
export interface HighAvailabilityConfig {
  desiredCapacity: number;
}
export const HighAvailabilityConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ desiredCapacity: S.Number }),
).annotate({
  identifier: "HighAvailabilityConfig",
}) as any as S.Schema<HighAvailabilityConfig>;
export type NetworkType = string;
export interface CreateEnvironmentRequest {
  name: string;
  instanceType: string;
  description?: string;
  engineType: string;
  engineVersion?: string;
  subnetIds?: string[];
  securityGroupIds?: string[];
  storageConfigurations?: StorageConfiguration[];
  publiclyAccessible?: boolean;
  highAvailabilityConfig?: HighAvailabilityConfig;
  tags?: { [key: string]: string | undefined };
  preferredMaintenanceWindow?: string;
  networkType?: string;
  clientToken?: string;
  kmsKeyId?: string;
}
export const CreateEnvironmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    instanceType: S.String,
    description: S.optional(S.String),
    engineType: S.String,
    engineVersion: S.optional(S.String),
    subnetIds: S.optional(String50List),
    securityGroupIds: S.optional(String50List),
    storageConfigurations: S.optional(StorageConfigurationList),
    publiclyAccessible: S.optional(S.Boolean),
    highAvailabilityConfig: S.optional(HighAvailabilityConfig),
    tags: S.optional(TagMap),
    preferredMaintenanceWindow: S.optional(S.String),
    networkType: S.optional(S.String),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    kmsKeyId: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/environments" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateEnvironmentRequest",
}) as any as S.Schema<CreateEnvironmentRequest>;
export interface CreateEnvironmentResponse {
  environmentId: string;
}
export const CreateEnvironmentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ environmentId: S.String }),
).annotate({
  identifier: "CreateEnvironmentResponse",
}) as any as S.Schema<CreateEnvironmentResponse>;
export interface DeleteApplicationRequest {
  applicationId: string;
}
export const DeleteApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ applicationId: S.String.pipe(T.HttpLabel("applicationId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/applications/{applicationId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteApplicationRequest",
}) as any as S.Schema<DeleteApplicationRequest>;
export interface DeleteApplicationResponse {}
export const DeleteApplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteApplicationResponse",
}) as any as S.Schema<DeleteApplicationResponse>;
export interface DeleteApplicationFromEnvironmentRequest {
  applicationId: string;
  environmentId: string;
}
export const DeleteApplicationFromEnvironmentRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      applicationId: S.String.pipe(T.HttpLabel("applicationId")),
      environmentId: S.String.pipe(T.HttpLabel("environmentId")),
    }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/applications/{applicationId}/environment/{environmentId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteApplicationFromEnvironmentRequest",
}) as any as S.Schema<DeleteApplicationFromEnvironmentRequest>;
export interface DeleteApplicationFromEnvironmentResponse {}
export const DeleteApplicationFromEnvironmentResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeleteApplicationFromEnvironmentResponse",
}) as any as S.Schema<DeleteApplicationFromEnvironmentResponse>;
export interface DeleteEnvironmentRequest {
  environmentId: string;
}
export const DeleteEnvironmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ environmentId: S.String.pipe(T.HttpLabel("environmentId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/environments/{environmentId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteEnvironmentRequest",
}) as any as S.Schema<DeleteEnvironmentRequest>;
export interface DeleteEnvironmentResponse {}
export const DeleteEnvironmentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteEnvironmentResponse",
}) as any as S.Schema<DeleteEnvironmentResponse>;
export interface GetApplicationRequest {
  applicationId: string;
}
export const GetApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ applicationId: S.String.pipe(T.HttpLabel("applicationId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/applications/{applicationId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetApplicationRequest",
}) as any as S.Schema<GetApplicationRequest>;
export type ApplicationLifecycle = string;
export type ApplicationVersionLifecycle = string;
export interface ApplicationVersionSummary {
  applicationVersion: number;
  status: string;
  statusReason?: string;
  creationTime: Date;
}
export const ApplicationVersionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationVersion: S.Number,
    status: S.String,
    statusReason: S.optional(S.String),
    creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "ApplicationVersionSummary",
}) as any as S.Schema<ApplicationVersionSummary>;
export type DeploymentLifecycle = string;
export interface DeployedVersionSummary {
  applicationVersion: number;
  status: string;
  statusReason?: string;
}
export const DeployedVersionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationVersion: S.Number,
    status: S.String,
    statusReason: S.optional(S.String),
  }),
).annotate({
  identifier: "DeployedVersionSummary",
}) as any as S.Schema<DeployedVersionSummary>;
export type LogGroupIdentifier = string;
export interface LogGroupSummary {
  logType: string;
  logGroupName: string;
}
export const LogGroupSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ logType: S.String, logGroupName: S.String }),
).annotate({
  identifier: "LogGroupSummary",
}) as any as S.Schema<LogGroupSummary>;
export type LogGroupSummaries = LogGroupSummary[];
export const LogGroupSummaries = /*@__PURE__*/ S.Array(LogGroupSummary);
export type ArnList = string[];
export const ArnList = /*@__PURE__*/ S.Array(S.String);
export type PortList = number[];
export const PortList = /*@__PURE__*/ S.Array(S.Number);
export type String100 = string;
export interface GetApplicationResponse {
  name: string;
  description?: string;
  applicationId: string;
  applicationArn: string;
  status: string;
  latestVersion: ApplicationVersionSummary;
  deployedVersion?: DeployedVersionSummary;
  engineType: string;
  logGroups?: LogGroupSummary[];
  creationTime: Date;
  lastStartTime?: Date;
  tags?: { [key: string]: string | undefined };
  environmentId?: string;
  targetGroupArns?: string[];
  listenerArns?: string[];
  listenerPorts?: number[];
  loadBalancerDnsName?: string;
  statusReason?: string;
  kmsKeyId?: string;
  roleArn?: string;
}
export const GetApplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    applicationId: S.String,
    applicationArn: S.String,
    status: S.String,
    latestVersion: ApplicationVersionSummary,
    deployedVersion: S.optional(DeployedVersionSummary),
    engineType: S.String,
    logGroups: S.optional(LogGroupSummaries),
    creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    tags: S.optional(TagMap),
    environmentId: S.optional(S.String),
    targetGroupArns: S.optional(ArnList),
    listenerArns: S.optional(ArnList),
    listenerPorts: S.optional(PortList),
    loadBalancerDnsName: S.optional(S.String),
    statusReason: S.optional(S.String),
    kmsKeyId: S.optional(S.String),
    roleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "GetApplicationResponse",
}) as any as S.Schema<GetApplicationResponse>;
export interface GetApplicationVersionRequest {
  applicationId: string;
  applicationVersion: number;
}
export const GetApplicationVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    applicationVersion: S.Number.pipe(T.HttpLabel("applicationVersion")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{applicationId}/versions/{applicationVersion}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetApplicationVersionRequest",
}) as any as S.Schema<GetApplicationVersionRequest>;
export interface GetApplicationVersionResponse {
  name: string;
  applicationVersion: number;
  description?: string;
  definitionContent: string;
  status: string;
  creationTime: Date;
  statusReason?: string;
}
export const GetApplicationVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    applicationVersion: S.Number,
    description: S.optional(S.String),
    definitionContent: S.String,
    status: S.String,
    creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    statusReason: S.optional(S.String),
  }),
).annotate({
  identifier: "GetApplicationVersionResponse",
}) as any as S.Schema<GetApplicationVersionResponse>;
export interface GetBatchJobExecutionRequest {
  applicationId: string;
  executionId: string;
}
export const GetBatchJobExecutionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    executionId: S.String.pipe(T.HttpLabel("executionId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{applicationId}/batch-job-executions/{executionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetBatchJobExecutionRequest",
}) as any as S.Schema<GetBatchJobExecutionRequest>;
export type BatchJobType = string;
export type BatchJobExecutionStatus = string;
export interface FileBatchJobIdentifier {
  fileName: string;
  folderPath?: string;
}
export const FileBatchJobIdentifier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ fileName: S.String, folderPath: S.optional(S.String) }),
).annotate({
  identifier: "FileBatchJobIdentifier",
}) as any as S.Schema<FileBatchJobIdentifier>;
export interface ScriptBatchJobIdentifier {
  scriptName: string;
}
export const ScriptBatchJobIdentifier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ scriptName: S.String }),
).annotate({
  identifier: "ScriptBatchJobIdentifier",
}) as any as S.Schema<ScriptBatchJobIdentifier>;
export type JobIdentifier =
  | { fileName: string; scriptName?: never }
  | { fileName?: never; scriptName: string };
export const JobIdentifier = /*@__PURE__*/ S.Union([
  S.Struct({ fileName: S.String }),
  S.Struct({ scriptName: S.String }),
]);
export interface S3BatchJobIdentifier {
  bucket: string;
  keyPrefix?: string;
  identifier: JobIdentifier;
}
export const S3BatchJobIdentifier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bucket: S.String,
    keyPrefix: S.optional(S.String),
    identifier: JobIdentifier,
  }),
).annotate({
  identifier: "S3BatchJobIdentifier",
}) as any as S.Schema<S3BatchJobIdentifier>;
export interface JobStepRestartMarker {
  fromStep: string;
  fromProcStep?: string;
  toStep?: string;
  toProcStep?: string;
  stepCheckpoint?: number;
  skip?: boolean;
}
export const JobStepRestartMarker = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fromStep: S.String,
    fromProcStep: S.optional(S.String),
    toStep: S.optional(S.String),
    toProcStep: S.optional(S.String),
    stepCheckpoint: S.optional(S.Number),
    skip: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "JobStepRestartMarker",
}) as any as S.Schema<JobStepRestartMarker>;
export interface RestartBatchJobIdentifier {
  executionId: string;
  jobStepRestartMarker: JobStepRestartMarker;
}
export const RestartBatchJobIdentifier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    executionId: S.String,
    jobStepRestartMarker: JobStepRestartMarker,
  }),
).annotate({
  identifier: "RestartBatchJobIdentifier",
}) as any as S.Schema<RestartBatchJobIdentifier>;
export type BatchJobIdentifier =
  | {
      fileBatchJobIdentifier: FileBatchJobIdentifier;
      scriptBatchJobIdentifier?: never;
      s3BatchJobIdentifier?: never;
      restartBatchJobIdentifier?: never;
    }
  | {
      fileBatchJobIdentifier?: never;
      scriptBatchJobIdentifier: ScriptBatchJobIdentifier;
      s3BatchJobIdentifier?: never;
      restartBatchJobIdentifier?: never;
    }
  | {
      fileBatchJobIdentifier?: never;
      scriptBatchJobIdentifier?: never;
      s3BatchJobIdentifier: S3BatchJobIdentifier;
      restartBatchJobIdentifier?: never;
    }
  | {
      fileBatchJobIdentifier?: never;
      scriptBatchJobIdentifier?: never;
      s3BatchJobIdentifier?: never;
      restartBatchJobIdentifier: RestartBatchJobIdentifier;
    };
export const BatchJobIdentifier = /*@__PURE__*/ S.Union([
  S.Struct({ fileBatchJobIdentifier: FileBatchJobIdentifier }),
  S.Struct({ scriptBatchJobIdentifier: ScriptBatchJobIdentifier }),
  S.Struct({ s3BatchJobIdentifier: S3BatchJobIdentifier }),
  S.Struct({ restartBatchJobIdentifier: RestartBatchJobIdentifier }),
]);
export interface GetBatchJobExecutionResponse {
  executionId: string;
  applicationId: string;
  jobId?: string;
  jobName?: string;
  jobUser?: string;
  jobType?: string;
  status: string;
  startTime: Date;
  endTime?: Date;
  statusReason?: string;
  returnCode?: string;
  batchJobIdentifier?: BatchJobIdentifier;
  jobStepRestartMarker?: JobStepRestartMarker;
}
export const GetBatchJobExecutionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    executionId: S.String,
    applicationId: S.String,
    jobId: S.optional(S.String),
    jobName: S.optional(S.String),
    jobUser: S.optional(S.String),
    jobType: S.optional(S.String),
    status: S.String,
    startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    statusReason: S.optional(S.String),
    returnCode: S.optional(S.String),
    batchJobIdentifier: S.optional(BatchJobIdentifier),
    jobStepRestartMarker: S.optional(JobStepRestartMarker),
  }),
).annotate({
  identifier: "GetBatchJobExecutionResponse",
}) as any as S.Schema<GetBatchJobExecutionResponse>;
export interface GetDataSetDetailsRequest {
  applicationId: string;
  dataSetName: string;
}
export const GetDataSetDetailsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    dataSetName: S.String.pipe(T.HttpLabel("dataSetName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{applicationId}/datasets/{dataSetName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDataSetDetailsRequest",
}) as any as S.Schema<GetDataSetDetailsRequest>;
export interface VsamDetailAttributes {
  encoding?: string;
  recordFormat?: string;
  compressed?: boolean;
  cacheAtStartup?: boolean;
  primaryKey?: PrimaryKey;
  alternateKeys?: AlternateKey[];
}
export const VsamDetailAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    encoding: S.optional(S.String),
    recordFormat: S.optional(S.String),
    compressed: S.optional(S.Boolean),
    cacheAtStartup: S.optional(S.Boolean),
    primaryKey: S.optional(PrimaryKey),
    alternateKeys: S.optional(AlternateKeyList),
  }),
).annotate({
  identifier: "VsamDetailAttributes",
}) as any as S.Schema<VsamDetailAttributes>;
export interface GdgDetailAttributes {
  limit?: number;
  rollDisposition?: string;
}
export const GdgDetailAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    limit: S.optional(S.Number),
    rollDisposition: S.optional(S.String),
  }),
).annotate({
  identifier: "GdgDetailAttributes",
}) as any as S.Schema<GdgDetailAttributes>;
export interface PoDetailAttributes {
  format: string;
  encoding: string;
}
export const PoDetailAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ format: S.String, encoding: S.String }),
).annotate({
  identifier: "PoDetailAttributes",
}) as any as S.Schema<PoDetailAttributes>;
export interface PsDetailAttributes {
  format: string;
  encoding: string;
}
export const PsDetailAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ format: S.String, encoding: S.String }),
).annotate({
  identifier: "PsDetailAttributes",
}) as any as S.Schema<PsDetailAttributes>;
export type DatasetDetailOrgAttributes =
  | { vsam: VsamDetailAttributes; gdg?: never; po?: never; ps?: never }
  | { vsam?: never; gdg: GdgDetailAttributes; po?: never; ps?: never }
  | { vsam?: never; gdg?: never; po: PoDetailAttributes; ps?: never }
  | { vsam?: never; gdg?: never; po?: never; ps: PsDetailAttributes };
export const DatasetDetailOrgAttributes = /*@__PURE__*/ S.Union([
  S.Struct({ vsam: VsamDetailAttributes }),
  S.Struct({ gdg: GdgDetailAttributes }),
  S.Struct({ po: PoDetailAttributes }),
  S.Struct({ ps: PsDetailAttributes }),
]);
export interface GetDataSetDetailsResponse {
  dataSetName: string;
  dataSetOrg?: DatasetDetailOrgAttributes;
  recordLength?: number;
  location?: string;
  blocksize?: number;
  creationTime?: Date;
  lastUpdatedTime?: Date;
  lastReferencedTime?: Date;
  fileSize?: number;
}
export const GetDataSetDetailsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dataSetName: S.String,
    dataSetOrg: S.optional(DatasetDetailOrgAttributes),
    recordLength: S.optional(S.Number),
    location: S.optional(S.String),
    blocksize: S.optional(S.Number),
    creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastUpdatedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastReferencedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    fileSize: S.optional(S.Number),
  }),
).annotate({
  identifier: "GetDataSetDetailsResponse",
}) as any as S.Schema<GetDataSetDetailsResponse>;
export interface GetDataSetExportTaskRequest {
  applicationId: string;
  taskId: string;
}
export const GetDataSetExportTaskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    taskId: S.String.pipe(T.HttpLabel("taskId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{applicationId}/dataset-export-tasks/{taskId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDataSetExportTaskRequest",
}) as any as S.Schema<GetDataSetExportTaskRequest>;
export type DataSetTaskLifecycle = string;
export interface DataSetExportSummary {
  total: number;
  succeeded: number;
  failed: number;
  pending: number;
  inProgress: number;
}
export const DataSetExportSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    total: S.Number,
    succeeded: S.Number,
    failed: S.Number,
    pending: S.Number,
    inProgress: S.Number,
  }),
).annotate({
  identifier: "DataSetExportSummary",
}) as any as S.Schema<DataSetExportSummary>;
export interface GetDataSetExportTaskResponse {
  taskId: string;
  status: string;
  summary?: DataSetExportSummary;
  statusReason?: string;
  kmsKeyArn?: string;
}
export const GetDataSetExportTaskResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taskId: S.String,
    status: S.String,
    summary: S.optional(DataSetExportSummary),
    statusReason: S.optional(S.String),
    kmsKeyArn: S.optional(S.String),
  }),
).annotate({
  identifier: "GetDataSetExportTaskResponse",
}) as any as S.Schema<GetDataSetExportTaskResponse>;
export interface GetDataSetImportTaskRequest {
  applicationId: string;
  taskId: string;
}
export const GetDataSetImportTaskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    taskId: S.String.pipe(T.HttpLabel("taskId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{applicationId}/dataset-import-tasks/{taskId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDataSetImportTaskRequest",
}) as any as S.Schema<GetDataSetImportTaskRequest>;
export interface DataSetImportSummary {
  total: number;
  succeeded: number;
  failed: number;
  pending: number;
  inProgress: number;
}
export const DataSetImportSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    total: S.Number,
    succeeded: S.Number,
    failed: S.Number,
    pending: S.Number,
    inProgress: S.Number,
  }),
).annotate({
  identifier: "DataSetImportSummary",
}) as any as S.Schema<DataSetImportSummary>;
export interface GetDataSetImportTaskResponse {
  taskId: string;
  status: string;
  summary?: DataSetImportSummary;
}
export const GetDataSetImportTaskResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taskId: S.String,
    status: S.String,
    summary: S.optional(DataSetImportSummary),
  }),
).annotate({
  identifier: "GetDataSetImportTaskResponse",
}) as any as S.Schema<GetDataSetImportTaskResponse>;
export interface GetDeploymentRequest {
  deploymentId: string;
  applicationId: string;
}
export const GetDeploymentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deploymentId: S.String.pipe(T.HttpLabel("deploymentId")),
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{applicationId}/deployments/{deploymentId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDeploymentRequest",
}) as any as S.Schema<GetDeploymentRequest>;
export interface GetDeploymentResponse {
  deploymentId: string;
  applicationId: string;
  environmentId: string;
  applicationVersion: number;
  status: string;
  creationTime: Date;
  statusReason?: string;
}
export const GetDeploymentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deploymentId: S.String,
    applicationId: S.String,
    environmentId: S.String,
    applicationVersion: S.Number,
    status: S.String,
    creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    statusReason: S.optional(S.String),
  }),
).annotate({
  identifier: "GetDeploymentResponse",
}) as any as S.Schema<GetDeploymentResponse>;
export interface GetEnvironmentRequest {
  environmentId: string;
}
export const GetEnvironmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ environmentId: S.String.pipe(T.HttpLabel("environmentId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/environments/{environmentId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetEnvironmentRequest",
}) as any as S.Schema<GetEnvironmentRequest>;
export type EnvironmentLifecycle = string;
export interface MaintenanceSchedule {
  startTime?: Date;
  endTime?: Date;
}
export const MaintenanceSchedule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "MaintenanceSchedule",
}) as any as S.Schema<MaintenanceSchedule>;
export interface PendingMaintenance {
  schedule?: MaintenanceSchedule;
  engineVersion?: string;
}
export const PendingMaintenance = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    schedule: S.optional(MaintenanceSchedule),
    engineVersion: S.optional(S.String),
  }),
).annotate({
  identifier: "PendingMaintenance",
}) as any as S.Schema<PendingMaintenance>;
export interface GetEnvironmentResponse {
  name: string;
  description?: string;
  environmentArn: string;
  environmentId: string;
  instanceType: string;
  status: string;
  engineType: string;
  engineVersion: string;
  vpcId: string;
  subnetIds: string[];
  securityGroupIds: string[];
  creationTime: Date;
  storageConfigurations?: StorageConfiguration[];
  tags?: { [key: string]: string | undefined };
  highAvailabilityConfig?: HighAvailabilityConfig;
  publiclyAccessible?: boolean;
  actualCapacity?: number;
  loadBalancerArn?: string;
  statusReason?: string;
  preferredMaintenanceWindow?: string;
  pendingMaintenance?: PendingMaintenance;
  kmsKeyId?: string;
  networkType?: string;
}
export const GetEnvironmentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    environmentArn: S.String,
    environmentId: S.String,
    instanceType: S.String,
    status: S.String,
    engineType: S.String,
    engineVersion: S.String,
    vpcId: S.String,
    subnetIds: String50List,
    securityGroupIds: String50List,
    creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    storageConfigurations: S.optional(StorageConfigurationList),
    tags: S.optional(TagMap),
    highAvailabilityConfig: S.optional(HighAvailabilityConfig),
    publiclyAccessible: S.optional(S.Boolean),
    actualCapacity: S.optional(S.Number),
    loadBalancerArn: S.optional(S.String),
    statusReason: S.optional(S.String),
    preferredMaintenanceWindow: S.optional(S.String),
    pendingMaintenance: S.optional(PendingMaintenance),
    kmsKeyId: S.optional(S.String),
    networkType: S.optional(S.String),
  }),
).annotate({
  identifier: "GetEnvironmentResponse",
}) as any as S.Schema<GetEnvironmentResponse>;
export interface GetSignedBluinsightsUrlRequest {}
export const GetSignedBluinsightsUrlRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/signed-bi-url" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSignedBluinsightsUrlRequest",
}) as any as S.Schema<GetSignedBluinsightsUrlRequest>;
export interface GetSignedBluinsightsUrlResponse {
  signedBiUrl: string;
}
export const GetSignedBluinsightsUrlResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ signedBiUrl: S.String }),
).annotate({
  identifier: "GetSignedBluinsightsUrlResponse",
}) as any as S.Schema<GetSignedBluinsightsUrlResponse>;
export type NextToken = string;
export type MaxResults = number;
export type EntityNameList = string[];
export const EntityNameList = /*@__PURE__*/ S.Array(S.String);
export interface ListApplicationsRequest {
  nextToken?: string;
  maxResults?: number;
  names?: string[];
  environmentId?: string;
}
export const ListApplicationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    names: S.optional(EntityNameList).pipe(T.HttpQuery("names")),
    environmentId: S.optional(S.String).pipe(T.HttpQuery("environmentId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/applications" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListApplicationsRequest",
}) as any as S.Schema<ListApplicationsRequest>;
export type ApplicationDeploymentLifecycle = string;
export interface ApplicationSummary {
  name: string;
  description?: string;
  applicationId: string;
  applicationArn: string;
  applicationVersion: number;
  status: string;
  engineType: string;
  creationTime: Date;
  environmentId?: string;
  lastStartTime?: Date;
  versionStatus?: string;
  deploymentStatus?: string;
  roleArn?: string;
}
export const ApplicationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    applicationId: S.String,
    applicationArn: S.String,
    applicationVersion: S.Number,
    status: S.String,
    engineType: S.String,
    creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    environmentId: S.optional(S.String),
    lastStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    versionStatus: S.optional(S.String),
    deploymentStatus: S.optional(S.String),
    roleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "ApplicationSummary",
}) as any as S.Schema<ApplicationSummary>;
export type ApplicationSummaryList = ApplicationSummary[];
export const ApplicationSummaryList = /*@__PURE__*/ S.Array(ApplicationSummary);
export interface ListApplicationsResponse {
  applications: ApplicationSummary[];
  nextToken?: string;
}
export const ListApplicationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applications: ApplicationSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListApplicationsResponse",
}) as any as S.Schema<ListApplicationsResponse>;
export interface ListApplicationVersionsRequest {
  nextToken?: string;
  maxResults?: number;
  applicationId: string;
}
export const ListApplicationVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/applications/{applicationId}/versions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListApplicationVersionsRequest",
}) as any as S.Schema<ListApplicationVersionsRequest>;
export type ApplicationVersionSummaryList = ApplicationVersionSummary[];
export const ApplicationVersionSummaryList = /*@__PURE__*/ S.Array(
  ApplicationVersionSummary,
);
export interface ListApplicationVersionsResponse {
  applicationVersions: ApplicationVersionSummary[];
  nextToken?: string;
}
export const ListApplicationVersionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationVersions: ApplicationVersionSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListApplicationVersionsResponse",
}) as any as S.Schema<ListApplicationVersionsResponse>;
export interface ListBatchJobDefinitionsRequest {
  nextToken?: string;
  maxResults?: number;
  applicationId: string;
  prefix?: string;
}
export const ListBatchJobDefinitionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    prefix: S.optional(S.String).pipe(T.HttpQuery("prefix")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{applicationId}/batch-job-definitions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListBatchJobDefinitionsRequest",
}) as any as S.Schema<ListBatchJobDefinitionsRequest>;
export interface FileBatchJobDefinition {
  fileName: string;
  folderPath?: string;
}
export const FileBatchJobDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ fileName: S.String, folderPath: S.optional(S.String) }),
).annotate({
  identifier: "FileBatchJobDefinition",
}) as any as S.Schema<FileBatchJobDefinition>;
export interface ScriptBatchJobDefinition {
  scriptName: string;
}
export const ScriptBatchJobDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ scriptName: S.String }),
).annotate({
  identifier: "ScriptBatchJobDefinition",
}) as any as S.Schema<ScriptBatchJobDefinition>;
export type BatchJobDefinition =
  | {
      fileBatchJobDefinition: FileBatchJobDefinition;
      scriptBatchJobDefinition?: never;
    }
  | {
      fileBatchJobDefinition?: never;
      scriptBatchJobDefinition: ScriptBatchJobDefinition;
    };
export const BatchJobDefinition = /*@__PURE__*/ S.Union([
  S.Struct({ fileBatchJobDefinition: FileBatchJobDefinition }),
  S.Struct({ scriptBatchJobDefinition: ScriptBatchJobDefinition }),
]);
export type BatchJobDefinitions = BatchJobDefinition[];
export const BatchJobDefinitions = /*@__PURE__*/ S.Array(BatchJobDefinition);
export interface ListBatchJobDefinitionsResponse {
  batchJobDefinitions: BatchJobDefinition[];
  nextToken?: string;
}
export const ListBatchJobDefinitionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    batchJobDefinitions: BatchJobDefinitions,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListBatchJobDefinitionsResponse",
}) as any as S.Schema<ListBatchJobDefinitionsResponse>;
export type IdentifierList = string[];
export const IdentifierList = /*@__PURE__*/ S.Array(S.String);
export interface ListBatchJobExecutionsRequest {
  nextToken?: string;
  maxResults?: number;
  applicationId: string;
  executionIds?: string[];
  jobName?: string;
  status?: string;
  startedAfter?: Date;
  startedBefore?: Date;
}
export const ListBatchJobExecutionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    executionIds: S.optional(IdentifierList).pipe(T.HttpQuery("executionIds")),
    jobName: S.optional(S.String).pipe(T.HttpQuery("jobName")),
    status: S.optional(S.String).pipe(T.HttpQuery("status")),
    startedAfter: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ).pipe(T.HttpQuery("startedAfter")),
    startedBefore: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ).pipe(T.HttpQuery("startedBefore")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{applicationId}/batch-job-executions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListBatchJobExecutionsRequest",
}) as any as S.Schema<ListBatchJobExecutionsRequest>;
export interface BatchJobExecutionSummary {
  executionId: string;
  applicationId: string;
  jobId?: string;
  jobName?: string;
  jobType?: string;
  status: string;
  startTime: Date;
  endTime?: Date;
  returnCode?: string;
  batchJobIdentifier?: BatchJobIdentifier;
}
export const BatchJobExecutionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    executionId: S.String,
    applicationId: S.String,
    jobId: S.optional(S.String),
    jobName: S.optional(S.String),
    jobType: S.optional(S.String),
    status: S.String,
    startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    returnCode: S.optional(S.String),
    batchJobIdentifier: S.optional(BatchJobIdentifier),
  }),
).annotate({
  identifier: "BatchJobExecutionSummary",
}) as any as S.Schema<BatchJobExecutionSummary>;
export type BatchJobExecutionSummaryList = BatchJobExecutionSummary[];
export const BatchJobExecutionSummaryList = /*@__PURE__*/ S.Array(
  BatchJobExecutionSummary,
);
export interface ListBatchJobExecutionsResponse {
  batchJobExecutions: BatchJobExecutionSummary[];
  nextToken?: string;
}
export const ListBatchJobExecutionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    batchJobExecutions: BatchJobExecutionSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListBatchJobExecutionsResponse",
}) as any as S.Schema<ListBatchJobExecutionsResponse>;
export interface ListBatchJobRestartPointsRequest {
  applicationId: string;
  executionId: string;
  authSecretsManagerArn?: string;
}
export const ListBatchJobRestartPointsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    executionId: S.String.pipe(T.HttpLabel("executionId")),
    authSecretsManagerArn: S.optional(S.String).pipe(
      T.HttpQuery("authSecretsManagerArn"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{applicationId}/batch-job-executions/{executionId}/steps",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListBatchJobRestartPointsRequest",
}) as any as S.Schema<ListBatchJobRestartPointsRequest>;
export interface JobStep {
  stepNumber?: number;
  stepName?: string;
  procStepNumber?: number;
  procStepName?: string;
  stepCondCode?: string;
  stepRestartable?: boolean;
  stepCheckpoint?: number;
  stepCheckpointStatus?: string;
  stepCheckpointTime?: Date;
}
export const JobStep = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    stepNumber: S.optional(S.Number),
    stepName: S.optional(S.String),
    procStepNumber: S.optional(S.Number),
    procStepName: S.optional(S.String),
    stepCondCode: S.optional(S.String),
    stepRestartable: S.optional(S.Boolean),
    stepCheckpoint: S.optional(S.Number),
    stepCheckpointStatus: S.optional(S.String),
    stepCheckpointTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "JobStep" }) as any as S.Schema<JobStep>;
export type BatchJobStepList = JobStep[];
export const BatchJobStepList = /*@__PURE__*/ S.Array(JobStep);
export interface ListBatchJobRestartPointsResponse {
  batchJobSteps?: JobStep[];
}
export const ListBatchJobRestartPointsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ batchJobSteps: S.optional(BatchJobStepList) }),
).annotate({
  identifier: "ListBatchJobRestartPointsResponse",
}) as any as S.Schema<ListBatchJobRestartPointsResponse>;
export interface ListDataSetExportHistoryRequest {
  nextToken?: string;
  maxResults?: number;
  applicationId: string;
}
export const ListDataSetExportHistoryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{applicationId}/dataset-export-tasks",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDataSetExportHistoryRequest",
}) as any as S.Schema<ListDataSetExportHistoryRequest>;
export interface DataSetExportTask {
  taskId: string;
  status: string;
  summary: DataSetExportSummary;
  statusReason?: string;
}
export const DataSetExportTask = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taskId: S.String,
    status: S.String,
    summary: DataSetExportSummary,
    statusReason: S.optional(S.String),
  }),
).annotate({
  identifier: "DataSetExportTask",
}) as any as S.Schema<DataSetExportTask>;
export type DataSetExportTaskList = DataSetExportTask[];
export const DataSetExportTaskList = /*@__PURE__*/ S.Array(DataSetExportTask);
export interface ListDataSetExportHistoryResponse {
  dataSetExportTasks: DataSetExportTask[];
  nextToken?: string;
}
export const ListDataSetExportHistoryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dataSetExportTasks: DataSetExportTaskList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDataSetExportHistoryResponse",
}) as any as S.Schema<ListDataSetExportHistoryResponse>;
export interface ListDataSetImportHistoryRequest {
  nextToken?: string;
  maxResults?: number;
  applicationId: string;
}
export const ListDataSetImportHistoryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{applicationId}/dataset-import-tasks",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDataSetImportHistoryRequest",
}) as any as S.Schema<ListDataSetImportHistoryRequest>;
export interface DataSetImportTask {
  taskId: string;
  status: string;
  summary: DataSetImportSummary;
  statusReason?: string;
}
export const DataSetImportTask = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taskId: S.String,
    status: S.String,
    summary: DataSetImportSummary,
    statusReason: S.optional(S.String),
  }),
).annotate({
  identifier: "DataSetImportTask",
}) as any as S.Schema<DataSetImportTask>;
export type DataSetImportTaskList = DataSetImportTask[];
export const DataSetImportTaskList = /*@__PURE__*/ S.Array(DataSetImportTask);
export interface ListDataSetImportHistoryResponse {
  dataSetImportTasks: DataSetImportTask[];
  nextToken?: string;
}
export const ListDataSetImportHistoryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dataSetImportTasks: DataSetImportTaskList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDataSetImportHistoryResponse",
}) as any as S.Schema<ListDataSetImportHistoryResponse>;
export interface ListDataSetsRequest {
  applicationId: string;
  nextToken?: string;
  maxResults?: number;
  prefix?: string;
  nameFilter?: string;
}
export const ListDataSetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    prefix: S.optional(S.String).pipe(T.HttpQuery("prefix")),
    nameFilter: S.optional(S.String).pipe(T.HttpQuery("nameFilter")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/applications/{applicationId}/datasets" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDataSetsRequest",
}) as any as S.Schema<ListDataSetsRequest>;
export interface DataSetSummary {
  dataSetName: string;
  dataSetOrg?: string;
  format?: string;
  creationTime?: Date;
  lastUpdatedTime?: Date;
  lastReferencedTime?: Date;
}
export const DataSetSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dataSetName: S.String,
    dataSetOrg: S.optional(S.String),
    format: S.optional(S.String),
    creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastUpdatedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastReferencedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "DataSetSummary" }) as any as S.Schema<DataSetSummary>;
export type DataSetsSummaryList = DataSetSummary[];
export const DataSetsSummaryList = /*@__PURE__*/ S.Array(DataSetSummary);
export interface ListDataSetsResponse {
  dataSets: DataSetSummary[];
  nextToken?: string;
}
export const ListDataSetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ dataSets: DataSetsSummaryList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListDataSetsResponse",
}) as any as S.Schema<ListDataSetsResponse>;
export interface ListDeploymentsRequest {
  nextToken?: string;
  maxResults?: number;
  applicationId: string;
}
export const ListDeploymentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{applicationId}/deployments",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDeploymentsRequest",
}) as any as S.Schema<ListDeploymentsRequest>;
export interface DeploymentSummary {
  deploymentId: string;
  applicationId: string;
  environmentId: string;
  applicationVersion: number;
  status: string;
  creationTime: Date;
  statusReason?: string;
}
export const DeploymentSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deploymentId: S.String,
    applicationId: S.String,
    environmentId: S.String,
    applicationVersion: S.Number,
    status: S.String,
    creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    statusReason: S.optional(S.String),
  }),
).annotate({
  identifier: "DeploymentSummary",
}) as any as S.Schema<DeploymentSummary>;
export type DeploymentList = DeploymentSummary[];
export const DeploymentList = /*@__PURE__*/ S.Array(DeploymentSummary);
export interface ListDeploymentsResponse {
  deployments: DeploymentSummary[];
  nextToken?: string;
}
export const ListDeploymentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ deployments: DeploymentList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListDeploymentsResponse",
}) as any as S.Schema<ListDeploymentsResponse>;
export interface ListEngineVersionsRequest {
  engineType?: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListEngineVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    engineType: S.optional(S.String).pipe(T.HttpQuery("engineType")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/engine-versions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListEngineVersionsRequest",
}) as any as S.Schema<ListEngineVersionsRequest>;
export interface EngineVersionsSummary {
  engineType: string;
  engineVersion: string;
}
export const EngineVersionsSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ engineType: S.String, engineVersion: S.String }),
).annotate({
  identifier: "EngineVersionsSummary",
}) as any as S.Schema<EngineVersionsSummary>;
export type EngineVersionsSummaryList = EngineVersionsSummary[];
export const EngineVersionsSummaryList = /*@__PURE__*/ S.Array(
  EngineVersionsSummary,
);
export interface ListEngineVersionsResponse {
  engineVersions: EngineVersionsSummary[];
  nextToken?: string;
}
export const ListEngineVersionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    engineVersions: EngineVersionsSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListEngineVersionsResponse",
}) as any as S.Schema<ListEngineVersionsResponse>;
export interface ListEnvironmentsRequest {
  nextToken?: string;
  maxResults?: number;
  names?: string[];
  engineType?: string;
}
export const ListEnvironmentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    names: S.optional(EntityNameList).pipe(T.HttpQuery("names")),
    engineType: S.optional(S.String).pipe(T.HttpQuery("engineType")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/environments" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListEnvironmentsRequest",
}) as any as S.Schema<ListEnvironmentsRequest>;
export interface EnvironmentSummary {
  name: string;
  environmentArn: string;
  environmentId: string;
  instanceType: string;
  status: string;
  engineType: string;
  engineVersion: string;
  creationTime: Date;
  networkType?: string;
}
export const EnvironmentSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    environmentArn: S.String,
    environmentId: S.String,
    instanceType: S.String,
    status: S.String,
    engineType: S.String,
    engineVersion: S.String,
    creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    networkType: S.optional(S.String),
  }),
).annotate({
  identifier: "EnvironmentSummary",
}) as any as S.Schema<EnvironmentSummary>;
export type EnvironmentSummaryList = EnvironmentSummary[];
export const EnvironmentSummaryList = /*@__PURE__*/ S.Array(EnvironmentSummary);
export interface ListEnvironmentsResponse {
  environments: EnvironmentSummary[];
  nextToken?: string;
}
export const ListEnvironmentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    environments: EnvironmentSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListEnvironmentsResponse",
}) as any as S.Schema<ListEnvironmentsResponse>;
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
export interface StartApplicationRequest {
  applicationId: string;
}
export const StartApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ applicationId: S.String.pipe(T.HttpLabel("applicationId")) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/applications/{applicationId}/start" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartApplicationRequest",
}) as any as S.Schema<StartApplicationRequest>;
export interface StartApplicationResponse {}
export const StartApplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StartApplicationResponse",
}) as any as S.Schema<StartApplicationResponse>;
export type BatchParamKey = string;
export type BatchParamValue = string;
export type BatchJobParametersMap = { [key: string]: string | undefined };
export const BatchJobParametersMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface StartBatchJobRequest {
  applicationId: string;
  batchJobIdentifier: BatchJobIdentifier;
  jobParams?: { [key: string]: string | undefined };
  authSecretsManagerArn?: string;
}
export const StartBatchJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    batchJobIdentifier: BatchJobIdentifier,
    jobParams: S.optional(BatchJobParametersMap),
    authSecretsManagerArn: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/applications/{applicationId}/batch-job",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartBatchJobRequest",
}) as any as S.Schema<StartBatchJobRequest>;
export interface StartBatchJobResponse {
  executionId: string;
}
export const StartBatchJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ executionId: S.String }),
).annotate({
  identifier: "StartBatchJobResponse",
}) as any as S.Schema<StartBatchJobResponse>;
export interface StopApplicationRequest {
  applicationId: string;
  forceStop?: boolean;
}
export const StopApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    forceStop: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/applications/{applicationId}/stop" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopApplicationRequest",
}) as any as S.Schema<StopApplicationRequest>;
export interface StopApplicationResponse {}
export const StopApplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StopApplicationResponse",
}) as any as S.Schema<StopApplicationResponse>;
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
export interface UpdateApplicationRequest {
  applicationId: string;
  description?: string;
  currentApplicationVersion: number;
  definition?: Definition;
}
export const UpdateApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    description: S.optional(S.String),
    currentApplicationVersion: S.Number,
    definition: S.optional(Definition),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/applications/{applicationId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateApplicationRequest",
}) as any as S.Schema<UpdateApplicationRequest>;
export interface UpdateApplicationResponse {
  applicationVersion: number;
}
export const UpdateApplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ applicationVersion: S.Number }),
).annotate({
  identifier: "UpdateApplicationResponse",
}) as any as S.Schema<UpdateApplicationResponse>;
export interface UpdateEnvironmentRequest {
  environmentId: string;
  desiredCapacity?: number;
  instanceType?: string;
  engineVersion?: string;
  preferredMaintenanceWindow?: string;
  applyDuringMaintenanceWindow?: boolean;
  forceUpdate?: boolean;
}
export const UpdateEnvironmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    environmentId: S.String.pipe(T.HttpLabel("environmentId")),
    desiredCapacity: S.optional(S.Number),
    instanceType: S.optional(S.String),
    engineVersion: S.optional(S.String),
    preferredMaintenanceWindow: S.optional(S.String),
    applyDuringMaintenanceWindow: S.optional(S.Boolean),
    forceUpdate: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/environments/{environmentId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateEnvironmentRequest",
}) as any as S.Schema<UpdateEnvironmentRequest>;
export interface UpdateEnvironmentResponse {
  environmentId: string;
}
export const UpdateEnvironmentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ environmentId: S.String }),
).annotate({
  identifier: "UpdateEnvironmentResponse",
}) as any as S.Schema<UpdateEnvironmentResponse>;
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
export type CancelBatchJobExecutionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels the running of a specific batch job execution.
 */
export const cancelBatchJobExecution: API.OperationMethod<
  CancelBatchJobExecutionRequest,
  CancelBatchJobExecutionResponse,
  CancelBatchJobExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelBatchJobExecutionRequest,
  output: CancelBatchJobExecutionResponse,
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
  operationName: "CancelBatchJobExecution",
}));

export type CreateApplicationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new application with given parameters. Requires an existing runtime
 * environment and application definition file.
 */
export const createApplication: API.OperationMethod<
  CreateApplicationRequest,
  CreateApplicationResponse,
  CreateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateApplicationRequest,
  output: CreateApplicationResponse,
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
  operationName: "CreateApplication",
}));

export type CreateDataSetExportTaskError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a data set export task for a specific application.
 */
export const createDataSetExportTask: API.OperationMethod<
  CreateDataSetExportTaskRequest,
  CreateDataSetExportTaskResponse,
  CreateDataSetExportTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDataSetExportTaskRequest,
  output: CreateDataSetExportTaskResponse,
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
  operationName: "CreateDataSetExportTask",
}));

export type CreateDataSetImportTaskError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a data set import task for a specific application.
 */
export const createDataSetImportTask: API.OperationMethod<
  CreateDataSetImportTaskRequest,
  CreateDataSetImportTaskResponse,
  CreateDataSetImportTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDataSetImportTaskRequest,
  output: CreateDataSetImportTaskResponse,
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
  operationName: "CreateDataSetImportTask",
}));

export type CreateDeploymentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates and starts a deployment to deploy an application into a runtime
 * environment.
 */
export const createDeployment: API.OperationMethod<
  CreateDeploymentRequest,
  CreateDeploymentResponse,
  CreateDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDeploymentRequest,
  output: CreateDeploymentResponse,
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
  operationName: "CreateDeployment",
}));

export type CreateEnvironmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a runtime environment for a given runtime engine.
 */
export const createEnvironment: API.OperationMethod<
  CreateEnvironmentRequest,
  CreateEnvironmentResponse,
  CreateEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateEnvironmentRequest,
  output: CreateEnvironmentResponse,
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
  operationName: "CreateEnvironment",
}));

export type DeleteApplicationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a specific application. You cannot delete a running application.
 */
export const deleteApplication: API.OperationMethod<
  DeleteApplicationRequest,
  DeleteApplicationResponse,
  DeleteApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteApplicationRequest,
  output: DeleteApplicationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplication",
}));

export type DeleteApplicationFromEnvironmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a specific application from the specific runtime environment where it was
 * previously deployed. You cannot delete a runtime environment using DeleteEnvironment if any
 * application has ever been deployed to it. This API removes the association of the
 * application with the runtime environment so you can delete the environment smoothly.
 */
export const deleteApplicationFromEnvironment: API.OperationMethod<
  DeleteApplicationFromEnvironmentRequest,
  DeleteApplicationFromEnvironmentResponse,
  DeleteApplicationFromEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteApplicationFromEnvironmentRequest,
  output: DeleteApplicationFromEnvironmentResponse,
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
  operationName: "DeleteApplicationFromEnvironment",
}));

export type DeleteEnvironmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a specific runtime environment. The environment cannot contain deployed
 * applications. If it does, you must delete those applications before you delete the
 * environment.
 */
export const deleteEnvironment: API.OperationMethod<
  DeleteEnvironmentRequest,
  DeleteEnvironmentResponse,
  DeleteEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEnvironmentRequest,
  output: DeleteEnvironmentResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEnvironment",
}));

export type GetApplicationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes the details of a specific application.
 */
export const getApplication: API.OperationMethod<
  GetApplicationRequest,
  GetApplicationResponse,
  GetApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetApplicationRequest,
  output: GetApplicationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApplication",
}));

export type GetApplicationVersionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns details about a specific version of a specific application.
 */
export const getApplicationVersion: API.OperationMethod<
  GetApplicationVersionRequest,
  GetApplicationVersionResponse,
  GetApplicationVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetApplicationVersionRequest,
  output: GetApplicationVersionResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApplicationVersion",
}));

export type GetBatchJobExecutionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the details of a specific batch job execution for a specific application.
 */
export const getBatchJobExecution: API.OperationMethod<
  GetBatchJobExecutionRequest,
  GetBatchJobExecutionResponse,
  GetBatchJobExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetBatchJobExecutionRequest,
  output: GetBatchJobExecutionResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBatchJobExecution",
}));

export type GetDataSetDetailsError =
  | AccessDeniedException
  | ConflictException
  | ExecutionTimeoutException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the details of a specific data set.
 */
export const getDataSetDetails: API.OperationMethod<
  GetDataSetDetailsRequest,
  GetDataSetDetailsResponse,
  GetDataSetDetailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDataSetDetailsRequest,
  output: GetDataSetDetailsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ExecutionTimeoutException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataSetDetails",
}));

export type GetDataSetExportTaskError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the status of a data set import task initiated with the CreateDataSetExportTask operation.
 */
export const getDataSetExportTask: API.OperationMethod<
  GetDataSetExportTaskRequest,
  GetDataSetExportTaskResponse,
  GetDataSetExportTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDataSetExportTaskRequest,
  output: GetDataSetExportTaskResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataSetExportTask",
}));

export type GetDataSetImportTaskError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the status of a data set import task initiated with the CreateDataSetImportTask operation.
 */
export const getDataSetImportTask: API.OperationMethod<
  GetDataSetImportTaskRequest,
  GetDataSetImportTaskResponse,
  GetDataSetImportTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDataSetImportTaskRequest,
  output: GetDataSetImportTaskResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataSetImportTask",
}));

export type GetDeploymentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets details of a specific deployment with a given deployment identifier.
 */
export const getDeployment: API.OperationMethod<
  GetDeploymentRequest,
  GetDeploymentResponse,
  GetDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDeploymentRequest,
  output: GetDeploymentResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeployment",
}));

export type GetEnvironmentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes a specific runtime environment.
 */
export const getEnvironment: API.OperationMethod<
  GetEnvironmentRequest,
  GetEnvironmentResponse,
  GetEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEnvironmentRequest,
  output: GetEnvironmentResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEnvironment",
}));

export type GetSignedBluinsightsUrlError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets a single sign-on URL that can be used to connect to AWS Blu Insights.
 */
export const getSignedBluinsightsUrl: API.OperationMethod<
  GetSignedBluinsightsUrlRequest,
  GetSignedBluinsightsUrlResponse,
  GetSignedBluinsightsUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSignedBluinsightsUrlRequest,
  output: GetSignedBluinsightsUrlResponse,
  errors: [AccessDeniedException, InternalServerException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSignedBluinsightsUrl",
}));

export type ListApplicationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the applications associated with a specific Amazon Web Services account. You can provide the
 * unique identifier of a specific runtime environment in a query parameter to see all
 * applications associated with that environment.
 */
export const listApplications: API.PaginatedOperationMethod<
  ListApplicationsRequest,
  ListApplicationsResponse,
  ListApplicationsError,
  Credentials | HttpClient.HttpClient,
  ApplicationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListApplicationsRequest,
  output: ListApplicationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplications",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "applications",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListApplicationVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of the application versions for a specific application.
 */
export const listApplicationVersions: API.PaginatedOperationMethod<
  ListApplicationVersionsRequest,
  ListApplicationVersionsResponse,
  ListApplicationVersionsError,
  Credentials | HttpClient.HttpClient,
  ApplicationVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListApplicationVersionsRequest,
  output: ListApplicationVersionsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplicationVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "applicationVersions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBatchJobDefinitionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the available batch job definitions based on the batch job resources uploaded
 * during the application creation. You can use the batch job definitions in the list to start
 * a batch job.
 */
export const listBatchJobDefinitions: API.PaginatedOperationMethod<
  ListBatchJobDefinitionsRequest,
  ListBatchJobDefinitionsResponse,
  ListBatchJobDefinitionsError,
  Credentials | HttpClient.HttpClient,
  BatchJobDefinition
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListBatchJobDefinitionsRequest,
  output: ListBatchJobDefinitionsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBatchJobDefinitions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "batchJobDefinitions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBatchJobExecutionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists historical, current, and scheduled batch job executions for a specific
 * application.
 */
export const listBatchJobExecutions: API.PaginatedOperationMethod<
  ListBatchJobExecutionsRequest,
  ListBatchJobExecutionsResponse,
  ListBatchJobExecutionsError,
  Credentials | HttpClient.HttpClient,
  BatchJobExecutionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListBatchJobExecutionsRequest,
  output: ListBatchJobExecutionsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBatchJobExecutions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "batchJobExecutions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBatchJobRestartPointsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the job steps for a JCL file to restart a batch job. This is only applicable for Micro Focus engine with versions 8.0.6 and above.
 */
export const listBatchJobRestartPoints: API.OperationMethod<
  ListBatchJobRestartPointsRequest,
  ListBatchJobRestartPointsResponse,
  ListBatchJobRestartPointsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListBatchJobRestartPointsRequest,
  output: ListBatchJobRestartPointsResponse,
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
  operationName: "ListBatchJobRestartPoints",
}));

export type ListDataSetExportHistoryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the data set exports for the specified application.
 */
export const listDataSetExportHistory: API.PaginatedOperationMethod<
  ListDataSetExportHistoryRequest,
  ListDataSetExportHistoryResponse,
  ListDataSetExportHistoryError,
  Credentials | HttpClient.HttpClient,
  DataSetExportTask
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDataSetExportHistoryRequest,
  output: ListDataSetExportHistoryResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataSetExportHistory",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "dataSetExportTasks",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDataSetImportHistoryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the data set imports for the specified application.
 */
export const listDataSetImportHistory: API.PaginatedOperationMethod<
  ListDataSetImportHistoryRequest,
  ListDataSetImportHistoryResponse,
  ListDataSetImportHistoryError,
  Credentials | HttpClient.HttpClient,
  DataSetImportTask
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDataSetImportHistoryRequest,
  output: ListDataSetImportHistoryResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataSetImportHistory",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "dataSetImportTasks",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDataSetsError =
  | AccessDeniedException
  | ConflictException
  | ExecutionTimeoutException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the data sets imported for a specific application. In Amazon Web Services Mainframe Modernization, data sets are
 * associated with applications deployed on runtime environments. This is known as importing
 * data sets. Currently, Amazon Web Services Mainframe Modernization can import data sets into catalogs using CreateDataSetImportTask.
 */
export const listDataSets: API.PaginatedOperationMethod<
  ListDataSetsRequest,
  ListDataSetsResponse,
  ListDataSetsError,
  Credentials | HttpClient.HttpClient,
  DataSetSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDataSetsRequest,
  output: ListDataSetsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ExecutionTimeoutException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataSets",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "dataSets",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDeploymentsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of all deployments of a specific application. A deployment is a
 * combination of a specific application and a specific version of that application. Each
 * deployment is mapped to a particular application version.
 */
export const listDeployments: API.PaginatedOperationMethod<
  ListDeploymentsRequest,
  ListDeploymentsResponse,
  ListDeploymentsError,
  Credentials | HttpClient.HttpClient,
  DeploymentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDeploymentsRequest,
  output: ListDeploymentsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDeployments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "deployments",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEngineVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the available engine versions.
 */
export const listEngineVersions: API.PaginatedOperationMethod<
  ListEngineVersionsRequest,
  ListEngineVersionsResponse,
  ListEngineVersionsError,
  Credentials | HttpClient.HttpClient,
  EngineVersionsSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEngineVersionsRequest,
  output: ListEngineVersionsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEngineVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "engineVersions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEnvironmentsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the runtime environments.
 */
export const listEnvironments: API.PaginatedOperationMethod<
  ListEnvironmentsRequest,
  ListEnvironmentsResponse,
  ListEnvironmentsError,
  Credentials | HttpClient.HttpClient,
  EnvironmentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEnvironmentsRequest,
  output: ListEnvironmentsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnvironments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "environments",
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
 * Lists the tags for the specified resource.
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

export type StartApplicationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts an application that is currently stopped.
 */
export const startApplication: API.OperationMethod<
  StartApplicationRequest,
  StartApplicationResponse,
  StartApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartApplicationRequest,
  output: StartApplicationResponse,
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
  operationName: "StartApplication",
}));

export type StartBatchJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a batch job and returns the unique identifier of this execution of the batch job.
 * The associated application must be running in order to start the batch job.
 */
export const startBatchJob: API.OperationMethod<
  StartBatchJobRequest,
  StartBatchJobResponse,
  StartBatchJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartBatchJobRequest,
  output: StartBatchJobResponse,
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
  operationName: "StartBatchJob",
}));

export type StopApplicationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops a running application.
 */
export const stopApplication: API.OperationMethod<
  StopApplicationRequest,
  StopApplicationResponse,
  StopApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopApplicationRequest,
  output: StopApplicationResponse,
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
  operationName: "StopApplication",
}));

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds one or more tags to the specified resource.
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
    ServiceQuotaExceededException,
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
 * Removes one or more tags from the specified resource.
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

export type UpdateApplicationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an application and creates a new version.
 */
export const updateApplication: API.OperationMethod<
  UpdateApplicationRequest,
  UpdateApplicationResponse,
  UpdateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateApplicationRequest,
  output: UpdateApplicationResponse,
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
  operationName: "UpdateApplication",
}));

export type UpdateEnvironmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration details for a specific runtime environment.
 */
export const updateEnvironment: API.OperationMethod<
  UpdateEnvironmentRequest,
  UpdateEnvironmentResponse,
  UpdateEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateEnvironmentRequest,
  output: UpdateEnvironmentResponse,
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
  operationName: "UpdateEnvironment",
}));
