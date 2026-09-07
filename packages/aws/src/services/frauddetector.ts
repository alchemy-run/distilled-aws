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
const ns = T.XmlNamespace("http://hawksnest.amazonaws.com/doc/2019-11-15");
const svc = T.AwsApiService({
  sdkId: "FraudDetector",
  serviceShapeName: "AWSHawksNestServiceFacade",
});
const auth = T.AwsAuthSigv4({ name: "frauddetector" });
const ver = T.ServiceVersion("2019-11-15");
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
              `https://frauddetector-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://frauddetector-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://frauddetector.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://frauddetector.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class ResourceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ResourceUnavailableException>()(
    "ResourceUnavailableException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
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
export interface VariableEntry {
  name?: string;
  dataType?: string;
  dataSource?: string;
  defaultValue?: string;
  description?: string;
  variableType?: string;
}
export const VariableEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    dataType: S.optional(S.String),
    dataSource: S.optional(S.String),
    defaultValue: S.optional(S.String),
    description: S.optional(S.String),
    variableType: S.optional(S.String),
  }),
).annotate({ identifier: "VariableEntry" }) as any as S.Schema<VariableEntry>;
export type VariableEntryList = VariableEntry[];
export const VariableEntryList = /*@__PURE__*/ S.Array(VariableEntry);
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  key: string;
  value: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.String, value: S.String }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = /*@__PURE__*/ S.Array(Tag);
export interface BatchCreateVariableRequest {
  variableEntries: VariableEntry[];
  tags?: Tag[];
}
export const BatchCreateVariableRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    variableEntries: VariableEntryList,
    tags: S.optional(TagList),
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
  identifier: "BatchCreateVariableRequest",
}) as any as S.Schema<BatchCreateVariableRequest>;
export type Integer2 = number;
export interface BatchCreateVariableError_ {
  name?: string;
  code?: number;
  message?: string;
}
export const BatchCreateVariableError_ = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    code: S.optional(S.Number),
    message: S.optional(S.String),
  }),
).annotate({
  identifier: "BatchCreateVariableError",
}) as any as S.Schema<BatchCreateVariableError_>;
export type BatchCreateVariableErrorList = BatchCreateVariableError_[];
export const BatchCreateVariableErrorList = /*@__PURE__*/ S.Array(
  BatchCreateVariableError_,
);
export interface BatchCreateVariableResult {
  errors?: BatchCreateVariableError_[];
}
export const BatchCreateVariableResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ errors: S.optional(BatchCreateVariableErrorList) }).pipe(ns),
).annotate({
  identifier: "BatchCreateVariableResult",
}) as any as S.Schema<BatchCreateVariableResult>;
export type NameList = string[];
export const NameList = /*@__PURE__*/ S.Array(S.String);
export interface BatchGetVariableRequest {
  names: string[];
}
export const BatchGetVariableRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ names: NameList }).pipe(
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
  identifier: "BatchGetVariableRequest",
}) as any as S.Schema<BatchGetVariableRequest>;
export type DataType =
  | "STRING"
  | "INTEGER"
  | "FLOAT"
  | "BOOLEAN"
  | "DATETIME"
  | (string & {});
export const DataType = /*@__PURE__*/ S.String;

export type DataSource =
  | "EVENT"
  | "MODEL_SCORE"
  | "EXTERNAL_MODEL_SCORE"
  | (string & {});
export const DataSource = /*@__PURE__*/ S.String;

export type FraudDetectorArn = string;
export interface Variable {
  name?: string;
  dataType?: DataType;
  dataSource?: DataSource;
  defaultValue?: string;
  description?: string;
  variableType?: string;
  lastUpdatedTime?: string;
  createdTime?: string;
  arn?: string;
}
export const Variable = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    dataType: S.optional(DataType),
    dataSource: S.optional(DataSource),
    defaultValue: S.optional(S.String),
    description: S.optional(S.String),
    variableType: S.optional(S.String),
    lastUpdatedTime: S.optional(S.String),
    createdTime: S.optional(S.String),
    arn: S.optional(S.String),
  }),
).annotate({ identifier: "Variable" }) as any as S.Schema<Variable>;
export type VariableList = Variable[];
export const VariableList = /*@__PURE__*/ S.Array(Variable);
export interface BatchGetVariableError_ {
  name?: string;
  code?: number;
  message?: string;
}
export const BatchGetVariableError_ = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    code: S.optional(S.Number),
    message: S.optional(S.String),
  }),
).annotate({
  identifier: "BatchGetVariableError",
}) as any as S.Schema<BatchGetVariableError_>;
export type BatchGetVariableErrorList = BatchGetVariableError_[];
export const BatchGetVariableErrorList = /*@__PURE__*/ S.Array(
  BatchGetVariableError_,
);
export interface BatchGetVariableResult {
  variables?: Variable[];
  errors?: BatchGetVariableError_[];
}
export const BatchGetVariableResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    variables: S.optional(VariableList),
    errors: S.optional(BatchGetVariableErrorList),
  }).pipe(ns),
).annotate({
  identifier: "BatchGetVariableResult",
}) as any as S.Schema<BatchGetVariableResult>;
export type Identifier = string;
export interface CancelBatchImportJobRequest {
  jobId: string;
}
export const CancelBatchImportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobId: S.String }).pipe(
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
  identifier: "CancelBatchImportJobRequest",
}) as any as S.Schema<CancelBatchImportJobRequest>;
export interface CancelBatchImportJobResult {}
export const CancelBatchImportJobResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "CancelBatchImportJobResult",
}) as any as S.Schema<CancelBatchImportJobResult>;
export interface CancelBatchPredictionJobRequest {
  jobId: string;
}
export const CancelBatchPredictionJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobId: S.String }).pipe(
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
  identifier: "CancelBatchPredictionJobRequest",
}) as any as S.Schema<CancelBatchPredictionJobRequest>;
export interface CancelBatchPredictionJobResult {}
export const CancelBatchPredictionJobResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "CancelBatchPredictionJobResult",
}) as any as S.Schema<CancelBatchPredictionJobResult>;
export type S3BucketLocation = string;
export type IamRoleArn = string;
export interface CreateBatchImportJobRequest {
  jobId: string;
  inputPath: string;
  outputPath: string;
  eventTypeName: string;
  iamRoleArn: string;
  tags?: Tag[];
}
export const CreateBatchImportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobId: S.String,
    inputPath: S.String,
    outputPath: S.String,
    eventTypeName: S.String,
    iamRoleArn: S.String,
    tags: S.optional(TagList),
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
  identifier: "CreateBatchImportJobRequest",
}) as any as S.Schema<CreateBatchImportJobRequest>;
export interface CreateBatchImportJobResult {}
export const CreateBatchImportJobResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "CreateBatchImportJobResult",
}) as any as S.Schema<CreateBatchImportJobResult>;
export type WholeNumberVersionString = string;
export interface CreateBatchPredictionJobRequest {
  jobId: string;
  inputPath: string;
  outputPath: string;
  eventTypeName: string;
  detectorName: string;
  detectorVersion?: string;
  iamRoleArn: string;
  tags?: Tag[];
}
export const CreateBatchPredictionJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobId: S.String,
    inputPath: S.String,
    outputPath: S.String,
    eventTypeName: S.String,
    detectorName: S.String,
    detectorVersion: S.optional(S.String),
    iamRoleArn: S.String,
    tags: S.optional(TagList),
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
  identifier: "CreateBatchPredictionJobRequest",
}) as any as S.Schema<CreateBatchPredictionJobRequest>;
export interface CreateBatchPredictionJobResult {}
export const CreateBatchPredictionJobResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "CreateBatchPredictionJobResult",
}) as any as S.Schema<CreateBatchPredictionJobResult>;
export type Description = string;
export type ListOfStrings = string[];
export const ListOfStrings = /*@__PURE__*/ S.Array(S.String);
export interface Rule {
  detectorId: string;
  ruleId: string;
  ruleVersion: string;
}
export const Rule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ detectorId: S.String, ruleId: S.String, ruleVersion: S.String }),
).annotate({ identifier: "Rule" }) as any as S.Schema<Rule>;
export type RuleList = Rule[];
export const RuleList = /*@__PURE__*/ S.Array(Rule);
export type ModelIdentifier = string;
export type ModelTypeEnum =
  | "ONLINE_FRAUD_INSIGHTS"
  | "TRANSACTION_FRAUD_INSIGHTS"
  | "ACCOUNT_TAKEOVER_INSIGHTS"
  | (string & {});
export const ModelTypeEnum = /*@__PURE__*/ S.String;

export type FloatVersionString = string;
export interface ModelVersion {
  modelId: string;
  modelType: ModelTypeEnum;
  modelVersionNumber: string;
  arn?: string;
}
export const ModelVersion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelId: S.String,
    modelType: ModelTypeEnum,
    modelVersionNumber: S.String,
    arn: S.optional(S.String),
  }),
).annotate({ identifier: "ModelVersion" }) as any as S.Schema<ModelVersion>;
export type ListOfModelVersions = ModelVersion[];
export const ListOfModelVersions = /*@__PURE__*/ S.Array(ModelVersion);
export type RuleExecutionMode = "ALL_MATCHED" | "FIRST_MATCHED" | (string & {});
export const RuleExecutionMode = /*@__PURE__*/ S.String;

export interface CreateDetectorVersionRequest {
  detectorId: string;
  description?: string;
  externalModelEndpoints?: string[];
  rules: Rule[];
  modelVersions?: ModelVersion[];
  ruleExecutionMode?: RuleExecutionMode;
  tags?: Tag[];
}
export const CreateDetectorVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    detectorId: S.String,
    description: S.optional(S.String),
    externalModelEndpoints: S.optional(ListOfStrings),
    rules: RuleList,
    modelVersions: S.optional(ListOfModelVersions),
    ruleExecutionMode: S.optional(RuleExecutionMode),
    tags: S.optional(TagList),
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
  identifier: "CreateDetectorVersionRequest",
}) as any as S.Schema<CreateDetectorVersionRequest>;
export type DetectorVersionStatus =
  | "DRAFT"
  | "ACTIVE"
  | "INACTIVE"
  | (string & {});
export const DetectorVersionStatus = /*@__PURE__*/ S.String;

export interface CreateDetectorVersionResult {
  detectorId?: string;
  detectorVersionId?: string;
  status?: DetectorVersionStatus;
}
export const CreateDetectorVersionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    detectorId: S.optional(S.String),
    detectorVersionId: S.optional(S.String),
    status: S.optional(DetectorVersionStatus),
  }).pipe(ns),
).annotate({
  identifier: "CreateDetectorVersionResult",
}) as any as S.Schema<CreateDetectorVersionResult>;
export type NoDashIdentifier = string;
export type Elements = string | redacted.Redacted<string>;
export type ElementsList = (string | redacted.Redacted<string>)[];
export const ElementsList = /*@__PURE__*/ S.Array(SensitiveString);
export type VariableType = string;
export interface CreateListRequest {
  name: string;
  elements?: (string | redacted.Redacted<string>)[];
  variableType?: string;
  description?: string;
  tags?: Tag[];
}
export const CreateListRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    elements: S.optional(ElementsList),
    variableType: S.optional(S.String),
    description: S.optional(S.String),
    tags: S.optional(TagList),
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
  identifier: "CreateListRequest",
}) as any as S.Schema<CreateListRequest>;
export interface CreateListResult {}
export const CreateListResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "CreateListResult",
}) as any as S.Schema<CreateListResult>;
export interface CreateModelRequest {
  modelId: string;
  modelType: ModelTypeEnum;
  description?: string;
  eventTypeName: string;
  tags?: Tag[];
}
export const CreateModelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelId: S.String,
    modelType: ModelTypeEnum,
    description: S.optional(S.String),
    eventTypeName: S.String,
    tags: S.optional(TagList),
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
  identifier: "CreateModelRequest",
}) as any as S.Schema<CreateModelRequest>;
export interface CreateModelResult {}
export const CreateModelResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "CreateModelResult",
}) as any as S.Schema<CreateModelResult>;
export type TrainingDataSourceEnum =
  | "EXTERNAL_EVENTS"
  | "INGESTED_EVENTS"
  | (string & {});
export const TrainingDataSourceEnum = /*@__PURE__*/ S.String;

export type LabelMapper = { [key: string]: string[] | undefined };
export const LabelMapper = /*@__PURE__*/ S.Record(
  S.String,
  ListOfStrings.pipe(S.optional),
);
export type UnlabeledEventsTreatment =
  | "IGNORE"
  | "FRAUD"
  | "LEGIT"
  | "AUTO"
  | (string & {});
export const UnlabeledEventsTreatment = /*@__PURE__*/ S.String;

export interface LabelSchema {
  labelMapper?: { [key: string]: string[] | undefined };
  unlabeledEventsTreatment?: UnlabeledEventsTreatment;
}
export const LabelSchema = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    labelMapper: S.optional(LabelMapper),
    unlabeledEventsTreatment: S.optional(UnlabeledEventsTreatment),
  }),
).annotate({ identifier: "LabelSchema" }) as any as S.Schema<LabelSchema>;
export interface TrainingDataSchema {
  modelVariables: string[];
  labelSchema?: LabelSchema;
}
export const TrainingDataSchema = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelVariables: ListOfStrings,
    labelSchema: S.optional(LabelSchema),
  }),
).annotate({
  identifier: "TrainingDataSchema",
}) as any as S.Schema<TrainingDataSchema>;
export interface ExternalEventsDetail {
  dataLocation: string;
  dataAccessRoleArn: string;
}
export const ExternalEventsDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ dataLocation: S.String, dataAccessRoleArn: S.String }),
).annotate({
  identifier: "ExternalEventsDetail",
}) as any as S.Schema<ExternalEventsDetail>;
export interface IngestedEventsTimeWindow {
  startTime: string;
  endTime: string;
}
export const IngestedEventsTimeWindow = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ startTime: S.String, endTime: S.String }),
).annotate({
  identifier: "IngestedEventsTimeWindow",
}) as any as S.Schema<IngestedEventsTimeWindow>;
export interface IngestedEventsDetail {
  ingestedEventsTimeWindow: IngestedEventsTimeWindow;
}
export const IngestedEventsDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ingestedEventsTimeWindow: IngestedEventsTimeWindow }),
).annotate({
  identifier: "IngestedEventsDetail",
}) as any as S.Schema<IngestedEventsDetail>;
export interface CreateModelVersionRequest {
  modelId: string;
  modelType: ModelTypeEnum;
  trainingDataSource: TrainingDataSourceEnum;
  trainingDataSchema: TrainingDataSchema;
  externalEventsDetail?: ExternalEventsDetail;
  ingestedEventsDetail?: IngestedEventsDetail;
  tags?: Tag[];
}
export const CreateModelVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelId: S.String,
    modelType: ModelTypeEnum,
    trainingDataSource: TrainingDataSourceEnum,
    trainingDataSchema: TrainingDataSchema,
    externalEventsDetail: S.optional(ExternalEventsDetail),
    ingestedEventsDetail: S.optional(IngestedEventsDetail),
    tags: S.optional(TagList),
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
  identifier: "CreateModelVersionRequest",
}) as any as S.Schema<CreateModelVersionRequest>;
export interface CreateModelVersionResult {
  modelId?: string;
  modelType?: ModelTypeEnum;
  modelVersionNumber?: string;
  status?: string;
}
export const CreateModelVersionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelId: S.optional(S.String),
    modelType: S.optional(ModelTypeEnum),
    modelVersionNumber: S.optional(S.String),
    status: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "CreateModelVersionResult",
}) as any as S.Schema<CreateModelVersionResult>;
export type RuleExpression = string | redacted.Redacted<string>;
export type Language = "DETECTORPL" | (string & {});
export const Language = /*@__PURE__*/ S.String;

export type NonEmptyListOfStrings = string[];
export const NonEmptyListOfStrings = /*@__PURE__*/ S.Array(S.String);
export interface CreateRuleRequest {
  ruleId: string;
  detectorId: string;
  description?: string;
  expression: string | redacted.Redacted<string>;
  language: Language;
  outcomes: string[];
  tags?: Tag[];
}
export const CreateRuleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ruleId: S.String,
    detectorId: S.String,
    description: S.optional(S.String),
    expression: SensitiveString,
    language: Language,
    outcomes: NonEmptyListOfStrings,
    tags: S.optional(TagList),
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
  identifier: "CreateRuleRequest",
}) as any as S.Schema<CreateRuleRequest>;
export interface CreateRuleResult {
  rule?: Rule;
}
export const CreateRuleResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ rule: S.optional(Rule) }).pipe(ns),
).annotate({
  identifier: "CreateRuleResult",
}) as any as S.Schema<CreateRuleResult>;
export interface CreateVariableRequest {
  name: string;
  dataType: DataType;
  dataSource: DataSource;
  defaultValue: string;
  description?: string;
  variableType?: string;
  tags?: Tag[];
}
export const CreateVariableRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    dataType: DataType,
    dataSource: DataSource,
    defaultValue: S.String,
    description: S.optional(S.String),
    variableType: S.optional(S.String),
    tags: S.optional(TagList),
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
  identifier: "CreateVariableRequest",
}) as any as S.Schema<CreateVariableRequest>;
export interface CreateVariableResult {}
export const CreateVariableResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "CreateVariableResult",
}) as any as S.Schema<CreateVariableResult>;
export interface DeleteBatchImportJobRequest {
  jobId: string;
}
export const DeleteBatchImportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobId: S.String }).pipe(
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
  identifier: "DeleteBatchImportJobRequest",
}) as any as S.Schema<DeleteBatchImportJobRequest>;
export interface DeleteBatchImportJobResult {}
export const DeleteBatchImportJobResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteBatchImportJobResult",
}) as any as S.Schema<DeleteBatchImportJobResult>;
export interface DeleteBatchPredictionJobRequest {
  jobId: string;
}
export const DeleteBatchPredictionJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobId: S.String }).pipe(
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
  identifier: "DeleteBatchPredictionJobRequest",
}) as any as S.Schema<DeleteBatchPredictionJobRequest>;
export interface DeleteBatchPredictionJobResult {}
export const DeleteBatchPredictionJobResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteBatchPredictionJobResult",
}) as any as S.Schema<DeleteBatchPredictionJobResult>;
export interface DeleteDetectorRequest {
  detectorId: string;
}
export const DeleteDetectorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ detectorId: S.String }).pipe(
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
  identifier: "DeleteDetectorRequest",
}) as any as S.Schema<DeleteDetectorRequest>;
export interface DeleteDetectorResult {}
export const DeleteDetectorResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteDetectorResult",
}) as any as S.Schema<DeleteDetectorResult>;
export interface DeleteDetectorVersionRequest {
  detectorId: string;
  detectorVersionId: string;
}
export const DeleteDetectorVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ detectorId: S.String, detectorVersionId: S.String }).pipe(
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
  identifier: "DeleteDetectorVersionRequest",
}) as any as S.Schema<DeleteDetectorVersionRequest>;
export interface DeleteDetectorVersionResult {}
export const DeleteDetectorVersionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteDetectorVersionResult",
}) as any as S.Schema<DeleteDetectorVersionResult>;
export interface DeleteEntityTypeRequest {
  name: string;
}
export const DeleteEntityTypeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String }).pipe(
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
  identifier: "DeleteEntityTypeRequest",
}) as any as S.Schema<DeleteEntityTypeRequest>;
export interface DeleteEntityTypeResult {}
export const DeleteEntityTypeResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteEntityTypeResult",
}) as any as S.Schema<DeleteEntityTypeResult>;
export type DeleteAuditHistory = boolean;
export interface DeleteEventRequest {
  eventId: string;
  eventTypeName: string;
  deleteAuditHistory?: boolean;
}
export const DeleteEventRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    eventId: S.String,
    eventTypeName: S.String,
    deleteAuditHistory: S.optional(S.Boolean),
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
  identifier: "DeleteEventRequest",
}) as any as S.Schema<DeleteEventRequest>;
export interface DeleteEventResult {}
export const DeleteEventResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteEventResult",
}) as any as S.Schema<DeleteEventResult>;
export interface DeleteEventsByEventTypeRequest {
  eventTypeName: string;
}
export const DeleteEventsByEventTypeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ eventTypeName: S.String }).pipe(
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
  identifier: "DeleteEventsByEventTypeRequest",
}) as any as S.Schema<DeleteEventsByEventTypeRequest>;
export interface DeleteEventsByEventTypeResult {
  eventTypeName?: string;
  eventsDeletionStatus?: string;
}
export const DeleteEventsByEventTypeResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    eventTypeName: S.optional(S.String),
    eventsDeletionStatus: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DeleteEventsByEventTypeResult",
}) as any as S.Schema<DeleteEventsByEventTypeResult>;
export interface DeleteEventTypeRequest {
  name: string;
}
export const DeleteEventTypeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String }).pipe(
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
  identifier: "DeleteEventTypeRequest",
}) as any as S.Schema<DeleteEventTypeRequest>;
export interface DeleteEventTypeResult {}
export const DeleteEventTypeResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteEventTypeResult",
}) as any as S.Schema<DeleteEventTypeResult>;
export type SageMakerEndpointIdentifier = string;
export interface DeleteExternalModelRequest {
  modelEndpoint: string;
}
export const DeleteExternalModelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ modelEndpoint: S.String }).pipe(
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
  identifier: "DeleteExternalModelRequest",
}) as any as S.Schema<DeleteExternalModelRequest>;
export interface DeleteExternalModelResult {}
export const DeleteExternalModelResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteExternalModelResult",
}) as any as S.Schema<DeleteExternalModelResult>;
export interface DeleteLabelRequest {
  name: string;
}
export const DeleteLabelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String }).pipe(
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
  identifier: "DeleteLabelRequest",
}) as any as S.Schema<DeleteLabelRequest>;
export interface DeleteLabelResult {}
export const DeleteLabelResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteLabelResult",
}) as any as S.Schema<DeleteLabelResult>;
export interface DeleteListRequest {
  name: string;
}
export const DeleteListRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String }).pipe(
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
  identifier: "DeleteListRequest",
}) as any as S.Schema<DeleteListRequest>;
export interface DeleteListResult {}
export const DeleteListResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteListResult",
}) as any as S.Schema<DeleteListResult>;
export interface DeleteModelRequest {
  modelId: string;
  modelType: ModelTypeEnum;
}
export const DeleteModelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ modelId: S.String, modelType: ModelTypeEnum }).pipe(
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
  identifier: "DeleteModelRequest",
}) as any as S.Schema<DeleteModelRequest>;
export interface DeleteModelResult {}
export const DeleteModelResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteModelResult",
}) as any as S.Schema<DeleteModelResult>;
export interface DeleteModelVersionRequest {
  modelId: string;
  modelType: ModelTypeEnum;
  modelVersionNumber: string;
}
export const DeleteModelVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelId: S.String,
    modelType: ModelTypeEnum,
    modelVersionNumber: S.String,
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
  identifier: "DeleteModelVersionRequest",
}) as any as S.Schema<DeleteModelVersionRequest>;
export interface DeleteModelVersionResult {}
export const DeleteModelVersionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteModelVersionResult",
}) as any as S.Schema<DeleteModelVersionResult>;
export interface DeleteOutcomeRequest {
  name: string;
}
export const DeleteOutcomeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String }).pipe(
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
  identifier: "DeleteOutcomeRequest",
}) as any as S.Schema<DeleteOutcomeRequest>;
export interface DeleteOutcomeResult {}
export const DeleteOutcomeResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteOutcomeResult",
}) as any as S.Schema<DeleteOutcomeResult>;
export interface DeleteRuleRequest {
  rule: Rule;
}
export const DeleteRuleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ rule: Rule }).pipe(
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
  identifier: "DeleteRuleRequest",
}) as any as S.Schema<DeleteRuleRequest>;
export interface DeleteRuleResult {}
export const DeleteRuleResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteRuleResult",
}) as any as S.Schema<DeleteRuleResult>;
export interface DeleteVariableRequest {
  name: string;
}
export const DeleteVariableRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String }).pipe(
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
  identifier: "DeleteVariableRequest",
}) as any as S.Schema<DeleteVariableRequest>;
export interface DeleteVariableResult {}
export const DeleteVariableResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteVariableResult",
}) as any as S.Schema<DeleteVariableResult>;
export type DetectorVersionMaxResults = number;
export interface DescribeDetectorRequest {
  detectorId: string;
  nextToken?: string;
  maxResults?: number;
}
export const DescribeDetectorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    detectorId: S.String,
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
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
  identifier: "DescribeDetectorRequest",
}) as any as S.Schema<DescribeDetectorRequest>;
export interface DetectorVersionSummary {
  detectorVersionId?: string;
  status?: DetectorVersionStatus;
  description?: string;
  lastUpdatedTime?: string;
}
export const DetectorVersionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    detectorVersionId: S.optional(S.String),
    status: S.optional(DetectorVersionStatus),
    description: S.optional(S.String),
    lastUpdatedTime: S.optional(S.String),
  }),
).annotate({
  identifier: "DetectorVersionSummary",
}) as any as S.Schema<DetectorVersionSummary>;
export type DetectorVersionSummaryList = DetectorVersionSummary[];
export const DetectorVersionSummaryList = /*@__PURE__*/ S.Array(
  DetectorVersionSummary,
);
export interface DescribeDetectorResult {
  detectorId?: string;
  detectorVersionSummaries?: DetectorVersionSummary[];
  nextToken?: string;
  arn?: string;
}
export const DescribeDetectorResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    detectorId: S.optional(S.String),
    detectorVersionSummaries: S.optional(DetectorVersionSummaryList),
    nextToken: S.optional(S.String),
    arn: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeDetectorResult",
}) as any as S.Schema<DescribeDetectorResult>;
export type ModelsMaxPageSize = number;
export interface DescribeModelVersionsRequest {
  modelId?: string;
  modelVersionNumber?: string;
  modelType?: ModelTypeEnum;
  nextToken?: string;
  maxResults?: number;
}
export const DescribeModelVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelId: S.optional(S.String),
    modelVersionNumber: S.optional(S.String),
    modelType: S.optional(ModelTypeEnum),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
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
  identifier: "DescribeModelVersionsRequest",
}) as any as S.Schema<DescribeModelVersionsRequest>;
export interface FileValidationMessage {
  title?: string;
  content?: string;
  type?: string;
}
export const FileValidationMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    title: S.optional(S.String),
    content: S.optional(S.String),
    type: S.optional(S.String),
  }),
).annotate({
  identifier: "FileValidationMessage",
}) as any as S.Schema<FileValidationMessage>;
export type FileValidationMessageList = FileValidationMessage[];
export const FileValidationMessageList = /*@__PURE__*/ S.Array(
  FileValidationMessage,
);
export interface FieldValidationMessage {
  fieldName?: string;
  identifier?: string;
  title?: string;
  content?: string;
  type?: string;
}
export const FieldValidationMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fieldName: S.optional(S.String),
    identifier: S.optional(S.String),
    title: S.optional(S.String),
    content: S.optional(S.String),
    type: S.optional(S.String),
  }),
).annotate({
  identifier: "FieldValidationMessage",
}) as any as S.Schema<FieldValidationMessage>;
export type FieldValidationMessageList = FieldValidationMessage[];
export const FieldValidationMessageList = /*@__PURE__*/ S.Array(
  FieldValidationMessage,
);
export interface DataValidationMetrics {
  fileLevelMessages?: FileValidationMessage[];
  fieldLevelMessages?: FieldValidationMessage[];
}
export const DataValidationMetrics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fileLevelMessages: S.optional(FileValidationMessageList),
    fieldLevelMessages: S.optional(FieldValidationMessageList),
  }),
).annotate({
  identifier: "DataValidationMetrics",
}) as any as S.Schema<DataValidationMetrics>;
export interface MetricDataPoint {
  fpr?: number;
  precision?: number;
  tpr?: number;
  threshold?: number;
}
export const MetricDataPoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fpr: S.optional(S.Number),
    precision: S.optional(S.Number),
    tpr: S.optional(S.Number),
    threshold: S.optional(S.Number),
  }),
).annotate({
  identifier: "MetricDataPoint",
}) as any as S.Schema<MetricDataPoint>;
export type MetricDataPointsList = MetricDataPoint[];
export const MetricDataPointsList = /*@__PURE__*/ S.Array(MetricDataPoint);
export interface TrainingMetrics {
  auc?: number;
  metricDataPoints?: MetricDataPoint[];
}
export const TrainingMetrics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    auc: S.optional(S.Number),
    metricDataPoints: S.optional(MetricDataPointsList),
  }),
).annotate({
  identifier: "TrainingMetrics",
}) as any as S.Schema<TrainingMetrics>;
export interface LogOddsMetric {
  variableName: string;
  variableType: string;
  variableImportance: number;
}
export const LogOddsMetric = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    variableName: S.String,
    variableType: S.String,
    variableImportance: S.Number,
  }),
).annotate({ identifier: "LogOddsMetric" }) as any as S.Schema<LogOddsMetric>;
export type ListOfLogOddsMetrics = LogOddsMetric[];
export const ListOfLogOddsMetrics = /*@__PURE__*/ S.Array(LogOddsMetric);
export interface VariableImportanceMetrics {
  logOddsMetrics?: LogOddsMetric[];
}
export const VariableImportanceMetrics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ logOddsMetrics: S.optional(ListOfLogOddsMetrics) }),
).annotate({
  identifier: "VariableImportanceMetrics",
}) as any as S.Schema<VariableImportanceMetrics>;
export interface TrainingResult {
  dataValidationMetrics?: DataValidationMetrics;
  trainingMetrics?: TrainingMetrics;
  variableImportanceMetrics?: VariableImportanceMetrics;
}
export const TrainingResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dataValidationMetrics: S.optional(DataValidationMetrics),
    trainingMetrics: S.optional(TrainingMetrics),
    variableImportanceMetrics: S.optional(VariableImportanceMetrics),
  }),
).annotate({ identifier: "TrainingResult" }) as any as S.Schema<TrainingResult>;
export interface OFIMetricDataPoint {
  fpr?: number;
  precision?: number;
  tpr?: number;
  threshold?: number;
}
export const OFIMetricDataPoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fpr: S.optional(S.Number),
    precision: S.optional(S.Number),
    tpr: S.optional(S.Number),
    threshold: S.optional(S.Number),
  }),
).annotate({
  identifier: "OFIMetricDataPoint",
}) as any as S.Schema<OFIMetricDataPoint>;
export type OFIMetricDataPointsList = OFIMetricDataPoint[];
export const OFIMetricDataPointsList =
  /*@__PURE__*/ S.Array(OFIMetricDataPoint);
export interface UncertaintyRange {
  lowerBoundValue: number;
  upperBoundValue: number;
}
export const UncertaintyRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ lowerBoundValue: S.Number, upperBoundValue: S.Number }),
).annotate({
  identifier: "UncertaintyRange",
}) as any as S.Schema<UncertaintyRange>;
export interface OFIModelPerformance {
  auc?: number;
  uncertaintyRange?: UncertaintyRange;
}
export const OFIModelPerformance = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    auc: S.optional(S.Number),
    uncertaintyRange: S.optional(UncertaintyRange),
  }),
).annotate({
  identifier: "OFIModelPerformance",
}) as any as S.Schema<OFIModelPerformance>;
export interface OFITrainingMetricsValue {
  metricDataPoints?: OFIMetricDataPoint[];
  modelPerformance?: OFIModelPerformance;
}
export const OFITrainingMetricsValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    metricDataPoints: S.optional(OFIMetricDataPointsList),
    modelPerformance: S.optional(OFIModelPerformance),
  }),
).annotate({
  identifier: "OFITrainingMetricsValue",
}) as any as S.Schema<OFITrainingMetricsValue>;
export interface TFIMetricDataPoint {
  fpr?: number;
  precision?: number;
  tpr?: number;
  threshold?: number;
}
export const TFIMetricDataPoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fpr: S.optional(S.Number),
    precision: S.optional(S.Number),
    tpr: S.optional(S.Number),
    threshold: S.optional(S.Number),
  }),
).annotate({
  identifier: "TFIMetricDataPoint",
}) as any as S.Schema<TFIMetricDataPoint>;
export type TFIMetricDataPointsList = TFIMetricDataPoint[];
export const TFIMetricDataPointsList =
  /*@__PURE__*/ S.Array(TFIMetricDataPoint);
export interface TFIModelPerformance {
  auc?: number;
  uncertaintyRange?: UncertaintyRange;
}
export const TFIModelPerformance = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    auc: S.optional(S.Number),
    uncertaintyRange: S.optional(UncertaintyRange),
  }),
).annotate({
  identifier: "TFIModelPerformance",
}) as any as S.Schema<TFIModelPerformance>;
export interface TFITrainingMetricsValue {
  metricDataPoints?: TFIMetricDataPoint[];
  modelPerformance?: TFIModelPerformance;
}
export const TFITrainingMetricsValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    metricDataPoints: S.optional(TFIMetricDataPointsList),
    modelPerformance: S.optional(TFIModelPerformance),
  }),
).annotate({
  identifier: "TFITrainingMetricsValue",
}) as any as S.Schema<TFITrainingMetricsValue>;
export interface ATIMetricDataPoint {
  cr?: number;
  adr?: number;
  threshold?: number;
  atodr?: number;
}
export const ATIMetricDataPoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cr: S.optional(S.Number),
    adr: S.optional(S.Number),
    threshold: S.optional(S.Number),
    atodr: S.optional(S.Number),
  }),
).annotate({
  identifier: "ATIMetricDataPoint",
}) as any as S.Schema<ATIMetricDataPoint>;
export type ATIMetricDataPointsList = ATIMetricDataPoint[];
export const ATIMetricDataPointsList =
  /*@__PURE__*/ S.Array(ATIMetricDataPoint);
export interface ATIModelPerformance {
  asi?: number;
}
export const ATIModelPerformance = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ asi: S.optional(S.Number) }),
).annotate({
  identifier: "ATIModelPerformance",
}) as any as S.Schema<ATIModelPerformance>;
export interface ATITrainingMetricsValue {
  metricDataPoints?: ATIMetricDataPoint[];
  modelPerformance?: ATIModelPerformance;
}
export const ATITrainingMetricsValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    metricDataPoints: S.optional(ATIMetricDataPointsList),
    modelPerformance: S.optional(ATIModelPerformance),
  }),
).annotate({
  identifier: "ATITrainingMetricsValue",
}) as any as S.Schema<ATITrainingMetricsValue>;
export interface TrainingMetricsV2 {
  ofi?: OFITrainingMetricsValue;
  tfi?: TFITrainingMetricsValue;
  ati?: ATITrainingMetricsValue;
}
export const TrainingMetricsV2 = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ofi: S.optional(OFITrainingMetricsValue),
    tfi: S.optional(TFITrainingMetricsValue),
    ati: S.optional(ATITrainingMetricsValue),
  }),
).annotate({
  identifier: "TrainingMetricsV2",
}) as any as S.Schema<TrainingMetricsV2>;
export interface AggregatedLogOddsMetric {
  variableNames: string[];
  aggregatedVariablesImportance: number;
}
export const AggregatedLogOddsMetric = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    variableNames: ListOfStrings,
    aggregatedVariablesImportance: S.Number,
  }),
).annotate({
  identifier: "AggregatedLogOddsMetric",
}) as any as S.Schema<AggregatedLogOddsMetric>;
export type ListOfAggregatedLogOddsMetrics = AggregatedLogOddsMetric[];
export const ListOfAggregatedLogOddsMetrics = /*@__PURE__*/ S.Array(
  AggregatedLogOddsMetric,
);
export interface AggregatedVariablesImportanceMetrics {
  logOddsMetrics?: AggregatedLogOddsMetric[];
}
export const AggregatedVariablesImportanceMetrics = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ logOddsMetrics: S.optional(ListOfAggregatedLogOddsMetrics) }),
).annotate({
  identifier: "AggregatedVariablesImportanceMetrics",
}) as any as S.Schema<AggregatedVariablesImportanceMetrics>;
export interface TrainingResultV2 {
  dataValidationMetrics?: DataValidationMetrics;
  trainingMetricsV2?: TrainingMetricsV2;
  variableImportanceMetrics?: VariableImportanceMetrics;
  aggregatedVariablesImportanceMetrics?: AggregatedVariablesImportanceMetrics;
}
export const TrainingResultV2 = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dataValidationMetrics: S.optional(DataValidationMetrics),
    trainingMetricsV2: S.optional(TrainingMetricsV2),
    variableImportanceMetrics: S.optional(VariableImportanceMetrics),
    aggregatedVariablesImportanceMetrics: S.optional(
      AggregatedVariablesImportanceMetrics,
    ),
  }),
).annotate({
  identifier: "TrainingResultV2",
}) as any as S.Schema<TrainingResultV2>;
export interface ModelVersionDetail {
  modelId?: string;
  modelType?: ModelTypeEnum;
  modelVersionNumber?: string;
  status?: string;
  trainingDataSource?: TrainingDataSourceEnum;
  trainingDataSchema?: TrainingDataSchema;
  externalEventsDetail?: ExternalEventsDetail;
  ingestedEventsDetail?: IngestedEventsDetail;
  trainingResult?: TrainingResult;
  lastUpdatedTime?: string;
  createdTime?: string;
  arn?: string;
  trainingResultV2?: TrainingResultV2;
}
export const ModelVersionDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelId: S.optional(S.String),
    modelType: S.optional(ModelTypeEnum),
    modelVersionNumber: S.optional(S.String),
    status: S.optional(S.String),
    trainingDataSource: S.optional(TrainingDataSourceEnum),
    trainingDataSchema: S.optional(TrainingDataSchema),
    externalEventsDetail: S.optional(ExternalEventsDetail),
    ingestedEventsDetail: S.optional(IngestedEventsDetail),
    trainingResult: S.optional(TrainingResult),
    lastUpdatedTime: S.optional(S.String),
    createdTime: S.optional(S.String),
    arn: S.optional(S.String),
    trainingResultV2: S.optional(TrainingResultV2),
  }),
).annotate({
  identifier: "ModelVersionDetail",
}) as any as S.Schema<ModelVersionDetail>;
export type ModelVersionDetailList = ModelVersionDetail[];
export const ModelVersionDetailList = /*@__PURE__*/ S.Array(ModelVersionDetail);
export interface DescribeModelVersionsResult {
  modelVersionDetails?: ModelVersionDetail[];
  nextToken?: string;
}
export const DescribeModelVersionsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelVersionDetails: S.optional(ModelVersionDetailList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeModelVersionsResult",
}) as any as S.Schema<DescribeModelVersionsResult>;
export type BatchImportsMaxPageSize = number;
export interface GetBatchImportJobsRequest {
  jobId?: string;
  maxResults?: number;
  nextToken?: string;
}
export const GetBatchImportJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobId: S.optional(S.String),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
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
  identifier: "GetBatchImportJobsRequest",
}) as any as S.Schema<GetBatchImportJobsRequest>;
export type AsyncJobStatus =
  | "IN_PROGRESS_INITIALIZING"
  | "IN_PROGRESS"
  | "CANCEL_IN_PROGRESS"
  | "CANCELED"
  | "COMPLETE"
  | "FAILED"
  | (string & {});
export const AsyncJobStatus = /*@__PURE__*/ S.String;

export interface BatchImport {
  jobId?: string;
  status?: AsyncJobStatus;
  failureReason?: string;
  startTime?: string;
  completionTime?: string;
  inputPath?: string;
  outputPath?: string;
  eventTypeName?: string;
  iamRoleArn?: string;
  arn?: string;
  processedRecordsCount?: number;
  failedRecordsCount?: number;
  totalRecordsCount?: number;
}
export const BatchImport = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobId: S.optional(S.String),
    status: S.optional(AsyncJobStatus),
    failureReason: S.optional(S.String),
    startTime: S.optional(S.String),
    completionTime: S.optional(S.String),
    inputPath: S.optional(S.String),
    outputPath: S.optional(S.String),
    eventTypeName: S.optional(S.String),
    iamRoleArn: S.optional(S.String),
    arn: S.optional(S.String),
    processedRecordsCount: S.optional(S.Number),
    failedRecordsCount: S.optional(S.Number),
    totalRecordsCount: S.optional(S.Number),
  }),
).annotate({ identifier: "BatchImport" }) as any as S.Schema<BatchImport>;
export type BatchImportList = BatchImport[];
export const BatchImportList = /*@__PURE__*/ S.Array(BatchImport);
export interface GetBatchImportJobsResult {
  batchImports?: BatchImport[];
  nextToken?: string;
}
export const GetBatchImportJobsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    batchImports: S.optional(BatchImportList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetBatchImportJobsResult",
}) as any as S.Schema<GetBatchImportJobsResult>;
export type BatchPredictionsMaxPageSize = number;
export interface GetBatchPredictionJobsRequest {
  jobId?: string;
  maxResults?: number;
  nextToken?: string;
}
export const GetBatchPredictionJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobId: S.optional(S.String),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
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
  identifier: "GetBatchPredictionJobsRequest",
}) as any as S.Schema<GetBatchPredictionJobsRequest>;
export interface BatchPrediction {
  jobId?: string;
  status?: AsyncJobStatus;
  failureReason?: string;
  startTime?: string;
  completionTime?: string;
  lastHeartbeatTime?: string;
  inputPath?: string;
  outputPath?: string;
  eventTypeName?: string;
  detectorName?: string;
  detectorVersion?: string;
  iamRoleArn?: string;
  arn?: string;
  processedRecordsCount?: number;
  totalRecordsCount?: number;
}
export const BatchPrediction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobId: S.optional(S.String),
    status: S.optional(AsyncJobStatus),
    failureReason: S.optional(S.String),
    startTime: S.optional(S.String),
    completionTime: S.optional(S.String),
    lastHeartbeatTime: S.optional(S.String),
    inputPath: S.optional(S.String),
    outputPath: S.optional(S.String),
    eventTypeName: S.optional(S.String),
    detectorName: S.optional(S.String),
    detectorVersion: S.optional(S.String),
    iamRoleArn: S.optional(S.String),
    arn: S.optional(S.String),
    processedRecordsCount: S.optional(S.Number),
    totalRecordsCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "BatchPrediction",
}) as any as S.Schema<BatchPrediction>;
export type BatchPredictionList = BatchPrediction[];
export const BatchPredictionList = /*@__PURE__*/ S.Array(BatchPrediction);
export interface GetBatchPredictionJobsResult {
  batchPredictions?: BatchPrediction[];
  nextToken?: string;
}
export const GetBatchPredictionJobsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    batchPredictions: S.optional(BatchPredictionList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetBatchPredictionJobsResult",
}) as any as S.Schema<GetBatchPredictionJobsResult>;
export interface GetDeleteEventsByEventTypeStatusRequest {
  eventTypeName: string;
}
export const GetDeleteEventsByEventTypeStatusRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ eventTypeName: S.String }).pipe(
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
  identifier: "GetDeleteEventsByEventTypeStatusRequest",
}) as any as S.Schema<GetDeleteEventsByEventTypeStatusRequest>;
export interface GetDeleteEventsByEventTypeStatusResult {
  eventTypeName?: string;
  eventsDeletionStatus?: AsyncJobStatus;
}
export const GetDeleteEventsByEventTypeStatusResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      eventTypeName: S.optional(S.String),
      eventsDeletionStatus: S.optional(AsyncJobStatus),
    }).pipe(ns),
).annotate({
  identifier: "GetDeleteEventsByEventTypeStatusResult",
}) as any as S.Schema<GetDeleteEventsByEventTypeStatusResult>;
export type DetectorsMaxResults = number;
export interface GetDetectorsRequest {
  detectorId?: string;
  nextToken?: string;
  maxResults?: number;
}
export const GetDetectorsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    detectorId: S.optional(S.String),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
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
  identifier: "GetDetectorsRequest",
}) as any as S.Schema<GetDetectorsRequest>;
export interface Detector {
  detectorId?: string;
  description?: string;
  eventTypeName?: string;
  lastUpdatedTime?: string;
  createdTime?: string;
  arn?: string;
}
export const Detector = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    detectorId: S.optional(S.String),
    description: S.optional(S.String),
    eventTypeName: S.optional(S.String),
    lastUpdatedTime: S.optional(S.String),
    createdTime: S.optional(S.String),
    arn: S.optional(S.String),
  }),
).annotate({ identifier: "Detector" }) as any as S.Schema<Detector>;
export type DetectorList = Detector[];
export const DetectorList = /*@__PURE__*/ S.Array(Detector);
export interface GetDetectorsResult {
  detectors?: Detector[];
  nextToken?: string;
}
export const GetDetectorsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    detectors: S.optional(DetectorList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetDetectorsResult",
}) as any as S.Schema<GetDetectorsResult>;
export interface GetDetectorVersionRequest {
  detectorId: string;
  detectorVersionId: string;
}
export const GetDetectorVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ detectorId: S.String, detectorVersionId: S.String }).pipe(
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
  identifier: "GetDetectorVersionRequest",
}) as any as S.Schema<GetDetectorVersionRequest>;
export interface GetDetectorVersionResult {
  detectorId?: string;
  detectorVersionId?: string;
  description?: string;
  externalModelEndpoints?: string[];
  modelVersions?: ModelVersion[];
  rules?: Rule[];
  status?: DetectorVersionStatus;
  lastUpdatedTime?: string;
  createdTime?: string;
  ruleExecutionMode?: RuleExecutionMode;
  arn?: string;
}
export const GetDetectorVersionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    detectorId: S.optional(S.String),
    detectorVersionId: S.optional(S.String),
    description: S.optional(S.String),
    externalModelEndpoints: S.optional(ListOfStrings),
    modelVersions: S.optional(ListOfModelVersions),
    rules: S.optional(RuleList),
    status: S.optional(DetectorVersionStatus),
    lastUpdatedTime: S.optional(S.String),
    createdTime: S.optional(S.String),
    ruleExecutionMode: S.optional(RuleExecutionMode),
    arn: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetDetectorVersionResult",
}) as any as S.Schema<GetDetectorVersionResult>;
export type EntityTypesMaxResults = number;
export interface GetEntityTypesRequest {
  name?: string;
  nextToken?: string;
  maxResults?: number;
}
export const GetEntityTypesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
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
  identifier: "GetEntityTypesRequest",
}) as any as S.Schema<GetEntityTypesRequest>;
export interface EntityType {
  name?: string;
  description?: string;
  lastUpdatedTime?: string;
  createdTime?: string;
  arn?: string;
}
export const EntityType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    description: S.optional(S.String),
    lastUpdatedTime: S.optional(S.String),
    createdTime: S.optional(S.String),
    arn: S.optional(S.String),
  }),
).annotate({ identifier: "EntityType" }) as any as S.Schema<EntityType>;
export type EntityTypeList = EntityType[];
export const EntityTypeList = /*@__PURE__*/ S.Array(EntityType);
export interface GetEntityTypesResult {
  entityTypes?: EntityType[];
  nextToken?: string;
}
export const GetEntityTypesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    entityTypes: S.optional(EntityTypeList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetEntityTypesResult",
}) as any as S.Schema<GetEntityTypesResult>;
export interface GetEventRequest {
  eventId: string;
  eventTypeName: string;
}
export const GetEventRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ eventId: S.String, eventTypeName: S.String }).pipe(
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
  identifier: "GetEventRequest",
}) as any as S.Schema<GetEventRequest>;
export type AttributeKey = string;
export type AttributeValue = string | redacted.Redacted<string>;
export type EventAttributeMap = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export const EventAttributeMap = /*@__PURE__*/ S.Record(
  S.String,
  SensitiveString.pipe(S.optional),
);
export type EntityRestrictedString = string;
export interface Entity {
  entityType: string;
  entityId: string;
}
export const Entity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ entityType: S.String, entityId: S.String }),
).annotate({ identifier: "Entity" }) as any as S.Schema<Entity>;
export type ListOfEntities = Entity[];
export const ListOfEntities = /*@__PURE__*/ S.Array(Entity);
export interface Event {
  eventId?: string;
  eventTypeName?: string;
  eventTimestamp?: string;
  eventVariables?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
  currentLabel?: string;
  labelTimestamp?: string;
  entities?: Entity[];
}
export const Event = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    eventId: S.optional(S.String),
    eventTypeName: S.optional(S.String),
    eventTimestamp: S.optional(S.String),
    eventVariables: S.optional(EventAttributeMap),
    currentLabel: S.optional(S.String),
    labelTimestamp: S.optional(S.String),
    entities: S.optional(ListOfEntities),
  }),
).annotate({ identifier: "Event" }) as any as S.Schema<Event>;
export interface GetEventResult {
  event?: Event;
}
export const GetEventResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ event: S.optional(Event) }).pipe(ns),
).annotate({ identifier: "GetEventResult" }) as any as S.Schema<GetEventResult>;
export type UtcTimestampISO8601 = string;
export type VariableName = string;
export type VariableValue = string | redacted.Redacted<string>;
export type EventVariableMap = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export const EventVariableMap = /*@__PURE__*/ S.Record(
  S.String,
  SensitiveString.pipe(S.optional),
);
export type ContentType = string;
export interface ModelEndpointDataBlob {
  byteBuffer?: Uint8Array;
  contentType?: string;
}
export const ModelEndpointDataBlob = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    byteBuffer: S.optional(T.Blob),
    contentType: S.optional(S.String),
  }),
).annotate({
  identifier: "ModelEndpointDataBlob",
}) as any as S.Schema<ModelEndpointDataBlob>;
export type ExternalModelEndpointDataBlobMap = {
  [key: string]: ModelEndpointDataBlob | undefined;
};
export const ExternalModelEndpointDataBlobMap = /*@__PURE__*/ S.Record(
  S.String,
  ModelEndpointDataBlob.pipe(S.optional),
);
export interface GetEventPredictionRequest {
  detectorId: string;
  detectorVersionId?: string;
  eventId: string;
  eventTypeName: string;
  entities: Entity[];
  eventTimestamp: string;
  eventVariables: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
  externalModelEndpointDataBlobs?: {
    [key: string]: ModelEndpointDataBlob | undefined;
  };
}
export const GetEventPredictionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    detectorId: S.String,
    detectorVersionId: S.optional(S.String),
    eventId: S.String,
    eventTypeName: S.String,
    entities: ListOfEntities,
    eventTimestamp: S.String,
    eventVariables: EventVariableMap,
    externalModelEndpointDataBlobs: S.optional(
      ExternalModelEndpointDataBlobMap,
    ),
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
  identifier: "GetEventPredictionRequest",
}) as any as S.Schema<GetEventPredictionRequest>;
export type ModelPredictionMap = { [key: string]: number | undefined };
export const ModelPredictionMap = /*@__PURE__*/ S.Record(
  S.String,
  S.Number.pipe(S.optional),
);
export interface ModelScores {
  modelVersion?: ModelVersion;
  scores?: { [key: string]: number | undefined };
}
export const ModelScores = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelVersion: S.optional(ModelVersion),
    scores: S.optional(ModelPredictionMap),
  }),
).annotate({ identifier: "ModelScores" }) as any as S.Schema<ModelScores>;
export type ListOfModelScores = ModelScores[];
export const ListOfModelScores = /*@__PURE__*/ S.Array(ModelScores);
export interface RuleResult {
  ruleId?: string;
  outcomes?: string[];
}
export const RuleResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ruleId: S.optional(S.String),
    outcomes: S.optional(ListOfStrings),
  }),
).annotate({ identifier: "RuleResult" }) as any as S.Schema<RuleResult>;
export type ListOfRuleResults = RuleResult[];
export const ListOfRuleResults = /*@__PURE__*/ S.Array(RuleResult);
export type ModelSource = "SAGEMAKER" | (string & {});
export const ModelSource = /*@__PURE__*/ S.String;

export interface ExternalModelSummary {
  modelEndpoint?: string;
  modelSource?: ModelSource;
}
export const ExternalModelSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelEndpoint: S.optional(S.String),
    modelSource: S.optional(ModelSource),
  }),
).annotate({
  identifier: "ExternalModelSummary",
}) as any as S.Schema<ExternalModelSummary>;
export type ExternalModelPredictionMap = { [key: string]: string | undefined };
export const ExternalModelPredictionMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface ExternalModelOutputs {
  externalModel?: ExternalModelSummary;
  outputs?: { [key: string]: string | undefined };
}
export const ExternalModelOutputs = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    externalModel: S.optional(ExternalModelSummary),
    outputs: S.optional(ExternalModelPredictionMap),
  }),
).annotate({
  identifier: "ExternalModelOutputs",
}) as any as S.Schema<ExternalModelOutputs>;
export type ListOfExternalModelOutputs = ExternalModelOutputs[];
export const ListOfExternalModelOutputs =
  /*@__PURE__*/ S.Array(ExternalModelOutputs);
export interface GetEventPredictionResult {
  modelScores?: ModelScores[];
  ruleResults?: RuleResult[];
  externalModelOutputs?: ExternalModelOutputs[];
}
export const GetEventPredictionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelScores: S.optional(ListOfModelScores),
    ruleResults: S.optional(ListOfRuleResults),
    externalModelOutputs: S.optional(ListOfExternalModelOutputs),
  }).pipe(ns),
).annotate({
  identifier: "GetEventPredictionResult",
}) as any as S.Schema<GetEventPredictionResult>;
export interface GetEventPredictionMetadataRequest {
  eventId: string;
  eventTypeName: string;
  detectorId: string;
  detectorVersionId: string;
  predictionTimestamp: string;
}
export const GetEventPredictionMetadataRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    eventId: S.String,
    eventTypeName: S.String,
    detectorId: S.String,
    detectorVersionId: S.String,
    predictionTimestamp: S.String,
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
  identifier: "GetEventPredictionMetadataRequest",
}) as any as S.Schema<GetEventPredictionMetadataRequest>;
export type SensitiveString = string | redacted.Redacted<string>;
export interface EventVariableSummary {
  name?: string | redacted.Redacted<string>;
  value?: string | redacted.Redacted<string>;
  source?: string | redacted.Redacted<string>;
}
export const EventVariableSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(SensitiveString),
    value: S.optional(SensitiveString),
    source: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "EventVariableSummary",
}) as any as S.Schema<EventVariableSummary>;
export type ListOfEventVariableSummaries = EventVariableSummary[];
export const ListOfEventVariableSummaries =
  /*@__PURE__*/ S.Array(EventVariableSummary);
export interface EvaluatedRule {
  ruleId?: string;
  ruleVersion?: string;
  expression?: string | redacted.Redacted<string>;
  expressionWithValues?: string | redacted.Redacted<string>;
  outcomes?: string[];
  evaluated?: boolean;
  matched?: boolean;
}
export const EvaluatedRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ruleId: S.optional(S.String),
    ruleVersion: S.optional(S.String),
    expression: S.optional(SensitiveString),
    expressionWithValues: S.optional(SensitiveString),
    outcomes: S.optional(ListOfStrings),
    evaluated: S.optional(S.Boolean),
    matched: S.optional(S.Boolean),
  }),
).annotate({ identifier: "EvaluatedRule" }) as any as S.Schema<EvaluatedRule>;
export type EvaluatedRuleList = EvaluatedRule[];
export const EvaluatedRuleList = /*@__PURE__*/ S.Array(EvaluatedRule);
export interface VariableImpactExplanation {
  eventVariableName?: string;
  relativeImpact?: string;
  logOddsImpact?: number;
}
export const VariableImpactExplanation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    eventVariableName: S.optional(S.String),
    relativeImpact: S.optional(S.String),
    logOddsImpact: S.optional(S.Number),
  }),
).annotate({
  identifier: "VariableImpactExplanation",
}) as any as S.Schema<VariableImpactExplanation>;
export type ListOfVariableImpactExplanations = VariableImpactExplanation[];
export const ListOfVariableImpactExplanations = /*@__PURE__*/ S.Array(
  VariableImpactExplanation,
);
export interface AggregatedVariablesImpactExplanation {
  eventVariableNames?: string[];
  relativeImpact?: string;
  logOddsImpact?: number;
}
export const AggregatedVariablesImpactExplanation = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      eventVariableNames: S.optional(ListOfStrings),
      relativeImpact: S.optional(S.String),
      logOddsImpact: S.optional(S.Number),
    }),
).annotate({
  identifier: "AggregatedVariablesImpactExplanation",
}) as any as S.Schema<AggregatedVariablesImpactExplanation>;
export type ListOfAggregatedVariablesImpactExplanations =
  AggregatedVariablesImpactExplanation[];
export const ListOfAggregatedVariablesImpactExplanations =
  /*@__PURE__*/ S.Array(AggregatedVariablesImpactExplanation);
export interface PredictionExplanations {
  variableImpactExplanations?: VariableImpactExplanation[];
  aggregatedVariablesImpactExplanations?: AggregatedVariablesImpactExplanation[];
}
export const PredictionExplanations = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    variableImpactExplanations: S.optional(ListOfVariableImpactExplanations),
    aggregatedVariablesImpactExplanations: S.optional(
      ListOfAggregatedVariablesImpactExplanations,
    ),
  }),
).annotate({
  identifier: "PredictionExplanations",
}) as any as S.Schema<PredictionExplanations>;
export interface ModelVersionEvaluation {
  outputVariableName?: string;
  evaluationScore?: string;
  predictionExplanations?: PredictionExplanations;
}
export const ModelVersionEvaluation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    outputVariableName: S.optional(S.String),
    evaluationScore: S.optional(S.String),
    predictionExplanations: S.optional(PredictionExplanations),
  }),
).annotate({
  identifier: "ModelVersionEvaluation",
}) as any as S.Schema<ModelVersionEvaluation>;
export type ListOfModelVersionEvaluations = ModelVersionEvaluation[];
export const ListOfModelVersionEvaluations = /*@__PURE__*/ S.Array(
  ModelVersionEvaluation,
);
export interface EvaluatedModelVersion {
  modelId?: string;
  modelVersion?: string;
  modelType?: string;
  evaluations?: ModelVersionEvaluation[];
}
export const EvaluatedModelVersion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelId: S.optional(S.String),
    modelVersion: S.optional(S.String),
    modelType: S.optional(S.String),
    evaluations: S.optional(ListOfModelVersionEvaluations),
  }),
).annotate({
  identifier: "EvaluatedModelVersion",
}) as any as S.Schema<EvaluatedModelVersion>;
export type ListOfEvaluatedModelVersions = EvaluatedModelVersion[];
export const ListOfEvaluatedModelVersions = /*@__PURE__*/ S.Array(
  EvaluatedModelVersion,
);
export type MapOfStrings = { [key: string]: string | undefined };
export const MapOfStrings = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface EvaluatedExternalModel {
  modelEndpoint?: string;
  useEventVariables?: boolean;
  inputVariables?: { [key: string]: string | undefined };
  outputVariables?: { [key: string]: string | undefined };
}
export const EvaluatedExternalModel = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelEndpoint: S.optional(S.String),
    useEventVariables: S.optional(S.Boolean),
    inputVariables: S.optional(MapOfStrings),
    outputVariables: S.optional(MapOfStrings),
  }),
).annotate({
  identifier: "EvaluatedExternalModel",
}) as any as S.Schema<EvaluatedExternalModel>;
export type ListOfEvaluatedExternalModels = EvaluatedExternalModel[];
export const ListOfEvaluatedExternalModels = /*@__PURE__*/ S.Array(
  EvaluatedExternalModel,
);
export interface GetEventPredictionMetadataResult {
  eventId?: string;
  eventTypeName?: string;
  entityId?: string;
  entityType?: string;
  eventTimestamp?: string;
  detectorId?: string;
  detectorVersionId?: string;
  detectorVersionStatus?: string;
  eventVariables?: EventVariableSummary[];
  rules?: EvaluatedRule[];
  ruleExecutionMode?: RuleExecutionMode;
  outcomes?: string[];
  evaluatedModelVersions?: EvaluatedModelVersion[];
  evaluatedExternalModels?: EvaluatedExternalModel[];
  predictionTimestamp?: string;
}
export const GetEventPredictionMetadataResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    eventId: S.optional(S.String),
    eventTypeName: S.optional(S.String),
    entityId: S.optional(S.String),
    entityType: S.optional(S.String),
    eventTimestamp: S.optional(S.String),
    detectorId: S.optional(S.String),
    detectorVersionId: S.optional(S.String),
    detectorVersionStatus: S.optional(S.String),
    eventVariables: S.optional(ListOfEventVariableSummaries),
    rules: S.optional(EvaluatedRuleList),
    ruleExecutionMode: S.optional(RuleExecutionMode),
    outcomes: S.optional(ListOfStrings),
    evaluatedModelVersions: S.optional(ListOfEvaluatedModelVersions),
    evaluatedExternalModels: S.optional(ListOfEvaluatedExternalModels),
    predictionTimestamp: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetEventPredictionMetadataResult",
}) as any as S.Schema<GetEventPredictionMetadataResult>;
export type EventTypesMaxResults = number;
export interface GetEventTypesRequest {
  name?: string;
  nextToken?: string;
  maxResults?: number;
}
export const GetEventTypesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
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
  identifier: "GetEventTypesRequest",
}) as any as S.Schema<GetEventTypesRequest>;
export type EventIngestion = "ENABLED" | "DISABLED" | (string & {});
export const EventIngestion = /*@__PURE__*/ S.String;

export interface IngestedEventStatistics {
  numberOfEvents?: number;
  eventDataSizeInBytes?: number;
  leastRecentEvent?: string;
  mostRecentEvent?: string;
  lastUpdatedTime?: string;
}
export const IngestedEventStatistics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    numberOfEvents: S.optional(S.Number),
    eventDataSizeInBytes: S.optional(S.Number),
    leastRecentEvent: S.optional(S.String),
    mostRecentEvent: S.optional(S.String),
    lastUpdatedTime: S.optional(S.String),
  }),
).annotate({
  identifier: "IngestedEventStatistics",
}) as any as S.Schema<IngestedEventStatistics>;
export interface EventOrchestration {
  eventBridgeEnabled: boolean;
}
export const EventOrchestration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ eventBridgeEnabled: S.Boolean }),
).annotate({
  identifier: "EventOrchestration",
}) as any as S.Schema<EventOrchestration>;
export interface EventType {
  name?: string;
  description?: string;
  eventVariables?: string[];
  labels?: string[];
  entityTypes?: string[];
  eventIngestion?: EventIngestion;
  ingestedEventStatistics?: IngestedEventStatistics;
  lastUpdatedTime?: string;
  createdTime?: string;
  arn?: string;
  eventOrchestration?: EventOrchestration;
}
export const EventType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    description: S.optional(S.String),
    eventVariables: S.optional(ListOfStrings),
    labels: S.optional(ListOfStrings),
    entityTypes: S.optional(NonEmptyListOfStrings),
    eventIngestion: S.optional(EventIngestion),
    ingestedEventStatistics: S.optional(IngestedEventStatistics),
    lastUpdatedTime: S.optional(S.String),
    createdTime: S.optional(S.String),
    arn: S.optional(S.String),
    eventOrchestration: S.optional(EventOrchestration),
  }),
).annotate({ identifier: "EventType" }) as any as S.Schema<EventType>;
export type EventTypeList = EventType[];
export const EventTypeList = /*@__PURE__*/ S.Array(EventType);
export interface GetEventTypesResult {
  eventTypes?: EventType[];
  nextToken?: string;
}
export const GetEventTypesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    eventTypes: S.optional(EventTypeList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetEventTypesResult",
}) as any as S.Schema<GetEventTypesResult>;
export type ExternalModelsMaxResults = number;
export interface GetExternalModelsRequest {
  modelEndpoint?: string;
  nextToken?: string;
  maxResults?: number;
}
export const GetExternalModelsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelEndpoint: S.optional(S.String),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
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
  identifier: "GetExternalModelsRequest",
}) as any as S.Schema<GetExternalModelsRequest>;
export type ModelInputDataFormat =
  | "TEXT_CSV"
  | "APPLICATION_JSON"
  | (string & {});
export const ModelInputDataFormat = /*@__PURE__*/ S.String;

export type UseEventVariables = boolean;
export type ModelInputTemplate = string;
export interface ModelInputConfiguration {
  eventTypeName?: string;
  format?: ModelInputDataFormat;
  useEventVariables: boolean;
  jsonInputTemplate?: string;
  csvInputTemplate?: string;
}
export const ModelInputConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    eventTypeName: S.optional(S.String),
    format: S.optional(ModelInputDataFormat),
    useEventVariables: S.Boolean,
    jsonInputTemplate: S.optional(S.String),
    csvInputTemplate: S.optional(S.String),
  }),
).annotate({
  identifier: "ModelInputConfiguration",
}) as any as S.Schema<ModelInputConfiguration>;
export type ModelOutputDataFormat =
  | "TEXT_CSV"
  | "APPLICATION_JSONLINES"
  | (string & {});
export const ModelOutputDataFormat = /*@__PURE__*/ S.String;

export type JsonKeyToVariableMap = { [key: string]: string | undefined };
export const JsonKeyToVariableMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type CsvIndexToVariableMap = { [key: string]: string | undefined };
export const CsvIndexToVariableMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface ModelOutputConfiguration {
  format: ModelOutputDataFormat;
  jsonKeyToVariableMap?: { [key: string]: string | undefined };
  csvIndexToVariableMap?: { [key: string]: string | undefined };
}
export const ModelOutputConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    format: ModelOutputDataFormat,
    jsonKeyToVariableMap: S.optional(JsonKeyToVariableMap),
    csvIndexToVariableMap: S.optional(CsvIndexToVariableMap),
  }),
).annotate({
  identifier: "ModelOutputConfiguration",
}) as any as S.Schema<ModelOutputConfiguration>;
export type ModelEndpointStatus = "ASSOCIATED" | "DISSOCIATED" | (string & {});
export const ModelEndpointStatus = /*@__PURE__*/ S.String;

export interface ExternalModel {
  modelEndpoint?: string;
  modelSource?: ModelSource;
  invokeModelEndpointRoleArn?: string;
  inputConfiguration?: ModelInputConfiguration;
  outputConfiguration?: ModelOutputConfiguration;
  modelEndpointStatus?: ModelEndpointStatus;
  lastUpdatedTime?: string;
  createdTime?: string;
  arn?: string;
}
export const ExternalModel = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelEndpoint: S.optional(S.String),
    modelSource: S.optional(ModelSource),
    invokeModelEndpointRoleArn: S.optional(S.String),
    inputConfiguration: S.optional(ModelInputConfiguration),
    outputConfiguration: S.optional(ModelOutputConfiguration),
    modelEndpointStatus: S.optional(ModelEndpointStatus),
    lastUpdatedTime: S.optional(S.String),
    createdTime: S.optional(S.String),
    arn: S.optional(S.String),
  }),
).annotate({ identifier: "ExternalModel" }) as any as S.Schema<ExternalModel>;
export type ExternalModelList = ExternalModel[];
export const ExternalModelList = /*@__PURE__*/ S.Array(ExternalModel);
export interface GetExternalModelsResult {
  externalModels?: ExternalModel[];
  nextToken?: string;
}
export const GetExternalModelsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    externalModels: S.optional(ExternalModelList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetExternalModelsResult",
}) as any as S.Schema<GetExternalModelsResult>;
export interface GetKMSEncryptionKeyRequest {}
export const GetKMSEncryptionKeyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
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
  identifier: "GetKMSEncryptionKeyRequest",
}) as any as S.Schema<GetKMSEncryptionKeyRequest>;
export type KmsEncryptionKeyArn = string;
export interface KMSKey {
  kmsEncryptionKeyArn?: string;
}
export const KMSKey = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ kmsEncryptionKeyArn: S.optional(S.String) }),
).annotate({ identifier: "KMSKey" }) as any as S.Schema<KMSKey>;
export interface GetKMSEncryptionKeyResult {
  kmsKey?: KMSKey;
}
export const GetKMSEncryptionKeyResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ kmsKey: S.optional(KMSKey) }).pipe(ns),
).annotate({
  identifier: "GetKMSEncryptionKeyResult",
}) as any as S.Schema<GetKMSEncryptionKeyResult>;
export type LabelsMaxResults = number;
export interface GetLabelsRequest {
  name?: string;
  nextToken?: string;
  maxResults?: number;
}
export const GetLabelsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
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
  identifier: "GetLabelsRequest",
}) as any as S.Schema<GetLabelsRequest>;
export interface Label {
  name?: string;
  description?: string;
  lastUpdatedTime?: string;
  createdTime?: string;
  arn?: string;
}
export const Label = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    description: S.optional(S.String),
    lastUpdatedTime: S.optional(S.String),
    createdTime: S.optional(S.String),
    arn: S.optional(S.String),
  }),
).annotate({ identifier: "Label" }) as any as S.Schema<Label>;
export type LabelList = Label[];
export const LabelList = /*@__PURE__*/ S.Array(Label);
export interface GetLabelsResult {
  labels?: Label[];
  nextToken?: string;
}
export const GetLabelsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    labels: S.optional(LabelList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetLabelsResult",
}) as any as S.Schema<GetLabelsResult>;
export type NextToken = string;
export type ListsElementsMaxResults = number;
export interface GetListElementsRequest {
  name: string;
  nextToken?: string;
  maxResults?: number;
}
export const GetListElementsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
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
  identifier: "GetListElementsRequest",
}) as any as S.Schema<GetListElementsRequest>;
export interface GetListElementsResult {
  elements?: (string | redacted.Redacted<string>)[];
  nextToken?: string;
}
export const GetListElementsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    elements: S.optional(ElementsList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetListElementsResult",
}) as any as S.Schema<GetListElementsResult>;
export type ListsMetadataMaxResults = number;
export interface GetListsMetadataRequest {
  name?: string;
  nextToken?: string;
  maxResults?: number;
}
export const GetListsMetadataRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
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
  identifier: "GetListsMetadataRequest",
}) as any as S.Schema<GetListsMetadataRequest>;
export interface AllowDenyList {
  name: string;
  description?: string;
  variableType?: string;
  createdTime?: string;
  updatedTime?: string;
  arn?: string;
}
export const AllowDenyList = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    variableType: S.optional(S.String),
    createdTime: S.optional(S.String),
    updatedTime: S.optional(S.String),
    arn: S.optional(S.String),
  }),
).annotate({ identifier: "AllowDenyList" }) as any as S.Schema<AllowDenyList>;
export type AllowDenyLists = AllowDenyList[];
export const AllowDenyLists = /*@__PURE__*/ S.Array(AllowDenyList);
export interface GetListsMetadataResult {
  lists?: AllowDenyList[];
  nextToken?: string;
}
export const GetListsMetadataResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    lists: S.optional(AllowDenyLists),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetListsMetadataResult",
}) as any as S.Schema<GetListsMetadataResult>;
export interface GetModelsRequest {
  modelId?: string;
  modelType?: ModelTypeEnum;
  nextToken?: string;
  maxResults?: number;
}
export const GetModelsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelId: S.optional(S.String),
    modelType: S.optional(ModelTypeEnum),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
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
  identifier: "GetModelsRequest",
}) as any as S.Schema<GetModelsRequest>;
export interface Model {
  modelId?: string;
  modelType?: ModelTypeEnum;
  description?: string;
  eventTypeName?: string;
  createdTime?: string;
  lastUpdatedTime?: string;
  arn?: string;
}
export const Model = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelId: S.optional(S.String),
    modelType: S.optional(ModelTypeEnum),
    description: S.optional(S.String),
    eventTypeName: S.optional(S.String),
    createdTime: S.optional(S.String),
    lastUpdatedTime: S.optional(S.String),
    arn: S.optional(S.String),
  }),
).annotate({ identifier: "Model" }) as any as S.Schema<Model>;
export type ModelList = Model[];
export const ModelList = /*@__PURE__*/ S.Array(Model);
export interface GetModelsResult {
  nextToken?: string;
  models?: Model[];
}
export const GetModelsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    models: S.optional(ModelList),
  }).pipe(ns),
).annotate({
  identifier: "GetModelsResult",
}) as any as S.Schema<GetModelsResult>;
export interface GetModelVersionRequest {
  modelId: string;
  modelType: ModelTypeEnum;
  modelVersionNumber: string;
}
export const GetModelVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelId: S.String,
    modelType: ModelTypeEnum,
    modelVersionNumber: S.String,
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
  identifier: "GetModelVersionRequest",
}) as any as S.Schema<GetModelVersionRequest>;
export interface GetModelVersionResult {
  modelId?: string;
  modelType?: ModelTypeEnum;
  modelVersionNumber?: string;
  trainingDataSource?: TrainingDataSourceEnum;
  trainingDataSchema?: TrainingDataSchema;
  externalEventsDetail?: ExternalEventsDetail;
  ingestedEventsDetail?: IngestedEventsDetail;
  status?: string;
  arn?: string;
}
export const GetModelVersionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelId: S.optional(S.String),
    modelType: S.optional(ModelTypeEnum),
    modelVersionNumber: S.optional(S.String),
    trainingDataSource: S.optional(TrainingDataSourceEnum),
    trainingDataSchema: S.optional(TrainingDataSchema),
    externalEventsDetail: S.optional(ExternalEventsDetail),
    ingestedEventsDetail: S.optional(IngestedEventsDetail),
    status: S.optional(S.String),
    arn: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetModelVersionResult",
}) as any as S.Schema<GetModelVersionResult>;
export type OutcomesMaxResults = number;
export interface GetOutcomesRequest {
  name?: string;
  nextToken?: string;
  maxResults?: number;
}
export const GetOutcomesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
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
  identifier: "GetOutcomesRequest",
}) as any as S.Schema<GetOutcomesRequest>;
export interface Outcome {
  name?: string;
  description?: string;
  lastUpdatedTime?: string;
  createdTime?: string;
  arn?: string;
}
export const Outcome = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    description: S.optional(S.String),
    lastUpdatedTime: S.optional(S.String),
    createdTime: S.optional(S.String),
    arn: S.optional(S.String),
  }),
).annotate({ identifier: "Outcome" }) as any as S.Schema<Outcome>;
export type OutcomeList = Outcome[];
export const OutcomeList = /*@__PURE__*/ S.Array(Outcome);
export interface GetOutcomesResult {
  outcomes?: Outcome[];
  nextToken?: string;
}
export const GetOutcomesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    outcomes: S.optional(OutcomeList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetOutcomesResult",
}) as any as S.Schema<GetOutcomesResult>;
export type RulesMaxResults = number;
export interface GetRulesRequest {
  ruleId?: string;
  detectorId: string;
  ruleVersion?: string;
  nextToken?: string;
  maxResults?: number;
}
export const GetRulesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ruleId: S.optional(S.String),
    detectorId: S.String,
    ruleVersion: S.optional(S.String),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
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
  identifier: "GetRulesRequest",
}) as any as S.Schema<GetRulesRequest>;
export interface RuleDetail {
  ruleId?: string;
  description?: string;
  detectorId?: string;
  ruleVersion?: string;
  expression?: string | redacted.Redacted<string>;
  language?: Language;
  outcomes?: string[];
  lastUpdatedTime?: string;
  createdTime?: string;
  arn?: string;
}
export const RuleDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ruleId: S.optional(S.String),
    description: S.optional(S.String),
    detectorId: S.optional(S.String),
    ruleVersion: S.optional(S.String),
    expression: S.optional(SensitiveString),
    language: S.optional(Language),
    outcomes: S.optional(NonEmptyListOfStrings),
    lastUpdatedTime: S.optional(S.String),
    createdTime: S.optional(S.String),
    arn: S.optional(S.String),
  }),
).annotate({ identifier: "RuleDetail" }) as any as S.Schema<RuleDetail>;
export type RuleDetailList = RuleDetail[];
export const RuleDetailList = /*@__PURE__*/ S.Array(RuleDetail);
export interface GetRulesResult {
  ruleDetails?: RuleDetail[];
  nextToken?: string;
}
export const GetRulesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ruleDetails: S.optional(RuleDetailList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({ identifier: "GetRulesResult" }) as any as S.Schema<GetRulesResult>;
export type VariablesMaxResults = number;
export interface GetVariablesRequest {
  name?: string;
  nextToken?: string;
  maxResults?: number;
}
export const GetVariablesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
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
  identifier: "GetVariablesRequest",
}) as any as S.Schema<GetVariablesRequest>;
export interface GetVariablesResult {
  variables?: Variable[];
  nextToken?: string;
}
export const GetVariablesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    variables: S.optional(VariableList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetVariablesResult",
}) as any as S.Schema<GetVariablesResult>;
export type FilterString = string;
export interface FilterCondition {
  value?: string;
}
export const FilterCondition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ value: S.optional(S.String) }),
).annotate({
  identifier: "FilterCondition",
}) as any as S.Schema<FilterCondition>;
export interface PredictionTimeRange {
  startTime: string;
  endTime: string;
}
export const PredictionTimeRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ startTime: S.String, endTime: S.String }),
).annotate({
  identifier: "PredictionTimeRange",
}) as any as S.Schema<PredictionTimeRange>;
export type EventPredictionsMaxResults = number;
export interface ListEventPredictionsRequest {
  eventId?: FilterCondition;
  eventType?: FilterCondition;
  detectorId?: FilterCondition;
  detectorVersionId?: FilterCondition;
  predictionTimeRange?: PredictionTimeRange;
  nextToken?: string;
  maxResults?: number;
}
export const ListEventPredictionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    eventId: S.optional(FilterCondition),
    eventType: S.optional(FilterCondition),
    detectorId: S.optional(FilterCondition),
    detectorVersionId: S.optional(FilterCondition),
    predictionTimeRange: S.optional(PredictionTimeRange),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
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
  identifier: "ListEventPredictionsRequest",
}) as any as S.Schema<ListEventPredictionsRequest>;
export interface EventPredictionSummary {
  eventId?: string;
  eventTypeName?: string;
  eventTimestamp?: string;
  predictionTimestamp?: string;
  detectorId?: string;
  detectorVersionId?: string;
}
export const EventPredictionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    eventId: S.optional(S.String),
    eventTypeName: S.optional(S.String),
    eventTimestamp: S.optional(S.String),
    predictionTimestamp: S.optional(S.String),
    detectorId: S.optional(S.String),
    detectorVersionId: S.optional(S.String),
  }),
).annotate({
  identifier: "EventPredictionSummary",
}) as any as S.Schema<EventPredictionSummary>;
export type ListOfEventPredictionSummaries = EventPredictionSummary[];
export const ListOfEventPredictionSummaries = /*@__PURE__*/ S.Array(
  EventPredictionSummary,
);
export interface ListEventPredictionsResult {
  eventPredictionSummaries?: EventPredictionSummary[];
  nextToken?: string;
}
export const ListEventPredictionsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    eventPredictionSummaries: S.optional(ListOfEventPredictionSummaries),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListEventPredictionsResult",
}) as any as S.Schema<ListEventPredictionsResult>;
export type TagsMaxResults = number;
export interface ListTagsForResourceRequest {
  resourceARN: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceARN: S.String,
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
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
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface ListTagsForResourceResult {
  tags?: Tag[];
  nextToken?: string;
}
export const ListTagsForResourceResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: S.optional(TagList), nextToken: S.optional(S.String) }).pipe(
    ns,
  ),
).annotate({
  identifier: "ListTagsForResourceResult",
}) as any as S.Schema<ListTagsForResourceResult>;
export interface PutDetectorRequest {
  detectorId: string;
  description?: string;
  eventTypeName: string;
  tags?: Tag[];
}
export const PutDetectorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    detectorId: S.String,
    description: S.optional(S.String),
    eventTypeName: S.String,
    tags: S.optional(TagList),
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
  identifier: "PutDetectorRequest",
}) as any as S.Schema<PutDetectorRequest>;
export interface PutDetectorResult {}
export const PutDetectorResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "PutDetectorResult",
}) as any as S.Schema<PutDetectorResult>;
export interface PutEntityTypeRequest {
  name: string;
  description?: string;
  tags?: Tag[];
}
export const PutEntityTypeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    tags: S.optional(TagList),
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
  identifier: "PutEntityTypeRequest",
}) as any as S.Schema<PutEntityTypeRequest>;
export interface PutEntityTypeResult {}
export const PutEntityTypeResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "PutEntityTypeResult",
}) as any as S.Schema<PutEntityTypeResult>;
export interface PutEventTypeRequest {
  name: string;
  description?: string;
  eventVariables: string[];
  labels?: string[];
  entityTypes: string[];
  eventIngestion?: EventIngestion;
  tags?: Tag[];
  eventOrchestration?: EventOrchestration;
}
export const PutEventTypeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    eventVariables: NonEmptyListOfStrings,
    labels: S.optional(ListOfStrings),
    entityTypes: NonEmptyListOfStrings,
    eventIngestion: S.optional(EventIngestion),
    tags: S.optional(TagList),
    eventOrchestration: S.optional(EventOrchestration),
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
  identifier: "PutEventTypeRequest",
}) as any as S.Schema<PutEventTypeRequest>;
export interface PutEventTypeResult {}
export const PutEventTypeResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "PutEventTypeResult",
}) as any as S.Schema<PutEventTypeResult>;
export interface PutExternalModelRequest {
  modelEndpoint: string;
  modelSource: ModelSource;
  invokeModelEndpointRoleArn: string;
  inputConfiguration: ModelInputConfiguration;
  outputConfiguration: ModelOutputConfiguration;
  modelEndpointStatus: ModelEndpointStatus;
  tags?: Tag[];
}
export const PutExternalModelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelEndpoint: S.String,
    modelSource: ModelSource,
    invokeModelEndpointRoleArn: S.String,
    inputConfiguration: ModelInputConfiguration,
    outputConfiguration: ModelOutputConfiguration,
    modelEndpointStatus: ModelEndpointStatus,
    tags: S.optional(TagList),
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
  identifier: "PutExternalModelRequest",
}) as any as S.Schema<PutExternalModelRequest>;
export interface PutExternalModelResult {}
export const PutExternalModelResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "PutExternalModelResult",
}) as any as S.Schema<PutExternalModelResult>;
export interface PutKMSEncryptionKeyRequest {
  kmsEncryptionKeyArn: string;
}
export const PutKMSEncryptionKeyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ kmsEncryptionKeyArn: S.String }).pipe(
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
  identifier: "PutKMSEncryptionKeyRequest",
}) as any as S.Schema<PutKMSEncryptionKeyRequest>;
export interface PutKMSEncryptionKeyResult {}
export const PutKMSEncryptionKeyResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "PutKMSEncryptionKeyResult",
}) as any as S.Schema<PutKMSEncryptionKeyResult>;
export interface PutLabelRequest {
  name: string;
  description?: string;
  tags?: Tag[];
}
export const PutLabelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    tags: S.optional(TagList),
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
  identifier: "PutLabelRequest",
}) as any as S.Schema<PutLabelRequest>;
export interface PutLabelResult {}
export const PutLabelResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({ identifier: "PutLabelResult" }) as any as S.Schema<PutLabelResult>;
export interface PutOutcomeRequest {
  name: string;
  description?: string;
  tags?: Tag[];
}
export const PutOutcomeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    tags: S.optional(TagList),
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
  identifier: "PutOutcomeRequest",
}) as any as S.Schema<PutOutcomeRequest>;
export interface PutOutcomeResult {}
export const PutOutcomeResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "PutOutcomeResult",
}) as any as S.Schema<PutOutcomeResult>;
export interface SendEventRequest {
  eventId: string;
  eventTypeName: string;
  eventTimestamp: string;
  eventVariables: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
  assignedLabel?: string;
  labelTimestamp?: string;
  entities: Entity[];
}
export const SendEventRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    eventId: S.String,
    eventTypeName: S.String,
    eventTimestamp: S.String,
    eventVariables: EventVariableMap,
    assignedLabel: S.optional(S.String),
    labelTimestamp: S.optional(S.String),
    entities: ListOfEntities,
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
  identifier: "SendEventRequest",
}) as any as S.Schema<SendEventRequest>;
export interface SendEventResult {}
export const SendEventResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "SendEventResult",
}) as any as S.Schema<SendEventResult>;
export interface TagResourceRequest {
  resourceARN: string;
  tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceARN: S.String, tags: TagList }).pipe(
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
  identifier: "TagResourceRequest",
}) as any as S.Schema<TagResourceRequest>;
export interface TagResourceResult {}
export const TagResourceResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "TagResourceResult",
}) as any as S.Schema<TagResourceResult>;
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  resourceARN: string;
  tagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceARN: S.String, tagKeys: TagKeyList }).pipe(
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
  identifier: "UntagResourceRequest",
}) as any as S.Schema<UntagResourceRequest>;
export interface UntagResourceResult {}
export const UntagResourceResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UntagResourceResult",
}) as any as S.Schema<UntagResourceResult>;
export interface UpdateDetectorVersionRequest {
  detectorId: string;
  detectorVersionId: string;
  externalModelEndpoints: string[];
  rules: Rule[];
  description?: string;
  modelVersions?: ModelVersion[];
  ruleExecutionMode?: RuleExecutionMode;
}
export const UpdateDetectorVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    detectorId: S.String,
    detectorVersionId: S.String,
    externalModelEndpoints: ListOfStrings,
    rules: RuleList,
    description: S.optional(S.String),
    modelVersions: S.optional(ListOfModelVersions),
    ruleExecutionMode: S.optional(RuleExecutionMode),
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
  identifier: "UpdateDetectorVersionRequest",
}) as any as S.Schema<UpdateDetectorVersionRequest>;
export interface UpdateDetectorVersionResult {}
export const UpdateDetectorVersionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateDetectorVersionResult",
}) as any as S.Schema<UpdateDetectorVersionResult>;
export interface UpdateDetectorVersionMetadataRequest {
  detectorId: string;
  detectorVersionId: string;
  description: string;
}
export const UpdateDetectorVersionMetadataRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      detectorId: S.String,
      detectorVersionId: S.String,
      description: S.String,
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
  identifier: "UpdateDetectorVersionMetadataRequest",
}) as any as S.Schema<UpdateDetectorVersionMetadataRequest>;
export interface UpdateDetectorVersionMetadataResult {}
export const UpdateDetectorVersionMetadataResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateDetectorVersionMetadataResult",
}) as any as S.Schema<UpdateDetectorVersionMetadataResult>;
export interface UpdateDetectorVersionStatusRequest {
  detectorId: string;
  detectorVersionId: string;
  status: DetectorVersionStatus;
}
export const UpdateDetectorVersionStatusRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    detectorId: S.String,
    detectorVersionId: S.String,
    status: DetectorVersionStatus,
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
  identifier: "UpdateDetectorVersionStatusRequest",
}) as any as S.Schema<UpdateDetectorVersionStatusRequest>;
export interface UpdateDetectorVersionStatusResult {}
export const UpdateDetectorVersionStatusResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateDetectorVersionStatusResult",
}) as any as S.Schema<UpdateDetectorVersionStatusResult>;
export interface UpdateEventLabelRequest {
  eventId: string;
  eventTypeName: string;
  assignedLabel: string;
  labelTimestamp: string;
}
export const UpdateEventLabelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    eventId: S.String,
    eventTypeName: S.String,
    assignedLabel: S.String,
    labelTimestamp: S.String,
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
  identifier: "UpdateEventLabelRequest",
}) as any as S.Schema<UpdateEventLabelRequest>;
export interface UpdateEventLabelResult {}
export const UpdateEventLabelResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateEventLabelResult",
}) as any as S.Schema<UpdateEventLabelResult>;
export type ListUpdateMode = "REPLACE" | "APPEND" | "REMOVE" | (string & {});
export const ListUpdateMode = /*@__PURE__*/ S.String;

export interface UpdateListRequest {
  name: string;
  elements?: (string | redacted.Redacted<string>)[];
  description?: string;
  updateMode?: ListUpdateMode;
  variableType?: string;
}
export const UpdateListRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    elements: S.optional(ElementsList),
    description: S.optional(S.String),
    updateMode: S.optional(ListUpdateMode),
    variableType: S.optional(S.String),
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
  identifier: "UpdateListRequest",
}) as any as S.Schema<UpdateListRequest>;
export interface UpdateListResult {}
export const UpdateListResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateListResult",
}) as any as S.Schema<UpdateListResult>;
export interface UpdateModelRequest {
  modelId: string;
  modelType: ModelTypeEnum;
  description?: string;
}
export const UpdateModelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelId: S.String,
    modelType: ModelTypeEnum,
    description: S.optional(S.String),
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
  identifier: "UpdateModelRequest",
}) as any as S.Schema<UpdateModelRequest>;
export interface UpdateModelResult {}
export const UpdateModelResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateModelResult",
}) as any as S.Schema<UpdateModelResult>;
export interface UpdateModelVersionRequest {
  modelId: string;
  modelType: ModelTypeEnum;
  majorVersionNumber: string;
  externalEventsDetail?: ExternalEventsDetail;
  ingestedEventsDetail?: IngestedEventsDetail;
  tags?: Tag[];
}
export const UpdateModelVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelId: S.String,
    modelType: ModelTypeEnum,
    majorVersionNumber: S.String,
    externalEventsDetail: S.optional(ExternalEventsDetail),
    ingestedEventsDetail: S.optional(IngestedEventsDetail),
    tags: S.optional(TagList),
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
  identifier: "UpdateModelVersionRequest",
}) as any as S.Schema<UpdateModelVersionRequest>;
export interface UpdateModelVersionResult {
  modelId?: string;
  modelType?: ModelTypeEnum;
  modelVersionNumber?: string;
  status?: string;
}
export const UpdateModelVersionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelId: S.optional(S.String),
    modelType: S.optional(ModelTypeEnum),
    modelVersionNumber: S.optional(S.String),
    status: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "UpdateModelVersionResult",
}) as any as S.Schema<UpdateModelVersionResult>;
export type ModelVersionStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "TRAINING_CANCELLED"
  | (string & {});
export const ModelVersionStatus = /*@__PURE__*/ S.String;

export interface UpdateModelVersionStatusRequest {
  modelId: string;
  modelType: ModelTypeEnum;
  modelVersionNumber: string;
  status: ModelVersionStatus;
}
export const UpdateModelVersionStatusRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelId: S.String,
    modelType: ModelTypeEnum,
    modelVersionNumber: S.String,
    status: ModelVersionStatus,
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
  identifier: "UpdateModelVersionStatusRequest",
}) as any as S.Schema<UpdateModelVersionStatusRequest>;
export interface UpdateModelVersionStatusResult {}
export const UpdateModelVersionStatusResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateModelVersionStatusResult",
}) as any as S.Schema<UpdateModelVersionStatusResult>;
export interface UpdateRuleMetadataRequest {
  rule: Rule;
  description: string;
}
export const UpdateRuleMetadataRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ rule: Rule, description: S.String }).pipe(
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
  identifier: "UpdateRuleMetadataRequest",
}) as any as S.Schema<UpdateRuleMetadataRequest>;
export interface UpdateRuleMetadataResult {}
export const UpdateRuleMetadataResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateRuleMetadataResult",
}) as any as S.Schema<UpdateRuleMetadataResult>;
export interface UpdateRuleVersionRequest {
  rule: Rule;
  description?: string;
  expression: string | redacted.Redacted<string>;
  language: Language;
  outcomes: string[];
  tags?: Tag[];
}
export const UpdateRuleVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    rule: Rule,
    description: S.optional(S.String),
    expression: SensitiveString,
    language: Language,
    outcomes: NonEmptyListOfStrings,
    tags: S.optional(TagList),
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
  identifier: "UpdateRuleVersionRequest",
}) as any as S.Schema<UpdateRuleVersionRequest>;
export interface UpdateRuleVersionResult {
  rule?: Rule;
}
export const UpdateRuleVersionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ rule: S.optional(Rule) }).pipe(ns),
).annotate({
  identifier: "UpdateRuleVersionResult",
}) as any as S.Schema<UpdateRuleVersionResult>;
export interface UpdateVariableRequest {
  name: string;
  defaultValue?: string;
  description?: string;
  variableType?: string;
}
export const UpdateVariableRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    defaultValue: S.optional(S.String),
    description: S.optional(S.String),
    variableType: S.optional(S.String),
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
  identifier: "UpdateVariableRequest",
}) as any as S.Schema<UpdateVariableRequest>;
export interface UpdateVariableResult {}
export const UpdateVariableResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateVariableResult",
}) as any as S.Schema<UpdateVariableResult>;
export type BatchCreateVariableError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a batch of variables.
 */
export const batchCreateVariable: API.OperationMethod<
  BatchCreateVariableRequest,
  BatchCreateVariableResult,
  BatchCreateVariableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchCreateVariableRequest,
  output: BatchCreateVariableResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchCreateVariable",
}));

export type BatchGetVariableError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a batch of variables.
 */
export const batchGetVariable: API.OperationMethod<
  BatchGetVariableRequest,
  BatchGetVariableResult,
  BatchGetVariableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetVariableRequest,
  output: BatchGetVariableResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetVariable",
}));

export type CancelBatchImportJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels an in-progress batch import job.
 */
export const cancelBatchImportJob: API.OperationMethod<
  CancelBatchImportJobRequest,
  CancelBatchImportJobResult,
  CancelBatchImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelBatchImportJobRequest,
  output: CancelBatchImportJobResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelBatchImportJob",
}));

export type CancelBatchPredictionJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels the specified batch prediction job.
 */
export const cancelBatchPredictionJob: API.OperationMethod<
  CancelBatchPredictionJobRequest,
  CancelBatchPredictionJobResult,
  CancelBatchPredictionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelBatchPredictionJobRequest,
  output: CancelBatchPredictionJobResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelBatchPredictionJob",
}));

export type CreateBatchImportJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a batch import job.
 */
export const createBatchImportJob: API.OperationMethod<
  CreateBatchImportJobRequest,
  CreateBatchImportJobResult,
  CreateBatchImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateBatchImportJobRequest,
  output: CreateBatchImportJobResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBatchImportJob",
}));

export type CreateBatchPredictionJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a batch prediction job.
 */
export const createBatchPredictionJob: API.OperationMethod<
  CreateBatchPredictionJobRequest,
  CreateBatchPredictionJobResult,
  CreateBatchPredictionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateBatchPredictionJobRequest,
  output: CreateBatchPredictionJobResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBatchPredictionJob",
}));

export type CreateDetectorVersionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a detector version. The detector version starts in a `DRAFT` status.
 */
export const createDetectorVersion: API.OperationMethod<
  CreateDetectorVersionRequest,
  CreateDetectorVersionResult,
  CreateDetectorVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDetectorVersionRequest,
  output: CreateDetectorVersionResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDetectorVersion",
}));

export type CreateListError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a list.
 *
 * List is a set of input data for a variable in your event dataset. You use the input data in a rule that's associated with your detector.
 * For more information, see Lists.
 */
export const createList: API.OperationMethod<
  CreateListRequest,
  CreateListResult,
  CreateListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateListRequest,
  output: CreateListResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateList",
}));

export type CreateModelError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a model using the specified model type.
 */
export const createModel: API.OperationMethod<
  CreateModelRequest,
  CreateModelResult,
  CreateModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateModelRequest,
  output: CreateModelResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateModel",
}));

export type CreateModelVersionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a version of the model using the specified model type and model id.
 */
export const createModelVersion: API.OperationMethod<
  CreateModelVersionRequest,
  CreateModelVersionResult,
  CreateModelVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateModelVersionRequest,
  output: CreateModelVersionResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateModelVersion",
}));

export type CreateRuleError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a rule for use with the specified detector.
 */
export const createRule: API.OperationMethod<
  CreateRuleRequest,
  CreateRuleResult,
  CreateRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRuleRequest,
  output: CreateRuleResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRule",
}));

export type CreateVariableError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a variable.
 */
export const createVariable: API.OperationMethod<
  CreateVariableRequest,
  CreateVariableResult,
  CreateVariableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateVariableRequest,
  output: CreateVariableResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVariable",
}));

export type DeleteBatchImportJobError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified batch import job ID record. This action does not delete the data that was batch imported.
 */
export const deleteBatchImportJob: API.OperationMethod<
  DeleteBatchImportJobRequest,
  DeleteBatchImportJobResult,
  DeleteBatchImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteBatchImportJobRequest,
  output: DeleteBatchImportJobResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBatchImportJob",
}));

export type DeleteBatchPredictionJobError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a batch prediction job.
 */
export const deleteBatchPredictionJob: API.OperationMethod<
  DeleteBatchPredictionJobRequest,
  DeleteBatchPredictionJobResult,
  DeleteBatchPredictionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteBatchPredictionJobRequest,
  output: DeleteBatchPredictionJobResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBatchPredictionJob",
}));

export type DeleteDetectorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the detector. Before deleting a detector, you must first delete all detector versions and rule versions associated with the detector.
 *
 * When you delete a detector, Amazon Fraud Detector permanently deletes the detector and the data is no longer stored in Amazon Fraud Detector.
 */
export const deleteDetector: API.OperationMethod<
  DeleteDetectorRequest,
  DeleteDetectorResult,
  DeleteDetectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDetectorRequest,
  output: DeleteDetectorResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDetector",
}));

export type DeleteDetectorVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the detector version. You cannot delete detector versions that are in `ACTIVE` status.
 *
 * When you delete a detector version, Amazon Fraud Detector permanently deletes the detector and the data is no longer stored in Amazon Fraud Detector.
 */
export const deleteDetectorVersion: API.OperationMethod<
  DeleteDetectorVersionRequest,
  DeleteDetectorVersionResult,
  DeleteDetectorVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDetectorVersionRequest,
  output: DeleteDetectorVersionResult,
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
  operationName: "DeleteDetectorVersion",
}));

export type DeleteEntityTypeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an entity type.
 *
 * You cannot delete an entity type that is included in an event type.
 *
 * When you delete an entity type, Amazon Fraud Detector permanently deletes that entity type and the data is no longer stored in Amazon Fraud Detector.
 */
export const deleteEntityType: API.OperationMethod<
  DeleteEntityTypeRequest,
  DeleteEntityTypeResult,
  DeleteEntityTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEntityTypeRequest,
  output: DeleteEntityTypeResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEntityType",
}));

export type DeleteEventError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified event.
 *
 * When you delete an event, Amazon Fraud Detector permanently deletes that event and the event data is no longer stored in Amazon Fraud Detector.
 * If `deleteAuditHistory` is `True`, event data is available through search for up to 30 seconds after the delete operation is completed.
 */
export const deleteEvent: API.OperationMethod<
  DeleteEventRequest,
  DeleteEventResult,
  DeleteEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEventRequest,
  output: DeleteEventResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEvent",
}));

export type DeleteEventsByEventTypeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes all events of a particular event type.
 */
export const deleteEventsByEventType: API.OperationMethod<
  DeleteEventsByEventTypeRequest,
  DeleteEventsByEventTypeResult,
  DeleteEventsByEventTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEventsByEventTypeRequest,
  output: DeleteEventsByEventTypeResult,
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
  operationName: "DeleteEventsByEventType",
}));

export type DeleteEventTypeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an event type.
 *
 * You cannot delete an event type that is used in a detector or a model.
 *
 * When you delete an event type, Amazon Fraud Detector permanently deletes that event type and the data is no longer stored in Amazon Fraud Detector.
 */
export const deleteEventType: API.OperationMethod<
  DeleteEventTypeRequest,
  DeleteEventTypeResult,
  DeleteEventTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEventTypeRequest,
  output: DeleteEventTypeResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEventType",
}));

export type DeleteExternalModelError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes a SageMaker model from Amazon Fraud Detector.
 *
 * You can remove an Amazon SageMaker model if it is not associated with a detector version. Removing a SageMaker model disconnects it from Amazon Fraud Detector, but the model remains available in SageMaker.
 */
export const deleteExternalModel: API.OperationMethod<
  DeleteExternalModelRequest,
  DeleteExternalModelResult,
  DeleteExternalModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteExternalModelRequest,
  output: DeleteExternalModelResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteExternalModel",
}));

export type DeleteLabelError =
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a label.
 *
 * You cannot delete labels that are included in an event type in Amazon Fraud Detector.
 *
 * You cannot delete a label assigned to an event ID. You must first delete the relevant event ID.
 *
 * When you delete a label, Amazon Fraud Detector permanently deletes that label and the data is no longer stored in Amazon Fraud Detector.
 */
export const deleteLabel: API.OperationMethod<
  DeleteLabelRequest,
  DeleteLabelResult,
  DeleteLabelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteLabelRequest,
  output: DeleteLabelResult,
  errors: [
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLabel",
}));

export type DeleteListError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the list, provided it is not used in a rule.
 *
 * When you delete a list, Amazon Fraud Detector permanently deletes that list and the elements in the list.
 */
export const deleteList: API.OperationMethod<
  DeleteListRequest,
  DeleteListResult,
  DeleteListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteListRequest,
  output: DeleteListResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteList",
}));

export type DeleteModelError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a model.
 *
 * You can delete models and model versions in Amazon Fraud Detector, provided that they are not associated with a detector version.
 *
 * When you delete a model, Amazon Fraud Detector permanently deletes that model and the data is no longer stored in Amazon Fraud Detector.
 */
export const deleteModel: API.OperationMethod<
  DeleteModelRequest,
  DeleteModelResult,
  DeleteModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteModelRequest,
  output: DeleteModelResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteModel",
}));

export type DeleteModelVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a model version.
 *
 * You can delete models and model versions in Amazon Fraud Detector, provided that they are not associated with a detector version.
 *
 * When you delete a model version, Amazon Fraud Detector permanently deletes that model version and the data is no longer stored in Amazon Fraud Detector.
 */
export const deleteModelVersion: API.OperationMethod<
  DeleteModelVersionRequest,
  DeleteModelVersionResult,
  DeleteModelVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteModelVersionRequest,
  output: DeleteModelVersionResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteModelVersion",
}));

export type DeleteOutcomeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an outcome.
 *
 * You cannot delete an outcome that is used in a rule version.
 *
 * When you delete an outcome, Amazon Fraud Detector permanently deletes that outcome and the data is no longer stored in Amazon Fraud Detector.
 */
export const deleteOutcome: API.OperationMethod<
  DeleteOutcomeRequest,
  DeleteOutcomeResult,
  DeleteOutcomeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteOutcomeRequest,
  output: DeleteOutcomeResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteOutcome",
}));

export type DeleteRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the rule. You cannot delete a rule if it is used by an `ACTIVE` or `INACTIVE` detector version.
 *
 * When you delete a rule, Amazon Fraud Detector permanently deletes that rule and the data is no longer stored in Amazon Fraud Detector.
 */
export const deleteRule: API.OperationMethod<
  DeleteRuleRequest,
  DeleteRuleResult,
  DeleteRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRuleRequest,
  output: DeleteRuleResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRule",
}));

export type DeleteVariableError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a variable.
 *
 * You can't delete variables that are included in an event type in Amazon Fraud Detector.
 *
 * Amazon Fraud Detector automatically deletes model output variables and SageMaker model output variables when you delete the model. You can't delete these variables manually.
 *
 * When you delete a variable, Amazon Fraud Detector permanently deletes that variable and the data is no longer stored in Amazon Fraud Detector.
 */
export const deleteVariable: API.OperationMethod<
  DeleteVariableRequest,
  DeleteVariableResult,
  DeleteVariableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteVariableRequest,
  output: DeleteVariableResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVariable",
}));

export type DescribeDetectorError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets all versions for a specified detector.
 */
export const describeDetector: API.OperationMethod<
  DescribeDetectorRequest,
  DescribeDetectorResult,
  DescribeDetectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeDetectorRequest,
  output: DescribeDetectorResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDetector",
}));

export type DescribeModelVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets all of the model versions for the specified model type or for the specified model type and model ID. You can also get details for a single, specified model version.
 */
export const describeModelVersions: API.PaginatedOperationMethod<
  DescribeModelVersionsRequest,
  DescribeModelVersionsResult,
  DescribeModelVersionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeModelVersionsRequest,
  output: DescribeModelVersionsResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeModelVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetBatchImportJobsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets all batch import jobs or a specific job of the specified ID. This is a paginated API. If you provide a null `maxResults`,
 * this action retrieves a maximum of 50 records per page. If you provide a `maxResults`, the value must be between 1 and 50.
 * To get the next page results, provide the pagination token from the `GetBatchImportJobsResponse` as part of your request.
 * A null pagination token fetches the records from the beginning.
 */
export const getBatchImportJobs: API.PaginatedOperationMethod<
  GetBatchImportJobsRequest,
  GetBatchImportJobsResult,
  GetBatchImportJobsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetBatchImportJobsRequest,
  output: GetBatchImportJobsResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBatchImportJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetBatchPredictionJobsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets all batch prediction jobs or a specific job if you specify a job ID. This is a paginated API. If you provide a null maxResults, this action retrieves a maximum of 50 records per page. If you provide a maxResults, the value must be between 1 and 50. To get the next page results, provide the pagination token from the GetBatchPredictionJobsResponse as part of your request. A null pagination token fetches the records from the beginning.
 */
export const getBatchPredictionJobs: API.PaginatedOperationMethod<
  GetBatchPredictionJobsRequest,
  GetBatchPredictionJobsResult,
  GetBatchPredictionJobsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetBatchPredictionJobsRequest,
  output: GetBatchPredictionJobsResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBatchPredictionJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetDeleteEventsByEventTypeStatusError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the status of a `DeleteEventsByEventType` action.
 */
export const getDeleteEventsByEventTypeStatus: API.OperationMethod<
  GetDeleteEventsByEventTypeStatusRequest,
  GetDeleteEventsByEventTypeStatusResult,
  GetDeleteEventsByEventTypeStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDeleteEventsByEventTypeStatusRequest,
  output: GetDeleteEventsByEventTypeStatusResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeleteEventsByEventTypeStatus",
}));

export type GetDetectorsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets all detectors or a single detector if a `detectorId` is specified. This is a paginated API. If you
 * provide a null `maxResults`, this action retrieves a maximum of 10 records
 * per page. If you provide a `maxResults`, the value must be between 5 and 10.
 * To get the next page results, provide the pagination token from the
 * `GetDetectorsResponse` as part of your request. A null pagination token
 * fetches the records from the beginning.
 */
export const getDetectors: API.PaginatedOperationMethod<
  GetDetectorsRequest,
  GetDetectorsResult,
  GetDetectorsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetDetectorsRequest,
  output: GetDetectorsResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDetectors",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetDetectorVersionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a particular detector version.
 */
export const getDetectorVersion: API.OperationMethod<
  GetDetectorVersionRequest,
  GetDetectorVersionResult,
  GetDetectorVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDetectorVersionRequest,
  output: GetDetectorVersionResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDetectorVersion",
}));

export type GetEntityTypesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets all entity types or a specific entity type if a name is specified. This is a paginated API. If you
 * provide a null `maxResults`, this action retrieves a maximum of 10 records
 * per page. If you provide a `maxResults`, the value must be between 5 and 10.
 * To get the next page results, provide the pagination token from the
 * `GetEntityTypesResponse` as part of your request. A null pagination token
 * fetches the records from the beginning.
 */
export const getEntityTypes: API.PaginatedOperationMethod<
  GetEntityTypesRequest,
  GetEntityTypesResult,
  GetEntityTypesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetEntityTypesRequest,
  output: GetEntityTypesResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEntityTypes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetEventError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details of events stored with Amazon Fraud Detector. This action does not retrieve prediction results.
 */
export const getEvent: API.OperationMethod<
  GetEventRequest,
  GetEventResult,
  GetEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEventRequest,
  output: GetEventResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEvent",
}));

export type GetEventPredictionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Evaluates an event against a detector version. If a version ID is not provided, the detector’s (`ACTIVE`) version is used.
 */
export const getEventPrediction: API.OperationMethod<
  GetEventPredictionRequest,
  GetEventPredictionResult,
  GetEventPredictionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEventPredictionRequest,
  output: GetEventPredictionResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEventPrediction",
}));

export type GetEventPredictionMetadataError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets details of the past fraud predictions for the specified event ID, event type, detector ID, and detector version ID that was generated in the specified time period.
 */
export const getEventPredictionMetadata: API.OperationMethod<
  GetEventPredictionMetadataRequest,
  GetEventPredictionMetadataResult,
  GetEventPredictionMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEventPredictionMetadataRequest,
  output: GetEventPredictionMetadataResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEventPredictionMetadata",
}));

export type GetEventTypesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets all event types or a specific event type if name is provided. This is a paginated API. If you
 * provide a null `maxResults`, this action retrieves a maximum of 10 records
 * per page. If you provide a `maxResults`, the value must be between 5 and 10.
 * To get the next page results, provide the pagination token from the
 * `GetEventTypesResponse` as part of your request. A null pagination token
 * fetches the records from the beginning.
 */
export const getEventTypes: API.PaginatedOperationMethod<
  GetEventTypesRequest,
  GetEventTypesResult,
  GetEventTypesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetEventTypesRequest,
  output: GetEventTypesResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEventTypes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetExternalModelsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the details for one or more Amazon SageMaker models that have been imported into the
 * service. This is a paginated API. If you provide a null `maxResults`, this
 * actions retrieves a maximum of 10 records per page. If you provide a
 * `maxResults`, the value must be between 5 and 10. To get the next page
 * results, provide the pagination token from the `GetExternalModelsResult` as part
 * of your request. A null pagination token fetches the records from the beginning.
 */
export const getExternalModels: API.PaginatedOperationMethod<
  GetExternalModelsRequest,
  GetExternalModelsResult,
  GetExternalModelsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetExternalModelsRequest,
  output: GetExternalModelsResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExternalModels",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetKMSEncryptionKeyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets the encryption key if a KMS key has been specified to be used to encrypt content in Amazon Fraud Detector.
 */
export const getKMSEncryptionKey: API.OperationMethod<
  GetKMSEncryptionKeyRequest,
  GetKMSEncryptionKeyResult,
  GetKMSEncryptionKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetKMSEncryptionKeyRequest,
  output: GetKMSEncryptionKeyResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetKMSEncryptionKey",
}));

export type GetLabelsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets all labels or a specific label if name is provided. This is a paginated API. If you
 * provide a null `maxResults`, this action retrieves a maximum of 50 records
 * per page. If you provide a `maxResults`, the value must be between 10 and 50.
 * To get the next page results, provide the pagination token from the
 * `GetGetLabelsResponse` as part of your request. A null pagination token
 * fetches the records from the beginning.
 */
export const getLabels: API.PaginatedOperationMethod<
  GetLabelsRequest,
  GetLabelsResult,
  GetLabelsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetLabelsRequest,
  output: GetLabelsResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLabels",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetListElementsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets all the elements in the specified list.
 */
export const getListElements: API.PaginatedOperationMethod<
  GetListElementsRequest,
  GetListElementsResult,
  GetListElementsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetListElementsRequest,
  output: GetListElementsResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetListElements",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetListsMetadataError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the metadata of either all the lists under the account or the specified list.
 */
export const getListsMetadata: API.PaginatedOperationMethod<
  GetListsMetadataRequest,
  GetListsMetadataResult,
  GetListsMetadataError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetListsMetadataRequest,
  output: GetListsMetadataResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetListsMetadata",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetModelsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets one or more models. Gets all models for the Amazon Web Services account if no model type and no model id provided. Gets all models for the Amazon Web Services account and model type, if the model type is specified but model id is not provided. Gets a specific model if (model type, model id) tuple is specified.
 *
 * This is a paginated API. If you
 * provide a null `maxResults`, this action retrieves a maximum of 10 records
 * per page. If you provide a `maxResults`, the value must be between 1 and 10.
 * To get the next page results, provide the pagination token from the
 * response as part of your request. A null pagination token
 * fetches the records from the beginning.
 */
export const getModels: API.PaginatedOperationMethod<
  GetModelsRequest,
  GetModelsResult,
  GetModelsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetModelsRequest,
  output: GetModelsResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetModels",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetModelVersionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the details of the specified model version.
 */
export const getModelVersion: API.OperationMethod<
  GetModelVersionRequest,
  GetModelVersionResult,
  GetModelVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetModelVersionRequest,
  output: GetModelVersionResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetModelVersion",
}));

export type GetOutcomesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets one or more outcomes. This is a paginated
 * API. If you provide a null `maxResults`, this actions retrieves a maximum of
 * 100 records per page. If you provide a `maxResults`, the value must be
 * between 50 and 100. To get the next page results, provide the pagination token from the
 * `GetOutcomesResult` as part of your request. A null pagination token
 * fetches the records from the beginning.
 */
export const getOutcomes: API.PaginatedOperationMethod<
  GetOutcomesRequest,
  GetOutcomesResult,
  GetOutcomesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetOutcomesRequest,
  output: GetOutcomesResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOutcomes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetRulesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get all rules for a detector (paginated) if `ruleId` and `ruleVersion` are not specified. Gets all rules for the detector and the `ruleId` if present (paginated). Gets a specific rule if both the `ruleId` and the `ruleVersion` are specified.
 *
 * This is a paginated API. Providing null maxResults results in retrieving maximum of 100 records per page. If you provide maxResults the value must be between 50 and 100. To get the next page result, a provide a pagination token from GetRulesResult as part of your request. Null pagination token fetches the records from the beginning.
 */
export const getRules: API.PaginatedOperationMethod<
  GetRulesRequest,
  GetRulesResult,
  GetRulesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetRulesRequest,
  output: GetRulesResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRules",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetVariablesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets all of the variables or the specific variable. This is a
 * paginated API. Providing null `maxSizePerPage` results in retrieving maximum of
 * 100 records per page. If you provide `maxSizePerPage` the value must be between
 * 50 and 100. To get the next page result, a provide a pagination token from
 * `GetVariablesResult` as part of your request. Null pagination token
 * fetches the records from the beginning.
 */
export const getVariables: API.PaginatedOperationMethod<
  GetVariablesRequest,
  GetVariablesResult,
  GetVariablesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetVariablesRequest,
  output: GetVariablesResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVariables",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEventPredictionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a list of past predictions. The list can be filtered by detector ID, detector version ID, event ID, event type, or by specifying a time period.
 * If filter is not specified, the most recent prediction is returned.
 *
 * For example, the following filter lists all past predictions for `xyz` event type -
 * {
 * "eventType":{
 * "value": "xyz" }”
 * }
 *
 * This is a paginated API. If you provide a null `maxResults`, this action will retrieve a maximum of 10 records per page.
 * If you provide a `maxResults`, the value must be between 50 and 100. To get the next page results, provide
 * the `nextToken` from the response as part of your request. A null `nextToken` fetches the records from the beginning.
 */
export const listEventPredictions: API.PaginatedOperationMethod<
  ListEventPredictionsRequest,
  ListEventPredictionsResult,
  ListEventPredictionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEventPredictionsRequest,
  output: ListEventPredictionsResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEventPredictions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all tags associated with the resource. This is a paginated API. To get the next page results, provide the pagination token from the
 * response as part of your request. A null pagination token
 * fetches the records from the beginning.
 */
export const listTagsForResource: API.PaginatedOperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResult,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResult,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PutDetectorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates a detector.
 */
export const putDetector: API.OperationMethod<
  PutDetectorRequest,
  PutDetectorResult,
  PutDetectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutDetectorRequest,
  output: PutDetectorResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutDetector",
}));

export type PutEntityTypeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates an entity type. An entity represents who is performing the event. As part of a fraud prediction, you pass the entity ID to indicate the specific entity who performed the event. An entity type classifies the entity. Example classifications include customer, merchant, or account.
 */
export const putEntityType: API.OperationMethod<
  PutEntityTypeRequest,
  PutEntityTypeResult,
  PutEntityTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutEntityTypeRequest,
  output: PutEntityTypeResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutEntityType",
}));

export type PutEventTypeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates an event type. An event is a business activity that is evaluated for fraud risk. With Amazon Fraud Detector, you generate fraud predictions for events. An event type defines the structure for an event sent to Amazon Fraud Detector. This includes the variables sent as part of the event, the entity performing the event (such as a customer), and the labels that classify the event. Example event types include online payment transactions, account registrations, and authentications.
 */
export const putEventType: API.OperationMethod<
  PutEventTypeRequest,
  PutEventTypeResult,
  PutEventTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutEventTypeRequest,
  output: PutEventTypeResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutEventType",
}));

export type PutExternalModelError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates an Amazon SageMaker model endpoint. You can also use this action to update the configuration of the model endpoint, including the IAM role and/or the mapped variables.
 */
export const putExternalModel: API.OperationMethod<
  PutExternalModelRequest,
  PutExternalModelResult,
  PutExternalModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutExternalModelRequest,
  output: PutExternalModelResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutExternalModel",
}));

export type PutKMSEncryptionKeyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Specifies the KMS key to be used to encrypt content in Amazon Fraud Detector.
 */
export const putKMSEncryptionKey: API.OperationMethod<
  PutKMSEncryptionKeyRequest,
  PutKMSEncryptionKeyResult,
  PutKMSEncryptionKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutKMSEncryptionKeyRequest,
  output: PutKMSEncryptionKeyResult,
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
  operationName: "PutKMSEncryptionKey",
}));

export type PutLabelError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates label. A label classifies an event as fraudulent or legitimate. Labels are associated with event types and used to train supervised machine learning models in Amazon Fraud Detector.
 */
export const putLabel: API.OperationMethod<
  PutLabelRequest,
  PutLabelResult,
  PutLabelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutLabelRequest,
  output: PutLabelResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutLabel",
}));

export type PutOutcomeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates an outcome.
 */
export const putOutcome: API.OperationMethod<
  PutOutcomeRequest,
  PutOutcomeResult,
  PutOutcomeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutOutcomeRequest,
  output: PutOutcomeResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutOutcome",
}));

export type SendEventError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stores events in Amazon Fraud Detector without generating fraud predictions for those events. For example, you can use `SendEvent` to upload a historical dataset, which you can then later use to train a model.
 */
export const sendEvent: API.OperationMethod<
  SendEventRequest,
  SendEventResult,
  SendEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SendEventRequest,
  output: SendEventResult,
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
  operationName: "SendEvent",
}));

export type TagResourceError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Assigns tags to a resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResult,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResult,
  errors: [
    AccessDeniedException,
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
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResult,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResult,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateDetectorVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a detector version. The detector version attributes that you can update include models, external model endpoints, rules, rule execution mode, and description. You can only update a `DRAFT` detector version.
 */
export const updateDetectorVersion: API.OperationMethod<
  UpdateDetectorVersionRequest,
  UpdateDetectorVersionResult,
  UpdateDetectorVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDetectorVersionRequest,
  output: UpdateDetectorVersionResult,
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
  operationName: "UpdateDetectorVersion",
}));

export type UpdateDetectorVersionMetadataError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the detector version's description. You can update the metadata for any detector version (`DRAFT, ACTIVE,` or
 * `INACTIVE`).
 */
export const updateDetectorVersionMetadata: API.OperationMethod<
  UpdateDetectorVersionMetadataRequest,
  UpdateDetectorVersionMetadataResult,
  UpdateDetectorVersionMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDetectorVersionMetadataRequest,
  output: UpdateDetectorVersionMetadataResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDetectorVersionMetadata",
}));

export type UpdateDetectorVersionStatusError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the detector version’s status. You can perform the following promotions or
 * demotions using `UpdateDetectorVersionStatus`: `DRAFT` to `ACTIVE`, `ACTIVE` to `INACTIVE`, and `INACTIVE` to `ACTIVE`.
 */
export const updateDetectorVersionStatus: API.OperationMethod<
  UpdateDetectorVersionStatusRequest,
  UpdateDetectorVersionStatusResult,
  UpdateDetectorVersionStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDetectorVersionStatusRequest,
  output: UpdateDetectorVersionStatusResult,
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
  operationName: "UpdateDetectorVersionStatus",
}));

export type UpdateEventLabelError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified event with a new label.
 */
export const updateEventLabel: API.OperationMethod<
  UpdateEventLabelRequest,
  UpdateEventLabelResult,
  UpdateEventLabelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateEventLabelRequest,
  output: UpdateEventLabelResult,
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
  operationName: "UpdateEventLabel",
}));

export type UpdateListError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a list.
 */
export const updateList: API.OperationMethod<
  UpdateListRequest,
  UpdateListResult,
  UpdateListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateListRequest,
  output: UpdateListResult,
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
  operationName: "UpdateList",
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
 * Updates model description.
 */
export const updateModel: API.OperationMethod<
  UpdateModelRequest,
  UpdateModelResult,
  UpdateModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateModelRequest,
  output: UpdateModelResult,
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

export type UpdateModelVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a model version. Updating a model version retrains an existing model version using updated training data and produces a new minor version of the model. You can update the training data set location and data access role attributes using this action. This action creates and trains a new minor version of the model, for example version 1.01, 1.02, 1.03.
 */
export const updateModelVersion: API.OperationMethod<
  UpdateModelVersionRequest,
  UpdateModelVersionResult,
  UpdateModelVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateModelVersionRequest,
  output: UpdateModelVersionResult,
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
  operationName: "UpdateModelVersion",
}));

export type UpdateModelVersionStatusError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the status of a model version.
 *
 * You can perform the following status updates:
 *
 * - Change the `TRAINING_IN_PROGRESS` status to `TRAINING_CANCELLED`.
 *
 * - Change the `TRAINING_COMPLETE` status to `ACTIVE`.
 *
 * - Change `ACTIVE` to `INACTIVE`.
 */
export const updateModelVersionStatus: API.OperationMethod<
  UpdateModelVersionStatusRequest,
  UpdateModelVersionStatusResult,
  UpdateModelVersionStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateModelVersionStatusRequest,
  output: UpdateModelVersionStatusResult,
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
  operationName: "UpdateModelVersionStatus",
}));

export type UpdateRuleMetadataError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a rule's metadata. The description attribute can be updated.
 */
export const updateRuleMetadata: API.OperationMethod<
  UpdateRuleMetadataRequest,
  UpdateRuleMetadataResult,
  UpdateRuleMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRuleMetadataRequest,
  output: UpdateRuleMetadataResult,
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
  operationName: "UpdateRuleMetadata",
}));

export type UpdateRuleVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a rule version resulting in a new rule version. Updates a rule version resulting in a new rule version (version 1, 2, 3 ...).
 */
export const updateRuleVersion: API.OperationMethod<
  UpdateRuleVersionRequest,
  UpdateRuleVersionResult,
  UpdateRuleVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRuleVersionRequest,
  output: UpdateRuleVersionResult,
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
  operationName: "UpdateRuleVersion",
}));

export type UpdateVariableError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a variable.
 */
export const updateVariable: API.OperationMethod<
  UpdateVariableRequest,
  UpdateVariableResult,
  UpdateVariableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateVariableRequest,
  output: UpdateVariableResult,
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
  operationName: "UpdateVariable",
}));
