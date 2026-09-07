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
  sdkId: "Neptune Graph",
  serviceShapeName: "AmazonNeptuneGraph",
});
const auth = T.AwsAuthSigv4({ name: "neptune-graph" });
const ver = T.ServiceVersion("2023-11-29");
const proto = T.AwsProtocolsRestJson1();
const rules = T.EndpointResolver((p, _) => {
  const {
    Region,
    UseFIPS = false,
    UseDualStack = false,
    Endpoint,
    ApiType,
  } = p;
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
            if (ApiType === "ControlPlane") {
              return e(
                `https://neptune-graph-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            if (ApiType === "DataPlane") {
              return err(
                "Invalid Configuration: fips endpoint is not supported for this API",
              );
            }
            return err("Invalid Configuration: Unknown ApiType");
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (true === _.getAttr(PartitionResult, "supportsFIPS")) {
            if (ApiType === "ControlPlane") {
              return e(
                `https://neptune-graph-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            if (ApiType === "DataPlane") {
              return err(
                "Invalid Configuration: fips endpoint is not supported for this API",
              );
            }
            return err("Invalid Configuration: Unknown ApiType");
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            if (ApiType === "ControlPlane") {
              return e(
                `https://neptune-graph.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            if (ApiType === "DataPlane") {
              return e(`https://neptune-graph.${Region}.on.aws`);
            }
            return err("Invalid Configuration: Unknown ApiType");
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        if (ApiType === "ControlPlane") {
          return e(
            `https://neptune-graph.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
        if (ApiType === "DataPlane") {
          return e(
            `https://${Region}.neptune-graph.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
        return err("Invalid Configuration: Unknown ApiType");
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
      reason: S.optional(
        S.suspend(() => ConflictExceptionReason).annotate({
          identifier: "ConflictExceptionReason",
        }),
      ),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(T.HttpError(500), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.String.pipe(T.ErrorMessage()) },
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
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(T.HttpError(429), T.Retryable({ throttling: true })),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class UnprocessableException
  extends /*@__PURE__*/ S.TaggedError<UnprocessableException>()(
    "UnprocessableException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      reason: S.suspend(() => UnprocessableExceptionReason).annotate({
        identifier: "UnprocessableExceptionReason",
      }),
    },
    T.HttpError(422),
  ).pipe(C.withBadRequestError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      reason: S.optional(
        S.suspend(() => ValidationExceptionReason).annotate({
          identifier: "ValidationExceptionReason",
        }),
      ),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type ExportTaskId = string;
export interface CancelExportTaskInput {
  taskIdentifier: string;
}
export const CancelExportTaskInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taskIdentifier: S.String.pipe(T.HttpLabel("taskIdentifier")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/exporttasks/{taskIdentifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
    ),
  ),
).annotate({
  identifier: "CancelExportTaskInput",
}) as any as S.Schema<CancelExportTaskInput>;
export type GraphId = string;
export type RoleArn = string;
export type ExportTaskStatus =
  | "INITIALIZING"
  | "EXPORTING"
  | "SUCCEEDED"
  | "FAILED"
  | "CANCELLING"
  | "CANCELLED"
  | "DELETED"
  | (string & {});
export const ExportTaskStatus = /*@__PURE__*/ S.String;

export type ExportFormat = "PARQUET" | "CSV" | (string & {});
export const ExportFormat = /*@__PURE__*/ S.String;

export type KmsKeyArn = string;
export type ParquetType = "COLUMNAR" | (string & {});
export const ParquetType = /*@__PURE__*/ S.String;

export interface CancelExportTaskOutput {
  graphId: string;
  roleArn: string;
  taskId: string;
  status: ExportTaskStatus;
  format: ExportFormat;
  destination: string;
  kmsKeyIdentifier: string;
  parquetType?: ParquetType;
  statusReason?: string;
}
export const CancelExportTaskOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    graphId: S.String,
    roleArn: S.String,
    taskId: S.String,
    status: ExportTaskStatus,
    format: ExportFormat,
    destination: S.String,
    kmsKeyIdentifier: S.String,
    parquetType: S.optional(ParquetType),
    statusReason: S.optional(S.String),
  }),
).annotate({
  identifier: "CancelExportTaskOutput",
}) as any as S.Schema<CancelExportTaskOutput>;
export type TaskId = string;
export interface CancelImportTaskInput {
  taskIdentifier: string;
}
export const CancelImportTaskInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taskIdentifier: S.String.pipe(T.HttpLabel("taskIdentifier")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/importtasks/{taskIdentifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
    ),
  ),
).annotate({
  identifier: "CancelImportTaskInput",
}) as any as S.Schema<CancelImportTaskInput>;
export type Format =
  | "CSV"
  | "OPEN_CYPHER"
  | "PARQUET"
  | "NTRIPLES"
  | (string & {});
export const Format = /*@__PURE__*/ S.String;

export type ImportTaskStatus =
  | "INITIALIZING"
  | "EXPORTING"
  | "ANALYZING_DATA"
  | "IMPORTING"
  | "REPROVISIONING"
  | "ROLLING_BACK"
  | "SUCCEEDED"
  | "FAILED"
  | "CANCELLING"
  | "CANCELLED"
  | "DELETED"
  | (string & {});
export const ImportTaskStatus = /*@__PURE__*/ S.String;

export interface CancelImportTaskOutput {
  graphId?: string;
  taskId: string;
  source: string;
  format?: Format;
  parquetType?: ParquetType;
  roleArn: string;
  status: ImportTaskStatus;
}
export const CancelImportTaskOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    graphId: S.optional(S.String),
    taskId: S.String,
    source: S.String,
    format: S.optional(Format),
    parquetType: S.optional(ParquetType),
    roleArn: S.String,
    status: ImportTaskStatus,
  }),
).annotate({
  identifier: "CancelImportTaskOutput",
}) as any as S.Schema<CancelImportTaskOutput>;
export type GraphIdentifier = string;
export interface CancelQueryInput {
  graphIdentifier: string;
  queryId: string;
}
export const CancelQueryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    graphIdentifier: S.String.pipe(
      T.HttpHeader("graphIdentifier"),
      T.HostLabel(),
    ),
    queryId: S.String.pipe(T.HttpLabel("queryId")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/queries/{queryId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ApiType: { value: "DataPlane" } }),
    ),
  ),
).annotate({
  identifier: "CancelQueryInput",
}) as any as S.Schema<CancelQueryInput>;
export interface CancelQueryResponse {}
export const CancelQueryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CancelQueryResponse",
}) as any as S.Schema<CancelQueryResponse>;
export type GraphName = string;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type VectorSearchDimension = number;
export interface VectorSearchConfiguration {
  dimension: number;
}
export const VectorSearchConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ dimension: S.Number }),
).annotate({
  identifier: "VectorSearchConfiguration",
}) as any as S.Schema<VectorSearchConfiguration>;
export type ReplicaCount = number;
export type ProvisionedMemory = number;
export interface CreateGraphInput {
  graphName: string;
  tags?: { [key: string]: string | undefined };
  publicConnectivity?: boolean;
  kmsKeyIdentifier?: string;
  vectorSearchConfiguration?: VectorSearchConfiguration;
  replicaCount?: number;
  deletionProtection?: boolean;
  provisionedMemory: number;
}
export const CreateGraphInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    graphName: S.String,
    tags: S.optional(TagMap),
    publicConnectivity: S.optional(S.Boolean),
    kmsKeyIdentifier: S.optional(S.String),
    vectorSearchConfiguration: S.optional(VectorSearchConfiguration),
    replicaCount: S.optional(S.Number),
    deletionProtection: S.optional(S.Boolean),
    provisionedMemory: S.Number,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/graphs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
    ),
  ),
).annotate({
  identifier: "CreateGraphInput",
}) as any as S.Schema<CreateGraphInput>;
export type GraphStatus =
  | "CREATING"
  | "AVAILABLE"
  | "DELETING"
  | "RESETTING"
  | "UPDATING"
  | "SNAPSHOTTING"
  | "FAILED"
  | "IMPORTING"
  | "STARTING"
  | "STOPPING"
  | "STOPPED"
  | (string & {});
export const GraphStatus = /*@__PURE__*/ S.String;

export type SnapshotId = string;
export interface CreateGraphOutput {
  id: string;
  name: string;
  arn: string;
  status?: GraphStatus;
  statusReason?: string;
  createTime?: Date;
  provisionedMemory?: number;
  endpoint?: string;
  publicConnectivity?: boolean;
  vectorSearchConfiguration?: VectorSearchConfiguration;
  replicaCount?: number;
  kmsKeyIdentifier?: string;
  sourceSnapshotId?: string;
  deletionProtection?: boolean;
  buildNumber?: string;
}
export const CreateGraphOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    name: S.String,
    arn: S.String,
    status: S.optional(GraphStatus),
    statusReason: S.optional(S.String),
    createTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    provisionedMemory: S.optional(S.Number),
    endpoint: S.optional(S.String),
    publicConnectivity: S.optional(S.Boolean),
    vectorSearchConfiguration: S.optional(VectorSearchConfiguration),
    replicaCount: S.optional(S.Number),
    kmsKeyIdentifier: S.optional(S.String),
    sourceSnapshotId: S.optional(S.String),
    deletionProtection: S.optional(S.Boolean),
    buildNumber: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateGraphOutput",
}) as any as S.Schema<CreateGraphOutput>;
export type SnapshotName = string;
export interface CreateGraphSnapshotInput {
  graphIdentifier: string;
  snapshotName: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateGraphSnapshotInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    graphIdentifier: S.String,
    snapshotName: S.String,
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/snapshots" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
    ),
  ),
).annotate({
  identifier: "CreateGraphSnapshotInput",
}) as any as S.Schema<CreateGraphSnapshotInput>;
export type SnapshotStatus =
  | "CREATING"
  | "AVAILABLE"
  | "DELETING"
  | "FAILED"
  | (string & {});
export const SnapshotStatus = /*@__PURE__*/ S.String;

export interface CreateGraphSnapshotOutput {
  id: string;
  name: string;
  arn: string;
  sourceGraphId?: string;
  snapshotCreateTime?: Date;
  status?: SnapshotStatus;
  kmsKeyIdentifier?: string;
}
export const CreateGraphSnapshotOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    name: S.String,
    arn: S.String,
    sourceGraphId: S.optional(S.String),
    snapshotCreateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    status: S.optional(SnapshotStatus),
    kmsKeyIdentifier: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateGraphSnapshotOutput",
}) as any as S.Schema<CreateGraphSnapshotOutput>;
export interface NeptuneImportOptions {
  s3ExportPath: string;
  s3ExportKmsKeyId: string;
  preserveDefaultVertexLabels?: boolean;
  preserveEdgeIds?: boolean;
}
export const NeptuneImportOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    s3ExportPath: S.String,
    s3ExportKmsKeyId: S.String,
    preserveDefaultVertexLabels: S.optional(S.Boolean),
    preserveEdgeIds: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "NeptuneImportOptions",
}) as any as S.Schema<NeptuneImportOptions>;
export type ImportOptions = { neptune: NeptuneImportOptions };
export const ImportOptions = /*@__PURE__*/ S.Union([
  S.Struct({ neptune: NeptuneImportOptions }),
]);
export type BlankNodeHandling = "convertToIri" | (string & {});
export const BlankNodeHandling = /*@__PURE__*/ S.String;

export interface CreateGraphUsingImportTaskInput {
  graphName: string;
  tags?: { [key: string]: string | undefined };
  publicConnectivity?: boolean;
  kmsKeyIdentifier?: string;
  vectorSearchConfiguration?: VectorSearchConfiguration;
  replicaCount?: number;
  deletionProtection?: boolean;
  importOptions?: ImportOptions;
  maxProvisionedMemory?: number;
  minProvisionedMemory?: number;
  failOnError?: boolean;
  source: string;
  format?: Format;
  parquetType?: ParquetType;
  blankNodeHandling?: BlankNodeHandling;
  roleArn: string;
}
export const CreateGraphUsingImportTaskInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    graphName: S.String,
    tags: S.optional(TagMap),
    publicConnectivity: S.optional(S.Boolean),
    kmsKeyIdentifier: S.optional(S.String),
    vectorSearchConfiguration: S.optional(VectorSearchConfiguration),
    replicaCount: S.optional(S.Number),
    deletionProtection: S.optional(S.Boolean),
    importOptions: S.optional(ImportOptions),
    maxProvisionedMemory: S.optional(S.Number),
    minProvisionedMemory: S.optional(S.Number),
    failOnError: S.optional(S.Boolean),
    source: S.String,
    format: S.optional(Format),
    parquetType: S.optional(ParquetType),
    blankNodeHandling: S.optional(BlankNodeHandling),
    roleArn: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/importtasks" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
    ),
  ),
).annotate({
  identifier: "CreateGraphUsingImportTaskInput",
}) as any as S.Schema<CreateGraphUsingImportTaskInput>;
export interface CreateGraphUsingImportTaskOutput {
  graphId?: string;
  taskId: string;
  source: string;
  format?: Format;
  parquetType?: ParquetType;
  roleArn: string;
  status: ImportTaskStatus;
  importOptions?: ImportOptions;
}
export const CreateGraphUsingImportTaskOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    graphId: S.optional(S.String),
    taskId: S.String,
    source: S.String,
    format: S.optional(Format),
    parquetType: S.optional(ParquetType),
    roleArn: S.String,
    status: ImportTaskStatus,
    importOptions: S.optional(ImportOptions),
  }),
).annotate({
  identifier: "CreateGraphUsingImportTaskOutput",
}) as any as S.Schema<CreateGraphUsingImportTaskOutput>;
export type VpcId = string;
export type SubnetId = string;
export type SubnetIds = string[];
export const SubnetIds = /*@__PURE__*/ S.Array(S.String);
export type SecurityGroupId = string;
export type SecurityGroupIds = string[];
export const SecurityGroupIds = /*@__PURE__*/ S.Array(S.String);
export interface CreatePrivateGraphEndpointInput {
  graphIdentifier: string;
  vpcId?: string;
  subnetIds?: string[];
  vpcSecurityGroupIds?: string[];
}
export const CreatePrivateGraphEndpointInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    graphIdentifier: S.String.pipe(T.HttpLabel("graphIdentifier")),
    vpcId: S.optional(S.String),
    subnetIds: S.optional(SubnetIds),
    vpcSecurityGroupIds: S.optional(SecurityGroupIds),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/graphs/{graphIdentifier}/endpoints/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
    ),
  ),
).annotate({
  identifier: "CreatePrivateGraphEndpointInput",
}) as any as S.Schema<CreatePrivateGraphEndpointInput>;
export type PrivateGraphEndpointStatus =
  | "CREATING"
  | "AVAILABLE"
  | "DELETING"
  | "FAILED"
  | (string & {});
export const PrivateGraphEndpointStatus = /*@__PURE__*/ S.String;

export type VpcEndpointId = string;
export interface CreatePrivateGraphEndpointOutput {
  vpcId: string;
  subnetIds: string[];
  status: PrivateGraphEndpointStatus;
  vpcEndpointId?: string;
}
export const CreatePrivateGraphEndpointOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vpcId: S.String,
    subnetIds: SubnetIds,
    status: PrivateGraphEndpointStatus,
    vpcEndpointId: S.optional(S.String),
  }),
).annotate({
  identifier: "CreatePrivateGraphEndpointOutput",
}) as any as S.Schema<CreatePrivateGraphEndpointOutput>;
export interface DeleteGraphInput {
  graphIdentifier: string;
  skipSnapshot: boolean;
}
export const DeleteGraphInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    graphIdentifier: S.String.pipe(T.HttpLabel("graphIdentifier")),
    skipSnapshot: S.Boolean.pipe(T.HttpQuery("skipSnapshot")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/graphs/{graphIdentifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
    ),
  ),
).annotate({
  identifier: "DeleteGraphInput",
}) as any as S.Schema<DeleteGraphInput>;
export interface DeleteGraphOutput {
  id: string;
  name: string;
  arn: string;
  status?: GraphStatus;
  statusReason?: string;
  createTime?: Date;
  provisionedMemory?: number;
  endpoint?: string;
  publicConnectivity?: boolean;
  vectorSearchConfiguration?: VectorSearchConfiguration;
  replicaCount?: number;
  kmsKeyIdentifier?: string;
  sourceSnapshotId?: string;
  deletionProtection?: boolean;
  buildNumber?: string;
}
export const DeleteGraphOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    name: S.String,
    arn: S.String,
    status: S.optional(GraphStatus),
    statusReason: S.optional(S.String),
    createTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    provisionedMemory: S.optional(S.Number),
    endpoint: S.optional(S.String),
    publicConnectivity: S.optional(S.Boolean),
    vectorSearchConfiguration: S.optional(VectorSearchConfiguration),
    replicaCount: S.optional(S.Number),
    kmsKeyIdentifier: S.optional(S.String),
    sourceSnapshotId: S.optional(S.String),
    deletionProtection: S.optional(S.Boolean),
    buildNumber: S.optional(S.String),
  }),
).annotate({
  identifier: "DeleteGraphOutput",
}) as any as S.Schema<DeleteGraphOutput>;
export type SnapshotIdentifier = string;
export interface DeleteGraphSnapshotInput {
  snapshotIdentifier: string;
}
export const DeleteGraphSnapshotInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    snapshotIdentifier: S.String.pipe(T.HttpLabel("snapshotIdentifier")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/snapshots/{snapshotIdentifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
    ),
  ),
).annotate({
  identifier: "DeleteGraphSnapshotInput",
}) as any as S.Schema<DeleteGraphSnapshotInput>;
export interface DeleteGraphSnapshotOutput {
  id: string;
  name: string;
  arn: string;
  sourceGraphId?: string;
  snapshotCreateTime?: Date;
  status?: SnapshotStatus;
  kmsKeyIdentifier?: string;
}
export const DeleteGraphSnapshotOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    name: S.String,
    arn: S.String,
    sourceGraphId: S.optional(S.String),
    snapshotCreateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    status: S.optional(SnapshotStatus),
    kmsKeyIdentifier: S.optional(S.String),
  }),
).annotate({
  identifier: "DeleteGraphSnapshotOutput",
}) as any as S.Schema<DeleteGraphSnapshotOutput>;
export interface DeletePrivateGraphEndpointInput {
  graphIdentifier: string;
  vpcId: string;
}
export const DeletePrivateGraphEndpointInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    graphIdentifier: S.String.pipe(T.HttpLabel("graphIdentifier")),
    vpcId: S.String.pipe(T.HttpLabel("vpcId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/graphs/{graphIdentifier}/endpoints/{vpcId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
    ),
  ),
).annotate({
  identifier: "DeletePrivateGraphEndpointInput",
}) as any as S.Schema<DeletePrivateGraphEndpointInput>;
export interface DeletePrivateGraphEndpointOutput {
  vpcId: string;
  subnetIds: string[];
  status: PrivateGraphEndpointStatus;
  vpcEndpointId?: string;
}
export const DeletePrivateGraphEndpointOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vpcId: S.String,
    subnetIds: SubnetIds,
    status: PrivateGraphEndpointStatus,
    vpcEndpointId: S.optional(S.String),
  }),
).annotate({
  identifier: "DeletePrivateGraphEndpointOutput",
}) as any as S.Schema<DeletePrivateGraphEndpointOutput>;
export type QueryLanguage = "OPEN_CYPHER" | (string & {});
export const QueryLanguage = /*@__PURE__*/ S.String;

export type DocumentValuedMap = { [key: string]: any | undefined };
export const DocumentValuedMap = /*@__PURE__*/ S.Record(
  S.String,
  S.Any.pipe(S.optional),
);
export type PlanCacheType = "ENABLED" | "DISABLED" | "AUTO" | (string & {});
export const PlanCacheType = /*@__PURE__*/ S.String;

export type ExplainMode = "STATIC" | "DETAILS" | (string & {});
export const ExplainMode = /*@__PURE__*/ S.String;

export interface ExecuteQueryInput {
  graphIdentifier: string;
  queryString: string;
  language: QueryLanguage;
  parameters?: { [key: string]: any | undefined };
  planCache?: PlanCacheType;
  explainMode?: ExplainMode;
  queryTimeoutMilliseconds?: number;
}
export const ExecuteQueryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    graphIdentifier: S.String.pipe(
      T.HttpHeader("graphIdentifier"),
      T.HostLabel(),
    ),
    queryString: S.String,
    language: QueryLanguage,
    parameters: S.optional(DocumentValuedMap),
    planCache: S.optional(PlanCacheType),
    explainMode: S.optional(ExplainMode),
    queryTimeoutMilliseconds: S.optional(S.Number),
  })
    .pipe(S.encodeKeys({ queryString: "query", explainMode: "explain" }))
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/queries" }),
        svc,
        auth,
        proto,
        ver,
        rules,
        T.StaticContextParams({ ApiType: { value: "DataPlane" } }),
      ),
    ),
).annotate({
  identifier: "ExecuteQueryInput",
}) as any as S.Schema<ExecuteQueryInput>;
export interface ExecuteQueryOutput {
  payload: T.StreamingOutputBody;
}
export const ExecuteQueryOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ payload: T.StreamingOutput.pipe(T.HttpPayload()) }),
).annotate({
  identifier: "ExecuteQueryOutput",
}) as any as S.Schema<ExecuteQueryOutput>;
export interface GetExportTaskInput {
  taskIdentifier: string;
}
export const GetExportTaskInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taskIdentifier: S.String.pipe(T.HttpLabel("taskIdentifier")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/exporttasks/{taskIdentifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
    ),
  ),
).annotate({
  identifier: "GetExportTaskInput",
}) as any as S.Schema<GetExportTaskInput>;
export interface ExportTaskDetails {
  startTime: Date;
  timeElapsedSeconds: number;
  progressPercentage: number;
  numVerticesWritten?: number;
  numEdgesWritten?: number;
}
export const ExportTaskDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    timeElapsedSeconds: S.Number,
    progressPercentage: S.Number,
    numVerticesWritten: S.optional(S.Number),
    numEdgesWritten: S.optional(S.Number),
  }),
).annotate({
  identifier: "ExportTaskDetails",
}) as any as S.Schema<ExportTaskDetails>;
export type ExportFilterLabel = string;
export type ExportFilterOutputPropertyName = string;
export type ExportFilterOutputDataType = string;
export type ExportFilterSourcePropertyName = string;
export type MultiValueHandlingType = "TO_LIST" | "PICK_FIRST" | (string & {});
export const MultiValueHandlingType = /*@__PURE__*/ S.String;

export interface ExportFilterPropertyAttributes {
  outputType?: string;
  sourcePropertyName?: string;
  multiValueHandling?: MultiValueHandlingType;
}
export const ExportFilterPropertyAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    outputType: S.optional(S.String),
    sourcePropertyName: S.optional(S.String),
    multiValueHandling: S.optional(MultiValueHandlingType),
  }),
).annotate({
  identifier: "ExportFilterPropertyAttributes",
}) as any as S.Schema<ExportFilterPropertyAttributes>;
export type ExportFilterPropertyMap = {
  [key: string]: ExportFilterPropertyAttributes | undefined;
};
export const ExportFilterPropertyMap = /*@__PURE__*/ S.Record(
  S.String,
  ExportFilterPropertyAttributes.pipe(S.optional),
);
export interface ExportFilterElement {
  properties?: { [key: string]: ExportFilterPropertyAttributes | undefined };
}
export const ExportFilterElement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ properties: S.optional(ExportFilterPropertyMap) }),
).annotate({
  identifier: "ExportFilterElement",
}) as any as S.Schema<ExportFilterElement>;
export type ExportFilterPerLabelMap = {
  [key: string]: ExportFilterElement | undefined;
};
export const ExportFilterPerLabelMap = /*@__PURE__*/ S.Record(
  S.String,
  ExportFilterElement.pipe(S.optional),
);
export interface ExportFilter {
  vertexFilter?: { [key: string]: ExportFilterElement | undefined };
  edgeFilter?: { [key: string]: ExportFilterElement | undefined };
}
export const ExportFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vertexFilter: S.optional(ExportFilterPerLabelMap),
    edgeFilter: S.optional(ExportFilterPerLabelMap),
  }),
).annotate({ identifier: "ExportFilter" }) as any as S.Schema<ExportFilter>;
export interface GetExportTaskOutput {
  graphId: string;
  roleArn: string;
  taskId: string;
  status: ExportTaskStatus;
  format: ExportFormat;
  destination: string;
  kmsKeyIdentifier: string;
  parquetType?: ParquetType;
  statusReason?: string;
  exportTaskDetails?: ExportTaskDetails;
  exportFilter?: ExportFilter;
}
export const GetExportTaskOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    graphId: S.String,
    roleArn: S.String,
    taskId: S.String,
    status: ExportTaskStatus,
    format: ExportFormat,
    destination: S.String,
    kmsKeyIdentifier: S.String,
    parquetType: S.optional(ParquetType),
    statusReason: S.optional(S.String),
    exportTaskDetails: S.optional(ExportTaskDetails),
    exportFilter: S.optional(ExportFilter),
  }),
).annotate({
  identifier: "GetExportTaskOutput",
}) as any as S.Schema<GetExportTaskOutput>;
export interface GetGraphInput {
  graphIdentifier: string;
}
export const GetGraphInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    graphIdentifier: S.String.pipe(T.HttpLabel("graphIdentifier")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/graphs/{graphIdentifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
    ),
  ),
).annotate({ identifier: "GetGraphInput" }) as any as S.Schema<GetGraphInput>;
export interface GetGraphOutput {
  id: string;
  name: string;
  arn: string;
  status?: GraphStatus;
  statusReason?: string;
  createTime?: Date;
  provisionedMemory?: number;
  endpoint?: string;
  publicConnectivity?: boolean;
  vectorSearchConfiguration?: VectorSearchConfiguration;
  replicaCount?: number;
  kmsKeyIdentifier?: string;
  sourceSnapshotId?: string;
  deletionProtection?: boolean;
  buildNumber?: string;
}
export const GetGraphOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    name: S.String,
    arn: S.String,
    status: S.optional(GraphStatus),
    statusReason: S.optional(S.String),
    createTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    provisionedMemory: S.optional(S.Number),
    endpoint: S.optional(S.String),
    publicConnectivity: S.optional(S.Boolean),
    vectorSearchConfiguration: S.optional(VectorSearchConfiguration),
    replicaCount: S.optional(S.Number),
    kmsKeyIdentifier: S.optional(S.String),
    sourceSnapshotId: S.optional(S.String),
    deletionProtection: S.optional(S.Boolean),
    buildNumber: S.optional(S.String),
  }),
).annotate({ identifier: "GetGraphOutput" }) as any as S.Schema<GetGraphOutput>;
export interface GetGraphSnapshotInput {
  snapshotIdentifier: string;
}
export const GetGraphSnapshotInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    snapshotIdentifier: S.String.pipe(T.HttpLabel("snapshotIdentifier")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/snapshots/{snapshotIdentifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
    ),
  ),
).annotate({
  identifier: "GetGraphSnapshotInput",
}) as any as S.Schema<GetGraphSnapshotInput>;
export interface GetGraphSnapshotOutput {
  id: string;
  name: string;
  arn: string;
  sourceGraphId?: string;
  snapshotCreateTime?: Date;
  status?: SnapshotStatus;
  kmsKeyIdentifier?: string;
}
export const GetGraphSnapshotOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    name: S.String,
    arn: S.String,
    sourceGraphId: S.optional(S.String),
    snapshotCreateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    status: S.optional(SnapshotStatus),
    kmsKeyIdentifier: S.optional(S.String),
  }),
).annotate({
  identifier: "GetGraphSnapshotOutput",
}) as any as S.Schema<GetGraphSnapshotOutput>;
export type GraphSummaryMode = "BASIC" | "DETAILED" | (string & {});
export const GraphSummaryMode = /*@__PURE__*/ S.String;

export interface GetGraphSummaryInput {
  graphIdentifier: string;
  mode?: GraphSummaryMode;
}
export const GetGraphSummaryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    graphIdentifier: S.String.pipe(
      T.HttpHeader("graphIdentifier"),
      T.HostLabel(),
    ),
    mode: S.optional(GraphSummaryMode).pipe(T.HttpQuery("mode")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/summary" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ApiType: { value: "DataPlane" } }),
    ),
  ),
).annotate({
  identifier: "GetGraphSummaryInput",
}) as any as S.Schema<GetGraphSummaryInput>;
export type NodeLabels = string[];
export const NodeLabels = /*@__PURE__*/ S.Array(S.String);
export type EdgeLabels = string[];
export const EdgeLabels = /*@__PURE__*/ S.Array(S.String);
export type LongValuedMap = { [key: string]: number | undefined };
export const LongValuedMap = /*@__PURE__*/ S.Record(
  S.String,
  S.Number.pipe(S.optional),
);
export type LongValuedMapList = { [key: string]: number | undefined }[];
export const LongValuedMapList = /*@__PURE__*/ S.Array(LongValuedMap);
export type NodeProperties = string[];
export const NodeProperties = /*@__PURE__*/ S.Array(S.String);
export type OutgoingEdgeLabels = string[];
export const OutgoingEdgeLabels = /*@__PURE__*/ S.Array(S.String);
export interface NodeStructure {
  count?: number;
  nodeProperties?: string[];
  distinctOutgoingEdgeLabels?: string[];
}
export const NodeStructure = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    count: S.optional(S.Number),
    nodeProperties: S.optional(NodeProperties),
    distinctOutgoingEdgeLabels: S.optional(OutgoingEdgeLabels),
  }),
).annotate({ identifier: "NodeStructure" }) as any as S.Schema<NodeStructure>;
export type NodeStructures = NodeStructure[];
export const NodeStructures = /*@__PURE__*/ S.Array(NodeStructure);
export type EdgeProperties = string[];
export const EdgeProperties = /*@__PURE__*/ S.Array(S.String);
export interface EdgeStructure {
  count?: number;
  edgeProperties?: string[];
}
export const EdgeStructure = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    count: S.optional(S.Number),
    edgeProperties: S.optional(EdgeProperties),
  }),
).annotate({ identifier: "EdgeStructure" }) as any as S.Schema<EdgeStructure>;
export type EdgeStructures = EdgeStructure[];
export const EdgeStructures = /*@__PURE__*/ S.Array(EdgeStructure);
export interface GraphDataSummary {
  numNodes?: number;
  numEdges?: number;
  numNodeLabels?: number;
  numEdgeLabels?: number;
  nodeLabels?: string[];
  edgeLabels?: string[];
  numNodeProperties?: number;
  numEdgeProperties?: number;
  nodeProperties?: { [key: string]: number | undefined }[];
  edgeProperties?: { [key: string]: number | undefined }[];
  totalNodePropertyValues?: number;
  totalEdgePropertyValues?: number;
  nodeStructures?: NodeStructure[];
  edgeStructures?: EdgeStructure[];
}
export const GraphDataSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    numNodes: S.optional(S.Number),
    numEdges: S.optional(S.Number),
    numNodeLabels: S.optional(S.Number),
    numEdgeLabels: S.optional(S.Number),
    nodeLabels: S.optional(NodeLabels),
    edgeLabels: S.optional(EdgeLabels),
    numNodeProperties: S.optional(S.Number),
    numEdgeProperties: S.optional(S.Number),
    nodeProperties: S.optional(LongValuedMapList),
    edgeProperties: S.optional(LongValuedMapList),
    totalNodePropertyValues: S.optional(S.Number),
    totalEdgePropertyValues: S.optional(S.Number),
    nodeStructures: S.optional(NodeStructures),
    edgeStructures: S.optional(EdgeStructures),
  }),
).annotate({
  identifier: "GraphDataSummary",
}) as any as S.Schema<GraphDataSummary>;
export interface GetGraphSummaryOutput {
  version?: string;
  lastStatisticsComputationTime?: Date;
  graphSummary?: GraphDataSummary;
}
export const GetGraphSummaryOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    version: S.optional(S.String),
    lastStatisticsComputationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    graphSummary: S.optional(GraphDataSummary),
  }),
).annotate({
  identifier: "GetGraphSummaryOutput",
}) as any as S.Schema<GetGraphSummaryOutput>;
export interface GetImportTaskInput {
  taskIdentifier: string;
}
export const GetImportTaskInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taskIdentifier: S.String.pipe(T.HttpLabel("taskIdentifier")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/importtasks/{taskIdentifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
    ),
  ),
).annotate({
  identifier: "GetImportTaskInput",
}) as any as S.Schema<GetImportTaskInput>;
export interface ImportTaskDetails {
  status: string;
  startTime: Date;
  timeElapsedSeconds: number;
  progressPercentage: number;
  errorCount: number;
  errorDetails?: string;
  statementCount: number;
  dictionaryEntryCount: number;
}
export const ImportTaskDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.String,
    startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    timeElapsedSeconds: S.Number,
    progressPercentage: S.Number,
    errorCount: S.Number,
    errorDetails: S.optional(S.String),
    statementCount: S.Number,
    dictionaryEntryCount: S.Number,
  }),
).annotate({
  identifier: "ImportTaskDetails",
}) as any as S.Schema<ImportTaskDetails>;
export interface GetImportTaskOutput {
  graphId?: string;
  taskId: string;
  source: string;
  format?: Format;
  parquetType?: ParquetType;
  roleArn: string;
  status: ImportTaskStatus;
  importOptions?: ImportOptions;
  importTaskDetails?: ImportTaskDetails;
  attemptNumber?: number;
  statusReason?: string;
}
export const GetImportTaskOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    graphId: S.optional(S.String),
    taskId: S.String,
    source: S.String,
    format: S.optional(Format),
    parquetType: S.optional(ParquetType),
    roleArn: S.String,
    status: ImportTaskStatus,
    importOptions: S.optional(ImportOptions),
    importTaskDetails: S.optional(ImportTaskDetails),
    attemptNumber: S.optional(S.Number),
    statusReason: S.optional(S.String),
  }),
).annotate({
  identifier: "GetImportTaskOutput",
}) as any as S.Schema<GetImportTaskOutput>;
export interface GetPrivateGraphEndpointInput {
  graphIdentifier: string;
  vpcId: string;
}
export const GetPrivateGraphEndpointInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    graphIdentifier: S.String.pipe(T.HttpLabel("graphIdentifier")),
    vpcId: S.String.pipe(T.HttpLabel("vpcId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/graphs/{graphIdentifier}/endpoints/{vpcId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
    ),
  ),
).annotate({
  identifier: "GetPrivateGraphEndpointInput",
}) as any as S.Schema<GetPrivateGraphEndpointInput>;
export interface GetPrivateGraphEndpointOutput {
  vpcId: string;
  subnetIds: string[];
  status: PrivateGraphEndpointStatus;
  vpcEndpointId?: string;
}
export const GetPrivateGraphEndpointOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vpcId: S.String,
    subnetIds: SubnetIds,
    status: PrivateGraphEndpointStatus,
    vpcEndpointId: S.optional(S.String),
  }),
).annotate({
  identifier: "GetPrivateGraphEndpointOutput",
}) as any as S.Schema<GetPrivateGraphEndpointOutput>;
export interface GetQueryInput {
  graphIdentifier: string;
  queryId: string;
}
export const GetQueryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    graphIdentifier: S.String.pipe(
      T.HttpHeader("graphIdentifier"),
      T.HostLabel(),
    ),
    queryId: S.String.pipe(T.HttpLabel("queryId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/queries/{queryId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ApiType: { value: "DataPlane" } }),
    ),
  ),
).annotate({ identifier: "GetQueryInput" }) as any as S.Schema<GetQueryInput>;
export type QueryState = "RUNNING" | "WAITING" | "CANCELLING" | (string & {});
export const QueryState = /*@__PURE__*/ S.String;

export interface GetQueryOutput {
  id?: string;
  queryString?: string;
  waited?: number;
  elapsed?: number;
  state?: QueryState;
}
export const GetQueryOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    queryString: S.optional(S.String),
    waited: S.optional(S.Number),
    elapsed: S.optional(S.Number),
    state: S.optional(QueryState),
  }),
).annotate({ identifier: "GetQueryOutput" }) as any as S.Schema<GetQueryOutput>;
export type PaginationToken = string;
export type MaxResults = number;
export interface ListExportTasksInput {
  graphIdentifier?: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListExportTasksInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    graphIdentifier: S.optional(S.String).pipe(T.HttpQuery("graphIdentifier")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/exporttasks" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
    ),
  ),
).annotate({
  identifier: "ListExportTasksInput",
}) as any as S.Schema<ListExportTasksInput>;
export interface ExportTaskSummary {
  graphId: string;
  roleArn: string;
  taskId: string;
  status: ExportTaskStatus;
  format: ExportFormat;
  destination: string;
  kmsKeyIdentifier: string;
  parquetType?: ParquetType;
  statusReason?: string;
}
export const ExportTaskSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    graphId: S.String,
    roleArn: S.String,
    taskId: S.String,
    status: ExportTaskStatus,
    format: ExportFormat,
    destination: S.String,
    kmsKeyIdentifier: S.String,
    parquetType: S.optional(ParquetType),
    statusReason: S.optional(S.String),
  }),
).annotate({
  identifier: "ExportTaskSummary",
}) as any as S.Schema<ExportTaskSummary>;
export type ExportTaskSummaryList = ExportTaskSummary[];
export const ExportTaskSummaryList = /*@__PURE__*/ S.Array(ExportTaskSummary);
export interface ListExportTasksOutput {
  tasks: ExportTaskSummary[];
  nextToken?: string;
}
export const ListExportTasksOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tasks: ExportTaskSummaryList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListExportTasksOutput",
}) as any as S.Schema<ListExportTasksOutput>;
export interface ListGraphsInput {
  nextToken?: string;
  maxResults?: number;
}
export const ListGraphsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/graphs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
    ),
  ),
).annotate({
  identifier: "ListGraphsInput",
}) as any as S.Schema<ListGraphsInput>;
export interface GraphSummary {
  id: string;
  name: string;
  arn: string;
  status?: GraphStatus;
  provisionedMemory?: number;
  publicConnectivity?: boolean;
  endpoint?: string;
  replicaCount?: number;
  kmsKeyIdentifier?: string;
  deletionProtection?: boolean;
}
export const GraphSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    name: S.String,
    arn: S.String,
    status: S.optional(GraphStatus),
    provisionedMemory: S.optional(S.Number),
    publicConnectivity: S.optional(S.Boolean),
    endpoint: S.optional(S.String),
    replicaCount: S.optional(S.Number),
    kmsKeyIdentifier: S.optional(S.String),
    deletionProtection: S.optional(S.Boolean),
  }),
).annotate({ identifier: "GraphSummary" }) as any as S.Schema<GraphSummary>;
export type GraphSummaryList = GraphSummary[];
export const GraphSummaryList = /*@__PURE__*/ S.Array(GraphSummary);
export interface ListGraphsOutput {
  graphs: GraphSummary[];
  nextToken?: string;
}
export const ListGraphsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ graphs: GraphSummaryList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListGraphsOutput",
}) as any as S.Schema<ListGraphsOutput>;
export interface ListGraphSnapshotsInput {
  graphIdentifier?: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListGraphSnapshotsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    graphIdentifier: S.optional(S.String).pipe(T.HttpQuery("graphIdentifier")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/snapshots" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
    ),
  ),
).annotate({
  identifier: "ListGraphSnapshotsInput",
}) as any as S.Schema<ListGraphSnapshotsInput>;
export interface GraphSnapshotSummary {
  id: string;
  name: string;
  arn: string;
  sourceGraphId?: string;
  snapshotCreateTime?: Date;
  status?: SnapshotStatus;
  kmsKeyIdentifier?: string;
}
export const GraphSnapshotSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    name: S.String,
    arn: S.String,
    sourceGraphId: S.optional(S.String),
    snapshotCreateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    status: S.optional(SnapshotStatus),
    kmsKeyIdentifier: S.optional(S.String),
  }),
).annotate({
  identifier: "GraphSnapshotSummary",
}) as any as S.Schema<GraphSnapshotSummary>;
export type GraphSnapshotSummaryList = GraphSnapshotSummary[];
export const GraphSnapshotSummaryList =
  /*@__PURE__*/ S.Array(GraphSnapshotSummary);
export interface ListGraphSnapshotsOutput {
  graphSnapshots: GraphSnapshotSummary[];
  nextToken?: string;
}
export const ListGraphSnapshotsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    graphSnapshots: GraphSnapshotSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListGraphSnapshotsOutput",
}) as any as S.Schema<ListGraphSnapshotsOutput>;
export interface ListImportTasksInput {
  nextToken?: string;
  maxResults?: number;
}
export const ListImportTasksInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/importtasks" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
    ),
  ),
).annotate({
  identifier: "ListImportTasksInput",
}) as any as S.Schema<ListImportTasksInput>;
export interface ImportTaskSummary {
  graphId?: string;
  taskId: string;
  source: string;
  format?: Format;
  parquetType?: ParquetType;
  roleArn: string;
  status: ImportTaskStatus;
}
export const ImportTaskSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    graphId: S.optional(S.String),
    taskId: S.String,
    source: S.String,
    format: S.optional(Format),
    parquetType: S.optional(ParquetType),
    roleArn: S.String,
    status: ImportTaskStatus,
  }),
).annotate({
  identifier: "ImportTaskSummary",
}) as any as S.Schema<ImportTaskSummary>;
export type ImportTaskSummaryList = ImportTaskSummary[];
export const ImportTaskSummaryList = /*@__PURE__*/ S.Array(ImportTaskSummary);
export interface ListImportTasksOutput {
  tasks: ImportTaskSummary[];
  nextToken?: string;
}
export const ListImportTasksOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tasks: ImportTaskSummaryList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListImportTasksOutput",
}) as any as S.Schema<ListImportTasksOutput>;
export interface ListPrivateGraphEndpointsInput {
  graphIdentifier: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListPrivateGraphEndpointsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    graphIdentifier: S.String.pipe(T.HttpLabel("graphIdentifier")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/graphs/{graphIdentifier}/endpoints/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
    ),
  ),
).annotate({
  identifier: "ListPrivateGraphEndpointsInput",
}) as any as S.Schema<ListPrivateGraphEndpointsInput>;
export interface PrivateGraphEndpointSummary {
  vpcId: string;
  subnetIds: string[];
  status: PrivateGraphEndpointStatus;
  vpcEndpointId?: string;
}
export const PrivateGraphEndpointSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vpcId: S.String,
    subnetIds: SubnetIds,
    status: PrivateGraphEndpointStatus,
    vpcEndpointId: S.optional(S.String),
  }),
).annotate({
  identifier: "PrivateGraphEndpointSummary",
}) as any as S.Schema<PrivateGraphEndpointSummary>;
export type PrivateGraphEndpointSummaryList = PrivateGraphEndpointSummary[];
export const PrivateGraphEndpointSummaryList = /*@__PURE__*/ S.Array(
  PrivateGraphEndpointSummary,
);
export interface ListPrivateGraphEndpointsOutput {
  privateGraphEndpoints: PrivateGraphEndpointSummary[];
  nextToken?: string;
}
export const ListPrivateGraphEndpointsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    privateGraphEndpoints: PrivateGraphEndpointSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPrivateGraphEndpointsOutput",
}) as any as S.Schema<ListPrivateGraphEndpointsOutput>;
export type QueryStateInput =
  | "ALL"
  | "RUNNING"
  | "WAITING"
  | "CANCELLING"
  | (string & {});
export const QueryStateInput = /*@__PURE__*/ S.String;

export interface ListQueriesInput {
  graphIdentifier: string;
  maxResults: number;
  state?: QueryStateInput;
}
export const ListQueriesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    graphIdentifier: S.String.pipe(
      T.HttpHeader("graphIdentifier"),
      T.HostLabel(),
    ),
    maxResults: S.Number.pipe(T.HttpQuery("maxResults")),
    state: S.optional(QueryStateInput).pipe(T.HttpQuery("state")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/queries" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ApiType: { value: "DataPlane" } }),
    ),
  ),
).annotate({
  identifier: "ListQueriesInput",
}) as any as S.Schema<ListQueriesInput>;
export interface QuerySummary {
  id?: string;
  queryString?: string;
  waited?: number;
  elapsed?: number;
  state?: QueryState;
}
export const QuerySummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    queryString: S.optional(S.String),
    waited: S.optional(S.Number),
    elapsed: S.optional(S.Number),
    state: S.optional(QueryState),
  }),
).annotate({ identifier: "QuerySummary" }) as any as S.Schema<QuerySummary>;
export type QuerySummaryList = QuerySummary[];
export const QuerySummaryList = /*@__PURE__*/ S.Array(QuerySummary);
export interface ListQueriesOutput {
  queries: QuerySummary[];
}
export const ListQueriesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ queries: QuerySummaryList }),
).annotate({
  identifier: "ListQueriesOutput",
}) as any as S.Schema<ListQueriesOutput>;
export type Arn = string;
export interface ListTagsForResourceInput {
  resourceArn: string;
}
export const ListTagsForResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/tags/{resourceArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
    ),
  ),
).annotate({
  identifier: "ListTagsForResourceInput",
}) as any as S.Schema<ListTagsForResourceInput>;
export interface ListTagsForResourceOutput {
  tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: S.optional(TagMap) }),
).annotate({
  identifier: "ListTagsForResourceOutput",
}) as any as S.Schema<ListTagsForResourceOutput>;
export interface ResetGraphInput {
  graphIdentifier: string;
  skipSnapshot: boolean;
}
export const ResetGraphInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    graphIdentifier: S.String.pipe(T.HttpLabel("graphIdentifier")),
    skipSnapshot: S.Boolean,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/graphs/{graphIdentifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
    ),
  ),
).annotate({
  identifier: "ResetGraphInput",
}) as any as S.Schema<ResetGraphInput>;
export interface ResetGraphOutput {
  id: string;
  name: string;
  arn: string;
  status?: GraphStatus;
  statusReason?: string;
  createTime?: Date;
  provisionedMemory?: number;
  endpoint?: string;
  publicConnectivity?: boolean;
  vectorSearchConfiguration?: VectorSearchConfiguration;
  replicaCount?: number;
  kmsKeyIdentifier?: string;
  sourceSnapshotId?: string;
  deletionProtection?: boolean;
  buildNumber?: string;
}
export const ResetGraphOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    name: S.String,
    arn: S.String,
    status: S.optional(GraphStatus),
    statusReason: S.optional(S.String),
    createTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    provisionedMemory: S.optional(S.Number),
    endpoint: S.optional(S.String),
    publicConnectivity: S.optional(S.Boolean),
    vectorSearchConfiguration: S.optional(VectorSearchConfiguration),
    replicaCount: S.optional(S.Number),
    kmsKeyIdentifier: S.optional(S.String),
    sourceSnapshotId: S.optional(S.String),
    deletionProtection: S.optional(S.Boolean),
    buildNumber: S.optional(S.String),
  }),
).annotate({
  identifier: "ResetGraphOutput",
}) as any as S.Schema<ResetGraphOutput>;
export interface RestoreGraphFromSnapshotInput {
  snapshotIdentifier: string;
  graphName: string;
  provisionedMemory?: number;
  deletionProtection?: boolean;
  tags?: { [key: string]: string | undefined };
  replicaCount?: number;
  publicConnectivity?: boolean;
}
export const RestoreGraphFromSnapshotInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    snapshotIdentifier: S.String.pipe(T.HttpLabel("snapshotIdentifier")),
    graphName: S.String,
    provisionedMemory: S.optional(S.Number),
    deletionProtection: S.optional(S.Boolean),
    tags: S.optional(TagMap),
    replicaCount: S.optional(S.Number),
    publicConnectivity: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/snapshots/{snapshotIdentifier}/restore",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
    ),
  ),
).annotate({
  identifier: "RestoreGraphFromSnapshotInput",
}) as any as S.Schema<RestoreGraphFromSnapshotInput>;
export interface RestoreGraphFromSnapshotOutput {
  id: string;
  name: string;
  arn: string;
  status?: GraphStatus;
  statusReason?: string;
  createTime?: Date;
  provisionedMemory?: number;
  endpoint?: string;
  publicConnectivity?: boolean;
  vectorSearchConfiguration?: VectorSearchConfiguration;
  replicaCount?: number;
  kmsKeyIdentifier?: string;
  sourceSnapshotId?: string;
  deletionProtection?: boolean;
  buildNumber?: string;
}
export const RestoreGraphFromSnapshotOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    name: S.String,
    arn: S.String,
    status: S.optional(GraphStatus),
    statusReason: S.optional(S.String),
    createTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    provisionedMemory: S.optional(S.Number),
    endpoint: S.optional(S.String),
    publicConnectivity: S.optional(S.Boolean),
    vectorSearchConfiguration: S.optional(VectorSearchConfiguration),
    replicaCount: S.optional(S.Number),
    kmsKeyIdentifier: S.optional(S.String),
    sourceSnapshotId: S.optional(S.String),
    deletionProtection: S.optional(S.Boolean),
    buildNumber: S.optional(S.String),
  }),
).annotate({
  identifier: "RestoreGraphFromSnapshotOutput",
}) as any as S.Schema<RestoreGraphFromSnapshotOutput>;
export interface StartExportTaskInput {
  graphIdentifier: string;
  roleArn: string;
  format: ExportFormat;
  destination: string;
  kmsKeyIdentifier: string;
  parquetType?: ParquetType;
  exportFilter?: ExportFilter;
  tags?: { [key: string]: string | undefined };
}
export const StartExportTaskInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    graphIdentifier: S.String,
    roleArn: S.String,
    format: ExportFormat,
    destination: S.String,
    kmsKeyIdentifier: S.String,
    parquetType: S.optional(ParquetType),
    exportFilter: S.optional(ExportFilter),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/exporttasks" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
    ),
  ),
).annotate({
  identifier: "StartExportTaskInput",
}) as any as S.Schema<StartExportTaskInput>;
export interface StartExportTaskOutput {
  graphId: string;
  roleArn: string;
  taskId: string;
  status: ExportTaskStatus;
  format: ExportFormat;
  destination: string;
  kmsKeyIdentifier: string;
  parquetType?: ParquetType;
  statusReason?: string;
  exportFilter?: ExportFilter;
}
export const StartExportTaskOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    graphId: S.String,
    roleArn: S.String,
    taskId: S.String,
    status: ExportTaskStatus,
    format: ExportFormat,
    destination: S.String,
    kmsKeyIdentifier: S.String,
    parquetType: S.optional(ParquetType),
    statusReason: S.optional(S.String),
    exportFilter: S.optional(ExportFilter),
  }),
).annotate({
  identifier: "StartExportTaskOutput",
}) as any as S.Schema<StartExportTaskOutput>;
export interface StartGraphInput {
  graphIdentifier: string;
}
export const StartGraphInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    graphIdentifier: S.String.pipe(T.HttpLabel("graphIdentifier")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/graphs/{graphIdentifier}/start" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
    ),
  ),
).annotate({
  identifier: "StartGraphInput",
}) as any as S.Schema<StartGraphInput>;
export interface StartGraphOutput {
  id: string;
  name: string;
  arn: string;
  status?: GraphStatus;
  statusReason?: string;
  createTime?: Date;
  provisionedMemory?: number;
  endpoint?: string;
  publicConnectivity?: boolean;
  vectorSearchConfiguration?: VectorSearchConfiguration;
  replicaCount?: number;
  kmsKeyIdentifier?: string;
  sourceSnapshotId?: string;
  deletionProtection?: boolean;
  buildNumber?: string;
}
export const StartGraphOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    name: S.String,
    arn: S.String,
    status: S.optional(GraphStatus),
    statusReason: S.optional(S.String),
    createTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    provisionedMemory: S.optional(S.Number),
    endpoint: S.optional(S.String),
    publicConnectivity: S.optional(S.Boolean),
    vectorSearchConfiguration: S.optional(VectorSearchConfiguration),
    replicaCount: S.optional(S.Number),
    kmsKeyIdentifier: S.optional(S.String),
    sourceSnapshotId: S.optional(S.String),
    deletionProtection: S.optional(S.Boolean),
    buildNumber: S.optional(S.String),
  }),
).annotate({
  identifier: "StartGraphOutput",
}) as any as S.Schema<StartGraphOutput>;
export interface StartImportTaskInput {
  importOptions?: ImportOptions;
  failOnError?: boolean;
  source: string;
  format?: Format;
  parquetType?: ParquetType;
  blankNodeHandling?: BlankNodeHandling;
  graphIdentifier: string;
  roleArn: string;
}
export const StartImportTaskInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    importOptions: S.optional(ImportOptions),
    failOnError: S.optional(S.Boolean),
    source: S.String,
    format: S.optional(Format),
    parquetType: S.optional(ParquetType),
    blankNodeHandling: S.optional(BlankNodeHandling),
    graphIdentifier: S.String.pipe(T.HttpLabel("graphIdentifier")),
    roleArn: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/graphs/{graphIdentifier}/importtasks" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
    ),
  ),
).annotate({
  identifier: "StartImportTaskInput",
}) as any as S.Schema<StartImportTaskInput>;
export interface StartImportTaskOutput {
  graphId?: string;
  taskId: string;
  source: string;
  format?: Format;
  parquetType?: ParquetType;
  roleArn: string;
  status: ImportTaskStatus;
  importOptions?: ImportOptions;
}
export const StartImportTaskOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    graphId: S.optional(S.String),
    taskId: S.String,
    source: S.String,
    format: S.optional(Format),
    parquetType: S.optional(ParquetType),
    roleArn: S.String,
    status: ImportTaskStatus,
    importOptions: S.optional(ImportOptions),
  }),
).annotate({
  identifier: "StartImportTaskOutput",
}) as any as S.Schema<StartImportTaskOutput>;
export interface StopGraphInput {
  graphIdentifier: string;
}
export const StopGraphInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    graphIdentifier: S.String.pipe(T.HttpLabel("graphIdentifier")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/graphs/{graphIdentifier}/stop" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
    ),
  ),
).annotate({ identifier: "StopGraphInput" }) as any as S.Schema<StopGraphInput>;
export interface StopGraphOutput {
  id: string;
  name: string;
  arn: string;
  status?: GraphStatus;
  statusReason?: string;
  createTime?: Date;
  provisionedMemory?: number;
  endpoint?: string;
  publicConnectivity?: boolean;
  vectorSearchConfiguration?: VectorSearchConfiguration;
  replicaCount?: number;
  kmsKeyIdentifier?: string;
  sourceSnapshotId?: string;
  deletionProtection?: boolean;
  buildNumber?: string;
}
export const StopGraphOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    name: S.String,
    arn: S.String,
    status: S.optional(GraphStatus),
    statusReason: S.optional(S.String),
    createTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    provisionedMemory: S.optional(S.Number),
    endpoint: S.optional(S.String),
    publicConnectivity: S.optional(S.Boolean),
    vectorSearchConfiguration: S.optional(VectorSearchConfiguration),
    replicaCount: S.optional(S.Number),
    kmsKeyIdentifier: S.optional(S.String),
    sourceSnapshotId: S.optional(S.String),
    deletionProtection: S.optional(S.Boolean),
    buildNumber: S.optional(S.String),
  }),
).annotate({
  identifier: "StopGraphOutput",
}) as any as S.Schema<StopGraphOutput>;
export interface TagResourceInput {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceInput = /*@__PURE__*/ S.suspend(() =>
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
      T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
    ),
  ),
).annotate({
  identifier: "TagResourceInput",
}) as any as S.Schema<TagResourceInput>;
export interface TagResourceOutput {}
export const TagResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "TagResourceOutput",
}) as any as S.Schema<TagResourceOutput>;
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceInput {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceInput = /*@__PURE__*/ S.suspend(() =>
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
      T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
    ),
  ),
).annotate({
  identifier: "UntagResourceInput",
}) as any as S.Schema<UntagResourceInput>;
export interface UntagResourceOutput {}
export const UntagResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UntagResourceOutput",
}) as any as S.Schema<UntagResourceOutput>;
export interface UpdateGraphInput {
  graphIdentifier: string;
  publicConnectivity?: boolean;
  provisionedMemory?: number;
  deletionProtection?: boolean;
}
export const UpdateGraphInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    graphIdentifier: S.String.pipe(T.HttpLabel("graphIdentifier")),
    publicConnectivity: S.optional(S.Boolean),
    provisionedMemory: S.optional(S.Number),
    deletionProtection: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/graphs/{graphIdentifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
    ),
  ),
).annotate({
  identifier: "UpdateGraphInput",
}) as any as S.Schema<UpdateGraphInput>;
export interface UpdateGraphOutput {
  id: string;
  name: string;
  arn: string;
  status?: GraphStatus;
  statusReason?: string;
  createTime?: Date;
  provisionedMemory?: number;
  endpoint?: string;
  publicConnectivity?: boolean;
  vectorSearchConfiguration?: VectorSearchConfiguration;
  replicaCount?: number;
  kmsKeyIdentifier?: string;
  sourceSnapshotId?: string;
  deletionProtection?: boolean;
  buildNumber?: string;
}
export const UpdateGraphOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    name: S.String,
    arn: S.String,
    status: S.optional(GraphStatus),
    statusReason: S.optional(S.String),
    createTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    provisionedMemory: S.optional(S.Number),
    endpoint: S.optional(S.String),
    publicConnectivity: S.optional(S.Boolean),
    vectorSearchConfiguration: S.optional(VectorSearchConfiguration),
    replicaCount: S.optional(S.Number),
    kmsKeyIdentifier: S.optional(S.String),
    sourceSnapshotId: S.optional(S.String),
    deletionProtection: S.optional(S.Boolean),
    buildNumber: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateGraphOutput",
}) as any as S.Schema<UpdateGraphOutput>;
export type ConflictExceptionReason = "CONCURRENT_MODIFICATION" | (string & {});
export const ConflictExceptionReason = /*@__PURE__*/ S.String;

export type ValidationExceptionReason =
  | "CONSTRAINT_VIOLATION"
  | "ILLEGAL_ARGUMENT"
  | "MALFORMED_QUERY"
  | "QUERY_CANCELLED"
  | "QUERY_TOO_LARGE"
  | "UNSUPPORTED_OPERATION"
  | "BAD_REQUEST"
  | (string & {});
export const ValidationExceptionReason = /*@__PURE__*/ S.String;

export type UnprocessableExceptionReason =
  | "QUERY_TIMEOUT"
  | "INTERNAL_LIMIT_EXCEEDED"
  | "MEMORY_LIMIT_EXCEEDED"
  | "STORAGE_LIMIT_EXCEEDED"
  | "PARTITION_FULL"
  | (string & {});
export const UnprocessableExceptionReason = /*@__PURE__*/ S.String;

export type CancelExportTaskError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancel the specified export task.
 */
export const cancelExportTask: API.OperationMethod<
  CancelExportTaskInput,
  CancelExportTaskOutput,
  CancelExportTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelExportTaskInput,
  output: CancelExportTaskOutput,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelExportTask",
}));

export type CancelImportTaskError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified import task.
 */
export const cancelImportTask: API.OperationMethod<
  CancelImportTaskInput,
  CancelImportTaskOutput,
  CancelImportTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelImportTaskInput,
  output: CancelImportTaskOutput,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelImportTask",
}));

export type CancelQueryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels a specified query.
 */
export const cancelQuery: API.OperationMethod<
  CancelQueryInput,
  CancelQueryResponse,
  CancelQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelQueryInput,
  output: CancelQueryResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelQuery",
  endpointHostPrefix: "{graphIdentifier}.",
}));

export type CreateGraphError =
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new Neptune Analytics graph.
 */
export const createGraph: API.OperationMethod<
  CreateGraphInput,
  CreateGraphOutput,
  CreateGraphError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateGraphInput,
  output: CreateGraphOutput,
  errors: [
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGraph",
}));

export type CreateGraphSnapshotError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a snapshot of the specific graph.
 */
export const createGraphSnapshot: API.OperationMethod<
  CreateGraphSnapshotInput,
  CreateGraphSnapshotOutput,
  CreateGraphSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateGraphSnapshotInput,
  output: CreateGraphSnapshotOutput,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGraphSnapshot",
}));

export type CreateGraphUsingImportTaskError =
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new Neptune Analytics graph and imports data into it, either from Amazon Simple Storage Service (S3) or from a Neptune database or a Neptune database snapshot.
 *
 * The data can be loaded from files in S3 that in either the Gremlin CSV format or the openCypher load format.
 */
export const createGraphUsingImportTask: API.OperationMethod<
  CreateGraphUsingImportTaskInput,
  CreateGraphUsingImportTaskOutput,
  CreateGraphUsingImportTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateGraphUsingImportTaskInput,
  output: CreateGraphUsingImportTaskOutput,
  errors: [
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGraphUsingImportTask",
}));

export type CreatePrivateGraphEndpointError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a private graph endpoint to allow private access to the graph from within a VPC. You can attach security groups to the private graph endpoint.
 *
 * VPC endpoint charges apply.
 */
export const createPrivateGraphEndpoint: API.OperationMethod<
  CreatePrivateGraphEndpointInput,
  CreatePrivateGraphEndpointOutput,
  CreatePrivateGraphEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePrivateGraphEndpointInput,
  output: CreatePrivateGraphEndpointOutput,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePrivateGraphEndpoint",
}));

export type DeleteGraphError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified graph. Graphs cannot be deleted if delete-protection is enabled.
 */
export const deleteGraph: API.OperationMethod<
  DeleteGraphInput,
  DeleteGraphOutput,
  DeleteGraphError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteGraphInput,
  output: DeleteGraphOutput,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGraph",
}));

export type DeleteGraphSnapshotError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified graph snapshot.
 */
export const deleteGraphSnapshot: API.OperationMethod<
  DeleteGraphSnapshotInput,
  DeleteGraphSnapshotOutput,
  DeleteGraphSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteGraphSnapshotInput,
  output: DeleteGraphSnapshotOutput,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGraphSnapshot",
}));

export type DeletePrivateGraphEndpointError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a private graph endpoint.
 */
export const deletePrivateGraphEndpoint: API.OperationMethod<
  DeletePrivateGraphEndpointInput,
  DeletePrivateGraphEndpointOutput,
  DeletePrivateGraphEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePrivateGraphEndpointInput,
  output: DeletePrivateGraphEndpointOutput,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePrivateGraphEndpoint",
}));

export type ExecuteQueryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | UnprocessableException
  | ValidationException
  | CommonErrors;
/**
 * Execute an openCypher query.
 *
 * When invoking this operation in a Neptune Analytics cluster, the IAM user or role making the request must have a policy attached that allows one of the following IAM actions in that cluster, depending on the query:
 *
 * - neptune-graph:ReadDataViaQuery
 *
 * - neptune-graph:WriteDataViaQuery
 *
 * - neptune-graph:DeleteDataViaQuery
 */
export const executeQuery: API.OperationMethod<
  ExecuteQueryInput,
  ExecuteQueryOutput,
  ExecuteQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ExecuteQueryInput,
  output: ExecuteQueryOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    UnprocessableException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExecuteQuery",
  endpointHostPrefix: "{graphIdentifier}.",
}));

export type GetExportTaskError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a specified export task.
 */
export const getExportTask: API.OperationMethod<
  GetExportTaskInput,
  GetExportTaskOutput,
  GetExportTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetExportTaskInput,
  output: GetExportTaskOutput,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExportTask",
}));

export type GetGraphError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a specified graph.
 */
export const getGraph: API.OperationMethod<
  GetGraphInput,
  GetGraphOutput,
  GetGraphError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetGraphInput,
  output: GetGraphOutput,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGraph",
}));

export type GetGraphSnapshotError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a specified graph snapshot.
 */
export const getGraphSnapshot: API.OperationMethod<
  GetGraphSnapshotInput,
  GetGraphSnapshotOutput,
  GetGraphSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetGraphSnapshotInput,
  output: GetGraphSnapshotOutput,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGraphSnapshot",
}));

export type GetGraphSummaryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a graph summary for a property graph.
 */
export const getGraphSummary: API.OperationMethod<
  GetGraphSummaryInput,
  GetGraphSummaryOutput,
  GetGraphSummaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetGraphSummaryInput,
  output: GetGraphSummaryOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGraphSummary",
  endpointHostPrefix: "{graphIdentifier}.",
}));

export type GetImportTaskError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a specified import task.
 */
export const getImportTask: API.OperationMethod<
  GetImportTaskInput,
  GetImportTaskOutput,
  GetImportTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetImportTaskInput,
  output: GetImportTaskOutput,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetImportTask",
}));

export type GetPrivateGraphEndpointError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a specified private endpoint.
 */
export const getPrivateGraphEndpoint: API.OperationMethod<
  GetPrivateGraphEndpointInput,
  GetPrivateGraphEndpointOutput,
  GetPrivateGraphEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPrivateGraphEndpointInput,
  output: GetPrivateGraphEndpointOutput,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPrivateGraphEndpoint",
}));

export type GetQueryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the status of a specified query.
 *
 * When invoking this operation in a Neptune Analytics cluster, the IAM user or role making the request must have the `neptune-graph:GetQueryStatus` IAM action attached.
 */
export const getQuery: API.OperationMethod<
  GetQueryInput,
  GetQueryOutput,
  GetQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetQueryInput,
  output: GetQueryOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQuery",
  endpointHostPrefix: "{graphIdentifier}.",
}));

export type ListExportTasksError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of export tasks.
 */
export const listExportTasks: API.PaginatedOperationMethod<
  ListExportTasksInput,
  ListExportTasksOutput,
  ListExportTasksError,
  Credentials | HttpClient.HttpClient,
  ExportTaskSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListExportTasksInput,
  output: ListExportTasksOutput,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExportTasks",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "tasks",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListGraphsError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists available Neptune Analytics graphs.
 */
export const listGraphs: API.PaginatedOperationMethod<
  ListGraphsInput,
  ListGraphsOutput,
  ListGraphsError,
  Credentials | HttpClient.HttpClient,
  GraphSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListGraphsInput,
  output: ListGraphsOutput,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGraphs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "graphs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListGraphSnapshotsError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists available snapshots of a specified Neptune Analytics graph.
 */
export const listGraphSnapshots: API.PaginatedOperationMethod<
  ListGraphSnapshotsInput,
  ListGraphSnapshotsOutput,
  ListGraphSnapshotsError,
  Credentials | HttpClient.HttpClient,
  GraphSnapshotSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListGraphSnapshotsInput,
  output: ListGraphSnapshotsOutput,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGraphSnapshots",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "graphSnapshots",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListImportTasksError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists import tasks.
 */
export const listImportTasks: API.PaginatedOperationMethod<
  ListImportTasksInput,
  ListImportTasksOutput,
  ListImportTasksError,
  Credentials | HttpClient.HttpClient,
  ImportTaskSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListImportTasksInput,
  output: ListImportTasksOutput,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListImportTasks",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "tasks",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPrivateGraphEndpointsError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists private endpoints for a specified Neptune Analytics graph.
 */
export const listPrivateGraphEndpoints: API.PaginatedOperationMethod<
  ListPrivateGraphEndpointsInput,
  ListPrivateGraphEndpointsOutput,
  ListPrivateGraphEndpointsError,
  Credentials | HttpClient.HttpClient,
  PrivateGraphEndpointSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPrivateGraphEndpointsInput,
  output: ListPrivateGraphEndpointsOutput,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPrivateGraphEndpoints",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "privateGraphEndpoints",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListQueriesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists active openCypher queries.
 */
export const listQueries: API.OperationMethod<
  ListQueriesInput,
  ListQueriesOutput,
  ListQueriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListQueriesInput,
  output: ListQueriesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListQueries",
  endpointHostPrefix: "{graphIdentifier}.",
}));

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists tags associated with a specified resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceInput,
  output: ListTagsForResourceOutput,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ResetGraphError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Empties the data from a specified Neptune Analytics graph.
 */
export const resetGraph: API.OperationMethod<
  ResetGraphInput,
  ResetGraphOutput,
  ResetGraphError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ResetGraphInput,
  output: ResetGraphOutput,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResetGraph",
}));

export type RestoreGraphFromSnapshotError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Restores a graph from a snapshot.
 */
export const restoreGraphFromSnapshot: API.OperationMethod<
  RestoreGraphFromSnapshotInput,
  RestoreGraphFromSnapshotOutput,
  RestoreGraphFromSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RestoreGraphFromSnapshotInput,
  output: RestoreGraphFromSnapshotOutput,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreGraphFromSnapshot",
}));

export type StartExportTaskError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Export data from an existing Neptune Analytics graph to Amazon S3. The graph state should be `AVAILABLE`.
 */
export const startExportTask: API.OperationMethod<
  StartExportTaskInput,
  StartExportTaskOutput,
  StartExportTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartExportTaskInput,
  output: StartExportTaskOutput,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartExportTask",
}));

export type StartGraphError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts the specific graph.
 */
export const startGraph: API.OperationMethod<
  StartGraphInput,
  StartGraphOutput,
  StartGraphError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartGraphInput,
  output: StartGraphOutput,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartGraph",
}));

export type StartImportTaskError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Import data into existing Neptune Analytics graph from Amazon Simple Storage Service (S3). The graph needs to be empty and in the AVAILABLE state.
 */
export const startImportTask: API.OperationMethod<
  StartImportTaskInput,
  StartImportTaskOutput,
  StartImportTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartImportTaskInput,
  output: StartImportTaskOutput,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartImportTask",
}));

export type StopGraphError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops the specific graph.
 */
export const stopGraph: API.OperationMethod<
  StopGraphInput,
  StopGraphOutput,
  StopGraphError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopGraphInput,
  output: StopGraphOutput,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopGraph",
}));

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds tags to the specified resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceOutput,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceInput,
  output: TagResourceOutput,
  errors: [
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
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes the specified tags from the specified resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceInput,
  output: UntagResourceOutput,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateGraphError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of a specified Neptune Analytics graph
 */
export const updateGraph: API.OperationMethod<
  UpdateGraphInput,
  UpdateGraphOutput,
  UpdateGraphError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateGraphInput,
  output: UpdateGraphOutput,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGraph",
}));
