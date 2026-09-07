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
  sdkId: "CleanRoomsML",
  serviceShapeName: "AWSStarkControlService",
});
const auth = T.AwsAuthSigv4({ name: "cleanrooms-ml" });
const ver = T.ServiceVersion("2023-09-06");
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
              `https://cleanrooms-ml-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://cleanrooms-ml-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://cleanrooms-ml.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://cleanrooms-ml.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class InternalServiceException
  extends /*@__PURE__*/ S.TaggedError<InternalServiceException>()(
    "InternalServiceException",
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
    {
      message: S.String.pipe(T.ErrorMessage()),
      quotaName: S.optional(S.String),
      quotaValue: S.optional(S.Number),
    },
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
export type UUID = string;
export type TrainedModelArn = string;
export interface CancelTrainedModelRequest {
  membershipIdentifier: string;
  trainedModelArn: string;
  versionIdentifier?: string;
}
export const CancelTrainedModelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
    trainedModelArn: S.String.pipe(T.HttpLabel("trainedModelArn")),
    versionIdentifier: S.optional(S.String).pipe(
      T.HttpQuery("versionIdentifier"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/memberships/{membershipIdentifier}/trained-models/{trainedModelArn}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelTrainedModelRequest",
}) as any as S.Schema<CancelTrainedModelRequest>;
export interface CancelTrainedModelResponse {}
export const CancelTrainedModelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CancelTrainedModelResponse",
}) as any as S.Schema<CancelTrainedModelResponse>;
export type TrainedModelInferenceJobArn = string;
export interface CancelTrainedModelInferenceJobRequest {
  membershipIdentifier: string;
  trainedModelInferenceJobArn: string;
}
export const CancelTrainedModelInferenceJobRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
      trainedModelInferenceJobArn: S.String.pipe(
        T.HttpLabel("trainedModelInferenceJobArn"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "PATCH",
          uri: "/memberships/{membershipIdentifier}/trained-model-inference-jobs/{trainedModelInferenceJobArn}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CancelTrainedModelInferenceJobRequest",
}) as any as S.Schema<CancelTrainedModelInferenceJobRequest>;
export interface CancelTrainedModelInferenceJobResponse {}
export const CancelTrainedModelInferenceJobResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "CancelTrainedModelInferenceJobResponse",
}) as any as S.Schema<CancelTrainedModelInferenceJobResponse>;
export type NameString = string;
export type TrainingDatasetArn = string;
export type KmsKeyArn = string;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type ResourceDescription = string;
export interface CreateAudienceModelRequest {
  trainingDataStartTime?: Date;
  trainingDataEndTime?: Date;
  name: string;
  trainingDatasetArn: string;
  kmsKeyArn?: string;
  tags?: { [key: string]: string | undefined };
  description?: string;
}
export const CreateAudienceModelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    trainingDataStartTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    trainingDataEndTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    name: S.String,
    trainingDatasetArn: S.String,
    kmsKeyArn: S.optional(S.String),
    tags: S.optional(TagMap),
    description: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/audience-model" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateAudienceModelRequest",
}) as any as S.Schema<CreateAudienceModelRequest>;
export type AudienceModelArn = string;
export interface CreateAudienceModelResponse {
  audienceModelArn: string;
}
export const CreateAudienceModelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ audienceModelArn: S.String }),
).annotate({
  identifier: "CreateAudienceModelResponse",
}) as any as S.Schema<CreateAudienceModelResponse>;
export type S3Path = string;
export interface S3ConfigMap {
  s3Uri: string;
}
export const S3ConfigMap = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ s3Uri: S.String }),
).annotate({ identifier: "S3ConfigMap" }) as any as S.Schema<S3ConfigMap>;
export interface AudienceDestination {
  s3Destination: S3ConfigMap;
}
export const AudienceDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ s3Destination: S3ConfigMap }),
).annotate({
  identifier: "AudienceDestination",
}) as any as S.Schema<AudienceDestination>;
export type IamRoleArn = string;
export interface ConfiguredAudienceModelOutputConfig {
  destination: AudienceDestination;
  roleArn: string;
}
export const ConfiguredAudienceModelOutputConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ destination: AudienceDestination, roleArn: S.String }),
).annotate({
  identifier: "ConfiguredAudienceModelOutputConfig",
}) as any as S.Schema<ConfiguredAudienceModelOutputConfig>;
export type SharedAudienceMetrics = "ALL" | "NONE" | (string & {});
export const SharedAudienceMetrics = /*@__PURE__*/ S.String;

export type MetricsList = SharedAudienceMetrics[];
export const MetricsList = /*@__PURE__*/ S.Array(SharedAudienceMetrics);
export type MinMatchingSeedSize = number;
export type AudienceSizeType = "ABSOLUTE" | "PERCENTAGE" | (string & {});
export const AudienceSizeType = /*@__PURE__*/ S.String;

export type AudienceSizeValue = number;
export type AudienceSizeBins = number[];
export const AudienceSizeBins = /*@__PURE__*/ S.Array(S.Number);
export interface AudienceSizeConfig {
  audienceSizeType: AudienceSizeType;
  audienceSizeBins: number[];
}
export const AudienceSizeConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    audienceSizeType: AudienceSizeType,
    audienceSizeBins: AudienceSizeBins,
  }),
).annotate({
  identifier: "AudienceSizeConfig",
}) as any as S.Schema<AudienceSizeConfig>;
export type TagOnCreatePolicy = "FROM_PARENT_RESOURCE" | "NONE" | (string & {});
export const TagOnCreatePolicy = /*@__PURE__*/ S.String;

export interface CreateConfiguredAudienceModelRequest {
  name: string;
  audienceModelArn: string;
  outputConfig: ConfiguredAudienceModelOutputConfig;
  description?: string;
  sharedAudienceMetrics: SharedAudienceMetrics[];
  minMatchingSeedSize?: number;
  audienceSizeConfig?: AudienceSizeConfig;
  tags?: { [key: string]: string | undefined };
  childResourceTagOnCreatePolicy?: TagOnCreatePolicy;
}
export const CreateConfiguredAudienceModelRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      name: S.String,
      audienceModelArn: S.String,
      outputConfig: ConfiguredAudienceModelOutputConfig,
      description: S.optional(S.String),
      sharedAudienceMetrics: MetricsList,
      minMatchingSeedSize: S.optional(S.Number),
      audienceSizeConfig: S.optional(AudienceSizeConfig),
      tags: S.optional(TagMap),
      childResourceTagOnCreatePolicy: S.optional(TagOnCreatePolicy),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/configured-audience-model" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateConfiguredAudienceModelRequest",
}) as any as S.Schema<CreateConfiguredAudienceModelRequest>;
export type ConfiguredAudienceModelArn = string;
export interface CreateConfiguredAudienceModelResponse {
  configuredAudienceModelArn: string;
}
export const CreateConfiguredAudienceModelResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ configuredAudienceModelArn: S.String }),
).annotate({
  identifier: "CreateConfiguredAudienceModelResponse",
}) as any as S.Schema<CreateConfiguredAudienceModelResponse>;
export type AlgorithmImage = string;
export type ContainerEntrypointString = string;
export type ContainerEntrypoint = string[];
export const ContainerEntrypoint = /*@__PURE__*/ S.Array(S.String);
export type ContainerArgument = string;
export type ContainerArguments = string[];
export const ContainerArguments = /*@__PURE__*/ S.Array(S.String);
export type MetricName = string;
export type MetricRegex = string;
export interface MetricDefinition {
  name: string;
  regex: string;
}
export const MetricDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, regex: S.String }),
).annotate({
  identifier: "MetricDefinition",
}) as any as S.Schema<MetricDefinition>;
export type MetricDefinitionList = MetricDefinition[];
export const MetricDefinitionList = /*@__PURE__*/ S.Array(MetricDefinition);
export interface ContainerConfig {
  imageUri: string;
  entrypoint?: string[];
  arguments?: string[];
  metricDefinitions?: MetricDefinition[];
}
export const ContainerConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    imageUri: S.String,
    entrypoint: S.optional(ContainerEntrypoint),
    arguments: S.optional(ContainerArguments),
    metricDefinitions: S.optional(MetricDefinitionList),
  }),
).annotate({
  identifier: "ContainerConfig",
}) as any as S.Schema<ContainerConfig>;
export interface InferenceContainerConfig {
  imageUri: string;
}
export const InferenceContainerConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ imageUri: S.String }),
).annotate({
  identifier: "InferenceContainerConfig",
}) as any as S.Schema<InferenceContainerConfig>;
export interface CreateConfiguredModelAlgorithmRequest {
  name: string;
  description?: string;
  roleArn: string;
  trainingContainerConfig?: ContainerConfig;
  inferenceContainerConfig?: InferenceContainerConfig;
  tags?: { [key: string]: string | undefined };
  kmsKeyArn?: string;
}
export const CreateConfiguredModelAlgorithmRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      name: S.String,
      description: S.optional(S.String),
      roleArn: S.String,
      trainingContainerConfig: S.optional(ContainerConfig),
      inferenceContainerConfig: S.optional(InferenceContainerConfig),
      tags: S.optional(TagMap),
      kmsKeyArn: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/configured-model-algorithms" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateConfiguredModelAlgorithmRequest",
}) as any as S.Schema<CreateConfiguredModelAlgorithmRequest>;
export type ConfiguredModelAlgorithmArn = string;
export interface CreateConfiguredModelAlgorithmResponse {
  configuredModelAlgorithmArn: string;
}
export const CreateConfiguredModelAlgorithmResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ configuredModelAlgorithmArn: S.String }),
).annotate({
  identifier: "CreateConfiguredModelAlgorithmResponse",
}) as any as S.Schema<CreateConfiguredModelAlgorithmResponse>;
export type AccountIdList = string[];
export const AccountIdList = /*@__PURE__*/ S.Array(S.String);
export type LogType = "ALL" | "ERROR_SUMMARY" | (string & {});
export const LogType = /*@__PURE__*/ S.String;

export type EntityType =
  | "ALL_PERSONALLY_IDENTIFIABLE_INFORMATION"
  | "NUMBERS"
  | "CUSTOM"
  | (string & {});
export const EntityType = /*@__PURE__*/ S.String;

export type EntityTypeList = EntityType[];
export const EntityTypeList = /*@__PURE__*/ S.Array(EntityType);
export type CustomDataIdentifier = string;
export type CustomDataIdentifierList = string[];
export const CustomDataIdentifierList = /*@__PURE__*/ S.Array(S.String);
export interface CustomEntityConfig {
  customDataIdentifiers: string[];
}
export const CustomEntityConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ customDataIdentifiers: CustomDataIdentifierList }),
).annotate({
  identifier: "CustomEntityConfig",
}) as any as S.Schema<CustomEntityConfig>;
export interface LogRedactionConfiguration {
  entitiesToRedact: EntityType[];
  customEntityConfig?: CustomEntityConfig;
}
export const LogRedactionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    entitiesToRedact: EntityTypeList,
    customEntityConfig: S.optional(CustomEntityConfig),
  }),
).annotate({
  identifier: "LogRedactionConfiguration",
}) as any as S.Schema<LogRedactionConfiguration>;
export interface LogsConfigurationPolicy {
  allowedAccountIds: string[];
  filterPattern?: string;
  logType?: LogType;
  logRedactionConfiguration?: LogRedactionConfiguration;
}
export const LogsConfigurationPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    allowedAccountIds: AccountIdList,
    filterPattern: S.optional(S.String),
    logType: S.optional(LogType),
    logRedactionConfiguration: S.optional(LogRedactionConfiguration),
  }),
).annotate({
  identifier: "LogsConfigurationPolicy",
}) as any as S.Schema<LogsConfigurationPolicy>;
export type LogsConfigurationPolicyList = LogsConfigurationPolicy[];
export const LogsConfigurationPolicyList = /*@__PURE__*/ S.Array(
  LogsConfigurationPolicy,
);
export type NoiseLevelType = "HIGH" | "MEDIUM" | "LOW" | "NONE" | (string & {});
export const NoiseLevelType = /*@__PURE__*/ S.String;

export interface MetricsConfigurationPolicy {
  noiseLevel: NoiseLevelType;
}
export const MetricsConfigurationPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ noiseLevel: NoiseLevelType }),
).annotate({
  identifier: "MetricsConfigurationPolicy",
}) as any as S.Schema<MetricsConfigurationPolicy>;
export type TrainedModelArtifactMaxSizeUnitType = "GB" | (string & {});
export const TrainedModelArtifactMaxSizeUnitType = /*@__PURE__*/ S.String;

export type TrainedModelArtifactMaxSizeValue = number;
export interface TrainedModelArtifactMaxSize {
  unit: TrainedModelArtifactMaxSizeUnitType;
  value: number;
}
export const TrainedModelArtifactMaxSize = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ unit: TrainedModelArtifactMaxSizeUnitType, value: S.Number }),
).annotate({
  identifier: "TrainedModelArtifactMaxSize",
}) as any as S.Schema<TrainedModelArtifactMaxSize>;
export interface TrainedModelsConfigurationPolicy {
  containerLogs?: LogsConfigurationPolicy[];
  containerMetrics?: MetricsConfigurationPolicy;
  maxArtifactSize?: TrainedModelArtifactMaxSize;
}
export const TrainedModelsConfigurationPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    containerLogs: S.optional(LogsConfigurationPolicyList),
    containerMetrics: S.optional(MetricsConfigurationPolicy),
    maxArtifactSize: S.optional(TrainedModelArtifactMaxSize),
  }),
).annotate({
  identifier: "TrainedModelsConfigurationPolicy",
}) as any as S.Schema<TrainedModelsConfigurationPolicy>;
export type TrainedModelExportsMaxSizeUnitType = "GB" | (string & {});
export const TrainedModelExportsMaxSizeUnitType = /*@__PURE__*/ S.String;

export type TrainedModelExportsMaxSizeValue = number;
export interface TrainedModelExportsMaxSize {
  unit: TrainedModelExportsMaxSizeUnitType;
  value: number;
}
export const TrainedModelExportsMaxSize = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ unit: TrainedModelExportsMaxSizeUnitType, value: S.Number }),
).annotate({
  identifier: "TrainedModelExportsMaxSize",
}) as any as S.Schema<TrainedModelExportsMaxSize>;
export type TrainedModelExportFileType = "MODEL" | "OUTPUT" | (string & {});
export const TrainedModelExportFileType = /*@__PURE__*/ S.String;

export type TrainedModelExportFileTypeList = TrainedModelExportFileType[];
export const TrainedModelExportFileTypeList = /*@__PURE__*/ S.Array(
  TrainedModelExportFileType,
);
export interface TrainedModelExportsConfigurationPolicy {
  maxSize: TrainedModelExportsMaxSize;
  filesToExport: TrainedModelExportFileType[];
}
export const TrainedModelExportsConfigurationPolicy = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      maxSize: TrainedModelExportsMaxSize,
      filesToExport: TrainedModelExportFileTypeList,
    }),
).annotate({
  identifier: "TrainedModelExportsConfigurationPolicy",
}) as any as S.Schema<TrainedModelExportsConfigurationPolicy>;
export type TrainedModelInferenceMaxOutputSizeUnitType = "GB" | (string & {});
export const TrainedModelInferenceMaxOutputSizeUnitType =
  /*@__PURE__*/ S.String;

export type TrainedModelInferenceMaxOutputSizeValue = number;
export interface TrainedModelInferenceMaxOutputSize {
  unit: TrainedModelInferenceMaxOutputSizeUnitType;
  value: number;
}
export const TrainedModelInferenceMaxOutputSize = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    unit: TrainedModelInferenceMaxOutputSizeUnitType,
    value: S.Number,
  }),
).annotate({
  identifier: "TrainedModelInferenceMaxOutputSize",
}) as any as S.Schema<TrainedModelInferenceMaxOutputSize>;
export interface TrainedModelInferenceJobsConfigurationPolicy {
  containerLogs?: LogsConfigurationPolicy[];
  maxOutputSize?: TrainedModelInferenceMaxOutputSize;
}
export const TrainedModelInferenceJobsConfigurationPolicy =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      containerLogs: S.optional(LogsConfigurationPolicyList),
      maxOutputSize: S.optional(TrainedModelInferenceMaxOutputSize),
    }),
  ).annotate({
    identifier: "TrainedModelInferenceJobsConfigurationPolicy",
  }) as any as S.Schema<TrainedModelInferenceJobsConfigurationPolicy>;
export interface PrivacyConfigurationPolicies {
  trainedModels?: TrainedModelsConfigurationPolicy;
  trainedModelExports?: TrainedModelExportsConfigurationPolicy;
  trainedModelInferenceJobs?: TrainedModelInferenceJobsConfigurationPolicy;
}
export const PrivacyConfigurationPolicies = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    trainedModels: S.optional(TrainedModelsConfigurationPolicy),
    trainedModelExports: S.optional(TrainedModelExportsConfigurationPolicy),
    trainedModelInferenceJobs: S.optional(
      TrainedModelInferenceJobsConfigurationPolicy,
    ),
  }),
).annotate({
  identifier: "PrivacyConfigurationPolicies",
}) as any as S.Schema<PrivacyConfigurationPolicies>;
export interface PrivacyConfiguration {
  policies: PrivacyConfigurationPolicies;
}
export const PrivacyConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ policies: PrivacyConfigurationPolicies }),
).annotate({
  identifier: "PrivacyConfiguration",
}) as any as S.Schema<PrivacyConfiguration>;
export interface CreateConfiguredModelAlgorithmAssociationRequest {
  membershipIdentifier: string;
  configuredModelAlgorithmArn: string;
  name: string;
  description?: string;
  privacyConfiguration?: PrivacyConfiguration;
  tags?: { [key: string]: string | undefined };
}
export const CreateConfiguredModelAlgorithmAssociationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
      configuredModelAlgorithmArn: S.String,
      name: S.String,
      description: S.optional(S.String),
      privacyConfiguration: S.optional(PrivacyConfiguration),
      tags: S.optional(TagMap),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/memberships/{membershipIdentifier}/configured-model-algorithm-associations",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "CreateConfiguredModelAlgorithmAssociationRequest",
  }) as any as S.Schema<CreateConfiguredModelAlgorithmAssociationRequest>;
export type ConfiguredModelAlgorithmAssociationArn = string;
export interface CreateConfiguredModelAlgorithmAssociationResponse {
  configuredModelAlgorithmAssociationArn: string;
}
export const CreateConfiguredModelAlgorithmAssociationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ configuredModelAlgorithmAssociationArn: S.String }),
  ).annotate({
    identifier: "CreateConfiguredModelAlgorithmAssociationResponse",
  }) as any as S.Schema<CreateConfiguredModelAlgorithmAssociationResponse>;
export type ConfiguredModelAlgorithmAssociationArnList = string[];
export const ConfiguredModelAlgorithmAssociationArnList = /*@__PURE__*/ S.Array(
  S.String,
);
export type AnalysisTemplateArn = string;
export type ParameterName = string;
export type ParameterValue = string;
export type ParameterMap = { [key: string]: string | undefined };
export const ParameterMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface ProtectedQuerySQLParameters {
  queryString?: string;
  analysisTemplateArn?: string;
  parameters?: { [key: string]: string | undefined };
}
export const ProtectedQuerySQLParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    queryString: S.optional(S.String),
    analysisTemplateArn: S.optional(S.String),
    parameters: S.optional(ParameterMap),
  }),
).annotate({
  identifier: "ProtectedQuerySQLParameters",
}) as any as S.Schema<ProtectedQuerySQLParameters>;
export type WorkerComputeType = "CR.1X" | "CR.4X" | (string & {});
export const WorkerComputeType = /*@__PURE__*/ S.String;

export type SparkPropertyKey = string;
export type SparkPropertyValue = string;
export type SparkProperties = { [key: string]: string | undefined };
export const SparkProperties = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type WorkerComputeConfigurationProperties = {
  spark: { [key: string]: string | undefined };
};
export const WorkerComputeConfigurationProperties = /*@__PURE__*/ S.Union([
  S.Struct({ spark: SparkProperties }),
]);
export interface WorkerComputeConfiguration {
  type?: WorkerComputeType;
  number?: number;
  properties?: WorkerComputeConfigurationProperties;
}
export const WorkerComputeConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(WorkerComputeType),
    number: S.optional(S.Number),
    properties: S.optional(WorkerComputeConfigurationProperties),
  }),
).annotate({
  identifier: "WorkerComputeConfiguration",
}) as any as S.Schema<WorkerComputeConfiguration>;
export type ComputeConfiguration = { worker: WorkerComputeConfiguration };
export const ComputeConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ worker: WorkerComputeConfiguration }),
]);
export type ResultFormat = "CSV" | "PARQUET" | (string & {});
export const ResultFormat = /*@__PURE__*/ S.String;

export interface ProtectedQueryInputParameters {
  sqlParameters: ProtectedQuerySQLParameters;
  computeConfiguration?: ComputeConfiguration;
  resultFormat?: ResultFormat;
}
export const ProtectedQueryInputParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sqlParameters: ProtectedQuerySQLParameters,
    computeConfiguration: S.optional(ComputeConfiguration),
    resultFormat: S.optional(ResultFormat),
  }),
).annotate({
  identifier: "ProtectedQueryInputParameters",
}) as any as S.Schema<ProtectedQueryInputParameters>;
export type InputChannelDataSource = {
  protectedQueryInputParameters: ProtectedQueryInputParameters;
};
export const InputChannelDataSource = /*@__PURE__*/ S.Union([
  S.Struct({ protectedQueryInputParameters: ProtectedQueryInputParameters }),
]);
export interface InputChannel {
  dataSource: InputChannelDataSource;
  roleArn: string;
}
export const InputChannel = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ dataSource: InputChannelDataSource, roleArn: S.String }),
).annotate({ identifier: "InputChannel" }) as any as S.Schema<InputChannel>;
export type AccountId = string;
export interface PayerConfiguration {
  computePayerAccountId?: string;
  syntheticDataPayerAccountId?: string;
}
export const PayerConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    computePayerAccountId: S.optional(S.String),
    syntheticDataPayerAccountId: S.optional(S.String),
  }),
).annotate({
  identifier: "PayerConfiguration",
}) as any as S.Schema<PayerConfiguration>;
export interface CreateMLInputChannelRequest {
  membershipIdentifier: string;
  configuredModelAlgorithmAssociations: string[];
  inputChannel: InputChannel;
  name: string;
  retentionInDays: number;
  description?: string;
  kmsKeyArn?: string;
  tags?: { [key: string]: string | undefined };
  payerConfiguration?: PayerConfiguration;
}
export const CreateMLInputChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
    configuredModelAlgorithmAssociations:
      ConfiguredModelAlgorithmAssociationArnList,
    inputChannel: InputChannel,
    name: S.String,
    retentionInDays: S.Number,
    description: S.optional(S.String),
    kmsKeyArn: S.optional(S.String),
    tags: S.optional(TagMap),
    payerConfiguration: S.optional(PayerConfiguration),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/memberships/{membershipIdentifier}/ml-input-channels",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateMLInputChannelRequest",
}) as any as S.Schema<CreateMLInputChannelRequest>;
export type MLInputChannelArn = string;
export interface CreateMLInputChannelResponse {
  mlInputChannelArn: string;
}
export const CreateMLInputChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ mlInputChannelArn: S.String }),
).annotate({
  identifier: "CreateMLInputChannelResponse",
}) as any as S.Schema<CreateMLInputChannelResponse>;
export type HyperParameters = { [key: string]: string | undefined };
export const HyperParameters = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type Environment = { [key: string]: string | undefined };
export const Environment = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type InstanceType =
  | "ml.m4.xlarge"
  | "ml.m4.2xlarge"
  | "ml.m4.4xlarge"
  | "ml.m4.10xlarge"
  | "ml.m4.16xlarge"
  | "ml.g4dn.xlarge"
  | "ml.g4dn.2xlarge"
  | "ml.g4dn.4xlarge"
  | "ml.g4dn.8xlarge"
  | "ml.g4dn.12xlarge"
  | "ml.g4dn.16xlarge"
  | "ml.m5.large"
  | "ml.m5.xlarge"
  | "ml.m5.2xlarge"
  | "ml.m5.4xlarge"
  | "ml.m5.12xlarge"
  | "ml.m5.24xlarge"
  | "ml.c4.xlarge"
  | "ml.c4.2xlarge"
  | "ml.c4.4xlarge"
  | "ml.c4.8xlarge"
  | "ml.p2.xlarge"
  | "ml.p2.8xlarge"
  | "ml.p2.16xlarge"
  | "ml.p4d.24xlarge"
  | "ml.p4de.24xlarge"
  | "ml.p5.48xlarge"
  | "ml.c5.xlarge"
  | "ml.c5.2xlarge"
  | "ml.c5.4xlarge"
  | "ml.c5.9xlarge"
  | "ml.c5.18xlarge"
  | "ml.c5n.xlarge"
  | "ml.c5n.2xlarge"
  | "ml.c5n.4xlarge"
  | "ml.c5n.9xlarge"
  | "ml.c5n.18xlarge"
  | "ml.g5.xlarge"
  | "ml.g5.2xlarge"
  | "ml.g5.4xlarge"
  | "ml.g5.8xlarge"
  | "ml.g5.16xlarge"
  | "ml.g5.12xlarge"
  | "ml.g5.24xlarge"
  | "ml.g5.48xlarge"
  | "ml.trn1.2xlarge"
  | "ml.trn1.32xlarge"
  | "ml.trn1n.32xlarge"
  | "ml.m6i.large"
  | "ml.m6i.xlarge"
  | "ml.m6i.2xlarge"
  | "ml.m6i.4xlarge"
  | "ml.m6i.8xlarge"
  | "ml.m6i.12xlarge"
  | "ml.m6i.16xlarge"
  | "ml.m6i.24xlarge"
  | "ml.m6i.32xlarge"
  | "ml.c6i.xlarge"
  | "ml.c6i.2xlarge"
  | "ml.c6i.8xlarge"
  | "ml.c6i.4xlarge"
  | "ml.c6i.12xlarge"
  | "ml.c6i.16xlarge"
  | "ml.c6i.24xlarge"
  | "ml.c6i.32xlarge"
  | "ml.r5d.large"
  | "ml.r5d.xlarge"
  | "ml.r5d.2xlarge"
  | "ml.r5d.4xlarge"
  | "ml.r5d.8xlarge"
  | "ml.r5d.12xlarge"
  | "ml.r5d.16xlarge"
  | "ml.r5d.24xlarge"
  | "ml.t3.medium"
  | "ml.t3.large"
  | "ml.t3.xlarge"
  | "ml.t3.2xlarge"
  | "ml.r5.large"
  | "ml.r5.xlarge"
  | "ml.r5.2xlarge"
  | "ml.r5.4xlarge"
  | "ml.r5.8xlarge"
  | "ml.r5.12xlarge"
  | "ml.r5.16xlarge"
  | "ml.r5.24xlarge"
  | "ml.c7i.large"
  | "ml.c7i.xlarge"
  | "ml.c7i.2xlarge"
  | "ml.c7i.4xlarge"
  | "ml.c7i.8xlarge"
  | "ml.c7i.12xlarge"
  | "ml.c7i.16xlarge"
  | "ml.c7i.24xlarge"
  | "ml.c7i.48xlarge"
  | "ml.m7i.large"
  | "ml.m7i.xlarge"
  | "ml.m7i.2xlarge"
  | "ml.m7i.4xlarge"
  | "ml.m7i.8xlarge"
  | "ml.m7i.12xlarge"
  | "ml.m7i.16xlarge"
  | "ml.m7i.24xlarge"
  | "ml.m7i.48xlarge"
  | "ml.r7i.large"
  | "ml.r7i.xlarge"
  | "ml.r7i.2xlarge"
  | "ml.r7i.4xlarge"
  | "ml.r7i.8xlarge"
  | "ml.r7i.12xlarge"
  | "ml.r7i.16xlarge"
  | "ml.r7i.24xlarge"
  | "ml.r7i.48xlarge"
  | "ml.g6.xlarge"
  | "ml.g6.2xlarge"
  | "ml.g6.4xlarge"
  | "ml.g6.8xlarge"
  | "ml.g6.12xlarge"
  | "ml.g6.16xlarge"
  | "ml.g6.24xlarge"
  | "ml.g6.48xlarge"
  | "ml.g6e.xlarge"
  | "ml.g6e.2xlarge"
  | "ml.g6e.4xlarge"
  | "ml.g6e.8xlarge"
  | "ml.g6e.12xlarge"
  | "ml.g6e.16xlarge"
  | "ml.g6e.24xlarge"
  | "ml.g6e.48xlarge"
  | "ml.p5en.48xlarge"
  | "ml.p3.2xlarge"
  | "ml.p3.8xlarge"
  | "ml.p3.16xlarge"
  | "ml.p3dn.24xlarge"
  | (string & {});
export const InstanceType = /*@__PURE__*/ S.String;

export interface ResourceConfig {
  instanceCount?: number;
  instanceType: InstanceType;
  volumeSizeInGB: number;
}
export const ResourceConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instanceCount: S.optional(S.Number),
    instanceType: InstanceType,
    volumeSizeInGB: S.Number,
  }),
).annotate({ identifier: "ResourceConfig" }) as any as S.Schema<ResourceConfig>;
export interface StoppingCondition {
  maxRuntimeInSeconds?: number;
}
export const StoppingCondition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ maxRuntimeInSeconds: S.optional(S.Number) }),
).annotate({
  identifier: "StoppingCondition",
}) as any as S.Schema<StoppingCondition>;
export type ModelTrainingDataChannelName = string;
export interface IncrementalTrainingDataChannel {
  trainedModelArn: string;
  versionIdentifier?: string;
  channelName: string;
}
export const IncrementalTrainingDataChannel = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    trainedModelArn: S.String,
    versionIdentifier: S.optional(S.String),
    channelName: S.String,
  }),
).annotate({
  identifier: "IncrementalTrainingDataChannel",
}) as any as S.Schema<IncrementalTrainingDataChannel>;
export type IncrementalTrainingDataChannels = IncrementalTrainingDataChannel[];
export const IncrementalTrainingDataChannels = /*@__PURE__*/ S.Array(
  IncrementalTrainingDataChannel,
);
export type S3DataDistributionType =
  | "FullyReplicated"
  | "ShardedByS3Key"
  | (string & {});
export const S3DataDistributionType = /*@__PURE__*/ S.String;

export interface ModelTrainingDataChannel {
  mlInputChannelArn: string;
  channelName: string;
  s3DataDistributionType?: S3DataDistributionType;
}
export const ModelTrainingDataChannel = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    mlInputChannelArn: S.String,
    channelName: S.String,
    s3DataDistributionType: S.optional(S3DataDistributionType),
  }),
).annotate({
  identifier: "ModelTrainingDataChannel",
}) as any as S.Schema<ModelTrainingDataChannel>;
export type ModelTrainingDataChannels = ModelTrainingDataChannel[];
export const ModelTrainingDataChannels = /*@__PURE__*/ S.Array(
  ModelTrainingDataChannel,
);
export type TrainingInputMode = "File" | "FastFile" | "Pipe" | (string & {});
export const TrainingInputMode = /*@__PURE__*/ S.String;

export interface CreateTrainedModelRequest {
  membershipIdentifier: string;
  name: string;
  configuredModelAlgorithmAssociationArn: string;
  hyperparameters?: { [key: string]: string | undefined };
  environment?: { [key: string]: string | undefined };
  resourceConfig: ResourceConfig;
  stoppingCondition?: StoppingCondition;
  incrementalTrainingDataChannels?: IncrementalTrainingDataChannel[];
  dataChannels: ModelTrainingDataChannel[];
  trainingInputMode?: TrainingInputMode;
  description?: string;
  kmsKeyArn?: string;
  tags?: { [key: string]: string | undefined };
  mlModelTrainingPayerAccountId?: string;
}
export const CreateTrainedModelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
    name: S.String,
    configuredModelAlgorithmAssociationArn: S.String,
    hyperparameters: S.optional(HyperParameters),
    environment: S.optional(Environment),
    resourceConfig: ResourceConfig,
    stoppingCondition: S.optional(StoppingCondition),
    incrementalTrainingDataChannels: S.optional(
      IncrementalTrainingDataChannels,
    ),
    dataChannels: ModelTrainingDataChannels,
    trainingInputMode: S.optional(TrainingInputMode),
    description: S.optional(S.String),
    kmsKeyArn: S.optional(S.String),
    tags: S.optional(TagMap),
    mlModelTrainingPayerAccountId: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/memberships/{membershipIdentifier}/trained-models",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateTrainedModelRequest",
}) as any as S.Schema<CreateTrainedModelRequest>;
export interface CreateTrainedModelResponse {
  trainedModelArn: string;
  versionIdentifier?: string;
}
export const CreateTrainedModelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    trainedModelArn: S.String,
    versionIdentifier: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateTrainedModelResponse",
}) as any as S.Schema<CreateTrainedModelResponse>;
export type DatasetType = "INTERACTIONS" | (string & {});
export const DatasetType = /*@__PURE__*/ S.String;

export type ColumnName = string;
export type ColumnType =
  | "USER_ID"
  | "ITEM_ID"
  | "TIMESTAMP"
  | "CATEGORICAL_FEATURE"
  | "NUMERICAL_FEATURE"
  | (string & {});
export const ColumnType = /*@__PURE__*/ S.String;

export type ColumnTypeList = ColumnType[];
export const ColumnTypeList = /*@__PURE__*/ S.Array(ColumnType);
export interface ColumnSchema {
  columnName: string;
  columnTypes: ColumnType[];
}
export const ColumnSchema = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ columnName: S.String, columnTypes: ColumnTypeList }),
).annotate({ identifier: "ColumnSchema" }) as any as S.Schema<ColumnSchema>;
export type DatasetSchemaList = ColumnSchema[];
export const DatasetSchemaList = /*@__PURE__*/ S.Array(ColumnSchema);
export type GlueTableName = string;
export type GlueDatabaseName = string;
export interface GlueDataSource {
  tableName: string;
  databaseName: string;
  catalogId?: string;
}
export const GlueDataSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    tableName: S.String,
    databaseName: S.String,
    catalogId: S.optional(S.String),
  }),
).annotate({ identifier: "GlueDataSource" }) as any as S.Schema<GlueDataSource>;
export interface DataSource {
  glueDataSource: GlueDataSource;
}
export const DataSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ glueDataSource: GlueDataSource }),
).annotate({ identifier: "DataSource" }) as any as S.Schema<DataSource>;
export interface DatasetInputConfig {
  schema: ColumnSchema[];
  dataSource: DataSource;
}
export const DatasetInputConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ schema: DatasetSchemaList, dataSource: DataSource }),
).annotate({
  identifier: "DatasetInputConfig",
}) as any as S.Schema<DatasetInputConfig>;
export interface Dataset {
  type: DatasetType;
  inputConfig: DatasetInputConfig;
}
export const Dataset = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ type: DatasetType, inputConfig: DatasetInputConfig }),
).annotate({ identifier: "Dataset" }) as any as S.Schema<Dataset>;
export type DatasetList = Dataset[];
export const DatasetList = /*@__PURE__*/ S.Array(Dataset);
export interface CreateTrainingDatasetRequest {
  name: string;
  roleArn: string;
  trainingData: Dataset[];
  tags?: { [key: string]: string | undefined };
  description?: string;
}
export const CreateTrainingDatasetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    roleArn: S.String,
    trainingData: DatasetList,
    tags: S.optional(TagMap),
    description: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/training-dataset" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateTrainingDatasetRequest",
}) as any as S.Schema<CreateTrainingDatasetRequest>;
export interface CreateTrainingDatasetResponse {
  trainingDatasetArn: string;
}
export const CreateTrainingDatasetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ trainingDatasetArn: S.String }),
).annotate({
  identifier: "CreateTrainingDatasetResponse",
}) as any as S.Schema<CreateTrainingDatasetResponse>;
export type AudienceGenerationJobArn = string;
export interface DeleteAudienceGenerationJobRequest {
  audienceGenerationJobArn: string;
}
export const DeleteAudienceGenerationJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    audienceGenerationJobArn: S.String.pipe(
      T.HttpLabel("audienceGenerationJobArn"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/audience-generation-job/{audienceGenerationJobArn}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAudienceGenerationJobRequest",
}) as any as S.Schema<DeleteAudienceGenerationJobRequest>;
export interface DeleteAudienceGenerationJobResponse {}
export const DeleteAudienceGenerationJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAudienceGenerationJobResponse",
}) as any as S.Schema<DeleteAudienceGenerationJobResponse>;
export interface DeleteAudienceModelRequest {
  audienceModelArn: string;
}
export const DeleteAudienceModelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    audienceModelArn: S.String.pipe(T.HttpLabel("audienceModelArn")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/audience-model/{audienceModelArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAudienceModelRequest",
}) as any as S.Schema<DeleteAudienceModelRequest>;
export interface DeleteAudienceModelResponse {}
export const DeleteAudienceModelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAudienceModelResponse",
}) as any as S.Schema<DeleteAudienceModelResponse>;
export interface DeleteConfiguredAudienceModelRequest {
  configuredAudienceModelArn: string;
}
export const DeleteConfiguredAudienceModelRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      configuredAudienceModelArn: S.String.pipe(
        T.HttpLabel("configuredAudienceModelArn"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/configured-audience-model/{configuredAudienceModelArn}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteConfiguredAudienceModelRequest",
}) as any as S.Schema<DeleteConfiguredAudienceModelRequest>;
export interface DeleteConfiguredAudienceModelResponse {}
export const DeleteConfiguredAudienceModelResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeleteConfiguredAudienceModelResponse",
}) as any as S.Schema<DeleteConfiguredAudienceModelResponse>;
export interface DeleteConfiguredAudienceModelPolicyRequest {
  configuredAudienceModelArn: string;
}
export const DeleteConfiguredAudienceModelPolicyRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      configuredAudienceModelArn: S.String.pipe(
        T.HttpLabel("configuredAudienceModelArn"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/configured-audience-model/{configuredAudienceModelArn}/policy",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DeleteConfiguredAudienceModelPolicyRequest",
  }) as any as S.Schema<DeleteConfiguredAudienceModelPolicyRequest>;
export interface DeleteConfiguredAudienceModelPolicyResponse {}
export const DeleteConfiguredAudienceModelPolicyResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "DeleteConfiguredAudienceModelPolicyResponse",
  }) as any as S.Schema<DeleteConfiguredAudienceModelPolicyResponse>;
export interface DeleteConfiguredModelAlgorithmRequest {
  configuredModelAlgorithmArn: string;
}
export const DeleteConfiguredModelAlgorithmRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      configuredModelAlgorithmArn: S.String.pipe(
        T.HttpLabel("configuredModelAlgorithmArn"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/configured-model-algorithms/{configuredModelAlgorithmArn}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteConfiguredModelAlgorithmRequest",
}) as any as S.Schema<DeleteConfiguredModelAlgorithmRequest>;
export interface DeleteConfiguredModelAlgorithmResponse {}
export const DeleteConfiguredModelAlgorithmResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeleteConfiguredModelAlgorithmResponse",
}) as any as S.Schema<DeleteConfiguredModelAlgorithmResponse>;
export interface DeleteConfiguredModelAlgorithmAssociationRequest {
  configuredModelAlgorithmAssociationArn: string;
  membershipIdentifier: string;
}
export const DeleteConfiguredModelAlgorithmAssociationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      configuredModelAlgorithmAssociationArn: S.String.pipe(
        T.HttpLabel("configuredModelAlgorithmAssociationArn"),
      ),
      membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
    }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/memberships/{membershipIdentifier}/configured-model-algorithm-associations/{configuredModelAlgorithmAssociationArn}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DeleteConfiguredModelAlgorithmAssociationRequest",
  }) as any as S.Schema<DeleteConfiguredModelAlgorithmAssociationRequest>;
export interface DeleteConfiguredModelAlgorithmAssociationResponse {}
export const DeleteConfiguredModelAlgorithmAssociationResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "DeleteConfiguredModelAlgorithmAssociationResponse",
  }) as any as S.Schema<DeleteConfiguredModelAlgorithmAssociationResponse>;
export interface DeleteMLConfigurationRequest {
  membershipIdentifier: string;
}
export const DeleteMLConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/memberships/{membershipIdentifier}/ml-configurations",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteMLConfigurationRequest",
}) as any as S.Schema<DeleteMLConfigurationRequest>;
export interface DeleteMLConfigurationResponse {}
export const DeleteMLConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteMLConfigurationResponse",
}) as any as S.Schema<DeleteMLConfigurationResponse>;
export interface DeleteMLInputChannelDataRequest {
  mlInputChannelArn: string;
  membershipIdentifier: string;
}
export const DeleteMLInputChannelDataRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    mlInputChannelArn: S.String.pipe(T.HttpLabel("mlInputChannelArn")),
    membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/memberships/{membershipIdentifier}/ml-input-channels/{mlInputChannelArn}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteMLInputChannelDataRequest",
}) as any as S.Schema<DeleteMLInputChannelDataRequest>;
export interface DeleteMLInputChannelDataResponse {}
export const DeleteMLInputChannelDataResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteMLInputChannelDataResponse",
}) as any as S.Schema<DeleteMLInputChannelDataResponse>;
export interface DeleteTrainedModelOutputRequest {
  trainedModelArn: string;
  membershipIdentifier: string;
  versionIdentifier?: string;
}
export const DeleteTrainedModelOutputRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    trainedModelArn: S.String.pipe(T.HttpLabel("trainedModelArn")),
    membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
    versionIdentifier: S.optional(S.String).pipe(
      T.HttpQuery("versionIdentifier"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/memberships/{membershipIdentifier}/trained-models/{trainedModelArn}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteTrainedModelOutputRequest",
}) as any as S.Schema<DeleteTrainedModelOutputRequest>;
export interface DeleteTrainedModelOutputResponse {}
export const DeleteTrainedModelOutputResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteTrainedModelOutputResponse",
}) as any as S.Schema<DeleteTrainedModelOutputResponse>;
export interface DeleteTrainingDatasetRequest {
  trainingDatasetArn: string;
}
export const DeleteTrainingDatasetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    trainingDatasetArn: S.String.pipe(T.HttpLabel("trainingDatasetArn")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/training-dataset/{trainingDatasetArn}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteTrainingDatasetRequest",
}) as any as S.Schema<DeleteTrainingDatasetRequest>;
export interface DeleteTrainingDatasetResponse {}
export const DeleteTrainingDatasetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteTrainingDatasetResponse",
}) as any as S.Schema<DeleteTrainingDatasetResponse>;
export interface GetAudienceGenerationJobRequest {
  audienceGenerationJobArn: string;
}
export const GetAudienceGenerationJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    audienceGenerationJobArn: S.String.pipe(
      T.HttpLabel("audienceGenerationJobArn"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/audience-generation-job/{audienceGenerationJobArn}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAudienceGenerationJobRequest",
}) as any as S.Schema<GetAudienceGenerationJobRequest>;
export type AudienceGenerationJobStatus =
  | "CREATE_PENDING"
  | "CREATE_IN_PROGRESS"
  | "CREATE_FAILED"
  | "ACTIVE"
  | "DELETE_PENDING"
  | "DELETE_IN_PROGRESS"
  | "DELETE_FAILED"
  | (string & {});
export const AudienceGenerationJobStatus = /*@__PURE__*/ S.String;

export interface StatusDetails {
  statusCode?: string;
  message?: string;
}
export const StatusDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ statusCode: S.optional(S.String), message: S.optional(S.String) }),
).annotate({ identifier: "StatusDetails" }) as any as S.Schema<StatusDetails>;
export interface AudienceGenerationJobDataSource {
  dataSource?: S3ConfigMap;
  roleArn: string;
  sqlParameters?: ProtectedQuerySQLParameters;
  sqlComputeConfiguration?: ComputeConfiguration;
}
export const AudienceGenerationJobDataSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dataSource: S.optional(S3ConfigMap),
    roleArn: S.String,
    sqlParameters: S.optional(ProtectedQuerySQLParameters),
    sqlComputeConfiguration: S.optional(ComputeConfiguration),
  }),
).annotate({
  identifier: "AudienceGenerationJobDataSource",
}) as any as S.Schema<AudienceGenerationJobDataSource>;
export interface AudienceSize {
  type: AudienceSizeType;
  value: number;
}
export const AudienceSize = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ type: AudienceSizeType, value: S.Number }),
).annotate({ identifier: "AudienceSize" }) as any as S.Schema<AudienceSize>;
export interface RelevanceMetric {
  audienceSize: AudienceSize;
  score?: number;
}
export const RelevanceMetric = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ audienceSize: AudienceSize, score: S.optional(S.Number) }),
).annotate({
  identifier: "RelevanceMetric",
}) as any as S.Schema<RelevanceMetric>;
export type RelevanceMetrics = RelevanceMetric[];
export const RelevanceMetrics = /*@__PURE__*/ S.Array(RelevanceMetric);
export interface AudienceQualityMetrics {
  relevanceMetrics: RelevanceMetric[];
  recallMetric?: number;
}
export const AudienceQualityMetrics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    relevanceMetrics: RelevanceMetrics,
    recallMetric: S.optional(S.Number),
  }),
).annotate({
  identifier: "AudienceQualityMetrics",
}) as any as S.Schema<AudienceQualityMetrics>;
export interface GetAudienceGenerationJobResponse {
  createTime: Date;
  updateTime: Date;
  audienceGenerationJobArn: string;
  name: string;
  description?: string;
  status: AudienceGenerationJobStatus;
  statusDetails?: StatusDetails;
  configuredAudienceModelArn: string;
  seedAudience?: AudienceGenerationJobDataSource;
  includeSeedInOutput?: boolean;
  collaborationId?: string;
  metrics?: AudienceQualityMetrics;
  startedBy?: string;
  tags?: { [key: string]: string | undefined };
  protectedQueryIdentifier?: string;
}
export const GetAudienceGenerationJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    audienceGenerationJobArn: S.String,
    name: S.String,
    description: S.optional(S.String),
    status: AudienceGenerationJobStatus,
    statusDetails: S.optional(StatusDetails),
    configuredAudienceModelArn: S.String,
    seedAudience: S.optional(AudienceGenerationJobDataSource),
    includeSeedInOutput: S.optional(S.Boolean),
    collaborationId: S.optional(S.String),
    metrics: S.optional(AudienceQualityMetrics),
    startedBy: S.optional(S.String),
    tags: S.optional(TagMap),
    protectedQueryIdentifier: S.optional(S.String),
  }),
).annotate({
  identifier: "GetAudienceGenerationJobResponse",
}) as any as S.Schema<GetAudienceGenerationJobResponse>;
export interface GetAudienceModelRequest {
  audienceModelArn: string;
}
export const GetAudienceModelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    audienceModelArn: S.String.pipe(T.HttpLabel("audienceModelArn")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/audience-model/{audienceModelArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAudienceModelRequest",
}) as any as S.Schema<GetAudienceModelRequest>;
export type AudienceModelStatus =
  | "CREATE_PENDING"
  | "CREATE_IN_PROGRESS"
  | "CREATE_FAILED"
  | "ACTIVE"
  | "DELETE_PENDING"
  | "DELETE_IN_PROGRESS"
  | "DELETE_FAILED"
  | (string & {});
export const AudienceModelStatus = /*@__PURE__*/ S.String;

export interface GetAudienceModelResponse {
  createTime: Date;
  updateTime: Date;
  trainingDataStartTime?: Date;
  trainingDataEndTime?: Date;
  audienceModelArn: string;
  name: string;
  trainingDatasetArn: string;
  status: AudienceModelStatus;
  statusDetails?: StatusDetails;
  kmsKeyArn?: string;
  tags?: { [key: string]: string | undefined };
  description?: string;
}
export const GetAudienceModelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    trainingDataStartTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    trainingDataEndTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    audienceModelArn: S.String,
    name: S.String,
    trainingDatasetArn: S.String,
    status: AudienceModelStatus,
    statusDetails: S.optional(StatusDetails),
    kmsKeyArn: S.optional(S.String),
    tags: S.optional(TagMap),
    description: S.optional(S.String),
  }),
).annotate({
  identifier: "GetAudienceModelResponse",
}) as any as S.Schema<GetAudienceModelResponse>;
export interface GetCollaborationConfiguredModelAlgorithmAssociationRequest {
  configuredModelAlgorithmAssociationArn: string;
  collaborationIdentifier: string;
}
export const GetCollaborationConfiguredModelAlgorithmAssociationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      configuredModelAlgorithmAssociationArn: S.String.pipe(
        T.HttpLabel("configuredModelAlgorithmAssociationArn"),
      ),
      collaborationIdentifier: S.String.pipe(
        T.HttpLabel("collaborationIdentifier"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/collaborations/{collaborationIdentifier}/configured-model-algorithm-associations/{configuredModelAlgorithmAssociationArn}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "GetCollaborationConfiguredModelAlgorithmAssociationRequest",
  }) as any as S.Schema<GetCollaborationConfiguredModelAlgorithmAssociationRequest>;
export interface GetCollaborationConfiguredModelAlgorithmAssociationResponse {
  createTime: Date;
  updateTime: Date;
  configuredModelAlgorithmAssociationArn: string;
  membershipIdentifier: string;
  collaborationIdentifier: string;
  configuredModelAlgorithmArn: string;
  name: string;
  description?: string;
  creatorAccountId: string;
  privacyConfiguration?: PrivacyConfiguration;
}
export const GetCollaborationConfiguredModelAlgorithmAssociationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
      updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
      configuredModelAlgorithmAssociationArn: S.String,
      membershipIdentifier: S.String,
      collaborationIdentifier: S.String,
      configuredModelAlgorithmArn: S.String,
      name: S.String,
      description: S.optional(S.String),
      creatorAccountId: S.String,
      privacyConfiguration: S.optional(PrivacyConfiguration),
    }),
  ).annotate({
    identifier: "GetCollaborationConfiguredModelAlgorithmAssociationResponse",
  }) as any as S.Schema<GetCollaborationConfiguredModelAlgorithmAssociationResponse>;
export interface GetCollaborationMLInputChannelRequest {
  mlInputChannelArn: string;
  collaborationIdentifier: string;
}
export const GetCollaborationMLInputChannelRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      mlInputChannelArn: S.String.pipe(T.HttpLabel("mlInputChannelArn")),
      collaborationIdentifier: S.String.pipe(
        T.HttpLabel("collaborationIdentifier"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/collaborations/{collaborationIdentifier}/ml-input-channels/{mlInputChannelArn}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetCollaborationMLInputChannelRequest",
}) as any as S.Schema<GetCollaborationMLInputChannelRequest>;
export type MLInputChannelStatus =
  | "CREATE_PENDING"
  | "CREATE_IN_PROGRESS"
  | "CREATE_FAILED"
  | "ACTIVE"
  | "DELETE_PENDING"
  | "DELETE_IN_PROGRESS"
  | "DELETE_FAILED"
  | "INACTIVE"
  | (string & {});
export const MLInputChannelStatus = /*@__PURE__*/ S.String;

export type BudgetedResourceArn = string;
export type Budget = number;
export type AccessBudgetType =
  | "CALENDAR_DAY"
  | "CALENDAR_MONTH"
  | "CALENDAR_WEEK"
  | "LIFETIME"
  | (string & {});
export const AccessBudgetType = /*@__PURE__*/ S.String;

export type AutoRefreshMode = "ENABLED" | "DISABLED" | (string & {});
export const AutoRefreshMode = /*@__PURE__*/ S.String;

export interface AccessBudgetDetails {
  startTime: Date;
  endTime?: Date;
  remainingBudget: number;
  budget: number;
  budgetType: AccessBudgetType;
  autoRefresh?: AutoRefreshMode;
}
export const AccessBudgetDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    startTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    remainingBudget: S.Number,
    budget: S.Number,
    budgetType: AccessBudgetType,
    autoRefresh: S.optional(AutoRefreshMode),
  }),
).annotate({
  identifier: "AccessBudgetDetails",
}) as any as S.Schema<AccessBudgetDetails>;
export type AccessBudgetDetailsList = AccessBudgetDetails[];
export const AccessBudgetDetailsList =
  /*@__PURE__*/ S.Array(AccessBudgetDetails);
export interface AccessBudget {
  resourceArn: string;
  details: AccessBudgetDetails[];
  aggregateRemainingBudget: number;
}
export const AccessBudget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String,
    details: AccessBudgetDetailsList,
    aggregateRemainingBudget: S.Number,
  }),
).annotate({ identifier: "AccessBudget" }) as any as S.Schema<AccessBudget>;
export type AccessBudgets = AccessBudget[];
export const AccessBudgets = /*@__PURE__*/ S.Array(AccessBudget);
export type PrivacyBudgets = { accessBudgets: AccessBudget[] };
export const PrivacyBudgets = /*@__PURE__*/ S.Union([
  S.Struct({ accessBudgets: AccessBudgets }),
]);
export type SyntheticDataColumnName = string;
export type SyntheticDataColumnType =
  | "CATEGORICAL"
  | "NUMERICAL"
  | (string & {});
export const SyntheticDataColumnType = /*@__PURE__*/ S.String;

export interface SyntheticDataColumnProperties {
  columnName: string;
  columnType: SyntheticDataColumnType;
  isPredictiveValue: boolean;
}
export const SyntheticDataColumnProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    columnName: S.String,
    columnType: SyntheticDataColumnType,
    isPredictiveValue: S.Boolean,
  }),
).annotate({
  identifier: "SyntheticDataColumnProperties",
}) as any as S.Schema<SyntheticDataColumnProperties>;
export type ColumnMappingList = SyntheticDataColumnProperties[];
export const ColumnMappingList = /*@__PURE__*/ S.Array(
  SyntheticDataColumnProperties,
);
export interface ColumnClassificationDetails {
  columnMapping: SyntheticDataColumnProperties[];
}
export const ColumnClassificationDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ columnMapping: ColumnMappingList }),
).annotate({
  identifier: "ColumnClassificationDetails",
}) as any as S.Schema<ColumnClassificationDetails>;
export interface MLSyntheticDataParameters {
  epsilon: number;
  maxMembershipInferenceAttackScore: number;
  columnClassification?: ColumnClassificationDetails;
}
export const MLSyntheticDataParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    epsilon: S.Number,
    maxMembershipInferenceAttackScore: S.Number,
    columnClassification: S.optional(ColumnClassificationDetails),
  }),
).annotate({
  identifier: "MLSyntheticDataParameters",
}) as any as S.Schema<MLSyntheticDataParameters>;
export type MembershipInferenceAttackVersion =
  | "DISTANCE_TO_CLOSEST_RECORD_V1"
  | (string & {});
export const MembershipInferenceAttackVersion = /*@__PURE__*/ S.String;

export interface MembershipInferenceAttackScore {
  attackVersion: MembershipInferenceAttackVersion;
  score: number;
}
export const MembershipInferenceAttackScore = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    attackVersion: MembershipInferenceAttackVersion,
    score: S.Number,
  }),
).annotate({
  identifier: "MembershipInferenceAttackScore",
}) as any as S.Schema<MembershipInferenceAttackScore>;
export type MembershipInferenceAttackScoreList =
  MembershipInferenceAttackScore[];
export const MembershipInferenceAttackScoreList = /*@__PURE__*/ S.Array(
  MembershipInferenceAttackScore,
);
export interface DataPrivacyScores {
  membershipInferenceAttackScores: MembershipInferenceAttackScore[];
}
export const DataPrivacyScores = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    membershipInferenceAttackScores: MembershipInferenceAttackScoreList,
  }),
).annotate({
  identifier: "DataPrivacyScores",
}) as any as S.Schema<DataPrivacyScores>;
export interface SyntheticDataEvaluationScores {
  dataPrivacyScores: DataPrivacyScores;
}
export const SyntheticDataEvaluationScores = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ dataPrivacyScores: DataPrivacyScores }),
).annotate({
  identifier: "SyntheticDataEvaluationScores",
}) as any as S.Schema<SyntheticDataEvaluationScores>;
export interface SyntheticDataConfiguration {
  syntheticDataParameters: MLSyntheticDataParameters;
  syntheticDataEvaluationScores?: SyntheticDataEvaluationScores;
}
export const SyntheticDataConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    syntheticDataParameters: MLSyntheticDataParameters,
    syntheticDataEvaluationScores: S.optional(SyntheticDataEvaluationScores),
  }),
).annotate({
  identifier: "SyntheticDataConfiguration",
}) as any as S.Schema<SyntheticDataConfiguration>;
export interface GetCollaborationMLInputChannelResponse {
  membershipIdentifier: string;
  collaborationIdentifier: string;
  mlInputChannelArn: string;
  name: string;
  configuredModelAlgorithmAssociations: string[];
  status: MLInputChannelStatus;
  statusDetails?: StatusDetails;
  retentionInDays: number;
  numberOfRecords?: number;
  privacyBudgets?: PrivacyBudgets;
  description?: string;
  syntheticDataConfiguration?: SyntheticDataConfiguration;
  payerConfiguration?: PayerConfiguration;
  createTime: Date;
  updateTime: Date;
  creatorAccountId: string;
}
export const GetCollaborationMLInputChannelResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      membershipIdentifier: S.String,
      collaborationIdentifier: S.String,
      mlInputChannelArn: S.String,
      name: S.String,
      configuredModelAlgorithmAssociations:
        ConfiguredModelAlgorithmAssociationArnList,
      status: MLInputChannelStatus,
      statusDetails: S.optional(StatusDetails),
      retentionInDays: S.Number,
      numberOfRecords: S.optional(S.Number),
      privacyBudgets: S.optional(PrivacyBudgets),
      description: S.optional(S.String),
      syntheticDataConfiguration: S.optional(SyntheticDataConfiguration),
      payerConfiguration: S.optional(PayerConfiguration),
      createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
      updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
      creatorAccountId: S.String,
    }),
).annotate({
  identifier: "GetCollaborationMLInputChannelResponse",
}) as any as S.Schema<GetCollaborationMLInputChannelResponse>;
export interface GetCollaborationTrainedModelRequest {
  trainedModelArn: string;
  collaborationIdentifier: string;
  versionIdentifier?: string;
}
export const GetCollaborationTrainedModelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    trainedModelArn: S.String.pipe(T.HttpLabel("trainedModelArn")),
    collaborationIdentifier: S.String.pipe(
      T.HttpLabel("collaborationIdentifier"),
    ),
    versionIdentifier: S.optional(S.String).pipe(
      T.HttpQuery("versionIdentifier"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/collaborations/{collaborationIdentifier}/trained-models/{trainedModelArn}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCollaborationTrainedModelRequest",
}) as any as S.Schema<GetCollaborationTrainedModelRequest>;
export interface IncrementalTrainingDataChannelOutput {
  channelName: string;
  versionIdentifier?: string;
  modelName: string;
}
export const IncrementalTrainingDataChannelOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      channelName: S.String,
      versionIdentifier: S.optional(S.String),
      modelName: S.String,
    }),
).annotate({
  identifier: "IncrementalTrainingDataChannelOutput",
}) as any as S.Schema<IncrementalTrainingDataChannelOutput>;
export type IncrementalTrainingDataChannelsOutput =
  IncrementalTrainingDataChannelOutput[];
export const IncrementalTrainingDataChannelsOutput = /*@__PURE__*/ S.Array(
  IncrementalTrainingDataChannelOutput,
);
export type TrainedModelStatus =
  | "CREATE_PENDING"
  | "CREATE_IN_PROGRESS"
  | "CREATE_FAILED"
  | "ACTIVE"
  | "DELETE_PENDING"
  | "DELETE_IN_PROGRESS"
  | "DELETE_FAILED"
  | "INACTIVE"
  | "CANCEL_PENDING"
  | "CANCEL_IN_PROGRESS"
  | "CANCEL_FAILED"
  | (string & {});
export const TrainedModelStatus = /*@__PURE__*/ S.String;

export type MetricsStatus =
  | "PUBLISH_SUCCEEDED"
  | "PUBLISH_FAILED"
  | (string & {});
export const MetricsStatus = /*@__PURE__*/ S.String;

export type LogsStatus = "PUBLISH_SUCCEEDED" | "PUBLISH_FAILED" | (string & {});
export const LogsStatus = /*@__PURE__*/ S.String;

export interface GetCollaborationTrainedModelResponse {
  membershipIdentifier: string;
  collaborationIdentifier: string;
  trainedModelArn: string;
  versionIdentifier?: string;
  incrementalTrainingDataChannels?: IncrementalTrainingDataChannelOutput[];
  name: string;
  description?: string;
  status: TrainedModelStatus;
  statusDetails?: StatusDetails;
  configuredModelAlgorithmAssociationArn: string;
  resourceConfig?: ResourceConfig;
  trainingInputMode?: TrainingInputMode;
  stoppingCondition?: StoppingCondition;
  metricsStatus?: MetricsStatus;
  metricsStatusDetails?: string;
  logsStatus?: LogsStatus;
  logsStatusDetails?: string;
  trainingContainerImageDigest?: string;
  mlModelTrainingPayerAccountId?: string;
  createTime: Date;
  updateTime: Date;
  creatorAccountId: string;
}
export const GetCollaborationTrainedModelResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      membershipIdentifier: S.String,
      collaborationIdentifier: S.String,
      trainedModelArn: S.String,
      versionIdentifier: S.optional(S.String),
      incrementalTrainingDataChannels: S.optional(
        IncrementalTrainingDataChannelsOutput,
      ),
      name: S.String,
      description: S.optional(S.String),
      status: TrainedModelStatus,
      statusDetails: S.optional(StatusDetails),
      configuredModelAlgorithmAssociationArn: S.String,
      resourceConfig: S.optional(ResourceConfig),
      trainingInputMode: S.optional(TrainingInputMode),
      stoppingCondition: S.optional(StoppingCondition),
      metricsStatus: S.optional(MetricsStatus),
      metricsStatusDetails: S.optional(S.String),
      logsStatus: S.optional(LogsStatus),
      logsStatusDetails: S.optional(S.String),
      trainingContainerImageDigest: S.optional(S.String),
      mlModelTrainingPayerAccountId: S.optional(S.String),
      createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
      updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
      creatorAccountId: S.String,
    }),
).annotate({
  identifier: "GetCollaborationTrainedModelResponse",
}) as any as S.Schema<GetCollaborationTrainedModelResponse>;
export interface GetConfiguredAudienceModelRequest {
  configuredAudienceModelArn: string;
}
export const GetConfiguredAudienceModelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configuredAudienceModelArn: S.String.pipe(
      T.HttpLabel("configuredAudienceModelArn"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/configured-audience-model/{configuredAudienceModelArn}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetConfiguredAudienceModelRequest",
}) as any as S.Schema<GetConfiguredAudienceModelRequest>;
export type ConfiguredAudienceModelStatus = "ACTIVE" | (string & {});
export const ConfiguredAudienceModelStatus = /*@__PURE__*/ S.String;

export interface GetConfiguredAudienceModelResponse {
  createTime: Date;
  updateTime: Date;
  configuredAudienceModelArn: string;
  name: string;
  audienceModelArn: string;
  outputConfig: ConfiguredAudienceModelOutputConfig;
  description?: string;
  status: ConfiguredAudienceModelStatus;
  sharedAudienceMetrics: SharedAudienceMetrics[];
  minMatchingSeedSize?: number;
  audienceSizeConfig?: AudienceSizeConfig;
  tags?: { [key: string]: string | undefined };
  childResourceTagOnCreatePolicy?: TagOnCreatePolicy;
}
export const GetConfiguredAudienceModelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    configuredAudienceModelArn: S.String,
    name: S.String,
    audienceModelArn: S.String,
    outputConfig: ConfiguredAudienceModelOutputConfig,
    description: S.optional(S.String),
    status: ConfiguredAudienceModelStatus,
    sharedAudienceMetrics: MetricsList,
    minMatchingSeedSize: S.optional(S.Number),
    audienceSizeConfig: S.optional(AudienceSizeConfig),
    tags: S.optional(TagMap),
    childResourceTagOnCreatePolicy: S.optional(TagOnCreatePolicy),
  }),
).annotate({
  identifier: "GetConfiguredAudienceModelResponse",
}) as any as S.Schema<GetConfiguredAudienceModelResponse>;
export interface GetConfiguredAudienceModelPolicyRequest {
  configuredAudienceModelArn: string;
}
export const GetConfiguredAudienceModelPolicyRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      configuredAudienceModelArn: S.String.pipe(
        T.HttpLabel("configuredAudienceModelArn"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/configured-audience-model/{configuredAudienceModelArn}/policy",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetConfiguredAudienceModelPolicyRequest",
}) as any as S.Schema<GetConfiguredAudienceModelPolicyRequest>;
export type ResourcePolicy = string;
export type Hash = string;
export interface GetConfiguredAudienceModelPolicyResponse {
  configuredAudienceModelArn: string;
  configuredAudienceModelPolicy: string;
  policyHash: string;
}
export const GetConfiguredAudienceModelPolicyResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      configuredAudienceModelArn: S.String,
      configuredAudienceModelPolicy: S.String,
      policyHash: S.String,
    }),
).annotate({
  identifier: "GetConfiguredAudienceModelPolicyResponse",
}) as any as S.Schema<GetConfiguredAudienceModelPolicyResponse>;
export interface GetConfiguredModelAlgorithmRequest {
  configuredModelAlgorithmArn: string;
}
export const GetConfiguredModelAlgorithmRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configuredModelAlgorithmArn: S.String.pipe(
      T.HttpLabel("configuredModelAlgorithmArn"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/configured-model-algorithms/{configuredModelAlgorithmArn}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetConfiguredModelAlgorithmRequest",
}) as any as S.Schema<GetConfiguredModelAlgorithmRequest>;
export interface GetConfiguredModelAlgorithmResponse {
  createTime: Date;
  updateTime: Date;
  configuredModelAlgorithmArn: string;
  name: string;
  trainingContainerConfig?: ContainerConfig;
  inferenceContainerConfig?: InferenceContainerConfig;
  roleArn: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
  kmsKeyArn?: string;
}
export const GetConfiguredModelAlgorithmResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    configuredModelAlgorithmArn: S.String,
    name: S.String,
    trainingContainerConfig: S.optional(ContainerConfig),
    inferenceContainerConfig: S.optional(InferenceContainerConfig),
    roleArn: S.String,
    description: S.optional(S.String),
    tags: S.optional(TagMap),
    kmsKeyArn: S.optional(S.String),
  }),
).annotate({
  identifier: "GetConfiguredModelAlgorithmResponse",
}) as any as S.Schema<GetConfiguredModelAlgorithmResponse>;
export interface GetConfiguredModelAlgorithmAssociationRequest {
  configuredModelAlgorithmAssociationArn: string;
  membershipIdentifier: string;
}
export const GetConfiguredModelAlgorithmAssociationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      configuredModelAlgorithmAssociationArn: S.String.pipe(
        T.HttpLabel("configuredModelAlgorithmAssociationArn"),
      ),
      membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/memberships/{membershipIdentifier}/configured-model-algorithm-associations/{configuredModelAlgorithmAssociationArn}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "GetConfiguredModelAlgorithmAssociationRequest",
  }) as any as S.Schema<GetConfiguredModelAlgorithmAssociationRequest>;
export interface GetConfiguredModelAlgorithmAssociationResponse {
  createTime: Date;
  updateTime: Date;
  configuredModelAlgorithmAssociationArn: string;
  membershipIdentifier: string;
  collaborationIdentifier: string;
  configuredModelAlgorithmArn: string;
  name: string;
  privacyConfiguration?: PrivacyConfiguration;
  description?: string;
  tags?: { [key: string]: string | undefined };
}
export const GetConfiguredModelAlgorithmAssociationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
      updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
      configuredModelAlgorithmAssociationArn: S.String,
      membershipIdentifier: S.String,
      collaborationIdentifier: S.String,
      configuredModelAlgorithmArn: S.String,
      name: S.String,
      privacyConfiguration: S.optional(PrivacyConfiguration),
      description: S.optional(S.String),
      tags: S.optional(TagMap),
    }),
  ).annotate({
    identifier: "GetConfiguredModelAlgorithmAssociationResponse",
  }) as any as S.Schema<GetConfiguredModelAlgorithmAssociationResponse>;
export interface GetMLConfigurationRequest {
  membershipIdentifier: string;
}
export const GetMLConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/memberships/{membershipIdentifier}/ml-configurations",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMLConfigurationRequest",
}) as any as S.Schema<GetMLConfigurationRequest>;
export interface Destination {
  s3Destination: S3ConfigMap;
}
export const Destination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ s3Destination: S3ConfigMap }),
).annotate({ identifier: "Destination" }) as any as S.Schema<Destination>;
export interface MLOutputConfiguration {
  destination?: Destination;
  roleArn: string;
}
export const MLOutputConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ destination: S.optional(Destination), roleArn: S.String }),
).annotate({
  identifier: "MLOutputConfiguration",
}) as any as S.Schema<MLOutputConfiguration>;
export interface GetMLConfigurationResponse {
  membershipIdentifier: string;
  defaultOutputLocation: MLOutputConfiguration;
  createTime: Date;
  updateTime: Date;
}
export const GetMLConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    membershipIdentifier: S.String,
    defaultOutputLocation: MLOutputConfiguration,
    createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "GetMLConfigurationResponse",
}) as any as S.Schema<GetMLConfigurationResponse>;
export interface GetMLInputChannelRequest {
  mlInputChannelArn: string;
  membershipIdentifier: string;
}
export const GetMLInputChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    mlInputChannelArn: S.String.pipe(T.HttpLabel("mlInputChannelArn")),
    membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/memberships/{membershipIdentifier}/ml-input-channels/{mlInputChannelArn}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMLInputChannelRequest",
}) as any as S.Schema<GetMLInputChannelRequest>;
export interface GetMLInputChannelResponse {
  membershipIdentifier: string;
  collaborationIdentifier: string;
  mlInputChannelArn: string;
  name: string;
  configuredModelAlgorithmAssociations: string[];
  status: MLInputChannelStatus;
  statusDetails?: StatusDetails;
  retentionInDays: number;
  numberOfRecords?: number;
  privacyBudgets?: PrivacyBudgets;
  description?: string;
  syntheticDataConfiguration?: SyntheticDataConfiguration;
  payerConfiguration?: PayerConfiguration;
  createTime: Date;
  updateTime: Date;
  inputChannel: InputChannel;
  protectedQueryIdentifier?: string;
  numberOfFiles?: number;
  sizeInGb?: number;
  kmsKeyArn?: string;
  tags?: { [key: string]: string | undefined };
}
export const GetMLInputChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    membershipIdentifier: S.String,
    collaborationIdentifier: S.String,
    mlInputChannelArn: S.String,
    name: S.String,
    configuredModelAlgorithmAssociations:
      ConfiguredModelAlgorithmAssociationArnList,
    status: MLInputChannelStatus,
    statusDetails: S.optional(StatusDetails),
    retentionInDays: S.Number,
    numberOfRecords: S.optional(S.Number),
    privacyBudgets: S.optional(PrivacyBudgets),
    description: S.optional(S.String),
    syntheticDataConfiguration: S.optional(SyntheticDataConfiguration),
    payerConfiguration: S.optional(PayerConfiguration),
    createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    inputChannel: InputChannel,
    protectedQueryIdentifier: S.optional(S.String),
    numberOfFiles: S.optional(S.Number),
    sizeInGb: S.optional(S.Number),
    kmsKeyArn: S.optional(S.String),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "GetMLInputChannelResponse",
}) as any as S.Schema<GetMLInputChannelResponse>;
export interface GetTrainedModelRequest {
  trainedModelArn: string;
  membershipIdentifier: string;
  versionIdentifier?: string;
}
export const GetTrainedModelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    trainedModelArn: S.String.pipe(T.HttpLabel("trainedModelArn")),
    membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
    versionIdentifier: S.optional(S.String).pipe(
      T.HttpQuery("versionIdentifier"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/memberships/{membershipIdentifier}/trained-models/{trainedModelArn}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetTrainedModelRequest",
}) as any as S.Schema<GetTrainedModelRequest>;
export interface GetTrainedModelResponse {
  membershipIdentifier: string;
  collaborationIdentifier: string;
  trainedModelArn: string;
  versionIdentifier?: string;
  incrementalTrainingDataChannels?: IncrementalTrainingDataChannelOutput[];
  name: string;
  description?: string;
  status: TrainedModelStatus;
  statusDetails?: StatusDetails;
  configuredModelAlgorithmAssociationArn: string;
  resourceConfig?: ResourceConfig;
  trainingInputMode?: TrainingInputMode;
  stoppingCondition?: StoppingCondition;
  metricsStatus?: MetricsStatus;
  metricsStatusDetails?: string;
  logsStatus?: LogsStatus;
  logsStatusDetails?: string;
  trainingContainerImageDigest?: string;
  mlModelTrainingPayerAccountId?: string;
  createTime: Date;
  updateTime: Date;
  hyperparameters?: { [key: string]: string | undefined };
  environment?: { [key: string]: string | undefined };
  kmsKeyArn?: string;
  tags?: { [key: string]: string | undefined };
  dataChannels: ModelTrainingDataChannel[];
}
export const GetTrainedModelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    membershipIdentifier: S.String,
    collaborationIdentifier: S.String,
    trainedModelArn: S.String,
    versionIdentifier: S.optional(S.String),
    incrementalTrainingDataChannels: S.optional(
      IncrementalTrainingDataChannelsOutput,
    ),
    name: S.String,
    description: S.optional(S.String),
    status: TrainedModelStatus,
    statusDetails: S.optional(StatusDetails),
    configuredModelAlgorithmAssociationArn: S.String,
    resourceConfig: S.optional(ResourceConfig),
    trainingInputMode: S.optional(TrainingInputMode),
    stoppingCondition: S.optional(StoppingCondition),
    metricsStatus: S.optional(MetricsStatus),
    metricsStatusDetails: S.optional(S.String),
    logsStatus: S.optional(LogsStatus),
    logsStatusDetails: S.optional(S.String),
    trainingContainerImageDigest: S.optional(S.String),
    mlModelTrainingPayerAccountId: S.optional(S.String),
    createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    hyperparameters: S.optional(HyperParameters),
    environment: S.optional(Environment),
    kmsKeyArn: S.optional(S.String),
    tags: S.optional(TagMap),
    dataChannels: ModelTrainingDataChannels,
  }),
).annotate({
  identifier: "GetTrainedModelResponse",
}) as any as S.Schema<GetTrainedModelResponse>;
export interface GetTrainedModelInferenceJobRequest {
  membershipIdentifier: string;
  trainedModelInferenceJobArn: string;
}
export const GetTrainedModelInferenceJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
    trainedModelInferenceJobArn: S.String.pipe(
      T.HttpLabel("trainedModelInferenceJobArn"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/memberships/{membershipIdentifier}/trained-model-inference-jobs/{trainedModelInferenceJobArn}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetTrainedModelInferenceJobRequest",
}) as any as S.Schema<GetTrainedModelInferenceJobRequest>;
export type TrainedModelInferenceJobStatus =
  | "CREATE_PENDING"
  | "CREATE_IN_PROGRESS"
  | "CREATE_FAILED"
  | "ACTIVE"
  | "CANCEL_PENDING"
  | "CANCEL_IN_PROGRESS"
  | "CANCEL_FAILED"
  | "INACTIVE"
  | (string & {});
export const TrainedModelInferenceJobStatus = /*@__PURE__*/ S.String;

export type InferenceInstanceType =
  | "ml.r7i.48xlarge"
  | "ml.r6i.16xlarge"
  | "ml.m6i.xlarge"
  | "ml.m5.4xlarge"
  | "ml.p2.xlarge"
  | "ml.m4.16xlarge"
  | "ml.r7i.16xlarge"
  | "ml.m7i.xlarge"
  | "ml.m6i.12xlarge"
  | "ml.r7i.8xlarge"
  | "ml.r7i.large"
  | "ml.m7i.12xlarge"
  | "ml.m6i.24xlarge"
  | "ml.m7i.24xlarge"
  | "ml.r6i.8xlarge"
  | "ml.r6i.large"
  | "ml.g5.2xlarge"
  | "ml.m5.large"
  | "ml.m7i.48xlarge"
  | "ml.m6i.16xlarge"
  | "ml.p2.16xlarge"
  | "ml.g5.4xlarge"
  | "ml.m7i.16xlarge"
  | "ml.c4.2xlarge"
  | "ml.c5.2xlarge"
  | "ml.c6i.32xlarge"
  | "ml.c4.4xlarge"
  | "ml.g5.8xlarge"
  | "ml.c6i.xlarge"
  | "ml.c5.4xlarge"
  | "ml.g4dn.xlarge"
  | "ml.c7i.xlarge"
  | "ml.c6i.12xlarge"
  | "ml.g4dn.12xlarge"
  | "ml.c7i.12xlarge"
  | "ml.c6i.24xlarge"
  | "ml.g4dn.2xlarge"
  | "ml.c7i.24xlarge"
  | "ml.c7i.2xlarge"
  | "ml.c4.8xlarge"
  | "ml.c6i.2xlarge"
  | "ml.g4dn.4xlarge"
  | "ml.c7i.48xlarge"
  | "ml.c7i.4xlarge"
  | "ml.c6i.16xlarge"
  | "ml.c5.9xlarge"
  | "ml.g4dn.16xlarge"
  | "ml.c7i.16xlarge"
  | "ml.c6i.4xlarge"
  | "ml.c5.xlarge"
  | "ml.c4.xlarge"
  | "ml.g4dn.8xlarge"
  | "ml.c7i.8xlarge"
  | "ml.c7i.large"
  | "ml.g5.xlarge"
  | "ml.c6i.8xlarge"
  | "ml.c6i.large"
  | "ml.g5.12xlarge"
  | "ml.g5.24xlarge"
  | "ml.m7i.2xlarge"
  | "ml.c5.18xlarge"
  | "ml.g5.48xlarge"
  | "ml.m6i.2xlarge"
  | "ml.g5.16xlarge"
  | "ml.m7i.4xlarge"
  | "ml.r6i.32xlarge"
  | "ml.m6i.4xlarge"
  | "ml.m5.xlarge"
  | "ml.m4.10xlarge"
  | "ml.r6i.xlarge"
  | "ml.m5.12xlarge"
  | "ml.m4.xlarge"
  | "ml.r7i.2xlarge"
  | "ml.r7i.xlarge"
  | "ml.r6i.12xlarge"
  | "ml.m5.24xlarge"
  | "ml.r7i.12xlarge"
  | "ml.m7i.8xlarge"
  | "ml.m7i.large"
  | "ml.r6i.24xlarge"
  | "ml.r6i.2xlarge"
  | "ml.m4.2xlarge"
  | "ml.r7i.24xlarge"
  | "ml.r7i.4xlarge"
  | "ml.m6i.8xlarge"
  | "ml.m6i.large"
  | "ml.m5.2xlarge"
  | "ml.p2.8xlarge"
  | "ml.r6i.4xlarge"
  | "ml.m6i.32xlarge"
  | "ml.m4.4xlarge"
  | "ml.p3.16xlarge"
  | "ml.p3.2xlarge"
  | "ml.p3.8xlarge"
  | (string & {});
export const InferenceInstanceType = /*@__PURE__*/ S.String;

export interface InferenceResourceConfig {
  instanceType: InferenceInstanceType;
  instanceCount?: number;
}
export const InferenceResourceConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instanceType: InferenceInstanceType,
    instanceCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "InferenceResourceConfig",
}) as any as S.Schema<InferenceResourceConfig>;
export interface InferenceReceiverMember {
  accountId: string;
}
export const InferenceReceiverMember = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ accountId: S.String }),
).annotate({
  identifier: "InferenceReceiverMember",
}) as any as S.Schema<InferenceReceiverMember>;
export type InferenceReceiverMembers = InferenceReceiverMember[];
export const InferenceReceiverMembers = /*@__PURE__*/ S.Array(
  InferenceReceiverMember,
);
export interface InferenceOutputConfiguration {
  accept?: string;
  members: InferenceReceiverMember[];
}
export const InferenceOutputConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ accept: S.optional(S.String), members: InferenceReceiverMembers }),
).annotate({
  identifier: "InferenceOutputConfiguration",
}) as any as S.Schema<InferenceOutputConfiguration>;
export interface ModelInferenceDataSource {
  mlInputChannelArn: string;
}
export const ModelInferenceDataSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ mlInputChannelArn: S.String }),
).annotate({
  identifier: "ModelInferenceDataSource",
}) as any as S.Schema<ModelInferenceDataSource>;
export interface InferenceContainerExecutionParameters {
  maxPayloadInMB?: number;
}
export const InferenceContainerExecutionParameters = /*@__PURE__*/ S.suspend(
  () => S.Struct({ maxPayloadInMB: S.optional(S.Number) }),
).annotate({
  identifier: "InferenceContainerExecutionParameters",
}) as any as S.Schema<InferenceContainerExecutionParameters>;
export type InferenceEnvironmentMap = { [key: string]: string | undefined };
export const InferenceEnvironmentMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface GetTrainedModelInferenceJobResponse {
  createTime: Date;
  updateTime: Date;
  trainedModelInferenceJobArn: string;
  configuredModelAlgorithmAssociationArn?: string;
  name: string;
  status: TrainedModelInferenceJobStatus;
  trainedModelArn: string;
  trainedModelVersionIdentifier?: string;
  resourceConfig: InferenceResourceConfig;
  outputConfiguration: InferenceOutputConfiguration;
  membershipIdentifier: string;
  dataSource: ModelInferenceDataSource;
  containerExecutionParameters?: InferenceContainerExecutionParameters;
  statusDetails?: StatusDetails;
  description?: string;
  inferenceContainerImageDigest?: string;
  environment?: { [key: string]: string | undefined };
  kmsKeyArn?: string;
  metricsStatus?: MetricsStatus;
  metricsStatusDetails?: string;
  logsStatus?: LogsStatus;
  logsStatusDetails?: string;
  tags?: { [key: string]: string | undefined };
  mlModelInferencePayerAccountId?: string;
}
export const GetTrainedModelInferenceJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    trainedModelInferenceJobArn: S.String,
    configuredModelAlgorithmAssociationArn: S.optional(S.String),
    name: S.String,
    status: TrainedModelInferenceJobStatus,
    trainedModelArn: S.String,
    trainedModelVersionIdentifier: S.optional(S.String),
    resourceConfig: InferenceResourceConfig,
    outputConfiguration: InferenceOutputConfiguration,
    membershipIdentifier: S.String,
    dataSource: ModelInferenceDataSource,
    containerExecutionParameters: S.optional(
      InferenceContainerExecutionParameters,
    ),
    statusDetails: S.optional(StatusDetails),
    description: S.optional(S.String),
    inferenceContainerImageDigest: S.optional(S.String),
    environment: S.optional(InferenceEnvironmentMap),
    kmsKeyArn: S.optional(S.String),
    metricsStatus: S.optional(MetricsStatus),
    metricsStatusDetails: S.optional(S.String),
    logsStatus: S.optional(LogsStatus),
    logsStatusDetails: S.optional(S.String),
    tags: S.optional(TagMap),
    mlModelInferencePayerAccountId: S.optional(S.String),
  }),
).annotate({
  identifier: "GetTrainedModelInferenceJobResponse",
}) as any as S.Schema<GetTrainedModelInferenceJobResponse>;
export interface GetTrainingDatasetRequest {
  trainingDatasetArn: string;
}
export const GetTrainingDatasetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    trainingDatasetArn: S.String.pipe(T.HttpLabel("trainingDatasetArn")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/training-dataset/{trainingDatasetArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetTrainingDatasetRequest",
}) as any as S.Schema<GetTrainingDatasetRequest>;
export type TrainingDatasetStatus = "ACTIVE" | (string & {});
export const TrainingDatasetStatus = /*@__PURE__*/ S.String;

export interface GetTrainingDatasetResponse {
  createTime: Date;
  updateTime: Date;
  trainingDatasetArn: string;
  name: string;
  trainingData: Dataset[];
  status: TrainingDatasetStatus;
  roleArn: string;
  tags?: { [key: string]: string | undefined };
  description?: string;
}
export const GetTrainingDatasetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    trainingDatasetArn: S.String,
    name: S.String,
    trainingData: DatasetList,
    status: TrainingDatasetStatus,
    roleArn: S.String,
    tags: S.optional(TagMap),
    description: S.optional(S.String),
  }),
).annotate({
  identifier: "GetTrainingDatasetResponse",
}) as any as S.Schema<GetTrainingDatasetResponse>;
export type NextToken = string;
export type MaxResults = number;
export interface ListAudienceExportJobsRequest {
  nextToken?: string;
  maxResults?: number;
  audienceGenerationJobArn?: string;
}
export const ListAudienceExportJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    audienceGenerationJobArn: S.optional(S.String).pipe(
      T.HttpQuery("audienceGenerationJobArn"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/audience-export-job" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAudienceExportJobsRequest",
}) as any as S.Schema<ListAudienceExportJobsRequest>;
export type AudienceExportJobStatus =
  | "CREATE_PENDING"
  | "CREATE_IN_PROGRESS"
  | "CREATE_FAILED"
  | "ACTIVE"
  | (string & {});
export const AudienceExportJobStatus = /*@__PURE__*/ S.String;

export interface AudienceExportJobSummary {
  createTime: Date;
  updateTime: Date;
  name: string;
  audienceGenerationJobArn: string;
  audienceSize: AudienceSize;
  description?: string;
  status: AudienceExportJobStatus;
  statusDetails?: StatusDetails;
  outputLocation?: string;
}
export const AudienceExportJobSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    name: S.String,
    audienceGenerationJobArn: S.String,
    audienceSize: AudienceSize,
    description: S.optional(S.String),
    status: AudienceExportJobStatus,
    statusDetails: S.optional(StatusDetails),
    outputLocation: S.optional(S.String),
  }),
).annotate({
  identifier: "AudienceExportJobSummary",
}) as any as S.Schema<AudienceExportJobSummary>;
export type AudienceExportJobList = AudienceExportJobSummary[];
export const AudienceExportJobList = /*@__PURE__*/ S.Array(
  AudienceExportJobSummary,
);
export interface ListAudienceExportJobsResponse {
  nextToken?: string;
  audienceExportJobs: AudienceExportJobSummary[];
}
export const ListAudienceExportJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    audienceExportJobs: AudienceExportJobList,
  }),
).annotate({
  identifier: "ListAudienceExportJobsResponse",
}) as any as S.Schema<ListAudienceExportJobsResponse>;
export interface ListAudienceGenerationJobsRequest {
  nextToken?: string;
  maxResults?: number;
  configuredAudienceModelArn?: string;
  collaborationId?: string;
}
export const ListAudienceGenerationJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    configuredAudienceModelArn: S.optional(S.String).pipe(
      T.HttpQuery("configuredAudienceModelArn"),
    ),
    collaborationId: S.optional(S.String).pipe(T.HttpQuery("collaborationId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/audience-generation-job" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAudienceGenerationJobsRequest",
}) as any as S.Schema<ListAudienceGenerationJobsRequest>;
export interface AudienceGenerationJobSummary {
  createTime: Date;
  updateTime: Date;
  audienceGenerationJobArn: string;
  name: string;
  description?: string;
  status: AudienceGenerationJobStatus;
  configuredAudienceModelArn: string;
  collaborationId?: string;
  startedBy?: string;
}
export const AudienceGenerationJobSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    audienceGenerationJobArn: S.String,
    name: S.String,
    description: S.optional(S.String),
    status: AudienceGenerationJobStatus,
    configuredAudienceModelArn: S.String,
    collaborationId: S.optional(S.String),
    startedBy: S.optional(S.String),
  }),
).annotate({
  identifier: "AudienceGenerationJobSummary",
}) as any as S.Schema<AudienceGenerationJobSummary>;
export type AudienceGenerationJobList = AudienceGenerationJobSummary[];
export const AudienceGenerationJobList = /*@__PURE__*/ S.Array(
  AudienceGenerationJobSummary,
);
export interface ListAudienceGenerationJobsResponse {
  nextToken?: string;
  audienceGenerationJobs: AudienceGenerationJobSummary[];
}
export const ListAudienceGenerationJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    audienceGenerationJobs: AudienceGenerationJobList,
  }),
).annotate({
  identifier: "ListAudienceGenerationJobsResponse",
}) as any as S.Schema<ListAudienceGenerationJobsResponse>;
export interface ListAudienceModelsRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListAudienceModelsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/audience-model" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAudienceModelsRequest",
}) as any as S.Schema<ListAudienceModelsRequest>;
export interface AudienceModelSummary {
  createTime: Date;
  updateTime: Date;
  audienceModelArn: string;
  name: string;
  trainingDatasetArn: string;
  status: AudienceModelStatus;
  description?: string;
}
export const AudienceModelSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    audienceModelArn: S.String,
    name: S.String,
    trainingDatasetArn: S.String,
    status: AudienceModelStatus,
    description: S.optional(S.String),
  }),
).annotate({
  identifier: "AudienceModelSummary",
}) as any as S.Schema<AudienceModelSummary>;
export type AudienceModelList = AudienceModelSummary[];
export const AudienceModelList = /*@__PURE__*/ S.Array(AudienceModelSummary);
export interface ListAudienceModelsResponse {
  nextToken?: string;
  audienceModels: AudienceModelSummary[];
}
export const ListAudienceModelsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    audienceModels: AudienceModelList,
  }),
).annotate({
  identifier: "ListAudienceModelsResponse",
}) as any as S.Schema<ListAudienceModelsResponse>;
export interface ListCollaborationConfiguredModelAlgorithmAssociationsRequest {
  nextToken?: string;
  maxResults?: number;
  collaborationIdentifier: string;
}
export const ListCollaborationConfiguredModelAlgorithmAssociationsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      collaborationIdentifier: S.String.pipe(
        T.HttpLabel("collaborationIdentifier"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/collaborations/{collaborationIdentifier}/configured-model-algorithm-associations",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListCollaborationConfiguredModelAlgorithmAssociationsRequest",
  }) as any as S.Schema<ListCollaborationConfiguredModelAlgorithmAssociationsRequest>;
export interface CollaborationConfiguredModelAlgorithmAssociationSummary {
  createTime: Date;
  updateTime: Date;
  configuredModelAlgorithmAssociationArn: string;
  name: string;
  description?: string;
  membershipIdentifier: string;
  collaborationIdentifier: string;
  configuredModelAlgorithmArn: string;
  creatorAccountId: string;
}
export const CollaborationConfiguredModelAlgorithmAssociationSummary =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
      updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
      configuredModelAlgorithmAssociationArn: S.String,
      name: S.String,
      description: S.optional(S.String),
      membershipIdentifier: S.String,
      collaborationIdentifier: S.String,
      configuredModelAlgorithmArn: S.String,
      creatorAccountId: S.String,
    }),
  ).annotate({
    identifier: "CollaborationConfiguredModelAlgorithmAssociationSummary",
  }) as any as S.Schema<CollaborationConfiguredModelAlgorithmAssociationSummary>;
export type CollaborationConfiguredModelAlgorithmAssociationList =
  CollaborationConfiguredModelAlgorithmAssociationSummary[];
export const CollaborationConfiguredModelAlgorithmAssociationList =
  /*@__PURE__*/ S.Array(
    CollaborationConfiguredModelAlgorithmAssociationSummary,
  );
export interface ListCollaborationConfiguredModelAlgorithmAssociationsResponse {
  nextToken?: string;
  collaborationConfiguredModelAlgorithmAssociations: CollaborationConfiguredModelAlgorithmAssociationSummary[];
}
export const ListCollaborationConfiguredModelAlgorithmAssociationsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      nextToken: S.optional(S.String),
      collaborationConfiguredModelAlgorithmAssociations:
        CollaborationConfiguredModelAlgorithmAssociationList,
    }),
  ).annotate({
    identifier: "ListCollaborationConfiguredModelAlgorithmAssociationsResponse",
  }) as any as S.Schema<ListCollaborationConfiguredModelAlgorithmAssociationsResponse>;
export interface ListCollaborationMLInputChannelsRequest {
  nextToken?: string;
  maxResults?: number;
  collaborationIdentifier: string;
}
export const ListCollaborationMLInputChannelsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      collaborationIdentifier: S.String.pipe(
        T.HttpLabel("collaborationIdentifier"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/collaborations/{collaborationIdentifier}/ml-input-channels",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListCollaborationMLInputChannelsRequest",
}) as any as S.Schema<ListCollaborationMLInputChannelsRequest>;
export interface CollaborationMLInputChannelSummary {
  createTime: Date;
  updateTime: Date;
  membershipIdentifier: string;
  collaborationIdentifier: string;
  name: string;
  configuredModelAlgorithmAssociations: string[];
  mlInputChannelArn: string;
  status: MLInputChannelStatus;
  creatorAccountId: string;
  description?: string;
  payerConfiguration?: PayerConfiguration;
}
export const CollaborationMLInputChannelSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    membershipIdentifier: S.String,
    collaborationIdentifier: S.String,
    name: S.String,
    configuredModelAlgorithmAssociations:
      ConfiguredModelAlgorithmAssociationArnList,
    mlInputChannelArn: S.String,
    status: MLInputChannelStatus,
    creatorAccountId: S.String,
    description: S.optional(S.String),
    payerConfiguration: S.optional(PayerConfiguration),
  }),
).annotate({
  identifier: "CollaborationMLInputChannelSummary",
}) as any as S.Schema<CollaborationMLInputChannelSummary>;
export type CollaborationMLInputChannelsList =
  CollaborationMLInputChannelSummary[];
export const CollaborationMLInputChannelsList = /*@__PURE__*/ S.Array(
  CollaborationMLInputChannelSummary,
);
export interface ListCollaborationMLInputChannelsResponse {
  nextToken?: string;
  collaborationMLInputChannelsList: CollaborationMLInputChannelSummary[];
}
export const ListCollaborationMLInputChannelsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      nextToken: S.optional(S.String),
      collaborationMLInputChannelsList: CollaborationMLInputChannelsList,
    }),
).annotate({
  identifier: "ListCollaborationMLInputChannelsResponse",
}) as any as S.Schema<ListCollaborationMLInputChannelsResponse>;
export interface ListCollaborationTrainedModelExportJobsRequest {
  nextToken?: string;
  maxResults?: number;
  collaborationIdentifier: string;
  trainedModelArn: string;
  trainedModelVersionIdentifier?: string;
}
export const ListCollaborationTrainedModelExportJobsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      collaborationIdentifier: S.String.pipe(
        T.HttpLabel("collaborationIdentifier"),
      ),
      trainedModelArn: S.String.pipe(T.HttpLabel("trainedModelArn")),
      trainedModelVersionIdentifier: S.optional(S.String).pipe(
        T.HttpQuery("trainedModelVersionIdentifier"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/collaborations/{collaborationIdentifier}/trained-models/{trainedModelArn}/export-jobs",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListCollaborationTrainedModelExportJobsRequest",
  }) as any as S.Schema<ListCollaborationTrainedModelExportJobsRequest>;
export interface TrainedModelExportReceiverMember {
  accountId: string;
}
export const TrainedModelExportReceiverMember = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ accountId: S.String }),
).annotate({
  identifier: "TrainedModelExportReceiverMember",
}) as any as S.Schema<TrainedModelExportReceiverMember>;
export type TrainedModelExportReceiverMembers =
  TrainedModelExportReceiverMember[];
export const TrainedModelExportReceiverMembers = /*@__PURE__*/ S.Array(
  TrainedModelExportReceiverMember,
);
export interface TrainedModelExportOutputConfiguration {
  members: TrainedModelExportReceiverMember[];
}
export const TrainedModelExportOutputConfiguration = /*@__PURE__*/ S.suspend(
  () => S.Struct({ members: TrainedModelExportReceiverMembers }),
).annotate({
  identifier: "TrainedModelExportOutputConfiguration",
}) as any as S.Schema<TrainedModelExportOutputConfiguration>;
export type TrainedModelExportJobStatus =
  | "CREATE_PENDING"
  | "CREATE_IN_PROGRESS"
  | "CREATE_FAILED"
  | "ACTIVE"
  | (string & {});
export const TrainedModelExportJobStatus = /*@__PURE__*/ S.String;

export interface CollaborationTrainedModelExportJobSummary {
  createTime: Date;
  updateTime: Date;
  name: string;
  outputConfiguration: TrainedModelExportOutputConfiguration;
  status: TrainedModelExportJobStatus;
  statusDetails?: StatusDetails;
  description?: string;
  creatorAccountId: string;
  trainedModelArn: string;
  trainedModelVersionIdentifier?: string;
  membershipIdentifier: string;
  collaborationIdentifier: string;
}
export const CollaborationTrainedModelExportJobSummary =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
      updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
      name: S.String,
      outputConfiguration: TrainedModelExportOutputConfiguration,
      status: TrainedModelExportJobStatus,
      statusDetails: S.optional(StatusDetails),
      description: S.optional(S.String),
      creatorAccountId: S.String,
      trainedModelArn: S.String,
      trainedModelVersionIdentifier: S.optional(S.String),
      membershipIdentifier: S.String,
      collaborationIdentifier: S.String,
    }),
  ).annotate({
    identifier: "CollaborationTrainedModelExportJobSummary",
  }) as any as S.Schema<CollaborationTrainedModelExportJobSummary>;
export type CollaborationTrainedModelExportJobList =
  CollaborationTrainedModelExportJobSummary[];
export const CollaborationTrainedModelExportJobList = /*@__PURE__*/ S.Array(
  CollaborationTrainedModelExportJobSummary,
);
export interface ListCollaborationTrainedModelExportJobsResponse {
  nextToken?: string;
  collaborationTrainedModelExportJobs: CollaborationTrainedModelExportJobSummary[];
}
export const ListCollaborationTrainedModelExportJobsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      nextToken: S.optional(S.String),
      collaborationTrainedModelExportJobs:
        CollaborationTrainedModelExportJobList,
    }),
  ).annotate({
    identifier: "ListCollaborationTrainedModelExportJobsResponse",
  }) as any as S.Schema<ListCollaborationTrainedModelExportJobsResponse>;
export interface ListCollaborationTrainedModelInferenceJobsRequest {
  nextToken?: string;
  maxResults?: number;
  collaborationIdentifier: string;
  trainedModelArn?: string;
  trainedModelVersionIdentifier?: string;
}
export const ListCollaborationTrainedModelInferenceJobsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      collaborationIdentifier: S.String.pipe(
        T.HttpLabel("collaborationIdentifier"),
      ),
      trainedModelArn: S.optional(S.String).pipe(
        T.HttpQuery("trainedModelArn"),
      ),
      trainedModelVersionIdentifier: S.optional(S.String).pipe(
        T.HttpQuery("trainedModelVersionIdentifier"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/collaborations/{collaborationIdentifier}/trained-model-inference-jobs",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListCollaborationTrainedModelInferenceJobsRequest",
  }) as any as S.Schema<ListCollaborationTrainedModelInferenceJobsRequest>;
export interface CollaborationTrainedModelInferenceJobSummary {
  trainedModelInferenceJobArn: string;
  configuredModelAlgorithmAssociationArn?: string;
  membershipIdentifier: string;
  trainedModelArn: string;
  trainedModelVersionIdentifier?: string;
  collaborationIdentifier: string;
  status: TrainedModelInferenceJobStatus;
  outputConfiguration: InferenceOutputConfiguration;
  name: string;
  description?: string;
  metricsStatus?: MetricsStatus;
  metricsStatusDetails?: string;
  logsStatus?: LogsStatus;
  logsStatusDetails?: string;
  mlModelInferencePayerAccountId?: string;
  createTime: Date;
  updateTime: Date;
  creatorAccountId: string;
}
export const CollaborationTrainedModelInferenceJobSummary =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      trainedModelInferenceJobArn: S.String,
      configuredModelAlgorithmAssociationArn: S.optional(S.String),
      membershipIdentifier: S.String,
      trainedModelArn: S.String,
      trainedModelVersionIdentifier: S.optional(S.String),
      collaborationIdentifier: S.String,
      status: TrainedModelInferenceJobStatus,
      outputConfiguration: InferenceOutputConfiguration,
      name: S.String,
      description: S.optional(S.String),
      metricsStatus: S.optional(MetricsStatus),
      metricsStatusDetails: S.optional(S.String),
      logsStatus: S.optional(LogsStatus),
      logsStatusDetails: S.optional(S.String),
      mlModelInferencePayerAccountId: S.optional(S.String),
      createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
      updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
      creatorAccountId: S.String,
    }),
  ).annotate({
    identifier: "CollaborationTrainedModelInferenceJobSummary",
  }) as any as S.Schema<CollaborationTrainedModelInferenceJobSummary>;
export type CollaborationTrainedModelInferenceJobList =
  CollaborationTrainedModelInferenceJobSummary[];
export const CollaborationTrainedModelInferenceJobList = /*@__PURE__*/ S.Array(
  CollaborationTrainedModelInferenceJobSummary,
);
export interface ListCollaborationTrainedModelInferenceJobsResponse {
  nextToken?: string;
  collaborationTrainedModelInferenceJobs: CollaborationTrainedModelInferenceJobSummary[];
}
export const ListCollaborationTrainedModelInferenceJobsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      nextToken: S.optional(S.String),
      collaborationTrainedModelInferenceJobs:
        CollaborationTrainedModelInferenceJobList,
    }),
  ).annotate({
    identifier: "ListCollaborationTrainedModelInferenceJobsResponse",
  }) as any as S.Schema<ListCollaborationTrainedModelInferenceJobsResponse>;
export interface ListCollaborationTrainedModelsRequest {
  nextToken?: string;
  maxResults?: number;
  collaborationIdentifier: string;
}
export const ListCollaborationTrainedModelsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      collaborationIdentifier: S.String.pipe(
        T.HttpLabel("collaborationIdentifier"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/collaborations/{collaborationIdentifier}/trained-models",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListCollaborationTrainedModelsRequest",
}) as any as S.Schema<ListCollaborationTrainedModelsRequest>;
export interface CollaborationTrainedModelSummary {
  createTime: Date;
  updateTime: Date;
  trainedModelArn: string;
  name: string;
  versionIdentifier?: string;
  incrementalTrainingDataChannels?: IncrementalTrainingDataChannelOutput[];
  description?: string;
  membershipIdentifier: string;
  collaborationIdentifier: string;
  status: TrainedModelStatus;
  configuredModelAlgorithmAssociationArn: string;
  creatorAccountId: string;
  mlModelTrainingPayerAccountId?: string;
}
export const CollaborationTrainedModelSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    trainedModelArn: S.String,
    name: S.String,
    versionIdentifier: S.optional(S.String),
    incrementalTrainingDataChannels: S.optional(
      IncrementalTrainingDataChannelsOutput,
    ),
    description: S.optional(S.String),
    membershipIdentifier: S.String,
    collaborationIdentifier: S.String,
    status: TrainedModelStatus,
    configuredModelAlgorithmAssociationArn: S.String,
    creatorAccountId: S.String,
    mlModelTrainingPayerAccountId: S.optional(S.String),
  }),
).annotate({
  identifier: "CollaborationTrainedModelSummary",
}) as any as S.Schema<CollaborationTrainedModelSummary>;
export type CollaborationTrainedModelList = CollaborationTrainedModelSummary[];
export const CollaborationTrainedModelList = /*@__PURE__*/ S.Array(
  CollaborationTrainedModelSummary,
);
export interface ListCollaborationTrainedModelsResponse {
  nextToken?: string;
  collaborationTrainedModels: CollaborationTrainedModelSummary[];
}
export const ListCollaborationTrainedModelsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      nextToken: S.optional(S.String),
      collaborationTrainedModels: CollaborationTrainedModelList,
    }),
).annotate({
  identifier: "ListCollaborationTrainedModelsResponse",
}) as any as S.Schema<ListCollaborationTrainedModelsResponse>;
export interface ListConfiguredAudienceModelsRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListConfiguredAudienceModelsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/configured-audience-model" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListConfiguredAudienceModelsRequest",
}) as any as S.Schema<ListConfiguredAudienceModelsRequest>;
export interface ConfiguredAudienceModelSummary {
  createTime: Date;
  updateTime: Date;
  name: string;
  audienceModelArn: string;
  outputConfig: ConfiguredAudienceModelOutputConfig;
  description?: string;
  configuredAudienceModelArn: string;
  status: ConfiguredAudienceModelStatus;
}
export const ConfiguredAudienceModelSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    name: S.String,
    audienceModelArn: S.String,
    outputConfig: ConfiguredAudienceModelOutputConfig,
    description: S.optional(S.String),
    configuredAudienceModelArn: S.String,
    status: ConfiguredAudienceModelStatus,
  }),
).annotate({
  identifier: "ConfiguredAudienceModelSummary",
}) as any as S.Schema<ConfiguredAudienceModelSummary>;
export type ConfiguredAudienceModelList = ConfiguredAudienceModelSummary[];
export const ConfiguredAudienceModelList = /*@__PURE__*/ S.Array(
  ConfiguredAudienceModelSummary,
);
export interface ListConfiguredAudienceModelsResponse {
  nextToken?: string;
  configuredAudienceModels: ConfiguredAudienceModelSummary[];
}
export const ListConfiguredAudienceModelsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      nextToken: S.optional(S.String),
      configuredAudienceModels: ConfiguredAudienceModelList,
    }),
).annotate({
  identifier: "ListConfiguredAudienceModelsResponse",
}) as any as S.Schema<ListConfiguredAudienceModelsResponse>;
export interface ListConfiguredModelAlgorithmAssociationsRequest {
  nextToken?: string;
  maxResults?: number;
  membershipIdentifier: string;
}
export const ListConfiguredModelAlgorithmAssociationsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/memberships/{membershipIdentifier}/configured-model-algorithm-associations",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListConfiguredModelAlgorithmAssociationsRequest",
  }) as any as S.Schema<ListConfiguredModelAlgorithmAssociationsRequest>;
export interface ConfiguredModelAlgorithmAssociationSummary {
  createTime: Date;
  updateTime: Date;
  configuredModelAlgorithmAssociationArn: string;
  configuredModelAlgorithmArn: string;
  name: string;
  description?: string;
  membershipIdentifier: string;
  collaborationIdentifier: string;
}
export const ConfiguredModelAlgorithmAssociationSummary =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
      updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
      configuredModelAlgorithmAssociationArn: S.String,
      configuredModelAlgorithmArn: S.String,
      name: S.String,
      description: S.optional(S.String),
      membershipIdentifier: S.String,
      collaborationIdentifier: S.String,
    }),
  ).annotate({
    identifier: "ConfiguredModelAlgorithmAssociationSummary",
  }) as any as S.Schema<ConfiguredModelAlgorithmAssociationSummary>;
export type ConfiguredModelAlgorithmAssociationList =
  ConfiguredModelAlgorithmAssociationSummary[];
export const ConfiguredModelAlgorithmAssociationList = /*@__PURE__*/ S.Array(
  ConfiguredModelAlgorithmAssociationSummary,
);
export interface ListConfiguredModelAlgorithmAssociationsResponse {
  nextToken?: string;
  configuredModelAlgorithmAssociations: ConfiguredModelAlgorithmAssociationSummary[];
}
export const ListConfiguredModelAlgorithmAssociationsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      nextToken: S.optional(S.String),
      configuredModelAlgorithmAssociations:
        ConfiguredModelAlgorithmAssociationList,
    }),
  ).annotate({
    identifier: "ListConfiguredModelAlgorithmAssociationsResponse",
  }) as any as S.Schema<ListConfiguredModelAlgorithmAssociationsResponse>;
export interface ListConfiguredModelAlgorithmsRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListConfiguredModelAlgorithmsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    }).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/configured-model-algorithms" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListConfiguredModelAlgorithmsRequest",
}) as any as S.Schema<ListConfiguredModelAlgorithmsRequest>;
export interface ConfiguredModelAlgorithmSummary {
  createTime: Date;
  updateTime: Date;
  configuredModelAlgorithmArn: string;
  name: string;
  description?: string;
}
export const ConfiguredModelAlgorithmSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    configuredModelAlgorithmArn: S.String,
    name: S.String,
    description: S.optional(S.String),
  }),
).annotate({
  identifier: "ConfiguredModelAlgorithmSummary",
}) as any as S.Schema<ConfiguredModelAlgorithmSummary>;
export type ConfiguredModelAlgorithmList = ConfiguredModelAlgorithmSummary[];
export const ConfiguredModelAlgorithmList = /*@__PURE__*/ S.Array(
  ConfiguredModelAlgorithmSummary,
);
export interface ListConfiguredModelAlgorithmsResponse {
  nextToken?: string;
  configuredModelAlgorithms: ConfiguredModelAlgorithmSummary[];
}
export const ListConfiguredModelAlgorithmsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      nextToken: S.optional(S.String),
      configuredModelAlgorithms: ConfiguredModelAlgorithmList,
    }),
).annotate({
  identifier: "ListConfiguredModelAlgorithmsResponse",
}) as any as S.Schema<ListConfiguredModelAlgorithmsResponse>;
export interface ListMLInputChannelsRequest {
  nextToken?: string;
  maxResults?: number;
  membershipIdentifier: string;
}
export const ListMLInputChannelsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/memberships/{membershipIdentifier}/ml-input-channels",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListMLInputChannelsRequest",
}) as any as S.Schema<ListMLInputChannelsRequest>;
export interface MLInputChannelSummary {
  createTime: Date;
  updateTime: Date;
  membershipIdentifier: string;
  collaborationIdentifier: string;
  name: string;
  configuredModelAlgorithmAssociations: string[];
  protectedQueryIdentifier?: string;
  mlInputChannelArn: string;
  status: MLInputChannelStatus;
  description?: string;
  payerConfiguration?: PayerConfiguration;
}
export const MLInputChannelSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    membershipIdentifier: S.String,
    collaborationIdentifier: S.String,
    name: S.String,
    configuredModelAlgorithmAssociations:
      ConfiguredModelAlgorithmAssociationArnList,
    protectedQueryIdentifier: S.optional(S.String),
    mlInputChannelArn: S.String,
    status: MLInputChannelStatus,
    description: S.optional(S.String),
    payerConfiguration: S.optional(PayerConfiguration),
  }),
).annotate({
  identifier: "MLInputChannelSummary",
}) as any as S.Schema<MLInputChannelSummary>;
export type MLInputChannelsList = MLInputChannelSummary[];
export const MLInputChannelsList = /*@__PURE__*/ S.Array(MLInputChannelSummary);
export interface ListMLInputChannelsResponse {
  nextToken?: string;
  mlInputChannelsList: MLInputChannelSummary[];
}
export const ListMLInputChannelsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    mlInputChannelsList: MLInputChannelsList,
  }),
).annotate({
  identifier: "ListMLInputChannelsResponse",
}) as any as S.Schema<ListMLInputChannelsResponse>;
export type TaggableArn = string;
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
export interface ListTrainedModelInferenceJobsRequest {
  nextToken?: string;
  maxResults?: number;
  membershipIdentifier: string;
  trainedModelArn?: string;
  trainedModelVersionIdentifier?: string;
}
export const ListTrainedModelInferenceJobsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
      trainedModelArn: S.optional(S.String).pipe(
        T.HttpQuery("trainedModelArn"),
      ),
      trainedModelVersionIdentifier: S.optional(S.String).pipe(
        T.HttpQuery("trainedModelVersionIdentifier"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/memberships/{membershipIdentifier}/trained-model-inference-jobs",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListTrainedModelInferenceJobsRequest",
}) as any as S.Schema<ListTrainedModelInferenceJobsRequest>;
export interface TrainedModelInferenceJobSummary {
  trainedModelInferenceJobArn: string;
  configuredModelAlgorithmAssociationArn?: string;
  membershipIdentifier: string;
  trainedModelArn: string;
  trainedModelVersionIdentifier?: string;
  collaborationIdentifier: string;
  status: TrainedModelInferenceJobStatus;
  outputConfiguration: InferenceOutputConfiguration;
  name: string;
  description?: string;
  metricsStatus?: MetricsStatus;
  metricsStatusDetails?: string;
  logsStatus?: LogsStatus;
  logsStatusDetails?: string;
  mlModelInferencePayerAccountId?: string;
  createTime: Date;
  updateTime: Date;
}
export const TrainedModelInferenceJobSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    trainedModelInferenceJobArn: S.String,
    configuredModelAlgorithmAssociationArn: S.optional(S.String),
    membershipIdentifier: S.String,
    trainedModelArn: S.String,
    trainedModelVersionIdentifier: S.optional(S.String),
    collaborationIdentifier: S.String,
    status: TrainedModelInferenceJobStatus,
    outputConfiguration: InferenceOutputConfiguration,
    name: S.String,
    description: S.optional(S.String),
    metricsStatus: S.optional(MetricsStatus),
    metricsStatusDetails: S.optional(S.String),
    logsStatus: S.optional(LogsStatus),
    logsStatusDetails: S.optional(S.String),
    mlModelInferencePayerAccountId: S.optional(S.String),
    createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "TrainedModelInferenceJobSummary",
}) as any as S.Schema<TrainedModelInferenceJobSummary>;
export type TrainedModelInferenceJobList = TrainedModelInferenceJobSummary[];
export const TrainedModelInferenceJobList = /*@__PURE__*/ S.Array(
  TrainedModelInferenceJobSummary,
);
export interface ListTrainedModelInferenceJobsResponse {
  nextToken?: string;
  trainedModelInferenceJobs: TrainedModelInferenceJobSummary[];
}
export const ListTrainedModelInferenceJobsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      nextToken: S.optional(S.String),
      trainedModelInferenceJobs: TrainedModelInferenceJobList,
    }),
).annotate({
  identifier: "ListTrainedModelInferenceJobsResponse",
}) as any as S.Schema<ListTrainedModelInferenceJobsResponse>;
export interface ListTrainedModelsRequest {
  nextToken?: string;
  maxResults?: number;
  membershipIdentifier: string;
}
export const ListTrainedModelsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/memberships/{membershipIdentifier}/trained-models",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTrainedModelsRequest",
}) as any as S.Schema<ListTrainedModelsRequest>;
export interface TrainedModelSummary {
  createTime: Date;
  updateTime: Date;
  trainedModelArn: string;
  versionIdentifier?: string;
  incrementalTrainingDataChannels?: IncrementalTrainingDataChannelOutput[];
  name: string;
  description?: string;
  membershipIdentifier: string;
  collaborationIdentifier: string;
  status: TrainedModelStatus;
  configuredModelAlgorithmAssociationArn: string;
  mlModelTrainingPayerAccountId?: string;
}
export const TrainedModelSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    trainedModelArn: S.String,
    versionIdentifier: S.optional(S.String),
    incrementalTrainingDataChannels: S.optional(
      IncrementalTrainingDataChannelsOutput,
    ),
    name: S.String,
    description: S.optional(S.String),
    membershipIdentifier: S.String,
    collaborationIdentifier: S.String,
    status: TrainedModelStatus,
    configuredModelAlgorithmAssociationArn: S.String,
    mlModelTrainingPayerAccountId: S.optional(S.String),
  }),
).annotate({
  identifier: "TrainedModelSummary",
}) as any as S.Schema<TrainedModelSummary>;
export type TrainedModelList = TrainedModelSummary[];
export const TrainedModelList = /*@__PURE__*/ S.Array(TrainedModelSummary);
export interface ListTrainedModelsResponse {
  nextToken?: string;
  trainedModels: TrainedModelSummary[];
}
export const ListTrainedModelsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    trainedModels: TrainedModelList,
  }),
).annotate({
  identifier: "ListTrainedModelsResponse",
}) as any as S.Schema<ListTrainedModelsResponse>;
export interface ListTrainedModelVersionsRequest {
  nextToken?: string;
  maxResults?: number;
  membershipIdentifier: string;
  trainedModelArn: string;
  status?: TrainedModelStatus;
}
export const ListTrainedModelVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
    trainedModelArn: S.String.pipe(T.HttpLabel("trainedModelArn")),
    status: S.optional(TrainedModelStatus).pipe(T.HttpQuery("status")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/memberships/{membershipIdentifier}/trained-models/{trainedModelArn}/versions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTrainedModelVersionsRequest",
}) as any as S.Schema<ListTrainedModelVersionsRequest>;
export interface ListTrainedModelVersionsResponse {
  nextToken?: string;
  trainedModels: TrainedModelSummary[];
}
export const ListTrainedModelVersionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    trainedModels: TrainedModelList,
  }),
).annotate({
  identifier: "ListTrainedModelVersionsResponse",
}) as any as S.Schema<ListTrainedModelVersionsResponse>;
export interface ListTrainingDatasetsRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListTrainingDatasetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/training-dataset" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTrainingDatasetsRequest",
}) as any as S.Schema<ListTrainingDatasetsRequest>;
export interface TrainingDatasetSummary {
  createTime: Date;
  updateTime: Date;
  trainingDatasetArn: string;
  name: string;
  status: TrainingDatasetStatus;
  description?: string;
}
export const TrainingDatasetSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    trainingDatasetArn: S.String,
    name: S.String,
    status: TrainingDatasetStatus,
    description: S.optional(S.String),
  }),
).annotate({
  identifier: "TrainingDatasetSummary",
}) as any as S.Schema<TrainingDatasetSummary>;
export type TrainingDatasetList = TrainingDatasetSummary[];
export const TrainingDatasetList = /*@__PURE__*/ S.Array(
  TrainingDatasetSummary,
);
export interface ListTrainingDatasetsResponse {
  nextToken?: string;
  trainingDatasets: TrainingDatasetSummary[];
}
export const ListTrainingDatasetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    trainingDatasets: TrainingDatasetList,
  }),
).annotate({
  identifier: "ListTrainingDatasetsResponse",
}) as any as S.Schema<ListTrainingDatasetsResponse>;
export type PolicyExistenceCondition =
  | "POLICY_MUST_EXIST"
  | "POLICY_MUST_NOT_EXIST"
  | (string & {});
export const PolicyExistenceCondition = /*@__PURE__*/ S.String;

export interface PutConfiguredAudienceModelPolicyRequest {
  configuredAudienceModelArn: string;
  configuredAudienceModelPolicy: string;
  previousPolicyHash?: string;
  policyExistenceCondition?: PolicyExistenceCondition;
}
export const PutConfiguredAudienceModelPolicyRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      configuredAudienceModelArn: S.String.pipe(
        T.HttpLabel("configuredAudienceModelArn"),
      ),
      configuredAudienceModelPolicy: S.String,
      previousPolicyHash: S.optional(S.String),
      policyExistenceCondition: S.optional(PolicyExistenceCondition),
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/configured-audience-model/{configuredAudienceModelArn}/policy",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "PutConfiguredAudienceModelPolicyRequest",
}) as any as S.Schema<PutConfiguredAudienceModelPolicyRequest>;
export interface PutConfiguredAudienceModelPolicyResponse {
  configuredAudienceModelPolicy: string;
  policyHash: string;
}
export const PutConfiguredAudienceModelPolicyResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ configuredAudienceModelPolicy: S.String, policyHash: S.String }),
).annotate({
  identifier: "PutConfiguredAudienceModelPolicyResponse",
}) as any as S.Schema<PutConfiguredAudienceModelPolicyResponse>;
export interface PutMLConfigurationRequest {
  membershipIdentifier: string;
  defaultOutputLocation: MLOutputConfiguration;
}
export const PutMLConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
    defaultOutputLocation: MLOutputConfiguration,
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/memberships/{membershipIdentifier}/ml-configurations",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutMLConfigurationRequest",
}) as any as S.Schema<PutMLConfigurationRequest>;
export interface PutMLConfigurationResponse {}
export const PutMLConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutMLConfigurationResponse",
}) as any as S.Schema<PutMLConfigurationResponse>;
export interface StartAudienceExportJobRequest {
  name: string;
  audienceGenerationJobArn: string;
  audienceSize: AudienceSize;
  description?: string;
}
export const StartAudienceExportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    audienceGenerationJobArn: S.String,
    audienceSize: AudienceSize,
    description: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/audience-export-job" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartAudienceExportJobRequest",
}) as any as S.Schema<StartAudienceExportJobRequest>;
export interface StartAudienceExportJobResponse {}
export const StartAudienceExportJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StartAudienceExportJobResponse",
}) as any as S.Schema<StartAudienceExportJobResponse>;
export interface StartAudienceGenerationJobRequest {
  name: string;
  configuredAudienceModelArn: string;
  seedAudience: AudienceGenerationJobDataSource;
  includeSeedInOutput?: boolean;
  collaborationId?: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
}
export const StartAudienceGenerationJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    configuredAudienceModelArn: S.String,
    seedAudience: AudienceGenerationJobDataSource,
    includeSeedInOutput: S.optional(S.Boolean),
    collaborationId: S.optional(S.String),
    description: S.optional(S.String),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/audience-generation-job" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartAudienceGenerationJobRequest",
}) as any as S.Schema<StartAudienceGenerationJobRequest>;
export interface StartAudienceGenerationJobResponse {
  audienceGenerationJobArn: string;
}
export const StartAudienceGenerationJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ audienceGenerationJobArn: S.String }),
).annotate({
  identifier: "StartAudienceGenerationJobResponse",
}) as any as S.Schema<StartAudienceGenerationJobResponse>;
export interface StartTrainedModelExportJobRequest {
  name: string;
  trainedModelArn: string;
  trainedModelVersionIdentifier?: string;
  membershipIdentifier: string;
  outputConfiguration: TrainedModelExportOutputConfiguration;
  description?: string;
}
export const StartTrainedModelExportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    trainedModelArn: S.String.pipe(T.HttpLabel("trainedModelArn")),
    trainedModelVersionIdentifier: S.optional(S.String),
    membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
    outputConfiguration: TrainedModelExportOutputConfiguration,
    description: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/memberships/{membershipIdentifier}/trained-models/{trainedModelArn}/export-jobs",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartTrainedModelExportJobRequest",
}) as any as S.Schema<StartTrainedModelExportJobRequest>;
export interface StartTrainedModelExportJobResponse {}
export const StartTrainedModelExportJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StartTrainedModelExportJobResponse",
}) as any as S.Schema<StartTrainedModelExportJobResponse>;
export interface StartTrainedModelInferenceJobRequest {
  membershipIdentifier: string;
  name: string;
  trainedModelArn: string;
  trainedModelVersionIdentifier?: string;
  configuredModelAlgorithmAssociationArn?: string;
  resourceConfig: InferenceResourceConfig;
  outputConfiguration: InferenceOutputConfiguration;
  dataSource: ModelInferenceDataSource;
  description?: string;
  containerExecutionParameters?: InferenceContainerExecutionParameters;
  environment?: { [key: string]: string | undefined };
  kmsKeyArn?: string;
  tags?: { [key: string]: string | undefined };
  mlModelInferencePayerAccountId?: string;
}
export const StartTrainedModelInferenceJobRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
      name: S.String,
      trainedModelArn: S.String,
      trainedModelVersionIdentifier: S.optional(S.String),
      configuredModelAlgorithmAssociationArn: S.optional(S.String),
      resourceConfig: InferenceResourceConfig,
      outputConfiguration: InferenceOutputConfiguration,
      dataSource: ModelInferenceDataSource,
      description: S.optional(S.String),
      containerExecutionParameters: S.optional(
        InferenceContainerExecutionParameters,
      ),
      environment: S.optional(InferenceEnvironmentMap),
      kmsKeyArn: S.optional(S.String),
      tags: S.optional(TagMap),
      mlModelInferencePayerAccountId: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/memberships/{membershipIdentifier}/trained-model-inference-jobs",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "StartTrainedModelInferenceJobRequest",
}) as any as S.Schema<StartTrainedModelInferenceJobRequest>;
export interface StartTrainedModelInferenceJobResponse {
  trainedModelInferenceJobArn: string;
}
export const StartTrainedModelInferenceJobResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ trainedModelInferenceJobArn: S.String }),
).annotate({
  identifier: "StartTrainedModelInferenceJobResponse",
}) as any as S.Schema<StartTrainedModelInferenceJobResponse>;
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
export type TagKeys = string[];
export const TagKeys = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tagKeys: TagKeys.pipe(T.HttpQuery("tagKeys")),
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
export interface UpdateConfiguredAudienceModelRequest {
  configuredAudienceModelArn: string;
  outputConfig?: ConfiguredAudienceModelOutputConfig;
  audienceModelArn?: string;
  sharedAudienceMetrics?: SharedAudienceMetrics[];
  minMatchingSeedSize?: number;
  audienceSizeConfig?: AudienceSizeConfig;
  description?: string;
}
export const UpdateConfiguredAudienceModelRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      configuredAudienceModelArn: S.String.pipe(
        T.HttpLabel("configuredAudienceModelArn"),
      ),
      outputConfig: S.optional(ConfiguredAudienceModelOutputConfig),
      audienceModelArn: S.optional(S.String),
      sharedAudienceMetrics: S.optional(MetricsList),
      minMatchingSeedSize: S.optional(S.Number),
      audienceSizeConfig: S.optional(AudienceSizeConfig),
      description: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({
          method: "PATCH",
          uri: "/configured-audience-model/{configuredAudienceModelArn}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateConfiguredAudienceModelRequest",
}) as any as S.Schema<UpdateConfiguredAudienceModelRequest>;
export interface UpdateConfiguredAudienceModelResponse {
  configuredAudienceModelArn: string;
}
export const UpdateConfiguredAudienceModelResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ configuredAudienceModelArn: S.String }),
).annotate({
  identifier: "UpdateConfiguredAudienceModelResponse",
}) as any as S.Schema<UpdateConfiguredAudienceModelResponse>;
export type CancelTrainedModelError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Submits a request to cancel the trained model job.
 */
export const cancelTrainedModel: API.OperationMethod<
  CancelTrainedModelRequest,
  CancelTrainedModelResponse,
  CancelTrainedModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelTrainedModelRequest,
  output: CancelTrainedModelResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelTrainedModel",
}));

export type CancelTrainedModelInferenceJobError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Submits a request to cancel a trained model inference job.
 */
export const cancelTrainedModelInferenceJob: API.OperationMethod<
  CancelTrainedModelInferenceJobRequest,
  CancelTrainedModelInferenceJobResponse,
  CancelTrainedModelInferenceJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelTrainedModelInferenceJobRequest,
  output: CancelTrainedModelInferenceJobResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelTrainedModelInferenceJob",
}));

export type CreateAudienceModelError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Defines the information necessary to create an audience model. An audience model is a machine learning model that Clean Rooms ML trains to measure similarity between users. Clean Rooms ML manages training and storing the audience model. The audience model can be used in multiple calls to the StartAudienceGenerationJob API.
 */
export const createAudienceModel: API.OperationMethod<
  CreateAudienceModelRequest,
  CreateAudienceModelResponse,
  CreateAudienceModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAudienceModelRequest,
  output: CreateAudienceModelResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAudienceModel",
}));

export type CreateConfiguredAudienceModelError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Defines the information necessary to create a configured audience model.
 */
export const createConfiguredAudienceModel: API.OperationMethod<
  CreateConfiguredAudienceModelRequest,
  CreateConfiguredAudienceModelResponse,
  CreateConfiguredAudienceModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateConfiguredAudienceModelRequest,
  output: CreateConfiguredAudienceModelResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConfiguredAudienceModel",
}));

export type CreateConfiguredModelAlgorithmError =
  | AccessDeniedException
  | ConflictException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a configured model algorithm using a container image stored in an ECR repository.
 */
export const createConfiguredModelAlgorithm: API.OperationMethod<
  CreateConfiguredModelAlgorithmRequest,
  CreateConfiguredModelAlgorithmResponse,
  CreateConfiguredModelAlgorithmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateConfiguredModelAlgorithmRequest,
  output: CreateConfiguredModelAlgorithmResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConfiguredModelAlgorithm",
}));

export type CreateConfiguredModelAlgorithmAssociationError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates a configured model algorithm to a collaboration for use by any member of the collaboration.
 */
export const createConfiguredModelAlgorithmAssociation: API.OperationMethod<
  CreateConfiguredModelAlgorithmAssociationRequest,
  CreateConfiguredModelAlgorithmAssociationResponse,
  CreateConfiguredModelAlgorithmAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateConfiguredModelAlgorithmAssociationRequest,
  output: CreateConfiguredModelAlgorithmAssociationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConfiguredModelAlgorithmAssociation",
}));

export type CreateMLInputChannelError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides the information to create an ML input channel. An ML input channel is the result of a query that can be used for ML modeling.
 */
export const createMLInputChannel: API.OperationMethod<
  CreateMLInputChannelRequest,
  CreateMLInputChannelResponse,
  CreateMLInputChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateMLInputChannelRequest,
  output: CreateMLInputChannelResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMLInputChannel",
}));

export type CreateTrainedModelError =
  | AccessDeniedException
  | ConflictException
  | InternalServiceException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a trained model from an associated configured model algorithm using data from any member of the collaboration.
 */
export const createTrainedModel: API.OperationMethod<
  CreateTrainedModelRequest,
  CreateTrainedModelResponse,
  CreateTrainedModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateTrainedModelRequest,
  output: CreateTrainedModelResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTrainedModel",
}));

export type CreateTrainingDatasetError =
  | AccessDeniedException
  | ConflictException
  | ValidationException
  | CommonErrors;
/**
 * Defines the information necessary to create a training dataset. In Clean Rooms ML, the `TrainingDataset` is metadata that points to a Glue table, which is read only during `AudienceModel` creation.
 */
export const createTrainingDataset: API.OperationMethod<
  CreateTrainingDatasetRequest,
  CreateTrainingDatasetResponse,
  CreateTrainingDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateTrainingDatasetRequest,
  output: CreateTrainingDatasetResponse,
  errors: [AccessDeniedException, ConflictException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTrainingDataset",
}));

export type DeleteAudienceGenerationJobError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified audience generation job, and removes all data associated with the job.
 */
export const deleteAudienceGenerationJob: API.OperationMethod<
  DeleteAudienceGenerationJobRequest,
  DeleteAudienceGenerationJobResponse,
  DeleteAudienceGenerationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAudienceGenerationJobRequest,
  output: DeleteAudienceGenerationJobResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAudienceGenerationJob",
}));

export type DeleteAudienceModelError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Specifies an audience model that you want to delete. You can't delete an audience model if there are any configured audience models that depend on the audience model.
 */
export const deleteAudienceModel: API.OperationMethod<
  DeleteAudienceModelRequest,
  DeleteAudienceModelResponse,
  DeleteAudienceModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAudienceModelRequest,
  output: DeleteAudienceModelResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAudienceModel",
}));

export type DeleteConfiguredAudienceModelError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified configured audience model. You can't delete a configured audience model if there are any lookalike models that use the configured audience model. If you delete a configured audience model, it will be removed from any collaborations that it is associated to.
 */
export const deleteConfiguredAudienceModel: API.OperationMethod<
  DeleteConfiguredAudienceModelRequest,
  DeleteConfiguredAudienceModelResponse,
  DeleteConfiguredAudienceModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteConfiguredAudienceModelRequest,
  output: DeleteConfiguredAudienceModelResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfiguredAudienceModel",
}));

export type DeleteConfiguredAudienceModelPolicyError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified configured audience model policy.
 */
export const deleteConfiguredAudienceModelPolicy: API.OperationMethod<
  DeleteConfiguredAudienceModelPolicyRequest,
  DeleteConfiguredAudienceModelPolicyResponse,
  DeleteConfiguredAudienceModelPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteConfiguredAudienceModelPolicyRequest,
  output: DeleteConfiguredAudienceModelPolicyResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfiguredAudienceModelPolicy",
}));

export type DeleteConfiguredModelAlgorithmError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a configured model algorithm.
 */
export const deleteConfiguredModelAlgorithm: API.OperationMethod<
  DeleteConfiguredModelAlgorithmRequest,
  DeleteConfiguredModelAlgorithmResponse,
  DeleteConfiguredModelAlgorithmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteConfiguredModelAlgorithmRequest,
  output: DeleteConfiguredModelAlgorithmResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfiguredModelAlgorithm",
}));

export type DeleteConfiguredModelAlgorithmAssociationError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a configured model algorithm association.
 */
export const deleteConfiguredModelAlgorithmAssociation: API.OperationMethod<
  DeleteConfiguredModelAlgorithmAssociationRequest,
  DeleteConfiguredModelAlgorithmAssociationResponse,
  DeleteConfiguredModelAlgorithmAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteConfiguredModelAlgorithmAssociationRequest,
  output: DeleteConfiguredModelAlgorithmAssociationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfiguredModelAlgorithmAssociation",
}));

export type DeleteMLConfigurationError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a ML modeling configuration.
 */
export const deleteMLConfiguration: API.OperationMethod<
  DeleteMLConfigurationRequest,
  DeleteMLConfigurationResponse,
  DeleteMLConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteMLConfigurationRequest,
  output: DeleteMLConfigurationResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMLConfiguration",
}));

export type DeleteMLInputChannelDataError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides the information necessary to delete an ML input channel.
 */
export const deleteMLInputChannelData: API.OperationMethod<
  DeleteMLInputChannelDataRequest,
  DeleteMLInputChannelDataResponse,
  DeleteMLInputChannelDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteMLInputChannelDataRequest,
  output: DeleteMLInputChannelDataResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMLInputChannelData",
}));

export type DeleteTrainedModelOutputError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the model artifacts stored by the service.
 */
export const deleteTrainedModelOutput: API.OperationMethod<
  DeleteTrainedModelOutputRequest,
  DeleteTrainedModelOutputResponse,
  DeleteTrainedModelOutputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTrainedModelOutputRequest,
  output: DeleteTrainedModelOutputResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTrainedModelOutput",
}));

export type DeleteTrainingDatasetError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Specifies a training dataset that you want to delete. You can't delete a training dataset if there are any audience models that depend on the training dataset. In Clean Rooms ML, the `TrainingDataset` is metadata that points to a Glue table, which is read only during `AudienceModel` creation. This action deletes the metadata.
 */
export const deleteTrainingDataset: API.OperationMethod<
  DeleteTrainingDatasetRequest,
  DeleteTrainingDatasetResponse,
  DeleteTrainingDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTrainingDatasetRequest,
  output: DeleteTrainingDatasetResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTrainingDataset",
}));

export type GetAudienceGenerationJobError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about an audience generation job.
 */
export const getAudienceGenerationJob: API.OperationMethod<
  GetAudienceGenerationJobRequest,
  GetAudienceGenerationJobResponse,
  GetAudienceGenerationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAudienceGenerationJobRequest,
  output: GetAudienceGenerationJobResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAudienceGenerationJob",
}));

export type GetAudienceModelError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about an audience model
 */
export const getAudienceModel: API.OperationMethod<
  GetAudienceModelRequest,
  GetAudienceModelResponse,
  GetAudienceModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAudienceModelRequest,
  output: GetAudienceModelResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAudienceModel",
}));

export type GetCollaborationConfiguredModelAlgorithmAssociationError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the configured model algorithm association in a collaboration.
 */
export const getCollaborationConfiguredModelAlgorithmAssociation: API.OperationMethod<
  GetCollaborationConfiguredModelAlgorithmAssociationRequest,
  GetCollaborationConfiguredModelAlgorithmAssociationResponse,
  GetCollaborationConfiguredModelAlgorithmAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCollaborationConfiguredModelAlgorithmAssociationRequest,
  output: GetCollaborationConfiguredModelAlgorithmAssociationResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCollaborationConfiguredModelAlgorithmAssociation",
}));

export type GetCollaborationMLInputChannelError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a specific ML input channel in a collaboration.
 */
export const getCollaborationMLInputChannel: API.OperationMethod<
  GetCollaborationMLInputChannelRequest,
  GetCollaborationMLInputChannelResponse,
  GetCollaborationMLInputChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCollaborationMLInputChannelRequest,
  output: GetCollaborationMLInputChannelResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCollaborationMLInputChannel",
}));

export type GetCollaborationTrainedModelError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a trained model in a collaboration.
 */
export const getCollaborationTrainedModel: API.OperationMethod<
  GetCollaborationTrainedModelRequest,
  GetCollaborationTrainedModelResponse,
  GetCollaborationTrainedModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCollaborationTrainedModelRequest,
  output: GetCollaborationTrainedModelResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCollaborationTrainedModel",
}));

export type GetConfiguredAudienceModelError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a specified configured audience model.
 */
export const getConfiguredAudienceModel: API.OperationMethod<
  GetConfiguredAudienceModelRequest,
  GetConfiguredAudienceModelResponse,
  GetConfiguredAudienceModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetConfiguredAudienceModelRequest,
  output: GetConfiguredAudienceModelResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfiguredAudienceModel",
}));

export type GetConfiguredAudienceModelPolicyError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a configured audience model policy.
 */
export const getConfiguredAudienceModelPolicy: API.OperationMethod<
  GetConfiguredAudienceModelPolicyRequest,
  GetConfiguredAudienceModelPolicyResponse,
  GetConfiguredAudienceModelPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetConfiguredAudienceModelPolicyRequest,
  output: GetConfiguredAudienceModelPolicyResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfiguredAudienceModelPolicy",
}));

export type GetConfiguredModelAlgorithmError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a configured model algorithm.
 */
export const getConfiguredModelAlgorithm: API.OperationMethod<
  GetConfiguredModelAlgorithmRequest,
  GetConfiguredModelAlgorithmResponse,
  GetConfiguredModelAlgorithmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetConfiguredModelAlgorithmRequest,
  output: GetConfiguredModelAlgorithmResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfiguredModelAlgorithm",
}));

export type GetConfiguredModelAlgorithmAssociationError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a configured model algorithm association.
 */
export const getConfiguredModelAlgorithmAssociation: API.OperationMethod<
  GetConfiguredModelAlgorithmAssociationRequest,
  GetConfiguredModelAlgorithmAssociationResponse,
  GetConfiguredModelAlgorithmAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetConfiguredModelAlgorithmAssociationRequest,
  output: GetConfiguredModelAlgorithmAssociationResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfiguredModelAlgorithmAssociation",
}));

export type GetMLConfigurationError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a specific ML configuration.
 */
export const getMLConfiguration: API.OperationMethod<
  GetMLConfigurationRequest,
  GetMLConfigurationResponse,
  GetMLConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMLConfigurationRequest,
  output: GetMLConfigurationResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMLConfiguration",
}));

export type GetMLInputChannelError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about an ML input channel.
 */
export const getMLInputChannel: API.OperationMethod<
  GetMLInputChannelRequest,
  GetMLInputChannelResponse,
  GetMLInputChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMLInputChannelRequest,
  output: GetMLInputChannelResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMLInputChannel",
}));

export type GetTrainedModelError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a trained model.
 */
export const getTrainedModel: API.OperationMethod<
  GetTrainedModelRequest,
  GetTrainedModelResponse,
  GetTrainedModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTrainedModelRequest,
  output: GetTrainedModelResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTrainedModel",
}));

export type GetTrainedModelInferenceJobError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a trained model inference job.
 */
export const getTrainedModelInferenceJob: API.OperationMethod<
  GetTrainedModelInferenceJobRequest,
  GetTrainedModelInferenceJobResponse,
  GetTrainedModelInferenceJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTrainedModelInferenceJobRequest,
  output: GetTrainedModelInferenceJobResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTrainedModelInferenceJob",
}));

export type GetTrainingDatasetError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a training dataset.
 */
export const getTrainingDataset: API.OperationMethod<
  GetTrainingDatasetRequest,
  GetTrainingDatasetResponse,
  GetTrainingDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTrainingDatasetRequest,
  output: GetTrainingDatasetResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTrainingDataset",
}));

export type ListAudienceExportJobsError =
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of the audience export jobs.
 */
export const listAudienceExportJobs: API.PaginatedOperationMethod<
  ListAudienceExportJobsRequest,
  ListAudienceExportJobsResponse,
  ListAudienceExportJobsError,
  Credentials | HttpClient.HttpClient,
  AudienceExportJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAudienceExportJobsRequest,
  output: ListAudienceExportJobsResponse,
  errors: [AccessDeniedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAudienceExportJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "audienceExportJobs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAudienceGenerationJobsError =
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of audience generation jobs.
 */
export const listAudienceGenerationJobs: API.PaginatedOperationMethod<
  ListAudienceGenerationJobsRequest,
  ListAudienceGenerationJobsResponse,
  ListAudienceGenerationJobsError,
  Credentials | HttpClient.HttpClient,
  AudienceGenerationJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAudienceGenerationJobsRequest,
  output: ListAudienceGenerationJobsResponse,
  errors: [AccessDeniedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAudienceGenerationJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "audienceGenerationJobs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAudienceModelsError =
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of audience models.
 */
export const listAudienceModels: API.PaginatedOperationMethod<
  ListAudienceModelsRequest,
  ListAudienceModelsResponse,
  ListAudienceModelsError,
  Credentials | HttpClient.HttpClient,
  AudienceModelSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAudienceModelsRequest,
  output: ListAudienceModelsResponse,
  errors: [AccessDeniedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAudienceModels",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "audienceModels",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCollaborationConfiguredModelAlgorithmAssociationsError =
  | AccessDeniedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of the configured model algorithm associations in a collaboration.
 */
export const listCollaborationConfiguredModelAlgorithmAssociations: API.PaginatedOperationMethod<
  ListCollaborationConfiguredModelAlgorithmAssociationsRequest,
  ListCollaborationConfiguredModelAlgorithmAssociationsResponse,
  ListCollaborationConfiguredModelAlgorithmAssociationsError,
  Credentials | HttpClient.HttpClient,
  CollaborationConfiguredModelAlgorithmAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCollaborationConfiguredModelAlgorithmAssociationsRequest,
  output: ListCollaborationConfiguredModelAlgorithmAssociationsResponse,
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCollaborationConfiguredModelAlgorithmAssociations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "collaborationConfiguredModelAlgorithmAssociations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCollaborationMLInputChannelsError =
  | AccessDeniedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of the ML input channels in a collaboration.
 */
export const listCollaborationMLInputChannels: API.PaginatedOperationMethod<
  ListCollaborationMLInputChannelsRequest,
  ListCollaborationMLInputChannelsResponse,
  ListCollaborationMLInputChannelsError,
  Credentials | HttpClient.HttpClient,
  CollaborationMLInputChannelSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCollaborationMLInputChannelsRequest,
  output: ListCollaborationMLInputChannelsResponse,
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCollaborationMLInputChannels",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "collaborationMLInputChannelsList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCollaborationTrainedModelExportJobsError =
  | AccessDeniedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of the export jobs for a trained model in a collaboration.
 */
export const listCollaborationTrainedModelExportJobs: API.PaginatedOperationMethod<
  ListCollaborationTrainedModelExportJobsRequest,
  ListCollaborationTrainedModelExportJobsResponse,
  ListCollaborationTrainedModelExportJobsError,
  Credentials | HttpClient.HttpClient,
  CollaborationTrainedModelExportJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCollaborationTrainedModelExportJobsRequest,
  output: ListCollaborationTrainedModelExportJobsResponse,
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCollaborationTrainedModelExportJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "collaborationTrainedModelExportJobs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCollaborationTrainedModelInferenceJobsError =
  | AccessDeniedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of trained model inference jobs in a specified collaboration.
 */
export const listCollaborationTrainedModelInferenceJobs: API.PaginatedOperationMethod<
  ListCollaborationTrainedModelInferenceJobsRequest,
  ListCollaborationTrainedModelInferenceJobsResponse,
  ListCollaborationTrainedModelInferenceJobsError,
  Credentials | HttpClient.HttpClient,
  CollaborationTrainedModelInferenceJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCollaborationTrainedModelInferenceJobsRequest,
  output: ListCollaborationTrainedModelInferenceJobsResponse,
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCollaborationTrainedModelInferenceJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "collaborationTrainedModelInferenceJobs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCollaborationTrainedModelsError =
  | AccessDeniedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of the trained models in a collaboration.
 */
export const listCollaborationTrainedModels: API.PaginatedOperationMethod<
  ListCollaborationTrainedModelsRequest,
  ListCollaborationTrainedModelsResponse,
  ListCollaborationTrainedModelsError,
  Credentials | HttpClient.HttpClient,
  CollaborationTrainedModelSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCollaborationTrainedModelsRequest,
  output: ListCollaborationTrainedModelsResponse,
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCollaborationTrainedModels",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "collaborationTrainedModels",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListConfiguredAudienceModelsError =
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of the configured audience models.
 */
export const listConfiguredAudienceModels: API.PaginatedOperationMethod<
  ListConfiguredAudienceModelsRequest,
  ListConfiguredAudienceModelsResponse,
  ListConfiguredAudienceModelsError,
  Credentials | HttpClient.HttpClient,
  ConfiguredAudienceModelSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListConfiguredAudienceModelsRequest,
  output: ListConfiguredAudienceModelsResponse,
  errors: [AccessDeniedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConfiguredAudienceModels",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "configuredAudienceModels",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListConfiguredModelAlgorithmAssociationsError =
  | AccessDeniedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of configured model algorithm associations.
 */
export const listConfiguredModelAlgorithmAssociations: API.PaginatedOperationMethod<
  ListConfiguredModelAlgorithmAssociationsRequest,
  ListConfiguredModelAlgorithmAssociationsResponse,
  ListConfiguredModelAlgorithmAssociationsError,
  Credentials | HttpClient.HttpClient,
  ConfiguredModelAlgorithmAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListConfiguredModelAlgorithmAssociationsRequest,
  output: ListConfiguredModelAlgorithmAssociationsResponse,
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConfiguredModelAlgorithmAssociations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "configuredModelAlgorithmAssociations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListConfiguredModelAlgorithmsError =
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of configured model algorithms.
 */
export const listConfiguredModelAlgorithms: API.PaginatedOperationMethod<
  ListConfiguredModelAlgorithmsRequest,
  ListConfiguredModelAlgorithmsResponse,
  ListConfiguredModelAlgorithmsError,
  Credentials | HttpClient.HttpClient,
  ConfiguredModelAlgorithmSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListConfiguredModelAlgorithmsRequest,
  output: ListConfiguredModelAlgorithmsResponse,
  errors: [AccessDeniedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConfiguredModelAlgorithms",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "configuredModelAlgorithms",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMLInputChannelsError =
  | AccessDeniedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of ML input channels.
 */
export const listMLInputChannels: API.PaginatedOperationMethod<
  ListMLInputChannelsRequest,
  ListMLInputChannelsResponse,
  ListMLInputChannelsError,
  Credentials | HttpClient.HttpClient,
  MLInputChannelSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMLInputChannelsRequest,
  output: ListMLInputChannelsResponse,
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMLInputChannels",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "mlInputChannelsList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of tags for a provided resource.
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
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListTrainedModelInferenceJobsError =
  | AccessDeniedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of trained model inference jobs that match the request parameters.
 */
export const listTrainedModelInferenceJobs: API.PaginatedOperationMethod<
  ListTrainedModelInferenceJobsRequest,
  ListTrainedModelInferenceJobsResponse,
  ListTrainedModelInferenceJobsError,
  Credentials | HttpClient.HttpClient,
  TrainedModelInferenceJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTrainedModelInferenceJobsRequest,
  output: ListTrainedModelInferenceJobsResponse,
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTrainedModelInferenceJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "trainedModelInferenceJobs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTrainedModelsError =
  | AccessDeniedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of trained models.
 */
export const listTrainedModels: API.PaginatedOperationMethod<
  ListTrainedModelsRequest,
  ListTrainedModelsResponse,
  ListTrainedModelsError,
  Credentials | HttpClient.HttpClient,
  TrainedModelSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTrainedModelsRequest,
  output: ListTrainedModelsResponse,
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTrainedModels",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "trainedModels",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTrainedModelVersionsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of trained model versions for a specified trained model. This operation allows you to view all versions of a trained model, including information about their status and creation details. You can use this to track the evolution of your trained models and select specific versions for inference or further training.
 */
export const listTrainedModelVersions: API.PaginatedOperationMethod<
  ListTrainedModelVersionsRequest,
  ListTrainedModelVersionsResponse,
  ListTrainedModelVersionsError,
  Credentials | HttpClient.HttpClient,
  TrainedModelSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTrainedModelVersionsRequest,
  output: ListTrainedModelVersionsResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTrainedModelVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "trainedModels",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTrainingDatasetsError =
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of training datasets.
 */
export const listTrainingDatasets: API.PaginatedOperationMethod<
  ListTrainingDatasetsRequest,
  ListTrainingDatasetsResponse,
  ListTrainingDatasetsError,
  Credentials | HttpClient.HttpClient,
  TrainingDatasetSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTrainingDatasetsRequest,
  output: ListTrainingDatasetsResponse,
  errors: [AccessDeniedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTrainingDatasets",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "trainingDatasets",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PutConfiguredAudienceModelPolicyError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Create or update the resource policy for a configured audience model.
 */
export const putConfiguredAudienceModelPolicy: API.OperationMethod<
  PutConfiguredAudienceModelPolicyRequest,
  PutConfiguredAudienceModelPolicyResponse,
  PutConfiguredAudienceModelPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutConfiguredAudienceModelPolicyRequest,
  output: PutConfiguredAudienceModelPolicyResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutConfiguredAudienceModelPolicy",
}));

export type PutMLConfigurationError =
  | AccessDeniedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Assigns information about an ML configuration.
 */
export const putMLConfiguration: API.OperationMethod<
  PutMLConfigurationRequest,
  PutMLConfigurationResponse,
  PutMLConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutMLConfigurationRequest,
  output: PutMLConfigurationResponse,
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutMLConfiguration",
}));

export type StartAudienceExportJobError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Export an audience of a specified size after you have generated an audience.
 */
export const startAudienceExportJob: API.OperationMethod<
  StartAudienceExportJobRequest,
  StartAudienceExportJobResponse,
  StartAudienceExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartAudienceExportJobRequest,
  output: StartAudienceExportJobResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartAudienceExportJob",
}));

export type StartAudienceGenerationJobError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Information necessary to start the audience generation job.
 */
export const startAudienceGenerationJob: API.OperationMethod<
  StartAudienceGenerationJobRequest,
  StartAudienceGenerationJobResponse,
  StartAudienceGenerationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartAudienceGenerationJobRequest,
  output: StartAudienceGenerationJobResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartAudienceGenerationJob",
}));

export type StartTrainedModelExportJobError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides the information necessary to start a trained model export job.
 */
export const startTrainedModelExportJob: API.OperationMethod<
  StartTrainedModelExportJobRequest,
  StartTrainedModelExportJobResponse,
  StartTrainedModelExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartTrainedModelExportJobRequest,
  output: StartTrainedModelExportJobResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartTrainedModelExportJob",
}));

export type StartTrainedModelInferenceJobError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Defines the information necessary to begin a trained model inference job.
 */
export const startTrainedModelInferenceJob: API.OperationMethod<
  StartTrainedModelInferenceJobRequest,
  StartTrainedModelInferenceJobResponse,
  StartTrainedModelInferenceJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartTrainedModelInferenceJobRequest,
  output: StartTrainedModelInferenceJobResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartTrainedModelInferenceJob",
}));

export type TagResourceError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Adds metadata tags to a specified resource.
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
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes metadata tags from a specified resource.
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
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateConfiguredAudienceModelError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Provides the information necessary to update a configured audience model. Updates that impact audience generation jobs take effect when a new job starts, but do not impact currently running jobs.
 */
export const updateConfiguredAudienceModel: API.OperationMethod<
  UpdateConfiguredAudienceModelRequest,
  UpdateConfiguredAudienceModelResponse,
  UpdateConfiguredAudienceModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateConfiguredAudienceModelRequest,
  output: UpdateConfiguredAudienceModelResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConfiguredAudienceModel",
}));
