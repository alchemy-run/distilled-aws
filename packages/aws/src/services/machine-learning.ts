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
const ns = T.XmlNamespace(
  "http://machinelearning.amazonaws.com/doc/2014-12-12/",
);
const svc = T.AwsApiService({
  sdkId: "Machine Learning",
  serviceShapeName: "AmazonML_20141212",
});
const auth = T.AwsAuthSigv4({ name: "machinelearning" });
const ver = T.ServiceVersion("2014-12-12");
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
              `https://machinelearning-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://machinelearning-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://machinelearning.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://machinelearning.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class IdempotentParameterMismatchException
  extends /*@__PURE__*/ S.TaggedError<IdempotentParameterMismatchException>()(
    "IdempotentParameterMismatchException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      code: S.optional(S.Number),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      code: S.optional(S.Number),
    },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidInputException
  extends /*@__PURE__*/ S.TaggedError<InvalidInputException>()(
    "InvalidInputException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      code: S.optional(S.Number),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidTagException
  extends /*@__PURE__*/ S.TaggedError<InvalidTagException>()(
    "InvalidTagException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      code: S.optional(S.Number),
    },
    T.HttpError(417),
  ) {}
export class PredictorNotMountedException
  extends /*@__PURE__*/ S.TaggedError<PredictorNotMountedException>()(
    "PredictorNotMountedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      code: S.optional(S.Number),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class TagLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<TagLimitExceededException>()(
    "TagLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key?: string;
  Value?: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = /*@__PURE__*/ S.Array(Tag);
export type EntityId = string;
export type TaggableResourceType =
  | "BatchPrediction"
  | "DataSource"
  | "Evaluation"
  | "MLModel"
  | (string & {});
export const TaggableResourceType = S.String;

export interface AddTagsInput {
  Tags: Tag[];
  ResourceId: string;
  ResourceType: TaggableResourceType;
}
export const AddTagsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Tags: TagList,
    ResourceId: S.String,
    ResourceType: TaggableResourceType,
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
).annotate({ identifier: "AddTagsInput" }) as any as S.Schema<AddTagsInput>;
export interface AddTagsOutput {
  ResourceId?: string;
  ResourceType?: TaggableResourceType;
}
export const AddTagsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceId: S.optional(S.String),
    ResourceType: S.optional(TaggableResourceType),
  }).pipe(ns),
).annotate({ identifier: "AddTagsOutput" }) as any as S.Schema<AddTagsOutput>;
export type EntityName = string;
export type S3Url = string;
export interface CreateBatchPredictionInput {
  BatchPredictionId: string;
  BatchPredictionName?: string;
  MLModelId: string;
  BatchPredictionDataSourceId: string;
  OutputUri: string;
}
export const CreateBatchPredictionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BatchPredictionId: S.String,
    BatchPredictionName: S.optional(S.String),
    MLModelId: S.String,
    BatchPredictionDataSourceId: S.String,
    OutputUri: S.String,
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
  identifier: "CreateBatchPredictionInput",
}) as any as S.Schema<CreateBatchPredictionInput>;
export interface CreateBatchPredictionOutput {
  BatchPredictionId?: string;
}
export const CreateBatchPredictionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BatchPredictionId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "CreateBatchPredictionOutput",
}) as any as S.Schema<CreateBatchPredictionOutput>;
export type RDSInstanceIdentifier = string;
export type RDSDatabaseName = string;
export interface RDSDatabase {
  InstanceIdentifier: string;
  DatabaseName: string;
}
export const RDSDatabase = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InstanceIdentifier: S.String, DatabaseName: S.String }),
).annotate({ identifier: "RDSDatabase" }) as any as S.Schema<RDSDatabase>;
export type RDSSelectSqlQuery = string;
export type RDSDatabaseUsername = string;
export type RDSDatabasePassword = string | redacted.Redacted<string>;
export interface RDSDatabaseCredentials {
  Username: string;
  Password: string | redacted.Redacted<string>;
}
export const RDSDatabaseCredentials = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Username: S.String, Password: SensitiveString }),
).annotate({
  identifier: "RDSDatabaseCredentials",
}) as any as S.Schema<RDSDatabaseCredentials>;
export type DataRearrangement = string;
export type DataSchema = string;
export type EDPResourceRole = string;
export type EDPServiceRole = string;
export type EDPSubnetId = string;
export type EDPSecurityGroupId = string;
export type EDPSecurityGroupIds = string[];
export const EDPSecurityGroupIds = /*@__PURE__*/ S.Array(S.String);
export interface RDSDataSpec {
  DatabaseInformation: RDSDatabase;
  SelectSqlQuery: string;
  DatabaseCredentials: RDSDatabaseCredentials;
  S3StagingLocation: string;
  DataRearrangement?: string;
  DataSchema?: string;
  DataSchemaUri?: string;
  ResourceRole: string;
  ServiceRole: string;
  SubnetId: string;
  SecurityGroupIds: string[];
}
export const RDSDataSpec = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatabaseInformation: RDSDatabase,
    SelectSqlQuery: S.String,
    DatabaseCredentials: RDSDatabaseCredentials,
    S3StagingLocation: S.String,
    DataRearrangement: S.optional(S.String),
    DataSchema: S.optional(S.String),
    DataSchemaUri: S.optional(S.String),
    ResourceRole: S.String,
    ServiceRole: S.String,
    SubnetId: S.String,
    SecurityGroupIds: EDPSecurityGroupIds,
  }),
).annotate({ identifier: "RDSDataSpec" }) as any as S.Schema<RDSDataSpec>;
export type RoleARN = string;
export type ComputeStatistics = boolean;
export interface CreateDataSourceFromRDSInput {
  DataSourceId: string;
  DataSourceName?: string;
  RDSData: RDSDataSpec;
  RoleARN: string;
  ComputeStatistics?: boolean;
}
export const CreateDataSourceFromRDSInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataSourceId: S.String,
    DataSourceName: S.optional(S.String),
    RDSData: RDSDataSpec,
    RoleARN: S.String,
    ComputeStatistics: S.optional(S.Boolean),
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
  identifier: "CreateDataSourceFromRDSInput",
}) as any as S.Schema<CreateDataSourceFromRDSInput>;
export interface CreateDataSourceFromRDSOutput {
  DataSourceId?: string;
}
export const CreateDataSourceFromRDSOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DataSourceId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "CreateDataSourceFromRDSOutput",
}) as any as S.Schema<CreateDataSourceFromRDSOutput>;
export type RedshiftDatabaseName = string;
export type RedshiftClusterIdentifier = string;
export interface RedshiftDatabase {
  DatabaseName: string;
  ClusterIdentifier: string;
}
export const RedshiftDatabase = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DatabaseName: S.String, ClusterIdentifier: S.String }),
).annotate({
  identifier: "RedshiftDatabase",
}) as any as S.Schema<RedshiftDatabase>;
export type RedshiftSelectSqlQuery = string;
export type RedshiftDatabaseUsername = string;
export type RedshiftDatabasePassword = string | redacted.Redacted<string>;
export interface RedshiftDatabaseCredentials {
  Username: string;
  Password: string | redacted.Redacted<string>;
}
export const RedshiftDatabaseCredentials = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Username: S.String, Password: SensitiveString }),
).annotate({
  identifier: "RedshiftDatabaseCredentials",
}) as any as S.Schema<RedshiftDatabaseCredentials>;
export interface RedshiftDataSpec {
  DatabaseInformation: RedshiftDatabase;
  SelectSqlQuery: string;
  DatabaseCredentials: RedshiftDatabaseCredentials;
  S3StagingLocation: string;
  DataRearrangement?: string;
  DataSchema?: string;
  DataSchemaUri?: string;
}
export const RedshiftDataSpec = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatabaseInformation: RedshiftDatabase,
    SelectSqlQuery: S.String,
    DatabaseCredentials: RedshiftDatabaseCredentials,
    S3StagingLocation: S.String,
    DataRearrangement: S.optional(S.String),
    DataSchema: S.optional(S.String),
    DataSchemaUri: S.optional(S.String),
  }),
).annotate({
  identifier: "RedshiftDataSpec",
}) as any as S.Schema<RedshiftDataSpec>;
export interface CreateDataSourceFromRedshiftInput {
  DataSourceId: string;
  DataSourceName?: string;
  DataSpec: RedshiftDataSpec;
  RoleARN: string;
  ComputeStatistics?: boolean;
}
export const CreateDataSourceFromRedshiftInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataSourceId: S.String,
    DataSourceName: S.optional(S.String),
    DataSpec: RedshiftDataSpec,
    RoleARN: S.String,
    ComputeStatistics: S.optional(S.Boolean),
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
  identifier: "CreateDataSourceFromRedshiftInput",
}) as any as S.Schema<CreateDataSourceFromRedshiftInput>;
export interface CreateDataSourceFromRedshiftOutput {
  DataSourceId?: string;
}
export const CreateDataSourceFromRedshiftOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DataSourceId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "CreateDataSourceFromRedshiftOutput",
}) as any as S.Schema<CreateDataSourceFromRedshiftOutput>;
export interface S3DataSpec {
  DataLocationS3: string;
  DataRearrangement?: string;
  DataSchema?: string;
  DataSchemaLocationS3?: string;
}
export const S3DataSpec = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataLocationS3: S.String,
    DataRearrangement: S.optional(S.String),
    DataSchema: S.optional(S.String),
    DataSchemaLocationS3: S.optional(S.String),
  }),
).annotate({ identifier: "S3DataSpec" }) as any as S.Schema<S3DataSpec>;
export interface CreateDataSourceFromS3Input {
  DataSourceId: string;
  DataSourceName?: string;
  DataSpec: S3DataSpec;
  ComputeStatistics?: boolean;
}
export const CreateDataSourceFromS3Input = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataSourceId: S.String,
    DataSourceName: S.optional(S.String),
    DataSpec: S3DataSpec,
    ComputeStatistics: S.optional(S.Boolean),
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
  identifier: "CreateDataSourceFromS3Input",
}) as any as S.Schema<CreateDataSourceFromS3Input>;
export interface CreateDataSourceFromS3Output {
  DataSourceId?: string;
}
export const CreateDataSourceFromS3Output = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DataSourceId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "CreateDataSourceFromS3Output",
}) as any as S.Schema<CreateDataSourceFromS3Output>;
export interface CreateEvaluationInput {
  EvaluationId: string;
  EvaluationName?: string;
  MLModelId: string;
  EvaluationDataSourceId: string;
}
export const CreateEvaluationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EvaluationId: S.String,
    EvaluationName: S.optional(S.String),
    MLModelId: S.String,
    EvaluationDataSourceId: S.String,
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
  identifier: "CreateEvaluationInput",
}) as any as S.Schema<CreateEvaluationInput>;
export interface CreateEvaluationOutput {
  EvaluationId?: string;
}
export const CreateEvaluationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EvaluationId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "CreateEvaluationOutput",
}) as any as S.Schema<CreateEvaluationOutput>;
export type MLModelType =
  | "REGRESSION"
  | "BINARY"
  | "MULTICLASS"
  | (string & {});
export const MLModelType = S.String;

export type StringType = string;
export type TrainingParameters = { [key: string]: string | undefined };
export const TrainingParameters = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type Recipe = string;
export interface CreateMLModelInput {
  MLModelId: string;
  MLModelName?: string;
  MLModelType: MLModelType;
  Parameters?: { [key: string]: string | undefined };
  TrainingDataSourceId: string;
  Recipe?: string;
  RecipeUri?: string;
}
export const CreateMLModelInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MLModelId: S.String,
    MLModelName: S.optional(S.String),
    MLModelType: MLModelType,
    Parameters: S.optional(TrainingParameters),
    TrainingDataSourceId: S.String,
    Recipe: S.optional(S.String),
    RecipeUri: S.optional(S.String),
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
  identifier: "CreateMLModelInput",
}) as any as S.Schema<CreateMLModelInput>;
export interface CreateMLModelOutput {
  MLModelId?: string;
}
export const CreateMLModelOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MLModelId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "CreateMLModelOutput",
}) as any as S.Schema<CreateMLModelOutput>;
export interface CreateRealtimeEndpointInput {
  MLModelId: string;
}
export const CreateRealtimeEndpointInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MLModelId: S.String }).pipe(
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
  identifier: "CreateRealtimeEndpointInput",
}) as any as S.Schema<CreateRealtimeEndpointInput>;
export type IntegerType = number;
export type EpochTime = Date;
export type VipURL = string;
export type RealtimeEndpointStatus =
  | "NONE"
  | "READY"
  | "UPDATING"
  | "FAILED"
  | (string & {});
export const RealtimeEndpointStatus = S.String;

export interface RealtimeEndpointInfo {
  PeakRequestsPerSecond?: number;
  CreatedAt?: Date;
  EndpointUrl?: string;
  EndpointStatus?: RealtimeEndpointStatus;
}
export const RealtimeEndpointInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PeakRequestsPerSecond: S.optional(S.Number),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndpointUrl: S.optional(S.String),
    EndpointStatus: S.optional(RealtimeEndpointStatus),
  }),
).annotate({
  identifier: "RealtimeEndpointInfo",
}) as any as S.Schema<RealtimeEndpointInfo>;
export interface CreateRealtimeEndpointOutput {
  MLModelId?: string;
  RealtimeEndpointInfo?: RealtimeEndpointInfo;
}
export const CreateRealtimeEndpointOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MLModelId: S.optional(S.String),
    RealtimeEndpointInfo: S.optional(RealtimeEndpointInfo),
  }).pipe(ns),
).annotate({
  identifier: "CreateRealtimeEndpointOutput",
}) as any as S.Schema<CreateRealtimeEndpointOutput>;
export interface DeleteBatchPredictionInput {
  BatchPredictionId: string;
}
export const DeleteBatchPredictionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BatchPredictionId: S.String }).pipe(
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
  identifier: "DeleteBatchPredictionInput",
}) as any as S.Schema<DeleteBatchPredictionInput>;
export interface DeleteBatchPredictionOutput {
  BatchPredictionId?: string;
}
export const DeleteBatchPredictionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BatchPredictionId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "DeleteBatchPredictionOutput",
}) as any as S.Schema<DeleteBatchPredictionOutput>;
export interface DeleteDataSourceInput {
  DataSourceId: string;
}
export const DeleteDataSourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DataSourceId: S.String }).pipe(
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
  identifier: "DeleteDataSourceInput",
}) as any as S.Schema<DeleteDataSourceInput>;
export interface DeleteDataSourceOutput {
  DataSourceId?: string;
}
export const DeleteDataSourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DataSourceId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "DeleteDataSourceOutput",
}) as any as S.Schema<DeleteDataSourceOutput>;
export interface DeleteEvaluationInput {
  EvaluationId: string;
}
export const DeleteEvaluationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EvaluationId: S.String }).pipe(
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
  identifier: "DeleteEvaluationInput",
}) as any as S.Schema<DeleteEvaluationInput>;
export interface DeleteEvaluationOutput {
  EvaluationId?: string;
}
export const DeleteEvaluationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EvaluationId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "DeleteEvaluationOutput",
}) as any as S.Schema<DeleteEvaluationOutput>;
export interface DeleteMLModelInput {
  MLModelId: string;
}
export const DeleteMLModelInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MLModelId: S.String }).pipe(
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
  identifier: "DeleteMLModelInput",
}) as any as S.Schema<DeleteMLModelInput>;
export interface DeleteMLModelOutput {
  MLModelId?: string;
}
export const DeleteMLModelOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MLModelId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "DeleteMLModelOutput",
}) as any as S.Schema<DeleteMLModelOutput>;
export interface DeleteRealtimeEndpointInput {
  MLModelId: string;
}
export const DeleteRealtimeEndpointInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MLModelId: S.String }).pipe(
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
  identifier: "DeleteRealtimeEndpointInput",
}) as any as S.Schema<DeleteRealtimeEndpointInput>;
export interface DeleteRealtimeEndpointOutput {
  MLModelId?: string;
  RealtimeEndpointInfo?: RealtimeEndpointInfo;
}
export const DeleteRealtimeEndpointOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MLModelId: S.optional(S.String),
    RealtimeEndpointInfo: S.optional(RealtimeEndpointInfo),
  }).pipe(ns),
).annotate({
  identifier: "DeleteRealtimeEndpointOutput",
}) as any as S.Schema<DeleteRealtimeEndpointOutput>;
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface DeleteTagsInput {
  TagKeys: string[];
  ResourceId: string;
  ResourceType: TaggableResourceType;
}
export const DeleteTagsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TagKeys: TagKeyList,
    ResourceId: S.String,
    ResourceType: TaggableResourceType,
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
  identifier: "DeleteTagsInput",
}) as any as S.Schema<DeleteTagsInput>;
export interface DeleteTagsOutput {
  ResourceId?: string;
  ResourceType?: TaggableResourceType;
}
export const DeleteTagsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceId: S.optional(S.String),
    ResourceType: S.optional(TaggableResourceType),
  }).pipe(ns),
).annotate({
  identifier: "DeleteTagsOutput",
}) as any as S.Schema<DeleteTagsOutput>;
export type BatchPredictionFilterVariable =
  | "CreatedAt"
  | "LastUpdatedAt"
  | "Status"
  | "Name"
  | "IAMUser"
  | "MLModelId"
  | "DataSourceId"
  | "DataURI"
  | (string & {});
export const BatchPredictionFilterVariable = S.String;

export type ComparatorValue = string;
export type SortOrder = "asc" | "dsc" | (string & {});
export const SortOrder = S.String;

export type PageLimit = number;
export interface DescribeBatchPredictionsInput {
  FilterVariable?: BatchPredictionFilterVariable;
  EQ?: string;
  GT?: string;
  LT?: string;
  GE?: string;
  LE?: string;
  NE?: string;
  Prefix?: string;
  SortOrder?: SortOrder;
  NextToken?: string;
  Limit?: number;
}
export const DescribeBatchPredictionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FilterVariable: S.optional(BatchPredictionFilterVariable),
    EQ: S.optional(S.String),
    GT: S.optional(S.String),
    LT: S.optional(S.String),
    GE: S.optional(S.String),
    LE: S.optional(S.String),
    NE: S.optional(S.String),
    Prefix: S.optional(S.String),
    SortOrder: S.optional(SortOrder),
    NextToken: S.optional(S.String),
    Limit: S.optional(S.Number),
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
  identifier: "DescribeBatchPredictionsInput",
}) as any as S.Schema<DescribeBatchPredictionsInput>;
export type AwsUserArn = string;
export type EntityStatus =
  | "PENDING"
  | "INPROGRESS"
  | "FAILED"
  | "COMPLETED"
  | "DELETED"
  | (string & {});
export const EntityStatus = S.String;

export type Message = string;
export type LongType = number;
export interface BatchPrediction {
  BatchPredictionId?: string;
  MLModelId?: string;
  BatchPredictionDataSourceId?: string;
  InputDataLocationS3?: string;
  CreatedByIamUser?: string;
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  Name?: string;
  Status?: EntityStatus;
  OutputUri?: string;
  Message?: string;
  ComputeTime?: number;
  FinishedAt?: Date;
  StartedAt?: Date;
  TotalRecordCount?: number;
  InvalidRecordCount?: number;
}
export const BatchPrediction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BatchPredictionId: S.optional(S.String),
    MLModelId: S.optional(S.String),
    BatchPredictionDataSourceId: S.optional(S.String),
    InputDataLocationS3: S.optional(S.String),
    CreatedByIamUser: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Name: S.optional(S.String),
    Status: S.optional(EntityStatus),
    OutputUri: S.optional(S.String),
    Message: S.optional(S.String),
    ComputeTime: S.optional(S.Number),
    FinishedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    StartedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    TotalRecordCount: S.optional(S.Number),
    InvalidRecordCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "BatchPrediction",
}) as any as S.Schema<BatchPrediction>;
export type BatchPredictions = BatchPrediction[];
export const BatchPredictions = /*@__PURE__*/ S.Array(BatchPrediction);
export interface DescribeBatchPredictionsOutput {
  Results?: BatchPrediction[];
  NextToken?: string;
}
export const DescribeBatchPredictionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Results: S.optional(BatchPredictions),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeBatchPredictionsOutput",
}) as any as S.Schema<DescribeBatchPredictionsOutput>;
export type DataSourceFilterVariable =
  | "CreatedAt"
  | "LastUpdatedAt"
  | "Status"
  | "Name"
  | "DataLocationS3"
  | "IAMUser"
  | (string & {});
export const DataSourceFilterVariable = S.String;

export interface DescribeDataSourcesInput {
  FilterVariable?: DataSourceFilterVariable;
  EQ?: string;
  GT?: string;
  LT?: string;
  GE?: string;
  LE?: string;
  NE?: string;
  Prefix?: string;
  SortOrder?: SortOrder;
  NextToken?: string;
  Limit?: number;
}
export const DescribeDataSourcesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FilterVariable: S.optional(DataSourceFilterVariable),
    EQ: S.optional(S.String),
    GT: S.optional(S.String),
    LT: S.optional(S.String),
    GE: S.optional(S.String),
    LE: S.optional(S.String),
    NE: S.optional(S.String),
    Prefix: S.optional(S.String),
    SortOrder: S.optional(SortOrder),
    NextToken: S.optional(S.String),
    Limit: S.optional(S.Number),
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
  identifier: "DescribeDataSourcesInput",
}) as any as S.Schema<DescribeDataSourcesInput>;
export interface RedshiftMetadata {
  RedshiftDatabase?: RedshiftDatabase;
  DatabaseUserName?: string;
  SelectSqlQuery?: string;
}
export const RedshiftMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RedshiftDatabase: S.optional(RedshiftDatabase),
    DatabaseUserName: S.optional(S.String),
    SelectSqlQuery: S.optional(S.String),
  }),
).annotate({
  identifier: "RedshiftMetadata",
}) as any as S.Schema<RedshiftMetadata>;
export type EDPPipelineId = string;
export interface RDSMetadata {
  Database?: RDSDatabase;
  DatabaseUserName?: string;
  SelectSqlQuery?: string;
  ResourceRole?: string;
  ServiceRole?: string;
  DataPipelineId?: string;
}
export const RDSMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Database: S.optional(RDSDatabase),
    DatabaseUserName: S.optional(S.String),
    SelectSqlQuery: S.optional(S.String),
    ResourceRole: S.optional(S.String),
    ServiceRole: S.optional(S.String),
    DataPipelineId: S.optional(S.String),
  }),
).annotate({ identifier: "RDSMetadata" }) as any as S.Schema<RDSMetadata>;
export interface DataSource {
  DataSourceId?: string;
  DataLocationS3?: string;
  DataRearrangement?: string;
  CreatedByIamUser?: string;
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  DataSizeInBytes?: number;
  NumberOfFiles?: number;
  Name?: string;
  Status?: EntityStatus;
  Message?: string;
  RedshiftMetadata?: RedshiftMetadata;
  RDSMetadata?: RDSMetadata;
  RoleARN?: string;
  ComputeStatistics?: boolean;
  ComputeTime?: number;
  FinishedAt?: Date;
  StartedAt?: Date;
}
export const DataSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataSourceId: S.optional(S.String),
    DataLocationS3: S.optional(S.String),
    DataRearrangement: S.optional(S.String),
    CreatedByIamUser: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DataSizeInBytes: S.optional(S.Number),
    NumberOfFiles: S.optional(S.Number),
    Name: S.optional(S.String),
    Status: S.optional(EntityStatus),
    Message: S.optional(S.String),
    RedshiftMetadata: S.optional(RedshiftMetadata),
    RDSMetadata: S.optional(RDSMetadata),
    RoleARN: S.optional(S.String),
    ComputeStatistics: S.optional(S.Boolean),
    ComputeTime: S.optional(S.Number),
    FinishedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    StartedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "DataSource" }) as any as S.Schema<DataSource>;
export type DataSources = DataSource[];
export const DataSources = /*@__PURE__*/ S.Array(DataSource);
export interface DescribeDataSourcesOutput {
  Results?: DataSource[];
  NextToken?: string;
}
export const DescribeDataSourcesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Results: S.optional(DataSources),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeDataSourcesOutput",
}) as any as S.Schema<DescribeDataSourcesOutput>;
export type EvaluationFilterVariable =
  | "CreatedAt"
  | "LastUpdatedAt"
  | "Status"
  | "Name"
  | "IAMUser"
  | "MLModelId"
  | "DataSourceId"
  | "DataURI"
  | (string & {});
export const EvaluationFilterVariable = S.String;

export interface DescribeEvaluationsInput {
  FilterVariable?: EvaluationFilterVariable;
  EQ?: string;
  GT?: string;
  LT?: string;
  GE?: string;
  LE?: string;
  NE?: string;
  Prefix?: string;
  SortOrder?: SortOrder;
  NextToken?: string;
  Limit?: number;
}
export const DescribeEvaluationsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FilterVariable: S.optional(EvaluationFilterVariable),
    EQ: S.optional(S.String),
    GT: S.optional(S.String),
    LT: S.optional(S.String),
    GE: S.optional(S.String),
    LE: S.optional(S.String),
    NE: S.optional(S.String),
    Prefix: S.optional(S.String),
    SortOrder: S.optional(SortOrder),
    NextToken: S.optional(S.String),
    Limit: S.optional(S.Number),
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
  identifier: "DescribeEvaluationsInput",
}) as any as S.Schema<DescribeEvaluationsInput>;
export type PerformanceMetricsPropertyKey = string;
export type PerformanceMetricsPropertyValue = string;
export type PerformanceMetricsProperties = {
  [key: string]: string | undefined;
};
export const PerformanceMetricsProperties = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface PerformanceMetrics {
  Properties?: { [key: string]: string | undefined };
}
export const PerformanceMetrics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Properties: S.optional(PerformanceMetricsProperties) }),
).annotate({
  identifier: "PerformanceMetrics",
}) as any as S.Schema<PerformanceMetrics>;
export interface Evaluation {
  EvaluationId?: string;
  MLModelId?: string;
  EvaluationDataSourceId?: string;
  InputDataLocationS3?: string;
  CreatedByIamUser?: string;
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  Name?: string;
  Status?: EntityStatus;
  PerformanceMetrics?: PerformanceMetrics;
  Message?: string;
  ComputeTime?: number;
  FinishedAt?: Date;
  StartedAt?: Date;
}
export const Evaluation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EvaluationId: S.optional(S.String),
    MLModelId: S.optional(S.String),
    EvaluationDataSourceId: S.optional(S.String),
    InputDataLocationS3: S.optional(S.String),
    CreatedByIamUser: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Name: S.optional(S.String),
    Status: S.optional(EntityStatus),
    PerformanceMetrics: S.optional(PerformanceMetrics),
    Message: S.optional(S.String),
    ComputeTime: S.optional(S.Number),
    FinishedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    StartedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "Evaluation" }) as any as S.Schema<Evaluation>;
export type Evaluations = Evaluation[];
export const Evaluations = /*@__PURE__*/ S.Array(Evaluation);
export interface DescribeEvaluationsOutput {
  Results?: Evaluation[];
  NextToken?: string;
}
export const DescribeEvaluationsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Results: S.optional(Evaluations),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeEvaluationsOutput",
}) as any as S.Schema<DescribeEvaluationsOutput>;
export type MLModelFilterVariable =
  | "CreatedAt"
  | "LastUpdatedAt"
  | "Status"
  | "Name"
  | "IAMUser"
  | "TrainingDataSourceId"
  | "RealtimeEndpointStatus"
  | "MLModelType"
  | "Algorithm"
  | "TrainingDataURI"
  | (string & {});
export const MLModelFilterVariable = S.String;

export interface DescribeMLModelsInput {
  FilterVariable?: MLModelFilterVariable;
  EQ?: string;
  GT?: string;
  LT?: string;
  GE?: string;
  LE?: string;
  NE?: string;
  Prefix?: string;
  SortOrder?: SortOrder;
  NextToken?: string;
  Limit?: number;
}
export const DescribeMLModelsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FilterVariable: S.optional(MLModelFilterVariable),
    EQ: S.optional(S.String),
    GT: S.optional(S.String),
    LT: S.optional(S.String),
    GE: S.optional(S.String),
    LE: S.optional(S.String),
    NE: S.optional(S.String),
    Prefix: S.optional(S.String),
    SortOrder: S.optional(SortOrder),
    NextToken: S.optional(S.String),
    Limit: S.optional(S.Number),
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
  identifier: "DescribeMLModelsInput",
}) as any as S.Schema<DescribeMLModelsInput>;
export type MLModelName = string;
export type Algorithm = "sgd" | (string & {});
export const Algorithm = S.String;

export type ScoreThreshold = number;
export interface MLModel {
  MLModelId?: string;
  TrainingDataSourceId?: string;
  CreatedByIamUser?: string;
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  Name?: string;
  Status?: EntityStatus;
  SizeInBytes?: number;
  EndpointInfo?: RealtimeEndpointInfo;
  TrainingParameters?: { [key: string]: string | undefined };
  InputDataLocationS3?: string;
  Algorithm?: Algorithm;
  MLModelType?: MLModelType;
  ScoreThreshold?: number;
  ScoreThresholdLastUpdatedAt?: Date;
  Message?: string;
  ComputeTime?: number;
  FinishedAt?: Date;
  StartedAt?: Date;
}
export const MLModel = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MLModelId: S.optional(S.String),
    TrainingDataSourceId: S.optional(S.String),
    CreatedByIamUser: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Name: S.optional(S.String),
    Status: S.optional(EntityStatus),
    SizeInBytes: S.optional(S.Number),
    EndpointInfo: S.optional(RealtimeEndpointInfo),
    TrainingParameters: S.optional(TrainingParameters),
    InputDataLocationS3: S.optional(S.String),
    Algorithm: S.optional(Algorithm),
    MLModelType: S.optional(MLModelType),
    ScoreThreshold: S.optional(S.Number),
    ScoreThresholdLastUpdatedAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Message: S.optional(S.String),
    ComputeTime: S.optional(S.Number),
    FinishedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    StartedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "MLModel" }) as any as S.Schema<MLModel>;
export type MLModels = MLModel[];
export const MLModels = /*@__PURE__*/ S.Array(MLModel);
export interface DescribeMLModelsOutput {
  Results?: MLModel[];
  NextToken?: string;
}
export const DescribeMLModelsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Results: S.optional(MLModels),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeMLModelsOutput",
}) as any as S.Schema<DescribeMLModelsOutput>;
export interface DescribeTagsInput {
  ResourceId: string;
  ResourceType: TaggableResourceType;
}
export const DescribeTagsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceId: S.String, ResourceType: TaggableResourceType }).pipe(
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
  identifier: "DescribeTagsInput",
}) as any as S.Schema<DescribeTagsInput>;
export interface DescribeTagsOutput {
  ResourceId?: string;
  ResourceType?: TaggableResourceType;
  Tags?: Tag[];
}
export const DescribeTagsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceId: S.optional(S.String),
    ResourceType: S.optional(TaggableResourceType),
    Tags: S.optional(TagList),
  }).pipe(ns),
).annotate({
  identifier: "DescribeTagsOutput",
}) as any as S.Schema<DescribeTagsOutput>;
export interface GetBatchPredictionInput {
  BatchPredictionId: string;
}
export const GetBatchPredictionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BatchPredictionId: S.String }).pipe(
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
  identifier: "GetBatchPredictionInput",
}) as any as S.Schema<GetBatchPredictionInput>;
export type PresignedS3Url = string;
export interface GetBatchPredictionOutput {
  BatchPredictionId?: string;
  MLModelId?: string;
  BatchPredictionDataSourceId?: string;
  InputDataLocationS3?: string;
  CreatedByIamUser?: string;
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  Name?: string;
  Status?: EntityStatus;
  OutputUri?: string;
  LogUri?: string;
  Message?: string;
  ComputeTime?: number;
  FinishedAt?: Date;
  StartedAt?: Date;
  TotalRecordCount?: number;
  InvalidRecordCount?: number;
}
export const GetBatchPredictionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BatchPredictionId: S.optional(S.String),
    MLModelId: S.optional(S.String),
    BatchPredictionDataSourceId: S.optional(S.String),
    InputDataLocationS3: S.optional(S.String),
    CreatedByIamUser: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Name: S.optional(S.String),
    Status: S.optional(EntityStatus),
    OutputUri: S.optional(S.String),
    LogUri: S.optional(S.String),
    Message: S.optional(S.String),
    ComputeTime: S.optional(S.Number),
    FinishedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    StartedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    TotalRecordCount: S.optional(S.Number),
    InvalidRecordCount: S.optional(S.Number),
  }).pipe(ns),
).annotate({
  identifier: "GetBatchPredictionOutput",
}) as any as S.Schema<GetBatchPredictionOutput>;
export type Verbose = boolean;
export interface GetDataSourceInput {
  DataSourceId: string;
  Verbose?: boolean;
}
export const GetDataSourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DataSourceId: S.String, Verbose: S.optional(S.Boolean) }).pipe(
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
  identifier: "GetDataSourceInput",
}) as any as S.Schema<GetDataSourceInput>;
export interface GetDataSourceOutput {
  DataSourceId?: string;
  DataLocationS3?: string;
  DataRearrangement?: string;
  CreatedByIamUser?: string;
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  DataSizeInBytes?: number;
  NumberOfFiles?: number;
  Name?: string;
  Status?: EntityStatus;
  LogUri?: string;
  Message?: string;
  RedshiftMetadata?: RedshiftMetadata;
  RDSMetadata?: RDSMetadata;
  RoleARN?: string;
  ComputeStatistics?: boolean;
  ComputeTime?: number;
  FinishedAt?: Date;
  StartedAt?: Date;
  DataSourceSchema?: string;
}
export const GetDataSourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataSourceId: S.optional(S.String),
    DataLocationS3: S.optional(S.String),
    DataRearrangement: S.optional(S.String),
    CreatedByIamUser: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DataSizeInBytes: S.optional(S.Number),
    NumberOfFiles: S.optional(S.Number),
    Name: S.optional(S.String),
    Status: S.optional(EntityStatus),
    LogUri: S.optional(S.String),
    Message: S.optional(S.String),
    RedshiftMetadata: S.optional(RedshiftMetadata),
    RDSMetadata: S.optional(RDSMetadata),
    RoleARN: S.optional(S.String),
    ComputeStatistics: S.optional(S.Boolean),
    ComputeTime: S.optional(S.Number),
    FinishedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    StartedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DataSourceSchema: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetDataSourceOutput",
}) as any as S.Schema<GetDataSourceOutput>;
export interface GetEvaluationInput {
  EvaluationId: string;
}
export const GetEvaluationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EvaluationId: S.String }).pipe(
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
  identifier: "GetEvaluationInput",
}) as any as S.Schema<GetEvaluationInput>;
export interface GetEvaluationOutput {
  EvaluationId?: string;
  MLModelId?: string;
  EvaluationDataSourceId?: string;
  InputDataLocationS3?: string;
  CreatedByIamUser?: string;
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  Name?: string;
  Status?: EntityStatus;
  PerformanceMetrics?: PerformanceMetrics;
  LogUri?: string;
  Message?: string;
  ComputeTime?: number;
  FinishedAt?: Date;
  StartedAt?: Date;
}
export const GetEvaluationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EvaluationId: S.optional(S.String),
    MLModelId: S.optional(S.String),
    EvaluationDataSourceId: S.optional(S.String),
    InputDataLocationS3: S.optional(S.String),
    CreatedByIamUser: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Name: S.optional(S.String),
    Status: S.optional(EntityStatus),
    PerformanceMetrics: S.optional(PerformanceMetrics),
    LogUri: S.optional(S.String),
    Message: S.optional(S.String),
    ComputeTime: S.optional(S.Number),
    FinishedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    StartedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }).pipe(ns),
).annotate({
  identifier: "GetEvaluationOutput",
}) as any as S.Schema<GetEvaluationOutput>;
export interface GetMLModelInput {
  MLModelId: string;
  Verbose?: boolean;
}
export const GetMLModelInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MLModelId: S.String, Verbose: S.optional(S.Boolean) }).pipe(
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
  identifier: "GetMLModelInput",
}) as any as S.Schema<GetMLModelInput>;
export interface GetMLModelOutput {
  MLModelId?: string;
  TrainingDataSourceId?: string;
  CreatedByIamUser?: string;
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  Name?: string;
  Status?: EntityStatus;
  SizeInBytes?: number;
  EndpointInfo?: RealtimeEndpointInfo;
  TrainingParameters?: { [key: string]: string | undefined };
  InputDataLocationS3?: string;
  MLModelType?: MLModelType;
  ScoreThreshold?: number;
  ScoreThresholdLastUpdatedAt?: Date;
  LogUri?: string;
  Message?: string;
  ComputeTime?: number;
  FinishedAt?: Date;
  StartedAt?: Date;
  Recipe?: string;
  Schema?: string;
}
export const GetMLModelOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MLModelId: S.optional(S.String),
    TrainingDataSourceId: S.optional(S.String),
    CreatedByIamUser: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Name: S.optional(S.String),
    Status: S.optional(EntityStatus),
    SizeInBytes: S.optional(S.Number),
    EndpointInfo: S.optional(RealtimeEndpointInfo),
    TrainingParameters: S.optional(TrainingParameters),
    InputDataLocationS3: S.optional(S.String),
    MLModelType: S.optional(MLModelType),
    ScoreThreshold: S.optional(S.Number),
    ScoreThresholdLastUpdatedAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LogUri: S.optional(S.String),
    Message: S.optional(S.String),
    ComputeTime: S.optional(S.Number),
    FinishedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    StartedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Recipe: S.optional(S.String),
    Schema: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetMLModelOutput",
}) as any as S.Schema<GetMLModelOutput>;
export type VariableName = string;
export type VariableValue = string;
export type Record = { [key: string]: string | undefined };
export const Record = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface PredictInput {
  MLModelId: string;
  Record: { [key: string]: string | undefined };
  PredictEndpoint: string;
}
export const PredictInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MLModelId: S.String,
    Record: Record,
    PredictEndpoint: S.String,
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
).annotate({ identifier: "PredictInput" }) as any as S.Schema<PredictInput>;
export type Label = string;
export type FloatLabel = number;
export type ScoreValue = number;
export type ScoreValuePerLabelMap = { [key: string]: number | undefined };
export const ScoreValuePerLabelMap = /*@__PURE__*/ S.Record(
  S.String,
  S.Number.pipe(S.optional),
);
export type DetailsAttributes =
  | "PredictiveModelType"
  | "Algorithm"
  | (string & {});
export const DetailsAttributes = S.String;

export type DetailsValue = string;
export type DetailsMap = { [key in DetailsAttributes]?: string };
export const DetailsMap = /*@__PURE__*/ S.Record(
  DetailsAttributes,
  S.String.pipe(S.optional),
);
export interface Prediction {
  predictedLabel?: string;
  predictedValue?: number;
  predictedScores?: { [key: string]: number | undefined };
  details?: { [key: string]: string | undefined };
}
export const Prediction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    predictedLabel: S.optional(S.String),
    predictedValue: S.optional(S.Number),
    predictedScores: S.optional(ScoreValuePerLabelMap),
    details: S.optional(DetailsMap),
  }),
).annotate({ identifier: "Prediction" }) as any as S.Schema<Prediction>;
export interface PredictOutput {
  Prediction?: Prediction;
}
export const PredictOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Prediction: S.optional(Prediction) }).pipe(ns),
).annotate({ identifier: "PredictOutput" }) as any as S.Schema<PredictOutput>;
export interface UpdateBatchPredictionInput {
  BatchPredictionId: string;
  BatchPredictionName: string;
}
export const UpdateBatchPredictionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BatchPredictionId: S.String, BatchPredictionName: S.String }).pipe(
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
  identifier: "UpdateBatchPredictionInput",
}) as any as S.Schema<UpdateBatchPredictionInput>;
export interface UpdateBatchPredictionOutput {
  BatchPredictionId?: string;
}
export const UpdateBatchPredictionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BatchPredictionId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "UpdateBatchPredictionOutput",
}) as any as S.Schema<UpdateBatchPredictionOutput>;
export interface UpdateDataSourceInput {
  DataSourceId: string;
  DataSourceName: string;
}
export const UpdateDataSourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DataSourceId: S.String, DataSourceName: S.String }).pipe(
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
  identifier: "UpdateDataSourceInput",
}) as any as S.Schema<UpdateDataSourceInput>;
export interface UpdateDataSourceOutput {
  DataSourceId?: string;
}
export const UpdateDataSourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DataSourceId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "UpdateDataSourceOutput",
}) as any as S.Schema<UpdateDataSourceOutput>;
export interface UpdateEvaluationInput {
  EvaluationId: string;
  EvaluationName: string;
}
export const UpdateEvaluationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EvaluationId: S.String, EvaluationName: S.String }).pipe(
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
  identifier: "UpdateEvaluationInput",
}) as any as S.Schema<UpdateEvaluationInput>;
export interface UpdateEvaluationOutput {
  EvaluationId?: string;
}
export const UpdateEvaluationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EvaluationId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "UpdateEvaluationOutput",
}) as any as S.Schema<UpdateEvaluationOutput>;
export interface UpdateMLModelInput {
  MLModelId: string;
  MLModelName?: string;
  ScoreThreshold?: number;
}
export const UpdateMLModelInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MLModelId: S.String,
    MLModelName: S.optional(S.String),
    ScoreThreshold: S.optional(S.Number),
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
  identifier: "UpdateMLModelInput",
}) as any as S.Schema<UpdateMLModelInput>;
export interface UpdateMLModelOutput {
  MLModelId?: string;
}
export const UpdateMLModelOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MLModelId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "UpdateMLModelOutput",
}) as any as S.Schema<UpdateMLModelOutput>;
export type ErrorMessage = string;
export type ErrorCode = number;
export type AddTagsError =
  | InternalServerException
  | InvalidInputException
  | InvalidTagException
  | ResourceNotFoundException
  | TagLimitExceededException
  | CommonErrors;
/**
 * Adds one or more tags to an object, up to a limit of 10. Each tag consists of a key
 * and an optional value. If you add a tag using a key that is already associated with the ML object,
 * `AddTags` updates the tag's value.
 */
export const addTags: API.OperationMethod<
  AddTagsInput,
  AddTagsOutput,
  AddTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AddTagsInput,
  output: AddTagsOutput,
  errors: [
    InternalServerException,
    InvalidInputException,
    InvalidTagException,
    ResourceNotFoundException,
    TagLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddTags",
}));

export type CreateBatchPredictionError =
  | IdempotentParameterMismatchException
  | InternalServerException
  | InvalidInputException
  | CommonErrors;
/**
 * Generates predictions for a group of observations. The observations to process exist in one or more data files referenced
 * by a `DataSource`. This operation creates a new `BatchPrediction`, and uses an `MLModel` and the data
 * files referenced by the `DataSource` as information sources.
 *
 * `CreateBatchPrediction` is an asynchronous operation. In response to `CreateBatchPrediction`,
 * Amazon Machine Learning (Amazon ML) immediately returns and sets the `BatchPrediction` status to `PENDING`.
 * After the `BatchPrediction` completes, Amazon ML sets the status to `COMPLETED`.
 *
 * You can poll for status updates by using the GetBatchPrediction operation and checking the `Status` parameter of the result. After the `COMPLETED` status appears,
 * the results are available in the location specified by the `OutputUri` parameter.
 */
export const createBatchPrediction: API.OperationMethod<
  CreateBatchPredictionInput,
  CreateBatchPredictionOutput,
  CreateBatchPredictionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateBatchPredictionInput,
  output: CreateBatchPredictionOutput,
  errors: [
    IdempotentParameterMismatchException,
    InternalServerException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBatchPrediction",
}));

export type CreateDataSourceFromRDSError =
  | IdempotentParameterMismatchException
  | InternalServerException
  | InvalidInputException
  | CommonErrors;
/**
 * Creates a `DataSource` object from an Amazon Relational Database Service (Amazon RDS). A `DataSource` references data that can be used to perform `CreateMLModel`, `CreateEvaluation`, or `CreateBatchPrediction` operations.
 *
 * `CreateDataSourceFromRDS` is an asynchronous operation. In response to `CreateDataSourceFromRDS`,
 * Amazon Machine Learning (Amazon ML) immediately returns and sets the `DataSource` status to `PENDING`.
 * After the `DataSource` is created and ready for use, Amazon ML sets the `Status` parameter to `COMPLETED`.
 * `DataSource` in the `COMPLETED` or `PENDING` state can
 * be used only to perform `>CreateMLModel`>, `CreateEvaluation`, or `CreateBatchPrediction` operations.
 *
 * If Amazon ML cannot accept the input source, it sets the `Status` parameter to `FAILED` and includes an error message in the `Message` attribute of the `GetDataSource` operation response.
 */
export const createDataSourceFromRDS: API.OperationMethod<
  CreateDataSourceFromRDSInput,
  CreateDataSourceFromRDSOutput,
  CreateDataSourceFromRDSError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDataSourceFromRDSInput,
  output: CreateDataSourceFromRDSOutput,
  errors: [
    IdempotentParameterMismatchException,
    InternalServerException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataSourceFromRDS",
}));

export type CreateDataSourceFromRedshiftError =
  | IdempotentParameterMismatchException
  | InternalServerException
  | InvalidInputException
  | CommonErrors;
/**
 * Creates a `DataSource` from a database hosted on an Amazon Redshift cluster. A
 * `DataSource` references data that can be used to perform either `CreateMLModel`, `CreateEvaluation`, or `CreateBatchPrediction`
 * operations.
 *
 * `CreateDataSourceFromRedshift` is an asynchronous operation. In response to `CreateDataSourceFromRedshift`, Amazon Machine Learning (Amazon ML) immediately returns and sets the `DataSource` status to `PENDING`.
 * After the `DataSource` is created and ready for use, Amazon ML sets the `Status` parameter to `COMPLETED`.
 * `DataSource` in `COMPLETED` or `PENDING` states can be
 * used to perform only `CreateMLModel`, `CreateEvaluation`, or `CreateBatchPrediction` operations.
 *
 * If Amazon ML can't accept the input source, it sets the `Status` parameter to `FAILED` and includes an error message in the `Message`
 * attribute of the `GetDataSource` operation response.
 *
 * The observations should be contained in the database hosted on an Amazon Redshift cluster
 * and should be specified by a `SelectSqlQuery` query. Amazon ML executes an
 * `Unload` command in Amazon Redshift to transfer the result set of
 * the `SelectSqlQuery` query to `S3StagingLocation`.
 *
 * After the `DataSource` has been created, it's ready for use in evaluations and
 * batch predictions. If you plan to use the `DataSource` to train an
 * `MLModel`, the `DataSource` also requires a recipe. A recipe
 * describes how each input variable will be used in training an `MLModel`. Will
 * the variable be included or excluded from training? Will the variable be manipulated;
 * for example, will it be combined with another variable or will it be split apart into
 * word combinations? The recipe provides answers to these questions.
 *
 * You can't change an existing datasource, but you can copy and modify the settings from an
 * existing Amazon Redshift datasource to create a new datasource. To do so, call
 * `GetDataSource` for an existing datasource and copy the values to a
 * `CreateDataSource` call. Change the settings that you want to change and
 * make sure that all required fields have the appropriate values.
 */
export const createDataSourceFromRedshift: API.OperationMethod<
  CreateDataSourceFromRedshiftInput,
  CreateDataSourceFromRedshiftOutput,
  CreateDataSourceFromRedshiftError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDataSourceFromRedshiftInput,
  output: CreateDataSourceFromRedshiftOutput,
  errors: [
    IdempotentParameterMismatchException,
    InternalServerException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataSourceFromRedshift",
}));

export type CreateDataSourceFromS3Error =
  | IdempotentParameterMismatchException
  | InternalServerException
  | InvalidInputException
  | CommonErrors;
/**
 * Creates a `DataSource` object. A `DataSource` references data that
 * can be used to perform `CreateMLModel`, `CreateEvaluation`, or
 * `CreateBatchPrediction` operations.
 *
 * `CreateDataSourceFromS3` is an asynchronous operation. In response to
 * `CreateDataSourceFromS3`, Amazon Machine Learning (Amazon ML) immediately
 * returns and sets the `DataSource` status to `PENDING`. After the
 * `DataSource` has been created and is ready for use, Amazon ML sets the
 * `Status` parameter to `COMPLETED`. `DataSource` in
 * the `COMPLETED` or `PENDING` state can be used to perform only
 * `CreateMLModel`, `CreateEvaluation` or
 * `CreateBatchPrediction` operations.
 *
 * If Amazon ML can't accept the input source, it sets the `Status` parameter to
 * `FAILED` and includes an error message in the `Message`
 * attribute of the `GetDataSource` operation response.
 *
 * The observation data used in a `DataSource` should be ready to use; that is,
 * it should have a consistent structure, and missing data values should be kept to a
 * minimum. The observation data must reside in one or more .csv files in an Amazon Simple
 * Storage Service (Amazon S3) location, along with a schema that describes the data items
 * by name and type. The same schema must be used for all of the data files referenced by
 * the `DataSource`.
 *
 * After the `DataSource` has been created, it's ready to use in evaluations and
 * batch predictions. If you plan to use the `DataSource` to train an
 * `MLModel`, the `DataSource` also needs a recipe. A recipe
 * describes how each input variable will be used in training an `MLModel`. Will
 * the variable be included or excluded from training? Will the variable be manipulated;
 * for example, will it be combined with another variable or will it be split apart into
 * word combinations? The recipe provides answers to these questions.
 */
export const createDataSourceFromS3: API.OperationMethod<
  CreateDataSourceFromS3Input,
  CreateDataSourceFromS3Output,
  CreateDataSourceFromS3Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDataSourceFromS3Input,
  output: CreateDataSourceFromS3Output,
  errors: [
    IdempotentParameterMismatchException,
    InternalServerException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataSourceFromS3",
}));

export type CreateEvaluationError =
  | IdempotentParameterMismatchException
  | InternalServerException
  | InvalidInputException
  | CommonErrors;
/**
 * Creates a new `Evaluation` of an `MLModel`. An `MLModel` is evaluated on a set of observations associated to a `DataSource`. Like a `DataSource`
 * for an `MLModel`, the `DataSource` for an `Evaluation` contains values for the `Target Variable`. The `Evaluation` compares the predicted result for each observation to the actual outcome and provides a
 * summary so that you know how effective the `MLModel` functions on the test
 * data. Evaluation generates a relevant performance metric, such as BinaryAUC, RegressionRMSE or MulticlassAvgFScore based on the corresponding `MLModelType`: `BINARY`, `REGRESSION` or `MULTICLASS`.
 *
 * `CreateEvaluation` is an asynchronous operation. In response to `CreateEvaluation`, Amazon Machine Learning (Amazon ML) immediately
 * returns and sets the evaluation status to `PENDING`. After the `Evaluation` is created and ready for use,
 * Amazon ML sets the status to `COMPLETED`.
 *
 * You can use the `GetEvaluation` operation to check progress of the evaluation during the creation operation.
 */
export const createEvaluation: API.OperationMethod<
  CreateEvaluationInput,
  CreateEvaluationOutput,
  CreateEvaluationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateEvaluationInput,
  output: CreateEvaluationOutput,
  errors: [
    IdempotentParameterMismatchException,
    InternalServerException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEvaluation",
}));

export type CreateMLModelError =
  | IdempotentParameterMismatchException
  | InternalServerException
  | InvalidInputException
  | CommonErrors;
/**
 * Creates a new `MLModel` using the `DataSource` and the recipe as
 * information sources.
 *
 * An `MLModel` is nearly immutable. Users can update only the
 * `MLModelName` and the `ScoreThreshold` in an
 * `MLModel` without creating a new `MLModel`.
 *
 * `CreateMLModel` is an asynchronous operation. In response to
 * `CreateMLModel`, Amazon Machine Learning (Amazon ML) immediately returns
 * and sets the `MLModel` status to `PENDING`. After the
 * `MLModel` has been created and ready is for use, Amazon ML sets the
 * status to `COMPLETED`.
 *
 * You can use the `GetMLModel` operation to check the progress of the
 * `MLModel` during the creation operation.
 *
 * `CreateMLModel` requires a `DataSource` with computed statistics,
 * which can be created by setting `ComputeStatistics` to `true` in
 * `CreateDataSourceFromRDS`, `CreateDataSourceFromS3`, or
 * `CreateDataSourceFromRedshift` operations.
 */
export const createMLModel: API.OperationMethod<
  CreateMLModelInput,
  CreateMLModelOutput,
  CreateMLModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateMLModelInput,
  output: CreateMLModelOutput,
  errors: [
    IdempotentParameterMismatchException,
    InternalServerException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMLModel",
}));

export type CreateRealtimeEndpointError =
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a real-time endpoint for the `MLModel`. The endpoint contains the URI of the `MLModel`; that is, the location to send real-time prediction requests for the specified `MLModel`.
 */
export const createRealtimeEndpoint: API.OperationMethod<
  CreateRealtimeEndpointInput,
  CreateRealtimeEndpointOutput,
  CreateRealtimeEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRealtimeEndpointInput,
  output: CreateRealtimeEndpointOutput,
  errors: [
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRealtimeEndpoint",
}));

export type DeleteBatchPredictionError =
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Assigns the DELETED status to a `BatchPrediction`, rendering it unusable.
 *
 * After using the `DeleteBatchPrediction` operation, you can use the GetBatchPrediction
 * operation to verify that the status of the `BatchPrediction` changed to DELETED.
 *
 * **Caution:** The result of the `DeleteBatchPrediction` operation is irreversible.
 */
export const deleteBatchPrediction: API.OperationMethod<
  DeleteBatchPredictionInput,
  DeleteBatchPredictionOutput,
  DeleteBatchPredictionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteBatchPredictionInput,
  output: DeleteBatchPredictionOutput,
  errors: [
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBatchPrediction",
}));

export type DeleteDataSourceError =
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Assigns the DELETED status to a `DataSource`, rendering it unusable.
 *
 * After using the `DeleteDataSource` operation, you can use the GetDataSource operation to verify that the status of the `DataSource` changed to DELETED.
 *
 * **Caution:** The results of the `DeleteDataSource` operation are irreversible.
 */
export const deleteDataSource: API.OperationMethod<
  DeleteDataSourceInput,
  DeleteDataSourceOutput,
  DeleteDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDataSourceInput,
  output: DeleteDataSourceOutput,
  errors: [
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataSource",
}));

export type DeleteEvaluationError =
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Assigns the `DELETED` status to an `Evaluation`, rendering it unusable.
 *
 * After invoking the `DeleteEvaluation` operation, you can use the
 * `GetEvaluation` operation to verify that the status of the `Evaluation` changed to `DELETED`.
 *
 * **Caution:** The results of the `DeleteEvaluation` operation are irreversible.
 */
export const deleteEvaluation: API.OperationMethod<
  DeleteEvaluationInput,
  DeleteEvaluationOutput,
  DeleteEvaluationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEvaluationInput,
  output: DeleteEvaluationOutput,
  errors: [
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEvaluation",
}));

export type DeleteMLModelError =
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Assigns the `DELETED` status to an `MLModel`, rendering it unusable.
 *
 * After using the `DeleteMLModel` operation, you can use the
 * `GetMLModel` operation to verify that the status of the `MLModel` changed to DELETED.
 *
 * **Caution:** The result of the `DeleteMLModel` operation is irreversible.
 */
export const deleteMLModel: API.OperationMethod<
  DeleteMLModelInput,
  DeleteMLModelOutput,
  DeleteMLModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteMLModelInput,
  output: DeleteMLModelOutput,
  errors: [
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMLModel",
}));

export type DeleteRealtimeEndpointError =
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a real time endpoint of an `MLModel`.
 */
export const deleteRealtimeEndpoint: API.OperationMethod<
  DeleteRealtimeEndpointInput,
  DeleteRealtimeEndpointOutput,
  DeleteRealtimeEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRealtimeEndpointInput,
  output: DeleteRealtimeEndpointOutput,
  errors: [
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRealtimeEndpoint",
}));

export type DeleteTagsError =
  | InternalServerException
  | InvalidInputException
  | InvalidTagException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the specified tags associated with an ML object. After this operation is complete, you can't recover deleted tags.
 *
 * If you specify a tag that doesn't exist, Amazon ML ignores it.
 */
export const deleteTags: API.OperationMethod<
  DeleteTagsInput,
  DeleteTagsOutput,
  DeleteTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTagsInput,
  output: DeleteTagsOutput,
  errors: [
    InternalServerException,
    InvalidInputException,
    InvalidTagException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTags",
}));

export type DescribeBatchPredictionsError =
  | InternalServerException
  | InvalidInputException
  | CommonErrors;
/**
 * Returns a list of `BatchPrediction` operations that match the search criteria in the request.
 */
export const describeBatchPredictions: API.PaginatedOperationMethod<
  DescribeBatchPredictionsInput,
  DescribeBatchPredictionsOutput,
  DescribeBatchPredictionsError,
  Credentials | HttpClient.HttpClient,
  BatchPrediction
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeBatchPredictionsInput,
  output: DescribeBatchPredictionsOutput,
  errors: [InternalServerException, InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBatchPredictions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Results",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeDataSourcesError =
  | InternalServerException
  | InvalidInputException
  | CommonErrors;
/**
 * Returns a list of `DataSource` that match the search criteria in the request.
 */
export const describeDataSources: API.PaginatedOperationMethod<
  DescribeDataSourcesInput,
  DescribeDataSourcesOutput,
  DescribeDataSourcesError,
  Credentials | HttpClient.HttpClient,
  DataSource
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeDataSourcesInput,
  output: DescribeDataSourcesOutput,
  errors: [InternalServerException, InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDataSources",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Results",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeEvaluationsError =
  | InternalServerException
  | InvalidInputException
  | CommonErrors;
/**
 * Returns a list of `DescribeEvaluations` that match the search criteria in the request.
 */
export const describeEvaluations: API.PaginatedOperationMethod<
  DescribeEvaluationsInput,
  DescribeEvaluationsOutput,
  DescribeEvaluationsError,
  Credentials | HttpClient.HttpClient,
  Evaluation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeEvaluationsInput,
  output: DescribeEvaluationsOutput,
  errors: [InternalServerException, InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEvaluations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Results",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeMLModelsError =
  | InternalServerException
  | InvalidInputException
  | CommonErrors;
/**
 * Returns a list of `MLModel` that match the search criteria in the request.
 */
export const describeMLModels: API.PaginatedOperationMethod<
  DescribeMLModelsInput,
  DescribeMLModelsOutput,
  DescribeMLModelsError,
  Credentials | HttpClient.HttpClient,
  MLModel
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeMLModelsInput,
  output: DescribeMLModelsOutput,
  errors: [InternalServerException, InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMLModels",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Results",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeTagsError =
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes one or more of the tags for your Amazon ML object.
 */
export const describeTags: API.OperationMethod<
  DescribeTagsInput,
  DescribeTagsOutput,
  DescribeTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeTagsInput,
  output: DescribeTagsOutput,
  errors: [
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTags",
}));

export type GetBatchPredictionError =
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a `BatchPrediction` that includes detailed metadata, status, and data file information for a
 * `Batch Prediction` request.
 */
export const getBatchPrediction: API.OperationMethod<
  GetBatchPredictionInput,
  GetBatchPredictionOutput,
  GetBatchPredictionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetBatchPredictionInput,
  output: GetBatchPredictionOutput,
  errors: [
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBatchPrediction",
}));

export type GetDataSourceError =
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a `DataSource` that includes metadata and data file information, as well as the current status of the `DataSource`.
 *
 * `GetDataSource` provides results in normal or verbose format. The verbose format
 * adds the schema description and the list of files pointed to by the DataSource to the normal format.
 */
export const getDataSource: API.OperationMethod<
  GetDataSourceInput,
  GetDataSourceOutput,
  GetDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDataSourceInput,
  output: GetDataSourceOutput,
  errors: [
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataSource",
}));

export type GetEvaluationError =
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns an `Evaluation` that includes metadata as well as the current status of the `Evaluation`.
 */
export const getEvaluation: API.OperationMethod<
  GetEvaluationInput,
  GetEvaluationOutput,
  GetEvaluationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEvaluationInput,
  output: GetEvaluationOutput,
  errors: [
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEvaluation",
}));

export type GetMLModelError =
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns an `MLModel` that includes detailed metadata, data source information, and the current status of the `MLModel`.
 *
 * `GetMLModel` provides results in normal or verbose format.
 */
export const getMLModel: API.OperationMethod<
  GetMLModelInput,
  GetMLModelOutput,
  GetMLModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMLModelInput,
  output: GetMLModelOutput,
  errors: [
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMLModel",
}));

export type PredictError =
  | InternalServerException
  | InvalidInputException
  | LimitExceededException
  | PredictorNotMountedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Generates a prediction for the observation using the specified `ML Model`.
 *
 * **Note:** Not all response parameters will be populated. Whether a
 * response parameter is populated depends on the type of model requested.
 */
export const predict: API.OperationMethod<
  PredictInput,
  PredictOutput,
  PredictError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PredictInput,
  output: PredictOutput,
  errors: [
    InternalServerException,
    InvalidInputException,
    LimitExceededException,
    PredictorNotMountedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Predict",
}));

export type UpdateBatchPredictionError =
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates the `BatchPredictionName` of a `BatchPrediction`.
 *
 * You can use the `GetBatchPrediction` operation to view the contents of the updated data element.
 */
export const updateBatchPrediction: API.OperationMethod<
  UpdateBatchPredictionInput,
  UpdateBatchPredictionOutput,
  UpdateBatchPredictionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateBatchPredictionInput,
  output: UpdateBatchPredictionOutput,
  errors: [
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBatchPrediction",
}));

export type UpdateDataSourceError =
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates the `DataSourceName` of a `DataSource`.
 *
 * You can use the `GetDataSource` operation to view the contents of the updated data element.
 */
export const updateDataSource: API.OperationMethod<
  UpdateDataSourceInput,
  UpdateDataSourceOutput,
  UpdateDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDataSourceInput,
  output: UpdateDataSourceOutput,
  errors: [
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataSource",
}));

export type UpdateEvaluationError =
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates the `EvaluationName` of an `Evaluation`.
 *
 * You can use the `GetEvaluation` operation to view the contents of the updated data element.
 */
export const updateEvaluation: API.OperationMethod<
  UpdateEvaluationInput,
  UpdateEvaluationOutput,
  UpdateEvaluationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateEvaluationInput,
  output: UpdateEvaluationOutput,
  errors: [
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEvaluation",
}));

export type UpdateMLModelError =
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates the `MLModelName` and the `ScoreThreshold` of an `MLModel`.
 *
 * You can use the `GetMLModel` operation to view the contents of the updated data element.
 */
export const updateMLModel: API.OperationMethod<
  UpdateMLModelInput,
  UpdateMLModelOutput,
  UpdateMLModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateMLModelInput,
  output: UpdateMLModelOutput,
  errors: [
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMLModel",
}));
