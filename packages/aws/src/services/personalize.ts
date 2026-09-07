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
  sdkId: "Personalize",
  serviceShapeName: "AmazonPersonalize",
});
const auth = T.AwsAuthSigv4({ name: "personalize" });
const ver = T.ServiceVersion("2018-05-22");
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
              `https://personalize-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://personalize-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://personalize.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://personalize.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class InvalidInputException
  extends /*@__PURE__*/ S.TaggedError<InvalidInputException>()(
    "InvalidInputException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidNextTokenException>()(
    "InvalidNextTokenException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ResourceAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<ResourceAlreadyExistsException>()(
    "ResourceAlreadyExistsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(403),
  ).pipe(C.withAuthError, C.withAlreadyExistsError) {}
export class ResourceInUseException
  extends /*@__PURE__*/ S.TaggedError<ResourceInUseException>()(
    "ResourceInUseException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class TooManyTagKeysException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagKeysException>()(
    "TooManyTagKeysException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type Name = string;
export type Arn = string;
export type NumBatchResults = number;
export type S3Location = string;
export type KmsKeyArn = string;
export interface S3DataConfig {
  path: string;
  kmsKeyArn?: string;
}
export const S3DataConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ path: S.String, kmsKeyArn: S.optional(S.String) }),
).annotate({ identifier: "S3DataConfig" }) as any as S.Schema<S3DataConfig>;
export interface BatchInferenceJobInput {
  s3DataSource: S3DataConfig;
}
export const BatchInferenceJobInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ s3DataSource: S3DataConfig }),
).annotate({
  identifier: "BatchInferenceJobInput",
}) as any as S.Schema<BatchInferenceJobInput>;
export interface BatchInferenceJobOutput {
  s3DataDestination: S3DataConfig;
}
export const BatchInferenceJobOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ s3DataDestination: S3DataConfig }),
).annotate({
  identifier: "BatchInferenceJobOutput",
}) as any as S.Schema<BatchInferenceJobOutput>;
export type RoleArn = string;
export type ParameterName = string;
export type ParameterValue = string;
export type HyperParameters = { [key: string]: string | undefined };
export const HyperParameters = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type RankingInfluenceType = "POPULARITY" | "FRESHNESS" | (string & {});
export const RankingInfluenceType = S.String;

export type RankingInfluenceWeight = number;
export type RankingInfluence = { [key in RankingInfluenceType]?: number };
export const RankingInfluence = /*@__PURE__*/ S.Record(
  RankingInfluenceType,
  S.Number.pipe(S.optional),
);
export interface BatchInferenceJobConfig {
  itemExplorationConfig?: { [key: string]: string | undefined };
  rankingInfluence?: { [key: string]: number | undefined };
}
export const BatchInferenceJobConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    itemExplorationConfig: S.optional(HyperParameters),
    rankingInfluence: S.optional(RankingInfluence),
  }),
).annotate({
  identifier: "BatchInferenceJobConfig",
}) as any as S.Schema<BatchInferenceJobConfig>;
export type TagKey = string | redacted.Redacted<string>;
export type TagValue = string | redacted.Redacted<string>;
export interface Tag {
  tagKey: string | redacted.Redacted<string>;
  tagValue: string | redacted.Redacted<string>;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tagKey: SensitiveString, tagValue: SensitiveString }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type Tags = Tag[];
export const Tags = /*@__PURE__*/ S.Array(Tag);
export type BatchInferenceJobMode =
  | "BATCH_INFERENCE"
  | "THEME_GENERATION"
  | (string & {});
export const BatchInferenceJobMode = S.String;

export type ColumnName = string;
export interface FieldsForThemeGeneration {
  itemName: string;
}
export const FieldsForThemeGeneration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ itemName: S.String }),
).annotate({
  identifier: "FieldsForThemeGeneration",
}) as any as S.Schema<FieldsForThemeGeneration>;
export interface ThemeGenerationConfig {
  fieldsForThemeGeneration: FieldsForThemeGeneration;
}
export const ThemeGenerationConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ fieldsForThemeGeneration: FieldsForThemeGeneration }),
).annotate({
  identifier: "ThemeGenerationConfig",
}) as any as S.Schema<ThemeGenerationConfig>;
export interface CreateBatchInferenceJobRequest {
  jobName: string;
  solutionVersionArn: string;
  filterArn?: string;
  numResults?: number;
  jobInput: BatchInferenceJobInput;
  jobOutput: BatchInferenceJobOutput;
  roleArn: string;
  batchInferenceJobConfig?: BatchInferenceJobConfig;
  tags?: Tag[];
  batchInferenceJobMode?: BatchInferenceJobMode;
  themeGenerationConfig?: ThemeGenerationConfig;
}
export const CreateBatchInferenceJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobName: S.String,
    solutionVersionArn: S.String,
    filterArn: S.optional(S.String),
    numResults: S.optional(S.Number),
    jobInput: BatchInferenceJobInput,
    jobOutput: BatchInferenceJobOutput,
    roleArn: S.String,
    batchInferenceJobConfig: S.optional(BatchInferenceJobConfig),
    tags: S.optional(Tags),
    batchInferenceJobMode: S.optional(BatchInferenceJobMode),
    themeGenerationConfig: S.optional(ThemeGenerationConfig),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateBatchInferenceJobRequest",
}) as any as S.Schema<CreateBatchInferenceJobRequest>;
export interface CreateBatchInferenceJobResponse {
  batchInferenceJobArn?: string;
}
export const CreateBatchInferenceJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ batchInferenceJobArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateBatchInferenceJobResponse",
}) as any as S.Schema<CreateBatchInferenceJobResponse>;
export interface BatchSegmentJobInput {
  s3DataSource: S3DataConfig;
}
export const BatchSegmentJobInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ s3DataSource: S3DataConfig }),
).annotate({
  identifier: "BatchSegmentJobInput",
}) as any as S.Schema<BatchSegmentJobInput>;
export interface BatchSegmentJobOutput {
  s3DataDestination: S3DataConfig;
}
export const BatchSegmentJobOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ s3DataDestination: S3DataConfig }),
).annotate({
  identifier: "BatchSegmentJobOutput",
}) as any as S.Schema<BatchSegmentJobOutput>;
export interface CreateBatchSegmentJobRequest {
  jobName: string;
  solutionVersionArn: string;
  filterArn?: string;
  numResults?: number;
  jobInput: BatchSegmentJobInput;
  jobOutput: BatchSegmentJobOutput;
  roleArn: string;
  tags?: Tag[];
}
export const CreateBatchSegmentJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobName: S.String,
    solutionVersionArn: S.String,
    filterArn: S.optional(S.String),
    numResults: S.optional(S.Number),
    jobInput: BatchSegmentJobInput,
    jobOutput: BatchSegmentJobOutput,
    roleArn: S.String,
    tags: S.optional(Tags),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateBatchSegmentJobRequest",
}) as any as S.Schema<CreateBatchSegmentJobRequest>;
export interface CreateBatchSegmentJobResponse {
  batchSegmentJobArn?: string;
}
export const CreateBatchSegmentJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ batchSegmentJobArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateBatchSegmentJobResponse",
}) as any as S.Schema<CreateBatchSegmentJobResponse>;
export type TransactionsPerSecond = number;
export interface CampaignConfig {
  itemExplorationConfig?: { [key: string]: string | undefined };
  enableMetadataWithRecommendations?: boolean;
  syncWithLatestSolutionVersion?: boolean;
  rankingInfluence?: { [key: string]: number | undefined };
}
export const CampaignConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    itemExplorationConfig: S.optional(HyperParameters),
    enableMetadataWithRecommendations: S.optional(S.Boolean),
    syncWithLatestSolutionVersion: S.optional(S.Boolean),
    rankingInfluence: S.optional(RankingInfluence),
  }),
).annotate({ identifier: "CampaignConfig" }) as any as S.Schema<CampaignConfig>;
export interface CreateCampaignRequest {
  name: string;
  solutionVersionArn: string;
  minProvisionedTPS?: number;
  campaignConfig?: CampaignConfig;
  tags?: Tag[];
}
export const CreateCampaignRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    solutionVersionArn: S.String,
    minProvisionedTPS: S.optional(S.Number),
    campaignConfig: S.optional(CampaignConfig),
    tags: S.optional(Tags),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateCampaignRequest",
}) as any as S.Schema<CreateCampaignRequest>;
export interface CreateCampaignResponse {
  campaignArn?: string;
}
export const CreateCampaignResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ campaignArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateCampaignResponse",
}) as any as S.Schema<CreateCampaignResponse>;
export interface DataSource {
  dataLocation?: string;
}
export const DataSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ dataLocation: S.optional(S.String) }),
).annotate({ identifier: "DataSource" }) as any as S.Schema<DataSource>;
export interface CreateDataDeletionJobRequest {
  jobName: string;
  datasetGroupArn: string;
  dataSource: DataSource;
  roleArn: string;
  tags?: Tag[];
}
export const CreateDataDeletionJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobName: S.String,
    datasetGroupArn: S.String,
    dataSource: DataSource,
    roleArn: S.String,
    tags: S.optional(Tags),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateDataDeletionJobRequest",
}) as any as S.Schema<CreateDataDeletionJobRequest>;
export interface CreateDataDeletionJobResponse {
  dataDeletionJobArn?: string;
}
export const CreateDataDeletionJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ dataDeletionJobArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateDataDeletionJobResponse",
}) as any as S.Schema<CreateDataDeletionJobResponse>;
export type DatasetType = string;
export interface CreateDatasetRequest {
  name: string;
  schemaArn: string;
  datasetGroupArn: string;
  datasetType: string;
  tags?: Tag[];
}
export const CreateDatasetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    schemaArn: S.String,
    datasetGroupArn: S.String,
    datasetType: S.String,
    tags: S.optional(Tags),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateDatasetRequest",
}) as any as S.Schema<CreateDatasetRequest>;
export interface CreateDatasetResponse {
  datasetArn?: string;
}
export const CreateDatasetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ datasetArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateDatasetResponse",
}) as any as S.Schema<CreateDatasetResponse>;
export type IngestionMode = "BULK" | "PUT" | "ALL" | (string & {});
export const IngestionMode = S.String;

export interface DatasetExportJobOutput {
  s3DataDestination: S3DataConfig;
}
export const DatasetExportJobOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ s3DataDestination: S3DataConfig }),
).annotate({
  identifier: "DatasetExportJobOutput",
}) as any as S.Schema<DatasetExportJobOutput>;
export interface CreateDatasetExportJobRequest {
  jobName: string;
  datasetArn: string;
  ingestionMode?: IngestionMode;
  roleArn: string;
  jobOutput: DatasetExportJobOutput;
  tags?: Tag[];
}
export const CreateDatasetExportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobName: S.String,
    datasetArn: S.String,
    ingestionMode: S.optional(IngestionMode),
    roleArn: S.String,
    jobOutput: DatasetExportJobOutput,
    tags: S.optional(Tags),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateDatasetExportJobRequest",
}) as any as S.Schema<CreateDatasetExportJobRequest>;
export interface CreateDatasetExportJobResponse {
  datasetExportJobArn?: string;
}
export const CreateDatasetExportJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ datasetExportJobArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateDatasetExportJobResponse",
}) as any as S.Schema<CreateDatasetExportJobResponse>;
export type Domain = "ECOMMERCE" | "VIDEO_ON_DEMAND" | (string & {});
export const Domain = S.String;

export interface CreateDatasetGroupRequest {
  name: string;
  roleArn?: string;
  kmsKeyArn?: string;
  domain?: Domain;
  tags?: Tag[];
}
export const CreateDatasetGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    roleArn: S.optional(S.String),
    kmsKeyArn: S.optional(S.String),
    domain: S.optional(Domain),
    tags: S.optional(Tags),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateDatasetGroupRequest",
}) as any as S.Schema<CreateDatasetGroupRequest>;
export interface CreateDatasetGroupResponse {
  datasetGroupArn?: string;
  domain?: Domain;
}
export const CreateDatasetGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    datasetGroupArn: S.optional(S.String),
    domain: S.optional(Domain),
  }),
).annotate({
  identifier: "CreateDatasetGroupResponse",
}) as any as S.Schema<CreateDatasetGroupResponse>;
export type ImportMode = "FULL" | "INCREMENTAL" | (string & {});
export const ImportMode = S.String;

export interface CreateDatasetImportJobRequest {
  jobName: string;
  datasetArn: string;
  dataSource: DataSource;
  roleArn?: string;
  tags?: Tag[];
  importMode?: ImportMode;
  publishAttributionMetricsToS3?: boolean;
}
export const CreateDatasetImportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobName: S.String,
    datasetArn: S.String,
    dataSource: DataSource,
    roleArn: S.optional(S.String),
    tags: S.optional(Tags),
    importMode: S.optional(ImportMode),
    publishAttributionMetricsToS3: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateDatasetImportJobRequest",
}) as any as S.Schema<CreateDatasetImportJobRequest>;
export interface CreateDatasetImportJobResponse {
  datasetImportJobArn?: string;
}
export const CreateDatasetImportJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ datasetImportJobArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateDatasetImportJobResponse",
}) as any as S.Schema<CreateDatasetImportJobResponse>;
export interface CreateEventTrackerRequest {
  name: string;
  datasetGroupArn: string;
  tags?: Tag[];
}
export const CreateEventTrackerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    datasetGroupArn: S.String,
    tags: S.optional(Tags),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateEventTrackerRequest",
}) as any as S.Schema<CreateEventTrackerRequest>;
export type TrackingId = string;
export interface CreateEventTrackerResponse {
  eventTrackerArn?: string;
  trackingId?: string;
}
export const CreateEventTrackerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    eventTrackerArn: S.optional(S.String),
    trackingId: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateEventTrackerResponse",
}) as any as S.Schema<CreateEventTrackerResponse>;
export type FilterExpression = string | redacted.Redacted<string>;
export interface CreateFilterRequest {
  name: string;
  datasetGroupArn: string;
  filterExpression: string | redacted.Redacted<string>;
  tags?: Tag[];
}
export const CreateFilterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    datasetGroupArn: S.String,
    filterExpression: SensitiveString,
    tags: S.optional(Tags),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateFilterRequest",
}) as any as S.Schema<CreateFilterRequest>;
export interface CreateFilterResponse {
  filterArn?: string;
}
export const CreateFilterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ filterArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateFilterResponse",
}) as any as S.Schema<CreateFilterResponse>;
export type EventType = string;
export type MetricName = string;
export type MetricExpression = string;
export interface MetricAttribute {
  eventType: string;
  metricName: string;
  expression: string;
}
export const MetricAttribute = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ eventType: S.String, metricName: S.String, expression: S.String }),
).annotate({
  identifier: "MetricAttribute",
}) as any as S.Schema<MetricAttribute>;
export type MetricAttributes = MetricAttribute[];
export const MetricAttributes = /*@__PURE__*/ S.Array(MetricAttribute);
export interface MetricAttributionOutput {
  s3DataDestination?: S3DataConfig;
  roleArn: string;
}
export const MetricAttributionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ s3DataDestination: S.optional(S3DataConfig), roleArn: S.String }),
).annotate({
  identifier: "MetricAttributionOutput",
}) as any as S.Schema<MetricAttributionOutput>;
export interface CreateMetricAttributionRequest {
  name: string;
  datasetGroupArn: string;
  metrics: MetricAttribute[];
  metricsOutputConfig: MetricAttributionOutput;
}
export const CreateMetricAttributionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    datasetGroupArn: S.String,
    metrics: MetricAttributes,
    metricsOutputConfig: MetricAttributionOutput,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateMetricAttributionRequest",
}) as any as S.Schema<CreateMetricAttributionRequest>;
export interface CreateMetricAttributionResponse {
  metricAttributionArn?: string;
}
export const CreateMetricAttributionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ metricAttributionArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateMetricAttributionResponse",
}) as any as S.Schema<CreateMetricAttributionResponse>;
export type ColumnNamesList = string[];
export const ColumnNamesList = /*@__PURE__*/ S.Array(S.String);
export type ExcludedDatasetColumns = { [key: string]: string[] | undefined };
export const ExcludedDatasetColumns = /*@__PURE__*/ S.Record(
  S.String,
  ColumnNamesList.pipe(S.optional),
);
export type IncludedDatasetColumns = { [key: string]: string[] | undefined };
export const IncludedDatasetColumns = /*@__PURE__*/ S.Record(
  S.String,
  ColumnNamesList.pipe(S.optional),
);
export interface TrainingDataConfig {
  excludedDatasetColumns?: { [key: string]: string[] | undefined };
  includedDatasetColumns?: { [key: string]: string[] | undefined };
}
export const TrainingDataConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    excludedDatasetColumns: S.optional(ExcludedDatasetColumns),
    includedDatasetColumns: S.optional(IncludedDatasetColumns),
  }),
).annotate({
  identifier: "TrainingDataConfig",
}) as any as S.Schema<TrainingDataConfig>;
export interface RecommenderConfig {
  itemExplorationConfig?: { [key: string]: string | undefined };
  minRecommendationRequestsPerSecond?: number;
  trainingDataConfig?: TrainingDataConfig;
  enableMetadataWithRecommendations?: boolean;
}
export const RecommenderConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    itemExplorationConfig: S.optional(HyperParameters),
    minRecommendationRequestsPerSecond: S.optional(S.Number),
    trainingDataConfig: S.optional(TrainingDataConfig),
    enableMetadataWithRecommendations: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "RecommenderConfig",
}) as any as S.Schema<RecommenderConfig>;
export interface CreateRecommenderRequest {
  name: string;
  datasetGroupArn: string;
  recipeArn: string;
  recommenderConfig?: RecommenderConfig;
  tags?: Tag[];
}
export const CreateRecommenderRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    datasetGroupArn: S.String,
    recipeArn: S.String,
    recommenderConfig: S.optional(RecommenderConfig),
    tags: S.optional(Tags),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateRecommenderRequest",
}) as any as S.Schema<CreateRecommenderRequest>;
export interface CreateRecommenderResponse {
  recommenderArn?: string;
}
export const CreateRecommenderResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ recommenderArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateRecommenderResponse",
}) as any as S.Schema<CreateRecommenderResponse>;
export type AvroSchema = string;
export interface CreateSchemaRequest {
  name: string;
  schema: string;
  domain?: Domain;
}
export const CreateSchemaRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    schema: S.String,
    domain: S.optional(Domain),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateSchemaRequest",
}) as any as S.Schema<CreateSchemaRequest>;
export interface CreateSchemaResponse {
  schemaArn?: string;
}
export const CreateSchemaResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ schemaArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateSchemaResponse",
}) as any as S.Schema<CreateSchemaResponse>;
export type PerformAutoML = boolean;
export type PerformAutoTraining = boolean;
export type PerformIncrementalUpdate = boolean;
export type EventValueThreshold = string;
export type HPOObjectiveType = string;
export type MetricRegex = string;
export interface HPOObjective {
  type?: string;
  metricName?: string;
  metricRegex?: string;
}
export const HPOObjective = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(S.String),
    metricName: S.optional(S.String),
    metricRegex: S.optional(S.String),
  }),
).annotate({ identifier: "HPOObjective" }) as any as S.Schema<HPOObjective>;
export type HPOResource = string;
export interface HPOResourceConfig {
  maxNumberOfTrainingJobs?: string;
  maxParallelTrainingJobs?: string;
}
export const HPOResourceConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxNumberOfTrainingJobs: S.optional(S.String),
    maxParallelTrainingJobs: S.optional(S.String),
  }),
).annotate({
  identifier: "HPOResourceConfig",
}) as any as S.Schema<HPOResourceConfig>;
export type IntegerMinValue = number;
export type IntegerMaxValue = number;
export interface IntegerHyperParameterRange {
  name?: string;
  minValue?: number;
  maxValue?: number;
}
export const IntegerHyperParameterRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    minValue: S.optional(S.Number),
    maxValue: S.optional(S.Number),
  }),
).annotate({
  identifier: "IntegerHyperParameterRange",
}) as any as S.Schema<IntegerHyperParameterRange>;
export type IntegerHyperParameterRanges = IntegerHyperParameterRange[];
export const IntegerHyperParameterRanges = /*@__PURE__*/ S.Array(
  IntegerHyperParameterRange,
);
export type ContinuousMinValue = number;
export type ContinuousMaxValue = number;
export interface ContinuousHyperParameterRange {
  name?: string;
  minValue?: number;
  maxValue?: number;
}
export const ContinuousHyperParameterRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    minValue: S.optional(S.Number),
    maxValue: S.optional(S.Number),
  }),
).annotate({
  identifier: "ContinuousHyperParameterRange",
}) as any as S.Schema<ContinuousHyperParameterRange>;
export type ContinuousHyperParameterRanges = ContinuousHyperParameterRange[];
export const ContinuousHyperParameterRanges = /*@__PURE__*/ S.Array(
  ContinuousHyperParameterRange,
);
export type CategoricalValue = string;
export type CategoricalValues = string[];
export const CategoricalValues = /*@__PURE__*/ S.Array(S.String);
export interface CategoricalHyperParameterRange {
  name?: string;
  values?: string[];
}
export const CategoricalHyperParameterRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    values: S.optional(CategoricalValues),
  }),
).annotate({
  identifier: "CategoricalHyperParameterRange",
}) as any as S.Schema<CategoricalHyperParameterRange>;
export type CategoricalHyperParameterRanges = CategoricalHyperParameterRange[];
export const CategoricalHyperParameterRanges = /*@__PURE__*/ S.Array(
  CategoricalHyperParameterRange,
);
export interface HyperParameterRanges {
  integerHyperParameterRanges?: IntegerHyperParameterRange[];
  continuousHyperParameterRanges?: ContinuousHyperParameterRange[];
  categoricalHyperParameterRanges?: CategoricalHyperParameterRange[];
}
export const HyperParameterRanges = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    integerHyperParameterRanges: S.optional(IntegerHyperParameterRanges),
    continuousHyperParameterRanges: S.optional(ContinuousHyperParameterRanges),
    categoricalHyperParameterRanges: S.optional(
      CategoricalHyperParameterRanges,
    ),
  }),
).annotate({
  identifier: "HyperParameterRanges",
}) as any as S.Schema<HyperParameterRanges>;
export interface HPOConfig {
  hpoObjective?: HPOObjective;
  hpoResourceConfig?: HPOResourceConfig;
  algorithmHyperParameterRanges?: HyperParameterRanges;
}
export const HPOConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    hpoObjective: S.optional(HPOObjective),
    hpoResourceConfig: S.optional(HPOResourceConfig),
    algorithmHyperParameterRanges: S.optional(HyperParameterRanges),
  }),
).annotate({ identifier: "HPOConfig" }) as any as S.Schema<HPOConfig>;
export type FeatureTransformationParameters = {
  [key: string]: string | undefined;
};
export const FeatureTransformationParameters = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type ArnList = string[];
export const ArnList = /*@__PURE__*/ S.Array(S.String);
export interface AutoMLConfig {
  metricName?: string;
  recipeList?: string[];
}
export const AutoMLConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    metricName: S.optional(S.String),
    recipeList: S.optional(ArnList),
  }),
).annotate({ identifier: "AutoMLConfig" }) as any as S.Schema<AutoMLConfig>;
export type EventTypeThresholdValue = number;
export type EventTypeWeight = number;
export interface EventParameters {
  eventType?: string;
  eventValueThreshold?: number;
  weight?: number;
}
export const EventParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    eventType: S.optional(S.String),
    eventValueThreshold: S.optional(S.Number),
    weight: S.optional(S.Number),
  }),
).annotate({
  identifier: "EventParameters",
}) as any as S.Schema<EventParameters>;
export type EventParametersList = EventParameters[];
export const EventParametersList = /*@__PURE__*/ S.Array(EventParameters);
export interface EventsConfig {
  eventParametersList?: EventParameters[];
}
export const EventsConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ eventParametersList: S.optional(EventParametersList) }),
).annotate({ identifier: "EventsConfig" }) as any as S.Schema<EventsConfig>;
export type ItemAttribute = string;
export type ObjectiveSensitivity =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "OFF"
  | (string & {});
export const ObjectiveSensitivity = S.String;

export interface OptimizationObjective {
  itemAttribute?: string;
  objectiveSensitivity?: ObjectiveSensitivity;
}
export const OptimizationObjective = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    itemAttribute: S.optional(S.String),
    objectiveSensitivity: S.optional(ObjectiveSensitivity),
  }),
).annotate({
  identifier: "OptimizationObjective",
}) as any as S.Schema<OptimizationObjective>;
export type SchedulingExpression = string;
export interface AutoTrainingConfig {
  schedulingExpression?: string;
}
export const AutoTrainingConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ schedulingExpression: S.optional(S.String) }),
).annotate({
  identifier: "AutoTrainingConfig",
}) as any as S.Schema<AutoTrainingConfig>;
export interface SolutionConfig {
  eventValueThreshold?: string;
  hpoConfig?: HPOConfig;
  algorithmHyperParameters?: { [key: string]: string | undefined };
  featureTransformationParameters?: { [key: string]: string | undefined };
  autoMLConfig?: AutoMLConfig;
  eventsConfig?: EventsConfig;
  optimizationObjective?: OptimizationObjective;
  trainingDataConfig?: TrainingDataConfig;
  autoTrainingConfig?: AutoTrainingConfig;
}
export const SolutionConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    eventValueThreshold: S.optional(S.String),
    hpoConfig: S.optional(HPOConfig),
    algorithmHyperParameters: S.optional(HyperParameters),
    featureTransformationParameters: S.optional(
      FeatureTransformationParameters,
    ),
    autoMLConfig: S.optional(AutoMLConfig),
    eventsConfig: S.optional(EventsConfig),
    optimizationObjective: S.optional(OptimizationObjective),
    trainingDataConfig: S.optional(TrainingDataConfig),
    autoTrainingConfig: S.optional(AutoTrainingConfig),
  }),
).annotate({ identifier: "SolutionConfig" }) as any as S.Schema<SolutionConfig>;
export interface CreateSolutionRequest {
  name: string;
  performHPO?: boolean;
  performAutoML?: boolean;
  performAutoTraining?: boolean;
  performIncrementalUpdate?: boolean;
  recipeArn?: string;
  datasetGroupArn: string;
  eventType?: string;
  solutionConfig?: SolutionConfig;
  tags?: Tag[];
}
export const CreateSolutionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    performHPO: S.optional(S.Boolean),
    performAutoML: S.optional(S.Boolean),
    performAutoTraining: S.optional(S.Boolean),
    performIncrementalUpdate: S.optional(S.Boolean),
    recipeArn: S.optional(S.String),
    datasetGroupArn: S.String,
    eventType: S.optional(S.String),
    solutionConfig: S.optional(SolutionConfig),
    tags: S.optional(Tags),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateSolutionRequest",
}) as any as S.Schema<CreateSolutionRequest>;
export interface CreateSolutionResponse {
  solutionArn?: string;
}
export const CreateSolutionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ solutionArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateSolutionResponse",
}) as any as S.Schema<CreateSolutionResponse>;
export type TrainingMode = "FULL" | "UPDATE" | "AUTOTRAIN" | (string & {});
export const TrainingMode = S.String;

export interface CreateSolutionVersionRequest {
  name?: string;
  solutionArn: string;
  trainingMode?: TrainingMode;
  tags?: Tag[];
}
export const CreateSolutionVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    solutionArn: S.String,
    trainingMode: S.optional(TrainingMode),
    tags: S.optional(Tags),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateSolutionVersionRequest",
}) as any as S.Schema<CreateSolutionVersionRequest>;
export interface CreateSolutionVersionResponse {
  solutionVersionArn?: string;
}
export const CreateSolutionVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ solutionVersionArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateSolutionVersionResponse",
}) as any as S.Schema<CreateSolutionVersionResponse>;
export interface DeleteCampaignRequest {
  campaignArn: string;
}
export const DeleteCampaignRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ campaignArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteCampaignRequest",
}) as any as S.Schema<DeleteCampaignRequest>;
export interface DeleteCampaignResponse {}
export const DeleteCampaignResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteCampaignResponse",
}) as any as S.Schema<DeleteCampaignResponse>;
export interface DeleteDatasetRequest {
  datasetArn: string;
}
export const DeleteDatasetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ datasetArn: S.String }).pipe(
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
export interface DeleteDatasetGroupRequest {
  datasetGroupArn: string;
}
export const DeleteDatasetGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ datasetGroupArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteDatasetGroupRequest",
}) as any as S.Schema<DeleteDatasetGroupRequest>;
export interface DeleteDatasetGroupResponse {}
export const DeleteDatasetGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteDatasetGroupResponse",
}) as any as S.Schema<DeleteDatasetGroupResponse>;
export interface DeleteEventTrackerRequest {
  eventTrackerArn: string;
}
export const DeleteEventTrackerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ eventTrackerArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteEventTrackerRequest",
}) as any as S.Schema<DeleteEventTrackerRequest>;
export interface DeleteEventTrackerResponse {}
export const DeleteEventTrackerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteEventTrackerResponse",
}) as any as S.Schema<DeleteEventTrackerResponse>;
export interface DeleteFilterRequest {
  filterArn: string;
}
export const DeleteFilterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ filterArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteFilterRequest",
}) as any as S.Schema<DeleteFilterRequest>;
export interface DeleteFilterResponse {}
export const DeleteFilterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteFilterResponse",
}) as any as S.Schema<DeleteFilterResponse>;
export interface DeleteMetricAttributionRequest {
  metricAttributionArn: string;
}
export const DeleteMetricAttributionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ metricAttributionArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteMetricAttributionRequest",
}) as any as S.Schema<DeleteMetricAttributionRequest>;
export interface DeleteMetricAttributionResponse {}
export const DeleteMetricAttributionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteMetricAttributionResponse",
}) as any as S.Schema<DeleteMetricAttributionResponse>;
export interface DeleteRecommenderRequest {
  recommenderArn: string;
}
export const DeleteRecommenderRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ recommenderArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteRecommenderRequest",
}) as any as S.Schema<DeleteRecommenderRequest>;
export interface DeleteRecommenderResponse {}
export const DeleteRecommenderResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteRecommenderResponse",
}) as any as S.Schema<DeleteRecommenderResponse>;
export interface DeleteSchemaRequest {
  schemaArn: string;
}
export const DeleteSchemaRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ schemaArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteSchemaRequest",
}) as any as S.Schema<DeleteSchemaRequest>;
export interface DeleteSchemaResponse {}
export const DeleteSchemaResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteSchemaResponse",
}) as any as S.Schema<DeleteSchemaResponse>;
export interface DeleteSolutionRequest {
  solutionArn: string;
}
export const DeleteSolutionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ solutionArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteSolutionRequest",
}) as any as S.Schema<DeleteSolutionRequest>;
export interface DeleteSolutionResponse {}
export const DeleteSolutionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteSolutionResponse",
}) as any as S.Schema<DeleteSolutionResponse>;
export interface DescribeAlgorithmRequest {
  algorithmArn: string;
}
export const DescribeAlgorithmRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ algorithmArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeAlgorithmRequest",
}) as any as S.Schema<DescribeAlgorithmRequest>;
export type DockerURI = string;
export interface AlgorithmImage {
  name?: string;
  dockerURI: string;
}
export const AlgorithmImage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(S.String), dockerURI: S.String }),
).annotate({ identifier: "AlgorithmImage" }) as any as S.Schema<AlgorithmImage>;
export type Tunable = boolean;
export interface DefaultIntegerHyperParameterRange {
  name?: string;
  minValue?: number;
  maxValue?: number;
  isTunable?: boolean;
}
export const DefaultIntegerHyperParameterRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    minValue: S.optional(S.Number),
    maxValue: S.optional(S.Number),
    isTunable: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "DefaultIntegerHyperParameterRange",
}) as any as S.Schema<DefaultIntegerHyperParameterRange>;
export type DefaultIntegerHyperParameterRanges =
  DefaultIntegerHyperParameterRange[];
export const DefaultIntegerHyperParameterRanges = /*@__PURE__*/ S.Array(
  DefaultIntegerHyperParameterRange,
);
export interface DefaultContinuousHyperParameterRange {
  name?: string;
  minValue?: number;
  maxValue?: number;
  isTunable?: boolean;
}
export const DefaultContinuousHyperParameterRange = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      name: S.optional(S.String),
      minValue: S.optional(S.Number),
      maxValue: S.optional(S.Number),
      isTunable: S.optional(S.Boolean),
    }),
).annotate({
  identifier: "DefaultContinuousHyperParameterRange",
}) as any as S.Schema<DefaultContinuousHyperParameterRange>;
export type DefaultContinuousHyperParameterRanges =
  DefaultContinuousHyperParameterRange[];
export const DefaultContinuousHyperParameterRanges = /*@__PURE__*/ S.Array(
  DefaultContinuousHyperParameterRange,
);
export interface DefaultCategoricalHyperParameterRange {
  name?: string;
  values?: string[];
  isTunable?: boolean;
}
export const DefaultCategoricalHyperParameterRange = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      name: S.optional(S.String),
      values: S.optional(CategoricalValues),
      isTunable: S.optional(S.Boolean),
    }),
).annotate({
  identifier: "DefaultCategoricalHyperParameterRange",
}) as any as S.Schema<DefaultCategoricalHyperParameterRange>;
export type DefaultCategoricalHyperParameterRanges =
  DefaultCategoricalHyperParameterRange[];
export const DefaultCategoricalHyperParameterRanges = /*@__PURE__*/ S.Array(
  DefaultCategoricalHyperParameterRange,
);
export interface DefaultHyperParameterRanges {
  integerHyperParameterRanges?: DefaultIntegerHyperParameterRange[];
  continuousHyperParameterRanges?: DefaultContinuousHyperParameterRange[];
  categoricalHyperParameterRanges?: DefaultCategoricalHyperParameterRange[];
}
export const DefaultHyperParameterRanges = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    integerHyperParameterRanges: S.optional(DefaultIntegerHyperParameterRanges),
    continuousHyperParameterRanges: S.optional(
      DefaultContinuousHyperParameterRanges,
    ),
    categoricalHyperParameterRanges: S.optional(
      DefaultCategoricalHyperParameterRanges,
    ),
  }),
).annotate({
  identifier: "DefaultHyperParameterRanges",
}) as any as S.Schema<DefaultHyperParameterRanges>;
export type ResourceConfig = { [key: string]: string | undefined };
export const ResourceConfig = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type TrainingInputMode = string;
export interface Algorithm {
  name?: string;
  algorithmArn?: string;
  algorithmImage?: AlgorithmImage;
  defaultHyperParameters?: { [key: string]: string | undefined };
  defaultHyperParameterRanges?: DefaultHyperParameterRanges;
  defaultResourceConfig?: { [key: string]: string | undefined };
  trainingInputMode?: string;
  roleArn?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
}
export const Algorithm = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    algorithmArn: S.optional(S.String),
    algorithmImage: S.optional(AlgorithmImage),
    defaultHyperParameters: S.optional(HyperParameters),
    defaultHyperParameterRanges: S.optional(DefaultHyperParameterRanges),
    defaultResourceConfig: S.optional(ResourceConfig),
    trainingInputMode: S.optional(S.String),
    roleArn: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "Algorithm" }) as any as S.Schema<Algorithm>;
export interface DescribeAlgorithmResponse {
  algorithm?: Algorithm;
}
export const DescribeAlgorithmResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ algorithm: S.optional(Algorithm) }),
).annotate({
  identifier: "DescribeAlgorithmResponse",
}) as any as S.Schema<DescribeAlgorithmResponse>;
export interface DescribeBatchInferenceJobRequest {
  batchInferenceJobArn: string;
}
export const DescribeBatchInferenceJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ batchInferenceJobArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeBatchInferenceJobRequest",
}) as any as S.Schema<DescribeBatchInferenceJobRequest>;
export type FailureReason = string;
export type Status = string;
export interface BatchInferenceJob {
  jobName?: string;
  batchInferenceJobArn?: string;
  filterArn?: string;
  failureReason?: string;
  solutionVersionArn?: string;
  numResults?: number;
  jobInput?: BatchInferenceJobInput;
  jobOutput?: BatchInferenceJobOutput;
  batchInferenceJobConfig?: BatchInferenceJobConfig;
  roleArn?: string;
  batchInferenceJobMode?: BatchInferenceJobMode;
  themeGenerationConfig?: ThemeGenerationConfig;
  status?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
}
export const BatchInferenceJob = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobName: S.optional(S.String),
    batchInferenceJobArn: S.optional(S.String),
    filterArn: S.optional(S.String),
    failureReason: S.optional(S.String),
    solutionVersionArn: S.optional(S.String),
    numResults: S.optional(S.Number),
    jobInput: S.optional(BatchInferenceJobInput),
    jobOutput: S.optional(BatchInferenceJobOutput),
    batchInferenceJobConfig: S.optional(BatchInferenceJobConfig),
    roleArn: S.optional(S.String),
    batchInferenceJobMode: S.optional(BatchInferenceJobMode),
    themeGenerationConfig: S.optional(ThemeGenerationConfig),
    status: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "BatchInferenceJob",
}) as any as S.Schema<BatchInferenceJob>;
export interface DescribeBatchInferenceJobResponse {
  batchInferenceJob?: BatchInferenceJob;
}
export const DescribeBatchInferenceJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ batchInferenceJob: S.optional(BatchInferenceJob) }),
).annotate({
  identifier: "DescribeBatchInferenceJobResponse",
}) as any as S.Schema<DescribeBatchInferenceJobResponse>;
export interface DescribeBatchSegmentJobRequest {
  batchSegmentJobArn: string;
}
export const DescribeBatchSegmentJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ batchSegmentJobArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeBatchSegmentJobRequest",
}) as any as S.Schema<DescribeBatchSegmentJobRequest>;
export interface BatchSegmentJob {
  jobName?: string;
  batchSegmentJobArn?: string;
  filterArn?: string;
  failureReason?: string;
  solutionVersionArn?: string;
  numResults?: number;
  jobInput?: BatchSegmentJobInput;
  jobOutput?: BatchSegmentJobOutput;
  roleArn?: string;
  status?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
}
export const BatchSegmentJob = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobName: S.optional(S.String),
    batchSegmentJobArn: S.optional(S.String),
    filterArn: S.optional(S.String),
    failureReason: S.optional(S.String),
    solutionVersionArn: S.optional(S.String),
    numResults: S.optional(S.Number),
    jobInput: S.optional(BatchSegmentJobInput),
    jobOutput: S.optional(BatchSegmentJobOutput),
    roleArn: S.optional(S.String),
    status: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "BatchSegmentJob",
}) as any as S.Schema<BatchSegmentJob>;
export interface DescribeBatchSegmentJobResponse {
  batchSegmentJob?: BatchSegmentJob;
}
export const DescribeBatchSegmentJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ batchSegmentJob: S.optional(BatchSegmentJob) }),
).annotate({
  identifier: "DescribeBatchSegmentJobResponse",
}) as any as S.Schema<DescribeBatchSegmentJobResponse>;
export interface DescribeCampaignRequest {
  campaignArn: string;
}
export const DescribeCampaignRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ campaignArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeCampaignRequest",
}) as any as S.Schema<DescribeCampaignRequest>;
export interface CampaignUpdateSummary {
  solutionVersionArn?: string;
  minProvisionedTPS?: number;
  campaignConfig?: CampaignConfig;
  status?: string;
  failureReason?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
}
export const CampaignUpdateSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    solutionVersionArn: S.optional(S.String),
    minProvisionedTPS: S.optional(S.Number),
    campaignConfig: S.optional(CampaignConfig),
    status: S.optional(S.String),
    failureReason: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "CampaignUpdateSummary",
}) as any as S.Schema<CampaignUpdateSummary>;
export interface Campaign {
  name?: string;
  campaignArn?: string;
  solutionVersionArn?: string;
  minProvisionedTPS?: number;
  campaignConfig?: CampaignConfig;
  status?: string;
  failureReason?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  latestCampaignUpdate?: CampaignUpdateSummary;
}
export const Campaign = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    campaignArn: S.optional(S.String),
    solutionVersionArn: S.optional(S.String),
    minProvisionedTPS: S.optional(S.Number),
    campaignConfig: S.optional(CampaignConfig),
    status: S.optional(S.String),
    failureReason: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    latestCampaignUpdate: S.optional(CampaignUpdateSummary),
  }),
).annotate({ identifier: "Campaign" }) as any as S.Schema<Campaign>;
export interface DescribeCampaignResponse {
  campaign?: Campaign;
}
export const DescribeCampaignResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ campaign: S.optional(Campaign) }),
).annotate({
  identifier: "DescribeCampaignResponse",
}) as any as S.Schema<DescribeCampaignResponse>;
export interface DescribeDataDeletionJobRequest {
  dataDeletionJobArn: string;
}
export const DescribeDataDeletionJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ dataDeletionJobArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeDataDeletionJobRequest",
}) as any as S.Schema<DescribeDataDeletionJobRequest>;
export interface DataDeletionJob {
  jobName?: string;
  dataDeletionJobArn?: string;
  datasetGroupArn?: string;
  dataSource?: DataSource;
  roleArn?: string;
  status?: string;
  numDeleted?: number;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  failureReason?: string;
}
export const DataDeletionJob = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobName: S.optional(S.String),
    dataDeletionJobArn: S.optional(S.String),
    datasetGroupArn: S.optional(S.String),
    dataSource: S.optional(DataSource),
    roleArn: S.optional(S.String),
    status: S.optional(S.String),
    numDeleted: S.optional(S.Number),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    failureReason: S.optional(S.String),
  }),
).annotate({
  identifier: "DataDeletionJob",
}) as any as S.Schema<DataDeletionJob>;
export interface DescribeDataDeletionJobResponse {
  dataDeletionJob?: DataDeletionJob;
}
export const DescribeDataDeletionJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ dataDeletionJob: S.optional(DataDeletionJob) }),
).annotate({
  identifier: "DescribeDataDeletionJobResponse",
}) as any as S.Schema<DescribeDataDeletionJobResponse>;
export interface DescribeDatasetRequest {
  datasetArn: string;
}
export const DescribeDatasetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ datasetArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeDatasetRequest",
}) as any as S.Schema<DescribeDatasetRequest>;
export interface DatasetUpdateSummary {
  schemaArn?: string;
  status?: string;
  failureReason?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
}
export const DatasetUpdateSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    schemaArn: S.optional(S.String),
    status: S.optional(S.String),
    failureReason: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "DatasetUpdateSummary",
}) as any as S.Schema<DatasetUpdateSummary>;
export interface Dataset {
  name?: string;
  datasetArn?: string;
  datasetGroupArn?: string;
  datasetType?: string;
  schemaArn?: string;
  status?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  latestDatasetUpdate?: DatasetUpdateSummary;
  trackingId?: string;
}
export const Dataset = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    datasetArn: S.optional(S.String),
    datasetGroupArn: S.optional(S.String),
    datasetType: S.optional(S.String),
    schemaArn: S.optional(S.String),
    status: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    latestDatasetUpdate: S.optional(DatasetUpdateSummary),
    trackingId: S.optional(S.String),
  }),
).annotate({ identifier: "Dataset" }) as any as S.Schema<Dataset>;
export interface DescribeDatasetResponse {
  dataset?: Dataset;
}
export const DescribeDatasetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ dataset: S.optional(Dataset) }),
).annotate({
  identifier: "DescribeDatasetResponse",
}) as any as S.Schema<DescribeDatasetResponse>;
export interface DescribeDatasetExportJobRequest {
  datasetExportJobArn: string;
}
export const DescribeDatasetExportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ datasetExportJobArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeDatasetExportJobRequest",
}) as any as S.Schema<DescribeDatasetExportJobRequest>;
export interface DatasetExportJob {
  jobName?: string;
  datasetExportJobArn?: string;
  datasetArn?: string;
  ingestionMode?: IngestionMode;
  roleArn?: string;
  status?: string;
  jobOutput?: DatasetExportJobOutput;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  failureReason?: string;
}
export const DatasetExportJob = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobName: S.optional(S.String),
    datasetExportJobArn: S.optional(S.String),
    datasetArn: S.optional(S.String),
    ingestionMode: S.optional(IngestionMode),
    roleArn: S.optional(S.String),
    status: S.optional(S.String),
    jobOutput: S.optional(DatasetExportJobOutput),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    failureReason: S.optional(S.String),
  }),
).annotate({
  identifier: "DatasetExportJob",
}) as any as S.Schema<DatasetExportJob>;
export interface DescribeDatasetExportJobResponse {
  datasetExportJob?: DatasetExportJob;
}
export const DescribeDatasetExportJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ datasetExportJob: S.optional(DatasetExportJob) }),
).annotate({
  identifier: "DescribeDatasetExportJobResponse",
}) as any as S.Schema<DescribeDatasetExportJobResponse>;
export interface DescribeDatasetGroupRequest {
  datasetGroupArn: string;
}
export const DescribeDatasetGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ datasetGroupArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeDatasetGroupRequest",
}) as any as S.Schema<DescribeDatasetGroupRequest>;
export interface DatasetGroup {
  name?: string;
  datasetGroupArn?: string;
  status?: string;
  roleArn?: string;
  kmsKeyArn?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  failureReason?: string;
  domain?: Domain;
}
export const DatasetGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    datasetGroupArn: S.optional(S.String),
    status: S.optional(S.String),
    roleArn: S.optional(S.String),
    kmsKeyArn: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    failureReason: S.optional(S.String),
    domain: S.optional(Domain),
  }),
).annotate({ identifier: "DatasetGroup" }) as any as S.Schema<DatasetGroup>;
export interface DescribeDatasetGroupResponse {
  datasetGroup?: DatasetGroup;
}
export const DescribeDatasetGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ datasetGroup: S.optional(DatasetGroup) }),
).annotate({
  identifier: "DescribeDatasetGroupResponse",
}) as any as S.Schema<DescribeDatasetGroupResponse>;
export interface DescribeDatasetImportJobRequest {
  datasetImportJobArn: string;
}
export const DescribeDatasetImportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ datasetImportJobArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeDatasetImportJobRequest",
}) as any as S.Schema<DescribeDatasetImportJobRequest>;
export interface DatasetImportJob {
  jobName?: string;
  datasetImportJobArn?: string;
  datasetArn?: string;
  dataSource?: DataSource;
  roleArn?: string;
  status?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  failureReason?: string;
  importMode?: ImportMode;
  publishAttributionMetricsToS3?: boolean;
}
export const DatasetImportJob = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobName: S.optional(S.String),
    datasetImportJobArn: S.optional(S.String),
    datasetArn: S.optional(S.String),
    dataSource: S.optional(DataSource),
    roleArn: S.optional(S.String),
    status: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    failureReason: S.optional(S.String),
    importMode: S.optional(ImportMode),
    publishAttributionMetricsToS3: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "DatasetImportJob",
}) as any as S.Schema<DatasetImportJob>;
export interface DescribeDatasetImportJobResponse {
  datasetImportJob?: DatasetImportJob;
}
export const DescribeDatasetImportJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ datasetImportJob: S.optional(DatasetImportJob) }),
).annotate({
  identifier: "DescribeDatasetImportJobResponse",
}) as any as S.Schema<DescribeDatasetImportJobResponse>;
export interface DescribeEventTrackerRequest {
  eventTrackerArn: string;
}
export const DescribeEventTrackerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ eventTrackerArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeEventTrackerRequest",
}) as any as S.Schema<DescribeEventTrackerRequest>;
export type AccountId = string;
export interface EventTracker {
  name?: string;
  eventTrackerArn?: string;
  accountId?: string;
  trackingId?: string;
  datasetGroupArn?: string;
  status?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
}
export const EventTracker = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    eventTrackerArn: S.optional(S.String),
    accountId: S.optional(S.String),
    trackingId: S.optional(S.String),
    datasetGroupArn: S.optional(S.String),
    status: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "EventTracker" }) as any as S.Schema<EventTracker>;
export interface DescribeEventTrackerResponse {
  eventTracker?: EventTracker;
}
export const DescribeEventTrackerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ eventTracker: S.optional(EventTracker) }),
).annotate({
  identifier: "DescribeEventTrackerResponse",
}) as any as S.Schema<DescribeEventTrackerResponse>;
export interface DescribeFeatureTransformationRequest {
  featureTransformationArn: string;
}
export const DescribeFeatureTransformationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ featureTransformationArn: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DescribeFeatureTransformationRequest",
}) as any as S.Schema<DescribeFeatureTransformationRequest>;
export type FeaturizationParameters = { [key: string]: string | undefined };
export const FeaturizationParameters = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface FeatureTransformation {
  name?: string;
  featureTransformationArn?: string;
  defaultParameters?: { [key: string]: string | undefined };
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  status?: string;
}
export const FeatureTransformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    featureTransformationArn: S.optional(S.String),
    defaultParameters: S.optional(FeaturizationParameters),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    status: S.optional(S.String),
  }),
).annotate({
  identifier: "FeatureTransformation",
}) as any as S.Schema<FeatureTransformation>;
export interface DescribeFeatureTransformationResponse {
  featureTransformation?: FeatureTransformation;
}
export const DescribeFeatureTransformationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ featureTransformation: S.optional(FeatureTransformation) }),
).annotate({
  identifier: "DescribeFeatureTransformationResponse",
}) as any as S.Schema<DescribeFeatureTransformationResponse>;
export interface DescribeFilterRequest {
  filterArn: string;
}
export const DescribeFilterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ filterArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeFilterRequest",
}) as any as S.Schema<DescribeFilterRequest>;
export interface Filter {
  name?: string;
  filterArn?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  datasetGroupArn?: string;
  failureReason?: string;
  filterExpression?: string | redacted.Redacted<string>;
  status?: string;
}
export const Filter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    filterArn: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    datasetGroupArn: S.optional(S.String),
    failureReason: S.optional(S.String),
    filterExpression: S.optional(SensitiveString),
    status: S.optional(S.String),
  }),
).annotate({ identifier: "Filter" }) as any as S.Schema<Filter>;
export interface DescribeFilterResponse {
  filter?: Filter;
}
export const DescribeFilterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ filter: S.optional(Filter) }),
).annotate({
  identifier: "DescribeFilterResponse",
}) as any as S.Schema<DescribeFilterResponse>;
export interface DescribeMetricAttributionRequest {
  metricAttributionArn: string;
}
export const DescribeMetricAttributionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ metricAttributionArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeMetricAttributionRequest",
}) as any as S.Schema<DescribeMetricAttributionRequest>;
export interface MetricAttribution {
  name?: string;
  metricAttributionArn?: string;
  datasetGroupArn?: string;
  metricsOutputConfig?: MetricAttributionOutput;
  status?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  failureReason?: string;
}
export const MetricAttribution = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    metricAttributionArn: S.optional(S.String),
    datasetGroupArn: S.optional(S.String),
    metricsOutputConfig: S.optional(MetricAttributionOutput),
    status: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    failureReason: S.optional(S.String),
  }),
).annotate({
  identifier: "MetricAttribution",
}) as any as S.Schema<MetricAttribution>;
export interface DescribeMetricAttributionResponse {
  metricAttribution?: MetricAttribution;
}
export const DescribeMetricAttributionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ metricAttribution: S.optional(MetricAttribution) }),
).annotate({
  identifier: "DescribeMetricAttributionResponse",
}) as any as S.Schema<DescribeMetricAttributionResponse>;
export interface DescribeRecipeRequest {
  recipeArn: string;
}
export const DescribeRecipeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ recipeArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeRecipeRequest",
}) as any as S.Schema<DescribeRecipeRequest>;
export type Description = string;
export type RecipeType = string;
export interface Recipe {
  name?: string;
  recipeArn?: string;
  algorithmArn?: string;
  featureTransformationArn?: string;
  status?: string;
  description?: string;
  creationDateTime?: Date;
  recipeType?: string;
  lastUpdatedDateTime?: Date;
}
export const Recipe = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    recipeArn: S.optional(S.String),
    algorithmArn: S.optional(S.String),
    featureTransformationArn: S.optional(S.String),
    status: S.optional(S.String),
    description: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    recipeType: S.optional(S.String),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "Recipe" }) as any as S.Schema<Recipe>;
export interface DescribeRecipeResponse {
  recipe?: Recipe;
}
export const DescribeRecipeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ recipe: S.optional(Recipe) }),
).annotate({
  identifier: "DescribeRecipeResponse",
}) as any as S.Schema<DescribeRecipeResponse>;
export interface DescribeRecommenderRequest {
  recommenderArn: string;
}
export const DescribeRecommenderRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ recommenderArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeRecommenderRequest",
}) as any as S.Schema<DescribeRecommenderRequest>;
export interface RecommenderUpdateSummary {
  recommenderConfig?: RecommenderConfig;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  status?: string;
  failureReason?: string;
}
export const RecommenderUpdateSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    recommenderConfig: S.optional(RecommenderConfig),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    status: S.optional(S.String),
    failureReason: S.optional(S.String),
  }),
).annotate({
  identifier: "RecommenderUpdateSummary",
}) as any as S.Schema<RecommenderUpdateSummary>;
export type MetricValue = number;
export type Metrics = { [key: string]: number | undefined };
export const Metrics = /*@__PURE__*/ S.Record(
  S.String,
  S.Number.pipe(S.optional),
);
export interface Recommender {
  recommenderArn?: string;
  datasetGroupArn?: string;
  name?: string;
  recipeArn?: string;
  recommenderConfig?: RecommenderConfig;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  status?: string;
  failureReason?: string;
  latestRecommenderUpdate?: RecommenderUpdateSummary;
  modelMetrics?: { [key: string]: number | undefined };
}
export const Recommender = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    recommenderArn: S.optional(S.String),
    datasetGroupArn: S.optional(S.String),
    name: S.optional(S.String),
    recipeArn: S.optional(S.String),
    recommenderConfig: S.optional(RecommenderConfig),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    status: S.optional(S.String),
    failureReason: S.optional(S.String),
    latestRecommenderUpdate: S.optional(RecommenderUpdateSummary),
    modelMetrics: S.optional(Metrics),
  }),
).annotate({ identifier: "Recommender" }) as any as S.Schema<Recommender>;
export interface DescribeRecommenderResponse {
  recommender?: Recommender;
}
export const DescribeRecommenderResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ recommender: S.optional(Recommender) }),
).annotate({
  identifier: "DescribeRecommenderResponse",
}) as any as S.Schema<DescribeRecommenderResponse>;
export interface DescribeSchemaRequest {
  schemaArn: string;
}
export const DescribeSchemaRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ schemaArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeSchemaRequest",
}) as any as S.Schema<DescribeSchemaRequest>;
export interface DatasetSchema {
  name?: string;
  schemaArn?: string;
  schema?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  domain?: Domain;
}
export const DatasetSchema = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    schemaArn: S.optional(S.String),
    schema: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    domain: S.optional(Domain),
  }),
).annotate({ identifier: "DatasetSchema" }) as any as S.Schema<DatasetSchema>;
export interface DescribeSchemaResponse {
  schema?: DatasetSchema;
}
export const DescribeSchemaResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ schema: S.optional(DatasetSchema) }),
).annotate({
  identifier: "DescribeSchemaResponse",
}) as any as S.Schema<DescribeSchemaResponse>;
export interface DescribeSolutionRequest {
  solutionArn: string;
}
export const DescribeSolutionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ solutionArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeSolutionRequest",
}) as any as S.Schema<DescribeSolutionRequest>;
export type PerformHPO = boolean;
export interface AutoMLResult {
  bestRecipeArn?: string;
}
export const AutoMLResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ bestRecipeArn: S.optional(S.String) }),
).annotate({ identifier: "AutoMLResult" }) as any as S.Schema<AutoMLResult>;
export type TrainingType = "AUTOMATIC" | "MANUAL" | (string & {});
export const TrainingType = S.String;

export interface SolutionVersionSummary {
  solutionVersionArn?: string;
  status?: string;
  trainingMode?: TrainingMode;
  trainingType?: TrainingType;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  failureReason?: string;
}
export const SolutionVersionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    solutionVersionArn: S.optional(S.String),
    status: S.optional(S.String),
    trainingMode: S.optional(TrainingMode),
    trainingType: S.optional(TrainingType),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    failureReason: S.optional(S.String),
  }),
).annotate({
  identifier: "SolutionVersionSummary",
}) as any as S.Schema<SolutionVersionSummary>;
export interface SolutionUpdateConfig {
  autoTrainingConfig?: AutoTrainingConfig;
  eventsConfig?: EventsConfig;
}
export const SolutionUpdateConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    autoTrainingConfig: S.optional(AutoTrainingConfig),
    eventsConfig: S.optional(EventsConfig),
  }),
).annotate({
  identifier: "SolutionUpdateConfig",
}) as any as S.Schema<SolutionUpdateConfig>;
export interface SolutionUpdateSummary {
  solutionUpdateConfig?: SolutionUpdateConfig;
  status?: string;
  performAutoTraining?: boolean;
  performIncrementalUpdate?: boolean;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  failureReason?: string;
}
export const SolutionUpdateSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    solutionUpdateConfig: S.optional(SolutionUpdateConfig),
    status: S.optional(S.String),
    performAutoTraining: S.optional(S.Boolean),
    performIncrementalUpdate: S.optional(S.Boolean),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    failureReason: S.optional(S.String),
  }),
).annotate({
  identifier: "SolutionUpdateSummary",
}) as any as S.Schema<SolutionUpdateSummary>;
export interface Solution {
  name?: string;
  solutionArn?: string;
  performHPO?: boolean;
  performAutoML?: boolean;
  performAutoTraining?: boolean;
  performIncrementalUpdate?: boolean;
  recipeArn?: string;
  datasetGroupArn?: string;
  eventType?: string;
  solutionConfig?: SolutionConfig;
  autoMLResult?: AutoMLResult;
  status?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  latestSolutionVersion?: SolutionVersionSummary;
  latestSolutionUpdate?: SolutionUpdateSummary;
}
export const Solution = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    solutionArn: S.optional(S.String),
    performHPO: S.optional(S.Boolean),
    performAutoML: S.optional(S.Boolean),
    performAutoTraining: S.optional(S.Boolean),
    performIncrementalUpdate: S.optional(S.Boolean),
    recipeArn: S.optional(S.String),
    datasetGroupArn: S.optional(S.String),
    eventType: S.optional(S.String),
    solutionConfig: S.optional(SolutionConfig),
    autoMLResult: S.optional(AutoMLResult),
    status: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    latestSolutionVersion: S.optional(SolutionVersionSummary),
    latestSolutionUpdate: S.optional(SolutionUpdateSummary),
  }),
).annotate({ identifier: "Solution" }) as any as S.Schema<Solution>;
export interface DescribeSolutionResponse {
  solution?: Solution;
}
export const DescribeSolutionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ solution: S.optional(Solution) }),
).annotate({
  identifier: "DescribeSolutionResponse",
}) as any as S.Schema<DescribeSolutionResponse>;
export interface DescribeSolutionVersionRequest {
  solutionVersionArn: string;
}
export const DescribeSolutionVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ solutionVersionArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeSolutionVersionRequest",
}) as any as S.Schema<DescribeSolutionVersionRequest>;
export type TrainingHours = number;
export interface TunedHPOParams {
  algorithmHyperParameters?: { [key: string]: string | undefined };
}
export const TunedHPOParams = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ algorithmHyperParameters: S.optional(HyperParameters) }),
).annotate({ identifier: "TunedHPOParams" }) as any as S.Schema<TunedHPOParams>;
export interface SolutionVersion {
  name?: string;
  solutionVersionArn?: string;
  solutionArn?: string;
  performHPO?: boolean;
  performAutoML?: boolean;
  performIncrementalUpdate?: boolean;
  recipeArn?: string;
  eventType?: string;
  datasetGroupArn?: string;
  solutionConfig?: SolutionConfig;
  trainingHours?: number;
  trainingMode?: TrainingMode;
  tunedHPOParams?: TunedHPOParams;
  status?: string;
  failureReason?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  trainingType?: TrainingType;
}
export const SolutionVersion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    solutionVersionArn: S.optional(S.String),
    solutionArn: S.optional(S.String),
    performHPO: S.optional(S.Boolean),
    performAutoML: S.optional(S.Boolean),
    performIncrementalUpdate: S.optional(S.Boolean),
    recipeArn: S.optional(S.String),
    eventType: S.optional(S.String),
    datasetGroupArn: S.optional(S.String),
    solutionConfig: S.optional(SolutionConfig),
    trainingHours: S.optional(S.Number),
    trainingMode: S.optional(TrainingMode),
    tunedHPOParams: S.optional(TunedHPOParams),
    status: S.optional(S.String),
    failureReason: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    trainingType: S.optional(TrainingType),
  }),
).annotate({
  identifier: "SolutionVersion",
}) as any as S.Schema<SolutionVersion>;
export interface DescribeSolutionVersionResponse {
  solutionVersion?: SolutionVersion;
}
export const DescribeSolutionVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ solutionVersion: S.optional(SolutionVersion) }),
).annotate({
  identifier: "DescribeSolutionVersionResponse",
}) as any as S.Schema<DescribeSolutionVersionResponse>;
export interface GetSolutionMetricsRequest {
  solutionVersionArn: string;
}
export const GetSolutionMetricsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ solutionVersionArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetSolutionMetricsRequest",
}) as any as S.Schema<GetSolutionMetricsRequest>;
export interface GetSolutionMetricsResponse {
  solutionVersionArn?: string;
  metrics?: { [key: string]: number | undefined };
}
export const GetSolutionMetricsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    solutionVersionArn: S.optional(S.String),
    metrics: S.optional(Metrics),
  }),
).annotate({
  identifier: "GetSolutionMetricsResponse",
}) as any as S.Schema<GetSolutionMetricsResponse>;
export type NextToken = string;
export type MaxResults = number;
export interface ListBatchInferenceJobsRequest {
  solutionVersionArn?: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListBatchInferenceJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    solutionVersionArn: S.optional(S.String),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListBatchInferenceJobsRequest",
}) as any as S.Schema<ListBatchInferenceJobsRequest>;
export interface BatchInferenceJobSummary {
  batchInferenceJobArn?: string;
  jobName?: string;
  status?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  failureReason?: string;
  solutionVersionArn?: string;
  batchInferenceJobMode?: BatchInferenceJobMode;
}
export const BatchInferenceJobSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    batchInferenceJobArn: S.optional(S.String),
    jobName: S.optional(S.String),
    status: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    failureReason: S.optional(S.String),
    solutionVersionArn: S.optional(S.String),
    batchInferenceJobMode: S.optional(BatchInferenceJobMode),
  }),
).annotate({
  identifier: "BatchInferenceJobSummary",
}) as any as S.Schema<BatchInferenceJobSummary>;
export type BatchInferenceJobs = BatchInferenceJobSummary[];
export const BatchInferenceJobs = /*@__PURE__*/ S.Array(
  BatchInferenceJobSummary,
);
export interface ListBatchInferenceJobsResponse {
  batchInferenceJobs?: BatchInferenceJobSummary[];
  nextToken?: string;
}
export const ListBatchInferenceJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    batchInferenceJobs: S.optional(BatchInferenceJobs),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListBatchInferenceJobsResponse",
}) as any as S.Schema<ListBatchInferenceJobsResponse>;
export interface ListBatchSegmentJobsRequest {
  solutionVersionArn?: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListBatchSegmentJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    solutionVersionArn: S.optional(S.String),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListBatchSegmentJobsRequest",
}) as any as S.Schema<ListBatchSegmentJobsRequest>;
export interface BatchSegmentJobSummary {
  batchSegmentJobArn?: string;
  jobName?: string;
  status?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  failureReason?: string;
  solutionVersionArn?: string;
}
export const BatchSegmentJobSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    batchSegmentJobArn: S.optional(S.String),
    jobName: S.optional(S.String),
    status: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    failureReason: S.optional(S.String),
    solutionVersionArn: S.optional(S.String),
  }),
).annotate({
  identifier: "BatchSegmentJobSummary",
}) as any as S.Schema<BatchSegmentJobSummary>;
export type BatchSegmentJobs = BatchSegmentJobSummary[];
export const BatchSegmentJobs = /*@__PURE__*/ S.Array(BatchSegmentJobSummary);
export interface ListBatchSegmentJobsResponse {
  batchSegmentJobs?: BatchSegmentJobSummary[];
  nextToken?: string;
}
export const ListBatchSegmentJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    batchSegmentJobs: S.optional(BatchSegmentJobs),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListBatchSegmentJobsResponse",
}) as any as S.Schema<ListBatchSegmentJobsResponse>;
export interface ListCampaignsRequest {
  solutionArn?: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListCampaignsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    solutionArn: S.optional(S.String),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListCampaignsRequest",
}) as any as S.Schema<ListCampaignsRequest>;
export interface CampaignSummary {
  name?: string;
  campaignArn?: string;
  status?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  failureReason?: string;
}
export const CampaignSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    campaignArn: S.optional(S.String),
    status: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    failureReason: S.optional(S.String),
  }),
).annotate({
  identifier: "CampaignSummary",
}) as any as S.Schema<CampaignSummary>;
export type Campaigns = CampaignSummary[];
export const Campaigns = /*@__PURE__*/ S.Array(CampaignSummary);
export interface ListCampaignsResponse {
  campaigns?: CampaignSummary[];
  nextToken?: string;
}
export const ListCampaignsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    campaigns: S.optional(Campaigns),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCampaignsResponse",
}) as any as S.Schema<ListCampaignsResponse>;
export interface ListDataDeletionJobsRequest {
  datasetGroupArn?: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListDataDeletionJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    datasetGroupArn: S.optional(S.String),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListDataDeletionJobsRequest",
}) as any as S.Schema<ListDataDeletionJobsRequest>;
export interface DataDeletionJobSummary {
  dataDeletionJobArn?: string;
  datasetGroupArn?: string;
  jobName?: string;
  status?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  failureReason?: string;
}
export const DataDeletionJobSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dataDeletionJobArn: S.optional(S.String),
    datasetGroupArn: S.optional(S.String),
    jobName: S.optional(S.String),
    status: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    failureReason: S.optional(S.String),
  }),
).annotate({
  identifier: "DataDeletionJobSummary",
}) as any as S.Schema<DataDeletionJobSummary>;
export type DataDeletionJobs = DataDeletionJobSummary[];
export const DataDeletionJobs = /*@__PURE__*/ S.Array(DataDeletionJobSummary);
export interface ListDataDeletionJobsResponse {
  dataDeletionJobs?: DataDeletionJobSummary[];
  nextToken?: string;
}
export const ListDataDeletionJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dataDeletionJobs: S.optional(DataDeletionJobs),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDataDeletionJobsResponse",
}) as any as S.Schema<ListDataDeletionJobsResponse>;
export interface ListDatasetExportJobsRequest {
  datasetArn?: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListDatasetExportJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    datasetArn: S.optional(S.String),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListDatasetExportJobsRequest",
}) as any as S.Schema<ListDatasetExportJobsRequest>;
export interface DatasetExportJobSummary {
  datasetExportJobArn?: string;
  jobName?: string;
  status?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  failureReason?: string;
}
export const DatasetExportJobSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    datasetExportJobArn: S.optional(S.String),
    jobName: S.optional(S.String),
    status: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    failureReason: S.optional(S.String),
  }),
).annotate({
  identifier: "DatasetExportJobSummary",
}) as any as S.Schema<DatasetExportJobSummary>;
export type DatasetExportJobs = DatasetExportJobSummary[];
export const DatasetExportJobs = /*@__PURE__*/ S.Array(DatasetExportJobSummary);
export interface ListDatasetExportJobsResponse {
  datasetExportJobs?: DatasetExportJobSummary[];
  nextToken?: string;
}
export const ListDatasetExportJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    datasetExportJobs: S.optional(DatasetExportJobs),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDatasetExportJobsResponse",
}) as any as S.Schema<ListDatasetExportJobsResponse>;
export interface ListDatasetGroupsRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListDatasetGroupsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListDatasetGroupsRequest",
}) as any as S.Schema<ListDatasetGroupsRequest>;
export interface DatasetGroupSummary {
  name?: string;
  datasetGroupArn?: string;
  status?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  failureReason?: string;
  domain?: Domain;
}
export const DatasetGroupSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    datasetGroupArn: S.optional(S.String),
    status: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    failureReason: S.optional(S.String),
    domain: S.optional(Domain),
  }),
).annotate({
  identifier: "DatasetGroupSummary",
}) as any as S.Schema<DatasetGroupSummary>;
export type DatasetGroups = DatasetGroupSummary[];
export const DatasetGroups = /*@__PURE__*/ S.Array(DatasetGroupSummary);
export interface ListDatasetGroupsResponse {
  datasetGroups?: DatasetGroupSummary[];
  nextToken?: string;
}
export const ListDatasetGroupsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    datasetGroups: S.optional(DatasetGroups),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDatasetGroupsResponse",
}) as any as S.Schema<ListDatasetGroupsResponse>;
export interface ListDatasetImportJobsRequest {
  datasetArn?: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListDatasetImportJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    datasetArn: S.optional(S.String),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListDatasetImportJobsRequest",
}) as any as S.Schema<ListDatasetImportJobsRequest>;
export interface DatasetImportJobSummary {
  datasetImportJobArn?: string;
  jobName?: string;
  status?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  failureReason?: string;
  importMode?: ImportMode;
}
export const DatasetImportJobSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    datasetImportJobArn: S.optional(S.String),
    jobName: S.optional(S.String),
    status: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    failureReason: S.optional(S.String),
    importMode: S.optional(ImportMode),
  }),
).annotate({
  identifier: "DatasetImportJobSummary",
}) as any as S.Schema<DatasetImportJobSummary>;
export type DatasetImportJobs = DatasetImportJobSummary[];
export const DatasetImportJobs = /*@__PURE__*/ S.Array(DatasetImportJobSummary);
export interface ListDatasetImportJobsResponse {
  datasetImportJobs?: DatasetImportJobSummary[];
  nextToken?: string;
}
export const ListDatasetImportJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    datasetImportJobs: S.optional(DatasetImportJobs),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDatasetImportJobsResponse",
}) as any as S.Schema<ListDatasetImportJobsResponse>;
export interface ListDatasetsRequest {
  datasetGroupArn?: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListDatasetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    datasetGroupArn: S.optional(S.String),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListDatasetsRequest",
}) as any as S.Schema<ListDatasetsRequest>;
export interface DatasetSummary {
  name?: string;
  datasetArn?: string;
  datasetType?: string;
  status?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
}
export const DatasetSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    datasetArn: S.optional(S.String),
    datasetType: S.optional(S.String),
    status: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "DatasetSummary" }) as any as S.Schema<DatasetSummary>;
export type Datasets = DatasetSummary[];
export const Datasets = /*@__PURE__*/ S.Array(DatasetSummary);
export interface ListDatasetsResponse {
  datasets?: DatasetSummary[];
  nextToken?: string;
}
export const ListDatasetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ datasets: S.optional(Datasets), nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListDatasetsResponse",
}) as any as S.Schema<ListDatasetsResponse>;
export interface ListEventTrackersRequest {
  datasetGroupArn?: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListEventTrackersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    datasetGroupArn: S.optional(S.String),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListEventTrackersRequest",
}) as any as S.Schema<ListEventTrackersRequest>;
export interface EventTrackerSummary {
  name?: string;
  eventTrackerArn?: string;
  status?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
}
export const EventTrackerSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    eventTrackerArn: S.optional(S.String),
    status: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "EventTrackerSummary",
}) as any as S.Schema<EventTrackerSummary>;
export type EventTrackers = EventTrackerSummary[];
export const EventTrackers = /*@__PURE__*/ S.Array(EventTrackerSummary);
export interface ListEventTrackersResponse {
  eventTrackers?: EventTrackerSummary[];
  nextToken?: string;
}
export const ListEventTrackersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    eventTrackers: S.optional(EventTrackers),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListEventTrackersResponse",
}) as any as S.Schema<ListEventTrackersResponse>;
export interface ListFiltersRequest {
  datasetGroupArn?: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListFiltersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    datasetGroupArn: S.optional(S.String),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListFiltersRequest",
}) as any as S.Schema<ListFiltersRequest>;
export interface FilterSummary {
  name?: string;
  filterArn?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  datasetGroupArn?: string;
  failureReason?: string;
  status?: string;
}
export const FilterSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    filterArn: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    datasetGroupArn: S.optional(S.String),
    failureReason: S.optional(S.String),
    status: S.optional(S.String),
  }),
).annotate({ identifier: "FilterSummary" }) as any as S.Schema<FilterSummary>;
export type Filters = FilterSummary[];
export const Filters = /*@__PURE__*/ S.Array(FilterSummary);
export interface ListFiltersResponse {
  Filters?: FilterSummary[];
  nextToken?: string;
}
export const ListFiltersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Filters: S.optional(Filters), nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListFiltersResponse",
}) as any as S.Schema<ListFiltersResponse>;
export interface ListMetricAttributionMetricsRequest {
  metricAttributionArn?: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListMetricAttributionMetricsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    metricAttributionArn: S.optional(S.String),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListMetricAttributionMetricsRequest",
}) as any as S.Schema<ListMetricAttributionMetricsRequest>;
export interface ListMetricAttributionMetricsResponse {
  metrics?: MetricAttribute[];
  nextToken?: string;
}
export const ListMetricAttributionMetricsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      metrics: S.optional(MetricAttributes),
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListMetricAttributionMetricsResponse",
}) as any as S.Schema<ListMetricAttributionMetricsResponse>;
export interface ListMetricAttributionsRequest {
  datasetGroupArn?: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListMetricAttributionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    datasetGroupArn: S.optional(S.String),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListMetricAttributionsRequest",
}) as any as S.Schema<ListMetricAttributionsRequest>;
export interface MetricAttributionSummary {
  name?: string;
  metricAttributionArn?: string;
  status?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  failureReason?: string;
}
export const MetricAttributionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    metricAttributionArn: S.optional(S.String),
    status: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    failureReason: S.optional(S.String),
  }),
).annotate({
  identifier: "MetricAttributionSummary",
}) as any as S.Schema<MetricAttributionSummary>;
export type MetricAttributions = MetricAttributionSummary[];
export const MetricAttributions = /*@__PURE__*/ S.Array(
  MetricAttributionSummary,
);
export interface ListMetricAttributionsResponse {
  metricAttributions?: MetricAttributionSummary[];
  nextToken?: string;
}
export const ListMetricAttributionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    metricAttributions: S.optional(MetricAttributions),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListMetricAttributionsResponse",
}) as any as S.Schema<ListMetricAttributionsResponse>;
export type RecipeProvider = "SERVICE" | (string & {});
export const RecipeProvider = S.String;

export interface ListRecipesRequest {
  recipeProvider?: RecipeProvider;
  nextToken?: string;
  maxResults?: number;
  domain?: Domain;
}
export const ListRecipesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    recipeProvider: S.optional(RecipeProvider),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
    domain: S.optional(Domain),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListRecipesRequest",
}) as any as S.Schema<ListRecipesRequest>;
export interface RecipeSummary {
  name?: string;
  recipeArn?: string;
  status?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  domain?: Domain;
}
export const RecipeSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    recipeArn: S.optional(S.String),
    status: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    domain: S.optional(Domain),
  }),
).annotate({ identifier: "RecipeSummary" }) as any as S.Schema<RecipeSummary>;
export type Recipes = RecipeSummary[];
export const Recipes = /*@__PURE__*/ S.Array(RecipeSummary);
export interface ListRecipesResponse {
  recipes?: RecipeSummary[];
  nextToken?: string;
}
export const ListRecipesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ recipes: S.optional(Recipes), nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListRecipesResponse",
}) as any as S.Schema<ListRecipesResponse>;
export interface ListRecommendersRequest {
  datasetGroupArn?: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListRecommendersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    datasetGroupArn: S.optional(S.String),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListRecommendersRequest",
}) as any as S.Schema<ListRecommendersRequest>;
export interface RecommenderSummary {
  name?: string;
  recommenderArn?: string;
  datasetGroupArn?: string;
  recipeArn?: string;
  recommenderConfig?: RecommenderConfig;
  status?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
}
export const RecommenderSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    recommenderArn: S.optional(S.String),
    datasetGroupArn: S.optional(S.String),
    recipeArn: S.optional(S.String),
    recommenderConfig: S.optional(RecommenderConfig),
    status: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "RecommenderSummary",
}) as any as S.Schema<RecommenderSummary>;
export type Recommenders = RecommenderSummary[];
export const Recommenders = /*@__PURE__*/ S.Array(RecommenderSummary);
export interface ListRecommendersResponse {
  recommenders?: RecommenderSummary[];
  nextToken?: string;
}
export const ListRecommendersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    recommenders: S.optional(Recommenders),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListRecommendersResponse",
}) as any as S.Schema<ListRecommendersResponse>;
export interface ListSchemasRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListSchemasRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListSchemasRequest",
}) as any as S.Schema<ListSchemasRequest>;
export interface DatasetSchemaSummary {
  name?: string;
  schemaArn?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  domain?: Domain;
}
export const DatasetSchemaSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    schemaArn: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    domain: S.optional(Domain),
  }),
).annotate({
  identifier: "DatasetSchemaSummary",
}) as any as S.Schema<DatasetSchemaSummary>;
export type Schemas = DatasetSchemaSummary[];
export const Schemas = /*@__PURE__*/ S.Array(DatasetSchemaSummary);
export interface ListSchemasResponse {
  schemas?: DatasetSchemaSummary[];
  nextToken?: string;
}
export const ListSchemasResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ schemas: S.optional(Schemas), nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListSchemasResponse",
}) as any as S.Schema<ListSchemasResponse>;
export interface ListSolutionsRequest {
  datasetGroupArn?: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListSolutionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    datasetGroupArn: S.optional(S.String),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListSolutionsRequest",
}) as any as S.Schema<ListSolutionsRequest>;
export interface SolutionSummary {
  name?: string;
  solutionArn?: string;
  status?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  recipeArn?: string;
}
export const SolutionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    solutionArn: S.optional(S.String),
    status: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    recipeArn: S.optional(S.String),
  }),
).annotate({
  identifier: "SolutionSummary",
}) as any as S.Schema<SolutionSummary>;
export type Solutions = SolutionSummary[];
export const Solutions = /*@__PURE__*/ S.Array(SolutionSummary);
export interface ListSolutionsResponse {
  solutions?: SolutionSummary[];
  nextToken?: string;
}
export const ListSolutionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    solutions: S.optional(Solutions),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSolutionsResponse",
}) as any as S.Schema<ListSolutionsResponse>;
export interface ListSolutionVersionsRequest {
  solutionArn?: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListSolutionVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    solutionArn: S.optional(S.String),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListSolutionVersionsRequest",
}) as any as S.Schema<ListSolutionVersionsRequest>;
export type SolutionVersions = SolutionVersionSummary[];
export const SolutionVersions = /*@__PURE__*/ S.Array(SolutionVersionSummary);
export interface ListSolutionVersionsResponse {
  solutionVersions?: SolutionVersionSummary[];
  nextToken?: string;
}
export const ListSolutionVersionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    solutionVersions: S.optional(SolutionVersions),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSolutionVersionsResponse",
}) as any as S.Schema<ListSolutionVersionsResponse>;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface ListTagsForResourceResponse {
  tags?: Tag[];
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: S.optional(Tags) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface StartRecommenderRequest {
  recommenderArn: string;
}
export const StartRecommenderRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ recommenderArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartRecommenderRequest",
}) as any as S.Schema<StartRecommenderRequest>;
export interface StartRecommenderResponse {
  recommenderArn?: string;
}
export const StartRecommenderResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ recommenderArn: S.optional(S.String) }),
).annotate({
  identifier: "StartRecommenderResponse",
}) as any as S.Schema<StartRecommenderResponse>;
export interface StopRecommenderRequest {
  recommenderArn: string;
}
export const StopRecommenderRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ recommenderArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StopRecommenderRequest",
}) as any as S.Schema<StopRecommenderRequest>;
export interface StopRecommenderResponse {
  recommenderArn?: string;
}
export const StopRecommenderResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ recommenderArn: S.optional(S.String) }),
).annotate({
  identifier: "StopRecommenderResponse",
}) as any as S.Schema<StopRecommenderResponse>;
export interface StopSolutionVersionCreationRequest {
  solutionVersionArn: string;
}
export const StopSolutionVersionCreationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ solutionVersionArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StopSolutionVersionCreationRequest",
}) as any as S.Schema<StopSolutionVersionCreationRequest>;
export interface StopSolutionVersionCreationResponse {}
export const StopSolutionVersionCreationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StopSolutionVersionCreationResponse",
}) as any as S.Schema<StopSolutionVersionCreationResponse>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String, tags: Tags }).pipe(
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
export type TagKeys = (string | redacted.Redacted<string>)[];
export const TagKeys = /*@__PURE__*/ S.Array(SensitiveString);
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: (string | redacted.Redacted<string>)[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String, tagKeys: TagKeys }).pipe(
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
export interface UpdateCampaignRequest {
  campaignArn: string;
  solutionVersionArn?: string;
  minProvisionedTPS?: number;
  campaignConfig?: CampaignConfig;
}
export const UpdateCampaignRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    campaignArn: S.String,
    solutionVersionArn: S.optional(S.String),
    minProvisionedTPS: S.optional(S.Number),
    campaignConfig: S.optional(CampaignConfig),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateCampaignRequest",
}) as any as S.Schema<UpdateCampaignRequest>;
export interface UpdateCampaignResponse {
  campaignArn?: string;
}
export const UpdateCampaignResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ campaignArn: S.optional(S.String) }),
).annotate({
  identifier: "UpdateCampaignResponse",
}) as any as S.Schema<UpdateCampaignResponse>;
export interface UpdateDatasetRequest {
  datasetArn: string;
  schemaArn: string;
}
export const UpdateDatasetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ datasetArn: S.String, schemaArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateDatasetRequest",
}) as any as S.Schema<UpdateDatasetRequest>;
export interface UpdateDatasetResponse {
  datasetArn?: string;
}
export const UpdateDatasetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ datasetArn: S.optional(S.String) }),
).annotate({
  identifier: "UpdateDatasetResponse",
}) as any as S.Schema<UpdateDatasetResponse>;
export type MetricAttributesNamesList = string[];
export const MetricAttributesNamesList = /*@__PURE__*/ S.Array(S.String);
export interface UpdateMetricAttributionRequest {
  addMetrics?: MetricAttribute[];
  removeMetrics?: string[];
  metricsOutputConfig?: MetricAttributionOutput;
  metricAttributionArn?: string;
}
export const UpdateMetricAttributionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    addMetrics: S.optional(MetricAttributes),
    removeMetrics: S.optional(MetricAttributesNamesList),
    metricsOutputConfig: S.optional(MetricAttributionOutput),
    metricAttributionArn: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateMetricAttributionRequest",
}) as any as S.Schema<UpdateMetricAttributionRequest>;
export interface UpdateMetricAttributionResponse {
  metricAttributionArn?: string;
}
export const UpdateMetricAttributionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ metricAttributionArn: S.optional(S.String) }),
).annotate({
  identifier: "UpdateMetricAttributionResponse",
}) as any as S.Schema<UpdateMetricAttributionResponse>;
export interface UpdateRecommenderRequest {
  recommenderArn: string;
  recommenderConfig: RecommenderConfig;
}
export const UpdateRecommenderRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    recommenderArn: S.String,
    recommenderConfig: RecommenderConfig,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateRecommenderRequest",
}) as any as S.Schema<UpdateRecommenderRequest>;
export interface UpdateRecommenderResponse {
  recommenderArn?: string;
}
export const UpdateRecommenderResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ recommenderArn: S.optional(S.String) }),
).annotate({
  identifier: "UpdateRecommenderResponse",
}) as any as S.Schema<UpdateRecommenderResponse>;
export interface UpdateSolutionRequest {
  solutionArn: string;
  performAutoTraining?: boolean;
  performIncrementalUpdate?: boolean;
  solutionUpdateConfig?: SolutionUpdateConfig;
}
export const UpdateSolutionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    solutionArn: S.String,
    performAutoTraining: S.optional(S.Boolean),
    performIncrementalUpdate: S.optional(S.Boolean),
    solutionUpdateConfig: S.optional(SolutionUpdateConfig),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateSolutionRequest",
}) as any as S.Schema<UpdateSolutionRequest>;
export interface UpdateSolutionResponse {
  solutionArn?: string;
}
export const UpdateSolutionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ solutionArn: S.optional(S.String) }),
).annotate({
  identifier: "UpdateSolutionResponse",
}) as any as S.Schema<UpdateSolutionResponse>;
export type ErrorMessage = string;
export type CreateBatchInferenceJobError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ResourceNotFoundException
  | TooManyTagsException
  | CommonErrors;
/**
 * Generates batch recommendations based on a list of items or users stored in Amazon S3
 * and exports the recommendations to an Amazon S3 bucket.
 *
 * To generate batch recommendations, specify the ARN of a solution version and an Amazon S3 URI for the input and output data.
 * For user personalization, popular items, and personalized ranking solutions, the batch inference job generates a list of
 * recommended items for each user ID in the input file. For related items solutions, the job generates a list of recommended
 * items for each item ID in the input file.
 *
 * For more information, see Creating a batch inference job
 * .
 *
 * If you use the Similar-Items recipe, Amazon Personalize can add descriptive themes to batch recommendations.
 * To generate themes, set the job's mode to
 * `THEME_GENERATION` and specify the name of the field that contains item names in the
 * input data.
 *
 * For more information about generating themes, see Batch recommendations with themes from Content Generator
 * .
 *
 * You can't get batch recommendations with the Trending-Now or Next-Best-Action recipes.
 */
export const createBatchInferenceJob: API.OperationMethod<
  CreateBatchInferenceJobRequest,
  CreateBatchInferenceJobResponse,
  CreateBatchInferenceJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateBatchInferenceJobRequest,
  output: CreateBatchInferenceJobResponse,
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ResourceNotFoundException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBatchInferenceJob",
}));

export type CreateBatchSegmentJobError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ResourceNotFoundException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates a batch segment job. The operation can handle up to 50 million records and the
 * input file must be in JSON format. For more information, see
 * Getting batch recommendations and user segments.
 */
export const createBatchSegmentJob: API.OperationMethod<
  CreateBatchSegmentJobRequest,
  CreateBatchSegmentJobResponse,
  CreateBatchSegmentJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateBatchSegmentJobRequest,
  output: CreateBatchSegmentJobResponse,
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ResourceNotFoundException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBatchSegmentJob",
}));

export type CreateCampaignError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ResourceNotFoundException
  | TooManyTagsException
  | CommonErrors;
/**
 * You incur campaign costs while it is active. To avoid unnecessary costs, make sure to delete the campaign when you are finished. For information about campaign
 * costs, see Amazon Personalize pricing.
 *
 * Creates a campaign that deploys a solution version. When a client calls the
 * GetRecommendations
 * and
 * GetPersonalizedRanking
 * APIs, a campaign is specified in the request.
 *
 * **Minimum Provisioned TPS and Auto-Scaling**
 *
 * A high `minProvisionedTPS` will increase your cost. We recommend starting with 1 for `minProvisionedTPS` (the default). Track
 * your usage using Amazon CloudWatch metrics, and increase the `minProvisionedTPS`
 * as necessary.
 *
 * When you create an Amazon Personalize campaign, you can specify the minimum provisioned transactions per second
 * (`minProvisionedTPS`) for the campaign. This is the baseline transaction throughput for the campaign provisioned by
 * Amazon Personalize. It sets the minimum billing charge for the campaign while it is active. A transaction is a single `GetRecommendations` or
 * `GetPersonalizedRanking` request. The default `minProvisionedTPS` is 1.
 *
 * If your TPS increases beyond the `minProvisionedTPS`, Amazon Personalize auto-scales the provisioned capacity up
 * and down, but never below `minProvisionedTPS`.
 * There's a short time delay while the capacity is increased
 * that might cause loss of transactions. When your traffic reduces, capacity returns to the `minProvisionedTPS`.
 *
 * You are charged for the
 * the minimum provisioned TPS or, if your requests exceed the `minProvisionedTPS`, the actual TPS.
 * The actual TPS is the total number of recommendation requests you make.
 * We recommend starting with a low `minProvisionedTPS`, track
 * your usage using Amazon CloudWatch metrics, and then increase the `minProvisionedTPS` as necessary.
 *
 * For more information about campaign costs, see Amazon Personalize pricing.
 *
 * **Status**
 *
 * A campaign can be in one of the following states:
 *
 * - CREATE PENDING > CREATE IN_PROGRESS > ACTIVE -or- CREATE FAILED
 *
 * - DELETE PENDING > DELETE IN_PROGRESS
 *
 * To get the campaign status, call DescribeCampaign.
 *
 * Wait until the `status` of the campaign
 * is `ACTIVE` before asking the campaign for recommendations.
 *
 * **Related APIs**
 *
 * - ListCampaigns
 *
 * - DescribeCampaign
 *
 * - UpdateCampaign
 *
 * - DeleteCampaign
 */
export const createCampaign: API.OperationMethod<
  CreateCampaignRequest,
  CreateCampaignResponse,
  CreateCampaignError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCampaignRequest,
  output: CreateCampaignResponse,
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ResourceNotFoundException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCampaign",
}));

export type CreateDataDeletionJobError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ResourceNotFoundException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates a batch job that deletes all
 * references to specific users from an Amazon Personalize dataset group in batches. You specify the users to delete in a CSV file of userIds in
 * an Amazon S3 bucket. After a job completes, Amazon Personalize no longer trains
 * on the users’ data and no longer considers the users when generating user segments.
 * For more information about creating a data deletion job, see Deleting users.
 *
 * - Your input file must be a CSV file with a single USER_ID column that lists the users IDs. For more information
 * about preparing the CSV file, see Preparing your data deletion file and uploading it to Amazon S3.
 *
 * - To give Amazon Personalize permission to access your input CSV file of userIds, you must specify an IAM service role that has permission to
 * read from the data source. This role
 * needs `GetObject` and `ListBucket` permissions for the bucket and its content.
 * These permissions are the same as importing data. For information on granting access to your Amazon S3
 * bucket, see Giving
 * Amazon Personalize Access to Amazon S3 Resources.
 *
 * After you create a job, it can take up to a day to delete all references to the users from datasets and models. Until the job completes,
 * Amazon Personalize continues to use the data when training. And if you use a User Segmentation recipe, the users might appear in user segments.
 *
 * **Status**
 *
 * A data deletion job can have one of the following statuses:
 *
 * - PENDING > IN_PROGRESS > COMPLETED -or- FAILED
 *
 * To get the status of the data deletion job, call DescribeDataDeletionJob API operation and specify the Amazon Resource Name
 * (ARN) of the job. If the status is FAILED, the response
 * includes a `failureReason` key, which describes why the job
 * failed.
 *
 * **Related APIs**
 *
 * - ListDataDeletionJobs
 *
 * - DescribeDataDeletionJob
 */
export const createDataDeletionJob: API.OperationMethod<
  CreateDataDeletionJobRequest,
  CreateDataDeletionJobResponse,
  CreateDataDeletionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDataDeletionJobRequest,
  output: CreateDataDeletionJobResponse,
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ResourceNotFoundException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataDeletionJob",
}));

export type CreateDatasetError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ResourceNotFoundException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates an empty dataset and adds it to the specified dataset group.
 * Use CreateDatasetImportJob to import your training data to a
 * dataset.
 *
 * There are 5 types of datasets:
 *
 * - Item interactions
 *
 * - Items
 *
 * - Users
 *
 * - Action interactions
 *
 * - Actions
 *
 * Each dataset type has an associated schema with required field types.
 * Only the `Item interactions` dataset is required in order to train a
 * model (also referred to as creating a solution).
 *
 * A dataset can be in one of the following states:
 *
 * - CREATE PENDING > CREATE IN_PROGRESS > ACTIVE -or- CREATE
 * FAILED
 *
 * - DELETE PENDING > DELETE IN_PROGRESS
 *
 * To get the status of the dataset, call DescribeDataset.
 *
 * **Related APIs**
 *
 * - CreateDatasetGroup
 *
 * - ListDatasets
 *
 * - DescribeDataset
 *
 * - DeleteDataset
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
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ResourceNotFoundException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataset",
}));

export type CreateDatasetExportJobError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ResourceNotFoundException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates a job that exports data from your dataset to an Amazon S3 bucket.
 * To allow Amazon Personalize to export the training data, you must specify an
 * service-linked IAM role that gives Amazon Personalize `PutObject`
 * permissions for your Amazon S3 bucket. For information, see Exporting a dataset in the Amazon Personalize developer guide.
 *
 * **Status**
 *
 * A dataset export job can be in one of the following states:
 *
 * - CREATE PENDING > CREATE IN_PROGRESS > ACTIVE -or- CREATE
 * FAILED
 *
 * To get the status of the export job, call DescribeDatasetExportJob, and specify the Amazon Resource Name
 * (ARN) of the dataset export job. The dataset export is complete when the
 * status shows as ACTIVE. If the status shows as CREATE FAILED, the response
 * includes a `failureReason` key, which describes why the job
 * failed.
 */
export const createDatasetExportJob: API.OperationMethod<
  CreateDatasetExportJobRequest,
  CreateDatasetExportJobResponse,
  CreateDatasetExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDatasetExportJobRequest,
  output: CreateDatasetExportJobResponse,
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ResourceNotFoundException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDatasetExportJob",
}));

export type CreateDatasetGroupError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates an empty dataset group. A dataset group is a container for
 * Amazon Personalize resources. A dataset group can contain at most three datasets, one
 * for each type of dataset:
 *
 * - Item interactions
 *
 * - Items
 *
 * - Users
 *
 * - Actions
 *
 * - Action interactions
 *
 * A dataset group can be a Domain dataset group, where you specify a
 * domain and use pre-configured resources like recommenders, or a
 * Custom dataset group, where you use custom resources, such as a solution
 * with a solution version, that you deploy with a campaign. If you start
 * with a Domain dataset group, you can still add custom resources such as
 * solutions and solution versions trained with recipes for custom use cases
 * and deployed with campaigns.
 *
 * A dataset group can be in one of the following states:
 *
 * - CREATE PENDING > CREATE IN_PROGRESS > ACTIVE -or- CREATE
 * FAILED
 *
 * - DELETE PENDING
 *
 * To get the status of the dataset group, call DescribeDatasetGroup. If the status shows as CREATE FAILED, the
 * response includes a `failureReason` key, which describes why
 * the creation failed.
 *
 * You must wait until the `status` of the dataset group is
 * `ACTIVE` before adding a dataset to the group.
 *
 * You can specify an Key Management Service (KMS) key to encrypt the datasets in
 * the group. If you specify a KMS key, you must also include an Identity and Access Management
 * (IAM) role that has permission to access the key.
 *
 * **APIs that require a dataset group ARN in the request**
 *
 * - CreateDataset
 *
 * - CreateEventTracker
 *
 * - CreateSolution
 *
 * **Related APIs**
 *
 * - ListDatasetGroups
 *
 * - DescribeDatasetGroup
 *
 * - DeleteDatasetGroup
 */
export const createDatasetGroup: API.OperationMethod<
  CreateDatasetGroupRequest,
  CreateDatasetGroupResponse,
  CreateDatasetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDatasetGroupRequest,
  output: CreateDatasetGroupResponse,
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDatasetGroup",
}));

export type CreateDatasetImportJobError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ResourceNotFoundException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates a job that imports training data from your data source (an
 * Amazon S3 bucket) to an Amazon Personalize dataset. To allow Amazon Personalize to import the
 * training data, you must specify an IAM service role that has permission to
 * read from the data source, as Amazon Personalize makes a copy of your data and
 * processes it internally. For information on granting access to your Amazon S3
 * bucket, see Giving
 * Amazon Personalize Access to Amazon S3 Resources.
 *
 * If you already created a recommender or deployed a custom solution version with a campaign, how new bulk records
 * influence recommendations depends on the domain use case or recipe that you use. For more information, see How new data influences
 * real-time recommendations.
 *
 * By default, a dataset import job replaces any existing data in the
 * dataset that you imported in bulk. To add new records without replacing
 * existing data, specify INCREMENTAL for the import mode in the
 * CreateDatasetImportJob operation.
 *
 * **Status**
 *
 * A dataset import job can be in one of the following states:
 *
 * - CREATE PENDING > CREATE IN_PROGRESS > ACTIVE -or- CREATE
 * FAILED
 *
 * To get the status of the import job, call DescribeDatasetImportJob, providing the Amazon Resource Name
 * (ARN) of the dataset import job. The dataset import is complete when the
 * status shows as ACTIVE. If the status shows as CREATE FAILED, the response
 * includes a `failureReason` key, which describes why the job
 * failed.
 *
 * Importing takes time. You must wait until the status shows as ACTIVE
 * before training a model using the dataset.
 *
 * **Related APIs**
 *
 * - ListDatasetImportJobs
 *
 * - DescribeDatasetImportJob
 */
export const createDatasetImportJob: API.OperationMethod<
  CreateDatasetImportJobRequest,
  CreateDatasetImportJobResponse,
  CreateDatasetImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDatasetImportJobRequest,
  output: CreateDatasetImportJobResponse,
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ResourceNotFoundException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDatasetImportJob",
}));

export type CreateEventTrackerError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ResourceNotFoundException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates an event tracker that you use when adding event data to a specified dataset
 * group using the
 * PutEvents API.
 *
 * Only one event tracker can be associated with a dataset group. You will get
 * an error if you call `CreateEventTracker` using the same dataset group as an
 * existing event tracker.
 *
 * When you create an event tracker, the response includes a tracking ID, which you pass as a parameter when you use the
 * PutEvents operation.
 * Amazon Personalize then appends the event data to the Item interactions dataset of the dataset group you specify
 * in your event tracker.
 *
 * The event tracker can be in one of the following states:
 *
 * - CREATE PENDING > CREATE IN_PROGRESS > ACTIVE -or- CREATE FAILED
 *
 * - DELETE PENDING > DELETE IN_PROGRESS
 *
 * To get the status of the event tracker, call DescribeEventTracker.
 *
 * The event tracker must be in the ACTIVE state before using the tracking ID.
 *
 * **Related APIs**
 *
 * - ListEventTrackers
 *
 * - DescribeEventTracker
 *
 * - DeleteEventTracker
 */
export const createEventTracker: API.OperationMethod<
  CreateEventTrackerRequest,
  CreateEventTrackerResponse,
  CreateEventTrackerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateEventTrackerRequest,
  output: CreateEventTrackerResponse,
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ResourceNotFoundException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEventTracker",
}));

export type CreateFilterError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates a recommendation filter. For more information, see Filtering recommendations and user segments.
 */
export const createFilter: API.OperationMethod<
  CreateFilterRequest,
  CreateFilterResponse,
  CreateFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateFilterRequest,
  output: CreateFilterResponse,
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFilter",
}));

export type CreateMetricAttributionError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a metric attribution.
 * A metric attribution creates reports on the data that you import into Amazon Personalize. Depending on how you imported the data, you can view reports in Amazon CloudWatch or Amazon S3.
 * For more information, see Measuring impact of recommendations.
 */
export const createMetricAttribution: API.OperationMethod<
  CreateMetricAttributionRequest,
  CreateMetricAttributionResponse,
  CreateMetricAttributionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateMetricAttributionRequest,
  output: CreateMetricAttributionResponse,
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMetricAttribution",
}));

export type CreateRecommenderError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ResourceNotFoundException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates a recommender with the recipe (a Domain dataset group use case) you specify.
 * You create recommenders for a Domain dataset group and specify the recommender's Amazon Resource Name (ARN) when you make a
 * GetRecommendations
 * request.
 *
 * **Minimum recommendation requests per second**
 *
 * A high `minRecommendationRequestsPerSecond` will increase your bill. We recommend starting with 1 for `minRecommendationRequestsPerSecond` (the default). Track
 * your usage using Amazon CloudWatch metrics, and increase the `minRecommendationRequestsPerSecond`
 * as necessary.
 *
 * When you create a recommender, you can configure the recommender's minimum recommendation requests per second. The minimum recommendation requests per second
 * (`minRecommendationRequestsPerSecond`) specifies the baseline recommendation request throughput provisioned by
 * Amazon Personalize. The default minRecommendationRequestsPerSecond is `1`. A recommendation request is a single `GetRecommendations` operation.
 * Request throughput is measured in requests per second and Amazon Personalize uses your requests per second to derive
 * your requests per hour and the price of your recommender usage.
 *
 * If your requests per second increases beyond
 * `minRecommendationRequestsPerSecond`, Amazon Personalize auto-scales the provisioned capacity up and down,
 * but never below `minRecommendationRequestsPerSecond`.
 * There's a short time delay while the capacity is increased that might cause loss of
 * requests.
 *
 * Your bill is the greater of either the minimum requests per hour (based on minRecommendationRequestsPerSecond)
 * or the actual number of requests. The actual request throughput used is calculated as the average requests/second within a one-hour window.
 *
 * We recommend starting with the default `minRecommendationRequestsPerSecond`, track
 * your usage using Amazon CloudWatch metrics, and then increase the `minRecommendationRequestsPerSecond`
 * as necessary.
 *
 * **Status**
 *
 * A recommender can be in one of the following states:
 *
 * - CREATE PENDING > CREATE IN_PROGRESS > ACTIVE -or- CREATE FAILED
 *
 * - STOP PENDING > STOP IN_PROGRESS > INACTIVE > START PENDING > START IN_PROGRESS > ACTIVE
 *
 * - DELETE PENDING > DELETE IN_PROGRESS
 *
 * To get the recommender status, call DescribeRecommender.
 *
 * Wait until the `status` of the recommender
 * is `ACTIVE` before asking the recommender for recommendations.
 *
 * **Related APIs**
 *
 * - ListRecommenders
 *
 * - DescribeRecommender
 *
 * - UpdateRecommender
 *
 * - DeleteRecommender
 */
export const createRecommender: API.OperationMethod<
  CreateRecommenderRequest,
  CreateRecommenderResponse,
  CreateRecommenderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRecommenderRequest,
  output: CreateRecommenderResponse,
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ResourceNotFoundException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRecommender",
}));

export type CreateSchemaError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | CommonErrors;
/**
 * Creates an Amazon Personalize schema from the specified schema string. The schema you create
 * must be in Avro JSON format.
 *
 * Amazon Personalize recognizes three schema variants. Each schema is associated with a dataset
 * type and has a set of required field and keywords. If you are creating a schema for a dataset in a Domain dataset group, you
 * provide the domain of the Domain dataset group.
 * You specify a schema when you call CreateDataset.
 *
 * **Related APIs**
 *
 * - ListSchemas
 *
 * - DescribeSchema
 *
 * - DeleteSchema
 */
export const createSchema: API.OperationMethod<
  CreateSchemaRequest,
  CreateSchemaResponse,
  CreateSchemaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSchemaRequest,
  output: CreateSchemaResponse,
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSchema",
}));

export type CreateSolutionError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ResourceNotFoundException
  | TooManyTagsException
  | CommonErrors;
/**
 * By default, all new solutions use automatic training. With automatic training, you incur training costs while
 * your solution is active. To avoid unnecessary costs, when you are finished you can
 * update the solution to turn off automatic training.
 * For information about training
 * costs, see Amazon Personalize pricing.
 *
 * Creates the configuration for training a model (creating a solution version). This configuration
 * includes the recipe to use for model training and optional training configuration, such as columns to use
 * in training and feature transformation parameters. For more information about configuring a solution, see Creating and configuring a solution.
 *
 * By default, new solutions use automatic training to create solution versions every 7 days. You can change the training frequency.
 * Automatic solution version creation starts within one hour after the solution is ACTIVE. If you manually create a solution version within
 * the hour, the solution skips the first automatic training. For more information,
 * see Configuring automatic training.
 *
 * To turn off automatic training, set `performAutoTraining` to false. If you turn off automatic training, you must manually create a solution version
 * by calling the CreateSolutionVersion operation.
 *
 * After training starts, you can
 * get the solution version's Amazon Resource Name (ARN) with the ListSolutionVersions API operation.
 * To get its status, use the DescribeSolutionVersion.
 *
 * After training completes you can evaluate model accuracy by calling
 * GetSolutionMetrics. When you are satisfied with the solution version, you
 * deploy it using CreateCampaign. The campaign provides recommendations
 * to a client through the
 * GetRecommendations API.
 *
 * Amazon Personalize doesn't support configuring the `hpoObjective`
 * for solution hyperparameter optimization at this time.
 *
 * **Status**
 *
 * A solution can be in one of the following states:
 *
 * - CREATE PENDING > CREATE IN_PROGRESS > ACTIVE -or- CREATE FAILED
 *
 * - DELETE PENDING > DELETE IN_PROGRESS
 *
 * To get the status of the solution, call DescribeSolution. If you use
 * manual training, the status must be ACTIVE before you call `CreateSolutionVersion`.
 *
 * **Related APIs**
 *
 * - UpdateSolution
 *
 * - ListSolutions
 *
 * - CreateSolutionVersion
 *
 * - DescribeSolution
 *
 * - DeleteSolution
 *
 * - ListSolutionVersions
 *
 * - DescribeSolutionVersion
 */
export const createSolution: API.OperationMethod<
  CreateSolutionRequest,
  CreateSolutionResponse,
  CreateSolutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSolutionRequest,
  output: CreateSolutionResponse,
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ResourceNotFoundException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSolution",
}));

export type CreateSolutionVersionError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ResourceNotFoundException
  | TooManyTagsException
  | CommonErrors;
/**
 * Trains or retrains an active solution in a Custom dataset group. A solution is created using the CreateSolution
 * operation and must be in the ACTIVE state before calling
 * `CreateSolutionVersion`. A new version of the solution is created every time you
 * call this operation.
 *
 * **Status**
 *
 * A solution version can be in one of the following states:
 *
 * - CREATE PENDING
 *
 * - CREATE IN_PROGRESS
 *
 * - ACTIVE
 *
 * - CREATE FAILED
 *
 * - CREATE STOPPING
 *
 * - CREATE STOPPED
 *
 * To get the status of the version, call DescribeSolutionVersion. Wait
 * until the status shows as ACTIVE before calling `CreateCampaign`.
 *
 * If the status shows as CREATE FAILED, the response includes a `failureReason`
 * key, which describes why the job failed.
 *
 * **Related APIs**
 *
 * - ListSolutionVersions
 *
 * - DescribeSolutionVersion
 *
 * - ListSolutions
 *
 * - CreateSolution
 *
 * - DescribeSolution
 *
 * - DeleteSolution
 */
export const createSolutionVersion: API.OperationMethod<
  CreateSolutionVersionRequest,
  CreateSolutionVersionResponse,
  CreateSolutionVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSolutionVersionRequest,
  output: CreateSolutionVersionResponse,
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ResourceNotFoundException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSolutionVersion",
}));

export type DeleteCampaignError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Removes a campaign by deleting the solution deployment. The solution that
 * the campaign is based on is not deleted and can be redeployed when needed. A deleted campaign can no
 * longer be specified in a
 * GetRecommendations
 * request.
 * For information on creating campaigns, see CreateCampaign.
 */
export const deleteCampaign: API.OperationMethod<
  DeleteCampaignRequest,
  DeleteCampaignResponse,
  DeleteCampaignError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCampaignRequest,
  output: DeleteCampaignResponse,
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCampaign",
}));

export type DeleteDatasetError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a dataset. You can't delete a dataset if an associated
 * `DatasetImportJob` or `SolutionVersion` is in the
 * CREATE PENDING or IN PROGRESS state. For more information about deleting datasets,
 * see Deleting a dataset.
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
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataset",
}));

export type DeleteDatasetGroupError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a dataset group. Before you delete a dataset group, you must
 * delete the following:
 *
 * - All associated event trackers.
 *
 * - All associated solutions.
 *
 * - All datasets in the dataset group.
 */
export const deleteDatasetGroup: API.OperationMethod<
  DeleteDatasetGroupRequest,
  DeleteDatasetGroupResponse,
  DeleteDatasetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDatasetGroupRequest,
  output: DeleteDatasetGroupResponse,
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDatasetGroup",
}));

export type DeleteEventTrackerError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the event tracker. Does not delete the dataset from
 * the dataset group. For more
 * information on event trackers, see CreateEventTracker.
 */
export const deleteEventTracker: API.OperationMethod<
  DeleteEventTrackerRequest,
  DeleteEventTrackerResponse,
  DeleteEventTrackerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEventTrackerRequest,
  output: DeleteEventTrackerResponse,
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEventTracker",
}));

export type DeleteFilterError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a filter.
 */
export const deleteFilter: API.OperationMethod<
  DeleteFilterRequest,
  DeleteFilterResponse,
  DeleteFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteFilterRequest,
  output: DeleteFilterResponse,
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFilter",
}));

export type DeleteMetricAttributionError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a metric attribution.
 */
export const deleteMetricAttribution: API.OperationMethod<
  DeleteMetricAttributionRequest,
  DeleteMetricAttributionResponse,
  DeleteMetricAttributionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteMetricAttributionRequest,
  output: DeleteMetricAttributionResponse,
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMetricAttribution",
}));

export type DeleteRecommenderError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deactivates and removes a recommender. A deleted recommender can no longer be specified in a GetRecommendations
 * request.
 */
export const deleteRecommender: API.OperationMethod<
  DeleteRecommenderRequest,
  DeleteRecommenderResponse,
  DeleteRecommenderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRecommenderRequest,
  output: DeleteRecommenderResponse,
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRecommender",
}));

export type DeleteSchemaError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a schema. Before deleting a schema, you must delete all
 * datasets referencing the schema. For more information on schemas, see
 * CreateSchema.
 */
export const deleteSchema: API.OperationMethod<
  DeleteSchemaRequest,
  DeleteSchemaResponse,
  DeleteSchemaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSchemaRequest,
  output: DeleteSchemaResponse,
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSchema",
}));

export type DeleteSolutionError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes all versions of a solution and the `Solution` object itself.
 * Before deleting a solution, you must delete all campaigns based on
 * the solution. To determine what campaigns are using the solution, call
 * ListCampaigns and supply the Amazon Resource Name (ARN) of the solution.
 * You can't delete a solution if an associated `SolutionVersion` is in the
 * CREATE PENDING or IN PROGRESS state.
 * For more information on solutions, see CreateSolution.
 */
export const deleteSolution: API.OperationMethod<
  DeleteSolutionRequest,
  DeleteSolutionResponse,
  DeleteSolutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSolutionRequest,
  output: DeleteSolutionResponse,
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSolution",
}));

export type DescribeAlgorithmError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes the given algorithm.
 */
export const describeAlgorithm: API.OperationMethod<
  DescribeAlgorithmRequest,
  DescribeAlgorithmResponse,
  DescribeAlgorithmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeAlgorithmRequest,
  output: DescribeAlgorithmResponse,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAlgorithm",
}));

export type DescribeBatchInferenceJobError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets the properties of a batch inference job including name, Amazon Resource Name (ARN),
 * status, input and output configurations, and the ARN of the solution version used to generate
 * the recommendations.
 */
export const describeBatchInferenceJob: API.OperationMethod<
  DescribeBatchInferenceJobRequest,
  DescribeBatchInferenceJobResponse,
  DescribeBatchInferenceJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeBatchInferenceJobRequest,
  output: DescribeBatchInferenceJobResponse,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBatchInferenceJob",
}));

export type DescribeBatchSegmentJobError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets the properties of a batch segment job including name, Amazon Resource Name (ARN),
 * status, input and output configurations, and the ARN of the solution version used to generate
 * segments.
 */
export const describeBatchSegmentJob: API.OperationMethod<
  DescribeBatchSegmentJobRequest,
  DescribeBatchSegmentJobResponse,
  DescribeBatchSegmentJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeBatchSegmentJobRequest,
  output: DescribeBatchSegmentJobResponse,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBatchSegmentJob",
}));

export type DescribeCampaignError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes the given campaign, including its status.
 *
 * A campaign can be in one of the following states:
 *
 * - CREATE PENDING > CREATE IN_PROGRESS > ACTIVE -or- CREATE FAILED
 *
 * - DELETE PENDING > DELETE IN_PROGRESS
 *
 * When the `status` is `CREATE FAILED`, the response includes the
 * `failureReason` key, which describes why.
 *
 * For more information on campaigns, see CreateCampaign.
 */
export const describeCampaign: API.OperationMethod<
  DescribeCampaignRequest,
  DescribeCampaignResponse,
  DescribeCampaignError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeCampaignRequest,
  output: DescribeCampaignResponse,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCampaign",
}));

export type DescribeDataDeletionJobError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes the data deletion job created by CreateDataDeletionJob, including the job status.
 */
export const describeDataDeletionJob: API.OperationMethod<
  DescribeDataDeletionJobRequest,
  DescribeDataDeletionJobResponse,
  DescribeDataDeletionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeDataDeletionJobRequest,
  output: DescribeDataDeletionJobResponse,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDataDeletionJob",
}));

export type DescribeDatasetError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes the given dataset. For more information on datasets, see
 * CreateDataset.
 */
export const describeDataset: API.OperationMethod<
  DescribeDatasetRequest,
  DescribeDatasetResponse,
  DescribeDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeDatasetRequest,
  output: DescribeDatasetResponse,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDataset",
}));

export type DescribeDatasetExportJobError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes the dataset export job created by CreateDatasetExportJob, including the export job status.
 */
export const describeDatasetExportJob: API.OperationMethod<
  DescribeDatasetExportJobRequest,
  DescribeDatasetExportJobResponse,
  DescribeDatasetExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeDatasetExportJobRequest,
  output: DescribeDatasetExportJobResponse,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDatasetExportJob",
}));

export type DescribeDatasetGroupError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes the given dataset group. For more information on dataset
 * groups, see CreateDatasetGroup.
 */
export const describeDatasetGroup: API.OperationMethod<
  DescribeDatasetGroupRequest,
  DescribeDatasetGroupResponse,
  DescribeDatasetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeDatasetGroupRequest,
  output: DescribeDatasetGroupResponse,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDatasetGroup",
}));

export type DescribeDatasetImportJobError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes the dataset import job created by CreateDatasetImportJob, including the import job status.
 */
export const describeDatasetImportJob: API.OperationMethod<
  DescribeDatasetImportJobRequest,
  DescribeDatasetImportJobResponse,
  DescribeDatasetImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeDatasetImportJobRequest,
  output: DescribeDatasetImportJobResponse,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDatasetImportJob",
}));

export type DescribeEventTrackerError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes an event tracker. The response includes the `trackingId` and
 * `status` of the event tracker.
 * For more information on event trackers, see CreateEventTracker.
 */
export const describeEventTracker: API.OperationMethod<
  DescribeEventTrackerRequest,
  DescribeEventTrackerResponse,
  DescribeEventTrackerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeEventTrackerRequest,
  output: DescribeEventTrackerResponse,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEventTracker",
}));

export type DescribeFeatureTransformationError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes the given feature transformation.
 */
export const describeFeatureTransformation: API.OperationMethod<
  DescribeFeatureTransformationRequest,
  DescribeFeatureTransformationResponse,
  DescribeFeatureTransformationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeFeatureTransformationRequest,
  output: DescribeFeatureTransformationResponse,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFeatureTransformation",
}));

export type DescribeFilterError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes a filter's properties.
 */
export const describeFilter: API.OperationMethod<
  DescribeFilterRequest,
  DescribeFilterResponse,
  DescribeFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeFilterRequest,
  output: DescribeFilterResponse,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFilter",
}));

export type DescribeMetricAttributionError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes a metric attribution.
 */
export const describeMetricAttribution: API.OperationMethod<
  DescribeMetricAttributionRequest,
  DescribeMetricAttributionResponse,
  DescribeMetricAttributionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeMetricAttributionRequest,
  output: DescribeMetricAttributionResponse,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMetricAttribution",
}));

export type DescribeRecipeError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes a recipe.
 *
 * A recipe contains three items:
 *
 * - An algorithm that trains a model.
 *
 * - Hyperparameters that govern the training.
 *
 * - Feature transformation information for modifying the input data before training.
 *
 * Amazon Personalize provides a set of predefined recipes. You specify a recipe when you create a
 * solution with the CreateSolution API.
 * `CreateSolution` trains a model by using the algorithm
 * in the specified recipe and a training dataset. The solution, when deployed as a campaign,
 * can provide recommendations using the
 * GetRecommendations API.
 */
export const describeRecipe: API.OperationMethod<
  DescribeRecipeRequest,
  DescribeRecipeResponse,
  DescribeRecipeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeRecipeRequest,
  output: DescribeRecipeResponse,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRecipe",
}));

export type DescribeRecommenderError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes the given recommender, including its status.
 *
 * A recommender can be in one of the following states:
 *
 * - CREATE PENDING > CREATE IN_PROGRESS > ACTIVE -or- CREATE FAILED
 *
 * - STOP PENDING > STOP IN_PROGRESS > INACTIVE > START PENDING > START IN_PROGRESS > ACTIVE
 *
 * - DELETE PENDING > DELETE IN_PROGRESS
 *
 * When the `status` is `CREATE FAILED`, the response includes the
 * `failureReason` key, which describes why.
 *
 * The `modelMetrics` key is null when
 * the recommender is being created or deleted.
 *
 * For more information on recommenders, see CreateRecommender.
 */
export const describeRecommender: API.OperationMethod<
  DescribeRecommenderRequest,
  DescribeRecommenderResponse,
  DescribeRecommenderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeRecommenderRequest,
  output: DescribeRecommenderResponse,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRecommender",
}));

export type DescribeSchemaError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes a schema. For more information on schemas, see
 * CreateSchema.
 */
export const describeSchema: API.OperationMethod<
  DescribeSchemaRequest,
  DescribeSchemaResponse,
  DescribeSchemaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeSchemaRequest,
  output: DescribeSchemaResponse,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSchema",
}));

export type DescribeSolutionError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes a solution.
 * For more information on solutions, see CreateSolution.
 */
export const describeSolution: API.OperationMethod<
  DescribeSolutionRequest,
  DescribeSolutionResponse,
  DescribeSolutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeSolutionRequest,
  output: DescribeSolutionResponse,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSolution",
}));

export type DescribeSolutionVersionError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes a specific version of a solution. For more information on solutions, see CreateSolution
 */
export const describeSolutionVersion: API.OperationMethod<
  DescribeSolutionVersionRequest,
  DescribeSolutionVersionResponse,
  DescribeSolutionVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeSolutionVersionRequest,
  output: DescribeSolutionVersionResponse,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSolutionVersion",
}));

export type GetSolutionMetricsError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets the metrics for the specified solution version.
 */
export const getSolutionMetrics: API.OperationMethod<
  GetSolutionMetricsRequest,
  GetSolutionMetricsResponse,
  GetSolutionMetricsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSolutionMetricsRequest,
  output: GetSolutionMetricsResponse,
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSolutionMetrics",
}));

export type ListBatchInferenceJobsError =
  | InvalidInputException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Gets a list of the batch inference jobs that have been performed off of a solution
 * version.
 */
export const listBatchInferenceJobs: API.PaginatedOperationMethod<
  ListBatchInferenceJobsRequest,
  ListBatchInferenceJobsResponse,
  ListBatchInferenceJobsError,
  Credentials | HttpClient.HttpClient,
  BatchInferenceJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListBatchInferenceJobsRequest,
  output: ListBatchInferenceJobsResponse,
  errors: [InvalidInputException, InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBatchInferenceJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "batchInferenceJobs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBatchSegmentJobsError =
  | InvalidInputException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Gets a list of the batch segment jobs that have been performed off of a solution
 * version that you specify.
 */
export const listBatchSegmentJobs: API.PaginatedOperationMethod<
  ListBatchSegmentJobsRequest,
  ListBatchSegmentJobsResponse,
  ListBatchSegmentJobsError,
  Credentials | HttpClient.HttpClient,
  BatchSegmentJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListBatchSegmentJobsRequest,
  output: ListBatchSegmentJobsResponse,
  errors: [InvalidInputException, InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBatchSegmentJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "batchSegmentJobs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCampaignsError =
  | InvalidInputException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Returns a list of campaigns that use the given solution.
 * When a solution is not specified, all the campaigns associated with the account are listed.
 * The response provides the properties for each campaign, including the Amazon Resource Name (ARN).
 * For more information on campaigns, see CreateCampaign.
 */
export const listCampaigns: API.PaginatedOperationMethod<
  ListCampaignsRequest,
  ListCampaignsResponse,
  ListCampaignsError,
  Credentials | HttpClient.HttpClient,
  CampaignSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCampaignsRequest,
  output: ListCampaignsResponse,
  errors: [InvalidInputException, InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCampaigns",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "campaigns",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDataDeletionJobsError =
  | InvalidInputException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Returns a list of data deletion jobs for a dataset group ordered by creation time,
 * with the most recent first.
 * When
 * a dataset group is not specified, all the data deletion jobs associated with
 * the account are listed. The response provides the properties for each
 * job, including the Amazon Resource Name (ARN). For more
 * information on data deletion jobs, see Deleting users.
 */
export const listDataDeletionJobs: API.OperationMethod<
  ListDataDeletionJobsRequest,
  ListDataDeletionJobsResponse,
  ListDataDeletionJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListDataDeletionJobsRequest,
  output: ListDataDeletionJobsResponse,
  errors: [InvalidInputException, InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataDeletionJobs",
}));

export type ListDatasetExportJobsError =
  | InvalidInputException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Returns a list of dataset export jobs that use the given dataset. When
 * a dataset is not specified, all the dataset export jobs associated with
 * the account are listed. The response provides the properties for each
 * dataset export job, including the Amazon Resource Name (ARN). For more
 * information on dataset export jobs, see CreateDatasetExportJob. For more information on datasets, see
 * CreateDataset.
 */
export const listDatasetExportJobs: API.PaginatedOperationMethod<
  ListDatasetExportJobsRequest,
  ListDatasetExportJobsResponse,
  ListDatasetExportJobsError,
  Credentials | HttpClient.HttpClient,
  DatasetExportJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDatasetExportJobsRequest,
  output: ListDatasetExportJobsResponse,
  errors: [InvalidInputException, InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDatasetExportJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "datasetExportJobs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDatasetGroupsError = InvalidNextTokenException | CommonErrors;
/**
 * Returns a list of dataset groups. The response provides the properties
 * for each dataset group, including the Amazon Resource Name (ARN). For more
 * information on dataset groups, see CreateDatasetGroup.
 */
export const listDatasetGroups: API.PaginatedOperationMethod<
  ListDatasetGroupsRequest,
  ListDatasetGroupsResponse,
  ListDatasetGroupsError,
  Credentials | HttpClient.HttpClient,
  DatasetGroupSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDatasetGroupsRequest,
  output: ListDatasetGroupsResponse,
  errors: [InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDatasetGroups",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "datasetGroups",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDatasetImportJobsError =
  | InvalidInputException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Returns a list of dataset import jobs that use the given dataset. When
 * a dataset is not specified, all the dataset import jobs associated with
 * the account are listed. The response provides the properties for each
 * dataset import job, including the Amazon Resource Name (ARN). For more
 * information on dataset import jobs, see CreateDatasetImportJob. For more information on datasets, see
 * CreateDataset.
 */
export const listDatasetImportJobs: API.PaginatedOperationMethod<
  ListDatasetImportJobsRequest,
  ListDatasetImportJobsResponse,
  ListDatasetImportJobsError,
  Credentials | HttpClient.HttpClient,
  DatasetImportJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDatasetImportJobsRequest,
  output: ListDatasetImportJobsResponse,
  errors: [InvalidInputException, InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDatasetImportJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "datasetImportJobs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDatasetsError =
  | InvalidInputException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Returns the list of datasets contained in the given dataset group. The
 * response provides the properties for each dataset, including the Amazon
 * Resource Name (ARN). For more information on datasets, see CreateDataset.
 */
export const listDatasets: API.PaginatedOperationMethod<
  ListDatasetsRequest,
  ListDatasetsResponse,
  ListDatasetsError,
  Credentials | HttpClient.HttpClient,
  DatasetSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDatasetsRequest,
  output: ListDatasetsResponse,
  errors: [InvalidInputException, InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDatasets",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "datasets",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEventTrackersError =
  | InvalidInputException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Returns the list of event trackers associated with the account.
 * The response provides the properties for each event tracker, including the Amazon Resource
 * Name (ARN) and tracking ID. For more
 * information on event trackers, see CreateEventTracker.
 */
export const listEventTrackers: API.PaginatedOperationMethod<
  ListEventTrackersRequest,
  ListEventTrackersResponse,
  ListEventTrackersError,
  Credentials | HttpClient.HttpClient,
  EventTrackerSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEventTrackersRequest,
  output: ListEventTrackersResponse,
  errors: [InvalidInputException, InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEventTrackers",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "eventTrackers",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFiltersError =
  | InvalidInputException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Lists all filters that belong to a given dataset group.
 */
export const listFilters: API.PaginatedOperationMethod<
  ListFiltersRequest,
  ListFiltersResponse,
  ListFiltersError,
  Credentials | HttpClient.HttpClient,
  FilterSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListFiltersRequest,
  output: ListFiltersResponse,
  errors: [InvalidInputException, InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFilters",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "Filters",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMetricAttributionMetricsError =
  | InvalidInputException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Lists the metrics for the metric attribution.
 */
export const listMetricAttributionMetrics: API.PaginatedOperationMethod<
  ListMetricAttributionMetricsRequest,
  ListMetricAttributionMetricsResponse,
  ListMetricAttributionMetricsError,
  Credentials | HttpClient.HttpClient,
  MetricAttribute
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMetricAttributionMetricsRequest,
  output: ListMetricAttributionMetricsResponse,
  errors: [InvalidInputException, InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMetricAttributionMetrics",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "metrics",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMetricAttributionsError =
  | InvalidInputException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Lists metric attributions.
 */
export const listMetricAttributions: API.PaginatedOperationMethod<
  ListMetricAttributionsRequest,
  ListMetricAttributionsResponse,
  ListMetricAttributionsError,
  Credentials | HttpClient.HttpClient,
  MetricAttributionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMetricAttributionsRequest,
  output: ListMetricAttributionsResponse,
  errors: [InvalidInputException, InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMetricAttributions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "metricAttributions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRecipesError =
  | InvalidInputException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Returns a list of available recipes. The response provides the properties
 * for each recipe, including the recipe's Amazon Resource Name (ARN).
 */
export const listRecipes: API.PaginatedOperationMethod<
  ListRecipesRequest,
  ListRecipesResponse,
  ListRecipesError,
  Credentials | HttpClient.HttpClient,
  RecipeSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRecipesRequest,
  output: ListRecipesResponse,
  errors: [InvalidInputException, InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecipes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "recipes",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRecommendersError =
  | InvalidInputException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Returns a list of recommenders in a given Domain dataset group.
 * When a Domain dataset group is not specified, all the recommenders associated with the account are listed.
 * The response provides the properties for each recommender, including the Amazon Resource Name (ARN).
 * For more information on recommenders, see CreateRecommender.
 */
export const listRecommenders: API.PaginatedOperationMethod<
  ListRecommendersRequest,
  ListRecommendersResponse,
  ListRecommendersError,
  Credentials | HttpClient.HttpClient,
  RecommenderSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRecommendersRequest,
  output: ListRecommendersResponse,
  errors: [InvalidInputException, InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecommenders",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "recommenders",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSchemasError = InvalidNextTokenException | CommonErrors;
/**
 * Returns the list of schemas associated with the account. The response provides the
 * properties for each schema, including the Amazon Resource Name (ARN).
 * For more information on schemas, see CreateSchema.
 */
export const listSchemas: API.PaginatedOperationMethod<
  ListSchemasRequest,
  ListSchemasResponse,
  ListSchemasError,
  Credentials | HttpClient.HttpClient,
  DatasetSchemaSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSchemasRequest,
  output: ListSchemasResponse,
  errors: [InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSchemas",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "schemas",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSolutionsError =
  | InvalidInputException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Returns a list of solutions in a given dataset group.
 * When a dataset group is not specified, all the solutions associated with the account are listed.
 * The response provides the properties for each solution, including the Amazon Resource Name (ARN).
 * For more information on solutions, see CreateSolution.
 */
export const listSolutions: API.PaginatedOperationMethod<
  ListSolutionsRequest,
  ListSolutionsResponse,
  ListSolutionsError,
  Credentials | HttpClient.HttpClient,
  SolutionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSolutionsRequest,
  output: ListSolutionsResponse,
  errors: [InvalidInputException, InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSolutions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "solutions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSolutionVersionsError =
  | InvalidInputException
  | InvalidNextTokenException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a list of solution versions for the given solution. When a solution is not
 * specified, all the solution versions associated with the account are listed. The response
 * provides the properties for each solution version, including the Amazon Resource Name (ARN).
 */
export const listSolutionVersions: API.PaginatedOperationMethod<
  ListSolutionVersionsRequest,
  ListSolutionVersionsResponse,
  ListSolutionVersionsError,
  Credentials | HttpClient.HttpClient,
  SolutionVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSolutionVersionsRequest,
  output: ListSolutionVersionsResponse,
  errors: [
    InvalidInputException,
    InvalidNextTokenException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSolutionVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "solutionVersions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Get a list of tags attached to a resource.
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
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type StartRecommenderError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Starts a recommender that is INACTIVE. Starting a recommender does not
 * create any new models, but resumes billing and automatic retraining for the recommender.
 */
export const startRecommender: API.OperationMethod<
  StartRecommenderRequest,
  StartRecommenderResponse,
  StartRecommenderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartRecommenderRequest,
  output: StartRecommenderResponse,
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartRecommender",
}));

export type StopRecommenderError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Stops a recommender that is ACTIVE. Stopping a recommender halts billing and automatic retraining for the recommender.
 */
export const stopRecommender: API.OperationMethod<
  StopRecommenderRequest,
  StopRecommenderResponse,
  StopRecommenderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopRecommenderRequest,
  output: StopRecommenderResponse,
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopRecommender",
}));

export type StopSolutionVersionCreationError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Stops creating a solution version that is in a state of CREATE_PENDING or CREATE IN_PROGRESS.
 *
 * Depending on the current state of the solution version, the solution version state changes as follows:
 *
 * - CREATE_PENDING > CREATE_STOPPED
 *
 * or
 *
 * - CREATE_IN_PROGRESS > CREATE_STOPPING > CREATE_STOPPED
 *
 * You are billed for all of the training completed up
 * until you stop the solution version creation. You cannot resume creating a solution version once it has been stopped.
 */
export const stopSolutionVersionCreation: API.OperationMethod<
  StopSolutionVersionCreationRequest,
  StopSolutionVersionCreationResponse,
  StopSolutionVersionCreationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopSolutionVersionCreationRequest,
  output: StopSolutionVersionCreationResponse,
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopSolutionVersionCreation",
}));

export type TagResourceError =
  | InvalidInputException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | TooManyTagsException
  | CommonErrors;
/**
 * Add a list of tags to a resource.
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
    InvalidInputException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | TooManyTagKeysException
  | CommonErrors;
/**
 * Removes the specified tags that are attached to a resource. For more information, see Removing tags from Amazon Personalize resources.
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
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
    TooManyTagKeysException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateCampaignError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates a campaign to deploy a retrained solution version with an existing campaign, change your campaign's `minProvisionedTPS`,
 * or modify your campaign's configuration. For example, you can set `enableMetadataWithRecommendations` to true for an existing campaign.
 *
 * To update a campaign to start automatically using the latest solution version, specify the following:
 *
 * - For the `SolutionVersionArn` parameter, specify the Amazon Resource Name (ARN) of your solution in
 * `SolutionArn/$LATEST` format.
 *
 * - In the `campaignConfig`, set `syncWithLatestSolutionVersion` to `true`.
 *
 * To update a campaign, the campaign status must be ACTIVE or CREATE FAILED.
 * Check the campaign status using the DescribeCampaign operation.
 *
 * You can still get recommendations from a campaign while an update is in progress.
 * The campaign will use the previous solution version and campaign configuration to generate recommendations until the latest campaign update status is `Active`.
 *
 * For more information about updating a campaign, including code samples, see Updating a campaign.
 * For more information about campaigns, see Creating a campaign.
 */
export const updateCampaign: API.OperationMethod<
  UpdateCampaignRequest,
  UpdateCampaignResponse,
  UpdateCampaignError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCampaignRequest,
  output: UpdateCampaignResponse,
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCampaign",
}));

export type UpdateDatasetError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Update a dataset to replace its schema with a new or existing one. For more information, see Replacing a dataset's schema.
 */
export const updateDataset: API.OperationMethod<
  UpdateDatasetRequest,
  UpdateDatasetResponse,
  UpdateDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDatasetRequest,
  output: UpdateDatasetResponse,
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataset",
}));

export type UpdateMetricAttributionError =
  | InvalidInputException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates a metric attribution.
 */
export const updateMetricAttribution: API.OperationMethod<
  UpdateMetricAttributionRequest,
  UpdateMetricAttributionResponse,
  UpdateMetricAttributionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateMetricAttributionRequest,
  output: UpdateMetricAttributionResponse,
  errors: [
    InvalidInputException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMetricAttribution",
}));

export type UpdateRecommenderError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates the recommender to modify the recommender configuration.
 * If you update the recommender to modify the columns used in training, Amazon Personalize automatically starts a full retraining of
 * the models backing your recommender. While the update completes, you can still get recommendations from the recommender. The recommender
 * uses the previous configuration until the update completes.
 * To track the status of this update,
 * use the `latestRecommenderUpdate` returned in the DescribeRecommender
 * operation.
 */
export const updateRecommender: API.OperationMethod<
  UpdateRecommenderRequest,
  UpdateRecommenderResponse,
  UpdateRecommenderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRecommenderRequest,
  output: UpdateRecommenderResponse,
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRecommender",
}));

export type UpdateSolutionError =
  | InvalidInputException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates an Amazon Personalize solution to use a different automatic training configuration. When you update a solution,
 * you can change whether the solution uses
 * automatic training, and you can change the training frequency. For more information about updating a solution, see
 * Updating a solution.
 *
 * A solution update can be in one of the
 * following states:
 *
 * CREATE PENDING > CREATE IN_PROGRESS > ACTIVE -or- CREATE FAILED
 *
 * To get the status of a solution update, call the
 * DescribeSolution API operation and find the status
 * in the `latestSolutionUpdate`.
 */
export const updateSolution: API.OperationMethod<
  UpdateSolutionRequest,
  UpdateSolutionResponse,
  UpdateSolutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSolutionRequest,
  output: UpdateSolutionResponse,
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSolution",
}));
