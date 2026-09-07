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
  sdkId: "LookoutEquipment",
  serviceShapeName: "AWSLookoutEquipmentFrontendService",
});
const auth = T.AwsAuthSigv4({ name: "lookoutequipment" });
const ver = T.ServiceVersion("2020-12-15");
const proto = T.AwsProtocolsAwsJson1_0();
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
              `https://lookoutequipment-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://lookoutequipment-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://lookoutequipment.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://lookoutequipment.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
    T.HttpError(500),
  ).pipe(C.withServerError) {}
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
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type DatasetName = string;
export type SynthesizedJsonInlineDataSchema = string;
export interface DatasetSchema {
  InlineDataSchema?: string;
}
export const DatasetSchema = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InlineDataSchema: S.optional(S.String) }),
).annotate({ identifier: "DatasetSchema" }) as any as S.Schema<DatasetSchema>;
export type NameOrArn = string;
export type IdempotenceToken = string;
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
export interface CreateDatasetRequest {
  DatasetName: string;
  DatasetSchema?: DatasetSchema;
  ServerSideKmsKeyId?: string;
  ClientToken: string;
  Tags?: Tag[];
}
export const CreateDatasetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatasetName: S.String,
    DatasetSchema: S.optional(DatasetSchema),
    ServerSideKmsKeyId: S.optional(S.String),
    ClientToken: S.String.pipe(T.IdempotencyToken()),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateDatasetRequest",
}) as any as S.Schema<CreateDatasetRequest>;
export type DatasetArn = string;
export type DatasetStatus =
  | "CREATED"
  | "INGESTION_IN_PROGRESS"
  | "ACTIVE"
  | "IMPORT_IN_PROGRESS"
  | (string & {});
export const DatasetStatus = /*@__PURE__*/ S.String;

export interface CreateDatasetResponse {
  DatasetName?: string;
  DatasetArn?: string;
  Status?: DatasetStatus;
}
export const CreateDatasetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatasetName: S.optional(S.String),
    DatasetArn: S.optional(S.String),
    Status: S.optional(DatasetStatus),
  }),
).annotate({
  identifier: "CreateDatasetResponse",
}) as any as S.Schema<CreateDatasetResponse>;
export type ModelName = string;
export type InferenceSchedulerName = string;
export type DataDelayOffsetInMinutes = number;
export type DataUploadFrequency =
  | "PT5M"
  | "PT10M"
  | "PT15M"
  | "PT30M"
  | "PT1H"
  | (string & {});
export const DataUploadFrequency = /*@__PURE__*/ S.String;

export type S3Bucket = string;
export type S3Prefix = string;
export interface InferenceS3InputConfiguration {
  Bucket: string;
  Prefix?: string;
}
export const InferenceS3InputConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Bucket: S.String, Prefix: S.optional(S.String) }),
).annotate({
  identifier: "InferenceS3InputConfiguration",
}) as any as S.Schema<InferenceS3InputConfiguration>;
export type TimeZoneOffset = string;
export type FileNameTimestampFormat = string;
export type ComponentTimestampDelimiter = string;
export interface InferenceInputNameConfiguration {
  TimestampFormat?: string;
  ComponentTimestampDelimiter?: string;
}
export const InferenceInputNameConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TimestampFormat: S.optional(S.String),
    ComponentTimestampDelimiter: S.optional(S.String),
  }),
).annotate({
  identifier: "InferenceInputNameConfiguration",
}) as any as S.Schema<InferenceInputNameConfiguration>;
export interface InferenceInputConfiguration {
  S3InputConfiguration?: InferenceS3InputConfiguration;
  InputTimeZoneOffset?: string;
  InferenceInputNameConfiguration?: InferenceInputNameConfiguration;
}
export const InferenceInputConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    S3InputConfiguration: S.optional(InferenceS3InputConfiguration),
    InputTimeZoneOffset: S.optional(S.String),
    InferenceInputNameConfiguration: S.optional(
      InferenceInputNameConfiguration,
    ),
  }),
).annotate({
  identifier: "InferenceInputConfiguration",
}) as any as S.Schema<InferenceInputConfiguration>;
export interface InferenceS3OutputConfiguration {
  Bucket: string;
  Prefix?: string;
}
export const InferenceS3OutputConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Bucket: S.String, Prefix: S.optional(S.String) }),
).annotate({
  identifier: "InferenceS3OutputConfiguration",
}) as any as S.Schema<InferenceS3OutputConfiguration>;
export interface InferenceOutputConfiguration {
  S3OutputConfiguration: InferenceS3OutputConfiguration;
  KmsKeyId?: string;
}
export const InferenceOutputConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    S3OutputConfiguration: InferenceS3OutputConfiguration,
    KmsKeyId: S.optional(S.String),
  }),
).annotate({
  identifier: "InferenceOutputConfiguration",
}) as any as S.Schema<InferenceOutputConfiguration>;
export type IamRoleArn = string;
export interface CreateInferenceSchedulerRequest {
  ModelName: string;
  InferenceSchedulerName: string;
  DataDelayOffsetInMinutes?: number;
  DataUploadFrequency: DataUploadFrequency;
  DataInputConfiguration: InferenceInputConfiguration;
  DataOutputConfiguration: InferenceOutputConfiguration;
  RoleArn: string;
  ServerSideKmsKeyId?: string;
  ClientToken: string;
  Tags?: Tag[];
}
export const CreateInferenceSchedulerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ModelName: S.String,
    InferenceSchedulerName: S.String,
    DataDelayOffsetInMinutes: S.optional(S.Number),
    DataUploadFrequency: DataUploadFrequency,
    DataInputConfiguration: InferenceInputConfiguration,
    DataOutputConfiguration: InferenceOutputConfiguration,
    RoleArn: S.String,
    ServerSideKmsKeyId: S.optional(S.String),
    ClientToken: S.String.pipe(T.IdempotencyToken()),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateInferenceSchedulerRequest",
}) as any as S.Schema<CreateInferenceSchedulerRequest>;
export type InferenceSchedulerArn = string;
export type InferenceSchedulerStatus =
  | "PENDING"
  | "RUNNING"
  | "STOPPING"
  | "STOPPED"
  | (string & {});
export const InferenceSchedulerStatus = /*@__PURE__*/ S.String;

export type ModelQuality =
  | "QUALITY_THRESHOLD_MET"
  | "CANNOT_DETERMINE_QUALITY"
  | "POOR_QUALITY_DETECTED"
  | (string & {});
export const ModelQuality = /*@__PURE__*/ S.String;

export interface CreateInferenceSchedulerResponse {
  InferenceSchedulerArn?: string;
  InferenceSchedulerName?: string;
  Status?: InferenceSchedulerStatus;
  ModelQuality?: ModelQuality;
}
export const CreateInferenceSchedulerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InferenceSchedulerArn: S.optional(S.String),
    InferenceSchedulerName: S.optional(S.String),
    Status: S.optional(InferenceSchedulerStatus),
    ModelQuality: S.optional(ModelQuality),
  }),
).annotate({
  identifier: "CreateInferenceSchedulerResponse",
}) as any as S.Schema<CreateInferenceSchedulerResponse>;
export type LabelGroupName = string;
export type LabelRating = "ANOMALY" | "NO_ANOMALY" | "NEUTRAL" | (string & {});
export const LabelRating = /*@__PURE__*/ S.String;

export type FaultCode = string;
export type Comments = string;
export type Equipment = string;
export interface CreateLabelRequest {
  LabelGroupName: string;
  StartTime: Date;
  EndTime: Date;
  Rating: LabelRating;
  FaultCode?: string;
  Notes?: string;
  Equipment?: string;
  ClientToken: string;
}
export const CreateLabelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LabelGroupName: S.String,
    StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    Rating: LabelRating,
    FaultCode: S.optional(S.String),
    Notes: S.optional(S.String),
    Equipment: S.optional(S.String),
    ClientToken: S.String.pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateLabelRequest",
}) as any as S.Schema<CreateLabelRequest>;
export type LabelId = string;
export interface CreateLabelResponse {
  LabelId?: string;
}
export const CreateLabelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LabelId: S.optional(S.String) }),
).annotate({
  identifier: "CreateLabelResponse",
}) as any as S.Schema<CreateLabelResponse>;
export type FaultCodes = string[];
export const FaultCodes = /*@__PURE__*/ S.Array(S.String);
export interface CreateLabelGroupRequest {
  LabelGroupName: string;
  FaultCodes?: string[];
  ClientToken: string;
  Tags?: Tag[];
}
export const CreateLabelGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LabelGroupName: S.String,
    FaultCodes: S.optional(FaultCodes),
    ClientToken: S.String.pipe(T.IdempotencyToken()),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateLabelGroupRequest",
}) as any as S.Schema<CreateLabelGroupRequest>;
export type LabelGroupArn = string;
export interface CreateLabelGroupResponse {
  LabelGroupName?: string;
  LabelGroupArn?: string;
}
export const CreateLabelGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LabelGroupName: S.optional(S.String),
    LabelGroupArn: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateLabelGroupResponse",
}) as any as S.Schema<CreateLabelGroupResponse>;
export type DatasetIdentifier = string;
export interface LabelsS3InputConfiguration {
  Bucket: string;
  Prefix?: string;
}
export const LabelsS3InputConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Bucket: S.String, Prefix: S.optional(S.String) }),
).annotate({
  identifier: "LabelsS3InputConfiguration",
}) as any as S.Schema<LabelsS3InputConfiguration>;
export interface LabelsInputConfiguration {
  S3InputConfiguration?: LabelsS3InputConfiguration;
  LabelGroupName?: string;
}
export const LabelsInputConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    S3InputConfiguration: S.optional(LabelsS3InputConfiguration),
    LabelGroupName: S.optional(S.String),
  }),
).annotate({
  identifier: "LabelsInputConfiguration",
}) as any as S.Schema<LabelsInputConfiguration>;
export type TargetSamplingRate =
  | "PT1S"
  | "PT5S"
  | "PT10S"
  | "PT15S"
  | "PT30S"
  | "PT1M"
  | "PT5M"
  | "PT10M"
  | "PT15M"
  | "PT30M"
  | "PT1H"
  | (string & {});
export const TargetSamplingRate = /*@__PURE__*/ S.String;

export interface DataPreProcessingConfiguration {
  TargetSamplingRate?: TargetSamplingRate;
}
export const DataPreProcessingConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TargetSamplingRate: S.optional(TargetSamplingRate) }),
).annotate({
  identifier: "DataPreProcessingConfiguration",
}) as any as S.Schema<DataPreProcessingConfiguration>;
export type OffCondition = string;
export interface ModelDiagnosticsS3OutputConfiguration {
  Bucket: string;
  Prefix?: string;
}
export const ModelDiagnosticsS3OutputConfiguration = /*@__PURE__*/ S.suspend(
  () => S.Struct({ Bucket: S.String, Prefix: S.optional(S.String) }),
).annotate({
  identifier: "ModelDiagnosticsS3OutputConfiguration",
}) as any as S.Schema<ModelDiagnosticsS3OutputConfiguration>;
export interface ModelDiagnosticsOutputConfiguration {
  S3OutputConfiguration: ModelDiagnosticsS3OutputConfiguration;
  KmsKeyId?: string;
}
export const ModelDiagnosticsOutputConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    S3OutputConfiguration: ModelDiagnosticsS3OutputConfiguration,
    KmsKeyId: S.optional(S.String),
  }),
).annotate({
  identifier: "ModelDiagnosticsOutputConfiguration",
}) as any as S.Schema<ModelDiagnosticsOutputConfiguration>;
export interface CreateModelRequest {
  ModelName: string;
  DatasetName: string;
  DatasetSchema?: DatasetSchema;
  LabelsInputConfiguration?: LabelsInputConfiguration;
  ClientToken: string;
  TrainingDataStartTime?: Date;
  TrainingDataEndTime?: Date;
  EvaluationDataStartTime?: Date;
  EvaluationDataEndTime?: Date;
  RoleArn?: string;
  DataPreProcessingConfiguration?: DataPreProcessingConfiguration;
  ServerSideKmsKeyId?: string;
  Tags?: Tag[];
  OffCondition?: string;
  ModelDiagnosticsOutputConfiguration?: ModelDiagnosticsOutputConfiguration;
}
export const CreateModelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ModelName: S.String,
    DatasetName: S.String,
    DatasetSchema: S.optional(DatasetSchema),
    LabelsInputConfiguration: S.optional(LabelsInputConfiguration),
    ClientToken: S.String.pipe(T.IdempotencyToken()),
    TrainingDataStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    TrainingDataEndTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    EvaluationDataStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    EvaluationDataEndTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    RoleArn: S.optional(S.String),
    DataPreProcessingConfiguration: S.optional(DataPreProcessingConfiguration),
    ServerSideKmsKeyId: S.optional(S.String),
    Tags: S.optional(TagList),
    OffCondition: S.optional(S.String),
    ModelDiagnosticsOutputConfiguration: S.optional(
      ModelDiagnosticsOutputConfiguration,
    ),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateModelRequest",
}) as any as S.Schema<CreateModelRequest>;
export type ModelArn = string;
export type ModelStatus =
  | "IN_PROGRESS"
  | "SUCCESS"
  | "FAILED"
  | "IMPORT_IN_PROGRESS"
  | (string & {});
export const ModelStatus = /*@__PURE__*/ S.String;

export interface CreateModelResponse {
  ModelArn?: string;
  Status?: ModelStatus;
}
export const CreateModelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ModelArn: S.optional(S.String), Status: S.optional(ModelStatus) }),
).annotate({
  identifier: "CreateModelResponse",
}) as any as S.Schema<CreateModelResponse>;
export type RetrainingFrequency = string;
export type LookbackWindow = string;
export type ModelPromoteMode = "MANAGED" | "MANUAL" | (string & {});
export const ModelPromoteMode = /*@__PURE__*/ S.String;

export interface CreateRetrainingSchedulerRequest {
  ModelName: string;
  RetrainingStartDate?: Date;
  RetrainingFrequency: string;
  LookbackWindow: string;
  PromoteMode?: ModelPromoteMode;
  ClientToken: string;
}
export const CreateRetrainingSchedulerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ModelName: S.String,
    RetrainingStartDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    RetrainingFrequency: S.String,
    LookbackWindow: S.String,
    PromoteMode: S.optional(ModelPromoteMode),
    ClientToken: S.String.pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateRetrainingSchedulerRequest",
}) as any as S.Schema<CreateRetrainingSchedulerRequest>;
export type RetrainingSchedulerStatus =
  | "PENDING"
  | "RUNNING"
  | "STOPPING"
  | "STOPPED"
  | (string & {});
export const RetrainingSchedulerStatus = /*@__PURE__*/ S.String;

export interface CreateRetrainingSchedulerResponse {
  ModelName?: string;
  ModelArn?: string;
  Status?: RetrainingSchedulerStatus;
}
export const CreateRetrainingSchedulerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ModelName: S.optional(S.String),
    ModelArn: S.optional(S.String),
    Status: S.optional(RetrainingSchedulerStatus),
  }),
).annotate({
  identifier: "CreateRetrainingSchedulerResponse",
}) as any as S.Schema<CreateRetrainingSchedulerResponse>;
export interface DeleteDatasetRequest {
  DatasetName: string;
}
export const DeleteDatasetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DatasetName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteDatasetRequest",
}) as any as S.Schema<DeleteDatasetRequest>;
export interface DeleteDatasetResponse {}
export const DeleteDatasetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteDatasetResponse",
}) as any as S.Schema<DeleteDatasetResponse>;
export type InferenceSchedulerIdentifier = string;
export interface DeleteInferenceSchedulerRequest {
  InferenceSchedulerName: string;
}
export const DeleteInferenceSchedulerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InferenceSchedulerName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteInferenceSchedulerRequest",
}) as any as S.Schema<DeleteInferenceSchedulerRequest>;
export interface DeleteInferenceSchedulerResponse {}
export const DeleteInferenceSchedulerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteInferenceSchedulerResponse",
}) as any as S.Schema<DeleteInferenceSchedulerResponse>;
export interface DeleteLabelRequest {
  LabelGroupName: string;
  LabelId: string;
}
export const DeleteLabelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LabelGroupName: S.String, LabelId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteLabelRequest",
}) as any as S.Schema<DeleteLabelRequest>;
export interface DeleteLabelResponse {}
export const DeleteLabelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteLabelResponse",
}) as any as S.Schema<DeleteLabelResponse>;
export interface DeleteLabelGroupRequest {
  LabelGroupName: string;
}
export const DeleteLabelGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LabelGroupName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteLabelGroupRequest",
}) as any as S.Schema<DeleteLabelGroupRequest>;
export interface DeleteLabelGroupResponse {}
export const DeleteLabelGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteLabelGroupResponse",
}) as any as S.Schema<DeleteLabelGroupResponse>;
export interface DeleteModelRequest {
  ModelName: string;
}
export const DeleteModelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ModelName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteModelRequest",
}) as any as S.Schema<DeleteModelRequest>;
export interface DeleteModelResponse {}
export const DeleteModelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteModelResponse",
}) as any as S.Schema<DeleteModelResponse>;
export type ResourceArn = string;
export interface DeleteResourcePolicyRequest {
  ResourceArn: string;
}
export const DeleteResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteResourcePolicyRequest",
}) as any as S.Schema<DeleteResourcePolicyRequest>;
export interface DeleteResourcePolicyResponse {}
export const DeleteResourcePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteResourcePolicyResponse",
}) as any as S.Schema<DeleteResourcePolicyResponse>;
export interface DeleteRetrainingSchedulerRequest {
  ModelName: string;
}
export const DeleteRetrainingSchedulerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ModelName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteRetrainingSchedulerRequest",
}) as any as S.Schema<DeleteRetrainingSchedulerRequest>;
export interface DeleteRetrainingSchedulerResponse {}
export const DeleteRetrainingSchedulerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteRetrainingSchedulerResponse",
}) as any as S.Schema<DeleteRetrainingSchedulerResponse>;
export type IngestionJobId = string;
export interface DescribeDataIngestionJobRequest {
  JobId: string;
}
export const DescribeDataIngestionJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeDataIngestionJobRequest",
}) as any as S.Schema<DescribeDataIngestionJobRequest>;
export type KeyPattern = string;
export interface IngestionS3InputConfiguration {
  Bucket: string;
  Prefix?: string;
  KeyPattern?: string;
}
export const IngestionS3InputConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Bucket: S.String,
    Prefix: S.optional(S.String),
    KeyPattern: S.optional(S.String),
  }),
).annotate({
  identifier: "IngestionS3InputConfiguration",
}) as any as S.Schema<IngestionS3InputConfiguration>;
export interface IngestionInputConfiguration {
  S3InputConfiguration: IngestionS3InputConfiguration;
}
export const IngestionInputConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ S3InputConfiguration: IngestionS3InputConfiguration }),
).annotate({
  identifier: "IngestionInputConfiguration",
}) as any as S.Schema<IngestionInputConfiguration>;
export type IngestionJobStatus =
  | "IN_PROGRESS"
  | "SUCCESS"
  | "FAILED"
  | "IMPORT_IN_PROGRESS"
  | (string & {});
export const IngestionJobStatus = /*@__PURE__*/ S.String;

export type BoundedLengthString = string;
export interface MissingCompleteSensorData {
  AffectedSensorCount: number;
}
export const MissingCompleteSensorData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AffectedSensorCount: S.Number }),
).annotate({
  identifier: "MissingCompleteSensorData",
}) as any as S.Schema<MissingCompleteSensorData>;
export interface SensorsWithShortDateRange {
  AffectedSensorCount: number;
}
export const SensorsWithShortDateRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AffectedSensorCount: S.Number }),
).annotate({
  identifier: "SensorsWithShortDateRange",
}) as any as S.Schema<SensorsWithShortDateRange>;
export interface InsufficientSensorData {
  MissingCompleteSensorData: MissingCompleteSensorData;
  SensorsWithShortDateRange: SensorsWithShortDateRange;
}
export const InsufficientSensorData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MissingCompleteSensorData: MissingCompleteSensorData,
    SensorsWithShortDateRange: SensorsWithShortDateRange,
  }),
).annotate({
  identifier: "InsufficientSensorData",
}) as any as S.Schema<InsufficientSensorData>;
export interface MissingSensorData {
  AffectedSensorCount: number;
  TotalNumberOfMissingValues: number;
}
export const MissingSensorData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AffectedSensorCount: S.Number,
    TotalNumberOfMissingValues: S.Number,
  }),
).annotate({
  identifier: "MissingSensorData",
}) as any as S.Schema<MissingSensorData>;
export interface InvalidSensorData {
  AffectedSensorCount: number;
  TotalNumberOfInvalidValues: number;
}
export const InvalidSensorData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AffectedSensorCount: S.Number,
    TotalNumberOfInvalidValues: S.Number,
  }),
).annotate({
  identifier: "InvalidSensorData",
}) as any as S.Schema<InvalidSensorData>;
export interface UnsupportedTimestamps {
  TotalNumberOfUnsupportedTimestamps: number;
}
export const UnsupportedTimestamps = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TotalNumberOfUnsupportedTimestamps: S.Number }),
).annotate({
  identifier: "UnsupportedTimestamps",
}) as any as S.Schema<UnsupportedTimestamps>;
export interface DuplicateTimestamps {
  TotalNumberOfDuplicateTimestamps: number;
}
export const DuplicateTimestamps = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TotalNumberOfDuplicateTimestamps: S.Number }),
).annotate({
  identifier: "DuplicateTimestamps",
}) as any as S.Schema<DuplicateTimestamps>;
export interface DataQualitySummary {
  InsufficientSensorData: InsufficientSensorData;
  MissingSensorData: MissingSensorData;
  InvalidSensorData: InvalidSensorData;
  UnsupportedTimestamps: UnsupportedTimestamps;
  DuplicateTimestamps: DuplicateTimestamps;
}
export const DataQualitySummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InsufficientSensorData: InsufficientSensorData,
    MissingSensorData: MissingSensorData,
    InvalidSensorData: InvalidSensorData,
    UnsupportedTimestamps: UnsupportedTimestamps,
    DuplicateTimestamps: DuplicateTimestamps,
  }),
).annotate({
  identifier: "DataQualitySummary",
}) as any as S.Schema<DataQualitySummary>;
export type S3Key = string;
export interface S3Object {
  Bucket: string;
  Key: string;
}
export const S3Object = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Bucket: S.String, Key: S.String }),
).annotate({ identifier: "S3Object" }) as any as S.Schema<S3Object>;
export type ListOfDiscardedFiles = S3Object[];
export const ListOfDiscardedFiles = /*@__PURE__*/ S.Array(S3Object);
export interface IngestedFilesSummary {
  TotalNumberOfFiles: number;
  IngestedNumberOfFiles: number;
  DiscardedFiles?: S3Object[];
}
export const IngestedFilesSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TotalNumberOfFiles: S.Number,
    IngestedNumberOfFiles: S.Number,
    DiscardedFiles: S.optional(ListOfDiscardedFiles),
  }),
).annotate({
  identifier: "IngestedFilesSummary",
}) as any as S.Schema<IngestedFilesSummary>;
export type DataSizeInBytes = number;
export interface DescribeDataIngestionJobResponse {
  JobId?: string;
  DatasetArn?: string;
  IngestionInputConfiguration?: IngestionInputConfiguration;
  RoleArn?: string;
  CreatedAt?: Date;
  Status?: IngestionJobStatus;
  FailedReason?: string;
  DataQualitySummary?: DataQualitySummary;
  IngestedFilesSummary?: IngestedFilesSummary;
  StatusDetail?: string;
  IngestedDataSize?: number;
  DataStartTime?: Date;
  DataEndTime?: Date;
  SourceDatasetArn?: string;
}
export const DescribeDataIngestionJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobId: S.optional(S.String),
    DatasetArn: S.optional(S.String),
    IngestionInputConfiguration: S.optional(IngestionInputConfiguration),
    RoleArn: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Status: S.optional(IngestionJobStatus),
    FailedReason: S.optional(S.String),
    DataQualitySummary: S.optional(DataQualitySummary),
    IngestedFilesSummary: S.optional(IngestedFilesSummary),
    StatusDetail: S.optional(S.String),
    IngestedDataSize: S.optional(S.Number),
    DataStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DataEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    SourceDatasetArn: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeDataIngestionJobResponse",
}) as any as S.Schema<DescribeDataIngestionJobResponse>;
export interface DescribeDatasetRequest {
  DatasetName: string;
}
export const DescribeDatasetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DatasetName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeDatasetRequest",
}) as any as S.Schema<DescribeDatasetRequest>;
export type KmsKeyArn = string;
export interface DescribeDatasetResponse {
  DatasetName?: string;
  DatasetArn?: string;
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  Status?: DatasetStatus;
  Schema?: string;
  ServerSideKmsKeyId?: string;
  IngestionInputConfiguration?: IngestionInputConfiguration;
  DataQualitySummary?: DataQualitySummary;
  IngestedFilesSummary?: IngestedFilesSummary;
  RoleArn?: string;
  DataStartTime?: Date;
  DataEndTime?: Date;
  SourceDatasetArn?: string;
}
export const DescribeDatasetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatasetName: S.optional(S.String),
    DatasetArn: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Status: S.optional(DatasetStatus),
    Schema: S.optional(S.String),
    ServerSideKmsKeyId: S.optional(S.String),
    IngestionInputConfiguration: S.optional(IngestionInputConfiguration),
    DataQualitySummary: S.optional(DataQualitySummary),
    IngestedFilesSummary: S.optional(IngestedFilesSummary),
    RoleArn: S.optional(S.String),
    DataStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DataEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    SourceDatasetArn: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeDatasetResponse",
}) as any as S.Schema<DescribeDatasetResponse>;
export interface DescribeInferenceSchedulerRequest {
  InferenceSchedulerName: string;
}
export const DescribeInferenceSchedulerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InferenceSchedulerName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeInferenceSchedulerRequest",
}) as any as S.Schema<DescribeInferenceSchedulerRequest>;
export type LatestInferenceResult = "ANOMALOUS" | "NORMAL" | (string & {});
export const LatestInferenceResult = /*@__PURE__*/ S.String;

export interface DescribeInferenceSchedulerResponse {
  ModelArn?: string;
  ModelName?: string;
  InferenceSchedulerName?: string;
  InferenceSchedulerArn?: string;
  Status?: InferenceSchedulerStatus;
  DataDelayOffsetInMinutes?: number;
  DataUploadFrequency?: DataUploadFrequency;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  DataInputConfiguration?: InferenceInputConfiguration;
  DataOutputConfiguration?: InferenceOutputConfiguration;
  RoleArn?: string;
  ServerSideKmsKeyId?: string;
  LatestInferenceResult?: LatestInferenceResult;
}
export const DescribeInferenceSchedulerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ModelArn: S.optional(S.String),
    ModelName: S.optional(S.String),
    InferenceSchedulerName: S.optional(S.String),
    InferenceSchedulerArn: S.optional(S.String),
    Status: S.optional(InferenceSchedulerStatus),
    DataDelayOffsetInMinutes: S.optional(S.Number),
    DataUploadFrequency: S.optional(DataUploadFrequency),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DataInputConfiguration: S.optional(InferenceInputConfiguration),
    DataOutputConfiguration: S.optional(InferenceOutputConfiguration),
    RoleArn: S.optional(S.String),
    ServerSideKmsKeyId: S.optional(S.String),
    LatestInferenceResult: S.optional(LatestInferenceResult),
  }),
).annotate({
  identifier: "DescribeInferenceSchedulerResponse",
}) as any as S.Schema<DescribeInferenceSchedulerResponse>;
export interface DescribeLabelRequest {
  LabelGroupName: string;
  LabelId: string;
}
export const DescribeLabelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LabelGroupName: S.String, LabelId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeLabelRequest",
}) as any as S.Schema<DescribeLabelRequest>;
export interface DescribeLabelResponse {
  LabelGroupName?: string;
  LabelGroupArn?: string;
  LabelId?: string;
  StartTime?: Date;
  EndTime?: Date;
  Rating?: LabelRating;
  FaultCode?: string;
  Notes?: string;
  Equipment?: string;
  CreatedAt?: Date;
}
export const DescribeLabelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LabelGroupName: S.optional(S.String),
    LabelGroupArn: S.optional(S.String),
    LabelId: S.optional(S.String),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Rating: S.optional(LabelRating),
    FaultCode: S.optional(S.String),
    Notes: S.optional(S.String),
    Equipment: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "DescribeLabelResponse",
}) as any as S.Schema<DescribeLabelResponse>;
export interface DescribeLabelGroupRequest {
  LabelGroupName: string;
}
export const DescribeLabelGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LabelGroupName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeLabelGroupRequest",
}) as any as S.Schema<DescribeLabelGroupRequest>;
export interface DescribeLabelGroupResponse {
  LabelGroupName?: string;
  LabelGroupArn?: string;
  FaultCodes?: string[];
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export const DescribeLabelGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LabelGroupName: S.optional(S.String),
    LabelGroupArn: S.optional(S.String),
    FaultCodes: S.optional(FaultCodes),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "DescribeLabelGroupResponse",
}) as any as S.Schema<DescribeLabelGroupResponse>;
export interface DescribeModelRequest {
  ModelName: string;
}
export const DescribeModelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ModelName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeModelRequest",
}) as any as S.Schema<DescribeModelRequest>;
export type SynthesizedJsonModelMetrics = string;
export type ModelVersionArn = string;
export type ModelVersion = number;
export type ModelVersionStatus =
  | "IN_PROGRESS"
  | "SUCCESS"
  | "FAILED"
  | "IMPORT_IN_PROGRESS"
  | "CANCELED"
  | (string & {});
export const ModelVersionStatus = /*@__PURE__*/ S.String;

export interface DescribeModelResponse {
  ModelName?: string;
  ModelArn?: string;
  DatasetName?: string;
  DatasetArn?: string;
  Schema?: string;
  LabelsInputConfiguration?: LabelsInputConfiguration;
  TrainingDataStartTime?: Date;
  TrainingDataEndTime?: Date;
  EvaluationDataStartTime?: Date;
  EvaluationDataEndTime?: Date;
  RoleArn?: string;
  DataPreProcessingConfiguration?: DataPreProcessingConfiguration;
  Status?: ModelStatus;
  TrainingExecutionStartTime?: Date;
  TrainingExecutionEndTime?: Date;
  FailedReason?: string;
  ModelMetrics?: string;
  LastUpdatedTime?: Date;
  CreatedAt?: Date;
  ServerSideKmsKeyId?: string;
  OffCondition?: string;
  SourceModelVersionArn?: string;
  ImportJobStartTime?: Date;
  ImportJobEndTime?: Date;
  ActiveModelVersion?: number;
  ActiveModelVersionArn?: string;
  ModelVersionActivatedAt?: Date;
  PreviousActiveModelVersion?: number;
  PreviousActiveModelVersionArn?: string;
  PreviousModelVersionActivatedAt?: Date;
  PriorModelMetrics?: string;
  LatestScheduledRetrainingFailedReason?: string;
  LatestScheduledRetrainingStatus?: ModelVersionStatus;
  LatestScheduledRetrainingModelVersion?: number;
  LatestScheduledRetrainingStartTime?: Date;
  LatestScheduledRetrainingAvailableDataInDays?: number;
  NextScheduledRetrainingStartDate?: Date;
  AccumulatedInferenceDataStartTime?: Date;
  AccumulatedInferenceDataEndTime?: Date;
  RetrainingSchedulerStatus?: RetrainingSchedulerStatus;
  ModelDiagnosticsOutputConfiguration?: ModelDiagnosticsOutputConfiguration;
  ModelQuality?: ModelQuality;
}
export const DescribeModelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ModelName: S.optional(S.String),
    ModelArn: S.optional(S.String),
    DatasetName: S.optional(S.String),
    DatasetArn: S.optional(S.String),
    Schema: S.optional(S.String),
    LabelsInputConfiguration: S.optional(LabelsInputConfiguration),
    TrainingDataStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    TrainingDataEndTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    EvaluationDataStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    EvaluationDataEndTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    RoleArn: S.optional(S.String),
    DataPreProcessingConfiguration: S.optional(DataPreProcessingConfiguration),
    Status: S.optional(ModelStatus),
    TrainingExecutionStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    TrainingExecutionEndTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    FailedReason: S.optional(S.String),
    ModelMetrics: S.optional(S.String),
    LastUpdatedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ServerSideKmsKeyId: S.optional(S.String),
    OffCondition: S.optional(S.String),
    SourceModelVersionArn: S.optional(S.String),
    ImportJobStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ImportJobEndTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ActiveModelVersion: S.optional(S.Number),
    ActiveModelVersionArn: S.optional(S.String),
    ModelVersionActivatedAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    PreviousActiveModelVersion: S.optional(S.Number),
    PreviousActiveModelVersionArn: S.optional(S.String),
    PreviousModelVersionActivatedAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    PriorModelMetrics: S.optional(S.String),
    LatestScheduledRetrainingFailedReason: S.optional(S.String),
    LatestScheduledRetrainingStatus: S.optional(ModelVersionStatus),
    LatestScheduledRetrainingModelVersion: S.optional(S.Number),
    LatestScheduledRetrainingStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LatestScheduledRetrainingAvailableDataInDays: S.optional(S.Number),
    NextScheduledRetrainingStartDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    AccumulatedInferenceDataStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    AccumulatedInferenceDataEndTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    RetrainingSchedulerStatus: S.optional(RetrainingSchedulerStatus),
    ModelDiagnosticsOutputConfiguration: S.optional(
      ModelDiagnosticsOutputConfiguration,
    ),
    ModelQuality: S.optional(ModelQuality),
  }),
).annotate({
  identifier: "DescribeModelResponse",
}) as any as S.Schema<DescribeModelResponse>;
export interface DescribeModelVersionRequest {
  ModelName: string;
  ModelVersion: number;
}
export const DescribeModelVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ModelName: S.String, ModelVersion: S.Number }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeModelVersionRequest",
}) as any as S.Schema<DescribeModelVersionRequest>;
export type ModelVersionSourceType =
  | "TRAINING"
  | "RETRAINING"
  | "IMPORT"
  | (string & {});
export const ModelVersionSourceType = /*@__PURE__*/ S.String;

export type InlineDataSchema = string;
export type ModelMetrics = string;
export type AutoPromotionResult =
  | "MODEL_PROMOTED"
  | "MODEL_NOT_PROMOTED"
  | "RETRAINING_INTERNAL_ERROR"
  | "RETRAINING_CUSTOMER_ERROR"
  | "RETRAINING_CANCELLED"
  | (string & {});
export const AutoPromotionResult = /*@__PURE__*/ S.String;

export type AutoPromotionResultReason = string;
export interface DescribeModelVersionResponse {
  ModelName?: string;
  ModelArn?: string;
  ModelVersion?: number;
  ModelVersionArn?: string;
  Status?: ModelVersionStatus;
  SourceType?: ModelVersionSourceType;
  DatasetName?: string;
  DatasetArn?: string;
  Schema?: string;
  LabelsInputConfiguration?: LabelsInputConfiguration;
  TrainingDataStartTime?: Date;
  TrainingDataEndTime?: Date;
  EvaluationDataStartTime?: Date;
  EvaluationDataEndTime?: Date;
  RoleArn?: string;
  DataPreProcessingConfiguration?: DataPreProcessingConfiguration;
  TrainingExecutionStartTime?: Date;
  TrainingExecutionEndTime?: Date;
  FailedReason?: string;
  ModelMetrics?: string;
  LastUpdatedTime?: Date;
  CreatedAt?: Date;
  ServerSideKmsKeyId?: string;
  OffCondition?: string;
  SourceModelVersionArn?: string;
  ImportJobStartTime?: Date;
  ImportJobEndTime?: Date;
  ImportedDataSizeInBytes?: number;
  PriorModelMetrics?: string;
  RetrainingAvailableDataInDays?: number;
  AutoPromotionResult?: AutoPromotionResult;
  AutoPromotionResultReason?: string;
  ModelDiagnosticsOutputConfiguration?: ModelDiagnosticsOutputConfiguration;
  ModelDiagnosticsResultsObject?: S3Object;
  ModelQuality?: ModelQuality;
}
export const DescribeModelVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ModelName: S.optional(S.String),
    ModelArn: S.optional(S.String),
    ModelVersion: S.optional(S.Number),
    ModelVersionArn: S.optional(S.String),
    Status: S.optional(ModelVersionStatus),
    SourceType: S.optional(ModelVersionSourceType),
    DatasetName: S.optional(S.String),
    DatasetArn: S.optional(S.String),
    Schema: S.optional(S.String),
    LabelsInputConfiguration: S.optional(LabelsInputConfiguration),
    TrainingDataStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    TrainingDataEndTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    EvaluationDataStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    EvaluationDataEndTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    RoleArn: S.optional(S.String),
    DataPreProcessingConfiguration: S.optional(DataPreProcessingConfiguration),
    TrainingExecutionStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    TrainingExecutionEndTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    FailedReason: S.optional(S.String),
    ModelMetrics: S.optional(S.String),
    LastUpdatedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ServerSideKmsKeyId: S.optional(S.String),
    OffCondition: S.optional(S.String),
    SourceModelVersionArn: S.optional(S.String),
    ImportJobStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ImportJobEndTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ImportedDataSizeInBytes: S.optional(S.Number),
    PriorModelMetrics: S.optional(S.String),
    RetrainingAvailableDataInDays: S.optional(S.Number),
    AutoPromotionResult: S.optional(AutoPromotionResult),
    AutoPromotionResultReason: S.optional(S.String),
    ModelDiagnosticsOutputConfiguration: S.optional(
      ModelDiagnosticsOutputConfiguration,
    ),
    ModelDiagnosticsResultsObject: S.optional(S3Object),
    ModelQuality: S.optional(ModelQuality),
  }),
).annotate({
  identifier: "DescribeModelVersionResponse",
}) as any as S.Schema<DescribeModelVersionResponse>;
export interface DescribeResourcePolicyRequest {
  ResourceArn: string;
}
export const DescribeResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeResourcePolicyRequest",
}) as any as S.Schema<DescribeResourcePolicyRequest>;
export type PolicyRevisionId = string;
export type Policy = string;
export interface DescribeResourcePolicyResponse {
  PolicyRevisionId?: string;
  ResourcePolicy?: string;
  CreationTime?: Date;
  LastModifiedTime?: Date;
}
export const DescribeResourcePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PolicyRevisionId: S.optional(S.String),
    ResourcePolicy: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "DescribeResourcePolicyResponse",
}) as any as S.Schema<DescribeResourcePolicyResponse>;
export interface DescribeRetrainingSchedulerRequest {
  ModelName: string;
}
export const DescribeRetrainingSchedulerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ModelName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeRetrainingSchedulerRequest",
}) as any as S.Schema<DescribeRetrainingSchedulerRequest>;
export interface DescribeRetrainingSchedulerResponse {
  ModelName?: string;
  ModelArn?: string;
  RetrainingStartDate?: Date;
  RetrainingFrequency?: string;
  LookbackWindow?: string;
  Status?: RetrainingSchedulerStatus;
  PromoteMode?: ModelPromoteMode;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export const DescribeRetrainingSchedulerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ModelName: S.optional(S.String),
    ModelArn: S.optional(S.String),
    RetrainingStartDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    RetrainingFrequency: S.optional(S.String),
    LookbackWindow: S.optional(S.String),
    Status: S.optional(RetrainingSchedulerStatus),
    PromoteMode: S.optional(ModelPromoteMode),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "DescribeRetrainingSchedulerResponse",
}) as any as S.Schema<DescribeRetrainingSchedulerResponse>;
export interface ImportDatasetRequest {
  SourceDatasetArn: string;
  DatasetName?: string;
  ClientToken: string;
  ServerSideKmsKeyId?: string;
  Tags?: Tag[];
}
export const ImportDatasetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceDatasetArn: S.String,
    DatasetName: S.optional(S.String),
    ClientToken: S.String.pipe(T.IdempotencyToken()),
    ServerSideKmsKeyId: S.optional(S.String),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ImportDatasetRequest",
}) as any as S.Schema<ImportDatasetRequest>;
export interface ImportDatasetResponse {
  DatasetName?: string;
  DatasetArn?: string;
  Status?: DatasetStatus;
  JobId?: string;
}
export const ImportDatasetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatasetName: S.optional(S.String),
    DatasetArn: S.optional(S.String),
    Status: S.optional(DatasetStatus),
    JobId: S.optional(S.String),
  }),
).annotate({
  identifier: "ImportDatasetResponse",
}) as any as S.Schema<ImportDatasetResponse>;
export type InferenceDataImportStrategy =
  | "NO_IMPORT"
  | "ADD_WHEN_EMPTY"
  | "OVERWRITE"
  | (string & {});
export const InferenceDataImportStrategy = /*@__PURE__*/ S.String;

export interface ImportModelVersionRequest {
  SourceModelVersionArn: string;
  ModelName?: string;
  DatasetName: string;
  LabelsInputConfiguration?: LabelsInputConfiguration;
  ClientToken: string;
  RoleArn?: string;
  ServerSideKmsKeyId?: string;
  Tags?: Tag[];
  InferenceDataImportStrategy?: InferenceDataImportStrategy;
}
export const ImportModelVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceModelVersionArn: S.String,
    ModelName: S.optional(S.String),
    DatasetName: S.String,
    LabelsInputConfiguration: S.optional(LabelsInputConfiguration),
    ClientToken: S.String.pipe(T.IdempotencyToken()),
    RoleArn: S.optional(S.String),
    ServerSideKmsKeyId: S.optional(S.String),
    Tags: S.optional(TagList),
    InferenceDataImportStrategy: S.optional(InferenceDataImportStrategy),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ImportModelVersionRequest",
}) as any as S.Schema<ImportModelVersionRequest>;
export interface ImportModelVersionResponse {
  ModelName?: string;
  ModelArn?: string;
  ModelVersionArn?: string;
  ModelVersion?: number;
  Status?: ModelVersionStatus;
}
export const ImportModelVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ModelName: S.optional(S.String),
    ModelArn: S.optional(S.String),
    ModelVersionArn: S.optional(S.String),
    ModelVersion: S.optional(S.Number),
    Status: S.optional(ModelVersionStatus),
  }),
).annotate({
  identifier: "ImportModelVersionResponse",
}) as any as S.Schema<ImportModelVersionResponse>;
export type NextToken = string;
export type MaxResults = number;
export interface ListDataIngestionJobsRequest {
  DatasetName?: string;
  NextToken?: string;
  MaxResults?: number;
  Status?: IngestionJobStatus;
}
export const ListDataIngestionJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatasetName: S.optional(S.String),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    Status: S.optional(IngestionJobStatus),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListDataIngestionJobsRequest",
}) as any as S.Schema<ListDataIngestionJobsRequest>;
export interface DataIngestionJobSummary {
  JobId?: string;
  DatasetName?: string;
  DatasetArn?: string;
  IngestionInputConfiguration?: IngestionInputConfiguration;
  Status?: IngestionJobStatus;
}
export const DataIngestionJobSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobId: S.optional(S.String),
    DatasetName: S.optional(S.String),
    DatasetArn: S.optional(S.String),
    IngestionInputConfiguration: S.optional(IngestionInputConfiguration),
    Status: S.optional(IngestionJobStatus),
  }),
).annotate({
  identifier: "DataIngestionJobSummary",
}) as any as S.Schema<DataIngestionJobSummary>;
export type DataIngestionJobSummaries = DataIngestionJobSummary[];
export const DataIngestionJobSummaries = /*@__PURE__*/ S.Array(
  DataIngestionJobSummary,
);
export interface ListDataIngestionJobsResponse {
  NextToken?: string;
  DataIngestionJobSummaries?: DataIngestionJobSummary[];
}
export const ListDataIngestionJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    DataIngestionJobSummaries: S.optional(DataIngestionJobSummaries),
  }),
).annotate({
  identifier: "ListDataIngestionJobsResponse",
}) as any as S.Schema<ListDataIngestionJobsResponse>;
export interface ListDatasetsRequest {
  NextToken?: string;
  MaxResults?: number;
  DatasetNameBeginsWith?: string;
}
export const ListDatasetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    DatasetNameBeginsWith: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListDatasetsRequest",
}) as any as S.Schema<ListDatasetsRequest>;
export interface DatasetSummary {
  DatasetName?: string;
  DatasetArn?: string;
  Status?: DatasetStatus;
  CreatedAt?: Date;
}
export const DatasetSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatasetName: S.optional(S.String),
    DatasetArn: S.optional(S.String),
    Status: S.optional(DatasetStatus),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "DatasetSummary" }) as any as S.Schema<DatasetSummary>;
export type DatasetSummaries = DatasetSummary[];
export const DatasetSummaries = /*@__PURE__*/ S.Array(DatasetSummary);
export interface ListDatasetsResponse {
  NextToken?: string;
  DatasetSummaries?: DatasetSummary[];
}
export const ListDatasetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    DatasetSummaries: S.optional(DatasetSummaries),
  }),
).annotate({
  identifier: "ListDatasetsResponse",
}) as any as S.Schema<ListDatasetsResponse>;
export interface ListInferenceEventsRequest {
  NextToken?: string;
  MaxResults?: number;
  InferenceSchedulerName: string;
  IntervalStartTime: Date;
  IntervalEndTime: Date;
}
export const ListInferenceEventsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    InferenceSchedulerName: S.String,
    IntervalStartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    IntervalEndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListInferenceEventsRequest",
}) as any as S.Schema<ListInferenceEventsRequest>;
export type EventDurationInSeconds = number;
export interface InferenceEventSummary {
  InferenceSchedulerArn?: string;
  InferenceSchedulerName?: string;
  EventStartTime?: Date;
  EventEndTime?: Date;
  Diagnostics?: string;
  EventDurationInSeconds?: number;
}
export const InferenceEventSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InferenceSchedulerArn: S.optional(S.String),
    InferenceSchedulerName: S.optional(S.String),
    EventStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EventEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Diagnostics: S.optional(S.String),
    EventDurationInSeconds: S.optional(S.Number),
  }),
).annotate({
  identifier: "InferenceEventSummary",
}) as any as S.Schema<InferenceEventSummary>;
export type InferenceEventSummaries = InferenceEventSummary[];
export const InferenceEventSummaries = /*@__PURE__*/ S.Array(
  InferenceEventSummary,
);
export interface ListInferenceEventsResponse {
  NextToken?: string;
  InferenceEventSummaries?: InferenceEventSummary[];
}
export const ListInferenceEventsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    InferenceEventSummaries: S.optional(InferenceEventSummaries),
  }),
).annotate({
  identifier: "ListInferenceEventsResponse",
}) as any as S.Schema<ListInferenceEventsResponse>;
export type InferenceExecutionStatus =
  | "IN_PROGRESS"
  | "SUCCESS"
  | "FAILED"
  | (string & {});
export const InferenceExecutionStatus = /*@__PURE__*/ S.String;

export interface ListInferenceExecutionsRequest {
  NextToken?: string;
  MaxResults?: number;
  InferenceSchedulerName: string;
  DataStartTimeAfter?: Date;
  DataEndTimeBefore?: Date;
  Status?: InferenceExecutionStatus;
}
export const ListInferenceExecutionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    InferenceSchedulerName: S.String,
    DataStartTimeAfter: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    DataEndTimeBefore: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Status: S.optional(InferenceExecutionStatus),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListInferenceExecutionsRequest",
}) as any as S.Schema<ListInferenceExecutionsRequest>;
export interface InferenceExecutionSummary {
  ModelName?: string;
  ModelArn?: string;
  InferenceSchedulerName?: string;
  InferenceSchedulerArn?: string;
  ScheduledStartTime?: Date;
  DataStartTime?: Date;
  DataEndTime?: Date;
  DataInputConfiguration?: InferenceInputConfiguration;
  DataOutputConfiguration?: InferenceOutputConfiguration;
  CustomerResultObject?: S3Object;
  Status?: InferenceExecutionStatus;
  FailedReason?: string;
  ModelVersion?: number;
  ModelVersionArn?: string;
}
export const InferenceExecutionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ModelName: S.optional(S.String),
    ModelArn: S.optional(S.String),
    InferenceSchedulerName: S.optional(S.String),
    InferenceSchedulerArn: S.optional(S.String),
    ScheduledStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    DataStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DataEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DataInputConfiguration: S.optional(InferenceInputConfiguration),
    DataOutputConfiguration: S.optional(InferenceOutputConfiguration),
    CustomerResultObject: S.optional(S3Object),
    Status: S.optional(InferenceExecutionStatus),
    FailedReason: S.optional(S.String),
    ModelVersion: S.optional(S.Number),
    ModelVersionArn: S.optional(S.String),
  }),
).annotate({
  identifier: "InferenceExecutionSummary",
}) as any as S.Schema<InferenceExecutionSummary>;
export type InferenceExecutionSummaries = InferenceExecutionSummary[];
export const InferenceExecutionSummaries = /*@__PURE__*/ S.Array(
  InferenceExecutionSummary,
);
export interface ListInferenceExecutionsResponse {
  NextToken?: string;
  InferenceExecutionSummaries?: InferenceExecutionSummary[];
}
export const ListInferenceExecutionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    InferenceExecutionSummaries: S.optional(InferenceExecutionSummaries),
  }),
).annotate({
  identifier: "ListInferenceExecutionsResponse",
}) as any as S.Schema<ListInferenceExecutionsResponse>;
export interface ListInferenceSchedulersRequest {
  NextToken?: string;
  MaxResults?: number;
  InferenceSchedulerNameBeginsWith?: string;
  ModelName?: string;
  Status?: InferenceSchedulerStatus;
}
export const ListInferenceSchedulersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    InferenceSchedulerNameBeginsWith: S.optional(S.String),
    ModelName: S.optional(S.String),
    Status: S.optional(InferenceSchedulerStatus),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListInferenceSchedulersRequest",
}) as any as S.Schema<ListInferenceSchedulersRequest>;
export interface InferenceSchedulerSummary {
  ModelName?: string;
  ModelArn?: string;
  InferenceSchedulerName?: string;
  InferenceSchedulerArn?: string;
  Status?: InferenceSchedulerStatus;
  DataDelayOffsetInMinutes?: number;
  DataUploadFrequency?: DataUploadFrequency;
  LatestInferenceResult?: LatestInferenceResult;
}
export const InferenceSchedulerSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ModelName: S.optional(S.String),
    ModelArn: S.optional(S.String),
    InferenceSchedulerName: S.optional(S.String),
    InferenceSchedulerArn: S.optional(S.String),
    Status: S.optional(InferenceSchedulerStatus),
    DataDelayOffsetInMinutes: S.optional(S.Number),
    DataUploadFrequency: S.optional(DataUploadFrequency),
    LatestInferenceResult: S.optional(LatestInferenceResult),
  }),
).annotate({
  identifier: "InferenceSchedulerSummary",
}) as any as S.Schema<InferenceSchedulerSummary>;
export type InferenceSchedulerSummaries = InferenceSchedulerSummary[];
export const InferenceSchedulerSummaries = /*@__PURE__*/ S.Array(
  InferenceSchedulerSummary,
);
export interface ListInferenceSchedulersResponse {
  NextToken?: string;
  InferenceSchedulerSummaries?: InferenceSchedulerSummary[];
}
export const ListInferenceSchedulersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    InferenceSchedulerSummaries: S.optional(InferenceSchedulerSummaries),
  }),
).annotate({
  identifier: "ListInferenceSchedulersResponse",
}) as any as S.Schema<ListInferenceSchedulersResponse>;
export interface ListLabelGroupsRequest {
  LabelGroupNameBeginsWith?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListLabelGroupsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LabelGroupNameBeginsWith: S.optional(S.String),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListLabelGroupsRequest",
}) as any as S.Schema<ListLabelGroupsRequest>;
export interface LabelGroupSummary {
  LabelGroupName?: string;
  LabelGroupArn?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export const LabelGroupSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LabelGroupName: S.optional(S.String),
    LabelGroupArn: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "LabelGroupSummary",
}) as any as S.Schema<LabelGroupSummary>;
export type LabelGroupSummaries = LabelGroupSummary[];
export const LabelGroupSummaries = /*@__PURE__*/ S.Array(LabelGroupSummary);
export interface ListLabelGroupsResponse {
  NextToken?: string;
  LabelGroupSummaries?: LabelGroupSummary[];
}
export const ListLabelGroupsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    LabelGroupSummaries: S.optional(LabelGroupSummaries),
  }),
).annotate({
  identifier: "ListLabelGroupsResponse",
}) as any as S.Schema<ListLabelGroupsResponse>;
export interface ListLabelsRequest {
  LabelGroupName: string;
  IntervalStartTime?: Date;
  IntervalEndTime?: Date;
  FaultCode?: string;
  Equipment?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListLabelsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LabelGroupName: S.String,
    IntervalStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    IntervalEndTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    FaultCode: S.optional(S.String),
    Equipment: S.optional(S.String),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListLabelsRequest",
}) as any as S.Schema<ListLabelsRequest>;
export interface LabelSummary {
  LabelGroupName?: string;
  LabelId?: string;
  LabelGroupArn?: string;
  StartTime?: Date;
  EndTime?: Date;
  Rating?: LabelRating;
  FaultCode?: string;
  Equipment?: string;
  CreatedAt?: Date;
}
export const LabelSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LabelGroupName: S.optional(S.String),
    LabelId: S.optional(S.String),
    LabelGroupArn: S.optional(S.String),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Rating: S.optional(LabelRating),
    FaultCode: S.optional(S.String),
    Equipment: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "LabelSummary" }) as any as S.Schema<LabelSummary>;
export type LabelSummaries = LabelSummary[];
export const LabelSummaries = /*@__PURE__*/ S.Array(LabelSummary);
export interface ListLabelsResponse {
  NextToken?: string;
  LabelSummaries?: LabelSummary[];
}
export const ListLabelsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    LabelSummaries: S.optional(LabelSummaries),
  }),
).annotate({
  identifier: "ListLabelsResponse",
}) as any as S.Schema<ListLabelsResponse>;
export interface ListModelsRequest {
  NextToken?: string;
  MaxResults?: number;
  Status?: ModelStatus;
  ModelNameBeginsWith?: string;
  DatasetNameBeginsWith?: string;
}
export const ListModelsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    Status: S.optional(ModelStatus),
    ModelNameBeginsWith: S.optional(S.String),
    DatasetNameBeginsWith: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListModelsRequest",
}) as any as S.Schema<ListModelsRequest>;
export interface ModelSummary {
  ModelName?: string;
  ModelArn?: string;
  DatasetName?: string;
  DatasetArn?: string;
  Status?: ModelStatus;
  CreatedAt?: Date;
  ActiveModelVersion?: number;
  ActiveModelVersionArn?: string;
  LatestScheduledRetrainingStatus?: ModelVersionStatus;
  LatestScheduledRetrainingModelVersion?: number;
  LatestScheduledRetrainingStartTime?: Date;
  NextScheduledRetrainingStartDate?: Date;
  RetrainingSchedulerStatus?: RetrainingSchedulerStatus;
  ModelDiagnosticsOutputConfiguration?: ModelDiagnosticsOutputConfiguration;
  ModelQuality?: ModelQuality;
}
export const ModelSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ModelName: S.optional(S.String),
    ModelArn: S.optional(S.String),
    DatasetName: S.optional(S.String),
    DatasetArn: S.optional(S.String),
    Status: S.optional(ModelStatus),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ActiveModelVersion: S.optional(S.Number),
    ActiveModelVersionArn: S.optional(S.String),
    LatestScheduledRetrainingStatus: S.optional(ModelVersionStatus),
    LatestScheduledRetrainingModelVersion: S.optional(S.Number),
    LatestScheduledRetrainingStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    NextScheduledRetrainingStartDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    RetrainingSchedulerStatus: S.optional(RetrainingSchedulerStatus),
    ModelDiagnosticsOutputConfiguration: S.optional(
      ModelDiagnosticsOutputConfiguration,
    ),
    ModelQuality: S.optional(ModelQuality),
  }),
).annotate({ identifier: "ModelSummary" }) as any as S.Schema<ModelSummary>;
export type ModelSummaries = ModelSummary[];
export const ModelSummaries = /*@__PURE__*/ S.Array(ModelSummary);
export interface ListModelsResponse {
  NextToken?: string;
  ModelSummaries?: ModelSummary[];
}
export const ListModelsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    ModelSummaries: S.optional(ModelSummaries),
  }),
).annotate({
  identifier: "ListModelsResponse",
}) as any as S.Schema<ListModelsResponse>;
export interface ListModelVersionsRequest {
  ModelName: string;
  NextToken?: string;
  MaxResults?: number;
  Status?: ModelVersionStatus;
  SourceType?: ModelVersionSourceType;
  CreatedAtEndTime?: Date;
  CreatedAtStartTime?: Date;
  MaxModelVersion?: number;
  MinModelVersion?: number;
}
export const ListModelVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ModelName: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    Status: S.optional(ModelVersionStatus),
    SourceType: S.optional(ModelVersionSourceType),
    CreatedAtEndTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    CreatedAtStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    MaxModelVersion: S.optional(S.Number),
    MinModelVersion: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListModelVersionsRequest",
}) as any as S.Schema<ListModelVersionsRequest>;
export interface ModelVersionSummary {
  ModelName?: string;
  ModelArn?: string;
  ModelVersion?: number;
  ModelVersionArn?: string;
  CreatedAt?: Date;
  Status?: ModelVersionStatus;
  SourceType?: ModelVersionSourceType;
  ModelQuality?: ModelQuality;
}
export const ModelVersionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ModelName: S.optional(S.String),
    ModelArn: S.optional(S.String),
    ModelVersion: S.optional(S.Number),
    ModelVersionArn: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Status: S.optional(ModelVersionStatus),
    SourceType: S.optional(ModelVersionSourceType),
    ModelQuality: S.optional(ModelQuality),
  }),
).annotate({
  identifier: "ModelVersionSummary",
}) as any as S.Schema<ModelVersionSummary>;
export type ModelVersionSummaries = ModelVersionSummary[];
export const ModelVersionSummaries = /*@__PURE__*/ S.Array(ModelVersionSummary);
export interface ListModelVersionsResponse {
  NextToken?: string;
  ModelVersionSummaries?: ModelVersionSummary[];
}
export const ListModelVersionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    ModelVersionSummaries: S.optional(ModelVersionSummaries),
  }),
).annotate({
  identifier: "ListModelVersionsResponse",
}) as any as S.Schema<ListModelVersionsResponse>;
export interface ListRetrainingSchedulersRequest {
  ModelNameBeginsWith?: string;
  Status?: RetrainingSchedulerStatus;
  NextToken?: string;
  MaxResults?: number;
}
export const ListRetrainingSchedulersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ModelNameBeginsWith: S.optional(S.String),
    Status: S.optional(RetrainingSchedulerStatus),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListRetrainingSchedulersRequest",
}) as any as S.Schema<ListRetrainingSchedulersRequest>;
export interface RetrainingSchedulerSummary {
  ModelName?: string;
  ModelArn?: string;
  Status?: RetrainingSchedulerStatus;
  RetrainingStartDate?: Date;
  RetrainingFrequency?: string;
  LookbackWindow?: string;
}
export const RetrainingSchedulerSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ModelName: S.optional(S.String),
    ModelArn: S.optional(S.String),
    Status: S.optional(RetrainingSchedulerStatus),
    RetrainingStartDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    RetrainingFrequency: S.optional(S.String),
    LookbackWindow: S.optional(S.String),
  }),
).annotate({
  identifier: "RetrainingSchedulerSummary",
}) as any as S.Schema<RetrainingSchedulerSummary>;
export type RetrainingSchedulerSummaries = RetrainingSchedulerSummary[];
export const RetrainingSchedulerSummaries = /*@__PURE__*/ S.Array(
  RetrainingSchedulerSummary,
);
export interface ListRetrainingSchedulersResponse {
  RetrainingSchedulerSummaries?: RetrainingSchedulerSummary[];
  NextToken?: string;
}
export const ListRetrainingSchedulersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RetrainingSchedulerSummaries: S.optional(RetrainingSchedulerSummaries),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListRetrainingSchedulersResponse",
}) as any as S.Schema<ListRetrainingSchedulersResponse>;
export interface ListSensorStatisticsRequest {
  DatasetName: string;
  IngestionJobId?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListSensorStatisticsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatasetName: S.String,
    IngestionJobId: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListSensorStatisticsRequest",
}) as any as S.Schema<ListSensorStatisticsRequest>;
export type ComponentName = string;
export type SensorName = string;
export interface CountPercent {
  Count: number;
  Percentage: number;
}
export const CountPercent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Count: S.Number, Percentage: S.Number }),
).annotate({ identifier: "CountPercent" }) as any as S.Schema<CountPercent>;
export type StatisticalIssueStatus =
  | "POTENTIAL_ISSUE_DETECTED"
  | "NO_ISSUE_DETECTED"
  | (string & {});
export const StatisticalIssueStatus = /*@__PURE__*/ S.String;

export interface CategoricalValues {
  Status: StatisticalIssueStatus;
  NumberOfCategory?: number;
}
export const CategoricalValues = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: StatisticalIssueStatus,
    NumberOfCategory: S.optional(S.Number),
  }),
).annotate({
  identifier: "CategoricalValues",
}) as any as S.Schema<CategoricalValues>;
export interface MultipleOperatingModes {
  Status: StatisticalIssueStatus;
}
export const MultipleOperatingModes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Status: StatisticalIssueStatus }),
).annotate({
  identifier: "MultipleOperatingModes",
}) as any as S.Schema<MultipleOperatingModes>;
export interface LargeTimestampGaps {
  Status: StatisticalIssueStatus;
  NumberOfLargeTimestampGaps?: number;
  MaxTimestampGapInDays?: number;
}
export const LargeTimestampGaps = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: StatisticalIssueStatus,
    NumberOfLargeTimestampGaps: S.optional(S.Number),
    MaxTimestampGapInDays: S.optional(S.Number),
  }),
).annotate({
  identifier: "LargeTimestampGaps",
}) as any as S.Schema<LargeTimestampGaps>;
export type Monotonicity =
  | "DECREASING"
  | "INCREASING"
  | "STATIC"
  | (string & {});
export const Monotonicity = /*@__PURE__*/ S.String;

export interface MonotonicValues {
  Status: StatisticalIssueStatus;
  Monotonicity?: Monotonicity;
}
export const MonotonicValues = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: StatisticalIssueStatus,
    Monotonicity: S.optional(Monotonicity),
  }),
).annotate({
  identifier: "MonotonicValues",
}) as any as S.Schema<MonotonicValues>;
export interface SensorStatisticsSummary {
  ComponentName?: string;
  SensorName?: string;
  DataExists?: boolean;
  MissingValues?: CountPercent;
  InvalidValues?: CountPercent;
  InvalidDateEntries?: CountPercent;
  DuplicateTimestamps?: CountPercent;
  CategoricalValues?: CategoricalValues;
  MultipleOperatingModes?: MultipleOperatingModes;
  LargeTimestampGaps?: LargeTimestampGaps;
  MonotonicValues?: MonotonicValues;
  DataStartTime?: Date;
  DataEndTime?: Date;
}
export const SensorStatisticsSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ComponentName: S.optional(S.String),
    SensorName: S.optional(S.String),
    DataExists: S.optional(S.Boolean),
    MissingValues: S.optional(CountPercent),
    InvalidValues: S.optional(CountPercent),
    InvalidDateEntries: S.optional(CountPercent),
    DuplicateTimestamps: S.optional(CountPercent),
    CategoricalValues: S.optional(CategoricalValues),
    MultipleOperatingModes: S.optional(MultipleOperatingModes),
    LargeTimestampGaps: S.optional(LargeTimestampGaps),
    MonotonicValues: S.optional(MonotonicValues),
    DataStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DataEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "SensorStatisticsSummary",
}) as any as S.Schema<SensorStatisticsSummary>;
export type SensorStatisticsSummaries = SensorStatisticsSummary[];
export const SensorStatisticsSummaries = /*@__PURE__*/ S.Array(
  SensorStatisticsSummary,
);
export interface ListSensorStatisticsResponse {
  SensorStatisticsSummaries?: SensorStatisticsSummary[];
  NextToken?: string;
}
export const ListSensorStatisticsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SensorStatisticsSummaries: S.optional(SensorStatisticsSummaries),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSensorStatisticsResponse",
}) as any as S.Schema<ListSensorStatisticsResponse>;
export type AmazonResourceArn = string;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(TagList) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface PutResourcePolicyRequest {
  ResourceArn: string;
  ResourcePolicy: string;
  PolicyRevisionId?: string;
  ClientToken: string;
}
export const PutResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String,
    ResourcePolicy: S.String,
    PolicyRevisionId: S.optional(S.String),
    ClientToken: S.String.pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "PutResourcePolicyRequest",
}) as any as S.Schema<PutResourcePolicyRequest>;
export interface PutResourcePolicyResponse {
  ResourceArn?: string;
  PolicyRevisionId?: string;
}
export const PutResourcePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.optional(S.String),
    PolicyRevisionId: S.optional(S.String),
  }),
).annotate({
  identifier: "PutResourcePolicyResponse",
}) as any as S.Schema<PutResourcePolicyResponse>;
export interface StartDataIngestionJobRequest {
  DatasetName: string;
  IngestionInputConfiguration: IngestionInputConfiguration;
  RoleArn: string;
  ClientToken: string;
}
export const StartDataIngestionJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatasetName: S.String,
    IngestionInputConfiguration: IngestionInputConfiguration,
    RoleArn: S.String,
    ClientToken: S.String.pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartDataIngestionJobRequest",
}) as any as S.Schema<StartDataIngestionJobRequest>;
export interface StartDataIngestionJobResponse {
  JobId?: string;
  Status?: IngestionJobStatus;
}
export const StartDataIngestionJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobId: S.optional(S.String),
    Status: S.optional(IngestionJobStatus),
  }),
).annotate({
  identifier: "StartDataIngestionJobResponse",
}) as any as S.Schema<StartDataIngestionJobResponse>;
export interface StartInferenceSchedulerRequest {
  InferenceSchedulerName: string;
}
export const StartInferenceSchedulerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InferenceSchedulerName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartInferenceSchedulerRequest",
}) as any as S.Schema<StartInferenceSchedulerRequest>;
export interface StartInferenceSchedulerResponse {
  ModelArn?: string;
  ModelName?: string;
  InferenceSchedulerName?: string;
  InferenceSchedulerArn?: string;
  Status?: InferenceSchedulerStatus;
}
export const StartInferenceSchedulerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ModelArn: S.optional(S.String),
    ModelName: S.optional(S.String),
    InferenceSchedulerName: S.optional(S.String),
    InferenceSchedulerArn: S.optional(S.String),
    Status: S.optional(InferenceSchedulerStatus),
  }),
).annotate({
  identifier: "StartInferenceSchedulerResponse",
}) as any as S.Schema<StartInferenceSchedulerResponse>;
export interface StartRetrainingSchedulerRequest {
  ModelName: string;
}
export const StartRetrainingSchedulerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ModelName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartRetrainingSchedulerRequest",
}) as any as S.Schema<StartRetrainingSchedulerRequest>;
export interface StartRetrainingSchedulerResponse {
  ModelName?: string;
  ModelArn?: string;
  Status?: RetrainingSchedulerStatus;
}
export const StartRetrainingSchedulerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ModelName: S.optional(S.String),
    ModelArn: S.optional(S.String),
    Status: S.optional(RetrainingSchedulerStatus),
  }),
).annotate({
  identifier: "StartRetrainingSchedulerResponse",
}) as any as S.Schema<StartRetrainingSchedulerResponse>;
export interface StopInferenceSchedulerRequest {
  InferenceSchedulerName: string;
}
export const StopInferenceSchedulerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InferenceSchedulerName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StopInferenceSchedulerRequest",
}) as any as S.Schema<StopInferenceSchedulerRequest>;
export interface StopInferenceSchedulerResponse {
  ModelArn?: string;
  ModelName?: string;
  InferenceSchedulerName?: string;
  InferenceSchedulerArn?: string;
  Status?: InferenceSchedulerStatus;
}
export const StopInferenceSchedulerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ModelArn: S.optional(S.String),
    ModelName: S.optional(S.String),
    InferenceSchedulerName: S.optional(S.String),
    InferenceSchedulerArn: S.optional(S.String),
    Status: S.optional(InferenceSchedulerStatus),
  }),
).annotate({
  identifier: "StopInferenceSchedulerResponse",
}) as any as S.Schema<StopInferenceSchedulerResponse>;
export interface StopRetrainingSchedulerRequest {
  ModelName: string;
}
export const StopRetrainingSchedulerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ModelName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StopRetrainingSchedulerRequest",
}) as any as S.Schema<StopRetrainingSchedulerRequest>;
export interface StopRetrainingSchedulerResponse {
  ModelName?: string;
  ModelArn?: string;
  Status?: RetrainingSchedulerStatus;
}
export const StopRetrainingSchedulerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ModelName: S.optional(S.String),
    ModelArn: S.optional(S.String),
    Status: S.optional(RetrainingSchedulerStatus),
  }),
).annotate({
  identifier: "StopRetrainingSchedulerResponse",
}) as any as S.Schema<StopRetrainingSchedulerResponse>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String, Tags: TagList }).pipe(
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
  ResourceArn: string;
  TagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String, TagKeys: TagKeyList }).pipe(
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
export interface UpdateActiveModelVersionRequest {
  ModelName: string;
  ModelVersion: number;
}
export const UpdateActiveModelVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ModelName: S.String, ModelVersion: S.Number }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateActiveModelVersionRequest",
}) as any as S.Schema<UpdateActiveModelVersionRequest>;
export interface UpdateActiveModelVersionResponse {
  ModelName?: string;
  ModelArn?: string;
  CurrentActiveVersion?: number;
  PreviousActiveVersion?: number;
  CurrentActiveVersionArn?: string;
  PreviousActiveVersionArn?: string;
}
export const UpdateActiveModelVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ModelName: S.optional(S.String),
    ModelArn: S.optional(S.String),
    CurrentActiveVersion: S.optional(S.Number),
    PreviousActiveVersion: S.optional(S.Number),
    CurrentActiveVersionArn: S.optional(S.String),
    PreviousActiveVersionArn: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateActiveModelVersionResponse",
}) as any as S.Schema<UpdateActiveModelVersionResponse>;
export interface UpdateInferenceSchedulerRequest {
  InferenceSchedulerName: string;
  DataDelayOffsetInMinutes?: number;
  DataUploadFrequency?: DataUploadFrequency;
  DataInputConfiguration?: InferenceInputConfiguration;
  DataOutputConfiguration?: InferenceOutputConfiguration;
  RoleArn?: string;
}
export const UpdateInferenceSchedulerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InferenceSchedulerName: S.String,
    DataDelayOffsetInMinutes: S.optional(S.Number),
    DataUploadFrequency: S.optional(DataUploadFrequency),
    DataInputConfiguration: S.optional(InferenceInputConfiguration),
    DataOutputConfiguration: S.optional(InferenceOutputConfiguration),
    RoleArn: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateInferenceSchedulerRequest",
}) as any as S.Schema<UpdateInferenceSchedulerRequest>;
export interface UpdateInferenceSchedulerResponse {}
export const UpdateInferenceSchedulerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateInferenceSchedulerResponse",
}) as any as S.Schema<UpdateInferenceSchedulerResponse>;
export interface UpdateLabelGroupRequest {
  LabelGroupName: string;
  FaultCodes?: string[];
}
export const UpdateLabelGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LabelGroupName: S.String,
    FaultCodes: S.optional(FaultCodes),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateLabelGroupRequest",
}) as any as S.Schema<UpdateLabelGroupRequest>;
export interface UpdateLabelGroupResponse {}
export const UpdateLabelGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateLabelGroupResponse",
}) as any as S.Schema<UpdateLabelGroupResponse>;
export interface UpdateModelRequest {
  ModelName: string;
  LabelsInputConfiguration?: LabelsInputConfiguration;
  RoleArn?: string;
  ModelDiagnosticsOutputConfiguration?: ModelDiagnosticsOutputConfiguration;
}
export const UpdateModelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ModelName: S.String,
    LabelsInputConfiguration: S.optional(LabelsInputConfiguration),
    RoleArn: S.optional(S.String),
    ModelDiagnosticsOutputConfiguration: S.optional(
      ModelDiagnosticsOutputConfiguration,
    ),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateModelRequest",
}) as any as S.Schema<UpdateModelRequest>;
export interface UpdateModelResponse {}
export const UpdateModelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateModelResponse",
}) as any as S.Schema<UpdateModelResponse>;
export interface UpdateRetrainingSchedulerRequest {
  ModelName: string;
  RetrainingStartDate?: Date;
  RetrainingFrequency?: string;
  LookbackWindow?: string;
  PromoteMode?: ModelPromoteMode;
}
export const UpdateRetrainingSchedulerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ModelName: S.String,
    RetrainingStartDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    RetrainingFrequency: S.optional(S.String),
    LookbackWindow: S.optional(S.String),
    PromoteMode: S.optional(ModelPromoteMode),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateRetrainingSchedulerRequest",
}) as any as S.Schema<UpdateRetrainingSchedulerRequest>;
export interface UpdateRetrainingSchedulerResponse {}
export const UpdateRetrainingSchedulerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateRetrainingSchedulerResponse",
}) as any as S.Schema<UpdateRetrainingSchedulerResponse>;
export type CreateDatasetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a container for a collection of data being ingested for analysis. The dataset
 * contains the metadata describing where the data is and what the data actually looks like.
 * For example, it contains the location of the data source, the data schema, and other
 * information. A dataset also contains any tags associated with the ingested data.
 */
export const createDataset: API.OperationMethod<
  CreateDatasetRequest,
  CreateDatasetResponse,
  CreateDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDatasetRequest,
  output: CreateDatasetResponse,
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
  operationName: "CreateDataset",
}));

export type CreateInferenceSchedulerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a scheduled inference. Scheduling an inference is setting up a continuous
 * real-time inference plan to analyze new measurement data. When setting up the schedule, you
 * provide an S3 bucket location for the input data, assign it a delimiter between separate
 * entries in the data, set an offset delay if desired, and set the frequency of inferencing.
 * You must also provide an S3 bucket location for the output data.
 */
export const createInferenceScheduler: API.OperationMethod<
  CreateInferenceSchedulerRequest,
  CreateInferenceSchedulerResponse,
  CreateInferenceSchedulerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateInferenceSchedulerRequest,
  output: CreateInferenceSchedulerResponse,
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
  operationName: "CreateInferenceScheduler",
}));

export type CreateLabelError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a label for an event.
 */
export const createLabel: API.OperationMethod<
  CreateLabelRequest,
  CreateLabelResponse,
  CreateLabelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateLabelRequest,
  output: CreateLabelResponse,
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
  operationName: "CreateLabel",
}));

export type CreateLabelGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a group of labels.
 */
export const createLabelGroup: API.OperationMethod<
  CreateLabelGroupRequest,
  CreateLabelGroupResponse,
  CreateLabelGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateLabelGroupRequest,
  output: CreateLabelGroupResponse,
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
  operationName: "CreateLabelGroup",
}));

export type CreateModelError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a machine learning model for data inference.
 *
 * A machine-learning (ML) model is a mathematical model that finds patterns in your data.
 * In Amazon Lookout for Equipment, the model learns the patterns of normal behavior and detects abnormal
 * behavior that could be potential equipment failure (or maintenance events). The models are
 * made by analyzing normal data and abnormalities in machine behavior that have already
 * occurred.
 *
 * Your model is trained using a portion of the data from your dataset and uses that data
 * to learn patterns of normal behavior and abnormal patterns that lead to equipment failure.
 * Another portion of the data is used to evaluate the model's accuracy.
 */
export const createModel: API.OperationMethod<
  CreateModelRequest,
  CreateModelResponse,
  CreateModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateModelRequest,
  output: CreateModelResponse,
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
  operationName: "CreateModel",
}));

export type CreateRetrainingSchedulerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a retraining scheduler on the specified model.
 */
export const createRetrainingScheduler: API.OperationMethod<
  CreateRetrainingSchedulerRequest,
  CreateRetrainingSchedulerResponse,
  CreateRetrainingSchedulerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRetrainingSchedulerRequest,
  output: CreateRetrainingSchedulerResponse,
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
  operationName: "CreateRetrainingScheduler",
}));

export type DeleteDatasetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a dataset and associated artifacts. The operation will check to see if any
 * inference scheduler or data ingestion job is currently using the dataset, and if there
 * isn't, the dataset, its metadata, and any associated data stored in S3 will be deleted.
 * This does not affect any models that used this dataset for training and evaluation, but
 * does prevent it from being used in the future.
 */
export const deleteDataset: API.OperationMethod<
  DeleteDatasetRequest,
  DeleteDatasetResponse,
  DeleteDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDatasetRequest,
  output: DeleteDatasetResponse,
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
  operationName: "DeleteDataset",
}));

export type DeleteInferenceSchedulerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an inference scheduler that has been set up. Prior inference results will not be
 * deleted.
 */
export const deleteInferenceScheduler: API.OperationMethod<
  DeleteInferenceSchedulerRequest,
  DeleteInferenceSchedulerResponse,
  DeleteInferenceSchedulerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteInferenceSchedulerRequest,
  output: DeleteInferenceSchedulerResponse,
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
  operationName: "DeleteInferenceScheduler",
}));

export type DeleteLabelError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a label.
 */
export const deleteLabel: API.OperationMethod<
  DeleteLabelRequest,
  DeleteLabelResponse,
  DeleteLabelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteLabelRequest,
  output: DeleteLabelResponse,
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
  operationName: "DeleteLabel",
}));

export type DeleteLabelGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a group of labels.
 */
export const deleteLabelGroup: API.OperationMethod<
  DeleteLabelGroupRequest,
  DeleteLabelGroupResponse,
  DeleteLabelGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteLabelGroupRequest,
  output: DeleteLabelGroupResponse,
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
  operationName: "DeleteLabelGroup",
}));

export type DeleteModelError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a machine learning model currently available for Amazon Lookout for Equipment. This will prevent it
 * from being used with an inference scheduler, even one that is already set up.
 */
export const deleteModel: API.OperationMethod<
  DeleteModelRequest,
  DeleteModelResponse,
  DeleteModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteModelRequest,
  output: DeleteModelResponse,
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
  operationName: "DeleteModel",
}));

export type DeleteResourcePolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the resource policy attached to the resource.
 */
export const deleteResourcePolicy: API.OperationMethod<
  DeleteResourcePolicyRequest,
  DeleteResourcePolicyResponse,
  DeleteResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteResourcePolicyRequest,
  output: DeleteResourcePolicyResponse,
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
  operationName: "DeleteResourcePolicy",
}));

export type DeleteRetrainingSchedulerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a retraining scheduler from a model. The retraining scheduler must be in the
 * `STOPPED` status.
 */
export const deleteRetrainingScheduler: API.OperationMethod<
  DeleteRetrainingSchedulerRequest,
  DeleteRetrainingSchedulerResponse,
  DeleteRetrainingSchedulerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRetrainingSchedulerRequest,
  output: DeleteRetrainingSchedulerResponse,
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
  operationName: "DeleteRetrainingScheduler",
}));

export type DescribeDataIngestionJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides information on a specific data ingestion job such as creation time, dataset
 * ARN, and status.
 */
export const describeDataIngestionJob: API.OperationMethod<
  DescribeDataIngestionJobRequest,
  DescribeDataIngestionJobResponse,
  DescribeDataIngestionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeDataIngestionJobRequest,
  output: DescribeDataIngestionJobResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDataIngestionJob",
}));

export type DescribeDatasetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides a JSON description of the data in each time series dataset, including names,
 * column names, and data types.
 */
export const describeDataset: API.OperationMethod<
  DescribeDatasetRequest,
  DescribeDatasetResponse,
  DescribeDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeDatasetRequest,
  output: DescribeDatasetResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDataset",
}));

export type DescribeInferenceSchedulerError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Specifies information about the inference scheduler being used, including name, model,
 * status, and associated metadata
 */
export const describeInferenceScheduler: API.OperationMethod<
  DescribeInferenceSchedulerRequest,
  DescribeInferenceSchedulerResponse,
  DescribeInferenceSchedulerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeInferenceSchedulerRequest,
  output: DescribeInferenceSchedulerResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInferenceScheduler",
}));

export type DescribeLabelError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the name of the label.
 */
export const describeLabel: API.OperationMethod<
  DescribeLabelRequest,
  DescribeLabelResponse,
  DescribeLabelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeLabelRequest,
  output: DescribeLabelResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLabel",
}));

export type DescribeLabelGroupError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the label group.
 */
export const describeLabelGroup: API.OperationMethod<
  DescribeLabelGroupRequest,
  DescribeLabelGroupResponse,
  DescribeLabelGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeLabelGroupRequest,
  output: DescribeLabelGroupResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLabelGroup",
}));

export type DescribeModelError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides a JSON containing the overall information about a specific machine learning
 * model, including model name and ARN, dataset, training and evaluation information, status,
 * and so on.
 */
export const describeModel: API.OperationMethod<
  DescribeModelRequest,
  DescribeModelResponse,
  DescribeModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeModelRequest,
  output: DescribeModelResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeModel",
}));

export type DescribeModelVersionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a specific machine learning model version.
 */
export const describeModelVersion: API.OperationMethod<
  DescribeModelVersionRequest,
  DescribeModelVersionResponse,
  DescribeModelVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeModelVersionRequest,
  output: DescribeModelVersionResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeModelVersion",
}));

export type DescribeResourcePolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides the details of a resource policy attached to a resource.
 */
export const describeResourcePolicy: API.OperationMethod<
  DescribeResourcePolicyRequest,
  DescribeResourcePolicyResponse,
  DescribeResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeResourcePolicyRequest,
  output: DescribeResourcePolicyResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeResourcePolicy",
}));

export type DescribeRetrainingSchedulerError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides a description of the retraining scheduler, including information such as the
 * model name and retraining parameters.
 */
export const describeRetrainingScheduler: API.OperationMethod<
  DescribeRetrainingSchedulerRequest,
  DescribeRetrainingSchedulerResponse,
  DescribeRetrainingSchedulerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeRetrainingSchedulerRequest,
  output: DescribeRetrainingSchedulerResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRetrainingScheduler",
}));

export type ImportDatasetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Imports a dataset.
 */
export const importDataset: API.OperationMethod<
  ImportDatasetRequest,
  ImportDatasetResponse,
  ImportDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ImportDatasetRequest,
  output: ImportDatasetResponse,
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
  operationName: "ImportDataset",
}));

export type ImportModelVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Imports a model that has been trained successfully.
 */
export const importModelVersion: API.OperationMethod<
  ImportModelVersionRequest,
  ImportModelVersionResponse,
  ImportModelVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ImportModelVersionRequest,
  output: ImportModelVersionResponse,
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
  operationName: "ImportModelVersion",
}));

export type ListDataIngestionJobsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides a list of all data ingestion jobs, including dataset name and ARN, S3 location
 * of the input data, status, and so on.
 */
export const listDataIngestionJobs: API.PaginatedOperationMethod<
  ListDataIngestionJobsRequest,
  ListDataIngestionJobsResponse,
  ListDataIngestionJobsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDataIngestionJobsRequest,
  output: ListDataIngestionJobsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataIngestionJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDatasetsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all datasets currently available in your account, filtering on the dataset name.
 */
export const listDatasets: API.PaginatedOperationMethod<
  ListDatasetsRequest,
  ListDatasetsResponse,
  ListDatasetsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDatasetsRequest,
  output: ListDatasetsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDatasets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListInferenceEventsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all inference events that have been found for the specified inference scheduler.
 */
export const listInferenceEvents: API.PaginatedOperationMethod<
  ListInferenceEventsRequest,
  ListInferenceEventsResponse,
  ListInferenceEventsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListInferenceEventsRequest,
  output: ListInferenceEventsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInferenceEvents",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListInferenceExecutionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all inference executions that have been performed by the specified inference
 * scheduler.
 */
export const listInferenceExecutions: API.PaginatedOperationMethod<
  ListInferenceExecutionsRequest,
  ListInferenceExecutionsResponse,
  ListInferenceExecutionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListInferenceExecutionsRequest,
  output: ListInferenceExecutionsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInferenceExecutions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListInferenceSchedulersError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of all inference schedulers currently available for your account.
 */
export const listInferenceSchedulers: API.PaginatedOperationMethod<
  ListInferenceSchedulersRequest,
  ListInferenceSchedulersResponse,
  ListInferenceSchedulersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListInferenceSchedulersRequest,
  output: ListInferenceSchedulersResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInferenceSchedulers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListLabelGroupsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of the label groups.
 */
export const listLabelGroups: API.PaginatedOperationMethod<
  ListLabelGroupsRequest,
  ListLabelGroupsResponse,
  ListLabelGroupsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListLabelGroupsRequest,
  output: ListLabelGroupsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLabelGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListLabelsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides a list of labels.
 */
export const listLabels: API.PaginatedOperationMethod<
  ListLabelsRequest,
  ListLabelsResponse,
  ListLabelsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListLabelsRequest,
  output: ListLabelsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLabels",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListModelsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Generates a list of all models in the account, including model name and ARN, dataset,
 * and status.
 */
export const listModels: API.PaginatedOperationMethod<
  ListModelsRequest,
  ListModelsResponse,
  ListModelsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListModelsRequest,
  output: ListModelsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListModels",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListModelVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Generates a list of all model versions for a given model, including the model version,
 * model version ARN, and status. To list a subset of versions, use the
 * `MaxModelVersion` and `MinModelVersion` fields.
 */
export const listModelVersions: API.PaginatedOperationMethod<
  ListModelVersionsRequest,
  ListModelVersionsResponse,
  ListModelVersionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListModelVersionsRequest,
  output: ListModelVersionsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListModelVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRetrainingSchedulersError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all retraining schedulers in your account, filtering by model name prefix and
 * status.
 */
export const listRetrainingSchedulers: API.PaginatedOperationMethod<
  ListRetrainingSchedulersRequest,
  ListRetrainingSchedulersResponse,
  ListRetrainingSchedulersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRetrainingSchedulersRequest,
  output: ListRetrainingSchedulersResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRetrainingSchedulers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSensorStatisticsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists statistics about the data collected for each of the sensors that have been
 * successfully ingested in the particular dataset. Can also be used to retreive Sensor
 * Statistics for a previous ingestion job.
 */
export const listSensorStatistics: API.PaginatedOperationMethod<
  ListSensorStatisticsRequest,
  ListSensorStatisticsResponse,
  ListSensorStatisticsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSensorStatisticsRequest,
  output: ListSensorStatisticsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSensorStatistics",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
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
 * Lists all the tags for a specified resource, including key and value.
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

export type PutResourcePolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a resource control policy for a given resource.
 */
export const putResourcePolicy: API.OperationMethod<
  PutResourcePolicyRequest,
  PutResourcePolicyResponse,
  PutResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutResourcePolicyRequest,
  output: PutResourcePolicyResponse,
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
  operationName: "PutResourcePolicy",
}));

export type StartDataIngestionJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a data ingestion job. Amazon Lookout for Equipment returns the job status.
 */
export const startDataIngestionJob: API.OperationMethod<
  StartDataIngestionJobRequest,
  StartDataIngestionJobResponse,
  StartDataIngestionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartDataIngestionJobRequest,
  output: StartDataIngestionJobResponse,
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
  operationName: "StartDataIngestionJob",
}));

export type StartInferenceSchedulerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts an inference scheduler.
 */
export const startInferenceScheduler: API.OperationMethod<
  StartInferenceSchedulerRequest,
  StartInferenceSchedulerResponse,
  StartInferenceSchedulerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartInferenceSchedulerRequest,
  output: StartInferenceSchedulerResponse,
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
  operationName: "StartInferenceScheduler",
}));

export type StartRetrainingSchedulerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a retraining scheduler.
 */
export const startRetrainingScheduler: API.OperationMethod<
  StartRetrainingSchedulerRequest,
  StartRetrainingSchedulerResponse,
  StartRetrainingSchedulerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartRetrainingSchedulerRequest,
  output: StartRetrainingSchedulerResponse,
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
  operationName: "StartRetrainingScheduler",
}));

export type StopInferenceSchedulerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops an inference scheduler.
 */
export const stopInferenceScheduler: API.OperationMethod<
  StopInferenceSchedulerRequest,
  StopInferenceSchedulerResponse,
  StopInferenceSchedulerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopInferenceSchedulerRequest,
  output: StopInferenceSchedulerResponse,
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
  operationName: "StopInferenceScheduler",
}));

export type StopRetrainingSchedulerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops a retraining scheduler.
 */
export const stopRetrainingScheduler: API.OperationMethod<
  StopRetrainingSchedulerRequest,
  StopRetrainingSchedulerResponse,
  StopRetrainingSchedulerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopRetrainingSchedulerRequest,
  output: StopRetrainingSchedulerResponse,
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
  operationName: "StopRetrainingScheduler",
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
 * Associates a given tag to a resource in your account. A tag is a key-value pair which
 * can be added to an Amazon Lookout for Equipment resource as metadata. Tags can be used for organizing your
 * resources as well as helping you to search and filter by tag. Multiple tags can be added to
 * a resource, either when you create it, or later. Up to 50 tags can be associated with each
 * resource.
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
 * Removes a specific tag from a given resource. The tag is specified by its key.
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

export type UpdateActiveModelVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sets the active model version for a given machine learning model.
 */
export const updateActiveModelVersion: API.OperationMethod<
  UpdateActiveModelVersionRequest,
  UpdateActiveModelVersionResponse,
  UpdateActiveModelVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateActiveModelVersionRequest,
  output: UpdateActiveModelVersionResponse,
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
  operationName: "UpdateActiveModelVersion",
}));

export type UpdateInferenceSchedulerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an inference scheduler.
 */
export const updateInferenceScheduler: API.OperationMethod<
  UpdateInferenceSchedulerRequest,
  UpdateInferenceSchedulerResponse,
  UpdateInferenceSchedulerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateInferenceSchedulerRequest,
  output: UpdateInferenceSchedulerResponse,
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
  operationName: "UpdateInferenceScheduler",
}));

export type UpdateLabelGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the label group.
 */
export const updateLabelGroup: API.OperationMethod<
  UpdateLabelGroupRequest,
  UpdateLabelGroupResponse,
  UpdateLabelGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateLabelGroupRequest,
  output: UpdateLabelGroupResponse,
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
  operationName: "UpdateLabelGroup",
}));

export type UpdateModelError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a model in the account.
 */
export const updateModel: API.OperationMethod<
  UpdateModelRequest,
  UpdateModelResponse,
  UpdateModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateModelRequest,
  output: UpdateModelResponse,
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
  operationName: "UpdateModel",
}));

export type UpdateRetrainingSchedulerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a retraining scheduler.
 */
export const updateRetrainingScheduler: API.OperationMethod<
  UpdateRetrainingSchedulerRequest,
  UpdateRetrainingSchedulerResponse,
  UpdateRetrainingSchedulerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRetrainingSchedulerRequest,
  output: UpdateRetrainingSchedulerResponse,
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
  operationName: "UpdateRetrainingScheduler",
}));
