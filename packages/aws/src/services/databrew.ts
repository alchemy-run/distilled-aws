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
  sdkId: "DataBrew",
  serviceShapeName: "AWSGlueDataBrew",
});
const auth = T.AwsAuthSigv4({ name: "databrew" });
const ver = T.ServiceVersion("2017-07-25");
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
              `https://databrew-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (Region === "us-gov-west-1") {
              return e("https://databrew.us-gov-west-1.amazonaws.com");
            }
            return e(
              `https://databrew-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://databrew.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://databrew.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class DataBrewRoleNotAssumable
  extends /*@__PURE__*/ S.TaggedError<DataBrewRoleNotAssumable>()(
    "DataBrewRoleNotAssumable",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.SyntheticError({
      from: "ValidationException",
      message: { includes: "is not a trusted entity for the data access role" },
    }),
  ).pipe(C.withBadRequestError, C.withRetryableError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type RecipeName = string;
export type RecipeVersion = string;
export type RecipeVersionList = string[];
export const RecipeVersionList = /*@__PURE__*/ S.Array(S.String);
export interface BatchDeleteRecipeVersionRequest {
  Name: string;
  RecipeVersions: string[];
}
export const BatchDeleteRecipeVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String.pipe(T.HttpLabel("Name")),
    RecipeVersions: RecipeVersionList,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/recipes/{Name}/batchDeleteRecipeVersion",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchDeleteRecipeVersionRequest",
}) as any as S.Schema<BatchDeleteRecipeVersionRequest>;
export type ErrorCode = string;
export type RecipeErrorMessage = string;
export interface RecipeVersionErrorDetail {
  ErrorCode?: string;
  ErrorMessage?: string;
  RecipeVersion?: string;
}
export const RecipeVersionErrorDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ErrorCode: S.optional(S.String),
    ErrorMessage: S.optional(S.String),
    RecipeVersion: S.optional(S.String),
  }),
).annotate({
  identifier: "RecipeVersionErrorDetail",
}) as any as S.Schema<RecipeVersionErrorDetail>;
export type RecipeErrorList = RecipeVersionErrorDetail[];
export const RecipeErrorList = /*@__PURE__*/ S.Array(RecipeVersionErrorDetail);
export interface BatchDeleteRecipeVersionResponse {
  Name: string;
  Errors?: RecipeVersionErrorDetail[];
}
export const BatchDeleteRecipeVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Errors: S.optional(RecipeErrorList) }),
).annotate({
  identifier: "BatchDeleteRecipeVersionResponse",
}) as any as S.Schema<BatchDeleteRecipeVersionResponse>;
export type DatasetName = string;
export type InputFormat =
  | "CSV"
  | "JSON"
  | "PARQUET"
  | "EXCEL"
  | "ORC"
  | (string & {});
export const InputFormat = /*@__PURE__*/ S.String;

export type MultiLine = boolean;
export interface JsonOptions {
  MultiLine?: boolean;
}
export const JsonOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MultiLine: S.optional(S.Boolean) }),
).annotate({ identifier: "JsonOptions" }) as any as S.Schema<JsonOptions>;
export type SheetName = string;
export type SheetNameList = string[];
export const SheetNameList = /*@__PURE__*/ S.Array(S.String);
export type SheetIndex = number;
export type SheetIndexList = number[];
export const SheetIndexList = /*@__PURE__*/ S.Array(S.Number);
export type HeaderRow = boolean;
export interface ExcelOptions {
  SheetNames?: string[];
  SheetIndexes?: number[];
  HeaderRow?: boolean;
}
export const ExcelOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SheetNames: S.optional(SheetNameList),
    SheetIndexes: S.optional(SheetIndexList),
    HeaderRow: S.optional(S.Boolean),
  }),
).annotate({ identifier: "ExcelOptions" }) as any as S.Schema<ExcelOptions>;
export type Delimiter = string;
export interface CsvOptions {
  Delimiter?: string;
  HeaderRow?: boolean;
}
export const CsvOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Delimiter: S.optional(S.String),
    HeaderRow: S.optional(S.Boolean),
  }),
).annotate({ identifier: "CsvOptions" }) as any as S.Schema<CsvOptions>;
export interface FormatOptions {
  Json?: JsonOptions;
  Excel?: ExcelOptions;
  Csv?: CsvOptions;
}
export const FormatOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Json: S.optional(JsonOptions),
    Excel: S.optional(ExcelOptions),
    Csv: S.optional(CsvOptions),
  }),
).annotate({ identifier: "FormatOptions" }) as any as S.Schema<FormatOptions>;
export type Bucket = string;
export type Key = string;
export type BucketOwner = string;
export interface S3Location {
  Bucket: string;
  Key?: string;
  BucketOwner?: string;
}
export const S3Location = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Bucket: S.String,
    Key: S.optional(S.String),
    BucketOwner: S.optional(S.String),
  }),
).annotate({ identifier: "S3Location" }) as any as S.Schema<S3Location>;
export type CatalogId = string;
export type DatabaseName = string;
export type TableName = string;
export interface DataCatalogInputDefinition {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  TempDirectory?: S3Location;
}
export const DataCatalogInputDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    DatabaseName: S.String,
    TableName: S.String,
    TempDirectory: S.optional(S3Location),
  }),
).annotate({
  identifier: "DataCatalogInputDefinition",
}) as any as S.Schema<DataCatalogInputDefinition>;
export type GlueConnectionName = string;
export type DatabaseTableName = string;
export type QueryString = string;
export interface DatabaseInputDefinition {
  GlueConnectionName: string;
  DatabaseTableName?: string;
  TempDirectory?: S3Location;
  QueryString?: string;
}
export const DatabaseInputDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GlueConnectionName: S.String,
    DatabaseTableName: S.optional(S.String),
    TempDirectory: S.optional(S3Location),
    QueryString: S.optional(S.String),
  }),
).annotate({
  identifier: "DatabaseInputDefinition",
}) as any as S.Schema<DatabaseInputDefinition>;
export type Arn = string;
export interface Metadata {
  SourceArn?: string;
}
export const Metadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SourceArn: S.optional(S.String) }),
).annotate({ identifier: "Metadata" }) as any as S.Schema<Metadata>;
export interface Input {
  S3InputDefinition?: S3Location;
  DataCatalogInputDefinition?: DataCatalogInputDefinition;
  DatabaseInputDefinition?: DatabaseInputDefinition;
  Metadata?: Metadata;
}
export const Input = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    S3InputDefinition: S.optional(S3Location),
    DataCatalogInputDefinition: S.optional(DataCatalogInputDefinition),
    DatabaseInputDefinition: S.optional(DatabaseInputDefinition),
    Metadata: S.optional(Metadata),
  }),
).annotate({ identifier: "Input" }) as any as S.Schema<Input>;
export type Expression = string;
export type ValueReference = string;
export type ConditionValue = string;
export type ValuesMap = { [key: string]: string | undefined };
export const ValuesMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface FilterExpression {
  Expression: string;
  ValuesMap: { [key: string]: string | undefined };
}
export const FilterExpression = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Expression: S.String, ValuesMap: ValuesMap }),
).annotate({
  identifier: "FilterExpression",
}) as any as S.Schema<FilterExpression>;
export type MaxFiles = number;
export type OrderedBy = "LAST_MODIFIED_DATE" | (string & {});
export const OrderedBy = /*@__PURE__*/ S.String;

export type Order = "DESCENDING" | "ASCENDING" | (string & {});
export const Order = /*@__PURE__*/ S.String;

export interface FilesLimit {
  MaxFiles: number;
  OrderedBy?: OrderedBy;
  Order?: Order;
}
export const FilesLimit = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxFiles: S.Number,
    OrderedBy: S.optional(OrderedBy),
    Order: S.optional(Order),
  }),
).annotate({ identifier: "FilesLimit" }) as any as S.Schema<FilesLimit>;
export type PathParameterName = string;
export type ParameterType = "Datetime" | "Number" | "String" | (string & {});
export const ParameterType = /*@__PURE__*/ S.String;

export type DatetimeFormat = string;
export type TimezoneOffset = string;
export type LocaleCode = string;
export interface DatetimeOptions {
  Format: string;
  TimezoneOffset?: string;
  LocaleCode?: string;
}
export const DatetimeOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Format: S.String,
    TimezoneOffset: S.optional(S.String),
    LocaleCode: S.optional(S.String),
  }),
).annotate({
  identifier: "DatetimeOptions",
}) as any as S.Schema<DatetimeOptions>;
export type CreateColumn = boolean;
export interface DatasetParameter {
  Name: string;
  Type: ParameterType;
  DatetimeOptions?: DatetimeOptions;
  CreateColumn?: boolean;
  Filter?: FilterExpression;
}
export const DatasetParameter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Type: ParameterType,
    DatetimeOptions: S.optional(DatetimeOptions),
    CreateColumn: S.optional(S.Boolean),
    Filter: S.optional(FilterExpression),
  }),
).annotate({
  identifier: "DatasetParameter",
}) as any as S.Schema<DatasetParameter>;
export type PathParametersMap = { [key: string]: DatasetParameter | undefined };
export const PathParametersMap = /*@__PURE__*/ S.Record(
  S.String,
  DatasetParameter.pipe(S.optional),
);
export interface PathOptions {
  LastModifiedDateCondition?: FilterExpression;
  FilesLimit?: FilesLimit;
  Parameters?: { [key: string]: DatasetParameter | undefined };
}
export const PathOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LastModifiedDateCondition: S.optional(FilterExpression),
    FilesLimit: S.optional(FilesLimit),
    Parameters: S.optional(PathParametersMap),
  }),
).annotate({ identifier: "PathOptions" }) as any as S.Schema<PathOptions>;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateDatasetRequest {
  Name: string;
  Format?: InputFormat;
  FormatOptions?: FormatOptions;
  Input: Input;
  PathOptions?: PathOptions;
  Tags?: { [key: string]: string | undefined };
}
export const CreateDatasetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Format: S.optional(InputFormat),
    FormatOptions: S.optional(FormatOptions),
    Input: Input,
    PathOptions: S.optional(PathOptions),
    Tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/datasets" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDatasetRequest",
}) as any as S.Schema<CreateDatasetRequest>;
export interface CreateDatasetResponse {
  Name: string;
}
export const CreateDatasetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }),
).annotate({
  identifier: "CreateDatasetResponse",
}) as any as S.Schema<CreateDatasetResponse>;
export type EncryptionKeyArn = string;
export type EncryptionMode = "SSE-KMS" | "SSE-S3" | (string & {});
export const EncryptionMode = /*@__PURE__*/ S.String;

export type JobName = string;
export type LogSubscription = "ENABLE" | "DISABLE" | (string & {});
export const LogSubscription = /*@__PURE__*/ S.String;

export type MaxCapacity = number;
export type MaxRetries = number;
export type Statistic = string;
export type StatisticList = string[];
export const StatisticList = /*@__PURE__*/ S.Array(S.String);
export type ParameterName = string;
export type ParameterValue = string;
export type ParameterMap = { [key: string]: string | undefined };
export const ParameterMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface StatisticOverride {
  Statistic: string;
  Parameters: { [key: string]: string | undefined };
}
export const StatisticOverride = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Statistic: S.String, Parameters: ParameterMap }),
).annotate({
  identifier: "StatisticOverride",
}) as any as S.Schema<StatisticOverride>;
export type StatisticOverrideList = StatisticOverride[];
export const StatisticOverrideList = /*@__PURE__*/ S.Array(StatisticOverride);
export interface StatisticsConfiguration {
  IncludedStatistics?: string[];
  Overrides?: StatisticOverride[];
}
export const StatisticsConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IncludedStatistics: S.optional(StatisticList),
    Overrides: S.optional(StatisticOverrideList),
  }),
).annotate({
  identifier: "StatisticsConfiguration",
}) as any as S.Schema<StatisticsConfiguration>;
export type ColumnName = string;
export interface ColumnSelector {
  Regex?: string;
  Name?: string;
}
export const ColumnSelector = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Regex: S.optional(S.String), Name: S.optional(S.String) }),
).annotate({ identifier: "ColumnSelector" }) as any as S.Schema<ColumnSelector>;
export type ColumnSelectorList = ColumnSelector[];
export const ColumnSelectorList = /*@__PURE__*/ S.Array(ColumnSelector);
export interface ColumnStatisticsConfiguration {
  Selectors?: ColumnSelector[];
  Statistics: StatisticsConfiguration;
}
export const ColumnStatisticsConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Selectors: S.optional(ColumnSelectorList),
    Statistics: StatisticsConfiguration,
  }),
).annotate({
  identifier: "ColumnStatisticsConfiguration",
}) as any as S.Schema<ColumnStatisticsConfiguration>;
export type ColumnStatisticsConfigurationList = ColumnStatisticsConfiguration[];
export const ColumnStatisticsConfigurationList = /*@__PURE__*/ S.Array(
  ColumnStatisticsConfiguration,
);
export type EntityType = string;
export type EntityTypeList = string[];
export const EntityTypeList = /*@__PURE__*/ S.Array(S.String);
export interface AllowedStatistics {
  Statistics: string[];
}
export const AllowedStatistics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Statistics: StatisticList }),
).annotate({
  identifier: "AllowedStatistics",
}) as any as S.Schema<AllowedStatistics>;
export type AllowedStatisticList = AllowedStatistics[];
export const AllowedStatisticList = /*@__PURE__*/ S.Array(AllowedStatistics);
export interface EntityDetectorConfiguration {
  EntityTypes: string[];
  AllowedStatistics?: AllowedStatistics[];
}
export const EntityDetectorConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EntityTypes: EntityTypeList,
    AllowedStatistics: S.optional(AllowedStatisticList),
  }),
).annotate({
  identifier: "EntityDetectorConfiguration",
}) as any as S.Schema<EntityDetectorConfiguration>;
export interface ProfileConfiguration {
  DatasetStatisticsConfiguration?: StatisticsConfiguration;
  ProfileColumns?: ColumnSelector[];
  ColumnStatisticsConfigurations?: ColumnStatisticsConfiguration[];
  EntityDetectorConfiguration?: EntityDetectorConfiguration;
}
export const ProfileConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatasetStatisticsConfiguration: S.optional(StatisticsConfiguration),
    ProfileColumns: S.optional(ColumnSelectorList),
    ColumnStatisticsConfigurations: S.optional(
      ColumnStatisticsConfigurationList,
    ),
    EntityDetectorConfiguration: S.optional(EntityDetectorConfiguration),
  }),
).annotate({
  identifier: "ProfileConfiguration",
}) as any as S.Schema<ProfileConfiguration>;
export type ValidationMode = "CHECK_ALL" | (string & {});
export const ValidationMode = /*@__PURE__*/ S.String;

export interface ValidationConfiguration {
  RulesetArn: string;
  ValidationMode?: ValidationMode;
}
export const ValidationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RulesetArn: S.String,
    ValidationMode: S.optional(ValidationMode),
  }),
).annotate({
  identifier: "ValidationConfiguration",
}) as any as S.Schema<ValidationConfiguration>;
export type ValidationConfigurationList = ValidationConfiguration[];
export const ValidationConfigurationList = /*@__PURE__*/ S.Array(
  ValidationConfiguration,
);
export type Timeout = number;
export type SampleMode = "FULL_DATASET" | "CUSTOM_ROWS" | (string & {});
export const SampleMode = /*@__PURE__*/ S.String;

export type JobSize = number;
export interface JobSample {
  Mode?: SampleMode;
  Size?: number;
}
export const JobSample = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Mode: S.optional(SampleMode), Size: S.optional(S.Number) }),
).annotate({ identifier: "JobSample" }) as any as S.Schema<JobSample>;
export interface CreateProfileJobRequest {
  DatasetName: string;
  EncryptionKeyArn?: string;
  EncryptionMode?: EncryptionMode;
  Name: string;
  LogSubscription?: LogSubscription;
  MaxCapacity?: number;
  MaxRetries?: number;
  OutputLocation: S3Location;
  Configuration?: ProfileConfiguration;
  ValidationConfigurations?: ValidationConfiguration[];
  RoleArn: string;
  Tags?: { [key: string]: string | undefined };
  Timeout?: number;
  JobSample?: JobSample;
}
export const CreateProfileJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatasetName: S.String,
    EncryptionKeyArn: S.optional(S.String),
    EncryptionMode: S.optional(EncryptionMode),
    Name: S.String,
    LogSubscription: S.optional(LogSubscription),
    MaxCapacity: S.optional(S.Number),
    MaxRetries: S.optional(S.Number),
    OutputLocation: S3Location,
    Configuration: S.optional(ProfileConfiguration),
    ValidationConfigurations: S.optional(ValidationConfigurationList),
    RoleArn: S.String,
    Tags: S.optional(TagMap),
    Timeout: S.optional(S.Number),
    JobSample: S.optional(JobSample),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/profileJobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateProfileJobRequest",
}) as any as S.Schema<CreateProfileJobRequest>;
export interface CreateProfileJobResponse {
  Name: string;
}
export const CreateProfileJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }),
).annotate({
  identifier: "CreateProfileJobResponse",
}) as any as S.Schema<CreateProfileJobResponse>;
export type ProjectName = string;
export type SampleSize = number;
export type SampleType = "FIRST_N" | "LAST_N" | "RANDOM" | (string & {});
export const SampleType = /*@__PURE__*/ S.String;

export interface Sample {
  Size?: number;
  Type: SampleType;
}
export const Sample = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Size: S.optional(S.Number), Type: SampleType }),
).annotate({ identifier: "Sample" }) as any as S.Schema<Sample>;
export interface CreateProjectRequest {
  DatasetName: string;
  Name: string;
  RecipeName: string;
  Sample?: Sample;
  RoleArn: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateProjectRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatasetName: S.String,
    Name: S.String,
    RecipeName: S.String,
    Sample: S.optional(Sample),
    RoleArn: S.String,
    Tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/projects" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateProjectRequest",
}) as any as S.Schema<CreateProjectRequest>;
export interface CreateProjectResponse {
  Name: string;
}
export const CreateProjectResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }),
).annotate({
  identifier: "CreateProjectResponse",
}) as any as S.Schema<CreateProjectResponse>;
export type RecipeDescription = string;
export type Operation = string;
export interface RecipeAction {
  Operation: string;
  Parameters?: { [key: string]: string | undefined };
}
export const RecipeAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Operation: S.String, Parameters: S.optional(ParameterMap) }),
).annotate({ identifier: "RecipeAction" }) as any as S.Schema<RecipeAction>;
export type Condition = string;
export type TargetColumn = string;
export interface ConditionExpression {
  Condition: string;
  Value?: string;
  TargetColumn: string;
}
export const ConditionExpression = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Condition: S.String,
    Value: S.optional(S.String),
    TargetColumn: S.String,
  }),
).annotate({
  identifier: "ConditionExpression",
}) as any as S.Schema<ConditionExpression>;
export type ConditionExpressionList = ConditionExpression[];
export const ConditionExpressionList =
  /*@__PURE__*/ S.Array(ConditionExpression);
export interface RecipeStep {
  Action: RecipeAction;
  ConditionExpressions?: ConditionExpression[];
}
export const RecipeStep = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Action: RecipeAction,
    ConditionExpressions: S.optional(ConditionExpressionList),
  }),
).annotate({ identifier: "RecipeStep" }) as any as S.Schema<RecipeStep>;
export type RecipeStepList = RecipeStep[];
export const RecipeStepList = /*@__PURE__*/ S.Array(RecipeStep);
export interface CreateRecipeRequest {
  Description?: string;
  Name: string;
  Steps: RecipeStep[];
  Tags?: { [key: string]: string | undefined };
}
export const CreateRecipeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    Name: S.String,
    Steps: RecipeStepList,
    Tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/recipes" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateRecipeRequest",
}) as any as S.Schema<CreateRecipeRequest>;
export interface CreateRecipeResponse {
  Name: string;
}
export const CreateRecipeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }),
).annotate({
  identifier: "CreateRecipeResponse",
}) as any as S.Schema<CreateRecipeResponse>;
export type CompressionFormat =
  | "GZIP"
  | "LZ4"
  | "SNAPPY"
  | "BZIP2"
  | "DEFLATE"
  | "LZO"
  | "BROTLI"
  | "ZSTD"
  | "ZLIB"
  | (string & {});
export const CompressionFormat = /*@__PURE__*/ S.String;

export type OutputFormat =
  | "CSV"
  | "JSON"
  | "PARQUET"
  | "GLUEPARQUET"
  | "AVRO"
  | "ORC"
  | "XML"
  | "TABLEAUHYPER"
  | (string & {});
export const OutputFormat = /*@__PURE__*/ S.String;

export type ColumnNameList = string[];
export const ColumnNameList = /*@__PURE__*/ S.Array(S.String);
export type OverwriteOutput = boolean;
export interface CsvOutputOptions {
  Delimiter?: string;
}
export const CsvOutputOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Delimiter: S.optional(S.String) }),
).annotate({
  identifier: "CsvOutputOptions",
}) as any as S.Schema<CsvOutputOptions>;
export interface OutputFormatOptions {
  Csv?: CsvOutputOptions;
}
export const OutputFormatOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Csv: S.optional(CsvOutputOptions) }),
).annotate({
  identifier: "OutputFormatOptions",
}) as any as S.Schema<OutputFormatOptions>;
export type MaxOutputFiles = number;
export interface Output {
  CompressionFormat?: CompressionFormat;
  Format?: OutputFormat;
  PartitionColumns?: string[];
  Location: S3Location;
  Overwrite?: boolean;
  FormatOptions?: OutputFormatOptions;
  MaxOutputFiles?: number;
}
export const Output = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CompressionFormat: S.optional(CompressionFormat),
    Format: S.optional(OutputFormat),
    PartitionColumns: S.optional(ColumnNameList),
    Location: S3Location,
    Overwrite: S.optional(S.Boolean),
    FormatOptions: S.optional(OutputFormatOptions),
    MaxOutputFiles: S.optional(S.Number),
  }),
).annotate({ identifier: "Output" }) as any as S.Schema<Output>;
export type OutputList = Output[];
export const OutputList = /*@__PURE__*/ S.Array(Output);
export interface S3TableOutputOptions {
  Location: S3Location;
}
export const S3TableOutputOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Location: S3Location }),
).annotate({
  identifier: "S3TableOutputOptions",
}) as any as S.Schema<S3TableOutputOptions>;
export interface DatabaseTableOutputOptions {
  TempDirectory?: S3Location;
  TableName: string;
}
export const DatabaseTableOutputOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TempDirectory: S.optional(S3Location), TableName: S.String }),
).annotate({
  identifier: "DatabaseTableOutputOptions",
}) as any as S.Schema<DatabaseTableOutputOptions>;
export interface DataCatalogOutput {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  S3Options?: S3TableOutputOptions;
  DatabaseOptions?: DatabaseTableOutputOptions;
  Overwrite?: boolean;
}
export const DataCatalogOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    DatabaseName: S.String,
    TableName: S.String,
    S3Options: S.optional(S3TableOutputOptions),
    DatabaseOptions: S.optional(DatabaseTableOutputOptions),
    Overwrite: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "DataCatalogOutput",
}) as any as S.Schema<DataCatalogOutput>;
export type DataCatalogOutputList = DataCatalogOutput[];
export const DataCatalogOutputList = /*@__PURE__*/ S.Array(DataCatalogOutput);
export type DatabaseOutputMode = "NEW_TABLE" | (string & {});
export const DatabaseOutputMode = /*@__PURE__*/ S.String;

export interface DatabaseOutput {
  GlueConnectionName: string;
  DatabaseOptions: DatabaseTableOutputOptions;
  DatabaseOutputMode?: DatabaseOutputMode;
}
export const DatabaseOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GlueConnectionName: S.String,
    DatabaseOptions: DatabaseTableOutputOptions,
    DatabaseOutputMode: S.optional(DatabaseOutputMode),
  }),
).annotate({ identifier: "DatabaseOutput" }) as any as S.Schema<DatabaseOutput>;
export type DatabaseOutputList = DatabaseOutput[];
export const DatabaseOutputList = /*@__PURE__*/ S.Array(DatabaseOutput);
export interface RecipeReference {
  Name: string;
  RecipeVersion?: string;
}
export const RecipeReference = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, RecipeVersion: S.optional(S.String) }),
).annotate({
  identifier: "RecipeReference",
}) as any as S.Schema<RecipeReference>;
export interface CreateRecipeJobRequest {
  DatasetName?: string;
  EncryptionKeyArn?: string;
  EncryptionMode?: EncryptionMode;
  Name: string;
  LogSubscription?: LogSubscription;
  MaxCapacity?: number;
  MaxRetries?: number;
  Outputs?: Output[];
  DataCatalogOutputs?: DataCatalogOutput[];
  DatabaseOutputs?: DatabaseOutput[];
  ProjectName?: string;
  RecipeReference?: RecipeReference;
  RoleArn: string;
  Tags?: { [key: string]: string | undefined };
  Timeout?: number;
}
export const CreateRecipeJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatasetName: S.optional(S.String),
    EncryptionKeyArn: S.optional(S.String),
    EncryptionMode: S.optional(EncryptionMode),
    Name: S.String,
    LogSubscription: S.optional(LogSubscription),
    MaxCapacity: S.optional(S.Number),
    MaxRetries: S.optional(S.Number),
    Outputs: S.optional(OutputList),
    DataCatalogOutputs: S.optional(DataCatalogOutputList),
    DatabaseOutputs: S.optional(DatabaseOutputList),
    ProjectName: S.optional(S.String),
    RecipeReference: S.optional(RecipeReference),
    RoleArn: S.String,
    Tags: S.optional(TagMap),
    Timeout: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/recipeJobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateRecipeJobRequest",
}) as any as S.Schema<CreateRecipeJobRequest>;
export interface CreateRecipeJobResponse {
  Name: string;
}
export const CreateRecipeJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }),
).annotate({
  identifier: "CreateRecipeJobResponse",
}) as any as S.Schema<CreateRecipeJobResponse>;
export type RulesetName = string;
export type RulesetDescription = string;
export type RuleName = string;
export type Disabled = boolean;
export type ThresholdValue = number;
export type ThresholdType =
  | "GREATER_THAN_OR_EQUAL"
  | "LESS_THAN_OR_EQUAL"
  | "GREATER_THAN"
  | "LESS_THAN"
  | (string & {});
export const ThresholdType = /*@__PURE__*/ S.String;

export type ThresholdUnit = "COUNT" | "PERCENTAGE" | (string & {});
export const ThresholdUnit = /*@__PURE__*/ S.String;

export interface Threshold {
  Value: number;
  Type?: ThresholdType;
  Unit?: ThresholdUnit;
}
export const Threshold = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Value: S.Number,
    Type: S.optional(ThresholdType),
    Unit: S.optional(ThresholdUnit),
  }),
).annotate({ identifier: "Threshold" }) as any as S.Schema<Threshold>;
export interface Rule {
  Name: string;
  Disabled?: boolean;
  CheckExpression: string;
  SubstitutionMap?: { [key: string]: string | undefined };
  Threshold?: Threshold;
  ColumnSelectors?: ColumnSelector[];
}
export const Rule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Disabled: S.optional(S.Boolean),
    CheckExpression: S.String,
    SubstitutionMap: S.optional(ValuesMap),
    Threshold: S.optional(Threshold),
    ColumnSelectors: S.optional(ColumnSelectorList),
  }),
).annotate({ identifier: "Rule" }) as any as S.Schema<Rule>;
export type RuleList = Rule[];
export const RuleList = /*@__PURE__*/ S.Array(Rule);
export interface CreateRulesetRequest {
  Name: string;
  Description?: string;
  TargetArn: string;
  Rules: Rule[];
  Tags?: { [key: string]: string | undefined };
}
export const CreateRulesetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.optional(S.String),
    TargetArn: S.String,
    Rules: RuleList,
    Tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/rulesets" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateRulesetRequest",
}) as any as S.Schema<CreateRulesetRequest>;
export interface CreateRulesetResponse {
  Name: string;
}
export const CreateRulesetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }),
).annotate({
  identifier: "CreateRulesetResponse",
}) as any as S.Schema<CreateRulesetResponse>;
export type JobNameList = string[];
export const JobNameList = /*@__PURE__*/ S.Array(S.String);
export type CronExpression = string;
export type ScheduleName = string;
export interface CreateScheduleRequest {
  JobNames?: string[];
  CronExpression: string;
  Tags?: { [key: string]: string | undefined };
  Name: string;
}
export const CreateScheduleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobNames: S.optional(JobNameList),
    CronExpression: S.String,
    Tags: S.optional(TagMap),
    Name: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/schedules" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateScheduleRequest",
}) as any as S.Schema<CreateScheduleRequest>;
export interface CreateScheduleResponse {
  Name: string;
}
export const CreateScheduleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }),
).annotate({
  identifier: "CreateScheduleResponse",
}) as any as S.Schema<CreateScheduleResponse>;
export interface DeleteDatasetRequest {
  Name: string;
}
export const DeleteDatasetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/datasets/{Name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDatasetRequest",
}) as any as S.Schema<DeleteDatasetRequest>;
export interface DeleteDatasetResponse {
  Name: string;
}
export const DeleteDatasetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }),
).annotate({
  identifier: "DeleteDatasetResponse",
}) as any as S.Schema<DeleteDatasetResponse>;
export interface DeleteJobRequest {
  Name: string;
}
export const DeleteJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/jobs/{Name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteJobRequest",
}) as any as S.Schema<DeleteJobRequest>;
export interface DeleteJobResponse {
  Name: string;
}
export const DeleteJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }),
).annotate({
  identifier: "DeleteJobResponse",
}) as any as S.Schema<DeleteJobResponse>;
export interface DeleteProjectRequest {
  Name: string;
}
export const DeleteProjectRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/projects/{Name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteProjectRequest",
}) as any as S.Schema<DeleteProjectRequest>;
export interface DeleteProjectResponse {
  Name: string;
}
export const DeleteProjectResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }),
).annotate({
  identifier: "DeleteProjectResponse",
}) as any as S.Schema<DeleteProjectResponse>;
export interface DeleteRecipeVersionRequest {
  Name: string;
  RecipeVersion: string;
}
export const DeleteRecipeVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String.pipe(T.HttpLabel("Name")),
    RecipeVersion: S.String.pipe(T.HttpLabel("RecipeVersion")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/recipes/{Name}/recipeVersion/{RecipeVersion}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteRecipeVersionRequest",
}) as any as S.Schema<DeleteRecipeVersionRequest>;
export interface DeleteRecipeVersionResponse {
  Name: string;
  RecipeVersion: string;
}
export const DeleteRecipeVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, RecipeVersion: S.String }),
).annotate({
  identifier: "DeleteRecipeVersionResponse",
}) as any as S.Schema<DeleteRecipeVersionResponse>;
export interface DeleteRulesetRequest {
  Name: string;
}
export const DeleteRulesetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/rulesets/{Name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteRulesetRequest",
}) as any as S.Schema<DeleteRulesetRequest>;
export interface DeleteRulesetResponse {
  Name: string;
}
export const DeleteRulesetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }),
).annotate({
  identifier: "DeleteRulesetResponse",
}) as any as S.Schema<DeleteRulesetResponse>;
export interface DeleteScheduleRequest {
  Name: string;
}
export const DeleteScheduleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/schedules/{Name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteScheduleRequest",
}) as any as S.Schema<DeleteScheduleRequest>;
export interface DeleteScheduleResponse {
  Name: string;
}
export const DeleteScheduleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }),
).annotate({
  identifier: "DeleteScheduleResponse",
}) as any as S.Schema<DeleteScheduleResponse>;
export interface DescribeDatasetRequest {
  Name: string;
}
export const DescribeDatasetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/datasets/{Name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeDatasetRequest",
}) as any as S.Schema<DescribeDatasetRequest>;
export type CreatedBy = string;
export type LastModifiedBy = string;
export type Source = "S3" | "DATA-CATALOG" | "DATABASE" | (string & {});
export const Source = /*@__PURE__*/ S.String;

export interface DescribeDatasetResponse {
  CreatedBy?: string;
  CreateDate?: Date;
  Name: string;
  Format?: InputFormat;
  FormatOptions?: FormatOptions;
  Input: Input;
  LastModifiedDate?: Date;
  LastModifiedBy?: string;
  Source?: Source;
  PathOptions?: PathOptions;
  Tags?: { [key: string]: string | undefined };
  ResourceArn?: string;
}
export const DescribeDatasetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreatedBy: S.optional(S.String),
    CreateDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Name: S.String,
    Format: S.optional(InputFormat),
    FormatOptions: S.optional(FormatOptions),
    Input: Input,
    LastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LastModifiedBy: S.optional(S.String),
    Source: S.optional(Source),
    PathOptions: S.optional(PathOptions),
    Tags: S.optional(TagMap),
    ResourceArn: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeDatasetResponse",
}) as any as S.Schema<DescribeDatasetResponse>;
export interface DescribeJobRequest {
  Name: string;
}
export const DescribeJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/jobs/{Name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeJobRequest",
}) as any as S.Schema<DescribeJobRequest>;
export type JobType = "PROFILE" | "RECIPE" | (string & {});
export const JobType = /*@__PURE__*/ S.String;

export interface DescribeJobResponse {
  CreateDate?: Date;
  CreatedBy?: string;
  DatasetName?: string;
  EncryptionKeyArn?: string;
  EncryptionMode?: EncryptionMode;
  Name: string;
  Type?: JobType;
  LastModifiedBy?: string;
  LastModifiedDate?: Date;
  LogSubscription?: LogSubscription;
  MaxCapacity?: number;
  MaxRetries?: number;
  Outputs?: Output[];
  DataCatalogOutputs?: DataCatalogOutput[];
  DatabaseOutputs?: DatabaseOutput[];
  ProjectName?: string;
  ProfileConfiguration?: ProfileConfiguration;
  ValidationConfigurations?: ValidationConfiguration[];
  RecipeReference?: RecipeReference;
  ResourceArn?: string;
  RoleArn?: string;
  Tags?: { [key: string]: string | undefined };
  Timeout?: number;
  JobSample?: JobSample;
}
export const DescribeJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreateDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CreatedBy: S.optional(S.String),
    DatasetName: S.optional(S.String),
    EncryptionKeyArn: S.optional(S.String),
    EncryptionMode: S.optional(EncryptionMode),
    Name: S.String,
    Type: S.optional(JobType),
    LastModifiedBy: S.optional(S.String),
    LastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LogSubscription: S.optional(LogSubscription),
    MaxCapacity: S.optional(S.Number),
    MaxRetries: S.optional(S.Number),
    Outputs: S.optional(OutputList),
    DataCatalogOutputs: S.optional(DataCatalogOutputList),
    DatabaseOutputs: S.optional(DatabaseOutputList),
    ProjectName: S.optional(S.String),
    ProfileConfiguration: S.optional(ProfileConfiguration),
    ValidationConfigurations: S.optional(ValidationConfigurationList),
    RecipeReference: S.optional(RecipeReference),
    ResourceArn: S.optional(S.String),
    RoleArn: S.optional(S.String),
    Tags: S.optional(TagMap),
    Timeout: S.optional(S.Number),
    JobSample: S.optional(JobSample),
  }),
).annotate({
  identifier: "DescribeJobResponse",
}) as any as S.Schema<DescribeJobResponse>;
export type JobRunId = string;
export interface DescribeJobRunRequest {
  Name: string;
  RunId: string;
}
export const DescribeJobRunRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String.pipe(T.HttpLabel("Name")),
    RunId: S.String.pipe(T.HttpLabel("RunId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/jobs/{Name}/jobRun/{RunId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeJobRunRequest",
}) as any as S.Schema<DescribeJobRunRequest>;
export type Attempt = number;
export type JobRunErrorMessage = string;
export type ExecutionTime = number;
export type JobRunState =
  | "STARTING"
  | "RUNNING"
  | "STOPPING"
  | "STOPPED"
  | "SUCCEEDED"
  | "FAILED"
  | "TIMEOUT"
  | (string & {});
export const JobRunState = /*@__PURE__*/ S.String;

export type LogGroupName = string;
export type StartedBy = string;
export interface DescribeJobRunResponse {
  Attempt?: number;
  CompletedOn?: Date;
  DatasetName?: string;
  ErrorMessage?: string;
  ExecutionTime?: number;
  JobName: string;
  ProfileConfiguration?: ProfileConfiguration;
  ValidationConfigurations?: ValidationConfiguration[];
  RunId?: string;
  State?: JobRunState;
  LogSubscription?: LogSubscription;
  LogGroupName?: string;
  Outputs?: Output[];
  DataCatalogOutputs?: DataCatalogOutput[];
  DatabaseOutputs?: DatabaseOutput[];
  RecipeReference?: RecipeReference;
  StartedBy?: string;
  StartedOn?: Date;
  JobSample?: JobSample;
}
export const DescribeJobRunResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Attempt: S.optional(S.Number),
    CompletedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DatasetName: S.optional(S.String),
    ErrorMessage: S.optional(S.String),
    ExecutionTime: S.optional(S.Number),
    JobName: S.String,
    ProfileConfiguration: S.optional(ProfileConfiguration),
    ValidationConfigurations: S.optional(ValidationConfigurationList),
    RunId: S.optional(S.String),
    State: S.optional(JobRunState),
    LogSubscription: S.optional(LogSubscription),
    LogGroupName: S.optional(S.String),
    Outputs: S.optional(OutputList),
    DataCatalogOutputs: S.optional(DataCatalogOutputList),
    DatabaseOutputs: S.optional(DatabaseOutputList),
    RecipeReference: S.optional(RecipeReference),
    StartedBy: S.optional(S.String),
    StartedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    JobSample: S.optional(JobSample),
  }),
).annotate({
  identifier: "DescribeJobRunResponse",
}) as any as S.Schema<DescribeJobRunResponse>;
export interface DescribeProjectRequest {
  Name: string;
}
export const DescribeProjectRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/projects/{Name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeProjectRequest",
}) as any as S.Schema<DescribeProjectRequest>;
export type SessionStatus =
  | "ASSIGNED"
  | "FAILED"
  | "INITIALIZING"
  | "PROVISIONING"
  | "READY"
  | "RECYCLING"
  | "ROTATING"
  | "TERMINATED"
  | "TERMINATING"
  | "UPDATING"
  | (string & {});
export const SessionStatus = /*@__PURE__*/ S.String;

export type OpenedBy = string;
export interface DescribeProjectResponse {
  CreateDate?: Date;
  CreatedBy?: string;
  DatasetName?: string;
  LastModifiedDate?: Date;
  LastModifiedBy?: string;
  Name: string;
  RecipeName?: string;
  ResourceArn?: string;
  Sample?: Sample;
  RoleArn?: string;
  Tags?: { [key: string]: string | undefined };
  SessionStatus?: SessionStatus;
  OpenedBy?: string;
  OpenDate?: Date;
}
export const DescribeProjectResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreateDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CreatedBy: S.optional(S.String),
    DatasetName: S.optional(S.String),
    LastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LastModifiedBy: S.optional(S.String),
    Name: S.String,
    RecipeName: S.optional(S.String),
    ResourceArn: S.optional(S.String),
    Sample: S.optional(Sample),
    RoleArn: S.optional(S.String),
    Tags: S.optional(TagMap),
    SessionStatus: S.optional(SessionStatus),
    OpenedBy: S.optional(S.String),
    OpenDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "DescribeProjectResponse",
}) as any as S.Schema<DescribeProjectResponse>;
export interface DescribeRecipeRequest {
  Name: string;
  RecipeVersion?: string;
}
export const DescribeRecipeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String.pipe(T.HttpLabel("Name")),
    RecipeVersion: S.optional(S.String).pipe(T.HttpQuery("recipeVersion")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/recipes/{Name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeRecipeRequest",
}) as any as S.Schema<DescribeRecipeRequest>;
export type PublishedBy = string;
export interface DescribeRecipeResponse {
  CreatedBy?: string;
  CreateDate?: Date;
  LastModifiedBy?: string;
  LastModifiedDate?: Date;
  ProjectName?: string;
  PublishedBy?: string;
  PublishedDate?: Date;
  Description?: string;
  Name: string;
  Steps?: RecipeStep[];
  Tags?: { [key: string]: string | undefined };
  ResourceArn?: string;
  RecipeVersion?: string;
}
export const DescribeRecipeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreatedBy: S.optional(S.String),
    CreateDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModifiedBy: S.optional(S.String),
    LastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ProjectName: S.optional(S.String),
    PublishedBy: S.optional(S.String),
    PublishedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Description: S.optional(S.String),
    Name: S.String,
    Steps: S.optional(RecipeStepList),
    Tags: S.optional(TagMap),
    ResourceArn: S.optional(S.String),
    RecipeVersion: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeRecipeResponse",
}) as any as S.Schema<DescribeRecipeResponse>;
export interface DescribeRulesetRequest {
  Name: string;
}
export const DescribeRulesetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/rulesets/{Name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeRulesetRequest",
}) as any as S.Schema<DescribeRulesetRequest>;
export interface DescribeRulesetResponse {
  Name: string;
  Description?: string;
  TargetArn?: string;
  Rules?: Rule[];
  CreateDate?: Date;
  CreatedBy?: string;
  LastModifiedBy?: string;
  LastModifiedDate?: Date;
  ResourceArn?: string;
  Tags?: { [key: string]: string | undefined };
}
export const DescribeRulesetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.optional(S.String),
    TargetArn: S.optional(S.String),
    Rules: S.optional(RuleList),
    CreateDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CreatedBy: S.optional(S.String),
    LastModifiedBy: S.optional(S.String),
    LastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ResourceArn: S.optional(S.String),
    Tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "DescribeRulesetResponse",
}) as any as S.Schema<DescribeRulesetResponse>;
export interface DescribeScheduleRequest {
  Name: string;
}
export const DescribeScheduleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/schedules/{Name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeScheduleRequest",
}) as any as S.Schema<DescribeScheduleRequest>;
export interface DescribeScheduleResponse {
  CreateDate?: Date;
  CreatedBy?: string;
  JobNames?: string[];
  LastModifiedBy?: string;
  LastModifiedDate?: Date;
  ResourceArn?: string;
  CronExpression?: string;
  Tags?: { [key: string]: string | undefined };
  Name: string;
}
export const DescribeScheduleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreateDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CreatedBy: S.optional(S.String),
    JobNames: S.optional(JobNameList),
    LastModifiedBy: S.optional(S.String),
    LastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ResourceArn: S.optional(S.String),
    CronExpression: S.optional(S.String),
    Tags: S.optional(TagMap),
    Name: S.String,
  }),
).annotate({
  identifier: "DescribeScheduleResponse",
}) as any as S.Schema<DescribeScheduleResponse>;
export type MaxResults100 = number;
export type NextToken = string;
export interface ListDatasetsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListDatasetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/datasets" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDatasetsRequest",
}) as any as S.Schema<ListDatasetsRequest>;
export type AccountId = string;
export interface Dataset {
  AccountId?: string;
  CreatedBy?: string;
  CreateDate?: Date;
  Name: string;
  Format?: InputFormat;
  FormatOptions?: FormatOptions;
  Input: Input;
  LastModifiedDate?: Date;
  LastModifiedBy?: string;
  Source?: Source;
  PathOptions?: PathOptions;
  Tags?: { [key: string]: string | undefined };
  ResourceArn?: string;
}
export const Dataset = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.optional(S.String),
    CreatedBy: S.optional(S.String),
    CreateDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Name: S.String,
    Format: S.optional(InputFormat),
    FormatOptions: S.optional(FormatOptions),
    Input: Input,
    LastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LastModifiedBy: S.optional(S.String),
    Source: S.optional(Source),
    PathOptions: S.optional(PathOptions),
    Tags: S.optional(TagMap),
    ResourceArn: S.optional(S.String),
  }),
).annotate({ identifier: "Dataset" }) as any as S.Schema<Dataset>;
export type DatasetList = Dataset[];
export const DatasetList = /*@__PURE__*/ S.Array(Dataset);
export interface ListDatasetsResponse {
  Datasets: Dataset[];
  NextToken?: string;
}
export const ListDatasetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Datasets: DatasetList, NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListDatasetsResponse",
}) as any as S.Schema<ListDatasetsResponse>;
export interface ListJobRunsRequest {
  Name: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListJobRunsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String.pipe(T.HttpLabel("Name")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/jobs/{Name}/jobRuns" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListJobRunsRequest",
}) as any as S.Schema<ListJobRunsRequest>;
export interface JobRun {
  Attempt?: number;
  CompletedOn?: Date;
  DatasetName?: string;
  ErrorMessage?: string;
  ExecutionTime?: number;
  JobName?: string;
  RunId?: string;
  State?: JobRunState;
  LogSubscription?: LogSubscription;
  LogGroupName?: string;
  Outputs?: Output[];
  DataCatalogOutputs?: DataCatalogOutput[];
  DatabaseOutputs?: DatabaseOutput[];
  RecipeReference?: RecipeReference;
  StartedBy?: string;
  StartedOn?: Date;
  JobSample?: JobSample;
  ValidationConfigurations?: ValidationConfiguration[];
}
export const JobRun = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Attempt: S.optional(S.Number),
    CompletedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DatasetName: S.optional(S.String),
    ErrorMessage: S.optional(S.String),
    ExecutionTime: S.optional(S.Number),
    JobName: S.optional(S.String),
    RunId: S.optional(S.String),
    State: S.optional(JobRunState),
    LogSubscription: S.optional(LogSubscription),
    LogGroupName: S.optional(S.String),
    Outputs: S.optional(OutputList),
    DataCatalogOutputs: S.optional(DataCatalogOutputList),
    DatabaseOutputs: S.optional(DatabaseOutputList),
    RecipeReference: S.optional(RecipeReference),
    StartedBy: S.optional(S.String),
    StartedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    JobSample: S.optional(JobSample),
    ValidationConfigurations: S.optional(ValidationConfigurationList),
  }),
).annotate({ identifier: "JobRun" }) as any as S.Schema<JobRun>;
export type JobRunList = JobRun[];
export const JobRunList = /*@__PURE__*/ S.Array(JobRun);
export interface ListJobRunsResponse {
  JobRuns: JobRun[];
  NextToken?: string;
}
export const ListJobRunsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobRuns: JobRunList, NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListJobRunsResponse",
}) as any as S.Schema<ListJobRunsResponse>;
export interface ListJobsRequest {
  DatasetName?: string;
  MaxResults?: number;
  NextToken?: string;
  ProjectName?: string;
}
export const ListJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatasetName: S.optional(S.String).pipe(T.HttpQuery("datasetName")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    ProjectName: S.optional(S.String).pipe(T.HttpQuery("projectName")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/jobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListJobsRequest",
}) as any as S.Schema<ListJobsRequest>;
export interface Job {
  AccountId?: string;
  CreatedBy?: string;
  CreateDate?: Date;
  DatasetName?: string;
  EncryptionKeyArn?: string;
  EncryptionMode?: EncryptionMode;
  Name: string;
  Type?: JobType;
  LastModifiedBy?: string;
  LastModifiedDate?: Date;
  LogSubscription?: LogSubscription;
  MaxCapacity?: number;
  MaxRetries?: number;
  Outputs?: Output[];
  DataCatalogOutputs?: DataCatalogOutput[];
  DatabaseOutputs?: DatabaseOutput[];
  ProjectName?: string;
  RecipeReference?: RecipeReference;
  ResourceArn?: string;
  RoleArn?: string;
  Timeout?: number;
  Tags?: { [key: string]: string | undefined };
  JobSample?: JobSample;
  ValidationConfigurations?: ValidationConfiguration[];
}
export const Job = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.optional(S.String),
    CreatedBy: S.optional(S.String),
    CreateDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DatasetName: S.optional(S.String),
    EncryptionKeyArn: S.optional(S.String),
    EncryptionMode: S.optional(EncryptionMode),
    Name: S.String,
    Type: S.optional(JobType),
    LastModifiedBy: S.optional(S.String),
    LastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LogSubscription: S.optional(LogSubscription),
    MaxCapacity: S.optional(S.Number),
    MaxRetries: S.optional(S.Number),
    Outputs: S.optional(OutputList),
    DataCatalogOutputs: S.optional(DataCatalogOutputList),
    DatabaseOutputs: S.optional(DatabaseOutputList),
    ProjectName: S.optional(S.String),
    RecipeReference: S.optional(RecipeReference),
    ResourceArn: S.optional(S.String),
    RoleArn: S.optional(S.String),
    Timeout: S.optional(S.Number),
    Tags: S.optional(TagMap),
    JobSample: S.optional(JobSample),
    ValidationConfigurations: S.optional(ValidationConfigurationList),
  }),
).annotate({ identifier: "Job" }) as any as S.Schema<Job>;
export type JobList = Job[];
export const JobList = /*@__PURE__*/ S.Array(Job);
export interface ListJobsResponse {
  Jobs: Job[];
  NextToken?: string;
}
export const ListJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Jobs: JobList, NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListJobsResponse",
}) as any as S.Schema<ListJobsResponse>;
export interface ListProjectsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListProjectsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/projects" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListProjectsRequest",
}) as any as S.Schema<ListProjectsRequest>;
export interface Project {
  AccountId?: string;
  CreateDate?: Date;
  CreatedBy?: string;
  DatasetName?: string;
  LastModifiedDate?: Date;
  LastModifiedBy?: string;
  Name: string;
  RecipeName: string;
  ResourceArn?: string;
  Sample?: Sample;
  Tags?: { [key: string]: string | undefined };
  RoleArn?: string;
  OpenedBy?: string;
  OpenDate?: Date;
}
export const Project = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.optional(S.String),
    CreateDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CreatedBy: S.optional(S.String),
    DatasetName: S.optional(S.String),
    LastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LastModifiedBy: S.optional(S.String),
    Name: S.String,
    RecipeName: S.String,
    ResourceArn: S.optional(S.String),
    Sample: S.optional(Sample),
    Tags: S.optional(TagMap),
    RoleArn: S.optional(S.String),
    OpenedBy: S.optional(S.String),
    OpenDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "Project" }) as any as S.Schema<Project>;
export type ProjectList = Project[];
export const ProjectList = /*@__PURE__*/ S.Array(Project);
export interface ListProjectsResponse {
  Projects: Project[];
  NextToken?: string;
}
export const ListProjectsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Projects: ProjectList, NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListProjectsResponse",
}) as any as S.Schema<ListProjectsResponse>;
export interface ListRecipesRequest {
  MaxResults?: number;
  NextToken?: string;
  RecipeVersion?: string;
}
export const ListRecipesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    RecipeVersion: S.optional(S.String).pipe(T.HttpQuery("recipeVersion")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/recipes" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListRecipesRequest",
}) as any as S.Schema<ListRecipesRequest>;
export interface Recipe {
  CreatedBy?: string;
  CreateDate?: Date;
  LastModifiedBy?: string;
  LastModifiedDate?: Date;
  ProjectName?: string;
  PublishedBy?: string;
  PublishedDate?: Date;
  Description?: string;
  Name: string;
  ResourceArn?: string;
  Steps?: RecipeStep[];
  Tags?: { [key: string]: string | undefined };
  RecipeVersion?: string;
}
export const Recipe = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreatedBy: S.optional(S.String),
    CreateDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModifiedBy: S.optional(S.String),
    LastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ProjectName: S.optional(S.String),
    PublishedBy: S.optional(S.String),
    PublishedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Description: S.optional(S.String),
    Name: S.String,
    ResourceArn: S.optional(S.String),
    Steps: S.optional(RecipeStepList),
    Tags: S.optional(TagMap),
    RecipeVersion: S.optional(S.String),
  }),
).annotate({ identifier: "Recipe" }) as any as S.Schema<Recipe>;
export type RecipeList = Recipe[];
export const RecipeList = /*@__PURE__*/ S.Array(Recipe);
export interface ListRecipesResponse {
  Recipes: Recipe[];
  NextToken?: string;
}
export const ListRecipesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Recipes: RecipeList, NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListRecipesResponse",
}) as any as S.Schema<ListRecipesResponse>;
export interface ListRecipeVersionsRequest {
  MaxResults?: number;
  NextToken?: string;
  Name: string;
}
export const ListRecipeVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    Name: S.String.pipe(T.HttpQuery("name")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/recipeVersions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListRecipeVersionsRequest",
}) as any as S.Schema<ListRecipeVersionsRequest>;
export interface ListRecipeVersionsResponse {
  NextToken?: string;
  Recipes: Recipe[];
}
export const ListRecipeVersionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ NextToken: S.optional(S.String), Recipes: RecipeList }),
).annotate({
  identifier: "ListRecipeVersionsResponse",
}) as any as S.Schema<ListRecipeVersionsResponse>;
export interface ListRulesetsRequest {
  TargetArn?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListRulesetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TargetArn: S.optional(S.String).pipe(T.HttpQuery("targetArn")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/rulesets" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListRulesetsRequest",
}) as any as S.Schema<ListRulesetsRequest>;
export type RuleCount = number;
export interface RulesetItem {
  AccountId?: string;
  CreatedBy?: string;
  CreateDate?: Date;
  Description?: string;
  LastModifiedBy?: string;
  LastModifiedDate?: Date;
  Name: string;
  ResourceArn?: string;
  RuleCount?: number;
  Tags?: { [key: string]: string | undefined };
  TargetArn: string;
}
export const RulesetItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.optional(S.String),
    CreatedBy: S.optional(S.String),
    CreateDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Description: S.optional(S.String),
    LastModifiedBy: S.optional(S.String),
    LastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Name: S.String,
    ResourceArn: S.optional(S.String),
    RuleCount: S.optional(S.Number),
    Tags: S.optional(TagMap),
    TargetArn: S.String,
  }),
).annotate({ identifier: "RulesetItem" }) as any as S.Schema<RulesetItem>;
export type RulesetItemList = RulesetItem[];
export const RulesetItemList = /*@__PURE__*/ S.Array(RulesetItem);
export interface ListRulesetsResponse {
  Rulesets: RulesetItem[];
  NextToken?: string;
}
export const ListRulesetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Rulesets: RulesetItemList, NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListRulesetsResponse",
}) as any as S.Schema<ListRulesetsResponse>;
export interface ListSchedulesRequest {
  JobName?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListSchedulesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobName: S.optional(S.String).pipe(T.HttpQuery("jobName")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/schedules" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSchedulesRequest",
}) as any as S.Schema<ListSchedulesRequest>;
export interface Schedule {
  AccountId?: string;
  CreatedBy?: string;
  CreateDate?: Date;
  JobNames?: string[];
  LastModifiedBy?: string;
  LastModifiedDate?: Date;
  ResourceArn?: string;
  CronExpression?: string;
  Tags?: { [key: string]: string | undefined };
  Name: string;
}
export const Schedule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.optional(S.String),
    CreatedBy: S.optional(S.String),
    CreateDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    JobNames: S.optional(JobNameList),
    LastModifiedBy: S.optional(S.String),
    LastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ResourceArn: S.optional(S.String),
    CronExpression: S.optional(S.String),
    Tags: S.optional(TagMap),
    Name: S.String,
  }),
).annotate({ identifier: "Schedule" }) as any as S.Schema<Schedule>;
export type ScheduleList = Schedule[];
export const ScheduleList = /*@__PURE__*/ S.Array(Schedule);
export interface ListSchedulesResponse {
  Schedules: Schedule[];
  NextToken?: string;
}
export const ListSchedulesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Schedules: ScheduleList, NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListSchedulesResponse",
}) as any as S.Schema<ListSchedulesResponse>;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/tags/{ResourceArn}" }),
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
  Tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(TagMap) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface PublishRecipeRequest {
  Description?: string;
  Name: string;
}
export const PublishRecipeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    Name: S.String.pipe(T.HttpLabel("Name")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/recipes/{Name}/publishRecipe" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PublishRecipeRequest",
}) as any as S.Schema<PublishRecipeRequest>;
export interface PublishRecipeResponse {
  Name: string;
}
export const PublishRecipeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }),
).annotate({
  identifier: "PublishRecipeResponse",
}) as any as S.Schema<PublishRecipeResponse>;
export type Preview = boolean;
export type StepIndex = number;
export type ClientSessionId = string | redacted.Redacted<string>;
export type StartColumnIndex = number;
export type ColumnRange = number;
export type HiddenColumnList = string[];
export const HiddenColumnList = /*@__PURE__*/ S.Array(S.String);
export type StartRowIndex = number;
export type RowRange = number;
export type AnalyticsMode = "ENABLE" | "DISABLE" | (string & {});
export const AnalyticsMode = /*@__PURE__*/ S.String;

export interface ViewFrame {
  StartColumnIndex: number;
  ColumnRange?: number;
  HiddenColumns?: string[];
  StartRowIndex?: number;
  RowRange?: number;
  Analytics?: AnalyticsMode;
}
export const ViewFrame = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartColumnIndex: S.Number,
    ColumnRange: S.optional(S.Number),
    HiddenColumns: S.optional(HiddenColumnList),
    StartRowIndex: S.optional(S.Number),
    RowRange: S.optional(S.Number),
    Analytics: S.optional(AnalyticsMode),
  }),
).annotate({ identifier: "ViewFrame" }) as any as S.Schema<ViewFrame>;
export interface SendProjectSessionActionRequest {
  Preview?: boolean;
  Name: string;
  RecipeStep?: RecipeStep;
  StepIndex?: number;
  ClientSessionId?: string | redacted.Redacted<string>;
  ViewFrame?: ViewFrame;
}
export const SendProjectSessionActionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Preview: S.optional(S.Boolean),
    Name: S.String.pipe(T.HttpLabel("Name")),
    RecipeStep: S.optional(RecipeStep),
    StepIndex: S.optional(S.Number),
    ClientSessionId: S.optional(SensitiveString),
    ViewFrame: S.optional(ViewFrame),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/projects/{Name}/sendProjectSessionAction",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SendProjectSessionActionRequest",
}) as any as S.Schema<SendProjectSessionActionRequest>;
export type Result = string;
export type ActionId = number;
export interface SendProjectSessionActionResponse {
  Result?: string;
  Name: string;
  ActionId?: number;
}
export const SendProjectSessionActionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Result: S.optional(S.String),
    Name: S.String,
    ActionId: S.optional(S.Number),
  }),
).annotate({
  identifier: "SendProjectSessionActionResponse",
}) as any as S.Schema<SendProjectSessionActionResponse>;
export interface StartJobRunRequest {
  Name: string;
}
export const StartJobRunRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/jobs/{Name}/startJobRun" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartJobRunRequest",
}) as any as S.Schema<StartJobRunRequest>;
export interface StartJobRunResponse {
  RunId: string;
}
export const StartJobRunResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RunId: S.String }),
).annotate({
  identifier: "StartJobRunResponse",
}) as any as S.Schema<StartJobRunResponse>;
export type AssumeControl = boolean;
export interface StartProjectSessionRequest {
  Name: string;
  AssumeControl?: boolean;
}
export const StartProjectSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String.pipe(T.HttpLabel("Name")),
    AssumeControl: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/projects/{Name}/startProjectSession" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartProjectSessionRequest",
}) as any as S.Schema<StartProjectSessionRequest>;
export interface StartProjectSessionResponse {
  Name: string;
  ClientSessionId?: string | redacted.Redacted<string>;
}
export const StartProjectSessionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, ClientSessionId: S.optional(SensitiveString) }),
).annotate({
  identifier: "StartProjectSessionResponse",
}) as any as S.Schema<StartProjectSessionResponse>;
export interface StopJobRunRequest {
  Name: string;
  RunId: string;
}
export const StopJobRunRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String.pipe(T.HttpLabel("Name")),
    RunId: S.String.pipe(T.HttpLabel("RunId")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/jobs/{Name}/jobRun/{RunId}/stopJobRun" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopJobRunRequest",
}) as any as S.Schema<StopJobRunRequest>;
export interface StopJobRunResponse {
  RunId: string;
}
export const StopJobRunResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RunId: S.String }),
).annotate({
  identifier: "StopJobRunResponse",
}) as any as S.Schema<StopJobRunResponse>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    Tags: TagMap,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/tags/{ResourceArn}" }),
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
  ResourceArn: string;
  TagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    TagKeys: TagKeyList.pipe(T.HttpQuery("tagKeys")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/tags/{ResourceArn}" }),
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
export interface UpdateDatasetRequest {
  Name: string;
  Format?: InputFormat;
  FormatOptions?: FormatOptions;
  Input: Input;
  PathOptions?: PathOptions;
}
export const UpdateDatasetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String.pipe(T.HttpLabel("Name")),
    Format: S.optional(InputFormat),
    FormatOptions: S.optional(FormatOptions),
    Input: Input,
    PathOptions: S.optional(PathOptions),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/datasets/{Name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDatasetRequest",
}) as any as S.Schema<UpdateDatasetRequest>;
export interface UpdateDatasetResponse {
  Name: string;
}
export const UpdateDatasetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }),
).annotate({
  identifier: "UpdateDatasetResponse",
}) as any as S.Schema<UpdateDatasetResponse>;
export interface UpdateProfileJobRequest {
  Configuration?: ProfileConfiguration;
  EncryptionKeyArn?: string;
  EncryptionMode?: EncryptionMode;
  Name: string;
  LogSubscription?: LogSubscription;
  MaxCapacity?: number;
  MaxRetries?: number;
  OutputLocation: S3Location;
  ValidationConfigurations?: ValidationConfiguration[];
  RoleArn: string;
  Timeout?: number;
  JobSample?: JobSample;
}
export const UpdateProfileJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Configuration: S.optional(ProfileConfiguration),
    EncryptionKeyArn: S.optional(S.String),
    EncryptionMode: S.optional(EncryptionMode),
    Name: S.String.pipe(T.HttpLabel("Name")),
    LogSubscription: S.optional(LogSubscription),
    MaxCapacity: S.optional(S.Number),
    MaxRetries: S.optional(S.Number),
    OutputLocation: S3Location,
    ValidationConfigurations: S.optional(ValidationConfigurationList),
    RoleArn: S.String,
    Timeout: S.optional(S.Number),
    JobSample: S.optional(JobSample),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/profileJobs/{Name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateProfileJobRequest",
}) as any as S.Schema<UpdateProfileJobRequest>;
export interface UpdateProfileJobResponse {
  Name: string;
}
export const UpdateProfileJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }),
).annotate({
  identifier: "UpdateProfileJobResponse",
}) as any as S.Schema<UpdateProfileJobResponse>;
export interface UpdateProjectRequest {
  Sample?: Sample;
  RoleArn: string;
  Name: string;
}
export const UpdateProjectRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Sample: S.optional(Sample),
    RoleArn: S.String,
    Name: S.String.pipe(T.HttpLabel("Name")),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/projects/{Name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateProjectRequest",
}) as any as S.Schema<UpdateProjectRequest>;
export interface UpdateProjectResponse {
  LastModifiedDate?: Date;
  Name: string;
}
export const UpdateProjectResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Name: S.String,
  }),
).annotate({
  identifier: "UpdateProjectResponse",
}) as any as S.Schema<UpdateProjectResponse>;
export interface UpdateRecipeRequest {
  Description?: string;
  Name: string;
  Steps?: RecipeStep[];
}
export const UpdateRecipeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    Name: S.String.pipe(T.HttpLabel("Name")),
    Steps: S.optional(RecipeStepList),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/recipes/{Name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateRecipeRequest",
}) as any as S.Schema<UpdateRecipeRequest>;
export interface UpdateRecipeResponse {
  Name: string;
}
export const UpdateRecipeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }),
).annotate({
  identifier: "UpdateRecipeResponse",
}) as any as S.Schema<UpdateRecipeResponse>;
export interface UpdateRecipeJobRequest {
  EncryptionKeyArn?: string;
  EncryptionMode?: EncryptionMode;
  Name: string;
  LogSubscription?: LogSubscription;
  MaxCapacity?: number;
  MaxRetries?: number;
  Outputs?: Output[];
  DataCatalogOutputs?: DataCatalogOutput[];
  DatabaseOutputs?: DatabaseOutput[];
  RoleArn: string;
  Timeout?: number;
}
export const UpdateRecipeJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EncryptionKeyArn: S.optional(S.String),
    EncryptionMode: S.optional(EncryptionMode),
    Name: S.String.pipe(T.HttpLabel("Name")),
    LogSubscription: S.optional(LogSubscription),
    MaxCapacity: S.optional(S.Number),
    MaxRetries: S.optional(S.Number),
    Outputs: S.optional(OutputList),
    DataCatalogOutputs: S.optional(DataCatalogOutputList),
    DatabaseOutputs: S.optional(DatabaseOutputList),
    RoleArn: S.String,
    Timeout: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/recipeJobs/{Name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateRecipeJobRequest",
}) as any as S.Schema<UpdateRecipeJobRequest>;
export interface UpdateRecipeJobResponse {
  Name: string;
}
export const UpdateRecipeJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }),
).annotate({
  identifier: "UpdateRecipeJobResponse",
}) as any as S.Schema<UpdateRecipeJobResponse>;
export interface UpdateRulesetRequest {
  Name: string;
  Description?: string;
  Rules: Rule[];
}
export const UpdateRulesetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String.pipe(T.HttpLabel("Name")),
    Description: S.optional(S.String),
    Rules: RuleList,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/rulesets/{Name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateRulesetRequest",
}) as any as S.Schema<UpdateRulesetRequest>;
export interface UpdateRulesetResponse {
  Name: string;
}
export const UpdateRulesetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }),
).annotate({
  identifier: "UpdateRulesetResponse",
}) as any as S.Schema<UpdateRulesetResponse>;
export interface UpdateScheduleRequest {
  JobNames?: string[];
  CronExpression: string;
  Name: string;
}
export const UpdateScheduleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobNames: S.optional(JobNameList),
    CronExpression: S.String,
    Name: S.String.pipe(T.HttpLabel("Name")),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/schedules/{Name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateScheduleRequest",
}) as any as S.Schema<UpdateScheduleRequest>;
export interface UpdateScheduleResponse {
  Name: string;
}
export const UpdateScheduleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }),
).annotate({
  identifier: "UpdateScheduleResponse",
}) as any as S.Schema<UpdateScheduleResponse>;
export type Message = string;
export type BatchDeleteRecipeVersionError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes one or more versions of a recipe at a time.
 *
 * The entire request will be rejected if:
 *
 * - The recipe does not exist.
 *
 * - There is an invalid version identifier in the list of versions.
 *
 * - The version list is empty.
 *
 * - The version list size exceeds 50.
 *
 * - The version list contains duplicate entries.
 *
 * The request will complete successfully, but with partial failures, if:
 *
 * - A version does not exist.
 *
 * - A version is being used by a job.
 *
 * - You specify `LATEST_WORKING`, but it's being used by a
 * project.
 *
 * - The version fails to be deleted.
 *
 * The `LATEST_WORKING` version will only be deleted if the recipe has no
 * other versions. If you try to delete `LATEST_WORKING` while other versions
 * exist (or if they can't be deleted), then `LATEST_WORKING` will be listed as
 * partial failure in the response.
 */
export const batchDeleteRecipeVersion: API.OperationMethod<
  BatchDeleteRecipeVersionRequest,
  BatchDeleteRecipeVersionResponse,
  BatchDeleteRecipeVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchDeleteRecipeVersionRequest,
  output: BatchDeleteRecipeVersionResponse,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteRecipeVersion",
}));

export type CreateDatasetError =
  | AccessDeniedException
  | ConflictException
  | ServiceQuotaExceededException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new DataBrew dataset.
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
    ServiceQuotaExceededException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataset",
}));

export type CreateProfileJobError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | TooManyRequestsException
  | DataBrewRoleNotAssumable
  | CommonErrors;
/**
 * Creates a new job to analyze a dataset and create its data profile.
 */
export const createProfileJob: API.OperationMethod<
  CreateProfileJobRequest,
  CreateProfileJobResponse,
  CreateProfileJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateProfileJobRequest,
  output: CreateProfileJobResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
    TooManyRequestsException,
    DataBrewRoleNotAssumable,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProfileJob",
}));

export type CreateProjectError =
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ValidationException
  | TooManyRequestsException
  | DataBrewRoleNotAssumable
  | CommonErrors;
/**
 * Creates a new DataBrew project.
 */
export const createProject: API.OperationMethod<
  CreateProjectRequest,
  CreateProjectResponse,
  CreateProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateProjectRequest,
  output: CreateProjectResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ValidationException,
    TooManyRequestsException,
    DataBrewRoleNotAssumable,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProject",
}));

export type CreateRecipeError =
  | ConflictException
  | ServiceQuotaExceededException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new DataBrew recipe.
 */
export const createRecipe: API.OperationMethod<
  CreateRecipeRequest,
  CreateRecipeResponse,
  CreateRecipeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRecipeRequest,
  output: CreateRecipeResponse,
  errors: [
    ConflictException,
    ServiceQuotaExceededException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRecipe",
}));

export type CreateRecipeJobError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | TooManyRequestsException
  | DataBrewRoleNotAssumable
  | CommonErrors;
/**
 * Creates a new job to transform input data, using steps defined in an existing Glue DataBrew recipe
 */
export const createRecipeJob: API.OperationMethod<
  CreateRecipeJobRequest,
  CreateRecipeJobResponse,
  CreateRecipeJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRecipeJobRequest,
  output: CreateRecipeJobResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
    TooManyRequestsException,
    DataBrewRoleNotAssumable,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRecipeJob",
}));

export type CreateRulesetError =
  | ConflictException
  | ServiceQuotaExceededException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new ruleset that can be used in a profile job to validate
 * the data quality of a dataset.
 */
export const createRuleset: API.OperationMethod<
  CreateRulesetRequest,
  CreateRulesetResponse,
  CreateRulesetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRulesetRequest,
  output: CreateRulesetResponse,
  errors: [
    ConflictException,
    ServiceQuotaExceededException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRuleset",
}));

export type CreateScheduleError =
  | ConflictException
  | ServiceQuotaExceededException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new schedule for one or more DataBrew jobs. Jobs can be run at a specific
 * date and time, or at regular intervals.
 */
export const createSchedule: API.OperationMethod<
  CreateScheduleRequest,
  CreateScheduleResponse,
  CreateScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateScheduleRequest,
  output: CreateScheduleResponse,
  errors: [
    ConflictException,
    ServiceQuotaExceededException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSchedule",
}));

export type DeleteDatasetError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a dataset from DataBrew.
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
    ConflictException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataset",
}));

export type DeleteJobError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes the specified DataBrew job.
 */
export const deleteJob: API.OperationMethod<
  DeleteJobRequest,
  DeleteJobResponse,
  DeleteJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteJobRequest,
  output: DeleteJobResponse,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteJob",
}));

export type DeleteProjectError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an existing DataBrew project.
 */
export const deleteProject: API.OperationMethod<
  DeleteProjectRequest,
  DeleteProjectResponse,
  DeleteProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteProjectRequest,
  output: DeleteProjectResponse,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProject",
}));

export type DeleteRecipeVersionError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a single version of a DataBrew recipe.
 */
export const deleteRecipeVersion: API.OperationMethod<
  DeleteRecipeVersionRequest,
  DeleteRecipeVersionResponse,
  DeleteRecipeVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRecipeVersionRequest,
  output: DeleteRecipeVersionResponse,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRecipeVersion",
}));

export type DeleteRulesetError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a ruleset.
 */
export const deleteRuleset: API.OperationMethod<
  DeleteRulesetRequest,
  DeleteRulesetResponse,
  DeleteRulesetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRulesetRequest,
  output: DeleteRulesetResponse,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRuleset",
}));

export type DeleteScheduleError =
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes the specified DataBrew schedule.
 */
export const deleteSchedule: API.OperationMethod<
  DeleteScheduleRequest,
  DeleteScheduleResponse,
  DeleteScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteScheduleRequest,
  output: DeleteScheduleResponse,
  errors: [
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSchedule",
}));

export type DescribeDatasetError =
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns the definition of a specific DataBrew dataset.
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
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDataset",
}));

export type DescribeJobError =
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns the definition of a specific DataBrew job.
 */
export const describeJob: API.OperationMethod<
  DescribeJobRequest,
  DescribeJobResponse,
  DescribeJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeJobRequest,
  output: DescribeJobResponse,
  errors: [
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeJob",
}));

export type DescribeJobRunError =
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Represents one run of a DataBrew job.
 */
export const describeJobRun: API.OperationMethod<
  DescribeJobRunRequest,
  DescribeJobRunResponse,
  DescribeJobRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeJobRunRequest,
  output: DescribeJobRunResponse,
  errors: [
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeJobRun",
}));

export type DescribeProjectError =
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns the definition of a specific DataBrew project.
 */
export const describeProject: API.OperationMethod<
  DescribeProjectRequest,
  DescribeProjectResponse,
  DescribeProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeProjectRequest,
  output: DescribeProjectResponse,
  errors: [
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProject",
}));

export type DescribeRecipeError =
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns the definition of a specific DataBrew recipe corresponding to a particular
 * version.
 */
export const describeRecipe: API.OperationMethod<
  DescribeRecipeRequest,
  DescribeRecipeResponse,
  DescribeRecipeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeRecipeRequest,
  output: DescribeRecipeResponse,
  errors: [
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRecipe",
}));

export type DescribeRulesetError =
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves detailed information about the ruleset.
 */
export const describeRuleset: API.OperationMethod<
  DescribeRulesetRequest,
  DescribeRulesetResponse,
  DescribeRulesetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeRulesetRequest,
  output: DescribeRulesetResponse,
  errors: [
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRuleset",
}));

export type DescribeScheduleError =
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns the definition of a specific DataBrew schedule.
 */
export const describeSchedule: API.OperationMethod<
  DescribeScheduleRequest,
  DescribeScheduleResponse,
  DescribeScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeScheduleRequest,
  output: DescribeScheduleResponse,
  errors: [
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSchedule",
}));

export type ListDatasetsError =
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists all of the DataBrew datasets.
 */
export const listDatasets: API.PaginatedOperationMethod<
  ListDatasetsRequest,
  ListDatasetsResponse,
  ListDatasetsError,
  Credentials | HttpClient.HttpClient,
  Dataset
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDatasetsRequest,
  output: ListDatasetsResponse,
  errors: [ValidationException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDatasets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Datasets",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListJobRunsError =
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists all of the previous runs of a particular DataBrew job.
 */
export const listJobRuns: API.PaginatedOperationMethod<
  ListJobRunsRequest,
  ListJobRunsResponse,
  ListJobRunsError,
  Credentials | HttpClient.HttpClient,
  JobRun
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListJobRunsRequest,
  output: ListJobRunsResponse,
  errors: [
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListJobRuns",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "JobRuns",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListJobsError =
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists all of the DataBrew jobs that are defined.
 */
export const listJobs: API.PaginatedOperationMethod<
  ListJobsRequest,
  ListJobsResponse,
  ListJobsError,
  Credentials | HttpClient.HttpClient,
  Job
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListJobsRequest,
  output: ListJobsResponse,
  errors: [ValidationException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Jobs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListProjectsError =
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists all of the DataBrew projects that are defined.
 */
export const listProjects: API.PaginatedOperationMethod<
  ListProjectsRequest,
  ListProjectsResponse,
  ListProjectsError,
  Credentials | HttpClient.HttpClient,
  Project
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsRequest,
  output: ListProjectsResponse,
  errors: [ValidationException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProjects",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Projects",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRecipesError =
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists all of the DataBrew recipes that are defined.
 */
export const listRecipes: API.PaginatedOperationMethod<
  ListRecipesRequest,
  ListRecipesResponse,
  ListRecipesError,
  Credentials | HttpClient.HttpClient,
  Recipe
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRecipesRequest,
  output: ListRecipesResponse,
  errors: [ValidationException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecipes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Recipes",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRecipeVersionsError =
  | ValidationException
  | TooManyRequestsException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the versions of a particular DataBrew recipe, except for
 * `LATEST_WORKING`.
 */
export const listRecipeVersions: API.PaginatedOperationMethod<
  ListRecipeVersionsRequest,
  ListRecipeVersionsResponse,
  ListRecipeVersionsError,
  Credentials | HttpClient.HttpClient,
  Recipe
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRecipeVersionsRequest,
  output: ListRecipeVersionsResponse,
  errors: [
    ValidationException,
    TooManyRequestsException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecipeVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Recipes",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRulesetsError =
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * List all rulesets available in the current account or rulesets associated
 * with a specific resource (dataset).
 */
export const listRulesets: API.PaginatedOperationMethod<
  ListRulesetsRequest,
  ListRulesetsResponse,
  ListRulesetsError,
  Credentials | HttpClient.HttpClient,
  RulesetItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRulesetsRequest,
  output: ListRulesetsResponse,
  errors: [
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRulesets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Rulesets",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSchedulesError =
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists the DataBrew schedules that are defined.
 */
export const listSchedules: API.PaginatedOperationMethod<
  ListSchedulesRequest,
  ListSchedulesResponse,
  ListSchedulesError,
  Credentials | HttpClient.HttpClient,
  Schedule
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSchedulesRequest,
  output: ListSchedulesResponse,
  errors: [ValidationException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSchedules",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Schedules",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists all the tags for a DataBrew resource.
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
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type PublishRecipeError =
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Publishes a new version of a DataBrew recipe.
 */
export const publishRecipe: API.OperationMethod<
  PublishRecipeRequest,
  PublishRecipeResponse,
  PublishRecipeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PublishRecipeRequest,
  output: PublishRecipeResponse,
  errors: [
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PublishRecipe",
}));

export type SendProjectSessionActionError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Performs a recipe step within an interactive DataBrew session that's currently
 * open.
 */
export const sendProjectSessionAction: API.OperationMethod<
  SendProjectSessionActionRequest,
  SendProjectSessionActionResponse,
  SendProjectSessionActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SendProjectSessionActionRequest,
  output: SendProjectSessionActionResponse,
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendProjectSessionAction",
}));

export type StartJobRunError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Runs a DataBrew job.
 */
export const startJobRun: API.OperationMethod<
  StartJobRunRequest,
  StartJobRunResponse,
  StartJobRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartJobRunRequest,
  output: StartJobRunResponse,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartJobRun",
}));

export type StartProjectSessionError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates an interactive session, enabling you to manipulate data in a DataBrew
 * project.
 */
export const startProjectSession: API.OperationMethod<
  StartProjectSessionRequest,
  StartProjectSessionResponse,
  StartProjectSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartProjectSessionRequest,
  output: StartProjectSessionResponse,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartProjectSession",
}));

export type StopJobRunError =
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Stops a particular run of a job.
 */
export const stopJobRun: API.OperationMethod<
  StopJobRunRequest,
  StopJobRunResponse,
  StopJobRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopJobRunRequest,
  output: StopJobRunResponse,
  errors: [
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopJobRun",
}));

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Adds metadata tags to a DataBrew resource, such as a dataset, project, recipe, job, or
 * schedule.
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
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes metadata tags from a DataBrew resource.
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
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateDatasetError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Modifies the definition of an existing DataBrew dataset.
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
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataset",
}));

export type UpdateProfileJobError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | DataBrewRoleNotAssumable
  | CommonErrors;
/**
 * Modifies the definition of an existing profile job.
 */
export const updateProfileJob: API.OperationMethod<
  UpdateProfileJobRequest,
  UpdateProfileJobResponse,
  UpdateProfileJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateProfileJobRequest,
  output: UpdateProfileJobResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
    DataBrewRoleNotAssumable,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProfileJob",
}));

export type UpdateProjectError =
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | DataBrewRoleNotAssumable
  | CommonErrors;
/**
 * Modifies the definition of an existing DataBrew project.
 */
export const updateProject: API.OperationMethod<
  UpdateProjectRequest,
  UpdateProjectResponse,
  UpdateProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateProjectRequest,
  output: UpdateProjectResponse,
  errors: [
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
    DataBrewRoleNotAssumable,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProject",
}));

export type UpdateRecipeError =
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Modifies the definition of the `LATEST_WORKING` version of a DataBrew
 * recipe.
 */
export const updateRecipe: API.OperationMethod<
  UpdateRecipeRequest,
  UpdateRecipeResponse,
  UpdateRecipeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRecipeRequest,
  output: UpdateRecipeResponse,
  errors: [
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRecipe",
}));

export type UpdateRecipeJobError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | DataBrewRoleNotAssumable
  | CommonErrors;
/**
 * Modifies the definition of an existing DataBrew recipe job.
 */
export const updateRecipeJob: API.OperationMethod<
  UpdateRecipeJobRequest,
  UpdateRecipeJobResponse,
  UpdateRecipeJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRecipeJobRequest,
  output: UpdateRecipeJobResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
    DataBrewRoleNotAssumable,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRecipeJob",
}));

export type UpdateRulesetError =
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates specified ruleset.
 */
export const updateRuleset: API.OperationMethod<
  UpdateRulesetRequest,
  UpdateRulesetResponse,
  UpdateRulesetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRulesetRequest,
  output: UpdateRulesetResponse,
  errors: [
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRuleset",
}));

export type UpdateScheduleError =
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Modifies the definition of an existing DataBrew schedule.
 */
export const updateSchedule: API.OperationMethod<
  UpdateScheduleRequest,
  UpdateScheduleResponse,
  UpdateScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateScheduleRequest,
  output: UpdateScheduleResponse,
  errors: [
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSchedule",
}));
